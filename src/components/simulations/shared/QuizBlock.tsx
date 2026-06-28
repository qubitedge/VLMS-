interface QuizOption {
  label: string;
  value: string;
}

interface QuizBlockProps {
  question: string;
  options: QuizOption[];
  correctValue: string;
  selectedValue: string | null;
  onSelect: (value: string) => void;
  correctFeedback?: string;
  wrongFeedback?: string;
}

/**
 * QuizBlock
 * ---------
 * Reusable multiple-choice quiz block for Mini Challenge stages.
 * Handles its own visual state (selected, correct, wrong).
 *
 * Usage:
 *   const [ans, setAns] = useState<string | null>(null);
 *   <QuizBlock
 *     question="How many passes does Bubble Sort make in the worst case?"
 *     options={[{label:"n", value:"n"}, {label:"n²", value:"n2"}, {label:"n-1", value:"n1"}]}
 *     correctValue="n1"
 *     selectedValue={ans}
 *     onSelect={setAns}
 *     correctFeedback="Correct! n-1 passes are made."
 *     wrongFeedback="Not quite — think about how many elements get locked per pass."
 *   />
 */
export function QuizBlock({
  question,
  options,
  correctValue,
  selectedValue,
  onSelect,
  correctFeedback = "✅ Correct!",
  wrongFeedback = "❌ Not quite — try again.",
}: QuizBlockProps) {
  const isAnswered = selectedValue !== null;
  const isCorrect = selectedValue === correctValue;

  return (
    <div className="bg-secondary/30 border border-border rounded-xl p-4 w-full">
      <p className="text-sm font-semibold mb-3">{question}</p>

      <div className="flex flex-wrap gap-2 mb-3">
        {options.map(opt => {
          const isSelected = selectedValue === opt.value;
          const isThisCorrect = isAnswered && opt.value === correctValue;
          const isThisWrong = isSelected && !isCorrect;

          return (
            <button
              key={opt.value}
              onClick={() => !isAnswered && onSelect(opt.value)}
              disabled={isAnswered}
              className={`px-4 py-1.5 text-sm rounded-lg border transition-all font-medium
                ${isThisCorrect
                  ? "bg-green-500/20 border-green-500 text-green-600 dark:text-green-400"
                  : isThisWrong
                  ? "bg-red-500/20 border-red-500 text-red-600 dark:text-red-400"
                  : isSelected
                  ? "bg-primary/20 border-primary text-primary"
                  : "border-border hover:bg-secondary/60 cursor-pointer"
                }
                ${isAnswered ? "cursor-default" : ""}
              `}
            >
              {opt.label}
            </button>
          );
        })}
      </div>

      {isAnswered && (
        <p className={`text-xs font-semibold ${isCorrect ? "text-green-500" : "text-red-500"}`}>
          {isCorrect ? correctFeedback : wrongFeedback}
        </p>
      )}
    </div>
  );
}
