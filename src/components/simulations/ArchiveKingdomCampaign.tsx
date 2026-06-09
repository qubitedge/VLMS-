import { useState, useEffect } from "react";
import { 
  FolderOpen, FileText, ScrollText, Search, Binary, Database,
  TerminalSquare, AlertTriangle, ShieldCheck, DoorOpen, Save,
  CheckCircle2, Star, Zap, PenTool, Hash, Download
} from "lucide-react";

type ArchiveKingdomProps = {
  expId: string; // c-w14-1 to c-w14-4
};

export function ArchiveKingdomCampaign({ expId }: ArchiveKingdomProps) {
  const [xp, setXp] = useState(0);
  const [successMsg, setSuccessMsg] = useState("");

  const addXp = (amount: number, reason: string) => {
    setXp(x => x + amount);
    setSuccessMsg(`+${amount} XP: ${reason}`);
    setTimeout(() => setSuccessMsg(""), 3000);
  };

  // ---------------------------------------------------------
  // MISSION 1: The Lost Chronicles (Write/Read File) - c-w14-1
  // ---------------------------------------------------------
  const [m1Text, setM1Text] = useState("Welcome to CodeVerse");
  const [m1Step, setM1Step] = useState(0);
  const [m1Writing, setM1Writing] = useState("");
  const [m1Read, setM1Read] = useState("");

  const runM1Write = async () => {
    setM1Step(1); // Writing
    let written = "";
    for (let i = 0; i < m1Text.length; i++) {
      written += m1Text[i];
      setM1Writing(written);
      await new Promise(r => setTimeout(r, 100));
    }
    setM1Step(2); // Written to file
    addXp(100, "Archive Scribe!");
  };

  const runM1Read = async () => {
    setM1Step(3); // Reading
    await new Promise(r => setTimeout(r, 1500));
    setM1Read(m1Text);
    setM1Step(4); // Retrieved
    addXp(100, "Scroll Retriever!");
    setTimeout(() => {setM1Step(0); setM1Writing(""); setM1Read("");}, 5000);
  };

  const renderMission1 = () => (
    <div className="flex flex-col h-full gap-4">
       <div className="flex-1 bg-slate-900 rounded-xl border border-amber-500/30 p-6 flex flex-col justify-center items-center relative overflow-hidden">
          <h3 className="absolute top-6 left-6 font-bold text-xl flex items-center gap-2 z-10 text-amber-500 uppercase tracking-widest"><ScrollText className="size-6" /> Lost Chronicles</h3>
          
          <div className="flex justify-around items-start w-full max-w-5xl z-10 h-[400px]">
             
             {/* Program Memory */}
             <div className="flex flex-col items-center w-1/3">
                <div className="font-bold text-muted-foreground uppercase tracking-widest mb-4">Program Memory</div>
                <textarea 
                  value={m1Text} 
                  onChange={(e) => setM1Text(e.target.value)}
                  disabled={m1Step !== 0}
                  className="w-full h-32 bg-slate-950 border-2 border-slate-700 rounded-xl p-4 font-mono text-slate-300 resize-none outline-none focus:border-amber-500 transition-colors"
                />
                
                {m1Step === 0 && (
                  <button onClick={runM1Write} className="mt-4 px-6 py-2 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-lg shadow-[0_0_15px_rgba(217,119,6,0.4)] flex items-center gap-2">
                    <PenTool className="size-4" /> fprintf(file)
                  </button>
                )}

                {m1Step === 4 && (
                  <div className="mt-8 w-full bg-emerald-950/40 border-2 border-emerald-500/50 rounded-xl p-4 animate-in zoom-in">
                     <div className="text-xs font-bold text-emerald-500 uppercase mb-2 flex items-center gap-1"><Download className="size-3" /> Data Retrieved</div>
                     <div className="font-mono text-emerald-300">{m1Read}</div>
                  </div>
                )}
             </div>

             {/* The Transfer */}
             <div className="flex flex-col items-center justify-center h-32 relative w-1/3">
                {m1Step === 1 && (
                  <div className="flex flex-col items-center animate-in fade-in zoom-in duration-300">
                    <ArrowRight className="size-8 text-amber-500 animate-pulse mb-2" />
                    <span className="font-mono text-amber-400 font-bold bg-amber-950/40 px-2 rounded">Writing...</span>
                  </div>
                )}
                {m1Step === 3 && (
                  <div className="flex flex-col items-center animate-in fade-in zoom-in duration-300">
                    <ArrowLeft className="size-8 text-cyan-500 animate-pulse mb-2" />
                    <span className="font-mono text-cyan-400 font-bold bg-cyan-950/40 px-2 rounded">Reading...</span>
                  </div>
                )}
             </div>

             {/* Persistent Storage (File) */}
             <div className="flex flex-col items-center w-1/3">
                <div className="font-bold text-muted-foreground uppercase tracking-widest mb-4 flex items-center gap-2"><Save className="size-5 text-amber-400" /> Disk Storage</div>
                <div className={`w-full h-64 border-4 rounded-xl flex flex-col p-4 relative transition-all duration-500
                   ${m1Step >= 2 ? 'border-amber-500/50 bg-amber-950/20 shadow-[0_0_30px_rgba(217,119,6,0.2)]' : 'border-dashed border-slate-700 bg-slate-950'}
                `}>
                   <div className="absolute -top-3 left-4 bg-slate-900 px-2 text-xs font-bold text-amber-400 font-mono">chronicles.txt</div>
                   
                   {m1Step === 0 && <div className="m-auto text-slate-600 font-bold uppercase tracking-widest">EMPTY</div>}
                   
                   {m1Step >= 1 && (
                     <div className="font-mono text-amber-200 whitespace-pre-wrap">{m1Writing}</div>
                   )}
                   
                   {m1Step === 2 && (
                     <div className="absolute inset-0 bg-amber-900/10 backdrop-blur-sm flex items-center justify-center animate-in fade-in">
                       <button onClick={runM1Read} className="px-6 py-3 bg-cyan-600 hover:bg-cyan-700 text-white font-bold rounded-xl shadow-[0_0_20px_rgba(8,145,178,0.4)] flex items-center gap-2">
                         <Search className="size-4" /> fscanf(file)
                       </button>
                     </div>
                   )}
                </div>
             </div>
          </div>
       </div>
    </div>
  );

  // ---------------------------------------------------------
  // MISSION 2: Royal Record Investigation - c-w14-2
  // ---------------------------------------------------------
  const [m2Step, setM2Step] = useState(0); // 0: Start, 1: Char, 2: Word, 3: Line
  const m2Doc = "Welcome to CodeVerse\n\nProgramming is Magic";

  const runM2 = async () => {
    setM2Step(1); // Characters
    await new Promise(r => setTimeout(r, 2000));
    setM2Step(2); // Words
    await new Promise(r => setTimeout(r, 2000));
    setM2Step(3); // Lines
    addXp(150, "Royal Investigator!");
    setTimeout(() => setM2Step(0), 6000);
  };

  const renderMission2 = () => (
    <div className="flex flex-col h-full gap-4">
       <div className="flex-1 bg-slate-950 rounded-xl border border-indigo-500/30 p-6 flex flex-col justify-center items-center relative overflow-hidden">
          <h3 className="absolute top-6 left-6 font-bold text-xl flex items-center gap-2 z-10 text-indigo-400 uppercase tracking-widest"><Search className="size-6" /> Record Investigation</h3>
          
          <div className="flex gap-12 w-full max-w-4xl z-10 h-[300px]">
             
             {/* The Document */}
             <div className="flex-1 bg-card rounded-xl border-2 border-indigo-500/30 p-8 shadow-lg relative">
                <div className="absolute top-0 right-8 bg-indigo-500/20 text-indigo-400 font-bold px-4 py-1 rounded-b-lg font-mono text-xs">king_decree.txt</div>
                
                <div className="font-mono text-xl text-slate-300 whitespace-pre-wrap leading-relaxed mt-4 relative">
                   {m2Doc.split('').map((char, i) => (
                     <span key={i} className={`transition-all duration-500
                        ${m2Step === 1 ? 'text-cyan-400 bg-cyan-900/40 rounded px-px' : ''}
                     `}>{char}</span>
                   ))}
                   
                   {/* Word Highlights */}
                   {m2Step === 2 && (
                     <div className="absolute inset-0 pointer-events-none">
                       <div className="absolute top-0 left-0 w-[120px] h-8 border-b-4 border-fuchsia-500 animate-in fade-in" />
                       <div className="absolute top-0 left-[130px] w-[30px] h-8 border-b-4 border-fuchsia-500 animate-in fade-in delay-100" />
                       <div className="absolute top-0 left-[170px] w-[140px] h-8 border-b-4 border-fuchsia-500 animate-in fade-in delay-200" />
                       <div className="absolute top-[60px] left-0 w-[170px] h-8 border-b-4 border-fuchsia-500 animate-in fade-in delay-300" />
                       <div className="absolute top-[60px] left-[180px] w-[30px] h-8 border-b-4 border-fuchsia-500 animate-in fade-in delay-500" />
                       <div className="absolute top-[60px] left-[220px] w-[80px] h-8 border-b-4 border-fuchsia-500 animate-in fade-in delay-700" />
                     </div>
                   )}

                   {/* Line Highlights */}
                   {m2Step === 3 && (
                     <div className="absolute inset-0 pointer-events-none -left-4">
                       <div className="absolute top-2 w-2 h-6 bg-emerald-500 rounded animate-in slide-in-from-left" />
                       <div className="absolute top-[62px] w-2 h-6 bg-emerald-500 rounded animate-in slide-in-from-left delay-300" />
                     </div>
                   )}
                </div>
             </div>

             {/* Investigation Dashboard */}
             <div className="w-64 flex flex-col justify-center gap-4">
                <div className={`p-4 rounded-xl border-2 transition-all duration-500 ${m2Step >= 1 ? 'border-cyan-500 bg-cyan-950/40 shadow-[0_0_20px_rgba(6,182,212,0.3)]' : 'border-slate-800 bg-slate-900 opacity-50'}`}>
                   <div className="text-xs font-bold text-cyan-500 uppercase tracking-widest mb-1 flex items-center gap-2"><Hash className="size-3" /> Characters</div>
                   <div className="text-4xl font-black text-cyan-400">{m2Step >= 1 ? m2Doc.length : 0}</div>
                </div>

                <div className={`p-4 rounded-xl border-2 transition-all duration-500 ${m2Step >= 2 ? 'border-fuchsia-500 bg-fuchsia-950/40 shadow-[0_0_20px_rgba(217,70,239,0.3)]' : 'border-slate-800 bg-slate-900 opacity-50'}`}>
                   <div className="text-xs font-bold text-fuchsia-500 uppercase tracking-widest mb-1 flex items-center gap-2"><ScrollText className="size-3" /> Words</div>
                   <div className="text-4xl font-black text-fuchsia-400">{m2Step >= 2 ? 6 : 0}</div>
                </div>

                <div className={`p-4 rounded-xl border-2 transition-all duration-500 ${m2Step === 3 ? 'border-emerald-500 bg-emerald-950/40 shadow-[0_0_20px_rgba(16,185,129,0.3)]' : 'border-slate-800 bg-slate-900 opacity-50'}`}>
                   <div className="text-xs font-bold text-emerald-500 uppercase tracking-widest mb-1 flex items-center gap-2"><FileText className="size-3" /> Lines</div>
                   <div className="text-4xl font-black text-emerald-400">{m2Step === 3 ? 2 : 0}</div>
                </div>
             </div>
          </div>

          {m2Step === 0 && (
            <button onClick={runM2} className="mt-8 px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-[0_0_30px_rgba(79,70,229,0.4)] z-10 flex items-center gap-2">
              <Search className="size-5" /> Analyze Document
            </button>
          )}
       </div>
    </div>
  );

  // ---------------------------------------------------------
  // MISSION 3: Archive Explorer (Binary vs Text & CLI) - c-w14-3
  // ---------------------------------------------------------
  const [m3Mode, setM3Mode] = useState<"text" | "binary" | "cli" | "corrupt" | null>(null);

  const renderMission3 = () => (
    <div className="flex flex-col h-full gap-4">
       <div className="flex-1 bg-slate-900 rounded-xl border border-emerald-500/30 p-6 flex flex-col items-center relative overflow-hidden">
          <h3 className="absolute top-6 left-6 font-bold text-xl flex items-center gap-2 z-10 text-emerald-400 uppercase tracking-widest"><FolderOpen className="size-6" /> Archive Explorer</h3>
          
          <div className="flex gap-4 mt-12 mb-8 z-10 flex-wrap justify-center">
             <button onClick={()=>setM3Mode("text")} className={`px-6 py-2 font-bold rounded-lg ${m3Mode==='text'?'bg-emerald-600 text-white':'bg-slate-800 text-slate-400'}`}>Text Files</button>
             <button onClick={()=>setM3Mode("binary")} className={`px-6 py-2 font-bold rounded-lg ${m3Mode==='binary'?'bg-cyan-600 text-white':'bg-slate-800 text-slate-400'}`}>Binary Vault</button>
             <button onClick={()=>setM3Mode("cli")} className={`px-6 py-2 font-bold rounded-lg ${m3Mode==='cli'?'bg-fuchsia-600 text-white':'bg-slate-800 text-slate-400'}`}>Command Messenger</button>
             <button onClick={()=>setM3Mode("corrupt")} className={`px-6 py-2 font-bold rounded-lg ${m3Mode==='corrupt'?'bg-red-600 text-white':'bg-slate-800 text-slate-400'}`}>Corruption Chamber</button>
          </div>

          <div className="flex-1 w-full max-w-3xl z-10 flex items-center justify-center">
             {!m3Mode && <div className="text-slate-500 font-bold uppercase tracking-widest text-lg">Select a vault to explore</div>}

             {m3Mode === "text" && (
                <div className="bg-card p-8 rounded-xl border-2 border-emerald-500/50 w-full animate-in zoom-in shadow-[0_0_30px_rgba(16,185,129,0.2)]">
                   <div className="flex items-center gap-4 mb-6 pb-4 border-b border-slate-700">
                     <FileText className="size-10 text-emerald-400" />
                     <div>
                        <h4 className="font-bold text-xl text-white">notes.txt</h4>
                        <p className="text-sm text-emerald-500 font-bold uppercase">Human Readable</p>
                     </div>
                   </div>
                   <div className="font-mono text-slate-300 bg-slate-950 p-4 rounded-lg">
                      Data is stored exactly as characters.<br/>
                      Any text editor can open and read this file easily.<br/>
                      Perfect for logs, configs, and simple data.
                   </div>
                </div>
             )}

             {m3Mode === "binary" && (
                <div className="bg-card p-8 rounded-xl border-2 border-cyan-500/50 w-full animate-in zoom-in shadow-[0_0_30px_rgba(6,182,212,0.2)]">
                   <div className="flex items-center gap-4 mb-6 pb-4 border-b border-slate-700">
                     <Binary className="size-10 text-cyan-400" />
                     <div>
                        <h4 className="font-bold text-xl text-white">data.bin</h4>
                        <p className="text-sm text-cyan-500 font-bold uppercase">Machine Readable Only</p>
                     </div>
                   </div>
                   <div className="font-mono text-cyan-300/50 bg-slate-950 p-4 rounded-lg break-words text-sm h-24 overflow-hidden relative">
                      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-slate-950 pointer-events-none" />
                      10101100 00110101 11110000 00001111 01010101<br/>
                      11001100 01010101 00000000 11111111 10101010
                   </div>
                   <p className="mt-4 text-slate-400 text-sm font-bold">Stores raw memory bytes. Extremely fast and efficient, but looks like gibberish to humans. Uses <span className="text-cyan-400 font-mono">fread()</span> and <span className="text-cyan-400 font-mono">fwrite()</span>.</p>
                </div>
             )}

             {m3Mode === "cli" && (
                <div className="bg-card p-8 rounded-xl border-2 border-fuchsia-500/50 w-full animate-in zoom-in shadow-[0_0_30px_rgba(217,70,239,0.2)]">
                   <div className="flex items-center gap-4 mb-6 pb-4 border-b border-slate-700">
                     <TerminalSquare className="size-10 text-fuchsia-400" />
                     <div>
                        <h4 className="font-bold text-xl text-white">Command-Line Arguments</h4>
                        <p className="text-sm text-fuchsia-500 font-bold uppercase">External Messengers</p>
                     </div>
                   </div>
                   <div className="bg-slate-950 border border-slate-800 p-4 rounded-lg font-mono text-sm mb-4">
                      <span className="text-slate-500">$</span> <span className="text-white">./program.exe</span> <span className="text-fuchsia-400">input.txt</span> <span className="text-cyan-400">output.txt</span>
                   </div>
                   <div className="grid grid-cols-3 gap-4">
                      <div className="bg-slate-900 border border-slate-700 p-3 rounded font-mono text-center">
                        <div className="text-xs text-slate-500 mb-1">argv[0]</div>
                        <div className="text-white">./program</div>
                      </div>
                      <div className="bg-fuchsia-950/40 border border-fuchsia-500/50 p-3 rounded font-mono text-center text-fuchsia-300">
                        <div className="text-xs text-fuchsia-500/50 mb-1">argv[1]</div>
                        input.txt
                      </div>
                      <div className="bg-cyan-950/40 border border-cyan-500/50 p-3 rounded font-mono text-center text-cyan-300">
                        <div className="text-xs text-cyan-500/50 mb-1">argv[2]</div>
                        output.txt
                      </div>
                   </div>
                   <div className="mt-4 text-center text-sm font-bold text-slate-400">Total arguments (<span className="text-fuchsia-400">argc</span>) = 3</div>
                </div>
             )}

             {m3Mode === "corrupt" && (
                <div className="bg-red-950/40 p-8 rounded-xl border-2 border-red-500/50 w-full animate-in zoom-in shadow-[0_0_30px_rgba(239,68,68,0.2)] text-center">
                   <AlertTriangle className="size-16 text-red-500 mx-auto mb-4 animate-pulse" />
                   <h4 className="font-black text-2xl text-red-400 uppercase tracking-widest mb-2">Memory Leak Detected</h4>
                   <div className="font-mono text-red-300 bg-red-950/80 p-4 rounded-lg mb-4 text-lg">
                      FILE NOT CLOSED
                   </div>
                   <p className="text-red-200/70 text-sm font-bold">
                     Always use <span className="text-white font-mono bg-red-900 px-1 rounded">fclose(file)</span> when you finish!<br/>
                     Failing to do so leaves the Archive Door open, causing file corruption and memory leaks.
                   </p>
                </div>
             )}
          </div>
       </div>
    </div>
  );

  // ---------------------------------------------------------
  // FINAL BOSS: Restore the Grand Archive & Core - c-w14-4
  // ---------------------------------------------------------
  const [bossStep, setBossStep] = useState(0);

  const runFinale = async () => {
    setBossStep(1); // Crystals aligning
    await new Promise(r => setTimeout(r, 4000));
    setBossStep(2); // Core restored
  };

  const crystals = [
    { name: "Logic", color: "text-blue-400", delay: "delay-0" },
    { name: "Iteration", color: "text-cyan-400", delay: "delay-[200ms]" },
    { name: "Storage", color: "text-emerald-400", delay: "delay-[400ms]" },
    { name: "Architecture", color: "text-amber-400", delay: "delay-[600ms]" },
    { name: "Recursion", color: "text-rose-400", delay: "delay-[800ms]" },
    { name: "Address", color: "text-yellow-400", delay: "delay-[1000ms]" },
    { name: "Archive", color: "text-indigo-400", delay: "delay-[1200ms]" },
  ];

  const renderFinale = () => (
    <div className="flex flex-col h-full gap-4">
       <div className="flex-1 bg-slate-950 rounded-xl border-2 border-slate-800 p-6 flex flex-col justify-center items-center relative overflow-hidden">
          
          {/* Background grid */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_70%,transparent_100%)] opacity-20" />
          
          {bossStep === 0 && (
             <div className="z-10 text-center animate-in zoom-in">
                <Database className="size-24 text-slate-600 mx-auto mb-8" />
                <h1 className="text-4xl font-black text-white uppercase tracking-widest mb-4">The Digital Core</h1>
                <p className="text-slate-400 max-w-xl text-lg mb-12">
                  The Archive Kingdom is secure. Now, all learned magic must be channeled back into the CodeVerse Core to stabilize the universe permanently.
                </p>
                <button onClick={runFinale} className="px-12 py-5 bg-gradient-to-r from-blue-600 to-fuchsia-600 hover:from-blue-500 hover:to-fuchsia-500 text-white font-black text-xl rounded-2xl shadow-[0_0_40px_rgba(192,38,211,0.5)] transition-all hover:scale-105">
                  Insert All Crystals
                </button>
             </div>
          )}

          {bossStep === 1 && (
             <div className="relative size-96 flex items-center justify-center z-10">
                <Database className="absolute size-32 text-white animate-pulse z-20" />
                {crystals.map((c, i) => {
                  const angle = (i * 360) / crystals.length;
                  return (
                    <div key={i} className={`absolute animate-in spin-in-180 zoom-in duration-1000 ${c.delay} flex flex-col items-center`}
                         style={{ transform: `rotate(${angle}deg) translateY(-140px) rotate(-${angle}deg)` }}>
                       <Star className={`size-12 ${c.color} fill-current drop-shadow-[0_0_15px_currentColor] animate-pulse`} />
                    </div>
                  )
                })}
                <div className="absolute inset-0 border-4 border-dashed border-slate-700 rounded-full animate-spin-slow opacity-50" />
             </div>
          )}

          {bossStep === 2 && (
             <div className="z-10 text-center w-full h-full flex flex-col items-center justify-center relative">
                {/* Massive blast effect */}
                <div className="absolute inset-0 bg-gradient-to-tr from-blue-900/40 via-fuchsia-900/40 to-emerald-900/40 animate-in fade-in duration-1000 pointer-events-none" />
                
                <ShieldCheck className="size-48 text-emerald-400 mb-8 drop-shadow-[0_0_60px_rgba(52,211,153,0.8)] animate-in zoom-in duration-700" />
                <h1 className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-fuchsia-400 to-emerald-400 uppercase tracking-widest mb-6 drop-shadow-[0_0_20px_rgba(255,255,255,0.3)] animate-in slide-in-from-bottom-8 duration-700 delay-300 fill-mode-both">
                  CodeVerse Mastered
                </h1>
                <p className="text-slate-300 max-w-2xl text-2xl leading-relaxed font-bold animate-in fade-in duration-1000 delay-700 fill-mode-both">
                  From basic variables to dynamic pointers and persistent archives, you have conquered the C Programming language. The universe is safe in your hands!
                </p>
             </div>
          )}
       </div>
    </div>
  );

  return (
    <div className="flex flex-col h-full bg-slate-950 text-foreground p-6 overflow-hidden relative font-sans">
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-border shrink-0 z-20">
        <div>
          <h2 className={`text-2xl font-black flex items-center gap-3 uppercase tracking-widest ${expId === 'c-w14-4' ? 'text-white' : 'text-indigo-400 drop-shadow-[0_0_10px_rgba(99,102,241,0.3)]'}`}>
            {expId === 'c-w14-4' ? <ShieldCheck className="size-7" /> : <FolderOpen className="size-7" />} 
            {expId === 'c-w14-4' ? 'Grand Finale' : 'Archive Kingdom'}
          </h2>
        </div>
        {expId !== 'c-w14-4' && (
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 bg-indigo-950/50 px-4 py-1.5 rounded-full border border-indigo-900 font-bold shadow-sm text-indigo-100">
              <Star className="size-4 text-indigo-400" /> {xp} XP
            </div>
            <div className="text-sm font-bold text-indigo-300 uppercase tracking-widest">
               {expId === "c-w14-1" && "Mission: Lost Chronicles"}
               {expId === "c-w14-2" && "Mission: Record Investigation"}
               {expId === "c-w14-3" && "Mission: Archive Explorer"}
            </div>
          </div>
        )}
      </div>

      {successMsg && (
        <div className="absolute top-24 left-1/2 -translate-x-1/2 bg-indigo-600 text-white px-6 py-3 rounded-lg shadow-xl animate-in slide-in-from-top-10 z-50 font-bold flex items-center gap-2">
          <Star className="size-5 fill-white" /> {successMsg}
        </div>
      )}

      <div className="flex-1 min-h-0 overflow-y-auto">
        {expId === "c-w14-1" && renderMission1()}
        {expId === "c-w14-2" && renderMission2()}
        {expId === "c-w14-3" && renderMission3()}
        {expId === "c-w14-4" && renderFinale()}
      </div>
    </div>
  );
}
