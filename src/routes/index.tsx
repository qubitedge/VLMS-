import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, ArrowRight, Sparkles, Activity, Boxes, Send, Timer, ShieldCheck, GitBranch, FlaskConical, Code, Workflow, Monitor, Database, Brain } from "lucide-react";
import { BranchCard } from "@/components/BranchCard";
import { LearningJourney } from "@/components/LearningJourney";
import { HeroAnimation } from "@/components/HeroAnimation";
import { branches, metrics, runtimes } from "@/lib/lab-data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Dashboard — VLMS Virtual Lab" },
      { name: "description", content: "Production-grade academic sandbox for computer science curricula." },
    ],
  }),
  component: Dashboard,
});

function getTopicIcon(topic: string) {
  if (topic === "C Programming") return <Code className="size-5 shrink-0 text-cyan" />;
  if (topic === "Python") return <i className="fab fa-python text-[1.25rem] shrink-0 text-cyan"></i>;
  if (topic === "Java") return <i className="fab fa-java text-[1.25rem] shrink-0 text-cyan"></i>;
  if (topic.includes("Data Structures")) return <GitBranch className="size-5 shrink-0 text-cyan" />;
  if (topic === "OS" || topic === "Operating Systems") return <Monitor className="size-5 shrink-0 text-cyan" />;
  if (topic === "DBMS") return <Database className="size-5 shrink-0 text-cyan" />;
  if (topic === "Machine Learning") return <Brain className="size-5 shrink-0 text-cyan" />;
  if (topic === "AI Tools") return <Sparkles className="size-5 shrink-0 text-cyan" />;
  if (topic === "Algorithms") return <Workflow className="size-5 shrink-0 text-cyan" />;
  return null;
}


function Dashboard() {
  return (
    <div>
      {/* Banner */}
      <div className="border-b border-border bg-secondary/50 px-6 py-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs group cursor-default transition-colors hover:bg-secondary/70">
        <span className="inline-flex items-center gap-1.5 font-semibold text-foreground relative">
          <Sparkles className="size-3.5 text-cyan animate-pulse group-hover:animate-spin" style={{ animationDuration: '3s' }} />
          Zero-Friction Access Model
          <span className="absolute inset-0 bg-cyan/20 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-full" />
        </span>
        <span className="text-muted-foreground transition-colors group-hover:text-foreground">No Registration or Login Required for Student Investigators · Drafts persist via Local Storage hooks</span>
      </div>

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border">
        <div className="absolute inset-0 grid-bg hero-fade" />
        
        {/* Animated Background Orbs */}
        <div className="absolute top-10 left-10 lg:top-1/4 lg:left-1/4 w-72 h-72 lg:w-96 lg:h-96 bg-cyan/20 rounded-full mix-blend-screen filter blur-[80px] lg:blur-[100px] opacity-50 animate-pulse" style={{ animationDuration: '5s' }} />
        <div className="absolute top-20 right-10 lg:top-1/3 lg:right-1/4 w-80 h-80 lg:w-[30rem] lg:h-[30rem] bg-primary/20 rounded-full mix-blend-screen filter blur-[100px] lg:blur-[120px] opacity-50 animate-pulse" style={{ animationDuration: '8s' }} />

        <div className="relative px-6 lg:px-10 py-16 lg:py-24 grid lg:grid-cols-[1fr_400px] xl:grid-cols-[1fr_500px] gap-10 items-center">
          <div className="max-w-2xl relative z-10">

            <h1 className="mt-6 font-display text-5xl lg:text-7xl font-bold leading-[0.95] tracking-tight opacity-0 animate-fade-in-up">
              Virtual Lab <br />
              Management <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan to-primary">System</span>
            </h1>
            <p className="mt-6 text-base lg:text-lg text-muted-foreground max-w-xl opacity-0 animate-fade-in-up delay-100">
              An isolated, authoritative laboratory framework for computer science curricula. Instant runtimes, automated evaluation, and zero-friction student access — no registration required.
            </p>
            <div className="mt-8 flex flex-wrap gap-3 opacity-0 animate-fade-in-up delay-200">
              <Link to="/workspace" className="inline-flex items-center gap-2 rounded-md bg-primary text-primary-foreground px-5 py-2.5 text-sm font-medium hover:bg-primary/90 transition-all duration-300 hover:scale-105 active:scale-95 hover:shadow-lg hover:shadow-primary/20 group">
                Launch Workspace <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
              <Link to="/courses" className="inline-flex items-center gap-2 rounded-md border border-border bg-background px-5 py-2.5 text-sm font-medium hover:bg-secondary transition-all duration-300 hover:scale-105 active:scale-95 hover:border-cyan/30 hover:text-cyan">
                Browse Courses
              </Link>
            </div>
          </div>

          <div className="hidden lg:block relative opacity-0 animate-fade-in-up delay-300 z-10 -translate-x-32 scale-125">
            <HeroAnimation />
          </div>
        </div>
      </section>



      <LearningJourney />



      {/* Courses */}
      <section className="px-6 lg:px-10 py-14 opacity-0 animate-fade-in-up delay-300">
        <div className="flex items-end justify-between flex-wrap gap-4">
          <SectionHeader eyebrow="Curriculum Tracks" title="Courses" caption="Technical courses aligned to the undergraduate computer science syllabus." />
          <Link to="/courses" className="inline-flex items-center gap-1 text-sm font-medium group transition-all text-cyan hover:text-cyan/80">
            View matrix <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
          </Link>
        </div>
        <div className="mt-8 grid md:grid-cols-2 xl:grid-cols-3 gap-5">
          {branches.find(b => b.code === "IT")?.topics.map((t, idx) => (
            <Link to={`/course/${t.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-')}`} key={t} className={`block group opacity-0 animate-fade-in-up`} style={{ animationDelay: `${400 + idx * 100}ms` }}>
              <div className="p-6 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:hover:shadow-[0_8px_30px_rgb(0,0,0,0.1)] hover:border-cyan/40 dark:hover:border-cyan/40 relative overflow-hidden h-full flex flex-col justify-between min-h-[150px]">
                <div className="absolute inset-0 bg-gradient-to-br from-cyan/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <h3 className="font-display text-[21px] font-bold relative z-10 flex items-start gap-2.5 text-transparent bg-clip-text bg-gradient-to-r from-cyan to-primary">
                  <div className="mt-1">{getTopicIcon(t)}</div>
                  <span className="leading-tight">{t}</span>
                </h3>
                <div className="relative z-10 mt-6">
                  <div className="inline-flex items-center justify-center gap-1.5 px-4 py-1.5 bg-transparent border border-slate-300 dark:border-slate-700 rounded-full text-[13px] font-medium text-slate-800 dark:text-slate-300 group-hover:bg-cyan/5 group-hover:text-cyan-700 dark:group-hover:text-cyan-400 group-hover:border-cyan/40 transition-all duration-300">
                    Explore Course <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <footer className="border-t border-border px-6 lg:px-10 py-8 flex flex-wrap items-center justify-between gap-3 text-xs text-muted-foreground">
        <div className="font-mono uppercase tracking-[0.18em]">VLMS · JNTU</div>
        <div className="font-mono">© 2026 · Sandbox v2.6.014</div>
      </footer>
    </div>
  );
}

function SectionHeader({ eyebrow, title, caption }: { eyebrow: string; title: string; caption: string }) {
  return (
    <div>
      <div className="text-[11px] font-mono uppercase tracking-[0.2em] text-cyan">{eyebrow}</div>
      <h2 className="mt-2 font-display text-3xl lg:text-4xl font-bold tracking-tight">{title}</h2>
      <p className="mt-1.5 text-sm text-muted-foreground">{caption}</p>
    </div>
  );
}
