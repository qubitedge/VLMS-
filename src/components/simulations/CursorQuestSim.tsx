import { useState } from "react";
import { /* pick icons from lucide-react */ Swords } from "lucide-react";
import {
  useSimGame,
  SimShell,
  StageWrapper,
  QuizBlock,
  CompletionScreen,
} from "@/components/simulations/shared";

// ── Constants ─────────────────────────────────────────────────────────────────
const TOTAL_STAGES = 8;

export function CursorQuestSim() {
  const game = useSimGame(TOTAL_STAGES, () => {
    setDept(""); setCursorOpen(false); setMultiDepts([]); setMultiInput("");
    setLockOn(false); setFetchStep(0); setRefChoice(null); setRefOpen(false);
    setMatchAnswers({}); setPredictQuiz(null); setBuildBlocks([]);
    setBossStep(0);
  });
  const [dept, setDept]               = useState<string>("");
  const [cursorOpen, setCursorOpen]   = useState(false);
  const [multiDepts, setMultiDepts]   = useState<string[]>([]);
  const [multiInput, setMultiInput]   = useState("");
  const [lockOn, setLockOn]           = useState(false);
  const [fetchStep, setFetchStep]     = useState(0);
  const [refChoice, setRefChoice]     = useState<string | null>(null);
  const [refOpen, setRefOpen]         = useState(false);
  const [matchAnswers, setMatchAnswers] = useState<Record<string, string>>({});
  const [predictQuiz, setPredictQuiz] = useState<string | null>(null);
  const [buildBlocks, setBuildBlocks] = useState<string[]>([]);
  const [bossStep, setBossStep] = useState(0);
 

  // ── Stage renderers ───────────────────────────────────────────────────────

  const renderStage1 = () => {
    const DEPTS = ["CSE", "ECE", "MECH", "CIVIL", "IT"];
    const STUDENTS: Record<string, { name: string; marks: number }[]> = {
      CSE:   [{ name: "Alice", marks: 92 }, { name: "Bob", marks: 78 }],
      ECE:   [{ name: "Carol", marks: 85 }, { name: "Dan", marks: 61 }],
      MECH:  [{ name: "Eva",   marks: 74 }, { name: "Frank", marks: 88 }],
      CIVIL: [{ name: "Grace", marks: 55 }, { name: "Henry", marks: 90 }],
      IT:    [{ name: "Ivy",   marks: 67 }, { name: "Jack", marks: 83 }],
    };
  
    return (
      <StageWrapper>
        <div className="text-center mb-6 max-w-md">
          <h2 className="text-2xl font-bold text-primary mb-2">🏙️ Department Scanner</h2>
          <p className="text-muted-foreground text-sm">
            You don't need the whole city — just one department. Parameterized cursors
            filter data at runtime, fetching only what you specify.
          </p>
        </div>
  
        {/* City map */}
        <div className="flex flex-wrap gap-3 justify-center mb-6">
          {DEPTS.map(d => (
            <button
              key={d}
              onClick={() => { setDept(d); setCursorOpen(false); }}
              className={`px-4 py-3 rounded-xl border font-bold text-sm transition-all
                ${dept === d ? "bg-primary/20 border-primary text-primary scale-105" : "border-border hover:border-primary"}`}
            >
              🏢 {d}
            </button>
          ))}
        </div>
  
        {/* Cursor preview */}
        {dept && (
          <div className="w-full max-w-md bg-muted rounded-2xl p-4 mb-4 font-mono text-xs animate-in fade-in">
            <p className="text-muted-foreground mb-1">-- Cursor Definition</p>
            <p><span className="text-blue-400">CURSOR</span> dept_cursor
              (<span className="text-yellow-400">p_dept VARCHAR2</span>) <span className="text-blue-400">IS</span></p>
            <p className="pl-4"><span className="text-blue-400">SELECT</span> * <span className="text-blue-400">FROM</span> STUDENT</p>
            <p className="pl-4"><span className="text-blue-400">WHERE</span> Dept = <span className="text-green-400">'{dept}'</span>;</p>
          </div>
        )}
  
        {dept && !cursorOpen && (
          <button
            onClick={() => setCursorOpen(true)}
            className="px-6 py-3 bg-primary text-primary-foreground font-bold rounded-xl mb-4 animate-in zoom-in"
          >
            ⚡ OPEN CURSOR
          </button>
        )}
  
        {/* Results */}
        {cursorOpen && dept && (
          <div className="w-full max-w-md animate-in slide-in-from-bottom">
            <p className="text-xs text-muted-foreground mb-2 uppercase tracking-widest">
              Laser Scan → {dept} Department
            </p>
            <div className="space-y-2">
              {STUDENTS[dept].map(s => (
                <div key={s.name}
                  className="flex items-center gap-4 bg-primary/10 border border-primary/30 rounded-xl px-4 py-2 text-sm animate-in fade-in"
                >
                  <span className="text-lg">✨</span>
                  <span className="font-bold">{s.name}</span>
                  <span className="text-muted-foreground ml-auto">Marks: {s.marks}</span>
                </div>
              ))}
            </div>
            <button
              onClick={() => { game.addXp(100, "🎯 Selective Fetch Master"); game.nextStage(); }}
              className="mt-5 px-8 py-3 bg-primary text-primary-foreground font-bold rounded-xl w-full animate-in zoom-in"
            >
              Multi-Scan Mode →
            </button>
          </div>
        )}
      </StageWrapper>
    );
  };

  const renderStage2 = () => {
    const ALL = ["CSE", "ECE", "MECH", "CIVIL", "IT"];
    const addDept = () => {
      const v = multiInput.trim().toUpperCase();
      if (ALL.includes(v) && !multiDepts.includes(v)) {
        setMultiDepts(prev => [...prev, v]);
      }
      setMultiInput("");
    };
  
    return (
      <StageWrapper>
        <div className="text-center mb-6 max-w-md">
          <h3 className="text-xl font-bold text-primary mb-1">📡 Multi-Scan Mode</h3>
          <p className="text-muted-foreground text-sm">
            One cursor. Multiple realities. Reuse the same parameterized cursor
            with different inputs — no need to rewrite logic each time.
          </p>
        </div>
  
        {/* Input */}
        <div className="flex gap-2 mb-4">
          <input
            value={multiInput}
            onChange={e => setMultiInput(e.target.value.toUpperCase())}
            placeholder="Type dept (CSE, ECE…)"
            className="flex-1 px-4 py-2 rounded-xl border border-border bg-muted text-sm font-mono focus:outline-none focus:border-primary"
            onKeyDown={e => e.key === "Enter" && addDept()}
          />
          <button
            onClick={addDept}
            className="px-4 py-2 bg-primary text-primary-foreground rounded-xl font-bold text-sm"
          >Add</button>
        </div>
  
        {/* Scan log */}
        {multiDepts.length > 0 && (
          <div className="w-full max-w-md space-y-2 mb-6">
            {multiDepts.map((d, i) => (
              <div key={d} className="flex items-center gap-3 bg-muted rounded-xl px-4 py-2 text-sm animate-in fade-in">
                <span className="text-muted-foreground font-mono">Run {i + 1}:</span>
                <span className="text-blue-400 font-mono">OPEN dept_cursor('{d}');</span>
                <span className="text-green-400 ml-auto">✓ Fetched</span>
              </div>
            ))}
          </div>
        )}
  
        {multiDepts.length >= 3 && (
          <div className="flex flex-col items-center gap-3 animate-in zoom-in">
            <p className="text-green-400 font-bold">🏆 Reusable Logic Achieved! {multiDepts.length} departments scanned.</p>
            <button
              onClick={() => { game.addXp(120, "🏆 Multi-Scan Expert"); game.nextStage(); }}
              className="px-8 py-3 bg-primary text-primary-foreground font-bold rounded-xl"
            >
              Activate Protection Shield →
            </button>
          </div>
        )}
  
        {multiDepts.length < 3 && (
          <p className="text-xs text-muted-foreground">Add at least 3 departments to proceed.</p>
        )}
      </StageWrapper>
    );
  };

  const renderStage3 = () => {
    const rows = [
      { name: "Alice", marks: 92 },
      { name: "Bob",   marks: 78 },
      { name: "Carol", marks: 85 },
    ];
  
    return (
      <StageWrapper>
        <div className="text-center mb-6 max-w-md">
          <h3 className="text-xl font-bold text-primary mb-1">🛡️ Data Protection Shield</h3>
          <p className="text-muted-foreground text-sm">
            When you plan to update rows, you must lock them first with{" "}
            <code className="bg-muted px-1 rounded">FOR UPDATE</code>. Otherwise, two
            agents can modify the same row and corrupt the data.
          </p>
        </div>
  
        {/* Toggle */}
        <div className="flex items-center gap-4 mb-6">
          <span className="text-sm font-bold text-muted-foreground">FOR UPDATE:</span>
          <button
            onClick={() => setLockOn(v => !v)}
            className={`px-6 py-2 rounded-xl font-bold text-sm transition-all border
              ${lockOn ? "bg-green-500/20 border-green-500 text-green-400" : "bg-red-500/20 border-red-500 text-red-400"}`}
          >
            {lockOn ? "🔒 ON — Rows Locked" : "🔓 OFF — No Lock"}
          </button>
        </div>
  
        {/* Visual rows */}
        <div className="w-full max-w-md space-y-2 mb-6">
          {rows.map(r => (
            <div key={r.name}
              className={`flex items-center gap-4 rounded-xl px-4 py-3 border text-sm transition-all
                ${lockOn
                  ? "bg-green-500/10 border-green-500/40"
                  : "bg-red-500/10 border-red-500/40"}`}
            >
              {lockOn
                ? <span className="text-green-400 text-lg">🔒</span>
                : <span className="text-red-400 text-lg animate-pulse">⚠️</span>}
              <span className="font-bold">{r.name}</span>
              <span className="text-muted-foreground ml-auto">Marks: {r.marks}</span>
              {!lockOn && <span className="text-red-400 text-xs">Agent 2 also editing!</span>}
            </div>
          ))}
        </div>
  
        {/* Code preview */}
        <div className="w-full max-w-md bg-muted rounded-2xl p-4 mb-6 font-mono text-xs">
          <p><span className="text-blue-400">CURSOR</span> update_cursor <span className="text-blue-400">IS</span></p>
          <p className="pl-4"><span className="text-blue-400">SELECT</span> * <span className="text-blue-400">FROM</span> STUDENT</p>
          {lockOn
            ? <p className="pl-4 text-green-400">FOR UPDATE; -- ✅ Rows are locked</p>
            : <p className="pl-4 text-red-400">-- ❌ No FOR UPDATE — conflicts possible!</p>}
        </div>
  
        {lockOn && (
          <button
            onClick={() => { game.addXp(150, "🛡️ Lock Guardian"); game.nextStage(); }}
            className="px-8 py-3 bg-primary text-primary-foreground font-bold rounded-xl animate-in zoom-in"
          >
            Activate Update Beam →
          </button>
        )}
      </StageWrapper>
    );
  };

  const renderStage4 = () => {
    const ROWS = [
      { name: "Alice", marks: 88 },
      { name: "Bob",   marks: 72 },
      { name: "Carol", marks: 65 },
    ];
    const currentRow = ROWS[Math.min(fetchStep, ROWS.length - 1)];
    const done = fetchStep >= ROWS.length;
  
    return (
      <StageWrapper>
        <div className="text-center mb-6 max-w-md">
          <h3 className="text-xl font-bold text-primary mb-1">🎯 Precision Update Beam</h3>
          <p className="text-muted-foreground text-sm">
            <code className="bg-muted px-1 rounded">WHERE CURRENT OF</code> updates
            only the row the cursor currently points to — precise, safe, no collateral changes.
          </p>
        </div>
  
        {/* Conveyor belt */}
        <div className="w-full max-w-md space-y-2 mb-6">
          {ROWS.map((r, i) => {
            const updated = Math.round(r.marks * 1.1);
            const isActive = i === fetchStep && !done;
            const isDone = i < fetchStep;
            return (
              <div key={r.name}
                className={`flex items-center gap-4 rounded-xl px-4 py-3 border text-sm transition-all
                  ${isActive ? "bg-yellow-500/20 border-yellow-400 scale-105"
                    : isDone ? "bg-green-500/10 border-green-500/30"
                    : "bg-muted border-border opacity-40"}`}
              >
                <span className="text-lg">{isActive ? "👆" : isDone ? "✅" : "⏳"}</span>
                <span className="font-bold">{r.name}</span>
                <span className="ml-auto font-mono text-xs">
                  {isDone
                    ? <span className="text-green-400">{r.marks} → {updated}</span>
                    : <span className="text-muted-foreground">{r.marks}</span>}
                </span>
              </div>
            );
          })}
        </div>
  
        {/* Code */}
        <div className="w-full max-w-md bg-muted rounded-2xl p-4 mb-4 font-mono text-xs">
          <p><span className="text-blue-400">UPDATE</span> STUDENT</p>
          <p className="pl-4"><span className="text-blue-400">SET</span> Marks = Marks * 1.1</p>
          <p className="pl-4"><span className="text-blue-400">WHERE CURRENT OF</span>{" "}
            <span className="text-yellow-400">update_cursor</span>; -- updates only ↑</p>
        </div>
  
        {!done ? (
          <button
            onClick={() => setFetchStep(s => s + 1)}
            className="px-6 py-3 bg-primary text-primary-foreground font-bold rounded-xl"
          >
            ⚡ FETCH NEXT + UPDATE
          </button>
        ) : (
          <div className="flex flex-col items-center gap-3 animate-in zoom-in">
            <p className="text-green-400 font-bold">🎯 All rows updated precisely — zero collateral damage!</p>
            <button
              onClick={() => { game.addXp(150, "🎯 Precision Updater"); game.nextStage(); }}
              className="px-8 py-3 bg-primary text-primary-foreground font-bold rounded-xl"
            >
              Open Dynamic Portal →
            </button>
          </div>
        )}
      </StageWrapper>
    );
  };

  const renderStage5 = () => {
    const PORTALS: Record<string, { label: string; emoji: string; rows: { name: string; marks: number }[] }> = {
      top:   { label: "Top Students (≥ 80)", emoji: "⭐", rows: [{ name: "Alice", marks: 92 }, { name: "Frank", marks: 88 }] },
      fail:  { label: "Failed Students (< 60)", emoji: "❌", rows: [{ name: "Grace", marks: 55 }, { name: "Dan", marks: 42 }] },
      dept:  { label: "Department — CSE", emoji: "🏢", rows: [{ name: "Alice", marks: 92 }, { name: "Bob", marks: 78 }] },
    };
  
    return (
      <StageWrapper>
        <div className="text-center mb-6 max-w-md">
          <h3 className="text-xl font-bold text-primary mb-1">🌐 Dynamic Portal Engine</h3>
          <p className="text-muted-foreground text-sm">
            <code className="bg-muted px-1 rounded">REF CURSOR</code> is not fixed. Choose a
            condition at runtime and it adapts — opening a completely different query portal.
          </p>
        </div>
  
        {/* Portal selector */}
        <div className="flex gap-3 mb-6 flex-wrap justify-center">
          {Object.entries(PORTALS).map(([key, p]) => (
            <button
              key={key}
              onClick={() => { setRefChoice(key); setRefOpen(false); }}
              className={`px-4 py-3 rounded-xl border text-sm font-bold transition-all
                ${refChoice === key ? "bg-primary/20 border-primary text-primary scale-105" : "border-border hover:border-primary"}`}
            >
              {p.emoji} {p.label}
            </button>
          ))}
        </div>
  
        {/* Code preview */}
        {refChoice && (
          <div className="w-full max-w-md bg-muted rounded-2xl p-4 mb-4 font-mono text-xs animate-in fade-in">
            <p><span className="text-blue-400">TYPE</span> ref_cursor_type <span className="text-blue-400">IS REF CURSOR</span>;</p>
            <p><span className="text-blue-400">OPEN</span> ref_cursor <span className="text-blue-400">FOR</span></p>
            <p className="pl-4 text-green-400">-- {PORTALS[refChoice].label} query</p>
            <p className="pl-4"><span className="text-blue-400">SELECT</span> * <span className="text-blue-400">FROM</span> STUDENT
              <span className="text-yellow-400"> WHERE …</span>;</p>
          </div>
        )}
  
        {refChoice && !refOpen && (
          <button
            onClick={() => setRefOpen(true)}
            className="px-6 py-3 bg-primary text-primary-foreground font-bold rounded-xl mb-4 animate-in zoom-in"
          >
            🌀 OPEN REF CURSOR
          </button>
        )}
  
        {refOpen && refChoice && (
          <div className="w-full max-w-md animate-in slide-in-from-bottom">
            <p className="text-xs text-muted-foreground mb-2 uppercase tracking-widest">
              Portal Result — {PORTALS[refChoice].label}
            </p>
            <div className="space-y-2 mb-5">
              {PORTALS[refChoice].rows.map(r => (
                <div key={r.name}
                  className="flex items-center gap-4 bg-primary/10 border border-primary/30 rounded-xl px-4 py-2 text-sm"
                >
                  <span>{PORTALS[refChoice].emoji}</span>
                  <span className="font-bold">{r.name}</span>
                  <span className="ml-auto text-muted-foreground">Marks: {r.marks}</span>
                </div>
              ))}
            </div>
            <button
              onClick={() => { game.addXp(150, "🌐 Dynamic Query Master"); game.nextStage(); }}
              className="px-8 py-3 bg-primary text-primary-foreground font-bold rounded-xl w-full"
            >
              Mini Challenges →
            </button>
          </div>
        )}
      </StageWrapper>
    );
  };

  const renderStage6 = () => {
    const MATCH_PAIRS: { concept: string; answer: string }[] = [
      { concept: "Parameterized Cursor", answer: "Runtime filtering"  },
      { concept: "FOR UPDATE",           answer: "Row locking"         },
      { concept: "WHERE CURRENT OF",     answer: "Current row update"  },
      { concept: "REF CURSOR",           answer: "Dynamic query"       },
    ];
    const ANSWERS = ["Runtime filtering", "Row locking", "Current row update", "Dynamic query"];
  
    const allMatched = MATCH_PAIRS.every(p => matchAnswers[p.concept] === p.answer);
    const predictCorrect = predictQuiz === "conflict";
  
    const BUILD_OPTIONS = ["SELECT", "WHERE", "PARAMETER", "DROP", "FOR UPDATE"];
    const CORRECT_BUILD = ["SELECT", "WHERE", "PARAMETER"];
    const buildCorrect =
      buildBlocks.length === CORRECT_BUILD.length &&
      buildBlocks.every((b, i) => b === CORRECT_BUILD[i]);
  
    const allDone = allMatched && predictCorrect && buildCorrect;
  
    return (
      <StageWrapper>
        <h3 className="text-xl font-bold text-primary mb-6">🧩 Mini Challenges</h3>
  
        {/* Challenge 1: Match */}
        <div className="w-full max-w-lg mb-8">
          <p className="text-sm font-bold mb-3 text-muted-foreground">Challenge 1 — Match the Concept</p>
          <div className="space-y-3">
            {MATCH_PAIRS.map(pair => (
              <div key={pair.concept} className="flex items-center gap-3 flex-wrap">
                <span className="text-sm font-mono w-44">{pair.concept}</span>
                <select
                  value={matchAnswers[pair.concept] ?? ""}
                  onChange={e => setMatchAnswers(prev => ({ ...prev, [pair.concept]: e.target.value }))}
                  className={`px-3 py-1 rounded-lg border text-xs bg-muted
                    ${matchAnswers[pair.concept] === pair.answer ? "border-green-500 text-green-400" : "border-border"}`}
                >
                  <option value="">-- select --</option>
                  {ANSWERS.map(a => <option key={a} value={a}>{a}</option>)}
                </select>
                {matchAnswers[pair.concept] && (
                  <span className="text-xs">
                    {matchAnswers[pair.concept] === pair.answer ? "✅" : "❌"}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
  
        {/* Challenge 2: Predict */}
        <div className="w-full max-w-lg mb-8">
          <QuizBlock
            question="🔮 What happens if you don't use FOR UPDATE before editing rows?"
            options={[
              { label: "Safe update — no issues",             value: "safe"     },
              { label: "Conflict ⚠️ — data may be corrupted", value: "conflict" },
              { label: "Faster execution",                    value: "fast"     },
            ]}
            correctValue="conflict"
            selectedValue={predictQuiz}
            onSelect={setPredictQuiz}
            correctFeedback="✅ Without a lock, two agents can edit the same row simultaneously — corruption!"
            wrongFeedback="❌ No lock = no protection. Concurrent edits cause conflicts."
          />
        </div>
  
        {/* Challenge 3: Build cursor blocks */}
        <div className="w-full max-w-lg mb-8">
          <p className="text-sm font-bold mb-3 text-muted-foreground">Challenge 3 — Build a Parameterized Cursor</p>
          <div className="bg-muted rounded-2xl p-4 min-h-[80px] border-2 border-dashed border-border mb-3">
            <p className="text-xs text-muted-foreground mb-2 uppercase">Your Cursor</p>
            {buildBlocks.length === 0 && <p className="text-sm text-muted-foreground">Click blocks below…</p>}
            {buildBlocks.map((b, i) => (
              <span key={i} className="inline-block font-mono text-xs text-primary bg-primary/10 rounded px-2 py-1 mr-2 mb-1">{b}</span>
            ))}
            {buildBlocks.length > 0 && (
              <button onClick={() => setBuildBlocks([])} className="text-xs text-red-400 underline ml-2">Clear</button>
            )}
          </div>
          <div className="flex flex-wrap gap-2">
            {BUILD_OPTIONS.filter(o => !buildBlocks.includes(o)).map(opt => (
              <button
                key={opt}
                onClick={() => setBuildBlocks(prev => [...prev, opt])}
                className="px-3 py-2 rounded-lg font-mono text-xs border border-border hover:border-primary transition-all"
              >
                {opt}
              </button>
            ))}
          </div>
          {buildBlocks.length === CORRECT_BUILD.length && (
            <p className={`text-xs mt-2 ${buildCorrect ? "text-green-400" : "text-red-400"}`}>
              {buildCorrect ? "✅ Cursor built correctly!" : "❌ Wrong order — clear and retry."}
            </p>
          )}
        </div>
  
        {allDone && (
          <button
            onClick={() => { game.addXp(200, "🧩 Challenge Champion"); game.nextStage(); }}
            className="px-8 py-3 bg-primary text-primary-foreground font-bold rounded-xl animate-in zoom-in"
          >
            Final Boss →
          </button>
        )}
      </StageWrapper>
    );
  };

  const renderStage7 = () => {
    const STEPS = [
      { label: "OPEN dept_cursor('CSE')",           xp: 50,  color: "text-blue-400"   },
      { label: "FOR UPDATE — lock rows",             xp: 50,  color: "text-yellow-400" },
      { label: "FETCH + WHERE CURRENT OF — update", xp: 100, color: "text-green-400"  },
      { label: "OPEN REF CURSOR — dynamic report",  xp: 100, color: "text-purple-400" },
    ];
    const bossDone = bossStep >= STEPS.length;
  
    return (
      <StageWrapper>
        <div className="text-center mb-6 max-w-md">
          <h3 className="text-xl font-bold text-primary mb-1">💥 Final Boss: Restore the Data City</h3>
          <p className="text-muted-foreground text-sm">
            The city is corrupted. Execute each step in order to restore data integrity.
          </p>
        </div>
  
        <div className="w-full max-w-md space-y-3 mb-6">
          {STEPS.map((s, i) => (
            <div key={i}
              className={`flex items-center gap-3 rounded-xl px-4 py-3 border text-sm transition-all
                ${i < bossStep ? "bg-green-500/10 border-green-500/40"
                  : i === bossStep ? "bg-primary/10 border-primary animate-pulse"
                  : "bg-muted border-border opacity-40"}`}
            >
              <span className={`font-mono font-bold ${s.color}`}>{i + 1}.</span>
              <span className="font-mono text-xs flex-1">{s.label}</span>
              {i < bossStep && <span className="text-green-400">✅ +{s.xp} XP</span>}
              {i === bossStep && <span className="text-primary text-xs">← Execute</span>}
            </div>
          ))}
        </div>
  
        {!bossDone ? (
          <button
            onClick={() => { game.addXp(STEPS[bossStep].xp, STEPS[bossStep].label); setBossStep(s => s + 1); }}
            className="px-6 py-3 bg-primary text-primary-foreground font-bold rounded-xl"
          >
            ▶ Execute Step {bossStep + 1}
          </button>
        ) : (
          <div className="flex flex-col items-center gap-3 animate-in zoom-in">
            <p className="text-yellow-400 font-bold text-lg">👑 Data City Restored! Perfect Execution!</p>
            <button
              onClick={() => { game.addXp(200, "👑 City Savior"); game.nextStage(); }}
              className="px-8 py-3 bg-primary text-primary-foreground font-bold rounded-xl"
            >
              Claim Victory →
            </button>
          </div>
        )}
      </StageWrapper>
    );
  };

  const renderStage8 = () => (
    <CompletionScreen
      missionTitle="Data City Restored! 🎉"
      missionSubtitle="You controlled cursors, locked rows, targeted updates, and mastered dynamic queries."
      xp={game.xp}
      xpLog={game.xpLog}
      achievements={[
        { icon: <span>🎯</span>, label: "Selective Fetch Master"  },
        { icon: <span>🏆</span>, label: "Multi-Scan Expert"       },
        { icon: <span>🛡️</span>, label: "Lock Guardian"           },
        { icon: <span>⚡</span>, label: "Precision Updater"        },
        { icon: <span>🌐</span>, label: "Dynamic Query Master"     },
        { icon: <span>👑</span>, label: "City Savior"              },
      ]}
      concepts={[
        { label: "Parameterized Cursor", description: "Filters data at runtime by accepting parameters, avoiding full-table scans." },
        { label: "Cursor Reuse",         description: "The same parameterized cursor can be opened multiple times with different arguments." },
        { label: "FOR UPDATE",           description: "Locks fetched rows so no other session can modify them during your transaction." },
        { label: "WHERE CURRENT OF",     description: "Updates or deletes only the row the cursor currently points to — safe and precise." },
        { label: "REF CURSOR",           description: "A dynamic cursor type that can hold different query results determined at runtime." },
      ]}
      onReset={game.reset}
    />
  );

  // ── Render ────────────────────────────────────────────────────────────────
  return (
    <SimShell
      title="Cursor Quest"
      subtitle="The Database Time Heist"
      xp={game.xp}
      stage={game.stage}
      totalStages={TOTAL_STAGES}
      mistakeMessage={game.mistakeMessage}
      successMessage={game.successMessage}
      icon={<span className="text-primary text-lg">🔐</span>}
    >
      {game.stage === 1 && renderStage1()}
      {game.stage === 2 && renderStage2()}
      {game.stage === 3 && renderStage3()}
      {game.stage === 4 && renderStage4()}
      {game.stage === 5 && renderStage5()}
      {game.stage === 6 && renderStage6()}
      {game.stage === 7 && renderStage7()}
      {game.stage === 8 && renderStage8()}
    </SimShell>
  );
}