import React, { useState, useEffect } from "react";
import { 
  Play, RotateCcw, ArrowRight, CheckCircle2, Info, Star, Sparkles, 
  HelpCircle, AlertOctagon, RefreshCw, Zap, Volume2, ShieldCheck, 
  Award, Trash2, ShieldAlert
} from "lucide-react";

type CampaignProps = {
  expId: string;
};

interface Badge {
  id: string;
  name: string;
  desc: string;
  icon: string;
  unlocked: boolean;
}

export function PythonTalentShowCampaign({ expId }: CampaignProps) {
  const [xp, setXp] = useState(0);
  const [coins, setCoins] = useState(0);
  const [activeScreen, setActiveScreen] = useState<"lobby" | "game" | "completion">("lobby");
  const [stageIndex, setStageIndex] = useState(0);
  const [toast, setToast] = useState<{ message: string; type: "success" | "xp" | "error" | "badge" } | null>(null);

  const triggerToast = (message: string, type: "success" | "xp" | "error" | "badge") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const addXp = (amount: number, reason: string) => {
    setXp(prev => prev + amount);
    triggerToast(`+${amount} XP: ${reason}`, "xp");
  };

  const addCoins = (amount: number) => {
    setCoins(prev => prev + amount);
  };

  const [badges, setBadges] = useState<Badge[]>([
    { id: "naming_star", name: "Naming Director", desc: "Mastered Python variable naming rules", icon: "🏷️", unlocked: false },
    { id: "magic_morph", name: "Shape Shifter", desc: "Successfully transformed Contestant X dynamically", icon: "✨", unlocked: false },
    { id: "type_detective", name: "Type Detective", desc: "Scanned and identified mystery data types", icon: "🔍", unlocked: false },
    { id: "cannon_operator", name: "Arithmetic Ringmaster", desc: "Fired all operator cannons in the Circus", icon: "🎪", unlocked: false },
    { id: "logic_duelist", name: "Logic Champion", desc: "Mastered Boolean operations in the arena", icon: "⚔️", unlocked: false },
    { id: "conversion_doc", name: "Alchemist", desc: "Converted types and survived ValueError", icon: "🧪", unlocked: false },
    { id: "show_saver", name: "Show Saver", desc: "Completed the final boss stage repair puzzles", icon: "🎭", unlocked: false }
  ]);

  const unlockBadge = (id: string) => {
    setBadges(prev => prev.map(b => {
      if (b.id === id && !b.unlocked) {
        triggerToast(`Badge Unlocked: ${b.name}!`, "badge");
        return { ...b, unlocked: true };
      }
      return b;
    }));
  };

  const stageTitles = [
    "Variable Naming Challenge",
    "Dynamic Typing Magic Show",
    "Type Detective",
    "Arithmetic Circus",
    "Boolean Battle Arena",
    "Comparison Courtroom",
    "Transformation Laboratory",
    "Final Boss: Save the Show"
  ];

  // --- STAGE-SPECIFIC STATES ---

  // Stage 1: Variable Naming Challenge
  const [s1Contestants, setS1Contestants] = useState<{ id: number; tag: string | null }[]>([
    { id: 1, tag: null },
    { id: 2, tag: null },
    { id: 3, tag: null }
  ]);
  const [s1Pool, setS1Pool] = useState<string[]>([
    "valid_name", "2age", "age", "class", "_count", "first-name"
  ]);
  const [s1Exploded, setS1Exploded] = useState<string | null>(null);

  // Stage 2: Dynamic Typing Magic Show
  const [s2XType, setS2XType] = useState<"none" | "int" | "float" | "str" | "bool">("none");
  const [s2Steps, setS2Steps] = useState<string[]>([]);
  const [s2Sequence, setS2Sequence] = useState<string[]>([]); // track which types were assigned

  // Stage 3: Type Detective
  const [s3Boxes, setS3Boxes] = useState([
    { val: "42", type: "int", scanned: false },
    { val: "3.14", type: "float", scanned: false },
    { val: '"Python"', type: "str", scanned: false },
    { val: "False", type: "bool", scanned: false }
  ]);
  const [s3Answers, setS3Answers] = useState<Record<number, string>>({});
  const [s3Completed, setS3Completed] = useState(false);

  // Stage 4: Arithmetic Circus
  const [s4LeftVal, setS4LeftVal] = useState<number>(10);
  const [s4RightVal, setS4RightVal] = useState<number>(5);
  const [s4Operator, setS4Operator] = useState<string | null>(null);
  const [s4Result, setS4Result] = useState<string | null>(null);
  const [s4Candies, setS4Candies] = useState<number[]>([]);
  const [s4Bags, setS4Bags] = useState<number>(0);
  const [s4Leftovers, setS4Leftovers] = useState<number>(0);

  // Stage 5: Boolean Battle Arena
  const [s5RobotL, setS5RobotL] = useState<boolean>(true);
  const [s5RobotR, setS5RobotR] = useState<boolean>(false);
  const [s5Op, setS5Op] = useState<"AND" | "OR" | "NOT">("AND");
  const [s5Result, setS5Result] = useState<boolean | null>(null);
  const [s5Flipped, setS5Flipped] = useState(false);

  // Stage 6: Comparison Courtroom
  const [s6Left, setS6Left] = useState<number>(10);
  const [s6Right, setS6Right] = useState<number>(5);
  const [s6Op, setS6Op] = useState<">" | "<" | "==" | "!=">(">");
  const [s6Verdict, setS6Verdict] = useState<string | null>(null);

  // Stage 7: Transformation Laboratory
  const [s7Machine, setS7Machine] = useState<"int" | "float" | "str" | "bool">("int");
  const [s7InputVal, setS7InputVal] = useState<string>("3.7");
  const [s7OutputVal, setS7OutputVal] = useState<string | null>(null);
  const [s7Shaking, setS7Shaking] = useState(false);
  const [s7Smoke, setS7Smoke] = useState(false);
  const [s7Error, setS7Error] = useState<string | null>(null);

  // Stage 8: Boss Arena Puzzles
  const [bossAnswers, setBossAnswers] = useState({
    q1: "",
    q2: "",
    q3: "",
    q4: ""
  });
  const [bossRepaired, setBossRepaired] = useState({
    q1: false,
    q2: false,
    q3: false,
    q4: false
  });
  const [bossComplete, setBossComplete] = useState(false);

  // --- STAGE LOGIC HANDLERS ---

  // Stage 1 Naming Check
  const handleS1Drop = (tag: string, slotIndex: number) => {
    const isValid = ["valid_name", "age", "_count"].includes(tag);
    if (isValid) {
      const updated = [...s1Contestants];
      updated[slotIndex] = { id: slotIndex + 1, tag };
      setS1Contestants(updated);
      setS1Pool(prev => prev.filter(t => t !== tag));
      addCoins(10);
      
      // Check if all 3 slots filled
      if (updated.every(slot => slot.tag !== null)) {
        addXp(50, "Variable Naming Rules Decoded!");
        unlockBadge("naming_star");
        setTimeout(() => setStageIndex(1), 1500);
      }
    } else {
      setS1Exploded(tag);
      triggerToast(`Invalid Variable Name! "${tag}" exploded into confetti!`, "error");
      setTimeout(() => setS1Exploded(null), 2000);
    }
  };

  // Stage 2 Dynamic Typing Costumes
  const handleS2Assign = (valType: "int" | "float" | "str" | "bool") => {
    setS2XType(valType);
    let codeStr = "";
    if (valType === "int") codeStr = "x = 10";
    if (valType === "float") codeStr = "x = 3.14";
    if (valType === "str") codeStr = 'x = "Hello"';
    if (valType === "bool") codeStr = "x = True";

    setS2Steps(prev => [...prev, codeStr]);
    if (!s2Sequence.includes(valType)) {
      const newSeq = [...s2Sequence, valType];
      setS2Sequence(newSeq);
      if (newSeq.length === 4) {
        addXp(60, "Dynamic Typing Unlocked! 🎉");
        unlockBadge("magic_morph");
        setTimeout(() => setStageIndex(2), 2500);
      }
    }
  };

  // Stage 3 Scanner
  const handleS3Scan = (idx: number, typeSelected: string) => {
    const isCorrect = s3Boxes[idx].type === typeSelected;
    if (isCorrect) {
      setS3Answers(prev => ({ ...prev, [idx]: typeSelected }));
      const updated = [...s3Boxes];
      updated[idx].scanned = true;
      setS3Boxes(updated);
      addCoins(15);
      
      if (updated.every(b => b.scanned)) {
        setS3Completed(true);
        addXp(50, "Scanner Decrypted all types!");
        unlockBadge("type_detective");
        setTimeout(() => setStageIndex(3), 2000);
      }
    } else {
      triggerToast("Type mismatch! Check the scanner values again.", "error");
    }
  };

  // Stage 4 Operator Cannon
  const fireS4Cannon = (op: string) => {
    setS4Operator(op);
    let res = "";
    if (op === "+") res = String(s4LeftVal + s4RightVal);
    if (op === "-") res = String(s4LeftVal - s4RightVal);
    if (op === "*") res = String(s4LeftVal * s4RightVal);
    if (op === "/") res = String((s4LeftVal / s4RightVal).toFixed(1)); // division always float
    if (op === "//") {
      res = String(Math.floor(17 / 5)); // using candy visual (17 // 5)
    }
    if (op === "%") {
      res = String(17 % 5);
    }
    if (op === "**") {
      res = String(Math.pow(2, 10)); // rocket launch (2 ** 10)
    }

    setS4Result(res);
    addCoins(10);
    
    // Custom logic visualization
    if (op === "//") {
      setS4Candies(Array.from({ length: 17 }, (_, i) => i));
      setS4Bags(3);
      setS4Leftovers(2);
    } else if (op === "%") {
      setS4Candies(Array.from({ length: 17 }, (_, i) => i));
      setS4Leftovers(2);
    } else {
      setS4Candies([]);
    }
  };

  const completeS4 = () => {
    addXp(60, "Arithmetic Circus Mastered!");
    unlockBadge("cannon_operator");
    setStageIndex(4);
  };

  // Stage 5 Boolean Battle
  const handleS5Fight = () => {
    let result = false;
    if (s5Op === "AND") {
      result = s5RobotL && s5RobotR;
      setS5Flipped(false);
    } else if (s5Op === "OR") {
      result = s5RobotL || s5RobotR;
      setS5Flipped(false);
    } else if (s5Op === "NOT") {
      result = !s5RobotL;
      setS5Flipped(true); // Flip robot upside down!
    }

    setS5Result(result);
    addCoins(15);
    setTimeout(() => {
      addXp(50, "Logic Circuits aligned!");
      unlockBadge("logic_duelist");
      setStageIndex(5);
    }, 2500);
  };

  // Stage 6 Comparison Courtroom
  const handleS6Compare = () => {
    let verdict = "FALSE";
    if (s6Op === ">" && s6Left > s6Right) verdict = "TRUE";
    if (s6Op === "<" && s6Left < s6Right) verdict = "TRUE";
    if (s6Op === "==" && s6Left === s6Right) verdict = "TRUE";
    if (s6Op === "!=" && s6Left !== s6Right) verdict = "TRUE";

    setS6Verdict(verdict);
    addCoins(15);
    setTimeout(() => {
      addXp(50, "Judge approved comparisons!");
      setStageIndex(6);
    }, 2500);
  };

  // Stage 7 Converter Machine
  const handleS7Convert = () => {
    setS7Shaking(true);
    setS7OutputVal(null);
    setS7Error(null);

    setTimeout(() => {
      setS7Shaking(false);
      
      // Check for ValueError hello string to int
      if (s7Machine === "int" && s7InputVal === "hello") {
        setS7Smoke(true);
        setS7Error("ValueError: invalid literal for int() with base 10: 'hello'");
        triggerToast("Critial System Failure: Letters cannot become integers!", "error");
        setTimeout(() => setS7Smoke(false), 3000);
        return;
      }

      let res = "";
      if (s7Machine === "int") {
        const val = parseFloat(s7InputVal);
        res = isNaN(val) ? "ValueError" : String(Math.floor(val)); // truncation
      } else if (s7Machine === "float") {
        const val = parseFloat(s7InputVal);
        res = isNaN(val) ? "ValueError" : String(val.toFixed(1));
      } else if (s7Machine === "str") {
        res = `"${s7InputVal}"`;
      } else if (s7Machine === "bool") {
        if (s7InputVal === "0" || s7InputVal === "" || s7InputVal === "False") {
          res = "False";
        } else {
          res = "True";
        }
      }

      setS7OutputVal(res);
      addCoins(15);
      
      // Auto-advance if they successfully triggers ValueError at least once and converts something else
      if (s7InputVal === "hello" && s7Machine === "int") {
        unlockBadge("conversion_doc");
      }
    }, 1500);
  };

  // Stage 8 Boss puzzle submissions
  const handleBossSubmit = (qId: string, expected: string) => {
    const val = bossAnswers[qId as keyof typeof bossAnswers].trim();
    if (val === expected) {
      setBossRepaired(prev => ({ ...prev, [qId]: true }));
      addCoins(25);
      triggerToast("Stage segment repaired!", "success");

      const allRepaired = { ...bossRepaired, [qId]: true };
      if (Object.values(allRepaired).every(Boolean)) {
        setBossComplete(true);
        addXp(150, "Python Talent Show Stage Saved!");
        unlockBadge("show_saver");
        setTimeout(() => {
          setActiveScreen("completion");
        }, 2500);
      }
    } else {
      triggerToast("Incorrect answer. Check variable types and math!", "error");
    }
  };

  return (
    <div className="flex flex-col h-full bg-[#0d0714] text-slate-100 font-sans select-none overflow-hidden relative">
      {/* Laser light show visual effect */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(147,51,234,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(147,51,234,0.03)_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />

      {/* Show Director Dashboard Header */}
      <header className="flex items-center justify-between px-6 py-4 bg-[#140c1e] border-b border-purple-900/40 relative z-10 shrink-0">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-gradient-to-tr from-pink-600 to-purple-600 rounded-lg text-white shadow-[0_0_15px_rgba(236,72,153,0.4)]">
            <Award className="size-6 animate-spin" />
          </div>
          <div>
            <h1 className="font-extrabold text-xl tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400">
              PYTHON TALENT SHOW
            </h1>
            <p className="text-[10px] text-pink-300 tracking-widest uppercase">The Shape-Shifting Contest Director console</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 bg-pink-950/40 border border-pink-500/20 px-3 py-1.5 rounded-full text-xs font-bold text-pink-200">
            <Star className="size-4 text-yellow-400 fill-yellow-400 animate-pulse" />
            <span>{xp} XP</span>
          </div>
          <div className="flex items-center gap-2 bg-purple-950/40 border border-purple-500/20 px-3 py-1.5 rounded-full text-xs font-bold text-purple-200">
            <Zap className="size-4 text-cyan-400 fill-cyan-400" />
            <span>{coins} Coins</span>
          </div>
          <button 
            onClick={() => setActiveScreen("lobby")} 
            className="px-4 py-1.5 bg-[#251535] hover:bg-[#321c47] border border-pink-500/30 hover:border-pink-400 text-xs font-bold rounded-lg transition-all"
          >
            Show Lobby
          </button>
        </div>
      </header>

      {/* Alert / Toast Messages */}
      {toast && (
        <div className={`absolute top-20 left-1/2 -translate-x-1/2 px-6 py-3 rounded-xl shadow-2xl animate-in slide-in-from-top-10 z-50 font-bold flex items-center gap-3 border ${
          toast.type === "error" ? "bg-red-950/95 text-red-300 border-red-500/50 animate-bounce" : 
          toast.type === "xp" ? "bg-pink-950/95 text-pink-200 border-pink-500/50" :
          toast.type === "badge" ? "bg-yellow-950/95 text-yellow-200 border-yellow-500/50" :
          "bg-green-950/95 text-green-200 border-green-500/50"
        }`}>
          <Sparkles className="size-5 text-yellow-400 animate-pulse" />
          <span className="text-sm font-mono">{toast.message}</span>
        </div>
      )}

      {/* Main Display Container */}
      <main className="flex-1 min-h-0 relative flex flex-col">
        {activeScreen === "lobby" && (
          <div className="flex-1 p-8 overflow-y-auto max-w-6xl mx-auto w-full space-y-8 animate-in fade-in duration-500">
            {/* Jumbotron Intro */}
            <div className="bg-gradient-to-r from-pink-950/20 to-purple-950/20 border border-pink-500/20 rounded-2xl p-6 flex flex-col md:flex-row items-center gap-6 shadow-2xl relative overflow-hidden">
              <div className="absolute right-0 top-0 size-64 bg-pink-500/5 rounded-full blur-3xl pointer-events-none" />
              <div className="text-6xl animate-bounce">🎩</div>
              <div className="space-y-2">
                <span className="px-3 py-1 bg-pink-500/10 border border-pink-500/30 rounded-full text-xs font-extrabold text-pink-300 uppercase tracking-widest">Contestant Variables Ready</span>
                <h2 className="text-2xl font-black text-white">Can your variables handle dynamic casting on stage?</h2>
                <p className="text-sm text-slate-300 leading-relaxed max-w-3xl">
                  Welcome, Director! Unlike strictly typed languages where variables permanently bind to a single type, Python contestants can change their identity, costumes, and capabilities on command. Learn naming tags, run the arithmetic cannons, scan data cells, and repair the stage before the show collapses!
                </p>
              </div>
            </div>

            {/* Meet the Contestant Characters */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { name: "Mr. Integer 🎩", desc: "Performs arithmetic tricks.", costumes: "42, 100, 7", color: "from-blue-600 to-indigo-600" },
                { name: "Miss Float 🌊", desc: "Decimal point precision.", costumes: "3.14, 2.71, 5.5", color: "from-cyan-600 to-blue-600" },
                { name: "String Singer 📝", desc: "Combines character logs.", costumes: '"Hello", "Python"', color: "from-pink-600 to-purple-600" },
                { name: "Boolean Robot 🤖", desc: "Performs logical choices.", costumes: "True, False", color: "from-emerald-600 to-teal-600" }
              ].map((c, idx) => (
                <div key={idx} className={`bg-gradient-to-br ${c.color} p-4 rounded-xl border border-white/10 shadow-lg text-white space-y-2`}>
                  <h4 className="font-extrabold text-sm">{c.name}</h4>
                  <p className="text-[11px] text-white/80">{c.desc}</p>
                  <div className="text-[10px] font-mono bg-black/30 p-1.5 rounded">
                    Costumes: {c.costumes}
                  </div>
                </div>
              ))}
            </div>

            {/* Stage Selector Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2 space-y-3">
                <h3 className="font-extrabold text-sm text-pink-400 uppercase tracking-widest border-b border-purple-900/30 pb-2">Rounds / Challenges</h3>
                
                <div className="grid grid-cols-1 gap-2">
                  {stageTitles.map((title, idx) => (
                    <div 
                      key={idx}
                      onClick={() => {
                        setStageIndex(idx);
                        setActiveScreen("game");
                      }}
                      className="p-3.5 bg-[#150d22] border border-purple-950 hover:border-pink-500/50 rounded-xl flex items-center justify-between cursor-pointer hover:scale-[1.01] transition-all"
                    >
                      <div className="flex items-center gap-3">
                        <div className="size-8 rounded-lg bg-pink-500/20 text-pink-400 flex items-center justify-center font-bold text-xs">
                          {idx + 1}
                        </div>
                        <span className="font-bold text-slate-200 text-sm">{title}</span>
                      </div>
                      <span className="text-xs font-semibold text-pink-400 uppercase flex items-center gap-1">Enter <ArrowRight className="size-4" /></span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Badges Box */}
              <div className="bg-[#140c1e] border border-purple-900/40 p-5 rounded-2xl space-y-4 shadow-xl">
                <h3 className="font-extrabold text-sm text-pink-300 uppercase tracking-widest flex items-center gap-2">
                  <Award className="size-5 text-yellow-500 animate-pulse" /> Unlocked Medals
                </h3>
                <div className="grid grid-cols-2 gap-2.5">
                  {badges.map(b => (
                    <div 
                      key={b.id} 
                      className={`p-2 rounded-xl border flex flex-col items-center justify-center text-center transition-all ${
                        b.unlocked 
                          ? "bg-yellow-500/10 border-yellow-500/40 scale-105" 
                          : "bg-slate-900/40 border-slate-800 opacity-20"
                      }`}
                      title={b.desc}
                    >
                      <span className="text-xl mb-1">{b.icon}</span>
                      <span className="text-[9px] font-bold text-slate-300 leading-tight">{b.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeScreen === "game" && (
          <div className="flex-1 flex flex-col min-h-0">
            {/* Stage Sub-header */}
            <div className="px-6 py-3 bg-[#140c1e] border-b border-purple-900/30 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-pink-400">Round {stageIndex + 1}:</span>
                <h3 className="font-extrabold text-white text-sm">{stageTitles[stageIndex]}</h3>
              </div>
              <div className="flex items-center gap-2">
                <button 
                  disabled={stageIndex === 0}
                  onClick={() => setStageIndex(prev => prev - 1)}
                  className="px-3 py-1 bg-slate-800 hover:bg-slate-700 disabled:opacity-30 text-xs font-bold rounded"
                >
                  Prev
                </button>
                <button 
                  disabled={stageIndex === stageTitles.length - 1}
                  onClick={() => setStageIndex(prev => prev + 1)}
                  className="px-3 py-1 bg-pink-600 hover:bg-pink-500 disabled:opacity-30 text-xs font-bold rounded"
                >
                  Next
                </button>
              </div>
            </div>

            {/* STAGE MAIN INTERACTION VIEWS */}
            <div className="flex-1 min-h-0 p-6 overflow-y-auto">
              
              {/* STAGE 1: Variable Naming Challenge */}
              {stageIndex === 0 && (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-full min-h-[450px]">
                  {/* Left Column: Instructions and Name tags */}
                  <div className="bg-[#140c1e] rounded-2xl border border-purple-900/40 p-6 space-y-4">
                    <h3 className="font-extrabold text-sm text-pink-300 uppercase tracking-widest">Name Tag Hangar</h3>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      Python variables must start with a letter or underscore, can contain digits, and cannot match reserved Python keywords (e.g. <code>class</code>).
                    </p>

                    <div className="grid grid-cols-2 gap-2 pt-2">
                      {s1Pool.map((tag, idx) => (
                        <div 
                          key={idx}
                          onClick={() => {
                            // Find first empty slot and assign
                            const emptySlotIndex = s1Contestants.findIndex(c => c.tag === null);
                            if (emptySlotIndex !== -1) {
                              handleS1Drop(tag, emptySlotIndex);
                            } else {
                              triggerToast("All slots filled! Clear first.", "error");
                            }
                          }}
                          className={`p-3 bg-purple-950/60 border border-purple-500/20 hover:border-pink-500 hover:scale-105 rounded-xl font-mono text-xs text-center cursor-pointer transition-all ${
                            s1Exploded === tag ? "bg-red-600 border-red-500 text-white animate-ping" : ""
                          }`}
                        >
                          {tag}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Middle Column: Slots to drop */}
                  <div className="lg:col-span-2 bg-[#140c1e] rounded-2xl border border-purple-900/40 p-6 flex flex-col justify-between items-center relative">
                    <h3 className="font-extrabold text-sm text-pink-300 uppercase tracking-widest self-start">Stage Performers</h3>
                    
                    <div className="flex gap-8 my-8 z-10 w-full justify-center">
                      {s1Contestants.map((slot, index) => (
                        <div 
                          key={slot.id}
                          className="flex flex-col items-center bg-slate-900/60 border-2 border-dashed border-purple-500/30 rounded-xl p-4 w-40 h-44 justify-between"
                        >
                          <span className="text-xs text-slate-400 font-bold uppercase">Performer {slot.id}</span>
                          
                          {slot.tag ? (
                            <div className="bg-pink-500/10 border border-pink-500 px-3 py-1.5 rounded-lg text-xs font-mono text-pink-300 font-extrabold animate-bounce">
                              {slot.tag}
                            </div>
                          ) : (
                            <div className="text-[10px] text-slate-500 italic text-center">
                              Click name tag on left
                            </div>
                          )}

                          <button 
                            disabled={!slot.tag}
                            onClick={() => {
                              if (slot.tag) {
                                setS1Pool(prev => [...prev, slot.tag!]);
                                const updated = [...s1Contestants];
                                updated[index] = { id: slot.id, tag: null };
                                setS1Contestants(updated);
                              }
                            }}
                            className="text-[10px] text-red-400 hover:underline disabled:opacity-0"
                          >
                            Remove
                          </button>
                        </div>
                      ))}
                    </div>

                    <button 
                      onClick={() => {
                        setS1Contestants([
                          { id: 1, tag: null },
                          { id: 2, tag: null },
                          { id: 3, tag: null }
                        ]);
                        setS1Pool(["valid_name", "2age", "age", "class", "_count", "first-name"]);
                      }}
                      className="px-4 py-1.5 bg-slate-800 hover:bg-slate-700 text-xs font-bold rounded-lg"
                    >
                      Reset Challenge
                    </button>
                  </div>
                </div>
              )}

              {/* STAGE 2: Dynamic Typing Magic Show */}
              {stageIndex === 1 && (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-full min-h-[450px]">
                  {/* Left Controls */}
                  <div className="bg-[#140c1e] rounded-2xl border border-purple-900/40 p-6 space-y-4 flex flex-col justify-between">
                    <div className="space-y-4">
                      <h3 className="font-extrabold text-sm text-pink-300 uppercase tracking-widest">Assign Variable X</h3>
                      <p className="text-xs text-slate-400">
                        In Python, the same variable name can point to totally different object types dynamically! Assign different values to X:
                      </p>

                      <div className="grid grid-cols-1 gap-2">
                        {[
                          { label: "x = 10 (Integer)", type: "int" },
                          { label: "x = 3.14 (Float)", type: "float" },
                          { label: 'x = "Hello" (String)', type: "str" },
                          { label: "x = True (Boolean)", type: "bool" }
                        ].map(item => (
                          <button 
                            key={item.type}
                            onClick={() => handleS2Assign(item.type as any)}
                            className="w-full py-2.5 bg-purple-950/60 border border-purple-500/20 hover:border-pink-500 text-xs font-mono font-bold rounded-xl text-left px-4 hover:scale-[1.01] transition-all"
                          >
                            {item.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="bg-slate-950 p-4 rounded-xl border border-slate-900 text-[10px] font-mono text-slate-400 space-y-1">
                      <span className="text-slate-500 block mb-1">Interactive Log:</span>
                      {s2Steps.map((step, idx) => (
                        <div key={idx} className="text-pink-400">&gt;&gt;&gt; {step}</div>
                      ))}
                    </div>
                  </div>

                  {/* Right Stage: Transformation */}
                  <div className="lg:col-span-2 bg-[#140c1e] rounded-2xl border border-purple-900/40 p-6 flex flex-col items-center justify-center relative overflow-hidden">
                    <div className="absolute top-4 left-4 text-xs font-bold text-pink-300 uppercase tracking-widest">Stage Screen</div>
                    
                    {/* Morphing Variable Character */}
                    <div className="flex flex-col items-center justify-center p-8 bg-slate-950/40 rounded-full border border-purple-500/10 w-64 h-64 shadow-[inset_0_0_40px_rgba(236,72,153,0.1)] relative">
                      {s2XType === "none" && (
                        <div className="text-center">
                          <span className="text-4xl animate-bounce block">👤</span>
                          <span className="font-bold text-slate-500 text-sm mt-2 block">Contestant X</span>
                          <span className="text-[10px] text-slate-600 italic mt-1 block">Awaiting costume assignment</span>
                        </div>
                      )}

                      {s2XType === "int" && (
                        <div className="text-center animate-in zoom-in duration-500">
                          <span className="text-6xl block">🎩</span>
                          <span className="font-extrabold text-white text-lg mt-3 block">Mr. Integer</span>
                          <span className="px-2 py-0.5 bg-blue-900/40 text-blue-300 border border-blue-500/20 rounded font-mono text-xs">x = 10</span>
                        </div>
                      )}

                      {s2XType === "float" && (
                        <div className="text-center animate-in zoom-in duration-500">
                          <span className="text-6xl block">🌊</span>
                          <span className="font-extrabold text-white text-lg mt-3 block">Miss Float</span>
                          <span className="px-2 py-0.5 bg-cyan-900/40 text-cyan-300 border border-cyan-500/20 rounded font-mono text-xs">x = 3.14</span>
                        </div>
                      )}

                      {s2XType === "str" && (
                        <div className="text-center animate-in zoom-in duration-500">
                          <span className="text-6xl block">📝</span>
                          <span className="font-extrabold text-white text-lg mt-3 block">String Singer</span>
                          <span className="px-2 py-0.5 bg-pink-900/40 text-pink-300 border border-pink-500/20 rounded font-mono text-xs">x = "Hello"</span>
                        </div>
                      )}

                      {s2XType === "bool" && (
                        <div className="text-center animate-in zoom-in duration-500">
                          <span className="text-6xl block">🤖</span>
                          <span className="font-extrabold text-white text-lg mt-3 block">Boolean Robot</span>
                          <span className="px-2 py-0.5 bg-emerald-900/40 text-emerald-300 border border-emerald-500/20 rounded font-mono text-xs">x = True</span>
                        </div>
                      )}
                    </div>

                    <div className="mt-6 text-center text-xs text-slate-400 max-w-md">
                      Assign all 4 data type classes (Integer, Float, String, Boolean) to unlock dynamic typing. Status: <strong>{s2Sequence.length} / 4</strong> morphs completed.
                    </div>
                  </div>
                </div>
              )}

              {/* STAGE 3: Type Detective */}
              {stageIndex === 2 && (
                <div className="bg-[#140c1e] rounded-2xl border border-purple-900/40 p-6 space-y-6 min-h-[450px]">
                  <h3 className="font-extrabold text-sm text-pink-300 uppercase tracking-widest">Mystery Scanner Bay</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    {s3Boxes.map((box, idx) => (
                      <div key={idx} className="bg-slate-950 p-5 rounded-2xl border border-purple-900/20 flex flex-col items-center justify-between h-[220px]">
                        <span className="text-[10px] text-slate-500 uppercase tracking-widest">Mystery Box {idx + 1}</span>
                        <div className="font-mono text-2xl text-pink-400 font-black py-4">
                          {box.val}
                        </div>

                        {box.scanned ? (
                          <span className="px-3 py-1 bg-emerald-950/40 text-emerald-300 border border-emerald-500/20 rounded-full font-mono text-xs">
                            type() = {box.type}
                          </span>
                        ) : (
                          <div className="space-y-1.5 w-full">
                            <span className="text-[9px] text-slate-500 block text-center uppercase tracking-wider mb-1">Guess type():</span>
                            <div className="grid grid-cols-2 gap-1">
                              {["int", "float", "str", "bool"].map(opt => (
                                <button 
                                  key={opt}
                                  onClick={() => handleS3Scan(idx, opt)}
                                  className="py-1 bg-purple-950 text-slate-300 border border-purple-500/10 hover:border-pink-500 rounded text-[10px]"
                                >
                                  {opt}
                                </button>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>

                  <div className="text-center py-4">
                    <p className="text-xs text-slate-400">
                      The <code>type()</code> function retrieves the internal datatype class of any value dynamically at runtime.
                    </p>
                  </div>
                </div>
              )}

              {/* STAGE 4: Arithmetic Circus */}
              {stageIndex === 3 && (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-full min-h-[450px]">
                  {/* Left Column: Operator selector */}
                  <div className="bg-[#140c1e] rounded-2xl border border-purple-900/40 p-6 space-y-4">
                    <h3 className="font-extrabold text-sm text-pink-300 uppercase tracking-widest">Operator Cannons</h3>
                    
                    <div className="space-y-2">
                      {[
                        { op: "+", desc: "Addition (Combines values)", eg: "10 + 5 = 15" },
                        { op: "-", desc: "Subtraction (Boxes disappear)", eg: "10 - 5 = 5" },
                        { op: "*", desc: "Multiplication (Clones performers)", eg: "10 * 5 = 50" },
                        { op: "/", desc: "Division (Water tank float)", eg: "10 / 5 = 2.0" },
                        { op: "//", desc: "Floor Division (candies per bag)", eg: "17 // 5 = 3" },
                        { op: "%", desc: "Modulus (leftover candies)", eg: "17 % 5 = 2" },
                        { op: "**", desc: "Power Booster (exponential rocket)", eg: "2 ** 10 = 1024" }
                      ].map(item => (
                        <button 
                          key={item.op}
                          onClick={() => fireS4Cannon(item.op)}
                          className={`w-full p-2 text-left rounded-xl border text-xs flex justify-between items-center transition-all ${
                            s4Operator === item.op 
                              ? "bg-pink-600/15 border-pink-500 text-pink-300 scale-[1.01]" 
                              : "bg-purple-950/40 border-purple-500/10 hover:border-pink-500/40 text-slate-300"
                          }`}
                        >
                          <div>
                            <span className="font-bold font-mono text-sm mr-2 text-pink-400">{item.op}</span>
                            <span className="text-[10px] text-slate-400">{item.desc}</span>
                          </div>
                          <span className="font-mono text-[9px] text-slate-500">{item.eg}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Middle Column: Visual Cannon stage */}
                  <div className="bg-[#140c1e] rounded-2xl border border-purple-900/40 p-6 flex flex-col justify-between items-center relative overflow-hidden">
                    <h3 className="font-extrabold text-sm text-pink-300 uppercase tracking-widest self-start">Circus Stage</h3>
                    
                    {/* Visual animation based on operator */}
                    <div className="flex-1 flex flex-col items-center justify-center w-full min-h-[200px]">
                      {s4Operator === null && (
                        <div className="text-center space-y-2">
                          <span className="text-5xl block animate-bounce">🎪</span>
                          <span className="text-xs text-slate-500 italic">Select operator cannon to run circus tricks</span>
                        </div>
                      )}

                      {s4Operator && !["//", "%", "**"].includes(s4Operator) && (
                        <div className="flex items-center gap-6 animate-in zoom-in duration-500">
                          <div className="w-12 h-12 bg-indigo-600 rounded-lg flex items-center justify-center font-bold text-white shadow-lg text-lg">
                            {s4LeftVal}
                          </div>
                          <span className="font-mono text-xl text-pink-400">{s4Operator}</span>
                          <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center font-bold text-white shadow-lg text-lg">
                            {s4RightVal}
                          </div>
                        </div>
                      )}

                      {/* Floor Division & Modulus Candy visually */}
                      {(s4Operator === "//" || s4Operator === "%") && (
                        <div className="flex flex-col items-center gap-4 animate-in zoom-in duration-500">
                          <div className="text-center font-bold text-xs text-slate-400">
                            17 candies / 5 candies per bag
                          </div>
                          <div className="flex flex-wrap gap-1 justify-center max-w-[180px]">
                            {s4Candies.map(idx => (
                              <span key={idx} className="text-lg animate-pulse">🍬</span>
                            ))}
                          </div>
                          <div className="text-[10px] text-pink-300 text-center space-y-1">
                            {s4Operator === "//" && <div>Full bags packed: <strong>{s4Bags}</strong></div>}
                            {s4Operator === "%" && <div>Leftovers remaining: <strong>{s4Leftovers}</strong></div>}
                          </div>
                        </div>
                      )}

                      {/* Power Booster Rocket */}
                      {s4Operator === "**" && (
                        <div className="flex flex-col items-center gap-3 animate-in slide-in-from-bottom-20 duration-1000">
                          <span className="text-5xl animate-bounce">🚀</span>
                          <div className="text-xs text-slate-400">Power calculation: 2 ** 10</div>
                        </div>
                      )}
                    </div>

                    <button 
                      onClick={completeS4}
                      className="w-full py-2.5 bg-pink-600 hover:bg-pink-500 text-xs font-bold text-white rounded-xl shadow-lg"
                    >
                      Complete Circus Round
                    </button>
                  </div>

                  {/* Right Column: Console/Result logs */}
                  <div className="bg-black rounded-2xl border border-purple-900/40 p-6 flex flex-col justify-between">
                    <h3 className="font-extrabold text-sm text-pink-300 uppercase tracking-widest mb-4">Emitted Result stdout</h3>
                    
                    <div className="flex-1 bg-slate-950 rounded-xl p-4 font-mono text-sm text-emerald-400 relative overflow-hidden flex flex-col justify-center items-center">
                      <div className="absolute top-2 left-2 text-[9px] text-slate-600 uppercase">output register</div>
                      
                      {s4Result ? (
                        <div className="text-center space-y-2">
                          <div className="text-4xl font-extrabold tracking-wider">{s4Result}</div>
                          {s4Operator === "/" && <span className="text-[9px] text-slate-400 italic block">Division always produces float values.</span>}
                        </div>
                      ) : (
                        <span className="text-slate-700 italic">No calculation yet</span>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* STAGE 5: Boolean Battle Arena */}
              {stageIndex === 4 && (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-full min-h-[450px]">
                  {/* Left Column: controls */}
                  <div className="bg-[#140c1e] rounded-2xl border border-purple-900/40 p-6 space-y-4">
                    <h3 className="font-extrabold text-sm text-pink-300 uppercase tracking-widest">Arena Controls</h3>
                    
                    <div className="space-y-4">
                      <div>
                        <span className="text-[10px] text-slate-500 uppercase block mb-1">Robot L Value</span>
                        <div className="flex gap-2">
                          <button onClick={() => setS5RobotL(true)} className={`flex-1 py-1.5 rounded-lg text-xs font-bold ${s5RobotL ? "bg-emerald-600 text-white" : "bg-slate-900 text-slate-400"}`}>True</button>
                          <button onClick={() => setS5RobotL(false)} className={`flex-1 py-1.5 rounded-lg text-xs font-bold ${!s5RobotL ? "bg-red-600 text-white" : "bg-slate-900 text-slate-400"}`}>False</button>
                        </div>
                      </div>

                      <div>
                        <span className="text-[10px] text-slate-500 uppercase block mb-1">Robot R Value (Not used in NOT)</span>
                        <div className="flex gap-2">
                          <button onClick={() => setS5RobotR(true)} className={`flex-1 py-1.5 rounded-lg text-xs font-bold ${s5RobotR ? "bg-emerald-600 text-white" : "bg-slate-900 text-slate-400"}`}>True</button>
                          <button onClick={() => setS5RobotR(false)} className={`flex-1 py-1.5 rounded-lg text-xs font-bold ${!s5RobotR ? "bg-red-600 text-white" : "bg-slate-900 text-slate-400"}`}>False</button>
                        </div>
                      </div>

                      <div>
                        <span className="text-[10px] text-slate-500 uppercase block mb-1">Logical Duel Operator</span>
                        <div className="grid grid-cols-3 gap-2">
                          {["AND", "OR", "NOT"].map(o => (
                            <button 
                              key={o}
                              onClick={() => setS5Op(o as any)}
                              className={`py-1.5 rounded-lg text-xs font-bold font-mono ${s5Op === o ? "bg-pink-600 text-white" : "bg-slate-900 text-slate-400"}`}
                            >
                              {o}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Middle Arena Duel Grid */}
                  <div className="lg:col-span-2 bg-[#140c1e] rounded-2xl border border-purple-900/40 p-6 flex flex-col justify-between items-center relative">
                    <h3 className="font-extrabold text-sm text-pink-300 uppercase tracking-widest self-start">Battle Arena</h3>
                    
                    <div className="flex-1 flex items-center justify-around w-full relative min-h-[200px]">
                      {/* Left Robot */}
                      <div className="flex flex-col items-center space-y-2">
                        <span className="text-5xl block animate-bounce">🤖</span>
                        <span className="px-2 py-0.5 bg-purple-950 text-purple-300 rounded font-mono text-xs">
                          {s5RobotL ? "True" : "False"}
                        </span>
                      </div>

                      <div className="font-mono text-xl text-pink-400 font-black">
                        {s5Op}
                      </div>

                      {/* Right Robot */}
                      {s5Op !== "NOT" && (
                        <div className="flex flex-col items-center space-y-2">
                          <span className="text-5xl block animate-bounce">🤖</span>
                          <span className="px-2 py-0.5 bg-purple-950 text-purple-300 rounded font-mono text-xs">
                            {s5RobotR ? "True" : "False"}
                          </span>
                        </div>
                      )}

                      {/* Result flip indicator for NOT */}
                      {s5Op === "NOT" && (
                        <div className="flex flex-col items-center space-y-2">
                          <span className={`text-5xl block transition-transform duration-1000 ${s5Flipped ? "rotate-180" : ""}`}>🤖</span>
                          <span className="text-[10px] text-slate-400 italic">Flipping Robot</span>
                        </div>
                      )}
                    </div>

                    <div className="w-full flex items-center justify-between bg-slate-950 p-4 rounded-xl border border-slate-900 font-mono text-xs">
                      <span>Duel output: <strong className="text-emerald-400">{s5Result !== null ? String(s5Result) : "Pending"}</strong></span>
                      <button 
                        onClick={handleS5Fight}
                        className="px-6 py-2 bg-pink-600 hover:bg-pink-500 font-bold rounded-lg text-white"
                      >
                        Fire Logical Duel
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* STAGE 6: Comparison Courtroom */}
              {stageIndex === 5 && (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-full min-h-[450px]">
                  {/* Left Controls */}
                  <div className="bg-[#140c1e] rounded-2xl border border-purple-900/40 p-6 space-y-4">
                    <h3 className="font-extrabold text-sm text-pink-300 uppercase tracking-widest">Compare Performers</h3>
                    
                    <div className="space-y-4">
                      <div>
                        <label className="text-xs text-slate-400 block mb-1">Left Performer Value</label>
                        <input 
                          type="number" 
                          value={s6Left} 
                          onChange={e => setS6Left(parseInt(e.target.value) || 0)}
                          className="w-full bg-slate-950 border border-purple-900/40 rounded-lg p-2 text-xs font-mono text-white outline-none"
                        />
                      </div>

                      <div>
                        <label className="text-xs text-slate-400 block mb-1">Relational Operator</label>
                        <select 
                          value={s6Op}
                          onChange={e => setS6Op(e.target.value as any)}
                          className="w-full bg-slate-950 border border-purple-900/40 rounded-lg p-2 text-xs font-mono text-white outline-none"
                        >
                          <option value=">">&gt; (Greater than)</option>
                          <option value="<">&lt; (Less than)</option>
                          <option value="==">== (Equals)</option>
                          <option value="!=">!= (Not Equals)</option>
                        </select>
                      </div>

                      <div>
                        <label className="text-xs text-slate-400 block mb-1">Right Performer Value</label>
                        <input 
                          type="number" 
                          value={s6Right} 
                          onChange={e => setS6Right(parseInt(e.target.value) || 0)}
                          className="w-full bg-slate-950 border border-purple-900/40 rounded-lg p-2 text-xs font-mono text-white outline-none"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Courtroom Verdict stage */}
                  <div className="lg:col-span-2 bg-[#140c1e] rounded-2xl border border-purple-900/40 p-6 flex flex-col justify-between items-center">
                    <h3 className="font-extrabold text-sm text-pink-300 uppercase tracking-widest self-start">Courtroom Judge</h3>
                    
                    <div className="flex-1 flex flex-col items-center justify-center space-y-4 min-h-[200px]">
                      <span className="text-5xl animate-bounce">⚖️</span>
                      <div className="font-mono text-xl text-slate-200">
                        {s6Left} {s6Op} {s6Right}
                      </div>

                      {s6Verdict && (
                        <div className={`px-6 py-2.5 rounded-full font-bold text-sm border ${
                          s6Verdict === "TRUE" ? "bg-emerald-950/40 border-emerald-500 text-emerald-300" : "bg-red-950/40 border-red-500 text-red-300"
                        }`}>
                          Judge verdict: {s6Verdict}
                        </div>
                      )}
                    </div>

                    <button 
                      onClick={handleS6Compare}
                      className="w-full py-2.5 bg-pink-600 hover:bg-pink-500 text-xs font-bold text-white rounded-xl shadow-lg"
                    >
                      Ask Judge Verdict
                    </button>
                  </div>
                </div>
              )}

              {/* STAGE 7: Transformation Laboratory */}
              {stageIndex === 6 && (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-full min-h-[450px]">
                  {/* Left controls */}
                  <div className="bg-[#140c1e] rounded-2xl border border-purple-900/40 p-6 space-y-4">
                    <h3 className="font-extrabold text-sm text-pink-300 uppercase tracking-widest">Laboratory Sockets</h3>
                    
                    <div className="space-y-4">
                      <div>
                        <label className="text-xs text-slate-400 block mb-1">Conversion Machine</label>
                        <select 
                          value={s7Machine}
                          onChange={e => setS7Machine(e.target.value as any)}
                          className="w-full bg-slate-950 border border-purple-900/40 rounded-lg p-2 text-xs font-mono text-white outline-none"
                        >
                          <option value="int">int() (Truncation converter)</option>
                          <option value="float">float() (Decimal converter)</option>
                          <option value="str">str() (Character log converter)</option>
                          <option value="bool">bool() (Falsy/Truthy converter)</option>
                        </select>
                      </div>

                      <div>
                        <label className="text-xs text-slate-400 block mb-1">Performer Input Value</label>
                        <div className="flex gap-2">
                          <input 
                            type="text" 
                            value={s7InputVal} 
                            onChange={e => setS7InputVal(e.target.value)}
                            className="flex-1 bg-slate-950 border border-purple-900/40 rounded-lg p-2 text-xs font-mono text-white outline-none"
                          />
                          <button 
                            onClick={() => {
                              setS7InputVal("hello");
                              setS7Machine("int");
                            }}
                            className="px-2 py-1 bg-red-950 text-red-400 border border-red-900/50 hover:border-red-500 rounded text-[9px] font-bold"
                          >
                            Trigger ValueError
                          </button>
                        </div>
                        <p className="text-[10px] text-slate-500 mt-2">
                          Try setting input to <code>"hello"</code> and run the <code>int()</code> machine to view error behavior.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Laboratory Machine Shaking visual */}
                  <div className="lg:col-span-2 bg-[#140c1e] rounded-2xl border border-purple-900/40 p-6 flex flex-col justify-between items-center relative">
                    <h3 className="font-extrabold text-sm text-pink-300 uppercase tracking-widest self-start">Converter Chamber</h3>
                    
                    <div className={`flex-1 flex flex-col items-center justify-center min-h-[220px] w-full transition-transform ${
                      s7Shaking ? "animate-bounce" : ""
                    }`}>
                      {s7Smoke && (
                        <div className="absolute inset-0 bg-red-900/10 flex items-center justify-center backdrop-blur-sm z-20 animate-in fade-in duration-300">
                          <div className="bg-red-950 border border-red-500 p-4 rounded-xl text-center space-y-2 max-w-sm shadow-2xl">
                            <ShieldAlert className="size-8 text-red-500 mx-auto animate-bounce" />
                            <h4 className="font-extrabold text-white text-xs uppercase">🚨 ValueError Exception</h4>
                            <p className="text-[10px] text-red-300 font-mono leading-normal">{s7Error}</p>
                          </div>
                        </div>
                      )}

                      <div className="bg-slate-950/80 p-8 rounded-3xl border-2 border-purple-500/20 w-64 h-48 flex flex-col items-center justify-between shadow-xl relative overflow-hidden">
                        <span className="text-[10px] text-purple-400 uppercase tracking-wider font-bold">{s7Machine}() Processor</span>
                        
                        <div className="font-mono text-sm text-slate-400">
                          Input: <strong className="text-white">"{s7InputVal}"</strong>
                        </div>

                        <div className="h-6 w-full bg-slate-900 rounded border border-purple-900/20 flex items-center justify-center text-xs text-emerald-400 font-mono">
                          {s7OutputVal ? `Result: ${s7OutputVal}` : s7Shaking ? "morphing..." : "idle"}
                        </div>
                      </div>
                    </div>

                    <button 
                      onClick={handleS7Convert}
                      className="w-full py-2.5 bg-pink-600 hover:bg-pink-500 text-xs font-bold text-white rounded-xl shadow-lg"
                    >
                      Run Converter
                    </button>
                  </div>
                </div>
              )}

              {/* STAGE 8: Final Boss Puzzles */}
              {stageIndex === 7 && (
                <div className="bg-[#140c1e] rounded-2xl border border-purple-900/40 p-6 space-y-6 min-h-[450px] relative">
                  <div className="flex justify-between items-center">
                    <h3 className="font-extrabold text-sm text-pink-300 uppercase tracking-widest">Repair the Stage</h3>
                    <span className="px-2 py-0.5 bg-red-950 text-red-400 border border-red-900/30 rounded text-[10px] font-mono">Stage Crashing!</span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Puzzle 1 */}
                    <div className={`p-4 rounded-xl border flex flex-col justify-between h-[180px] ${
                      bossRepaired.q1 ? "bg-emerald-950/10 border-emerald-500/40" : "bg-slate-950 border-purple-900/20"
                    }`}>
                      <div>
                        <span className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Segment 1: Type Resolver</span>
                        <p className="text-xs text-slate-300 mt-2 font-mono">
                          age = "25"<br />
                          What class type is variable <code>age</code>? (int, str, float)
                        </p>
                      </div>

                      {bossRepaired.q1 ? (
                        <span className="text-xs font-bold text-emerald-400 flex items-center gap-1"><CheckCircle2 className="size-4" /> Repaired</span>
                      ) : (
                        <div className="flex gap-2">
                          <input 
                            type="text" 
                            placeholder="Type response..."
                            value={bossAnswers.q1}
                            onChange={e => setBossAnswers(prev => ({ ...prev, q1: e.target.value }))}
                            className="flex-1 bg-slate-900 border border-purple-900/40 rounded p-1 text-xs font-mono text-white outline-none"
                          />
                          <button onClick={() => handleBossSubmit("q1", "str")} className="px-3 bg-pink-600 hover:bg-pink-500 text-xs font-bold rounded text-white">Fix</button>
                        </div>
                      )}
                    </div>

                    {/* Puzzle 2 */}
                    <div className={`p-4 rounded-xl border flex flex-col justify-between h-[180px] ${
                      bossRepaired.q2 ? "bg-emerald-950/10 border-emerald-500/40" : "bg-slate-950 border-purple-900/20"
                    }`}>
                      <div>
                        <span className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Segment 2: Arithmetic conversion</span>
                        <p className="text-xs text-slate-300 mt-2 font-mono">
                          age = "25"<br />
                          What is value of <code>int(age) + 5</code>?
                        </p>
                      </div>

                      {bossRepaired.q2 ? (
                        <span className="text-xs font-bold text-emerald-400 flex items-center gap-1"><CheckCircle2 className="size-4" /> Repaired</span>
                      ) : (
                        <div className="flex gap-2">
                          <input 
                            type="text" 
                            placeholder="Type response..."
                            value={bossAnswers.q2}
                            onChange={e => setBossAnswers(prev => ({ ...prev, q2: e.target.value }))}
                            className="flex-1 bg-slate-900 border border-purple-900/40 rounded p-1 text-xs font-mono text-white outline-none"
                          />
                          <button onClick={() => handleBossSubmit("q2", "30")} className="px-3 bg-pink-600 hover:bg-pink-500 text-xs font-bold rounded text-white">Fix</button>
                        </div>
                      )}
                    </div>

                    {/* Puzzle 3 */}
                    <div className={`p-4 rounded-xl border flex flex-col justify-between h-[180px] ${
                      bossRepaired.q3 ? "bg-emerald-950/10 border-emerald-500/40" : "bg-slate-950 border-purple-900/20"
                    }`}>
                      <div>
                        <span className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Segment 3: Floor Division candies</span>
                        <p className="text-xs text-slate-300 mt-2 font-mono">
                          What does <code>17 // 5</code> evaluate to?
                        </p>
                      </div>

                      {bossRepaired.q3 ? (
                        <span className="text-xs font-bold text-emerald-400 flex items-center gap-1"><CheckCircle2 className="size-4" /> Repaired</span>
                      ) : (
                        <div className="flex gap-2">
                          <input 
                            type="text" 
                            placeholder="Type response..."
                            value={bossAnswers.q3}
                            onChange={e => setBossAnswers(prev => ({ ...prev, q3: e.target.value }))}
                            className="flex-1 bg-slate-900 border border-purple-900/40 rounded p-1 text-xs font-mono text-white outline-none"
                          />
                          <button onClick={() => handleBossSubmit("q3", "3")} className="px-3 bg-pink-600 hover:bg-pink-500 text-xs font-bold rounded text-white">Fix</button>
                        </div>
                      )}
                    </div>

                    {/* Puzzle 4 */}
                    <div className={`p-4 rounded-xl border flex flex-col justify-between h-[180px] ${
                      bossRepaired.q4 ? "bg-emerald-950/10 border-emerald-500/40" : "bg-slate-950 border-purple-900/20"
                    }`}>
                      <div>
                        <span className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Segment 4: Logic Circuit gate</span>
                        <p className="text-xs text-slate-300 mt-2 font-mono">
                          What is evaluation of <code>True and False</code>? (True, False)
                        </p>
                      </div>

                      {bossRepaired.q4 ? (
                        <span className="text-xs font-bold text-emerald-400 flex items-center gap-1"><CheckCircle2 className="size-4" /> Repaired</span>
                      ) : (
                        <div className="flex gap-2">
                          <input 
                            type="text" 
                            placeholder="Type response..."
                            value={bossAnswers.q4}
                            onChange={e => setBossAnswers(prev => ({ ...prev, q4: e.target.value }))}
                            className="flex-1 bg-slate-900 border border-purple-900/40 rounded p-1 text-xs font-mono text-white outline-none"
                          />
                          <button onClick={() => handleBossSubmit("q4", "False")} className="px-3 bg-pink-600 hover:bg-pink-500 text-xs font-bold rounded text-white">Fix</button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

            </div>
          </div>
        )}

        {activeScreen === "completion" && (
          <div className="flex-1 flex flex-col items-center justify-center p-8 text-center max-w-2xl mx-auto space-y-8 animate-in zoom-in duration-500">
            <div className="size-24 rounded-full bg-gradient-to-tr from-pink-500 to-purple-500 flex items-center justify-center text-5xl shadow-[0_0_30px_rgba(236,72,153,0.5)] animate-bounce">
              👑
            </div>

            <div className="space-y-2">
              <span className="px-3 py-1 bg-pink-500/10 border border-pink-500/30 rounded-full text-xs font-extrabold text-pink-300 uppercase tracking-widest font-mono">Show Saved</span>
              <h2 className="text-3xl font-black text-white">Python Talent Show Director complete!</h2>
              <p className="text-sm text-slate-400">
                You successfully managed variables, mapped dynamic data type costumes, calculated arithmetic cannon values, and converted types under strict constraints!
              </p>
            </div>

            <div className="bg-[#140c1e] border border-purple-900/40 p-6 rounded-2xl w-full grid grid-cols-2 gap-4">
              <div className="text-center p-3 bg-slate-950/50 rounded-xl border border-slate-900">
                <span className="text-xs text-slate-500 uppercase block mb-1">XP Earned</span>
                <span className="text-xl font-black text-pink-400">{xp}</span>
              </div>
              <div className="text-center p-3 bg-slate-950/50 rounded-xl border border-slate-900">
                <span className="text-xs text-slate-500 uppercase block mb-1">Badges Unlocked</span>
                <span className="text-xl font-black text-purple-400">{badges.filter(b => b.unlocked).length} / 7</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 justify-center">
              {badges.filter(b => b.unlocked).map(b => (
                <div key={b.id} className="bg-yellow-500/10 border border-yellow-500/30 px-3 py-1.5 rounded-full text-xs font-bold text-yellow-300 flex items-center gap-1.5">
                  <span>{b.icon}</span>
                  <span>{b.name}</span>
                </div>
              ))}
            </div>

            <button 
              onClick={() => {
                setActiveScreen("lobby");
              }}
              className="px-8 py-3 bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 text-white font-bold rounded-xl transition-all scale-105 hover:scale-110"
            >
              Return to Lobby
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
