
import { useEffect, useRef, useState } from "react";
import {  Shield, Zap, Grid, AlertTriangle, FlaskConical, Radio, Swords, Crown} from "lucide-react";
import {
  useSimGame,
  SimShell,
  StageWrapper,
  QuizBlock,
  CompletionScreen,
} from "@/components/simulations/shared";

// ── Constants ─────────────────────────────────────────────────────────────────
const TOTAL_STAGES = 9; 

export function LoopVerseSim() {
  const game = useSimGame(TOTAL_STAGES, () => {
    setWhileCondition(false);
    setWhileIncrement(false);
    setWhileExit(false);
    setWhileRunning(false);
    setWhileCounter(0);
    setFactorialN(5);
    setFactorialStep(0);
    setFactorialReverse(false);
    setNestedOuter(false);
    setNestedInner(false);
    setNestedRunning(false);
    setNestedCell({ row: -1, col: -1 });
    setZeroDivInput(0);
    setZeroDivExploded(false);
    setZeroDivHandled(false);
    setCustomExName(false);
    setCustomPragma(false);
    setCustomRaise(false);
    setRaiseCode("-20001");
    setRaiseMessage("");
    setRaiseTriggered(false);
    setQuizAnswer(null);
  });

  // Stage 2 – WHILE
  const [whileCondition, setWhileCondition] = useState(false);
  const [whileIncrement, setWhileIncrement] = useState(false);
  const [whileExit,      setWhileExit]      = useState(false);
  const [whileRunning,   setWhileRunning]   = useState(false);
  const [whileCounter,   setWhileCounter]   = useState(0);
  const whileTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Stage 3 – FOR / Factorial
  const [factorialN,       setFactorialN]       = useState(5);
  const [factorialStep,    setFactorialStep]    = useState(0); // how many steps shown
  const [factorialReverse, setFactorialReverse] = useState(false);

  // Stage 4 – Nested loops
  const STUDENTS = 4;
  const COURSES  = 3;
  const [nestedOuter,   setNestedOuter]   = useState(false);
  const [nestedInner,   setNestedInner]   = useState(false);
  const [nestedRunning, setNestedRunning] = useState(false);
  const [nestedCell,    setNestedCell]    = useState({ row: -1, col: -1 });
  const nestedTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Stage 5 – ZERO_DIVIDE
  const [zeroDivInput,    setZeroDivInput]    = useState(0);
  const [zeroDivExploded, setZeroDivExploded] = useState(false);
  const [zeroDivHandled,  setZeroDivHandled]  = useState(false);

  // Stage 6 – User-defined exception
  const [customExName, setCustomExName] = useState(false);
  const [customPragma, setCustomPragma] = useState(false);
  const [customRaise,  setCustomRaise]  = useState(false);

  // Stage 7 – RAISE_APPLICATION_ERROR
  const [raiseCode,      setRaiseCode]      = useState("-20001");
  const [raiseMessage,   setRaiseMessage]   = useState("");
  const [raiseTriggered, setRaiseTriggered] = useState(false);

  // Stage 8 – Quiz
  const [quizAnswer, setQuizAnswer] = useState<string | null>(null);

  const renderStage1 = () => (
    <StageWrapper>
      <div className="text-center mb-8 max-w-xl">
        <h2 className="text-3xl font-bold text-primary mb-2">
          🌌 LoopVerse: The Infinite Academy
        </h2>
        <p className="text-muted-foreground text-base leading-relaxed">
          You are a <strong>Code Guardian</strong> inside LoopVerse — a digital universe where
          logic controls reality. The <strong className="text-destructive">Error Overlord</strong> has
          removed all control structures, causing infinite loops and runtime crashes across every sector.
          Master loops and exceptions to restore order.
        </p>
      </div>

      {/* Sector status map */}
      <div className="grid grid-cols-3 gap-2 mb-8 w-full max-w-sm">
        {[
          { icon: "🔁", label: "WHILE Loop",   status: "INFINITE" },
          { icon: "🔢", label: "FOR Loop",     status: "JAMMED" },
          { icon: "🧑‍🎓", label: "Nested Loops", status: "TANGLED" },
          { icon: "💥", label: "Crash Zone",   status: "EXPLODING" },
          { icon: "🧬", label: "Mutation Lab", status: "CORRUPTED" },
          { icon: "📢", label: "Command Core", status: "SILENT" },
        ].map(s => (
          <div key={s.label}
            className="flex flex-col items-center p-2 rounded-xl border border-destructive/30 bg-destructive/5"
          >
            <span className="text-xl mb-1">{s.icon}</span>
            <span className="text-xs font-semibold text-muted-foreground text-center leading-tight">
              {s.label}
            </span>
            <span className="text-xs text-destructive font-mono mt-1">⚠ {s.status}</span>
          </div>
        ))}
      </div>

      <button
        onClick={() => { game.addXp(50, "🌌 Guardian Activated"); game.nextStage(); }}
        className="px-8 py-3 bg-primary text-primary-foreground font-bold rounded-xl flex items-center gap-2"
      >
        <Swords className="size-5" /> Enter LoopVerse
      </button>
    </StageWrapper>
  );

  // Run the WHILE loop animation
  const runWhileLoop = () => {
    setWhileRunning(true);
    setWhileCounter(1);
    whileTimerRef.current = setInterval(() => {
      setWhileCounter(c => {
        if (c >= 10) {
          clearInterval(whileTimerRef.current!);
          setWhileRunning(false);
          return c;
        }
        return c + 1;
      });
    }, 300);
  };

  useEffect(() => () => {
    clearInterval(whileTimerRef.current!);
    clearInterval(nestedTimerRef.current!);
  }, []);

  const whileAllSet   = whileCondition && whileIncrement && whileExit;
  const whileFinished = !whileRunning && whileCounter === 10;

  const WHILE_CONTROLS = [
    { key: "whileCondition", label: "Set condition: counter <= 10",   setter: setWhileCondition, color: "bg-blue-500" },
    { key: "whileIncrement", label: "Add increment: counter + 1",      setter: setWhileIncrement, color: "bg-green-500" },
    { key: "whileExit",      label: "Add EXIT WHEN counter > 10",      setter: setWhileExit,      color: "bg-yellow-500 text-black" },
  ];

  const renderStage2 = () => (
    <StageWrapper>
      <h3 className="text-xl font-bold text-primary mb-1">🔁 The Endless Corridor</h3>
      <p className="text-muted-foreground text-sm mb-4">
        A WHILE loop runs as long as its condition is TRUE. Without an increment
        and exit, it runs forever. Add all three controls, then run it.
      </p>

      {/* Corridor visualization */}
      <div className="flex gap-1 flex-wrap justify-center mb-4 w-full max-w-sm">
        {Array.from({ length: 10 }, (_, i) => i + 1).map(n => (
          <div key={n}
            className={`w-8 h-10 rounded-lg border text-xs font-bold flex items-center justify-center transition-all duration-200
              ${whileCounter >= n
                ? "bg-primary text-primary-foreground border-primary scale-105"
                : "border-border text-muted-foreground"}`}
          >
            {n}
          </div>
        ))}
      </div>

      {/* Counter display */}
      <div className="text-3xl font-black text-primary tabular-nums mb-2">
        counter = {whileCounter}
      </div>
      {whileRunning && (
        <div className="text-xs text-muted-foreground font-mono mb-4 animate-pulse">
          {whileCounter} &lt;= 10 → TRUE → running...
        </div>
      )}
      {whileFinished && (
        <div className="text-xs text-green-400 font-mono mb-4">
          {whileCounter} &lt;= 10 → FALSE → loop exits ✓
        </div>
      )}

      {/* Control buttons — sequential unlock */}
      <div className="space-y-2 w-full max-w-xs mb-4">
        {WHILE_CONTROLS.map(({ key, label, setter, color }, idx) => {
          const done    = [whileCondition, whileIncrement, whileExit][idx];
          const unlocked = idx === 0 || [whileCondition, whileIncrement][idx - 1];
          return (
            <button
              key={key}
              disabled={done || !unlocked}
              onClick={() => setter(true)}
              className={`w-full px-4 py-2 text-sm font-bold rounded-xl transition-all
                ${done
                  ? "opacity-50 cursor-default bg-slate-700 text-slate-300"
                  : unlocked
                    ? `${color} text-white cursor-pointer hover:opacity-90`
                    : "opacity-20 cursor-default border border-border text-muted-foreground"}`}
            >
              {done ? "✓ " : ""}{label}
            </button>
          );
        })}
      </div>

      {/* Run button */}
      {whileAllSet && !whileRunning && !whileFinished && (
        <button
          onClick={runWhileLoop}
          className="px-6 py-2 bg-primary text-primary-foreground font-bold rounded-xl font-mono text-sm"
        >
          ▶ Run WHILE Loop
        </button>
      )}

      {whileFinished && (
        <>
          <div className="text-green-400 font-bold text-sm mb-3">✨ Corridor Stabilized!</div>
          <button
            onClick={() => { game.addXp(100, "🔁 Loop Breaker"); game.nextStage(); }}
            className="px-8 py-3 bg-primary text-primary-foreground font-bold rounded-xl"
          >
            Enter Factorial Forge →
          </button>
        </>
      )}
    </StageWrapper>
  );

  // Build the multiplication sequence for current N and direction
  const getFactorialSequence = () => {
    const nums = Array.from({ length: factorialN }, (_, i) => i + 1);
    return factorialReverse ? [...nums].reverse() : nums;
  };

  const sequence   = getFactorialSequence();
  const visibleSeq = sequence.slice(0, factorialStep);
  const product    = visibleSeq.reduce((a, b) => a * b, 1);
  const forDone    = factorialStep >= factorialN;

  const renderStage3 = () => (
    <StageWrapper>
      <h3 className="text-xl font-bold text-primary mb-1">🔢 Factorial Forge</h3>
      <p className="text-muted-foreground text-sm mb-4">
        A FOR loop iterates over a fixed range automatically — no manual increment needed.
        Build {factorialN}! step by step, then try REVERSE mode.
      </p>

      {/* N selector */}
      <div className="flex items-center gap-3 mb-6">
        <label className="text-xs text-muted-foreground font-mono">N =</label>
        {[3, 4, 5, 6].map(n => (
          <button
            key={n}
            onClick={() => { setFactorialN(n); setFactorialStep(0); }}
            className={`w-8 h-8 rounded-lg text-sm font-bold border transition-all
              ${factorialN === n
                ? "bg-primary text-primary-foreground border-primary"
                : "border-border hover:border-primary"}`}
          >
            {n}
          </button>
        ))}
      </div>

      {/* FOR loop pseudocode */}
      <div className="font-mono text-xs bg-slate-900 rounded-xl px-4 py-3 mb-4 w-full max-w-xs">
        <span className="text-blue-400">FOR</span> i <span className="text-blue-400">IN</span>
        {factorialReverse
          ? <> <span className="text-yellow-300">REVERSE</span> 1..{factorialN}</>
          : <> 1..{factorialN}</>
        }
        <br />
        <span className="text-blue-400 ml-4">LOOP</span>
        <br />
        <span className="ml-8 text-green-300">result := result * i;</span>
        <br />
        <span className="text-blue-400">END LOOP;</span>
      </div>

      {/* Step-by-step multiplication chain */}
      <div className="flex items-center flex-wrap gap-1 justify-center mb-4 min-h-8">
        {visibleSeq.map((n, i) => (
          <span key={i} className="font-mono text-sm">
            <span className={`font-black ${i === visibleSeq.length - 1 ? "text-primary text-lg" : "text-muted-foreground"}`}>
              {n}
            </span>
            {i < visibleSeq.length - 1 && <span className="text-muted-foreground"> × </span>}
          </span>
        ))}
        {visibleSeq.length > 0 && (
          <span className="font-mono text-sm">
            <span className="text-muted-foreground"> = </span>
            <span className="text-primary font-black text-lg">{product}</span>
          </span>
        )}
      </div>

      {/* Controls */}
      <div className="flex gap-3 mb-4">
        <button
          disabled={forDone}
          onClick={() => setFactorialStep(s => Math.min(s + 1, factorialN))}
          className={`px-4 py-2 text-sm font-bold rounded-xl transition-all
            ${forDone
              ? "opacity-40 cursor-default bg-slate-700 text-slate-300"
              : "bg-primary text-primary-foreground cursor-pointer hover:opacity-90"}`}
        >
          {forDone ? "✓ Complete" : `Step (i = ${sequence[factorialStep] ?? "done"})`}
        </button>

        {factorialStep > 0 && (
          <button
            onClick={() => {
              setFactorialReverse(r => !r);
              setFactorialStep(0);
            }}
            className={`px-4 py-2 text-sm font-bold rounded-xl border transition-all
              ${factorialReverse
                ? "bg-yellow-500 text-black border-yellow-500"
                : "border-border hover:border-primary"}`}
          >
            {factorialReverse ? "🔄 REVERSE ON" : "🔄 Try REVERSE"}
          </button>
        )}
      </div>

      {forDone && (
        <>
          <div className="text-primary font-bold text-sm mb-1">
            🔥 {factorialN}! = {product}
          </div>
          {!factorialReverse && (
            <p className="text-xs text-muted-foreground mb-3">
              Try REVERSE mode to see backward iteration!
            </p>
          )}
          {(factorialReverse || factorialStep >= factorialN) && forDone && (
            <button
              onClick={() => { game.addXp(150, "🔢 Iteration Master"); game.nextStage(); }}
              className="px-8 py-3 bg-primary text-primary-foreground font-bold rounded-xl mt-2"
            >
              Enter Student Matrix →
            </button>
          )}
        </>
      )}
    </StageWrapper>
  );

  const runNestedLoop = () => {
    setNestedRunning(true);
    setNestedCell({ row: 0, col: 0 });
    let row = 0, col = 0;
    nestedTimerRef.current = setInterval(() => {
      setNestedCell({ row, col });
      col++;
      if (col >= COURSES) { col = 0; row++; }
      if (row >= STUDENTS) {
        clearInterval(nestedTimerRef.current!);
        setNestedRunning(false);
        setNestedCell({ row: STUDENTS, col: COURSES }); // mark all done
      }
    }, 250);
  };

  const nestedAllDone = nestedCell.row >= STUDENTS;
  const isCellFilled = (r: number, c: number) =>
    nestedCell.row > r || (nestedCell.row === r && nestedCell.col >= c);

  const renderStage4 = () => (
    <StageWrapper>
      <h3 className="text-xl font-bold text-primary mb-1">🧑‍🎓 Student Matrix</h3>
      <p className="text-muted-foreground text-sm mb-4">
        Nested loops = a loop inside a loop. The outer FOR walks students; the inner
        WHILE walks each student's courses. Together they fill the entire grid.
      </p>

      {/* Pseudocode */}
      <div className="font-mono text-xs bg-slate-900 rounded-xl px-4 py-3 mb-4 w-full max-w-xs">
        <div className={nestedOuter ? "text-blue-400" : "text-slate-600"}>
          FOR s IN 1..{STUDENTS} LOOP  {nestedOuter ? "✓" : "○"}
        </div>
        <div className={`ml-4 ${nestedInner ? "text-green-400" : "text-slate-600"}`}>
          WHILE c &lt;= {COURSES} LOOP  {nestedInner ? "✓" : "○"}
        </div>
        <div className="ml-8 text-slate-500">-- process cell(s, c)</div>
        <div className={`ml-4 ${nestedInner ? "text-green-400" : "text-slate-600"}`}>
          END LOOP;
        </div>
        <div className={nestedOuter ? "text-blue-400" : "text-slate-600"}>
          END LOOP;
        </div>
      </div>

      {/* Grid */}
      <div className="mb-4">
        {/* Column headers */}
        <div className="flex gap-1 mb-1 ml-14">
          {Array.from({ length: COURSES }, (_, c) => (
            <div key={c} className="w-10 text-center text-xs text-muted-foreground font-mono">
              C{c + 1}
            </div>
          ))}
        </div>
        {/* Rows */}
        {Array.from({ length: STUDENTS }, (_, r) => (
          <div key={r} className="flex items-center gap-1 mb-1">
            <div className="w-12 text-xs text-muted-foreground font-mono text-right pr-2">
              S{r + 1}
            </div>
            {Array.from({ length: COURSES }, (_, c) => (
              <div key={c}
                className={`w-10 h-10 rounded-lg border text-xs flex items-center justify-center font-bold transition-all duration-200
                  ${nestedRunning && nestedCell.row === r && nestedCell.col === c
                    ? "bg-primary text-primary-foreground border-primary scale-110 animate-pulse"
                    : isCellFilled(r, c)
                      ? "bg-primary/20 border-primary/40 text-primary"
                      : "border-border text-muted-foreground"}`}
              >
                {isCellFilled(r, c) ? "✓" : "·"}
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* Control buttons */}
      <div className="flex gap-3 mb-4">
        <button
          disabled={nestedOuter}
          onClick={() => setNestedOuter(true)}
          className={`px-4 py-2 text-sm font-bold rounded-xl transition-all
            ${nestedOuter
              ? "opacity-40 cursor-default bg-blue-500/20 text-blue-300"
              : "bg-blue-500 text-white cursor-pointer hover:opacity-90"}`}
        >
          {nestedOuter ? "✓ " : ""}Outer FOR (students)
        </button>
        <button
          disabled={!nestedOuter || nestedInner}
          onClick={() => setNestedInner(true)}
          className={`px-4 py-2 text-sm font-bold rounded-xl transition-all
            ${nestedInner
              ? "opacity-40 cursor-default bg-green-500/20 text-green-300"
              : nestedOuter
                ? "bg-green-500 text-white cursor-pointer hover:opacity-90"
                : "opacity-20 cursor-default border border-border text-muted-foreground"}`}
        >
          {nestedInner ? "✓ " : ""}Inner WHILE (courses)
        </button>
      </div>

      {nestedInner && !nestedRunning && !nestedAllDone && (
        <button
          onClick={runNestedLoop}
          className="px-6 py-2 bg-primary text-primary-foreground font-bold rounded-xl font-mono text-sm mb-4"
        >
          ▶ Run Nested Loops
        </button>
      )}

      {/* O(n×m) insight */}
      {nestedAllDone && (
        <>
          <div className="bg-primary/5 border border-primary/20 rounded-lg px-4 py-2 text-xs mb-3 max-w-sm text-center">
            💡 {STUDENTS} students × {COURSES} courses = {STUDENTS * COURSES} total iterations — O(n × m) complexity.
          </div>
          <button
            onClick={() => { game.addXp(200, "🧑‍🎓 Loop Architect"); game.nextStage(); }}
            className="px-8 py-3 bg-primary text-primary-foreground font-bold rounded-xl"
          >
            Enter Crash Zone →
          </button>
        </>
      )}
    </StageWrapper>
  );

  const renderStage5 = () => {
    const isZero   = zeroDivInput === 0;
    const isSafe   = !isZero;
    const result   = isSafe ? (100 / zeroDivInput).toFixed(2) : "???";

    return (
      <StageWrapper>
        <h3 className="text-xl font-bold text-primary mb-1">💥 Crash Zone</h3>
        <p className="text-muted-foreground text-sm mb-4">
          Division by zero causes a runtime crash. Add an EXCEPTION handler for
          ZERO_DIVIDE to prevent system failure.
        </p>

        {/* Explosion / shield visual */}
        <div className={`text-5xl mb-4 transition-all duration-500
          ${zeroDivHandled ? "scale-50 opacity-20" : zeroDivExploded ? "animate-bounce" : "scale-100"}`}
        >
          {zeroDivHandled ? "🛡️" : zeroDivExploded ? "💥" : isZero ? "⚠️" : "⚡"}
        </div>

        {/* Input */}
        <div className="w-full max-w-xs mb-4">
          <label className="text-xs text-muted-foreground font-mono block mb-2">
            denominator = (set to 0 to trigger crash)
          </label>
          <input
            type="number" value={zeroDivInput}
            onChange={e => {
              setZeroDivInput(Number(e.target.value));
              setZeroDivExploded(false);
              setZeroDivHandled(false);
            }}
            className="w-full bg-slate-900 border border-border rounded-lg px-3 py-2 font-mono text-sm text-white"
          />
        </div>

        {/* Formula */}
        <div className="font-mono text-sm bg-slate-900 rounded-xl px-4 py-3 mb-4 w-full max-w-xs">
          <span className="text-yellow-300">100</span>
          <span className="text-white"> / </span>
          <span className={isZero ? "text-destructive font-black" : "text-white"}>{zeroDivInput}</span>
          {zeroDivHandled && (
            <span className="text-green-400"> → EXCEPTION caught ✓</span>
          )}
          {!zeroDivHandled && isSafe && (
            <span className="text-green-300"> = {result}</span>
          )}
        </div>

        {/* EXCEPTION block — appears after explosion */}
        {zeroDivExploded && !zeroDivHandled && (
          <div className="w-full max-w-xs bg-slate-900 rounded-xl p-3 font-mono text-xs mb-4 border border-destructive/40">
            <div className="text-destructive mb-1">❌ ORA-01476: divisor is equal to zero</div>
            <div className="text-slate-500">EXCEPTION</div>
            <div className="text-slate-500 ml-4">WHEN ??? THEN ...</div>
          </div>
        )}

        {/* Action buttons */}
        <div className="flex gap-3">
          {isZero && !zeroDivExploded && (
            <button
              onClick={() => setZeroDivExploded(true)}
              className="px-4 py-2 bg-destructive text-white text-sm font-bold rounded-xl cursor-pointer"
            >
              Divide Now 💥
            </button>
          )}
          {zeroDivExploded && !zeroDivHandled && (
            <button
              onClick={() => setZeroDivHandled(true)}
              className="px-4 py-2 bg-primary text-primary-foreground text-sm font-bold rounded-xl cursor-pointer"
            >
              Add WHEN ZERO_DIVIDE THEN 🛡️
            </button>
          )}
        </div>

        {zeroDivHandled && (
          <>
            <div className="font-mono text-xs bg-slate-900 rounded-xl px-4 py-3 mt-3 mb-3 w-full max-w-xs border border-green-500/30">
              <div className="text-slate-400">EXCEPTION</div>
              <div className="text-green-400 ml-4">WHEN ZERO_DIVIDE THEN</div>
              <div className="text-green-300 ml-8">
                DBMS_OUTPUT.PUT_LINE('Division error caught');
              </div>
            </div>
            <div className="text-green-400 font-bold text-sm mb-3">🛡️ Shield Activated!</div>
            <button
              onClick={() => { game.addXp(200, "💥 Error Defender"); game.nextStage(); }}
              className="px-8 py-3 bg-primary text-primary-foreground font-bold rounded-xl"
            >
              Enter Mutation Lab →
            </button>
          </>
        )}
      </StageWrapper>
    );
  };

  const CUSTOM_STEPS = [
    {
      key: "customExName",
      setter: setCustomExName,
      label: "Declare: e_negative_marks EXCEPTION",
      code: "e_negative_marks  EXCEPTION;",
      color: "bg-blue-500",
      desc: "Create the exception variable in DECLARE",
    },
    {
      key: "customPragma",
      setter: setCustomPragma,
      label: "Link: PRAGMA EXCEPTION_INIT",
      code: "PRAGMA EXCEPTION_INIT(e_negative_marks, -20002);",
      color: "bg-purple-500",
      desc: "Assign an error code to your exception",
    },
    {
      key: "customRaise",
      setter: setCustomRaise,
      label: "Raise: IF marks < 0 THEN RAISE",
      code: "IF v_marks < 0 THEN RAISE e_negative_marks; END IF;",
      color: "bg-red-500",
      desc: "Trigger the exception on invalid data",
    },
  ];

  const customDone = customExName && customPragma && customRaise;
  const customStates = [customExName, customPragma, customRaise];

  const renderStage6 = () => (
    <StageWrapper>
      <h3 className="text-xl font-bold text-primary mb-1">🧬 Mutation Lab</h3>
      <p className="text-muted-foreground text-sm mb-4">
        You can define your own exceptions for invalid business rules.
        Build a custom exception for negative marks in 3 steps.
      </p>

      {/* Validation tube visual */}
      <div className={`text-4xl mb-4 transition-all duration-500
        ${customRaise ? "opacity-20 scale-75" : customExName ? "animate-pulse" : "scale-100"}`}
      >
        {customRaise ? "✅" : customPragma ? "⚗️" : customExName ? "🧬" : "⚠️"}
      </div>

      {/* Growing code block */}
      <div className="w-full max-w-sm bg-slate-900 rounded-xl p-4 font-mono text-xs mb-6">
        <div className="text-blue-400">DECLARE</div>
        {customExName && (
          <div className="ml-4 text-green-300 animate-in fade-in">
            e_negative_marks  EXCEPTION;
          </div>
        )}
        {customPragma && (
          <div className="ml-4 text-purple-300 animate-in fade-in">
            PRAGMA EXCEPTION_INIT(e_negative_marks, -20002);
          </div>
        )}
        <div className="text-blue-400">BEGIN</div>
        {customRaise && (
          <>
            <div className="ml-4 text-red-300 animate-in fade-in">
              IF v_marks &lt; 0 THEN
            </div>
            <div className="ml-8 text-red-400 animate-in fade-in">
              RAISE e_negative_marks;
            </div>
            <div className="ml-4 text-red-300 animate-in fade-in">END IF;</div>
          </>
        )}
        <div className="text-blue-400">END;</div>
      </div>

      {/* Sequential step buttons */}
      <div className="space-y-2 w-full max-w-sm mb-4">
        {CUSTOM_STEPS.map(({ key, setter, label, desc }, idx) => {
          const done     = customStates[idx];
          const unlocked = idx === 0 || customStates[idx - 1];
          return (
            <div key={key} className={`p-3 rounded-xl border transition-all
              ${done ? "border-green-500/40 bg-green-500/5" :
                unlocked ? "border-border" : "border-border opacity-30"}`}
            >
              <div className="text-xs text-muted-foreground mb-2">{desc}</div>
              <button
                disabled={done || !unlocked}
                onClick={() => setter(true)}
                className={`w-full px-4 py-2 text-xs font-bold font-mono rounded-lg transition-all
                  ${done
                    ? "cursor-default text-green-400 bg-transparent"
                    : unlocked
                      ? `${CUSTOM_STEPS[idx].color} text-white cursor-pointer hover:opacity-90`
                      : "cursor-default text-muted-foreground"}`}
              >
                {done ? "✓ " : ""}{label}
              </button>
            </div>
          );
        })}
      </div>

      {customDone && (
        <>
          <div className="text-green-400 font-bold text-sm mb-3">🧪 Data Stabilized!</div>
          <button
            onClick={() => { game.addXp(200, "🧬 Custom Exception Creator"); game.nextStage(); }}
            className="px-8 py-3 bg-primary text-primary-foreground font-bold rounded-xl"
          >
            Enter Command Core →
          </button>
        </>
      )}
    </StageWrapper>
  );

  const isValidCode = /^-20\d{3}$/.test(raiseCode);
  const isValidMsg  = raiseMessage.trim().length >= 5;
  const canTrigger  = isValidCode && isValidMsg && !raiseTriggered;

  const renderStage7 = () => (
    <StageWrapper>
      <h3 className="text-xl font-bold text-primary mb-1">📢 Command Core</h3>
      <p className="text-muted-foreground text-sm mb-4">
        RAISE_APPLICATION_ERROR sends a custom error code and message to the caller.
        Codes must be between -20000 and -20999.
      </p>

      {/* Console visual */}
      <div className={`w-full max-w-sm bg-slate-900 rounded-xl p-4 font-mono text-xs mb-6 min-h-24 border transition-all
        ${raiseTriggered ? "border-red-500/40" : "border-border"}`}
      >
        <div className="text-slate-500 mb-2">-- Command Core Console</div>
        {raiseTriggered ? (
          <div className="animate-in fade-in">
            <div className="text-red-400">
              ORA{raiseCode}: {raiseMessage}
            </div>
            <div className="text-slate-500 mt-1">
              at RAISE_APPLICATION_ERROR({raiseCode}, '{raiseMessage}')
            </div>
          </div>
        ) : (
          <div className="text-slate-600">
            RAISE_APPLICATION_ERROR(<br />
            <span className="ml-4 text-yellow-300">{raiseCode || "error_code"}</span>,
            <br />
            <span className="ml-4 text-green-300">'{raiseMessage || "your message here"}'</span>
            <br />
            );
          </div>
        )}
      </div>

      {/* Input fields */}
      {!raiseTriggered && (
        <div className="space-y-3 w-full max-w-xs mb-4">
          <div>
            <label className="text-xs text-muted-foreground font-mono block mb-1">
              Error Code (-20000 to -20999)
            </label>
            <input
              value={raiseCode}
              onChange={e => setRaiseCode(e.target.value)}
              placeholder="-20001"
              className={`w-full bg-slate-900 rounded-lg px-3 py-2 font-mono text-sm text-white border transition-all
                ${isValidCode ? "border-green-500/40" : "border-border"}`}
            />
            {raiseCode && !isValidCode && (
              <p className="text-xs text-destructive mt-1 font-mono">
                ❌ Must be -20000 to -20999
              </p>
            )}
          </div>
          <div>
            <label className="text-xs text-muted-foreground font-mono block mb-1">
              Error Message (min 5 chars)
            </label>
            <input
              value={raiseMessage}
              onChange={e => setRaiseMessage(e.target.value)}
              placeholder="Invalid student record"
              className={`w-full bg-slate-900 rounded-lg px-3 py-2 font-mono text-sm text-white border transition-all
                ${isValidMsg ? "border-green-500/40" : "border-border"}`}
            />
          </div>
        </div>
      )}

      {canTrigger && (
        <button
          onClick={() => setRaiseTriggered(true)}
          className="px-6 py-2 bg-red-500 text-white font-bold rounded-xl font-mono text-sm mb-4"
        >
          ⚡ Trigger Error
        </button>
      )}

      {raiseTriggered && (
        <>
          <div className="text-green-400 font-bold text-sm mb-3">
            📢 System now communicates clearly!
          </div>
          <button
            onClick={() => { game.addXp(200, "📢 System Communicator"); game.nextStage(); }}
            className="px-8 py-3 bg-primary text-primary-foreground font-bold rounded-xl"
          >
            Face the Error Overlord →
          </button>
        </>
      )}
    </StageWrapper>
  );

  const renderStage8 = () => (
    <StageWrapper>
      <h3 className="text-xl font-bold text-primary mb-6">🧠 Guardian's Final Test</h3>
      <div className="w-full max-w-md space-y-4 mb-8">
        <QuizBlock
          question="What happens in a WHILE loop if the increment statement is missing?"
          options={[
            { label: "Loop executes exactly once then exits",              value: "a" },
            { label: "Loop runs infinitely — condition never becomes FALSE", value: "b" },
            { label: "PL/SQL throws a LOOP_ERROR exception",               value: "c" },
          ]}
          correctValue="b"
          selectedValue={quizAnswer}
          onSelect={setQuizAnswer}
          correctFeedback="✅ Correct! Without incrementing the counter, the condition stays TRUE forever — creating an infinite loop."
          wrongFeedback="❌ Hint: Think about what makes the WHILE condition eventually become FALSE. What changes the counter?"
        />
      </div>
      {quizAnswer === "b" && (
        <button
          onClick={() => { game.addXp(150, "🧠 LoopVerse Scholar"); game.nextStage(); }}
          className="px-8 py-3 bg-primary text-primary-foreground font-bold rounded-xl animate-in zoom-in"
        >
          Claim Victory 👑
        </button>
      )}
    </StageWrapper>
  );

  const renderStage9 = () => (
    <CompletionScreen
      missionTitle="LoopVerse Restored! 🌌"
      missionSubtitle="You defeated the Error Overlord and mastered every loop and exception in the system."
      xp={game.xp}
      xpLog={game.xpLog}
      achievements={[
        { icon: <Zap className="size-4" />,         label: "Loop Breaker" },
        { icon: <Crown className="size-4" />,        label: "Iteration Master" },
        { icon: <Grid className="size-4" />,         label: "Loop Architect" },
        { icon: <Shield className="size-4" />,       label: "Error Defender" },
        { icon: <FlaskConical className="size-4" />, label: "Custom Exception Creator" },
        { icon: <Radio className="size-4" />,        label: "System Communicator" },
      ]}
      concepts={[
        { label: "WHILE Loop",             description: "Runs while condition is TRUE — always needs an increment and exit condition." },
        { label: "FOR Loop",               description: "Iterates over a fixed range automatically; supports REVERSE." },
        { label: "Nested Loops",           description: "O(n × m) iterations — outer controls major flow, inner handles details." },
        { label: "ZERO_DIVIDE",            description: "Built-in exception that fires on division by zero — must be caught explicitly." },
        { label: "User-Defined Exceptions",description: "Declared in DECLARE, linked with PRAGMA, raised manually on invalid data." },
        { label: "RAISE_APPLICATION_ERROR",description: "Sends a custom error code (-20000 to -20999) and message to the caller." },
      ]}
      onReset={game.reset}
    />
  );

  return (
    <SimShell
      title="LoopVerse"
      subtitle="The Infinite Academy of Code Guardians"
      xp={game.xp}
      stage={game.stage}
      totalStages={TOTAL_STAGES}
      mistakeMessage={game.mistakeMessage}
      successMessage={game.successMessage}
      icon={<Zap className="size-5 text-primary" />}
    >
      {game.stage === 1 && renderStage1()}
      {game.stage === 2 && renderStage2()}
      {game.stage === 3 && renderStage3()}
      {game.stage === 4 && renderStage4()}
      {game.stage === 5 && renderStage5()}
      {game.stage === 6 && renderStage6()}
      {game.stage === 7 && renderStage7()}
      {game.stage === 8 && renderStage8()}
      {game.stage === 9 && renderStage9()}
    </SimShell>
  );
}

