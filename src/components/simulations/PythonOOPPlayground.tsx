import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PlayCircle, RotateCcw, Lightbulb, Box, User, ArrowRight, Activity, Users, Settings } from "lucide-react";

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

const ObjectCard = ({ title, attributes, isClass }: { title: string, attributes: Record<string, string|number>, isClass?: boolean }) => (
  <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className={`rounded-xl shadow-sm border-2 overflow-hidden ${isClass ? "bg-blue-50 border-blue-200" : "bg-white border-purple-200"}`}>
    <div className={`px-4 py-2 font-bold text-sm flex items-center gap-2 ${isClass ? "bg-blue-100 text-blue-800" : "bg-purple-100 text-purple-800"}`}>
      {isClass ? <Box className="size-4" /> : <User className="size-4" />} {title}
    </div>
    <div className="p-4 space-y-2 font-mono text-sm">
      {Object.entries(attributes).map(([k, v]) => (
        <div key={k} className="flex justify-between items-center bg-slate-50 px-2 py-1 rounded">
          <span className="text-slate-500 font-bold">{k}</span>
          <span className="text-slate-800">{v}</span>
        </div>
      ))}
      {Object.keys(attributes).length === 0 && <div className="text-slate-400 italic text-center">No attributes</div>}
    </div>
  </motion.div>
);

/* ═══════════════════════ MAIN COMPONENT ═══════════════════════ */

export function PythonOOPPlayground({ expId }: { expId: string }) {

  /* ── SECTION 1: Class & Object Builder ── */
  const [s1Objs, setS1Objs] = useState<string[]>([]);
  const runS1Add = () => setS1Objs(s => [...s, `student${s.length + 1}`]);
  const runS1Reset = () => setS1Objs([]);

  /* ── SECTION 2: Constructor & Self ── */
  const [s2Name, setS2Name] = useState("Alice");
  const [s2Age, setS2Age] = useState("20");
  const [s2Step, setS2Step] = useState(0); // 0=init, 1=call, 2=init_exec, 3=bound, 4=done

  /* ── SECTION 3: Instance Methods ── */
  const [s3Name, setS3Name] = useState("Alice");
  const [s3Ran, setS3Ran] = useState(false);

  /* ── SECTION 4: Class vs Instance Variables ── */
  const [s4School, setS4School] = useState("ABC School");
  const [s4SchoolInp, setS4SchoolInp] = useState("XYZ School");

  /* ── SECTION 5: Management Challenge ── */
  const [s5Marks, setS5Marks] = useState("80,90,85");
  const [s5Students, setS5Students] = useState<any[]>([{ name: "Alice", marks: [80, 90, 85] }]);
  const s5Avg = (marks: number[]) => marks.length ? (marks.reduce((a, b) => a + b, 0) / marks.length).toFixed(1) : "0.0";
  const s5Grade = (avg: number) => avg >= 90 ? "A" : avg >= 80 ? "B" : "C";

  const addS5Student = () => {
    const nums = s5Marks.split(',').map(n => Number(n.trim())).filter(n => !isNaN(n));
    setS5Students(s => [...s, { name: `Student${s.length + 1}`, marks: nums }]);
  };

  /* ── FINAL SANDBOX ── */
  const [fsCode, setFsCode] = useState("class Student:\n    school = 'ABC'\n    def __init__(self, name):\n        self.name = name\n\ns1 = Student('Alice')\nprint(s1.name)\nprint(s1.school)");
  const [fsOut, setFsOut] = useState<string[]>([]);

  const runFinal = () => {
    let output: string[] = [];
    try {
      const lines = fsCode.split('\n');
      let vars: Record<string, any> = {};
      let classDefs: Record<string, any> = {};
      let currentClass: string | null = null;

      for (let i = 0; i < lines.length; i++) {
        let line = lines[i];
        let trimmed = line.trim();
        if (!trimmed) continue;

        const classMatch = trimmed.match(/^class\s+(\w+):$/);
        if (classMatch) {
          currentClass = classMatch[1];
          classDefs[currentClass] = { _classVars: {}, _methods: {} };
          continue;
        }

        if (currentClass && line.startsWith("    ")) {
           const cVarMatch = trimmed.match(/^([a-zA-Z_]\w*)\s*=\s*(.+)$/);
           if (cVarMatch && !trimmed.startsWith("def ")) {
             classDefs[currentClass]._classVars[cVarMatch[1]] = cVarMatch[2].replace(/^['"]|['"]$/g, '');
             continue;
           }
        } else {
           currentClass = null;
        }

        const objMatch = trimmed.match(/^([a-zA-Z_]\w*)\s*=\s*(\w+)\((.*)\)$/);
        if (objMatch && classDefs[objMatch[2]]) {
          vars[objMatch[1]] = { _type: objMatch[2], ...classDefs[objMatch[2]]._classVars };
          
          const args = objMatch[3].split(',').map(s=>s.trim().replace(/^['"]|['"]$/g, ''));
          // Basic __init__ emulation for demo
          if (args[0] && args[0] !== "") vars[objMatch[1]]['name'] = args[0];
          continue;
        }

        const assignMatch = trimmed.match(/^([a-zA-Z_]\w*)\.([a-zA-Z_]\w*)\s*=\s*(.+)$/);
        if (assignMatch) {
           const [_, obj, attr, val] = assignMatch;
           if (vars[obj]) vars[obj][attr] = val.replace(/^['"]|['"]$/g, '');
           else if (classDefs[obj]) {
             classDefs[obj]._classVars[attr] = val.replace(/^['"]|['"]$/g, '');
             // Update instances (simplified)
             Object.values(vars).forEach(v => {
               if (v._type === obj) v[attr] = classDefs[obj]._classVars[attr];
             });
           }
           continue;
        }

        const printMatch = trimmed.match(/^print\((.+)\)$/);
        if (printMatch) {
          const expr = printMatch[1].trim();
          if (expr.includes('.')) {
            const [obj, attr] = expr.split('.');
            if (vars[obj] && vars[obj][attr] !== undefined) output.push(vars[obj][attr]);
            else if (classDefs[obj] && classDefs[obj]._classVars[attr] !== undefined) output.push(classDefs[obj]._classVars[attr]);
            else output.push(`AttributeError: '${obj}' has no attribute '${attr}'`);
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
            Python OOP Playground
          </h1>
          <p className="text-lg text-slate-500 font-medium">Interactive Classes & Objects Visualizer</p>
        </div>

        {/* ═══ SECTION 1: Class & Object Builder ═══ */}
        <section>
          <SectionTitle num={1} title="Class & Object Builder" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 flex flex-col gap-5">
              <div className="bg-blue-50/50 p-5 rounded-xl border border-blue-100 leading-loose text-slate-700">
                <CL indent={0}><span className="text-blue-600 font-bold">class</span> Student:</CL>
                <CL indent={1}><span className="text-blue-600 font-bold">pass</span></CL>
                <div className="h-2" />
                {s1Objs.map((obj, i) => (
                  <CL key={i} indent={0} active><span className="text-purple-600">{obj}</span> = Student()</CL>
                ))}
              </div>
              <div className="flex gap-2">
                <RunButton onClick={runS1Add} label="Create Object" icon={User} />
                <button onClick={runS1Reset} className="px-3 py-2 rounded-xl bg-slate-100 text-slate-600 hover:bg-slate-200 transition-all"><RotateCcw className="size-4"/></button>
              </div>
              {s1Objs.length > 0 && <OutputConsole lines={s1Objs.map(o => `Student object '${o}' created`)} />}
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 flex flex-col gap-6">
              <h3 className="font-bold text-slate-600 uppercase tracking-widest text-xs flex items-center gap-2"><Box className="size-4"/> Object Visualization</h3>
              <div className="flex flex-col items-center gap-4">
                <div className="bg-blue-100 border-2 border-blue-300 text-blue-800 font-bold px-8 py-3 rounded-xl shadow-sm">
                  Class: Student <span className="text-xs font-normal ml-2">(Blueprint)</span>
                </div>
                {s1Objs.length > 0 && (
                  <div className="flex flex-wrap justify-center gap-4">
                    <AnimatePresence>
                      {s1Objs.map(obj => (
                        <motion.div key={obj} initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col items-center gap-2">
                          <ArrowRight className="size-5 text-slate-300 rotate-90" />
                          <div className="bg-purple-100 border-2 border-purple-300 text-purple-800 font-bold px-6 py-2 rounded-xl shadow-sm flex items-center gap-2">
                            <User className="size-4" /> {obj}
                          </div>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>
                )}
                {s1Objs.length === 0 && <div className="text-slate-400 italic text-sm mt-4">Click "Create Object" to instantiate.</div>}
              </div>
              <Hint show text="A Class is a blueprint. An Object is an actual instance created from that blueprint. You can create multiple separate objects from one class!" />
            </div>
          </div>
        </section>

        {/* ═══ SECTION 2: Constructor & self ═══ */}
        <section>
          <SectionTitle num={2} title="Constructor (__init__) & self Visualizer" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 flex flex-col gap-4">
              <div className="bg-blue-50/50 p-5 rounded-xl border border-blue-100 leading-loose text-slate-700">
                <CL indent={0}><span className="text-blue-600 font-bold">class</span> Student:</CL>
                <CL indent={1} active={s2Step===2}><span className="text-blue-600 font-bold">def</span> <span className="text-blue-600">__init__</span>(<span className="text-red-500 font-bold">self</span>, name, age):</CL>
                <CL indent={2} active={s2Step===4}><span className="text-red-500 font-bold">self</span>.name = name</CL>
                <CL indent={2} active={s2Step===4}><span className="text-red-500 font-bold">self</span>.age = age</CL>
                <div className="h-4" />
                <CL indent={0} active={s2Step===1}><span className="text-purple-600">student1</span> = Student(</CL>
                <CL indent={1} active={s2Step===1}><input type="text" value={s2Name} onChange={e=>{setS2Name(e.target.value);setS2Step(0);}} className="w-20 bg-white border-b border-blue-300 outline-none text-amber-600 font-mono text-center" />,</CL>
                <CL indent={1} active={s2Step===1}><input type="text" value={s2Age} onChange={e=>{setS2Age(e.target.value);setS2Step(0);}} className="w-10 bg-white border-b border-blue-300 outline-none text-amber-600 font-mono text-center" /></CL>
                <CL indent={0} active={s2Step===1}>)</CL>
              </div>
              <div className="flex gap-2">
                <button onClick={() => setS2Step(s=>(s===4?1:s+1))} className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold text-sm hover:from-blue-500 hover:to-purple-500 transition-all flex items-center gap-2">
                  {s2Step === 0 ? "Start Execution" : "Next Step"} <ArrowRight className="size-4" />
                </button>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 flex-1 flex flex-col items-center justify-center gap-6">
                
                <div className="flex items-center gap-8 w-full justify-center">
                  <div className={`transition-all font-mono text-sm font-bold p-3 rounded-lg border-2 ${s2Step>=3 ? "bg-red-50 text-red-600 border-red-200" : "bg-slate-50 text-slate-400 border-slate-200"}`}>
                    self
                  </div>
                  <div className="flex flex-col items-center">
                    <span className={`text-[10px] font-bold uppercase tracking-widest transition-all ${s2Step>=3?"text-red-500":"text-transparent"}`}>Binds To</span>
                    <ArrowRight className={`size-5 transition-all ${s2Step>=3?"text-red-400":"text-slate-200"}`} />
                  </div>
                  <div className={`transition-all font-mono text-sm font-bold p-3 rounded-lg border-2 ${s2Step>=1 ? "bg-purple-50 text-purple-600 border-purple-200 shadow-sm" : "bg-slate-50 text-slate-400 border-slate-200"}`}>
                    student1
                  </div>
                </div>

                <div className="w-full max-w-[250px]">
                  {s2Step >= 4 ? (
                    <ObjectCard title="student1" attributes={{name: `"${s2Name}"`, age: s2Age}} />
                  ) : (
                    <div className="border-2 border-dashed border-slate-200 rounded-xl p-8 text-center text-slate-400 font-mono text-sm">
                      Object not initialized yet
                    </div>
                  )}
                </div>

              </div>
              <Hint show text="The __init__ method is automatically called when creating an object. 'self' acts as a reference to the newly created object itself!" />
            </div>
          </div>
        </section>

        {/* ═══ SECTION 3: Instance Methods ═══ */}
        <section>
          <SectionTitle num={3} title="Instance Methods Playground" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 flex flex-col gap-5">
              <div className="bg-blue-50/50 p-5 rounded-xl border border-blue-100 leading-loose text-slate-700">
                <CL indent={0}><span className="text-blue-600 font-bold">class</span> Student:</CL>
                <CL indent={1}><span className="text-blue-600 font-bold">def</span> <span className="text-blue-600">__init__</span>(<span className="text-red-500 font-bold">self</span>, name):</CL>
                <CL indent={2}><span className="text-red-500 font-bold">self</span>.name = name</CL>
                <div className="h-2" />
                <CL indent={1} active={s3Ran}><span className="text-blue-600 font-bold">def</span> <span className="text-blue-600">greet</span>(<span className="text-red-500 font-bold">self</span>):</CL>
                <CL indent={2} active={s3Ran}><span className="text-blue-600 font-bold">return</span> <span className="text-amber-600">"Hello "</span> + <span className="text-red-500 font-bold">self</span>.name</CL>
                <div className="h-4" />
                <CL indent={0}><span className="text-purple-600">student1</span> = Student(</CL>
                <CL indent={1}><input type="text" value={s3Name} onChange={e=>{setS3Name(e.target.value);setS3Ran(false);}} className="w-24 bg-white border-b border-blue-300 outline-none text-amber-600 font-mono text-center" /></CL>
                <CL indent={0}>)</CL>
                <div className="h-2" />
                <CL indent={0} active={s3Ran}><span className="text-blue-600">print</span>(student1.greet())</CL>
              </div>
              <RunButton onClick={() => setS3Ran(true)} />
            </div>
            
            <div className="flex flex-col gap-4">
              <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 flex flex-col gap-4">
                <h3 className="font-bold text-slate-600 uppercase tracking-widest text-xs">Execution Flow</h3>
                <div className="font-mono text-sm space-y-2 text-slate-600 bg-slate-50 p-4 rounded-xl border border-slate-200">
                  <div className={s3Ran?"text-blue-600 font-bold":""}>1. student1.greet()</div>
                  <div className={s3Ran?"text-red-500 font-bold":""}>2. self → student1</div>
                  <div className={s3Ran?"text-purple-600 font-bold":""}>3. self.name → "{s3Name}"</div>
                </div>
              </div>
              {s3Ran && <OutputConsole lines={[`Hello ${s3Name}`]} />}
            </div>
          </div>
        </section>

        {/* ═══ SECTION 4: Class vs Instance Variables ═══ */}
        <section>
          <SectionTitle num={4} title="Instance Variables vs Class Variables" />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 flex flex-col gap-5">
              <div className="bg-blue-50/50 p-5 rounded-xl border border-blue-100 leading-loose text-slate-700">
                <CL indent={0}><span className="text-blue-600 font-bold">class</span> Student:</CL>
                <CL indent={1}><span className="text-purple-600">school</span> = <span className="text-amber-600">"{s4School}"</span></CL>
                <div className="h-2" />
                <CL indent={1}><span className="text-blue-600 font-bold">def</span> <span className="text-blue-600">__init__</span>(<span className="text-red-500 font-bold">self</span>, name):</CL>
                <CL indent={2}><span className="text-red-500 font-bold">self</span>.name = name</CL>
                <div className="h-4" />
                <CL indent={0}><span className="text-purple-600">s1</span> = Student(<span className="text-amber-600">"Alice"</span>)</CL>
                <CL indent={0}><span className="text-purple-600">s2</span> = Student(<span className="text-amber-600">"Bob"</span>)</CL>
              </div>

              <div className="border-t border-slate-200 pt-4 mt-2">
                <h3 className="font-bold text-slate-600 uppercase tracking-widest text-xs mb-3">Interactive Challenge</h3>
                <div className="flex gap-2 items-center">
                  <code className="font-bold text-sm text-blue-700">Student.school = </code>
                  <input type="text" value={s4SchoolInp} onChange={e=>setS4SchoolInp(e.target.value)} className="w-32 bg-slate-50 border-2 border-slate-200 rounded-lg p-1.5 font-mono text-sm outline-none focus:border-blue-400" />
                  <button onClick={()=>setS4School(s4SchoolInp)} className="px-3 py-1.5 bg-blue-500 text-white font-bold rounded-lg text-sm hover:bg-blue-600">Update</button>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <ObjectCard title="Student (Class)" attributes={{school: `"${s4School}"`}} isClass />
              <div className="flex gap-4">
                <div className="flex-1"><ObjectCard title="s1" attributes={{name: '"Alice"', 'school (inherited)': `"${s4School}"`}} /></div>
                <div className="flex-1"><ObjectCard title="s2" attributes={{name: '"Bob"', 'school (inherited)': `"${s4School}"`}} /></div>
              </div>
              <Hint show text="Class variables are shared among ALL objects of the class. Instance variables (using self) are unique to each object." />
            </div>
          </div>
        </section>

        {/* ═══ SECTION 5: Student Management ═══ */}
        <section>
          <SectionTitle num={5} title="Student Management Challenge" />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Logic Panel */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 flex flex-col gap-4">
              <h3 className="font-bold text-blue-500 uppercase tracking-widest text-xs">Class Definition</h3>
              <div className="bg-blue-50/50 p-4 rounded-xl border border-blue-100 font-mono text-[10px] text-slate-700">
                <span className="text-blue-600 font-bold">class</span> Student:<br/>
                &nbsp;&nbsp;total = <span className="text-amber-600">0</span><br/>
                &nbsp;&nbsp;<span className="text-blue-600 font-bold">def</span> <span className="text-blue-600">__init__</span>(<span className="text-red-500 font-bold">self</span>, name, marks):<br/>
                &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-red-500 font-bold">self</span>.name = name<br/>
                &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-red-500 font-bold">self</span>.marks = marks<br/>
                &nbsp;&nbsp;&nbsp;&nbsp;Student.total += <span className="text-amber-600">1</span><br/>
                <br/>
                &nbsp;&nbsp;<span className="text-blue-600 font-bold">def</span> <span className="text-blue-600">avg</span>(<span className="text-red-500 font-bold">self</span>):<br/>
                &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-blue-600 font-bold">return</span> <span className="text-blue-600">sum</span>(<span className="text-red-500 font-bold">self</span>.marks)/<span className="text-blue-600">len</span>(<span className="text-red-500 font-bold">self</span>.marks)
              </div>
              <div className="bg-purple-50 border border-purple-200 rounded-lg p-3 text-center">
                <div className="text-xs font-bold text-purple-600 uppercase tracking-widest mb-1">Student.total</div>
                <div className="font-mono text-2xl font-black text-purple-800">{s5Students.length}</div>
              </div>
            </div>

            {/* Object Viewer */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 flex flex-col gap-4">
              <h3 className="font-bold text-emerald-500 uppercase tracking-widest text-xs">Object Viewer</h3>
              
              <div className="space-y-4 max-h-64 overflow-y-auto pr-2">
                {s5Students.map((stu, i) => {
                  const avg = Number(s5Avg(stu.marks));
                  return (
                    <ObjectCard key={i} title={stu.name} attributes={{
                      name: `"${stu.name}"`,
                      marks: `[${stu.marks.join(',')}]`,
                      average: avg.toFixed(1),
                      grade: `"${s5Grade(avg)}"`
                    }} />
                  );
                })}
              </div>

              <div className="mt-auto border-t border-slate-200 pt-4">
                <div className="text-xs font-bold text-slate-500 mb-2">Create New Student Marks</div>
                <div className="flex gap-2">
                  <input type="text" value={s5Marks} onChange={e=>setS5Marks(e.target.value)} className="w-full bg-slate-50 border-2 border-slate-200 rounded-lg p-2 font-mono text-xs outline-none focus:border-emerald-400" placeholder="e.g. 70, 80, 90" />
                  <button onClick={addS5Student} className="px-3 py-1 bg-emerald-500 text-white font-bold rounded-lg text-xs hover:bg-emerald-600 flex items-center gap-1"><Users className="size-3"/> Add</button>
                </div>
              </div>
            </div>

            {/* Grade Logic */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 flex flex-col gap-4">
              <h3 className="font-bold text-amber-500 uppercase tracking-widest text-xs">Grade Logic (update_grade)</h3>
              <div className="flex flex-col gap-2 font-mono text-xs bg-slate-50 p-4 rounded-xl border border-slate-200">
                <div className="flex justify-between items-center bg-white p-2 border rounded shadow-sm">
                  <span className="font-bold">Average &gt;= 90</span> <span className="text-emerald-600 font-bold">→ "A"</span>
                </div>
                <div className="flex justify-between items-center bg-white p-2 border rounded shadow-sm">
                  <span className="font-bold">Average &gt;= 80</span> <span className="text-blue-600 font-bold">→ "B"</span>
                </div>
                <div className="flex justify-between items-center bg-white p-2 border rounded shadow-sm">
                  <span className="font-bold">Else</span> <span className="text-amber-600 font-bold">→ "C"</span>
                </div>
              </div>
              <Hint show text="Modify the marks and add new students to see the dynamically calculated average and grades instantly update for each unique object." />
            </div>

          </div>
        </section>

        {/* ═══ FINAL SANDBOX ═══ */}
        <section className="pt-12 border-t border-slate-200 mt-12 pb-24">
          <div className="text-center space-y-2 mb-8">
            <h2 className="text-3xl font-black text-slate-800">Final Sandbox</h2>
            <p className="text-slate-500">Experiment with classes, constructors, methods, and attributes.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 flex flex-col overflow-hidden">
              <div className="bg-slate-50 border-b border-slate-100 px-4 py-3 font-bold text-xs uppercase tracking-widest text-slate-500 flex justify-between items-center">
                <span>OOP Editor</span>
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
                
                <div className="flex flex-wrap gap-2 mt-4">
                  {[
                    { l: "Basic Class", c: "class Car:\n    def __init__(self, color):\n        self.color = color\n\nc1 = Car('Red')\nprint(c1.color)" },
                    { l: "Class Variables", c: "class User:\n    role = 'Admin'\n    def __init__(self, name):\n        self.name = name\n\nu = User('Alice')\nprint(u.name)\nprint(u.role)" },
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
