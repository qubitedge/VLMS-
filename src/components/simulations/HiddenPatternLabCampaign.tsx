import { useState, useEffect } from "react";
import { 
  Sparkles, Combine, Orbit, Maximize, Repeat2, ShieldCheck, 
  ArrowRight, CheckCircle2, Star, Target
} from "lucide-react";

export function HiddenPatternLabCampaign() {
  const [xp, setXp] = useState(0);
  const [successMsg, setSuccessMsg] = useState("");
  const [step, setStep] = useState(0); // 0: Start, 1: Guess, 2: Expectation, 3: Maximization, 4: Repeat, 5: Challenge
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
  const runGuess = async () => {
    setAnimState(1); 
    await new Promise(r => setTimeout(r, 2000));
    setAnimState(2); 
    addXp(50, "Star Mapper!");
    setTimeout(() => nextStep(), 3000);
  };

  // Stage 2
  const runExpectation = async () => {
    setAnimState(1); 
    await new Promise(r => setTimeout(r, 2000));
    setAnimState(2); 
    addXp(50, "Probability Estimator!");
    setTimeout(() => nextStep(), 3000);
  };

  // Stage 3
  const runMaximization = async () => {
    setAnimState(1); 
    await new Promise(r => setTimeout(r, 2500));
    setAnimState(2); 
    addXp(50, "Parameter Optimizer!");
    setTimeout(() => nextStep(), 4000);
  };

  // Stage 4
  const runEM = async () => {
    setAnimState(1); 
    await new Promise(r => setTimeout(r, 1000));
    setAnimState(2);
    await new Promise(r => setTimeout(r, 1000));
    setAnimState(3);
    addXp(50, "EM Loop Master!");
    setTimeout(() => nextStep(), 4000);
  };

  // Stage 5 Challenge
  const [variance, setVariance] = useState(50);
  const handleVarianceChange = (val: number) => {
    setVariance(val);
    if (val === 80 && animState === 0) {
      setAnimState(1);
      addXp(150, "Galaxy Discoverer!");
    }
  };

  return (
    <div className="flex flex-col h-full bg-slate-950 text-foreground p-6 overflow-hidden relative font-sans">
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-800 shrink-0 z-20">
        <div>
          <h2 className="text-2xl font-black flex items-center gap-3 uppercase tracking-widest text-violet-400 drop-shadow-[0_0_10px_rgba(139,92,246,0.3)]">
            <Orbit className="size-7" /> 
            Hidden Pattern Lab
          </h2>
        </div>
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2 bg-violet-950/50 px-4 py-1.5 rounded-full border border-violet-900 font-bold shadow-sm text-violet-100">
            <Star className="size-4 text-violet-400" /> {xp} XP
          </div>
        </div>
      </div>

      {successMsg && (
        <div className="absolute top-24 left-1/2 -translate-x-1/2 bg-violet-600 text-white px-6 py-3 rounded-lg shadow-xl animate-in slide-in-from-top-10 z-50 font-bold flex items-center gap-2">
          <Star className="size-5 fill-white" /> {successMsg}
        </div>
      )}

      <div className="flex-1 min-h-0 overflow-y-auto">
        {step === 0 && (
          <div className="h-full flex flex-col items-center justify-center text-center animate-in zoom-in duration-500">
             <Sparkles className="size-24 text-violet-500 mb-6 drop-shadow-[0_0_30px_rgba(139,92,246,0.5)]" />
             <h1 className="text-4xl font-black text-white uppercase tracking-widest mb-4">Discover Invisible Groups</h1>
             <p className="text-slate-400 max-w-xl text-lg mb-8">
               Data from space sensors shows heavily overlapping clusters. K-Means fails here. Use Expectation Maximization (EM) to find hidden Gaussian groups.
             </p>
             <div className="bg-slate-950 w-full max-w-lg h-48 rounded-xl border border-slate-800 mb-8 relative overflow-hidden flex items-center justify-center">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-slate-900 to-black" />
                
                {/* Random stars */}
                {[...Array(40)].map((_,i) => (
                  <div key={i} className="absolute size-1 bg-white/60 rounded-full" style={{ top: `${Math.random() * 100}%`, left: `${Math.random() * 100}%` }} />
                ))}
             </div>
             <button onClick={nextStep} className="px-8 py-4 bg-violet-600 hover:bg-violet-700 text-white font-bold rounded-xl shadow-[0_0_20px_rgba(139,92,246,0.4)] flex items-center gap-2">
               Launch EM Algorithm <ArrowRight className="size-5" />
             </button>
          </div>
        )}

        {step === 1 && (
          <div className="flex flex-col items-center justify-center h-full animate-in slide-in-from-right">
             <h3 className="text-2xl font-bold text-cyan-400 uppercase tracking-widest mb-8 flex items-center gap-2"><Target className="size-6" /> Initial Guess</h3>
             
             <div className="bg-black w-full max-w-lg h-64 rounded-xl border-2 border-slate-800 mb-8 relative overflow-hidden flex items-center justify-center">
                {[...Array(40)].map((_,i) => (
                  <div key={i} className="absolute size-1 bg-white/60 rounded-full" style={{ top: `${Math.random() * 100}%`, left: `${Math.random() * 100}%` }} />
                ))}

                {animState === 0 && (
                  <button onClick={runGuess} className="px-6 py-2 bg-cyan-600 hover:bg-cyan-700 text-white font-bold rounded-lg z-20 absolute top-10 left-10 shadow-[0_0_15px_rgba(6,182,212,0.5)]">
                    Guess Star Clusters
                  </button>
                )}

                {animState >= 1 && (
                  <>
                     <div className="absolute top-1/3 left-1/3 size-32 rounded-full border border-dashed border-rose-500/50 bg-rose-500/10 -translate-x-1/2 -translate-y-1/2 animate-in zoom-in z-10 flex items-center justify-center"><div className="size-3 bg-rose-500 rounded-full shadow-[0_0_10px_#f43f5e]" /></div>
                     <div className="absolute bottom-1/3 right-1/3 size-32 rounded-full border border-dashed border-blue-500/50 bg-blue-500/10 translate-x-1/2 translate-y-1/2 animate-in zoom-in delay-200 z-10 flex items-center justify-center"><div className="size-3 bg-blue-500 rounded-full shadow-[0_0_10px_#3b82f6]" /></div>
                  </>
                )}
             </div>

             {animState === 2 && <p className="text-cyan-400 font-bold animate-in fade-in bg-cyan-950/40 px-4 py-2 rounded-lg">Like K-Means, EM starts with a random guess of cluster parameters.</p>}
          </div>
        )}

        {step === 2 && (
          <div className="flex flex-col items-center justify-center h-full animate-in slide-in-from-right">
             <h3 className="text-2xl font-bold text-fuchsia-400 uppercase tracking-widest mb-8 flex items-center gap-2"><Combine className="size-6" /> Expectation Step (E-Step)</h3>
             
             <div className="bg-black w-full max-w-lg h-64 rounded-xl border-2 border-slate-800 mb-8 relative flex items-center justify-center overflow-hidden">
                <div className="absolute top-1/2 left-1/2 size-4 bg-white rounded-full z-20 shadow-[0_0_15px_white] -translate-x-1/2 -translate-y-1/2" />
                
                <div className="absolute top-1/4 left-1/4 size-3 bg-rose-500 rounded-full z-10 shadow-[0_0_10px_#f43f5e]" />
                <div className="absolute bottom-1/4 right-1/4 size-3 bg-blue-500 rounded-full z-10 shadow-[0_0_10px_#3b82f6]" />

                {animState === 0 && (
                  <button onClick={runExpectation} className="px-6 py-2 bg-fuchsia-600 hover:bg-fuchsia-700 text-white font-bold rounded-lg z-30 absolute top-10 left-10 shadow-[0_0_15px_rgba(217,70,239,0.5)]">
                    Estimate Probabilities
                  </button>
                )}

                {animState >= 1 && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center z-30">
                     <div className="bg-slate-900/90 border border-slate-700 p-4 rounded-xl text-center animate-in slide-in-from-bottom mt-20">
                        <div className="text-xs font-bold text-slate-400 uppercase mb-2">Star Probability</div>
                        <div className="flex gap-4">
                           <div className="text-rose-400 font-black text-xl">80% Cluster A</div>
                           <div className="text-blue-400 font-black text-xl">20% Cluster B</div>
                        </div>
                     </div>
                  </div>
                )}
             </div>

             {animState === 2 && <p className="text-fuchsia-400 font-bold animate-in fade-in bg-fuchsia-950/40 px-4 py-2 rounded-lg">Each point is assigned a PROBABILITY of belonging to each cluster.</p>}
          </div>
        )}

        {step === 3 && (
          <div className="flex flex-col items-center justify-center h-full animate-in slide-in-from-right">
             <h3 className="text-2xl font-bold text-amber-400 uppercase tracking-widest mb-8 flex items-center gap-2"><Maximize className="size-6" /> Maximization Step (M-Step)</h3>
             
             <div className="bg-black w-full max-w-lg h-64 rounded-xl border-2 border-slate-800 mb-8 relative overflow-hidden flex items-center justify-center">
                
                <div className={`absolute rounded-full border border-rose-500/50 bg-rose-500/20 transition-all duration-1000 z-10 flex items-center justify-center ${animState >= 1 ? "w-64 h-32 top-10 left-10 rotate-12" : "size-32 top-16 left-16"}`}>
                   <div className="size-3 bg-rose-500 rounded-full shadow-[0_0_10px_#f43f5e]" />
                </div>

                {animState === 0 && (
                  <button onClick={runMaximization} className="px-6 py-2 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-lg z-20 absolute top-10 right-10 shadow-[0_0_15px_rgba(217,119,6,0.5)]">
                    Update Gaussian Models
                  </button>
                )}

                {animState === 2 && (
                  <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-amber-950/80 px-4 py-2 rounded border border-amber-500 text-amber-400 font-bold animate-in slide-in-from-bottom whitespace-nowrap z-20">
                     Centers AND shapes update based on probabilities!
                  </div>
                )}
             </div>
          </div>
        )}

        {step === 4 && (
          <div className="flex flex-col items-center justify-center h-full animate-in slide-in-from-right">
             <h3 className="text-2xl font-bold text-indigo-400 uppercase tracking-widest mb-8 flex items-center gap-2"><Repeat2 className="size-6" /> Repeat Until Convergence</h3>
             
             <div className="bg-black w-full max-w-2xl p-8 rounded-xl border-2 border-slate-800 mb-8 flex flex-col items-center relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-slate-900/50 to-transparent pointer-events-none" />

                <div className="flex items-center gap-8 text-2xl font-black uppercase tracking-widest text-slate-500 mb-8 z-10">
                   <div className={`transition-colors duration-500 ${animState === 1 ? "text-fuchsia-400 scale-110 drop-shadow-[0_0_10px_rgba(217,70,239,0.8)]" : ""}`}>Expectation</div>
                   <ArrowRight className="size-6 text-slate-700" />
                   <div className={`transition-colors duration-500 ${animState === 2 ? "text-amber-400 scale-110 drop-shadow-[0_0_10px_rgba(251,191,36,0.8)]" : ""}`}>Maximization</div>
                </div>

                {animState === 0 && (
                  <button onClick={runEM} className="px-10 py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xl rounded-xl shadow-[0_0_20px_rgba(79,70,229,0.5)] z-10">
                    Run EM Loop
                  </button>
                )}

                {animState === 3 && (
                  <div className="text-emerald-400 font-black text-3xl animate-in zoom-in drop-shadow-[0_0_15px_rgba(52,211,153,0.8)] border-4 border-emerald-500 bg-emerald-950/40 px-8 py-4 rounded-xl z-10 text-center">
                     MODELS CONVERGED<br/>
                     <span className="text-sm font-bold text-emerald-200 tracking-normal drop-shadow-none">Hidden probability clouds discovered!</span>
                  </div>
                )}
             </div>

             {animState === 3 && (
               <button onClick={nextStep} className="px-8 py-3 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-bold rounded-xl animate-in zoom-in shadow-[0_0_20px_rgba(139,92,246,0.4)] mt-4">
                 Final Galaxy Challenge <ArrowRight className="size-5 inline" />
               </button>
             )}
          </div>
        )}

        {step === 5 && (
          <div className="flex flex-col items-center justify-center h-full animate-in slide-in-from-right">
             <ShieldCheck className="size-16 text-violet-400 mb-6 drop-shadow-[0_0_20px_rgba(139,92,246,0.4)]" />
             <h3 className="text-3xl font-black text-white uppercase tracking-widest mb-2">Final Challenge</h3>
             <p className="text-slate-400 mb-8 max-w-xl text-center">Adjust the Gaussian Variance to capture the spread of the hidden star clusters. EM handles shape and size natively!</p>
             
             <div className="w-full max-w-2xl bg-black border-2 border-slate-800 rounded-xl mb-8 p-8 flex flex-col items-center relative overflow-hidden">
                <div className="text-3xl font-black text-violet-400 mb-6 border-b border-violet-500/30 pb-2 z-10">Variance = {variance}</div>
                <input 
                  type="range" 
                  min="20" max="150" step="10" 
                  value={variance} 
                  onChange={(e) => handleVarianceChange(parseInt(e.target.value))} 
                  className="w-full accent-violet-500 cursor-pointer mb-8 z-10"
                />

                <div className="relative w-full h-48 border border-slate-800 rounded-xl flex items-center justify-center overflow-hidden">
                   {/* Background noise */}
                   {[...Array(60)].map((_,i) => (
                     <div key={i} className="absolute size-1 bg-slate-500/30 rounded-full" style={{ top: `${Math.random() * 100}%`, left: `${Math.random() * 100}%` }}/>
                   ))}

                   {/* The cluster we are trying to fit */}
                   <div className="absolute w-64 h-24 rounded-[100%] border-2 border-dashed border-emerald-500/50" />
                   
                   {/* Our Gaussian Model */}
                   <div 
                      className="absolute rounded-[100%] border-2 border-violet-500 bg-violet-500/20 transition-all duration-300 flex items-center justify-center"
                      style={{ 
                         width: `${variance * 3}px`,
                         height: `${variance * 1.2}px`,
                         borderColor: variance === 80 ? "#10b981" : "#8b5cf6",
                         backgroundColor: variance === 80 ? "rgba(16,185,129,0.2)" : "rgba(139,92,246,0.2)"
                      }}
                   >
                      <div className="size-2 bg-white rounded-full shadow-[0_0_10px_white]" />
                   </div>
                </div>
             </div>

             {animState === 1 && (
               <div className="text-emerald-400 font-bold uppercase tracking-widest animate-in zoom-in bg-emerald-950/40 p-4 border border-emerald-500/50 rounded-xl">
                 <CheckCircle2 className="size-8 mx-auto mb-2" /> Hidden Star Cluster Identified!
               </div>
             )}
          </div>
        )}
      </div>
    </div>
  );
}
