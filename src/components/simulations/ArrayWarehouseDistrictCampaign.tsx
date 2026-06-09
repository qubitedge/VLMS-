import { useState, useEffect } from "react";
import { 
  Package, Search, ScanLine, ArrowLeftRight, Trash2, 
  Box, AlertTriangle, Cpu, CheckCircle2,
  Play, Factory, ArrowRight, Server, Star, RotateCcw
} from "lucide-react";

type ArrayWarehouseDistrictProps = {
  expId: string; // c-w7-1 to c-w7-5
};

export function ArrayWarehouseDistrictCampaign({ expId }: ArrayWarehouseDistrictProps) {
  const [xp, setXp] = useState(0);
  const [successMsg, setSuccessMsg] = useState("");

  const addXp = (amount: number, reason: string) => {
    setXp(x => x + amount);
    setSuccessMsg(`+${amount} XP: ${reason}`);
    setTimeout(() => setSuccessMsg(""), 3000);
  };

  // ---------------------------------------------------------
  // MISSION 1: Inventory Inspector (Min/Max) - c-w7-1
  // ---------------------------------------------------------
  const m1Arr = [45, 12, 78, 34, 90, 23];
  const [m1Step, setM1Step] = useState(0);
  const [m1Scan, setM1Scan] = useState(-1);
  const [m1Min, setM1Min] = useState<number | null>(null);
  const [m1Max, setM1Max] = useState<number | null>(null);

  const runM1 = async () => {
    setM1Step(1);
    let cMin = m1Arr[0];
    let cMax = m1Arr[0];
    setM1Min(cMin);
    setM1Max(cMax);
    
    for(let i=0; i<m1Arr.length; i++) {
      setM1Scan(i);
      await new Promise(r => setTimeout(r, 800));
      if (m1Arr[i] < cMin) { cMin = m1Arr[i]; setM1Min(cMin); }
      if (m1Arr[i] > cMax) { cMax = m1Arr[i]; setM1Max(cMax); }
    }
    setM1Scan(-1);
    setM1Step(2);
    addXp(100, "Inventory Scanner Badge!");
    setTimeout(() => setM1Step(0), 5000);
  };

  const renderMission1 = () => (
    <div className="flex flex-col h-full gap-4">
       <div className="flex-1 bg-slate-900 rounded-xl border border-blue-500/30 p-6 flex flex-col justify-center relative overflow-hidden">
          <h3 className="absolute top-6 left-6 font-bold text-xl flex items-center gap-2 z-10 text-blue-400 uppercase tracking-widest"><ScanLine className="size-6" /> Inventory Inspector</h3>
          
          <div className="flex justify-center gap-4 mb-16">
             {m1Arr.map((val, i) => (
                <div key={i} className={`relative size-20 rounded-xl border-2 flex items-center justify-center font-black text-2xl transition-all duration-500
                   ${m1Scan === i ? 'border-cyan-400 bg-cyan-900/40 shadow-[0_0_20px_rgba(34,211,238,0.5)] scale-110' : 'border-slate-700 bg-slate-800 text-slate-300'}
                   ${m1Step === 2 && val === m1Min ? 'border-green-500 text-green-400 bg-green-900/30 shadow-[0_0_20px_rgba(34,197,94,0.3)] scale-110' : ''}
                   ${m1Step === 2 && val === m1Max ? 'border-red-500 text-red-400 bg-red-900/30 shadow-[0_0_20px_rgba(239,68,68,0.3)] scale-110' : ''}
                `}>
                   <Package className="absolute inset-0 size-full p-2 opacity-10" strokeWidth={1} />
                   <span className="z-10">{val}</span>
                   {m1Scan === i && <div className="absolute -bottom-8 text-cyan-400 animate-bounce"><ArrowRight className="size-6 -rotate-90" /></div>}
                </div>
             ))}
          </div>

          <div className="flex justify-around items-center max-w-2xl mx-auto w-full">
             <div className="bg-card border border-border rounded-xl p-6 text-center w-48">
               <div className="text-sm font-bold text-muted-foreground uppercase mb-2">Current Min</div>
               <div className="text-4xl font-black text-green-400">{m1Min !== null ? m1Min : '--'}</div>
             </div>
             
             {m1Step === 0 ? (
               <button onClick={runM1} className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-[0_0_20px_rgba(37,99,235,0.4)]">
                 Start Inspection
               </button>
             ) : (
               <div className="text-blue-400 font-mono animate-pulse font-bold tracking-widest">{m1Step === 1 ? 'Scanning Array...' : 'Inspection Complete'}</div>
             )}

             <div className="bg-card border border-border rounded-xl p-6 text-center w-48">
               <div className="text-sm font-bold text-muted-foreground uppercase mb-2">Current Max</div>
               <div className="text-4xl font-black text-red-400">{m1Max !== null ? m1Max : '--'}</div>
             </div>
          </div>
       </div>
    </div>
  );

  // ---------------------------------------------------------
  // MISSION 2: Lost Package (Linear Search) - c-w7-2
  // ---------------------------------------------------------
  const m2Arr = [12, 45, 23, 78, 34, 56];
  const m2Target = 34;
  const [m2Step, setM2Step] = useState(0);
  const [m2Scan, setM2Scan] = useState(-1);

  const runM2 = async () => {
    setM2Step(1);
    for(let i=0; i<m2Arr.length; i++) {
      setM2Scan(i);
      await new Promise(r => setTimeout(r, 700));
      if (m2Arr[i] === m2Target) {
        setM2Step(2);
        addXp(120, "Search Specialist Badge!");
        setTimeout(() => {setM2Step(0); setM2Scan(-1);}, 4000);
        return;
      }
    }
  };

  const renderMission2 = () => (
    <div className="flex flex-col h-full gap-4">
       <div className="flex-1 bg-slate-900 rounded-xl border border-amber-500/30 p-6 flex flex-col justify-center relative overflow-hidden">
          <h3 className="absolute top-6 left-6 font-bold text-xl flex items-center gap-2 z-10 text-amber-500 uppercase tracking-widest"><Search className="size-6" /> Lost Package Recovery</h3>
          
          <div className="absolute top-6 right-6 flex items-center gap-4 bg-card border border-border px-6 py-3 rounded-xl">
             <span className="text-muted-foreground font-bold uppercase text-sm">Target Package:</span>
             <span className="text-2xl font-black text-amber-500">{m2Target}</span>
          </div>

          <div className="flex justify-center gap-4 mb-16 mt-12">
             {m2Arr.map((val, i) => {
                const isScannedAndFailed = m2Step >= 1 && m2Scan >= i && m2Arr[i] !== m2Target;
                const isFound = m2Step === 2 && m2Scan === i;
                
                return (
                  <div key={i} className={`relative w-24 h-32 rounded-xl border-2 flex flex-col items-center justify-center font-black text-2xl transition-all duration-300
                     ${m2Scan === i ? 'border-amber-400 bg-amber-900/30 scale-110 shadow-[0_0_20px_rgba(251,191,36,0.4)]' : 'border-slate-700 bg-slate-800'}
                     ${isScannedAndFailed ? 'border-red-900/50 bg-red-950/20 text-slate-500 opacity-50' : ''}
                     ${isFound ? 'border-green-500 bg-green-900/40 text-green-400 shadow-[0_0_30px_rgba(34,197,94,0.5)] scale-110' : ''}
                  `}>
                     <Box className={`mb-2 ${isFound ? 'text-green-500 size-8' : 'text-slate-500 size-6'}`} />
                     <span>{val}</span>
                     
                     {m2Scan === i && !isFound && (
                       <div className="absolute -bottom-10 text-amber-400 text-sm font-bold animate-pulse">Checking...</div>
                     )}
                     {isScannedAndFailed && m2Scan === i && (
                       <div className="absolute inset-0 flex items-center justify-center"><div className="text-red-500 text-6xl opacity-50 select-none">❌</div></div>
                     )}
                  </div>
                )
             })}
          </div>

          {m2Step === 0 && (
            <button onClick={runM2} className="mx-auto px-8 py-3 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-xl shadow-[0_0_20px_rgba(217,119,6,0.4)] block">
              Deploy Search Robot
            </button>
          )}
          {m2Step === 2 && (
            <div className="text-center font-black text-3xl text-green-400 animate-in zoom-in drop-shadow-[0_0_10px_rgba(34,197,94,0.5)]">
               TARGET PACKAGE LOCATED AT INDEX [{m2Scan}]
            </div>
          )}
       </div>
    </div>
  );

  // ---------------------------------------------------------
  // MISSION 3: Reversal Facility (Reverse Array) - c-w7-3
  // ---------------------------------------------------------
  const [m3Arr, setM3Arr] = useState([10, 20, 30, 40, 50]);
  const [m3Step, setM3Step] = useState(0);
  const [m3L, setM3L] = useState(-1);
  const [m3R, setM3R] = useState(-1);

  const runM3 = async () => {
    setM3Step(1);
    const arr = [...m3Arr];
    let left = 0;
    let right = arr.length - 1;

    while (left < right) {
      setM3L(left);
      setM3R(right);
      await new Promise(r => setTimeout(r, 1000));
      
      // Swap
      const temp = arr[left];
      arr[left] = arr[right];
      arr[right] = temp;
      setM3Arr([...arr]);
      
      left++;
      right--;
      await new Promise(r => setTimeout(r, 500));
    }
    
    setM3L(-1);
    setM3R(-1);
    setM3Step(2);
    addXp(150, "Reversal Engineer Badge!");
    setTimeout(() => {setM3Step(0); setM3Arr([10,20,30,40,50])}, 5000);
  };

  const renderMission3 = () => (
    <div className="flex flex-col h-full gap-4">
       <div className="flex-1 bg-slate-900 rounded-xl border border-fuchsia-500/30 p-6 flex flex-col justify-center items-center relative overflow-hidden">
          <h3 className="absolute top-6 left-6 font-bold text-xl flex items-center gap-2 z-10 text-fuchsia-400 uppercase tracking-widest"><ArrowLeftRight className="size-6" /> Reversal Facility</h3>
          
          <div className="flex justify-center gap-4 mb-16 mt-8 w-full">
             {m3Arr.map((val, i) => (
                <div key={i} className={`relative size-24 rounded-xl border-4 flex flex-col items-center justify-center font-black text-3xl transition-all duration-500
                   ${m3L === i ? 'border-cyan-400 bg-cyan-900/30 text-cyan-300 -translate-y-4 shadow-[0_10px_20px_rgba(34,211,238,0.3)]' : 
                     m3R === i ? 'border-fuchsia-400 bg-fuchsia-900/30 text-fuchsia-300 -translate-y-4 shadow-[0_10px_20px_rgba(232,121,249,0.3)]' : 
                     'border-slate-700 bg-slate-800 text-slate-300'}
                `}>
                   <span>{val}</span>
                   {m3L === i && <div className="absolute -bottom-10 text-cyan-400 font-mono text-sm font-bold flex flex-col items-center"><ArrowRight className="size-4 -rotate-90 mb-1" /> LEFT ARM</div>}
                   {m3R === i && <div className="absolute -bottom-10 text-fuchsia-400 font-mono text-sm font-bold flex flex-col items-center"><ArrowRight className="size-4 -rotate-90 mb-1" /> RIGHT ARM</div>}
                </div>
             ))}
          </div>

          {m3Step === 0 && (
            <button onClick={runM3} className="px-8 py-3 bg-fuchsia-600 hover:bg-fuchsia-700 text-white font-bold rounded-xl shadow-[0_0_20px_rgba(192,38,211,0.4)]">
              Activate Reversal Conveyor
            </button>
          )}

          {m3Step === 2 && (
            <div className="text-center font-black text-3xl text-fuchsia-400 animate-in slide-in-from-bottom-4 flex items-center gap-3">
              <RotateCcw className="size-8" /> SHIPMENT ORDER REVERSED
            </div>
          )}
       </div>
    </div>
  );

  // ---------------------------------------------------------
  // MISSION 4: Duplicate Cleanup (Remove Dups) - c-w7-4
  // ---------------------------------------------------------
  const [m4Arr, setM4Arr] = useState([10, 20, 10, 30, 20, 40]);
  const [m4Step, setM4Step] = useState(0);
  const [m4ScanI, setM4ScanI] = useState(-1);
  const [m4ScanJ, setM4ScanJ] = useState(-1);
  const [m4Dups, setM4Dups] = useState<number[]>([]);

  const runM4 = async () => {
    setM4Step(1);
    const arr = [...m4Arr];
    const dups: number[] = [];
    
    // Simple visual O(N^2) duplication check
    for(let i=0; i<arr.length; i++) {
      if(dups.includes(i)) continue;
      setM4ScanI(i);
      for(let j=i+1; j<arr.length; j++) {
        if(dups.includes(j)) continue;
        setM4ScanJ(j);
        await new Promise(r => setTimeout(r, 600));
        if(arr[i] === arr[j]) {
          dups.push(j);
          setM4Dups([...dups]);
          await new Promise(r => setTimeout(r, 400));
        }
      }
    }
    
    setM4ScanI(-1);
    setM4ScanJ(-1);
    
    // Compact array visually
    await new Promise(r => setTimeout(r, 1000));
    const cleanArr = arr.filter((_, idx) => !dups.includes(idx));
    setM4Arr(cleanArr);
    setM4Dups([]);
    
    setM4Step(2);
    addXp(200, "Data Purifier Badge!");
    setTimeout(() => {setM4Step(0); setM4Arr([10,20,10,30,20,40]);}, 5000);
  };

  const renderMission4 = () => (
    <div className="flex flex-col h-full gap-4">
       <div className="flex-1 bg-slate-900 rounded-xl border border-red-500/30 p-6 flex flex-col justify-center items-center relative overflow-hidden">
          <h3 className="absolute top-6 left-6 font-bold text-xl flex items-center gap-2 z-10 text-red-400 uppercase tracking-widest"><AlertTriangle className="size-6" /> Duplicate Cleanup</h3>
          
          <div className="flex justify-center gap-3 mb-16 flex-wrap w-full max-w-3xl">
             {m4Arr.map((val, idx) => {
                const isDup = m4Dups.includes(idx);
                return (
                  <div key={idx} className={`relative w-20 h-24 rounded-lg border-2 flex items-center justify-center font-black text-2xl transition-all duration-300
                     ${isDup ? 'border-red-500 bg-red-950/40 text-red-500 scale-90 opacity-40 shadow-[inset_0_0_20px_rgba(239,68,68,0.5)]' : 
                       m4ScanI === idx ? 'border-cyan-400 bg-cyan-900/30 text-cyan-300 scale-110 shadow-[0_0_20px_rgba(34,211,238,0.3)]' :
                       m4ScanJ === idx ? 'border-yellow-400 bg-yellow-900/30 text-yellow-300 scale-110 shadow-[0_0_20px_rgba(250,204,21,0.3)]' :
                       'border-slate-700 bg-slate-800 text-slate-300'}
                  `}>
                     <span>{val}</span>
                     {isDup && <Trash2 className="absolute text-red-500 size-10 opacity-30" />}
                     {m4ScanI === idx && <div className="absolute -bottom-8 text-cyan-400 font-bold text-xs uppercase animate-pulse">Base</div>}
                     {m4ScanJ === idx && <div className="absolute -bottom-8 text-yellow-400 font-bold text-xs uppercase animate-pulse">Compare</div>}
                  </div>
                );
             })}
          </div>

          {m4Step === 0 && (
            <button onClick={runM4} className="px-8 py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl shadow-[0_0_20px_rgba(220,38,38,0.4)] flex items-center gap-2">
              <ScanLine className="size-5" /> Run Duplicate Scanner
            </button>
          )}

          {m4Step === 2 && (
            <div className="text-center font-black text-3xl text-emerald-400 animate-in slide-in-from-bottom-4 flex items-center gap-3">
              <CheckCircle2 className="size-8" /> WAREHOUSE OPTIMIZED
            </div>
          )}
       </div>
    </div>
  );

  return (
    <div className="flex flex-col h-full bg-slate-950 text-foreground p-6 overflow-hidden relative font-sans">
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-border shrink-0">
        <div>
          <h2 className="text-2xl font-black text-emerald-400 flex items-center gap-3 uppercase tracking-widest drop-shadow-[0_0_10px_rgba(52,211,153,0.3)]">
            <Server className="size-7 text-emerald-400" /> Array Warehouse
          </h2>
        </div>
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2 bg-emerald-950/50 px-4 py-1.5 rounded-full border border-emerald-900 font-bold shadow-sm text-emerald-100">
            <Star className="size-4 text-emerald-400" /> {xp} XP
          </div>
          <div className="text-sm font-bold text-emerald-300 uppercase tracking-widest">
             {expId === "c-w7-1" && "Mission: Inventory Min/Max"}
             {expId === "c-w7-2" && "Mission: Lost Package"}
             {expId === "c-w7-3" && "Mission: Conveyor Reversal"}
             {expId === "c-w7-4" && "Mission: Duplicate Cleanup"}
          </div>
        </div>
      </div>

      {successMsg && (
        <div className="absolute top-24 left-1/2 -translate-x-1/2 bg-emerald-600 text-white px-6 py-3 rounded-lg shadow-xl animate-in slide-in-from-top-10 z-50 font-bold flex items-center gap-2">
          <Star className="size-5 fill-white" /> {successMsg}
        </div>
      )}

      <div className="flex-1 min-h-0 overflow-y-auto">
        {expId === "c-w7-1" && renderMission1()}
        {expId === "c-w7-2" && renderMission2()}
        {expId === "c-w7-3" && renderMission3()}
        {expId === "c-w7-4" && renderMission4()}
        {/* If there's a c-w7-5, we can show a boss screen, but for now we default to mapping the 4 experiments */}
        {expId === "c-w7-5" && (
           <div className="flex items-center justify-center h-full flex-col text-center">
              <Factory className="size-24 text-emerald-500 mb-6 animate-pulse" />
              <h1 className="text-4xl font-black text-emerald-400 uppercase tracking-widest mb-4">Mega Warehouse Saved</h1>
              <p className="text-muted-foreground max-w-lg text-lg">You have successfully mastered Array organization, searching, reversing, and cleaning. The logistics hub is fully operational!</p>
           </div>
        )}
      </div>
    </div>
  );
}
