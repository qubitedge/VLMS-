import { useState } from "react";
import { Swords, ChevronRight, Zap, RotateCcw } from "lucide-react";
import {
  useSimGame,
  SimShell,
  StageWrapper,
  QuizBlock,
  CompletionScreen,
} from "@/components/simulations/shared";

// ── Constants ─────────────────────────────────────────────────────────────────
const TOTAL_STAGES = 10; 
// ── Tree node ────────────────────────────────────────────────────────────────
interface TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
  height: number;
  x: number; // layout position for SVG rendering
  y: number;
}

const height = (n: TreeNode | null): number => n?.height ?? 0;

const bf = (n: TreeNode | null): number =>
  n ? height(n.left) - height(n.right) : 0;

const updateHeight = (n: TreeNode): TreeNode => ({
  ...n,
  height: 1 + Math.max(height(n.left), height(n.right)),
});

// ── Rotations ────────────────────────────────────────────────────────────────
const rotateRight = (y: TreeNode): TreeNode => {
  const x = y.left!;
  const T2 = x.right;
  const newY = updateHeight({ ...y, left: T2 });
  return updateHeight({ ...x, right: newY });
};

const rotateLeft = (x: TreeNode): TreeNode => {
  const y = x.right!;
  const T2 = y.left;
  const newX = updateHeight({ ...x, right: T2 });
  return updateHeight({ ...y, left: newX });
};

// ── AVL Insert ───────────────────────────────────────────────────────────────
const avlInsert = (node: TreeNode | null, val: number): TreeNode => {
  if (!node) return { val, left: null, right: null, height: 1, x: 0, y: 0 };

  let n: TreeNode;
  if (val < node.val)      n = { ...node, left:  avlInsert(node.left,  val) };
  else if (val > node.val) n = { ...node, right: avlInsert(node.right, val) };
  else return node; // duplicate

  n = updateHeight(n);
  const b = bf(n);

  if (b > 1 && val < n.left!.val)  return rotateRight(n);          // LL
  if (b < -1 && val > n.right!.val) return rotateLeft(n);           // RR
  if (b > 1 && val > n.left!.val)  return rotateRight({ ...n, left:  rotateLeft(n.left!)  }); // LR
  if (b < -1 && val < n.right!.val) return rotateLeft({ ...n, right: rotateRight(n.right!) }); // RL

  return n;
};

// ── Layout: assign x/y for SVG rendering ─────────────────────────────────────
const layoutTree = (
  node: TreeNode | null,
  depth = 0,
  left = 0,
  right = 600,
): TreeNode | null => {
  if (!node) return null;
  const x = (left + right) / 2;
  const y = 40 + depth * 80;
  return {
    ...node,
    x, y,
    left:  layoutTree(node.left,  depth + 1, left,  x),
    right: layoutTree(node.right, depth + 1, x, right),
  };
};

// ── Collect all nodes for rendering ──────────────────────────────────────────
const collectNodes = (node: TreeNode | null): TreeNode[] => {
  if (!node) return [];
  return [node, ...collectNodes(node.left), ...collectNodes(node.right)];
};

// ── Collect edges ─────────────────────────────────────────────────────────────
const collectEdges = (node: TreeNode | null): Array<[TreeNode, TreeNode]> => {
  if (!node) return [];
  const edges: Array<[TreeNode, TreeNode]> = [];
  if (node.left)  edges.push([node, node.left]);
  if (node.right) edges.push([node, node.right]);
  return [...edges, ...collectEdges(node.left), ...collectEdges(node.right)];
};

// ── BF color ──────────────────────────────────────────────────────────────────
const bfColor = (b: number) =>
  Math.abs(b) <= 1 ? "#22c55e" : "#ef4444"; // green / red

// ── TreeSVG: renders any tree node structure ──────────────────────────────────
function TreeSVG({
  root,
  showBF = false,
  highlightVal = null,
  width = 600,
  height: svgHeight = 340,
}: {
  root: TreeNode | null;
  showBF?: boolean;
  highlightVal?: number | null;
  width?: number;
  height?: number;
}) {
  if (!root) return (
    <div className="flex items-center justify-center h-32 text-muted-foreground text-sm">
      Tree is empty
    </div>
  );

  const laid = layoutTree(root);
  const nodes = collectNodes(laid);
  const edges = collectEdges(laid);

  return (
    <svg width="100%" viewBox={`0 0 ${width} ${svgHeight}`}
      className="overflow-visible">
      {/* Edges */}
      {edges.map(([p, c], i) => (
        <line key={i}
          x1={p.x} y1={p.y} x2={c.x} y2={c.y}
          stroke="hsl(var(--border))" strokeWidth={2}
        />
      ))}
      {/* Nodes */}
      {nodes.map(n => {
        const b = bf(n);
        const color = showBF ? bfColor(b) : "hsl(var(--primary))";
        const isHighlight = n.val === highlightVal;
        return (
          <g key={n.val} transform={`translate(${n.x},${n.y})`}>
            <circle r={22}
              fill={isHighlight ? "#f59e0b" : `${color}22`}
              stroke={isHighlight ? "#f59e0b" : color}
              strokeWidth={isHighlight ? 3 : 2}
              className="transition-all duration-500"
            />
            <text textAnchor="middle" dy="5"
              fontSize={13} fontWeight="bold"
              fill="hsl(var(--foreground))">
              {n.val}
            </text>
            {showBF && (
              <text textAnchor="middle" dy={-30}
                fontSize={10} fill={color} fontWeight="bold">
                BF:{b}
              </text>
            )}
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

export function AVLTreeSim() {
  const game = useSimGame(TOTAL_STAGES, () => {
    setTreeRoot(null);
    setInputVal("");
    setInsertedVals([]);
    setInspectedNode(null);
    setLlDone(false);
    setRrDone(false);
    setLrStep(0);
    setRlStep(0);
    setEngineBlocks([]);
    setBossRoot(null);
    setBossQueue([...BOSS_SEQUENCE]);
    setBossAttempts(0);
    setLastRotation(null);
    setQuiz1Ans(null);
    setQuiz2Ans(null);
    setQuiz3Ans(null);
  });

  // Stage 2 — live tree building
  const [treeRoot, setTreeRoot]         = useState<TreeNode | null>(null);
  const [inputVal, setInputVal]         = useState("");
  const [insertedVals, setInsertedVals] = useState<number[]>([]);

  // Stage 3 — inspect nodes
  const [inspectedNode, setInspectedNode] = useState<number | null>(null);

  // Stage 4-7 — rotation stages
  const [llDone, setLlDone]   = useState(false);
  const [rrDone, setRrDone]   = useState(false);
  const [lrStep, setLrStep]   = useState(0); // 0 = not started, 1 = step1 done, 2 = done
  const [rlStep, setRlStep]   = useState(0);

  // Stage 8 — engine builder
  const ENGINE_BLOCKS_REQUIRED = [
    "getHeight()",
    "updateHeight()",
    "getBalanceFactor()",
    "LL → Right Rotate",
    "RR → Left Rotate",
    "LR → Left+Right",
    "RL → Right+Left",
  ];
  const [engineBlocks, setEngineBlocks] = useState<string[]>([]);

  // Stage 9 — final boss
  const BOSS_SEQUENCE = [50, 20, 60, 10, 30, 25, 70, 65];
  const [bossRoot, setBossRoot]         = useState<TreeNode | null>(null);
  const [bossQueue, setBossQueue]       = useState([...BOSS_SEQUENCE]);
  const [bossAttempts, setBossAttempts] = useState(0);
  const [lastRotation, setLastRotation] = useState<string | null>(null);

  // Mini challenge quizzes
  const [quiz1Ans, setQuiz1Ans] = useState<string | null>(null);
  const [quiz2Ans, setQuiz2Ans] = useState<string | null>(null);
  const [quiz3Ans, setQuiz3Ans] = useState<string | null>(null);

  const renderStage1 = () => (
    <StageWrapper>
      <div className="text-center mb-8 max-w-xl">
        <div className="text-6xl mb-4">🌳</div>
        <h2 className="text-3xl font-bold text-primary mb-3">
          Guardians of the Balanced Tree
        </h2>
        <p className="text-muted-foreground leading-relaxed">
          You are a Tree Guardian in a digital forest. Each number you insert grows the tree —
          but imbalance triggers chaos. Master the four ancient <strong>rotation spells</strong>
          to keep the AVL forest stable.
        </p>
      </div>

      <div className="grid grid-cols-4 gap-3 mb-10 w-full max-w-lg">
        {[
          { spell: "LL", desc: "Right Rotate", color: "text-blue-500",   bg: "bg-blue-500/10   border-blue-500/30"   },
          { spell: "RR", desc: "Left Rotate",  color: "text-purple-500", bg: "bg-purple-500/10 border-purple-500/30" },
          { spell: "LR", desc: "Left+Right",   color: "text-green-500",  bg: "bg-green-500/10  border-green-500/30"  },
          { spell: "RL", desc: "Right+Left",   color: "text-yellow-500", bg: "bg-yellow-500/10 border-yellow-500/30" },
        ].map(r => (
          <div key={r.spell}
            className={`flex flex-col items-center p-3 rounded-xl border ${r.bg}`}>
            <div className={`text-xl font-bold font-mono ${r.color}`}>{r.spell}</div>
            <div className="text-[10px] text-muted-foreground mt-1">{r.desc}</div>
          </div>
        ))}
      </div>

      <button
        onClick={() => { game.addXp(50, "Guardian Awakened"); game.nextStage(); }}
        className="px-8 py-3 bg-primary text-primary-foreground font-bold rounded-xl flex items-center gap-2"
      >
        🌱 Enter the Forest <ChevronRight className="size-4" />
      </button>
    </StageWrapper>
  );
  const renderStage2 = () => {
    const handleInsert = () => {
      const v = parseInt(inputVal);
      if (isNaN(v) || insertedVals.includes(v)) {
        game.showMistake(isNaN(v) ? "Enter a valid number." : `${v} already in tree.`);
        return;
      }
      setTreeRoot(r => avlInsert(r, v));
      setInsertedVals(p => [...p, v]);
      game.addXp(20, `Inserted ${v}`);
      setInputVal("");
    };

    const canProceed = insertedVals.length >= 3;

    return (
      <StageWrapper>
        <div className="text-center mb-4 max-w-lg">
          <h3 className="text-xl font-bold text-primary mb-1">🌱 Birth of the Tree</h3>
          <p className="text-muted-foreground text-sm">
            Insert at least 3 numbers to grow your AVL tree. Try <code className="bg-secondary px-1 rounded">10, 20, 30</code> to trigger an LL case.
          </p>
        </div>

        {/* Input */}
        <div className="flex gap-2 mb-6">
          <input
            type="number"
            value={inputVal}
            onChange={e => setInputVal(e.target.value)}
            onKeyDown={e => e.key === "Enter" && handleInsert()}
            placeholder="Enter number..."
            className="px-4 py-2 border border-border rounded-lg bg-background text-sm
                       font-mono w-40 focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
          <button
            onClick={handleInsert}
            className="px-4 py-2 bg-primary text-primary-foreground font-bold rounded-lg text-sm"
          >
            Insert ⚡
          </button>
          <button
            onClick={() => {
              setTreeRoot(null);
              setInsertedVals([]);
            }}
            className="px-3 py-2 border border-border rounded-lg hover:bg-secondary"
          >
            <RotateCcw className="size-4" />
          </button>
        </div>

        {/* Inserted chips */}
        {insertedVals.length > 0 && (
          <div className="flex gap-2 flex-wrap justify-center mb-4">
            {insertedVals.map(v => (
              <span key={v}
                className="px-2 py-1 bg-primary/10 border border-primary/30 rounded text-xs font-mono text-primary font-bold">
                {v}
              </span>
            ))}
          </div>
        )}

        {/* Tree SVG */}
        <div className="w-full max-w-xl border border-border rounded-xl p-4 bg-card mb-6">
          <TreeSVG root={treeRoot} />
        </div>

        {canProceed && (
          <button
            onClick={() => { game.addXp(80, "Tree Planted"); game.nextStage(); }}
            className="px-8 py-3 bg-primary text-primary-foreground font-bold rounded-xl animate-in zoom-in"
          >
            Activate Height Vision 📊
          </button>
        )}
      </StageWrapper>
    );
  };
  const renderStage3 = () => {
    const nodes = collectNodes(layoutTree(treeRoot));

    return (
      <StageWrapper>
        <div className="text-center mb-4 max-w-lg">
          <h3 className="text-xl font-bold text-primary mb-1">📊 Height & Balance Vision</h3>
          <p className="text-muted-foreground text-sm">
            Each node shows its <strong>Balance Factor</strong> (BF = left height − right height).
            🟢 BF ∈ &#123;-1, 0, 1&#125; = stable. 🔴 BF = ±2 = rotation needed!
          </p>
        </div>

        {/* Legend */}
        <div className="flex gap-4 mb-4">
          {[
            { label: "Balanced",   color: "bg-green-500", bf: "BF: -1, 0, 1" },
            { label: "Unbalanced", color: "bg-red-500",   bf: "BF: ±2" },
          ].map(l => (
            <div key={l.label} className="flex items-center gap-2 text-xs">
              <div className={`size-3 rounded-full ${l.color}`} />
              <span>{l.label} ({l.bf})</span>
            </div>
          ))}
        </div>

        {/* Tree with BF */}
        <div className="w-full max-w-xl border border-border rounded-xl p-4 bg-card mb-6">
          <TreeSVG root={treeRoot} showBF={true}
            highlightVal={inspectedNode} />
        </div>

        {/* Node inspector */}
        <div className="w-full max-w-sm mb-6">
          <p className="text-xs font-semibold text-muted-foreground mb-2">Click a node to inspect:</p>
          <div className="flex gap-2 flex-wrap">
            {nodes.map(n => {
              const b = bf(n);
              return (
                <button key={n.val}
                  onClick={() => setInspectedNode(n.val === inspectedNode ? null : n.val)}
                  className={`px-3 py-1.5 rounded-lg border text-xs font-mono font-bold transition-all
                    ${inspectedNode === n.val
                      ? "bg-primary text-primary-foreground border-primary"
                      : Math.abs(b) > 1
                      ? "border-red-500 bg-red-500/10 text-red-600 dark:text-red-400"
                      : "border-green-500 bg-green-500/10 text-green-600 dark:text-green-400"
                    }`}
                >
                  {n.val}
                </button>
              );
            })}
          </div>

          {inspectedNode !== null && (() => {
            const n = nodes.find(x => x.val === inspectedNode);
            if (!n) return null;
            const b = bf(n);
            return (
              <div className="mt-3 p-3 rounded-xl border border-border bg-card text-xs animate-in fade-in">
                <div className="font-bold mb-2">Node: {n.val}</div>
                <div className="flex justify-between mb-1">
                  <span>Left height</span>
                  <span className="font-mono">{height(n.left)}</span>
                </div>
                <div className="flex justify-between mb-1">
                  <span>Right height</span>
                  <span className="font-mono">{height(n.right)}</span>
                </div>
                <div className="flex justify-between font-bold border-t border-border pt-1 mt-1">
                  <span>Balance Factor</span>
                  <span className={`font-mono ${Math.abs(b) > 1 ? "text-red-500" : "text-green-500"}`}>
                    {b} {Math.abs(b) > 1 ? "⚠️ UNBALANCED" : "✅"}
                  </span>
                </div>
              </div>
            );
          })()}
        </div>

        <button
          onClick={() => { game.addXp(80, "Balance Vision"); game.nextStage(); }}
          className="px-8 py-3 bg-primary text-primary-foreground font-bold rounded-xl"
        >
          LL Rotation Spell → 🔄
        </button>
      </StageWrapper>
    );
  };
  // Reusable rotation stage builder
  const makeRotationStage = ({
    title, emoji, subtitle, imbalanceDesc, correctChoice,
    wrongChoices, sqlAfter, xpLabel, xpAmt, done, onCorrect, onNext, nextLabel,
    beforeRoot, afterRoot,
  }: {
    title: string; emoji: string; subtitle: string;
    imbalanceDesc: string; correctChoice: string;
    wrongChoices: string[]; sqlAfter: string;
    xpLabel: string; xpAmt: number;
    done: boolean; onCorrect: () => void; onNext: () => void; nextLabel: string;
    beforeRoot: TreeNode | null; afterRoot: TreeNode | null;
  }) => (
    <StageWrapper>
      <div className="text-center mb-4 max-w-lg">
        <h3 className="text-xl font-bold text-primary mb-1">{emoji} {title}</h3>
        <p className="text-muted-foreground text-sm">{subtitle}</p>
      </div>

      {/* Before / After trees */}
      <div className="grid grid-cols-2 gap-6 w-full max-w-xl mb-6">
        <div>
          <p className="text-xs font-bold text-center text-red-400 mb-2">
            ⚠️ BEFORE (Unbalanced)
          </p>
          <div className="border-2 border-red-500/40 rounded-xl p-3 bg-red-500/5">
            <TreeSVG root={beforeRoot} showBF={true} height={180} />
          </div>
        </div>
        <div>
          <p className="text-xs font-bold text-center text-green-400 mb-2">
            {done ? "✅ AFTER (Balanced)" : "⏳ AFTER (Apply spell)"}
          </p>
          <div className={`border-2 rounded-xl p-3 transition-all
            ${done ? "border-green-500/40 bg-green-500/5" : "border-dashed border-border bg-muted/20"}`}>
            {done
              ? <TreeSVG root={afterRoot} showBF={true} height={180} />
              : <div className="h-40 flex items-center justify-center text-muted-foreground text-xs">
                  Choose the correct spell
                </div>
            }
          </div>
        </div>
      </div>

      {/* Imbalance description */}
      <div className="bg-secondary/30 rounded-xl px-4 py-3 text-sm text-center mb-6 max-w-md">
        {imbalanceDesc}
      </div>

      {/* Rotation choices */}
      {!done && (
        <div className="flex gap-3 flex-wrap justify-center mb-4">
          {[correctChoice, ...wrongChoices].sort(() => 0.5 - Math.random()).map(choice => (
            <button key={choice}
              onClick={() => {
                if (choice === correctChoice) {
                  onCorrect();
                  game.addXp(xpAmt, xpLabel);
                } else {
                  game.showMistake(`❌ ${choice} won't fix this imbalance. Think about which side is heavy.`);
                }
              }}
              className="px-6 py-2.5 border border-border rounded-xl font-bold text-sm
                         hover:bg-secondary transition-all hover:scale-105"
            >
              {choice}
            </button>
          ))}
        </div>
      )}

      {/* SQL */}
      {done && (
        <div className="w-full max-w-sm bg-black/80 rounded-xl p-3 font-mono text-xs
                        text-green-400 mb-6 animate-in fade-in">
          <p className="text-muted-foreground mb-1">-- Applied:</p>
          <p>{sqlAfter}</p>
        </div>
      )}

      {done && (
        <button
          onClick={onNext}
          className="px-8 py-3 bg-primary text-primary-foreground font-bold rounded-xl animate-in zoom-in"
        >
          {nextLabel}
        </button>
      )}
    </StageWrapper>
  );
  // Pre-built trees for each case
  // LL: insert 30→20→10 (without AVL, so we build manually for demo)
  const LL_BEFORE = layoutTree((() => {
    let r: TreeNode | null = null;
    // Force unbalanced BST for LL demo
    r = { val: 30, left: { val: 20, left: { val: 10, left: null, right: null, height: 1, x:0,y:0 }, right: null, height: 2, x:0,y:0 }, right: null, height: 3, x:0,y:0 };
    return r;
  })());
  const LL_AFTER = layoutTree(rotateRight(LL_BEFORE!));

  const RR_BEFORE = layoutTree((() => {
    const r: TreeNode = { val: 10, right: { val: 20, right: { val: 30, left:null, right:null, height:1, x:0,y:0 }, left:null, height:2, x:0,y:0 }, left:null, height:3, x:0,y:0 };
    return r;
  })());
  const RR_AFTER = layoutTree(rotateLeft(RR_BEFORE!));

  const LR_BEFORE = layoutTree((() => {
    const r: TreeNode = {
      val: 30,
      left: { val: 10, right: { val: 20, left:null, right:null, height:1, x:0,y:0 }, left:null, height:2, x:0,y:0 },
      right: null, height: 3, x:0,y:0
    };
    return r;
  })());
  const LR_MID = layoutTree(rotateRight({ ...LR_BEFORE!, left: rotateLeft(LR_BEFORE!.left!) }));
  const LR_AFTER = LR_MID;

  const RL_BEFORE = layoutTree((() => {
    const r: TreeNode = {
      val: 10,
      right: { val: 30, left: { val: 20, left:null, right:null, height:1, x:0,y:0 }, right:null, height:2, x:0,y:0 },
      left: null, height: 3, x:0,y:0
    };
    return r;
  })());
  const RL_AFTER = layoutTree(rotateLeft({ ...RL_BEFORE!, right: rotateRight(RL_BEFORE!.right!) }));

  const renderStage4 = () => makeRotationStage({
    title: "LL Rotation Spell", emoji: "🔵",
    subtitle: "The left subtree is too tall. A single Right Rotation fixes it.",
    imbalanceDesc: "Inserted 10→20→30 (descending). Heavy on LEFT-LEFT side. Spell: Right Rotate ↻",
    correctChoice: "✅ Right Rotate",
    wrongChoices: ["❌ Left Rotate", "❌ Left then Right"],
    sqlAfter: "rotateRight(unbalancedNode);",
    xpLabel: "LL Mastered", xpAmt: 100,
    done: llDone,
    onCorrect: () => setLlDone(true),
    onNext: () => game.nextStage(),
    nextLabel: "RR Spell → 🔴",
    beforeRoot: LL_BEFORE,
    afterRoot: LL_AFTER,
  });

  const renderStage5 = () => makeRotationStage({
    title: "RR Rotation Spell", emoji: "🔴",
    subtitle: "The right subtree is too tall. A single Left Rotation fixes it.",
    imbalanceDesc: "Tree is heavy on RIGHT-RIGHT side. Spell: Left Rotate ↺",
    correctChoice: "✅ Left Rotate",
    wrongChoices: ["❌ Right Rotate", "❌ Right then Left"],
    sqlAfter: "rotateLeft(unbalancedNode);",
    xpLabel: "RR Mastered", xpAmt: 100,
    done: rrDone,
    onCorrect: () => setRrDone(true),
    onNext: () => game.nextStage(),
    nextLabel: "LR Spell → ⚡",
    beforeRoot: RR_BEFORE,
    afterRoot: RR_AFTER,
  });
  const renderStage6 = () => (
    <StageWrapper>
      <div className="text-center mb-4 max-w-lg">
        <h3 className="text-xl font-bold text-primary mb-1">⚡ LR Rotation — Two-Step Spell</h3>
        <p className="text-muted-foreground text-sm">
          Left-Right imbalance is tricky. It needs TWO rotations: first Left rotate the child,
          then Right rotate the root.
        </p>
      </div>

      {/* 3-panel: Before → Step1 → After */}
      <div className="grid grid-cols-3 gap-3 w-full max-w-2xl mb-6">
        {[
          { label: "⚠️ Unbalanced", root: LR_BEFORE, active: true },
          { label: lrStep >= 1 ? "Step 1: Left Rotate child ✓" : "Step 1: Left Rotate child", root: LR_MID,    active: lrStep >= 1 },
          { label: lrStep >= 2 ? "Step 2: Right Rotate root ✓" : "Step 2: Right Rotate root", root: LR_AFTER, active: lrStep >= 2 },
        ].map((panel, i) => (
          <div key={i}>
            <p className={`text-[10px] font-bold text-center mb-1
              ${panel.active ? "text-primary" : "text-muted-foreground"}`}>
              {panel.label}
            </p>
            <div className={`border-2 rounded-xl p-2 transition-all
              ${panel.active ? "border-primary/50 bg-primary/5" : "border-dashed border-border opacity-40"}`}>
              {panel.active
                ? <TreeSVG root={panel.root} showBF height={150} />
                : <div className="h-32 flex items-center justify-center text-xs text-muted-foreground">
                    Locked 🔒
                  </div>
              }
            </div>
          </div>
        ))}
      </div>

      <div className="flex gap-3 mb-6">
        <button
          disabled={lrStep !== 0}
          onClick={() => {
            setLrStep(1);
            game.addXp(50, "LR Step 1");
          }}
          className={`px-5 py-2 rounded-xl border font-bold text-sm transition-all
            ${lrStep >= 1
              ? "bg-green-500/20 border-green-500 text-green-600 dark:text-green-400 cursor-not-allowed"
              : "border-border hover:bg-secondary cursor-pointer"
            }`}
        >
          {lrStep >= 1 ? "✓ Left Rotate Child" : "1️⃣ Left Rotate Child"}
        </button>
        <button
          disabled={lrStep !== 1}
          onClick={() => {
            setLrStep(2);
            game.addXp(50, "LR Step 2");
          }}
          className={`px-5 py-2 rounded-xl border font-bold text-sm transition-all
            ${lrStep === 0 ? "opacity-30 cursor-not-allowed border-border"
            : lrStep >= 2 ? "bg-green-500/20 border-green-500 text-green-600 dark:text-green-400 cursor-not-allowed"
            : "border-primary bg-primary/10 hover:bg-primary/20 cursor-pointer"
            }`}
        >
          {lrStep >= 2 ? "✓ Right Rotate Root" : "2️⃣ Right Rotate Root"}
        </button>
      </div>

      {lrStep === 2 && (
        <button
          onClick={() => { game.addXp(100, "LR Mastered"); game.nextStage(); }}
          className="px-8 py-3 bg-primary text-primary-foreground font-bold rounded-xl animate-in zoom-in"
        >
          RL Spell → 🔥
        </button>
      )}
    </StageWrapper>
  );

  const renderStage7 = () => (
    <StageWrapper>
      <div className="text-center mb-4 max-w-lg">
        <h3 className="text-xl font-bold text-primary mb-1">🔥 RL Rotation — Mirror Spell</h3>
        <p className="text-muted-foreground text-sm">
          Right-Left is the mirror of LR. First Right rotate the child, then Left rotate the root.
        </p>
      </div>

      <div className="grid grid-cols-3 gap-3 w-full max-w-2xl mb-6">
        {[
          { label: "⚠️ Unbalanced", root: RL_BEFORE, active: true },
          { label: rlStep >= 1 ? "Step 1: Right Rotate child ✓" : "Step 1: Right Rotate child", root: RL_AFTER, active: rlStep >= 1 },
          { label: rlStep >= 2 ? "Step 2: Left Rotate root ✓" : "Step 2: Left Rotate root",     root: RL_AFTER, active: rlStep >= 2 },
        ].map((panel, i) => (
          <div key={i}>
            <p className={`text-[10px] font-bold text-center mb-1
              ${panel.active ? "text-primary" : "text-muted-foreground"}`}>
              {panel.label}
            </p>
            <div className={`border-2 rounded-xl p-2 transition-all
              ${panel.active ? "border-primary/50 bg-primary/5" : "border-dashed border-border opacity-40"}`}>
              {panel.active
                ? <TreeSVG root={panel.root} showBF height={150} />
                : <div className="h-32 flex items-center justify-center text-xs text-muted-foreground">
                    Locked 🔒
                  </div>
              }
            </div>
          </div>
        ))}
      </div>

      <div className="flex gap-3 mb-6">
        <button
          disabled={rlStep !== 0}
          onClick={() => { setRlStep(1); game.addXp(50, "RL Step 1"); }}
          className={`px-5 py-2 rounded-xl border font-bold text-sm transition-all
            ${rlStep >= 1
              ? "bg-green-500/20 border-green-500 text-green-600 dark:text-green-400 cursor-not-allowed"
              : "border-border hover:bg-secondary cursor-pointer"
            }`}
        >
          {rlStep >= 1 ? "✓ Right Rotate Child" : "1️⃣ Right Rotate Child"}
        </button>
        <button
          disabled={rlStep !== 1}
          onClick={() => { setRlStep(2); game.addXp(50, "RL Step 2"); }}
          className={`px-5 py-2 rounded-xl border font-bold text-sm transition-all
            ${rlStep === 0 ? "opacity-30 cursor-not-allowed border-border"
            : rlStep >= 2 ? "bg-green-500/20 border-green-500 text-green-600 dark:text-green-400 cursor-not-allowed"
            : "border-primary bg-primary/10 hover:bg-primary/20 cursor-pointer"
            }`}
        >
          {rlStep >= 2 ? "✓ Left Rotate Root" : "2️⃣ Left Rotate Root"}
        </button>
      </div>

      {rlStep === 2 && (
        <button
          onClick={() => { game.addXp(100, "RL Mastered"); game.nextStage(); }}
          className="px-8 py-3 bg-primary text-primary-foreground font-bold rounded-xl animate-in zoom-in"
        >
          AVL Engine → 🚀
        </button>
      )}
    </StageWrapper>
  );
  const renderStage8 = () => {
    const allAdded = engineBlocks.length === ENGINE_BLOCKS_REQUIRED.length;
    return (
      <StageWrapper>
        <div className="text-center mb-6 max-w-lg">
          <h3 className="text-xl font-bold text-primary mb-1">🚀 Build the AVL Engine</h3>
          <p className="text-muted-foreground text-sm">
            Click each logic block in order to assemble the full AVL insertion pipeline.
          </p>
        </div>

        <div className="flex gap-8 w-full max-w-xl mb-8">
          {/* Available blocks */}
          <div className="flex-1">
            <p className="text-xs font-bold text-muted-foreground mb-2 uppercase tracking-wider">
              Available Blocks
            </p>
            <div className="space-y-2">
              {ENGINE_BLOCKS_REQUIRED.map(b => (
                <button key={b}
                  disabled={engineBlocks.includes(b)}
                  onClick={() => {
                    setEngineBlocks(p => [...p, b]);
                    game.addXp(20, b);
                  }}
                  className={`w-full px-3 py-2 text-xs font-mono rounded-lg border text-left transition-all
                    ${engineBlocks.includes(b)
                      ? "opacity-20 cursor-not-allowed border-border"
                      : "border-primary/40 bg-primary/5 hover:bg-primary/15 cursor-pointer"
                    }`}
                >
                  {b}
                </button>
              ))}
            </div>
          </div>

          {/* Pipeline */}
          <div className="flex-1">
            <p className="text-xs font-bold text-muted-foreground mb-2 uppercase tracking-wider">
              AVL insert() Pipeline
            </p>
            <div className="space-y-1 min-h-48">
              {engineBlocks.map((b, i) => (
                <div key={b}
                  className="flex items-center gap-2 px-3 py-2 text-xs font-mono rounded-lg
                             bg-green-500/10 border border-green-500/30 text-green-600 dark:text-green-400
                             animate-in slide-in-from-left-4"
                >
                  <span className="text-muted-foreground w-4">{i+1}.</span>
                  {b}
                  <span className="ml-auto">✓</span>
                </div>
              ))}
              {engineBlocks.length < ENGINE_BLOCKS_REQUIRED.length && (
                <div className="px-3 py-2 text-xs border border-dashed border-border rounded-lg
                                text-muted-foreground">
                  ← Add next block
                </div>
              )}
            </div>
          </div>
        </div>

        {allAdded && (
          <button
            onClick={() => { game.addXp(150, "AVL Engine Built"); game.nextStage(); }}
            className="px-8 py-3 bg-primary text-primary-foreground font-bold rounded-xl animate-in zoom-in"
          >
            ⚔️ Final Boss: Chaos Forest
          </button>
        )}
      </StageWrapper>
    );
  };

  const renderStage9 = () => {
    const nextVal = bossQueue[0];
    const allInserted = bossQueue.length === 0;

    const handleBossInsert = () => {
      if (!nextVal) return;
      const newRoot = avlInsert(bossRoot, nextVal);
      setBossRoot(newRoot);
      setBossQueue(q => q.slice(1));
      game.addXp(60, `Inserted ${nextVal}`);

      // Detect what rotation was needed
      const prevBf = bf(bossRoot);
      if (Math.abs(prevBf) > 1) {
        setLastRotation("Rotation Applied! ✅");
        setTimeout(() => setLastRotation(null), 2000);
      }
    };

    return (
      <StageWrapper>
        <h3 className="text-2xl font-bold text-primary mb-2 flex items-center gap-2">
          <Swords className="size-6 text-red-500" /> The Chaos Forest Trial
        </h3>
        <p className="text-muted-foreground text-sm mb-4 max-w-md text-center">
          Insert the sequence <code className="bg-secondary px-1 rounded text-xs">
          {BOSS_SEQUENCE.join(", ")}</code> one by one.
          The AVL engine auto-balances — watch the rotations happen live!
        </p>

        {/* Queue */}
        <div className="flex gap-2 flex-wrap justify-center mb-4">
          {BOSS_SEQUENCE.map((v, i) => {
            const inserted = bossQueue.indexOf(v) === -1 || (bossQueue[0] !== v && !bossQueue.includes(v));
            const isNext = bossQueue[0] === v && !allInserted;
            const isDone = !bossQueue.includes(v);
            return (
              <div key={`${v}-${i}`}
                className={`w-10 h-10 rounded-lg flex items-center justify-center text-sm font-bold font-mono
                  border-2 transition-all
                  ${isDone ? "bg-green-500/20 border-green-500 text-green-600 dark:text-green-400"
                  : isNext ? "bg-primary/20 border-primary text-primary scale-110 animate-pulse"
                  : "border-border opacity-40"
                  }`}
              >
                {v}
              </div>
            );
          })}
        </div>

        {lastRotation && (
          <div className="mb-2 text-green-500 font-bold text-sm animate-in zoom-in">
            🔄 {lastRotation}
          </div>
        )}

        {/* Live tree */}
        <div className="w-full max-w-xl border-2 border-primary/30 rounded-xl p-4
                        bg-card mb-6 shadow-[0_0_20px_hsl(var(--primary)/0.1)]">
          <TreeSVG root={bossRoot} showBF={true} />
        </div>

        {!allInserted ? (
          <button
            onClick={handleBossInsert}
            className="px-8 py-3 bg-primary text-primary-foreground font-bold rounded-xl
                       flex items-center gap-2 hover:opacity-90"
          >
            <Zap className="size-4" /> Insert {nextVal}
          </button>
        ) : (
          <button
            onClick={() => { game.addXp(300, "Chaos Forest Tamed"); game.nextStage(); }}
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
      missionTitle="Guardian of Balance! 🌳"
      missionSubtitle="You mastered all four rotation spells and kept the digital forest stable."
      xp={game.xp}
      xpLog={game.xpLog}
      achievements={[
        { icon: <span>🟢</span>, label: "Balance Keeper" },
        { icon: <span>🔄</span>, label: "Rotation Master" },
        { icon: <span>⚡</span>, label: "Logarithmic Legend" },
        { icon: <span>🌳</span>, label: "Tree Guardian" },
      ]}
      concepts={[
        { label: "Balance Factor",  description: "BF = left height − right height. Must stay in {-1, 0, 1}." },
        { label: "LL Rotation",     description: "Right subtree is shallow, left-left heavy → single Right Rotate." },
        { label: "RR Rotation",     description: "Left subtree is shallow, right-right heavy → single Left Rotate." },
        { label: "LR Rotation",     description: "Left-Right zigzag → Left Rotate child, then Right Rotate root." },
        { label: "RL Rotation",     description: "Right-Left zigzag → Right Rotate child, then Left Rotate root." },
        { label: "O(log n)",        description: "AVL guarantees search, insert, delete all stay logarithmic." },
      ]}
      onReset={game.reset}
    />
  );
  return (
    <SimShell
      title="AVL Tree Guardian"
      subtitle="Data Structures Lab"
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
    </SimShell>
  );
}