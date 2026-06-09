import { useState, useEffect } from "react";
import { 
  LineChart, TrendingUp, HelpCircle, Sliders, AlertTriangle, ShieldCheck, 
  ArrowRight, CheckCircle2, Star, Plus,
  Target
} from "lucide-react";

export function SimpleRegressionLabCampaign() {
  const [xp, setXp] = useState(0);
  const [successMsg, setSuccessMsg] = useState("");
  const [step, setStep] = useState(0); // 0: Start, 1: Trend, 2: Error, 3: Adjust, 4: Predict, 5: Challenge
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
  const runTrend = async () => {
    setAnimState(1); 
    await new Promise(r => setTimeout(r, 2000));
    setAnimState(2); 
    addXp(50, "Trend Spotter!");
    setTimeout(() => nextStep(), 4000);
  };

  // Stage 2
  const runError = async () => {
    setAnimState(1); 
    await new Promise(r => setTimeout(r, 2500));
    setAnimState(2); 
    addXp(50, "Error Visualizer!");
    setTimeout(() => nextStep(), 4000);
  };

  // Stage 3
  const [slope, setSlope] = useState(50);
  const [intercept, setIntercept] = useState(20);
  const handleSlopeChange = (s: number) => {
    setSlope(s);
    if (s === 65 && intercept === 10 && animState === 0) {
      setAnimState(1);
      addXp(100, "Perfect Fit!");
      setTimeout(() => nextStep(), 3000);
    }
  };
  const handleInterceptChange = (i: number) => {
    setIntercept(i);
    if (slope === 65 && i === 10 && animState === 0) {
      setAnimState(1);
      addXp(100, "Perfect Fit!");
      setTimeout(() => nextStep(), 3000);
    }
  };

  // Stage 4
  const runPrediction = async () => {
    setAnimState(1); 
    await new Promise(r => setTimeout(r, 2000));
    setAnimState(2); 
    addXp(50, "Price Predictor!");
    setTimeout(() => nextStep(), 4000);
  };

  // Stage 5
  const runOutlier = async () => {
    setAnimState(1); 
    await new Promise(r => setTimeout(r, 2000));
    setAnimState(2); 
    addXp(100, "Outlier Detective!");
  };

  return (
    <div className="flex flex-col h-full bg-slate-950 text-foreground p-6 overflow-hidden relative font-sans">
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-800 shrink-0 z-20">
        <div>
          <h2 className="text-2xl font-black flex items-center gap-3 uppercase tracking-widest text-indigo-400 drop-shadow-[0_0_10px_rgba(99,102,241,0.3)]">
            <LineChart className="size-7" /> 
            Regression Lab
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
             <LineChart className="size-24 text-indigo-500 mb-6 drop-shadow-[0_0_30px_rgba(99,102,241,0.5)]" />
             <h1 className="text-4xl font-black text-white uppercase tracking-widest mb-4">Predict House Prices</h1>
             <p className="text-slate-400 max-w-xl text-lg mb-8">
               A property company wants to predict house prices using Simple Linear Regression. Find a line that best represents the relationship.
             </p>
             <div className="bg-slate-900 p-6 rounded-xl border border-slate-700 mb-8 font-mono text-sm tracking-widest text-slate-300 w-full max-w-md">
                <div className="flex justify-between border-b border-slate-800 py-2"><span>1000 sq ft</span> <span className="font-bold text-emerald-400">₹20 Lakhs</span></div>
                <div className="flex justify-between border-b border-slate-800 py-2"><span>1500 sq ft</span> <span className="font-bold text-emerald-400">₹30 Lakhs</span></div>
                <div className="flex justify-between py-2"><span>2000 sq ft</span> <span className="font-bold text-emerald-400">₹40 Lakhs</span></div>
             </div>
             <button onClick={nextStep} className="px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-[0_0_20px_rgba(79,70,229,0.4)] flex items-center gap-2">
               Draw the Graph <ArrowRight className="size-5" />
             </button>
          </div>
        )}

        {step === 1 && (
          <div className="flex flex-col items-center justify-center h-full animate-in slide-in-from-right">
             <h3 className="text-2xl font-bold text-cyan-400 uppercase tracking-widest mb-8 flex items-center gap-2"><TrendingUp className="size-6" /> Find Trend</h3>
             
             <div className="w-full max-w-lg h-64 bg-slate-900 border-l-2 border-b-2 border-slate-600 rounded mb-8 relative px-4 flex items-end overflow-hidden pb-4">
                <div className="absolute left-10 bottom-10 size-3 bg-white rounded-full" />
                <div className="absolute left-[40%] bottom-[40%] size-3 bg-white rounded-full" />
                <div className="absolute left-[70%] bottom-[70%] size-3 bg-white rounded-full" />

                {animState === 0 && (
                  <button onClick={runTrend} className="px-6 py-2 bg-cyan-600 hover:bg-cyan-700 text-white font-bold rounded-lg z-20 absolute top-10 left-10 shadow-[0_0_15px_rgba(6,182,212,0.5)]">
                    Find Trend Line
                  </button>
                )}

                {animState >= 1 && (
                  <div className="absolute bottom-6 left-6 w-[90%] h-1 bg-cyan-400 origin-bottom-left -rotate-45 animate-in slide-in-from-bottom-full duration-1000 shadow-[0_0_15px_rgba(6,182,212,0.8)]" />
                )}
             </div>

             {animState === 2 && <p className="text-cyan-400 font-bold animate-in fade-in bg-cyan-950/40 px-4 py-2 rounded-lg">Regression finds the best fit line through the points.</p>}
          </div>
        )}

        {step === 2 && (
          <div className="flex flex-col items-center justify-center h-full animate-in slide-in-from-right">
             <h3 className="text-2xl font-bold text-rose-400 uppercase tracking-widest mb-8 flex items-center gap-2"><AlertTriangle className="size-6" /> Error Visualization</h3>
             
             <div className="w-full max-w-lg h-64 bg-slate-900 border-l-2 border-b-2 border-slate-600 rounded mb-8 relative overflow-hidden">
                <div className="absolute left-16 bottom-16 size-3 bg-white rounded-full z-10" />
                <div className="absolute left-[45%] bottom-[30%] size-3 bg-white rounded-full z-10" />
                <div className="absolute left-[75%] bottom-[80%] size-3 bg-white rounded-full z-10" />

                <div className="absolute bottom-0 left-0 w-[120%] h-1 bg-indigo-500 origin-bottom-left -rotate-[35deg]" />

                {animState === 0 && (
                  <button onClick={runError} className="px-6 py-2 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-lg z-20 absolute top-10 left-10 shadow-[0_0_15px_rgba(244,63,94,0.5)]">
                    Show Error
                  </button>
                )}

                {animState >= 1 && (
                  <>
                    <div className="absolute left-[4rem] bottom-[4rem] h-[1rem] w-px bg-rose-500 animate-in slide-in-from-bottom" />
                    <div className="absolute left-[45%] bottom-[30%] h-[3rem] w-px bg-rose-500 animate-in slide-in-from-bottom" />
                    <div className="absolute left-[75%] bottom-[53%] h-[4.5rem] w-px bg-rose-500 animate-in slide-in-from-top" />
                  </>
                )}

                {animState === 2 && (
                  <div className="absolute bottom-4 right-4 bg-rose-950/80 px-2 py-1 rounded border border-rose-500/50 text-rose-400 text-xs font-bold">
                    Red Lines = Error (Residuals)
                  </div>
                )}
             </div>

             {animState === 2 && <p className="text-rose-400 font-bold animate-in fade-in bg-rose-950/40 px-4 py-2 rounded-lg">Smaller error means a better model.</p>}
          </div>
        )}

        {step === 3 && (
          <div className="flex flex-col items-center justify-center h-full animate-in slide-in-from-right">
             <h3 className="text-2xl font-bold text-emerald-400 uppercase tracking-widest mb-8 flex items-center gap-2"><Sliders className="size-6" /> Adjust Line</h3>
             
             <div className="flex w-full max-w-3xl gap-8">
                <div className="flex-1 bg-slate-900 border-l-2 border-b-2 border-slate-600 rounded h-64 relative overflow-hidden">
                   <div className="absolute left-[20%] bottom-[30%] size-3 bg-white rounded-full z-10 shadow-[0_0_10px_white]" />
                   <div className="absolute left-[50%] bottom-[50%] size-3 bg-white rounded-full z-10 shadow-[0_0_10px_white]" />
                   <div className="absolute left-[80%] bottom-[70%] size-3 bg-white rounded-full z-10 shadow-[0_0_10px_white]" />

                   <div 
                     className="absolute w-[150%] h-1 bg-emerald-400 origin-bottom-left shadow-[0_0_15px_rgba(52,211,153,0.8)] transition-all duration-300"
                     style={{ bottom: `${intercept}%`, transform: `rotate(-${slope / 2}deg)` }}
                   />
                </div>

                <div className="w-64 flex flex-col gap-8 bg-slate-900 border border-slate-700 p-6 rounded-xl justify-center">
                   <div>
                     <div className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-2 flex justify-between">
                       <span>Slope</span> <span className="text-white">{slope}</span>
                     </div>
                     <input type="range" min="10" max="90" step="5" value={slope} onChange={(e)=>handleSlopeChange(parseInt(e.target.value))} className="w-full accent-emerald-500" />
                   </div>
                   <div>
                     <div className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-2 flex justify-between">
                       <span>Intercept</span> <span className="text-white">{intercept}</span>
                     </div>
                     <input type="range" min="0" max="50" step="5" value={intercept} onChange={(e)=>handleInterceptChange(parseInt(e.target.value))} className="w-full accent-emerald-500" />
                   </div>
                </div>
             </div>

             {animState === 1 && (
               <div className="text-emerald-400 font-bold uppercase tracking-widest animate-in zoom-in bg-emerald-950/40 p-4 border border-emerald-500/50 rounded-xl mt-6">
                 <CheckCircle2 className="size-8 mx-auto mb-2" /> Optimal Line Found!
               </div>
             )}
          </div>
        )}

        {step === 4 && (
          <div className="flex flex-col items-center justify-center h-full animate-in slide-in-from-right">
             <h3 className="text-2xl font-bold text-fuchsia-400 uppercase tracking-widest mb-8 flex items-center gap-2"><Target className="size-6" /> Predict New Value</h3>
             
             <div className="w-full max-w-lg h-64 bg-slate-900 border-l-2 border-b-2 border-slate-600 rounded mb-8 relative flex items-end overflow-hidden pb-4">
                <div className="absolute left-[20%] bottom-[20%] size-3 bg-white/50 rounded-full" />
                <div className="absolute left-[40%] bottom-[40%] size-3 bg-white/50 rounded-full" />
                
                <div className="absolute bottom-0 left-0 w-[120%] h-1 bg-cyan-500/50 origin-bottom-left -rotate-45" />

                {animState === 0 && (
                  <button onClick={runPrediction} className="px-6 py-2 bg-fuchsia-600 hover:bg-fuchsia-700 text-white font-bold rounded-lg z-20 absolute top-10 left-10 shadow-[0_0_15px_rgba(217,70,239,0.5)]">
                    Predict 1800 sq ft
                  </button>
                )}

                {animState >= 1 && (
                  <div className="absolute left-[60%] bottom-0 w-px bg-fuchsia-500/50 border-r border-dashed border-fuchsia-500 animate-in slide-in-from-bottom h-[60%]" />
                )}

                {animState === 2 && (
                  <>
                     <div className="absolute left-[60%] bottom-[60%] size-4 bg-fuchsia-400 rounded-full shadow-[0_0_20px_rgba(217,70,239,1)] animate-in zoom-in z-10" />
                     <div className="absolute left-[62%] bottom-[62%] bg-fuchsia-950/80 px-3 py-1 rounded border border-fuchsia-500 font-bold text-white shadow-xl animate-in slide-in-from-bottom">
                       ₹36 Lakhs
                     </div>
                  </>
                )}
             </div>
          </div>
        )}

        {step === 5 && (
          <div className="flex flex-col items-center justify-center h-full animate-in slide-in-from-right">
             <ShieldCheck className="size-16 text-rose-400 mb-6 drop-shadow-[0_0_20px_rgba(244,63,94,0.4)]" />
             <h3 className="text-3xl font-black text-white uppercase tracking-widest mb-2">Final Challenge</h3>
             <p className="text-slate-400 mb-8 max-w-xl text-center">Observe how a single Outlier can affect Linear Regression.</p>
             
             <div className="w-full max-w-lg h-64 bg-slate-900 border-l-2 border-b-2 border-slate-600 rounded mb-8 relative overflow-hidden">
                <div className="absolute left-[20%] bottom-[20%] size-3 bg-white rounded-full z-10" />
                <div className="absolute left-[40%] bottom-[40%] size-3 bg-white rounded-full z-10" />
                <div className="absolute left-[60%] bottom-[60%] size-3 bg-white rounded-full z-10" />

                <div className={`absolute bottom-0 left-0 w-[150%] h-1 bg-cyan-400 origin-bottom-left transition-all duration-1000 ${animState >= 1 ? "-rotate-[60deg]" : "-rotate-45"}`} />

                {animState === 0 && (
                  <button onClick={runOutlier} className="px-6 py-2 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-lg z-20 absolute top-10 left-10 shadow-[0_0_15px_rgba(244,63,94,0.5)]">
                    Add Outlier
                  </button>
                )}

                {animState >= 1 && (
                  <div className="absolute left-[10%] bottom-[80%] size-5 bg-rose-500 rounded-full shadow-[0_0_20px_rgba(244,63,94,1)] animate-in zoom-in z-10 flex items-center justify-center text-[10px] font-black">!</div>
                )}

                {animState === 2 && (
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 bg-rose-950/80 px-4 py-2 rounded-xl border border-rose-500 text-white font-bold animate-in slide-in-from-bottom">
                    Line shifts drastically! Outliers break regression.
                  </div>
                )}
             </div>
          </div>
        )}
      </div>
    </div>
  );
}
