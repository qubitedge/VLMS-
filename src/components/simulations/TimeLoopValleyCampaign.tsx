import { useState, useEffect, useRef } from "react";
import { 
  Hourglass, Settings, Shield, Activity, Search,
  Play, RefreshCw, Hexagon, Layers, Key, CheckCircle2,
  Lock, XCircle, ArrowRight, Star, FastForward, Triangle
} from "lucide-react";

type TimeLoopValleyProps = {
  expId: string; // c-w6-1 to c-w6-5
};

export function TimeLoopValleyCampaign({ expId }: TimeLoopValleyProps) {
  const [xp, setXp] = useState(0);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const addXp = (amount: number, reason: string) => {
    setXp(x => x + amount);
    setSuccessMsg(`+${amount} XP: ${reason}`);
    setTimeout(() => setSuccessMsg(""), 3000);
  };

  // ---------------------------------------------------------
  // MISSION 1: Infinite Factory (Factorial) - c-w6-1
  // ---------------------------------------------------------
  const [m1N, setM1N] = useState(5);
  const [m1Step, setM1Step] = useState(0);
  const [m1Current, setM1Current] = useState(1);
  const [m1Fact, setM1Fact] = useState(1);

  const runM1 = async () => {
    setM1Step(1);
    let result = 1;
    for (let i = 1; i <= m1N; i++) {
      setM1Current(i);
      result *= i;
      setM1Fact(result);
      await new Promise(r => setTimeout(r, 600));
    }
    setM1Step(2);
    addXp(100, "Iteration Rune I Recovered!");
    setTimeout(() => setM1Step(0), 4000);
  };

  const renderMission1 = () => (
    <div className="flex flex-col h-full gap-4">
       <div className="flex-1 bg-gradient-to-t from-slate-900 to-amber-950/30 rounded-xl border border-amber-900/30 p-6 flex flex-col items-center justify-center relative overflow-hidden">
          <h3 className="absolute top-6 left-6 font-bold text-xl flex items-center gap-2 z-10 text-amber-500 uppercase tracking-widest"><Settings className="size-6 animate-spin-slow" /> Infinite Factory</h3>
          
          <div className="flex gap-4 items-center z-10 mb-12">
             <div className="bg-card p-4 rounded-xl border border-border text-center">
                <div className="text-sm font-bold text-muted-foreground uppercase mb-2">Energy Target</div>
                <input type="number" min="1" max="10" value={m1N} onChange={e=>setM1N(Math.min(10, Math.max(1, Number(e.target.value))))} className="text-4xl font-black bg-transparent w-20 text-center text-amber-500 border-none outline-none" />
             </div>
             <button onClick={runM1} disabled={m1Step !== 0} className="bg-amber-600 hover:bg-amber-700 text-white font-bold size-16 rounded-full shadow-lg z-20 flex items-center justify-center disabled:opacity-50">
               <Play className="size-6" fill="currentColor" />
             </button>
          </div>

          <div className="flex gap-4 items-center justify-center w-full z-10 h-32 bg-black/40 rounded-xl border-y border-amber-900/50 relative">
             {/* Conveyor Belt */}
             <div className="absolute bottom-0 w-full h-2 flex justify-around">
               {[...Array(20)].map((_, i) => <div key={i} className="w-2 h-2 rounded-full bg-slate-700 animate-pulse" />)}
             </div>
             
             {m1Step >= 1 && (
               <div className="flex items-center gap-6 animate-in slide-in-from-left-8">
                 <div className="size-20 bg-slate-800 border-4 border-amber-500 rounded-lg flex flex-col items-center justify-center shadow-[0_0_20px_rgba(245,158,11,0.3)]">
                   <span className="text-amber-500 font-black text-3xl">{m1Current}</span>
                 </div>
                 <ArrowRight className="size-8 text-muted-foreground" />
                 <div className="size-24 bg-amber-950 border-4 border-amber-400 rounded-full flex flex-col items-center justify-center shadow-[0_0_40px_rgba(251,191,36,0.5)]">
                   <span className="text-sm text-amber-300 font-bold uppercase">Core</span>
                   <span className="text-white font-black text-2xl">{m1Fact}</span>
                 </div>
               </div>
             )}
          </div>
       </div>
    </div>
  );

  // ---------------------------------------------------------
  // MISSION 2: Prime Guardian Temple - c-w6-2
  // ---------------------------------------------------------
  const [m2N, setM2N] = useState(17);
  const [m2Step, setM2Step] = useState(0);
  const [m2Divisor, setM2Divisor] = useState(2);
  const [m2IsPrime, setM2IsPrime] = useState(true);

  const runM2 = async () => {
    setM2Step(1);
    let prime = true;
    for (let i = 2; i < m2N; i++) {
      setM2Divisor(i);
      await new Promise(r => setTimeout(r, 400));
      if (m2N % i === 0) {
        prime = false;
        break;
      }
    }
    setM2IsPrime(prime);
    setM2Step(2);
    if(prime) addXp(150, "Prime Rune Recovered!");
    setTimeout(() => setM2Step(0), 4000);
  };

  const renderMission2 = () => (
    <div className="flex flex-col h-full gap-4">
       <div className="flex-1 bg-slate-950 rounded-xl border border-slate-800 p-6 flex flex-col items-center justify-center relative overflow-hidden">
          <h3 className="absolute top-6 left-6 font-bold text-xl flex items-center gap-2 z-10 text-emerald-500 uppercase tracking-widest"><Shield className="size-6" /> Sacred Temple</h3>
          
          <div className="text-center z-10 mb-12">
            <input type="number" value={m2N} onChange={e=>setM2N(Math.max(2, Number(e.target.value)))} className="text-6xl font-black bg-transparent w-32 text-center text-white border-b-2 border-emerald-500 outline-none mb-4" />
            <div className="text-emerald-500 font-bold tracking-widest uppercase">Sacred Number Candidate</div>
          </div>

          <button onClick={runM2} disabled={m2Step !== 0} className="px-8 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-[0_0_20px_rgba(16,185,129,0.3)] disabled:opacity-50 z-10 mb-8">
            Test Number
          </button>

          <div className="h-32 w-full max-w-lg bg-card border border-border rounded-xl flex items-center justify-center text-xl font-mono relative">
             {m2Step === 1 && (
               <div className="animate-pulse text-cyan-400">
                 Scanning: {m2N} ÷ {m2Divisor} ...
               </div>
             )}
             {m2Step === 2 && m2IsPrime && (
               <div className="text-emerald-500 font-bold flex items-center gap-3 animate-in zoom-in">
                 <CheckCircle2 className="size-8" /> TEMPLE OPENS - PRIME VALIDATED
               </div>
             )}
             {m2Step === 2 && !m2IsPrime && (
               <div className="text-red-500 font-bold flex flex-col items-center gap-1 animate-in shake">
                 <div className="flex items-center gap-2"><XCircle className="size-6" /> ALARM - NON-PRIME DETECTED</div>
                 <div className="text-sm">Factor found: {m2Divisor}</div>
                 <div className="text-xs bg-red-950/50 px-2 py-1 rounded text-red-300 mt-2">Executed: break;</div>
               </div>
             )}
          </div>
       </div>
    </div>
  );

  // ---------------------------------------------------------
  // MISSION 3: Harmonic Wave Generator (Sine) - c-w6-3
  // ---------------------------------------------------------
  const [m3Step, setM3Step] = useState(0);
  const [m3Terms, setM3Terms] = useState(1);

  const runM3 = async () => {
    setM3Step(1);
    for(let i=1; i<=5; i++) {
      setM3Terms(i);
      await new Promise(r => setTimeout(r, 600));
    }
    setM3Step(2);
    addXp(120, "Harmonic Rune Recovered!");
    setTimeout(() => {setM3Step(0); setM3Terms(1);}, 5000);
  };

  const renderMission3 = () => (
    <div className="flex flex-col h-full gap-4">
       <div className="flex-1 bg-indigo-950/40 rounded-xl border border-indigo-500/30 p-6 flex flex-col justify-center relative overflow-hidden">
          <h3 className="absolute top-6 left-6 font-bold text-xl flex items-center gap-2 z-10 text-indigo-400 uppercase tracking-widest"><Activity className="size-6" /> Wave Generator</h3>
          
          <div className="flex flex-col items-center z-10">
            <div className="flex items-center gap-2 font-mono text-2xl text-indigo-300 mb-12">
               sin(x) = x 
               {m3Terms >= 2 && <span> - x³/3!</span>}
               {m3Terms >= 3 && <span> + x⁵/5!</span>}
               {m3Terms >= 4 && <span> - x⁷/7!</span>}
               {m3Terms >= 5 && <span> + x⁹/9!</span>}
               {m3Step === 1 && <span className="animate-pulse"> ...</span>}
            </div>

            <div className="w-full h-48 bg-black/40 rounded-xl relative overflow-hidden flex items-center border border-indigo-900/50 mb-8">
               <svg viewBox="0 0 400 100" className="w-full h-full stroke-indigo-500 fill-transparent stroke-[3]">
                 <path d={`M 0 50 Q 50 ${50 - m3Terms*15} 100 50 T 200 50 T 300 50 T 400 50`} className="animate-in slide-in-from-left-full duration-1000" />
               </svg>
               {m3Step === 2 && <div className="absolute inset-0 bg-indigo-500/20 animate-pulse mix-blend-screen" />}
            </div>

            <button onClick={runM3} disabled={m3Step !== 0} className="px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-[0_0_20px_rgba(79,70,229,0.3)] disabled:opacity-50">
              Generate Wave Series
            </button>
          </div>
       </div>
    </div>
  );

  // ---------------------------------------------------------
  // MISSION 4: Mirror Cave (Palindrome) - c-w6-4
  // ---------------------------------------------------------
  const [m4N, setM4N] = useState("121");
  const [m4Step, setM4Step] = useState(0);
  const [m4Rev, setM4Rev] = useState("");

  const runM4 = async () => {
    setM4Step(1);
    let rev = "";
    for(let i=m4N.length-1; i>=0; i--) {
      rev += m4N[i];
      setM4Rev(rev);
      await new Promise(r => setTimeout(r, 500));
    }
    setM4Step(2);
    if(m4N === rev) addXp(150, "Reflection Rune Recovered!");
    setTimeout(() => {setM4Step(0); setM4Rev("");}, 4000);
  };

  const renderMission4 = () => (
    <div className="flex flex-col h-full gap-4">
       <div className="flex-1 bg-slate-900 rounded-xl border border-fuchsia-500/30 p-6 flex flex-col justify-center items-center relative overflow-hidden">
          <h3 className="absolute top-6 left-6 font-bold text-xl flex items-center gap-2 z-10 text-fuchsia-400 uppercase tracking-widest"><Search className="size-6" /> Mirror Gate</h3>
          
          <input type="number" value={m4N} onChange={e=>setM4N(e.target.value)} className="bg-card border border-border rounded-lg text-center text-4xl font-black p-4 mb-12 text-white outline-none focus:border-fuchsia-500 w-48" />

          <div className="flex items-center gap-12 mb-12">
            <div className="text-5xl font-mono tracking-[1rem] text-slate-500">{m4N}</div>
            <div className="w-1 h-32 bg-fuchsia-500/50 relative shadow-[0_0_15px_rgba(217,70,239,0.5)]">
               {m4Step === 2 && m4N === m4Rev && <div className="absolute inset-0 bg-fuchsia-400 animate-ping" />}
            </div>
            <div className="text-5xl font-mono tracking-[1rem] text-fuchsia-400 min-w-[100px]">{m4Rev}</div>
          </div>

          {m4Step === 2 && (
             <div className={`text-2xl font-black uppercase tracking-widest animate-in zoom-in ${m4N===m4Rev ? 'text-green-400' : 'text-red-400'}`}>
               {m4N === m4Rev ? 'Gate Opens' : 'Gate Locked'}
             </div>
          )}

          {m4Step === 0 && (
            <button onClick={runM4} className="px-8 py-3 bg-fuchsia-600 hover:bg-fuchsia-700 text-white font-bold rounded-xl shadow-[0_0_20px_rgba(192,38,211,0.4)] mt-4">
              Reflect Number
            </button>
          )}
       </div>
    </div>
  );

  // ---------------------------------------------------------
  // MISSION 5: Pyramid Forge - c-w6-5
  // ---------------------------------------------------------
  const [m5Rows, setM5Rows] = useState(5);
  const [m5Step, setM5Step] = useState(0);
  const [m5CurrentRow, setM5CurrentRow] = useState(0);

  const runM5 = async () => {
    setM5Step(1);
    for(let i=1; i<=m5Rows; i++) {
      setM5CurrentRow(i);
      await new Promise(r => setTimeout(r, 400));
    }
    setM5Step(2);
    addXp(200, "Architect Rune Recovered!");
    setTimeout(() => {setM5Step(0); setM5CurrentRow(0);}, 4000);
  };

  const renderMission5 = () => (
    <div className="flex flex-col h-full gap-4 items-center justify-center">
       <div className="bg-orange-950/20 rounded-2xl border border-orange-500/30 p-8 max-w-2xl w-full text-center relative overflow-hidden min-h-[400px] flex flex-col justify-end">
          <h3 className="absolute top-6 left-6 font-bold text-xl flex items-center gap-2 z-10 text-orange-500 uppercase tracking-widest"><Triangle className="size-6" fill="currentColor" /> Infinite Pyramid</h3>
          
          <div className="absolute top-6 right-6 flex items-center gap-3">
             <span className="text-muted-foreground font-bold">Rows:</span>
             <input type="number" min="3" max="8" value={m5Rows} onChange={e=>setM5Rows(Math.min(8, Math.max(3, Number(e.target.value))))} className="w-16 bg-card border border-border text-center rounded font-bold" />
             <button onClick={runM5} disabled={m5Step !== 0} className="p-2 bg-orange-600 hover:bg-orange-700 text-white rounded shadow disabled:opacity-50"><Play className="size-4" fill="currentColor" /></button>
          </div>
          
          <div className="flex flex-col items-center gap-1 mb-8">
             {[...Array(m5Rows)].map((_, rIndex) => (
                <div key={rIndex} className={`flex gap-2 transition-opacity duration-500 ${rIndex < m5CurrentRow ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                   {[...Array(rIndex+1)].map((_, cIndex) => (
                      <div key={cIndex} className="size-10 bg-orange-500/20 border border-orange-500/50 flex items-center justify-center font-bold text-orange-300 rounded shadow-sm">
                         {cIndex + 1}
                      </div>
                   ))}
                </div>
             ))}
          </div>
       </div>
    </div>
  );

  return (
    <div className="flex flex-col h-full bg-slate-950 text-foreground p-6 overflow-hidden relative font-sans">
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-border shrink-0">
        <div>
          <h2 className="text-2xl font-black text-cyan-400 flex items-center gap-3 uppercase tracking-widest drop-shadow-[0_0_10px_rgba(34,211,238,0.3)]">
            <Hourglass className="size-7 text-cyan-400 animate-spin-slow" /> Time Loop Valley
          </h2>
        </div>
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2 bg-cyan-950/50 px-4 py-1.5 rounded-full border border-cyan-900 font-bold shadow-sm">
            <Star className="size-4 text-cyan-400" /> {xp} XP
          </div>
          <div className="text-sm font-bold text-cyan-300 uppercase tracking-widest">
             {expId === "c-w6-1" && "Mission: Power Core"}
             {expId === "c-w6-2" && "Mission: Sacred Numbers"}
             {expId === "c-w6-3" && "Mission: Sound Portal"}
             {expId === "c-w6-4" && "Mission: Reflection Gate"}
             {expId === "c-w6-5" && "Mission: Infinite Pyramid"}
          </div>
        </div>
      </div>

      {successMsg && (
        <div className="absolute top-24 left-1/2 -translate-x-1/2 bg-cyan-600 text-white px-6 py-3 rounded-lg shadow-xl animate-in slide-in-from-top-10 z-50 font-bold flex items-center gap-2">
          <Star className="size-5 fill-white" /> {successMsg}
        </div>
      )}

      <div className="flex-1 min-h-0 overflow-y-auto">
        {expId === "c-w6-1" && renderMission1()}
        {expId === "c-w6-2" && renderMission2()}
        {expId === "c-w6-3" && renderMission3()}
        {expId === "c-w6-4" && renderMission4()}
        {expId === "c-w6-5" && renderMission5()}
      </div>
    </div>
  );
}
