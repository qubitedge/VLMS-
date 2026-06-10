
import { useState } from "react";
import { ChevronRight, Swords} from "lucide-react";
import {
  useSimGame,
  useSteppedArray,   // remove if not array-based
  SimShell,
  StageWrapper,
  QuizBlock,
  CompletionScreen,
} from "@/components/simulations/shared";

// ── Constants ─────────────────────────────────────────────────────────────────
const TOTAL_STAGES = 8; // 6 content + boss + completion
const DEPT_TABLE = ["DeptID (PK)", "DeptName", "Location"];
const STUDENT_COLUMNS = ["StudentID", "Name", "Age", "DeptID"];

export function DBMSConstraintsSim() {
  // ── Game state (required) ────────────────────────────────────────────────
  const game = useSimGame(TOTAL_STAGES, () => {
    setPlacedColumns([]);
    setConstraints({});
    setInsertResults([]);
    setInserted([]); 
    setQuiz1Ans(null);
    setQuiz2Ans(null);
    setQuiz3Ans(null);
    setBossPhase(1);
    setBossErrors([]);
  });
  
  // Stage-specific state
  const [placedColumns, setPlacedColumns]   = useState<string[]>([]);
  const [constraints, setConstraints]       = useState<Record<string,string>>({});
  const [insertResults, setInsertResults]   = useState<Array<{row:string, ok:boolean}>>([]);
  const [quiz1Ans, setQuiz1Ans]             = useState<string|null>(null);
  const [quiz2Ans, setQuiz2Ans]             = useState<string|null>(null);
  const [quiz3Ans, setQuiz3Ans]             = useState<string|null>(null);
  const [bossPhase, setBossPhase]           = useState(1);
  const [bossErrors, setBossErrors]         = useState<string[]>([]);
  const [alterDone, setAlterDone]           = useState(false);
  const [queryFilter, setQueryFilter]       = useState("");
  const [dropConfirmed, setDropConfirmed]   = useState(false);
  const [inserted, setInserted]             = useState<number[]>([]);

  const COLUMNS_TO_PLACE = ["StudentID", "Name", "Age", "DeptID"];
const CONSTRAINT_OPTIONS = [
  { col: "StudentID", label: "🔑 PRIMARY KEY", value: "pk" },
  { col: "Name",      label: "🚫 NOT NULL",    value: "nn" },
  { col: "Age",       label: "✔ CHECK ≥ 18",  value: "chk" },
  { col: "DeptID",    label: "🔗 FOREIGN KEY", value: "fk" },
];

const renderStage1 = () => {
  const allPlaced = placedColumns.length === COLUMNS_TO_PLACE.length;
  const allConstrained = Object.keys(constraints).length === 4;

  return (
    <StageWrapper>
      <div className="text-center mb-6 max-w-lg">
        <h2 className="text-2xl font-bold text-primary mb-1">
          🏙️ The Empty City Blueprint
        </h2>
        <p className="text-muted-foreground text-sm">
          Design the STUDENT table. Add each column to the building, 
          then assign a constraint to each floor.
        </p>
      </div>

      {/* City building visual */}
      <div className="flex gap-8 mb-8 items-end">
        {/* Column palette */}
        <div className="flex flex-col gap-2">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">
            Available Columns
          </p>
          {COLUMNS_TO_PLACE.map(col => (
            <button
              key={col}
              disabled={placedColumns.includes(col)}
              onClick={() => setPlacedColumns(p => [...p, col])}
              className={`px-4 py-2 text-sm font-mono rounded border transition-all
                ${placedColumns.includes(col)
                  ? "opacity-30 cursor-not-allowed border-border bg-muted"
                  : "border-primary/50 bg-primary/10 hover:bg-primary/20 cursor-pointer"
                }`}
            >
              {col}
            </button>
          ))}
        </div>

        {/* Building */}
        <div className="flex flex-col items-center">
          <div className="text-xs font-bold text-muted-foreground mb-2">STUDENT Table</div>
          <div className={`w-48 border-2 rounded-xl overflow-hidden transition-all
            ${allPlaced ? "border-primary shadow-[0_0_20px_hsl(var(--primary)/0.3)]" : "border-border"}`}
          >
            {/* Roof */}
            <div className={`h-8 flex items-center justify-center text-xs font-bold
              ${allPlaced ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}>
              🏢 STUDENT
            </div>
            {/* Floors */}
            {placedColumns.length === 0 && (
              <div className="h-32 flex items-center justify-center text-xs text-muted-foreground">
                Click columns →
              </div>
            )}
            {placedColumns.map((col, i) => (
              <div key={col}
                className="border-t border-border px-3 py-2 text-xs font-mono bg-card
                           flex items-center justify-between"
              >
                <span>{col}</span>
                {constraints[col] && (
                  <span className="text-primary text-[10px] font-bold">{constraints[col]}</span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Constraint palette */}
        {allPlaced && (
          <div className="flex flex-col gap-2 animate-in fade-in slide-in-from-right-4">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">
              Assign Constraints
            </p>
            {CONSTRAINT_OPTIONS.map(opt => (
              <button
                key={opt.col}
                disabled={!!constraints[opt.col]}
                onClick={() => setConstraints(c => ({ ...c, [opt.col]: opt.label }))}
                className={`px-4 py-2 text-xs rounded border transition-all text-left
                  ${constraints[opt.col]
                    ? "opacity-30 cursor-not-allowed border-border"
                    : "border-yellow-500/50 bg-yellow-500/10 hover:bg-yellow-500/20 cursor-pointer"
                  }`}
              >
                {opt.label} → {opt.col}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* SQL preview */}
      {allPlaced && (
        <div className="w-full max-w-lg bg-black/80 rounded-xl p-4 font-mono text-xs
                        text-green-400 mb-6 animate-in fade-in">
          <p className="text-muted-foreground mb-1">-- Generated SQL</p>
          <p>CREATE TABLE STUDENT (</p>
          <p className="pl-4">StudentID INT <span className="text-yellow-400">PRIMARY KEY</span>,</p>
          <p className="pl-4">Name VARCHAR(50) <span className="text-yellow-400">NOT NULL</span>,</p>
          <p className="pl-4">Age INT <span className="text-yellow-400">CHECK (Age &gt;= 18)</span>,</p>
          <p className="pl-4">DeptID INT <span className="text-yellow-400">REFERENCES DEPARTMENT(DeptID)</span></p>
          <p>);</p>
        </div>
      )}

      {allPlaced && allConstrained && (
        <button
          onClick={() => { game.addXp(100, "Schema Builder"); game.nextStage(); }}
          className="px-8 py-3 bg-primary text-primary-foreground font-bold rounded-xl
                     animate-in zoom-in flex items-center gap-2"
        >
          🏗️ Activate Building <ChevronRight className="size-4" />
        </button>
      )}
    </StageWrapper>
  );
};

const INSERT_ROWS = [
  { label: "(1, 'Alice', 22, 101)", ok: true,  reason: "All constraints satisfied ✅" },
  { label: "(1, 'Bob',  19, 101)",  ok: false, reason: "Duplicate PK=1 — PRIMARY KEY violation ❌" },
  { label: "(2, NULL,  21, 101)",   ok: false, reason: "Name is NULL — NOT NULL violated ❌" },
  { label: "(3, 'Eve',  15, 101)",  ok: false, reason: "Age=15 < 18 — CHECK violated ❌" },
  { label: "(4, 'Dan',  20, 999)",  ok: false, reason: "DeptID 999 doesn't exist — FK violated ❌" },
  { label: "(5, 'Sam',  25, 101)",  ok: true,  reason: "All constraints satisfied ✅" },
];

const renderStage2 = () => {
  const allTried = insertResults.length === INSERT_ROWS.length;
  const nextRow = INSERT_ROWS[insertResults.length];

  return (
    <StageWrapper>
      <div className="text-center mb-6 max-w-lg">
        <h3 className="text-xl font-bold text-primary mb-1">🛡️ Constraint Guardians</h3>
        <p className="text-muted-foreground text-sm">
          Try inserting each data row. Predict: will the guardian allow or block it?
        </p>
      </div>

      {/* Current row to insert */}
      {!allTried && (
        <div className="w-full max-w-lg mb-6">
          <div className="bg-black/80 rounded-xl p-4 font-mono text-sm text-green-400 mb-4">
            INSERT INTO STUDENT VALUES {nextRow.label};
          </div>
          <div className="flex gap-3 justify-center">
            <button
              onClick={() => {
                const correct = nextRow.ok;
                if (correct) {
                  game.addXp(25, "Correct prediction");
                  setInsertResults(r => [...r, { row: nextRow.label, ok: true }]);
                } else {
                  game.showMistake("This row will actually be rejected! " + nextRow.reason);
                  setInsertResults(r => [...r, { row: nextRow.label, ok: false }]);
                }
              }}
              className="px-6 py-2 bg-green-500/20 border border-green-500 text-green-600
                         dark:text-green-400 rounded-lg font-semibold hover:bg-green-500/30"
            >
              ✅ Allow
            </button>
            <button
              onClick={() => {
                const correct = !nextRow.ok;
                if (correct) {
                  game.addXp(25, "Correct prediction");
                  setInsertResults(r => [...r, { row: nextRow.label, ok: false }]);
                } else {
                  game.showMistake("This row is actually valid! " + nextRow.reason);
                  setInsertResults(r => [...r, { row: nextRow.label, ok: true }]);
                }
              }}
              className="px-6 py-2 bg-red-500/20 border border-red-500 text-red-600
                         dark:text-red-400 rounded-lg font-semibold hover:bg-red-500/30"
            >
              ❌ Block
            </button>
          </div>
        </div>
      )}

      {/* Results log */}
      <div className="w-full max-w-lg space-y-2 mb-6">
        {insertResults.map((r, i) => (
          <div key={i}
            className={`flex items-start gap-3 p-3 rounded-lg border text-xs font-mono
              ${INSERT_ROWS[i].ok
                ? "bg-green-500/10 border-green-500/30 text-green-700 dark:text-green-400"
                : "bg-red-500/10 border-red-500/30 text-red-700 dark:text-red-400"
              }`}
          >
            <span>{INSERT_ROWS[i].ok ? "✅" : "❌"}</span>
            <div>
              <div>{r.row}</div>
              <div className="text-muted-foreground mt-0.5">{INSERT_ROWS[i].reason}</div>
            </div>
          </div>
        ))}
      </div>

      {allTried && (
        <button
          onClick={() => { game.addXp(150, "Data Protector"); game.nextStage(); }}
          className="px-8 py-3 bg-primary text-primary-foreground font-bold rounded-xl animate-in zoom-in"
        >
          Proceed to City Expansion 🏗️
        </button>
      )}
    </StageWrapper>
  );
};

const renderStage3 = () => (
  <StageWrapper>
    <div className="text-center mb-6 max-w-lg">
      <h3 className="text-xl font-bold text-primary mb-1">🏗️ City Expansion Lab</h3>
      <p className="text-muted-foreground text-sm">
        Systems evolve. Add a Phone column to STUDENT without breaking anything.
      </p>
    </div>

    {/* Before / After building */}
    <div className="flex gap-6 mb-8 items-start w-full max-w-xl justify-center">
      {/* Before */}
      <div className="flex-1">
        <p className="text-xs font-bold text-center text-muted-foreground mb-2">BEFORE</p>
        <div className="border-2 border-border rounded-xl overflow-hidden">
          <div className="bg-muted px-3 py-2 text-xs font-bold text-center">🏢 STUDENT</div>
          {["StudentID PK", "Name NOT NULL", "Age CHECK≥18", "DeptID FK"].map(c => (
            <div key={c} className="border-t border-border px-3 py-1.5 text-xs font-mono bg-card">{c}</div>
          ))}
        </div>
      </div>

      {/* Arrow */}
      <div className="flex items-center pt-16 text-2xl text-primary font-bold">→</div>

      {/* After */}
      <div className="flex-1">
        <p className="text-xs font-bold text-center text-muted-foreground mb-2">AFTER</p>
        <div className={`border-2 rounded-xl overflow-hidden transition-all
          ${alterDone ? "border-primary shadow-[0_0_15px_hsl(var(--primary)/0.25)]" : "border-border"}`}>
          <div className={`px-3 py-2 text-xs font-bold text-center
            ${alterDone ? "bg-primary text-primary-foreground" : "bg-muted"}`}>
            🏢 STUDENT
          </div>
          {["StudentID PK", "Name NOT NULL", "Age CHECK≥18", "DeptID FK"].map(c => (
            <div key={c} className="border-t border-border px-3 py-1.5 text-xs font-mono bg-card">{c}</div>
          ))}
          {alterDone && (
            <div className="border-t border-primary/50 px-3 py-1.5 text-xs font-mono
                            bg-primary/10 text-primary animate-in slide-in-from-bottom-2 font-bold">
              Phone VARCHAR(15) ← NEW
            </div>
          )}
        </div>
      </div>
    </div>

    {/* SQL to execute */}
    <div className="w-full max-w-lg bg-black/80 rounded-xl p-4 font-mono text-xs
                    text-green-400 mb-6">
      <p className="text-muted-foreground mb-1">-- Execute this command:</p>
      <p>ALTER TABLE STUDENT</p>
      <p className="pl-4">ADD Phone VARCHAR(15);</p>
    </div>

    {!alterDone ? (
      <button
        onClick={() => { setAlterDone(true); game.addXp(120, "Schema Evolver"); }}
        className="px-8 py-3 bg-primary text-primary-foreground font-bold rounded-xl hover:opacity-90"
      >
        ⚡ Execute ALTER TABLE
      </button>
    ) : (
      <button
        onClick={() => game.nextStage()}
        className="px-8 py-3 bg-primary text-primary-foreground font-bold rounded-xl animate-in zoom-in"
      >
        Continue to INSERT → 
      </button>
    )}
  </StageWrapper>
);

const CITIZENS = [
  { id: 1, name: "Alice", age: 22, dept: 101 },
  { id: 2, name: "Bob",   age: 19, dept: 102 },
  { id: 3, name: "Carol", age: 25, dept: 101 },
];

const renderStage4 = () => {


  return (
    <StageWrapper>
      <div className="text-center mb-6 max-w-lg">
        <h3 className="text-xl font-bold text-primary mb-1">👥 Data Infiltration</h3>
        <p className="text-muted-foreground text-sm">
          Send each citizen into the STUDENT building. 
          Click INSERT to populate the table.
        </p>
      </div>

      <div className="flex gap-4 mb-8 flex-wrap justify-center">
        {CITIZENS.map(c => {
          const done = inserted.includes(c.id);
          return (
            <div key={c.id}
              className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 w-36 transition-all
                ${done ? "border-green-500 bg-green-500/10" : "border-border bg-card hover:border-primary/50"}`}
            >
              <div className={`text-3xl ${done ? "" : "animate-bounce"}`}>
                {done ? "🏢" : "🧑"}
              </div>
              <div className="text-xs font-mono text-center leading-relaxed">
                <div className="font-bold">{c.name}</div>
                <div className="text-muted-foreground">ID: {c.id}</div>
                <div className="text-muted-foreground">Age: {c.age}</div>
                <div className="text-muted-foreground">Dept: {c.dept}</div>
              </div>
              {!done ? (
                <button
                  onClick={() => {
                    setInserted(i => [...i, c.id]);
                    game.addXp(30, `Inserted ${c.name}`);
                  }}
                  className="px-3 py-1 text-xs bg-primary text-primary-foreground rounded font-bold"
                >
                  INSERT
                </button>
              ) : (
                <span className="text-green-500 text-xs font-bold">✅ In DB</span>
              )}
            </div>
          );
        })}
      </div>

      {/* Table preview */}
      {inserted.length > 0 && (
        <div className="w-full max-w-lg mb-6 animate-in fade-in">
          <p className="text-xs font-bold text-muted-foreground mb-2">STUDENT Table — Current State</p>
          <table className="w-full text-xs border border-border rounded-lg overflow-hidden">
            <thead>
              <tr className="bg-muted">
                {["StudentID","Name","Age","DeptID"].map(h => (
                  <th key={h} className="px-3 py-2 text-left font-semibold border-r border-border last:border-0">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {CITIZENS.filter(c => inserted.includes(c.id)).map(c => (
                <tr key={c.id} className="border-t border-border animate-in slide-in-from-left-4">
                  <td className="px-3 py-2 border-r border-border font-mono">{c.id}</td>
                  <td className="px-3 py-2 border-r border-border">{c.name}</td>
                  <td className="px-3 py-2 border-r border-border">{c.age}</td>
                  <td className="px-3 py-2">{c.dept}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {inserted.length === CITIZENS.length && (
        <button
          onClick={() => { game.addXp(100, "Data Loader"); game.nextStage(); }}
          className="px-8 py-3 bg-primary text-primary-foreground font-bold rounded-xl animate-in zoom-in"
        >
          Detective Mode → 🔍
        </button>
      )}
    </StageWrapper>
  );
};

const ALL_STUDENTS = [
  { id: 1, name: "Alice", age: 22, dept: 101 },
  { id: 2, name: "Bob",   age: 19, dept: 102 },
  { id: 3, name: "Carol", age: 25, dept: 101 },
];

const renderStage5 = () => {
  const filtered = ALL_STUDENTS.filter(s =>
    queryFilter === "dept101" ? s.dept === 101 :
    queryFilter === "age20"   ? s.age > 20    :
    true
  );

  return (
    <StageWrapper>
      <div className="text-center mb-6 max-w-lg">
        <h3 className="text-xl font-bold text-primary mb-1">🔍 Detective Mode</h3>
        <p className="text-muted-foreground text-sm">
          Choose a WHERE filter. Watch the scanning beam highlight matching rows.
        </p>
      </div>

      {/* Query builder */}
      <div className="bg-black/80 rounded-xl p-4 font-mono text-sm text-green-400 mb-6 w-full max-w-lg">
        <span className="text-blue-400">SELECT</span> * <span className="text-blue-400">FROM</span> STUDENT
        {queryFilter && (
          <span className="text-yellow-400 animate-in fade-in">
            {" "}<span className="text-blue-400">WHERE</span>{" "}
            {queryFilter === "dept101" ? "DeptID = 101" : "Age > 20"}
          </span>
        )}
        ;
      </div>

      {/* Filter buttons */}
      <div className="flex gap-3 mb-8">
        <button
          onClick={() => setQueryFilter("")}
          className={`px-4 py-2 text-sm rounded-lg border font-medium transition-all
            ${queryFilter === "" ? "bg-primary text-primary-foreground border-primary" : "border-border hover:bg-secondary"}`}
        >
          No Filter (SELECT *)
        </button>
        <button
          onClick={() => setQueryFilter("dept101")}
          className={`px-4 py-2 text-sm rounded-lg border font-medium transition-all
            ${queryFilter === "dept101" ? "bg-primary text-primary-foreground border-primary" : "border-border hover:bg-secondary"}`}
        >
          DeptID = 101
        </button>
        <button
          onClick={() => setQueryFilter("age20")}
          className={`px-4 py-2 text-sm rounded-lg border font-medium transition-all
            ${queryFilter === "age20" ? "bg-primary text-primary-foreground border-primary" : "border-border hover:bg-secondary"}`}
        >
          Age &gt; 20
        </button>
      </div>

      {/* Results table with highlight */}
      <div className="w-full max-w-lg mb-8">
        <p className="text-xs text-muted-foreground mb-2">
          {filtered.length} row{filtered.length !== 1 ? "s" : ""} matched
        </p>
        <table className="w-full text-xs border border-border rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-muted">
              {["StudentID","Name","Age","DeptID"].map(h => (
                <th key={h} className="px-3 py-2 text-left font-semibold border-r border-border last:border-0">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {ALL_STUDENTS.map(s => {
              const isMatch = filtered.some(f => f.id === s.id);
              return (
                <tr key={s.id} className={`border-t border-border transition-all duration-500
                  ${isMatch ? "bg-primary/10" : "opacity-30"}`}
                >
                  <td className="px-3 py-2 border-r border-border font-mono">{s.id}</td>
                  <td className="px-3 py-2 border-r border-border">{s.name}</td>
                  <td className="px-3 py-2 border-r border-border">{s.age}</td>
                  <td className="px-3 py-2">{s.dept}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {queryFilter !== "" && (
        <button
          onClick={() => { game.addXp(130, "Data Detective"); game.nextStage(); }}
          className="px-8 py-3 bg-primary text-primary-foreground font-bold rounded-xl animate-in zoom-in"
        >
          Collapse Protocol → ⚠️
        </button>
      )}
    </StageWrapper>
  );
};

const renderStage6 = () => (
  <StageWrapper>
    <div className="text-center mb-6 max-w-lg">
      <h3 className="text-xl font-bold text-red-500 mb-1">⚠️ The Collapse Protocol</h3>
      <p className="text-muted-foreground text-sm">
        DROP TABLE is irreversible. Dropping DEPARTMENT will cascade and break 
        all STUDENT rows that reference it.
      </p>
    </div>

    {/* Dependency diagram */}
    <div className="flex items-center gap-4 mb-8">
      <div className={`p-4 rounded-xl border-2 text-center transition-all
        ${dropConfirmed ? "border-red-500/50 bg-red-500/10 opacity-40" : "border-border bg-card"}`}>
        <div className="text-2xl mb-1">🏢</div>
        <div className="text-xs font-bold">DEPARTMENT</div>
        {dropConfirmed && <div className="text-red-500 text-xs mt-1 animate-in fade-in">DROPPED</div>}
      </div>
      <div className={`text-2xl transition-all ${dropConfirmed ? "text-red-500 animate-pulse" : "text-muted-foreground"}`}>
        {dropConfirmed ? "💥" : "🔗"}
      </div>
      <div className={`p-4 rounded-xl border-2 text-center transition-all
        ${dropConfirmed ? "border-red-500/50 bg-red-500/10" : "border-border bg-card"}`}>
        <div className="text-2xl mb-1">🏛️</div>
        <div className="text-xs font-bold">STUDENT</div>
        {dropConfirmed && (
          <div className="text-red-500 text-xs mt-1 animate-in fade-in">
            FK broken!
          </div>
        )}
      </div>
    </div>

    <div className="bg-black/80 rounded-xl p-4 font-mono text-xs text-green-400 w-full max-w-lg mb-6">
      <p className="text-red-400 mb-1">-- WARNING: Irreversible!</p>
      <p>DROP TABLE DEPARTMENT CASCADE CONSTRAINTS;</p>
    </div>

    {!dropConfirmed ? (
      <button
        onClick={() => { setDropConfirmed(true); game.addXp(80, "System Controller"); }}
        className="px-8 py-3 bg-red-500 text-white font-bold rounded-xl hover:bg-red-600 transition-colors"
      >
        💣 Execute DROP TABLE
      </button>
    ) : (
      <div className="flex flex-col items-center gap-4 animate-in fade-in">
        <p className="text-red-500 font-bold text-sm">
          All STUDENT foreign key references are now invalid.
          Always check dependencies before dropping!
        </p>
        <button
          onClick={() => game.nextStage()}
          className="px-8 py-3 bg-primary text-primary-foreground font-bold rounded-xl"
        >
          Final Boss Challenge →
        </button>
      </div>
    )}
  </StageWrapper>
);
const renderStage7 = () => {
  const quiz1Correct = quiz1Ans === "pk";
  const quiz2Correct = quiz2Ans === "rejected";
  const quiz3Correct = quiz3Ans === "nn";

  const quiz1Wrong = quiz1Ans !== null && !quiz1Correct;
  const quiz2Wrong = quiz2Ans !== null && !quiz2Correct;
  const quiz3Wrong = quiz3Ans !== null && !quiz3Correct;

  const allDone = quiz1Correct && quiz2Correct && quiz3Correct;

  return (
    <StageWrapper>
      <h3 className="text-2xl font-bold text-primary mb-2 flex items-center gap-2">
        <Swords className="size-6 text-red-500" /> Restore Datapolis — Final Boss
      </h3>
      <p className="text-muted-foreground text-sm mb-8 max-w-md text-center">
        Three critical systems are failing. Diagnose and fix each one.
        You can retake any question you got wrong.
      </p>

      <div className="w-full max-w-lg space-y-4 mb-8">

        {/* Quiz 1 */}
        <div className="relative">
          <QuizBlock
            question="Which constraint uniquely identifies each row in a table?"
            options={[
              { label: "NOT NULL", value: "nn" },
              { label: "PRIMARY KEY", value: "pk" },
              { label: "FOREIGN KEY", value: "fk" },
              { label: "UNIQUE", value: "uq" },
            ]}
            correctValue="pk"
            selectedValue={quiz1Ans}
            onSelect={setQuiz1Ans}
            correctFeedback="✅ Correct! PRIMARY KEY = unique + not null identifier."
            wrongFeedback="❌ Remember: PK uniquely identifies rows. NOT NULL just prevents blanks."
          />
          {quiz1Wrong && (
            <button
              onClick={() => setQuiz1Ans(null)}
              className="mt-2 px-4 py-1.5 text-xs bg-yellow-500/20 border border-yellow-500/50
                         text-yellow-600 dark:text-yellow-400 rounded-lg hover:bg-yellow-500/30 font-semibold"
            >
              🔄 Retake Question 1
            </button>
          )}
          {quiz1Correct && (
            <div className="mt-1 text-xs text-green-500 font-bold flex items-center gap-1">
              ✅ System 1 Restored
            </div>
          )}
        </div>

        {/* Quiz 2 */}
        <div className="relative">
          <QuizBlock
            question="What happens when INSERT INTO STUDENT VALUES (2, NULL, 20, 101) is run if Name has NOT NULL?"
            options={[
              { label: "Accepted with warning", value: "warning" },
              { label: "Row is rejected", value: "rejected" },
              { label: "NULL is stored as empty string", value: "empty" },
            ]}
            correctValue="rejected"
            selectedValue={quiz2Ans}
            onSelect={setQuiz2Ans}
            correctFeedback="✅ Correct! NOT NULL constraint rejects the insert entirely."
            wrongFeedback="❌ The database enforces the constraint — the row is rejected, not stored."
          />
          {quiz2Wrong && (
            <button
              onClick={() => setQuiz2Ans(null)}
              className="mt-2 px-4 py-1.5 text-xs bg-yellow-500/20 border border-yellow-500/50
                         text-yellow-600 dark:text-yellow-400 rounded-lg hover:bg-yellow-500/30 font-semibold"
            >
              🔄 Retake Question 2
            </button>
          )}
          {quiz2Correct && (
            <div className="mt-1 text-xs text-green-500 font-bold flex items-center gap-1">
              ✅ System 2 Restored
            </div>
          )}
        </div>

        {/* Quiz 3 */}
        <div className="relative">
          <QuizBlock
            question="Spot the violation: INSERT INTO STUDENT VALUES (3, NULL, 22, 101)"
            options={[
              { label: "PRIMARY KEY violation", value: "pk" },
              { label: "NOT NULL violation on Name", value: "nn" },
              { label: "CHECK violation on Age", value: "chk" },
              { label: "No violation", value: "none" },
            ]}
            correctValue="nn"
            selectedValue={quiz3Ans}
            onSelect={setQuiz3Ans}
            correctFeedback="✅ Correct! Name = NULL violates the NOT NULL constraint."
            wrongFeedback="❌ Check column 2 (Name). It's NULL — that violates NOT NULL."
          />
          {quiz3Wrong && (
            <button
              onClick={() => setQuiz3Ans(null)}
              className="mt-2 px-4 py-1.5 text-xs bg-yellow-500/20 border border-yellow-500/50
                         text-yellow-600 dark:text-yellow-400 rounded-lg hover:bg-yellow-500/30 font-semibold"
            >
              🔄 Retake Question 3
            </button>
          )}
          {quiz3Correct && (
            <div className="mt-1 text-xs text-green-500 font-bold flex items-center gap-1">
              ✅ System 3 Restored
            </div>
          )}
        </div>

      </div>

      {/* Progress indicator */}
      <div className="flex items-center gap-2 mb-6 text-sm text-muted-foreground">
        <span>Systems restored:</span>
        <span className={quiz1Correct ? "text-green-500 font-bold" : "text-muted-foreground"}>①</span>
        <span className={quiz2Correct ? "text-green-500 font-bold" : "text-muted-foreground"}>②</span>
        <span className={quiz3Correct ? "text-green-500 font-bold" : "text-muted-foreground"}>③</span>
        <span className="ml-1">
          ({[quiz1Correct, quiz2Correct, quiz3Correct].filter(Boolean).length}/3)
        </span>
      </div>

      {allDone && (
        <button
          onClick={() => { game.addXp(500, "Datapolis Restored"); game.nextStage(); }}
          className="px-10 py-3 bg-primary text-primary-foreground font-bold rounded-xl
                     animate-in zoom-in text-lg"
        >
          🏆 Complete Mission
        </button>
      )}
    </StageWrapper>
  );
};
const renderStage8 = () => (
  <CompletionScreen
    missionTitle="Datapolis Restored! 🏙️"
    missionSubtitle="You rebuilt the city from a broken schema to a fully functioning database."
    xp={game.xp}
    xpLog={game.xpLog}
    achievements={[
      { icon: <span>🏗️</span>, label: "Schema Builder" },
      { icon: <span>🛡️</span>, label: "Data Protector" },
      { icon: <span>🔍</span>, label: "Data Detective" },
      { icon: <span>🏆</span>, label: "System Architect" },
    ]}
    concepts={[
      { label: "CREATE TABLE", description: "Defines structure with columns and data types." },
      { label: "Constraints",  description: "PK, FK, NOT NULL, UNIQUE, CHECK enforce data integrity." },
      { label: "ALTER TABLE",  description: "Modifies existing structure without data loss." },
      { label: "INSERT INTO",  description: "Adds rows; all constraints are enforced on insert." },
      { label: "SELECT WHERE", description: "Filters rows — targeted queries beat full scans." },
      { label: "DROP TABLE",   description: "Irreversible — always check dependencies first." },
    ]}
    onReset={game.reset}
  />
);


  // ── Render ────────────────────────────────────────────────────────────────
  return (
    <SimShell
      title="Database Dominion"
      subtitle="DBMS Lab — Experiment 1"
      xp={game.xp}
      stage={game.stage}
      totalStages={TOTAL_STAGES}
      mistakeMessage={game.mistakeMessage}
      successMessage={game.successMessage}
      icon={<span className="text-lg">🏙️</span>}
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