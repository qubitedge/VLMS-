import { useState } from "react";
import { CheckCircle2, Search, XCircle, Shield, Diamond, Footprints, Clock, Binary, ArrowRight } from "lucide-react";

export function LinearSearchSim() {
  const [stage, setStage] = useState(0);
  const [array, setArray] = useState<number[]>([25, 12, 8, 45, 30, 18]);
  const [targetKey, setTargetKey] = useState(45);
  const [customInputArray, setCustomInputArray] = useState("10 35 18 90 25 60 40");
  const [customInputKey, setCustomInputKey] = useState("25");
  
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [comparisons, setComparisons] = useState(0);
  const [isFound, setIsFound] = useState(false);

  const [quiz1Status, setQuiz1Status] = useState<"pending" | "correct" | "wrong">("pending");
  const [complexityDoor, setComplexityDoor] = useState<"none" | "best" | "avg" | "worst">("none");
  const [algoChoice, setAlgoChoice] = useState<"none" | "linear" | "binary">("none");

  const startSimulation = (useCustom: boolean) => {
    if (useCustom) {
      const parsedArray = customInputArray.split(" ").map(s => parseInt(s.trim())).filter(n => !isNaN(n));
      const parsedKey = parseInt(customInputKey.trim());
      if (parsedArray.length > 0 && !isNaN(parsedKey)) {
        setArray(parsedArray);
        setTargetKey(parsedKey);
      }
    } else {
      setArray([25, 12, 8, 45, 30, 18]);
      setTargetKey(45);
    }
    setStage(1);
    setCurrentIndex(-1);
    setComparisons(0);
    setIsFound(false);
  };

  const nextSearchStep = () => {
    const nextIdx = currentIndex + 1;
    setCurrentIndex(nextIdx);
    setComparisons(prev => prev + 1);

    if (nextIdx < array.length) {
      if (array[nextIdx] === targetKey) {
        setIsFound(true);
        setTimeout(() => setStage(5), 1000);
      } else {
        // Not found at this index, user must click next again
      }
    } else {
      // Reached the end without finding
      setIsFound(false);
      setStage(5);
    }
  };

  return (
    <div className="flex flex-col h-full bg-[#1e1e1e] text-white p-6 overflow-y-auto font-mono">
      {/* Header */}
      <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/10">
        <div>
          <h2 className="text-2xl font-bold text-cyan flex items-center gap-2">
            <Search className="size-6" /> The Lost Treasure Hunt
          </h2>
          <p className="text-white/60 text-sm mt-1">Mission: Find the target gem by opening one box at a time.</p>
        </div>
        <div className="flex gap-2">
          {[1, 2, 3, 4, 5, 6, 7, 8].map(s => (
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
          {stage === 0 && "Welcome Search Detective! Choose the default treasure boxes or hide your own gems."}
          {stage === 1 && `Somewhere inside these boxes is the target treasure (${targetKey}). Begin your search!`}
          {stage === 2 && "Linear Search always starts from index 0. Check the boxes sequentially."}
          {stage >= 3 && stage <= 4 && "Checking one box at a time... Does the box contain the target?"}
          {stage === 5 && isFound && "You found the treasure! Excellent detective work."}
          {stage === 5 && !isFound && "Every element has been checked, but the target does not exist. The treasure is lost forever!"}
          {stage === 6 && "How fast was that? Let's analyze the time complexity."}
          {stage === 7 && "One final challenge: Which algorithm is better for an unsorted array?"}
          {stage === 8 && "Mission Complete! You are a master Search Detective!"}
        </div>

        {/* Stage 0: Initial Setup */}
        {stage === 0 && (
          <div className="flex flex-col items-center gap-6 mt-12 animate-in fade-in zoom-in">
            <button 
              onClick={() => startSimulation(false)}
              className="px-8 py-3 bg-cyan text-black font-bold rounded-lg hover:bg-cyan/90 transition-colors w-64"
            >
              Start Default Search
            </button>
            <div className="text-white/50 text-sm">OR</div>
            <div className="bg-black/50 p-6 rounded-xl border border-white/10 w-full max-w-md space-y-4">
              <div className="text-cyan font-bold flex items-center gap-2">
                🌟 Bonus Feature (Highly Recommended)
              </div>
              <div>
                <label className="text-xs text-white/50 block mb-1">Enter Elements (Space Separated):</label>
                <input 
                  type="text" 
                  value={customInputArray}
                  onChange={(e) => setCustomInputArray(e.target.value)}
                  className="w-full bg-black border border-white/20 rounded px-4 py-2 text-white focus:outline-none focus:border-cyan"
                />
              </div>
              <div>
                <label className="text-xs text-white/50 block mb-1">Enter Target Key:</label>
                <input 
                  type="text" 
                  value={customInputKey}
                  onChange={(e) => setCustomInputKey(e.target.value)}
                  className="w-full bg-black border border-white/20 rounded px-4 py-2 text-white focus:outline-none focus:border-cyan"
                />
              </div>
              <button 
                onClick={() => startSimulation(true)}
                className="w-full px-8 py-3 bg-white/10 text-white font-bold rounded-lg hover:bg-white/20 transition-colors border border-white/20"
              >
                Start Custom Search
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
                <code>int A[{array.length}] = {'{'}{array.join(", ")}{'}'};<br/>int key = {targetKey};</code>
              </div>
            )}
            {stage >= 2 && stage <= 4 && (
              <div className="bg-black/50 p-4 rounded-lg border border-white/10 text-cyan-400 w-full max-w-md">
                <code>for(i=0; i&lt;n; i++)</code>
              </div>
            )}

            {/* Target Display */}
            <div className="flex items-center gap-4 bg-black/50 px-6 py-3 rounded-full border border-white/10">
              <span className="text-white/50">Target Key:</span>
              <span className="text-2xl font-bold text-cyan">{targetKey}</span>
            </div>

            {/* Array & Detective */}
            <div className="relative mt-8 mb-4 flex overflow-x-auto max-w-full pb-10 px-4">
              <div className="flex">
                {array.map((val, idx) => {
                  const isCurrent = idx === currentIndex;
                  const isChecked = idx < currentIndex;
                  const isMatch = isCurrent && val === targetKey;
                  const isMismatch = isCurrent && val !== targetKey;
                  
                  return (
                    <div key={idx} className="relative w-20 flex flex-col items-center mx-1">
                      
                      {/* Detective / Diamond */}
                      <div className="h-12 flex items-end justify-center mb-2">
                        {isCurrent && !isMatch && (
                          <div className="flex flex-col items-center animate-bounce">
                            <span className="text-3xl">🕵️</span>
                            <ArrowRight className="size-4 text-cyan rotate-90 mt-1" />
                          </div>
                        )}
                        {isCurrent && isMatch && (
                          <div className="flex flex-col items-center animate-in zoom-in slide-in-from-top-4">
                            <span className="text-3xl"><Diamond className="text-cyan fill-cyan" /></span>
                            <ArrowRight className="size-4 text-cyan rotate-90 mt-1" />
                          </div>
                        )}
                      </div>

                      {/* Box */}
                      <div className={`w-16 h-16 flex items-center justify-center rounded-xl border-2 transition-all duration-300 relative
                        ${isChecked && !isMatch ? 'bg-white/5 border-white/10 text-white/30' : ''}
                        ${isCurrent && isMatch ? 'bg-cyan/20 border-cyan text-cyan shadow-[0_0_15px_rgba(34,211,238,0.5)]' : ''}
                        ${isCurrent && isMismatch ? 'bg-red-500/20 border-red-500 text-red-500' : ''}
                        ${!isChecked && !isCurrent ? 'bg-[#2a2a2a] border-white/20' : ''}
                      `}>
                        <span className="text-xl font-bold">{val}</span>
                        {isCurrent && isMismatch && <XCircle className="absolute -top-2 -right-2 size-5 text-red-500 bg-[#1e1e1e] rounded-full" />}
                        {isCurrent && isMatch && <CheckCircle2 className="absolute -top-2 -right-2 size-5 text-cyan bg-[#1e1e1e] rounded-full" />}
                        {isChecked && !isCurrent && <XCircle className="absolute -top-2 -right-2 size-4 text-white/20 bg-[#1e1e1e] rounded-full" />}
                      </div>

                      {/* Index */}
                      <span className="text-xs text-white/40 mt-2">{idx}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Status Panel */}
            <div className="flex items-center gap-8 bg-black p-4 rounded-xl border border-white/10 w-full max-w-md justify-between">
              <div className="flex items-center gap-2">
                <Footprints className="size-5 text-cyan" />
                <span className="text-white/60">Comparisons:</span>
                <span className="font-bold text-xl">{comparisons}</span>
              </div>
              <div className="text-sm font-bold">
                {currentIndex === -1 ? (
                  <span className="text-white/40">Not Started</span>
                ) : array[currentIndex] === targetKey ? (
                  <span className="text-cyan animate-pulse">MATCH FOUND!</span>
                ) : (
                  <span className="text-red-400">No Match</span>
                )}
              </div>
            </div>

            {/* Actions */}
            {stage === 1 && (
              <button onClick={() => { setStage(2); setCurrentIndex(0); setComparisons(1); }} className="px-6 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors border border-white/20 mt-4 animate-in zoom-in">
                Start Searching
              </button>
            )}

            {stage >= 2 && stage <= 4 && !isFound && currentIndex < array.length && (
              <div className="flex flex-col items-center gap-4 mt-4 w-full max-w-md">
                <div className="text-center p-4 bg-white/5 border border-white/10 rounded-lg w-full font-mono text-lg animate-in zoom-in">
                  {array[currentIndex]} == {targetKey} ?
                </div>
                <button onClick={() => { setStage(3); nextSearchStep(); }} className="px-8 py-3 bg-cyan text-black font-bold rounded-lg hover:bg-cyan/90 transition-colors">
                  Check Next Box
                </button>
              </div>
            )}

            {/* Found / Not Found Result */}
            {stage === 5 && (
              <div className="w-full max-w-md animate-in zoom-in mt-8">
                {isFound ? (
                  <div className="bg-cyan/10 border border-cyan/30 rounded-xl p-6 text-center">
                    <div className="text-cyan font-bold text-2xl mb-4 flex items-center justify-center gap-2">
                      <CheckCircle2 /> Target Found!
                    </div>
                    <div className="bg-black/50 p-4 rounded-lg text-left space-y-2 font-mono mb-6">
                      <div><span className="text-white/50">Element:</span> <span className="text-cyan">{targetKey}</span></div>
                      <div><span className="text-white/50">Index:</span> <span className="text-cyan">{currentIndex}</span></div>
                      <div><span className="text-white/50">Comparisons Made:</span> <span className="text-cyan">{comparisons}</span></div>
                    </div>
                    
                    {/* Mini Quiz */}
                    <div className="border-t border-cyan/20 pt-6">
                      <div className="text-sm text-cyan font-bold mb-3 text-left">❓ Mini Quiz: Why did we check boxes one by one?</div>
                      <div className="space-y-2">
                        <button onClick={() => setQuiz1Status("correct")} className={`w-full text-left px-4 py-2 text-sm rounded border transition-colors ${quiz1Status === "correct" ? 'border-cyan bg-cyan/20' : 'border-white/10 hover:bg-white/5'}`}>A) Array is unsorted.</button>
                        <button onClick={() => setQuiz1Status("wrong")} className="w-full text-left px-4 py-2 text-sm rounded border border-white/10 hover:bg-white/5">B) Computer is slow.</button>
                        <button onClick={() => setQuiz1Status("wrong")} className="w-full text-left px-4 py-2 text-sm rounded border border-white/10 hover:bg-white/5">C) Random process.</button>
                      </div>
                      {quiz1Status === "wrong" && <div className="text-red-400 text-xs mt-2 text-left">❌ Incorrect. Think about the order of elements.</div>}
                      {quiz1Status === "correct" && (
                        <div className="mt-4 animate-in fade-in">
                          <div className="text-cyan text-sm mb-4">✅ Linear Search works even when the array is unsorted.</div>
                          <button onClick={() => setStage(6)} className="px-6 py-2 bg-cyan text-black font-bold rounded-lg hover:bg-cyan/90 w-full">Continue to Complexity</button>
                        </div>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-6 text-center">
                    <div className="text-red-500 font-bold text-2xl mb-4 flex items-center justify-center gap-2">
                      <XCircle /> Treasure Not Found
                    </div>
                    <div className="bg-black/50 p-4 rounded-lg text-left space-y-2 font-mono mb-6">
                      <div><span className="text-white/50">Searched for:</span> <span className="text-red-400">{targetKey}</span></div>
                      <div><span className="text-white/50">Return Value:</span> <span className="text-red-400">-1</span></div>
                      <div><span className="text-white/50">Comparisons Made:</span> <span className="text-red-400">{comparisons}</span></div>
                    </div>
                    <button onClick={() => setStage(6)} className="px-6 py-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold rounded-lg w-full">Continue to Complexity</button>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* Stage 6: Complexity Gates */}
        {stage === 6 && (
          <div className="space-y-8 animate-in fade-in duration-700 w-full max-w-3xl mx-auto">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-cyan mb-2 flex items-center justify-center gap-2">
                <Clock className="size-6" /> Time Complexity Visualization
              </h3>
              <p className="text-sm text-white/60 mb-8">Review the three possible scenarios for Linear Search.</p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                
                {/* Best Case */}
                <div className="p-6 rounded-xl border border-mint/30 bg-mint/5 flex flex-col items-center">
                  <div className="size-12 rounded-full bg-mint/20 flex items-center justify-center mb-4">
                    <div className="size-4 rounded-full bg-mint"></div>
                  </div>
                  <div className="font-bold text-lg text-mint mb-1">Best Case</div>
                  <div className="text-sm text-white/60 mb-4 h-10">Target is at index 0</div>
                  <div className="bg-black/50 p-3 rounded w-full text-center text-xs mb-4">
                    🕵️ → 💎
                  </div>
                  <div className="text-mint font-mono font-bold mt-auto text-xl bg-mint/10 px-4 py-1 rounded">O(1)</div>
                </div>

                {/* Average Case */}
                <div className="p-6 rounded-xl border border-yellow-500/30 bg-yellow-500/5 flex flex-col items-center">
                  <div className="size-12 rounded-full bg-yellow-500/20 flex items-center justify-center mb-4">
                    <div className="size-4 rounded-full bg-yellow-500"></div>
                  </div>
                  <div className="font-bold text-lg text-yellow-500 mb-1">Average Case</div>
                  <div className="text-sm text-white/60 mb-4 h-10">Target is somewhere in middle</div>
                  <div className="bg-black/50 p-3 rounded w-full text-center text-xs mb-4 flex items-center justify-center gap-1">
                    🕵️<ArrowRight className="size-3"/>□<ArrowRight className="size-3"/>💎
                  </div>
                  <div className="text-yellow-500 font-mono font-bold mt-auto text-xl bg-yellow-500/10 px-4 py-1 rounded">O(n)</div>
                </div>

                {/* Worst Case */}
                <div className="p-6 rounded-xl border border-red-500/30 bg-red-500/5 flex flex-col items-center">
                  <div className="size-12 rounded-full bg-red-500/20 flex items-center justify-center mb-4">
                    <div className="size-4 rounded-full bg-red-500"></div>
                  </div>
                  <div className="font-bold text-lg text-red-500 mb-1">Worst Case</div>
                  <div className="text-sm text-white/60 mb-4 h-10">Target is missing or at the end</div>
                  <div className="bg-black/50 p-3 rounded w-full text-center text-xs mb-4 flex items-center justify-center gap-1">
                    🕵️<ArrowRight className="size-3"/>□<ArrowRight className="size-3"/>□<ArrowRight className="size-3"/>□
                  </div>
                  <div className="text-red-500 font-mono font-bold mt-auto text-xl bg-red-500/10 px-4 py-1 rounded">O(n)</div>
                </div>

              </div>

              <button onClick={() => setStage(7)} className="mt-8 px-8 py-3 bg-cyan text-black font-bold rounded-lg hover:bg-cyan/90 transition-colors animate-pulse">
                Proceed to Final Challenge
              </button>
            </div>
          </div>
        )}

        {/* Stage 7: Binary vs Linear */}
        {stage === 7 && (
          <div className="flex flex-col items-center animate-in fade-in zoom-in-95 mt-12 w-full max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-cyan mb-2">🧠 Binary vs Linear Search Challenge</h3>
            <p className="text-white/60 mb-8">Two roads appear. Choose wisely!</p>
            
            <div className="bg-black p-6 rounded-xl border border-white/20 w-full mb-8 text-center shadow-2xl">
              <div className="text-white/50 text-sm uppercase tracking-widest mb-4">Scenario</div>
              <div className="text-xl font-bold mb-4">Unsorted Array</div>
              <div className="flex justify-center gap-2 mb-6 font-mono text-cyan/70">
                <div className="px-3 py-1 border border-cyan/20 rounded">25</div>
                <div className="px-3 py-1 border border-cyan/20 rounded">12</div>
                <div className="px-3 py-1 border border-cyan/20 rounded">8</div>
                <div className="px-3 py-1 border border-cyan/20 rounded">45</div>
                <div className="px-3 py-1 border border-cyan/20 rounded">30</div>
                <div className="px-3 py-1 border border-cyan/20 rounded">18</div>
              </div>
              <div className="text-lg">Which Algorithm?</div>
            </div>

            <div className="grid grid-cols-2 gap-6 w-full">
              <button 
                onClick={() => {
                  setAlgoChoice("linear");
                  setTimeout(() => setStage(8), 2000);
                }}
                className={`p-6 rounded-xl border-2 flex flex-col items-center justify-center transition-all ${algoChoice === "linear" ? 'border-cyan bg-cyan/10 scale-105' : 'border-white/20 hover:bg-white/5'}`}
              >
                <Search className="size-8 mb-3 text-cyan" />
                <span className="font-bold text-lg">Linear Search</span>
                {algoChoice === "linear" && (
                  <div className="mt-4 animate-in fade-in text-cyan text-sm">
                    ✅ Correct! Binary Search requires a sorted array.
                  </div>
                )}
              </button>

              <button 
                onClick={() => setAlgoChoice("binary")}
                className={`p-6 rounded-xl border-2 flex flex-col items-center justify-center transition-all ${algoChoice === "binary" ? 'border-red-500 bg-red-500/10' : 'border-white/20 hover:bg-white/5'}`}
              >
                <Binary className="size-8 mb-3 text-white/50" />
                <span className="font-bold text-lg">Binary Search</span>
                {algoChoice === "binary" && (
                  <div className="mt-4 animate-in fade-in text-red-400 text-sm text-center">
                    ❌ Incorrect. Binary search cannot work on unsorted data.
                  </div>
                )}
              </button>
            </div>
          </div>
        )}

        {/* End Screen */}
        {stage === 8 && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in duration-500">
            <div className="bg-[#1e1e1e] border border-white/20 p-8 rounded-2xl max-w-sm w-full text-center shadow-[0_0_30px_rgba(34,211,238,0.2)] animate-in zoom-in-95">
              <h2 className="text-2xl font-bold text-white mb-6 uppercase tracking-widest border-b border-white/10 pb-4 flex items-center justify-center gap-2">
                <Search className="size-5" /> Mission Report
              </h2>
              
              <div className="space-y-4 mb-8 text-left font-mono text-sm bg-black/30 p-4 rounded-lg">
                <div className="flex items-center gap-3 text-mint"><CheckCircle2 className="size-4 shrink-0" /> Started from Index 0</div>
                <div className="flex items-center gap-3 text-mint"><CheckCircle2 className="size-4 shrink-0" /> Compared Sequentially</div>
                <div className="flex items-center gap-3 text-mint"><CheckCircle2 className="size-4 shrink-0" /> Checked All Boxes</div>
                <div className="flex items-center gap-3 text-mint"><CheckCircle2 className="size-4 shrink-0" /> Returned Correct Status</div>
              </div>

              <div className="flex justify-between items-center bg-black/50 p-4 rounded-lg mb-6 text-sm border border-white/5">
                <div className="flex flex-col items-center">
                  <span className="text-white/40 text-xs mb-1">Best Case</span>
                  <span className="text-mint font-bold font-mono">O(1)</span>
                </div>
                <div className="flex flex-col items-center border-l border-r border-white/10 px-4">
                  <span className="text-white/40 text-xs mb-1">Worst Case</span>
                  <span className="text-red-400 font-bold font-mono">O(n)</span>
                </div>
                <div className="flex flex-col items-center">
                  <span className="text-white/40 text-xs mb-1">Space</span>
                  <span className="text-mint font-bold font-mono">O(1)</span>
                </div>
              </div>

              <div className="text-4xl font-bold text-cyan mb-6 drop-shadow-[0_0_10px_rgba(34,211,238,0.5)]">
                100 / 100
              </div>

              <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-4 mb-6">
                <div className="text-xs text-yellow-500/70 uppercase font-bold mb-2 tracking-wider">Badge Earned</div>
                <div className="text-yellow-400 font-bold flex items-center justify-center gap-2 text-lg">
                  <Shield className="size-6" /> SEARCH DETECTIVE
                </div>
              </div>

              <button 
                onClick={() => {
                  setStage(0);
                  setAlgoChoice("none");
                  setComplexityDoor("none");
                  setQuiz1Status("pending");
                }}
                className="w-full py-3 bg-white/10 hover:bg-white/20 rounded-lg text-white font-bold transition-colors border border-white/10"
              >
                Play Again
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
