
import { useState } from "react";
import { Shield, Clock, Zap, AlertTriangle, Database, Swords, Crown } from "lucide-react";
import {
  useSimGame,
  SimShell,
  StageWrapper,
  QuizBlock,
  CompletionScreen,
} from "@/components/simulations/shared";

// ── Constants ─────────────────────────────────────────────────────────────────
const TOTAL_STAGES = 8; 
export function PLSQLQuestSim() {
  const game = useSimGame(TOTAL_STAGES, () => {
    setBlockOrder([]);
    setVarTasks({ name: false, rollno: false, marks: false });
    setCursorStep("idle");
    setExceptionAdded(false);
    setWrongException(false);
    setTxStep("idle");
    setSavepointSet(false);
    setTxDecision(null);
    setQuizAnswer(null);
  });

  // Stage 2 – Block builder
  const BLOCK_PIECES = ["DECLARE", "BEGIN", "EXCEPTION", "END;"];
  const [blockOrder, setBlockOrder] = useState<string[]>([]);

  // Stage 3 – Variable forge
  const [varTasks, setVarTasks] = useState({
    name: false, rollno: false, marks: false,
  });

  // Stage 4 – Cursor
  const [cursorStep, setCursorStep] = useState<"idle" | "open" | "fetch" | "close">("idle");
  const CURSOR_ROWS = [
    { roll: "R001", name: "Aria",  marks: 72 },
    { roll: "R002", name: "Bren",  marks: 45 },
    { roll: "R003", name: "Cleo",  marks: 88 },
    { roll: "R004", name: "Dex",   marks: 55 },
    { roll: "R005", name: "Evan",  marks: 91 },
  ];

  // Stage 5 – Exception handling
  const [exceptionAdded, setExceptionAdded] = useState(false);
  const [wrongException, setWrongException] = useState(false);

  // Stage 6 – Transactions
  const [txStep, setTxStep]       = useState<"idle" | "inserted" | "savepoint" | "updated">("idle");
  const [savepointSet, setSavepointSet] = useState(false);
  const [txDecision, setTxDecision] = useState<"commit" | "rollback" | null>(null);

  // Stage 7 – Quiz
  const [quizAnswer, setQuizAnswer] = useState<string | null>(null);

  const renderStage1 = () => (
    <StageWrapper>
      <div className="text-center mb-8 max-w-xl">
        <h2 className="text-3xl font-bold text-primary mb-2">
          ⚔️ PL/SQL Quest: The Database Time Heist
        </h2>
        <p className="text-muted-foreground text-base leading-relaxed">
          You are a <strong>Data Guardian Agent</strong> inside <strong>ORACLE-X</strong>,
          a futuristic database city. A rogue AI named <strong className="text-destructive">NULL.exe</strong> has
          corrupted the system — deleting records, breaking transactions, and causing data collapse.
          Master PL/SQL to restore order.
        </p>
      </div>

      {/* District status tiles */}
      <div className="grid grid-cols-2 gap-3 mb-8 w-full max-w-sm">
        {[
          { icon: "🧱", label: "Code Chamber",     status: "CORRUPTED" },
          { icon: "⚗️", label: "Variable Forge",   status: "OFFLINE" },
          { icon: "🚇", label: "Cursor Tunnel",    status: "JAMMED" },
          { icon: "⏳", label: "Transaction Arena", status: "UNSTABLE" },
        ].map(d => (
          <div key={d.label}
            className="flex flex-col items-center p-3 rounded-xl border border-destructive/30 bg-destructive/5"
          >
            <span className="text-2xl mb-1">{d.icon}</span>
            <span className="text-xs font-semibold text-muted-foreground">{d.label}</span>
            <span className="text-xs text-destructive font-mono mt-1">⚠ {d.status}</span>
          </div>
        ))}
      </div>

      <button
        onClick={() => { game.addXp(50, "🌆 Guardian Deployed"); game.nextStage(); }}
        className="px-8 py-3 bg-primary text-primary-foreground font-bold rounded-xl flex items-center gap-2"
      >
        <Swords className="size-5" /> Enter ORACLE-X
      </button>
    </StageWrapper>
  );

  const isCorrectNext = (piece: string) =>
    piece === BLOCK_PIECES[blockOrder.length];

  const blockComplete = blockOrder.length === BLOCK_PIECES.length;

  const renderStage2 = () => (
    <StageWrapper>
      <h3 className="text-xl font-bold text-primary mb-1">🧱 Code Chamber</h3>
      <p className="text-muted-foreground text-sm mb-6">
        Every PL/SQL program must follow this exact structure. Assemble the block in the correct order.
      </p>

      {/* Drop zone — shows placed pieces */}
      <div className="w-full max-w-xs bg-slate-900 rounded-xl p-4 font-mono text-sm mb-6 min-h-32">
        {blockOrder.length === 0 && (
          <span className="text-slate-600 text-xs">-- click pieces below in order</span>
        )}
        {blockOrder.map((piece, i) => (
          <div key={i} className={`
            ${piece === "DECLARE"   ? "text-blue-400" :
              piece === "BEGIN"     ? "text-green-400" :
              piece === "EXCEPTION" ? "text-red-400" :
                                      "text-yellow-400"}
            ${i === blockOrder.length - 1 ? "animate-in fade-in slide-in-from-bottom-2" : ""}
          `}>
            {piece}
          </div>
        ))}
      </div>

      {/* Pieces to click */}
      <div className="flex flex-wrap gap-2 justify-center mb-6">
        {BLOCK_PIECES.map(piece => {
          const placed = blockOrder.includes(piece);
          return (
            <button
              key={piece}
              disabled={placed}
              onClick={() => {
                if (isCorrectNext(piece)) {
                  setBlockOrder(o => [...o, piece]);
                } else {
                  // Wrong order — flash error then reset
                  game.showMistake?.("⚡ Wrong order! Structure collapsed — try again.");
                  setBlockOrder([]);
                }
              }}
              className={`px-4 py-2 rounded-lg font-mono text-sm border transition-all
                ${placed
                  ? "opacity-20 cursor-default border-border text-muted-foreground"
                  : piece === "DECLARE"   ? "border-blue-500 text-blue-400 hover:bg-blue-500/10 cursor-pointer" :
                    piece === "BEGIN"     ? "border-green-500 text-green-400 hover:bg-green-500/10 cursor-pointer" :
                    piece === "EXCEPTION" ? "border-red-500 text-red-400 hover:bg-red-500/10 cursor-pointer" :
                                           "border-yellow-500 text-yellow-400 hover:bg-yellow-500/10 cursor-pointer"}`}
            >
              {piece}
            </button>
          );
        })}
      </div>

      {blockComplete && (
        <>
          <div className="text-green-400 font-bold text-sm mb-3">✅ Structure Stabilized!</div>
          <button
            onClick={() => { game.addXp(100, "🧱 Block Architect"); game.nextStage(); }}
            className="px-8 py-3 bg-primary text-primary-foreground font-bold rounded-xl"
          >
            Enter Variable Forge →
          </button>
        </>
      )}
    </StageWrapper>
  );

  const VARIABLES = [
    {
      key: "name",
      varName: "v_name",
      correct: "VARCHAR2(50)",
      wrong: ["NUMBER", "DATE"],
      hint: "Stores a student's name — text data",
    },
    {
      key: "rollno",
      varName: "v_roll_no",
      correct: "NUMBER",
      wrong: ["VARCHAR2(50)", "DATE"],
      hint: "Stores a roll number — numeric",
    },
    {
      key: "marks",
      varName: "v_marks",
      correct: "NUMBER",
      wrong: ["VARCHAR2(50)", "DATE"],
      hint: "Stores exam marks — numeric",
    },
  ];

  const allVarsDone = Object.values(varTasks).every(Boolean);

  const renderStage3 = () => (
    <StageWrapper>
      <h3 className="text-xl font-bold text-primary mb-1">⚗️ Variable Forge</h3>
      <p className="text-muted-foreground text-sm mb-6">
        Variables store temporary data inside a PL/SQL block. Choose the wrong type and the capsule explodes.
      </p>

      <div className="space-y-4 w-full max-w-md mb-6">
        {VARIABLES.map(({ key, varName, correct, wrong, hint }) => {
          const done = varTasks[key as keyof typeof varTasks];
          const allOptions = [correct, ...wrong].sort(() => Math.random() - 0.5); // shuffle once

          return (
            <div key={key}
              className={`p-4 rounded-xl border transition-all
                ${done ? "border-green-500/40 bg-green-500/5" : "border-border"}`}
            >
              <div className="flex items-center justify-between mb-2">
                <code className="font-mono text-sm text-primary">{varName}</code>
                <span className="text-xs text-muted-foreground">{hint}</span>
              </div>

              {done ? (
                <div className="font-mono text-xs text-green-400">
                  ✓ {varName} {correct};
                </div>
              ) : (
                <div className="flex gap-2 flex-wrap">
                  {[correct, wrong[0], wrong[1]].map(opt => (
                    <button
                      key={opt}
                      onClick={() => {
                        if (opt === correct) {
                          setVarTasks(v => ({ ...v, [key]: true }));
                        } else {
                          game.showMistake?.(`💥 Wrong type! ${opt} doesn't fit ${varName}.`);
                        }
                      }}
                      className="px-3 py-1 text-xs font-mono rounded-lg border border-border
                                 hover:border-primary hover:text-primary transition-all cursor-pointer"
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {allVarsDone && (
        <button
          onClick={() => { game.addXp(150, "⚗️ Data Smith"); game.nextStage(); }}
          className="px-8 py-3 bg-primary text-primary-foreground font-bold rounded-xl"
        >
          Enter Cursor Tunnel →
        </button>
      )}
    </StageWrapper>
  );

  const STEPS: Array<typeof cursorStep> = ["open", "fetch", "close"];
  const cursorDone = cursorStep === "close";
  const fetchedRows = cursorStep === "fetch" || cursorStep === "close"
    ? CURSOR_ROWS.filter(r => r.marks >= 60)
    : [];

  const renderStage4 = () => (
    <StageWrapper>
      <h3 className="text-xl font-bold text-primary mb-1">🚇 Cursor Tunnel</h3>
      <p className="text-muted-foreground text-sm mb-6">
        A cursor scans rows one by one — like a robotic arm on a conveyor belt.
        Only students with Marks ≥ 60 pass through.
      </p>

      {/* Conveyor belt visual */}
      <div className="flex gap-2 mb-6 overflow-x-auto pb-1">
        {CURSOR_ROWS.map(row => (
          <div key={row.roll}
            className={`flex flex-col items-center p-2 rounded-lg border text-xs font-mono min-w-14 transition-all duration-500
              ${cursorStep === "open"
                ? "border-yellow-500/50 bg-yellow-500/5 animate-pulse"
                : cursorStep !== "idle" && row.marks >= 60
                  ? "border-green-500/40 bg-green-500/5"
                  : cursorStep !== "idle" && row.marks < 60
                    ? "opacity-20 border-border"
                    : "border-border"}`}
          >
            <span className="text-muted-foreground">{row.roll}</span>
            <span className="text-primary font-bold">{row.name}</span>
            <span className={row.marks >= 60 ? "text-green-400" : "text-red-400"}>
              {row.marks}
            </span>
          </div>
        ))}
      </div>

      {/* Fetched rows table */}
      {fetchedRows.length > 0 && (
        <div className="w-full max-w-xs bg-slate-900 rounded-xl p-3 mb-6">
          <div className="text-xs text-muted-foreground mb-2 font-mono">-- FETCHED ROWS (Marks ≥ 60)</div>
          {fetchedRows.map(row => (
            <div key={row.roll} className="font-mono text-xs text-green-300 flex gap-4">
              <span>{row.roll}</span>
              <span>{row.name}</span>
              <span>{row.marks}</span>
            </div>
          ))}
        </div>
      )}

      {/* Step buttons */}
      <div className="flex gap-3 mb-6">
        {[
          { step: "open",  label: "OPEN Cursor",  color: "bg-yellow-500 text-black" },
          { step: "fetch", label: "FETCH Rows",   color: "bg-blue-500 text-white" },
          { step: "close", label: "CLOSE Cursor", color: "bg-slate-600 text-white" },
        ].map(({ step, label, color }) => {
          const isNext = STEPS[STEPS.indexOf(cursorStep as any) + 1] === step
                      || (cursorStep === "idle" && step === "open");
          const isDone = STEPS.indexOf(step as any) < STEPS.indexOf(cursorStep as any)
                      || cursorStep === step;
          return (
            <button
              key={step}
              disabled={!isNext && !isDone}
              onClick={() => isNext && setCursorStep(step as typeof cursorStep)}
              className={`px-4 py-2 text-sm font-bold rounded-xl transition-all
                ${isDone ? "opacity-40 cursor-default bg-slate-700 text-slate-300" :
                  isNext ? `${color} cursor-pointer hover:opacity-90` :
                  "opacity-20 cursor-default border border-border text-muted-foreground"}`}
            >
              {isDone ? "✓ " : ""}{label}
            </button>
          );
        })}
      </div>

      {cursorDone && (
        <button
          onClick={() => { game.addXp(200, "🚇 Cursor Commander"); game.nextStage(); }}
          className="px-8 py-3 bg-primary text-primary-foreground font-bold rounded-xl"
        >
          🎯 First-Class Students Identified →
        </button>
      )}
    </StageWrapper>
  );

  const renderStage5 = () => (
    <StageWrapper>
      <h3 className="text-xl font-bold text-primary mb-1">⚠️ Missing Data Trap</h3>
      <p className="text-muted-foreground text-sm mb-6">
        When a query finds no rows, the system throws NO_DATA_FOUND.
        Handle it — or ORACLE-X crashes.
      </p>

      {/* Flickering query result */}
      <div className={`w-full max-w-sm bg-slate-900 rounded-xl p-4 font-mono text-sm mb-6
        ${!exceptionAdded ? "animate-pulse border border-destructive/40" : "border border-green-500/40"}`}
      >
        <div className="text-blue-400">SELECT</div>
        <div className="ml-4 text-white">v_marks INTO v_marks</div>
        <div className="text-blue-400">FROM</div>
        <div className="ml-4 text-white">STUDENT</div>
        <div className="text-blue-400">WHERE</div>
        <div className="ml-4 text-white">Roll_No = 'R999'; -- doesn't exist</div>
        <br />
        {!exceptionAdded ? (
          <div className="text-destructive text-xs">
            ❌ ORA-01403: NO_DATA_FOUND — UNHANDLED
          </div>
        ) : (
          <>
            <div className="text-red-400">EXCEPTION</div>
            <div className="ml-4 text-yellow-300">WHEN NO_DATA_FOUND THEN</div>
            <div className="ml-8 text-green-300">
              DBMS_OUTPUT.PUT_LINE('Student not found');
            </div>
            <div className="text-blue-400">END;</div>
          </>
        )}
      </div>

      {/* Error ghost visual */}
      {!exceptionAdded && (
        <div className="text-4xl mb-4 animate-bounce">👻</div>
      )}
      {!exceptionAdded && (
        <p className="text-xs text-destructive font-mono mb-6">
          NULL.exe: "No handler found... CRASHING SYSTEM..."
        </p>
      )}

      {/* Exception options */}
      {!exceptionAdded && (
        <div className="flex flex-col gap-2 w-full max-w-xs">
          <p className="text-xs text-muted-foreground text-center mb-1">
            Add the correct EXCEPTION handler:
          </p>
          {[
            { label: "WHEN NO_DATA_FOUND THEN ...", value: "correct" },
            { label: "WHEN TOO_MANY_ROWS THEN ...", value: "wrong1" },
            { label: "IGNORE the error",             value: "wrong2" },
          ].map(opt => (
            <button
              key={opt.value}
              onClick={() => {
                if (opt.value === "correct") {
                  setExceptionAdded(true);
                } else {
                  setWrongException(true);
                  game.showMistake?.("❌ Wrong handler — NULL.exe grows stronger!");
                }
              }}
              className={`px-4 py-2 text-sm font-mono rounded-lg border transition-all cursor-pointer
                ${wrongException && opt.value !== "correct"
                  ? "border-destructive/40 text-destructive/60"
                  : "border-border hover:border-primary hover:text-primary"}`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      )}

      {exceptionAdded && (
        <>
          <div className="text-green-400 font-bold text-sm mb-3">🛡️ Error Shield Activated!</div>
          <button
            onClick={() => { game.addXp(250, "🛡️ Exception Slayer"); game.nextStage(); }}
            className="px-8 py-3 bg-primary text-primary-foreground font-bold rounded-xl"
          >
            Enter Transaction Arena →
          </button>
        </>
      )}
    </StageWrapper>
  );

  const TX_STEPS = [
    { key: "inserted",  action: "INSERT new student (R006, Nova, 70)",  btn: "INSERT",    color: "bg-blue-500 text-white" },
    { key: "savepoint", action: "SAVEPOINT sp1 — checkpoint set ✓",     btn: "SAVEPOINT", color: "bg-yellow-500 text-black" },
    { key: "updated",   action: "UPDATE marks SET marks = 0 — WRONG!",  btn: "UPDATE",    color: "bg-red-500 text-white" },
  ];

  const stepIndex = TX_STEPS.findIndex(s => s.key === txStep);

  const renderStage6 = () => (
    <StageWrapper>
      <h3 className="text-xl font-bold text-primary mb-1">⏳ Transaction Control Arena</h3>
      <p className="text-muted-foreground text-sm mb-6">
        Transactions control time in the database. COMMIT seals fate. ROLLBACK rewinds mistakes.
        SAVEPOINT creates checkpoints.
      </p>

      {/* Timeline bar */}
      <div className="w-full max-w-md mb-6">
        <div className="flex items-center gap-1 mb-3">
          {TX_STEPS.map((s, i) => (
            <div key={s.key} className="flex items-center gap-1 flex-1">
              <div className={`h-2 rounded-full flex-1 transition-all duration-500
                ${stepIndex >= i ? "bg-primary" : "bg-slate-700"}`}
              />
              {i < TX_STEPS.length - 1 && (
                <div className={`w-1 h-1 rounded-full ${stepIndex > i ? "bg-primary" : "bg-slate-700"}`} />
              )}
            </div>
          ))}
        </div>
        <div className="space-y-1">
          {TX_STEPS.map((s, i) => (
            <div key={s.key}
              className={`text-xs font-mono transition-all duration-300
                ${stepIndex >= i
                  ? s.key === "updated" ? "text-destructive" : "text-green-400"
                  : "text-slate-600"}`}
            >
              {stepIndex >= i ? "✓" : "○"} {s.action}
            </div>
          ))}
        </div>
      </div>

      {/* Step buttons */}
      {txDecision === null && (
        <div className="flex gap-3 flex-wrap justify-center mb-6">
          {TX_STEPS.map((s, i) => {
            const isNext = i === stepIndex + 1 || (txStep === "idle" && i === 0);
            const isDone = stepIndex >= i;
            return (
              <button
                key={s.key}
                disabled={!isNext}
                onClick={() => setTxStep(s.key as typeof txStep)}
                className={`px-5 py-2 text-sm font-bold rounded-xl transition-all
                  ${isDone ? `opacity-40 cursor-default ${s.color}` :
                    isNext ? `${s.color} cursor-pointer hover:opacity-90` :
                    "opacity-20 cursor-default border border-border text-muted-foreground"}`}
              >
                {isDone ? "✓ " : ""}{s.btn}
              </button>
            );
          })}
        </div>
      )}

      {/* Decision point after wrong UPDATE */}
      {txStep === "updated" && txDecision === null && (
        <>
          <p className="text-sm text-destructive font-bold mb-3 animate-pulse">
            ⚠ Wrong marks entered! What do you do?
          </p>
          <div className="flex gap-3">
            <button
              onClick={() => {
                setTxDecision("rollback");
              }}
              className="px-5 py-2 bg-green-500 text-black font-bold rounded-xl hover:opacity-90"
            >
              ROLLBACK to sp1
            </button>
            <button
              onClick={() => {
                setTxDecision("commit");
                game.showMistake?.("💥 COMMIT locked the wrong data permanently! Use ROLLBACK for mistakes.");
              }}
              className="px-5 py-2 bg-destructive text-white font-bold rounded-xl hover:opacity-90"
            >
              COMMIT
            </button>
          </div>
        </>
      )}

      {/* Result panels */}
      {txDecision === "rollback" && (
        <div className="text-green-400 text-sm font-bold mb-4 mt-2">
          ⏪ Rolled back to SAVEPOINT — marks restored to 70 ✓
        </div>
      )}
      {txDecision === "commit" && (
        <div className="text-destructive text-sm font-bold mb-4 mt-2">
          🔒 COMMIT sealed wrong data! Now try ROLLBACK...
          <button
            onClick={() => setTxDecision("rollback")}
            className="ml-3 px-3 py-1 text-xs bg-green-500 text-black rounded-lg font-bold"
          >
            ROLLBACK
          </button>
        </div>
      )}

      {txDecision === "rollback" && (
        <button
          onClick={() => { game.addXp(300, "⏳ Time Controller"); game.nextStage(); }}
          className="px-8 py-3 bg-primary text-primary-foreground font-bold rounded-xl mt-2"
        >
          Timeline Secured ✅ →
        </button>
      )}
    </StageWrapper>
  );

  const renderStage7 = () => (
    <StageWrapper>
      <h3 className="text-xl font-bold text-primary mb-6">🧠 Final Knowledge Check</h3>

      <div className="w-full max-w-md space-y-4 mb-8">
        <QuizBlock
          question="What happens if FETCH is called but the cursor is not OPENed first?"
          options={[
            { label: "Cursor auto-opens and fetches",     value: "a" },
            { label: "No data is retrieved — error occurs", value: "b" },
            { label: "NULL values are returned",           value: "c" },
          ]}
          correctValue="b"
          selectedValue={quizAnswer}
          onSelect={setQuizAnswer}
          correctFeedback="✅ Correct! A cursor must be OPENed before FETCH — skipping it raises an INVALID_CURSOR exception."
          wrongFeedback="❌ Hint: A cursor is like a scanner — you must power it ON before it can scan anything."
        />
      </div>

      {quizAnswer === "b" && (
        <button
          onClick={() => { game.addXp(150, "🧠 PL/SQL Scholar"); game.nextStage(); }}
          className="px-8 py-3 bg-primary text-primary-foreground font-bold rounded-xl animate-in zoom-in"
        >
          View Mission Results →
        </button>
      )}
    </StageWrapper>
  );

  const renderStage8 = () => (
    <CompletionScreen
      missionTitle="ORACLE-X Restored! 👑"
      missionSubtitle="You defeated NULL.exe and restored database integrity using PL/SQL."
      xp={game.xp}
      xpLog={game.xpLog}
      achievements={[
        { icon: <Database className="size-4" />,      label: "Block Architect" },
        { icon: <Zap className="size-4" />,           label: "Data Smith" },
        { icon: <Shield className="size-4" />,        label: "Cursor Commander" },
        { icon: <AlertTriangle className="size-4" />, label: "Exception Slayer" },
        { icon: <Clock className="size-4" />,         label: "Time Controller" },
        { icon: <Crown className="size-4" />,         label: "PL/SQL Scholar" },
      ]}
      concepts={[
        { label: "PL/SQL Block Structure",  description: "Every block follows DECLARE → BEGIN → EXCEPTION → END." },
        { label: "Variables",               description: "Typed placeholders declared in the DECLARE section." },
        { label: "Cursors",                 description: "OPEN, FETCH, and CLOSE to process rows one at a time." },
        { label: "Exception Handling",      description: "WHEN NO_DATA_FOUND catches missing-row errors gracefully." },
        { label: "Transactions",            description: "SAVEPOINT creates checkpoints; ROLLBACK undoes; COMMIT seals." },
      ]}
      onReset={game.reset}
    />
  );

  return (
    <SimShell
      title="PL/SQL Quest"
      subtitle="The Database Time Heist"
      xp={game.xp}
      stage={game.stage}
      totalStages={TOTAL_STAGES}
      mistakeMessage={game.mistakeMessage}
      successMessage={game.successMessage}
      icon={<Database className="size-5 text-primary" />}
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