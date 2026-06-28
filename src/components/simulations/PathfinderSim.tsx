import { useState } from "react";
import { Map, Network, Layers, Zap, RefreshCw, Crown, AlertTriangle } from "lucide-react";
import {
  useSimGame,
  SimShell,
  StageWrapper,
  QuizBlock,
  CompletionScreen,
} from "@/components/simulations/shared";

const TOTAL_STAGES = 4; // Flattened down from 6
const NUM_NODES = 5;
const SOURCE = 0;

// Adjacency list: [to, weight]
const GRAPH: Record<number, [number, number][]> = {
  0: [[1, 4], [2, 1]],
  1: [[3, 1], [4, 7]],
  2: [[1, 2], [3, 5]],
  3: [[4, 3]],
  4: [],
};

const INF = Infinity;

type DijkstraStep = {
  current: number;
  distBefore: number[];
  distAfter: number[];
  relaxed: { to: number; via: number; oldDist: number; newDist: number; updated: boolean }[];
  heapAfter: { node: number; dist: number }[];
};

function runDijkstra(): DijkstraStep[] {
  const dist = Array(NUM_NODES).fill(INF);
  dist[SOURCE] = 0;
  const visited = new Set<number>();
  const steps: DijkstraStep[] = [];

  while (visited.size < NUM_NODES) {
    let u = -1, best = INF;
    for (let i = 0; i < NUM_NODES; i++) {
      if (!visited.has(i) && dist[i] < best) { best = dist[i]; u = i; }
    }
    if (u === -1) break;
    visited.add(u);

    const distBefore = [...dist];
    const relaxed: DijkstraStep["relaxed"] = [];

    for (const [v, w] of GRAPH[u]) {
      const newDist = dist[u] + w;
      const updated = newDist < dist[v];
      relaxed.push({ to: v, via: u, oldDist: dist[v], newDist, updated });
      if (updated) dist[v] = newDist;
    }

    const heapAfter = Array.from({ length: NUM_NODES }, (_, i) => ({ node: i, dist: dist[i] }))
      .filter(x => !visited.has(x.node) && x.dist < INF)
      .sort((a, b) => a.dist - b.dist);

    steps.push({ current: u, distBefore, distAfter: [...dist], relaxed, heapAfter });
  }
  return steps;
}

const fmt = (d: number) => (d === INF ? "∞" : String(d));

export function PathfinderSim() {
  const dijkstraSteps = runDijkstra();

  const game = useSimGame(TOTAL_STAGES, () => {
    setInitialized(false);
    setEdgesBuilt(new Set());
    setExtractedMin(null);
    setJourneyStep(0);
    setRelaxAnswers({});
    setLocalPhase("extract");
    setTraceNode(null);
    setNegWeightTriggered(false);
    setBossPredictAnswer(null);
    setQuiz1Answer(null);
    setQuiz2Answer(null);
    setBossPhase("predict");
  });

  // Stage 1 State
  const [initialized, setInitialized] = useState(false);

  // Stage 2 State
  const ALL_EDGES = Object.entries(GRAPH).flatMap(([u, edges]) =>
    edges.map(([v, w]) => `${u}-${v}-${w}`)
  );
  const [edgesBuilt, setEdgesBuilt] = useState<Set<string>>(new Set());

  // Stage 3 (Unified Loop) State
  const [journeyStep, setJourneyStep] = useState(0);
  const [extractedMin, setExtractedMin] = useState<number | null>(null);
  const [relaxAnswers, setRelaxAnswers] = useState<Record<string, "yes" | "no" | null>>({});
  const [localPhase, setLocalPhase] = useState<"extract" | "relax" | "reorder" | "finalPaths">("extract");
  const [traceNode, setTraceNode] = useState<number | null>(null);

  // Stage 4 (Boss / Wrap-up) State
  const [negWeightTriggered, setNegWeightTriggered] = useState(false);
  const [bossPredictAnswer, setBossPredictAnswer] = useState<string | null>(null);
  const [quiz1Answer, setQuiz1Answer] = useState<string | null>(null);
  const [quiz2Answer, setQuiz2Answer] = useState<string | null>(null);
  const [bossPhase, setBossPhase] = useState<"predict" | "quiz" | "done">("predict");

  const renderStage1 = () => {
    const dist = initialized ? dijkstraSteps[0].distBefore : Array(NUM_NODES).fill(INF).map((_, i) => i === SOURCE ? 0 : INF);

    return (
      <StageWrapper>
        <h2 className="text-3xl font-bold text-primary mb-2">🗺️ Map of the Kingdom</h2>
        <p className="text-muted-foreground mb-6 max-w-md text-center">
          The kingdom has 5 cities. The capital (City 0) has distance 0 — all others are unknown (∞).
        </p>

        <div className="flex gap-3 mb-6 flex-wrap justify-center">
          {Array.from({ length: NUM_NODES }, (_, i) => (
            <div key={i} className={`w-16 h-16 rounded-full border-2 flex flex-col items-center justify-center font-mono text-sm transition-all
              ${i === SOURCE ? "border-yellow-500 bg-yellow-500/10 text-yellow-300" : "border-primary/30 text-muted-foreground"}`}>
              <span>City {i}</span>
              <span className={`text-xs ${dist[i] === 0 ? "text-yellow-300" : "text-muted-foreground"}`}>
                {fmt(dist[i])}
              </span>
            </div>
          ))}
        </div>

        <div className="w-full max-w-xs bg-black/70 border border-primary/30 rounded-xl p-4 font-mono text-sm mb-6">
          <p className="text-muted-foreground">Distance Table:</p>
          {Array.from({ length: NUM_NODES }, (_, i) => (
            <p key={i} className={i === SOURCE ? "text-yellow-300" : "text-primary/70"}>
              {i} → {fmt(dist[i])}
            </p>
          ))}
        </div>

        {!initialized ? (
          <button onClick={() => setInitialized(true)} className="px-8 py-3 bg-primary text-primary-foreground font-bold rounded-xl">
            ✨ Initialize Kingdom (source = 0)
          </button>
        ) : (
          <button
            onClick={() => { game.addXp(10, "✨ Initialization Complete"); game.nextStage(); }}
            className="px-8 py-3 bg-primary text-primary-foreground font-bold rounded-xl flex items-center gap-2"
          >
            <Network className="size-5" /> Build the Road Network →
          </button>
        )}
      </StageWrapper>
    );
  };

  const renderStage2 = () => {
    const allBuilt = ALL_EDGES.every(e => edgesBuilt.has(e));

    return (
      <StageWrapper>
        <h3 className="text-xl font-bold text-primary mb-2">🏗️ Build the Road Network</h3>
        <p className="text-muted-foreground text-sm mb-6 max-w-md text-center">
          Click each road to add it to the kingdom's adjacency list.
        </p>

        <div className="flex flex-wrap gap-2 justify-center mb-6">
          {ALL_EDGES.map(e => {
            const [u, v, w] = e.split("-");
            const built = edgesBuilt.has(e);
            return (
              <button
                key={e}
                onClick={() => setEdgesBuilt(prev => new Set([...prev, e]))}
                disabled={built}
                className={`px-3 py-2 rounded-lg border text-xs font-mono transition-all
                  ${built ? "border-green-500 bg-green-500/10 text-green-400 cursor-default" : "border-primary/40 hover:border-primary text-primary"}`}
              >
                {built ? "✅ " : ""}City {u} —({w})→ City {v}
              </button>
            );
          })}
        </div>

        <div className="w-full max-w-sm bg-black/70 border border-primary/30 rounded-xl p-4 font-mono text-xs mb-6">
          <p className="text-muted-foreground mb-1">adj[] = </p>
          {Array.from({ length: NUM_NODES }, (_, u) => {
            const edges = ALL_EDGES.filter(e => e.startsWith(`${u}-`) && edgesBuilt.has(e));
            return (
              <p key={u} className="text-primary/80">
                {u}: [{edges.map(e => { const [, v, w] = e.split("-"); return `(${v},${w})`; }).join(", ")}]
              </p>
            );
          })}
        </div>

        {allBuilt && (
          <button
            onClick={() => { game.addXp(20, "🏗️ Graph Constructed"); game.nextStage(); }}
            className="px-8 py-3 bg-primary text-primary-foreground font-bold rounded-xl flex items-center gap-2"
          >
            <Layers className="size-5" /> Summon the Min-Heap →
          </button>
        )}
      </StageWrapper>
    );
  };

  const renderCombinedJourneyStage = () => {
    const step = dijkstraSteps[journeyStep];
    const isLastStep = journeyStep === dijkstraSteps.length - 1;
    const finalDist = dijkstraSteps[dijkstraSteps.length - 1].distAfter;

    const heapDisplay = journeyStep === 0
      ? [{ node: 0, dist: 0 }]
      : dijkstraSteps[journeyStep - 1].heapAfter;

    const allAnswered = step.relaxed.every(r => relaxAnswers[`${r.via}-${r.to}`] !== undefined && relaxAnswers[`${r.via}-${r.to}`] !== null);
    const allCorrect = step.relaxed.every(r => relaxAnswers[`${r.via}-${r.to}`] === (r.updated ? "yes" : "no"));

    // Sub-Phase 1: Extract Min Node
    if (localPhase === "extract") {
      return (
        <StageWrapper>
          <div className="text-xs bg-primary/10 border border-primary/30 px-3 py-1 rounded-full text-primary mb-4 font-mono">
            Iteration {journeyStep + 1} of {dijkstraSteps.length}
          </div>
          <h3 className="text-xl font-bold text-primary mb-2">⚡ Summon the Min-Heap</h3>
          <p className="text-muted-foreground text-sm mb-6 max-w-md text-center">
            The Min-Heap keeps the closest unvisited city on top. We greedily extract it.
          </p>

          <div className="w-full max-w-sm bg-black/70 border border-primary/30 rounded-xl p-4 font-mono text-sm mb-4">
            <p className="text-muted-foreground mb-1">Heap (sorted by distance):</p>
            {heapDisplay.map((h, i) => (
              <p key={h.node} className={i === 0 ? "text-yellow-300" : "text-primary/60"}>
                {i === 0 ? "⬆ " : "  "}City {h.node} (dist={fmt(h.dist)})
              </p>
            ))}
          </div>

          {extractedMin === null ? (
            <button onClick={() => setExtractedMin(step.current)} className="px-6 py-2 bg-primary/20 text-primary rounded-lg text-sm mb-4">
              ⚡ Extract Min
            </button>
          ) : (
            <>
              <p className="text-green-400 text-sm mb-4">🎯 City {extractedMin} extracted (closest unvisited city — greedy choice!)</p>
              <button
                onClick={() => { game.addXp(15, "⚡ Minimum Node Extracted"); setLocalPhase("relax"); }}
                className="px-8 py-3 bg-primary text-primary-foreground font-bold rounded-xl"
              >
                💡 Edge Relaxation Magic →
              </button>
            </>
          )}
        </StageWrapper>
      );
    }

    // Sub-Phase 2: Relaxation Questions
    if (localPhase === "relax") {
      return (
        <StageWrapper>
          <h3 className="text-xl font-bold text-primary mb-2">💡 Edge Relaxation Magic</h3>
          <p className="text-muted-foreground text-sm mb-6 max-w-md text-center">
            From City {step.current} (dist={fmt(step.distBefore[step.current])}), check each outgoing edge: does <code>dist[u] + weight &lt; dist[v]</code>?
          </p>

          <div className="w-full max-w-md space-y-4 mb-6">
            {step.relaxed.map(r => {
              const key = `${r.via}-${r.to}`;
              const answer = relaxAnswers[key];
              const correct = r.updated ? "yes" : "no";
              return (
                <div key={key} className="p-3 bg-primary/5 border border-primary/20 rounded-xl">
                  <p className="text-sm font-mono mb-2">
                    dist[{r.via}] + w = {step.distBefore[r.via]} + ({GRAPH[r.via].find(([v]) => v === r.to)![1]}) = {r.newDist}
                    {"   vs   "}dist[{r.to}] = {fmt(r.oldDist)}
                  </p>
                  <p className="text-xs text-muted-foreground mb-2">Should we relax (update) dist[{r.to}]?</p>
                  <div className="flex gap-2">
                    {(["yes", "no"] as const).map(opt => (
                      <button
                        key={opt}
                        onClick={() => setRelaxAnswers(prev => ({ ...prev, [key]: opt }))}
                        className={`px-4 py-1 rounded-lg border text-sm transition-all
                          ${answer === opt
                            ? (opt === correct ? "border-green-500 bg-green-500/10 text-green-400" : "border-red-500 bg-red-500/10 text-red-400")
                            : "border-muted-foreground hover:border-primary"}`}
                      >
                        {opt === "yes" ? "✅ Relax" : "❌ Skip"}
                      </button>
                    ))}
                  </div>
                  {answer && answer !== correct && (
                    <p className="text-red-400 text-xs mt-2">
                      ❌ {r.newDist} {r.updated ? "<" : "≥"} {fmt(r.oldDist)} → {r.updated ? "should relax!" : "no improvement, skip."}
                    </p>
                  )}
                  {answer === correct && r.updated && (
                    <p className="text-green-400 text-xs mt-2">✅ dist[{r.to}] updated: {fmt(r.oldDist)} → {r.newDist}</p>
                  )}
                </div>
              );
            })}
          </div>

          {allAnswered && !allCorrect && (
            <button
              onClick={() => setRelaxAnswers(prev => {
                const reset = { ...prev };
                step.relaxed.forEach(r => { delete reset[`${r.via}-${r.to}`]; });
                return reset;
              })}
              className="px-5 py-2 bg-red-500/20 border border-red-500/40 text-red-400 rounded-xl text-sm hover:bg-red-500/30 transition-all mb-4"
            >
              🔄 Try Again
            </button>
          )}

          {allCorrect && (
            <button
              onClick={() => { game.addXp(40, "💡 Distance Optimized"); setLocalPhase("reorder"); }}
              className="px-8 py-3 bg-primary text-primary-foreground font-bold rounded-xl"
            >
              🔄 Heap Reordering Chaos →
            </button>
          )}
        </StageWrapper>
      );
    }

    // Sub-Phase 3: Reorder Heap & Loop Control
    if (localPhase === "reorder") {
      const advanceJourneyLoop = () => {
        if (!isLastStep) {
          setJourneyStep(s => s + 1);
          setExtractedMin(null);
          setRelaxAnswers({});
          setLocalPhase("extract"); // Cycle internally back to sub-phase 1
        } else {
          setLocalPhase("finalPaths"); // End of dijkstra queue, move to local final path overview
        }
      };

      return (
        <StageWrapper>
          <h3 className="text-xl font-bold text-primary mb-2">🔄 Heap Reordering Chaos</h3>
          <p className="text-muted-foreground text-sm mb-6 max-w-md text-center">
            After relaxation, the heap reorders so the next-smallest distance rises to the top.
          </p>

          <div className="w-full max-w-sm bg-black/70 border border-primary/30 rounded-xl p-4 font-mono text-sm mb-6">
            <p className="text-muted-foreground mb-1">Updated Heap:</p>
            {step.heapAfter.map((h, i) => (
              <p key={h.node} className={i === 0 ? "text-yellow-300" : "text-primary/60"}>
                {i === 0 ? "⬆ " : "  "}City {h.node} (dist={fmt(h.dist)})
              </p>
            ))}
            {step.heapAfter.length === 0 && <p className="text-green-400">All cities visited!</p>}
          </div>

          <button onClick={advanceJourneyLoop} className="px-8 py-3 bg-primary text-primary-foreground font-bold rounded-xl">
            {isLastStep ? "🏆 View Final Shortest Paths" : `➡️ Continue to City ${dijkstraSteps[journeyStep + 1].current}`}
          </button>
        </StageWrapper>
      );
    }

    // Sub-Phase 4: Final Completed Shortest Paths
    return (
      <StageWrapper>
        <h3 className="text-xl font-bold text-primary mb-2">🏆 Complete the Shortest Paths</h3>
        <p className="text-muted-foreground text-sm mb-6 max-w-md text-center">
          All shortest distances from City 0 are computed! Click a city to see its final distance.
        </p>

        <div className="flex gap-3 mb-6 flex-wrap justify-center">
          {Array.from({ length: NUM_NODES }, (_, i) => (
            <div
              key={i}
              onClick={() => setTraceNode(i)}
              className={`w-16 h-16 rounded-full border-2 flex flex-col items-center justify-center font-mono text-sm cursor-pointer transition-all
                ${traceNode === i ? "border-yellow-500 bg-yellow-500/10 text-yellow-300"
                  : "border-green-500 bg-green-500/10 text-green-400"}`}
            >
              <span>City {i}</span>
              <span className="text-xs">{fmt(finalDist[i])}</span>
            </div>
          ))}
        </div>

        {traceNode !== null && (
          <p className="text-sm font-mono text-muted-foreground mb-6">
            Shortest distance from City 0 to City {traceNode} = <strong className="text-primary">{fmt(finalDist[traceNode])}</strong>
          </p>
        )}

        <button
          onClick={() => { game.addXp(70, "🏆 Kingdom Saved"); game.nextStage(); }}
          className="px-8 py-3 bg-primary text-primary-foreground font-bold rounded-xl"
        >
          ⚠️ The War Map Crisis →
        </button>
      </StageWrapper>
    );
  };

  const renderStage4 = () => {
    if (bossPhase === "done") {
      return (
        <CompletionScreen
          missionTitle="🏆 Kingdom Fully Optimized!"
          missionSubtitle="You mastered Dijkstra's Algorithm — greedy selection, relaxation, and heap-based efficiency."
          xp={game.xp}
          xpLog={game.xpLog}
          achievements={[
            { icon: <Map className="size-4" />, label: "Initialization Complete" },
            { icon: <Network className="size-4" />, label: "Graph Constructed" },
            { icon: <Layers className="size-4" />, label: "Heap Master" },
            { icon: <Zap className="size-4" />, label: "Greedy Strategist" },
            { icon: <RefreshCw className="size-4" />, label: "Relaxation Expert" },
            { icon: <Crown className="size-4" />, label: "Master Pathfinder" },
          ]}
          concepts={[
            { label: "Initialization", description: "dist[source]=0, all others = ∞." },
            { label: "Greedy Selection", description: "Always extract the unvisited node with smallest distance via a min-heap." },
            { label: "Edge Relaxation", description: "Update dist[v] if dist[u] + weight(u,v) < dist[v]." },
            { label: "Min-Heap", description: "Provides O(log V) extraction — total complexity O((V+E) log V)." },
            { label: "Negative Weights", description: "Dijkstra assumes non-negative weights — negatives break correctness." },
          ]}
          onReset={game.reset}
        />
      );
    }

    if (bossPhase === "predict") {
      return (
        <StageWrapper>
          <h3 className="text-xl font-bold text-red-400 mb-2">⚠️ The War Map Crisis</h3>
          <p className="text-muted-foreground text-sm mb-6 max-w-md text-center">
            A new edge appears: City 3 → City 1 with weight <strong>-10</strong>. What happens to Dijkstra?
          </p>

          {!negWeightTriggered ? (
            <button onClick={() => setNegWeightTriggered(true)} className="px-6 py-2 bg-red-500/20 border border-red-500/40 text-red-400 rounded-lg text-sm mb-4">
              ⚠️ Add edge (3 → 1, weight = -10)
            </button>
          ) : (
            <div className="w-full max-w-md mb-6">
              <div className="p-3 bg-red-500/10 border border-red-500 rounded-xl mb-4 text-center">
                <p className="text-red-400 text-sm font-bold">🚨 Distances oscillate! Dijkstra cannot handle negative weights!</p>
              </div>
              <QuizBlock
                question="Why does Dijkstra fail with negative edge weights?"
                options={[
                  { label: "It runs out of memory", value: "a" },
                  { label: "Once a node is marked visited, its distance is assumed final — but a negative edge could still improve it later", value: "b" },
                  { label: "Negative numbers can't be stored in arrays", value: "c" },
                ]}
                correctValue="b"
                selectedValue={bossPredictAnswer}
                onSelect={setBossPredictAnswer}
                correctFeedback="✅ Correct! Dijkstra's greedy 'finalize on visit' assumption breaks when later negative edges could still reduce a visited node's distance."
                wrongFeedback="❌ The issue is algorithmic: visited nodes are assumed final, which negative weights can violate."
              />
              {bossPredictAnswer && bossPredictAnswer !== "b" && (
                <button onClick={() => setBossPredictAnswer(null)} className="px-5 py-2 bg-red-500/20 border border-red-500/40 text-red-400 rounded-xl text-sm hover:bg-red-500/30 transition-all mt-3">
                  🔄 Try Again
                </button>
              )}
            </div>
          )}

          {bossPredictAnswer === "b" && (
            <button
              onClick={() => { game.addXp(100, "⚠️ Negative Weight Detector"); setBossPhase("quiz"); }}
              className="px-8 py-3 bg-primary text-primary-foreground font-bold rounded-xl"
            >
              🧨 Final Boss: 7-City War Map →
            </button>
          )}
        </StageWrapper>
      );
    }

    // Phase 2: Boss quiz
    return (
      <StageWrapper>
        <h3 className="text-xl font-bold text-primary mb-6">🧨 The War Map Crisis — Final Boss</h3>
        <div className="w-full max-w-md space-y-6 mb-8">
          <QuizBlock
            question="In our 5-city kingdom, what is the final shortest distance from City 0 to City 4?"
            options={[
              { label: "10", value: "a" },
              { label: "7", value: "b" },
              { label: "3", value: "c" },
            ]}
            correctValue="b"
            selectedValue={quiz1Answer}
            onSelect={setQuiz1Answer}
            correctFeedback="✅ Correct! Path 0→2→1→3→4 = 1+2+1+3 = 7, shorter than the direct 0→1→4 = 4+7=11."
            wrongFeedback="❌ Trace the path 0→2→1→3→4 and sum the weights: 1+2+1+3."
          />

          {quiz1Answer && quiz1Answer !== "b" && (
            <button onClick={() => setQuiz1Answer(null)} className="px-5 py-2 bg-red-500/20 border border-red-500/40 text-red-400 rounded-xl text-sm hover:bg-red-500/30 transition-all">
              🔄 Try Again
            </button>
          )}

          {quiz1Answer === "b" && (
            <>
              <QuizBlock
                question="What is the time complexity of Dijkstra's algorithm using a min-heap?"
                options={[
                  { label: "O(V²)", value: "a" },
                  { label: "O((V+E) log V)", value: "b" },
                  { label: "O(V + E)", value: "c" },
                ]}
                correctValue="b"
                selectedValue={quiz2Answer}
                onSelect={setQuiz2Answer}
                correctFeedback="✅ Correct! Each extraction and edge relaxation costs O(log V), giving O((V+E) log V) overall."
                wrongFeedback="❌ The heap-based version is O((V+E) log V) — better than the O(V²) linear-scan version."
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
            onClick={() => { game.addXp(300, "👑 Master Pathfinder"); setBossPhase("done"); }}
            className="px-8 py-3 bg-primary text-primary-foreground font-bold rounded-xl animate-in zoom-in"
          >
            🎉 Save the Kingdom →
          </button>
        )}
      </StageWrapper>
    );
  };

  return (
    <SimShell
      title="Pathfinder"
      subtitle="The Kingdom of Shortest Routes"
      xp={game.xp}
      stage={game.stage}
      totalStages={TOTAL_STAGES}
      mistakeMessage={game.mistakeMessage}
      successMessage={game.successMessage}
      icon={<Map className="size-5 text-primary" />}
    >
      {game.stage === 1 && renderStage1()}
      {game.stage === 2 && renderStage2()}
      {game.stage === 3 && renderCombinedJourneyStage()}
      {game.stage === 4 && renderStage4()}
    </SimShell>
  );
}