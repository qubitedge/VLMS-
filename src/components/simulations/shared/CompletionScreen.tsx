import { Trophy, Star, RotateCcw, Medal } from "lucide-react";

interface XpEvent {
  label: string;
  amount: number;
}

interface Achievement {
  icon: React.ReactNode;
  label: string;
}

interface ConceptLearned {
  label: string;
  description: string;
}

interface CompletionScreenProps {
  /** Headline below the trophy */
  missionTitle?: string;
  /** Short flavour text */
  missionSubtitle?: string;
  /** Total XP earned */
  xp: number;
  /** Ordered list of XP events to display in the score breakdown */
  xpLog?: XpEvent[];
  /** Optional badge list */
  achievements?: Achievement[];
  /** Key concepts learned */
  concepts?: ConceptLearned[];
  /** Called when the "Play Again" button is clicked */
  onReset: () => void;
  /** Label on the reset button */
  resetLabel?: string;
}

/**
 * CompletionScreen
 * ----------------
 * The final stage for every simulation.
 * Shows: trophy animation, mission summary, XP log,
 *        achievements, key concepts, and a reset button.
 *
 * Usage:
 *   {stage === totalStages && (
 *     <CompletionScreen
 *       missionTitle="Mission Accomplished!"
 *       xp={game.xp}
 *       xpLog={game.xpLog}
 *       concepts={[{ label: "Bubble Sort", description: "O(n²) time complexity" }]}
 *       onReset={game.reset}
 *     />
 *   )}
 */
export function CompletionScreen({
  missionTitle = "Mission Accomplished!",
  missionSubtitle = "You've mastered the concept.",
  xp,
  xpLog = [],
  achievements = [],
  concepts = [],
  onReset,
  resetLabel = "Play Again",
}: CompletionScreenProps) {
  return (
    <div className="flex flex-col items-center text-center animate-in fade-in zoom-in w-full max-w-lg mx-auto py-4 gap-6">

      {/* Trophy */}
      <div className="size-24 bg-yellow-500/15 text-yellow-500 rounded-full flex items-center justify-center shadow-[0_0_50px_hsl(47_95%_53%/0.25)]">
        <Trophy className="size-12" />
      </div>

      <div>
        <h2 className="text-3xl font-bold text-primary">{missionTitle}</h2>
        <p className="text-muted-foreground mt-1">{missionSubtitle}</p>
      </div>

      {/* Score card */}
      <div className="w-full bg-card border border-border rounded-2xl p-5 text-left shadow-md">
        <h3 className="font-bold mb-3 border-b border-border pb-2 text-sm uppercase tracking-wider text-muted-foreground">
          Score Breakdown
        </h3>
        <div className="space-y-2 text-sm text-muted-foreground">
          {xpLog.length > 0 ? (
            xpLog.map((ev, i) => (
              <div key={i} className="flex justify-between">
                <span>{ev.label}</span>
                <span className="font-mono text-foreground">+{ev.amount} XP</span>
              </div>
            ))
          ) : (
            <p className="text-xs text-muted-foreground italic">No score events recorded.</p>
          )}
        </div>
        <div className="flex justify-between font-bold text-lg text-primary border-t border-border pt-3 mt-3">
          <span>Total Score</span>
          <span className="flex items-center gap-1.5">
            <Star className="size-4 text-yellow-500" /> {xp} XP
          </span>
        </div>
      </div>

      {/* Achievements */}
      {achievements.length > 0 && (
        <div className="w-full bg-card border border-border rounded-2xl p-5 text-left shadow-md">
          <h3 className="font-bold mb-3 border-b border-border pb-2 text-sm uppercase tracking-wider text-muted-foreground">
            Achievements
          </h3>
          <div className="flex flex-wrap gap-3">
            {achievements.map((a, i) => (
              <div key={i} className="flex items-center gap-2 bg-secondary/40 border border-border rounded-lg px-3 py-2 text-sm">
                {a.icon}
                <span className="font-medium">{a.label}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Key Concepts */}
      {concepts.length > 0 && (
        <div className="w-full bg-card border border-border rounded-2xl p-5 text-left shadow-md">
          <h3 className="font-bold mb-3 border-b border-border pb-2 text-sm uppercase tracking-wider text-muted-foreground">
            Key Concepts Learned
          </h3>
          <div className="space-y-2">
            {concepts.map((c, i) => (
              <div key={i} className="flex items-start gap-2">
                <Medal className="size-4 text-primary mt-0.5 shrink-0" />
                <div>
                  <span className="font-semibold text-sm">{c.label}: </span>
                  <span className="text-sm text-muted-foreground">{c.description}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <button
        onClick={onReset}
        className="px-8 py-3 bg-secondary text-secondary-foreground border border-border font-bold rounded-xl hover:bg-secondary/70 flex items-center gap-2 transition-colors"
      >
        <RotateCcw className="size-4" /> {resetLabel}
      </button>
    </div>
  );
}
