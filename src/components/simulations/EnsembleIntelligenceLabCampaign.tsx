import { useState, useEffect } from "react";
import { 
  Trees, AlertCircle, Shuffle, GitMerge, Settings2, ShieldCheck, 
  ArrowRight, CheckCircle2, Star, Target, Users
} from "lucide-react";

export function EnsembleIntelligenceLabCampaign() {
  const [xp, setXp] = useState(0);
  const [successMsg, setSuccessMsg] = useState("");
  const [step, setStep] = useState(0); // 0: Start, 1: Problem, 2: Create Forest, 3: Voting, 4: Features, 5: Accuracy, 6: Challenge
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
  const runProblem = async () => {
    setAnimState(1); 
    await new Promise(r => setTimeout(r, 1500));
    setAnimState(2); 
    addXp(50, "Flaw Detector!");
    setTimeout(() => nextStep(), 4000);
  };

  // Stage 2
  const runCreateForest = async () => {
    setAnimState(1); 
    await new Promise(r => setTimeout(r, 2000));
    setAnimState(2); 
    addXp(50, "Forest Builder!");
    setTimeout(() => nextStep(), 3000);
  };

  // Stage 3
  const runVoting = async () => {
    setAnimState(1); 
    await new Promise(r => setTimeout(r, 2000));
    setAnimState(2); 
    addXp(50, "Democracy AI!");
    setTimeout(() => nextStep(), 4000);
  };

  // Stage 4
  const runFeatures = async () => {
    setAnimState(1); 
    await new Promise(r => setTimeout(r, 2000));
    setAnimState(2); 
    addXp(50, "Randomizer!");
    setTimeout(() => nextStep(), 4000);
  };

  // Stage 5
  const runCompare = async () => {
    setAnimState(1); 
    await new Promise(r => setTimeout(r, 2000));
    setAnimState(2); 
    addXp(50, "Performance Analyst!");
    setTimeout(() => nextStep(), 4000);
  };

  // Stage 6 Challenge
  const [treeCount, setTreeCount] = useState(3);
  const handleTreeChange = (c: number) => {
    setTreeCount(c);
    if (c >= 100 && animState === 0) {
      setAnimState(1);
      addXp(150, "Ensemble Master!");
    }
  };

  return (
    <div className="flex flex-col h-full bg-slate-950 text-foreground p-6 overflow-hidden relative font-sans">
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-800 shrink-0 z-20">
        <div>
          <h2 className="text-2xl font-black flex items-center gap-3 uppercase tracking-widest text-emerald-400 drop-shadow-[0_0_10px_rgba(52,211,153,0.3)]">
            <Trees className="size-7" /> 
            Ensemble Intelligence Lab
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
             <Trees className="size-24 text-emerald-500 mb-6 drop-shadow-[0_0_30px_rgba(16,185,129,0.5)]" />
             <h1 className="text-4xl font-black text-white uppercase tracking-widest mb-4">Build an AI Forest</h1>
             <p className="text-slate-400 max-w-xl text-lg mb-8">
               A single decision tree makes mistakes. The AI Research Center wants a more reliable prediction system using Random Forest.
             </p>
             <div className="bg-slate-900 p-8 rounded-xl border border-slate-700 mb-8 flex flex-col items-center">
                <GitMerge className="size-16 text-slate-500 rotate-180 mb-4" />
                <div className="text-emerald-400 font-bold uppercase tracking-widest mb-2">Single Tree</div>
                <div className="bg-emerald-950 text-emerald-400 px-4 py-2 rounded-lg font-bold border border-emerald-500/30">Prediction: Approved (60% Confidence)</div>
             </div>
             <button onClick={nextStep} className="px-8 py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-[0_0_20px_rgba(16,185,129,0.4)] flex items-center gap-2">
               Discover the Flaw <ArrowRight className="size-5" />
             </button>
          </div>
        )}

        {step === 1 && (
          <div className="flex flex-col items-center justify-center h-full animate-in slide-in-from-right">
             <h3 className="text-2xl font-bold text-rose-400 uppercase tracking-widest mb-8 flex items-center gap-2"><AlertCircle className="size-6" /> Problem with Single Tree</h3>
             
             {animState === 0 && (
               <button onClick={runProblem} className="px-8 py-4 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-xl shadow-[0_0_20px_rgba(244,63,94,0.4)] mb-8">
                 Test New Customer
               </button>
             )}

             {animState >= 1 && (
                <div className="w-full max-w-xl flex flex-col gap-6 animate-in zoom-in mb-8">
                   <div className="flex justify-between items-center bg-slate-900 p-4 rounded-xl border border-slate-700">
                      <span className="text-slate-400 font-bold uppercase">Tree Predicts</span>
                      <span className="text-2xl font-black text-emerald-400">Approved</span>
                   </div>
                   {animState === 2 && (
                     <div className="flex justify-between items-center bg-rose-950/40 p-6 rounded-xl border-2 border-rose-500/50 animate-in slide-in-from-bottom shadow-[0_0_20px_rgba(244,63,94,0.3)]">
                        <span className="text-rose-400 font-black uppercase tracking-widest text-xl">Actual Result</span>
                        <span className="text-4xl font-black text-rose-500">Rejected</span>
                     </div>
                   )}
                </div>
             )}
             
             {animState === 2 && <p className="text-rose-400 font-bold animate-in fade-in">A single tree can be biased or overfit to noise.</p>}
          </div>
        )}

        {step === 2 && (
          <div className="flex flex-col items-center justify-center h-full animate-in slide-in-from-right">
             <h3 className="text-2xl font-bold text-emerald-400 uppercase tracking-widest mb-8 flex items-center gap-2"><Trees className="size-6" /> Create a Forest</h3>
             
             <div className="w-full max-w-2xl h-64 bg-slate-900 border-2 border-slate-700 rounded-xl mb-8 flex items-center justify-center">
                {animState === 0 && (
                  <button onClick={runCreateForest} className="px-8 py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-[0_0_20px_rgba(16,185,129,0.4)]">
                    Plant Forest
                  </button>
                )}

                {animState >= 1 && (
                  <div className="flex gap-8 px-8 w-full justify-between items-center">
                     <div className="flex flex-col items-center animate-in zoom-in"><GitMerge className="size-12 text-emerald-500 rotate-180" /><span className="text-xs font-bold text-slate-500 mt-2">Tree 1</span></div>
                     <div className="flex flex-col items-center animate-in zoom-in delay-100"><GitMerge className="size-12 text-emerald-500 rotate-180" /><span className="text-xs font-bold text-slate-500 mt-2">Tree 2</span></div>
                     <div className="flex flex-col items-center animate-in zoom-in delay-200"><GitMerge className="size-16 text-emerald-400 rotate-180 drop-shadow-[0_0_15px_rgba(52,211,153,0.5)]" /><span className="text-sm font-bold text-emerald-400 mt-2">Tree 3</span></div>
                     <div className="flex flex-col items-center animate-in zoom-in delay-300"><GitMerge className="size-12 text-emerald-500 rotate-180" /><span className="text-xs font-bold text-slate-500 mt-2">Tree 4</span></div>
                     <div className="flex flex-col items-center animate-in zoom-in delay-500"><GitMerge className="size-12 text-emerald-500 rotate-180" /><span className="text-xs font-bold text-slate-500 mt-2">Tree 5</span></div>
                  </div>
                )}
             </div>
             
             {animState === 2 && <p className="text-emerald-400 font-bold animate-in fade-in bg-emerald-950/40 px-4 py-2 rounded-lg">Many trees working together form an Ensemble.</p>}
          </div>
        )}

        {step === 3 && (
          <div className="flex flex-col items-center justify-center h-full animate-in slide-in-from-right">
             <h3 className="text-2xl font-bold text-indigo-400 uppercase tracking-widest mb-8 flex items-center gap-2"><Users className="size-6" /> Voting System</h3>
             
             <div className="w-full max-w-3xl bg-slate-900 border-2 border-slate-700 rounded-xl mb-8 p-8 relative flex flex-col items-center">
                
                {animState === 0 && (
                  <button onClick={runVoting} className="px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-[0_0_20px_rgba(79,70,229,0.4)] mb-8">
                    Start Voting
                  </button>
                )}

                {animState >= 1 && (
                  <>
                     <div className="grid grid-cols-5 gap-4 w-full mb-8">
                        <div className="bg-slate-800 p-4 rounded-lg text-center animate-in zoom-in">
                          <div className="text-xs font-bold text-slate-500 mb-2">Tree 1</div>
                          <div className="font-black text-emerald-400">Approved</div>
                        </div>
                        <div className="bg-slate-800 p-4 rounded-lg text-center animate-in zoom-in delay-100">
                          <div className="text-xs font-bold text-slate-500 mb-2">Tree 2</div>
                          <div className="font-black text-emerald-400">Approved</div>
                        </div>
                        <div className="bg-slate-800 p-4 rounded-lg text-center animate-in zoom-in delay-200">
                          <div className="text-xs font-bold text-slate-500 mb-2">Tree 3</div>
                          <div className="font-black text-rose-400">Rejected</div>
                        </div>
                        <div className="bg-slate-800 p-4 rounded-lg text-center animate-in zoom-in delay-300">
                          <div className="text-xs font-bold text-slate-500 mb-2">Tree 4</div>
                          <div className="font-black text-emerald-400">Approved</div>
                        </div>
                        <div className="bg-slate-800 p-4 rounded-lg text-center animate-in zoom-in delay-500">
                          <div className="text-xs font-bold text-slate-500 mb-2">Tree 5</div>
                          <div className="font-black text-emerald-400">Approved</div>
                        </div>
                     </div>
                  </>
                )}
                {animState === 2 && (
                  <div className="flex flex-col items-center gap-4 animate-in slide-in-from-bottom">
                     <div className="flex gap-8 text-xl font-bold bg-slate-950 p-4 rounded-xl border border-slate-700">
                        <span className="text-emerald-400">Approved: 4</span>
                        <span className="text-rose-400">Rejected: 1</span>
                     </div>
                     <div className="text-3xl font-black text-indigo-400 bg-indigo-950/40 px-8 py-4 rounded-xl border-2 border-indigo-500/50 shadow-[0_0_20px_rgba(99,102,241,0.3)]">
                        Final Vote: Approved
                     </div>
                  </div>
                )}
             </div>
          </div>
        )}

        {step === 4 && (
          <div className="flex flex-col items-center justify-center h-full animate-in slide-in-from-right">
             <h3 className="text-2xl font-bold text-fuchsia-400 uppercase tracking-widest mb-8 flex items-center gap-2"><Shuffle className="size-6" /> Feature Randomization</h3>
             
             {animState === 0 && (
               <button onClick={runFeatures} className="px-8 py-4 bg-fuchsia-600 hover:bg-fuchsia-700 text-white font-bold rounded-xl shadow-[0_0_20px_rgba(217,70,239,0.4)] mb-8">
                 Randomize Features
               </button>
             )}

             <div className="w-full max-w-3xl grid grid-cols-3 gap-6 mb-8">
                {animState >= 1 && (
                  <>
                     <div className="bg-slate-900 border-2 border-slate-700 rounded-xl p-6 flex flex-col items-center animate-in zoom-in">
                        <GitMerge className="size-8 text-fuchsia-500 rotate-180 mb-4" />
                        <div className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-2">Tree 1 Gets:</div>
                        <div className="flex gap-2 text-xs font-bold"><span className="bg-fuchsia-950 text-fuchsia-300 px-2 py-1 rounded">Age</span><span className="bg-fuchsia-950 text-fuchsia-300 px-2 py-1 rounded">Income</span></div>
                     </div>
                     <div className="bg-slate-900 border-2 border-slate-700 rounded-xl p-6 flex flex-col items-center animate-in zoom-in delay-100">
                        <GitMerge className="size-8 text-fuchsia-500 rotate-180 mb-4" />
                        <div className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-2">Tree 2 Gets:</div>
                        <div className="flex gap-2 text-xs font-bold"><span className="bg-fuchsia-950 text-fuchsia-300 px-2 py-1 rounded">Income</span><span className="bg-fuchsia-950 text-fuchsia-300 px-2 py-1 rounded">Credit</span></div>
                     </div>
                     <div className="bg-slate-900 border-2 border-slate-700 rounded-xl p-6 flex flex-col items-center animate-in zoom-in delay-200">
                        <GitMerge className="size-8 text-fuchsia-500 rotate-180 mb-4" />
                        <div className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-2">Tree 3 Gets:</div>
                        <div className="flex gap-2 text-xs font-bold"><span className="bg-fuchsia-950 text-fuchsia-300 px-2 py-1 rounded">Education</span><span className="bg-fuchsia-950 text-fuchsia-300 px-2 py-1 rounded">Age</span></div>
                     </div>
                  </>
                )}
             </div>

             {animState === 2 && (
               <p className="text-fuchsia-400 font-bold animate-in fade-in bg-fuchsia-950/40 px-4 py-2 rounded-lg text-center">
                 Giving each tree different features ensures they learn different patterns.<br/>This makes the forest diverse and accurate.
               </p>
             )}
          </div>
        )}

        {step === 5 && (
          <div className="flex flex-col items-center justify-center h-full animate-in slide-in-from-right">
             <h3 className="text-2xl font-bold text-cyan-400 uppercase tracking-widest mb-8 flex items-center gap-2"><Target className="size-6" /> Accuracy Comparison</h3>
             
             {animState === 0 && (
               <button onClick={runCompare} className="px-8 py-4 bg-cyan-600 hover:bg-cyan-700 text-white font-bold rounded-xl shadow-[0_0_20px_rgba(6,182,212,0.4)] mb-8">
                 Analyze Performance
               </button>
             )}

             <div className="w-full max-w-3xl flex gap-8 mb-8">
                {animState >= 1 && (
                  <div className="flex-1 bg-slate-900 border-2 border-slate-700 rounded-xl p-6 text-center animate-in zoom-in flex flex-col items-center">
                     <GitMerge className="size-12 text-slate-500 rotate-180 mb-4" />
                     <div className="text-slate-400 font-bold uppercase tracking-widest mb-4">Single Tree</div>
                     <div className="text-4xl font-black text-amber-500">78%</div>
                  </div>
                )}
                {animState === 2 && (
                  <div className="flex-1 bg-emerald-950/20 border-2 border-emerald-500/50 rounded-xl p-6 text-center animate-in slide-in-from-right flex flex-col items-center shadow-[0_0_20px_rgba(16,185,129,0.3)]">
                     <Trees className="size-16 text-emerald-400 mb-4 drop-shadow-[0_0_10px_rgba(52,211,153,0.5)]" />
                     <div className="text-emerald-400 font-bold uppercase tracking-widest mb-4">Random Forest</div>
                     <div className="text-5xl font-black text-emerald-500">91%</div>
                  </div>
                )}
             </div>

             {animState === 2 && (
               <button onClick={nextStep} className="px-8 py-3 bg-gradient-to-r from-emerald-600 to-cyan-600 hover:from-emerald-500 hover:to-cyan-500 text-white font-bold rounded-xl animate-in zoom-in shadow-[0_0_20px_rgba(16,185,129,0.4)] mt-4">
                 Enter Final Challenge <ArrowRight className="size-5 inline" />
               </button>
             )}
          </div>
        )}

        {step === 6 && (
          <div className="flex flex-col items-center justify-center h-full animate-in slide-in-from-right">
             <ShieldCheck className="size-16 text-emerald-400 mb-6 drop-shadow-[0_0_20px_rgba(52,211,153,0.4)]" />
             <h3 className="text-3xl font-black text-white uppercase tracking-widest mb-2">Final Challenge</h3>
             <p className="text-slate-400 mb-8 max-w-xl text-center">Choose the optimal number of trees for your Random Forest to maximize stability and accuracy.</p>
             
             <div className="w-full max-w-2xl bg-slate-900 border-2 border-slate-700 rounded-xl mb-8 p-8 flex flex-col items-center">
                <div className="text-4xl font-black text-emerald-400 mb-6">{treeCount} Trees</div>
                <input 
                  type="range" 
                  min="3" max="200" step="1" 
                  value={treeCount} 
                  onChange={(e) => handleTreeChange(parseInt(e.target.value))} 
                  className="w-full accent-emerald-500 cursor-pointer mb-8"
                />

                <div className="w-full bg-slate-950 p-6 rounded-xl border border-slate-800 flex justify-between items-center relative overflow-hidden">
                   <div className="text-center z-10">
                      <div className="text-xs font-bold text-slate-500 uppercase mb-2">Prediction Stability</div>
                      <div className={`text-2xl font-black ${treeCount < 10 ? "text-rose-500 animate-shake" : treeCount < 50 ? "text-amber-400" : "text-emerald-400"}`}>
                        {treeCount < 10 ? "Low (Unstable)" : treeCount < 50 ? "Moderate" : "High (Stable)"}
                      </div>
                   </div>
                   <div className="text-center z-10">
                      <div className="text-xs font-bold text-slate-500 uppercase mb-2">Confidence Meter</div>
                      <div className="h-4 w-32 bg-slate-800 rounded-full overflow-hidden mt-3 mx-auto">
                         <div className="h-full bg-emerald-500 transition-all duration-300" style={{ width: `${Math.min(100, (treeCount / 100) * 100)}%` }} />
                      </div>
                   </div>
                </div>
             </div>

             {animState === 1 && (
               <div className="text-emerald-400 font-bold uppercase tracking-widest animate-in zoom-in bg-emerald-950/40 p-4 border border-emerald-500/50 rounded-xl">
                 <CheckCircle2 className="size-8 mx-auto mb-2" /> Optimal Forest Built!
               </div>
             )}
          </div>
        )}
      </div>
    </div>
  );
}
