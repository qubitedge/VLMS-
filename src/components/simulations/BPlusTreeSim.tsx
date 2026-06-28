import { useState } from "react";
import { Swords, ChevronRight, Zap, ArrowRight } from "lucide-react";
import {
  useSimGame,
  SimShell,
  StageWrapper,
  QuizBlock,
  CompletionScreen,
} from "@/components/simulations/shared";

// ── Constants ─────────────────────────────────────────────────────────────────
const TOTAL_STAGES = 11;
const ORDER = 3;

const MAX_KEYS = ORDER - 1; // 2

interface BPNode {
  id:       number;         // stable identity for React keys
  keys:     number[];
  children: BPNode[];       // empty for leaf nodes
  isLeaf:   boolean;
  // Leaf-level linked list tracked separately (see leafOrder below)
}

let _nodeId = 0;
const newNode = (isLeaf: boolean): BPNode =>
  ({ id: _nodeId++, keys: [], children: [], isLeaf });

// ── Insert key into B+ Tree ───────────────────────────────────────────────────
// Returns { root, splitKey, splitRight } — splitKey/splitRight non-null when
// the root itself was split and a new root needs to be created by the caller.
interface InsertResult {
  node:      BPNode;
  splitKey:  number | null;
  splitRight: BPNode | null;
}

function bpInsert(node: BPNode, key: number): InsertResult {
  if (node.isLeaf) {
    // Insert into leaf
    const keys = [...node.keys, key].sort((a, b) => a - b);
    const updated: BPNode = { ...node, keys };

    if (keys.length <= MAX_KEYS) {
      // No overflow
      return { node: updated, splitKey: null, splitRight: null };
    }

    // Overflow → split leaf
    const mid   = Math.floor(keys.length / 2);
    const left: BPNode  = { ...newNode(true),  keys: keys.slice(0, mid)  };
    const right: BPNode = { ...newNode(true),  keys: keys.slice(mid)     };
    // Copy up: median key stays in right leaf AND goes to parent
    return { node: left, splitKey: keys[mid], splitRight: right };

  } else {
    // Find child index to descend into
    let ci = node.keys.length;
    for (let i = 0; i < node.keys.length; i++) {
      if (key < node.keys[i]) { ci = i; break; }
    }

    const res = bpInsert(node.children[ci], key);
    const newChildren = [...node.children];
    newChildren[ci] = res.node;

    if (res.splitKey === null) {
      return { node: { ...node, children: newChildren }, splitKey: null, splitRight: null };
    }

    // Child split → push median up into this internal node
    const keys = [...node.keys];
    keys.splice(ci, 0, res.splitKey);
    newChildren.splice(ci + 1, 0, res.splitRight!);

    const updatedInternal: BPNode = { ...node, keys, children: newChildren };

    if (keys.length <= MAX_KEYS) {
      return { node: updatedInternal, splitKey: null, splitRight: null };
    }

    // Internal overflow → split internal node (PUSH up, not copy)
    const mid       = Math.floor(keys.length / 2);
    const pushKey   = keys[mid];                                   // pushed up (removed)
    const leftKeys  = keys.slice(0, mid);
    const rightKeys = keys.slice(mid + 1);
    const leftCh    = newChildren.slice(0, mid + 1);
    const rightCh   = newChildren.slice(mid + 1);

    const leftNode:  BPNode = { ...newNode(false), keys: leftKeys,  children: leftCh  };
    const rightNode: BPNode = { ...newNode(false), keys: rightKeys, children: rightCh };
    return { node: leftNode, splitKey: pushKey, splitRight: rightNode };
  }
}

// ── Top-level insert (handles root split) ────────────────────────────────────
function insertKey(root: BPNode | null, key: number): BPNode {
  if (!root) {
    const leaf = newNode(true);
    leaf.keys = [key];
    return leaf;
  }
  const res = bpInsert(root, key);
  if (res.splitKey === null) return res.node;

  // Root was split → create new root
  const newRoot = newNode(false);
  newRoot.keys     = [res.splitKey];
  newRoot.children = [res.node, res.splitRight!];
  return newRoot;
}

// ── Collect all leaves in order (for linked-list visualization) ──────────────
function getLeaves(node: BPNode | null): BPNode[] {
  if (!node) return [];
  if (node.isLeaf) return [node];
  return node.children.flatMap(c => getLeaves(c));
}

// ── Range query: keys in [lo, hi] ────────────────────────────────────────────
function rangeQuery(root: BPNode | null, lo: number, hi: number): number[] {
  const leaves = getLeaves(root);
  return leaves.flatMap(l => l.keys).filter(k => k >= lo && k <= hi).sort((a,b) => a-b);
}

// ── Search path for highlighting ─────────────────────────────────────────────
function searchPath(node: BPNode | null, key: number): number[] {
  if (!node) return [];
  if (node.isLeaf) return [node.id];
  let ci = node.keys.length;
  for (let i = 0; i < node.keys.length; i++) {
    if (key < node.keys[i]) { ci = i; break; }
  }
  return [node.id, ...searchPath(node.children[ci], key)];
}

// ── Layout: compute x/y for rendering ────────────────────────────────────────
interface LayoutNode {
  node:     BPNode;
  x:        number;
  y:        number;
  children: LayoutNode[];
}

function layoutBPTree(
  node: BPNode,
  depth    = 0,
  lo       = 0,
  hi       = 800,
): LayoutNode {
  const x = (lo + hi) / 2;
  const y = 50 + depth * 100;
  const childCount = node.children.length;
  const childWidth = childCount > 0 ? (hi - lo) / childCount : 0;

  return {
    node, x, y,
    children: node.children.map((c, i) =>
      layoutBPTree(c, depth + 1, lo + i * childWidth, lo + (i + 1) * childWidth)
    ),
  };
}

function collectLayout(ln: LayoutNode): LayoutNode[] {
  return [ln, ...ln.children.flatMap(c => collectLayout(c))];
}

function collectLayoutEdges(ln: LayoutNode): Array<[LayoutNode, LayoutNode]> {
  const edges: Array<[LayoutNode, LayoutNode]> = [];
  for (const c of ln.children) {
    edges.push([ln, c]);
    edges.push(...collectLayoutEdges(c));
  }
  return edges;
}

// ─────────────────────────────────────────────────────────────────────────────
// BPlusSVG — renders a B+ Tree
// ─────────────────────────────────────────────────────────────────────────────
interface BPlusSVGProps {
  root:             BPNode | null;
  highlightIds?:    number[];   // node IDs to highlight (search path)
  highlightKeys?:   number[];   // specific keys to highlight (range query)
  showLeafLinks?:   boolean;
  svgH?:            number;
  svgW?:            number;
}

const NODE_W = 36; // width per key slot
const NODE_H = 32;
const PAD    = 6;

function BPlusSVG({
  root,
  highlightIds  = [],
  highlightKeys = [],
  showLeafLinks = false,
  svgH = 320,
  svgW = 800,
}: BPlusSVGProps) {
  if (!root) return (
    <div className="flex items-center justify-center h-24 text-muted-foreground text-sm">
      Tree is empty — insert keys to begin
    </div>
  );

  const laid   = layoutBPTree(root, 0, 0, svgW);
  const all    = collectLayout(laid);
  const edges  = collectLayoutEdges(laid);
  const leaves = all.filter(ln => ln.node.isLeaf);

  return (
    <svg width="100%" viewBox={`0 0 ${svgW} ${svgH}`} className="overflow-visible">

      {/* Tree edges (parent → child) */}
      {edges.map(([p, c], i) => (
        <line key={`e-${i}`}
          x1={p.x} y1={p.y + NODE_H / 2}
          x2={c.x} y2={c.y - NODE_H / 2}
          stroke="hsl(var(--border))" strokeWidth={1.5}
        />
      ))}

      {/* Horizontal leaf links */}
      {showLeafLinks && leaves.map((ln, i) => {
        if (i === leaves.length - 1) return null;
        const next = leaves[i + 1];
        return (
          <g key={`ll-${i}`}>
            <line
              x1={ln.x + (ln.node.keys.length * NODE_W) / 2 + PAD}
              y1={ln.y}
              x2={next.x - (next.node.keys.length * NODE_W) / 2 - PAD}
              y2={next.y}
              stroke="#60a5fa" strokeWidth={2}
              strokeDasharray="5 3"
              markerEnd="url(#arrow)"
            />
          </g>
        );
      })}

      {/* Arrow marker definition */}
      <defs>
        <marker id="arrow" markerWidth="8" markerHeight="8"
          refX="6" refY="3" orient="auto">
          <path d="M0,0 L0,6 L8,3 z" fill="#60a5fa" />
        </marker>
      </defs>

      {/* Nodes */}
      {all.map(ln => {
        const { node, x, y } = ln;
        const keyCount  = Math.max(node.keys.length, 1);
        const totalW    = keyCount * NODE_W + PAD * 2;
        const isHit     = highlightIds.includes(node.id);

        return (
          <g key={`n-${node.id}`} transform={`translate(${x - totalW / 2}, ${y - NODE_H / 2})`}>
            {/* Node background */}
            <rect
              x={0} y={0}
              width={totalW} height={NODE_H}
              rx={6}
              fill={node.isLeaf
                ? isHit ? "#22c55e22" : "hsl(var(--card))"
                : isHit ? "#3b82f622" : "hsl(var(--secondary))"
              }
              stroke={node.isLeaf
                ? isHit ? "#22c55e" : "hsl(var(--border))"
                : isHit ? "#3b82f6" : "hsl(var(--border))"
              }
              strokeWidth={isHit ? 2.5 : 1.5}
              className="transition-all duration-300"
            />

            {/* Key slots */}
            {node.keys.map((k, ki) => {
              const kx       = PAD + ki * NODE_W;
              const isHLKey  = highlightKeys.includes(k);
              return (
                <g key={ki}>
                  {/* Slot divider */}
                  {ki > 0 && (
                    <line x1={kx} y1={2} x2={kx} y2={NODE_H - 2}
                      stroke="hsl(var(--border))" strokeWidth={1} />
                  )}
                  {/* Key highlight bg */}
                  {isHLKey && (
                    <rect x={kx} y={2} width={NODE_W} height={NODE_H - 4}
                      rx={4} fill="#f59e0b44" />
                  )}
                  {/* Key text */}
                  <text
                    x={kx + NODE_W / 2} y={NODE_H / 2 + 5}
                    textAnchor="middle"
                    fontSize={12} fontWeight="bold"
                    fill={isHLKey ? "#f59e0b" : "hsl(var(--foreground))"}
                  >
                    {k}
                  </text>
                </g>
              );
            })}

            {/* Node type label */}
            <text
              x={totalW / 2} y={-6}
              textAnchor="middle"
              fontSize={8}
              fill="hsl(var(--muted-foreground))"
            >
              {node.isLeaf ? "leaf" : "internal"}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

export function BPlusTreeSim() {

  const game = useSimGame(TOTAL_STAGES, () => {
    _nodeId = 0;               // reset stable IDs
    setLiveRoot(null);
    setLiveKeys([]);
    setInputVal("");
    setBTreeMode(false);
    setStage3Keys([]);
    setLeafSplitStep(0);
    setInternalSplitChoice(null);
    setRootSplitKeys([]);
    setShowLeafLinks(false);
    setRangeResult([]);
    setRangeRun(false);
    setBossRoot(null);
    setBossKeys([]);
    setQ1(null); setQ2(null); setQ3(null);
  });

  // Stage 2 — B-Tree vs B+ Tree toggle
  const [bTreeMode, setBTreeMode] = useState(false);

  // Stage 3 — first insertions
  const [stage3Keys, setStage3Keys] = useState<number[]>([]);

  // Live tree (stage 3 onward — shared)
  const [liveRoot, setLiveRoot]   = useState<BPNode | null>(null);
  const [liveKeys, setLiveKeys]   = useState<number[]>([]);
  const [inputVal, setInputVal]   = useState("");

  // Stage 4 — leaf split
  const [leafSplitStep, setLeafSplitStep] = useState(0);
  // 0=not started, 1=overflow shown, 2=split done

  // Stage 5 — internal split
  const [internalSplitChoice, setInternalSplitChoice] = useState<string | null>(null);

  // Stage 6 — root split
  const [rootSplitKeys, setRootSplitKeys] = useState<number[]>([]);

  // Stage 7 — leaf highway
  const [showLeafLinks, setShowLeafLinks] = useState(false);

  // Stage 8 — range query
  const [rangeResult, setRangeResult] = useState<number[]>([]);
  const [rangeRun,    setRangeRun]    = useState(false);

  // Stage 10 — final boss
  const BOSS_SEQUENCE = [10, 20, 5, 6, 12, 30, 7, 17];
  const [bossRoot, setBossRoot] = useState<BPNode | null>(null);
  const [bossKeys, setBossKeys] = useState<number[]>([]);

  // Quizzes
  const [q1, setQ1] = useState<string | null>(null);
  const [q2, setQ2] = useState<string | null>(null);
  const [q3, setQ3] = useState<string | null>(null);

  // ── Shared insert handler ─────────────────────────────────────────────────
  const handleLiveInsert = (raw: string) => {
    const v = parseInt(raw);
    if (isNaN(v))              { game.showMistake("Enter a valid number."); return; }
    if (liveKeys.includes(v))  { game.showMistake(`${v} is already in the tree.`); return; }
    setLiveRoot(r => insertKey(r, v));
    setLiveKeys(k => [...k, v].sort((a,b) => a-b));
    game.addXp(20, `Inserted ${v}`);
    setInputVal("");
  };

  // ── Insert input row (reused in multiple stages) ──────────────────────────
  const InsertRow = ({ onInsert }: { onInsert: (v: string) => void }) => (
    <div className="flex gap-2 mb-4">
      <input type="number" value={inputVal}
        onChange={e => setInputVal(e.target.value)}
        onKeyDown={e => e.key === "Enter" && onInsert(inputVal)}
        placeholder="Key..."
        className="px-4 py-2 border border-border rounded-lg bg-background text-sm
                   font-mono w-28 focus:outline-none focus:ring-2 focus:ring-primary/50"
      />
      <button onClick={() => onInsert(inputVal)}
        className="px-4 py-2 bg-primary text-primary-foreground font-bold rounded-lg text-sm flex items-center gap-1">
        <Zap className="size-3.5" /> Insert
      </button>
    </div>
  );

  const renderStage1 = () => (
    <StageWrapper>
      <div className="text-center mb-6 max-w-xl">
        <div className="text-5xl mb-3">🏰</div>
        <h2 className="text-3xl font-bold text-primary mb-2">B+ Tree: The Data Kingdom</h2>
        <p className="text-muted-foreground leading-relaxed">
          The kingdom's data is scattered. Searches crawl. Range queries are impossible.
          Your mission: rebuild the <strong>Data Highway System</strong> using a B+ Tree —
          the kingdom's fastest structure.
        </p>
      </div>

      {/* Broken system visualization */}
      <div className="w-full max-w-lg border-2 border-red-400/40 rounded-xl p-5 bg-red-400/5 mb-8">
        <p className="text-xs font-bold text-red-400 text-center mb-4">
          ⚠️ Current System — Unsorted Scattered Data
        </p>
        <div className="flex flex-wrap gap-2 justify-center mb-4">
          {[17, 5, 30, 12, 6, 20, 7, 10].map(k => (
            <div key={k}
              className="w-10 h-10 rounded-lg bg-red-500/10 border-2 border-red-400/50
                         flex items-center justify-center text-sm font-bold font-mono
                         text-red-600 dark:text-red-400 animate-pulse">
              {k}
            </div>
          ))}
        </div>
        <div className="flex items-center justify-center gap-2 text-xs text-red-400 font-semibold">
          <span>Search "5–20"</span>
          <ArrowRight className="size-3" />
          <span className="animate-bounce">😰 Scanning all 8 values...</span>
        </div>
      </div>

      {/* What B+ Tree promises */}
      <div className="grid grid-cols-3 gap-3 w-full max-w-lg mb-8">
        {[
          { icon: "⚡", label: "O(log n) Search",   desc: "Find any key fast" },
          { icon: "🔗", label: "Linked Leaves",     desc: "Range queries in one pass" },
          { icon: "📦", label: "Ordered Structure", desc: "All data sorted at leaves" },
        ].map(c => (
          <div key={c.label}
            className="flex flex-col items-center p-3 rounded-xl border border-border
                       bg-card text-center">
            <div className="text-2xl mb-1">{c.icon}</div>
            <div className="text-xs font-bold">{c.label}</div>
            <div className="text-[10px] text-muted-foreground mt-1">{c.desc}</div>
          </div>
        ))}
      </div>

      <button
        onClick={() => { game.addXp(50, "Knight Awakened"); game.nextStage(); }}
        className="px-8 py-3 bg-primary text-primary-foreground font-bold rounded-xl
                   flex items-center gap-2 hover:opacity-90"
      >
        🏗️ Start Rebuilding <ChevronRight className="size-4" />
      </button>
    </StageWrapper>
  );

  const renderStage2 = () => (
    <StageWrapper>
      <div className="text-center mb-4 max-w-lg">
        <h3 className="text-xl font-bold text-primary mb-1">🆚 B-Tree vs B+ Tree</h3>
        <p className="text-muted-foreground text-sm">
          The key difference: where does the <strong>actual data</strong> live?
          Toggle below to see.
        </p>
      </div>

      {/* Toggle */}
      <div className="flex gap-3 mb-6">
        {[
          { label: "B-Tree",   val: true  },
          { label: "B+ Tree",  val: false },
        ].map(opt => (
          <button key={opt.label}
            onClick={() => setBTreeMode(opt.val)}
            className={`px-6 py-2.5 rounded-xl border-2 font-bold text-sm transition-all
              ${bTreeMode === opt.val
                ? "bg-primary text-primary-foreground border-primary"
                : "border-border hover:bg-secondary"
              }`}
          >
            {opt.label}
          </button>
        ))}
      </div>

      {/* Visual comparison */}
      <div className="w-full max-w-xl border border-border rounded-xl p-5 bg-card mb-6">
        {/* Internal node row */}
        <div className="mb-6">
          <p className="text-xs font-bold text-muted-foreground mb-2 uppercase tracking-wider">
            Internal Node
          </p>
          <div className="flex gap-2 items-center">
            <div className="flex border-2 border-blue-500/50 bg-blue-500/10 rounded-lg overflow-hidden">
              {[10, 20].map(k => (
                <div key={k}
                  className="px-4 py-2 text-sm font-bold font-mono border-r border-blue-500/30 last:border-0">
                  {k}
                  {bTreeMode && (
                    <span className="ml-1 text-[10px] text-yellow-500">📦</span>
                  )}
                </div>
              ))}
            </div>
            <div className="text-xs text-muted-foreground">
              {bTreeMode
                ? "← Keys + Data pointers stored here"
                : "← Keys only (routing guides)"
              }
            </div>
          </div>
        </div>

        {/* Leaf nodes row */}
        <div>
          <p className="text-xs font-bold text-muted-foreground mb-2 uppercase tracking-wider">
            Leaf Nodes
          </p>
          <div className="flex gap-3 items-center flex-wrap">
            {[[5, 7], [10, 12], [20, 30]].map((group, gi) => (
              <div key={gi} className="flex border-2 border-green-500/50 bg-green-500/10 rounded-lg overflow-hidden">
                {group.map(k => (
                  <div key={k}
                    className="px-4 py-2 text-sm font-bold font-mono border-r border-green-500/30 last:border-0">
                    {k}
                    <span className="ml-1 text-[10px] text-green-400">📦</span>
                  </div>
                ))}
              </div>
            ))}
            {!bTreeMode && (
              <div className="text-blue-400 font-bold text-lg">→ → →</div>
            )}
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            {bTreeMode
              ? "Leaf nodes also store some data (scattered)"
              : "← All data lives here. Leaves linked for range queries →"
            }
          </p>
        </div>
      </div>

      {/* Key insight box */}
      <div className={`w-full max-w-md rounded-xl p-4 text-sm text-center mb-6 transition-all
        ${bTreeMode
          ? "bg-red-500/10 border border-red-500/30 text-red-600 dark:text-red-400"
          : "bg-green-500/10 border border-green-500/30 text-green-600 dark:text-green-400"
        }`}
      >
        {bTreeMode
          ? "❌ B-Tree: Data in internal nodes → harder range queries, more traversal"
          : "✅ B+ Tree: Data ONLY in leaves → shorter tree, fast range queries via leaf links"
        }
      </div>

      <button
        onClick={() => { game.addXp(60, "Structure Insight"); game.nextStage(); }}
        className="px-8 py-3 bg-primary text-primary-foreground font-bold rounded-xl"
      >
        Start Inserting → 🌱
      </button>
    </StageWrapper>
  );

  const renderStage3 = () => {
    const canProceed = liveKeys.length >= 2;

    return (
      <StageWrapper>
        <div className="text-center mb-4 max-w-lg">
          <h3 className="text-xl font-bold text-primary mb-1">🌱 Insert Your First Keys</h3>
          <p className="text-muted-foreground text-sm">
            Insert <code className="bg-secondary px-1 rounded">10</code> then{" "}
            <code className="bg-secondary px-1 rounded">20</code>. Both fit in one leaf (max 2 keys).
            Then try inserting <code className="bg-secondary px-1 rounded">5</code> to trigger overflow!
          </p>
        </div>

        {/* Insert row */}
        <InsertRow onInsert={handleLiveInsert} />

        {/* Inserted chips */}
        {liveKeys.length > 0 && (
          <div className="flex gap-2 flex-wrap justify-center mb-4">
            {liveKeys.map(k => (
              <span key={k}
                className="px-3 py-1 bg-primary/10 border border-primary/30 rounded-lg
                           text-xs font-mono font-bold text-primary">
                {k}
              </span>
            ))}
          </div>
        )}

        {/* Live tree */}
        <div className="w-full max-w-xl border border-border rounded-xl p-4 bg-card mb-4">
          <BPlusSVG root={liveRoot} svgH={200} />
        </div>

        {/* Tip */}
        {liveKeys.length === 2 && (
          <div className="text-xs text-muted-foreground bg-secondary/30 rounded-xl px-4 py-2 mb-4 animate-in fade-in">
            💡 Two keys in one leaf — capacity reached. Try inserting 5 to see what happens!
          </div>
        )}

        {liveKeys.length >= 3 && (
          <div className="text-xs text-green-500 font-bold bg-green-500/10 rounded-xl px-4 py-2 mb-4 animate-in fade-in">
            ✅ Overflow triggered! The leaf split into two. Median was copied up.
          </div>
        )}

        {canProceed && (
          <button
            onClick={() => { game.addXp(60, "First Insertion"); game.nextStage(); }}
            className="px-8 py-3 bg-primary text-primary-foreground font-bold rounded-xl animate-in zoom-in"
          >
            Leaf Overflow Deep Dive → 🍂
          </button>
        )}
      </StageWrapper>
    );
  };

  const renderStage4 = () => {
    // Fixed demo: show 3-key overflow (max=2) → split
    // Before: leaf [5, 10, 20]  (overflowed)
    // After:  leaf [5] | leaf [10, 20], key 10 copied to parent

    const beforeLeaf: BPNode = { id: -1, keys: [5, 10, 20], children: [], isLeaf: true };
    const afterLeft:  BPNode = { id: -2, keys: [5],         children: [], isLeaf: true };
    const afterRight: BPNode = { id: -3, keys: [10, 20],    children: [], isLeaf: true };
    const afterRoot:  BPNode = { id: -4, keys: [10], children: [afterLeft, afterRight], isLeaf: false };

    return (
      <StageWrapper>
        <div className="text-center mb-4 max-w-lg">
          <h3 className="text-xl font-bold text-primary mb-1">🍂 Leaf Overflow Crisis</h3>
          <p className="text-muted-foreground text-sm">
            When a leaf has more than {MAX_KEYS} keys it <strong>splits</strong>.
            The median key is <strong>COPIED</strong> up to the parent
            (it stays in the right leaf too!).
          </p>
        </div>

        {/* Step-by-step panels */}
        <div className="w-full max-w-2xl space-y-4 mb-6">
          {/* Step 0 — overcrowded leaf */}
          <div className={`p-4 rounded-xl border-2 transition-all
            ${leafSplitStep >= 0 ? "border-red-400/50 bg-red-400/5" : "border-border opacity-30"}`}>
            <div className="flex items-center gap-2 mb-3">
              <div className={`size-6 rounded-full flex items-center justify-center text-xs font-bold
                ${leafSplitStep > 0 ? "bg-green-500 text-white" : "bg-red-500 text-white"}`}>
                {leafSplitStep > 0 ? "✓" : "1"}
              </div>
              <span className="text-sm font-bold">Overflow: Leaf contains 3 keys (max = {MAX_KEYS})</span>
            </div>
            <div className="flex justify-center">
              <div className="flex border-2 border-red-500 bg-red-500/10 rounded-lg overflow-hidden
                              animate-pulse">
                {[5, 10, 20].map(k => (
                  <div key={k} className="px-5 py-2 text-sm font-bold font-mono
                                          border-r border-red-400/40 last:border-0">
                    {k}
                  </div>
                ))}
              </div>
            </div>
            <p className="text-xs text-red-400 text-center mt-2">⚠️ Capacity exceeded!</p>
          </div>

          {/* Step 1 — identify median */}
          <div className={`p-4 rounded-xl border-2 transition-all
            ${leafSplitStep >= 1 ? "border-yellow-500/50 bg-yellow-500/5" : "border-border opacity-30"}`}>
            <div className="flex items-center gap-2 mb-3">
              <div className={`size-6 rounded-full flex items-center justify-center text-xs font-bold
                ${leafSplitStep > 1 ? "bg-green-500 text-white"
                : leafSplitStep === 1 ? "bg-yellow-500 text-white"
                : "bg-muted text-muted-foreground"}`}>
                {leafSplitStep > 1 ? "✓" : "2"}
              </div>
              <span className="text-sm font-bold">Identify median key to copy up</span>
            </div>
            {leafSplitStep >= 1 && (
              <div className="flex justify-center gap-3 flex-wrap animate-in fade-in">
                {[5, 10, 20].map(k => (
                  <div key={k}
                    className={`px-5 py-2 rounded-lg border-2 text-sm font-bold font-mono
                      ${k === 10
                        ? "border-yellow-500 bg-yellow-500/20 text-yellow-600 dark:text-yellow-400"
                        : "border-border bg-card"
                      }`}
                  >
                    {k} {k === 10 && "← median (COPY UP)"}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Step 2 — after split */}
          <div className={`p-4 rounded-xl border-2 transition-all
            ${leafSplitStep >= 2 ? "border-green-500/50 bg-green-500/5" : "border-border opacity-30"}`}>
            <div className="flex items-center gap-2 mb-3">
              <div className={`size-6 rounded-full flex items-center justify-center text-xs font-bold
                ${leafSplitStep >= 2 ? "bg-green-500 text-white" : "bg-muted text-muted-foreground"}`}>
                {leafSplitStep >= 2 ? "✓" : "3"}
              </div>
              <span className="text-sm font-bold">Split result — median STAYS in right leaf</span>
            </div>
            {leafSplitStep >= 2 && (
              <div className="animate-in fade-in">
                <BPlusSVG root={afterRoot} svgH={160} />
                <p className="text-xs text-green-500 font-bold text-center mt-2">
                  Key 10 appears in BOTH parent AND right leaf — that's correct for leaf splits!
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Step buttons */}
        <div className="flex gap-3 mb-6">
          {leafSplitStep < 1 && (
            <button
              onClick={() => setLeafSplitStep(1)}
              className="px-6 py-2 bg-red-500 text-white font-bold rounded-xl hover:bg-red-600"
            >
              1️⃣ Show Overflow
            </button>
          )}
          {leafSplitStep === 1 && (
            <button
              onClick={() => setLeafSplitStep(2)}
              className="px-6 py-2 bg-yellow-500 text-white font-bold rounded-xl hover:bg-yellow-600"
            >
              2️⃣ Split & Copy Median
            </button>
          )}
        </div>

        {leafSplitStep >= 2 && (
          <button
            onClick={() => { game.addXp(100, "Leaf Split Master"); game.nextStage(); }}
            className="px-8 py-3 bg-primary text-primary-foreground font-bold rounded-xl animate-in zoom-in"
          >
            Internal Node Strategy → 🧠
          </button>
        )}
      </StageWrapper>
    );
  };

  const renderStage5 = () => {
    // Show internal split: push vs copy
    const CORRECT = "push";
    const isCorrect = internalSplitChoice === CORRECT;
    const isWrong   = internalSplitChoice !== null && !isCorrect;

    // After correct push: internal [10,20] + insert 15 causing overflow
    // Parent: [10, 15, 20] → split → push 15 up
    const afterPushLeft:   BPNode = { id: -10, keys: [10], children: [], isLeaf: false };
    const afterPushRight:  BPNode = { id: -11, keys: [20], children: [], isLeaf: false };
    const afterPushParent: BPNode = { id: -12, keys: [15], children: [afterPushLeft, afterPushRight], isLeaf: false };

    return (
      <StageWrapper>
        <div className="text-center mb-4 max-w-lg">
          <h3 className="text-xl font-bold text-primary mb-1">🧠 Internal Node Strategy</h3>
          <p className="text-muted-foreground text-sm">
            When an <strong>internal node</strong> overflows, the median key is
            <strong> PUSHED UP</strong> (not copied). It does NOT stay in either child.
            This is the critical difference from leaf splits.
          </p>
        </div>

        {/* Overflowed internal node */}
        <div className="mb-6 text-center">
          <p className="text-xs text-muted-foreground mb-2">Internal node overflowed → 3 keys</p>
          <div className="flex justify-center">
            <div className="flex border-2 border-red-500 rounded-lg overflow-hidden bg-red-500/10 animate-pulse">
              {[10, 15, 20].map(k => (
                <div key={k}
                  className={`px-5 py-2 text-sm font-bold font-mono border-r border-red-400/30 last:border-0
                    ${k === 15 ? "bg-yellow-500/20 text-yellow-600 dark:text-yellow-400" : ""}`}
                >
                  {k} {k === 15 && "↑?"}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Choice */}
        <p className="text-sm font-bold mb-3">What should happen to the median (15)?</p>
        <div className="flex gap-4 mb-6">
          <button
            onClick={() => setInternalSplitChoice("push")}
            className={`px-6 py-3 rounded-xl border-2 font-bold text-sm transition-all
              ${internalSplitChoice === "push"
                ? isCorrect
                  ? "border-green-500 bg-green-500/20 text-green-600 dark:text-green-400"
                  : "border-primary bg-primary/20"
                : "border-border hover:bg-secondary"
              }`}
          >
            ⬆️ PUSH UP (remove from both children)
          </button>
          <button
            onClick={() => {
              setInternalSplitChoice("copy");
              game.showMistake("❌ Wrong! Internal nodes PUSH the median up — it's removed from children. Only leaf splits COPY.");
            }}
            className={`px-6 py-3 rounded-xl border-2 font-bold text-sm transition-all
              ${internalSplitChoice === "copy"
                ? "border-red-500 bg-red-500/20 text-red-600 dark:text-red-400"
                : "border-border hover:bg-secondary"
              }`}
          >
            📋 COPY UP (keep in right child too)
          </button>
        </div>

        {/* Result */}
        {isCorrect && (
          <div className="w-full max-w-lg animate-in fade-in mb-6">
            <p className="text-xs text-green-500 font-bold text-center mb-2">
              ✅ Correct! 15 pushed up — gone from both children.
            </p>
            <BPlusSVG root={afterPushParent} svgH={180} />
          </div>
        )}

        {isWrong && (
          <div className="w-full max-w-md bg-red-500/10 border border-red-500/30 rounded-xl p-3 mb-4 text-xs text-center text-red-500">
            ❌ Copy would create a duplicate key in the internal level → tree corruption.
            Internal splits PUSH the median up.
            <button onClick={() => setInternalSplitChoice(null)}
              className="block mx-auto mt-2 px-4 py-1 bg-red-500/20 rounded-lg font-bold">
              Retry 🔄
            </button>
          </div>
        )}

        {isCorrect && (
          <button
            onClick={() => { game.addXp(100, "Internal Node Strategist"); game.nextStage(); }}
            className="px-8 py-3 bg-primary text-primary-foreground font-bold rounded-xl animate-in zoom-in"
          >
            Root Awakens → 👑
          </button>
        )}
      </StageWrapper>
    );
  };

  const renderStage6 = () => {
    const ROOT_KEYS = [10, 20, 5, 6, 12, 30, 7, 17];
    const canInsert = rootSplitKeys.length < ROOT_KEYS.length;
    const nextKey   = ROOT_KEYS[rootSplitKeys.length];

    // Build tree from inserted keys
    const rootTree = rootSplitKeys.reduce<BPNode | null>(
      (r, k) => insertKey(r, k), null
    );
    const treeHeight = (() => {
      let h = 0, n = rootTree;
      while (n && !n.isLeaf) { h++; n = n.children[0]; }
      return h;
    })();
    const hadRootSplit = treeHeight >= 2;

    return (
      <StageWrapper>
        <div className="text-center mb-4 max-w-lg">
          <h3 className="text-xl font-bold text-primary mb-1">👑 The Root Awakens</h3>
          <p className="text-muted-foreground text-sm">
            When the <strong>root itself overflows</strong>, a brand new root is created
            above it — the tree grows taller. Insert keys one by one and watch the root split!
          </p>
        </div>

        {/* Key queue */}
        <div className="flex gap-2 flex-wrap justify-center mb-4">
          {ROOT_KEYS.map((k, i) => {
            const done   = rootSplitKeys.includes(k);
            const isNext = i === rootSplitKeys.length;
            return (
              <div key={`${k}-${i}`}
                className={`w-10 h-10 rounded-lg flex items-center justify-center text-xs font-bold
                             font-mono border-2 transition-all
                  ${done   ? "bg-green-500/20 border-green-500 text-green-600 dark:text-green-400"
                  : isNext ? "bg-primary/20 border-primary text-primary scale-110 animate-pulse"
                  :          "border-border opacity-40"
                  }`}
              >
                {k}
              </div>
            );
          })}
        </div>

        {/* Live tree */}
        <div className={`w-full max-w-2xl border-2 rounded-xl p-4 bg-card mb-4 transition-all
          ${hadRootSplit ? "border-yellow-500/50 shadow-[0_0_20px_hsl(47_95%_53%/0.15)]" : "border-border"}`}>
          <p className="text-xs text-center text-muted-foreground mb-2">
            Tree height: {treeHeight + 1} level{treeHeight > 0 ? "s" : ""}
            {hadRootSplit && " — 👑 Root split has occurred!"}
          </p>
          <BPlusSVG root={rootTree} svgH={280} svgW={900} />
        </div>

        {hadRootSplit && (
          <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-3 max-w-md
                          text-xs text-center text-yellow-600 dark:text-yellow-400 mb-4 animate-in fade-in">
            👑 New root created! The tree grew a new level.
            Unlike other splits, the new root has only ONE key and TWO children.
          </div>
        )}

        {canInsert ? (
          <button
            onClick={() => {
              setRootSplitKeys(k => [...k, nextKey]);
              game.addXp(15, `Inserted ${nextKey}`);
            }}
            className="px-8 py-3 bg-primary text-primary-foreground font-bold rounded-xl
                       flex items-center gap-2"
          >
            <Zap className="size-4" /> Insert {nextKey}
          </button>
        ) : (
          <button
            onClick={() => { game.addXp(80, "Root Creator"); game.nextStage(); }}
            className="px-8 py-3 bg-primary text-primary-foreground font-bold rounded-xl animate-in zoom-in"
          >
            Secret Highway → 🛣️
          </button>
        )}
      </StageWrapper>
    );
  };

  const renderStage7 = () => {
    // Use the live tree built so far
    const leaves = getLeaves(liveRoot);

    return (
      <StageWrapper>
        <div className="text-center mb-4 max-w-lg">
          <h3 className="text-xl font-bold text-primary mb-1">🛣️ The Leaf Highway</h3>
          <p className="text-muted-foreground text-sm">
            Every leaf node is <strong>linked to the next</strong> like a highway.
            This makes range queries a single left-to-right scan — no backtracking needed.
          </p>
        </div>

        {/* Tree with optional leaf links */}
        <div className="w-full max-w-2xl border border-border rounded-xl p-4 bg-card mb-6">
          <BPlusSVG root={liveRoot} showLeafLinks={showLeafLinks} svgH={260} />
        </div>

        {/* Toggle leaf links */}
        <div className="flex gap-3 mb-6">
          <button
            onClick={() => setShowLeafLinks(false)}
            className={`px-5 py-2 rounded-xl border-2 font-bold text-sm transition-all
              ${!showLeafLinks ? "bg-primary text-primary-foreground border-primary" : "border-border"}`}
          >
            Without Links
          </button>
          <button
            onClick={() => setShowLeafLinks(true)}
            className={`px-5 py-2 rounded-xl border-2 font-bold text-sm transition-all
              ${showLeafLinks ? "bg-blue-500 text-white border-blue-500" : "border-border"}`}
          >
            🔗 Show Leaf Links
          </button>
        </div>

        {/* Leaf order display */}
        {showLeafLinks && (
          <div className="w-full max-w-lg animate-in fade-in mb-6">
            <p className="text-xs font-bold text-muted-foreground mb-2">Leaf traversal order (left → right):</p>
            <div className="flex items-center gap-2 flex-wrap">
              {leaves.map((leaf, i) => (
                <div key={leaf.id} className="flex items-center gap-2">
                  <div className="flex border-2 border-blue-500/50 bg-blue-500/10 rounded-lg overflow-hidden">
                    {leaf.keys.map(k => (
                      <span key={k} className="px-3 py-1.5 text-xs font-mono font-bold
                                                border-r border-blue-500/30 last:border-0">
                        {k}
                      </span>
                    ))}
                  </div>
                  {i < leaves.length - 1 && (
                    <ArrowRight className="size-4 text-blue-400 shrink-0" />
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {showLeafLinks && (
          <button
            onClick={() => { game.addXp(70, "Highway Discovered"); game.nextStage(); }}
            className="px-8 py-3 bg-primary text-primary-foreground font-bold rounded-xl animate-in zoom-in"
          >
            Range Query Mission → ⚡
          </button>
        )}
      </StageWrapper>
    );
  };

  const renderStage8 = () => {
    const LO = 5, HI = 20;
    const result      = rangeRun ? rangeQuery(liveRoot, LO, HI) : [];
    const resultIds   = rangeRun
      ? getLeaves(liveRoot)
          .filter(l => l.keys.some(k => k >= LO && k <= HI))
          .map(l => l.id)
      : [];

    return (
      <StageWrapper>
        <div className="text-center mb-4 max-w-lg">
          <h3 className="text-xl font-bold text-primary mb-1">⚡ Range Query Mission</h3>
          <p className="text-muted-foreground text-sm">
            Find all keys between <strong>5</strong> and <strong>20</strong>.
            The B+ Tree finds the first leaf, then scans right — no full tree traversal!
          </p>
        </div>

        {/* Tree with range highlight */}
        <div className="w-full max-w-2xl border border-border rounded-xl p-4 bg-card mb-4">
          <BPlusSVG root={liveRoot}
            showLeafLinks={true}
            highlightIds={resultIds}
            highlightKeys={result}
            svgH={260}
          />
        </div>

        {/* Query box */}
        <div className="bg-black/80 rounded-xl p-4 font-mono text-sm text-green-400 w-full max-w-md mb-6">
          <p className="text-muted-foreground text-xs mb-1">-- Range Query:</p>
          <p>SELECT * FROM tree</p>
          <p>WHERE key <span className="text-yellow-400">BETWEEN</span>{" "}
            <span className="text-orange-400">5</span> AND{" "}
            <span className="text-orange-400">20</span>;
          </p>
        </div>

        {/* Result */}
        {rangeRun && (
          <div className="flex items-center gap-3 mb-6 animate-in fade-in">
            <span className="text-sm font-bold text-green-500">Result:</span>
            {result.map(k => (
              <div key={k}
                className="px-3 py-1.5 bg-yellow-500/20 border-2 border-yellow-500
                           rounded-lg text-sm font-bold font-mono text-yellow-600 dark:text-yellow-400">
                {k}
              </div>
            ))}
            <span className="text-xs text-muted-foreground ml-2">
              ({result.length} keys found via leaf scan)
            </span>
          </div>
        )}

        {!rangeRun ? (
          <button
            onClick={() => {
              setRangeRun(true);
              setRangeResult(rangeQuery(liveRoot, LO, HI));
              game.addXp(80, "Range Query Pro");
            }}
            className="px-8 py-3 bg-primary text-primary-foreground font-bold rounded-xl
                       flex items-center gap-2"
          >
            <Zap className="size-4" /> Execute Range Query [5–20]
          </button>
        ) : (
          <button
            onClick={() => game.nextStage()}
            className="px-8 py-3 bg-primary text-primary-foreground font-bold rounded-xl animate-in zoom-in"
          >
            Performance Comparison → 📊
          </button>
        )}
      </StageWrapper>
    );
  };

  const renderStage9 = () => (
    <StageWrapper>
      <div className="text-center mb-6 max-w-lg">
        <h3 className="text-xl font-bold text-primary mb-1">📊 B-Tree vs B+ Tree Performance</h3>
        <p className="text-muted-foreground text-sm">
          See exactly why B+ Tree wins for database workloads.
        </p>
      </div>

      <div className="w-full max-w-2xl mb-8">
        {/* Comparison table */}
        <div className="border border-border rounded-xl overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-muted">
                <th className="px-4 py-3 text-left font-bold">Property</th>
                <th className="px-4 py-3 text-center font-bold text-red-500">B-Tree</th>
                <th className="px-4 py-3 text-center font-bold text-green-500">B+ Tree</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["Data location",    "All nodes",         "Leaves only"],
                ["Tree height",      "Taller",            "Shorter (more keys/node)"],
                ["Range query",      "Full traversal",    "Leaf scan only"],
                ["Search",           "O(log n)",          "O(log n)"],
                ["Leaf links",       "❌ No",             "✅ Yes"],
                ["Internal nodes",   "Keys + Data",       "Keys only (guides)"],
              ].map(([prop, bt, bpt], i) => (
                <tr key={i} className="border-t border-border">
                  <td className="px-4 py-2.5 font-semibold">{prop}</td>
                  <td className="px-4 py-2.5 text-center text-red-600 dark:text-red-400 font-mono text-xs">
                    {bt}
                  </td>
                  <td className="px-4 py-2.5 text-center text-green-600 dark:text-green-400 font-mono text-xs">
                    {bpt}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Visual range scan comparison */}
      <div className="grid grid-cols-2 gap-4 w-full max-w-xl mb-8">
        <div className="p-4 rounded-xl border-2 border-red-400/40 bg-red-400/5">
          <p className="text-xs font-bold text-red-400 mb-3 text-center">B-Tree Range Query</p>
          <div className="space-y-1">
            {["Root → node A", "Root → node B", "Root → node C", "Root → node D"].map((step, i) => (
              <div key={i} className="flex items-center gap-2 text-xs text-red-500/70">
                <span>↪</span><span>{step}</span>
              </div>
            ))}
          </div>
          <p className="text-[10px] text-red-400 font-bold mt-2">4+ traversals 😰</p>
        </div>
        <div className="p-4 rounded-xl border-2 border-green-500/40 bg-green-500/5">
          <p className="text-xs font-bold text-green-500 mb-3 text-center">B+ Tree Range Query</p>
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs text-green-500/70">
              <span>↪</span><span>Find first leaf</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-green-500">
              <span>→</span><span>Scan right via links</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-green-500">
              <span>→</span><span>Scan right via links</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-green-500">
              <span>✓</span><span>Done!</span>
            </div>
          </div>
          <p className="text-[10px] text-green-500 font-bold mt-2">1 path + horizontal scan ⚡</p>
        </div>
      </div>

      <button
        onClick={() => { game.addXp(60, "Performance Expert"); game.nextStage(); }}
        className="px-8 py-3 bg-primary text-primary-foreground font-bold rounded-xl"
      >
        Final Boss → ⚔️
      </button>
    </StageWrapper>
  );

  const renderStage10 = () => {
    const remaining = BOSS_SEQUENCE.filter(k => !bossKeys.includes(k));
    const nextKey   = remaining[0];
    const allDone   = remaining.length === 0;
    const bossLeaves = getLeaves(bossRoot);
    const bossRange  = allDone ? rangeQuery(bossRoot, 5, 20) : [];

    return (
      <StageWrapper>
        <h3 className="text-2xl font-bold text-primary mb-2 flex items-center gap-2">
          <Swords className="size-6 text-red-500" /> Rebuild the Data Kingdom
        </h3>
        <p className="text-muted-foreground text-sm mb-4 max-w-md text-center">
          Insert the full sequence: <code className="bg-secondary px-1 rounded text-xs">
          {BOSS_SEQUENCE.join(", ")}</code>.
          Watch splits happen automatically. Then run the range query.
        </p>

        {/* Key queue */}
        <div className="flex gap-2 flex-wrap justify-center mb-4">
          {BOSS_SEQUENCE.map((k, i) => {
            const done   = bossKeys.includes(k);
            const isNext = k === nextKey && !allDone;
            return (
              <div key={`${k}-${i}`}
                className={`w-10 h-10 rounded-lg flex items-center justify-center text-xs font-bold
                             font-mono border-2 transition-all
                  ${done   ? "bg-green-500/20 border-green-500 text-green-600 dark:text-green-400"
                  : isNext ? "bg-primary/20 border-primary text-primary scale-110"
                  :          "border-border opacity-40"
                  }`}
              >
                {k}
              </div>
            );
          })}
        </div>

        {/* Live boss tree */}
        <div className={`w-full max-w-2xl border-2 rounded-xl p-4 bg-card mb-4 transition-all
          ${allDone ? "border-green-500/30" : "border-border"}`}>
          <BPlusSVG root={bossRoot}
            showLeafLinks={allDone}
            highlightKeys={allDone ? bossRange : []}
            svgH={300} svgW={900}
          />
        </div>

        {/* Stats */}
        <div className="flex gap-4 mb-6 text-xs text-muted-foreground">
          <span>Inserted: <strong>{bossKeys.length}/{BOSS_SEQUENCE.length}</strong></span>
          <span>Leaves: <strong>{bossLeaves.length}</strong></span>
          {allDone && (
            <span className="text-green-500 font-bold">
              Range [5–20]: {bossRange.join(", ")}
            </span>
          )}
        </div>

        {!allDone ? (
          <button
            onClick={() => {
              setBossRoot(r => insertKey(r, nextKey));
              setBossKeys(k => [...k, nextKey]);
              game.addXp(30, `Boss: inserted ${nextKey}`);
            }}
            className="px-8 py-3 bg-primary text-primary-foreground font-bold rounded-xl
                       flex items-center gap-2"
          >
            <Zap className="size-4" /> Insert {nextKey}
          </button>
        ) : (
          <button
            onClick={() => { game.addXp(300, "Kingdom Rebuilt"); game.nextStage(); }}
            className="px-10 py-3 bg-primary text-primary-foreground font-bold rounded-xl
                       animate-in zoom-in text-lg"
          >
            🏆 Claim Knight Title
          </button>
        )}
      </StageWrapper>
    );
  };

  const renderStage11 = () => (
    <CompletionScreen
      missionTitle="Data Kingdom Restored! 🏰"
      missionSubtitle="You rebuilt the B+ Tree highway and brought order to the kingdom."
      xp={game.xp}
      xpLog={game.xpLog}
      achievements={[
        { icon: <span>🍂</span>, label: "Leaf Split Master"         },
        { icon: <span>🧠</span>, label: "Internal Node Strategist"  },
        { icon: <span>👑</span>, label: "Root Creator"              },
        { icon: <span>⚡</span>, label: "Range Query Pro"           },
        { icon: <span>🏰</span>, label: "Kingdom Architect"         },
      ]}
      concepts={[
        { label: "Internal Nodes",   description: "Store keys only — act as routing guides to leaf nodes." },
        { label: "Leaf Nodes",       description: "Store all actual data. Linked left-to-right as a highway." },
        { label: "Leaf Split",       description: "Median is COPIED up — it stays in the right leaf too." },
        { label: "Internal Split",   description: "Median is PUSHED up — removed from both children." },
        { label: "Root Split",       description: "A new root is created — the only way tree height grows." },
        { label: "Range Queries",    description: "Jump to first matching leaf, then scan right via links." },
      ]}
      onReset={game.reset}
    />
  );

  return (
    <SimShell
      title="B+ Tree Kingdom"
      subtitle="Data Structures Lab — B+ Tree"
      xp={game.xp}
      stage={game.stage}
      totalStages={TOTAL_STAGES}
      mistakeMessage={game.mistakeMessage}
      successMessage={game.successMessage}
      icon={<span className="text-lg">🏰</span>}
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





