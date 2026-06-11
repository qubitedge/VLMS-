/**
 * KruskalSim.tsx
 * ========================
 * The Kingdom of Connected Realms: The Kruskal Conquest
 * Learn Kruskal's MST algorithm through an interactive kingdom-building simulation
 */

import { useState, useEffect } from "react";
import { 
  Swords, 
  Zap, 
  AlertTriangle, 
  Eye, 
  Trophy,
  Play,
  RefreshCw,
  ChevronRight,
  Flag,
  Target,
  Shield,
  TrendingDown,
  MapPin,
  Navigation,
  Brain,
  Award,
  CheckCircle,
  GitMerge,
  Sparkles,
  Crown,
  Mountain,
  Link,
  SortAsc,
  GitBranch,
  Circle,
  Layers
} from "lucide-react";
import {
  useSimGame,
  SimShell,
  StageWrapper,
  QuizBlock,
  CompletionScreen,
} from "@/components/simulations/shared";

// ── Types & Constants ─────────────────────────────────────────────────────────────────
const TOTAL_STAGES = 7;

interface City {
  id: string;
  name: string;
  x: number;
  y: number;
  parent: string;
  rank: number;
  isHighlighted: boolean;
  isMerging: boolean;
}

interface Bridge {
  from: string;
  to: string;
  weight: number;
  isSelected: boolean;
  isRejected: boolean;
  isHighlighted: boolean;
  isGlowing: boolean;
}

// Initial graph data
const INITIAL_CITIES: City[] = [
  { id: "A", name: "Avalon", x: 100, y: 150, parent: "A", rank: 0, isHighlighted: false, isMerging: false },
  { id: "B", name: "Bretonia", x: 300, y: 80, parent: "B", rank: 0, isHighlighted: false, isMerging: false },
  { id: "C", name: "Camelot", x: 500, y: 120, parent: "C", rank: 0, isHighlighted: false, isMerging: false },
  { id: "D", name: "Dragonspire", x: 200, y: 300, parent: "D", rank: 0, isHighlighted: false, isMerging: false },
  { id: "E", name: "Elvenwood", x: 600, y: 280, parent: "E", rank: 0, isHighlighted: false, isMerging: false },
  { id: "F", name: "Frosthold", x: 400, y: 400, parent: "F", rank: 0, isHighlighted: false, isMerging: false },
];

const INITIAL_BRIDGES: Bridge[] = [
  { from: "A", to: "B", weight: 4, isSelected: false, isRejected: false, isHighlighted: false, isGlowing: false },
  { from: "A", to: "D", weight: 3, isSelected: false, isRejected: false, isHighlighted: false, isGlowing: false },
  { from: "B", to: "C", weight: 2, isSelected: false, isRejected: false, isHighlighted: false, isGlowing: false },
  { from: "B", to: "D", weight: 5, isSelected: false, isRejected: false, isHighlighted: false, isGlowing: false },
  { from: "C", to: "E", weight: 3, isSelected: false, isRejected: false, isHighlighted: false, isGlowing: false },
  { from: "C", to: "F", weight: 6, isSelected: false, isRejected: false, isHighlighted: false, isGlowing: false },
  { from: "D", to: "E", weight: 2, isSelected: false, isRejected: false, isHighlighted: false, isGlowing: false },
  { from: "E", to: "F", weight: 4, isSelected: false, isRejected: false, isHighlighted: false, isGlowing: false },
];

export function KruskalSim() {
  // ── Game state ────────────────────────────────────────────────────────────────
  const game = useSimGame(TOTAL_STAGES, () => {
    resetLocalState();
  });

  // ── Local state ────────────────────────────────────────────────────────────────
  const [cities, setCities] = useState<City[]>(INITIAL_CITIES);
  const [bridges, setBridges] = useState<Bridge[]>(INITIAL_BRIDGES);
  const [sortedBridges, setSortedBridges] = useState<Bridge[]>([]);
  const [currentEdgeIndex, setCurrentEdgeIndex] = useState(0);
  const [mstEdges, setMstEdges] = useState<Bridge[]>([]);
  const [totalCost, setTotalCost] = useState(0);
  const [dsuInitialized, setDsuInitialized] = useState(false);
  const [showCycle, setShowCycle] = useState(false);
  const [cycleEdge, setCycleEdge] = useState<Bridge | null>(null);
  const [quizAnswer, setQuizAnswer] = useState<string | null>(null);
  const [selectedCities, setSelectedCities] = useState<{ from: string; to: string } | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [mistakeCount, setMistakeCount] = useState(0);
  const [completionMessage, setCompletionMessage] = useState("");
  const [sortingComplete, setSortingComplete] = useState(false);
  const [showInternals, setShowInternals] = useState(true);
  const [cycleQuizAnswer, setCycleQuizAnswer] = useState<string | null>(null);
  const [predictionAnswer, setPredictionAnswer] = useState<string | null>(null);

  // DSU Helper Functions
  const find = (cityId: string, citiesCopy: City[]): string => {
    let city = citiesCopy.find(c => c.id === cityId);
    if (!city) return cityId;
    if (city.parent !== city.id) {
      city.parent = find(city.parent, citiesCopy);
    }
    return city.parent;
  };

  const union = (cityA: string, cityB: string, citiesCopy: City[]): boolean => {
    const rootA = find(cityA, citiesCopy);
    const rootB = find(cityB, citiesCopy);
    
    if (rootA === rootB) return false;
    
    const cityRootA = citiesCopy.find(c => c.id === rootA);
    const cityRootB = citiesCopy.find(c => c.id === rootB);
    
    if (cityRootA && cityRootB) {
      if (cityRootA.rank < cityRootB.rank) {
        cityRootA.parent = rootB;
      } else if (cityRootA.rank > cityRootB.rank) {
        cityRootB.parent = rootA;
      } else {
        cityRootB.parent = rootA;
        cityRootA.rank++;
      }
    }
    return true;
  };

  // Reset function
  const resetLocalState = () => {
    setCities(INITIAL_CITIES.map(c => ({ ...c, parent: c.id, rank: 0, isHighlighted: false, isMerging: false })));
    setBridges(INITIAL_BRIDGES.map(b => ({ ...b, isSelected: false, isRejected: false, isHighlighted: false, isGlowing: false })));
    setSortedBridges([]);
    setCurrentEdgeIndex(0);
    setMstEdges([]);
    setTotalCost(0);
    setDsuInitialized(false);
    setShowCycle(false);
    setCycleEdge(null);
    setQuizAnswer(null);
    setSelectedCities(null);
    setMistakeCount(0);
    setCompletionMessage("");
    setSortingComplete(false);
  };

  // Sort bridges by weight
  const sortBridges = () => {
    setIsAnimating(true);
    const sorted = [...bridges].sort((a, b) => a.weight - b.weight);
    setSortedBridges(sorted);
    setTimeout(() => {
      setIsAnimating(false);
      setSortingComplete(true);
      game.addXp(100, "Sorting Ritual Complete");
    }, 1000);
  };

  // Initialize DSU
  const initializeDSU = () => {
    setDsuInitialized(true);
    game.addXp(50, "Union-Find Orb Awakened");
  };

  // Process next edge in Kruskal's algorithm
  const processNextEdge = () => {
    if (currentEdgeIndex >= sortedBridges.length) {
      setCompletionMessage("All edges processed!");
      return;
    }

    const edge = sortedBridges[currentEdgeIndex];
    const citiesCopy = [...cities];
    const rootFrom = find(edge.from, citiesCopy);
    const rootTo = find(edge.to, citiesCopy);
    
    // Highlight current edge
    const updatedBridges = [...bridges];
    const edgeIndex = bridges.findIndex(b => b.from === edge.from && b.to === edge.to);
    if (edgeIndex !== -1) {
      updatedBridges[edgeIndex].isHighlighted = true;
      setBridges(updatedBridges);
    }
    
    // Check if adding this edge creates a cycle
    if (rootFrom !== rootTo) {
      // Safe to add
      setTimeout(() => {
        const newCities = [...cities];
        union(edge.from, edge.to, newCities);
        
        // Mark edge as selected
        const finalBridges = [...bridges];
        const finalEdgeIndex = finalBridges.findIndex(b => b.from === edge.from && b.to === edge.to);
        if (finalEdgeIndex !== -1) {
          finalBridges[finalEdgeIndex].isSelected = true;
          finalBridges[finalEdgeIndex].isHighlighted = false;
        }
        
        setCities(newCities);
        setBridges(finalBridges);
        setMstEdges([...mstEdges, edge]);
        setTotalCost(totalCost + edge.weight);
        setCurrentEdgeIndex(currentEdgeIndex + 1);
        
        game.addXp(30, `Bridge ${edge.from}→${edge.to} Added!`);
        
        // Check if MST is complete (V-1 edges)
        if (mstEdges.length + 1 === cities.length - 1) {
          setCompletionMessage("MST Complete! Kingdom Unified!");
          game.addXp(200, "Kingdom Unified!");
        }
      }, 500);
    } else {
      // Creates a cycle
      setShowCycle(true);
      setCycleEdge(edge);
      setMistakeCount(mistakeCount + 1);
      
      // Mark edge as rejected
      const finalBridges = [...bridges];
      const finalEdgeIndex = finalBridges.findIndex(b => b.from === edge.from && b.to === edge.to);
      if (finalEdgeIndex !== -1) {
        finalBridges[finalEdgeIndex].isRejected = true;
        finalBridges[finalEdgeIndex].isHighlighted = false;
      }
      setBridges(finalBridges);
      
      setTimeout(() => {
        setShowCycle(false);
        setCycleEdge(null);
        setCurrentEdgeIndex(currentEdgeIndex + 1);
      }, 2000);
    }
  };

  // Manual union for stage 6
  const manualUnion = () => {
    if (selectedCities) {
      const newCities = [...cities];
      const success = union(selectedCities.from, selectedCities.to, newCities);
      if (success) {
        setCities(newCities);
        game.addXp(40, "Union Performed!");
        setCompletionMessage(`Successfully merged ${selectedCities.from} and ${selectedCities.to}`);
        setTimeout(() => setCompletionMessage(""), 2000);
      }
      setSelectedCities(null);
    }
  };

  // Stage renderers
  const renderStage1 = () => (
    <StageWrapper>
      <div className="text-center mb-8 max-w-xl">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-amber-500 to-orange-600 bg-clip-text text-transparent mb-2">
          The Broken Kingdom
        </h2>
        <p className="text-muted-foreground">
          The kingdom lies in ruins! Isolated cities float above the void, disconnected from each other.
          Your mission: Build a Minimum Spanning Network to unite all cities with minimal magical bridge cost!
        </p>
      </div>

      {/* Graph Visualization */}
      <div className="relative w-full h-[450px] bg-gradient-to-br from-slate-900 to-slate-800 rounded-xl border border-amber-500/30 mb-8">
        <svg className="w-full h-full">
          {/* Draw bridges */}
          {bridges.map((bridge, idx) => {
            const fromCity = cities.find(c => c.id === bridge.from);
            const toCity = cities.find(c => c.id === bridge.to);
            if (!fromCity || !toCity) return null;
            
            return (
              <g key={idx}>
                <line
                  x1={fromCity.x}
                  y1={fromCity.y}
                  x2={toCity.x}
                  y2={toCity.y}
                  stroke={bridge.isGlowing ? '#fbbf24' : '#475569'}
                  strokeWidth={bridge.isGlowing ? 4 : 2}
                  strokeOpacity={0.6}
                  className="transition-all duration-300"
                />
                <text
                  x={(fromCity.x + toCity.x) / 2}
                  y={(fromCity.y + toCity.y) / 2 - 10}
                  fill="#fbbf24"
                  fontSize="14"
                  textAnchor="middle"
                  className="font-bold"
                >
                  {bridge.weight}
                </text>
              </g>
            );
          })}
          
          {/* Draw cities */}
          {cities.map(city => (
            <g key={city.id}>
              <circle
                cx={city.x}
                cy={city.y}
                r={30}
                fill={city.isHighlighted ? '#fbbf24' : '#1e293b'}
                stroke={city.isMerging ? '#10b981' : '#fbbf24'}
                strokeWidth={3}
                className="transition-all duration-300 cursor-pointer hover:scale-105"
              />
              <text x={city.x} y={city.y - 35} fill="#e2e8f0" fontSize="12" textAnchor="middle">
                {city.name}
              </text>
              <text x={city.x} y={city.y + 5} fill="#fbbf24" fontSize="11" textAnchor="middle">
                [{city.id}]
              </text>
            </g>
          ))}
        </svg>
      </div>

      <button
        onClick={() => { game.addXp(50, "Royal Architect Recruited"); game.nextStage(); }}
        className="px-8 py-3 bg-gradient-to-r from-amber-500 to-orange-600 text-white font-bold rounded-xl flex items-center gap-2 hover:shadow-lg transition-all mx-auto"
      >
        <Crown className="size-5" /> Start Mission
      </button>
    </StageWrapper>
  );

  const renderStage2 = () => (
    <StageWrapper>
      <div className="text-center mb-6 max-w-md">
        <h3 className="text-xl font-bold text-primary mb-1">The Sorting Ritual</h3>
        <p className="text-muted-foreground text-sm">
          Kruskal begins by sorting all bridges by cost. The cheapest bridges are considered first!
        </p>
      </div>

      <div className="bg-slate-800 rounded-lg p-6 mb-6">
        <h4 className="font-semibold text-amber-400 mb-3">Bridges to Sort:</h4>
        <div className="space-y-2">
          {bridges.map((bridge, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between p-3 bg-slate-700 rounded-lg"
            >
              <span className="font-mono">{bridge.from} → {bridge.to}</span>
              <span className="text-amber-400 font-bold">Cost: {bridge.weight}</span>
            </div>
          ))}
        </div>
      </div>

      {sortedBridges.length > 0 && (
        <div className="bg-green-900/30 border border-green-500 rounded-lg p-6 mb-6">
          <h4 className="font-semibold text-green-400 mb-3">Sorted Bridges (Ascending):</h4>
          <div className="space-y-2">
            {sortedBridges.map((bridge, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between p-3 bg-green-900/50 rounded-lg animate-in slide-in-from-left"
                style={{ animationDelay: `${idx * 100}ms` }}
              >
                <span className="font-mono">#{idx + 1}: {bridge.from} → {bridge.to}</span>
                <span className="text-green-400 font-bold">Cost: {bridge.weight}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="flex gap-4 justify-center">
        {!sortingComplete && (
          <button
            onClick={sortBridges}
            disabled={isAnimating}
            className="px-6 py-3 bg-primary text-primary-foreground font-bold rounded-xl flex items-center gap-2"
          >
            <SortAsc className="size-5" /> Auto-Sort Bridges
          </button>
        )}
        
        {sortingComplete && (
          <button
            onClick={() => { game.nextStage(); }}
            className="px-6 py-3 bg-green-500 text-white font-bold rounded-xl flex items-center gap-2 animate-in zoom-in"
          >
            <CheckCircle className="size-5" /> Continue to DSU Orb
          </button>
        )}
      </div>
    </StageWrapper>
  );

  const renderStage3 = () => (
    <StageWrapper>
      <div className="text-center mb-6">
        <h3 className="text-xl font-bold text-primary mb-1">The Union-Find Orb Awakens</h3>
        <p className="text-muted-foreground">
          Each city starts in its own group. The Union-Find Orb helps detect whether connecting two cities will create a cycle!
        </p>
      </div>

      <div className="grid grid-cols-2 gap-6 mb-6">
        <div className="bg-slate-800 rounded-lg p-6">
          <h4 className="font-semibold text-amber-400 mb-3 flex items-center gap-2">
            <GitBranch className="size-4" /> City Groups (Parents)
          </h4>
          <div className="space-y-2">
            {cities.map(city => (
              <div key={city.id} className="flex justify-between items-center p-2 bg-slate-700 rounded">
                <span>{city.name} ({city.id})</span>
                <span className="text-cyan-400 font-mono">Parent: {city.parent}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-slate-800 rounded-lg p-6">
          <h4 className="font-semibold text-amber-400 mb-3 flex items-center gap-2">
            <Layers className="size-4" /> DSU Visualization
          </h4>
          <div className="space-y-2">
            {Array.from(new Set(cities.map(c => find(c.id, cities)))).map(root => (
              <div key={root} className="p-2 bg-slate-700 rounded">
                <span className="text-green-400">Group Root: {root}</span>
                <div className="text-xs text-muted-foreground mt-1">
                  Members: {cities.filter(c => find(c.id, cities) === root).map(c => c.id).join(', ')}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {!dsuInitialized && (
        <button
          onClick={initializeDSU}
          className="px-6 py-3 bg-purple-600 text-white font-bold rounded-xl flex items-center gap-2 mx-auto"
        >
          <GitMerge className="size-5" /> Initialize DSU Orb
        </button>
      )}
      
      {dsuInitialized && (
        <button
          onClick={() => { game.nextStage(); }}
          className="px-6 py-3 bg-green-500 text-white font-bold rounded-xl flex items-center gap-2 mx-auto animate-in zoom-in"
        >
          <CheckCircle className="size-5" /> Begin Bridge Selection
        </button>
      )}
    </StageWrapper>
  );

  const renderStage4 = () => (
    <StageWrapper>
      <div className="text-center mb-6">
        <h3 className="text-xl font-bold text-primary mb-1">Bridge Selection Trial</h3>
        <p className="text-muted-foreground">
          For each bridge: If cities are not connected → build it. If they are → it creates a forbidden loop!
        </p>
      </div>

      {sortedBridges.length === 0 && (
        <div className="text-center p-8 bg-yellow-900/20 rounded-lg mb-6">
          <p className="text-yellow-400">Please sort bridges first in Stage 2!</p>
        </div>
      )}

      {sortedBridges.length > 0 && (
        <>
          <div className="bg-slate-800 rounded-lg p-6 mb-6">
            <div className="flex justify-between items-center mb-4">
              <h4 className="font-semibold text-amber-400">
                Processing Bridge {currentEdgeIndex + 1} of {sortedBridges.length}
              </h4>
              <div className="text-sm">
                <span className="text-green-400">MST Cost: {totalCost}</span>
                <span className="mx-2">|</span>
                <span className="text-cyan-400">Edges Selected: {mstEdges.length} / {cities.length - 1}</span>
              </div>
            </div>

            {currentEdgeIndex < sortedBridges.length && (
              <div className="text-center p-6 bg-slate-700 rounded-lg mb-4">
                <p className="text-lg mb-2">Current Bridge:</p>
                <p className="text-2xl font-bold text-amber-400">
                  {sortedBridges[currentEdgeIndex].from} → {sortedBridges[currentEdgeIndex].to}
                </p>
                <p className="text-xl">Cost: {sortedBridges[currentEdgeIndex].weight}</p>
              </div>
            )}

            {showCycle && cycleEdge && (
              <div className="mt-4 p-4 bg-red-500/20 border border-red-500 rounded-lg animate-in slide-in-from-top">
                <p className="text-red-400 font-semibold flex items-center gap-2">
                  <AlertTriangle className="size-5" />
                  ⚠️ CYCLE DETECTED! Both cities are already connected!
                </p>
              </div>
            )}

            {completionMessage && (
              <div className="mt-4 p-4 bg-green-500/20 border border-green-500 rounded-lg animate-in zoom-in">
                <p className="text-green-400 font-semibold text-center">{completionMessage}</p>
              </div>
            )}
          </div>

          {currentEdgeIndex < sortedBridges.length && !completionMessage && (
            <button
              onClick={processNextEdge}
              disabled={showCycle}
              className="px-6 py-3 bg-primary text-primary-foreground font-bold rounded-xl flex items-center gap-2 mx-auto"
            >
              <Play className="size-5" /> Process This Bridge
            </button>
          )}
        </>
      )}

      {mstEdges.length === cities.length - 1 && mstEdges.length > 0 && (
        <button
          onClick={() => { game.addXp(150, "MST Construction Complete"); game.nextStage(); }}
          className="mt-6 px-6 py-3 bg-green-500 text-white font-bold rounded-xl flex items-center gap-2 mx-auto animate-in zoom-in"
        >
          <Trophy className="size-5" /> MST Complete! Continue →
        </button>
      )}
    </StageWrapper>
  );

  const renderStage5 = () => {    
    return (
      <StageWrapper>
        <h3 className="text-xl font-bold text-primary mb-6">Cycle Detection Arena</h3>

        <div className="w-full max-w-2xl space-y-6 mb-8 mx-auto">
          <QuizBlock
            question="Will adding a bridge between two cities that are already in the same DSU group create a cycle?"
            options={[
              { label: "Yes, it will create a cycle", value: "yes" },
              { label: "No, it's safe to add", value: "no" },
              { label: "Only if the weight is negative", value: "maybe" },
            ]}
            correctValue="yes"
            selectedValue={cycleQuizAnswer}
            onSelect={setCycleQuizAnswer}
            correctFeedback="✅ Correct! Kruskal avoids cycles to minimize total cost."
            wrongFeedback="❌ Remember: Adding an edge between connected cities creates a cycle, wasting resources!"
          />

          <div className="bg-slate-800 p-6 rounded-lg">
            <h4 className="font-semibold text-amber-400 mb-3">Try It Yourself!</h4>
            <p className="text-sm text-muted-foreground mb-4">
              Select two cities to test if they're already connected:
            </p>
            <div className="flex gap-4 mb-4">
              <select 
                className="flex-1 p-2 bg-slate-700 rounded"
                onChange={(e) => setSelectedCities({ from: e.target.value, to: selectedCities?.to || "" })}
              >
                <option value="">Select City A</option>
                {cities.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
              <select 
                className="flex-1 p-2 bg-slate-700 rounded"
                onChange={(e) => setSelectedCities({ from: selectedCities?.from || "", to: e.target.value })}
              >
                <option value="">Select City B</option>
                {cities.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
            </div>
            {selectedCities?.from && selectedCities?.to && (
              <div className="p-3 bg-slate-700 rounded">
                {find(selectedCities.from, cities) === find(selectedCities.to, cities) ? (
                  <p className="text-red-400 flex items-center gap-2">
                    <AlertTriangle className="size-4" />
                    ⚠️ These cities are already connected! Adding a bridge would create a CYCLE!
                  </p>
                ) : (
                  <p className="text-green-400 flex items-center gap-2">
                    <CheckCircle className="size-4" />
                    ✅ These cities are in different groups! It's safe to add a bridge!
                  </p>
                )}
              </div>
            )}
          </div>

          {cycleQuizAnswer === "yes" && (
            <button
              onClick={() => { game.addXp(100, "Cycle Detection Mastered"); game.nextStage(); }}
              className="w-full px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-600 text-white font-bold rounded-xl animate-in zoom-in flex items-center justify-center gap-2"
            >
              <Brain className="size-5" /> Continue to Union Ceremony
            </button>
          )}
        </div>
      </StageWrapper>
    );
  };

  const renderStage6 = () => (
    <StageWrapper>
      <div className="text-center mb-6">
        <h3 className="text-xl font-bold text-primary mb-1">Union Ceremony</h3>
        <p className="text-muted-foreground">
          When a bridge is added, the cities are united into one group. Watch the DSU merge!
        </p>
      </div>

      <div className="grid grid-cols-2 gap-6 mb-6">
        <div className="bg-slate-800 rounded-lg p-6">
          <h4 className="font-semibold text-amber-400 mb-3">Current DSU Structure</h4>
          <div className="space-y-2">
            {cities.map(city => (
              <div key={city.id} className="flex justify-between p-2 bg-slate-700 rounded">
                <span>{city.name}</span>
                <span className="text-cyan-400">Parent: {find(city.id, cities)}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-slate-800 rounded-lg p-6">
          <h4 className="font-semibold text-amber-400 mb-3">Perform Union</h4>
          <div className="space-y-4">
            <select 
              className="w-full p-2 bg-slate-700 rounded"
              onChange={(e) => setSelectedCities({ from: e.target.value, to: selectedCities?.to || "" })}
            >
              <option value="">Select City A</option>
              {cities.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
            <select 
              className="w-full p-2 bg-slate-700 rounded"
              onChange={(e) => setSelectedCities({ from: selectedCities?.from || "", to: e.target.value })}
            >
              <option value="">Select City B</option>
              {cities.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
            <button
              onClick={manualUnion}
              disabled={!selectedCities?.from || !selectedCities?.to}
              className="w-full px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition disabled:opacity-50"
            >
              <GitMerge className="size-4 inline mr-2" />
              Union Cities
            </button>
          </div>
        </div>
      </div>

      <button
        onClick={() => { game.addXp(100, "Union Master"); game.nextStage(); }}
        className="px-6 py-3 bg-green-500 text-white font-bold rounded-xl flex items-center gap-2 mx-auto"
      >
        <Crown className="size-5" /> Complete Kingdom Unification
      </button>
    </StageWrapper>
  );

  const renderStage7 = () => (
    <CompletionScreen
      missionTitle="Kingdom Unified!"
      missionSubtitle="You successfully rebuilt the kingdom using Kruskal's strategy, connecting all cities with minimal cost!"
      xp={game.xp}
      xpLog={game.xpLog}
      achievements={[
        { icon: <Shield className="size-4" />, label: "Cycle Slayer" },
        { icon: <Trophy className="size-4" />, label: "Greedy Master" },
        { icon: <GitMerge className="size-4" />, label: "Union Wizard" },
        { icon: <Crown className="size-4" />, label: "Royal Architect" },
      ]}
      concepts={[
        { label: "Greedy Selection", description: "Always pick the cheapest available edge that doesn't create a cycle" },
        { label: "Edge Sorting", description: "Sort all edges by weight (O(E log E)) before processing" },
        { label: "Cycle Detection using DSU", description: "Union-Find efficiently detects cycles in nearly constant time" },
        { label: "MST Construction", description: "Connect all vertices with exactly V-1 edges at minimum total cost" },
      ]}
      onReset={game.reset}
    />
  );

  // ── Render ────────────────────────────────────────────────────────────────
  return (
    <SimShell
      title="Kruskal's Algorithm"
      subtitle="The Kingdom of Connected Realms: The Kruskal Conquest"
      xp={game.xp}
      stage={game.stage}
      totalStages={TOTAL_STAGES}
      mistakeMessage={game.mistakeMessage}
      successMessage={game.successMessage}
      icon={<Navigation className="size-5 text-primary" />}
    >
      {game.stage === 1 && renderStage1()}
      {game.stage === 2 && renderStage2()}
      {game.stage === 3 && renderStage3()}
      {game.stage === 4 && renderStage4()}
      {game.stage === 5 && renderStage5()}
      {game.stage === 6 && renderStage6()}
      {game.stage === 7 && renderStage7()}
    </SimShell>
  );
}