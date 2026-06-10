import { useState } from "react";
import { Database, Crown, Swords, Layers, Eye, Trash2 } from "lucide-react";
import {
  useSimGame,
  SimShell,
  StageWrapper,
  QuizBlock,
  CompletionScreen,
} from "@/components/simulations/shared";

// ── Types & Interfaces ────────────────────────────────────────────────────────
type Dept = "CSE" | "ECE" | "MECH";

interface Student {
  name: string;
  dept: Dept;
  age: number;
}

// ── Sub-Components ───────────────────────────────────────────────────────────
function CityScene() {
  const citizens = [
    { color: "bg-cyan-500", top: "20%", left: "15%", anim: "animate-bounce" },
    { color: "bg-indigo-500", top: "45%", left: "25%", anim: "animate-pulse" },
    { color: "bg-emerald-500", top: "70%", left: "10%", anim: "animate-bounce" },
    { color: "bg-amber-500", top: "30%", left: "50%", anim: "animate-pulse" },
    { color: "bg-rose-500", top: "60%", left: "40%", anim: "animate-bounce" },
    { color: "bg-purple-500", top: "25%", left: "75%", anim: "animate-bounce" },
    { color: "bg-teal-500", top: "50%", left: "80%", anim: "animate-pulse" },
    { color: "bg-pink-500", top: "75%", left: "65%", anim: "animate-bounce" },
    { color: "bg-sky-400", top: "15%", left: "40%", anim: "animate-pulse" },
  ];

  return (
    <div className="relative w-full h-full bg-slate-950 p-4">
      {/* Decorative Table Grid Lines */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:2rem_2rem] opacity-30" />
      
      {/* Central Database Core */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-20 bg-slate-800/80 border border-primary/30 rounded-xl flex flex-col justify-around p-2 items-center shadow-inner">
        <div className="w-10 h-3 bg-primary/20 rounded-sm border border-primary/40 animate-pulse" />
        <div className="w-10 h-3 bg-cyan-500/20 rounded-sm border border-cyan-500/40 animate-pulse" />
        <div className="w-10 h-3 bg-emerald-500/20 rounded-sm border border-emerald-500/40 animate-pulse" />
      </div>

      {/* Walking Data Citizens */}
      {citizens.map((citizen, index) => (
        <div
          key={index}
          className={`absolute w-3 h-3 rounded-full ${citizen.color} ${citizen.anim} shadow-[0_0_8px_rgba(255,255,255,0.2)]`}
          style={{
            top: citizen.top,
            left: citizen.left,
            animationDelay: `${index * 120}ms`,
            animationDuration: citizen.anim === "animate-bounce" ? "2s" : "1.5s"
          }}
        />
      ))}
    </div>
  );
}

// ── Constants ─────────────────────────────────────────────────────────────────
const TOTAL_STAGES = 8; 

export function DBMSQueryquestSim() {
  const game = useSimGame(TOTAL_STAGES, () => {
    setCountMode("all");
    setGroupApplied(false);
    setHavingApplied(false);
    setViewCreated(false);
    setViewDropped(false);
    setQuiz1Answer(null);
    setBossQuery({ groupBy: false, avg: false, having: false });
  });

  // Stage 2 state
  const [countMode, setCountMode] = useState<"all" | "age">("all");

  // Stage 3 state
  const [groupApplied, setGroupApplied] = useState(false);

  // Stage 4 state
  const [havingApplied, setHavingApplied] = useState(false);
  const [wrongFilter, setWrongFilter] = useState(false);

  // Stage 5/6 state
  const [viewCreated, setViewCreated] = useState(false);
  const [viewDropped, setViewDropped] = useState(false);

  // Stage 7 quiz
  const [quiz1Answer, setQuiz1Answer] = useState<string | null>(null);

  // Stage 8 – Boss
  const [bossQuery, setBossQuery] = useState({
    groupBy: false,
    avg: false,
    having: false,
  });

  // ── Stage renderers ───────────────────────────────────────────────────────
  const renderStage1 = () => (
    <StageWrapper>
      <div className="text-center mb-8 max-w-xl">
        <h2 className="text-3xl font-bold text-primary mb-2">
          ⚔️ Query Quest: The Data Kingdom Chronicles
        </h2>
        <p className="text-muted-foreground text-base leading-relaxed">
          You are a <strong>Data Guardian</strong> of Datapolis. The Data Overlord
          has scrambled the Grand Table of Students. Restore order by mastering
          <strong> aggregation</strong>, <strong>GROUP BY</strong>,{" "}
          <strong>HAVING</strong>, and <strong>Views</strong>.
        </p>
      </div>
  
      {/* Visual: animated city with avatars */}
      <div className="relative w-64 h-48 bg-slate-900 rounded-2xl border border-primary/40 overflow-hidden mb-8 shadow-xl">
        <CityScene />
      </div>
  
      <button
        onClick={() => { game.addXp(50, "🗺️ Data Guardian"); game.nextStage(); }}
        className="px-8 py-3 bg-primary text-primary-foreground font-bold rounded-xl flex items-center gap-2 hover:opacity-90 transition-all active:scale-95"
      >
        <Swords className="size-5" /> Accept the Mission
      </button>
    </StageWrapper>
  );

  const CITIZENS = [
    { id: 1, name: "Aria", age: 21 },
    { id: 2, name: "Bren", age: null },  // NULL
    { id: 3, name: "Cleo", age: 19 },
    { id: 4, name: "Dex",  age: null },  // NULL
    { id: 5, name: "Evan", age: 23 },
  ];
  
  const renderStage2 = () => {
    const displayed = countMode === "all"
      ? CITIZENS
      : CITIZENS.filter(c => c.age !== null);
  
    return (
      <StageWrapper>
        <h3 className="text-xl font-bold text-primary mb-1">🏙️ Stage 1: Counting the Citizens</h3>
        <p className="text-muted-foreground text-sm mb-6">
          COUNT(*) counts every row. COUNT(Age) skips NULLs.
        </p>
  
        {/* Avatar grid */}
        <div className="flex gap-3 flex-wrap justify-center mb-6">
          {CITIZENS.map(c => (
            <div key={c.id}
              className={`w-12 h-12 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-500
                ${countMode === "age" && c.age === null
                  ? "opacity-20 bg-slate-400"
                  : "opacity-100 bg-primary text-primary-foreground"}`}
            >
              {c.name[0]}
            </div>
          ))}
        </div>
  
        {/* Count result */}
        <div className="text-4xl font-black text-primary mb-6 tabular-nums">
          COUNT = {displayed.length}
        </div>
  
        {/* Toggle buttons */}
        <div className="flex gap-3 mb-8">
          {["all", "age"].map(mode => (
            <button key={mode}
              onClick={() => setCountMode(mode as "all" | "age")}
              className={`px-5 py-2 rounded-lg font-mono text-sm font-semibold border transition-all
                ${countMode === mode
                  ? "bg-primary text-primary-foreground border-primary"
                  : "border-border hover:border-primary"}`}
            >
              {mode === "all" ? "COUNT(*)" : "COUNT(Age)"}
            </button>
          ))}
        </div>
  
        <button
          onClick={() => { game.addXp(100, "🏆 Census Master"); game.nextStage(); }}
          className="px-8 py-3 bg-primary text-primary-foreground font-bold rounded-xl hover:opacity-90 transition-all"
        >
          Got it → Next
        </button>
      </StageWrapper>
    );
  };
  
  const STUDENTS: Student[] = [
    { name: "Aria", dept: "CSE", age: 21 },
    { name: "Bren", dept: "ECE", age: 22 },
    { name: "Cleo", dept: "CSE", age: 19 },
    { name: "Dex",  dept: "ECE", age: 24 },
    { name: "Evan", dept: "MECH", age: 20 },
    { name: "Faye", dept: "MECH", age: 22 },
  ];
  
  const DEPT_COLORS: Record<Dept, string> = { 
    CSE: "bg-blue-500", 
    ECE: "bg-green-500", 
    MECH: "bg-orange-500" 
  };
  
  const renderStage3 = () => {
    const groups = groupApplied
      ? Object.entries(
          STUDENTS.reduce((acc, s) => {
            (acc[s.dept] = acc[s.dept] || []).push(s);
            return acc;
          }, {} as Record<Dept, Student[]>)
        ) as [Dept, Student[]][]
      : null;
  
    return (
      <StageWrapper>
        <h3 className="text-xl font-bold text-primary mb-1">🏙️ Stage 2: Department Clustering</h3>
        <p className="text-muted-foreground text-sm mb-6">
          GROUP BY clusters rows sharing the same value.
        </p>
  
        {/* Before: scattered avatars */}
        {!groupApplied && (
          <div className="flex flex-wrap gap-2 justify-center mb-6">
            {STUDENTS.map((s, i) => (
              <div key={i}
                className={`w-10 h-10 rounded-full ${DEPT_COLORS[s.dept]} text-white text-xs flex items-center justify-center font-bold`}
              >
                {s.name[0]}
              </div>
            ))}
          </div>
        )}
  
        {/* After: grouped clusters */}
        {groupApplied && groups && (
          <div className="flex gap-6 mb-6">
            {groups.map(([dept, members]) => (
              <div key={dept} className="flex flex-col items-center gap-1 p-3 rounded-xl border border-border">
                <span className="text-xs font-bold text-muted-foreground">{dept}</span>
                <div className="flex gap-1 flex-wrap justify-center">
                  {members.map((s, i) => (
                    <div key={i}
                      className={`w-8 h-8 rounded-full ${DEPT_COLORS[dept]} text-white text-xs flex items-center justify-center font-bold`}
                    >
                      {s.name[0]}
                    </div>
                  ))}
                </div>
                <span className="text-sm font-semibold text-primary">
                  AVG Age: {(members.reduce((a, s) => a + s.age, 0) / members.length).toFixed(1)}
                </span>
              </div>
            ))}
          </div>
        )}
  
        {!groupApplied ? (
          <button onClick={() => setGroupApplied(true)}
            className="px-6 py-2 bg-primary text-primary-foreground font-bold rounded-xl font-mono hover:opacity-90 transition-all"
          >
            GROUP BY Dept_ID
          </button>
        ) : (
          <button
            onClick={() => { game.addXp(150, "🏆 Cluster Architect"); game.nextStage(); }}
            className="px-8 py-3 bg-primary text-primary-foreground font-bold rounded-xl mt-4 hover:opacity-90 transition-all"
          >
            Continue →
          </button>
        )}
      </StageWrapper>
    );
  };

  const COURSES = [
    { id: "CS101", avg: 82 },
    { id: "EC201", avg: 71 },
    { id: "MA301", avg: 78 },
    { id: "PH401", avg: 65 },
  ];
  
  const renderStage4 = () => (
    <StageWrapper>
      <h3 className="text-xl font-bold text-primary mb-1">📊 Stage 3: Marks Analyzer</h3>
      <p className="text-muted-foreground text-sm mb-6">
        Filter <em>groups</em>, not rows. HAVING works after aggregation.
      </p>
  
      {/* Bar chart */}
      <div className="flex items-end gap-3 h-40 mb-4 relative">
        {COURSES.map(c => (
          <div key={c.id} className="flex flex-col items-center gap-1 z-10">
            <span className="text-xs font-semibold text-primary">{c.avg}</span>
            <div
              className={`w-12 rounded-t-md transition-all duration-700
                ${havingApplied && c.avg <= 75 ? "opacity-20 bg-slate-400" : "bg-primary"}`}
              style={{ height: `${c.avg * 1.2}px` }}
            />
            <span className="text-xs text-muted-foreground">{c.id}</span>
          </div>
        ))}
        {/* Threshold line */}
        <div className="absolute border-t-2 border-dashed border-destructive w-full left-0 z-0"
          style={{ bottom: `${75 * 1.2 + 20}px` }}
        />
      </div>
  
      {/* Wrong filter demo */}
      {wrongFilter && (
        <div className="bg-destructive/10 border border-destructive rounded-lg p-3 mb-4 text-sm font-mono text-destructive">
          ❌ WHERE AVG(Marks) &gt; 75 → ERROR: Cannot use aggregate in WHERE
        </div>
      )}
  
      <div className="flex gap-3 flex-wrap justify-center mb-6">
        <button onClick={() => setWrongFilter(true)}
          className="px-4 py-2 rounded-lg border border-destructive text-destructive text-sm font-mono hover:bg-destructive/5 transition-all"
        >
          WHERE AVG(Marks) &gt; 75
        </button>
        <button onClick={() => setHavingApplied(true)}
          className="px-4 py-2 rounded-lg border border-primary text-primary text-sm font-mono hover:bg-primary/5 transition-all"
        >
          HAVING AVG(Marks) &gt; 75
        </button>
      </div>
  
      {havingApplied && (
        <button
          onClick={() => { game.addXp(200, "🏆 Performance Analyst"); game.nextStage(); }}
          className="px-8 py-3 bg-primary text-primary-foreground font-bold rounded-xl hover:opacity-90 transition-all"
        >
          Excellent! Continue →
        </button>
      )}
    </StageWrapper>
  );

  const renderStage5 = () => (
    <StageWrapper>
      <h3 className="text-xl font-bold text-primary mb-1">🧱 Stage 4–5: View Forge</h3>
      <p className="text-muted-foreground text-sm mb-4">
        A View is a saved query — a virtual table. No data is physically stored.
      </p>
  
      <div className="font-mono text-sm bg-slate-900 text-green-400 rounded-xl p-4 mb-6 w-full max-w-md text-left">
        {!viewCreated ? (
          <>
            <span className="text-blue-400">CREATE VIEW</span> CSE_Students <span className="text-blue-400">AS</span>
            <br />
            <span className="text-blue-400">SELECT</span> * <span className="text-blue-400">FROM</span> STUDENT
            <br />
            <span className="text-blue-400">WHERE</span> Dept_ID = 1;
          </>
        ) : !viewDropped ? (
          <>
            <span className="text-blue-400">SELECT</span> * <span className="text-blue-400">FROM</span> CSE_Students;
            <br /><br />
            <span className="text-muted-foreground text-xs">→ Showing 3 CSE students...</span>
          </>
        ) : (
          <>
            <span className="text-red-400">DROP VIEW</span> CSE_Students;
            <br /><br />
            <span className="text-muted-foreground text-xs">→ View removed. Portal closed.</span>
          </>
        )}
      </div>
  
      {/* View cube visual */}
      {viewCreated && !viewDropped && (
        <div className="w-16 h-16 bg-primary/20 border-2 border-primary rounded-xl flex items-center justify-center mb-4 animate-pulse">
          <Eye className="size-6 text-primary" />
        </div>
      )}
      {viewDropped && (
        <div className="w-16 h-16 bg-destructive/10 border-2 border-destructive/30 rounded-xl flex items-center justify-center mb-4 opacity-30">
          <Trash2 className="size-6 text-destructive" />
        </div>
      )}
  
      <div className="flex gap-3">
        {!viewCreated && (
          <button onClick={() => { setViewCreated(true); game.addXp(250, "🏆 Reality Builder"); }}
            className="px-5 py-2 bg-primary text-primary-foreground font-bold rounded-xl font-mono text-sm hover:opacity-90 transition-all"
          >
            CREATE VIEW
          </button>
        )}
        {viewCreated && !viewDropped && (
          <button onClick={() => setViewDropped(true)}
            className="px-5 py-2 border border-destructive text-destructive font-bold rounded-xl font-mono text-sm hover:bg-destructive/5 transition-all"
          >
            DROP VIEW
          </button>
        )}
        {viewDropped && (
          <button
            onClick={() => { game.addXp(100, "🏆 Cleanup Commander"); game.nextStage(); }}
            className="px-8 py-3 bg-primary text-primary-foreground font-bold rounded-xl hover:opacity-90 transition-all"
          >
            Face the Final Boss →
          </button>
        )}
      </div>
    </StageWrapper>
  );

  const bossComplete = bossQuery.groupBy && bossQuery.avg && bossQuery.having;

  const renderStage6 = () => (
    <StageWrapper>
      <h3 className="text-xl font-bold text-destructive mb-1">💥 Final Boss: The Data Overlord</h3>
      <p className="text-muted-foreground text-sm mb-4">
        Defeat him: Group students by Dept_ID, show AVG(Marks), only include depts with avg &gt; 70.
      </p>

      {/* Boss visual */}
      <div className={`text-6xl mb-4 transition-all duration-700 ${bossComplete ? "opacity-10 scale-50" : "scale-100"}`}>
        👾
      </div>
      {bossComplete && (
        <div className="text-green-400 font-bold text-lg mb-4 animate-in fade-in">
          ✅ Overlord dissolved into data particles!
        </div>
      )}

      {/* Query builder toggles */}
      <div className="space-y-2 w-full max-w-sm mb-6">
        {[
          { key: "groupBy", label: "GROUP BY Dept_ID" },
          { key: "avg",     label: "SELECT AVG(Marks)" },
          { key: "having",  label: "HAVING AVG(Marks) > 70" },
        ].map(({ key, label }) => (
          <button
            key={key}
            onClick={() => setBossQuery(q => ({ ...q, [key]: !q[key as keyof typeof q] }))}
            className={`w-full px-4 py-2 rounded-lg font-mono text-sm border transition-all text-left
              ${bossQuery[key as keyof typeof bossQuery]
                ? "bg-primary text-primary-foreground border-primary"
                : "border-border hover:border-primary"}`}
          >
            {bossQuery[key as keyof typeof bossQuery] ? "✓ " : "○ "}{label}
          </button>
        ))}
      </div>

      {bossComplete && (
        <button
          onClick={() => { game.addXp(300, "⚔️ Overlord Defeated"); game.nextStage(); }}
          className="px-8 py-3 bg-primary text-primary-foreground font-bold rounded-xl animate-in zoom-in hover:opacity-90 transition-all"
        >
          Claim Victory 🏆
        </button>
      )}
    </StageWrapper>
  );

  const renderStage7 = () => (
    <StageWrapper>
      <h3 className="text-xl font-bold text-primary mb-6">🧠 Knowledge Check</h3>
      <div className="w-full max-w-md space-y-4 mb-8 text-left">
        <QuizBlock
          question="What does COUNT(col) ignore?"
          options={[
            { label: "Duplicate values", value: "a" },
            { label: "NULL values", value: "b" },
            { label: "All rows", value: "c" },
          ]}
          correctValue="b"
          selectedValue={quiz1Answer}
          onSelect={setQuiz1Answer}
          correctFeedback="✅ Correct! COUNT(col) skips NULLs; use COUNT(*) to count every row."
          wrongFeedback="❌ Hint: Try toggling COUNT(Age) back in Stage 1 — notice the faded avatars?"
        />
      </div>
      {quiz1Answer === "b" && (
        <button
          onClick={() => { game.addXp(150, "📘 SQL Scholar"); game.nextStage(); }}
          className="px-8 py-3 bg-primary text-primary-foreground font-bold rounded-xl animate-in zoom-in hover:opacity-90 transition-all"
        >
          See Results →
        </button>
      )}
    </StageWrapper>
  );

  const renderStage8 = () => (
    <CompletionScreen
      missionTitle="Datapolis Restored! 🏆"
      missionSubtitle="You defeated the Data Overlord and mastered SQL aggregation."
      xp={game.xp}
      xpLog={game.xpLog}
      achievements={[
        { icon: <Database className="size-4" />, label: "Census Master" },
        { icon: <Layers className="size-4" />,  label: "Cluster Architect" },
        { icon: <Crown className="size-4" />,   label: "Performance Analyst" },
        { icon: <Eye className="size-4" />,    label: "Reality Builder" },
        { icon: <Swords className="size-4" />,  label: "Overlord Defeated" },
      ]}
      concepts={[
        { label: "COUNT(*) vs COUNT(col)", description: "COUNT(*) includes NULLs; COUNT(col) skips them." },
        { label: "GROUP BY",              description: "Clusters rows sharing the same column value." },
        { label: "WHERE vs HAVING",       description: "WHERE filters rows before grouping; HAVING filters groups after." },
        { label: "Views",                 description: "A virtual table — a saved query with no stored data." },
      ]}
      onReset={game.reset}
    />
  );

  // ── Render ────────────────────────────────────────────────────────────────
  return (
    <SimShell
      title="Query Quest"
      subtitle="The Data Kingdom Chronicles"
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