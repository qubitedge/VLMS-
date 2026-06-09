import { useState, useEffect } from "react";
import { 
  BrainCircuit, Activity, Network, Target, AlertTriangle, ShieldCheck, 
  ArrowRight, CheckCircle2, Star, Cpu
} from "lucide-react";

export function NeuralNetworkLabCampaign() {
  const [xp, setXp] = useState(0);
  const [successMsg, setSuccessMsg] = useState("");
  const [step, setStep] = useState(0); // 0: Start, 1: Input, 2: Hidden, 3: Output, 4: Training, 5: Backprop, 6: Challenge
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
  const runInput = async () => {
    setAnimState(1); 
    await new Promise(r => setTimeout(r, 2000));
    setAnimState(2); 
    addXp(50, "Sensor Activated!");
    setTimeout(() => nextStep(), 3000);
  };

  // Stage 2
  const runHidden = async () => {
    setAnimState(1); 
    await new Promise(r => setTimeout(r, 2000));
    setAnimState(2); 
    addXp(50, "Pattern Learner!");
    setTimeout(() => nextStep(), 3000);
  };

  // Stage 3
  const runOutput = async () => {
    setAnimState(1); 
    await new Promise(r => setTimeout(r, 2000));
    setAnimState(2); 
    addXp(50, "Decision Node!");
    setTimeout(() => nextStep(), 3000);
  };

  // Stage 4
  const [epoch, setEpoch] = useState(0);
  const [accuracy, setAccuracy] = useState(20);
  const runTraining = async () => {
    setAnimState(1);
    
    for(let i=1; i<=50; i+=5) {
      setEpoch(i);
      setAccuracy(Math.min(96, 20 + i * 1.6));
      await new Promise(r => setTimeout(r, 200));
    }
    
    setAnimState(2); 
    addXp(100, "Epoch Runner!");
    setTimeout(() => nextStep(), 4000);
  };

  // Stage 5
  const runBackprop = async () => {
    setAnimState(1); 
    await new Promise(r => setTimeout(r, 2000));
    setAnimState(2); 
    addXp(50, "Error Corrector!");
    setTimeout(() => nextStep(), 4000);
  };

  // Stage 6 Challenge
  const [neurons, setNeurons] = useState(10);
  const [challengeAcc, setChallengeAcc] = useState(45);
  
  const handleNeuronChange = (val: number) => {
    setNeurons(val);
    
    if (val < 30) setChallengeAcc(45 + val);
    else if (val <= 80) setChallengeAcc(90 + (val - 30) * 0.1);
    else setChallengeAcc(95 - (val - 80) * 0.2); // Overfit/slow drop
    
    if (val === 60 && animState === 0) {
      setAnimState(1);
      addXp(150, "Architect of AI!");
    }
  };

  return (
    <div className="flex flex-col h-full bg-slate-950 text-foreground p-6 overflow-hidden relative font-sans">
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-800 shrink-0 z-20">
        <div>
          <h2 className="text-2xl font-black flex items-center gap-3 uppercase tracking-widest text-fuchsia-400 drop-shadow-[0_0_10px_rgba(217,70,239,0.3)]">
            <BrainCircuit className="size-7" /> 
            Neural Network Lab
          </h2>
        </div>
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2 bg-fuchsia-950/50 px-4 py-1.5 rounded-full border border-fuchsia-900 font-bold shadow-sm text-fuchsia-100">
            <Star className="size-4 text-fuchsia-400" /> {xp} XP
          </div>
        </div>
      </div>

      {successMsg && (
        <div className="absolute top-24 left-1/2 -translate-x-1/2 bg-fuchsia-600 text-white px-6 py-3 rounded-lg shadow-xl animate-in slide-in-from-top-10 z-50 font-bold flex items-center gap-2">
          <Star className="size-5 fill-white" /> {successMsg}
        </div>
      )}

      <div className="flex-1 min-h-0 overflow-y-auto">
        {step === 0 && (
          <div className="h-full flex flex-col items-center justify-center text-center animate-in zoom-in duration-500">
             <BrainCircuit className="size-24 text-fuchsia-500 mb-6 drop-shadow-[0_0_30px_rgba(217,70,239,0.5)]" />
             <h1 className="text-4xl font-black text-white uppercase tracking-widest mb-4">Build Your First AI Brain</h1>
             <p className="text-slate-400 max-w-xl text-lg mb-8">
               The company wants to build an AI system that recognizes handwritten digits. You must train a Multi-Layer Perceptron (MLP) Neural Network.
             </p>
             <div className="flex justify-center items-center gap-8 bg-slate-900 p-8 rounded-xl border border-slate-700 mb-8 w-full max-w-2xl">
                <div className="flex flex-col items-center">
                   <div className="bg-slate-950 border border-slate-800 rounded p-4 text-4xl font-mono text-white filter blur-[1px]">5</div>
                   <div className="text-xs text-slate-500 font-bold uppercase mt-2">Input Image</div>
                </div>
                <ArrowRight className="size-6 text-slate-600" />
                <div className="flex flex-col items-center">
                   <Network className="size-16 text-fuchsia-500/50" />
                   <div className="text-xs text-slate-500 font-bold uppercase mt-2">Hidden Layers</div>
                </div>
                <ArrowRight className="size-6 text-slate-600" />
                <div className="flex flex-col items-center">
                   <div className="text-4xl font-black text-fuchsia-400">5</div>
                   <div className="text-xs text-slate-500 font-bold uppercase mt-2">Prediction</div>
                </div>
             </div>
             <button onClick={nextStep} className="px-8 py-4 bg-fuchsia-600 hover:bg-fuchsia-700 text-white font-bold rounded-xl shadow-[0_0_20px_rgba(217,70,239,0.4)] flex items-center gap-2">
               Initialize Network <ArrowRight className="size-5" />
             </button>
          </div>
        )}

        {step === 1 && (
          <div className="flex flex-col items-center justify-center h-full animate-in slide-in-from-right">
             <h3 className="text-2xl font-bold text-cyan-400 uppercase tracking-widest mb-8 flex items-center gap-2"><Cpu className="size-6" /> Input Layer</h3>
             
             <div className="w-full max-w-xl flex h-64 bg-slate-900 border-2 border-slate-700 rounded-xl mb-8 p-8 relative overflow-hidden justify-center items-center gap-16">
                
                <div className="bg-slate-950 border border-slate-800 rounded p-4 text-5xl font-mono text-white">5</div>
                <ArrowRight className="size-6 text-slate-600" />
                
                <div className="flex flex-col gap-2">
                   {[...Array(5)].map((_, i) => (
                     <div key={i} className={`size-4 rounded-full transition-all duration-500 ${animState >= 1 ? "bg-cyan-400 shadow-[0_0_10px_rgba(6,182,212,0.8)]" : "bg-slate-800"}`} />
                   ))}
                </div>

                {animState === 0 && (
                  <button onClick={runInput} className="px-6 py-2 bg-cyan-600 hover:bg-cyan-700 text-white font-bold rounded-lg z-20 absolute top-4 left-1/2 -translate-x-1/2 shadow-[0_0_15px_rgba(6,182,212,0.5)]">
                    Load Image Pixels
                  </button>
                )}

                {animState === 2 && (
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-cyan-950/80 px-4 py-1 border border-cyan-500/50 text-cyan-400 font-bold rounded animate-in slide-in-from-bottom">
                     784 Pixels = 784 Input Nodes
                  </div>
                )}
             </div>

             {animState === 2 && <p className="text-cyan-400 font-bold animate-in fade-in bg-cyan-950/40 px-4 py-2 rounded-lg">Neural Networks receive many inputs simultaneously.</p>}
          </div>
        )}

        {step === 2 && (
          <div className="flex flex-col items-center justify-center h-full animate-in slide-in-from-right">
             <h3 className="text-2xl font-bold text-fuchsia-400 uppercase tracking-widest mb-8 flex items-center gap-2"><Network className="size-6" /> Hidden Layer</h3>
             
             <div className="w-full max-w-xl bg-slate-900 border-2 border-slate-700 rounded-xl mb-8 p-8 relative flex justify-center h-64 overflow-hidden">
                
                <div className="flex justify-between w-full relative z-10 px-8">
                   <div className="flex flex-col justify-between py-4">
                      {[...Array(3)].map((_,i)=><div key={i} className="size-4 bg-cyan-500 rounded-full" />)}
                   </div>
                   <div className="flex flex-col justify-between py-2">
                      {[...Array(4)].map((_,i)=><div key={i} className={`size-6 rounded-full transition-all duration-1000 ${animState >= 1 ? "bg-fuchsia-500 shadow-[0_0_15px_rgba(217,70,239,0.8)]" : "bg-slate-800"}`} />)}
                   </div>
                   <div className="flex flex-col justify-between py-4">
                      {[...Array(3)].map((_,i)=><div key={i} className="size-4 bg-emerald-500 rounded-full" />)}
                   </div>
                </div>

                {animState >= 1 && (
                  <div className="absolute inset-0 flex items-center justify-center opacity-50 z-0">
                     <svg className="w-full h-full">
                        <line x1="20%" y1="20%" x2="50%" y2="50%" stroke="#d946ef" strokeWidth="2" strokeDasharray="4" className="animate-pulse" />
                        <line x1="20%" y1="80%" x2="50%" y2="50%" stroke="#d946ef" strokeWidth="2" strokeDasharray="4" className="animate-pulse delay-100" />
                        <line x1="50%" y1="50%" x2="80%" y2="20%" stroke="#d946ef" strokeWidth="2" strokeDasharray="4" className="animate-pulse delay-200" />
                        <line x1="50%" y1="50%" x2="80%" y2="80%" stroke="#d946ef" strokeWidth="2" strokeDasharray="4" className="animate-pulse delay-300" />
                     </svg>
                  </div>
                )}

                {animState === 0 && (
                  <button onClick={runHidden} className="px-6 py-2 bg-fuchsia-600 hover:bg-fuchsia-700 text-white font-bold rounded-lg z-20 absolute top-4 shadow-[0_0_15px_rgba(217,70,239,0.5)]">
                    Activate Connections
                  </button>
                )}
             </div>

             {animState === 2 && <p className="text-fuchsia-400 font-bold animate-in fade-in bg-fuchsia-950/40 px-4 py-2 rounded-lg">Hidden layers learn complex, non-linear patterns.</p>}
          </div>
        )}

        {step === 3 && (
          <div className="flex flex-col items-center justify-center h-full animate-in slide-in-from-right">
             <h3 className="text-2xl font-bold text-emerald-400 uppercase tracking-widest mb-8 flex items-center gap-2"><Target className="size-6" /> Output Layer</h3>
             
             <div className="w-full max-w-lg bg-slate-900 border-2 border-slate-700 rounded-xl mb-8 p-8 flex flex-col items-center relative">
                
                {animState === 0 && (
                  <button onClick={runOutput} className="px-6 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-lg z-20 shadow-[0_0_15px_rgba(16,185,129,0.5)] mb-8">
                    View Probabilities
                  </button>
                )}

                {animState >= 1 && (
                  <div className="grid grid-cols-5 gap-4 w-full mb-8 animate-in zoom-in">
                     <div className="bg-slate-800 p-2 text-center rounded"><div className="text-slate-400 text-xs font-bold mb-1">0</div><div className="text-white">0.01</div></div>
                     <div className="bg-slate-800 p-2 text-center rounded"><div className="text-slate-400 text-xs font-bold mb-1">1</div><div className="text-white">0.03</div></div>
                     <div className="bg-slate-800 p-2 text-center rounded"><div className="text-slate-400 text-xs font-bold mb-1">2</div><div className="text-white">0.02</div></div>
                     <div className="bg-emerald-950/50 border border-emerald-500 p-2 text-center rounded shadow-[0_0_10px_rgba(16,185,129,0.3)]"><div className="text-emerald-400 text-xs font-bold mb-1">5</div><div className="text-emerald-400 font-black">0.89</div></div>
                     <div className="bg-slate-800 p-2 text-center rounded"><div className="text-slate-400 text-xs font-bold mb-1">7</div><div className="text-white">0.04</div></div>
                  </div>
                )}

                {animState === 2 && (
                  <div className="text-3xl font-black text-emerald-400 animate-in slide-in-from-bottom">
                     Prediction = 5
                  </div>
                )}
             </div>

             {animState === 2 && <p className="text-emerald-400 font-bold animate-in fade-in">Highest probability node wins the classification.</p>}
          </div>
        )}

        {step === 4 && (
          <div className="flex flex-col items-center justify-center h-full animate-in slide-in-from-right">
             <h3 className="text-2xl font-bold text-amber-400 uppercase tracking-widest mb-8 flex items-center gap-2"><Activity className="size-6" /> Training Process</h3>
             
             <div className="w-full max-w-xl bg-slate-900 border-2 border-slate-700 rounded-xl mb-8 p-8 flex flex-col items-center">
                
                <div className="flex w-full justify-between items-center bg-slate-950 p-6 rounded-xl border border-slate-800 mb-8">
                   <div className="text-center">
                      <div className="text-sm font-bold text-slate-500 uppercase mb-2">Epoch</div>
                      <div className="text-4xl font-mono text-cyan-400">{epoch}</div>
                   </div>
                   <div className="text-center">
                      <div className="text-sm font-bold text-slate-500 uppercase mb-2">Accuracy</div>
                      <div className={`text-5xl font-black transition-colors duration-300 ${accuracy > 90 ? "text-emerald-400" : accuracy > 60 ? "text-amber-400" : "text-rose-500"}`}>
                         {accuracy.toFixed(1)}%
                      </div>
                   </div>
                </div>

                {animState === 0 && (
                  <button onClick={runTraining} className="px-10 py-4 bg-amber-600 hover:bg-amber-700 text-white font-bold text-xl rounded-xl shadow-[0_0_20px_rgba(217,119,6,0.5)]">
                    TRAIN
                  </button>
                )}

                {animState >= 1 && animState < 2 && (
                  <div className="text-amber-400 font-bold animate-pulse">Training in progress...</div>
                )}

                {animState === 2 && (
                  <div className="text-emerald-400 font-bold uppercase tracking-widest animate-in zoom-in bg-emerald-950/40 px-6 py-3 border border-emerald-500/50 rounded-xl">
                    <CheckCircle2 className="size-6 inline mb-1 mr-2" /> Training Complete
                  </div>
                )}
             </div>

             {animState === 2 && (
               <button onClick={nextStep} className="px-8 py-3 bg-gradient-to-r from-amber-600 to-rose-600 hover:from-amber-500 hover:to-rose-500 text-white font-bold rounded-xl animate-in zoom-in shadow-[0_0_20px_rgba(244,63,94,0.4)]">
                 Understand How <ArrowRight className="size-5 inline" />
               </button>
             )}
          </div>
        )}

        {step === 5 && (
          <div className="flex flex-col items-center justify-center h-full animate-in slide-in-from-right">
             <h3 className="text-2xl font-bold text-rose-400 uppercase tracking-widest mb-8 flex items-center gap-2"><ArrowRight className="size-6 rotate-180" /> Backpropagation</h3>
             
             <div className="w-full max-w-lg bg-slate-900 border-2 border-slate-700 rounded-xl mb-8 p-8 relative flex flex-col items-center justify-center h-64 overflow-hidden">
                
                {animState === 0 && (
                  <button onClick={runBackprop} className="px-6 py-2 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-lg z-20 shadow-[0_0_15px_rgba(244,63,94,0.5)] absolute top-4">
                    Send Error Signal
                  </button>
                )}

                <div className="flex flex-col w-full gap-8 mt-12 px-12 relative z-10">
                   <div className="flex justify-between items-center w-full">
                      <div className="text-slate-500 font-bold">Output</div>
                      <div className="size-8 bg-slate-800 rounded-full" />
                   </div>
                   <div className="flex justify-between items-center w-full">
                      <div className="text-slate-500 font-bold">Hidden</div>
                      <div className="size-8 bg-slate-800 rounded-full" />
                   </div>
                   <div className="flex justify-between items-center w-full">
                      <div className="text-slate-500 font-bold">Input</div>
                      <div className="size-8 bg-slate-800 rounded-full" />
                   </div>
                </div>

                {animState >= 1 && (
                  <div className="absolute right-[4.5rem] top-1/4 bottom-1/4 w-1 bg-rose-500 z-0">
                     <div className="size-4 bg-white rounded-full absolute -left-1.5 animate-bounce shadow-[0_0_15px_white]" />
                  </div>
                )}

                {animState === 2 && (
                  <div className="absolute inset-0 bg-rose-950/80 flex items-center justify-center px-8 text-center animate-in fade-in z-20">
                     <p className="text-rose-400 font-bold text-lg">Neural Networks learn from mistakes.<br/>Error signal travels backward to adjust weights.</p>
                  </div>
                )}
             </div>

             {animState === 2 && (
               <button onClick={nextStep} className="px-8 py-3 bg-gradient-to-r from-fuchsia-600 to-indigo-600 text-white font-bold rounded-xl animate-in zoom-in shadow-[0_0_20px_rgba(217,70,239,0.4)] mt-4">
                 Final AI Challenge <ArrowRight className="size-5 inline" />
               </button>
             )}
          </div>
        )}

        {step === 6 && (
          <div className="flex flex-col items-center justify-center h-full animate-in slide-in-from-right">
             <ShieldCheck className="size-16 text-emerald-400 mb-6 drop-shadow-[0_0_20px_rgba(52,211,153,0.4)]" />
             <h3 className="text-3xl font-black text-white uppercase tracking-widest mb-2">Final Challenge</h3>
             <p className="text-slate-400 mb-8 max-w-xl text-center">Design the optimal Hidden Layer to achieve &gt; 90% accuracy without overfitting or slowing down training.</p>
             
             <div className="w-full max-w-2xl bg-slate-900 border-2 border-slate-700 rounded-xl mb-8 p-8 flex flex-col items-center">
                <div className="text-3xl font-black text-fuchsia-400 mb-6">{neurons} Hidden Neurons</div>
                <input 
                  type="range" 
                  min="5" max="150" step="5" 
                  value={neurons} 
                  onChange={(e) => handleNeuronChange(parseInt(e.target.value))} 
                  className="w-full accent-fuchsia-500 cursor-pointer mb-8"
                />

                <div className="w-full bg-slate-950 p-6 rounded-xl border border-slate-800 flex justify-between items-center">
                   <div className="text-center w-1/3">
                      <div className="text-xs font-bold text-slate-500 uppercase mb-2">Complexity</div>
                      <div className={`text-xl font-bold ${neurons > 100 ? "text-rose-500" : neurons > 50 ? "text-amber-400" : "text-emerald-400"}`}>
                        {neurons > 100 ? "Too High (Slow)" : neurons > 50 ? "Moderate" : "Low (Fast)"}
                      </div>
                   </div>
                   <div className="text-center w-1/3 border-l border-r border-slate-800">
                      <div className="text-xs font-bold text-slate-500 uppercase mb-2">Capacity</div>
                      <div className={`text-xl font-bold ${neurons < 30 ? "text-rose-500" : neurons < 80 ? "text-emerald-400" : "text-amber-400"}`}>
                        {neurons < 30 ? "Underfitting" : neurons < 80 ? "Optimal" : "Overfitting Risk"}
                      </div>
                   </div>
                   <div className="text-center w-1/3">
                      <div className="text-xs font-bold text-slate-500 uppercase mb-2">Accuracy</div>
                      <div className={`text-4xl font-black ${challengeAcc >= 90 ? "text-emerald-400 drop-shadow-[0_0_10px_rgba(52,211,153,0.5)]" : "text-rose-500"}`}>
                         {challengeAcc.toFixed(1)}%
                      </div>
                   </div>
                </div>
             </div>

             {animState === 1 && (
               <div className="text-emerald-400 font-bold uppercase tracking-widest animate-in zoom-in bg-emerald-950/40 p-4 border border-emerald-500/50 rounded-xl">
                 <CheckCircle2 className="size-8 mx-auto mb-2" /> Artificial Brain Built!
               </div>
             )}
          </div>
        )}
      </div>
    </div>
  );
}
