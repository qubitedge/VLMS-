import { useState } from "react";
import { 
  FlaskConical, Zap, Swords, Crown, Shield, Activity, 
  GraduationCap, Target, Star, Play, CheckCircle2, ChevronRight
} from "lucide-react";

type ExpressionLabProps = {
  expId: string; // c-w4-1, c-w4-2, c-w4-3
};

export function ExpressionLaboratoryCampaign({ expId }: ExpressionLabProps) {
  const [xp, setXp] = useState(0);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const addXp = (amount: number, reason: string) => {
    setXp(x => x + amount);
    setSuccessMsg(`+${amount} XP: ${reason}`);
    setTimeout(() => setSuccessMsg(""), 3000);
  };

  const showError = (msg: string) => {
    setErrorMsg(msg);
    setTimeout(() => setErrorMsg(""), 3000);
  };

  // ---------------------------------------------------------
  // MISSION 1: STABILIZE ENERGY REACTOR (Precedence) - c-w4-1
  // ---------------------------------------------------------
  const [m1Step, setM1Step] = useState(0);
  
  const runM1 = async (guess: string) => {
    if (m1Step !== 0) return;
    
    if (guess !== "*") {
      showError("Incorrect! The reactor follows Operator Precedence. Multiplication has higher priority than addition.");
      return;
    }

    setM1Step(1); // Multiplies 5 * 2
    await new Promise(r => setTimeout(r, 1500));
    setM1Step(2); // Adds 10 + 10
    await new Promise(r => setTimeout(r, 1500));
    setM1Step(3); // Success
    addXp(100, "Formula Crystal Fragment Recovered!");
    
    setTimeout(() => setM1Step(0), 5000);
  };

  const renderMission1 = () => (
    <div className="flex flex-col h-full gap-4">
       <div className="flex-1 flex gap-4">
          <div className="flex-[1.5] bg-card rounded-xl border border-border p-6 flex flex-col items-center justify-center relative overflow-hidden">
             <div className="absolute inset-0 bg-cyan-500/5" />
             <h3 className="font-bold text-xl mb-12 flex items-center gap-2 z-10"><Zap className="size-6 text-cyan-500" /> Formula Reactor Core</h3>
             
             <div className="flex items-center gap-4 text-5xl font-black font-mono z-10">
                <div className={`transition-all duration-1000 ${m1Step >= 2 ? 'opacity-30' : ''}`}>10</div>
                <div className={`transition-all duration-1000 ${m1Step >= 2 ? 'opacity-30' : 'text-blue-500'}`}>+</div>
                
                <div className={`flex items-center gap-4 transition-all duration-1000 px-4 py-2 rounded-xl border-4
                  ${m1Step === 1 ? 'border-purple-500 bg-purple-500/20 scale-110 shadow-[0_0_30px_rgba(168,85,247,0.5)]' : 
                    m1Step >= 2 ? 'border-transparent bg-transparent opacity-30' : 'border-transparent'}
                `}>
                  <div>5</div>
                  <div className="text-purple-500">*</div>
                  <div>2</div>
                </div>
             </div>
             
             {/* Result overlay */}
             {m1Step >= 1 && (
               <div className="absolute top-1/2 left-1/2 -translate-x-1/2 translate-y-12 text-5xl font-black font-mono text-purple-400 animate-in slide-in-from-top-4">
                 10
               </div>
             )}
             
             {m1Step >= 2 && (
               <div className="absolute top-1/2 left-1/2 -translate-x-1/2 translate-y-32 flex items-center gap-4 text-6xl font-black font-mono animate-in slide-in-from-top-4">
                 <div>10</div>
                 <div className="text-blue-500">+</div>
                 <div>10</div>
                 <div className="text-white ml-8">= 20</div>
               </div>
             )}
          </div>
          
          <div className="flex-[1] bg-card rounded-xl border border-border p-6 flex flex-col relative">
             <h4 className="font-bold text-muted-foreground uppercase tracking-widest mb-6 border-b border-border pb-2">Reactor Controls</h4>
             <p className="text-sm mb-6">The reactor contains the expression <strong className="text-cyan-400">10 + 5 * 2</strong>.</p>
             <p className="font-bold mb-4">Which machine activates first?</p>
             
             <div className="flex flex-col gap-3">
               <button onClick={() => runM1("+")} disabled={m1Step !== 0} className="p-4 bg-secondary border border-border hover:border-blue-500 rounded-lg flex items-center gap-4 group transition-all">
                 <div className="size-10 rounded bg-blue-500/20 text-blue-500 flex items-center justify-center font-black text-2xl group-hover:bg-blue-500 group-hover:text-white">+</div>
                 <div className="font-bold text-left">Addition Machine<br/><span className="text-xs text-muted-foreground font-normal">Left to right</span></div>
               </button>
               
               <button onClick={() => runM1("*")} disabled={m1Step !== 0} className="p-4 bg-secondary border border-border hover:border-purple-500 rounded-lg flex items-center gap-4 group transition-all">
                 <div className="size-10 rounded bg-purple-500/20 text-purple-500 flex items-center justify-center font-black text-2xl group-hover:bg-purple-500 group-hover:text-white">*</div>
                 <div className="font-bold text-left">Multiplication Machine<br/><span className="text-xs text-muted-foreground font-normal">Higher Precedence</span></div>
               </button>
             </div>
             
             {m1Step === 3 && (
               <div className="mt-8 bg-green-500/20 border border-green-500/50 p-4 rounded-lg text-green-400 font-bold flex items-center gap-2 animate-in zoom-in">
                 <CheckCircle2 className="size-5" /> Stabilized! Operators follow precedence, not left-to-right reading.
               </div>
             )}
          </div>
       </div>
    </div>
  );

  // ---------------------------------------------------------
  // MISSION 2: ROYAL SELECTION ARENA (Max of 3) - c-w4-2
  // ---------------------------------------------------------
  const [m2W, setM2W] = useState([25, 40, 18]); // Warrior power levels
  const [m2Step, setM2Step] = useState(0);
  const [m2Winner, setM2Winner] = useState(-1);

  const runM2 = async (guessIndex: number) => {
    if (m2Step !== 0) return;
    
    if (m2W[guessIndex] !== Math.max(...m2W)) {
      showError("Incorrect! Compare their power levels carefully.");
      return;
    }
    
    setM2Step(1); // Comparing
    await new Promise(r => setTimeout(r, 1500));
    setM2Winner(1); // 40 wins
    setM2Step(2); // Crown
    addXp(150, "Comparison Rune Recovered!");
    
    setTimeout(() => {
      setM2Step(0); setM2Winner(-1);
    }, 4000);
  };

  const renderMission2 = () => (
    <div className="flex flex-col h-full gap-4">
       <div className="flex-1 bg-gradient-to-t from-red-950/20 to-transparent rounded-xl border border-red-900/30 p-6 flex flex-col items-center justify-center relative overflow-hidden">
          <Swords className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-64 text-red-500/5" />
          <h3 className="font-bold text-2xl mb-12 flex items-center gap-2 z-10 text-red-500 uppercase tracking-widest"><Shield className="size-6" /> Royal Selection Arena</h3>
          
          <div className="flex gap-12 z-10 items-end">
            {m2W.map((pwr, i) => (
              <div key={i} className="flex flex-col items-center gap-4">
                {m2Winner === i && <Crown className="size-12 text-yellow-500 animate-bounce" />}
                <button 
                  onClick={() => runM2(i)}
                  disabled={m2Step !== 0}
                  className={`w-24 bg-card border-4 flex flex-col items-center justify-end overflow-hidden transition-all duration-1000
                    ${m2Step === 1 ? 'border-yellow-500 shadow-[0_0_20px_rgba(234,179,8,0.5)] scale-105' : 
                      m2Winner === i ? 'border-yellow-400 bg-yellow-500/20 scale-125' : 
                      m2Winner !== -1 ? 'border-border opacity-30 scale-90' : 'border-border hover:border-red-500'}
                  `}
                  style={{ height: `${pwr * 4}px`, minHeight: '100px' }}
                >
                  <div className="font-black text-2xl mb-4">{pwr}</div>
                </button>
                <div className="font-bold text-muted-foreground uppercase tracking-widest text-sm">Warrior {i+1}</div>
              </div>
            ))}
          </div>
          
          {m2Step === 0 && <div className="absolute bottom-10 font-bold text-red-400 animate-pulse">Predict the Strongest Warrior!</div>}
          
          {m2Step === 1 && (
            <div className="absolute bottom-10 font-mono text-xl text-yellow-500 flex gap-8">
               <span>25 &lt; 40</span>
               <span>40 &gt; 18</span>
            </div>
          )}
       </div>
    </div>
  );

  // ---------------------------------------------------------
  // MISSION 3: ACADEMY EVALUATION CENTER (Averaging) - c-w4-3
  // ---------------------------------------------------------
  const m3Marks = [80, 75, 90, 85];
  const [m3Step, setM3Step] = useState(0);
  const [m3Avg, setM3Avg] = useState(0);

  const runM3 = async () => {
    if (m3Step !== 0) return;
    setM3Step(1); // Sum
    await new Promise(r => setTimeout(r, 1500));
    setM3Step(2); // Avg
    await new Promise(r => setTimeout(r, 1500));
    setM3Avg(82.5);
    setM3Step(3); // Result
    addXp(150, "Formula Crystal Recovered!");
    
    setTimeout(() => {
      setM3Step(0); setM3Avg(0);
    }, 4000);
  };

  const renderMission3 = () => (
    <div className="flex flex-col h-full gap-4">
       <div className="flex-1 flex gap-4">
          <div className="flex-[1] bg-card rounded-xl border border-border p-6 flex flex-col justify-center relative">
             <h3 className="font-bold text-xl mb-6 flex items-center gap-2"><GraduationCap className="size-6 text-indigo-500" /> Student Records</h3>
             <div className="flex flex-col gap-3">
               {m3Marks.map((m, i) => (
                 <div key={i} className={`bg-secondary p-3 rounded-lg flex justify-between items-center border-l-4 border-indigo-500 transition-all duration-500
                   ${m3Step >= 1 ? 'translate-x-full opacity-0' : ''}
                 `} style={{ transitionDelay: `${i * 200}ms` }}>
                   <span className="font-bold text-muted-foreground">Subject {i+1}</span>
                   <span className="font-black text-lg">{m}</span>
                 </div>
               ))}
             </div>
             <button onClick={runM3} disabled={m3Step !== 0} className="mt-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-lg disabled:opacity-50 flex items-center justify-center gap-2 w-full">
               <Activity className="size-5" /> Generate Report
             </button>
          </div>
          
          <div className="flex-[1.5] bg-card rounded-xl border border-border p-6 flex flex-col items-center justify-center relative overflow-hidden">
             <div className="absolute inset-0 bg-indigo-500/5" />
             
             <div className={`p-8 rounded-2xl border-4 bg-background w-full max-w-md transition-all duration-1000 flex flex-col items-center relative z-10
               ${m3Step === 1 ? 'border-blue-500 shadow-[0_0_30px_rgba(59,130,246,0.3)] animate-pulse' : 
                 m3Step >= 2 ? 'border-indigo-500 shadow-[0_0_30px_rgba(99,102,241,0.3)]' : 'border-border'}
             `}>
                <h4 className="font-bold text-muted-foreground uppercase tracking-widest mb-6">Grading Machine</h4>
                
                <div className="font-mono text-xl mb-8 flex flex-col items-center gap-2 text-center">
                  <span className="opacity-70">Total = 80 + 75 + 90 + 85</span>
                  {m3Step >= 1 && <span className="text-blue-500 font-bold mt-2">Total = 330</span>}
                  {m3Step >= 2 && <span className="text-indigo-500 font-bold mt-2">Average = 330 / 4</span>}
                </div>
                
                <div className="w-full h-px bg-border my-4" />
                
                <div className="flex flex-col items-center w-full mt-4">
                  <span className="text-sm font-bold text-muted-foreground uppercase mb-2">Performance Output</span>
                  <div className={`text-6xl font-black transition-all duration-1000 ${m3Step === 3 ? 'text-indigo-500' : 'text-transparent'}`}>
                    {m3Avg}%
                  </div>
                  
                  {/* Progress Bar */}
                  <div className="w-full h-4 bg-secondary rounded-full mt-6 overflow-hidden border border-border">
                    <div className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 transition-all duration-1000" style={{ width: `${m3Step === 3 ? m3Avg : 0}%` }} />
                  </div>
                </div>
             </div>
          </div>
       </div>
    </div>
  );

  return (
    <div className="flex flex-col h-full bg-slate-950/50 text-foreground p-6 overflow-hidden relative font-sans">
      {/* Top Panel - CodeVerse Theme */}
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-border shrink-0">
        <div>
          <h2 className="text-2xl font-black text-cyan-500 flex items-center gap-3 uppercase tracking-widest drop-shadow-[0_0_10px_rgba(6,182,212,0.3)]">
            <FlaskConical className="size-7 text-cyan-500" /> Expression Laboratory
          </h2>
        </div>
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2 bg-cyan-950/50 px-4 py-1.5 rounded-full border border-cyan-900 font-bold shadow-sm">
            <Star className="size-4 text-cyan-400" /> {xp} XP
          </div>
          <div className="text-sm font-bold text-cyan-600 uppercase tracking-widest">
             {expId === "c-w4-1" && "Mission: Energy Reactor"}
             {expId === "c-w4-2" && "Mission: Royal Selection"}
             {expId === "c-w4-3" && "Mission: Academy Evaluation"}
          </div>
        </div>
      </div>

      {errorMsg && (
        <div className="absolute top-24 left-1/2 -translate-x-1/2 bg-red-600 text-white px-6 py-3 rounded-lg shadow-xl animate-in slide-in-from-top-10 z-50 font-medium">
          {errorMsg}
        </div>
      )}
      {successMsg && (
        <div className="absolute top-24 left-1/2 -translate-x-1/2 bg-cyan-600 text-white px-6 py-3 rounded-lg shadow-xl animate-in slide-in-from-top-10 z-50 font-bold flex items-center gap-2">
          <Star className="size-5" /> {successMsg}
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex-1 min-h-0 overflow-y-auto">
        {expId === "c-w4-1" && renderMission1()}
        {expId === "c-w4-2" && renderMission2()}
        {expId === "c-w4-3" && renderMission3()}
      </div>
    </div>
  );
}
