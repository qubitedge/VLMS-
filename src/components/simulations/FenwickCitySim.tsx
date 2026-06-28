import { useState } from "react";
import { Zap, Binary, Network, Search, GitCompare, RefreshCw, Trophy} from "lucide-react";
import {
  useSimGame,
  SimShell,
  StageWrapper,
  QuizBlock,
  CompletionScreen,
} from "@/components/simulations/shared";

// ── Constants ─────────────────────────────────────────────────────────────────
const TOTAL_STAGES = 6;

const ARRAY = [1, 3, 5, 7, 9, 11]; // 1-indexed conceptually: index 1..6
const N = ARRAY.length;

// LSB = i & (-i)
const lsb = (i: number) => i & (-i);

// Build Fenwick Tree from array
function buildFenwick(arr: number[]): number[] {
  const tree = new Array(N + 1).fill(0);
  for (let i = 1; i <= N; i++) {
    tree[i] += arr[i - 1];
    const j = i + lsb(i);
    if (j <= N) tree[j] += tree[i];
  }
  return tree;
}

// Prefix sum query(i): sum of arr[1..i]
function fenwickQuery(tree: number[], i: number): { sum: number; path: number[] } {
  let sum = 0;
  const path: number[] = [];
  while (i > 0) {
    sum += tree[i];
    path.push(i);
    i -= lsb(i);
  }
  return { sum, path };
}

// Update: add delta to index i
function fenwickUpdatePath(i: number): number[] {
  const path: number[] = [];
  while (i <= N) {
    path.push(i);
    i += lsb(i);
  }
  return path;
}

const toBinary = (n: number) => n.toString(2).padStart(3, "0");
export function FenwickCitySim() {
    const game = useSimGame(TOTAL_STAGES, () => {
      setStorageMode("naive");
      setInspectedBuilding(null);
      setLsbIndex(null);
      setLsbAnswer(null);
      setBuildMode(null);
      setBuiltNodes(new Set());
      setQueryInput("");
      setQueryResult(null);
      setDroneStep(0);
      setRangeStep("query_r");
      setRangeRResult(null);
      setRangeLResult(null);
      setRangeFinal(null);
      setUpdatePath([]);
      setUpdateStep(0);
      setQuiz1Answer(null);
      setQuiz2Answer(null);
      setBossPhase("query4");
      setBossAnswers({ query4: null, range: null, update: null, requery: null });
    });
  
    // Stage 1
    const [storageMode, setStorageMode] = useState<"naive"|"smart">("naive");
    const [inspectedBuilding, setInspectedBuilding] = useState<number | null>(null);
  
    // Stage 2 — LSB
    const [lsbIndex, setLsbIndex]   = useState<number | null>(null);
    const [lsbAnswer, setLsbAnswer] = useState<string | null>(null);
  
    // Stage 3 — Build tree
    const [buildMode, setBuildMode]   = useState<"manual"|"auto"|null>(null);
    const [builtNodes, setBuiltNodes] = useState<Set<number>>(new Set());
  
    // Stage 4 — Prefix query
    const tree = buildFenwick(ARRAY);
    const [queryInput,  setQueryInput]  = useState("");
    const [queryResult, setQueryResult] = useState<{ sum: number; path: number[] } | null>(null);
    const [droneStep,   setDroneStep]   = useState(0);
  
    // Stage 5 — Range query
    const [rangeStep,    setRangeStep]    = useState<"query_r"|"query_l"|"subtract"|"done">("query_r");
    const [rangeRResult, setRangeRResult] = useState<number | null>(null);
    const [rangeLResult, setRangeLResult] = useState<number | null>(null);
    const [rangeFinal,   setRangeFinal]   = useState<number | null>(null);
  
    // Stage 6 — Update
    const [updatePath, setUpdatePath] = useState<number[]>([]);
    const [updateStep, setUpdateStep] = useState(0);
    const [quiz1Answer, setQuiz1Answer] = useState<string | null>(null);
    const [quiz2Answer, setQuiz2Answer] = useState<string | null>(null);
  
    // Boss
    const BOSS_ARRAY = [2, 4, 6, 8, 10, 12];
    const bossTree = buildFenwick(BOSS_ARRAY);
    const [bossPhase, setBossPhase] = useState<"query4"|"range"|"update"|"requery"|"done">("query4");
    const [bossAnswers, setBossAnswers] = useState<Record<string, string|null>>({
      query4: null, range: null, update: null, requery: null,
    });
    const renderStage1 = () => (
        <StageWrapper>
          <h2 className="text-3xl font-bold text-primary mb-2">🏙️ The Broken Grid</h2>
          <p className="text-muted-foreground mb-6 max-w-md text-center">
            Fenwick City stores energy inefficiently. Inspect each building, then discover a smarter storage system.
          </p>
      
          {/* Buildings row */}
          <div className="flex gap-2 mb-6">
            {ARRAY.map((val, i) => (
              <div
                key={i}
                onClick={() => setInspectedBuilding(i + 1)}
                className={`w-14 h-20 rounded-t-lg border-2 flex flex-col items-center justify-end pb-1 cursor-pointer transition-all
                  ${inspectedBuilding === i + 1 ? "border-primary bg-primary/10" : "border-muted-foreground/40 hover:border-primary/60"}`}
                style={{ height: `${50 + val * 6}px` }}
              >
                <span className="text-xs font-mono text-primary">{val}</span>
                <span className="text-[10px] text-muted-foreground">#{i + 1}</span>
              </div>
            ))}
          </div>
      
          {inspectedBuilding && (
            <p className="text-sm text-muted-foreground mb-4">
              Building #{inspectedBuilding} energy = <strong className="text-primary">{ARRAY[inspectedBuilding - 1]}</strong>
            </p>
          )}
      
          {/* Storage toggle */}
          <div className="flex gap-3 mb-6">
            {(["naive", "smart"] as const).map(mode => (
              <button
                key={mode}
                onClick={() => setStorageMode(mode)}
                className={`px-4 py-2 rounded-lg border text-sm transition-all
                  ${storageMode === mode ? "border-primary bg-primary/10 text-primary" : "border-muted-foreground"}`}
              >
                {mode === "naive" ? "🐌 Naive Storage" : "⚡ Smart Storage (Fenwick)"}
              </button>
            ))}
          </div>
      
          <div className="w-full max-w-sm p-4 bg-primary/5 border border-primary/20 rounded-xl mb-6 text-sm">
            {storageMode === "naive" ? (
              <p className="text-orange-400">⚠️ Naive: every range sum requires summing individual elements — O(n) per query.</p>
            ) : (
              <p className="text-green-400">✅ Smart: an underground network of partial sums enables O(log n) queries and updates.</p>
            )}
          </div>
      
          {storageMode === "smart" && (
            <button
              onClick={() => { game.addXp(50, "✨ Need for Optimization"); game.nextStage(); }}
              className="px-8 py-3 bg-primary text-primary-foreground font-bold rounded-xl flex items-center gap-2"
            >
              <Zap className="size-5" /> Discover the LSB Power →
            </button>
          )}
        </StageWrapper>
      );
      const renderStage2 = () => {
        const lsbVal = lsbIndex ? lsb(lsbIndex) : null;
        const isCorrect = lsbAnswer !== null && lsbIndex !== null && parseInt(lsbAnswer) === lsbVal;
      
        return (
          <StageWrapper>
            <h3 className="text-xl font-bold text-primary mb-2">💡 Discovering the LSB Power</h3>
            <p className="text-muted-foreground text-sm mb-6 max-w-md text-center">
              Each node's coverage is determined by its <strong>Least Significant Bit</strong>: <code>LSB(i) = i &amp; (-i)</code>
            </p>
      
            {/* Index selector */}
            <div className="flex gap-2 mb-6">
              {Array.from({ length: N }, (_, i) => i + 1).map(i => (
                <button
                  key={i}
                  onClick={() => { setLsbIndex(i); setLsbAnswer(null); }}
                  className={`w-12 h-12 rounded-lg border font-mono text-sm transition-all
                    ${lsbIndex === i ? "border-primary bg-primary/10 text-primary" : "border-muted-foreground hover:border-primary"}`}
                >
                  {i}
                </button>
              ))}
            </div>
      
            {lsbIndex !== null && (
              <>
                {/* Binary representation */}
                <div className="w-full max-w-xs bg-black/70 border border-primary/30 rounded-xl p-4 font-mono text-sm mb-4 text-center">
                  <p className="text-muted-foreground">Index {lsbIndex} in binary:</p>
                  <p className="text-2xl text-yellow-300 tracking-widest">{toBinary(lsbIndex)}</p>
                </div>
      
                {/* LSB question */}
                <p className="text-sm text-muted-foreground mb-3">What is LSB({lsbIndex})? (Hint: the rightmost set bit's value)</p>
                <div className="flex gap-2 mb-4 flex-wrap justify-center">
                  {[1, 2, 4, 8].map(v => (
                    <button
                      key={v}
                      onClick={() => setLsbAnswer(String(v))}
                      className={`px-4 py-2 rounded-lg border font-mono text-sm transition-all
                        ${lsbAnswer === String(v)
                          ? (v === lsbVal ? "border-green-500 bg-green-500/10 text-green-400" : "border-red-500 bg-red-500/10 text-red-400")
                          : "border-muted-foreground hover:border-primary"}`}
                    >
                      {v}
                    </button>
                  ))}
                </div>
      
                {lsbAnswer !== null && !isCorrect && (
                  <div className="flex flex-col items-center gap-2 mb-4">
                    <p className="text-red-400 text-sm">❌ Incorrect — find the rightmost '1' bit in {toBinary(lsbIndex)}.</p>
                    <button
                      onClick={() => setLsbAnswer(null)}
                      className="px-5 py-2 bg-red-500/20 border border-red-500/40 text-red-400 rounded-xl text-sm hover:bg-red-500/30 transition-all"
                    >
                      🔄 Try Again
                    </button>
                  </div>
                )}
      
                {isCorrect && (
                  <div className="w-full max-w-xs p-3 bg-green-500/10 border border-green-500/30 rounded-xl mb-4 text-center text-sm">
                    ✅ LSB({lsbIndex}) = {lsbVal} → Node {lsbIndex} covers a range of {lsbVal} element(s).
                  </div>
                )}
              </>
            )}
      
            {isCorrect && (
              <button
                onClick={() => { game.addXp(125, "🏆 LSB Master"); game.nextStage(); }}
                className="px-8 py-3 bg-primary text-primary-foreground font-bold rounded-xl"
              >
                🌐 Build the Underground Network →
              </button>
            )}
          </StageWrapper>
        );
      };
      const renderStage3 = () => {
        const allBuilt = builtNodes.size === N;
      
        const buildOneNode = () => {
          const next = builtNodes.size + 1;
          if (next <= N) setBuiltNodes(prev => new Set([...prev, next]));
        };
      
        const buildAll = () => {
          setBuiltNodes(new Set(Array.from({ length: N }, (_, i) => i + 1)));
        };
      
        return (
          <StageWrapper>
            <h3 className="text-xl font-bold text-primary mb-2">🌐 Building the Underground Network</h3>
            <p className="text-muted-foreground text-sm mb-6 max-w-md text-center">
              Each node stores a partial sum covering <code>LSB(i)</code> elements ending at index i.
            </p>
      
            {!buildMode && (
              <div className="flex gap-3 mb-6">
                <button onClick={() => setBuildMode("manual")} className="px-4 py-2 rounded-lg border border-primary/40 hover:border-primary text-sm">
                  🔧 Build via Updates (manual)
                </button>
                <button onClick={() => { setBuildMode("auto"); buildAll(); }} className="px-4 py-2 rounded-lg border border-primary/40 hover:border-primary text-sm">
                  ⚡ Fast Build (auto)
                </button>
              </div>
            )}
      
            {/* Tree node display */}
            {buildMode && (
              <div className="grid grid-cols-3 gap-3 w-full max-w-md mb-6">
                {Array.from({ length: N }, (_, idx) => {
                  const i = idx + 1;
                  const range = `[${i - lsb(i) + 1}, ${i}]`;
                  const built = builtNodes.has(i);
                  return (
                    <div key={i} className={`p-3 rounded-xl border text-center transition-all
                      ${built ? "border-green-500 bg-green-500/10" : "border-dashed border-muted-foreground"}`}>
                      <p className="text-xs font-mono text-primary">Node {i}</p>
                      <p className="text-[10px] text-muted-foreground">covers {range}</p>
                      <p className={`text-sm font-bold ${built ? "text-green-400" : "text-muted-foreground"}`}>
                        {built ? `sum = ${tree[i]}` : "—"}
                      </p>
                    </div>
                  );
                })}
              </div>
            )}
      
            {buildMode === "manual" && !allBuilt && (
              <button onClick={buildOneNode} className="px-6 py-2 bg-primary/20 text-primary rounded-lg text-sm mb-4">
                ➕ Insert next value (i += LSB(i) propagation)
              </button>
            )}
      
            {allBuilt && (
              <button
                onClick={() => { game.addXp(150, "🎯 Network Constructed"); game.nextStage(); }}
                className="px-8 py-3 bg-primary text-primary-foreground font-bold rounded-xl"
              >
                🔍 Run Prefix Query Mission →
              </button>
            )}
          </StageWrapper>
        );
      };
      const renderStage4 = () => {
        const handleQuery = () => {
          const i = parseInt(queryInput);
          if (isNaN(i) || i < 1 || i > N) return;
          setQueryResult(fenwickQuery(tree, i));
          setDroneStep(0);
        };
      
        const path = queryResult?.path ?? [];
        const visitedSoFar = path.slice(0, droneStep);
        const sumSoFar = visitedSoFar.reduce((s, idx) => s + tree[idx], 0);
      
        return (
          <StageWrapper>
            <h3 className="text-xl font-bold text-primary mb-2">🛰️ Prefix Query Mission</h3>
            <p className="text-muted-foreground text-sm mb-6 max-w-md text-center">
              To compute <code>query(i)</code>, the drone jumps backward: <code>i -&gt; i - LSB(i)</code>, summing each visited node.
            </p>
      
            <div className="flex gap-2 items-center mb-6">
              <span className="text-sm font-mono">query(</span>
              <input
                type="number"
                min={1} max={N}
                value={queryInput}
                onChange={e => { setQueryInput(e.target.value); setQueryResult(null); }}
                className="w-16 px-2 py-1 bg-black/40 border border-primary/30 rounded text-center font-mono text-sm"
              />
              <span className="text-sm font-mono">)</span>
              <button onClick={handleQuery} className="px-4 py-1 bg-primary/20 text-primary rounded-lg text-sm">▶ Run</button>
            </div>
      
            {queryResult && (
              <>
                {/* Drone path visual */}
                <div className="flex gap-2 mb-4 flex-wrap justify-center">
                  {path.map((idx, step) => (
                    <div key={idx} className={`px-3 py-2 rounded-lg border font-mono text-sm transition-all
                      ${step < droneStep ? "border-green-500 bg-green-500/10 text-green-400"
                        : step === droneStep ? "border-yellow-500 bg-yellow-500/10 text-yellow-300 animate-pulse"
                        : "border-dashed border-muted-foreground text-muted-foreground"}`}>
                      node {idx} (+{tree[idx]})
                    </div>
                  ))}
                </div>
      
                <div className="w-full max-w-xs bg-black/70 border border-primary/30 rounded-xl p-3 font-mono text-sm text-center mb-4">
                  sum so far = <span className="text-yellow-300">{sumSoFar}</span>
                </div>
      
                {droneStep < path.length ? (
                  <button onClick={() => setDroneStep(s => s + 1)} className="px-6 py-2 bg-primary/20 text-primary rounded-lg text-sm mb-4">
                    ▶ Drone Jump (i -= LSB(i))
                  </button>
                ) : (
                  <div className="flex flex-col items-center gap-3">
                    <p className="text-green-400 text-sm">💡 Query Completed: {queryResult.sum} Energy Units Restored</p>
                    <button
                      onClick={() => { game.addXp(125, "🛰️ Query Navigator"); game.nextStage(); }}
                      className="px-8 py-3 bg-primary text-primary-foreground font-bold rounded-xl"
                    >
                      🔀 Range Query Hack →
                    </button>
                  </div>
                )}
              </>
            )}
          </StageWrapper>
        );
      };

      const renderStage5 = () => {
        const L = 2, R = 5;
        const correctR = fenwickQuery(tree, R).sum;
        const correctL = fenwickQuery(tree, L - 1).sum;
        const correctRange = correctR - correctL;
      
        return (
          <StageWrapper>
            <h3 className="text-xl font-bold text-primary mb-2">🔀 Range Query Hack</h3>
            <p className="text-muted-foreground text-sm mb-6 max-w-md text-center">
              Fenwick Trees don't store ranges directly — but <code>range(l, r) = query(r) - query(l-1)</code>
            </p>
      
            <div className="w-full max-w-md bg-black/70 border border-primary/30 rounded-xl p-4 font-mono text-sm mb-6 text-center">
              <p className="text-yellow-300">Goal: range({L}, {R}) = ?</p>
            </div>
      
            {/* Step 1: query(R) */}
            {rangeStep === "query_r" && (
              <div className="flex flex-col items-center gap-3">
                <p className="text-sm text-muted-foreground">Step 1: Compute query({R})</p>
                <div className="flex gap-2">
                  {[correctR - 2, correctR, correctR + 3].sort((a,b)=>a-b).map(opt => (
                    <button
                      key={opt}
                      onClick={() => setRangeRResult(opt)}
                      className={`px-4 py-2 rounded-lg border font-mono text-sm transition-all
                        ${rangeRResult === opt
                          ? (opt === correctR ? "border-green-500 bg-green-500/10 text-green-400" : "border-red-500 bg-red-500/10 text-red-400")
                          : "border-muted-foreground hover:border-primary"}`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
                {rangeRResult !== null && rangeRResult !== correctR && (
                  <button onClick={() => setRangeRResult(null)} className="px-5 py-2 bg-red-500/20 border border-red-500/40 text-red-400 rounded-xl text-sm hover:bg-red-500/30 transition-all">
                    🔄 Try Again
                  </button>
                )}
                {rangeRResult === correctR && (
                  <button onClick={() => setRangeStep("query_l")} className="px-6 py-2 bg-primary/20 text-primary rounded-lg text-sm">
                    ✅ query({R}) = {correctR} → Next: query({L-1}) →
                  </button>
                )}
              </div>
            )}
      
            {/* Step 2: query(L-1) */}
            {rangeStep === "query_l" && (
              <div className="flex flex-col items-center gap-3">
                <p className="text-sm text-muted-foreground">Step 2: Compute query({L - 1})</p>
                <div className="flex gap-2">
                  {[correctL - 1, correctL, correctL + 2].sort((a,b)=>a-b).map(opt => (
                    <button
                      key={opt}
                      onClick={() => setRangeLResult(opt)}
                      className={`px-4 py-2 rounded-lg border font-mono text-sm transition-all
                        ${rangeLResult === opt
                          ? (opt === correctL ? "border-green-500 bg-green-500/10 text-green-400" : "border-red-500 bg-red-500/10 text-red-400")
                          : "border-muted-foreground hover:border-primary"}`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
                {rangeLResult !== null && rangeLResult !== correctL && (
                  <button onClick={() => setRangeLResult(null)} className="px-5 py-2 bg-red-500/20 border border-red-500/40 text-red-400 rounded-xl text-sm hover:bg-red-500/30 transition-all">
                    🔄 Try Again
                  </button>
                )}
                {rangeLResult === correctL && (
                  <button onClick={() => setRangeStep("subtract")} className="px-6 py-2 bg-primary/20 text-primary rounded-lg text-sm">
                    ✅ query({L-1}) = {correctL} → Next: Subtract →
                  </button>
                )}
              </div>
            )}
      
            {/* Step 3: subtract */}
            {rangeStep === "subtract" && (
              <div className="flex flex-col items-center gap-3">
                <p className="text-sm text-muted-foreground">Step 3: range({L},{R}) = {correctR} − {correctL} = ?</p>
                <div className="flex gap-2">
                  {[correctRange - 2, correctRange, correctRange + 4].sort((a,b)=>a-b).map(opt => (
                    <button
                      key={opt}
                      onClick={() => setRangeFinal(opt)}
                      className={`px-4 py-2 rounded-lg border font-mono text-sm transition-all
                        ${rangeFinal === opt
                          ? (opt === correctRange ? "border-green-500 bg-green-500/10 text-green-400" : "border-red-500 bg-red-500/10 text-red-400")
                          : "border-muted-foreground hover:border-primary"}`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
                {rangeFinal !== null && rangeFinal !== correctRange && (
                  <button onClick={() => setRangeFinal(null)} className="px-5 py-2 bg-red-500/20 border border-red-500/40 text-red-400 rounded-xl text-sm hover:bg-red-500/30 transition-all">
                    🔄 Try Again
                  </button>
                )}
                {rangeFinal === correctRange && (
                  <>
                    <p className="text-green-400 text-sm">🔥 Range Computation Master! range({L},{R}) = {correctRange}</p>
                    <button
                      onClick={() => { game.addXp(150, "🔥 Range Hacker"); game.nextStage(); }}
                      className="px-8 py-3 bg-primary text-primary-foreground font-bold rounded-xl"
                    >
                      ⚡ System Update Crisis →
                    </button>
                  </>
                )}
              </div>
            )}
          </StageWrapper>
        );
      };
      const renderStage6 = () => {
        if (bossPhase === "done") {
          return (
            <CompletionScreen
              missionTitle="🌐 Fenwick City Restored!"
              missionSubtitle="You decoded the Hidden Signal Network and rebuilt Fenwick City's energy grid."
              xp={game.xp}
              xpLog={game.xpLog}
              achievements={[
                { icon: <Binary className="size-4" />,     label: "LSB Master" },
                { icon: <Search className="size-4" />,     label: "Query Navigator" },
                { icon: <RefreshCw className="size-4" />,  label: "Update Strategist" },
                { icon: <GitCompare className="size-4" />, label: "Range Hacker" },
                { icon: <Trophy className="size-4" />,     label: "Signal Architect" },
              ]}
              concepts={[
                { label: "LSB(i) = i & (-i)",   description: "Determines the range size each Fenwick node covers." },
                { label: "Build",                description: "Each value propagates to ancestor nodes via i += LSB(i)." },
                { label: "Prefix Query",         description: "Sum is computed by jumping backward: i -= LSB(i)." },
                { label: "Range Query",          description: "range(l,r) = query(r) - query(l-1) using prefix differences." },
                { label: "Update",               description: "Only O(log n) nodes change when updating a single index." },
              ]}
              onReset={game.reset}
            />
          );
        }
      
        // Phase 1: System Update Crisis (lesson)
        if (bossPhase === "query4") {
          const path = fenwickUpdatePath(3); // building 3 changes
          const isComplete = updateStep >= path.length;
      
          return (
            <StageWrapper>
              <h3 className="text-xl font-bold text-primary mb-2">⚡ System Update Crisis</h3>
              <p className="text-muted-foreground text-sm mb-6 max-w-md text-center">
                Building 3 malfunctions: value changes <strong>5 → 10</strong>. Propagate <code>update(3, +5)</code> via <code>i += LSB(i)</code>.
              </p>
      
              <div className="flex gap-2 mb-6 flex-wrap justify-center">
                {path.map((idx, step) => (
                  <div key={idx} className={`px-3 py-2 rounded-lg border font-mono text-sm transition-all
                    ${step < updateStep ? "border-green-500 bg-green-500/10 text-green-400"
                      : step === updateStep ? "border-yellow-500 bg-yellow-500/10 text-yellow-300 animate-pulse"
                      : "border-dashed border-muted-foreground text-muted-foreground"}`}>
                    node {idx} {step < updateStep && "+5 ✅"}
                  </div>
                ))}
              </div>
      
              {!isComplete ? (
                <button onClick={() => setUpdateStep(s => s + 1)} className="px-6 py-2 bg-primary/20 text-primary rounded-lg text-sm mb-4">
                  ⚡ Propagate Shockwave (i += LSB(i))
                </button>
              ) : (
                <>
                  <p className="text-green-400 text-sm mb-4">⚡ System Stabilized — only {path.length} of {N} nodes updated!</p>
                  <button
                    onClick={() => { game.addXp(125, "⚡ Update Strategist"); setBossPhase("range"); }}
                    className="px-8 py-3 bg-primary text-primary-foreground font-bold rounded-xl"
                  >
                    🧨 Final Boss: Restore the Entire City →
                  </button>
                </>
              )}
            </StageWrapper>
          );
        }
      
        // Phase 2: Boss — quiz on new array
        if (bossPhase === "range") return (
          <StageWrapper>
            <h3 className="text-xl font-bold text-primary mb-6">🧨 Restore the Entire City — Final Boss</h3>
            <p className="text-muted-foreground text-sm mb-4 max-w-md text-center">
              New array: <code>[2, 4, 6, 8, 10, 12]</code>
            </p>
      
            <div className="w-full max-w-md space-y-6 mb-8">
              <QuizBlock
                question={`What is query(4)? (sum of first 4 elements: 2+4+6+8)`}
                options={[
                  { label: "16", value: "a" },
                  { label: "20", value: "b" },
                  { label: "24", value: "c" },
                ]}
                correctValue="b"
                selectedValue={quiz1Answer}
                onSelect={setQuiz1Answer}
                correctFeedback="✅ Correct! 2+4+6+8 = 20."
                wrongFeedback="❌ Add the first 4 elements: 2+4+6+8."
              />
      
              {quiz1Answer && quiz1Answer !== "b" && (
                <button onClick={() => setQuiz1Answer(null)} className="px-5 py-2 bg-red-500/20 border border-red-500/40 text-red-400 rounded-xl text-sm hover:bg-red-500/30 transition-all">
                  🔄 Try Again
                </button>
              )}
      
              {quiz1Answer === "b" && (
                <>
                  <QuizBlock
                    question="If index 5 (value 10) is updated to 20, what changes?"
                    options={[
                      { label: "Only node 5 changes",                              value: "a" },
                      { label: "Only nodes on the path 5 → 6 (via i += LSB(i)) change", value: "b" },
                      { label: "All 6 nodes must be rebuilt",                      value: "c" },
                    ]}
                    correctValue="b"
                    selectedValue={quiz2Answer}
                    onSelect={setQuiz2Answer}
                    correctFeedback="✅ Correct! Update propagates only along the i += LSB(i) path — O(log n) nodes."
                    wrongFeedback="❌ Updates follow the i += LSB(i) chain — not just one node, and not all nodes."
                  />
      
                  {quiz2Answer && quiz2Answer !== "b" && (
                    <button onClick={() => setQuiz2Answer(null)} className="px-5 py-2 bg-red-500/20 border border-red-500/40 text-red-400 rounded-xl text-sm hover:bg-red-500/30 transition-all">
                      🔄 Try Again
                    </button>
                  )}
                </>
              )}
            </div>
      
            {quiz1Answer === "b" && quiz2Answer === "b" && (
              <button
                onClick={() => { game.addXp(300, "🌐 Signal Architect"); setBossPhase("done"); }}
                className="px-8 py-3 bg-primary text-primary-foreground font-bold rounded-xl animate-in zoom-in"
              >
                🎉 Restore Fenwick City →
              </button>
            )}
          </StageWrapper>
        );
      };

      return (
        <SimShell
          title="Fenwick City"
          subtitle="The Hidden Signal Network"
          xp={game.xp}
          stage={game.stage}
          totalStages={TOTAL_STAGES}
          mistakeMessage={game.mistakeMessage}
          successMessage={game.successMessage}
          icon={<Network className="size-5 text-primary" />}
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
