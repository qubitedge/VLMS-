import { useState, useEffect } from "react";
import { 
  Cloud, Rainbow, SplitSquareHorizontal, Move, Target, Split, ShieldCheck, 
  ArrowRight, CheckCircle2, Star, Plus
} from "lucide-react";

export function MembershipIntelligenceLabCampaign() {
  const [xp, setXp] = useState(0);
  const [successMsg, setSuccessMsg] = useState("");
  const [step, setStep] = useState(0); // 0: Start, 1: Compare, 2: Assign, 3: Move, 4: Heatmap, 5: Challenge
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
  const runCompare = async () => {
    setAnimState(1); 
    await new Promise(r => setTimeout(r, 2000));
    setAnimState(2); 
    addXp(50, "Fuzzy Thinker!");
    setTimeout(() => nextStep(), 3000);
  };

  // Stage 2
  const runAssign = async () => {
    setAnimState(1); 
    await new Promise(r => setTimeout(r, 2000));
    setAnimState(2); 
    addXp(50, "Membership Analyst!");
    setTimeout(() => nextStep(), 3000);
  };

  // Stage 3
  const runMove = async () => {
    setAnimState(1); 
    await new Promise(r => setTimeout(r, 2500));
    setAnimState(2); 
    addXp(50, "Weighted Centroid!");
    setTimeout(() => nextStep(), 4000);
  };

  // Stage 4
  const runHeatmap = async () => {
    setAnimState(1); 
    await new Promise(r => setTimeout(r, 2000));
    setAnimState(2); 
    addXp(50, "Uncertainty Mapper!");
    setTimeout(() => nextStep(), 3000);
  };

  // Stage 5 Challenge
  const [membership, setMembership] = useState(50);
  const handleMembershipChange = (val: number) => {
    setMembership(val);
    if (val === 85 && animState === 0) {
      setAnimState(1);
      addXp(150, "Fuzzy Master!");
    }
  };

  return (
    <div className="flex flex-col h-full bg-slate-950 text-foreground p-6 overflow-hidden relative font-sans">
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-800 shrink-0 z-20">
        <div>
          <h2 className="text-2xl font-black flex items-center gap-3 uppercase tracking-widest text-sky-400 drop-shadow-[0_0_10px_rgba(56,189,248,0.3)]">
            <Cloud className="size-7" /> 
            Membership Intelligence Lab
          </h2>
        </div>
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2 bg-sky-950/50 px-4 py-1.5 rounded-full border border-sky-900 font-bold shadow-sm text-sky-100">
            <Star className="size-4 text-sky-400" /> {xp} XP
          </div>
        </div>
      </div>

      {successMsg && (
        <div className="absolute top-24 left-1/2 -translate-x-1/2 bg-sky-600 text-white px-6 py-3 rounded-lg shadow-xl animate-in slide-in-from-top-10 z-50 font-bold flex items-center gap-2">
          <Star className="size-5 fill-white" /> {successMsg}
        </div>
      )}

      <div className="flex-1 min-h-0 overflow-y-auto">
        {step === 0 && (
          <div className="h-full flex flex-col items-center justify-center text-center animate-in zoom-in duration-500">
             <Rainbow className="size-24 text-sky-500 mb-6 drop-shadow-[0_0_30px_rgba(56,189,248,0.5)]" />
             <h1 className="text-4xl font-black text-white uppercase tracking-widest mb-4">Soft Customer Grouping</h1>
             <p className="text-slate-400 max-w-xl text-lg mb-8">
               Some customers belong to multiple groups. K-Means forces them into one. Learn to use Fuzzy C-Means for soft clustering.
             </p>
             <div className="bg-slate-900 p-6 rounded-xl border border-slate-700 mb-8 font-mono text-sm tracking-widest text-slate-300 w-full max-w-md">
                <div className="text-sky-400 font-bold mb-4 uppercase">Customer Profile: "Gamer Athlete"</div>
                <div className="flex justify-between border-b border-slate-800 py-2"><span>Gaming Interest</span> <span className="font-bold text-white">70%</span></div>
                <div className="flex justify-between py-2"><span>Sports Interest</span> <span className="font-bold text-white">30%</span></div>
             </div>
             <button onClick={nextStep} className="px-8 py-4 bg-sky-600 hover:bg-sky-700 text-white font-bold rounded-xl shadow-[0_0_20px_rgba(56,189,248,0.4)] flex items-center gap-2">
               Explore Fuzzy Logic <ArrowRight className="size-5" />
             </button>
          </div>
        )}

        {step === 1 && (
          <div className="flex flex-col items-center justify-center h-full animate-in slide-in-from-right">
             <h3 className="text-2xl font-bold text-cyan-400 uppercase tracking-widest mb-8 flex items-center gap-2"><SplitSquareHorizontal className="size-6" /> Hard vs Soft Clustering</h3>
             
             <div className="w-full max-w-2xl flex gap-8 mb-8">
                <div className="flex-1 bg-slate-900 border-2 border-slate-700 rounded-xl p-8 flex flex-col items-center">
                   <div className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-8">K-Means (Hard)</div>
                   <div className="size-16 rounded-full bg-rose-500 flex items-center justify-center text-white font-black text-xl shadow-[0_0_20px_rgba(244,63,94,0.5)]">100%</div>
                </div>
                <div className="flex-1 bg-slate-900 border-2 border-sky-500/50 rounded-xl p-8 flex flex-col items-center relative overflow-hidden">
                   <div className="text-sm font-bold text-sky-400 uppercase tracking-widest mb-8 z-10">Fuzzy C-Means (Soft)</div>
                   <div className={`size-16 rounded-full flex items-center justify-center text-white font-black text-xl z-10 transition-all duration-1000 ${animState >= 1 ? "shadow-[0_0_30px_rgba(56,189,248,0.8)]" : "bg-slate-700"}`} style={{ background: animState >= 1 ? "linear-gradient(90deg, #f43f5e 70%, #3b82f6 30%)" : "" }}>
                     {animState >= 1 ? "Mixed" : "?"}
                   </div>
                   
                   {animState === 0 && (
                     <button onClick={runCompare} className="px-6 py-2 bg-sky-600 hover:bg-sky-700 text-white font-bold rounded-lg z-20 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 shadow-[0_0_15px_rgba(56,189,248,0.5)] whitespace-nowrap">
                       Apply Soft Cluster
                     </button>
                   )}
                </div>
             </div>

             {animState === 2 && <p className="text-cyan-400 font-bold animate-in fade-in bg-cyan-950/40 px-4 py-2 rounded-lg">Fuzzy points belong partially to multiple clusters simultaneously.</p>}
          </div>
        )}

        {step === 2 && (
          <div className="flex flex-col items-center justify-center h-full animate-in slide-in-from-right">
             <h3 className="text-2xl font-bold text-fuchsia-400 uppercase tracking-widest mb-8 flex items-center gap-2"><Target className="size-6" /> Membership Assignment</h3>
             
             <div className="w-full max-w-lg bg-slate-900 border-2 border-slate-700 rounded-xl mb-8 p-8 flex flex-col items-center relative">
                
                {animState === 0 && (
                  <button onClick={runAssign} className="px-6 py-2 bg-fuchsia-600 hover:bg-fuchsia-700 text-white font-bold rounded-lg z-20 shadow-[0_0_15px_rgba(217,70,239,0.5)] mb-8">
                    Calculate Memberships
                  </button>
                )}

                <div className="w-full space-y-6">
                   <div>
                     <div className="flex justify-between text-xs font-bold text-slate-400 uppercase mb-2"><span>Cluster A</span> <span className="text-rose-400">{animState >= 1 ? "70%" : "0%"}</span></div>
                     <div className="w-full h-4 bg-slate-800 rounded-full overflow-hidden">
                        <div className="h-full bg-rose-500 transition-all duration-1000 ease-out" style={{ width: animState >= 1 ? "70%" : "0%" }} />
                     </div>
                   </div>
                   <div>
                     <div className="flex justify-between text-xs font-bold text-slate-400 uppercase mb-2"><span>Cluster B</span> <span className="text-blue-400">{animState >= 1 ? "20%" : "0%"}</span></div>
                     <div className="w-full h-4 bg-slate-800 rounded-full overflow-hidden">
                        <div className="h-full bg-blue-500 transition-all duration-1000 ease-out delay-100" style={{ width: animState >= 1 ? "20%" : "0%" }} />
                     </div>
                   </div>
                   <div>
                     <div className="flex justify-between text-xs font-bold text-slate-400 uppercase mb-2"><span>Cluster C</span> <span className="text-emerald-400">{animState >= 1 ? "10%" : "0%"}</span></div>
                     <div className="w-full h-4 bg-slate-800 rounded-full overflow-hidden">
                        <div className="h-full bg-emerald-500 transition-all duration-1000 ease-out delay-200" style={{ width: animState >= 1 ? "10%" : "0%" }} />
                     </div>
                   </div>
                </div>

                {animState === 2 && (
                  <div className="text-center font-bold text-fuchsia-400 mt-8 animate-in slide-in-from-bottom">
                     Total Membership always equals 100%
                  </div>
                )}
             </div>
          </div>
        )}

        {step === 3 && (
          <div className="flex flex-col items-center justify-center h-full animate-in slide-in-from-right">
             <h3 className="text-2xl font-bold text-amber-400 uppercase tracking-widest mb-8 flex items-center gap-2"><Move className="size-6" /> Update Weighted Centers</h3>
             
             <div className="bg-slate-900 w-full max-w-lg h-64 rounded-xl border-2 border-slate-700 mb-8 relative flex items-center justify-center overflow-hidden">
                <div className="absolute top-10 left-10 size-16 rounded-full bg-rose-500/20 flex items-center justify-center"><div className="size-4 bg-rose-500 rounded-full" /></div>
                
                <div className="absolute bottom-20 left-16 text-xs font-bold text-slate-500">70% Weight</div>
                <div className="absolute bottom-10 right-20 text-xs font-bold text-slate-500">30% Weight</div>

                <div className={`absolute size-6 rounded-full border-2 border-white transition-all duration-[2000ms] ease-in-out z-10 bg-gradient-to-r from-rose-500 to-blue-500 ${animState >= 1 ? "top-[40%] left-[30%] shadow-[0_0_20px_white]" : "top-1/2 left-1/2"}`} />

                {animState === 0 && (
                  <button onClick={runMove} className="px-6 py-2 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-lg z-20 absolute top-10 right-10 shadow-[0_0_15px_rgba(217,119,6,0.5)]">
                    Update Centroid
                  </button>
                )}

                {animState >= 1 && (
                  <svg className="absolute inset-0 w-full h-full z-0 pointer-events-none">
                     <line x1="30%" y1="40%" x2="4rem" y2="2.5rem" stroke="rgba(244,63,94,0.5)" strokeWidth="4" />
                     <line x1="30%" y1="40%" x2="80%" y2="80%" stroke="rgba(59,130,246,0.2)" strokeWidth="1" />
                  </svg>
                )}

                {animState === 2 && (
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-amber-950/80 px-4 py-2 rounded border border-amber-500 text-amber-400 font-bold text-center text-xs animate-in slide-in-from-bottom w-3/4">
                     Strong members (70%) pull the cluster center much harder than weak members (30%).
                  </div>
                )}
             </div>
          </div>
        )}

        {step === 4 && (
          <div className="flex flex-col items-center justify-center h-full animate-in slide-in-from-right">
             <h3 className="text-2xl font-bold text-indigo-400 uppercase tracking-widest mb-8 flex items-center gap-2"><Split className="size-6" /> Membership Heat Map</h3>
             
             <div className="bg-slate-900 w-full max-w-lg h-64 rounded-xl border-2 border-slate-700 mb-8 flex items-center justify-center relative overflow-hidden">
                
                {animState === 0 && (
                  <button onClick={runHeatmap} className="px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-lg z-20 shadow-[0_0_15px_rgba(79,70,229,0.5)]">
                    Visualize Uncertainty
                  </button>
                )}

                {animState >= 1 && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="absolute size-32 rounded-full bg-rose-500/30 blur-2xl -translate-x-16" />
                    <div className="absolute size-32 rounded-full bg-blue-500/30 blur-2xl translate-x-16" />
                    
                    <div className="flex gap-16 z-10">
                       <div className="text-center"><div className="size-8 rounded-full bg-rose-500 mb-2 shadow-[0_0_15px_rgba(244,63,94,0.8)]" /><span className="text-xs font-bold text-rose-400">90% Certain</span></div>
                       <div className="text-center mt-8"><div className="size-8 rounded-full bg-gradient-to-r from-rose-500 to-blue-500 mb-2 shadow-[0_0_15px_white]" /><span className="text-xs font-bold text-white">50/50 Uncertain</span></div>
                       <div className="text-center"><div className="size-8 rounded-full bg-blue-500 mb-2 shadow-[0_0_15px_rgba(59,130,246,0.8)]" /><span className="text-xs font-bold text-blue-400">90% Certain</span></div>
                    </div>
                  </div>
                )}
             </div>

             {animState === 2 && (
               <button onClick={nextStep} className="px-8 py-3 bg-gradient-to-r from-indigo-600 to-sky-600 hover:from-indigo-500 hover:to-sky-500 text-white font-bold rounded-xl animate-in zoom-in shadow-[0_0_20px_rgba(56,189,248,0.4)] mt-4">
                 Final Challenge <ArrowRight className="size-5 inline" />
               </button>
             )}
          </div>
        )}

        {step === 5 && (
          <div className="flex flex-col items-center justify-center h-full animate-in slide-in-from-right">
             <ShieldCheck className="size-16 text-sky-400 mb-6 drop-shadow-[0_0_20px_rgba(56,189,248,0.4)]" />
             <h3 className="text-3xl font-black text-white uppercase tracking-widest mb-2">Final Challenge</h3>
             <p className="text-slate-400 mb-8 max-w-xl text-center">Identify the borderline customer. A hard assignment (K-Means) would misclassify them, but Fuzzy C-Means captures their mixed behavior.</p>
             
             <div className="w-full max-w-2xl bg-slate-900 border-2 border-slate-700 rounded-xl mb-8 p-8 flex flex-col items-center">
                <div className="text-2xl font-black text-sky-400 mb-6 border-b border-sky-500/30 pb-2">Customer Profile Analysis</div>
                
                <div className="flex w-full justify-between items-center bg-slate-950 p-6 rounded-xl border border-slate-800 mb-8">
                   <div className="text-center w-1/3">
                      <div className="text-xs font-bold text-slate-500 uppercase mb-2">Gamer (Cluster A)</div>
                      <div className={`text-3xl font-black text-rose-500`}>{membership}%</div>
                   </div>
                   <div className="w-px h-16 bg-slate-800" />
                   <div className="text-center w-1/3">
                      <div className="text-xs font-bold text-slate-500 uppercase mb-2">Athlete (Cluster B)</div>
                      <div className={`text-3xl font-black text-blue-500`}>{100 - membership}%</div>
                   </div>
                </div>

                <input 
                  type="range" 
                  min="0" max="100" step="5" 
                  value={membership} 
                  onChange={(e) => handleMembershipChange(parseInt(e.target.value))} 
                  className="w-full accent-sky-500 cursor-pointer mb-4"
                />
                <div className="text-center text-sm font-bold text-slate-500 uppercase">Find the clear Gamer Profile (85% Gamer)</div>
             </div>

             {animState === 1 && (
               <div className="text-sky-400 font-bold uppercase tracking-widest animate-in zoom-in bg-sky-950/40 p-4 border border-sky-500/50 rounded-xl">
                 <CheckCircle2 className="size-8 mx-auto mb-2" /> Fuzzy Profile Identified!
               </div>
             )}
          </div>
        )}
      </div>
    </div>
  );
}
