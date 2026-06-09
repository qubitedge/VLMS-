import { useState, useEffect } from "react";
import { 
  Building2, SplitSquareHorizontal, Gauge, Sliders, Waves, ShieldCheck, 
  ArrowRight, CheckCircle2, Star, Target, Check, X
} from "lucide-react";

export function ClassificationLabCampaign() {
  const [xp, setXp] = useState(0);
  const [successMsg, setSuccessMsg] = useState("");
  const [step, setStep] = useState(0); // 0: Start, 1: Binary, 2: Gauge, 3: Threshold, 4: Adjust, 5: Sigmoid, 6: Challenge
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
  const runBinary = async () => {
    setAnimState(1); 
    await new Promise(r => setTimeout(r, 2000));
    setAnimState(2); 
    addXp(50, "Categorizer!");
    setTimeout(() => nextStep(), 3000);
  };

  // Stage 2
  const runGauge = async () => {
    setAnimState(1); 
    await new Promise(r => setTimeout(r, 2000));
    setAnimState(2); 
    addXp(50, "Probability Scanner!");
    setTimeout(() => nextStep(), 3000);
  };

  // Stage 3
  const runThreshold = async () => {
    setAnimState(1); 
    await new Promise(r => setTimeout(r, 2000));
    setAnimState(2); 
    addXp(50, "Decision Maker!");
    setTimeout(() => nextStep(), 3000);
  };

  // Stage 4
  const [threshold, setThreshold] = useState(50);
  const handleThresholdChange = (val: number) => {
    setThreshold(val);
    if (val === 80 && animState === 0) {
      setAnimState(1);
      addXp(100, "Strict Banker!");
    }
  };

  // Stage 5
  const runSigmoid = async () => {
    setAnimState(1); 
    await new Promise(r => setTimeout(r, 2500));
    setAnimState(2); 
    addXp(50, "Math Visualizer!");
    setTimeout(() => nextStep(), 4000);
  };

  // Stage 6 Challenge
  const [finalThresh, setFinalThresh] = useState(50);
  const handleFinalChange = (val: number) => {
    setFinalThresh(val);
    if (val === 65 && animState === 0) {
      setAnimState(1);
      addXp(150, "Optimal Balance!");
    }
  };

  return (
    <div className="flex flex-col h-full bg-slate-950 text-foreground p-6 overflow-hidden relative font-sans">
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-800 shrink-0 z-20">
        <div>
          <h2 className="text-2xl font-black flex items-center gap-3 uppercase tracking-widest text-indigo-400 drop-shadow-[0_0_10px_rgba(99,102,241,0.3)]">
            <Building2 className="size-7" /> 
            Classification Lab
          </h2>
        </div>
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2 bg-indigo-950/50 px-4 py-1.5 rounded-full border border-indigo-900 font-bold shadow-sm text-indigo-100">
            <Star className="size-4 text-indigo-400" /> {xp} XP
          </div>
        </div>
      </div>

      {successMsg && (
        <div className="absolute top-24 left-1/2 -translate-x-1/2 bg-indigo-600 text-white px-6 py-3 rounded-lg shadow-xl animate-in slide-in-from-top-10 z-50 font-bold flex items-center gap-2">
          <Star className="size-5 fill-white" /> {successMsg}
        </div>
      )}

      <div className="flex-1 min-h-0 overflow-y-auto">
        {step === 0 && (
          <div className="h-full flex flex-col items-center justify-center text-center animate-in zoom-in duration-500">
             <Building2 className="size-24 text-indigo-500 mb-6 drop-shadow-[0_0_30px_rgba(99,102,241,0.5)]" />
             <h1 className="text-4xl font-black text-white uppercase tracking-widest mb-4">Loan Approval System</h1>
             <p className="text-slate-400 max-w-xl text-lg mb-8">
               A bank receives loan applications. The AI must use Logistic Regression to decide Approve or Reject based on probability.
             </p>
             <div className="bg-slate-900 p-6 rounded-xl border border-slate-700 mb-8 font-mono text-sm tracking-widest text-slate-300 w-full max-w-md">
                <div className="text-indigo-400 font-bold mb-4 uppercase">Customer A</div>
                <div className="flex justify-between border-b border-slate-800 py-2"><span>Income</span> <span className="font-bold text-white">75K</span></div>
                <div className="flex justify-between border-b border-slate-800 py-2"><span>Credit Score</span> <span className="font-bold text-white">780</span></div>
                <div className="flex justify-between py-2"><span>Age</span> <span className="font-bold text-white">35</span></div>
             </div>
             <button onClick={nextStep} className="px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-[0_0_20px_rgba(79,70,229,0.4)] flex items-center gap-2">
               Start Analysis <ArrowRight className="size-5" />
             </button>
          </div>
        )}

        {step === 1 && (
          <div className="flex flex-col items-center justify-center h-full animate-in slide-in-from-right">
             <h3 className="text-2xl font-bold text-cyan-400 uppercase tracking-widest mb-8 flex items-center gap-2"><SplitSquareHorizontal className="size-6" /> Binary Classification</h3>
             
             <div className="w-full max-w-xl flex h-64 bg-slate-900 border-2 border-slate-700 rounded-xl mb-8 relative overflow-hidden">
                <div className={`flex-1 flex flex-col items-center justify-center border-r-2 border-dashed border-slate-700 transition-all duration-1000 ${animState >= 1 ? "bg-emerald-950/30" : ""}`}>
                   <div className={`text-2xl font-black uppercase tracking-widest transition-opacity duration-1000 ${animState >= 1 ? "text-emerald-500 opacity-100" : "opacity-0"}`}>Approved</div>
                </div>
                <div className={`flex-1 flex flex-col items-center justify-center transition-all duration-1000 ${animState >= 1 ? "bg-rose-950/30" : ""}`}>
                   <div className={`text-2xl font-black uppercase tracking-widest transition-opacity duration-1000 ${animState >= 1 ? "text-rose-500 opacity-100" : "opacity-0"}`}>Rejected</div>
                </div>

                {animState === 0 && (
                  <button onClick={runBinary} className="px-6 py-2 bg-cyan-600 hover:bg-cyan-700 text-white font-bold rounded-lg z-20 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 shadow-[0_0_15px_rgba(6,182,212,0.5)]">
                    Define Zones
                  </button>
                )}

                {animState >= 2 && (
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-12 bg-white rounded flex items-center justify-center font-black text-slate-900 shadow-xl animate-in zoom-in z-20">A</div>
                )}
             </div>

             {animState === 2 && <p className="text-cyan-400 font-bold animate-in fade-in bg-cyan-950/40 px-4 py-2 rounded-lg">Customers must end up in one of two distinct categories.</p>}
          </div>
        )}

        {step === 2 && (
          <div className="flex flex-col items-center justify-center h-full animate-in slide-in-from-right">
             <h3 className="text-2xl font-bold text-amber-400 uppercase tracking-widest mb-8 flex items-center gap-2"><Gauge className="size-6" /> Probability Meter</h3>
             
             <div className="w-full max-w-lg bg-slate-900 border-2 border-slate-700 rounded-xl mb-8 p-8 flex flex-col items-center relative">
                
                {animState === 0 && (
                  <button onClick={runGauge} className="px-6 py-2 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-lg z-20 shadow-[0_0_15px_rgba(217,119,6,0.5)] mb-8">
                    Scan Customer A
                  </button>
                )}

                {animState >= 1 && (
                  <>
                    <div className="w-full h-8 bg-slate-800 rounded-full overflow-hidden mb-4 relative">
                       <div className="absolute left-0 top-0 bottom-0 bg-gradient-to-r from-rose-500 via-amber-500 to-emerald-500 w-full opacity-50" />
                       <div className="h-full bg-emerald-400 relative z-10 transition-all duration-[2000ms] ease-out" style={{ width: animState === 2 ? "82%" : "0%" }} />
                    </div>
                    <div className="flex justify-between w-full text-xs font-bold text-slate-500 mb-8">
                       <span>0.00 (Reject)</span>
                       <span>1.00 (Approve)</span>
                    </div>
                  </>
                )}

                {animState === 2 && (
                  <div className="text-4xl font-black text-amber-400 animate-in zoom-in drop-shadow-[0_0_15px_rgba(251,191,36,0.5)]">
                     P(Approve) = 0.82
                  </div>
                )}
             </div>

             {animState === 2 && <p className="text-amber-400 font-bold animate-in fade-in bg-amber-950/40 px-4 py-2 rounded-lg">Logistic Regression predicts probability first (between 0 and 1).</p>}
          </div>
        )}

        {step === 3 && (
          <div className="flex flex-col items-center justify-center h-full animate-in slide-in-from-right">
             <h3 className="text-2xl font-bold text-indigo-400 uppercase tracking-widest mb-8 flex items-center gap-2"><SplitSquareHorizontal className="size-6" /> Threshold Decision</h3>
             
             <div className="w-full max-w-lg bg-slate-900 border-2 border-slate-700 rounded-xl mb-8 p-8 flex flex-col items-center relative">
                
                <div className="flex justify-between w-full mb-8 font-mono text-xl">
                   <div className="flex flex-col items-center"><span className="text-slate-500 text-xs mb-1">Probability</span><span className="text-emerald-400">0.82</span></div>
                   <div className="flex flex-col items-center"><span className="text-slate-500 text-xs mb-1">Threshold</span><span className="text-white">0.50</span></div>
                </div>

                {animState === 0 && (
                  <button onClick={runThreshold} className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-lg z-20 shadow-[0_0_15px_rgba(79,70,229,0.5)]">
                    Apply Threshold
                  </button>
                )}

                {animState >= 1 && (
                  <div className="text-2xl font-bold text-slate-300 bg-slate-950 px-6 py-3 rounded mb-8 animate-in zoom-in">
                     0.82 {">"} 0.50
                  </div>
                )}

                {animState === 2 && (
                  <div className="text-4xl font-black text-emerald-400 bg-emerald-950/50 border-2 border-emerald-500 px-8 py-4 rounded-xl animate-in slide-in-from-bottom shadow-[0_0_20px_rgba(16,185,129,0.3)]">
                     APPROVE
                  </div>
                )}
             </div>
          </div>
        )}

        {step === 4 && (
          <div className="flex flex-col items-center justify-center h-full animate-in slide-in-from-right">
             <h3 className="text-2xl font-bold text-fuchsia-400 uppercase tracking-widest mb-8 flex items-center gap-2"><Sliders className="size-6" /> Adjust Threshold</h3>
             
             <div className="w-full max-w-2xl bg-slate-900 border-2 border-slate-700 rounded-xl mb-8 p-8 flex flex-col items-center">
                <div className="text-3xl font-black text-fuchsia-400 mb-6 border-b border-fuchsia-500/30 pb-2">Threshold = {(threshold/100).toFixed(2)}</div>
                <input 
                  type="range" 
                  min="10" max="90" step="5" 
                  value={threshold} 
                  onChange={(e) => handleThresholdChange(parseInt(e.target.value))} 
                  className="w-full accent-fuchsia-500 cursor-pointer mb-12"
                />

                <div className="flex w-full justify-between items-center bg-slate-950 p-6 rounded-xl border border-slate-800">
                   <div className="text-center">
                      <div className="text-sm font-bold text-slate-500 uppercase mb-2">Approvals</div>
                      <div className={`text-4xl font-black ${threshold < 50 ? "text-emerald-400" : "text-slate-600"}`}>
                         {Math.max(0, 100 - threshold)}
                      </div>
                   </div>
                   <div className="text-center">
                      <div className="text-sm font-bold text-slate-500 uppercase mb-2">Rejections</div>
                      <div className={`text-4xl font-black ${threshold > 50 ? "text-rose-400" : "text-slate-600"}`}>
                         {threshold}
                      </div>
                   </div>
                </div>
             </div>

             {animState === 1 && (
               <button onClick={nextStep} className="px-8 py-3 bg-gradient-to-r from-fuchsia-600 to-indigo-600 hover:from-fuchsia-500 hover:to-indigo-500 text-white font-bold rounded-xl animate-in zoom-in shadow-[0_0_20px_rgba(217,70,239,0.4)]">
                 View Math Model <ArrowRight className="size-5 inline" />
               </button>
             )}
             
             {animState === 0 && <p className="text-fuchsia-400 font-bold">Try setting a strict threshold (0.80) to reduce risky loans.</p>}
          </div>
        )}

        {step === 5 && (
          <div className="flex flex-col items-center justify-center h-full animate-in slide-in-from-right">
             <h3 className="text-2xl font-bold text-cyan-400 uppercase tracking-widest mb-8 flex items-center gap-2"><Waves className="size-6" /> Sigmoid Function</h3>
             
             <div className="w-full max-w-lg h-64 bg-slate-900 border-l-2 border-b-2 border-slate-600 rounded mb-8 relative flex items-center overflow-hidden">
                
                {animState === 0 && (
                  <button onClick={runSigmoid} className="px-6 py-2 bg-cyan-600 hover:bg-cyan-700 text-white font-bold rounded-lg z-20 absolute top-10 left-10 shadow-[0_0_15px_rgba(6,182,212,0.5)]">
                    Draw Sigmoid Curve
                  </button>
                )}

                {/* S-Curve */}
                {animState >= 1 && (
                  <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
                     <path 
                        d="M 0 200 C 150 200, 250 50, 400 50" 
                        fill="transparent" 
                        stroke="#06b6d4" 
                        strokeWidth="4" 
                        className="animate-in slide-in-from-left duration-[2000ms] ease-linear"
                     />
                  </svg>
                )}

                {/* Point traveling */}
                {animState === 2 && (
                  <div 
                    className="absolute size-4 bg-amber-400 rounded-full shadow-[0_0_15px_rgba(251,191,36,0.8)] z-10 -ml-2 -mt-2"
                    style={{
                      offsetPath: "path('M 0 200 C 150 200, 250 50, 400 50')",
                      animation: "travel 3s ease-in-out infinite"
                    }}
                  />
                )}
                
                <style>{`
                  @keyframes travel {
                    0% { offset-distance: 0%; }
                    100% { offset-distance: 100%; }
                  }
                `}</style>
             </div>

             {animState === 2 && (
               <div className="flex flex-col items-center animate-in fade-in">
                 <p className="text-cyan-400 font-bold bg-cyan-950/40 px-4 py-2 rounded-lg mb-4 text-center max-w-lg">
                   The Sigmoid "S" curve converts any number into a probability exactly between 0 and 1.
                 </p>
                 <button onClick={nextStep} className="px-8 py-3 bg-gradient-to-r from-emerald-600 to-cyan-600 text-white font-bold rounded-xl animate-in zoom-in shadow-[0_0_20px_rgba(16,185,129,0.4)]">
                   Final Challenge <ArrowRight className="size-5 inline" />
                 </button>
               </div>
             )}
          </div>
        )}

        {step === 6 && (
          <div className="flex flex-col items-center justify-center h-full animate-in slide-in-from-right">
             <ShieldCheck className="size-16 text-emerald-400 mb-6 drop-shadow-[0_0_20px_rgba(52,211,153,0.4)]" />
             <h3 className="text-3xl font-black text-white uppercase tracking-widest mb-2">Final Challenge</h3>
             <p className="text-slate-400 mb-8 max-w-xl text-center">Tune the threshold to maximize profit. Too low = Defaults. Too high = Missed Interest.</p>
             
             <div className="w-full max-w-2xl bg-slate-900 border-2 border-slate-700 rounded-xl mb-8 p-8 flex flex-col items-center">
                <div className="text-2xl font-black text-emerald-400 mb-6 border-b border-emerald-500/30 pb-2">Threshold = {(finalThresh/100).toFixed(2)}</div>
                <input 
                  type="range" 
                  min="20" max="90" step="5" 
                  value={finalThresh} 
                  onChange={(e) => handleFinalChange(parseInt(e.target.value))} 
                  className="w-full accent-emerald-500 cursor-pointer mb-8"
                />

                <div className="flex w-full justify-between items-center bg-slate-950 p-6 rounded-xl border border-slate-800 relative overflow-hidden">
                   <div className="text-center z-10">
                      <div className="text-xs font-bold text-slate-500 uppercase mb-2">Defaults (Risk)</div>
                      <div className={`text-2xl font-black ${finalThresh < 50 ? "text-rose-500" : "text-emerald-400"}`}>
                         {Math.max(0, 100 - finalThresh)} Cases
                      </div>
                   </div>
                   <div className="text-center z-10">
                      <div className="text-xs font-bold text-slate-500 uppercase mb-2">Bank Profit</div>
                      <div className={`text-3xl font-black ${finalThresh === 65 ? "text-amber-400 drop-shadow-[0_0_10px_rgba(251,191,36,0.8)]" : "text-white"}`}>
                         ${finalThresh < 65 ? (finalThresh * 2) : 130 - (finalThresh - 65) * 3}M
                      </div>
                   </div>
                   <div className="text-center z-10">
                      <div className="text-xs font-bold text-slate-500 uppercase mb-2">Missed Interest</div>
                      <div className={`text-2xl font-black ${finalThresh > 70 ? "text-rose-500" : "text-emerald-400"}`}>
                         ${Math.max(0, finalThresh - 50)}M
                      </div>
                   </div>
                </div>
             </div>

             {animState === 1 && (
               <div className="text-emerald-400 font-bold uppercase tracking-widest animate-in zoom-in bg-emerald-950/40 p-4 border border-emerald-500/50 rounded-xl">
                 <CheckCircle2 className="size-8 mx-auto mb-2" /> Optimal Threshold Achieved!
               </div>
             )}
          </div>
        )}
      </div>
    </div>
  );
}
