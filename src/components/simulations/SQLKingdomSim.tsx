import { useState } from "react";
import { Swords } from "lucide-react";
import {
  useSimGame,
  SimShell,
  StageWrapper,
  QuizBlock,
  CompletionScreen,
} from "@/components/simulations/shared";

// ── Constants ─────────────────────────────────────────────────────────────────
const TOTAL_STAGES = 8; 

export function SQLKingdomSim() {
  const game = useSimGame(TOTAL_STAGES, () => {
    setDragAnswer(null);
    setQuizAnswer(null);
    setGradeQuiz(null);
    setBossQuiz(null);
    setTimeQuiz(null);
    setBlocks([]);
    setSortedItems([
      { id: "Calculate grade", bucket: null },
      { id: "Update marks",    bucket: null },
      { id: "Get average",     bucket: null },
      { id: "Delete record",   bucket: null },
    ]);
  });

  // ── Local state ───────────────────────────────────────────────────────────────
  const [dragAnswer, setDragAnswer] = useState<string | null>(null);
  const [quizAnswer, setQuizAnswer] = useState<string | null>(null);
  const [timeQuiz, setTimeQuiz] = useState<string | null>(null);
  const [blocks, setBlocks] = useState<string[]>([]);
  const [sortedItems, setSortedItems] = useState<{ id: string; bucket: "function" | "procedure" | null }[]>([
    { id: "Calculate grade", bucket: null },
    { id: "Update marks",    bucket: null },
    { id: "Get average",     bucket: null },
    { id: "Delete record",   bucket: null },
  ]);
  const [gradeQuiz, setGradeQuiz] = useState<string | null>(null);
  const [bossQuiz,  setBossQuiz]  = useState<string | null>(null);

  // ── Stage renderers ───────────────────────────────────────────────────────

  const renderStage1 = () => (
    <StageWrapper>
      <div className="text-center mb-6 max-w-xl">
        <h2 className="text-3xl font-bold text-primary mb-2">⚡ The Broken Spell Lab</h2>
        <p className="text-muted-foreground">
          A function without a <code className="bg-muted px-1 rounded">RETURN</code> is like a spell with no outcome.
          It must always give something back!
        </p>
      </div>
  
      {/* Animated spell scroll */}
      <div className="w-full max-w-md bg-muted rounded-2xl p-5 mb-6 font-mono text-sm space-y-1 border border-border">
        <p className="text-green-400">CREATE FUNCTION GetGrade(marks IN NUMBER)</p>
        <p className="text-green-400">RETURN VARCHAR2 IS</p>
        <p className="text-green-400">  grade VARCHAR2(2);</p>
        <p className="text-green-400">BEGIN</p>
        <p className="text-yellow-400">  IF marks &gt;= 90 THEN grade := 'A'; END IF;</p>
        <p className="text-red-400 animate-pulse">  -- ❌ Missing RETURN statement!</p>
        <p className="text-green-400">END;</p>
      </div>
  
      <p className="text-sm text-muted-foreground mb-4">Select the correct missing line to fix the spell:</p>
  
      <div className="flex flex-col gap-3 w-full max-w-xs mb-6">
        {[
          { label: "RETURN grade;",   value: "correct" },
          { label: "PRINT grade;",    value: "wrong1"  },
          { label: "END grade;",      value: "wrong2"  },
        ].map(opt => (
          <button
            key={opt.value}
            onClick={() => setDragAnswer(opt.value)}
            className={`px-5 py-3 rounded-xl border font-mono text-sm transition-all
              ${dragAnswer === opt.value
                ? opt.value === "correct"
                  ? "bg-green-500/20 border-green-500 text-green-400"
                  : "bg-red-500/20 border-red-500 text-red-400"
                : "border-border hover:border-primary"}`}
          >
            {opt.label}
          </button>
        ))}
      </div>
  
      {dragAnswer === "correct" && (
        <div className="flex flex-col items-center gap-4 animate-in zoom-in">
          <p className="text-green-400 font-bold">✨ Spell Restored! +100 Mana</p>
          <div className="w-16 h-16 rounded-full bg-yellow-400/20 border-2 border-yellow-400 flex items-center justify-center text-2xl animate-pulse">🔮</div>
          <button
            onClick={() => { game.addXp(100, "🔮 Spell Restored"); game.nextStage(); }}
            className="px-8 py-3 bg-primary text-primary-foreground font-bold rounded-xl"
          >
            Enter the Arena →
          </button>
        </div>
      )}
  
      {dragAnswer && dragAnswer !== "correct" && (
        <p className="text-red-400 text-sm">❌ The spell still fizzles… try again.</p>
      )}
    </StageWrapper>
  );

  const renderStage2 = () => {
    const allSorted = sortedItems.every(i => i.bucket !== null);
    const correct =
      sortedItems.find(i => i.id === "Calculate grade")?.bucket === "function" &&
      sortedItems.find(i => i.id === "Get average")?.bucket === "function" &&
      sortedItems.find(i => i.id === "Update marks")?.bucket === "procedure" &&
      sortedItems.find(i => i.id === "Delete record")?.bucket === "procedure";
  
    const assign = (id: string, bucket: "function" | "procedure") =>
      setSortedItems(prev => prev.map(i => i.id === id ? { ...i, bucket } : i));
  
    return (
      <StageWrapper>
        <div className="text-center mb-6 max-w-md">
          <h3 className="text-xl font-bold text-primary mb-1">⚔️ Function vs Procedure Arena</h3>
          <p className="text-muted-foreground text-sm">
            Functions return values and work inside queries. Procedures perform actions but stand alone.
          </p>
        </div>
  
        {/* Warriors */}
        <div className="flex gap-8 mb-8">
          <div className="flex flex-col items-center gap-2">
            <div className="text-4xl">🧙</div>
            <span className="text-xs font-bold text-primary">Function Mage</span>
            <span className="text-xs text-muted-foreground">Returns a value 🔮</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <div className="text-4xl">🛠</div>
            <span className="text-xs font-bold text-yellow-500">Procedure Warrior</span>
            <span className="text-xs text-muted-foreground">Performs actions ⚙️</span>
          </div>
        </div>
  
        {/* Sort zone */}
        <p className="text-sm text-muted-foreground mb-4">Assign each action to its correct type:</p>
        <div className="w-full max-w-lg space-y-3 mb-6">
          {sortedItems.map(item => (
            <div key={item.id} className="flex items-center gap-3">
              <span className="w-36 text-sm font-mono">{item.id}</span>
              <button
                onClick={() => assign(item.id, "function")}
                className={`px-3 py-1 rounded-lg text-xs border transition-all
                  ${item.bucket === "function" ? "bg-primary/20 border-primary text-primary" : "border-border hover:border-primary"}`}
              >🧙 Function</button>
              <button
                onClick={() => assign(item.id, "procedure")}
                className={`px-3 py-1 rounded-lg text-xs border transition-all
                  ${item.bucket === "procedure" ? "bg-yellow-500/20 border-yellow-500 text-yellow-500" : "border-border hover:border-yellow-500"}`}
              >🛠 Procedure</button>
            </div>
          ))}
        </div>
  
        {allSorted && (
          correct ? (
            <div className="flex flex-col items-center gap-3 animate-in zoom-in">
              <p className="text-green-400 font-bold">🏆 You have identified the true nature of SQL entities!</p>
              <button
                onClick={() => { game.addXp(150, "⚔️ Arena Champion"); game.nextStage(); }}
                className="px-8 py-3 bg-primary text-primary-foreground font-bold rounded-xl"
              >Open the SELECT Portal →</button>
            </div>
          ) : (
            <p className="text-red-400 text-sm">❌ Some assignments are wrong — reconsider and try again.</p>
          )
        )}
      </StageWrapper>
    );
  };

  const renderStage3 = () => (
    <StageWrapper>
      <div className="text-center mb-6 max-w-md">
        <h3 className="text-xl font-bold text-primary mb-1">🧠 The SELECT Portal</h3>
        <p className="text-muted-foreground text-sm">
          Functions run row-by-row inside SELECT. They must be safe, deterministic, and return a single value.
        </p>
      </div>
  
      {/* Pipeline visualization */}
      <div className="w-full max-w-lg bg-muted rounded-2xl p-5 mb-6">
        <p className="text-xs text-muted-foreground mb-3 uppercase tracking-widest">Query Pipeline</p>
        <div className="flex items-center gap-2 flex-wrap font-mono text-sm">
          <span className="bg-blue-500/20 text-blue-400 px-3 py-1 rounded">SELECT</span>
          <span className="text-muted-foreground">Name,</span>
          <span className="bg-yellow-500/20 text-yellow-400 px-3 py-1 rounded animate-pulse">GetGrade(Marks)</span>
          <span className="text-muted-foreground">FROM STUDENT</span>
        </div>
        <div className="mt-4 space-y-2">
          {[
            { name: "Alice", marks: 92, grade: "A" },
            { name: "Bob",   marks: 78, grade: "B" },
            { name: "Carol", marks: 65, grade: "C" },
          ].map(row => (
            <div key={row.name} className="flex items-center gap-4 text-sm">
              <span className="w-16">{row.name}</span>
              <span className="text-muted-foreground">Marks: {row.marks}</span>
              <span className="text-muted-foreground">→</span>
              <span className="text-yellow-400 font-bold">GetGrade({row.marks})</span>
              <span className="text-muted-foreground">→</span>
              <span className="text-green-400 font-bold">"{row.grade}"</span>
            </div>
          ))}
        </div>
      </div>
  
      <QuizBlock
        question="Can a function be used directly inside a SELECT statement?"
        options={[
          { label: "Yes — functions return values usable as columns", value: "yes" },
          { label: "No — only procedures can be called in queries",    value: "no"  },
          { label: "Only aggregate functions like SUM or AVG",         value: "agg" },
        ]}
        correctValue="yes"
        selectedValue={quizAnswer}
        onSelect={setQuizAnswer}
        correctFeedback="✅ Exactly! User-defined functions that return values plug right into SELECT."
        wrongFeedback="❌ Remember — functions RETURN values, making them usable as expressions in SELECT."
      />
  
      {quizAnswer === "yes" && (
        <button
          onClick={() => { game.addXp(100, "📊 Portal Insights"); game.nextStage(); }}
          className="mt-6 px-8 py-3 bg-primary text-primary-foreground font-bold rounded-xl animate-in zoom-in"
        >
          Forge a Spell →
        </button>
      )}
    </StageWrapper>
  );

  const renderStage4 = () => {
    const CORRECT_ORDER = ["SELECT AVG(Marks)", "WHERE Roll_No = p_roll", "RETURN result"];
    const OPTIONS = ["RETURN result", "WHERE Roll_No = p_roll", "SELECT AVG(Marks)", "DROP TABLE Marks"];
    const isCorrect = JSON.stringify(blocks) === JSON.stringify(CORRECT_ORDER);
  
    return (
      <StageWrapper>
        <div className="text-center mb-6 max-w-md">
          <h3 className="text-xl font-bold text-primary mb-1">🧪 Build GetAverageMarks</h3>
          <p className="text-muted-foreground text-sm">
            Arrange the spell blocks in the correct order to compute a student's average marks.
          </p>
        </div>
  
        {/* Drop zone */}
        <div className="w-full max-w-sm bg-muted rounded-2xl p-4 mb-4 min-h-[120px] border-2 border-dashed border-border">
          <p className="text-xs text-muted-foreground mb-2 uppercase tracking-widest">Your Spell</p>
          {blocks.length === 0 && <p className="text-muted-foreground text-sm">Click blocks below to add them…</p>}
          {blocks.map((b, i) => (
            <div key={i} className="flex items-center gap-2 font-mono text-sm text-primary mb-1">
              <span className="text-muted-foreground">{i + 1}.</span> {b}
            </div>
          ))}
          {blocks.length > 0 && (
            <button onClick={() => setBlocks([])} className="text-xs text-red-400 mt-2 underline">Clear</button>
          )}
        </div>
  
        {/* Options */}
        <div className="flex flex-wrap gap-2 justify-center mb-6">
          {OPTIONS.filter(o => !blocks.includes(o)).map(opt => (
            <button
              key={opt}
              onClick={() => setBlocks(prev => [...prev, opt])}
              className="px-3 py-2 rounded-lg font-mono text-xs border border-border hover:border-primary transition-all"
            >
              {opt}
            </button>
          ))}
        </div>
  
        {isCorrect && (
          <div className="flex flex-col items-center gap-3 animate-in zoom-in">
            <p className="text-green-400 font-bold">🧙 Function Crafted Successfully! Aggregation crystal activated!</p>
            <button
              onClick={() => { game.addXp(150, "🧪 Spell Forger"); game.nextStage(); }}
              className="px-8 py-3 bg-primary text-primary-foreground font-bold rounded-xl"
            >
              Enter the Grade Oracle →
            </button>
          </div>
        )}
        {blocks.length === CORRECT_ORDER.length && !isCorrect && (
          <p className="text-red-400 text-sm">❌ Spell unstable — wrong order. Clear and retry.</p>
        )}
      </StageWrapper>
    );
  };

  const renderStage5 = () => (
    <StageWrapper>
      <div className="text-center mb-6 max-w-md">
        <h3 className="text-xl font-bold text-primary mb-1">🎓 The Grade Oracle</h3>
        <p className="text-muted-foreground text-sm">
          Decision logic inside functions maps numeric ranges to categorical outcomes.
        </p>
      </div>
  
      {/* Grade machine visualization */}
      <div className="w-full max-w-sm bg-muted rounded-2xl p-4 mb-6 font-mono text-xs space-y-1">
        {[
          { range: "≥ 90", grade: "A", color: "text-green-400"  },
          { range: "≥ 80", grade: "B", color: "text-blue-400"   },
          { range: "≥ 70", grade: "C", color: "text-yellow-400" },
          { range: "≥ 60", grade: "D", color: "text-orange-400" },
          { range: "< 60",  grade: "F", color: "text-red-400"   },
        ].map(row => (
          <div key={row.grade} className="flex items-center gap-3">
            <span className="w-12 text-muted-foreground">{row.range}</span>
            <span className="text-muted-foreground">→</span>
            <span className={`font-bold ${row.color}`}>Grade {row.grade}</span>
          </div>
        ))}
      </div>
  
      <QuizBlock
        question="A student scores 73. Which grade does the Oracle return?"
        options={[
          { label: "A", value: "A" },
          { label: "B", value: "B" },
          { label: "C", value: "C" },
          { label: "D", value: "D" },
        ]}
        correctValue="C"
        selectedValue={gradeQuiz}
        onSelect={setGradeQuiz}
        correctFeedback="✅ Correct! 73 falls in the ≥ 70 range → Grade C."
        wrongFeedback="❌ Recheck the ranges — 73 is ≥ 70 but < 80."
      />
  
      {gradeQuiz === "C" && (
        <button
          onClick={() => { game.addXp(150, "🎖 Grade Oracle"); game.nextStage(); }}
          className="mt-6 px-8 py-3 bg-primary text-primary-foreground font-bold rounded-xl animate-in zoom-in"
        >
          Visit the Time Wizard →
        </button>
      )}
    </StageWrapper>
  );

  const renderStage6 = () => (
    <StageWrapper>
      <div className="text-center mb-6 max-w-md">
        <h3 className="text-xl font-bold text-primary mb-1">⏳ Time Wizard – Age Calculator</h3>
        <p className="text-muted-foreground text-sm">
          Functions can compute dynamic values using built-in date functions like <code className="bg-muted px-1 rounded">SYSDATE</code>.
        </p>
      </div>
  
      {/* Clock animation */}
      <div className="w-full max-w-sm bg-muted rounded-2xl p-5 mb-6 font-mono text-sm space-y-2">
        <p className="text-muted-foreground">DOB → <span className="text-yellow-400">01-JAN-2000</span></p>
        <p className="text-muted-foreground">SYSDATE → <span className="text-blue-400">TODAY</span></p>
        <p className="text-muted-foreground">Calculation →</p>
        <p className="text-green-400 animate-pulse font-bold pl-4">
          FLOOR(MONTHS_BETWEEN(SYSDATE, DOB) / 12)
        </p>
        <p className="text-muted-foreground">Returns → <span className="text-green-400 font-bold">25 years</span></p>
      </div>
  
      <QuizBlock
        question="What does MONTHS_BETWEEN(SYSDATE, DOB) / 12 calculate?"
        options={[
          { label: "The student's age in months",      value: "months" },
          { label: "The student's age in years",       value: "years"  },
          { label: "The difference in days",           value: "days"   },
        ]}
        correctValue="years"
        selectedValue={timeQuiz}
        onSelect={setTimeQuiz}
        correctFeedback="✅ Dividing months by 12 gives age in years. FLOOR rounds it down."
        wrongFeedback="❌ MONTHS_BETWEEN gives months — dividing by 12 converts to years."
      />
  
      {timeQuiz === "years" && (
        <button
          onClick={() => { game.addXp(150, "⌛ Time Master"); game.nextStage(); }}
          className="mt-6 px-8 py-3 bg-primary text-primary-foreground font-bold rounded-xl animate-in zoom-in"
        >
          Face the Final Boss →
        </button>
      )}
    </StageWrapper>
  );

  const renderStage7 = () => (
    <StageWrapper>
      <div className="text-center mb-6 max-w-md">
        <h3 className="text-xl font-bold text-primary mb-1">👑 The King's Trial</h3>
        <p className="text-muted-foreground text-sm">
          Assemble the ultimate query combining all three functions. The King watches.
        </p>
      </div>
  
      {/* Target query display */}
      <div className="w-full max-w-lg bg-muted rounded-2xl p-5 mb-6 font-mono text-sm">
        <p className="text-muted-foreground mb-2 text-xs uppercase">Target Query</p>
        <p><span className="text-blue-400">SELECT</span> Name,</p>
        <p className="pl-4 text-yellow-400">GetGrade(Marks),</p>
        <p className="pl-4 text-green-400">GetAverageMarks(Roll_No),</p>
        <p className="pl-4 text-purple-400">GetAge(DOB)</p>
        <p><span className="text-blue-400">FROM</span> STUDENT</p>
        <p><span className="text-blue-400">JOIN</span> MARKS <span className="text-blue-400">USING</span>(Roll_No);</p>
      </div>
  
      <QuizBlock
        question="Why can GetGrade(), GetAverageMarks(), and GetAge() all appear in the same SELECT?"
        options={[
          { label: "Because they are procedures that modify the table",        value: "a" },
          { label: "Because they each return a single value usable as a column", value: "b" },
          { label: "Because SELECT allows any SQL statement inside it",         value: "c" },
        ]}
        correctValue="b"
        selectedValue={bossQuiz}
        onSelect={setBossQuiz}
        correctFeedback="✅ The King is pleased! Functions that return scalar values slot perfectly as derived columns."
        wrongFeedback="❌ Remember — only entities that RETURN a value can appear in SELECT expressions."
      />
  
      {bossQuiz === "b" && (
        <div className="flex flex-col items-center gap-4 mt-6 animate-in zoom-in">
          <p className="text-yellow-400 font-bold text-lg">👑 The King crowns you Master of Returned Truths!</p>
          <button
            onClick={() => { game.addXp(300, "👑 Function Master"); game.nextStage(); }}
            className="px-8 py-3 bg-primary text-primary-foreground font-bold rounded-xl"
          >
            Claim Your Crown →
          </button>
        </div>
      )}
    </StageWrapper>
  );

  const renderStage8 = () => (
    <CompletionScreen
      missionTitle="SQLia Restored! 🎉"
      missionSubtitle="You mastered Function Magic and returned order to the Kingdom of SQLia."
      xp={game.xp}
      xpLog={game.xpLog}
      achievements={[
        { icon: <span>🔮</span>, label: "Spell Apprentice"    },
        { icon: <span>⚔️</span>, label: "Procedure Challenger" },
        { icon: <span>📊</span>, label: "Portal Navigator"     },
        { icon: <span>🧪</span>, label: "Spell Forger"         },
        { icon: <span>⌛</span>, label: "Time Master"           },
        { icon: <span>👑</span>, label: "Function Master"       },
      ]}
      concepts={[
        { label: "Functions must RETURN",      description: "Every SQL function must end with a RETURN statement that sends a value back to the caller." },
        { label: "Functions in SELECT",        description: "User-defined functions that return scalar values can be used directly as columns in a SELECT query." },
        { label: "Functions vs Procedures",    description: "Functions return values and can be embedded in expressions; procedures perform actions and stand alone." },
        { label: "Row-by-row execution",       description: "Functions in SELECT run once per row — poorly designed functions can significantly slow down queries." },
        { label: "Date computation",           description: "MONTHS_BETWEEN and SYSDATE allow functions to dynamically calculate time-based values like age." },
      ]}
      onReset={game.reset}
    />
  );


  // ── Render ────────────────────────────────────────────────────────────────
  return (
    <SimShell
      title="SQL Kingdom"
      subtitle="The Return of the Function Mage"
      xp={game.xp}
      stage={game.stage}
      totalStages={TOTAL_STAGES}
      mistakeMessage={game.mistakeMessage}
      successMessage={game.successMessage}
      icon={<span className="text-primary text-lg">🧙</span>}
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