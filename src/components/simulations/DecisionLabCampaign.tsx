import { useState, useEffect } from "react";
import { 
  Network, HelpCircle, UserCheck, AlertTriangle, ShieldCheck, 
  ArrowRight, CheckCircle2, Star, Target, GitMerge
} from "lucide-react";

export function DecisionLabCampaign() {
  const [xp, setXp] = useState(0);
  const [successMsg, setSuccessMsg] = useState("");
  const [step, setStep] = useState(0); // 0: Start, 1: Questions, 2: Build Tree, 3: Leaves, 4: Depth Tuning, 5: Overfitting, 6: Challenge
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
  const runAskQuestions = async () => {
    setAnimState(1); // question moves to tree
    await new Promise(r => setTimeout(r, 1500));
    setAnimState(2); // tree branch appears
    addXp(50, "Root Node Created!");
    setTimeout(() => nextStep(), 3000);
  };

  // Stage 2
  const runBuildTree = async () => {
    setAnimState(1); // splitting
    await new Promise(r => setTimeout(r, 1500));
    setAnimState(2); // groups formed
    addXp(50, "Data Splitter!");
    setTimeout(() => nextStep(), 3000);
  };

  // Stage 3
  const runLeaves = async () => {
    setAnimState(1); // reveal predictions
    await new Promise(r => setTimeout(r, 1500));
    setAnimState(2);
    addXp(50, "Leaf Node Expert!");
    setTimeout(() => nextStep(), 3000);
  };

  // Stage 4
  const [depth, setDepth] = useState(1);
  const handleDepthChange = (d: number) => {
    setDepth(d);
    if (d === 10 && animState === 0) {
      setAnimState(1);
      addXp(50, "Depth Explorer!");
    }
  };

  // Stage 5
  const runOverfitDemo = async () => {
    setAnimState(1); // massive tree grows
    await new Promise(r => setTimeout(r, 2000));
    setAnimState(2); // accuracy drops
    addXp(50, "Overfitting Detected!");
    setTimeout(() => nextStep(), 4000);
  };

  // Stage 6 Challenge
  const [cAccuracy, setCAccuracy] = useState(0);
  const runChallenge = async () => {
    setCAccuracy(50);
    await new Promise(r => setTimeout(r, 500));
    setCAccuracy(75);
    await new Promise(r => setTimeout(r, 500));
    setCAccuracy(94);
    addXp(150, "Decision Tree Master!");
  };

  return (
    <div className="flex flex-col h-full bg-slate-950 text-foreground p-6 overflow-hidden relative font-sans">
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-800 shrink-0 z-20">
        <div>
          <h2 className="text-2xl font-black flex items-center gap-3 uppercase tracking-widest text-emerald-400 drop-shadow-[0_0_10px_rgba(52,211,153,0.3)]">
            <Network className="size-7" /> 
            Decision Lab
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
             <GitMerge className="size-24 text-emerald-500 mb-6 drop-shadow-[0_0_30px_rgba(16,185,129,0.5)] rotate-180" />
             <h1 className="text-4xl font-black text-white uppercase tracking-widest mb-4">Build an AI Decision Tree</h1>
             <p className="text-slate-400 max-w-xl text-lg mb-8">
               A bank wants to decide whether a loan should be approved. You must build the decision process using customer data.
             </p>
             <div className="bg-slate-900 p-6 rounded-xl border border-slate-700 mb-8 font-mono text-sm tracking-widest text-slate-300 w-full max-w-md">
                <div className="text-emerald-400 font-bold mb-2 uppercase">New Customer:</div>
                <div>Age = 35</div>
                <div>Income = High</div>
                <div>Credit Score = Good</div>
             </div>
             <button onClick={nextStep} className="px-8 py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-[0_0_20px_rgba(16,185,129,0.4)] flex items-center gap-2">
               Start Building Tree <ArrowRight className="size-5" />
             </button>
          </div>
        )}

        {step === 1 && (
          <div className="flex flex-col items-center justify-center h-full animate-in slide-in-from-right">
             <h3 className="text-2xl font-bold text-amber-400 uppercase tracking-widest mb-8 flex items-center gap-2"><HelpCircle className="size-6" /> Ask Questions</h3>
             
             <div className="flex gap-4 mb-12">
               <div className={`bg-slate-800 p-4 rounded border-2 border-slate-600 font-bold transition-all duration-500 ${animState >= 1 ? "opacity-0 translate-y-10" : ""}`}>Income &gt; 50K?</div>
               <div className="bg-slate-800 p-4 rounded border-2 border-slate-600 font-bold opacity-50">Age &gt; 30?</div>
               <div className="bg-slate-800 p-4 rounded border-2 border-slate-600 font-bold opacity-50">Credit Good?</div>
             </div>

             <div className="w-full max-w-lg h-48 bg-slate-900 border-2 border-slate-700 rounded-xl mb-8 relative flex flex-col items-center pt-8">
                {animState === 0 && (
                  <button onClick={runAskQuestions} className="px-6 py-2 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-lg absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
                    Drag Question
                  </button>
                )}

                {animState >= 1 && (
                  <div className="bg-amber-600 p-3 rounded-lg font-bold shadow-[0_0_15px_rgba(217,119,6,0.5)] z-10 animate-in slide-in-from-top fade-in duration-500">
                    Income &gt; 50K?
                  </div>
                )}
                {animState === 2 && (
                  <>
                    <div className="absolute top-20 left-1/2 -translate-x-1/2 w-48 h-16 flex justify-between">
                       <div className="w-1/2 h-full border-t-4 border-l-4 border-slate-600 rounded-tl-xl relative">
                         <div className="absolute top-2 -left-6 bg-slate-900 px-1 text-xs text-slate-400 font-bold">YES</div>
                       </div>
                       <div className="w-1/2 h-full border-t-4 border-r-4 border-slate-600 rounded-tr-xl relative">
                         <div className="absolute top-2 -right-4 bg-slate-900 px-1 text-xs text-slate-400 font-bold">NO</div>
                       </div>
                    </div>
                  </>
                )}
             </div>
             
             {animState === 2 && <p className="text-amber-400 font-bold animate-in fade-in bg-amber-950/40 px-4 py-2 rounded-lg">Decision Trees split data using questions.</p>}
          </div>
        )}

        {step === 2 && (
          <div className="flex flex-col items-center justify-center h-full animate-in slide-in-from-right">
             <h3 className="text-2xl font-bold text-fuchsia-400 uppercase tracking-widest mb-8 flex items-center gap-2"><GitMerge className="size-6 rotate-180" /> Build Tree</h3>
             
             <div className="w-full max-w-xl h-64 bg-slate-900 border-2 border-slate-700 rounded-xl mb-8 relative pt-4">
                <div className="flex justify-center mb-8">
                   <div className="bg-slate-800 p-2 rounded text-sm font-bold border border-slate-600">Income &gt; 50K?</div>
                </div>
                
                {/* Splitting Paths */}
                <div className="absolute top-12 left-1/2 w-64 h-8 -translate-x-1/2 flex justify-between">
                   <div className="w-1/2 h-full border-t-2 border-l-2 border-slate-600 rounded-tl-lg" />
                   <div className="w-1/2 h-full border-t-2 border-r-2 border-slate-600 rounded-tr-lg" />
                </div>

                <div className="flex justify-around absolute w-full top-20 px-8">
                   <div className="bg-slate-800 p-2 rounded text-sm font-bold border border-slate-600">Credit Score?</div>
                   <div className="bg-slate-800 p-2 rounded text-sm font-bold border border-slate-600">Age &gt; 30?</div>
                </div>

                {animState === 0 && (
                  <button onClick={runBuildTree} className="px-6 py-2 bg-fuchsia-600 hover:bg-fuchsia-700 text-white font-bold rounded-lg absolute bottom-4 left-1/2 -translate-x-1/2 z-20">
                    Split Data
                  </button>
                )}

                {/* Data Points */}
                <div className="absolute bottom-4 w-full flex justify-around">
                   <div className="flex gap-1 items-end">
                      <div className={`size-4 bg-emerald-500 rounded-full transition-all duration-1000 ${animState >= 1 ? "-translate-y-20 -translate-x-4" : ""}`} />
                      <div className={`size-4 bg-emerald-500 rounded-full transition-all duration-1000 delay-100 ${animState >= 1 ? "-translate-y-20 -translate-x-4" : ""}`} />
                      <div className={`size-4 bg-rose-500 rounded-full transition-all duration-1000 delay-200 ${animState >= 1 ? "-translate-y-20 translate-x-32" : ""}`} />
                   </div>
                   <div className="flex gap-1 items-end">
                      <div className={`size-4 bg-rose-500 rounded-full transition-all duration-1000 delay-300 ${animState >= 1 ? "-translate-y-20 translate-x-4" : ""}`} />
                      <div className={`size-4 bg-emerald-500 rounded-full transition-all duration-1000 delay-400 ${animState >= 1 ? "-translate-y-20 -translate-x-32" : ""}`} />
                   </div>
                </div>

             </div>

             {animState === 2 && <p className="text-fuchsia-400 font-bold animate-in fade-in bg-fuchsia-950/40 px-4 py-2 rounded-lg">Data becomes purer after each split.</p>}
          </div>
        )}

        {step === 3 && (
          <div className="flex flex-col items-center justify-center h-full animate-in slide-in-from-right">
             <h3 className="text-2xl font-bold text-indigo-400 uppercase tracking-widest mb-8 flex items-center gap-2"><UserCheck className="size-6" /> Leaf Nodes</h3>
             
             <div className="w-full max-w-xl h-64 bg-slate-900 border-2 border-slate-700 rounded-xl mb-8 relative pt-4 flex flex-col items-center justify-between pb-8">
                
                <div className="bg-slate-800 p-2 rounded text-sm font-bold border border-slate-600 mb-8">Income &gt; 50K?</div>
                
                <div className="flex w-full justify-around mb-8">
                   <div className="bg-slate-800 p-2 rounded text-sm font-bold border border-slate-600">Credit Score?</div>
                   <div className="bg-slate-800 p-2 rounded text-sm font-bold border border-slate-600">Age &gt; 30?</div>
                </div>

                {animState === 0 && (
                  <button onClick={runLeaves} className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-lg">
                    Reveal Predictions
                  </button>
                )}

                {animState >= 1 && (
                  <div className="flex w-full justify-around px-4 animate-in slide-in-from-bottom">
                     <div className="bg-emerald-600 px-4 py-2 rounded-lg font-black shadow-[0_0_15px_rgba(16,185,129,0.5)]">Approve</div>
                     <div className="bg-rose-600 px-4 py-2 rounded-lg font-black shadow-[0_0_15px_rgba(244,63,94,0.5)]">Reject</div>
                     <div className="bg-emerald-600 px-4 py-2 rounded-lg font-black shadow-[0_0_15px_rgba(16,185,129,0.5)]">Approve</div>
                     <div className="bg-rose-600 px-4 py-2 rounded-lg font-black shadow-[0_0_15px_rgba(244,63,94,0.5)]">Reject</div>
                  </div>
                )}
             </div>
             
             {animState >= 1 && <p className="text-indigo-400 font-bold animate-in fade-in bg-indigo-950/40 px-4 py-2 rounded-lg">Leaves contain the final predictions.</p>}
          </div>
        )}

        {step === 4 && (
          <div className="flex flex-col items-center justify-center h-full animate-in slide-in-from-right">
             <h3 className="text-2xl font-bold text-cyan-400 uppercase tracking-widest mb-8 flex items-center gap-2"><SlidersHorizontal className="size-6" /> Tree Depth Tuning</h3>
             <p className="text-slate-400 mb-6 text-center max-w-md">How deep should the tree grow? Set the Max Depth.</p>

             <div className="w-full max-w-md bg-slate-900 border-2 border-slate-700 rounded-xl mb-8 p-6 flex flex-col items-center">
                <div className="text-4xl font-black text-cyan-400 mb-6">Depth = {depth}</div>
                <input 
                  type="range" 
                  min="1" max="10" step="1" 
                  value={depth} 
                  onChange={(e) => handleDepthChange(parseInt(e.target.value))} 
                  className="w-full accent-cyan-500 cursor-pointer"
                />
                <div className="w-full flex justify-between mt-2 text-xs text-slate-500 font-bold">
                   <span>1</span><span>10</span>
                </div>
             </div>

             <div className="bg-slate-950 border border-slate-800 p-6 rounded-xl text-center mb-8 h-32 flex flex-col justify-center w-full max-w-md">
                {depth <= 3 && <div className="text-xl font-bold text-emerald-400">Simple & General</div>}
                {depth > 3 && depth <= 7 && <div className="text-xl font-bold text-amber-400">Complex</div>}
                {depth > 7 && <div className="text-xl font-bold text-rose-400 animate-pulse">Very Complex (Tangled)</div>}
             </div>

             {animState === 1 && (
               <button onClick={nextStep} className="px-6 py-2 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-lg animate-in fade-in">Proceed <ArrowRight className="size-4 inline" /></button>
             )}
          </div>
        )}

        {step === 5 && (
          <div className="flex flex-col items-center justify-center h-full animate-in slide-in-from-right">
             <h3 className="text-2xl font-bold text-rose-400 uppercase tracking-widest mb-8 flex items-center gap-2"><AlertTriangle className="size-6" /> Overfitting Demo</h3>
             
             {animState === 0 && (
               <button onClick={runOverfitDemo} className="px-8 py-4 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-xl shadow-[0_0_20px_rgba(244,63,94,0.4)] mb-8">
                 Train Extremely Deep Tree
               </button>
             )}

             {animState >= 1 && (
                <div className="w-full max-w-3xl flex gap-8 mb-8 animate-in zoom-in">
                   <div className="flex-1 bg-slate-900 border-2 border-slate-700 rounded-xl p-6 relative overflow-hidden flex flex-col items-center justify-center min-h-[200px]">
                      <Network className="absolute inset-0 size-full text-slate-800 opacity-30" />
                      <Network className="absolute top-4 left-4 size-32 text-slate-800 opacity-30 rotate-45" />
                      <Network className="absolute bottom-4 right-4 size-32 text-slate-800 opacity-30 -rotate-12" />
                      <div className="z-10 bg-slate-950 p-3 rounded border border-slate-700 text-center">
                         <div className="text-xs text-slate-400 uppercase font-bold mb-1">Tree Structure</div>
                         <div className="text-rose-500 font-black">Highly Tangled</div>
                      </div>
                   </div>

                   <div className="flex-1 flex flex-col gap-4">
                      <div className="bg-emerald-950/20 border border-emerald-500/30 rounded-xl p-4 text-center">
                         <div className="text-emerald-400 font-bold uppercase text-sm mb-1">Training Data Accuracy</div>
                         <div className="text-4xl font-black text-emerald-500">98%</div>
                      </div>
                      
                      {animState === 2 && (
                        <div className="bg-rose-950/20 border border-rose-500/30 rounded-xl p-4 text-center animate-in slide-in-from-right">
                           <div className="text-rose-400 font-bold uppercase text-sm mb-1">Test Data Accuracy</div>
                           <div className="text-4xl font-black text-rose-500">62%</div>
                           <div className="text-xs bg-rose-900/40 text-rose-200 mt-2 p-1 rounded font-bold">Overfitting Memorizes Noise!</div>
                        </div>
                      )}
                   </div>
                </div>
             )}

             {animState === 2 && (
               <button onClick={nextStep} className="px-8 py-3 bg-gradient-to-r from-emerald-600 to-cyan-600 hover:from-emerald-500 hover:to-cyan-500 text-white font-bold rounded-xl animate-in zoom-in shadow-[0_0_20px_rgba(16,185,129,0.4)]">
                 Enter Final Challenge <ArrowRight className="size-5 inline" />
               </button>
             )}
          </div>
        )}

        {step === 6 && (
          <div className="flex flex-col items-center justify-center h-full animate-in slide-in-from-right">
             <ShieldCheck className="size-16 text-emerald-400 mb-6 drop-shadow-[0_0_20px_rgba(52,211,153,0.4)]" />
             <h3 className="text-3xl font-black text-white uppercase tracking-widest mb-2">Final Challenge</h3>
             <p className="text-slate-400 mb-8 max-w-xl text-center">Build a loan approval tree by finding the perfect depth balance.</p>
             
             <div className="w-full max-w-md bg-slate-900 border-2 border-slate-700 rounded-xl p-8 text-center mb-8">
                <div className="text-6xl font-black text-emerald-400 mb-2 drop-shadow-[0_0_20px_rgba(52,211,153,0.3)]">{cAccuracy}%</div>
                <div className="text-slate-400 font-bold uppercase tracking-widest mb-8">Test Accuracy</div>

                {cAccuracy === 0 ? (
                  <button onClick={runChallenge} className="px-8 py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-[0_0_20px_rgba(16,185,129,0.4)] w-full">
                    Tune & Deploy Model
                  </button>
                ) : (
                  <div className="text-emerald-400 font-bold uppercase tracking-widest animate-in zoom-in bg-emerald-950/40 p-4 border border-emerald-500/50 rounded-xl">
                    <CheckCircle2 className="size-8 mx-auto mb-2" /> Optimal Tree Built!
                  </div>
                )}
             </div>
          </div>
        )}
      </div>
    </div>
  );
}
