import { useState, useEffect } from "react";
import { 
  Trophy, ChevronRight, Swords, ArrowRightLeft, Shield, Clock, Search, RotateCcw, Medal, Crown, Star,
  CheckCircle2
} from "lucide-react";

export function BubbleSortSim() {
  const [stage, setStage] = useState(1);
  const [xp, setXp] = useState(0);

  // Initial State: 64 34 25 12 22
  const initialArray = [64, 34, 25, 12, 22];
  const [array, setArray] = useState([...initialArray]);
  
  // State for Pass & Comparison
  const [pass, setPass] = useState(1);
  const [cmpIndex, setCmpIndex] = useState(0);
  
  // Gamification tracking
  const [mistakeMessage, setMistakeMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  
  // Time Travel (Stage 5)
  const [timeTravelPass, setTimeTravelPass] = useState(1);
  const [quiz1Answer, setQuiz1Answer] = useState<string | null>(null);
  const [quiz2Answer, setQuiz2Answer] = useState<string | null>(null);

  // Stage 6 (Optimized Arena)
  const [optimizedMode, setOptimizedMode] = useState(false);
  const [optComparisons, setOptComparisons] = useState(0);

  // Final Boss
  const [bossArray, setBossArray] = useState([8, 5, 3, 9, 1, 4]);
  const [bossCmpIndex, setBossCmpIndex] = useState(0);
  const [bossPass, setBossPass] = useState(1);
  const [bossSwapsInPass, setBossSwapsInPass] = useState(0);

  // Helper to add XP
  const addXp = (amount: number, reason: string) => {
    setXp(x => x + amount);
    setSuccessMessage(`+${amount} XP: ${reason}`);
    setTimeout(() => setSuccessMessage(""), 3000);
  };

  // Reset function
  const resetSimulation = () => {
    setStage(1);
    setXp(0);
    setArray([...initialArray]);
    setPass(1);
    setCmpIndex(0);
    setMistakeMessage("");
    setSuccessMessage("");
    setTimeTravelPass(1);
    setQuiz1Answer(null);
    setQuiz2Answer(null);
    setOptimizedMode(false);
    setBossArray([8, 5, 3, 9, 1, 4]);
    setBossCmpIndex(0);
    setBossPass(1);
    setBossSwapsInPass(0);
  };

  // --- STAGE RENDERERS ---

  const renderStage1 = () => (
    <div className="flex flex-col items-center animate-in fade-in zoom-in duration-500">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-primary mb-2 flex items-center justify-center gap-3">
          <Crown className="size-8 text-yellow-500" />
          Bubble Kingdom: The Great Sorting Tournament
        </h2>
        <p className="text-muted-foreground max-w-xl mx-auto">
          The kingdom requires warriors to stand from weakest to strongest. 
          Your task is to compare neighboring warriors and swap them whenever they are out of order.
        </p>
      </div>

      <div className="flex justify-center gap-4 mb-12">
        {array.map((val, i) => (
          <div key={i} className="flex flex-col items-center">
            <div className="w-16 h-20 bg-secondary/50 border-2 border-border rounded-t-full flex items-center justify-center shadow-lg relative">
              <span className="text-2xl font-bold">{val}</span>
            </div>
            <div className="w-20 h-4 bg-muted-foreground/20 rounded-b-xl mt-1" />
          </div>
        ))}
      </div>

      <button 
        onClick={() => {
          addXp(100, "Bubble Recruit");
          setStage(2);
        }}
        className="px-8 py-3 bg-primary text-primary-foreground font-bold rounded-xl hover:opacity-90 flex items-center gap-2"
      >
        <Swords className="size-5" /> Start Tournament
      </button>
    </div>
  );

  const renderStage2 = () => (
    <div className="flex flex-col items-center animate-in fade-in slide-in-from-bottom-4">
      <div className="text-center mb-6">
        <h3 className="text-xl font-bold text-primary mb-2">Round 1: The First Clash</h3>
        <p className="text-muted-foreground">Bubble Sort only compares neighboring elements. Compare 64 and 34.</p>
      </div>

      <div className="flex justify-center gap-4 mb-8">
        {array.map((val, i) => {
          const isComparing = i === 0 || i === 1;
          return (
            <div key={i} className={`flex flex-col items-center transition-all ${isComparing ? 'scale-110 -translate-y-2' : 'opacity-60'}`}>
              <div className={`w-16 h-20 rounded-t-full flex items-center justify-center border-2 ${isComparing ? 'bg-primary/20 border-primary shadow-[0_0_15px_rgba(var(--primary),0.5)]' : 'bg-secondary/50 border-border'}`}>
                <span className="text-2xl font-bold">{val}</span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex gap-4">
        <button 
          onClick={() => {
            const newArr = [...array];
            [newArr[0], newArr[1]] = [newArr[1], newArr[0]];
            setArray(newArr);
            addXp(50, "Correct Comparison");
            setCmpIndex(1);
            setStage(3);
          }}
          className="px-6 py-2 bg-green-500/20 text-green-600 dark:text-green-400 border border-green-500 rounded-lg hover:bg-green-500/30 flex items-center gap-2"
        >
          <ArrowRightLeft className="size-4" /> Swap
        </button>
        <button 
          onClick={() => {
            setMistakeMessage("64 is greater than 34, so they MUST be swapped to stand in ascending order!");
            setTimeout(() => setMistakeMessage(""), 3000);
          }}
          className="px-6 py-2 bg-red-500/20 text-red-600 dark:text-red-400 border border-red-500 rounded-lg hover:bg-red-500/30 flex items-center gap-2"
        >
          <Shield className="size-4" /> Don't Swap
        </button>
      </div>
    </div>
  );

  const renderStage3 = () => (
    <div className="flex flex-col items-center animate-in fade-in">
      <div className="text-center mb-6">
        <h3 className="text-xl font-bold text-primary mb-2">Bubble Path Challenge</h3>
        <p className="text-muted-foreground">Larger values slowly rise toward the end like air bubbles in water.</p>
      </div>

      <div className="flex justify-center gap-4 mb-8 relative">
        {array.map((val, i) => {
          const isComparing = i === cmpIndex || i === cmpIndex + 1;
          return (
            <div key={i} className={`flex flex-col items-center transition-all ${isComparing ? 'scale-110 -translate-y-2' : ''}`}>
              <div className={`w-16 h-20 rounded-t-full flex items-center justify-center border-2 ${isComparing ? 'bg-primary/20 border-primary' : 'bg-secondary/50 border-border'}`}>
                <span className="text-2xl font-bold">{val}</span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex gap-4">
        <button 
          onClick={() => {
            if (array[cmpIndex] > array[cmpIndex + 1]) {
              const newArr = [...array];
              [newArr[cmpIndex], newArr[cmpIndex + 1]] = [newArr[cmpIndex + 1], newArr[cmpIndex]];
              setArray(newArr);
              if (cmpIndex + 1 === array.length - 1) {
                addXp(250, "Pass 1 Complete");
                setStage(4);
              } else {
                setCmpIndex(c => c + 1);
              }
            } else {
              setMistakeMessage(`Wait, ${array[cmpIndex]} is not greater than ${array[cmpIndex + 1]}.`);
              setTimeout(() => setMistakeMessage(""), 3000);
            }
          }}
          className="px-6 py-2 bg-green-500/20 text-green-600 dark:text-green-400 border border-green-500 rounded-lg hover:bg-green-500/30"
        >
          <ArrowRightLeft className="size-4 inline mr-2" /> Swap
        </button>
        <button 
          onClick={() => {
            if (array[cmpIndex] <= array[cmpIndex + 1]) {
              if (cmpIndex + 1 === array.length - 1) {
                addXp(250, "Pass 1 Complete");
                setStage(4);
              } else {
                setCmpIndex(c => c + 1);
              }
            } else {
              setMistakeMessage(`They are out of order! ${array[cmpIndex]} > ${array[cmpIndex+1]}. You must swap!`);
              setTimeout(() => setMistakeMessage(""), 3000);
            }
          }}
          className="px-6 py-2 bg-blue-500/20 text-blue-600 dark:text-blue-400 border border-blue-500 rounded-lg hover:bg-blue-500/30"
        >
          <Shield className="size-4 inline mr-2" /> Don't Swap
        </button>
      </div>
    </div>
  );

  const renderStage4 = () => (
    <div className="flex flex-col items-center animate-in fade-in">
      <div className="text-center mb-6">
        <h3 className="text-xl font-bold text-primary mb-2">Royal Pass Tracker</h3>
        <p className="text-muted-foreground">After every pass, one more element reaches its final sorted position.</p>
      </div>

      <div className="bg-card border border-border rounded-xl p-6 mb-8 w-full max-w-md text-center shadow-lg">
        <h4 className="text-green-500 font-bold text-lg mb-2 flex items-center justify-center gap-2">
          <CheckCircle2 className="size-5" /> Pass 1 Complete
        </h4>
        <p className="text-sm text-muted-foreground mb-4">{array[array.length - 1]} is now Locked in place.</p>
        
        <div className="flex justify-center gap-4">
          {array.map((val, i) => {
            const isLocked = i === array.length - 1;
            return (
              <div key={i} className="flex flex-col items-center">
                {isLocked && <Crown className="size-6 text-yellow-500 mb-1 animate-bounce" />}
                <div className={`w-14 h-14 rounded flex items-center justify-center border ${isLocked ? 'bg-green-500/20 border-green-500 text-green-600 dark:text-green-400' : 'bg-secondary border-border'}`}>
                  <span className="text-xl font-bold">{val}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <button 
        onClick={() => setStage(5)}
        className="px-8 py-3 bg-primary text-primary-foreground font-bold rounded-lg hover:opacity-90 flex items-center gap-2"
      >
        Enter Time Travel Chamber <ChevronRight className="size-5" />
      </button>
    </div>
  );

  // Precomputed passes for Time Travel
  const passHistory = [
    [64, 34, 25, 12, 22],
    [34, 25, 12, 22, 64],
    [25, 12, 22, 34, 64],
    [12, 22, 25, 34, 64],
    [12, 22, 25, 34, 64] // fully sorted
  ];

  const renderStage5 = () => (
    <div className="flex flex-col items-center animate-in fade-in w-full max-w-2xl mx-auto space-y-8">
      <div className="text-center">
        <h3 className="text-xl font-bold text-primary mb-2 flex items-center justify-center gap-2"><Clock className="size-6" /> Time Travel Sorting Chamber</h3>
        <p className="text-muted-foreground">Observe how each pass reduces the unsorted portion.</p>
      </div>

      <div className="bg-card border border-border p-6 rounded-xl w-full shadow-lg">
        <div className="flex justify-between items-center mb-6">
          <span className="font-bold text-muted-foreground">Pass 1</span>
          <span className="font-bold text-muted-foreground">Pass 4</span>
        </div>
        <input 
          type="range" 
          min="1" max="4" 
          value={timeTravelPass}
          onChange={(e) => setTimeTravelPass(parseInt(e.target.value))}
          className="w-full mb-8 accent-primary"
        />
        
        <div className="flex justify-center gap-4">
          {passHistory[timeTravelPass].map((val, i) => {
            const isLocked = i >= (5 - timeTravelPass);
            return (
              <div key={i} className={`w-14 h-14 flex items-center justify-center rounded border ${isLocked ? 'bg-green-500/10 border-green-500/30 text-green-600 dark:text-green-400' : 'bg-secondary border-border'}`}>
                <span className="font-bold">{val}</span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="w-full grid md:grid-cols-2 gap-4">
        <div className="bg-secondary/30 p-4 rounded-xl border border-border">
          <h4 className="font-bold mb-2">Mini Challenge 1</h4>
          <p className="text-sm mb-3">Will Bubble Sort swap 34 and 22 in Pass 2?</p>
          <div className="flex gap-2">
            <button onClick={() => setQuiz1Answer('yes')} className={`px-4 py-1 text-sm rounded border ${quiz1Answer === 'yes' ? 'bg-primary text-primary-foreground' : 'border-border'}`}>Yes</button>
            <button onClick={() => setQuiz1Answer('no')} className={`px-4 py-1 text-sm rounded border ${quiz1Answer === 'no' ? 'bg-primary text-primary-foreground' : 'border-border'}`}>No</button>
          </div>
          {quiz1Answer === 'yes' && <div className="text-green-500 text-xs mt-2 font-bold">✅ Correct!</div>}
          {quiz1Answer === 'no' && <div className="text-red-500 text-xs mt-2 font-bold">❌ 34 &gt; 22, so it will swap.</div>}
        </div>
        <div className="bg-secondary/30 p-4 rounded-xl border border-border">
          <h4 className="font-bold mb-2">Mini Challenge 2</h4>
          <p className="text-sm mb-3">Which pass results in [25, 12, 22, 34, 64]?</p>
          <div className="flex gap-2 flex-wrap">
            {['Pass 1', 'Pass 2', 'Pass 3'].map(p => (
              <button 
                key={p} onClick={() => setQuiz2Answer(p)} 
                className={`px-3 py-1 text-sm rounded border ${quiz2Answer === p ? 'bg-primary text-primary-foreground' : 'border-border'}`}
              >
                {p}
              </button>
            ))}
          </div>
          {quiz2Answer === 'Pass 2' && <div className="text-green-500 text-xs mt-2 font-bold">✅ Correct!</div>}
          {quiz2Answer && quiz2Answer !== 'Pass 2' && <div className="text-red-500 text-xs mt-2 font-bold">❌ Check the timeline above.</div>}
        </div>
      </div>

      {quiz1Answer === 'yes' && quiz2Answer === 'Pass 2' && (
        <button 
          onClick={() => {
            addXp(200, "Sorting Observer");
            setStage(6);
          }}
          className="px-8 py-3 bg-primary text-primary-foreground font-bold rounded-lg animate-in zoom-in"
        >
          Proceed to Optimization
        </button>
      )}
    </div>
  );

  const renderStage6 = () => (
    <div className="flex flex-col items-center animate-in fade-in w-full max-w-3xl mx-auto">
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-primary mb-2 flex items-center justify-center gap-2"><Star className="size-6" /> Optimized Bubble Sort Arena</h3>
        <p className="text-muted-foreground">What happens when the array is already sorted? (1 2 3 4 5)</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 w-full mb-8">
        <div className="bg-card p-6 rounded-xl border border-border text-center shadow-md">
          <h4 className="font-bold text-lg mb-4 text-red-500">Standard Bubble Sort</h4>
          <div className="flex justify-center gap-2 mb-4">
            {[1,2,3,4,5].map(n => <div key={n} className="w-8 h-8 rounded bg-secondary flex items-center justify-center">{n}</div>)}
          </div>
          <p className="text-sm text-muted-foreground mb-4">Performs all passes blindly, doing O(n²) comparisons even if sorted.</p>
          <div className="text-xl font-mono text-red-500 font-bold">10 Comparisons</div>
        </div>

        <div className="bg-card p-6 rounded-xl border border-border text-center shadow-md relative overflow-hidden">
          <h4 className="font-bold text-lg mb-4 text-green-500">Optimized Bubble Sort</h4>
          <div className="flex justify-center gap-2 mb-4">
            {[1,2,3,4,5].map(n => <div key={n} className="w-8 h-8 rounded bg-secondary flex items-center justify-center">{n}</div>)}
          </div>
          <p className="text-sm text-muted-foreground mb-4">Uses a 'swapped' flag. If no swap occurs in a pass, it stops early.</p>
          <div className="text-xl font-mono text-green-500 font-bold">4 Comparisons</div>
        </div>
      </div>

      <button 
        onClick={() => {
          addXp(300, "Optimization Master");
          setStage(7);
        }}
        className="px-8 py-3 bg-primary text-primary-foreground font-bold rounded-lg hover:opacity-90 mt-4"
      >
        Enter the Final Boss Challenge
      </button>
    </div>
  );

  const renderStage7 = () => (
    <div className="flex flex-col items-center animate-in fade-in w-full">
      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold text-primary mb-2 flex items-center justify-center gap-2"><Swords className="size-6 text-red-500" /> The Grand Sorting Championship</h3>
        <p className="text-muted-foreground">Perform Bubble Sort on the array manually. Earn crowns for each pass!</p>
      </div>

      <div className="flex justify-between items-center w-full max-w-md bg-secondary/50 p-4 rounded-xl border border-border mb-8">
        <div><span className="text-xs text-muted-foreground">Pass</span><div className="font-bold text-xl">{bossPass}</div></div>
        <div><span className="text-xs text-muted-foreground">Compare</span><div className="font-bold text-xl text-primary">{bossArray[bossCmpIndex]} vs {bossArray[bossCmpIndex+1]}</div></div>
        <div><span className="text-xs text-muted-foreground">Swaps this Pass</span><div className="font-bold text-xl">{bossSwapsInPass}</div></div>
      </div>

      <div className="flex justify-center gap-3 mb-10">
        {bossArray.map((val, i) => {
          const isComparing = i === bossCmpIndex || i === bossCmpIndex + 1;
          const isLocked = i >= bossArray.length - bossPass + 1;
          return (
            <div key={i} className={`flex flex-col items-center transition-all ${isComparing ? 'scale-110 -translate-y-2' : ''}`}>
              {isLocked && <Crown className="size-5 text-yellow-500 mb-1" />}
              <div className={`w-14 h-16 rounded flex items-center justify-center border-2 ${isComparing ? 'bg-primary/20 border-primary shadow-md' : isLocked ? 'bg-green-500/10 border-green-500/30' : 'bg-secondary border-border'}`}>
                <span className="text-xl font-bold">{val}</span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex gap-4">
        <button 
          onClick={() => {
            if (bossArray[bossCmpIndex] > bossArray[bossCmpIndex + 1]) {
              const newArr = [...bossArray];
              [newArr[bossCmpIndex], newArr[bossCmpIndex + 1]] = [newArr[bossCmpIndex + 1], newArr[bossCmpIndex]];
              setBossArray(newArr);
              setBossSwapsInPass(s => s + 1);
              
              if (bossCmpIndex + 1 >= bossArray.length - bossPass) {
                // End of pass
                if (bossSwapsInPass + 1 === 0) {
                   // Fully sorted! But wait, swaps is > 0 here.
                }
                setBossPass(p => p + 1);
                setBossCmpIndex(0);
                setBossSwapsInPass(0);
              } else {
                setBossCmpIndex(c => c + 1);
              }
            } else {
              setMistakeMessage("Incorrect! The left element is NOT greater. Do not swap.");
              setTimeout(() => setMistakeMessage(""), 3000);
            }
          }}
          className="px-6 py-2 bg-green-500/20 text-green-600 dark:text-green-400 border border-green-500 rounded-lg hover:bg-green-500/30 flex items-center gap-2"
        >
          <ArrowRightLeft className="size-4" /> Swap
        </button>
        <button 
          onClick={() => {
            if (bossArray[bossCmpIndex] <= bossArray[bossCmpIndex + 1]) {
              if (bossCmpIndex + 1 >= bossArray.length - bossPass) {
                // End of pass
                if (bossSwapsInPass === 0) {
                  // Optimization: No swaps in pass! Done!
                  addXp(700, "Arrayland Champion");
                  setStage(8);
                  return;
                }
                setBossPass(p => p + 1);
                setBossCmpIndex(0);
                setBossSwapsInPass(0);
              } else {
                setBossCmpIndex(c => c + 1);
              }
            } else {
              setMistakeMessage("Incorrect! The left element is greater. You MUST swap.");
              setTimeout(() => setMistakeMessage(""), 3000);
            }
          }}
          className="px-6 py-2 bg-blue-500/20 text-blue-600 dark:text-blue-400 border border-blue-500 rounded-lg hover:bg-blue-500/30 flex items-center gap-2"
        >
          <Shield className="size-4" /> Keep
        </button>
      </div>
      
      {bossPass >= bossArray.length && (
         <div className="mt-8 animate-in fade-in">
           <button onClick={() => { addXp(700, "Arrayland Champion"); setStage(8); }} className="px-6 py-2 bg-primary text-primary-foreground font-bold rounded">Finish</button>
         </div>
      )}
    </div>
  );

  const renderStage8 = () => (
    <div className="flex flex-col items-center text-center animate-in fade-in zoom-in w-full max-w-lg mx-auto">
      <div className="size-24 bg-yellow-500/20 text-yellow-500 rounded-full flex items-center justify-center mb-6 shadow-[0_0_50px_rgba(234,179,8,0.3)]">
        <Trophy className="size-12" />
      </div>
      <h2 className="text-3xl font-bold text-primary mb-2">Mission Accomplished!</h2>
      <p className="text-muted-foreground mb-8">You restored order to Arrayland.</p>

      <div className="w-full bg-card border border-border p-6 rounded-2xl shadow-lg mb-8 text-left">
        <h4 className="font-bold mb-4 border-b border-border pb-2">Activity XP</h4>
        <div className="space-y-2 text-sm text-muted-foreground mb-4">
          <div className="flex justify-between"><span>Tournament Start</span><span>100 XP</span></div>
          <div className="flex justify-between"><span>Pass Challenges</span><span>500 XP</span></div>
          <div className="flex justify-between"><span>Optimization Arena</span><span>300 XP</span></div>
          <div className="flex justify-between"><span>Complexity Lab</span><span>200 XP</span></div>
          <div className="flex justify-between"><span>Final Boss</span><span>700 XP</span></div>
        </div>
        <div className="flex justify-between font-bold text-lg text-primary border-t border-border pt-4">
          <span>Total Score</span>
          <span className="flex items-center gap-1"><Star className="size-5 text-yellow-500" /> {xp} XP</span>
        </div>
      </div>

      <button onClick={resetSimulation} className="px-8 py-3 bg-secondary text-secondary-foreground border border-border font-bold rounded-lg hover:bg-secondary/80 flex items-center gap-2">
        <RotateCcw className="size-4" /> Play Again
      </button>
    </div>
  );

  return (
    <div className="flex flex-col h-full bg-background text-foreground p-6 overflow-y-auto relative">
      {/* Header */}
      <div className="flex items-center justify-between mb-8 pb-4 border-b border-border">
        <div>
          <h2 className="text-2xl font-bold text-primary flex items-center gap-2">
            <Medal className="size-6 text-primary" /> Arrayland
          </h2>
        </div>
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2 bg-secondary/50 px-4 py-1.5 rounded-full border border-border font-bold">
            <Star className="size-4 text-yellow-500" /> {xp} XP
          </div>
          <div className="flex gap-1.5">
            {[1, 2, 3, 4, 5, 6, 7, 8].map(s => (
              <div key={s} className={`size-2.5 rounded-full ${stage >= s ? 'bg-primary' : 'bg-muted'}`} />
            ))}
          </div>
        </div>
      </div>

      <div className="flex-1 w-full max-w-4xl mx-auto">
        {/* Floating Messages */}
        {mistakeMessage && (
          <div className="fixed top-24 left-1/2 -translate-x-1/2 bg-red-500 text-white px-6 py-3 rounded-lg shadow-xl animate-in slide-in-from-top-10 z-50 font-medium">
            {mistakeMessage}
          </div>
        )}
        {successMessage && (
          <div className="fixed top-24 left-1/2 -translate-x-1/2 bg-green-500 text-white px-6 py-3 rounded-lg shadow-xl animate-in slide-in-from-top-10 z-50 font-bold flex items-center gap-2">
            <Star className="size-5" /> {successMessage}
          </div>
        )}

        {stage === 1 && renderStage1()}
        {stage === 2 && renderStage2()}
        {stage === 3 && renderStage3()}
        {stage === 4 && renderStage4()}
        {stage === 5 && renderStage5()}
        {stage === 6 && renderStage6()}
        {stage === 7 && renderStage7()}
        {stage === 8 && renderStage8()}
      </div>
    </div>
  );
}
