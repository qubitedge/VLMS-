import { useState, useEffect } from "react";
import { 
  Infinity, Rabbit, MountainSnow, AlertTriangle, Blocks,
  Layers, ArrowDown, ArrowUp, ArrowRight, ArrowLeft, Star, CheckCircle2,
  Zap, Compass
} from "lucide-react";

type RecursiveCavernsProps = {
  expId: string; // c-w12-1 to c-w12-5
};

export function RecursiveCavernsCampaign({ expId }: RecursiveCavernsProps) {
  const [xp, setXp] = useState(0);
  const [successMsg, setSuccessMsg] = useState("");

  const addXp = (amount: number, reason: string) => {
    setXp(x => x + amount);
    setSuccessMsg(`+${amount} XP: ${reason}`);
    setTimeout(() => setSuccessMsg(""), 3000);
  };

  // ---------------------------------------------------------
  // MISSION 1: Fibonacci Rabbit Kingdom - c-w12-1
  // ---------------------------------------------------------
  const [m1N, setM1N] = useState(4);
  const [m1Step, setM1Step] = useState(0);
  const [m1Nodes, setM1Nodes] = useState<{id: string, val: number, parent: string|null, level: number}[]>([]);

  const runM1 = async () => {
    setM1Step(1);
    const nodes: any[] = [];
    let idCounter = 0;

    const buildTree = async (n: number, parentId: string|null, level: number) => {
      const myId = `n${idCounter++}`;
      nodes.push({ id: myId, val: n, parent: parentId, level });
      setM1Nodes([...nodes]);
      await new Promise(r => setTimeout(r, 600));

      if (n <= 1) return n;

      const left = await buildTree(n - 1, myId, level + 1);
      const right = await buildTree(n - 2, myId, level + 1);
      return left + right;
    };

    await buildTree(m1N, null, 0);
    setM1Step(2);
    addXp(100, "Fibonacci Explorer!");
    setTimeout(() => { setM1Step(0); setM1Nodes([]); }, 6000);
  };

  const renderMission1 = () => (
    <div className="flex flex-col h-full gap-4">
       <div className="flex-1 bg-slate-900 rounded-xl border border-rose-500/30 p-6 flex flex-col justify-center items-center relative overflow-hidden">
          <h3 className="absolute top-6 left-6 font-bold text-xl flex items-center gap-2 z-10 text-rose-400 uppercase tracking-widest"><Rabbit className="size-6" /> Rabbit Colony</h3>
          
          <div className="absolute top-6 right-6 flex items-center gap-3 z-10">
            <span className="font-bold text-slate-400 uppercase text-sm">Target Generation</span>
            <input type="number" min="2" max="5" value={m1N} onChange={e=>setM1N(Number(e.target.value))} className="w-16 bg-slate-800 border-2 border-rose-500 rounded-lg text-center font-bold text-rose-400 text-xl" />
          </div>

          <div className="flex-1 w-full max-w-4xl relative mt-16 flex flex-col items-center">
             {m1Step === 0 && (
               <button onClick={runM1} className="px-8 py-3 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-xl shadow-[0_0_20px_rgba(225,29,72,0.4)] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
                 Simulate Reproduction
               </button>
             )}

             <div className="flex flex-col items-center gap-8 w-full">
                {[0, 1, 2, 3, 4].map(level => {
                   const levelNodes = m1Nodes.filter(n => n.level === level);
                   if(levelNodes.length === 0) return null;
                   
                   return (
                     <div key={level} className="flex justify-center w-full relative">
                        {levelNodes.map((node, i) => {
                           // Find duplicates visually
                           const isDuplicate = m1Nodes.findIndex(n => n.val === node.val && n.level === node.level && n.id !== node.id) !== -1;
                           return (
                             <div key={node.id} className="flex flex-col items-center mx-4 relative group">
                               {node.parent && <div className="absolute -top-6 w-px h-6 bg-rose-500/50" />}
                               <div className={`size-16 rounded-full border-4 flex flex-col items-center justify-center font-black animate-in zoom-in duration-300 z-10
                                  ${isDuplicate ? 'border-red-500 bg-red-950/60 text-red-400 shadow-[0_0_20px_rgba(239,68,68,0.5)]' : 'border-rose-400 bg-rose-950/40 text-rose-300 shadow-[0_0_15px_rgba(251,113,133,0.3)]'}
                               `}>
                                  F({node.val})
                               </div>
                               {isDuplicate && <div className="absolute -bottom-6 text-xs text-red-500 font-bold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity bg-slate-900 px-2 py-1 rounded">Redundant Call</div>}
                             </div>
                           )
                        })}
                     </div>
                   );
                })}
             </div>

             {m1Step === 2 && (
               <div className="absolute bottom-4 right-4 bg-slate-950 p-4 border border-rose-500/50 rounded-xl">
                 <div className="text-sm font-bold text-muted-foreground uppercase">Total Function Calls</div>
                 <div className="text-3xl font-black text-rose-400">{m1Nodes.length} Calls</div>
               </div>
             )}
          </div>
       </div>
    </div>
  );

  // ---------------------------------------------------------
  // MISSION 2: Infinite Staircase (Factorial) - c-w12-2
  // ---------------------------------------------------------
  const [m2Step, setM2Step] = useState(0);
  const m2N = 5;
  const [m2Stack, setM2Stack] = useState<number[]>([]);
  const [m2Result, setM2Result] = useState<number[]>([]);

  const runM2 = async () => {
    setM2Step(1); // Descending
    const stack = [];
    for(let i=m2N; i>=1; i--) {
      stack.push(i);
      setM2Stack([...stack]);
      await new Promise(r => setTimeout(r, 800));
    }
    
    setM2Step(2); // Ascending
    await new Promise(r => setTimeout(r, 1000));
    
    const results = [1];
    let currentFact = 1;
    setM2Result([1]);
    
    for(let i=1; i<stack.length; i++) {
      const val = stack[stack.length - 1 - i];
      currentFact *= val;
      results.push(currentFact);
      setM2Result([...results]);
      await new Promise(r => setTimeout(r, 800));
    }
    
    setM2Step(3);
    addXp(120, "Summit Conqueror!");
    setTimeout(() => {setM2Step(0); setM2Stack([]); setM2Result([]);}, 5000);
  };

  const renderMission2 = () => (
    <div className="flex flex-col h-full gap-4">
       <div className="flex-1 bg-slate-950 rounded-xl border border-cyan-500/30 p-6 flex flex-col justify-center items-center relative overflow-hidden">
          <h3 className="absolute top-6 left-6 font-bold text-xl flex items-center gap-2 z-10 text-cyan-400 uppercase tracking-widest"><MountainSnow className="size-6" /> Infinite Staircase</h3>
          
          <div className="flex gap-16 items-end justify-center h-full pt-16 pb-8 w-full max-w-4xl">
             
             {/* Descending Stairs (Function Calls) */}
             <div className="flex flex-col items-center justify-end h-full w-48 relative">
               <div className="absolute -top-12 text-cyan-500 font-bold uppercase tracking-widest mb-4">The Descent</div>
               {m2Stack.map((val, i) => (
                 <div key={i} className="flex flex-col items-center animate-in slide-in-from-top-4">
                   {i > 0 && <ArrowDown className="size-6 text-cyan-500/50 my-1" />}
                   <div className="w-full bg-cyan-950/40 border-2 border-cyan-500/50 p-3 rounded-lg text-center shadow-[0_0_15px_rgba(6,182,212,0.3)]">
                     <span className="font-mono font-bold text-cyan-300">factorial({val})</span>
                   </div>
                 </div>
               ))}
               {m2Step >= 2 && (
                 <div className="mt-4 text-amber-400 font-black flex items-center gap-2 animate-in zoom-in border border-amber-500/50 bg-amber-950/40 px-4 py-2 rounded-lg">
                   <Star className="size-5" /> Base Case: 1
                 </div>
               )}
             </div>

             {/* Ascending Stairs (Returns) */}
             {m2Step >= 2 && (
               <div className="flex flex-col-reverse items-center justify-start h-full w-48 relative">
                 <div className="absolute -top-12 text-emerald-500 font-bold uppercase tracking-widest mb-4">The Return</div>
                 {m2Result.map((res, i) => {
                   const callVal = m2Stack[m2Stack.length - 1 - i];
                   return (
                     <div key={i} className="flex flex-col items-center animate-in slide-in-from-bottom-4">
                       {i > 0 && <ArrowUp className="size-6 text-emerald-500/50 my-1" />}
                       <div className="w-full bg-emerald-950/40 border-2 border-emerald-500/50 p-3 rounded-lg text-center shadow-[0_0_15px_rgba(16,185,129,0.3)] flex flex-col">
                         <span className="font-mono text-xs text-emerald-300/70">{callVal} × {i===0 ? 1 : m2Result[i-1]}</span>
                         <span className="font-black text-emerald-400 text-xl">{res}</span>
                       </div>
                     </div>
                   );
                 })}
               </div>
             )}
          </div>

          {m2Step === 0 && (
            <button onClick={runM2} className="px-8 py-3 bg-cyan-600 hover:bg-cyan-700 text-white font-bold rounded-xl shadow-[0_0_20px_rgba(8,145,178,0.4)] absolute bottom-12">
              Descend the Cavern
            </button>
          )}

          {m2Step === 3 && (
            <div className="absolute top-6 right-6 text-emerald-400 font-black text-4xl animate-in slide-in-from-right-4 drop-shadow-[0_0_20px_rgba(16,185,129,0.5)]">
              5! = 120
            </div>
          )}
       </div>
    </div>
  );

  // ---------------------------------------------------------
  // MISSION 3: Call Stack Tower (General Recursion) - c-w12-3
  // ---------------------------------------------------------
  const [m3Step, setM3Step] = useState(0);
  const [m3Stack, setM3Stack] = useState<string[]>([]);
  
  const runM3 = async () => {
    setM3Step(1);
    const calls = ["main()", "factorial(3)", "factorial(2)", "factorial(1)"];
    
    // Push
    for(let i=0; i<calls.length; i++) {
      setM3Stack(prev => [...prev, calls[i]]);
      await new Promise(r => setTimeout(r, 1000));
    }
    
    setM3Step(2);
    await new Promise(r => setTimeout(r, 1500));
    
    // Pop
    for(let i=calls.length; i>0; i--) {
      setM3Stack(prev => prev.slice(0, prev.length - 1));
      await new Promise(r => setTimeout(r, 1000));
    }
    
    setM3Step(3);
    addXp(150, "Call Stack Master!");
    setTimeout(() => {setM3Step(0); setM3Stack([]);}, 4000);
  };

  const renderMission3 = () => (
    <div className="flex flex-col h-full gap-4">
       <div className="flex-1 bg-slate-900 rounded-xl border border-indigo-500/30 p-6 flex flex-col justify-center items-center relative overflow-hidden">
          <h3 className="absolute top-6 left-6 font-bold text-xl flex items-center gap-2 z-10 text-indigo-400 uppercase tracking-widest"><Layers className="size-6" /> Call Stack Tower</h3>
          
          <div className="flex gap-16 items-end h-full pt-16 w-full max-w-4xl justify-center z-10">
             
             {/* The Stack */}
             <div className="w-64 h-96 border-x-4 border-b-4 border-slate-700 bg-slate-950/50 rounded-b-xl flex flex-col-reverse justify-start items-center p-4 relative">
                <div className="absolute -top-8 text-slate-500 font-bold tracking-widest uppercase">Memory Stack</div>
                
                {m3Stack.map((call, i) => (
                  <div key={i} className={`w-full py-4 px-6 rounded-lg font-bold font-mono text-lg text-center mb-2 animate-in slide-in-from-top-8 duration-300
                     ${call === 'main()' ? 'bg-slate-800 border-2 border-slate-600 text-white' : 'bg-indigo-950/80 border-2 border-indigo-500 text-indigo-300 shadow-[0_0_20px_rgba(99,102,241,0.3)]'}
                  `}>
                    {call}
                  </div>
                ))}
             </div>

             {/* Description Panel */}
             <div className="w-80 bg-card border border-border rounded-xl p-6 shadow-lg mb-12">
                <h4 className="font-bold text-xl text-indigo-400 mb-4 flex items-center gap-2"><Compass className="size-5" /> Stack Operations</h4>
                <div className="space-y-4">
                  <div className={`p-3 rounded-lg border-2 ${m3Step === 1 ? 'border-indigo-500 bg-indigo-950/40 text-indigo-200' : 'border-slate-800 bg-slate-900 text-slate-500'}`}>
                    <div className="font-bold uppercase tracking-widest text-sm mb-1">PUSH</div>
                    <div className="text-sm">When a function is called, it is added to the top of the stack.</div>
                  </div>
                  <div className={`p-3 rounded-lg border-2 ${m3Step === 2 ? 'border-emerald-500 bg-emerald-950/40 text-emerald-200' : 'border-slate-800 bg-slate-900 text-slate-500'}`}>
                    <div className="font-bold uppercase tracking-widest text-sm mb-1">BASE CASE</div>
                    <div className="text-sm">Execution pauses until factorial(1) hits the base case and returns 1.</div>
                  </div>
                  <div className={`p-3 rounded-lg border-2 ${m3Step === 3 ? 'border-amber-500 bg-amber-950/40 text-amber-200' : 'border-slate-800 bg-slate-900 text-slate-500'}`}>
                    <div className="font-bold uppercase tracking-widest text-sm mb-1">POP</div>
                    <div className="text-sm">When a function finishes, it is removed from the stack and returns its value.</div>
                  </div>
                </div>
             </div>
          </div>

          {m3Step === 0 && (
            <button onClick={runM3} className="px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-[0_0_20px_rgba(79,70,229,0.4)] mt-8 z-10">
              Visualize Call Stack
            </button>
          )}
       </div>
    </div>
  );

  return (
    <div className="flex flex-col h-full bg-slate-950 text-foreground p-6 overflow-hidden relative font-sans">
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-border shrink-0">
        <div>
          <h2 className="text-2xl font-black text-rose-400 flex items-center gap-3 uppercase tracking-widest drop-shadow-[0_0_10px_rgba(244,63,94,0.3)]">
            <Infinity className="size-7 text-rose-400" /> Recursive Caverns
          </h2>
        </div>
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2 bg-rose-950/50 px-4 py-1.5 rounded-full border border-rose-900 font-bold shadow-sm text-rose-100">
            <Star className="size-4 text-rose-400" /> {xp} XP
          </div>
          <div className="text-sm font-bold text-rose-300 uppercase tracking-widest">
             {expId === "c-w12-1" && "Mission: Rabbit Colony"}
             {expId === "c-w12-2" && "Mission: Infinite Staircase"}
             {expId === "c-w12-3" && "Mission: Call Stack Tower"}
          </div>
        </div>
      </div>

      {successMsg && (
        <div className="absolute top-24 left-1/2 -translate-x-1/2 bg-rose-600 text-white px-6 py-3 rounded-lg shadow-xl animate-in slide-in-from-top-10 z-50 font-bold flex items-center gap-2">
          <Star className="size-5 fill-white" /> {successMsg}
        </div>
      )}

      <div className="flex-1 min-h-0 overflow-y-auto">
        {expId === "c-w12-1" && renderMission1()}
        {expId === "c-w12-2" && renderMission2()}
        {expId === "c-w12-3" && renderMission3()}
        {expId === "c-w12-4" && (
           <div className="flex items-center justify-center h-full flex-col text-center bg-slate-900 rounded-xl border border-slate-800">
              <Infinity className="size-32 text-rose-500 mb-8 animate-pulse drop-shadow-[0_0_40px_rgba(244,63,94,0.6)]" />
              <h1 className="text-5xl font-black text-rose-400 uppercase tracking-widest mb-6 drop-shadow-[0_0_20px_rgba(244,63,94,0.5)]">Labyrinth Escaped</h1>
              <p className="text-slate-400 max-w-xl text-xl leading-relaxed">
                You have successfully navigated the Recursive Caverns. By mastering Base Cases, Recursive Cases, and the Call Stack, you've conquered infinite loops!
              </p>
           </div>
        )}
      </div>
    </div>
  );
}
