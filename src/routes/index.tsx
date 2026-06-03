import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, Sparkles, Activity, Boxes, Send, Timer, ShieldCheck, GitBranch, FlaskConical } from "lucide-react";
import { BranchCard } from "@/components/BranchCard";
import { LearningJourney } from "@/components/LearningJourney";
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

function Dashboard() {
  return (
    <div>
      {/* Banner */}
      <div className="border-b border-border bg-secondary/50 px-6 py-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs">
        <span className="inline-flex items-center gap-1.5 font-semibold text-foreground">
          <Sparkles className="size-3.5 text-cyan" /> Zero-Friction Access Model
        </span>
        <span className="text-muted-foreground">No Registration or Login Required for Student Investigators · Drafts persist via Local Storage hooks</span>
      </div>

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border">
        <div className="absolute inset-0 grid-bg hero-fade" />
        <div className="relative px-6 lg:px-10 py-16 lg:py-24 grid lg:grid-cols-[1fr_360px] gap-10 items-start">
          <div className="max-w-2xl">

            <h1 className="mt-6 font-display text-5xl lg:text-7xl font-bold leading-[0.95] tracking-tight">
              Virtual Lab <br />
              Management <span className="text-cyan">System</span>
            </h1>
            <p className="mt-6 text-base lg:text-lg text-muted-foreground max-w-xl">
              An isolated, authoritative laboratory framework for computer science curricula. Instant runtimes, automated evaluation, and zero-friction student access — no registration required.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/workspace" className="inline-flex items-center gap-2 rounded-md bg-primary text-primary-foreground px-5 py-2.5 text-sm font-medium hover:bg-primary/90">
                Launch Workspace <ArrowUpRight className="size-4" />
              </Link>
              <Link to="/courses" className="inline-flex items-center gap-2 rounded-md border border-border bg-background px-5 py-2.5 text-sm font-medium hover:bg-secondary">
                Browse Courses
              </Link>
            </div>
          </div>

        </div>
      </section>



      <LearningJourney />



      {/* Courses */}
      <section className="px-6 lg:px-10 py-14">
        <div className="flex items-end justify-between flex-wrap gap-4">
          <SectionHeader eyebrow="Curriculum Tracks" title="Courses" caption="Technical courses aligned to the undergraduate computer science syllabus." />
          <Link to="/courses" className="inline-flex items-center gap-1 text-sm font-medium hover:gap-2 transition-all">
            View matrix <ArrowUpRight className="size-4" />
          </Link>
        </div>
        <div className="mt-8 grid md:grid-cols-2 xl:grid-cols-3 gap-4">
          {branches.find(b => b.code === "IT")?.topics.map((t) => (
            <div key={t} className="p-4 rounded-xl border border-border bg-card">
              <h3 className="font-semibold text-lg">{t}</h3>
              <Link to={`/course/${t.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-')}`} className="text-sm text-cyan mt-2 inline-block">Explore Course &rarr;</Link>
            </div>
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
