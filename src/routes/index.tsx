import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, TerminalSquare, LayoutTemplate, FlaskConical, Code2, Globe } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Welcome — VLMS Virtual Lab" },
      { name: "description", content: "The Next-Generation Virtual Computing Laboratory." },
    ],
  }),
  component: LandingPage,
});

function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden bg-white text-slate-900">
      {/* Full Screen Background Image (User should upload 'bg-landing.jpg' to public folder) */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-90"
        style={{ backgroundImage: "url('/bg-landing.jpg'), linear-gradient(to bottom, #f8fafc, #e2e8f0)" }}
      />
      
      {/* Light Overlay for readability */}
      <div className="absolute inset-0 z-0 bg-white/40 backdrop-blur-[2px]" />
      
      {/* Top Navigation Bar */}
      <header className="relative z-20 w-full px-6 lg:px-12 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="size-10 rounded-xl bg-gradient-to-br from-[#0f172a] to-[#334155] flex items-center justify-center shadow-lg">
            <FlaskConical className="size-5 text-white" />
          </div>
          <span className="font-display font-bold text-xl tracking-tight text-slate-900">
            VLMS<span className="text-purple-600">.</span>
          </span>
        </div>
        <div className="hidden sm:flex items-center gap-6 text-sm font-semibold text-slate-600">
          <span className="hover:text-purple-600 transition-colors cursor-default flex items-center gap-2"><Code2 className="size-4" /> Next-Gen Environments</span>
          <span className="hover:text-purple-600 transition-colors cursor-default flex items-center gap-2"><Globe className="size-4" /> Zero Setup</span>
        </div>
        <Link
          to="/dashboard"
          className="text-sm font-bold text-purple-600 hover:text-purple-800 transition-colors"
        >
          Skip to Dashboard
        </Link>
      </header>

      {/* Main Hero Content */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 lg:px-10 text-center pb-20">
        
        {/* Eyebrow Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan/10 text-xs font-bold text-cyan mb-8 opacity-0 animate-fade-in-up backdrop-blur-md border border-cyan/20 shadow-sm">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan"></span>
          </span>
          System Online • v2.0
        </div>

        {/* Hero Title - Solid Purple like Mockup */}
        <h1 className="font-display text-5xl sm:text-6xl lg:text-[5.5rem] font-black leading-[1.1] tracking-tight opacity-0 animate-fade-in-up delay-100 max-w-5xl mx-auto text-[#7c3aed] drop-shadow-sm">
          The Future of <br className="hidden sm:block" />
          Computer Science <br className="hidden sm:block" /> Labs.
        </h1>
        
        {/* Hero Subtitle */}
        <p className="mt-8 text-lg sm:text-xl text-slate-800 max-w-3xl mx-auto opacity-0 animate-fade-in-up delay-200 font-medium leading-relaxed drop-shadow-sm">
          Experience an authoritative, zero-friction virtual laboratory framework. <br className="hidden md:block" /> Launch instant runtimes, execute complex data structures, and train <br className="hidden md:block" /> ML models directly in your browser.
        </p>

        {/* Primary CTA */}
        <div className="mt-12 flex flex-col sm:flex-row items-center gap-4 opacity-0 animate-fade-in-up delay-300">
          <Link
            to="/dashboard"
            className="group relative inline-flex h-14 items-center justify-center overflow-hidden rounded-full bg-[#7c3aed] px-10 font-medium text-white transition-all duration-300 hover:scale-105 active:scale-95 shadow-xl hover:shadow-purple-500/30"
          >
            <span className="mr-2 text-base font-bold tracking-wide">Enter Platform</span>
            <ArrowRight className="size-5 transition-transform duration-300 group-hover:translate-x-1" />
            <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
          </Link>
        </div>
      </main>

      {/* Floating Robot Icon (Bottom Right) */}
      <div className="absolute bottom-8 right-8 z-50 opacity-0 animate-fade-in-up delay-500 animate-float">
        <div className="size-16 rounded-full bg-blue-500/10 backdrop-blur-md border border-blue-200/50 flex items-center justify-center shadow-lg cursor-pointer hover:bg-blue-500/20 transition-colors">
           <img src="/robot-icon.png" alt="Bot" className="size-12 object-contain" onError={(e) => { e.currentTarget.style.display = 'none'; }} />
        </div>
      </div>



      {/* Footer */}
      <footer className="relative z-10 w-full py-4 text-center text-xs font-medium text-slate-500">
        &copy; {new Date().getFullYear()} VLMS Virtual Lab. Designed for Next-Gen Education.
      </footer>
    </div>
  );
}
