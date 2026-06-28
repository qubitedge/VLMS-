import { useState, useEffect } from "react";
import { 
  HeartPulse, AlertCircle, Trash2, Filter, Settings2, ShieldCheck, 
  ArrowRight, CheckCircle2, Star, Zap, Cpu, ScanSearch
} from "lucide-react";

export function DataCleaningLabCampaign() {
  const [xp, setXp] = useState(0);
  const [successMsg, setSuccessMsg] = useState("");
  const [step, setStep] = useState(0); // 0: Start, 1: Missing, 2: Duplicates, 3: Features, 4: Norm, 5: Challenge
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

  // Stage 1: Missing Value
  const runMissingAction = () => {
    setAnimState(2);
    addXp(50, "Imputation Expert!");
    setTimeout(() => nextStep(), 3000);
  };

  // Stage 2: Duplicates
  const runRemoveDup = () => {
    setAnimState(2);
    addXp(50, "De-duplicator!");
    setTimeout(() => nextStep(), 3000);
  };

  // Stage 3: Features
  const [f1, setF1] = useState(false);
  const [f2, setF2] = useState(false);
  const [f3, setF3] = useState(false);
  
  useEffect(() => {
    if (step === 3 && f1 && f3 && !f2) {
      setAnimState(1); // Ready to advance
    } else {
      setAnimState(0);
    }
  }, [step, f1, f2, f3]);

  const runFeatureAdvance = () => {
    addXp(50, "Feature Selector!");
    nextStep();
  }

  // Stage 4: Normalization
  const runNormalize = async () => {
    setAnimState(1); // Running
    await new Promise(r => setTimeout(r, 2000));
    setAnimState(2); // Done
    addXp(50, "Scale Master!");
    setTimeout(() => nextStep(), 4000);
  };

  // Stage 5: Challenge
  const [cStep, setCStep] = useState(0);

  const runFinalSequence = async () => {
    setCStep(1); // Missing values
    await new Promise(r => setTimeout(r, 1500));
    setCStep(2); // Duplicates
    await new Promise(r => setTimeout(r, 1500));
    setCStep(3); // Features
    await new Promise(r => setTimeout(r, 1500));
    setCStep(4); // Normalize
    await new Promise(r => setTimeout(r, 1500));
    setCStep(5); // Final
    addXp(150, "Data Janitor Elite!");
  };

  return (
    <div className="flex flex-col h-full bg-slate-950 text-foreground p-6 overflow-hidden relative font-sans">
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-800 shrink-0 z-20">
        <div>
          <h2 className="text-2xl font-black flex items-center gap-3 uppercase tracking-widest text-emerald-400 drop-shadow-[0_0_10px_rgba(52,211,153,0.3)]">
            <HeartPulse className="size-7" /> 
            Data Cleaning Lab
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
             <ScanSearch className="size-24 text-emerald-500 mb-6 drop-shadow-[0_0_30px_rgba(16,185,129,0.5)]" />
             <h1 className="text-4xl font-black text-white uppercase tracking-widest mb-4">Prepare Data for AI</h1>
             <p className="text-slate-400 max-w-xl text-lg mb-8">
               A hospital collected patient records, but the data is messy. Your mission is to clean it before sending it to the AI model. Dirty data = Bad AI.
             </p>
             <div className="bg-slate-900 p-6 rounded-xl border border-rose-500/30 mb-8 font-mono text-sm tracking-widest text-slate-300 w-full max-w-md">
                <table className="w-full text-center">
                  <thead><tr className="text-emerald-400 border-b border-slate-700"><th>Age</th><th>Height</th><th>Weight</th></tr></thead>
                  <tbody>
                    <tr><td>23</td><td>170</td><td>65</td></tr>
                    <tr className="text-rose-400 font-bold"><td>?</td><td>168</td><td>70</td></tr>
                    <tr><td>45</td><td>175</td><td className="text-rose-400 font-bold">?</td></tr>
                    <tr className="text-amber-400"><td>23</td><td>170</td><td>65</td></tr>
                  </tbody>
                </table>
             </div>
             <button onClick={nextStep} className="px-8 py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-[0_0_20px_rgba(16,185,129,0.4)] flex items-center gap-2">
               Enter Preprocessing <ArrowRight className="size-5" />
             </button>
          </div>
        )}

        {step === 1 && (
          <div className="flex flex-col items-center justify-center h-full animate-in slide-in-from-right">
             <h3 className="text-2xl font-bold text-rose-400 uppercase tracking-widest mb-8 flex items-center gap-2"><AlertCircle className="size-6" /> Missing Value Detection</h3>
             
             <div className="w-full max-w-lg bg-slate-900 border-2 border-slate-700 rounded-xl overflow-hidden mb-8 shadow-xl">
               <div className="bg-slate-800 p-3 font-bold text-slate-300 flex justify-between">
                 <span>Patient Records</span>
                 <span className="flex items-center gap-2 text-rose-400"><AlertCircle className="size-4" /> AI Ready: ❌</span>
               </div>
               <div className="p-6 flex flex-col gap-4">
                  <div className="flex justify-between items-center p-3 bg-slate-950 rounded border border-slate-800">
                    <span className="text-slate-400">P-101</span> <span className="font-mono text-white">Age: 23, Weight: 65</span>
                  </div>
                  <div className={`flex justify-between items-center p-3 rounded border transition-all duration-500 ${animState===2 ? "bg-emerald-950/30 border-emerald-500/50" : "bg-rose-950/30 border-rose-500/50 shadow-[0_0_15px_rgba(244,63,94,0.3)] animate-pulse"}`}>
                    <span className="text-slate-400">P-102</span> 
                    <span className="font-mono text-white">Age: <button onClick={()=>setAnimState(1)} className={`font-black px-2 rounded ${animState===2 ? "text-emerald-400 bg-emerald-950" : "text-rose-400 bg-rose-900 hover:bg-rose-800"}`}>{animState===2 ? "34" : "?"}</button>, Weight: 70</span>
                  </div>
               </div>
             </div>

             {animState === 1 && (
               <div className="flex gap-4 animate-in slide-in-from-bottom">
                 <button onClick={runMissingAction} className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-lg shadow-lg">Replace with Mean</button>
                 <button onClick={runMissingAction} className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-lg shadow-lg">Remove Record</button>
               </div>
             )}

             {animState === 2 && (
               <div className="text-emerald-400 font-bold bg-emerald-950/50 px-6 py-3 rounded-xl border border-emerald-500/30 animate-in zoom-in">
                 Missing values handled! (Imputation)
               </div>
             )}
          </div>
        )}

        {step === 2 && (
          <div className="flex flex-col items-center justify-center h-full animate-in slide-in-from-right">
             <h3 className="text-2xl font-bold text-amber-400 uppercase tracking-widest mb-8 flex items-center gap-2"><Trash2 className="size-6" /> Duplicate Removal</h3>
             
             <div className="w-full max-w-lg bg-slate-900 border-2 border-slate-700 rounded-xl overflow-hidden mb-8 shadow-xl">
               <div className="p-6 flex flex-col gap-4">
                  <div className="flex justify-between items-center p-3 bg-slate-950 rounded border border-slate-800">
                    <span className="font-mono text-white">Age: 23, Height: 170, Weight: 65</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-slate-950 rounded border border-slate-800">
                    <span className="font-mono text-white">Age: 45, Height: 175, Weight: 80</span>
                  </div>
                  {animState === 0 && (
                    <div className="flex justify-between items-center p-3 bg-amber-950/30 rounded border border-amber-500/50 shadow-[0_0_15px_rgba(245,158,11,0.2)]">
                      <span className="font-mono text-amber-200">Age: 23, Height: 170, Weight: 65</span>
                      <button onClick={runRemoveDup} className="text-rose-400 hover:text-rose-300 p-2"><Trash2 className="size-5" /></button>
                    </div>
                  )}
               </div>
             </div>

             {animState === 2 && (
               <div className="text-emerald-400 font-bold bg-emerald-950/50 px-6 py-3 rounded-xl border border-emerald-500/30 animate-in zoom-in">
                 Duplicates removed to prevent model bias!
               </div>
             )}
          </div>
        )}

        {step === 3 && (
          <div className="flex flex-col items-center justify-center h-full animate-in slide-in-from-right">
             <h3 className="text-2xl font-bold text-indigo-400 uppercase tracking-widest mb-8 flex items-center gap-2"><Filter className="size-6" /> Feature Selection</h3>
             <p className="text-slate-400 mb-6 text-center max-w-md">Select only the features useful for diagnosing a medical condition. Do not select irrelevant data.</p>
             
             <div className="flex gap-4 mb-8">
                <button onClick={()=>setF1(!f1)} className={`px-6 py-4 rounded-xl border-2 font-bold transition-all duration-300 ${f1 ? 'bg-indigo-600 border-indigo-400 text-white' : 'bg-slate-900 border-slate-700 text-slate-400'}`}>Age</button>
                <button onClick={()=>setF2(!f2)} className={`px-6 py-4 rounded-xl border-2 font-bold transition-all duration-300 ${f2 ? 'bg-rose-600 border-rose-400 text-white' : 'bg-slate-900 border-slate-700 text-slate-400'}`}>Patient Name</button>
                <button onClick={()=>setF3(!f3)} className={`px-6 py-4 rounded-xl border-2 font-bold transition-all duration-300 ${f3 ? 'bg-indigo-600 border-indigo-400 text-white' : 'bg-slate-900 border-slate-700 text-slate-400'}`}>Weight</button>
             </div>

             <div className="w-full max-w-md bg-slate-900 p-4 rounded-xl border border-slate-700 mb-8">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-bold text-slate-400 uppercase tracking-widest">Model Quality</span>
                  <span className={`font-black ${animState === 1 ? 'text-emerald-400' : 'text-amber-400'}`}>{animState === 1 ? 'High' : 'Low'}</span>
                </div>
                <div className="h-4 bg-slate-800 rounded-full overflow-hidden">
                  <div className={`h-full transition-all duration-500 ${animState === 1 ? 'bg-emerald-500 w-full' : 'bg-amber-500 w-1/3'}`} />
                </div>
             </div>

             {animState === 1 && (
               <button onClick={runFeatureAdvance} className="px-8 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl animate-in zoom-in shadow-[0_0_20px_rgba(16,185,129,0.4)] flex items-center gap-2">
                 Proceed <ArrowRight className="size-5" />
               </button>
             )}
          </div>
        )}

        {step === 4 && (
          <div className="flex flex-col items-center justify-center h-full animate-in slide-in-from-right">
             <h3 className="text-2xl font-bold text-cyan-400 uppercase tracking-widest mb-8 flex items-center gap-2"><Settings2 className="size-6" /> Normalization</h3>
             
             <div className="w-full max-w-2xl grid grid-cols-2 gap-8 mb-8 items-center">
                <div className="bg-slate-900 p-6 rounded-xl border border-slate-700 text-center relative overflow-hidden">
                   <div className="text-sm text-slate-400 uppercase tracking-widest mb-4 font-bold">Raw Features</div>
                   <div className="flex flex-col gap-4 font-mono text-xl">
                      <div className="text-emerald-400">Age: 45</div>
                      <div className="text-rose-400">Income: 500,000</div>
                   </div>
                   <div className="absolute inset-0 bg-rose-900/10 pointer-events-none" />
                </div>

                <div className="bg-slate-900 p-6 rounded-xl border border-slate-700 text-center relative overflow-hidden">
                   <div className="text-sm text-slate-400 uppercase tracking-widest mb-4 font-bold">Normalized [0, 1]</div>
                   <div className="flex flex-col gap-4 font-mono text-xl">
                      <div className="text-cyan-400">{animState >= 2 ? "0.65" : "---"}</div>
                      <div className="text-cyan-400">{animState >= 2 ? "0.95" : "---"}</div>
                   </div>
                   {animState >= 2 && <div className="absolute inset-0 bg-cyan-900/10 pointer-events-none animate-in fade-in" />}
                </div>
             </div>

             {animState === 0 && (
               <button onClick={runNormalize} className="px-8 py-4 bg-cyan-600 hover:bg-cyan-700 text-white font-bold rounded-xl shadow-[0_0_20px_rgba(6,182,212,0.4)] flex items-center gap-2">
                 <Settings2 className="size-5" /> Rescale Values
               </button>
             )}

             {animState === 1 && (
               <div className="text-cyan-400 font-bold uppercase tracking-widest animate-pulse flex items-center gap-2">
                 <Zap className="size-5" /> Processing Min-Max Scaler...
               </div>
             )}

             {animState === 2 && (
               <div className="text-emerald-400 font-bold bg-emerald-950/50 px-6 py-3 rounded-xl border border-emerald-500/30 animate-in zoom-in text-center">
                 Values normalized!<br/><span className="text-sm font-normal text-emerald-200">Large features will no longer dominate the AI model.</span>
               </div>
             )}
          </div>
        )}

        {step === 5 && (
          <div className="flex flex-col items-center justify-center h-full animate-in slide-in-from-right">
             <Cpu className="size-16 text-indigo-400 mb-6 drop-shadow-[0_0_20px_rgba(99,102,241,0.4)]" />
             <h3 className="text-3xl font-black text-white uppercase tracking-widest mb-2">Final Challenge</h3>
             <p className="text-slate-400 mb-8 max-w-xl text-center">Execute the complete data preprocessing pipeline to prepare the dataset for AI training.</p>
             
             <div className="w-full max-w-3xl flex items-center gap-4 mb-8">
                <div className={`flex-1 h-12 rounded-lg flex items-center justify-center font-bold text-sm transition-all duration-500 ${cStep >= 1 ? 'bg-emerald-600 text-white' : 'bg-slate-800 text-slate-500'}`}>1. Missing Values</div>
                <ArrowRight className={`size-5 transition-all duration-500 ${cStep >= 1 ? 'text-emerald-500' : 'text-slate-700'}`} />
                <div className={`flex-1 h-12 rounded-lg flex items-center justify-center font-bold text-sm transition-all duration-500 ${cStep >= 2 ? 'bg-amber-600 text-white' : 'bg-slate-800 text-slate-500'}`}>2. Remove Duplicates</div>
                <ArrowRight className={`size-5 transition-all duration-500 ${cStep >= 2 ? 'text-amber-500' : 'text-slate-700'}`} />
                <div className={`flex-1 h-12 rounded-lg flex items-center justify-center font-bold text-sm transition-all duration-500 ${cStep >= 3 ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-500'}`}>3. Feature Selection</div>
                <ArrowRight className={`size-5 transition-all duration-500 ${cStep >= 3 ? 'text-indigo-500' : 'text-slate-700'}`} />
                <div className={`flex-1 h-12 rounded-lg flex items-center justify-center font-bold text-sm transition-all duration-500 ${cStep >= 4 ? 'bg-cyan-600 text-white' : 'bg-slate-800 text-slate-500'}`}>4. Normalization</div>
             </div>

             {cStep === 0 && (
               <button onClick={runFinalSequence} className="px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-[0_0_20px_rgba(79,70,229,0.4)] mb-8">
                 Run Pipeline
               </button>
             )}

             <div className="flex gap-12 mt-4 items-center">
                <div className="text-center">
                   <div className="text-sm font-bold text-slate-500 uppercase mb-2">Before Cleaning</div>
                   <div className="text-3xl font-black text-rose-500">55%</div>
                   <div className="text-xs text-rose-400">AI Accuracy</div>
                </div>
                {cStep === 5 && (
                  <div className="text-center animate-in zoom-in duration-500">
                     <div className="text-sm font-bold text-slate-500 uppercase mb-2">After Cleaning</div>
                     <div className="text-5xl font-black text-emerald-400 drop-shadow-[0_0_20px_rgba(52,211,153,0.5)]">88%</div>
                     <div className="text-xs text-emerald-300">AI Accuracy</div>
                  </div>
                )}
             </div>

             {cStep === 5 && (
               <div className="mt-12 bg-emerald-950/40 border-2 border-emerald-500 p-6 rounded-xl text-center animate-in slide-in-from-bottom">
                  <h4 className="text-2xl font-black text-emerald-400 uppercase tracking-widest mb-2 flex items-center gap-2 justify-center"><CheckCircle2 /> AI Model Ready</h4>
                  <p className="text-emerald-200">You successfully preprocessed the data. The AI can now make accurate predictions!</p>
               </div>
             )}
          </div>
        )}
      </div>
    </div>
  );
}
