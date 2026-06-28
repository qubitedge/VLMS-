import { useState } from "react";
import { Zap, Clock, Search, Wrench, Crown, Database, Swords } from "lucide-react";
import {
  useSimGame,
  SimShell,
  StageWrapper,
  QuizBlock,
  CompletionScreen,
} from "@/components/simulations/shared";

// ── Constants ─────────────────────────────────────────────────────────────────
const TOTAL_STAGES = 7; 

export function DBMSDatacitySim() {
  const game = useSimGame(TOTAL_STAGES, () => {
    setConversionState({ number: false, string: false, date: false });
    setStringTasks({ initcap: false, trim: false, lpad: false, substr: false, instr: false });
    setEmailExtracted(false);
    setDateTasks({ current: false, age: false, format: false });
    setQuizAnswer(null);
    setBossQuery({ name: false, email: false, rollno: false, age: false });
  });

  // Stage 2 – Conversion
  const [conversionState, setConversionState] = useState({
    number: false, string: false, date: false,
  });

  // Stage 3 – String functions
  const [stringTasks, setStringTasks] = useState({
    initcap: false, trim: false, lpad: false, substr: false, instr: false,
  });

  // Stage 4 – Email lab
  const [emailExtracted, setEmailExtracted] = useState(false);
  const [emailStep, setEmailStep] = useState<"none" | "instr" | "substr">("none");

  // Stage 5 – Date tower
  const [dateTasks, setDateTasks] = useState({
    current: false, age: false, format: false,
  });

  // Stage 6 – Mini quiz
  const [quizAnswer, setQuizAnswer] = useState<string | null>(null);

  // Stage 7 – Boss
  const [bossQuery, setBossQuery] = useState({
    name: false, email: false, rollno: false, age: false,
  });

  const renderStage1 = () => (
    <StageWrapper>
      <div className="text-center mb-8 max-w-xl">
        <h2 className="text-3xl font-bold text-primary mb-2">
          🌆 Data City: The Function Heist
        </h2>
        <p className="text-muted-foreground text-base leading-relaxed">
          You are a <strong>Data Agent</strong> inside a cyber-city where all information flows
          through databases. Corrupted data is breaking systems everywhere. Master{" "}
          <strong>Conversion</strong>, <strong>String</strong>, and{" "}
          <strong>Date Functions</strong> to restore each district.
        </p>
      </div>
  
      {/* City map visual — 4 glowing district tiles */}
      <div className="grid grid-cols-2 gap-3 mb-8">
        {[
          { icon: "🧬", label: "Conversion Center", color: "border-blue-500/40 bg-blue-500/10" },
          { icon: "🧹", label: "String District",   color: "border-green-500/40 bg-green-500/10" },
          { icon: "🕵️", label: "Email Intel Lab",  color: "border-yellow-500/40 bg-yellow-500/10" },
          { icon: "⏳", label: "Time Tower",        color: "border-purple-500/40 bg-purple-500/10" },
        ].map(d => (
          <div key={d.label}
            className={`flex flex-col items-center justify-center p-4 rounded-xl border ${d.color} opacity-60`}
          >
            <span className="text-2xl mb-1">{d.icon}</span>
            <span className="text-xs font-semibold text-muted-foreground">{d.label}</span>
            <span className="text-xs text-destructive font-mono mt-1">⚠ OFFLINE</span>
          </div>
        ))}
      </div>
  
      <button
        onClick={() => { game.addXp(50, "🌆 Data Agent Recruited"); game.nextStage(); }}
        className="px-8 py-3 bg-primary text-primary-foreground font-bold rounded-xl flex items-center gap-2"
      >
        <Swords className="size-5" /> Begin the Heist
      </button>
    </StageWrapper>
  );

  const CONVERSIONS = [
    {
      key: "string",
      input: "12345",
      inputType: "NUMBER",
      fn: "TO_CHAR(12345)",
      output: "'12345'",
      outputType: "STRING",
      color: "bg-blue-500",
    },
    {
      key: "number",
      input: "'98.6'",
      inputType: "STRING",
      fn: "TO_NUMBER('98.6')",
      output: "98.6",
      outputType: "NUMBER",
      color: "bg-green-500",
    },
    {
      key: "date",
      input: "'2025-06-10'",
      inputType: "STRING",
      fn: "TO_DATE('2025-06-10', 'YYYY-MM-DD')",
      output: "10-JUN-25",
      outputType: "DATE",
      color: "bg-purple-500",
    },
  ];
  
  const allConverted = Object.values(conversionState).every(Boolean);
  
  const renderStage2 = () => (
    <StageWrapper>
      <h3 className="text-xl font-bold text-primary mb-1">🧬 Conversion Control Center</h3>
      <p className="text-muted-foreground text-sm mb-6">
        Data must match the expected type to pass through each gate. Apply the right conversion function.
      </p>
  
      {/* Error banner — disappears as all are fixed */}
      {!allConverted && (
        <div className="bg-destructive/10 border border-destructive/40 text-destructive text-xs font-mono
                        rounded-lg px-4 py-2 mb-6 animate-pulse">
          ⚠ TYPE MISMATCH ERROR — {Object.values(conversionState).filter(Boolean).length}/3 gates stable
        </div>
      )}
  
      <div className="space-y-3 w-full max-w-md mb-6">
        {CONVERSIONS.map(({ key, input, fn, output, outputType, color }) => {
          const done = conversionState[key as keyof typeof conversionState];
          return (
            <div key={key}
              className={`flex items-center gap-3 p-3 rounded-xl border transition-all duration-500
                ${done ? "border-green-500/40 bg-green-500/5" : "border-border"}`}
            >
              {/* Input */}
              <div className="font-mono text-xs bg-slate-900 text-blue-300 px-3 py-1 rounded-lg">
                {input}
              </div>
              <span className="text-muted-foreground text-xs">→</span>
  
              {/* Function button */}
              <button
                disabled={done}
                onClick={() => setConversionState(s => ({ ...s, [key]: true }))}
                className={`font-mono text-xs px-3 py-1 rounded-lg border transition-all
                  ${done
                    ? "bg-green-500/20 border-green-500/40 text-green-400 cursor-default"
                    : `${color} text-white border-transparent hover:opacity-90 cursor-pointer`}`}
              >
                {done ? "✓ Applied" : fn}
              </button>
  
              <span className="text-muted-foreground text-xs">→</span>
  
              {/* Output — revealed after click */}
              <div className={`font-mono text-xs px-3 py-1 rounded-lg transition-all duration-500
                ${done ? "bg-slate-900 text-green-300" : "bg-slate-900 text-slate-600"}`}
              >
                {done ? output : "???"}
              </div>
            </div>
          );
        })}
      </div>
  
      {allConverted && (
        <>
          <div className="text-green-400 font-bold text-sm mb-4">✅ SYSTEM STABILIZED</div>
          <button
            onClick={() => { game.addXp(100, "🧬 Data Transformer"); game.nextStage(); }}
            className="px-8 py-3 bg-primary text-primary-foreground font-bold rounded-xl"
          >
            Next District →
          </button>
        </>
      )}
    </StageWrapper>
  );

  const STRING_TASKS = [
    {
      key: "initcap",
      fn: "INITCAP(name)",
      before: "john DOE",
      after: "John Doe",
      desc: "Fix name casing",
      icon: "🔤",
    },
    {
      key: "trim",
      fn: "TRIM(name)",
      before: "  Aria  ",
      after: "Aria",
      desc: "Remove extra spaces",
      icon: "✂️",
    },
    {
      key: "lpad",
      fn: "LPAD(roll, 5, '0')",
      before: "45",
      after: "00045",
      desc: "Pad roll number",
      icon: "🔢",
    },
    {
      key: "substr",
      fn: "SUBSTR(name, 1, 4)",
      before: "Alexandra",
      after: "Alex",
      desc: "Extract first 4 chars",
      icon: "✂️",
    },
    {
      key: "instr",
      fn: "INSTR(email, '@')",
      before: "user@data.com",
      after: "Position: 5",
      desc: "Find @ symbol",
      icon: "🔍",
    },
  ];
  
  const allStringsDone = Object.values(stringTasks).every(Boolean);
  
  const renderStage3 = () => (
    <StageWrapper>
      <h3 className="text-xl font-bold text-primary mb-1">🧹 String Manipulation District</h3>
      <p className="text-muted-foreground text-sm mb-6">
        Real data is messy. Use string functions to clean, reshape, and analyze text.
      </p>
  
      <div className="space-y-2 w-full max-w-md mb-6">
        {STRING_TASKS.map(({ key, fn, before, after, desc, icon }, idx) => {
          const done = stringTasks[key as keyof typeof stringTasks];
          // Only show if previous is done (sequential unlock)
          const unlocked = idx === 0 || Object.values(stringTasks)[idx - 1];
  
          return (
            <div key={key}
              className={`p-3 rounded-xl border transition-all duration-500
                ${!unlocked ? "opacity-30 pointer-events-none border-border" :
                  done ? "border-green-500/40 bg-green-500/5" : "border-border"}`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-muted-foreground">{icon} {desc}</span>
                {done && <span className="text-green-400 text-xs font-bold">✓ Fixed</span>}
              </div>
              <div className="flex items-center gap-2">
                <code className="text-xs bg-slate-900 text-yellow-300 px-2 py-1 rounded">
                  {before}
                </code>
                <span className="text-muted-foreground text-xs">→</span>
                <button
                  disabled={done || !unlocked}
                  onClick={() => setStringTasks(s => ({ ...s, [key]: true }))}
                  className={`text-xs font-mono px-3 py-1 rounded-lg border transition-all
                    ${done
                      ? "border-transparent bg-transparent text-muted-foreground cursor-default"
                      : "bg-primary text-primary-foreground border-primary hover:opacity-90 cursor-pointer"}`}
                >
                  {fn}
                </button>
                <span className="text-muted-foreground text-xs">→</span>
                <code className={`text-xs px-2 py-1 rounded transition-all
                  ${done ? "bg-slate-900 text-green-300" : "bg-slate-900 text-slate-600"}`}
                >
                  {done ? after : "?"}
                </code>
              </div>
            </div>
          );
        })}
      </div>
  
      {allStringsDone && (
        <button
          onClick={() => { game.addXp(150, "🧹 String Cleaner"); game.nextStage(); }}
          className="px-8 py-3 bg-primary text-primary-foreground font-bold rounded-xl"
        >
          District Restored ✅ →
        </button>
      )}
    </StageWrapper>
  );

  const EMAIL = "student123@gmail.com";

const renderStage4 = () => {
  const instrPos = EMAIL.indexOf("@") + 1; // 11
  const domain = EMAIL.slice(instrPos);    // "gmail.com"

  return (
    <StageWrapper>
      <h3 className="text-xl font-bold text-primary mb-1">🕵️ Email Intelligence Lab</h3>
      <p className="text-muted-foreground text-sm mb-6">
        Combine INSTR and SUBSTR to extract the domain from an email address.
      </p>

      {/* Email display with highlight */}
      <div className="font-mono text-lg bg-slate-900 text-white px-6 py-4 rounded-xl mb-6 tracking-wide">
        {EMAIL.split("").map((char, i) => (
          <span key={i}
            className={`transition-all duration-300
              ${emailStep === "instr" && char === "@" ? "text-yellow-400 font-black scale-110 inline-block" :
                emailStep === "substr" && i >= instrPos ? "text-green-400 font-bold" :
                "text-slate-300"}`}
          >
            {char}
          </span>
        ))}
      </div>

      {/* Step 1: INSTR */}
      <div className="w-full max-w-md space-y-3 mb-6">
        <div className={`p-3 rounded-xl border transition-all
          ${emailStep !== "none" ? "border-yellow-500/40 bg-yellow-500/5" : "border-border"}`}
        >
          <div className="text-xs text-muted-foreground mb-2">Step 1 — Find the @ symbol</div>
          <div className="flex items-center gap-2">
            <code className="text-xs bg-slate-900 text-yellow-300 px-3 py-1 rounded">
              INSTR('{EMAIL}', '@')
            </code>
            {emailStep !== "none" && (
              <span className="text-yellow-400 font-mono text-xs">→ {instrPos}</span>
            )}
          </div>
          {emailStep === "none" && (
            <button
              onClick={() => setEmailStep("instr")}
              className="mt-2 text-xs px-4 py-1 bg-yellow-500 text-black font-bold rounded-lg"
            >
              Run INSTR
            </button>
          )}
        </div>

        {/* Step 2: SUBSTR — unlocks after INSTR */}
        <div className={`p-3 rounded-xl border transition-all
          ${emailStep === "substr" ? "border-green-500/40 bg-green-500/5" :
            emailStep === "instr" ? "border-border" : "border-border opacity-30"}`}
        >
          <div className="text-xs text-muted-foreground mb-2">Step 2 — Extract domain</div>
          <div className="flex items-center gap-2">
            <code className="text-xs bg-slate-900 text-green-300 px-3 py-1 rounded">
              SUBSTR('{EMAIL}', {instrPos})
            </code>
            {emailStep === "substr" && (
              <span className="text-green-400 font-mono text-xs font-bold">→ '{domain}'</span>
            )}
          </div>
          {emailStep === "instr" && (
            <button
              onClick={() => { setEmailStep("substr"); setEmailExtracted(true); }}
              className="mt-2 text-xs px-4 py-1 bg-green-500 text-black font-bold rounded-lg"
            >
              Run SUBSTR
            </button>
          )}
        </div>
      </div>

      {emailExtracted && (
        <>
          <div className="text-green-400 font-bold text-sm mb-3">
            🔍 DOMAIN DETECTED: {domain}
          </div>
          <button
            onClick={() => { game.addXp(150, "🕵️ Data Detective"); game.nextStage(); }}
            className="px-8 py-3 bg-primary text-primary-foreground font-bold rounded-xl"
          >
            Continue →
          </button>
        </>
      )}
    </StageWrapper>
  );
};
const TODAY = "2025-06-10";
const DOB   = "2003-06-10";
const AGE   = 22; // JULIANDAY difference simplified

const DATE_TASKS = [
  {
    key: "current",
    fn: "DATE('now')",
    result: TODAY,
    desc: "Get today's date",
    icon: "📅",
  },
  {
    key: "age",
    fn: `CAST((JULIANDAY('now') - JULIANDAY('${DOB}')) / 365 AS INT)`,
    result: `${AGE} years`,
    desc: "Calculate age from DOB",
    icon: "🎂",
  },
  {
    key: "format",
    fn: `STRFTIME('%d-%m-%Y', '${TODAY}')`,
    result: "10-06-2025",
    desc: "Format date string",
    icon: "🗓️",
  },
];

const allDatesDone = Object.values(dateTasks).every(Boolean);

const renderStage5 = () => (
  <StageWrapper>
    <h3 className="text-xl font-bold text-primary mb-1">⏳ Time Control Tower</h3>
    <p className="text-muted-foreground text-sm mb-6">
      Date functions let you measure time, calculate differences, and format dates.
    </p>

    {/* Clock visual */}
    <div className={`text-6xl mb-6 transition-all duration-1000
      ${allDatesDone ? "animate-none" : "animate-spin"}`}
      style={{ animationDuration: "4s" }}
    >
      🕐
    </div>

    <div className="space-y-3 w-full max-w-md mb-6">
      {DATE_TASKS.map(({ key, fn, result, desc, icon }, idx) => {
        const done = dateTasks[key as keyof typeof dateTasks];
        const unlocked = idx === 0 || Object.values(dateTasks)[idx - 1];

        return (
          <div key={key}
            className={`p-3 rounded-xl border transition-all
              ${!unlocked ? "opacity-30 pointer-events-none border-border" :
                done ? "border-purple-500/40 bg-purple-500/5" : "border-border"}`}
          >
            <div className="text-xs text-muted-foreground mb-2">{icon} {desc}</div>
            <div className="flex items-center gap-2 flex-wrap">
              <code className="text-xs bg-slate-900 text-purple-300 px-3 py-1 rounded">
                {fn}
              </code>
              <button
                disabled={done || !unlocked}
                onClick={() => setDateTasks(s => ({ ...s, [key]: true }))}
                className={`text-xs px-3 py-1 rounded-lg font-bold transition-all
                  ${done ? "hidden" : "bg-purple-500 text-white hover:opacity-90 cursor-pointer"}`}
              >
                Execute
              </button>
              {done && (
                <span className="text-purple-300 font-mono text-xs">→ {result} ✓</span>
              )}
            </div>
          </div>
        );
      })}
    </div>

    {allDatesDone && (
      <button
        onClick={() => { game.addXp(200, "⏳ Time Master"); game.nextStage(); }}
        className="px-8 py-3 bg-primary text-primary-foreground font-bold rounded-xl"
      >
        Tower Stabilized ✅ →
      </button>
    )}
  </StageWrapper>
);

const BOSS_COMPONENTS = [
  { key: "name",   label: "INITCAP(name)",                       desc: "Fix name format" },
  { key: "email",  label: "SUBSTR(email, INSTR(email,'@')+1)",  desc: "Extract domain" },
  { key: "rollno", label: "LPAD(roll_no, 5, '0')",              desc: "Pad roll number" },
  { key: "age",    label: "CAST((JULIANDAY('now') - JULIANDAY(dob)) / 365 AS INT)", desc: "Calculate age" },
];

const bossProgress = Object.values(bossQuery).filter(Boolean).length;
const bossDefeated = bossProgress === 4;

const renderStage6 = () => (
  <StageWrapper>
    <h3 className="text-xl font-bold text-destructive mb-1">💥 Restore Data City Core</h3>
    <p className="text-muted-foreground text-sm mb-4">
      Build the full restoration query. Each function you add weakens the corruption.
    </p>

    {/* Boss health bar */}
    <div className="w-full max-w-md bg-slate-800 rounded-full h-3 mb-2 overflow-hidden">
      <div
        className="h-full bg-destructive transition-all duration-700 rounded-full"
        style={{ width: `${100 - bossProgress * 25}%` }}
      />
    </div>
    <p className="text-xs text-muted-foreground mb-6">
      Corruption: {100 - bossProgress * 25}% {bossDefeated ? "→ 💥 DESTROYED" : ""}
    </p>

    {/* Boss visual */}
    <div className={`text-5xl mb-6 transition-all duration-700
      ${bossDefeated ? "opacity-0 scale-0" : "scale-100"}`}
    >
      👾
    </div>

    {/* Query builder */}
    <div className="w-full max-w-md bg-slate-900 rounded-xl p-4 font-mono text-sm mb-6">
      <span className="text-blue-400">SELECT</span>
      <br />
      {BOSS_COMPONENTS.map(({ key, label }, i) => (
        <div key={key} className={`ml-4 transition-all ${
          bossQuery[key as keyof typeof bossQuery] ? "text-green-400" : "text-slate-600"
        }`}>
          {bossQuery[key as keyof typeof bossQuery] ? "✓ " : "○ "}
          {label}{i < 3 ? "," : ""}
        </div>
      ))}
      <br />
      <span className="text-blue-400">FROM</span>
      <span className="text-white"> STUDENT;</span>
    </div>

    {/* Toggle buttons */}
    <div className="space-y-2 w-full max-w-md mb-6">
      {BOSS_COMPONENTS.map(({ key, label, desc }) => (
        <button
          key={key}
          onClick={() => setBossQuery(q => ({ ...q, [key]: !q[key as keyof typeof bossQuery] }))}
          className={`w-full flex items-center justify-between px-4 py-2 rounded-lg border text-sm transition-all
            ${bossQuery[key as keyof typeof bossQuery]
              ? "bg-primary/10 border-primary text-primary"
              : "border-border hover:border-primary text-muted-foreground"}`}
        >
          <span className="font-mono text-xs">{label}</span>
          <span className="text-xs">{desc}</span>
        </button>
      ))}
    </div>

    {bossDefeated && (
      <button
        onClick={() => { game.addXp(300, "👑 Master of Data Functions"); game.nextStage(); }}
        className="px-8 py-3 bg-primary text-primary-foreground font-bold rounded-xl animate-in zoom-in"
      >
        🌆 City Restored — Claim Victory
      </button>
    )}
  </StageWrapper>
);

const renderStage7 = () => (
  <CompletionScreen
    missionTitle="Data City Restored! 🌆"
    missionSubtitle="You mastered conversion, string, and date functions to defeat the data corruption."
    xp={game.xp}
    xpLog={game.xpLog}
    achievements={[
      { icon: <Zap className="size-4" />,      label: "Data Transformer" },
      { icon: <Wrench className="size-4" />,   label: "String Cleaner" },
      { icon: <Search className="size-4" />,   label: "Data Detective" },
      { icon: <Clock className="size-4" />,    label: "Time Master" },
      { icon: <Crown className="size-4" />,    label: "Master of Data Functions" },
    ]}
    concepts={[
      { label: "Conversion Functions",  description: "TO_CHAR, TO_NUMBER, TO_DATE translate between data types." },
      { label: "String Functions",      description: "INITCAP, TRIM, LPAD, SUBSTR, INSTR clean and reshape text." },
      { label: "INSTR + SUBSTR",        description: "Combine to locate and extract substrings like email domains." },
      { label: "Date Functions",        description: "DATE, JULIANDAY, STRFTIME measure and format time values." },
      { label: "Multi-function Queries",description: "Real-world SQL combines multiple functions in a single SELECT." },
    ]}
    onReset={game.reset}
  />
);
return (
  <SimShell
    title="Data City"
    subtitle="The Function Heist"
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
  </SimShell>
);
}