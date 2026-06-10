import { useState } from "react";
import { Target, Crosshair, Zap, BarChart2, RefreshCw, Trash2, Shield } from "lucide-react";
import {
  useSimGame,
  SimShell,
  StageWrapper,
  QuizBlock,
  CompletionScreen,
} from "@/components/simulations/shared";

const TOTAL_STAGES = 7;

const STUDENT_RECORDS = [
  { id: 101, name: "Ravi Kumar",   status: "Active" },
  { id: 102, name: "Priya Nair",   status: "Active" },
  { id: 103, name: "Kiran Reddy",  status: "Corrupted" },
  { id: 104, name: "Asha Mehta",   status: "Outdated" },
  { id: 105, name: "Dev Sharma",   status: "Active" },
];

const LIFECYCLE_STEPS = ["Connect", "Prepare", "Set Parameter", "Execute", "Check Result", "Close"];

export function DatabaseAssassinSim() {
  const game = useSimGame(TOTAL_STAGES, () => {
    setConnected(false);
    setWeaponSelected(null);
    setTargetId("");
    setParamBound(false);
    setExecuteResult(null);
    setDeletedIds(new Set());
    setRowsAnswer(null);
    setAutoCommit(true);
    setTxAction(null);
    setTxResult(null);
    setCloseDropped(new Set());
    setLifecyclePlaced([]);
    setLifecycleAvail([...LIFECYCLE_STEPS].sort(() => Math.random() - 0.5));
    setBossPhase("delete");
    setBossDeleted(new Set());
    setBossMissed(new Set());
    setBossCommitted(false);
    setBossRolledBack(false);
    setBossClosed(false);
    setQuiz1Answer(null);
    setQuiz2Answer(null);
  });

  // Stage 1
  const [connected, setConnected] = useState(false);

  // Stage 2
  const [weaponSelected, setWeaponSelected] = useState<string | null>(null);

  // Stage 3
  const [targetId,   setTargetId]   = useState("");
  const [paramBound, setParamBound] = useState(false);
  const [paramError, setParamError] = useState<string | null>(null);

  // Stage 4
  const [executeResult, setExecuteResult] = useState<"hit"|"miss"|null>(null);
  const [deletedIds,    setDeletedIds]    = useState<Set<number>>(new Set());

  // Stage 5
  const [rowsAnswer, setRowsAnswer] = useState<string | null>(null);

  // Stage 6 — Transactions
  const [autoCommit, setAutoCommit] = useState(true);
  const [txAction,   setTxAction]   = useState<"commit"|"rollback"|null>(null);
  const [txResult,   setTxResult]   = useState<"committed"|"rolledback"|null>(null);
  const [txPending,  setTxPending]  = useState(false);

  // Stage 7 — Cleanup
  const CLOSE_TARGETS = ["Connection", "PreparedStatement"];
  const [closeDropped, setCloseDropped] = useState<Set<string>>(new Set());

  // Lifecycle ordering (used in boss)
  const [lifecyclePlaced, setLifecyclePlaced] = useState<string[]>([]);
  const [lifecycleAvail,  setLifecycleAvail]  = useState(
    [...LIFECYCLE_STEPS].sort(() => Math.random() - 0.5)
  );

  // Boss
  const BOSS_TARGETS   = [101, 103, 104];    // exist
  const BOSS_GHOST     = 999;                // doesn't exist
  const [bossPhase,      setBossPhase]      = useState<"delete"|"quiz"|"done">("delete");
  const [bossDeleted,    setBossDeleted]    = useState<Set<number>>(new Set());
  const [bossMissed,     setBossMissed]     = useState<Set<number>>(new Set());
  const [bossCommitted,  setBossCommitted]  = useState(false);
  const [bossRolledBack, setBossRolledBack] = useState(false);
  const [bossClosed,     setBossClosed]     = useState(false);
  const [quiz1Answer,    setQuiz1Answer]    = useState<string | null>(null);
  const [quiz2Answer,    setQuiz2Answer]    = useState<string | null>(null);

  const renderStage1 = () => (
    <StageWrapper>
      <h2 className="text-3xl font-bold text-primary mb-2">🌐 Enter the DataSphere</h2>
      <p className="text-muted-foreground mb-6 max-w-md text-center">
        Welcome, Agent. The STUDENT Nexus holds corrupted records that must be surgically removed. First, establish your connection.
      </p>
  
      {/* Vault + records visual */}
      <div className="w-full max-w-sm mb-6">
        <div className={`p-4 rounded-xl border-2 text-center transition-all duration-700
          ${connected ? "border-green-500 bg-green-500/5 shadow-[0_0_30px_rgba(34,197,94,0.2)]" : "border-primary/30 bg-primary/5"}`}>
          <div className="text-3xl mb-1">🗄️</div>
          <p className="font-bold text-sm text-primary">STUDENT DATABASE</p>
          <p className={`text-xs mt-1 ${connected ? "text-green-400" : "text-muted-foreground"}`}>
            {connected ? "● CONNECTED" : "○ OFFLINE"}
          </p>
        </div>
  
        {/* Connection cable animation */}
        <div className={`h-1 my-3 rounded transition-all duration-700
          ${connected ? "bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.6)]" : "bg-muted-foreground/30 border-dashed"}`} />
  
        <div className="p-3 rounded-xl border border-primary/30 bg-black/40 text-center">
          <p className="text-xs font-mono text-primary">🖥️ AGENT CONSOLE</p>
        </div>
      </div>
  
      {/* Floating record cards */}
      <div className="flex gap-2 flex-wrap justify-center mb-6">
        {STUDENT_RECORDS.map(r => (
          <div key={r.id} className={`px-3 py-2 rounded-lg border text-xs font-mono
            ${r.status === "Corrupted" ? "border-red-500/40 text-red-400 bg-red-500/5"
              : r.status === "Outdated" ? "border-orange-500/40 text-orange-400 bg-orange-500/5"
              : "border-primary/30 text-primary/60"}`}>
            #{r.id} {r.name}
            <span className="block text-[10px] opacity-70">{r.status}</span>
          </div>
        ))}
      </div>
  
      {!connected ? (
        <button
          onClick={() => setConnected(true)}
          className="px-8 py-3 bg-primary text-primary-foreground font-bold rounded-xl flex items-center gap-2"
        >
          <Zap className="size-5" /> Connect to Database
        </button>
      ) : (
        <button
          onClick={() => { game.addXp(50, "🔓 Agent Connected"); game.nextStage(); }}
          className="px-8 py-3 bg-green-600 text-white font-bold rounded-xl"
        >
          ✅ Connection Established → Select Weapon
        </button>
      )}
    </StageWrapper>
  );

  const WEAPONS = [
    {
      id: "raw",
      icon: "💥",
      label: "Raw Query Blaster",
      tag: "UNSTABLE",
      desc: "Fires raw SQL strings directly. Fast but dangerous — prone to injection and errors.",
      color: "border-red-500/50 bg-red-500/5",
      tagColor: "text-red-400",
      wrong: true,
    },
    {
      id: "prepared",
      icon: "🎯",
      label: "PreparedStatement Sniper",
      tag: "PRECISION",
      desc: "Parameterized DELETE with ? slots. Locked structure, safe execution, reusable plan.",
      color: "border-green-500/50 bg-green-500/5",
      tagColor: "text-green-400",
      wrong: false,
    },
  ];
  
  const renderStage2 = () => (
    <StageWrapper>
      <h3 className="text-xl font-bold text-primary mb-2">⚔️ Weapon Selection</h3>
      <p className="text-muted-foreground text-sm mb-6 max-w-md text-center">
        Choose your deletion tool. One is precise and safe — the other is a liability.
      </p>
  
      <div className="flex gap-4 flex-wrap justify-center mb-6">
        {WEAPONS.map(w => (
          <div
            key={w.id}
            onClick={() => setWeaponSelected(w.id)}
            className={`p-5 rounded-xl border-2 cursor-pointer max-w-xs transition-all
              ${weaponSelected === w.id ? w.color + " scale-105" : "border-muted-foreground hover:border-primary"}`}
          >
            <div className="text-4xl mb-2">{w.icon}</div>
            <div className="font-bold text-primary">{w.label}</div>
            <div className={`text-xs font-bold mb-2 ${w.tagColor}`}>{w.tag}</div>
            <p className="text-xs text-muted-foreground">{w.desc}</p>
          </div>
        ))}
      </div>
  
      {/* Query template preview */}
      {weaponSelected === "prepared" && (
        <div className="w-full max-w-md bg-black/70 border border-green-500/30 rounded-xl p-4 font-mono text-sm mb-4">
          <p className="text-muted-foreground">// Weapon loaded with parameter slot</p>
          <p className="text-yellow-300">DELETE FROM STUDENT WHERE Roll_No = <span className="text-green-400 border border-green-500/50 px-1 rounded">?</span></p>
        </div>
      )}
  
      {weaponSelected === "raw" && (
        <div className="flex flex-col items-center gap-2 mb-4">
          <p className="text-red-400 text-sm">⚠️ Raw Query Blaster is unstable — it concatenates input directly and risks injecting wrong data.</p>
          <button
            onClick={() => setWeaponSelected(null)}
            className="px-5 py-2 bg-red-500/20 border border-red-500/40 text-red-400 rounded-xl text-sm hover:bg-red-500/30 transition-all"
          >
            🔄 Choose Again
          </button>
        </div>
      )}
  
      {weaponSelected === "prepared" && (
        <button
          onClick={() => { game.addXp(75, "🎯 Weapon Locked"); game.nextStage(); }}
          className="px-8 py-3 bg-primary text-primary-foreground font-bold rounded-xl"
        >
          🔗 Identify Target →
        </button>
      )}
    </StageWrapper>
  );


  const renderStage3 = () => {
    const validIds = STUDENT_RECORDS.map(r => r.id);
    const numId = parseInt(targetId);
  
    const handleBind = () => {
      if (!targetId || isNaN(numId)) {
        setParamError("❌ Enter a valid Roll_No number.");
        return;
      }
      setParamError(null);
      setParamBound(true);
    };
  
    return (
      <StageWrapper>
        <h3 className="text-xl font-bold text-primary mb-2">🔍 Target Identification</h3>
        <p className="text-muted-foreground text-sm mb-6 max-w-md text-center">
          Bind a Roll_No into the <code>?</code> parameter slot. This locks the weapon onto the correct target.
        </p>
  
        {/* Floating records */}
        <div className="flex gap-2 flex-wrap justify-center mb-6">
          {STUDENT_RECORDS.map(r => (
            <div
              key={r.id}
              onClick={() => { setTargetId(String(r.id)); setParamBound(false); setParamError(null); }}
              className={`px-3 py-2 rounded-lg border text-xs font-mono cursor-pointer transition-all
                ${String(r.id) === targetId
                  ? "border-yellow-500 bg-yellow-500/10 text-yellow-300"
                  : "border-primary/30 hover:border-primary text-primary/70"}`}
            >
              #{r.id} · {r.name}
            </div>
          ))}
        </div>
  
        {/* Query visual with ? slot */}
        <div className="w-full max-w-md bg-black/70 border border-primary/30 rounded-xl p-4 font-mono text-sm mb-4">
          <p className="text-yellow-300">
            DELETE FROM STUDENT WHERE Roll_No ={" "}
            <span className={`px-2 py-0.5 rounded border transition-all
              ${paramBound ? "border-green-500 bg-green-500/10 text-green-400" : "border-dashed border-yellow-500 text-yellow-400"}`}>
              {paramBound ? numId : "?"}
            </span>
          </p>
          {paramBound && <p className="text-green-400 mt-1">// setInt(1, {numId}) ✅</p>}
        </div>
  
        {/* Manual input */}
        <input
          type="number"
          value={targetId}
          onChange={e => { setTargetId(e.target.value); setParamBound(false); setParamError(null); }}
          placeholder="Enter Roll_No (e.g. 101)"
          className="w-full max-w-xs px-4 py-2 bg-black/40 border border-primary/30 rounded-lg font-mono text-sm text-primary outline-none focus:border-primary mb-3"
        />
  
        {paramError && <p className="text-red-400 text-sm mb-3">{paramError}</p>}
  
        {!paramBound ? (
          <button
            onClick={handleBind}
            className="px-6 py-2 bg-primary/20 text-primary rounded-lg text-sm mb-4"
            disabled={!targetId}
          >
            🔗 Bind Parameter
          </button>
        ) : (
          <button
            onClick={() => { game.addXp(75, "🔗 Parameter Bound"); game.nextStage(); }}
            className="px-8 py-3 bg-primary text-primary-foreground font-bold rounded-xl"
          >
            🔴 Execute DELETE Mission →
          </button>
        )}
      </StageWrapper>
    );
  };


  const renderStage4 = () => {
    const numId = parseInt(targetId);
    const exists = STUDENT_RECORDS.some(r => r.id === numId);
  
    const handleExecute = () => {
      if (exists) {
        setDeletedIds(prev => new Set([...prev, numId]));
        setExecuteResult("hit");
      } else {
        setExecuteResult("miss");
      }
    };
  
    return (
      <StageWrapper>
        <h3 className="text-xl font-bold text-primary mb-2">🔴 Execute DELETE Mission</h3>
        <p className="text-muted-foreground text-sm mb-6 max-w-md text-center">
          Fire the DELETE command. <code>executeUpdate()</code> returns the number of rows removed.
        </p>
  
        {/* Record targets */}
        <div className="flex gap-2 flex-wrap justify-center mb-6">
          {STUDENT_RECORDS.map(r => (
            <div
              key={r.id}
              className={`px-3 py-2 rounded-lg border text-xs font-mono transition-all duration-500
                ${deletedIds.has(r.id)
                  ? "border-red-500/20 bg-red-500/5 text-red-400/40 line-through opacity-40"
                  : r.id === numId && executeResult === null
                  ? "border-yellow-500 bg-yellow-500/10 text-yellow-300 animate-pulse"
                  : "border-primary/30 text-primary/60"}`}
            >
              #{r.id} {deletedIds.has(r.id) ? "💥 DELETED" : r.name}
            </div>
          ))}
        </div>
  
        {/* Code display */}
        <div className="w-full max-w-md bg-black/70 border border-primary/30 rounded-xl p-4 font-mono text-sm mb-6">
          <p className="text-muted-foreground">int rows = pstmt.executeUpdate();</p>
          {executeResult && (
            <p className={executeResult === "hit" ? "text-green-400" : "text-orange-400"}>
              // rows = {executeResult === "hit" ? "1  ✅ Record deleted" : "0  ⚠️ No matching record"}
            </p>
          )}
        </div>
  
        {!executeResult && (
          <button
            onClick={handleExecute}
            className="px-8 py-3 bg-red-600 text-white font-bold rounded-xl flex items-center gap-2 hover:bg-red-700 transition-all"
          >
            <Target className="size-5" /> EXECUTE
          </button>
        )}
  
        {executeResult === "hit" && (
          <button
            onClick={() => { game.addXp(100, "🎯 Precision Strike"); game.nextStage(); }}
            className="px-8 py-3 bg-primary text-primary-foreground font-bold rounded-xl"
          >
            📊 Analyze Result →
          </button>
        )}
  
        {executeResult === "miss" && (
          <div className="flex flex-col items-center gap-2 mt-2">
            <p className="text-orange-400 text-sm">⚠️ Roll_No {numId} not found — 0 rows affected. Try a valid ID (101–105).</p>
            <button
  onClick={() => { 
    setExecuteResult(null); 
    setParamBound(false); 
    setTargetId(""); 
    if (typeof game.setStage === 'function') {
      game.setStage(3); // Explicitly point back to Stage 3
    }
  }}
  className="px-5 py-2 bg-orange-500/20 border border-orange-500/40 text-orange-400 rounded-xl text-sm hover:bg-orange-500/30 transition-all"
>
  🔄 Re-bind Target
</button>
            <button
              onClick={() => { game.addXp(30, "💡 Miss Learned"); game.nextStage(); }}
              className="px-5 py-2 bg-primary/20 text-primary rounded-xl text-sm"
            >
              💡 Continue with this result →
            </button>
          </div>
        )}
      </StageWrapper>
    );
  };


  const renderStage5 = () => {
    const rowsValue = executeResult === "hit" ? 1 : 0;
  
    return (
      <StageWrapper>
        <h3 className="text-xl font-bold text-primary mb-2">📊 Result Analyzer</h3>
        <p className="text-muted-foreground text-sm mb-6 max-w-md text-center">
          The mission log shows the result. Interpret what <code>rows</code> means for your operation.
        </p>
  
        {/* Flickering console */}
        <div className="w-full max-w-md bg-black/70 border border-primary/30 rounded-xl p-4 font-mono text-sm mb-6">
          <p className="text-muted-foreground">-- Mission Log --</p>
          <p className="text-yellow-300 text-2xl font-bold">rows = <span className="text-primary">{rowsValue}</span></p>
          <p className="text-muted-foreground text-xs mt-1">int result = pstmt.executeUpdate();</p>
        </div>
  
        {/* Interpretation quiz */}
        <div className="w-full max-w-md mb-6">
          <QuizBlock
            question={`rows = ${rowsValue} means:`}
            options={[
              { label: "No matching row found — nothing was deleted",    value: "zero" },
              { label: "One or more rows were successfully deleted",     value: "positive" },
              { label: "The query failed to execute",                    value: "error" },
            ]}
            correctValue={rowsValue === 0 ? "zero" : "positive"}
            selectedValue={rowsAnswer}
            onSelect={setRowsAnswer}
            correctFeedback={rowsValue === 0
              ? "✅ Correct! rows = 0 means no record matched — nothing was removed."
              : "✅ Correct! rows = 1 confirms the record was successfully deleted."}
            wrongFeedback="❌ Remember: executeUpdate() returns affected row count. 0 = nothing deleted, >0 = rows removed."
          />
        </div>
  
        {rowsAnswer && rowsAnswer !== (rowsValue === 0 ? "zero" : "positive") && (
          <button
            onClick={() => setRowsAnswer(null)}
            className="px-5 py-2 bg-red-500/20 border border-red-500/40 text-red-400 rounded-xl text-sm hover:bg-red-500/30 transition-all mb-4"
          >
            🔄 Try Again
          </button>
        )}
  
        {rowsAnswer === (rowsValue === 0 ? "zero" : "positive") && (
          <button
            onClick={() => { game.addXp(75, "🧠 Result Analyst"); game.nextStage(); }}
            className="px-8 py-3 bg-primary text-primary-foreground font-bold rounded-xl"
          >
            🔄 Enter Transaction Control Room →
          </button>
        )}
      </StageWrapper>
    );
  };


  const renderStage6 = () => (
    <StageWrapper>
      <h3 className="text-xl font-bold text-primary mb-2">🔄 Transaction Control Room</h3>
      <p className="text-muted-foreground text-sm mb-6 max-w-md text-center">
        With <code>autoCommit = OFF</code>, deletions are pending until you commit or roll them back.
      </p>
  
      {/* AutoCommit toggle */}
      <div className="flex items-center gap-4 mb-6">
        <span className="text-sm font-mono text-muted-foreground">AutoCommit:</span>
        <button
          onClick={() => { setAutoCommit(prev => !prev); setTxPending(false); setTxAction(null); setTxResult(null); }}
          className={`px-5 py-2 rounded-full border-2 font-bold text-sm transition-all
            ${autoCommit
              ? "border-green-500 bg-green-500/10 text-green-400"
              : "border-orange-500 bg-orange-500/10 text-orange-400"}`}
        >
          {autoCommit ? "🔄 ON — changes instant" : "🔒 OFF — changes pending"}
        </button>
      </div>
  
      {/* Pipeline buffer visual */}
      <div className="w-full max-w-md bg-black/70 border border-primary/30 rounded-xl p-4 font-mono text-sm mb-6">
        <p className="text-muted-foreground">con.setAutoCommit({autoCommit ? "true" : "false"});</p>
        {!autoCommit && txPending && (
          <p className="text-orange-400 mt-1">// DELETE pending in buffer…</p>
        )}
        {txResult === "committed"   && <p className="text-green-400 mt-1">con.commit(); ✅ Changes saved</p>}
        {txResult === "rolledback"  && <p className="text-red-400   mt-1">con.rollback(); 🔁 Action reversed</p>}
      </div>
  
      {/* Step 1: Execute DELETE */}
      {!autoCommit && !txPending && (
        <button
          onClick={() => setTxPending(true)}
          className="px-6 py-2 bg-red-500/20 border border-red-500/40 text-red-400 rounded-lg text-sm mb-4"
        >
          🗑️ Execute DELETE (pending)
        </button>
      )}
  
      {/* Step 2: Commit or Rollback */}
      {!autoCommit && txPending && !txResult && (
        <div className="flex gap-3 mb-4">
          <button
            onClick={() => { setTxAction("commit");   setTxResult("committed"); }}
            className="px-6 py-2 bg-green-500/20 border border-green-500/40 text-green-400 rounded-xl text-sm hover:bg-green-500/30 transition-all"
          >
            ✅ Commit
          </button>
          <button
            onClick={() => { setTxAction("rollback"); setTxResult("rolledback"); }}
            className="px-6 py-2 bg-red-500/20 border border-red-500/40 text-red-400 rounded-xl text-sm hover:bg-red-500/30 transition-all"
          >
            ❌ Rollback
          </button>
        </div>
      )}
  
      {txResult && (
        <button
          onClick={() => { game.addXp(100, "🔄 Transaction Controller"); game.nextStage(); }}
          className="px-8 py-3 bg-primary text-primary-foreground font-bold rounded-xl"
        >
          🧹 Run Cleanup Protocol →
        </button>
      )}
  
      {autoCommit && (
        <p className="text-muted-foreground text-xs mt-2">
          💡 Toggle AutoCommit <strong>OFF</strong> first to see transaction control in action.
        </p>
      )}
    </StageWrapper>
  );

  const renderStage7 = () => {
    if (bossPhase === "done") {
      return (
        <CompletionScreen
          missionTitle="🎯 DataSphere Secured!"
          missionSubtitle="You executed precision deletions, handled missing records, managed transactions, and cleaned up all resources."
          xp={game.xp}
          xpLog={game.xpLog}
          achievements={[
            { icon: <Target className="size-4" />,    label: "Precision Sniper" },
            { icon: <Crosshair className="size-4" />, label: "Data Detective" },
            { icon: <RefreshCw className="size-4" />, label: "Transaction Controller" },
            { icon: <Trash2 className="size-4" />,    label: "Cleanup Master" },
            { icon: <Shield className="size-4" />,    label: "Database Assassin" },
          ]}
          concepts={[
            { label: "PreparedStatement DELETE", description: "Uses ? placeholders for safe, parameterized row deletion." },
            { label: "executeUpdate()",           description: "Returns affected row count — 0 means nothing matched." },
            { label: "Missing Row Handling",       description: "Always check rows result to confirm deletion success." },
            { label: "Transactions",               description: "setAutoCommit(false) lets you commit or rollback deletions." },
            { label: "Resource Management",        description: "Always close Connection and PreparedStatement to prevent leaks." },
          ]}
          onReset={game.reset}
        />
      );
    }
  
    // Phase 1 — Cleanup
    if (bossPhase === "delete") {
      const allClosed = closeDropped.size === CLOSE_TARGETS.length;
  
      return (
        <StageWrapper>
          <h3 className="text-xl font-bold text-primary mb-2">🧹 Cleanup Protocol</h3>
          <p className="text-muted-foreground text-sm mb-6 max-w-md text-center">
            System memory is leaking. Close all resources to stabilize the DataSphere.
          </p>
  
          {/* Memory leak visual */}
          <div className={`w-full max-w-sm p-4 rounded-xl border mb-6 transition-all
            ${allClosed ? "border-green-500 bg-green-500/5" : "border-orange-500/40 bg-orange-500/5"}`}>
            <div className="flex justify-between text-xs text-muted-foreground mb-1">
              <span>System Stability</span>
              <span className={allClosed ? "text-green-400" : "text-orange-400"}>
                {allClosed ? "100% ✅" : `${Math.round((closeDropped.size / CLOSE_TARGETS.length) * 100)}%`}
              </span>
            </div>
            <div className="w-full bg-muted rounded-full h-3 overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-500 ${allClosed ? "bg-green-500" : "bg-orange-500"}`}
                style={{ width: `${(closeDropped.size / CLOSE_TARGETS.length) * 100}%` }}
              />
            </div>
          </div>
  
          {/* Finally block visual */}
          <div className="w-full max-w-md bg-black/70 border border-primary/30 rounded-xl p-4 font-mono text-sm mb-6">
            <p className="text-muted-foreground">{"} finally {"}</p>
            {CLOSE_TARGETS.map(t => (
              <p key={t} className={`ml-4 text-xs transition-all ${closeDropped.has(t) ? "text-green-400" : "text-muted-foreground"}`}>
                {closeDropped.has(t) ? `  if (${t.toLowerCase()} != null) ${t.toLowerCase()}.close(); ✅` : `  // ${t}.close() — not closed ⚡`}
              </p>
            ))}
            <p className="text-muted-foreground">{"}"}</p>
          </div>
  
          {/* Close buttons */}
          <div className="flex gap-3 flex-wrap justify-center mb-6">
            {CLOSE_TARGETS.map(t => (
              <button
                key={t}
                onClick={() => setCloseDropped(prev => new Set([...prev, t]))}
                disabled={closeDropped.has(t)}
                className={`px-4 py-2 rounded-xl border text-sm font-mono transition-all
                  ${closeDropped.has(t)
                    ? "border-green-500 bg-green-500/10 text-green-400 cursor-default"
                    : "border-primary/40 hover:border-primary text-primary"}`}
              >
                {closeDropped.has(t) ? `✅ ${t} closed` : `close(${t})`}
              </button>
            ))}
          </div>
  
          {allClosed && (
            <button
              onClick={() => { game.addXp(100, "🧹 Cleanup Master"); setBossPhase("quiz"); }}
              className="px-8 py-3 bg-primary text-primary-foreground font-bold rounded-xl"
            >
              🧨 Final Boss Challenge →
            </button>
          )}
        </StageWrapper>
      );
    }
  
    // Phase 2 — Boss quiz
    if (bossPhase === "quiz") return (
      <StageWrapper>
        <h3 className="text-xl font-bold text-primary mb-6">🧨 Corrupted Database Crisis — Final Boss</h3>
        <div className="w-full max-w-md space-y-6 mb-8">
          <QuizBlock
            question="You execute DELETE with Roll_No = 999 (doesn't exist). What does executeUpdate() return?"
            options={[
              { label: "-1 (error code)",                    value: "a" },
              { label: "0 (no rows matched)",                value: "b" },
              { label: "It throws an exception automatically", value: "c" },
            ]}
            correctValue="b"
            selectedValue={quiz1Answer}
            onSelect={setQuiz1Answer}
            correctFeedback="✅ Correct! No exception — executeUpdate() simply returns 0 when no rows match."
            wrongFeedback="❌ No exception is thrown for missing rows. The method returns 0 to indicate nothing was deleted."
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
                question="With autoCommit = false, you delete 3 records then call rollback(). What happens?"
                options={[
                  { label: "2 of the 3 deletions are saved",             value: "a" },
                  { label: "All 3 deletions are undone",                 value: "b" },
                  { label: "The records are permanently deleted anyway", value: "c" },
                ]}
                correctValue="b"
                selectedValue={quiz2Answer}
                onSelect={setQuiz2Answer}
                correctFeedback="✅ Correct! rollback() undoes all uncommitted changes in the current transaction."
                wrongFeedback="❌ rollback() reverses ALL uncommitted changes — not just some of them."
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
            onClick={() => { game.addXp(300, "🎯 Database Assassin"); setBossPhase("done"); }}
            className="px-8 py-3 bg-primary text-primary-foreground font-bold rounded-xl animate-in zoom-in"
          >
            🌐 Secure the DataSphere →
          </button>
        )}
      </StageWrapper>
    );
  };

  return (
    <SimShell
      title="Database Assassin"
      subtitle="The DELETE Protocol"
      xp={game.xp}
      stage={game.stage}
      totalStages={TOTAL_STAGES}
      mistakeMessage={game.mistakeMessage}
      successMessage={game.successMessage}
      icon={<Target className="size-5 text-primary" />}
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