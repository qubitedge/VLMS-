import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, ArrowRight, Sparkles, Activity, Boxes, Send, Timer, ShieldCheck, GitBranch, FlaskConical, Code, Workflow, Monitor, Database, Brain } from "lucide-react";
import { BranchCard } from "@/components/BranchCard";
import { LearningJourney } from "@/components/LearningJourney";
import { HeroAnimation } from "@/components/HeroAnimation";
import { branches, metrics, runtimes } from "@/lib/lab-data";

import { CourseCarousel } from "@/components/CourseCarousel";

export const Route = createFileRoute("/dashboard")({
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

          </div>

          <div className="hidden lg:block relative opacity-0 animate-fade-in-up delay-300 z-10 -translate-x-32 scale-125">
            <HeroAnimation />
          </div>
        </div>
      </section>

      {/* Course Carousel Section */}
      <section className="px-6 lg:px-10 py-6 border-b border-border bg-slate-500/5 backdrop-blur-sm">
        <CourseCarousel />
      </section>

      <LearningJourney />



      {/* Trust Badges Row */}
      <section className="border-y border-border bg-secondary/30 px-6 lg:px-10 py-10 opacity-0 animate-fade-in-up delay-300">

        <div className="flex flex-wrap items-center justify-center gap-6 lg:gap-10">
          {/* Python */}
          <div className="flex items-center gap-2.5 px-4 py-2 rounded-full border border-border bg-background/60 hover:border-cyan/40 hover:bg-cyan/5 transition-all duration-300 group">
            <i className="fab fa-python text-[1.4rem] text-[#3b82f6] group-hover:scale-110 transition-transform duration-300" />
            <span className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">Python</span>
          </div>
          {/* Java */}
          <div className="flex items-center gap-2.5 px-4 py-2 rounded-full border border-border bg-background/60 hover:border-cyan/40 hover:bg-cyan/5 transition-all duration-300 group">
            <i className="fab fa-java text-[1.4rem] text-[#f59e0b] group-hover:scale-110 transition-transform duration-300" />
            <span className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">Java</span>
          </div>
          {/* C */}
          <div className="flex items-center gap-2.5 px-4 py-2 rounded-full border border-border bg-background/60 hover:border-cyan/40 hover:bg-cyan/5 transition-all duration-300 group">
            <span className="text-[1.1rem] font-bold text-[#0ea5e9] group-hover:scale-110 transition-transform duration-300 font-mono">C</span>
            <span className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">C Language</span>
          </div>
          {/* SQL */}
          <div className="flex items-center gap-2.5 px-4 py-2 rounded-full border border-border bg-background/60 hover:border-cyan/40 hover:bg-cyan/5 transition-all duration-300 group">
            <Database className="size-5 text-[#8b5cf6] group-hover:scale-110 transition-transform duration-300" />
            <span className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">SQL / DBMS</span>
          </div>
          {/* ML */}
          <div className="flex items-center gap-2.5 px-4 py-2 rounded-full border border-border bg-background/60 hover:border-cyan/40 hover:bg-cyan/5 transition-all duration-300 group">
            <Brain className="size-5 text-[#10b981] group-hover:scale-110 transition-transform duration-300" />
            <span className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">Machine Learning</span>
          </div>
          {/* IoT */}
          <div className="flex items-center gap-2.5 px-4 py-2 rounded-full border border-border bg-background/60 hover:border-cyan/40 hover:bg-cyan/5 transition-all duration-300 group">
            <Activity className="size-5 text-[#f43f5e] group-hover:scale-110 transition-transform duration-300" />
            <span className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">IoT</span>
          </div>
          {/* AI */}
          <div className="flex items-center gap-2.5 px-4 py-2 rounded-full border border-border bg-background/60 hover:border-cyan/40 hover:bg-cyan/5 transition-all duration-300 group">
            <Sparkles className="size-5 text-[#a78bfa] group-hover:scale-110 transition-transform duration-300" />
            <span className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">AI Tools</span>
          </div>
        </div>

      </section>

      {/* CTA Bottom Banner */}
      <section className="relative overflow-hidden px-6 lg:px-10 py-16 opacity-0 animate-fade-in-up delay-300">
        {/* Gradient background */}
        <div className="absolute inset-0 bg-gradient-to-r from-cyan/10 via-primary/10 to-cyan/10" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/0 to-background/50" />
        {/* Glowing orbs */}
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-cyan/20 rounded-full filter blur-[80px] opacity-60 animate-pulse" style={{ animationDuration: '4s' }} />
        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-primary/20 rounded-full filter blur-[80px] opacity-60 animate-pulse" style={{ animationDuration: '6s' }} />
        {/* Border top/bottom */}
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan/40 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />

        <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8 max-w-5xl mx-auto">
          <div>
            <div className="text-[11px] font-mono uppercase tracking-[0.25em] text-cyan mb-3">Get Started Today</div>
            <h2 className="font-display text-3xl lg:text-4xl font-bold leading-tight">
              Ready to start?{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan to-primary">Launch your workspace</span>
            </h2>
            <p className="mt-3 text-muted-foreground max-w-md">
              No registration required. Jump straight into experiments, run code, and get instant results in your browser.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <Link
              to="/workspace"
              className="inline-flex items-center justify-center gap-2 rounded-md bg-gradient-to-r from-cyan to-primary text-white px-7 py-3 text-sm font-semibold hover:opacity-90 transition-all duration-300 hover:scale-105 active:scale-95 hover:shadow-xl hover:shadow-cyan/30 group"
            >
              Launch Workspace
              <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
            <Link
              to="/courses"
              className="inline-flex items-center justify-center gap-2 rounded-md border border-cyan/30 bg-background/60 backdrop-blur px-7 py-3 text-sm font-semibold text-cyan hover:bg-cyan/10 transition-all duration-300 hover:scale-105 active:scale-95"
            >
              Browse Courses
            </Link>
          </div>
        </div>
      </section>

      <footer className="border-t border-border px-6 lg:px-10 py-10 flex flex-col items-center justify-center gap-2 text-sm text-center">
        <div className="font-medium text-transparent bg-clip-text bg-gradient-to-r from-cyan to-primary">
          In the guidance
        </div>
        <div className="font-semibold text-base text-transparent bg-clip-text bg-gradient-to-r from-cyan to-primary mb-4">
          <a href="https://www.linkedin.com/in/dr-g-jaya-suma/" target="_blank" rel="noreferrer" className="hover:underline">Professor Dr.G.Jayasuma</a>
        </div>
        <div className="font-medium text-transparent bg-clip-text bg-gradient-to-r from-cyan to-primary">
          Designed by
        </div>
        <div className="font-medium leading-relaxed text-transparent bg-clip-text bg-gradient-to-r from-cyan to-primary flex flex-wrap justify-center gap-5">
          <a href="https://www.linkedin.com/in/sairupini-chitikesi" target="_blank" rel="noreferrer" className="hover:underline">Ch.Sai Rupini</a>
          <a href="https://www.linkedin.com/in/shaik-asma-216564330" target="_blank" rel="noreferrer" className="hover:underline">Sk.Asma</a>
          <a href="https://www.linkedin.com/in/kundum-pravallika-4a1249296" target="_blank" rel="noreferrer" className="hover:underline">K.Pravallika</a>
          <a href="https://www.linkedin.com/in/likhithmankala/" target="_blank" rel="noreferrer" className="hover:underline">M.Likhith Kumar</a>
        </div>
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
