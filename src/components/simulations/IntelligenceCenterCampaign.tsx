import { useState } from "react";
import { 
  Building, ArrowRight, ArrowDown, ShieldAlert, Zap, Lock, Unlock,
  Search, BrainCircuit, Activity, Eye, ScanLine, Key, Binary, Star
} from "lucide-react";

type IntelligenceProps = {
  expId: string;
};

export function IntelligenceCenterCampaign({ expId }: IntelligenceProps) {
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
  // MISSION 1: OPERATION CIPHER (Infix to Postfix) - ds-e7-1
  // ---------------------------------------------------------
  // Precedence logic
  const precedence: Record<string, number> = {
    '+': 1, '-': 1,
    '*': 2, '/': 2,
    '^': 3
  };

  const [m1Tokens, setM1Tokens] = useState<string[]>(['A', '+', 'B', '*', 'C']);
  const [m1Stack, setM1Stack] = useState<string[]>([]);
  const [m1Output, setM1Output] = useState<string[]>([]);
  const [m1Log, setM1Log] = useState<string>("Ready to translate intercepted cipher.");

  const m1Step = () => {
    if (m1Tokens.length === 0) {
      if (m1Stack.length > 0) {
        // Pop remaining stack
        const op = m1Stack[0];
        setM1Stack(m1Stack.slice(1));
        setM1Output([...m1Output, op]);
        setM1Log(`End of input. Popping remaining operator: ${op}`);
        addXp(10, "Operator Popped");
      } else {
        setM1Log("Translation Complete!");
        addXp(200, "Cipher Translated!");
      }
      return;
    }

    const token = m1Tokens[0];
    const isOperand = /^[A-Z0-9]$/i.test(token);

    if (isOperand) {
      setM1Output([...m1Output, token]);
      setM1Tokens(m1Tokens.slice(1));
      setM1Log(`Operand '${token}' goes directly to the output conveyor.`);
      addXp(10, "Operand Processed");
      return;
    }

    // It's an operator
    if (m1Stack.length === 0) {
      setM1Stack([token]);
      setM1Tokens(m1Tokens.slice(1));
      setM1Log(`Operator Stack is empty. Pushing '${token}'.`);
      addXp(10, "Operator Pushed");
      return;
    }

    const topOp = m1Stack[0];
    if (precedence[topOp] >= precedence[token]) {
      // Pop higher or equal precedence
      setM1Output([...m1Output, topOp]);
      setM1Stack(m1Stack.slice(1));
      setM1Log(`'${topOp}' has >= precedence than '${token}'. Popping '${topOp}'.`);
      addXp(20, "Precedence Check Passed");
    } else {
      // Push token
      setM1Stack([token, ...m1Stack]);
      setM1Tokens(m1Tokens.slice(1));
      setM1Log(`'${token}' has higher precedence than '${topOp}'. Pushing '${token}'.`);
      addXp(10, "Operator Pushed");
    }
  };

  const renderMission1 = () => (
    <div className="flex h-full gap-4">
      <div className="flex-[2] flex flex-col bg-card rounded-lg border border-border p-6 overflow-hidden">
        
        {/* Input Stream */}
        <div className="flex items-center gap-4 mb-8 pb-4 border-b border-border/50">
           <div className="text-muted-foreground font-bold flex items-center gap-2"><Binary className="size-5 text-blue-500" /> INCOMING STREAM</div>
           <div className="flex gap-2 flex-wrap">
             {m1Tokens.map((t, i) => (
               <div key={i} className={`size-10 flex items-center justify-center font-bold text-lg rounded-md
                 ${i === 0 ? 'bg-primary text-primary-foreground shadow-lg ring-2 ring-primary/30 ring-offset-2 ring-offset-background' : 'bg-secondary text-muted-foreground'}
               `}>
                 {t}
               </div>
             ))}
             {m1Tokens.length === 0 && <div className="text-muted-foreground italic mt-2">Stream EOF</div>}
           </div>
        </div>

        <div className="flex-1 flex gap-8">
          {/* Operator Stack Tower */}
          <div className="flex flex-col items-center flex-1">
             <h3 className="font-bold text-purple-500 mb-4 flex items-center gap-2"><Zap className="size-4" /> Operator Processing Stack</h3>
             <div className="w-32 border-x-4 border-b-4 border-purple-500/50 flex-1 bg-secondary/10 flex flex-col justify-end items-center pb-2 relative min-h-[200px]">
               {m1Stack.map((op, i) => (
                 <div key={i} className="w-24 h-12 mb-1 bg-purple-600 border border-purple-400 text-white font-bold text-xl rounded flex items-center justify-center shadow-lg animate-in slide-in-from-top-4">
                   {op}
                 </div>
               ))}
               {m1Stack.length === 0 && <div className="text-muted-foreground italic absolute top-1/2 -translate-y-1/2 text-sm">Stack Empty</div>}
             </div>
          </div>

          {/* Output Conveyor */}
          <div className="flex-[2] flex flex-col items-start">
             <h3 className="font-bold text-green-500 mb-4 flex items-center gap-2"><ArrowRight className="size-4" /> Output Conveyor (Postfix)</h3>
             <div className="w-full min-h-[100px] bg-secondary/30 rounded-xl border border-border p-4 flex flex-wrap gap-2 content-start">
               {m1Output.map((out, i) => (
                 <div key={i} className="size-12 bg-green-500/20 border-2 border-green-500 text-green-400 font-bold text-xl rounded-md flex items-center justify-center animate-in zoom-in shadow-lg">
                   {out}
                 </div>
               ))}
               {m1Output.length === 0 && <div className="text-muted-foreground italic mt-3">Awaiting data...</div>}
             </div>
             
             {/* AI Log */}
             <div className="mt-auto w-full bg-black/40 border border-slate-700 p-4 rounded-lg">
               <div className="text-xs text-slate-500 font-mono mb-1">AI_TRANSLATOR_LOG &gt;</div>
               <div className="text-sm font-mono text-cyan-400">{m1Log}</div>
             </div>
          </div>
        </div>

      </div>
      
      <div className="flex-1 bg-secondary/50 p-6 rounded-xl border border-border flex flex-col">
         <h3 className="font-bold mb-4 flex items-center gap-2 text-xl"><BrainCircuit className="size-6 text-primary" /> Shunting Yard UI</h3>
         <p className="text-sm text-muted-foreground mb-8">Translate normal human communication (Infix) into the machine-readable Postfix language.</p>
         
         <div className="flex flex-col gap-4 mt-auto">
           <button 
            onClick={() => {
              setM1Tokens(['A', '+', 'B', '*', 'C']);
              setM1Stack([]);
              setM1Output([]);
              setM1Log("System Reset.");
            }} 
            className="w-full py-3 bg-secondary text-foreground border border-border font-bold rounded-lg"
           >
             Reset Simulation
           </button>
           <button 
             onClick={m1Step} 
             disabled={m1Tokens.length === 0 && m1Stack.length === 0}
             className="w-full py-4 bg-primary text-primary-foreground font-bold rounded-lg flex items-center justify-center gap-2 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
           >
             <ScanLine className="size-5" /> Step Forward
           </button>
         </div>
      </div>
    </div>
  );

  // ---------------------------------------------------------
  // MISSION 2: IDENTITY VERIFICATION (Palindrome) - ds-e7-2
  // ---------------------------------------------------------
  const [m2InputStr, setM2InputStr] = useState("RACECAR");
  const [m2Input, setM2Input] = useState<string[]>([]);
  const [m2Stack, setM2Stack] = useState<string[]>([]);
  const [m2Output, setM2Output] = useState<string[]>([]);
  const [m2Phase, setM2Phase] = useState<"idle" | "pushing" | "popping" | "valid" | "invalid">("idle");

  const m2Start = () => {
    setM2Input(m2InputStr.split(""));
    setM2Stack([]);
    setM2Output([]);
    setM2Phase("pushing");
  };

  const m2PushStep = () => {
    if (m2Input.length === 0) {
      setM2Phase("popping");
      return;
    }
    const char = m2Input[0];
    setM2Stack([char, ...m2Stack]);
    setM2Input(m2Input.slice(1));
    addXp(10, "Code Segment Stored");
  };

  const m2PopStep = () => {
    if (m2Stack.length === 0) {
      // Comparison time
      const reversed = m2Output.join("");
      if (reversed === m2InputStr) {
        setM2Phase("valid");
        addXp(300, "Identity Verified!");
      } else {
        setM2Phase("invalid");
      }
      return;
    }
    const char = m2Stack[0];
    setM2Output([...m2Output, char]);
    setM2Stack(m2Stack.slice(1));
    addXp(10, "Code Segment Reflected");
  };

  const renderMission2 = () => (
    <div className="flex flex-col h-full gap-4">
      <div className="flex items-center gap-4 bg-secondary/50 p-4 rounded-xl border border-border">
         <Key className="size-6 text-yellow-500" />
         <div className="flex-1 flex gap-2">
           <input type="text" value={m2InputStr} onChange={e => {setM2InputStr(e.target.value.toUpperCase()); setM2Phase("idle"); setM2Stack([]); setM2Output([]);}} className="flex-1 bg-background border border-border rounded px-4 py-2 font-mono font-bold tracking-widest text-lg uppercase" placeholder="Enter password..." disabled={m2Phase !== "idle"} />
           <button onClick={() => {setM2Phase("idle"); setM2Stack([]); setM2Output([]);}} className="px-4 py-2 border border-border rounded font-bold hover:bg-secondary">Reset</button>
           {m2Phase === "idle" && <button onClick={m2Start} className="px-6 py-2 bg-yellow-600 text-white rounded font-bold">Authenticate</button>}
         </div>
      </div>
      
      <div className={`flex-1 flex flex-col items-center justify-center rounded-xl border-2 overflow-hidden relative transition-colors duration-500
        ${m2Phase === "valid" ? 'bg-green-500/10 border-green-500' : m2Phase === "invalid" ? 'bg-red-500/10 border-red-500' : 'bg-card border-border'}
      `}>
         {/* Holographic Mirror Overlay */}
         <div className="absolute inset-0 bg-gradient-to-b from-blue-500/5 to-transparent pointer-events-none" />
         <div className="absolute inset-x-0 top-1/2 h-0.5 bg-cyan-500/30 shadow-[0_0_10px_rgba(6,182,212,0.8)]" />

         {/* Original Input */}
         <div className="absolute top-10 flex flex-col items-center w-full">
            <span className="text-cyan-500 font-bold mb-4 flex items-center gap-2"><Eye className="size-5" /> Original Scan</span>
            <div className="flex gap-2 font-mono text-3xl font-bold tracking-widest">
              {m2InputStr.split("").map((c, i) => (
                <span key={i} className={m2Input.length > 0 && i < m2InputStr.length - m2Input.length ? 'opacity-50' : 'text-foreground'}>{c}</span>
              ))}
            </div>
         </div>

         {/* Stack Tower visually acting as the Mirror Machine */}
         {m2Phase !== "idle" && m2Phase !== "valid" && m2Phase !== "invalid" && (
           <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 flex gap-12 items-center z-10 bg-background/90 p-4 rounded-xl border border-border shadow-2xl backdrop-blur-md">
             <div className="flex flex-col items-center">
                <h4 className="font-bold text-xs text-muted-foreground mb-2">MEMORY STACK</h4>
                <div className="w-16 h-32 border-x-2 border-b-2 border-muted-foreground flex flex-col justify-end items-center pb-1">
                  {m2Stack.map((c, i) => (
                    <div key={i} className="size-10 bg-secondary border border-border rounded flex items-center justify-center font-mono font-bold text-lg mb-0.5">
                      {c}
                    </div>
                  ))}
                </div>
             </div>
             
             <div className="flex flex-col gap-2">
               {m2Phase === "pushing" && <button onClick={m2PushStep} className="px-4 py-2 bg-blue-600 text-white rounded font-bold text-sm flex items-center gap-2"><ArrowDown className="size-4"/> PUSH Char</button>}
               {m2Phase === "popping" && <button onClick={m2PopStep} className="px-4 py-2 bg-yellow-600 text-white rounded font-bold text-sm flex items-center gap-2"><ArrowUp className="size-4"/> POP Char</button>}
             </div>
           </div>
         )}

         {/* Reflected Output */}
         <div className="absolute bottom-10 flex flex-col items-center w-full">
            <div className="flex gap-2 font-mono text-3xl font-bold tracking-widest mb-4">
              {m2Output.map((c, i) => (
                <span key={i} className="text-yellow-500 drop-shadow-md animate-in slide-in-from-top-4">{c}</span>
              ))}
            </div>
            <span className="text-yellow-500 font-bold flex items-center gap-2"><Activity className="size-5" /> Reflected Signal</span>
         </div>
         
         {/* Result Overlay */}
         {m2Phase === "valid" && (
           <div className="absolute inset-0 flex flex-col items-center justify-center bg-green-500/20 backdrop-blur-sm z-20">
             <Unlock className="size-20 text-green-500 mb-4 drop-shadow-lg" />
             <h2 className="text-4xl font-black text-green-500 drop-shadow-lg">ACCESS GRANTED</h2>
             <p className="font-bold text-green-300 mt-2">Palindrome Matched</p>
           </div>
         )}
         {m2Phase === "invalid" && (
           <div className="absolute inset-0 flex flex-col items-center justify-center bg-red-500/20 backdrop-blur-sm z-20">
             <ShieldAlert className="size-20 text-red-500 mb-4 drop-shadow-lg animate-bounce" />
             <h2 className="text-4xl font-black text-red-500 drop-shadow-lg">SECURITY BREACH</h2>
             <p className="font-bold text-red-300 mt-2">Mirror Mismatch Detected</p>
           </div>
         )}
      </div>
    </div>
  );

  // ---------------------------------------------------------
  // MISSION 3: SYMMETRY DETECTION (ds-e7-3)
  // ---------------------------------------------------------
  const [m3Input, setM3Input] = useState("12321");
  const [m3LeftStack, setM3LeftStack] = useState<string[]>([]);
  const [m3RightQueue, setM3RightQueue] = useState<string[]>([]);
  const [m3Status, setM3Status] = useState<"idle" | "evaluating" | "symmetrical" | "asymmetrical">("idle");
  const [m3CompareIndex, setM3CompareIndex] = useState(0);

  const m3LoadBlueprint = () => {
    // Determine midpoint
    const mid = Math.floor(m3Input.length / 2);
    
    const leftHalf = m3Input.slice(0, mid).split("");
    // Reverse left half so we can visually just show it in a stack 
    // Actually, in algorithm: push left half to stack.
    // So [1, 2, 3] -> stack top is 3.
    const stack = leftHalf.reverse(); 
    
    // Right half goes to Queue
    // If odd length, skip the exact middle character
    const startRight = m3Input.length % 2 === 0 ? mid : mid + 1;
    const rightHalf = m3Input.slice(startRight).split("");
    
    setM3LeftStack(stack);
    setM3RightQueue(rightHalf);
    setM3Status("evaluating");
    setM3CompareIndex(0);
  };

  const m3CompareStep = () => {
    if (m3LeftStack.length === 0 || m3RightQueue.length === 0) {
      setM3Status("symmetrical");
      addXp(400, "Symmetry Verified!");
      return;
    }
    
    const stackTop = m3LeftStack[0];
    const queueFront = m3RightQueue[0];
    
    if (stackTop !== queueFront) {
      setM3Status("asymmetrical");
      showError("Asymmetry Detected!");
      return;
    }
    
    // Match! Pop and Dequeue
    setM3LeftStack(m3LeftStack.slice(1));
    setM3RightQueue(m3RightQueue.slice(1));
    setM3CompareIndex(idx => idx + 1);
    addXp(50, "Mirror Elements Matched");
  };

  const renderMission3 = () => (
    <div className="flex flex-col h-full gap-4">
      <div className="flex items-center gap-4 bg-secondary/50 p-4 rounded-xl border border-border">
         <Building className="size-6 text-primary" />
         <div className="flex-1 flex gap-2">
           <input type="text" value={m3Input} onChange={e => {setM3Input(e.target.value); setM3Status("idle");}} className="flex-1 bg-background border border-border rounded px-4 py-2 font-mono font-bold tracking-widest text-lg" placeholder="Enter blueprint code..." disabled={m3Status !== "idle"} />
           <button onClick={() => setM3Status("idle")} className="px-4 py-2 border border-border rounded font-bold hover:bg-secondary">Reset Blueprint</button>
           {m3Status === "idle" && <button onClick={m3LoadBlueprint} className="px-6 py-2 bg-primary text-primary-foreground rounded font-bold">Load to Laboratory</button>}
         </div>
      </div>
      
      <div className="flex-1 flex gap-4">
         {/* Left Side: STACK */}
         <div className="flex-1 bg-card rounded-xl border border-border p-6 flex flex-col items-center">
            <h3 className="font-bold text-blue-500 mb-2">LEFT HALF (STACK)</h3>
            <p className="text-xs text-muted-foreground mb-6 text-center">Last-In, First-Out<br/>Reverses the order</p>
            
            <div className="w-32 border-x-4 border-b-4 border-blue-500/30 flex-1 bg-blue-500/5 flex flex-col justify-end items-center pb-2 relative">
              {m3LeftStack.map((val, i) => (
                <div key={i} className={`size-16 mb-1 rounded flex items-center justify-center font-bold text-3xl font-mono
                  ${i === 0 && m3Status === "evaluating" ? 'bg-blue-500 text-white shadow-[0_0_15px_rgba(59,130,246,0.8)]' : 'bg-secondary border border-blue-500/30 text-muted-foreground'}
                `}>
                  {val}
                </div>
              ))}
            </div>
         </div>
         
         {/* Center: COMPARATOR */}
         <div className="flex flex-col items-center justify-center px-4 min-w-[200px]">
            {m3Status === "evaluating" && (
              <div className="flex flex-col items-center">
                <div className="text-sm font-bold text-muted-foreground mb-4">AI COMPARATOR</div>
                <div className="flex items-center gap-4 text-3xl font-mono font-bold">
                  <span className="text-blue-500">{m3LeftStack[0]}</span>
                  <span className="text-muted-foreground">===</span>
                  <span className="text-green-500">{m3RightQueue[0]}</span>
                </div>
                <button onClick={m3CompareStep} className="mt-8 px-6 py-3 bg-primary text-primary-foreground font-bold rounded-lg flex items-center gap-2">
                  <Eye className="size-5" /> Inspect Match
                </button>
              </div>
            )}
            
            {m3Status === "symmetrical" && (
              <div className="flex flex-col items-center text-green-500 animate-in zoom-in">
                <CheckCircle2 className="size-16 mb-2" />
                <h3 className="font-bold text-xl text-center">PERFECT<br/>SYMMETRY</h3>
              </div>
            )}
            
            {m3Status === "asymmetrical" && (
              <div className="flex flex-col items-center text-red-500 animate-in zoom-in">
                <ShieldAlert className="size-16 mb-2" />
                <h3 className="font-bold text-xl text-center">STRUCTURAL<br/>ASYMMETRY</h3>
              </div>
            )}
         </div>

         {/* Right Side: QUEUE */}
         <div className="flex-1 bg-card rounded-xl border border-border p-6 flex flex-col items-center">
            <h3 className="font-bold text-green-500 mb-2">RIGHT HALF (QUEUE)</h3>
            <p className="text-xs text-muted-foreground mb-6 text-center">First-In, First-Out<br/>Maintains the order</p>
            
            <div className="w-32 border-x-4 border-b-4 border-t-4 border-green-500/30 flex-1 bg-green-500/5 flex flex-col justify-start items-center pt-2 relative">
              {m3RightQueue.map((val, i) => (
                <div key={i} className={`size-16 mb-1 rounded flex items-center justify-center font-bold text-3xl font-mono
                  ${i === 0 && m3Status === "evaluating" ? 'bg-green-500 text-white shadow-[0_0_15px_rgba(34,197,94,0.8)]' : 'bg-secondary border border-green-500/30 text-muted-foreground'}
                `}>
                  {val}
                </div>
              ))}
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
            <BrainCircuit className="size-6 text-primary" /> Intelligence Center
          </h2>
        </div>
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2 bg-secondary/50 px-4 py-1.5 rounded-full border border-border font-bold shadow-sm">
            <Star className="size-4 text-yellow-500" /> {xp} XP
          </div>
          <div className="text-sm font-bold text-muted-foreground uppercase">
             {expId === "ds-e7-1" && "Mission 1: Cipher Translator"}
             {expId === "ds-e7-2" && "Mission 2: Identity Verification"}
             {expId === "ds-e7-3" && "Mission 3: Symmetry Lab"}
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
        {expId === "ds-e7-1" && renderMission1()}
        {expId === "ds-e7-2" && renderMission2()}
        {expId === "ds-e7-3" && renderMission3()}
      </div>
    </div>
  );
}
