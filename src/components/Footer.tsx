import { Link } from "@tanstack/react-router";
import {
  FlaskConical,
  Github,
  Linkedin,
  MessageSquareText,
  ShieldCheck,
  Sparkles,
  ExternalLink,
  Code2,
  Lock,
  FileText,
  Copyright,
  ShieldAlert,
  Terminal,
  HelpCircle,
  Mail,
  CheckCircle2
} from "lucide-react";

export function Footer() {
  return (
    <footer className="relative z-10 w-full mt-auto border-t border-slate-200/60 dark:border-slate-800/60 bg-white/40 dark:bg-slate-900/40 backdrop-blur-xl">
      {/* Top subtle highlight gradient */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-cyan/40 to-transparent" />

      <div className="max-w-[1350px] mx-auto px-6 lg:px-12 py-14 lg:py-16">
        
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">
          
          {/* Brand & Mission Column (Span 4) */}
          <div className="lg:col-span-4 flex flex-col gap-4">
            <Link to="/" className="flex items-center gap-3 w-fit group">
              <div className="size-10 rounded-xl bg-gradient-to-br from-cyan-600 via-[#0f172a] to-[#334155] p-0.5 flex items-center justify-center shadow-lg shadow-cyan/10 group-hover:scale-105 transition-transform duration-300">
                <div className="size-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                  <FlaskConical className="size-5 text-cyan" />
                </div>
              </div>
              <div className="flex flex-col">
                <span className="font-display font-bold text-xl tracking-tight text-foreground flex items-center gap-1">
                  VLMS<span className="text-cyan">.</span>
                </span>
                <span className="text-[10.5px] font-mono tracking-wider uppercase text-muted-foreground">
                  Virtual Lab Management System
                </span>
              </div>
            </Link>

            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan/10 border border-cyan/20 w-fit text-cyan text-xs font-semibold">
              <Sparkles className="size-3.5" />
              Explore. Experiment. Learn.
            </div>

            <p className="text-sm text-muted-foreground leading-relaxed pr-4">
              An isolated, authoritative laboratory environment for computer science curricula. Instant in-browser runtimes, zero setup overhead, and real-time AI guidance.
            </p>

            {/* Platform Status Badge */}
            <div className="flex items-center gap-2 text-xs text-muted-foreground font-mono mt-1">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span>All Lab Runtimes Operational</span>
            </div>

            {/* Social Channels */}
            <div className="flex items-center gap-3 mt-3">
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                aria-label="VLMS GitHub Repository"
                className="size-9 rounded-xl border border-border bg-secondary/50 flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-secondary hover:border-cyan/40 transition-all duration-300 shadow-sm"
              >
                <Github className="size-4" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn Official Page"
                className="size-9 rounded-xl border border-border bg-secondary/50 flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-secondary hover:border-cyan/40 transition-all duration-300 shadow-sm"
              >
                <Linkedin className="size-4" />
              </a>
              <a
                href="https://discord.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Discord Community"
                className="size-9 rounded-xl border border-border bg-secondary/50 flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-secondary hover:border-cyan/40 transition-all duration-300 shadow-sm"
              >
                <MessageSquareText className="size-4" />
              </a>
            </div>
          </div>

          {/* Platform Links (Span 2) */}
          <div className="lg:col-span-2 flex flex-col gap-3.5">
            <h4 className="font-display text-xs font-bold tracking-wider text-foreground uppercase flex items-center gap-1.5">
              <Code2 className="size-3.5 text-cyan" />
              Platform
            </h4>
            <div className="flex flex-col gap-2.5 text-sm text-muted-foreground">
              <Link to="/courses" className="hover:text-cyan transition-colors flex items-center gap-1">
                Virtual Labs
              </Link>
              <Link to="/workspace" className="hover:text-cyan transition-colors flex items-center gap-1">
                Playground & Compiler
              </Link>
              <Link to="/courses" className="hover:text-cyan transition-colors">
                All Experiments
              </Link>
              <Link to="/resources" className="hover:text-cyan transition-colors">
                Short Notes & Manuals
              </Link>
              <Link to="/dashboard" className="hover:text-cyan transition-colors">
                Student Dashboard
              </Link>
            </div>
          </div>

          {/* Legal & Governance (Span 3) */}
          <div className="lg:col-span-3 flex flex-col gap-3.5">
            <h4 className="font-display text-xs font-bold tracking-wider text-foreground uppercase flex items-center gap-1.5">
              <ShieldCheck className="size-3.5 text-purple-500" />
              Legal & Policy
            </h4>
            <div className="flex flex-col gap-2.5 text-sm text-muted-foreground">
              <Link
                to="/legal"
                search={{ tab: "privacy" }}
                className="hover:text-cyan transition-colors flex items-center justify-between group"
              >
                <span>Privacy Policy</span>
                <span className="text-[10px] font-mono text-cyan/70 opacity-0 group-hover:opacity-100 transition-opacity">01-10</span>
              </Link>
              <Link
                to="/legal"
                search={{ tab: "terms" }}
                className="hover:text-cyan transition-colors flex items-center justify-between group"
              >
                <span>Terms of Service</span>
                <span className="text-[10px] font-mono text-cyan/70 opacity-0 group-hover:opacity-100 transition-opacity">11</span>
              </Link>
              <Link
                to="/legal"
                search={{ tab: "acceptable-use" }}
                className="hover:text-cyan transition-colors flex items-center justify-between group"
              >
                <span>Acceptable Use Policy</span>
                <span className="text-[10px] font-mono text-cyan/70 opacity-0 group-hover:opacity-100 transition-opacity">12</span>
              </Link>
              <Link
                to="/legal"
                search={{ tab: "copyright" }}
                className="hover:text-cyan transition-colors flex items-center justify-between group"
              >
                <span>Copyright & IP Policy</span>
                <span className="text-[10px] font-mono text-cyan/70 opacity-0 group-hover:opacity-100 transition-opacity">13</span>
              </Link>
              <Link
                to="/legal"
                search={{ tab: "licenses" }}
                className="hover:text-cyan transition-colors flex items-center justify-between group"
              >
                <span>Third-Party Licenses</span>
                <span className="text-[10px] font-mono text-cyan/70 opacity-0 group-hover:opacity-100 transition-opacity">14</span>
              </Link>
              <Link
                to="/legal"
                search={{ section: "cookies-and-storage" }}
                className="hover:text-cyan transition-colors flex items-center justify-between group"
              >
                <span>Cookie Policy</span>
                <span className="text-[10px] font-mono text-cyan/70 opacity-0 group-hover:opacity-100 transition-opacity">08</span>
              </Link>
            </div>
          </div>

          {/* Academic Context & Collaboration (Span 3) */}
          <div className="lg:col-span-3 flex flex-col gap-3.5">
            <h4 className="font-display text-xs font-bold tracking-wider text-foreground uppercase flex items-center gap-1.5">
              <Building className="size-3.5 text-cyan" />
              Resources & Academic
            </h4>
            <div className="flex flex-col gap-2.5 text-sm text-muted-foreground">
              <Link to="/about" className="hover:text-cyan transition-colors">
                About Virtual Lab
              </Link>
              <Link to="/legal" search={{ tab: "contact" }} className="hover:text-cyan transition-colors">
                Help Center & Support
              </Link>
              <Link to="/contact" className="hover:text-cyan transition-colors flex items-center gap-1">
                Report an Issue / Bug
              </Link>
            </div>

            {/* Team SAPL & qubitedge Attribution Card */}
            <div className="mt-2 p-3.5 rounded-2xl bg-secondary/40 border border-border/80 text-xs space-y-2">
              <div className="flex items-center gap-2 font-semibold text-foreground">
                <span className="size-2 rounded-full bg-cyan" />
                <span>Developed by <strong>Team SAPL</strong></span>
              </div>
              <p className="text-[11.5px] text-muted-foreground leading-snug">
                Sai Rupini • Sk. Asma • K. Pravallika • M. Likhith Kumar
              </p>
              <div className="pt-2 border-t border-border/50 flex items-center justify-between text-[11px] text-muted-foreground">
                <span>In Collaboration with</span>
                <strong className="text-cyan">qubitedge</strong>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="border-t border-border/60 mt-12 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-center sm:text-left">
            <span className="font-medium text-foreground">
              &copy; 2026 VLMS. All rights reserved.
            </span>
            <span className="hidden sm:inline text-border">•</span>
            <span className="text-muted-foreground/80">
              Made for learning, experimentation & innovation.
            </span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 font-medium">
            <Link to="/legal" search={{ tab: "privacy" }} className="hover:text-foreground transition-colors">
              Privacy Policy
            </Link>
            <Link to="/legal" search={{ tab: "terms" }} className="hover:text-foreground transition-colors">
              Terms of Service
            </Link>
            <Link to="/legal" search={{ tab: "copyright" }} className="hover:text-foreground transition-colors">
              Copyright & IP
            </Link>
            <Link to="/legal" search={{ tab: "acceptable-use" }} className="hover:text-foreground transition-colors">
              Acceptable Use
            </Link>
            <Link to="/legal" search={{ tab: "licenses" }} className="hover:text-foreground transition-colors">
              Licenses
            </Link>
            <Link to="/contact" className="hover:text-foreground transition-colors text-cyan font-semibold">
              Contact Us
            </Link>
          </div>
        </div>

      </div>
    </footer>
  );
}

function Building(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="16" height="20" x="4" y="2" rx="2" ry="2" />
      <path d="M9 22v-4h6v4" />
      <path d="M8 6h.01" />
      <path d="M16 6h.01" />
      <path d="M8 10h.01" />
      <path d="M16 10h.01" />
      <path d="M8 14h.01" />
      <path d="M16 14h.01" />
      <path d="M8 18h.01" />
      <path d="M16 18h.01" />
    </svg>
  );
}
