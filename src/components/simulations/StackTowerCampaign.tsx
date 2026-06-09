import { useState, useEffect } from "react";
import { 
  Building, ArrowDown, ArrowUp, AlertTriangle, ShieldAlert, Zap, Clock, Shield, Plus, Trash2, 
  RefreshCw, Lock, Unlock, Zap as Lightning, Star, ArrowRight, CornerDownRight, Database, ShieldCheck, Link
} from "lucide-react";

type StackTowerProps = {
  expId: string;
};

export function StackTowerCampaign({ expId }: StackTowerProps) {
  // Global XP for the Stack Tower District
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
  // MISSION 1: STACK USING ARRAY (Fixed Capacity)
  // ---------------------------------------------------------
  const MAX_CAPACITY = 5;
  const [m1Stack, setM1Stack] = useState<number[]>([]);
  const [m1Input, setM1Input] = useState(10);
  const [m1Overflow, setM1Overflow] = useState(false);

  const m1Push = () => {
    if (m1Stack.length >= MAX_CAPACITY) {
      setM1Overflow(true);
      showError("STACK OVERFLOW!");
      setTimeout(() => setM1Overflow(false), 2000);
      return;
    }
    setM1Stack([m1Input, ...m1Stack]);
    setM1Input(v => v + 10);
    addXp(20, "Container Pushed");
  };

  const m1Pop = () => {
    if (m1Stack.length === 0) {
      showError("STACK UNDERFLOW!");
      return;
    }
    setM1Stack(m1Stack.slice(1));
    addXp(20, "Container Popped");
  };

  const renderMission1 = () => (
    <div className="flex flex-col h-full">
      <div className={`flex-1 flex flex-col items-center justify-end bg-card rounded-lg border-2 ${m1Overflow ? 'border-red-500 bg-red-500/10' : 'border-border'} p-8 mb-4 relative overflow-hidden transition-colors`}>
        {m1Overflow && (
          <div className="absolute top-10 flex flex-col items-center animate-pulse text-red-500 z-20">
            <AlertTriangle className="size-16 mb-2" />
            <h2 className="text-3xl font-black tracking-widest">OVERFLOW</h2>
          </div>
        )}
        
        <div className="flex gap-16 items-end relative w-full justify-center">
          {/* Fixed Array Tower visually represented as a rigid grid */}
          <div className="flex flex-col border-x-4 border-b-4 border-primary/50 w-48 bg-secondary/20 relative">
             {/* Render empty slots based on max capacity */}
             {Array.from({ length: MAX_CAPACITY }).map((_, i) => {
               // Calculate which box belongs in this slot (top to bottom)
               const boxIndex = MAX_CAPACITY - 1 - i;
               // Stacks grow from bottom up, so the "first" element in our array is the TOP of the stack.
               // Our array [top, next, ..., bottom].
               // If max is 5, and we have 2 items [A, B], then bottom is B, top is A.
               // slot 4 (bottom) -> B (index 1)
               // slot 3 -> A (index 0)
               // slot 2 -> empty
               // slot 1 -> empty
               // slot 0 (top) -> empty
               const itemInStackIndex = m1Stack.length - 1 - boxIndex;
               const hasItem = itemInStackIndex >= 0 && itemInStackIndex < m1Stack.length;
               const itemVal = hasItem ? m1Stack[itemInStackIndex] : null;

               return (
                 <div key={i} className={`h-16 w-full border-t border-border/50 flex items-center justify-center relative
                   ${hasItem ? 'bg-primary border-2 border-primary text-primary-foreground shadow-lg' : ''}
                   ${itemInStackIndex === 0 ? 'ring-4 ring-yellow-500/50 z-10' : ''}
                 `}>
                   {hasItem && <span className="font-bold text-2xl">{itemVal}</span>}
                   {itemInStackIndex === 0 && <div className="absolute -left-12 font-bold text-yellow-500 animate-pulse">TOP ➔</div>}
                 </div>
               );
             })}
          </div>
        </div>
      </div>
      <div className="bg-secondary/50 p-4 rounded-xl border border-border text-center max-w-lg mx-auto w-full">
         <h3 className="font-bold mb-4 flex items-center justify-center gap-2"><Database className="size-5 text-blue-500" /> Array Warehouse (Fixed: {MAX_CAPACITY})</h3>
         <div className="flex justify-center gap-4">
           <input type="number" value={m1Input} onChange={e=>setM1Input(Number(e.target.value))} className="w-24 bg-background border border-border rounded text-center font-bold" />
           <button onClick={m1Push} className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg flex items-center gap-2"><ArrowDown className="size-4"/> PUSH</button>
           <button onClick={m1Pop} className="px-6 py-2 border border-red-500 text-red-500 hover:bg-red-500/10 font-bold rounded-lg flex items-center gap-2"><ArrowUp className="size-4"/> POP</button>
         </div>
      </div>
    </div>
  );

  // ---------------------------------------------------------
  // MISSION 2: STACK USING LINKED LIST (Dynamic Capacity)
  // ---------------------------------------------------------
  const [m2Stack, setM2Stack] = useState<number[]>([]);
  const [m2Input, setM2Input] = useState(10);

  const m2Push = () => {
    setM2Stack([{val: m2Input, id: Date.now()}, ...m2Stack] as any);
    setM2Input(v => v + 10);
    addXp(30, "Dynamic Floor Built");
  };

  const m2Pop = () => {
    if (m2Stack.length === 0) {
      showError("STACK UNDERFLOW!");
      return;
    }
    setM2Stack(m2Stack.slice(1));
    addXp(30, "Floor Demolished");
  };

  const renderMission2 = () => (
    <div className="flex flex-col h-full">
      <div className="flex-1 flex flex-col items-center justify-start bg-card rounded-lg border border-border p-8 mb-4 overflow-y-auto">
         <div className="flex flex-col items-center">
            {m2Stack.length > 0 && <div className="font-bold text-primary mb-4 border-b-2 border-primary pb-1">TOP POINTER</div>}
            {m2Stack.length === 0 && <div className="font-bold text-muted-foreground mt-10">NULL</div>}
            
            {m2Stack.map((node: any, i) => (
              <div key={node.id} className="flex flex-col items-center animate-in slide-in-from-top-4 fade-in">
                <div className={`w-32 h-16 rounded-xl flex items-center justify-center border-2 border-primary shadow-[0_0_15px_rgba(var(--primary),0.3)]
                  ${i === 0 ? 'bg-primary text-primary-foreground ring-4 ring-primary/20' : 'bg-secondary text-foreground'}
                `}>
                  <span className="font-bold text-2xl">{node.val}</span>
                </div>
                <ArrowDown className="my-2 text-muted-foreground size-5" />
              </div>
            ))}
            
            {m2Stack.length > 0 && <div className="font-bold text-muted-foreground">NULL</div>}
         </div>
      </div>
      <div className="bg-secondary/50 p-4 rounded-xl border border-border text-center max-w-lg mx-auto w-full">
         <h3 className="font-bold mb-4 flex items-center justify-center gap-2"><Link className="size-5 text-purple-500" /> Linked Stack (Dynamic Capacity)</h3>
         <p className="text-sm text-muted-foreground mb-4">Notice how there is no rigid container. Platforms are built dynamically in memory.</p>
         <div className="flex justify-center gap-4">
           <input type="number" value={m2Input} onChange={e=>setM2Input(Number(e.target.value))} className="w-24 bg-background border border-border rounded text-center font-bold" />
           <button onClick={m2Push} className="px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-lg flex items-center gap-2"><ArrowDown className="size-4"/> PUSH</button>
           <button onClick={m2Pop} className="px-6 py-2 border border-red-500 text-red-500 hover:bg-red-500/10 font-bold rounded-lg flex items-center gap-2"><ArrowUp className="size-4"/> POP</button>
         </div>
      </div>
    </div>
  );

  // ---------------------------------------------------------
  // MISSION 3: POSTFIX REACTOR CONTROL (ds-e5-3)
  // ---------------------------------------------------------
  const [m3Expression, setM3Expression] = useState(["5", "2", "+", "3", "*"]);
  const [m3Stack, setM3Stack] = useState<number[]>([]);
  const [m3Result, setM3Result] = useState<number | null>(null);

  const m3Step = () => {
    if (m3Expression.length === 0) return;
    
    const token = m3Expression[0];
    const remExp = m3Expression.slice(1);
    
    if (!isNaN(Number(token))) {
      // It's a number, push
      setM3Stack([Number(token), ...m3Stack]);
      setM3Expression(remExp);
      addXp(10, "Energy Loaded");
    } else {
      // It's an operator
      if (m3Stack.length < 2) {
        showError("Invalid Expression: Not enough operands!");
        return;
      }
      const val1 = m3Stack[0];
      const val2 = m3Stack[1];
      const newStack = m3Stack.slice(2);
      let res = 0;
      if (token === "+") res = val2 + val1;
      else if (token === "-") res = val2 - val1;
      else if (token === "*") res = val2 * val1;
      else if (token === "/") res = Math.floor(val2 / val1);
      
      setM3Stack([res, ...newStack]);
      setM3Expression(remExp);
      addXp(100, "Energy Fused!");
      
      if (remExp.length === 0) {
        setM3Result(res);
        addXp(200, "Reactor Powered!");
      }
    }
  };

  const renderMission3 = () => (
    <div className="flex h-full gap-4">
      <div className="flex-1 flex flex-col items-center bg-card rounded-lg border border-border p-6 overflow-hidden relative">
         <h3 className="font-bold mb-4 text-orange-500 flex items-center gap-2"><Lightning className="size-5" /> Reactor Stack</h3>
         <div className="flex-1 w-48 border-x-4 border-b-4 border-orange-500/50 bg-secondary/10 flex flex-col justify-end items-center pb-2 relative">
           {m3Stack.map((val, i) => (
             <div key={i} className="w-40 h-16 mb-1 bg-orange-500 text-white rounded-lg border-2 border-orange-400 shadow-[0_0_15px_rgba(249,115,22,0.5)] flex items-center justify-center animate-in slide-in-from-top-10">
               <span className="font-bold text-2xl">{val}</span>
             </div>
           ))}
         </div>
         {m3Result !== null && (
           <div className="absolute inset-0 bg-background/80 flex flex-col items-center justify-center animate-in fade-in zoom-in">
             <div className="size-32 bg-orange-500 rounded-full blur-3xl absolute opacity-50 animate-pulse"></div>
             <h2 className="text-4xl font-black text-orange-500 relative z-10 drop-shadow-lg">REACTOR ONLINE</h2>
             <p className="text-2xl font-bold mt-2 relative z-10 text-foreground">Output: {m3Result} MW</p>
           </div>
         )}
      </div>
      
      <div className="flex-1 flex flex-col gap-4">
        <div className="bg-secondary/50 p-6 rounded-xl border border-border h-full flex flex-col items-center justify-center">
          <h3 className="font-bold mb-4 text-center border-b border-border w-full pb-2">Incoming Command Queue</h3>
          <div className="flex gap-2 flex-wrap justify-center mb-8">
            {m3Expression.map((tok, i) => (
              <div key={i} className={`size-12 flex items-center justify-center rounded font-bold text-xl
                ${i === 0 ? 'bg-primary text-primary-foreground ring-2 ring-primary/50 ring-offset-2 ring-offset-background' : 'bg-background border border-border'}
              `}>
                {tok}
              </div>
            ))}
            {m3Expression.length === 0 && <div className="text-muted-foreground italic">Queue Empty</div>}
          </div>
          
          <button 
            onClick={m3Step} 
            disabled={m3Expression.length === 0}
            className="px-8 py-3 bg-orange-600 hover:bg-orange-700 disabled:opacity-50 text-white font-bold rounded-lg flex items-center gap-2"
          >
            <ArrowRight className="size-5" /> Process Next Token
          </button>
        </div>
      </div>
    </div>
  );

  // ---------------------------------------------------------
  // MISSION 4: SECURITY GATE (ds-e5-4)
  // ---------------------------------------------------------
  const [m4Input, setM4Input] = useState("((()))");
  const [m4Exp, setM4Exp] = useState(m4Input.split(""));
  const [m4Stack, setM4Stack] = useState<string[]>([]);
  const [m4Status, setM4Status] = useState<"idle" | "checking" | "valid" | "invalid">("idle");
  const [m4Msg, setM4Msg] = useState("");

  const m4Reset = () => {
    setM4Exp(m4Input.split(""));
    setM4Stack([]);
    setM4Status("idle");
    setM4Msg("");
  };

  const m4Step = () => {
    if (m4Status === "idle") setM4Status("checking");
    
    if (m4Exp.length === 0) {
      if (m4Stack.length === 0) {
        setM4Status("valid");
        setM4Msg("Access Granted!");
        addXp(300, "Security Cleared");
      } else {
        setM4Status("invalid");
        setM4Msg("Security Breach: Unclosed brackets remaining.");
      }
      return;
    }

    const char = m4Exp[0];
    const rem = m4Exp.slice(1);
    setM4Exp(rem);

    if (char === '(' || char === '{' || char === '[') {
      setM4Stack([char, ...m4Stack]);
      addXp(10, "Token Pushed");
    } else if (char === ')' || char === '}' || char === ']') {
      if (m4Stack.length === 0) {
        setM4Status("invalid");
        setM4Msg(`Security Breach: Unexpected closing bracket '${char}'.`);
        return;
      }
      
      const top = m4Stack[0];
      const isMatch = (char === ')' && top === '(') || (char === '}' && top === '{') || (char === ']' && top === '[');
      
      if (isMatch) {
        setM4Stack(m4Stack.slice(1));
        addXp(20, "Tokens Matched");
      } else {
        setM4Status("invalid");
        setM4Msg(`Security Breach: Mismatch '${top}' with '${char}'.`);
        return;
      }
    }
  };

  const renderMission4 = () => (
    <div className="flex flex-col h-full gap-4">
      <div className="flex items-center gap-4 bg-secondary/50 p-4 rounded-xl border border-border">
         <ShieldCheck className="size-6 text-green-500" />
         <div className="flex-1 flex gap-2">
           <input type="text" value={m4Input} onChange={e => {setM4Input(e.target.value); setM4Exp(e.target.value.split("")); setM4Stack([]); setM4Status("idle"); setM4Msg("");}} className="flex-1 bg-background border border-border rounded px-4 py-2 font-mono font-bold tracking-widest text-lg" placeholder="Enter brackets () {} []" />
           <button onClick={m4Reset} className="px-4 py-2 border border-border rounded font-bold hover:bg-secondary">Reset</button>
         </div>
      </div>
      
      <div className="flex-1 flex gap-4">
        {/* Token Stream */}
        <div className="flex-1 bg-card rounded-xl border border-border p-6 flex flex-col items-center">
           <h3 className="font-bold mb-6 text-center w-full">Incoming Stream</h3>
           <div className="flex flex-wrap gap-2 justify-center content-start h-full">
             {m4Exp.map((char, i) => (
               <div key={i} className={`size-12 rounded flex items-center justify-center font-mono font-bold text-2xl
                 ${i === 0 ? 'bg-primary text-primary-foreground shadow-lg scale-110' : 'bg-secondary text-muted-foreground'}
               `}>
                 {char}
               </div>
             ))}
             {m4Exp.length === 0 && m4Status !== "idle" && <div className="text-muted-foreground italic w-full text-center">Stream EOF</div>}
           </div>
           
           <div className="mt-auto pt-4 border-t border-border w-full text-center">
             <button onClick={m4Step} disabled={m4Status === "valid" || m4Status === "invalid"} className="px-8 py-3 bg-green-600 hover:bg-green-700 disabled:opacity-50 text-white font-bold rounded-lg flex items-center gap-2 mx-auto">
                <ArrowRight className="size-5" /> Verify Next Token
             </button>
           </div>
        </div>

        {/* Security Stack */}
        <div className="flex-[0.5] bg-card rounded-xl border border-border p-6 flex flex-col items-center justify-end relative">
           {m4Status === "invalid" && (
             <div className="absolute inset-0 bg-red-500/20 flex flex-col items-center justify-center p-4 text-center z-20 backdrop-blur-[2px]">
               <ShieldAlert className="size-16 text-red-500 mb-2 animate-bounce" />
               <div className="bg-background text-red-500 font-bold p-2 rounded border-2 border-red-500">{m4Msg}</div>
             </div>
           )}
           {m4Status === "valid" && (
             <div className="absolute inset-0 bg-green-500/20 flex flex-col items-center justify-center p-4 text-center z-20 backdrop-blur-[2px]">
               <Unlock className="size-16 text-green-500 mb-2" />
               <div className="bg-background text-green-500 font-bold p-2 rounded border-2 border-green-500">{m4Msg}</div>
             </div>
           )}

           <h3 className="absolute top-6 font-bold text-muted-foreground">Security Stack</h3>
           <div className="w-24 border-x-4 border-b-4 border-muted flex flex-col justify-end items-center pb-2 bg-secondary/10 relative h-64 overflow-y-auto">
             {m4Stack.map((char, i) => (
               <div key={i} className="w-16 h-12 mb-1 bg-secondary border border-border rounded flex items-center justify-center animate-in slide-in-from-top-4">
                 <span className="font-mono font-bold text-xl">{char}</span>
               </div>
             ))}
             {m4Stack.length === 0 && <div className="text-muted-foreground italic text-xs absolute top-1/2 -translate-y-1/2">Empty</div>}
           </div>
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
            <Building className="size-6 text-primary" /> Stack Tower District
          </h2>
        </div>
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2 bg-secondary/50 px-4 py-1.5 rounded-full border border-border font-bold shadow-sm">
            <Star className="size-4 text-yellow-500" /> {xp} XP
          </div>
          <div className="text-sm font-bold text-muted-foreground uppercase">
             {expId === "ds-e5-1" && "Mission 1: Array Warehouse"}
             {expId === "ds-e5-2" && "Mission 2: Dynamic Tower"}
             {expId === "ds-e5-3" && "Mission 3: Postfix Reactor"}
             {expId === "ds-e5-4" && "Mission 4: Security Gates"}
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
        {expId === "ds-e5-1" && renderMission1()}
        {expId === "ds-e5-2" && renderMission2()}
        {expId === "ds-e5-3" && renderMission3()}
        {expId === "ds-e5-4" && renderMission4()}
      </div>
    </div>
  );
}
