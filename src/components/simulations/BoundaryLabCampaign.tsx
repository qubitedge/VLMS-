import { useState, useEffect } from "react";
import { 
  Swords, Edit3, Target, Layers, Box, AlertTriangle, ShieldCheck, 
  ArrowRight, CheckCircle2, Star, Check
} from "lucide-react";

export function BoundaryLabCampaign() {
  const [xp, setXp] = useState(0);
  const [successMsg, setSuccessMsg] = useState("");
  const [step, setStep] = useState(0); // 0: Start, 1: Draw, 2: Find Best, 3: Vectors, 4: Kernel, 5: Challenge
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
  const runDraw = async () => {
    setAnimState(1); 
    await new Promise(r => setTimeout(r, 2000));
    setAnimState(2); 
    addXp(50, "Boundary Tester!");
    setTimeout(() => nextStep(), 4000);
  };

  // Stage 2
  const runBestBoundary = async () => {
    setAnimState(1); 
    await new Promise(r => setTimeout(r, 2500));
    setAnimState(2); 
    addXp(50, "Margin Maximizer!");
    setTimeout(() => nextStep(), 4000);
  };

  // Stage 3
  const runVectors = async () => {
    setAnimState(1); 
    await new Promise(r => setTimeout(r, 2000));
    setAnimState(2); 
    addXp(50, "Vector Identifier!");
    setTimeout(() => nextStep(), 4000);
  };

  // Stage 4
  const runKernel = async () => {
    setAnimState(1); 
    await new Promise(r => setTimeout(r, 2000));
    setAnimState(2); 
    addXp(50, "Kernel Hacker!");
    setTimeout(() => nextStep(), 4000);
  };

  // Stage 5
  const [cResult, setCResult] = useState<string | null>(null);
  const checkChallenge = (type: string) => {
    if (type === "best") {
      setCResult("success");
      addXp(150, "SVM Master!");
    } else {
      setCResult("error");
    }
  };

  return (
    <div className="flex flex-col h-full bg-slate-950 text-foreground p-6 overflow-hidden relative font-sans">
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-800 shrink-0 z-20">
        <div>
          <h2 className="text-2xl font-black flex items-center gap-3 uppercase tracking-widest text-emerald-400 drop-shadow-[0_0_10px_rgba(52,211,153,0.3)]">
            <Swords className="size-7" /> 
            Boundary Lab
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
             <Layers className="size-24 text-emerald-500 mb-6 drop-shadow-[0_0_30px_rgba(16,185,129,0.5)]" />
             <h1 className="text-4xl font-black text-white uppercase tracking-widest mb-4">Draw the Perfect Boundary</h1>
             <p className="text-slate-400 max-w-xl text-lg mb-8">
               A wildlife organization wants to separate Cats 🐱 and Dogs 🐶 based on features. SVM finds the best dividing boundary.
             </p>
             <div className="bg-slate-900 p-8 rounded-xl border border-slate-700 mb-8 flex flex-col items-center w-full max-w-md h-48 relative justify-center">
                <div className="absolute top-10 left-16 text-3xl">🐱</div>
                <div className="absolute top-16 left-32 text-3xl">🐱</div>
                <div className="absolute top-8 right-24 text-3xl">🐱</div>
                
                <div className="absolute bottom-10 left-24 text-3xl">🐶</div>
                <div className="absolute bottom-16 right-32 text-3xl">🐶</div>
                <div className="absolute bottom-8 right-16 text-3xl">🐶</div>
             </div>
             <button onClick={nextStep} className="px-8 py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-[0_0_20px_rgba(16,185,129,0.4)] flex items-center gap-2">
               Start SVM Analysis <ArrowRight className="size-5" />
             </button>
          </div>
        )}

        {step === 1 && (
          <div className="flex flex-col items-center justify-center h-full animate-in slide-in-from-right">
             <h3 className="text-2xl font-bold text-amber-400 uppercase tracking-widest mb-8 flex items-center gap-2"><Edit3 className="size-6" /> Draw a Boundary</h3>
             
             <div className="w-full max-w-lg h-64 bg-slate-900 border-2 border-slate-700 rounded-xl mb-8 relative flex items-center justify-center overflow-hidden">
                <div className="absolute top-10 left-16 text-3xl">🐱</div>
                <div className="absolute top-24 left-32 text-3xl">🐱</div>
                
                <div className="absolute bottom-12 right-24 text-3xl">🐶</div>
                <div className="absolute bottom-24 right-40 text-3xl">🐶</div>

                {animState === 0 && (
                  <button onClick={runDraw} className="px-6 py-2 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-lg z-20 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 shadow-[0_0_15px_rgba(217,119,6,0.5)]">
                    Draw Line
                  </button>
                )}

                {animState >= 1 && (
                  <div className="absolute top-0 bottom-0 left-[40%] w-2 bg-rose-500 shadow-[0_0_15px_rgba(244,63,94,0.8)] -rotate-12 origin-center animate-in slide-in-from-top duration-500" />
                )}

                {animState === 2 && (
                  <div className="absolute top-8 left-[45%] text-rose-400 font-bold bg-rose-950/80 px-2 rounded animate-in fade-in">Bad Boundary!</div>
                )}
             </div>

             {animState === 2 && <p className="text-amber-400 font-bold animate-in fade-in bg-amber-950/40 px-4 py-2 rounded-lg">Not every line is good. Some cause classification mistakes.</p>}
          </div>
        )}

        {step === 2 && (
          <div className="flex flex-col items-center justify-center h-full animate-in slide-in-from-right">
             <h3 className="text-2xl font-bold text-fuchsia-400 uppercase tracking-widest mb-8 flex items-center gap-2"><Target className="size-6" /> Find Best Boundary</h3>
             
             <div className="w-full max-w-lg h-64 bg-slate-900 border-2 border-slate-700 rounded-xl mb-8 relative flex items-center justify-center overflow-hidden">
                <div className="absolute top-10 left-16 text-3xl">🐱</div>
                <div className="absolute top-24 left-32 text-3xl">🐱</div>
                <div className="absolute bottom-12 right-24 text-3xl">🐶</div>
                <div className="absolute bottom-24 right-40 text-3xl">🐶</div>

                {animState === 0 && (
                  <button onClick={runBestBoundary} className="px-6 py-2 bg-fuchsia-600 hover:bg-fuchsia-700 text-white font-bold rounded-lg z-20 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 shadow-[0_0_15px_rgba(217,70,239,0.5)]">
                    Run SVM
                  </button>
                )}

                {animState === 1 && (
                  <>
                     <div className="absolute top-0 bottom-0 left-[20%] w-1 bg-slate-600 rotate-45 origin-center animate-pulse" />
                     <div className="absolute top-0 bottom-0 left-[70%] w-1 bg-slate-600 -rotate-45 origin-center animate-pulse" />
                     <div className="absolute top-0 bottom-0 left-[50%] w-2 bg-emerald-400 shadow-[0_0_20px_rgba(52,211,153,0.8)] -rotate-45 origin-center opacity-50" />
                  </>
                )}

                {animState === 2 && (
                  <>
                    <div className="absolute top-0 bottom-0 left-[50%] w-2 bg-emerald-400 shadow-[0_0_20px_rgba(52,211,153,1)] -rotate-45 origin-center animate-in fade-in z-10" />
                    <div className="absolute top-0 bottom-0 left-[40%] w-px border-l-2 border-dashed border-emerald-500/50 -rotate-45 origin-center" />
                    <div className="absolute top-0 bottom-0 left-[60%] w-px border-l-2 border-dashed border-emerald-500/50 -rotate-45 origin-center" />
                  </>
                )}
             </div>

             {animState === 2 && <p className="text-fuchsia-400 font-bold animate-in fade-in bg-fuchsia-950/40 px-4 py-2 rounded-lg">SVM finds the line that maximizes the margin between classes.</p>}
          </div>
        )}

        {step === 3 && (
          <div className="flex flex-col items-center justify-center h-full animate-in slide-in-from-right">
             <h3 className="text-2xl font-bold text-cyan-400 uppercase tracking-widest mb-8 flex items-center gap-2"><Target className="size-6" /> Support Vectors</h3>
             
             <div className="w-full max-w-lg h-64 bg-slate-900 border-2 border-slate-700 rounded-xl mb-8 relative flex items-center justify-center overflow-hidden">
                <div className="absolute top-8 left-16 text-3xl">🐱</div>
                <div className={`absolute top-24 left-40 text-3xl transition-all duration-1000 ${animState >= 1 ? "scale-150 drop-shadow-[0_0_15px_rgba(6,182,212,1)]" : ""}`}>🐱</div>
                
                <div className={`absolute bottom-28 right-40 text-3xl transition-all duration-1000 ${animState >= 1 ? "scale-150 drop-shadow-[0_0_15px_rgba(6,182,212,1)]" : ""}`}>🐶</div>
                <div className="absolute bottom-8 right-16 text-3xl">🐶</div>

                <div className="absolute top-0 bottom-0 left-[50%] w-2 bg-emerald-400 shadow-[0_0_20px_rgba(52,211,153,0.8)] -rotate-45 origin-center z-10" />

                {animState === 0 && (
                  <button onClick={runVectors} className="px-6 py-2 bg-cyan-600 hover:bg-cyan-700 text-white font-bold rounded-lg z-20 absolute top-10 right-10 shadow-[0_0_15px_rgba(6,182,212,0.5)]">
                    Highlight Vectors
                  </button>
                )}

                {animState === 2 && (
                  <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-cyan-950/80 border border-cyan-500/50 text-cyan-400 font-bold px-4 py-2 rounded animate-in slide-in-from-bottom">
                     These points decide the boundary!
                  </div>
                )}
             </div>

             {animState === 2 && <p className="text-cyan-400 font-bold animate-in fade-in">Support Vectors are the most important points closest to the margin.</p>}
          </div>
        )}

        {step === 4 && (
          <div className="flex flex-col items-center justify-center h-full animate-in slide-in-from-right">
             <h3 className="text-2xl font-bold text-indigo-400 uppercase tracking-widest mb-8 flex items-center gap-2"><Box className="size-6" /> Non-Linear Data & Kernel Trick</h3>
             
             {animState === 0 && (
               <button onClick={runKernel} className="px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-[0_0_20px_rgba(79,70,229,0.4)] mb-8">
                 Apply Kernel Machine
               </button>
             )}

             <div className={`w-full max-w-lg h-64 border-2 rounded-xl mb-8 relative flex items-center justify-center overflow-hidden transition-all duration-1000 ${animState >= 1 ? "bg-indigo-950 border-indigo-500 shadow-[0_0_30px_rgba(99,102,241,0.3)] perspective-1000" : "bg-slate-900 border-slate-700"}`}>
                
                <div className={`transition-all duration-1000 ${animState >= 1 ? "rotate-x-60 scale-75" : ""}`}>
                   {/* Center Cats */}
                   <div className="absolute top-[40%] left-[45%] text-2xl">🐱</div>
                   <div className="absolute top-[50%] left-[40%] text-2xl">🐱</div>
                   <div className="absolute top-[45%] left-[55%] text-2xl">🐱</div>
                   
                   {/* Outer Dogs */}
                   <div className="absolute top-[10%] left-[50%] text-2xl">🐶</div>
                   <div className="absolute bottom-[10%] left-[50%] text-2xl">🐶</div>
                   <div className="absolute top-[50%] left-[10%] text-2xl">🐶</div>
                   <div className="absolute top-[50%] right-[10%] text-2xl">🐶</div>
                </div>

                {animState >= 1 && (
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-40 border-4 border-emerald-400 rounded-full rotate-x-60 shadow-[0_0_20px_rgba(52,211,153,0.8)] animate-in fade-in duration-1000" />
                )}

                {animState === 2 && (
                  <div className="absolute top-4 bg-indigo-900/80 px-4 py-2 rounded text-indigo-300 font-bold border border-indigo-500/50 animate-in slide-in-from-top">
                     2D transformed to 3D Space!
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

        {step === 5 && (
          <div className="flex flex-col items-center justify-center h-full animate-in slide-in-from-right">
             <ShieldCheck className="size-16 text-emerald-400 mb-6 drop-shadow-[0_0_20px_rgba(52,211,153,0.4)]" />
             <h3 className="text-3xl font-black text-white uppercase tracking-widest mb-2">Final Challenge</h3>
             <p className="text-slate-400 mb-8 max-w-xl text-center">Choose the best SVM boundary line for the dataset.</p>
             
             <div className="w-full max-w-3xl grid grid-cols-2 gap-6 mb-8">
                <button 
                  onClick={()=>checkChallenge("bad")}
                  className={`bg-slate-900 border-2 rounded-xl p-6 text-center hover:bg-slate-800 transition-colors ${cResult === "error" ? "border-rose-500 opacity-50" : "border-slate-700"}`}
                >
                   <div className="h-32 relative mb-4 overflow-hidden rounded bg-slate-950">
                      <div className="absolute top-6 left-8 text-xl">🐱</div>
                      <div className="absolute bottom-6 right-8 text-xl">🐶</div>
                      <div className="absolute top-0 bottom-0 left-[30%] w-1 bg-amber-500" />
                   </div>
                   <div className="font-bold text-slate-300">Boundary too close to Cats</div>
                </button>

                <button 
                  onClick={()=>checkChallenge("best")}
                  className={`bg-slate-900 border-2 rounded-xl p-6 text-center hover:bg-slate-800 transition-colors ${cResult === "success" ? "border-emerald-500 shadow-[0_0_20px_rgba(16,185,129,0.3)] bg-emerald-950/20" : "border-slate-700"}`}
                >
                   <div className="h-32 relative mb-4 overflow-hidden rounded bg-slate-950">
                      <div className="absolute top-6 left-8 text-xl">🐱</div>
                      <div className="absolute bottom-6 right-8 text-xl">🐶</div>
                      <div className="absolute top-0 bottom-0 left-[50%] w-1 bg-emerald-500 -rotate-45" />
                   </div>
                   <div className="font-bold text-slate-300">Perfectly Centered Boundary</div>
                </button>
             </div>

             {cResult === "error" && <div className="text-rose-400 font-bold animate-in shake bg-rose-950/40 px-6 py-3 rounded-lg border border-rose-500/50">Accuracy drops! Margin is not maximized.</div>}

             {cResult === "success" && (
               <div className="text-emerald-400 font-bold uppercase tracking-widest animate-in zoom-in bg-emerald-950/40 p-4 border border-emerald-500/50 rounded-xl mt-4">
                 <CheckCircle2 className="size-8 mx-auto mb-2" /> Optimal Boundary Chosen!
               </div>
             )}
          </div>
        )}
      </div>
    </div>
  );
}
