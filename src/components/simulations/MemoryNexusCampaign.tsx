import { useState, useEffect } from "react";
import { 
  Cpu, Database, AlertTriangle, ShieldAlert, Ghost, 
  BookOpen, PlusCircle, Trash2, ArrowRight, Zap, CheckCircle2,
  Play, Star, Layers, Settings, FileBox
} from "lucide-react";

type MemoryNexusProps = {
  expId: string; // c-w9-1 to c-w9-5
};

export function MemoryNexusCampaign({ expId }: MemoryNexusProps) {
  const [xp, setXp] = useState(0);
  const [successMsg, setSuccessMsg] = useState("");

  const addXp = (amount: number, reason: string) => {
    setXp(x => x + amount);
    setSuccessMsg(`+${amount} XP: ${reason}`);
    setTimeout(() => setSuccessMsg(""), 3000);
  };

  // ---------------------------------------------------------
  // MISSION 1: Floating Memory Platform (malloc) - c-w9-1
  // ---------------------------------------------------------
  const [m1N, setM1N] = useState(5);
  const [m1Step, setM1Step] = useState(0);
  const [m1Arr, setM1Arr] = useState<number[]>([]);
  const [m1Current, setM1Current] = useState(-1);
  const [m1Sum, setM1Sum] = useState(0);

  const allocateM1 = () => {
    setM1Step(1);
    // Simulate garbage values of malloc
    const vals = Array.from({length: m1N}, () => Math.floor(Math.random() * 90) + 10);
    setM1Arr(vals);
  };

  const runM1 = async () => {
    setM1Step(2);
    let s = 0;
    for (let i = 0; i < m1Arr.length; i++) {
      setM1Current(i);
      s += m1Arr[i];
      setM1Sum(s);
      await new Promise(r => setTimeout(r, 800));
    }
    setM1Current(-1);
    setM1Step(3);
    addXp(100, "Memory Constructor Badge!");
    setTimeout(() => {setM1Step(0); setM1Arr([]); setM1Sum(0);}, 5000);
  };

  const renderMission1 = () => (
    <div className="flex flex-col h-full gap-4">
       <div className="flex-1 bg-slate-900 rounded-xl border border-fuchsia-500/30 p-6 flex flex-col justify-center items-center relative overflow-hidden">
          <h3 className="absolute top-6 left-6 font-bold text-xl flex items-center gap-2 z-10 text-fuchsia-400 uppercase tracking-widest"><Cpu className="size-6" /> Data Bridge</h3>
          
          {m1Step === 0 && (
             <div className="flex items-center gap-4 bg-card p-6 rounded-xl border border-border z-10">
               <div>
                 <div className="text-sm font-bold text-muted-foreground uppercase mb-1">Bridge Segments</div>
                 <input type="number" min="3" max="8" value={m1N} onChange={e=>setM1N(Number(e.target.value))} className="text-3xl font-black bg-transparent w-24 border-b-2 border-fuchsia-500 outline-none text-white text-center" />
               </div>
               <button onClick={allocateM1} className="px-6 py-3 bg-fuchsia-600 hover:bg-fuchsia-700 text-white font-bold rounded-lg flex items-center gap-2">
                 <Zap className="size-4" /> malloc()
               </button>
             </div>
          )}

          {m1Step >= 1 && (
             <div className="w-full flex flex-col items-center z-10">
                <div className="text-fuchsia-400 font-mono mb-8 font-bold text-xl animate-in fade-in bg-fuchsia-950/50 px-6 py-2 rounded-xl border border-fuchsia-900">
                  int* ptr = (int*)malloc({m1N} * sizeof(int));
                </div>
                
                <div className="flex justify-center gap-3 mb-12">
                   {m1Arr.map((val, i) => (
                      <div key={i} className={`relative size-20 flex flex-col items-center justify-center rounded-lg border-2 font-black text-2xl transition-all duration-300
                         ${m1Step === 1 ? 'border-dashed border-slate-600 bg-slate-800 text-slate-500 animate-pulse' : ''}
                         ${m1Step >= 2 && m1Current === i ? 'border-cyan-400 bg-cyan-950/60 text-cyan-300 scale-110 shadow-[0_0_20px_rgba(34,211,238,0.5)] -translate-y-4' : ''}
                         ${m1Step >= 2 && m1Current !== i && i <= (m1Current === -1 ? 99 : m1Current) ? 'border-fuchsia-500 bg-fuchsia-900/40 text-fuchsia-300' : ''}
                         ${m1Step >= 2 && m1Current !== i && i > m1Current ? 'border-slate-700 bg-slate-800 text-slate-400' : ''}
                      `}>
                         <div className="absolute -top-6 text-xs font-mono text-muted-foreground font-bold">[{i}]</div>
                         {val}
                         {m1Step === 1 && <div className="absolute inset-0 flex items-center justify-center bg-slate-900/80 backdrop-blur-sm text-xs font-mono text-fuchsia-500/50">GARBAGE</div>}
                      </div>
                   ))}
                </div>

                {m1Step === 1 && (
                   <button onClick={runM1} className="px-8 py-3 bg-cyan-600 hover:bg-cyan-700 text-white font-bold rounded-xl shadow-[0_0_20px_rgba(8,145,178,0.4)] animate-in slide-in-from-bottom-4">
                     Initialize & Traverse Bridge
                   </button>
                )}

                {m1Step >= 2 && (
                   <div className="bg-card px-8 py-4 rounded-xl border-2 border-cyan-500/50 flex flex-col items-center shadow-[0_0_30px_rgba(34,211,238,0.2)] min-w-[200px]">
                      <div className="text-sm font-bold text-muted-foreground uppercase tracking-widest mb-1">Bridge Sum</div>
                      <div className="text-5xl font-black text-cyan-400">{m1Sum}</div>
                   </div>
                )}
             </div>
          )}

          {m1Step === 3 && (
            <div className="absolute bottom-8 text-green-400 font-bold uppercase tracking-widest text-xl flex items-center gap-2 animate-in slide-in-from-bottom-4">
              <CheckCircle2 className="size-6" /> Data Bridge Activated
            </div>
          )}
       </div>
    </div>
  );

  // ---------------------------------------------------------
  // MISSION 2: Academy Records Center (Structures) - c-w9-2
  // ---------------------------------------------------------
  const [m2Step, setM2Step] = useState(0);
  const [m2Current, setM2Current] = useState(-1);
  const m2Students = [
    { name: "Alex", roll: 101, marks: 85 },
    { name: "Sam", roll: 102, marks: 90 },
    { name: "Jordan", roll: 103, marks: 80 }
  ];
  const [m2Avg, setM2Avg] = useState(0);

  const runM2 = async () => {
    setM2Step(1);
    let sum = 0;
    for (let i = 0; i < m2Students.length; i++) {
      setM2Current(i);
      sum += m2Students[i].marks;
      setM2Avg(Math.floor(sum / (i+1)));
      await new Promise(r => setTimeout(r, 1200));
    }
    setM2Current(-1);
    setM2Step(2);
    addXp(150, "Database Architect Badge!");
    setTimeout(() => {setM2Step(0); setM2Avg(0);}, 5000);
  };

  const renderMission2 = () => (
    <div className="flex flex-col h-full gap-4">
       <div className="flex-1 bg-slate-900 rounded-xl border border-amber-500/30 p-6 flex flex-col justify-center items-center relative overflow-hidden">
          <h3 className="absolute top-6 left-6 font-bold text-xl flex items-center gap-2 z-10 text-amber-500 uppercase tracking-widest"><BookOpen className="size-6" /> Academy Database</h3>
          
          <div className="flex gap-8 items-center w-full max-w-4xl justify-center z-10 mb-12">
             {m2Students.map((stu, i) => (
                <div key={i} className={`flex flex-col border-2 rounded-xl overflow-hidden transition-all duration-500
                   ${m2Current === i ? 'border-amber-400 shadow-[0_0_30px_rgba(251,191,36,0.3)] scale-110 -translate-y-4' : 'border-slate-700 bg-card scale-90 opacity-70'}
                   ${m2Step === 2 ? 'border-emerald-500 bg-emerald-950/20 scale-100 opacity-100' : ''}
                `}>
                   <div className="bg-amber-950/80 px-4 py-2 border-b border-amber-900/50 font-bold text-amber-500 text-center uppercase tracking-widest flex items-center justify-center gap-2">
                     <FileBox className="size-4" /> Student Record
                   </div>
                   <div className="p-4 bg-card grid grid-cols-2 gap-y-3 gap-x-6 text-sm">
                      <div className="text-muted-foreground font-bold">Name:</div>
                      <div className="font-black text-white">{stu.name}</div>
                      <div className="text-muted-foreground font-bold">Roll No:</div>
                      <div className="font-black text-slate-300 font-mono">{stu.roll}</div>
                      <div className="text-muted-foreground font-bold">Marks:</div>
                      <div className={`font-black text-xl ${m2Current === i ? 'text-amber-400 animate-pulse' : 'text-slate-300'}`}>{stu.marks}</div>
                   </div>
                </div>
             ))}
          </div>

          <div className="h-32 flex items-center justify-center flex-col z-10">
             {m2Step === 0 && (
                <button onClick={runM2} className="px-8 py-3 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-xl shadow-[0_0_20px_rgba(217,119,6,0.4)]">
                  Compute Database Average
                </button>
             )}

             {m2Step >= 1 && (
                <div className="bg-slate-950 px-12 py-6 rounded-2xl border-2 border-amber-500/50 flex flex-col items-center shadow-[0_0_40px_rgba(251,191,36,0.2)] animate-in zoom-in">
                   <div className="text-amber-500/80 font-bold uppercase tracking-widest text-sm mb-2">Class Average Score</div>
                   <div className="text-6xl font-black text-amber-400 drop-shadow-[0_0_10px_rgba(251,191,36,0.5)]">{m2Avg}</div>
                </div>
             )}
          </div>
       </div>
    </div>
  );

  // ---------------------------------------------------------
  // MISSION 3: Academic Recovery (calloc) - c-w9-3
  // ---------------------------------------------------------
  const [m3Step, setM3Step] = useState(0);
  const m3Marks = [85, 30, 65, 28, 90];
  const [m3Arr, setM3Arr] = useState<number[]>([]);
  const [m3Current, setM3Current] = useState(-1);

  const allocateM3 = () => {
    setM3Step(1);
    // calloc initializes to 0
    setM3Arr(Array.from({length: 5}, () => 0));
  };

  const runM3 = async () => {
    setM3Step(2);
    const arr = [...m3Arr];
    for(let i=0; i<5; i++){
       setM3Current(i);
       await new Promise(r => setTimeout(r, 600));
       arr[i] = m3Marks[i];
       setM3Arr([...arr]);
       await new Promise(r => setTimeout(r, 600));
    }
    setM3Current(-1);
    setM3Step(3);
    addXp(120, "Recovery Specialist Badge!");
    setTimeout(() => {setM3Step(0); setM3Arr([]);}, 5000);
  };

  const renderMission3 = () => (
    <div className="flex flex-col h-full gap-4">
       <div className="flex-1 bg-slate-900 rounded-xl border border-emerald-500/30 p-6 flex flex-col justify-center items-center relative overflow-hidden">
          <h3 className="absolute top-6 left-6 font-bold text-xl flex items-center gap-2 z-10 text-emerald-500 uppercase tracking-widest"><ShieldAlert className="size-6" /> Academic Recovery</h3>
          
          {m3Step === 0 && (
             <div className="z-10 flex flex-col items-center">
               <div className="text-center max-w-md mb-8 text-muted-foreground">
                 We need to allocate a safe, zero-initialized array to store the incoming marks and prevent garbage data corruption.
               </div>
               <button onClick={allocateM3} className="px-8 py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-[0_0_30px_rgba(16,185,129,0.4)] flex items-center gap-2 text-xl">
                 <Zap className="size-6" /> calloc(5, sizeof(int))
               </button>
             </div>
          )}

          {m3Step >= 1 && (
             <div className="z-10 w-full max-w-3xl flex flex-col items-center">
                <div className="text-emerald-400 font-mono mb-12 font-bold text-lg bg-emerald-950/40 px-6 py-2 rounded-lg border border-emerald-900/50 flex items-center gap-2">
                  <CheckCircle2 className="size-5" /> Memory Zero-Initialized
                </div>

                <div className="flex justify-center gap-4 mb-16 w-full">
                   {m3Arr.map((val, i) => {
                     const isFail = m3Step >= 2 && m3Current !== i && val < 40 && val !== 0;
                     const isPass = m3Step >= 2 && m3Current !== i && val >= 40;
                     
                     return (
                       <div key={i} className={`relative size-24 rounded-2xl border-4 flex flex-col items-center justify-center font-black text-3xl transition-all duration-300
                          ${m3Step === 1 ? 'border-emerald-500/50 bg-emerald-950/30 text-emerald-500 shadow-[inset_0_0_20px_rgba(16,185,129,0.2)]' : ''}
                          ${m3Current === i ? 'border-cyan-400 bg-cyan-950/60 text-cyan-300 scale-110 shadow-[0_0_30px_rgba(34,211,238,0.5)] -translate-y-4' : ''}
                          ${isPass ? 'border-green-500 bg-green-900/40 text-green-400 shadow-[0_0_20px_rgba(34,197,94,0.3)]' : ''}
                          ${isFail ? 'border-red-500 bg-red-900/40 text-red-400 shadow-[0_0_20px_rgba(239,68,68,0.3)]' : ''}
                       `}>
                          {val}
                          {isFail && <div className="absolute -bottom-8 text-red-500 text-sm font-bold uppercase whitespace-nowrap animate-pulse">Failed</div>}
                          {isPass && <div className="absolute -bottom-8 text-green-500 text-sm font-bold uppercase whitespace-nowrap">Pass</div>}
                       </div>
                     )
                   })}
                </div>

                {m3Step === 1 && (
                  <button onClick={runM3} className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-[0_0_20px_rgba(37,99,235,0.4)] animate-in slide-in-from-bottom-4">
                    Import Marks Data
                  </button>
                )}

                {m3Step === 3 && (
                   <div className="bg-red-950/50 border border-red-500/50 p-6 rounded-xl animate-in zoom-in w-full max-w-md text-center">
                      <div className="text-red-400 font-bold uppercase tracking-widest mb-4">Recovery Dashboard</div>
                      <div className="flex justify-around">
                        <div className="flex flex-col"><span className="text-xs text-red-300/70">Failed Students</span><span className="text-3xl font-black text-red-500">2</span></div>
                        <div className="w-px bg-red-900/50"></div>
                        <div className="flex flex-col"><span className="text-xs text-green-300/70">Passing Students</span><span className="text-3xl font-black text-green-500">3</span></div>
                      </div>
                   </div>
                )}
             </div>
          )}
       </div>
    </div>
  );

  // ---------------------------------------------------------
  // MISSION 4: Memory Control Chamber (malloc/calloc/realloc/free) - c-w9-4
  // ---------------------------------------------------------
  const [m4State, setM4State] = useState(0); // 0: Start, 1: calloc, 2: realloc, 3: free, 4: leaked

  const runM4Cycle = async () => {
    // 1: Allocate
    setM4State(1);
    await new Promise(r => setTimeout(r, 2500));
    // 2: Expand
    setM4State(2);
    await new Promise(r => setTimeout(r, 2500));
    // 3: Free
    setM4State(3);
    addXp(200, "Memory Master Badge!");
    await new Promise(r => setTimeout(r, 3000));
    setM4State(0);
  };

  const renderMission4 = () => (
    <div className="flex flex-col h-full gap-4">
       <div className="flex-1 bg-slate-950 rounded-xl border border-indigo-500/30 p-6 flex flex-col justify-center items-center relative overflow-hidden">
          <h3 className="absolute top-6 left-6 font-bold text-xl flex items-center gap-2 z-10 text-indigo-400 uppercase tracking-widest"><Layers className="size-6" /> Control Chamber</h3>
          
          <div className="flex flex-col items-center z-10 w-full min-h-[300px] justify-center">
             
             {m4State === 0 && (
               <div className="text-center animate-in zoom-in">
                 <div className="size-24 bg-slate-900 border-2 border-slate-700 rounded-full flex items-center justify-center mx-auto mb-6">
                   <Settings className="size-12 text-slate-500" />
                 </div>
                 <h2 className="text-2xl font-bold mb-8">Memory System Idle</h2>
                 <button onClick={runM4Cycle} className="px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-[0_0_20px_rgba(79,70,229,0.4)]">
                   Initiate Full Memory Cycle
                 </button>
                 <div className="mt-8 text-sm text-muted-foreground max-w-md mx-auto border border-border bg-card p-4 rounded-xl">
                   This cycle will demonstrate safe allocation (<span className="text-blue-400 font-mono">calloc</span>), expansion (<span className="text-purple-400 font-mono">realloc</span>), and destruction (<span className="text-red-400 font-mono">free</span>) to prevent memory leaks.
                 </div>
               </div>
             )}

             {m4State === 1 && (
               <div className="flex flex-col items-center animate-in slide-in-from-bottom-8">
                 <div className="text-blue-400 font-mono font-bold text-2xl mb-8 bg-blue-950/30 px-6 py-2 rounded-lg border border-blue-900/50">ptr = calloc(3, sizeof(int))</div>
                 <div className="flex gap-4">
                   {[0,0,0].map((v, i) => (
                     <div key={i} className="size-24 bg-blue-950/50 border-4 border-blue-500 flex items-center justify-center font-black text-4xl text-blue-400 rounded-xl shadow-[0_0_30px_rgba(59,130,246,0.3)] animate-in zoom-in" style={{animationDelay: `${i*100}ms`}}>{v}</div>
                   ))}
                 </div>
                 <div className="mt-12 text-blue-300/70 uppercase tracking-widest font-bold">Zero-Initialized Block Created</div>
               </div>
             )}

             {m4State === 2 && (
               <div className="flex flex-col items-center animate-in slide-in-from-bottom-8">
                 <div className="text-purple-400 font-mono font-bold text-2xl mb-8 bg-purple-950/30 px-6 py-2 rounded-lg border border-purple-900/50">ptr = realloc(ptr, 5 * sizeof(int))</div>
                 <div className="flex gap-4">
                   {[0,0,0].map((v, i) => (
                     <div key={i} className="size-24 bg-blue-950/50 border-4 border-blue-500 flex items-center justify-center font-black text-4xl text-blue-400 rounded-xl">{v}</div>
                   ))}
                   {['?','?'].map((v, i) => (
                     <div key={i+3} className="size-24 bg-purple-950/50 border-4 border-purple-500 border-dashed flex items-center justify-center font-black text-4xl text-purple-400 rounded-xl shadow-[0_0_30px_rgba(168,85,247,0.3)] animate-in zoom-in" style={{animationDelay: `${i*200}ms`}}>{v}</div>
                   ))}
                 </div>
                 <div className="mt-12 text-purple-300/70 uppercase tracking-widest font-bold">Block Expanded (New memory holds garbage)</div>
               </div>
             )}

             {m4State === 3 && (
               <div className="flex flex-col items-center animate-in slide-in-from-bottom-8">
                 <div className="text-red-400 font-mono font-bold text-2xl mb-8 bg-red-950/30 px-6 py-2 rounded-lg border border-red-900/50">free(ptr)</div>
                 <div className="flex gap-4 opacity-0 scale-150 blur-xl transition-all duration-1000">
                   {[0,0,0,'?','?'].map((v, i) => (
                     <div key={i} className="size-24 border-4 border-red-500 text-red-500 flex items-center justify-center rounded-xl">{v}</div>
                   ))}
                 </div>
                 <div className="mt-12 text-red-400 font-bold text-xl flex items-center gap-2 animate-in zoom-in delay-500 fill-mode-both">
                   <Trash2 className="size-6" /> Memory Securely Released
                 </div>
               </div>
             )}

          </div>
       </div>
    </div>
  );

  return (
    <div className="flex flex-col h-full bg-slate-950 text-foreground p-6 overflow-hidden relative font-sans">
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-border shrink-0">
        <div>
          <h2 className="text-2xl font-black text-fuchsia-400 flex items-center gap-3 uppercase tracking-widest drop-shadow-[0_0_10px_rgba(217,70,239,0.3)]">
            <Cpu className="size-7 text-fuchsia-400" /> Memory Nexus
          </h2>
        </div>
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2 bg-fuchsia-950/50 px-4 py-1.5 rounded-full border border-fuchsia-900 font-bold shadow-sm text-fuchsia-100">
            <Star className="size-4 text-fuchsia-400" /> {xp} XP
          </div>
          <div className="text-sm font-bold text-fuchsia-300 uppercase tracking-widest">
             {expId === "c-w9-1" && "Mission: Data Bridge"}
             {expId === "c-w9-2" && "Mission: Student Database"}
             {expId === "c-w9-3" && "Mission: Identify At-Risk"}
             {expId === "c-w9-4" && "Mission: Memory Control"}
          </div>
        </div>
      </div>

      {successMsg && (
        <div className="absolute top-24 left-1/2 -translate-x-1/2 bg-fuchsia-600 text-white px-6 py-3 rounded-lg shadow-xl animate-in slide-in-from-top-10 z-50 font-bold flex items-center gap-2">
          <Star className="size-5 fill-white" /> {successMsg}
        </div>
      )}

      <div className="flex-1 min-h-0 overflow-y-auto">
        {expId === "c-w9-1" && renderMission1()}
        {expId === "c-w9-2" && renderMission2()}
        {expId === "c-w9-3" && renderMission3()}
        {expId === "c-w9-4" && renderMission4()}
        {/* Boss screen fallback */}
        {expId === "c-w9-5" && (
           <div className="flex items-center justify-center h-full flex-col text-center bg-slate-900 rounded-xl border border-slate-800">
              <Database className="size-32 text-fuchsia-500 mb-8 animate-pulse drop-shadow-[0_0_40px_rgba(217,70,239,0.6)]" />
              <h1 className="text-5xl font-black text-fuchsia-400 uppercase tracking-widest mb-6 drop-shadow-[0_0_20px_rgba(232,121,249,0.5)]">Memory Core Stabilized</h1>
              <p className="text-slate-400 max-w-xl text-xl leading-relaxed">
                You have successfully managed the Memory Nexus! By mastering malloc, calloc, realloc, and free, you've prevented critical leaks and restored balance to the CodeVerse.
              </p>
           </div>
        )}
      </div>
    </div>
  );
}
