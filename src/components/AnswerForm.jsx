import { useState } from "react";

export default function AnswerForm({ onSubmit, onSkip, error, isLoading }) {
  const [text, setText] = useState("");
  const minWords = 30;

  // Simple character or word hint tracker
  const wordsLeft = Math.max(
    0,
    minWords - (text.trim() ? text.trim().split(/\s+/).length : 0),
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim() || isLoading) return;
    onSubmit(text);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 anim-fade-up d1">
      <div className="relative border border-line focus-within:border-accent bg-bg transition-colors shadow-[4px_4px_0px_0px_rgba(26,22,18,0.03)]">
        {/* Dynamic input area */}
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Write your answer as if you're in a real interview. Use your own words..."
          disabled={isLoading}
          rows={6}
          className="w-full bg-transparent text-ink font-sans text-sm p-5 focus:outline-none resize-none leading-relaxed placeholder:text-ink-mute/70"
        />

        {/* Dynamic word count utility footer */}
        <div className="flex justify-end p-3 border-t border-line-soft bg-line-soft/10">
          <span className="font-mono text-[10px] text-ink-mute tracking-wider uppercase">
            {wordsLeft > 0 ? `Need ${wordsLeft} more words` : "Ready to grade"}
          </span>
        </div>
      </div>

      {/* Form validation or API gateway error notification */}
      {error && (
        <div className="p-4 bg-fail/10 border border-fail text-fail font-mono text-xs tracking-wide">
          ⚠️ {error}
        </div>
      )}

      {/* Action button controls layout panel */}
      <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
        <button
          type="submit"
          disabled={isLoading || !text.trim()}
          className="btn-primary w-full sm:w-auto"
        >
          {isLoading ? "Processing..." : "Submit Answer"}
        </button>

        <button
          type="button"
          onClick={onSkip}
          disabled={isLoading}
          className="btn-secondary w-full sm:w-auto text-center"
        >
          Skip Question
        </button>
      </div>
    </form>
  );
}
