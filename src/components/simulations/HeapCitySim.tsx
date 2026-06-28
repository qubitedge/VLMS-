import { useState } from "react";
import {Building2, Map, ArrowUpCircle, ArrowDownCircle, Zap, Settings, Crown } from "lucide-react";
import {
  useSimGame,
  SimShell,
  StageWrapper,
  QuizBlock,
  CompletionScreen,
} from "@/components/simulations/shared";

const TOTAL_STAGES = 6;

const INITIAL_HEAP = [3, 8, 5, 12, 10, 9, 7]; // 0-indexed array

// Heap index helpers (0-indexed)
const parentOf = (i: number) => Math.floor((i - 1) / 2);
const leftOf   = (i: number) => 2 * i + 1;
const rightOf  = (i: number) => 2 * i + 2;

// BubbleUp: returns swap path
function bubbleUpPath(arr: number[], startIdx: number): number[][] {
  const a = [...arr];
  const path: number[][] = [[...a]];
  let i = startIdx;
  while (i > 0 && a[parentOf(i)] > a[i]) {
    const p = parentOf(i);
    [a[i], a[p]] = [a[p], a[i]];
    path.push([...a]);
    i = p;
  }
  return path;
}

// BubbleDown: returns swap path
function bubbleDownPath(arr: number[], startIdx: number): number[][] {
  const a = [...arr];
  const path: number[][] = [[...a]];
  let i = startIdx;
  const n = a.length;
  while (true) {
    let smallest = i;
    const l = leftOf(i), r = rightOf(i);
    if (l < n && a[l] < a[smallest]) smallest = l;
    if (r < n && a[r] < a[smallest]) smallest = r;
    if (smallest === i) break;
    [a[i], a[smallest]] = [a[smallest], a[i]];
    path.push([...a]);
    i = smallest;
  }
  return path;
}

// buildHeap: O(n) heapify all non-leaf nodes bottom-up
function buildHeapSteps(arr: number[]): number[][] {
  const a = [...arr];
  const steps: number[][] = [[...a]];
  const n = a.length;
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    const sub = bubbleDownPath(a, i);
    for (const s of sub.slice(1)) {
      a.splice(0, a.length, ...s);
      steps.push([...a]);
    }
  }
  return steps;
}

export function HeapCitySim() {
    const game = useSimGame(TOTAL_STAGES, () => {
      setViewMode("tree");
      setSelectedNode(null);
      setMapAnswer(null);
      setInsertValue("");
      setBubbleUpSteps([]);
      setBubbleUpStep(0);
      setExtractSteps([]);
      setExtractStep(0);
      setChildChoice(null);
      setHeapifyArray([...UNSORTED_ARRAY]);
      setHeapifySteps([]);
      setHeapifyStep(0);
      setControlHeap([...INITIAL_HEAP]);
      setControlAnswer(null);
      setControlOp(null);
      setBossPhase("build");
      setBossHeap([]);
      setBossOps([]);
      setBossOpIndex(0);
      setQuiz1Answer(null);
      setQuiz2Answer(null);
    });
  
    // Stage 1
    const [viewMode, setViewMode]         = useState<"tree"|"array">("tree");
    const [selectedNode, setSelectedNode] = useState<number | null>(null);
  
    // Stage 2 — Mapping
    const [mapAnswer, setMapAnswer] = useState<string | null>(null);
    const mapIndex = 3; // example index for parent/child quiz
  
    // Stage 3 — Bubble Up
    const [insertValue, setInsertValue]     = useState("");
    const [bubbleUpSteps, setBubbleUpSteps] = useState<number[][]>([]);
    const [bubbleUpStep, setBubbleUpStep]   = useState(0);
  
    // Stage 4 — Bubble Down (Extract Min)
    const [extractSteps, setExtractSteps] = useState<number[][]>([]);
    const [extractStep,  setExtractStep]  = useState(0);
    const [childChoice,  setChildChoice]  = useState<"left"|"right"|null>(null);
  
    // Stage 5 — BuildHeap O(n)
    const UNSORTED_ARRAY = [9, 4, 7, 1, -2, 6, 5];
    const [heapifyArray, setHeapifyArray] = useState([...UNSORTED_ARRAY]);
    const [heapifySteps, setHeapifySteps] = useState<number[][]>([]);
    const [heapifyStep,  setHeapifyStep]  = useState(0);
  
    // Stage 6 — Control Panel
    const [controlHeap,   setControlHeap]   = useState([...INITIAL_HEAP]);
    const [controlOp,     setControlOp]     = useState<"insert"|"extract"|"peek"|null>(null);
    const [controlAnswer, setControlAnswer] = useState<string | null>(null);
  
    // Boss
    const BOSS_INSERTS = [10, 5, 15, 3, 8];
    const [bossPhase,    setBossPhase]    = useState<"build"|"quiz"|"done">("build");
    const [bossHeap,     setBossHeap]     = useState<number[]>([]);
    const [bossOps,      setBossOps]      = useState<number[][]>([]);
    const [bossOpIndex,  setBossOpIndex]  = useState(0);
    const [quiz1Answer,  setQuiz1Answer]  = useState<string | null>(null);
    const [quiz2Answer,  setQuiz2Answer]  = useState<string | null>(null);
    const renderStage1 = () => (
        <StageWrapper>
          <h2 className="text-3xl font-bold text-primary mb-2">🏙️ The Broken City Grid</h2>
          <p className="text-muted-foreground mb-6 max-w-md text-center">
            Heap City runs on a hidden structure — a Binary Heap stored as an array but behaving like a tree.
          </p>
      
          {/* View toggle */}
          <div className="flex gap-3 mb-6">
            {(["tree", "array"] as const).map(mode => (
              <button
                key={mode}
                onClick={() => setViewMode(mode)}
                className={`px-4 py-2 rounded-lg border text-sm transition-all
                  ${viewMode === mode ? "border-primary bg-primary/10 text-primary" : "border-muted-foreground"}`}
              >
                {mode === "tree" ? "🌳 Tree View" : "📊 Array View"}
              </button>
            ))}
          </div>
      
          {viewMode === "array" ? (
            <div className="flex gap-2 mb-6">
              {INITIAL_HEAP.map((val, i) => (
                <div
                  key={i}
                  onClick={() => setSelectedNode(i)}
                  className={`w-12 h-12 rounded-lg border flex flex-col items-center justify-center cursor-pointer transition-all
                    ${selectedNode === i ? "border-primary bg-primary/10 text-primary" : "border-muted-foreground hover:border-primary/60"}`}
                >
                  <span className="font-mono text-sm">{val}</span>
                  <span className="text-[9px] text-muted-foreground">[{i}]</span>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center gap-3 mb-6">
              {[0, 1, 2].map(level => (
                <div key={level} className="flex gap-4">
                  {INITIAL_HEAP.slice(2 ** level - 1, 2 ** (level + 1) - 1).map((val, idx) => {
                    const i = (2 ** level - 1) + idx;
                    return (
                      <div
                        key={i}
                        onClick={() => setSelectedNode(i)}
                        className={`w-12 h-12 rounded-full border-2 flex items-center justify-center cursor-pointer font-mono text-sm transition-all
                          ${selectedNode === i ? "border-primary bg-primary/10 text-primary" : "border-muted-foreground hover:border-primary/60"}`}
                      >
                        {val}
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          )}
      
          {selectedNode !== null && (
            <div className="w-full max-w-sm p-3 bg-primary/5 border border-primary/20 rounded-xl mb-6 text-sm text-center">
              <p>Node value <strong className="text-primary">{INITIAL_HEAP[selectedNode]}</strong> → array index <strong className="text-primary">{selectedNode}</strong></p>
              {selectedNode > 0 && <p className="text-xs text-muted-foreground">Parent index: {parentOf(selectedNode)} (value {INITIAL_HEAP[parentOf(selectedNode)]})</p>}
            </div>
          )}
      
          {selectedNode !== null && (
            <button
              onClick={() => { game.addXp(50, "🗺️ Heap Mapping Vision"); game.nextStage(); }}
              className="px-8 py-3 bg-primary text-primary-foreground font-bold rounded-xl flex items-center gap-2"
            >
              <Map className="size-5" /> Decode the Map →
            </button>
          )}
        </StageWrapper>
      );
      const renderStage2 = () => {
        const i = mapIndex;
        const correct = `${parentOf(i)},${leftOf(i)},${rightOf(i)}`;
      
        return (
          <StageWrapper>
            <h3 className="text-xl font-bold text-primary mb-2">🗺️ Decoding the Map</h3>
            <p className="text-muted-foreground text-sm mb-6 max-w-md text-center">
              The city simulates a tree using formulas: <code>parent(i) = (i-1)/2</code>, <code>left(i) = 2i+1</code>, <code>right(i) = 2i+2</code>
            </p>
      
            {/* Index display */}
            <div className="w-full max-w-sm bg-black/70 border border-primary/30 rounded-xl p-4 font-mono text-sm mb-6 text-center">
              <p className="text-yellow-300 text-2xl">i = {i}</p>
              <p className="text-muted-foreground mt-1">value = {INITIAL_HEAP[i]}</p>
            </div>
      
            <p className="text-sm text-muted-foreground mb-3">Select the correct parent / left / right indices:</p>
      
            <div className="flex flex-col gap-2 w-full max-w-xs mb-4">
              {[
                `${parentOf(i)},${leftOf(i)},${rightOf(i)}`,
                `${i+1},${2*i},${2*i+1}`,
                `${parentOf(i)},${rightOf(i)},${leftOf(i)}`,
              ].sort(() => 0.5 - Math.random()).map(opt => (
                <button
                  key={opt}
                  onClick={() => setMapAnswer(opt)}
                  className={`px-4 py-2 rounded-lg border font-mono text-sm transition-all
                    ${mapAnswer === opt
                      ? (opt === correct ? "border-green-500 bg-green-500/10 text-green-400" : "border-red-500 bg-red-500/10 text-red-400")
                      : "border-muted-foreground hover:border-primary"}`}
                >
                  parent={opt.split(",")[0]}, left={opt.split(",")[1]}, right={opt.split(",")[2]}
                </button>
              ))}
            </div>
      
            {mapAnswer !== null && mapAnswer !== correct && (
              <div className="flex flex-col items-center gap-2 mb-4">
                <p className="text-red-400 text-sm">❌ Recheck the formulas: parent=(i-1)/2, left=2i+1, right=2i+2.</p>
                <button onClick={() => setMapAnswer(null)} className="px-5 py-2 bg-red-500/20 border border-red-500/40 text-red-400 rounded-xl text-sm hover:bg-red-500/30 transition-all">
                  🔄 Try Again
                </button>
              </div>
            )}
      
            {mapAnswer === correct && (
              <button
                onClick={() => { game.addXp(100, "🏅 Mapping Master"); game.nextStage(); }}
                className="px-8 py-3 bg-primary text-primary-foreground font-bold rounded-xl"
              >
                ⬆️ The Insertion Crisis →
              </button>
            )}
          </StageWrapper>
        );
      };
      const renderStage3 = () => {
        const handleInsert = () => {
          const v = parseInt(insertValue);
          if (isNaN(v)) return;
          const newArr = [...INITIAL_HEAP, v];
          setBubbleUpSteps(bubbleUpPath(newArr, newArr.length - 1));
          setBubbleUpStep(0);
        };
      
        const current = bubbleUpSteps[bubbleUpStep] ?? [];
        const isDone = bubbleUpStep === bubbleUpSteps.length - 1 && bubbleUpSteps.length > 0;
      
        return (
          <StageWrapper>
            <h3 className="text-xl font-bold text-primary mb-2">⬆️ The Insertion Crisis (Bubble Up)</h3>
            <p className="text-muted-foreground text-sm mb-6 max-w-md text-center">
              A new building drops into the last position, then climbs up while it's smaller than its parent.
            </p>
      
            <div className="flex gap-2 items-center mb-6">
              <input
                type="number"
                value={insertValue}
                onChange={e => { setInsertValue(e.target.value); setBubbleUpSteps([]); }}
                placeholder="New value (e.g. 2)"
                className="w-32 px-3 py-2 bg-black/40 border border-primary/30 rounded-lg font-mono text-sm"
              />
              <button onClick={handleInsert} className="px-4 py-2 bg-primary/20 text-primary rounded-lg text-sm">
                ➕ Insert
              </button>
            </div>
      
            {bubbleUpSteps.length > 0 && (
              <>
                {/* Array visualization */}
                <div className="flex gap-2 mb-4 flex-wrap justify-center">
                  {current.map((val, i) => {
                    const isLast = i === current.length - 1;
                    const isHighlight = bubbleUpStep > 0 && bubbleUpStep < bubbleUpSteps.length &&
                      (val === bubbleUpSteps[bubbleUpStep][i] && bubbleUpSteps[bubbleUpStep-1][i] !== val);
                    return (
                      <div key={i} className={`w-12 h-12 rounded-lg border flex items-center justify-center font-mono text-sm transition-all duration-300
                        ${isHighlight ? "border-yellow-500 bg-yellow-500/10 text-yellow-300 scale-110" : "border-muted-foreground"}`}>
                        {val}
                      </div>
                    );
                  })}
                </div>
      
                <p className="text-xs text-muted-foreground mb-4">Step {bubbleUpStep + 1} / {bubbleUpSteps.length}</p>
      
                {!isDone ? (
                  <button onClick={() => setBubbleUpStep(s => s + 1)} className="px-6 py-2 bg-primary/20 text-primary rounded-lg text-sm mb-4">
                    ⬆️ Compare with parent & swap if smaller
                  </button>
                ) : (
                  <>
                    <p className="text-green-400 text-sm mb-4">✨ Heap Stabilized! {bubbleUpSteps.length - 1} swap(s) performed.</p>
                    <button
                      onClick={() => { game.addXp(150, "✨ Heap Stabilized"); game.nextStage(); }}
                      className="px-8 py-3 bg-primary text-primary-foreground font-bold rounded-xl"
                    >
                      🔥 Emergency Extraction →
                    </button>
                  </>
                )}
              </>
            )}
          </StageWrapper>
        );
      };
      const renderStage4 = () => {
        const initExtract = () => {
          // Remove root: move last to front, then bubble down
          const a = [...INITIAL_HEAP];
          const last = a.pop()!;
          a[0] = last;
          setExtractSteps(bubbleDownPath(a, 0));
          setExtractStep(0);
          setChildChoice(null);
        };
      
        const current = extractSteps[extractStep] ?? [];
        const isDone = extractStep === extractSteps.length - 1 && extractSteps.length > 0;
      
        // For prediction: which child is smaller at current step
        const i = 0;
        const arrNow = extractSteps[extractStep] ?? [];
        const l = leftOf(i), r = rightOf(i);
        const smallerChild = (r < arrNow.length && arrNow[r] < arrNow[l]) ? "right" : "left";
      
        return (
          <StageWrapper>
            <h3 className="text-xl font-bold text-primary mb-2">🔥 Emergency Extraction (Bubble Down)</h3>
            <p className="text-muted-foreground text-sm mb-6 max-w-md text-center">
              The root (highest priority) is removed. The last node moves to root and sinks down, swapping with the smaller child.
            </p>
      
            {extractSteps.length === 0 ? (
              <button onClick={initExtract} className="px-8 py-3 bg-red-600 text-white font-bold rounded-xl mb-4">
                💥 Extract Min (remove root: {INITIAL_HEAP[0]})
              </button>
            ) : (
              <>
                <div className="flex gap-2 mb-4 flex-wrap justify-center">
                  {current.map((val, idx) => (
                    <div key={idx} className={`w-12 h-12 rounded-lg border flex flex-col items-center justify-center font-mono text-sm
                      ${idx === 0 && extractStep === 0 ? "border-yellow-500 bg-yellow-500/10 text-yellow-300" : "border-muted-foreground"}`}>
                      {val}
                      <span className="text-[9px] text-muted-foreground">[{idx}]</span>
                    </div>
                  ))}
                </div>
      
                {/* Prediction question, only on first step */}
                {extractStep === 0 && childChoice === null && (
                  <div className="flex flex-col items-center gap-3 mb-4">
                    <p className="text-sm text-muted-foreground">Predict: which child should the root swap with?</p>
                    <div className="flex gap-3">
                      <button onClick={() => setChildChoice("left")}
                        className={`px-4 py-2 rounded-lg border text-sm ${childChoice === "left" ? "border-primary bg-primary/10" : "border-muted-foreground hover:border-primary"}`}>
                        Left child ({arrNow[l]})
                      </button>
                      <button onClick={() => setChildChoice("right")}
                        className={`px-4 py-2 rounded-lg border text-sm ${childChoice === "right" ? "border-primary bg-primary/10" : "border-muted-foreground hover:border-primary"}`}>
                        Right child ({arrNow[r] ?? "—"})
                      </button>
                    </div>
                  </div>
                )}
      
                {childChoice && childChoice !== smallerChild && (
                  <div className="flex flex-col items-center gap-2 mb-4">
                    <p className="text-red-400 text-sm">❌ In a Min-Heap, always swap with the SMALLER child.</p>
                    <button onClick={() => setChildChoice(null)} className="px-5 py-2 bg-red-500/20 border border-red-500/40 text-red-400 rounded-xl text-sm hover:bg-red-500/30 transition-all">
                      🔄 Try Again
                    </button>
                  </div>
                )}
      
                {(extractStep > 0 || childChoice === smallerChild) && !isDone && (
                  <button onClick={() => setExtractStep(s => s + 1)} className="px-6 py-2 bg-primary/20 text-primary rounded-lg text-sm mb-4">
                    ⬇️ Swap with smaller child
                  </button>
                )}
      
                {isDone && (
                  <>
                    <p className="text-green-400 text-sm mb-4">🔥 Crisis Controlled! Extracted min = {INITIAL_HEAP[0]}</p>
                    <button
                      onClick={() => { game.addXp(200, "🔥 Crisis Controlled"); game.nextStage(); }}
                      className="px-8 py-3 bg-primary text-primary-foreground font-bold rounded-xl"
                    >
                      ⚡ Build the City Fast →
                    </button>
                  </>
                )}
              </>
            )}
          </StageWrapper>
        );
      };
      const renderStage5 = () => {
        const initBuild = () => {
          setHeapifySteps(buildHeapSteps(UNSORTED_ARRAY));
          setHeapifyStep(0);
        };
      
        const current = heapifySteps[heapifyStep] ?? UNSORTED_ARRAY;
        const isDone = heapifySteps.length > 0 && heapifyStep === heapifySteps.length - 1;
      
        return (
          <StageWrapper>
            <h3 className="text-xl font-bold text-primary mb-2">⚡ Build the City Fast (O(n) Magic)</h3>
            <p className="text-muted-foreground text-sm mb-6 max-w-md text-center">
              Instead of inserting one-by-one (O(n log n)), heapify non-leaf nodes bottom-up — O(n) total.
            </p>
      
            {/* Initial array */}
            <div className="flex gap-2 mb-4 flex-wrap justify-center">
              {current.map((val, i) => (
                <div key={i} className="w-12 h-12 rounded-lg border border-primary/40 flex items-center justify-center font-mono text-sm transition-all duration-300">
                  {val}
                </div>
              ))}
            </div>
      
            {heapifySteps.length === 0 ? (
              <button onClick={initBuild} className="px-8 py-3 bg-primary text-primary-foreground font-bold rounded-xl mb-4">
                ⚡ Start Heapify Wave
              </button>
            ) : !isDone ? (
              <>
                <p className="text-xs text-muted-foreground mb-4">Step {heapifyStep + 1} / {heapifySteps.length}</p>
                <button onClick={() => setHeapifyStep(s => s + 1)} className="px-6 py-2 bg-primary/20 text-primary rounded-lg text-sm mb-4">
                  🌊 Next Heapify Step
                </button>
              </>
            ) : (
              <>
                <p className="text-green-400 text-sm mb-4">⚡ Speed Architect! Heap built in {heapifySteps.length - 1} swaps — O(n).</p>
                <button
                  onClick={() => { game.addXp(250, "⚡ Speed Architect"); game.nextStage(); }}
                  className="px-8 py-3 bg-primary text-primary-foreground font-bold rounded-xl"
                >
                  🎯 Priority Engine Control Panel →
                </button>
              </>
            )}
          </StageWrapper>
        );
      };
      const renderStage6 = () => {
        if (bossPhase === "done") {
          return (
            <CompletionScreen
              missionTitle="👑 Heap City Restored!"
              missionSubtitle="You rebuilt the Priority Engine and restored order to Heap City."
              xp={game.xp}
              xpLog={game.xpLog}
              achievements={[
                { icon: <Building2 className="size-4" />,     label: "Heap Mapping Vision" },
                { icon: <Map className="size-4" />,           label: "Mapping Master" },
                { icon: <ArrowUpCircle className="size-4" />, label: "Bubble Master (Up)" },
                { icon: <ArrowDownCircle className="size-4" />, label: "Bubble Master (Down)" },
                { icon: <Zap className="size-4" />,           label: "Speed Architect" },
                { icon: <Crown className="size-4" />,         label: "Priority Guardian" },
              ]}
              concepts={[
                { label: "Array-based Heap",  description: "parent(i)=(i-1)/2, left(i)=2i+1, right(i)=2i+2." },
                { label: "BubbleUp",          description: "New element climbs while smaller than its parent." },
                { label: "BubbleDown",        description: "Root sinks by swapping with the smaller child each step." },
                { label: "BuildHeap O(n)",    description: "Heapify non-leaf nodes bottom-up — faster than n inserts." },
                { label: "Priority Queue",    description: "Insert, ExtractMin, and Peek all rely on heap structure." },
              ]}
              onReset={game.reset}
            />
          );
        }
      
        // Phase 1: Control Panel
        if (bossPhase === "build") {
          const min = Math.min(...controlHeap);
      
          const runOp = (op: "insert"|"extract"|"peek") => {
            setControlOp(op);
            if (op === "extract") {
              const a = [...controlHeap];
              const last = a.pop()!;
              if (a.length > 0) { a[0] = last; }
              setControlHeap(bubbleDownPath(a, 0).slice(-1)[0] ?? a);
            } else if (op === "insert") {
              const a = [...controlHeap, 99];
              const steps = bubbleUpPath(a, a.length - 1);
              setControlHeap(steps[steps.length - 1]);
            }
          };
      
          return (
            <StageWrapper>
              <h3 className="text-xl font-bold text-primary mb-2">🎯 Priority Engine Control Panel</h3>
              <p className="text-muted-foreground text-sm mb-6 max-w-md text-center">
                This is your control center. Predict the result, then run the operation.
              </p>
      
              {/* Heap display */}
              <div className="flex gap-2 mb-4 flex-wrap justify-center">
                {controlHeap.map((val, i) => (
                  <div key={i} className={`w-12 h-12 rounded-lg border flex items-center justify-center font-mono text-sm
                    ${i === 0 ? "border-primary bg-primary/10 text-primary" : "border-muted-foreground"}`}>
                    {val}
                  </div>
                ))}
              </div>
      
              {/* Peek prediction */}
              <div className="w-full max-w-md mb-6">
                <QuizBlock
                  question="What will Peek() return (the minimum value)?"
                  options={[
                    { label: String(min - 1), value: "a" },
                    { label: String(min),     value: "b" },
                    { label: String(min + 2), value: "c" },
                  ]}
                  correctValue="b"
                  selectedValue={controlAnswer}
                  onSelect={setControlAnswer}
                  correctFeedback={`✅ Correct! The root always holds the minimum: ${min}.`}
                  wrongFeedback="❌ In a Min-Heap, the root (index 0) is always the minimum value."
                />
              </div>
      
              {controlAnswer && controlAnswer !== "b" && (
                <button onClick={() => setControlAnswer(null)} className="px-5 py-2 bg-red-500/20 border border-red-500/40 text-red-400 rounded-xl text-sm hover:bg-red-500/30 transition-all mb-4">
                  🔄 Try Again
                </button>
              )}
      
              {controlAnswer === "b" && (
                <div className="flex gap-3 mb-4">
                  <button onClick={() => runOp("insert")} className="px-4 py-2 bg-primary/20 text-primary rounded-lg text-sm">➕ Insert(99)</button>
                  <button onClick={() => runOp("extract")} className="px-4 py-2 bg-primary/20 text-primary rounded-lg text-sm">⬇️ ExtractMin()</button>
                </div>
              )}
      
              {controlOp && (
                <button
                  onClick={() => { game.addXp(300, "🎯 System Operator"); setBossPhase("quiz"); }}
                  className="px-8 py-3 bg-primary text-primary-foreground font-bold rounded-xl"
                >
                  🧨 Final Boss: Save Heap City →
                </button>
              )}
            </StageWrapper>
          );
        }
      
        // Phase 2: Boss quiz
        if (bossPhase === "quiz") return (
          <StageWrapper>
            <h3 className="text-xl font-bold text-primary mb-6">🧨 Save Heap City — Final Boss</h3>
            <p className="text-muted-foreground text-sm mb-4 max-w-md text-center">
              Insert sequence: <code>10, 5, 15, 3, 8</code> into an empty Min-Heap.
            </p>
      
            <div className="w-full max-w-md space-y-6 mb-8">
              <QuizBlock
                question="After inserting all 5 values, what is the root of the heap?"
                options={[
                  { label: "10", value: "a" },
                  { label: "3",  value: "b" },
                  { label: "5",  value: "c" },
                ]}
                correctValue="b"
                selectedValue={quiz1Answer}
                onSelect={setQuiz1Answer}
                correctFeedback="✅ Correct! 3 is the smallest value, so it bubbles to the root."
                wrongFeedback="❌ The root of a Min-Heap always holds the smallest inserted value: 3."
              />
      
              {quiz1Answer && quiz1Answer !== "b" && (
                <button onClick={() => setQuiz1Answer(null)} className="px-5 py-2 bg-red-500/20 border border-red-500/40 text-red-400 rounded-xl text-sm hover:bg-red-500/30 transition-all">
                  🔄 Try Again
                </button>
              )}
      
              {quiz1Answer === "b" && (
                <>
                  <QuizBlock
                    question="If you call ExtractMin() once, what is removed and what becomes the new root candidate?"
                    options={[
                      { label: "10 is removed; 5 becomes root candidate",  value: "a" },
                      { label: "3 is removed; the last inserted node moves to root, then bubbles down", value: "b" },
                      { label: "5 is removed; heap is rebuilt from scratch", value: "c" },
                    ]}
                    correctValue="b"
                    selectedValue={quiz2Answer}
                    onSelect={setQuiz2Answer}
                    correctFeedback="✅ Correct! ExtractMin removes the root (3), moves the last element to root, then bubbles down."
                    wrongFeedback="❌ ExtractMin always removes the root (the minimum), then re-heapifies via bubbleDown."
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
                onClick={() => { game.addXp(300, "👑 Priority Guardian"); setBossPhase("done"); }}
                className="px-8 py-3 bg-primary text-primary-foreground font-bold rounded-xl animate-in zoom-in"
              >
                🎉 Restore Heap City →
              </button>
            )}
          </StageWrapper>
        );
      };
      return (
        <SimShell
          title="Heap City"
          subtitle="The Rise of the Priority Kingdom"
          xp={game.xp}
          stage={game.stage}
          totalStages={TOTAL_STAGES}
          mistakeMessage={game.mistakeMessage}
          successMessage={game.successMessage}
          icon={<Crown className="size-5 text-primary" />}
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