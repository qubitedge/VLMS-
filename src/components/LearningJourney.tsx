import { useEffect, useState } from "react";
import { BookOpen, Target, ListChecks, Play, Code2, CircleCheck, type LucideIcon } from "lucide-react";

type Step = { n: number; title: string; desc: string; icon: LucideIcon };

const steps: Step[] = [
  { n: 1, title: "Theory", desc: "Learn fundamental concepts and theoretical foundations", icon: BookOpen },
  { n: 2, title: "Objective", desc: "Understand the goals and expected outcomes", icon: Target },
  { n: 3, title: "Procedure", desc: "Follow step-by-step experimental procedures", icon: ListChecks },
  { n: 4, title: "Simulation", desc: "Interact with visual simulations and models", icon: Play },
  { n: 5, title: "Code Execution", desc: "Write and execute code in real-time environment", icon: Code2 },
  { n: 6, title: "Assessment", desc: "Validate learning through comprehensive evaluation", icon: CircleCheck },
];

export function LearningJourney() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setActive((a) => (a + 1) % steps.length), 2200);
    return () => clearInterval(id);
  }, []);

  const progress = ((active + 1) / steps.length) * 100;

  return (
    <section className="px-6 lg:px-10 py-16 border-b border-border bg-secondary/30">
      <div className="text-center max-w-2xl mx-auto">
        <div className="text-[11px] font-mono uppercase tracking-[0.2em] text-cyan">Methodology</div>
        <h2 className="mt-2 font-display text-3xl lg:text-5xl font-bold tracking-tight">Your Learning Journey</h2>
        <p className="mt-2 text-muted-foreground">Experience a structured pathway from theory to mastery.</p>
      </div>

      <div className="relative mt-12">
        {/* Track */}
        <div className="absolute left-0 right-0 top-[112px] h-px bg-border" />
        <div
          className="absolute left-0 top-[112px] h-px bg-gradient-to-r from-cyan via-mint to-primary transition-[width] duration-700 ease-out"
          style={{ width: `${progress}%` }}
        />

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {steps.map((s, i) => {
            const Icon = s.icon;
            const isActive = i === active;
            const isPast = i < active;
            return (
              <button
                key={s.n}
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                className={`group relative text-left rounded-xl border bg-card p-5 transition-all duration-500 ${
                  isActive
                    ? "border-cyan/60 shadow-[0_12px_40px_-12px_color-mix(in_oklab,var(--cyan)_60%,transparent)] -translate-y-1"
                    : "border-border hover:border-foreground/20"
                }`}
              >
                {/* Step number badge */}
                <span
                  className={`absolute top-3 right-3 grid place-items-center size-6 rounded-full border text-[11px] font-mono font-semibold transition-colors ${
                    isActive
                      ? "border-cyan bg-cyan text-primary-foreground"
                      : isPast
                      ? "border-mint/60 bg-mint/15 text-foreground"
                      : "border-border bg-background text-muted-foreground"
                  }`}
                >
                  {s.n}
                </span>

                {/* Icon tile */}
                <div
                  className={`grid place-items-center size-12 rounded-lg transition-all duration-500 ${
                    isActive
                      ? "bg-gradient-to-br from-cyan to-primary text-primary-foreground scale-110"
                      : isPast
                      ? "bg-mint/20 text-foreground"
                      : "bg-secondary text-foreground/70"
                  }`}
                >
                  <Icon className="size-5" />
                </div>

                {/* Connector dot on the track */}
                <span
                  className={`hidden lg:block absolute left-1/2 -translate-x-1/2 top-[88px] size-2.5 rounded-full border-2 border-background transition-all ${
                    isActive
                      ? "bg-cyan shadow-[0_0_0_4px_color-mix(in_oklab,var(--cyan)_25%,transparent)]"
                      : isPast
                      ? "bg-mint"
                      : "bg-border"
                  }`}
                />

                <h3 className="mt-12 font-display font-semibold text-base">{s.title}</h3>
                <p className="mt-1 text-xs text-muted-foreground leading-relaxed">{s.desc}</p>

                <div className={`mt-3 h-0.5 w-0 bg-gradient-to-r from-cyan to-primary transition-all duration-500 ${isActive ? "w-full" : "group-hover:w-1/2"}`} />
              </button>
            );
          })}
        </div>
      </div>

      <p className="mt-10 text-center text-sm text-muted-foreground max-w-2xl mx-auto">
        Each experiment follows this proven methodology to ensure comprehensive understanding and practical skill development.
      </p>
    </section>
  );
}
