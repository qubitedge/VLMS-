import { useState } from "react";
import { ChevronRight, Swords, Zap } from "lucide-react";
import {
  useSimGame,
  SimShell,
  StageWrapper,
  QuizBlock,
  CompletionScreen,
} from "@/components/simulations/shared";

const TOTAL_STAGES = 9; // 6 content + mini challenges + boss + completion

export function DBMSSubqueriesSim() {
  const game = useSimGame(TOTAL_STAGES, () => {
    setInScanned(false);
    setExistsMode("exists");
    setInspectedStudents([]);
    setAnyAllChoice(null);
    setSliderMarks(55);
    setUnionDragged([]);
    setShowDuplicates(false);
    setVennDragged([]);
    setRankMethod(null);
    setRankFound(false);
    setQuiz1Ans(null);
    setQuiz2Ans(null);
    setQuiz3Ans(null);
    setBossSteps([]);
  });

  // Stage 1 - IN
  const [inScanned, setInScanned]               = useState(false);

  // Stage 2 - EXISTS
  const [existsMode, setExistsMode]             = useState<"exists"|"notexists">("exists");
  const [inspectedStudents, setInspectedStudents] = useState<number[]>([]);

  // Stage 3 - ANY/ALL
  const [anyAllChoice, setAnyAllChoice]         = useState<"any"|"all"|null>(null);
  const [sliderMarks, setSliderMarks]           = useState(55);

  // Stage 4 - UNION
  const [unionDragged, setUnionDragged]         = useState<string[]>([]);
  const [showDuplicates, setShowDuplicates]     = useState(false);

  // Stage 5 - INTERSECT
  const [vennDragged, setVennDragged]           = useState<string[]>([]);

  // Stage 6 - Ranking
  const [rankMethod, setRankMethod]             = useState<"rownumber"|"correlated"|null>(null);
  const [rankFound, setRankFound]               = useState(false);

  // Stage 7 - Mini Challenges
  const [quiz1Ans, setQuiz1Ans]                 = useState<string|null>(null);
  const [quiz2Ans, setQuiz2Ans]                 = useState<string|null>(null);
  const [quiz3Ans, setQuiz3Ans]                 = useState<string|null>(null);

  // Stage 8 - Boss
  const [bossSteps, setBossSteps]               = useState<string[]>([]);

  // ── Shared data ──────────────────────────────────────────────────────────
  const STUDENTS = [
    { id: 1, name: "Alice", dept: "CSE", location: "Hyderabad", marks: 88, courses: ["CS101","CS102"] },
    { id: 2, name: "Bob",   dept: "IT",  location: "Chennai",   marks: 72, courses: ["CS101"] },
    { id: 3, name: "Carol", dept: "CSE", location: "Hyderabad", marks: 95, courses: ["CS102"] },
    { id: 4, name: "Dan",   dept: "IT",  location: "Hyderabad", marks: 60, courses: ["CS101","CS102"] },
    { id: 5, name: "Eve",   dept: "ECE", location: "Mumbai",    marks: 81, courses: ["CS101"] },
    { id: 6, name: "Frank", dept: "CSE", location: "Hyderabad", marks: 55, courses: [] },
  ];

  const IT_MARKS = [72, 60]; // Bob and Dan's marks
  const HYDERABAD_STUDENTS = STUDENTS.filter(s => s.location === "Hyderabad");
  const HAS_MARKS = STUDENTS.filter(s => s.marks > 0);
  const NO_MARKS  = STUDENTS.filter(s => s.courses.length === 0);

  // ── Stage renderers ───────────────────────────────────────────────────────

  /** Stage 1: Story / Theme intro */
  const renderStage1 = () => {
    const results = inScanned ? HYDERABAD_STUDENTS : [];

    return (
      <StageWrapper>
        <div className="text-center mb-6 max-w-lg">
          <h2 className="text-2xl font-bold text-primary mb-1">🏙️ The City of Departments</h2>
          <p className="text-muted-foreground text-sm">
            Use the <code className="bg-secondary px-1 rounded">IN</code> operator to find
            students whose department is located in <strong>Hyderabad</strong>.
          </p>
        </div>

        {/* SQL preview */}
        <div className="w-full max-w-xl bg-black/80 rounded-xl p-4 font-mono text-xs text-green-400 mb-6">
          <p className="text-muted-foreground mb-1">-- Your query:</p>
          <p><span className="text-blue-400">SELECT</span> Name <span className="text-blue-400">FROM</span> STUDENT</p>
          <p><span className="text-blue-400">WHERE</span> Dept_ID <span className="text-yellow-400">IN</span> (</p>
          <p className="pl-4"><span className="text-blue-400">SELECT</span> Dept_ID <span className="text-blue-400">FROM</span> DEPARTMENT</p>
          <p className="pl-4"><span className="text-blue-400">WHERE</span> Location = <span className="text-orange-400">'Hyderabad'</span></p>
          <p>);</p>
        </div>

        {/* City map */}
        <div className="flex flex-wrap gap-3 justify-center mb-8">
          {STUDENTS.map(s => {
            const isHyd = s.location === "Hyderabad";
            const isHighlighted = inScanned && isHyd;
            return (
              <div key={s.id}
                className={`flex flex-col items-center p-3 rounded-xl border-2 w-28 transition-all duration-500
                  ${isHighlighted
                    ? "border-blue-500 bg-blue-500/15 shadow-[0_0_12px_hsl(217_91%_60%/0.4)] scale-105"
                    : inScanned
                    ? "border-border opacity-30"
                    : "border-border bg-card"
                  }`}
              >
                <div className="text-2xl mb-1">{isHighlighted ? "🏢" : "🏗️"}</div>
                <div className="text-xs font-bold">{s.name}</div>
                <div className={`text-[10px] mt-0.5 font-semibold
                  ${isHighlighted ? "text-blue-400" : "text-muted-foreground"}`}>
                  {s.location}
                </div>
                <div className="text-[10px] text-muted-foreground">{s.dept}</div>
              </div>
            );
          })}
        </div>

        {/* IN membership explanation */}
        {inScanned && (
          <div className="w-full max-w-xl mb-6 animate-in fade-in">
            <p className="text-xs text-muted-foreground mb-2 font-semibold">
              IN checks each student's Dept_ID against the subquery result set:
            </p>
            <div className="flex flex-wrap gap-2">
              {STUDENTS.map(s => (
                <div key={s.id}
                  className={`px-3 py-1 rounded-full text-xs font-mono border
                    ${s.location === "Hyderabad"
                      ? "bg-green-500/20 border-green-500 text-green-600 dark:text-green-400"
                      : "bg-red-500/10 border-red-400/40 text-muted-foreground line-through"
                    }`}
                >
                  {s.name} {s.location === "Hyderabad" ? "✓" : "✗"}
                </div>
              ))}
            </div>
          </div>
        )}

        {!inScanned ? (
          <button
            onClick={() => { setInScanned(true); game.addXp(50, "IN Operator Unlocked"); }}
            className="px-8 py-3 bg-primary text-primary-foreground font-bold rounded-xl flex items-center gap-2"
          >
            <Zap className="size-4" /> Scan Hyderabad Departments
          </button>
        ) : (
          <button
            onClick={() => game.nextStage()}
            className="px-8 py-3 bg-primary text-primary-foreground font-bold rounded-xl animate-in zoom-in"
          >
            Ghost Records Detector → 👻
          </button>
        )}
      </StageWrapper>
    );
  };

  const renderStage2 = () => {
    const displayed = existsMode === "exists"
      ? STUDENTS.filter(s => s.courses.length > 0)
      : STUDENTS.filter(s => s.courses.length === 0);

    return (
      <StageWrapper>
        <div className="text-center mb-6 max-w-lg">
          <h2 className="text-2xl font-bold text-primary mb-1">👻 Ghost Records Detector</h2>
          <p className="text-muted-foreground text-sm">
            <code className="bg-secondary px-1 rounded">EXISTS</code> lights up students
            with mark records. <code className="bg-secondary px-1 rounded">NOT EXISTS</code> reveals
            the ghosts — students with no marks at all.
          </p>
        </div>

        {/* Toggle */}
        <div className="flex gap-3 mb-6">
          {(["exists","notexists"] as const).map(mode => (
            <button key={mode}
              onClick={() => { setExistsMode(mode); setInspectedStudents([]); }}
              className={`px-5 py-2 rounded-lg border font-bold text-sm transition-all
                ${existsMode === mode
                  ? mode === "exists"
                    ? "bg-blue-500 text-white border-blue-500"
                    : "bg-red-500 text-white border-red-500"
                  : "border-border hover:bg-secondary"
                }`}
            >
              {mode === "exists" ? "EXISTS" : "NOT EXISTS"}
            </button>
          ))}
        </div>

        {/* SQL */}
        <div className="w-full max-w-xl bg-black/80 rounded-xl p-4 font-mono text-xs text-green-400 mb-6">
          <p><span className="text-blue-400">SELECT</span> Name <span className="text-blue-400">FROM</span> STUDENT S</p>
          <p><span className="text-blue-400">WHERE</span>{" "}
            <span className={existsMode === "exists" ? "text-yellow-400" : "text-red-400"}>
              {existsMode === "exists" ? "EXISTS" : "NOT EXISTS"}
            </span> (
          </p>
          <p className="pl-4"><span className="text-blue-400">SELECT</span> 1 <span className="text-blue-400">FROM</span> MARKS M</p>
          <p className="pl-4"><span className="text-blue-400">WHERE</span> M.Roll_No = S.Roll_No</p>
          <p>);</p>
        </div>

        {/* Student grid */}
        <div className="flex flex-wrap gap-3 justify-center mb-6">
          {STUDENTS.map(s => {
            const hasCourses = s.courses.length > 0;
            const isMatch = existsMode === "exists" ? hasCourses : !hasCourses;
            const inspected = inspectedStudents.includes(s.id);

            return (
              <button key={s.id}
                onClick={() => !inspectedStudents.includes(s.id) && setInspectedStudents(p => [...p, s.id])}
                className={`flex flex-col items-center p-3 rounded-xl border-2 w-28 transition-all duration-500 cursor-pointer
                  ${isMatch
                    ? existsMode === "exists"
                      ? "border-blue-500 bg-blue-500/15 shadow-md"
                      : "border-red-500 bg-red-500/15 animate-pulse"
                    : "border-border opacity-30"
                  }`}
              >
                <div className="text-2xl mb-1">
                  {isMatch ? (existsMode === "exists" ? "✨" : "👻") : "👤"}
                </div>
                <div className="text-xs font-bold">{s.name}</div>
                {inspected && (
                  <div className="text-[10px] mt-1 text-muted-foreground animate-in fade-in">
                    {hasCourses ? `${s.courses.length} records` : "No records"}
                  </div>
                )}
                {!inspected && <div className="text-[10px] text-muted-foreground">click to inspect</div>}
              </button>
            );
          })}
        </div>

        <div className="text-sm text-muted-foreground mb-6 bg-secondary/30 px-4 py-2 rounded-lg max-w-md text-center">
          💡 EXISTS doesn't care <em>how many</em> rows match — just that <em>at least one</em> exists.
        </div>

        <button
          onClick={() => { game.addXp(75, "Ghost Hunter"); game.nextStage(); }}
          className="px-8 py-3 bg-primary text-primary-foreground font-bold rounded-xl"
        >
          Enter the Comparison Arena ⚔️
        </button>
      </StageWrapper>
    );
  };

  const renderStage3 = () => {
    const itAvgMarks = 66; // average of IT students for display
    const anyResult = sliderMarks > Math.min(...IT_MARKS);  // beat at least one
    const allResult = sliderMarks > Math.max(...IT_MARKS);  // beat all

    const result = anyAllChoice === "any" ? anyResult : anyAllChoice === "all" ? allResult : null;

    return (
      <StageWrapper>
        <div className="text-center mb-6 max-w-lg">
          <h2 className="text-2xl font-bold text-primary mb-1">⚔️ The Comparison Arena</h2>
          <p className="text-muted-foreground text-sm">
            Your student has a mark you control. Compare against IT department students
            using <code className="bg-secondary px-1 rounded">ANY</code> (beat at least one) or{" "}
            <code className="bg-secondary px-1 rounded">ALL</code> (beat everyone).
          </p>
        </div>

        {/* Arena visual */}
        <div className="flex items-center gap-8 mb-8 w-full max-w-lg justify-center">
          {/* Your student */}
          <div className="flex flex-col items-center p-4 rounded-xl border-2 border-primary bg-primary/10 w-32">
            <div className="text-3xl mb-2">🧑‍💻</div>
            <div className="text-xs font-bold mb-1">Your Student</div>
            <div className={`text-2xl font-bold font-mono ${
              result === true ? "text-green-500" : result === false ? "text-red-500" : "text-primary"
            }`}>
              {sliderMarks}
            </div>
          </div>

          {/* VS */}
          <div className="flex flex-col items-center gap-1">
            <div className="text-lg font-bold text-muted-foreground">VS</div>
            {anyAllChoice && (
              <div className={`text-xs font-bold px-2 py-1 rounded animate-in fade-in
                ${result ? "bg-green-500/20 text-green-500" : "bg-red-500/20 text-red-500"}`}>
                {result ? "✓ MATCH" : "✗ NO MATCH"}
              </div>
            )}
          </div>

          {/* IT students */}
          <div className="flex flex-col gap-2">
            {IT_MARKS.map((m, i) => (
              <div key={i}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg border transition-all
                  ${anyAllChoice === "any" && sliderMarks > m
                    ? "border-green-500 bg-green-500/10"
                    : anyAllChoice === "all" && sliderMarks > m
                    ? "border-green-500 bg-green-500/10"
                    : anyAllChoice && sliderMarks <= m
                    ? "border-red-500 bg-red-500/10"
                    : "border-border bg-card"
                  }`}
              >
                <span className="text-lg">🎓</span>
                <div>
                  <div className="text-xs font-bold">IT Student {i+1}</div>
                  <div className="text-sm font-mono font-bold">{m}</div>
                </div>
                {anyAllChoice && (
                  <span>{sliderMarks > m ? "✓" : "✗"}</span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Slider */}
        <div className="w-full max-w-sm mb-6">
          <label className="text-sm font-semibold mb-2 block text-center">
            Your Marks: <span className="text-primary font-mono text-lg">{sliderMarks}</span>
          </label>
          <input type="range" min={40} max={100} value={sliderMarks}
            onChange={e => setSliderMarks(Number(e.target.value))}
            className="w-full accent-primary"
          />
          <div className="flex justify-between text-xs text-muted-foreground mt-1">
            <span>40</span><span>100</span>
          </div>
        </div>

        {/* ANY / ALL toggle */}
        <div className="flex gap-3 mb-6">
          {(["any","all"] as const).map(mode => (
            <button key={mode}
              onClick={() => setAnyAllChoice(mode)}
              className={`px-6 py-2 rounded-lg border font-bold text-sm transition-all
                ${anyAllChoice === mode
                  ? "bg-primary text-primary-foreground border-primary"
                  : "border-border hover:bg-secondary"
                }`}
            >
              {mode.toUpperCase()}
            </button>
          ))}
        </div>

        {/* Explanation */}
        {anyAllChoice && (
          <div className="bg-secondary/30 rounded-xl p-3 max-w-md text-center text-sm mb-6 animate-in fade-in">
            {anyAllChoice === "any"
              ? <span>ANY = beat <strong>at least one</strong> IT student. Like OR across the set.</span>
              : <span>ALL = beat <strong>every</strong> IT student. Like AND across the entire set.</span>
            }
            <div className={`mt-1 font-bold ${result ? "text-green-500" : "text-red-500"}`}>
              {result ? "✅ Query returns this student." : "❌ Query excludes this student."}
            </div>
          </div>
        )}

        {anyAllChoice && (
          <button
            onClick={() => { game.addXp(75, "Comparison Master"); game.nextStage(); }}
            className="px-8 py-3 bg-primary text-primary-foreground font-bold rounded-xl animate-in zoom-in"
          >
            Merge Portal → 🔗
          </button>
        )}
      </StageWrapper>
    );
  };

  const UNION_SOURCES = ["CSE Students", "IT Students"];
  const CSE_NAMES = STUDENTS.filter(s => s.dept === "CSE").map(s => s.name);
  const IT_NAMES  = STUDENTS.filter(s => s.dept === "IT").map(s => s.name);
  // Dan is in IT + Hyderabad but let's keep it clean — no overlap here
  // Add one duplicate for demonstration:
  const UNION_WITH_DUPES = [...CSE_NAMES, ...IT_NAMES];
  const UNION_DEDUPED    = [...new Set(UNION_WITH_DUPES)];

  const renderStage4 = () => {
    const allDragged = unionDragged.length === 2;
    const displayed  = allDragged
      ? (showDuplicates ? UNION_WITH_DUPES : UNION_DEDUPED)
      : [];

    return (
      <StageWrapper>
        <div className="text-center mb-6 max-w-lg">
          <h2 className="text-2xl font-bold text-primary mb-1">🔗 Merge Portal</h2>
          <p className="text-muted-foreground text-sm">
            <code className="bg-secondary px-1 rounded">UNION</code> combines two query results
            and removes duplicates. <code className="bg-secondary px-1 rounded">UNION ALL</code> keeps them.
          </p>
        </div>

        {/* Two portals + center */}
        <div className="flex items-center gap-4 mb-8 w-full max-w-xl justify-center">
          {/* CSE Portal */}
          <div className="flex flex-col items-center gap-2 flex-1">
            <div className="text-xs font-bold text-blue-400 mb-1">CSE Students</div>
            <div className="w-full rounded-xl border-2 border-blue-500/50 bg-blue-500/10 p-3 min-h-24">
              {CSE_NAMES.map(n => (
                <div key={n} className="text-xs font-mono py-0.5">{n}</div>
              ))}
            </div>
            <button
              disabled={unionDragged.includes("CSE")}
              onClick={() => setUnionDragged(p => [...p, "CSE"])}
              className={`px-4 py-1.5 text-xs font-bold rounded-lg border transition-all
                ${unionDragged.includes("CSE")
                  ? "opacity-30 cursor-not-allowed border-border"
                  : "border-blue-500 bg-blue-500/20 hover:bg-blue-500/30 cursor-pointer"
                }`}
            >
              {unionDragged.includes("CSE") ? "✓ Added" : "➕ Add to UNION"}
            </button>
          </div>

          {/* Center portal */}
          <div className="flex flex-col items-center gap-1">
            <div className={`w-16 h-16 rounded-full border-4 flex items-center justify-center text-2xl
              transition-all ${allDragged
                ? "border-primary bg-primary/20 shadow-[0_0_20px_hsl(var(--primary)/0.4)]"
                : "border-border"}`}>
              {allDragged ? "⚡" : "○"}
            </div>
            <div className="text-xs text-muted-foreground">UNION</div>
          </div>

          {/* IT Portal */}
          <div className="flex flex-col items-center gap-2 flex-1">
            <div className="text-xs font-bold text-purple-400 mb-1">IT Students</div>
            <div className="w-full rounded-xl border-2 border-purple-500/50 bg-purple-500/10 p-3 min-h-24">
              {IT_NAMES.map(n => (
                <div key={n} className="text-xs font-mono py-0.5">{n}</div>
              ))}
            </div>
            <button
              disabled={unionDragged.includes("IT")}
              onClick={() => setUnionDragged(p => [...p, "IT"])}
              className={`px-4 py-1.5 text-xs font-bold rounded-lg border transition-all
                ${unionDragged.includes("IT")
                  ? "opacity-30 cursor-not-allowed border-border"
                  : "border-purple-500 bg-purple-500/20 hover:bg-purple-500/30 cursor-pointer"
                }`}
            >
              {unionDragged.includes("IT") ? "✓ Added" : "➕ Add to UNION"}
            </button>
          </div>
        </div>

        {/* Result + toggle */}
        {allDragged && (
          <div className="w-full max-w-sm animate-in fade-in mb-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-xs font-bold text-muted-foreground">RESULT</p>
              <label className="flex items-center gap-2 text-xs cursor-pointer">
                <span className={showDuplicates ? "text-red-400" : "text-muted-foreground"}>
                  {showDuplicates ? "UNION ALL (with dupes)" : "UNION (no dupes)"}
                </span>
                <div
                  onClick={() => setShowDuplicates(d => !d)}
                  className={`w-10 h-5 rounded-full transition-all cursor-pointer relative
                    ${showDuplicates ? "bg-red-500" : "bg-primary"}`}
                >
                  <div className={`absolute top-0.5 size-4 bg-white rounded-full transition-all
                    ${showDuplicates ? "left-5" : "left-0.5"}`} />
                </div>
              </label>
            </div>
            <div className="border border-border rounded-xl p-3 bg-card">
              {displayed.map((n, i) => (
                <div key={i}
                  className={`text-xs font-mono py-0.5 flex items-center gap-2
                    ${showDuplicates && UNION_WITH_DUPES.indexOf(n) !== i
                      ? "text-red-400"
                      : ""
                    }`}
                >
                  {n}
                  {showDuplicates && UNION_WITH_DUPES.filter(x => x === n).length > 1
                    && UNION_WITH_DUPES.indexOf(n) !== i
                    && <span className="text-[10px] text-red-400">(duplicate)</span>
                  }
                </div>
              ))}
              <div className="border-t border-border mt-2 pt-1 text-xs text-muted-foreground">
                {displayed.length} rows
              </div>
            </div>
          </div>
        )}

        {allDragged && (
          <button
            onClick={() => { game.addXp(80, "Data Integrator"); game.nextStage(); }}
            className="px-8 py-3 bg-primary text-primary-foreground font-bold rounded-xl animate-in zoom-in"
          >
            Intersection Chamber → 🎯
          </button>
        )}
      </StageWrapper>
    );
  };

  const CS101_STUDENTS = STUDENTS.filter(s => s.courses.includes("CS101")).map(s => s.name);
  const CS102_STUDENTS = STUDENTS.filter(s => s.courses.includes("CS102")).map(s => s.name);
  const INTERSECT_RESULT = STUDENTS
    .filter(s => s.courses.includes("CS101") && s.courses.includes("CS102"))
    .map(s => s.name);

  const renderStage5 = () => {
    const bothDragged = vennDragged.length === 2;

    return (
      <StageWrapper>
        <div className="text-center mb-6 max-w-lg">
          <h2 className="text-2xl font-bold text-primary mb-1">🎯 Intersection Chamber</h2>
          <p className="text-muted-foreground text-sm">
            <code className="bg-secondary px-1 rounded">INTERSECT</code> returns only rows
            that appear in <strong>both</strong> query results.
          </p>
        </div>

        {/* Venn diagram */}
        <div className="relative flex justify-center mb-8 h-48 w-full max-w-md">
          {/* CS101 circle */}
          <div className={`absolute left-4 top-0 w-52 h-48 rounded-full border-2 flex items-start pt-4 pl-4
            transition-all ${vennDragged.includes("CS101")
              ? "border-blue-500 bg-blue-500/15"
              : "border-border bg-secondary/20"
            }`}
          >
            <div>
              <div className="text-xs font-bold text-blue-400 mb-2">CS101</div>
              {CS101_STUDENTS.filter(n => !INTERSECT_RESULT.includes(n)).map(n => (
                <div key={n} className="text-xs font-mono">{n}</div>
              ))}
            </div>
          </div>

          {/* Overlap zone */}
          <div className={`absolute left-1/2 -translate-x-1/2 top-10 w-24 h-28 rounded-full
            flex flex-col items-center justify-center z-10 transition-all
            ${bothDragged
              ? "bg-green-500/30 border-2 border-green-500 shadow-[0_0_20px_hsl(142_71%_45%/0.4)]"
              : "bg-secondary/30 border-2 border-dashed border-border"
            }`}
          >
            {bothDragged && INTERSECT_RESULT.map(n => (
              <div key={n} className="text-[10px] font-bold text-green-500 animate-in fade-in">{n}</div>
            ))}
            {!bothDragged && <div className="text-xs text-muted-foreground text-center">overlap</div>}
          </div>

          {/* CS102 circle */}
          <div className={`absolute right-4 top-0 w-52 h-48 rounded-full border-2 flex items-start pt-4 pr-4 text-right
            transition-all ${vennDragged.includes("CS102")
              ? "border-purple-500 bg-purple-500/15"
              : "border-border bg-secondary/20"
            }`}
          >
            <div className="ml-auto">
              <div className="text-xs font-bold text-purple-400 mb-2">CS102</div>
              {CS102_STUDENTS.filter(n => !INTERSECT_RESULT.includes(n)).map(n => (
                <div key={n} className="text-xs font-mono">{n}</div>
              ))}
            </div>
          </div>
        </div>

        {/* Drag buttons */}
        <div className="flex gap-3 mb-6">
          {(["CS101","CS102"] as const).map(course => (
            <button key={course}
              disabled={vennDragged.includes(course)}
              onClick={() => setVennDragged(p => [...p, course])}
              className={`px-5 py-2 rounded-lg border text-sm font-bold transition-all
                ${vennDragged.includes(course)
                  ? "opacity-30 cursor-not-allowed border-border"
                  : course === "CS101"
                  ? "border-blue-500 bg-blue-500/20 hover:bg-blue-500/30 cursor-pointer"
                  : "border-purple-500 bg-purple-500/20 hover:bg-purple-500/30 cursor-pointer"
                }`}
            >
              {vennDragged.includes(course) ? `✓ ${course} Added` : `Add ${course}`}
            </button>
          ))}
        </div>

        {bothDragged && (
          <>
            <div className="bg-secondary/30 rounded-xl p-3 max-w-md text-center text-sm mb-6 animate-in fade-in">
              Only <strong>{INTERSECT_RESULT.join(", ")}</strong> enrolled in both courses.
              INTERSECT finds the common ground.
            </div>
            <button
              onClick={() => { game.addXp(80, "Intersection Expert"); game.nextStage(); }}
              className="px-8 py-3 bg-primary text-primary-foreground font-bold rounded-xl animate-in zoom-in"
            >
              Ranking Tower → 🏆
            </button>
          </>
        )}
      </StageWrapper>
    );
  };

  const RANKED_STUDENTS = [...STUDENTS]
    .sort((a, b) => b.marks - a.marks)
    .map((s, i) => ({ ...s, rank: i + 1 }));

  const FOURTH_RANK = RANKED_STUDENTS.find(s => s.rank === 4)!;

  const renderStage6 = () => (
    <StageWrapper>
      <div className="text-center mb-6 max-w-lg">
        <h2 className="text-2xl font-bold text-primary mb-1">🏆 Ranking Tower</h2>
        <p className="text-muted-foreground text-sm">
          Find the student with the <strong>4th highest marks</strong>. 
          Choose your method — both are valid SQL approaches.
        </p>
      </div>

      {/* Leaderboard */}
      <div className="w-full max-w-sm mb-8">
        {RANKED_STUDENTS.map(s => (
          <div key={s.id}
            className={`flex items-center gap-3 px-4 py-2.5 border-b border-border transition-all
              ${s.rank === 4
                ? rankMethod
                  ? "bg-yellow-500/20 border-l-4 border-l-yellow-500 scale-105 shadow-md"
                  : "bg-secondary/50"
                : "bg-card"
              }`}
          >
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold
              ${s.rank === 1 ? "bg-yellow-500 text-white"
              : s.rank === 2 ? "bg-gray-400 text-white"
              : s.rank === 3 ? "bg-amber-600 text-white"
              : s.rank === 4 && rankMethod ? "bg-primary text-primary-foreground animate-pulse"
              : "bg-muted text-muted-foreground"
              }`}
            >
              {s.rank}
            </div>
            <span className="flex-1 text-sm font-medium">{s.name}</span>
            <span className="font-mono font-bold text-sm">{s.marks}</span>
            {s.rank === 4 && rankMethod && (
              <span className="text-yellow-500 text-xs font-bold animate-in fade-in">← 4th!</span>
            )}
          </div>
        ))}
      </div>

      {/* Method selector */}
      <p className="text-sm font-semibold mb-3">Choose your ranking method:</p>
      <div className="flex gap-3 mb-6">
        {([
          { key: "rownumber",   label: "ROW_NUMBER()",      sql: "ROW_NUMBER() OVER (ORDER BY Marks DESC)" },
          { key: "correlated",  label: "Correlated Subquery", sql: "COUNT(*) + 1 = 4" },
        ] as const).map(m => (
          <button key={m.key}
            onClick={() => { setRankMethod(m.key); setRankFound(true); }}
            className={`px-5 py-2.5 rounded-xl border text-sm font-bold transition-all
              ${rankMethod === m.key
                ? "bg-primary text-primary-foreground border-primary"
                : "border-border hover:bg-secondary"
              }`}
          >
            {m.label}
          </button>
        ))}
      </div>

      {/* SQL for chosen method */}
      {rankMethod && (
        <div className="w-full max-w-xl bg-black/80 rounded-xl p-4 font-mono text-xs text-green-400 mb-6 animate-in fade-in">
          {rankMethod === "rownumber" ? (
            <>
              <p><span className="text-blue-400">SELECT</span> Roll_No, Name <span className="text-blue-400">FROM</span> (</p>
              <p className="pl-4"><span className="text-blue-400">SELECT</span> Roll_No, Name, Marks,</p>
              <p className="pl-8"><span className="text-yellow-400">ROW_NUMBER()</span> OVER (
                <span className="text-blue-400">ORDER BY</span> Marks <span className="text-blue-400">DESC</span>) AS rnk</p>
              <p className="pl-4"><span className="text-blue-400">FROM</span> MARKS</p>
              <p>) <span className="text-blue-400">WHERE</span> rnk = <span className="text-orange-400">4</span>;</p>
            </>
          ) : (
            <>
              <p><span className="text-blue-400">SELECT</span> Roll_No, Name <span className="text-blue-400">FROM</span> MARKS M1</p>
              <p><span className="text-blue-400">WHERE</span> (<span className="text-blue-400">SELECT COUNT</span>(*)</p>
              <p className="pl-4"><span className="text-blue-400">FROM</span> MARKS M2</p>
              <p className="pl-4"><span className="text-blue-400">WHERE</span> M2.Marks &gt; M1.Marks) = <span className="text-orange-400">3</span>;</p>
            </>
          )}
        </div>
      )}

      {rankFound && (
        <div className="flex flex-col items-center gap-4 animate-in zoom-in">
          <div className="text-green-500 font-bold text-lg">
            🎯 4th Rank: <strong>{FOURTH_RANK.name}</strong> ({FOURTH_RANK.marks} marks)
          </div>
          <button
            onClick={() => { game.addXp(100, "Rank Master"); game.nextStage(); }}
            className="px-8 py-3 bg-primary text-primary-foreground font-bold rounded-xl"
          >
            Mini Challenges → 🧩
          </button>
        </div>
      )}
    </StageWrapper>
  );

  const renderStage7 = () => {
    const q1c = quiz1Ans === "in";
    const q2c = quiz2Ans === "exists";
    const q3c = quiz3Ans === "union";
    const q1w = quiz1Ans !== null && !q1c;
    const q2w = quiz2Ans !== null && !q2c;
    const q3w = quiz3Ans !== null && !q3c;
    const allDone = q1c && q2c && q3c;

    return (
      <StageWrapper>
        <h3 className="text-2xl font-bold text-primary mb-2 flex items-center gap-2">
          🧩 Mini Challenges
        </h3>
        <p className="text-muted-foreground text-sm mb-8 max-w-md text-center">
          Test your operator knowledge. Retake any you get wrong.
        </p>

        <div className="w-full max-w-lg space-y-4 mb-8">
          {/* Q1 */}
          <div>
            <QuizBlock
              question="Which operator checks if a value exists in a list returned by a subquery?"
              options={[
                { label: "EXISTS", value: "exists" },
                { label: "IN", value: "in" },
                { label: "ANY", value: "any" },
                { label: "ALL", value: "all" },
              ]}
              correctValue="in"
              selectedValue={quiz1Ans}
              onSelect={setQuiz1Ans}
              correctFeedback="✅ IN checks membership in a set of values."
              wrongFeedback="❌ EXISTS checks for row presence, not value membership. Try IN."
            />
            {q1w && (
              <button onClick={() => setQuiz1Ans(null)}
                className="mt-2 px-4 py-1.5 text-xs bg-yellow-500/20 border border-yellow-500/50
                           text-yellow-600 dark:text-yellow-400 rounded-lg font-semibold">
                🔄 Retake
              </button>
            )}
          </div>

          {/* Q2 */}
          <div>
            <QuizBlock
              question="Which operator stops as soon as ONE matching row is found (short-circuit)?"
              options={[
                { label: "IN", value: "in" },
                { label: "ALL", value: "all" },
                { label: "EXISTS", value: "exists" },
                { label: "INTERSECT", value: "intersect" },
              ]}
              correctValue="exists"
              selectedValue={quiz2Ans}
              onSelect={setQuiz2Ans}
              correctFeedback="✅ EXISTS short-circuits — it stops at the first matching row."
              wrongFeedback="❌ EXISTS is the one that short-circuits for performance."
            />
            {q2w && (
              <button onClick={() => setQuiz2Ans(null)}
                className="mt-2 px-4 py-1.5 text-xs bg-yellow-500/20 border border-yellow-500/50
                           text-yellow-600 dark:text-yellow-400 rounded-lg font-semibold">
                🔄 Retake
              </button>
            )}
          </div>

          {/* Q3 */}
          <div>
            <QuizBlock
              question="Which set operation combines results AND removes duplicates automatically?"
              options={[
                { label: "UNION ALL", value: "unionall" },
                { label: "INTERSECT", value: "intersect" },
                { label: "UNION", value: "union" },
                { label: "EXISTS", value: "exists" },
              ]}
              correctValue="union"
              selectedValue={quiz3Ans}
              onSelect={setQuiz3Ans}
              correctFeedback="✅ UNION deduplicates. UNION ALL keeps everything."
              wrongFeedback="❌ INTERSECT finds common rows. UNION combines and deduplicates."
            />
            {q3w && (
              <button onClick={() => setQuiz3Ans(null)}
                className="mt-2 px-4 py-1.5 text-xs bg-yellow-500/20 border border-yellow-500/50
                           text-yellow-600 dark:text-yellow-400 rounded-lg font-semibold">
                🔄 Retake
              </button>
            )}
          </div>
        </div>

        {/* Progress */}
        <div className="flex items-center gap-2 mb-6 text-sm text-muted-foreground">
          <span>Solved:</span>
          {[q1c, q2c, q3c].map((c, i) => (
            <span key={i} className={c ? "text-green-500 font-bold" : "text-muted-foreground"}>
              {["①","②","③"][i]}
            </span>
          ))}
          <span>({[q1c,q2c,q3c].filter(Boolean).length}/3)</span>
        </div>

        {allDone && (
          <button
            onClick={() => { game.addXp(150, "Quiz Champion"); game.nextStage(); }}
            className="px-10 py-3 bg-primary text-primary-foreground font-bold rounded-xl animate-in zoom-in text-lg"
          >
            <Swords className="size-5 inline mr-2 text-red-300" /> Final Boss
          </button>
        )}
      </StageWrapper>
    );
  };

  const BOSS_STEPS = [
    { id: "in",        label: "Find Hyderabad students",        tool: "IN Operator",    xp: 80  },
    { id: "exists",    label: "Remove students without marks",  tool: "NOT EXISTS",     xp: 80  },
    { id: "any",       label: "Find students beating any IT mark", tool: "ANY",         xp: 80  },
    { id: "union",     label: "Combine CSE + IT names",         tool: "UNION",          xp: 80  },
    { id: "intersect", label: "Students in both CS101 & CS102", tool: "INTERSECT",      xp: 80  },
    { id: "rank",      label: "Identify the 4th rank student",  tool: "ROW_NUMBER()",   xp: 100 },
  ];

  const renderStage8 = () => {
    const allBossDone = bossSteps.length === BOSS_STEPS.length;

    return (
      <StageWrapper>
        <h3 className="text-2xl font-bold text-primary mb-2 flex items-center gap-2">
          <Swords className="size-6 text-red-500" /> The Grand Data Heist
        </h3>
        <p className="text-muted-foreground text-sm mb-8 max-w-md text-center">
          The database is corrupted. Execute all 6 operations in order to restore it.
          No hints — apply what you've learned.
        </p>

        <div className="w-full max-w-lg space-y-3 mb-8">
          {BOSS_STEPS.map((step, i) => {
            const done   = bossSteps.includes(step.id);
            const active = !done && bossSteps.length === i;

            return (
              <div key={step.id}
                className={`flex items-center gap-4 p-4 rounded-xl border-2 transition-all
                  ${done   ? "border-green-500 bg-green-500/10"
                  : active ? "border-primary bg-primary/10 shadow-md"
                  :          "border-border opacity-50"
                  }`}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shrink-0
                  ${done ? "bg-green-500 text-white" : active ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}>
                  {done ? "✓" : i + 1}
                </div>
                <div className="flex-1">
                  <div className="text-sm font-semibold">{step.label}</div>
                  <div className="text-xs text-muted-foreground font-mono">{step.tool}</div>
                </div>
                {active && (
                  <button
                    onClick={() => {
                      setBossSteps(p => [...p, step.id]);
                      game.addXp(step.xp, step.tool);
                    }}
                    className="px-4 py-1.5 bg-primary text-primary-foreground text-xs font-bold rounded-lg"
                  >
                    Execute ⚡
                  </button>
                )}
                {done && <span className="text-green-500 text-sm">+{step.xp} XP</span>}
              </div>
            );
          })}
        </div>

        {allBossDone && (
          <button
            onClick={() => { game.addXp(200, "Master of Subqueries"); game.nextStage(); }}
            className="px-10 py-3 bg-primary text-primary-foreground font-bold rounded-xl animate-in zoom-in text-lg"
          >
            👑 Claim the Crown
          </button>
        )}
      </StageWrapper>
    );
  };

  const renderStage9 = () => (
    <CompletionScreen
      missionTitle="Database Kingdom Secured! 👑"
      missionSubtitle="You navigated every data mystery using advanced SQL powers."
      xp={game.xp}
      xpLog={game.xpLog}
      achievements={[
        { icon: <span>🧠</span>, label: "Subquery Strategist" },
        { icon: <span>⚔️</span>, label: "Comparison Warrior" },
        { icon: <span>🔗</span>, label: "Data Integrator" },
        { icon: <span>🏆</span>, label: "Rank Master" },
      ]}
      concepts={[
        { label: "IN",        description: "Membership test — true if value matches any subquery result." },
        { label: "EXISTS",    description: "Presence test — short-circuits on first match for speed." },
        { label: "ANY / ALL", description: "ANY = at least one (OR). ALL = every value (AND)." },
        { label: "UNION",     description: "Combines two result sets and removes duplicates." },
        { label: "INTERSECT", description: "Returns only rows common to both result sets." },
        { label: "ROW_NUMBER()", description: "Window function that assigns sequential rank by order." },
      ]}
      onReset={game.reset}
    />
  );

  return (
    <SimShell
      title="Query Quest"
      subtitle="DBMS Lab — Experiment 2"
      xp={game.xp}
      stage={game.stage}
      totalStages={TOTAL_STAGES}
      mistakeMessage={game.mistakeMessage}
      successMessage={game.successMessage}
      icon={<span className="text-lg">🔍</span>}
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
