import { useState } from "react";

export default function GradeResult({
  grade,
  answer,
  onNext,
  onRetry,
  onChangeRole,
}) {
  const [showModelAnswer, setShowModelAnswer] = useState(false);
  const [showYourAnswer, setShowYourAnswer] = useState(false);

  const isPass = grade?.verdict?.toUpperCase() === "PASS";
  const score = grade?.score || 0;

  return (
    <div className="space-y-6 anim-fade-up">
      {/* 1. Main Score Card Block */}
      <div className="bg-bg border border-line p-6 sm:p-8 shadow-[4px_4px_0px_0px_rgba(26,22,18,0.04)]">
        <div className="flex flex-col md:flex-row items-center gap-8 border-b border-line-soft pb-6 mb-6">
          {/* Radial Metric Container */}
          <div className="flex flex-col items-center shrink-0">
            <div className="relative w-28 h-28 flex items-center justify-center rounded-full border border-line bg-line-soft/10">
              <div className="text-center">
                <span className="font-serif italic text-4xl font-bold text-ink">
                  {score}
                </span>
                <span className="font-mono text-xs text-ink-mute block -mt-1">
                  / 10
                </span>
              </div>
            </div>

            {/* Verdict Badge */}
            <span
              className={`mt-3 px-4 py-1 border font-mono text-[10px] tracking-widest font-semibold uppercase ${
                isPass
                  ? "bg-accent/10 border-accent text-accent"
                  : "bg-fail/10 border-fail text-fail"
              }`}
            >
              {grade?.verdict || "FAIL"}
            </span>
          </div>

          {/* AI Assessment Breakdown Text */}
          <div className="space-y-4 w-full">
            <div>
              <span className="font-mono text-[10px] text-accent tracking-wider uppercase block mb-1 font-semibold">
                ▲ Strengths
              </span>
              <p className="font-sans text-sm text-ink-soft leading-relaxed">
                {grade?.strengths ||
                  "No specific strengths noted for this response."}
              </p>
            </div>

            <div className="border-t border-line-soft/60 pt-3">
              <span className="font-mono text-[10px] text-fail tracking-wider uppercase block mb-1 font-semibold">
                ▼ To Improve
              </span>
              <p className="font-sans text-sm text-ink-soft leading-relaxed">
                {grade?.improvements || "No critical improvements suggested."}
              </p>
            </div>
          </div>
        </div>

        {/* 2. Expandable Accordion Toggles */}
        <div className="space-y-3">
          {/* Model Answer Toggle Box */}
          {grade?.betterAnswer && (
            <div className="border border-line bg-bg">
              <button
                onClick={() => setShowModelAnswer(!showModelAnswer)}
                className="w-full flex items-center justify-between p-4 font-mono text-[11px] tracking-wider text-ink uppercase hover:bg-line-soft/20 transition-colors"
              >
                <span>★ Model Answer Overview</span>
                <span className="text-xs transition-transform duration-200">
                  {showModelAnswer ? "▲" : "▼"}
                </span>
              </button>
              {showModelAnswer && (
                <div className="p-5 border-t border-line bg-ink text-bg font-mono text-xs leading-relaxed overflow-x-auto selection:bg-accent/30 selection:text-white">
                  <p className="whitespace-pre-wrap max-w-full font-light tracking-wide">
                    {grade.betterAnswer}
                  </p>
                </div>
              )}
            </div>
          )}

          {/* User's Original Transcript Review Box */}
          <div className="border border-line bg-bg">
            <button
              onClick={() => setShowYourAnswer(!showYourAnswer)}
              className="w-full flex items-center justify-between p-4 font-mono text-[11px] tracking-wider text-ink-soft uppercase hover:bg-line-soft/20 transition-colors"
            >
              <span>Your Submitted Answer</span>
              <span className="text-xs transition-transform duration-200">
                {showYourAnswer ? "▲" : "▼"}
              </span>
            </button>
            {showYourAnswer && (
              <div className="p-5 border-t border-line bg-line-soft/10 font-sans text-sm text-ink-soft italic leading-relaxed">
                "{answer || "Empty submission context string."}"
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 3. Operational Action Navigation Footer */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
        <button onClick={onNext} className="btn-primary w-full sm:w-auto px-8">
          Next Question →
        </button>

        <div className="flex items-center gap-4 w-full sm:w-auto justify-end">
          <button
            onClick={onRetry}
            className="font-mono text-[11px] text-ink-soft hover:text-accent tracking-widest uppercase transition-colors"
          >
            Retry This
          </button>
          <span className="text-line h-4 w-[1px] hidden sm:block" />
          <button
            onClick={onChangeRole}
            className="font-mono text-[11px] text-ink-mute hover:text-accent tracking-widest uppercase transition-colors"
          >
            Change Role
          </button>
        </div>
      </div>
    </div>
  );
}
