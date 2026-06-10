/**
 * [ExperimentName]Sim.tsx
 * ========================
 * COPY THIS FILE to start a new simulation.
 * Replace all [PLACEHOLDERS] with your content.
 *
 * Steps:
 *  1. Rename file to e.g. "StackSim.tsx"
 *  2. Run the team's AI prompt with Aim/Theory/Procedure
 *  3. Fill in each stage render function from the design doc
 *  4. Register in workspace-integration.tsx
 */

import { useState } from "react";
import { /* pick icons from lucide-react */ Swords } from "lucide-react";
import {
  useSimGame,
  useSteppedArray,   // remove if not array-based
  SimShell,
  StageWrapper,
  QuizBlock,
  CompletionScreen,
} from "@/components/simulations/shared";

// ── Constants ─────────────────────────────────────────────────────────────────
const TOTAL_STAGES = 6; // adjust to your stage count
// const INITIAL_ARRAY = []; // if array-based

export function ExperimentNameSim() {
  // ── Game state (required) ────────────────────────────────────────────────
  const game = useSimGame(TOTAL_STAGES, () => {
    // reset any local state here
  });

  // ── Optional: array stepping ─────────────────────────────────────────────
  // const arr = useSteppedArray(INITIAL_ARRAY);

  // ── Local state (stage-specific) ─────────────────────────────────────────
  const [quizAnswer, setQuizAnswer] = useState<string | null>(null);

  // ── Stage renderers ───────────────────────────────────────────────────────

  /** Stage 1: Story / Theme intro */
  const renderStage1 = () => (
    <StageWrapper>
      <div className="text-center mb-8 max-w-xl">
        <h2 className="text-3xl font-bold text-primary mb-2">[Creative Title]</h2>
        <p className="text-muted-foreground">[Story setup — what is the student's mission?]</p>
      </div>

      {/* Visual scene — describe what the student sees */}

      <button
        onClick={() => { game.addXp(50, "[Recruit Badge]"); game.nextStage(); }}
        className="px-8 py-3 bg-primary text-primary-foreground font-bold rounded-xl flex items-center gap-2"
      >
        <Swords className="size-5" /> [Start CTA]
      </button>
    </StageWrapper>
  );

  /** Stage 2: Core concept visualization + first interaction */
  const renderStage2 = () => (
    <StageWrapper>
      <div className="text-center mb-6 max-w-md">
        <h3 className="text-xl font-bold text-primary mb-1">[Stage Name]</h3>
        <p className="text-muted-foreground text-sm">[Narrator explanation]</p>
      </div>

      {/* Animation / visual metaphor */}

      {/* Student interaction — buttons, drag-drop, input */}

    </StageWrapper>
  );

  /** Stage 3: Deeper concept / common mistake */
  const renderStage3 = () => (
    <StageWrapper children={undefined}>
      {/* Show common mistakes visually */}
    </StageWrapper>
  );

  /** Stage 4: Complexity / performance visualization */
  const renderStage4 = () => (
    <StageWrapper children={undefined}>
      {/* Side-by-side comparison, complexity chart, etc. */}
    </StageWrapper>
  );

  /** Stage 5: Mini challenges (quiz, predict, match) */
  const renderStage5 = () => (
    <StageWrapper>
      <h3 className="text-xl font-bold text-primary mb-6">Mini Challenges</h3>

      <div className="w-full max-w-md space-y-4 mb-8">
        <QuizBlock
          question="[Question text]"
          options={[
            { label: "Option A", value: "a" },
            { label: "Option B", value: "b" },
            { label: "Option C", value: "c" },
          ]}
          correctValue="b"
          selectedValue={quizAnswer}
          onSelect={setQuizAnswer}
          correctFeedback="✅ [Explain why correct]"
          wrongFeedback="❌ [Hint to guide them]"
        />
      </div>

      {quizAnswer === "b" && (
        <button
          onClick={() => { game.addXp(200, "Challenge Complete"); game.nextStage(); }}
          className="px-8 py-3 bg-primary text-primary-foreground font-bold rounded-xl animate-in zoom-in"
        >
          Final Boss
        </button>
      )}
    </StageWrapper>
  );

  /** Stage 6: Completion */
  const renderStage6 = () => (
    <CompletionScreen
      missionTitle="[Mission Complete Title]"
      missionSubtitle="[Flavour text — what did they accomplish?]"
      xp={game.xp}
      xpLog={game.xpLog}
      achievements={[
        // { icon: <SomeIcon className="size-4" />, label: "Badge Name" },
      ]}
      concepts={[
        { label: "[Concept 1]", description: "[One sentence explanation]" },
        { label: "[Concept 2]", description: "[One sentence explanation]" },
      ]}
      onReset={game.reset}
    />
  );

  // ── Render ────────────────────────────────────────────────────────────────
  return (
    <SimShell
      title="[Sim Title]"
      subtitle="[Lab / Experiment Name]"
      xp={game.xp}
      stage={game.stage}
      totalStages={TOTAL_STAGES}
      mistakeMessage={game.mistakeMessage}
      successMessage={game.successMessage}
      // icon={<YourIcon className="size-5 text-primary" />}
    >
      {game.stage === 1 && renderStage1()}
      {game.stage === 2 && renderStage2()}
      {game.stage === 3 && renderStage3()}
      {game.stage === 4 && renderStage4()}
      {game.stage === 5 && renderStage5()}
      {game.stage === 6 && renderStage6()}
    </SimShell>
  );
}