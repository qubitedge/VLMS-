import { useState, useEffect } from "react";
import { 
  Users, Crosshair, Route, Move, Target, AlertTriangle, ShieldCheck, 
  ArrowRight, CheckCircle2, Star, Plus
} from "lucide-react";

export function CustomerSegmentationLabCampaign() {
  const [xp, setXp] = useState(0);
  const [successMsg, setSuccessMsg] = useState("");
  const [step, setStep] = useState(0); // 0: Start, 1: Init, 2: Assign, 3: Move, 4: Repeat, 5: Challenge
  const [animState, setAnimState] = useState(0);

  const addXp = (amount: number, reason: string) => {
    setXp(x => x + amount);
    setSuccessMsg(`+${amount} XP: ${reason}`);
    setTimeout(() => setSuccessMsg(""), 3000);
  };

  const nextStep = () => {
    setStep(s => s + 1);
    setAnimState(0);
  };

  // Stage 1
  const runInit = async () => {
    setAnimState(1); 
    await new Promise(r => setTimeout(r, 2000));
    setAnimState(2); 
    addXp(50, "Centroid Placer!");
    setTimeout(() => nextStep(), 3000);
  };

  // Stage 2
  const runAssign = async () => {
    setAnimState(1); 
    await new Promise(r => setTimeout(r, 2000));
    setAnimState(2); 
    addXp(50, "Distance Calculator!");
    setTimeout(() => nextStep(), 4000);
  };

  // Stage 3
  const runMove = async () => {
    setAnimState(1); 
    await new Promise(r => setTimeout(r, 2500));
    setAnimState(2); 
    addXp(50, "Center Finder!");
    setTimeout(() => nextStep(), 4000);
  };

  // Stage 4
  const runRepeat = async () => {
    setAnimState(1); 
    await new Promise(r => setTimeout(r, 1000));
    setAnimState(2);
    await new Promise(r => setTimeout(r, 1000));
    setAnimState(3);
    addXp(50, "Convergence Master!");
    setTimeout(() => nextStep(), 4000);
  };

  // Stage 5 Challenge
  const [k, setK] = useState(2);
  const handleKChange = (val: number) => {
    setK(val);
    if (val === 4 && animState === 0) {
      setAnimState(1);
      addXp(150, "Optimal Segmentation!");
    }
  };

  return (
    <div className="flex flex-col h-full bg-slate-950 text-foreground p-6 overflow-hidden relative font-sans">
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-800 shrink-0 z-20">
        <div>
          <h2 className="text-2xl font-black flex items-center gap-3 uppercase tracking-widest text-emerald-400 drop-shadow-[0_0_10px_rgba(52,211,153,0.3)]">
            <Users className="size-7" /> 
            Segmentation Lab
          </h2>
        </div>
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2 bg-emerald-950/50 px-4 py-1.5 rounded-full border border-emerald-900 font-bold shadow-sm text-emerald-100">
            <Star className="size-4 text-emerald-400" /> {xp} XP
          </div>
        </div>
      </div>

      {successMsg && (
        <div className="absolute top-24 left-1/2 -translate-x-1/2 bg-emerald-600 text-white px-6 py-3 rounded-lg shadow-xl animate-in slide-in-from-top-10 z-50 font-bold flex items-center gap-2">
          <Star className="size-5 fill-white" /> {successMsg}
        </div>
      )}

      <div className="flex-1 min-h-0 overflow-y-auto">
        {step === 0 && (
          <div className="h-full flex flex-col items-center justify-center text-center animate-in zoom-in duration-500">
             <Crosshair className="size-24 text-emerald-500 mb-6 drop-shadow-[0_0_30px_rgba(16,185,129,0.5)]" />
             <h1 className="text-4xl font-black text-white uppercase tracking-widest mb-4">Group Similar Customers</h1>
             <p className="text-slate-400 max-w-xl text-lg mb-8">
               A retail company wants to discover customer groups automatically using K-Means Clustering.
             </p>
             <div className="bg-slate-900 w-full max-w-lg h-48 rounded-xl border border-slate-700 mb-8 relative">
                <div className="absolute top-8 left-16 size-3 bg-slate-500 rounded-full" />
                <div className="absolute top-12 left-24 size-3 bg-slate-500 rounded-full" />
                <div className="absolute top-16 left-12 size-3 bg-slate-500 rounded-full" />
                
                <div className="absolute bottom-12 right-24 size-3 bg-slate-500 rounded-full" />
                <div className="absolute bottom-16 right-32 size-3 bg-slate-500 rounded-full" />
                
                <div className="absolute top-8 right-16 size-3 bg-slate-500 rounded-full" />
                <div className="absolute top-16 right-24 size-3 bg-slate-500 rounded-full" />
             </div>
             <button onClick={nextStep} className="px-8 py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-[0_0_20px_rgba(16,185,129,0.4)] flex items-center gap-2">
               Initialize AI <ArrowRight className="size-5" />
             </button>
          </div>
        )}

        {step === 1 && (
          <div className="flex flex-col items-center justify-center h-full animate-in slide-in-from-right">
             <h3 className="text-2xl font-bold text-cyan-400 uppercase tracking-widest mb-8 flex items-center gap-2"><Target className="size-6" /> Place Initial Centers</h3>
             
             <div className="bg-slate-900 w-full max-w-lg h-64 rounded-xl border-2 border-slate-700 mb-8 relative flex items-center justify-center">
                
                {animState === 0 && (
                  <button onClick={runInit} className="px-6 py-2 bg-cyan-600 hover:bg-cyan-700 text-white font-bold rounded-lg z-20 absolute top-10 left-10 shadow-[0_0_15px_rgba(6,182,212,0.5)]">
                    Place K=3 Centroids
                  </button>
                )}

                {animState >= 1 && (
                  <>
                     <div className="absolute top-12 right-32 size-6 bg-rose-500 rounded-full flex items-center justify-center font-bold text-xs animate-in zoom-in text-white shadow-[0_0_15px_rgba(244,63,94,0.8)]">C1</div>
                     <div className="absolute bottom-16 left-24 size-6 bg-emerald-500 rounded-full flex items-center justify-center font-bold text-xs animate-in zoom-in delay-100 text-white shadow-[0_0_15px_rgba(16,185,129,0.8)]">C2</div>
                     <div className="absolute top-1/2 left-1/2 size-6 bg-indigo-500 rounded-full flex items-center justify-center font-bold text-xs animate-in zoom-in delay-200 text-white shadow-[0_0_15px_rgba(99,102,241,0.8)]">C3</div>
                  </>
                )}
             </div>

             {animState === 2 && <p className="text-cyan-400 font-bold animate-in fade-in bg-cyan-950/40 px-4 py-2 rounded-lg">Clusters start with random center points (centroids).</p>}
          </div>
        )}

        {step === 2 && (
          <div className="flex flex-col items-center justify-center h-full animate-in slide-in-from-right">
             <h3 className="text-2xl font-bold text-fuchsia-400 uppercase tracking-widest mb-8 flex items-center gap-2"><Route className="size-6" /> Assign Customers</h3>
             
             <div className="bg-slate-900 w-full max-w-lg h-64 rounded-xl border-2 border-slate-700 mb-8 relative flex items-center justify-center overflow-hidden">
                <div className="absolute top-10 left-20 size-6 bg-rose-500 rounded-full z-10" />
                <div className="absolute bottom-10 right-20 size-6 bg-emerald-500 rounded-full z-10" />

                <div className={`absolute top-16 left-32 size-4 rounded-full transition-colors duration-1000 z-20 ${animState >= 1 ? "bg-rose-400" : "bg-slate-500"}`} />
                <div className={`absolute top-8 left-40 size-4 rounded-full transition-colors duration-1000 z-20 ${animState >= 1 ? "bg-rose-400" : "bg-slate-500"}`} />
                <div className={`absolute bottom-20 right-32 size-4 rounded-full transition-colors duration-1000 z-20 ${animState >= 1 ? "bg-emerald-400" : "bg-slate-500"}`} />

                {animState === 0 && (
                  <button onClick={runAssign} className="px-6 py-2 bg-fuchsia-600 hover:bg-fuchsia-700 text-white font-bold rounded-lg z-30 absolute top-10 left-10 shadow-[0_0_15px_rgba(217,70,239,0.5)]">
                    Calculate Distances
                  </button>
                )}

                {animState >= 1 && (
                  <svg className="absolute inset-0 w-full h-full z-0 pointer-events-none">
                     <line x1="80" y1="40" x2="128" y2="64" stroke="#f43f5e" strokeWidth="2" strokeDasharray="4" className="animate-pulse" />
                     <line x1="80" y1="40" x2="160" y2="32" stroke="#f43f5e" strokeWidth="2" strokeDasharray="4" className="animate-pulse" />
                     <line x1="100%" y1="100%" x2="100%" y2="100%" /> 
                  </svg>
                )}
             </div>

             {animState === 2 && <p className="text-fuchsia-400 font-bold animate-in fade-in bg-fuchsia-950/40 px-4 py-2 rounded-lg">Every point joins the nearest centroid.</p>}
          </div>
        )}

        {step === 3 && (
          <div className="flex flex-col items-center justify-center h-full animate-in slide-in-from-right">
             <h3 className="text-2xl font-bold text-amber-400 uppercase tracking-widest mb-8 flex items-center gap-2"><Move className="size-6" /> Move Centroids</h3>
             
             <div className="bg-slate-900 w-full max-w-lg h-64 rounded-xl border-2 border-slate-700 mb-8 relative overflow-hidden">
                <div className={`absolute size-4 rounded-full bg-rose-400 transition-all duration-1000 top-16 left-20`} />
                <div className={`absolute size-4 rounded-full bg-rose-400 transition-all duration-1000 top-32 left-32`} />
                <div className={`absolute size-4 rounded-full bg-rose-400 transition-all duration-1000 top-20 left-48`} />

                <div className={`absolute size-8 rounded-full border-4 border-rose-500 bg-rose-950/50 flex items-center justify-center transition-all duration-[2000ms] ease-in-out z-10 ${animState >= 1 ? "top-[5.5rem] left-[8.5rem] shadow-[0_0_30px_rgba(244,63,94,0.8)]" : "top-4 left-4"}`} />

                {animState === 0 && (
                  <button onClick={runMove} className="px-6 py-2 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-lg z-20 absolute top-10 right-10 shadow-[0_0_15px_rgba(217,119,6,0.5)]">
                    Update Center
                  </button>
                )}

                {animState === 2 && (
                  <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-amber-950/80 px-4 py-2 rounded border border-amber-500 text-amber-400 font-bold animate-in slide-in-from-bottom">
                     Centroid moves to the center of its assigned points!
                  </div>
                )}
             </div>
          </div>
        )}

        {step === 4 && (
          <div className="flex flex-col items-center justify-center h-full animate-in slide-in-from-right">
             <h3 className="text-2xl font-bold text-indigo-400 uppercase tracking-widest mb-8 flex items-center gap-2"><Route className="size-6" /> Repeat Until Stable</h3>
             
             <div className="bg-slate-900 w-full max-w-2xl p-8 rounded-xl border-2 border-slate-700 mb-8 flex flex-col items-center">
                
                <div className="flex items-center gap-8 text-2xl font-black uppercase tracking-widest text-slate-500 mb-8">
                   <div className={`transition-colors duration-500 ${animState === 1 ? "text-indigo-400" : ""}`}>Assign</div>
                   <ArrowRight className="size-6 text-slate-700" />
                   <div className={`transition-colors duration-500 ${animState === 2 ? "text-cyan-400" : ""}`}>Move</div>
                </div>

                {animState === 0 && (
                  <button onClick={runRepeat} className="px-10 py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xl rounded-xl shadow-[0_0_20px_rgba(79,70,229,0.5)]">
                    Run K-Means Loop
                  </button>
                )}

                {animState === 3 && (
                  <div className="text-emerald-400 font-black text-3xl animate-in zoom-in drop-shadow-[0_0_15px_rgba(52,211,153,0.8)] border-4 border-emerald-500 bg-emerald-950/40 px-8 py-4 rounded-xl">
                     CONVERGED
                  </div>
                )}
             </div>

             {animState === 3 && (
               <button onClick={nextStep} className="px-8 py-3 bg-gradient-to-r from-emerald-600 to-cyan-600 hover:from-emerald-500 hover:to-cyan-500 text-white font-bold rounded-xl animate-in zoom-in shadow-[0_0_20px_rgba(16,185,129,0.4)] mt-4">
                 Final Challenge <ArrowRight className="size-5 inline" />
               </button>
             )}
          </div>
        )}

        {step === 5 && (
          <div className="flex flex-col items-center justify-center h-full animate-in slide-in-from-right">
             <ShieldCheck className="size-16 text-emerald-400 mb-6 drop-shadow-[0_0_20px_rgba(52,211,153,0.4)]" />
             <h3 className="text-3xl font-black text-white uppercase tracking-widest mb-2">Final Challenge</h3>
             <p className="text-slate-400 mb-8 max-w-xl text-center">Find the optimal K for 100 Customers. Too few merges groups. Too many splits groups unnecessarily.</p>
             
             <div className="w-full max-w-2xl bg-slate-900 border-2 border-slate-700 rounded-xl mb-8 p-8 flex flex-col items-center">
                <div className="text-4xl font-black text-emerald-400 mb-6 border-b border-emerald-500/30 pb-2">K = {k} Clusters</div>
                <input 
                  type="range" 
                  min="2" max="10" step="1" 
                  value={k} 
                  onChange={(e) => handleKChange(parseInt(e.target.value))} 
                  className="w-full accent-emerald-500 cursor-pointer mb-8"
                />

                <div className="flex w-full justify-between items-center bg-slate-950 p-6 rounded-xl border border-slate-800">
                   <div className="text-center flex-1">
                      <div className="text-xs font-bold text-slate-500 uppercase mb-2">Cluster Quality</div>
                      <div className={`text-2xl font-black ${k < 4 ? "text-amber-400" : k === 4 ? "text-emerald-400" : "text-rose-500"}`}>
                         {k < 4 ? "Under-segmented" : k === 4 ? "Perfect!" : "Over-segmented"}
                      </div>
                   </div>
                   <div className="w-px h-16 bg-slate-800" />
                   <div className="text-center flex-1">
                      <div className="text-xs font-bold text-slate-500 uppercase mb-2">Visual Assessment</div>
                      <div className="flex justify-center gap-2">
                         {[...Array(k)].map((_,i) => <div key={i} className={`size-4 rounded-full ${i%4===0?"bg-rose-500":i%4===1?"bg-emerald-500":i%4===2?"bg-indigo-500":"bg-amber-500"}`} />)}
                      </div>
                   </div>
                </div>
             </div>

             {animState === 1 && (
               <div className="text-emerald-400 font-bold uppercase tracking-widest animate-in zoom-in bg-emerald-950/40 p-4 border border-emerald-500/50 rounded-xl">
                 <CheckCircle2 className="size-8 mx-auto mb-2" /> Optimal K Discovered!
               </div>
             )}
          </div>
        )}
      </div>
    </div>
  );
}
