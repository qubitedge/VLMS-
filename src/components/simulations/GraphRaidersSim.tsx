/**
 * GraphRaidersSim.tsx
 * ========================
 * Graph Raiders: The Labyrinth of Nodes
 * A simulation for learning BFS and DFS Graph Traversal
 */

import { useState, useEffect } from "react";
import { 
    Map, 
    Waves, 
    Telescope, 
    Cpu,
    Shield,
    Globe,
    Target,
    GitBranch,
    Layers,
    Activity,
    Zap,
    Crown,
    AlertTriangle,
    Eye,
    Move,
    ArrowRight,
    XCircle,
    CheckCircle,
    Users,
    Route,
    RefreshCw,
    Box,        
    Package     
  } from "lucide-react";
import {
  useSimGame,
  SimShell,
  StageWrapper,
  QuizBlock,
  CompletionScreen,
} from "@/components/simulations/shared";

// ── Constants ─────────────────────────────────────────────────────────────────
const TOTAL_STAGES = 7;

// Graph structure
interface Node {
  id: number;
  label: string;
  x: number;
  y: number;
  visited: boolean;
  distance: number | null;
}

interface Edge {
  from: number;
  to: number;
}

interface AdjacencyList {
  [key: number]: number[];
}

// Default graph for demonstration
const DEFAULT_NODES: Node[] = [
  { id: 0, label: "A", x: 200, y: 150, visited: false, distance: null },
  { id: 1, label: "B", x: 350, y: 100, visited: false, distance: null },
  { id: 2, label: "C", x: 350, y: 250, visited: false, distance: null },
  { id: 3, label: "D", x: 500, y: 150, visited: false, distance: null },
  { id: 4, label: "E", x: 500, y: 300, visited: false, distance: null },
  { id: 5, label: "F", x: 650, y: 200, visited: false, distance: null },
];

const DEFAULT_EDGES: Edge[] = [
  { from: 0, to: 1 },
  { from: 0, to: 2 },
  { from: 1, to: 3 },
  { from: 2, to: 3 },
  { from: 2, to: 4 },
  { from: 3, to: 5 },
  { from: 4, to: 5 },
];

// Graph with cycles for Stage 5
const CYCLE_GRAPH_NODES: Node[] = [
  { id: 0, label: "A", x: 200, y: 200, visited: false, distance: null },
  { id: 1, label: "B", x: 350, y: 150, visited: false, distance: null },
  { id: 2, label: "C", x: 350, y: 300, visited: false, distance: null },
  { id: 3, label: "D", x: 500, y: 200, visited: false, distance: null },
];

const CYCLE_GRAPH_EDGES: Edge[] = [
  { from: 0, to: 1 },
  { from: 1, to: 2 },
  { from: 2, to: 0 }, // Creates cycle
  { from: 1, to: 3 },
];

// Disconnected graph for Stage 6
const DISCONNECTED_NODES: Node[] = [
  { id: 0, label: "A", x: 150, y: 200, visited: false, distance: null },
  { id: 1, label: "B", x: 300, y: 150, visited: false, distance: null },
  { id: 2, label: "C", x: 300, y: 300, visited: false, distance: null },
  { id: 3, label: "D", x: 550, y: 200, visited: false, distance: null },
  { id: 4, label: "E", x: 700, y: 150, visited: false, distance: null },
  { id: 5, label: "F", x: 700, y: 300, visited: false, distance: null },
];

const DISCONNECTED_EDGES: Edge[] = [
  { from: 0, to: 1 },
  { from: 0, to: 2 },
  { from: 1, to: 2 },
  { from: 3, to: 4 },
  { from: 3, to: 5 },
  { from: 4, to: 5 },
];

export function GraphRaidersSim() {
  // ── Game state (required) ────────────────────────────────────────────────
  const game = useSimGame(TOTAL_STAGES, () => {
    resetLocalState();
  });

  // ── Local state ─────────────────────────────────────────────────────────
  const [nodes, setNodes] = useState<Node[]>(DEFAULT_NODES);
  const [edges, setEdges] = useState<Edge[]>(DEFAULT_EDGES);
  const [adjacencyList, setAdjacencyList] = useState<AdjacencyList>({});
  const [traversalOrder, setTraversalOrder] = useState<number[]>([]);
  const [queue, setQueue] = useState<number[]>([]);
  const [stack, setStack] = useState<number[]>([]);
  const [useVisited, setUseVisited] = useState<boolean>(true);
  const [currentNode, setCurrentNode] = useState<number | null>(null);
  const [isTraversing, setIsTraversing] = useState<boolean>(false);
  const [bfsStepIndex, setBfsStepIndex] = useState<number>(0);
  const [dfsStepIndex, setDfsStepIndex] = useState<number>(0);
  const [sourceNode, setSourceNode] = useState<number>(0);
  const [targetNode, setTargetNode] = useState<number>(5);
  const [shortestPath, setShortestPath] = useState<number[]>([]);
  const [quizAnswer, setQuizAnswer] = useState<string | null>(null);
  const [bfsQuizAnswer, setBfsQuizAnswer] = useState<string | null>(null);
  const [dfsQuizAnswer, setDfsQuizAnswer] = useState<string | null>(null);
  const [components, setComponents] = useState<number[][]>([]);
  const [showMistake, setShowMistake] = useState<string | null>(null);
  const [manualMode, setManualMode] = useState<boolean>(false);

  // Build adjacency list from edges
  const buildAdjacencyList = (nodesList: Node[], edgesList: Edge[]) => {
    const list: AdjacencyList = {};
    nodesList.forEach(node => { list[node.id] = []; });
    edgesList.forEach(edge => {
      list[edge.from].push(edge.to);
      list[edge.to].push(edge.from);
    });
    return list;
  };

  // Reset local state
  const resetLocalState = () => {
    const resetNodes = DEFAULT_NODES.map(n => ({ ...n, visited: false, distance: null }));
    setNodes(resetNodes);
    setEdges(DEFAULT_EDGES);
    setAdjacencyList(buildAdjacencyList(resetNodes, DEFAULT_EDGES));
    setTraversalOrder([]);
    setQueue([]);
    setStack([]);
    setCurrentNode(null);
    setIsTraversing(false);
    setBfsStepIndex(0);
    setDfsStepIndex(0);
    setShortestPath([]);
    setQuizAnswer(null);
    setBfsQuizAnswer(null);
    setDfsQuizAnswer(null);
    setShowMistake(null);
  };

  // Initialize on mount
  useEffect(() => {
    resetLocalState();
  }, []);

  // Update adjacency list when nodes/edges change
  useEffect(() => {
    setAdjacencyList(buildAdjacencyList(nodes, edges));
  }, [nodes, edges]);

  // BFS algorithm visualization
  const runBFS = (startNode: number) => {
    const visited = new Set<number>();
    const queue_list: number[] = [startNode];
    const order: number[] = [];
    const distances: { [key: number]: number } = { [startNode]: 0 };
    
    visited.add(startNode);
    
    while (queue_list.length > 0) {
      const node = queue_list.shift()!;
      order.push(node);
      
      adjacencyList[node].forEach(neighbor => {
        if (!visited.has(neighbor)) {
          visited.add(neighbor);
          queue_list.push(neighbor);
          distances[neighbor] = distances[node] + 1;
        }
      });
    }
    
    return { order, distances };
  };

  // DFS algorithm visualization (recursive)
  const runDFS = (startNode: number): number[] => {
    const visited = new Set<number>();
    const order: number[] = [];
    
    const dfs = (node: number) => {
      visited.add(node);
      order.push(node);
      
      adjacencyList[node].forEach(neighbor => {
        if (!visited.has(neighbor)) {
          dfs(neighbor);
        }
      });
    };
    
    dfs(startNode);
    return order;
  };

  // Find connected components
  const findComponents = () => {
    const visited = new Set<number>();
    const components_list: number[][] = [];
    
    nodes.forEach(node => {
      if (!visited.has(node.id)) {
        const component: number[] = [];
        const queue_list = [node.id];
        visited.add(node.id);
        
        while (queue_list.length > 0) {
          const current = queue_list.shift()!;
          component.push(current);
          
          adjacencyList[current].forEach(neighbor => {
            if (!visited.has(neighbor)) {
              visited.add(neighbor);
              queue_list.push(neighbor);
            }
          });
        }
        components_list.push(component);
      }
    });
    
    return components_list;
  };

  // Find shortest path using BFS
  const findShortestPath = (start: number, target: number) => {
    const visited = new Set<number>();
    const queue_list: number[] = [start];
    const parent: { [key: number]: number | null } = { [start]: null };
    
    visited.add(start);
    
    while (queue_list.length > 0) {
      const node = queue_list.shift()!;
      
      if (node === target) {
        // Reconstruct path
        const path: number[] = [];
        let current: number | null = node;
        while (current !== null) {
          path.unshift(current);
          current = parent[current];
        }
        return path;
      }
      
      adjacencyList[node].forEach(neighbor => {
        if (!visited.has(neighbor)) {
          visited.add(neighbor);
          parent[neighbor] = node;
          queue_list.push(neighbor);
        }
      });
    }
    
    return [];
  };

  // Handle BFS step-by-step
  const bfsStep = () => {
    if (bfsStepIndex === 0) {
      setQueue([0]);
      setTraversalOrder([]);
    }
    // Implementation would continue here
    setBfsStepIndex(prev => prev + 1);
  };

  // ── Stage renderers ───────────────────────────────────────────────────────

  /** Stage 1: "Build the Labyrinth" */
  const renderStage1 = () => (
    <StageWrapper>
      <div className="text-center mb-8 max-w-2xl">
        <div className="mb-4">
          <div className="inline-block p-3 bg-primary/10 rounded-full mb-2">
            <Map className="size-12 text-primary" />
          </div>
        </div>
        <h2 className="text-3xl font-bold text-primary mb-2">Graph Raiders</h2>
        <p className="text-muted-foreground text-lg mb-4">The Labyrinth of Nodes</p>
        <p className="text-muted-foreground">
          You are a <strong className="text-primary">Graph Explorer Agent</strong> trapped inside a mysterious digital labyrinth.
          Each room is a <strong>node</strong>, each corridor an <strong>edge</strong>.
          Master <strong className="text-blue-600">BFS (The Wave Spell)</strong> and{" "}
          <strong className="text-purple-600">DFS (The Dive Spell)</strong> to escape!
        </p>
      </div>

      {/* Interactive Graph Builder */}
      <div className="relative w-full max-w-4xl h-96 bg-gradient-to-br from-blue-50 to-indigo-100 rounded-xl mb-6 border border-gray-200">
        <svg className="w-full h-full">
          {/* Draw edges */}
          {edges.map((edge, idx) => (
            <line
              key={idx}
              x1={nodes[edge.from].x}
              y1={nodes[edge.from].y}
              x2={nodes[edge.to].x}
              y2={nodes[edge.to].y}
              stroke="#94a3b8"
              strokeWidth="3"
              className="cursor-pointer hover:stroke-blue-500 transition-colors"
            />
          ))}
          
          {/* Draw nodes */}
          {nodes.map((node) => (
            <g key={node.id}>
              <circle
                cx={node.x}
                cy={node.y}
                r="25"
                fill="#ffffff"
                stroke="#3b82f6"
                strokeWidth="3"
                className="cursor-pointer hover:shadow-lg transition-shadow"
              />
              <text
                x={node.x}
                y={node.y}
                fill="#1e293b"
                fontSize="16"
                textAnchor="middle"
                dominantBaseline="middle"
                className="font-bold"
              >
                {node.label}
              </text>
            </g>
          ))}
        </svg>
      </div>

      {/* Adjacency List Panel */}
      <div className="bg-white rounded-lg border border-gray-200 p-4 mb-6 shadow-md">
        <h4 className="font-bold text-gray-800 mb-2 flex items-center gap-2">
          <Layers className="size-4" /> Adjacency List
        </h4>
        <div className="grid grid-cols-3 gap-2 text-sm">
          {Object.entries(adjacencyList).map(([node, neighbors]) => (
            <div key={node} className="font-mono">
              <span className="font-bold text-primary">Node {nodes[parseInt(node)]?.label}:</span>{" "}
              [{neighbors.map((n: number) => nodes[n]?.label).join(", ")}]
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={() => { game.addXp(100, "Graph Architect"); game.nextStage(); }}
        className="px-8 py-3 bg-primary text-primary-foreground font-bold rounded-xl flex items-center gap-2 shadow-md hover:shadow-lg transition-all"
      >
        <Map className="size-5" /> Build Labyrinth
      </button>
    </StageWrapper>
  );

  /** Stage 2: "BFS – The Wave Spell" */
  const renderStage2 = () => (
    <StageWrapper>
      <div className="text-center mb-6">
        <h3 className="text-xl font-bold text-primary mb-1 flex items-center justify-center gap-2">
          <Waves className="size-6" /> BFS – The Wave Spell
        </h3>
        <p className="text-muted-foreground text-sm">
          BFS explores neighbors first. Like ripples in water, it spreads level by level using a <strong>Queue</strong>.
        </p>
      </div>

      {/* BFS Visualization */}
      <div className="relative w-full max-w-4xl h-80 bg-gradient-to-br from-blue-50 to-indigo-100 rounded-xl mb-4 border border-gray-200">
        <svg className="w-full h-full">
          {edges.map((edge, idx) => (
            <line
              key={idx}
              x1={nodes[edge.from].x}
              y1={nodes[edge.from].y}
              x2={nodes[edge.to].x}
              y2={nodes[edge.to].y}
              stroke="#cbd5e1"
              strokeWidth="2"
            />
          ))}
          
          {nodes.map((node) => (
            <g key={node.id}>
              <circle
                cx={node.x}
                cy={node.y}
                r="25"
                fill={traversalOrder.includes(node.id) ? "#10b981" : "#ffffff"}
                stroke={currentNode === node.id ? "#3b82f6" : "#94a3b8"}
                strokeWidth={currentNode === node.id ? "4" : "2"}
                className="transition-all"
              />
              <text
                x={node.x}
                y={node.y}
                fill={traversalOrder.includes(node.id) ? "white" : "#1e293b"}
                fontSize="14"
                textAnchor="middle"
                dominantBaseline="middle"
                className="font-bold"
              >
                {node.label}
              </text>
              {node.distance !== null && node.distance !== undefined && (
                <text
                  x={node.x}
                  y={node.y - 30}
                  fill="#3b82f6"
                  fontSize="11"
                  textAnchor="middle"
                  className="font-semibold"
                >
                  d={node.distance}
                </text>
              )}
            </g>
          ))}
        </svg>
      </div>

      {/* Queue Visualization */}
      <div className="bg-white rounded-lg border border-gray-200 p-4 mb-4 shadow-md">
        <div className="flex items-center gap-2 mb-2">
          <div className="font-bold text-gray-800">Queue:</div>
          <div className="flex gap-2">
            {queue.map((nodeId, idx) => (
              <div key={idx} className="px-3 py-1 bg-blue-100 border border-blue-300 rounded-lg text-sm font-mono">
                {nodes[nodeId]?.label}
              </div>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="font-bold text-gray-800">Visited Order:</div>
          <div className="flex gap-1">
            {traversalOrder.map((nodeId, idx) => (
              <span key={idx} className="px-2 py-1 bg-green-100 rounded text-sm font-mono">
                {nodes[nodeId]?.label}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="flex gap-4 mb-6">
        <button
          onClick={() => {
            const { order, distances } = runBFS(0);
            setTraversalOrder(order);
            setNodes(prev => prev.map(node => ({
              ...node,
              distance: distances[node.id] ?? null,
              visited: order.includes(node.id)
            })));
            game.addXp(100, "Wave Master");
          }}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg font-bold shadow-md hover:bg-blue-700 transition-colors"
        >
          Run BFS Wave 🌊
        </button>
        <button
          onClick={bfsStep}
          className="px-6 py-2 bg-gray-600 text-white rounded-lg font-bold shadow-md hover:bg-gray-700 transition-colors"
        >
          Step by Step
        </button>
      </div>

      <QuizBlock
        question="After visiting Node A (0), which nodes will be visited next in BFS order?"
        options={[
          { label: "B and C (1 and 2)", value: "bc" },
          { label: "Only B (1)", value: "b" },
          { label: "D and E (3 and 4)", value: "de" },
          { label: "F (5)", value: "f" },
        ]}
        correctValue="bc"
        selectedValue={bfsQuizAnswer}
        onSelect={setBfsQuizAnswer}
        correctFeedback="✅ Correct! BFS visits all neighbors at the current level before going deeper."
        wrongFeedback="❌ Remember: BFS explores all adjacent nodes first (level by level)!"
      />

      {bfsQuizAnswer === "bc" && (
        <button
          onClick={() => { game.addXp(150, "BFS Master"); game.nextStage(); }}
          className="mt-4 px-8 py-3 bg-primary text-primary-foreground font-bold rounded-xl animate-in zoom-in"
        >
          Learn Deep Dive Spell →
        </button>
      )}
    </StageWrapper>
  );

  /** Stage 3: "DFS – The Dive Spell (Recursive)" */
  const renderStage3 = () => {
    const runDFSRecursive = () => {
      const order = runDFS(0);
      setTraversalOrder(order);
      setNodes(prev => prev.map(node => ({
        ...node,
        visited: order.includes(node.id)
      })));
      game.addXp(100, "Depth Diver");
    };

    return (
      <StageWrapper>
        <div className="text-center mb-6">
          <h3 className="text-xl font-bold text-purple-600 mb-1 flex items-center justify-center gap-2">
            <Telescope className="size-6" /> DFS – The Dive Spell (Recursive)
          </h3>
          <p className="text-muted-foreground text-sm">
            DFS dives deep. It keeps going until it hits a dead end—and then backtracks using a <strong>Call Stack</strong>.
          </p>
        </div>

        {/* DFS Visualization */}
        <div className="relative w-full max-w-4xl h-80 bg-gradient-to-br from-purple-50 to-pink-100 rounded-xl mb-4 border border-gray-200">
          <svg className="w-full h-full">
            {edges.map((edge, idx) => (
              <line
                key={idx}
                x1={nodes[edge.from].x}
                y1={nodes[edge.from].y}
                x2={nodes[edge.to].x}
                y2={nodes[edge.to].y}
                stroke="#cbd5e1"
                strokeWidth="2"
              />
            ))}
            
            {nodes.map((node) => (
              <circle
                key={node.id}
                cx={node.x}
                cy={node.y}
                r="25"
                fill={traversalOrder.includes(node.id) ? "#8b5cf6" : "#ffffff"}
                stroke={currentNode === node.id ? "#7c3aed" : "#94a3b8"}
                strokeWidth={currentNode === node.id ? "4" : "2"}
              />
            ))}
          </svg>
        </div>

        {/* Call Stack Visualization */}
        <div className="bg-white rounded-lg border border-gray-200 p-4 mb-4 shadow-md">
  <div className="flex items-center gap-2 mb-2">
    <Layers className="size-4 text-purple-600" />
    <span className="font-bold text-gray-800">Recursive Call Stack:</span>
  </div>
  <div className="space-y-1">
    {traversalOrder.map((nodeId: number, idx: number) => (
      <div key={idx} className="px-3 py-1 bg-purple-100 border border-purple-300 rounded text-sm font-mono">
        dfs({nodes[nodeId]?.label})
      </div>
    ))}
  </div>
</div>

        <div className="flex gap-4 mb-6">
          <button
            onClick={runDFSRecursive}
            className="px-6 py-2 bg-purple-600 text-white rounded-lg font-bold shadow-md hover:bg-purple-700 transition-colors"
          >
            Dive Deep! 🏊
          </button>
        </div>

        <div className="bg-purple-100 border border-purple-300 rounded-lg p-4 mb-4">
          <p className="text-sm text-purple-800">
            💡 <strong>DFS Insight:</strong> The algorithm goes as deep as possible before backtracking.
            Watch how the call stack grows and shrinks!
          </p>
        </div>

        <button
          onClick={() => { game.addXp(150, "DFS Explorer"); game.nextStage(); }}
          className="px-8 py-3 bg-primary text-primary-foreground font-bold rounded-xl"
        >
          Learn Iterative DFS →
        </button>
      </StageWrapper>
    );
  };

  /** Stage 4: "DFS – The Stack Machine (Iterative)" */
  const renderStage4 = () => {
    const runIterativeDFS = () => {
      const visited = new Set<number>();
      const stack_list = [0];
      const order: number[] = [];
      
      while (stack_list.length > 0) {
        const node = stack_list.pop()!;
        if (!visited.has(node)) {
          visited.add(node);
          order.push(node);
          setStack(stack_list);
          // Add neighbors in reverse order for correct DFS order
          [...adjacencyList[node]].reverse().forEach(neighbor => {
            if (!visited.has(neighbor)) {
              stack_list.push(neighbor);
            }
          });
        }
      }
      
      setTraversalOrder(order);
      setNodes(prev => prev.map(node => ({
        ...node,
        visited: order.includes(node.id)
      })));
      game.addXp(100, "Stack Commander");
    };

    return (
      <StageWrapper>
        <div className="text-center mb-6">
          <h3 className="text-xl font-bold text-orange-600 mb-1 flex items-center justify-center gap-2">
            <Cpu className="size-6" /> DFS – The Stack Machine (Iterative)
          </h3>
          <p className="text-muted-foreground text-sm">
            This is DFS without recursion—<strong>YOU control the stack</strong> manually.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-6">
          {/* Graph Visualization */}
          <div className="relative h-80 bg-gradient-to-br from-orange-50 to-yellow-100 rounded-xl border border-gray-200">
            <svg className="w-full h-full">
              {edges.map((edge, idx) => (
                <line
                  key={idx}
                  x1={nodes[edge.from].x}
                  y1={nodes[edge.from].y}
                  x2={nodes[edge.to].x}
                  y2={nodes[edge.to].y}
                  stroke="#cbd5e1"
                  strokeWidth="2"
                />
              ))}
              
              {nodes.map((node) => (
                <circle
                  key={node.id}
                  cx={node.x}
                  cy={node.y}
                  r="25"
                  fill={traversalOrder.includes(node.id) ? "#f97316" : "#ffffff"}
                  stroke="#94a3b8"
                  strokeWidth="2"
                />
              ))}
            </svg>
          </div>

          {/* Stack Visualization */}
          <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-md">
  <div className="flex items-center gap-2 mb-3">
    <Box className="size-5 text-orange-600" />
    <span className="font-bold text-gray-800">Manual Stack (LIFO):</span>
  </div>
  <div className="space-y-2">
    {[...stack].reverse().map((nodeId: number, idx: number) => (
      <div key={idx} className="px-3 py-2 bg-orange-100 border border-orange-300 rounded-lg text-center font-mono">
        {nodes[nodeId]?.label}
      </div>
    ))}
    {stack.length === 0 && (
      <div className="text-center text-gray-500 text-sm py-4">Stack is empty</div>
    )}
  </div>
  <button
    onClick={runIterativeDFS}
    className="mt-4 w-full px-4 py-2 bg-orange-600 text-white rounded-lg font-bold hover:bg-orange-700 transition-colors"
  >
    Push and Pop! ⚙️
  </button>
</div>
        </div>

        <button
          onClick={() => { game.addXp(150, "Stack Master"); game.nextStage(); }}
          className="mt-6 px-8 py-3 bg-primary text-primary-foreground font-bold rounded-xl"
        >
          Face Cycle Danger →
        </button>
      </StageWrapper>
    );
  };

  /** Stage 5: "Cycle Trap & Visited Shield" */
  const renderStage5 = () => {
    const loadCycleGraph = () => {
      setNodes(CYCLE_GRAPH_NODES);
      setEdges(CYCLE_GRAPH_EDGES);
    };

    const runTraversalWithoutVisited = () => {
      setShowMistake("cycle");
      // Simulate infinite loop warning
      setTimeout(() => setShowMistake(null), 3000);
    };

    const runTraversalWithVisited = () => {
      setUseVisited(true);
      const order = runDFS(0);
      setTraversalOrder(order);
      game.addXp(100, "Cycle Breaker");
    };

    return (
      <StageWrapper>
        <div className="text-center mb-6">
          <h3 className="text-xl font-bold text-red-600 mb-1 flex items-center justify-center gap-2">
            <Shield className="size-6" /> Cycle Trap & Visited Shield
          </h3>
          <p className="text-muted-foreground text-sm">
            Without tracking visited nodes, you will be trapped in cycles forever!
          </p>
        </div>

        <button
          onClick={loadCycleGraph}
          className="mb-4 px-4 py-2 bg-gray-600 text-white rounded-lg text-sm hover:bg-gray-700 transition-colors"
        >
          Load Cyclic Graph
        </button>

        <div className="relative w-full max-w-3xl h-80 bg-gradient-to-br from-red-50 to-pink-100 rounded-xl mb-4 border border-gray-200">
          <svg className="w-full h-full">
            {edges.map((edge, idx) => (
              <line
                key={idx}
                x1={nodes[edge.from]?.x || 0}
                y1={nodes[edge.from]?.y || 0}
                x2={nodes[edge.to]?.x || 0}
                y2={nodes[edge.to]?.y || 0}
                stroke="#cbd5e1"
                strokeWidth="2"
              />
            ))}
            
            {nodes.map((node) => (
              <circle
                key={node.id}
                cx={node.x}
                cy={node.y}
                r="25"
                fill={node.visited ? "#10b981" : "#ffffff"}
                stroke={showMistake === "cycle" ? "#ef4444" : "#94a3b8"}
                strokeWidth={showMistake === "cycle" ? "4" : "2"}
                className={showMistake === "cycle" ? "animate-pulse" : ""}
              />
            ))}
          </svg>
        </div>

        {showMistake === "cycle" && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 animate-in slide-in-from-top">
            <div className="flex items-center gap-2">
              <AlertTriangle className="size-5" />
              <span className="font-bold">Infinite Loop Detected!</span>
            </div>
            <p className="text-sm mt-1">You're trapped in a cycle! Always mark nodes as visited.</p>
          </div>
        )}

        <div className="flex gap-4 mb-6">
          <button
            onClick={runTraversalWithoutVisited}
            className="px-6 py-2 bg-red-600 text-white rounded-lg font-bold shadow-md hover:bg-red-700 transition-colors"
          >
            ❌ Without Visited Array
          </button>
          <button
            onClick={runTraversalWithVisited}
            className="px-6 py-2 bg-green-600 text-white rounded-lg font-bold shadow-md hover:bg-green-700 transition-colors"
          >
            ✅ With Visited Shield
          </button>
        </div>

        <button
          onClick={() => { game.addXp(150, "Cycle Breaker"); game.nextStage(); }}
          className="px-8 py-3 bg-primary text-primary-foreground font-bold rounded-xl"
        >
          Explore Multiple Worlds →
        </button>
      </StageWrapper>
    );
  };

  /** Stage 6: "Connected Components Quest" */
  const renderStage6 = () => {
    const loadDisconnectedGraph = () => {
      setNodes(DISCONNECTED_NODES);
      setEdges(DISCONNECTED_EDGES);
      const comps = findComponents();
      setComponents(comps);
    };

    const countComponents = () => {
      const comps = findComponents();
      setComponents(comps);
      game.addXp(100, "World Explorer");
    };

    return (
      <StageWrapper>
        <div className="text-center mb-6">
          <h3 className="text-xl font-bold text-indigo-600 mb-1 flex items-center justify-center gap-2">
            <Globe className="size-6" /> Connected Components Quest
          </h3>
          <p className="text-muted-foreground text-sm">
            A disconnected graph has multiple worlds. Count them by running BFS/DFS from different nodes.
          </p>
        </div>

        <button
          onClick={loadDisconnectedGraph}
          className="mb-4 px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm hover:bg-indigo-700 transition-colors"
        >
          Load Disconnected Graph
        </button>

        <div className="grid grid-cols-2 gap-6">
          <div className="relative h-80 bg-gradient-to-br from-indigo-50 to-purple-100 rounded-xl border border-gray-200">
            <svg className="w-full h-full">
              {edges.map((edge, idx) => (
                <line
                  key={idx}
                  x1={nodes[edge.from]?.x || 0}
                  y1={nodes[edge.from]?.y || 0}
                  x2={nodes[edge.to]?.x || 0}
                  y2={nodes[edge.to]?.y || 0}
                  stroke="#cbd5e1"
                  strokeWidth="2"
                />
              ))}
              
              {nodes.map((node) => (
                <circle
                  key={node.id}
                  cx={node.x}
                  cy={node.y}
                  r="25"
                  fill="#ffffff"
                  stroke="#8b5cf6"
                  strokeWidth="2"
                />
              ))}
            </svg>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-md">
            <h4 className="font-bold text-gray-800 mb-3">Components Found:</h4>
            {components.length > 0 ? (
              components.map((comp, idx) => (
                <div key={idx} className="mb-2 p-2 bg-indigo-50 rounded">
                  <span className="font-bold text-indigo-600">Component {idx + 1}:</span>{" "}
                  {comp.map(nodeId => nodes[nodeId]?.label).join(", ")}
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-sm">Run traversal to find components</p>
            )}
          </div>
        </div>

        <div className="flex gap-4 mt-6">
          <button
            onClick={countComponents}
            className="px-6 py-2 bg-indigo-600 text-white rounded-lg font-bold shadow-md hover:bg-indigo-700 transition-colors"
          >
            Find All Components 🌍
          </button>
        </div>

        <button
          onClick={() => { game.addXp(150, "Component Master"); game.nextStage(); }}
          className="mt-6 px-8 py-3 bg-primary text-primary-foreground font-bold rounded-xl"
        >
          Find Shortest Path →
        </button>
      </StageWrapper>
    );
  };

  /** Stage 7: "Shortest Path Mission (BFS Power)" */
  const renderStage7 = () => {
    const computeShortestPath = () => {
      const path = findShortestPath(sourceNode, targetNode);
      setShortestPath(path);
      
      // Highlight the path nodes
      setNodes(prev => prev.map(node => ({
        ...node,
        visited: path.includes(node.id)
      })));
      
      if (path.length > 0) {
        game.addXp(200, "Pathfinder Elite");
      }
    };

    return (
      <StageWrapper>
        <div className="text-center mb-6">
          <h3 className="text-xl font-bold text-emerald-600 mb-1 flex items-center justify-center gap-2">
            <Target className="size-6" /> Shortest Path Mission (BFS Power)
          </h3>
          <p className="text-muted-foreground text-sm">
            BFS guarantees the shortest path in unweighted graphs. Watch the wave expand!
          </p>
        </div>

        <div className="relative w-full max-w-4xl h-80 bg-gradient-to-br from-emerald-50 to-teal-100 rounded-xl mb-4 border border-gray-200">
          <svg className="w-full h-full">
            {edges.map((edge, idx) => (
              <line
                key={idx}
                x1={nodes[edge.from].x}
                y1={nodes[edge.from].y}
                x2={nodes[edge.to].x}
                y2={nodes[edge.to].y}
                stroke="#cbd5e1"
                strokeWidth="2"
              />
            ))}
            
            {nodes.map((node) => (
              <g key={node.id}>
                <circle
                  cx={node.x}
                  cy={node.y}
                  r="25"
                  fill={shortestPath.includes(node.id) ? "#10b981" : "#ffffff"}
                  stroke={node.id === sourceNode ? "#3b82f6" : node.id === targetNode ? "#ef4444" : "#94a3b8"}
                  strokeWidth={shortestPath.includes(node.id) ? "4" : "2"}
                  className={shortestPath.includes(node.id) ? "animate-pulse" : ""}
                />
                <text
                  x={node.x}
                  y={node.y}
                  fill={shortestPath.includes(node.id) ? "white" : "#1e293b"}
                  fontSize="14"
                  textAnchor="middle"
                  dominantBaseline="middle"
                  className="font-bold"
                >
                  {node.label}
                </text>
              </g>
            ))}
          </svg>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-white rounded-lg border border-gray-200 p-3">
            <label className="block text-sm font-bold text-gray-700 mb-2">Source Node:</label>
            <select
              value={sourceNode}
              onChange={(e) => setSourceNode(parseInt(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            >
              {nodes.map(node => (
                <option key={node.id} value={node.id}>Node {node.label}</option>
              ))}
            </select>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-3">
            <label className="block text-sm font-bold text-gray-700 mb-2">Target Node:</label>
            <select
              value={targetNode}
              onChange={(e) => setTargetNode(parseInt(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            >
              {nodes.map(node => (
                <option key={node.id} value={node.id}>Node {node.label}</option>
              ))}
            </select>
          </div>
        </div>

        {shortestPath.length > 0 && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
            <div className="flex items-center gap-2">
              <CheckCircle className="size-5" />
              <span className="font-bold">Shortest Path Found!</span>
            </div>
            <p className="text-sm mt-1">
              {shortestPath.map(id => nodes[id]?.label).join(" → ")}
            </p>
          </div>
        )}

        <div className="flex gap-4">
          <button
            onClick={computeShortestPath}
            className="px-6 py-2 bg-emerald-600 text-white rounded-lg font-bold shadow-md hover:bg-emerald-700 transition-colors"
          >
            Find Shortest Path 🎯
          </button>
        </div>

        <QuizBlock
          question="Why is BFS better than DFS for finding the shortest path in an unweighted graph?"
          options={[
            { label: "BFS is faster in all cases", value: "faster" },
            { label: "BFS explores level by level, guaranteeing minimum steps", value: "level" },
            { label: "DFS cannot find paths", value: "cannot" },
            { label: "BFS uses less memory", value: "memory" },
          ]}
          correctValue="level"
          selectedValue={quizAnswer}
          onSelect={setQuizAnswer}
          correctFeedback="✅ Correct! BFS expands in waves, so the first time it reaches the target is via the shortest path."
          wrongFeedback="❌ Not quite! BFS's level-by-level exploration guarantees shortest paths in unweighted graphs."
        />

        {quizAnswer === "level" && (
          <button
            onClick={() => { game.addXp(300, "Final Boss Defeated!"); game.nextStage(); }}
            className="mt-4 px-8 py-3 bg-primary text-primary-foreground font-bold rounded-xl animate-in zoom-in"
          >
            Escape the Labyrinth! 🏆
          </button>
        )}
      </StageWrapper>
    );
  };

  /** Stage 8: Completion (since TOTAL_STAGES is 7, this is Stage 7's completion) */
  const renderCompletion = () => (
    <CompletionScreen
      missionTitle="Escape Successful! 🎉"
      missionSubtitle="You mastered graph traversal and escaped the digital labyrinth!"
      xp={game.xp}
      xpLog={game.xpLog}
      achievements={[
        { icon: <Waves className="size-4" />, label: "Wave Master - BFS Expert" },
        { icon: <Telescope className="size-4" />, label: "Depth Diver - DFS Expert" },
        { icon: <Shield className="size-4" />, label: "Cycle Breaker - Handled cycles" },
        { icon: <Globe className="size-4" />, label: "World Explorer - Found components" },
        { icon: <Target className="size-4" />, label: "Pathfinder Elite - Shortest path master" },
      ]}
      concepts={[
        { label: "BFS (Breadth-First Search)", description: "Queue-based level-by-level traversal" },
        { label: "DFS (Depth-First Search)", description: "Stack-based deep traversal with backtracking" },
        { label: "Visited Tracking", description: "Prevents infinite loops in cyclic graphs" },
        { label: "Connected Components", description: "Finding isolated clusters in graphs" },
        { label: "Shortest Path (BFS)", description: "Guarantees minimum steps in unweighted graphs" },
        { label: "Time Complexity", description: "O(V+E) for both BFS and DFS" },
      ]}
      onReset={game.reset}
    />
  );

  // ── Render ────────────────────────────────────────────────────────────────
  return (
    <SimShell
      title="Graph Raiders"
      subtitle="The Labyrinth of Nodes - BFS & DFS Traversal Lab"
      xp={game.xp}
      stage={game.stage}
      totalStages={TOTAL_STAGES}
      mistakeMessage={game.mistakeMessage}
      successMessage={game.successMessage}
      icon={<Map className="size-5 text-primary" />}
    >
      {game.stage === 1 && renderStage1()}
      {game.stage === 2 && renderStage2()}
      {game.stage === 3 && renderStage3()}
      {game.stage === 4 && renderStage4()}
      {game.stage === 5 && renderStage5()}
      {game.stage === 6 && renderStage6()}
      {game.stage === 7 && renderStage7()}
      {game.stage === TOTAL_STAGES && renderCompletion()}
    </SimShell>
  );
}