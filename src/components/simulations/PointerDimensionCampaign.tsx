import { useState, useEffect } from "react";
import { 
  Crosshair, ArrowLeftRight, ScrollText, ScanSearch, Ghost,
  Box, Zap, Search, ShieldAlert, Cpu, CheckCircle2,
  Play, Hexagon, ArrowRight, Server, Star, RotateCcw, ShieldX,
  FileCode2, Home, Hash
} from "lucide-react";

type PointerDimensionProps = {
  expId: string; // c-w13-1 to c-w13-5
};

export function PointerDimensionCampaign({ expId }: PointerDimensionProps) {
  const [xp, setXp] = useState(0);
  const [successMsg, setSuccessMsg] = useState("");

  const addXp = (amount: number, reason: string) => {
    setXp(x => x + amount);
    setSuccessMsg(`+${amount} XP: ${reason}`);
    setTimeout(() => setSuccessMsg(""), 3000);
  };

  // ---------------------------------------------------------
  // MISSION 1: Swap Reality (Call by Reference) - c-w13-1
  // ---------------------------------------------------------
  const [m1Mode, setM1Mode] = useState<"value" | "reference" | null>(null);
  const [m1A, setM1A] = useState(10);
  const [m1B, setM1B] = useState(20);
  const [m1Step, setM1Step] = useState(0);

  const runM1 = async () => {
    setM1Step(1); // Portals open
    await new Promise(r => setTimeout(r, 1500));
    setM1Step(2); // Swap happens
    
    if (m1Mode === "reference") {
      setM1A(20);
      setM1B(10);
      addXp(100, "Reality Swapped!");
    }
    
    await new Promise(r => setTimeout(r, 2000));
    setM1Step(3); // Result
    setTimeout(() => {setM1Step(0); setM1A(10); setM1B(20); setM1Mode(null);}, 4000);
  };

  const renderMission1 = () => (
    <div className="flex flex-col h-full gap-4">
       <div className="flex-1 bg-slate-950 rounded-xl border border-yellow-500/30 p-6 flex flex-col justify-center items-center relative overflow-hidden">
          <h3 className="absolute top-6 left-6 font-bold text-xl flex items-center gap-2 z-10 text-yellow-500 uppercase tracking-widest"><ArrowLeftRight className="size-6" /> Swap Reality</h3>
          
          <div className="flex gap-4 mb-12 z-10">
             <button onClick={() => {setM1Mode("value"); setM1Step(0); setM1A(10); setM1B(20);}} className={`px-8 py-3 font-bold rounded-xl transition-colors ${m1Mode === 'value' ? 'bg-red-600 text-white shadow-[0_0_20px_rgba(220,38,38,0.4)]' : 'bg-slate-800 text-slate-400 border border-slate-700'}`}>
               Call by Value
             </button>
             <button onClick={() => {setM1Mode("reference"); setM1Step(0); setM1A(10); setM1B(20);}} className={`px-8 py-3 font-bold rounded-xl transition-colors ${m1Mode === 'reference' ? 'bg-yellow-600 text-white shadow-[0_0_20px_rgba(234,179,8,0.4)]' : 'bg-slate-800 text-slate-400 border border-slate-700'}`}>
               Call by Reference
             </button>
          </div>

          <div className="flex justify-center gap-24 items-center w-full z-10 min-h-[300px]">
             {/* Tower A */}
             <div className="relative flex flex-col items-center">
                <div className="w-32 h-48 bg-slate-900 border-4 border-slate-700 flex flex-col justify-end items-center pb-8 rounded-t-[2rem] relative">
                  <div className="absolute top-4 bg-slate-800 px-3 py-1 rounded text-xs font-bold font-mono text-slate-400">0x100</div>
                  <div className="text-6xl font-black text-white z-10 relative">
                     <span className={m1Step === 2 && m1Mode === "reference" ? "animate-pulse text-yellow-400" : ""}>{m1A}</span>
                  </div>
                </div>
                <div className="font-bold text-slate-500 mt-4 text-xl tracking-widest">TOWER A</div>
                
                {/* Pointer Link A */}
                {m1Step >= 1 && m1Mode === "reference" && (
                   <div className="absolute -top-16 text-yellow-500 font-mono font-bold flex flex-col items-center animate-in zoom-in">
                      *ptrA
                      <ArrowDown className="size-8 mt-1 animate-pulse" />
                   </div>
                )}
             </div>

             {/* Swap Portal Zone */}
             <div className="flex flex-col items-center justify-center relative w-48 h-48">
                {m1Step >= 1 && m1Mode === "value" && (
                   <div className="absolute inset-0 border-4 border-dashed border-red-500/50 rounded-full flex items-center justify-center bg-red-950/20 animate-spin-slow">
                     <div className="text-red-400 font-bold uppercase tracking-widest text-xs bg-slate-950 px-2 py-1 rounded-full absolute -top-4">Clone Sandbox</div>
                   </div>
                )}
                {m1Step >= 1 && m1Mode === "reference" && (
                   <div className="absolute inset-0 border-4 border-dashed border-yellow-500/50 rounded-full flex items-center justify-center bg-yellow-950/20 animate-spin-slow shadow-[0_0_40px_rgba(234,179,8,0.2)]">
                     <div className="text-yellow-400 font-bold uppercase tracking-widest text-xs bg-slate-950 px-2 py-1 rounded-full absolute -top-4">Direct Link</div>
                   </div>
                )}
                
                {m1Step === 2 && m1Mode === "value" && <div className="text-red-400 font-black text-2xl animate-in zoom-in absolute text-center z-10"><ShieldX className="size-8 mx-auto mb-2" /> SWAP FAILED<br/><span className="text-sm font-normal">Only clones swapped</span></div>}
                {m1Step === 2 && m1Mode === "reference" && <div className="text-yellow-400 font-black text-2xl animate-in zoom-in absolute text-center z-10"><CheckCircle2 className="size-8 mx-auto mb-2" /> SWAP SUCCESS</div>}
             </div>

             {/* Tower B */}
             <div className="relative flex flex-col items-center">
                <div className="w-32 h-48 bg-slate-900 border-4 border-slate-700 flex flex-col justify-end items-center pb-8 rounded-t-[2rem] relative">
                  <div className="absolute top-4 bg-slate-800 px-3 py-1 rounded text-xs font-bold font-mono text-slate-400">0x200</div>
                  <div className="text-6xl font-black text-white z-10 relative">
                     <span className={m1Step === 2 && m1Mode === "reference" ? "animate-pulse text-yellow-400" : ""}>{m1B}</span>
                  </div>
                </div>
                <div className="font-bold text-slate-500 mt-4 text-xl tracking-widest">TOWER B</div>
                
                {/* Pointer Link B */}
                {m1Step >= 1 && m1Mode === "reference" && (
                   <div className="absolute -top-16 text-yellow-500 font-mono font-bold flex flex-col items-center animate-in zoom-in">
                      *ptrB
                      <ArrowDown className="size-8 mt-1 animate-pulse" />
                   </div>
                )}
             </div>
          </div>

          {m1Step === 0 && m1Mode && (
            <button onClick={runM1} className="mt-8 px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-[0_0_20px_rgba(37,99,235,0.4)] z-10">
              Execute Swap
            </button>
          )}
       </div>
    </div>
  );

  // ---------------------------------------------------------
  // MISSION 2: Duplicate Scroll (String Copy) - c-w13-2
  // ---------------------------------------------------------
  const [m2Step, setM2Step] = useState(0);
  const m2Str = "HELLO";
  const [m2Dest, setM2Dest] = useState(["", "", "", "", "", ""]);
  const [m2Scan, setM2Scan] = useState(-1);

  const runM2 = async () => {
    setM2Step(1);
    const dest = [...m2Dest];
    for (let i = 0; i <= m2Str.length; i++) {
      setM2Scan(i);
      await new Promise(r => setTimeout(r, 800));
      if(i < m2Str.length) {
        dest[i] = m2Str[i];
      } else {
        dest[i] = "\\0";
      }
      setM2Dest([...dest]);
      await new Promise(r => setTimeout(r, 600));
    }
    setM2Step(2);
    addXp(120, "Memory Scribe Badge!");
    setTimeout(() => {setM2Step(0); setM2Dest(["", "", "", "", "", ""]); setM2Scan(-1);}, 5000);
  };

  const renderMission2 = () => (
    <div className="flex flex-col h-full gap-4">
       <div className="flex-1 bg-slate-900 rounded-xl border border-cyan-500/30 p-6 flex flex-col justify-center items-center relative overflow-hidden">
          <h3 className="absolute top-6 left-6 font-bold text-xl flex items-center gap-2 z-10 text-cyan-400 uppercase tracking-widest"><FileCode2 className="size-6" /> Memory Scribe</h3>
          
          <div className="flex flex-col gap-16 z-10">
             
             {/* Source Scroll */}
             <div className="flex items-center gap-4">
                <div className="w-32 text-right font-bold text-muted-foreground uppercase tracking-widest text-sm">Source <span className="font-mono text-cyan-500 ml-2">*src</span></div>
                <div className="flex items-center gap-2 bg-card p-4 rounded-xl border border-border">
                   {m2Str.split("").map((c, i) => (
                      <div key={`s${i}`} className={`size-12 border-2 rounded flex items-center justify-center font-black font-mono text-2xl
                         ${m2Scan === i ? 'border-cyan-400 bg-cyan-950/40 text-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.5)]' : 'border-slate-700 bg-slate-800 text-slate-300'}
                      `}>{c}</div>
                   ))}
                   <div className={`w-16 h-12 border-2 border-dashed rounded flex items-center justify-center font-black font-mono text-xl
                      ${m2Scan === m2Str.length ? 'border-red-500 bg-red-950/40 text-red-400 shadow-[0_0_15px_rgba(239,68,68,0.5)]' : 'border-slate-700 bg-slate-800 text-slate-500'}
                   `}>\0</div>
                </div>
             </div>

             {/* Copy Animation Layer */}
             {m2Step === 1 && m2Scan !== -1 && (
                <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 flex flex-col items-center animate-in zoom-in fade-in duration-500">
                   <ArrowDown className="size-12 text-cyan-500 animate-pulse" />
                   <div className="bg-cyan-950 border border-cyan-500 px-3 py-1 rounded text-cyan-300 font-mono font-bold mt-2">*dest = *src</div>
                </div>
             )}

             {/* Destination Scroll */}
             <div className="flex items-center gap-4">
                <div className="w-32 text-right font-bold text-muted-foreground uppercase tracking-widest text-sm">Destination <span className="font-mono text-cyan-500 ml-2">*dest</span></div>
                <div className="flex items-center gap-2 bg-card p-4 rounded-xl border border-border">
                   {m2Dest.map((c, i) => (
                      <div key={`d${i}`} className={`size-12 border-2 border-dashed rounded flex items-center justify-center font-black font-mono text-2xl transition-all duration-300
                         ${m2Step === 2 && i === m2Str.length ? 'border-red-500 bg-red-950/40 text-red-400 shadow-[0_0_15px_rgba(239,68,68,0.5)] border-solid' : ''}
                         ${m2Step === 2 && i < m2Str.length ? 'border-green-500 bg-green-950/40 text-green-400 shadow-[0_0_15px_rgba(34,197,94,0.5)] border-solid' : ''}
                         ${m2Step < 2 && c ? 'border-cyan-500 bg-cyan-950/40 text-cyan-400 border-solid' : ''}
                         ${!c ? 'border-slate-700 bg-slate-800 text-transparent' : ''}
                      `}>{c}</div>
                   ))}
                </div>
             </div>
          </div>

          {m2Step === 0 && (
            <button onClick={runM2} className="mt-16 px-8 py-3 bg-cyan-600 hover:bg-cyan-700 text-white font-bold rounded-xl shadow-[0_0_20px_rgba(8,145,178,0.4)] z-10">
              Begin Copy Sequence
            </button>
          )}

          {m2Step === 2 && (
             <div className="absolute bottom-10 text-green-400 font-bold text-xl uppercase tracking-widest animate-in slide-in-from-bottom-4 flex items-center gap-2">
               <CheckCircle2 className="size-6" /> Scroll Copied Successfully
             </div>
          )}
       </div>
    </div>
  );

  // ---------------------------------------------------------
  // MISSION 3: Dangling Pointer Graveyard - c-w13-3
  // ---------------------------------------------------------
  const [m3Step, setM3Step] = useState(0);

  const runM3 = () => {
    setM3Step(1); // Free memory
    setTimeout(() => {
      setM3Step(2); // Dangling warning
      addXp(200, "Memory Detective!");
    }, 2000);
    setTimeout(() => {
      setM3Step(3); // Set to NULL
    }, 5000);
    setTimeout(() => setM3Step(0), 8000);
  };

  const renderMission3 = () => (
    <div className="flex flex-col h-full gap-4">
       <div className="flex-1 bg-slate-950 rounded-xl border border-fuchsia-500/30 p-6 flex flex-col justify-center items-center relative overflow-hidden">
          <h3 className="absolute top-6 left-6 font-bold text-xl flex items-center gap-2 z-10 text-fuchsia-400 uppercase tracking-widest"><Ghost className="size-6" /> Dangling Graveyard</h3>
          
          <div className="flex items-center gap-16 z-10 h-64">
             {/* The Pointer */}
             <div className="flex flex-col items-center">
                <div className="bg-slate-800 px-6 py-3 border-2 border-slate-600 rounded-xl font-mono text-xl font-bold text-slate-300">
                  {m3Step === 3 ? "NULL" : "0x500"}
                </div>
                <div className="font-bold text-fuchsia-500 tracking-widest uppercase mt-4 text-sm bg-fuchsia-950/40 px-3 py-1 rounded">Pointer <span className="font-mono">*ptr</span></div>
             </div>

             {/* The Link */}
             <div className="relative w-32 flex items-center justify-center">
                <div className={`h-2 w-full bg-slate-700 transition-all duration-1000 origin-left
                   ${m3Step >= 1 && m3Step < 3 ? 'bg-red-500/50 shadow-[0_0_15px_rgba(239,68,68,0.5)]' : ''}
                   ${m3Step === 3 ? 'scale-x-0' : 'scale-x-100'}
                `} />
                <ArrowRight className={`absolute -right-3 size-8 transition-colors ${m3Step >= 1 && m3Step < 3 ? 'text-red-500' : 'text-slate-500'} ${m3Step === 3 ? 'hidden' : ''}`} />
             </div>

             {/* The Memory (House) */}
             <div className="relative">
                <div className={`size-32 rounded-2xl flex flex-col items-center justify-center transition-all duration-1000
                   ${m3Step === 0 ? 'bg-emerald-950/40 border-4 border-emerald-500 text-emerald-400 shadow-[0_0_30px_rgba(16,185,129,0.3)]' : 'bg-transparent border-4 border-dashed border-slate-800 text-transparent'}
                `}>
                   {m3Step === 0 && <Home className="size-10 mb-2" />}
                   {m3Step === 0 && <span className="font-black text-2xl">Value: 50</span>}
                   {m3Step >= 1 && <span className="text-slate-700 font-mono text-sm uppercase font-bold absolute text-center">Memory<br/>Freed</span>}
                   
                   {/* Ghost Appears */}
                   {m3Step === 2 && (
                     <div className="absolute inset-0 flex flex-col items-center justify-center animate-in zoom-in duration-500">
                       <Ghost className="size-20 text-red-500 drop-shadow-[0_0_20px_rgba(239,68,68,0.8)] animate-pulse" />
                     </div>
                   )}
                </div>
                <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 font-mono text-sm text-slate-500 font-bold bg-slate-900 px-2 rounded">0x500</div>
             </div>
          </div>

          <div className="h-24 flex items-center justify-center mt-8 z-10 w-full max-w-2xl">
             {m3Step === 0 && (
                <button onClick={runM3} className="px-8 py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl shadow-[0_0_20px_rgba(220,38,38,0.4)] flex items-center gap-2">
                  <Trash2 className="size-5" /> free(ptr)
                </button>
             )}
             {m3Step === 2 && (
                <div className="bg-red-950/80 border border-red-500 p-4 rounded-xl text-red-400 font-bold animate-in slide-in-from-bottom-4 w-full text-center shadow-[0_0_30px_rgba(239,68,68,0.3)]">
                   <div className="flex justify-center items-center gap-2 text-xl mb-1"><ShieldAlert className="size-6" /> DANGLING POINTER DETECTED!</div>
                   <div className="text-sm font-normal">The pointer still holds the address 0x500, but the memory is gone. Accessing it is dangerous!</div>
                </div>
             )}
             {m3Step === 3 && (
                <div className="bg-emerald-950/80 border border-emerald-500 p-4 rounded-xl text-emerald-400 font-bold animate-in slide-in-from-bottom-4 w-full text-center shadow-[0_0_30px_rgba(16,185,129,0.3)]">
                   <div className="flex justify-center items-center gap-2 text-xl mb-1"><CheckCircle2 className="size-6" /> FIXED: ptr = NULL;</div>
                   <div className="text-sm font-normal">The pointer is now safely disconnected.</div>
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
          <h2 className="text-2xl font-black text-yellow-400 flex items-center gap-3 uppercase tracking-widest drop-shadow-[0_0_10px_rgba(234,179,8,0.3)]">
            <Crosshair className="size-7 text-yellow-400" /> Pointer Dimension
          </h2>
        </div>
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2 bg-yellow-950/50 px-4 py-1.5 rounded-full border border-yellow-900 font-bold shadow-sm text-yellow-100">
            <Star className="size-4 text-yellow-400" /> {xp} XP
          </div>
          <div className="text-sm font-bold text-yellow-300 uppercase tracking-widest">
             {expId === "c-w13-1" && "Mission: Swap Reality"}
             {expId === "c-w13-2" && "Mission: Duplicate Scroll"}
             {expId === "c-w13-3" && "Mission: Dangling Graveyard"}
          </div>
        </div>
      </div>

      {successMsg && (
        <div className="absolute top-24 left-1/2 -translate-x-1/2 bg-yellow-600 text-white px-6 py-3 rounded-lg shadow-xl animate-in slide-in-from-top-10 z-50 font-bold flex items-center gap-2">
          <Star className="size-5 fill-white" /> {successMsg}
        </div>
      )}

      <div className="flex-1 min-h-0 overflow-y-auto">
        {expId === "c-w13-1" && renderMission1()}
        {expId === "c-w13-2" && renderMission2()}
        {expId === "c-w13-3" && renderMission3()}
        {expId === "c-w13-4" && (
           <div className="flex items-center justify-center h-full flex-col text-center bg-slate-900 rounded-xl border border-slate-800">
              <Crosshair className="size-32 text-yellow-500 mb-8 animate-pulse drop-shadow-[0_0_40px_rgba(234,179,8,0.6)]" />
              <h1 className="text-5xl font-black text-yellow-400 uppercase tracking-widest mb-6 drop-shadow-[0_0_20px_rgba(234,179,8,0.5)]">Reality Repaired</h1>
              <p className="text-slate-400 max-w-xl text-xl leading-relaxed">
                You have successfully managed the Pointer Dimension. By understanding Call by Reference, Pointer Traversal, and Dangling Pointers, you hold the ultimate power of C programming!
              </p>
           </div>
        )}
      </div>
    </div>
  );
}
