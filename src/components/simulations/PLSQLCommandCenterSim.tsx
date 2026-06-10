import { useState } from "react";
import { Database, Zap, ArrowRight, ArrowLeft, ArrowLeftRight, Terminal, Shield, Radio } from "lucide-react";
import {
  useSimGame,
  SimShell,
  StageWrapper,
  QuizBlock,
  CompletionScreen,
} from "@/components/simulations/shared";

// ── Constants ─────────────────────────────────────────────────────────────────
const TOTAL_STAGES = 6; 
export function PLSQLCommandCenterSim() {
  const game = useSimGame(TOTAL_STAGES, () => {
    // reset all local state on game reset
    setDragOrder([]);
    setSelectedParam(null);
    setQuiz1Answer(null);
    setQuiz2Answer(null);
    setActiveQuest(null);
    setBossSlots({ marks: false, age: false, details: false });
  });

  // Stage 1 drag state
  const [dragOrder, setDragOrder] = useState<string[]>([]);

  // Stage 2-4 quiz states
  const [selectedParam, setSelectedParam] = useState<string | null>(null);

  // Stage 5 mission states
  const [activeQuest, setActiveQuest] = useState<number | null>(null);
  const [completedQuests, setCompletedQuests] = useState<Set<number>>(new Set());

  // Stage 5 quiz answers
  const [quiz1Answer, setQuiz1Answer] = useState<string | null>(null);
  const [quiz2Answer, setQuiz2Answer] = useState<string | null>(null);

  // Stage 6 boss slots
  const [bossSlots, setBossSlots] = useState({ marks: false, age: false, details: false });

  const CORRECT_ORDER = ["CREATE OR REPLACE", "PROCEDURE", "IS", "BEGIN", "END"];
const [blocks, setBlocks] = useState([...CORRECT_ORDER].sort(() => Math.random() - 0.5));
const [placed, setPlaced] = useState<string[]>([]);

const renderStage1 = () => (
  <StageWrapper>
    <h2 className="text-3xl font-bold text-primary mb-2">⚡ Booting the Procedure Engine</h2>
    <p className="text-muted-foreground mb-6 max-w-md text-center">
      Assemble the procedure structure by dragging blocks into the correct order.
    </p>

    {/* Drop Zone — ordered slots */}
    <div className="flex flex-col gap-2 w-full max-w-sm mb-6">
      {CORRECT_ORDER.map((slot, i) => (
        <div
          key={i}
          onClick={() => {
            if (placed[i]) return;
            const next = blocks[0];
            if (!next) return;
            const newPlaced = [...placed];
            newPlaced[i] = next;
            setPlaced(newPlaced);
            setBlocks(blocks.slice(1));
          }}
          className={`border-2 rounded-lg px-4 py-2 text-center font-mono text-sm
            ${placed[i] === slot ? "border-green-500 bg-green-500/10 text-green-400"
              : placed[i] ? "border-red-500 bg-red-500/10 text-red-400"
              : "border-dashed border-muted-foreground text-muted-foreground"}`}
        >
          {placed[i] || `Slot ${i + 1}`}
        </div>
      ))}
    </div>

    {/* Available blocks */}
    <div className="flex gap-2 flex-wrap justify-center mb-6">
      {blocks.map((b, i) => (
        <span key={i} className="px-3 py-1 bg-primary/20 text-primary rounded-lg font-mono text-sm cursor-pointer">
          {b}
        </span>
      ))}
    </div>

    {placed.length === 5 && placed.every((p, i) => p === CORRECT_ORDER[i]) && (
      <button
        onClick={() => { game.addXp(100, "🏅 Syntax Architect"); game.nextStage(); }}
        className="px-8 py-3 bg-primary text-primary-foreground font-bold rounded-xl"
      >
        ✨ Procedure Engine Activated!
      </button>
    )}
  </StageWrapper>
);

const renderStage2 = () => (
  <StageWrapper>
    <h3 className="text-xl font-bold text-primary mb-2">🔐 IN Parameter — Data Entry Gate</h3>
    <p className="text-muted-foreground text-sm mb-6 max-w-md text-center">
      IN parameters are <strong>read-only</strong>. Data enters the procedure but cannot be changed inside it.
    </p>

    {/* Visual pipeline animation with CSS */}
    <div className="flex items-center gap-3 mb-8">
      <div className="px-4 py-2 bg-blue-500/20 border border-blue-500 rounded-lg font-mono text-sm">
        roll_no = 101
      </div>
      <ArrowRight className="text-primary" />
      <div className="px-4 py-2 bg-primary/10 border border-primary rounded-lg font-mono text-sm">
        PROCEDURE
      </div>
      <Shield className="text-red-400" />
      <span className="text-red-400 text-sm">Cannot modify</span>
    </div>

    <QuizBlock
      question="What happens if you try to assign a new value to an IN parameter inside the procedure?"
      options={[
        { label: "It updates successfully", value: "a" },
        { label: "It causes a compile-time error", value: "b" },
        { label: "It silently ignores the change", value: "c" },
      ]}
      correctValue="b"
      selectedValue={selectedParam}
      onSelect={setSelectedParam}
      correctFeedback="✅ Correct! IN parameters are read-only — Oracle throws a compile error."
      wrongFeedback="❌ Nope! Oracle enforces read-only on IN parameters at compile time."
    />

    {selectedParam === "b" && (
      <button
        onClick={() => { game.addXp(150, "🏅 Gatekeeper"); game.nextStage(); }}
        className="mt-6 px-8 py-3 bg-primary text-primary-foreground font-bold rounded-xl"
      >
        🔐 Input Integrity Maintained! →
      </button>
    )}
  </StageWrapper>
);

const [outAssigned, setOutAssigned] = useState(false);

const renderStage3 = () => (
  <StageWrapper>
    <h3 className="text-xl font-bold text-primary mb-2">📡 OUT Parameter — Transmission Unit</h3>
    <p className="text-muted-foreground text-sm mb-6 max-w-md text-center">
      OUT parameters start <strong>empty</strong> and get values assigned during execution.
    </p>

    {/* Visual: empty pipe → filled pipe */}
    <div className="flex items-center gap-4 mb-8">
      <div className="px-4 py-2 bg-primary/10 border border-primary rounded-lg text-sm font-mono">PROCEDURE</div>
      <ArrowRight className="text-primary" />
      <div
        className={`px-4 py-2 border rounded-lg font-mono text-sm transition-all duration-700
          ${outAssigned ? "bg-green-500/20 border-green-500 text-green-400" : "border-dashed border-muted-foreground text-muted-foreground"}`}
      >
        {outAssigned ? "marks := 85" : "marks = NULL"}
      </div>
    </div>

    <button
      onClick={() => setOutAssigned(true)}
      className="px-6 py-2 bg-secondary rounded-lg text-sm mb-6"
      disabled={outAssigned}
    >
      ▶ Execute Procedure
    </button>

    {outAssigned && (
      <>
        <p className="text-green-400 text-sm mb-4">✅ OUT parameter assigned! Value flows back to the caller.</p>
        <button
          onClick={() => { game.addXp(150, "🏅 Signal Broadcaster"); game.nextStage(); }}
          className="px-8 py-3 bg-primary text-primary-foreground font-bold rounded-xl"
        >
          📡 Data Transmitted! →
        </button>
      </>
    )}
  </StageWrapper>
);

const [ageValue, setAgeValue] = useState<number | null>(null);

const renderStage4 = () => (
  <StageWrapper>
    <h3 className="text-xl font-bold text-primary mb-2">🔄 IN OUT Parameter — Bi-Directional Channel</h3>
    <p className="text-muted-foreground text-sm mb-6 max-w-md text-center">
      IN OUT parameters carry a value in, allow modification, and return the updated value.
    </p>

    {/* Two-way flow diagram */}
    <div className="flex items-center gap-3 mb-8">
      <div className="px-3 py-2 bg-blue-500/20 border border-blue-500 rounded-lg font-mono text-sm">age = 20</div>
      <ArrowRight className="text-blue-400" />
      <div className="px-4 py-2 bg-primary/10 border border-primary rounded-lg font-mono text-sm">age := age + 1</div>
      <ArrowRight className="text-green-400" />
      <div className={`px-3 py-2 border rounded-lg font-mono text-sm transition-all
        ${ageValue !== null ? "bg-green-500/20 border-green-500 text-green-400" : "border-dashed border-muted-foreground text-muted-foreground"}`}>
        {ageValue !== null ? `age = ${ageValue}` : "age = ?"}
      </div>
    </div>

    <p className="text-sm text-muted-foreground mb-4">What is the final value of <code>age</code> after the procedure runs?</p>
    <div className="flex gap-3 mb-6">
      {[20, 21, 22].map(v => (
        <button
          key={v}
          onClick={() => setAgeValue(v)}
          className={`px-6 py-2 rounded-lg border font-mono transition-all
            ${ageValue === v ? (v === 21 ? "bg-green-500/20 border-green-500 text-green-400" : "bg-red-500/20 border-red-500 text-red-400") : "border-muted-foreground"}`}
        >
          {v}
        </button>
      ))}
    </div>

    {ageValue === 21 && (
      <button
        onClick={() => { game.addXp(150, "🏅 Flow Controller"); game.nextStage(); }}
        className="px-8 py-3 bg-primary text-primary-foreground font-bold rounded-xl"
      >
        🔁 Stream Updated! →
      </button>
    )}
    {ageValue !== null && ageValue !== 21 && (
      <p className="text-red-400 text-sm">❌ Remember: age starts at 20, and we add 1 inside the procedure.</p>
    )}
  </StageWrapper>
);

const MISSIONS = [
  { id: 1, title: "GetStudentMarks", params: "IN: roll_no | OUT: marks", icon: "📊" },
  { id: 2, title: "UpdateStudentAge", params: "IN: roll_no, new_age", icon: "🎂" },
  { id: 3, title: "GetStudentDetails", params: "IN: roll_no | OUT: name, age, dept", icon: "📋" },
];

const renderStage5 = () => (
  <StageWrapper>
    <h3 className="text-xl font-bold text-primary mb-2">🏭 Procedure Factory Missions</h3>
    <p className="text-muted-foreground text-sm mb-6">Complete all 3 missions to proceed.</p>

    <div className="grid grid-cols-1 gap-4 w-full max-w-md mb-6">
      {MISSIONS.map(m => (
        <div
          key={m.id}
          onClick={() => {
            setCompletedQuests(prev => new Set([...prev, m.id]));
            game.addXp(75, `${m.icon} ${m.title}`);
          }}
          className={`p-4 rounded-xl border cursor-pointer transition-all
            ${completedQuests.has(m.id)
              ? "border-green-500 bg-green-500/10"
              : "border-primary/40 bg-primary/5 hover:border-primary"}`}
        >
          <div className="flex items-center justify-between">
            <span className="font-bold">{m.icon} {m.title}</span>
            {completedQuests.has(m.id) && <span className="text-green-400 text-sm">✅ Done</span>}
          </div>
          <p className="text-xs text-muted-foreground mt-1 font-mono">{m.params}</p>
        </div>
      ))}
    </div>

    {completedQuests.size === 3 && (
      <button
        onClick={() => { game.addXp(100, "🏅 Mission Commander"); game.nextStage(); }}
        className="px-8 py-3 bg-primary text-primary-foreground font-bold rounded-xl"
      >
        🚀 Proceed to Final Boss →
      </button>
    )}
  </StageWrapper>
);

const renderStage6 = () => {
  const allSlotsFilled = bossSlots.marks && bossSlots.age && bossSlots.details;
  if (allSlotsFilled) {
    return (
      <CompletionScreen
        missionTitle="🌟 Data City Restored!"
        missionSubtitle="You designed and deployed PL/SQL procedures to restore critical city systems."
        xp={game.xp}
        xpLog={game.xpLog}
        achievements={[
          { icon: <Database className="size-4" />, label: "Syntax Architect" },
          { icon: <Shield className="size-4" />, label: "Gatekeeper" },
          { icon: <Radio className="size-4" />, label: "Signal Broadcaster" },
          { icon: <ArrowLeftRight className="size-4" />, label: "Flow Controller" },
          { icon: <Terminal className="size-4" />, label: "Procedure Master" },
        ]}
        concepts={[
          { label: "IN Parameter", description: "Read-only — passes data into a procedure without modification." },
          { label: "OUT Parameter", description: "Write-only from caller — procedure fills it and returns it." },
          { label: "IN OUT Parameter", description: "Bi-directional — carries a value in, modifies it, returns new value." },
          { label: "Anonymous Block", description: "A BEGIN...END block used to call procedures without naming them." },
        ]}
        onReset={game.reset}
      />
    );
  }

  return (
    <StageWrapper>
      <h3 className="text-xl font-bold text-primary mb-2">⚛️ Restore the Data City Core</h3>
      <p className="text-muted-foreground text-sm mb-6 max-w-md text-center">
        Activate all 3 reactor slots by deploying each procedure.
      </p>
      <div className="grid grid-cols-3 gap-4 mb-8">
        {(["marks", "age", "details"] as const).map(slot => (
          <div
            key={slot}
            onClick={() => setBossSlots(prev => ({ ...prev, [slot]: true }))}
            className={`p-4 rounded-xl border text-center cursor-pointer transition-all
              ${bossSlots[slot] ? "border-green-500 bg-green-500/10 text-green-400" : "border-dashed border-primary/40 hover:border-primary"}`}
          >
            <Database className="size-6 mx-auto mb-2" />
            <p className="text-xs font-bold capitalize">{slot}</p>
            <p className="text-xs text-muted-foreground">{bossSlots[slot] ? "✅ Online" : "Deploy →"}</p>
          </div>
        ))}
      </div>
    </StageWrapper>
  );
};

return (
  <SimShell
    title="PL/SQL Command Center"
    subtitle="The Procedure Protocol"
    xp={game.xp}
    stage={game.stage}
    totalStages={TOTAL_STAGES}
    mistakeMessage={game.mistakeMessage}
    successMessage={game.successMessage}
    icon={<Database className="size-5 text-primary" />}
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