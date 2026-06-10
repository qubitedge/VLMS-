import { useState, useCallback } from "react";

export interface XpEvent {
  label: string;
  amount: number;
}

export interface SimGameState {
  stage: number;
  xp: number;
  mistakeMessage: string;
  successMessage: string;
  xpLog: XpEvent[];
}

export interface SimGameActions {
  setStage: (s: number) => void;
  nextStage: () => void;
  addXp: (amount: number, reason: string) => void;
  showMistake: (msg: string, durationMs?: number) => void;
  reset: () => void;
}

export type SimGame = SimGameState & SimGameActions;

/**
 * useSimGame
 * ----------
 * Core hook for every Virtual Lab simulation.
 * Manages: stage navigation, XP scoring, floating feedback messages,
 * and a full reset back to stage 1.
 *
 * Usage:
 *   const game = useSimGame(8);          // 8 total stages
 *   const game = useSimGame(6, myReset); // pass extra reset logic
 */
export function useSimGame(
  totalStages: number,
  onReset?: () => void
): SimGame {
  const [stage, setStageRaw] = useState(1);
  const [xp, setXp] = useState(0);
  const [xpLog, setXpLog] = useState<XpEvent[]>([]);
  const [mistakeMessage, setMistakeMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const setStage = useCallback((s: number) => {
    const clamped = Math.max(1, Math.min(totalStages, s));
    setStageRaw(clamped);
  }, [totalStages]);

  const nextStage = useCallback(() => {
    setStageRaw(s => Math.min(totalStages, s + 1));
  }, [totalStages]);

  const addXp = useCallback((amount: number, reason: string) => {
    setXp(x => x + amount);
    setXpLog(log => [...log, { label: reason, amount }]);
    setSuccessMessage(`+${amount} XP — ${reason}`);
    setTimeout(() => setSuccessMessage(""), 3000);
  }, []);

  const showMistake = useCallback((msg: string, durationMs = 3000) => {
    setMistakeMessage(msg);
    setTimeout(() => setMistakeMessage(""), durationMs);
  }, []);

  const reset = useCallback(() => {
    setStageRaw(1);
    setXp(0);
    setXpLog([]);
    setMistakeMessage("");
    setSuccessMessage("");
    onReset?.();
  }, [onReset]);

  return {
    stage,
    xp,
    xpLog,
    mistakeMessage,
    successMessage,
    setStage,
    nextStage,
    addXp,
    showMistake,
    reset,
  };
}
