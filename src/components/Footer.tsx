import { Link } from "@tanstack/react-router";
import { FlaskConical, Github, Linkedin, MessageSquareText, ShieldAlert } from "lucide-react";

export function Footer() {
  return (
    <footer className="relative z-10 w-full mt-auto border-t border-slate-200/50 dark:border-slate-800/50 bg-white/30 dark:bg-slate-900/30 backdrop-blur-md">
      <div className="max-w-[1250px] mx-auto px-6 lg:px-10 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          
          {/* Brand Info */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <div className="size-9 rounded-xl bg-gradient-to-br from-[#0f172a] to-[#334155] flex items-center justify-center shadow-md">
                <FlaskConical className="size-4.5 text-white" />
              </div>
              <span className="font-display font-bold text-lg tracking-tight text-foreground">
                VLMS<span className="text-purple-600">.</span>
              </span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              An isolated, authoritative laboratory environment for computer science curricula. Instant runtimes, zero config.
            </p>
            <div className="flex items-center gap-3 mt-2">
              <a 
                href="https://github.com" 
                target="_blank" 
                rel="noreferrer"
                className="size-9 rounded-full border border-slate-200/50 dark:border-slate-800/50 flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-slate-100 dark:hover:bg-slate-800 transition-all duration-300"
              >
                <Github className="size-4" />
              </a>
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noreferrer"
                className="size-9 rounded-full border border-slate-200/50 dark:border-slate-800/50 flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-slate-100 dark:hover:bg-slate-800 transition-all duration-300"
              >
                <Linkedin className="size-4" />
              </a>
              <a 
                href="https://discord.com" 
                target="_blank" 
                rel="noreferrer"
                className="size-9 rounded-full border border-slate-200/50 dark:border-slate-800/50 flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-slate-100 dark:hover:bg-slate-800 transition-all duration-300"
              >
                <MessageSquareText className="size-4" />
              </a>
            </div>
          </div>

          {/* Curriculum */}
          <div className="flex flex-col gap-3">
            <h4 className="font-display text-sm font-semibold tracking-wider text-foreground uppercase">Curriculum</h4>
            <div className="flex flex-col gap-2.5 text-sm text-muted-foreground">
              <Link to="/courses" className="hover:text-purple-600 transition-colors">Programming</Link>
              <Link to="/courses" className="hover:text-purple-600 transition-colors">Artificial Intelligence</Link>
              <Link to="/courses" className="hover:text-purple-600 transition-colors">Emerging Technologies</Link>
              <Link to="/courses" className="hover:text-purple-600 transition-colors">Course Catalog</Link>
            </div>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col gap-3">
            <h4 className="font-display text-sm font-semibold tracking-wider text-foreground uppercase">Platform</h4>
            <div className="flex flex-col gap-2.5 text-sm text-muted-foreground">
              <Link to="/" className="hover:text-purple-600 transition-colors">Home / Landing</Link>
              <Link to="/workspace" className="hover:text-purple-600 transition-colors">Playground / Compiler</Link>
              <Link to="/resources" className="hover:text-purple-600 transition-colors">Resources & Help</Link>
              <Link to="/about" className="hover:text-purple-600 transition-colors">About Virtual Lab</Link>
            </div>
          </div>

          {/* Developers & SAPL */}
          <div className="flex flex-col gap-3">
            <h4 className="font-display text-sm font-semibold tracking-wider text-foreground uppercase">Academic Context</h4>
            <div className="flex flex-col gap-2 text-sm text-muted-foreground leading-relaxed">
              <div className="flex items-start gap-2 text-xs bg-purple-500/5 dark:bg-purple-500/10 border border-purple-500/10 rounded-xl p-3">
                <ShieldAlert className="size-4.5 text-purple-500 shrink-0 mt-0.5" />
                <span>
                  Developed with ❤️ by <strong className="text-foreground">Team SAPL</strong>:<br />
                  Sai Rupini • Asma • Pravallika • Likhith
                </span>
              </div>
              <p className="text-[11.5px] mt-1 text-slate-400 dark:text-slate-500">
                Designed to facilitate interactive, friction-free education for universities and engineering departments.
              </p>
            </div>
          </div>

        </div>

        <div className="border-t border-slate-200/50 dark:border-slate-800/50 mt-12 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-medium text-slate-400 dark:text-slate-500">
          <div>
            &copy; {new Date().getFullYear()} VLMS Virtual Lab. All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <span className="hover:text-foreground cursor-default transition-colors">Privacy Policy</span>
            <span className="hover:text-foreground cursor-default transition-colors">Terms of Service</span>
            <span className="hover:text-foreground cursor-default transition-colors">JNTUGV / CEV Syllabus</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
