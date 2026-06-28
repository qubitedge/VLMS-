import { useState } from "react";
import { CheckCircle2, ArrowDown, ArrowUp, Monitor, HelpCircle, Shield, MoveRight, DoorOpen } from "lucide-react";

export function MirrorPortalSim() {
  const [stage, setStage] = useState(0);
  const [array, setArray] = useState<number[]>([10, 20, 30, 40, 50]);
  const [customInput, setCustomInput] = useState("5 12 8 20 15 9");
  
  const [leftIndex, setLeftIndex] = useState(0);
  const [rightIndex, setRightIndex] = useState(4);
  const [tempValue, setTempValue] = useState<number | null>(null);
  
  // swapStep: 0: normal, 1: temp = A[left], 2: A[left] = A[right], 3: A[right] = temp, 4: moved pointers
  const [swapStep, setSwapStep] = useState(0);

  const [quiz1Status, setQuiz1Status] = useState<"pending" | "correct" | "wrong">("pending");
  const [quiz2Status, setQuiz2Status] = useState<"pending" | "correct" | "wrong">("pending");
  const [doorChosen, setDoorChosen] = useState<"none" | "door1" | "door2">("none");

  const startSimulation = (useCustom: boolean) => {
    if (useCustom) {
      const parsed = customInput.split(" ").map(s => parseInt(s.trim())).filter(n => !isNaN(n));
      if (parsed.length > 0) {
        setArray(parsed);
        setRightIndex(parsed.length - 1);
      }
    } else {
      setArray([10, 20, 30, 40, 50]);
      setRightIndex(4);
    }
    setLeftIndex(0);
    setStage(1);
    setSwapStep(0);
  };

  const executeSwapStep = () => {
    if (leftIndex >= rightIndex) {
      setStage(5);
      return;
    }

    if (swapStep === 0) {
      // Pick temp
      setTempValue(array[leftIndex]);
      setSwapStep(1);
    } else if (swapStep === 1) {
      // If it's the first swap, we show a quiz about temp
      if (leftIndex === 0 && quiz2Status === "pending") {
         // wait for quiz
      } else {
        const newArr = [...array];
        newArr[leftIndex] = array[rightIndex];
        setArray(newArr);
        setSwapStep(2);
      }
    } else if (swapStep === 2) {
      const newArr = [...array];
      newArr[rightIndex] = tempValue!;
      setArray(newArr);
      setTempValue(null);
      setSwapStep(3);
    } else if (swapStep === 3) {
      setLeftIndex(l => l + 1);
      setRightIndex(r => r - 1);
      setSwapStep(0);
      
      // Check if pointers crossed immediately after moving
      if (leftIndex + 1 >= rightIndex - 1) {
         setStage(5);
      }
    }
  };

  return (
    <div className="flex flex-col h-full bg-[#1e1e1e] text-white p-6 overflow-y-auto font-mono">
      {/* Header */}
      <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/10">
        <div>
          <h2 className="text-2xl font-bold text-cyan flex items-center gap-2">
            <Shield className="size-6" /> The Mirror Portal
          </h2>
          <p className="text-white/60 text-sm mt-1">Mission: Reverse the crystal sequence using Two Pointers.</p>
        </div>
        <div className="flex gap-2">
          {[1, 2, 3, 4, 5, 6].map(s => (
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
          {stage === 0 && "Welcome to The Mirror Portal! Choose the default crystals or enter your own array to begin."}
          {stage === 1 && `Great! ${array.length} integers have been stored in consecutive memory locations.`}
          {stage === 2 && "Two pointer robots are ready to begin the reversal mission."}
          {stage === 3 && "We need a temporary box to safely store the original value before swapping."}
          {stage === 4 && "Both pointer robots move one step toward the center. Keep swapping until they meet!"}
          {stage === 5 && "Since both pointers have met (left >= right), every element has reached its mirror position! Now select the correct complexity."}
          {stage === 6 && "Mission Complete! You are an In-Place Reversal Master!"}
        </div>

        {/* Stage 0: Initial Setup */}
        {stage === 0 && (
          <div className="flex flex-col items-center gap-6 mt-12 animate-in fade-in zoom-in">
            <button 
              onClick={() => startSimulation(false)}
              className="px-8 py-3 bg-cyan text-black font-bold rounded-lg hover:bg-cyan/90 transition-colors w-64"
            >
              Start Default Array
            </button>
            <div className="text-white/50 text-sm">OR</div>
            <div className="bg-black/50 p-6 rounded-xl border border-white/10 w-full max-w-md space-y-4">
              <div className="text-cyan font-bold flex items-center gap-2">
                🌟 Bonus Interactive Feature
              </div>
              <div>
                <label className="text-xs text-white/50 block mb-1">Enter Elements (Space Separated):</label>
                <input 
                  type="text" 
                  value={customInput}
                  onChange={(e) => setCustomInput(e.target.value)}
                  className="w-full bg-black border border-white/20 rounded px-4 py-2 text-white focus:outline-none focus:border-cyan"
                />
              </div>
              <button 
                onClick={() => startSimulation(true)}
                className="w-full px-8 py-3 bg-white/10 text-white font-bold rounded-lg hover:bg-white/20 transition-colors border border-white/20"
              >
                Start Custom Array
              </button>
            </div>
          </div>
        )}

        {/* Array Visualization Area (Stages 1-5) */}
        {stage >= 1 && stage <= 5 && (
          <div className="flex flex-col items-center gap-8 animate-in fade-in duration-700">
            
            {/* Code Context */}
            {stage === 1 && (
              <div className="bg-black/50 p-4 rounded-lg border border-white/10 text-cyan-400 w-full max-w-md text-center">
                <code>int A[{array.length}] = {'{'}{array.join(", ")}{'}'};</code>
              </div>
            )}
            {stage === 2 && (
              <div className="bg-black/50 p-4 rounded-lg border border-white/10 text-cyan-400 w-full max-w-md">
                <code>left = 0;<br/>right = n - 1;</code>
              </div>
            )}
            {stage === 3 && (
              <div className="bg-black/50 p-4 rounded-lg border border-white/10 text-cyan-400 w-full max-w-md">
                <code className={swapStep === 1 ? "bg-white/20 px-1" : ""}>temp = A[left];</code><br/>
                <code className={swapStep === 2 ? "bg-white/20 px-1" : ""}>A[left] = A[right];</code><br/>
                <code className={swapStep === 3 ? "bg-white/20 px-1" : ""}>A[right] = temp;</code>
              </div>
            )}
            {stage === 4 && (
              <div className="bg-black/50 p-4 rounded-lg border border-white/10 text-cyan-400 w-full max-w-md">
                <code>left++;<br/>right--;</code>
              </div>
            )}

            {/* Pointers & Array */}
            <div className="relative mt-12 mb-8">
              
              {/* Pointers */}
              {stage >= 2 && leftIndex < rightIndex && (
                <>
                  <div 
                    className="absolute -top-10 flex flex-col items-center text-cyan transition-all duration-500 font-bold"
                    style={{ left: `${leftIndex * 64}px`, width: '64px' }}
                  >
                    <span className="text-xs mb-1">Left</span>
                    <ArrowDown className="size-5 animate-bounce" />
                  </div>
                  <div 
                    className="absolute -top-10 flex flex-col items-center text-mint transition-all duration-500 font-bold"
                    style={{ left: `${rightIndex * 64}px`, width: '64px' }}
                  >
                    <span className="text-xs mb-1">Right</span>
                    <ArrowDown className="size-5 animate-bounce" />
                  </div>
                </>
              )}

              {/* Memory Array */}
              <div className="flex border-2 border-white/20 rounded-xl overflow-hidden bg-black/50">
                {array.map((val, idx) => (
                  <div 
                    key={idx} 
                    className={`w-16 h-16 flex flex-col items-center justify-center border-r border-white/20 last:border-r-0 transition-colors duration-500
                      ${idx === leftIndex && stage >= 2 ? 'bg-cyan/20' : ''}
                      ${idx === rightIndex && stage >= 2 ? 'bg-mint/20' : ''}
                      ${(idx < leftIndex || idx > rightIndex) && stage >= 3 ? 'bg-white/5 opacity-50' : ''}
                    `}
                  >
                    <span className="text-xl font-bold">{val}</span>
                  </div>
                ))}
              </div>
              
              {/* Indices & Addresses */}
              <div className="flex mt-2">
                {array.map((_, idx) => (
                  <div key={idx} className="w-16 flex flex-col items-center text-xs text-white/40">
                    <span>{idx}</span>
                    {stage === 1 && <span className="text-[10px] text-white/30 mt-1">{1000 + idx * 4}</span>}
                  </div>
                ))}
              </div>
            </div>

            {/* Temp Box (Stage 3/4) */}
            {(stage === 3 || stage === 4) && (
              <div className="flex flex-col items-center gap-2 animate-in slide-in-from-bottom-4">
                <div className="text-xs text-white/50 bg-black px-2 py-1 rounded border border-white/10 flex items-center gap-2">
                  <span>Temporary Box</span>
                </div>
                <div className={`w-24 h-16 border-2 rounded-xl flex items-center justify-center text-xl font-bold transition-all duration-300 ${tempValue !== null ? 'border-yellow-400 text-yellow-400 shadow-[0_0_15px_rgba(250,204,21,0.3)]' : 'border-white/20 text-white/20'}`}>
                  {tempValue !== null ? tempValue : "?"}
                </div>
              </div>
            )}

            {/* Stage Actions */}
            {stage === 1 && (
              <button onClick={() => setStage(2)} className="px-6 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors border border-white/20 mt-4">
                Activate Two Pointers
              </button>
            )}

            {stage === 2 && quiz1Status === "pending" && (
              <div className="bg-cyan/10 border border-cyan/30 rounded-xl p-6 w-full max-w-md animate-in zoom-in mt-4">
                <div className="flex items-center gap-2 text-cyan font-bold mb-4">
                  <HelpCircle className="size-5" /> MINI CHALLENGE
                </div>
                <p className="mb-4">Where should the Right Pointer start?</p>
                <div className="space-y-2">
                  <button onClick={() => setQuiz1Status("wrong")} className="w-full text-left px-4 py-3 rounded border border-white/10 hover:bg-white/5 transition-colors">A) 0</button>
                  <button onClick={() => setQuiz1Status("wrong")} className="w-full text-left px-4 py-3 rounded border border-white/10 hover:bg-white/5 transition-colors">B) n</button>
                  <button onClick={() => setQuiz1Status("correct")} className="w-full text-left px-4 py-3 rounded border border-white/10 hover:bg-white/5 transition-colors">C) n-1</button>
                </div>
              </div>
            )}
            
            {stage === 2 && quiz1Status === "wrong" && (
              <div className="text-center p-4 bg-red-500/10 border border-red-500/30 text-red-400 rounded-lg max-w-md w-full">
                ❌ Try Again! Hint: Array indices are 0-based.
                <button onClick={() => setQuiz1Status("pending")} className="block mx-auto mt-2 text-xs underline">Retry</button>
              </div>
            )}

            {stage === 2 && quiz1Status === "correct" && (
              <div className="text-center p-6 bg-mint/10 border border-mint/30 rounded-xl w-full max-w-md animate-in zoom-in">
                <div className="text-mint font-bold text-xl mb-2">✅ Excellent!</div>
                <p className="text-sm text-mint/80 mb-6">Arrays start from index 0, so the last element is at n-1.</p>
                <button onClick={() => setStage(3)} className="px-6 py-2 bg-mint text-black font-bold rounded-lg hover:bg-mint/90 transition-colors">
                  Begin First Swap
                </button>
              </div>
            )}

            {(stage === 3 || stage === 4) && (
              <div className="flex flex-col items-center gap-4 mt-4 w-full max-w-md">
                
                {stage === 3 && swapStep === 1 && quiz2Status === "pending" && (
                   <div className="bg-yellow-400/10 border border-yellow-400/30 rounded-xl p-6 w-full animate-in zoom-in">
                    <div className="flex items-center gap-2 text-yellow-400 font-bold mb-4">
                      <HelpCircle className="size-5" /> MINI QUIZ
                    </div>
                    <p className="mb-4">Why do we use a temporary variable?</p>
                    <div className="space-y-2">
                      <button onClick={() => setQuiz2Status("correct")} className="w-full text-left px-4 py-3 rounded border border-white/10 hover:bg-white/5 transition-colors">A) To avoid losing data when overwriting.</button>
                      <button onClick={() => setQuiz2Status("wrong")} className="w-full text-left px-4 py-3 rounded border border-white/10 hover:bg-white/5 transition-colors">B) To make the code longer.</button>
                      <button onClick={() => setQuiz2Status("wrong")} className="w-full text-left px-4 py-3 rounded border border-white/10 hover:bg-white/5 transition-colors">C) It is not required.</button>
                    </div>
                  </div>
                )}
                
                {stage === 3 && swapStep === 1 && quiz2Status === "wrong" && (
                  <div className="text-center p-4 bg-red-500/10 border border-red-500/30 text-red-400 rounded-lg w-full">
                    ❌ Try Again! Without temp, A[left] = A[right] would completely erase the left value forever!
                    <button onClick={() => setQuiz2Status("pending")} className="block mx-auto mt-2 text-xs underline">Retry</button>
                  </div>
                )}
                
                {stage === 3 && swapStep === 1 && quiz2Status === "correct" && (
                  <div className="text-center p-4 bg-mint/10 border border-mint/30 rounded-xl w-full text-mint mb-4">
                    ✅ Correct! To avoid losing data.
                  </div>
                )}

                {/* Next Step Button */}
                {!(stage === 3 && swapStep === 1 && quiz2Status !== "correct") && (
                  <button onClick={executeSwapStep} className="px-8 py-3 bg-cyan text-black font-bold rounded-lg hover:bg-cyan/90 transition-colors animate-pulse">
                    {swapStep === 0 ? "Extract to Temp" : 
                     swapStep === 1 ? "Move Right to Left" :
                     swapStep === 2 ? "Move Temp to Right" :
                     "Move Pointers Inward"}
                  </button>
                )}
              </div>
            )}
          </div>
        )}

        {/* Stage 5: Output & Complexity */}
        {stage === 5 && (
          <div className="space-y-8 animate-in fade-in duration-700 w-full max-w-2xl mx-auto">
            
            <div className="flex flex-col items-center gap-4 border-b border-white/10 pb-8">
               <div className="text-xl font-bold text-mint mb-2 flex items-center gap-2"><CheckCircle2/> Reversal Complete!</div>
               <div className="w-full bg-black border border-white/20 rounded-xl overflow-hidden shadow-2xl">
                  <div className="bg-white/5 px-4 py-2 border-b border-white/10 flex items-center gap-2 text-xs text-white/50 uppercase tracking-wider">
                    <Monitor className="size-4" /> Monitor
                  </div>
                  <div className="p-6 font-mono text-green-400 text-lg text-center">
                    <div>Reversed Array</div>
                    <div className="mt-2 tracking-widest">{array.join(" ")}</div>
                  </div>
                </div>
            </div>

            <div className="text-center">
              <h3 className="text-xl font-bold text-cyan mb-6">🧠 Complexity Visualization</h3>
              <p className="text-sm text-white/60 mb-6">Which approach did we just use?</p>
              
              <div className="grid grid-cols-2 gap-6">
                <div 
                  onClick={() => setDoorChosen("door1")}
                  className={`p-6 rounded-xl border-2 cursor-pointer transition-all ${doorChosen === "door1" ? 'border-red-500 bg-red-500/10' : 'border-white/20 bg-black/50 hover:border-white/40'}`}
                >
                  <DoorOpen className="size-12 mx-auto mb-4 text-white/50" />
                  <div className="font-bold mb-2">Create New Array</div>
                  <div className="text-sm text-white/50">Extra Memory Used</div>
                  {doorChosen === "door1" && <div className="mt-4 text-red-400 font-bold text-lg">❌ Incorrect O(n)</div>}
                </div>

                <div 
                  onClick={() => {
                    setDoorChosen("door2");
                    setTimeout(() => setStage(6), 1500);
                  }}
                  className={`p-6 rounded-xl border-2 cursor-pointer transition-all ${doorChosen === "door2" ? 'border-mint bg-mint/10' : 'border-white/20 bg-black/50 hover:border-white/40'}`}
                >
                  <DoorOpen className="size-12 mx-auto mb-4 text-white/50" />
                  <div className="font-bold mb-2">Swap In-Place</div>
                  <div className="text-sm text-white/50">No Extra Memory</div>
                  {doorChosen === "door2" && <div className="mt-4 text-mint font-bold text-lg">✅ Correct O(1)</div>}
                </div>
              </div>
            </div>

          </div>
        )}

        {/* End Screen */}
        {stage === 6 && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in duration-500">
            <div className="bg-[#1e1e1e] border border-white/20 p-8 rounded-2xl max-w-sm w-full text-center shadow-[0_0_30px_rgba(34,211,238,0.2)] animate-in zoom-in-95">
              <h2 className="text-2xl font-bold text-white mb-6 uppercase tracking-widest border-b border-white/10 pb-4">Mission Report</h2>
              
              <div className="space-y-4 mb-8 text-left font-mono text-sm">
                <div className="flex items-center gap-3 text-mint"><CheckCircle2 className="size-4" /> Array Created</div>
                <div className="flex items-center gap-3 text-mint"><CheckCircle2 className="size-4" /> Two Pointers Activated</div>
                <div className="flex items-center gap-3 text-mint"><CheckCircle2 className="size-4" /> Elements Swapped</div>
                <div className="flex items-center gap-3 text-mint"><CheckCircle2 className="size-4" /> Temporary Variable Used</div>
                <div className="flex items-center gap-3 text-mint"><CheckCircle2 className="size-4" /> In-Place Reversal Completed</div>
              </div>

              <div className="flex justify-between items-center bg-black/50 p-4 rounded-lg mb-6 text-sm">
                <div className="text-white/60">Time: <span className="text-cyan font-bold">O(n)</span></div>
                <div className="text-white/60">Space: <span className="text-mint font-bold">O(1)</span></div>
              </div>

              <div className="text-4xl font-bold text-cyan mb-6 drop-shadow-[0_0_10px_rgba(34,211,238,0.5)]">
                100 / 100
              </div>

              <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-4 mb-6">
                <div className="text-xs text-yellow-500/70 uppercase font-bold mb-2">Badge Unlocked</div>
                <div className="text-yellow-400 font-bold flex items-center justify-center gap-2 text-lg">
                  <Shield className="size-6" /> ARRAY GUARDIAN
                </div>
              </div>

              <button 
                onClick={() => setStage(0)}
                className="w-full py-3 bg-white/10 hover:bg-white/20 rounded-lg text-white font-bold transition-colors border border-white/10"
              >
                Return to Portal
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
