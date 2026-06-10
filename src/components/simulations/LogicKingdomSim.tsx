import { useState } from "react";
import { Shield, Gem, Swords, Crown, GitBranch, Zap, AlertTriangle } from "lucide-react";
import {
  useSimGame,
  useSteppedArray,   // remove if not array-based
  SimShell,
  StageWrapper,
  QuizBlock,
  CompletionScreen,
} from "@/components/simulations/shared";

// ── Constants ─────────────────────────────────────────────────────────────────
const TOTAL_STAGES = 8;
export function LogicKingdomSim() {
  const game = useSimGame(TOTAL_STAGES, () => {
    setMarksInput(82);
    setIfEvaluated(false);
    setChosenPath(null);
    setNestedStep(0);
    setNestedComplete(false);
    setCaseGrade(null);
    setCaseMapped(false);
    setNullifInput(0);
    setNullifApplied(false);
    setNullifWrong(false);
    setCoalesceOrder(["NULL", "NULL", "Student"]);
    setCoalesceActivated(false);
    setQuizAnswer(null);
  });

  // Stage 2 – IF-THEN-ELSE
  const [marksInput, setMarksInput]     = useState(82);
  const [ifEvaluated, setIfEvaluated]   = useState(false);
  const [chosenPath, setChosenPath]     = useState<string | null>(null);

  // Stage 3 – Nested IF
  const [nestedStep, setNestedStep]     = useState(0); // 0=idle,1=outer,2=inner
  const [nestedComplete, setNestedComplete] = useState(false);

  // Stage 4 – CASE
  const [caseGrade, setCaseGrade]       = useState<string | null>(null);
  const [caseMapped, setCaseMapped]     = useState(false);

  // Stage 5 – NULLIF
  const [nullifInput, setNullifInput]   = useState(0);
  const [nullifApplied, setNullifApplied] = useState(false);
  const [nullifWrong, setNullifWrong]   = useState(false);

  // Stage 6 – COALESCE
  const [coalesceOrder, setCoalesceOrder] = useState(["NULL", "NULL", "Student"]);
  const [coalesceActivated, setCoalesceActivated] = useState(false);

  // Stage 7 – Quiz
  const [quizAnswer, setQuizAnswer]     = useState<string | null>(null);

  const renderStage1 = () => (
    <StageWrapper>
      <div className="text-center mb-8 max-w-xl">
        <h2 className="text-3xl font-bold text-primary mb-2">
          🧙 The Logic Kingdom
        </h2>
        <p className="text-muted-foreground text-base leading-relaxed">
          You are a <strong>Code Wizard</strong> in the mystical Logic Kingdom,
          where every decision controls reality. Data corruption and missing values
          are spreading chaos. The Grand Compiler has assigned your mission:
          master the <strong>Four Ancient Powers</strong> to restore order.
        </p>
      </div>

      {/* Four power tiles */}
      <div className="grid grid-cols-2 gap-3 mb-8 w-full max-w-sm">
        {[
          { icon: "🔹", power: "IF-THEN-ELSE",  desc: "Decision branching",   color: "border-blue-500/40 bg-blue-500/5" },
          { icon: "🎭", power: "CASE Magic",     desc: "Value mapping",        color: "border-purple-500/40 bg-purple-500/5" },
          { icon: "🛡️", power: "NULLIF Shield",  desc: "Error prevention",     color: "border-red-500/40 bg-red-500/5" },
          { icon: "💎", power: "COALESCE",       desc: "Missing data rescue",  color: "border-yellow-500/40 bg-yellow-500/5" },
        ].map(p => (
          <div key={p.power}
            className={`flex flex-col items-center p-3 rounded-xl border ${p.color} opacity-50`}
          >
            <span className="text-2xl mb-1">{p.icon}</span>
            <span className="text-xs font-bold text-foreground">{p.power}</span>
            <span className="text-xs text-muted-foreground mt-1">{p.desc}</span>
            <span className="text-xs text-destructive font-mono mt-1">🔒 LOCKED</span>
          </div>
        ))}
      </div>

      <button
        onClick={() => { game.addXp(50, "🧙 Wizard Apprentice"); game.nextStage(); }}
        className="px-8 py-3 bg-primary text-primary-foreground font-bold rounded-xl flex items-center gap-2"
      >
        <Swords className="size-5" /> Accept the Mission
      </button>
    </StageWrapper>
  );

  // Derive which door is correct for given marks
  const getCorrectPath = (m: number) =>
    m >= 90 ? "A" : m >= 75 ? "B" : m >= 50 ? "C" : "F";

  const DOORS = [
    { label: "IF marks ≥ 90",   result: "A", grade: "Distinction", color: "border-green-500 bg-green-500/10 text-green-400" },
    { label: "ELSIF marks ≥ 75", result: "B", grade: "First Class", color: "border-yellow-500 bg-yellow-500/10 text-yellow-400" },
    { label: "ELSIF marks ≥ 50", result: "C", grade: "Pass",        color: "border-blue-500 bg-blue-500/10 text-blue-400" },
    { label: "ELSE",             result: "F", grade: "Fail",         color: "border-red-500 bg-red-500/10 text-red-400" },
  ];

  const correctPath = getCorrectPath(marksInput);

  const renderStage2 = () => (
    <StageWrapper>
      <h3 className="text-xl font-bold text-primary mb-1">🌉 The Gate of Decisions</h3>
      <p className="text-muted-foreground text-sm mb-6">
        Every decision begins with a condition. Set the marks, evaluate, then choose the correct door.
      </p>

      {/* Marks slider */}
      <div className="w-full max-w-xs mb-6">
        <div className="flex items-center justify-between mb-2">
          <label className="text-xs text-muted-foreground font-mono">marks =</label>
          <span className="text-2xl font-black text-primary tabular-nums">{marksInput}</span>
        </div>
        <input
          type="range" min={0} max={100} value={marksInput}
          onChange={e => { setMarksInput(Number(e.target.value)); setIfEvaluated(false); setChosenPath(null); }}
          className="w-full accent-primary"
        />
        <div className="flex justify-between text-xs text-muted-foreground mt-1">
          <span>0</span><span>50</span><span>75</span><span>90</span><span>100</span>
        </div>
      </div>

      {/* Evaluate button */}
      {!ifEvaluated && (
        <button
          onClick={() => setIfEvaluated(true)}
          className="px-6 py-2 bg-primary text-primary-foreground font-bold rounded-xl mb-6 font-mono text-sm"
        >
          ▶ Evaluate Condition
        </button>
      )}

      {/* Doors — appear after evaluate */}
      {ifEvaluated && (
        <>
          <p className="text-xs text-muted-foreground mb-3">
            Which door does marks = <strong>{marksInput}</strong> open?
          </p>
          <div className="grid grid-cols-2 gap-2 w-full max-w-xs mb-4">
            {DOORS.map(door => {
              const picked = chosenPath === door.result;
              const isCorrect = door.result === correctPath;
              return (
                <button
                  key={door.result}
                  disabled={!!chosenPath}
                  onClick={() => {
                    setChosenPath(door.result);
                    if (door.result !== correctPath) {
                      game.showMistake?.(`❌ Wrong door! That path leads to Grade ${door.result}, but marks=${marksInput} should go to Grade ${correctPath}.`);
                    }
                  }}
                  className={`p-3 rounded-xl border text-xs font-bold transition-all
                    ${picked && isCorrect  ? "border-green-500 bg-green-500/20 text-green-400" :
                      picked && !isCorrect ? "border-destructive bg-destructive/10 text-destructive" :
                      door.color} cursor-pointer`}
                >
                  <div className="font-mono text-xs mb-1">{door.label}</div>
                  <div className="text-base">{door.result === "A" ? "🟢" : door.result === "B" ? "🟡" : door.result === "C" ? "🔵" : "🔴"}</div>
                  <div>Grade {door.result}</div>
                  <div className="opacity-70 font-normal">{door.grade}</div>
                </button>
              );
            })}
          </div>

          {/* Wrong: show retry */}
          {chosenPath && chosenPath !== correctPath && (
            <button
              onClick={() => { setChosenPath(null); }}
              className="text-xs px-4 py-1 border border-primary rounded-lg text-primary mb-3"
            >
              Try Again
            </button>
          )}

          {/* Correct path chosen */}
          {chosenPath === correctPath && (
            <>
              <div className="text-green-400 font-bold text-sm mb-3">
                ✨ Correct Path! Grade {correctPath} → {DOORS.find(d => d.result === correctPath)?.grade}
              </div>
              <button
                onClick={() => { game.addXp(100, "🔹 Decision Initiate"); game.nextStage(); }}
                className="px-8 py-3 bg-primary text-primary-foreground font-bold rounded-xl"
              >
                Enter the Nested Maze →
              </button>
            </>
          )}
        </>
      )}
    </StageWrapper>
  );

  // Fixed scenario: marks = 82
  const NESTED_MARKS = 82;

  const NESTED_STEPS = [
    {
      label: "Outer: IF marks >= 50",
      code: `IF ${NESTED_MARKS} >= 50 THEN`,
      result: true,
      explanation: `${NESTED_MARKS} ≥ 50 → TRUE → enter outer block`,
      color: "border-blue-500/50 bg-blue-500/5",
    },
    {
      label: "Inner: IF marks >= 75",
      code: `  IF ${NESTED_MARKS} >= 75 THEN`,
      result: true,
      explanation: `${NESTED_MARKS} ≥ 75 → TRUE → First Class`,
      color: "border-green-500/50 bg-green-500/5",
      output: "🎓 Result: First Class",
    },
  ];

  const renderStage3 = () => (
    <StageWrapper>
      <h3 className="text-xl font-bold text-primary mb-1">🏰 The Nested Maze</h3>
      <p className="text-muted-foreground text-sm mb-4">
        Some decisions depend on earlier ones. Each condition unlocks a deeper chamber.
        marks = <strong className="text-primary">{NESTED_MARKS}</strong>
      </p>

      {/* Maze visualization — nested boxes */}
      <div className="w-full max-w-sm mb-6 relative">
        {/* Outer chamber */}
        <div className={`p-4 rounded-xl border transition-all duration-500
          ${nestedStep >= 1 ? "border-blue-500/50 bg-blue-500/5" : "border-border bg-transparent"}`}
        >
          <div className="font-mono text-xs mb-2 text-blue-400">
            {nestedStep >= 1 ? "✓ " : "○ "}IF marks &gt;= 50 THEN
          </div>
          {nestedStep >= 1 && (
            <p className="text-xs text-muted-foreground mb-2 animate-in fade-in">
              {NESTED_STEPS[0].explanation}
            </p>
          )}

          {/* Inner chamber — only visible after outer */}
          <div className={`p-3 rounded-lg border transition-all duration-500 ml-4
            ${nestedStep >= 2 ? "border-green-500/50 bg-green-500/5" : "border-dashed border-border opacity-30"}`}
          >
            <div className="font-mono text-xs mb-1 text-green-400">
              {nestedStep >= 2 ? "✓ " : "○ "}IF marks &gt;= 75 THEN
            </div>
            {nestedStep >= 2 && (
              <>
                <p className="text-xs text-muted-foreground animate-in fade-in">
                  {NESTED_STEPS[1].explanation}
                </p>
                <div className="mt-2 text-sm font-bold text-green-400 animate-in zoom-in">
                  {NESTED_STEPS[1].output}
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Step buttons */}
      <div className="flex gap-3 mb-4">
        <button
          disabled={nestedStep >= 1}
          onClick={() => setNestedStep(1)}
          className={`px-4 py-2 text-sm font-bold rounded-xl border transition-all
            ${nestedStep >= 1
              ? "opacity-40 cursor-default bg-blue-500/20 border-blue-500/30 text-blue-300"
              : "bg-blue-500 text-white cursor-pointer hover:opacity-90"}`}
        >
          {nestedStep >= 1 ? "✓ " : ""}Evaluate Outer IF
        </button>
        <button
          disabled={nestedStep < 1 || nestedStep >= 2}
          onClick={() => { setNestedStep(2); setNestedComplete(true); }}
          className={`px-4 py-2 text-sm font-bold rounded-xl border transition-all
            ${nestedStep >= 2
              ? "opacity-40 cursor-default bg-green-500/20 border-green-500/30 text-green-300"
              : nestedStep >= 1
                ? "bg-green-500 text-white cursor-pointer hover:opacity-90"
                : "opacity-20 cursor-default border-border text-muted-foreground"}`}
        >
          {nestedStep >= 2 ? "✓ " : ""}Evaluate Inner IF
        </button>
      </div>

      {/* Key insight */}
      {nestedStep >= 2 && (
        <div className="bg-primary/5 border border-primary/20 rounded-lg px-4 py-2 text-xs mb-4 max-w-sm text-center">
          💡 Inner block only runs when outer condition is TRUE first.
        </div>
      )}

      {nestedComplete && (
        <button
          onClick={() => { game.addXp(150, "🏰 Nested Logic Master"); game.nextStage(); }}
          className="px-8 py-3 bg-primary text-primary-foreground font-bold rounded-xl"
        >
          Enter the CASE Arena →
        </button>
      )}
    </StageWrapper>
  );

  const CASE_GRADES = [
    { grade: "A", desc: "Excellent",  aura: "bg-green-500",  textColor: "text-green-400" },
    { grade: "B", desc: "Good",       aura: "bg-blue-500",   textColor: "text-blue-400" },
    { grade: "C", desc: "Average",    aura: "bg-yellow-500", textColor: "text-yellow-400" },
    { grade: "D", desc: "Below Avg",  aura: "bg-orange-500", textColor: "text-orange-400" },
    { grade: "F", desc: "Fail",       aura: "bg-red-500",    textColor: "text-red-400" },
  ];

  const renderStage4 = () => (
    <StageWrapper>
      <h3 className="text-xl font-bold text-primary mb-1">🎭 The CASE Arena</h3>
      <p className="text-muted-foreground text-sm mb-4">
        CASE maps fixed values to outcomes directly — no complex conditions needed.
        Click each grade pedestal to see its mapping.
      </p>

      {/* CASE code block — updates live */}
      <div className="w-full max-w-xs bg-slate-900 rounded-xl p-3 font-mono text-xs mb-6">
        <span className="text-blue-400">CASE</span> grade
        {CASE_GRADES.map(g => (
          <div key={g.grade}
            className={`ml-4 transition-all duration-300
              ${caseGrade === g.grade ? g.textColor : "text-slate-500"}`}
          >
            {caseGrade === g.grade ? "▶ " : "  "}
            <span className="text-slate-400">WHEN</span> '{g.grade}'
            <span className="text-slate-400"> THEN</span> '{g.desc}'
          </div>
        ))}
        <div className="text-slate-400 ml-4">ELSE 'Unknown'</div>
        <span className="text-blue-400">END</span>
      </div>

      {/* Grade pedestals */}
      <div className="flex gap-3 flex-wrap justify-center mb-6">
        {CASE_GRADES.map(g => (
          <button
            key={g.grade}
            onClick={() => { setCaseGrade(g.grade); setCaseMapped(true); }}
            className={`flex flex-col items-center p-3 rounded-xl border w-16 transition-all duration-300 cursor-pointer
              ${caseGrade === g.grade
                ? `border-current ${g.textColor} bg-current/10 scale-110`
                : "border-border hover:border-primary"}`}
          >
            <div className={`w-8 h-8 rounded-full ${g.aura} mb-1 transition-all
              ${caseGrade === g.grade ? "opacity-100 shadow-lg" : "opacity-30"}`}
            />
            <span className="text-sm font-black">{g.grade}</span>
          </button>
        ))}
      </div>

      {/* Mapped result */}
      {caseGrade && (
        <div className={`text-lg font-bold mb-4 animate-in fade-in
          ${CASE_GRADES.find(g => g.grade === caseGrade)?.textColor}`}
        >
          Grade '{caseGrade}' → {CASE_GRADES.find(g => g.grade === caseGrade)?.desc} ✓
        </div>
      )}

      {/* IF vs CASE insight */}
      {caseMapped && (
        <>
          <div className="bg-primary/5 border border-primary/20 rounded-lg px-4 py-2 text-xs mb-4 max-w-sm text-center">
            💡 CASE is faster than IF chains when matching fixed values — direct lookup, no sequential checks.
          </div>
          <button
            onClick={() => { game.addXp(150, "🎭 Branching Master"); game.nextStage(); }}
            className="px-8 py-3 bg-primary text-primary-foreground font-bold rounded-xl"
          >
            Unlock NULLIF Shield →
          </button>
        </>
      )}
    </StageWrapper>
  );

  const renderStage5 = () => {
    const willExplode = nullifInput === 0 && !nullifApplied;
    const shielded    = nullifInput === 0 && nullifApplied;
    const safeDiv     = nullifInput !== 0;

    return (
      <StageWrapper>
        <h3 className="text-xl font-bold text-primary mb-1">⚔️ The NULLIF Shield</h3>
        <p className="text-muted-foreground text-sm mb-4">
          DivideByZero monster attacks when a denominator is 0. NULLIF converts 0 to NULL —
          safely halting the division before it explodes.
        </p>

        {/* Monster / shield visual */}
        <div className={`text-5xl mb-4 transition-all duration-500
          ${shielded ? "opacity-20 scale-50" : "scale-100 animate-pulse"}`}
        >
          {shielded ? "💨" : safeDiv ? "😴" : "👹"}
        </div>
        {willExplode && !nullifWrong && (
          <p className="text-xs text-destructive font-mono mb-4 animate-pulse">
            NULL.exe: "denominator = 0... DIVISION ERROR INCOMING!"
          </p>
        )}
        {shielded && (
          <p className="text-xs text-green-400 font-mono mb-4">
            🛡️ NULLIF returned NULL → division halted safely!
          </p>
        )}

        {/* Input */}
        <div className="w-full max-w-xs mb-4">
          <label className="text-xs text-muted-foreground font-mono block mb-2">
            total_marks = (set to 0 to trigger the monster)
          </label>
          <input
            type="number" min={0} max={100} value={nullifInput}
            onChange={e => {
              setNullifInput(Number(e.target.value));
              setNullifApplied(false);
              setNullifWrong(false);
            }}
            className="w-full bg-slate-900 border border-border rounded-lg px-3 py-2 font-mono text-sm text-white"
          />
        </div>

        {/* Formula display */}
        <div className="font-mono text-sm bg-slate-900 rounded-xl px-4 py-3 mb-6 w-full max-w-xs">
          <span className="text-yellow-300">100</span>
          <span className="text-white"> / </span>
          {nullifApplied
            ? <span className="text-green-400">NULLIF({nullifInput}, 0) → NULL</span>
            : <span className={nullifInput === 0 ? "text-destructive animate-pulse" : "text-white"}>
                {nullifInput}
              </span>
          }
          {!nullifApplied && nullifInput !== 0 && (
            <span className="text-white"> = {(100 / nullifInput).toFixed(2)}</span>
          )}
        </div>

        {/* Action buttons */}
        {!nullifApplied && (
          <div className="flex gap-3">
            {/* Trigger explosion first */}
            {nullifInput === 0 && !nullifWrong && (
              <button
                onClick={() => setNullifWrong(true)}
                className="px-4 py-2 bg-destructive text-white text-sm font-bold rounded-xl"
              >
                Divide directly 💥
              </button>
            )}
            {nullifWrong && (
              <div className="text-destructive text-xs font-mono text-center mb-2">
                💥 ORA-01476: divisor is equal to zero!
              </div>
            )}
            <button
              onClick={() => setNullifApplied(true)}
              className="px-4 py-2 bg-primary text-primary-foreground text-sm font-bold rounded-xl"
            >
              Apply NULLIF(total_marks, 0) 🛡️
            </button>
          </div>
        )}

        {(shielded || safeDiv) && nullifApplied && (
          <button
            onClick={() => { game.addXp(200, "🛡️ Error Defender"); game.nextStage(); }}
            className="px-8 py-3 bg-primary text-primary-foreground font-bold rounded-xl mt-4"
          >
            Claim the COALESCE Crystal →
          </button>
        )}
        {safeDiv && !nullifApplied && (
          <p className="text-xs text-muted-foreground mt-2">
            (Set total_marks = 0 to see the real danger)
          </p>
        )}
      </StageWrapper>
    );
  };

  const COALESCE_SLOTS = [
    { value: "NULL",    label: "name (missing)",     canBeNull: true },
    { value: "NULL",    label: "nickname (missing)",  canBeNull: true },
    { value: "Student", label: "default value",       canBeNull: false },
  ];

  // Move a slot up to simulate reordering
  const moveUp = (idx: number) => {
    if (idx === 0) return;
    const next = [...coalesceOrder];
    [next[idx - 1], next[idx]] = [next[idx], next[idx - 1]];
    setCoalesceOrder(next);
    setCoalesceActivated(false);
  };

  const firstNonNull = coalesceOrder.find(v => v !== "NULL") ?? "NULL";

  const renderStage6 = () => (
    <StageWrapper>
      <h3 className="text-xl font-bold text-primary mb-1">💎 The COALESCE Crystal</h3>
      <p className="text-muted-foreground text-sm mb-4">
        When data is missing, COALESCE returns the first non-NULL value in the list.
        Arrange the order, then activate.
      </p>

      {/* Floating crystal slots */}
      <div className="space-y-2 w-full max-w-xs mb-6">
        {coalesceOrder.map((val, idx) => (
          <div key={idx}
            className={`flex items-center gap-3 p-3 rounded-xl border transition-all duration-500
              ${coalesceActivated && val === "NULL"
                ? "opacity-20 border-border"
                : coalesceActivated && val !== "NULL"
                  ? "border-yellow-500/60 bg-yellow-500/10 scale-105"
                  : "border-border"}`}
          >
            {/* Position badge */}
            <span className="text-xs font-mono text-muted-foreground w-4">{idx + 1}.</span>

            {/* Crystal visual */}
            <div className={`text-xl transition-all duration-500
              ${coalesceActivated && val !== "NULL" ? "animate-pulse" : ""}`}
            >
              {val === "NULL" ? "🌑" : "💎"}
            </div>

            <div className="flex-1">
              <div className={`font-mono text-sm font-bold
                ${val === "NULL" ? "text-slate-500" : "text-yellow-400"}`}
              >
                {val}
              </div>
              <div className="text-xs text-muted-foreground">
                {COALESCE_SLOTS[idx]?.label ?? "value"}
              </div>
            </div>

            {/* Move up button */}
            {!coalesceActivated && idx > 0 && (
              <button
                onClick={() => moveUp(idx)}
                className="text-xs px-2 py-1 border border-border rounded hover:border-primary text-muted-foreground hover:text-primary"
              >
                ↑
              </button>
            )}
          </div>
        ))}
      </div>

      {/* Formula */}
      <div className="font-mono text-xs bg-slate-900 rounded-xl px-4 py-3 mb-4 w-full max-w-xs">
        <span className="text-blue-400">COALESCE</span>(
        {coalesceOrder.map((v, i) => (
          <span key={i}>
            <span className={v === "NULL" ? "text-slate-500" : "text-yellow-300"}>
              {v === "NULL" ? "NULL" : `'${v}'`}
            </span>
            {i < coalesceOrder.length - 1 && <span className="text-white">, </span>}
          </span>
        ))}
        )
        {coalesceActivated && (
          <span className="text-green-400"> → '{firstNonNull}'</span>
        )}
      </div>

      {!coalesceActivated ? (
        <button
          onClick={() => setCoalesceActivated(true)}
          className="px-6 py-2 bg-primary text-primary-foreground font-bold rounded-xl font-mono text-sm"
        >
          💎 Activate COALESCE
        </button>
      ) : (
        <>
          <div className="text-yellow-400 font-bold text-sm mb-3">
            💎 First non-NULL found: '{firstNonNull}' — Data Restored!
          </div>
          <button
            onClick={() => { game.addXp(200, "💎 Data Healer"); game.nextStage(); }}
            className="px-8 py-3 bg-primary text-primary-foreground font-bold rounded-xl"
          >
            Face the Grand Evaluation →
          </button>
        </>
      )}
    </StageWrapper>
  );

  const renderStage7 = () => (
    <StageWrapper>
      <h3 className="text-xl font-bold text-primary mb-6">🧠 Wizard's Final Test</h3>
      <div className="w-full max-w-md space-y-4 mb-8">
        <QuizBlock
          question="Which condition order causes WRONG grade assignment: checking >= 50 before >= 90?"
          options={[
            { label: "No problem — all conditions still evaluate correctly",     value: "a" },
            { label: "marks = 95 would get Grade C instead of Grade A",          value: "b" },
            { label: "The ELSE block always executes",                           value: "c" },
          ]}
          correctValue="b"
          selectedValue={quizAnswer}
          onSelect={setQuizAnswer}
          correctFeedback="✅ Correct! IF marks >= 50 fires first for marks = 95 — it's TRUE, so Grade C is assigned. Always check more specific conditions first."
          wrongFeedback="❌ Hint: What does IF marks >= 50 return when marks = 95? The first matching condition wins — order matters!"
        />
      </div>
      {quizAnswer === "b" && (
        <button
          onClick={() => { game.addXp(150, "🧠 Conditional Wizard"); game.nextStage(); }}
          className="px-8 py-3 bg-primary text-primary-foreground font-bold rounded-xl animate-in zoom-in"
        >
          Claim Victory 👑
        </button>
      )}
    </StageWrapper>
  );

  const renderStage8 = () => (
    <CompletionScreen
      missionTitle="Logic Kingdom Restored! 🧙"
      missionSubtitle="You mastered all Four Ancient Powers and defeated data corruption."
      xp={game.xp}
      xpLog={game.xpLog}
      achievements={[
        { icon: <GitBranch className="size-4" />,    label: "Decision Initiate" },
        { icon: <Zap className="size-4" />,          label: "Nested Logic Master" },
        { icon: <Crown className="size-4" />,        label: "Branching Master" },
        { icon: <Shield className="size-4" />,       label: "Error Defender" },
        { icon: <Gem className="size-4" />,          label: "Data Healer" },
        { icon: <AlertTriangle className="size-4" />, label: "Conditional Wizard" },
      ]}
      concepts={[
        { label: "IF-THEN-ELSE",    description: "Evaluates conditions top-to-bottom; first TRUE branch executes." },
        { label: "Nested IF",       description: "Inner conditions only run when the outer condition is TRUE." },
        { label: "CASE",            description: "Maps fixed values to results — cleaner than IF chains for known options." },
        { label: "NULLIF(a, b)",    description: "Returns NULL when a = b, preventing division-by-zero errors." },
        { label: "COALESCE",        description: "Returns the first non-NULL value in a list — rescues missing data." },
      ]}
      onReset={game.reset}
    />
  );

  return (
    <SimShell
      title="Logic Kingdom"
      subtitle="Quest of the Conditional Wizard"
      xp={game.xp}
      stage={game.stage}
      totalStages={TOTAL_STAGES}
      mistakeMessage={game.mistakeMessage}
      successMessage={game.successMessage}
      icon={<GitBranch className="size-5 text-primary" />}
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
