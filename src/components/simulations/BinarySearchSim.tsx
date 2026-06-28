import { useState, useEffect } from "react";
import { CheckCircle2, Shield, Diamond, Skull, Swords, Zap, XCircle, ArrowRight, Activity, Cpu } from "lucide-react";

export function BinarySearchSim() {
  const [stage, setStage] = useState(1);
  const array = [2, 5, 8, 12, 16, 23, 38, 45];
  const key = 23;

  // Stages 1-5 State
  const [low, setLow] = useState(0);
  const [high, setHigh] = useState(7);
  const [mid, setMid] = useState<number | null>(null);
  const [comparisons, setComparisons] = useState(0);
  const [eliminated, setEliminated] = useState<boolean[]>(Array(8).fill(false));
  const [quiz1Status, setQuiz1Status] = useState<"pending" | "correct" | "wrong">("pending");
  const [showMidCalculation, setShowMidCalculation] = useState(false);

  // Stage 6 State (Wrong World)
  const unsortedArray = [25, 5, 40, 12, 8, 23];
  const [wrongWorldStep, setWrongWorldStep] = useState(0);

  // Stage 7 State (Complexity Race)
  const [raceStep, setRaceStep] = useState(0);

  // Stage 8 State (Final Boss)
  const bossArray = [2, 5, 8, 12, 16, 23, 38, 45];
  const bossKey = 38;
  const [bossLow, setBossLow] = useState<number | string>("");
  const [bossHigh, setBossHigh] = useState<number | string>("");
  const [bossMid, setBossMid] = useState<number | string>("");
  const [bossMessage, setBossMessage] = useState("");
  const [bossFound, setBossFound] = useState(false);
  const [bossActualLow, setBossActualLow] = useState(0);
  const [bossActualHigh, setBossActualHigh] = useState(7);

  const calculateMid = () => {
    setShowMidCalculation(true);
    setTimeout(() => {
      setMid(Math.floor((low + high) / 2));
      setShowMidCalculation(false);
      setStage(3);
    }, 1500);
  };

  const handleChoice = (choice: "left" | "right" | "found") => {
    if (mid === null) return;
    
    setComparisons(c => c + 1);

    if (array[mid] === key && choice === "found") {
      setStage(5);
    } else if (key > array[mid] && choice === "right") {
      // Destroy left half including mid
      const newEliminated = [...eliminated];
      for (let i = low; i <= mid; i++) newEliminated[i] = true;
      setEliminated(newEliminated);
      setLow(mid + 1);
      setMid(null);
      setStage(4);
    } else if (key < array[mid] && choice === "left") {
      // Destroy right half including mid
      const newEliminated = [...eliminated];
      for (let i = mid; i <= high; i++) newEliminated[i] = true;
      setEliminated(newEliminated);
      setHigh(mid - 1);
      setMid(null);
      setStage(4);
    } else {
      // Wrong choice logic (silent fail or shake)
      alert("Incorrect logic. Think about where the target should be in a sorted array.");
    }
  };

  const handleBossSearch = () => {
    if (bossLow === "" || bossHigh === "" || bossMid === "") {
      setBossMessage("Please fill in all fields.");
      return;
    }
    const l = parseInt(bossLow as string);
    const h = parseInt(bossHigh as string);
    const m = parseInt(bossMid as string);

    if (l !== bossActualLow) { setBossMessage("Incorrect LOW value."); return; }
    if (h !== bossActualHigh) { setBossMessage("Incorrect HIGH value."); return; }
    if (m !== Math.floor((l + h) / 2)) { setBossMessage("Incorrect MID calculation."); return; }

    if (bossArray[m] === bossKey) {
      setBossFound(true);
      setBossMessage("CORRECT! Target Found!");
      setTimeout(() => setStage(9), 2000);
    } else if (bossArray[m] < bossKey) {
      setBossActualLow(m + 1);
      setBossLow(""); setBossHigh(""); setBossMid("");
      setBossMessage("Correct! Now update the bounds for the next iteration.");
    } else {
      setBossActualHigh(m - 1);
      setBossLow(""); setBossHigh(""); setBossMid("");
      setBossMessage("Correct! Now update the bounds for the next iteration.");
    }
  };

  return (
    <div className="flex flex-col h-full bg-[#1e1e1e] text-white p-6 overflow-y-auto font-mono">
      {/* Header */}
      <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/10">
        <div>
          <h2 className="text-2xl font-bold text-cyan flex items-center gap-2">
            <Shield className="size-6" /> The Portal Guardian
          </h2>
          <p className="text-white/60 text-sm mt-1">Mission: Destroy half the wrong paths instantly using Binary Search.</p>
        </div>
        <div className="flex gap-2">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(s => (
            <div 
              key={s} 
              className={`size-2.5 rounded-full ${stage >= s ? 'bg-cyan shadow-[0_0_10px_rgba(34,211,238,0.5)]' : 'bg-white/20'}`}
            />
          ))}
        </div>
      </div>

      <div className="flex-1 max-w-4xl mx-auto w-full space-y-8">
        
        {/* Narrator */}
        <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-sm leading-relaxed min-h-[80px]">
          <div className="text-cyan font-bold mb-1">Narrator:</div>
          {stage === 1 && "Binary Search works only because the portals are arranged in order. Notice the ascending sequence!"}
          {stage === 2 && "Initialize the low and high bounds, then fire the magical beam to find the middle portal."}
          {stage === 3 && `Target is ${key}. The middle portal is ${array[mid!]}. Where should we go next?`}
          {stage === 4 && "Half the array is destroyed! Now, calculate the middle again for the remaining portals."}
          {stage === 5 && "Excellent! You eliminated massive chunks of data and found the crystal!"}
          {stage === 6 && "Wait... Suddenly you are pulled into the Wrong World! The portals here are UNSORTED."}
          {stage === 7 && "Let's see why this algorithm is so famous. Welcome to the Complexity Race!"}
          {stage === 8 && "Final Boss Challenge! Take manual control of the pointers and find 38."}
          {stage === 9 && "Mission Complete! You have mastered the ancient art of Divide & Conquer."}
        </div>

        {/* Stages 1 - 5: Core Binary Search Visualization */}
        {stage >= 1 && stage <= 5 && (
          <div className="flex flex-col items-center gap-8 animate-in fade-in duration-700">
            
            {/* Rule / Info */}
            {stage === 1 && (
              <div className="bg-yellow-500/10 border border-yellow-500/50 text-yellow-400 px-6 py-4 rounded-xl flex items-center gap-4 animate-pulse shadow-[0_0_20px_rgba(234,179,8,0.2)]">
                <Zap className="size-8" />
                <div>
                  <div className="font-bold text-lg">⚡ RULE</div>
                  <div>Array must be SORTED.</div>
                </div>
              </div>
            )}
            
            {(stage === 2 || stage === 4) && (
              <div className="bg-black/50 p-4 rounded-lg border border-white/10 text-cyan-400 w-full max-w-md">
                <code>low = {low};<br/>high = {high};</code>
                {showMidCalculation && (
                  <div className="mt-2 text-mint font-bold animate-in fade-in">
                    mid = ({low} + {high}) / 2 = {Math.floor((low+high)/2)}
                  </div>
                )}
              </div>
            )}

            {/* Array Visualization (Live Shrinking Window) */}
            <div className="relative mt-12 mb-8 w-full overflow-x-auto pb-8">
              <div className="flex justify-center min-w-max px-8">
                {array.map((val, idx) => {
                  const isLow = idx === low;
                  const isHigh = idx === high;
                  const isMid = idx === mid;
                  const isEliminated = eliminated[idx];
                  
                  return (
                    <div key={idx} className="relative w-16 mx-1 flex flex-col items-center">
                      {/* Pointers above */}
                      <div className="h-10 mb-2 w-full relative">
                        {isLow && !isEliminated && <div className="absolute left-1/2 -translate-x-1/2 bottom-0 text-cyan text-xs font-bold flex flex-col items-center"><span className="mb-1">LOW</span><ArrowRight className="size-4 rotate-90"/></div>}
                        {isHigh && !isEliminated && <div className="absolute left-1/2 -translate-x-1/2 bottom-0 text-mint text-xs font-bold flex flex-col items-center"><span className="mb-1">HIGH</span><ArrowRight className="size-4 rotate-90"/></div>}
                        {isMid && !isEliminated && <div className="absolute left-1/2 -translate-x-1/2 bottom-0 text-yellow-400 text-xs font-bold flex flex-col items-center"><span className="mb-1">MID</span><ArrowRight className="size-4 rotate-90"/></div>}
                      </div>

                      {/* Box */}
                      <div className={`w-14 h-14 flex items-center justify-center rounded-xl border-2 transition-all duration-700
                        ${isEliminated ? 'bg-black opacity-20 border-white/10 scale-90 grayscale' : 'bg-[#2a2a2a] border-white/20'}
                        ${isMid ? 'bg-yellow-500/20 border-yellow-400 text-yellow-400 shadow-[0_0_20px_rgba(250,204,21,0.5)] scale-110 z-10' : ''}
                        ${stage === 5 && isMid ? 'bg-cyan/20 border-cyan text-cyan shadow-[0_0_30px_rgba(34,211,238,0.8)] scale-125 z-20' : ''}
                      `}>
                        {isEliminated ? <XCircle className="size-6 text-red-500" /> : <span className="text-xl font-bold">{val}</span>}
                      </div>

                      {/* Diamond below if found */}
                      {stage === 5 && isMid && (
                        <div className="absolute -bottom-8 animate-bounce">
                          <Diamond className="size-6 text-cyan fill-cyan" />
                        </div>
                      )}
                      
                      {/* Index below normally */}
                      {!isEliminated && stage !== 5 && <span className="text-xs text-white/40 mt-2 absolute -bottom-6">{idx}</span>}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Actions & Interactive Elements */}
            {stage === 1 && (
              <button onClick={() => setStage(2)} className="px-6 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors border border-white/20 mt-4">
                Initialize Pointers
              </button>
            )}

            {(stage === 2 || stage === 4) && (
              <button onClick={calculateMid} disabled={showMidCalculation} className="px-8 py-3 bg-cyan text-black font-bold rounded-lg hover:bg-cyan/90 transition-colors disabled:opacity-50 mt-4">
                Calculate MID Portal
              </button>
            )}

            {stage === 3 && mid !== null && (
              <div className="bg-black/50 border border-white/10 rounded-xl p-6 w-full max-w-md animate-in zoom-in text-center shadow-2xl">
                <div className="flex justify-between items-center mb-6">
                  <div className="text-left">
                    <div className="text-white/50 text-xs">Target Key</div>
                    <div className="text-2xl font-bold text-cyan">{key}</div>
                  </div>
                  <div className="text-2xl font-mono text-white/40">VS</div>
                  <div className="text-right">
                    <div className="text-white/50 text-xs">Middle Value</div>
                    <div className="text-2xl font-bold text-yellow-400">{array[mid]}</div>
                  </div>
                </div>
                
                <div className="font-mono text-lg mb-6">
                  {key} {key > array[mid] ? '>' : key < array[mid] ? '<' : '=='} {array[mid]} ?
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <button onClick={() => handleChoice("left")} className="py-2 px-1 bg-white/10 hover:bg-white/20 rounded border border-white/20 text-sm font-bold">A) Go Left</button>
                  <button onClick={() => handleChoice("found")} className="py-2 px-1 bg-white/10 hover:bg-white/20 rounded border border-white/20 text-sm font-bold">B) Found</button>
                  <button onClick={() => handleChoice("right")} className="py-2 px-1 bg-white/10 hover:bg-white/20 rounded border border-white/20 text-sm font-bold flex items-center justify-center gap-1"><ArrowRight className="size-4"/> C) Go Right</button>
                </div>
              </div>
            )}

            {stage === 5 && (
              <div className="w-full max-w-md animate-in zoom-in mt-8 space-y-6">
                <div className="bg-cyan/10 border border-cyan/30 rounded-xl p-6 text-center">
                  <div className="text-cyan font-bold text-2xl mb-4 flex items-center justify-center gap-2">
                    <CheckCircle2 /> MATCH FOUND!
                  </div>
                  <div className="bg-black/50 p-4 rounded-lg text-left space-y-2 font-mono">
                    <div><span className="text-white/50">Element Found:</span> <span className="text-cyan">{key}</span></div>
                    <div><span className="text-white/50">Index:</span> <span className="text-cyan">{mid}</span></div>
                    <div><span className="text-white/50">Comparisons:</span> <span className="text-cyan">{comparisons}</span></div>
                    <div><span className="text-white/50">Elements Eliminated:</span> <span className="text-cyan">{eliminated.filter(Boolean).length}</span></div>
                  </div>
                </div>

                <div className="bg-black/50 border border-white/10 rounded-xl p-6">
                  <div className="text-sm text-cyan font-bold mb-4">❓ Mini Challenge: Why could we remove half the portals?</div>
                  <div className="space-y-2">
                    <button onClick={() => setQuiz1Status("correct")} className={`w-full text-left px-4 py-3 text-sm rounded border transition-colors ${quiz1Status === "correct" ? 'border-cyan bg-cyan/20' : 'border-white/10 hover:bg-white/5'}`}>A) Because the array is sorted.</button>
                    <button onClick={() => setQuiz1Status("wrong")} className="w-full text-left px-4 py-3 text-sm rounded border border-white/10 hover:bg-white/5">B) Because Binary Search is magical.</button>
                    <button onClick={() => setQuiz1Status("wrong")} className="w-full text-left px-4 py-3 text-sm rounded border border-white/10 hover:bg-white/5">C) Random chance.</button>
                  </div>
                  {quiz1Status === "wrong" && <div className="text-red-400 text-xs mt-2">❌ Incorrect. Think about Stage 1's rule.</div>}
                  {quiz1Status === "correct" && (
                    <div className="mt-6">
                      <div className="text-cyan text-sm mb-4">✅ Exactly! Sorting guarantees all elements to the left are smaller, and to the right are larger.</div>
                      <button onClick={() => setStage(6)} className="px-6 py-3 bg-cyan text-black font-bold rounded-lg hover:bg-cyan/90 w-full animate-pulse">Enter the Wrong World</button>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Stage 6: Wrong World (Unsorted Array Trap) */}
        {stage === 6 && (
          <div className="flex flex-col items-center gap-8 animate-in zoom-in-95 duration-500 w-full max-w-2xl mx-auto py-8">
            <div className="text-center">
              <h3 className="text-3xl font-bold text-red-500 mb-2 flex items-center justify-center gap-2">
                <Skull className="size-8" /> WRONG WORLD
              </h3>
              <p className="text-red-400/80 mb-8">The portals here are unsorted.</p>
            </div>

            <div className="flex gap-2 mb-8">
              {unsortedArray.map((val, i) => (
                <div key={i} className={`w-14 h-14 flex items-center justify-center rounded-xl border-2 font-bold text-xl transition-all duration-1000
                  ${wrongWorldStep === 2 && i > 2 ? 'bg-black border-red-500/20 text-red-500/20 scale-90' : 'bg-red-500/10 border-red-500/30 text-red-400'}
                  ${wrongWorldStep > 0 && i === 2 ? 'border-yellow-400 text-yellow-400 shadow-[0_0_15px_rgba(250,204,21,0.5)]' : ''}
                `}>
                  {val}
                </div>
              ))}
            </div>

            {wrongWorldStep === 0 && (
              <div className="text-center">
                <p className="mb-6 font-bold">Target Key: 23. Can you use Binary Search here?</p>
                <div className="flex gap-4 justify-center">
                  <button onClick={() => setWrongWorldStep(1)} className="px-8 py-3 bg-red-500 hover:bg-red-600 text-white font-bold rounded-lg transition-colors">YES</button>
                  <button onClick={() => setStage(7)} className="px-8 py-3 bg-mint hover:bg-mint/90 text-black font-bold rounded-lg transition-colors">NO</button>
                </div>
              </div>
            )}

            {wrongWorldStep === 1 && (
              <div className="text-center animate-in fade-in">
                <div className="font-mono text-lg mb-4 text-yellow-400">MID = 40</div>
                <div className="font-mono text-lg mb-6">23 &lt; 40</div>
                <button onClick={() => setWrongWorldStep(2)} className="px-8 py-3 bg-red-500 hover:bg-red-600 text-white font-bold rounded-lg transition-colors animate-pulse">
                  Destroy Right Half
                </button>
              </div>
            )}

            {wrongWorldStep === 2 && (
              <div className="bg-red-500/20 border border-red-500 rounded-xl p-8 text-center max-w-md w-full animate-in zoom-in">
                <Skull className="size-16 text-red-500 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-red-500 mb-2">MISSION FAILED</h3>
                <p className="text-white mb-4">You destroyed the right half, but <strong className="text-xl">23</strong> was actually there at the very end!</p>
                <div className="bg-black/50 p-4 rounded text-sm text-red-400 font-mono mb-6">
                  ⚠ Binary Search requires sorted arrays. Otherwise, valid elements are permanently discarded.
                </div>
                <button onClick={() => setStage(7)} className="px-8 py-3 bg-white/10 hover:bg-white/20 text-white font-bold rounded-lg border border-white/20">
                  I will never forget this.
                </button>
              </div>
            )}
          </div>
        )}

        {/* Stage 7: Complexity Race */}
        {stage === 7 && (
          <div className="flex flex-col items-center gap-8 animate-in fade-in duration-700 w-full max-w-3xl mx-auto py-4">
            <h3 className="text-3xl font-bold text-cyan flex items-center gap-3"><Activity className="size-8"/> Complexity Race</h3>
            
            <div className="w-full space-y-6">
              {/* Linear Track */}
              <div className="bg-black/30 border border-white/10 rounded-xl p-6 relative overflow-hidden">
                <div className="flex justify-between items-center mb-4">
                  <div className="text-lg font-bold text-white/80">Linear Search Runner <span className="text-xl">🏃</span></div>
                  <div className="font-mono text-red-400 font-bold bg-red-500/10 px-3 py-1 rounded">Time: O(n)</div>
                </div>
                <div className="flex gap-2">
                  {[1,2,3,4,5,6,7,8].map(i => (
                    <div key={i} className={`size-8 rounded border ${raceStep >= i ? 'bg-red-500/20 border-red-500 text-red-500' : 'bg-transparent border-white/20'} flex items-center justify-center font-mono text-xs transition-colors duration-200`}>
                      {raceStep === i ? '🏃' : ''}
                    </div>
                  ))}
                </div>
              </div>

              {/* Binary Track */}
              <div className="bg-black/30 border border-white/10 rounded-xl p-6 relative overflow-hidden">
                <div className="flex justify-between items-center mb-4">
                  <div className="text-lg font-bold text-cyan">Binary Search Wizard <span className="text-xl">🧙‍♂️</span></div>
                  <div className="font-mono text-mint font-bold bg-mint/10 px-3 py-1 rounded">Time: O(log n)</div>
                </div>
                <div className="flex gap-2 items-center">
                  <div className={`h-8 w-64 rounded border ${raceStep >= 1 ? 'bg-mint/20 border-mint text-mint' : 'border-white/20'} flex items-center justify-center transition-all duration-300`}>8 elements</div>
                  {raceStep >= 2 && <ArrowRight className="size-4 text-white/40" />}
                  <div className={`h-8 w-32 rounded border ${raceStep >= 2 ? 'bg-mint/20 border-mint text-mint' : 'border-white/20'} flex items-center justify-center opacity-0 animate-in fade-in transition-all duration-300`}>4 elements</div>
                  {raceStep >= 3 && <ArrowRight className="size-4 text-white/40" />}
                  <div className={`h-8 w-16 rounded border ${raceStep >= 3 ? 'bg-mint/20 border-mint text-mint' : 'border-white/20'} flex items-center justify-center opacity-0 animate-in fade-in transition-all duration-300`}>2 elements</div>
                  {raceStep >= 4 && <ArrowRight className="size-4 text-white/40" />}
                  <div className={`h-8 w-8 rounded border ${raceStep >= 4 ? 'bg-mint/20 border-mint text-mint shadow-[0_0_15px_rgba(74,222,128,0.5)]' : 'border-white/20'} flex items-center justify-center opacity-0 animate-in fade-in transition-all duration-300`}>💎</div>
                </div>
              </div>
            </div>

            {raceStep < 8 ? (
              <button 
                onClick={() => {
                  let step = 0;
                  const int = setInterval(() => {
                    step++;
                    setRaceStep(step);
                    if (step >= 8) clearInterval(int);
                  }, 400);
                }} 
                disabled={raceStep > 0}
                className="px-8 py-3 bg-cyan text-black font-bold rounded-lg hover:bg-cyan/90 transition-colors disabled:opacity-50"
              >
                {raceStep === 0 ? "Start Race!" : "Racing..."}
              </button>
            ) : (
              <div className="w-full bg-black/50 border border-white/10 rounded-xl overflow-hidden animate-in zoom-in">
                <table className="w-full text-sm text-left font-mono">
                  <thead className="bg-white/5 border-b border-white/10">
                    <tr>
                      <th className="px-6 py-3">Elements (n)</th>
                      <th className="px-6 py-3 text-red-400">Linear O(n)</th>
                      <th className="px-6 py-3 text-mint">Binary O(log n)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    <tr><td className="px-6 py-3">8</td><td className="px-6 py-3">8 checks</td><td className="px-6 py-3">3 checks</td></tr>
                    <tr><td className="px-6 py-3">16</td><td className="px-6 py-3">16 checks</td><td className="px-6 py-3">4 checks</td></tr>
                    <tr><td className="px-6 py-3">32</td><td className="px-6 py-3">32 checks</td><td className="px-6 py-3">5 checks</td></tr>
                    <tr className="bg-white/5"><td className="px-6 py-3 font-bold">1,024</td><td className="px-6 py-3 text-red-400 font-bold">1,024 checks!</td><td className="px-6 py-3 text-mint font-bold">Only 10 checks!</td></tr>
                    <tr className="bg-white/10"><td className="px-6 py-3 font-bold text-cyan">1,000,000</td><td className="px-6 py-3 text-red-500 font-bold">1,000,000 checks!!</td><td className="px-6 py-3 text-mint font-bold">Only 20 checks!!!</td></tr>
                  </tbody>
                </table>
                <button onClick={() => setStage(8)} className="w-full py-4 bg-cyan text-black font-bold hover:bg-cyan/90 transition-colors">
                  Proceed to Final Boss
                </button>
              </div>
            )}
          </div>
        )}

        {/* Stage 8: Final Boss */}
        {stage === 8 && (
          <div className="flex flex-col items-center gap-8 animate-in zoom-in-95 duration-500 w-full max-w-3xl mx-auto py-4">
            <h3 className="text-3xl font-bold text-yellow-400 flex items-center gap-3"><Swords className="size-8"/> FINAL BOSS CHALLENGE</h3>
            <p className="text-white/80 text-center max-w-xl">Take manual control of the pointers. Calculate the exact indices to find the target. Remember: <code>mid = floor((low + high) / 2)</code>.</p>
            
            <div className="bg-black/50 p-6 rounded-xl border border-white/20 w-full shadow-2xl">
              <div className="flex justify-between items-center mb-6">
                <div className="text-white/50 uppercase tracking-widest text-sm">Target Key: <span className="text-cyan font-bold text-lg">{bossKey}</span></div>
                <div className="text-white/50 text-sm">Iteration Bounds</div>
              </div>
              
              {/* Array Display */}
              <div className="flex justify-center gap-2 mb-8">
                {bossArray.map((val, i) => (
                  <div key={i} className="flex flex-col items-center">
                    <div className={`w-12 h-12 flex items-center justify-center border rounded ${i >= bossActualLow && i <= bossActualHigh ? 'border-cyan bg-cyan/10 text-white font-bold' : 'border-white/10 bg-black text-white/20'}`}>
                      {val}
                    </div>
                    <span className="text-[10px] text-white/40 mt-1">{i}</span>
                  </div>
                ))}
              </div>

              {/* Controls */}
              {!bossFound ? (
                <div className="grid grid-cols-3 gap-6 mb-6">
                  <div>
                    <label className="block text-xs text-white/50 mb-1 text-center">LOW Index</label>
                    <input type="number" value={bossLow} onChange={e => setBossLow(e.target.value)} className="w-full bg-black border border-white/20 rounded py-2 text-center focus:border-cyan focus:outline-none" />
                  </div>
                  <div>
                    <label className="block text-xs text-yellow-400/80 mb-1 text-center">MID Index</label>
                    <input type="number" value={bossMid} onChange={e => setBossMid(e.target.value)} className="w-full bg-black border border-yellow-400/50 rounded py-2 text-center text-yellow-400 font-bold focus:border-yellow-400 focus:outline-none" />
                  </div>
                  <div>
                    <label className="block text-xs text-white/50 mb-1 text-center">HIGH Index</label>
                    <input type="number" value={bossHigh} onChange={e => setBossHigh(e.target.value)} className="w-full bg-black border border-white/20 rounded py-2 text-center focus:border-cyan focus:outline-none" />
                  </div>
                </div>
              ) : (
                <div className="text-center py-8">
                  <Diamond className="size-16 text-cyan fill-cyan mx-auto mb-4 animate-bounce" />
                  <div className="text-2xl font-bold text-cyan">TARGET ELIMINATED!</div>
                </div>
              )}

              {bossMessage && !bossFound && (
                <div className={`text-center mb-6 p-2 rounded ${bossMessage.includes("Correct") ? 'bg-mint/10 text-mint' : 'bg-red-500/10 text-red-400'}`}>
                  {bossMessage}
                </div>
              )}

              {!bossFound && (
                <button onClick={handleBossSearch} className="w-full py-3 bg-yellow-500 hover:bg-yellow-400 text-black font-bold rounded-lg transition-colors flex items-center justify-center gap-2">
                  <Cpu className="size-5"/> EXECUTE SEARCH ITERATION
                </button>
              )}
            </div>
          </div>
        )}

        {/* Stage 9: End Screen */}
        {stage === 9 && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in duration-500">
            <div className="bg-[#1e1e1e] border border-white/20 p-8 rounded-2xl max-w-md w-full text-center shadow-[0_0_40px_rgba(34,211,238,0.3)] animate-in zoom-in-95">
              <h2 className="text-2xl font-bold text-white mb-6 uppercase tracking-widest border-b border-white/10 pb-4 flex items-center justify-center gap-2">
                <Shield className="size-5 text-cyan" /> PORTAL GUARDIAN REPORT
              </h2>
              
              <div className="space-y-3 mb-8 text-left font-mono text-sm bg-black/40 p-5 rounded-xl border border-white/5">
                <div className="flex items-center gap-3 text-mint"><CheckCircle2 className="size-4 shrink-0" /> Array Verified as Sorted</div>
                <div className="flex items-center gap-3 text-mint"><CheckCircle2 className="size-4 shrink-0" /> low, high Initialized</div>
                <div className="flex items-center gap-3 text-mint"><CheckCircle2 className="size-4 shrink-0" /> mid Calculated Correctly</div>
                <div className="flex items-center gap-3 text-mint"><CheckCircle2 className="size-4 shrink-0" /> Half Search Space Eliminated</div>
                <div className="flex items-center gap-3 text-mint"><CheckCircle2 className="size-4 shrink-0" /> Target Located</div>
              </div>

              <div className="flex justify-between items-center bg-black/50 p-4 rounded-lg mb-6 text-sm border border-white/5">
                <div className="flex flex-col items-center">
                  <span className="text-white/40 text-xs mb-1">Best Case</span>
                  <span className="text-mint font-bold font-mono">O(1)</span>
                </div>
                <div className="flex flex-col items-center border-l border-r border-white/10 px-6">
                  <span className="text-white/40 text-xs mb-1">Worst Case</span>
                  <span className="text-cyan font-bold font-mono">O(log n)</span>
                </div>
                <div className="flex flex-col items-center">
                  <span className="text-white/40 text-xs mb-1">Space</span>
                  <span className="text-mint font-bold font-mono">O(1)</span>
                </div>
              </div>

              <div className="text-5xl font-bold text-cyan mb-8 drop-shadow-[0_0_15px_rgba(34,211,238,0.5)]">
                100 <span className="text-2xl text-white/40">/100</span>
              </div>

              <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-5 mb-8 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-yellow-400/10 to-transparent -translate-x-full animate-[shimmer_2s_infinite]"></div>
                <div className="text-xs text-yellow-500/70 uppercase font-bold mb-2 tracking-widest">Badge Unlocked</div>
                <div className="text-yellow-400 font-bold flex items-center justify-center gap-2 text-xl drop-shadow-[0_0_10px_rgba(250,204,21,0.5)]">
                  👑 DIVIDE & CONQUER MASTER
                </div>
              </div>

              <button 
                onClick={() => window.location.reload()}
                className="w-full py-4 bg-white/10 hover:bg-white/20 rounded-lg text-white font-bold transition-colors border border-white/10"
              >
                Return to Kingdom
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
