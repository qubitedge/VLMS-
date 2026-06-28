import { useState } from "react";
import { 
  Building, ArrowRight, ArrowDown, ShieldAlert, Zap, Lock, Unlock,
  Search, BrainCircuit, Activity, Eye, ScanLine, Key, Binary, Star,
  Database, Server, Cpu, FastForward, Gauge, HardDrive
} from "lucide-react";

type DataVaultProps = {
  expId: string; // ds-e9-1 or ds-e9-2
};

export function DataVaultCampaign({ expId }: DataVaultProps) {
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
  // MISSION 1: QUANTUM STORAGE VAULT (Hash Table) - ds-e9-1
  // ---------------------------------------------------------
  const HASH_SIZE = 10;
  // hash function: key % 10
  // mode: "chaining" | "probing"
  const [m1Mode, setM1Mode] = useState<"chaining" | "probing">("chaining");
  const [m1Table, setM1Table] = useState<{key: number, id: number}[][]>(Array(HASH_SIZE).fill([]));
  const [m1Input, setM1Input] = useState<number>(23);
  const [m1AnimatingSlot, setM1AnimatingSlot] = useState<number | null>(null);
  const [m1CollisionWarn, setM1CollisionWarn] = useState(false);

  const m1Hash = async () => {
    const key = m1Input;
    let idx = key % HASH_SIZE;
    
    setM1AnimatingSlot(idx);
    
    // Check collision
    if (m1Table[idx].length > 0) {
      setM1CollisionWarn(true);
      await new Promise(r => setTimeout(r, 1000));
      setM1CollisionWarn(false);
      
      if (m1Mode === "probing") {
        let probes = 0;
        let originalIdx = idx;
        while (m1Table[idx].length > 0 && probes < HASH_SIZE) {
          idx = (idx + 1) % HASH_SIZE;
          setM1AnimatingSlot(idx);
          await new Promise(r => setTimeout(r, 500));
          probes++;
        }
        if (probes === HASH_SIZE) {
          showError("Hash Table is completely full! (Linear Probing)");
          setM1AnimatingSlot(null);
          return;
        }
      }
    } else {
      await new Promise(r => setTimeout(r, 800));
    }
    
    // Insert
    const newTable = [...m1Table];
    if (m1Mode === "chaining") {
      newTable[idx] = [...newTable[idx], {key, id: Date.now()}];
    } else {
      newTable[idx] = [{key, id: Date.now()}];
    }
    
    setM1Table(newTable);
    addXp(30, "Data Teleported to Vault");
    setM1AnimatingSlot(null);
    setM1Input(k => k + 11);
  };

  const renderMission1 = () => (
    <div className="flex flex-col h-full gap-4">
       <div className="flex items-center gap-4 bg-secondary/50 p-4 rounded-xl border border-border">
         <div className="flex-1 flex gap-4 items-center">
            <h3 className="font-bold flex items-center gap-2"><Cpu className="size-5 text-cyan-500" /> Collision Strategy:</h3>
            <div className="flex bg-background rounded-lg border border-border p-1">
               <button onClick={() => {setM1Mode("chaining"); setM1Table(Array(HASH_SIZE).fill([]));}} className={`px-4 py-1.5 rounded-md text-sm font-bold transition-colors ${m1Mode === "chaining" ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:bg-secondary'}`}>
                 Linked Chaining
               </button>
               <button onClick={() => {setM1Mode("probing"); setM1Table(Array(HASH_SIZE).fill([]));}} className={`px-4 py-1.5 rounded-md text-sm font-bold transition-colors ${m1Mode === "probing" ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:bg-secondary'}`}>
                 Linear Probing
               </button>
            </div>
         </div>
       </div>

       <div className="flex-1 flex gap-4">
          <div className="flex-[1] flex flex-col items-center justify-center bg-card rounded-xl border border-border p-6 relative">
             <h3 className="font-bold text-xl mb-8 flex items-center gap-2"><Zap className="size-6 text-yellow-500" /> Teleportation Chamber</h3>
             <div className="size-48 rounded-full border-[12px] border-secondary flex flex-col items-center justify-center shadow-[0_0_50px_rgba(234,179,8,0.2)] relative">
                <div className="absolute inset-0 bg-yellow-500/10 rounded-full animate-pulse" />
                <span className="text-muted-foreground font-bold mb-2">Record ID</span>
                <input type="number" value={m1Input} onChange={e=>setM1Input(Number(e.target.value))} className="w-24 bg-transparent text-center text-4xl font-black focus:outline-none" />
             </div>
             
             <div className="mt-8 text-center bg-secondary/50 px-6 py-3 rounded-lg border border-border font-mono text-lg">
                Hash({m1Input}) = {m1Input} % 10 = <span className="font-bold text-cyan-500 text-2xl ml-2">{m1Input % 10}</span>
             </div>
             
             <button onClick={m1Hash} disabled={m1AnimatingSlot !== null} className="mt-8 px-8 py-4 bg-yellow-600 hover:bg-yellow-700 text-white font-bold text-xl rounded-xl flex items-center gap-2 shadow-lg disabled:opacity-50 transition-all active:scale-95">
                <Zap className="size-6" /> INITIATE TELEPORT
             </button>
             
             {m1CollisionWarn && (
               <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-red-500 text-white px-8 py-4 rounded-xl shadow-2xl z-50 flex flex-col items-center animate-in zoom-in">
                 <ShieldAlert className="size-12 mb-2 animate-bounce" />
                 <h2 className="font-black text-2xl tracking-widest">COLLISION</h2>
               </div>
             )}
          </div>
          
          <div className="flex-[1.5] bg-card rounded-xl border border-border p-6 overflow-y-auto">
             <h3 className="font-bold text-xl mb-6 flex items-center gap-2"><Database className="size-6 text-blue-500" /> Quantum Data Vault (Size 10)</h3>
             
             <div className="grid grid-cols-2 gap-4">
                {m1Table.map((chain, i) => (
                  <div key={i} className={`flex items-start border-2 rounded-lg p-2 transition-colors duration-300
                    ${m1AnimatingSlot === i ? 'border-yellow-500 bg-yellow-500/10 shadow-[0_0_15px_rgba(234,179,8,0.5)]' : 'border-border bg-secondary/20'}
                  `}>
                     <div className="w-12 h-12 bg-secondary text-muted-foreground font-black text-xl rounded flex items-center justify-center shrink-0 border border-border mr-3">
                       {i}
                     </div>
                     <div className="flex flex-wrap gap-2">
                       {chain.map((record, ci) => (
                         <div key={record.id} className="w-16 h-12 bg-blue-600 text-white font-bold rounded shadow flex flex-col items-center justify-center animate-in zoom-in slide-in-from-left-4 relative">
                           {ci > 0 && m1Mode === "chaining" && <div className="absolute -left-2 top-1/2 w-2 h-0.5 bg-blue-400" />}
                           {record.key}
                         </div>
                       ))}
                       {chain.length === 0 && <div className="h-12 flex items-center text-muted-foreground italic text-sm">Empty</div>}
                     </div>
                  </div>
                ))}
             </div>
          </div>
       </div>
    </div>
  );

  // ---------------------------------------------------------
  // MISSION 2: HYPERCACHE (Caching Simulation) - ds-e9-2
  // ---------------------------------------------------------
  const CACHE_SIZE = 3;
  const [m2Cache, setM2Cache] = useState<number[]>([]);
  const [m2Req, setM2Req] = useState(101);
  const [m2Status, setM2Status] = useState<"idle" | "searching_db" | "searching_cache" | "hit" | "miss">("idle");
  const [m2Stats, setM2Stats] = useState({ hits: 0, misses: 0 });

  const m2Request = async () => {
    if (m2Status !== "idle") return;
    
    setM2Status("searching_cache");
    await new Promise(r => setTimeout(r, 600)); // Simulating cache check (fast)
    
    if (m2Cache.includes(m2Req)) {
      // Hit!
      setM2Status("hit");
      setM2Stats(s => ({...s, hits: s.hits + 1}));
      addXp(100, "CACHE HIT! Instant Retrieval");
      
      // Move to front (LRU simulation)
      setM2Cache([m2Req, ...m2Cache.filter(k => k !== m2Req)]);
      
      setTimeout(() => { setM2Status("idle"); setM2Req(r => r + Math.floor(Math.random() * 3)); }, 1500);
    } else {
      // Miss!
      setM2Status("miss");
      setM2Stats(s => ({...s, misses: s.misses + 1}));
      await new Promise(r => setTimeout(r, 1000));
      
      setM2Status("searching_db");
      await new Promise(r => setTimeout(r, 2000)); // Simulating slow DB
      
      // Add to cache
      const newCache = [m2Req, ...m2Cache];
      if (newCache.length > CACHE_SIZE) newCache.pop(); // Evict oldest
      setM2Cache(newCache);
      addXp(20, "Retrieved from Slow DB & Cached");
      
      setTimeout(() => { setM2Status("idle"); setM2Req(r => r + Math.floor(Math.random() * 3)); }, 1000);
    }
  };

  const renderMission2 = () => (
    <div className="flex flex-col h-full gap-4">
       
       <div className="flex gap-4">
         <div className="flex-1 bg-card rounded-xl border border-border p-6 flex flex-col items-center">
            <h3 className="font-bold text-lg mb-6 text-muted-foreground uppercase tracking-widest">Client Request</h3>
            <div className="text-6xl font-black text-primary mb-6">{m2Req}</div>
            <button onClick={m2Request} disabled={m2Status !== "idle"} className="w-full max-w-xs py-4 bg-primary text-primary-foreground font-bold rounded-xl shadow-lg disabled:opacity-50 hover:bg-primary/90 flex justify-center items-center gap-2">
               <Search className="size-5" /> Request Record
            </button>
         </div>
         
         <div className="flex-1 bg-card rounded-xl border border-border p-6 flex flex-col items-center justify-center">
            <h3 className="font-bold text-lg mb-4">Analytics</h3>
            <div className="flex gap-8 w-full justify-center">
               <div className="flex flex-col items-center bg-green-500/10 p-4 rounded-xl border border-green-500/30 min-w-[120px]">
                 <div className="text-4xl font-black text-green-500">{m2Stats.hits}</div>
                 <div className="text-sm font-bold text-green-700 uppercase mt-1">Hits</div>
               </div>
               <div className="flex flex-col items-center bg-red-500/10 p-4 rounded-xl border border-red-500/30 min-w-[120px]">
                 <div className="text-4xl font-black text-red-500">{m2Stats.misses}</div>
                 <div className="text-sm font-bold text-red-700 uppercase mt-1">Misses</div>
               </div>
            </div>
         </div>
       </div>

       <div className="flex-1 flex gap-4">
          {/* Cache */}
          <div className={`flex-[1] rounded-xl border-2 p-6 flex flex-col items-center justify-center relative transition-colors duration-500
            ${m2Status === "searching_cache" ? 'border-blue-500 bg-blue-500/10 shadow-[0_0_30px_rgba(59,130,246,0.3)]' : 
              m2Status === "hit" ? 'border-green-500 bg-green-500/20 shadow-[0_0_50px_rgba(34,197,94,0.5)]' : 
              'border-blue-500/30 bg-card'}
          `}>
             <h3 className="absolute top-4 left-4 font-bold text-blue-500 flex items-center gap-2"><Zap className="size-5" /> HyperCache VIP</h3>
             <div className="absolute top-4 right-4 text-xs font-bold text-muted-foreground bg-secondary px-2 py-1 rounded">Size: {CACHE_SIZE}</div>
             
             {m2Status === "hit" && <div className="absolute inset-0 flex items-center justify-center pointer-events-none"><div className="text-6xl font-black text-green-500/50 -rotate-12 uppercase tracking-widest">CACHE HIT</div></div>}

             <div className="flex gap-4 z-10 mt-8">
               {Array.from({length: CACHE_SIZE}).map((_, i) => {
                 const hasVal = i < m2Cache.length;
                 const val = hasVal ? m2Cache[i] : null;
                 const isHit = m2Status === "hit" && val === m2Req;
                 return (
                   <div key={i} className={`size-24 rounded-xl flex flex-col items-center justify-center font-bold text-3xl transition-all
                     ${hasVal ? 'bg-blue-600 text-white shadow-lg' : 'bg-secondary/50 border-2 border-dashed border-border text-muted-foreground/30'}
                     ${isHit ? 'ring-4 ring-green-400 scale-110' : ''}
                   `}>
                     {hasVal ? val : 'Empty'}
                   </div>
                 );
               })}
             </div>
          </div>
          
          {/* Main DB */}
          <div className={`flex-[1.5] rounded-xl border-2 p-6 flex flex-col items-center justify-center relative transition-colors duration-1000
            ${m2Status === "searching_db" ? 'border-orange-500 bg-orange-500/10 shadow-[0_0_30px_rgba(249,115,22,0.3)]' : 'border-border bg-secondary/10'}
          `}>
             <h3 className="absolute top-4 left-4 font-bold text-muted-foreground flex items-center gap-2"><HardDrive className="size-5" /> Main Underground Database</h3>
             
             {m2Status === "searching_db" ? (
               <div className="flex flex-col items-center text-orange-500 animate-pulse">
                 <Search className="size-16 mb-4 animate-spin-slow" />
                 <h2 className="text-2xl font-black tracking-widest uppercase">Deep Search...</h2>
                 <p className="font-mono mt-2 opacity-70">Scanning 10,000,000 records</p>
               </div>
             ) : m2Status === "miss" ? (
               <div className="flex flex-col items-center text-red-500 animate-in zoom-in">
                 <ShieldAlert className="size-16 mb-4" />
                 <h2 className="text-2xl font-black tracking-widest uppercase">CACHE MISS</h2>
               </div>
             ) : (
               <div className="grid grid-cols-5 gap-2 opacity-20">
                 {Array.from({length: 20}).map((_, i) => (
                   <div key={i} className="w-12 h-4 bg-foreground rounded" />
                 ))}
               </div>
             )}
          </div>
       </div>
    </div>
  );

  return (
    <div className="flex flex-col h-full bg-background text-foreground p-6 overflow-hidden relative font-sans">
      {/* Top Panel */}
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-border shrink-0">
        <div>
          <h2 className="text-2xl font-bold text-primary flex items-center gap-2 uppercase tracking-wide">
            <Zap className="size-6 text-primary" /> Data Vault District
          </h2>
        </div>
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2 bg-secondary/50 px-4 py-1.5 rounded-full border border-border font-bold shadow-sm">
            <Star className="size-4 text-yellow-500" /> {xp} XP
          </div>
          <div className="text-sm font-bold text-muted-foreground uppercase">
             {expId === "ds-e9-1" && "Mission 1: Hash Teleportation"}
             {expId === "ds-e9-2" && "Mission 2: HyperCache Ops"}
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
        {expId === "ds-e9-1" && renderMission1()}
        {expId === "ds-e9-2" && renderMission2()}
      </div>
    </div>
  );
}
