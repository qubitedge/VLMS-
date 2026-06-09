import { useState } from "react";
import { 
  Crown, MountainSnow, Zap, Portal, Calculator, CalendarClock,
  ArrowRight, Activity, ArrowDown, Search, CheckCircle2, Star, Shield
} from "lucide-react";

type DecisionKingdomProps = {
  expId: string; // c-w5-1, c-w5-2, c-w5-3, c-w5-4, c-w5-5
};

export function DecisionKingdomCampaign({ expId }: DecisionKingdomProps) {
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
  // MISSION 1: MOUNTAIN OF NUMBERS (Max/Min of 4) - c-w5-1
  // ---------------------------------------------------------
  const m1Mts = [45, 78, 12, 56];
  const [m1Step, setM1Step] = useState(0);
  const [m1Scanning, setM1Scanning] = useState(-1);

  const runM1 = async () => {
    if (m1Step !== 0) return;
    setM1Step(1);
    for (let i = 0; i < m1Mts.length; i++) {
      setM1Scanning(i);
      await new Promise(r => setTimeout(r, 800));
    }
    setM1Scanning(-1);
    setM1Step(2);
    addXp(100, "Decision Rune I Recovered!");
    
    setTimeout(() => setM1Step(0), 5000);
  };

  const renderMission1 = () => (
    <div className="flex flex-col h-full gap-4">
       <div className="flex-1 bg-gradient-to-t from-blue-950/30 to-transparent rounded-xl border border-blue-900/30 p-6 flex flex-col items-center justify-end relative overflow-hidden">
          <h3 className="absolute top-6 left-6 font-bold text-xl flex items-center gap-2 z-10 text-blue-400 uppercase tracking-widest"><MountainSnow className="size-6" /> Mountain of Numbers</h3>
          
          {m1Step === 0 && <button onClick={runM1} className="absolute top-6 right-6 bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-2 rounded-lg shadow-lg z-20 flex items-center gap-2">Launch Drone Scan <Search className="size-4" /></button>}

          <div className="flex gap-4 items-end w-full justify-around z-10 h-full pt-20">
            {m1Mts.map((val, i) => {
              const isMax = m1Step === 2 && val === Math.max(...m1Mts);
              const isMin = m1Step === 2 && val === Math.min(...m1Mts);
              
              return (
                <div key={i} className="flex flex-col items-center relative">
                  {/* Drone Scanner */}
                  {m1Scanning === i && <div className="absolute -top-16 text-cyan-400 animate-bounce"><Search className="size-8" /></div>}
                  {m1Scanning === i && <div className="absolute top-0 w-full h-[200%] bg-cyan-400/20 -z-10 animate-pulse" />}
                  
                  {/* Result Flags */}
                  {isMax && <div className="absolute -top-16 text-green-500 animate-in slide-in-from-bottom-4 font-bold flex flex-col items-center"><Crown className="size-8 mb-1" /> Highest</div>}
                  {isMin && <div className="absolute -top-16 text-red-500 animate-in slide-in-from-bottom-4 font-bold flex flex-col items-center"><ArrowDown className="size-8 mb-1" /> Lowest</div>}

                  {/* Mountain Visual */}
                  <div className={`w-32 rounded-t-[3rem] border-t-8 border-x-4 border-b-0 flex flex-col items-center justify-start pt-6 transition-all duration-1000
                    ${isMax ? 'bg-green-950/40 border-green-500 shadow-[0_-20px_40px_rgba(34,197,94,0.3)]' : 
                      isMin ? 'bg-red-950/40 border-red-500 shadow-[0_-20px_40px_rgba(239,68,68,0.3)]' : 'bg-slate-900 border-slate-700'}
                  `} style={{ height: `${val * 3}px`, minHeight: '100px' }}>
                     <div className="font-black text-2xl mb-2">{val}</div>
                  </div>
                </div>
              );
            })}
          </div>
       </div>
    </div>
  );

  // ---------------------------------------------------------
  // MISSION 2: ENERGY BILLING DEPARTMENT (if-else if) - c-w5-2
  // ---------------------------------------------------------
  const [m2Units, setM2Units] = useState(250);
  const [m2Step, setM2Step] = useState(0);

  const runM2 = () => {
    setM2Step(1);
    addXp(100, "Decision Rune II Recovered!");
    setTimeout(() => setM2Step(0), 4000);
  };

  const getActiveSlab = () => {
    if (m2Units <= 100) return 0;
    if (m2Units <= 300) return 1;
    return 2;
  };

  const renderMission2 = () => (
    <div className="flex flex-col h-full gap-4">
       <div className="flex-1 flex gap-4">
          <div className="flex-[1] bg-card rounded-xl border border-border p-6 flex flex-col justify-center relative">
             <h3 className="font-bold text-xl mb-12 flex items-center gap-2"><Zap className="size-6 text-yellow-500" /> Smart Grid Meter</h3>
             
             <div className="text-7xl font-black text-yellow-500 drop-shadow-md mb-8 text-center bg-secondary/50 p-6 rounded-xl border border-yellow-500/30">
               {m2Units} <span className="text-xl text-muted-foreground uppercase">Units</span>
             </div>
             
             <input type="range" min="0" max="500" value={m2Units} onChange={e=>{setM2Units(Number(e.target.value)); setM2Step(0);}} className="w-full accent-yellow-500" />
             
             <button onClick={runM2} disabled={m2Step !== 0} className="mt-12 py-4 bg-yellow-600 hover:bg-yellow-700 text-white font-bold rounded-xl shadow-lg disabled:opacity-50 flex items-center justify-center gap-2 w-full">
               Generate Bill
             </button>
          </div>
          
          <div className="flex-[1.5] bg-card rounded-xl border border-border p-6 flex flex-col justify-center relative overflow-hidden">
             <h4 className="font-bold text-muted-foreground uppercase tracking-widest mb-6">Conditional Billing Slabs</h4>
             
             <div className="flex flex-col gap-4">
                {[
                  { range: "0 - 100", rate: "$1.50/unit", condition: "units <= 100", color: "border-green-500 text-green-500 bg-green-500/10" },
                  { range: "101 - 300", rate: "$2.50/unit", condition: "units <= 300", color: "border-yellow-500 text-yellow-500 bg-yellow-500/10" },
                  { range: "301+", rate: "$4.00/unit", condition: "else", color: "border-red-500 text-red-500 bg-red-500/10" }
                ].map((slab, i) => (
                  <div key={i} className={`p-4 rounded-xl border-2 transition-all duration-500 flex justify-between items-center
                    ${m2Step === 1 && getActiveSlab() === i ? `${slab.color} shadow-[0_0_20px_currentColor] scale-105` : 'border-border bg-secondary/30 opacity-50'}
                  `}>
                     <div>
                       <div className="font-mono text-sm opacity-80 mb-1">if ({slab.condition})</div>
                       <div className="font-bold text-2xl">{slab.range} Units</div>
                     </div>
                     <div className="text-xl font-black">{slab.rate}</div>
                  </div>
                ))}
             </div>
          </div>
       </div>
    </div>
  );

  // ---------------------------------------------------------
  // MISSION 3: PORTAL STABILITY CENTER (Quadratic Roots) - c-w5-3
  // ---------------------------------------------------------
  const [m3A, setM3A] = useState(1);
  const [m3B, setM3B] = useState(-5);
  const [m3C, setM3C] = useState(6);
  const [m3Step, setM3Step] = useState(0);
  const [m3D, setM3D] = useState(0);

  const runM3 = () => {
    setM3Step(1); // Calculate Discriminant
    const disc = (m3B * m3B) - (4 * m3A * m3C);
    setM3D(disc);
    setTimeout(() => {
      setM3Step(2); // Show Portal
      addXp(150, "Portal Rune Recovered!");
    }, 1500);
    setTimeout(() => setM3Step(0), 6000);
  };

  const getPortalState = () => {
    if (m3D > 0) return { title: "Two Real Roots", color: "from-blue-500 to-cyan-500", shadow: "shadow-[0_0_50px_rgba(59,130,246,0.6)]" };
    if (m3D === 0) return { title: "Equal Roots", color: "from-green-500 to-emerald-500", shadow: "shadow-[0_0_50px_rgba(34,197,94,0.6)]" };
    return { title: "Imaginary Roots", color: "from-purple-500 to-fuchsia-500", shadow: "shadow-[0_0_50px_rgba(168,85,247,0.6)]" };
  };

  const renderMission3 = () => (
    <div className="flex flex-col h-full gap-4">
       <div className="flex-1 flex gap-4">
          <div className="flex-[1] bg-card rounded-xl border border-border p-6 flex flex-col justify-center">
             <h3 className="font-bold text-xl mb-6 flex items-center gap-2"><Activity className="size-6 text-fuchsia-500" /> Portal Equation</h3>
             
             <div className="flex items-center justify-center gap-2 text-2xl font-mono mb-8 font-bold">
               <input type="number" value={m3A} onChange={e=>setM3A(Number(e.target.value))} className="w-16 bg-secondary border border-border rounded text-center text-fuchsia-500" /> x² + 
               <input type="number" value={m3B} onChange={e=>setM3B(Number(e.target.value))} className="w-16 bg-secondary border border-border rounded text-center text-fuchsia-500" /> x + 
               <input type="number" value={m3C} onChange={e=>setM3C(Number(e.target.value))} className="w-16 bg-secondary border border-border rounded text-center text-fuchsia-500" /> = 0
             </div>
             
             {m3Step >= 1 && (
               <div className="bg-secondary p-4 rounded-xl border border-border mb-8 animate-in slide-in-from-left-4">
                 <div className="text-sm font-bold text-muted-foreground uppercase tracking-widest mb-2">Discriminant Analyzer</div>
                 <div className="font-mono text-lg">d = b² - 4ac</div>
                 <div className="font-mono text-xl text-fuchsia-500 font-bold mt-2">d = {m3D}</div>
               </div>
             )}
             
             <button onClick={runM3} disabled={m3Step !== 0} className="mt-auto py-4 bg-fuchsia-600 hover:bg-fuchsia-700 text-white font-bold rounded-xl shadow-lg disabled:opacity-50">
               Stabilize Portal
             </button>
          </div>
          
          <div className="flex-[1] bg-slate-950 rounded-xl border border-slate-800 p-6 flex flex-col items-center justify-center relative overflow-hidden">
             {m3Step === 2 ? (
               <div className={`size-64 rounded-full bg-gradient-to-tr ${getPortalState().color} ${getPortalState().shadow} flex items-center justify-center animate-spin-slow`}>
                  <div className="size-48 rounded-full bg-slate-950 flex flex-col items-center justify-center text-center p-4">
                    <div className="font-bold text-white uppercase tracking-widest leading-tight">{getPortalState().title}</div>
                  </div>
               </div>
             ) : (
               <div className="size-64 rounded-full border-4 border-dashed border-slate-800 flex items-center justify-center">
                 <span className="text-slate-700 font-bold uppercase tracking-widest">Portal Offline</span>
               </div>
             )}
          </div>
       </div>
    </div>
  );

  // ---------------------------------------------------------
  // MISSION 4: COMMAND CONSOLE (Switch Case) - c-w5-4
  // ---------------------------------------------------------
  const [m4Op, setM4Op] = useState<string | null>(null);

  const runM4 = (op: string) => {
    setM4Op(op);
    addXp(50, "Switch Rune Recovered!");
    setTimeout(() => setM4Op(null), 3000);
  };

  const renderMission4 = () => (
    <div className="flex flex-col h-full gap-4 items-center justify-center">
       <div className="bg-card rounded-2xl border border-border p-8 max-w-2xl w-full text-center">
          <Calculator className="size-16 text-emerald-500 mx-auto mb-6" />
          <h3 className="font-bold text-2xl mb-2">Utility Robot Command</h3>
          <p className="text-muted-foreground mb-8">Select an operation to switch the robot's task mode.</p>
          
          <div className="flex justify-center gap-4 mb-12">
            {['+', '-', '*', '/'].map(op => (
              <button key={op} onClick={() => runM4(op)} className="size-16 bg-secondary hover:bg-emerald-500 hover:text-white border border-border rounded-xl font-black text-3xl transition-colors">
                {op}
              </button>
            ))}
          </div>
          
          <div className="h-32 bg-slate-950 rounded-xl border-4 border-slate-800 flex items-center justify-center relative overflow-hidden">
             {m4Op ? (
               <div className="text-emerald-500 font-mono text-2xl font-bold animate-in slide-in-from-bottom-4">
                 switch ( '{m4Op}' ) <ArrowRight className="inline mx-2" /> Executing case '{m4Op}':
               </div>
             ) : (
               <div className="text-slate-700 font-mono text-lg animate-pulse">Waiting for switch input...</div>
             )}
          </div>
       </div>
    </div>
  );

  // ---------------------------------------------------------
  // MISSION 5: TIME GUARDIAN (Leap Year) - c-w5-5
  // ---------------------------------------------------------
  const [m5Y, setM5Y] = useState(2024);
  const [m5Step, setM5Step] = useState(0);

  const isLeap = (m5Y % 4 === 0 && m5Y % 100 !== 0) || (m5Y % 400 === 0);

  const runM5 = () => {
    setM5Step(1);
    addXp(100, "Time Rune Recovered!");
    setTimeout(() => setM5Step(0), 4000);
  };

  const renderMission5 = () => (
    <div className="flex flex-col h-full gap-4 items-center justify-center">
       <div className="bg-gradient-to-b from-indigo-950 to-slate-950 rounded-2xl border border-indigo-900/50 p-8 max-w-2xl w-full text-center relative overflow-hidden">
          <CalendarClock className="size-16 text-indigo-400 mx-auto mb-6" />
          <h3 className="font-bold text-2xl mb-8 text-indigo-300">Cosmic Calendar</h3>
          
          <div className="text-6xl font-black text-white drop-shadow-[0_0_20px_rgba(129,140,248,0.5)] mb-8">
             <input type="number" value={m5Y} onChange={e=>{setM5Y(Number(e.target.value)); setM5Step(0);}} className="bg-transparent border-none text-center outline-none w-48" />
          </div>
          
          <button onClick={runM5} disabled={m5Step !== 0} className="px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-lg disabled:opacity-50 mb-12">
            Analyze Timeline
          </button>
          
          {m5Step === 1 && (
            <div className={`p-6 rounded-xl border-2 font-black text-3xl uppercase tracking-widest animate-in zoom-in duration-500
              ${isLeap ? 'bg-green-950/50 border-green-500 text-green-400 shadow-[0_0_30px_rgba(34,197,94,0.3)]' : 'bg-red-950/50 border-red-500 text-red-400 shadow-[0_0_30px_rgba(239,68,68,0.3)]'}
            `}>
               {isLeap ? 'Leap Year' : 'Not a Leap Year'}
            </div>
          )}
       </div>
    </div>
  );

  return (
    <div className="flex flex-col h-full bg-slate-950/80 text-foreground p-6 overflow-hidden relative font-sans">
      {/* Top Panel - CodeVerse Theme */}
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-border shrink-0">
        <div>
          <h2 className="text-2xl font-black text-purple-400 flex items-center gap-3 uppercase tracking-widest drop-shadow-[0_0_10px_rgba(192,132,252,0.3)]">
            <Crown className="size-7 text-purple-400" /> Decision Kingdom
          </h2>
        </div>
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2 bg-purple-950/50 px-4 py-1.5 rounded-full border border-purple-900 font-bold shadow-sm">
            <Star className="size-4 text-purple-400" /> {xp} XP
          </div>
          <div className="text-sm font-bold text-purple-300 uppercase tracking-widest">
             {expId === "c-w5-1" && "Mission: Peak Analyzer"}
             {expId === "c-w5-2" && "Mission: Billing System"}
             {expId === "c-w5-3" && "Mission: Portal Generator"}
             {expId === "c-w5-4" && "Mission: Utility Robot"}
             {expId === "c-w5-5" && "Mission: Time Calendar"}
          </div>
        </div>
      </div>

      {errorMsg && (
        <div className="absolute top-24 left-1/2 -translate-x-1/2 bg-red-600 text-white px-6 py-3 rounded-lg shadow-xl animate-in slide-in-from-top-10 z-50 font-medium">
          {errorMsg}
        </div>
      )}
      {successMsg && (
        <div className="absolute top-24 left-1/2 -translate-x-1/2 bg-purple-600 text-white px-6 py-3 rounded-lg shadow-xl animate-in slide-in-from-top-10 z-50 font-bold flex items-center gap-2">
          <Star className="size-5" /> {successMsg}
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex-1 min-h-0 overflow-y-auto">
        {expId === "c-w5-1" && renderMission1()}
        {expId === "c-w5-2" && renderMission2()}
        {expId === "c-w5-3" && renderMission3()}
        {expId === "c-w5-4" && renderMission4()}
        {expId === "c-w5-5" && renderMission5()}
      </div>
    </div>
  );
}
