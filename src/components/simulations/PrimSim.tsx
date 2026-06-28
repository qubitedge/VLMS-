/**
 * PrimAlgorithmSim.tsx
 * ========================
 * Kingdom of Connections: The Prim Protocol
 * A simulation for learning Prim's MST Algorithm
 */

import { useState, useEffect } from "react";
import { 
  Swords, 
  Zap, 
  Crown, 
  Layers,
  AlertTriangle,
  XCircle,
  CheckCircle
} from "lucide-react";
import {
  useSimGame,
  SimShell,
  StageWrapper,
  QuizBlock,
  CompletionScreen,
} from "@/components/simulations/shared";

// ── Constants ─────────────────────────────────────────────────────────────────
const TOTAL_STAGES = 6;

// Graph representation for demo
interface Edge {
  from: number;
  to: number;
  weight: number;
}

interface Node {
  id: number;
  key: number;
  parent: number | null;
  visited: boolean;
  x: number;
  y: number;
}

const INITIAL_GRAPH: Edge[] = [
  { from: 0, to: 1, weight: 4 },
  { from: 0, to: 2, weight: 2 },
  { from: 1, to: 2, weight: 1 },
  { from: 1, to: 3, weight: 5 },
  { from: 2, to: 3, weight: 8 },
  { from: 2, to: 4, weight: 3 },
  { from: 3, to: 4, weight: 7 },
  { from: 3, to: 5, weight: 6 },
  { from: 4, to: 5, weight: 9 },
];

const NODE_POSITIONS = [
  { x: 200, y: 150 },  // Node 0
  { x: 400, y: 100 },  // Node 1
  { x: 300, y: 250 },  // Node 2
  { x: 500, y: 300 },  // Node 3
  { x: 350, y: 400 },  // Node 4
  { x: 550, y: 450 },  // Node 5
];

export function PrimAlgorithmSim() {
  // ── Game state (required) ────────────────────────────────────────────────
  const game = useSimGame(TOTAL_STAGES, () => {
    resetLocalState();
  });

  // ── Local state ─────────────────────────────────────────────────────────
  const [nodes, setNodes] = useState<Node[]>([]);
  const [mstEdges, setMstEdges] = useState<Edge[]>([]);
  const [minHeap, setMinHeap] = useState<number[]>([]);
  const [quizAnswer, setQuizAnswer] = useState<string | null>(null);
  const [heapQuizAnswer, setHeapQuizAnswer] = useState<string | null>(null);
  const [selectedEdge, setSelectedEdge] = useState<Edge | null>(null);
  const [currentNode, setCurrentNode] = useState<number | null>(null);
  const [showMistake, setShowMistake] = useState<string | null>(null);

  // Initialize nodes
  const resetLocalState = () => {
    const initialNodes: Node[] = Array(6).fill(null).map((_, i) => ({
      id: i,
      key: i === 0 ? 0 : Infinity,
      parent: null,
      visited: i === 0,
      x: NODE_POSITIONS[i].x,
      y: NODE_POSITIONS[i].y,
    }));
    setNodes(initialNodes);
    setMstEdges([]);
    setMinHeap([0]);
    setSelectedEdge(null);
    setCurrentNode(null);
    setShowMistake(null);
    setQuizAnswer(null);
    setHeapQuizAnswer(null);
  };

  // Initialize on mount
  useEffect(() => {
    resetLocalState();
  }, []);

  // Helper: Update key value
  const updateKey = (nodeId: number, newKey: number) => {
    setNodes(prev => prev.map(node => 
      node.id === nodeId ? { ...node, key: newKey } : node
    ));
  };

  // Simulate heap extract min
  const extractMin = () => {
    if (minHeap.length === 0) return;
    const minNode = Math.min(...minHeap);
    setCurrentNode(minNode);
    setMinHeap(prev => prev.filter(n => n !== minNode));
    game.addXp(50, "Extracted minimum node");
  };

  // ── Stage renderers ───────────────────────────────────────────────────────

  /** Stage 1: Story / Theme intro */
  const renderStage1 = () => (
    <StageWrapper>
      <div className="text-center mb-8 max-w-2xl">
        <div className="mb-4">
          <div className="inline-block p-3 bg-primary/10 rounded-full mb-2">
            <Swords className="size-12 text-primary" />
          </div>
        </div>
        <h2 className="text-3xl font-bold text-primary mb-2">Kingdom of Connections</h2>
        <p className="text-muted-foreground text-lg mb-4">The Prim Protocol</p>
        <p className="text-muted-foreground">
          A catastrophic storm has destroyed the energy bridges between your floating islands.
          As Master Architect, you must rebuild the <strong className="text-primary">Minimum Energy Network</strong> 
          to connect all islands using the least total energy!
        </p>
      </div>

      {/* Visual scene - Disconnected network visualization */}
      <div className="relative w-full max-w-3xl h-96 bg-gradient-to-br from-blue-50 to-indigo-100 rounded-xl mb-8 overflow-hidden border border-gray-200">
        <svg className="w-full h-full">
          {/* Draw edges with dim glow */}
          {INITIAL_GRAPH.map((edge, idx) => (
            <g key={idx}>
              <line
                x1={NODE_POSITIONS[edge.from].x}
                y1={NODE_POSITIONS[edge.from].y}
                x2={NODE_POSITIONS[edge.to].x}
                y2={NODE_POSITIONS[edge.to].y}
                stroke="#cbd5e1"
                strokeWidth="2"
                strokeDasharray="5,5"
                className="opacity-50"
              />
              <text
                x={(NODE_POSITIONS[edge.from].x + NODE_POSITIONS[edge.to].x) / 2}
                y={(NODE_POSITIONS[edge.from].y + NODE_POSITIONS[edge.to].y) / 2 - 5}
                fill="#64748b"
                fontSize="12"
                textAnchor="middle"
                className="font-semibold"
              >
                {edge.weight}
              </text>
            </g>
          ))}
          
          {/* Draw nodes */}
          {NODE_POSITIONS.map((pos, idx) => (
            <g key={idx}>
              <circle
                cx={pos.x}
                cy={pos.y}
                r="20"
                fill="#ffffff"
                stroke="#94a3b8"
                strokeWidth="3"
                className="shadow-lg"
              />
              <text
                x={pos.x}
                y={pos.y}
                fill="#1e293b"
                fontSize="14"
                textAnchor="middle"
                dominantBaseline="middle"
                className="font-bold"
              >
                {idx}
              </text>
            </g>
          ))}
        </svg>
        
        {/* Storm lightning animation overlay */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-10 left-20 text-yellow-500 animate-pulse">⚡</div>
          <div className="absolute bottom-20 right-30 text-yellow-500 animate-pulse delay-100">⚡</div>
        </div>
      </div>

      <button
        onClick={() => { game.addXp(100, "Recruit Badge"); game.nextStage(); }}
        className="px-8 py-3 bg-primary text-primary-foreground font-bold rounded-xl flex items-center gap-2 hover:scale-105 transition-transform shadow-md"
      >
        <Swords className="size-5" /> Start Restoration Mission
      </button>
    </StageWrapper>
  );

  /** Stage 2: Core concept visualization + first interaction */
  const renderStage2 = () => (
    <StageWrapper>
      <div className="text-center mb-6 max-w-md">
        <h3 className="text-xl font-bold text-primary mb-1">Choosing the First Island</h3>
        <p className="text-muted-foreground text-sm">
          We begin from an arbitrary node. This becomes the starting point of the MST.
        </p>
      </div>

      {/* Graph visualization with key values */}
      <div className="relative w-full max-w-3xl h-96 bg-gradient-to-br from-blue-50 to-indigo-100 rounded-xl mb-6 border border-gray-200">
        <svg className="w-full h-full">
          {/* Draw edges */}
          {INITIAL_GRAPH.map((edge, idx) => (
            <line
              key={idx}
              x1={NODE_POSITIONS[edge.from].x}
              y1={NODE_POSITIONS[edge.from].y}
              x2={NODE_POSITIONS[edge.to].x}
              y2={NODE_POSITIONS[edge.to].y}
              stroke="#cbd5e1"
              strokeWidth="2"
            />
          ))}
          
          {/* Draw nodes with key values */}
          {nodes.map((node) => (
            <g key={node.id}>
              <circle
                cx={NODE_POSITIONS[node.id].x}
                cy={NODE_POSITIONS[node.id].y}
                r="25"
                fill={node.id === 0 ? "#3b82f6" : node.visited ? "#10b981" : "#ffffff"}
                stroke={node.id === 0 ? "#2563eb" : "#94a3b8"}
                strokeWidth="3"
                className={node.id === 0 ? "animate-pulse" : ""}
              />
              <text
                x={NODE_POSITIONS[node.id].x}
                y={NODE_POSITIONS[node.id].y - 30}
                fill="#1e293b"
                fontSize="12"
                textAnchor="middle"
                className="font-semibold"
              >
                key={node.key === Infinity ? "∞" : node.key}
              </text>
              <text
                x={NODE_POSITIONS[node.id].x}
                y={NODE_POSITIONS[node.id].y}
                fill={node.id === 0 || node.visited ? "white" : "#1e293b"}
                fontSize="14"
                textAnchor="middle"
                dominantBaseline="middle"
                className="font-bold"
              >
                {node.id}
              </text>
            </g>
          ))}
        </svg>
      </div>

      <div className="bg-blue-100 border border-blue-300 rounded-lg p-4 mb-6">
        <p className="text-sm text-blue-800">
          💡 <strong>Prim's Insight:</strong> Start anywhere! Node 0 becomes root with key[0] = 0.
          All other nodes start with infinity.
        </p>
      </div>

      <button
        onClick={() => { game.addXp(150, "Root Node Established"); game.nextStage(); }}
        className="px-8 py-3 bg-primary text-primary-foreground font-bold rounded-xl shadow-md hover:shadow-lg transition-shadow"
      >
        Continue to Control Room →
      </button>
    </StageWrapper>
  );

  /** Stage 3: Deeper concept / common mistake */
  const renderStage3 = () => (
    <StageWrapper>
      <div className="text-center mb-6">
        <h3 className="text-xl font-bold text-primary mb-1">The Min-Heap Control Room</h3>
        <p className="text-muted-foreground text-sm">
          To always pick the best next node, we use a min-heap. It ensures we extract the smallest key efficiently.
        </p>
      </div>

      {/* Min-Heap visualization */}
      <div className="grid grid-cols-2 gap-8 max-w-4xl">
        <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-md">
          <h4 className="font-bold text-lg mb-4 flex items-center gap-2 text-gray-800">
            <Layers className="size-5 text-primary" /> Min-Heap Structure
          </h4>
          <div className="space-y-2">
            {minHeap.map((nodeId, idx) => (
              <div key={idx} className="flex items-center gap-2 p-2 bg-gray-100 rounded border border-gray-200">
                <span className="text-primary font-bold">Node {nodeId}</span>
                <span className="text-xs text-gray-600">key={nodes[nodeId]?.key === Infinity ? "∞" : nodes[nodeId]?.key}</span>
              </div>
            ))}
          </div>
          <button
            onClick={extractMin}
            className="mt-4 w-full px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-bold transition-colors shadow-md"
          >
            Extract Min ⚡
          </button>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-md">
          <h4 className="font-bold text-lg mb-4 flex items-center gap-2 text-gray-800">
            <AlertTriangle className="size-5 text-yellow-600" /> Common Mistake
          </h4>
          <div className="space-y-3">
            <button
              onClick={() => setShowMistake("no-heap")}
              className="w-full p-3 bg-red-50 border border-red-200 rounded-lg text-left hover:bg-red-100 transition-colors"
            >
              <div className="flex items-center gap-2">
                <XCircle className="size-4 text-red-600" />
                <span className="text-sm text-gray-800">❌ Using linear scan instead of heap</span>
              </div>
              {showMistake === "no-heap" && (
                <p className="text-xs text-red-700 mt-2 animate-in slide-in-from-top-1">
                  🐢 Performance drops to O(V²) - very slow for large graphs!
                </p>
              )}
            </button>
          </div>
        </div>
      </div>

      <div className="mt-6 flex gap-4">
        <button
          onClick={() => { game.addXp(200, "Heap Master"); game.nextStage(); }}
          className="px-8 py-3 bg-primary text-primary-foreground font-bold rounded-xl shadow-md hover:shadow-lg transition-shadow"
        >
          Proceed to Network Expansion →
        </button>
      </div>
    </StageWrapper>
  );

  /** Stage 4: Complexity / performance visualization */
  const renderStage4 = () => {
    const handleEdgeClick = (edge: Edge) => {
      setSelectedEdge(edge);
      const neighbor = edge.from === currentNode ? edge.to : edge.from;
      if (currentNode !== null && edge.weight < nodes[neighbor].key) {
        updateKey(neighbor, edge.weight);
        game.addXp(50, "Updated key value");
        setNodes(prev => prev.map(node =>
          node.id === neighbor ? { ...node, visited: true } : node
        ));
      }
    };

    return (
      <StageWrapper>
        <div className="text-center mb-6">
          <h3 className="text-xl font-bold text-primary mb-1">Expanding the Network</h3>
          <p className="text-muted-foreground text-sm">
            We examine all neighbors. If a connection is cheaper than the current key, we update it.
          </p>
        </div>

        {/* Graph with interaction */}
        <div className="relative w-full max-w-3xl h-96 bg-gradient-to-br from-blue-50 to-indigo-100 rounded-xl mb-6 border border-gray-200">
          <svg className="w-full h-full cursor-pointer">
            {INITIAL_GRAPH.map((edge, idx) => (
              <g key={idx} onClick={() => handleEdgeClick(edge)}>
                <line
                  x1={NODE_POSITIONS[edge.from].x}
                  y1={NODE_POSITIONS[edge.from].y}
                  x2={NODE_POSITIONS[edge.to].x}
                  y2={NODE_POSITIONS[edge.to].y}
                  stroke={selectedEdge === edge ? "#10b981" : "#cbd5e1"}
                  strokeWidth={selectedEdge === edge ? "4" : "2"}
                  className="cursor-pointer hover:stroke-green-500 transition-colors"
                />
                <text
                  x={(NODE_POSITIONS[edge.from].x + NODE_POSITIONS[edge.to].x) / 2}
                  y={(NODE_POSITIONS[edge.from].y + NODE_POSITIONS[edge.to].y) / 2 - 5}
                  fill="#64748b"
                  fontSize="12"
                  textAnchor="middle"
                  className="font-semibold"
                >
                  {edge.weight}
                </text>
              </g>
            ))}
            
            {nodes.map((node) => (
              <circle
                key={node.id}
                cx={NODE_POSITIONS[node.id].x}
                cy={NODE_POSITIONS[node.id].y}
                r="25"
                fill={node.visited ? "#10b981" : "#ffffff"}
                stroke={currentNode === node.id ? "#3b82f6" : "#94a3b8"}
                strokeWidth={currentNode === node.id ? "4" : "2"}
              />
            ))}
          </svg>
        </div>

        {/* Performance comparison */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-green-50 border border-green-200 rounded-lg p-3">
            <div className="flex items-center gap-2 mb-2">
              <Zap className="size-4 text-green-600" />
              <span className="font-bold text-sm text-gray-800">With Min-Heap</span>
            </div>
            <p className="text-xs text-green-700">O((V+E) log V) ⚡ Fast</p>
          </div>
          <div className="bg-red-50 border border-red-200 rounded-lg p-3">
            <div className="flex items-center gap-2 mb-2">
              <AlertTriangle className="size-4 text-red-600" />
              <span className="font-bold text-sm text-gray-800">Without Heap</span>
            </div>
            <p className="text-xs text-red-700">O(V²) 🐢 Slow</p>
          </div>
        </div>

        <button
          onClick={() => { game.addXp(150, "Network Growing"); game.nextStage(); }}
          className="px-8 py-3 bg-primary text-primary-foreground font-bold rounded-xl shadow-md hover:shadow-lg transition-shadow"
        >
          Continue to Challenges →
        </button>
      </StageWrapper>
    );
  };

  /** Stage 5: Mini challenges (quiz, predict, match) */
  const renderStage5 = () => {
    const allChallengesComplete = quizAnswer === "greedy" && heapQuizAnswer === "2";
    
    return (
      <StageWrapper>
        <h3 className="text-xl font-bold text-primary mb-6 text-center">Mini Challenges</h3>

        <div className="w-full max-w-2xl space-y-6 mb-8">
          {/* Challenge 1: Edge Selection Quiz */}
          <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-md">
            <QuizBlock
              question="In Prim's algorithm, which edge should be chosen next when building the MST?"
              options={[
                { label: "The smallest edge anywhere in the graph", value: "anywhere" },
                { label: "The smallest edge connecting the current tree to a new node", value: "greedy" },
                { label: "The largest edge connecting to the tree", value: "largest" },
                { label: "Any random edge", value: "random" },
              ]}
              correctValue="greedy"
              selectedValue={quizAnswer}
              onSelect={setQuizAnswer}
              correctFeedback="✅ Correct! Prim's algorithm greedily picks the minimum edge that connects the current MST to a new vertex."
              wrongFeedback="❌ Not quite! Prim always picks the smallest edge from the tree to an outside node - that's the greedy choice!"
            />
          </div>

          {/* Challenge 2: Heap Fix Exercise */}
          <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-md">
            <h4 className="font-bold mb-3 text-gray-800">Heap Challenge: Fix the Order</h4>
            <div className="space-y-2">
              <div className="flex items-center gap-2 p-2 bg-gray-100 rounded border border-gray-200">
                <span className="text-sm text-gray-800">Current heap: [Node 2(key=8), Node 0(key=2), Node 1(key=4)]</span>
              </div>
              <button
                onClick={() => {
                  setMinHeap([0, 1, 2]);
                  game.addXp(100, "Heap Fixed!");
                }}
                className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 transition-colors shadow-md"
              >
                Fix Heap (min should be first)
              </button>
            </div>
          </div>

          {/* Challenge 3: Predict Key Update */}
          <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-md">
            <QuizBlock
              question="If we're at Node 0 (key=0) and see an edge to Node 2 with weight 2, what happens to Node 2's key?"
              options={[
                { label: "Stays at Infinity", value: "infinity" },
                { label: "Updates to 2", value: "2" },
                { label: "Updates to 0", value: "0" },
                { label: "Becomes negative", value: "negative" },
              ]}
              correctValue="2"
              selectedValue={heapQuizAnswer}
              onSelect={setHeapQuizAnswer}
              correctFeedback="✅ Correct! Since 2 < Infinity, we update key[2] = 2"
              wrongFeedback="❌ Hint: We always update to the smaller weight!"
            />
          </div>
        </div>

        {allChallengesComplete && (
          <button
            onClick={() => { game.addXp(300, "Challenge Complete - Prim Master!"); game.nextStage(); }}
            className="px-8 py-3 bg-primary text-primary-foreground font-bold rounded-xl animate-in zoom-in shadow-lg"
          >
            Face Final Boss 👑
          </button>
        )}
      </StageWrapper>
    );
  };

  /** Stage 6: Completion */
  const renderStage6 = () => {
    const totalWeight = mstEdges.reduce((sum, edge) => sum + edge.weight, 0);
    
    return (
      <CompletionScreen
        missionTitle="Kingdom Restored! 👑"
        missionSubtitle={`You successfully connected all islands with minimum total energy: ${totalWeight || 16} units`}
        xp={game.xp}
        xpLog={game.xpLog}
        achievements={[
          { icon: <Zap className="size-4" />, label: "Greedy Thinker - Made optimal choices" },
          { icon: <Layers className="size-4" />, label: "Heap Master - Used min-heap efficiently" },
          { icon: <Crown className="size-4" />, label: "MST Architect - Built perfect network" },
        ]}
        concepts={[
          { label: "Greedy Algorithm", description: "Always pick the locally optimal choice" },
          { label: "Min-Heap Optimization", description: "O((V+E) log V) time complexity" },
          { label: "Key & Parent Arrays", description: "Track minimum edges and build the MST" },
          { label: "MST Properties", description: "Connects all nodes with minimum total weight" },
        ]}
        onReset={game.reset}
      />
    );
  };

  // ── Render ────────────────────────────────────────────────────────────────
  return (
    <SimShell
      title="Kingdom of Connections"
      subtitle="Prim's Algorithm Simulation Lab"
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