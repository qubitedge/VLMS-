import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PlayCircle, RotateCcw, Lightbulb, Table, BarChart3, Plus, Filter, ArrowRight } from "lucide-react";

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
      {lines.length > 0 ? lines.map((l, i) => <div key={i}>{l}</div>) : <span className="text-slate-600 italic">No output yet...</span>}
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

/* ─── Array Visualizer ─── */
const ArrayVis = ({ values, label }: { values: number[]; label?: string }) => (
  <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm">
    {label && <div className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3">{label}</div>}
    <div className="flex gap-1">
      {values.map((v, i) => (
        <div key={i} className="flex flex-col items-center gap-1 flex-1 min-w-0">
          <div className="text-[10px] text-slate-400 font-mono">{i}</div>
          <div className="bg-blue-100 border-2 border-blue-300 text-blue-800 font-bold font-mono text-sm rounded-lg w-full text-center py-2">{v}</div>
        </div>
      ))}
    </div>
  </div>
);

/* ─── 2D Grid Visualizer ─── */
const GridVis = ({ rows }: { rows: number[][] }) => (
  <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm">
    <div className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3">2D Array</div>
    <div className="space-y-1">
      {rows.map((row, ri) => (
        <div key={ri} className="flex gap-1">
          {row.map((v, ci) => (
            <div key={ci} className="bg-purple-100 border-2 border-purple-300 text-purple-800 font-bold font-mono text-sm rounded-lg flex-1 text-center py-2">{v}</div>
          ))}
        </div>
      ))}
    </div>
  </div>
);

/* ─── DataFrame Visualizer ─── */
const DFVis = ({ columns, rows, label }: { columns: string[]; rows: (string | number)[][]; label?: string }) => (
  <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
    {label && <div className="px-4 py-2 bg-slate-50 border-b border-slate-200 text-xs font-bold text-slate-500 uppercase tracking-widest">{label}</div>}
    <div className="overflow-x-auto">
      <table className="w-full text-sm font-mono">
        <thead>
          <tr className="bg-blue-50 border-b border-blue-100">
            <th className="px-4 py-2 text-left text-blue-600 font-bold text-xs">#</th>
            {columns.map((c, i) => (
              <th key={i} className="px-4 py-2 text-left text-blue-600 font-bold text-xs">{c}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, ri) => (
            <tr key={ri} className="border-b border-slate-100 hover:bg-slate-50 transition-all">
              <td className="px-4 py-2 text-slate-400">{ri}</td>
              {row.map((v, ci) => (
                <td key={ci} className="px-4 py-2 text-slate-800">{v}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

/* ═══════════════════════ MAIN COMPONENT ═══════════════════════ */

export function PythonDataAnalysisPlayground({ expId }: { expId: string }) {

  /* ── SECTION 1: NumPy Array ── */
  const [s1Arr, setS1Arr] = useState("1,2,3,4,5");
  const [s1Op, setS1Op] = useState<string | null>(null);
  const s1Vals = s1Arr.split(',').map(n => Number(n.trim())).filter(n => !isNaN(n));
  const s1Result = s1Op ? s1Vals.map(v => {
    if (s1Op === "+5") return v + 5;
    if (s1Op === "+10") return v + 10;
    if (s1Op === "*2") return v * 2;
    if (s1Op === "-3") return v - 3;
    return v;
  }) : s1Vals;

  const [s1Mode, setS1Mode] = useState<"1d" | "2d">("1d");
  const [s1Grid, setS1Grid] = useState("1,2\n3,4");
  const s1Rows = s1Grid.split('\n').map(r => r.split(',').map(n => Number(n.trim())));

  /* ── SECTION 2: Statistics ── */
  const [s2Arr, setS2Arr] = useState("10,20,30,40,50");
  const [s2Metric, setS2Metric] = useState<"mean" | "median" | "sum" | "std" | "max">("mean");
  const s2Vals = s2Arr.split(',').map(n => Number(n.trim())).filter(n => !isNaN(n));
  const s2Calc = () => {
    if (!s2Vals.length) return "0";
    const sorted = [...s2Vals].sort((a, b) => a - b);
    if (s2Metric === "mean") return (s2Vals.reduce((a, b) => a + b, 0) / s2Vals.length).toFixed(1);
    if (s2Metric === "median") {
      const mid = Math.floor(sorted.length / 2);
      return sorted.length % 2 !== 0 ? sorted[mid].toString() : ((sorted[mid - 1] + sorted[mid]) / 2).toFixed(1);
    }
    if (s2Metric === "sum") return s2Vals.reduce((a, b) => a + b, 0).toString();
    if (s2Metric === "std") {
      const mean = s2Vals.reduce((a, b) => a + b, 0) / s2Vals.length;
      const variance = s2Vals.reduce((a, b) => a + (b - mean) ** 2, 0) / s2Vals.length;
      return Math.sqrt(variance).toFixed(2);
    }
    if (s2Metric === "max") return Math.max(...s2Vals).toString();
    return "0";
  };

  /* ── SECTION 3: DataFrame ── */
  const [s3Data, setS3Data] = useState<{ Name: string; Age: number; Grade?: string }[]>([
    { Name: "Alice", Age: 18 },
    { Name: "Bob", Age: 22 },
    { Name: "John", Age: 25 },
  ]);
  const [s3HasGrade, setS3HasGrade] = useState(false);
  const [s3NewName, setS3NewName] = useState("");
  const [s3NewAge, setS3NewAge] = useState("");

  /* ── SECTION 4: Filtering ── */
  const s4Data = [
    { Name: "Alice", Age: 18, Score: 70 },
    { Name: "Bob", Age: 22, Score: 90 },
    { Name: "John", Age: 25, Score: 95 },
    { Name: "Sara", Age: 20, Score: 88 },
  ];
  const [s4AgeFilter, setS4AgeFilter] = useState(20);
  const [s4ScoreFilter, setS4ScoreFilter] = useState(0);
  const [s4ShowDescribe, setS4ShowDescribe] = useState(false);
  const s4Filtered = s4Data.filter(r => r.Age >= s4AgeFilter && r.Score > s4ScoreFilter);
  const s4Describe = () => {
    const ages = s4Data.map(r => r.Age);
    const scores = s4Data.map(r => r.Score);
    const mean = (arr: number[]) => (arr.reduce((a, b) => a + b, 0) / arr.length).toFixed(2);
    const std = (arr: number[]) => {
      const m = arr.reduce((a, b) => a + b, 0) / arr.length;
      return Math.sqrt(arr.reduce((a, b) => a + (b - m) ** 2, 0) / (arr.length - 1)).toFixed(2);
    };
    return {
      columns: ["", "Age", "Score"],
      rows: [
        ["count", ages.length.toString(), scores.length.toString()],
        ["mean", mean(ages), mean(scores)],
        ["std", std(ages), std(scores)],
        ["min", Math.min(...ages).toString(), Math.min(...scores).toString()],
        ["max", Math.max(...ages).toString(), Math.max(...scores).toString()],
      ]
    };
  };

  /* ── FINAL SANDBOX ── */
  const [fsCode, setFsCode] = useState("import numpy as np\nimport pandas as pd\n\narr = np.array([10, 20, 30, 40, 50])\nprint(np.mean(arr))\nprint(np.sum(arr))");
  const [fsOut, setFsOut] = useState<string[]>([]);

  const runFinal = () => {
    let output: string[] = [];
    try {
      const lines = fsCode.split('\n');
      let vars: Record<string, any> = {};

      for (const line of lines) {
        let trimmed = line.trim();
        if (!trimmed || trimmed.startsWith('#') || trimmed.startsWith('import')) continue;

        // np.array assignment
        const arrMatch = trimmed.match(/^(\w+)\s*=\s*np\.array\(\[(.+)\]\)$/);
        if (arrMatch) {
          vars[arrMatch[1]] = arrMatch[2].split(',').map(n => Number(n.trim()));
          continue;
        }

        // pd.DataFrame assignment (basic)
        const dfMatch = trimmed.match(/^(\w+)\s*=\s*pd\.DataFrame\(/);
        if (dfMatch) {
          vars[dfMatch[1]] = { _type: 'df' };
          continue;
        }

        // print with np functions
        const printMatch = trimmed.match(/^print\((.+)\)$/);
        if (printMatch) {
          const expr = printMatch[1].trim();

          // np.mean(var)
          const npFuncMatch = expr.match(/^np\.(\w+)\((\w+)\)$/);
          if (npFuncMatch && vars[npFuncMatch[2]]) {
            const arr = vars[npFuncMatch[2]] as number[];
            const func = npFuncMatch[1];
            if (func === "mean") output.push((arr.reduce((a, b) => a + b, 0) / arr.length).toString());
            else if (func === "sum") output.push(arr.reduce((a, b) => a + b, 0).toString());
            else if (func === "max") output.push(Math.max(...arr).toString());
            else if (func === "min") output.push(Math.min(...arr).toString());
            else if (func === "median") {
              const sorted = [...arr].sort((a, b) => a - b);
              const mid = Math.floor(sorted.length / 2);
              output.push(sorted.length % 2 !== 0 ? sorted[mid].toString() : ((sorted[mid - 1] + sorted[mid]) / 2).toString());
            }
            else if (func === "std") {
              const mean = arr.reduce((a, b) => a + b, 0) / arr.length;
              output.push(Math.sqrt(arr.reduce((a, b) => a + (b - mean) ** 2, 0) / arr.length).toFixed(4));
            }
            continue;
          }

          // variable print
          if (vars[expr]) {
            if (Array.isArray(vars[expr])) output.push(`[${vars[expr].join(', ')}]`);
            else output.push(String(vars[expr]));
          } else {
            output.push(expr.replace(/^['"]|['"]$/g, ''));
          }
        }

        // arr + N or arr * N
        const opMatch = trimmed.match(/^(\w+)\s*=\s*(\w+)\s*([+\-*/])\s*(\d+)$/);
        if (opMatch && vars[opMatch[2]]) {
          const arr = vars[opMatch[2]] as number[];
          const op = opMatch[3];
          const n = Number(opMatch[4]);
          vars[opMatch[1]] = arr.map(v => op === '+' ? v + n : op === '-' ? v - n : op === '*' ? v * n : v / n);
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
            NumPy & Pandas Playground
          </h1>
          <p className="text-lg text-slate-500 font-medium">Interactive Data Analysis Visualizer</p>
        </div>

        {/* ═══ SECTION 1: NumPy Array ═══ */}
        <section>
          <SectionTitle num={1} title="NumPy Array Playground" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 flex flex-col gap-5">
              <div className="flex gap-2 mb-2">
                <button onClick={() => setS1Mode("1d")} className={`px-4 py-1.5 rounded-lg font-bold text-xs border-2 ${s1Mode === "1d" ? "bg-blue-50 border-blue-400 text-blue-700" : "bg-white border-slate-200 text-slate-500"}`}>1D Array</button>
                <button onClick={() => setS1Mode("2d")} className={`px-4 py-1.5 rounded-lg font-bold text-xs border-2 ${s1Mode === "2d" ? "bg-purple-50 border-purple-400 text-purple-700" : "bg-white border-slate-200 text-slate-500"}`}>2D Array</button>
              </div>

              {s1Mode === "1d" ? (
                <>
                  <div className="bg-blue-50/50 p-5 rounded-xl border border-blue-100 leading-loose text-slate-700">
                    <CL indent={0}><span className="text-blue-600 font-bold">import</span> numpy <span className="text-blue-600 font-bold">as</span> np</CL>
                    <div className="h-2" />
                    <CL indent={0}>arr = np.array([</CL>
                    <CL indent={1}><input type="text" value={s1Arr} onChange={e => { setS1Arr(e.target.value); setS1Op(null); }}
                      className="w-full bg-white border-b-2 border-blue-300 outline-none text-amber-600 font-mono text-sm" /></CL>
                    <CL indent={0}>])</CL>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2 block">Element-wise Operation</label>
                    <div className="flex flex-wrap gap-2">
                      {["+5", "+10", "*2", "-3"].map(op => (
                        <button key={op} onClick={() => setS1Op(op)}
                          className={`px-4 py-2 rounded-xl font-mono text-sm border-2 transition-all font-bold ${s1Op === op ? "bg-blue-500 text-white border-blue-500" : "bg-white border-slate-200 text-slate-600 hover:border-blue-300"}`}>
                          arr {op}
                        </button>
                      ))}
                      <button onClick={() => setS1Op(null)} className="px-3 py-2 rounded-xl bg-slate-100 text-slate-500 hover:bg-slate-200"><RotateCcw className="size-4" /></button>
                    </div>
                  </div>
                </>
              ) : (
                <div className="flex flex-col gap-4">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Enter rows (comma-separated, one per line)</label>
                  <textarea value={s1Grid} onChange={e => setS1Grid(e.target.value)}
                    className="w-full h-24 bg-blue-50/30 border border-blue-100 rounded-xl p-4 font-mono text-sm outline-none focus:border-blue-400 resize-none" spellCheck={false} />
                </div>
              )}
            </div>

            <div className="flex flex-col gap-4">
              {s1Mode === "1d" ? (
                <>
                  <ArrayVis values={s1Result} label={s1Op ? `arr ${s1Op}` : "arr"} />
                  <OutputConsole lines={[`[${s1Result.join(', ')}]`]} />
                </>
              ) : (
                <>
                  <GridVis rows={s1Rows} />
                  <OutputConsole lines={s1Rows.map(r => `[${r.join(', ')}]`)} />
                </>
              )}
            </div>
          </div>
        </section>

        {/* ═══ SECTION 2: Statistics Lab ═══ */}
        <section>
          <SectionTitle num={2} title="NumPy Statistics Lab" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 flex flex-col gap-5">
              <div>
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2 block">Array Values (comma-separated)</label>
                <input type="text" value={s2Arr} onChange={e => setS2Arr(e.target.value)}
                  className="w-full bg-slate-50 border-2 border-slate-200 rounded-xl p-3 font-mono text-sm outline-none focus:border-blue-400" />
              </div>
              <ArrayVis values={s2Vals} label="arr" />
              <div>
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2 block">Metric Selector</label>
                <div className="flex flex-wrap gap-2">
                  {(["mean", "median", "sum", "std", "max"] as const).map(m => (
                    <button key={m} onClick={() => setS2Metric(m)}
                      className={`px-4 py-2 rounded-xl font-mono text-sm border-2 transition-all font-bold ${s2Metric === m ? "bg-emerald-500 text-white border-emerald-500" : "bg-white border-slate-200 text-slate-600 hover:border-emerald-300"}`}>
                      np.{m}()
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 flex flex-col items-center justify-center flex-1 gap-4">
                <div className="text-xs font-bold text-slate-500 uppercase tracking-widest">np.{s2Metric}(arr)</div>
                <motion.div key={s2Metric + s2Arr} initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
                  className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 font-mono">
                  {s2Calc()}
                </motion.div>
              </div>
              <OutputConsole lines={[`np.${s2Metric}(arr) → ${s2Calc()}`]} />
              <Hint text="Edit the array values above and switch between metrics to see statistics recalculate instantly!" />
            </div>
          </div>
        </section>

        {/* ═══ SECTION 3: Pandas DataFrame ═══ */}
        <section>
          <SectionTitle num={3} title="Pandas DataFrame Playground" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 flex flex-col gap-5">
              <div className="bg-blue-50/50 p-5 rounded-xl border border-blue-100 leading-loose text-slate-700">
                <CL indent={0}><span className="text-blue-600 font-bold">import</span> pandas <span className="text-blue-600 font-bold">as</span> pd</CL>
                <div className="h-2" />
                <CL indent={0}>data = {"{"}</CL>
                <CL indent={1}><span className="text-amber-600">"Name"</span>: [{s3Data.map(d => `"${d.Name}"`).join(', ')}],</CL>
                <CL indent={1}><span className="text-amber-600">"Age"</span>: [{s3Data.map(d => d.Age).join(', ')}]</CL>
                <CL indent={0}>{"}"}</CL>
                <CL indent={0}>df = pd.DataFrame(data)</CL>
              </div>

              <div className="border-t border-slate-200 pt-4 space-y-3">
                <h3 className="font-bold text-slate-600 uppercase tracking-widest text-xs">Add Row</h3>
                <div className="flex gap-2 items-center">
                  <input type="text" value={s3NewName} onChange={e => setS3NewName(e.target.value)} placeholder="Name" className="flex-1 bg-slate-50 border-2 border-slate-200 rounded-lg p-2 font-mono text-xs outline-none focus:border-blue-400" />
                  <input type="text" value={s3NewAge} onChange={e => setS3NewAge(e.target.value)} placeholder="Age" className="w-16 bg-slate-50 border-2 border-slate-200 rounded-lg p-2 font-mono text-xs outline-none focus:border-blue-400" />
                  <button onClick={() => { if (s3NewName && s3NewAge) { setS3Data([...s3Data, { Name: s3NewName, Age: Number(s3NewAge) }]); setS3NewName(""); setS3NewAge(""); }}}
                    className="px-3 py-2 bg-blue-500 text-white font-bold rounded-lg text-xs hover:bg-blue-600 flex items-center gap-1"><Plus className="size-3" /> Add</button>
                </div>
                <button onClick={() => { setS3HasGrade(true); }} className={`w-full py-2 rounded-lg font-bold text-xs border-2 transition-all ${s3HasGrade ? "bg-emerald-50 border-emerald-300 text-emerald-700" : "bg-slate-50 border-slate-200 text-slate-600 hover:border-emerald-300"}`}>
                  {s3HasGrade ? '✓ Grade Column Added' : 'Add "Grade" Column'}
                </button>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <DFVis
                label="DataFrame Viewer"
                columns={s3HasGrade ? ["Name", "Age", "Grade"] : ["Name", "Age"]}
                rows={s3Data.map(d => s3HasGrade ? [d.Name, d.Age, "Pass"] : [d.Name, d.Age])}
              />
              <Hint text="Add rows and columns dynamically to see the DataFrame grow in real-time. Every Pandas DataFrame is essentially a dictionary of lists!" />
            </div>
          </div>
        </section>

        {/* ═══ SECTION 4: Filtering & Analysis ═══ */}
        <section>
          <SectionTitle num={4} title="Data Filtering & Analysis" />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 flex flex-col gap-5">
              <DFVis label="Original DataFrame" columns={["Name", "Age", "Score"]} rows={s4Data.map(d => [d.Name, d.Age, d.Score])} />

              <div className="border-t border-slate-200 pt-4 space-y-3">
                <h3 className="font-bold text-slate-600 uppercase tracking-widest text-xs flex items-center gap-2"><Filter className="size-4" /> Filter Builder</h3>
                <div className="flex flex-col gap-3 bg-slate-50 p-4 rounded-xl border border-slate-200">
                  <div className="flex items-center gap-2 text-sm font-mono">
                    <span className="text-blue-600 font-bold">df["Age"]</span>
                    <span className="text-slate-500">&gt;=</span>
                    <input type="number" value={s4AgeFilter} onChange={e => setS4AgeFilter(Number(e.target.value))}
                      className="w-16 bg-white border-2 border-blue-200 rounded-lg p-1.5 text-center font-mono text-sm outline-none focus:border-blue-400" />
                  </div>
                  <div className="flex items-center gap-2 text-sm font-mono">
                    <span className="text-purple-600 font-bold">df["Score"]</span>
                    <span className="text-slate-500">&gt;</span>
                    <input type="number" value={s4ScoreFilter} onChange={e => setS4ScoreFilter(Number(e.target.value))}
                      className="w-16 bg-white border-2 border-purple-200 rounded-lg p-1.5 text-center font-mono text-sm outline-none focus:border-purple-400" />
                  </div>
                </div>
                <button onClick={() => setS4ShowDescribe(!s4ShowDescribe)}
                  className={`w-full py-2 rounded-lg font-bold text-xs border-2 transition-all ${s4ShowDescribe ? "bg-amber-50 border-amber-300 text-amber-700" : "bg-slate-50 border-slate-200 text-slate-600 hover:border-amber-300"}`}>
                  {s4ShowDescribe ? "Hide df.describe()" : "Show df.describe()"}
                </button>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <DFVis label={`Filtered (Age≥${s4AgeFilter}, Score>${s4ScoreFilter})`} columns={["Name", "Age", "Score"]}
                rows={s4Filtered.map(d => [d.Name, d.Age, d.Score])} />

              <AnimatePresence>
                {s4ShowDescribe && (
                  <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}>
                    <DFVis label="df.describe()" columns={s4Describe().columns} rows={s4Describe().rows} />
                  </motion.div>
                )}
              </AnimatePresence>

              <OutputConsole lines={s4Filtered.length ? s4Filtered.map(d => `${d.Name}  ${d.Age}  ${d.Score}`) : ["No rows match the filter."]} />
            </div>
          </div>
        </section>

        {/* ═══ FINAL SANDBOX ═══ */}
        <section className="pt-12 border-t border-slate-200 mt-12 pb-24">
          <div className="text-center space-y-2 mb-8">
            <h2 className="text-3xl font-black text-slate-800">Final Sandbox</h2>
            <p className="text-slate-500">Experiment with NumPy arrays and Pandas DataFrames.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 flex flex-col overflow-hidden">
              <div className="bg-slate-50 border-b border-slate-100 px-4 py-3 font-bold text-xs uppercase tracking-widest text-slate-500 flex justify-between items-center">
                <span>Data Analysis Editor</span>
                <button onClick={runFinal} className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white px-4 py-1.5 rounded-lg flex items-center gap-2 transition-all shadow-sm">
                  <PlayCircle className="size-4" /> Run Code
                </button>
              </div>
              <div className="p-6">
                <textarea
                  value={fsCode}
                  onChange={(e) => setFsCode(e.target.value)}
                  className="w-full h-48 bg-blue-50/30 border border-blue-100 rounded-xl p-4 font-mono text-slate-700 outline-none focus:border-blue-400 focus:bg-blue-50/50 resize-none leading-loose text-sm"
                  spellCheck={false}
                />
                <div className="flex flex-wrap gap-2 mt-4">
                  {[
                    { l: "Array Stats", c: "import numpy as np\n\narr = np.array([10, 20, 30, 40, 50])\nprint(np.mean(arr))\nprint(np.median(arr))\nprint(np.std(arr))" },
                    { l: "Array Math", c: "import numpy as np\n\narr = np.array([1, 2, 3, 4, 5])\nresult = arr * 10\nprint(result)" },
                  ].map((p) => (
                    <button key={p.l} onClick={() => { setFsCode(p.c); setFsOut([]); }}
                      className="px-3 py-1.5 rounded-lg border border-slate-200 hover:border-blue-400 bg-white font-mono text-xs hover:bg-blue-50 transition-all">{p.l}</button>
                  ))}
                </div>
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
