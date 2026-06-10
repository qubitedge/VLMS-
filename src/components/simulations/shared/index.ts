/**
 * Virtual Lab Simulation Shared Library
 * ======================================
 * Import everything you need from this single entry point:
 *
 *   import {
 *     useSimGame,
 *     useSteppedArray,
 *     SimShell,
 *     StageWrapper,
 *     QuizBlock,
 *     CompletionScreen,
 *     SimRouter,
 *     SimRouterView,
 *   } from "@/components/simulations/shared";
 */

export { useSimGame } from "./useSimGame";
export type { SimGame, SimGameState, SimGameActions, XpEvent } from "./useSimGame";

export { useSteppedArray } from "./useSteppedArray";
export type { SteppedArray, SteppedArrayState, SteppedArrayActions } from "./useSteppedArray";

export { SimShell } from "./SimShell";
export { StageWrapper } from "./StageWrapper";
export { QuizBlock } from "./QuizBlock";
export { CompletionScreen } from "./CompletionScreen";
export { SimRouter, SimRouterView } from "./SimRouter";
