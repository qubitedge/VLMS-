import { useState, useEffect } from "react";
import { 
  Home, TrendingUp, HelpCircle, AlertTriangle, ShieldCheck, 
  ArrowRight, CheckCircle2, Star, Target, SplitSquareHorizontal
} from "lucide-react";

export function PredictionLabCampaign() {
  const [xp, setXp] = useState(0);
  const [successMsg, setSuccessMsg] = useState("");
  const [step, setStep] = useState(0); // 0: Start, 1: Understanding, 2: Build Tree, 3: Leaf Value, 4: Compare, 5: Challenge
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
  const runUnderstanding = async () => {
    setAnimState(1); 
    await new Promise(r => setTimeout(r, 2000));
    setAnimState(2); 
    addXp(50, "Regression Concept!");
    setTimeout(() => nextStep(), 3000);
  };

  // Stage 2
  const runBuildTree = async () => {
    setAnimState(1); 
    await new Promise(r => setTimeout(r, 1500));
    setAnimState(2); 
    addXp(50, "Data Splitter!");
    setTimeout(() => nextStep(), 3000);
  };

  // Stage 3
  const runLeafPrediction = async () => {
    setAnimState(1); 
    await new Promise(r => setTimeout(r, 1000));
    setAnimState(2);
    await new Promise(r => setTimeout(r, 1000));
    setAnimState(3);
    addXp(50, "Prediction Engine!");
    setTimeout(() => nextStep(), 3000);
  };

  // Stage 4
  const runCompare = async () => {
    setAnimState(1); 
    await new Promise(r => setTimeout(r, 2000));
    setAnimState(2); 
    addXp(50, "Error Analyst!");
    setTimeout(() => nextStep(), 4000);
  };

  // Stage 5
  const [depth, setDepth] = useState(1);
  const handleDepthChange = (d: number) => {
    setDepth(d);
    if (d === 5 && animState === 0) {
      setAnimState(1);
      addXp(150, "Optimal Tuner!");
    }
  };

  return (
    <div className="flex flex-col h-full bg-slate-950 text-foreground p-6 overflow-hidden relative font-sans">
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-800 shrink-0 z-20">
        <div>
          <h2 className="text-2xl font-black flex items-center gap-3 uppercase tracking-widest text-indigo-400 drop-shadow-[0_0_10px_rgba(99,102,241,0.3)]">
            <TrendingUp className="size-7" /> 
            Prediction Lab
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
             <Home className="size-24 text-indigo-500 mb-6 drop-shadow-[0_0_30px_rgba(99,102,241,0.5)]" />
             <h1 className="text-4xl font-black text-white uppercase tracking-widest mb-4">Predict House Prices</h1>
             <p className="text-slate-400 max-w-xl text-lg mb-8">
               A real estate company needs to predict continuous house values based on size, bedrooms, and location score.
             </p>
             <div className="bg-slate-900 p-6 rounded-xl border border-slate-700 mb-8 font-mono text-sm tracking-widest text-slate-300 w-full max-w-md">
                <div className="text-indigo-400 font-bold mb-2 uppercase">New Property:</div>
                <div className="flex justify-between border-b border-slate-800 py-2"><span>Size</span> <span className="font-bold text-white">1500 sq ft</span></div>
                <div className="flex justify-between border-b border-slate-800 py-2"><span>Bedrooms</span> <span className="font-bold text-white">3</span></div>
                <div className="flex justify-between border-b border-slate-800 py-2"><span>Location Score</span> <span className="font-bold text-white">8/10</span></div>
                <div className="flex justify-between py-2 text-xl"><span>Price</span> <span className="font-black text-amber-400 animate-pulse">?</span></div>
             </div>
             <button onClick={nextStep} className="px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-[0_0_20px_rgba(79,70,229,0.4)] flex items-center gap-2">
               Start Regression Analysis <ArrowRight className="size-5" />
             </button>
          </div>
        )}

        {step === 1 && (
          <div className="flex flex-col items-center justify-center h-full animate-in slide-in-from-right">
             <h3 className="text-2xl font-bold text-amber-400 uppercase tracking-widest mb-8 flex items-center gap-2"><HelpCircle className="size-6" /> Classification vs Regression</h3>
             
             {animState === 0 && (
               <button onClick={runUnderstanding} className="px-8 py-4 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-xl shadow-[0_0_20px_rgba(217,119,6,0.4)] mb-8">
                 Analyze Outputs
               </button>
             )}

             <div className="w-full max-w-2xl grid grid-cols-2 gap-8 mb-8">
                {animState >= 1 && (
                  <div className="bg-slate-900 border-2 border-slate-700 rounded-xl p-6 text-center animate-in zoom-in">
                     <div className="text-slate-500 font-bold uppercase tracking-widest mb-4">Classification</div>
                     <div className="flex gap-4 justify-center">
                        <div className="bg-emerald-950 text-emerald-400 px-4 py-2 rounded-lg font-bold">Approve</div>
                        <div className="bg-rose-950 text-rose-400 px-4 py-2 rounded-lg font-bold">Reject</div>
                     </div>
                     <div className="mt-4 text-xs font-bold text-slate-400">Categories (Discrete)</div>
                  </div>
                )}
                {animState === 2 && (
                  <div className="bg-indigo-950/30 border-2 border-indigo-500/50 rounded-xl p-6 text-center animate-in slide-in-from-right">
                     <div className="text-indigo-400 font-bold uppercase tracking-widest mb-4">Regression</div>
                     <div className="flex flex-col gap-2 font-mono text-xl text-white">
                        <div>₹25 Lakhs</div>
                        <div className="text-indigo-300">₹40 Lakhs</div>
                        <div className="text-indigo-500">₹75 Lakhs</div>
                     </div>
                     <div className="mt-4 text-xs font-bold text-indigo-300">Numbers (Continuous)</div>
                  </div>
                )}
             </div>
          </div>
        )}

        {step === 2 && (
          <div className="flex flex-col items-center justify-center h-full animate-in slide-in-from-right">
             <h3 className="text-2xl font-bold text-fuchsia-400 uppercase tracking-widest mb-8 flex items-center gap-2"><SplitSquareHorizontal className="size-6" /> Build Prediction Tree</h3>
             
             <div className="w-full max-w-xl h-64 bg-slate-900 border-2 border-slate-700 rounded-xl mb-8 relative pt-4 flex flex-col items-center overflow-hidden">
                <div className="bg-slate-800 p-2 rounded text-sm font-bold border border-slate-600 mb-8 z-10">Size &gt; 1200 sq ft?</div>
                
                <div className="absolute w-full top-12 flex justify-center">
                   <div className="w-1/2 h-8 border-t-2 border-l-2 border-slate-600 rounded-tl-lg" />
                   <div className="w-1/2 h-8 border-t-2 border-r-2 border-slate-600 rounded-tr-lg" />
                </div>

                <div className="flex w-full justify-around mt-4 z-10">
                   <div className="bg-slate-800 p-2 rounded text-sm font-bold border border-slate-600 opacity-50">Location &gt; 7?</div>
                   <div className="bg-slate-800 p-2 rounded text-sm font-bold border border-slate-600 opacity-50">Bedrooms &gt; 2?</div>
                </div>

                {animState === 0 && (
                  <button onClick={runBuildTree} className="px-6 py-2 bg-fuchsia-600 hover:bg-fuchsia-700 text-white font-bold rounded-lg absolute bottom-8 left-1/2 -translate-x-1/2 z-20">
                    Split Houses
                  </button>
                )}

                <div className="absolute bottom-4 w-full flex justify-center gap-2">
                   <Home className={`size-6 text-slate-400 transition-all duration-1000 ${animState >= 1 ? "-translate-y-20 -translate-x-32" : ""}`} />
                   <Home className={`size-6 text-slate-400 transition-all duration-1000 delay-100 ${animState >= 1 ? "-translate-y-20 translate-x-32" : ""}`} />
                   <Home className={`size-6 text-slate-400 transition-all duration-1000 delay-200 ${animState >= 1 ? "-translate-y-20 -translate-x-24" : ""}`} />
                </div>
             </div>

             {animState === 2 && <p className="text-fuchsia-400 font-bold animate-in fade-in bg-fuchsia-950/40 px-4 py-2 rounded-lg">Houses are grouped by similarity.</p>}
          </div>
        )}

        {step === 3 && (
          <div className="flex flex-col items-center justify-center h-full animate-in slide-in-from-right">
             <h3 className="text-2xl font-bold text-emerald-400 uppercase tracking-widest mb-8 flex items-center gap-2"><Target className="size-6" /> Leaf Value Prediction</h3>
             
             <div className="w-full max-w-md bg-slate-900 border-2 border-slate-700 rounded-xl mb-8 p-6 flex flex-col items-center relative">
                
                <div className="bg-slate-800 p-2 rounded text-sm font-bold border border-slate-600 mb-8">Root Node</div>
                <div className="h-12 w-px bg-slate-600" />
                <div className="bg-slate-800 p-2 rounded text-sm font-bold border border-slate-600 my-8">Branch Node</div>
                <div className="h-12 w-px bg-slate-600" />
                <div className={`bg-emerald-950 p-4 rounded-xl border-2 border-emerald-500/50 mt-8 text-center transition-all duration-500 ${animState === 3 ? "scale-110 shadow-[0_0_20px_rgba(16,185,129,0.5)]" : ""}`}>
                   <div className="text-xs text-emerald-400 uppercase font-bold mb-1">Average Price</div>
                   <div className="text-2xl font-black text-white">₹42 Lakhs</div>
                </div>

                {/* Traveling dot */}
                {animState >= 1 && (
                  <div className={`absolute left-1/2 -translate-x-1/2 size-4 bg-amber-400 rounded-full shadow-[0_0_10px_rgba(251,191,36,0.8)] transition-all duration-1000 ${animState === 1 ? "top-10" : animState === 2 ? "top-32" : "top-64 opacity-0"}`} />
                )}
             </div>

             {animState === 0 && (
               <button onClick={runLeafPrediction} className="px-6 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-lg">
                 Pass New House
               </button>
             )}
             
             {animState === 3 && <p className="text-emerald-400 font-bold animate-in fade-in bg-emerald-950/40 px-4 py-2 rounded-lg">Leaves contain prediction values (Average of group).</p>}
          </div>
        )}

        {step === 4 && (
          <div className="flex flex-col items-center justify-center h-full animate-in slide-in-from-right">
             <h3 className="text-2xl font-bold text-rose-400 uppercase tracking-widest mb-8 flex items-center gap-2"><AlertTriangle className="size-6" /> Compare Predictions</h3>
             
             {animState === 0 && (
               <button onClick={runCompare} className="px-8 py-4 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-xl shadow-[0_0_20px_rgba(244,63,94,0.4)] mb-8">
                 Calculate Error
               </button>
             )}

             {animState >= 1 && (
                <div className="w-full max-w-xl flex flex-col gap-6 animate-in zoom-in mb-8">
                   <div className="flex justify-between items-center bg-slate-900 p-4 rounded-xl border border-slate-700">
                      <span className="text-slate-400 font-bold uppercase">Actual Price</span>
                      <span className="text-2xl font-mono text-emerald-400">₹45 Lakhs</span>
                   </div>
                   <div className="flex justify-between items-center bg-slate-900 p-4 rounded-xl border border-slate-700">
                      <span className="text-slate-400 font-bold uppercase">Predicted Price</span>
                      <span className="text-2xl font-mono text-blue-400">₹42 Lakhs</span>
                   </div>
                   {animState === 2 && (
                     <div className="flex justify-between items-center bg-rose-950/40 p-6 rounded-xl border-2 border-rose-500/50 animate-in slide-in-from-bottom shadow-[0_0_20px_rgba(244,63,94,0.3)]">
                        <span className="text-rose-400 font-black uppercase tracking-widest text-xl">Prediction Error</span>
                        <span className="text-4xl font-black text-rose-500">3 Lakhs</span>
                     </div>
                   )}
                </div>
             )}

             {animState === 2 && (
               <button onClick={nextStep} className="px-8 py-3 bg-gradient-to-r from-indigo-600 to-cyan-600 hover:from-indigo-500 hover:to-cyan-500 text-white font-bold rounded-xl animate-in zoom-in shadow-[0_0_20px_rgba(99,102,241,0.4)]">
                 Enter Final Challenge <ArrowRight className="size-5 inline" />
               </button>
             )}
          </div>
        )}

        {step === 5 && (
          <div className="flex flex-col items-center justify-center h-full animate-in slide-in-from-right">
             <ShieldCheck className="size-16 text-emerald-400 mb-6 drop-shadow-[0_0_20px_rgba(52,211,153,0.4)]" />
             <h3 className="text-3xl font-black text-white uppercase tracking-widest mb-2">Final Challenge</h3>
             <p className="text-slate-400 mb-8 max-w-xl text-center">Tune the Tree Depth to achieve the lowest prediction error without overfitting.</p>
             
             <div className="w-full max-w-md bg-slate-900 border-2 border-slate-700 rounded-xl mb-8 p-6 flex flex-col items-center">
                <div className="text-2xl font-black text-cyan-400 mb-6">Depth = {depth}</div>
                <input 
                  type="range" 
                  min="1" max="10" step="1" 
                  value={depth} 
                  onChange={(e) => handleDepthChange(parseInt(e.target.value))} 
                  className="w-full accent-cyan-500 cursor-pointer"
                />
             </div>

             <div className="grid grid-cols-2 gap-6 w-full max-w-xl mb-8">
                <div className="bg-slate-950 border border-slate-800 p-4 rounded-xl text-center">
                   <div className="text-xs font-bold text-slate-500 uppercase mb-2">Training Error</div>
                   <div className="text-2xl font-mono text-white">{Math.max(0, 15 - depth * 1.5).toFixed(1)} Lakhs</div>
                </div>
                <div className={`border p-4 rounded-xl text-center transition-all duration-500 ${depth === 5 ? "bg-emerald-950/40 border-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.3)]" : "bg-slate-950 border-slate-800"}`}>
                   <div className={`text-xs font-bold uppercase mb-2 ${depth === 5 ? "text-emerald-400" : "text-slate-500"}`}>Test Error</div>
                   <div className={`text-3xl font-black ${depth === 5 ? "text-emerald-400" : depth > 7 ? "text-rose-500" : "text-white"}`}>
                     {depth < 5 ? (20 - depth * 2).toFixed(1) : depth === 5 ? "8.5" : (8.5 + (depth - 5) * 2).toFixed(1)} Lakhs
                   </div>
                </div>
             </div>

             {animState === 1 && (
               <div className="text-emerald-400 font-bold uppercase tracking-widest animate-in zoom-in bg-emerald-950/40 p-4 border border-emerald-500/50 rounded-xl">
                 <CheckCircle2 className="size-8 mx-auto mb-2" /> Optimal Depth Reached!
               </div>
             )}
          </div>
        )}
      </div>
    </div>
  );
}
