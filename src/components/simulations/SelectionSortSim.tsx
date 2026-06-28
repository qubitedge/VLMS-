import { useState } from "react";
import { 
  Trophy, ChevronRight, Gem, ArrowRightLeft, Shield, Clock, Search, RotateCcw, 
  Crown, Star, Vault, Crosshair, Flag,
  Swords
} from "lucide-react";

export function SelectionSortSim() {
  const [stage, setStage] = useState(1);
  const [xp, setXp] = useState(0);

  // Initial State: 29 10 14 37 13
  const initialArray = [29, 10, 14, 37, 13];
  const [array, setArray] = useState([...initialArray]);
  
  // State for Selection Sort
  const [pass, setPass] = useState(0); // 0-indexed pass counter
  const [scanIndex, setScanIndex] = useState(0);
  const [minIdx, setMinIdx] = useState(0);
  
  // Gamification tracking
  const [mistakeMessage, setMistakeMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  
  // Stage 5 Prediction
  const [stage5Prediction, setStage5Prediction] = useState<number | null>(null);

  // Time Travel (Stage 6)
  const [timeTravelPass, setTimeTravelPass] = useState(1);
  const [quiz1Answer, setQuiz1Answer] = useState<number | null>(null);
  const [quiz2Answer, setQuiz2Answer] = useState<number | null>(null);
  const [quiz3Answer, setQuiz3Answer] = useState<string | null>(null);

  // Stage 7 (Optimized Arena)
  const [showSelection, setShowSelection] = useState(false);

  // Final Boss
  const [bossArray, setBossArray] = useState([64, 25, 12, 22, 11]);
  const [bossPass, setBossPass] = useState(0);
  const [bossPhase, setBossPhase] = useState<"select_min" | "swap_min">("select_min");
  const [bossSelectedMinIdx, setBossSelectedMinIdx] = useState<number | null>(null);

  // Helper to add XP
  const addXp = (amount: number, reason: string) => {
    setXp(x => x + amount);
    setSuccessMessage(`+${amount} XP: ${reason}`);
    setTimeout(() => setSuccessMessage(""), 3000);
  };

  const setMistake = (msg: string) => {
    setMistakeMessage(msg);
    setTimeout(() => setMistakeMessage(""), 3000);
  };

  // Reset function
  const resetSimulation = () => {
    setStage(1);
    setXp(0);
    setArray([...initialArray]);
    setPass(0);
    setScanIndex(1);
    setMinIdx(0);
    setMistakeMessage("");
    setSuccessMessage("");
    setStage5Prediction(null);
    setTimeTravelPass(1);
    setQuiz1Answer(null);
    setQuiz2Answer(null);
    setQuiz3Answer(null);
    setShowSelection(false);
    setBossArray([64, 25, 12, 22, 11]);
    setBossPass(0);
    setBossPhase("select_min");
    setBossSelectedMinIdx(null);
  };

  // --- STAGE RENDERERS ---

  const renderStage1 = () => (
    <div className="flex flex-col items-center animate-in fade-in zoom-in duration-500">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-primary mb-2 flex items-center justify-center gap-3">
          <Vault className="size-8 text-yellow-500" />
          The King's Treasure Hunt: Selection Sort
        </h2>
        <p className="text-muted-foreground max-w-xl mx-auto">
          The Royal Vault must contain treasures arranged from smallest to largest. 
          You must search the unsorted area, find the minimum treasure, and move it into its rightful vault.
        </p>
      </div>

      <div className="flex justify-center gap-4 mb-12">
        <div className="flex items-center gap-2 border-r-2 border-border pr-4 mr-2">
          {/* Empty Vault slots visualization */}
          <div className="text-sm font-bold text-muted-foreground vertical-text [writing-mode:vertical-rl]">VAULT ZONE</div>
        </div>
        {array.map((val, i) => (
          <div key={i} className="flex flex-col items-center">
            <div className="w-16 h-16 bg-amber-500/20 border-2 border-amber-500/50 rounded-lg flex items-center justify-center shadow-lg relative">
              <Gem className="absolute top-1 right-1 size-3 text-amber-500/50" />
              <span className="text-2xl font-bold text-amber-600 dark:text-amber-400">{val}</span>
            </div>
            <div className="w-20 h-2 bg-muted-foreground/20 rounded-xl mt-2" />
          </div>
        ))}
      </div>

      <button 
        onClick={() => {
          addXp(100, "Treasure Apprentice");
          setStage(2);
          setPass(0);
          setMinIdx(0);
          setScanIndex(1);
        }}
        className="px-8 py-3 bg-primary text-primary-foreground font-bold rounded-xl hover:opacity-90 flex items-center gap-2"
      >
        <Crosshair className="size-5" /> Begin Treasure Hunt
      </button>
    </div>
  );

  const renderStage2 = () => {
    // Stage 2: First pass search
    const currentVal = array[scanIndex];
    const minVal = array[minIdx];
    
    return (
      <div className="flex flex-col items-center animate-in fade-in">
        <div className="text-center mb-6">
          <h3 className="text-xl font-bold text-primary mb-2">First Treasure Search</h3>
          <p className="text-muted-foreground">Selection Sort scans the entire unsorted region before making a decision.</p>
        </div>

        <div className="flex justify-center gap-4 mb-8">
          {array.map((val, i) => {
            const isScanning = i === scanIndex;
            const isMin = i === minIdx;
            
            return (
              <div key={i} className={`flex flex-col items-center transition-all ${isScanning ? 'scale-110 -translate-y-2' : ''}`}>
                {isMin && <Crown className="size-6 text-yellow-500 mb-2 animate-bounce" />}
                {!isMin && <div className="h-8" />}
                
                <div className={`w-16 h-16 rounded-lg flex items-center justify-center border-2 transition-all duration-300
                  ${isScanning ? 'bg-yellow-500/20 border-yellow-500 shadow-[0_0_15px_rgba(234,179,8,0.5)] ring-4 ring-yellow-500/20' : 
                    isMin ? 'bg-amber-500/30 border-amber-500 shadow-md' : 'bg-secondary border-border'}`}>
                  <span className={`text-2xl font-bold ${isMin || isScanning ? 'text-amber-600 dark:text-amber-400' : 'text-foreground'}`}>{val}</span>
                </div>
              </div>
            );
          })}
        </div>

        <div className="bg-card border border-border rounded-xl p-4 mb-8 text-center w-full max-w-sm shadow-md">
          <div className="text-sm text-muted-foreground mb-1">Current Minimum Found</div>
          <div className="text-2xl font-bold text-yellow-500 flex justify-center items-center gap-2">
            <Crown className="size-5" /> {minVal} (Index {minIdx})
          </div>
          {scanIndex < array.length && (
             <div className="mt-4 text-sm font-mono border-t border-border pt-4">
               Scanning: <span className="text-primary">{currentVal}</span>
             </div>
          )}
        </div>

        {scanIndex < array.length ? (
          <button 
            onClick={() => {
              if (array[scanIndex] < array[minIdx]) {
                setMinIdx(scanIndex);
                addXp(50, "New Minimum Found");
              }
              setScanIndex(s => s + 1);
            }}
            className="px-6 py-2 bg-yellow-500/20 text-yellow-600 dark:text-yellow-400 border border-yellow-500 rounded-lg hover:bg-yellow-500/30 flex items-center gap-2"
          >
            <Search className="size-4" /> Scan Next Treasure
          </button>
        ) : (
          <button 
            onClick={() => {
              setStage(3);
            }}
            className="px-6 py-2 bg-primary text-primary-foreground font-bold rounded-lg hover:opacity-90 flex items-center gap-2 animate-in zoom-in"
          >
            <Vault className="size-4" /> Ready to Swap
          </button>
        )}
      </div>
    );
  };

  const renderStage3 = () => (
    <div className="flex flex-col items-center animate-in fade-in slide-in-from-bottom-4">
      <div className="text-center mb-6">
        <h3 className="text-xl font-bold text-primary mb-2">The Royal Swap</h3>
        <p className="text-muted-foreground">Only after finding the minimum element do we perform a swap.</p>
      </div>

      <div className="flex justify-center gap-4 mb-12">
        {array.map((val, i) => {
          const isMin = i === minIdx;
          const isTarget = i === pass;
          
          return (
            <div key={i} className={`flex flex-col items-center transition-all ${(isMin || isTarget) ? 'scale-110' : 'opacity-60'}`}>
              <div className="h-6 flex items-end mb-2">
                {isTarget && <span className="text-xs font-bold text-muted-foreground">Target Slot</span>}
                {isMin && <Crown className="size-5 text-yellow-500 animate-bounce" />}
              </div>
              <div className={`w-16 h-16 rounded-lg flex items-center justify-center border-2 
                ${isTarget ? 'border-dashed border-primary bg-primary/10' : 
                  isMin ? 'bg-amber-500/30 border-amber-500 shadow-[0_0_15px_rgba(234,179,8,0.5)]' : 'bg-secondary border-border'}`}>
                <span className="text-2xl font-bold">{val}</span>
              </div>
            </div>
          );
        })}
      </div>

      <button 
        onClick={() => {
          const newArr = [...array];
          [newArr[pass], newArr[minIdx]] = [newArr[minIdx], newArr[pass]];
          setArray(newArr);
          addXp(200, "First Vault Filled");
          setStage(4);
        }}
        className="px-8 py-3 bg-green-500/20 text-green-600 dark:text-green-400 border border-green-500 font-bold rounded-xl hover:bg-green-500/30 flex items-center gap-2"
      >
        <ArrowRightLeft className="size-5" /> Pull Swap Lever
      </button>
    </div>
  );

  const renderStage4 = () => (
    <div className="flex flex-col items-center animate-in fade-in">
      <div className="text-center mb-6">
        <h3 className="text-xl font-bold text-primary mb-2">Growing Vault Zone</h3>
        <p className="text-muted-foreground">The sorted portion grows left to right after every pass.</p>
      </div>

      <div className="flex justify-center gap-4 mb-8 bg-card p-6 rounded-xl border border-border shadow-lg">
        {array.map((val, i) => {
          const isSorted = i <= pass;
          return (
            <div key={i} className="flex flex-col items-center relative">
              {isSorted && i === pass && (
                <div className="absolute -inset-4 bg-green-500/10 border-2 border-green-500/30 rounded-xl z-0 pointer-events-none animate-in zoom-in" />
              )}
              <div className={`z-10 w-14 h-14 rounded-lg flex items-center justify-center border-2 
                ${isSorted ? 'bg-green-500/20 border-green-500 text-green-600 dark:text-green-400 shadow-md' : 'bg-secondary border-border'}`}>
                <span className="text-xl font-bold">{val}</span>
              </div>
              {isSorted && <Vault className="size-4 text-green-500 mt-2" />}
            </div>
          );
        })}
      </div>

      <button 
        onClick={() => {
          setPass(1);
          setScanIndex(2);
          setMinIdx(1); // Default to first unsorted
          setStage(5);
        }}
        className="px-8 py-3 bg-primary text-primary-foreground font-bold rounded-lg hover:opacity-90 flex items-center gap-2"
      >
        Begin Next Search <ChevronRight className="size-5" />
      </button>
    </div>
  );

  const renderStage5 = () => (
    <div className="flex flex-col items-center animate-in fade-in">
      <div className="text-center mb-6">
        <h3 className="text-xl font-bold text-primary mb-2">Minimum Hunter Mode</h3>
        <p className="text-muted-foreground">Selection Sort remembers only the smallest element found so far in the unsorted zone.</p>
      </div>

      <div className="flex justify-center gap-4 mb-8 bg-card p-6 rounded-xl border border-border shadow-lg w-full max-w-xl">
        {array.map((val, i) => {
          const isSorted = i < pass;
          return (
            <div key={i} className="flex flex-col items-center">
              <div className={`w-14 h-14 rounded-lg flex items-center justify-center border-2 
                ${isSorted ? 'bg-green-500/10 border-green-500/30 text-green-600 dark:text-green-400 opacity-50' : 'bg-secondary border-border cursor-pointer hover:border-primary/50'}
                ${stage5Prediction === val ? 'bg-primary/20 border-primary ring-2 ring-primary/30' : ''}`}
                onClick={() => !isSorted && setStage5Prediction(val)}
              >
                <span className="text-xl font-bold">{val}</span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="bg-secondary/50 p-4 rounded-xl border border-border text-center max-w-md w-full mb-6">
        <h4 className="font-bold mb-2">Predict:</h4>
        <p className="text-sm">Which treasure will become the minimum in this pass?</p>
        <p className="text-xs text-muted-foreground mt-1">(Select a box above)</p>
      </div>

      <button 
        onClick={() => {
          if (stage5Prediction === 13) {
            addXp(100, "Minimum Hunter");
            // Perform pass 2 automatically
            const newArr = [...array];
            [newArr[1], newArr[4]] = [newArr[4], newArr[1]];
            setArray(newArr);
            setPass(2);
            setStage(6);
          } else if (stage5Prediction) {
            setMistake("Incorrect! 13 is the smallest element in the remaining unsorted array [29, 14, 37, 13].");
          } else {
            setMistake("Please select a treasure first.");
          }
        }}
        className="px-6 py-2 bg-primary text-primary-foreground font-bold rounded-lg"
      >
        Confirm Prediction
      </button>
    </div>
  );

  // Precomputed passes for Selection Time Travel
  const selPassHistory = [
    [29, 10, 14, 37, 13], // 0
    [10, 29, 14, 37, 13], // 1
    [10, 13, 14, 37, 29], // 2
    [10, 13, 14, 37, 29], // 3
    [10, 13, 14, 29, 37]  // 4
  ];

  const renderStage6 = () => (
    <div className="flex flex-col items-center animate-in fade-in w-full max-w-2xl mx-auto space-y-8">
      <div className="text-center">
        <h3 className="text-xl font-bold text-primary mb-2 flex items-center justify-center gap-2"><Clock className="size-6" /> Vault Construction Timeline</h3>
        <p className="text-muted-foreground">Notice how exactly ONE position is finalized during every pass.</p>
      </div>

      <div className="bg-card border border-border p-6 rounded-xl w-full shadow-lg">
        <div className="flex justify-between items-center mb-6">
          <span className="font-bold text-muted-foreground">Start</span>
          <span className="font-bold text-muted-foreground">Pass 4</span>
        </div>
        <input 
          type="range" 
          min="0" max="4" 
          value={timeTravelPass}
          onChange={(e) => setTimeTravelPass(parseInt(e.target.value))}
          className="w-full mb-8 accent-primary"
        />
        
        <div className="flex justify-center gap-4">
          {selPassHistory[timeTravelPass].map((val, i) => {
            const isSorted = i < timeTravelPass;
            return (
              <div key={i} className={`w-14 h-14 flex items-center justify-center rounded-lg border-2 ${isSorted ? 'bg-green-500/10 border-green-500/50 text-green-600 dark:text-green-400' : 'bg-secondary border-border'}`}>
                <span className="font-bold text-lg">{val}</span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="w-full grid md:grid-cols-3 gap-4">
        {/* Q1 */}
        <div className="bg-secondary/30 p-4 rounded-xl border border-border">
          <h4 className="font-bold text-sm mb-2">Find the Minimum</h4>
          <p className="text-xs mb-3 text-muted-foreground">[22, 7, 15, 18]</p>
          <div className="flex gap-2 flex-wrap">
            {[22, 7, 15, 18].map(n => (
              <button key={n} onClick={() => setQuiz1Answer(n)} className={`px-2 py-1 text-xs rounded border ${quiz1Answer === n ? 'bg-primary text-primary-foreground' : 'border-border'}`}>{n}</button>
            ))}
          </div>
          {quiz1Answer === 7 && <div className="text-green-500 text-xs mt-2 font-bold">✅ Correct</div>}
        </div>
        
        {/* Q2 */}
        <div className="bg-secondary/30 p-4 rounded-xl border border-border">
          <h4 className="font-bold text-sm mb-2">Identify Sorted Length</h4>
          <p className="text-xs mb-3 text-muted-foreground">[11, 12 | 64, 25, 22]</p>
          <div className="flex gap-2 flex-wrap">
            {[1, 2, 3, 4].map(n => (
              <button key={n} onClick={() => setQuiz2Answer(n)} className={`px-2 py-1 text-xs rounded border ${quiz2Answer === n ? 'bg-primary text-primary-foreground' : 'border-border'}`}>{n}</button>
            ))}
          </div>
          {quiz2Answer === 2 && <div className="text-green-500 text-xs mt-2 font-bold">✅ Correct</div>}
        </div>

        {/* Q3 */}
        <div className="bg-secondary/30 p-4 rounded-xl border border-border">
          <h4 className="font-bold text-sm mb-2">Predict Swap</h4>
          <p className="text-xs mb-3 text-muted-foreground">[11, 25, 12, 22, 64]</p>
          <div className="flex flex-col gap-1">
            {['25↔12', '25↔22', '12↔22'].map(s => (
              <button key={s} onClick={() => setQuiz3Answer(s)} className={`px-2 py-1 text-xs rounded border text-left ${quiz3Answer === s ? 'bg-primary text-primary-foreground' : 'border-border'}`}>{s}</button>
            ))}
          </div>
          {quiz3Answer === '25↔12' && <div className="text-green-500 text-xs mt-2 font-bold">✅ Correct</div>}
        </div>
      </div>

      {quiz1Answer === 7 && quiz2Answer === 2 && quiz3Answer === '25↔12' && (
        <button 
          onClick={() => {
            addXp(300, "Quiz Master");
            setStage(7);
          }}
          className="px-8 py-3 bg-primary text-primary-foreground font-bold rounded-lg animate-in zoom-in w-full"
        >
          Enter the Battle Arena
        </button>
      )}
    </div>
  );

  const renderStage7 = () => (
    <div className="flex flex-col items-center animate-in fade-in w-full max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-primary mb-2 flex items-center justify-center gap-2"><Swords className="size-6" /> Bubble Sort vs Selection Sort Arena</h3>
        <p className="text-muted-foreground">Input: [5, 4, 3, 2, 1] — Which one minimizes swaps?</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 w-full mb-8">
        <div className="bg-card p-6 rounded-xl border border-border text-center shadow-md">
          <h4 className="font-bold text-lg mb-4 text-red-500">Bubble Kingdom</h4>
          <p className="text-sm text-muted-foreground mb-4">Constantly swaps adjacent elements to bubble the largest value up.</p>
          <div className="h-32 flex items-center justify-center border-t border-border mt-4 pt-4">
             <div className="text-center">
               <div className="text-4xl font-mono text-red-500 font-bold mb-1">10 Swaps</div>
               <div className="text-xs text-muted-foreground">10 Comparisons</div>
             </div>
          </div>
        </div>

        <div className="bg-card p-6 rounded-xl border border-border text-center shadow-md relative overflow-hidden">
          <h4 className="font-bold text-lg mb-4 text-amber-500">Selection Kingdom</h4>
          <p className="text-sm text-muted-foreground mb-4">Only the minimum is selected each pass, resulting in at most 1 swap per pass.</p>
          <div className="h-32 flex items-center justify-center border-t border-border mt-4 pt-4">
             <div className="text-center">
               <div className="text-4xl font-mono text-amber-500 font-bold mb-1">2 Swaps</div>
               <div className="text-xs text-muted-foreground">10 Comparisons</div>
             </div>
          </div>
        </div>
      </div>
      
      <div className="bg-primary/10 border border-primary/30 p-4 rounded-lg w-full text-center text-sm font-medium">
        <span className="text-primary font-bold">Key Insight:</span> Selection Sort is highly preferred when writing to memory (swapping) is very slow or expensive!
      </div>

      <button 
        onClick={() => {
          addXp(300, "Algorithm Analyst");
          setStage(8);
        }}
        className="px-8 py-3 bg-primary text-primary-foreground font-bold rounded-lg hover:opacity-90 mt-8"
      >
        Enter The Royal Vault Crisis (Final Boss)
      </button>
    </div>
  );

  const renderStage8 = () => (
    <div className="flex flex-col items-center animate-in fade-in w-full">
      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold text-primary mb-2 flex items-center justify-center gap-2"><Flag className="size-6 text-red-500" /> The Royal Vault Crisis</h3>
        <p className="text-muted-foreground">Perform Selection Sort manually! You must find the minimum in the unsorted zone, then swap.</p>
      </div>

      <div className="flex justify-between items-center w-full max-w-xl bg-secondary/50 p-4 rounded-xl border border-border mb-8">
        <div><span className="text-xs text-muted-foreground">Vault Size (Pass)</span><div className="font-bold text-xl">{bossPass}</div></div>
        <div>
          <span className="text-xs text-muted-foreground">Current Objective</span>
          <div className="font-bold text-primary">
            {bossPhase === "select_min" ? `Find minimum from index ${bossPass} to ${bossArray.length - 1}` : `Swap minimum into index ${bossPass}`}
          </div>
        </div>
      </div>

      <div className="flex justify-center gap-4 mb-10">
        {bossArray.map((val, i) => {
          const isSorted = i < bossPass;
          const isSelected = bossSelectedMinIdx === i;
          const isTarget = i === bossPass && bossPhase === "swap_min";
          
          return (
            <div key={i} className="flex flex-col items-center">
              {isSorted && <Vault className="size-5 text-green-500 mb-2" />}
              {!isSorted && <div className="h-7" />}
              <div 
                onClick={() => {
                  if (isSorted) {
                    setMistake("Guards block you! Sorted elements in the vault are fixed.");
                    return;
                  }
                  if (bossPhase === "select_min") {
                    setBossSelectedMinIdx(i);
                  }
                }}
                className={`w-16 h-16 rounded-lg flex items-center justify-center border-2 transition-all cursor-pointer hover:border-primary/50
                  ${isSorted ? 'bg-green-500/10 border-green-500/50 text-green-600 dark:text-green-400' : 'bg-secondary border-border'}
                  ${isSelected ? 'bg-yellow-500/20 border-yellow-500 ring-4 ring-yellow-500/30' : ''}
                  ${isTarget ? 'border-dashed border-primary bg-primary/10' : ''}
                `}
              >
                <span className="text-xl font-bold">{val}</span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex gap-4">
        {bossPhase === "select_min" && (
          <button 
            onClick={() => {
              if (bossSelectedMinIdx === null) {
                setMistake("Select a treasure first!");
                return;
              }
              // Validate if it is actually the minimum of the unsorted portion
              const unsorted = bossArray.slice(bossPass);
              const actualMin = Math.min(...unsorted);
              if (bossArray[bossSelectedMinIdx] === actualMin) {
                setBossPhase("swap_min");
                addXp(50, "Correct Minimum");
              } else {
                setMistake(`Castle alarm! ${bossArray[bossSelectedMinIdx]} is NOT the minimum. Find the true minimum.`);
              }
            }}
            className="px-8 py-3 bg-yellow-500/20 text-yellow-600 dark:text-yellow-400 border border-yellow-500 rounded-lg hover:bg-yellow-500/30 font-bold"
          >
            Confirm Minimum
          </button>
        )}
        
        {bossPhase === "swap_min" && (
          <button 
            onClick={() => {
              if (bossSelectedMinIdx === null) return;
              const newArr = [...bossArray];
              [newArr[bossPass], newArr[bossSelectedMinIdx]] = [newArr[bossSelectedMinIdx], newArr[bossPass]];
              setBossArray(newArr);
              setBossSelectedMinIdx(null);
              setBossPhase("select_min");
              setBossPass(p => p + 1);
              addXp(50, "Vault Placed");
              
              if (bossPass + 1 >= bossArray.length - 1) {
                // Done!
                setTimeout(() => {
                  addXp(700, "Royal Sortoria Champion");
                  setStage(9);
                }, 500);
              }
            }}
            className="px-8 py-3 bg-primary text-primary-foreground border border-primary font-bold rounded-lg flex items-center gap-2"
          >
            <ArrowRightLeft className="size-5" /> Execute Swap
          </button>
        )}
      </div>
    </div>
  );

  const renderStage9 = () => (
    <div className="flex flex-col items-center text-center animate-in fade-in zoom-in w-full max-w-lg mx-auto">
      <div className="size-24 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mb-6 shadow-[0_0_50px_rgba(34,197,94,0.3)]">
        <Trophy className="size-12" />
      </div>
      <h2 className="text-3xl font-bold text-primary mb-2">The Royal Vault Has Been Organized!</h2>
      <p className="text-muted-foreground mb-8">The kingdom's treasures are perfectly sorted.</p>

      <div className="w-full bg-card border border-border p-6 rounded-2xl shadow-lg mb-8 text-left">
        <h4 className="font-bold mb-4 border-b border-border pb-2">Activity XP</h4>
        <div className="space-y-2 text-sm text-muted-foreground mb-4">
          <div className="flex justify-between"><span>Treasure Hunt</span><span>100 XP</span></div>
          <div className="flex justify-between"><span>Minimum Search</span><span>300 XP</span></div>
          <div className="flex justify-between"><span>Swap Missions</span><span>400 XP</span></div>
          <div className="flex justify-between"><span>Complexity Lab</span><span>300 XP</span></div>
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
    <div className="flex flex-col h-full bg-background text-foreground p-6 overflow-y-auto relative font-sans">
      {/* Header */}
      <div className="flex items-center justify-between mb-8 pb-4 border-b border-border">
        <div>
          <h2 className="text-2xl font-bold text-primary flex items-center gap-2">
            <Vault className="size-6 text-primary" /> Sortoria
          </h2>
        </div>
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2 bg-secondary/50 px-4 py-1.5 rounded-full border border-border font-bold shadow-sm">
            <Star className="size-4 text-yellow-500" /> {xp} XP
          </div>
          <div className="flex gap-1.5">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(s => (
              <div key={s} className={`size-2.5 rounded-full transition-colors ${stage >= s ? 'bg-primary shadow-[0_0_8px_rgba(var(--primary),0.5)]' : 'bg-muted'}`} />
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
        {stage === 9 && renderStage9()}
      </div>
    </div>
  );
}
