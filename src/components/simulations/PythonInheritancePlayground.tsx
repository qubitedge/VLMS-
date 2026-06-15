import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PlayCircle, RotateCcw, Lightbulb, Box, User, ArrowRight, ArrowDown, Activity, Users, Settings, GitBranch, Share2 } from "lucide-react";

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

const HierarchyNode = ({ label, isParent }: { label: string, isParent?: boolean }) => (
  <div className={`px-6 py-2 rounded-xl text-sm font-bold border-2 shadow-sm ${isParent ? "bg-blue-100 border-blue-300 text-blue-800" : "bg-purple-100 border-purple-300 text-purple-800"}`}>
    {label}
  </div>
);

/* ═══════════════════════ MAIN COMPONENT ═══════════════════════ */

export function PythonInheritancePlayground({ expId }: { expId: string }) {

  /* ── SECTION 1: Single Inheritance ── */
  const [s1Class, setS1Class] = useState("Dog");
  const [s1Obj, setS1Obj] = useState("dog");
  const [s1Name, setS1Name] = useState("Rocky");

  /* ── SECTION 2: Method Overriding ── */
  const [s2Class, setS2Class] = useState("Dog");
  const s2Sound = s2Class === "Dog" ? "Bark" : "Meow";
  const [s2Ran, setS2Ran] = useState(false);

  /* ── SECTION 3: super() Constructor ── */
  const [s3Step, setS3Step] = useState(0); // 0=init, 1=dog_init, 2=super_init, 3=animal_init, 4=breed
  const [s3Name, setS3Name] = useState("Rocky");
  const [s3Breed, setS3Breed] = useState("Labrador");

  /* ── SECTION 4: Polymorphism ── */
  const [s4Animals, setS4Animals] = useState(["Dog", "Cat"]);
  const [s4Ran, setS4Ran] = useState(false);

  /* ── SECTION 5: Multilevel & Multiple ── */
  const [s5Type, setS5Type] = useState<"MultiL" | "Constructor" | "MultiP">("MultiL");
  const [s5Step, setS5Step] = useState(0);

  /* ── FINAL SANDBOX ── */
  const [fsCode, setFsCode] = useState("class Animal:\n    def speak(self):\n        return '?'\n\nclass Dog(Animal):\n    def speak(self):\n        return 'Bark'\n\nd = Dog()\nprint(d.speak())");
  const [fsOut, setFsOut] = useState<string[]>([]);

  const runFinal = () => {
    let output: string[] = [];
    try {
      const lines = fsCode.split('\n');
      let vars: Record<string, any> = {};
      let classDefs: Record<string, any> = {};
      let currentClass: string | null = null;

      // Extremely simple parser for the sandbox demonstration
      for (let i = 0; i < lines.length; i++) {
        let line = lines[i];
        let trimmed = line.trim();
        if (!trimmed) continue;

        const classMatch = trimmed.match(/^class\s+(\w+)(?:\((.*?)\))?:$/);
        if (classMatch) {
          currentClass = classMatch[1];
          const parentStr = classMatch[2] || "";
          const parents = parentStr.split(',').map(p=>p.trim()).filter(Boolean);
          classDefs[currentClass] = { parents, methods: {} };
          continue;
        }

        if (currentClass && line.startsWith("    ")) {
           const defMatch = trimmed.match(/^def\s+(\w+)\(.*\):$/);
           if (defMatch) {
             classDefs[currentClass].methods[defMatch[1]] = true;
           }
           const retMatch = trimmed.match(/^return\s+['"](.+)['"]$/);
           if (retMatch && Object.keys(classDefs[currentClass].methods).length) {
             const lastMethod = Object.keys(classDefs[currentClass].methods).pop()!;
             classDefs[currentClass].methods[lastMethod] = retMatch[1];
           }
           continue;
        } else {
           currentClass = null;
        }

        const objMatch = trimmed.match(/^([a-zA-Z_]\w*)\s*=\s*(\w+)\((.*)\)$/);
        if (objMatch && classDefs[objMatch[2]]) {
          vars[objMatch[1]] = { _type: objMatch[2] };
          continue;
        }

        const printMatch = trimmed.match(/^print\((.+)\)$/);
        if (printMatch) {
          const expr = printMatch[1].trim();
          if (expr.includes('.speak()')) {
            const obj = expr.split('.')[0];
            if (vars[obj]) {
              const type = vars[obj]._type;
              let resolved = false;
              let currentTypes = [type];
              while (currentTypes.length && !resolved) {
                 const t = currentTypes.shift()!;
                 if (classDefs[t] && typeof classDefs[t].methods['speak'] === 'string') {
                    output.push(classDefs[t].methods['speak']);
                    resolved = true;
                 } else if (classDefs[t]) {
                    currentTypes.push(...classDefs[t].parents);
                 }
              }
              if (!resolved) output.push("AttributeError");
            }
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
            Python Inheritance & Polymorphism
          </h1>
          <p className="text-lg text-slate-500 font-medium">Interactive Class Hierarchy & Method Visualizer</p>
        </div>

        {/* ═══ SECTION 1: Single Inheritance ═══ */}
        <section>
          <SectionTitle num={1} title="Single Inheritance Explorer" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 flex flex-col gap-5">
              <div className="bg-blue-50/50 p-5 rounded-xl border border-blue-100 leading-loose text-slate-700">
                <CL indent={0}><span className="text-blue-600 font-bold">class</span> Animal:</CL>
                <CL indent={1}><span className="text-blue-600 font-bold">def</span> <span className="text-blue-600">__init__</span>(<span className="text-red-500 font-bold">self</span>, name):</CL>
                <CL indent={2}><span className="text-red-500 font-bold">self</span>.name = name</CL>
                <div className="h-4" />
                <CL indent={0}><span className="text-blue-600 font-bold">class</span> <span className="font-bold underline decoration-purple-400 decoration-2 underline-offset-4 cursor-pointer" onClick={()=>{setS1Class(s=>s==="Dog"?"Cat":"Dog");setS1Obj(s=>s==="dog"?"cat":"dog");}}>{s1Class}</span>(Animal):</CL>
                <CL indent={1}><span className="text-blue-600 font-bold">pass</span></CL>
                <div className="h-4" />
                <CL indent={0}><span className="text-purple-600">{s1Obj}</span> = {s1Class}(<span className="text-amber-600">"{s1Name}"</span>)</CL>
                <CL indent={0}><span className="text-blue-600">print</span>({s1Obj}.name)</CL>
              </div>
              <Hint show text={`The ${s1Class} class inherits the __init__ method and 'name' attribute directly from Animal! Click the underlined ${s1Class} class to change it.`} />
            </div>

            <div className="flex flex-col gap-4">
              <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 flex flex-col items-center justify-center gap-4 flex-1">
                <h3 className="font-bold text-slate-600 uppercase tracking-widest text-xs w-full text-left">Hierarchy Viewer</h3>
                <HierarchyNode label="Animal" isParent />
                <ArrowDown className="text-slate-300 size-6" />
                <HierarchyNode label={s1Class} />
                
                <div className="mt-6 w-full max-w-[200px] border-2 border-purple-200 rounded-xl overflow-hidden shadow-sm">
                  <div className="bg-purple-100 px-4 py-2 text-sm font-bold text-purple-800 border-b border-purple-200 text-center">{s1Obj} (Object)</div>
                  <div className="bg-white p-3 font-mono text-sm flex justify-between">
                    <span className="text-slate-500 font-bold">name</span>
                    <span className="text-slate-800">"{s1Name}"</span>
                  </div>
                </div>
              </div>
              <OutputConsole lines={[s1Name]} />
            </div>
          </div>
        </section>

        {/* ═══ SECTION 2: Method Overriding ═══ */}
        <section>
          <SectionTitle num={2} title="Method Overriding Playground" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 flex flex-col gap-5">
              <div className="bg-blue-50/50 p-5 rounded-xl border border-blue-100 leading-loose text-slate-700">
                <CL indent={0}><span className="text-blue-600 font-bold">class</span> Animal:</CL>
                <CL indent={1}><span className="text-blue-600 font-bold">def</span> <span className="text-blue-600">speak</span>(<span className="text-red-500 font-bold">self</span>):</CL>
                <CL indent={2}><span className="text-blue-600 font-bold">return</span> <span className="text-amber-600">"Animal Sound"</span></CL>
                <div className="h-4" />
                <CL indent={0} active={s2Ran}><span className="text-blue-600 font-bold">class</span> {s2Class}(Animal):</CL>
                <CL indent={1} active={s2Ran}><span className="text-blue-600 font-bold">def</span> <span className="text-blue-600">speak</span>(<span className="text-red-500 font-bold">self</span>):</CL>
                <CL indent={2} active={s2Ran}><span className="text-blue-600 font-bold">return</span> <span className="text-amber-600">"{s2Sound}"</span></CL>
                <div className="h-4" />
                <CL indent={0}><span className="text-purple-600">obj</span> = {s2Class}()</CL>
                <CL indent={0}><span className="text-blue-600">print</span>(obj.speak())</CL>
              </div>

              <div className="flex gap-2">
                <RunButton onClick={() => setS2Ran(true)} />
                <button onClick={() => {setS2Class(s=>s==="Dog"?"Cat":"Dog");setS2Ran(false);}} className="px-4 py-2.5 rounded-xl border-2 border-slate-200 text-slate-600 font-bold text-sm hover:bg-slate-50">Change to {s2Class === "Dog" ? "Cat" : "Dog"}</button>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 flex-1 flex flex-col gap-6">
                <h3 className="font-bold text-slate-600 uppercase tracking-widest text-xs flex items-center gap-2"><GitBranch className="size-4" /> Method Resolution Viewer</h3>
                <div className="flex flex-col gap-3 font-mono text-sm bg-slate-50 p-4 rounded-xl border border-slate-200">
                  <div className={`flex justify-between items-center p-2 rounded transition-all ${s2Ran ? "bg-white border text-slate-400 line-through decoration-red-400 decoration-2" : ""}`}>
                    <span>Animal.speak()</span>
                    {s2Ran && <span className="text-red-500 font-bold">✗ Skipped</span>}
                  </div>
                  <div className={`flex justify-between items-center p-2 rounded transition-all ${s2Ran ? "bg-emerald-50 border border-emerald-200 text-emerald-700 font-bold" : ""}`}>
                    <span>{s2Class}.speak()</span>
                    {s2Ran && <span className="text-emerald-500 font-bold">✓ Executed</span>}
                  </div>
                </div>
                <Hint show text="Python looks for methods in the child class first. If it finds it, it overrides (replaces) the parent's version!" />
              </div>
              {s2Ran && <OutputConsole lines={[s2Sound]} />}
            </div>
          </div>
        </section>

        {/* ═══ SECTION 3: super() Constructor ═══ */}
        <section>
          <SectionTitle num={3} title="super() Constructor Visualizer" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 flex flex-col gap-4">
              <div className="bg-blue-50/50 p-5 rounded-xl border border-blue-100 leading-loose text-slate-700">
                <CL indent={0}><span className="text-blue-600 font-bold">class</span> Animal:</CL>
                <CL indent={1} active={s3Step===3}><span className="text-blue-600 font-bold">def</span> <span className="text-blue-600">__init__</span>(<span className="text-red-500 font-bold">self</span>, name):</CL>
                <CL indent={2} active={s3Step===3}><span className="text-red-500 font-bold">self</span>.name = name</CL>
                <div className="h-4" />
                <CL indent={0}><span className="text-blue-600 font-bold">class</span> Dog(Animal):</CL>
                <CL indent={1} active={s3Step===1}><span className="text-blue-600 font-bold">def</span> <span className="text-blue-600">__init__</span>(<span className="text-red-500 font-bold">self</span>, name, breed):</CL>
                <CL indent={2} active={s3Step===2}><span className="text-blue-600 font-bold">super</span>().<span className="text-blue-600">__init__</span>(name)</CL>
                <CL indent={2} active={s3Step===4}><span className="text-red-500 font-bold">self</span>.breed = breed</CL>
                <div className="h-4" />
                <CL indent={0}><span className="text-purple-600">dog</span> = Dog(<span className="text-amber-600">"{s3Name}"</span>, <span className="text-amber-600">"{s3Breed}"</span>)</CL>
              </div>
              <RunButton onClick={() => setS3Step(s=>s===4?1:s+1)} label={s3Step===0?"Start Constructor Chain":"Next Step"} icon={s3Step===0?PlayCircle:ArrowRight} />
            </div>

            <div className="flex flex-col gap-4">
              <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 flex-1 flex flex-col gap-6">
                <h3 className="font-bold text-slate-600 uppercase tracking-widest text-xs flex items-center gap-2"><Share2 className="size-4" /> Constructor Chain</h3>
                
                <div className="flex justify-center items-center gap-4 font-mono text-sm">
                  <div className={`p-3 rounded-xl border-2 font-bold ${s3Step>=1?"bg-purple-100 border-purple-300 text-purple-800":"bg-slate-50 border-slate-200 text-slate-400"}`}>Dog.__init__()</div>
                  <ArrowRight className={`size-5 ${s3Step>=2?"text-blue-400":"text-slate-200"}`} />
                  <div className={`p-3 rounded-xl border-2 font-bold ${s3Step>=3?"bg-blue-100 border-blue-300 text-blue-800":"bg-slate-50 border-slate-200 text-slate-400"}`}>Animal.__init__()</div>
                </div>

                <div className="mt-4 w-full border-2 border-purple-200 rounded-xl overflow-hidden shadow-sm">
                  <div className="bg-purple-100 px-4 py-2 text-sm font-bold text-purple-800 border-b border-purple-200">Memory State: dog</div>
                  <div className="bg-white p-3 font-mono text-sm flex flex-col gap-2">
                    <div className="flex justify-between border-b border-slate-100 pb-2">
                      <span className="text-slate-500 font-bold">name</span>
                      <span className={s3Step>=3?"text-slate-800 font-bold":"text-slate-300 italic"}>{s3Step>=3?`"${s3Name}"`:"Pending..."}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500 font-bold">breed</span>
                      <span className={s3Step>=4?"text-slate-800 font-bold":"text-slate-300 italic"}>{s3Step>=4?`"${s3Breed}"`:"Pending..."}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ═══ SECTION 4: Polymorphism ═══ */}
        <section>
          <SectionTitle num={4} title="Polymorphism Playground" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 flex flex-col gap-5">
              <div className="bg-blue-50/50 p-5 rounded-xl border border-blue-100 leading-loose text-slate-700">
                <CL indent={0}><span className="text-blue-600 font-bold">def</span> <span className="text-blue-600">make_sound</span>(animal):</CL>
                <CL indent={1}><span className="text-blue-600">print</span>(animal.speak())</CL>
                <div className="h-4" />
                {s4Animals.map((anim, i) => (
                  <CL key={i} indent={0} active={s4Ran}><span className="text-blue-600">make_sound</span>({anim}())</CL>
                ))}
              </div>
              <div className="flex gap-2">
                <RunButton onClick={() => setS4Ran(true)} />
                <button onClick={() => {if(!s4Animals.includes("Cow")) setS4Animals([...s4Animals, "Cow"]); setS4Ran(false);}} className="px-4 py-2.5 rounded-xl border-2 border-slate-200 text-slate-600 font-bold text-sm hover:bg-slate-50">Add Cow</button>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 flex flex-col gap-4">
                <h3 className="font-bold text-slate-600 uppercase tracking-widest text-xs flex items-center gap-2"><Activity className="size-4" /> Polymorphism Visualizer</h3>
                <div className="flex flex-col gap-3 font-mono text-sm bg-slate-50 p-4 rounded-xl border border-slate-200">
                  <div className="font-bold text-blue-600 mb-2 border-b border-slate-200 pb-2">Function: make_sound()</div>
                  {s4Animals.map((anim, i) => (
                    <div key={i} className="flex justify-between items-center bg-white p-2 border border-slate-200 rounded">
                      <span>{anim} Object</span>
                      <ArrowRight className="size-4 text-slate-300" />
                      <span className="font-bold text-purple-600">{anim === "Dog" ? "Bark" : anim === "Cat" ? "Meow" : "Moo"}</span>
                    </div>
                  ))}
                </div>
                <Hint show text="Polymorphism: One interface (make_sound), multiple behaviors depending on the exact object type passed in!" />
              </div>
              {s4Ran && <OutputConsole lines={s4Animals.map(a => a === "Dog" ? "Bark" : a === "Cat" ? "Meow" : "Moo")} />}
            </div>
          </div>
        </section>

        {/* ═══ SECTION 5: Multilevel & Multiple ═══ */}
        <section>
          <SectionTitle num={5} title="Multilevel & Multiple Inheritance" />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 flex flex-col gap-4">
              <h3 className="font-bold text-blue-500 uppercase tracking-widest text-xs">Part A: Multilevel</h3>
              <div className="bg-blue-50/50 p-4 rounded-xl border border-blue-100 font-mono text-[11px] text-slate-700">
                <span className="text-blue-600 font-bold">class</span> Animal: <span className="text-blue-600 font-bold">pass</span><br/>
                <span className="text-blue-600 font-bold">class</span> Mammal(Animal): <span className="text-blue-600 font-bold">pass</span><br/>
                <span className="text-blue-600 font-bold">class</span> Dog(Mammal): <span className="text-blue-600 font-bold">pass</span>
              </div>
              <div className="flex flex-col items-center gap-2 flex-1 justify-center py-4">
                <HierarchyNode label="Animal" isParent />
                <ArrowDown className="text-slate-300 size-4" />
                <HierarchyNode label="Mammal" />
                <ArrowDown className="text-slate-300 size-4" />
                <HierarchyNode label="Dog" />
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 flex flex-col gap-4">
              <h3 className="font-bold text-purple-500 uppercase tracking-widest text-xs">Part B: Constructor Chain</h3>
              <div className="bg-purple-50/50 p-4 rounded-xl border border-purple-100 font-mono text-[10px] text-slate-700">
                <span className="text-blue-600 font-bold">class</span> Mammal(Animal):<br/>
                &nbsp;&nbsp;<span className="text-blue-600 font-bold">def</span> <span className="text-blue-600">__init__</span>(<span className="text-red-500 font-bold">self</span>):<br/>
                &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-blue-600 font-bold">super</span>().<span className="text-blue-600">__init__</span>()<br/>
                &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-blue-600">print</span>(<span className="text-amber-600">"Mammal"</span>)<br/>
                <br/>
                <span className="text-slate-400"># Dog does the same</span><br/>
                d = Dog()
              </div>
              <div className="bg-slate-800 p-3 rounded-xl border border-slate-700 font-mono text-[11px] text-emerald-400 mt-auto">
                Animal<br/>Mammal<br/>Dog
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 flex flex-col gap-4">
              <h3 className="font-bold text-emerald-500 uppercase tracking-widest text-xs">Part C: Multiple</h3>
              <div className="bg-emerald-50/50 p-4 rounded-xl border border-emerald-100 font-mono text-[11px] text-slate-700">
                <span className="text-blue-600 font-bold">class</span> Flyer: <span className="text-blue-600 font-bold">pass</span><br/>
                <span className="text-blue-600 font-bold">class</span> Swimmer: <span className="text-blue-600 font-bold">pass</span><br/>
                <br/>
                <span className="text-blue-600 font-bold">class</span> Duck(Flyer, Swimmer):<br/>
                &nbsp;&nbsp;<span className="text-blue-600 font-bold">pass</span>
              </div>
              <div className="flex flex-col items-center gap-4 flex-1 justify-center py-4">
                <div className="flex gap-4">
                  <HierarchyNode label="Flyer" isParent />
                  <HierarchyNode label="Swimmer" isParent />
                </div>
                <div className="flex gap-16 justify-center">
                  <ArrowDown className="text-slate-300 size-4 rotate-[30deg]" />
                  <ArrowDown className="text-slate-300 size-4 -rotate-[30deg]" />
                </div>
                <HierarchyNode label="Duck" />
              </div>
            </div>

          </div>
        </section>

        {/* ═══ FINAL SANDBOX ═══ */}
        <section className="pt-12 border-t border-slate-200 mt-12 pb-24">
          <div className="text-center space-y-2 mb-8">
            <h2 className="text-3xl font-black text-slate-800">Final Sandbox</h2>
            <p className="text-slate-500">Experiment with inheritance, overriding, and polymorphism.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 flex flex-col overflow-hidden">
              <div className="bg-slate-50 border-b border-slate-100 px-4 py-3 font-bold text-xs uppercase tracking-widest text-slate-500 flex justify-between items-center">
                <span>OOP Inheritance Editor</span>
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
