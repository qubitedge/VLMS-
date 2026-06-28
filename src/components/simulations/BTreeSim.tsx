/**
 * BTreeSim.tsx
 * ============
 * "B-Tree Guardian: The Balanced Realm"
 * Complete 7-stage simulation — self-contained, no external tree libs needed.
 *
 * Stages:
 *  1. Birth of a Node       — understand BTreeNode structure
 *  2. Rules of Balance      — t, min/max keys, violations
 *  3. Path of Search        — click-based traversal
 *  4. Insert Without Chaos  — insertNonFull into leaf
 *  5. The Split Ritual      — splitChild mechanics
 *  6. The Root Awakens      — root split + tree grows taller
 *  7. Final Boss            — insert sequence 10,20,5,6,12,30,7,17
 *
 * Design palette (forest / arcane):
 *   bg:       #0d1117  (near-black)
 *   surface:  #161b22  (dark card)
 *   primary:  #3fb950  (emerald-green)
 *   accent:   #58a6ff  (sky-blue for highlights)
 *   danger:   #f85149  (red violations)
 *   gold:     #e3b341  (XP / boss)
 *   muted:    #8b949e
 */

import { useState, useEffect, useRef, JSX } from "react";
import {
  Shield, Swords, Eye, TreePine, Zap, Star, Crown, Split,
} from "lucide-react";
import {
  useSimGame,
  SimShell,
  StageWrapper,
  CompletionScreen,
} from "@/components/simulations/shared";

// ═══════════════════════════════════════════════════════════════════════════════
// STEP 1 — B-TREE DATA STRUCTURES & CORE ALGORITHMS
// ═══════════════════════════════════════════════════════════════════════════════

const T = 2; // minimum degree — max keys = 2t-1 = 3, min keys = t-1 = 1

interface BTreeNode {
  id: number;           // stable identity for React keys
  keys: number[];       // sorted keys stored in this node
  children: BTreeNode[];
  isLeaf: boolean;
}

let _nodeIdCounter = 0;
function makeNode(isLeaf: boolean): BTreeNode {
  return { id: ++_nodeIdCounter, keys: [], children: [], isLeaf };
}

/** Deep-clone a BTreeNode tree so React state is always fresh */
function cloneBTree(node: BTreeNode | null): BTreeNode | null {
  if (!node) return null;
  return {
    id: node.id,
    keys: [...node.keys],
    isLeaf: node.isLeaf,
    children: node.children.map(c => cloneBTree(c) as BTreeNode),
  };
}

/** Insert into a non-full node (assumes node is not full) */
function insertNonFull(node: BTreeNode, k: number): void {
  let i = node.keys.length - 1;
  if (node.isLeaf) {
    node.keys.push(0);
    while (i >= 0 && k < node.keys[i]) {
      node.keys[i + 1] = node.keys[i];
      i--;
    }
    node.keys[i + 1] = k;
  } else {
    while (i >= 0 && k < node.keys[i]) i--;
    i++;
    if (node.children[i].keys.length === 2 * T - 1) {
      splitChild(node, i, node.children[i]);
      if (k > node.keys[i]) i++;
    }
    insertNonFull(node.children[i], k);
  }
}

/** Split child[i] of parent which is full (has 2t-1 keys) */
function splitChild(parent: BTreeNode, i: number, fullChild: BTreeNode): void {
  const newNode = makeNode(fullChild.isLeaf);
  const mid = T - 1; // index of median

  newNode.keys = fullChild.keys.splice(mid + 1); // right half
  const medianKey = fullChild.keys.splice(mid, 1)[0]; // median key

  if (!fullChild.isLeaf) {
    newNode.children = fullChild.children.splice(T);
  }

  // Insert medianKey into parent
  parent.keys.splice(i, 0, medianKey);
  parent.children.splice(i + 1, 0, newNode);
}

/** Full B-Tree insert (handles root split) */
function btreeInsert(root: BTreeNode, k: number): BTreeNode {
  if (root.keys.length === 2 * T - 1) {
    // Root is full — create new root, split old root
    const newRoot = makeNode(false);
    newRoot.children.push(root);
    splitChild(newRoot, 0, root);
    insertNonFull(newRoot, k);
    return newRoot;
  }
  insertNonFull(root, k);
  return root;
}

/** Return the search path (array of node ids) for a key */
function searchPath(root: BTreeNode, k: number): number[] {
  const path: number[] = [];
  let node: BTreeNode | null = root;
  while (node) {
    path.push(node.id);
    let i = 0;
    while (i < node.keys.length && k > node.keys[i]) i++;
    if (i < node.keys.length && k === node.keys[i]) break; // found
    if (node.isLeaf) break;
    node = node.children[i];
  }
  return path;
}

/** Max key count for degree T */
const MAX_KEYS = 2 * T - 1;

// ═══════════════════════════════════════════════════════════════════════════════
// STEP 2 — TREE SVG RENDERER
// ═══════════════════════════════════════════════════════════════════════════════

interface LayoutNode {
  node: BTreeNode;
  x: number;
  y: number;
  width: number;
}

function computeLayout(
  node: BTreeNode,
  depth: number,
  leftBound: number,
  acc: LayoutNode[]
): { centerX: number; totalWidth: number } {
  const NODE_W = Math.max(60, node.keys.length * 28 + 16);
  const H_GAP = 20;

  if (node.isLeaf || node.children.length === 0) {
    const x = leftBound;
    acc.push({ node, x, y: depth * 90, width: NODE_W });
    return { centerX: x + NODE_W / 2, totalWidth: NODE_W };
  }

  let cursor = leftBound;
  const childCenters: number[] = [];
  let totalW = 0;

  node.children.forEach(child => {
    const { centerX, totalWidth } = computeLayout(child, depth + 1, cursor, acc);
    childCenters.push(centerX);
    cursor += totalWidth + H_GAP;
    totalW += totalWidth + H_GAP;
  });
  totalW -= H_GAP;

  const nodeCenter = (childCenters[0] + childCenters[childCenters.length - 1]) / 2;
  const x = nodeCenter - NODE_W / 2;
  acc.push({ node, x, y: depth * 90, width: NODE_W });

  return { centerX: nodeCenter, totalWidth: Math.max(totalW, NODE_W) };
}

interface TreeSVGProps {
  root: BTreeNode | null;
  highlightIds?: number[];    // node ids to highlight in gold
  violationIds?: number[];    // node ids to highlight in red
}

function BTreeSVG({ root, highlightIds = [], violationIds = [] }: TreeSVGProps) {
  if (!root) return (
    <div className="flex items-center justify-center h-32 text-[#8b949e] italic text-sm">
      🌑 The data forest is empty…
    </div>
  );

  const layoutAcc: LayoutNode[] = [];
  const { totalWidth } = computeLayout(root, 0, 10, layoutAcc);
  const svgW = Math.max(totalWidth + 20, 400);
  const svgH = (getDepth(root) + 1) * 90 + 50;

  const posMap = new Map(layoutAcc.map(l => [l.node.id, l]));

  // Draw edges
  const edges: JSX.Element[] = [];
  layoutAcc.forEach(({ node, x, y, width }) => {
    node.children.forEach(child => {
      const cp = posMap.get(child.id);
      if (!cp) return;
      const x1 = x + width / 2;
      const y1 = y + 24;
      const x2 = cp.x + cp.width / 2;
      const y2 = cp.y - 4;
      edges.push(
        <line key={`${node.id}-${child.id}`}
          x1={x1} y1={y1} x2={x2} y2={y2}
          stroke="#30363d" strokeWidth="1.5"
        />
      );
    });
  });

  // Draw nodes
  const nodes: JSX.Element[] = layoutAcc.map(({ node, x, y, width }) => {
    const isHL = highlightIds.includes(node.id);
    const isViol = violationIds.includes(node.id);
    const borderColor = isViol ? "#f85149" : isHL ? "#e3b341" : "#30363d";
    const bgColor = isViol ? "#2d1b1b" : isHL ? "#2d2a15" : "#161b22";
    const keyW = 26;
    const keyH = 24;
    const startX = (width - node.keys.length * keyW - (node.keys.length - 1) * 2) / 2;

    return (
      <g key={node.id} className="transition-all duration-500">
        {/* Node background box */}
        <rect x={x} y={y - 12} width={width} height={28}
          rx={6} fill={bgColor} stroke={borderColor} strokeWidth={isHL || isViol ? 2 : 1}
          style={{ filter: isHL ? "drop-shadow(0 0 6px #e3b341)" : isViol ? "drop-shadow(0 0 6px #f85149)" : undefined }}
        />
        {/* Keys */}
        {node.keys.map((k, ki) => {
          const kx = x + startX + ki * (keyW + 2);
          return (
            <g key={ki}>
              <rect x={kx} y={y - 10} width={keyW} height={keyH - 4}
                rx={3} fill={isHL ? "#3d3010" : "#1f2937"}
                stroke={isHL ? "#e3b341" : "#374151"}
              />
              <text x={kx + keyW / 2} y={y + 7} textAnchor="middle"
                fill={isHL ? "#e3b341" : "#e6edf3"} fontSize={11} fontWeight="bold">
                {k}
              </text>
            </g>
          );
        })}
        {/* Full indicator */}
        {node.keys.length === MAX_KEYS && (
          <text x={x + width - 6} y={y - 14} textAnchor="end"
            fill="#f85149" fontSize={9} fontWeight="bold">FULL</text>
        )}
      </g>
    );
  });

  return (
    <div className="overflow-x-auto">
      <svg width={svgW} height={svgH} style={{ minWidth: svgW }}>
        {edges}
        {nodes}
      </svg>
    </div>
  );
}

function getDepth(node: BTreeNode): number {
  if (node.isLeaf || node.children.length === 0) return 0;
  return 1 + Math.max(...node.children.map(getDepth));
}

// ═══════════════════════════════════════════════════════════════════════════════
// STEP 3 — REUSABLE QUIZ CARD (no external QuizBlock needed)
// ═══════════════════════════════════════════════════════════════════════════════

interface QuizCardProps {
  caseNum: number;
  question: string;
  options: { label: string; value: string }[];
  correct: string;
  okText: string;
  badText: string;
  selected: string | null;
  attempts: number;
  locked: boolean;
  onSelect: (v: string) => void;
  onRetry: () => void;
}

function QuizCard({ caseNum, question, options, correct, okText, badText,
  selected, attempts, locked, onSelect, onRetry }: QuizCardProps) {
  const isCorrect = selected === correct;
  const isWrong = selected !== null && !isCorrect;

  return (
    <div className={`rounded-xl border p-4 transition-all duration-300 ${
      isCorrect ? "border-[#3fb950] bg-[#0d2318]"
      : isWrong ? "border-[#f85149] bg-[#2d1b1b]"
      : "border-[#30363d] bg-[#161b22]"
    }`}>
      <div className="flex items-start justify-between gap-2 mb-3">
        <p className="text-sm font-semibold text-[#e6edf3]">
          <span className="text-[#3fb950] mr-1">Q{caseNum}.</span>{question}
        </p>
        {attempts > 0 && !isCorrect && (
          <span className="text-xs text-[#f85149] whitespace-nowrap">
            {attempts}× wrong
          </span>
        )}
      </div>

      <div className="space-y-2">
        {options.map(opt => {
          const isPicked = selected === opt.value;
          const isThis = opt.value === correct;
          let s = "border-[#30363d] bg-[#0d1117] text-[#8b949e] hover:border-[#58a6ff]";
          if (isCorrect && isThis) s = "border-[#3fb950] bg-[#0d2318] text-[#3fb950]";
          else if (isWrong && isPicked) s = "border-[#f85149] bg-[#2d1b1b] text-[#f85149]";
          else if (locked) s = "border-[#21262d] bg-[#0d1117] text-[#484f58] cursor-not-allowed";

          return (
            <button key={opt.value}
              onClick={() => !locked && onSelect(opt.value)}
              disabled={locked}
              className={`w-full text-left px-3 py-2 rounded-lg border text-sm transition-all ${s}`}
            >
              <span className="font-mono text-xs mr-2 opacity-50">{opt.value.toUpperCase()}.</span>
              {opt.label}
            </button>
          );
        })}
      </div>

      {selected !== null && (
        <div className="mt-3 flex items-start justify-between gap-2">
          <p className={`text-xs leading-relaxed ${isCorrect ? "text-[#3fb950]" : "text-[#f85149]"}`}>
            {isCorrect ? okText : badText}
          </p>
          {isWrong && (
            <button onClick={onRetry}
              className="shrink-0 px-2 py-1 text-xs font-bold rounded-lg bg-[#1f2d1f]
                         text-[#e3b341] border border-[#e3b341]/50 hover:bg-[#2d3a1f] transition">
              🔄 Retry
            </button>
          )}
        </div>
      )}

      {isCorrect && (
        <p className="mt-1 text-xs text-[#3fb950] font-semibold">
          ✓ Locked in{attempts > 0 && <span className="text-[#8b949e] font-normal ml-1">(solved in {attempts + 1} tries)</span>}
        </p>
      )}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// STEP 4 — CONSTANTS & QUIZ DATA (outside component)
// ═══════════════════════════════════════════════════════════════════════════════

const TOTAL_STAGES = 7;

const SEARCH_TREE_KEYS = [10, 20, 5]; // pre-built tree for Stage 3
const SEARCH_TARGET = 17;             // staged search — key to find

const BOSS_SEQUENCE = [10, 20, 5, 6, 12, 30, 7, 17];

interface QuizDef {
  q: string;
  options: { label: string; value: string }[];
  correct: string;
  ok: string;
  bad: string;
}

const BTREE_QUIZ: QuizDef[] = [
  {
    q: `A B-Tree with minimum degree t=2 has a node with ${MAX_KEYS} keys. What must happen before inserting?`,
    options: [
      { label: "Insert anyway — nodes can grow indefinitely", value: "a" },
      { label: "Split the node first", value: "b" },
      { label: "Delete a key to make room", value: "c" },
    ],
    correct: "b",
    ok: "✅ Correct! A full node (2t-1 keys) must be split before any key is inserted into it.",
    bad: "❌ Nodes have a hard maximum of 2t-1 keys. Always split when full.",
  },
  {
    q: "During splitChild, which key moves to the parent?",
    options: [
      { label: "The smallest key", value: "a" },
      { label: "The largest key", value: "b" },
      { label: "The median (middle) key", value: "c" },
    ],
    correct: "c",
    ok: "✅ Exactly! The median key at index t-1 rises to the parent, preserving balance.",
    bad: "❌ Only the median (middle) key rises — not the smallest or largest.",
  },
  {
    q: "When the root is full and a new key is inserted, what happens to the tree height?",
    options: [
      { label: "Height stays the same", value: "a" },
      { label: "Height increases by 1 (new root created)", value: "b" },
      { label: "Height decreases", value: "c" },
    ],
    correct: "b",
    ok: "✅ Right! A new empty root is created, the old root becomes its child and splits — height grows by 1.",
    bad: "❌ Root splits create a new root above — the only way B-Trees grow taller.",
  },
];

// ═══════════════════════════════════════════════════════════════════════════════
// STEP 5 — HELPER: build initial search demo tree
// ═══════════════════════════════════════════════════════════════════════════════

function buildSearchDemoTree(): BTreeNode {
  let r = makeNode(true);
  r.keys = [10, 20];
  const left = makeNode(true);  left.keys = [5];
  const mid  = makeNode(true);  mid.keys  = [15, 17];
  const right = makeNode(true); right.keys = [25];
  r.isLeaf = false;
  r.children = [left, mid, right];
  return r;
}

// ═══════════════════════════════════════════════════════════════════════════════
// STEP 6 — MAIN COMPONENT
// ═══════════════════════════════════════════════════════════════════════════════

export function BTreeSim() {

  // ── Game engine ───────────────────────────────────────────────────────────
  const game = useSimGame(TOTAL_STAGES, () => {
    _nodeIdCounter = 0;
    setTree(null);
    setInputVal("");
    // Stage 2
    setRuleTree(buildRuleTree());
    // Stage 3
    setSearchTree(buildSearchDemoTree());
    setSearchStep(0);
    setSearchPath_([]);
    // Stage 4
    setLeafNode(buildLeafDemo());
    setLeafInserted(false);
    // Stage 5
    setSplitNode(buildFullNode());
    setSplitDone(false);
    // Stage 6
    setRootTree(buildFullRootTree());
    setRootSplit(false);
    // Stage 7 (quiz + boss)
    setQuizAnswers([null, null, null]);
    setQuizLocked([false, false, false]);
    setQuizAttempts([0, 0, 0]);
    setBossTree(null);
    setBossSeq([]);
  });

  // ── Shared ────────────────────────────────────────────────────────────────
  const [tree,     setTree]     = useState<BTreeNode | null>(null);
  const [inputVal, setInputVal] = useState("");

  // ── Stage 1: node builder ─────────────────────────────────────────────────
  // Just inserts 1 key so student sees root node form
  const s1Done = tree !== null;

  // ── Stage 2: rule demonstration ───────────────────────────────────────────
  function buildRuleTree(): BTreeNode {
    const r = makeNode(false);
    r.keys = [15];
    const l = makeNode(true); l.keys = [5, 10];
    const ri = makeNode(true); ri.keys = [20, 25, 30]; // this one is FULL
    r.children = [l, ri];
    return r;
  }
  const [ruleTree, setRuleTree] = useState<BTreeNode>(buildRuleTree);

  // ── Stage 3: search path ──────────────────────────────────────────────────
  const [searchTree, setSearchTree]   = useState<BTreeNode>(buildSearchDemoTree);
  const [searchPath_, setSearchPath_] = useState<number[]>([]);
  const [searchStep, setSearchStep]   = useState(0);

  // Pre-compute the full path for SEARCH_TARGET
  const fullSearchPath = searchPath(searchTree, SEARCH_TARGET);

  // ── Stage 4: insertNonFull demo ───────────────────────────────────────────
  function buildLeafDemo(): BTreeNode {
    const n = makeNode(true);
    n.keys = [8, 15];
    return n;
  }
  const [leafNode,     setLeafNode]     = useState<BTreeNode>(buildLeafDemo);
  const [leafInserted, setLeafInserted] = useState(false);
  const INSERT_KEY = 11; // the key to insert in stage 4

  // ── Stage 5: split demo ───────────────────────────────────────────────────
  function buildFullNode(): BTreeNode {
    // parent with one full child
    const child = makeNode(true);
    child.keys = [5, 10, 15]; // FULL (2t-1 = 3)
    const parent = makeNode(false);
    parent.keys = [20];
    parent.children = [child, (() => { const n = makeNode(true); n.keys = [25]; return n; })()];
    return parent;
  }
  const [splitNode, setSplitNode] = useState<BTreeNode>(buildFullNode);
  const [splitDone, setSplitDone] = useState(false);

  // ── Stage 6: root split demo ──────────────────────────────────────────────
  function buildFullRootTree(): BTreeNode {
    const r = makeNode(true);
    r.keys = [10, 20, 30]; // FULL root
    return r;
  }
  const [rootTree,  setRootTree]  = useState<BTreeNode>(buildFullRootTree);
  const [rootSplit, setRootSplit] = useState(false);

  // ── Stage 7: quiz + boss ──────────────────────────────────────────────────
  const [quizAnswers,  setQuizAnswers]  = useState<(string | null)[]>([null, null, null]);
  const [quizLocked,   setQuizLocked]   = useState<boolean[]>([false, false, false]);
  const [quizAttempts, setQuizAttempts] = useState<number[]>([0, 0, 0]);
  const [bossTree,     setBossTree]     = useState<BTreeNode | null>(null);
  const [bossSeq,      setBossSeq]      = useState<number[]>([]);

  const allQuizCorrect = BTREE_QUIZ.every((q, i) => quizAnswers[i] === q.correct);

  // Quiz handlers
  const handleQuizSelect = (i: number, value: string) => {
    if (quizLocked[i]) return;
    const ua = [...quizAnswers]; ua[i] = value; setQuizAnswers(ua);
    if (value === BTREE_QUIZ[i].correct) {
      const ul = [...quizLocked]; ul[i] = true; setQuizLocked(ul);
    } else {
      const at = [...quizAttempts]; at[i]++; setQuizAttempts(at);
    }
  };
  const handleQuizRetry = (i: number) => {
    const ua = [...quizAnswers]; ua[i] = null; setQuizAnswers(ua);
  };

  // Boss insert
  const handleBossInsert = (v: number) => {
    if (bossSeq.includes(v)) return;
    setBossTree(prev => {
      const cloned = prev ? cloneBTree(prev) as BTreeNode : makeNode(true);
      if (!prev) { cloned.keys = [v]; return cloned; }
      return btreeInsert(cloned, v);
    });
    setBossSeq(s => [...s, v]);
  };

  // ═══════════════════════════════════════════════════════════════════════════
  // STAGE RENDERERS
  // ═══════════════════════════════════════════════════════════════════════════

  // ── Stage 1: Birth of a Node ──────────────────────────────────────────────
  const renderStage1 = () => (
    <StageWrapper>
      <div className="text-center mb-6 max-w-lg">
        <h2 className="text-3xl font-bold text-[#3fb950] mb-2">🌳 Birth of a Node</h2>
        <p className="text-[#8b949e] text-sm leading-relaxed">
          You are the <strong className="text-[#e6edf3]">Guardian of the Data Forest</strong>.
          Knowledge lives in B-Tree nodes — containers that hold up to{" "}
          <span className="text-[#e3b341] font-bold">{MAX_KEYS} keys</span> (since t={T}).
          Plant the first key to awaken the forest.
        </p>
      </div>

      {/* Node anatomy diagram */}
      <div className="mb-6 p-4 rounded-xl border border-[#30363d] bg-[#161b22] w-full max-w-md">
        <p className="text-xs text-[#8b949e] mb-2 text-center uppercase tracking-wider">Node Structure</p>
        <div className="flex items-center gap-2 justify-center mb-3">
          {Array.from({ length: MAX_KEYS }).map((_, i) => (
            <div key={i}
              className="w-10 h-10 rounded-lg border-2 border-dashed border-[#30363d]
                         bg-[#0d1117] flex items-center justify-center text-xs text-[#484f58]">
              {tree?.keys[i] ?? "—"}
            </div>
          ))}
        </div>
        <div className="flex items-center justify-center gap-1 text-xs text-[#8b949e]">
          <span>keys[]</span>
          <span className="mx-2 text-[#30363d]">|</span>
          <span>isLeaf: {!tree ? "true" : String(tree.isLeaf)}</span>
          <span className="mx-2 text-[#30363d]">|</span>
          <span>children: {tree?.children.length ?? 0}</span>
        </div>
      </div>

      {tree && (
        <div className="mb-4 w-full max-w-md">
          <BTreeSVG root={tree} highlightIds={[tree.id]} />
        </div>
      )}

      <div className="flex items-center gap-3 mb-4">
        <input type="number" placeholder="Enter first key (e.g. 10)"
          value={inputVal}
          onChange={e => setInputVal(e.target.value)}
          className="w-52 px-4 py-2 rounded-xl bg-[#0d1117] border border-[#30363d]
                     text-[#e6edf3] text-center focus:outline-none focus:ring-2 focus:ring-[#3fb950]"
        />
        <button
          onClick={() => {
            const v = parseInt(inputVal);
            if (isNaN(v)) return;
            const n = makeNode(true);
            n.keys = [v];
            setTree(n);
            setInputVal("");
          }}
          className="px-5 py-2 bg-[#3fb950] text-[#0d1117] font-bold rounded-xl
                     hover:bg-[#2ea843] transition"
        >
          Plant Key 🌱
        </button>
      </div>

      {s1Done && (
        <button
          onClick={() => { game.addXp(50, "Node Architect 🏗️"); game.nextStage(); }}
          className="px-8 py-3 bg-[#3fb950] text-[#0d1117] font-bold rounded-xl
                     animate-in zoom-in duration-300"
        >
          Learn the Rules →
        </button>
      )}
      <p className="text-xs text-[#484f58] mt-2">Max keys per node = 2t-1 = {MAX_KEYS} (t={T})</p>
    </StageWrapper>
  );

  // ── Stage 2: Rules of Balance ─────────────────────────────────────────────
  const renderStage2 = () => {
    const fullNodes = ruleTree
      ? [ruleTree, ...ruleTree.children].filter(n => n.keys.length === MAX_KEYS).map(n => n.id)
      : [];

    return (
      <StageWrapper>
        <div className="text-center mb-4 max-w-md">
          <h3 className="text-xl font-bold text-[#3fb950] mb-1">⚖️ The Rules of Balance</h3>
          <p className="text-[#8b949e] text-sm">
            Every B-Tree node obeys sacred laws. Violators glow{" "}
            <span className="text-[#f85149]">red</span>.
          </p>
        </div>

        <div className="grid grid-cols-3 gap-3 w-full max-w-md mb-5 text-center">
          {[
            { label: "Max keys", value: `2t-1 = ${MAX_KEYS}`, color: "#f85149" },
            { label: "Min keys", value: `t-1 = ${T - 1}`, color: "#e3b341" },
            { label: "Min degree", value: `t = ${T}`, color: "#58a6ff" },
          ].map(r => (
            <div key={r.label} className="p-3 rounded-xl border border-[#30363d] bg-[#161b22]">
              <p className="text-lg font-bold" style={{ color: r.color }}>{r.value}</p>
              <p className="text-xs text-[#8b949e]">{r.label}</p>
            </div>
          ))}
        </div>

        <div className="mb-2 text-xs text-[#f85149] font-semibold">
          {fullNodes.length > 0 ? `⚠️ ${fullNodes.length} node(s) are FULL and need splitting` : "✅ All nodes within limits"}
        </div>

        <BTreeSVG root={ruleTree} violationIds={fullNodes} />

        <p className="text-xs text-[#8b949e] mt-2 mb-5">
          Red = FULL node (has {MAX_KEYS} keys). These must split before accepting new keys.
        </p>

        <button
          onClick={() => { game.addXp(75, "Balance Mastered ⚖️"); game.nextStage(); }}
          className="px-8 py-3 bg-[#3fb950] text-[#0d1117] font-bold rounded-xl"
        >
          Learn to Search →
        </button>
      </StageWrapper>
    );
  };

  // ── Stage 3: Path of Search ───────────────────────────────────────────────
  const renderStage3 = () => {
    const currentNodeId = fullSearchPath[searchStep] ?? null;
    const done = searchStep >= fullSearchPath.length;

    return (
      <StageWrapper>
        <div className="text-center mb-4 max-w-md">
          <h3 className="text-xl font-bold text-[#58a6ff] mb-1">🔍 Path of Search</h3>
          <p className="text-[#8b949e] text-sm">
            To insert key <span className="text-[#e3b341] font-bold">{SEARCH_TARGET}</span>,
            first traverse the tree to find its correct leaf position.
          </p>
        </div>

        <BTreeSVG root={searchTree} highlightIds={fullSearchPath.slice(0, searchStep + 1)} />

        <div className="mt-4 p-3 rounded-xl border border-[#30363d] bg-[#161b22] w-full max-w-md text-sm text-[#8b949e] mb-4">
          {done ? (
            <span className="text-[#3fb950] font-semibold">
              ✅ Key {SEARCH_TARGET} found at node [{fullSearchPath[fullSearchPath.length - 1]}]! Correct leaf located.
            </span>
          ) : (
            <span>
              Visiting node <span className="text-[#e3b341]">[{currentNodeId}]</span> —
              step {searchStep + 1} of {fullSearchPath.length}
            </span>
          )}
        </div>

        {!done ? (
          <button
            onClick={() => setSearchStep(s => s + 1)}
            className="px-6 py-2 bg-[#58a6ff] text-[#0d1117] font-bold rounded-xl
                       hover:bg-[#4192f5] transition mb-3"
          >
            → Follow Path (step {searchStep + 1}/{fullSearchPath.length})
          </button>
        ) : (
          <button
            onClick={() => { game.addXp(100, "Path Finder 🧭"); game.nextStage(); }}
            className="px-8 py-3 bg-[#3fb950] text-[#0d1117] font-bold rounded-xl
                       animate-in zoom-in duration-300"
          >
            Learn insertNonFull →
          </button>
        )}
      </StageWrapper>
    );
  };

  // ── Stage 4: Insert Without Chaos ────────────────────────────────────────
  const renderStage4 = () => {
    const displayNode = leafInserted ? leafNode : leafNode;

    return (
      <StageWrapper>
        <div className="text-center mb-4 max-w-md">
          <h3 className="text-xl font-bold text-[#3fb950] mb-1">⚡ Insert Without Chaos</h3>
          <p className="text-[#8b949e] text-sm">
            This leaf node has room. Insert key{" "}
            <span className="text-[#e3b341] font-bold">{INSERT_KEY}</span> into the correct
            sorted position using <code className="text-[#58a6ff] text-xs">insertNonFull</code>.
          </p>
        </div>

        {/* Animated before/after */}
        <div className="flex gap-6 mb-5 items-start justify-center">
          <div className="text-center">
            <p className="text-xs text-[#8b949e] mb-2">Before</p>
            <div className="flex gap-1">
              {[8, 15].map(k => (
                <div key={k} className="w-10 h-10 rounded-lg bg-[#161b22] border border-[#30363d]
                                        flex items-center justify-center text-sm font-bold text-[#e6edf3]">
                  {k}
                </div>
              ))}
            </div>
          </div>
          <div className="text-[#3fb950] text-2xl mt-4">→</div>
          <div className="text-center">
            <p className="text-xs text-[#8b949e] mb-2">After inserting {INSERT_KEY}</p>
            <div className="flex gap-1">
              {[8, INSERT_KEY, 15].map((k, i) => (
                <div key={i}
                  className={`w-10 h-10 rounded-lg border flex items-center justify-center
                              text-sm font-bold transition-all duration-500 ${
                    k === INSERT_KEY && leafInserted
                      ? "bg-[#0d2318] border-[#3fb950] text-[#3fb950] scale-110"
                      : leafInserted
                      ? "bg-[#161b22] border-[#30363d] text-[#e6edf3]"
                      : k === INSERT_KEY
                      ? "bg-[#0d1117] border-dashed border-[#484f58] text-[#484f58]"
                      : "bg-[#161b22] border-[#30363d] text-[#e6edf3]"
                  }`}>
                  {leafInserted || k !== INSERT_KEY ? k : "?"}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="p-3 rounded-lg bg-[#161b22] border border-[#30363d] w-full max-w-md mb-5 font-mono text-xs text-[#8b949e]">
          <span className="text-[#58a6ff]">insertNonFull</span>(node, <span className="text-[#e3b341]">{INSERT_KEY}</span>):<br/>
          {"  "}i = node.keys.length - 1 <span className="text-[#3fb950]">// = 1</span><br/>
          {"  "}while (i ≥ 0 && {INSERT_KEY} &lt; keys[i]) shift right<br/>
          {"  "}place {INSERT_KEY} at sorted position → [8, <span className="text-[#3fb950]">{INSERT_KEY}</span>, 15]
        </div>

        {!leafInserted ? (
          <button
            onClick={() => {
              const n = cloneBTree(leafNode) as BTreeNode;
              insertNonFull(n, INSERT_KEY);
              setLeafNode(n);
              setLeafInserted(true);
            }}
            className="px-6 py-2 bg-[#e3b341] text-[#0d1117] font-bold rounded-xl
                       hover:bg-[#d4a534] transition"
          >
            ▶ Run insertNonFull({INSERT_KEY})
          </button>
        ) : (
          <button
            onClick={() => { game.addXp(125, "Precision Inserter 🎯"); game.nextStage(); }}
            className="px-8 py-3 bg-[#3fb950] text-[#0d1117] font-bold rounded-xl
                       animate-in zoom-in duration-300"
          >
            Master the Split →
          </button>
        )}
      </StageWrapper>
    );
  };

  // ── Stage 5: The Split Ritual ─────────────────────────────────────────────
  const renderStage5 = () => {
    const fullChild = splitNode?.children[0];
    const isFull = fullChild && fullChild.keys.length === MAX_KEYS;

    return (
      <StageWrapper>
        <div className="text-center mb-4 max-w-md">
          <h3 className="text-xl font-bold text-[#e3b341] mb-1">💥 The Split Ritual</h3>
          <p className="text-[#8b949e] text-sm">
            The left child is <span className="text-[#f85149] font-bold">FULL</span> ({MAX_KEYS} keys).
            Call <code className="text-[#58a6ff] text-xs">splitChild</code> — the median key
            rises to the parent, two children form.
          </p>
        </div>

        <BTreeSVG
          root={splitNode}
          violationIds={!splitDone && fullChild ? [fullChild.id] : []}
          highlightIds={splitDone ? splitNode.children.map(c => c.id) : []}
        />

        <div className="mt-3 p-3 rounded-lg bg-[#161b22] border border-[#30363d]
                        w-full max-w-md mb-5 font-mono text-xs text-[#8b949e]">
          {!splitDone ? (
            <>
              <span className="text-[#f85149]">⚠ child.keys = [{fullChild?.keys.join(", ")}]</span> — FULL<br/>
              <span className="text-[#58a6ff]">splitChild</span>(parent, 0, child):<br/>
              {"  "}median = keys[t-1] = keys[{T - 1}] = <span className="text-[#e3b341]">{fullChild?.keys[T - 1]}</span><br/>
              {"  "}left  ← keys[0..{T - 2}]<br/>
              {"  "}right ← keys[{T}..{MAX_KEYS - 1}]<br/>
              {"  "}median rises to parent
            </>
          ) : (
            <span className="text-[#3fb950]">
              ✅ Split complete! Median {splitNode.keys[0]} promoted. Tree rebalanced.
            </span>
          )}
        </div>

        {!splitDone ? (
          <button
            onClick={() => {
              const cloned = cloneBTree(splitNode) as BTreeNode;
              splitChild(cloned, 0, cloned.children[0]);
              setSplitNode(cloned);
              setSplitDone(true);
            }}
            className="px-6 py-2 bg-[#e3b341] text-[#0d1117] font-bold rounded-xl
                       hover:bg-[#d4a534] transition"
          >
            ⚡ Execute splitChild
          </button>
        ) : (
          <button
            onClick={() => { game.addXp(150, "Split Master 🔥"); game.nextStage(); }}
            className="px-8 py-3 bg-[#3fb950] text-[#0d1117] font-bold rounded-xl
                       animate-in zoom-in duration-300"
          >
            Watch the Root Awaken →
          </button>
        )}
      </StageWrapper>
    );
  };

  // ── Stage 6: The Root Awakens ────────────────────────────────────────────
  const renderStage6 = () => (
    <StageWrapper>
      <div className="text-center mb-4 max-w-md">
        <h3 className="text-xl font-bold text-[#58a6ff] mb-1">🌳 The Root Awakens</h3>
        <p className="text-[#8b949e] text-sm">
          The root is <span className="text-[#f85149] font-bold">FULL</span>.
          When we insert now, a new root is created above — the tree grows taller.
        </p>
      </div>

      <div className="mb-2 text-xs font-semibold text-center">
        {!rootSplit
          ? <span className="text-[#f85149]">⚠️ Root has {MAX_KEYS} keys — must split before inserting</span>
          : <span className="text-[#3fb950]">✅ New root created! Tree height increased by 1</span>
        }
      </div>

      <BTreeSVG
        root={rootTree}
        violationIds={!rootSplit ? [rootTree.id] : []}
        highlightIds={rootSplit ? [rootTree.id] : []}
      />

      <div className="mt-3 p-3 rounded-lg bg-[#161b22] border border-[#30363d]
                      w-full max-w-md mb-5 font-mono text-xs text-[#8b949e]">
        {!rootSplit ? (
          <>
            root.keys = [<span className="text-[#f85149]">{rootTree.keys.join(", ")}</span>] — FULL<br/>
            btreeInsert creates <span className="text-[#58a6ff]">newRoot</span> (empty, non-leaf)<br/>
            newRoot.children[0] = oldRoot<br/>
            <span className="text-[#58a6ff]">splitChild</span>(newRoot, 0, oldRoot)<br/>
            → tree grows 1 level taller
          </>
        ) : (
          <span className="text-[#3fb950]">
            ✅ Root split complete! Depth = {getDepth(rootTree) + 1}
          </span>
        )}
      </div>

      {!rootSplit ? (
        <button
          onClick={() => {
            const cloned = cloneBTree(rootTree) as BTreeNode;
            const newR = btreeInsert(cloned, 25); // triggers root split
            setRootTree(newR);
            setRootSplit(true);
          }}
          className="px-6 py-2 bg-[#58a6ff] text-[#0d1117] font-bold rounded-xl
                     hover:bg-[#4192f5] transition"
        >
          Insert 25 (triggers root split)
        </button>
      ) : (
        <button
          onClick={() => { game.addXp(150, "Tree Master 🚀"); game.nextStage(); }}
          className="px-8 py-3 bg-[#3fb950] text-[#0d1117] font-bold rounded-xl
                     animate-in zoom-in duration-300"
        >
          Final Boss →
        </button>
      )}
    </StageWrapper>
  );

  // ── Stage 7: Final Boss ───────────────────────────────────────────────────
  const renderStage7 = () => (
    <StageWrapper>
      <h3 className="text-xl font-bold text-[#e3b341] mb-1 text-center">
        👑 The Sacred Sequence Trial
      </h3>
      <p className="text-[#8b949e] text-sm text-center mb-6">
        Answer the 3 trials, then insert the sacred sequence to claim guardianship.
      </p>

      {/* Quiz cards */}
      <div className="w-full max-w-lg space-y-4 mb-6">
        {BTREE_QUIZ.map((item, i) => (
          <QuizCard key={i}
            caseNum={i + 1}
            question={item.q}
            options={item.options}
            correct={item.correct}
            okText={item.ok}
            badText={item.bad}
            selected={quizAnswers[i]}
            attempts={quizAttempts[i]}
            locked={quizLocked[i]}
            onSelect={v => handleQuizSelect(i, v)}
            onRetry={() => handleQuizRetry(i)}
          />
        ))}
      </div>

      {/* Boss sequence — unlocks after all quiz correct */}
      {allQuizCorrect && (
        <div className="w-full max-w-lg p-4 bg-[#1a1500] border border-[#e3b341]/50
                        rounded-xl mb-5 animate-in zoom-in duration-300">
          <p className="text-[#e3b341] font-bold mb-1">🐉 Sacred Sequence:</p>
          <p className="text-[#8b949e] text-xs font-mono mb-3">
            {BOSS_SEQUENCE.join(" → ")}
          </p>
          <div className="flex flex-wrap gap-2 mb-3">
            {BOSS_SEQUENCE.map(v => (
              <button key={v}
                onClick={() => handleBossInsert(v)}
                disabled={bossSeq.includes(v)}
                className="px-3 py-1 bg-[#e3b341] disabled:opacity-25 text-[#0d1117]
                           font-bold rounded-lg text-sm hover:bg-[#d4a534] transition"
              >
                +{v}
              </button>
            ))}
          </div>
          <div className="text-xs text-[#8b949e] mb-2">
            Inserted: {bossSeq.length}/{BOSS_SEQUENCE.length}
            {bossSeq.length > 0 && (
              <span className="ml-2 text-[#e3b341]">[{bossSeq.join(" → ")}]</span>
            )}
          </div>
          <BTreeSVG root={bossTree} />
        </div>
      )}

      {bossSeq.length === BOSS_SEQUENCE.length && (
        <button
          onClick={() => { game.addXp(300, "Guardian of Balance 👑"); game.nextStage(); }}
          className="px-8 py-3 bg-[#e3b341] text-[#0d1117] font-bold rounded-xl
                     animate-in zoom-in duration-300 text-lg"
        >
          👑 Claim Guardianship →
        </button>
      )}
    </StageWrapper>
  );

  // ── Stage 8: Completion ───────────────────────────────────────────────────
  const renderCompletion = () => (
    <CompletionScreen
      missionTitle="🌳 Data Forest Restored!"
      missionSubtitle="You successfully maintained balance in the Data Forest using B-Tree insertion."
      xp={game.xp}
      xpLog={game.xpLog}
      achievements={[
        { icon: <TreePine className="size-4" />, label: "Node Architect" },
        { icon: <Split    className="size-4" />, label: "Split Master" },
        { icon: <Crown    className="size-4" />, label: "Tree Guardian" },
        { icon: <Star     className="size-4" />, label: "Guardian of Balance" },
      ]}
      concepts={[
        { label: "Node Structure",     description: `Each node holds up to ${MAX_KEYS} keys (2t-1) and up to ${2 * T} children.` },
        { label: "insertNonFull",      description: "Inserts into a non-full node by shifting keys right to maintain sorted order." },
        { label: "splitChild",         description: "Splits a full child: median rises to parent, two new children form." },
        { label: "Root Split",         description: "When the root is full, a new empty root is created and the old root is split — tree grows taller." },
        { label: "Balanced Structure", description: "All leaves are at the same depth, guaranteeing O(log n) search, insert, and delete." },
      ]}
      onReset={game.reset}
    />
  );

  // ═══════════════════════════════════════════════════════════════════════════
  // RENDER
  // ═══════════════════════════════════════════════════════════════════════════

  return (
    <SimShell
      title="B-Tree Guardian"
      subtitle="The Balanced Realm — Insertion Lab"
      xp={game.xp}
      stage={game.stage}
      totalStages={TOTAL_STAGES}
      mistakeMessage={game.mistakeMessage}
      successMessage={game.successMessage}
      icon={<TreePine className="size-5 text-[#3fb950]" />}
    >
      {game.stage === 1 && renderStage1()}
      {game.stage === 2 && renderStage2()}
      {game.stage === 3 && renderStage3()}
      {game.stage === 4 && renderStage4()}
      {game.stage === 5 && renderStage5()}
      {game.stage === 6 && renderStage6()}
      {game.stage === 7 && renderStage7()}
      {game.stage === 8 && renderCompletion()}
    </SimShell>
  );
}