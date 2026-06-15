import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PlayCircle, RotateCcw, Lightbulb, User, Plus, Search, FileText, Save, Download, AlertTriangle, ArrowDown, CheckCircle, XCircle } from "lucide-react";

/* ─── Reusable UI Atoms ─── */
const SectionTitle = ({ num, title }: { num: number; title: string }) => (
  <div className="flex items-center gap-4 mb-6 mt-16 first:mt-0">
    <div className="size-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 text-white font-bold flex items-center justify-center shadow-md text-sm">{num}</div>
    <h2 className="text-2xl font-bold text-slate-800">{title}</h2>
  </div>
);

const OutputConsole = ({ lines, label }: { lines: string[]; label?: string }) => (
  <div className="bg-slate-800 rounded-2xl shadow-sm border border-slate-700 p-6 font-mono">
    <h3 className="font-bold text-slate-400 uppercase tracking-widest text-[10px] mb-3 font-sans">{label || "Output Console"}</h3>
    <div className="text-[15px] space-y-0.5 max-h-48 overflow-y-auto text-emerald-400">
      {lines.length > 0 ? lines.map((l, i) => <div key={i} className={l.includes("Error") || l.includes("Invalid") || l.includes("Not Found") ? "text-red-400" : ""}>{l}</div>) : <span className="text-slate-600 italic">No output yet...</span>}
    </div>
  </div>
);

const Hint = ({ text }: { text: string }) => (
  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-xl p-4 text-sm text-blue-800 flex items-start gap-3">
    <Lightbulb className="size-5 text-blue-500 flex-shrink-0 mt-0.5" />
    <span>{text}</span>
  </motion.div>
);

const CL = ({ indent, active, children }: { indent: number; active?: boolean; children: React.ReactNode }) => (
  <div className={`transition-all rounded-lg px-2 py-0.5 font-mono text-[15px] ${active ? "bg-emerald-100 border-l-4 border-emerald-500" : ""}`}
    style={{ paddingLeft: `${indent * 1.5 + 0.5}rem` }}>
    {children}
  </div>
);

const RunButton = ({ onClick, label, icon: Icon = PlayCircle }: { onClick: () => void; label?: string; icon?: React.ElementType }) => (
  <button onClick={onClick}
    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white px-6 py-2.5 rounded-xl flex items-center gap-2 transition-all shadow-md hover:shadow-lg font-semibold text-sm w-fit">
    <Icon className="size-4" /> {label || "Run Code"}
  </button>
);

/* ─── Student type ─── */
interface StudentRecord {
  name: string;
  marks: number[];
}

const getAvg = (marks: number[]) => marks.length ? marks.reduce((a, b) => a + b, 0) / marks.length : 0;
const getGrade = (avg: number) => avg >= 90 ? "A" : avg >= 80 ? "B" : avg >= 70 ? "C" : "F";
const gradeColor = (g: string) => g === "A" ? "text-emerald-600 bg-emerald-50 border-emerald-200" : g === "B" ? "text-blue-600 bg-blue-50 border-blue-200" : g === "C" ? "text-amber-600 bg-amber-50 border-amber-200" : "text-red-600 bg-red-50 border-red-200";

/* ─── Student Card ─── */
const StudentCard = ({ s }: { s: StudentRecord }) => {
  const avg = getAvg(s.marks);
  const grade = getGrade(avg);
  return (
    <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
      className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
      <div className="bg-purple-50 border-b border-purple-100 px-4 py-2 flex items-center gap-2">
        <User className="size-4 text-purple-500" />
        <span className="font-bold text-purple-800 text-sm">{s.name}</span>
      </div>
      <div className="p-4 font-mono text-sm space-y-2">
        <div className="flex justify-between"><span className="text-slate-500">marks</span><span className="text-slate-800">[{s.marks.join(', ')}]</span></div>
        <div className="flex justify-between"><span className="text-slate-500">average</span><span className="text-slate-800 font-bold">{avg.toFixed(1)}</span></div>
        <div className="flex justify-between items-center"><span className="text-slate-500">grade</span><span className={`font-bold px-3 py-0.5 rounded-full border text-xs ${gradeColor(grade)}`}>{grade}</span></div>
      </div>
    </motion.div>
  );
};

/* ═══════════════════════ MAIN COMPONENT ═══════════════════════ */

export function PythonGradeManagementPlayground({ expId }: { expId: string }) {

  /* ── Shared student database ── */
  const [students, setStudents] = useState<StudentRecord[]>([
    { name: "Alice", marks: [80, 90, 85] },
    { name: "Bob", marks: [95, 88, 92] },
  ]);

  /* ── SECTION 1: Create Objects ── */
  const [s1Name, setS1Name] = useState("");
  const [s1Marks, setS1Marks] = useState("");

  const addStudent = () => {
    if (!s1Name.trim()) return;
    const marks = s1Marks.split(',').map(n => Number(n.trim())).filter(n => !isNaN(n) && n >= 0);
    if (!marks.length) return;
    if (students.find(s => s.name === s1Name.trim())) return;
    setStudents([...students, { name: s1Name.trim(), marks }]);
    setS1Name("");
    setS1Marks("");
  };

  /* ── SECTION 2: Average & Grade ── */
  const [s2Selected, setS2Selected] = useState(0);
  const [s2EditMarks, setS2EditMarks] = useState("");
  const s2Student = students[s2Selected] || students[0];

  /* ── SECTION 3: Search ── */
  const [s3Search, setS3Search] = useState("");
  const [s3Result, setS3Result] = useState<StudentRecord | null | undefined>(undefined);

  const searchStudent = () => {
    const found = students.find(s => s.name.toLowerCase() === s3Search.toLowerCase());
    setS3Result(found || null);
  };

  /* ── SECTION 4: File Handling ── */
  const [s4FileContent, setS4FileContent] = useState<string[]>([]);
  const [s4Saved, setS4Saved] = useState(false);
  const [s4Loaded, setS4Loaded] = useState(false);

  const saveToFile = () => {
    const lines = students.map(s => {
      const avg = getAvg(s.marks);
      return `${s.name},${avg.toFixed(1)},${getGrade(avg)}`;
    });
    setS4FileContent(lines);
    setS4Saved(true);
    setS4Loaded(false);
  };

  const loadFromFile = () => {
    setS4Loaded(true);
  };

  /* ── SECTION 5: Error Handling ── */
  const [s5Input, setS5Input] = useState("abc");
  const [s5Ran, setS5Ran] = useState(false);
  const [s5SearchInput, setS5SearchInput] = useState("John");
  const [s5SearchRan, setS5SearchRan] = useState(false);
  const [s5WorkflowStep, setS5WorkflowStep] = useState(0);

  /* ── FINAL SANDBOX ── */
  const [fsCode, setFsCode] = useState("class Student:\n    def __init__(self, name, marks):\n        self.name = name\n        self.marks = marks\n    def average(self):\n        return sum(self.marks) / len(self.marks)\n\ns1 = Student('Alice', [80, 90, 85])\nprint(s1.name)\nprint(s1.average())");
  const [fsOut, setFsOut] = useState<string[]>([]);

  const runFinal = () => {
    let output: string[] = [];
    try {
      const lines = fsCode.split('\n');
      let vars: Record<string, any> = {};
      let classDefs: Record<string, any> = {};
      let currentClass: string | null = null;

      for (const line of lines) {
        let trimmed = line.trim();
        if (!trimmed || trimmed.startsWith('#')) continue;

        const classMatch = trimmed.match(/^class\s+(\w+):$/);
        if (classMatch) { currentClass = classMatch[1]; classDefs[currentClass] = {}; continue; }
        if (currentClass && line.startsWith("    ")) continue;
        else currentClass = null;

        // Object creation: s1 = Student('Alice', [80, 90, 85])
        const objMatch = trimmed.match(/^(\w+)\s*=\s*Student\(\s*['"](.+?)['"]\s*,\s*\[(.+)\]\s*\)$/);
        if (objMatch) {
          const marks = objMatch[3].split(',').map(n => Number(n.trim()));
          vars[objMatch[1]] = { name: objMatch[2], marks, _type: 'Student' };
          continue;
        }

        // print(obj.name) or print(obj.average())
        const printMatch = trimmed.match(/^print\((.+)\)$/);
        if (printMatch) {
          const expr = printMatch[1].trim();
          if (expr.includes('.name')) {
            const obj = expr.split('.')[0];
            if (vars[obj]) output.push(vars[obj].name);
          } else if (expr.includes('.average()')) {
            const obj = expr.split('.')[0];
            if (vars[obj]) {
              const avg = vars[obj].marks.reduce((a: number, b: number) => a + b, 0) / vars[obj].marks.length;
              output.push(avg.toString());
            }
          } else if (expr.includes('.marks')) {
            const obj = expr.split('.')[0];
            if (vars[obj]) output.push(`[${vars[obj].marks.join(', ')}]`);
          } else {
            output.push(expr.replace(/^['"]|['"]$/g, ''));
          }
        }
      }
    } catch (e) {
      output.push("Simulation Error");
    }
    setFsOut(output.length ? output : ["(No output)"]);
  };

  return (
    <div className="bg-slate-50 min-h-screen text-slate-800 font-sans p-8 md:p-12 overflow-y-auto">
      <div className="max-w-5xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center space-y-4 mb-16 relative">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-32 bg-gradient-to-r from-blue-400/20 to-purple-400/20 blur-3xl pointer-events-none rounded-full" />
          <h1 className="text-4xl md:text-5xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-purple-700 relative z-10">
            Student Grade Management System
          </h1>
          <p className="text-lg text-slate-500 font-medium">Capstone Integration Project</p>
        </div>

        {/* ═══ SECTION 1: Create Student Objects ═══ */}
        <section>
          <SectionTitle num={1} title="Create Student Objects" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 flex flex-col gap-5">
              <div className="bg-blue-50/50 p-5 rounded-xl border border-blue-100 leading-loose text-slate-700">
                <CL indent={0}><span className="text-blue-600 font-bold">class</span> Student:</CL>
                <CL indent={1}><span className="text-blue-600 font-bold">def</span> <span className="text-blue-600">__init__</span>(<span className="text-red-500 font-bold">self</span>, name, marks):</CL>
                <CL indent={2}><span className="text-red-500 font-bold">self</span>.name = name</CL>
                <CL indent={2}><span className="text-red-500 font-bold">self</span>.marks = marks</CL>
              </div>

              <div className="border-t border-slate-200 pt-4 space-y-3">
                <h3 className="font-bold text-slate-600 uppercase tracking-widest text-xs flex items-center gap-2"><Plus className="size-4" /> Add Student</h3>
                <input type="text" value={s1Name} onChange={e => setS1Name(e.target.value)} placeholder="Student Name"
                  className="w-full bg-slate-50 border-2 border-slate-200 rounded-xl p-3 font-mono text-sm outline-none focus:border-blue-400" />
                <input type="text" value={s1Marks} onChange={e => setS1Marks(e.target.value)} placeholder="Marks (e.g. 80, 90, 85)"
                  className="w-full bg-slate-50 border-2 border-slate-200 rounded-xl p-3 font-mono text-sm outline-none focus:border-blue-400" />
                <RunButton onClick={addStudent} label="Create Student" icon={Plus} />
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
                <h3 className="font-bold text-slate-600 uppercase tracking-widest text-xs mb-4">Object Viewer ({students.length} students)</h3>
                <div className="space-y-3 max-h-72 overflow-y-auto pr-2">
                  <AnimatePresence>
                    {students.map((s, i) => <StudentCard key={s.name} s={s} />)}
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ═══ SECTION 2: Average & Grade ═══ */}
        <section>
          <SectionTitle num={2} title="Calculate Average & Grade" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 flex flex-col gap-5">
              <div className="bg-blue-50/50 p-5 rounded-xl border border-blue-100 leading-loose text-slate-700">
                <CL indent={0}><span className="text-blue-600 font-bold">def</span> <span className="text-blue-600">average</span>(<span className="text-red-500 font-bold">self</span>):</CL>
                <CL indent={1}><span className="text-blue-600 font-bold">return</span> <span className="text-blue-600">sum</span>(<span className="text-red-500 font-bold">self</span>.marks) / <span className="text-blue-600">len</span>(<span className="text-red-500 font-bold">self</span>.marks)</CL>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2 block">Select Student</label>
                <div className="flex flex-wrap gap-2">
                  {students.map((s, i) => (
                    <button key={s.name} onClick={() => { setS2Selected(i); setS2EditMarks(s.marks.join(', ')); }}
                      className={`px-4 py-2 rounded-xl font-mono text-sm border-2 transition-all font-bold ${s2Selected === i ? "bg-purple-500 text-white border-purple-500" : "bg-white border-slate-200 text-slate-600 hover:border-purple-300"}`}>
                      {s.name}
                    </button>
                  ))}
                </div>
              </div>

              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-3">
                <div className="text-xs font-bold text-slate-500 uppercase tracking-widest">Grade Rules</div>
                <div className="font-mono text-xs space-y-1">
                  <div className="flex justify-between"><span>Average &gt;= 90</span><span className="font-bold text-emerald-600">→ A</span></div>
                  <div className="flex justify-between"><span>Average &gt;= 80</span><span className="font-bold text-blue-600">→ B</span></div>
                  <div className="flex justify-between"><span>Average &gt;= 70</span><span className="font-bold text-amber-600">→ C</span></div>
                  <div className="flex justify-between"><span>Below 70</span><span className="font-bold text-red-600">→ F</span></div>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              {s2Student && (() => {
                const avg = getAvg(s2Student.marks);
                const grade = getGrade(avg);
                return (
                  <>
                    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 flex flex-col gap-6">
                      <h3 className="font-bold text-slate-600 uppercase tracking-widest text-xs">Student Dashboard</h3>
                      <div className="overflow-x-auto">
                        <table className="w-full text-sm font-mono">
                          <thead>
                            <tr className="bg-blue-50 border-b border-blue-100">
                              <th className="px-4 py-2 text-left text-blue-600 font-bold text-xs">Name</th>
                              <th className="px-4 py-2 text-left text-blue-600 font-bold text-xs">Average</th>
                              <th className="px-4 py-2 text-left text-blue-600 font-bold text-xs">Grade</th>
                            </tr>
                          </thead>
                          <tbody>
                            {students.map(s => {
                              const a = getAvg(s.marks);
                              const g = getGrade(a);
                              return (
                                <tr key={s.name} className="border-b border-slate-100">
                                  <td className="px-4 py-2">{s.name}</td>
                                  <td className="px-4 py-2 font-bold">{a.toFixed(1)}</td>
                                  <td className="px-4 py-2"><span className={`font-bold px-3 py-0.5 rounded-full border text-xs ${gradeColor(g)}`}>{g}</span></td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      </div>
                    </div>
                    <Hint text="Modify marks in Section 1 to see the average and grade recalculate in real time for every student!" />
                  </>
                );
              })()}
            </div>
          </div>
        </section>

        {/* ═══ SECTION 3: Database Manager ═══ */}
        <section>
          <SectionTitle num={3} title="Student Database Manager" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 flex flex-col gap-5">
              <div className="bg-blue-50/50 p-5 rounded-xl border border-blue-100 leading-loose text-slate-700">
                <CL indent={0}>students = {"{"}</CL>
                {students.map((s, i) => (
                  <CL key={s.name} indent={1}><span className="text-amber-600">"{s.name}"</span>: Student(...){i < students.length - 1 ? ',' : ''}</CL>
                ))}
                <CL indent={0}>{"}"}</CL>
              </div>

              <div className="border-t border-slate-200 pt-4 space-y-3">
                <h3 className="font-bold text-slate-600 uppercase tracking-widest text-xs flex items-center gap-2"><Search className="size-4" /> Search Student</h3>
                <div className="flex gap-2">
                  <input type="text" value={s3Search} onChange={e => { setS3Search(e.target.value); setS3Result(undefined); }} placeholder="Enter name..."
                    className="flex-1 bg-slate-50 border-2 border-slate-200 rounded-xl p-3 font-mono text-sm outline-none focus:border-blue-400" />
                  <RunButton onClick={searchStudent} label="Search" icon={Search} />
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
                <h3 className="font-bold text-slate-600 uppercase tracking-widest text-xs mb-4">Database Viewer</h3>
                <div className="grid grid-cols-2 gap-3 max-h-48 overflow-y-auto pr-2">
                  {students.map(s => {
                    const avg = getAvg(s.marks);
                    const g = getGrade(avg);
                    return (
                      <div key={s.name} className="bg-slate-50 rounded-xl border border-slate-200 p-3 font-mono text-xs">
                        <div className="font-bold text-slate-800 mb-1">{s.name}</div>
                        <div className="text-slate-500">Avg: {avg.toFixed(1)}</div>
                        <div className={`font-bold text-xs inline-block px-2 py-0.5 rounded-full border mt-1 ${gradeColor(g)}`}>Grade: {g}</div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {s3Result !== undefined && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                  {s3Result ? (
                    <div className="bg-emerald-50 rounded-2xl border-2 border-emerald-200 p-6 flex items-start gap-4">
                      <CheckCircle className="size-6 text-emerald-500 flex-shrink-0" />
                      <div className="font-mono text-sm space-y-1">
                        <div className="font-bold text-emerald-800">Student Found</div>
                        <div>Name: {s3Result.name}</div>
                        <div>Average: {getAvg(s3Result.marks).toFixed(1)}</div>
                        <div>Grade: {getGrade(getAvg(s3Result.marks))}</div>
                      </div>
                    </div>
                  ) : (
                    <div className="bg-red-50 rounded-2xl border-2 border-red-200 p-6 flex items-start gap-4">
                      <XCircle className="size-6 text-red-500 flex-shrink-0" />
                      <div className="font-mono text-sm">
                        <div className="font-bold text-red-800">Student Not Found</div>
                        <div className="text-red-600">"{s3Search}" is not in the database.</div>
                      </div>
                    </div>
                  )}
                </motion.div>
              )}
            </div>
          </div>
        </section>

        {/* ═══ SECTION 4: File Handling ═══ */}
        <section>
          <SectionTitle num={4} title="Save & Load Reports" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 flex flex-col gap-5">
              <div className="bg-blue-50/50 p-5 rounded-xl border border-blue-100 leading-loose text-slate-700">
                <CL indent={0}><span className="text-blue-600 font-bold">with</span> <span className="text-blue-600">open</span>(<span className="text-amber-600">"grades.txt"</span>, <span className="text-amber-600">"w"</span>) <span className="text-blue-600 font-bold">as</span> file:</CL>
                <CL indent={1}><span className="text-blue-600 font-bold">for</span> s <span className="text-blue-600 font-bold">in</span> students:</CL>
                <CL indent={2}>file.write(f<span className="text-amber-600">"{'{'}name{'}'},{'{'}avg{'}'},{'{'}grade{'}'}\n"</span>)</CL>
              </div>

              <div className="flex gap-3">
                <RunButton onClick={saveToFile} label="Save to File" icon={Save} />
                <button onClick={loadFromFile} disabled={!s4Saved}
                  className={`px-6 py-2.5 rounded-xl flex items-center gap-2 font-semibold text-sm transition-all ${s4Saved ? "bg-emerald-500 hover:bg-emerald-600 text-white shadow-md" : "bg-slate-100 text-slate-400 cursor-not-allowed"}`}>
                  <Download className="size-4" /> Load Report
                </button>
              </div>

              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                <div className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3">Serialization Flow</div>
                <div className="flex items-center gap-2 justify-center font-mono text-xs">
                  <div className="bg-purple-100 border border-purple-200 text-purple-700 px-3 py-1.5 rounded-lg font-bold">Student Object</div>
                  <ArrowDown className="size-4 text-slate-300 -rotate-90" />
                  <div className="bg-blue-100 border border-blue-200 text-blue-700 px-3 py-1.5 rounded-lg font-bold">Text Line</div>
                  <ArrowDown className="size-4 text-slate-300 -rotate-90" />
                  <div className="bg-emerald-100 border border-emerald-200 text-emerald-700 px-3 py-1.5 rounded-lg font-bold flex items-center gap-1"><FileText className="size-3" /> grades.txt</div>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
                <h3 className="font-bold text-slate-600 uppercase tracking-widest text-xs mb-4 flex items-center gap-2"><FileText className="size-4" /> Virtual File: grades.txt</h3>
                {s4FileContent.length > 0 ? (
                  <div className="bg-slate-800 rounded-xl border border-slate-700 p-4 font-mono text-sm text-emerald-400 space-y-0.5">
                    {s4FileContent.map((l, i) => <div key={i}>{l}</div>)}
                  </div>
                ) : (
                  <div className="border-2 border-dashed border-slate-200 rounded-xl p-8 text-center text-slate-400 italic text-sm">
                    File not created yet. Click "Save to File".
                  </div>
                )}
              </div>
              {s4Loaded && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  <OutputConsole lines={["Reading grades.txt...", "", ...s4FileContent, "", "Report loaded successfully!"]} label="Load Output" />
                </motion.div>
              )}
            </div>
          </div>
        </section>

        {/* ═══ SECTION 5: Error Handling & Final System ═══ */}
        <section>
          <SectionTitle num={5} title="Error Handling & Final System" />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Error Handling */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 flex flex-col gap-4">
              <h3 className="font-bold text-red-500 uppercase tracking-widest text-xs flex items-center gap-2"><AlertTriangle className="size-4" /> Invalid Input</h3>
              <div className="bg-blue-50/50 p-4 rounded-xl border border-blue-100 font-mono text-[11px] text-slate-700">
                <span className="text-blue-600 font-bold">try:</span><br/>
                &nbsp;&nbsp;score = <span className="text-blue-600">float</span>(input())<br/>
                <span className="text-blue-600 font-bold">except</span> <span className="text-red-500 font-bold">ValueError:</span><br/>
                &nbsp;&nbsp;<span className="text-blue-600">print</span>(<span className="text-amber-600">"Invalid Score"</span>)
              </div>
              <input type="text" value={s5Input} onChange={e => { setS5Input(e.target.value); setS5Ran(false); }} placeholder="Enter score..."
                className="w-full bg-slate-50 border-2 border-slate-200 rounded-lg p-2 font-mono text-xs outline-none focus:border-blue-400" />
              <button onClick={() => setS5Ran(true)} className="w-full py-2 bg-blue-500 text-white rounded-lg font-bold text-xs hover:bg-blue-600">Run</button>
              {s5Ran && (
                <div className={`p-3 rounded-xl border-2 font-mono text-xs text-center font-bold ${isNaN(Number(s5Input)) ? "bg-red-50 text-red-600 border-red-200" : "bg-emerald-50 text-emerald-600 border-emerald-200"}`}>
                  {isNaN(Number(s5Input)) ? "Invalid Score" : `Score: ${Number(s5Input)}`}
                </div>
              )}
            </div>

            {/* Search Challenge */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 flex flex-col gap-4">
              <h3 className="font-bold text-purple-500 uppercase tracking-widest text-xs flex items-center gap-2"><Search className="size-4" /> Search Challenge</h3>
              <div className="flex gap-1">
                <input type="text" value={s5SearchInput} onChange={e => { setS5SearchInput(e.target.value); setS5SearchRan(false); }}
                  className="flex-1 bg-slate-50 border-2 border-slate-200 rounded-lg p-2 font-mono text-xs outline-none focus:border-purple-400" />
                <button onClick={() => setS5SearchRan(true)} className="px-3 py-2 bg-purple-500 text-white rounded-lg font-bold text-xs">Search</button>
              </div>
              {s5SearchRan && (
                <div className={`p-3 rounded-xl border-2 font-mono text-xs text-center font-bold ${students.find(s => s.name.toLowerCase() === s5SearchInput.toLowerCase()) ? "bg-emerald-50 text-emerald-600 border-emerald-200" : "bg-red-50 text-red-600 border-red-200"}`}>
                  {students.find(s => s.name.toLowerCase() === s5SearchInput.toLowerCase()) ? "Student Found" : "Student Not Found"}
                </div>
              )}
            </div>

            {/* Workflow */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 flex flex-col gap-4">
              <h3 className="font-bold text-emerald-500 uppercase tracking-widest text-xs">System Workflow</h3>
              <div className="space-y-2">
                {["Create Student", "Calculate Average", "Assign Grade", "Store in Dictionary", "Save to File", "Load Report", "Search Student"].map((step, i) => (
                  <div key={i} onClick={() => setS5WorkflowStep(i)}
                    className={`flex items-center gap-3 p-2 rounded-lg cursor-pointer transition-all text-xs font-mono ${s5WorkflowStep >= i ? "bg-emerald-50 border border-emerald-200 text-emerald-700 font-bold" : "bg-slate-50 border border-slate-200 text-slate-500"}`}>
                    <span className={`size-5 rounded-full flex items-center justify-center text-[10px] font-bold ${s5WorkflowStep >= i ? "bg-emerald-500 text-white" : "bg-slate-200 text-slate-500"}`}>{i + 1}</span>
                    {step}
                  </div>
                ))}
              </div>
            </div>

          </div>
        </section>

        {/* ═══ FINAL SANDBOX ═══ */}
        <section className="pt-12 border-t border-slate-200 mt-12 pb-24">
          <div className="text-center space-y-2 mb-8">
            <h2 className="text-3xl font-black text-slate-800">Final Project Sandbox</h2>
            <p className="text-slate-500">Build and test your complete Student Grade Management System.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 flex flex-col overflow-hidden">
              <div className="bg-slate-50 border-b border-slate-100 px-4 py-3 font-bold text-xs uppercase tracking-widest text-slate-500 flex justify-between items-center">
                <span>Project Editor</span>
                <button onClick={runFinal} className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white px-4 py-1.5 rounded-lg flex items-center gap-2 transition-all shadow-sm">
                  <PlayCircle className="size-4" /> Run Code
                </button>
              </div>
              <div className="p-6">
                <textarea
                  value={fsCode}
                  onChange={(e) => setFsCode(e.target.value)}
                  className="w-full h-56 bg-blue-50/30 border border-blue-100 rounded-xl p-4 font-mono text-slate-700 outline-none focus:border-blue-400 focus:bg-blue-50/50 resize-none leading-loose text-sm"
                  spellCheck={false}
                />
              </div>
            </div>

            <div className="flex flex-col gap-6">
              <div className="bg-slate-800 rounded-2xl shadow-lg border border-slate-700 flex flex-col overflow-hidden h-full">
                <div className="bg-slate-900 border-b border-slate-700 px-4 py-3 font-bold text-xs uppercase tracking-widest text-slate-400">
                  Output Console
                </div>
                <div className="p-6 font-mono text-emerald-400 space-y-1 text-sm">
                  {fsOut.length > 0 ? fsOut.map((l, i) => <div key={i} className={l.includes("Error") ? "text-red-400" : ""}>{l}</div>) : <div className="text-slate-600 italic">Click Run Code...</div>}
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
