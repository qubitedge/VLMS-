import { Link } from "@tanstack/react-router";
import { ArrowUpRight, ShieldCheck } from "lucide-react";
import type { Branch } from "@/lib/lab-data";

export function BranchCard({ d }: { d: Branch }) {
  const Icon = d.icon;
  return (
    <Link 
      to={`/branch/${d.code.toLowerCase()}` as any}
      className="group relative rounded-xl border border-border bg-card p-5 transition hover:border-foreground/20 hover:shadow-[0_8px_30px_-12px_color-mix(in_oklab,var(--foreground)_25%,transparent)] block"
    >
      <div className={`absolute inset-0 rounded-xl bg-gradient-to-br ${d.tint} opacity-60 pointer-events-none`} />
      <div className="relative">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="grid place-items-center size-10 rounded-md bg-secondary text-foreground font-mono text-xs font-semibold">
              {d.code}
            </div>
            <div>
              <h3 className="font-display font-semibold text-base leading-tight flex items-center gap-2">
                {d.title} <Icon className="size-4 text-muted-foreground" />
              </h3>
              <p className="text-xs text-muted-foreground mt-0.5">{d.subtitle}</p>
            </div>
          </div>
        </div>

        <div className="mt-5 grid grid-cols-3 gap-2 text-xs">
          <Stat value={d.labs} label="Labs" />
          <Stat value={`${d.hours}h`} label="Est. Hours" />
          <Stat value="Isolated" label="Runtime" mono />
        </div>

        <div className="mt-4 flex flex-wrap gap-1.5">
          {d.topics.slice(0, 3).map((t) => (
            <span 
              key={t} 
              className="text-[11px] rounded-md border border-border bg-background/60 px-2 py-1 text-muted-foreground"
            >
              {t}
            </span>
          ))}
          {d.topics.length > 3 && (
            <span className="text-[11px] rounded-md px-2 py-1 text-muted-foreground">+{d.topics.length - 3} more</span>
          )}
        </div>

        <div className="mt-5 flex items-center justify-between border-t border-border pt-3">
          <span className="flex items-center gap-1.5 text-[11px] font-mono uppercase tracking-wider text-muted-foreground">
            <ShieldCheck className="size-3.5 text-mint" /> Sandboxed Runtime
          </span>
          <span className="flex items-center gap-1 text-sm font-medium text-foreground group-hover:gap-2 transition-all">
            View Subjects <ArrowUpRight className="size-4" />
          </span>
        </div>
      </div>
    </Link>
  );
}

function Stat({ value, label, mono }: { value: React.ReactNode; label: string; mono?: boolean }) {
  return (
    <div className="rounded-md bg-background/60 border border-border px-2.5 py-2">
      <div className={`text-sm font-semibold ${mono ? "font-mono" : ""}`}>{value}</div>
      <div className="text-[10px] uppercase tracking-wider text-muted-foreground">{label}</div>
    </div>
  );
}
