import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PlayCircle, RotateCcw, Lightbulb, Database, Plus, Trash2, Edit2, Layers, Key } from "lucide-react";

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

const RunButton = ({ onClick, label }: { onClick: () => void; label?: string }) => (
  <button onClick={onClick}
    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white px-6 py-2.5 rounded-xl flex items-center gap-2 transition-all shadow-md hover:shadow-lg font-semibold text-sm w-fit">
    <PlayCircle className="size-4" /> {label || "Run Code"}
  </button>
);

const CollectionVisualizer = ({ type, data, title }: { type: 'list' | 'tuple' | 'set' | 'dict', data: any, title: string }) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 overflow-hidden">
      <h3 className="font-bold text-slate-600 uppercase tracking-widest text-xs mb-4 flex items-center gap-2">
        <Database className="size-3.5" /> {title} ({type})
      </h3>
      <div className="font-mono text-sm max-h-48 overflow-y-auto">
        {(type === 'list' || type === 'tuple') && (
          <div className="space-y-1">
            {data.map((item: any, i: number) => (
              <motion.div key={`${item}-${i}`} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="flex items-center gap-3 p-2 bg-blue-50 rounded-lg border border-blue-100">
                <span className="text-slate-400 font-bold w-4">{i}</span>
                <span className="text-slate-400">→</span>
                <span className="text-blue-700 font-bold bg-white px-2 py-0.5 rounded border border-blue-200">
                  {typeof item === 'string' ? `'${item}'` : item}
                </span>
              </motion.div>
            ))}
            {data.length === 0 && <span className="text-slate-400 italic">Empty {type}</span>}
          </div>
        )}
        {type === 'set' && (
          <div className="flex flex-wrap gap-2">
            {data.map((item: any, i: number) => (
              <motion.div key={`${item}-${i}`} initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-purple-50 border border-purple-200 text-purple-700 font-bold px-3 py-1.5 rounded-full shadow-sm">
                {typeof item === 'string' ? `'${item}'` : item}
              </motion.div>
            ))}
            {data.length === 0 && <span className="text-slate-400 italic">Empty set</span>}
          </div>
        )}
        {type === 'dict' && (
          <div className="space-y-1.5">
            {Object.entries(data).map(([k, v], i) => (
              <motion.div key={k} initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-3 p-2.5 bg-emerald-50 rounded-lg border border-emerald-100">
                <span className="text-emerald-700 font-bold bg-white px-2 py-0.5 rounded border border-emerald-200 flex items-center gap-1">
                  <Key className="size-3 text-emerald-400" /> {typeof k === 'string' && isNaN(Number(k)) ? `'${k}'` : k}
                </span>
                <span className="text-slate-400">→</span>
                <span className="text-slate-700 font-bold">{typeof v === 'string' ? `'${v}'` : String(v)}</span>
              </motion.div>
            ))}
            {Object.keys(data).length === 0 && <span className="text-slate-400 italic">Empty dict</span>}
          </div>
        )}
      </div>
    </div>
  );
};

/* ═══════════════════════ MAIN COMPONENT ═══════════════════════ */

export function PythonCollectionsPlayground({ expId }: { expId: string }) {

  /* ── SECTION 1: List Playground ── */
  const [s1List, setS1List] = useState<string[]>(["Apple", "Banana"]);
  const [s1Out, setS1Out] = useState<string>("");
  const [s1Active, setS1Active] = useState<string>("");

  const runS1Init = () => { setS1List(["Apple", "Banana"]); setS1Out("['Apple', 'Banana']"); setS1Active("init"); };
  const runS1Append = () => { const l = [...s1List, "Orange"]; setS1List(l); setS1Out(`['${l.join("', '")}']`); setS1Active("append"); };
  const runS1Insert = () => { const l = [...s1List]; l.splice(1, 0, "Grapes"); setS1List(l); setS1Out(`['${l.join("', '")}']`); setS1Active("insert"); };
  const runS1Pop = () => { const l = [...s1List]; l.pop(); setS1List(l); setS1Out(`['${l.join("', '")}']`); setS1Active("pop"); };
  const runS1Remove = () => { const l = s1List.filter(f => f !== "Banana"); setS1List(l); setS1Out(`['${l.join("', '")}']`); setS1Active("remove"); };

  useEffect(() => { runS1Init(); }, []);

  /* ── SECTION 2: Tuple Explorer ── */
  const s2Tup = [10, 20, 30];
  const [s2Choice, setS2Choice] = useState<"works" | "error" | "new" | null>(null);
  const [s2Ran, setS2Ran] = useState(false);

  /* ── SECTION 3: Set Operations ── */
  const [s3Op, setS3Op] = useState<"union" | "intersect" | "diff">("union");
  const s3A = [1, 2, 3, 4];
  const s3B = [3, 4, 5, 6];
  const getS3Res = () => {
    if (s3Op === "union") return [1, 2, 3, 4, 5, 6];
    if (s3Op === "intersect") return [3, 4];
    return [1, 2];
  };

  /* ── SECTION 4: Dict Playground ── */
  const [s4Dict, setS4Dict] = useState<Record<string, any>>({ name: "Alice", age: 20 });
  const [s4Active, setS4Active] = useState("");
  const [s4Iter, setS4Iter] = useState(false);
  
  const runS4Init = () => { setS4Dict({ name: "Alice", age: 20 }); setS4Active("init"); setS4Iter(false); };
  const runS4Add = () => { setS4Dict(d => ({ ...d, city: "Mumbai" })); setS4Active("add"); setS4Iter(false); };
  const runS4Update = () => { setS4Dict(d => ({ ...d, age: 21 })); setS4Active("update"); setS4Iter(false); };
  const runS4Iter = () => { setS4Iter(true); setS4Active("iter"); };

  useEffect(() => { runS4Init(); }, []);

  /* ── SECTION 5: Challenges ── */
  const s5aList = [1, 2, 2, 3, 3, 4, 5];
  const s5aRes = [1, 2, 3, 4, 5];
  const [s5aRan, setS5aRan] = useState(false);

  const [s5bOp, setS5bOp] = useState<"union" | "intersect" | "diff">("union");
  const s5bA = ["Alice", "Bob", "Charlie"];
  const s5bB = ["Bob", "David", "Charlie"];
  const getS5bRes = () => {
    if (s5bOp === "union") return ["Alice", "Bob", "Charlie", "David"];
    if (s5bOp === "intersect") return ["Bob", "Charlie"];
    return ["Alice"];
  };

  const s5cDict = { name: "Alice", age: 20, city: "Mumbai" };
  const [s5cIter, setS5cIter] = useState(0);
  
  /* ── FINAL SANDBOX ── */
  const [fpCode, setFpCode] = useState("my_list = [1, 2, 3]\nmy_list.append(4)\nprint(my_list)");
  const [fpOut, setFpOut] = useState<string[]>([]);

  const runFinal = () => {
    let output: string[] = [];
    try {
      const lines = fpCode.split('\n');
      let vars: Record<string, any> = {};
      
      lines.forEach(line => {
        line = line.trim();
        if (!line) return;
        
        // very basic assignment parsing for demo
        const assignMatch = line.match(/^([a-zA-Z_]\w*)\s*=\s*(.+)$/);
        if (assignMatch) {
          const vname = assignMatch[1];
          let expr = assignMatch[2];
          
          if (expr.startsWith('[') && expr.endsWith(']')) {
            vars[vname] = expr.slice(1, -1).split(',').map(s => s.trim().replace(/^['"]|['"]$/g, '')).filter(Boolean);
            vars[vname]._type = 'list';
          } else if (expr.startsWith('{') && expr.endsWith('}')) {
             if (expr.includes(':')) {
                // dict
                vars[vname] = {};
                expr.slice(1, -1).split(',').forEach(pair => {
                   if (!pair.trim()) return;
                   let [k, v] = pair.split(':').map(s => s.trim());
                   k = k.replace(/^['"]|['"]$/g, '');
                   v = v.replace(/^['"]|['"]$/g, '');
                   vars[vname][k] = v;
                });
                vars[vname]._type = 'dict';
             } else {
                // set
                vars[vname] = Array.from(new Set(expr.slice(1, -1).split(',').map(s => s.trim().replace(/^['"]|['"]$/g, '')).filter(Boolean)));
                vars[vname]._type = 'set';
             }
          } else if (expr.startsWith('(') && expr.endsWith(')')) {
            vars[vname] = expr.slice(1, -1).split(',').map(s => s.trim().replace(/^['"]|['"]$/g, '')).filter(Boolean);
            vars[vname]._type = 'tuple';
          } else {
            vars[vname] = expr.replace(/^['"]|['"]$/g, '');
          }
        }
        
        // method calls
        const methodMatch = line.match(/^([a-zA-Z_]\w*)\.(append|remove|pop|insert)\((.*?)\)$/);
        if (methodMatch && vars[methodMatch[1]] && vars[methodMatch[1]]._type === 'list') {
           const v = vars[methodMatch[1]];
           const method = methodMatch[2];
           const arg = methodMatch[3].replace(/^['"]|['"]$/g, '');
           if (method === 'append') v.push(arg);
           if (method === 'remove') {
             const idx = v.indexOf(arg);
             if (idx > -1) v.splice(idx, 1);
           }
           if (method === 'pop') v.pop();
        }

        // print
        const printMatch = line.match(/^print\((.+)\)$/);
        if (printMatch) {
          let expr = printMatch[1].trim();
          if (vars[expr]) {
             if (vars[expr]._type === 'list') output.push(`[${vars[expr].map((x:any) => typeof x === 'string' && isNaN(Number(x)) ? `'${x}'` : x).join(', ')}]`);
             else if (vars[expr]._type === 'dict') output.push(`{${Object.entries(vars[expr]).filter(([k])=>k!=='_type').map(([k,v]) => `'${k}': '${v}'`).join(', ')}}`);
             else if (vars[expr]._type === 'set') output.push(`{${vars[expr].map((x:any) => typeof x === 'string' && isNaN(Number(x)) ? `'${x}'` : x).join(', ')}}`);
             else if (vars[expr]._type === 'tuple') output.push(`(${vars[expr].map((x:any) => typeof x === 'string' && isNaN(Number(x)) ? `'${x}'` : x).join(', ')})`);
             else output.push(String(vars[expr]));
          } else {
            output.push(expr);
          }
        }
      });
    } catch (e) {
      output.push("Syntax Error");
    }
    
    setFpOut(output.length ? output : ["(No output)"]);
  };

  return (
    <div className="bg-slate-50 min-h-screen text-slate-800 font-sans p-8 md:p-12 overflow-y-auto">
      <div className="max-w-5xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center space-y-4 mb-16 relative">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-32 bg-gradient-to-r from-blue-400/20 to-purple-400/20 blur-3xl pointer-events-none rounded-full" />
          <h1 className="text-4xl md:text-5xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-purple-700 relative z-10">
            Python Collections Playground
          </h1>
          <p className="text-lg text-slate-500 font-medium">Interactive Coding Lab</p>
        </div>

        {/* ═══ SECTION 1: List Playground ═══ */}
        <section>
          <SectionTitle num={1} title="List Playground" />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 flex flex-col gap-4">
              <h3 className="font-bold text-slate-600 uppercase tracking-widest text-xs">Interactive Code</h3>
              <div className="bg-blue-50/50 p-5 rounded-xl border border-blue-100 leading-loose text-slate-700">
                <CL indent={0} active={s1Active === "init"}><span className="text-purple-600">fruits</span> = [<span className="text-amber-600">"Apple"</span>, <span className="text-amber-600">"Banana"</span>]</CL>
                <div className="h-2" />
                <CL indent={0} active={s1Active === "append"}><span className="text-purple-600">fruits</span>.append(<span className="text-amber-600">"Orange"</span>)</CL>
                <CL indent={0} active={s1Active === "insert"}><span className="text-purple-600">fruits</span>.insert(<span className="text-amber-600">1</span>, <span className="text-amber-600">"Grapes"</span>)</CL>
                <CL indent={0} active={s1Active === "pop"}><span className="text-purple-600">fruits</span>.pop()</CL>
                <CL indent={0} active={s1Active === "remove"}><span className="text-purple-600">fruits</span>.remove(<span className="text-amber-600">"Banana"</span>)</CL>
                <div className="h-2" />
                <CL indent={0}><span className="text-blue-600">print</span>(fruits)</CL>
              </div>
              <div className="flex flex-wrap gap-2">
                <button onClick={runS1Append} className="px-3 py-1.5 rounded-lg border border-slate-200 hover:border-blue-400 bg-white font-mono text-xs hover:bg-blue-50 transition-all flex items-center gap-1"><Plus className="size-3.5"/> append("Orange")</button>
                <button onClick={runS1Insert} className="px-3 py-1.5 rounded-lg border border-slate-200 hover:border-blue-400 bg-white font-mono text-xs hover:bg-blue-50 transition-all flex items-center gap-1"><Edit2 className="size-3.5"/> insert(1, "Grapes")</button>
                <button onClick={runS1Pop} className="px-3 py-1.5 rounded-lg border border-slate-200 hover:border-blue-400 bg-white font-mono text-xs hover:bg-blue-50 transition-all flex items-center gap-1"><Trash2 className="size-3.5"/> pop()</button>
                <button onClick={runS1Remove} className="px-3 py-1.5 rounded-lg border border-slate-200 hover:border-blue-400 bg-white font-mono text-xs hover:bg-blue-50 transition-all flex items-center gap-1"><Trash2 className="size-3.5"/> remove("Banana")</button>
                <button onClick={runS1Init} className="px-3 py-1.5 rounded-lg border border-slate-200 bg-slate-50 font-mono text-xs hover:bg-slate-100 transition-all flex items-center gap-1"><RotateCcw className="size-3.5"/> Reset</button>
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <CollectionVisualizer type="list" data={s1List} title="List: fruits" />
              <OutputConsole lines={[s1Out]} />
              <Hint show text="Lists are ordered, mutable, and allow duplicate values. Use append to add to the end, insert to add at a specific index." />
            </div>
          </div>
        </section>

        {/* ═══ SECTION 2: Tuple Explorer ═══ */}
        <section>
          <SectionTitle num={2} title="Tuple Explorer" />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 flex flex-col gap-5">
              <div className="bg-blue-50/50 p-5 rounded-xl border border-blue-100 leading-loose text-slate-700">
                <CL indent={0}><span className="text-purple-600">data</span> = (<span className="text-amber-600">10</span>, <span className="text-amber-600">20</span>, <span className="text-amber-600">30</span>)</CL>
                <CL indent={0}><span className="text-blue-600">print</span>(data[<span className="text-amber-600">1</span>]) <span className="text-slate-400"># Output: 20</span></CL>
                <div className="h-4" />
                <CL indent={0} active={s2Ran}><span className="text-purple-600">data</span>[<span className="text-amber-600">1</span>] = <span className="text-amber-600">50</span></CL>
              </div>
              
              {!s2Ran ? (
                <div className="space-y-3">
                  <label className="text-sm font-bold text-slate-700">What happens when we reassign data[1]? </label>
                  <div className="flex flex-col gap-2">
                    {[
                      { id: "works", label: "Tuple updates (20 becomes 50)" },
                      { id: "new", label: "A new tuple is created" },
                      { id: "error", label: "TypeError" }
                    ].map(opt => (
                      <label key={opt.id} className={`flex items-center gap-3 p-3 border-2 rounded-xl cursor-pointer transition-all ${s2Choice === opt.id ? "border-blue-500 bg-blue-50" : "border-slate-200 hover:bg-slate-50"}`}>
                        <input type="radio" name="tup" checked={s2Choice === opt.id} onChange={() => setS2Choice(opt.id as any)} className="w-4 h-4 text-blue-600" />
                        <span className="font-medium text-slate-700">{opt.label}</span>
                      </label>
                    ))}
                  </div>
                  <RunButton onClick={() => setS2Ran(true)} label="Check Answer" />
                </div>
              ) : (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                  <OutputConsole isError lines={["TypeError: 'tuple' object does not support item assignment"]} />
                  <div className="bg-red-50 border-2 border-red-200 p-4 rounded-xl text-red-700 text-sm">
                    <strong>Tuples are immutable!</strong> Once a tuple is created, its elements cannot be changed, added, or removed.
                  </div>
                  <button onClick={() => {setS2Ran(false); setS2Choice(null);}} className="text-blue-600 font-bold text-sm underline">Try again</button>
                </motion.div>
              )}
            </div>
            <div className="flex flex-col gap-4">
              <CollectionVisualizer type="tuple" data={s2Tup} title="Tuple: data" />
              <Hint show text="Use tuples when you have a collection of values that should never change throughout your program's execution." />
            </div>
          </div>
        </section>

        {/* ═══ SECTION 3: Set Operations ═══ */}
        <section>
          <SectionTitle num={3} title="Set Operations Lab" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 flex flex-col gap-5">
              <div className="bg-blue-50/50 p-5 rounded-xl border border-blue-100 leading-loose text-slate-700">
                <CL indent={0}><span className="text-purple-600">A</span> = {"{"}<span className="text-amber-600">1, 2, 3, 4</span>{"}"}</CL>
                <CL indent={0}><span className="text-purple-600">B</span> = {"{"}<span className="text-amber-600">3, 4, 5, 6</span>{"}"}</CL>
                <div className="h-4" />
                <CL indent={0}>
                  <span className="text-blue-600">print</span>(A {s3Op === 'union' ? '|' : s3Op === 'intersect' ? '&' : '-'} B)
                </CL>
              </div>
              
              <div>
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2 block">Operation</label>
                <div className="flex flex-wrap gap-2">
                  {(["union", "intersect", "diff"] as const).map((o) => (
                    <button key={o} onClick={() => setS3Op(o)}
                      className={`px-4 py-2 rounded-xl font-mono text-sm border-2 transition-all font-bold ${
                        s3Op === o ? "bg-purple-500 text-white border-purple-500 shadow-md" : "bg-white border-slate-200 text-slate-600 hover:border-purple-300"
                      }`}>
                      {o === 'union' ? 'Union (|)' : o === 'intersect' ? 'Intersection (&)' : 'Difference (-)'}
                    </button>
                  ))}
                </div>
              </div>

              <OutputConsole lines={[`{${getS3Res().join(', ')}}`]} />
            </div>

            <div className="flex flex-col gap-4">
              <CollectionVisualizer type="set" data={s3A} title="Set A" />
              <CollectionVisualizer type="set" data={s3B} title="Set B" />
              
              <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 mt-4">
                <h3 className="font-bold text-slate-600 uppercase tracking-widest text-xs mb-3">Duplicate Challenge</h3>
                <div className="bg-blue-50/50 p-3 rounded-xl border border-blue-100 font-mono text-sm mb-3">
                  <span className="text-blue-600">set</span>([<span className="text-amber-600">1, 2, 2, 3, 3, 4</span>])
                </div>
                <div className="font-mono text-emerald-600 font-bold mb-2">Output: {'{1, 2, 3, 4}'}</div>
                <div className="text-xs text-slate-500">Sets automatically remove all duplicate values! They are unordered collections of unique elements.</div>
              </div>
            </div>
          </div>
        </section>

        {/* ═══ SECTION 4: Dict Playground ═══ */}
        <section>
          <SectionTitle num={4} title="Dictionary Playground" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 flex flex-col gap-5">
              <div className="bg-blue-50/50 p-5 rounded-xl border border-blue-100 leading-loose text-slate-700">
                <CL indent={0} active={s4Active === 'init'}>
                  <span className="text-purple-600">student</span> = {"{"}
                  <span className="text-amber-600">"name"</span>: <span className="text-amber-600">"Alice"</span>, 
                  <span className="text-amber-600">"age"</span>: <span className="text-amber-600">20</span>
                  {"}"}
                </CL>
                <div className="h-2" />
                <CL indent={0} active={s4Active === 'add'}><span className="text-purple-600">student</span>[<span className="text-amber-600">"city"</span>] = <span className="text-amber-600">"Mumbai"</span></CL>
                <CL indent={0} active={s4Active === 'update'}><span className="text-purple-600">student</span>[<span className="text-amber-600">"age"</span>] = <span className="text-amber-600">21</span></CL>
                <div className="h-2" />
                <CL indent={0} active={s4Active === 'iter'}><span className="text-blue-600 font-bold">for</span> key, value <span className="text-blue-600 font-bold">in</span> student.items():</CL>
                <CL indent={1} active={s4Active === 'iter'}><span className="text-blue-600">print</span>(key, value)</CL>
              </div>
              
              <div className="flex flex-wrap gap-2">
                <button onClick={runS4Add} className="px-3 py-1.5 rounded-lg border border-slate-200 hover:border-emerald-400 bg-white font-mono text-xs hover:bg-emerald-50 transition-all font-bold">Add Key</button>
                <button onClick={runS4Update} className="px-3 py-1.5 rounded-lg border border-slate-200 hover:border-emerald-400 bg-white font-mono text-xs hover:bg-emerald-50 transition-all font-bold">Update Key</button>
                <button onClick={runS4Iter} className="px-3 py-1.5 rounded-lg border border-slate-200 hover:border-emerald-400 bg-white font-mono text-xs hover:bg-emerald-50 transition-all font-bold">Iterate (.items())</button>
                <button onClick={runS4Init} className="px-3 py-1.5 rounded-lg border border-slate-200 bg-slate-50 font-mono text-xs hover:bg-slate-100 transition-all font-bold"><RotateCcw className="size-3.5 inline"/> Reset</button>
              </div>

              {s4Iter && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                  <OutputConsole lines={Object.entries(s4Dict).map(([k,v]) => `${k} ${v}`)} />
                </motion.div>
              )}
            </div>

            <div className="flex flex-col gap-4">
              <CollectionVisualizer type="dict" data={s4Dict} title="Dictionary: student" />
              <Hint show text="Dictionaries store data in key-value pairs. Keys must be unique and immutable (like strings or numbers). Values can be anything!" />
            </div>
          </div>
        </section>

        {/* ═══ SECTION 5: Mini Challenges ═══ */}
        <section>
          <SectionTitle num={5} title="Collection Challenges" />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Challenge A */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 flex flex-col gap-4">
              <h3 className="font-bold text-blue-500 uppercase tracking-widest text-xs">A: Remove Duplicates</h3>
              <div className="bg-blue-50/50 p-4 rounded-xl border border-blue-100 font-mono text-xs text-slate-700">
                <span className="text-purple-600">nums</span> = [<span className="text-amber-600">1,2,2,3,3,4,5</span>]<br/>
                <span className="text-purple-600">result</span> = <span className="text-blue-600">sorted</span>(<span className="text-blue-600">set</span>(nums))<br/>
                <span className="text-blue-600">print</span>(result)
              </div>
              <RunButton onClick={() => setS5aRan(true)} label="Run" />
              {s5aRan && (
                <div className="mt-auto space-y-2 text-xs font-mono">
                  <div className="flex justify-between p-2 bg-slate-50 rounded"><span>List:</span> <span>[1, 2, 2, 3, 3, 4, 5]</span></div>
                  <div className="flex justify-between p-2 bg-purple-50 text-purple-700 rounded"><span>Set (Unique):</span> <span>{'{1, 2, 3, 4, 5}'}</span></div>
                  <div className="flex justify-between p-2 bg-emerald-50 text-emerald-700 font-bold rounded"><span>Sorted List:</span> <span>[1, 2, 3, 4, 5]</span></div>
                </div>
              )}
            </div>

            {/* Challenge B */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 flex flex-col gap-4">
              <h3 className="font-bold text-purple-500 uppercase tracking-widest text-xs">B: Set Operations</h3>
              <div className="text-xs font-mono space-y-1">
                <div><span className="font-bold text-slate-500">Group A:</span> {'{"Alice","Bob","Charlie"}'}</div>
                <div><span className="font-bold text-slate-500">Group B:</span> {'{"Bob","David","Charlie"}'}</div>
              </div>
              <div className="flex flex-col gap-1 mt-2">
                <select value={s5bOp} onChange={(e) => setS5bOp(e.target.value as any)} className="bg-slate-50 border-2 border-slate-200 rounded-lg p-2 font-bold text-sm outline-none focus:border-purple-400">
                  <option value="union">Union (All members)</option>
                  <option value="intersect">Intersection (Common)</option>
                  <option value="diff">Difference (Only in A)</option>
                </select>
              </div>
              <div className="mt-auto p-3 rounded-xl border-2 bg-purple-50 border-purple-200 text-purple-700 font-bold text-sm font-mono break-words">
                {`{${getS5bRes().map(s=>`'${s}'`).join(', ')}}`}
              </div>
            </div>

            {/* Challenge C */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 flex flex-col gap-4">
              <h3 className="font-bold text-emerald-500 uppercase tracking-widest text-xs">C: Dictionary Analyzer</h3>
              <div className="bg-blue-50/50 p-4 rounded-xl border border-blue-100 font-mono text-[11px] text-slate-700">
                <span className="text-blue-600 font-bold">for</span> k, v <span className="text-blue-600 font-bold">in</span> dict.items():<br/>
                &nbsp;&nbsp;<span className="text-blue-600">print</span>(k, v)
              </div>
              <RunButton onClick={() => setS5cIter(s => (s + 1) % 4)} label="Step Iteration" />
              <div className="mt-auto space-y-1 text-xs font-mono">
                {Object.entries(s5cDict).map(([k, v], i) => (
                  <div key={k} className={`flex justify-between p-2 rounded transition-all ${s5cIter > i ? "bg-emerald-50 text-emerald-700 font-bold" : "bg-slate-50 text-slate-400 opacity-50"}`}>
                    <span>{k}</span> <span>→</span> <span>{v}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </section>

        {/* ═══ FINAL SANDBOX ═══ */}
        <section className="pt-12 border-t border-slate-200 mt-12 pb-24">
          <div className="text-center space-y-2 mb-8">
            <h2 className="text-3xl font-black text-slate-800">Final Sandbox</h2>
            <p className="text-slate-500">Experiment with lists, tuples, sets, and dictionaries.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 flex flex-col overflow-hidden">
              <div className="bg-slate-50 border-b border-slate-100 px-4 py-3 font-bold text-xs uppercase tracking-widest text-slate-500 flex justify-between items-center">
                <span>Collections Editor</span>
                <button onClick={runFinal} className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white px-4 py-1.5 rounded-lg flex items-center gap-2 transition-all shadow-sm">
                  <PlayCircle className="size-4" /> Run Code
                </button>
              </div>
              <div className="p-6">
                <textarea
                  value={fpCode}
                  onChange={(e) => setFpCode(e.target.value)}
                  className="w-full h-48 bg-blue-50/30 border border-blue-100 rounded-xl p-4 font-mono text-slate-700 outline-none focus:border-blue-400 focus:bg-blue-50/50 resize-none leading-loose text-sm"
                  spellCheck={false}
                />
                
                <div className="flex flex-wrap gap-2 mt-4">
                  {[
                    { l: "List", c: "nums = [1, 2, 3]\nnums.append(4)\nprint(nums)" },
                    { l: "Tuple", c: "colors = ('red', 'green')\nprint(colors)" },
                    { l: "Set", c: "unique = {1, 2, 2, 3}\nprint(unique)" },
                    { l: "Dictionary", c: "user = {'id': 1, 'name': 'Bob'}\nprint(user)" },
                  ].map((p) => (
                    <button key={p.l} onClick={() => { setFpCode(p.c); setFpOut([]); }}
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
                <div className="p-6 font-mono text-emerald-400 space-y-1">
                  {fpOut.length > 0 ? fpOut.map((l, i) => <div key={i}>{l}</div>) : <div className="text-slate-600 italic">Click Run Code...</div>}
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
