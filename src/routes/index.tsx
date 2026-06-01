import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, Sparkles, Activity, Boxes, Send, Timer, ShieldCheck, GitBranch, FlaskConical } from "lucide-react";
import { DomainCard } from "@/components/DomainCard";
import { LearningJourney } from "@/components/LearningJourney";
import { domains, metrics, runtimes } from "@/lib/lab-data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Dashboard — VLMS Virtual Lab" },
      { name: "description", content: "Production-grade academic sandbox for computer science curricula." },
    ],
  }),
  component: Dashboard,
});

const metricIcons = [Boxes, Activity, Send, Timer, ShieldCheck, GitBranch];

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
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-background/80 px-3 py-1 text-xs font-medium">
              <FlaskConical className="size-3.5 text-cyan" /> Production-Grade Academic Sandbox · v2.6
            </span>
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
              <Link to="/domains" className="inline-flex items-center gap-2 rounded-md border border-border bg-background px-5 py-2.5 text-sm font-medium hover:bg-secondary">
                Browse Target Domains
              </Link>
            </div>
          </div>

          {/* Status card */}
          <div className="rounded-xl border border-border bg-card/80 backdrop-blur p-5">
            <div className="flex items-center gap-2 text-[11px] font-mono uppercase tracking-[0.18em] text-muted-foreground">
              <span className="size-2 rounded-full bg-mint shadow-[0_0_10px_var(--mint)]" /> System Status
            </div>
            <div className="mt-3 text-sm font-medium">All sandbox runtimes operational</div>
            <div className="mt-4 grid grid-cols-3 gap-2">
              {runtimes.map((r) => (
                <div key={r} className="rounded-md border border-border bg-background px-2 py-2 text-center font-mono text-xs uppercase tracking-wider text-muted-foreground">{r}</div>
              ))}
            </div>
            <div className="mt-5 pt-4 border-t border-border grid grid-cols-2 gap-3 text-xs">
              <div>
                <div className="text-muted-foreground">Region</div>
                <div className="font-mono mt-0.5">ap-south-1</div>
              </div>
              <div>
                <div className="text-muted-foreground">Build</div>
                <div className="font-mono mt-0.5">2.6.014-stable</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Metrics */}
      <section className="px-6 lg:px-10 py-14 border-b border-border">
        <SectionHeader eyebrow="Aggregate Telemetry" title="Live Platform Metrics" caption="Streaming counters across all sandboxed runtimes." />
        <div className="mt-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {metrics.map((m, i) => {
            const Icon = metricIcons[i];
            return (
              <div key={m.label} className="rounded-xl border border-border bg-card p-4">
                <div className="flex items-start justify-between">
                  <div className="grid place-items-center size-8 rounded-md bg-secondary text-foreground">
                    <Icon className="size-4" />
                  </div>
                  <span className={`text-[10px] font-mono uppercase tracking-wider ${m.tone === "mint" ? "text-mint" : "text-cyan"}`}>{m.delta}</span>
                </div>
                <div className="mt-6 font-display text-3xl font-bold tracking-tight">{m.value}</div>
                <div className="mt-1 text-[11px] uppercase tracking-wider text-muted-foreground">{m.label}</div>
              </div>
            );
          })}
        </div>
      </section>

      <LearningJourney />



      {/* Domains */}
      <section className="px-6 lg:px-10 py-14">
        <div className="flex items-end justify-between flex-wrap gap-4">
          <SectionHeader eyebrow="Curriculum Tracks" title="Target Domains" caption="Six technical tracks aligned to the undergraduate computer science syllabus." />
          <Link to="/domains" className="inline-flex items-center gap-1 text-sm font-medium hover:gap-2 transition-all">
            View matrix <ArrowUpRight className="size-4" />
          </Link>
        </div>
        <div className="mt-8 grid md:grid-cols-2 xl:grid-cols-3 gap-4">
          {domains.map((d) => <DomainCard key={d.code} d={d} />)}
        </div>
      </section>

      <footer className="border-t border-border px-6 lg:px-10 py-8 flex flex-wrap items-center justify-between gap-3 text-xs text-muted-foreground">
        <div className="font-mono uppercase tracking-[0.18em]">VLMS · Indian Institute of Applied Computing</div>
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
