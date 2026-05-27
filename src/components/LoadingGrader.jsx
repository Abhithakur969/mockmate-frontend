export default function LoadingGrader() {
  return (
    <div className="border border-line bg-bg p-12 text-center shadow-[4px_4px_0px_0px_rgba(46,107,61,0.04)] min-h-[300px] flex flex-col items-center justify-center anim-fade-in">
      {/* Animated scanner graphic overlay box */}
      <div className="relative w-48 h-1 bg-line-soft overflow-hidden mb-6 rounded-full">
        <div className="absolute top-0 h-full bg-accent w-1/3 rounded-full animate-[scan_1.6s_ease-in-out_infinite]" />
      </div>

      {/* Modern processing details metadata text */}
      <p className="font-mono text-[11px] text-accent tracking-[0.2em] uppercase mb-2 animate-pulse">
        Evaluating Transcript
      </p>
      <p className="font-sans text-xs text-ink-soft max-w-xs leading-relaxed">
        Gemini AI is analyzing your response accuracy, structural clarity, and
        architectural vocabulary...
      </p>
    </div>
  );
}
