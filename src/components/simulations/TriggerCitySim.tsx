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

export function TriggerCitySim() {
  const game = useSimGame(TOTAL_STAGES, () => {
    setAgeGateDone(false); setAuditStep(0); setBeaconOn(false);
    setViewMapped({ student: false, marks: false });
    setMirrorAnswers({}); setMatchAnswers({});
    setRowPrediction(""); setStmtPrediction(""); setOldNewAnswers({});
    setBossSlots({});
    setStormFired(false);
  });

  const [ageGateDone,    setAgeGateDone]    = useState(false);
  const [auditStep,      setAuditStep]      = useState(0);
  const [beaconOn,       setBeaconOn]       = useState(false);
  const [viewMapped,     setViewMapped]     = useState<{ student: boolean; marks: boolean }>({ student: false, marks: false });
  const [mirrorAnswers,  setMirrorAnswers]  = useState<Record<string, string>>({});
  const [matchAnswers,   setMatchAnswers]   = useState<Record<string, string>>({});
  const [rowPrediction,  setRowPrediction]  = useState("");
  const [stmtPrediction, setStmtPrediction] = useState("");
  const [oldNewAnswers,  setOldNewAnswers]  = useState<Record<string, string>>({});
  const [bossSlots,      setBossSlots]      = useState<Record<string, string>>({});
  const [stormFired, setStormFired] = useState(false);

  // ── Stage renderers ───────────────────────────────────────────────────────

  const renderStage1 = () => {
    const STUDENTS = [
      { name: "Raj",   age: 15, valid: false },
      { name: "Priya", age: 19, valid: true  },
      { name: "Tom",   age: 14, valid: false },
      { name: "Aisha", age: 21, valid: true  },
    ];
  
    return (
      <StageWrapper>
        <div className="text-center mb-6 max-w-md">
          <h2 className="text-2xl font-bold text-primary mb-2">🏙️ The Age Gate Crisis</h2>
          <p className="text-muted-foreground text-sm">
            Students are entering without age checks! Install a{" "}
            <code className="bg-muted px-1 rounded">BEFORE ROW</code> trigger
            to reject anyone under 17 before they get in.
          </p>
        </div>
  
        {/* Trigger code preview */}
        <div className="w-full max-w-md bg-muted rounded-2xl p-4 mb-5 font-mono text-xs space-y-1">
          <p className="text-muted-foreground">-- BEFORE ROW Trigger</p>
          <p><span className="text-blue-400">CREATE OR REPLACE TRIGGER</span> age_gate</p>
          <p><span className="text-yellow-400">BEFORE INSERT</span> <span className="text-blue-400">ON</span> STUDENT</p>
          <p><span className="text-yellow-400">FOR EACH ROW</span></p>
          <p><span className="text-blue-400">BEGIN</span></p>
          <p className="pl-4"><span className="text-blue-400">IF</span> :NEW.Age &lt; 17 <span className="text-blue-400">THEN</span></p>
          <p className="pl-8 text-red-400">RAISE_APPLICATION_ERROR(-20001, 'Underage!');
          </p>
          <p className="pl-4"><span className="text-blue-400">END IF;</span></p>
          <p><span className="text-blue-400">END;</span></p>
        </div>
  
        {/* Gate visualization */}
        <div className="w-full max-w-md space-y-2 mb-6">
          {STUDENTS.map(s => (
            <div key={s.name}
              className={`flex items-center gap-4 rounded-xl px-4 py-3 border text-sm transition-all
                ${ageGateDone
                  ? s.valid
                    ? "bg-green-500/10 border-green-500/40"
                    : "bg-red-500/10 border-red-500/40"
                  : "bg-muted border-border"}`}
            >
              <span className="text-lg">{s.valid ? "🧑" : "👦"}</span>
              <span className="font-bold">{s.name}</span>
              <span className="text-muted-foreground text-xs">Age: {s.age}</span>
              {ageGateDone && (
                <span className={`ml-auto font-bold text-xs ${s.valid ? "text-green-400" : "text-red-400"}`}>
                  {s.valid ? "✅ Allowed" : "🚫 Blocked"}
                </span>
              )}
            </div>
          ))}
        </div>
  
        {!ageGateDone ? (
          <button
            onClick={() => setAgeGateDone(true)}
            className="px-6 py-3 bg-primary text-primary-foreground font-bold rounded-xl"
          >
            ⚡ ACTIVATE BEFORE ROW TRIGGER
          </button>
        ) : (
          <div className="flex flex-col items-center gap-3 animate-in zoom-in">
            <p className="text-green-400 font-bold">🏆 Validation Guardian! Underage entries blocked!</p>
            <button
              onClick={() => { game.addXp(100, "🏆 Validation Guardian"); game.nextStage(); }}
              className="px-8 py-3 bg-primary text-primary-foreground font-bold rounded-xl"
            >
              Install Audit Shadow →
            </button>
          </div>
        )}
      </StageWrapper>
    );
  };

  const renderStage2 = () => {
    const EVENTS = [
      { op: "UPDATE", student: "Priya", oldVal: 78, newVal: 85 },
      { op: "DELETE", student: "Tom",   oldVal: 55, newVal: null },
      { op: "INSERT", student: "Zara",  oldVal: null, newVal: 90 },
    ];
  
    return (
      <StageWrapper>
        <div className="text-center mb-6 max-w-md">
          <h3 className="text-xl font-bold text-primary mb-1">👻 The Audit Shadow</h3>
          <p className="text-muted-foreground text-sm">
            An <code className="bg-muted px-1 rounded">AFTER ROW</code> trigger captures{" "}
            <span className="text-blue-400">:OLD</span> and{" "}
            <span className="text-green-400">:NEW</span> values after each change
            and writes them to the Audit vault.
          </p>
        </div>
  
        {/* Code */}
        <div className="w-full max-w-md bg-muted rounded-2xl p-4 mb-5 font-mono text-xs space-y-1">
          <p><span className="text-blue-400">CREATE OR REPLACE TRIGGER</span> audit_log</p>
          <p><span className="text-yellow-400">AFTER INSERT OR UPDATE OR DELETE</span></p>
          <p><span className="text-blue-400">ON</span> STUDENT <span className="text-yellow-400">FOR EACH ROW</span></p>
          <p><span className="text-blue-400">BEGIN</span></p>
          <p className="pl-4"><span className="text-blue-400">INSERT INTO</span> AUDIT VALUES(</p>
          <p className="pl-8 text-blue-400">:OLD.Marks, <span className="text-green-400">:NEW.Marks</span>, SYSDATE);</p>
          <p><span className="text-blue-400">END;</span></p>
        </div>
  
        {/* Event log */}
        <div className="w-full max-w-md space-y-3 mb-6">
          {EVENTS.map((e, i) => {
            const fired = auditStep > i;
            const active = auditStep === i;
            return (
              <div key={i}
                className={`rounded-xl px-4 py-3 border text-sm transition-all
                  ${fired ? "bg-green-500/10 border-green-500/30" : active ? "bg-primary/10 border-primary" : "bg-muted border-border opacity-40"}`}
              >
                <div className="flex items-center gap-3 mb-1">
                  <span className="font-bold font-mono text-xs">{e.op}</span>
                  <span>{e.student}</span>
                  {active && <span className="text-primary text-xs ml-auto animate-pulse">← Firing…</span>}
                  {fired && <span className="text-green-400 text-xs ml-auto">✅ Logged</span>}
                </div>
                {fired && (
                  <div className="flex gap-4 text-xs font-mono">
                    {e.oldVal !== null && <span className="text-blue-400">:OLD.Marks = {e.oldVal}</span>}
                    {e.newVal !== null && <span className="text-green-400">:NEW.Marks = {e.newVal}</span>}
                    {e.oldVal === null && <span className="text-muted-foreground">:OLD = NULL (INSERT)</span>}
                    {e.newVal === null && <span className="text-muted-foreground">:NEW = NULL (DELETE)</span>}
                  </div>
                )}
              </div>
            );
          })}
        </div>
  
        {auditStep < EVENTS.length ? (
          <button
            onClick={() => setAuditStep(s => s + 1)}
            className="px-6 py-3 bg-primary text-primary-foreground font-bold rounded-xl"
          >
            ▶ Fire Trigger #{auditStep + 1}
          </button>
        ) : (
          <div className="flex flex-col items-center gap-3 animate-in zoom-in">
            <p className="text-green-400 font-bold">🏆 Audit Master! All changes recorded in vault!</p>
            <button
              onClick={() => { game.addXp(150, "🏆 Audit Master"); game.nextStage(); }}
              className="px-8 py-3 bg-primary text-primary-foreground font-bold rounded-xl"
            >
              Face the Bulk Storm →
            </button>
          </div>
        )}
      </StageWrapper>
    );
  };

  const renderStage3 = () => {
  
    return (
      <StageWrapper>
        <div className="text-center mb-6 max-w-md">
          <h3 className="text-xl font-bold text-primary mb-1">⚡ The Bulk Storm</h3>
          <p className="text-muted-foreground text-sm">
            A ROW trigger fires for every row — 1000 rows = 1000 trigger calls. A{" "}
            <code className="bg-muted px-1 rounded">BEFORE STATEMENT</code> trigger
            fires just once per SQL command, no matter how many rows are affected.
          </p>
        </div>
  
        {/* Comparison table */}
        <div className="w-full max-w-md bg-muted rounded-2xl p-4 mb-5 text-xs">
          <div className="grid grid-cols-3 gap-2 font-bold text-muted-foreground mb-2 text-center">
            <span>Trigger Type</span><span>Rows Updated</span><span>Fires</span>
          </div>
          <div className="grid grid-cols-3 gap-2 text-center">
            <span className="text-red-400">ROW</span>
            <span>1000</span>
            <span className="text-red-400 font-bold">1000× 🔥</span>
          </div>
          <div className="grid grid-cols-3 gap-2 text-center mt-1">
            <span className="text-green-400">STATEMENT</span>
            <span>1000</span>
            <span className="text-green-400 font-bold">1× ✅</span>
          </div>
        </div>
  
        {/* Beacon toggle */}
        <div className="flex items-center gap-4 mb-6">
          <span className="text-sm font-bold text-muted-foreground">BEFORE STATEMENT Beacon:</span>
          <button
            onClick={() => setBeaconOn(v => !v)}
            className={`px-5 py-2 rounded-xl font-bold text-sm border transition-all
              ${beaconOn ? "bg-green-500/20 border-green-500 text-green-400" : "bg-border border-border text-muted-foreground"}`}
          >
            {beaconOn ? "🟢 INSTALLED" : "⚫ NOT INSTALLED"}
          </button>
        </div>
  
        {/* Storm simulation */}
        {beaconOn && !stormFired && (
          <button
            onClick={() => setStormFired(true)}
            className="px-6 py-3 bg-yellow-500 text-black font-bold rounded-xl mb-4 animate-pulse"
          >
            ⚡ SIMULATE BULK UPDATE (1000 rows)
          </button>
        )}
  
        {stormFired && (
          <div className="w-full max-w-md bg-muted rounded-2xl p-4 mb-5 space-y-2 animate-in fade-in text-sm">
            <p className="text-green-400 font-bold">✅ BEFORE STATEMENT → Fired 1× — "Bulk op started"</p>
            <p className="text-muted-foreground">…1000 rows updated…</p>
            <p className="text-blue-400">System load: <span className="font-bold">STABLE ✓</span></p>
          </div>
        )}
  
        {stormFired && (
          <button
            onClick={() => { game.addXp(120, "🏆 Efficiency Controller"); game.nextStage(); }}
            className="px-8 py-3 bg-primary text-primary-foreground font-bold rounded-xl animate-in zoom-in"
          >
            Fix the View Portal →
          </button>
        )}
  
        {!beaconOn && (
          <p className="text-xs text-muted-foreground mt-2">Install the beacon first to simulate the storm.</p>
        )}
      </StageWrapper>
    );
  };

  const renderStage4 = () => {
    const bothMapped = viewMapped.student && viewMapped.marks;
  
    return (
      <StageWrapper>
        <div className="text-center mb-6 max-w-md">
          <h3 className="text-xl font-bold text-primary mb-1">🌀 The Broken View Portal</h3>
          <p className="text-muted-foreground text-sm">
            Views can't be inserted into directly. An{" "}
            <code className="bg-muted px-1 rounded">INSTEAD OF</code> trigger
            intercepts the insert and routes each field to the correct underlying table.
          </p>
        </div>
  
        {/* Portal visualization */}
        <div className="w-full max-w-md bg-muted rounded-2xl p-4 mb-5 font-mono text-xs space-y-1">
          <p className="text-muted-foreground">-- View definition</p>
          <p><span className="text-blue-400">CREATE VIEW</span> STUDENT_MARKS_VIEW <span className="text-blue-400">AS</span></p>
          <p className="pl-4"><span className="text-blue-400">SELECT</span> s.Name, s.Dept, m.Marks</p>
          <p className="pl-4"><span className="text-blue-400">FROM</span> STUDENT s <span className="text-blue-400">JOIN</span> MARKS m ...</p>
        </div>
  
        {/* Mapping interface */}
        <p className="text-sm text-muted-foreground mb-4">Map view fields to their destination tables:</p>
        <div className="w-full max-w-md space-y-3 mb-6">
          {[
            { key: "student", label: "Name, Dept", dest: "→ STUDENT table", color: "text-blue-400" },
            { key: "marks",   label: "Marks",      dest: "→ MARKS table",   color: "text-green-400" },
          ].map(row => (
            <div key={row.key} className="flex items-center gap-3">
              <span className="font-mono text-xs w-24">{row.label}</span>
              <button
                onClick={() => setViewMapped(prev => ({ ...prev, [row.key]: true }))}
                className={`px-4 py-2 rounded-xl border text-xs font-bold transition-all
                  ${viewMapped[row.key as "student" | "marks"]
                    ? `bg-primary/20 border-primary ${row.color}`
                    : "border-border hover:border-primary"}`}
              >
                {viewMapped[row.key as "student" | "marks"] ? `✅ ${row.dest}` : `Route ${row.dest}`}
              </button>
            </div>
          ))}
        </div>
  
        {/* Code preview once both mapped */}
        {bothMapped && (
          <div className="w-full max-w-md bg-muted rounded-2xl p-4 mb-5 font-mono text-xs animate-in fade-in space-y-1">
            <p><span className="text-blue-400">CREATE OR REPLACE TRIGGER</span> view_insert</p>
            <p><span className="text-yellow-400">INSTEAD OF INSERT</span> <span className="text-blue-400">ON</span> STUDENT_MARKS_VIEW</p>
            <p><span className="text-blue-400">BEGIN</span></p>
            <p className="pl-4 text-blue-400">INSERT INTO STUDENT(Name, Dept) VALUES(:NEW.Name, :NEW.Dept);</p>
            <p className="pl-4 text-green-400">INSERT INTO MARKS(Marks) VALUES(:NEW.Marks);</p>
            <p><span className="text-blue-400">END;</span></p>
          </div>
        )}
  
        {bothMapped && (
          <button
            onClick={() => { game.addXp(200, "🏆 View Architect"); game.nextStage(); }}
            className="px-8 py-3 bg-primary text-primary-foreground font-bold rounded-xl animate-in zoom-in"
          >
            Enter the Time Mirror →
          </button>
        )}
      </StageWrapper>
    );
  };

  const renderStage5 = () => {
    const MIRROR_QUESTIONS = [
      { op: "INSERT", question: "On INSERT, which pseudorecord is NULL?", correct: "OLD", options: ["OLD", "NEW"] },
      { op: "DELETE", question: "On DELETE, which pseudorecord is NULL?", correct: "NEW", options: ["OLD", "NEW"] },
      { op: "UPDATE", question: "On UPDATE, both :OLD and :NEW are…",     correct: "available", options: ["available", "NULL"] },
    ];
  
    const allCorrect = MIRROR_QUESTIONS.every(q => mirrorAnswers[q.op] === q.correct);
  
    return (
      <StageWrapper>
        <div className="text-center mb-6 max-w-md">
          <h3 className="text-xl font-bold text-primary mb-1">🪞 The Time Mirror</h3>
          <p className="text-muted-foreground text-sm">
            <span className="text-blue-400">:OLD</span> holds what the row looked like before.{" "}
            <span className="text-green-400">:NEW</span> holds what it looks like after.
            Their availability depends on the operation type.
          </p>
        </div>
  
        {/* Mirror visual */}
        <div className="flex gap-6 mb-6 justify-center">
          <div className="flex flex-col items-center gap-1 p-4 bg-blue-500/10 border border-blue-500/30 rounded-2xl w-32">
            <span className="text-3xl">🪞</span>
            <span className="text-blue-400 font-bold text-sm">:OLD</span>
            <span className="text-xs text-muted-foreground text-center">Before the change</span>
          </div>
          <div className="flex flex-col items-center gap-1 p-4 bg-green-500/10 border border-green-500/30 rounded-2xl w-32">
            <span className="text-3xl">✨</span>
            <span className="text-green-400 font-bold text-sm">:NEW</span>
            <span className="text-xs text-muted-foreground text-center">After the change</span>
          </div>
        </div>
  
        {/* Quiz questions */}
        <div className="w-full max-w-md space-y-4 mb-6">
          {MIRROR_QUESTIONS.map(q => (
            <div key={q.op} className="bg-muted rounded-2xl p-4">
              <p className="text-sm font-bold mb-3">{q.question}</p>
              <div className="flex gap-3">
                {q.options.map(opt => (
                  <button
                    key={opt}
                    onClick={() => setMirrorAnswers(prev => ({ ...prev, [q.op]: opt }))}
                    className={`px-4 py-2 rounded-xl border text-xs font-mono transition-all
                      ${mirrorAnswers[q.op] === opt
                        ? opt === q.correct
                          ? "bg-green-500/20 border-green-500 text-green-400"
                          : "bg-red-500/20 border-red-500 text-red-400"
                        : "border-border hover:border-primary"}`}
                  >
                    :{opt.toUpperCase()}
                  </button>
                ))}
              </div>
              {mirrorAnswers[q.op] && (
                <p className="text-xs mt-2">
                  {mirrorAnswers[q.op] === q.correct
                    ? <span className="text-green-400">✅ Correct!</span>
                    : <span className="text-red-400">❌ Try again</span>}
                </p>
              )}
            </div>
          ))}
        </div>
  
        {allCorrect && (
          <button
            onClick={() => { game.addXp(150, "🏆 Time Traveler"); game.nextStage(); }}
            className="px-8 py-3 bg-primary text-primary-foreground font-bold rounded-xl animate-in zoom-in"
          >
            Mini Challenges →
          </button>
        )}
      </StageWrapper>
    );
  };

  const renderStage6 = () => {
    const MATCH_PAIRS = [
      { concept: "BEFORE ROW",   answer: "Validation"    },
      { concept: "AFTER ROW",    answer: "Logging"       },
      { concept: "STATEMENT",    answer: "Bulk action"   },
      { concept: "INSTEAD OF",   answer: "View handling" },
    ];
    const MATCH_OPTIONS = ["Validation", "Logging", "Bulk action", "View handling"];
  
    const allMatched  = MATCH_PAIRS.every(p => matchAnswers[p.concept] === p.answer);
    const rowCorrect  = rowPrediction === "50";
    const stmtCorrect = stmtPrediction === "1";
  
    const OLD_NEW_Q = [
      { op: "INSERT", correct: "NEW"  },
      { op: "UPDATE", correct: "BOTH" },
      { op: "DELETE", correct: "OLD"  },
    ];
    const oldNewCorrect = OLD_NEW_Q.every(q => oldNewAnswers[q.op] === q.correct);
    const allDone = allMatched && rowCorrect && stmtCorrect && oldNewCorrect;
  
    return (
      <StageWrapper>
        <h3 className="text-xl font-bold text-primary mb-6">🧠 Mini Challenges</h3>
  
        {/* Challenge 1: Match */}
        <div className="w-full max-w-lg mb-8">
          <p className="text-sm font-bold mb-3 text-muted-foreground">Challenge 1 — Match Trigger Type to Use Case</p>
          <div className="space-y-3">
            {MATCH_PAIRS.map(pair => (
              <div key={pair.concept} className="flex items-center gap-3 flex-wrap">
                <span className="font-mono text-xs w-32">{pair.concept}</span>
                <select
                  value={matchAnswers[pair.concept] ?? ""}
                  onChange={e => setMatchAnswers(prev => ({ ...prev, [pair.concept]: e.target.value }))}
                  className={`px-3 py-1 rounded-lg border text-xs bg-muted
                    ${matchAnswers[pair.concept] === pair.answer ? "border-green-500 text-green-400" : "border-border"}`}
                >
                  <option value="">-- select --</option>
                  {MATCH_OPTIONS.map(o => <option key={o} value={o}>{o}</option>)}
                </select>
                {matchAnswers[pair.concept] && (
                  <span className="text-xs">{matchAnswers[pair.concept] === pair.answer ? "✅" : "❌"}</span>
                )}
              </div>
            ))}
          </div>
        </div>
  
        {/* Challenge 2: Predict counts */}
        <div className="w-full max-w-lg mb-8">
          <p className="text-sm font-bold mb-3 text-muted-foreground">Challenge 2 — Predict Trigger Fires</p>
          <p className="text-xs text-muted-foreground mb-3">
            Scenario: <span className="text-primary font-bold">UPDATE 50 rows</span>
          </p>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono w-44">ROW trigger fires how many times?</span>
              <input
                value={rowPrediction}
                onChange={e => setRowPrediction(e.target.value)}
                placeholder="?"
                className={`w-20 px-3 py-1 rounded-lg border text-xs bg-muted font-mono
                  ${rowPrediction ? (rowCorrect ? "border-green-500 text-green-400" : "border-red-500 text-red-400") : "border-border"}`}
              />
              {rowPrediction && <span className="text-xs">{rowCorrect ? "✅" : "❌ Hint: one per row"}</span>}
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono w-44">STATEMENT trigger fires how many times?</span>
              <input
                value={stmtPrediction}
                onChange={e => setStmtPrediction(e.target.value)}
                placeholder="?"
                className={`w-20 px-3 py-1 rounded-lg border text-xs bg-muted font-mono
                  ${stmtPrediction ? (stmtCorrect ? "border-green-500 text-green-400" : "border-red-500 text-red-400") : "border-border"}`}
              />
              {stmtPrediction && <span className="text-xs">{stmtCorrect ? "✅" : "❌ Hint: once per command"}</span>}
            </div>
          </div>
        </div>
  
        {/* Challenge 3: :OLD / :NEW availability */}
        <div className="w-full max-w-lg mb-8">
          <p className="text-sm font-bold mb-3 text-muted-foreground">Challenge 3 — Which pseudorecord is available?</p>
          <div className="space-y-3">
            {OLD_NEW_Q.map(q => (
              <div key={q.op} className="flex items-center gap-3 flex-wrap">
                <span className="font-mono text-xs w-16 font-bold">{q.op}</span>
                {["OLD", "NEW", "BOTH"].map(opt => (
                  <button
                    key={opt}
                    onClick={() => setOldNewAnswers(prev => ({ ...prev, [q.op]: opt }))}
                    className={`px-3 py-1 rounded-lg border text-xs transition-all
                      ${oldNewAnswers[q.op] === opt
                        ? opt === q.correct
                          ? "bg-green-500/20 border-green-500 text-green-400"
                          : "bg-red-500/20 border-red-500 text-red-400"
                        : "border-border hover:border-primary"}`}
                  >
                    :{opt}
                  </button>
                ))}
                {oldNewAnswers[q.op] && (
                  <span className="text-xs">{oldNewAnswers[q.op] === q.correct ? "✅" : "❌"}</span>
                )}
              </div>
            ))}
          </div>
        </div>
  
        {allDone && (
          <button
            onClick={() => { game.addXp(200, "🧠 Challenge Champion"); game.nextStage(); }}
            className="px-8 py-3 bg-primary text-primary-foreground font-bold rounded-xl animate-in zoom-in"
          >
            Final Boss →
          </button>
        )}
      </StageWrapper>
    );
  };

  const renderStage7 = () => {
    const SLOTS = [
      { id: "age",    label: "City Gate (INSERT on STUDENT)",  correct: "BEFORE ROW",      color: "text-red-400"    },
      { id: "audit",  label: "History Room (UPDATE/DELETE)",   correct: "AFTER ROW",       color: "text-blue-400"   },
      { id: "bulk",   label: "Control Tower (Bulk UPDATE)",    correct: "BEFORE STATEMENT", color: "text-yellow-400" },
      { id: "view",   label: "View Portal (INSERT on VIEW)",   correct: "INSTEAD OF",      color: "text-purple-400" },
    ];
    const OPTIONS = ["BEFORE ROW", "AFTER ROW", "BEFORE STATEMENT", "INSTEAD OF"];
    const allCorrect = SLOTS.every(s => bossSlots[s.id] === s.correct);
  
    return (
      <StageWrapper>
        <div className="text-center mb-6 max-w-md">
          <h3 className="text-xl font-bold text-primary mb-1">💥 Restore Trigger City</h3>
          <p className="text-muted-foreground text-sm">
            Assign the correct trigger type to each location in the city to restore order.
          </p>
        </div>
  
        <div className="w-full max-w-lg space-y-4 mb-6">
          {SLOTS.map(slot => (
            <div key={slot.id}
              className={`rounded-xl px-4 py-3 border transition-all
                ${bossSlots[slot.id] === slot.correct
                  ? "bg-green-500/10 border-green-500/40"
                  : bossSlots[slot.id]
                    ? "bg-red-500/10 border-red-500/40"
                    : "bg-muted border-border"}`}
            >
              <p className={`text-xs font-bold mb-2 ${slot.color}`}>{slot.label}</p>
              <div className="flex flex-wrap gap-2">
                {OPTIONS.map(opt => (
                  <button
                    key={opt}
                    onClick={() => setBossSlots(prev => ({ ...prev, [slot.id]: opt }))}
                    className={`px-3 py-1 rounded-lg border text-xs font-mono transition-all
                      ${bossSlots[slot.id] === opt
                        ? opt === slot.correct
                          ? "bg-green-500/20 border-green-500 text-green-400"
                          : "bg-red-500/20 border-red-500 text-red-400"
                        : "border-border hover:border-primary"}`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
              {bossSlots[slot.id] && (
                <p className="text-xs mt-1">
                  {bossSlots[slot.id] === slot.correct
                    ? <span className="text-green-400">✅ Correct trigger installed!</span>
                    : <span className="text-red-400">❌ Wrong type — reconsider</span>}
                </p>
              )}
            </div>
          ))}
        </div>
  
        {allCorrect && (
          <div className="flex flex-col items-center gap-3 animate-in zoom-in">
            <p className="text-yellow-400 font-bold text-lg">🌆 Trigger City Restored! Perfect order!</p>
            <button
              onClick={() => { game.addXp(300, "👑 City Guardian"); game.nextStage(); }}
              className="px-8 py-3 bg-primary text-primary-foreground font-bold rounded-xl"
            >
              Claim the Guardian Crown →
            </button>
          </div>
        )}
      </StageWrapper>
    );
  };

  const renderStage8 = () => (
    <CompletionScreen
      missionTitle="Trigger City Restored! 🌆"
      missionSubtitle="You installed guardians, logged history, tamed bulk storms, and fixed broken portals."
      xp={game.xp}
      xpLog={game.xpLog}
      achievements={[
        { icon: <span>🏆</span>, label: "Validation Guardian"   },
        { icon: <span>👻</span>, label: "Audit Master"           },
        { icon: <span>⚡</span>, label: "Efficiency Controller"  },
        { icon: <span>🌀</span>, label: "View Architect"         },
        { icon: <span>🪞</span>, label: "Time Traveler"          },
        { icon: <span>👑</span>, label: "City Guardian"          },
      ]}
      concepts={[
        { label: "BEFORE vs AFTER",   description: "BEFORE triggers run before the DML — ideal for validation. AFTER triggers run after — ideal for logging." },
        { label: "ROW vs STATEMENT",  description: "ROW triggers fire once per affected row. STATEMENT triggers fire once per SQL command regardless of row count." },
        { label: ":OLD and :NEW",     description: ":OLD holds pre-change values; :NEW holds post-change values. INSERT has no :OLD; DELETE has no :NEW." },
        { label: "INSTEAD OF",        description: "Fires in place of the DML on a view, routing inserts/updates to the correct underlying tables." },
        { label: "Real-world use",    description: "Triggers automate validation, auditing, and complex business rules without changing application code." },
      ]}
      onReset={game.reset}
    />
  );

  // ── Render ────────────────────────────────────────────────────────────────
  return (
    <SimShell
      title="Trigger City"
      subtitle="The Database Guardian Mission"
      xp={game.xp}
      stage={game.stage}
      totalStages={TOTAL_STAGES}
      mistakeMessage={game.mistakeMessage}
      successMessage={game.successMessage}
      icon={<span className="text-primary text-lg">⚡</span>}
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