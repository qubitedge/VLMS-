import { useState } from "react";
import { 
  Building, ArrowRight, ShieldAlert, Zap, Clock, Shield, Plus, Trash2, 
  RefreshCw, FastForward, PlayCircle, HardDrive, CheckCircle2, ChevronRight, CornerDownRight,
  Search, Bomb, FlaskConical, TrainFront, Repeat, ArrowLeftRight, Link, RotateCcw, Star
} from "lucide-react";

type LinkedCityProps = {
  expId: string;
};

type NodeData = {
  id: string;
  val: number;
};

export function LinkedCityCampaign({ expId }: LinkedCityProps) {
  // Global XP
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
  // MISSION 1: EXPANSION PROJECT (ds-e2-1)
  // ---------------------------------------------------------
  const [m1Nodes, setM1Nodes] = useState<NodeData[]>([
    { id: "n1", val: 20 },
    { id: "n2", val: 30 }
  ]);
  const [m1InsertVal, setM1InsertVal] = useState(10);
  const [m1InsertPos, setM1InsertPos] = useState(0);

  const m1InsertAtBeginning = () => {
    setM1Nodes([{ id: `n_${Date.now()}`, val: m1InsertVal }, ...m1Nodes]);
    setM1InsertVal(v => v + 5);
    addXp(50, "Inserted at Head");
  };

  const m1InsertAtEnd = () => {
    setM1Nodes([...m1Nodes, { id: `n_${Date.now()}`, val: m1InsertVal }]);
    setM1InsertVal(v => v + 5);
    addXp(50, "Inserted at Tail");
  };

  const m1InsertAtPosition = () => {
    if (m1InsertPos < 0 || m1InsertPos > m1Nodes.length) {
      showError("Invalid position!");
      return;
    }
    const newNodes = [...m1Nodes];
    newNodes.splice(m1InsertPos, 0, { id: `n_${Date.now()}`, val: m1InsertVal });
    setM1Nodes(newNodes);
    setM1InsertVal(v => v + 5);
    addXp(100, `Inserted at Pos ${m1InsertPos}`);
  };

  const m1Delete = (idx: number) => {
    const newNodes = [...m1Nodes];
    newNodes.splice(idx, 1);
    setM1Nodes(newNodes);
    addXp(50, "Building Demolished");
  };

  const renderMission1 = () => (
    <div className="flex flex-col h-full">
      <div className="flex-1 flex items-center justify-center bg-card rounded-lg border border-border p-8 mb-4 relative overflow-x-auto">
        <div className="flex items-center gap-2">
          <div className="flex flex-col items-center mr-4">
            <div className="size-12 rounded-full bg-primary/20 border-2 border-primary flex items-center justify-center shadow-[0_0_15px_rgba(var(--primary),0.5)] z-10">
              <span className="font-bold text-primary text-xs">HQ</span>
            </div>
            <span className="text-xs text-muted-foreground mt-2 font-bold">HEAD</span>
          </div>
          {m1Nodes.length === 0 && <div className="text-muted-foreground font-bold">NULL</div>}
          {m1Nodes.map((node, i) => (
            <div key={node.id} className="flex items-center animate-in zoom-in slide-in-from-left-4">
              <ArrowRight className="text-muted-foreground mx-2" />
              <div className="flex flex-col items-center">
                <div className="w-16 h-24 bg-secondary border-2 border-border rounded-t-xl flex flex-col items-center justify-end pb-2 relative group">
                  <Building className="size-6 text-muted-foreground mb-2 opacity-50" />
                  <span className="font-bold text-lg">{node.val}</span>
                  <button onClick={() => m1Delete(i)} className="absolute -top-3 -right-3 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Trash2 className="size-3" />
                  </button>
                </div>
                <span className="text-xs text-muted-foreground mt-2 font-mono">pos {i}</span>
              </div>
            </div>
          ))}
          {m1Nodes.length > 0 && (
            <div className="flex items-center">
              <ArrowRight className="text-muted-foreground mx-2" />
              <div className="text-muted-foreground font-bold">NULL</div>
            </div>
          )}
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-secondary/50 p-4 rounded-xl border border-border">
          <h3 className="font-bold mb-4 flex items-center gap-2"><Plus className="size-4 text-green-500" /> New Construction</h3>
          <div className="flex gap-2 mb-4">
            <input type="number" value={m1InsertVal} onChange={e => setM1InsertVal(Number(e.target.value))} className="bg-background border border-border rounded px-3 py-1 w-20" />
            <button onClick={m1InsertAtBeginning} className="flex-1 bg-primary text-primary-foreground font-bold rounded py-1 text-sm">Insert at HQ</button>
            <button onClick={m1InsertAtEnd} className="flex-1 bg-primary text-primary-foreground font-bold rounded py-1 text-sm">Insert at End</button>
          </div>
          <div className="flex gap-2">
            <input type="number" value={m1InsertPos} onChange={e => setM1InsertPos(Number(e.target.value))} className="bg-background border border-border rounded px-3 py-1 w-20" min="0" max={m1Nodes.length} />
            <button onClick={m1InsertAtPosition} className="flex-1 bg-secondary border border-border font-bold rounded py-1 text-sm hover:bg-secondary/80">Insert at Pos</button>
          </div>
        </div>
        <div className="bg-secondary/50 p-4 rounded-xl border border-border">
          <h3 className="font-bold mb-4 flex items-center gap-2"><Trash2 className="size-4 text-red-500" /> Demolition</h3>
          <p className="text-sm text-muted-foreground mb-4">Hover over any building in the city and click the red trash icon to delete it and reconnect the roads automatically.</p>
        </div>
      </div>
    </div>
  );

  // ---------------------------------------------------------
  // MISSION 2: REVERSE FLOW (ds-e2-2)
  // ---------------------------------------------------------
  const [m2Step, setM2Step] = useState(0); 
  const m2Nodes = [10, 20, 30, 40];

  const renderMission2 = () => (
    <div className="flex flex-col h-full">
      <div className="flex-1 flex items-center justify-center bg-card rounded-lg border border-border p-8 mb-4 overflow-x-auto">
        <div className="flex items-center">
          {m2Step === 4 ? <div className="font-bold text-primary mr-4">HEAD</div> : <div className="font-bold text-muted-foreground mr-4">NULL</div>}
          {m2Nodes.map((val, i) => {
            const isReversed = i < m2Step;
            const isCurr = i === m2Step;
            const isPrev = i === m2Step - 1;
            const isNext = i === m2Step + 1;
            return (
              <div key={i} className="flex items-center">
                {i > 0 && <div className="mx-2 flex flex-col items-center"><ArrowRight className={`size-6 transition-all duration-500 ${isReversed ? 'rotate-180 text-primary' : 'text-muted-foreground'}`} /></div>}
                <div className="flex flex-col items-center relative mt-8">
                  <div className="absolute -top-8 flex gap-1">
                    {isPrev && <div className="size-4 rounded-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.8)]" title="Prev Bot" />}
                    {isCurr && <div className="size-4 rounded-full bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.8)]" title="Current Bot" />}
                    {isNext && <div className="size-4 rounded-full bg-yellow-500 shadow-[0_0_10px_rgba(234,179,8,0.8)]" title="Next Bot" />}
                  </div>
                  <div className={`w-14 h-20 rounded-t-xl flex items-center justify-center border-2 ${isReversed ? 'bg-primary/10 border-primary' : 'bg-secondary border-border'} ${isCurr ? 'ring-4 ring-green-500/30' : ''}`}><span className="font-bold">{val}</span></div>
                </div>
              </div>
            );
          })}
          {m2Step !== 4 ? (
            <div className="flex items-center"><ArrowRight className="text-muted-foreground mx-2" /><div className="font-bold text-muted-foreground">NULL</div></div>
          ) : (
            <div className="flex items-center"><ArrowRight className="text-primary mx-2 rotate-180" /><div className="font-bold text-muted-foreground">NULL</div></div>
          )}
        </div>
      </div>
      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-2 bg-secondary/50 p-4 rounded-xl border border-border flex items-center justify-between">
          <div><h3 className="font-bold mb-1">Traffic Reverse Protocol</h3><p className="text-sm text-muted-foreground">Control the Current Bot to reverse the pointer direction one node at a time.</p></div>
          {m2Step < 4 ? <button onClick={() => { setM2Step(s => s + 1); addXp(100, "Road Reversed"); }} className="px-6 py-2 bg-primary text-primary-foreground font-bold rounded-lg flex items-center gap-2"><RefreshCw className="size-4" /> Next Iteration</button> : <div className="text-green-500 font-bold flex items-center gap-2"><CheckCircle2 className="size-5" /> City Fully Reversed!</div>}
        </div>
        <div className="bg-secondary/50 p-4 rounded-xl border border-border">
          <h4 className="font-bold text-sm mb-2 border-b border-border pb-1">Bot Status</h4>
          <div className="text-sm flex justify-between items-center"><span className="text-blue-500 font-bold">Prev Bot:</span> <span>{m2Step === 0 ? "NULL" : m2Nodes[m2Step-1]}</span></div>
          <div className="text-sm flex justify-between items-center"><span className="text-green-500 font-bold">Curr Bot:</span> <span>{m2Step === 4 ? "NULL" : m2Nodes[m2Step]}</span></div>
          <div className="text-sm flex justify-between items-center"><span className="text-yellow-500 font-bold">Next Bot:</span> <span>{m2Step >= 3 ? "NULL" : m2Nodes[m2Step+1]}</span></div>
        </div>
      </div>
    </div>
  );

  // ---------------------------------------------------------
  // MISSION 3: THE RECURSIVE TIME WIZARD (ds-e2-3)
  // ---------------------------------------------------------
  const [m3Phase, setM3Phase] = useState<"descending" | "returning" | "done">("descending");
  const [m3Depth, setM3Depth] = useState(0); 
  const m3Nodes = ["A", "B", "C", "D"];

  const renderMission3 = () => (
    <div className="flex h-full gap-4">
      <div className="flex-[2] flex flex-col">
        <div className="bg-card flex-1 rounded-xl border border-border p-8 flex items-center justify-center overflow-x-auto">
           <div className="flex items-center">
              {m3Phase === "done" && <div className="font-bold text-primary mr-4">HEAD</div>}
              {m3Nodes.map((val, i) => {
                const isReversed = m3Phase === "returning" && i >= m3Depth;
                const isActive = (m3Phase === "descending" && i === m3Depth) || (m3Phase === "returning" && i === m3Depth);
                return (
                  <div key={i} className="flex items-center">
                    {i > 0 && <ArrowRight className={`mx-2 size-6 transition-transform duration-500 ${isReversed ? 'rotate-180 text-primary' : 'text-muted-foreground'}`} />}
                    <div className={`w-16 h-24 rounded-lg flex items-center justify-center border-2 transition-all ${isActive ? 'bg-purple-500/20 border-purple-500 shadow-[0_0_20px_rgba(168,85,247,0.5)]' : 'bg-secondary border-border'} ${isReversed ? 'border-primary' : ''}`}><span className="text-3xl font-bold">{val}</span></div>
                  </div>
                );
              })}
              <ArrowRight className={`mx-2 transition-transform ${m3Phase === "done" ? 'rotate-180 text-primary' : 'text-muted-foreground'}`} />
              <div className="font-bold text-muted-foreground">NULL</div>
           </div>
        </div>
        <div className="bg-secondary/50 p-4 rounded-xl border border-border mt-4 flex items-center justify-between">
          <div><h3 className="font-bold mb-1 text-purple-500">Wizard Controls</h3><p className="text-sm text-muted-foreground">{m3Phase === "descending" ? "Travel forward to reach the last building." : "Travel backward through time to rewire roads."}</p></div>
          {m3Phase === "descending" && <button onClick={() => { if (m3Depth < 3) { setM3Depth(d => d + 1); addXp(50, "Descended Deeper"); } else { setM3Phase("returning"); addXp(100, "Base Case Reached!"); } }} className="px-6 py-2 bg-purple-600 text-white font-bold rounded-lg flex items-center gap-2"><CornerDownRight className="size-4" /> {m3Depth < 3 ? "Call Recursive" : "Hit Base Case"}</button>}
          {m3Phase === "returning" && <button onClick={() => { if (m3Depth > 0) { setM3Depth(d => d - 1); addXp(150, "Road Rewired"); } else { setM3Phase("done"); addXp(400, "Time Wizard Master"); } }} className="px-6 py-2 bg-primary text-primary-foreground font-bold rounded-lg flex items-center gap-2"><RefreshCw className="size-4" /> Rewire & Return</button>}
          {m3Phase === "done" && <div className="text-green-500 font-bold flex items-center gap-2"><CheckCircle2 className="size-5" /> City Fully Rewired!</div>}
        </div>
      </div>
      <div className="flex-1 bg-card rounded-xl border border-border flex flex-col p-4">
         <h3 className="font-bold text-center border-b border-border pb-2 mb-4">Call Stack Tower</h3>
         <div className="flex-1 flex flex-col-reverse gap-2 justify-start overflow-y-auto">
            {Array.from({ length: m3Depth + 1 }).map((_, i) => (
              <div key={i} className="bg-purple-500/20 border border-purple-500 p-3 rounded-lg text-center animate-in slide-in-from-top-4"><span className="font-mono text-sm font-bold text-purple-400">reverse(Node {m3Nodes[i]})</span></div>
            ))}
         </div>
         {m3Phase === "returning" && <div className="mt-4 text-xs text-muted-foreground text-center">Backtracking...</div>}
      </div>
    </div>
  );

  // ---------------------------------------------------------
  // MISSION 4: NETWORK PATROL (ds-e2-4)
  // ---------------------------------------------------------
  const [m4Nodes, setM4Nodes] = useState([10, 20, 30, 40]);
  const [m4CurrIdx, setM4CurrIdx] = useState(-1);
  const [m4EditIdx, setM4EditIdx] = useState<number | null>(null);
  const [m4EditVal, setM4EditVal] = useState("");

  const renderMission4 = () => (
    <div className="flex flex-col h-full">
      <div className="flex-1 flex items-center justify-center bg-card rounded-lg border border-border p-8 mb-4 overflow-x-auto">
         <div className="flex items-center">
            <div className="font-bold text-primary mr-4">HEAD</div>
            {m4Nodes.map((val, i) => {
              const isPatrolHere = i === m4CurrIdx;
              return (
                <div key={i} className="flex items-center">
                  {i > 0 && <ArrowRight className="mx-2 text-muted-foreground" />}
                  <div className="relative">
                    {isPatrolHere && <div className="absolute -top-12 left-1/2 -translate-x-1/2 animate-bounce flex flex-col items-center"><div className="bg-blue-500 text-white text-xs font-bold px-2 py-1 rounded shadow-lg">Patrol</div><div className="w-2 h-2 bg-blue-500 rotate-45 -mt-1" /></div>}
                    {m4EditIdx === i ? (
                      <div className="w-16 h-20 bg-primary/20 border-2 border-primary rounded-lg flex items-center justify-center p-1"><input autoFocus type="number" className="w-full bg-background text-center font-bold outline-none" value={m4EditVal} onChange={e => setM4EditVal(e.target.value)} onBlur={() => { if (m4EditVal) { const newArr = [...m4Nodes]; newArr[i] = Number(m4EditVal); setM4Nodes(newArr); addXp(100, "Building Updated"); } setM4EditIdx(null); }} onKeyDown={e => { if (e.key === 'Enter') e.currentTarget.blur(); }} /></div>
                    ) : (
                      <div onDoubleClick={() => { setM4EditIdx(i); setM4EditVal(String(val)); }} className={`w-16 h-20 rounded-lg flex items-center justify-center border-2 cursor-pointer transition-colors ${isPatrolHere ? 'bg-blue-500/10 border-blue-500 shadow-md' : 'bg-secondary border-border hover:border-primary/50'}`}><span className="font-bold text-xl">{val}</span></div>
                    )}
                  </div>
                </div>
              );
            })}
            <ArrowRight className="mx-2 text-muted-foreground" /><div className="font-bold text-muted-foreground">NULL</div>
         </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-secondary/50 p-4 rounded-xl border border-border">
          <h3 className="font-bold mb-4 flex items-center gap-2"><Zap className="size-4 text-blue-500" /> Patrol Controls</h3>
          <div className="flex gap-2">
            <button onClick={() => setM4CurrIdx(-1)} className="px-4 py-2 bg-secondary border border-border rounded font-bold hover:bg-secondary/80">Reset to Base</button>
            <button onClick={() => { if (m4CurrIdx < m4Nodes.length) { setM4CurrIdx(c => c + 1); addXp(20, "Patrolled Forward"); } }} className="flex-1 bg-blue-600 text-white font-bold rounded flex items-center justify-center gap-2">Drive to Next Node <ChevronRight className="size-4" /></button>
          </div>
        </div>
        <div className="bg-secondary/50 p-4 rounded-xl border border-border">
          <h3 className="font-bold mb-2 flex items-center gap-2"><Shield className="size-4 text-primary" /> Audit Tasks</h3>
          <ul className="text-sm text-muted-foreground space-y-2 list-disc list-inside">
            <li>Traverse every node with the Patrol Car.</li><li>Double-click any building block to <strong>Update</strong> its value.</li><li>Observe how pointers remain completely unaffected during traversal and updates!</li>
          </ul>
        </div>
      </div>
    </div>
  );

  // ---------------------------------------------------------
  // MISSION 5: DUPLICATE CITIZEN INVESTIGATION (ds-e3-1)
  // ---------------------------------------------------------
  const [m5Nodes, setM5Nodes] = useState([10, 20, 10, 30, 20]);
  const [m5ScanIdx, setM5ScanIdx] = useState(0);

  const renderMission5 = () => {
    // Determine if current scan index is a duplicate of something before it
    const isDup = m5Nodes.slice(0, m5ScanIdx).includes(m5Nodes[m5ScanIdx]);
    
    return (
      <div className="flex flex-col h-full">
        <div className="flex-1 flex items-center justify-center bg-card rounded-lg border border-border p-8 mb-4 overflow-x-auto relative">
           <div className="flex items-center">
              <div className="font-bold text-primary mr-4">HEAD</div>
              {m5Nodes.map((val, i) => {
                const isScanning = i === m5ScanIdx;
                const isDuplicateFound = isScanning && isDup;
                
                return (
                  <div key={i} className="flex items-center">
                    {i > 0 && <ArrowRight className="mx-2 text-muted-foreground" />}
                    <div className="relative">
                      {isScanning && (
                        <div className="absolute -top-10 left-1/2 -translate-x-1/2 flex flex-col items-center">
                          <Search className={`size-6 ${isDup ? 'text-red-500 animate-pulse' : 'text-blue-500'}`} />
                        </div>
                      )}
                      <div className={`w-16 h-20 rounded-lg flex items-center justify-center border-2 transition-all
                        ${isDuplicateFound ? 'bg-red-500/20 border-red-500 ring-4 ring-red-500/30' : 
                          isScanning ? 'bg-blue-500/10 border-blue-500 shadow-md' : 'bg-secondary border-border'}`}>
                        <span className="font-bold text-xl">{val}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
              <ArrowRight className="mx-2 text-muted-foreground" /><div className="font-bold text-muted-foreground">NULL</div>
           </div>
        </div>
        <div className="bg-secondary/50 p-6 rounded-xl border border-border text-center max-w-xl mx-auto w-full">
           <h3 className="font-bold mb-2 flex items-center justify-center gap-2 text-red-500"><Search className="size-5" /> Data Inspector Console</h3>
           <p className="text-sm text-muted-foreground mb-6">Scan the city. If a duplicate citizen ID is found, demolish the house and rewire.</p>
           
           {m5ScanIdx < m5Nodes.length ? (
             <div className="flex justify-center gap-4">
                <button onClick={() => { if (!isDup) setM5ScanIdx(s => s + 1); else showError("Cannot proceed! Demolish the duplicate first."); }} className={`px-6 py-2 border rounded-lg font-bold ${!isDup ? 'bg-blue-600 text-white' : 'bg-secondary text-muted-foreground border-border'}`}>Scan Next</button>
                <button onClick={() => { if (isDup) { const newArr = [...m5Nodes]; newArr.splice(m5ScanIdx, 1); setM5Nodes(newArr); addXp(200, "Duplicate Removed"); } else { showError("Not a duplicate!"); } }} className={`px-6 py-2 border rounded-lg font-bold flex items-center gap-2 ${isDup ? 'bg-red-600 text-white animate-pulse' : 'bg-secondary text-muted-foreground border-border'}`}><Bomb className="size-4" /> Demolish Duplicate</button>
             </div>
           ) : (
             <div className="text-green-500 font-bold flex items-center justify-center gap-2"><CheckCircle2 className="size-5" /> City Registry Cleaned!</div>
           )}
        </div>
      </div>
    );
  };

  // ---------------------------------------------------------
  // MISSION 6: ENERGY REACTOR (ds-e3-2)
  // ---------------------------------------------------------
  const [m6A, setM6A] = useState([{c:5, p:2}, {c:4, p:1}, {c:2, p:0}]);
  const [m6B, setM6B] = useState([{c:3, p:2}, {c:7, p:1}, {c:1, p:0}]);
  const [m6Merged, setM6Merged] = useState<{c:number, p:number}[]>([]);
  
  const m6MergeNext = () => {
    if (m6A.length === 0 && m6B.length === 0) return;
    
    let nextTerm;
    const a = m6A[0];
    const b = m6B[0];
    
    if (a && (!b || a.p > b.p)) {
      nextTerm = a;
      setM6A(m6A.slice(1));
    } else if (b && (!a || b.p > a.p)) {
      nextTerm = b;
      setM6B(m6B.slice(1));
    } else if (a && b && a.p === b.p) {
      nextTerm = { c: a.c + b.c, p: a.p };
      setM6A(m6A.slice(1));
      setM6B(m6B.slice(1));
    }
    
    if (nextTerm) {
      setM6Merged([...m6Merged, nextTerm]);
      addXp(50, "Energy Fused");
    }
  };

  const renderMission6 = () => (
    <div className="flex flex-col h-full">
      <div className="flex-1 flex flex-col items-center justify-center bg-card rounded-lg border border-border p-8 mb-4 gap-8">
         <div className="flex flex-col gap-6 w-full max-w-2xl">
            {/* Reactor A */}
            <div className="flex items-center">
               <div className="w-24 text-right font-bold text-blue-500 mr-4">Reactor A</div>
               {m6A.map((t, i) => (
                 <div key={i} className="flex items-center"><div className="bg-blue-500/20 border-2 border-blue-500 rounded px-3 py-2 font-mono font-bold text-blue-400">{t.c}x<sup className="ml-0.5">{t.p}</sup></div>{i < m6A.length - 1 && <ArrowRight className="mx-2 text-muted-foreground size-4" />}</div>
               ))}
               {m6A.length === 0 && <div className="text-muted-foreground font-mono">NULL</div>}
            </div>
            
            {/* Reactor B */}
            <div className="flex items-center">
               <div className="w-24 text-right font-bold text-green-500 mr-4">Reactor B</div>
               {m6B.map((t, i) => (
                 <div key={i} className="flex items-center"><div className="bg-green-500/20 border-2 border-green-500 rounded px-3 py-2 font-mono font-bold text-green-400">{t.c}x<sup className="ml-0.5">{t.p}</sup></div>{i < m6B.length - 1 && <ArrowRight className="mx-2 text-muted-foreground size-4" />}</div>
               ))}
               {m6B.length === 0 && <div className="text-muted-foreground font-mono">NULL</div>}
            </div>

            {/* Merged Reactor */}
            <div className="flex items-center border-t-2 border-dashed border-border pt-6">
               <div className="w-24 text-right font-bold text-yellow-500 mr-4">Merged</div>
               {m6Merged.map((t, i) => (
                 <div key={i} className="flex items-center animate-in slide-in-from-top-4 zoom-in"><div className="bg-yellow-500/20 border-2 border-yellow-500 rounded px-3 py-2 font-mono font-bold text-yellow-400">{t.c}x<sup className="ml-0.5">{t.p}</sup></div>{i < m6Merged.length - 1 && <ArrowRight className="mx-2 text-muted-foreground size-4" />}</div>
               ))}
               <div className="ml-4 text-muted-foreground font-mono">{m6Merged.length > 0 && m6A.length === 0 && m6B.length === 0 ? "NULL" : ""}</div>
            </div>
         </div>
      </div>
      <div className="bg-secondary/50 p-4 rounded-xl border border-border text-center">
         <button onClick={m6MergeNext} disabled={m6A.length === 0 && m6B.length === 0} className="px-8 py-3 bg-yellow-600 hover:bg-yellow-700 text-white font-bold rounded-lg flex items-center justify-center gap-2 mx-auto disabled:opacity-50">
           <FlaskConical className="size-5" /> Merge Highest Power Term
         </button>
      </div>
    </div>
  );

  // ---------------------------------------------------------
  // MISSION 7: TRANSPORT TERMINAL (ds-e3-3)
  // ---------------------------------------------------------
  const [m7Deque, setM7Deque] = useState<number[]>([10, 20]);
  const [m7TrainNo, setM7TrainNo] = useState(30);

  const renderMission7 = () => (
    <div className="flex flex-col h-full">
      <div className="flex-1 flex flex-col items-center justify-center bg-card rounded-lg border border-border p-8 mb-4 relative overflow-x-auto min-h-[300px]">
         <div className="flex items-center gap-2">
            <div className="font-bold text-blue-500 mr-4 flex flex-col items-center"><TrainFront className="size-6 mb-1"/> FRONT</div>
            {m7Deque.map((val, i) => (
              <div key={i} className="flex items-center animate-in zoom-in">
                {i > 0 && <ArrowLeftRight className="mx-2 text-muted-foreground size-4" />}
                <div className="w-16 h-12 bg-secondary border-2 border-border rounded flex items-center justify-center">
                  <span className="font-bold text-lg">{val}</span>
                </div>
              </div>
            ))}
            {m7Deque.length === 0 && <div className="text-muted-foreground italic px-8">Empty Platform</div>}
            <div className="font-bold text-green-500 ml-4 flex flex-col items-center"><TrainFront className="size-6 mb-1"/> REAR</div>
         </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-secondary/50 p-4 rounded-xl border border-border text-center">
          <h3 className="font-bold mb-4 text-blue-500">FRONT Operations</h3>
          <div className="flex gap-2 justify-center">
            <button onClick={() => { setM7Deque([m7TrainNo, ...m7Deque]); setM7TrainNo(t=>t+10); addXp(20, "Front Insert"); }} className="px-4 py-2 bg-blue-600 text-white rounded font-bold">Insert Front</button>
            <button onClick={() => { if(m7Deque.length>0) { setM7Deque(m7Deque.slice(1)); addXp(20, "Front Delete"); } else showError("Underflow!"); }} className="px-4 py-2 border border-blue-600 text-blue-500 rounded font-bold hover:bg-blue-600/10">Delete Front</button>
          </div>
        </div>
        <div className="bg-secondary/50 p-4 rounded-xl border border-border text-center">
          <h3 className="font-bold mb-4 text-green-500">REAR Operations</h3>
          <div className="flex gap-2 justify-center">
            <button onClick={() => { setM7Deque([...m7Deque, m7TrainNo]); setM7TrainNo(t=>t+10); addXp(20, "Rear Insert"); }} className="px-4 py-2 bg-green-600 text-white rounded font-bold">Insert Rear</button>
            <button onClick={() => { if(m7Deque.length>0) { setM7Deque(m7Deque.slice(0, -1)); addXp(20, "Rear Delete"); } else showError("Underflow!"); }} className="px-4 py-2 border border-green-600 text-green-500 rounded font-bold hover:bg-green-600/10">Delete Rear</button>
          </div>
        </div>
      </div>
    </div>
  );

  // ---------------------------------------------------------
  // MISSION 8: TWIN HIGHWAY (ds-e4-1)
  // ---------------------------------------------------------
  const [m8CurrIdx, setM8CurrIdx] = useState(0);
  const m8Nodes = [10, 20, 30, 40];

  const renderMission8 = () => (
    <div className="flex flex-col h-full">
      <div className="flex-1 flex items-center justify-center bg-card rounded-lg border border-border p-8 mb-4 overflow-x-auto">
         <div className="flex items-center gap-1">
            <div className="font-bold text-primary mr-4 text-center">HEAD<br/><span className="text-xs text-muted-foreground">NULL ⬅</span></div>
            {m8Nodes.map((val, i) => {
              const isHere = i === m8CurrIdx;
              return (
                <div key={i} className="flex items-center">
                  {i > 0 && (
                    <div className="flex flex-col items-center mx-2 gap-1 text-primary">
                      <ArrowRight className="size-4" />
                      <ArrowRight className="size-4 rotate-180" />
                    </div>
                  )}
                  <div className={`w-20 h-24 rounded-lg flex flex-col items-center justify-between border-2 transition-all p-2
                    ${isHere ? 'bg-primary/20 border-primary ring-4 ring-primary/30' : 'bg-secondary border-border'}
                  `}>
                    <div className="text-[10px] text-muted-foreground border-b border-border w-full text-center pb-1">Prev</div>
                    <span className="font-bold text-xl">{val}</span>
                    <div className="text-[10px] text-muted-foreground border-t border-border w-full text-center pt-1">Next</div>
                  </div>
                </div>
              );
            })}
            <div className="font-bold text-primary ml-4 text-center">TAIL<br/><span className="text-xs text-muted-foreground">➡ NULL</span></div>
         </div>
      </div>
      <div className="bg-secondary/50 p-4 rounded-xl border border-border text-center max-w-md mx-auto w-full">
         <h3 className="font-bold mb-4">Doubly Linked List Traversal</h3>
         <div className="flex justify-center gap-4">
           <button onClick={() => { if(m8CurrIdx > 0) { setM8CurrIdx(c=>c-1); addXp(50, "Traversed Backward"); } else showError("Hit NULL at Head!"); }} className="px-6 py-2 border border-primary text-primary font-bold rounded-lg hover:bg-primary/10 flex items-center gap-2"><ArrowRight className="rotate-180 size-4"/> Move Prev</button>
           <button onClick={() => { if(m8CurrIdx < m8Nodes.length-1) { setM8CurrIdx(c=>c+1); addXp(50, "Traversed Forward"); } else showError("Hit NULL at Tail!"); }} className="px-6 py-2 bg-primary text-primary-foreground font-bold rounded-lg hover:opacity-90 flex items-center gap-2">Move Next <ArrowRight className="size-4"/></button>
         </div>
      </div>
    </div>
  );

  // ---------------------------------------------------------
  // MISSION 9: INFINITE RING CITY (ds-e4-2)
  // ---------------------------------------------------------
  const [m9CurrIdx, setM9CurrIdx] = useState(0);
  const m9Nodes = [10, 20, 30, 40];

  const renderMission9 = () => (
    <div className="flex flex-col h-full">
      <div className="flex-1 flex items-center justify-center bg-card rounded-lg border border-border p-8 mb-4 relative">
         <div className="flex items-center relative">
            <div className="font-bold text-primary mr-4">HEAD</div>
            {m9Nodes.map((val, i) => {
              const isHere = i === m9CurrIdx;
              return (
                <div key={i} className="flex items-center">
                  {i > 0 && <ArrowRight className="mx-3 text-primary size-5" />}
                  <div className={`w-16 h-16 rounded-full flex items-center justify-center border-2 transition-all
                    ${isHere ? 'bg-primary border-primary text-primary-foreground shadow-[0_0_20px_rgba(var(--primary),0.8)]' : 'bg-secondary border-border'}
                  `}>
                    <span className="font-bold text-xl">{val}</span>
                  </div>
                </div>
              );
            })}
            
            {/* The Circular Wrapping Arrow SVG */}
            <svg className="absolute w-full h-24 -bottom-16 left-0 pointer-events-none" style={{ overflow: 'visible' }}>
              <path 
                d={`M ${m9Nodes.length * 88 - 30} 10 Q ${m9Nodes.length * 88} 80, ${m9Nodes.length * 44} 80 T 40 10`} 
                fill="none" 
                stroke="currentColor" 
                className="text-primary"
                strokeWidth="2" 
                strokeDasharray="5,5" 
                markerEnd="url(#arrowhead)" 
              />
              <defs>
                <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                  <polygon points="0 0, 10 3.5, 0 7" fill="currentColor" className="text-primary" />
                </marker>
              </defs>
            </svg>
         </div>
      </div>
      <div className="bg-secondary/50 p-4 rounded-xl border border-border text-center max-w-md mx-auto w-full">
         <h3 className="font-bold mb-4 flex justify-center items-center gap-2"><Repeat className="size-5 text-primary" /> Infinite Traversal</h3>
         <p className="text-sm text-muted-foreground mb-4">Notice how moving Next from the last node ({m9Nodes[m9Nodes.length-1]}) loops directly back to the Head ({m9Nodes[0]}). There is no NULL.</p>
         <button onClick={() => { setM9CurrIdx((m9CurrIdx + 1) % m9Nodes.length); addXp(50, "Orbital Loop"); }} className="px-8 py-3 bg-primary text-primary-foreground font-bold rounded-lg hover:opacity-90 flex items-center gap-2 mx-auto">
           Move Next <ArrowRight className="size-4"/>
         </button>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col h-full bg-background text-foreground p-6 overflow-hidden relative font-sans">
      {/* Top Panel */}
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-border shrink-0">
        <div>
          <h2 className="text-2xl font-bold text-primary flex items-center gap-2 uppercase tracking-wide">
            <Building className="size-6 text-primary" /> Linkopolis Master Campaign
          </h2>
        </div>
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2 bg-secondary/50 px-4 py-1.5 rounded-full border border-border font-bold shadow-sm">
            <Star className="size-4 text-yellow-500" /> {xp} XP
          </div>
          <div className="text-sm font-bold text-muted-foreground uppercase">
             {/* Week 2 */}
             {expId === "ds-e2-1" && "Mission 1: Expansion"}
             {expId === "ds-e2-2" && "Mission 2: Reverse Flow"}
             {expId === "ds-e2-3" && "Mission 3: Time Wizard"}
             {expId === "ds-e2-4" && "Mission 4: Network Patrol"}
             {/* Week 3 */}
             {expId === "ds-e3-1" && "Mission 5: Citizen Investigation"}
             {expId === "ds-e3-2" && "Mission 6: Energy Reactor"}
             {expId === "ds-e3-3" && "Mission 7: Transport Terminal"}
             {/* Week 4 */}
             {expId === "ds-e4-1" && "Mission 8: Twin Highway System"}
             {expId === "ds-e4-2" && "Mission 9: Infinite Ring City"}
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
        {expId === "ds-e2-1" && renderMission1()}
        {expId === "ds-e2-2" && renderMission2()}
        {expId === "ds-e2-3" && renderMission3()}
        {expId === "ds-e2-4" && renderMission4()}
        
        {expId === "ds-e3-1" && renderMission5()}
        {expId === "ds-e3-2" && renderMission6()}
        {expId === "ds-e3-3" && renderMission7()}
        
        {expId === "ds-e4-1" && renderMission8()}
        {expId === "ds-e4-2" && renderMission9()}
      </div>
    </div>
  );
}
