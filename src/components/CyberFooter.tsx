import { Link } from "@tanstack/react-router";
import { 
  FlaskConical, 
  Github, 
  Linkedin, 
  MessageSquareText, 
  ShieldCheck, 
  Terminal, 
  Cpu, 
  ExternalLink, 
  BookOpen, 
  Code2, 
  Binary, 
  Sparkles,
  Bot
} from "lucide-react";

export function CyberFooter() {
  return (
    <footer className="w-full bg-slate-100/90 relative z-20 pt-8 pb-12 px-3 sm:px-6 lg:px-10 overflow-hidden font-sans border-t border-slate-200/90">
      {/* Ambient background glow and grid */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,#e0f2fe_0%,transparent_70%)] pointer-events-none opacity-80" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0284c70d_1px,transparent_1px),linear-gradient(to_bottom,#0284c70d_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none opacity-60" />

      {/* Main Heavy Console Container */}
      <div className="max-w-[1440px] mx-auto relative">
        
        {/* Exterior Sci-Fi Cyber Conduit Pipe Frame */}
        <div className="relative rounded-3xl p-1.5 bg-gradient-to-b from-cyan-100 via-slate-100 to-white shadow-[0_15px_40px_rgba(15,23,42,0.06)] border border-slate-200">
          
          {/* Top Decorative Console Grip / Ventilation Vent */}
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5 px-6 py-1 bg-white border border-cyan-300 rounded-md shadow-sm">
            <div className="w-2 h-2 rounded-full bg-cyan-500 animate-ping" />
            <div className="flex gap-1.5">
              {[...Array(5)].map((_, i) => (
                <span key={i} className="w-4 h-1 bg-slate-200 rounded-sm border-t border-cyan-300" />
              ))}
            </div>
            <span className="text-[10px] font-mono tracking-widest text-cyan-800 uppercase ml-2 font-semibold">TERMINAL DOCK • ONLINE</span>
          </div>

          {/* Console Outer Bezel Plate */}
          <div className="relative rounded-[22px] bg-white border border-slate-200/90 p-5 sm:p-8 lg:p-10 shadow-xs">
            
            {/* Corner Bracket Accents */}
            <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-cyan-400 pointer-events-none" />
            <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-cyan-400 pointer-events-none" />
            <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-cyan-400 pointer-events-none" />
            <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-cyan-400 pointer-events-none" />

            {/* Grid of 4 Cyber Modules */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-12 gap-8 lg:gap-10 items-start">
              
              {/* MODULE 1: Reactor Core & Brand Identity (Span 4) */}
              <div className="xl:col-span-4 flex flex-col gap-5">
                
                {/* Brand Header Pod */}
                <div className="flex items-center gap-4 p-3 rounded-2xl bg-gradient-to-r from-cyan-50 via-sky-50 to-white border border-cyan-200/80 shadow-xs relative group">
                  {/* Glowing Flask Core Orb */}
                  <div className="relative shrink-0 w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-100 to-blue-100 border border-cyan-300 flex items-center justify-center shadow-sm">
                    <FlaskConical className="w-7 h-7 text-cyan-600 animate-pulse" />
                    {/* Pulsing Ring */}
                    <div className="absolute -inset-1 rounded-2xl border border-cyan-400/40 animate-spin-reverse opacity-75" />
                  </div>

                  <div className="flex flex-col">
                    <span className="font-display font-black text-2xl tracking-tight text-slate-900 flex items-center gap-1.5">
                      VLMS<span className="text-cyan-600 text-3xl leading-none">.</span>
                    </span>
                    <span className="text-[10px] font-mono tracking-widest text-cyan-800 uppercase font-semibold">
                      Virtual Lab Management System
                    </span>
                  </div>
                </div>

                {/* Mission / Context Statement */}
                <p className="text-[12px] font-mono leading-relaxed text-slate-600 bg-slate-50 p-3.5 rounded-xl border border-slate-200 shadow-xs">
                  VLMS: AN ISOLATED, AUTHORITATIVE LABORATORY ENVIRONMENT FOR COMPUTER SCIENCE CURRICULA. INSTANT RUNTIMES, ZERO CONFIG.
                </p>

                {/* Social & Channel Station */}
                <div className="flex flex-wrap items-center gap-3">
                  <a
                    href="https://github.com"
                    target="_blank"
                    rel="noreferrer"
                    aria-label="GitHub Repository"
                    className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white hover:bg-cyan-50/80 border border-slate-200 hover:border-cyan-300 text-slate-700 hover:text-cyan-800 text-xs font-mono font-medium shadow-xs transition-all duration-300 hover:scale-105"
                  >
                    <Github className="w-4 h-4 text-cyan-600" />
                    <span>GITHUB</span>
                  </a>
                  <a
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noreferrer"
                    aria-label="LinkedIn"
                    className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white hover:bg-cyan-50/80 border border-slate-200 hover:border-cyan-300 text-slate-700 hover:text-cyan-800 text-xs font-mono font-medium shadow-xs transition-all duration-300 hover:scale-105"
                  >
                    <Linkedin className="w-4 h-4 text-cyan-600" />
                    <span>LINKEDIN</span>
                  </a>
                  <a
                    href="https://discord.com"
                    target="_blank"
                    rel="noreferrer"
                    aria-label="Discord"
                    className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white hover:bg-cyan-50/80 border border-slate-200 hover:border-cyan-300 text-slate-700 hover:text-cyan-800 text-xs font-mono font-medium shadow-xs transition-all duration-300 hover:scale-105"
                  >
                    <MessageSquareText className="w-4 h-4 text-cyan-600" />
                    <span>DISCORD</span>
                  </a>
                </div>
              </div>

              {/* MODULE 2: Curriculum Conduits (Span 2) */}
              <div className="xl:col-span-2 flex flex-col gap-4">
                <div className="flex items-center gap-2 pb-2 border-b border-slate-200">
                  <Binary className="w-4 h-4 text-cyan-600" />
                  <h4 className="font-mono text-xs font-bold tracking-widest text-slate-800 uppercase">
                    CURRICULUM
                  </h4>
                </div>

                <div className="flex flex-col gap-3">
                  {[
                    { label: "Programming", to: "/courses" },
                    { label: "Artificial Intelligence", to: "/courses" },
                    { label: "Emerging Technologies", to: "/courses" },
                    { label: "Course Catalog", to: "/courses" },
                  ].map((item, idx) => (
                    <Link
                      key={idx}
                      to={item.to}
                      className="group flex items-center justify-between p-2.5 rounded-xl bg-slate-50/80 hover:bg-cyan-50/60 border border-slate-200 hover:border-cyan-300 transition-all duration-300 shadow-xs"
                    >
                      <div className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 group-hover:scale-125 transition-transform" />
                        <span className="text-xs font-medium text-slate-700 group-hover:text-cyan-800 transition-colors">
                          {item.label}
                        </span>
                      </div>
                      <span className="text-[10px] font-mono text-cyan-600 group-hover:translate-x-1 transition-all">
                        →
                      </span>
                    </Link>
                  ))}
                </div>
              </div>

              {/* MODULE 3: Platform Console Buttons (Span 3) */}
              <div className="xl:col-span-3 flex flex-col gap-4">
                <div className="flex items-center gap-2 pb-2 border-b border-slate-200">
                  <Terminal className="w-4 h-4 text-cyan-600" />
                  <h4 className="font-mono text-xs font-bold tracking-widest text-slate-800 uppercase">
                    PLATFORM
                  </h4>
                </div>

                <div className="flex flex-col gap-2.5">
                  <Link
                    to="/"
                    className="flex items-center gap-3 px-4 py-2.5 rounded-xl bg-white hover:bg-cyan-50/60 border border-slate-200 hover:border-cyan-300 text-slate-700 hover:text-cyan-800 text-xs font-medium shadow-xs transition-all group"
                  >
                    <span className="w-2 h-2 rounded-sm bg-cyan-500 group-hover:bg-cyan-600" />
                    <span>Home / Landing</span>
                  </Link>

                  <Link
                    to="/workspace"
                    className="flex items-center gap-3 px-4 py-2.5 rounded-xl bg-white hover:bg-cyan-50/60 border border-slate-200 hover:border-cyan-300 text-slate-700 hover:text-cyan-800 text-xs font-medium shadow-xs transition-all group"
                  >
                    <Code2 className="w-3.5 h-3.5 text-cyan-600" />
                    <span>Playground / Compiler</span>
                  </Link>

                  <Link
                    to="/resources"
                    className="flex items-center gap-3 px-4 py-2.5 rounded-xl bg-white hover:bg-cyan-50/60 border border-slate-200 hover:border-cyan-300 text-slate-700 hover:text-cyan-800 text-xs font-medium shadow-xs transition-all group"
                  >
                    <BookOpen className="w-3.5 h-3.5 text-cyan-600" />
                    <span>Resources & Help</span>
                  </Link>

                  <Link
                    to="/about"
                    className="flex items-center gap-3 px-4 py-2.5 rounded-xl bg-white hover:bg-cyan-50/60 border border-slate-200 hover:border-cyan-300 text-slate-700 hover:text-cyan-800 text-xs font-medium shadow-xs transition-all group"
                  >
                    <Cpu className="w-3.5 h-3.5 text-cyan-600" />
                    <span>About Virtual Lab</span>
                  </Link>
                </div>
              </div>

              {/* MODULE 4: Academic Context & Holographic Radar (Span 3) */}
              <div className="xl:col-span-3 flex flex-col gap-4">
                <div className="flex items-center gap-2 pb-2 border-b border-slate-200">
                  <ShieldCheck className="w-4 h-4 text-cyan-600" />
                  <h4 className="font-mono text-xs font-bold tracking-widest text-slate-800 uppercase">
                    ACADEMIC CONTEXT
                  </h4>
                </div>

                {/* Radar HUD Card */}
                <div className="relative p-4 rounded-2xl bg-gradient-to-br from-cyan-50/60 via-sky-50/40 to-slate-50 border border-cyan-200/90 shadow-sm overflow-hidden">
                  
                  {/* Subtle Background Radar Circle */}
                  <div className="absolute -right-6 -bottom-6 w-32 h-32 rounded-full border border-cyan-200 pointer-events-none">
                    <div className="w-full h-full rounded-full border-t border-cyan-500 animate-spin" style={{ animationDuration: "8s" }} />
                  </div>

                  <div className="relative z-10 flex flex-col gap-2.5">
                    <div className="flex items-center gap-2 text-cyan-900 text-xs font-mono font-semibold">
                      <span className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse" />
                      <span>DEVELOPED WITH ❤️ BY <strong className="text-slate-900">TEAM SAPL</strong>:</span>
                    </div>

                    <div className="text-[11.5px] font-mono text-slate-700 space-y-1 pl-4 border-l-2 border-cyan-400">
                      <div>• Sai Rupini</div>
                      <div>• Sk. Asma</div>
                      <div>• K. Pravallika</div>
                      <div>• M. Likhith Kumar</div>
                    </div>

                    <div className="pt-2 mt-1 border-t border-slate-200 flex items-center justify-between text-[11px] font-mono text-slate-500">
                      <span>In Collaboration with:</span>
                      <span className="text-cyan-800 font-bold tracking-wider">qubitedge</span>
                    </div>
                  </div>

                  {/* Mascot Speech Callout */}
                  <div className="mt-3 flex items-center gap-2.5 bg-white border border-cyan-200 rounded-xl p-2 shadow-xs">
                    <div className="w-7 h-7 rounded-lg bg-cyan-100 flex items-center justify-center shrink-0">
                      <Bot className="w-4 h-4 text-cyan-700 animate-bounce" />
                    </div>
                    <span className="text-[10px] font-mono text-cyan-900 font-medium">
                      Hello! Virtual Lab node ready.
                    </span>
                  </div>
                </div>

              </div>

            </div>

            {/* Bottom Cybernetic Telemetry Bar */}
            <div className="mt-8 pt-6 border-t border-slate-200 flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-500">
              <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-center sm:text-left">
                <span className="text-slate-700 font-semibold">
                  &copy; 2026 VLMS Virtual Lab. All rights reserved.
                </span>
                <span className="hidden sm:inline text-slate-300">•</span>
                <span className="text-cyan-700 font-medium">JNTUGV Vizianagaram</span>
              </div>

              {/* Policy & Syllabus Nav */}
              <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 font-medium">
                <Link to="/legal" search={{ tab: "privacy" }} className="text-slate-600 hover:text-cyan-700 transition-colors">
                  Privacy Policy
                </Link>
                <Link to="/legal" search={{ tab: "terms" }} className="text-slate-600 hover:text-cyan-700 transition-colors">
                  Terms of Service
                </Link>
                <Link to="/resources" className="text-cyan-700 hover:text-cyan-900 transition-colors font-semibold flex items-center gap-1">
                  <span>JNTUGV / CEV Syllabus</span>
                  <ExternalLink className="w-3 h-3" />
                </Link>
              </div>
            </div>

          </div>

        </div>

      </div>
    </footer>
  );
}
