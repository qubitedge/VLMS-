import { useState, useEffect } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { 
  Terminal, 
  Cpu, 
  Database, 
  FlaskConical, 
  Sparkles, 
  Code2, 
  Binary, 
  ShieldCheck, 
  Activity, 
  Play, 
  Bot, 
  Layers, 
  ExternalLink,
  ChevronRight,
  Zap,
  Atom,
  Radio
} from "lucide-react";
import { CyberFooter } from "@/components/CyberFooter";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "JNTUGV • Virtual Lab Management System (VLMS)" },
      { name: "description", content: "JNTUGV Vizianagaram Presents: The Future of Virtual Lab. An isolated, authoritative laboratory framework for computer science curricula." },
    ],
  }),
  component: LandingPage,
});

export function LandingPage() {
  const navigate = useNavigate();
  const [speechText, setSpeechText] = useState<string>("Welcome to VLMS! Click 'LAUNCH PORTAL' or select a specialized laboratory node to begin.");
  const [oscilloscopePhase, setOscilloscopePhase] = useState(0);

  // Animate oscilloscope waveform
  useEffect(() => {
    const interval = setInterval(() => {
      setOscilloscopePhase((prev) => (prev + 0.15) % (Math.PI * 2));
    }, 50);
    return () => clearInterval(interval);
  }, []);

  const handleEnterDashboard = () => {
    navigate({ to: "/dashboard" });
  };

  const handleLabNodeClick = (labName: string, path: string) => {
    setSpeechText(`Initializing ${labName} sandbox runtime...`);
    setTimeout(() => {
      navigate({ to: path });
    }, 300);
  };

  // Generate smooth sine wave path for quantum oscilloscope
  const generateWavePath = () => {
    const width = 240;
    const height = 50;
    const midY = height / 2;
    let path = `M 0 ${midY}`;
    for (let x = 0; x <= width; x += 4) {
      const y = midY + Math.sin((x * 0.08) + oscilloscopePhase) * 16 * Math.sin((x / width) * Math.PI);
      path += ` L ${x} ${y.toFixed(1)}`;
    }
    return path;
  };

  return (
    <div className="w-full min-h-screen bg-[#F8FAFC]/95 text-slate-800 flex flex-col relative selection:bg-cyan-200 selection:text-cyan-900 overflow-x-hidden font-sans">
      
      {/* Ambient Grid Background */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#0284c70c_1px,transparent_1px),linear-gradient(to_bottom,#0284c70c_1px,transparent_1px)] bg-[size:40px_40px]" />
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-200/40 rounded-full blur-[140px]" />
        <div className="absolute bottom-1/3 right-1/4 w-[30rem] h-[30rem] bg-blue-200/35 rounded-full blur-[160px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40rem] h-[40rem] bg-sky-100/50 rounded-full blur-[180px]" />
      </div>

      {/* ── TOP INSTITUTIONAL COMMAND BAR ────────────────────────────────────── */}
      <header className="relative z-30 w-full border-b border-slate-200/90 bg-white/90 backdrop-blur-xl px-4 sm:px-8 py-3.5 flex flex-col md:flex-row items-center justify-between gap-3 shadow-[0_2px_15px_rgba(15,23,42,0.04)]">
        
        {/* Left: Branding & Institutional Title */}
        <div className="flex items-center gap-3.5">
          <div className="relative shrink-0 w-11 h-11 rounded-xl bg-gradient-to-br from-cyan-50 via-sky-50 to-blue-50 border border-cyan-200 p-0.5 flex items-center justify-center shadow-sm">
            <FlaskConical className="w-5 h-5 text-cyan-600 animate-pulse" />
            <div className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-cyan-500 shadow-[0_0_8px_rgba(6,182,212,0.6)]" />
          </div>

          <div className="flex flex-col">
            <div className="inline-flex items-center gap-2">
              <span className="text-[10px] font-mono tracking-widest text-cyan-800 uppercase font-semibold px-2 py-0.5 rounded bg-cyan-50 border border-cyan-200">
                JNTUGV VIZIANAGARAM PRESENTS
              </span>
              <span className="hidden sm:inline text-slate-300 text-xs">•</span>
              <span className="hidden sm:inline text-[11px] font-mono text-slate-500">
                CEV Syllabus Framework
              </span>
            </div>
            <h1 className="font-display text-lg sm:text-xl font-bold tracking-tight text-slate-900 flex items-center gap-1.5">
              VLMS <span className="text-xs font-mono font-normal text-slate-500">| Virtual Lab Management System</span>
            </h1>
          </div>
        </div>

        {/* Right: Quick Action Navigation */}
        <div className="flex items-center gap-2">
          <Link
            to="/workspace"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white hover:bg-cyan-50/80 border border-slate-200 hover:border-cyan-300 text-slate-700 hover:text-cyan-800 text-xs font-mono font-medium shadow-xs transition-all hover:scale-105"
          >
            <Code2 className="w-3.5 h-3.5 text-cyan-600" />
            <span>PLAYGROUND</span>
          </Link>
          <Link
            to="/courses"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white hover:bg-cyan-50/80 border border-slate-200 hover:border-cyan-300 text-slate-700 hover:text-cyan-800 text-xs font-mono font-medium shadow-xs transition-all hover:scale-105"
          >
            <Layers className="w-3.5 h-3.5 text-cyan-600" />
            <span>ALL LABS</span>
          </Link>
          <button
            onClick={handleEnterDashboard}
            className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold text-xs font-mono transition-all shadow-md shadow-cyan-600/20 hover:scale-105 cursor-pointer"
          >
            <Play className="w-3 h-3 fill-current" />
            <span>DASHBOARD</span>
          </button>
        </div>

      </header>

      {/* ── MAIN SCI-FI COCKPIT HUD ──────────────────────────────────────────── */}
      <main className="relative z-10 flex-1 max-w-[1560px] w-full mx-auto px-3 sm:px-6 lg:px-8 py-6 sm:py-10 flex flex-col gap-8">
        
        {/* Institutional Super-Heading Banner */}
        <div className="text-center flex flex-col items-center gap-2 relative">
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-cyan-50 border border-cyan-200 text-cyan-900 text-xs sm:text-sm font-mono tracking-widest shadow-xs">
            <span className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse" />
            <span>JNTUGV VIZIANAGARAM PRESENTS: THE FUTURE OF VIRTUAL LAB</span>
          </div>
          <h2 className="font-display font-black text-3xl sm:text-5xl lg:text-6xl tracking-tight text-slate-900 mt-1">
            VIRTUAL <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 via-sky-600 to-blue-700">LABORATORY</span> PORTAL
          </h2>
          <p className="text-slate-600 text-xs sm:text-sm max-w-2xl font-mono leading-relaxed">
            Authoritative, isolated sandbox environment for Computer Science & Engineering curricula. Zero configuration, instant WebAssembly compiler execution.
          </p>
        </div>

        {/* Master Cyber Terminal Chassis Frame */}
        <div className="relative rounded-3xl p-1.5 bg-gradient-to-b from-cyan-100 via-slate-100 to-white border border-slate-200/90 shadow-[0_15px_40px_rgba(15,23,42,0.06)] overflow-hidden">
          
          {/* Bezel Accents */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent" />
          <div className="absolute top-3 left-4 flex items-center gap-2 font-mono text-[11px] text-cyan-800">
            <span className="w-2 h-2 rounded-full bg-cyan-500 animate-ping" />
            <span>NODE_ID: JNTUGV-VLMS-01</span>
          </div>
          <div className="absolute top-3 right-4 hidden sm:flex items-center gap-3 font-mono text-[11px] text-slate-500">
            <span>SYSTEM ONLINE</span>
            <span className="text-cyan-700 font-bold">100%</span>
          </div>

          {/* Inner Command Cockpit Grid (3 Columns) */}
          <div className="relative rounded-[22px] bg-white/95 backdrop-blur-md p-4 sm:p-6 lg:p-8 pt-10 sm:pt-12 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch border border-slate-100">
            
            {/* ── LEFT HUD PANEL: Isolated Lab Environments (Span 3) ── */}
            <div className="lg:col-span-3 flex flex-col gap-4 p-4 rounded-2xl bg-gradient-to-b from-slate-50 to-white border border-slate-200 shadow-sm relative group">
              <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                <div className="flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-cyan-600" />
                  <span className="font-mono text-xs font-bold text-slate-800 tracking-wider">LAB SIMULATION</span>
                </div>
                <span className="text-[10px] font-mono text-cyan-800 bg-cyan-50 border border-cyan-200 px-1.5 py-0.5 rounded font-semibold">ISOLATED</span>
              </div>

              {/* Isometric Lab Hologram Graphic */}
              <div className="relative w-full h-44 rounded-xl bg-gradient-to-br from-cyan-50/70 via-sky-50/50 to-slate-50 border border-cyan-200/80 overflow-hidden flex flex-col items-center justify-center p-3 text-center group-hover:border-cyan-300 transition-colors shadow-inner">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#0284c70d_1px,transparent_1px),linear-gradient(to_bottom,#0284c70d_1px,transparent_1px)] bg-[size:16px_16px]" />
                
                {/* Visual Representation of Isometric Stations */}
                <div className="relative z-10 flex flex-col items-center gap-2">
                  <div className="w-24 h-14 rounded-lg border border-cyan-300 bg-white/90 transform -rotate-12 skew-x-12 shadow-sm flex items-center justify-center">
                    <Cpu className="w-6 h-6 text-cyan-600 animate-pulse" />
                  </div>
                  <div className="flex gap-2 text-[10px] font-mono">
                    <span className="px-1.5 py-0.5 rounded bg-white text-cyan-800 border border-cyan-200 shadow-xs font-semibold">COMPILER</span>
                    <span className="px-1.5 py-0.5 rounded bg-white text-cyan-800 border border-cyan-200 shadow-xs font-semibold">SANDBOX</span>
                  </div>
                </div>

                {/* Ambient conduit lines flowing to center */}
                <div className="absolute bottom-2 right-2 text-[9px] font-mono text-slate-400">
                  LATENCY: 12ms
                </div>
              </div>

              {/* Telemetry Metrics */}
              <div className="space-y-2.5 font-mono text-xs">
                <div className="flex justify-between items-center p-2 rounded-lg bg-slate-50 border border-slate-200">
                  <span className="text-slate-600 text-[11px]">Active Memory</span>
                  <span className="text-cyan-800 font-bold">512 MB (Safe)</span>
                </div>
                <div className="flex justify-between items-center p-2 rounded-lg bg-slate-50 border border-slate-200">
                  <span className="text-slate-600 text-[11px]">Kernel Mode</span>
                  <span className="text-emerald-700 font-bold">POSIX WASM</span>
                </div>
                <div className="flex justify-between items-center p-2 rounded-lg bg-slate-50 border border-slate-200">
                  <span className="text-slate-600 text-[11px]">Syllabus Standard</span>
                  <span className="text-cyan-800 font-bold">JNTUGV R23/R20</span>
                </div>
              </div>

              {/* Direct Link to Playground */}
              <Link
                to="/workspace"
                className="mt-auto flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-gradient-to-r from-cyan-50 via-sky-50 to-white hover:from-cyan-100 hover:to-sky-100 border border-cyan-300 hover:border-cyan-400 text-cyan-800 text-xs font-mono font-bold transition-all hover:scale-[1.02] shadow-xs"
              >
                <span>OPEN WEB COMPILER</span>
                <ChevronRight className="w-4 h-4 text-cyan-600" />
              </Link>
            </div>

            {/* ── CENTER HUD PANEL: The Holographic Reactor Core (Span 6) ── */}
            <div className="lg:col-span-6 flex flex-col items-center justify-center relative min-h-[440px] p-4 sm:p-8 rounded-2xl bg-gradient-to-b from-sky-50/50 via-white to-cyan-50/40 border border-cyan-200/80 shadow-inner overflow-hidden">
              
              {/* Spinning Circular Track with Institutional Text */}
              <div className="absolute w-[360px] h-[360px] sm:w-[420px] sm:h-[420px] rounded-full border border-cyan-300/60 animate-spin pointer-events-none flex items-center justify-center" style={{ animationDuration: "35s" }}>
                {/* SVG circular text path */}
                <svg className="w-full h-full" viewBox="0 0 420 420">
                  <path
                    id="textPath"
                    d="M 210, 210 m -180, 0 a 180,180 0 1,1 360,0 a 180,180 0 1,1 -360,0"
                    fill="none"
                  />
                  <text className="text-[11px] font-mono fill-cyan-700 font-semibold uppercase tracking-[0.25em]">
                    <textPath href="#textPath" startOffset="0%">
                      JNTUGV VIZIANAGARAM PRESENTS • THE FUTURE OF VIRTUAL LAB • 
                    </textPath>
                  </text>
                </svg>
              </div>

              {/* Counter-rotating Inner Radar Ring */}
              <div className="absolute w-[280px] h-[280px] sm:w-[320px] sm:h-[320px] rounded-full border border-dashed border-cyan-400/40 animate-spin-reverse pointer-events-none" />

              {/* Radar Crosshairs */}
              <div className="absolute w-[340px] sm:w-[380px] h-px bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent pointer-events-none" />
              <div className="absolute h-[340px] sm:h-[380px] w-px bg-gradient-to-b from-transparent via-cyan-400/40 to-transparent pointer-events-none" />

              {/* 3D Pulsing Holographic Core Cube */}
              <div className="relative z-10 my-6 flex items-center justify-center">
                <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-2xl bg-gradient-to-br from-white via-cyan-50 to-sky-100 border-2 border-cyan-300 shadow-[0_10px_35px_rgba(6,182,212,0.2)] flex flex-col items-center justify-center transform rotate-45 hover:rotate-0 transition-transform duration-700 cursor-pointer group">
                  <div className="transform -rotate-45 group-hover:rotate-0 transition-transform duration-700 flex flex-col items-center gap-1.5">
                    <Atom className="w-12 h-12 text-cyan-600 animate-spin" style={{ animationDuration: "12s" }} />
                    <span className="text-[10px] font-mono tracking-widest text-cyan-900 font-bold">VLMS CORE</span>
                  </div>
                </div>
              </div>

              {/* Master "LAUNCH PORTAL" Activation Button */}
              <div className="relative z-20 mt-4 flex flex-col items-center gap-3">
                <button
                  onClick={handleEnterDashboard}
                  className="group relative px-8 sm:px-12 py-3.5 sm:py-4 rounded-full bg-gradient-to-r from-cyan-600 via-sky-600 to-blue-600 hover:from-cyan-500 hover:via-sky-500 hover:to-blue-500 border-2 border-white/80 shadow-[0_8px_30px_rgba(2,132,199,0.35)] hover:shadow-[0_12px_40px_rgba(2,132,199,0.5)] transition-all duration-300 hover:scale-105 cursor-pointer"
                >
                  {/* Energy Ripple Aura */}
                  <span className="absolute -inset-1 rounded-full border border-cyan-400/50 animate-ping opacity-60 pointer-events-none" />
                  
                  <div className="flex items-center gap-3">
                    <Play className="w-5 h-5 text-white fill-white group-hover:scale-110 transition-transform" />
                    <span className="font-display font-black text-lg sm:text-xl tracking-widest text-white transition-colors uppercase">
                      LAUNCH PORTAL
                    </span>
                    <span className="hidden sm:inline-block w-2 h-2 rounded-full bg-cyan-200 animate-pulse" />
                  </div>
                </button>
              </div>

              {/* Mascot Companion Interactive Callout */}
              <div className="relative z-20 mt-6 flex items-center gap-3 bg-white/95 border border-cyan-200 rounded-2xl p-3 max-w-md shadow-sm">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-100 to-blue-100 border border-cyan-300 flex items-center justify-center shrink-0 animate-bounce">
                  <Bot className="w-6 h-6 text-cyan-700" />
                </div>
                <div className="flex flex-col text-left">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-cyan-800 font-bold">LAB AI COMPANION</span>
                  <p className="text-xs text-slate-700 font-mono leading-snug">
                    {speechText}
                  </p>
                </div>
              </div>

            </div>

            {/* ── RIGHT HUD PANEL: Laboratory Specializations (Span 3) ── */}
            <div className="lg:col-span-3 flex flex-col gap-4 p-4 rounded-2xl bg-gradient-to-b from-slate-50 to-white border border-slate-200 shadow-sm">
              
              {/* Header */}
              <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                <div className="flex items-center gap-2">
                  <Activity className="w-4 h-4 text-cyan-600" />
                  <span className="font-mono text-xs font-bold text-slate-800 tracking-wider">LAB CHANNELS</span>
                </div>
                <span className="text-[10px] font-mono text-cyan-800 bg-cyan-50 border border-cyan-200 px-1.5 py-0.5 rounded font-semibold">6 ACTIVE</span>
              </div>

              {/* Quantum Technologies Oscilloscope Waveform */}
              <div className="p-3 rounded-xl bg-white border border-slate-200 flex flex-col gap-1.5 shadow-xs">
                <div className="flex items-center justify-between text-[11px] font-mono">
                  <span className="text-cyan-800 font-semibold flex items-center gap-1.5">
                    <Radio className="w-3.5 h-3.5 text-cyan-600 animate-pulse" />
                    Quantum Technologies
                  </span>
                  <span className="text-slate-400 text-[10px]">QISKIT LAB</span>
                </div>

                {/* Animated SVG Oscilloscope */}
                <div className="w-full h-14 bg-[#F1F8FA] rounded-lg border border-cyan-200 flex items-center justify-center overflow-hidden relative shadow-inner">
                  <div className="absolute inset-0 bg-[linear-gradient(to_right,#0284c715_1px,transparent_1px),linear-gradient(to_bottom,#0284c715_1px,transparent_1px)] bg-[size:10px_10px]" />
                  <svg className="w-full h-full relative z-10" viewBox="0 0 240 50">
                    <path
                      d={generateWavePath()}
                      fill="none"
                      stroke="#0284c7"
                      strokeWidth="2"
                      className="filter drop-shadow-[0_1px_3px_rgba(2,132,199,0.3)]"
                    />
                  </svg>
                </div>
              </div>

              {/* Interactive Lab Node Globes (Clickable Cards) */}
              <div className="flex flex-col gap-2 overflow-y-auto max-h-[220px] pr-1">
                {[
                  {
                    name: "Advanced Python Lab",
                    category: "Data Science & AI",
                    path: "/course/python",
                    icon: "🐍",
                    badge: "12 Labs"
                  },
                  {
                    name: "Quantum Technologies",
                    category: "Qiskit Algorithms",
                    path: "/course/quantum-computing-using-qiskit-lab",
                    icon: "⚛️",
                    badge: "10 Labs"
                  },
                  {
                    name: "Analog Electronics Lab",
                    category: "Digital Circuits & Arch",
                    path: "/course/computer-architecture-and-digital-logic",
                    icon: "⚡",
                    badge: "10 Labs"
                  },
                  {
                    name: "Engineering Physics Lab",
                    category: "Mechanics & Optics",
                    path: "/course/classical-mechanics-and-electromagnetism",
                    icon: "🧪",
                    badge: "10 Labs"
                  },
                  {
                    name: "C Systems Programming",
                    category: "Algorithms & Pointers",
                    path: "/course/c-programming",
                    icon: "💻",
                    badge: "15 Labs"
                  },
                  {
                    name: "Database Systems (DBMS)",
                    category: "SQL Relational Engine",
                    path: "/course/dbms",
                    icon: "🗄️",
                    badge: "10 Labs"
                  }
                ].map((lab, index) => (
                  <button
                    key={index}
                    onClick={() => handleLabNodeClick(lab.name, lab.path)}
                    className="flex items-center justify-between p-2.5 rounded-xl bg-white hover:bg-cyan-50/60 border border-slate-200/90 hover:border-cyan-300 transition-all text-left group cursor-pointer shadow-xs"
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="text-base group-hover:scale-110 transition-transform">{lab.icon}</span>
                      <div className="flex flex-col">
                        <span className="text-xs font-semibold text-slate-800 group-hover:text-cyan-800 transition-colors">
                          {lab.name}
                        </span>
                        <span className="text-[10px] font-mono text-slate-500">
                          {lab.category}
                        </span>
                      </div>
                    </div>
                    <span className="text-[9px] font-mono text-cyan-800 font-semibold px-1.5 py-0.5 rounded bg-cyan-50 border border-cyan-200">
                      {lab.badge}
                    </span>
                  </button>
                ))}
              </div>

              {/* Advanced Python Frequency Equalizer Bars */}
              <div className="p-2.5 rounded-xl bg-white border border-slate-200 flex items-center justify-between shadow-xs">
                <div className="flex flex-col">
                  <span className="text-[10px] font-mono text-slate-500 uppercase">RUNTIME LATENCY</span>
                  <span className="text-xs font-mono text-emerald-700 font-bold">87ms OPTIMAL</span>
                </div>
                {/* Audio/Spectrum Bars */}
                <div className="flex items-end gap-1 h-6">
                  {[40, 70, 90, 60, 85, 50, 100, 65, 45].map((h, i) => (
                    <span
                      key={i}
                      className="w-1 bg-cyan-500 rounded-sm animate-pulse"
                      style={{
                        height: `${h}%`,
                        animationDelay: `${i * 0.12}s`,
                        animationDuration: "1.2s"
                      }}
                    />
                  ))}
                </div>
              </div>

            </div>

          </div>

        </div>

        {/* ── FAST-TRACK CURRICULUM SECTION ───────────────────────────────────── */}
        <section className="mt-4 flex flex-col gap-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-200">
            <div className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-cyan-600" />
              <h3 className="font-display text-lg font-bold text-slate-900 tracking-tight">
                Featured Virtual Lab Tracks
              </h3>
            </div>
            <Link
              to="/courses"
              className="text-xs font-mono text-cyan-700 hover:text-cyan-900 font-semibold flex items-center gap-1 transition-colors"
            >
              <span>Explore All 19+ Courses</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            
            {/* Track 1: Systems & Programming */}
            <div className="p-5 rounded-2xl bg-white hover:bg-cyan-50/30 border border-slate-200 hover:border-cyan-300 transition-all flex flex-col justify-between group shadow-sm hover:shadow-md">
              <div>
                <div className="flex items-center justify-between text-xs font-mono text-cyan-700 mb-2">
                  <span className="font-bold">TRACK 01</span>
                  <span className="px-2 py-0.5 rounded bg-cyan-50 border border-cyan-200 text-cyan-800 font-semibold">C & Systems</span>
                </div>
                <h4 className="font-display text-base font-bold text-slate-900 group-hover:text-cyan-700 transition-colors">
                  C Programming & Data Structures
                </h4>
                <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                  Deep pointer manipulation, memory management, and algorithmic data structures with in-browser GCC execution.
                </p>
              </div>
              <Link
                to="/course/c-programming"
                className="mt-4 inline-flex items-center justify-between text-xs font-mono text-cyan-700 font-semibold group-hover:text-cyan-900 pt-3 border-t border-slate-100"
              >
                <span>Launch C Lab</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            {/* Track 2: Python & Data Science */}
            <div className="p-5 rounded-2xl bg-white hover:bg-cyan-50/30 border border-slate-200 hover:border-cyan-300 transition-all flex flex-col justify-between group shadow-sm hover:shadow-md">
              <div>
                <div className="flex items-center justify-between text-xs font-mono text-cyan-700 mb-2">
                  <span className="font-bold">TRACK 02</span>
                  <span className="px-2 py-0.5 rounded bg-cyan-50 border border-cyan-200 text-cyan-800 font-semibold">Python AI</span>
                </div>
                <h4 className="font-display text-base font-bold text-slate-900 group-hover:text-cyan-700 transition-colors">
                  Advanced Python & Data Science
                </h4>
                <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                  Interactive NumPy, Pandas, visualization libraries, and real-time Python execution with instant output evaluation.
                </p>
              </div>
              <Link
                to="/course/python"
                className="mt-4 inline-flex items-center justify-between text-xs font-mono text-cyan-700 font-semibold group-hover:text-cyan-900 pt-3 border-t border-slate-100"
              >
                <span>Launch Python Lab</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            {/* Track 3: Quantum Technologies */}
            <div className="p-5 rounded-2xl bg-white hover:bg-cyan-50/30 border border-slate-200 hover:border-cyan-300 transition-all flex flex-col justify-between group shadow-sm hover:shadow-md">
              <div>
                <div className="flex items-center justify-between text-xs font-mono text-cyan-700 mb-2">
                  <span className="font-bold">TRACK 03</span>
                  <span className="px-2 py-0.5 rounded bg-cyan-50 border border-cyan-200 text-cyan-800 font-semibold">Quantum Qiskit</span>
                </div>
                <h4 className="font-display text-base font-bold text-slate-900 group-hover:text-cyan-700 transition-colors">
                  Quantum Computing & Qiskit Lab
                </h4>
                <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                  Qubit superposition, quantum gates, entanglement circuits, and real Qiskit simulation verified against syllabus guidelines.
                </p>
              </div>
              <Link
                to="/course/quantum-computing-using-qiskit-lab"
                className="mt-4 inline-flex items-center justify-between text-xs font-mono text-cyan-700 font-semibold group-hover:text-cyan-900 pt-3 border-t border-slate-100"
              >
                <span>Launch Quantum Lab</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

          </div>
        </section>

      </main>

      {/* ── REPLACED FOOTER: THE HIGH-TECH CYBER CONSOLE ───────────────────────── */}
      <CyberFooter />

    </div>
  );
}
