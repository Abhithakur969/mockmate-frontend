import { useState } from "react";

export default function QuestionCard({ question, role, qNum }) {
  const [showHint, setShowHint] = useState(false);

  // Formats a single digit to always show as 01, 02, etc.
  const formattedNum = String(qNum).padStart(2, "0");

  return (
    <div className="bg-bg border border-line p-6 sm:p-8 mb-6 shadow-[4px_4px_0px_0px_rgba(46,107,61,0.06)] anim-fade-up">
      {/* Header section with metadata */}
      <div className="flex items-center justify-between border-b border-line-soft pb-4 mb-6">
        <span className="font-mono text-[11px] text-ink-mute tracking-widest uppercase">
          {role}
        </span>
        <span className="font-mono text-[11px] text-accent tracking-widest font-medium">
          {formattedNum} / ANSWER
        </span>
      </div>

      {/* Main technical question prompt */}
      <h2 className="font-serif italic text-xl sm:text-2xl text-ink leading-relaxed mb-6">
        {question?.question || "Loading question..."}
      </h2>

      {/* Interactive cleanly designed hint toggle */}
      {question?.hint && (
        <div className="border-t border-line-soft pt-4">
          <button
            onClick={() => setShowHint(!showHint)}
            className="flex items-center gap-2 font-mono text-[10px] tracking-wider text-ink-soft hover:text-accent uppercase transition-colors"
          >
            <span
              className={`transform transition-transform duration-200 text-xs ${showHint ? "rotate-90" : ""}`}
            >
              ▸
            </span>
            {showHint ? "Hide Hint" : "Show Hint"}
          </button>

          {showHint && (
            <p className="mt-3 font-sans text-sm text-ink-soft leading-relaxed bg-line-soft/30 p-4 border-l-2 border-accent/40 anim-fade-in">
              {question.hint}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
