import React, { useState, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  PlayCircle, RotateCcw, Lightbulb, User, Plus, Search,
  FileText, Save, Download, AlertTriangle, ArrowDown,
  CheckCircle, XCircle, Database, Eye, Cpu, Trash2,
  ChevronRight, Terminal, Edit3, Layers
} from "lucide-react";

/* ─────────────────── Reusable UI Atoms ─────────────────── */

const SectionTitle = ({ num, title }: { num: number; title: string }) => (
  <div className="flex items-center gap-4 mb-6 mt-20 first:mt-0">
    <div className="size-11 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 text-white font-bold flex items-center justify-center shadow-lg text-sm shrink-0">{num}</div>
    <div>
      <h2 className="text-2xl font-bold text-slate-800">{title}</h2>
      <div className="h-1 w-16 rounded-full bg-gradient-to-r from-blue-400 to-purple-400 mt-1" />
    </div>
  </div>
);

const OutputConsole = ({ lines, label }: { lines: string[]; label?: string }) => (
  <div className="bg-slate-900 rounded-2xl shadow-lg border border-slate-700/50 p-5 font-mono backdrop-blur-sm">
    <h3 className="font-bold text-slate-400 uppercase tracking-widest text-[10px] mb-3 font-sans flex items-center gap-2">
      <Terminal className="size-3" />
      {label || "Output Console"}
    </h3>
    <div className="text-[14px] space-y-0.5 max-h-52 overflow-y-auto scrollbar-thin text-emerald-400">
      {lines.length > 0
        ? lines.map((l, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.03 }}
              className={
                l.includes("Error") || l.includes("Invalid") || l.includes("Not Found")
                  ? "text-red-400"
                  : l.startsWith(">>>") ? "text-blue-400" : ""
              }
            >
              <span className="text-slate-600 mr-2 select-none text-xs">{String(i + 1).padStart(2, "0")}</span>
              {l}
            </motion.div>
          ))
        : <span className="text-slate-600 italic">Awaiting execution…</span>}
    </div>
  </div>
);

const Hint = ({ text }: { text: string }) => (
  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
    className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200/60 rounded-xl p-4 text-sm text-blue-800 flex items-start gap-3">
    <Lightbulb className="size-5 text-blue-500 flex-shrink-0 mt-0.5" />
    <span>{text}</span>
  </motion.div>
);

const CL = ({ indent, active, children }: { indent: number; active?: boolean; children: React.ReactNode }) => (
  <div
    className={`transition-all duration-200 rounded-lg px-2 py-0.5 font-mono text-[14px] ${active ? "bg-emerald-100/80 border-l-4 border-emerald-500 shadow-sm" : ""}`}
    style={{ paddingLeft: `${indent * 1.5 + 0.5}rem` }}
  >
    {children}
  </div>
);

const RunButton = ({ onClick, label, icon: Icon = PlayCircle, variant }: { onClick: () => void; label?: string; icon?: React.ElementType; variant?: "green" | "default" }) => (
  <button
    onClick={onClick}
    className={`${variant === "green"
      ? "bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500"
      : "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500"
    } text-white px-6 py-2.5 rounded-xl flex items-center gap-2 transition-all shadow-md hover:shadow-lg font-semibold text-sm w-fit active:scale-95`}
  >
    <Icon className="size-4" /> {label || "Run Code"}
  </button>
);

const PanelHeader = ({ icon: Icon, title, badge }: { icon: React.ElementType; title: string; badge?: string }) => (
  <div className="flex items-center justify-between mb-4">
    <h3 className="font-bold text-slate-600 uppercase tracking-widest text-[10px] flex items-center gap-2">
      <Icon className="size-4 text-purple-500" /> {title}
    </h3>
    {badge && (
      <span className="bg-purple-100 text-purple-700 text-[10px] font-bold px-2 py-0.5 rounded-full">{badge}</span>
    )}
  </div>
);

/* ─────────────────── Student Types & Helpers ─────────────────── */

interface StudentRecord {
  name: string;
  marks: number[];
}

const getAvg = (marks: number[]) => marks.length ? marks.reduce((a, b) => a + b, 0) / marks.length : 0;
const getGrade = (avg: number) => avg >= 90 ? "A" : avg >= 80 ? "B" : avg >= 70 ? "C" : "F";
const gradeColor = (g: string) =>
  g === "A" ? "text-emerald-600 bg-emerald-50 border-emerald-200" :
  g === "B" ? "text-blue-600 bg-blue-50 border-blue-200" :
  g === "C" ? "text-amber-600 bg-amber-50 border-amber-200" :
  "text-red-600 bg-red-50 border-red-200";
const gradeBg = (g: string) =>
  g === "A" ? "from-emerald-500 to-teal-500" :
  g === "B" ? "from-blue-500 to-indigo-500" :
  g === "C" ? "from-amber-500 to-orange-500" :
  "from-red-500 to-rose-500";

/* ─────────────────── Student Object Card ─────────────────── */

const StudentCard = ({ s, onDelete }: { s: StudentRecord; onDelete?: () => void }) => {
  const avg = getAvg(s.marks);
  const grade = getGrade(avg);
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.92, y: 12 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.92, y: -12 }}
      className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden hover:shadow-md transition-shadow"
    >
      <div className={`bg-gradient-to-r ${gradeBg(grade)} px-4 py-2 flex items-center justify-between`}>
        <div className="flex items-center gap-2">
          <User className="size-4 text-white/80" />
          <span className="font-bold text-white text-sm">{s.name}</span>
        </div>
        <span className="bg-white/20 text-white text-[10px] font-bold px-2 py-0.5 rounded-full backdrop-blur-sm">
          Grade {grade}
        </span>
      </div>
      <div className="p-4 font-mono text-sm space-y-2">
        <div className="flex justify-between items-center">
          <span className="text-slate-400 text-xs">name</span>
          <span className="text-slate-800 font-medium">"{s.name}"</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-slate-400 text-xs">marks</span>
          <span className="text-slate-800">[{s.marks.join(", ")}]</span>
        </div>
        <div className="border-t border-dashed border-slate-200 pt-2 flex justify-between items-center">
          <span className="text-slate-400 text-xs">average</span>
          <span className="text-slate-800 font-bold">{avg.toFixed(1)}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-slate-400 text-xs">grade</span>
          <span className={`font-bold px-3 py-0.5 rounded-full border text-xs ${gradeColor(grade)}`}>{grade}</span>
        </div>
        {onDelete && (
          <button onClick={onDelete} className="w-full mt-1 text-[10px] text-red-400 hover:text-red-600 flex items-center justify-center gap-1 py-1 rounded hover:bg-red-50 transition-colors">
            <Trash2 className="size-3" /> Remove
          </button>
        )}
      </div>
    </motion.div>
  );
};

/* ─────────────────── Memory State Panel ─────────────────── */

const MemoryStatePanel = ({ students }: { students: StudentRecord[] }) => (
  <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5">
    <PanelHeader icon={Cpu} title="Memory State" badge={`${students.length} objects`} />
    <div className="bg-slate-50 rounded-xl border border-slate-200 p-4 font-mono text-xs space-y-1 max-h-44 overflow-y-auto">
      <div className="text-purple-600 font-bold">students = {"{"}</div>
      {students.map((s, i) => {
        const avg = getAvg(s.marks);
        return (
          <motion.div key={s.name} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="pl-4">
            <span className="text-amber-600">"{s.name}"</span>
            <span className="text-slate-400">: </span>
            <span className="text-blue-600">Student</span>
            <span className="text-slate-500">(avg={avg.toFixed(1)}, grade="{getGrade(avg)}")</span>
            {i < students.length - 1 && <span className="text-slate-400">,</span>}
          </motion.div>
        );
      })}
      <div className="text-purple-600 font-bold">{"}"}</div>
    </div>
  </div>
);

/* ═══════════════════════════════════════════════════════════
   MAIN COMPONENT
   ═══════════════════════════════════════════════════════════ */

export function PythonGradeManagementPlayground({ expId }: { expId: string }) {

  /* ── Shared student database ── */
  const [students, setStudents] = useState<StudentRecord[]>([
    { name: "Alice", marks: [80, 90, 85] },
    { name: "Bob", marks: [95, 88, 92] },
  ]);

  /* ── SECTION 1 state ── */
  const [s1Name, setS1Name] = useState("");
  const [s1Marks, setS1Marks] = useState("");
  const [s1Created, setS1Created] = useState<string | null>(null);
  const [s1Step, setS1Step] = useState(0);

  const addStudent = useCallback(() => {
    const name = s1Name.trim();
    if (!name) return;
    const marks = s1Marks.split(",").map(n => Number(n.trim())).filter(n => !isNaN(n) && n >= 0 && n <= 100);
    if (!marks.length) return;
    if (students.find(s => s.name.toLowerCase() === name.toLowerCase())) return;
    setStudents(prev => [...prev, { name, marks }]);
    setS1Created(name);
    setS1Name("");
    setS1Marks("");
    setTimeout(() => setS1Created(null), 2500);
  }, [s1Name, s1Marks, students]);

  /* ── SECTION 2 state ── */
  const [s2Selected, setS2Selected] = useState(0);
  const [s2EditMarks, setS2EditMarks] = useState("");
  const [s2Editing, setS2Editing] = useState(false);
  const s2Student = students[s2Selected] || students[0];

  const updateStudentMarks = useCallback(() => {
    const marks = s2EditMarks.split(",").map(n => Number(n.trim())).filter(n => !isNaN(n) && n >= 0 && n <= 100);
    if (!marks.length || !s2Student) return;
    setStudents(prev => prev.map((s, i) => i === s2Selected ? { ...s, marks } : s));
    setS2Editing(false);
  }, [s2EditMarks, s2Selected, s2Student]);

  /* ── SECTION 3 state ── */
  const [s3Search, setS3Search] = useState("");
  const [s3Result, setS3Result] = useState<StudentRecord | null | undefined>(undefined);
  const [s3NewName, setS3NewName] = useState("");
  const [s3NewMarks, setS3NewMarks] = useState("");

  const searchStudent = useCallback(() => {
    const found = students.find(s => s.name.toLowerCase() === s3Search.toLowerCase());
    setS3Result(found || null);
  }, [s3Search, students]);

  const addFromDb = useCallback(() => {
    const name = s3NewName.trim();
    if (!name) return;
    const marks = s3NewMarks.split(",").map(n => Number(n.trim())).filter(n => !isNaN(n) && n >= 0 && n <= 100);
    if (!marks.length) return;
    if (students.find(s => s.name.toLowerCase() === name.toLowerCase())) return;
    setStudents(prev => [...prev, { name, marks }]);
    setS3NewName("");
    setS3NewMarks("");
  }, [s3NewName, s3NewMarks, students]);

  /* ── SECTION 4 state ── */
  const [s4FileContent, setS4FileContent] = useState<string[]>([]);
  const [s4Saved, setS4Saved] = useState(false);
  const [s4Loaded, setS4Loaded] = useState(false);
  const [s4LoadedLines, setS4LoadedLines] = useState<string[]>([]);
  const [s4SaveStep, setS4SaveStep] = useState(0);

  const saveToFile = useCallback(() => {
    const lines = students.map(s => {
      const avg = getAvg(s.marks);
      return `${s.name},${avg.toFixed(1)},${getGrade(avg)}`;
    });
    setS4FileContent(lines);
    setS4Saved(true);
    setS4Loaded(false);
    setS4LoadedLines([]);
    setS4SaveStep(1);
    setTimeout(() => setS4SaveStep(2), 400);
    setTimeout(() => setS4SaveStep(3), 800);
  }, [students]);

  const loadFromFile = useCallback(() => {
    setS4Loaded(true);
    setS4LoadedLines(["Reading grades.txt...", "", ...s4FileContent, "", "✓ Report loaded successfully!"]);
  }, [s4FileContent]);

  /* ── SECTION 5 state ── */
  const [s5Input, setS5Input] = useState("abc");
  const [s5Ran, setS5Ran] = useState(false);
  const [s5SearchInput, setS5SearchInput] = useState("John");
  const [s5SearchRan, setS5SearchRan] = useState(false);
  const [s5WorkflowStep, setS5WorkflowStep] = useState(-1);
  const workflowSteps = ["Create Student", "Calculate Average", "Assign Grade", "Store in Dictionary", "Save to File", "Load Report", "Search Student"];

  const stepWorkflow = useCallback(() => {
    setS5WorkflowStep(prev => (prev + 1) % (workflowSteps.length + 1) - (prev >= workflowSteps.length - 1 ? workflowSteps.length : 0));
  }, []);

  /* ── FINAL SANDBOX ── */
  const [fsCode, setFsCode] = useState(
`class Student:
    def __init__(self, name, marks):
        self.name = name
        self.marks = marks
    def average(self):
        return sum(self.marks) / len(self.marks)
    def grade(self):
        avg = self.average()
        if avg >= 90: return 'A'
        elif avg >= 80: return 'B'
        elif avg >= 70: return 'C'
        else: return 'F'

s1 = Student('Alice', [80, 90, 85])
s2 = Student('Bob', [95, 88, 92])

students = {'Alice': s1, 'Bob': s2}

for name, s in students.items():
    print(f'{name}: Avg={s.average():.1f}, Grade={s.grade()}')

try:
    score = float('abc')
except ValueError:
    print('Invalid Score')

print('Search: Alice ->', 'Found' if 'Alice' in students else 'Not Found')
print('Search: John ->', 'Found' if 'John' in students else 'Not Found')`
  );
  const [fsOut, setFsOut] = useState<string[]>([]);
  const [fsMem, setFsMem] = useState<{ v: string; val: string }[]>([]);
  const [fsStepMode, setFsStepMode] = useState(false);
  const [fsStepLine, setFsStepLine] = useState(0);

  const runFinal = useCallback(() => {
    let output: string[] = [];
    let mem: { v: string; val: string }[] = [];
    try {
      const lines = fsCode.split("\n");
      let vars: Record<string, any> = {};
      let classDefs: Record<string, any> = {};
      let currentClass: string | null = null;
      let dictVars: Record<string, Record<string, any>> = {};
      let inFor = false;
      let forVar = "";
      let forDict = "";
      let forBody: string[] = [];
      let inTry = false;
      let inExcept = false;
      let errorOccurred = false;

      for (let li = 0; li < lines.length; li++) {
        const line = lines[li];
        const trimmed = line.trim();
        if (!trimmed || trimmed.startsWith("#")) continue;

        // Class definition
        const classMatch = trimmed.match(/^class\s+(\w+):$/);
        if (classMatch) { currentClass = classMatch[1]; classDefs[currentClass] = {}; continue; }
        if (currentClass && (line.startsWith("    ") || line.startsWith("\t"))) continue;
        if (currentClass && !line.startsWith("    ") && !line.startsWith("\t") && !classMatch) currentClass = null;

        // try/except
        if (trimmed === "try:") { inTry = true; inExcept = false; errorOccurred = false; continue; }
        const exceptMatch = trimmed.match(/^except\s+(\w+)/);
        if (exceptMatch) { inTry = false; inExcept = true; continue; }

        if (inTry && (line.startsWith("    ") || line.startsWith("\t"))) {
          if (errorOccurred) continue;
          if (trimmed.includes("float(") && trimmed.includes("'")) {
            const fArg = trimmed.match(/float\(\s*'([^']*)'\s*\)/);
            if (fArg && isNaN(Number(fArg[1]))) { errorOccurred = true; continue; }
          }
          const printM = trimmed.match(/^print\((.+)\)$/);
          if (printM) { output.push(evalPrintExpr(printM[1], vars, dictVars)); }
          continue;
        }

        if (inExcept && (line.startsWith("    ") || line.startsWith("\t"))) {
          if (errorOccurred) {
            const printM = trimmed.match(/^print\((.+)\)$/);
            if (printM) { output.push(evalPrintExpr(printM[1], vars, dictVars)); }
          }
          continue;
        }

        if (inExcept && !line.startsWith("    ") && !line.startsWith("\t")) {
          inExcept = false; errorOccurred = false;
        }
        if (inTry && !line.startsWith("    ") && !line.startsWith("\t")) {
          inTry = false;
        }

        // for loop
        const forMatch = trimmed.match(/^for\s+(\w+),?\s*(\w*)\s+in\s+(\w+)\.items\(\):$/);
        if (forMatch) { inFor = true; forVar = forMatch[1]; forDict = forMatch[3]; forBody = []; continue; }
        if (inFor && (line.startsWith("    ") || line.startsWith("\t"))) {
          forBody.push(trimmed);
          continue;
        }
        if (inFor && !(line.startsWith("    ") || line.startsWith("\t"))) {
          inFor = false;
          // Execute for loop
          const dictData = dictVars[forDict];
          if (dictData) {
            Object.entries(dictData).forEach(([key, val]) => {
              forBody.forEach(bodyLine => {
                const pm = bodyLine.match(/^print\((.+)\)$/);
                if (pm) {
                  let expr = pm[1];
                  // f-string or simple
                  const fstrMatch = expr.match(/^f'(.+)'$/) || expr.match(/^f"(.+)"$/);
                  if (fstrMatch) {
                    let result = fstrMatch[1];
                    const obj = val as any;
                    // Replace {name} with key, {s.average():.1f} etc.
                    result = result.replace(/\{(\w+)\}/g, (_, v) => {
                      if (v === forMatch![1]) return key;
                      if (v === forMatch![2]) return String(val);
                      return vars[v] ?? v;
                    });
                    result = result.replace(/\{(\w+)\.average\(\)(?::\.(\d)f)?\}/g, (_, v, dec) => {
                      if (obj && obj.marks) {
                        const a = obj.marks.reduce((x: number, y: number) => x + y, 0) / obj.marks.length;
                        return dec ? a.toFixed(Number(dec)) : a.toString();
                      }
                      return "";
                    });
                    result = result.replace(/\{(\w+)\.grade\(\)\}/g, (_, v) => {
                      if (obj && obj.marks) {
                        const a = obj.marks.reduce((x: number, y: number) => x + y, 0) / obj.marks.length;
                        return getGrade(a);
                      }
                      return "";
                    });
                    output.push(result);
                  }
                }
              });
            });
          }
        }

        // Object creation
        const objMatch = trimmed.match(/^(\w+)\s*=\s*Student\(\s*['"](.+?)['"]\s*,\s*\[(.+)\]\s*\)$/);
        if (objMatch) {
          const marks = objMatch[3].split(",").map(n => Number(n.trim()));
          vars[objMatch[1]] = { name: objMatch[2], marks, _type: "Student" };
          mem.push({ v: objMatch[1], val: `Student("${objMatch[2]}", [${marks.join(", ")}])` });
          continue;
        }

        // Dict creation
        const dictMatch = trimmed.match(/^(\w+)\s*=\s*\{(.+)\}$/);
        if (dictMatch) {
          const dName = dictMatch[1];
          const entries = dictMatch[2].matchAll(/['"](\w+)['"]\s*:\s*(\w+)/g);
          dictVars[dName] = {};
          for (const e of entries) {
            if (vars[e[2]]) dictVars[dName][e[1]] = vars[e[2]];
          }
          mem.push({ v: dName, val: `{${Object.keys(dictVars[dName]).map(k => `"${k}": Student`).join(", ")}}` });
          continue;
        }

        // print statements
        const printMatch = trimmed.match(/^print\((.+)\)$/);
        if (printMatch) {
          output.push(evalPrintExpr(printMatch[1], vars, dictVars));
          continue;
        }

        // Simple assignment
        const assignMatch = trimmed.match(/^(\w+)\s*=\s*(.+)$/);
        if (assignMatch && !assignMatch[2].includes("Student(") && !assignMatch[2].includes("{")) {
          vars[assignMatch[1]] = assignMatch[2];
          mem.push({ v: assignMatch[1], val: assignMatch[2] });
        }
      }
    } catch (e) {
      output.push("⚠ Simulation Error");
    }
    setFsOut(output.length ? output : ["(No output)"]);
    setFsMem(mem);
  }, [fsCode]);

  // Helper for print evaluation
  function evalPrintExpr(expr: string, vars: Record<string, any>, dictVars: Record<string, Record<string, any>>): string {
    // f-string
    const fstrMatch = expr.match(/^f'(.+)'$/) || expr.match(/^f"(.+)"$/);
    if (fstrMatch) {
      let result = fstrMatch[1];
      result = result.replace(/\{(\w+)\.(\w+)(?:\(\))?(?::\.(\d)f)?\}/g, (_, obj, prop, dec) => {
        if (vars[obj]) {
          if (prop === "name") return vars[obj].name;
          if (prop === "average") {
            const a = vars[obj].marks.reduce((x: number, y: number) => x + y, 0) / vars[obj].marks.length;
            return dec ? a.toFixed(Number(dec)) : a.toString();
          }
          if (prop === "grade") {
            const a = vars[obj].marks.reduce((x: number, y: number) => x + y, 0) / vars[obj].marks.length;
            return getGrade(a);
          }
        }
        return `{${obj}.${prop}}`;
      });
      result = result.replace(/\{(\w+)\}/g, (_, v) => vars[v] ?? v);
      return result;
    }

    // String with 'in' check
    if (expr.includes("'Found' if")) {
      const searchMatch = expr.match(/'([^']+)'\s+in\s+(\w+)/);
      if (searchMatch) {
        const key = searchMatch[1];
        const dictName = searchMatch[2];
        const found = dictVars[dictName] && key in dictVars[dictName];
        const label = expr.match(/^'([^']+)'/)?.[1] || "";
        return `${label}${found ? "Found" : "Not Found"}`;
      }
    }

    // Simple string
    const strMatch = expr.match(/^['"](.+)['"]$/);
    if (strMatch) return strMatch[1];

    // Property access
    if (expr.includes(".name")) {
      const obj = expr.split(".")[0].trim();
      if (vars[obj]) return vars[obj].name;
    }
    if (expr.includes(".average()")) {
      const obj = expr.split(".")[0].trim();
      if (vars[obj]) {
        const avg = vars[obj].marks.reduce((a: number, b: number) => a + b, 0) / vars[obj].marks.length;
        return avg.toString();
      }
    }
    if (expr.includes(".marks")) {
      const obj = expr.split(".")[0].trim();
      if (vars[obj]) return `[${vars[obj].marks.join(", ")}]`;
    }
    if (expr.includes(".grade()")) {
      const obj = expr.split(".")[0].trim();
      if (vars[obj]) {
        const avg = vars[obj].marks.reduce((a: number, b: number) => a + b, 0) / vars[obj].marks.length;
        return getGrade(avg);
      }
    }

    return expr.replace(/^['"]|['"]$/g, "");
  }

  const resetAll = useCallback(() => {
    setStudents([
      { name: "Alice", marks: [80, 90, 85] },
      { name: "Bob", marks: [95, 88, 92] },
    ]);
    setS1Name(""); setS1Marks(""); setS1Created(null); setS1Step(0);
    setS2Selected(0); setS2EditMarks(""); setS2Editing(false);
    setS3Search(""); setS3Result(undefined); setS3NewName(""); setS3NewMarks("");
    setS4FileContent([]); setS4Saved(false); setS4Loaded(false); setS4LoadedLines([]); setS4SaveStep(0);
    setS5Input("abc"); setS5Ran(false); setS5SearchInput("John"); setS5SearchRan(false); setS5WorkflowStep(-1);
    setFsCode(
`class Student:
    def __init__(self, name, marks):
        self.name = name
        self.marks = marks
    def average(self):
        return sum(self.marks) / len(self.marks)
    def grade(self):
        avg = self.average()
        if avg >= 90: return 'A'
        elif avg >= 80: return 'B'
        elif avg >= 70: return 'C'
        else: return 'F'

s1 = Student('Alice', [80, 90, 85])
s2 = Student('Bob', [95, 88, 92])

students = {'Alice': s1, 'Bob': s2}

for name, s in students.items():
    print(f'{name}: Avg={s.average():.1f}, Grade={s.grade()}')

try:
    score = float('abc')
except ValueError:
    print('Invalid Score')

print('Search: Alice ->', 'Found' if 'Alice' in students else 'Not Found')
print('Search: John ->', 'Found' if 'John' in students else 'Not Found')`
    );
    setFsOut([]); setFsMem([]); setFsStepMode(false); setFsStepLine(0);
  }, []);

  return (
    <div className="bg-slate-50 min-h-screen text-slate-800 font-sans p-6 md:p-10 overflow-y-auto">
      <div className="max-w-6xl mx-auto space-y-8">

        {/* ═══ HEADER ═══ */}
        <div className="text-center space-y-4 mb-16 relative pt-4">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-40 bg-gradient-to-r from-blue-400/15 via-purple-400/15 to-indigo-400/15 blur-3xl pointer-events-none rounded-full" />
          <div className="inline-flex items-center gap-2 bg-white border border-slate-200 rounded-full px-4 py-1.5 text-xs font-bold text-purple-600 uppercase tracking-widest shadow-sm relative z-10 mb-4">
            <Layers className="size-3.5" /> Capstone Integration Project
          </div>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-700 via-purple-700 to-indigo-700 relative z-10">
            Student Grade Management System
          </h1>
          <p className="text-lg text-slate-500 font-medium relative z-10">
            Build a complete application integrating OOP, Collections, File I/O, and Exception Handling
          </p>
          <div className="flex items-center justify-center gap-6 text-xs text-slate-400 font-medium mt-2">
            <span className="flex items-center gap-1"><CheckCircle className="size-3 text-emerald-400" /> 5 Sections</span>
            <span className="flex items-center gap-1"><Terminal className="size-3 text-blue-400" /> Live Console</span>
            <span className="flex items-center gap-1"><Eye className="size-3 text-purple-400" /> Real-Time Feedback</span>
          </div>
        </div>

        {/* ═══════════ SECTION 1: Create Student Objects ═══════════ */}
        <section>
          <SectionTitle num={1} title="Create Student Objects" />
          <p className="text-slate-500 text-sm mb-6 -mt-4 ml-[3.75rem]">Build the Student class and create student records.</p>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

            {/* Left: Code + Form */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 flex flex-col gap-5">
              <div className="bg-gradient-to-br from-blue-50/80 to-purple-50/60 p-5 rounded-xl border border-blue-100/60 leading-loose text-slate-700">
                <CL indent={0} active={s1Step >= 1}><span className="text-blue-600 font-bold">class</span> <span className="text-purple-600">Student</span>:</CL>
                <CL indent={1} active={s1Step >= 2}><span className="text-blue-600 font-bold">def</span> <span className="text-blue-600">__init__</span>(<span className="text-red-500 font-bold">self</span>, name, marks):</CL>
                <CL indent={2} active={s1Step >= 3}><span className="text-red-500 font-bold">self</span>.name = name</CL>
                <CL indent={2} active={s1Step >= 3}><span className="text-red-500 font-bold">self</span>.marks = marks</CL>
                <div className="h-3" />
                <CL indent={0} active={s1Step >= 4}>student1 = <span className="text-purple-600">Student</span>(<span className="text-amber-600">"Alice"</span>, [<span className="text-emerald-600">80, 90, 85</span>])</CL>
              </div>

              <div className="border-t border-slate-200 pt-4 space-y-3">
                <h3 className="font-bold text-slate-600 uppercase tracking-widest text-[10px] flex items-center gap-2">
                  <Plus className="size-4 text-blue-500" /> Add Student
                </h3>
                <input
                  type="text" value={s1Name} onChange={e => setS1Name(e.target.value)}
                  placeholder="Student Name (e.g. Charlie)"
                  className="w-full bg-slate-50 border-2 border-slate-200 rounded-xl p-3 font-mono text-sm outline-none focus:border-blue-400 transition-colors"
                />
                <input
                  type="text" value={s1Marks} onChange={e => setS1Marks(e.target.value)}
                  placeholder="Marks (e.g. 80, 90, 85)"
                  className="w-full bg-slate-50 border-2 border-slate-200 rounded-xl p-3 font-mono text-sm outline-none focus:border-blue-400 transition-colors"
                />
                <div className="flex gap-3">
                  <RunButton onClick={() => { setS1Step(4); addStudent(); }} label="Create Student" icon={Plus} />
                  <button onClick={() => { setS1Step(0); }} className="px-3 py-2 rounded-xl bg-slate-100 text-slate-500 hover:bg-slate-200 transition-all">
                    <RotateCcw className="size-4" />
                  </button>
                </div>
                <AnimatePresence>
                  {s1Created && (
                    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                      className="bg-emerald-50 border border-emerald-200 rounded-xl p-3 text-emerald-700 font-mono text-xs flex items-center gap-2">
                      <CheckCircle className="size-4" /> Student("{s1Created}") created successfully!
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Right: Object Viewer + Memory */}
            <div className="flex flex-col gap-4">
              <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5">
                <PanelHeader icon={Eye} title="Object Viewer" badge={`${students.length} students`} />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[350px] overflow-y-auto pr-1">
                  <AnimatePresence>
                    {students.map((s) => (
                      <StudentCard
                        key={s.name}
                        s={s}
                        onDelete={students.length > 1 ? () => setStudents(prev => prev.filter(x => x.name !== s.name)) : undefined}
                      />
                    ))}
                  </AnimatePresence>
                </div>
              </div>
              <MemoryStatePanel students={students} />
            </div>
          </div>
        </section>

        {/* ═══════════ SECTION 2: Calculate Average & Grade ═══════════ */}
        <section>
          <SectionTitle num={2} title="Calculate Average & Grade" />
          <p className="text-slate-500 text-sm mb-6 -mt-4 ml-[3.75rem]">Process student data with real-time computation.</p>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

            {/* Left: Code + Controls */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 flex flex-col gap-5">
              <div className="bg-gradient-to-br from-blue-50/80 to-purple-50/60 p-5 rounded-xl border border-blue-100/60 leading-loose text-slate-700">
                <CL indent={0}><span className="text-blue-600 font-bold">def</span> <span className="text-blue-600">average</span>(<span className="text-red-500 font-bold">self</span>):</CL>
                <CL indent={1}><span className="text-blue-600 font-bold">return</span> <span className="text-blue-600">sum</span>(<span className="text-red-500 font-bold">self</span>.marks) / <span className="text-blue-600">len</span>(<span className="text-red-500 font-bold">self</span>.marks)</CL>
              </div>

              <div>
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2 block">Select Student</label>
                <div className="flex flex-wrap gap-2">
                  {students.map((s, i) => (
                    <button key={s.name}
                      onClick={() => { setS2Selected(i); setS2EditMarks(s.marks.join(", ")); setS2Editing(false); }}
                      className={`px-4 py-2 rounded-xl font-mono text-sm border-2 transition-all font-bold ${
                        s2Selected === i
                          ? "bg-purple-500 text-white border-purple-500 shadow-md"
                          : "bg-white border-slate-200 text-slate-600 hover:border-purple-300"
                      }`}>
                      {s.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Edit marks inline */}
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Modify Marks</div>
                  {!s2Editing && (
                    <button onClick={() => { setS2EditMarks(s2Student?.marks.join(", ") || ""); setS2Editing(true); }}
                      className="text-xs text-blue-500 hover:text-blue-700 flex items-center gap-1 font-bold">
                      <Edit3 className="size-3" /> Edit
                    </button>
                  )}
                </div>
                {s2Editing ? (
                  <div className="flex gap-2">
                    <input type="text" value={s2EditMarks} onChange={e => setS2EditMarks(e.target.value)}
                      className="flex-1 bg-white border-2 border-blue-300 rounded-lg p-2 font-mono text-xs outline-none" />
                    <button onClick={updateStudentMarks} className="px-3 py-1.5 bg-blue-500 text-white rounded-lg text-xs font-bold hover:bg-blue-600">Apply</button>
                  </div>
                ) : (
                  <div className="font-mono text-sm text-slate-600">[{s2Student?.marks.join(", ")}]</div>
                )}
              </div>

              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-3">Grade Rules</div>
                <div className="font-mono text-xs space-y-1.5">
                  <div className="flex justify-between"><span>Average ≥ 90</span><span className="font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">→ A</span></div>
                  <div className="flex justify-between"><span>Average ≥ 80</span><span className="font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded">→ B</span></div>
                  <div className="flex justify-between"><span>Average ≥ 70</span><span className="font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded">→ C</span></div>
                  <div className="flex justify-between"><span>Below 70</span><span className="font-bold text-red-600 bg-red-50 px-2 py-0.5 rounded">→ F</span></div>
                </div>
              </div>
            </div>

            {/* Right: Dashboard */}
            <div className="flex flex-col gap-4">
              <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
                <PanelHeader icon={Database} title="Student Dashboard" badge="Live" />
                <div className="overflow-x-auto">
                  <table className="w-full text-sm font-mono">
                    <thead>
                      <tr className="bg-gradient-to-r from-blue-50 to-purple-50 border-b border-blue-100">
                        <th className="px-4 py-3 text-left text-blue-600 font-bold text-[10px] uppercase tracking-widest">Name</th>
                        <th className="px-4 py-3 text-left text-blue-600 font-bold text-[10px] uppercase tracking-widest">Marks</th>
                        <th className="px-4 py-3 text-left text-blue-600 font-bold text-[10px] uppercase tracking-widest">Average</th>
                        <th className="px-4 py-3 text-left text-blue-600 font-bold text-[10px] uppercase tracking-widest">Grade</th>
                      </tr>
                    </thead>
                    <tbody>
                      {students.map(s => {
                        const a = getAvg(s.marks);
                        const g = getGrade(a);
                        return (
                          <motion.tr key={s.name} layout className="border-b border-slate-100 hover:bg-slate-50/50 transition-colors">
                            <td className="px-4 py-3 font-bold">{s.name}</td>
                            <td className="px-4 py-3 text-slate-500 text-xs">[{s.marks.join(", ")}]</td>
                            <td className="px-4 py-3 font-bold text-slate-800">{a.toFixed(1)}</td>
                            <td className="px-4 py-3">
                              <span className={`font-bold px-3 py-1 rounded-full border text-xs ${gradeColor(g)}`}>{g}</span>
                            </td>
                          </motion.tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
              <Hint text="Modify marks using the Edit button above — the Average and Grade columns update in real time for every student!" />
            </div>
          </div>
        </section>

        {/* ═══════════ SECTION 3: Student Database Manager ═══════════ */}
        <section>
          <SectionTitle num={3} title="Student Database Manager" />
          <p className="text-slate-500 text-sm mb-6 -mt-4 ml-[3.75rem]">Store and search students using dictionary collections.</p>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

            {/* Left: Code + Search + Add */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 flex flex-col gap-5">
              <div className="bg-gradient-to-br from-blue-50/80 to-purple-50/60 p-5 rounded-xl border border-blue-100/60 leading-loose text-slate-700">
                <CL indent={0}>students = {"{"}</CL>
                {students.map((s, i) => (
                  <CL key={s.name} indent={1}>
                    <span className="text-amber-600">"{s.name}"</span>: <span className="text-purple-600">Student</span>(...){i < students.length - 1 ? "," : ""}
                  </CL>
                ))}
                <CL indent={0}>{"}"}</CL>
              </div>

              {/* Search */}
              <div className="border-t border-slate-200 pt-4 space-y-3">
                <h3 className="font-bold text-slate-600 uppercase tracking-widest text-[10px] flex items-center gap-2">
                  <Search className="size-4 text-blue-500" /> Search Student
                </h3>
                <div className="flex gap-2">
                  <input type="text" value={s3Search}
                    onChange={e => { setS3Search(e.target.value); setS3Result(undefined); }}
                    placeholder="Enter name…"
                    onKeyDown={e => e.key === "Enter" && searchStudent()}
                    className="flex-1 bg-slate-50 border-2 border-slate-200 rounded-xl p-3 font-mono text-sm outline-none focus:border-blue-400 transition-colors" />
                  <RunButton onClick={searchStudent} label="Search" icon={Search} />
                </div>
              </div>

              {/* Add New Student */}
              <div className="border-t border-slate-200 pt-4 space-y-3">
                <h3 className="font-bold text-slate-600 uppercase tracking-widest text-[10px] flex items-center gap-2">
                  <Plus className="size-4 text-emerald-500" /> Add to Dictionary
                </h3>
                <input type="text" value={s3NewName} onChange={e => setS3NewName(e.target.value)} placeholder="Student Name"
                  className="w-full bg-slate-50 border-2 border-slate-200 rounded-xl p-2.5 font-mono text-xs outline-none focus:border-emerald-400 transition-colors" />
                <input type="text" value={s3NewMarks} onChange={e => setS3NewMarks(e.target.value)} placeholder="Marks (e.g. 75, 82, 90)"
                  className="w-full bg-slate-50 border-2 border-slate-200 rounded-xl p-2.5 font-mono text-xs outline-none focus:border-emerald-400 transition-colors" />
                <RunButton onClick={addFromDb} label="Add Student" icon={Plus} variant="green" />
              </div>
            </div>

            {/* Right: Database Viewer + Search Result */}
            <div className="flex flex-col gap-4">
              <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5">
                <PanelHeader icon={Database} title="Database Viewer" badge={`${students.length} records`} />
                <div className="grid grid-cols-2 gap-3 max-h-56 overflow-y-auto pr-1">
                  {students.map(s => {
                    const avg = getAvg(s.marks);
                    const g = getGrade(avg);
                    return (
                      <motion.div layout key={s.name}
                        className={`bg-gradient-to-br from-slate-50 to-white rounded-xl border border-slate-200 p-3 font-mono text-xs hover:shadow-sm transition-shadow`}>
                        <div className="font-bold text-slate-800 mb-1 flex items-center gap-1.5">
                          <User className="size-3 text-purple-400" /> {s.name}
                        </div>
                        <div className="text-slate-500">Average: <span className="text-slate-700 font-bold">{avg.toFixed(1)}</span></div>
                        <div className="mt-1">
                          <span className={`font-bold text-[10px] inline-block px-2 py-0.5 rounded-full border ${gradeColor(g)}`}>Grade: {g}</span>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>

              <AnimatePresence>
                {s3Result !== undefined && (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                    {s3Result ? (
                      <div className="bg-emerald-50 rounded-2xl border-2 border-emerald-200 p-6 flex items-start gap-4">
                        <CheckCircle className="size-6 text-emerald-500 flex-shrink-0 mt-0.5" />
                        <div className="font-mono text-sm space-y-1">
                          <div className="font-bold text-emerald-800 text-base">Student Found</div>
                          <div className="text-emerald-700">Name: <span className="font-bold">{s3Result.name}</span></div>
                          <div className="text-emerald-700">Average: <span className="font-bold">{getAvg(s3Result.marks).toFixed(1)}</span></div>
                          <div className="text-emerald-700">Grade: <span className={`font-bold px-2 py-0.5 rounded-full border text-xs ${gradeColor(getGrade(getAvg(s3Result.marks)))}`}>{getGrade(getAvg(s3Result.marks))}</span></div>
                        </div>
                      </div>
                    ) : (
                      <div className="bg-red-50 rounded-2xl border-2 border-red-200 p-6 flex items-start gap-4">
                        <XCircle className="size-6 text-red-500 flex-shrink-0 mt-0.5" />
                        <div className="font-mono text-sm">
                          <div className="font-bold text-red-800 text-base">Student Not Found</div>
                          <div className="text-red-600">"{s3Search}" is not in the database.</div>
                        </div>
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>

              <MemoryStatePanel students={students} />
            </div>
          </div>
        </section>

        {/* ═══════════ SECTION 4: Save & Load Reports ═══════════ */}
        <section>
          <SectionTitle num={4} title="Save & Load Reports (File Handling)" />
          <p className="text-slate-500 text-sm mb-6 -mt-4 ml-[3.75rem]">Serialize and deserialize student data using file operations.</p>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

            {/* Left: Code + Controls */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 flex flex-col gap-5">
              {/* Write Code */}
              <div>
                <div className="text-[10px] font-bold text-blue-500 uppercase tracking-widest mb-2 flex items-center gap-1"><Save className="size-3" /> Write Report</div>
                <div className="bg-gradient-to-br from-blue-50/80 to-purple-50/60 p-5 rounded-xl border border-blue-100/60 leading-loose text-slate-700">
                  <CL indent={0}><span className="text-blue-600 font-bold">with</span> <span className="text-blue-600">open</span>(<span className="text-amber-600">"grades.txt"</span>, <span className="text-amber-600">"w"</span>) <span className="text-blue-600 font-bold">as</span> file:</CL>
                  <CL indent={1}><span className="text-blue-600 font-bold">for</span> s <span className="text-blue-600 font-bold">in</span> students:</CL>
                  <CL indent={2}>file.write(f<span className="text-amber-600">"{'{'}name{'}'},{'{'}avg{'}'},{'{'}grade{'}'}\n"</span>)</CL>
                </div>
              </div>

              {/* Read Code */}
              <div>
                <div className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest mb-2 flex items-center gap-1"><Download className="size-3" /> Read Report</div>
                <div className="bg-gradient-to-br from-emerald-50/80 to-blue-50/60 p-5 rounded-xl border border-emerald-100/60 leading-loose text-slate-700">
                  <CL indent={0}><span className="text-blue-600 font-bold">with</span> <span className="text-blue-600">open</span>(<span className="text-amber-600">"grades.txt"</span>, <span className="text-amber-600">"r"</span>) <span className="text-blue-600 font-bold">as</span> file:</CL>
                  <CL indent={1}>content = file.<span className="text-blue-600">read</span>()</CL>
                </div>
              </div>

              {/* Buttons */}
              <div className="flex gap-3 flex-wrap">
                <RunButton onClick={saveToFile} label="Save to File" icon={Save} />
                <button onClick={loadFromFile} disabled={!s4Saved}
                  className={`px-6 py-2.5 rounded-xl flex items-center gap-2 font-semibold text-sm transition-all ${
                    s4Saved
                      ? "bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white shadow-md active:scale-95"
                      : "bg-slate-100 text-slate-400 cursor-not-allowed"
                  }`}>
                  <Download className="size-4" /> Load Report
                </button>
              </div>

              {/* Serialization Flow */}
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-3">Serialization Flow</div>
                <div className="flex items-center gap-2 justify-center font-mono text-xs flex-wrap">
                  <div className={`px-3 py-1.5 rounded-lg font-bold border transition-all ${s4SaveStep >= 1 ? "bg-purple-500 text-white border-purple-600 shadow-md scale-105" : "bg-purple-100 border-purple-200 text-purple-700"}`}>Student Object</div>
                  <ArrowDown className={`size-4 -rotate-90 transition-all ${s4SaveStep >= 2 ? "text-blue-500" : "text-slate-300"}`} />
                  <div className={`px-3 py-1.5 rounded-lg font-bold border transition-all ${s4SaveStep >= 2 ? "bg-blue-500 text-white border-blue-600 shadow-md scale-105" : "bg-blue-100 border-blue-200 text-blue-700"}`}>Text Line</div>
                  <ArrowDown className={`size-4 -rotate-90 transition-all ${s4SaveStep >= 3 ? "text-emerald-500" : "text-slate-300"}`} />
                  <div className={`px-3 py-1.5 rounded-lg font-bold flex items-center gap-1 border transition-all ${s4SaveStep >= 3 ? "bg-emerald-500 text-white border-emerald-600 shadow-md scale-105" : "bg-emerald-100 border-emerald-200 text-emerald-700"}`}>
                    <FileText className="size-3" /> grades.txt
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Virtual File Viewer + Load Output */}
            <div className="flex flex-col gap-4">
              <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5">
                <PanelHeader icon={FileText} title="Virtual File: grades.txt" />
                {s4FileContent.length > 0 ? (
                  <div className="bg-slate-900 rounded-xl border border-slate-700/50 p-4 font-mono text-sm space-y-0.5">
                    <div className="text-slate-500 text-[10px] mb-2 border-b border-slate-700 pb-2">📄 grades.txt — {s4FileContent.length} lines</div>
                    {s4FileContent.map((l, i) => (
                      <motion.div key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.08 }} className="text-emerald-400">
                        <span className="text-slate-600 mr-3 select-none text-xs">{i + 1}</span>{l}
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <div className="border-2 border-dashed border-slate-200 rounded-xl p-10 text-center text-slate-400 italic text-sm">
                    <FileText className="size-8 text-slate-300 mx-auto mb-2" />
                    File not created yet. Click "Save to File".
                  </div>
                )}
              </div>

              <AnimatePresence>
                {s4Loaded && (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                    <OutputConsole lines={s4LoadedLines} label="Load Output" />
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Deserialization Flow */}
              {s4Loaded && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                  <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-3">Deserialization Flow</div>
                  <div className="flex items-center gap-2 justify-center font-mono text-xs flex-wrap">
                    <div className="bg-emerald-500 text-white px-3 py-1.5 rounded-lg font-bold border border-emerald-600 shadow-md flex items-center gap-1"><FileText className="size-3" /> File</div>
                    <ArrowDown className="size-4 text-blue-500 -rotate-90" />
                    <div className="bg-blue-500 text-white px-3 py-1.5 rounded-lg font-bold border border-blue-600 shadow-md">Text Data</div>
                    <ArrowDown className="size-4 text-purple-500 -rotate-90" />
                    <div className="bg-purple-500 text-white px-3 py-1.5 rounded-lg font-bold border border-purple-600 shadow-md">Student Report</div>
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </section>

        {/* ═══════════ SECTION 5: Error Handling & Final System ═══════════ */}
        <section>
          <SectionTitle num={5} title="Error Handling & Final System" />
          <p className="text-slate-500 text-sm mb-6 -mt-4 ml-[3.75rem]">Make the application robust with exception handling.</p>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

            {/* Error Handling */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 flex flex-col gap-4">
              <h3 className="font-bold text-red-500 uppercase tracking-widest text-[10px] flex items-center gap-2">
                <AlertTriangle className="size-4" /> Invalid Input Handler
              </h3>
              <div className="bg-gradient-to-br from-red-50/60 to-amber-50/40 p-4 rounded-xl border border-red-100/60 font-mono text-[12px] text-slate-700 leading-relaxed">
                <span className="text-blue-600 font-bold">try:</span><br />
                &nbsp;&nbsp;score = <span className="text-blue-600">float</span>(<span className="text-blue-600">input</span>())<br />
                <span className="text-blue-600 font-bold">except</span> <span className="text-red-500 font-bold">ValueError:</span><br />
                &nbsp;&nbsp;<span className="text-blue-600">print</span>(<span className="text-amber-600">"Invalid Score"</span>)
              </div>
              <input type="text" value={s5Input}
                onChange={e => { setS5Input(e.target.value); setS5Ran(false); }}
                placeholder="Enter score…"
                className="w-full bg-slate-50 border-2 border-slate-200 rounded-xl p-2.5 font-mono text-xs outline-none focus:border-red-300 transition-colors" />
              <button onClick={() => setS5Ran(true)}
                className="w-full py-2.5 bg-gradient-to-r from-red-500 to-amber-500 text-white rounded-xl font-bold text-xs hover:from-red-600 hover:to-amber-600 transition-all active:scale-95 shadow-sm">
                Run
              </button>
              <AnimatePresence>
                {s5Ran && (
                  <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                    className={`p-3 rounded-xl border-2 font-mono text-xs text-center font-bold ${
                      isNaN(Number(s5Input))
                        ? "bg-red-50 text-red-600 border-red-200"
                        : "bg-emerald-50 text-emerald-600 border-emerald-200"
                    }`}>
                    {isNaN(Number(s5Input)) ? "⚠ Invalid Score" : `✓ Score: ${Number(s5Input)}`}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Search Challenge */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 flex flex-col gap-4">
              <h3 className="font-bold text-purple-500 uppercase tracking-widest text-[10px] flex items-center gap-2">
                <Search className="size-4" /> Search Challenge
              </h3>
              <div className="bg-gradient-to-br from-purple-50/60 to-blue-50/40 p-4 rounded-xl border border-purple-100/60 font-mono text-[12px] text-slate-700 leading-relaxed">
                <span className="text-blue-600 font-bold">if</span> name <span className="text-blue-600 font-bold">in</span> students:<br />
                &nbsp;&nbsp;<span className="text-blue-600">print</span>(<span className="text-amber-600">"Student Found"</span>)<br />
                <span className="text-blue-600 font-bold">else:</span><br />
                &nbsp;&nbsp;<span className="text-blue-600">print</span>(<span className="text-amber-600">"Student Not Found"</span>)
              </div>
              <div className="flex gap-1.5">
                <input type="text" value={s5SearchInput}
                  onChange={e => { setS5SearchInput(e.target.value); setS5SearchRan(false); }}
                  className="flex-1 bg-slate-50 border-2 border-slate-200 rounded-xl p-2.5 font-mono text-xs outline-none focus:border-purple-300 transition-colors" />
                <button onClick={() => setS5SearchRan(true)}
                  className="px-4 py-2 bg-gradient-to-r from-purple-500 to-indigo-500 text-white rounded-xl font-bold text-xs hover:from-purple-600 hover:to-indigo-600 transition-all active:scale-95">
                  Search
                </button>
              </div>
              {/* Quick buttons */}
              <div className="flex gap-1.5">
                {["Alice", "Bob", "John"].map(v => (
                  <button key={v} onClick={() => { setS5SearchInput(v); setS5SearchRan(false); }}
                    className="flex-1 py-1.5 text-[10px] font-bold rounded-lg border bg-slate-50 hover:bg-slate-100 text-slate-600 transition-colors">{v}</button>
                ))}
              </div>
              <AnimatePresence>
                {s5SearchRan && (
                  <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                    className={`p-3 rounded-xl border-2 font-mono text-xs text-center font-bold ${
                      students.find(s => s.name.toLowerCase() === s5SearchInput.toLowerCase())
                        ? "bg-emerald-50 text-emerald-600 border-emerald-200"
                        : "bg-red-50 text-red-600 border-red-200"
                    }`}>
                    {students.find(s => s.name.toLowerCase() === s5SearchInput.toLowerCase())
                      ? "✓ Student Found"
                      : "✗ Student Not Found"}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* System Workflow */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 flex flex-col gap-4">
              <h3 className="font-bold text-emerald-600 uppercase tracking-widest text-[10px] flex items-center gap-2">
                <Layers className="size-4" /> Integrated Workflow
              </h3>
              <div className="space-y-1.5 flex-1">
                {workflowSteps.map((step, i) => (
                  <React.Fragment key={i}>
                    <motion.div
                      onClick={() => setS5WorkflowStep(i)}
                      whileHover={{ scale: 1.02 }}
                      className={`flex items-center gap-3 p-2.5 rounded-xl cursor-pointer transition-all text-xs font-mono ${
                        s5WorkflowStep >= i
                          ? "bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 text-emerald-700 font-bold shadow-sm"
                          : "bg-slate-50 border border-slate-200 text-slate-500 hover:border-slate-300"
                      }`}
                    >
                      <span className={`size-5 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0 transition-all ${
                        s5WorkflowStep >= i ? "bg-emerald-500 text-white" : "bg-slate-200 text-slate-500"
                      }`}>{i + 1}</span>
                      {step}
                      {s5WorkflowStep >= i && <CheckCircle className="size-3 text-emerald-400 ml-auto" />}
                    </motion.div>
                    {i < workflowSteps.length - 1 && (
                      <div className="flex justify-center">
                        <ArrowDown className={`size-3 transition-all ${s5WorkflowStep > i ? "text-emerald-400" : "text-slate-200"}`} />
                      </div>
                    )}
                  </React.Fragment>
                ))}
              </div>
              <button
                onClick={() => setS5WorkflowStep(prev => prev < workflowSteps.length - 1 ? prev + 1 : -1)}
                className="w-full py-2 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-xl font-bold text-xs hover:from-emerald-600 hover:to-teal-600 transition-all active:scale-95">
                {s5WorkflowStep >= workflowSteps.length - 1 ? "Reset" : "Next Step"}
              </button>
            </div>
          </div>
        </section>

        {/* ═══════════ FINAL PROJECT SANDBOX ═══════════ */}
        <section className="pt-12 border-t-2 border-slate-200 mt-16 pb-24">
          <div className="text-center space-y-3 mb-10">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full px-5 py-2 text-xs font-bold uppercase tracking-widest shadow-md">
              <Terminal className="size-3.5" /> Final Project Sandbox
            </div>
            <h2 className="text-3xl font-black text-slate-800">Complete Student Grade Management System</h2>
            <p className="text-slate-500 max-w-2xl mx-auto">Freely modify the Student class, methods, dictionaries, file operations, exception handling, and search functions.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Editor */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 flex flex-col overflow-hidden">
              <div className="bg-gradient-to-r from-slate-50 to-slate-100 border-b border-slate-200 px-5 py-3 font-bold text-[10px] uppercase tracking-widest text-slate-500 flex justify-between items-center">
                <span className="flex items-center gap-2"><Edit3 className="size-3.5" /> Project Editor</span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => { setFsOut([]); setFsMem([]); setFsStepMode(false); }}
                    className="px-3 py-1.5 rounded-lg bg-slate-200 text-slate-600 hover:bg-slate-300 transition-all text-[10px] font-bold flex items-center gap-1">
                    <RotateCcw className="size-3" /> Reset
                  </button>
                  <button onClick={runFinal}
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white px-5 py-1.5 rounded-lg flex items-center gap-2 transition-all shadow-sm active:scale-95">
                    <PlayCircle className="size-4" /> <span className="font-bold text-xs">Run Code</span>
                  </button>
                </div>
              </div>
              <div className="p-5">
                <textarea
                  value={fsCode}
                  onChange={e => setFsCode(e.target.value)}
                  className="w-full h-72 bg-slate-900 text-emerald-300 border border-slate-700 rounded-xl p-4 font-mono outline-none focus:border-blue-500 resize-none leading-relaxed text-[13px] scrollbar-thin"
                  spellCheck={false}
                />
                <div className="flex flex-wrap gap-2 mt-3">
                  {[
                    { l: "Default Template", c: fsCode },
                    {
                      l: "Print All Students",
                      c: `class Student:
    def __init__(self, name, marks):
        self.name = name
        self.marks = marks
    def average(self):
        return sum(self.marks) / len(self.marks)
    def grade(self):
        avg = self.average()
        if avg >= 90: return 'A'
        elif avg >= 80: return 'B'
        elif avg >= 70: return 'C'
        else: return 'F'

s1 = Student('Alice', [80, 90, 85])
s2 = Student('Bob', [95, 88, 92])
s3 = Student('Charlie', [60, 70, 55])

print(s1.name)
print(s1.average())
print(s1.grade())
print(s2.name)
print(s2.average())
print(s2.grade())
print(s3.name)
print(s3.average())
print(s3.grade())`
                    },
                    {
                      l: "Error Handling",
                      c: `class Student:
    def __init__(self, name, marks):
        self.name = name
        self.marks = marks
    def average(self):
        return sum(self.marks) / len(self.marks)

try:
    score = float('abc')
except ValueError:
    print('Invalid Score - not a number!')

try:
    score = float('95')
except ValueError:
    print('Invalid Score')

print('Valid score processed successfully')`
                    },
                  ].map(p => (
                    <button key={p.l} onClick={() => { setFsCode(p.c); setFsOut([]); setFsMem([]); }}
                      className="px-3 py-1.5 rounded-lg border border-slate-200 hover:border-blue-400 bg-white font-mono text-[10px] hover:bg-blue-50 transition-all font-bold text-slate-600">
                      {p.l}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Output + Memory */}
            <div className="flex flex-col gap-5">
              <div className="bg-slate-900 rounded-2xl shadow-lg border border-slate-700/50 flex flex-col overflow-hidden">
                <div className="bg-slate-950 border-b border-slate-700/50 px-5 py-3 font-bold text-[10px] uppercase tracking-widest text-slate-400 flex items-center gap-2">
                  <Terminal className="size-3.5" /> Output Console
                </div>
                <div className="p-5 font-mono text-emerald-400 space-y-1 text-sm min-h-[120px] max-h-60 overflow-y-auto">
                  {fsOut.length > 0
                    ? fsOut.map((l, i) => (
                        <motion.div key={i} initial={{ opacity: 0, x: -6 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.04 }}
                          className={l.includes("Error") || l.includes("⚠") ? "text-red-400" : l.includes("✓") ? "text-emerald-300" : ""}>
                          <span className="text-slate-600 mr-2 select-none text-xs">{`>>>`}</span>{l}
                        </motion.div>
                      ))
                    : <div className="text-slate-600 italic">Click Run Code…</div>}
                </div>
              </div>

              {/* Memory State Viewer */}
              <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5">
                <PanelHeader icon={Cpu} title="Memory State Viewer" badge={fsMem.length > 0 ? `${fsMem.length} vars` : undefined} />
                {fsMem.length > 0 ? (
                  <div className="bg-slate-50 rounded-xl border border-slate-200 p-4 font-mono text-xs space-y-1.5 max-h-40 overflow-y-auto">
                    {fsMem.map((m, i) => (
                      <motion.div key={i} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.05 }}
                        className="flex items-center gap-2">
                        <span className="text-purple-600 font-bold">{m.v}</span>
                        <span className="text-slate-400">=</span>
                        <span className="text-slate-700">{m.val}</span>
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <div className="text-slate-400 italic text-xs text-center py-4">Run code to populate memory…</div>
                )}
              </div>

              {/* Learning Outcomes */}
              <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl border border-blue-100/50 p-5">
                <div className="text-[10px] font-bold text-blue-600 uppercase tracking-widest mb-3 flex items-center gap-1.5">
                  <CheckCircle className="size-3" /> Learning Outcomes
                </div>
                <div className="grid grid-cols-2 gap-1.5 text-xs text-blue-800">
                  {[
                    "Design classes and objects",
                    "Store objects in collections",
                    "Compute averages",
                    "Assign grades",
                    "Use dictionaries for lookup",
                    "Serialize data to files",
                    "Deserialize data from files",
                    "Handle invalid input",
                    "Build search functionality",
                    "Integrate Python concepts",
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-1.5">
                      <CheckCircle className="size-3 text-emerald-500 shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
