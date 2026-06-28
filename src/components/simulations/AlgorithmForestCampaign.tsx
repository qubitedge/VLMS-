import { useState, useEffect } from "react";
import { 
  Trees, ArrowRight, ArrowDown, Calculator, CloudRain, Sun, 
  Coins, Landmark, Droplets, Target, Star, Leaf, Play
} from "lucide-react";

type AlgorithmForestProps = {
  expId: string; // c-w2-1, c-w2-2, c-w2-3
};

export function AlgorithmForestCampaign({ expId }: AlgorithmForestProps) {
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
  // MISSION 1: TREASURE ACCOUNTANT (Sum & Average) - c-w2-1
  // ---------------------------------------------------------
  const [m1Coins, setM1Coins] = useState([10, 20, 30, 40]);
  const [m1Step, setM1Step] = useState(0); // 0: Idle, 1: Addition, 2: Div, 3: Done
  const [m1Sum, setM1Sum] = useState(0);
  const [m1Avg, setM1Avg] = useState(0);

  const runM1 = async () => {
    if (m1Step !== 0) return;
    setM1Step(1); // Summing
    let sum = 0;
    for (let i = 0; i < m1Coins.length; i++) {
      sum += m1Coins[i];
      setM1Sum(sum);
      await new Promise(r => setTimeout(r, 600));
    }
    
    setM1Step(2); // Averaging
    await new Promise(r => setTimeout(r, 1000));
    setM1Avg(sum / m1Coins.length);
    setM1Step(3);
    addXp(100, "Logic Rune I Recovered!");
    
    setTimeout(() => {
      setM1Step(0); setM1Sum(0); setM1Avg(0);
    }, 4000);
  };

  const renderMission1 = () => (
    <div className="flex flex-col h-full gap-4">
       <div className="flex-1 flex gap-4">
          <div className="flex-[1] bg-card rounded-xl border border-border p-6 flex flex-col items-center justify-center relative overflow-hidden">
             {/* Background glow */}
             <div className="absolute inset-0 bg-yellow-500/5" />
             
             <h3 className="font-bold text-xl mb-8 flex items-center gap-2 z-10"><Landmark className="size-6 text-yellow-500" /> Treasure Vault</h3>
             
             <div className="flex gap-4 mb-12 z-10">
                {m1Coins.map((val, i) => (
                  <div key={i} className={`size-16 rounded-full flex flex-col items-center justify-center font-black text-xl border-4 transition-all duration-500
                    ${m1Step >= 1 ? 'bg-yellow-500 border-yellow-400 text-yellow-950 shadow-[0_0_20px_rgba(234,179,8,0.5)] translate-y-24 opacity-0' : 'bg-yellow-600/20 border-yellow-500 text-yellow-500'}
                  `} style={{ transitionDelay: `${i * 600}ms` }}>
                     {val}
                  </div>
                ))}
             </div>
             
             <button onClick={runM1} disabled={m1Step !== 0} className="px-8 py-3 bg-yellow-600 hover:bg-yellow-700 text-white font-bold rounded-xl shadow-lg z-10 disabled:opacity-50 flex items-center gap-2">
               <Calculator className="size-5" /> Calculate Treasure
             </button>
          </div>
          
          <div className="flex-[1.5] bg-card rounded-xl border border-border p-6 flex flex-col items-center relative overflow-hidden">
             <div className="absolute inset-0 flex flex-col justify-between items-center py-10 opacity-10 pointer-events-none">
               <div className="w-1 h-full bg-foreground" />
             </div>
             
             <div className="flex flex-col gap-6 w-full max-w-md relative z-10">
                <div className={`p-4 rounded-xl border-2 transition-all duration-500 bg-background flex flex-col items-center
                  ${m1Step === 1 ? 'border-blue-500 shadow-[0_0_20px_rgba(59,130,246,0.2)] scale-105' : 'border-border'}
                `}>
                   <div className="text-muted-foreground font-bold text-sm uppercase tracking-widest mb-2">Step 1: Addition</div>
                   <div className="text-4xl font-black text-blue-500">Sum = {m1Sum}</div>
                </div>
                
                <div className="flex justify-center"><ArrowDown className="size-6 text-muted-foreground" /></div>
                
                <div className={`p-4 rounded-xl border-2 transition-all duration-500 bg-background flex flex-col items-center
                  ${m1Step >= 2 ? 'border-green-500 shadow-[0_0_20px_rgba(34,197,94,0.2)] scale-105' : 'border-border opacity-50'}
                `}>
                   <div className="text-muted-foreground font-bold text-sm uppercase tracking-widest mb-2">Step 2: Division</div>
                   <div className="text-xl font-bold mb-2">{m1Sum} ÷ {m1Coins.length} count</div>
                   <div className="text-4xl font-black text-green-500">Avg = {m1Avg}</div>
                </div>
             </div>
          </div>
       </div>
    </div>
  );

  // ---------------------------------------------------------
  // MISSION 2: WEATHER CONTROL STATION (F to C) - c-w2-2
  // ---------------------------------------------------------
  const [m2F, setM2F] = useState(100);
  const [m2Step, setM2Step] = useState(0); // 0: Idle, 1: Calculate, 2: Done
  const [m2C, setM2C] = useState(0);

  const runM2 = async () => {
    if (m2Step !== 0) return;
    setM2Step(1); // Calculate
    await new Promise(r => setTimeout(r, 1500));
    const cel = ((m2F - 32) * 5) / 9;
    setM2C(cel);
    setM2Step(2);
    addXp(100, "Logic Rune II Recovered!");
    
    setTimeout(() => {
      setM2Step(0); setM2C(0);
    }, 4000);
  };

  const renderMission2 = () => (
    <div className="flex flex-col h-full gap-4">
       <div className="flex-1 flex gap-4">
          <div className="flex-[1] bg-gradient-to-br from-orange-500/20 to-red-500/20 rounded-xl border border-red-500/30 p-6 flex flex-col items-center justify-center relative">
             <Sun className="absolute top-8 right-8 size-24 text-orange-500/30 animate-spin-slow" />
             <h3 className="font-bold text-xl mb-8 flex items-center gap-2"><Target className="size-6 text-orange-500" /> Weather Sensor</h3>
             
             <div className="text-7xl font-black text-orange-500 drop-shadow-md mb-8">
               {m2F}°F
             </div>
             
             <input type="range" min="-40" max="212" value={m2F} onChange={e=>{setM2F(Number(e.target.value)); setM2Step(0);}} className="w-full max-w-xs accent-orange-500" />
             
             <button onClick={runM2} disabled={m2Step !== 0} className="mt-12 px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-lg disabled:opacity-50 flex items-center gap-2">
               Restore Climate <ArrowRight className="size-4" />
             </button>
          </div>
          
          <div className="flex-[1.5] bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-xl border border-blue-500/30 p-6 flex flex-col items-center justify-center relative overflow-hidden">
             <CloudRain className="absolute top-8 left-8 size-24 text-blue-500/20" />
             
             <div className={`flex flex-col items-center bg-card p-8 rounded-2xl border-4 transition-all duration-1000 z-10
               ${m2Step === 1 ? 'border-purple-500 shadow-[0_0_30px_rgba(168,85,247,0.3)] animate-pulse' : 
                 m2Step === 2 ? 'border-cyan-500 shadow-[0_0_30px_rgba(6,182,212,0.3)]' : 'border-border'}
             `}>
               <h4 className="font-bold text-muted-foreground uppercase tracking-widest mb-4">Conversion Chamber</h4>
               
               <div className="font-mono text-2xl mb-8 bg-secondary px-6 py-3 rounded-lg border border-border">
                 C = (<span className="text-orange-500 font-bold">{m2F}</span> - 32) × 5 / 9
               </div>
               
               <div className={`text-6xl font-black transition-all duration-1000 ${m2Step === 2 ? 'text-cyan-500' : 'text-transparent'}`}>
                 {m2C.toFixed(2)}°C
               </div>
             </div>
          </div>
       </div>
    </div>
  );

  // ---------------------------------------------------------
  // MISSION 3: MERCHANT GUILD TREASURY (Simple Interest) - c-w2-3
  // ---------------------------------------------------------
  const [m3P, setM3P] = useState(1000);
  const [m3R, setM3R] = useState(10);
  const [m3T, setM3T] = useState(2);
  const [m3Step, setM3Step] = useState(0);
  const [m3I, setM3I] = useState(0);

  const runM3 = async () => {
    if (m3Step !== 0) return;
    setM3Step(1); 
    await new Promise(r => setTimeout(r, 1500));
    setM3I((m3P * m3R * m3T) / 100);
    setM3Step(2);
    addXp(150, "Logic Crystal Recovered!");
    
    setTimeout(() => {
      setM3Step(0); setM3I(0);
    }, 4000);
  };

  const renderMission3 = () => (
    <div className="flex flex-col h-full gap-4">
       <div className="flex-1 flex gap-4">
          <div className="flex-[1] bg-card rounded-xl border border-border p-6 flex flex-col justify-center">
             <h3 className="font-bold text-xl mb-6 flex items-center gap-2"><Landmark className="size-6 text-emerald-500" /> Merchant Inputs</h3>
             
             <div className="flex flex-col gap-4">
                <div className="bg-secondary p-3 rounded-lg flex items-center justify-between border border-border">
                  <span className="font-bold text-muted-foreground">Principal (P)</span>
                  <input type="number" value={m3P} onChange={e=>{setM3P(Number(e.target.value)); setM3Step(0);}} className="w-24 bg-background border border-border rounded px-2 py-1 text-right font-bold text-emerald-500" />
                </div>
                <div className="bg-secondary p-3 rounded-lg flex items-center justify-between border border-border">
                  <span className="font-bold text-muted-foreground">Rate (R%)</span>
                  <input type="number" value={m3R} onChange={e=>{setM3R(Number(e.target.value)); setM3Step(0);}} className="w-24 bg-background border border-border rounded px-2 py-1 text-right font-bold text-emerald-500" />
                </div>
                <div className="bg-secondary p-3 rounded-lg flex items-center justify-between border border-border">
                  <span className="font-bold text-muted-foreground">Time (T yrs)</span>
                  <input type="number" value={m3T} onChange={e=>{setM3T(Number(e.target.value)); setM3Step(0);}} className="w-24 bg-background border border-border rounded px-2 py-1 text-right font-bold text-emerald-500" />
                </div>
             </div>
             
             <button onClick={runM3} disabled={m3Step !== 0} className="mt-8 py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-lg disabled:opacity-50 flex items-center justify-center gap-2 w-full">
               <Coins className="size-5" /> Calculate Profit
             </button>
          </div>
          
          <div className="flex-[1.5] bg-card rounded-xl border border-border p-6 flex flex-col items-center justify-center relative">
             <div className="absolute inset-0 bg-emerald-500/5 rounded-xl pointer-events-none" />
             
             <div className={`p-8 rounded-2xl border-4 bg-background w-full max-w-md transition-all duration-1000 flex flex-col items-center relative z-10
               ${m3Step === 1 ? 'border-yellow-500 shadow-[0_0_30px_rgba(234,179,8,0.3)] animate-pulse' : 
                 m3Step === 2 ? 'border-emerald-500 shadow-[0_0_30px_rgba(16,185,129,0.3)]' : 'border-border'}
             `}>
                <h4 className="font-bold text-muted-foreground uppercase tracking-widest mb-6">Algorithm Flow</h4>
                
                <div className="font-mono text-xl mb-8 flex flex-col items-center gap-2">
                  <span>SI = (P × R × T) / 100</span>
                  <span className="text-emerald-500 font-bold mt-2">
                    SI = ({m3P} × {m3R} × {m3T}) / 100
                  </span>
                </div>
                
                <div className="w-full h-px bg-border my-4" />
                
                <div className="flex flex-col items-center mt-4">
                  <span className="text-sm font-bold text-muted-foreground uppercase mb-1">Generated Interest</span>
                  <div className={`text-6xl font-black transition-all duration-1000 flex items-center gap-2 ${m3Step === 2 ? 'text-emerald-500' : 'text-transparent'}`}>
                    <Coins className={`size-10 ${m3Step === 2 ? 'text-yellow-500' : 'text-transparent'}`} /> {m3I}
                  </div>
                </div>
             </div>
          </div>
       </div>
    </div>
  );

  return (
    <div className="flex flex-col h-full bg-emerald-950/20 text-foreground p-6 overflow-hidden relative font-sans">
      {/* Top Panel - CodeVerse Theme */}
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-border shrink-0">
        <div>
          <h2 className="text-2xl font-black text-emerald-500 flex items-center gap-3 uppercase tracking-widest drop-shadow-[0_0_10px_rgba(16,185,129,0.3)]">
            <Leaf className="size-7 text-emerald-500" /> Algorithm Forest
          </h2>
        </div>
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2 bg-emerald-950/50 px-4 py-1.5 rounded-full border border-emerald-900 font-bold shadow-sm">
            <Star className="size-4 text-emerald-400" /> {xp} XP
          </div>
          <div className="text-sm font-bold text-emerald-600 uppercase tracking-widest">
             {expId === "c-w2-1" && "Mission: Sum & Average"}
             {expId === "c-w2-2" && "Mission: Weather Conversion"}
             {expId === "c-w2-3" && "Mission: Simple Interest"}
          </div>
        </div>
      </div>

      {errorMsg && (
        <div className="absolute top-24 left-1/2 -translate-x-1/2 bg-red-600 text-white px-6 py-3 rounded-lg shadow-xl animate-in slide-in-from-top-10 z-50 font-medium">
          {errorMsg}
        </div>
      )}
      {successMsg && (
        <div className="absolute top-24 left-1/2 -translate-x-1/2 bg-emerald-600 text-white px-6 py-3 rounded-lg shadow-xl animate-in slide-in-from-top-10 z-50 font-bold flex items-center gap-2">
          <Star className="size-5" /> {successMsg}
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex-1 min-h-0 overflow-y-auto">
        {expId === "c-w2-1" && renderMission1()}
        {expId === "c-w2-2" && renderMission2()}
        {expId === "c-w2-3" && renderMission3()}
      </div>
    </div>
  );
}
