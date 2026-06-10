import { useRef, useState } from "react";
import { Search, TreePine, Zap, Brain, AlertTriangle, Crown, BarChart2  } from "lucide-react";
import {
  useSimGame,
  SimShell,
  StageWrapper,
  QuizBlock,
  CompletionScreen,
} from "@/components/simulations/shared";

const TOTAL_STAGES = 6;

export function DataKingdomSim() {
  const game = useSimGame(TOTAL_STAGES, () => {
    setScanCount(0);
    setScanRunning(false);
    setRowSize(1000);
    setTreeBuilt(false);
    setTreeNodes([]);
    setIndexUsed(false);
    setExplainMode("none");
    setCardinalityMode("high");
    setQuiz1Answer(null);
    setQuiz2Answer(null);
    setBossColumn(null);
    setBossResult(null);
  });

  // Stage 1 — Full table scan
  const [rowSize, setRowSize]           = useState(1000);
  const [scanCount, setScanCount]       = useState(0);
  const [scanRunning, setScanRunning]   = useState(false);
  const scanRef                         = useRef<ReturnType<typeof setInterval> | null>(null);

  // Stage 3 — B-tree building
  const [treeBuilt, setTreeBuilt]       = useState(false);
  const [treeNodes, setTreeNodes]       = useState<string[]>([]);
  const NAMES = ["Amit","Bala","Dev","Esha","Kiran","Priya","Ravi","Tara","Uma","Zara"];

  // Stage 4 — Index search comparison
  const [indexUsed, setIndexUsed]       = useState(false);

  // Stage 5 — EXPLAIN PLAN toggle
  const [explainMode, setExplainMode]   = useState<"none"|"scan"|"index">("none");

  // Stage 6 — Low cardinality
  const [cardinalityMode, setCardinalityMode] = useState<"high"|"low">("high");

  // Mini challenge quiz answers
  const [quiz1Answer, setQuiz1Answer]   = useState<string | null>(null);
  const [quiz2Answer, setQuiz2Answer]   = useState<string | null>(null);

  // Boss stage
  const [bossColumn, setBossColumn]     = useState<string | null>(null);
  const [bossResult, setBossResult]     = useState<"win"|"fail"|null>(null);

  const startScan = () => {
    setScanCount(0);
    setScanRunning(true);
    let count = 0;
    const step = Math.ceil(rowSize / 80); // finish in ~80 ticks
    scanRef.current = setInterval(() => {
      count += step;
      if (count >= rowSize) {
        count = rowSize;
        clearInterval(scanRef.current!);
        setScanRunning(false);
      }
      setScanCount(count);
    }, 30);
  };
  
  const renderStage1 = () => (
    <StageWrapper>
      <h2 className="text-3xl font-bold text-primary mb-2">🏙️ The Endless City Search</h2>
      <p className="text-muted-foreground mb-6 max-w-md text-center">
        Find all people named <strong>"Ravi"</strong> — the system will check every single row.
      </p>
  
      {/* Row size picker */}
      <div className="flex gap-3 mb-6">
        {[1000, 10000, 100000].map(n => (
          <button
            key={n}
            onClick={() => { setRowSize(n); setScanCount(0); setScanRunning(false); }}
            className={`px-4 py-2 rounded-lg border text-sm font-mono transition-all
              ${rowSize === n ? "border-primary bg-primary/10 text-primary" : "border-muted-foreground"}`}
          >
            {n.toLocaleString()} rows
          </button>
        ))}
      </div>
  
      {/* Progress bar */}
      <div className="w-full max-w-md bg-muted rounded-full h-4 mb-2 overflow-hidden">
        <div
          className="h-full bg-orange-500 transition-all duration-75"
          style={{ width: `${(scanCount / rowSize) * 100}%` }}
        />
      </div>
      <p className="text-sm font-mono text-muted-foreground mb-6">
        Rows scanned: <span className="text-orange-400 font-bold">{scanCount.toLocaleString()}</span> / {rowSize.toLocaleString()}
      </p>
  
      {/* Complexity badge */}
      <div className="px-4 py-2 bg-orange-500/10 border border-orange-500/40 rounded-lg text-sm mb-6 font-mono">
        Complexity: <strong className="text-orange-400">O(n)</strong> — grows linearly with rows
      </div>
  
      {!scanRunning && scanCount === 0 && (
        <button onClick={startScan} className="px-8 py-3 bg-primary text-primary-foreground font-bold rounded-xl flex items-center gap-2">
          <Search className="size-5" /> Start City Search
        </button>
      )}
  
      {scanRunning && (
        <p className="text-orange-400 animate-pulse text-sm">🔍 Scanning every house…</p>
      )}
  
      {!scanRunning && scanCount === rowSize && scanCount > 0 && (
        <button
          onClick={() => { game.addXp(100, "🏅 Relentless Scanner"); game.nextStage(); }}
          className="px-8 py-3 bg-primary text-primary-foreground font-bold rounded-xl mt-4"
        >
          📊 View Performance Crisis →
        </button>
      )}
    </StageWrapper>
  );

  const renderStage2 = () => (
    <StageWrapper>
      <h3 className="text-xl font-bold text-red-400 mb-2">🚨 The Performance Crisis</h3>
      <p className="text-muted-foreground text-sm mb-6 max-w-md text-center">
        Full scans are fine for small towns… but disastrous for large cities.
      </p>
  
      {/* CPU meter visual */}
      <div className="w-full max-w-sm mb-6">
        <div className="flex justify-between text-xs text-muted-foreground mb-1">
          <span>CPU Load</span><span className="text-red-400 font-bold">98%</span>
        </div>
        <div className="w-full bg-muted rounded-full h-5 overflow-hidden">
          <div className="h-full bg-red-500 rounded-full animate-pulse" style={{ width: "98%" }} />
        </div>
      </div>
  
      {/* Warning cards */}
      <div className="grid grid-cols-1 gap-3 w-full max-w-sm mb-8">
        {[
          { icon: "🐌", label: "Query Timeout", desc: "Taking 12+ seconds" },
          { icon: "🔥", label: "Server Overheating", desc: "100K row scan repeated" },
          { icon: "😡", label: "Citizens Complaining", desc: "App is unresponsive" },
        ].map(item => (
          <div key={item.label} className="flex items-center gap-3 p-3 bg-red-500/10 border border-red-500/30 rounded-lg">
            <span className="text-2xl">{item.icon}</span>
            <div>
              <p className="font-bold text-sm text-red-400">{item.label}</p>
              <p className="text-xs text-muted-foreground">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
  
      <button
        onClick={() => { game.addXp(75, "⚠️ Crisis Witness"); game.nextStage(); }}
        className="px-8 py-3 bg-primary text-primary-foreground font-bold rounded-xl"
      >
        🌳 Discover the Index Library →
      </button>
    </StageWrapper>
  );

  const renderStage3 = () => {
    const remaining = NAMES.filter(n => !treeNodes.includes(n));
  
    return (
      <StageWrapper>
        <h3 className="text-xl font-bold text-primary mb-2">🌳 The Index Library</h3>
        <p className="text-muted-foreground text-sm mb-6 max-w-md text-center">
          Build a B-tree Index — click names to insert them into the sorted tree structure.
        </p>
  
        {/* B-tree visual */}
        <div className="w-full max-w-md bg-primary/5 border border-primary/20 rounded-xl p-4 mb-6 min-h-24">
          {treeNodes.length === 0 ? (
            <p className="text-muted-foreground text-sm text-center">Tree is empty — start inserting names</p>
          ) : (
            <div className="flex flex-wrap gap-2 justify-center">
              {[...treeNodes].sort().map((name, i) => (
                <span key={i} className="px-3 py-1 bg-green-500/20 border border-green-500/40 text-green-400 rounded-lg text-sm font-mono">
                  {name}
                </span>
              ))}
            </div>
          )}
        </div>
  
        {/* Available names to insert */}
        <div className="flex flex-wrap gap-2 justify-center mb-6">
          {remaining.map(name => (
            <button
              key={name}
              onClick={() => setTreeNodes(prev => [...prev, name])}
              className="px-3 py-1 bg-primary/20 text-primary rounded-lg text-sm font-mono hover:bg-primary/40 transition-all"
            >
              + {name}
            </button>
          ))}
        </div>
  
        {treeNodes.length === NAMES.length && !treeBuilt && (
          <button
            onClick={() => { setTreeBuilt(true); game.addXp(150, "🏅 Index Architect"); game.nextStage(); }}
            className="px-8 py-3 bg-primary text-primary-foreground font-bold rounded-xl"
          >
            🌳 B-tree Built! Activate Index →
          </button>
        )}
      </StageWrapper>
    );
  };

  const renderStage4 = () => {
    const logN = Math.ceil(Math.log2(100000)); // ≈ 17
  
    return (
      <StageWrapper>
        <h3 className="text-xl font-bold text-primary mb-2">⚡ The Smart Search</h3>
        <p className="text-muted-foreground text-sm mb-6 max-w-md text-center">
          With an index, the search follows a logarithmic path — not a door-to-door walk.
        </p>
  
        {/* Side-by-side comparison */}
        <div className="grid grid-cols-2 gap-4 w-full max-w-md mb-6">
          <div className="p-4 bg-orange-500/10 border border-orange-500/30 rounded-xl text-center">
            <p className="text-xs text-muted-foreground mb-1">Full Table Scan</p>
            <p className="text-2xl font-bold text-orange-400">100,000</p>
            <p className="text-xs text-muted-foreground">rows checked</p>
            <p className="mt-2 text-xs font-mono text-orange-400">O(n)</p>
          </div>
          <div className={`p-4 border rounded-xl text-center transition-all
            ${indexUsed ? "bg-green-500/10 border-green-500/30" : "border-dashed border-muted-foreground"}`}>
            <p className="text-xs text-muted-foreground mb-1">Index Search</p>
            <p className={`text-2xl font-bold ${indexUsed ? "text-green-400" : "text-muted-foreground"}`}>
              {indexUsed ? `~${logN}` : "?"}
            </p>
            <p className="text-xs text-muted-foreground">rows checked</p>
            <p className="mt-2 text-xs font-mono text-green-400">{indexUsed ? "O(log n)" : "—"}</p>
          </div>
        </div>
  
        {!indexUsed && (
          <button
            onClick={() => setIndexUsed(true)}
            className="px-6 py-2 bg-primary/20 text-primary rounded-lg text-sm mb-4"
          >
            ⚡ Search Using Index
          </button>
        )}
  
        {indexUsed && (
          <button
            onClick={() => { game.addXp(150, "🏅 Lightning Query Hunter"); game.nextStage(); }}
            className="px-8 py-3 bg-primary text-primary-foreground font-bold rounded-xl"
          >
            🧠 Inspect the Query Brain →
          </button>
        )}
      </StageWrapper>
    );
  };

  const renderStage5 = () => (
    <StageWrapper>
      <h3 className="text-xl font-bold text-primary mb-2">🧠 EXPLAIN QUERY PLAN</h3>
      <p className="text-muted-foreground text-sm mb-6 max-w-md text-center">
        The database's internal execution plan reveals exactly what strategy it uses.
      </p>
  
      {/* Toggle buttons */}
      <div className="flex gap-3 mb-6">
        {(["scan", "index"] as const).map(mode => (
          <button
            key={mode}
            onClick={() => setExplainMode(mode)}
            className={`px-4 py-2 rounded-lg border text-sm transition-all
              ${explainMode === mode ? "border-primary bg-primary/10 text-primary" : "border-muted-foreground"}`}
          >
            {mode === "scan" ? "❌ Without Index" : "✅ With Index"}
          </button>
        ))}
      </div>
  
      {/* Terminal output */}
      {explainMode !== "none" && (
        <div className="w-full max-w-md bg-black/60 border border-primary/30 rounded-xl p-4 font-mono text-sm mb-6">
          {explainMode === "scan" ? (
            <>
              <p className="text-red-400">-- Execution Plan --</p>
              <p className="text-yellow-300">SCAN TABLE TEST_DATA</p>
              <p className="text-muted-foreground">Rows Examined: 100,000</p>
              <p className="text-muted-foreground">Cost: HIGH</p>
            </>
          ) : (
            <>
              <p className="text-green-400">-- Execution Plan --</p>
              <p className="text-green-300">SEARCH TABLE TEST_DATA</p>
              <p className="text-green-300">  USING INDEX idx_name</p>
              <p className="text-muted-foreground">Rows Examined: ~17</p>
              <p className="text-muted-foreground">Cost: LOW</p>
            </>
          )}
        </div>
      )}
  
      {explainMode === "index" && (
        <button
          onClick={() => { game.addXp(150, "🏅 Query Analyst"); game.nextStage(); }}
          className="px-8 py-3 bg-primary text-primary-foreground font-bold rounded-xl"
        >
          ⚠️ Discover Index Failures →
        </button>
      )}
    </StageWrapper>
  );

  const [bossPhase, setBossPhase] = useState<"lesson"|"quiz"|"boss"|"done">("lesson");

const renderStage6 = () => {
  if (bossPhase === "done") {
    return (
      <CompletionScreen
        missionTitle="👑 Master of Data Optimization"
        missionSubtitle="You transformed a slow, cursed kingdom into a high-performance database city."
        xp={game.xp}
        xpLog={game.xpLog}
        achievements={[
          { icon: <Search className="size-4" />,   label: "Relentless Scanner" },
          { icon: <TreePine className="size-4" />,  label: "Index Architect" },
          { icon: <Zap className="size-4" />,       label: "Lightning Query Hunter" },
          { icon: <Brain className="size-4" />,     label: "Query Analyst" },
          { icon: <Crown className="size-4" />,     label: "Performance Master" },
        ]}
        concepts={[
          { label: "Full Table Scan",  description: "Checks every row — O(n), slow for large datasets." },
          { label: "B-tree Index",     description: "Sorted tree structure enabling O(log n) search." },
          { label: "EXPLAIN PLAN",     description: "Shows the database's chosen execution strategy." },
          { label: "Cardinality",      description: "High-cardinality columns benefit most from indexing." },
          { label: "Index Trade-offs", description: "Indexes cost memory and slow down writes — use selectively." },
        ]}
        onReset={game.reset}
      />
    );
  }

  // Phase 1: Low cardinality lesson
  if (bossPhase === "lesson") return (
    <StageWrapper>
      <h3 className="text-xl font-bold text-primary mb-2">⚠️ When Indexes Fail</h3>
      <p className="text-muted-foreground text-sm mb-6 max-w-md text-center">
        Not all columns benefit from indexing. Low-cardinality columns barely improve performance.
      </p>

      <div className="flex gap-3 mb-6">
        {(["high", "low"] as const).map(mode => (
          <button
            key={mode}
            onClick={() => setCardinalityMode(mode)}
            className={`px-4 py-2 rounded-lg border text-sm transition-all
              ${cardinalityMode === mode ? "border-primary bg-primary/10 text-primary" : "border-muted-foreground"}`}
          >
            {mode === "high" ? "📛 Name column (high)" : "⚥ Gender column (low)"}
          </button>
        ))}
      </div>

      <div className="w-full max-w-sm p-4 bg-primary/5 border border-primary/20 rounded-xl mb-6 text-sm">
        {cardinalityMode === "high" ? (
          <p className="text-green-400">✅ <strong>Name</strong> has thousands of unique values → Index is very effective.</p>
        ) : (
          <p className="text-orange-400">⚠️ <strong>Gender</strong> has only 2 values → Index still returns ~50,000 rows. Barely faster.</p>
        )}
      </div>

      <button
        onClick={() => setBossPhase("quiz")}
        className="px-8 py-3 bg-primary text-primary-foreground font-bold rounded-xl"
      >
        🧩 Mini Challenges →
      </button>
    </StageWrapper>
  );

  // Phase 2: Two quizzes
  if (bossPhase === "quiz") return (
    <StageWrapper>
      <h3 className="text-xl font-bold text-primary mb-6">🧩 Mini Challenges</h3>
      <div className="w-full max-w-md space-y-6 mb-8">
        <QuizBlock
          question="Which query will likely be faster on 100 rows?"
          options={[
            { label: "Full table scan (no index)", value: "a" },
            { label: "Index search", value: "b" },
          ]}
          correctValue="a"
          selectedValue={quiz1Answer}
          onSelect={setQuiz1Answer}
          correctFeedback="✅ Correct! For tiny tables, index overhead outweighs the benefit."
          wrongFeedback="❌ Not quite — at 100 rows, scanning is faster than navigating an index structure."
        />

        {quiz1Answer === "a" && (
          <QuizBlock
            question="Which column is BEST suited for indexing?"
            options={[
              { label: "Gender (Male/Female)", value: "a" },
              { label: "Student Roll Number", value: "b" },
              { label: "Pass/Fail status", value: "c" },
            ]}
            correctValue="b"
            selectedValue={quiz2Answer}
            onSelect={setQuiz2Answer}
            correctFeedback="✅ Roll numbers are unique — maximum cardinality, ideal for indexing."
            wrongFeedback="❌ Think about uniqueness. The more unique values a column has, the better the index."
          />
        )}
      </div>

      {quiz1Answer === "a" && quiz2Answer === "b" && (
        <button
          onClick={() => { game.addXp(200, "🧩 Challenge Master"); setBossPhase("boss"); }}
          className="px-8 py-3 bg-primary text-primary-foreground font-bold rounded-xl animate-in zoom-in"
        >
          👑 Final Boss: The King's Query →
        </button>
      )}
    </StageWrapper>
  );

  // Phase 3: Boss challenge
  if (bossPhase === "boss") return (
    <StageWrapper>
      <h3 className="text-xl font-bold text-primary mb-2">👑 The King's Critical Query</h3>
      <p className="text-muted-foreground text-sm mb-6 max-w-md text-center">
        A 1,000,000-row database is timing out. Choose the correct column to index and restore the kingdom.
      </p>

      <div className="w-full max-w-sm mb-6">
        <p className="text-xs text-muted-foreground mb-2 font-mono">Query: SELECT * FROM students WHERE roll_no = 10043</p>
        <p className="text-xs text-muted-foreground mb-4">Which column should you create the index on?</p>
        <div className="flex flex-col gap-3">
          {["roll_no", "gender", "city", "marks"].map(col => (
            <button
              key={col}
              onClick={() => {
                setBossColumn(col);
                setBossResult(col === "roll_no" ? "win" : "fail");
              }}
              className={`px-4 py-3 rounded-xl border font-mono text-sm transition-all
                ${bossColumn === col
                  ? bossResult === "win" ? "border-green-500 bg-green-500/10 text-green-400"
                    : "border-red-500 bg-red-500/10 text-red-400"
                  : "border-primary/40 hover:border-primary"}`}
            >
              CREATE INDEX ON students({col})
            </button>
          ))}
        </div>
      </div>

      {bossResult === "win" && (
        <>
          <p className="text-green-400 text-sm mb-4">🌟 Query executes in milliseconds! Kingdom restored!</p>
          <button
            onClick={() => { game.addXp(300, "👑 Performance Master"); setBossPhase("done"); }}
            className="px-8 py-3 bg-primary text-primary-foreground font-bold rounded-xl"
          >
            🎉 Claim Your Crown →
          </button>
        </>
      )}
      {bossResult === "fail" && (
  <div className="flex flex-col items-center gap-3 mt-2">
    <p className="text-red-400 text-sm">
      ❌ Wrong index — the query filters by <code>roll_no</code>, not <code>{bossColumn}</code>.
      Indexes only help when the WHERE clause uses that column.
    </p>
    <button
      onClick={() => { setBossColumn(null); setBossResult(null); }}
      className="px-6 py-2 bg-red-500/20 border border-red-500/40 text-red-400 font-bold rounded-xl hover:bg-red-500/30 transition-all text-sm"
    >
      🔄 Try Again
    </button>
  </div>
)}
    </StageWrapper>
  );
};
return (
  <SimShell
    title="The Data Kingdom"
    subtitle="Rise of the Query Hunter"
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