import { useState } from "react";

export default function ProfileOnboarding({ onSave }) {
  const [step, setStep] = useState(1);
  const [name, setName] = useState("");
  const [goal, setGoal] = useState("");

  const handleNext = (e) => {
    e.preventDefault();
    if (step === 1 && name.trim()) {
      setStep(2);
    } else if (step === 2 && goal.trim()) {
      onSave({ name: name.trim(), goal: goal.trim() });
    }
  };

  return (
    <div className="max-w-md mx-auto my-12 p-8 bg-bg border border-line shadow-[4px_4px_0px_0px_rgba(26,22,18,0.04)] anim-fade-up">
      {/* Dynamic Progress Indicator Pin */}
      <div className="flex justify-between items-center mb-6 border-b border-line-soft pb-3">
        <span className="font-mono text-[10px] tracking-widest text-ink-mute uppercase">
          Identity Setup
        </span>
        <span className="font-mono text-[10px] tracking-widest text-accent font-semibold">
          0{step} / 02
        </span>
      </div>

      <form onSubmit={handleNext} className="space-y-6">
        {step === 1 && (
          <div className="space-y-4 anim-fade-in">
            {/* Short sharp punchy greeting */}
            <h2 className="font-serif italic text-xl sm:text-2xl text-ink leading-tight">
              "First rule of the technical grid: knowing who is behind the
              terminal."
            </h2>
            <label className="block font-mono text-[10px] tracking-wider text-ink-soft uppercase">
              What should we call you?
            </label>
            <input
              type="text"
              required
              autoFocus
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name..."
              className="w-full bg-transparent border-b border-line focus:border-accent text-ink font-sans text-base py-2 focus:outline-none transition-colors placeholder:text-ink-mute/40"
            />
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4 anim-fade-in">
            {/* Hard focus career motivation quote */}
            <h2 className="font-serif italic text-xl sm:text-2xl text-ink leading-tight">
              "Excellent, {name}. Now define the target before the compiler
              builds it."
            </h2>
            <label className="block font-mono text-[10px] tracking-wider text-ink-soft uppercase">
              What is your primary tech stack goal?
            </label>
            <input
              type="text"
              required
              autoFocus
              value={goal}
              onChange={(e) => setGoal(e.target.value)}
              placeholder="e.g., Frontend React, Full Stack Developer..."
              className="w-full bg-transparent border-b border-line focus:border-accent text-ink font-sans text-base py-2 focus:outline-none transition-colors placeholder:text-ink-mute/40"
            />
          </div>
        )}

        {/* Action button utility */}
        <div className="pt-2 flex justify-end">
          <button
            type="submit"
            disabled={step === 1 ? !name.trim() : !goal.trim()}
            className="btn-primary w-full sm:w-auto px-8"
          >
            {step === 1 ? "Continue" : "Lock Profile"}
          </button>
        </div>
      </form>
    </div>
  );
}
