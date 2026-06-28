import { Star, Medal } from "lucide-react";

interface SimShellProps {
  /** Title shown in the top-left header */
  title: string;
  /** Optional subtitle / lab name */
  subtitle?: string;
  /** Current XP total */
  xp: number;
  /** Current stage (1-based) */
  stage: number;
  /** Total number of stages */
  totalStages: number;
  /** Non-empty string shows a red floating error banner */
  mistakeMessage?: string;
  /** Non-empty string shows a green floating success banner */
  successMessage?: string;
  /** Icon element rendered next to title (default: Medal) */
  icon?: React.ReactNode;
  children: React.ReactNode;
}

/**
 * SimShell
 * --------
 * The universal chrome wrapper for every Virtual Lab simulation.
 * Provides:
 *  - Consistent header (title, XP badge, stage progress dots)
 *  - Floating feedback toasts (mistake / success)
 *  - Scrollable content area
 *
 * Usage:
 *   <SimShell title="Arrayland" xp={game.xp} stage={game.stage} totalStages={8}
 *     mistakeMessage={game.mistakeMessage} successMessage={game.successMessage}>
 *     {stage === 1 && <Stage1 />}
 *     ...
 *   </SimShell>
 */
export function SimShell({
  title,
  subtitle,
  xp,
  stage,
  totalStages,
  mistakeMessage = "",
  successMessage = "",
  icon,
  children,
}: SimShellProps) {
  return (
    <div className="flex flex-col h-full bg-background text-foreground overflow-hidden">

      {/* ── Header ── */}
      <header className="flex items-center justify-between px-6 py-3 border-b border-border bg-card/50 backdrop-blur shrink-0">
        <div className="flex items-center gap-2">
          {icon ?? <Medal className="size-5 text-primary" />}
          <div>
            <h1 className="text-lg font-bold text-primary leading-tight">{title}</h1>
            {subtitle && <p className="text-xs text-muted-foreground leading-tight">{subtitle}</p>}
          </div>
        </div>

        <div className="flex items-center gap-5">
          {/* XP Badge */}
          <div className="flex items-center gap-1.5 bg-secondary/60 border border-border rounded-full px-3 py-1 text-sm font-bold">
            <Star className="size-3.5 text-yellow-500" />
            <span>{xp} XP</span>
          </div>

          {/* Stage dots */}
          <div className="flex items-center gap-1.5" aria-label={`Stage ${stage} of ${totalStages}`}>
            {Array.from({ length: totalStages }).map((_, i) => (
              <div
                key={i}
                className={`rounded-full transition-all duration-300 ${
                  i + 1 < stage
                    ? "size-2 bg-primary/40"
                    : i + 1 === stage
                    ? "size-2.5 bg-primary shadow-[0_0_6px_hsl(var(--primary)/0.6)]"
                    : "size-2 bg-muted"
                }`}
              />
            ))}
          </div>
        </div>
      </header>

      {/* ── Floating toasts (portal-style fixed position) ── */}
      {mistakeMessage && (
        <div
          role="alert"
          className="fixed top-20 left-1/2 -translate-x-1/2 z-50 
                     bg-red-500 text-white px-5 py-2.5 rounded-lg shadow-xl 
                     animate-in slide-in-from-top-6 font-medium text-sm max-w-sm text-center"
        >
          ⚠️ {mistakeMessage}
        </div>
      )}
      {successMessage && (
        <div
          role="status"
          className="fixed top-20 left-1/2 -translate-x-1/2 z-50 
                     bg-green-500 text-white px-5 py-2.5 rounded-lg shadow-xl 
                     animate-in slide-in-from-top-6 font-bold text-sm flex items-center gap-2 max-w-sm"
        >
          <Star className="size-4" /> {successMessage}
        </div>
      )}

      {/* ── Scrollable stage content ── */}
      <main className="flex-1 overflow-y-auto p-6">
        <div className="w-full max-w-4xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
