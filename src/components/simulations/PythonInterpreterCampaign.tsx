import React, { useState, useEffect } from "react";
import { 
  Terminal, ArrowRight, Zap, Satellite, Cpu, 
  Monitor, Code, Star, CheckCircle2, Play, 
  Database, FileCode, Server, Hexagon, Shield, Radio, Activity,
  Globe, Blocks, FlaskConical, LayoutGrid, BrainCircuit, Rocket
} from "lucide-react";

type CampaignProps = {
  expId: string;
};

export function PythonInterpreterCampaign({ expId }: CampaignProps) {
  const [stage, setStage] = useState(0);
  const [xp, setXp] = useState(0);
  const [badges, setBadges] = useState<string[]>([]);
  const [toastMsg, setToastMsg] = useState<{text: string, type: 'success' | 'error' | 'xp'} | null>(null);

  const showToast = (text: string, type: 'success' | 'error' | 'xp' = 'success') => {
    setToastMsg({ text, type });
    setTimeout(() => setToastMsg(null), 3000);
  };

  const addXp = (amount: number, reason: string) => {
    setXp(x => x + amount);
    showToast(`+${amount} XP: ${reason}`, 'xp');
  };

  const unlockBadge = (badge: string) => {
    if (!badges.includes(badge)) {
      setBadges(b => [...b, badge]);
      setTimeout(() => showToast(`🏆 Badge Unlocked: ${badge}`, 'success'), 1500);
    }
  };

  const nextStage = () => {
    setStage(s => s + 1);
  };

  // ---------------------------------------------------------
  // STAGE 0/1: Arrival
  // ---------------------------------------------------------
  const renderStage1 = () => (
    <div className="flex flex-col items-center justify-center h-full p-8 text-center animate-in fade-in zoom-in duration-700">
      <Satellite className="size-32 text-red-500 mb-8 animate-pulse drop-shadow-[0_0_30px_rgba(239,68,68,0.6)]" />
      <h1 className="text-4xl font-black text-white mb-4 tracking-wider uppercase">Mission Python: Launch Station</h1>
      <p className="text-xl text-slate-300 max-w-2xl mb-8 leading-relaxed">
        Welcome, Commander. The PY-1 satellite cannot communicate with Earth. Its communication systems are offline. 
        To restore communication, you must learn how Python sends information using the <code className="text-cyan-400 bg-cyan-950/50 px-2 py-1 rounded">print()</code> function.
      </p>
      
      <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl w-full max-w-md mb-8">
        <div className="flex justify-between items-center mb-2">
          <span className="text-slate-400 font-bold uppercase tracking-widest text-sm">Mission Progress</span>
          <span className="text-cyan-400 font-mono font-bold">0%</span>
        </div>
        <div className="w-full h-3 bg-slate-800 rounded-full overflow-hidden">
          <div className="h-full bg-cyan-500 w-[0%]" />
        </div>
      </div>

      <button 
        onClick={() => {
          addXp(50, "Mission Started");
          unlockBadge("Python Cadet");
          nextStage();
        }}
        className="px-8 py-4 bg-cyan-600 hover:bg-cyan-500 text-white font-black rounded-lg text-lg flex items-center gap-3 transition-transform hover:scale-105 active:scale-95"
      >
        <Play className="size-6" /> START MISSION
      </button>
    </div>
  );

  // ---------------------------------------------------------
  // STAGE 2: Python City (Sorting)
  // ---------------------------------------------------------
  const [s2Matches, setS2Matches] = useState<Record<string, string>>({});
  const s2Items = [
    { id: "comp", text: "Requires Compilation", correct: "c" },
    { id: "curly", text: "Uses Curly Braces", correct: "c" },
    { id: "ind", text: "Uses Indentation", correct: "py" },
    { id: "dyn", text: "Dynamic Typing", correct: "py" },
    { id: "main", text: "Main Function Required", correct: "c" },
  ];

  const handleS2Click = (item: any, target: string) => {
    if (item.correct === target) {
      setS2Matches(prev => ({ ...prev, [item.id]: target }));
      showToast("Correct!", "success");
      if (Object.keys(s2Matches).length + 1 === s2Items.length) {
        addXp(100, "City Restored");
        setTimeout(nextStage, 2000);
      }
    } else {
      showToast("Incorrect! Think about how Python is simpler.", "error");
    }
  };

  const renderStage2 = () => {
    const isComplete = Object.keys(s2Matches).length === s2Items.length;
    return (
      <div className="flex flex-col h-full gap-6 p-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-cyan-400 flex items-center justify-center gap-2">
            <Hexagon className="size-6" /> Stage 2: Python City
          </h2>
          <p className="text-slate-400 mt-2">Sort the characteristics to power up the language buildings.</p>
        </div>

        <div className="flex-1 flex gap-8">
          <div className={`flex-1 rounded-2xl border-2 p-6 flex flex-col transition-colors ${isComplete ? 'border-green-500 bg-green-950/20' : 'border-slate-700 bg-slate-900'}`}>
            <h3 className="text-xl font-bold text-center text-slate-300 mb-6">C / Java Tower</h3>
            <div className="space-y-3 flex-1">
              {s2Items.filter(i => s2Matches[i.id] === 'c').map(i => (
                <div key={i.id} className="bg-slate-800 p-3 rounded text-center text-slate-300">{i.text}</div>
              ))}
            </div>
            {!isComplete && (
              <div className="flex flex-wrap gap-2 justify-center mt-4">
                 {s2Items.filter(i => !s2Matches[i.id]).map(i => (
                   <button key={i.id} onClick={() => handleS2Click(i, 'c')} className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 rounded text-sm">&lt; Send to C/Java</button>
                 ))}
              </div>
            )}
          </div>

          <div className={`flex-1 rounded-2xl border-2 p-6 flex flex-col transition-colors ${isComplete ? 'border-cyan-500 bg-cyan-950/20' : 'border-slate-700 bg-slate-900'}`}>
            <h3 className="text-xl font-bold text-center text-cyan-400 mb-6">Python Innovation Hub</h3>
            <div className="space-y-3 flex-1">
              {s2Items.filter(i => s2Matches[i.id] === 'py').map(i => (
                <div key={i.id} className="bg-cyan-900/40 border border-cyan-800 p-3 rounded text-center text-cyan-300">{i.text}</div>
              ))}
            </div>
            {!isComplete && (
              <div className="flex flex-wrap gap-2 justify-center mt-4">
                 {s2Items.filter(i => !s2Matches[i.id]).map(i => (
                   <button key={i.id} onClick={() => handleS2Click(i, 'py')} className="px-3 py-1.5 bg-cyan-900/40 hover:bg-cyan-800 border border-cyan-800 rounded text-sm text-cyan-300">Send to Python &gt;</button>
                 ))}
              </div>
            )}
          </div>
        </div>

        {/* Unsorted Items Pool */}
        {!isComplete && (
          <div className="bg-slate-800 p-4 rounded-xl flex flex-wrap gap-4 justify-center items-center">
            <span className="text-slate-400 font-bold uppercase tracking-widest text-sm mr-4">Data Packets:</span>
            {s2Items.filter(i => !s2Matches[i.id]).map(i => (
              <div key={i.id} className="bg-slate-700 border border-slate-600 px-4 py-2 rounded-lg font-medium shadow-lg animate-pulse">
                {i.text}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  // ---------------------------------------------------------
  // STAGE 3: Interpreter Tunnel
  // ---------------------------------------------------------
  const [s3Step, setS3Step] = useState(0);
  const s3Nodes = [
    { label: "Source Reader", desc: "Scans the characters of code." },
    { label: "Bytecode Generator", desc: "Converts code to internal bytecode." },
    { label: "Execution Engine", desc: "Runs the bytecode instructions." },
    { label: "Output Gateway", desc: "Sends results to console." }
  ];

  const handleS3Next = () => {
    if (s3Step < 3) {
      setS3Step(s => s + 1);
    } else {
      unlockBadge("Interpreter Explorer");
      addXp(100, "Tunnel Completed");
      nextStage();
    }
  };

  const renderStage3 = () => (
    <div className="flex flex-col h-full gap-6 p-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-fuchsia-400 flex items-center justify-center gap-2">
          <Activity className="size-6" /> Stage 3: Inside the Interpreter Tunnel
        </h2>
        <p className="text-slate-400 mt-2">Python executes code step-by-step. Guide the code packet through the tunnel.</p>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center relative">
        <div className="w-full max-w-4xl h-48 bg-slate-900/80 rounded-full border-4 border-slate-800 relative flex items-center justify-between px-12 overflow-hidden shadow-[inset_0_0_50px_rgba(0,0,0,0.5)]">
          {/* Packet */}
          <div 
            className="absolute h-16 bg-fuchsia-500 rounded-full shadow-[0_0_30px_rgba(217,70,239,0.8)] flex items-center justify-center px-6 transition-all duration-1000 z-10"
            style={{ 
              left: `calc(${10 + (s3Step * 25)}% - 60px)`,
              width: '120px'
            }}
          >
            <span className="font-mono font-bold text-white whitespace-nowrap text-xs">print("Hi")</span>
          </div>

          {/* Nodes */}
          {s3Nodes.map((n, i) => (
            <div key={i} className="flex flex-col items-center relative z-0">
              <div className={`size-12 rounded-full border-4 transition-colors duration-500 flex items-center justify-center ${s3Step >= i ? 'border-fuchsia-500 bg-fuchsia-950 shadow-[0_0_20px_rgba(217,70,239,0.4)]' : 'border-slate-700 bg-slate-800'}`}>
                {s3Step > i ? <CheckCircle2 className="size-6 text-fuchsia-500" /> : <div className="size-3 bg-slate-500 rounded-full" />}
              </div>
              <div className="absolute top-16 text-center w-32">
                <div className={`font-bold text-sm ${s3Step >= i ? 'text-fuchsia-400' : 'text-slate-500'}`}>{n.label}</div>
                {s3Step === i && <div className="text-xs text-slate-400 mt-1 animate-in slide-in-from-top-2">{n.desc}</div>}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-center">
        <button onClick={handleS3Next} className="px-8 py-3 bg-fuchsia-600 hover:bg-fuchsia-500 text-white font-bold rounded-lg flex items-center gap-2 text-lg transition-transform active:scale-95">
          {s3Step < 3 ? 'Advance Code Packet' : 'Exit Tunnel'} <ArrowRight className="size-5" />
        </button>
      </div>
    </div>
  );

  // ---------------------------------------------------------
  // STAGE 4: Print Function Factory
  // ---------------------------------------------------------
  const [s4Input, setS4Input] = useState<string | null>(null);
  
  const handleS4Feed = (val: string) => {
    setS4Input(val);
    setTimeout(() => {
      addXp(50, "Data Processed");
      if (val === "Hello World") {
        setTimeout(nextStage, 1500);
      }
    }, 1500);
  };

  const renderStage4 = () => (
    <div className="flex flex-col h-full gap-6 p-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center justify-center gap-2">
          <Blocks className="size-6" /> Stage 4: Print Function Factory
        </h2>
        <p className="text-slate-400 mt-2">Feed data into the print() machine to generate formatted output.</p>
      </div>

      <div className="flex-1 flex items-center justify-center gap-8">
        {/* Input Items */}
        <div className="flex flex-col gap-4">
          <button onClick={() => handleS4Feed("42")} disabled={!!s4Input} className="bg-slate-800 hover:bg-slate-700 p-4 rounded-xl border border-slate-600 font-mono text-emerald-400 font-bold transition-all hover:scale-105 disabled:opacity-50">42 (Number)</button>
          <button onClick={() => handleS4Feed("True")} disabled={!!s4Input} className="bg-slate-800 hover:bg-slate-700 p-4 rounded-xl border border-slate-600 font-mono text-emerald-400 font-bold transition-all hover:scale-105 disabled:opacity-50">True (Boolean)</button>
          <button onClick={() => handleS4Feed("Hello World")} disabled={!!s4Input} className="bg-emerald-900 hover:bg-emerald-800 p-4 rounded-xl border border-emerald-600 font-mono text-emerald-300 font-bold shadow-[0_0_15px_rgba(16,185,129,0.3)] transition-all hover:scale-105 disabled:opacity-50">"Hello World" (String)</button>
        </div>

        {/* Machine */}
        <div className="bg-slate-900 border-4 border-slate-700 rounded-3xl p-8 w-64 h-64 flex flex-col items-center justify-center relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 w-full bg-slate-800 py-2 text-center font-black text-slate-500 tracking-widest border-b border-slate-700">print() MACHINE</div>
          <div className="flex gap-2 mb-4 mt-8">
            <div className={`w-3 h-8 rounded-full ${s4Input ? 'bg-emerald-500 animate-pulse' : 'bg-slate-700'}`} />
            <div className={`w-3 h-8 rounded-full ${s4Input ? 'bg-emerald-500 animate-pulse delay-75' : 'bg-slate-700'}`} />
            <div className={`w-3 h-8 rounded-full ${s4Input ? 'bg-emerald-500 animate-pulse delay-150' : 'bg-slate-700'}`} />
          </div>
          <div className="font-mono text-slate-400 text-sm">Processing...</div>
        </div>

        {/* Output */}
        <div className="flex flex-col items-center">
          <div className="text-slate-500 font-bold uppercase tracking-widest text-sm mb-4">Console Screen</div>
          <div className="w-64 h-48 bg-black border-2 border-slate-800 rounded-xl p-4 font-mono text-emerald-400 text-lg shadow-[inset_0_0_20px_rgba(0,0,0,1)] flex items-center justify-center">
            {s4Input ? (
              <span className="animate-in fade-in zoom-in duration-1000 delay-500 fill-mode-both">{s4Input}</span>
            ) : (
              <span className="text-slate-800">_</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  // ---------------------------------------------------------
  // STAGE 5: Interactive vs Script Mode
  // ---------------------------------------------------------
  const [s5Matches, setS5Matches] = useState<Record<string, string>>({});
  const s5Items = [
    { id: "1", text: "Quick Math Testing", correct: "int" },
    { id: "2", text: "Saving a Large Project", correct: "scr" },
    { id: "3", text: "Line-by-line Debugging", correct: "int" },
    { id: "4", text: "Running a Web Server", correct: "scr" },
  ];

  const handleS5Click = (item: any, target: string) => {
    if (item.correct === target) {
      setS5Matches(prev => ({ ...prev, [item.id]: target }));
      showToast("Correct Sort!", "success");
      if (Object.keys(s5Matches).length + 1 === s5Items.length) {
        unlockBadge("Speed Tester");
        addXp(100, "Modes Mastered");
        setTimeout(nextStage, 2000);
      }
    } else {
      showToast("Incorrect Mode. Try again.", "error");
    }
  };

  const renderStage5 = () => {
    const isComplete = Object.keys(s5Matches).length === s5Items.length;
    return (
      <div className="flex flex-col h-full gap-6 p-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-orange-400 flex items-center justify-center gap-2">
            <LayoutGrid className="size-6" /> Stage 5: Interactive vs Script Mode
          </h2>
          <p className="text-slate-400 mt-2">Sort the actions into the correct Python execution mode.</p>
        </div>

        <div className="flex-1 flex gap-8">
          <div className={`flex-[1.5] rounded-2xl border-2 p-6 flex flex-col transition-colors ${isComplete ? 'border-orange-500 bg-orange-950/20' : 'border-slate-700 bg-slate-900'}`}>
            <h3 className="text-xl font-bold text-orange-400 mb-2 flex items-center gap-2"><Terminal className="size-5" /> Interactive Mode</h3>
            <p className="text-xs text-slate-400 mb-6 font-mono">&gt;&gt;&gt; Executes instantly</p>
            <div className="space-y-3 flex-1">
              {s5Items.filter(i => s5Matches[i.id] === 'int').map(i => (
                <div key={i.id} className="bg-orange-900/40 border border-orange-800 p-3 rounded text-orange-300">{i.text}</div>
              ))}
            </div>
          </div>

          <div className="flex-[1] flex flex-col gap-3 justify-center items-center bg-slate-800/50 p-4 rounded-xl border border-slate-800">
             <div className="text-slate-500 text-xs font-bold uppercase tracking-widest mb-2">Unsorted Scenarios</div>
             {s5Items.filter(i => !s5Matches[i.id]).map(i => (
               <div key={i.id} className="bg-slate-700 w-full p-3 rounded-lg text-center font-medium flex flex-col gap-2">
                 <span className="text-white">{i.text}</span>
                 <div className="flex gap-2 mt-2">
                   <button onClick={()=>handleS5Click(i, 'int')} className="flex-1 py-1.5 bg-orange-900/50 hover:bg-orange-800 text-orange-300 rounded text-xs">&lt; Interactive</button>
                   <button onClick={()=>handleS5Click(i, 'scr')} className="flex-1 py-1.5 bg-blue-900/50 hover:bg-blue-800 text-blue-300 rounded text-xs">Script &gt;</button>
                 </div>
               </div>
             ))}
          </div>

          <div className={`flex-[1.5] rounded-2xl border-2 p-6 flex flex-col transition-colors ${isComplete ? 'border-blue-500 bg-blue-950/20' : 'border-slate-700 bg-slate-900'}`}>
            <h3 className="text-xl font-bold text-blue-400 mb-2 flex items-center gap-2"><FileCode className="size-5" /> Script Mode</h3>
            <p className="text-xs text-slate-400 mb-6 font-mono">python script.py (Runs whole file)</p>
            <div className="space-y-3 flex-1">
              {s5Items.filter(i => s5Matches[i.id] === 'scr').map(i => (
                <div key={i.id} className="bg-blue-900/40 border border-blue-800 p-3 rounded text-blue-300">{i.text}</div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  // ---------------------------------------------------------
  // STAGE 6: Separator & Newline Lab (Combining 7 & 8)
  // ---------------------------------------------------------
  const [s6Sep, setS6Sep] = useState(" ");
  const [s6End, setS6End] = useState("\\n");
  const [s6Complete, setS6Complete] = useState(false);

  const checkS6 = () => {
    if (s6Sep === "-" && s6End === " ") {
      setS6Complete(true);
      unlockBadge("Separator Scientist");
      addXp(150, "Laboratory Configured");
      setTimeout(nextStage, 2500);
    }
  };

  const renderStage6 = () => (
    <div className="flex flex-col h-full gap-6 p-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-yellow-400 flex items-center justify-center gap-2">
          <FlaskConical className="size-6" /> Stage 6: Format Laboratory
        </h2>
        <p className="text-slate-400 mt-2">Adjust the <code>sep</code> and <code>end</code> parameters. Target: <code>Hello-World Earth</code> on one line.</p>
      </div>

      <div className="flex-1 flex gap-8">
        <div className="flex-[1.5] bg-slate-900 rounded-2xl border border-slate-700 p-8 flex flex-col">
           <h3 className="text-slate-500 font-bold uppercase tracking-widest mb-6">Reactor Controls</h3>
           
           <div className="space-y-8">
             <div>
               <label className="block text-slate-300 font-bold mb-2">Separator (sep)</label>
               <div className="flex gap-3">
                 {[" ", "-", "*", ","].map(val => (
                   <button key={val} onClick={() => {setS6Sep(val); setTimeout(checkS6,100)}} className={`w-12 h-12 rounded-xl text-xl font-mono flex items-center justify-center transition-all ${s6Sep === val ? 'bg-yellow-500 text-slate-900 font-black scale-110' : 'bg-slate-800 text-slate-400 hover:bg-slate-700'}`}>
                     {val === " " ? "␣" : val}
                   </button>
                 ))}
               </div>
               <p className="text-xs text-slate-500 mt-2">Separates multiple values in print.</p>
             </div>

             <div>
               <label className="block text-slate-300 font-bold mb-2">Line Ending (end)</label>
               <div className="flex gap-3">
                 {["\\n", " ", "-", ""].map(val => (
                   <button key={val} onClick={() => {setS6End(val); setTimeout(checkS6,100)}} className={`px-4 h-12 rounded-xl text-lg font-mono flex items-center justify-center transition-all ${s6End === val ? 'bg-indigo-500 text-white font-black scale-110' : 'bg-slate-800 text-slate-400 hover:bg-slate-700'}`}>
                     {val === " " ? "␣" : val === "" ? "Empty" : val}
                   </button>
                 ))}
               </div>
               <p className="text-xs text-slate-500 mt-2">Appended after printing values.</p>
             </div>
           </div>
        </div>

        <div className="flex-1 flex flex-col gap-4">
           <div className="bg-slate-900 p-4 rounded-xl border border-slate-700 font-mono text-sm">
             <div className="text-slate-500 mb-2">Code:</div>
             <div className="text-blue-300">print(<span className="text-green-300">"Hello"</span>, <span className="text-green-300">"World"</span>, sep=<span className="text-yellow-300">"{s6Sep}"</span>, end=<span className="text-yellow-300">"{s6End}"</span>)</div>
             <div className="text-blue-300">print(<span className="text-green-300">"Earth"</span>)</div>
           </div>

           <div className="bg-black flex-1 rounded-xl border-2 border-slate-800 p-6 flex flex-col relative overflow-hidden">
             <div className="text-slate-600 font-bold uppercase tracking-widest text-xs mb-4">Live Output</div>
             <div className={`font-mono text-xl whitespace-pre-wrap ${s6Complete ? 'text-green-400 animate-pulse' : 'text-slate-300'}`}>
               {`Hello${s6Sep}World${s6End === '\\n' ? '\n' : s6End}Earth`}
             </div>
             
             {s6Complete && (
               <div className="absolute inset-0 bg-green-500/10 flex items-center justify-center backdrop-blur-sm animate-in fade-in duration-500">
                  <div className="bg-green-900 text-green-300 px-6 py-3 rounded-full font-bold shadow-2xl flex items-center gap-2">
                    <CheckCircle2 className="size-5" /> Target Match!
                  </div>
               </div>
             )}
           </div>
        </div>
      </div>
    </div>
  );

  // ---------------------------------------------------------
  // STAGE 7: Memory Observatory
  // ---------------------------------------------------------
  const [s7Step, setS7Step] = useState(0);

  const renderStage7 = () => (
    <div className="flex flex-col h-full gap-6 p-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-pink-400 flex items-center justify-center gap-2">
          <BrainCircuit className="size-6" /> Stage 7: Memory Observatory
        </h2>
        <p className="text-slate-400 mt-2">Observe how standard printing interacts with computer memory.</p>
      </div>

      <div className="flex-1 flex gap-8">
        <div className="flex-[1] flex flex-col gap-4 justify-center">
          <div className={`bg-slate-900 border-2 rounded-xl p-6 transition-colors ${s7Step === 0 ? 'border-pink-500 shadow-[0_0_20px_rgba(244,114,182,0.2)]' : 'border-slate-800 opacity-50'}`}>
             <h3 className="text-slate-400 font-mono text-sm mb-4">Snippet A</h3>
             <code className="text-green-400 text-lg">print("Hello World")</code>
             {s7Step === 0 && (
               <button onClick={()=>setS7Step(1)} className="mt-6 w-full py-2 bg-pink-600 hover:bg-pink-500 text-white font-bold rounded-lg flex justify-center items-center gap-2">Execute Snippet A</button>
             )}
          </div>

          <div className={`bg-slate-900 border-2 rounded-xl p-6 transition-colors ${s7Step === 1 ? 'border-pink-500 shadow-[0_0_20px_rgba(244,114,182,0.2)]' : 'border-slate-800 opacity-50'}`}>
             <h3 className="text-slate-400 font-mono text-sm mb-4">Snippet B</h3>
             <pre className="text-lg">
               <span className="text-blue-300">name</span> = <span className="text-green-400">"Alex"</span><br/>
               <span className="text-blue-300">print</span>(name)
             </pre>
             {s7Step === 1 && (
               <button onClick={()=>{
                 setS7Step(2); 
                 unlockBadge("Memory Observer");
                 addXp(100, "Memory Scanned");
               }} className="mt-6 w-full py-2 bg-pink-600 hover:bg-pink-500 text-white font-bold rounded-lg flex justify-center items-center gap-2">Execute Snippet B</button>
             )}
          </div>
        </div>

        <div className="flex-[1.5] bg-slate-950 rounded-3xl border border-slate-800 p-8 flex flex-col relative overflow-hidden items-center justify-center">
           <div className="absolute top-4 left-4 text-slate-600 font-bold uppercase tracking-widest text-xs">Memory Chamber</div>
           
           <div className="relative w-64 h-64 bg-blue-900/10 rounded-full border border-blue-900/30 flex items-center justify-center">
             {s7Step === 0 && (
               <span className="text-slate-500 italic">Awaiting Execution...</span>
             )}
             {s7Step === 1 && (
               <span className="text-slate-500 italic">Empty. print() does not store data.</span>
             )}
             {s7Step === 2 && (
               <div className="bg-pink-900/50 border border-pink-500 p-4 rounded-xl flex items-center gap-4 animate-in zoom-in duration-500">
                 <Database className="text-pink-400 size-8" />
                 <div>
                   <div className="text-pink-200 text-sm">name</div>
                   <div className="text-white font-mono font-bold">"Alex"</div>
                 </div>
               </div>
             )}
           </div>

           {s7Step === 2 && (
             <button onClick={nextStage} className="absolute bottom-8 px-8 py-3 bg-white text-black font-black rounded-full shadow-xl hover:scale-105 transition-transform flex items-center gap-2">
               Proceed <ArrowRight className="size-5" />
             </button>
           )}
        </div>
      </div>
    </div>
  );

  // ---------------------------------------------------------
  // STAGE 8: Final Boss Challenge
  // ---------------------------------------------------------
  const [bossInput, setBossInput] = useState("");
  const [bossStep, setBossStep] = useState(0);

  const bossTasks = [
    { prompt: 'Create a print statement exactly like this: print("Earth")', expected: 'print("Earth")' },
    { prompt: 'Combine "Hello" and "World" using a hyphen separator: print("Hello", "World", sep="-")', expected: 'print("Hello", "World", sep="-")' }
  ];

  const handleBossSubmit = () => {
    // simplified parser
    const clean = bossInput.trim().replace(/'/g, '"');
    const target = bossTasks[bossStep].expected.replace(/'/g, '"');
    
    if (clean === target) {
      if (bossStep === 0) {
        setBossStep(1);
        setBossInput("");
        showToast("Signal Validated. Final stage initiated.", "success");
        addXp(100, "Signal Valid");
      } else {
        unlockBadge("Satellite Savior");
        addXp(500, "Satellite Restored");
        setStage(9); // Victory
      }
    } else {
      showToast("Invalid code structure. Try again.", "error");
    }
  };

  const renderStage8 = () => (
    <div className="flex flex-col h-full gap-6 p-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-red-500 flex items-center justify-center gap-2 animate-pulse">
          <Shield className="size-6" /> Final Boss: Save the Satellite
        </h2>
        <p className="text-slate-400 mt-2">The satellite relies entirely on your manual code entry to launch!</p>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center max-w-2xl mx-auto w-full gap-8">
        
        <div className="bg-red-950/30 border-2 border-red-900/50 rounded-2xl p-6 w-full text-center">
          <Radio className="size-12 text-red-500 mx-auto mb-4 animate-bounce" />
          <h3 className="text-xl text-white font-bold mb-2">TASK {bossStep + 1} / 2</h3>
          <p className="text-red-300 font-mono">{bossTasks[bossStep].prompt}</p>
        </div>

        <div className="w-full relative">
          <div className="absolute -inset-1 bg-gradient-to-r from-red-500 to-orange-500 rounded-xl blur opacity-25"></div>
          <div className="bg-black relative rounded-xl border border-slate-800 p-6 flex flex-col">
            <span className="text-slate-500 font-mono text-xs mb-2">terminal_input.py</span>
            <input 
              type="text" 
              value={bossInput}
              onChange={e => setBossInput(e.target.value)}
              placeholder="Type Python code here..."
              className="bg-transparent border-none outline-none font-mono text-xl text-white placeholder:text-slate-700 w-full"
              autoFocus
              onKeyDown={e => e.key === 'Enter' && handleBossSubmit()}
            />
          </div>
        </div>

        <button onClick={handleBossSubmit} className="w-full py-4 bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-500 hover:to-orange-500 text-white font-black text-xl rounded-xl shadow-[0_0_30px_rgba(239,68,68,0.4)] transition-transform active:scale-95 flex items-center justify-center gap-3">
          TRANSMIT CODE <Zap className="size-6" />
        </button>

      </div>
    </div>
  );

  // ---------------------------------------------------------
  // STAGE 9: Victory
  // ---------------------------------------------------------
  const renderStage9 = () => (
    <div className="flex flex-col items-center justify-center h-full p-8 text-center animate-in fade-in zoom-in duration-1000 relative overflow-hidden">
      {/* Confetti / Stars simulation background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/20 via-slate-950 to-slate-950 -z-10"></div>
      
      <Rocket className="size-48 text-cyan-400 mb-8 animate-bounce drop-shadow-[0_0_50px_rgba(34,211,238,0.8)]" />
      <h1 className="text-6xl font-black text-white mb-6 tracking-widest uppercase text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
        Mission Accomplished
      </h1>
      
      <div className="bg-slate-900/80 backdrop-blur border border-slate-700 p-8 rounded-2xl max-w-md w-full shadow-2xl mb-8">
        <h3 className="text-slate-400 font-bold uppercase tracking-widest text-sm mb-6 border-b border-slate-700 pb-2">Mission Summary</h3>
        <div className="flex justify-between items-center mb-4">
          <span className="text-slate-300 font-medium">Total XP Earned</span>
          <span className="text-cyan-400 font-mono font-black text-xl">{xp}</span>
        </div>
        <div className="flex justify-between items-center mb-4">
          <span className="text-slate-300 font-medium">Badges Unlocked</span>
          <span className="text-yellow-400 font-mono font-black text-xl">{badges.length} / 5</span>
        </div>
        
        <div className="flex flex-wrap gap-2 mt-6 pt-4 border-t border-slate-800">
          {badges.map(b => (
            <div key={b} className="bg-slate-800 border border-slate-700 px-3 py-1.5 rounded-full text-xs font-bold text-yellow-500 flex items-center gap-1">
              <Star className="size-3 fill-yellow-500" /> {b}
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col h-full bg-slate-950 text-slate-200 p-6 overflow-hidden relative font-sans select-none">
      
      {/* Toast Notification */}
      {toastMsg && (
        <div className={`absolute top-24 left-1/2 -translate-x-1/2 px-6 py-3 rounded-full shadow-xl animate-in slide-in-from-top-10 z-50 font-bold flex items-center gap-2 border ${
          toastMsg.type === 'error' ? 'bg-red-950 text-red-400 border-red-900/50' : 
          toastMsg.type === 'xp' ? 'bg-indigo-950 text-indigo-300 border-indigo-900/50' :
          'bg-green-950 text-green-400 border-green-900/50'
        }`}>
          {toastMsg.type === 'error' ? <Shield className="size-4" /> : <Star className="size-4" />}
          {toastMsg.text}
        </div>
      )}

      {/* Header */}
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-800 shrink-0">
        <div>
          <h2 className="text-2xl font-black text-cyan-400 flex items-center gap-3 uppercase tracking-widest drop-shadow-[0_0_10px_rgba(34,211,238,0.5)]">
            <Globe className="size-7 text-cyan-400" /> Python Launch Station
          </h2>
        </div>
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2 bg-slate-900 px-4 py-1.5 rounded-full border border-slate-800 font-bold shadow-sm">
            <Star className="size-4 text-yellow-500" /> {xp} XP
          </div>
          {stage > 0 && stage < 9 && (
            <div className="text-sm font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2">
               STAGE <span className="text-white bg-slate-800 px-2 rounded">{stage}</span> / 8
            </div>
          )}
        </div>
      </div>

      {/* Stage Renderer */}
      <div className="flex-1 min-h-0 relative">
        {stage === 0 && renderStage1()}
        {stage === 1 && renderStage2()}
        {stage === 2 && renderStage3()}
        {stage === 3 && renderStage4()}
        {stage === 4 && renderStage5()}
        {stage === 5 && renderStage6()}
        {stage === 6 && renderStage7()}
        {stage === 7 && renderStage8()}
        {stage === 8 && renderStage9()}
      </div>

    </div>
  );
}
