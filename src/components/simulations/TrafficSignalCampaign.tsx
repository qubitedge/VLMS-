import React, { useState, useEffect } from "react";
import {
  Play, RotateCcw, ArrowRight, CheckCircle2, Star, Sparkles,
  HelpCircle, AlertOctagon, RefreshCw, Zap, ShieldCheck,
  Award, ShieldAlert, Eye, EyeOff, Car, Users, Siren, Timer,
  CloudRain, Sun, Moon, Wind, Gauge, AlertTriangle, Trophy
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

/* ────────────────────────────────────────────────────
   Traffic Signal Controller – Python Conditionals
   ──────────────────────────────────────────────────── */
export function TrafficSignalCampaign({ expId }: CampaignProps) {
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
    { id: "simple_if", name: "First Signal", desc: "Triggered your first green light with a simple if", icon: "🚦", unlocked: false },
    { id: "if_else", name: "Two-Way Officer", desc: "Handled both if and else paths", icon: "🔀", unlocked: false },
    { id: "elif_chain", name: "Chain Commander", desc: "Mastered if-elif-else chaining", icon: "⛓️", unlocked: false },
    { id: "logic_ops", name: "Logic Master", desc: "Combined conditions with and/or/not", icon: "🧠", unlocked: false },
    { id: "range_check", name: "Speed Inspector", desc: "Used range comparisons for speed limits", icon: "🏎️", unlocked: false },
    { id: "nested", name: "Deep Diver", desc: "Solved nested conditional puzzles", icon: "🪆", unlocked: false },
    { id: "error_fix", name: "Bug Squasher", desc: "Fixed the syntax error traffic jam", icon: "🐛", unlocked: false },
    { id: "rush_hero", name: "Rush Hour Hero", desc: "Cleared 5 events in the Boss Arena", icon: "🏆", unlocked: false },
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
    "Simple If – Green Light",
    "If-Else – Rain or Shine",
    "If-Elif-Else – Traffic Density",
    "Logical Operators – Priority Override",
    "Range Comparison – Speed Limit",
    "Nested Conditions – Night Ops",
    "Funny Mistake – Syntax Traffic Jam",
    "Boss: Rush Hour Challenge",
  ];

  const totalStages = stageTitles.length;

  /* ────────── Traffic Light Component ────────── */
  const TrafficLight = ({ active, size = "lg" }: { active: "red" | "yellow" | "green" | "off"; size?: "sm" | "lg" }) => {
    const s = size === "sm" ? "size-8" : "size-16";
    const gap = size === "sm" ? "gap-2 p-2" : "gap-3 p-4";
    const container = size === "sm" ? "w-14" : "w-24";
    return (
      <div className={`${container} bg-slate-900 rounded-2xl border-4 border-slate-700 flex flex-col items-center ${gap} shadow-[0_0_30px_rgba(0,0,0,0.6)]`}>
        <div className={`${s} rounded-full transition-all duration-700 ${active === "red" ? "bg-red-500 shadow-[0_0_30px_rgba(239,68,68,0.8)]" : "bg-red-950/40"}`} />
        <div className={`${s} rounded-full transition-all duration-700 ${active === "yellow" ? "bg-yellow-400 shadow-[0_0_30px_rgba(250,204,21,0.8)]" : "bg-yellow-950/40"}`} />
        <div className={`${s} rounded-full transition-all duration-700 ${active === "green" ? "bg-green-500 shadow-[0_0_30px_rgba(34,197,94,0.8)]" : "bg-green-950/40"}`} />
      </div>
    );
  };

  /* ────────── Code Panel with line highlighting ────────── */
  const CodePanel = ({ code, highlightLines = [], errorLine }: { code: string; highlightLines?: number[]; errorLine?: number }) => (
    <div className="bg-[#0d1117] rounded-xl border border-slate-800 p-4 font-mono text-sm overflow-x-auto">
      {code.split("\n").map((line, i) => {
        const lineNum = i + 1;
        const isHighlight = highlightLines.includes(lineNum);
        const isError = errorLine === lineNum;
        return (
          <div key={lineNum} className={`flex px-2 py-0.5 rounded transition-all duration-500 ${isError ? "bg-red-500/20 border-l-2 border-red-500" : isHighlight ? "bg-emerald-500/15 border-l-2 border-emerald-500" : "border-l-2 border-transparent"}`}>
            <span className="w-6 text-slate-600 select-none text-right mr-4 text-xs">{lineNum}</span>
            <span className={`${isError ? "text-red-400" : isHighlight ? "text-emerald-300" : "text-slate-400"}`}>{line || " "}</span>
          </div>
        );
      })}
    </div>
  );

  /* ────────── Memory Panel ────────── */
  const MemoryPanel = ({ vars }: { vars: { name: string; value: string; type: string }[] }) => (
    <div className="bg-slate-900/60 rounded-xl border border-slate-800 p-4">
      <div className="text-[10px] uppercase tracking-widest text-slate-500 mb-3 font-bold">Memory State</div>
      {vars.length === 0 ? (
        <div className="text-slate-600 text-xs italic text-center py-4">Empty</div>
      ) : (
        <div className="space-y-2">
          {vars.map((v, i) => (
            <div key={i} className="flex items-center gap-3 bg-slate-800/50 rounded-lg px-3 py-2 border border-slate-700/50">
              <span className="text-cyan-400 font-mono text-sm font-bold">{v.name}</span>
              <span className="text-slate-600">=</span>
              <span className="text-emerald-400 font-mono text-sm">{v.value}</span>
              <span className="ml-auto text-[10px] px-2 py-0.5 rounded bg-slate-700 text-slate-400 font-mono">{v.type}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  /* ──────────────────────────────────────────────
     STAGE 1: Simple If – Green Light
     ────────────────────────────────────────────── */
  const [s1Light, setS1Light] = useState<"red" | "green">("red");
  const [s1CarsWaiting, setS1CarsWaiting] = useState(false);
  const [s1Executed, setS1Executed] = useState(false);
  const [s1HighlightLines, setS1HighlightLines] = useState<number[]>([]);

  const runStage1 = async () => {
    setS1Executed(false);
    setS1Light("red");
    setS1HighlightLines([1]);
    await new Promise(r => setTimeout(r, 800));
    setS1HighlightLines([3]);
    await new Promise(r => setTimeout(r, 800));
    if (s1CarsWaiting) {
      setS1HighlightLines([4]);
      await new Promise(r => setTimeout(r, 600));
      setS1Light("green");
    } else {
      setS1HighlightLines([3]);
    }
    setS1Executed(true);
    addXp(50, "Simple if condition executed!");
    unlockBadge("simple_if");
    addCoins(10);
  };

  const renderStage1 = () => (
    <div className="flex-1 flex gap-6 min-h-0">
      {/* Left: Code + Memory */}
      <div className="flex-1 flex flex-col gap-4 overflow-y-auto">
        <div className="bg-gradient-to-r from-emerald-950/40 to-transparent rounded-xl border border-emerald-900/30 p-5">
          <h3 className="text-lg font-bold text-emerald-400 mb-1 flex items-center gap-2">
            <Zap className="size-5" /> Stage 1: Simple If
          </h3>
          <p className="text-slate-400 text-sm">If cars are waiting → turn the signal green. Otherwise, nothing happens.</p>
        </div>

        <CodePanel
          code={`cars_waiting = ${s1CarsWaiting}\n\nif cars_waiting:\n    signal = "GREEN"  # 🟢 Turn green!`}
          highlightLines={s1HighlightLines}
        />

        <MemoryPanel vars={[
          { name: "cars_waiting", value: String(s1CarsWaiting), type: "bool" },
          ...(s1Executed && s1CarsWaiting ? [{ name: "signal", value: '"GREEN"', type: "str" }] : []),
        ]} />

        {/* Toggle + Run */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => { setS1CarsWaiting(!s1CarsWaiting); setS1Executed(false); setS1Light("red"); setS1HighlightLines([]); }}
            className={`px-5 py-2.5 rounded-xl font-bold text-sm border transition-all ${s1CarsWaiting ? "bg-emerald-600 border-emerald-500 text-white" : "bg-slate-800 border-slate-700 text-slate-300"}`}
          >
            cars_waiting = {String(s1CarsWaiting)}
          </button>
          <button onClick={runStage1} className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm flex items-center gap-2 shadow-lg shadow-emerald-900/30">
            <Play className="size-4" /> Run Code
          </button>
        </div>
      </div>

      {/* Right: Traffic Light */}
      <div className="w-64 flex flex-col items-center justify-center gap-6 bg-slate-900/30 rounded-2xl border border-slate-800 p-6">
        <TrafficLight active={s1Light === "green" ? "green" : "red"} />
        <div className="text-center">
          <div className={`text-2xl font-black uppercase tracking-widest ${s1Light === "green" ? "text-green-400" : "text-red-400"}`}>
            {s1Light === "green" ? "GO" : "STOP"}
          </div>
          <div className="text-xs text-slate-500 mt-2">
            {s1CarsWaiting ? "🚗🚗🚗 Cars waiting..." : "No cars at intersection"}
          </div>
        </div>
        {s1Executed && (
          <button onClick={() => { setStageIndex(1); }} className="px-5 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm flex items-center gap-2 animate-pulse">
            Next Stage <ArrowRight className="size-4" />
          </button>
        )}
      </div>
    </div>
  );

  /* ──────────────────────────────────────────────
     STAGE 2: If-Else – Rain or Shine
     ────────────────────────────────────────────── */
  const [s2Raining, setS2Raining] = useState(false);
  const [s2Result, setS2Result] = useState<"umbrella" | "sun" | null>(null);
  const [s2Highlight, setS2Highlight] = useState<number[]>([]);

  const runStage2 = async () => {
    setS2Result(null);
    setS2Highlight([1]);
    await new Promise(r => setTimeout(r, 800));
    setS2Highlight([3]);
    await new Promise(r => setTimeout(r, 800));
    if (s2Raining) {
      setS2Highlight([4]);
      setS2Result("umbrella");
    } else {
      setS2Highlight([6]);
      setS2Result("sun");
    }
    addXp(50, "If-Else branching mastered!");
    unlockBadge("if_else");
    addCoins(10);
  };

  const renderStage2 = () => (
    <div className="flex-1 flex gap-6 min-h-0">
      <div className="flex-1 flex flex-col gap-4 overflow-y-auto">
        <div className="bg-gradient-to-r from-blue-950/40 to-transparent rounded-xl border border-blue-900/30 p-5">
          <h3 className="text-lg font-bold text-blue-400 mb-1 flex items-center gap-2">
            <CloudRain className="size-5" /> Stage 2: If-Else
          </h3>
          <p className="text-slate-400 text-sm">If it's raining, deploy umbrella protocol. Otherwise, enjoy the sunshine!</p>
        </div>

        <CodePanel
          code={`is_raining = ${s2Raining}\n\nif is_raining:\n    action = "Deploy Umbrella ☂️"\nelse:\n    action = "Enjoy Sunshine ☀️"`}
          highlightLines={s2Highlight}
        />

        <MemoryPanel vars={[
          { name: "is_raining", value: String(s2Raining), type: "bool" },
          ...(s2Result ? [{ name: "action", value: s2Result === "umbrella" ? '"Deploy Umbrella ☂️"' : '"Enjoy Sunshine ☀️"', type: "str" }] : []),
        ]} />

        <div className="flex items-center gap-4">
          <button
            onClick={() => { setS2Raining(!s2Raining); setS2Result(null); setS2Highlight([]); }}
            className={`px-5 py-2.5 rounded-xl font-bold text-sm border transition-all ${s2Raining ? "bg-blue-600 border-blue-500 text-white" : "bg-yellow-600 border-yellow-500 text-white"}`}
          >
            {s2Raining ? "🌧️ is_raining = True" : "☀️ is_raining = False"}
          </button>
          <button onClick={runStage2} className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm flex items-center gap-2 shadow-lg shadow-blue-900/30">
            <Play className="size-4" /> Run Code
          </button>
        </div>
      </div>

      {/* Right: Weather Visual */}
      <div className="w-64 flex flex-col items-center justify-center gap-6 bg-slate-900/30 rounded-2xl border border-slate-800 p-6">
        {s2Result === "umbrella" ? (
          <div className="flex flex-col items-center gap-4 animate-in slide-in-from-bottom-4">
            <CloudRain className="size-20 text-blue-400" />
            <div className="text-3xl">☂️</div>
            <div className="text-blue-400 font-bold text-lg">Umbrella Deployed!</div>
          </div>
        ) : s2Result === "sun" ? (
          <div className="flex flex-col items-center gap-4 animate-in slide-in-from-bottom-4">
            <Sun className="size-20 text-yellow-400" />
            <div className="text-yellow-400 font-bold text-lg">Enjoy the Sun!</div>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-4 text-slate-600">
            <Wind className="size-16" />
            <div className="font-bold">Waiting for decision...</div>
          </div>
        )}
        {s2Result && (
          <button onClick={() => setStageIndex(2)} className="px-5 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm flex items-center gap-2 animate-pulse">
            Next Stage <ArrowRight className="size-4" />
          </button>
        )}
      </div>
    </div>
  );

  /* ──────────────────────────────────────────────
     STAGE 3: If-Elif-Else – Traffic Density
     ────────────────────────────────────────────── */
  const [s3Density, setS3Density] = useState(50);
  const [s3Result, setS3Result] = useState<{ duration: number; color: string; label: string } | null>(null);
  const [s3Highlight, setS3Highlight] = useState<number[]>([]);

  const runStage3 = async () => {
    setS3Result(null);
    setS3Highlight([1]);
    await new Promise(r => setTimeout(r, 700));

    if (s3Density > 70) {
      setS3Highlight([3, 4]);
      await new Promise(r => setTimeout(r, 600));
      setS3Result({ duration: 90, color: "text-red-400", label: "HIGH – 90s green" });
    } else if (s3Density > 30) {
      setS3Highlight([5, 6]);
      await new Promise(r => setTimeout(r, 600));
      setS3Result({ duration: 60, color: "text-yellow-400", label: "MEDIUM – 60s green" });
    } else {
      setS3Highlight([7, 8]);
      await new Promise(r => setTimeout(r, 600));
      setS3Result({ duration: 30, color: "text-green-400", label: "LOW – 30s green" });
    }
    addXp(60, "Elif chain evaluated!");
    unlockBadge("elif_chain");
    addCoins(15);
  };

  const renderStage3 = () => (
    <div className="flex-1 flex gap-6 min-h-0">
      <div className="flex-1 flex flex-col gap-4 overflow-y-auto">
        <div className="bg-gradient-to-r from-amber-950/40 to-transparent rounded-xl border border-amber-900/30 p-5">
          <h3 className="text-lg font-bold text-amber-400 mb-1 flex items-center gap-2">
            <Gauge className="size-5" /> Stage 3: If-Elif-Else
          </h3>
          <p className="text-slate-400 text-sm">Set green light duration based on traffic density. First matching condition wins!</p>
        </div>

        <CodePanel
          code={`traffic_density = ${s3Density}\n\nif traffic_density > 70:\n    green_time = 90   # Heavy traffic\nelif traffic_density > 30:\n    green_time = 60   # Moderate traffic\nelse:\n    green_time = 30   # Light traffic`}
          highlightLines={s3Highlight}
        />

        <MemoryPanel vars={[
          { name: "traffic_density", value: String(s3Density), type: "int" },
          ...(s3Result ? [{ name: "green_time", value: String(s3Result.duration), type: "int" }] : []),
        ]} />

        <div className="flex items-center gap-4">
          <div className="flex-1">
            <div className="flex justify-between text-xs text-slate-500 mb-1">
              <span>Low (0)</span><span>traffic_density = {s3Density}</span><span>High (100)</span>
            </div>
            <input
              type="range" min="0" max="100" value={s3Density}
              onChange={e => { setS3Density(Number(e.target.value)); setS3Result(null); setS3Highlight([]); }}
              className="w-full accent-amber-500"
            />
          </div>
          <button onClick={runStage3} className="px-6 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-sm flex items-center gap-2 shadow-lg shadow-amber-900/30">
            <Play className="size-4" /> Run Code
          </button>
        </div>
      </div>

      {/* Right: Density Meter */}
      <div className="w-64 flex flex-col items-center justify-center gap-6 bg-slate-900/30 rounded-2xl border border-slate-800 p-6">
        <div className="w-full space-y-3">
          {[
            { label: "HIGH (>70)", condition: s3Density > 70, color: "bg-red-500", border: "border-red-500" },
            { label: "MEDIUM (>30)", condition: s3Density > 30 && s3Density <= 70, color: "bg-yellow-500", border: "border-yellow-500" },
            { label: "LOW (≤30)", condition: s3Density <= 30, color: "bg-green-500", border: "border-green-500" },
          ].map((tier, i) => (
            <div key={i} className={`p-3 rounded-xl border-2 transition-all duration-500 text-center font-bold ${s3Result && tier.condition ? `${tier.border} ${tier.color}/20 shadow-lg scale-105` : "border-slate-800 bg-slate-900/30 opacity-40"}`}>
              {tier.label}
            </div>
          ))}
        </div>
        {s3Result && (
          <>
            <div className={`text-center font-black text-xl ${s3Result.color}`}>{s3Result.label}</div>
            <button onClick={() => setStageIndex(3)} className="px-5 py-2 rounded-lg bg-amber-600 hover:bg-amber-700 text-white font-bold text-sm flex items-center gap-2 animate-pulse">
              Next Stage <ArrowRight className="size-4" />
            </button>
          </>
        )}
      </div>
    </div>
  );

  /* ──────────────────────────────────────────────
     STAGE 4: Logical Operators – Priority Override
     ────────────────────────────────────────────── */
  const [s4Emergency, setS4Emergency] = useState(false);
  const [s4Pedestrian, setS4Pedestrian] = useState(false);
  const [s4Result, setS4Result] = useState<string | null>(null);
  const [s4Highlight, setS4Highlight] = useState<number[]>([]);

  const runStage4 = async () => {
    setS4Result(null);
    setS4Highlight([1, 2]);
    await new Promise(r => setTimeout(r, 800));
    setS4Highlight([4]);
    await new Promise(r => setTimeout(r, 800));

    if (s4Emergency && s4Pedestrian) {
      setS4Highlight([5]);
      setS4Result("🚨 EMERGENCY OVERRIDE + 🚶 Pedestrians cleared first!");
    } else if (s4Emergency || s4Pedestrian) {
      setS4Highlight([7]);
      setS4Result(s4Emergency ? "🚨 Emergency vehicle passing!" : "🚶 Pedestrian crossing active!");
    } else {
      setS4Highlight([9]);
      setS4Result("🟢 Normal traffic flow");
    }
    addXp(65, "Logical operators applied!");
    unlockBadge("logic_ops");
    addCoins(15);
  };

  const renderStage4 = () => (
    <div className="flex-1 flex gap-6 min-h-0">
      <div className="flex-1 flex flex-col gap-4 overflow-y-auto">
        <div className="bg-gradient-to-r from-fuchsia-950/40 to-transparent rounded-xl border border-fuchsia-900/30 p-5">
          <h3 className="text-lg font-bold text-fuchsia-400 mb-1 flex items-center gap-2">
            <Siren className="size-5" /> Stage 4: Logical Operators
          </h3>
          <p className="text-slate-400 text-sm">Combine <code className="bg-slate-800 px-1 rounded text-fuchsia-300">and</code>, <code className="bg-slate-800 px-1 rounded text-fuchsia-300">or</code> to handle emergency vehicles & pedestrians.</p>
        </div>

        <CodePanel
          code={`emergency_vehicle = ${s4Emergency}\npedestrian_button = ${s4Pedestrian}\n\nif emergency_vehicle and pedestrian_button:\n    action = "Override + Clear pedestrians"\nelif emergency_vehicle or pedestrian_button:\n    action = "Priority signal active"\nelse:\n    action = "Normal traffic flow"`}
          highlightLines={s4Highlight}
        />

        <MemoryPanel vars={[
          { name: "emergency_vehicle", value: String(s4Emergency), type: "bool" },
          { name: "pedestrian_button", value: String(s4Pedestrian), type: "bool" },
          ...(s4Result ? [{ name: "action", value: `"${s4Result}"`, type: "str" }] : []),
        ]} />

        <div className="flex items-center gap-4 flex-wrap">
          <button
            onClick={() => { setS4Emergency(!s4Emergency); setS4Result(null); setS4Highlight([]); }}
            className={`px-4 py-2.5 rounded-xl font-bold text-sm border transition-all flex items-center gap-2 ${s4Emergency ? "bg-red-600 border-red-500 text-white" : "bg-slate-800 border-slate-700 text-slate-300"}`}
          >
            <Siren className="size-4" /> Emergency = {String(s4Emergency)}
          </button>
          <button
            onClick={() => { setS4Pedestrian(!s4Pedestrian); setS4Result(null); setS4Highlight([]); }}
            className={`px-4 py-2.5 rounded-xl font-bold text-sm border transition-all flex items-center gap-2 ${s4Pedestrian ? "bg-cyan-600 border-cyan-500 text-white" : "bg-slate-800 border-slate-700 text-slate-300"}`}
          >
            <Users className="size-4" /> Pedestrian = {String(s4Pedestrian)}
          </button>
          <button onClick={runStage4} className="px-6 py-2.5 rounded-xl bg-fuchsia-600 hover:bg-fuchsia-700 text-white font-bold text-sm flex items-center gap-2 shadow-lg shadow-fuchsia-900/30">
            <Play className="size-4" /> Run Code
          </button>
        </div>
      </div>

      {/* Right: Result */}
      <div className="w-64 flex flex-col items-center justify-center gap-6 bg-slate-900/30 rounded-2xl border border-slate-800 p-6">
        {s4Result ? (
          <div className="text-center animate-in slide-in-from-bottom-4">
            <div className="text-4xl mb-4">{s4Emergency && s4Pedestrian ? "🚨🚶" : s4Emergency ? "🚨" : s4Pedestrian ? "🚶" : "🟢"}</div>
            <div className="text-fuchsia-300 font-bold text-sm leading-relaxed">{s4Result}</div>
          </div>
        ) : (
          <div className="text-slate-600 text-center">
            <ShieldCheck className="size-16 mx-auto mb-3" />
            <div className="font-bold">Toggle conditions & run</div>
          </div>
        )}
        {s4Result && (
          <button onClick={() => setStageIndex(4)} className="px-5 py-2 rounded-lg bg-fuchsia-600 hover:bg-fuchsia-700 text-white font-bold text-sm flex items-center gap-2 animate-pulse">
            Next Stage <ArrowRight className="size-4" />
          </button>
        )}
      </div>
    </div>
  );

  /* ──────────────────────────────────────────────
     STAGE 5: Range Comparison – Speed Limit
     ────────────────────────────────────────────── */
  const [s5Speed, setS5Speed] = useState(25);
  const [s5Result, setS5Result] = useState<{ msg: string; color: string; icon: string } | null>(null);
  const [s5Highlight, setS5Highlight] = useState<number[]>([]);

  const runStage5 = async () => {
    setS5Result(null);
    setS5Highlight([1, 2]);
    await new Promise(r => setTimeout(r, 800));

    if (0 <= s5Speed && s5Speed <= 30) {
      setS5Highlight([4, 5]);
      await new Promise(r => setTimeout(r, 600));
      setS5Result({ msg: "✅ Safe speed zone", color: "text-green-400", icon: "🚗" });
    } else if (s5Speed <= 60) {
      setS5Highlight([6, 7]);
      await new Promise(r => setTimeout(r, 600));
      setS5Result({ msg: "⚠️ Caution zone", color: "text-yellow-400", icon: "⚠️" });
    } else {
      setS5Highlight([8, 9]);
      await new Promise(r => setTimeout(r, 600));
      setS5Result({ msg: "🚨 SPEED VIOLATION!", color: "text-red-400", icon: "🚨" });
    }
    addXp(55, "Range comparison checked!");
    unlockBadge("range_check");
    addCoins(10);
  };

  const renderStage5 = () => (
    <div className="flex-1 flex gap-6 min-h-0">
      <div className="flex-1 flex flex-col gap-4 overflow-y-auto">
        <div className="bg-gradient-to-r from-teal-950/40 to-transparent rounded-xl border border-teal-900/30 p-5">
          <h3 className="text-lg font-bold text-teal-400 mb-1 flex items-center gap-2">
            <Gauge className="size-5" /> Stage 5: Range Comparison
          </h3>
          <p className="text-slate-400 text-sm">Python's chained comparison: <code className="bg-slate-800 px-1 rounded text-teal-300">0 &lt;= speed &lt;= 30</code> — elegant and readable!</p>
        </div>

        <CodePanel
          code={`speed = ${s5Speed}\nspeed_limit = 30\n\nif 0 <= speed <= 30:\n    status = "Safe zone"\nelif speed <= 60:\n    status = "Caution zone"\nelse:\n    status = "SPEED VIOLATION!"`}
          highlightLines={s5Highlight}
        />

        <MemoryPanel vars={[
          { name: "speed", value: String(s5Speed), type: "int" },
          { name: "speed_limit", value: "30", type: "int" },
          ...(s5Result ? [{ name: "status", value: `"${s5Result.msg}"`, type: "str" }] : []),
        ]} />

        <div className="flex items-center gap-4">
          <div className="flex-1">
            <div className="flex justify-between text-xs text-slate-500 mb-1">
              <span>0 km/h</span><span className="font-bold text-teal-400">{s5Speed} km/h</span><span>100 km/h</span>
            </div>
            <input
              type="range" min="0" max="100" value={s5Speed}
              onChange={e => { setS5Speed(Number(e.target.value)); setS5Result(null); setS5Highlight([]); }}
              className="w-full accent-teal-500"
            />
          </div>
          <button onClick={runStage5} className="px-6 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-sm flex items-center gap-2 shadow-lg shadow-teal-900/30">
            <Play className="size-4" /> Run Code
          </button>
        </div>
      </div>

      {/* Right: Speedometer */}
      <div className="w-64 flex flex-col items-center justify-center gap-6 bg-slate-900/30 rounded-2xl border border-slate-800 p-6">
        <div className={`size-40 rounded-full border-8 flex items-center justify-center transition-all duration-700 ${s5Result ? (s5Speed <= 30 ? "border-green-500 shadow-[0_0_40px_rgba(34,197,94,0.4)]" : s5Speed <= 60 ? "border-yellow-500 shadow-[0_0_40px_rgba(250,204,21,0.4)]" : "border-red-500 shadow-[0_0_40px_rgba(239,68,68,0.4)] animate-pulse") : "border-slate-700"}`}>
          <div className="text-center">
            <div className="text-3xl font-black">{s5Speed}</div>
            <div className="text-xs text-slate-500 uppercase">km/h</div>
          </div>
        </div>
        {s5Result && (
          <>
            <div className={`text-center font-bold ${s5Result.color}`}>{s5Result.msg}</div>
            <button onClick={() => setStageIndex(5)} className="px-5 py-2 rounded-lg bg-teal-600 hover:bg-teal-700 text-white font-bold text-sm flex items-center gap-2 animate-pulse">
              Next Stage <ArrowRight className="size-4" />
            </button>
          </>
        )}
      </div>
    </div>
  );

  /* ──────────────────────────────────────────────
     STAGE 6: Nested Conditions – Night Ops
     ────────────────────────────────────────────── */
  const [s6Night, setS6Night] = useState(true);
  const [s6LowVis, setS6LowVis] = useState(false);
  const [s6Emergency, setS6Emergency] = useState(false);
  const [s6Result, setS6Result] = useState<string | null>(null);
  const [s6Highlight, setS6Highlight] = useState<number[]>([]);

  const runStage6 = async () => {
    setS6Result(null);
    setS6Highlight([1, 2, 3]);
    await new Promise(r => setTimeout(r, 700));

    if (s6Night) {
      setS6Highlight([5]);
      await new Promise(r => setTimeout(r, 600));
      if (s6LowVis) {
        setS6Highlight([6]);
        await new Promise(r => setTimeout(r, 600));
        if (s6Emergency) {
          setS6Highlight([7]);
          setS6Result("🚨 FULL ALERT: Emergency + Night + Low Visibility!");
        } else {
          setS6Highlight([9]);
          setS6Result("🌫️ Fog lights ON, reduce speed limit to 20 km/h");
        }
      } else {
        setS6Highlight([11]);
        setS6Result("🌙 Night mode: Yellow blinking signal");
      }
    } else {
      setS6Highlight([13]);
      setS6Result("☀️ Daytime: Normal operations");
    }
    addXp(75, "Nested conditions conquered!");
    unlockBadge("nested");
    addCoins(20);
  };

  const renderStage6 = () => (
    <div className="flex-1 flex gap-6 min-h-0">
      <div className="flex-1 flex flex-col gap-4 overflow-y-auto">
        <div className="bg-gradient-to-r from-indigo-950/40 to-transparent rounded-xl border border-indigo-900/30 p-5">
          <h3 className="text-lg font-bold text-indigo-400 mb-1 flex items-center gap-2">
            <Moon className="size-5" /> Stage 6: Nested Conditions
          </h3>
          <p className="text-slate-400 text-sm">Multiple layers of decisions: night → low visibility → emergency. Each nests deeper!</p>
        </div>

        <CodePanel
          code={`is_night = ${s6Night}\nlow_visibility = ${s6LowVis}\nemergency = ${s6Emergency}\n\nif is_night:\n    if low_visibility:\n        if emergency:\n            action = "FULL ALERT"\n        else:\n            action = "Fog lights + slow"\n    else:\n        action = "Yellow blinking"\nelse:\n    action = "Normal daytime"`}
          highlightLines={s6Highlight}
        />

        <div className="flex items-center gap-3 flex-wrap">
          <button onClick={() => { setS6Night(!s6Night); setS6Result(null); setS6Highlight([]); }}
            className={`px-4 py-2 rounded-xl font-bold text-sm border transition-all flex items-center gap-2 ${s6Night ? "bg-indigo-600 border-indigo-500 text-white" : "bg-slate-800 border-slate-700 text-slate-300"}`}>
            <Moon className="size-4" /> Night = {String(s6Night)}
          </button>
          <button onClick={() => { setS6LowVis(!s6LowVis); setS6Result(null); setS6Highlight([]); }}
            className={`px-4 py-2 rounded-xl font-bold text-sm border transition-all flex items-center gap-2 ${s6LowVis ? "bg-gray-600 border-gray-500 text-white" : "bg-slate-800 border-slate-700 text-slate-300"}`}>
            <EyeOff className="size-4" /> LowVis = {String(s6LowVis)}
          </button>
          <button onClick={() => { setS6Emergency(!s6Emergency); setS6Result(null); setS6Highlight([]); }}
            className={`px-4 py-2 rounded-xl font-bold text-sm border transition-all flex items-center gap-2 ${s6Emergency ? "bg-red-600 border-red-500 text-white" : "bg-slate-800 border-slate-700 text-slate-300"}`}>
            <Siren className="size-4" /> Emergency = {String(s6Emergency)}
          </button>
          <button onClick={runStage6} className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm flex items-center gap-2 shadow-lg shadow-indigo-900/30">
            <Play className="size-4" /> Run
          </button>
        </div>
      </div>

      {/* Right: Night scene */}
      <div className="w-64 flex flex-col items-center justify-center gap-4 bg-gradient-to-b from-indigo-950 to-slate-950 rounded-2xl border border-indigo-900/50 p-6">
        {s6Result ? (
          <div className="text-center animate-in zoom-in">
            <div className="text-4xl mb-3">{s6Night ? (s6LowVis ? (s6Emergency ? "🚨" : "🌫️") : "🌙") : "☀️"}</div>
            <div className="text-indigo-300 font-bold text-sm leading-relaxed">{s6Result}</div>
          </div>
        ) : (
          <div className="text-slate-600 text-center">
            <Moon className="size-16 mx-auto mb-3" />
            <div className="font-bold">Toggle & run</div>
          </div>
        )}
        {s6Result && (
          <button onClick={() => setStageIndex(6)} className="px-5 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm flex items-center gap-2 animate-pulse mt-4">
            Next Stage <ArrowRight className="size-4" />
          </button>
        )}
      </div>
    </div>
  );

  /* ──────────────────────────────────────────────
     STAGE 7: Funny Mistake – Syntax Traffic Jam
     ────────────────────────────────────────────── */
  const [s7Fixed, setS7Fixed] = useState(false);
  const [s7ShowJam, setS7ShowJam] = useState(false);

  const runS7Broken = () => {
    setS7ShowJam(true);
    triggerToast("SyntaxError: expected ':'", "error");
  };

  const runS7Fixed = () => {
    setS7Fixed(true);
    addXp(40, "Syntax error fixed!");
    unlockBadge("error_fix");
    addCoins(10);
  };

  const renderStage7 = () => (
    <div className="flex-1 flex gap-6 min-h-0">
      <div className="flex-1 flex flex-col gap-4 overflow-y-auto">
        <div className="bg-gradient-to-r from-orange-950/40 to-transparent rounded-xl border border-orange-900/30 p-5">
          <h3 className="text-lg font-bold text-orange-400 mb-1 flex items-center gap-2">
            <AlertTriangle className="size-5" /> Stage 7: Funny Mistake!
          </h3>
          <p className="text-slate-400 text-sm">A common Python beginner error: forgetting the colon <code className="bg-slate-800 px-1.5 rounded text-orange-300">:</code> after <code className="bg-slate-800 px-1.5 rounded text-orange-300">if</code></p>
        </div>

        {!s7Fixed ? (
          <>
            <CodePanel
              code={`# 🐛 BUGGY CODE — spot the error!\n\ncars_waiting = True\n\nif cars_waiting   # ← Missing colon!\n    signal = "GREEN"`}
              errorLine={5}
            />

            <div className="bg-red-950/30 border border-red-900/40 rounded-xl p-4">
              <div className="text-red-400 font-mono text-sm font-bold mb-1">SyntaxError</div>
              <div className="text-red-300/80 font-mono text-xs">File "traffic.py", line 5</div>
              <div className="text-red-300/80 font-mono text-xs">if cars_waiting</div>
              <div className="text-red-300/80 font-mono text-xs">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;^</div>
              <div className="text-red-300/80 font-mono text-xs">SyntaxError: expected ':'</div>
            </div>

            <div className="flex gap-4">
              <button onClick={runS7Broken} className="px-5 py-2.5 rounded-xl bg-red-600/80 hover:bg-red-700 text-white font-bold text-sm flex items-center gap-2">
                <AlertOctagon className="size-4" /> Run Buggy Code
              </button>
              <button onClick={runS7Fixed} className="px-5 py-2.5 rounded-xl bg-green-600 hover:bg-green-700 text-white font-bold text-sm flex items-center gap-2">
                <CheckCircle2 className="size-4" /> Fix: Add Colon (:)
              </button>
            </div>
          </>
        ) : (
          <>
            <CodePanel
              code={`# ✅ FIXED CODE\n\ncars_waiting = True\n\nif cars_waiting:   # ← Colon added!\n    signal = "GREEN"`}
              highlightLines={[5, 6]}
            />

            <div className="bg-green-950/30 border border-green-900/40 rounded-xl p-4 text-center">
              <CheckCircle2 className="size-8 text-green-400 mx-auto mb-2" />
              <div className="text-green-400 font-bold">Bug Fixed! Traffic flows again! 🎉</div>
              <div className="text-slate-400 text-sm mt-1">Remember: Python requires a colon after if, elif, else, for, while, def, class...</div>
            </div>

            <button onClick={() => setStageIndex(7)} className="px-5 py-2.5 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-bold text-sm flex items-center gap-2 animate-pulse self-start">
              Final Boss <ArrowRight className="size-4" />
            </button>
          </>
        )}
      </div>

      {/* Right: Traffic Jam Visual */}
      <div className="w-64 flex flex-col items-center justify-center gap-4 bg-slate-900/30 rounded-2xl border border-slate-800 p-6">
        {s7ShowJam && !s7Fixed ? (
          <div className="text-center animate-in shake">
            <div className="text-6xl mb-4">🚗🚗🚗</div>
            <div className="text-5xl mb-4">🚙🚕🚗</div>
            <div className="text-4xl mb-4">📛 JAM!</div>
            <div className="text-red-400 font-bold text-sm">Syntax Error caused a traffic jam!</div>
          </div>
        ) : s7Fixed ? (
          <div className="text-center animate-in slide-in-from-bottom-4">
            <TrafficLight active="green" size="sm" />
            <div className="text-green-400 font-bold text-lg mt-4">🚗 → → →</div>
            <div className="text-green-300 text-sm mt-2">Traffic flowing!</div>
          </div>
        ) : (
          <div className="text-slate-600 text-center">
            <AlertTriangle className="size-16 mx-auto mb-3" />
            <div className="font-bold">Find the bug!</div>
          </div>
        )}
      </div>
    </div>
  );

  /* ──────────────────────────────────────────────
     STAGE 8: BOSS – Rush Hour Challenge
     ────────────────────────────────────────────── */
  const bossEvents = [
    { id: 1, desc: "Heavy traffic at intersection A", condition: "traffic > 70", answer: "green_90", label: "Set 90s green (High)" },
    { id: 2, desc: "Pedestrian pressed crossing button", condition: "pedestrian == True", answer: "stop_cars", label: "Stop cars for pedestrian" },
    { id: 3, desc: "Emergency ambulance approaching", condition: "emergency and night", answer: "full_alert", label: "Full alert override" },
    { id: 4, desc: "Speed camera: car at 85 km/h", condition: "speed > 60", answer: "violation", label: "Issue speed violation" },
    { id: 5, desc: "Rain started, visibility dropping", condition: "rain and low_vis", answer: "fog_lights", label: "Activate fog lights" },
  ];

  const [bossActive, setBossActive] = useState(false);
  const [bossTimer, setBossTimer] = useState(45);
  const [bossEventIdx, setBossEventIdx] = useState(0);
  const [bossScore, setBossScore] = useState(0);
  const [bossComplete, setBossComplete] = useState(false);
  const [bossChoices, setBossChoices] = useState<string[]>([]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (bossActive && bossTimer > 0 && !bossComplete) {
      timer = setTimeout(() => setBossTimer(t => t - 1), 1000);
    }
    if (bossActive && bossTimer <= 0 && !bossComplete) {
      setBossComplete(true);
    }
    return () => clearTimeout(timer);
  }, [bossActive, bossTimer, bossComplete]);

  const handleBossAnswer = (answer: string) => {
    const event = bossEvents[bossEventIdx];
    if (answer === event.answer) {
      setBossScore(s => s + 1);
      setBossChoices(prev => [...prev, "✅"]);
      addCoins(10);
    } else {
      setBossChoices(prev => [...prev, "❌"]);
      triggerToast("Wrong action! Check the condition.", "error");
    }

    if (bossEventIdx < bossEvents.length - 1) {
      setBossEventIdx(i => i + 1);
    } else {
      setBossComplete(true);
      if (bossScore + (answer === event.answer ? 1 : 0) >= 4) {
        addXp(150, "Rush Hour Hero! Boss defeated!");
        unlockBadge("rush_hero");
        setActiveScreen("completion");
      }
    }
  };

  const wrongAnswers: Record<number, string[]> = {
    0: ["green_30", "stop_cars", "fog_lights"],
    1: ["green_90", "violation", "full_alert"],
    2: ["green_30", "stop_cars", "green_90"],
    3: ["fog_lights", "stop_cars", "green_30"],
    4: ["violation", "green_90", "stop_cars"],
  };

  const renderStage8 = () => (
    <div className="flex-1 flex flex-col gap-4 min-h-0">
      <div className="bg-gradient-to-r from-rose-950/40 to-transparent rounded-xl border border-rose-900/30 p-5 flex items-center justify-between">
        <div>
          <h3 className="text-lg font-bold text-rose-400 mb-1 flex items-center gap-2">
            <Trophy className="size-5" /> BOSS: Rush Hour Challenge
          </h3>
          <p className="text-slate-400 text-sm">Handle 5 traffic events correctly. Apply all you've learned!</p>
        </div>
        {bossActive && (
          <div className={`text-3xl font-black tabular-nums ${bossTimer <= 10 ? "text-red-400 animate-pulse" : "text-rose-400"}`}>
            <Timer className="size-5 inline mr-1" />{bossTimer}s
          </div>
        )}
      </div>

      {!bossActive && !bossComplete ? (
        <div className="flex-1 flex flex-col items-center justify-center gap-6">
          <div className="text-6xl">🚦</div>
          <div className="text-slate-300 text-lg font-bold">Ready for Rush Hour?</div>
          <div className="text-slate-500 text-sm">You have 45 seconds to handle 5 traffic events correctly.</div>
          <button onClick={() => setBossActive(true)} className="px-8 py-3 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-lg flex items-center gap-2 shadow-lg shadow-rose-900/30">
            <Play className="size-5" /> Start Rush Hour
          </button>
        </div>
      ) : bossComplete ? (
        <div className="flex-1 flex flex-col items-center justify-center gap-6">
          <div className="text-6xl">{bossScore >= 4 ? "🏆" : "😅"}</div>
          <div className="text-2xl font-black text-white">{bossScore >= 4 ? "Rush Hour Cleared!" : "Try Again!"}</div>
          <div className="text-slate-400">Score: {bossScore} / {bossEvents.length}</div>
          <div className="flex gap-2 text-2xl">{bossChoices.map((c, i) => <span key={i}>{c}</span>)}</div>
          {bossScore < 4 && (
            <button onClick={() => { setBossActive(false); setBossComplete(false); setBossTimer(45); setBossEventIdx(0); setBossScore(0); setBossChoices([]); }}
              className="px-6 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-sm flex items-center gap-2">
              <RotateCcw className="size-4" /> Retry
            </button>
          )}
        </div>
      ) : (
        <div className="flex-1 flex gap-6">
          {/* Event Card */}
          <div className="flex-1 flex flex-col gap-4">
            <div className="flex gap-2 mb-2">
              {bossEvents.map((_, i) => (
                <div key={i} className={`flex-1 h-2 rounded-full transition-all ${i < bossEventIdx ? "bg-rose-500" : i === bossEventIdx ? "bg-rose-400 animate-pulse" : "bg-slate-800"}`} />
              ))}
            </div>

            <div className="bg-slate-900/60 rounded-2xl border border-rose-900/30 p-8 flex-1 flex flex-col justify-center">
              <div className="text-xs text-rose-400 uppercase tracking-widest font-bold mb-3">Event {bossEventIdx + 1} of {bossEvents.length}</div>
              <div className="text-2xl font-black text-white mb-4">{bossEvents[bossEventIdx].desc}</div>
              <div className="text-sm text-slate-400 mb-8">
                Condition: <code className="bg-slate-800 px-2 py-0.5 rounded text-rose-300">{bossEvents[bossEventIdx].condition}</code>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {/* Correct answer */}
                <button
                  onClick={() => handleBossAnswer(bossEvents[bossEventIdx].answer)}
                  className="p-4 rounded-xl bg-slate-800 hover:bg-rose-600 border border-slate-700 hover:border-rose-500 text-left transition-all group"
                >
                  <div className="font-bold text-sm text-slate-200 group-hover:text-white">{bossEvents[bossEventIdx].label}</div>
                </button>

                {/* Wrong answers */}
                {wrongAnswers[bossEventIdx]?.slice(0, 3).map((wrongAns, i) => {
                  const wrongLabels: Record<string, string> = {
                    green_30: "Set 30s green (Low)",
                    green_90: "Set 90s green (High)",
                    stop_cars: "Stop all cars",
                    fog_lights: "Activate fog lights",
                    violation: "Issue speed violation",
                    full_alert: "Full alert override",
                  };
                  return (
                    <button key={i}
                      onClick={() => handleBossAnswer(wrongAns)}
                      className="p-4 rounded-xl bg-slate-800 hover:bg-rose-600 border border-slate-700 hover:border-rose-500 text-left transition-all group"
                    >
                      <div className="font-bold text-sm text-slate-200 group-hover:text-white">{wrongLabels[wrongAns] || wrongAns}</div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Scoreboard */}
          <div className="w-48 flex flex-col items-center justify-center gap-4 bg-slate-900/30 rounded-2xl border border-slate-800 p-4">
            <div className="text-xs text-slate-500 uppercase tracking-widest font-bold">Score</div>
            <div className="text-4xl font-black text-rose-400">{bossScore}</div>
            <div className="flex flex-col gap-1 text-xl">{bossChoices.map((c, i) => <span key={i}>{c}</span>)}</div>
          </div>
        </div>
      )}
    </div>
  );

  /* ──────────────────────────────────────────────
     LOBBY
     ────────────────────────────────────────────── */
  const renderLobby = () => (
    <div className="flex-1 flex flex-col items-center justify-center gap-8 overflow-y-auto py-8">
      {/* Hero */}
      <div className="text-center max-w-2xl">
        <div className="text-6xl mb-4">🚦</div>
        <h2 className="text-4xl font-black bg-gradient-to-r from-red-400 via-yellow-400 to-green-400 bg-clip-text text-transparent mb-3">
          Traffic Signal Controller
        </h2>
        <p className="text-slate-400 text-lg leading-relaxed">
          You are a <span className="text-white font-bold">traffic police officer</span> controlling a smart traffic signal.
          Master Python's decision-making constructs: <code className="bg-slate-800 px-1.5 rounded text-emerald-300">if</code>,{" "}
          <code className="bg-slate-800 px-1.5 rounded text-amber-300">elif</code>,{" "}
          <code className="bg-slate-800 px-1.5 rounded text-red-300">else</code>, logical operators, and nested conditions!
        </p>
      </div>

      {/* Stage List */}
      <div className="w-full max-w-xl space-y-2">
        {stageTitles.map((title, i) => (
          <div key={i} className="flex items-center gap-3 px-4 py-3 rounded-xl bg-slate-900/50 border border-slate-800">
            <div className={`size-8 rounded-full flex items-center justify-center text-sm font-bold ${i === stageTitles.length - 1 ? "bg-rose-600 text-white" : "bg-slate-800 text-slate-400"}`}>
              {i + 1}
            </div>
            <span className="text-slate-300 text-sm font-medium">{title}</span>
          </div>
        ))}
      </div>

      {/* Badges Preview */}
      <div className="w-full max-w-xl">
        <div className="text-xs text-slate-500 uppercase tracking-widest font-bold mb-3">Badges to Earn</div>
        <div className="flex flex-wrap gap-2">
          {badges.map(b => (
            <div key={b.id} className={`px-3 py-1.5 rounded-full text-xs font-bold border ${b.unlocked ? "bg-yellow-500/20 border-yellow-500/50 text-yellow-300" : "bg-slate-900 border-slate-800 text-slate-600"}`}>
              {b.icon} {b.name}
            </div>
          ))}
        </div>
      </div>

      {/* Start Button */}
      <button onClick={() => setActiveScreen("game")} className="px-10 py-4 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-black text-lg shadow-xl shadow-emerald-900/30 flex items-center gap-3 transition-all hover:scale-105">
        <Play className="size-6" /> Start Patrol
      </button>
    </div>
  );

  /* ──────────────────────────────────────────────
     COMPLETION
     ────────────────────────────────────────────── */
  const renderCompletion = () => (
    <div className="flex-1 flex flex-col items-center justify-center gap-8 overflow-y-auto py-8">
      <div className="text-7xl">🏆</div>
      <h2 className="text-4xl font-black text-white">Patrol Complete!</h2>
      <p className="text-slate-400 text-lg max-w-lg text-center">
        You've mastered Python's conditional statements — from simple <code className="bg-slate-800 px-1.5 rounded text-emerald-300">if</code> to nested decision trees.
        The streets are safe thanks to you, Officer!
      </p>

      <div className="flex gap-8 text-center">
        <div>
          <div className="text-3xl font-black text-yellow-400">{xp}</div>
          <div className="text-xs text-slate-500 uppercase tracking-widest">Total XP</div>
        </div>
        <div>
          <div className="text-3xl font-black text-amber-400">{coins}</div>
          <div className="text-xs text-slate-500 uppercase tracking-widest">Coins</div>
        </div>
        <div>
          <div className="text-3xl font-black text-emerald-400">{badges.filter(b => b.unlocked).length}/{badges.length}</div>
          <div className="text-xs text-slate-500 uppercase tracking-widest">Badges</div>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 max-w-lg justify-center">
        {badges.map(b => (
          <div key={b.id} className={`px-3 py-1.5 rounded-full text-xs font-bold border ${b.unlocked ? "bg-yellow-500/20 border-yellow-500/50 text-yellow-300" : "bg-slate-900 border-slate-800 text-slate-600"}`}>
            {b.icon} {b.name}
          </div>
        ))}
      </div>

      <button onClick={() => { setActiveScreen("lobby"); setStageIndex(0); }} className="px-8 py-3 rounded-xl bg-slate-700 hover:bg-slate-600 text-white font-bold text-sm flex items-center gap-2">
        <RotateCcw className="size-4" /> Play Again
      </button>
    </div>
  );

  /* ──────────────────────────────────────────────
     MAIN RENDER
     ────────────────────────────────────────────── */
  const renderCurrentStage = () => {
    switch (stageIndex) {
      case 0: return renderStage1();
      case 1: return renderStage2();
      case 2: return renderStage3();
      case 3: return renderStage4();
      case 4: return renderStage5();
      case 5: return renderStage6();
      case 6: return renderStage7();
      case 7: return renderStage8();
      default: return renderStage1();
    }
  };

  return (
    <div className="flex flex-col h-full bg-slate-950 text-foreground overflow-hidden relative font-sans">
      {/* Toast */}
      {toast && (
        <div className={`absolute top-4 left-1/2 -translate-x-1/2 z-50 px-6 py-3 rounded-xl shadow-2xl font-bold text-sm flex items-center gap-2 animate-in slide-in-from-top-4 ${
          toast.type === "xp" ? "bg-yellow-600 text-white" :
          toast.type === "badge" ? "bg-fuchsia-600 text-white" :
          toast.type === "error" ? "bg-red-600 text-white" :
          "bg-emerald-600 text-white"
        }`}>
          {toast.type === "xp" && <Star className="size-4" />}
          {toast.type === "badge" && <Award className="size-4" />}
          {toast.type === "error" && <AlertOctagon className="size-4" />}
          {toast.type === "success" && <CheckCircle2 className="size-4" />}
          {toast.message}
        </div>
      )}

      {/* Top Bar */}
      <div className="flex items-center justify-between px-6 py-3 border-b border-slate-800 bg-slate-900/60 shrink-0">
        <div className="flex items-center gap-3">
          <span className="text-2xl">🚦</span>
          <h1 className="text-lg font-black text-white uppercase tracking-wider">Traffic Signal Controller</h1>
        </div>

        <div className="flex items-center gap-4">
          {activeScreen === "game" && (
            <div className="text-xs text-slate-400 font-bold uppercase tracking-widest">
              Stage {stageIndex + 1}/{totalStages}: {stageTitles[stageIndex]}
            </div>
          )}
          <div className="flex items-center gap-2 bg-yellow-950/40 px-3 py-1 rounded-full border border-yellow-900/50 text-yellow-400 text-xs font-bold">
            <Star className="size-3" /> {xp} XP
          </div>
          <div className="flex items-center gap-2 bg-amber-950/40 px-3 py-1 rounded-full border border-amber-900/50 text-amber-400 text-xs font-bold">
            <Sparkles className="size-3" /> {coins}
          </div>
        </div>
      </div>

      {/* Stage Progress Bar (in game) */}
      {activeScreen === "game" && (
        <div className="flex gap-1 px-6 py-2 bg-slate-900/30 shrink-0">
          {stageTitles.map((_, i) => (
            <div key={i} className={`flex-1 h-1.5 rounded-full transition-all duration-500 ${i < stageIndex ? "bg-emerald-500" : i === stageIndex ? "bg-emerald-400 animate-pulse" : "bg-slate-800"}`} />
          ))}
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 min-h-0 flex flex-col px-6 py-4 overflow-hidden">
        {activeScreen === "lobby" && renderLobby()}
        {activeScreen === "game" && renderCurrentStage()}
        {activeScreen === "completion" && renderCompletion()}
      </div>
    </div>
  );
}
