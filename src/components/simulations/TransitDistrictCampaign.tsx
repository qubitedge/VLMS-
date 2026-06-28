import { useState } from "react";
import { 
  Building, ArrowRight, ArrowDown, ArrowUp, AlertTriangle, ShieldAlert, Zap, Clock, Shield, Plus, Trash2, 
  RefreshCw, FastForward, PlayCircle, HardDrive, CheckCircle2, ChevronRight, CornerDownRight,
  Search, Bomb, FlaskConical, TrainFront, Repeat, ArrowLeftRight, Link, RotateCcw, Star, Database, Printer, TrainTrack, UserCheck
} from "lucide-react";

type TransitDistrictProps = {
  expId: string;
};

export function TransitDistrictCampaign({ expId }: TransitDistrictProps) {
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
  // MISSION 1: BUS STOP (ARRAY QUEUE) - ds-e6-1
  // ---------------------------------------------------------
  const MAX_BUS_STOP = 5;
  // A true array queue model: we maintain an array of fixed size.
  const [m1Q, setM1Q] = useState<(number | null)[]>(Array(MAX_BUS_STOP).fill(null));
  const [m1Front, setM1Front] = useState(-1);
  const [m1Rear, setM1Rear] = useState(-1);
  const [m1Pid, setM1Pid] = useState(10);
  const [m1Alarm, setM1Alarm] = useState<"full" | "empty" | null>(null);

  const m1Enqueue = () => {
    if (m1Rear === MAX_BUS_STOP - 1) {
      setM1Alarm("full");
      showError("QUEUE FULL! Cannot enqueue even if front slots are empty.");
      setTimeout(() => setM1Alarm(null), 2000);
      return;
    }
    
    const newQ = [...m1Q];
    let newFront = m1Front;
    let newRear = m1Rear + 1;
    
    if (m1Front === -1) {
      newFront = 0;
    }
    
    newQ[newRear] = m1Pid;
    setM1Q(newQ);
    setM1Front(newFront);
    setM1Rear(newRear);
    setM1Pid(p => p + 10);
    addXp(20, "Passenger Arrived");
  };

  const m1Dequeue = () => {
    if (m1Front === -1 || m1Front > m1Rear) {
      setM1Alarm("empty");
      showError("QUEUE EMPTY!");
      setTimeout(() => setM1Alarm(null), 2000);
      return;
    }
    
    const newQ = [...m1Q];
    newQ[m1Front] = null;
    
    setM1Q(newQ);
    setM1Front(m1Front + 1);
    addXp(20, "Passenger Boarded");
  };

  const renderMission1 = () => (
    <div className="flex flex-col h-full">
      <div className={`flex-1 flex flex-col items-center justify-center bg-card rounded-lg border-2 ${m1Alarm==='full' ? 'border-red-500 bg-red-500/10' : m1Alarm==='empty' ? 'border-yellow-500 bg-yellow-500/10' : 'border-border'} p-8 mb-4 relative overflow-x-auto transition-colors`}>
         {m1Alarm && (
           <div className={`absolute top-10 flex flex-col items-center animate-pulse z-20 ${m1Alarm === 'full' ? 'text-red-500' : 'text-yellow-500'}`}>
             <AlertTriangle className="size-16 mb-2" />
             <h2 className="text-3xl font-black tracking-widest">{m1Alarm === 'full' ? 'QUEUE FULL' : 'QUEUE EMPTY'}</h2>
           </div>
         )}
         
         <div className="flex flex-col items-center gap-2 mt-10">
           <div className="flex">
             {m1Q.map((val, i) => (
               <div key={i} className="flex flex-col items-center w-24">
                 {/* Top pointer for FRONT */}
                 <div className="h-10 flex items-end justify-center pb-2">
                   {i === m1Front && m1Front <= m1Rear && <div className="text-blue-500 font-bold flex flex-col items-center animate-bounce"><span className="text-xs">FRONT</span><ArrowDown className="size-4" /></div>}
                 </div>
                 
                 <div className={`w-20 h-24 border-2 flex items-center justify-center rounded transition-all
                   ${val !== null ? 'bg-primary border-primary text-primary-foreground shadow-lg' : 'bg-secondary border-border/50 text-muted-foreground'}
                 `}>
                   {val !== null ? <span className="font-bold text-xl">{val}</span> : <span className="italic text-xs">Empty</span>}
                 </div>
                 
                 {/* Bottom pointer for REAR */}
                 <div className="h-10 flex items-start justify-center pt-2">
                   {i === m1Rear && m1Front <= m1Rear && <div className="text-green-500 font-bold flex flex-col items-center animate-bounce"><ArrowUp className="size-4" /><span className="text-xs">REAR</span></div>}
                 </div>
               </div>
             ))}
           </div>
           
           <div className="w-full max-w-lg mt-4 bg-secondary/30 p-4 rounded-xl border border-border text-sm text-center">
             <p className="text-muted-foreground font-mono">Observe how deleting from FRONT leaves empty spaces that REAR cannot access.</p>
           </div>
         </div>
      </div>
      
      <div className="bg-secondary/50 p-4 rounded-xl border border-border text-center max-w-lg mx-auto w-full">
         <h3 className="font-bold mb-4 flex items-center justify-center gap-2"><Database className="size-5 text-blue-500" /> Bus Stop Array (Fixed: {MAX_BUS_STOP})</h3>
         <div className="flex justify-center gap-4">
           <button onClick={m1Enqueue} className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg flex items-center gap-2"><ArrowRight className="size-4"/> ENQUEUE (REAR)</button>
           <button onClick={m1Dequeue} className="px-6 py-2 border border-red-500 text-red-500 hover:bg-red-500/10 font-bold rounded-lg flex items-center gap-2"><ArrowRight className="size-4"/> DEQUEUE (FRONT)</button>
         </div>
      </div>
    </div>
  );

  // ---------------------------------------------------------
  // MISSION 2: SMART TERMINAL (LINKED QUEUE) - ds-e6-2
  // ---------------------------------------------------------
  const [m2Q, setM2Q] = useState<{id:number, val:number}[]>([]);
  const [m2Pid, setM2Pid] = useState(10);

  const m2Enqueue = () => {
    setM2Q([...m2Q, {id: Date.now(), val: m2Pid}]);
    setM2Pid(p => p + 10);
    addXp(30, "Dynamic Terminal Built");
  };

  const m2Dequeue = () => {
    if (m2Q.length === 0) {
      showError("QUEUE EMPTY!");
      return;
    }
    setM2Q(m2Q.slice(1));
    addXp(30, "Terminal Cleared");
  };

  const renderMission2 = () => (
    <div className="flex flex-col h-full">
      <div className="flex-1 flex items-center justify-start bg-card rounded-lg border border-border p-8 mb-4 overflow-x-auto">
         <div className="flex items-center min-w-max">
            <div className="flex flex-col items-center mr-6 gap-2">
              <div className="text-blue-500 font-bold">FRONT</div>
              {m2Q.length === 0 && <div className="text-muted-foreground font-bold mt-4">NULL</div>}
            </div>
            
            {m2Q.map((node, i) => (
              <div key={node.id} className="flex items-center animate-in slide-in-from-right-8 fade-in">
                {i > 0 && <ArrowRight className="mx-2 text-muted-foreground size-5" />}
                <div className="flex flex-col items-center relative">
                  <div className={`w-24 h-16 rounded-xl flex items-center justify-center border-2 shadow-lg
                    ${i === 0 ? 'bg-primary border-primary text-primary-foreground ring-4 ring-primary/20' : 'bg-secondary border-primary text-foreground'}
                  `}>
                    <span className="font-bold text-2xl">{node.val}</span>
                  </div>
                  {i === m2Q.length - 1 && (
                    <div className="absolute -bottom-8 text-green-500 font-bold flex flex-col items-center">
                      <ArrowUp className="size-4" /> REAR
                    </div>
                  )}
                </div>
              </div>
            ))}
         </div>
      </div>
      <div className="bg-secondary/50 p-4 rounded-xl border border-border text-center max-w-lg mx-auto w-full">
         <h3 className="font-bold mb-4 flex items-center justify-center gap-2"><Link className="size-5 text-purple-500" /> Smart Terminal (Linked Queue)</h3>
         <p className="text-sm text-muted-foreground mb-4">No fixed capacity! Construction drones build waiting sections infinitely.</p>
         <div className="flex justify-center gap-4">
           <button onClick={m2Enqueue} className="px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-lg flex items-center gap-2">ENQUEUE</button>
           <button onClick={m2Dequeue} className="px-6 py-2 border border-red-500 text-red-500 hover:bg-red-500/10 font-bold rounded-lg flex items-center gap-2">DEQUEUE</button>
         </div>
      </div>
    </div>
  );

  // ---------------------------------------------------------
  // MISSION 3: PRINT CENTER (ds-e6-3)
  // ---------------------------------------------------------
  const [m3Jobs, setM3Jobs] = useState<{id:number, name:string}[]>([]);
  const [m3JobId, setM3JobId] = useState(1);
  const [m3Printing, setM3Printing] = useState<{id:number, name:string} | null>(null);

  const m3Enqueue = (priority: boolean) => {
    const jobName = `Doc_${m3JobId}`;
    if (priority) {
      // In a strict queue, priority doesn't work this easily, but as an optional challenge:
      setM3Jobs([{id: Date.now(), name: `🔥 ${jobName}`}, ...m3Jobs]);
    } else {
      setM3Jobs([...m3Jobs, {id: Date.now(), name: jobName}]);
    }
    setM3JobId(j => j + 1);
    addXp(10, "Job Spooled");
  };

  const m3PrintNext = () => {
    if (m3Jobs.length === 0) return;
    const nextJob = m3Jobs[0];
    setM3Jobs(m3Jobs.slice(1));
    setM3Printing(nextJob);
    addXp(50, "Printing Started");
    
    setTimeout(() => {
      setM3Printing(null);
      addXp(100, "Print Completed");
    }, 2000);
  };

  const renderMission3 = () => (
    <div className="flex h-full gap-4">
      <div className="flex-[2] bg-card rounded-lg border border-border p-8 flex flex-col justify-end items-center relative overflow-hidden">
         {/* Printer Output area */}
         <div className="absolute top-10 flex flex-col items-center">
            <div className={`w-40 h-56 bg-white border-2 border-slate-300 rounded shadow-2xl flex items-center justify-center flex-col transition-all duration-1000
              ${m3Printing ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}
            `}>
               <Printer className="size-12 text-slate-400 mb-4" />
               <span className="font-bold text-slate-800 text-center">{m3Printing?.name}</span>
               <div className="w-full h-2 bg-blue-500 mt-8 animate-[pulse_2s_ease-in-out_infinite]" />
            </div>
         </div>
         
         {/* Spool Queue */}
         <div className="w-full flex justify-end items-center gap-2 pt-24 border-t-4 border-slate-700 relative">
            <div className="absolute left-0 bottom-2 text-slate-500 font-bold flex items-center gap-2">
              <Printer className="size-6" /> PRINTER 
            </div>
            {m3Jobs.map((job, i) => (
              <div key={job.id} className="w-24 h-32 bg-yellow-100 border-2 border-yellow-300 rounded shadow flex items-center justify-center p-2 text-center animate-in slide-in-from-right-8 fade-in">
                <span className="font-bold text-sm text-yellow-800">{job.name}</span>
              </div>
            ))}
            {m3Jobs.length === 0 && !m3Printing && <div className="text-muted-foreground italic w-full text-center">Spool Empty</div>}
         </div>
      </div>
      
      <div className="flex-1 bg-secondary/50 p-4 rounded-xl border border-border flex flex-col">
         <h3 className="font-bold mb-4 flex items-center gap-2"><Printer className="size-5 text-blue-500" /> Print Center</h3>
         <p className="text-sm text-muted-foreground mb-8">Documents form a FIFO queue. The printer takes the front document.</p>
         <div className="flex flex-col gap-4">
           <button onClick={() => m3Enqueue(false)} className="w-full py-3 bg-secondary border border-border hover:bg-secondary/80 font-bold rounded-lg text-sm">Spoool Standard Job</button>
           <button onClick={() => m3Enqueue(true)} className="w-full py-3 bg-red-600/20 border border-red-500 text-red-500 hover:bg-red-600/30 font-bold rounded-lg text-sm flex items-center justify-center gap-2">Spoool Priority Emergency</button>
           
           <div className="my-4 border-t border-border w-full" />
           
           <button onClick={m3PrintNext} disabled={m3Jobs.length === 0 || m3Printing !== null} className="w-full py-4 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-bold rounded-lg flex items-center justify-center gap-2">
             {m3Printing ? <RefreshCw className="size-5 animate-spin" /> : <PlayCircle className="size-5" />} 
             {m3Printing ? 'PRINTING...' : 'PROCESS FRONT JOB'}
           </button>
         </div>
      </div>
    </div>
  );

  // ---------------------------------------------------------
  // MISSION 4: CIRCULAR METRO SYSTEM (ds-e6-4)
  // ---------------------------------------------------------
  const MAX_METRO = 8;
  const [m4Q, setM4Q] = useState<(number | null)[]>(Array(MAX_METRO).fill(null));
  const [m4Front, setM4Front] = useState(-1);
  const [m4Rear, setM4Rear] = useState(-1);
  const [m4TrainNo, setM4TrainNo] = useState(1);
  const [m4Alarm, setM4Alarm] = useState<"full" | "empty" | null>(null);

  const m4Enqueue = () => {
    // Check Full: (rear + 1) % MAX == front
    if ((m4Front === 0 && m4Rear === MAX_METRO - 1) || (m4Rear === (m4Front - 1) % (MAX_METRO - 1) && m4Front !== -1)) {
      setM4Alarm("full");
      showError("METRO OVERFLOW! All platforms full.");
      setTimeout(() => setM4Alarm(null), 2000);
      return;
    }
    
    let newFront = m4Front;
    let newRear = m4Rear;
    
    if (m4Front === -1) {
      newFront = 0;
      newRear = 0;
    } else if (m4Rear === MAX_METRO - 1 && m4Front !== 0) {
      newRear = 0;
    } else {
      newRear = m4Rear + 1;
    }
    
    const newQ = [...m4Q];
    newQ[newRear] = m4TrainNo;
    setM4Q(newQ);
    setM4Front(newFront);
    setM4Rear(newRear);
    setM4TrainNo(t => t + 1);
    addXp(50, "Train Parked");
  };

  const m4Dequeue = () => {
    if (m4Front === -1) {
      setM4Alarm("empty");
      showError("METRO EMPTY! No trains to depart.");
      setTimeout(() => setM4Alarm(null), 2000);
      return;
    }
    
    const newQ = [...m4Q];
    newQ[m4Front] = null;
    
    let newFront = m4Front;
    let newRear = m4Rear;
    
    if (m4Front === m4Rear) {
      // Queue is now empty
      newFront = -1;
      newRear = -1;
    } else if (m4Front === MAX_METRO - 1) {
      newFront = 0;
    } else {
      newFront = m4Front + 1;
    }
    
    setM4Q(newQ);
    setM4Front(newFront);
    setM4Rear(newRear);
    addXp(50, "Train Departed");
  };

  const renderMission4 = () => {
    // We arrange the MAX_METRO slots in a circle.
    // radius = 120
    const radius = 140;
    const center = { x: 200, y: 200 };
    
    return (
      <div className="flex h-full gap-4">
        <div className={`flex-[2] bg-card rounded-lg border-2 ${m4Alarm==='full' ? 'border-red-500 bg-red-500/10' : m4Alarm==='empty' ? 'border-yellow-500 bg-yellow-500/10' : 'border-border'} flex items-center justify-center relative overflow-hidden transition-colors`}>
           <div className="relative w-[400px] h-[400px]">
             {/* Circular Track Background */}
             <div className="absolute inset-0 m-auto border-[16px] border-secondary rounded-full" style={{ width: radius*2 + 40, height: radius*2 + 40 }} />
             
             {m4Q.map((val, i) => {
               // Calculate angle. Slot 0 at top (270 deg)
               const angle = (i / MAX_METRO) * Math.PI * 2 - Math.PI / 2;
               const x = center.x + Math.cos(angle) * radius;
               const y = center.y + Math.sin(angle) * radius;
               
               const isFront = i === m4Front;
               const isRear = i === m4Rear;
               
               return (
                 <div key={i} className="absolute w-16 h-16 -ml-8 -mt-8 flex flex-col items-center justify-center transition-all duration-500" style={{ left: x, top: y }}>
                   
                   {/* Tooltip Indicators */}
                   {isFront && <div className="absolute -top-6 text-blue-500 font-bold text-xs bg-background/80 px-1 rounded shadow">FRONT</div>}
                   {isRear && <div className="absolute -bottom-6 text-green-500 font-bold text-xs bg-background/80 px-1 rounded shadow">REAR</div>}

                   <div className={`w-12 h-12 rounded-full border-4 flex items-center justify-center font-bold z-10 shadow-lg transition-colors
                     ${val !== null ? 'bg-primary border-primary text-primary-foreground' : 'bg-background border-secondary text-muted-foreground'}
                     ${isFront ? 'ring-4 ring-blue-500/50' : ''}
                     ${isRear ? 'ring-4 ring-green-500/50' : ''}
                   `}>
                     {val !== null ? `T${val}` : i}
                   </div>
                 </div>
               );
             })}
             
             <div className="absolute inset-0 flex items-center justify-center flex-col text-center">
                <TrainTrack className="size-10 text-muted-foreground/30 mb-2" />
                <h3 className="font-bold text-lg text-muted-foreground/50">CIRCULAR<br/>METRO</h3>
             </div>
           </div>
        </div>
        
        <div className="flex-1 bg-secondary/50 p-6 rounded-xl border border-border flex flex-col justify-center">
           <h3 className="font-bold mb-4 flex items-center gap-2 text-xl"><Repeat className="size-6 text-primary" /> Metro Control</h3>
           <p className="text-sm text-muted-foreground mb-8">Notice how the REAR pointer wraps around the circle to reuse platforms. <code>(rear + 1) % max</code></p>
           
           <div className="flex flex-col gap-4">
             <button onClick={m4Enqueue} className="w-full py-4 bg-primary text-primary-foreground font-bold rounded-lg flex items-center justify-center gap-2 text-lg">
               <ArrowDown className="size-5" /> Train Arrives (REAR)
             </button>
             <button onClick={m4Dequeue} className="w-full py-4 bg-secondary text-foreground border border-border hover:bg-background font-bold rounded-lg flex items-center justify-center gap-2 text-lg">
               <ArrowUp className="size-5" /> Train Departs (FRONT)
             </button>
           </div>
           
           <div className="mt-8 p-4 bg-background rounded border border-border font-mono text-sm">
             <div className="flex justify-between mb-2"><span className="text-blue-500">FRONT:</span> <span>{m4Front}</span></div>
             <div className="flex justify-between"><span className="text-green-500">REAR:</span> <span>{m4Rear}</span></div>
           </div>
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col h-full bg-background text-foreground p-6 overflow-hidden relative font-sans">
      {/* Top Panel */}
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-border shrink-0">
        <div>
          <h2 className="text-2xl font-bold text-primary flex items-center gap-2 uppercase tracking-wide">
            <Building className="size-6 text-primary" /> Transit District Campaign
          </h2>
        </div>
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2 bg-secondary/50 px-4 py-1.5 rounded-full border border-border font-bold shadow-sm">
            <Star className="size-4 text-yellow-500" /> {xp} XP
          </div>
          <div className="text-sm font-bold text-muted-foreground uppercase">
             {expId === "ds-e6-1" && "Mission 1: Array Bus Stop"}
             {expId === "ds-e6-2" && "Mission 2: Smart Terminal"}
             {expId === "ds-e6-3" && "Mission 3: Print Center"}
             {expId === "ds-e6-4" && "Mission 4: Circular Metro"}
          </div>
        </div>
      </div>

      {errorMsg && (
        <div className="absolute top-24 left-1/2 -translate-x-1/2 bg-red-500 text-white px-6 py-3 rounded-lg shadow-xl animate-in slide-in-from-top-10 z-50 font-medium">
          {errorMsg}
        </div>
      )}
      {successMsg && (
        <div className="absolute top-24 left-1/2 -translate-x-1/2 bg-green-500 text-white px-6 py-3 rounded-lg shadow-xl animate-in slide-in-from-top-10 z-50 font-bold flex items-center gap-2">
          <Star className="size-5" /> {successMsg}
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex-1 min-h-0 overflow-y-auto">
        {expId === "ds-e6-1" && renderMission1()}
        {expId === "ds-e6-2" && renderMission2()}
        {expId === "ds-e6-3" && renderMission3()}
        {expId === "ds-e6-4" && renderMission4()}
      </div>
    </div>
  );
}
