import { Terminal, Database, Server, Cpu, User, Activity } from "lucide-react";

export function HeroAnimation() {
  return (
    <div className="relative w-full aspect-square max-w-[500px] mx-auto perspective-1000">
      {/* Background glow */}
      <div className="absolute inset-0 bg-cyan/20 blur-[100px] rounded-full mix-blend-screen animate-pulse pointer-events-none" style={{ animationDuration: '4s' }} />
      
      {/* Main floating container */}
      <div className="relative w-full h-full animate-float" style={{ transformStyle: 'preserve-3d' }}>
        
        {/* Developer Avatar / Console */}
        <div className="absolute top-[35%] left-[5%] w-16 h-16 bg-card border border-border rounded-full flex items-center justify-center shadow-xl shadow-cyan/20 animate-[float_4s_ease-in-out_infinite_reverse] z-30">
          <User className="size-8 text-cyan animate-pulse" />
          <div className="absolute -right-2 -top-2 size-4 bg-green-500 rounded-full border-2 border-background" />
        </div>

        {/* Holographic Terminal (The Code Executing) */}
        <div className="absolute top-[10%] right-[5%] w-72 h-56 bg-[#0f111a]/90 backdrop-blur-xl border border-cyan/30 rounded-lg shadow-[0_0_40px_rgba(0,255,255,0.2)] overflow-hidden flex flex-col z-20 group hover:scale-105 transition-transform duration-500 hover:border-cyan/60 hover:shadow-[0_0_60px_rgba(0,255,255,0.4)]">
          <div className="h-7 bg-black/40 border-b border-cyan/20 flex items-center px-3 gap-1.5">
            <div className="size-2.5 rounded-full bg-red-500/80" />
            <div className="size-2.5 rounded-full bg-yellow-500/80" />
            <div className="size-2.5 rounded-full bg-green-500/80" />
            <div className="ml-2 text-[10px] font-mono text-cyan/70 flex items-center gap-1">
              <Terminal className="size-3" /> workspace_exec.sh
            </div>
          </div>
          <div className="flex-1 p-4 font-mono text-[11px] text-cyan flex flex-col gap-1.5 relative overflow-hidden">
             <div className="typing-line-1 overflow-hidden whitespace-nowrap border-r-2 border-cyan/50 w-0">&gt; Initializing virtual runtime...</div>
             <div className="typing-line-2 overflow-hidden whitespace-nowrap border-r-2 border-transparent w-0 opacity-0">&gt; Loading student modules [OK]</div>
             <div className="typing-line-3 overflow-hidden whitespace-nowrap border-r-2 border-transparent w-0 opacity-0">&gt; Executing user_script.py...</div>
             <div className="typing-line-4 overflow-hidden whitespace-nowrap border-r-2 border-transparent w-0 opacity-0">&gt; Processing datasets...</div>
             <div className="text-green-400 mt-2 opacity-0 animate-[fade-in_0.1s_4.5s_forwards]">Success: Simulation completed.</div>
             <div className="text-cyan/50 mt-1 opacity-0 animate-[fade-in_0.1s_5s_forwards] flex gap-1">
               <span>root@vlms:~#</span>
               <span className="animate-[pulse_1s_infinite] w-1.5 h-3.5 bg-cyan inline-block" />
             </div>
          </div>
        </div>

        {/* Server Racks */}
        <div className="absolute bottom-[10%] left-[10%] w-56 h-64 bg-slate-900 border border-slate-700 rounded-xl shadow-2xl flex flex-col p-4 gap-3 z-10 group hover:scale-105 transition-transform duration-500 hover:border-primary/60 hover:shadow-[0_0_50px_rgba(var(--primary),0.3)]">
          <div className="text-[10px] font-mono text-slate-400 uppercase tracking-widest border-b border-slate-700 pb-2 mb-1 flex items-center gap-2">
            <Server className="size-3 text-primary" /> Core Clusters
          </div>
          {[1,2,3,4].map(i => (
            <div key={i} className="flex-1 bg-black/60 border border-slate-800 rounded-md flex items-center px-4 gap-4 overflow-hidden relative">
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-primary/50 to-cyan/50" />
              <div className="flex gap-2">
                <div className={`size-2 rounded-full bg-green-500 animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.8)]`} style={{ animationDelay: `${i * 0.2}s` }} />
                <div className={`size-2 rounded-full bg-cyan animate-pulse shadow-[0_0_8px_rgba(0,255,255,0.8)]`} style={{ animationDelay: `${i * 0.4}s` }} />
              </div>
              <div className="flex-1 space-y-2">
                <div className="h-1 bg-slate-700 rounded w-full" />
                <div className="h-1 bg-slate-700 rounded w-2/3" />
              </div>
              <Activity className="size-4 text-cyan/40" />
            </div>
          ))}
        </div>

        {/* Database Node */}
        <div className="absolute bottom-[20%] right-[10%] w-24 h-24 bg-card border border-border rounded-2xl flex items-center justify-center shadow-xl shadow-primary/20 animate-[float_5s_ease-in-out_infinite] z-20 group hover:scale-110 transition-transform hover:border-primary/50">
          <Database className="size-10 text-primary group-hover:text-cyan transition-colors" />
          <div className="absolute -bottom-1 -right-1 size-3 bg-cyan rounded-full animate-ping" />
        </div>

        {/* CPU Node */}
        <div className="absolute top-[5%] left-[25%] w-20 h-20 bg-card border border-border rounded-xl flex items-center justify-center shadow-xl shadow-mint/20 animate-[float_6s_ease-in-out_infinite_reverse] z-10 group hover:scale-110 transition-transform hover:border-mint/50">
          <Cpu className="size-8 text-mint group-hover:text-cyan transition-colors" />
        </div>

        {/* Connection Lines (SVG) */}
        <svg className="absolute inset-0 w-full h-full -z-10" viewBox="0 0 100 100" preserveAspectRatio="none">
          {/* Circular Rings */}
          <circle cx="50" cy="50" r="35" fill="none" stroke="currentColor" strokeWidth="0.2" className="text-cyan/20 animate-[spin_20s_linear_infinite]" strokeDasharray="4 4" />
          <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="0.4" className="text-primary/10 animate-[spin_30s_linear_infinite_reverse]" strokeDasharray="10 5" />
          
          {/* Animated Data Beams */}
          <path d="M 20 60 Q 50 30 80 40" fill="none" stroke="url(#cyan-gradient)" strokeWidth="0.5" className="animate-pulse" opacity="0.5" />
          <path d="M 30 80 Q 50 50 70 20" fill="none" stroke="url(#primary-gradient)" strokeWidth="0.5" className="animate-pulse" opacity="0.3" style={{ animationDelay: '1s' }} />

          <defs>
            <linearGradient id="cyan-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgba(0,255,255,0)" />
              <stop offset="50%" stopColor="rgba(0,255,255,1)" />
              <stop offset="100%" stopColor="rgba(0,255,255,0)" />
            </linearGradient>
            <linearGradient id="primary-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgba(0,100,255,0)" />
              <stop offset="50%" stopColor="rgba(0,100,255,1)" />
              <stop offset="100%" stopColor="rgba(0,100,255,0)" />
            </linearGradient>
          </defs>
        </svg>

      </div>
    </div>
  );
}
