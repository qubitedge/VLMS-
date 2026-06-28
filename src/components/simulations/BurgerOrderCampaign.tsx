import React, { useState, useEffect } from "react";
import { 
  Play, RotateCcw, ArrowRight, CheckCircle2, Star, Sparkles, 
  HelpCircle, AlertOctagon, RefreshCw, Zap, Volume2, ShieldCheck, 
  Award, Trash2, ShieldAlert, ShoppingCart, User, Calculator, Printer
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

export function BurgerOrderCampaign({ expId }: CampaignProps) {
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
    { id: "input_taken", name: "Greeter Cashier", desc: "Successfully took string inputs using input()", icon: "💬", unlocked: false },
    { id: "type_casted", name: "Type Caster", desc: "Successfully converted string inputs to numeric types", icon: "✨", unlocked: false },
    { id: "bill_calculated", name: "Accountant", desc: "Calculated numeric receipts", icon: "🧮", unlocked: false },
    { id: "fstring_master", name: "F-String Ninja", desc: "Formatted receipts using dynamic f-strings", icon: "🧾", unlocked: false },
    { id: "format_master", name: "Format Scholar", desc: "Formatted text using older format() method", icon: "📜", unlocked: false },
    { id: "error_survivor", name: "Safety Inspector", desc: "Exploded the cash register with ValueError", icon: "💥", unlocked: false },
    { id: "rush_saver", name: "Rush Hour Hero", desc: "Cleared the billing sprint before the timer ended", icon: "🏃", unlocked: false }
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
    "Welcome Customer (input)",
    "Take Burger Quantity (str)",
    "Conversion Machine (int)",
    "Calculate Bill (math)",
    "Floating Price Challenge (float)",
    "Fancy Receipt Printer (f-strings)",
    "Pi Formatting Challenge (precision)",
    "format() Method Placeholders",
    "ValueError Exploding register",
    "Final Boss: Rush Hour Billing"
  ];

  // --- STAGE-SPECIFIC STATES ---
  
  // Stage 1: Welcome Customer
  const [s1Name, setS1Name] = useState("");
  const [s1Memory, setS1Memory] = useState<{name: string; value: string; type: string} | null>(null);

  // Stage 2: Take Burger Quantity
  const [s2Qty, setS2Qty] = useState("");
  const [s2Memory, setS2Memory] = useState<{name: string; value: string; type: string} | null>(null);

  // Stage 3: Conversion Machine
  const [s3Casted, setS3Casted] = useState(false);

  // Stage 4: Calculate Bill
  const [s4Bill, setS4Bill] = useState<number | null>(null);

  // Stage 5: Floating Price Challenge
  const [s5Price, setS5Price] = useState("");
  const [s5CastedPrice, setS5CastedPrice] = useState<number | null>(null);

  // Stage 6: Fancy Receipt Printer
  const [s6Receipt, setS6Receipt] = useState<string | null>(null);

  // Stage 7: Pi Formatting Challenge
  const [s7TaxPrecision, setS7TaxPrecision] = useState("");
  const [s7FormattedTax, setS7FormattedTax] = useState("");

  // Stage 8: format() Method Placeholders
  const [s8FormatVal1, setS8FormatVal1] = useState("");
  const [s8FormatVal2, setS8FormatVal2] = useState("");
  const [s8Receipt, setS8Receipt] = useState("");

  // Stage 9: ValueError Exploding register
  const [s9InputVal, setS9InputVal] = useState("");
  const [s9Exploded, setS9Exploded] = useState(false);
  const [s9Error, setS9Error] = useState("");

  // Stage 10: Final Boss Rush Hour Billing
  const [bossTimer, setBossTimer] = useState(60);
  const [bossActive, setBossActive] = useState(false);
  const [bossStep, setBossStep] = useState(0);
  const [bossAnswers, setBossAnswers] = useState({ name: "", qty: "", total: "", print: "" });
  const [bossComplete, setBossComplete] = useState(false);

  // Boss Timer Effect
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (bossActive && bossTimer > 0 && !bossComplete) {
      timer = setTimeout(() => {
        setBossTimer(prev => prev - 1);
      }, 1000);
    }
    return () => clearTimeout(timer);
  }, [bossActive, bossTimer, bossComplete]);

  // STAGE HANDLERS

  // Stage 1 Welcome
  const handleS1Submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!s1Name.trim()) return;
    setS1Memory({ name: "name", value: `"${s1Name.trim()}"`, type: "str" });
    unlockBadge("input_taken");
    addXp(40, "Greeted customer using input()!");
    setTimeout(() => setStageIndex(1), 2000);
  };

  // Stage 2 Quantity
  const handleS2Submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!s2Qty.trim()) return;
    setS2Memory({ name: "qty", value: `"${s2Qty.trim()}"`, type: "str" });
    addCoins(10);
    setTimeout(() => setStageIndex(2), 2000);
  };

  // Stage 3 Cast to Int
  const handleS3Cast = () => {
    setS3Casted(true);
    addXp(50, "Quantity successfully converted string -> int!");
    unlockBadge("type_casted");
    setTimeout(() => setStageIndex(3), 2000);
  };

  // Stage 4 Calculate
  const handleS4Calc = () => {
    setS4Bill(3 * 50); // quantity 3 * ₹50
    addXp(50, "Arithmetic bill calculated!");
    unlockBadge("bill_calculated");
    setTimeout(() => setStageIndex(4), 2000);
  };

  // Stage 5 Float price conversion
  const handleS5Cast = () => {
    const val = parseFloat(s5Price);
    if (!isNaN(val)) {
      setS5CastedPrice(val);
      addCoins(15);
      setTimeout(() => setStageIndex(5), 2000);
    } else {
      triggerToast("Input must be a decimal string like '99.99'", "error");
    }
  };

  // Stage 6 Receipt Printer f-strings
  const handleS6Print = () => {
    const nameStr = s1Name || "Alice";
    const billVal = s4Bill || 150;
    setS6Receipt(`Hello ${nameStr}, Total Bill = ₹${billVal}`);
    addXp(65, "Printed receipt using f-strings!");
    unlockBadge("fstring_master");
    setTimeout(() => setStageIndex(6), 2500);
  };

  // Stage 7 Precision Tax
  const handleS7Print = () => {
    if (s7TaxPrecision === ":.2f") {
      setS7FormattedTax("3.14");
      addXp(50, "Floating precision formatted to 2 decimals!");
      setTimeout(() => setStageIndex(7), 2000);
    } else {
      triggerToast("Invalid format modifier! Try using ':.2f'", "error");
    }
  };

  // Stage 8 Old Format matching
  const handleS8Print = () => {
    const nameStr = s1Name || "Alice";
    const billVal = s4Bill || 150;
    if (s8FormatVal1 === "name" && s8FormatVal2 === "bill") {
      setS8Receipt(`Hello ${nameStr}, Your bill is ₹${billVal}`);
      addXp(50, "Formatted receipt placeholders successfully!");
      unlockBadge("format_master");
      setTimeout(() => setStageIndex(8), 2000);
    } else {
      triggerToast("Placeholders mismatch. Check variable names!", "error");
    }
  };

  // Stage 9 Exploding register ValueError
  const handleS9Submit = () => {
    if (s9InputVal.trim() === "three") {
      setS9Exploded(true);
      setS9Error("ValueError: invalid literal for int() with base 10: 'three'");
      unlockBadge("error_survivor");
      addXp(60, "ValueError register explosion triggered!");
      setTimeout(() => setStageIndex(9), 2500);
    } else {
      triggerToast("Type 'three' to trigger the ValueError register explosion!", "error");
    }
  };

  // Stage 10 Boss billing sprint
  const handleBossSubmit = () => {
    if (bossStep === 0) {
      if (bossAnswers.name.trim() === "Bob") {
        setBossStep(1);
        addCoins(20);
      } else {
        triggerToast("Check name input. Must enter 'Bob'!", "error");
      }
    } else if (bossStep === 1) {
      if (bossAnswers.qty.trim() === "4") {
        setBossStep(2);
        addCoins(20);
      } else {
        triggerToast("Cast quantity to integer '4'!", "error");
      }
    } else if (bossStep === 2) {
      // qty 4 * price 50 = ₹200
      if (bossAnswers.total.trim() === "200") {
        setBossStep(3);
        addCoins(20);
      } else {
        triggerToast("Check total calculation!", "error");
      }
    } else if (bossStep === 3) {
      const targetPrint = 'Bob ordered 4 burgers';
      const cleanInput = bossAnswers.print.trim().replace(/['"]/g, "");
      if (cleanInput === targetPrint) {
        setBossComplete(true);
        unlockBadge("rush_saver");
        addXp(150, "Rush Hour Completed!");
        setTimeout(() => {
          setActiveScreen("completion");
        }, 2000);
      } else {
        triggerToast("Format f-string output exactly: 'Bob ordered 4 burgers'", "error");
      }
    }
  };

  return (
    <div className="flex flex-col h-full bg-[#0d0f11] text-slate-100 font-sans select-none overflow-hidden relative">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(249,115,22,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(249,115,22,0.03)_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

      {/* Header */}
      <header className="flex items-center justify-between px-6 py-4 bg-[#171a1d] border-b border-orange-500/20 relative z-10 shrink-0">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-gradient-to-tr from-orange-600 to-amber-500 rounded-lg text-white shadow-[0_0_15px_rgba(249,115,22,0.4)]">
            <ShoppingCart className="size-6 animate-pulse" />
          </div>
          <div>
            <h1 className="font-extrabold text-xl tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-amber-400 to-yellow-400">
              PYTHON BURGER SHOP
            </h1>
            <p className="text-[10px] text-orange-300 tracking-widest uppercase">The Smart Cashier Challenge Console</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 bg-orange-950/40 border border-orange-500/20 px-3 py-1.5 rounded-full text-xs font-bold text-orange-200">
            <Star className="size-4 text-yellow-400 fill-yellow-400 animate-bounce" />
            <span>{xp} XP</span>
          </div>
          <div className="flex items-center gap-2 bg-yellow-950/40 border border-yellow-500/20 px-3 py-1.5 rounded-full text-xs font-bold text-yellow-200">
            <Zap className="size-4 text-cyan-400 fill-cyan-400" />
            <span>{coins} Coins</span>
          </div>
          <button 
            onClick={() => setActiveScreen("lobby")} 
            className="px-4 py-1.5 bg-[#262b30] hover:bg-[#343a40] border border-orange-500/30 hover:border-orange-400 text-xs font-bold rounded-lg transition-all"
          >
            Cashier Lobby
          </button>
        </div>
      </header>

      {/* Toast Overlay */}
      {toast && (
        <div className={`absolute top-20 left-1/2 -translate-x-1/2 px-6 py-3 rounded-xl shadow-2xl animate-in slide-in-from-top-10 z-50 font-bold flex items-center gap-3 border ${
          toast.type === "error" ? "bg-red-950/95 text-red-300 border-red-500/50" : 
          toast.type === "xp" ? "bg-orange-950/95 text-orange-200 border-orange-500/50" :
          toast.type === "badge" ? "bg-yellow-950/95 text-yellow-200 border-yellow-500/50 animate-bounce" :
          "bg-green-950/95 text-green-200 border-green-500/50"
        }`}>
          <Sparkles className="size-5 text-yellow-400 animate-pulse" />
          <span className="text-sm font-mono">{toast.message}</span>
        </div>
      )}

      {/* Stage Layout Display */}
      <main className="flex-1 min-h-0 relative flex flex-col">
        {activeScreen === "lobby" && (
          <div className="flex-1 p-8 overflow-y-auto max-w-6xl mx-auto w-full space-y-8 animate-in fade-in duration-500">
            {/* Introductory Jumbotron */}
            <div className="bg-gradient-to-r from-orange-950/20 to-slate-900/40 border border-orange-500/20 rounded-2xl p-6 flex flex-col md:flex-row items-center gap-6 shadow-2xl relative overflow-hidden">
              <div className="absolute right-0 top-0 size-64 bg-orange-500/5 rounded-full blur-3xl pointer-events-none" />
              <div className="text-6xl animate-bounce">🍔</div>
              <div className="space-y-2">
                <span className="px-3 py-1 bg-orange-500/10 border border-orange-500/30 rounded-full text-xs font-extrabold text-orange-300 uppercase tracking-widest">Register Operator Assignment</span>
                <h2 className="text-2xl font-black text-white">Can you cast customer quantities and print dynamic bills?</h2>
                <p className="text-sm text-slate-300 leading-relaxed max-w-3xl">
                  Greetings, Cashier! In this simulation, you will learn to read inputs using <code>input()</code>, understand why all inputs start as string data types, cast quantities to integers and decimal prices to floats, calculate bills, format precision values, print receipts using f-strings, and prevent ValueError cash register explosions!
                </p>
              </div>
            </div>

            {/* Stages Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2 space-y-3">
                <h3 className="font-extrabold text-sm text-orange-400 uppercase tracking-widest border-b border-orange-500/20 pb-2">Register Shifts</h3>
                
                <div className="grid grid-cols-1 gap-2">
                  {stageTitles.map((title, idx) => (
                    <div 
                      key={idx}
                      onClick={() => {
                        setStageIndex(idx);
                        setActiveScreen("game");
                        if (idx === 9) setBossActive(true);
                      }}
                      className="p-3.5 bg-[#171a1d] border border-orange-950 hover:border-orange-500/50 rounded-xl flex items-center justify-between cursor-pointer hover:scale-[1.01] transition-all"
                    >
                      <div className="flex items-center gap-3">
                        <div className="size-8 rounded-lg bg-orange-500/20 text-orange-400 flex items-center justify-center font-bold text-xs">
                          {idx + 1}
                        </div>
                        <span className="font-bold text-slate-200 text-sm">{title}</span>
                      </div>
                      <span className="text-xs font-semibold text-orange-400 uppercase flex items-center gap-1">Operate <ArrowRight className="size-4" /></span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Badges Box */}
              <div className="bg-[#171a1d] border border-orange-500/20 p-5 rounded-2xl space-y-4 shadow-xl">
                <h3 className="font-extrabold text-sm text-orange-300 uppercase tracking-widest flex items-center gap-2">
                  <Award className="size-5 text-yellow-500 animate-pulse" /> Cashier Badges
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
            {/* Sub-header navigation */}
            <div className="px-6 py-3 bg-[#171a1d] border-b border-orange-500/20 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-orange-400">Shift {stageIndex + 1}:</span>
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
                  onClick={() => {
                    setStageIndex(prev => prev + 1);
                    if (stageIndex + 1 === 9) setBossActive(true);
                  }}
                  className="px-3 py-1 bg-orange-600 hover:bg-orange-500 disabled:opacity-30 text-xs font-bold rounded"
                >
                  Next
                </button>
              </div>
            </div>

            {/* STAGE SCREEN SELECTOR */}
            <div className="flex-1 min-h-0 p-6 overflow-y-auto">
              
              {/* STAGE 1: Welcome Customer */}
              {stageIndex === 0 && (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-full min-h-[450px]">
                  <div className="bg-[#171a1d] rounded-2xl border border-orange-500/20 p-6 space-y-4">
                    <h3 className="font-extrabold text-sm text-orange-300 uppercase tracking-widest">Customer Counter</h3>
                    <p className="text-xs text-slate-400">
                      Welcome the customer and read their name. Type <strong>Alice</strong> to proceed:
                    </p>

                    <form onSubmit={handleS1Submit} className="space-y-4">
                      <div>
                        <span className="text-[10px] text-slate-500 font-mono block mb-1">name = input("Enter name: ")</span>
                        <input 
                          type="text"
                          value={s1Name}
                          onChange={e => setS1Name(e.target.value)}
                          placeholder="Type Alice..."
                          className="w-full bg-slate-950 border border-orange-500/20 rounded-lg p-2.5 text-xs font-mono text-white outline-none focus:border-orange-500"
                        />
                      </div>
                      <button type="submit" className="w-full py-2 bg-orange-600 hover:bg-orange-500 text-xs font-bold rounded-lg text-white">Submit Name</button>
                    </form>
                  </div>

                  {/* Visual Customer counter */}
                  <div className="lg:col-span-2 bg-[#171a1d] rounded-2xl border border-orange-500/20 p-6 flex flex-col justify-between items-center relative">
                    <div className="absolute top-4 left-4 text-xs font-bold text-orange-300 uppercase tracking-widest">Shop Stage</div>
                    
                    <div className="flex-1 flex flex-col items-center justify-center space-y-4">
                      <span className="text-6xl animate-bounce">👩‍💼</span>
                      <div className="bg-slate-950 p-4 rounded-xl border border-orange-500/10 text-center max-w-sm">
                        <span className="text-xs text-orange-400 block font-bold mb-1">Customer bubble:</span>
                        <p className="text-xs text-slate-200">"What's your name?"</p>
                      </div>
                    </div>

                    <div className="w-full bg-slate-950 p-4 rounded-xl border border-slate-900 font-mono text-xs flex justify-between">
                      <span>Variable Box:</span>
                      {s1Memory ? (
                        <span className="text-emerald-400">{s1Memory.name} = {s1Memory.value} (Type: {s1Memory.type})</span>
                      ) : (
                        <span className="text-slate-600 italic">Memory Empty</span>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* STAGE 2: Take Burger Quantity */}
              {stageIndex === 1 && (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-full min-h-[450px]">
                  <div className="bg-[#171a1d] rounded-2xl border border-orange-500/20 p-6 space-y-4">
                    <h3 className="font-extrabold text-sm text-orange-300 uppercase tracking-widest font-mono">input() string warning</h3>
                    <p className="text-xs text-slate-400">
                      Even if numbers are entered through <code>input()</code>, Python still stores them as text strings! Enter <strong>3</strong> below:
                    </p>

                    <form onSubmit={handleS2Submit} className="space-y-4">
                      <div>
                        <span className="text-[10px] text-slate-500 font-mono block mb-1">qty = input("Enter quantity: ")</span>
                        <input 
                          type="text"
                          value={s2Qty}
                          onChange={e => setS2Qty(e.target.value)}
                          placeholder="Type 3..."
                          className="w-full bg-slate-950 border border-orange-500/20 rounded-lg p-2.5 text-xs font-mono text-white outline-none focus:border-orange-500"
                        />
                      </div>
                      <button type="submit" className="w-full py-2 bg-orange-600 hover:bg-orange-500 text-xs font-bold rounded-lg text-white">Submit Quantity</button>
                    </form>
                  </div>

                  <div className="lg:col-span-2 bg-[#171a1d] rounded-2xl border border-orange-500/20 p-6 flex flex-col justify-between items-center">
                    <h3 className="font-extrabold text-sm text-orange-300 uppercase tracking-widest self-start">Stage Counter</h3>

                    <div className="flex-1 flex flex-col items-center justify-center space-y-4">
                      <span className="text-6xl animate-bounce">👩‍💼</span>
                      <div className="bg-slate-950 p-4 rounded-xl border border-orange-500/10 text-center max-w-sm">
                        <span className="text-xs text-orange-400 block font-bold mb-1">Customer:</span>
                        <p className="text-xs text-slate-200">"I want 3 burgers."</p>
                      </div>
                    </div>

                    {s2Memory && (
                      <div className="w-full bg-red-950/20 border border-red-500/20 p-4 rounded-xl flex items-center justify-between text-xs text-red-300 font-mono animate-pulse">
                        <span>⚠️ Still a String: <code>qty = {s2Memory.value}</code></span>
                        <span>Type: str</span>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* STAGE 3: Conversion Machine */}
              {stageIndex === 2 && (
                <div className="bg-[#171a1d] rounded-2xl border border-orange-500/20 p-6 flex flex-col justify-between items-center min-h-[450px]">
                  <h3 className="font-extrabold text-sm text-orange-300 uppercase tracking-widest self-start">Type Casting</h3>

                  <div className="flex-1 flex flex-col items-center justify-center space-y-6 w-full">
                    <div className="flex items-center gap-12">
                      <div className="p-4 bg-slate-950 rounded-xl border border-orange-500/15 font-mono text-sm text-red-400">
                        qty_str = "3"
                      </div>
                      
                      <div className="size-16 rounded-full bg-orange-600 flex items-center justify-center font-bold text-white shadow-lg animate-spin">
                        int()
                      </div>

                      <div className={`p-4 bg-slate-950 rounded-xl border font-mono text-sm transition-all ${
                        s3Casted ? "border-emerald-500 text-emerald-400" : "border-slate-800 text-slate-600"
                      }`}>
                        {s3Casted ? "qty = 3" : "qty = ??"}
                      </div>
                    </div>

                    <button 
                      onClick={handleS3Cast}
                      className="px-8 py-3.5 bg-orange-600 hover:bg-orange-500 text-white font-bold rounded-xl shadow-lg transition-transform hover:scale-105"
                    >
                      Run Integer Machine
                    </button>
                  </div>

                  {s3Casted && (
                    <div className="w-full bg-emerald-950/20 border border-emerald-500/20 p-4 rounded-xl text-center text-xs font-bold text-emerald-400">
                      🎉 Type Conversion Complete! Variable type is now: <code>int</code>
                    </div>
                  )}
                </div>
              )}

              {/* STAGE 4: Calculate Bill */}
              {stageIndex === 3 && (
                <div className="bg-[#171a1d] rounded-2xl border border-orange-500/20 p-6 flex flex-col justify-between items-center min-h-[450px]">
                  <h3 className="font-extrabold text-sm text-orange-300 uppercase tracking-widest self-start">Bill calculator</h3>

                  <div className="flex-1 flex flex-col items-center justify-center space-y-6">
                    <div className="grid grid-cols-3 gap-6 items-center">
                      <div className="bg-slate-950 p-4 rounded-xl border border-orange-500/10 text-center">
                        <span className="text-[10px] text-slate-500 uppercase block mb-1">Burger Price</span>
                        <span className="font-bold text-white text-lg">₹50</span>
                      </div>
                      <span className="font-mono text-2xl text-orange-400 text-center">×</span>
                      <div className="bg-slate-950 p-4 rounded-xl border border-orange-500/10 text-center">
                        <span className="text-[10px] text-slate-500 uppercase block mb-1">Quantity (int)</span>
                        <span className="font-bold text-white text-lg">3</span>
                      </div>
                    </div>

                    <button 
                      onClick={handleS4Calc}
                      className="px-8 py-3.5 bg-orange-600 hover:bg-orange-500 text-white font-bold rounded-xl shadow-lg"
                    >
                      Calculate Total
                    </button>
                  </div>

                  {s4Bill !== null && (
                    <div className="w-full bg-slate-950 p-4 rounded-xl border border-slate-900 font-mono text-center text-xs text-orange-400">
                      Bill expression: <code>3 * 50 = ₹150</code>
                    </div>
                  )}
                </div>
              )}

              {/* STAGE 5: Floating Price Challenge */}
              {stageIndex === 4 && (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-full min-h-[450px]">
                  <div className="bg-[#171a1d] rounded-2xl border border-orange-500/20 p-6 space-y-4">
                    <h3 className="font-extrabold text-sm text-orange-300 uppercase tracking-widest">Float Machine</h3>
                    <p className="text-xs text-slate-400">
                      Decimal numbers require the <code>float</code> type. Enter special price <strong>99.99</strong> below:
                    </p>

                    <div className="space-y-4">
                      <input 
                        type="text" 
                        value={s5Price} 
                        onChange={e => setS5Price(e.target.value)}
                        placeholder="Type 99.99..."
                        className="w-full bg-slate-950 border border-orange-500/20 rounded-lg p-2.5 text-xs font-mono text-white outline-none focus:border-orange-500"
                      />
                      <button 
                        onClick={handleS5Cast}
                        className="w-full py-2 bg-orange-600 hover:bg-orange-500 text-xs font-bold rounded-lg text-white"
                      >
                        Convert to Float
                      </button>
                    </div>
                  </div>

                  <div className="lg:col-span-2 bg-[#171a1d] rounded-2xl border border-orange-500/20 p-6 flex flex-col justify-center items-center">
                    <div className="bg-slate-950 p-6 rounded-2xl border border-orange-500/10 text-center w-64 space-y-4">
                      <span className="text-[10px] text-orange-400 font-mono uppercase block">Float Register</span>
                      <div className="font-mono text-2xl font-black text-white">
                        {s5CastedPrice ? `₹${s5CastedPrice}` : "₹??"}
                      </div>
                      <span className="px-3 py-1 bg-cyan-950 text-cyan-300 border border-cyan-500/20 rounded font-mono text-xs block">
                        Type: {s5CastedPrice ? "float" : "str"}
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* STAGE 6: Fancy Receipt Printer */}
              {stageIndex === 5 && (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-full min-h-[450px]">
                  <div className="bg-[#171a1d] rounded-2xl border border-orange-500/20 p-6 flex flex-col justify-between">
                    <div className="space-y-4">
                      <h3 className="font-extrabold text-sm text-orange-300 uppercase tracking-widest">Receipt Template</h3>
                      <p className="text-xs text-slate-400">
                        An <strong>f-string</strong> dynamically parses expressions inside braces <code>{}</code> prefixed with <code>f</code>.
                      </p>

                      <div className="bg-slate-950 p-4 rounded-xl border border-slate-900 font-mono text-xs text-orange-300">
                        f"Hello {"{"}name{"}"}, Total Bill = ₹{"{"}bill{"}"}"
                      </div>
                    </div>

                    <button 
                      onClick={handleS6Print}
                      className="w-full py-2.5 bg-orange-600 hover:bg-orange-500 text-xs font-bold text-white rounded-xl shadow-lg"
                    >
                      Print Receipt
                    </button>
                  </div>

                  <div className="lg:col-span-2 bg-[#171a1d] rounded-2xl border border-orange-500/20 p-6 flex flex-col justify-center items-center relative">
                    <div className="absolute top-4 left-4 text-xs font-bold text-orange-300 uppercase tracking-widest">stdout receipt printer</div>
                    
                    <div className="bg-white text-slate-900 p-6 rounded shadow-2xl w-64 font-mono text-xs min-h-[160px] relative border-t-8 border-orange-500 animate-in slide-in-from-top-20 duration-1000">
                      <div className="text-center font-bold uppercase tracking-wider mb-4 border-b pb-2">Python Burger Shop</div>
                      
                      {s6Receipt ? (
                        <div className="space-y-1">
                          <p>{s6Receipt.split(",")[0]},</p>
                          <p className="font-extrabold">{s6Receipt.split(",")[1]}</p>
                        </div>
                      ) : (
                        <div className="text-center text-slate-400 italic py-6">Receipt paper empty</div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* STAGE 7: Pi Formatting Challenge */}
              {stageIndex === 6 && (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-full min-h-[450px]">
                  <div className="bg-[#171a1d] rounded-2xl border border-orange-500/20 p-6 space-y-4">
                    <h3 className="font-extrabold text-sm text-orange-300 uppercase tracking-widest">Formatting Precision</h3>
                    <p className="text-xs text-slate-400">
                      Format floating points to exactly 2 decimal places. Enter the format specifier modifier: (eg. <strong>:.2f</strong>)
                    </p>

                    <div className="space-y-4">
                      <div>
                        <span className="text-[10px] text-slate-500 font-mono block mb-1">f"{"{"}3.14159[modifier]{"}"}"</span>
                        <input 
                          type="text" 
                          value={s7TaxPrecision} 
                          onChange={e => setS7TaxPrecision(e.target.value)}
                          placeholder="Type :.2f..."
                          className="w-full bg-slate-950 border border-orange-500/20 rounded-lg p-2.5 text-xs font-mono text-white outline-none focus:border-orange-500"
                        />
                      </div>
                      <button 
                        onClick={handleS7Print}
                        className="w-full py-2 bg-orange-600 hover:bg-orange-500 text-xs font-bold rounded-lg text-white"
                      >
                        Format Tax Value
                      </button>
                    </div>
                  </div>

                  <div className="lg:col-span-2 bg-[#171a1d] rounded-2xl border border-orange-500/20 p-6 flex flex-col justify-center items-center">
                    <div className="bg-slate-950 p-6 rounded-2xl border border-orange-500/10 text-center w-64 space-y-2">
                      <span className="text-[10px] text-orange-400 font-mono uppercase block">Precision Registry</span>
                      <div className="font-mono text-2xl font-black text-white">
                        {s7FormattedTax ? s7FormattedTax : "3.14159"}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* STAGE 8: format() Method Placeholders */}
              {stageIndex === 7 && (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-full min-h-[450px]">
                  <div className="bg-[#171a1d] rounded-2xl border border-orange-500/20 p-6 space-y-4 flex flex-col justify-between">
                    <div className="space-y-4">
                      <h3 className="font-extrabold text-sm text-orange-300 uppercase tracking-widest">format() Placeholders</h3>
                      <p className="text-xs text-slate-400">
                        Fill in variables in the older format method: <code>"Hello {"{}"}, Your bill is ₹{"{}"}".format(var1, var2)</code>
                      </p>

                      <div className="space-y-2">
                        <div>
                          <label className="text-[10px] text-slate-500 font-mono block mb-1">var1 (name variable)</label>
                          <input 
                            type="text" 
                            value={s8FormatVal1} 
                            onChange={e => setS8FormatVal1(e.target.value)}
                            placeholder="name"
                            className="w-full bg-slate-950 border border-orange-500/20 rounded p-1 text-xs font-mono text-white outline-none"
                          />
                        </div>

                        <div>
                          <label className="text-[10px] text-slate-500 font-mono block mb-1">var2 (bill variable)</label>
                          <input 
                            type="text" 
                            value={s8FormatVal2} 
                            onChange={e => setS8FormatVal2(e.target.value)}
                            placeholder="bill"
                            className="w-full bg-slate-950 border border-orange-500/20 rounded p-1 text-xs font-mono text-white outline-none"
                          />
                        </div>
                      </div>
                    </div>

                    <button 
                      onClick={handleS8Print}
                      className="w-full py-2.5 bg-orange-600 hover:bg-orange-500 text-xs font-bold text-white rounded-xl shadow-lg"
                    >
                      Fill format() Placeholders
                    </button>
                  </div>

                  <div className="lg:col-span-2 bg-[#171a1d] rounded-2xl border border-orange-500/20 p-6 flex flex-col justify-center items-center">
                    <div className="bg-slate-950 p-6 rounded-2xl border border-orange-500/10 text-center w-64 space-y-2">
                      <span className="text-[10px] text-orange-400 font-mono uppercase block">format() Output</span>
                      <div className="font-mono text-xs text-slate-300">
                        {s8Receipt ? s8Receipt : "Hello {}, Your bill is ₹{}"}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* STAGE 9: ValueError register explosion */}
              {stageIndex === 8 && (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-full min-h-[450px]">
                  <div className="bg-[#171a1d] rounded-2xl border border-orange-500/20 p-6 space-y-4">
                    <h3 className="font-extrabold text-sm text-orange-300 uppercase tracking-widest">Invalid inputs</h3>
                    <p className="text-xs text-slate-400 font-mono">
                      Type <strong>three</strong> to test ValueError conversions:
                    </p>

                    <div className="space-y-4">
                      <input 
                        type="text" 
                        value={s9InputVal} 
                        onChange={e => setS9InputVal(e.target.value)}
                        placeholder="Type three..."
                        className="w-full bg-slate-950 border border-orange-500/20 rounded-lg p-2.5 text-xs font-mono text-white outline-none focus:border-orange-500"
                      />
                      <button 
                        onClick={handleS9Submit}
                        className="w-full py-2 bg-orange-600 hover:bg-orange-500 text-xs font-bold rounded-lg text-white"
                      >
                        Convert int()
                      </button>
                    </div>
                  </div>

                  <div className="lg:col-span-2 bg-[#171a1d] rounded-2xl border border-orange-500/20 p-6 flex flex-col justify-center items-center relative">
                    {s9Exploded && (
                      <div className="absolute inset-0 bg-red-950/20 flex items-center justify-center backdrop-blur-sm z-20 animate-in fade-in duration-300">
                        <div className="bg-red-950 border border-red-500 p-6 rounded-xl text-center space-y-3 max-w-sm shadow-2xl">
                          <span className="text-5xl block animate-bounce">💥</span>
                          <h4 className="font-extrabold text-white text-xs uppercase tracking-widest">🚨 ValueError Failure</h4>
                          <p className="text-[10px] text-red-300 font-mono leading-normal">{s9Error}</p>
                        </div>
                      </div>
                    )}

                    <div className="bg-slate-950 p-6 rounded-2xl border border-orange-500/10 text-center w-64 space-y-3">
                      <span className="text-[10px] text-orange-400 font-mono uppercase block">Cash Register status</span>
                      <div className="font-mono text-lg text-slate-400">int("three")</div>
                    </div>
                  </div>
                </div>
              )}

              {/* STAGE 10: Final Boss Rush Hour */}
              {stageIndex === 9 && (
                <div className="bg-[#171a1d] rounded-2xl border border-orange-500/20 p-6 space-y-6 min-h-[450px]">
                  <div className="flex justify-between items-center">
                    <h3 className="font-extrabold text-sm text-orange-300 uppercase tracking-widest flex items-center gap-2">
                      <Zap className="text-orange-500 size-4 animate-bounce" /> Rush Hour Billing Sprint
                    </h3>
                    <span className="text-red-400 font-mono font-bold text-sm">Timer: {bossTimer}s</span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    {/* Step 1 */}
                    <div className={`p-4 rounded-xl border flex flex-col justify-between h-[180px] ${
                      bossStep > 0 ? "bg-emerald-950/10 border-emerald-500/30" : "bg-slate-950 border-orange-500/10"
                    }`}>
                      <div>
                        <span className="text-[10px] text-slate-500 uppercase block font-bold">Step 1: Enter Name</span>
                        <p className="text-xs text-slate-300 mt-2 font-mono">
                          Customer name is Bob.<br />
                          Enter customer name:
                        </p>
                      </div>

                      {bossStep > 0 ? (
                        <span className="text-xs font-bold text-emerald-400 flex items-center gap-1"><CheckCircle2 className="size-4" /> Solved</span>
                      ) : (
                        <div className="flex gap-2">
                          <input 
                            type="text" 
                            placeholder="Bob"
                            value={bossAnswers.name}
                            onChange={e => setBossAnswers(prev => ({ ...prev, name: e.target.value }))}
                            className="flex-1 bg-slate-900 border border-orange-500/20 rounded p-1 text-xs font-mono text-white outline-none"
                          />
                          <button onClick={handleBossSubmit} className="px-3 bg-orange-600 text-xs font-bold rounded text-white">Next</button>
                        </div>
                      )}
                    </div>

                    {/* Step 2 */}
                    <div className={`p-4 rounded-xl border flex flex-col justify-between h-[180px] ${
                      bossStep > 1 ? "bg-emerald-950/10 border-emerald-500/30" : "bg-slate-950 border-orange-500/10"
                    }`}>
                      <div>
                        <span className="text-[10px] text-slate-500 uppercase block font-bold">Step 2: Cast Quantity</span>
                        <p className="text-xs text-slate-300 mt-2 font-mono">
                          Bob wants "4" burgers.<br />
                          Convert quantity "4" to int:
                        </p>
                      </div>

                      {bossStep > 1 ? (
                        <span className="text-xs font-bold text-emerald-400 flex items-center gap-1"><CheckCircle2 className="size-4" /> Solved</span>
                      ) : (
                        <div className="flex gap-2">
                          <input 
                            type="text" 
                            placeholder="4"
                            value={bossAnswers.qty}
                            onChange={e => setBossAnswers(prev => ({ ...prev, qty: e.target.value }))}
                            className="flex-1 bg-slate-900 border border-orange-500/20 rounded p-1 text-xs font-mono text-white outline-none"
                          />
                          <button onClick={handleBossSubmit} className="px-3 bg-orange-600 text-xs font-bold rounded text-white">Next</button>
                        </div>
                      )}
                    </div>

                    {/* Step 3 */}
                    <div className={`p-4 rounded-xl border flex flex-col justify-between h-[180px] ${
                      bossStep > 2 ? "bg-emerald-950/10 border-emerald-500/30" : "bg-slate-950 border-orange-500/10"
                    }`}>
                      <div>
                        <span className="text-[10px] text-slate-500 uppercase block font-bold">Step 3: Calculate total</span>
                        <p className="text-xs text-slate-300 mt-2 font-mono">
                          Price is ₹50.<br />
                          Calculate total for 4 burgers:
                        </p>
                      </div>

                      {bossStep > 2 ? (
                        <span className="text-xs font-bold text-emerald-400 flex items-center gap-1"><CheckCircle2 className="size-4" /> Solved</span>
                      ) : (
                        <div className="flex gap-2">
                          <input 
                            type="text" 
                            placeholder="200"
                            value={bossAnswers.total}
                            onChange={e => setBossAnswers(prev => ({ ...prev, total: e.target.value }))}
                            className="flex-1 bg-slate-900 border border-orange-500/20 rounded p-1 text-xs font-mono text-white outline-none"
                          />
                          <button onClick={handleBossSubmit} className="px-3 bg-orange-600 text-xs font-bold rounded text-white">Next</button>
                        </div>
                      )}
                    </div>

                    {/* Step 4 */}
                    <div className={`p-4 rounded-xl border flex flex-col justify-between h-[180px] ${
                      bossComplete ? "bg-emerald-950/10 border-emerald-500/30" : "bg-slate-950 border-orange-500/10"
                    }`}>
                      <div>
                        <span className="text-[10px] text-slate-500 uppercase block font-bold">Step 4: Print Receipt</span>
                        <p className="text-xs text-slate-300 mt-2 font-mono">
                          Output format: <code>f"{"{"}name{"}"} ordered {"{"}qty{"}"} burgers"</code>
                        </p>
                      </div>

                      {bossComplete ? (
                        <span className="text-xs font-bold text-emerald-400 flex items-center gap-1"><CheckCircle2 className="size-4" /> Complete</span>
                      ) : (
                        <div className="flex gap-2">
                          <input 
                            type="text" 
                            placeholder="Bob ordered 4 burgers"
                            value={bossAnswers.print}
                            onChange={e => setBossAnswers(prev => ({ ...prev, print: e.target.value }))}
                            className="flex-1 bg-slate-900 border border-orange-500/20 rounded p-1 text-xs font-mono text-white outline-none"
                          />
                          <button onClick={handleBossSubmit} className="px-3 bg-orange-600 text-xs font-bold rounded text-white">Solve</button>
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
            <div className="size-24 rounded-full bg-gradient-to-tr from-orange-500 to-amber-500 flex items-center justify-center text-5xl shadow-[0_0_30px_rgba(249,115,22,0.5)] animate-bounce">
              👑
            </div>

            <div className="space-y-2">
              <span className="px-3 py-1 bg-orange-500/10 border border-orange-500/30 rounded-full text-xs font-extrabold text-orange-300 uppercase tracking-widest font-mono">Shift Completed</span>
              <h2 className="text-3xl font-black text-white">You are now a Certified Store Accountant!</h2>
              <p className="text-sm text-slate-400">
                You successfully managed store register values, input string conversions, mathematical multiplication calculations, f-string printer operations, and handled ValueError explosions!
              </p>
            </div>

            <div className="bg-[#171a1d] border border-orange-500/20 p-6 rounded-2xl w-full grid grid-cols-2 gap-4">
              <div className="text-center p-3 bg-slate-950/50 rounded-xl border border-slate-900">
                <span className="text-xs text-slate-500 uppercase block mb-1">XP Earned</span>
                <span className="text-xl font-black text-orange-400">{xp}</span>
              </div>
              <div className="text-center p-3 bg-slate-950/50 rounded-xl border border-slate-900">
                <span className="text-xs text-slate-500 uppercase block mb-1">Badges Unlocked</span>
                <span className="text-xl font-black text-yellow-400">{badges.filter(b => b.unlocked).length} / 7</span>
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
              className="px-8 py-3 bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-505 text-white font-bold rounded-xl transition-all scale-105 hover:scale-110"
            >
              Return to Lobby
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
