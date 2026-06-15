import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PlayCircle, RotateCcw, Lightbulb, Box, FileCode, Search, RefreshCw, Zap, FolderTree, Package, ArrowDown } from "lucide-react";

/* ─── Reusable UI Atoms ─── */
const SectionTitle = ({ num, title }: { num: number; title: string }) => (
  <div className="flex items-center gap-4 mb-6 mt-16 first:mt-0">
    <div className="size-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 text-white font-bold flex items-center justify-center shadow-md text-sm">{num}</div>
    <h2 className="text-2xl font-bold text-slate-800">{title}</h2>
  </div>
);

const OutputConsole = ({ lines, label, isError }: { lines: string[]; label?: string; isError?: boolean }) => (
  <div className="bg-slate-800 rounded-2xl shadow-sm border border-slate-700 p-6 font-mono">
    <h3 className="font-bold text-slate-400 uppercase tracking-widest text-[10px] mb-3 font-sans">{label || "Output Console"}</h3>
    <div className={`text-[15px] space-y-0.5 max-h-48 overflow-y-auto ${isError ? "text-red-400 font-bold" : "text-emerald-400"}`}>
      {lines.length > 0 ? lines.map((l, i) => <div key={i}>{l}</div>) : <span className="text-slate-600 italic">No output yet...</span>}
    </div>
  </div>
);

const Hint = ({ text, show }: { text: string; show: boolean }) =>
  show ? (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-xl p-4 text-sm text-blue-800 flex items-start gap-3">
      <Lightbulb className="size-5 text-blue-500 flex-shrink-0 mt-0.5" />
      <span>{text}</span>
    </motion.div>
  ) : null;

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

const NamespaceNode = ({ name, items, prefix="" }: { name: string, items: string[], prefix?: string }) => (
  <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 font-mono text-sm">
    <div className="font-bold text-blue-700 mb-2 flex items-center gap-2"><Box className="size-4" /> {name}</div>
    <div className="space-y-1 pl-2 border-l-2 border-slate-200 ml-2">
      {items.map((item, i) => (
        <div key={i} className="text-slate-600 flex items-center gap-2">
          <span className="text-slate-400">├─</span> {prefix}{item}
        </div>
      ))}
    </div>
  </div>
);

/* ═══════════════════════ MAIN COMPONENT ═══════════════════════ */

export function PythonModulesPlayground({ expId }: { expId: string }) {

  /* ── SECTION 1: Import Explorer ── */
  const [s1Style, setS1Style] = useState<"standard" | "from" | "alias">("standard");

  /* ── SECTION 2: Math Module ── */
  const [s2Func, setS2Func] = useState<"sqrt" | "factorial" | "pi">("sqrt");
  const [s2Radius, setS2Radius] = useState("7");
  const s2RadiusNum = isNaN(Number(s2Radius)) ? 0 : Number(s2Radius);
  const s2Area = (Math.PI * s2RadiusNum ** 2).toFixed(2);

  /* ── SECTION 3: Random Module ── */
  const [s3Func, setS3Func] = useState<"random" | "randint" | "choice">("randint");
  const [s3Out, setS3Out] = useState<string[]>([]);
  const runS3 = () => {
    let res = "";
    if (s3Func === "random") res = Math.random().toFixed(4);
    else if (s3Func === "randint") res = Math.floor(Math.random() * 10) + 1 + "";
    else res = ["Apple", "Banana", "Mango"][Math.floor(Math.random() * 3)];
    setS3Out(prev => [res, ...prev].slice(0, 5));
  };

  /* ── SECTION 4: Aliases & Pollution ── */
  const [s4PollutionChoice, setS4PollutionChoice] = useState<"faster"|"pollution"|"syntax"|null>(null);

  /* ── SECTION 5: Packages & Challenges ── */
  const [s5bGen, setS5bGen] = useState<string>("");
  const [s5cBlank, setS5cBlank] = useState<string>("import");

  /* ── FINAL SANDBOX ── */
  const [fsCode, setFsCode] = useState("import math\nimport random\n\nprint(math.sqrt(16))\nprint(random.randint(1, 10))");
  const [fsOut, setFsOut] = useState<string[]>([]);
  const [fsMem, setFsMem] = useState<{v: string, val: string}[]>([]);

  const runFinal = () => {
    let output: string[] = [];
    let mem: {v: string, val: string}[] = [];
    let namespaces: Record<string, any> = {};

    try {
      const lines = fsCode.split('\n');
      let vars: Record<string, any> = {};

      lines.forEach(line => {
        let trimmed = line.trim();
        if (!trimmed) return;

        // Import handling
        const impMatch = trimmed.match(/^import\s+(\w+)(?:\s+as\s+(\w+))?$/);
        if (impMatch) {
          const mod = impMatch[1];
          const alias = impMatch[2] || mod;
          namespaces[alias] = mod;
          return;
        }
        
        const fromMatch = trimmed.match(/^from\s+(\w+)\s+import\s+([\w,\s]+|\*)$/);
        if (fromMatch) {
          const mod = fromMatch[1];
          const items = fromMatch[2];
          if (items === '*') {
            namespaces['*'] = mod;
          } else {
            items.split(',').forEach(item => {
               const iName = item.trim();
               namespaces[iName] = `${mod}.${iName}`;
            });
          }
          return;
        }

        // basic assignments
        const assignMatch = trimmed.match(/^([a-zA-Z_]\w*)\s*=\s*(.+)$/);
        if (assignMatch) {
           vars[assignMatch[1]] = assignMatch[2];
           mem.push({v: assignMatch[1], val: assignMatch[2]});
        }

        // Print handling with extremely basic eval simulation for math/random
        const printMatch = trimmed.match(/^print\((.+)\)$/);
        if (printMatch) {
          let expr = printMatch[1].trim();
          
          if (expr.includes('math.sqrt(')) {
             const numMatch = expr.match(/math\.sqrt\((.+)\)/);
             if (numMatch) {
                const num = Number(vars[numMatch[1]] !== undefined ? vars[numMatch[1]] : numMatch[1]);
                output.push(String(Math.sqrt(num)));
             }
          } else if (expr.includes('math.factorial(')) {
             const numMatch = expr.match(/math\.factorial\((.+)\)/);
             if (numMatch) {
                const num = Number(vars[numMatch[1]] !== undefined ? vars[numMatch[1]] : numMatch[1]);
                let f = 1; for(let i=2; i<=num; i++) f*=i;
                output.push(String(f));
             }
          } else if (expr.includes('random.randint(')) {
             output.push(String(Math.floor(Math.random() * 10) + 1));
          } else if (expr === 'math.pi') {
             output.push(String(Math.PI));
          } else {
             if (vars[expr] !== undefined) output.push(vars[expr]);
             else output.push(expr.replace(/^['"]|['"]$/g, ''));
          }
        }
      });
    } catch (e) {
      output.push("Simulation Error");
    }

    setFsOut(output.length ? output : ["(No output)"]);
    setFsMem(mem);
  };

  return (
    <div className="bg-slate-50 min-h-screen text-slate-800 font-sans p-8 md:p-12 overflow-y-auto">
      <div className="max-w-5xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center space-y-4 mb-16 relative">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-32 bg-gradient-to-r from-blue-400/20 to-purple-400/20 blur-3xl pointer-events-none rounded-full" />
          <h1 className="text-4xl md:text-5xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-purple-700 relative z-10">
            Python Modules & Packages Playground
          </h1>
          <p className="text-lg text-slate-500 font-medium">Interactive Namespace & Import Visualizer</p>
        </div>

        {/* ═══ SECTION 1: Import Explorer ═══ */}
        <section>
          <SectionTitle num={1} title="Import Explorer" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 flex flex-col gap-5">
              <div>
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2 block">Import Style Switcher</label>
                <div className="flex flex-col gap-2">
                  <button onClick={() => setS1Style("standard")} className={`p-3 rounded-xl border-2 font-mono text-sm text-left transition-all ${s1Style === "standard" ? "bg-blue-50 border-blue-400 text-blue-700 font-bold" : "bg-white border-slate-200 text-slate-600"}`}>
                    <span className="text-blue-600">import</span> math
                  </button>
                  <button onClick={() => setS1Style("from")} className={`p-3 rounded-xl border-2 font-mono text-sm text-left transition-all ${s1Style === "from" ? "bg-emerald-50 border-emerald-400 text-emerald-700 font-bold" : "bg-white border-slate-200 text-slate-600"}`}>
                    <span className="text-blue-600">from</span> math <span className="text-blue-600">import</span> sqrt
                  </button>
                  <button onClick={() => setS1Style("alias")} className={`p-3 rounded-xl border-2 font-mono text-sm text-left transition-all ${s1Style === "alias" ? "bg-purple-50 border-purple-400 text-purple-700 font-bold" : "bg-white border-slate-200 text-slate-600"}`}>
                    <span className="text-blue-600">import</span> math <span className="text-blue-600">as</span> m
                  </button>
                </div>
              </div>

              <div className="bg-slate-800 p-5 rounded-xl border border-slate-700 font-mono text-emerald-400">
                {s1Style === "standard" && <div><span className="text-blue-400">print</span>(math.sqrt(<span className="text-amber-400">25</span>)) <span className="text-slate-500"># Output: 5.0</span></div>}
                {s1Style === "from" && <div><span className="text-blue-400">print</span>(sqrt(<span className="text-amber-400">25</span>)) <span className="text-slate-500"># Output: 5.0</span></div>}
                {s1Style === "alias" && <div><span className="text-blue-400">print</span>(m.sqrt(<span className="text-amber-400">25</span>)) <span className="text-slate-500"># Output: 5.0</span></div>}
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 h-full flex flex-col">
                <h3 className="font-bold text-slate-600 uppercase tracking-widest text-xs mb-4">Namespace Panel</h3>
                <div className="flex-1 flex items-center justify-center">
                  <AnimatePresence mode="wait">
                    <motion.div key={s1Style} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                      {s1Style === "standard" && <NamespaceNode name="math" items={["sqrt()", "factorial()", "pi"]} />}
                      {s1Style === "from" && <NamespaceNode name="Global Namespace" items={["sqrt()"]} />}
                      {s1Style === "alias" && <NamespaceNode name="m" items={["sqrt()", "factorial()", "pi"]} />}
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ═══ SECTION 2: Math Module ═══ */}
        <section>
          <SectionTitle num={2} title="Math Module Playground" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 flex flex-col gap-5">
              <div className="bg-blue-50/50 p-5 rounded-xl border border-blue-100 leading-loose text-slate-700">
                <CL indent={0}><span className="text-blue-600 font-bold">import</span> math</CL>
                <CL indent={0}><span className="text-blue-600">print</span>(math.{s2Func}({s2Func === 'sqrt' ? '81' : s2Func === 'factorial' ? '5' : ''}))</CL>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2 block">Function Selector</label>
                <div className="flex gap-2">
                  {(["sqrt", "factorial", "pi"] as const).map(f => (
                    <button key={f} onClick={() => setS2Func(f)}
                      className={`px-4 py-2 rounded-xl font-mono text-sm border-2 transition-all font-bold ${s2Func === f ? "bg-blue-500 text-white border-blue-500" : "bg-white border-slate-200 text-slate-600 hover:border-blue-300"}`}>
                      {f}{f !== 'pi' && '()'}
                    </button>
                  ))}
                </div>
              </div>

              <OutputConsole lines={[
                s2Func === 'sqrt' ? "9.0" : s2Func === 'factorial' ? "120" : "3.141592653589793"
              ]} />
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 flex flex-col gap-4">
              <h3 className="font-bold text-purple-500 uppercase tracking-widest text-xs">Challenge: Circle Area</h3>
              <div className="bg-purple-50/50 p-4 rounded-xl border border-purple-100 font-mono text-sm text-slate-700">
                <span className="text-purple-600">radius</span> = <input type="text" value={s2Radius} onChange={(e) => setS2Radius(e.target.value)} className="w-12 bg-transparent border-b border-purple-300 outline-none text-amber-600 text-center mx-1" /><br/>
                <span className="text-purple-600">area</span> = math.pi * radius ** <span className="text-amber-600">2</span><br/>
                <span className="text-blue-600">print</span>(<span className="text-blue-600">round</span>(area, <span className="text-amber-600">2</span>))
              </div>
              <div className="mt-auto p-3 rounded-xl border-2 bg-purple-50 border-purple-200 text-purple-700 font-bold text-center font-mono">
                Output: {s2Area}
              </div>
            </div>
          </div>
        </section>

        {/* ═══ SECTION 3: Random Module ═══ */}
        <section>
          <SectionTitle num={3} title="Random Module Playground" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 flex flex-col gap-5">
              <div className="bg-blue-50/50 p-5 rounded-xl border border-blue-100 leading-loose text-slate-700">
                <CL indent={0}><span className="text-blue-600 font-bold">import</span> random</CL>
                <div className="h-2"/>
                {s3Func === "random" && <CL indent={0}><span className="text-blue-600">print</span>(random.random())</CL>}
                {s3Func === "randint" && <CL indent={0}><span className="text-blue-600">print</span>(random.randint(<span className="text-amber-600">1</span>, <span className="text-amber-600">10</span>))</CL>}
                {s3Func === "choice" && <CL indent={0}><span className="text-blue-600">print</span>(random.choice([<span className="text-amber-600">"Apple"</span>, <span className="text-amber-600">"Banana"</span>, <span className="text-amber-600">"Mango"</span>]))</CL>}
              </div>

              <div className="flex flex-wrap gap-2">
                {(["random", "randint", "choice"] as const).map(f => (
                  <button key={f} onClick={() => {setS3Func(f); setS3Out([]);}}
                    className={`px-4 py-2 rounded-xl font-mono text-sm border-2 transition-all font-bold ${s3Func === f ? "bg-emerald-500 text-white border-emerald-500" : "bg-white border-slate-200 text-slate-600 hover:border-emerald-300"}`}>
                    {f}()
                  </button>
                ))}
              </div>
              <RunButton onClick={runS3} label="Run Multiple Times" icon={RefreshCw} />
            </div>

            <div className="flex flex-col gap-4">
              <OutputConsole lines={s3Out.length ? s3Out : ["Click run to generate values..."]} />
              <Hint show text={
                s3Func === "random" ? "random() generates a float between 0.0 and 1.0." :
                s3Func === "randint" ? "randint(a, b) returns a random integer N such that a <= N <= b." :
                "choice(seq) returns a random element from the non-empty sequence."
              } />
            </div>
          </div>
        </section>

        {/* ═══ SECTION 4: Aliases & Pollution ═══ */}
        <section>
          <SectionTitle num={4} title="Module Aliases & Namespace Visualizer" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 flex flex-col gap-4">
              <h3 className="font-bold text-slate-600 uppercase tracking-widest text-xs mb-2">Namespace Pollution Demo</h3>
              <div className="bg-red-50 border border-red-100 p-4 rounded-xl font-mono text-sm text-slate-700">
                <span className="text-blue-600 font-bold">from</span> math <span className="text-blue-600 font-bold">import</span> *
              </div>
              
              <div className="space-y-3 mt-4">
                <label className="text-sm font-bold text-slate-700">What is the risk of using <code className="bg-slate-100 px-1 rounded">*</code> imports?</label>
                <div className="flex flex-col gap-2">
                  {[
                    { id: "faster", label: "Faster execution" },
                    { id: "pollution", label: "Namespace Pollution (Conflicts)" },
                    { id: "syntax", label: "Syntax Error" }
                  ].map(opt => (
                    <label key={opt.id} className={`flex items-center gap-3 p-3 border-2 rounded-xl cursor-pointer transition-all ${s4PollutionChoice === opt.id ? "border-red-500 bg-red-50" : "border-slate-200 hover:bg-slate-50"}`}>
                      <input type="radio" name="poll" checked={s4PollutionChoice === opt.id} onChange={() => setS4PollutionChoice(opt.id as any)} className="w-4 h-4 text-red-600" />
                      <span className="font-medium text-slate-700">{opt.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {s4PollutionChoice === "pollution" && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-4 bg-red-50 border-2 border-red-200 p-4 rounded-xl text-red-700 text-sm font-bold flex items-start gap-3">
                  <Zap className="size-5 flex-shrink-0" />
                  Too many imported names can create conflicts with your own variables or functions! Avoid wildcard (*) imports.
                </motion.div>
              )}
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 flex flex-col gap-4">
              <h3 className="font-bold text-slate-600 uppercase tracking-widest text-xs mb-2">Comparison Activity</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-center font-mono text-sm space-y-2">
                  <div className="font-bold text-blue-600 border-b border-slate-200 pb-2">import math</div>
                  <div className="text-slate-600">math.sqrt(16)</div>
                </div>
                <div className="bg-purple-50 p-4 rounded-xl border border-purple-200 text-center font-mono text-sm space-y-2">
                  <div className="font-bold text-purple-600 border-b border-purple-200 pb-2">import math as m</div>
                  <div className="text-slate-600">m.sqrt(16)</div>
                </div>
              </div>
              <Hint show text="Aliases ('as') save typing for long module names and help avoid naming conflicts." />
            </div>
          </div>
        </section>

        {/* ═══ SECTION 5: Packages & Mini Challenges ═══ */}
        <section>
          <SectionTitle num={5} title="Packages & Mini Challenges" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Part A: Package Visualizer */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 flex flex-col gap-4 md:col-span-2">
              <h3 className="font-bold text-blue-500 uppercase tracking-widest text-xs">Part A: Package Visualizer</h3>
              <div className="flex gap-6 h-full items-center">
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 font-mono text-sm space-y-1 flex-1">
                  <div className="font-bold text-blue-800 flex items-center gap-2"><FolderTree className="size-4" /> my_package/</div>
                  <div className="pl-4 border-l-2 border-slate-200 ml-2 space-y-1 mt-1 text-slate-600">
                    <div className="flex items-center gap-2">├─ <FileCode className="size-3 text-slate-400"/> __init__.py</div>
                    <div className="flex items-center gap-2">├─ <FileCode className="size-3 text-slate-400"/> math_utils.py</div>
                    <div className="flex items-center gap-2">└─ <FileCode className="size-3 text-slate-400"/> string_utils.py</div>
                  </div>
                </div>
                <div className="flex-1 space-y-3 font-mono text-sm">
                  <div className="bg-blue-50 border border-blue-100 p-3 rounded-lg text-blue-800 text-center font-bold">
                    import my_package.math_utils
                  </div>
                  <div className="flex flex-col items-center gap-1 text-xs text-slate-500">
                    <div className="bg-slate-100 px-3 py-1 rounded-full border border-slate-200 flex items-center gap-1"><Package className="size-3"/> Package</div>
                    <ArrowDown className="size-3 text-slate-300" />
                    <div className="bg-slate-100 px-3 py-1 rounded-full border border-slate-200 flex items-center gap-1"><FileCode className="size-3"/> Module</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-6">
              {/* Part B: Guessing Game */}
              <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 flex flex-col gap-3">
                <h3 className="font-bold text-purple-500 uppercase tracking-widest text-xs">Part B: Game Gen</h3>
                <div className="bg-blue-50/50 p-3 rounded-xl border border-blue-100 font-mono text-xs text-slate-700">
                  <span className="text-purple-600">secret</span> = random.randint(<span className="text-amber-600">1</span>,<span className="text-amber-600">100</span>)
                </div>
                <button onClick={() => setS5bGen("Secret Number Generated: " + (Math.floor(Math.random() * 100) + 1))} className="w-full py-2 bg-purple-100 hover:bg-purple-200 text-purple-700 font-bold rounded-lg text-sm transition-all border border-purple-200">
                  Generate Number
                </button>
                {s5bGen && <div className="text-center font-mono text-xs font-bold text-emerald-600 bg-emerald-50 py-1.5 rounded border border-emerald-200">{s5bGen}</div>}
              </div>

              {/* Part C: Import Challenge */}
              <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 flex flex-col gap-3 h-full">
                <h3 className="font-bold text-emerald-500 uppercase tracking-widest text-xs">Part C: Challenge</h3>
                <div className="bg-blue-50/50 p-3 rounded-xl border border-blue-100 font-mono text-xs text-slate-700">
                  <span className="font-bold border-b-2 border-slate-400 text-blue-600 px-1">{s5cBlank === 'import' ? 'import' : '_____'}</span> math<br/>
                  <span className="text-blue-600">print</span>(math.factorial(<span className="text-amber-600">4</span>))
                </div>
                <div className="flex gap-2">
                  {["import", "include", "using"].map(w => (
                    <button key={w} onClick={() => setS5cBlank(w)} className={`flex-1 py-1 text-xs font-mono rounded border ${s5cBlank === w ? "bg-emerald-100 border-emerald-300 text-emerald-700 font-bold" : "bg-slate-50 border-slate-200 text-slate-500"}`}>{w}</button>
                  ))}
                </div>
                {s5cBlank === 'import' && <div className="mt-auto text-center font-mono text-xs font-bold text-emerald-600 bg-emerald-50 py-1.5 rounded border border-emerald-200">Output: 24</div>}
              </div>
            </div>
          </div>
        </section>

        {/* ═══ FINAL SANDBOX ═══ */}
        <section className="pt-12 border-t border-slate-200 mt-12 pb-24">
          <div className="text-center space-y-2 mb-8">
            <h2 className="text-3xl font-black text-slate-800">Final Sandbox</h2>
            <p className="text-slate-500">Experiment with math, random, and different import styles.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 flex flex-col overflow-hidden">
              <div className="bg-slate-50 border-b border-slate-100 px-4 py-3 font-bold text-xs uppercase tracking-widest text-slate-500 flex justify-between items-center">
                <span>Module Editor</span>
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
              </div>
            </div>

            <div className="flex flex-col gap-6">
              <div className="bg-slate-800 rounded-2xl shadow-lg border border-slate-700 flex flex-col overflow-hidden h-full">
                <div className="bg-slate-900 border-b border-slate-700 px-4 py-3 font-bold text-xs uppercase tracking-widest text-slate-400">
                  Output Console
                </div>
                <div className="p-6 font-mono text-emerald-400 space-y-1 text-sm">
                  {fsOut.length > 0 ? fsOut.map((l, i) => <div key={i}>{l}</div>) : <div className="text-slate-600 italic">Click Run Code...</div>}
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
