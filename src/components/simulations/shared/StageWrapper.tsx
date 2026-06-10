interface StageWrapperProps {
  children: React.ReactNode;
  /** Tailwind animation class. Default: "animate-in fade-in zoom-in duration-400" */
  animation?: string;
  className?: string;
}

/**
 * StageWrapper
 * ------------
 * Wraps each stage's content with a consistent entry animation.
 * Keeps stage renderers clean — they don't need to think about animation.
 *
 * Usage:
 *   const renderStage1 = () => (
 *     <StageWrapper>
 *       <h2>Welcome</h2>
 *     </StageWrapper>
 *   );
 */
export function StageWrapper({
  children,
  animation = "animate-in fade-in zoom-in duration-400",
  className = "",
}: StageWrapperProps) {
  return (
    <div className={`flex flex-col items-center w-full ${animation} ${className}`}>
      {children}
    </div>
  );
}
