import { useState } from "react";
import { Bird, Map, Swords, RotateCcw, Sparkles, Zap } from "lucide-react";
import {
  useSimGame,
  SimShell,
  StageWrapper,
  QuizBlock,
  CompletionScreen,
} from "@/components/simulations/shared";
const TOTAL_STAGES = 6;
const N = 5; // each table size
const MAX_KICKS = 8; // small for visualization (real default = 100)

const h1 = (k: number) => k % N;
const h2 = (k: number, modBase: number = 3) => Math.floor(k / modBase) % N;

type Tables = { t1: (number|null)[]; t2: (number|null)[] };

const emptyTables = (): Tables => ({
  t1: Array(N).fill(null),
  t2: Array(N).fill(null),
});

// One step of cuckoo insertion: returns full kick sequence + cycle flag
type KickStep = { table: "t1"|"t2"; slot: number; incoming: number; evicted: number|null };

function cuckooInsert(tables: Tables, key: number, modBase: number = 3): { steps: KickStep[]; success: boolean; cycle: boolean; finalTables: Tables } {
  const t1 = [...tables.t1];
  const t2 = [...tables.t2];
  const steps: KickStep[] = [];
  let current = key;
  let useT1 = true;

  for (let i = 0; i < MAX_KICKS; i++) {
    const table = useT1 ? "t1" : "t2";
    const slot = useT1 ? h1(current) : h2(current, modBase);
    const arr = useT1 ? t1 : t2;
    const evicted = arr[slot];
    steps.push({ table, slot, incoming: current, evicted });
    arr[slot] = current;

    if (evicted === null) {
      return { steps, success: true, cycle: false, finalTables: { t1, t2 } };
    }
    current = evicted;
    useT1 = !useT1;
  }
  return { steps, success: false, cycle: true, finalTables: { t1, t2 } };
}

function rehashAll(keys: number[], modBase: number): { tables: Tables; success: boolean } {
  let tables = emptyTables();
  for (const k of keys) {
    const result = cuckooInsert(tables, k, modBase);
    if (!result.success) return { tables: result.finalTables, success: false };
    tables = result.finalTables;
  }
  return { tables, success: true };
}

// Lookup: check T1[h1(k)] then T2[h2(k)]
function cuckooSearch(tables: Tables, key: number, modBase: number = 3): { steps: ("t1"|"t2")[]; found: boolean } {
  const steps: ("t1"|"t2")[] = ["t1"];
  if (tables.t1[h1(key)] === key) return { steps, found: true };
  steps.push("t2");
  if (tables.t2[h2(key, modBase)] === key) return { steps, found: true };
  return { steps, found: false };
}
export function CuckooKingdomSim() {
    const game = useSimGame(TOTAL_STAGES, () => {
      setTables(emptyTables());
      setSelectedBird(null);
      setViewHash(null);
      setLandingDone(false);
      setKickSteps([]);
      setKickStep(0);
      setKickInsertDone(false);
      setLoopKey(null);
      setLoopSteps([]);
      setLoopStep(0);
      setLoopAnswer(null);
      setNewModBase(null);
      setRehashDone(false);
      setSearchInput("");
      setSearchResult(null);
      setSearchStep(0);
      setBossKeys([10, 20, 30, 25, 15, 5]);
      setBossInserted([]);
      setBossModBase(3);
      setQuiz1Answer(null);
      setQuiz2Answer(null);
      setBossPhase("insert");
    });
  
    // Stage 1
    const [tables, setTables]           = useState<Tables>(emptyTables());
    const [selectedBird, setSelectedBird] = useState<number | null>(null);
    const [viewHash, setViewHash]       = useState<"h1"|"h2"|null>(null);
  
    // Stage 2 — First landing
    const [landingDone, setLandingDone] = useState(false);
  
    // Stage 3 — Kick-out battle
    const [kickSteps, setKickSteps]         = useState<KickStep[]>([]);
    const [kickStep, setKickStep]           = useState(0);
    const [kickInsertDone, setKickInsertDone] = useState(false);
  
    // Stage 4 — Infinite loop trap
    const [loopKey, setLoopKey]     = useState<number | null>(null);
    const [loopSteps, setLoopSteps] = useState<KickStep[]>([]);
    const [loopStep, setLoopStep]   = useState(0);
    const [loopAnswer, setLoopAnswer] = useState<string | null>(null);
  
    // Stage 5 — Rehashing
    const [newModBase, setNewModBase] = useState<number | null>(null);
    const [rehashDone, setRehashDone] = useState(false);
  
    // Stage 6 — Lookup + Boss
    const [searchInput, setSearchInput]   = useState("");
    const [searchResult, setSearchResult] = useState<{ steps: ("t1"|"t2")[]; found: boolean } | null>(null);
    const [searchStep, setSearchStep]     = useState(0);
  
    const [bossKeys, setBossKeys]         = useState([10, 20, 30, 25, 15, 5]);
    const [bossInserted, setBossInserted] = useState<number[]>([]);
    const [bossModBase, setBossModBase]   = useState(3);
    const [quiz1Answer, setQuiz1Answer]   = useState<string | null>(null);
    const [quiz2Answer, setQuiz2Answer]   = useState<string | null>(null);
    const [bossPhase, setBossPhase]       = useState<"insert"|"quiz"|"done">("insert");
    const BIRDS = [10, 20, 30, 25, 15, 5];

const renderStage1 = () => (
  <StageWrapper>
    <h2 className="text-3xl font-bold text-primary mb-2">🏰 The Twin Nest Fields</h2>
    <p className="text-muted-foreground mb-6 max-w-md text-center">
      Every bird has two possible nests: <code>T1[h1(k)]</code> and <code>T2[h2(k)]</code>. Click a bird to reveal both.
    </p>

    {/* Birds */}
    <div className="flex gap-2 mb-6 flex-wrap justify-center">
      {BIRDS.map(b => (
        <button
          key={b}
          onClick={() => { setSelectedBird(b); setViewHash("h1"); }}
          className={`w-12 h-12 rounded-full border-2 flex items-center justify-center font-mono text-sm transition-all
            ${selectedBird === b ? "border-primary bg-primary/10 text-primary" : "border-muted-foreground hover:border-primary/60"}`}
        >
          🐦{b}
        </button>
      ))}
    </div>

    {/* Twin islands */}
    <div className="grid grid-cols-2 gap-4 w-full max-w-md mb-6">
      <div className="p-3 rounded-xl border border-blue-500/30 bg-blue-500/5">
        <p className="text-xs font-bold text-blue-400 mb-2 text-center">T1 — Blue Forest</p>
        <div className="flex gap-1 justify-center flex-wrap">
          {Array.from({ length: N }, (_, i) => (
            <div key={i} className={`w-8 h-8 rounded border flex items-center justify-center text-[10px] font-mono
              ${selectedBird !== null && h1(selectedBird) === i ? "border-blue-400 bg-blue-400/20 text-blue-300 animate-pulse" : "border-muted-foreground/30 text-muted-foreground"}`}>
              {i}
            </div>
          ))}
        </div>
      </div>
      <div className="p-3 rounded-xl border border-yellow-500/30 bg-yellow-500/5">
        <p className="text-xs font-bold text-yellow-400 mb-2 text-center">T2 — Golden Desert</p>
        <div className="flex gap-1 justify-center flex-wrap">
          {Array.from({ length: N }, (_, i) => (
            <div key={i} className={`w-8 h-8 rounded border flex items-center justify-center text-[10px] font-mono
              ${selectedBird !== null && h2(selectedBird) === i ? "border-yellow-400 bg-yellow-400/20 text-yellow-300 animate-pulse" : "border-muted-foreground/30 text-muted-foreground"}`}>
              {i}
            </div>
          ))}
        </div>
      </div>
    </div>

    {selectedBird !== null && (
      <p className="text-sm font-mono text-muted-foreground mb-6">
        h1({selectedBird}) = {h1(selectedBird)} → T1[{h1(selectedBird)}] &nbsp;|&nbsp; h2({selectedBird}) = {h2(selectedBird)} → T2[{h2(selectedBird)}]
      </p>
    )}

    {selectedBird !== null && (
      <button
        onClick={() => { game.addXp(50, "✨ Dual Hash Vision"); game.nextStage(); }}
        className="px-8 py-3 bg-primary text-primary-foreground font-bold rounded-xl flex items-center gap-2"
      >
        <Bird className="size-5" /> First Landing →
      </button>
    )}
  </StageWrapper>
);
const renderStage2 = () => {
    const KEY = 10;
    const slot = h1(KEY);
  
    const handleLand = () => {
      const newT1 = [...tables.t1];
      newT1[slot] = KEY;
      setTables({ ...tables, t1: newT1 });
      setLandingDone(true);
    };
  
    return (
      <StageWrapper>
        <h3 className="text-xl font-bold text-primary mb-2">🐣 First Landing</h3>
        <p className="text-muted-foreground text-sm mb-6 max-w-md text-center">
          Insertion always starts at <code>T1[h1(k)]</code>. Bird {KEY} flies to T1[{slot}] — empty, no conflict.
        </p>
  
        {/* T1 visualization */}
        <div className="p-3 rounded-xl border border-blue-500/30 bg-blue-500/5 mb-6">
          <p className="text-xs font-bold text-blue-400 mb-2 text-center">T1 — Blue Forest</p>
          <div className="flex gap-1 justify-center">
            {tables.t1.map((val, i) => (
              <div key={i} className={`w-12 h-12 rounded border-2 flex flex-col items-center justify-center font-mono text-xs
                ${i === slot ? (landingDone ? "border-green-500 bg-green-500/10 text-green-400" : "border-yellow-500 bg-yellow-500/10 text-yellow-300 animate-pulse") : "border-muted-foreground/30"}`}>
                <span>{val ?? "—"}</span>
                <span className="text-[9px] text-muted-foreground">[{i}]</span>
              </div>
            ))}
          </div>
        </div>
  
        {!landingDone ? (
          <button onClick={handleLand} className="px-6 py-2 bg-primary/20 text-primary rounded-lg text-sm mb-4">
            🐦 Land bird {KEY} into T1[{slot}]
          </button>
        ) : (
          <>
            <p className="text-green-400 text-sm mb-4">🎯 Perfect placement! No conflict.</p>
            <button
              onClick={() => { game.addXp(75, "🎯 Perfect Landing"); game.nextStage(); }}
              className="px-8 py-3 bg-primary text-primary-foreground font-bold rounded-xl"
            >
              ⚔️ The Kick-Out Battle →
            </button>
          </>
        )}
      </StageWrapper>
    );
  };
  const renderStage3 = () => {
    const KEY = 20;
  
    const startKick = () => {
      const result = cuckooInsert(tables, KEY);
      setKickSteps(result.steps);
      setKickStep(0);
    };
  
    const finalize = () => {
      const result = cuckooInsert(tables, KEY);
      setTables(result.finalTables);
      setKickInsertDone(true);
    };
  
    const hasSteps = kickSteps.length > 0;
    const isLastStep = hasSteps && kickStep === kickSteps.length - 1;
    const step = hasSteps ? kickSteps[kickStep] : null;
  
    // Build a "preview" table reflecting steps up to current
    const previewTables = (() => {
      const t1 = [...tables.t1], t2 = [...tables.t2];
      if (!hasSteps) return { t1, t2 }; // Safety fallback if array is empty
      
      for (let i = 0; i <= kickStep; i++) {
        const s = kickSteps[i];
        if (s) {
          if (s.table === "t1") t1[s.slot] = s.incoming; 
          else t2[s.slot] = s.incoming;
        }
      }
      return { t1, t2 };
    })();
  
    return (
      <StageWrapper>
        <h3 className="text-xl font-bold text-primary mb-2">⚔️ The Kick-Out Battle</h3>
        <p className="text-muted-foreground text-sm mb-6 max-w-md text-center">
          Insert bird {KEY}. If a nest is occupied, the new bird kicks out the resident, who flies to its alternate nest.
        </p>
  
        {/* Both islands */}
        <div className="grid grid-cols-2 gap-4 w-full max-w-md mb-4">
          {(["t1", "t2"] as const).map(t => (
            <div key={t} className={`p-3 rounded-xl border ${t === "t1" ? "border-blue-500/30 bg-blue-500/5" : "border-yellow-500/30 bg-yellow-500/5"}`}>
              <p className={`text-xs font-bold mb-2 text-center ${t === "t1" ? "text-blue-400" : "text-yellow-400"}`}>{t === "t1" ? "T1" : "T2"}</p>
              <div className="flex gap-1 justify-center flex-wrap">
                {previewTables[t].map((val, i) => {
                  const isActive = step && step.table === t && step.slot === i;
                  return (
                    <div key={i} className={`w-10 h-10 rounded border flex flex-col items-center justify-center text-[10px] font-mono
                      ${isActive ? "border-red-500 bg-red-500/10 text-red-400 animate-pulse" : "border-muted-foreground/30"}`}>
                      <span>{val ?? "—"}</span>
                      <span className="text-[8px] text-muted-foreground">[{i}]</span>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
  
        {/* FIXED CONDITIONALS: Check if hasSteps is true first */}
        {!hasSteps ? (
          <button onClick={startKick} className="px-6 py-2 bg-red-500/20 border border-red-500/40 text-red-400 rounded-lg text-sm mb-4">
            ⚔️ Insert bird {KEY}
          </button>
        ) : !isLastStep ? (
          <>
            <p className="text-sm text-muted-foreground mb-3">
              Bird {step?.incoming} lands in {step?.table.toUpperCase()}[{step?.slot}]
              {step?.evicted !== null && ` → kicks out bird ${step?.evicted} 😠`}
            </p>
            <button onClick={() => setKickStep(s => s + 1)} className="px-6 py-2 bg-primary/20 text-primary rounded-lg text-sm mb-4">
              ▶ Next kick
            </button>
          </>
        ) : !kickInsertDone ? (
          <>
            <p className="text-sm text-green-400 mb-3">Bird {step?.incoming} settles in {step?.table.toUpperCase()}[{step?.slot}] — empty nest found!</p>
            <button onClick={finalize} className="px-6 py-2 bg-green-500/20 border border-green-500/40 text-green-400 rounded-lg text-sm mb-4">
              ✅ Confirm placement
            </button>
          </>
        ) : (
          <>
            <p className="text-green-400 text-sm mb-4">🔥 Collision resolved using displacement! ({kickSteps.length} step(s))</p>
            <button
              onClick={() => { game.addXp(150, "🔥 Kick Master"); game.nextStage(); }}
              className="px-8 py-3 bg-primary text-primary-foreground font-bold rounded-xl"
            >
              🔁 The Infinite Loop Trap →
            </button>
          </>
        )}
      </StageWrapper>
    );
  };
  const renderStage4 = () => {
    const LOOP_KEY = 30; // chosen to likely cycle given small N — verify via cuckooInsert at runtime
  
    const startLoop = () => {
      const result = cuckooInsert(tables, LOOP_KEY);
      setLoopSteps(result.steps);
      setLoopStep(0);
      setLoopKey(LOOP_KEY);
    };
  
    const isComplete = loopSteps.length > 0 && loopStep === loopSteps.length - 1;
    const cycleDetected = loopSteps.length === MAX_KICKS;
  
    return (
      <StageWrapper>
        <h3 className="text-xl font-bold text-red-400 mb-2">🔁 The Infinite Loop Trap</h3>
        <p className="text-muted-foreground text-sm mb-6 max-w-md text-center">
          Insert bird {LOOP_KEY}. Watch the kick counter — if it hits the max, a cycle is detected.
        </p>
  
        {loopSteps.length === 0 ? (
          <button onClick={startLoop} className="px-6 py-2 bg-red-500/20 border border-red-500/40 text-red-400 rounded-lg text-sm mb-4">
            🔁 Insert bird {LOOP_KEY}
          </button>
        ) : (
          <>
            {/* Kick counter */}
            <div className="w-full max-w-sm mb-4">
              <div className="flex justify-between text-xs text-muted-foreground mb-1">
                <span>Kick Count</span>
                <span className={cycleDetected ? "text-red-400" : "text-yellow-400"}>{loopStep + 1} / {MAX_KICKS}</span>
              </div>
              <div className="w-full bg-muted rounded-full h-3 overflow-hidden">
                <div className={`h-full rounded-full transition-all ${cycleDetected ? "bg-red-500" : "bg-yellow-500"}`}
                  style={{ width: `${((loopStep+1) / MAX_KICKS) * 100}%` }} />
              </div>
            </div>
  
            {!isComplete ? (
              <button onClick={() => setLoopStep(s => s+1)} className="px-6 py-2 bg-primary/20 text-primary rounded-lg text-sm mb-4">
                ▶ Next kick (bird {loopSteps[loopStep].evicted ?? "—"} bounces)
              </button>
            ) : (
              <>
                {!cycleDetected ? (
                  <p className="text-green-400 text-sm mb-4">✅ Bird settled — no cycle this time.</p>
                ) : (
                  <div className="w-full max-w-md mb-4">
                    <QuizBlock
                      question="What just happened?"
                      options={[
                        { label: "The bird found an empty nest quickly", value: "a" },
                        { label: "Birds kept bouncing — a cycle was detected (max kicks reached)", value: "b" },
                        { label: "The table is completely empty now", value: "c" },
                      ]}
                      correctValue="b"
                      selectedValue={loopAnswer}
                      onSelect={setLoopAnswer}
                      correctFeedback="✅ Correct! Hitting MAX_KICKS without an empty nest means a cycle — time to rehash."
                      wrongFeedback="❌ The kick counter hit its max — that signals a cycle, not a successful placement."
                    />
                    {loopAnswer && loopAnswer !== "b" && (
                      <button onClick={() => setLoopAnswer(null)} className="px-5 py-2 bg-red-500/20 border border-red-500/40 text-red-400 rounded-xl text-sm hover:bg-red-500/30 transition-all mt-3">
                        🔄 Try Again
                      </button>
                    )}
                  </div>
                )}
  
                {(loopAnswer === "b" || !cycleDetected) && (
                  <button
                    onClick={() => { game.addXp(150, "⚠️ Cycle Breaker"); game.nextStage(); }}
                    className="px-8 py-3 bg-primary text-primary-foreground font-bold rounded-xl"
                  >
                    🔄 Rebirth of the Kingdom →
                  </button>
                )}
              </>
            )}
          </>
        )}
      </StageWrapper>
    );
  };
  const renderStage5 = () => {
    const placedKeys = [...tables.t1, ...tables.t2].filter((v): v is number => v !== null);
  
    const tryRehash = (modBase: number) => {
      setNewModBase(modBase);
      const result = rehashAll(placedKeys.length > 0 ? placedKeys : BIRDS.slice(0,2), modBase);
      if (result.success) {
        setTables(result.tables);
        setRehashDone(true);
      }
    };
  
    return (
      <StageWrapper>
        <h3 className="text-xl font-bold text-primary mb-2">🔄 Rebirth of the Kingdom</h3>
        <p className="text-muted-foreground text-sm mb-6 max-w-md text-center">
          When cycles occur, rebuild with a new <code>h2</code> hash function. Choose a new modulus base and trigger rehash.
        </p>
  
        {!rehashDone ? (
          <>
            <p className="text-sm text-muted-foreground mb-3">Select a new h2 formula: <code>h2(k) = floor(k / base) mod {N}</code></p>
            <div className="flex gap-3 mb-4">
              {[2, 4].map(base => (
                <button
                  key={base}
                  onClick={() => tryRehash(base)}
                  className={`px-4 py-2 rounded-lg border text-sm font-mono transition-all
                    ${newModBase === base ? (rehashDone ? "border-green-500 bg-green-500/10 text-green-400" : "border-red-500 bg-red-500/10 text-red-400") : "border-primary/40 hover:border-primary"}`}
                >
                  base = {base}
                </button>
              ))}
            </div>
  
            {newModBase !== null && !rehashDone && (
              <div className="flex flex-col items-center gap-2 mb-4">
                <p className="text-red-400 text-sm">❌ Still cycles with base = {newModBase}. Try a different base.</p>
                <button onClick={() => setNewModBase(null)} className="px-5 py-2 bg-red-500/20 border border-red-500/40 text-red-400 rounded-xl text-sm hover:bg-red-500/30 transition-all">
                  🔄 Try Again
                </button>
              </div>
            )}
          </>
        ) : (
          <>
            {/* New tables */}
            <div className="grid grid-cols-2 gap-4 w-full max-w-md mb-4">
              {(["t1","t2"] as const).map(t => (
                <div key={t} className={`p-3 rounded-xl border ${t === "t1" ? "border-blue-500/30 bg-blue-500/5" : "border-yellow-500/30 bg-yellow-500/5"}`}>
                  <p className={`text-xs font-bold mb-2 text-center ${t === "t1" ? "text-blue-400" : "text-yellow-400"}`}>{t === "t1" ? "T1" : "T2"} (rebuilt)</p>
                  <div className="flex gap-1 justify-center flex-wrap">
                    {tables[t].map((val, i) => (
                      <div key={i} className="w-10 h-10 rounded border border-green-500/40 bg-green-500/5 flex items-center justify-center text-[10px] font-mono text-green-400">
                        {val ?? "—"}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
  
            <p className="text-green-400 text-sm mb-4">🌟 System stabilized with h2(k) = floor(k / {newModBase}) mod {N}! No more cycles.</p>
            <button
              onClick={() => { game.addXp(200, "🌟 Kingdom Rebuilt"); game.nextStage(); }}
              className="px-8 py-3 bg-primary text-primary-foreground font-bold rounded-xl"
            >
              ⚡ Lightning Lookup →
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
          missionTitle="🐉 Cuckoo Kingdom Restored!"
          missionSubtitle="You mastered dual hashing, displacement, cycle detection, and rehashing."
          xp={game.xp}
          xpLog={game.xpLog}
          achievements={[
            { icon: <Map className="size-4" />,      label: "Dual Hash Vision" },
            { icon: <Bird className="size-4" />,     label: "Perfect Landing" },
            { icon: <Swords className="size-4" />,   label: "Kick Master" },
            { icon: <RotateCcw className="size-4" />, label: "Cycle Breaker" },
            { icon: <Sparkles className="size-4" />, label: "Kingdom Rebuilder" },
            { icon: <Zap className="size-4" />,      label: "O(1) Guardian" },
          ]}
          concepts={[
            { label: "Dual Hashing",      description: "Each key has two homes: T1[h1(k)] and T2[h2(k)]." },
            { label: "Displacement",      description: "On collision, the new key evicts the resident, which moves to its alternate table." },
            { label: "Cycle Detection",   description: "If kicks exceed a max count, a cycle exists — rehash is needed." },
            { label: "Rehashing",         description: "New hash functions and possibly larger tables resolve cycles." },
            { label: "O(1) Lookup",       description: "Search checks only T1[h1(k)] and T2[h2(k)] — at most 2 lookups." },
          ]}
          onReset={game.reset}
        />
      );
    }
  
    // Phase 1: Lightning lookup + boss insertion sequence
    if (bossPhase === "insert") {
      const handleSearch = () => {
        const k = parseInt(searchInput);
        if (isNaN(k)) return;
        setSearchResult(cuckooSearch(tables, k, newModBase ?? 3));
        setSearchStep(0);
      };
  
      const path = searchResult?.steps ?? [];
      const isSearchDone = searchResult && searchStep === path.length - 1;
  
      return (
        <StageWrapper>
          <h3 className="text-xl font-bold text-primary mb-2">⚡ Lightning Lookup</h3>
          <p className="text-muted-foreground text-sm mb-6 max-w-md text-center">
            Search checks <code>T1[h1(k)]</code> first, then <code>T2[h2(k)]</code> — at most 2 steps.
          </p>
  
          <div className="flex gap-2 items-center mb-4">
            <input
              type="number"
              value={searchInput}
              onChange={e => { setSearchInput(e.target.value); setSearchResult(null); }}
              placeholder="Search key"
              className="w-32 px-3 py-2 bg-black/40 border border-primary/30 rounded-lg font-mono text-sm"
            />
            <button onClick={handleSearch} className="px-4 py-2 bg-primary/20 text-primary rounded-lg text-sm">🔍 Search</button>
          </div>
  
          {searchResult && (
            <>
              <p className="text-sm font-mono mb-3">
                Step {searchStep + 1}: checking {path[searchStep].toUpperCase()}
                {searchStep === 0 && ` [h1(${searchInput})=${h1(parseInt(searchInput))}]`}
                {searchStep === 1 && ` [h2(${searchInput})=${h2(parseInt(searchInput), newModBase ?? 3)}]`}
              </p>
              {!isSearchDone ? (
                <button onClick={() => setSearchStep(s => s+1)} className="px-6 py-2 bg-primary/20 text-primary rounded-lg text-sm mb-4">
                  ▶ Next check
                </button>
              ) : (
                <p className={`text-sm mb-4 ${searchResult.found ? "text-green-400" : "text-orange-400"}`}>
                  {searchResult.found ? "⚡ O(1) lookup achieved — Found!" : "❌ Not found in either table."}
                </p>
              )}
            </>
          )}
  
          {searchResult && searchStep === path.length - 1 && (
            <button
              onClick={() => { game.addXp(150, "⚡ O(1) Guardian"); setBossPhase("quiz"); }}
              className="px-8 py-3 bg-primary text-primary-foreground font-bold rounded-xl"
            >
              🐉 Final Boss: The Nest Crisis →
            </button>
          )}
        </StageWrapper>
      );
    }
  
    // Phase 2: Boss quiz
    if (bossPhase === "quiz") return (
      <StageWrapper>
        <h3 className="text-xl font-bold text-primary mb-6">🐉 The Nest Crisis Simulation — Final Boss</h3>
        <p className="text-muted-foreground text-sm mb-4 max-w-md text-center">
          Insert sequence: <code>10, 20, 30, 25, 15, 5</code> using Cuckoo Hashing.
        </p>
  
        <div className="w-full max-w-md space-y-6 mb-8">
          <QuizBlock
            question="What triggers a rehash during this insertion sequence?"
            options={[
              { label: "Whenever a table becomes empty",                          value: "a" },
              { label: "When the kick count exceeds MAX_KICKS (a cycle is detected)", value: "b" },
              { label: "After every single insertion",                            value: "c" },
            ]}
            correctValue="b"
            selectedValue={quiz1Answer}
            onSelect={setQuiz1Answer}
            correctFeedback="✅ Correct! Rehashing only happens when a cycle is detected via the kick limit."
            wrongFeedback="❌ Rehash is triggered specifically by cycle detection — not every insert, and not on empty tables."
          />
  
          {quiz1Answer && quiz1Answer !== "b" && (
            <button onClick={() => setQuiz1Answer(null)} className="px-5 py-2 bg-red-500/20 border border-red-500/40 text-red-400 rounded-xl text-sm hover:bg-red-500/30 transition-all">
              🔄 Try Again
            </button>
          )}
  
          {quiz1Answer === "b" && (
            <>
              <QuizBlock
                question="What is the worst-case lookup time in Cuckoo Hashing?"
                options={[
                  { label: "O(n) — must scan the whole table", value: "a" },
                  { label: "O(1) — at most 2 fixed lookups",    value: "b" },
                  { label: "O(log n) — binary search",          value: "c" },
                ]}
                correctValue="b"
                selectedValue={quiz2Answer}
                onSelect={setQuiz2Answer}
                correctFeedback="✅ Correct! Lookup always checks exactly T1[h1(k)] and T2[h2(k)] — constant time."
                wrongFeedback="❌ The defining feature of Cuckoo Hashing is guaranteed O(1) lookup — just 2 checks."
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
            onClick={() => { game.addXp(300, "🐉 Nest Crisis Resolved"); setBossPhase("done"); }}
            className="px-8 py-3 bg-primary text-primary-foreground font-bold rounded-xl animate-in zoom-in"
          >
            🎉 Restore Cuckoo Kingdom →
          </button>
        )}
      </StageWrapper>
    );
  };
  return (
    <SimShell
      title="Cuckoo Kingdom"
      subtitle="The Great Nest Swap Protocol"
      xp={game.xp}
      stage={game.stage}
      totalStages={TOTAL_STAGES}
      mistakeMessage={game.mistakeMessage}
      successMessage={game.successMessage}
      icon={<Bird className="size-5 text-primary" />}
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