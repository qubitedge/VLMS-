import { useState, useEffect } from "react";
import { 
  Building2, Link2, BoxSelect, Columns, TrafficCone,
  Settings2, Activity, HardDrive, LayoutTemplate, Network,
  PlusCircle, Trash2, ArrowRight, Server, CheckCircle2, Star,
  Hammer,
  ShieldAlert,
  Zap
} from "lucide-react";

type DataArchitectDistrictProps = {
  expId: string; // c-w10-1 to c-w10-5
};

export function DataArchitectDistrictCampaign({ expId }: DataArchitectDistrictProps) {
  const [xp, setXp] = useState(0);
  const [successMsg, setSuccessMsg] = useState("");

  const addXp = (amount: number, reason: string) => {
    setXp(x => x + amount);
    setSuccessMsg(`+${amount} XP: ${reason}`);
    setTimeout(() => setSuccessMsg(""), 3000);
  };

  // ---------------------------------------------------------
  // MISSION 1: Network Builder (Linked List) - c-w10-1
  // ---------------------------------------------------------
  const [m1Nodes, setM1Nodes] = useState<number[]>([]);
  const [m1Step, setM1Step] = useState(0); // 0: Start, 1: Add, 2: Traverse, 3: Insert, 4: Delete
  const [m1Current, setM1Current] = useState(-1);

  const addNode = () => {
    if(m1Nodes.length >= 4) return;
    setM1Nodes([...m1Nodes, (m1Nodes.length + 1) * 10]);
    if(m1Nodes.length === 3) {
      setTimeout(() => addXp(100, "Node Constructor!"), 500);
    }
  };

  const traverseM1 = async () => {
    if(m1Nodes.length === 0) return;
    setM1Step(2);
    for(let i=0; i<m1Nodes.length; i++) {
      setM1Current(i);
      await new Promise(r => setTimeout(r, 800));
    }
    setM1Current(-1);
    setM1Step(0);
  };

  const insertM1 = async () => {
    if(m1Nodes.length < 2) return;
    setM1Step(3);
    await new Promise(r => setTimeout(r, 1000));
    const newNodes = [...m1Nodes];
    newNodes.splice(2, 0, 25);
    setM1Nodes(newNodes);
    addXp(150, "Network Architect!");
    setTimeout(() => setM1Step(0), 2000);
  };

  const deleteM1 = async () => {
    if(m1Nodes.length < 3) return;
    setM1Step(4);
    await new Promise(r => setTimeout(r, 1000));
    const newNodes = [...m1Nodes];
    newNodes.splice(2, 1); // remove the inserted 25 or 30
    setM1Nodes(newNodes);
    addXp(100, "Demolition Expert!");
    setTimeout(() => setM1Step(0), 2000);
  };

  const renderMission1 = () => (
    <div className="flex flex-col h-full gap-4">
       <div className="flex-1 bg-slate-950 rounded-xl border border-blue-500/30 p-6 flex flex-col justify-center items-center relative overflow-hidden">
          <h3 className="absolute top-6 left-6 font-bold text-xl flex items-center gap-2 z-10 text-blue-400 uppercase tracking-widest"><Network className="size-6" /> Digital Highway</h3>
          
          <div className="flex flex-col items-center z-10 w-full mb-12">
             <div className="flex items-center gap-4 h-32 w-full justify-center">
                <div className="bg-slate-900 border-2 border-slate-700 p-4 rounded-xl font-bold text-slate-400">HEAD</div>
                <ArrowRight className="size-8 text-slate-600" />
                
                {m1Nodes.map((val, i) => (
                  <div key={`${i}-${val}`} className="flex items-center gap-4 animate-in slide-in-from-right-8">
                     <div className={`relative flex items-center h-20 rounded-xl border-4 transition-all duration-300
                       ${m1Current === i ? 'border-cyan-400 bg-cyan-950/60 shadow-[0_0_30px_rgba(34,211,238,0.5)] -translate-y-2' : 'border-blue-500/50 bg-slate-800'}
                       ${m1Step === 4 && i === 2 ? 'opacity-0 scale-50 transition-all duration-1000' : ''}
                     `}>
                        <div className="px-6 font-black text-3xl text-white border-r-2 border-blue-500/50 flex items-center justify-center h-full">
                          {val}
                        </div>
                        <div className="px-4 text-blue-400/50 h-full flex items-center justify-center"><Link2 className="size-6" /></div>
                        
                        {/* Traffic Patrol Vehicle */}
                        {m1Current === i && <div className="absolute -top-10 left-1/2 -translate-x-1/2 text-cyan-400 animate-bounce"><TrafficCone className="size-8" /></div>}
                     </div>
                     <ArrowRight className="size-8 text-blue-500/50" />
                  </div>
                ))}

                <div className="bg-slate-900 border-2 border-slate-700 border-dashed p-4 rounded-xl font-mono text-slate-500">NULL</div>
             </div>
          </div>

          <div className="flex gap-4 flex-wrap justify-center z-10">
             <button onClick={addNode} disabled={m1Nodes.length >= 4 || m1Step !== 0} className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl flex items-center gap-2 disabled:opacity-50">
               <PlusCircle className="size-5" /> Build Node
             </button>
             <button onClick={traverseM1} disabled={m1Nodes.length === 0 || m1Step !== 0} className="px-6 py-3 bg-cyan-600 hover:bg-cyan-700 text-white font-bold rounded-xl flex items-center gap-2 disabled:opacity-50">
               <Activity className="size-5" /> Traverse Network
             </button>
             <button onClick={insertM1} disabled={m1Nodes.length < 2 || m1Nodes.includes(25) || m1Step !== 0} className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl flex items-center gap-2 disabled:opacity-50">
               <ArrowRight className="size-5" /> Insert Node
             </button>
             <button onClick={deleteM1} disabled={!m1Nodes.includes(25) || m1Step !== 0} className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl flex items-center gap-2 disabled:opacity-50">
               <Trash2 className="size-5" /> Delete Node
             </button>
          </div>
       </div>
    </div>
  );

  // ---------------------------------------------------------
  // MISSION 2: Smart Building Lab (Struct vs Union) - c-w10-2
  // ---------------------------------------------------------
  const [m2Mode, setM2Mode] = useState<"struct" | "union">("struct");
  const [m2Field, setM2Field] = useState<"name" | "roll" | "marks" | "none">("none");

  const renderMission2 = () => (
    <div className="flex flex-col h-full gap-4">
       <div className="flex-1 bg-slate-900 rounded-xl border border-amber-500/30 p-6 flex flex-col items-center relative overflow-hidden">
          <h3 className="absolute top-6 left-6 font-bold text-xl flex items-center gap-2 z-10 text-amber-500 uppercase tracking-widest"><Building2 className="size-6" /> Structure vs Union</h3>
          
          <div className="flex gap-4 mb-12 mt-12 z-10">
             <button onClick={() => {setM2Mode("struct"); setM2Field("none");}} className={`px-8 py-3 font-bold rounded-xl transition-colors ${m2Mode === 'struct' ? 'bg-amber-600 text-white shadow-[0_0_20px_rgba(217,119,6,0.4)]' : 'bg-slate-800 text-slate-400 border border-slate-700'}`}>
               Structure Building
             </button>
             <button onClick={() => {setM2Mode("union"); setM2Field("none");}} className={`px-8 py-3 font-bold rounded-xl transition-colors ${m2Mode === 'union' ? 'bg-fuchsia-600 text-white shadow-[0_0_20px_rgba(192,38,211,0.4)]' : 'bg-slate-800 text-slate-400 border border-slate-700'}`}>
               Union Smart Room
             </button>
          </div>

          <div className="flex gap-16 items-start w-full max-w-4xl z-10">
             {/* Visualization */}
             <div className="flex-1 flex flex-col items-center">
                {m2Mode === "struct" ? (
                  <div className="bg-slate-950 p-6 rounded-2xl border-4 border-amber-500/50 w-full animate-in zoom-in">
                     <div className="text-center text-amber-500 font-bold mb-4 uppercase tracking-widest">Separate Rooms (28 Bytes)</div>
                     <div className="flex flex-col gap-2">
                       <button onClick={()=>setM2Field("name")} className={`h-16 border-2 rounded-lg flex items-center justify-center font-bold text-lg transition-colors ${m2Field==='name' ? 'bg-amber-900/50 border-amber-400 text-amber-300' : 'bg-slate-800 border-slate-700 text-slate-400'}`}>Name [20B]</button>
                       <button onClick={()=>setM2Field("roll")} className={`h-16 border-2 rounded-lg flex items-center justify-center font-bold text-lg transition-colors ${m2Field==='roll' ? 'bg-amber-900/50 border-amber-400 text-amber-300' : 'bg-slate-800 border-slate-700 text-slate-400'}`}>Roll No [4B]</button>
                       <button onClick={()=>setM2Field("marks")} className={`h-16 border-2 rounded-lg flex items-center justify-center font-bold text-lg transition-colors ${m2Field==='marks' ? 'bg-amber-900/50 border-amber-400 text-amber-300' : 'bg-slate-800 border-slate-700 text-slate-400'}`}>Marks [4B]</button>
                     </div>
                  </div>
                ) : (
                  <div className="bg-slate-950 p-6 rounded-2xl border-4 border-fuchsia-500/50 w-full animate-in zoom-in">
                     <div className="text-center text-fuchsia-500 font-bold mb-4 uppercase tracking-widest">Shared Room (20 Bytes Max)</div>
                     <div className="flex flex-col gap-2 relative h-[216px] justify-center items-center">
                       <div className="absolute inset-0 bg-fuchsia-900/20 border-2 border-dashed border-fuchsia-500/30 rounded-lg"></div>
                       
                       {m2Field === "none" && <div className="text-muted-foreground font-bold">Select a field to store</div>}
                       {m2Field === "name" && <div className="absolute inset-2 bg-fuchsia-900/60 border-2 border-fuchsia-400 rounded flex items-center justify-center font-bold text-2xl text-fuchsia-300 animate-in zoom-in duration-300">Name Stored</div>}
                       {m2Field === "roll" && <div className="absolute inset-x-2 top-2 h-16 bg-fuchsia-900/60 border-2 border-fuchsia-400 rounded flex items-center justify-center font-bold text-2xl text-fuchsia-300 animate-in zoom-in duration-300">Roll Stored</div>}
                       {m2Field === "marks" && <div className="absolute inset-x-2 bottom-2 h-16 bg-fuchsia-900/60 border-2 border-fuchsia-400 rounded flex items-center justify-center font-bold text-2xl text-fuchsia-300 animate-in zoom-in duration-300">Marks Stored</div>}
                     </div>
                  </div>
                )}
             </div>

             {/* Controls & Output */}
             <div className="flex-1 bg-card rounded-xl border border-border p-6 shadow-lg">
                <h4 className="font-bold text-lg mb-4 flex items-center gap-2"><HardDrive className="size-5 text-emerald-400" /> Memory Inspector</h4>
                <div className="space-y-4">
                   <p className="text-slate-300 text-sm leading-relaxed">
                     {m2Mode === "struct" 
                       ? "A structure allocates separate memory space for each member. You can access Name, Roll, and Marks simultaneously." 
                       : "A union allocates a single shared memory space equal to its largest member. Storing a new value overwrites the previous one!"}
                   </p>
                   
                   {m2Mode === "union" && (
                     <div className="flex flex-wrap gap-2">
                       <button onClick={()=>setM2Field("name")} className="px-3 py-1 bg-slate-800 hover:bg-slate-700 rounded border border-slate-600 text-sm font-bold">Store Name</button>
                       <button onClick={()=>setM2Field("roll")} className="px-3 py-1 bg-slate-800 hover:bg-slate-700 rounded border border-slate-600 text-sm font-bold">Store Roll</button>
                       <button onClick={()=>setM2Field("marks")} className="px-3 py-1 bg-slate-800 hover:bg-slate-700 rounded border border-slate-600 text-sm font-bold">Store Marks</button>
                     </div>
                   )}
                   {m2Mode === "union" && m2Field !== "none" && (
                     <div className="bg-red-950/40 border border-red-500/50 p-3 rounded-lg text-red-400 text-sm font-bold mt-4 animate-in slide-in-from-right-4">
                       Warning: Previous data has been overwritten!
                     </div>
                   )}
                </div>
             </div>
          </div>
       </div>
    </div>
  );

  // ---------------------------------------------------------
  // MISSION 3: Bit Field Control Room - c-w10-3
  // ---------------------------------------------------------
  const [m3Flags, setM3Flags] = useState([false, false, false, false]);
  const [m3Optimized, setM3Optimized] = useState(false);

  const toggleFlag = (i: number) => {
    const newF = [...m3Flags];
    newF[i] = !newF[i];
    setM3Flags(newF);
    if(!newF.includes(false) && m3Optimized) {
      addXp(150, "Data Optimizer Badge!");
    }
  };

  const renderMission3 = () => (
    <div className="flex flex-col h-full gap-4">
       <div className="flex-1 bg-slate-900 rounded-xl border border-emerald-500/30 p-6 flex flex-col justify-center items-center relative overflow-hidden">
          <h3 className="absolute top-6 left-6 font-bold text-xl flex items-center gap-2 z-10 text-emerald-400 uppercase tracking-widest"><Settings2 className="size-6" /> Spacecraft Control</h3>
          
          <div className="absolute top-6 right-6 flex items-center gap-3">
             <span className="font-bold text-muted-foreground uppercase text-sm">Memory Mode:</span>
             <button onClick={()=>setM3Optimized(false)} className={`px-4 py-1.5 rounded-l-lg font-bold text-sm ${!m3Optimized ? 'bg-red-600 text-white' : 'bg-slate-800 text-slate-400 border border-slate-700'}`}>Standard (4 Bytes)</button>
             <button onClick={()=>setM3Optimized(true)} className={`px-4 py-1.5 rounded-r-lg font-bold text-sm ${m3Optimized ? 'bg-emerald-600 text-white' : 'bg-slate-800 text-slate-400 border border-slate-700'}`}>Bit Fields (1 Byte)</button>
          </div>

          <div className="grid grid-cols-2 gap-8 w-full max-w-3xl z-10 mt-12">
             {[
               { id: "Engine", icon: <Zap className="size-8" /> },
               { id: "Shields", icon: <ShieldAlert className="size-8" /> },
               { id: "Comms", icon: <Network className="size-8" /> },
               { id: "Life Support", icon: <Activity className="size-8" /> }
             ].map((sys, i) => (
                <div key={i} onClick={() => toggleFlag(i)} className={`cursor-pointer rounded-2xl border-4 p-6 flex items-center justify-between transition-all duration-300 hover:scale-105
                   ${m3Flags[i] ? 'border-emerald-500 bg-emerald-950/40 text-emerald-400 shadow-[0_0_30px_rgba(16,185,129,0.3)]' : 'border-slate-700 bg-slate-800 text-slate-500'}
                `}>
                   <div className="flex items-center gap-4">
                     {sys.icon}
                     <div className="font-black text-2xl uppercase tracking-widest">{sys.id}</div>
                   </div>
                   <div className={`w-16 h-8 rounded-full flex items-center px-1 transition-colors ${m3Flags[i] ? 'bg-emerald-500' : 'bg-slate-900'}`}>
                      <div className={`size-6 bg-white rounded-full transition-transform shadow-md ${m3Flags[i] ? 'translate-x-8' : 'translate-x-0'}`} />
                   </div>
                </div>
             ))}
          </div>

          <div className="mt-16 bg-slate-950 px-8 py-4 rounded-xl border border-border w-full max-w-3xl flex items-center justify-between">
             <div className="text-muted-foreground font-bold uppercase tracking-widest">Memory Footprint</div>
             <div className="flex items-center gap-2">
                {!m3Optimized ? (
                  <>
                    <div className="size-8 bg-red-500/20 border border-red-500 rounded animate-pulse"></div>
                    <div className="size-8 bg-red-500/20 border border-red-500 rounded animate-pulse"></div>
                    <div className="size-8 bg-red-500/20 border border-red-500 rounded animate-pulse"></div>
                    <div className="size-8 bg-red-500/20 border border-red-500 rounded animate-pulse"></div>
                    <span className="ml-4 font-black text-2xl text-red-400">4 Bytes</span>
                  </>
                ) : (
                  <>
                    <div className="flex bg-emerald-500/20 border border-emerald-500 rounded overflow-hidden">
                       <div className={`h-8 w-6 border-r border-emerald-500/50 ${m3Flags[0]?'bg-emerald-500':''}`}></div>
                       <div className={`h-8 w-6 border-r border-emerald-500/50 ${m3Flags[1]?'bg-emerald-500':''}`}></div>
                       <div className={`h-8 w-6 border-r border-emerald-500/50 ${m3Flags[2]?'bg-emerald-500':''}`}></div>
                       <div className={`h-8 w-6 ${m3Flags[3]?'bg-emerald-500':''}`}></div>
                    </div>
                    <span className="ml-4 font-black text-2xl text-emerald-400">1 Byte (4 Bits Used)</span>
                  </>
                )}
             </div>
          </div>
       </div>
    </div>
  );

  return (
    <div className="flex flex-col h-full bg-slate-950 text-foreground p-6 overflow-hidden relative font-sans">
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-border shrink-0">
        <div>
          <h2 className="text-2xl font-black text-emerald-400 flex items-center gap-3 uppercase tracking-widest drop-shadow-[0_0_10px_rgba(52,211,153,0.3)]">
            <LayoutTemplate className="size-7 text-emerald-400" /> Data Architect District
          </h2>
        </div>
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2 bg-emerald-950/50 px-4 py-1.5 rounded-full border border-emerald-900 font-bold shadow-sm text-emerald-100">
            <Star className="size-4 text-emerald-400" /> {xp} XP
          </div>
          <div className="text-sm font-bold text-emerald-300 uppercase tracking-widest">
             {expId === "c-w10-1" && "Mission: Network Builder"}
             {expId === "c-w10-2" && "Mission: Smart Building Lab"}
             {expId === "c-w10-3" && "Mission: Bit Field Control"}
          </div>
        </div>
      </div>

      {successMsg && (
        <div className="absolute top-24 left-1/2 -translate-x-1/2 bg-emerald-600 text-white px-6 py-3 rounded-lg shadow-xl animate-in slide-in-from-top-10 z-50 font-bold flex items-center gap-2">
          <Star className="size-5 fill-white" /> {successMsg}
        </div>
      )}

      <div className="flex-1 min-h-0 overflow-y-auto">
        {expId === "c-w10-1" && renderMission1()}
        {expId === "c-w10-2" && renderMission2()}
        {expId === "c-w10-3" && renderMission3()}
        {expId === "c-w10-4" && (
           <div className="flex items-center justify-center h-full flex-col text-center bg-slate-900 rounded-xl border border-slate-800">
              <Hammer className="size-32 text-emerald-500 mb-8 animate-pulse drop-shadow-[0_0_40px_rgba(52,211,153,0.6)]" />
              <h1 className="text-5xl font-black text-emerald-400 uppercase tracking-widest mb-6 drop-shadow-[0_0_20px_rgba(52,211,153,0.5)]">Infrastructure Restored</h1>
              <p className="text-slate-400 max-w-xl text-xl leading-relaxed">
                The Data Architect District is fully operational. Roads connect seamlessly via linked lists, and buildings are optimized using structures, unions, and bit fields!
              </p>
           </div>
        )}
      </div>
    </div>
  );
}
