import { useState, useEffect } from "react";
import { 
  Wand2, Calculator, ScrollText, ArrowRightLeft, Target, 
  Sparkles, CheckCircle2, Star, Zap, ScanSearch, Layers
} from "lucide-react";

type FunctionTempleProps = {
  expId: string; // c-w11-1 to c-w11-5
};

export function FunctionTempleCampaign({ expId }: FunctionTempleProps) {
  const [xp, setXp] = useState(0);
  const [successMsg, setSuccessMsg] = useState("");

  const addXp = (amount: number, reason: string) => {
    setXp(x => x + amount);
    setSuccessMsg(`+${amount} XP: ${reason}`);
    setTimeout(() => setSuccessMsg(""), 3000);
  };

  // ---------------------------------------------------------
  // MISSION 1: Combinatorics Chamber (nCr) - c-w11-1
  // ---------------------------------------------------------
  const [m1N, setM1N] = useState(5);
  const [m1R, setM1R] = useState(2);
  const [m1Step, setM1Step] = useState(0);

  const runM1 = async () => {
    setM1Step(1); // N!
    await new Promise(r => setTimeout(r, 1500));
    setM1Step(2); // R!
    await new Promise(r => setTimeout(r, 1500));
    setM1Step(3); // (N-R)!
    await new Promise(r => setTimeout(r, 1500));
    setM1Step(4); // Result
    addXp(100, "Probability Rune!");
    setTimeout(() => setM1Step(0), 4000);
  };

  const fact = (num: number): number => num <= 1 ? 1 : num * fact(num - 1);

  const renderMission1 = () => (
    <div className="flex flex-col h-full gap-4">
       <div className="flex-1 bg-slate-950 rounded-xl border border-amber-500/30 p-6 flex flex-col justify-center items-center relative overflow-hidden">
          <h3 className="absolute top-6 left-6 font-bold text-xl flex items-center gap-2 z-10 text-amber-500 uppercase tracking-widest"><Calculator className="size-6" /> Probability Vault</h3>
          
          <div className="flex items-center gap-12 z-10 mb-12">
            <div className="flex flex-col items-center gap-2">
               <div className="text-muted-foreground font-bold">n</div>
               <input type="number" min="1" max="8" value={m1N} onChange={e=>setM1N(Number(e.target.value))} className="w-16 h-16 bg-card border-2 border-amber-500/50 rounded-xl text-center text-3xl font-black text-amber-400 outline-none" />
            </div>
            <div className="flex flex-col items-center gap-2">
               <div className="text-muted-foreground font-bold">r</div>
               <input type="number" min="1" max={m1N} value={m1R} onChange={e=>setM1R(Math.min(m1N, Number(e.target.value)))} className="w-16 h-16 bg-card border-2 border-amber-500/50 rounded-xl text-center text-3xl font-black text-amber-400 outline-none" />
            </div>
            {m1Step === 0 && (
              <button onClick={runM1} className="px-8 py-4 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-xl shadow-[0_0_30px_rgba(217,119,6,0.5)] flex items-center gap-2">
                <Wand2 className="size-5" /> Calculate nCr
              </button>
            )}
          </div>

          <div className="grid grid-cols-3 gap-8 w-full max-w-4xl z-10">
             <div className={`flex flex-col items-center justify-center p-6 rounded-2xl border-2 transition-all duration-500
                ${m1Step >= 1 ? 'border-amber-400 bg-amber-950/40 shadow-[0_0_20px_rgba(251,191,36,0.3)] scale-105' : 'border-slate-800 bg-slate-900 opacity-50'}
             `}>
               <div className="font-mono text-lg text-amber-300/70 mb-4">factorial({m1N})</div>
               <div className="text-4xl font-black text-amber-400">{m1Step >= 1 ? fact(m1N) : '?'}</div>
             </div>

             <div className={`flex flex-col items-center justify-center p-6 rounded-2xl border-2 transition-all duration-500
                ${m1Step >= 2 ? 'border-amber-400 bg-amber-950/40 shadow-[0_0_20px_rgba(251,191,36,0.3)] scale-105' : 'border-slate-800 bg-slate-900 opacity-50'}
             `}>
               <div className="font-mono text-lg text-amber-300/70 mb-4">factorial({m1R})</div>
               <div className="text-4xl font-black text-amber-400">{m1Step >= 2 ? fact(m1R) : '?'}</div>
             </div>

             <div className={`flex flex-col items-center justify-center p-6 rounded-2xl border-2 transition-all duration-500
                ${m1Step >= 3 ? 'border-amber-400 bg-amber-950/40 shadow-[0_0_20px_rgba(251,191,36,0.3)] scale-105' : 'border-slate-800 bg-slate-900 opacity-50'}
             `}>
               <div className="font-mono text-lg text-amber-300/70 mb-4">factorial({m1N - m1R})</div>
               <div className="text-4xl font-black text-amber-400">{m1Step >= 3 ? fact(m1N - m1R) : '?'}</div>
             </div>
          </div>

          {m1Step >= 4 && (
             <div className="mt-12 bg-slate-900 p-8 rounded-2xl border-4 border-emerald-500/50 shadow-[0_0_40px_rgba(16,185,129,0.3)] animate-in zoom-in flex flex-col items-center">
                <div className="text-emerald-500 font-bold uppercase tracking-widest mb-2">nCr Result</div>
                <div className="text-6xl font-black text-emerald-400">{fact(m1N) / (fact(m1R) * fact(m1N - m1R))}</div>
             </div>
          )}
       </div>
    </div>
  );

  // ---------------------------------------------------------
  // MISSION 2: Scroll Analyzer (String Length) - c-w11-2
  // ---------------------------------------------------------
  const m2Str = "CODEVERSE";
  const [m2Step, setM2Step] = useState(0);
  const [m2Current, setM2Current] = useState(-1);

  const runM2 = async () => {
    setM2Step(1);
    for (let i = 0; i <= m2Str.length; i++) {
      setM2Current(i);
      await new Promise(r => setTimeout(r, 600));
    }
    setM2Step(2);
    addXp(120, "Archive Explorer Badge!");
    setTimeout(() => {setM2Step(0); setM2Current(-1);}, 4000);
  };

  const renderMission2 = () => (
    <div className="flex flex-col h-full gap-4">
       <div className="flex-1 bg-slate-900 rounded-xl border border-cyan-500/30 p-6 flex flex-col justify-center items-center relative overflow-hidden">
          <h3 className="absolute top-6 left-6 font-bold text-xl flex items-center gap-2 z-10 text-cyan-400 uppercase tracking-widest"><ScrollText className="size-6" /> Scroll Analyzer</h3>
          
          <div className="flex items-center gap-2 mb-16 relative z-10">
             {m2Str.split("").map((char, i) => (
                <div key={i} className={`relative size-16 rounded-xl border-2 flex items-center justify-center font-black text-3xl font-mono transition-all duration-300
                   ${m2Current === i ? 'border-cyan-400 bg-cyan-950/60 text-cyan-300 shadow-[0_0_30px_rgba(34,211,238,0.5)] -translate-y-4' : 'border-slate-700 bg-slate-800 text-slate-300'}
                `}>
                   {char}
                   {m2Current === i && <div className="absolute -bottom-8 text-cyan-400 animate-bounce"><ScanSearch className="size-6" /></div>}
                </div>
             ))}
             <div className={`relative w-20 h-16 ml-4 rounded-xl border-2 border-dashed flex items-center justify-center font-black text-2xl font-mono transition-all duration-300
                ${m2Current === m2Str.length ? 'border-red-500 bg-red-950/60 text-red-400 shadow-[0_0_30px_rgba(239,68,68,0.5)] scale-110' : 'border-slate-700 bg-slate-800 text-slate-500'}
             `}>
                \0
             </div>
          </div>

          <div className="flex items-center gap-12 z-10">
             {m2Step === 0 && (
                <button onClick={runM2} className="px-8 py-4 bg-cyan-600 hover:bg-cyan-700 text-white font-bold rounded-xl shadow-[0_0_30px_rgba(8,145,178,0.4)]">
                  Measure Scroll Length
                </button>
             )}

             {m2Step >= 1 && (
                <div className="bg-slate-950 p-6 rounded-2xl border-2 border-cyan-500/50 min-w-[200px] text-center shadow-[0_0_30px_rgba(34,211,238,0.2)]">
                   <div className="text-sm font-bold text-muted-foreground uppercase tracking-widest mb-2">Counter Length</div>
                   <div className="text-6xl font-black text-cyan-400">{m2Current === -1 ? 0 : Math.min(m2Current, m2Str.length)}</div>
                </div>
             )}
          </div>

          {m2Step === 2 && (
             <div className="absolute bottom-10 text-red-400 font-bold text-xl uppercase tracking-widest animate-in slide-in-from-bottom-4 flex items-center gap-2">
               <Zap className="size-6" /> Null Terminator Reached
             </div>
          )}
       </div>
    </div>
  );

  // ---------------------------------------------------------
  // MISSION 3: Matrix Reflection Hall (Transpose) - c-w11-3
  // ---------------------------------------------------------
  const [m3Step, setM3Step] = useState(0);

  const runM3 = () => {
    setM3Step(1);
    setTimeout(() => {
      setM3Step(2);
      addXp(150, "Reflection Rune!");
    }, 2000);
    setTimeout(() => setM3Step(0), 6000);
  };

  const renderMission3 = () => (
    <div className="flex flex-col h-full gap-4">
       <div className="flex-1 bg-slate-950 rounded-xl border border-fuchsia-500/30 p-6 flex flex-col justify-center items-center relative overflow-hidden">
          <h3 className="absolute top-6 left-6 font-bold text-xl flex items-center gap-2 z-10 text-fuchsia-400 uppercase tracking-widest"><ArrowRightLeft className="size-6" /> Reflection Hall</h3>
          
          <div className="flex items-center gap-16 z-10 w-full justify-center">
             
             {/* Original Matrix */}
             <div className={`bg-card p-4 rounded-xl border-2 border-slate-700 transition-all duration-1000 relative
                ${m3Step === 1 ? 'translate-x-32 opacity-0 blur-md scale-50' : ''}
             `}>
               <div className="absolute -top-3 left-4 bg-slate-900 px-2 text-xs font-bold text-slate-400 uppercase tracking-widest">Original [2x3]</div>
               <div className="grid grid-cols-3 gap-2">
                 {[1,2,3,4,5,6].map(v => (
                   <div key={`o${v}`} className="size-16 bg-slate-800 border border-slate-700 rounded flex items-center justify-center font-black text-2xl text-slate-300">{v}</div>
                 ))}
               </div>
             </div>

             {/* Function Portal */}
             <div className="relative">
                <div className={`size-32 rounded-full border-4 border-dashed border-fuchsia-500/50 flex flex-col items-center justify-center text-center transition-all duration-500 z-20 bg-slate-950
                   ${m3Step === 1 ? 'animate-spin-slow shadow-[0_0_50px_rgba(217,70,239,0.5)] border-fuchsia-400 bg-fuchsia-950/40' : ''}
                `}>
                   <Sparkles className={`size-8 text-fuchsia-400 mb-2 ${m3Step === 1 ? 'animate-pulse' : ''}`} />
                   <span className="text-xs font-bold text-fuchsia-300 uppercase tracking-widest font-mono">transpose()</span>
                </div>
             </div>

             {/* Result Matrix */}
             <div className={`bg-slate-900 p-4 rounded-xl border-2 border-emerald-500/50 shadow-[0_0_30px_rgba(16,185,129,0.2)] transition-all duration-1000 relative
                ${m3Step === 0 ? '-translate-x-32 opacity-0 blur-md scale-50' : 'translate-x-0 opacity-100 blur-0 scale-100'}
             `}>
               <div className="absolute -top-3 left-4 bg-slate-950 px-2 text-xs font-bold text-emerald-400 uppercase tracking-widest">Transposed [3x2]</div>
               <div className="grid grid-cols-2 gap-2">
                 {[1,4,2,5,3,6].map(v => (
                   <div key={`t${v}`} className={`size-16 bg-emerald-950/40 border border-emerald-500/50 rounded flex items-center justify-center font-black text-2xl text-emerald-400 transition-all duration-500 delay-[2500ms]
                     ${m3Step === 2 ? 'shadow-[0_0_15px_rgba(52,211,153,0.4)]' : ''}
                   `}>{v}</div>
                 ))}
               </div>
             </div>

          </div>

          {m3Step === 0 && (
            <button onClick={runM3} className="mt-16 px-8 py-4 bg-fuchsia-600 hover:bg-fuchsia-700 text-white font-bold rounded-xl shadow-[0_0_30px_rgba(192,38,211,0.4)] flex items-center gap-2 z-10">
              <Zap className="size-5" /> Invoke transpose() Spell
            </button>
          )}
       </div>
    </div>
  );

  return (
    <div className="flex flex-col h-full bg-slate-950 text-foreground p-6 overflow-hidden relative font-sans">
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-border shrink-0">
        <div>
          <h2 className="text-2xl font-black text-amber-400 flex items-center gap-3 uppercase tracking-widest drop-shadow-[0_0_10px_rgba(251,191,36,0.3)]">
            <Wand2 className="size-7 text-amber-400" /> Function Temple
          </h2>
        </div>
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2 bg-amber-950/50 px-4 py-1.5 rounded-full border border-amber-900 font-bold shadow-sm text-amber-100">
            <Star className="size-4 text-amber-400" /> {xp} XP
          </div>
          <div className="text-sm font-bold text-amber-300 uppercase tracking-widest">
             {expId === "c-w11-1" && "Mission: Probability Vault"}
             {expId === "c-w11-2" && "Mission: Ancient Scroll"}
             {expId === "c-w11-3" && "Mission: Reflection Hall"}
          </div>
        </div>
      </div>

      {successMsg && (
        <div className="absolute top-24 left-1/2 -translate-x-1/2 bg-amber-600 text-white px-6 py-3 rounded-lg shadow-xl animate-in slide-in-from-top-10 z-50 font-bold flex items-center gap-2">
          <Star className="size-5 fill-white" /> {successMsg}
        </div>
      )}

      <div className="flex-1 min-h-0 overflow-y-auto">
        {expId === "c-w11-1" && renderMission1()}
        {expId === "c-w11-2" && renderMission2()}
        {expId === "c-w11-3" && renderMission3()}
        {/* Boss screen fallback */}
        {expId === "c-w11-4" && (
           <div className="flex items-center justify-center h-full flex-col text-center bg-slate-900 rounded-xl border border-slate-800">
              <Wand2 className="size-32 text-amber-500 mb-8 animate-pulse drop-shadow-[0_0_40px_rgba(251,191,36,0.6)]" />
              <h1 className="text-5xl font-black text-amber-400 uppercase tracking-widest mb-6 drop-shadow-[0_0_20px_rgba(251,191,36,0.5)]">Temple Core Restored</h1>
              <p className="text-slate-400 max-w-xl text-xl leading-relaxed">
                You have successfully mastered the Function Temple! Reusable spells, parameter passing, and scope logic have reconnected across the universe.
              </p>
           </div>
        )}
      </div>
    </div>
  );
}
