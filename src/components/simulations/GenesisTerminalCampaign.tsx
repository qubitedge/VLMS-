import { useState, useEffect } from "react";
import { 
  Terminal, ArrowRight, Zap, Radio, Satellite, ShieldAlert, Cpu, 
  MessageSquare, User, Keyboard, Monitor, Code, Star
} from "lucide-react";

type GenesisProps = {
  expId: string; // c-w1-1 or c-w1-2
};

export function GenesisTerminalCampaign({ expId }: GenesisProps) {
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
  // MISSION 1: FIRST SIGNAL (Hello World) - c-w1-1
  // ---------------------------------------------------------
  const [m1Code, setM1Code] = useState("");
  const [m1Power, setM1Power] = useState(false);
  const [m1Hologram, setM1Hologram] = useState("");

  const runM1 = async () => {
    if (m1Code.trim() === 'printf("Hello World");' || m1Code.trim() === "printf(\"Hello World\");") {
      setM1Power(true);
      await new Promise(r => setTimeout(r, 1000));
      setM1Hologram("HELLO WORLD");
      addXp(100, "Communication Crystal Fragment Recovered!");
    } else {
      setErrorMsg("Invalid Signal Code. Try: printf(\"Hello World\");");
      setTimeout(() => setErrorMsg(""), 3000);
    }
  };

  const renderMission1 = () => (
    <div className="flex flex-col h-full gap-4">
       <div className="flex-1 flex gap-4">
          {/* Editor Area */}
          <div className="flex-[1] bg-card rounded-xl border border-border flex flex-col overflow-hidden">
             <div className="bg-secondary p-3 border-b border-border flex items-center gap-2 font-bold">
               <Code className="size-5 text-blue-500" /> Signal Compiler
             </div>
             <div className="p-4 flex-1 flex flex-col">
               <p className="text-muted-foreground mb-4">Build the first transmission to activate the communication beacon.</p>
               <div className="bg-black text-green-500 font-mono p-4 rounded-lg flex-1 border border-border relative">
                  <div className="absolute top-2 right-2 text-xs opacity-50">main.c</div>
                  <div>#include &lt;stdio.h&gt;</div>
                  <div>int main() {"{"}</div>
                  <div className="flex items-center gap-2 ml-4 mt-2">
                     <span className="opacity-50">&gt;</span>
                     <input 
                       type="text" 
                       value={m1Code}
                       onChange={e => setM1Code(e.target.value)}
                       placeholder='printf("Hello World");'
                       className="bg-transparent border-none outline-none text-green-400 w-full placeholder:text-green-900"
                     />
                  </div>
                  <div className="mt-2">{"}"}</div>
               </div>
               <button onClick={runM1} className="mt-4 w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg flex items-center justify-center gap-2 shadow-lg transition-all active:scale-95">
                 <Zap className="size-5" /> Execute Signal
               </button>
             </div>
          </div>
          
          {/* Visual Area */}
          <div className="flex-[1.5] bg-slate-950 rounded-xl border border-border p-6 relative overflow-hidden flex flex-col items-center justify-end pb-12">
             <div className="absolute top-4 left-4 flex items-center gap-2 bg-black/50 px-3 py-1 rounded border border-border">
               <div className={`size-3 rounded-full ${m1Power ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`} />
               <span className="font-mono text-sm font-bold text-white uppercase tracking-widest">
                 {m1Power ? 'Tower Online' : 'Signal Offline'}
               </span>
             </div>

             {/* Hologram */}
             {m1Hologram && (
               <div className="absolute top-1/4 left-1/2 -translate-x-1/2 text-center animate-in zoom-in duration-1000">
                 <h1 className="text-6xl font-black text-cyan-400 tracking-[0.2em] drop-shadow-[0_0_30px_rgba(34,211,238,0.8)]">
                   {m1Hologram}
                 </h1>
               </div>
             )}

             {/* Tower */}
             <div className="relative flex flex-col items-center">
                <Satellite className={`size-32 transition-all duration-1000 ${m1Power ? 'text-cyan-500 drop-shadow-[0_0_20px_rgba(34,211,238,0.5)]' : 'text-slate-800'}`} />
                <div className="w-16 h-32 bg-gradient-to-b from-slate-800 to-slate-900 rounded-t-lg border-t-4 border-slate-700 relative flex justify-center">
                   {m1Power && (
                     <div className="absolute inset-0 flex flex-col justify-evenly items-center">
                        <div className="w-full h-1 bg-cyan-500/50 animate-pulse" />
                        <div className="w-full h-1 bg-cyan-500/50 animate-pulse delay-75" />
                        <div className="w-full h-1 bg-cyan-500/50 animate-pulse delay-150" />
                     </div>
                   )}
                </div>
             </div>
          </div>
       </div>

       <div className="bg-card p-4 rounded-xl border border-border flex items-center justify-between">
          <div className="flex items-center gap-4">
             <div className="flex items-center gap-2 font-mono text-sm">
                <span className="text-blue-500 font-bold">Flow:</span>
                <span>Program Start</span> <ArrowRight className="size-3" />
                <span className="text-green-500">printf()</span> <ArrowRight className="size-3" />
                <span>Output Screen</span> <ArrowRight className="size-3" />
                <span>End</span>
             </div>
          </div>
       </div>
    </div>
  );

  // ---------------------------------------------------------
  // MISSION 2: DIGITAL TRANSLATOR (Input / Output) - c-w1-2
  // ---------------------------------------------------------
  const [m2Name, setM2Name] = useState("");
  const [m2Step, setM2Step] = useState(0); // 0: Idle, 1: scanf, 2: processing, 3: printf
  const [m2Output, setM2Output] = useState("");

  const runM2 = async () => {
    if (!m2Name.trim()) {
      showError("Please enter a name");
      return;
    }
    setM2Step(1); // Scanf active
    await new Promise(r => setTimeout(r, 1000));
    setM2Step(2); // Variable storage
    await new Promise(r => setTimeout(r, 1000));
    setM2Step(3); // Printf active
    setM2Output(`Welcome ${m2Name}`);
    addXp(150, "Communication Crystal Recovered!");
  };

  const renderMission2 = () => (
    <div className="flex flex-col h-full gap-4">
       <div className="flex-1 flex gap-4">
          <div className="flex-[1] bg-card rounded-xl border border-border p-6 flex flex-col items-center justify-center relative">
             <h3 className="font-bold text-xl mb-8 flex items-center gap-2"><Cpu className="size-6 text-purple-500" /> AI Translator Robot</h3>
             
             <div className={`relative transition-all duration-500 ${m2Step === 2 ? 'scale-110' : ''}`}>
               <div className="size-32 bg-slate-900 rounded-3xl border-4 border-slate-700 shadow-2xl flex items-center justify-center relative z-10">
                  <div className="flex gap-4">
                     <div className={`w-6 h-8 rounded-full transition-colors ${m2Step === 2 ? 'bg-purple-500 animate-pulse' : 'bg-cyan-500'}`} />
                     <div className={`w-6 h-8 rounded-full transition-colors ${m2Step === 2 ? 'bg-purple-500 animate-pulse' : 'bg-cyan-500'}`} />
                  </div>
               </div>
               {/* Data Pipes */}
               <div className="absolute -left-16 top-1/2 -translate-y-1/2 w-16 h-4 bg-slate-800 rounded-l" />
               <div className="absolute -right-16 top-1/2 -translate-y-1/2 w-16 h-4 bg-slate-800 rounded-r" />
             </div>

             <div className="mt-8 text-center bg-secondary p-4 rounded-lg border border-border w-full">
               <div className="text-muted-foreground font-bold mb-2 uppercase text-sm tracking-widest">Internal Memory (Variable)</div>
               <div className="font-mono text-xl text-purple-400 min-h-[30px]">
                 {m2Step >= 2 ? m2Name : "_"}
               </div>
             </div>
          </div>

          <div className="flex-[1] flex flex-col gap-4">
             {/* Input Section */}
             <div className={`flex-1 rounded-xl border-2 p-6 flex flex-col justify-center transition-all duration-300
               ${m2Step === 1 ? 'border-green-500 bg-green-500/10 shadow-[0_0_20px_rgba(34,197,94,0.2)]' : 'border-border bg-card'}
             `}>
               <h4 className="font-bold flex items-center gap-2 mb-4 text-green-500"><Keyboard className="size-5" /> INPUT: scanf()</h4>
               <p className="text-muted-foreground text-sm mb-4">Robot asks: What is your name?</p>
               <input 
                 type="text" 
                 value={m2Name}
                 onChange={e => {setM2Name(e.target.value); setM2Step(0); setM2Output("");}}
                 placeholder="Enter your name"
                 className="bg-background border border-border rounded-lg px-4 py-3 font-bold text-lg mb-4"
               />
               <button onClick={runM2} className="py-3 bg-green-600 hover:bg-green-700 text-white font-bold rounded-lg flex justify-center items-center gap-2">
                 Send Input <ArrowRight className="size-4" />
               </button>
             </div>

             {/* Output Section */}
             <div className={`flex-1 rounded-xl border-2 p-6 flex flex-col justify-center transition-all duration-300
               ${m2Step === 3 ? 'border-cyan-500 bg-cyan-500/10 shadow-[0_0_20px_rgba(34,211,238,0.2)]' : 'border-border bg-card'}
             `}>
               <h4 className="font-bold flex items-center gap-2 mb-4 text-cyan-500"><Monitor className="size-5" /> OUTPUT: printf()</h4>
               <div className="bg-black rounded-lg p-6 flex items-center justify-center min-h-[100px] border border-slate-800">
                  <span className="font-mono text-2xl text-cyan-400 font-bold">
                    {m2Output || "Waiting..."}
                  </span>
               </div>
             </div>
          </div>
       </div>

       {/* Predict Challenge */}
       <div className="bg-card p-4 rounded-xl border border-border flex flex-col gap-2">
         <h4 className="font-bold text-sm text-yellow-500 uppercase tracking-widest mb-2 flex items-center gap-2"><Star className="size-4" /> Mini Challenge</h4>
         <div className="flex items-center gap-8">
            <div className="font-mono bg-secondary px-4 py-2 rounded text-sm">
              <div>scanf("%d", &x);</div>
              <div>printf("%d", x);</div>
            </div>
            <div className="text-muted-foreground text-sm">
              If input is <strong className="text-white">25</strong>, what is output?
            </div>
            <div className="flex gap-2">
               <button onClick={()=>addXp(50, "Correct!")} className="px-4 py-2 bg-secondary hover:bg-secondary/80 rounded font-bold">25</button>
               <button onClick={()=>showError("Incorrect!")} className="px-4 py-2 bg-secondary hover:bg-secondary/80 rounded font-bold">x</button>
               <button onClick={()=>showError("Incorrect!")} className="px-4 py-2 bg-secondary hover:bg-secondary/80 rounded font-bold">%d</button>
            </div>
         </div>
       </div>
    </div>
  );

  return (
    <div className="flex flex-col h-full bg-slate-950 text-slate-200 p-6 overflow-hidden relative font-sans">
      {/* Top Panel - CodeVerse Theme */}
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-800 shrink-0">
        <div>
          <h2 className="text-2xl font-black text-indigo-400 flex items-center gap-3 uppercase tracking-widest drop-shadow-[0_0_10px_rgba(129,140,248,0.5)]">
            <Terminal className="size-7 text-indigo-400" /> Genesis Terminal
          </h2>
        </div>
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2 bg-indigo-950/50 px-4 py-1.5 rounded-full border border-indigo-900 font-bold shadow-sm">
            <Star className="size-4 text-cyan-400" /> {xp} XP
          </div>
          <div className="text-sm font-bold text-indigo-300 uppercase tracking-widest">
             {expId === "c-w1-1" && "Mission: Activate Beacon"}
             {expId === "c-w1-2" && "Mission: Establish Two-Way Comms"}
          </div>
        </div>
      </div>

      {errorMsg && (
        <div className="absolute top-24 left-1/2 -translate-x-1/2 bg-red-600 text-white px-6 py-3 rounded-lg shadow-xl animate-in slide-in-from-top-10 z-50 font-medium">
          {errorMsg}
        </div>
      )}
      {successMsg && (
        <div className="absolute top-24 left-1/2 -translate-x-1/2 bg-indigo-600 text-white px-6 py-3 rounded-lg shadow-xl animate-in slide-in-from-top-10 z-50 font-bold flex items-center gap-2">
          <Star className="size-5" /> {successMsg}
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex-1 min-h-0 overflow-y-auto">
        {expId === "c-w1-1" && renderMission1()}
        {expId === "c-w1-2" && renderMission2()}
      </div>
    </div>
  );
}
