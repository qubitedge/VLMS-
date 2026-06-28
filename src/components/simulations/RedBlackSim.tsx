// RedBlackSim.tsx — CORRECTED COMPLETE FILE

import { useState } from "react";
import { Shield, Swords, Eye } from "lucide-react";
import {
  useSimGame, SimShell, StageWrapper,
  QuizBlock, CompletionScreen,
} from "@/components/simulations/shared";

// ── Types ─────────────────────────────────────────────────────────────────────
type Color = "RED" | "BLACK";

interface RBNode {
  val: number;
  color: Color;
  left: RBNode | null;
  right: RBNode | null;
  parent: RBNode | null;
}

interface NodePos { node: RBNode; x: number; y: number; }

// ── Tree Helpers ──────────────────────────────────────────────────────────────
function createNode(val: number): RBNode {
  return { val, color: "RED", left: null, right: null, parent: null };
}

function leftRotate(root: RBNode | null, x: RBNode): RBNode | null {
  const y = x.right!;
  x.right = y.left;
  if (y.left) y.left.parent = x;
  y.parent = x.parent;
  if (!x.parent) root = y;
  else if (x === x.parent.left) x.parent.left = y;
  else x.parent.right = y;
  y.left = x;
  x.parent = y;
  return root;
}

function rightRotate(root: RBNode | null, x: RBNode): RBNode | null {
  const y = x.left!;
  x.left = y.right;
  if (y.right) y.right.parent = x;
  y.parent = x.parent;
  if (!x.parent) root = y;
  else if (x === x.parent.right) x.parent.right = y;
  else x.parent.left = y;
  y.right = x;
  x.parent = y;
  return root;
}

function insertFixup(root: RBNode, z: RBNode): RBNode {
  while (z.parent && z.parent.color === "RED") {
    const parent = z.parent;
    const grandparent = parent.parent!;
    if (parent === grandparent.left) {
      const uncle = grandparent.right;
      if (uncle && uncle.color === "RED") {
        parent.color = "BLACK";
        uncle.color = "BLACK";
        grandparent.color = "RED";
        z = grandparent;
      } else {
        if (z === parent.right) {
          z = parent;
          root = leftRotate(root, z)!;
        }
        z.parent!.color = "BLACK";
        z.parent!.parent!.color = "RED";
        root = rightRotate(root, z.parent!.parent!)!;
      }
    } else {
      const uncle = grandparent.left;
      if (uncle && uncle.color === "RED") {
        parent.color = "BLACK";
        uncle.color = "BLACK";
        grandparent.color = "RED";
        z = grandparent;
      } else {
        if (z === parent.left) {
          z = parent;
          root = rightRotate(root, z)!;
        }
        z.parent!.color = "BLACK";
        z.parent!.parent!.color = "RED";
        root = leftRotate(root, z.parent!.parent!)!;
      }
    }
  }
  root.color = "BLACK";
  return root;
}

function rbInsert(root: RBNode | null, val: number): RBNode {
  const z = createNode(val);
  if (!root) { z.color = "BLACK"; return z; }
  let curr: RBNode | null = root;
  let parent: RBNode | null = null;
  while (curr) {
    parent = curr;
    curr = val < curr.val ? curr.left : curr.right;
  }
  z.parent = parent;
  if (val < parent!.val) parent!.left = z;
  else parent!.right = z;
  return insertFixup(root, z);
}

// ── BUG FIX 2: Raw BST insert (NO fixup) — used in Stage 4 to expose violations ──
function bstInsertRaw(root: RBNode | null, val: number): RBNode {
  const z = createNode(val); // starts RED
  if (!root) { z.color = "BLACK"; return z; }
  let curr: RBNode | null = root;
  let parent: RBNode | null = null;
  while (curr) {
    parent = curr;
    curr = val < curr.val ? curr.left : curr.right;
  }
  z.parent = parent;
  if (val < parent!.val) parent!.left = z;
  else parent!.right = z;
  return root; // ← intentionally NOT calling insertFixup
}

// ── BUG FIX 4: Deep-clone tree so rotation demo never corrupts parent pointers ──
function cloneTree(node: RBNode | null, parent: RBNode | null = null): RBNode | null {
  if (!node) return null;
  const n: RBNode = { val: node.val, color: node.color, left: null, right: null, parent };
  n.left  = cloneTree(node.left,  n);
  n.right = cloneTree(node.right, n);
  return n;
}

// ── BUG FIX 6: buildDemo moved OUTSIDE component so reset callback can reference it ──
function buildDemo(): RBNode {
  let r = rbInsert(null, 30);
  r = rbInsert(r, 20);
  r = rbInsert(r, 40);
  return r;
}

// ── Violation finder (only meaningful on raw-inserted trees) ──
function findViolation(root: RBNode | null): number | null {
  if (!root) return null;
  if (root.color === "RED" && root.parent?.color === "RED") return root.val;
  return findViolation(root.left) ?? findViolation(root.right);
}

// ── TreeSVG ───────────────────────────────────────────────────────────────────
function layoutTree(node: RBNode | null, x: number, y: number, gap: number, acc: NodePos[]) {
  if (!node) return;
  acc.push({ node, x, y });
  layoutTree(node.left,  x - gap, y + 70, gap / 1.8, acc);
  layoutTree(node.right, x + gap, y + 70, gap / 1.8, acc);
}

function TreeSVG({ root, highlight }: { root: RBNode | null; highlight?: number }) {
  if (!root) return (
    <div className="flex items-center justify-center h-48 text-slate-400 italic text-sm">
      No nodes yet — insert the first node below
    </div>
  );

  const positions: NodePos[] = [];
  layoutTree(root, 260, 40, 120, positions);
  const posMap = new Map(positions.map(p => [p.node.val, p]));

  return (
    <svg width="520" height="280" className="overflow-visible">
      {positions.map(({ node, x, y }) => {
        const children = [node.left, node.right].filter(Boolean) as RBNode[];
        return children.map(child => {
          const cp = posMap.get(child.val)!;
          return (
            <line key={`${node.val}-${child.val}`}
              x1={x} y1={y} x2={cp.x} y2={cp.y}
              stroke="#475569" strokeWidth="2"
              className="transition-all duration-500"
            />
          );
        });
      })}
      {positions.map(({ node, x, y }) => {
        const isHighlight = highlight === node.val;
        const fill = node.color === "RED" ? "#ef4444" : "#1e293b";
        const ring = isHighlight ? "#fbbf24" : node.color === "RED" ? "#fca5a5" : "#475569";
        return (
          <g key={node.val} className="transition-all duration-500">
            <circle cx={x} cy={y} r={22}
              fill={fill} stroke={ring} strokeWidth={isHighlight ? 3 : 1.5}
              style={{ filter: isHighlight ? "drop-shadow(0 0 8px #fbbf24)" : undefined }}
            />
            <text x={x} y={y + 5} textAnchor="middle"
              fill="white" fontSize={13} fontWeight="bold">
              {node.val}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

// ── Constants ─────────────────────────────────────────────────────────────────
const TOTAL_STAGES = 6;
const BST_SEQUENCE = [20, 5];

const FIXUP_QUIZ = [
  {
    q: "Uncle is RED. What do you do?",
    options: [
      { label: "Rotate toward uncle", value: "a" },
      { label: "Recolor parent, uncle → BLACK; grandparent → RED", value: "b" },
      { label: "Delete the uncle node", value: "c" },
    ],
    correct: "b",
    ok: "✅ Correct! Recoloring pushes the problem upward to the grandparent.",
    bad: "❌ Not quite — rotations are for BLACK uncle cases. Here we recolor.",
  },
  {
    q: "Uncle is BLACK and the new node is an INNER grandchild (zig-zag). First step?",
    options: [
      { label: "Recolor grandparent", value: "a" },
      { label: "Rotate parent toward uncle", value: "b" },
      { label: "Delete and reinsert", value: "c" },
    ],
    correct: "b",
    ok: "✅ Yes! Rotate parent toward uncle to convert to the outer case.",
    bad: "❌ Zig-zag must be straightened first via a rotation.",
  },
  {
    q: "Uncle is BLACK and new node is an OUTER grandchild (straight line). What's the fix?",
    options: [
      { label: "Rotate grandparent away + recolor", value: "a" },
      { label: "Recolor only", value: "b" },
      { label: "Rotate toward uncle", value: "c" },
    ],
    correct: "a",
    ok: "✅ Perfect! Rotate the grandparent, then recolor parent and grandparent.",
    bad: "❌ Outer case needs rotation of the grandparent plus recolor.",
  },
];

// ── Component ─────────────────────────────────────────────────────────────────
export function RedBlackSim() {

  // BUG FIX 1: reset now correctly restores ALL state to proper initial values
  const game = useSimGame(TOTAL_STAGES, () => {
    setTree(null);
    setViolationTree(null);         // ← also reset the raw violation tree
    setViolationInserted(false);
    setDemoTree(buildDemo());
    setBossTree(null);
    setBossSeq([]);
    setInputVal("");
    setLastInserted(undefined);
    setStage2Count(0);
    setQuizAnswers([null, null, null]);   // ← was [] before — BUG FIX 1
    setQuizLocked([false, false, false]); // ← was missing — BUG FIX 1
    setQuizAttempts([0, 0, 0]);           // ← was missing — BUG FIX 1
  });

  const [tree, setTree]                     = useState<RBNode | null>(null);
  const [inputVal, setInputVal]             = useState("");
  const [lastInserted, setLastInserted]     = useState<number | undefined>();
  const [stage2Count, setStage2Count]       = useState(0);

  // BUG FIX 2: separate raw tree for Stage 4 so violations are visible
  const [violationTree, setViolationTree]   = useState<RBNode | null>(null);
  const [violationInserted, setViolationInserted] = useState(false);

  // BUG FIX 4 + 6: use cloneTree when setting demoTree from rotations
  const [demoTree, setDemoTree]             = useState<RBNode | null>(buildDemo);

  const [quizAnswers, setQuizAnswers]       = useState<(string | null)[]>([null, null, null]);
  const [quizLocked, setQuizLocked]         = useState<boolean[]>([false, false, false]);
  const [quizAttempts, setQuizAttempts]     = useState<number[]>([0, 0, 0]);
  const [bossTree, setBossTree]             = useState<RBNode | null>(null);
  const [bossSeq, setBossSeq]               = useState<number[]>([]);

  // ── Stage 1 ────────────────────────────────────────────────────────────────
  const renderStage1 = () => (
    <StageWrapper>
      <div className="text-center mb-6 max-w-lg">
        <h2 className="text-3xl font-bold text-primary mb-2">⚔️ The Red-Black Kingdom</h2>
        <p className="text-muted-foreground text-sm leading-relaxed">
          You are the <strong>Royal Tree Architect</strong>. Every node enters as{" "}
          <span className="text-red-400 font-semibold">RED</span> — but the root must always
          be <span className="text-slate-300 font-semibold">BLACK</span>.
          Insert the first citizen to begin.
        </p>
      </div>

      <div className="w-[520px] h-48 rounded-xl border border-dashed border-slate-600
                      flex items-center justify-center text-slate-500 text-sm mb-6
                      bg-slate-900/50">
        🌑 The kingdom tree is empty…
      </div>

      <div className="flex items-center gap-3 mb-4">
        <input
          type="number"
          placeholder="Enter root value (e.g. 10)"
          value={inputVal}
          onChange={e => setInputVal(e.target.value)}
          className="w-52 px-4 py-2 rounded-xl bg-slate-800 border border-slate-600
                     text-white text-center focus:outline-none focus:ring-2 focus:ring-primary"
        />
        <button
          onClick={() => {
            const v = parseInt(inputVal);
            if (isNaN(v)) return;
            const newTree = rbInsert(null, v);
            setTree(newTree);
            // BUG FIX 2: also seed the violation tree with the same root value
            // so Stage 4 can continue inserting on top of the same tree
            setViolationTree(cloneTree(newTree));
            setInputVal("");
            setLastInserted(v);
            game.addXp(50, "Root Stabilized 👑");
            game.nextStage();
          }}
          className="px-6 py-2 bg-primary text-primary-foreground font-bold rounded-xl
                     hover:opacity-90 transition"
        >
          Plant Root
        </button>
      </div>
      <p className="text-xs text-slate-500">The node will auto-turn BLACK as it's the root.</p>
    </StageWrapper>
  );

  // ── Stage 2 ────────────────────────────────────────────────────────────────
  const renderStage2 = () => (
    <StageWrapper>
      <div className="text-center mb-4 max-w-md">
        <h3 className="text-xl font-bold text-primary mb-1">🌿 BST Foundation</h3>
        <p className="text-muted-foreground text-sm">
          Before balance comes order. Every RB-Tree is a BST at heart —
          values less than the parent go <em>left</em>, greater go <em>right</em>.
        </p>
      </div>

      <div className="mb-4">
        <TreeSVG root={tree} highlight={lastInserted} />
      </div>

      <div className="flex items-center gap-3 mb-4">
        <input
          type="number"
          placeholder="Insert a value…"
          value={inputVal}
          onChange={e => setInputVal(e.target.value)}
          className="w-44 px-4 py-2 rounded-xl bg-slate-800 border border-slate-600
                     text-white text-center focus:outline-none focus:ring-2 focus:ring-primary"
        />
        <button
          onClick={() => {
            const v = parseInt(inputVal);
            // BUG FIX 5: guard tree !== null properly instead of non-null assertion
            if (isNaN(v) || tree === null) return;
            const updated = rbInsert(tree, v);
            setTree(updated);
            // keep violationTree in sync through stage 2 too
            setViolationTree(cloneTree(updated));
            setLastInserted(v);
            setInputVal("");
            setStage2Count(c => c + 1);
          }}
          className="px-5 py-2 bg-emerald-600 text-white font-bold rounded-xl
                     hover:bg-emerald-500 transition"
        >
          Insert
        </button>
      </div>

      <div className="flex gap-2 text-xs text-slate-400 mb-6">
        Try:
        {BST_SEQUENCE.map(v => (
          <button key={v}
            onClick={() => {
              // BUG FIX 5: guard against null tree on quick-insert buttons too
              if (tree === null) return;
              const updated = rbInsert(tree, v);
              setTree(updated);
              setViolationTree(cloneTree(updated));
              setLastInserted(v);
              setStage2Count(c => c + 1);
            }}
            className="px-2 py-0.5 bg-slate-700 rounded hover:bg-slate-600"
          >{v}</button>
        ))}
      </div>

      {stage2Count >= 2 && (
        <button
          onClick={() => { game.addXp(75, "BST Placement ✅"); game.nextStage(); }}
          className="px-8 py-3 bg-primary text-primary-foreground font-bold rounded-xl
                     animate-in zoom-in duration-300"
        >
          Proceed to Rotation Dojo →
        </button>
      )}
    </StageWrapper>
  );

  // ── Stage 3 ────────────────────────────────────────────────────────────────
  const renderStage3 = () => (
    <StageWrapper>
      <div className="text-center mb-4 max-w-md">
        <h3 className="text-xl font-bold text-primary mb-1">🔄 Rotation Dojo</h3>
        <p className="text-muted-foreground text-sm">
          Rotations reshape the tree without breaking BST order.
          The left child becomes new root on a <em>right rotate</em>;
          the right child on a <em>left rotate</em>.
        </p>
      </div>

      <TreeSVG root={demoTree} />

      <div className="flex gap-4 mt-6">
        <button
          onClick={() => {
            if (!demoTree) return;
            // BUG FIX 4: clone first so we operate on a fresh copy with clean parent refs
            const fresh = cloneTree(demoTree) as RBNode;
            const r = rightRotate(fresh, fresh);
            if (r) { r.parent = null; setDemoTree(cloneTree(r)); }
          }}
          className="px-6 py-2 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-500"
        >
          ↩ Right Rotate (root)
        </button>
        <button
          onClick={() => {
            if (!demoTree) return;
            // BUG FIX 4: same here
            const fresh = cloneTree(demoTree) as RBNode;
            const r = leftRotate(fresh, fresh);
            if (r) { r.parent = null; setDemoTree(cloneTree(r)); }
          }}
          className="px-6 py-2 bg-violet-600 text-white font-bold rounded-xl hover:bg-violet-500"
        >
          Left Rotate (root) ↪
        </button>
      </div>

      <p className="text-xs text-slate-400 mt-3 mb-6">
        Notice how child subtrees relocate but BST order is preserved.
      </p>

      <button
        onClick={() => { game.addXp(100, "Rotation Mastered ⚔️"); game.nextStage(); }}
        className="px-8 py-3 bg-primary text-primary-foreground font-bold rounded-xl"
      >
        Enter Fixup Trials →
      </button>
    </StageWrapper>
  );

  // ── Stage 4 ────────────────────────────────────────────────────────────────
  const renderStage4 = () => {
    // BUG FIX 2: look for violations in the RAW tree, not the auto-fixed tree
    const violation = findViolation(violationTree);

    return (
      <StageWrapper>
        <div className="text-center mb-4 max-w-md">
          <h3 className="text-xl font-bold text-red-400 mb-1">🔥 Red Violation Alert!</h3>
          <p className="text-muted-foreground text-sm">
            Two consecutive RED nodes can never coexist.
            Insert <strong>30</strong> into the tree — watch a violation appear.
          </p>
        </div>

        {violation !== null && (
          <div className="mb-3 px-4 py-2 bg-red-900/50 border border-red-500 rounded-lg
                          text-red-300 text-sm animate-pulse">
            ⚠️ Violation at node <strong>{violation}</strong> — RED parent detected!
          </div>
        )}

        {/* BUG FIX 2: render the RAW (unfixed) tree in this stage */}
        <TreeSVG root={violationTree} highlight={violation ?? undefined} />

        {/* BUG FIX 3: only show Insert 30 if not yet inserted */}
        {!violationInserted && (
          <button
            onClick={() => {
              if (!violationTree) return;
              // BUG FIX 2: use bstInsertRaw so violation is visible
              setViolationTree(bstInsertRaw(violationTree, 30));
              setViolationInserted(true);
            }}
            className="mt-4 px-5 py-2 bg-red-700 text-white font-bold rounded-xl
                       hover:bg-red-600 transition"
          >
            + Insert 30 (trigger violation)
          </button>
        )}

        {/* BUG FIX 3: "Begin Fixup Trials" only appears AFTER violation is visible */}
        {violationInserted && violation !== null && (
          <button
            onClick={() => { game.addXp(100, "Violation Spotted 🚨"); game.nextStage(); }}
            className="mt-4 px-8 py-3 bg-primary text-primary-foreground font-bold
                       rounded-xl animate-in zoom-in duration-300"
          >
            Begin Fixup Trials →
          </button>
        )}
      </StageWrapper>
    );
  };

  // ── Stage 5 ────────────────────────────────────────────────────────────────
  const renderStage5 = () => {
    const allCorrect = FIXUP_QUIZ.every((item, i) => quizAnswers[i] === item.correct);

    const handleSelect = (i: number, value: string) => {
      if (quizLocked[i]) return;
      const updated = [...quizAnswers];
      updated[i] = value;
      setQuizAnswers(updated);

      if (value === FIXUP_QUIZ[i].correct) {
        const updatedLocked = [...quizLocked];
        updatedLocked[i] = true;
        setQuizLocked(updatedLocked);
      } else {
        const updatedAttempts = [...quizAttempts];
        updatedAttempts[i] += 1;
        setQuizAttempts(updatedAttempts);
      }
    };

    const handleRetake = (i: number) => {
      const updated = [...quizAnswers];
      updated[i] = null;
      setQuizAnswers(updated);
    };

    return (
      <StageWrapper>
        <h3 className="text-xl font-bold text-primary mb-6">⚖️ Fixup Trials</h3>

        <div className="w-full max-w-lg space-y-5 mb-8">
          {FIXUP_QUIZ.map((item, i) => {
            const selected = quizAnswers[i];
            const isCorrect = selected === item.correct;
            const isWrong = selected !== null && !isCorrect;
            const attempts = quizAttempts[i];

            return (
              <div key={i}
                className={`rounded-xl border p-4 transition-all duration-300 ${
                  isCorrect
                    ? "border-emerald-500 bg-emerald-950/40"
                    : isWrong
                    ? "border-red-500 bg-red-950/40"
                    : "border-slate-700 bg-slate-900/50"
                }`}
              >
                <div className="flex items-start justify-between gap-2 mb-3">
                  <p className="text-sm font-semibold text-slate-200">
                    <span className="text-primary mr-1">Case {i + 1}:</span>
                    {item.q}
                  </p>
                  {attempts > 0 && !isCorrect && (
                    <span className="text-xs text-red-400 whitespace-nowrap mt-0.5">
                      {attempts} wrong {attempts === 1 ? "attempt" : "attempts"}
                    </span>
                  )}
                </div>

                <div className="space-y-2">
                  {item.options.map(opt => {
                    const isPicked = selected === opt.value;
                    const isThisCorrect = opt.value === item.correct;

                    let optStyle = "border-slate-600 bg-slate-800/60 text-slate-300 hover:border-slate-400";
                    if (isCorrect && isThisCorrect)
                      optStyle = "border-emerald-500 bg-emerald-900/50 text-emerald-200";
                    else if (isWrong && isPicked)
                      optStyle = "border-red-500 bg-red-900/50 text-red-200";
                    else if (quizLocked[i])
                      optStyle = "border-slate-700 bg-slate-800/30 text-slate-500 cursor-not-allowed";

                    return (
                      <button key={opt.value}
                        onClick={() => handleSelect(i, opt.value)}
                        disabled={quizLocked[i]}
                        className={`w-full text-left px-4 py-2 rounded-lg border text-sm
                                    transition-all duration-200 ${optStyle}`}
                      >
                        <span className="font-mono text-xs mr-2 opacity-60">
                          {opt.value.toUpperCase()}.
                        </span>
                        {opt.label}
                      </button>
                    );
                  })}
                </div>

                {selected !== null && (
                  <div className="mt-3 flex items-start justify-between gap-3">
                    <p className={`text-xs leading-relaxed ${isCorrect ? "text-emerald-400" : "text-red-400"}`}>
                      {isCorrect ? item.ok : item.bad}
                    </p>
                    {isWrong && (
                      <button onClick={() => handleRetake(i)}
                        className="shrink-0 px-3 py-1 text-xs font-bold rounded-lg
                                   bg-amber-700/70 text-amber-200 border border-amber-500
                                   hover:bg-amber-600/80 transition-all duration-200
                                   flex items-center gap-1"
                      >
                        🔄 Retry
                      </button>
                    )}
                  </div>
                )}

                {isCorrect && (
                  <div className="mt-2 text-xs text-emerald-500 font-semibold">
                    ✓ Locked in
                    {attempts > 0 && (
                      <span className="text-slate-400 font-normal ml-1">
                        (solved in {attempts + 1} {attempts + 1 === 1 ? "try" : "tries"})
                      </span>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {allCorrect && (
          <button
            onClick={() => { game.addXp(300, "Boss Slain 🏆"); game.nextStage(); }}
            className="px-8 py-3 bg-amber-500 text-black font-bold rounded-xl
                       animate-in zoom-in duration-300"
          >
            🏆 Claim Victory →
          </button>
        )}
      </StageWrapper>
    );
  };

  // ── Stage 6 ────────────────────────────────────────────────────────────────
  const renderStage6 = () => (
    <CompletionScreen
      missionTitle="⚖️ Kingdom Restored!"
      missionSubtitle="You defeated imbalance and restored harmony to the Red-Black Kingdom."
      xp={game.xp}
      xpLog={game.xpLog}
      achievements={[
        { icon: <Swords className="size-4" />, label: "Rotation Master" },
        { icon: <Shield className="size-4" />, label: "Fixup Strategist" },
        { icon: <Eye className="size-4" />, label: "Black Height Guardian" },
      ]}
      concepts={[
        { label: "RB Properties", description: "Root is BLACK; no two consecutive REDs; equal black-height on all paths." },
        { label: "Rotations", description: "Left/right rotations reshape structure while preserving BST ordering." },
        { label: "Fixup Cases", description: "Uncle RED → recolor. Uncle BLACK inner → rotate parent. Uncle BLACK outer → rotate grandparent + recolor." },
        { label: "BST Foundation", description: "RB-Trees are BSTs first — every insertion follows BST placement before fixup." },
      ]}
      onReset={game.reset}
    />
  );

  // ── Render ─────────────────────────────────────────────────────────────────
  return (
    <SimShell
      title="Red-Black Kingdom"
      subtitle="Balance Wars — Tree Invariants Lab"
      xp={game.xp}
      stage={game.stage}
      totalStages={TOTAL_STAGES}
      mistakeMessage={game.mistakeMessage}
      successMessage={game.successMessage}
      icon={<Swords className="size-5 text-primary" />}
    >
      {game.stage === 1 && renderStage1()}
      {game.stage === 2 && renderStage2()}
      {game.stage === 3 && renderStage3()}
      {game.stage === 4 && renderStage4()}
      {game.stage === 5 && renderStage5()}
      {game.stage === 6 && renderStage6()}
    </SimShell>
  );
}