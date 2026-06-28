import { useState, useEffect } from "react";
import { 
  BarChart, Calculator, Search, Activity, Target, ShieldCheck, 
  ArrowRight, CheckCircle2, Star, Zap, AlignCenter
} from "lucide-react";

export function DataDetectiveLabCampaign() {
  const [xp, setXp] = useState(0);
  const [successMsg, setSuccessMsg] = useState("");
  const [step, setStep] = useState(0); // 0: Start, 1: Mean, 2: Median, 3: Mode, 4: SD, 5: Challenge
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

  // State 1: Mean
  const runMeanAnim = async () => {
    setAnimState(1); // Show sum
    await new Promise(r => setTimeout(r, 1500));
    setAnimState(2); // Show division
    await new Promise(r => setTimeout(r, 1500));
    setAnimState(3); // Show balance
    addXp(50, "Mean Master!");
  };

  // State 2: Median
  const runMedianAnim = async () => {
    setAnimState(1); // Sorting (already sorted but animate pointer)
    await new Promise(r => setTimeout(r, 1500));
    setAnimState(2); // Center found
    addXp(50, "Center Finder!");
  };

  // State 3: Mode
  const runModeAnim = async () => {
    setAnimState(1); // Show frequency bars
    await new Promise(r => setTimeout(r, 2000));
    setAnimState(2); // Highlight highest
    addXp(50, "Pattern Detective!");
  };

  // State 4: SD
  const runSDAnim = async () => {
    setAnimState(1); // Show distances
    await new Promise(r => setTimeout(r, 2000));
    setAnimState(2); // Show spread comparison
    addXp(50, "Spread Specialist!");
  };

  // Stage 5: Challenge
  const [cMean, setCMean] = useState("");
  const [cMedian, setCMedian] = useState("");
  const [cRange, setCRange] = useState("");
  const [cResult, setCResult] = useState<boolean | null>(null);

  const checkChallenge = () => {
    if (cMean === "30" && cMedian === "30" && cRange === "40") {
      setCResult(true);
      addXp(100, "Data Analyst Certified!");
    } else {
      setCResult(false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-slate-950 text-foreground p-6 overflow-hidden relative font-sans">
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-800 shrink-0 z-20">
        <div>
          <h2 className="text-2xl font-black flex items-center gap-3 uppercase tracking-widest text-blue-400 drop-shadow-[0_0_10px_rgba(96,165,250,0.3)]">
            <BarChart className="size-7" /> 
            Data Detective Lab
          </h2>
        </div>
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2 bg-blue-950/50 px-4 py-1.5 rounded-full border border-blue-900 font-bold shadow-sm text-blue-100">
            <Star className="size-4 text-blue-400" /> {xp} XP
          </div>
        </div>
      </div>

      {successMsg && (
        <div className="absolute top-24 left-1/2 -translate-x-1/2 bg-blue-600 text-white px-6 py-3 rounded-lg shadow-xl animate-in slide-in-from-top-10 z-50 font-bold flex items-center gap-2">
          <Star className="size-5 fill-white" /> {successMsg}
        </div>
      )}

      <div className="flex-1 min-h-0 overflow-y-auto">
        {step === 0 && (
          <div className="h-full flex flex-col items-center justify-center text-center animate-in zoom-in duration-500">
             <Search className="size-24 text-blue-500 mb-6 drop-shadow-[0_0_30px_rgba(59,130,246,0.5)]" />
             <h1 className="text-4xl font-black text-white uppercase tracking-widest mb-4">Analyze Student Marks</h1>
             <p className="text-slate-400 max-w-xl text-lg mb-8">
               A school principal needs a quick summary of student performance. Your mission is to compute the Central Tendency and Dispersion metrics.
             </p>
             <div className="bg-slate-900 p-6 rounded-xl border border-slate-700 mb-8 font-mono text-2xl tracking-widest text-emerald-400">
                45, 50, 60, 65, 70, 80, 90
             </div>
             <button onClick={nextStep} className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-[0_0_20px_rgba(37,99,235,0.4)] flex items-center gap-2">
               Start Analysis <ArrowRight className="size-5" />
             </button>
          </div>
        )}

        {step === 1 && (
          <div className="flex flex-col items-center justify-center h-full animate-in slide-in-from-right">
             <h3 className="text-2xl font-bold text-amber-400 uppercase tracking-widest mb-8 flex items-center gap-2"><Calculator className="size-6" /> Find Mean</h3>
             
             <div className="flex gap-4 text-2xl font-mono text-slate-300 bg-slate-900 p-6 rounded-xl border border-slate-700 mb-8 relative">
                <span>45</span><span>50</span><span>60</span><span>65</span><span>70</span><span>80</span><span>90</span>
                {animState >= 1 && (
                  <div className="absolute inset-0 bg-amber-900/40 flex items-center justify-center rounded-xl font-bold text-amber-300 animate-in fade-in">
                    45 + 50 + 60 + 65 + 70 + 80 + 90 = 460
                  </div>
                )}
             </div>

             <div className="h-32 w-full max-w-md flex flex-col items-center justify-center mb-8">
                {animState === 0 && (
                  <button onClick={runMeanAnim} className="px-6 py-3 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-xl shadow-[0_0_15px_rgba(217,119,6,0.4)]">
                    Calculate Mean
                  </button>
                )}
                {animState === 2 && (
                  <div className="text-3xl font-black text-amber-400 animate-in zoom-in">
                    460 ÷ 7 = <span className="text-white bg-amber-600 px-3 py-1 rounded">65.71</span>
                  </div>
                )}
                {animState === 3 && (
                  <div className="w-full flex flex-col items-center animate-in slide-in-from-bottom">
                     <div className="w-full h-2 bg-slate-700 rounded-full relative">
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-4 bg-amber-400 rotate-45" />
                     </div>
                     <div className="mt-4 text-amber-300 font-bold uppercase tracking-widest text-sm bg-amber-950/50 px-4 py-2 rounded-lg border border-amber-500/30">Mean = Average value (Balance Point)</div>
                  </div>
                )}
             </div>

             {animState === 3 && (
               <button onClick={nextStep} className="px-6 py-2 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-lg animate-in fade-in">Next Metric <ArrowRight className="size-4 inline" /></button>
             )}
          </div>
        )}

        {step === 2 && (
          <div className="flex flex-col items-center justify-center h-full animate-in slide-in-from-right">
             <h3 className="text-2xl font-bold text-emerald-400 uppercase tracking-widest mb-8 flex items-center gap-2"><AlignCenter className="size-6" /> Find Median</h3>
             
             <div className="flex gap-4 text-2xl font-mono p-6 rounded-xl border border-slate-700 mb-8 relative bg-slate-900">
                <span className={animState===2 ? "text-slate-600" : "text-slate-300"}>45</span>
                <span className={animState===2 ? "text-slate-600" : "text-slate-300"}>50</span>
                <span className={animState===2 ? "text-slate-600" : "text-slate-300"}>60</span>
                <span className={`transition-all duration-500 ${animState===2 ? "text-emerald-400 scale-125 font-black bg-emerald-950/50 px-2 rounded" : "text-slate-300"}`}>65</span>
                <span className={animState===2 ? "text-slate-600" : "text-slate-300"}>70</span>
                <span className={animState===2 ? "text-slate-600" : "text-slate-300"}>80</span>
                <span className={animState===2 ? "text-slate-600" : "text-slate-300"}>90</span>
                
                {animState >= 1 && (
                  <div className="absolute -bottom-8 left-[175px] text-emerald-500 animate-bounce transition-all duration-1000">
                     ↑
                  </div>
                )}
             </div>

             <div className="h-24 flex flex-col items-center justify-center mb-8">
                {animState === 0 && (
                  <button onClick={runMedianAnim} className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-[0_0_15px_rgba(16,185,129,0.4)]">
                    Find Center
                  </button>
                )}
                {animState === 2 && (
                  <div className="text-emerald-300 font-bold uppercase tracking-widest text-sm bg-emerald-950/50 px-4 py-2 rounded-lg border border-emerald-500/30 animate-in fade-in">
                    Median = The middle value of a sorted dataset.
                  </div>
                )}
             </div>

             {animState === 2 && (
               <button onClick={nextStep} className="px-6 py-2 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-lg animate-in fade-in">Next Metric <ArrowRight className="size-4 inline" /></button>
             )}
          </div>
        )}

        {step === 3 && (
          <div className="flex flex-col items-center justify-center h-full animate-in slide-in-from-right">
             <h3 className="text-2xl font-bold text-fuchsia-400 uppercase tracking-widest mb-8 flex items-center gap-2"><Activity className="size-6" /> Find Mode</h3>
             <p className="text-slate-400 mb-4">Dataset has changed slightly:</p>
             <div className="flex gap-4 text-2xl font-mono text-slate-300 bg-slate-900 p-6 rounded-xl border border-slate-700 mb-8">
                <span>45</span><span>50</span>
                <span className={animState===2?"text-fuchsia-400 font-black":""}>60</span>
                <span className={animState===2?"text-fuchsia-400 font-black":""}>60</span>
                <span>65</span><span>70</span><span>90</span>
             </div>

             <div className="h-48 w-full max-w-md flex flex-col items-center justify-center mb-8 border border-slate-800 rounded-xl bg-slate-950/50 p-4">
                {animState === 0 && (
                  <button onClick={runModeAnim} className="px-6 py-3 bg-fuchsia-600 hover:bg-fuchsia-700 text-white font-bold rounded-xl shadow-[0_0_15px_rgba(217,70,239,0.4)]">
                    Analyze Frequencies
                  </button>
                )}
                {animState >= 1 && (
                  <div className="w-full flex flex-col gap-2 animate-in zoom-in">
                     <div className="flex items-center gap-4"><span className="w-8 font-mono text-sm text-slate-500">45</span> <div className="h-4 bg-slate-700 w-[10%]" /></div>
                     <div className="flex items-center gap-4"><span className="w-8 font-mono text-sm text-slate-500">50</span> <div className="h-4 bg-slate-700 w-[10%]" /></div>
                     <div className="flex items-center gap-4"><span className="w-8 font-mono text-fuchsia-400 font-bold">60</span> <div className="h-4 bg-fuchsia-500 w-[20%] shadow-[0_0_10px_rgba(217,70,239,0.5)] animate-pulse" /></div>
                     <div className="flex items-center gap-4"><span className="w-8 font-mono text-sm text-slate-500">65</span> <div className="h-4 bg-slate-700 w-[10%]" /></div>
                     <div className="flex items-center gap-4"><span className="w-8 font-mono text-sm text-slate-500">70</span> <div className="h-4 bg-slate-700 w-[10%]" /></div>
                     <div className="flex items-center gap-4"><span className="w-8 font-mono text-sm text-slate-500">90</span> <div className="h-4 bg-slate-700 w-[10%]" /></div>
                  </div>
                )}
             </div>
             
             {animState === 2 && (
               <div className="flex flex-col items-center gap-4 animate-in fade-in">
                 <div className="text-fuchsia-300 font-bold uppercase tracking-widest text-sm bg-fuchsia-950/50 px-4 py-2 rounded-lg border border-fuchsia-500/30">
                    Mode = The most frequent value.
                 </div>
                 <button onClick={nextStep} className="px-6 py-2 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-lg">Next Metric <ArrowRight className="size-4 inline" /></button>
               </div>
             )}
          </div>
        )}

        {step === 4 && (
          <div className="flex flex-col items-center justify-center h-full animate-in slide-in-from-right">
             <h3 className="text-2xl font-bold text-cyan-400 uppercase tracking-widest mb-8 flex items-center gap-2"><Target className="size-6" /> Variance & Standard Deviation</h3>
             
             {animState === 0 && (
                <button onClick={runSDAnim} className="px-6 py-3 bg-cyan-600 hover:bg-cyan-700 text-white font-bold rounded-xl shadow-[0_0_15px_rgba(6,182,212,0.4)] mb-8">
                  Analyze Spread
                </button>
             )}

             {animState >= 1 && (
                <div className="w-full max-w-2xl flex flex-col gap-8 animate-in zoom-in mb-8">
                   <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 relative">
                      <div className="absolute top-0 left-1/2 -translate-x-1/2 h-full w-px bg-amber-500/50 dashed" />
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-slate-950 text-amber-500 px-2 text-xs font-bold border border-amber-500/30 rounded">Mean = 65.71</div>
                      
                      <div className="flex flex-col gap-3 mt-4">
                         <div className="flex items-center"><span className="w-8 text-slate-500">45</span> <div className="h-1 bg-cyan-500/50 w-[20%] ml-auto" /> <div className="w-[50%]" /></div>
                         <div className="flex items-center"><span className="w-8 text-slate-500">90</span> <div className="w-[50%]" /> <div className="h-1 bg-cyan-500/50 w-[25%]" /></div>
                      </div>
                      <p className="text-center text-xs text-cyan-400 mt-4 uppercase tracking-widest">Distance from Mean</p>
                   </div>
                </div>
             )}

             {animState === 2 && (
                <div className="w-full max-w-2xl grid grid-cols-2 gap-6 animate-in fade-in mb-8">
                   <div className="bg-emerald-950/20 border border-emerald-500/30 rounded-xl p-4 text-center">
                      <div className="text-emerald-400 font-bold mb-2 uppercase text-sm">Low Spread (Consistent)</div>
                      <div className="font-mono text-slate-400">60, 62, 64, 66, 68</div>
                      <div className="mt-2 text-xs bg-emerald-900/40 text-emerald-300 py-1 rounded">Low Std. Dev</div>
                   </div>
                   <div className="bg-rose-950/20 border border-rose-500/30 rounded-xl p-4 text-center">
                      <div className="text-rose-400 font-bold mb-2 uppercase text-sm">High Spread (Inconsistent)</div>
                      <div className="font-mono text-slate-400">20, 40, 60, 80, 100</div>
                      <div className="mt-2 text-xs bg-rose-900/40 text-rose-300 py-1 rounded">High Std. Dev</div>
                   </div>
                </div>
             )}

             {animState === 2 && (
               <button onClick={nextStep} className="px-8 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white font-bold rounded-xl animate-in zoom-in shadow-[0_0_20px_rgba(6,182,212,0.4)]">
                 Enter Final Challenge <ArrowRight className="size-5 inline" />
               </button>
             )}
          </div>
        )}

        {step === 5 && (
          <div className="flex flex-col items-center justify-center h-full animate-in slide-in-from-right">
             <ShieldCheck className="size-16 text-emerald-400 mb-6 drop-shadow-[0_0_20px_rgba(52,211,153,0.4)]" />
             <h3 className="text-3xl font-black text-white uppercase tracking-widest mb-2">Final Challenge</h3>
             <p className="text-slate-400 mb-8">Calculate the metrics for the new dataset.</p>
             
             <div className="bg-slate-900 p-6 rounded-xl border-2 border-indigo-500/30 mb-8 font-mono text-3xl tracking-widest text-indigo-400 shadow-[0_0_30px_rgba(99,102,241,0.2)]">
                10, 20, 30, 40, 50
             </div>

             <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 w-full max-w-3xl">
                <div className="bg-slate-950 border border-slate-700 p-4 rounded-xl flex flex-col gap-2">
                   <label className="text-xs font-bold text-slate-400 uppercase">Mean</label>
                   <input type="text" value={cMean} onChange={e=>setCMean(e.target.value)} className="bg-slate-900 border border-slate-600 rounded p-2 text-white font-mono text-center focus:border-indigo-500 outline-none" placeholder="?" disabled={cResult === true} />
                </div>
                <div className="bg-slate-950 border border-slate-700 p-4 rounded-xl flex flex-col gap-2">
                   <label className="text-xs font-bold text-slate-400 uppercase">Median</label>
                   <input type="text" value={cMedian} onChange={e=>setCMedian(e.target.value)} className="bg-slate-900 border border-slate-600 rounded p-2 text-white font-mono text-center focus:border-indigo-500 outline-none" placeholder="?" disabled={cResult === true} />
                </div>
                <div className="bg-slate-950 border border-slate-700 p-4 rounded-xl flex flex-col gap-2">
                   <label className="text-xs font-bold text-slate-400 uppercase">Range (Max - Min)</label>
                   <input type="text" value={cRange} onChange={e=>setCRange(e.target.value)} className="bg-slate-900 border border-slate-600 rounded p-2 text-white font-mono text-center focus:border-indigo-500 outline-none" placeholder="?" disabled={cResult === true} />
                </div>
             </div>

             {cResult === null || cResult === false ? (
               <div className="flex flex-col items-center gap-4">
                 <button onClick={checkChallenge} className="px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-[0_0_20px_rgba(79,70,229,0.4)]">
                   Submit Analysis
                 </button>
                 {cResult === false && <span className="text-rose-400 font-bold animate-in shake">Incorrect calculations. Try again! (Hint: Center value is key)</span>}
               </div>
             ) : (
               <div className="bg-emerald-950/40 border-2 border-emerald-500 p-6 rounded-xl text-center animate-in zoom-in">
                  <h4 className="text-2xl font-black text-emerald-400 uppercase tracking-widest mb-2 flex items-center gap-2 justify-center"><CheckCircle2 /> Mission Accomplished</h4>
                  <p className="text-emerald-200">You have successfully mastered Central Tendency and Dispersion!</p>
               </div>
             )}
          </div>
        )}
      </div>
    </div>
  );
}
