import { useState, useEffect } from "react";
import { 
  Grid, Shield, ArrowDownUp, MessageSquarePlus, RefreshCw, 
  Box, Zap, Search, ShieldAlert, Cpu, CheckCircle2,
  Play, Hexagon, ArrowRight, Server, Star, Castle, Layers
} from "lucide-react";

type MatrixCitadelProps = {
  expId: string; // c-w8-1 to c-w8-5
};

export function MatrixCitadelCampaign({ expId }: MatrixCitadelProps) {
  const [xp, setXp] = useState(0);
  const [successMsg, setSuccessMsg] = useState("");

  const addXp = (amount: number, reason: string) => {
    setXp(x => x + amount);
    setSuccessMsg(`+${amount} XP: ${reason}`);
    setTimeout(() => setSuccessMsg(""), 3000);
  };

  // ---------------------------------------------------------
  // MISSION 1: Crystal Grid Fusion (Matrix Addition) - c-w8-1
  // ---------------------------------------------------------
  const [m1Step, setM1Step] = useState(0);
  const m1GridA = [[1, 2], [3, 4]];
  const m1GridB = [[5, 6], [7, 8]];
  const [m1Row, setM1Row] = useState(-1);
  const [m1Col, setM1Col] = useState(-1);

  const runM1 = async () => {
    setM1Step(1);
    for (let r = 0; r < 2; r++) {
      for (let c = 0; c < 2; c++) {
        setM1Row(r);
        setM1Col(c);
        await new Promise(res => setTimeout(res, 800));
      }
    }
    setM1Row(-1);
    setM1Col(-1);
    setM1Step(2);
    addXp(100, "Grid Fusion Badge!");
    setTimeout(() => setM1Step(0), 4000);
  };

  const renderMission1 = () => (
    <div className="flex flex-col h-full gap-4">
       <div className="flex-1 bg-slate-900 rounded-xl border border-blue-500/30 p-6 flex flex-col justify-center items-center relative overflow-hidden">
          <h3 className="absolute top-6 left-6 font-bold text-xl flex items-center gap-2 z-10 text-blue-400 uppercase tracking-widest"><Grid className="size-6" /> Energy Grids</h3>
          
          <div className="flex items-center justify-center gap-8 mb-12 flex-wrap w-full">
             {/* Grid A */}
             <div className="bg-card p-4 rounded-xl border-2 border-slate-700 relative">
               <div className="absolute -top-3 left-4 bg-slate-800 px-2 text-xs font-bold text-muted-foreground uppercase tracking-widest">Grid A</div>
               <div className="grid grid-cols-2 gap-2">
                 {m1GridA.map((row, r) => row.map((val, c) => (
                   <div key={`a-${r}-${c}`} className={`size-16 rounded flex items-center justify-center font-black text-2xl border-2 transition-all duration-300
                     ${m1Row === r && m1Col === c ? 'border-cyan-400 bg-cyan-900/40 text-cyan-300 scale-110 shadow-[0_0_15px_rgba(34,211,238,0.5)]' : 'border-slate-700 bg-slate-800 text-slate-300'}
                   `}>{val}</div>
                 )))}
               </div>
             </div>

             <div className="text-4xl font-black text-slate-600">+</div>

             {/* Grid B */}
             <div className="bg-card p-4 rounded-xl border-2 border-slate-700 relative">
               <div className="absolute -top-3 left-4 bg-slate-800 px-2 text-xs font-bold text-muted-foreground uppercase tracking-widest">Grid B</div>
               <div className="grid grid-cols-2 gap-2">
                 {m1GridB.map((row, r) => row.map((val, c) => (
                   <div key={`b-${r}-${c}`} className={`size-16 rounded flex items-center justify-center font-black text-2xl border-2 transition-all duration-300
                     ${m1Row === r && m1Col === c ? 'border-blue-400 bg-blue-900/40 text-blue-300 scale-110 shadow-[0_0_15px_rgba(59,130,246,0.5)]' : 'border-slate-700 bg-slate-800 text-slate-300'}
                   `}>{val}</div>
                 )))}
               </div>
             </div>

             <div className="text-4xl font-black text-slate-600">=</div>

             {/* Result Grid */}
             <div className="bg-slate-950 p-4 rounded-xl border-2 border-blue-500/50 relative shadow-[0_0_30px_rgba(59,130,246,0.2)]">
               <div className="absolute -top-3 left-4 bg-slate-900 px-2 text-xs font-bold text-blue-400 uppercase tracking-widest">Result</div>
               <div className="grid grid-cols-2 gap-2">
                 {m1GridA.map((row, r) => row.map((_, c) => {
                   const isMerged = m1Step === 2 || (m1Step === 1 && (r < m1Row || (r === m1Row && c <= m1Col)));
                   return (
                     <div key={`res-${r}-${c}`} className={`size-16 rounded flex flex-col items-center justify-center font-black border-2 transition-all duration-300 overflow-hidden relative
                       ${m1Row === r && m1Col === c ? 'border-emerald-400 bg-emerald-900/40 scale-110 shadow-[0_0_20px_rgba(52,211,153,0.5)]' : 
                         isMerged ? 'border-slate-600 bg-slate-800/80 text-white' : 'border-slate-800 bg-slate-900/50 text-transparent'}
                     `}>
                       {m1Row === r && m1Col === c && (
                         <div className="absolute inset-0 flex flex-col items-center justify-center text-xs text-emerald-300 bg-emerald-950/80 animate-pulse font-mono">
                           {m1GridA[r][c]} + {m1GridB[r][c]}
                         </div>
                       )}
                       {isMerged && m1Row !== r && m1Col !== c && <span className="text-2xl animate-in zoom-in">{m1GridA[r][c] + m1GridB[r][c]}</span>}
                       {isMerged && m1Row === r && m1Col === c && <span className="text-2xl invisible">{m1GridA[r][c] + m1GridB[r][c]}</span>}
                     </div>
                   );
                 }))}
               </div>
             </div>
          </div>

          {m1Step === 0 && (
            <button onClick={runM1} className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-[0_0_20px_rgba(37,99,235,0.4)] mt-4">
              Initiate Fusion
            </button>
          )}

          {m1Step === 2 && (
             <div className="mt-4 text-emerald-400 font-bold uppercase tracking-widest animate-in slide-in-from-bottom-4 flex items-center gap-2">
               <Zap className="size-6" /> Grids Synchronized
             </div>
          )}
       </div>
    </div>
  );

  // ---------------------------------------------------------
  // MISSION 2: Matrix War Simulator (Multiplication) - c-w8-2
  // ---------------------------------------------------------
  const [m2Step, setM2Step] = useState(0);
  const m2A = [[1, 2], [3, 4]];
  const m2B = [[5, 6], [7, 8]];
  const [m2Row, setM2Row] = useState(-1);
  const [m2Col, setM2Col] = useState(-1);
  const [m2K, setM2K] = useState(-1);

  const runM2 = async () => {
    setM2Step(1);
    for (let r = 0; r < 2; r++) {
      for (let c = 0; c < 2; c++) {
        setM2Row(r);
        setM2Col(c);
        for(let k = 0; k < 2; k++) {
          setM2K(k);
          await new Promise(res => setTimeout(res, 800));
        }
      }
    }
    setM2Row(-1);
    setM2Col(-1);
    setM2K(-1);
    setM2Step(2);
    addXp(150, "Matrix Commander Badge!");
    setTimeout(() => setM2Step(0), 5000);
  };

  const renderMission2 = () => (
    <div className="flex flex-col h-full gap-4">
       <div className="flex-1 bg-slate-950 rounded-xl border border-red-500/30 p-6 flex flex-col justify-center items-center relative overflow-hidden">
          <h3 className="absolute top-6 left-6 font-bold text-xl flex items-center gap-2 z-10 text-red-500 uppercase tracking-widest"><Shield className="size-6" /> Defense Network</h3>
          
          <div className="flex items-center justify-center gap-4 mb-16 flex-wrap w-full">
             {/* Attack Matrix */}
             <div className="bg-card p-4 rounded-xl border-2 border-slate-800 relative">
               <div className="absolute -top-3 left-4 bg-slate-900 px-2 text-xs font-bold text-red-500 uppercase tracking-widest flex items-center gap-1"><Zap className="size-3" /> Attack</div>
               <div className="grid grid-cols-2 gap-2">
                 {m2A.map((row, r) => row.map((val, c) => (
                   <div key={`a-${r}-${c}`} className={`size-16 rounded flex items-center justify-center font-black text-2xl border-2 transition-all duration-300
                     ${m2Row === r ? 'border-red-500 bg-red-950/40 text-red-400' : 'border-slate-800 bg-slate-900 text-slate-500'}
                     ${m2Row === r && m2K === c ? 'scale-110 shadow-[0_0_15px_rgba(239,68,68,0.5)] border-white text-white' : ''}
                   `}>{val}</div>
                 )))}
               </div>
               {m2Row !== -1 && <div className="absolute -right-4 top-1/2 -translate-y-1/2 text-red-500 font-bold tracking-widest uppercase rotate-90 text-xs">ROW {m2Row}</div>}
             </div>

             <div className="text-4xl font-black text-slate-700">×</div>

             {/* Defense Matrix */}
             <div className="bg-card p-4 rounded-xl border-2 border-slate-800 relative">
               <div className="absolute -top-3 left-4 bg-slate-900 px-2 text-xs font-bold text-blue-500 uppercase tracking-widest flex items-center gap-1"><Shield className="size-3" /> Defense</div>
               <div className="grid grid-cols-2 gap-2">
                 {m2B.map((row, r) => row.map((val, c) => (
                   <div key={`b-${r}-${c}`} className={`size-16 rounded flex items-center justify-center font-black text-2xl border-2 transition-all duration-300
                     ${m2Col === c ? 'border-blue-500 bg-blue-950/40 text-blue-400' : 'border-slate-800 bg-slate-900 text-slate-500'}
                     ${m2Col === c && m2K === r ? 'scale-110 shadow-[0_0_15px_rgba(59,130,246,0.5)] border-white text-white' : ''}
                   `}>{val}</div>
                 )))}
               </div>
               {m2Col !== -1 && <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-blue-500 font-bold tracking-widest uppercase text-xs">COL {m2Col}</div>}
             </div>

             <div className="text-4xl font-black text-slate-700">=</div>

             {/* Result Matrix */}
             <div className="bg-slate-900 p-4 rounded-xl border-2 border-purple-500/50 relative shadow-[0_0_30px_rgba(168,85,247,0.2)] min-w-[180px]">
               <div className="absolute -top-3 left-4 bg-slate-950 px-2 text-xs font-bold text-purple-400 uppercase tracking-widest">Shield Core</div>
               <div className="grid grid-cols-2 gap-2">
                 {m2A.map((row, r) => row.map((_, c) => {
                   const isMerged = m2Step === 2 || (m2Step === 1 && (r < m2Row || (r === m2Row && c < m2Col)));
                   const isCurrent = m2Row === r && m2Col === c;
                   const val = (m2A[r][0] * m2B[0][c]) + (m2A[r][1] * m2B[1][c]);
                   
                   return (
                     <div key={`res-${r}-${c}`} className={`size-16 rounded flex flex-col items-center justify-center font-black border-2 transition-all duration-300 relative
                       ${isCurrent ? 'border-purple-400 bg-purple-900/40 shadow-[0_0_20px_rgba(192,132,252,0.5)] scale-110' : 
                         isMerged ? 'border-slate-600 bg-slate-800 text-white' : 'border-slate-800 bg-slate-950 text-transparent'}
                     `}>
                       {isCurrent && m2K !== -1 && (
                         <div className="absolute -top-10 whitespace-nowrap bg-purple-950 border border-purple-500 px-3 py-1 rounded-lg text-purple-300 text-xs font-mono z-20">
                           ({m2A[r][0]}×{m2B[0][c]}) + ({m2A[r][1]}×{m2B[1][c]})
                         </div>
                       )}
                       {isMerged && !isCurrent && <span className="text-xl">{val}</span>}
                     </div>
                   );
                 }))}
               </div>
             </div>
          </div>

          {m2Step === 0 && (
            <button onClick={runM2} className="px-8 py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl shadow-[0_0_20px_rgba(220,38,38,0.4)]">
              Initialize Defense
            </button>
          )}

          {m2Step === 2 && (
             <div className="text-purple-400 font-bold uppercase tracking-widest animate-in zoom-in duration-500 flex items-center gap-2 text-2xl">
               <ShieldAlert className="size-8" /> Matrix Shield Activated
             </div>
          )}
       </div>
    </div>
  );

  // ---------------------------------------------------------
  // MISSION 3: Bubble Transport (Bubble Sort) - c-w8-3
  // ---------------------------------------------------------
  const [m3Arr, setM3Arr] = useState([64, 34, 25, 12, 22]);
  const [m3Step, setM3Step] = useState(0);
  const [m3Scan, setM3Scan] = useState(-1);

  const runM3 = async () => {
    setM3Step(1);
    const arr = [...m3Arr];
    const n = arr.length;
    for (let i = 0; i < n - 1; i++) {
      for (let j = 0; j < n - i - 1; j++) {
        setM3Scan(j);
        await new Promise(res => setTimeout(res, 600));
        if (arr[j] > arr[j + 1]) {
          const temp = arr[j];
          arr[j] = arr[j + 1];
          arr[j + 1] = temp;
          setM3Arr([...arr]);
          await new Promise(res => setTimeout(res, 600));
        }
      }
    }
    setM3Scan(-1);
    setM3Step(2);
    addXp(120, "Sorting Engineer Badge!");
    setTimeout(() => {setM3Step(0); setM3Arr([64,34,25,12,22]);}, 4000);
  };

  const renderMission3 = () => (
    <div className="flex flex-col h-full gap-4">
       <div className="flex-1 bg-gradient-to-t from-slate-900 to-cyan-950/20 rounded-xl border border-cyan-500/30 p-6 flex flex-col justify-center items-center relative overflow-hidden">
          <h3 className="absolute top-6 left-6 font-bold text-xl flex items-center gap-2 z-10 text-cyan-500 uppercase tracking-widest"><ArrowDownUp className="size-6" /> Cargo Transport</h3>
          
          <div className="h-64 flex items-end justify-center gap-4 mb-12 w-full border-b-4 border-cyan-900/50 pb-4 relative">
             {/* Tube grid background */}
             <div className="absolute inset-0 bg-[linear-gradient(to_right,#083344_1px,transparent_1px)] bg-[size:20px_100%] opacity-20" />
             
             {m3Arr.map((val, i) => {
               const isComparing = m3Scan === i || m3Scan === i - 1;
               return (
                 <div key={`${val}-${i}`} className={`relative w-16 rounded-t-xl flex flex-col items-center justify-start pt-4 font-black text-2xl transition-all duration-500 ease-in-out border-x-4 border-t-4 border-b-0
                    ${isComparing ? 'bg-cyan-900/60 border-cyan-400 shadow-[0_-20px_30px_rgba(34,211,238,0.4)] text-white' : 'bg-slate-800 border-slate-600 text-slate-400'}
                    ${m3Step === 2 ? 'bg-green-900/40 border-green-500 text-green-400 shadow-[0_-20px_30px_rgba(34,197,94,0.2)]' : ''}
                 `} style={{ height: `${val * 3}px`, minHeight: '50px' }}>
                    <div className="bg-slate-950/50 p-2 rounded-full size-12 flex items-center justify-center border border-white/10 z-10">{val}</div>
                    
                    {/* Bubble effect for largest elements floating up */}
                    {isComparing && <div className="absolute -top-6 text-cyan-400 animate-bounce size-4 rounded-full bg-cyan-400/50 blur-sm" />}
                 </div>
               )
             })}
          </div>

          {m3Step === 0 && (
            <button onClick={runM3} className="px-8 py-3 bg-cyan-600 hover:bg-cyan-700 text-white font-bold rounded-xl shadow-[0_0_20px_rgba(8,145,178,0.4)]">
              Optimize Pod Order
            </button>
          )}

          {m3Step === 2 && (
             <div className="text-green-400 font-bold uppercase tracking-widest animate-in zoom-in text-xl">
               Transport Tubes Clear
             </div>
          )}
       </div>
    </div>
  );

  // ---------------------------------------------------------
  // MISSION 4: Message Fusion (String Concat) - c-w8-4
  // ---------------------------------------------------------
  const [m4Step, setM4Step] = useState(0);

  const runM4 = () => {
    setM4Step(1); // Merging
    setTimeout(() => {
      setM4Step(2);
      addXp(100, "Message Builder Badge!");
    }, 2000);
    setTimeout(() => setM4Step(0), 5000);
  };

  const renderMission4 = () => (
    <div className="flex flex-col h-full gap-4">
       <div className="flex-1 bg-slate-900 rounded-xl border border-amber-500/30 p-6 flex flex-col justify-center items-center relative overflow-hidden">
          <h3 className="absolute top-6 left-6 font-bold text-xl flex items-center gap-2 z-10 text-amber-500 uppercase tracking-widest"><MessageSquarePlus className="size-6" /> Communication Chamber</h3>
          
          <div className="flex items-center justify-center h-48 w-full relative">
             <div className={`absolute transition-all duration-1000 flex items-center justify-center p-6 border-2 border-amber-600 bg-amber-950/40 rounded-xl font-mono text-3xl font-black text-amber-400 shadow-lg
                ${m4Step === 0 ? 'left-[20%] -translate-x-1/2' : 'left-[40%] -translate-x-1/2'}
                ${m4Step === 2 ? 'opacity-0 scale-150 blur-sm' : 'opacity-100'}
             `}>"Hello"</div>
             
             <div className={`absolute transition-all duration-1000 flex items-center justify-center p-6 border-2 border-amber-600 bg-amber-950/40 rounded-xl font-mono text-3xl font-black text-amber-400 shadow-lg
                ${m4Step === 0 ? 'right-[20%] translate-x-1/2' : 'right-[40%] translate-x-1/2'}
                ${m4Step === 2 ? 'opacity-0 scale-150 blur-sm' : 'opacity-100'}
             `}>"World"</div>

             {m4Step === 2 && (
               <div className="absolute inset-0 flex items-center justify-center animate-in zoom-in duration-700">
                  <div className="p-8 border-4 border-emerald-500 bg-emerald-950/60 rounded-2xl font-mono text-5xl font-black text-emerald-400 shadow-[0_0_50px_rgba(16,185,129,0.5)]">
                    "HelloWorld"
                  </div>
               </div>
             )}
          </div>

          {m4Step === 0 && (
            <button onClick={runM4} className="mt-8 px-8 py-3 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-xl shadow-[0_0_20px_rgba(217,119,6,0.4)]">
              Fuse Fragments
            </button>
          )}
       </div>
    </div>
  );

  // ---------------------------------------------------------
  // MISSION 5: Mirror Archive (String Reverse) - c-w8-5
  // ---------------------------------------------------------
  const [m5Step, setM5Step] = useState(0);
  const m5Str = "EDOC";
  const [m5Arr, setM5Arr] = useState(m5Str.split(""));
  const [m5L, setM5L] = useState(-1);
  const [m5R, setM5R] = useState(-1);

  const runM5 = async () => {
    setM5Step(1);
    const arr = [...m5Arr];
    let left = 0;
    let right = arr.length - 1;

    while (left < right) {
      setM5L(left);
      setM5R(right);
      await new Promise(res => setTimeout(res, 800));
      
      const temp = arr[left];
      arr[left] = arr[right];
      arr[right] = temp;
      setM5Arr([...arr]);
      
      await new Promise(res => setTimeout(res, 600));
      left++;
      right--;
    }
    setM5L(-1);
    setM5R(-1);
    setM5Step(2);
    addXp(150, "Mirror Decoder Badge!");
    setTimeout(() => {setM5Step(0); setM5Arr("EDOC".split(""));}, 4000);
  };

  const renderMission5 = () => (
    <div className="flex flex-col h-full gap-4">
       <div className="flex-1 bg-slate-900 rounded-xl border border-fuchsia-500/30 p-6 flex flex-col justify-center items-center relative overflow-hidden">
          <h3 className="absolute top-6 left-6 font-bold text-xl flex items-center gap-2 z-10 text-fuchsia-400 uppercase tracking-widest"><RefreshCw className="size-6" /> Mirror Archive</h3>
          
          <div className="flex items-center justify-center gap-4 mb-16 w-full">
             {m5Arr.map((char, i) => (
                <div key={i} className={`relative size-24 rounded-xl border-4 flex items-center justify-center font-mono font-black text-5xl transition-all duration-500
                   ${m5L === i || m5R === i ? 'border-fuchsia-400 bg-fuchsia-950/60 text-white shadow-[0_0_30px_rgba(217,70,239,0.5)] -translate-y-4' : 'border-slate-700 bg-slate-800 text-slate-500'}
                   ${m5Step === 2 ? 'border-green-500 bg-green-950/60 text-green-400 shadow-[0_0_20px_rgba(34,197,94,0.3)]' : ''}
                `}>
                   {char}
                </div>
             ))}
          </div>

          {m5Step === 0 && (
            <button onClick={runM5} className="px-8 py-3 bg-fuchsia-600 hover:bg-fuchsia-700 text-white font-bold rounded-xl shadow-[0_0_20px_rgba(192,38,211,0.4)]">
              Decode Scroll
            </button>
          )}

          {m5Step === 2 && (
             <div className="text-green-400 font-bold uppercase tracking-widest animate-in zoom-in text-2xl flex items-center gap-2">
               <CheckCircle2 className="size-8" /> Message Decoded
             </div>
          )}
       </div>
    </div>
  );

  return (
    <div className="flex flex-col h-full bg-slate-950 text-foreground p-6 overflow-hidden relative font-sans">
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-border shrink-0">
        <div>
          <h2 className="text-2xl font-black text-blue-400 flex items-center gap-3 uppercase tracking-widest drop-shadow-[0_0_10px_rgba(96,165,250,0.3)]">
            <Castle className="size-7 text-blue-400" /> Matrix Citadel
          </h2>
        </div>
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2 bg-blue-950/50 px-4 py-1.5 rounded-full border border-blue-900 font-bold shadow-sm text-blue-100">
            <Star className="size-4 text-blue-400" /> {xp} XP
          </div>
          <div className="text-sm font-bold text-blue-300 uppercase tracking-widest">
             {expId === "c-w8-1" && "Mission: Grid Fusion"}
             {expId === "c-w8-2" && "Mission: War Simulator"}
             {expId === "c-w8-3" && "Mission: Bubble Transport"}
             {expId === "c-w8-4" && "Mission: Message Fusion"}
             {expId === "c-w8-5" && "Mission: Mirror Archive"}
          </div>
        </div>
      </div>

      {successMsg && (
        <div className="absolute top-24 left-1/2 -translate-x-1/2 bg-blue-600 text-white px-6 py-3 rounded-lg shadow-xl animate-in slide-in-from-top-10 z-50 font-bold flex items-center gap-2">
          <Star className="size-5 fill-white" /> {successMsg}
        </div>
      )}

      <div className="flex-1 min-h-0 overflow-y-auto">
        {expId === "c-w8-1" && renderMission1()}
        {expId === "c-w8-2" && renderMission2()}
        {expId === "c-w8-3" && renderMission3()}
        {expId === "c-w8-4" && renderMission4()}
        {expId === "c-w8-5" && renderMission5()}
        {/* Boss screen fallback if accessed directly beyond 5 */}
        {expId === "c-w8-6" && (
           <div className="flex items-center justify-center h-full flex-col text-center bg-slate-900 rounded-xl border border-slate-800">
              <Hexagon className="size-32 text-blue-500 mb-8 animate-spin-slow drop-shadow-[0_0_40px_rgba(59,130,246,0.6)]" />
              <h1 className="text-5xl font-black text-blue-400 uppercase tracking-widest mb-6 drop-shadow-[0_0_20px_rgba(96,165,250,0.5)]">Citadel Restored</h1>
              <p className="text-slate-400 max-w-xl text-xl leading-relaxed">
                The Matrix Core is fully online. Rows and columns are aligned, messages flow freely, and sorting tubes operate smoothly.
              </p>
           </div>
        )}
      </div>
    </div>
  );
}
