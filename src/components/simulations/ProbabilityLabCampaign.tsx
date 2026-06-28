import { useState, useEffect } from "react";
import { 
  Mail, Scan, Link, AlertTriangle, ShieldCheck, 
  ArrowRight, CheckCircle2, Star, Target, Search
} from "lucide-react";

export function ProbabilityLabCampaign() {
  const [xp, setXp] = useState(0);
  const [successMsg, setSuccessMsg] = useState("");
  const [step, setStep] = useState(0); // 0: Start, 1: Evidence, 2: Combine, 3: Final, 4: Mistake, 5: Challenge
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
  const runEvidence = async () => {
    setAnimState(1); 
    await new Promise(r => setTimeout(r, 2000));
    setAnimState(2); 
    addXp(50, "Evidence Collector!");
    setTimeout(() => nextStep(), 4000);
  };

  // Stage 2
  const runCombine = async () => {
    setAnimState(1); 
    await new Promise(r => setTimeout(r, 2000));
    setAnimState(2); 
    addXp(50, "Probability Combiner!");
    setTimeout(() => nextStep(), 3000);
  };

  // Stage 3
  const runPrediction = async () => {
    setAnimState(1); 
    await new Promise(r => setTimeout(r, 2000));
    setAnimState(2); 
    addXp(50, "AI Judge!");
    setTimeout(() => nextStep(), 3000);
  };

  // Stage 4
  const runMistake = async () => {
    setAnimState(1); 
    await new Promise(r => setTimeout(r, 2000));
    setAnimState(2); 
    addXp(50, "Bias Detector!");
    setTimeout(() => nextStep(), 4000);
  };

  // Stage 5
  const [cClass, setCClass] = useState<string | null>(null);
  const checkChallenge = (type: string) => {
    if (type === "not-spam") {
      setCClass("success");
      addXp(150, "Bayesian Master!");
    } else {
      setCClass("error");
    }
  };

  return (
    <div className="flex flex-col h-full bg-slate-950 text-foreground p-6 overflow-hidden relative font-sans">
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-800 shrink-0 z-20">
        <div>
          <h2 className="text-2xl font-black flex items-center gap-3 uppercase tracking-widest text-indigo-400 drop-shadow-[0_0_10px_rgba(99,102,241,0.3)]">
            <Mail className="size-7" /> 
            Probability Lab
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
             <Search className="size-24 text-indigo-500 mb-6 drop-shadow-[0_0_30px_rgba(99,102,241,0.5)]" />
             <h1 className="text-4xl font-black text-white uppercase tracking-widest mb-4">Spam Email Detective</h1>
             <p className="text-slate-400 max-w-xl text-lg mb-8">
               Unlike KNN (distance) or Decision Trees (questions), Naïve Bayes asks: "Based on evidence, what is most likely?"
             </p>
             <div className="bg-slate-900 w-full max-w-lg rounded-xl border border-slate-700 mb-8 overflow-hidden">
                <div className="bg-slate-800 p-2 font-bold text-slate-300 text-sm flex items-center gap-2">
                   <Mail className="size-4" /> INBOX
                </div>
                <div className="p-6 bg-slate-950 text-center">
                   <div className="text-2xl font-black text-rose-400 mb-2 uppercase tracking-widest">Win Money Now!!!</div>
                   <div className="text-sm text-slate-500">Click the link below to claim your prize!</div>
                </div>
             </div>
             <button onClick={nextStep} className="px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-[0_0_20px_rgba(79,70,229,0.4)] flex items-center gap-2">
               Start Bayesian Analysis <ArrowRight className="size-5" />
             </button>
          </div>
        )}

        {step === 1 && (
          <div className="flex flex-col items-center justify-center h-full animate-in slide-in-from-right">
             <h3 className="text-2xl font-bold text-amber-400 uppercase tracking-widest mb-8 flex items-center gap-2"><Scan className="size-6" /> Collect Evidence</h3>
             
             {animState === 0 && (
               <button onClick={runEvidence} className="px-8 py-4 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-xl shadow-[0_0_20px_rgba(217,119,6,0.4)] mb-8">
                 Scan Email Words
               </button>
             )}

             {animState >= 1 && (
                <div className="w-full max-w-2xl flex flex-col items-center gap-6 animate-in zoom-in mb-8">
                   <div className="flex gap-4 mb-4">
                      <div className="bg-slate-800 text-white font-black px-6 py-3 rounded border border-slate-600 shadow-lg animate-in slide-in-from-top">WIN</div>
                      <div className="bg-slate-800 text-white font-black px-6 py-3 rounded border border-slate-600 shadow-lg animate-in slide-in-from-top delay-100">MONEY</div>
                      <div className="bg-slate-800 text-white font-black px-6 py-3 rounded border border-slate-600 shadow-lg animate-in slide-in-from-top delay-200">NOW</div>
                   </div>

                   {animState === 2 && (
                     <div className="bg-slate-900 p-6 rounded-xl border border-amber-500/50 w-full animate-in slide-in-from-bottom flex justify-between items-center shadow-[0_0_20px_rgba(217,119,6,0.2)]">
                        <div className="text-3xl font-black text-amber-400">"WIN"</div>
                        <div className="flex flex-col gap-2">
                           <div className="flex justify-between items-center gap-4">
                              <span className="text-xs font-bold text-slate-500 uppercase">Spam Probability</span>
                              <span className="text-rose-400 font-bold">80%</span>
                           </div>
                           <div className="flex justify-between items-center gap-4">
                              <span className="text-xs font-bold text-slate-500 uppercase">Normal Probability</span>
                              <span className="text-emerald-400 font-bold">20%</span>
                           </div>
                        </div>
                     </div>
                   )}
                </div>
             )}
          </div>
        )}

        {step === 2 && (
          <div className="flex flex-col items-center justify-center h-full animate-in slide-in-from-right">
             <h3 className="text-2xl font-bold text-fuchsia-400 uppercase tracking-widest mb-8 flex items-center gap-2"><Link className="size-6" /> Combine Evidence</h3>
             
             {animState === 0 && (
               <button onClick={runCombine} className="px-8 py-4 bg-fuchsia-600 hover:bg-fuchsia-700 text-white font-bold rounded-xl shadow-[0_0_20px_rgba(217,70,239,0.4)] mb-8">
                 Calculate Total Probability
               </button>
             )}

             {animState >= 1 && (
                <div className="w-full max-w-xl flex flex-col items-center gap-6 animate-in zoom-in mb-8">
                   <div className="flex gap-4">
                      <div className="bg-fuchsia-950 text-fuchsia-300 font-black px-4 py-2 rounded border border-fuchsia-500/50">WIN</div>
                      <div className="bg-fuchsia-950 text-fuchsia-300 font-black px-4 py-2 rounded border border-fuchsia-500/50">MONEY</div>
                      <div className="bg-fuchsia-950 text-fuchsia-300 font-black px-4 py-2 rounded border border-fuchsia-500/50">FREE</div>
                   </div>

                   {animState === 2 && (
                     <div className="w-full mt-4">
                        <div className="flex justify-between mb-2 font-bold uppercase tracking-widest text-sm">
                           <span className="text-emerald-400">Not Spam (8%)</span>
                           <span className="text-rose-400">Spam (92%)</span>
                        </div>
                        <div className="w-full h-8 bg-slate-800 rounded-full flex overflow-hidden">
                           <div className="h-full bg-emerald-500" style={{ width: "8%" }} />
                           <div className="h-full bg-rose-500 animate-in slide-in-from-left duration-1000" style={{ width: "92%" }} />
                        </div>
                     </div>
                   )}
                </div>
             )}
             
             {animState === 2 && <p className="text-fuchsia-400 font-bold animate-in fade-in">Every word contributes evidence (Bayes Theorem).</p>}
          </div>
        )}

        {step === 3 && (
          <div className="flex flex-col items-center justify-center h-full animate-in slide-in-from-right">
             <h3 className="text-2xl font-bold text-indigo-400 uppercase tracking-widest mb-8 flex items-center gap-2"><Target className="size-6" /> Final Prediction</h3>
             
             <div className="w-full max-w-md bg-slate-900 border-2 border-slate-700 rounded-xl mb-8 p-6 flex flex-col items-center overflow-hidden relative">
                {animState === 0 && (
                  <button onClick={runPrediction} className="px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-[0_0_20px_rgba(79,70,229,0.4)] relative z-20">
                    Call AI Judge
                  </button>
                )}

                {animState >= 1 && (
                  <div className="animate-in zoom-in text-center relative z-20">
                     <ShieldCheck className="size-20 text-indigo-500 mx-auto mb-4" />
                     <div className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Verdict</div>
                     <div className="text-5xl font-black text-rose-500 mb-8">SPAM</div>
                  </div>
                )}

                {animState === 2 && (
                  <div className="absolute inset-0 bg-rose-950/40 border-4 border-rose-500 animate-in fade-in pointer-events-none" />
                )}
             </div>
          </div>
        )}

        {step === 4 && (
          <div className="flex flex-col items-center justify-center h-full animate-in slide-in-from-right">
             <h3 className="text-2xl font-bold text-rose-400 uppercase tracking-widest mb-8 flex items-center gap-2"><AlertTriangle className="size-6" /> Common Mistakes</h3>
             
             {animState === 0 && (
               <button onClick={runMistake} className="px-8 py-4 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-xl shadow-[0_0_20px_rgba(244,63,94,0.4)] mb-8">
                 Analyze Dataset Bias
               </button>
             )}

             {animState >= 1 && (
                <div className="w-full max-w-2xl bg-slate-900 border-2 border-slate-700 rounded-xl p-8 flex flex-col items-center mb-8 animate-in zoom-in">
                   <div className="text-rose-400 font-bold uppercase tracking-widest mb-4 text-center">Training Dataset is 95% Spam</div>
                   
                   <div className="flex w-full justify-between items-center bg-slate-950 p-4 rounded-xl border border-slate-800 mb-6">
                      <div className="text-center">
                         <div className="text-xs text-slate-500 font-bold uppercase mb-1">Spam Examples</div>
                         <div className="text-3xl font-black text-rose-500">95,000</div>
                      </div>
                      <div className="text-center">
                         <div className="text-xs text-slate-500 font-bold uppercase mb-1">Normal Examples</div>
                         <div className="text-3xl font-black text-emerald-500">5,000</div>
                      </div>
                   </div>

                   {animState === 2 && (
                     <div className="bg-rose-950/40 p-4 rounded-lg border border-rose-500/50 text-center animate-in slide-in-from-bottom">
                        <div className="font-bold text-rose-300">AI becomes heavily biased toward calling everything Spam (Class Imbalance).</div>
                     </div>
                   )}
                </div>
             )}
             
             {animState === 2 && (
               <button onClick={nextStep} className="px-8 py-3 bg-gradient-to-r from-indigo-600 to-cyan-600 hover:from-indigo-500 hover:to-cyan-500 text-white font-bold rounded-xl animate-in zoom-in shadow-[0_0_20px_rgba(99,102,241,0.4)] mt-4">
                 Enter Final Challenge <ArrowRight className="size-5 inline" />
               </button>
             )}
          </div>
        )}

        {step === 5 && (
          <div className="flex flex-col items-center justify-center h-full animate-in slide-in-from-right">
             <ShieldCheck className="size-16 text-emerald-400 mb-6 drop-shadow-[0_0_20px_rgba(52,211,153,0.4)]" />
             <h3 className="text-3xl font-black text-white uppercase tracking-widest mb-2">Final Challenge</h3>
             <p className="text-slate-400 mb-8 max-w-xl text-center">Predict what the AI will classify this unseen email before it decides.</p>
             
             <div className="bg-slate-900 w-full max-w-lg rounded-xl border-2 border-indigo-500/50 mb-8 overflow-hidden shadow-[0_0_30px_rgba(99,102,241,0.2)]">
                <div className="bg-slate-800 p-2 font-bold text-slate-300 text-sm flex items-center gap-2">
                   <Mail className="size-4" /> NEW EMAIL
                </div>
                <div className="p-6 bg-slate-950 text-center">
                   <div className="text-2xl font-black text-emerald-400 mb-2 tracking-widest">Meeting at 10 AM</div>
                   <div className="text-sm text-slate-500">Let's review the project updates in the conference room.</div>
                </div>
             </div>

             {cClass === null && (
               <div className="flex gap-6">
                 <button onClick={()=>checkChallenge("spam")} className="px-8 py-4 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-xl">It's Spam</button>
                 <button onClick={()=>checkChallenge("not-spam")} className="px-8 py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-[0_0_20px_rgba(16,185,129,0.4)]">Not Spam</button>
               </div>
             )}

             {cClass === "error" && <div className="text-rose-400 font-bold animate-in shake">Incorrect. The evidence points towards a normal message!</div>}

             {cClass === "success" && (
               <div className="text-emerald-400 font-bold uppercase tracking-widest animate-in zoom-in bg-emerald-950/40 p-4 border border-emerald-500/50 rounded-xl mt-4">
                 <CheckCircle2 className="size-8 mx-auto mb-2" /> Correct! It is Not Spam.
               </div>
             )}
          </div>
        )}
      </div>
    </div>
  );
}
