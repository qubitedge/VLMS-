import { useState } from "react";
import { Swords, ChevronRight, Zap, Shield } from "lucide-react";
import {
  useSimGame,
  SimShell,
  StageWrapper,
  QuizBlock,
  CompletionScreen,
} from "@/components/simulations/shared";

// ── Constants ─────────────────────────────────────────────────────────────────
const TOTAL_STAGES = 10; 
// ─────────────────────────────────────────────────────────────────────────────
// Tree Types & Pure Helpers
// All functions are pure — they return new trees, never mutate.
// ─────────────────────────────────────────────────────────────────────────────

interface TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
  height: number;
  x: number;
  y: number;
}

const mkNode = (val: number): TreeNode =>
  ({ val, left: null, right: null, height: 1, x: 0, y: 0 });

const h = (n: TreeNode | null): number => n?.height ?? 0;

const bf = (n: TreeNode | null): number =>
  n ? h(n.left) - h(n.right) : 0;

const reheight = (n: TreeNode): TreeNode =>
  ({ ...n, height: 1 + Math.max(h(n.left), h(n.right)) });

// ── Rotations ────────────────────────────────────────────────────────────────
const rotR = (y: TreeNode): TreeNode => {
  const x  = y.left!;
  const T2 = x.right;
  const ny = reheight({ ...y, left: T2 });
  return reheight({ ...x, right: ny });
};

const rotL = (x: TreeNode): TreeNode => {
  const y  = x.right!;
  const T2 = y.left;
  const nx = reheight({ ...x, right: T2 });
  return reheight({ ...y, left: nx });
};

// ── Balance helper (used after deletion) ─────────────────────────────────────
const balance = (n: TreeNode): TreeNode => {
  const b = bf(n);
  if (b > 1) {
    if (bf(n.left) >= 0) return rotR(n);            // LL
    return rotR({ ...n, left: rotL(n.left!) });      // LR
  }
  if (b < -1) {
    if (bf(n.right) <= 0) return rotL(n);            // RR
    return rotL({ ...n, right: rotR(n.right!) });    // RL
  }
  return n;
};

// ── BST insert (for building demo trees) ─────────────────────────────────────
const avlInsert = (n: TreeNode | null, val: number): TreeNode => {
  if (!n) return mkNode(val);
  let node: TreeNode;
  if (val < n.val)      node = { ...n, left:  avlInsert(n.left,  val) };
  else if (val > n.val) node = { ...n, right: avlInsert(n.right, val) };
  else return n;
  return balance(reheight(node));
};

// ── Inorder successor (min of right subtree) ─────────────────────────────────
const minNode = (n: TreeNode): TreeNode =>
  n.left ? minNode(n.left) : n;

// ── AVL deletion ─────────────────────────────────────────────────────────────
const avlDelete = (n: TreeNode | null, val: number): TreeNode | null => {
  if (!n) return null;

  let node: TreeNode;
  if (val < n.val) {
    node = { ...n, left:  avlDelete(n.left, val) };
  } else if (val > n.val) {
    node = { ...n, right: avlDelete(n.right, val) };
  } else {
    // Found — three cases
    if (!n.left && !n.right) return null;             // leaf
    if (!n.left)  return n.right;                     // one child (right)
    if (!n.right) return n.left;                      // one child (left)
    // two children: replace with inorder successor
    const succ = minNode(n.right);
    node = {
      ...n,
      val:   succ.val,
      right: avlDelete(n.right, succ.val),
    };
  }
  return balance(reheight(node));
};

// ── Collect helpers ───────────────────────────────────────────────────────────
const collectNodes = (n: TreeNode | null): TreeNode[] =>
  n ? [n, ...collectNodes(n.left), ...collectNodes(n.right)] : [];

const collectEdges = (n: TreeNode | null): Array<[TreeNode, TreeNode]> => {
  if (!n) return [];
  const e: Array<[TreeNode, TreeNode]> = [];
  if (n.left)  e.push([n, n.left]);
  if (n.right) e.push([n, n.right]);
  return [...e, ...collectEdges(n.left), ...collectEdges(n.right)];
};

// ── Layout: assign x/y coordinates for SVG ───────────────────────────────────
const layout = (
  n: TreeNode | null,
  depth = 0,
  lo = 0,
  hi = 560,
): TreeNode | null => {
  if (!n) return null;
  const x = (lo + hi) / 2;
  const y = 44 + depth * 76;
  return {
    ...n,
    x, y,
    left:  layout(n.left,  depth + 1, lo, x),
    right: layout(n.right, depth + 1, x,  hi),
  };
};

// ── BF colour ─────────────────────────────────────────────────────────────────
const bfCol = (b: number) =>
  Math.abs(b) <= 1 ? "#22c55e" : "#ef4444";

// ─────────────────────────────────────────────────────────────────────────────
// TreeSVG  — renders any TreeNode tree with optional overlays
// ─────────────────────────────────────────────────────────────────────────────
interface TreeSVGProps {
  root:           TreeNode | null;
  showBF?:        boolean;
  /** Val to highlight gold (e.g. node being deleted) */
  highlightVal?:  number | null;
  /** Val to highlight as successor (gold + pulse) */
  successorVal?:  number | null;
  /** Vals on the ancestor path (light blue) */
  ancestorPath?:  number[];
  /** Vals that are currently unbalanced (red pulse) */
  unstableVals?:  number[];
  onNodeClick?:   (val: number) => void;
  svgH?:          number;
}

function TreeSVG({
  root,
  showBF       = false,
  highlightVal = null,
  successorVal = null,
  ancestorPath = [],
  unstableVals = [],
  onNodeClick,
  svgH = 300,
}: TreeSVGProps) {
  if (!root) return (
    <div className="flex items-center justify-center text-muted-foreground text-sm py-8">
      Tree is empty
    </div>
  );

  const laid  = layout(root);
  const nodes = collectNodes(laid);
  const edges = collectEdges(laid);

  return (
    <svg width="100%" viewBox={`0 0 560 ${svgH}`} className="overflow-visible">
      {/* Edges */}
      {edges.map(([p, c], i) => (
        <line key={i}
          x1={p.x} y1={p.y} x2={c.x} y2={c.y}
          stroke="hsl(var(--border))" strokeWidth={2}
        />
      ))}

      {/* Ancestor path highlight lines */}
      {edges.map(([p, c], i) => {
        if (!ancestorPath.includes(p.val) || !ancestorPath.includes(c.val)) return null;
        return (
          <line key={`ap-${i}`}
            x1={p.x} y1={p.y} x2={c.x} y2={c.y}
            stroke="#60a5fa" strokeWidth={3} strokeDasharray="6 3"
          />
        );
      })}

      {/* Nodes */}
      {nodes.map(n => {
        const b          = bf(n);
        const color      = showBF ? bfCol(b) : "hsl(var(--primary))";
        const isDelete   = n.val === highlightVal;
        const isSucc     = n.val === successorVal;
        const isAncestor = ancestorPath.includes(n.val);
        const isUnstable = unstableVals.includes(n.val);

        const fill = isDelete   ? "#ef444422"
                   : isSucc     ? "#f59e0b22"
                   : isAncestor ? "#60a5fa22"
                   : isUnstable ? "#ef444422"
                   : `${color}22`;

        const stroke = isDelete   ? "#ef4444"
                     : isSucc     ? "#f59e0b"
                     : isAncestor ? "#60a5fa"
                     : isUnstable ? "#ef4444"
                     : color;

        return (
          <g key={n.val}
            transform={`translate(${n.x},${n.y})`}
            onClick={() => onNodeClick?.(n.val)}
            style={{ cursor: onNodeClick ? "pointer" : "default" }}
          >
            {/* Pulse ring for unstable */}
            {isUnstable && (
              <circle r={28} fill="none" stroke="#ef4444" strokeWidth={2}
                opacity={0.4} className="animate-ping" />
            )}
            <circle r={22}
              fill={fill} stroke={stroke} strokeWidth={isDelete || isSucc ? 3 : 2}
              className="transition-all duration-500"
            />
            <text textAnchor="middle" dy="5"
              fontSize={13} fontWeight="bold"
              fill="hsl(var(--foreground))">
              {n.val}
            </text>
            {/* BF label above */}
            {showBF && (
              <text textAnchor="middle" dy={-30}
                fontSize={10} fontWeight="bold" fill={color}>
                BF:{b}
              </text>
            )}
            {/* Height label below */}
            {showBF && (
              <text textAnchor="middle" dy={38}
                fontSize={9} fill="hsl(var(--muted-foreground))">
                h={n.height}
              </text>
            )}
          </g>
        );
      })}
    </svg>
  );
}

export function AVLDeletionSim() {

  // ── Pre-built demo trees ──────────────────────────────────────────────────
  // Built once at module level so they're stable across renders
  const DEMO_TREE = (() => {
    let r: TreeNode | null = null;
    for (const v of [30, 20, 40, 10, 25, 35, 50]) r = avlInsert(r, v);
    return r;
  })();

  const ONE_CHILD_TREE = (() => {
    let r: TreeNode | null = null;
    for (const v of [30, 20, 40, 35, 50]) r = avlInsert(r, v);
    return r;
  })();

  const TWO_CHILD_TREE = (() => {
    let r: TreeNode | null = null;
    for (const v of [30, 20, 40, 10, 25, 35, 50]) r = avlInsert(r, v);
    return r;
  })();

  const MULTI_TREE = (() => {
    let r: TreeNode | null = null;
    for (const v of [30, 20, 40, 10, 25, 35, 50, 45]) r = avlInsert(r, v);
    return r;
  })();

  // ── Game hook ─────────────────────────────────────────────────────────────
  const game = useSimGame(TOTAL_STAGES, () => {
    // Stage 2
    setLeafTree(DEMO_TREE);
    setLeafDeleted(false);
    setLeafSelected(null);
    // Stage 3
    setOneChildTree(ONE_CHILD_TREE);
    setOneDeleted(false);
    // Stage 4
    setTwoChildTree(TWO_CHILD_TREE);
    setSuccFound(false);
    setTwoDeleted(false);
    // Stage 5
    setCrisisTree(DEMO_TREE);
    setCrisisInspected(null);
    // Stage 6
    setRotChoice(null);
    setRotApplied(false);
    // Stage 7
    setAncestorStep(0);
    // Stage 8
    setMultiTree(MULTI_TREE);
    setMultiStep(0);
    // Stage 9 quizzes
    setQ1(null); setQ2(null); setQ3(null);
  });

  // Stage 2 — leaf deletion
  const [leafTree,     setLeafTree]     = useState<TreeNode | null>(DEMO_TREE);
  const [leafSelected, setLeafSelected] = useState<number | null>(null);
  const [leafDeleted,  setLeafDeleted]  = useState(false);

  // Stage 3 — one-child deletion
  const [oneChildTree, setOneChildTree] = useState<TreeNode | null>(ONE_CHILD_TREE);
  const [oneDeleted,   setOneDeleted]   = useState(false);

  // Stage 4 — two-child / successor
  const [twoChildTree, setTwoChildTree] = useState<TreeNode | null>(TWO_CHILD_TREE);
  const [succFound,    setSuccFound]    = useState(false);
  const [twoDeleted,   setTwoDeleted]   = useState(false);

  // Stage 5 — balance crisis
  const [crisisTree,     setCrisisTree]     = useState<TreeNode | null>(DEMO_TREE);
  const [crisisInspected, setCrisisInspected] = useState<number | null>(null);

  // Stage 6 — rotation chamber
  const [rotChoice,  setRotChoice]  = useState<string | null>(null);
  const [rotApplied, setRotApplied] = useState(false);

  // Stage 7 — ancestor walk
  // We show a pre-determined ancestor path step by step
  const ANCESTOR_PATH = [10, 20, 30]; // simulated path from deleted leaf to root
  const [ancestorStep, setAncestorStep] = useState(0);

  // Stage 8 — multi-level chaos
  const [multiTree, setMultiTree] = useState<TreeNode | null>(MULTI_TREE);
  const [multiStep, setMultiStep] = useState(0); // 0=start, 1=del40done, 2=del30done

  // Stage 9 — quizzes
  const [q1, setQ1] = useState<string | null>(null);
  const [q2, setQ2] = useState<string | null>(null);
  const [q3, setQ3] = useState<string | null>(null);

  // ── Derived helpers ───────────────────────────────────────────────────────
  const isLeaf = (root: TreeNode | null, val: number): boolean => {
    const nodes = collectNodes(layout(root));
    const node  = nodes.find(n => n.val === val);
    return !!node && !node.left && !node.right;
  };

  const getSuccessor = (root: TreeNode | null, val: number): number | null => {
    const nodes  = collectNodes(layout(root));
    const target = nodes.find(n => n.val === val);
    if (!target?.right) return null;
    return minNode(target.right).val;
  };

  const unbalancedVals = (root: TreeNode | null): number[] =>
    collectNodes(layout(root))
      .filter(n => Math.abs(bf(n)) > 1)
      .map(n => n.val);

      const renderStage1 = () => (
        <StageWrapper>
          <div className="text-center mb-8 max-w-xl">
            <div className="text-6xl mb-4 animate-pulse">🌳</div>
            <h2 className="text-3xl font-bold text-primary mb-3">AVL Guardians</h2>
            <p className="text-muted-foreground leading-relaxed">
              A corruption virus is deleting nodes from the Data Forest.
              Each deletion can shatter the tree's balance. Your mission:
              <strong> delete corrupted nodes correctly</strong> and restore AVL balance
              using rotation spells.
            </p>
          </div>
    
          {/* Preview tree */}
          <div className="w-full max-w-lg border border-border rounded-xl p-4 bg-card mb-8">
            <p className="text-xs text-muted-foreground text-center mb-2">
              The Data Forest — every node in perfect balance
            </p>
            <TreeSVG root={DEMO_TREE} showBF svgH={260} />
          </div>
    
          {/* Three deletion cases preview */}
          <div className="grid grid-cols-3 gap-3 w-full max-w-lg mb-8">
            {[
              { icon: "🍂", label: "Leaf Node",    desc: "No children — just remove" },
              { icon: "🌿", label: "One Child",    desc: "Child slides up to replace" },
              { icon: "🌳", label: "Two Children", desc: "Successor takes the spot" },
            ].map(c => (
              <div key={c.label}
                className="flex flex-col items-center p-3 rounded-xl border border-border bg-card text-center">
                <div className="text-2xl mb-1">{c.icon}</div>
                <div className="text-xs font-bold">{c.label}</div>
                <div className="text-[10px] text-muted-foreground mt-1">{c.desc}</div>
              </div>
            ))}
          </div>
    
          <button
            onClick={() => { game.addXp(50, "Guardian Awakened"); game.nextStage(); }}
            className="px-8 py-3 bg-primary text-primary-foreground font-bold rounded-xl
                       flex items-center gap-2 hover:opacity-90"
          >
            <Shield className="size-5" /> Start Mission <ChevronRight className="size-4" />
          </button>
        </StageWrapper>
      );
      const renderStage2 = () => {
        const leafNodes = collectNodes(layout(leafTree))
          .filter(n => !n.left && !n.right);
    
        return (
          <StageWrapper>
            <div className="text-center mb-4 max-w-lg">
              <h3 className="text-xl font-bold text-primary mb-1">🍂 The First Deletion — Leaf Node</h3>
              <p className="text-muted-foreground text-sm">
                Leaf nodes have no children. Click any <strong>leaf node</strong>
                (shown in red below), then press Delete.
              </p>
            </div>
    
            {/* Leaf chips */}
            <div className="flex gap-2 flex-wrap justify-center mb-4">
              {leafNodes.map(n => (
                <button key={n.val}
                  onClick={() => setLeafSelected(n.val === leafSelected ? null : n.val)}
                  className={`px-4 py-2 rounded-lg border-2 font-bold font-mono text-sm transition-all
                    ${leafSelected === n.val
                      ? "bg-red-500/20 border-red-500 text-red-600 dark:text-red-400 scale-110"
                      : "border-red-400/50 bg-red-400/10 text-red-500 hover:scale-105"
                    }`}
                >
                  {n.val} 🍂
                </button>
              ))}
            </div>
    
            {/* Tree */}
            <div className="w-full max-w-lg border border-border rounded-xl p-4 bg-card mb-6">
              <TreeSVG root={leafTree} showBF
                highlightVal={leafSelected}
                onNodeClick={val => {
                  if (isLeaf(leafTree, val)) setLeafSelected(val);
                  else game.showMistake(`Node ${val} has children — it's not a leaf!`);
                }}
                svgH={280}
              />
            </div>
    
            {/* Action */}
            {!leafDeleted ? (
              <button
                disabled={!leafSelected}
                onClick={() => {
                  if (!leafSelected) return;
                  setLeafTree(avlDelete(leafTree, leafSelected));
                  setLeafDeleted(true);
                  game.addXp(50, "Leaf Slayer");
                }}
                className={`px-8 py-3 font-bold rounded-xl flex items-center gap-2 transition-all
                  ${leafSelected
                    ? "bg-red-500 text-white hover:bg-red-600"
                    : "bg-muted text-muted-foreground cursor-not-allowed"
                  }`}
              >
                💥 Delete Selected Leaf
              </button>
            ) : (
              <div className="flex flex-col items-center gap-4 animate-in fade-in">
                <div className="text-green-500 font-bold">
                  ✅ Leaf {leafSelected} removed. Tree rebalanced automatically.
                </div>
                <div className="w-full max-w-lg border border-green-500/30 rounded-xl p-4 bg-green-500/5">
                  <TreeSVG root={leafTree} showBF svgH={260} />
                </div>
                <button
                  onClick={() => game.nextStage()}
                  className="px-8 py-3 bg-primary text-primary-foreground font-bold rounded-xl"
                >
                  One-Child Deletion → 🌿
                </button>
              </div>
            )}
          </StageWrapper>
        );
      };
      const renderStage3 = () => {
        // Node 20 in ONE_CHILD_TREE has one child
        const TARGET = 20;
        const afterTree = oneDeleted ? oneChildTree : null;
    
        return (
          <StageWrapper>
            <div className="text-center mb-4 max-w-lg">
              <h3 className="text-xl font-bold text-primary mb-1">🌿 One-Child Replacement</h3>
              <p className="text-muted-foreground text-sm">
                When a node has exactly one child, that child <strong>slides up</strong>
                to take its parent's position. Watch node <code className="bg-secondary px-1 rounded">20</code> get replaced.
              </p>
            </div>
    
            {/* Before / After */}
            <div className="grid grid-cols-2 gap-6 w-full max-w-xl mb-6">
              <div>
                <p className="text-xs font-bold text-center text-muted-foreground mb-2">BEFORE</p>
                <div className={`border-2 rounded-xl p-3 transition-all
                  ${oneDeleted ? "border-border opacity-40" : "border-red-400/50 bg-red-400/5"}`}>
                  <TreeSVG root={ONE_CHILD_TREE} showBF
                    highlightVal={TARGET} svgH={220} />
                </div>
              </div>
              <div>
                <p className="text-xs font-bold text-center text-muted-foreground mb-2">
                  {oneDeleted ? "✅ AFTER" : "⏳ AFTER"}
                </p>
                <div className={`border-2 rounded-xl p-3 transition-all
                  ${oneDeleted
                    ? "border-green-500/50 bg-green-500/5"
                    : "border-dashed border-border opacity-40"
                  }`}>
                  {oneDeleted
                    ? <TreeSVG root={oneChildTree} showBF svgH={220} />
                    : <div className="h-44 flex items-center justify-center text-xs text-muted-foreground">
                        Delete node 20 to see result
                      </div>
                  }
                </div>
              </div>
            </div>
    
            {/* Explanation box */}
            <div className="bg-secondary/30 rounded-xl p-4 max-w-md text-sm text-center mb-6">
              <p className="font-mono mb-2">
                <span className="text-red-400">DELETE 20</span> → child <span className="text-green-400">10</span> rises
              </p>
              <p className="text-muted-foreground text-xs">
                The pointer that pointed to 20 now points directly to 20's only child.
                No copy needed — just a pointer update.
              </p>
            </div>
    
            {!oneDeleted ? (
              <button
                onClick={() => {
                  setOneChildTree(avlDelete(oneChildTree, TARGET));
                  setOneDeleted(true);
                  game.addXp(70, "Smart Replacement");
                }}
                className="px-8 py-3 bg-red-500 text-white font-bold rounded-xl hover:bg-red-600"
              >
                💥 Delete Node 20
              </button>
            ) : (
              <button
                onClick={() => game.nextStage()}
                className="px-8 py-3 bg-primary text-primary-foreground font-bold rounded-xl animate-in zoom-in"
              >
                Successor Hunt → 🏆
              </button>
            )}
          </StageWrapper>
        );
      };
      const renderStage4 = () => {
        const TARGET   = 30; // has two children
        const succVal  = getSuccessor(twoChildTree, TARGET);
    
        return (
          <StageWrapper>
            <div className="text-center mb-4 max-w-lg">
              <h3 className="text-xl font-bold text-primary mb-1">🌳 Successor Hunt</h3>
              <p className="text-muted-foreground text-sm">
                Node <code className="bg-secondary px-1 rounded">30</code> has two children.
                We replace it with its <strong>inorder successor</strong> —
                the smallest value in its right subtree.
              </p>
            </div>
    
            {/* Tree with highlight */}
            <div className="w-full max-w-lg border border-border rounded-xl p-4 bg-card mb-4">
              <TreeSVG root={twoChildTree} showBF
                highlightVal={!twoDeleted ? TARGET : null}
                successorVal={succFound && !twoDeleted ? succVal : null}
                svgH={280}
              />
            </div>
    
            {/* Step-by-step */}
            <div className="flex flex-col gap-3 w-full max-w-md mb-6">
              {/* Step 1 */}
              <div className={`p-3 rounded-xl border-2 transition-all
                ${succFound ? "border-green-500/50 bg-green-500/5" : "border-primary/40 bg-primary/5"}`}>
                <div className="flex items-center gap-3">
                  <div className={`size-7 rounded-full flex items-center justify-center text-xs font-bold
                    ${succFound ? "bg-green-500 text-white" : "bg-primary text-primary-foreground"}`}>
                    {succFound ? "✓" : "1"}
                  </div>
                  <div>
                    <div className="text-sm font-bold">Find Inorder Successor</div>
                    <div className="text-xs text-muted-foreground">
                      Go right from 30, then keep going left → smallest in right subtree
                    </div>
                  </div>
                  {!succFound && (
                    <button
                      onClick={() => { setSuccFound(true); game.addXp(40, "Successor Found"); }}
                      className="ml-auto px-3 py-1.5 bg-primary text-primary-foreground text-xs font-bold rounded-lg"
                    >
                      Find ✨
                    </button>
                  )}
                </div>
                {succFound && (
                  <div className="mt-2 ml-10 text-xs text-green-500 font-bold animate-in fade-in">
                    Successor = {succVal} (highlighted gold in tree ↑)
                  </div>
                )}
              </div>
    
              {/* Step 2 */}
              <div className={`p-3 rounded-xl border-2 transition-all
                ${twoDeleted ? "border-green-500/50 bg-green-500/5"
                : succFound  ? "border-primary/40 bg-primary/5"
                :              "border-border opacity-40"
                }`}>
                <div className="flex items-center gap-3">
                  <div className={`size-7 rounded-full flex items-center justify-center text-xs font-bold
                    ${twoDeleted ? "bg-green-500 text-white"
                    : succFound  ? "bg-primary text-primary-foreground"
                    :              "bg-muted text-muted-foreground"
                    }`}>
                    {twoDeleted ? "✓" : "2"}
                  </div>
                  <div>
                    <div className="text-sm font-bold">Replace & Delete Successor</div>
                    <div className="text-xs text-muted-foreground">
                      Copy {succVal} into position of 30, then delete original {succVal}
                    </div>
                  </div>
                  {succFound && !twoDeleted && (
                    <button
                      onClick={() => {
                        setTwoChildTree(avlDelete(twoChildTree, TARGET));
                        setTwoDeleted(true);
                        game.addXp(60, "Successor Hunter");
                      }}
                      className="ml-auto px-3 py-1.5 bg-red-500 text-white text-xs font-bold rounded-lg"
                    >
                      Execute 💥
                    </button>
                  )}
                </div>
              </div>
            </div>
    
            {/* After tree */}
            {twoDeleted && (
              <div className="w-full max-w-lg border border-green-500/30 rounded-xl p-4
                              bg-green-500/5 mb-6 animate-in fade-in">
                <p className="text-xs font-bold text-green-500 text-center mb-2">
                  ✅ 30 replaced by {succVal}, tree rebalanced
                </p>
                <TreeSVG root={twoChildTree} showBF svgH={260} />
              </div>
            )}
    
            {twoDeleted && (
              <button
                onClick={() => game.nextStage()}
                className="px-8 py-3 bg-primary text-primary-foreground font-bold rounded-xl animate-in zoom-in"
              >
                Balance Crisis → ⚠️
              </button>
            )}
          </StageWrapper>
        );
      };
      const renderStage5 = () => {
        // Manually create an unbalanced state for demo
        // Delete a node that causes imbalance without auto-balancing
        const CRISIS_VAL = 50;
        // Build a tree, then delete causing imbalance
        const crisisAfter = (() => {
          let r: TreeNode | null = null;
          for (const v of [40, 20, 60, 10, 30, 50, 70]) r = avlInsert(r, v);
          // Now delete 50 — this causes RR imbalance at 40
          return avlDelete(r, CRISIS_VAL);
        })();
    
        const inspected = crisisInspected
          ? collectNodes(layout(crisisAfter)).find(n => n.val === crisisInspected)
          : null;
    
        return (
          <StageWrapper>
            <div className="text-center mb-4 max-w-lg">
              <h3 className="text-xl font-bold text-red-500 mb-1">⚠️ Balance Crisis Begins</h3>
              <p className="text-muted-foreground text-sm">
                After deleting <strong>50</strong>, some nodes are unbalanced.
                Click nodes to inspect their Balance Factor. Find the unstable ones!
              </p>
            </div>
    
            {/* Balance factor legend */}
            <div className="flex gap-4 mb-4">
              {[
                { col: "bg-green-500", label: "Stable (BF: -1, 0, 1)" },
                { col: "bg-red-500",   label: "Unstable (BF: ±2)" },
              ].map(l => (
                <div key={l.label} className="flex items-center gap-2 text-xs">
                  <div className={`size-3 rounded-full ${l.col}`} />
                  <span>{l.label}</span>
                </div>
              ))}
            </div>
    
            {/* Tree — click to inspect */}
            <div className="w-full max-w-lg border border-border rounded-xl p-4 bg-card mb-4">
              <TreeSVG root={crisisAfter} showBF
                highlightVal={crisisInspected}
                unstableVals={unbalancedVals(crisisAfter)}
                onNodeClick={val => setCrisisInspected(val === crisisInspected ? null : val)}
                svgH={280}
              />
            </div>
    
            {/* Inspector panel */}
            {inspected && (
              <div className="w-full max-w-sm p-4 rounded-xl border border-border bg-card mb-4 animate-in fade-in">
                <div className="text-sm font-bold mb-2">Inspecting Node: {inspected.val}</div>
                <div className="space-y-1 text-xs">
                  <div className="flex justify-between">
                    <span>Left height</span>
                    <span className="font-mono">{h(inspected.left)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Right height</span>
                    <span className="font-mono">{h(inspected.right)}</span>
                  </div>
                  <div className="flex justify-between font-bold border-t border-border pt-1 mt-1">
                    <span>Balance Factor</span>
                    <span className={`font-mono ${Math.abs(bf(inspected)) > 1 ? "text-red-500" : "text-green-500"}`}>
                      {bf(inspected)} {Math.abs(bf(inspected)) > 1 ? "⚠️" : "✅"}
                    </span>
                  </div>
                </div>
              </div>
            )}
    
            {crisisInspected && (
              <button
                onClick={() => { game.addXp(60, "Imbalance Detected"); game.nextStage(); }}
                className="px-8 py-3 bg-primary text-primary-foreground font-bold rounded-xl animate-in zoom-in"
              >
                Rotation Chamber → 🔄
              </button>
            )}
          </StageWrapper>
        );
      };
      const renderStage6 = () => {
        // For the rotation demo we'll use an LL case post-deletion
        const BEFORE_ROT = (() => {
          let r: TreeNode | null = null;
          for (const v of [30, 20, 40, 10]) r = avlInsert(r, v);
          // Manually create unbalanced by BST-inserting without balance
          return r;
        })();
    
        // Correct answer for this demo tree is LL → Right Rotate
        const CORRECT = "✅ Right Rotate (LL)";
        const CHOICES  = [
          "✅ Right Rotate (LL)",
          "❌ Left Rotate (RR)",
          "❌ Left then Right (LR)",
          "❌ Right then Left (RL)",
        ];
    
        const afterRot = rotApplied ? avlDelete(BEFORE_ROT, 40) : null;
    
        return (
          <StageWrapper>
            <div className="text-center mb-4 max-w-lg">
              <h3 className="text-xl font-bold text-primary mb-1">🔄 Rotation Chamber</h3>
              <p className="text-muted-foreground text-sm">
                The tree is left-heavy after deletion. Choose the correct rotation spell
                to restore balance.
              </p>
            </div>
    
            <div className="grid grid-cols-2 gap-6 w-full max-w-xl mb-6">
              <div>
                <p className="text-xs font-bold text-center text-red-400 mb-2">⚠️ Unbalanced</p>
                <div className="border-2 border-red-400/40 rounded-xl p-3 bg-red-400/5">
                  <TreeSVG root={BEFORE_ROT} showBF
                    unstableVals={unbalancedVals(BEFORE_ROT)} svgH={200} />
                </div>
              </div>
              <div>
                <p className="text-xs font-bold text-center text-muted-foreground mb-2">
                  {rotApplied ? "✅ Balanced" : "⏳ Apply Spell"}
                </p>
                <div className={`border-2 rounded-xl p-3 transition-all
                  ${rotApplied
                    ? "border-green-500/40 bg-green-500/5"
                    : "border-dashed border-border opacity-30"
                  }`}>
                  {rotApplied
                    ? <TreeSVG root={afterRot} showBF svgH={200} />
                    : <div className="h-44 flex items-center justify-center text-xs text-muted-foreground">
                        Choose a spell →
                      </div>
                  }
                </div>
              </div>
            </div>
    
            {/* Rotation buttons */}
            {!rotApplied && (
              <div className="grid grid-cols-2 gap-3 w-full max-w-sm mb-4">
                {CHOICES.map(c => (
                  <button key={c}
                    onClick={() => {
                      if (c === CORRECT) {
                        setRotChoice(c);
                        setRotApplied(true);
                        game.addXp(100, "Rotation Master");
                      } else {
                        game.showMistake(`${c} is wrong here. Look at which side is heavier.`);
                        setRotChoice(c);
                      }
                    }}
                    className={`px-4 py-2 text-xs font-bold rounded-xl border transition-all hover:scale-105
                      ${rotChoice === c && c !== CORRECT
                        ? "border-red-500 bg-red-500/20 text-red-500"
                        : c.startsWith("✅")
                        ? "border-green-500/50 bg-green-500/10 hover:bg-green-500/20"
                        : "border-border hover:bg-secondary"
                      }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            )}
    
            {rotApplied && (
              <button
                onClick={() => game.nextStage()}
                className="px-8 py-3 bg-primary text-primary-foreground font-bold rounded-xl animate-in zoom-in"
              >
                Climb the Ancestors → 🧗
              </button>
            )}
          </StageWrapper>
        );
      };
      const renderStage7 = () => {
        const visiblePath = ANCESTOR_PATH.slice(0, ancestorStep + 1);
        const isDone      = ancestorStep >= ANCESTOR_PATH.length - 1;
    
        // Show a static demo tree for ancestor walk explanation
        const ANCESTOR_TREE = (() => {
          let r: TreeNode | null = null;
          for (const v of [30, 20, 40, 10, 25]) r = avlInsert(r, v);
          return r;
        })();
    
        return (
          <StageWrapper>
            <div className="text-center mb-4 max-w-lg">
              <h3 className="text-xl font-bold text-primary mb-1">🧗 Climbing the Ancestors</h3>
              <p className="text-muted-foreground text-sm">
                After deletion, rebalancing <strong>propagates upward</strong> from the deleted
                node all the way to the root. Click "Next Ancestor" to walk the path.
              </p>
            </div>
    
            {/* Tree with ancestor path */}
            <div className="w-full max-w-lg border border-border rounded-xl p-4 bg-card mb-6">
              <TreeSVG root={ANCESTOR_TREE} showBF
                ancestorPath={visiblePath}
                svgH={260}
              />
            </div>
    
            {/* Ancestor steps log */}
            <div className="w-full max-w-sm space-y-2 mb-6">
              {ANCESTOR_PATH.map((val, i) => {
                const visible = i <= ancestorStep;
                const nodes   = collectNodes(layout(ANCESTOR_TREE));
                const node    = nodes.find(n => n.val === val);
                const b       = node ? bf(node) : 0;
                return (
                  <div key={val}
                    className={`flex items-center gap-3 p-3 rounded-xl border transition-all
                      ${visible
                        ? Math.abs(b) > 1
                          ? "border-red-400/50 bg-red-400/5"
                          : "border-green-500/30 bg-green-500/5"
                        : "border-border opacity-30"
                      }`}
                  >
                    <div className={`size-7 rounded-full flex items-center justify-center text-xs font-bold
                      ${visible
                        ? Math.abs(b) > 1 ? "bg-red-500 text-white" : "bg-green-500 text-white"
                        : "bg-muted text-muted-foreground"
                      }`}>
                      {val}
                    </div>
                    <div className="flex-1 text-xs">
                      {visible
                        ? <>
                            <span className="font-bold">Node {val}</span>
                            <span className="text-muted-foreground ml-2">
                              BF = {b} {Math.abs(b) > 1 ? "→ Rotation needed!" : "→ Stable ✅"}
                            </span>
                          </>
                        : <span className="text-muted-foreground">Not yet visited</span>
                      }
                    </div>
                  </div>
                );
              })}
            </div>
    
            {!isDone ? (
              <button
                onClick={() => setAncestorStep(s => s + 1)}
                className="px-8 py-3 bg-primary text-primary-foreground font-bold rounded-xl"
              >
                Next Ancestor 🧗
              </button>
            ) : (
              <button
                onClick={() => { game.addXp(100, "Full Tree Restored"); game.nextStage(); }}
                className="px-8 py-3 bg-primary text-primary-foreground font-bold rounded-xl animate-in zoom-in"
              >
                Multi-Level Chaos → 🚀
              </button>
            )}
          </StageWrapper>
        );
      };
      const MULTI_DELETE_STEPS = [
        {
          val: 45, label: "Delete 45 (leaf)",
          explain: "Simple leaf removal — but check if parent BF changes.",
        },
        {
          val: 50, label: "Delete 50 (one child)",
          explain: "45 was its only child. 50's position is taken by nothing — pointer update.",
        },
        {
          val: 40, label: "Delete 40 (two children)",
          explain: "40 has two children — find inorder successor in right subtree, replace, then rebalance.",
        },
      ];
    
      const renderStage8 = () => {
        const currentStep = MULTI_DELETE_STEPS[multiStep];
    
        return (
          <StageWrapper>
            <div className="text-center mb-4 max-w-lg">
              <h3 className="text-xl font-bold text-primary mb-1">🚀 Multi-Level Chaos</h3>
              <p className="text-muted-foreground text-sm">
                Multiple deletions in sequence. Each one may cascade into multiple rebalances.
                Execute them one by one and watch the tree evolve.
              </p>
            </div>
    
            {/* Step tracker */}
            <div className="flex gap-2 mb-6 flex-wrap justify-center">
              {MULTI_DELETE_STEPS.map((s, i) => (
                <div key={i}
                  className={`px-3 py-1.5 rounded-lg border text-xs font-bold transition-all
                    ${i < multiStep  ? "bg-green-500/20 border-green-500 text-green-600 dark:text-green-400"
                    : i === multiStep ? "bg-primary/20 border-primary text-primary"
                    :                   "border-border text-muted-foreground opacity-50"
                    }`}
                >
                  {i < multiStep ? "✓ " : `${i+1}. `}{s.val}
                </div>
              ))}
            </div>
    
            {/* Live tree */}
            <div className={`w-full max-w-lg border-2 rounded-xl p-4 bg-card mb-4 transition-all
              ${unbalancedVals(multiTree).length > 0
                ? "border-red-400/50 shadow-[0_0_15px_hsl(0_84%_60%/0.15)]"
                : "border-green-500/30 shadow-[0_0_15px_hsl(142_71%_45%/0.1)]"
              }`}
            >
              <TreeSVG root={multiTree} showBF
                unstableVals={unbalancedVals(multiTree)}
                svgH={300}
              />
            </div>
    
            {/* Current step info */}
            {multiStep < MULTI_DELETE_STEPS.length && (
              <div className="w-full max-w-md bg-secondary/30 rounded-xl p-4 mb-6">
                <div className="text-sm font-bold mb-1">
                  Step {multiStep + 1}: {currentStep.label}
                </div>
                <div className="text-xs text-muted-foreground">{currentStep.explain}</div>
              </div>
            )}
    
            {multiStep < MULTI_DELETE_STEPS.length ? (
              <button
                onClick={() => {
                  const val = MULTI_DELETE_STEPS[multiStep].val;
                  setMultiTree(t => avlDelete(t, val));
                  setMultiStep(s => s + 1);
                  game.addXp(60, `Deleted ${val}`);
                }}
                className="px-8 py-3 bg-red-500 text-white font-bold rounded-xl hover:bg-red-600"
              >
                💥 {currentStep.label}
              </button>
            ) : (
              <button
                onClick={() => { game.addXp(100, "Master Guardian"); game.nextStage(); }}
                className="px-8 py-3 bg-primary text-primary-foreground font-bold rounded-xl animate-in zoom-in"
              >
                🧩 Mini Challenges
              </button>
            )}
          </StageWrapper>
        );
      };
      const renderStage9 = () => {
        const q1c = q1 === "successor";
        const q2c = q2 === "lr";
        const q3c = q3 === "root";
        const q1w = q1 !== null && !q1c;
        const q2w = q2 !== null && !q2c;
        const q3w = q3 !== null && !q3c;
        const allDone = q1c && q2c && q3c;
    
        return (
          <StageWrapper>
            <h3 className="text-2xl font-bold text-primary mb-2 flex items-center gap-2">
              <Swords className="size-6 text-red-500" /> Final Boss — Corrupted Core
            </h3>
            <p className="text-muted-foreground text-sm mb-8 max-w-md text-center">
              Three critical systems need diagnosis. Retake any you get wrong.
            </p>
    
            <div className="w-full max-w-lg space-y-4 mb-8">
    
              {/* Q1 */}
              <div>
                <QuizBlock
                  question="When deleting a node with two children, what replaces it?"
                  options={[
                    { label: "The left child directly",          value: "leftchild"  },
                    { label: "The inorder successor (min of right subtree)", value: "successor" },
                    { label: "The root of the right subtree",   value: "rightroot"  },
                    { label: "Nothing — just remove it",        value: "nothing"    },
                  ]}
                  correctValue="successor"
                  selectedValue={q1}
                  onSelect={setQ1}
                  correctFeedback="✅ Correct! Inorder successor preserves BST ordering."
                  wrongFeedback="❌ We need the smallest value in the right subtree to maintain BST order."
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
                  question="After deletion the tree has BF = +2 at a node whose left child has BF = -1. Which rotation fixes it?"
                  options={[
                    { label: "LL → Right Rotate",         value: "ll" },
                    { label: "RR → Left Rotate",          value: "rr" },
                    { label: "LR → Left then Right",      value: "lr" },
                    { label: "RL → Right then Left",      value: "rl" },
                  ]}
                  correctValue="lr"
                  selectedValue={q2}
                  onSelect={setQ2}
                  correctFeedback="✅ Correct! BF +2 at node, BF -1 at left child = Left-Right zigzag case."
                  wrongFeedback="❌ BF +2 means left-heavy. Left child BF -1 means it's right-heavy. That's the LR zigzag."
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
                  question="After deleting a deep leaf node, where does height update propagation stop?"
                  options={[
                    { label: "At the deleted node's parent", value: "parent" },
                    { label: "At the first balanced ancestor", value: "balanced" },
                    { label: "At the root — always",          value: "root"    },
                    { label: "At the first unbalanced node",  value: "unbalanced" },
                  ]}
                  correctValue="root"
                  selectedValue={q3}
                  onSelect={setQ3}
                  correctFeedback="✅ Correct! Height updates must reach the root — every ancestor may be affected."
                  wrongFeedback="❌ We can't stop early — even a 'balanced' ancestor's height may need updating."
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
    
            {/* Progress */}
            <div className="flex items-center gap-2 mb-6 text-sm text-muted-foreground">
              <span>Systems restored:</span>
              {[q1c, q2c, q3c].map((c, i) => (
                <span key={i} className={c ? "text-green-500 font-bold" : ""}>
                  {["①", "②", "③"][i]}
                </span>
              ))}
              <span>({[q1c, q2c, q3c].filter(Boolean).length}/3)</span>
            </div>
    
            {allDone && (
              <button
                onClick={() => { game.addXp(300, "AVL Guardian"); game.nextStage(); }}
                className="px-10 py-3 bg-primary text-primary-foreground font-bold rounded-xl
                           animate-in zoom-in text-lg"
              >
                🏆 Claim Guardian Title
              </button>
            )}
          </StageWrapper>
        );
      };
      const renderStage10 = () => (
        <CompletionScreen
          missionTitle="Data Forest Restored! 🌳"
          missionSubtitle="You purged the corruption and rebalanced the entire forest."
          xp={game.xp}
          xpLog={game.xpLog}
          achievements={[
            { icon: <span>🍂</span>, label: "Leaf Slayer"      },
            { icon: <span>🌿</span>, label: "Smart Replacer"   },
            { icon: <span>🏆</span>, label: "Successor Hunter" },
            { icon: <span>🔄</span>, label: "Rotation Master"  },
            { icon: <span>🛡️</span>, label: "AVL Guardian"    },
          ]}
          concepts={[
            { label: "Leaf Deletion",     description: "Remove directly — no pointer updates needed." },
            { label: "One-Child Case",    description: "Bypass the node — child pointer replaces parent pointer." },
            { label: "Two-Child Case",    description: "Copy inorder successor value, delete successor node." },
            { label: "Balance Factor",    description: "BF = left height − right height. Must stay in {-1, 0, 1}." },
            { label: "Ancestor Walk",     description: "After deletion, heights and BFs update all the way to root." },
            { label: "Multi-Rebalancing", description: "One deletion can trigger multiple rotations up the tree." },
          ]}
          onReset={game.reset}
        />
      );
      return (
        <SimShell
          title="AVL Deletion Guardian"
          subtitle="Data Structures Lab — AVL Deletion"
          xp={game.xp}
          stage={game.stage}
          totalStages={TOTAL_STAGES}
          mistakeMessage={game.mistakeMessage}
          successMessage={game.successMessage}
          icon={<span className="text-lg">⚔️</span>}
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
        </SimShell>
      );


}