import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PlayCircle, RotateCcw, Lightbulb, Type } from "lucide-react";

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

const MemoryPanel = ({ title, rows }: { title?: string; rows: { v: string; val: string; type?: string }[] }) => (
  <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5">
    <h3 className="font-bold text-slate-600 uppercase tracking-widest text-xs mb-3">{title || "Memory State"}</h3>
    <div className="grid grid-cols-2 gap-1 font-mono text-sm">
      <div className="font-bold text-slate-500 pb-1 border-b border-slate-100 text-xs">Variable</div>
      <div className="font-bold text-slate-500 pb-1 border-b border-slate-100 text-xs">Value</div>
      {rows.map((r, i) => (
        <React.Fragment key={i}>
          <div className="text-purple-600 py-0.5">{r.v}</div>
          <div className="text-emerald-600 py-0.5 whitespace-pre">"{r.val}"</div>
        </React.Fragment>
      ))}
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

/* ─── String Visualizer Component ─── */
const StringVisualizer = ({ str, activeIndices }: { str: string; activeIndices: number[] }) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 overflow-x-auto">
      <h3 className="font-bold text-slate-600 uppercase tracking-widest text-xs mb-4 flex items-center gap-2">
        <Type className="size-3.5" /> String Visualization
      </h3>
      <div className="flex gap-1 pb-2">
        {str.split("").map((ch, i) => {
          const isActive = activeIndices.includes(i);
          return (
            <div key={i} className="flex flex-col items-center">
              <div className="text-[10px] text-slate-400 font-mono mb-1">{i}</div>
              <div className={`size-10 sm:size-12 flex items-center justify-center text-lg sm:text-xl font-mono font-bold rounded-lg border-2 transition-all ${
                isActive ? "bg-blue-500 text-white border-blue-600 shadow-md transform -translate-y-1" : "bg-slate-50 border-slate-200 text-slate-700"
              }`}>
                {ch === " " ? "␣" : ch}
              </div>
              <div className="text-[10px] text-slate-400 font-mono mt-1">{-str.length + i}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

/* ═══════════════════════ MAIN COMPONENT ═══════════════════════ */

export function PythonStringsPlayground({ expId }: { expId: string }) {

  /* ── SECTION 1: String Index Explorer ── */
  const s1Str = "Hello World";
  const [s1Idx, setS1Idx] = useState("0");
  const [s1Ran, setS1Ran] = useState(false);
  const s1I = Number(s1Idx);
  const s1Valid = !isNaN(s1I) && (s1I >= -s1Str.length && s1I < s1Str.length);
  const s1ActualIdx = s1Valid ? (s1I < 0 ? s1Str.length + s1I : s1I) : -1;
  const s1Char = s1Valid ? s1Str[s1ActualIdx] : "IndexError: string index out of range";

  /* ── SECTION 2: Slice Builder ── */
  const s2Str = "Hello World";
  const [s2Start, setS2Start] = useState("0");
  const [s2Stop, setS2Stop] = useState("5");
  const [s2Step, setS2Step] = useState("1");
  const [s2Ran, setS2Ran] = useState(false);

  const [s2Slice, setS2Slice] = useState("");
  const [s2Active, setS2Active] = useState<number[]>([]);

  const runS2 = () => {
    let start = s2Start === "" ? null : Number(s2Start);
    let stop = s2Stop === "" ? null : Number(s2Stop);
    let step = s2Step === "" ? 1 : Number(s2Step);

    if (isNaN(start as number) && start !== null) start = 0;
    if (isNaN(stop as number) && stop !== null) stop = s2Str.length;
    if (isNaN(step) || step === 0) step = 1;

    const indices: number[] = [];
    let res = "";
    
    if (step > 0) {
      let i = start === null ? 0 : (start < 0 ? Math.max(0, s2Str.length + start) : start);
      let end = stop === null ? s2Str.length : (stop < 0 ? s2Str.length + stop : stop);
      for (; i < end && i < s2Str.length; i += step) {
        indices.push(i);
        res += s2Str[i];
      }
    } else {
      let i = start === null ? s2Str.length - 1 : (start < 0 ? s2Str.length + start : Math.min(s2Str.length - 1, start));
      let end = stop === null ? -1 : (stop < 0 ? s2Str.length + stop : stop);
      for (; i > end && i >= 0; i += step) {
        indices.push(i);
        res += s2Str[i];
      }
    }
    
    setS2Slice(res);
    setS2Active(indices);
    setS2Ran(true);
  };

  /* ── SECTION 3: Immutability ── */
  const [s3Choice, setS3Choice] = useState<"works" | "jello" | "error" | null>(null);
  const [s3Ran, setS3Ran] = useState(false);
  const [s3Fix, setS3Fix] = useState<"correct" | "wrong" | null>(null);

  /* ── SECTION 4: String Methods ── */
  const [s4Str, setS4Str] = useState("   Hello Python   ");
  const [s4Method, setS4Method] = useState<"upper" | "lower" | "strip" | "replace" | "split">("upper");
  const [s4Ran, setS4Ran] = useState(false);
  const [s4Out, setS4Out] = useState<string>("");

  const runS4 = () => {
    let res = "";
    if (s4Method === "upper") res = s4Str.toUpperCase();
    else if (s4Method === "lower") res = s4Str.toLowerCase();
    else if (s4Method === "strip") res = s4Str.trim();
    else if (s4Method === "replace") res = s4Str.replace("Python", "World");
    else if (s4Method === "split") res = JSON.stringify(s4Str.trim().split(/\s+/).filter(Boolean));
    setS4Out(res);
    setS4Ran(true);
  };

  /* ── SECTION 5: Mini Challenges ── */
  const [s5aWord, setS5aWord] = useState("madam");
  const s5aIsPal = s5aWord === s5aWord.split("").reverse().join("");
  
  const [s5bSent, setS5bSent] = useState("python is fun and python is powerful");
  const [s5bSearch, setS5bSearch] = useState("python");
  const s5bCount = (s5bSent.match(new RegExp(s5bSearch, "g")) || []).length;

  const s5cText = "   Hello Python World   ";
  const s5cClean = s5cText.trim();
  const s5cWords = s5cClean.split(/\s+/);

  /* ── FINAL SANDBOX ── */
  const [fpCode, setFpCode] = useState("text = \"Python Programming\"\nprint(text[::-1])");
  const [fpOut, setFpOut] = useState<string[]>([]);
  const [fpMem, setFpMem] = useState<{ v: string; val: string }[]>([]);

  const runFinal = () => {
    // A simple, very restricted evaluator for string demos
    let output: string[] = [];
    let mem: { v: string; val: string }[] = [];
    
    try {
      const lines = fpCode.split('\n');
      let vars: Record<string, string> = {};
      
      lines.forEach(line => {
        line = line.trim();
        if (!line) return;
        
        // assignment
        const assignMatch = line.match(/^([a-zA-Z_]\w*)\s*=\s*(.+)$/);
        if (assignMatch) {
          const vname = assignMatch[1];
          let expr = assignMatch[2];
          
          if (expr.startsWith('"') || expr.startsWith("'")) {
             vars[vname] = expr.slice(1, -1);
          } else if (expr.includes(".replace(")) {
             const baseVar = expr.split('.')[0];
             const argsStr = expr.match(/\.replace\((.*?)\)/)?.[1] || "";
             const args = argsStr.split(',').map(s => s.trim().slice(1, -1));
             if (vars[baseVar] && args.length === 2) {
               vars[vname] = vars[baseVar].replaceAll(args[0], args[1]);
             }
          } else if (expr.includes(".upper()")) {
             const baseVar = expr.split('.')[0];
             if(vars[baseVar]) vars[vname] = vars[baseVar].toUpperCase();
          } else if (expr.includes(".lower()")) {
             const baseVar = expr.split('.')[0];
             if(vars[baseVar]) vars[vname] = vars[baseVar].toLowerCase();
          } else if (expr.includes(".strip()")) {
             const baseVar = expr.split('.')[0];
             if(vars[baseVar]) vars[vname] = vars[baseVar].trim();
          } else if (expr.includes("+")) {
             // basic concat
             const parts = expr.split('+').map(p => p.trim());
             let sum = "";
             parts.forEach(p => {
               if (p.startsWith('"') || p.startsWith("'")) sum += p.slice(1, -1);
               else if (vars[p]) sum += vars[p];
             });
             vars[vname] = sum;
          }
          mem.push({ v: vname, val: vars[vname] || "" });
        }
        
        // print
        const printMatch = line.match(/^print\((.+)\)$/);
        if (printMatch) {
          let expr = printMatch[1].trim();
          if (expr.startsWith('"') || expr.startsWith("'")) {
            output.push(expr.slice(1, -1));
          } else if (vars[expr]) {
            output.push(vars[expr]);
          } else if (expr.includes("[::-1]")) {
             const vname = expr.split('[')[0];
             if(vars[vname]) output.push(vars[vname].split('').reverse().join(''));
          } else if (expr.includes(".split()")) {
             const vname = expr.split('.')[0];
             if(vars[vname]) output.push(JSON.stringify(vars[vname].split(/\s+/)));
          } else if (expr.includes(".count(")) {
             const vname = expr.split('.')[0];
             const arg = expr.match(/\.count\((.*?)\)/)?.[1].trim().slice(1, -1) || "";
             if(vars[vname]) output.push(String((vars[vname].match(new RegExp(arg, "g")) || []).length));
          } else {
             // Try to evaluate slice e.g. text[0:5]
             const sliceMatch = expr.match(/^([a-zA-Z_]\w*)\[(.*?)\]$/);
             if (sliceMatch && vars[sliceMatch[1]]) {
               const str = vars[sliceMatch[1]];
               const sliceStr = sliceMatch[2];
               if (sliceStr.includes(':')) {
                 const parts = sliceStr.split(':');
                 const start = parts[0] ? parseInt(parts[0]) : 0;
                 const end = parts[1] ? parseInt(parts[1]) : str.length;
                 output.push(str.slice(start, end));
               } else {
                 const idx = parseInt(sliceStr);
                 output.push(str[idx < 0 ? str.length + idx : idx] || "IndexError");
               }
             } else {
               output.push("Error: Not supported in this sandbox");
             }
          }
        }
      });
    } catch (e) {
      output.push("Syntax Error");
    }
    
    setFpOut(output.length ? output : ["(No output)"]);
    setFpMem(Object.entries(mem.reduce((acc, curr) => ({...acc, [curr.v]: curr.val}), {})).map(([k, v]) => ({ v: k, val: v as string })));
  };

  return (
    <div className="bg-slate-50 min-h-screen text-slate-800 font-sans p-8 md:p-12 overflow-y-auto">
      <div className="max-w-5xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center space-y-4 mb-16 relative">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-32 bg-gradient-to-r from-blue-400/20 to-purple-400/20 blur-3xl pointer-events-none rounded-full" />
          <h1 className="text-4xl md:text-5xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-purple-700 relative z-10">
            Python Strings Playground
          </h1>
          <p className="text-lg text-slate-500 font-medium">Interactive Coding Lab</p>
        </div>

        {/* ═══ SECTION 1: Index Explorer ═══ */}
        <section>
          <SectionTitle num={1} title="String Index Explorer" />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 flex flex-col gap-4">
              <h3 className="font-bold text-slate-600 uppercase tracking-widest text-xs">Interactive Code</h3>
              <div className="bg-blue-50/50 p-5 rounded-xl border border-blue-100 leading-loose text-slate-700">
                <CL indent={0}><span className="text-purple-600">s</span> = <span className="text-amber-600">"{s1Str}"</span></CL>
                <CL indent={0} active={s1Ran}>
                  <span className="text-blue-600">print</span>(s[
                  <input type="text" value={s1Idx} onChange={(e) => { setS1Idx(e.target.value); setS1Ran(false); }}
                    className="bg-white border-b-2 border-blue-300 outline-none text-blue-700 w-12 text-center font-mono focus:border-blue-500 mx-1" />
                  ])
                </CL>
              </div>
              <div className="flex flex-wrap gap-2">
                {["0", "4", "6", "10", "-1", "-5"].map((v) => (
                  <button key={v} onClick={() => { setS1Idx(v); setS1Ran(true); }}
                    className="px-3 py-1.5 rounded-lg border border-slate-200 hover:border-blue-400 bg-white font-mono text-xs hover:bg-blue-50 transition-all">
                    Index {v}
                  </button>
                ))}
              </div>
              <RunButton onClick={() => setS1Ran(true)} />
            </div>
            <div className="flex flex-col gap-4">
              <StringVisualizer str={s1Str} activeIndices={s1Ran && s1Valid ? [s1ActualIdx] : []} />
              {s1Ran && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col gap-4">
                  <OutputConsole lines={[s1Char]} isError={!s1Valid} />
                  <Hint show text={s1Valid && s1I < 0 ? "Negative indices count backwards from the end of the string. -1 is the last character." : "Strings are zero-indexed. The first character is at index 0."} />
                </motion.div>
              )}
            </div>
          </div>
        </section>

        {/* ═══ SECTION 2: Slice Builder ═══ */}
        <section>
          <SectionTitle num={2} title="Slice Builder" />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 flex flex-col gap-5">
              <div className="bg-blue-50/50 p-5 rounded-xl border border-blue-100 leading-loose text-slate-700">
                <CL indent={0}><span className="text-purple-600">s</span> = <span className="text-amber-600">"{s2Str}"</span></CL>
                <CL indent={0} active={s2Ran}>
                  <span className="text-blue-600">print</span>(s[
                  <input type="text" value={s2Start} onChange={(e) => { setS2Start(e.target.value); setS2Ran(false); }} placeholder="start" className="bg-white border-b-2 border-blue-300 outline-none text-blue-700 w-10 text-center font-mono focus:border-blue-500" />:
                  <input type="text" value={s2Stop} onChange={(e) => { setS2Stop(e.target.value); setS2Ran(false); }} placeholder="stop" className="bg-white border-b-2 border-blue-300 outline-none text-blue-700 w-10 text-center font-mono focus:border-blue-500" />:
                  <input type="text" value={s2Step} onChange={(e) => { setS2Step(e.target.value); setS2Ran(false); }} placeholder="step" className="bg-white border-b-2 border-blue-300 outline-none text-blue-700 w-10 text-center font-mono focus:border-blue-500" />
                  ])
                </CL>
              </div>

              <div className="flex flex-wrap gap-2">
                {[
                  { l: "s[:5]", a: "", b: "5", s: "" },
                  { l: "s[6:]", a: "6", b: "", s: "" },
                  { l: "s[::2]", a: "", b: "", s: "2" },
                  { l: "s[::-1]", a: "", b: "", s: "-1" },
                ].map((p) => (
                  <button key={p.l} onClick={() => { setS2Start(p.a); setS2Stop(p.b); setS2Step(p.s); setS2Ran(false); }}
                    className="px-3 py-1.5 rounded-lg border border-slate-200 hover:border-blue-400 bg-white font-mono text-xs hover:bg-blue-50 transition-all font-bold">
                    {p.l}
                  </button>
                ))}
              </div>
              <RunButton onClick={runS2} />
            </div>
            <div className="flex flex-col gap-4">
              <StringVisualizer str={s2Str} activeIndices={s2Ran ? s2Active : []} />
              {s2Ran && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col gap-4">
                  <OutputConsole lines={[s2Slice]} />
                  <Hint show text="Slicing extracts a substring. Syntax: [start:stop:step]. It goes up to, but DOES NOT include, the stop index. A negative step reverses the string!" />
                </motion.div>
              )}
            </div>
          </div>
        </section>

        {/* ═══ SECTION 3: String Immutability ═══ */}
        <section>
          <SectionTitle num={3} title="String Immutability Lab" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 flex flex-col gap-5">
              <h3 className="font-bold text-slate-600 uppercase tracking-widest text-xs">Observe Behavior</h3>
              <div className="bg-blue-50/50 p-5 rounded-xl border border-blue-100 leading-loose text-slate-700">
                <CL indent={0}><span className="text-purple-600">s</span> = <span className="text-amber-600">"Hello"</span></CL>
                <CL indent={0} active={s3Ran}><span className="text-purple-600">s</span>[<span className="text-amber-600">0</span>] = <span className="text-amber-600">"J"</span></CL>
              </div>
              
              {!s3Ran ? (
                <div className="space-y-3">
                  <label className="text-sm font-bold text-slate-700">What will happen?</label>
                  <div className="flex flex-col gap-2">
                    {[
                      { id: "works", label: "It works, 'H' becomes 'J'" },
                      { id: "jello", label: "s becomes 'Jello'" },
                      { id: "error", label: "TypeError" }
                    ].map(opt => (
                      <label key={opt.id} className={`flex items-center gap-3 p-3 border-2 rounded-xl cursor-pointer transition-all ${s3Choice === opt.id ? "border-blue-500 bg-blue-50" : "border-slate-200 hover:bg-slate-50"}`}>
                        <input type="radio" name="immute" checked={s3Choice === opt.id} onChange={() => setS3Choice(opt.id as any)} className="w-4 h-4 text-blue-600" />
                        <span className="font-medium text-slate-700">{opt.label}</span>
                      </label>
                    ))}
                  </div>
                  <RunButton onClick={() => setS3Ran(true)} label="Check Answer" />
                </div>
              ) : (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                  <OutputConsole isError lines={["TypeError: 'str' object does not support item assignment"]} />
                  <div className="bg-red-50 border-2 border-red-200 p-4 rounded-xl text-red-700 text-sm">
                    <strong>Strings are immutable!</strong> Once created, you cannot change individual characters in-place.
                  </div>
                </motion.div>
              )}
            </div>

            {s3Ran && (
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 flex flex-col gap-5">
                <h3 className="font-bold text-emerald-600 uppercase tracking-widest text-xs">The Correct Way: Create a New String</h3>
                <div className="bg-blue-50/50 p-5 rounded-xl border border-blue-100 leading-loose text-slate-700">
                  <CL indent={0}><span className="text-purple-600">s</span> = <span className="text-amber-600">"Hello"</span></CL>
                  <CL indent={0}><span className="text-purple-600">new_s</span> = _____</CL>
                </div>
                
                <div className="space-y-3">
                  <label className="text-sm font-bold text-slate-700">How do we make "Jello"?</label>
                  <div className="flex flex-col gap-2">
                    <button onClick={() => setS3Fix("correct")} className={`p-3 border-2 rounded-xl text-left font-mono text-sm transition-all ${s3Fix === "correct" ? "border-emerald-500 bg-emerald-50 text-emerald-700" : "border-slate-200 hover:bg-slate-50 text-slate-600"}`}>
                      "J" + s[1:]
                    </button>
                    <button onClick={() => setS3Fix("wrong")} className={`p-3 border-2 rounded-xl text-left font-mono text-sm transition-all ${s3Fix === "wrong" ? "border-red-500 bg-red-50 text-red-700" : "border-slate-200 hover:bg-slate-50 text-slate-600"}`}>
                      s[0] = "J"
                    </button>
                  </div>
                </div>

                {s3Fix === "correct" && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                    <OutputConsole lines={["Jello"]} />
                    <MemoryPanel rows={[{v: "s", val: "Hello"}, {v: "new_s", val: "Jello"}]} />
                    <Hint show text="We use string concatenation (+) and slicing to build a completely new string object!" />
                  </motion.div>
                )}
                {s3Fix === "wrong" && (
                  <div className="text-red-500 text-sm font-bold mt-2">Still a TypeError! Try the other way.</div>
                )}
              </motion.div>
            )}
          </div>
        </section>

        {/* ═══ SECTION 4: String Methods ═══ */}
        <section>
          <SectionTitle num={4} title="String Methods Playground" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 flex flex-col gap-5">
              <div>
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2 block">Original String</label>
                <input type="text" value={s4Str} onChange={(e) => { setS4Str(e.target.value); setS4Ran(false); }}
                  className="w-full bg-slate-50 border-2 border-slate-200 rounded-xl p-3 font-mono text-lg outline-none focus:border-blue-400" />
              </div>
              
              <div>
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2 block">Select Method</label>
                <div className="flex flex-wrap gap-2">
                  {(["upper", "lower", "strip", "replace", "split"] as const).map((m) => (
                    <button key={m} onClick={() => { setS4Method(m); setS4Ran(false); }}
                      className={`px-4 py-2 rounded-xl font-mono text-sm border-2 transition-all font-bold ${
                        s4Method === m ? "bg-blue-500 text-white border-blue-500 shadow-md" : "bg-white border-slate-200 text-slate-600 hover:border-blue-300"
                      }`}>
                      {m === "replace" ? "replace('Python','World')" : `${m}()`}
                    </button>
                  ))}
                </div>
              </div>

              <div className="bg-blue-50/50 p-5 rounded-xl border border-blue-100 leading-loose text-slate-700 font-mono">
                <div><span className="text-purple-600">s</span> = <span className="text-amber-600">"{s4Str}"</span></div>
                <div className="mt-2 text-blue-600 font-bold">
                  {s4Method === "replace" ? "print(s.replace('Python', 'World'))" : `print(s.${s4Method}())`}
                </div>
              </div>
              <RunButton onClick={runS4} />
            </div>

            <div className="flex flex-col gap-4">
              {s4Ran && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col gap-4">
                  <OutputConsole lines={[s4Out]} />
                  <MemoryPanel title="Memory After Operation" rows={[
                    { v: "s", val: s4Str },
                    { v: "result", val: s4Out }
                  ]} />
                  <Hint show text="String methods DO NOT change the original string. They return a NEW string with the modifications applied." />
                </motion.div>
              )}
            </div>
          </div>
        </section>

        {/* ═══ SECTION 5: Mini Challenges ═══ */}
        <section>
          <SectionTitle num={5} title="Mini String Challenges" />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Palindrome */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 flex flex-col gap-4">
              <h3 className="font-bold text-purple-500 uppercase tracking-widest text-xs">A: Palindrome Checker</h3>
              <div className="bg-blue-50/50 p-4 rounded-xl border border-blue-100 font-mono text-sm text-slate-700">
                <span className="text-purple-600">word</span> = <input type="text" value={s5aWord} onChange={(e) => setS5aWord(e.target.value)} className="w-20 bg-transparent border-b border-blue-300 outline-none text-amber-600" /><br/>
                <span className="text-blue-600">print</span>(word == word[::-<span className="text-amber-600">1</span>])
              </div>
              <div className="flex flex-wrap gap-1 mt-1">
                {["madam", "racecar", "hello", "level"].map(w => (
                  <button key={w} onClick={() => setS5aWord(w)} className="text-xs px-2 py-1 bg-slate-100 rounded hover:bg-slate-200 font-mono">{w}</button>
                ))}
              </div>
              <div className={`mt-auto p-3 rounded-xl border-2 font-bold text-center ${s5aIsPal ? "bg-emerald-50 border-emerald-200 text-emerald-600" : "bg-slate-50 border-slate-200 text-slate-500"}`}>
                Output: {s5aIsPal ? "True" : "False"}
              </div>
            </div>

            {/* Counter */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 flex flex-col gap-4">
              <h3 className="font-bold text-blue-500 uppercase tracking-widest text-xs">B: Word Counter</h3>
              <div className="bg-blue-50/50 p-4 rounded-xl border border-blue-100 font-mono text-sm text-slate-700">
                <span className="text-purple-600">s</span> = <span className="text-amber-600">"{s5bSent}"</span><br/>
                <span className="text-blue-600">print</span>(s.count(<input type="text" value={s5bSearch} onChange={(e) => setS5bSearch(e.target.value)} className="w-16 bg-transparent border-b border-blue-300 outline-none text-amber-600" />))
              </div>
              <div className="mt-auto p-3 rounded-xl border-2 bg-blue-50 border-blue-200 text-blue-700 font-bold text-center">
                Output: {s5bCount}
              </div>
            </div>

            {/* Clean Input */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 flex flex-col gap-4">
              <h3 className="font-bold text-emerald-500 uppercase tracking-widest text-xs">C: Clean User Input</h3>
              <div className="bg-blue-50/50 p-4 rounded-xl border border-blue-100 font-mono text-sm text-slate-700">
                <span className="text-purple-600">txt</span> = <span className="text-amber-600">"{s5cText}"</span><br/>
                <span className="text-purple-600">c</span> = txt.strip()<br/>
                <span className="text-purple-600">w</span> = c.split()
              </div>
              <div className="mt-auto space-y-1 text-xs font-mono">
                <div className="flex justify-between p-2 bg-slate-50 rounded"><span>Original:</span> <span className="text-slate-400">"{s5cText}"</span></div>
                <div className="flex justify-between p-2 bg-slate-100 rounded"><span>strip():</span> <span className="text-slate-600">"{s5cClean}"</span></div>
                <div className="flex justify-between p-2 bg-emerald-50 text-emerald-700 font-bold rounded"><span>split():</span> <span>{JSON.stringify(s5cWords)}</span></div>
              </div>
            </div>

          </div>
        </section>

        {/* ═══ FINAL SANDBOX ═══ */}
        <section className="pt-12 border-t border-slate-200 mt-12 pb-24">
          <div className="text-center space-y-2 mb-8">
            <h2 className="text-3xl font-black text-slate-800">Final Sandbox</h2>
            <p className="text-slate-500">Experiment with string slicing, formatting, and methods.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-slate-200 flex flex-col overflow-hidden">
              <div className="bg-slate-50 border-b border-slate-100 px-4 py-3 font-bold text-xs uppercase tracking-widest text-slate-500 flex justify-between items-center">
                <span>String Editor</span>
                <button onClick={runFinal} className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white px-4 py-1.5 rounded-lg flex items-center gap-2 transition-all shadow-sm">
                  <PlayCircle className="size-4" /> Run Code
                </button>
              </div>
              <div className="p-6">
                <textarea
                  value={fpCode}
                  onChange={(e) => setFpCode(e.target.value)}
                  className="w-full h-48 bg-blue-50/30 border border-blue-100 rounded-xl p-4 font-mono text-slate-700 outline-none focus:border-blue-400 focus:bg-blue-50/50 resize-none leading-loose"
                  spellCheck={false}
                />
                
                <div className="flex flex-wrap gap-2 mt-4">
                  {[
                    { l: "Reverse", c: "s = \"Python\"\nprint(s[::-1])" },
                    { l: "Slice", c: "s = \"Hello World\"\nprint(s[0:5])" },
                    { l: "Concat", c: "a = \"Hello\"\nb = \"World\"\nprint(a + \" \" + b)" },
                    { l: "Methods", c: "s = \"   Python   \"\nclean = s.strip()\nprint(clean.upper())" },
                  ].map((p) => (
                    <button key={p.l} onClick={() => { setFpCode(p.c); setFpOut([]); setFpMem([]); }}
                      className="px-3 py-1.5 rounded-lg border border-slate-200 hover:border-blue-400 bg-white font-mono text-xs hover:bg-blue-50 transition-all">{p.l}</button>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-6">
              <div className="bg-slate-800 rounded-2xl shadow-lg border border-slate-700 flex flex-col overflow-hidden">
                <div className="bg-slate-900 border-b border-slate-700 px-4 py-3 font-bold text-xs uppercase tracking-widest text-slate-400">
                  Output Console
                </div>
                <div className="p-6 font-mono text-emerald-400 space-y-1">
                  {fpOut.length > 0 ? fpOut.map((l, i) => <div key={i} className={l.includes("Error") ? "text-red-400" : ""}>{l}</div>) : <div className="text-slate-600 italic">Click Run Code...</div>}
                </div>
              </div>
              {fpMem.length > 0 && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                  <MemoryPanel rows={fpMem} />
                </motion.div>
              )}
            </div>
          </div>

          <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-3">
            {["Indexing & Slicing", "Immutability", "String Methods", "String Formatting"].map((label, i) => (
              <div key={i} className="bg-white rounded-xl border border-slate-200 p-3 text-center">
                <span className="text-emerald-500 font-bold text-lg">✓</span>
                <div className="text-slate-600 text-xs font-bold mt-1 uppercase tracking-wider">{label}</div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
