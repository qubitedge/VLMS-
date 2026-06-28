import { useState } from "react";
import { 
  Trophy, ChevronRight, PlaySquare, ArrowRight, Shield, Clock, Search, RotateCcw, 
  Crown, Star, Vault, Wand2, Hexagon, Crosshair, ArrowDownToLine, MoveRight,
  Gem
} from "lucide-react";

export function InsertionSortSim() {
  const [stage, setStage] = useState(1);
  const [xp, setXp] = useState(0);

  // Initial State: 12 11 13 5 6
  const initialArray = [12, 11, 13, 5, 6];
  const [array, setArray] = useState([...initialArray]);
  
  // State for Insertion Sort Visualization
  const [pass, setPass] = useState(1); // 1-indexed pass counter (element to insert)
  const [shiftIndex, setShiftIndex] = useState(0);
  const [keyVal, setKeyVal] = useState<number | null>(null);
  
  // Gamification tracking
  const [mistakeMessage, setMistakeMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // Stage 5 Prediction
  const [stage5Prediction, setStage5Prediction] = useState<boolean | null>(null);

  // Time Travel & Quizzes (Stage 6)
  const [timeTravelPass, setTimeTravelPass] = useState(0);
  const [quiz1Answer, setQuiz1Answer] = useState<number | null>(null);
  const [quiz2Answer, setQuiz2Answer] = useState<string | null>(null);
  const [quiz3Answer, setQuiz3Answer] = useState<boolean>(false);

  // Final Boss
  const [bossArray, setBossArray] = useState([9, 3, 7, 1, 5]);
  const [bossPass, setBossPass] = useState(1);
  const [bossKey, setBossKey] = useState<number | null>(null);
  const [bossCompareIdx, setBossCompareIdx] = useState<number | null>(null);
  const [bossPhase, setBossPhase] = useState<"pick" | "shift" | "insert">("pick");

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
    setPass(1);
    setShiftIndex(0);
    setKeyVal(null);
    setMistakeMessage("");
    setSuccessMessage("");
    setStage5Prediction(null);
    setTimeTravelPass(0);
    setQuiz1Answer(null);
    setQuiz2Answer(null);
    setQuiz3Answer(false);
    setBossArray([9, 3, 7, 1, 5]);
    setBossPass(1);
    setBossKey(null);
    setBossCompareIdx(null);
    setBossPhase("pick");
  };

  // --- STAGE RENDERERS ---

  const renderStage1 = () => (
    <div className="flex flex-col items-center animate-in fade-in zoom-in duration-500">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-primary mb-2 flex items-center justify-center gap-3">
          <Wand2 className="size-8 text-indigo-500" />
          Master Card Academy: Insertion Sort
        </h2>
        <p className="text-muted-foreground max-w-xl mx-auto">
          A magical deck of cards has become disorganized. Insertion Sort assumes the first card is already sorted. We will pick cards one by one and insert them into their correct positions.
        </p>
      </div>

      <div className="flex justify-center gap-3 mb-12">
        <div className="flex items-center gap-2 border-r-2 border-primary/50 pr-4 mr-2">
          {/* Sorted Zone indicator */}
          <div className="text-sm font-bold text-primary vertical-text [writing-mode:vertical-rl]">SORTED ZONE</div>
        </div>
        {array.map((val, i) => (
          <div key={i} className="flex flex-col items-center">
            <div className={`w-16 h-24 rounded-lg flex items-center justify-center border-2 shadow-lg relative bg-card
              ${i === 0 ? 'border-primary shadow-[0_0_15px_rgba(var(--primary),0.5)]' : 'border-border'}`}>
              <div className="absolute top-2 left-2 text-xs font-bold text-muted-foreground">{val}</div>
              <span className={`text-3xl font-bold ${i === 0 ? 'text-primary' : 'text-foreground'}`}>{val}</span>
              <div className="absolute bottom-2 right-2 text-xs font-bold text-muted-foreground rotate-180">{val}</div>
            </div>
            {i === 0 && <div className="w-16 h-2 bg-primary/50 rounded-xl mt-3 blur-[2px]" />}
          </div>
        ))}
      </div>

      <button 
        onClick={() => {
          addXp(100, "Card Apprentice");
          setStage(2);
        }}
        className="px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl flex items-center gap-2 shadow-lg"
      >
        <PlaySquare className="size-5" /> Begin Training
      </button>
    </div>
  );

  const renderStage2 = () => {
    return (
      <div className="flex flex-col items-center animate-in fade-in">
        <div className="text-center mb-6">
          <h3 className="text-xl font-bold text-primary mb-2">Pick the Key Card</h3>
          <p className="text-muted-foreground">The first unsorted element is our Key. It must be placed correctly in the sorted zone.</p>
        </div>

        <div className="flex justify-center gap-3 mb-16 relative">
          <div className="absolute -left-6 top-1/2 -translate-y-1/2 w-1 border-r-2 border-primary/50 h-32" />
          
          {array.map((val, i) => {
            const isSorted = i < 1;
            const isKey = i === 1;
            
            return (
              <div key={i} className={`flex flex-col items-center relative transition-all duration-700 ${isKey && keyVal !== null ? '-translate-y-16' : ''}`}>
                <div className={`w-16 h-24 rounded-lg flex items-center justify-center border-2 bg-card relative
                  ${isSorted ? 'border-primary/50' : 'border-border'}
                  ${isKey ? 'border-yellow-500 shadow-[0_0_15px_rgba(234,179,8,0.5)] z-10' : ''}
                  ${isKey && keyVal !== null ? 'opacity-100 ring-4 ring-yellow-500/20' : (isKey ? 'opacity-100' : 'opacity-70')}`}>
                  <div className="absolute top-2 left-2 text-xs font-bold text-muted-foreground">{val}</div>
                  <span className={`text-3xl font-bold ${isKey ? 'text-yellow-600 dark:text-yellow-400' : 'text-foreground'}`}>{val}</span>
                  <div className="absolute bottom-2 right-2 text-xs font-bold text-muted-foreground rotate-180">{val}</div>
                </div>
                {isKey && keyVal === null && <div className="absolute -bottom-8 text-xs font-bold text-yellow-500">KEY CARD</div>}
              </div>
            );
          })}
        </div>

        {keyVal === null ? (
          <button 
            onClick={() => {
              setKeyVal(array[1]);
            }}
            className="px-6 py-2 bg-yellow-500/20 text-yellow-600 dark:text-yellow-400 border border-yellow-500 rounded-lg hover:bg-yellow-500/30 flex items-center gap-2"
          >
            <ArrowDownToLine className="size-4 rotate-180" /> Lift Key Card
          </button>
        ) : (
          <button 
            onClick={() => {
              addXp(50, "Key Hunter");
              setStage(3);
            }}
            className="px-6 py-2 bg-primary text-primary-foreground font-bold rounded-lg flex items-center gap-2 animate-in zoom-in"
          >
            <Search className="size-4" /> Find Position
          </button>
        )}
      </div>
    );
  };

  const renderStage3 = () => (
    <div className="flex flex-col items-center animate-in fade-in slide-in-from-bottom-4">
      <div className="text-center mb-6">
        <h3 className="text-xl font-bold text-primary mb-2">Shift the Cards</h3>
        <p className="text-muted-foreground">Compare the key backwards. If a sorted card is larger, shift it right to make space.</p>
      </div>

      <div className="flex justify-center gap-3 mb-16 relative">
        <div className="absolute left-1/2 -top-16 -translate-x-1/2 bg-card border-2 border-yellow-500 w-16 h-24 rounded-lg flex items-center justify-center shadow-lg z-20">
          <span className="text-3xl font-bold text-yellow-500">11</span>
        </div>

        <div className="flex gap-3">
           <div className={`w-16 h-24 rounded-lg flex items-center justify-center border-2 bg-card relative border-primary/50 transition-transform duration-500 ${shiftIndex > 0 ? 'translate-x-[76px]' : ''}`}>
             <span className="text-3xl font-bold text-foreground">12</span>
           </div>
           
           <div className={`w-16 h-24 rounded-lg border-2 border-dashed border-border bg-secondary/30 flex items-center justify-center transition-all duration-500 ${shiftIndex > 0 ? '-translate-x-[76px] bg-primary/10 border-primary' : ''}`}>
             {shiftIndex === 0 && <span className="text-xs text-muted-foreground">Gap</span>}
           </div>

           {[13, 5, 6].map((val, i) => (
             <div key={i} className="w-16 h-24 rounded-lg flex items-center justify-center border-2 border-border bg-card opacity-50">
               <span className="text-3xl font-bold">{val}</span>
             </div>
           ))}
        </div>
      </div>

      <div className="bg-secondary/50 p-4 rounded-xl mb-6 text-center">
        <p className="font-bold">12 &gt; 11 ?</p>
      </div>

      <div className="flex gap-4">
        <button 
          onClick={() => {
            if (shiftIndex === 0) {
              setShiftIndex(1);
              addXp(100, "Correct Shift");
              setTimeout(() => {
                setStage(4);
              }, 1000);
            }
          }}
          className="px-6 py-2 bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 border border-indigo-500 rounded-lg hover:bg-indigo-500/30 flex items-center gap-2"
        >
          <MoveRight className="size-4" /> Shift 12 Right
        </button>
        <button 
          onClick={() => {
            setMistake("Incorrect! 12 is larger than the key (11), so it MUST shift right to make room.");
          }}
          className="px-6 py-2 bg-red-500/20 text-red-600 dark:text-red-400 border border-red-500 rounded-lg hover:bg-red-500/30 flex items-center gap-2"
        >
          <Shield className="size-4" /> Don't Shift
        </button>
      </div>
    </div>
  );

  const renderStage4 = () => (
    <div className="flex flex-col items-center animate-in fade-in">
      <div className="text-center mb-6">
        <h3 className="text-xl font-bold text-primary mb-2">Insert the Key</h3>
        <p className="text-muted-foreground">Once all larger elements have shifted, the key drops into the gap.</p>
      </div>

      <div className="flex justify-center gap-3 mb-16 relative">
        <div className="absolute left-[38px] -top-16 -translate-x-1/2 bg-card border-2 border-yellow-500 w-16 h-24 rounded-lg flex items-center justify-center shadow-lg z-20 animate-[drop-in_1s_ease-out_forwards]">
          <span className="text-3xl font-bold text-yellow-500">11</span>
        </div>

        <div className="flex gap-3">
           <div className="w-16 h-24 rounded-lg border-2 border-dashed border-primary bg-primary/10" />
           <div className="w-16 h-24 rounded-lg flex items-center justify-center border-2 bg-card border-primary/50">
             <span className="text-3xl font-bold">12</span>
           </div>
           {[13, 5, 6].map((val, i) => (
             <div key={i} className="w-16 h-24 rounded-lg flex items-center justify-center border-2 border-border bg-card opacity-50">
               <span className="text-3xl font-bold">{val}</span>
             </div>
           ))}
        </div>
      </div>
      
      <style>{`
        @keyframes drop-in {
          0% { transform: translate(-50%, 0); }
          100% { transform: translate(-50%, 64px); box-shadow: none; border-color: hsl(var(--primary) / 0.5); color: hsl(var(--foreground)); }
        }
      `}</style>

      <button 
        onClick={() => {
          setArray([11, 12, 13, 5, 6]);
          setPass(2);
          setKeyVal(null);
          setShiftIndex(0);
          addXp(200, "Perfect Insertion");
          setStage(5);
        }}
        className="px-8 py-3 bg-primary text-primary-foreground font-bold rounded-lg hover:opacity-90 flex items-center gap-2 mt-8"
      >
        Continue to Next Card <ChevronRight className="size-5" />
      </button>
    </div>
  );

  const renderStage5 = () => (
    <div className="flex flex-col items-center animate-in fade-in">
      <div className="text-center mb-6">
        <h3 className="text-xl font-bold text-primary mb-2">The Training Hall</h3>
        <p className="text-muted-foreground">The next key is 13. The largest sorted element is 12.</p>
      </div>

      <div className="flex justify-center gap-3 mb-16 relative">
        <div className="absolute left-[190px] -top-16 -translate-x-1/2 bg-card border-2 border-yellow-500 w-16 h-24 rounded-lg flex items-center justify-center shadow-lg z-20">
          <span className="text-3xl font-bold text-yellow-500">13</span>
        </div>

        <div className="flex gap-3">
           <div className="w-16 h-24 rounded-lg flex items-center justify-center border-2 bg-card border-primary/50 opacity-50">
             <span className="text-3xl font-bold">11</span>
           </div>
           <div className="w-16 h-24 rounded-lg flex items-center justify-center border-2 bg-card border-primary">
             <span className="text-3xl font-bold text-primary">12</span>
           </div>
           <div className="w-16 h-24 rounded-lg border-2 border-dashed border-border bg-secondary/30 flex items-center justify-center">
             <span className="text-xs text-muted-foreground">Gap</span>
           </div>
           {[5, 6].map((val, i) => (
             <div key={i} className="w-16 h-24 rounded-lg flex items-center justify-center border-2 border-border bg-card opacity-30">
               <span className="text-3xl font-bold">{val}</span>
             </div>
           ))}
        </div>
      </div>

      <div className="bg-secondary/50 p-4 rounded-xl border border-border text-center max-w-md w-full mb-6">
        <h4 className="font-bold mb-2">Comparison: 12 &gt; 13 ? (False)</h4>
        <p className="text-sm">Will a shift occur?</p>
      </div>

      <div className="flex gap-4">
        <button 
          onClick={() => {
            if (stage5Prediction === false) {
              addXp(100, "Quick Analyzer");
              setStage(6);
            } else {
              setMistake("Incorrect. 13 is larger than 12, so no shifting is needed. It drops right back into its spot.");
            }
          }}
          className="px-6 py-2 bg-primary text-primary-foreground font-bold rounded-lg"
        >
          Confirm Prediction
        </button>
        
        <div className="flex gap-2">
           <button onClick={() => setStage5Prediction(false)} className={`px-4 py-2 border rounded ${stage5Prediction === false ? 'bg-secondary' : 'bg-transparent'}`}>No</button>
           <button onClick={() => setStage5Prediction(true)} className={`px-4 py-2 border rounded ${stage5Prediction === true ? 'bg-secondary' : 'bg-transparent'}`}>Yes</button>
        </div>
      </div>
    </div>
  );

  const insPassHistory = [
    [12, 11, 13, 5, 6],
    [11, 12, 13, 5, 6],
    [11, 12, 13, 5, 6], // pass 2 (key 13) didn't move
    [5, 11, 12, 13, 6],
    [5, 6, 11, 12, 13]
  ];

  const renderStage6 = () => (
    <div className="flex flex-col items-center animate-in fade-in w-full max-w-3xl mx-auto space-y-8">
      <div className="text-center">
        <h3 className="text-xl font-bold text-primary mb-2 flex items-center justify-center gap-2"><Hexagon className="size-6" /> The Great Shift Challenge</h3>
        <p className="text-muted-foreground">Answer the quizzes to prove your mastery of shifting and insertion.</p>
      </div>

      <div className="w-full grid md:grid-cols-3 gap-4">
        {/* Q1 */}
        <div className="bg-secondary/30 p-4 rounded-xl border border-border">
          <h4 className="font-bold text-sm mb-2">Key Finder</h4>
          <p className="text-xs mb-3 text-muted-foreground">[9, 3 | 7, 1, 5] (Sorted zone is 2 elements)</p>
          <div className="flex gap-2 flex-wrap">
            {[9, 3, 7, 1].map(n => (
              <button key={n} onClick={() => setQuiz1Answer(n)} className={`px-2 py-1 text-xs rounded border ${quiz1Answer === n ? 'bg-primary text-primary-foreground' : 'border-border'}`}>{n}</button>
            ))}
          </div>
          {quiz1Answer === 7 && <div className="text-green-500 text-xs mt-2 font-bold">✅ Correct (First unsorted element)</div>}
        </div>
        
        {/* Q2 */}
        <div className="bg-secondary/30 p-4 rounded-xl border border-border">
          <h4 className="font-bold text-sm mb-2">Predict the Shift</h4>
          <p className="text-xs mb-3 text-muted-foreground">[3, 7, 9 | 5]</p>
          <div className="flex flex-col gap-1">
            {['Only 9', 'Only 7', 'Both 7 and 9'].map(s => (
              <button key={s} onClick={() => setQuiz2Answer(s)} className={`px-2 py-1 text-xs rounded border text-left ${quiz2Answer === s ? 'bg-primary text-primary-foreground' : 'border-border'}`}>{s}</button>
            ))}
          </div>
          {quiz2Answer === 'Both 7 and 9' && <div className="text-green-500 text-xs mt-2 font-bold">✅ Correct</div>}
        </div>

        {/* Q3 */}
        <div className="bg-secondary/30 p-4 rounded-xl border border-border flex flex-col justify-between">
          <div>
            <h4 className="font-bold text-sm mb-2">Insert Position Puzzle</h4>
            <p className="text-xs mb-3 text-muted-foreground">Current: [5, 11, 12, 13]</p>
            <p className="text-xs mb-3 text-muted-foreground">Key: 6</p>
          </div>
          <button 
            onClick={() => setQuiz3Answer(true)} 
            className={`px-2 py-2 text-xs rounded border font-bold ${quiz3Answer ? 'bg-green-500/20 text-green-500 border-green-500' : 'bg-primary text-primary-foreground border-primary hover:opacity-90'}`}
          >
            {quiz3Answer ? 'Inserted: [5, 6, 11, 12, 13]' : 'Click to Insert at Correct Slot'}
          </button>
        </div>
      </div>

      {quiz1Answer === 7 && quiz2Answer === 'Both 7 and 9' && quiz3Answer && (
        <button 
          onClick={() => {
            addXp(300, "Shift Master");
            setStage(7);
          }}
          className="px-8 py-3 bg-primary text-primary-foreground font-bold rounded-lg animate-in zoom-in w-full max-w-sm mt-4"
        >
          Enter the Observatory
        </button>
      )}
    </div>
  );

  const renderStage7 = () => (
    <div className="flex flex-col items-center animate-in fade-in w-full max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-primary mb-2 flex items-center justify-center gap-2"><Clock className="size-6" /> Time Machine & Complexity</h3>
        <p className="text-muted-foreground">Observe how Insertion Sort behaves differently based on the input.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6 w-full mb-8">
        <div className="bg-card p-6 rounded-xl border border-green-500/30 text-center shadow-md relative overflow-hidden">
          <div className="absolute inset-0 bg-green-500/5 z-0" />
          <h4 className="font-bold text-lg mb-2 text-green-500 relative z-10">Best Case (Already Sorted)</h4>
          <p className="text-sm text-muted-foreground mb-4 relative z-10">1 2 3 4 5</p>
          <p className="text-xs mb-4 text-left relative z-10">Every key immediately returns. No shifts occur. It runs in linear time.</p>
          <div className="text-2xl font-mono text-green-500 font-bold relative z-10">O(n)</div>
        </div>

        <div className="bg-card p-6 rounded-xl border border-red-500/30 text-center shadow-md relative overflow-hidden">
          <div className="absolute inset-0 bg-red-500/5 z-0" />
          <h4 className="font-bold text-lg mb-2 text-red-500 relative z-10">Worst Case (Reverse Sorted)</h4>
          <p className="text-sm text-muted-foreground mb-4 relative z-10">5 4 3 2 1</p>
          <p className="text-xs mb-4 text-left relative z-10">Every new key must travel all the way to the beginning. Massive shifting.</p>
          <div className="text-2xl font-mono text-red-500 font-bold relative z-10">O(n²)</div>
        </div>
      </div>
      
      <div className="bg-secondary/50 border border-border p-4 rounded-lg w-full flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-4">
           <div className="size-12 bg-indigo-500/20 text-indigo-500 flex items-center justify-center rounded-xl border border-indigo-500/50 shadow-[0_0_15px_rgba(99,102,241,0.5)]">
             <Gem className="size-6" />
           </div>
           <div className="text-left">
             <h4 className="font-bold">Space Complexity Chamber</h4>
             <p className="text-xs text-muted-foreground">Insertion Sort is an in-place algorithm. It uses only one extra "Key Crystal" (variable).</p>
           </div>
        </div>
        <div className="text-xl font-bold font-mono text-indigo-500">O(1) Space</div>
      </div>

      <button 
        onClick={() => {
          addXp(300, "Complexity Analyst");
          setStage(8);
        }}
        className="px-8 py-3 bg-primary text-primary-foreground font-bold rounded-lg hover:opacity-90 mt-8"
      >
        Face The Grand Wizard's Exam
      </button>
    </div>
  );

  const renderStage8 = () => (
    <div className="flex flex-col items-center animate-in fade-in w-full">
      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold text-primary mb-2 flex items-center justify-center gap-2"><Trophy className="size-6 text-yellow-500" /> The Grand Wizard's Exam</h3>
        <p className="text-muted-foreground">Perform Insertion Sort manually on [9, 3, 7, 1, 5].</p>
      </div>

      <div className="flex justify-between items-center w-full max-w-xl bg-secondary/50 p-4 rounded-xl border border-border mb-8">
        <div><span className="text-xs text-muted-foreground">Sorted Size</span><div className="font-bold text-xl">{bossPass}</div></div>
        <div>
          <span className="text-xs text-muted-foreground">Phase</span>
          <div className="font-bold text-primary uppercase text-sm tracking-widest">
            {bossPhase}
          </div>
        </div>
      </div>

      <div className="flex justify-center gap-3 mb-10 relative h-32 items-end">
        {bossArray.map((val, i) => {
          const isSorted = i < bossPass;
          const isGap = bossPhase !== "pick" && i === bossCompareIdx;
          
          if (isGap) {
            return (
               <div key={i} className="w-16 h-24 rounded-lg border-2 border-dashed border-primary bg-primary/10 flex items-center justify-center relative">
                  <span className="text-xs font-bold text-muted-foreground">GAP</span>
                  {/* Floating Key */}
                  <div className="absolute -top-16 bg-card border-2 border-yellow-500 w-16 h-24 rounded-lg flex items-center justify-center shadow-xl z-30">
                    <span className="text-3xl font-bold text-yellow-500">{bossKey}</span>
                  </div>
               </div>
            );
          }

          return (
            <div key={i} className={`flex flex-col items-center`}>
              <div 
                className={`w-16 h-24 rounded-lg flex items-center justify-center border-2 transition-all
                  ${isSorted ? 'bg-card border-primary/50' : 'bg-secondary border-border opacity-60'}
                `}
              >
                <span className="text-2xl font-bold">{val}</span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex gap-4">
        {bossPhase === "pick" && (
          <button 
            onClick={() => {
              setBossKey(bossArray[bossPass]);
              setBossCompareIdx(bossPass);
              setBossPhase("shift");
            }}
            className="px-8 py-3 bg-yellow-500/20 text-yellow-600 dark:text-yellow-400 border border-yellow-500 rounded-lg font-bold flex items-center gap-2"
          >
            <ArrowDownToLine className="size-4 rotate-180" /> Extract Key ({bossArray[bossPass]})
          </button>
        )}
        
        {bossPhase === "shift" && (
          <>
            <button 
              onClick={() => {
                if (bossCompareIdx !== null && bossCompareIdx > 0 && bossKey !== null) {
                  const leftVal = bossArray[bossCompareIdx - 1];
                  if (leftVal > bossKey) {
                    const newArr = [...bossArray];
                    newArr[bossCompareIdx] = leftVal;
                    setBossArray(newArr);
                    setBossCompareIdx(bossCompareIdx - 1);
                  } else {
                    setMistake(`${leftVal} is NOT greater than ${bossKey}. You should Insert here.`);
                  }
                } else {
                  setMistake("Cannot shift further left.");
                }
              }}
              className="px-6 py-3 bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 border border-indigo-500 rounded-lg font-bold flex items-center gap-2"
            >
              <MoveRight className="size-4" /> Shift Left Element Right
            </button>
            <button 
              onClick={() => {
                if (bossCompareIdx !== null && bossKey !== null) {
                  const leftVal = bossCompareIdx > 0 ? bossArray[bossCompareIdx - 1] : -Infinity;
                  if (leftVal > bossKey) {
                    setMistake(`${leftVal} > ${bossKey}. You MUST shift it right before inserting.`);
                  } else {
                    setBossPhase("insert");
                  }
                }
              }}
              className="px-6 py-3 bg-primary/20 text-primary border border-primary rounded-lg font-bold flex items-center gap-2"
            >
              Ready to Insert
            </button>
          </>
        )}

        {bossPhase === "insert" && (
          <button 
            onClick={() => {
              if (bossCompareIdx !== null && bossKey !== null) {
                const newArr = [...bossArray];
                newArr[bossCompareIdx] = bossKey;
                setBossArray(newArr);
                
                addXp(50, "Successful Insertion");
                
                if (bossPass + 1 >= bossArray.length) {
                  setTimeout(() => {
                    addXp(600, "Grand Card Master");
                    setStage(9);
                  }, 500);
                } else {
                  setBossPhase("pick");
                  setBossPass(p => p + 1);
                  setBossKey(null);
                  setBossCompareIdx(null);
                }
              }
            }}
            className="px-8 py-3 bg-green-500/20 text-green-600 dark:text-green-400 border border-green-500 font-bold rounded-lg flex items-center gap-2 animate-[pulse_2s_infinite]"
          >
            <ArrowDownToLine className="size-5" /> Insert Key Here
          </button>
        )}
      </div>
    </div>
  );

  const renderStage9 = () => (
    <div className="flex flex-col items-center text-center animate-in fade-in zoom-in w-full max-w-lg mx-auto">
      <div className="size-24 bg-indigo-500/20 text-indigo-500 rounded-full flex items-center justify-center mb-6 shadow-[0_0_50px_rgba(99,102,241,0.3)]">
        <Crown className="size-12" />
      </div>
      <h2 className="text-3xl font-bold text-primary mb-2">Academy Graduate!</h2>
      <p className="text-muted-foreground mb-8">You are now a Grand Card Master of Insertion Sort.</p>

      <div className="w-full bg-card border border-border p-6 rounded-2xl shadow-lg mb-8 text-left">
        <h4 className="font-bold mb-4 border-b border-border pb-2">Activity XP</h4>
        <div className="space-y-2 text-sm text-muted-foreground mb-4">
          <div className="flex justify-between"><span>Training Start</span><span>100 XP</span></div>
          <div className="flex justify-between"><span>Key Challenges</span><span>300 XP</span></div>
          <div className="flex justify-between"><span>Shift Missions</span><span>500 XP</span></div>
          <div className="flex justify-between"><span>Complexity Lab</span><span>300 XP</span></div>
          <div className="flex justify-between"><span>Final Exam</span><span>600 XP</span></div>
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
            <Wand2 className="size-6 text-primary" /> Master Card Academy
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
