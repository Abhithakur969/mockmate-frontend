import { Link } from "react-router-dom";

const STEPS = [
  {
    n: "01",
    title: "Pick a role",
    body: "Choose from 5 tech roles. Each has real interview questions served randomly every session.",
  },
  {
    n: "02",
    title: "Answer honestly",
    body: "Write your answer as if you're in the real interview. No Googling. Think it through.",
  },
  {
    n: "03",
    title: "Get AI feedback",
    body: "Score out of 10, specific strengths, what to improve, and a model answer from Gemini AI.",
  },
];

const STATS = [
  { v: "5", l: "Interview roles" },
  { v: "25", l: "Real questions" },
  { v: "AI", l: "Instant grading" },
  { v: "₹0", l: "Cost, forever" },
];

const ROLES = [
  "Frontend Developer",
  "Backend Developer",
  "Full Stack Developer",
  "Data / ML Engineer",
  "QA Engineer",
];

export default function Home() {
  return (
    <div className="min-h-screen bg-bg">
      {/* Navbar */}
      <header className="fixed top-0 inset-x-0 z-50 h-14 border-b border-line bg-bg/95 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto h-full px-5 sm:px-10 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2.5 group">
            <div
              className="w-7 h-7 border border-accent flex items-center justify-center
                            group-hover:bg-accent transition-all duration-200"
            >
              <span
                className="font-serif italic text-accent group-hover:text-bg
                               text-base leading-none transition-colors font-300"
              >
                M
              </span>
            </div>
            <span
              className="font-sans font-600 text-[13px] tracking-[0.18em] text-ink
                             group-hover:text-accent transition-colors"
            >
              MOCKMATE
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-2 font-mono text-[10px] text-ink-mute tracking-widest">
            <span>AI INTERVIEW COACH</span>
            <span className="text-line mx-2">·</span>
            <span>5 ROLES · FREE</span>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/dashboard"
              className="font-sans text-[12px] text-ink-soft hover:text-accent
                             transition-colors hidden sm:block"
            >
              Dashboard
            </Link>
            <Link
              to="/practice"
              className="font-sans text-[12px] bg-accent text-bg px-5 py-2.5
                             hover:bg-accent-2 transition-colors"
            >
              Start Practicing →
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-5 sm:px-10 pt-28 pb-20">
        <div className="anim-fade-up">
          <div className="flex items-center gap-3 mb-10">
            <div className="w-6 h-px bg-accent" />
            <span className="font-mono text-[10px] text-accent tracking-[0.3em] uppercase">
              Free · No Login · AI Powered
            </span>
          </div>

          <h1
            className="font-serif font-300 text-ink leading-[0.95] mb-8"
            style={{
              fontSize: "clamp(4rem,13vw,9.5rem)",
              letterSpacing: "-0.02em",
            }}
          >
            Mock<em className="text-accent not-italic font-400">Mate.</em>
          </h1>

          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-8 mb-16">
            <p
              className="font-sans font-300 text-ink-soft max-w-md leading-relaxed"
              style={{ fontSize: "clamp(1rem,2.5vw,1.2rem)" }}
            >
              Answer real interview questions.
              <br />
              Get AI-scored instantly.
              <br />
              Land your first tech job.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 shrink-0 self-start sm:self-auto">
              <Link
                to="/practice"
                className="font-sans text-[12px] bg-accent text-bg px-10 py-4
                               hover:bg-accent-2 transition-colors text-center"
              >
                Start Practicing →
              </Link>
              <Link
                to="/dashboard"
                className="font-sans text-[12px] border border-line text-ink-soft px-8 py-4
                               hover:border-accent-s hover:text-accent transition-all text-center"
              >
                View Dashboard
              </Link>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-4 border border-line divide-x divide-line">
            {STATS.map(({ v, l }) => (
              <div
                key={l}
                className="py-6 px-4 text-center bg-bg hover:bg-bg-alt transition-colors"
              >
                <p
                  className="font-serif font-300 text-accent mb-1.5"
                  style={{ fontSize: "clamp(1.8rem,5vw,3rem)" }}
                >
                  {v}
                </p>
                <p className="font-mono text-[9px] text-ink-mute tracking-widest uppercase">
                  {l}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="max-w-6xl mx-auto px-5 sm:px-10">
        <div className="h-px bg-gradient-to-r from-transparent via-line to-transparent" />
      </div>

      {/* How it works */}
      <section className="max-w-6xl mx-auto px-5 sm:px-10 py-20">
        <div className="flex items-center gap-4 mb-14">
          <span className="font-mono text-[10px] text-ink-mute tracking-[0.3em] uppercase">
            How it works
          </span>
          <div className="flex-1 h-px bg-line-soft" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-line border border-line">
          {STEPS.map(({ n, title, body }) => (
            <div
              key={n}
              className="bg-bg p-8 sm:p-10 relative group hover:bg-bg-alt transition-colors duration-200"
            >
              <p
                className="font-serif italic font-300 text-bg-deep group-hover:text-bg-alt
                             select-none mb-6 transition-colors leading-none"
                style={{ fontSize: "clamp(4rem,8vw,6rem)" }}
              >
                {n}
              </p>
              <h3 className="font-sans font-600 text-ink text-[15px] mb-3 tracking-wide">
                {title}
              </h3>
              <p className="font-sans font-300 text-ink-mute text-sm leading-relaxed">
                {body}
              </p>
              <div
                className="absolute bottom-0 left-0 right-0 h-[2px] bg-transparent
                               group-hover:bg-accent transition-all duration-300"
              />
            </div>
          ))}
        </div>
      </section>

      {/* Dashboard callout */}
      <section className="max-w-6xl mx-auto px-5 sm:px-10 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 border border-line bg-bg">
          <div className="p-8 sm:p-12 flex flex-col justify-center border-b md:border-b-0 md:border-r border-line">
            <span className="font-mono text-[10px] text-accent tracking-[0.3em] uppercase block mb-4">
              New Feature
            </span>
            <h2
              className="font-serif font-300 text-ink leading-tight mb-4"
              style={{ fontSize: "clamp(1.8rem,5vw,3rem)" }}
            >
              Track your full
              <br />
              <em className="text-accent italic">progress.</em>
            </h2>
            <p className="font-sans text-sm text-ink-mute font-300 leading-relaxed mb-6">
              The dashboard shows role-by-role progress, session insights, skill
              scores, and your interview readiness prediction.
            </p>
            <Link
              to="/dashboard"
              className="font-sans text-[12px] bg-accent text-bg px-8 py-3.5
                             hover:bg-accent-2 transition-colors self-start"
            >
              Open Dashboard →
            </Link>
          </div>

          <div className="bg-bg-alt p-8 flex flex-col justify-center gap-3">
            {[
              { label: "Mock Interviews", value: "25", delta: "+3 this week" },
              {
                label: "Questions Solved",
                value: "320",
                delta: "+12 this week",
              },
              {
                label: "Average Score",
                value: "82%",
                delta: "+4% vs last week",
              },
            ].map((s) => (
              <div
                key={s.label}
                className="flex items-center justify-between border border-line bg-bg p-4 shadow-soft"
              >
                <div>
                  <p className="font-sans text-[11px] text-ink-mute mb-0.5">
                    {s.label}
                  </p>
                  <p className="font-serif font-300 text-accent text-[1.6rem] leading-none">
                    {s.value}
                  </p>
                </div>
                <span className="font-mono text-[9px] text-accent bg-accent-bg px-2 py-1">
                  {s.delta}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Roles */}
      <section className="max-w-6xl mx-auto px-5 sm:px-10 pb-20">
        <div className="border border-line bg-bg p-8 sm:p-12">
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-8">
            <div className="shrink-0">
              <span className="font-mono text-[10px] text-ink-mute tracking-[0.3em] uppercase block mb-3">
                Available roles
              </span>
              <h2
                className="font-serif font-300 text-ink leading-tight"
                style={{ fontSize: "clamp(1.8rem,5vw,3rem)" }}
              >
                Pick your
                <br />
                <em className="text-accent italic">battlefield.</em>
              </h2>
            </div>
            <div className="flex flex-wrap gap-2">
              {ROLES.map((r) => (
                <Link
                  key={r}
                  to="/practice"
                  state={{ role: r }}
                  className="font-sans text-[12px] text-ink-soft border border-line
                                 px-4 py-2 hover:border-accent-s hover:text-accent
                                 hover:bg-accent-bg transition-all duration-150"
                >
                  {r}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="max-w-6xl mx-auto px-5 sm:px-10 pb-24">
        <div className="relative border border-accent/20 bg-accent-bg/30 p-12 sm:p-20 text-center overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-accent-bg/10 to-transparent pointer-events-none" />
          <p className="font-mono text-[10px] text-accent tracking-[0.3em] uppercase mb-4">
            Ready?
          </p>
          <h2
            className="font-serif font-300 text-ink leading-[0.95] mb-5"
            style={{
              fontSize: "clamp(3.5rem,12vw,8rem)",
              letterSpacing: "-0.02em",
            }}
          >
            2 minutes.
            <br />
            No excuses.
          </h2>
          <p className="font-sans text-ink-mute font-300 text-lg mb-10">
            No signup. No credit card. Just practice.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              to="/practice"
              className="font-sans text-[12px] bg-accent text-bg px-14 py-4
                             hover:bg-accent-2 transition-colors inline-flex"
            >
              Start Your Mock Interview →
            </Link>
            <Link
              to="/dashboard"
              className="font-sans text-[12px] border border-line text-ink-soft px-10 py-4
                             hover:border-accent-s hover:text-accent transition-all inline-flex"
            >
              View Dashboard
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-line">
        <div
          className="max-w-6xl mx-auto px-5 sm:px-10 py-10
                        flex flex-col sm:flex-row items-center justify-between gap-4"
        >
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 border border-accent flex items-center justify-center">
              <span className="font-serif italic text-accent text-sm font-300">
                M
              </span>
            </div>
            <span className="font-sans font-600 text-[13px] tracking-[0.18em] text-ink">
              MOCKMATE
            </span>
          </div>
          <p className="font-mono text-[10px] text-ink-mute tracking-widest text-center">
            BUILT FOR FRESHERS BREAKING INTO TECH · FREE FOREVER
          </p>
          <p className="font-mono text-[10px] text-line tracking-wide">
            React · Spring Boot · Gemini AI
          </p>
        </div>
      </footer>
    </div>
  );
}
