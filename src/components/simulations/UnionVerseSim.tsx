import { useState } from "react";
import { Globe, Link2, Search, Zap, Scale, Network } from "lucide-react";
import {
  useSimGame,
  SimShell,
  StageWrapper,
  QuizBlock,
  CompletionScreen,
} from "@/components/simulations/shared";
const TOTAL_STAGES = 6;
const N = 5; // nodes 0-4

// Find WITHOUT path compression — returns the traversal path to root
function findPath(parent: number[], x: number): number[] {
  const path = [x];
  while (parent[x] !== x) {
    x = parent[x];
    path.push(x);
  }
  return path;
}

// Find WITH path compression — returns new parent array + path traversed
function findWithCompression(parent: number[], x: number): { root: number; newParent: number[]; path: number[] } {
  const path = findPath(parent, x);
  const root = path[path.length - 1];
  const newParent = [...parent];
  for (const node of path) newParent[node] = root;
  return { root, newParent, path };
}

// Union by rank
function unionByRank(parent: number[], rank: number[], a: number, b: number) {
  const rootA = findPath(parent, a).pop()!;
  const rootB = findPath(parent, b).pop()!;
  if (rootA === rootB) return { parent, rank };
  const newParent = [...parent];
  const newRank = [...rank];
  if (newRank[rootA] < newRank[rootB]) {
    newParent[rootA] = rootB;
  } else if (newRank[rootA] > newRank[rootB]) {
    newParent[rootB] = rootA;
  } else {
    newParent[rootB] = rootA;
    newRank[rootA]++;
  }
  return { parent: newParent, rank: newRank };
}

const treeHeight = (parent: number[], i: number): number => {
  let h = 0, x = i;
  while (parent[x] !== x) { x = parent[x]; h++; }
  return h;
};
export function UnionVerseSim() {
    const game = useSimGame(TOTAL_STAGES, () => {
      setParent(Array.from({ length: N }, (_, i) => i));
      setRank(Array(N).fill(0));
      setUnionsDone(new Set());
      setFindTarget(null);
      setFindPathHighlight([]);
      setChainParent([0,0,1,2,3]); // 1->0, 2->1, 3->2, 4->3 (deep chain)
      setCompressDone(false);
      setRankParentA([0,1,2]);  // tree A height 2
      setRankParentB([0]);       // tree B height 0
      setRankChoice(null);
      setRankResult(null);
      setConnAnswer1(null);
      setConnAnswer2(null);
      setBossPhase("merge");
      setBossParent(Array.from({ length: N }, (_, i) => i));
      setBossRank(Array(N).fill(0));
      setBossStep(0);
      setQuiz1Answer(null);
      setTraversed(0);
    });
  
    // Stage 1 — makeSet
    const [parent, setParent] = useState(Array.from({ length: N }, (_, i) => i));
    const [rank,   setRank]   = useState(Array(N).fill(0));
  
    // Stage 2 — Union + Find
    const [unionsDone, setUnionsDone]       = useState<Set<string>>(new Set());
    const [findTarget, setFindTarget]       = useState<number | null>(null);
    const [findPathHighlight, setFindPathHighlight] = useState<number[]>([]);
  
    // Stage 3 — Slow chain
    const [chainParent, setChainParent] = useState([0,0,1,2,3]); // index i's parent
  
    // Stage 4 — Path compression
    const [compressDone, setCompressDone] = useState(false);
  
    // Stage 5 — Union by Rank
    const [rankParentA, setRankParentA] = useState([0,1,2]); // chain 0<-1<-2 (height 2)
    const [rankParentB, setRankParentB] = useState([0]);     // single node (height 0)
    const [rankChoice,  setRankChoice]  = useState<"A_under_B"|"B_under_A"|null>(null);
    const [rankResult,  setRankResult]  = useState<"correct"|"wrong"|null>(null);
  
    // Stage 6 — Connectivity + Boss
    const [connAnswer1, setConnAnswer1] = useState<string | null>(null);
    const [connAnswer2, setConnAnswer2] = useState<string | null>(null);
    const [bossPhase, setBossPhase] = useState<"merge"|"quiz"|"done">("merge");
    const [bossParent, setBossParent] = useState(Array.from({ length: N }, (_, i) => i));
    const [bossRank,   setBossRank]   = useState(Array(N).fill(0));
    const [bossStep,   setBossStep]   = useState(0);
    const [quiz1Answer, setQuiz1Answer] = useState<string | null>(null);
    const [traversed, setTraversed] = useState(0);
    const renderStage1 = () => {
        const initialized = parent.every((p, i) => p === i) && parent.length === N;
      
        return (
          <StageWrapper>
            <h2 className="text-3xl font-bold text-primary mb-2">🌌 Birth of Isolated Worlds</h2>
            <p className="text-muted-foreground mb-6 max-w-md text-center">
              Five nodes float independently. Each begins as its own leader: <code>parent[i] = i</code>.
            </p>
      
            {/* Floating orbs */}
            <div className="flex gap-6 mb-6 flex-wrap justify-center">
              {Array.from({ length: N }, (_, i) => (
                <div key={i} className="flex flex-col items-center gap-1">
                  <div className="w-14 h-14 rounded-full border-2 border-primary/40 bg-primary/5 flex items-center justify-center font-mono text-lg animate-pulse">
                    {i}
                  </div>
                  <span className="text-xs text-muted-foreground font-mono">parent[{i}] = {i}</span>
                </div>
              ))}
            </div>
      
            <button
              onClick={() => { game.addXp(50, "✨ Set Creator"); game.nextStage(); }}
              className="px-8 py-3 bg-primary text-primary-foreground font-bold rounded-xl flex items-center gap-2"
            >
              <Globe className="size-5" /> Initialize Universe →
            </button>
          </StageWrapper>
        );
      };
      const renderStage2 = () => {
        const REQUIRED = ["0-1", "2-3"];
        const allUnionsDone = REQUIRED.every(u => unionsDone.has(u));
      
        const doUnion = (a: number, b: number) => {
          const { parent: newP, rank: newR } = unionByRank(parent, rank, a, b);
          setParent(newP);
          setRank(newR);
          setUnionsDone(prev => new Set([...prev, `${a}-${b}`]));
        };
      
        const handleFind = (x: number) => {
          setFindTarget(x);
          setFindPathHighlight(findPath(parent, x));
        };
      
        return (
          <StageWrapper>
            <h3 className="text-xl font-bold text-primary mb-2">🔗 First Connections</h3>
            <p className="text-muted-foreground text-sm mb-6 max-w-md text-center">
              Perform <code>Union(0,1)</code> and <code>Union(2,3)</code> to merge worlds. Then click a node to <code>Find()</code> its root.
            </p>
      
            {/* Node display with tree edges */}
            <div className="flex gap-6 mb-6 flex-wrap justify-center">
              {Array.from({ length: N }, (_, i) => (
                <div
                  key={i}
                  onClick={() => handleFind(i)}
                  className={`w-14 h-14 rounded-full border-2 flex items-center justify-center font-mono text-lg cursor-pointer transition-all
                    ${findPathHighlight.includes(i) ? "border-yellow-500 bg-yellow-500/10 text-yellow-300"
                      : parent[i] !== i ? "border-green-500 bg-green-500/10 text-green-400"
                      : "border-primary/40 hover:border-primary"}`}
                >
                  {i}
                </div>
              ))}
            </div>
      
            <p className="text-xs text-muted-foreground font-mono mb-4">
              parent = [{parent.join(", ")}]
            </p>
      
            {/* Union buttons */}
            <div className="flex gap-3 mb-4">
              {REQUIRED.map(u => {
                const [a, b] = u.split("-").map(Number);
                const done = unionsDone.has(u);
                return (
                  <button
                    key={u}
                    onClick={() => doUnion(a, b)}
                    disabled={done}
                    className={`px-4 py-2 rounded-lg border text-sm font-mono transition-all
                      ${done ? "border-green-500 bg-green-500/10 text-green-400 cursor-default" : "border-primary/40 hover:border-primary text-primary"}`}
                  >
                    {done ? `✅ Union(${a},${b})` : `Union(${a},${b})`}
                  </button>
                );
              })}
            </div>
      
            {findTarget !== null && (
              <p className="text-sm text-yellow-300 font-mono mb-4">
                Find({findTarget}) → path: {findPathHighlight.join(" → ")} → root = {findPathHighlight[findPathHighlight.length-1]}
              </p>
            )}
      
            {allUnionsDone && findTarget !== null && (
              <button
                onClick={() => { game.addXp(100, "🏆 Root Finder"); game.nextStage(); }}
                className="px-8 py-3 bg-primary text-primary-foreground font-bold rounded-xl"
              >
                ⚠️ The Slow Network Problem →
              </button>
            )}
          </StageWrapper>
        );
      };
      const renderStage3 = () => {
        const path = findPath(chainParent, 4);
      
        return (
          <StageWrapper>
            <h3 className="text-xl font-bold text-red-400 mb-2">🐌 The Slow Network Problem</h3>
            <p className="text-muted-foreground text-sm mb-6 max-w-md text-center">
              A long chain forms: <code>0 ← 1 ← 2 ← 3 ← 4</code>. Finding node 4 requires traversing every link.
            </p>
      
            {/* Chain visualization */}
            <div className="flex items-center gap-1 mb-6 flex-wrap justify-center">
              {[0,1,2,3,4].map((node, idx) => (
                <div key={node} className="flex items-center gap-1">
                  <div className={`w-12 h-12 rounded-full border-2 flex items-center justify-center font-mono text-sm transition-all
                    ${idx <= traversed ? "border-red-500 bg-red-500/10 text-red-400" : "border-muted-foreground"}`}>
                    {node}
                  </div>
                  {idx < 4 && <span className="text-muted-foreground text-xs">←</span>}
                </div>
              ))}
            </div>
      
            {traversed < path.length - 1 ? (
              <button
                onClick={() => setTraversed(t => t + 1)}
                className="px-6 py-2 bg-red-500/20 border border-red-500/40 text-red-400 rounded-lg text-sm mb-4"
              >
                🐢 Step Find(4): traverse next link
              </button>
            ) : (
              <>
                <p className="text-red-400 text-sm mb-4">
                  ⏳ Find(4) took {path.length - 1} steps — this is O(n) in the worst case!
                </p>
                <button
                  onClick={() => { game.addXp(50, "⚠️ Bottleneck Spotted"); game.nextStage(); }}
                  className="px-8 py-3 bg-primary text-primary-foreground font-bold rounded-xl"
                >
                  ⚡ Discover Path Compression →
                </button>
              </>
            )}
          </StageWrapper>
        );
      };
      const renderStage4 = () => {
        const displayParent = compressDone ? Array(N).fill(0) : chainParent;
        const path = findPath(chainParent, 4);
      
        const runCompression = () => {
          const { newParent } = findWithCompression(chainParent, 4);
          setChainParent(newParent);
          setCompressDone(true);
        };
      
        return (
          <StageWrapper>
            <h3 className="text-xl font-bold text-primary mb-2">⚡ Path Compression Power</h3>
            <p className="text-muted-foreground text-sm mb-6 max-w-md text-center">
              When <code>Find(4)</code> runs, every node on the path snaps directly to the root — flattening the tree.
            </p>
      
            {/* Before/after visualization */}
            <div className="flex flex-col items-center gap-4 mb-6">
              <p className="text-xs text-muted-foreground font-mono">parent = [{displayParent.join(", ")}]</p>
              <div className="flex gap-3 flex-wrap justify-center">
                {Array.from({ length: N }, (_, i) => (
                  <div key={i} className={`w-12 h-12 rounded-full border-2 flex items-center justify-center font-mono text-sm transition-all duration-700
                    ${compressDone
                      ? (i === 0 ? "border-yellow-500 bg-yellow-500/10 text-yellow-300" : "border-green-500 bg-green-500/10 text-green-400")
                      : path.includes(i) ? "border-primary/60" : "border-muted-foreground"}`}>
                    {i}
                  </div>
                ))}
              </div>
              {compressDone && <p className="text-green-400 text-xs">All nodes now point directly to root 0 — future Find() = O(1)!</p>}
            </div>
      
            {!compressDone ? (
              <button onClick={runCompression} className="px-6 py-2 bg-primary/20 text-primary rounded-lg text-sm mb-4">
                🔍 Find(4) with Path Compression
              </button>
            ) : (
              <button
                onClick={() => { game.addXp(150, "⚡ Path Optimizer"); game.nextStage(); }}
                className="px-8 py-3 bg-primary text-primary-foreground font-bold rounded-xl"
              >
                ⚖️ Union by Rank Strategy →
              </button>
            )}
          </StageWrapper>
        );
      };
      const renderStage5 = () => {
        const heightA = rankParentA.length - 1; // chain length 0<-1<-2 → height 2
        const heightB = rankParentB.length - 1; // height 0
      
        const handleChoice = (choice: "A_under_B"|"B_under_A") => {
          setRankChoice(choice);
          // Correct: smaller tree (B, height 0) attaches under larger tree (A, height 2) → B_under_A
          setRankResult(choice === "B_under_A" ? "correct" : "wrong");
        };
      
        return (
          <StageWrapper>
            <h3 className="text-xl font-bold text-primary mb-2">⚖️ Union by Rank Strategy</h3>
            <p className="text-muted-foreground text-sm mb-6 max-w-md text-center">
              Always attach the <strong>smaller</strong> (lower-rank) tree under the <strong>larger</strong> one to keep structures shallow.
            </p>
      
            {/* Two trees */}
            <div className="flex gap-8 mb-6">
              <div className="flex flex-col items-center">
                <p className="text-xs text-muted-foreground mb-2">Tree A (height {heightA})</p>
                <div className="flex flex-col items-center gap-1">
                  {[2,1,0].map(n => (
                    <div key={n} className="w-10 h-10 rounded-full border-2 border-primary/40 flex items-center justify-center font-mono text-sm">{n}</div>
                  ))}
                </div>
              </div>
              <div className="flex flex-col items-center">
                <p className="text-xs text-muted-foreground mb-2">Tree B (height {heightB})</p>
                <div className="w-10 h-10 rounded-full border-2 border-primary/40 flex items-center justify-center font-mono text-sm">3</div>
              </div>
            </div>
      
            <p className="text-sm text-muted-foreground mb-3">Which tree should attach under the other?</p>
            <div className="flex gap-3 mb-4">
              <button
                onClick={() => handleChoice("A_under_B")}
                className={`px-4 py-2 rounded-lg border text-sm transition-all
                  ${rankChoice === "A_under_B"
                    ? (rankResult === "correct" ? "border-green-500 bg-green-500/10 text-green-400" : "border-red-500 bg-red-500/10 text-red-400")
                    : "border-muted-foreground hover:border-primary"}`}
              >
                Attach A (taller) under B
              </button>
              <button
                onClick={() => handleChoice("B_under_A")}
                className={`px-4 py-2 rounded-lg border text-sm transition-all
                  ${rankChoice === "B_under_A"
                    ? (rankResult === "correct" ? "border-green-500 bg-green-500/10 text-green-400" : "border-red-500 bg-red-500/10 text-red-400")
                    : "border-muted-foreground hover:border-primary"}`}
              >
                Attach B (shorter) under A
              </button>
            </div>
      
            {rankResult === "wrong" && (
              <div className="flex flex-col items-center gap-2 mb-4">
                <p className="text-red-400 text-sm">❌ That makes the tree taller — performance degrades!</p>
                <button onClick={() => { setRankChoice(null); setRankResult(null); }} className="px-5 py-2 bg-red-500/20 border border-red-500/40 text-red-400 rounded-xl text-sm hover:bg-red-500/30 transition-all">
                  🔄 Try Again
                </button>
              </div>
            )}
      
            {rankResult === "correct" && (
              <button
                onClick={() => { game.addXp(150, "🎯 Balanced Builder"); game.nextStage(); }}
                className="px-8 py-3 bg-primary text-primary-foreground font-bold rounded-xl"
              >
                🌐 Final Network Merge →
              </button>
            )}
          </StageWrapper>
        );
      };
      const renderStage6 = () => {
        if (bossPhase === "done") {
          return (
            <CompletionScreen
              missionTitle="🌌 UnionVerse Optimized!"
              missionSubtitle="You built an optimized network using Disjoint Set Union with path compression and union by rank."
              xp={game.xp}
              xpLog={game.xpLog}
              achievements={[
                { icon: <Globe className="size-4" />,   label: "Set Creator" },
                { icon: <Link2 className="size-4" />,   label: "Connector Level 1" },
                { icon: <Search className="size-4" />,  label: "Root Finder" },
                { icon: <Zap className="size-4" />,     label: "Path Compression Master" },
                { icon: <Scale className="size-4" />,   label: "Rank Strategist" },
                { icon: <Network className="size-4" />, label: "Connectivity Expert" },
              ]}
              concepts={[
                { label: "makeSet",          description: "Each node starts as its own root: parent[i] = i." },
                { label: "Union",             description: "Merges two sets by linking one root under another." },
                { label: "Find",              description: "Follows parent pointers until reaching the root." },
                { label: "Path Compression",  description: "Flattens the tree so future finds are nearly O(1)." },
                { label: "Union by Rank",     description: "Attaches the shorter tree under the taller one to stay balanced." },
              ]}
              onReset={game.reset}
            />
          );
        }
      
        // Phase 1: Final merge + connectivity check
        if (bossPhase === "merge") {
          const merged = parent[1] === parent[3] || findPath(parent, 1).pop() === findPath(parent, 3).pop();
          const root0 = findPath(parent, 0).pop();
          const root3 = findPath(parent, 3).pop();
          const root4 = findPath(parent, 4).pop();
          const conn03 = root0 === root3;
          const conn40 = root4 === root0;
      
          const doFinalUnion = () => {
            const { parent: newP, rank: newR } = unionByRank(parent, rank, 1, 3);
            setParent(newP);
            setRank(newR);
          };
      
          return (
            <StageWrapper>
              <h3 className="text-xl font-bold text-primary mb-2">🌐 Final Network Merge & Connectivity Check</h3>
              <p className="text-muted-foreground text-sm mb-6 max-w-md text-center">
                Perform <code>Union(1,3)</code>, then check connectivity between pairs of nodes.
              </p>
      
              {/* Nodes */}
              <div className="flex gap-4 mb-4 flex-wrap justify-center">
                {Array.from({ length: N }, (_, i) => (
                  <div key={i} className={`w-12 h-12 rounded-full border-2 flex items-center justify-center font-mono text-sm
                    ${parent[i] !== i || i === findPath(parent,i).pop() ? "border-green-500 bg-green-500/10 text-green-400" : "border-primary/40"}`}>
                    {i}
                  </div>
                ))}
              </div>
              <p className="text-xs text-muted-foreground font-mono mb-4">parent = [{parent.join(", ")}]</p>
      
              {!merged ? (
                <button onClick={doFinalUnion} className="px-6 py-2 bg-primary/20 text-primary rounded-lg text-sm mb-6">
                  🔗 Union(1,3)
                </button>
              ) : (
                <div className="w-full max-w-md space-y-4 mb-6">
                  <QuizBlock
                    question="Is find(0) == find(3)?"
                    options={[{ label: "✅ TRUE", value: "true" }, { label: "❌ FALSE", value: "false" }]}
                    correctValue={conn03 ? "true" : "false"}
                    selectedValue={connAnswer1}
                    onSelect={setConnAnswer1}
                    correctFeedback={`✅ Correct! Roots are ${conn03 ? "the same" : "different"}.`}
                    wrongFeedback="❌ Trace both nodes to their roots and compare."
                  />
                  {connAnswer1 && connAnswer1 !== (conn03 ? "true" : "false") && (
                    <button onClick={() => setConnAnswer1(null)} className="px-5 py-2 bg-red-500/20 border border-red-500/40 text-red-400 rounded-xl text-sm hover:bg-red-500/30 transition-all">
                      🔄 Try Again
                    </button>
                  )}
      
                  {connAnswer1 === (conn03 ? "true" : "false") && (
                    <>
                      <QuizBlock
                        question="Is find(4) == find(0)?"
                        options={[{ label: "✅ TRUE", value: "true" }, { label: "❌ FALSE", value: "false" }]}
                        correctValue={conn40 ? "true" : "false"}
                        selectedValue={connAnswer2}
                        onSelect={setConnAnswer2}
                        correctFeedback={`✅ Correct! Node 4 is ${conn40 ? "" : "not "}connected to 0.`}
                        wrongFeedback="❌ Node 4 was never unioned with the 0-1-3 group — check its root."
                      />
                      {connAnswer2 && connAnswer2 !== (conn40 ? "true" : "false") && (
                        <button onClick={() => setConnAnswer2(null)} className="px-5 py-2 bg-red-500/20 border border-red-500/40 text-red-400 rounded-xl text-sm hover:bg-red-500/30 transition-all">
                          🔄 Try Again
                        </button>
                      )}
                    </>
                  )}
                </div>
              )}
      
              {connAnswer1 === (conn03 ? "true" : "false") && connAnswer2 === (conn40 ? "true" : "false") && (
                <button
                  onClick={() => { game.addXp(150, "🧠 Connectivity Master"); setBossPhase("quiz"); }}
                  className="px-8 py-3 bg-primary text-primary-foreground font-bold rounded-xl"
                >
                  🧨 Final Boss: Rebuild the Universe →
                </button>
              )}
            </StageWrapper>
          );
        }
      
        // Phase 2: Boss quiz
        if (bossPhase === "quiz") return (
          <StageWrapper>
            <h3 className="text-xl font-bold text-primary mb-6">🧨 Rebuild the Universe — Final Boss</h3>
            <div className="w-full max-w-md space-y-6 mb-8">
              <QuizBlock
                question="Why do path compression and union by rank together give near O(1) operations?"
                options={[
                  { label: "They sort the nodes by value",                                 value: "a" },
                  { label: "They keep trees flat and balanced, minimizing traversal length", value: "b" },
                  { label: "They delete unused nodes from memory",                         value: "c" },
                ]}
                correctValue="b"
                selectedValue={quiz1Answer}
                onSelect={setQuiz1Answer}
                correctFeedback="✅ Correct! Together they bound tree height by the inverse Ackermann function — practically constant: O(α(n))."
                wrongFeedback="❌ Neither sorts nor deletes nodes — they control tree shape to minimize Find() traversal."
              />
      
              {quiz1Answer && quiz1Answer !== "b" && (
                <button onClick={() => setQuiz1Answer(null)} className="px-5 py-2 bg-red-500/20 border border-red-500/40 text-red-400 rounded-xl text-sm hover:bg-red-500/30 transition-all">
                  🔄 Try Again
                </button>
              )}
            </div>
      
            {quiz1Answer === "b" && (
              <button
                onClick={() => { game.addXp(300, "🔗 Connectivity Expert"); setBossPhase("done"); }}
                className="px-8 py-3 bg-primary text-primary-foreground font-bold rounded-xl animate-in zoom-in"
              >
                🎉 Optimize the UnionVerse →
              </button>
            )}
          </StageWrapper>
        );
      };
      return (
        <SimShell
          title="UnionVerse"
          subtitle="The Network Architect's Challenge"
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