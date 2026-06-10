import { useState } from "react";
import {Shield, Swords, Database, Zap, Key, Link2, AlertTriangle } from "lucide-react";
import {
  useSimGame,
  SimShell,
  StageWrapper,
  QuizBlock,
  CompletionScreen,
} from "@/components/simulations/shared";

const TOTAL_STAGES = 7;

export function SQLDefenseAcademySim() {
  const game = useSimGame(TOTAL_STAGES, () => {
    setExploredTools(new Set());
    setInsertForm({ name: "", age: "", id: "" });
    setInsertResult(null);
    setInsertCount(0);
    setHackerInput("");
    setHackResult(null);
    setPlaceholders({ name: null, age: null });
    setDefenseResult(null);
    setKeyGenerated(false);
    setLifecyclePlaced([]);
    setQuiz1Answer(null);
    setQuiz2Answer(null);
    setBossPhase("insert");
    setBossRecords([]);
    setBossBreached(false);
  });

  // Stage 1 — Tool exploration
  const [exploredTools, setExploredTools] = useState<Set<string>>(new Set());

  // Stage 2 — INSERT form
  const [insertForm,   setInsertForm]   = useState({ name: "", age: "", id: "" });
  const [insertResult, setInsertResult] = useState<"ok"|"err"|null>(null);

  // Stage 3 — executeUpdate counter
  const [insertCount, setInsertCount] = useState(0);

  // Stage 4 — Hacker attack
  const [hackerInput, setHackerInput] = useState("");
  const [hackResult,  setHackResult]  = useState<"safe"|"breach"|null>(null);

  // Stage 5 — PreparedStatement placeholders
  const [placeholders, setPlaceholders] = useState<{ name: string|null; age: string|null }>({ name: null, age: null });
  const [defenseResult, setDefenseResult] = useState<"blocked"|null>(null);

  // Stage 6 — Generated keys
  const [keyGenerated, setKeyGenerated] = useState(false);

  // Stage 7 — Connection lifecycle
  const LIFECYCLE_STEPS = ["Driver", "Connection", "Statement", "Execution", "Close"];
  const [lifecyclePlaced, setLifecyclePlaced] = useState<string[]>([]);
  const [lifecycleAvail,  setLifecycleAvail]  = useState([...LIFECYCLE_STEPS].sort(() => Math.random() - 0.5));

  // Boss
  const [bossPhase,    setBossPhase]    = useState<"insert"|"quiz"|"done">("insert");
  const [bossRecords,  setBossRecords]  = useState<string[]>([]);
  const [bossBreached, setBossBreached] = useState(false);
  const [quiz1Answer,  setQuiz1Answer]  = useState<string | null>(null);
  const [quiz2Answer,  setQuiz2Answer]  = useState<string | null>(null);

  const HACKER_STRINGS = ["' OR '1'='1", "'; DROP TABLE STUDENT;--", "' OR 1=1--"];

  const renderStage1 = () => {
    const tools = [
      {
        id: "statement",
        icon: "⚒️",
        label: "Statement",
        tag: "Old Tool",
        desc: "Directly concatenates user input into SQL. Fast to write, dangerous to use.",
        color: "border-orange-500/40 bg-orange-500/5",
        tagColor: "text-orange-400",
      },
      {
        id: "prepared",
        icon: "🛡️",
        label: "PreparedStatement",
        tag: "Modern Tool",
        desc: "Uses placeholders (?). Precompiled and safe against injection attacks.",
        color: "border-green-500/40 bg-green-500/5",
        tagColor: "text-green-400",
      },
    ];
  
    return (
      <StageWrapper>
        <h2 className="text-3xl font-bold text-primary mb-2">🏙️ Welcome to DataVault City</h2>
        <p className="text-muted-foreground mb-6 max-w-md text-center">
          Student records are waiting to be stored. First, explore both tools — your choice will define the security of the vault.
        </p>
  
        <div className="flex gap-4 mb-8 flex-wrap justify-center">
          {tools.map(t => (
            <div
              key={t.id}
              onClick={() => setExploredTools(prev => new Set([...prev, t.id]))}
              className={`p-5 rounded-xl border-2 cursor-pointer max-w-xs transition-all
                ${exploredTools.has(t.id) ? t.color + " scale-105" : "border-muted-foreground hover:border-primary"}`}
            >
              <div className="text-3xl mb-2">{t.icon}</div>
              <div className="font-bold text-primary">{t.label}</div>
              <div className={`text-xs font-bold mb-2 ${t.tagColor}`}>{t.tag}</div>
              <p className="text-xs text-muted-foreground">{t.desc}</p>
              {exploredTools.has(t.id) && <p className="text-xs text-green-400 mt-2">✅ Explored</p>}
            </div>
          ))}
        </div>
  
        {exploredTools.size === 2 && (
          <button
            onClick={() => { game.addXp(50, "🏅 Security Awareness"); game.nextStage(); }}
            className="px-8 py-3 bg-primary text-primary-foreground font-bold rounded-xl flex items-center gap-2"
          >
            <Swords className="size-5" /> Begin INSERT Mission →
          </button>
        )}
      </StageWrapper>
    );
  };

  const renderStage2 = () => {
    const handleInsert = () => {
      if (!insertForm.name || !insertForm.age || !insertForm.id) {
        setInsertResult("err");
      } else {
        setInsertResult("ok");
        setInsertCount(prev => prev + 1);
      }
    };
  
    return (
      <StageWrapper>
        <h3 className="text-xl font-bold text-primary mb-2">📥 The INSERT Mission</h3>
        <p className="text-muted-foreground text-sm mb-6 max-w-md text-center">
          Enter a student record and watch the SQL pipeline carry it into the database table.
        </p>
  
        {/* Pipeline visual */}
        <div className="flex items-center gap-2 text-xs font-mono mb-6 flex-wrap justify-center">
          <div className="px-3 py-1 bg-primary/10 border border-primary/30 rounded">Input Form</div>
          <span className="text-primary">→</span>
          <div className="px-3 py-1 bg-primary/10 border border-primary/30 rounded">SQL Engine</div>
          <span className="text-primary">→</span>
          <div className={`px-3 py-1 border rounded transition-all
            ${insertResult === "ok" ? "bg-green-500/10 border-green-500 text-green-400" : "bg-primary/10 border-primary/30"}`}>
            STUDENT Table
          </div>
        </div>
  
        {/* Input form */}
        <div className="flex flex-col gap-3 w-full max-w-xs mb-6">
          {(["name","age","id"] as const).map(field => (
            <input
              key={field}
              type={field === "name" ? "text" : "number"}
              placeholder={field === "name" ? "Student Name" : field === "age" ? "Age" : "Student ID"}
              value={insertForm[field]}
              onChange={e => { setInsertForm(prev => ({ ...prev, [field]: e.target.value })); setInsertResult(null); }}
              className="px-4 py-2 bg-black/40 border border-primary/30 rounded-lg font-mono text-sm outline-none focus:border-primary"
            />
          ))}
        </div>
  
        {insertResult === "err" && (
          <p className="text-red-400 text-sm mb-4">❌ All fields are required — fill in Name, Age, and ID.</p>
        )}
  
        {insertResult === "ok" && (
          <div className="w-full max-w-xs mb-4 p-3 bg-green-500/10 border border-green-500/30 rounded-xl text-sm font-mono text-green-400">
            ✅ 1 Row Inserted → {insertForm.name} | Age: {insertForm.age} | ID: {insertForm.id}
          </div>
        )}
  
        <button
          onClick={handleInsert}
          className="px-6 py-2 bg-primary/20 text-primary rounded-lg text-sm mb-4"
        >
          ▶ Execute INSERT
        </button>
  
        {insertResult === "ok" && (
          <button
            onClick={() => { game.addXp(75, "📥 INSERT Executed"); game.nextStage(); }}
            className="px-8 py-3 bg-primary text-primary-foreground font-bold rounded-xl"
          >
            ⚙️ Visit Engine Room →
          </button>
        )}
      </StageWrapper>
    );
  };

  const DEMO_RECORDS = [
    { name: "Ravi",  age: 20, id: 101 },
    { name: "Priya", age: 21, id: 102 },
    { name: "Kiran", age: 22, id: 103 },
  ];
  
  const renderStage3 = () => (
    <StageWrapper>
      <h3 className="text-xl font-bold text-primary mb-2">⚙️ executeUpdate() Engine Room</h3>
      <p className="text-muted-foreground text-sm mb-6 max-w-md text-center">
        <code>executeUpdate()</code> returns the number of rows affected. Insert all 3 records to see it in action.
      </p>
  
      {/* Counter display */}
      <div className="w-28 h-28 rounded-full border-4 border-primary flex items-center justify-center mb-6
        shadow-[0_0_30px_rgba(var(--primary),0.3)]">
        <div className="text-center">
          <div className="text-3xl font-bold text-primary">{insertCount}</div>
          <div className="text-xs text-muted-foreground">rows</div>
        </div>
      </div>
  
      {/* Record insert buttons */}
      <div className="flex flex-col gap-3 w-full max-w-xs mb-6">
        {DEMO_RECORDS.map((rec, i) => {
          const alreadyInserted = insertCount > i;
          return (
            <button
              key={rec.id}
              disabled={alreadyInserted || insertCount !== i}
              onClick={() => setInsertCount(prev => prev + 1)}
              className={`px-4 py-3 rounded-xl border text-sm font-mono transition-all
                ${alreadyInserted
                  ? "border-green-500 bg-green-500/10 text-green-400 cursor-default"
                  : insertCount === i
                  ? "border-primary bg-primary/10 text-primary hover:bg-primary/20"
                  : "border-muted-foreground text-muted-foreground cursor-not-allowed opacity-40"}`}
            >
              {alreadyInserted ? `✅ ` : `▶ `}INSERT ({rec.name}, {rec.age}, {rec.id})
            </button>
          );
        })}
      </div>
  
      {/* Code output */}
      <div className="w-full max-w-xs bg-black/70 border border-primary/30 rounded-xl p-3 font-mono text-xs mb-6">
        <p className="text-muted-foreground">int result = stmt.executeUpdate();</p>
        <p className="text-green-400">// result = <span className="text-yellow-300">{insertCount}</span></p>
      </div>
  
      {insertCount === 3 && (
        <button
          onClick={() => { game.addXp(100, "🏅 Data Operator"); game.nextStage(); }}
          className="px-8 py-3 bg-primary text-primary-foreground font-bold rounded-xl"
        >
          ⚠️ Witness the Hacker Attack →
        </button>
      )}
    </StageWrapper>
  );

  const renderStage4 = () => {
    const isMalicious = HACKER_STRINGS.some(s => hackerInput.includes(s.split("'")[1] ?? "NOMATCH") || hackerInput.includes("OR") || hackerInput.includes("--") || hackerInput.includes("DROP"));
  
    const runAttack = () => {
      setHackResult(isMalicious ? "breach" : "safe");
    };
  
    return (
      <StageWrapper>
        <h3 className="text-xl font-bold text-red-400 mb-2">💀 The Hacker Attack</h3>
        <p className="text-muted-foreground text-sm mb-6 max-w-md text-center">
          A hacker is at the gate. They will try to inject malicious input into the query. Watch what happens with a plain <code>Statement</code>.
        </p>
  
        {/* Hacker avatar */}
        <div className="text-5xl mb-4 animate-pulse">🦹</div>
  
        {/* Injected query preview */}
        <div className="w-full max-w-md bg-black/70 border border-red-500/30 rounded-xl p-4 font-mono text-xs mb-4">
          <p className="text-muted-foreground">// Statement (unsafe!)</p>
          <p className="text-yellow-300">
            "INSERT INTO STUDENT VALUES ('" +{" "}
            <span className={isMalicious ? "text-red-400" : "text-green-400"}>
              {hackerInput || "name"}
            </span>
            {" "}+ "', 20, 104)"
          </p>
          {isMalicious && (
            <p className="text-red-400 mt-1">⚠️ Mutated: ...WHERE '1'='1' → ALL ROWS UNLOCKED</p>
          )}
        </div>
  
        {/* Input */}
        <input
          type="text"
          value={hackerInput}
          onChange={e => { setHackerInput(e.target.value); setHackResult(null); }}
          placeholder="Try: ' OR '1'='1"
          className="w-full max-w-xs px-4 py-2 bg-black/40 border border-red-500/30 rounded-lg font-mono text-sm text-red-300 outline-none mb-2"
        />
  
        {/* Quick inject buttons */}
        <div className="flex gap-2 flex-wrap justify-center mb-4">
          {HACKER_STRINGS.map(s => (
            <button
              key={s}
              onClick={() => { setHackerInput(s); setHackResult(null); }}
              className="px-3 py-1 bg-red-500/10 border border-red-500/30 text-red-400 rounded text-xs font-mono hover:bg-red-500/20 transition-all"
            >
              {s}
            </button>
          ))}
        </div>
  
        <button
          onClick={runAttack}
          className="px-6 py-2 bg-red-500/20 border border-red-500/40 text-red-400 rounded-lg text-sm mb-4"
          disabled={!hackerInput}
        >
          ▶ Execute Attack
        </button>
  
        {hackResult === "breach" && (
          <div className="flex flex-col items-center gap-3">
            <div className="px-4 py-3 bg-red-500/10 border border-red-500 rounded-xl text-center">
              <p className="text-red-400 font-bold">🚨 SECURITY BREACH!</p>
              <p className="text-xs text-muted-foreground">Entire database unlocked — injection succeeded.</p>
            </div>
            <button
              onClick={() => { game.addXp(75, "⚠️ Breach Witnessed"); game.nextStage(); }}
              className="px-8 py-3 bg-primary text-primary-foreground font-bold rounded-xl"
            >
              🛡️ Activate Defense Upgrade →
            </button>
          </div>
        )}
  
        {hackResult === "safe" && (
          <div className="flex flex-col items-center gap-2">
            <p className="text-yellow-400 text-sm">⚠️ Normal input — no injection detected. Try a malicious string above to see the attack.</p>
            <button
              onClick={() => { setHackerInput(""); setHackResult(null); }}
              className="px-5 py-2 bg-red-500/20 border border-red-500/40 text-red-400 rounded-xl text-sm hover:bg-red-500/30 transition-all"
            >
              🔄 Try Again with Injection
            </button>
          </div>
        )}
      </StageWrapper>
    );
  };

  const PLACEHOLDER_VALUES = { name: "Ravi", age: "20" };

const renderStage5 = () => {
  const allPlaced = placeholders.name && placeholders.age;

  return (
    <StageWrapper>
      <h3 className="text-xl font-bold text-primary mb-2">🛡️ Defense Upgrade: PreparedStatement</h3>
      <p className="text-muted-foreground text-sm mb-6 max-w-md text-center">
        Placeholders <code>?</code> lock the query structure. Click values to bind them safely.
      </p>

      {/* Precompiled query visual */}
      <div className="w-full max-w-md bg-black/70 border border-green-500/30 rounded-xl p-4 font-mono text-sm mb-6">
        <p className="text-muted-foreground">// PreparedStatement (safe!)</p>
        <p className="text-yellow-300">
          INSERT INTO STUDENT VALUES ({" "}
          <span className={`px-1 rounded ${placeholders.name ? "text-green-400 bg-green-500/10" : "text-primary border border-dashed border-primary"}`}>
            {placeholders.name ? `'${placeholders.name}'` : "?"}
          </span>
          ,{" "}
          <span className={`px-1 rounded ${placeholders.age ? "text-green-400 bg-green-500/10" : "text-primary border border-dashed border-primary"}`}>
            {placeholders.age ?? "?"}
          </span>
          {" "})
        </p>
        {allPlaced && <p className="text-green-400 mt-1">✅ Structure locked — injection impossible</p>}
      </div>

      {/* Value binding buttons */}
      <div className="grid grid-cols-2 gap-4 w-full max-w-xs mb-6">
        <div>
          <p className="text-xs text-muted-foreground mb-2">setString() — Name</p>
          <button
            onClick={() => setPlaceholders(prev => ({ ...prev, name: PLACEHOLDER_VALUES.name }))}
            disabled={!!placeholders.name}
            className={`w-full px-3 py-2 rounded-lg border text-sm font-mono transition-all
              ${placeholders.name ? "border-green-500 bg-green-500/10 text-green-400 cursor-default" : "border-primary/40 hover:border-primary text-primary"}`}
          >
            {placeholders.name ? `✅ '${placeholders.name}'` : `bind 'Ravi'`}
          </button>
        </div>
        <div>
          <p className="text-xs text-muted-foreground mb-2">setInt() — Age</p>
          <button
            onClick={() => setPlaceholders(prev => ({ ...prev, age: PLACEHOLDER_VALUES.age }))}
            disabled={!!placeholders.age}
            className={`w-full px-3 py-2 rounded-lg border text-sm font-mono transition-all
              ${placeholders.age ? "border-green-500 bg-green-500/10 text-green-400 cursor-default" : "border-primary/40 hover:border-primary text-primary"}`}
          >
            {placeholders.age ? `✅ ${placeholders.age}` : `bind 20`}
          </button>
        </div>
      </div>

      {allPlaced && defenseResult === null && (
        <button
          onClick={() => setDefenseResult("blocked")}
          className="px-6 py-2 bg-primary/20 text-primary rounded-lg text-sm mb-4"
        >
          ▶ Execute Secure Insert
        </button>
      )}

      {defenseResult === "blocked" && (
        <button
          onClick={() => { game.addXp(150, "🛡️ Security Defender"); game.nextStage(); }}
          className="px-8 py-3 bg-primary text-primary-foreground font-bold rounded-xl"
        >
          🔑 Visit the Key Vault →
        </button>
      )}
    </StageWrapper>
  );
};

const renderStage6 = () => (
  <StageWrapper>
    <h3 className="text-xl font-bold text-primary mb-2">🔑 Generated Keys Vault</h3>
    <p className="text-muted-foreground text-sm mb-6 max-w-md text-center">
      Some databases auto-generate primary keys on insert. Use <code>getGeneratedKeys()</code> to retrieve them.
    </p>

    {/* Vault visual */}
    <div className={`w-32 h-32 rounded-full border-4 mb-6 flex items-center justify-center transition-all duration-700
      ${keyGenerated
        ? "border-yellow-500 bg-yellow-500/10 shadow-[0_0_40px_rgba(234,179,8,0.4)]"
        : "border-muted-foreground bg-muted/10"}`}>
      <Key className={`size-10 ${keyGenerated ? "text-yellow-400" : "text-muted-foreground"}`} />
    </div>

    {/* Code block */}
    <div className="w-full max-w-md bg-black/70 border border-primary/30 rounded-xl p-4 font-mono text-sm mb-6">
      <p className="text-muted-foreground">stmt = con.prepareStatement(sql,</p>
      <p className="text-yellow-300">{"  "}Statement.RETURN_GENERATED_KEYS);</p>
      <p className="text-muted-foreground mt-2">ResultSet rs = stmt.getGeneratedKeys();</p>
      {keyGenerated && <p className="text-green-400 mt-1">rs.next() → ID = <span className="text-yellow-300">101</span> ✅</p>}
    </div>

    {!keyGenerated && (
      <button
        onClick={() => setKeyGenerated(true)}
        className="px-6 py-2 bg-primary/20 text-primary rounded-lg text-sm mb-4"
      >
        🔑 Get Generated Key
      </button>
    )}

    {keyGenerated && (
      <>
        <p className="text-yellow-400 text-sm mb-4">🔑 Generated Key Retrieved: <strong>101</strong></p>
        <button
          onClick={() => { game.addXp(100, "🔑 Key Retriever"); game.nextStage(); }}
          className="px-8 py-3 bg-primary text-primary-foreground font-bold rounded-xl"
        >
          🔗 Connection Lifecycle Lab →
        </button>
      </>
    )}
  </StageWrapper>
);

const renderStage7 = () => {
  if (bossPhase === "done") {
    return (
      <CompletionScreen
        missionTitle="🛡️ DataVault Secured!"
        missionSubtitle="You defended the database against injection attacks using PreparedStatement and proper resource management."
        xp={game.xp}
        xpLog={game.xpLog}
        achievements={[
          { icon: <Shield className="size-4" />,        label: "Security Defender" },
          { icon: <Zap className="size-4" />,           label: "Data Operator" },
          { icon: <AlertTriangle className="size-4" />, label: "Injection Blocker" },
          { icon: <Key className="size-4" />,           label: "Key Retriever" },
          { icon: <Database className="size-4" />,      label: "SQL Master" },
        ]}
        concepts={[
          { label: "executeUpdate()",     description: "Returns the number of rows affected by an INSERT, UPDATE, or DELETE." },
          { label: "SQL Injection",        description: "Attacker manipulates query by injecting SQL into input fields." },
          { label: "PreparedStatement",    description: "Precompiles query with ? placeholders, separating logic from data." },
          { label: "getGeneratedKeys()",   description: "Retrieves auto-generated primary keys after an insert operation." },
          { label: "Resource Management",  description: "Always close Connection, Statement, ResultSet to prevent memory leaks." },
        ]}
        onReset={game.reset}
      />
    );
  }

  // Phase 1: Lifecycle ordering
  if (bossPhase === "insert") {
    const isComplete = lifecyclePlaced.length === LIFECYCLE_STEPS.length
      && lifecyclePlaced.every((s, i) => s === LIFECYCLE_STEPS[i]);
    const isFull = lifecyclePlaced.length === LIFECYCLE_STEPS.length;

    return (
      <StageWrapper>
        <h3 className="text-xl font-bold text-primary mb-2">🔗 Connection Lifecycle Lab</h3>
        <p className="text-muted-foreground text-sm mb-6 max-w-md text-center">
          Arrange the JDBC lifecycle steps in the correct order. Always end by closing resources.
        </p>

        {/* Drop zone */}
        <div className="flex items-center gap-1 flex-wrap justify-center mb-6">
          {LIFECYCLE_STEPS.map((step, i) => {
            const placed = lifecyclePlaced[i];
            const correct = placed === step;
            return (
              <div key={step} className="flex items-center gap-1">
                <div className={`px-3 py-2 rounded-lg border text-xs text-center min-w-[80px] transition-all
                  ${placed ? (correct ? "border-green-500 bg-green-500/10 text-green-400" : "border-red-500 bg-red-500/10 text-red-400")
                    : "border-dashed border-muted-foreground text-muted-foreground"}`}>
                  {placed ?? `Step ${i + 1}`}
                </div>
                {i < LIFECYCLE_STEPS.length - 1 && <span className="text-muted-foreground text-xs">→</span>}
              </div>
            );
          })}
        </div>

        {/* Available steps */}
        <div className="flex flex-wrap gap-2 justify-center mb-6">
          {lifecycleAvail.map(step => (
            <button
              key={step}
              onClick={() => {
                setLifecyclePlaced(prev => [...prev, step]);
                setLifecycleAvail(prev => prev.filter(s => s !== step));
              }}
              className="px-3 py-2 bg-primary/20 text-primary rounded-lg text-xs font-bold hover:bg-primary/40 transition-all"
            >
              {step}
            </button>
          ))}
        </div>

        {isFull && !isComplete && (
          <div className="flex flex-col items-center gap-2 mb-4">
            <p className="text-red-400 text-sm">❌ Wrong order — remember: Driver → Connection → Statement → Execution → Close.</p>
            <button
              onClick={() => {
                setLifecyclePlaced([]);
                setLifecycleAvail([...LIFECYCLE_STEPS].sort(() => Math.random() - 0.5));
              }}
              className="px-5 py-2 bg-red-500/20 border border-red-500/40 text-red-400 rounded-xl text-sm hover:bg-red-500/30 transition-all"
            >
              🔄 Try Again
            </button>
          </div>
        )}

        {isComplete && (
          <button
            onClick={() => { game.addXp(150, "🏅 Cleanup Master"); setBossPhase("quiz"); }}
            className="px-8 py-3 bg-primary text-primary-foreground font-bold rounded-xl"
          >
            🧨 Final Boss Challenge →
          </button>
        )}
      </StageWrapper>
    );
  }

  // Phase 2: Boss quiz
  if (bossPhase === "quiz") return (
    <StageWrapper>
      <h3 className="text-xl font-bold text-primary mb-6">🧨 Secure the DataVault — Final Boss</h3>
      <div className="w-full max-w-md space-y-6 mb-8">
        <QuizBlock
          question="Why is PreparedStatement safer than Statement for user input?"
          options={[
            { label: "It runs faster than Statement",                             value: "a" },
            { label: "It separates SQL logic from data using placeholders",       value: "b" },
            { label: "It automatically encrypts the database",                    value: "c" },
          ]}
          correctValue="b"
          selectedValue={quiz1Answer}
          onSelect={setQuiz1Answer}
          correctFeedback="✅ Correct! Placeholders prevent malicious input from altering the SQL structure."
          wrongFeedback="❌ Not quite — the key is that ? placeholders separate query logic from user data."
        />

        {quiz1Answer && quiz1Answer !== "b" && (
          <button
            onClick={() => setQuiz1Answer(null)}
            className="px-5 py-2 bg-red-500/20 border border-red-500/40 text-red-400 rounded-xl text-sm hover:bg-red-500/30 transition-all"
          >
            🔄 Try Again
          </button>
        )}

        {quiz1Answer === "b" && (
          <>
            <QuizBlock
              question="What does executeUpdate() return when 2 rows are inserted?"
              options={[
                { label: "true",  value: "a" },
                { label: "2",     value: "b" },
                { label: "null",  value: "c" },
              ]}
              correctValue="b"
              selectedValue={quiz2Answer}
              onSelect={setQuiz2Answer}
              correctFeedback="✅ executeUpdate() returns an int — the count of rows affected."
              wrongFeedback="❌ It returns an int, not a boolean or null. Count = 2 for 2 inserted rows."
            />

            {quiz2Answer && quiz2Answer !== "b" && (
              <button
                onClick={() => setQuiz2Answer(null)}
                className="px-5 py-2 bg-red-500/20 border border-red-500/40 text-red-400 rounded-xl text-sm hover:bg-red-500/30 transition-all"
              >
                🔄 Try Again
              </button>
            )}
          </>
        )}
      </div>

      {quiz1Answer === "b" && quiz2Answer === "b" && (
        <button
          onClick={() => { game.addXp(300, "🛡️ SQL Master"); setBossPhase("done"); }}
          className="px-8 py-3 bg-primary text-primary-foreground font-bold rounded-xl animate-in zoom-in"
        >
          🎉 Secure the DataVault →
        </button>
      )}
    </StageWrapper>
  );
};

return (
  <SimShell
    title="SQL Defense Academy"
    subtitle="The Battle Against Injection Hackers"
    xp={game.xp}
    stage={game.stage}
    totalStages={TOTAL_STAGES}
    mistakeMessage={game.mistakeMessage}
    successMessage={game.successMessage}
    icon={<Shield className="size-5 text-primary" />}
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