import { useState } from "react";
import { CheckCircle2, Keyboard, Monitor, ArrowDown, HelpCircle, Trophy } from "lucide-react";

export function MemoryManagerSim() {
  const [stage, setStage] = useState(0);
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [quizAnswer, setQuizAnswer] = useState<string | null>(null);
  const [quizStatus, setQuizStatus] = useState<"pending" | "correct" | "wrong">("pending");

  const handleQuizSubmit = (ans: string) => {
    setQuizAnswer(ans);
    if (ans === "A") {
      setQuizStatus("correct");
    } else {
      setQuizStatus("wrong");
    }
  };

  return (
    <div className="flex flex-col h-full bg-[#1e1e1e] text-white p-6 overflow-y-auto font-mono">
      {/* Header */}
      <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/10">
        <div>
          <h2 className="text-2xl font-bold text-cyan flex items-center gap-2">
            <Trophy className="size-6" /> Memory Manager
          </h2>
          <p className="text-white/60 text-sm mt-1">Mission: Store user information inside computer memory.</p>
        </div>
        <div className="flex gap-2">
          {[1, 2, 3, 4].map(s => (
            <div 
              key={s} 
              className={`size-3 rounded-full ${stage >= s ? 'bg-cyan shadow-[0_0_10px_rgba(34,211,238,0.5)]' : 'bg-white/20'}`}
            />
          ))}
        </div>
      </div>

      <div className="flex-1 max-w-4xl mx-auto w-full space-y-8">
        
        {/* Narrator */}
        <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-sm leading-relaxed">
          <div className="text-cyan font-bold mb-1">Narrator:</div>
          {stage === 0 && "Welcome, Memory Manager! Your task is to allocate memory, collect user input, and display it correctly. Click 'Start Mission' to begin."}
          {stage === 1 && "Great! You have reserved memory locations for storing data. Notice how 'name' automatically points to an address, while 'age' needs the & operator to be found later."}
          {stage === 2 && "Enter a name to store it in memory. Watch how it flows from the keyboard to the address!"}
          {stage === 3 && "Now enter an age. Notice the '&' operator explicitly pulling the address for the integer variable."}
          {stage === 4 && "Awesome! Let's use printf() to display what we stored in memory onto the monitor."}
          {stage === 5 && "Mission Complete! You successfully managed the memory and performed basic I/O."}
        </div>

        {/* Start Button */}
        {stage === 0 && (
          <div className="flex justify-center mt-12">
            <button 
              onClick={() => setStage(1)}
              className="px-8 py-3 bg-cyan text-black font-bold rounded-lg hover:bg-cyan/90 transition-colors animate-pulse"
            >
              Start Mission
            </button>
          </div>
        )}

        {/* Stage 1: Memory Allocation */}
        {stage >= 1 && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="bg-black/50 p-4 rounded-lg border border-white/10 text-cyan-400">
              <code>char name[50];</code><br/>
              <code>int age;</code>
            </div>

            <div className="flex flex-col sm:flex-row gap-8 justify-center items-center">
              {/* Name Box */}
              <div className="flex flex-col items-center gap-2">
                <div className="text-xs text-white/50 bg-black px-2 py-1 rounded">Address: 0x1000</div>
                <div className={`w-40 border-2 rounded-xl overflow-hidden transition-all duration-500 ${stage >= 2 && name ? 'border-mint shadow-[0_0_15px_rgba(167,243,208,0.3)]' : 'border-white/20'}`}>
                  <div className="bg-white/10 py-1.5 text-center text-xs font-bold text-white/70">String Box (name)</div>
                  <div className="h-16 flex items-center justify-center bg-black/30 font-bold text-lg">
                    {stage >= 2 && name ? <span className="text-mint animate-in zoom-in">"{name}"</span> : <span className="text-white/30 text-sm italic">[ Empty ]</span>}
                  </div>
                </div>
              </div>

              {/* Age Box */}
              <div className="flex flex-col items-center gap-2">
                <div className="text-xs text-white/50 bg-black px-2 py-1 rounded">Address: 0x2000</div>
                <div className={`w-40 border-2 rounded-xl overflow-hidden transition-all duration-500 ${stage >= 3 && age ? 'border-mint shadow-[0_0_15px_rgba(167,243,208,0.3)]' : 'border-white/20'}`}>
                  <div className="bg-white/10 py-1.5 text-center text-xs font-bold text-white/70">Integer Box (age)</div>
                  <div className="h-16 flex items-center justify-center bg-black/30 font-bold text-lg">
                    {stage >= 3 && age ? <span className="text-mint animate-in zoom-in">{age}</span> : <span className="text-white/30 text-sm italic">[ Empty ]</span>}
                  </div>
                </div>
              </div>
            </div>

            {stage === 1 && (
              <div className="flex justify-center mt-8">
                <button 
                  onClick={() => setStage(2)}
                  className="px-6 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors border border-white/20"
                >
                  Next: Store Name
                </button>
              </div>
            )}
          </div>
        )}

        {/* Stage 2: Store Name & Quiz */}
        {stage === 2 && (
          <div className="space-y-6 border-t border-white/10 pt-8 animate-in fade-in duration-700">
            <div className="bg-black/50 p-4 rounded-lg border border-white/10 text-cyan-400">
              <code>scanf("%s", name);</code>
            </div>

            <div className="flex flex-col items-center gap-4">
              <div className="flex items-center gap-3">
                <Keyboard className="size-6 text-white/50" />
                <input 
                  type="text" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter Name..."
                  className="bg-black border border-white/20 rounded px-4 py-2 text-white focus:outline-none focus:border-cyan text-center w-48"
                />
              </div>
              <ArrowDown className="size-6 text-white/30 animate-bounce" />
              <div className="text-xs text-white/50">Stored directly to 0x1000</div>
            </div>

            {name.length > 0 && quizStatus === "pending" && (
              <div className="mt-8 bg-cyan/10 border border-cyan/30 rounded-xl p-6 animate-in zoom-in-95">
                <div className="flex items-center gap-2 text-cyan font-bold mb-4">
                  <HelpCircle className="size-5" /> MISSION QUIZ
                </div>
                <p className="mb-4">Why is '&' omitted in <code className="bg-black/50 px-1 rounded text-cyan-300">scanf("%s", name)</code>?</p>
                <div className="space-y-2">
                  <button onClick={() => handleQuizSubmit("A")} className="w-full text-left px-4 py-3 rounded border border-white/10 hover:bg-white/5 transition-colors">A. Arrays already represent memory addresses.</button>
                  <button onClick={() => handleQuizSubmit("B")} className="w-full text-left px-4 py-3 rounded border border-white/10 hover:bg-white/5 transition-colors">B. Strings never use memory.</button>
                  <button onClick={() => handleQuizSubmit("C")} className="w-full text-left px-4 py-3 rounded border border-white/10 hover:bg-white/5 transition-colors">C. scanf() adds '&' automatically.</button>
                </div>
              </div>
            )}

            {quizStatus === "wrong" && (
              <div className="text-center p-4 bg-red-500/10 border border-red-500/30 text-red-400 rounded-lg">
                ❌ Try Again! Hint: What does the array name inherently represent in C?
                <button onClick={() => setQuizStatus("pending")} className="block mx-auto mt-2 text-xs underline">Retry</button>
              </div>
            )}

            {quizStatus === "correct" && (
              <div className="text-center p-6 bg-mint/10 border border-mint/30 rounded-xl animate-in zoom-in">
                <div className="text-mint font-bold text-xl mb-2">🎉 Correct!</div>
                <p className="text-sm text-mint/80 mb-6">Array names inherently point to their first element's memory address. No '&' required.</p>
                <button 
                  onClick={() => setStage(3)}
                  className="px-6 py-2 bg-mint text-black font-bold rounded-lg hover:bg-mint/90 transition-colors"
                >
                  Next: Store Age
                </button>
              </div>
            )}
          </div>
        )}

        {/* Stage 3: Store Age */}
        {stage === 3 && (
          <div className="space-y-6 border-t border-white/10 pt-8 animate-in fade-in duration-700">
            <div className="bg-black/50 p-4 rounded-lg border border-white/10 text-cyan-400">
              <code>scanf("%d", <span className="text-yellow-400">&</span>age);</code>
            </div>

            <div className="flex flex-col items-center gap-4">
              <div className="flex items-center gap-3">
                <Keyboard className="size-6 text-white/50" />
                <input 
                  type="number" 
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  placeholder="Enter Age..."
                  className="bg-black border border-white/20 rounded px-4 py-2 text-white focus:outline-none focus:border-cyan text-center w-48"
                />
              </div>
              <ArrowDown className="size-6 text-yellow-400/70 animate-bounce" />
              <div className="text-xs text-yellow-400 bg-yellow-400/10 border border-yellow-400/30 px-3 py-1 rounded-full font-bold flex items-center gap-2">
                <span>&</span> grabs Address 0x2000
              </div>
            </div>

            {age && (
              <div className="flex justify-center mt-8">
                <button 
                  onClick={() => setStage(4)}
                  className="px-6 py-2 bg-cyan text-black font-bold rounded-lg hover:bg-cyan/90 transition-colors animate-in zoom-in"
                >
                  Generate Output
                </button>
              </div>
            )}
          </div>
        )}

        {/* Stage 4: Output Console */}
        {stage >= 4 && (
          <div className="space-y-6 border-t border-white/10 pt-8 animate-in fade-in duration-700">
            <div className="bg-black/50 p-4 rounded-lg border border-white/10 text-cyan-400">
              <code>printf("Name : %s Age : %d", name, age);</code>
            </div>

            <div className="flex flex-col items-center gap-6">
              <ArrowDown className="size-6 text-cyan/50" />
              
              <div className="w-full max-w-md bg-black border border-white/20 rounded-xl overflow-hidden shadow-2xl">
                <div className="bg-white/5 px-4 py-2 border-b border-white/10 flex items-center gap-2 text-xs text-white/50 uppercase tracking-wider">
                  <Monitor className="size-4" /> Monitor
                </div>
                <div className="p-6 font-mono text-green-400 text-lg">
                  <div>Name : {name}</div>
                  <div>Age  : {age}</div>
                </div>
              </div>
            </div>

            {stage === 4 && (
              <div className="flex justify-center mt-8">
                <button 
                  onClick={() => setStage(5)}
                  className="px-8 py-3 bg-mint text-black font-bold rounded-lg hover:bg-mint/90 transition-colors animate-pulse shadow-[0_0_15px_rgba(167,243,208,0.5)]"
                >
                  Complete Mission
                </button>
              </div>
            )}
          </div>
        )}

        {/* End Screen */}
        {stage === 5 && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in duration-500">
            <div className="bg-[#1e1e1e] border border-white/20 p-8 rounded-2xl max-w-sm w-full text-center shadow-2xl animate-in zoom-in-95">
              <h2 className="text-2xl font-bold text-white mb-6 uppercase tracking-widest border-b border-white/10 pb-4">Memory Manager Report</h2>
              
              <div className="space-y-4 mb-8 text-left">
                <div className="flex items-center gap-3 text-mint"><CheckCircle2 className="size-5" /> Variables Created</div>
                <div className="flex items-center gap-3 text-mint"><CheckCircle2 className="size-5" /> String Stored</div>
                <div className="flex items-center gap-3 text-mint"><CheckCircle2 className="size-5" /> Integer Stored</div>
                <div className="flex items-center gap-3 text-mint"><CheckCircle2 className="size-5" /> Output Displayed</div>
              </div>

              <div className="text-4xl font-bold text-cyan mb-6 drop-shadow-[0_0_10px_rgba(34,211,238,0.5)]">
                100 / 100
              </div>

              <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-4 mb-6">
                <div className="text-xs text-yellow-500/70 uppercase font-bold mb-2">Badge Unlocked</div>
                <div className="text-yellow-400 font-bold flex items-center justify-center gap-2 text-lg">
                  <Trophy className="size-6" /> Input-Output Explorer
                </div>
              </div>

              <button 
                onClick={() => setStage(1)}
                className="w-full py-3 bg-white/10 hover:bg-white/20 rounded-lg text-white font-bold transition-colors border border-white/10"
              >
                Restart Simulation
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
