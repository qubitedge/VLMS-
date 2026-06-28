import { useState, useEffect } from "react";
import { 
  Users, Crosshair, HelpCircle, Activity, Heart, AlertTriangle, 
  ArrowRight, CheckCircle2, Star, Target, SlidersHorizontal
} from "lucide-react";

export function SimilarityLabCampaign() {
  const [xp, setXp] = useState(0);
  const [successMsg, setSuccessMsg] = useState("");
  const [step, setStep] = useState(0); // 0: Start, 1: Distance, 2: K-value, 3: Voting, 4: Regression, 5: Mistake Demo, 6: Challenge
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
  const measureDistances = async () => {
    setAnimState(1); // pulse circles
    await new Promise(r => setTimeout(r, 1500));
    setAnimState(2); // show numbers
    addXp(50, "Distance Calculator!");
    setTimeout(() => nextStep(), 3000);
  };

  // Stage 2
  const [kValue, setKValue] = useState(1);
  const handleKChange = (k: number) => {
    setKValue(k);
    if (k === 3 && animState === 0) {
      setAnimState(1);
      addXp(50, "Parameter Tuner!");
    }
  };

  // Stage 3
  const runVoting = async () => {
    setAnimState(1);
    await new Promise(r => setTimeout(r, 1500));
    setAnimState(2);
    addXp(50, "Majority Rules!");
    setTimeout(() => nextStep(), 4000);
  };

  // Stage 4
  const runRegression = async () => {
    setAnimState(1);
    await new Promise(r => setTimeout(r, 1500));
    setAnimState(2);
    addXp(50, "Regressor!");
    setTimeout(() => nextStep(), 4000);
  };

  // Stage 5
  const runMistakeDemo = async () => {
    setAnimState(1); // K=1 noise
    await new Promise(r => setTimeout(r, 2000));
    setAnimState(2); // K=15 distant
    addXp(50, "Error Analyst!");
    setTimeout(() => nextStep(), 4000);
  };

  // Stage 6 Challenge
  const [cClassified, setCClassified] = useState(0);
  const classifyPatient = () => {
    setCClassified(c => c + 1);
    if (cClassified === 9) {
      addXp(150, "Master of Neighbors!");
    }
  };

  return (
    <div className="flex flex-col h-full bg-slate-950 text-foreground p-6 overflow-hidden relative font-sans">
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-800 shrink-0 z-20">
        <div>
          <h2 className="text-2xl font-black flex items-center gap-3 uppercase tracking-widest text-blue-400 drop-shadow-[0_0_10px_rgba(96,165,250,0.3)]">
            <Users className="size-7" /> 
            Similarity Lab
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
             <Crosshair className="size-24 text-blue-500 mb-6 drop-shadow-[0_0_30px_rgba(59,130,246,0.5)]" />
             <h1 className="text-4xl font-black text-white uppercase tracking-widest mb-4">Find the Most Similar Neighbors</h1>
             <p className="text-slate-400 max-w-xl text-lg mb-8">
               A hospital wants to predict whether a new patient is Healthy or At Risk based on previous patients.
             </p>
             <div className="bg-slate-900 p-8 rounded-xl border border-slate-700 mb-8 w-full max-w-md relative h-48 flex items-center justify-center">
                <div className="absolute top-8 left-12 size-4 rounded-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.8)]" />
                <div className="absolute top-16 right-20 size-4 rounded-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.8)]" />
                <div className="absolute bottom-12 left-24 size-4 rounded-full bg-rose-500 shadow-[0_0_10px_rgba(244,63,94,0.8)]" />
                <div className="absolute bottom-10 right-12 size-4 rounded-full bg-rose-500 shadow-[0_0_10px_rgba(244,63,94,0.8)]" />
                <div className="size-6 rounded-full bg-emerald-500 animate-pulse flex items-center justify-center text-xs font-bold shadow-[0_0_15px_rgba(16,185,129,1)] text-white">?</div>
             </div>
             <div className="flex gap-4 mb-8">
               <div className="flex items-center gap-2"><div className="size-3 bg-blue-500 rounded-full" /> Healthy</div>
               <div className="flex items-center gap-2"><div className="size-3 bg-rose-500 rounded-full" /> At Risk</div>
               <div className="flex items-center gap-2"><div className="size-3 bg-emerald-500 rounded-full" /> New Patient</div>
             </div>
             <button onClick={nextStep} className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-[0_0_20px_rgba(37,99,235,0.4)] flex items-center gap-2">
               Start KNN Analysis <ArrowRight className="size-5" />
             </button>
          </div>
        )}

        {step === 1 && (
          <div className="flex flex-col items-center justify-center h-full animate-in slide-in-from-right">
             <h3 className="text-2xl font-bold text-amber-400 uppercase tracking-widest mb-8 flex items-center gap-2"><Target className="size-6" /> Understanding Distance</h3>
             
             <div className="w-full max-w-lg h-64 bg-slate-900 border-2 border-slate-700 rounded-xl mb-8 relative flex items-center justify-center overflow-hidden">
                {/* Points */}
                <div className="absolute top-12 left-32 size-4 rounded-full bg-blue-500 z-10" />
                <div className="absolute top-24 left-16 size-4 rounded-full bg-rose-500 z-10" />
                <div className="absolute bottom-16 right-24 size-4 rounded-full bg-blue-500 z-10" />
                
                {/* Center New Patient */}
                <button 
                  onClick={animState === 0 ? measureDistances : undefined}
                  className="size-8 rounded-full bg-emerald-500 z-20 flex items-center justify-center text-white font-black hover:scale-110 transition-transform shadow-[0_0_15px_rgba(16,185,129,0.8)]"
                >
                  ?
                </button>

                {/* Distance visual */}
                {animState >= 1 && (
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                     <div className="size-32 border-2 border-emerald-500/50 rounded-full animate-ping" />
                  </div>
                )}
                {animState === 2 && (
                  <>
                     <div className="absolute top-14 left-[140px] text-xs font-mono text-amber-400 font-bold bg-slate-900 px-1 rounded">2.1</div>
                     <div className="absolute top-26 left-[80px] text-xs font-mono text-amber-400 font-bold bg-slate-900 px-1 rounded">3.4</div>
                     <div className="absolute bottom-18 right-[110px] text-xs font-mono text-amber-400 font-bold bg-slate-900 px-1 rounded">4.2</div>
                     <div className="absolute bottom-4 text-emerald-400 font-bold text-sm bg-emerald-950/40 px-4 py-1 border border-emerald-500/50 rounded-full">Closer points matter more.</div>
                  </>
                )}
             </div>

             {animState === 0 && <p className="text-slate-400 animate-pulse">Click the new patient to measure distances.</p>}
          </div>
        )}

        {step === 2 && (
          <div className="flex flex-col items-center justify-center h-full animate-in slide-in-from-right">
             <h3 className="text-2xl font-bold text-fuchsia-400 uppercase tracking-widest mb-8 flex items-center gap-2"><SlidersHorizontal className="size-6" /> Choose K</h3>
             <p className="text-slate-400 mb-6 text-center max-w-md">K determines how many nearest neighbors will vote.</p>

             <div className="w-full max-w-md bg-slate-900 border-2 border-slate-700 rounded-xl mb-8 p-6 flex flex-col items-center">
                <div className="text-4xl font-black text-fuchsia-400 mb-6">K = {kValue}</div>
                <input 
                  type="range" 
                  min="1" max="7" step="2" 
                  value={kValue} 
                  onChange={(e) => handleKChange(parseInt(e.target.value))} 
                  className="w-full accent-fuchsia-500 cursor-pointer"
                />
                <div className="w-full flex justify-between mt-2 text-xs text-slate-500 font-bold">
                   <span>1</span><span>3</span><span>5</span><span>7</span>
                </div>
             </div>

             <div className="bg-slate-950 border border-slate-800 p-6 rounded-xl flex items-center gap-6 mb-8 h-32">
                <div className="flex flex-col gap-2">
                   {Array(kValue).fill(0).map((_, i) => (
                     <div key={i} className={`size-4 rounded-full ${i % 3 === 0 ? 'bg-blue-500' : 'bg-rose-500'}`} />
                   ))}
                </div>
                <div className="text-xl font-bold text-slate-300">
                   Prediction: <span className={kValue >= 3 ? "text-rose-400" : "text-blue-400"}>{kValue >= 3 ? "At Risk" : "Healthy"}</span>
                </div>
             </div>

             {animState === 1 && (
               <button onClick={nextStep} className="px-6 py-2 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-lg animate-in fade-in">Proceed to Classification <ArrowRight className="size-4 inline" /></button>
             )}
          </div>
        )}

        {step === 3 && (
          <div className="flex flex-col items-center justify-center h-full animate-in slide-in-from-right">
             <h3 className="text-2xl font-bold text-indigo-400 uppercase tracking-widest mb-8 flex items-center gap-2"><CheckCircle2 className="size-6" /> Classification</h3>
             
             <div className="bg-slate-900 border-2 border-slate-700 rounded-xl mb-8 p-8 relative flex items-center justify-center gap-12 w-full max-w-2xl">
                {animState === 0 && (
                  <button onClick={runVoting} className="px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-[0_0_20px_rgba(79,70,229,0.4)]">
                    Start Voting (K=5)
                  </button>
                )}

                {animState >= 1 && (
                  <>
                     <div className="flex flex-col gap-4 animate-in zoom-in">
                        <div className="flex items-center gap-4">
                           <div className="flex gap-2">
                             <div className="size-6 bg-blue-500 rounded-full" />
                             <div className="size-6 bg-blue-500 rounded-full" />
                             <div className="size-6 bg-blue-500 rounded-full" />
                             <div className="size-6 bg-blue-500 rounded-full" />
                           </div>
                           <span className="font-bold text-blue-400 text-xl">4 Healthy</span>
                        </div>
                        <div className="flex items-center gap-4">
                           <div className="flex gap-2">
                             <div className="size-6 bg-rose-500 rounded-full" />
                           </div>
                           <span className="font-bold text-rose-400 text-xl">1 At Risk</span>
                        </div>
                     </div>
                     {animState === 2 && (
                       <div className="text-center animate-in slide-in-from-right">
                          <div className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Final Result</div>
                          <div className="text-4xl font-black text-blue-400 bg-blue-950/40 px-6 py-4 rounded-xl border-2 border-blue-500/50">Healthy</div>
                       </div>
                     )}
                  </>
                )}
             </div>
          </div>
        )}

        {step === 4 && (
          <div className="flex flex-col items-center justify-center h-full animate-in slide-in-from-right">
             <h3 className="text-2xl font-bold text-emerald-400 uppercase tracking-widest mb-8 flex items-center gap-2"><Activity className="size-6" /> Regression</h3>
             <p className="text-slate-400 mb-6 text-center max-w-md">Instead of predicting a class, regression predicts a continuous number (e.g., Income).</p>

             <div className="bg-slate-900 border-2 border-slate-700 rounded-xl mb-8 p-8 flex flex-col items-center w-full max-w-2xl">
                {animState === 0 && (
                  <button onClick={runRegression} className="px-8 py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-[0_0_20px_rgba(16,185,129,0.4)]">
                    Predict Income (K=3)
                  </button>
                )}

                {animState >= 1 && (
                  <div className="flex flex-col items-center gap-6 animate-in zoom-in w-full">
                     <div className="flex justify-around w-full">
                        <div className="bg-slate-800 p-4 rounded-lg text-center"><div className="text-xs text-slate-500">Neighbor 1</div><div className="font-mono text-xl text-emerald-400">$50K</div></div>
                        <div className="bg-slate-800 p-4 rounded-lg text-center"><div className="text-xs text-slate-500">Neighbor 2</div><div className="font-mono text-xl text-emerald-400">$60K</div></div>
                        <div className="bg-slate-800 p-4 rounded-lg text-center"><div className="text-xs text-slate-500">Neighbor 3</div><div className="font-mono text-xl text-emerald-400">$70K</div></div>
                     </div>
                     {animState === 2 && (
                       <div className="text-center animate-in slide-in-from-bottom">
                          <div className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-2">(50 + 60 + 70) / 3</div>
                          <div className="text-4xl font-black text-emerald-400 bg-emerald-950/40 px-8 py-4 rounded-xl border-2 border-emerald-500/50">Prediction: $60K</div>
                       </div>
                     )}
                  </div>
                )}
             </div>
          </div>
        )}

        {step === 5 && (
          <div className="flex flex-col items-center justify-center h-full animate-in slide-in-from-right">
             <h3 className="text-2xl font-bold text-rose-400 uppercase tracking-widest mb-8 flex items-center gap-2"><AlertTriangle className="size-6" /> Common Mistakes</h3>
             
             {animState === 0 && (
               <button onClick={runMistakeDemo} className="px-8 py-4 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-xl shadow-[0_0_20px_rgba(244,63,94,0.4)]">
                 Show Mistakes
               </button>
             )}

             <div className="w-full max-w-3xl grid grid-cols-2 gap-8">
                {animState >= 1 && (
                  <div className="bg-rose-950/30 border-2 border-rose-500/50 rounded-xl p-6 text-center animate-in zoom-in">
                     <div className="text-rose-400 font-bold uppercase tracking-widest mb-4">K Too Small (K=1)</div>
                     <div className="relative h-24 mb-4 flex items-center justify-center">
                        <div className="size-16 bg-blue-500/20 rounded-full absolute" />
                        <div className="size-4 bg-rose-500 rounded-full mr-4 z-10" />
                        <div className="size-6 bg-emerald-500 rounded-full z-10" />
                     </div>
                     <p className="text-sm text-rose-200">One noisy neighbor causes wrong prediction.</p>
                  </div>
                )}
                {animState === 2 && (
                  <div className="bg-rose-950/30 border-2 border-rose-500/50 rounded-xl p-6 text-center animate-in zoom-in">
                     <div className="text-rose-400 font-bold uppercase tracking-widest mb-4">K Too Large (K=15)</div>
                     <div className="relative h-24 mb-4 flex items-center justify-center">
                        <div className="w-full h-16 bg-blue-500/10 rounded-full absolute" />
                        <div className="text-xl font-bold text-slate-500">Includes distant unrelated neighbors.</div>
                     </div>
                     <p className="text-sm text-rose-200">Averages out everything, loses local patterns.</p>
                  </div>
                )}
             </div>
          </div>
        )}

        {step === 6 && (
          <div className="flex flex-col items-center justify-center h-full animate-in slide-in-from-right">
             <Target className="size-16 text-emerald-400 mb-6 drop-shadow-[0_0_20px_rgba(52,211,153,0.4)]" />
             <h3 className="text-3xl font-black text-white uppercase tracking-widest mb-2">Final Challenge</h3>
             <p className="text-slate-400 mb-8 max-w-xl text-center">Classify 10 unknown patients using optimal K values.</p>
             
             <div className="w-full max-w-md bg-slate-900 border-2 border-slate-700 rounded-xl p-8 text-center mb-8">
                <div className="text-6xl font-black text-white mb-4">{cClassified} / 10</div>
                <div className="w-full bg-slate-800 h-4 rounded-full overflow-hidden mb-6">
                   <div className="h-full bg-emerald-500 transition-all duration-300" style={{ width: `${(cClassified/10)*100}%` }} />
                </div>
                {cClassified < 10 ? (
                  <button onClick={classifyPatient} className="px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-[0_0_20px_rgba(79,70,229,0.4)]">
                    Classify Patient
                  </button>
                ) : (
                  <div className="text-emerald-400 font-bold uppercase tracking-widest animate-in zoom-in">
                    <CheckCircle2 className="size-8 mx-auto mb-2" /> All Patients Classified!
                  </div>
                )}
             </div>
          </div>
        )}
      </div>
    </div>
  );
}
