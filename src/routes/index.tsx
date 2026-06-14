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
    <div className="min-h-screen flex flex-col relative overflow-hidden bg-background">
      {/* Animated Background Gradients & Grid */}
      <div className="absolute inset-0 grid-bg hero-fade opacity-30 z-0" />
      
      {/* Massive Glowing Orbs for Professional Visuals */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] lg:w-[800px] lg:h-[800px] bg-cyan/20 rounded-full mix-blend-screen filter blur-[120px] lg:blur-[180px] opacity-60 animate-pulse" style={{ animationDuration: '6s' }} />
      <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] lg:w-[800px] lg:h-[800px] bg-primary/20 rounded-full mix-blend-screen filter blur-[120px] lg:blur-[180px] opacity-60 animate-pulse" style={{ animationDuration: '9s' }} />
      
      {/* Top Navigation Bar */}
      <header className="relative z-20 w-full px-6 lg:px-12 py-6 flex items-center justify-between border-b border-white/5 backdrop-blur-md bg-background/50">
        <div className="flex items-center gap-3">
          <div className="size-10 rounded-xl bg-gradient-to-br from-cyan to-primary flex items-center justify-center shadow-lg shadow-cyan/20">
            <FlaskConical className="size-5 text-white" />
          </div>
          <span className="font-display font-bold text-xl tracking-tight text-foreground">
            VLMS<span className="text-cyan">.</span>
          </span>
        </div>
        <div className="hidden sm:flex items-center gap-6 text-sm font-medium text-muted-foreground">
          <span className="hover:text-cyan transition-colors cursor-default flex items-center gap-2"><Code2 className="size-4" /> Next-Gen Environments</span>
          <span className="hover:text-cyan transition-colors cursor-default flex items-center gap-2"><Globe className="size-4" /> Zero Setup</span>
        </div>
        <Link
          to="/dashboard"
          className="text-sm font-semibold text-cyan hover:text-white transition-colors"
        >
          Skip to Dashboard
        </Link>
      </header>

      {/* Main Hero Content */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 lg:px-10 text-center">
        
        {/* Eyebrow Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-cyan/30 bg-cyan/10 text-xs font-semibold text-cyan mb-8 opacity-0 animate-fade-in-up">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan"></span>
          </span>
          System Online • v2.0
        </div>

        {/* Hero Title */}
        <h1 className="font-display text-5xl sm:text-6xl lg:text-8xl font-black leading-[1.05] tracking-tight opacity-0 animate-fade-in-up delay-100 max-w-5xl mx-auto">
          The Future of <br className="hidden sm:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan via-primary to-purple-500 animate-gradient bg-300%">
            Computer Science Labs.
          </span>
        </h1>
        
        {/* Hero Subtitle */}
        <p className="mt-8 text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto opacity-0 animate-fade-in-up delay-200 font-light leading-relaxed">
          Experience an authoritative, zero-friction virtual laboratory framework. Launch instant runtimes, execute complex data structures, and train ML models directly in your browser.
        </p>

        {/* Primary CTA */}
        <div className="mt-12 flex flex-col sm:flex-row items-center gap-4 opacity-0 animate-fade-in-up delay-300">
          <Link
            to="/dashboard"
            className="group relative inline-flex h-14 items-center justify-center overflow-hidden rounded-full bg-foreground px-8 font-medium text-background transition-all duration-300 hover:scale-105 active:scale-95 shadow-[0_0_40px_-10px_rgba(0,255,255,0.4)] hover:shadow-[0_0_60px_-15px_rgba(0,255,255,0.6)]"
          >
            <span className="mr-2 text-base font-bold tracking-wide">Enter Platform</span>
            <ArrowRight className="size-5 transition-transform duration-300 group-hover:translate-x-1" />
            
            {/* Shimmer effect inside button */}
            <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-background/20 to-transparent" />
          </Link>
          
          <Link
            to="/about"
            className="inline-flex h-14 items-center justify-center rounded-full border border-border bg-card/40 backdrop-blur px-8 text-base font-medium text-foreground transition-colors hover:bg-secondary/80 hover:text-cyan"
          >
            <LayoutTemplate className="size-5 mr-2" />
            Learn More
          </Link>
        </div>

        {/* Visual Terminal/Code Element below the fold */}
        <div className="mt-20 w-full max-w-4xl mx-auto opacity-0 animate-fade-in-up delay-400">
          <div className="rounded-xl overflow-hidden border border-border/50 bg-black/80 shadow-2xl backdrop-blur-xl animate-float">
            <div className="flex items-center gap-2 px-4 py-3 bg-secondary/30 border-b border-border/30">
              <div className="size-3 rounded-full bg-red-500/80" />
              <div className="size-3 rounded-full bg-yellow-500/80" />
              <div className="size-3 rounded-full bg-green-500/80" />
              <span className="ml-2 text-xs font-mono text-muted-foreground flex items-center gap-2"><TerminalSquare className="size-3" /> vlms-terminal</span>
            </div>
            <div className="p-6 font-mono text-sm text-left flex flex-col gap-2">
              <div className="typing-line-1 overflow-hidden whitespace-nowrap border-r-2 border-cyan text-emerald-400">
                <span className="text-cyan">$</span> initialize_workspace --environment=production
              </div>
              <div className="typing-line-2 overflow-hidden whitespace-nowrap border-r-2 border-transparent text-muted-foreground w-0 opacity-0">
                [OK] Connecting to cluster...
              </div>
              <div className="typing-line-3 overflow-hidden whitespace-nowrap border-r-2 border-transparent text-muted-foreground w-0 opacity-0">
                [OK] Provisioning secure runtime sandbox...
              </div>
              <div className="typing-line-4 overflow-hidden whitespace-nowrap border-r-2 border-transparent text-cyan w-0 opacity-0 font-bold">
                Ready. Welcome to VLMS.
              </div>
            </div>
          </div>
        </div>

      </main>
      
      {/* Footer */}
      <footer className="relative z-10 w-full py-6 text-center text-xs font-medium text-muted-foreground/60 border-t border-border/30">
        &copy; {new Date().getFullYear()} VLMS Virtual Lab. Designed for Next-Gen Education.
      </footer>
    </div>
  );
}
