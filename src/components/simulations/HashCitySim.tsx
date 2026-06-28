import { useState } from "react";
import { Building2, Zap, Search, Skull, Gauge, Scale } from "lucide-react";
import {
  useSimGame,
  SimShell,
  StageWrapper,
  QuizBlock,
  CompletionScreen,
} from "@/components/simulations/shared";
const TOTAL_STAGES = 6;
const M = 7; // table size

type Slot = { key: number | null; tombstone: boolean };

const emptyTable = (size: number): Slot[] =>
  Array.from({ length: size }, () => ({ key: null, tombstone: false }));

const hash = (k: number, size: number) => k % size;

// Linear probe insert — returns probe sequence (slots visited) + final slot
function probeInsert(table: Slot[], key: number): { path: number[]; finalSlot: number } {
  const size = table.length;
  const path: number[] = [];
  let i = 0;
  while (i < size) {
    const slot = (hash(key, size) + i) % size;
    path.push(slot);
    if (table[slot].key === null) return { path, finalSlot: slot };
    i++;
  }
  return { path, finalSlot: -1 }; // table full
}

// Linear probe search — returns path + result
function probeSearch(table: Slot[], key: number): { path: number[]; found: boolean } {
  const size = table.length;
  let i = 0;
  const path: number[] = [];
  while (i < size) {
    const slot = (hash(key, size) + i) % size;
    path.push(slot);
    if (table[slot].key === null && !table[slot].tombstone) return { path, found: false };
    if (table[slot].key === key) return { path, found: true };
    i++;
  }
  return { path, found: false };
}

const loadFactor = (table: Slot[]) => table.filter(s => s.key !== null).length / table.length;
export function HashCitySim() {
    const game = useSimGame(TOTAL_STAGES, () => {
      setTable(emptyTable(M));
      setCitizenInput("");
      setHashAnswer(null);
      setStrategy(null);
      setCollisionInserted(false);
      setProbePath([]);
      setProbeStep(0);
      setProbeAnswer(null);
      setSearchInput("");
      setSearchResult(null);
      setSearchStep(0);
      setDeleteTarget(null);
      setTombstoneAnswer(null);
      setOverloadCount(0);
      setResizeDone(false);
      setQuiz1Answer(null);
      setQuiz2Answer(null);
      setBossPhase("compare");
      setBossDataset(10);
    });
  
    // Stage 1 — Hash function
    const [table, setTable]           = useState<Slot[]>(emptyTable(M));
    const [citizenInput, setCitizenInput] = useState("");
    const [hashAnswer, setHashAnswer] = useState<string | null>(null);
  
    // Stage 2 — Collision + Linear probing
    const [strategy, setStrategy]               = useState<string | null>(null);
    const [collisionInserted, setCollisionInserted] = useState(false);
    const [probePath, setProbePath]             = useState<number[]>([]);
    const [probeStep, setProbeStep]             = useState(0);
    const [probeAnswer, setProbeAnswer]         = useState<string | null>(null);
  
    // Stage 3 — Search
    const [searchInput,  setSearchInput]  = useState("");
    const [searchResult, setSearchResult] = useState<{ path: number[]; found: boolean } | null>(null);
    const [searchStep,   setSearchStep]   = useState(0);
  
    // Stage 4 — Tombstones
    const [deleteTarget, setDeleteTarget]       = useState<number | null>(null);
    const [tombstoneAnswer, setTombstoneAnswer] = useState<string | null>(null);
  
    // Stage 5 — Load factor + resize
    const [overloadCount, setOverloadCount] = useState(0);
    const [resizeDone, setResizeDone]       = useState(false);
  
    // Stage 6 — Boss
    const [quiz1Answer, setQuiz1Answer] = useState<string | null>(null);
    const [quiz2Answer, setQuiz2Answer] = useState<string | null>(null);
    const [bossPhase, setBossPhase]     = useState<"compare"|"quiz"|"done">("compare");
    const [bossDataset, setBossDataset] = useState(10);
    const renderStage1 = () => {
        const k = parseInt(citizenInput);
        const correctSlot = !isNaN(k) ? hash(k, M) : null;
      
        const handleDrop = () => {
          if (correctSlot === null || hashAnswer !== String(correctSlot)) return;
          const newTable = [...table];
          newTable[correctSlot] = { key: k, tombstone: false };
          setTable(newTable);
        };
      
        return (
          <StageWrapper>
            <h2 className="text-3xl font-bold text-primary mb-2">🏙️ City Blueprint: The Hash Function</h2>
            <p className="text-muted-foreground mb-6 max-w-md text-center">
              Every citizen gets a home using <code>k mod M</code> (M = {M}). Drop a citizen into the Hash Machine.
            </p>
      
            {/* Circular city slots */}
            <div className="flex gap-2 mb-6 flex-wrap justify-center">
              {table.map((slot, i) => (
                <div key={i} className={`w-12 h-12 rounded-lg border-2 flex flex-col items-center justify-center font-mono text-xs transition-all
                  ${slot.key !== null ? "border-green-500 bg-green-500/10 text-green-400" : "border-primary/30 text-muted-foreground"}`}>
                  <span>{slot.key ?? "—"}</span>
                  <span className="text-[9px]">[{i}]</span>
                </div>
              ))}
            </div>
      
            {/* Input */}
            <div className="flex gap-2 items-center mb-4">
              <input
                type="number"
                value={citizenInput}
                onChange={e => { setCitizenInput(e.target.value); setHashAnswer(null); }}
                placeholder="Citizen key (e.g. 23)"
                className="w-36 px-3 py-2 bg-black/40 border border-primary/30 rounded-lg font-mono text-sm"
              />
            </div>
      
            {citizenInput && correctSlot !== null && (
              <>
                <p className="text-sm text-muted-foreground mb-3">{k} mod {M} = ?</p>
                <div className="flex gap-2 mb-4 flex-wrap justify-center">
                  {Array.from({ length: M }, (_, i) => i).map(opt => (
                    <button
                      key={opt}
                      onClick={() => setHashAnswer(String(opt))}
                      className={`w-10 h-10 rounded-lg border font-mono text-sm transition-all
                        ${hashAnswer === String(opt)
                          ? (opt === correctSlot ? "border-green-500 bg-green-500/10 text-green-400" : "border-red-500 bg-red-500/10 text-red-400")
                          : "border-muted-foreground hover:border-primary"}`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
      
                {hashAnswer !== null && Number(hashAnswer) !== correctSlot && (
                  <button onClick={() => setHashAnswer(null)} className="px-5 py-2 bg-red-500/20 border border-red-500/40 text-red-400 rounded-xl text-sm hover:bg-red-500/30 transition-all mb-4">
                    🔄 Try Again
                  </button>
                )}
      
                {hashAnswer === String(correctSlot) && table[correctSlot].key === null && (
                  <button onClick={handleDrop} className="px-6 py-2 bg-primary/20 text-primary rounded-lg text-sm mb-4">
                    ⚡ Drop into slot {correctSlot}
                  </button>
                )}
              </>
            )}
      
            {table.filter(s => s.key !== null).length >= 1 && (
              <button
                onClick={() => { game.addXp(50, "🏆 Hash Architect"); game.nextStage(); }}
                className="px-8 py-3 bg-primary text-primary-foreground font-bold rounded-xl"
              >
                💥 Collision Chaos →
              </button>
            )}
          </StageWrapper>
        );
      };
      const renderStage2 = () => {
        const COLLISION_KEY = table.findIndex(s => s.key !== null) >= 0
          ? table[table.findIndex(s => s.key !== null)].key! + M  // guarantees same hash → collision
          : 23 + M;
      
        const triggerCollision = () => {
          if (!collisionInserted) {
            const { path, finalSlot } = probeInsert(table, COLLISION_KEY);
            setProbePath(path);
            setProbeStep(0);
            setCollisionInserted(true);
          }
        };
      
        const finalizeProbe = () => {
          const { finalSlot } = probeInsert(table, COLLISION_KEY);
          const newTable = [...table];
          newTable[finalSlot] = { key: COLLISION_KEY, tombstone: false };
          setTable(newTable);
        };
      
        const isComplete = probePath.length > 0 && table.some(s => s.key === COLLISION_KEY);
      
        return (
          <StageWrapper>
            <h3 className="text-xl font-bold text-primary mb-2">💥 Collision Chaos & Linear Probing</h3>
            <p className="text-muted-foreground text-sm mb-6 max-w-md text-center">
              Citizen <strong>{COLLISION_KEY}</strong> hashes to slot {hash(COLLISION_KEY, M)} — already occupied! Choose a strategy and probe.
            </p>
      
            {/* Strategy choice */}
            {!strategy && (
              <div className="flex gap-3 mb-6 flex-wrap justify-center">
                {["Linear Probing", "Quadratic", "Double Hashing"].map(s => (
                  <button
                    key={s}
                    onClick={() => setStrategy(s)}
                    className={`px-4 py-2 rounded-lg border text-sm transition-all
                      ${s === "Linear Probing" ? "border-primary/40 hover:border-primary" : "border-muted-foreground hover:border-primary/60"}`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}
      
            {strategy && strategy !== "Linear Probing" && (
              <div className="flex flex-col items-center gap-2 mb-4">
                <p className="text-orange-400 text-sm">⚠️ This sim focuses on Linear Probing — try that strategy.</p>
                <button onClick={() => setStrategy(null)} className="px-5 py-2 bg-red-500/20 border border-red-500/40 text-red-400 rounded-xl text-sm hover:bg-red-500/30 transition-all">
                  🔄 Choose Again
                </button>
              </div>
            )}
      
            {strategy === "Linear Probing" && (
              <>
                {/* City slots */}
                <div className="flex gap-2 mb-4 flex-wrap justify-center">
                  {table.map((slot, i) => (
                    <div key={i} className={`w-12 h-12 rounded-lg border-2 flex flex-col items-center justify-center font-mono text-xs transition-all
                      ${slot.key === COLLISION_KEY ? "border-green-500 bg-green-500/10 text-green-400"
                        : probePath.slice(0, probeStep+1).includes(i) ? "border-yellow-500 bg-yellow-500/10 text-yellow-300"
                        : slot.key !== null ? "border-red-500/40 bg-red-500/5 text-red-400/70"
                        : "border-primary/30 text-muted-foreground"}`}>
                      <span>{slot.key ?? "—"}</span>
                      <span className="text-[9px]">[{i}]</span>
                    </div>
                  ))}
                </div>
      
                {!collisionInserted ? (
                  <button onClick={triggerCollision} className="px-6 py-2 bg-red-500/20 border border-red-500/40 text-red-400 rounded-lg text-sm mb-4">
                    💥 Insert {COLLISION_KEY} (collision!)
                  </button>
                ) : !isComplete ? (
                  <>
                    <p className="text-sm text-muted-foreground mb-3">
                      Step i = {probeStep}: checking slot ({hash(COLLISION_KEY,M)} + {probeStep}) mod {M} = {probePath[probeStep]}
                    </p>
                    {probeAnswer === null ? (
                      <div className="flex gap-2 mb-4">
                        <button onClick={() => setProbeAnswer("occupied")} className="px-4 py-2 rounded-lg border border-muted-foreground hover:border-primary text-sm">Occupied — keep probing</button>
                        <button onClick={() => setProbeAnswer("empty")} className="px-4 py-2 rounded-lg border border-muted-foreground hover:border-primary text-sm">Empty — insert here</button>
                      </div>
                    ) : null}
      
                    {probeAnswer && (() => {
                      const isLast = probeStep === probePath.length - 1;
                      const correct = isLast ? "empty" : "occupied";
                      if (probeAnswer !== correct) {
                        return (
                          <div className="flex flex-col items-center gap-2 mb-4">
                            <p className="text-red-400 text-sm">❌ Slot {probePath[probeStep]} is {table[probePath[probeStep]].key !== null ? "occupied" : "empty"}.</p>
                            <button onClick={() => setProbeAnswer(null)} className="px-5 py-2 bg-red-500/20 border border-red-500/40 text-red-400 rounded-xl text-sm hover:bg-red-500/30 transition-all">
                              🔄 Try Again
                            </button>
                          </div>
                        );
                      }
                      if (correct === "occupied") {
                        return (
                          <button onClick={() => { setProbeStep(s => s+1); setProbeAnswer(null); }} className="px-6 py-2 bg-primary/20 text-primary rounded-lg text-sm mb-4">
                            ▶ Probe next slot (i+1)
                          </button>
                        );
                      }
                      return (
                        <button onClick={finalizeProbe} className="px-6 py-2 bg-green-500/20 border border-green-500/40 text-green-400 rounded-lg text-sm mb-4">
                          ✅ Insert {COLLISION_KEY} into slot {probePath[probeStep]}
                        </button>
                      );
                    })()}
                  </>
                ) : (
                  <button
                    onClick={() => { game.addXp(125, "🏆 Collision Solver"); game.nextStage(); }}
                    className="px-8 py-3 bg-primary text-primary-foreground font-bold rounded-xl"
                  >
                    🕵️ Search Operation →
                  </button>
                )}
              </>
            )}
          </StageWrapper>
        );
      };
      const renderStage3 = () => {
        const handleSearch = () => {
          const k = parseInt(searchInput);
          if (isNaN(k)) return;
          setSearchResult(probeSearch(table, k));
          setSearchStep(0);
        };
      
        const path = searchResult?.path ?? [];
        const isComplete = searchResult && searchStep === path.length - 1;
      
        return (
          <StageWrapper>
            <h3 className="text-xl font-bold text-primary mb-2">🕵️ Search Operation: Detective Mode</h3>
            <p className="text-muted-foreground text-sm mb-6 max-w-md text-center">
              To search, follow the same probe sequence used during insertion until found or an empty (non-tombstone) slot is hit.
            </p>
      
            <div className="flex gap-2 items-center mb-4">
              <input
                type="number"
                value={searchInput}
                onChange={e => { setSearchInput(e.target.value); setSearchResult(null); }}
                placeholder="Search key"
                className="w-36 px-3 py-2 bg-black/40 border border-primary/30 rounded-lg font-mono text-sm"
              />
              <button onClick={handleSearch} className="px-4 py-2 bg-primary/20 text-primary rounded-lg text-sm">🔍 Search</button>
            </div>
      
            {/* City slots */}
            <div className="flex gap-2 mb-4 flex-wrap justify-center">
              {table.map((slot, i) => (
                <div key={i} className={`w-12 h-12 rounded-lg border-2 flex flex-col items-center justify-center font-mono text-xs transition-all
                  ${path.slice(0, searchStep+1).includes(i) ? "border-yellow-500 bg-yellow-500/10 text-yellow-300"
                    : slot.key !== null ? "border-primary/40 text-primary/70"
                    : "border-primary/20 text-muted-foreground"}`}>
                  <span>{slot.key ?? (slot.tombstone ? "🪦" : "—")}</span>
                  <span className="text-[9px]">[{i}]</span>
                </div>
              ))}
            </div>
      
            {searchResult && !isComplete && (
              <button onClick={() => setSearchStep(s => s+1)} className="px-6 py-2 bg-primary/20 text-primary rounded-lg text-sm mb-4">
                🔍 Drone steps to slot {path[searchStep+1]}
              </button>
            )}
      
            {isComplete && (
              <>
                <p className={`text-sm mb-4 ${searchResult.found ? "text-green-400" : "text-orange-400"}`}>
                  {searchResult.found ? "✅ Target Found!" : "❌ Not in city — search ended at empty slot."}
                </p>
                <button
                  onClick={() => { game.addXp(75, "🕵️ Detective"); game.nextStage(); }}
                  className="px-8 py-3 bg-primary text-primary-foreground font-bold rounded-xl"
                >
                  🪦 The Tombstone Problem →
                </button>
              </>
            )}
          </StageWrapper>
        );
      };
      const renderStage4 = () => {
  const occupiedIndices = table.map((s, i) => s.key !== null ? i : -1).filter(i => i >= 0);

  const correctDelete = () => {
    if (deleteTarget === null) return;
    const newTable = [...table];
    newTable[deleteTarget] = { key: null, tombstone: true };
    setTable(newTable);
  };

  return (
    <StageWrapper>
      <h3 className="text-xl font-bold text-primary mb-2">🪦 The Tombstone Problem</h3>
      <p className="text-muted-foreground text-sm mb-6 max-w-md text-center">
        Deleting normally (setting a slot to empty) breaks future probe chains. Use a <strong>tombstone</strong> instead.
      </p>

      <div className="flex gap-2 mb-4 flex-wrap justify-center">
        {table.map((slot, i) => (
          <div
            key={i}
            onClick={() => slot.key !== null && setDeleteTarget(i)}
            className={`w-12 h-12 rounded-lg border-2 flex flex-col items-center justify-center font-mono text-xs transition-all
              ${slot.key !== null ? "cursor-pointer" : ""}
              ${deleteTarget === i ? "border-yellow-500 bg-yellow-500/10 text-yellow-300"
                : slot.key !== null ? "border-primary/40 text-primary/70 hover:border-primary"
                : slot.tombstone ? "border-orange-500/40 bg-orange-500/5 text-orange-400"
                : "border-primary/20 text-muted-foreground"}`}
          >
            <span>{slot.key ?? (slot.tombstone ? "🪦" : "—")}</span>
            <span className="text-[9px]">[{i}]</span>
          </div>
        ))}
      </div>

      {deleteTarget !== null && table[deleteTarget].key !== null && (
        <div className="w-full max-w-md mb-4">
          <QuizBlock
            question={`How should you delete the citizen in slot ${deleteTarget}?`}
            options={[
              { label: "Set the slot to completely empty",        value: "empty" },
              { label: "Mark the slot as a tombstone (🪦)",        value: "tombstone" },
            ]}
            correctValue="tombstone"
            selectedValue={tombstoneAnswer}
            onSelect={setTombstoneAnswer}
            correctFeedback="✅ Correct! A tombstone preserves the probe chain for future searches."
            wrongFeedback="❌ Setting it fully empty would break searches that probe past this slot."
          />
        </div>
      )}

      {tombstoneAnswer && tombstoneAnswer !== "tombstone" && (
        <button onClick={() => setTombstoneAnswer(null)} className="px-5 py-2 bg-red-500/20 border border-red-500/40 text-red-400 rounded-xl text-sm hover:bg-red-500/30 transition-all mb-4">
          🔄 Try Again
        </button>
      )}

      {tombstoneAnswer === "tombstone" && table[deleteTarget!].key !== null && (
        <button onClick={correctDelete} className="px-6 py-2 bg-orange-500/20 border border-orange-500/40 text-orange-400 rounded-lg text-sm mb-4">
          🪦 Apply Tombstone
        </button>
      )}

      {table.some(s => s.tombstone) && (
        <button
          onClick={() => { game.addXp(100, "⚠️ Tombstone Keeper"); game.nextStage(); }}
          className="px-8 py-3 bg-primary text-primary-foreground font-bold rounded-xl"
        >
          📈 City Overcrowding →
        </button>
      )}
    </StageWrapper>
  );
};
const renderStage5 = () => {
    const alpha = loadFactor(table);
    const isOverloaded = alpha > 0.7;
  
    const insertRandom = () => {
      const occupiedKeys = table.filter(s => s.key !== null).map(s => s.key!);
      let newKey;
      do { newKey = Math.floor(Math.random() * 90) + 10; } while (occupiedKeys.includes(newKey));
      const { finalSlot } = probeInsert(table, newKey);
      if (finalSlot === -1) return;
      const newTable = [...table];
      newTable[finalSlot] = { key: newKey, tombstone: false };
      setTable(newTable);
      setOverloadCount(c => c + 1);
    };
  
    const doResize = () => {
      const newSize = M * 2;
      const newTable = emptyTable(newSize);
      table.filter(s => s.key !== null).forEach(s => {
        const { finalSlot } = probeInsert(newTable, s.key!);
        newTable[finalSlot] = { key: s.key, tombstone: false };
      });
      setTable(newTable);
      setResizeDone(true);
    };
  
    return (
      <StageWrapper>
        <h3 className="text-xl font-bold text-primary mb-2">📈 City Overcrowding & Resizing</h3>
        <p className="text-muted-foreground text-sm mb-6 max-w-md text-center">
          Load factor <code>α = n / M</code>. When α &gt; 0.7, performance degrades — time to resize.
        </p>
  
        {/* Load factor meter */}
        <div className="w-full max-w-sm mb-6">
          <div className="flex justify-between text-xs text-muted-foreground mb-1">
            <span>Load Factor (α)</span>
            <span className={isOverloaded ? "text-red-400" : "text-green-400"}>{alpha.toFixed(2)}</span>
          </div>
          <div className="w-full bg-muted rounded-full h-4 overflow-hidden">
            <div className={`h-full rounded-full transition-all duration-300 ${isOverloaded ? "bg-red-500" : "bg-green-500"}`}
              style={{ width: `${Math.min(alpha * 100, 100)}%` }} />
          </div>
        </div>
  
        {/* City slots */}
        <div className="flex gap-2 mb-6 flex-wrap justify-center max-w-md">
          {table.map((slot, i) => (
            <div key={i} className={`w-10 h-10 rounded-lg border-2 flex items-center justify-center font-mono text-[10px]
              ${slot.key !== null ? (isOverloaded ? "border-red-500 bg-red-500/10 text-red-400" : "border-green-500 bg-green-500/10 text-green-400")
                : "border-primary/20 text-muted-foreground"}`}>
              {slot.key ?? (slot.tombstone ? "🪦" : "")}
            </div>
          ))}
        </div>
  
        {!isOverloaded ? (
          <button onClick={insertRandom} className="px-6 py-2 bg-primary/20 text-primary rounded-lg text-sm mb-4">
            🏠 Insert random citizen
          </button>
        ) : !resizeDone ? (
          <div className="flex flex-col items-center gap-2 mb-4">
            <p className="text-red-400 text-sm">🚦 Overload detected! α = {alpha.toFixed(2)} &gt; 0.7</p>
            <button onClick={doResize} className="px-6 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-bold">
              🌐 Trigger Resize (M → {M * 2})
            </button>
          </div>
        ) : (
          <>
            <p className="text-green-400 text-sm mb-4">🚀 City successfully upgraded! New table size = {table.length}, α = {loadFactor(table).toFixed(2)}</p>
            <button
              onClick={() => { game.addXp(150, "🏆 Scalability Master"); game.nextStage(); }}
              className="px-8 py-3 bg-primary text-primary-foreground font-bold rounded-xl"
            >
              ⚔️ Final Boss: Save Hash City →
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
          missionTitle="🎆 Hash City Stabilized!"
          missionSubtitle="You restored balance using open addressing, linear probing, tombstones, and dynamic resizing."
          xp={game.xp}
          xpLog={game.xpLog}
          achievements={[
            { icon: <Building2 className="size-4" />, label: "Hash Architect" },
            { icon: <Zap className="size-4" />,        label: "Collision Solver" },
            { icon: <Search className="size-4" />,     label: "Detective" },
            { icon: <Skull className="size-4" />,      label: "Tombstone Keeper" },
            { icon: <Gauge className="size-4" />,      label: "Scalability Master" },
            { icon: <Scale className="size-4" />,      label: "Trade-off Strategist" },
          ]}
          concepts={[
            { label: "Hash Function",     description: "k mod M maps a key to a table slot." },
            { label: "Collision",         description: "Two keys hash to the same slot — must be resolved." },
            { label: "Linear Probing",    description: "Check (h(k)+i) mod M sequentially until an empty slot." },
            { label: "Tombstones",        description: "Lazy deletion preserves probe chains for future searches." },
            { label: "Load Factor",       description: "α = n/M; when α > 0.7, resize the table and rehash." },
            { label: "Open Addr vs Chaining", description: "Open addressing uses probing; chaining uses linked lists per slot." },
          ]}
          onReset={game.reset}
        />
      );
    }
  
    // Phase 1: Open Addressing vs Chaining comparison
    if (bossPhase === "compare") return (
      <StageWrapper>
        <h3 className="text-xl font-bold text-primary mb-2">⚔️ Open Addressing vs Chaining Arena</h3>
        <p className="text-muted-foreground text-sm mb-6 max-w-md text-center">
          Two strategies, same data. Toggle dataset size to compare clustering vs chaining growth.
        </p>
  
        <div className="flex gap-3 mb-6">
          {[5, 10, 15].map(n => (
            <button
              key={n}
              onClick={() => setBossDataset(n)}
              className={`px-4 py-2 rounded-lg border text-sm transition-all
                ${bossDataset === n ? "border-primary bg-primary/10 text-primary" : "border-muted-foreground"}`}
            >
              {n} citizens
            </button>
          ))}
        </div>
  
        {/* Split screen comparison */}
        <div className="grid grid-cols-2 gap-4 w-full max-w-md mb-6">
          <div className="p-3 rounded-xl border border-orange-500/30 bg-orange-500/5 text-center">
            <p className="text-xs font-bold text-orange-400 mb-2">Open Addressing</p>
            <p className="text-2xl font-mono">{Math.min(bossDataset, M)}/{M}</p>
            <p className="text-[10px] text-muted-foreground mt-1">
              {bossDataset > M ? "⚠️ Table full — needs resize" : "Clusters form near collisions"}
            </p>
          </div>
          <div className="p-3 rounded-xl border border-blue-500/30 bg-blue-500/5 text-center">
            <p className="text-xs font-bold text-blue-400 mb-2">Chaining</p>
            <p className="text-2xl font-mono">{(bossDataset / M).toFixed(1)} avg/chain</p>
            <p className="text-[10px] text-muted-foreground mt-1">Linked lists grow per slot — no resize needed</p>
          </div>
        </div>
  
        <div className="w-full max-w-md space-y-6 mb-8">
          <QuizBlock
            question="Which approach handles a high load factor more gracefully without resizing?"
            options={[
              { label: "Open Addressing", value: "a" },
              { label: "Chaining",        value: "b" },
            ]}
            correctValue="b"
            selectedValue={quiz1Answer}
            onSelect={setQuiz1Answer}
            correctFeedback="✅ Correct! Chaining lets each slot grow a linked list — open addressing needs free slots."
            wrongFeedback="❌ Open addressing requires empty slots to probe into — chaining handles overflow via linked lists."
          />
  
          {quiz1Answer && quiz1Answer !== "b" && (
            <button onClick={() => setQuiz1Answer(null)} className="px-5 py-2 bg-red-500/20 border border-red-500/40 text-red-400 rounded-xl text-sm hover:bg-red-500/30 transition-all">
              🔄 Try Again
            </button>
          )}
  
          {quiz1Answer === "b" && (
            <>
              <QuizBlock
                question="Why does open addressing generally have better cache performance than chaining?"
                options={[
                  { label: "It uses more memory per element",                          value: "a" },
                  { label: "Data is stored contiguously in the array — better locality", value: "b" },
                  { label: "It never has collisions",                                  value: "c" },
                ]}
                correctValue="b"
                selectedValue={quiz2Answer}
                onSelect={setQuiz2Answer}
                correctFeedback="✅ Correct! Contiguous array storage means better cache locality vs scattered linked-list nodes."
                wrongFeedback="❌ Open addressing still has collisions — its advantage is array locality for cache performance."
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
            onClick={() => { game.addXp(300, "⚖️ Trade-off Strategist"); setBossPhase("done"); }}
            className="px-8 py-3 bg-primary text-primary-foreground font-bold rounded-xl animate-in zoom-in"
          >
            🎆 Save Hash City →
          </button>
        )}
      </StageWrapper>
    );
  };
  return (
    <SimShell
      title="Hash City"
      subtitle="The Collision Crisis"
      xp={game.xp}
      stage={game.stage}
      totalStages={TOTAL_STAGES}
      mistakeMessage={game.mistakeMessage}
      successMessage={game.successMessage}
      icon={<Building2 className="size-5 text-primary" />}
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