import React from "react";

type SimComponentType = React.ComponentType;

/**
 * SimRouter
 * ---------
 * Maps experiment IDs to their simulation components.
 * Drop this into workspace.tsx to replace the long chain of if/else blocks.
 *
 * Usage:
 *   // 1. Import your sims
 *   import { BubbleSortSim } from "@/components/simulations/BubbleSortSim";
 *   import { LinkedListSim } from "@/components/simulations/LinkedListSim";
 *
 *   // 2. Register them
 *   const router = new SimRouter({
 *     "ds-e1-4": BubbleSortSim,
 *     "ds-e1-5": LinkedListSim,
 *   });
 *
 *   // 3. Render in workspace.tsx
 *   const Sim = router.resolve(details?.experiment.id);
 *   if (Sim) return <div className="h-full bg-background"><Sim /></div>;
 */
export class SimRouter {
  private map: Map<string, SimComponentType>;

  constructor(entries: Record<string, SimComponentType>) {
    this.map = new Map(Object.entries(entries));
  }

  /** Returns the component for the given experiment ID, or null if not found. */
  resolve(experimentId: string | undefined): SimComponentType | null {
    if (!experimentId) return null;
    return this.map.get(experimentId) ?? null;
  }

  /** Returns all registered experiment IDs. */
  ids(): string[] {
    return Array.from(this.map.keys());
  }

  /** Register additional experiments after construction. */
  register(id: string, component: SimComponentType): void {
    this.map.set(id, component);
  }
}

// ─── Convenience JSX wrapper ───────────────────────────────────────────────

interface SimRouterViewProps {
  experimentId: string | undefined;
  router: SimRouter;
  /** Rendered when no simulation matches the ID */
  fallback?: React.ReactNode;
}

/**
 * <SimRouterView>
 * ---------------
 * Drop-in JSX alternative to router.resolve().
 *
 * Usage in workspace.tsx:
 *   <SimRouterView experimentId={details?.experiment.id} router={simRouter} />
 */
export function SimRouterView({ experimentId, router, fallback = null }: SimRouterViewProps) {
  const Sim = router.resolve(experimentId);
  if (!Sim) return <>{fallback}</>;
  return (
    <div className="h-full bg-background">
      <Sim />
    </div>
  );
}
