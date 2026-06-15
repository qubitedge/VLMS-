import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PlayCircle, RotateCcw, Lightbulb, AlertTriangle, ArrowDown, ShieldAlert, Zap, FileX } from "lucide-react";

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
  <div className={`transition-all rounded-lg px-2 py-0.5 font-mono text-[15px] ${active ? "bg-amber-100 border-l-4 border-amber-500" : ""}`}
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

const FlowNode = ({ label, active, error }: { label: string, active: boolean, error?: boolean }) => (
  <div className={`px-4 py-2 rounded-xl text-sm font-bold text-center transition-all border-2 ${
    active ? (error ? "bg-red-500 text-white border-red-600 shadow-md scale-105" : "bg-blue-500 text-white border-blue-600 shadow-md scale-105") :
    (error ? "bg-red-50 border-red-200 text-red-400" : "bg-slate-50 border-slate-200 text-slate-500")
  }`}>
    {label}
  </div>
);

const FlowArrow = ({ active }: { active: boolean }) => (
  <div className="flex justify-center my-1">
    <ArrowDown className={`size-4 transition-all ${active ? "text-blue-500" : "text-slate-300"}`} />
  </div>
);

/* ═══════════════════════ MAIN COMPONENT ═══════════════════════ */

export function PythonExceptionHandlingPlayground({ expId }: { expId: string }) {

  /* ── SECTION 1: Flow Visualizer ── */
  const [s1Step, setS1Step] = useState(0); // 0=init, 1=try, 2=error, 3=except
  const s1RunStep = () => setS1Step(s => (s + 1) % 4);

  /* ── SECTION 2: Different Exceptions ── */
  const [s2Input, setS2Input] = useState("hello");
  const [s2Step, setS2Step] = useState<"init"|"try"|"except_val"|"except_type">("init");
  const s2Run = () => {
    if (s2Input.toLowerCase() === "none" || s2Input === "") setS2Step("except_type");
    else if (isNaN(Number(s2Input))) setS2Step("except_val");
    else setS2Step("try");
  };

  /* ── SECTION 3: try-else-finally ── */
  const [s3Case, setS3Case] = useState<"A" | "B">("A");
  const [s3Step, setS3Step] = useState(0); 
  // Case A: 0=init, 1=try, 2=else, 3=finally
  // Case B: 0=init, 1=try, 2=except, 3=finally
  const s3Run = () => setS3Step(s => (s + 1) % 4);

  /* ── SECTION 4: Raising Exceptions ── */
  const [s4Age, setS4Age] = useState("-5");
  const [s4Step, setS4Step] = useState<0|1|2>(0); // 0=init, 1=check, 2=raise
  const s4Run = () => setS4Step(s => ((s + 1) % 3) as 0|1|2);

  /* ── SECTION 5: Challenges ── */
  const [s5aMissing, setS5aMissing] = useState(true);
  const [s5bAge, setS5bAge] = useState("-5");
  const [s5cInput, setS5cInput] = useState("hello");

  /* ── FINAL SANDBOX ── */
  const [fsCode, setFsCode] = useState("try:\n    x = 10 / 0\n    print(x)\nexcept ZeroDivisionError:\n    print('Cannot divide by zero')\nfinally:\n    print('Cleanup complete')");
  const [fsOut, setFsOut] = useState<string[]>([]);
  const [fsMem, setFsMem] = useState<{v: string, val: string}[]>([]);

  const runFinal = () => {
    let output: string[] = [];
    let mem: {v: string, val: string}[] = [];
    
    try {
      const lines = fsCode.split('\n');
      let vars: Record<string, any> = {};
      
      let inTry = false;
      let exceptBlocks: Record<string, boolean> = {};
      let inExcept: string | null = null;
      let inFinally = false;
      let errorOccurred: string | null = null;

      for (let i = 0; i < lines.length; i++) {
        let line = lines[i];
        let trimmed = line.trim();
        if (!trimmed) continue;

        if (trimmed === "try:") {
          inTry = true; continue;
        }
        
        const exceptMatch = trimmed.match(/^except\s+(.+):$/);
        if (exceptMatch) {
          inTry = false;
          inExcept = exceptMatch[1];
          exceptBlocks[inExcept] = true;
          continue;
        }

        if (trimmed === "finally:") {
          inTry = false;
          inExcept = null;
          inFinally = true;
          continue;
        }

        // Inside try block
        if (inTry && line.startsWith("    ")) {
           if (errorOccurred) continue; // skip rest of try
           
           if (trimmed.includes("/ 0")) {
             errorOccurred = "ZeroDivisionError";
             continue;
           }
           if (trimmed.includes("int(") && trimmed.includes("hello")) {
             errorOccurred = "ValueError";
             continue;
           }
           if (trimmed.startsWith("raise ")) {
             errorOccurred = trimmed.split(" ")[1].split("(")[0];
             continue;
           }

           const assignMatch = trimmed.match(/^([a-zA-Z_]\w*)\s*=\s*(.+)$/);
           if (assignMatch) {
             vars[assignMatch[1]] = assignMatch[2];
             mem.push({v: assignMatch[1], val: assignMatch[2]});
           }

           const printMatch = trimmed.match(/^print\((.+)\)$/);
           if (printMatch) {
             const expr = printMatch[1].replace(/^['"]|['"]$/g, '');
             output.push(vars[expr] || expr);
           }
           continue;
        }

        // Inside except block
        if (inExcept && line.startsWith("    ")) {
           if (errorOccurred === inExcept || inExcept === "Exception" || (inExcept.includes("(") && inExcept.includes(errorOccurred || ""))) {
             const printMatch = trimmed.match(/^print\((.+)\)$/);
             if (printMatch) {
               const expr = printMatch[1].replace(/^['"]|['"]$/g, '');
               output.push(vars[expr] || expr);
             }
           }
           continue;
        }

        // Inside finally block
        if (inFinally && line.startsWith("    ")) {
           const printMatch = trimmed.match(/^print\((.+)\)$/);
           if (printMatch) {
             const expr = printMatch[1].replace(/^['"]|['"]$/g, '');
             output.push(vars[expr] || expr);
           }
           continue;
        }
      }

      // Unhandled error
      if (errorOccurred) {
         let handled = false;
         Object.keys(exceptBlocks).forEach(k => {
           if (k === errorOccurred || k === "Exception" || k.includes(errorOccurred as string)) handled = true;
         });
         if (!handled) output.push(`Traceback: Unhandled ${errorOccurred}`);
      }

    } catch (e) {
      output.push("Syntax Error in Simulation");
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
            Python Exception Handling Playground
          </h1>
          <p className="text-lg text-slate-500 font-medium">Interactive Control Flow Visualizer</p>
        </div>

        {/* ═══ SECTION 1: Flow Visualizer ═══ */}
        <section>
          <SectionTitle num={1} title="Exception Flow Visualizer" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 flex flex-col gap-5">
              <div className="bg-blue-50/50 p-5 rounded-xl border border-blue-100 leading-loose text-slate-700">
                <CL indent={0}><span className="text-purple-600">num</span> = <span className="text-amber-600">10</span></CL>
                <CL indent={0}><span className="text-purple-600">den</span> = <span className="text-amber-600">0</span></CL>
                <div className="h-2" />
                <CL indent={0} active={s1Step === 1}><span className="text-blue-600 font-bold">try:</span></CL>
                <CL indent={1} active={s1Step === 1 || s1Step === 2}><span className="text-blue-600">print</span>(num / den)</CL>
                <div className="h-2" />
                <CL indent={0} active={s1Step === 3}><span className="text-blue-600 font-bold">except</span> <span className="text-red-500 font-bold">ZeroDivisionError</span>:</CL>
                <CL indent={1} active={s1Step === 3}><span className="text-blue-600">print</span>(<span className="text-amber-600">"Cannot divide by zero"</span>)</CL>
              </div>

              <div className="flex gap-2">
                <button onClick={s1RunStep} className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold text-sm hover:from-blue-500 hover:to-purple-500 transition-all flex items-center gap-2">
                  {s1Step === 0 ? "Start" : "Next Step"} <ArrowDown className="-rotate-90 size-4" />
                </button>
                <button onClick={() => setS1Step(0)} className="px-3 py-2 rounded-xl bg-slate-100 text-slate-600 hover:bg-slate-200 transition-all"><RotateCcw className="size-4"/></button>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
                <h3 className="font-bold text-slate-600 uppercase tracking-widest text-xs mb-4 flex items-center gap-2">
                  <ShieldAlert className="size-4" /> Exception Flow
                </h3>
                <div className="max-w-[200px] mx-auto">
                  <FlowNode label="TRY" active={s1Step === 1 || s1Step === 2} />
                  <FlowArrow active={s1Step === 2} />
                  <FlowNode label="Error Occurs" active={s1Step === 2} error />
                  <FlowArrow active={s1Step === 3} />
                  <FlowNode label="EXCEPT" active={s1Step === 3} />
                  <FlowArrow active={s1Step === 3} />
                  <FlowNode label="Program Continues" active={s1Step === 3} />
                </div>
              </div>
              <OutputConsole lines={s1Step === 3 ? ["Cannot divide by zero"] : []} isError={s1Step === 3} />
            </div>
          </div>
        </section>

        {/* ═══ SECTION 2: Different Exceptions ═══ */}
        <section>
          <SectionTitle num={2} title="Handling Different Exceptions" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 flex flex-col gap-5">
              <div className="flex gap-4 items-end">
                <div className="flex-1">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2 block">Value Input</label>
                  <input type="text" value={s2Input} onChange={(e) => { setS2Input(e.target.value); setS2Step("init"); }}
                    className="w-full bg-slate-50 border-2 border-slate-200 rounded-xl p-3 font-mono text-sm outline-none focus:border-blue-400" />
                </div>
                <div className="flex flex-wrap gap-1">
                  {["123", "hello", "None"].map(v => (
                    <button key={v} onClick={() => { setS2Input(v); setS2Step("init"); }} className="px-2 py-1 bg-slate-100 rounded text-xs font-mono">{v}</button>
                  ))}
                </div>
              </div>

              <div className="bg-blue-50/50 p-5 rounded-xl border border-blue-100 leading-loose text-slate-700">
                <CL indent={0}><span className="text-blue-600 font-bold">try:</span></CL>
                <CL indent={1} active={s2Step === "try"}><span className="text-purple-600">number</span> = <span className="text-blue-600">int</span>(value)</CL>
                <CL indent={1} active={s2Step === "try"}><span className="text-blue-600">print</span>(number)</CL>
                <div className="h-2" />
                <CL indent={0} active={s2Step === "except_val"}><span className="text-blue-600 font-bold">except</span> <span className="text-red-500 font-bold">ValueError</span>:</CL>
                <CL indent={1} active={s2Step === "except_val"}><span className="text-blue-600">print</span>(<span className="text-amber-600">"Invalid Number"</span>)</CL>
                <div className="h-2" />
                <CL indent={0} active={s2Step === "except_type"}><span className="text-blue-600 font-bold">except</span> <span className="text-red-500 font-bold">TypeError</span>:</CL>
                <CL indent={1} active={s2Step === "except_type"}><span className="text-blue-600">print</span>(<span className="text-amber-600">"Type Error"</span>)</CL>
              </div>

              <RunButton onClick={s2Run} />
            </div>

            <div className="flex flex-col gap-4">
              <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 h-full flex flex-col justify-center gap-4">
                {s2Step === 'init' && <div className="text-center text-slate-400 italic">Run code to see exception routing...</div>}
                {s2Step === 'try' && (
                  <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="bg-emerald-50 p-6 rounded-xl border-2 border-emerald-200 text-center">
                    <div className="text-emerald-500 font-bold text-lg mb-2">Success!</div>
                    <div className="font-mono text-emerald-800">No Exception Raised</div>
                  </motion.div>
                )}
                {s2Step === 'except_val' && (
                  <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="bg-red-50 p-6 rounded-xl border-2 border-red-200 text-center">
                    <div className="text-red-500 font-bold text-lg mb-2">Exception Raised</div>
                    <div className="font-mono text-red-800 font-bold mb-4">ValueError</div>
                    <div className="text-sm text-red-600">Routed to: <code className="bg-white px-2 py-1 rounded">except ValueError:</code></div>
                  </motion.div>
                )}
                {s2Step === 'except_type' && (
                  <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="bg-amber-50 p-6 rounded-xl border-2 border-amber-200 text-center">
                    <div className="text-amber-600 font-bold text-lg mb-2">Exception Raised</div>
                    <div className="font-mono text-amber-800 font-bold mb-4">TypeError</div>
                    <div className="text-sm text-amber-700">Routed to: <code className="bg-white px-2 py-1 rounded">except TypeError:</code></div>
                  </motion.div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* ═══ SECTION 3: try -> else -> finally ═══ */}
        <section>
          <SectionTitle num={3} title="try → else → finally Explorer" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 flex flex-col gap-5">
              <div className="flex gap-2">
                <button onClick={() => {setS3Case("A"); setS3Step(0);}} className={`flex-1 py-2 rounded-xl text-sm font-bold border-2 ${s3Case === 'A' ? "bg-emerald-50 text-emerald-600 border-emerald-200" : "bg-slate-50 border-slate-200 text-slate-500"}`}>Case A: Valid</button>
                <button onClick={() => {setS3Case("B"); setS3Step(0);}} className={`flex-1 py-2 rounded-xl text-sm font-bold border-2 ${s3Case === 'B' ? "bg-red-50 text-red-600 border-red-200" : "bg-slate-50 border-slate-200 text-slate-500"}`}>Case B: Div By Zero</button>
              </div>

              <div className="bg-blue-50/50 p-5 rounded-xl border border-blue-100 leading-loose text-slate-700">
                <CL indent={0} active={s3Step === 1}><span className="text-blue-600 font-bold">try:</span></CL>
                <CL indent={1} active={s3Step === 1}><span className="text-purple-600">res</span> = 10 / {s3Case === 'A' ? '2' : '0'}</CL>
                <div className="h-2" />
                <CL indent={0} active={s3Step === 2 && s3Case === 'B'}><span className="text-blue-600 font-bold">except</span> <span className="text-red-500 font-bold">ZeroDivisionError</span>:</CL>
                <CL indent={1} active={s3Step === 2 && s3Case === 'B'}><span className="text-blue-600">print</span>(<span className="text-amber-600">"Error"</span>)</CL>
                <div className="h-2" />
                <CL indent={0} active={s3Step === 2 && s3Case === 'A'}><span className="text-blue-600 font-bold">else:</span></CL>
                <CL indent={1} active={s3Step === 2 && s3Case === 'A'}><span className="text-blue-600">print</span>(<span className="text-amber-600">"Success"</span>)</CL>
                <div className="h-2" />
                <CL indent={0} active={s3Step === 3}><span className="text-blue-600 font-bold">finally:</span></CL>
                <CL indent={1} active={s3Step === 3}><span className="text-blue-600">print</span>(<span className="text-amber-600">"Finished"</span>)</CL>
              </div>
              <div className="flex gap-2">
                <button onClick={s3Run} className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold text-sm hover:from-blue-500 hover:to-purple-500 transition-all flex items-center gap-2">
                  Step Execution <ArrowDown className="-rotate-90 size-4" />
                </button>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
                <div className="max-w-[200px] mx-auto">
                  <FlowNode label="TRY" active={s3Step === 1} />
                  <FlowArrow active={s3Step === 2} />
                  
                  {s3Case === 'A' ? (
                    <FlowNode label="ELSE (No Error)" active={s3Step === 2} />
                  ) : (
                    <FlowNode label="EXCEPT (Error Caught)" active={s3Step === 2} error />
                  )}
                  
                  <FlowArrow active={s3Step === 3} />
                  <FlowNode label="FINALLY (Always Runs)" active={s3Step === 3} />
                </div>
              </div>
              <Hint show text="ELSE runs only if NO exception occurs. FINALLY runs ALWAYS, regardless of exceptions. It's used for cleanup (like closing files)." />
            </div>
          </div>
        </section>

        {/* ═══ SECTION 4: Raising Exceptions ═══ */}
        <section>
          <SectionTitle num={4} title="Raising Exceptions" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 flex flex-col gap-5">
              <div className="flex gap-4 items-end">
                <div className="flex-1">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2 block">Age Input</label>
                  <input type="text" value={s4Age} onChange={(e) => { setS4Age(e.target.value); setS4Step(0); }}
                    className="w-full bg-slate-50 border-2 border-slate-200 rounded-xl p-3 font-mono text-sm outline-none focus:border-blue-400" />
                </div>
                <div className="flex flex-wrap gap-1">
                  {["20", "0", "-10"].map(v => (
                    <button key={v} onClick={() => { setS4Age(v); setS4Step(0); }} className="px-2 py-1 bg-slate-100 rounded text-xs font-mono">{v}</button>
                  ))}
                </div>
              </div>

              <div className="bg-blue-50/50 p-5 rounded-xl border border-blue-100 leading-loose text-slate-700">
                <CL indent={0} active={s4Step === 1}><span className="text-blue-600 font-bold">if</span> age &lt; <span className="text-amber-600">0</span>:</CL>
                <CL indent={1} active={s4Step === 2 && Number(s4Age) < 0}><span className="text-red-500 font-bold">raise</span> ValueError(</CL>
                <CL indent={2} active={s4Step === 2 && Number(s4Age) < 0}><span className="text-amber-600">"Age cannot be negative"</span></CL>
                <CL indent={1} active={s4Step === 2 && Number(s4Age) < 0}>)</CL>
              </div>

              <div className="flex gap-2">
                <button onClick={s4Run} className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold text-sm hover:from-blue-500 hover:to-purple-500 transition-all flex items-center gap-2">
                  Step Execution <ArrowDown className="-rotate-90 size-4" />
                </button>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 h-full flex flex-col justify-center">
                {s4Step === 0 && <div className="text-center text-slate-400 italic">Click Step Execution...</div>}
                {s4Step === 1 && <div className="text-center font-bold text-slate-600">Checking Condition...</div>}
                {s4Step === 2 && Number(s4Age) >= 0 && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center bg-emerald-50 p-4 border-2 border-emerald-200 rounded-xl text-emerald-600 font-bold">
                    Condition False.<br/>No exception raised.
                  </motion.div>
                )}
                {s4Step === 2 && Number(s4Age) < 0 && (
                  <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="bg-red-50 p-6 rounded-xl border-2 border-red-200 text-center">
                    <Zap className="size-8 text-red-500 mx-auto mb-2" />
                    <div className="text-red-500 font-bold text-lg mb-2">Exception Generated!</div>
                    <div className="font-mono text-red-800 font-bold mb-1">ValueError</div>
                    <div className="text-sm text-red-600 font-mono">"Age cannot be negative"</div>
                  </motion.div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* ═══ SECTION 5: Challenges ═══ */}
        <section>
          <SectionTitle num={5} title="Real-World Exception Challenges" />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Challenge A */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 flex flex-col gap-4">
              <h3 className="font-bold text-blue-500 uppercase tracking-widest text-xs">A: File Handling</h3>
              <div className="bg-blue-50/50 p-4 rounded-xl border border-blue-100 font-mono text-[11px] text-slate-700">
                <span className="text-blue-600 font-bold">try:</span><br/>
                &nbsp;&nbsp;file = <span className="text-blue-600">open</span>(<span className="text-amber-600">"data.txt"</span>)<br/>
                <span className="text-blue-600 font-bold">except</span> <span className="text-red-500 font-bold">FileNotFoundError:</span><br/>
                &nbsp;&nbsp;<span className="text-blue-600">print</span>(<span className="text-amber-600">"File Not Found"</span>)<br/>
                <span className="text-blue-600 font-bold">finally:</span><br/>
                &nbsp;&nbsp;<span className="text-blue-600">print</span>(<span className="text-amber-600">"Closing Process"</span>)
              </div>
              <div className="flex gap-2">
                <button onClick={() => setS5aMissing(false)} className={`flex-1 py-1.5 text-xs font-bold rounded border ${!s5aMissing ? "bg-emerald-100 border-emerald-300" : "bg-slate-50 border-slate-200"}`}>File Exists</button>
                <button onClick={() => setS5aMissing(true)} className={`flex-1 py-1.5 text-xs font-bold rounded border ${s5aMissing ? "bg-red-100 border-red-300" : "bg-slate-50 border-slate-200"}`}>File Missing</button>
              </div>
              <div className="mt-auto p-3 rounded-xl border-2 bg-slate-800 border-slate-700 text-emerald-400 font-mono text-xs whitespace-pre">
                {s5aMissing ? "File Not Found\nClosing Process" : "Closing Process"}
              </div>
            </div>

            {/* Challenge B */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 flex flex-col gap-4">
              <h3 className="font-bold text-purple-500 uppercase tracking-widest text-xs">B: Age Validator</h3>
              <div className="bg-blue-50/50 p-4 rounded-xl border border-blue-100 font-mono text-xs text-slate-700">
                age = <span className="text-blue-600">int</span>(input())<br/>
                <span className="text-blue-600 font-bold">if</span> age &lt; <span className="text-amber-600">0</span>:<br/>
                &nbsp;&nbsp;<span className="text-red-500 font-bold">raise</span> ValueError(<span className="text-amber-600">"Inv"</span>)
              </div>
              <div className="flex gap-2">
                {["20", "0", "-5"].map(v => (
                  <button key={v} onClick={() => setS5bAge(v)} className="flex-1 py-1.5 text-xs font-bold rounded border bg-slate-50 hover:bg-slate-100">{v}</button>
                ))}
              </div>
              <div className={`mt-auto p-3 rounded-xl border-2 font-mono text-xs text-center font-bold ${Number(s5bAge) < 0 ? "bg-red-50 text-red-600 border-red-200" : "bg-emerald-50 text-emerald-600 border-emerald-200"}`}>
                {Number(s5bAge) < 0 ? "ValueError: Inv" : "Valid Age"}
              </div>
            </div>

            {/* Challenge C */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 flex flex-col gap-4">
              <h3 className="font-bold text-emerald-500 uppercase tracking-widest text-xs">C: Multiple Handler</h3>
              <div className="bg-blue-50/50 p-4 rounded-xl border border-blue-100 font-mono text-[11px] text-slate-700">
                <span className="text-blue-600 font-bold">try:</span><br/>
                &nbsp;&nbsp;<span className="text-blue-600">print</span>(<span className="text-blue-600">int</span>(v))<br/>
                <span className="text-blue-600 font-bold">except</span> (ValueError, TypeError):<br/>
                &nbsp;&nbsp;<span className="text-blue-600">print</span>(<span className="text-amber-600">"Invalid Input"</span>)
              </div>
              <div className="flex gap-2">
                {["100", "hello", "None"].map(v => (
                  <button key={v} onClick={() => setS5cInput(v)} className="flex-1 py-1.5 text-xs font-bold rounded border bg-slate-50 hover:bg-slate-100">{v}</button>
                ))}
              </div>
              <div className={`mt-auto p-3 rounded-xl border-2 font-mono text-xs text-center font-bold ${s5cInput === "100" ? "bg-emerald-50 text-emerald-600 border-emerald-200" : "bg-red-50 text-red-600 border-red-200"}`}>
                {s5cInput === "100" ? "100" : "Invalid Input"}
              </div>
            </div>

          </div>
        </section>

        {/* ═══ FINAL SANDBOX ═══ */}
        <section className="pt-12 border-t border-slate-200 mt-12 pb-24">
          <div className="text-center space-y-2 mb-8">
            <h2 className="text-3xl font-black text-slate-800">Final Sandbox</h2>
            <p className="text-slate-500">Experiment with try, except, else, finally, and raise.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 flex flex-col overflow-hidden">
              <div className="bg-slate-50 border-b border-slate-100 px-4 py-3 font-bold text-xs uppercase tracking-widest text-slate-500 flex justify-between items-center">
                <span>Exception Editor</span>
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
                    { l: "Basic Try/Except", c: "try:\n    print(10/0)\nexcept ZeroDivisionError:\n    print('Caught Error!')" },
                    { l: "Raise Error", c: "age = -1\nif age < 0:\n    raise ValueError('Too young')" },
                    { l: "Finally Block", c: "try:\n    print('Trying')\nexcept:\n    print('Error')\nfinally:\n    print('Always runs')" },
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
                  {fsOut.length > 0 ? fsOut.map((l, i) => <div key={i} className={l.includes("Error") || l.includes("Traceback") ? "text-red-400" : ""}>{l}</div>) : <div className="text-slate-600 italic">Click Run Code...</div>}
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
