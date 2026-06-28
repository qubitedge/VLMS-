import { useMemo, useState } from "react";
import { Swords, ChevronRight, Zap, RefreshCw } from "lucide-react";
import {
  useSimGame,
  SimShell,
  StageWrapper,
  QuizBlock,
  CompletionScreen,
} from "@/components/simulations/shared";

// ── Constants ─────────────────────────────────────────────────────────────────
const TOTAL_STAGES = 11; 
const INITIAL_ARRAY = [1, 3, 5, 7, 9, 11];
// ─────────────────────────────────────────────────────────────────────────────
// Segment Tree — pure implementation
// Stored as 1-indexed flat array. Node 1 = root.
// Left child = 2i, Right child = 2i+1.
// All functions are pure — return new arrays.
// ─────────────────────────────────────────────────────────────────────────────

type Mode = "sum" | "min";

interface SegTree {
  data:  number[];   // the underlying array (0-indexed)
  tree:  number[];   // segment tree nodes (1-indexed, size = 4 * n)
  n:     number;
  mode:  Mode;
}

const combine = (a: number, b: number, mode: Mode): number =>
  mode === "sum" ? a + b : Math.min(a, b);

// ── Build ─────────────────────────────────────────────────────────────────────
function buildTree(data: number[], mode: Mode): SegTree {
  const n    = data.length;
  const tree = new Array(4 * n).fill(0);

  function build(node: number, start: number, end: number) {
    if (start === end) {
      tree[node] = data[start];
      return;
    }
    const mid = Math.floor((start + end) / 2);
    build(2 * node,     start, mid);
    build(2 * node + 1, mid + 1, end);
    tree[node] = combine(tree[2 * node], tree[2 * node + 1], mode);
  }

  build(1, 0, n - 1);
  return { data, tree, n, mode };
}

// ── Query ─────────────────────────────────────────────────────────────────────
// Returns { result, visitedNodes } where visitedNodes = array of node indices used
function queryTree(
  st: SegTree, l: number, r: number
): { result: number; visited: number[] } {
  const visited: number[] = [];

  function query(node: number, start: number, end: number): number {
    if (r < start || end < l) return st.mode === "sum" ? 0 : Infinity;
    if (l <= start && end <= r) {
      visited.push(node);
      return st.tree[node];
    }
    const mid = Math.floor((start + end) / 2);
    const left  = query(2 * node,     start, mid);
    const right = query(2 * node + 1, mid + 1, end);
    visited.push(node);
    return combine(left, right, st.mode);
  }

  const result = query(1, 0, st.n - 1);
  return { result, visited };
}

// ── Point Update ──────────────────────────────────────────────────────────────
// Returns { newSt, updatedNodes }
function updateTree(
  st: SegTree, idx: number, newVal: number
): { newSt: SegTree; updatedNodes: number[] } {
  const tree       = [...st.tree];
  const data       = [...st.data];
  const updated: number[] = [];
  data[idx] = newVal;

  function update(node: number, start: number, end: number) {
    updated.push(node);
    if (start === end) {
      tree[node] = newVal;
      return;
    }
    const mid = Math.floor((start + end) / 2);
    if (idx <= mid) update(2 * node,     start, mid);
    else            update(2 * node + 1, mid + 1, end);
    tree[node] = combine(tree[2 * node], tree[2 * node + 1], st.mode);
  }

  update(1, 0, st.n - 1);
  return { newSt: { ...st, tree, data }, updatedNodes: updated };
}

// ── Node metadata (range each node covers) ────────────────────────────────────
interface NodeMeta {
  node:  number;  // 1-indexed node id
  start: number;  // range start (0-indexed into data)
  end:   number;  // range end
  depth: number;
  x:     number;  // layout x (0..1 normalized)
  y:     number;  // layout y (depth * row height)
}

function buildMeta(n: number): NodeMeta[] {
  const metas: NodeMeta[] = [];

  function recurse(
    node: number, start: number, end: number,
    depth: number, lo: number, hi: number
  ) {
    const x = (lo + hi) / 2;
    metas.push({ node, start, end, depth, x, y: depth });
    if (start === end) return;
    const mid = Math.floor((start + end) / 2);
    const xmid = (lo + hi) / 2;
    recurse(2 * node,     start,   mid,   depth + 1, lo,   xmid);
    recurse(2 * node + 1, mid + 1, end,   depth + 1, xmid, hi);
  }

  recurse(1, 0, n - 1, 0, 0, 1);
  return metas;
}
// ─────────────────────────────────────────────────────────────────────────────
// SegTreeSVG — renders the segment tree
// ─────────────────────────────────────────────────────────────────────────────
interface SegTreeSVGProps {
    st:              SegTree;
    visitedNodes?:   number[];   // query path
    updatedNodes?:   number[];   // update path
    svgW?:           number;
    svgH?:           number;
    onNodeClick?:    (meta: NodeMeta) => void;
  }
  
  const ROW_H   = 80;
  const NODE_R  = 24;
  
  function SegTreeSVG({
    st,
    visitedNodes  = [],
    updatedNodes  = [],
    svgW          = 720,
    svgH          = 340,
    onNodeClick,
  }: SegTreeSVGProps) {
    const metas = useMemo(() => buildMeta(st.n), [st.n]);
  
    // Build parent map for edge drawing
    const edges: Array<[NodeMeta, NodeMeta]> = [];
    for (const m of metas) {
      const leftChild  = metas.find(x => x.node === 2 * m.node);
      const rightChild = metas.find(x => x.node === 2 * m.node + 1);
      if (leftChild)  edges.push([m, leftChild]);
      if (rightChild) edges.push([m, rightChild]);
    }
  
    const px = (x: number) => x * svgW;
    const py = (d: number) => 44 + d * ROW_H;
  
    return (
      <svg width="100%" viewBox={`0 0 ${svgW} ${svgH}`} className="overflow-visible">
        {/* Edges */}
        {edges.map(([p, c], i) => (
          <line key={`e-${i}`}
            x1={px(p.x)} y1={py(p.depth) + NODE_R}
            x2={px(c.x)} y2={py(c.depth) - NODE_R}
            stroke="hsl(var(--border))" strokeWidth={1.5}
          />
        ))}
  
        {/* Nodes */}
        {metas.map(m => {
          const val       = st.tree[m.node] ?? 0;
          const isVisited = visitedNodes.includes(m.node);
          const isUpdated = updatedNodes.includes(m.node);
          const isLeaf    = m.start === m.end;
  
          const fill   = isUpdated ? "#f59e0b33"
                       : isVisited ? (st.mode === "sum" ? "#3b82f633" : "#22c55e33")
                       : isLeaf    ? "hsl(var(--card))"
                       :             "hsl(var(--secondary))";
  
          const stroke = isUpdated ? "#f59e0b"
                       : isVisited ? (st.mode === "sum" ? "#3b82f6" : "#22c55e")
                       : isLeaf    ? "hsl(var(--border))"
                       :             "hsl(var(--border))";
  
          return (
            <g key={`n-${m.node}`}
              transform={`translate(${px(m.x)}, ${py(m.depth)})`}
              onClick={() => onNodeClick?.(m)}
              style={{ cursor: onNodeClick ? "pointer" : "default" }}
            >
              {/* Pulse ring for visited */}
              {(isVisited || isUpdated) && (
                <circle r={NODE_R + 6} fill="none"
                  stroke={isUpdated ? "#f59e0b" : st.mode === "sum" ? "#3b82f6" : "#22c55e"}
                  strokeWidth={1.5} opacity={0.3}
                  className="animate-ping"
                />
              )}
  
              <circle r={NODE_R}
                fill={fill} stroke={stroke} strokeWidth={isVisited || isUpdated ? 2.5 : 1.5}
                className="transition-all duration-300"
              />
  
              {/* Value */}
              <text textAnchor="middle" dy={5}
                fontSize={13} fontWeight="bold"
                fill="hsl(var(--foreground))">
                {val === Infinity ? "∞" : val}
              </text>
  
              {/* Range label below */}
              <text textAnchor="middle" dy={NODE_R + 14}
                fontSize={9} fill="hsl(var(--muted-foreground))">
                [{m.start}–{m.end}]
              </text>
            </g>
          );
        })}
      </svg>
    );
  }
  // ─────────────────────────────────────────────────────────────────────────────
// CrystalArray — horizontal array visualization
// ─────────────────────────────────────────────────────────────────────────────
function CrystalArray({
    data,
    highlightRange,
    updateIdx,
    mode = "sum",
  }: {
    data:            number[];
    highlightRange?: [number, number];
    updateIdx?:      number;
    mode?:           Mode;
  }) {
    return (
      <div className="flex gap-2 justify-center flex-wrap">
        {data.map((v, i) => {
          const inRange = highlightRange
            ? i >= highlightRange[0] && i <= highlightRange[1]
            : false;
          const isUpd = updateIdx === i;
  
          return (
            <div key={i} className="flex flex-col items-center gap-1">
              <div
                className={`w-12 h-12 rounded-xl border-2 flex items-center justify-center
                            text-sm font-bold font-mono transition-all duration-300
                  ${isUpd  ? "border-yellow-500 bg-yellow-500/20 text-yellow-600 dark:text-yellow-400 scale-110"
                  : inRange
                    ? mode === "sum"
                      ? "border-blue-500 bg-blue-500/15 text-blue-600 dark:text-blue-400 scale-105"
                      : "border-green-500 bg-green-500/15 text-green-600 dark:text-green-400 scale-105"
                    : "border-border bg-card hover:scale-105"
                  }`}
              >
                {v}
              </div>
              <span className="text-[10px] text-muted-foreground font-mono">[{i}]</span>
            </div>
          );
        })}
      </div>
    );
  }
  export function SegmentTreeSim() {

    // ── Build initial segment tree ────────────────────────────────────────────
    const INITIAL_ST = useMemo(() => buildTree(INITIAL_ARRAY, "sum"), []);
  
    const game = useSimGame(TOTAL_STAGES, () => {
      setSt(buildTree(INITIAL_ARRAY, "sum"));
      setMode("sum");
      setBuildSteps(0);
      setManualNodes([]);
      setQueryL(1); setQueryR(4);
      setQueryRun(false); setQueryResult(null); setQueryVisited([]);
      setUpdateIdx(2); setUpdateVal(""); setUpdateDone(false); setUpdatePath([]);
      setRequerDone(false);
      setRmqQueryRun(false); setRmqVisited([]);
      setQ1(null); setQ2(null); setQ3(null);
      setBossStep(0); setBossResults([]);
    });
  
    const [st,   setSt]   = useState<SegTree>(INITIAL_ST);
    const [mode, setMode] = useState<Mode>("sum");
  
    // Stage 2 — tree building
    const [buildSteps,  setBuildSteps]  = useState(0);   // 0..3 reveal stages
    const [manualNodes, setManualNodes] = useState<number[]>([]); // nodes user has "filled"
  
    // Stage 3 — range query
    const [queryL,       setQueryL]       = useState(1);
    const [queryR,       setQueryR]       = useState(4);
    const [queryRun,     setQueryRun]     = useState(false);
    const [queryResult,  setQueryResult]  = useState<number | null>(null);
    const [queryVisited, setQueryVisited] = useState<number[]>([]);
  
    // Stage 5 — point update
    const [updateIdx,  setUpdateIdx]  = useState(2);
    const [updateVal,  setUpdateVal]  = useState("");
    const [updateDone, setUpdateDone] = useState(false);
    const [updatePath, setUpdatePath] = useState<number[]>([]);
  
    // Stage 6 — re-query
    const [requerDone, setRequerDone] = useState(false);
  
    // Stage 7 — RMQ
    const [rmqQueryRun,  setRmqQueryRun]  = useState(false);
    const [rmqVisited,   setRmqVisited]   = useState<number[]>([]);
  
    // Quizzes
    const [q1, setQ1] = useState<string | null>(null);
    const [q2, setQ2] = useState<string | null>(null);
    const [q3, setQ3] = useState<string | null>(null);
  
    // Stage 9 — final boss
    const BOSS_OPS = [
      { type: "query", l: 1, r: 4, label: "Query sum [1–4]",    answer: 35 },
      { type: "update", idx: 3, val: 20, label: "Update index 3 → 20" },
      { type: "query", l: 2, r: 5, label: "Query sum [2–5]",    answer: 50 },
      { type: "query-min", l: 0, r: 3, label: "RMQ min [0–3]",  answer: 1  },
    ] as const;
    const [bossStep,    setBossStep]    = useState(0);
    const [bossResults, setBossResults] = useState<string[]>([]);
    const [bossSt,      setBossSt]      = useState<SegTree>(INITIAL_ST);
    const renderStage1 = () => {
        const bruteSum = INITIAL_ARRAY.slice(1, 5).reduce((a, b) => a + b, 0);
    
        return (
          <StageWrapper>
            <div className="text-center mb-6 max-w-xl">
              <div className="text-5xl mb-3">💎</div>
              <h2 className="text-3xl font-bold text-primary mb-2">The Data Kingdom</h2>
              <p className="text-muted-foreground leading-relaxed">
                Six magical crystals power the kingdom. But every query forces the King's
                soldiers to check <strong>every crystal manually</strong> — O(n) per question.
                You must build a <strong>Segment Tree</strong> to answer in O(log n).
              </p>
            </div>
    
            {/* Crystal array */}
            <div className="w-full max-w-lg border border-border rounded-xl p-5 bg-card mb-6">
              <p className="text-xs font-bold text-muted-foreground text-center mb-4">
                Kingdom Crystals — Array [0..5]
              </p>
              <CrystalArray data={INITIAL_ARRAY} highlightRange={[1, 4]} />
              <div className="mt-4 text-center text-xs text-muted-foreground">
                Hover range [1–4] highlighted in blue
              </div>
            </div>
    
            {/* Brute force demo */}
            <div className="w-full max-w-md bg-red-500/5 border border-red-400/30 rounded-xl p-4 mb-6">
              <p className="text-xs font-bold text-red-400 mb-2">😰 Brute Force: sum of [1–4]</p>
              <div className="flex items-center gap-2 flex-wrap text-sm font-mono">
                {INITIAL_ARRAY.slice(1, 5).map((v, i) => (
                  <span key={i} className="flex items-center gap-1">
                    <span className="text-primary">{v}</span>
                    {i < 3 && <span className="text-muted-foreground">+</span>}
                  </span>
                ))}
                <span className="text-muted-foreground">=</span>
                <span className="font-bold text-primary">{bruteSum}</span>
              </div>
              <p className="text-[10px] text-red-400 mt-2">
                Checked 4 elements. With 1M elements? 1M checks every query!
              </p>
            </div>
    
            <button
              onClick={() => { game.addXp(50, "Crystal Awakener"); game.nextStage(); }}
              className="px-8 py-3 bg-primary text-primary-foreground font-bold rounded-xl
                         flex items-center gap-2 hover:opacity-90"
            >
              🏗️ Build the Guardian Tree <ChevronRight className="size-4" />
            </button>
          </StageWrapper>
        );
      };
      const renderStage2 = () => {
        // Reveal tree level by level: 0=nothing, 1=leaves, 2=level2, 3=root
        const metas  = buildMeta(st.n);
        const maxD   = Math.max(...metas.map(m => m.depth));
    
        // Which node IDs are visible at current buildSteps
        const visibleDepths = new Set(
          Array.from({ length: buildSteps + 1 }, (_, i) => maxD - i)
        );
        const visibleNodes = new Set(
          metas.filter(m => visibleDepths.has(m.depth)).map(m => m.node)
        );
    
        const allVisible = buildSteps >= maxD;
    
        return (
          <StageWrapper>
            <div className="text-center mb-4 max-w-lg">
              <h3 className="text-xl font-bold text-primary mb-1">🏗️ Building the Guardian Tree</h3>
              <p className="text-muted-foreground text-sm">
                Leaves rise from crystals. Parent nodes <strong>combine</strong> their children's values.
                Click "Build Next Level" to watch the tree grow bottom-up.
              </p>
            </div>
    
            {/* Crystal array */}
            <div className="mb-6">
              <CrystalArray data={st.data} />
            </div>
    
            {/* Partial tree — we show a custom simplified view */}
            <div className="w-full max-w-2xl border border-border rounded-xl p-4 bg-card mb-6 overflow-x-auto">
              <svg width="100%" viewBox="0 0 720 320" className="overflow-visible">
                {/* Draw edges for visible nodes */}
                {metas.map(m => {
                  const lc = metas.find(x => x.node === 2 * m.node);
                  const rc = metas.find(x => x.node === 2 * m.node + 1);
                  if (!visibleNodes.has(m.node)) return null;
                  return [lc, rc].map((c, ci) => {
                    if (!c || !visibleNodes.has(c.node)) return null;
                    return (
                      <line key={`e-${m.node}-${ci}`}
                        x1={m.x * 720} y1={44 + m.depth * ROW_H + NODE_R}
                        x2={c.x  * 720} y2={44 + c.depth  * ROW_H - NODE_R}
                        stroke="hsl(var(--border))" strokeWidth={1.5}
                      />
                    );
                  });
                })}
    
                {/* Draw visible nodes */}
                {metas.map(m => {
                  if (!visibleNodes.has(m.node)) return null;
                  const isLeaf = m.start === m.end;
                  const val    = st.tree[m.node];
                  const isNew  = visibleDepths.has(m.depth) &&
                                 (maxD - buildSteps) === m.depth;
    
                  return (
                    <g key={`n-${m.node}`}
                      transform={`translate(${m.x * 720}, ${44 + m.depth * ROW_H})`}
                      className={isNew ? "animate-in zoom-in" : ""}
                    >
                      <circle r={NODE_R}
                        fill={isLeaf ? "hsl(var(--card))" : "hsl(var(--secondary))"}
                        stroke={isNew ? "hsl(var(--primary))" : "hsl(var(--border))"}
                        strokeWidth={isNew ? 2.5 : 1.5}
                      />
                      <text textAnchor="middle" dy={5}
                        fontSize={13} fontWeight="bold"
                        fill="hsl(var(--foreground))">
                        {val}
                      </text>
                      <text textAnchor="middle" dy={NODE_R + 14}
                        fontSize={9} fill="hsl(var(--muted-foreground))">
                        [{m.start}–{m.end}]
                      </text>
                    </g>
                  );
                })}
              </svg>
            </div>
    
            {/* Build cost */}
            <div className="flex gap-4 mb-6 text-xs">
              <div className="bg-secondary/40 px-3 py-2 rounded-lg border border-border">
                Nodes built: <strong>{visibleNodes.size} / {metas.length}</strong>
              </div>
              <div className="bg-secondary/40 px-3 py-2 rounded-lg border border-border">
                Build cost: <strong>O(n) = O({st.n})</strong>
              </div>
            </div>
    
            {!allVisible ? (
              <button
                onClick={() => setBuildSteps(s => s + 1)}
                className="px-8 py-3 bg-primary text-primary-foreground font-bold rounded-xl
                           flex items-center gap-2"
              >
                <Zap className="size-4" /> Build Next Level
              </button>
            ) : (
              <button
                onClick={() => { game.addXp(100, "Tree Builder"); game.nextStage(); }}
                className="px-8 py-3 bg-primary text-primary-foreground font-bold rounded-xl animate-in zoom-in"
              >
                Query Quest → 🔍
              </button>
            )}
          </StageWrapper>
        );
      };
      const renderStage3 = () => {
        const runQuery = () => {
          const { result, visited } = queryTree(st, queryL, queryR);
          setQueryResult(result);
          setQueryVisited(visited);
          setQueryRun(true);
          game.addXp(80, "Query Master");
        };
    
        return (
          <StageWrapper>
            <div className="text-center mb-4 max-w-lg">
              <h3 className="text-xl font-bold text-primary mb-1">🔍 The Query Quest</h3>
              <p className="text-muted-foreground text-sm">
                Choose a range and watch the tree light up <strong>only</strong> the nodes
                it needs. No full traversal — only overlapping segments!
              </p>
            </div>
    
            {/* Range selector */}
            <div className="flex items-center gap-4 mb-4 flex-wrap justify-center">
              <div className="flex items-center gap-2">
                <label className="text-sm font-semibold">L:</label>
                <select value={queryL}
                  onChange={e => { setQueryL(Number(e.target.value)); setQueryRun(false); setQueryResult(null); setQueryVisited([]); }}
                  className="px-3 py-1.5 border border-border rounded-lg bg-background text-sm font-mono"
                >
                  {INITIAL_ARRAY.map((_, i) => <option key={i} value={i}>{i}</option>)}
                </select>
              </div>
              <div className="flex items-center gap-2">
                <label className="text-sm font-semibold">R:</label>
                <select value={queryR}
                  onChange={e => { setQueryR(Number(e.target.value)); setQueryRun(false); setQueryResult(null); setQueryVisited([]); }}
                  className="px-3 py-1.5 border border-border rounded-lg bg-background text-sm font-mono"
                >
                  {INITIAL_ARRAY.map((_, i) => <option key={i} value={i}>{i}</option>)}
                </select>
              </div>
              <button onClick={runQuery}
                className="px-5 py-2 bg-primary text-primary-foreground font-bold rounded-lg text-sm
                           flex items-center gap-1">
                <Zap className="size-3.5" /> Run Query
              </button>
            </div>
    
            {/* Crystal array with highlight */}
            <div className="mb-4">
              <CrystalArray data={st.data}
                highlightRange={[Math.min(queryL, queryR), Math.max(queryL, queryR)]}
              />
            </div>
    
            {/* Tree with visited nodes */}
            <div className="w-full max-w-2xl border border-border rounded-xl p-4 bg-card mb-4">
              <SegTreeSVG st={st} visitedNodes={queryVisited} svgH={300} />
            </div>
    
            {/* Result */}
            {queryRun && queryResult !== null && (
              <div className="flex items-center gap-4 mb-6 animate-in fade-in">
                <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl px-6 py-3 text-center">
                  <div className="text-xs text-muted-foreground mb-1">
                    Sum [{queryL}–{queryR}]
                  </div>
                  <div className="text-2xl font-bold text-blue-500">{queryResult}</div>
                </div>
                <div className="bg-secondary/30 border border-border rounded-xl px-4 py-3 text-center">
                  <div className="text-xs text-muted-foreground mb-1">Nodes visited</div>
                  <div className="text-xl font-bold">{queryVisited.length}</div>
                </div>
                <div className="bg-secondary/30 border border-border rounded-xl px-4 py-3 text-center">
                  <div className="text-xs text-muted-foreground mb-1">Complexity</div>
                  <div className="text-sm font-bold text-green-500">O(log {st.n})</div>
                </div>
              </div>
            )}
    
            {queryRun && (
              <button
                onClick={() => game.nextStage()}
                className="px-8 py-3 bg-primary text-primary-foreground font-bold rounded-xl animate-in zoom-in"
              >
                Mini Challenges → 🧩
              </button>
            )}
          </StageWrapper>
        );
      };
      const renderStage4 = () => {
        const q1c = q1 === "logn";
        const q2c = q2 === "leaf";
        const q3c = q3 === "path";
        const q1w = q1 !== null && !q1c;
        const q2w = q2 !== null && !q2c;
        const q3w = q3 !== null && !q3c;
        const allDone = q1c && q2c && q3c;
    
        return (
          <StageWrapper>
            <h3 className="text-2xl font-bold text-primary mb-2">🧩 Mini Challenges</h3>
            <p className="text-muted-foreground text-sm mb-8 max-w-md text-center">
              Test your understanding. Retake any you get wrong.
            </p>
    
            <div className="w-full max-w-lg space-y-4 mb-8">
              {/* Q1 */}
              <div>
                <QuizBlock
                  question="What is the time complexity of a range query on a Segment Tree with n elements?"
                  options={[
                    { label: "O(n) — visit all elements",       value: "n"    },
                    { label: "O(log n) — only overlapping segments", value: "logn" },
                    { label: "O(1) — precomputed instantly",    value: "one"  },
                    { label: "O(n log n) — sort then query",    value: "nlogn"},
                  ]}
                  correctValue="logn"
                  selectedValue={q1}
                  onSelect={setQ1}
                  correctFeedback="✅ Correct! At each level we visit at most 2 nodes → O(log n) total."
                  wrongFeedback="❌ The tree splits the problem at each level — only overlapping segments are visited."
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
                  question="In a Segment Tree built on array [1,3,5,7,9,11], which node stores the value 5?"
                  options={[
                    { label: "Root node [0–5]",     value: "root" },
                    { label: "Leaf node [2–2]",     value: "leaf" },
                    { label: "Internal node [0–2]", value: "int"  },
                    { label: "Node [1–2]",          value: "half" },
                  ]}
                  correctValue="leaf"
                  selectedValue={q2}
                  onSelect={setQ2}
                  correctFeedback="✅ Correct! Each leaf holds exactly one element — index 2 holds value 5."
                  wrongFeedback="❌ Single values live in leaf nodes. Internal nodes store combined values."
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
                  question="After updating index 2 from 5 to 10, which nodes must be recalculated?"
                  options={[
                    { label: "Only the leaf at index 2",      value: "only" },
                    { label: "All nodes in the tree",         value: "all"  },
                    { label: "The path from leaf to root",    value: "path" },
                    { label: "All leaves + the root",         value: "lvs"  },
                  ]}
                  correctValue="path"
                  selectedValue={q3}
                  onSelect={setQ3}
                  correctFeedback="✅ Correct! Only the leaf and its ancestors up to root are affected — O(log n)."
                  wrongFeedback="❌ Only the path from the changed leaf to root needs updating — not sibling subtrees."
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
              <span>Challenges solved:</span>
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
                className="px-10 py-3 bg-primary text-primary-foreground font-bold rounded-xl animate-in zoom-in text-lg"
              >
                Mutation Spell → ⚡
              </button>
            )}
          </StageWrapper>
        );
      };
      const renderStage5 = () => {
        const handleUpdate = () => {
          const v = parseInt(updateVal);
          if (isNaN(v)) { game.showMistake("Enter a valid number."); return; }
          const { newSt, updatedNodes } = updateTree(st, updateIdx, v);
          setSt(newSt);
          setUpdatePath(updatedNodes);
          setUpdateDone(true);
          game.addXp(100, "Update Wizard");
        };
    
        return (
          <StageWrapper>
            <div className="text-center mb-4 max-w-lg">
              <h3 className="text-xl font-bold text-primary mb-1">⚡ The Mutation Spell</h3>
              <p className="text-muted-foreground text-sm">
                Change one crystal's value. Only the <strong>path from leaf to root</strong>
                updates — O(log n) — not the entire tree!
              </p>
            </div>
    
            {/* Update controls */}
            <div className="flex items-center gap-4 mb-4 flex-wrap justify-center">
              <div className="flex items-center gap-2">
                <label className="text-sm font-semibold">Index:</label>
                <select value={updateIdx}
                  onChange={e => { setUpdateIdx(Number(e.target.value)); setUpdateDone(false); setUpdatePath([]); }}
                  className="px-3 py-1.5 border border-border rounded-lg bg-background text-sm font-mono"
                >
                  {st.data.map((_, i) => <option key={i} value={i}>[{i}] = {st.data[i]}</option>)}
                </select>
              </div>
              <div className="flex items-center gap-2">
                <label className="text-sm font-semibold">New value:</label>
                <input type="number" value={updateVal}
                  onChange={e => { setUpdateVal(e.target.value); setUpdateDone(false); setUpdatePath([]); }}
                  placeholder="e.g. 10"
                  className="px-3 py-1.5 border border-border rounded-lg bg-background text-sm font-mono w-24
                             focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
              </div>
              <button onClick={handleUpdate} disabled={updateDone}
                className={`px-5 py-2 font-bold rounded-lg text-sm flex items-center gap-1 transition-all
                  ${updateDone
                    ? "bg-muted text-muted-foreground cursor-not-allowed"
                    : "bg-yellow-500 text-white hover:bg-yellow-600"
                  }`}
              >
                <Zap className="size-3.5" /> Cast Mutation
              </button>
            </div>
    
            {/* Crystal array */}
            <div className="mb-4">
              <CrystalArray data={st.data}
                updateIdx={updateDone ? updateIdx : undefined}
              />
            </div>
    
            {/* Tree with update path */}
            <div className="w-full max-w-2xl border border-border rounded-xl p-4 bg-card mb-4">
              <p className="text-xs text-center text-muted-foreground mb-2">
                {updateDone
                  ? `⚡ ${updatePath.length} nodes updated (highlighted in orange) — O(log n)`
                  : "Tree awaits mutation spell..."
                }
              </p>
              <SegTreeSVG st={st} updatedNodes={updatePath} svgH={300} />
            </div>
    
            {/* Before / after comparison */}
            {updateDone && (
              <div className="flex gap-4 mb-6 animate-in fade-in text-xs">
                <div className="bg-secondary/30 px-4 py-2 rounded-xl border border-border text-center">
                  <div className="text-muted-foreground mb-1">Nodes updated</div>
                  <div className="font-bold text-yellow-500">{updatePath.length}</div>
                </div>
                <div className="bg-secondary/30 px-4 py-2 rounded-xl border border-border text-center">
                  <div className="text-muted-foreground mb-1">Nodes skipped</div>
                  <div className="font-bold text-green-500">
                    {buildMeta(st.n).length - updatePath.length}
                  </div>
                </div>
                <div className="bg-secondary/30 px-4 py-2 rounded-xl border border-border text-center">
                  <div className="text-muted-foreground mb-1">Complexity</div>
                  <div className="font-bold text-green-500">O(log {st.n})</div>
                </div>
              </div>
            )}
    
            {updateDone && (
              <button
                onClick={() => game.nextStage()}
                className="px-8 py-3 bg-primary text-primary-foreground font-bold rounded-xl animate-in zoom-in"
              >
                Re-query Kingdom → 🎯
              </button>
            )}
          </StageWrapper>
        );
      };
      const renderStage6 = () => {
        const { result, visited } = queryTree(st, 1, 4);
    
        return (
          <StageWrapper>
            <div className="text-center mb-4 max-w-lg">
              <h3 className="text-xl font-bold text-primary mb-1">🎯 Re-query the Kingdom</h3>
              <p className="text-muted-foreground text-sm">
                Run the same query [1–4] again. The updated values automatically
                reflect in the result — no rebuild needed!
              </p>
            </div>
    
            {/* Updated array */}
            <div className="mb-4">
              <CrystalArray data={st.data} highlightRange={[1, 4]} />
            </div>
    
            {/* Tree */}
            <div className="w-full max-w-2xl border border-border rounded-xl p-4 bg-card mb-4">
              <SegTreeSVG st={st}
                visitedNodes={requerDone ? visited : []}
                svgH={300}
              />
            </div>
    
            {/* Result */}
            {requerDone && (
              <div className="flex items-center gap-4 mb-6 animate-in fade-in">
                <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl px-6 py-3 text-center">
                  <div className="text-xs text-muted-foreground mb-1">New Sum [1–4]</div>
                  <div className="text-2xl font-bold text-blue-500">{result}</div>
                </div>
                <div className="text-sm text-muted-foreground max-w-xs">
                  The tree auto-reflects the update. No rebuild — just query straight through.
                </div>
              </div>
            )}
    
            {!requerDone ? (
              <button
                onClick={() => { setRequerDone(true); game.addXp(70, "Re-query Expert"); }}
                className="px-8 py-3 bg-primary text-primary-foreground font-bold rounded-xl"
              >
                <Zap className="size-4 inline mr-2" /> Run Query [1–4]
              </button>
            ) : (
              <button
                onClick={() => game.nextStage()}
                className="px-8 py-3 bg-primary text-primary-foreground font-bold rounded-xl animate-in zoom-in"
              >
                Shape-Shifting Tree → 🌿
              </button>
            )}
          </StageWrapper>
        );
      };
      const renderStage7 = () => {
        const handleModeSwitch = (newMode: Mode) => {
          const newSt = buildTree(st.data, newMode);
          setSt(newSt);
          setMode(newMode);
          setRmqQueryRun(false);
          setRmqVisited([]);
        };
    
        const runRmq = () => {
          const { result, visited } = queryTree(st, 0, 3);
          setRmqVisited(visited);
          setRmqQueryRun(true);
          game.addXp(80, "RMQ Specialist");
        };
    
        const rmqResult = rmqQueryRun ? queryTree(st, 0, 3).result : null;
    
        return (
          <StageWrapper>
            <div className="text-center mb-4 max-w-lg">
              <h3 className="text-xl font-bold text-primary mb-1">🌿 Shape-Shifting Tree (RMQ)</h3>
              <p className="text-muted-foreground text-sm">
                The same tree structure works for <strong>Range Minimum Query</strong>.
                Just swap the combine operation from + to min().
                Toggle below and watch the values transform!
              </p>
            </div>
    
            {/* Mode toggle */}
            <div className="flex gap-3 mb-6">
              {(["sum", "min"] as Mode[]).map(m => (
                <button key={m}
                  onClick={() => handleModeSwitch(m)}
                  className={`px-6 py-2.5 rounded-xl border-2 font-bold text-sm transition-all
                    ${mode === m
                      ? m === "sum"
                        ? "bg-blue-500 text-white border-blue-500"
                        : "bg-green-500 text-white border-green-500"
                      : "border-border hover:bg-secondary"
                    }`}
                >
                  {m === "sum" ? "Σ SUM Mode" : "MIN Mode"}
                </button>
              ))}
            </div>
    
            {/* Mode explanation */}
            <div className={`w-full max-w-md rounded-xl p-3 text-xs text-center mb-4 transition-all
              ${mode === "sum"
                ? "bg-blue-500/10 border border-blue-500/30 text-blue-600 dark:text-blue-400"
                : "bg-green-500/10 border border-green-500/30 text-green-600 dark:text-green-400"
              }`}
            >
              {mode === "sum"
                ? "combine(a, b) = a + b → parent = sum of children"
                : "combine(a, b) = min(a, b) → parent = minimum of children"
              }
            </div>
    
            {/* Tree */}
            <div className="w-full max-w-2xl border border-border rounded-xl p-4 bg-card mb-4">
              <SegTreeSVG st={st}
                visitedNodes={rmqQueryRun ? rmqVisited : []}
                svgH={300}
              />
            </div>
    
            {/* RMQ query */}
            {mode === "min" && (
              <div className="flex flex-col items-center gap-4 mb-4">
                <button onClick={runRmq} disabled={rmqQueryRun}
                  className={`px-6 py-2.5 font-bold rounded-xl text-sm flex items-center gap-2
                    ${rmqQueryRun
                      ? "bg-muted text-muted-foreground cursor-not-allowed"
                      : "bg-green-500 text-white hover:bg-green-600"
                    }`}
                >
                  <Zap className="size-4" /> Run Min Query [0–3]
                </button>
                {rmqQueryRun && rmqResult !== null && (
                  <div className="bg-green-500/10 border border-green-500/30 rounded-xl px-6 py-3 text-center animate-in fade-in">
                    <div className="text-xs text-muted-foreground mb-1">Minimum of [0–3]</div>
                    <div className="text-2xl font-bold text-green-500">{rmqResult}</div>
                  </div>
                )}
              </div>
            )}
    
            {rmqQueryRun && (
              <button
                onClick={() => game.nextStage()}
                className="px-8 py-3 bg-primary text-primary-foreground font-bold rounded-xl animate-in zoom-in"
              >
                Performance Arena → 📊
              </button>
            )}
    
            {mode === "sum" && !rmqQueryRun && (
              <button
                onClick={() => game.nextStage()}
                className="px-6 py-2 border border-border rounded-xl text-sm hover:bg-secondary"
              >
                Skip to Performance →
              </button>
            )}
          </StageWrapper>
        );
      };
      const renderStage8 = () => (
        <StageWrapper>
          <div className="text-center mb-6 max-w-lg">
            <h3 className="text-xl font-bold text-primary mb-1">📊 Performance Arena</h3>
            <p className="text-muted-foreground text-sm">
              See exactly why Segment Trees dominate for repeated queries and updates.
            </p>
          </div>
    
          {/* Comparison table */}
          <div className="w-full max-w-xl border border-border rounded-xl overflow-hidden mb-8">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-muted">
                  <th className="px-4 py-3 text-left font-bold">Operation</th>
                  <th className="px-4 py-3 text-center font-bold text-red-500">Brute Force</th>
                  <th className="px-4 py-3 text-center font-bold text-green-500">Segment Tree</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["Build",        "—",         "O(n)"],
                  ["Range Query",  "O(n)",      "O(log n)"],
                  ["Point Update", "O(1)",      "O(log n)"],
                  ["Space",        "O(n)",      "O(4n) ≈ O(n)"],
                  ["RMQ / RSQ",    "O(n) each", "O(log n) same code"],
                ].map(([op, bf, st], i) => (
                  <tr key={i} className="border-t border-border">
                    <td className="px-4 py-2.5 font-semibold">{op}</td>
                    <td className="px-4 py-2.5 text-center text-red-500 font-mono text-xs">{bf}</td>
                    <td className="px-4 py-2.5 text-center text-green-500 font-mono text-xs">{st}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
    
          {/* Visual bars for query cost */}
          <div className="w-full max-w-md mb-8">
            <p className="text-xs font-bold text-muted-foreground mb-3 uppercase tracking-wider">
              Range Query Cost — n = 1,000,000
            </p>
            <div className="space-y-3">
              {[
                { label: "Brute Force", steps: 1000000, color: "bg-red-500",   display: "1,000,000 comparisons" },
                { label: "Seg Tree",    steps: 20,       color: "bg-green-500", display: "~20 comparisons (log₂ 1M)" },
              ].map(row => (
                <div key={row.label}>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="font-semibold">{row.label}</span>
                    <span className="text-muted-foreground">{row.display}</span>
                  </div>
                  <div className="h-5 bg-muted rounded-full overflow-hidden">
                    <div
                      className={`h-full ${row.color} rounded-full transition-all duration-1000`}
                      style={{ width: row.label === "Brute Force" ? "100%" : "2%" }}
                    />
                  </div>
                </div>
              ))}
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
      const renderStage9 = () => {
        const op = BOSS_OPS[bossStep];
        const allDone = bossStep >= BOSS_OPS.length;
    
        const executeBossOp = () => {
          if (!op) return;
    
          if (op.type === "query") {
            const { result } = queryTree(bossSt, op.l, op.r);
            setBossResults(r => [...r,
              `Sum [${op.l}–${op.r}] = ${result} ${result === op.answer ? "✅" : "❌"}`
            ]);
            game.addXp(80, `Query [${op.l}–${op.r}]`);
    
          } else if (op.type === "update") {
            const { newSt } = updateTree(bossSt, op.idx, op.val);
            setBossSt(newSt);
            setBossResults(r => [...r, `Updated index ${op.idx} → ${op.val} ✅`]);
            game.addXp(60, `Update[${op.idx}]`);
    
          } else if (op.type === "query-min") {
            const minSt = buildTree(bossSt.data, "min");
            const { result } = queryTree(minSt, op.l, op.r);
            setBossResults(r => [...r,
              `Min [${op.l}–${op.r}] = ${result} ${result === op.answer ? "✅" : "❌"}`
            ]);
            game.addXp(80, `RMQ [${op.l}–${op.r}]`);
          }
    
          setBossStep(s => s + 1);
        };
    
        return (
          <StageWrapper>
            <h3 className="text-2xl font-bold text-primary mb-2 flex items-center gap-2">
              <Swords className="size-6 text-red-500" /> Defend the Kingdom
            </h3>
            <p className="text-muted-foreground text-sm mb-6 max-w-md text-center">
              Four incoming attacks — queries and updates. Execute each operation
              to defend the kingdom!
            </p>
    
            {/* Live array */}
            <div className="mb-4">
              <CrystalArray data={bossSt.data} />
            </div>
    
            {/* Operation queue */}
            <div className="w-full max-w-lg space-y-2 mb-6">
              {BOSS_OPS.map((o, i) => {
                const done   = i < bossStep;
                const active = i === bossStep;
                return (
                  <div key={i}
                    className={`flex items-center gap-4 p-3 rounded-xl border-2 transition-all
                      ${done   ? "border-green-500/40 bg-green-500/5"
                      : active ? "border-primary/50 bg-primary/5 shadow-md"
                      :          "border-border opacity-40"
                      }`}
                  >
                    <div className={`size-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0
                      ${done ? "bg-green-500 text-white" : active ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}>
                      {done ? "✓" : i + 1}
                    </div>
                    <div className="flex-1 text-sm font-semibold">{o.label}</div>
                    {active && (
                      <button onClick={executeBossOp}
                        className="px-4 py-1.5 bg-primary text-primary-foreground text-xs font-bold rounded-lg">
                        Execute ⚡
                      </button>
                    )}
                    {done && bossResults[i] && (
                      <span className="text-xs text-green-500 font-mono">{bossResults[i]}</span>
                    )}
                  </div>
                );
              })}
            </div>
    
            {allDone && (
              <button
                onClick={() => { game.addXp(300, "Kingdom Defender"); game.nextStage(); }}
                className="px-10 py-3 bg-primary text-primary-foreground font-bold rounded-xl
                           animate-in zoom-in text-lg"
              >
                👑 Claim Guardian Title
              </button>
            )}
          </StageWrapper>
        );
      };
      const renderStage10 = () => (
        <CompletionScreen
          missionTitle="Kingdom Defended! 💎"
          missionSubtitle="You built a Segment Tree from scratch and used it to answer queries in O(log n)."
          xp={game.xp}
          xpLog={game.xpLog}
          achievements={[
            { icon: <span>🏗️</span>, label: "Tree Builder"      },
            { icon: <span>🔍</span>, label: "Query Master"      },
            { icon: <span>⚡</span>, label: "Update Wizard"     },
            { icon: <span>🌿</span>, label: "RMQ Specialist"    },
            { icon: <span>👑</span>, label: "Segment Guardian"  },
          ]}
          concepts={[
            { label: "Build",          description: "O(n) — each of 2n-1 nodes computed once bottom-up." },
            { label: "Range Query",    description: "O(log n) — at most 2 nodes visited per tree level." },
            { label: "Point Update",   description: "O(log n) — only the leaf-to-root path is recalculated." },
            { label: "RMQ Extension",  description: "Same structure — just swap combine(a,b) from + to min()." },
            { label: "Space",          description: "O(4n) array stores the full tree — no pointers needed." },
            { label: "Why it works",   description: "Divide & conquer: each node owns a non-overlapping range segment." },
          ]}
          onReset={game.reset}
        />
      );
      return (
        <SimShell
          title="Segment Tree Guardian"
          subtitle="Data Structures Lab — Segment Tree"
          xp={game.xp}
          stage={game.stage}
          totalStages={TOTAL_STAGES}
          mistakeMessage={game.mistakeMessage}
          successMessage={game.successMessage}
          icon={<span className="text-lg">💎</span>}
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