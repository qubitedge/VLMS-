import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PlayCircle, RotateCcw, Lightbulb, FileText, ArrowRight, FolderOpen, Save, RefreshCw } from "lucide-react";

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

const VirtualFile = ({ name, content, highlightLine, showCursor }: { name: string, content: string, highlightLine?: number, showCursor?: boolean }) => {
  const lines = content.split('\n');
  return (
    <div className="bg-white rounded-xl shadow-sm border-2 border-slate-200 overflow-hidden">
      <div className="bg-slate-100 border-b border-slate-200 px-3 py-2 flex items-center gap-2">
        <FileText className="size-4 text-slate-500" />
        <span className="font-mono text-sm font-bold text-slate-700">{name}</span>
      </div>
      <div className="p-4 font-mono text-sm text-slate-600 min-h-[100px] whitespace-pre bg-slate-50">
        {content === "" ? <span className="text-slate-400 italic">(empty)</span> : (
          <div className="space-y-0.5">
            {lines.map((l, i) => (
              <div key={i} className={`px-2 py-0.5 rounded transition-all ${highlightLine === i ? "bg-blue-100 text-blue-800 font-bold border-l-2 border-blue-500" : ""}`}>
                {l}
              </div>
            ))}
          </div>
        )}
        {showCursor && <span className="inline-block w-2 h-4 bg-slate-400 animate-pulse align-middle ml-1"></span>}
      </div>
    </div>
  );
};

/* ═══════════════════════ MAIN COMPONENT ═══════════════════════ */

export function PythonFileHandlingPlayground({ expId }: { expId: string }) {

  /* ── SECTION 1: Modes Explorer ── */
  const [s1Mode, setS1Mode] = useState<"r" | "w" | "a">("r");

  /* ── SECTION 2: Writing ── */
  const [s2Content, setS2Content] = useState("Hello Python");
  const [s2FileContent, setS2FileContent] = useState("");
  const [s2Ran, setS2Ran] = useState(false);
  const runS2 = () => { setS2FileContent(s2Content); setS2Ran(true); };

  /* ── SECTION 3: Reading ── */
  const s3File = "Line 1\nLine 2\nLine 3";
  const [s3Method, setS3Method] = useState<"read" | "readline" | "readlines">("read");
  const [s3Ran, setS3Ran] = useState(false);
  const getS3Output = () => {
    if (s3Method === 'read') return ["Line 1", "Line 2", "Line 3"];
    if (s3Method === 'readline') return ["Line 1"];
    if (s3Method === 'readlines') return ["['Line 1\\n', 'Line 2\\n', 'Line 3']"];
    return [];
  };

  /* ── SECTION 4: Context Manager ── */
  const [s4File, setS4File] = useState("Hello Python");
  const [s4Append, setS4Append] = useState("New Line");
  const [s4Step, setS4Step] = useState(0); // 0=init, 1=open, 2=write, 3=close
  const runS4Step = () => setS4Step(s => (s + 1) % 4);

  /* ── SECTION 5: Challenges ── */
  const [s5aRan, setS5aRan] = useState(false);
  const [s5bRan, setS5bRan] = useState(false);
  const [s5cRan, setS5cRan] = useState(false);

  /* ── FINAL SANDBOX ── */
  const [fsCode, setFsCode] = useState(`with open("data.txt", "w") as f:\n    f.write("Line 1\\nLine 2")\n\nwith open("data.txt", "r") as f:\n    content = f.read()\n    print(content)`);
  const [fsFiles, setFsFiles] = useState<Record<string, string>>({});
  const [fsOut, setFsOut] = useState<string[]>([]);
  const [fsMem, setFsMem] = useState<{v: string, val: string}[]>([]);

  const runFinal = () => {
    let output: string[] = [];
    let mem: {v: string, val: string}[] = [];
    let files = { ...fsFiles };
    
    // Very basic and constrained simulator for demo purposes
    try {
      const lines = fsCode.split('\n');
      let vars: Record<string, any> = {};
      
      let inWith = false;
      let withVar = "";
      let withFile = "";
      let withMode = "";

      for (let i = 0; i < lines.length; i++) {
        let line = lines[i].trim();
        if (!line) continue;

        // Context manager
        const withMatch = line.match(/^with\s+open\(['"](.+)['"]\s*,\s*['"](.+)['"]\)\s+as\s+(\w+):$/);
        if (withMatch) {
          inWith = true;
          withFile = withMatch[1];
          withMode = withMatch[2];
          withVar = withMatch[3];
          if (withMode === 'w') files[withFile] = "";
          if (withMode === 'a' && !files[withFile]) files[withFile] = "";
          if (withMode === 'r' && files[withFile] === undefined) {
             output.push(`FileNotFoundError: No such file or directory: '${withFile}'`);
             break;
          }
          continue;
        }

        // Inside with block
        if (inWith && lines[i].startsWith("    ")) {
           line = line.trim();
           // read
           const readMatch = line.match(/^(\w+)\s*=\s*(\w+)\.read\(\)$/);
           if (readMatch && readMatch[2] === withVar) {
             vars[readMatch[1]] = files[withFile] || "";
             mem.push({v: readMatch[1], val: vars[readMatch[1]].replace(/\n/g, '\\n')});
           }
           // write
           const writeMatch = line.match(/^(\w+)\.write\(['"](.*)['"]\)$/);
           if (writeMatch && writeMatch[1] === withVar) {
             let text = writeMatch[2].replace(/\\n/g, '\n');
             if (withMode === 'w' || withMode === 'a') {
                files[withFile] = (files[withFile] || "") + text;
             }
           }
           // print inside with
           const printMatch = line.match(/^print\((.+)\)$/);
           if (printMatch) {
              const expr = printMatch[1];
              if (vars[expr] !== undefined) output.push(vars[expr]);
              else output.push(expr);
           }
           continue;
        } else {
           inWith = false;
        }

        // outside print
        const printMatch = line.match(/^print\((.+)\)$/);
        if (printMatch) {
          const expr = printMatch[1];
          if (vars[expr] !== undefined) output.push(vars[expr]);
          else output.push(expr.replace(/^['"]|['"]$/g, ''));
        }
      }
    } catch (e) {
      output.push("Syntax Error in Simulation");
    }

    setFsFiles(files);
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
            Python File Handling Playground
          </h1>
          <p className="text-lg text-slate-500 font-medium">Interactive File System Visualizer</p>
        </div>

        {/* ═══ SECTION 1: Modes Explorer ═══ */}
        <section>
          <SectionTitle num={1} title="Open File Modes Explorer" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 flex flex-col gap-5">
              <div className="bg-blue-50/50 p-5 rounded-xl border border-blue-100 leading-loose text-slate-700">
                <CL indent={0}><span className="text-purple-600">file</span> = <span className="text-blue-600">open</span>(<span className="text-amber-600">"notes.txt"</span>, <span className="text-amber-600">"{s1Mode}"</span>)</CL>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2 block">Select Mode</label>
                <div className="flex gap-2">
                  {(["r", "w", "a"] as const).map(m => (
                    <button key={m} onClick={() => setS1Mode(m)}
                      className={`px-6 py-2 rounded-xl font-mono text-sm border-2 transition-all font-bold ${s1Mode === m ? "bg-blue-500 text-white border-blue-500 shadow-md" : "bg-white border-slate-200 text-slate-600 hover:border-blue-300"}`}>
                      "{m}"
                    </button>
                  ))}
                </div>
              </div>

              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                <div className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">Action Overview</div>
                <div className="text-slate-700 font-medium flex items-center gap-2">
                  <ArrowRight className="size-4 text-blue-500" />
                  {s1Mode === "r" && "Read Existing File. (Error if missing)"}
                  {s1Mode === "w" && "Create New File OR Overwrite Existing File."}
                  {s1Mode === "a" && "Append To Existing File. (Creates if missing)"}
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <VirtualFile name="notes.txt" content="Hello Python\nThis is a file." />
              <div className="bg-blue-50 p-4 rounded-xl border-2 border-blue-100 flex items-center gap-4">
                <div className="bg-blue-500 text-white p-3 rounded-lg shadow"><FolderOpen className="size-6"/></div>
                <div>
                  <div className="text-sm font-bold text-blue-800">File Pointer Position</div>
                  <div className="text-sm text-blue-600">
                    {s1Mode === 'r' ? 'Start of file (reading)' : s1Mode === 'w' ? 'Start of file (truncating)' : 'End of file (appending)'}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ═══ SECTION 2: Writing ═══ */}
        <section>
          <SectionTitle num={2} title="Writing to Files" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 flex flex-col gap-5">
              <div className="bg-blue-50/50 p-5 rounded-xl border border-blue-100 leading-loose text-slate-700">
                <CL indent={0}><span className="text-blue-600 font-bold">with</span> <span className="text-blue-600">open</span>(<span className="text-amber-600">"notes.txt"</span>, <span className="text-amber-600">"w"</span>) <span className="text-blue-600 font-bold">as</span> f:</CL>
                <CL indent={1} active={s2Ran}><span className="text-purple-600">f</span>.write(<span className="text-amber-600">"{s2Content}"</span>)</CL>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2 block">Text to Write</label>
                <input type="text" value={s2Content} onChange={(e) => { setS2Content(e.target.value); setS2Ran(false); }}
                  className="w-full bg-slate-50 border-2 border-slate-200 rounded-xl p-3 font-mono text-sm outline-none focus:border-blue-400" />
              </div>
              <RunButton onClick={runS2} label="Execute Write" />
            </div>

            <div className="flex flex-col gap-4">
              <VirtualFile name="notes.txt" content={s2Ran ? s2FileContent : ""} showCursor={s2Ran} />
              {s2Ran && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="grid grid-cols-2 gap-4">
                  <div className="bg-emerald-50 p-4 rounded-xl border border-emerald-200">
                    <div className="text-xs font-bold text-emerald-600 uppercase tracking-widest mb-1">Status</div>
                    <div className="font-mono text-sm font-bold text-emerald-800">Closed Automatically</div>
                  </div>
                  <div className="bg-purple-50 p-4 rounded-xl border border-purple-200">
                    <div className="text-xs font-bold text-purple-600 uppercase tracking-widest mb-1">Mode</div>
                    <div className="font-mono text-sm font-bold text-purple-800">'w' (Overwrite)</div>
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </section>

        {/* ═══ SECTION 3: Reading ═══ */}
        <section>
          <SectionTitle num={3} title="Reading Files" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 flex flex-col gap-5">
              <div className="bg-blue-50/50 p-5 rounded-xl border border-blue-100 leading-loose text-slate-700">
                <CL indent={0}><span className="text-blue-600 font-bold">with</span> <span className="text-blue-600">open</span>(<span className="text-amber-600">"notes.txt"</span>, <span className="text-amber-600">"r"</span>) <span className="text-blue-600 font-bold">as</span> f:</CL>
                <CL indent={1} active={s3Ran}><span className="text-purple-600">content</span> = f.{s3Method}()</CL>
                <CL indent={1}><span className="text-blue-600">print</span>(content)</CL>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2 block">Method Selector</label>
                <div className="flex flex-wrap gap-2">
                  {(["read", "readline", "readlines"] as const).map(m => (
                    <button key={m} onClick={() => { setS3Method(m); setS3Ran(false); }}
                      className={`px-4 py-2 rounded-xl font-mono text-sm border-2 transition-all font-bold ${s3Method === m ? "bg-emerald-500 text-white border-emerald-500 shadow-md" : "bg-white border-slate-200 text-slate-600 hover:border-emerald-300"}`}>
                      {m}()
                    </button>
                  ))}
                </div>
              </div>
              <RunButton onClick={() => setS3Ran(true)} />
            </div>

            <div className="flex flex-col gap-4">
              <VirtualFile name="notes.txt" content={s3File} highlightLine={s3Ran && s3Method === 'readline' ? 0 : undefined} />
              {s3Ran && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col gap-4">
                  <OutputConsole lines={getS3Output()} />
                  <Hint show text={
                    s3Method === 'read' ? "read() returns the entire file content as a single string." :
                    s3Method === 'readline' ? "readline() reads a single line from the file and stops." :
                    "readlines() returns a LIST containing every line as a separate string element."
                  } />
                </motion.div>
              )}
            </div>
          </div>
        </section>

        {/* ═══ SECTION 4: Context Manager ═══ */}
        <section>
          <SectionTitle num={4} title="Append & Context Manager Playground" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 flex flex-col gap-5">
              <h3 className="font-bold text-blue-500 uppercase tracking-widest text-xs">Append Mode ('a')</h3>
              <div className="bg-blue-50/50 p-5 rounded-xl border border-blue-100 leading-loose text-slate-700">
                <CL indent={0}><span className="text-blue-600 font-bold">with</span> <span className="text-blue-600">open</span>(<span className="text-amber-600">"notes.txt"</span>, <span className="text-amber-600">"a"</span>) <span className="text-blue-600 font-bold">as</span> f:</CL>
                <CL indent={1} active={s4Step === 2}><span className="text-purple-600">f</span>.write(<span className="text-amber-600">"\n{s4Append}"</span>)</CL>
              </div>
              <div className="flex gap-2">
                <input type="text" value={s4Append} onChange={(e) => setS4Append(e.target.value)} className="w-32 bg-slate-50 border-2 border-slate-200 rounded-xl p-2 font-mono text-sm outline-none focus:border-blue-400" />
                <button onClick={() => { if(s4Step===2) setS4File(f => f + "\n" + s4Append); runS4Step(); }}
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold text-sm hover:from-blue-500 hover:to-purple-500 transition-all flex items-center gap-2">
                  {s4Step === 0 ? "Start" : s4Step === 1 ? "Open File" : s4Step === 2 ? "Write Data" : "Close File"}
                </button>
                <button onClick={() => { setS4Step(0); setS4File("Hello Python"); }} className="px-3 py-2 rounded-xl bg-slate-100 text-slate-600 hover:bg-slate-200 transition-all"><RotateCcw className="size-4"/></button>
              </div>
              
              <div className="mt-4 p-4 rounded-xl border-2 transition-all font-mono text-sm font-bold flex items-center gap-3 bg-slate-50 border-slate-200 text-slate-500">
                <div className={`p-2 rounded-lg ${s4Step >= 1 && s4Step <= 2 ? "bg-emerald-500 text-white" : "bg-slate-200"}`}>{s4Step >= 1 && s4Step <= 2 ? "OPEN" : "CLOSED"}</div>
                File Status
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <VirtualFile name="notes.txt" content={s4File} />
              <Hint show text="The 'with' statement creates a Context Manager. It guarantees that the file is automatically closed when the block ends, even if an error occurs!" />
            </div>
          </div>
        </section>

        {/* ═══ SECTION 5: Challenges ═══ */}
        <section>
          <SectionTitle num={5} title="File Challenges" />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Challenge A */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 flex flex-col gap-4">
              <h3 className="font-bold text-blue-500 uppercase tracking-widest text-xs">A: Count Lines</h3>
              <div className="bg-blue-50/50 p-4 rounded-xl border border-blue-100 font-mono text-xs text-slate-700">
                <span className="text-blue-600 font-bold">with</span> <span className="text-blue-600">open</span>(<span className="text-amber-600">"data.txt"</span>) <span className="text-blue-600 font-bold">as</span> f:<br/>
                &nbsp;&nbsp;lines = f.readlines()<br/>
                <span className="text-blue-600">print</span>(<span className="text-blue-600">len</span>(lines))
              </div>
              <VirtualFile name="data.txt" content="Python\nJava\nC++" />
              <RunButton onClick={() => setS5aRan(true)} label="Run" />
              {s5aRan && <div className="mt-auto p-3 rounded-xl border-2 bg-emerald-50 border-emerald-200 text-emerald-700 font-bold text-center">Output: 3</div>}
            </div>

            {/* Challenge B */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 flex flex-col gap-4">
              <h3 className="font-bold text-purple-500 uppercase tracking-widest text-xs">B: Capitalize File</h3>
              <div className="text-xs font-mono bg-slate-50 p-3 rounded-lg border border-slate-200">
                content = content.upper()
              </div>
              <VirtualFile name="src.txt" content="hello world\npython rules" />
              <div className="flex justify-center"><ArrowRight className="size-5 text-slate-400 rotate-90 lg:rotate-0" /></div>
              <RunButton onClick={() => setS5bRan(true)} label="Process" />
              {s5bRan && <VirtualFile name="dest.txt" content="HELLO WORLD\nPYTHON RULES" />}
            </div>

            {/* Challenge C */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 flex flex-col gap-4">
              <h3 className="font-bold text-emerald-500 uppercase tracking-widest text-xs">C: writelines()</h3>
              <div className="bg-blue-50/50 p-4 rounded-xl border border-blue-100 font-mono text-[11px] text-slate-700">
                lines = [<span className="text-amber-600">"Apple\n"</span>, <span className="text-amber-600">"Banana\n"</span>]<br/>
                <span className="text-blue-600 font-bold">with</span> <span className="text-blue-600">open</span>(<span className="text-amber-600">"f.txt"</span>,<span className="text-amber-600">"w"</span>) <span className="text-blue-600 font-bold">as</span> f:<br/>
                &nbsp;&nbsp;f.writelines(lines)
              </div>
              <RunButton onClick={() => setS5cRan(true)} label="Run" />
              {s5cRan && <VirtualFile name="f.txt" content="Apple\nBanana\n" />}
            </div>

          </div>
        </section>

        {/* ═══ FINAL SANDBOX ═══ */}
        <section className="pt-12 border-t border-slate-200 mt-12 pb-24">
          <div className="text-center space-y-2 mb-8">
            <h2 className="text-3xl font-black text-slate-800">Final Sandbox</h2>
            <p className="text-slate-500">Experiment with file processing and virtual file system.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 flex flex-col overflow-hidden">
              <div className="bg-slate-50 border-b border-slate-100 px-4 py-3 font-bold text-xs uppercase tracking-widest text-slate-500 flex justify-between items-center">
                <span>Code Editor</span>
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
              <div className="bg-slate-800 rounded-2xl shadow-lg border border-slate-700 flex flex-col overflow-hidden">
                <div className="bg-slate-900 border-b border-slate-700 px-4 py-3 font-bold text-xs uppercase tracking-widest text-slate-400">
                  Virtual File System
                </div>
                <div className="p-4 grid grid-cols-2 gap-4 max-h-48 overflow-y-auto">
                  {Object.entries(fsFiles).map(([name, content]) => (
                    <div key={name} className="bg-slate-800 border border-slate-600 rounded-lg overflow-hidden">
                      <div className="bg-slate-700 px-2 py-1 text-xs font-mono text-slate-300 font-bold">{name}</div>
                      <div className="p-2 text-xs font-mono text-slate-400 whitespace-pre">{content || "(empty)"}</div>
                    </div>
                  ))}
                  {Object.keys(fsFiles).length === 0 && <div className="col-span-2 text-slate-500 italic text-sm p-2">No files created yet.</div>}
                </div>
              </div>
              
              <div className="bg-slate-800 rounded-2xl shadow-lg border border-slate-700 flex flex-col overflow-hidden">
                <div className="bg-slate-900 border-b border-slate-700 px-4 py-3 font-bold text-xs uppercase tracking-widest text-slate-400">
                  Output Console
                </div>
                <div className="p-4 font-mono text-emerald-400 space-y-1 text-sm max-h-32 overflow-y-auto">
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
