import { useState } from "react";
import { Swords, ChevronRight, Zap, Search, Trash2 } from "lucide-react";
import {
  useSimGame,
  SimShell,
  StageWrapper,
  QuizBlock,
  CompletionScreen,
} from "@/components/simulations/shared";

const TOTAL_STAGES = 11;
// ─────────────────────────────────────────────────────────────────────────────
// Trie — pure implementation
// Each node has children (Map<char, TrieNode>) and isEnd flag.
// All mutating operations return NEW root nodes — no mutation.
// ─────────────────────────────────────────────────────────────────────────────

interface TrieNode {
    id:       number;            // stable identity for React keys
    char:     string;            // character this node represents (∅ for root)
    children: Map<string, TrieNode>;
    isEnd:    boolean;
    depth:    number;
  }
  
  let _trieId = 0;
  const mkTrieNode = (char: string, depth: number): TrieNode => ({
    id: _trieId++,
    char,
    children: new Map(),
    isEnd: false,
    depth,
  });
  
  // Deep clone a TrieNode tree
  function cloneTrie(node: TrieNode): TrieNode {
    const children = new Map<string, TrieNode>();
    for (const [ch, child] of node.children) {
      children.set(ch, cloneTrie(child));
    }
    return { ...node, id: node.id, children };
  }
  
  // ── Insert ───────────────────────────────────────────────────────────────────
  function trieInsert(root: TrieNode, word: string): TrieNode {
    const newRoot = cloneTrie(root);
    let cur = newRoot;
    for (let i = 0; i < word.length; i++) {
      const ch = word[i];
      if (!cur.children.has(ch)) {
        cur.children.set(ch, mkTrieNode(ch, cur.depth + 1));
      }
      cur = cur.children.get(ch)!;
    }
    cur.isEnd = true;
    return newRoot;
  }
  
  // ── Search (exact word) ───────────────────────────────────────────────────────
  // Returns { found, path } where path = chars traversed
  function trieSearch(
    root: TrieNode, word: string
  ): { found: boolean; path: string[] } {
    const path: string[] = [];
    let cur: TrieNode | undefined = root;
    for (const ch of word) {
      if (!cur?.children.has(ch)) return { found: false, path };
      path.push(ch);
      cur = cur.children.get(ch);
    }
    return { found: !!cur?.isEnd, path };
  }
  
  // ── startsWith ────────────────────────────────────────────────────────────────
  function trieStartsWith(
    root: TrieNode, prefix: string
  ): { exists: boolean; completions: string[] } {
    let cur: TrieNode | undefined = root;
    for (const ch of prefix) {
      if (!cur?.children.has(ch)) return { exists: false, completions: [] };
      cur = cur.children.get(ch);
    }
    if (!cur) return { exists: false, completions: [] };
  
    // Collect all completions from this prefix node
    const completions: string[] = [];
    const dfs = (node: TrieNode, built: string) => {
      if (node.isEnd) completions.push(prefix.slice(0, prefix.length - prefix.length) + built);
      for (const [ch, child] of node.children) dfs(child, built + ch);
    };
    dfs(cur, prefix);
    return { exists: true, completions };
  }
  
  // ── Delete ────────────────────────────────────────────────────────────────────
  // Returns new root. Safely removes only nodes not shared by other words.
  function trieDelete(root: TrieNode, word: string): TrieNode {
    const newRoot = cloneTrie(root);
  
    function del(node: TrieNode, depth: number): boolean {
      // Returns true if this node can be deleted
      if (depth === word.length) {
        node.isEnd = false;
        return node.children.size === 0;
      }
      const ch = word[depth];
      if (!node.children.has(ch)) return false;
      const child = node.children.get(ch)!;
      const shouldDelete = del(child, depth + 1);
      if (shouldDelete) node.children.delete(ch);
      return !node.isEnd && node.children.size === 0 && depth > 0;
    }
  
    del(newRoot, 0);
    return newRoot;
  }
  
  // ── Get all words in trie ─────────────────────────────────────────────────────
  function trieGetWords(root: TrieNode): string[] {
    const words: string[] = [];
    const dfs = (node: TrieNode, built: string) => {
      if (node.isEnd) words.push(built);
      for (const [ch, child] of node.children) dfs(child, built + ch);
    };
    dfs(root, "");
    return words;
  }
  
  // ── Layout: flatten trie into positioned nodes for SVG ────────────────────────
  interface LayoutTrieNode {
    node:  TrieNode;
    x:     number;    // 0..1 normalized
    y:     number;    // depth
    parent: LayoutTrieNode | null;
  }
  
  function layoutTrie(root: TrieNode): LayoutTrieNode[] {
    const result: LayoutTrieNode[] = [];
  
    function recurse(
      node: TrieNode,
      parent: LayoutTrieNode | null,
      lo: number, hi: number
    ) {
      const x = (lo + hi) / 2;
      const ln: LayoutTrieNode = { node, x, y: node.depth, parent };
      result.push(ln);
  
      const children = Array.from(node.children.values());
      if (children.length === 0) return;
  
      const w = (hi - lo) / children.length;
      children.forEach((ch, i) => recurse(ch, ln, lo + i * w, lo + (i + 1) * w));
    }
  
    recurse(root, null, 0, 1);
    return result;
  }
  // ─────────────────────────────────────────────────────────────────────────────
// TrieSVG — renders a Trie tree
// ─────────────────────────────────────────────────────────────────────────────
interface TrieSVGProps {
    root:           TrieNode;
    highlightPath?: string[];    // chars on the active search/insert path
    highlightMode?: "insert" | "search" | "delete" | "prefix";
    deletingWord?:  string;      // word being deleted (shows those nodes differently)
    svgW?:          number;
    svgH?:          number;
    onNodeClick?:   (node: TrieNode) => void;
  }
  
  const T_NODE_R = 20;
  const T_ROW_H  = 70;
  
  function TrieSVG({
    root,
    highlightPath = [],
    highlightMode = "insert",
    deletingWord,
    svgW = 700,
    svgH = 320,
    onNodeClick,
  }: TrieSVGProps) {
    const laid = layoutTrie(root);
  
    const px = (x: number) => x * svgW;
    const py = (d: number) => 36 + d * T_ROW_H;
  
    // Build a set of char-depth pairs on the highlight path
    // path = ['c','a','t'] means depth1='c', depth2='a', depth3='t'
    const pathSet = new Set(highlightPath.map((ch, i) => `${i + 1}:${ch}`));
  
    // Build set of chars in the word being deleted at each depth
    const deleteSet = new Set(
      deletingWord ? Array.from(deletingWord).map((ch, i) => `${i + 1}:${ch}`) : []
    );
  
    const modeColor = {
      insert:  "#3b82f6",
      search:  "#22c55e",
      delete:  "#ef4444",
      prefix:  "#f59e0b",
    };
  
    return (
      <svg width="100%" viewBox={`0 0 ${svgW} ${svgH}`} className="overflow-visible">
        {/* Edges */}
        {laid.map(ln => {
          if (!ln.parent) return null;
          return (
            <line key={`e-${ln.node.id}`}
              x1={px(ln.parent.x)} y1={py(ln.parent.y) + T_NODE_R}
              x2={px(ln.x)}        y2={py(ln.y) - T_NODE_R}
              stroke="hsl(var(--border))" strokeWidth={1.5}
            />
          );
        })}
  
        {/* Nodes */}
        {laid.map(ln => {
          const { node, x, y } = ln;
          const key      = `${y}:${node.char}`;
          const isOnPath = pathSet.has(key);
          const isOnDel  = deleteSet.has(key);
          const col      = modeColor[highlightMode];
  
          const fill   = isOnDel   ? "#ef444422"
                       : isOnPath  ? `${col}22`
                       : node.isEnd ? "hsl(var(--primary)/0.1)"
                       :              "hsl(var(--card))";
  
          const stroke = isOnDel   ? "#ef4444"
                       : isOnPath  ? col
                       : node.isEnd ? "hsl(var(--primary))"
                       :              "hsl(var(--border))";
  
          const sw = (isOnPath || isOnDel || node.isEnd) ? 2.5 : 1.5;
  
          return (
            <g key={`n-${node.id}`}
              transform={`translate(${px(x)}, ${py(y)})`}
              onClick={() => onNodeClick?.(node)}
              style={{ cursor: onNodeClick ? "pointer" : "default" }}
            >
              {/* End-of-word flag ring */}
              {node.isEnd && (
                <circle r={T_NODE_R + 5}
                  fill="none"
                  stroke="hsl(var(--primary))"
                  strokeWidth={1.5}
                  strokeDasharray="4 3"
                  opacity={0.5}
                />
              )}
  
              {/* Pulse for active path */}
              {isOnPath && (
                <circle r={T_NODE_R + 7}
                  fill="none" stroke={col}
                  strokeWidth={1.5} opacity={0.25}
                  className="animate-ping"
                />
              )}
  
              <circle r={T_NODE_R}
                fill={fill} stroke={stroke} strokeWidth={sw}
                className="transition-all duration-300"
              />
  
              {/* Character */}
              <text textAnchor="middle" dy={5}
                fontSize={14} fontWeight="bold"
                fill={isOnPath || isOnDel ? stroke : "hsl(var(--foreground))"}
              >
                {node.char === "" ? "∅" : node.char}
              </text>
  
              {/* isEnd marker */}
              {node.isEnd && (
                <text textAnchor="middle" dy={T_NODE_R + 13}
                  fontSize={8} fill="hsl(var(--primary))" fontWeight="bold">
                  END
                </text>
              )}
            </g>
          );
        })}
      </svg>
    );
  }
  export function TrieSim() {

    // ── Initial trie ──────────────────────────────────────────────────────────
    const EMPTY_ROOT = (): TrieNode => {
      _trieId = 0;
      return mkTrieNode("", 0);
    };
  
    const game = useSimGame(TOTAL_STAGES, () => {
      _trieId = 0;
      setTrieRoot(EMPTY_ROOT());
      setInsertedWords([]);
      setInputWord("");
      setInsertAnimPath([]);
      // Stage 3
      setSharedDemo(null);
      // Stage 4
      setSearchWord(""); setSearchResult(null); setSearchPath([]);
      // Stage 5
      setPrefixWord(""); setPrefixResult(null);
      // Stage 6
      setDeleteWord(""); setDeleteDone(false);
      // Stage 9 quizzes
      setQ1(null); setQ2(null); setQ3(null);
      // Stage 10 boss
      setBossRoot(EMPTY_ROOT());
      setBossInserted([]);
      setBossStep(0); setBossResults([]);
    });
  
    // Shared trie used across stages 2–8
    const [trieRoot,      setTrieRoot]      = useState<TrieNode>(EMPTY_ROOT());
    const [insertedWords, setInsertedWords] = useState<string[]>([]);
    const [inputWord,     setInputWord]     = useState("");
    const [insertAnimPath, setInsertAnimPath] = useState<string[]>([]);
  
    // Stage 3 — prefix sharing demo
    const [sharedDemo, setSharedDemo] = useState<string | null>(null);
  
    // Stage 4 — search
    const [searchWord,   setSearchWord]   = useState("");
    const [searchResult, setSearchResult] = useState<boolean | null>(null);
    const [searchPath,   setSearchPath]   = useState<string[]>([]);
  
    // Stage 5 — startsWith
    const [prefixWord,   setPrefixWord]   = useState("");
    const [prefixResult, setPrefixResult] = useState<{ exists: boolean; completions: string[] } | null>(null);
  
    // Stage 6 — deletion
    const [deleteWord, setDeleteWord] = useState("");
    const [deleteDone, setDeleteDone] = useState(false);
  
    // Quizzes
    const [q1, setQ1] = useState<string | null>(null);
    const [q2, setQ2] = useState<string | null>(null);
    const [q3, setQ3] = useState<string | null>(null);
  
    // Stage 10 — final boss
    const BOSS_WORDS    = ["cat", "car", "dog", "door"];
    const [bossRoot,     setBossRoot]     = useState<TrieNode>(EMPTY_ROOT());
    const [bossInserted, setBossInserted] = useState<string[]>([]);
    const [bossStep,     setBossStep]     = useState(0);
    const [bossResults,  setBossResults]  = useState<string[]>([]);
  
    // ── Shared insert handler ─────────────────────────────────────────────────
    const handleInsert = (word: string) => {
      const w = word.trim().toLowerCase();
      if (!w || !/^[a-z]+$/.test(w)) {
        game.showMistake("Enter lowercase letters only.");
        return;
      }
      if (insertedWords.includes(w)) {
        game.showMistake(`"${w}" already in trie — existing path reused!`);
        return;
      }
      setTrieRoot(r => trieInsert(r, w));
      setInsertedWords(ws => [...ws, w]);
      setInsertAnimPath(Array.from(w));
      game.addXp(30, `Inserted "${w}"`);
      setInputWord("");
      setTimeout(() => setInsertAnimPath([]), 2000);
    };
    const renderStage1 = () => (
        <StageWrapper>
          <div className="text-center mb-6 max-w-xl">
            <div className="text-5xl mb-3">🌳</div>
            <h2 className="text-3xl font-bold text-primary mb-2">
              The Prefix Kingdom
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              You are a Data Guardian in <strong>Lexiconia</strong>, where every word
              lives in the <strong>Trie Tree</strong>. Words that share a prefix share
              their path — no duplication, pure efficiency. Master insert, search,
              startsWith, and delete to restore the kingdom.
            </p>
          </div>
    
          {/* Empty root preview */}
          <div className="w-full max-w-md border border-border rounded-xl p-5 bg-card mb-6">
            <p className="text-xs text-muted-foreground text-center mb-4">
              The Trie — root node (∅) awaits its first word
            </p>
            <div className="flex justify-center">
              <div className="flex flex-col items-center gap-1">
                <div className="w-12 h-12 rounded-full border-2 border-primary/50 bg-primary/10
                                flex items-center justify-center text-lg font-bold animate-pulse">
                  ∅
                </div>
                <span className="text-[10px] text-muted-foreground">root</span>
                <div className="flex gap-1 mt-2 flex-wrap justify-center max-w-48">
                  {"abcdefghij".split("").map(ch => (
                    <div key={ch}
                      className="w-5 h-5 rounded border border-border/50 bg-muted/30
                                 flex items-center justify-center text-[8px] text-muted-foreground/50">
                      {ch}
                    </div>
                  ))}
                  <span className="text-[8px] text-muted-foreground">...a–z</span>
                </div>
              </div>
            </div>
          </div>
    
          {/* Feature pills */}
          <div className="grid grid-cols-4 gap-3 w-full max-w-lg mb-8">
            {[
              { icon: "➕", label: "Insert",      desc: "O(m)"    },
              { icon: "🔍", label: "Search",      desc: "O(m)"    },
              { icon: "🔤", label: "startsWith",  desc: "O(m)"    },
              { icon: "🗑️", label: "Delete",      desc: "O(m)"    },
            ].map(f => (
              <div key={f.label}
                className="flex flex-col items-center p-3 rounded-xl border border-border
                           bg-card text-center">
                <div className="text-xl mb-1">{f.icon}</div>
                <div className="text-xs font-bold">{f.label}</div>
                <div className="text-[10px] text-green-500 font-mono mt-0.5">{f.desc}</div>
              </div>
            ))}
          </div>
    
          <button
            onClick={() => { game.addXp(50, "Guardian Awakened"); game.nextStage(); }}
            className="px-8 py-3 bg-primary text-primary-foreground font-bold rounded-xl
                       flex items-center gap-2 hover:opacity-90"
          >
            🌱 Awaken the Trie <ChevronRight className="size-4" />
          </button>
        </StageWrapper>
      );
      const renderStage2 = () => {
        const SUGGESTED = ["cat", "car", "dog"];
        const canProceed = insertedWords.length >= 2;
    
        return (
          <StageWrapper>
            <div className="text-center mb-4 max-w-lg">
              <h3 className="text-xl font-bold text-primary mb-1">
                🌿 Word Construction — Insert Mission
              </h3>
              <p className="text-muted-foreground text-sm">
                Insert words one by one. Watch each character grow a branch.
                Try <code className="bg-secondary px-1 rounded">cat</code> then{" "}
                <code className="bg-secondary px-1 rounded">car</code> to see prefix sharing!
              </p>
            </div>
    
            {/* Quick insert suggestions */}
            <div className="flex gap-2 mb-4 flex-wrap justify-center">
              {SUGGESTED.map(w => (
                <button key={w}
                  disabled={insertedWords.includes(w)}
                  onClick={() => handleInsert(w)}
                  className={`px-4 py-1.5 rounded-lg border text-sm font-mono font-bold transition-all
                    ${insertedWords.includes(w)
                      ? "opacity-30 cursor-not-allowed border-border"
                      : "border-primary/50 bg-primary/10 hover:bg-primary/20 cursor-pointer"
                    }`}
                >
                  {insertedWords.includes(w) ? "✓ " : ""}{w}
                </button>
              ))}
            </div>
    
            {/* Custom insert */}
            <div className="flex gap-2 mb-4">
              <input
                type="text"
                value={inputWord}
                onChange={e => setInputWord(e.target.value.toLowerCase())}
                onKeyDown={e => e.key === "Enter" && handleInsert(inputWord)}
                placeholder="custom word..."
                className="px-4 py-2 border border-border rounded-lg bg-background text-sm
                           font-mono w-36 focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
              <button onClick={() => handleInsert(inputWord)}
                className="px-4 py-2 bg-primary text-primary-foreground font-bold rounded-lg text-sm
                           flex items-center gap-1">
                <Zap className="size-3.5" /> Insert
              </button>
            </div>
    
            {/* Inserted word chips */}
            {insertedWords.length > 0 && (
              <div className="flex gap-2 flex-wrap justify-center mb-4">
                {insertedWords.map(w => (
                  <span key={w}
                    className="px-3 py-1 bg-primary/10 border border-primary/30 rounded-lg
                               text-xs font-mono font-bold text-primary">
                    {w}
                  </span>
                ))}
              </div>
            )}
    
            {/* Insert animation: show chars being added */}
            {insertAnimPath.length > 0 && (
              <div className="flex items-center gap-1 mb-4 animate-in fade-in">
                <span className="text-xs text-muted-foreground mr-1">Inserting:</span>
                <div className="w-8 h-8 rounded-full border-2 border-border bg-card
                                flex items-center justify-center text-xs font-bold">
                  ∅
                </div>
                {insertAnimPath.map((ch, i) => (
                  <div key={i} className="flex items-center gap-1">
                    <ChevronRight className="size-3 text-muted-foreground" />
                    <div
                      style={{ animationDelay: `${i * 150}ms` }}
                      className="w-8 h-8 rounded-full border-2 border-primary bg-primary/10
                                  flex items-center justify-center text-xs font-bold text-primary
                                  animate-in zoom-in"
                    >
                      {ch}
                    </div>
                  </div>
                ))}
                <div className="ml-1 text-[10px] text-primary font-bold animate-pulse">END</div>
              </div>
            )}
    
            {/* Trie SVG */}
            <div className="w-full max-w-2xl border border-border rounded-xl p-4 bg-card mb-6">
              <TrieSVG root={trieRoot}
                highlightPath={insertAnimPath}
                highlightMode="insert"
                svgH={280}
              />
            </div>
    
            {canProceed && (
              <button
                onClick={() => { game.addXp(80, "Word Weaver"); game.nextStage(); }}
                className="px-8 py-3 bg-primary text-primary-foreground font-bold rounded-xl animate-in zoom-in"
              >
                Explore Prefix Sharing → 🔗
              </button>
            )}
          </StageWrapper>
        );
      };
      const renderStage3 = () => {
        // Make sure cat + car are in trie for this demo
        let demoRoot = trieRoot;
        if (!insertedWords.includes("cat")) demoRoot = trieInsert(demoRoot, "cat");
        if (!insertedWords.includes("car")) demoRoot = trieInsert(demoRoot, "car");
    
        const prefixToShow = sharedDemo ?? "ca";
        const { completions } = trieStartsWith(demoRoot, prefixToShow);
        const highlightChars  = Array.from(prefixToShow);
    
        return (
          <StageWrapper>
            <div className="text-center mb-4 max-w-lg">
              <h3 className="text-xl font-bold text-primary mb-1">🔗 Prefix Sharing</h3>
              <p className="text-muted-foreground text-sm">
                Words with a common prefix <strong>share their nodes</strong>.
                "cat" and "car" both use the path c→a, saving memory.
                Click a prefix below to highlight the shared path.
              </p>
            </div>
    
            {/* Prefix selector */}
            <div className="flex gap-2 mb-4 flex-wrap justify-center">
              {["c", "ca", "car", "cat", "d"].map(pref => {
                const { exists } = trieStartsWith(demoRoot, pref);
                return (
                  <button key={pref}
                    onClick={() => setSharedDemo(pref)}
                    disabled={!exists}
                    className={`px-4 py-2 rounded-lg border text-sm font-mono font-bold transition-all
                      ${sharedDemo === pref
                        ? "bg-yellow-500 text-white border-yellow-500"
                        : exists
                        ? "border-yellow-500/50 bg-yellow-500/10 hover:bg-yellow-500/20 cursor-pointer"
                        : "border-border opacity-30 cursor-not-allowed"
                      }`}
                  >
                    "{pref}"
                  </button>
                );
              })}
            </div>
    
            {/* Tree */}
            <div className="w-full max-w-2xl border border-border rounded-xl p-4 bg-card mb-4">
              <TrieSVG root={demoRoot}
                highlightPath={highlightChars}
                highlightMode="prefix"
                svgH={300}
              />
            </div>
    
            {/* Completions */}
            {sharedDemo && (
              <div className="flex items-center gap-3 mb-6 animate-in fade-in">
                <span className="text-sm font-bold text-yellow-500">
                  startsWith("{sharedDemo}") →
                </span>
                <div className="flex gap-2 flex-wrap">
                  {completions.length > 0
                    ? completions.map(w => (
                        <span key={w}
                          className="px-3 py-1 bg-yellow-500/10 border border-yellow-500/30
                                     rounded-lg text-xs font-mono font-bold text-yellow-600 dark:text-yellow-400">
                          {w}
                        </span>
                      ))
                    : <span className="text-xs text-muted-foreground">(no completions)</span>
                  }
                </div>
              </div>
            )}
    
            {/* Savings calculation */}
            <div className="bg-secondary/30 rounded-xl p-4 max-w-md text-xs text-center mb-6">
              <p className="font-bold mb-1">Memory saving via prefix sharing:</p>
              <p className="text-muted-foreground">
                "cat" + "car" = 6 chars separately,
                but Trie uses only <strong>4 nodes</strong> (∅→c→a→t, ∅→c→a→r shares c,a)
              </p>
            </div>
    
            <button
              onClick={() => { game.addXp(70, "Prefix Expert"); game.nextStage(); }}
              className="px-8 py-3 bg-primary text-primary-foreground font-bold rounded-xl"
            >
              Search Quest → 🔍
            </button>
          </StageWrapper>
        );
      };
      const renderStage4 = () => {
        const SEARCH_TESTS = [
          { word: "cat", expect: true  },
          { word: "ca",  expect: false },
          { word: "dog", expect: insertedWords.includes("dog") },
          { word: "xyz", expect: false },
        ];
    
        const runSearch = (w: string) => {
          const { found, path } = trieSearch(trieRoot, w);
          setSearchWord(w);
          setSearchResult(found);
          setSearchPath(Array.from(w));
        };
    
        return (
          <StageWrapper>
            <div className="text-center mb-4 max-w-lg">
              <h3 className="text-xl font-bold text-primary mb-1">🔍 Search Quest — Truth or Illusion?</h3>
              <p className="text-muted-foreground text-sm">
                A word <strong>truly exists</strong> only if the traversal ends at a node
                marked <code className="bg-secondary px-1 rounded text-[10px]">isEnd = true</code>.
                Reaching a node without that flag is just a prefix — not a word.
              </p>
            </div>
    
            {/* Search test cards */}
            <div className="grid grid-cols-2 gap-3 w-full max-w-md mb-6">
              {SEARCH_TESTS.map(t => {
                const isActive = searchWord === t.word;
                const color    = isActive
                  ? searchResult ? "border-green-500 bg-green-500/10" : "border-red-500 bg-red-500/10"
                  : "border-border bg-card hover:border-primary/50";
                return (
                  <button key={t.word}
                    onClick={() => runSearch(t.word)}
                    className={`p-4 rounded-xl border-2 text-left transition-all ${color}`}
                  >
                    <div className="text-sm font-mono font-bold mb-1">
                      search("{t.word}")
                    </div>
                    {isActive ? (
                      <div className={`text-xs font-bold ${searchResult ? "text-green-500" : "text-red-500"}`}>
                        → {searchResult ? "TRUE ✅" : "FALSE ❌"}
                      </div>
                    ) : (
                      <div className="text-xs text-muted-foreground">click to search</div>
                    )}
                  </button>
                );
              })}
            </div>
    
            {/* Custom search */}
            <div className="flex gap-2 mb-4">
              <input type="text"
                value={searchWord}
                onChange={e => { setSearchWord(e.target.value.toLowerCase()); setSearchResult(null); setSearchPath([]); }}
                onKeyDown={e => e.key === "Enter" && runSearch(searchWord)}
                placeholder="type to search..."
                className="px-4 py-2 border border-border rounded-lg bg-background text-sm
                           font-mono w-36 focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
              <button onClick={() => runSearch(searchWord)}
                className="px-4 py-2 bg-green-500 text-white font-bold rounded-lg text-sm flex items-center gap-1">
                <Search className="size-3.5" /> Search
              </button>
            </div>
    
            {/* Tree with search path */}
            <div className="w-full max-w-2xl border border-border rounded-xl p-4 bg-card mb-4">
              <TrieSVG root={trieRoot}
                highlightPath={searchPath}
                highlightMode="search"
                svgH={280}
              />
            </div>
    
            {/* Key distinction */}
            {searchResult === false && searchPath.length > 0 && (
              <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-3 max-w-md text-xs
                              text-center text-red-500 font-semibold mb-4 animate-in fade-in">
                ⚠️ Path exists but no END marker — this is a PREFIX, not a stored word!
              </div>
            )}
    
            {searchResult !== null && (
              <button
                onClick={() => { game.addXp(80, "Search Detective"); game.nextStage(); }}
                className="px-8 py-3 bg-primary text-primary-foreground font-bold rounded-xl animate-in zoom-in"
              >
                startsWith Spell → 🔤
              </button>
            )}
          </StageWrapper>
        );
      };
      const renderStage5 = () => {
        const runPrefix = (pref: string) => {
          const result = trieStartsWith(trieRoot, pref);
          setPrefixWord(pref);
          setPrefixResult(result);
        };
    
        const DEMO_PREFIXES = ["ca", "do", "c", "xy", "cat"];
    
        return (
          <StageWrapper>
            <div className="text-center mb-4 max-w-lg">
              <h3 className="text-xl font-bold text-primary mb-1">🔤 Prefix Power — startsWith Spell</h3>
              <p className="text-muted-foreground text-sm">
                <code className="bg-secondary px-1 rounded">startsWith(prefix)</code> only
                checks if the path exists — it does <strong>NOT</strong> need an END marker.
                Powers autocomplete, spell-checkers, and search bars.
              </p>
            </div>
    
            {/* Prefix test buttons */}
            <div className="flex gap-2 mb-4 flex-wrap justify-center">
              {DEMO_PREFIXES.map(p => (
                <button key={p}
                  onClick={() => runPrefix(p)}
                  className={`px-4 py-1.5 rounded-lg border text-sm font-mono font-bold transition-all
                    ${prefixWord === p
                      ? prefixResult?.exists
                        ? "bg-yellow-500 text-white border-yellow-500"
                        : "bg-red-500/20 border-red-500 text-red-500"
                      : "border-yellow-500/50 bg-yellow-500/10 hover:bg-yellow-500/20 cursor-pointer"
                    }`}
                >
                  "{p}"
                </button>
              ))}
            </div>
    
            {/* Custom prefix input */}
            <div className="flex gap-2 mb-4">
              <input type="text"
                value={prefixWord}
                onChange={e => { setPrefixWord(e.target.value.toLowerCase()); setPrefixResult(null); }}
                onKeyDown={e => e.key === "Enter" && runPrefix(prefixWord)}
                placeholder="prefix..."
                className="px-4 py-2 border border-border rounded-lg bg-background text-sm
                           font-mono w-32 focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
              <button onClick={() => runPrefix(prefixWord)}
                className="px-4 py-2 bg-yellow-500 text-white font-bold rounded-lg text-sm">
                Check Prefix
              </button>
            </div>
    
            {/* Tree */}
            <div className="w-full max-w-2xl border border-border rounded-xl p-4 bg-card mb-4">
              <TrieSVG root={trieRoot}
                highlightPath={prefixWord ? Array.from(prefixWord) : []}
                highlightMode="prefix"
                svgH={280}
              />
            </div>
    
            {/* Result */}
            {prefixResult !== null && (
              <div className="w-full max-w-md animate-in fade-in mb-4">
                <div className={`p-4 rounded-xl border-2 text-center
                  ${prefixResult.exists
                    ? "border-yellow-500/50 bg-yellow-500/10"
                    : "border-red-500/40 bg-red-500/5"
                  }`}
                >
                  <div className={`text-sm font-bold mb-2
                    ${prefixResult.exists ? "text-yellow-600 dark:text-yellow-400" : "text-red-500"}`}>
                    startsWith("{prefixWord}") → {prefixResult.exists ? "TRUE ✅" : "FALSE ❌"}
                  </div>
                  {prefixResult.exists && prefixResult.completions.length > 0 && (
                    <div>
                      <p className="text-xs text-muted-foreground mb-2">Autocomplete suggestions:</p>
                      <div className="flex gap-2 flex-wrap justify-center">
                        {prefixResult.completions.map(w => (
                          <span key={w}
                            className="px-3 py-1 bg-yellow-500/20 border border-yellow-500/30
                                       rounded-lg text-xs font-mono font-bold text-yellow-600 dark:text-yellow-400">
                            {w}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
    
            {/* search vs startsWith distinction */}
            <div className="bg-secondary/30 rounded-xl p-4 max-w-md text-xs mb-6">
              <div className="grid grid-cols-2 gap-2">
                <div className="text-center p-2 rounded-lg bg-green-500/10 border border-green-500/20">
                  <div className="font-bold text-green-500 mb-1">search("ca")</div>
                  <div className="text-muted-foreground">FALSE — no END at 'a'</div>
                </div>
                <div className="text-center p-2 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
                  <div className="font-bold text-yellow-500 mb-1">startsWith("ca")</div>
                  <div className="text-muted-foreground">TRUE — path exists</div>
                </div>
              </div>
            </div>
    
            {prefixResult !== null && (
              <button
                onClick={() => { game.addXp(80, "Prefix Master"); game.nextStage(); }}
                className="px-8 py-3 bg-primary text-primary-foreground font-bold rounded-xl animate-in zoom-in"
              >
                Deletion Ritual → 🗑️
              </button>
            )}
          </StageWrapper>
        );
      };
      const renderStage6 = () => {
        const words = trieGetWords(trieRoot);
    
        const handleDelete = (w: string) => {
          if (!words.includes(w)) {
            game.showMistake(`"${w}" is not in the trie.`);
            return;
          }
          setTrieRoot(r => trieDelete(r, w));
          setInsertedWords(ws => ws.filter(x => x !== w));
          setDeleteWord(w);
          setDeleteDone(true);
          game.addXp(80, `Deleted "${w}"`);
        };
    
        return (
          <StageWrapper>
            <div className="text-center mb-4 max-w-lg">
              <h3 className="text-xl font-bold text-primary mb-1">🗑️ The Deletion Ritual</h3>
              <p className="text-muted-foreground text-sm">
                Delete a word by removing only the nodes <strong>not shared</strong> with other words.
                Deleting "cat" must leave "car" intact — they share c→a!
              </p>
            </div>
    
            {/* Before state */}
            {!deleteDone && (
              <div className="bg-secondary/30 rounded-xl p-4 max-w-md text-xs mb-4 text-center">
                <p className="font-bold mb-2">Current words in Trie:</p>
                <div className="flex gap-2 flex-wrap justify-center">
                  {words.map(w => (
                    <span key={w}
                      className="px-3 py-1 bg-primary/10 border border-primary/30 rounded-lg
                                 font-mono font-bold text-primary">
                      {w}
                    </span>
                  ))}
                </div>
              </div>
            )}
    
            {/* Delete buttons */}
            {!deleteDone && (
              <div className="flex gap-3 mb-4 flex-wrap justify-center">
                {words.map(w => (
                  <button key={w}
                    onClick={() => handleDelete(w)}
                    className="px-5 py-2.5 bg-red-500/10 border-2 border-red-500/50 rounded-xl
                               text-sm font-bold text-red-600 dark:text-red-400 font-mono
                               hover:bg-red-500/20 transition-all"
                  >
                    <Trash2 className="size-3.5 inline mr-1" /> Delete "{w}"
                  </button>
                ))}
              </div>
            )}
    
            {/* Tree — show before or after */}
            <div className="w-full max-w-2xl border border-border rounded-xl p-4 bg-card mb-4">
              <p className="text-xs text-muted-foreground text-center mb-2">
                {deleteDone
                  ? `✅ "${deleteWord}" deleted — shared nodes preserved`
                  : "Click a word above to delete it"
                }
              </p>
              <TrieSVG root={trieRoot}
                highlightMode="delete"
                svgH={280}
              />
            </div>
    
            {/* Deletion rules */}
            <div className="w-full max-w-md bg-secondary/30 rounded-xl p-4 text-xs mb-6">
              <p className="font-bold mb-2">Safe Deletion Rules:</p>
              <div className="space-y-1 text-muted-foreground">
                <div>① Traverse to end of word</div>
                <div>② Unmark <code className="bg-secondary px-1 rounded">isEnd = false</code></div>
                <div>③ While backtracking: delete node only if it has no other children AND is not another word's end</div>
              </div>
            </div>
    
            {deleteDone && (
              <button
                onClick={() => { game.addXp(80, "Deletion Guardian"); game.nextStage(); }}
                className="px-8 py-3 bg-primary text-primary-foreground font-bold rounded-xl animate-in zoom-in"
              >
                Common Mistakes → ⚠️
              </button>
            )}
          </StageWrapper>
        );
      };
      const renderStage7 = () => {
        // Build a clean demo trie for mistake visualization
        let demoTrie = EMPTY_ROOT();
        demoTrie = trieInsert(demoTrie, "cat");
        demoTrie = trieInsert(demoTrie, "car");
    
        return (
          <StageWrapper>
            <div className="text-center mb-6 max-w-lg">
              <h3 className="text-xl font-bold text-red-500 mb-1">⚠️ Common Mistake Demo</h3>
              <p className="text-muted-foreground text-sm">
                These are the three most common Trie mistakes. Understand them before the boss fight.
              </p>
            </div>
    
            <div className="w-full max-w-xl space-y-4 mb-8">
              {/* Mistake 1 */}
              <div className="p-4 rounded-xl border-2 border-red-400/40 bg-red-400/5">
                <div className="flex items-start gap-3">
                  <div className="text-2xl shrink-0">❌</div>
                  <div>
                    <div className="font-bold text-sm mb-1">Treating Prefix as Word</div>
                    <div className="text-xs text-muted-foreground mb-2">
                      <code className="bg-black/20 px-1 rounded">search("ca")</code> returns TRUE
                      — but "ca" was never inserted! The node exists but{" "}
                      <code className="bg-black/20 px-1 rounded">isEnd = false</code>.
                    </div>
                    <div className="bg-black/30 rounded-lg p-2 font-mono text-xs text-red-400">
                      // WRONG: stops at 'a' node, sees it exists → TRUE ❌<br/>
                      // CORRECT: check isEnd at final node → FALSE ✅
                    </div>
                  </div>
                </div>
              </div>
    
              {/* Mistake 2 */}
              <div className="p-4 rounded-xl border-2 border-red-400/40 bg-red-400/5">
                <div className="flex items-start gap-3">
                  <div className="text-2xl shrink-0">❌</div>
                  <div>
                    <div className="font-bold text-sm mb-1">Over-deleting Shared Nodes</div>
                    <div className="text-xs text-muted-foreground mb-2">
                      Deleting "cat" blindly removes c→a→t. But "car" also uses c→a!
                      The node 'a' must survive.
                    </div>
                    <div className="bg-black/30 rounded-lg p-2 font-mono text-xs text-red-400">
                      // WRONG: delete all nodes of "cat" <br/>
                      // CORRECT: only delete 't', keep 'c','a' (shared by "car")
                    </div>
                  </div>
                </div>
              </div>
    
              {/* Mistake 3 */}
              <div className="p-4 rounded-xl border-2 border-red-400/40 bg-red-400/5">
                <div className="flex items-start gap-3">
                  <div className="text-2xl shrink-0">❌</div>
                  <div>
                    <div className="font-bold text-sm mb-1">Duplicate Insert Creates New Nodes</div>
                    <div className="text-xs text-muted-foreground mb-2">
                      Inserting "cat" twice should reuse the existing c→a→t path.
                      Creating new nodes wastes memory and breaks structure.
                    </div>
                    <div className="bg-black/30 rounded-lg p-2 font-mono text-xs text-red-400">
                      // WRONG: create new nodes every insert <br/>
                      // CORRECT: follow existing path, only create if char missing
                    </div>
                  </div>
                </div>
              </div>
            </div>
    
            <button
              onClick={() => { game.addXp(60, "Mistake Awareness"); game.nextStage(); }}
              className="px-8 py-3 bg-primary text-primary-foreground font-bold rounded-xl"
            >
              Performance Comparison → 📊
            </button>
          </StageWrapper>
        );
      };
      const renderStage8 = () => (
        <StageWrapper>
          <div className="text-center mb-6 max-w-lg">
            <h3 className="text-xl font-bold text-primary mb-1">📊 Trie vs List Search</h3>
            <p className="text-muted-foreground text-sm">
              Trie performance depends only on <strong>word length (m)</strong>,
              not on how many words are stored (n).
            </p>
          </div>
    
          {/* Comparison table */}
          <div className="w-full max-w-xl border border-border rounded-xl overflow-hidden mb-8">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-muted">
                  <th className="px-4 py-3 text-left font-bold">Operation</th>
                  <th className="px-4 py-3 text-center font-bold text-red-500">List / Array</th>
                  <th className="px-4 py-3 text-center font-bold text-green-500">Trie</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["Insert",      "O(1) but no prefix sharing",   "O(m) — per character"],
                  ["Search",      "O(n × m) — scan all words",    "O(m) — follow path"],
                  ["startsWith",  "O(n × m) — scan all",          "O(m) — just traverse"],
                  ["Delete",      "O(n) — find and remove",       "O(m) — path cleanup"],
                  ["Space",       "O(n × m) — all chars stored",  "O(alphabet × nodes)"],
                  ["Autocomplete","O(n × m) — brute force",       "O(m + results)"],
                ].map(([op, list, trie], i) => (
                  <tr key={i} className="border-t border-border">
                    <td className="px-4 py-2.5 font-semibold">{op}</td>
                    <td className="px-4 py-2.5 text-center text-red-500 text-xs font-mono">{list}</td>
                    <td className="px-4 py-2.5 text-center text-green-500 text-xs font-mono">{trie}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
    
          {/* Visual intuition */}
          <div className="grid grid-cols-2 gap-4 w-full max-w-xl mb-8">
            <div className="p-4 rounded-xl border-2 border-red-400/40 bg-red-400/5">
              <p className="text-xs font-bold text-red-400 mb-2 text-center">
                List: search "cat" in 1000 words
              </p>
              <div className="space-y-0.5">
                {["apple", "bear", "cat ✅", "...997 more"].map((w, i) => (
                  <div key={i}
                    className={`text-xs font-mono px-2 py-0.5 rounded
                      ${w.includes("✅") ? "bg-red-500/20 text-red-400 font-bold" : "text-muted-foreground"}`}
                  >
                    → checking: {w}
                  </div>
                ))}
              </div>
              <p className="text-[10px] text-red-400 font-bold mt-2">O(n × m) = O(1000 × 3) 😰</p>
            </div>
            <div className="p-4 rounded-xl border-2 border-green-500/40 bg-green-500/5">
              <p className="text-xs font-bold text-green-500 mb-2 text-center">
                Trie: search "cat"
              </p>
              <div className="space-y-0.5">
                {["∅ → c", "c → a", "a → t", "t: isEnd? ✅"].map((step, i) => (
                  <div key={i} className="text-xs font-mono px-2 py-0.5 text-green-500">
                    {step}
                  </div>
                ))}
              </div>
              <p className="text-[10px] text-green-500 font-bold mt-2">O(m) = O(3) always ⚡</p>
            </div>
          </div>
    
          <button
            onClick={() => { game.addXp(60, "Performance Expert"); game.nextStage(); }}
            className="px-8 py-3 bg-primary text-primary-foreground font-bold rounded-xl"
          >
            Mini Challenges → 🧩
          </button>
        </StageWrapper>
      );
      const renderStage9 = () => {
        const q1c = q1 === "false";
        const q2c = q2 === "om";
        const q3c = q3 === "shared";
        const q1w = q1 !== null && !q1c;
        const q2w = q2 !== null && !q2c;
        const q3w = q3 !== null && !q3c;
        const allDone = q1c && q2c && q3c;
    
        return (
          <StageWrapper>
            <h3 className="text-2xl font-bold text-primary mb-2 flex items-center gap-2">
              <Swords className="size-6 text-yellow-500" /> Mini Challenges
            </h3>
            <p className="text-muted-foreground text-sm mb-8 max-w-md text-center">
              Test your Trie mastery. Retake any you get wrong.
            </p>
    
            <div className="w-full max-w-lg space-y-4 mb-8">
    
              {/* Q1 */}
              <div>
                <QuizBlock
                  question={`Trie contains "cat", "car". What does search("ca") return?`}
                  options={[
                    { label: "TRUE — path c→a exists in trie", value: "true"  },
                    { label: "FALSE — no isEnd marker at 'a'", value: "false" },
                    { label: "ERROR — invalid input",          value: "error" },
                  ]}
                  correctValue="false"
                  selectedValue={q1}
                  onSelect={setQ1}
                  correctFeedback="✅ Correct! The path exists but 'a' node is not marked isEnd — so the word doesn't exist."
                  wrongFeedback="❌ Remember: a word exists ONLY if the final node has isEnd = true. Path alone isn't enough."
                />
                {q1w && (
                  <button onClick={() => setQ1(null)}
                    className="mt-2 px-4 py-1.5 text-xs bg-yellow-500/20 border border-yellow-500/50
                               text-yellow-600 dark:text-yellow-400 rounded-lg font-semibold">
                    🔄 Retake
                  </button>
                )}
              </div>
    
              {/* Q2 */}
              <div>
                <QuizBlock
                  question="What is the time complexity of search() in a Trie for a word of length m?"
                  options={[
                    { label: "O(n) — depends on number of words", value: "on"   },
                    { label: "O(m) — depends on word length",     value: "om"   },
                    { label: "O(n × m) — worst case scan",        value: "onm"  },
                    { label: "O(log n) — binary search on keys",  value: "logn" },
                  ]}
                  correctValue="om"
                  selectedValue={q2}
                  onSelect={setQ2}
                  correctFeedback="✅ Correct! We follow exactly m edges regardless of how many words are stored."
                  wrongFeedback="❌ Trie bypasses all other words — it only follows the path of length m."
                />
                {q2w && (
                  <button onClick={() => setQ2(null)}
                    className="mt-2 px-4 py-1.5 text-xs bg-yellow-500/20 border border-yellow-500/50
                               text-yellow-600 dark:text-yellow-400 rounded-lg font-semibold">
                    🔄 Retake
                  </button>
                )}
              </div>
    
              {/* Q3 */}
              <div>
                <QuizBlock
                  question={`Trie has "cat" and "car". After deleting "cat", why does the 'c' node NOT get deleted?`}
                  options={[
                    { label: "Because 'c' is marked isEnd",          value: "end"    },
                    { label: "Because 'c' is still used by 'car'",   value: "shared" },
                    { label: "Because deletion only removes leaves",  value: "leaf"   },
                    { label: "Because 'c' is the root's child",      value: "root"   },
                  ]}
                  correctValue="shared"
                  selectedValue={q3}
                  onSelect={setQ3}
                  correctFeedback="✅ Correct! 'car' shares c→a with 'cat'. Shared nodes must survive."
                  wrongFeedback="❌ The deletion check asks: does this node have other children or serve another word? 'c' serves 'car'."
                />
                {q3w && (
                  <button onClick={() => setQ3(null)}
                    className="mt-2 px-4 py-1.5 text-xs bg-yellow-500/20 border border-yellow-500/50
                               text-yellow-600 dark:text-yellow-400 rounded-lg font-semibold">
                    🔄 Retake
                  </button>
                )}
              </div>
            </div>
    
            <div className="flex items-center gap-2 mb-6 text-sm text-muted-foreground">
              <span>Solved:</span>
              {[q1c, q2c, q3c].map((c, i) => (
                <span key={i} className={c ? "text-green-500 font-bold" : ""}>
                  {["①", "②", "③"][i]}
                </span>
              ))}
              <span>({[q1c, q2c, q3c].filter(Boolean).length}/3)</span>
            </div>
    
            {allDone && (
              <button
                onClick={() => { game.addXp(150, "Quiz Champion"); game.nextStage(); }}
                className="px-10 py-3 bg-primary text-primary-foreground font-bold rounded-xl
                           animate-in zoom-in text-lg"
              >
                <Swords className="size-5 inline mr-2 text-red-400" /> Final Boss
              </button>
            )}
          </StageWrapper>
        );
      };
      const renderStage10 = () => {
        type BossOp =
          | { type: "insert";     word: string }
          | { type: "search";     word: string; expect: boolean }
          | { type: "startsWith"; prefix: string; expect: boolean }
          | { type: "delete";     word: string }
          | { type: "verify";     word: string; expect: boolean };
    
        const BOSS_OPS: BossOp[] = [
          { type: "insert",     word: "cat"                        },
          { type: "insert",     word: "car"                        },
          { type: "insert",     word: "dog"                        },
          { type: "insert",     word: "door"                       },
          { type: "search",     word: "car",   expect: true        },
          { type: "search",     word: "do",    expect: false       },
          { type: "startsWith", prefix: "do",  expect: true        },
          { type: "delete",     word: "dog"                        },
          { type: "verify",     word: "dog",   expect: false       },
          { type: "verify",     word: "door",  expect: true        },
        ];
    
        const op      = BOSS_OPS[bossStep];
        const allDone = bossStep >= BOSS_OPS.length;
    
        const executeBossOp = () => {
          if (!op) return;
    
          if (op.type === "insert") {
            setBossRoot(r => trieInsert(r, op.word));
            setBossInserted(ws => [...ws, op.word]);
            setBossResults(r => [...r, `Inserted "${op.word}" ✅`]);
            game.addXp(30, `Boss: inserted "${op.word}"`);
    
          } else if (op.type === "search") {
            const { found } = trieSearch(bossRoot, op.word);
            const ok = found === op.expect;
            setBossResults(r => [...r,
              `search("${op.word}") → ${found} ${ok ? "✅" : "❌ (expected " + op.expect + ")"}`
            ]);
            if (ok) game.addXp(50, `Boss search "${op.word}"`);
            else    game.showMistake(`search("${op.word}") should be ${op.expect}!`);
    
          } else if (op.type === "startsWith") {
            const { exists } = trieStartsWith(bossRoot, op.prefix);
            const ok = exists === op.expect;
            setBossResults(r => [...r,
              `startsWith("${op.prefix}") → ${exists} ${ok ? "✅" : "❌"}`
            ]);
            if (ok) game.addXp(50, `Boss startsWith "${op.prefix}"`);
            else    game.showMistake(`startsWith("${op.prefix}") should be ${op.expect}!`);
    
          } else if (op.type === "delete") {
            setBossRoot(r => trieDelete(r, op.word));
            setBossInserted(ws => ws.filter(w => w !== op.word));
            setBossResults(r => [...r, `Deleted "${op.word}" ✅`]);
            game.addXp(50, `Boss: deleted "${op.word}"`);
    
          } else if (op.type === "verify") {
            const { found } = trieSearch(bossRoot, op.word);
            const ok = found === op.expect;
            setBossResults(r => [...r,
              `verify("${op.word}") → ${found} ${ok ? "✅" : "❌"}`
            ]);
            if (ok) game.addXp(60, `Boss verify "${op.word}"`);
            else    game.showMistake(`"${op.word}" should be ${op.expect ? "FOUND" : "NOT FOUND"}!`);
          }
    
          setBossStep(s => s + 1);
        };
    
        const opLabel = (o: BossOp) => {
          if (o.type === "insert")     return `Insert "${o.word}"`;
          if (o.type === "search")     return `search("${o.word}") → expect ${o.expect}`;
          if (o.type === "startsWith") return `startsWith("${o.prefix}") → expect ${o.expect}`;
          if (o.type === "delete")     return `Delete "${o.word}"`;
          if (o.type === "verify")     return `Verify "${o.word}" → expect ${o.expect}`;
          return "";
        };
    
        return (
          <StageWrapper>
            <h3 className="text-2xl font-bold text-primary mb-2 flex items-center gap-2">
              <Swords className="size-6 text-red-500" /> The Corrupted Dictionary
            </h3>
            <p className="text-muted-foreground text-sm mb-6 max-w-md text-center">
              Execute all 10 operations to restore the Lexiconia dictionary.
            </p>
    
            {/* Words in trie */}
            {bossInserted.length > 0 && (
              <div className="flex gap-2 flex-wrap justify-center mb-4">
                {bossInserted.map(w => (
                  <span key={w}
                    className="px-3 py-1 bg-primary/10 border border-primary/30 rounded-lg
                               text-xs font-mono font-bold text-primary">
                    {w}
                  </span>
                ))}
              </div>
            )}
    
            {/* Boss trie */}
            <div className="w-full max-w-2xl border border-border rounded-xl p-4 bg-card mb-4">
              <TrieSVG root={bossRoot} svgH={260} />
            </div>
    
            {/* Op queue */}
            <div className="w-full max-w-lg space-y-2 mb-6 max-h-64 overflow-y-auto">
              {BOSS_OPS.map((o, i) => {
                const done   = i < bossStep;
                const active = i === bossStep;
                return (
                  <div key={i}
                    className={`flex items-center gap-3 p-3 rounded-xl border-2 transition-all
                      ${done   ? "border-green-500/30 bg-green-500/5"
                      : active ? "border-primary/50 bg-primary/5 shadow-md"
                      :          "border-border opacity-40"
                      }`}
                  >
                    <div className={`size-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0
                      ${done ? "bg-green-500 text-white" : active ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}>
                      {done ? "✓" : i + 1}
                    </div>
                    <div className="flex-1 text-xs font-mono">{opLabel(o)}</div>
                    {active && (
                      <button onClick={executeBossOp}
                        className="px-3 py-1.5 bg-primary text-primary-foreground text-xs font-bold rounded-lg shrink-0">
                        Execute ⚡
                      </button>
                    )}
                    {done && bossResults[i] && (
                      <span className={`text-[10px] font-mono shrink-0
                        ${bossResults[i].includes("❌") ? "text-red-400" : "text-green-500"}`}>
                        {bossResults[i].split("→")[1] ?? "✅"}
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
    
            {allDone && (
              <button
                onClick={() => { game.addXp(300, "Lexiconia Restored"); game.nextStage(); }}
                className="px-10 py-3 bg-primary text-primary-foreground font-bold rounded-xl
                           animate-in zoom-in text-lg"
              >
                👑 Claim Guardian Title
              </button>
            )}
          </StageWrapper>
        );
      };
      const renderStage11 = () => (
        <CompletionScreen
          missionTitle="Lexiconia Restored! 🌳"
          missionSubtitle="You rebuilt the Trie Tree and mastered all four operations."
          xp={game.xp}
          xpLog={game.xpLog}
          achievements={[
            { icon: <span>🌿</span>, label: "Word Weaver"        },
            { icon: <span>🔍</span>, label: "Search Detective"   },
            { icon: <span>🔤</span>, label: "Prefix Master"      },
            { icon: <span>🗑️</span>, label: "Deletion Guardian" },
            { icon: <span>👑</span>, label: "Trie Guardian"      },
          ]}
          concepts={[
            { label: "Insert O(m)",      description: "Follow or create one node per character in the word." },
            { label: "Search O(m)",      description: "Traverse path — word exists only if final node has isEnd=true." },
            { label: "startsWith O(m)",  description: "Same traversal but only checks path existence, not isEnd." },
            { label: "Delete O(m)",      description: "Backtrack and remove nodes only if they have no other children." },
            { label: "Prefix Sharing",   description: "'cat' and 'car' share c→a — zero duplication for common prefixes." },
            { label: "vs Hash Map",      description: "Trie gives O(m) search AND prefix/autocomplete — hash maps don't." },
          ]}
          onReset={game.reset}
        />
      );
      return (
        <SimShell
          title="Prefix Kingdom — Trie"
          subtitle="Data Structures Lab — Trie"
          xp={game.xp}
          stage={game.stage}
          totalStages={TOTAL_STAGES}
          mistakeMessage={game.mistakeMessage}
          successMessage={game.successMessage}
          icon={<span className="text-lg">🌳</span>}
        >
          {game.stage === 1  && renderStage1()}
          {game.stage === 2  && renderStage2()}
          {game.stage === 3  && renderStage3()}
          {game.stage === 4  && renderStage4()}
          {game.stage === 5  && renderStage5()}
          {game.stage === 6  && renderStage6()}
          {game.stage === 7  && renderStage7()}
          {game.stage === 8  && renderStage8()}
          {game.stage === 9  && renderStage9()}
          {game.stage === 10 && renderStage10()}
          {game.stage === 11 && renderStage11()}
        </SimShell>
      );
    } 
