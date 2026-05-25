import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";

const ROLE_CARDS = [
  {
    id: "frontend",
    label: "Frontend Developer",
    sub: "React · CSS · JavaScript",
    pct: 68,
    sessions: 8,
    color: "#2E6B3D",
  },
  {
    id: "backend",
    label: "Backend Developer",
    sub: "Node.js · REST · Databases",
    pct: 54,
    sessions: 6,
    color: "#4A7C8E",
  },
  {
    id: "fullstack",
    label: "Full Stack Developer",
    sub: "MVC · CORS · System Design",
    pct: 42,
    sessions: 5,
    color: "#7A5C3E",
  },
  {
    id: "data",
    label: "Data / ML Engineer",
    sub: "Python · NumPy · Models",
    pct: 30,
    sessions: 3,
    color: "#6B4E8C",
  },
  {
    id: "qa",
    label: "QA Engineer",
    sub: "Testing · Selenium · Bugs",
    pct: 22,
    sessions: 2,
    color: "#8C5A3E",
  },
];

const STATS = [
  {
    value: "25",
    label: "Mock Interviews",
    delta: "+3 this week",
    icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z",
  },
  {
    value: "320",
    label: "Questions Solved",
    delta: "+12 this week",
    icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4",
  },
  {
    value: "18h",
    label: "Hours Practiced",
    delta: "+2h this week",
    icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z",
  },
  {
    value: "82%",
    label: "Average Score",
    delta: "+4% this week",
    icon: "M13 7h8m0 0v8m0-8l-8 8-4-4-6 6",
  },
];

const SKILL_BARS = [
  { skill: "Communication", score: 88 },
  { skill: "Technical Depth", score: 74 },
  { skill: "Problem Solving", score: 82 },
  { skill: "Code Quality", score: 70 },
];

const INSIGHTS = [
  { type: "good", text: "Good explanation of core concepts — keep it up!" },
  {
    type: "good",
    text: "Strong use of real-world examples in technical answers.",
  },
  {
    type: "tip",
    text: "Add more code examples — walk through actual implementations.",
  },
  {
    type: "tip",
    text: "Practice system design questions — you need more depth here.",
  },
  {
    type: "warn",
    text: "Review async/await patterns — 2 incorrect answers this week.",
  },
  {
    type: "warn",
    text: "Work on time complexity — missed Big-O in 3 recent answers.",
  },
];

/* ─── Score ring ──────────────────────────────────── */
function ScoreRing({ score, size = 96 }) {
  const r = size * 0.4;
  const circ = +(2 * Math.PI * r).toFixed(2);
  const [offset, setOffset] = useState(circ);

  useEffect(() => {
    const t = setTimeout(() => setOffset(circ - (score / 100) * circ), 300);
    return () => clearTimeout(t);
  }, [score, circ]);

  const cx = size / 2;

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg
        viewBox={`0 0 ${size} ${size}`}
        style={{ width: size, height: size }}
      >
        <circle
          cx={cx}
          cy={cx}
          r={r}
          fill="none"
          stroke="#E8DFC8"
          strokeWidth="6"
        />
        <circle
          cx={cx}
          cy={cx}
          r={r}
          fill="none"
          stroke="#2E6B3D"
          strokeWidth="6"
          strokeLinecap="round"
          strokeDasharray={circ}
          strokeDashoffset={offset}
          style={{
            transform: "rotate(-90deg)",
            transformOrigin: "center",
            transition: "stroke-dashoffset 1.4s cubic-bezier(0.34,1.56,0.64,1)",
          }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span
          className="font-serif font-300 text-accent"
          style={{ fontSize: size * 0.26, lineHeight: 1 }}
        >
          {score}%
        </span>
        <span
          className="font-mono text-ink-mute"
          style={{ fontSize: 9, letterSpacing: "0.1em" }}
        >
          SCORE
        </span>
      </div>
    </div>
  );
}

/* ─── Animated progress bar ───────────────────────── */
function Bar({ pct, color = "#2E6B3D", delay = 0 }) {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const t = setTimeout(() => setWidth(pct), 400 + delay);
    return () => clearTimeout(t);
  }, [pct, delay]);

  return (
    <div className="h-1.5 bg-bg-deep rounded-full overflow-hidden">
      <div
        className="h-full rounded-full transition-all duration-700 ease-out"
        style={{ width: `${width}%`, background: color }}
      />
    </div>
  );
}

/* ─── Stat card ───────────────────────────────────── */
function StatCard({ stat }) {
  return (
    <div
      className="bg-bg border border-line p-5 shadow-card
                    hover:shadow-card-hover hover:-translate-y-0.5
                    transition-all duration-200"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="w-9 h-9 bg-accent-bg flex items-center justify-center shrink-0">
          <svg
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            viewBox="0 0 24 24"
            style={{ width: 17, height: 17, color: "#2E6B3D" }}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d={stat.icon} />
          </svg>
        </div>
        <span className="font-mono text-[9px] text-accent bg-accent-bg px-2 py-0.5 tracking-wide">
          {stat.delta}
        </span>
      </div>
      <p
        className="font-serif font-300 text-ink mb-0.5"
        style={{ fontSize: "1.9rem", lineHeight: 1.1 }}
      >
        {stat.value}
      </p>
      <p className="font-sans text-[12px] text-ink-mute font-300">
        {stat.label}
      </p>
    </div>
  );
}

/* ─── Role card ───────────────────────────────────── */
function RoleCard({ role, onPractice, index }) {
  return (
    <div
      className="bg-bg border border-line p-5 shadow-card
                    hover:shadow-card-hover hover:-translate-y-0.5
                    transition-all duration-200 group"
    >
      <div className="flex items-start justify-between mb-3">
        <div>
          <p className="font-sans font-500 text-ink text-[13px] mb-0.5">
            {role.label}
          </p>
          <p className="font-mono text-[10px] text-ink-mute tracking-wide">
            {role.sub}
          </p>
        </div>
        <span
          className="font-serif italic font-300 text-[1.4rem] leading-none"
          style={{ color: role.color }}
        >
          {role.pct}%
        </span>
      </div>

      <Bar pct={role.pct} color={role.color} delay={index * 80} />

      <div className="flex items-center justify-between mt-3">
        <span className="font-mono text-[10px] text-ink-mute">
          {role.sessions} sessions
        </span>
        <button
          onClick={() => onPractice(role.label)}
          className="font-mono text-[10px] text-accent border border-accent-s
                     px-3 py-1 hover:border-accent hover:bg-accent-bg
                     transition-all duration-150
                     opacity-0 group-hover:opacity-100"
        >
          Continue →
        </button>
      </div>
    </div>
  );
}

/* ─── Insight item ────────────────────────────────── */
function InsightItem({ ins }) {
  const config = {
    good: { symbol: "✓", labelColor: "text-accent", label: "Keep it up" },
    tip: { symbol: "→", labelColor: "text-ink-mute", label: "Improve" },
    warn: { symbol: "⚠", labelColor: "text-warn", label: "Review" },
  }[ins.type];

  return (
    <div
      className="flex items-start gap-3 p-3 border border-line-soft
                    hover:bg-bg-alt transition-colors"
    >
      <span className="text-sm mt-0.5 shrink-0">{config.symbol}</span>
      <div>
        <span
          className={`font-mono text-[9px] tracking-widest uppercase ${config.labelColor}`}
        >
          {config.label}
        </span>
        <p className="font-sans text-[12px] text-ink-soft font-300 leading-relaxed mt-0.5">
          {ins.text}
        </p>
      </div>
    </div>
  );
}

/* ─── Main Dashboard ──────────────────────────────── */
export default function Dashboard() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();

  const handlePractice = (role = null) => {
    if (role) {
      navigate("/practice", { state: { role } });
    } else {
      navigate("/practice");
    }
  };

  return (
    <div className="flex h-screen bg-bg-alt overflow-hidden">
      <Sidebar mobileOpen={mobileOpen} onClose={() => setMobileOpen(false)} />

      {/* Scrollable main content */}
      <main className="flex-1 overflow-y-auto min-w-0">
        {/* Top bar */}
        <div
          className="sticky top-0 z-30 bg-bg/95 backdrop-blur-sm border-b border-line
                        h-14 flex items-center justify-between px-5 sm:px-8 shrink-0"
        >
          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(true)}
            className="lg:hidden w-8 h-8 flex items-center justify-center
                       border border-line hover:bg-bg-alt transition-colors mr-3 shrink-0"
          >
            <svg
              style={{ width: 16, height: 16, color: "#1A1612" }}
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>

          <p className="font-sans font-500 text-ink text-[14px]">Dashboard</p>

          <button
            onClick={() => handlePractice(null)}
            className="font-sans text-[12px] bg-accent text-bg px-5 py-2
                       hover:bg-accent-2 transition-colors"
          >
            + New Session
          </button>
        </div>

        {/* Content */}
        <div className="max-w-6xl mx-auto px-5 sm:px-8 py-8 space-y-8">
          {/* Welcome */}
          <div className="anim-fade-up">
            <h1
              className="font-serif font-300 text-ink mb-1"
              style={{ fontSize: "clamp(1.5rem,4vw,2.2rem)" }}
            >
              Welcome back, <em className="text-accent italic">Arjun!</em> 🎉
            </h1>
            <p className="font-sans text-sm text-ink-mute font-300">
              Ready to ace your next interview? You've practiced{" "}
              <span className="text-accent font-400">3 sessions</span> this
              week.
            </p>
          </div>

          {/* Stats row */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <p className="label">Overview</p>
              <div className="divider" />
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
              {STATS.map((s, i) => (
                <div
                  key={s.label}
                  className="anim-fade-up"
                  style={{ animationDelay: `${i * 60}ms` }}
                >
                  <StatCard stat={s} />
                </div>
              ))}
            </div>
          </div>

          {/* Role progress + Last session */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Role cards — 2/3 */}
            <div className="lg:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <p className="label">Role Progress</p>
                <div className="divider" />
                <button
                  onClick={() => handlePractice(null)}
                  className="font-mono text-[10px] text-accent hover:text-accent-2
                             transition-colors tracking-wide shrink-0"
                >
                  Practice all →
                </button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {ROLE_CARDS.map((role, i) => (
                  <RoleCard
                    key={role.id}
                    role={role}
                    onPractice={handlePractice}
                    index={i}
                  />
                ))}
              </div>
            </div>

            {/* Last session — 1/3 */}
            <div className="lg:col-span-1">
              <div className="flex items-center gap-3 mb-4">
                <p className="label">Last Session</p>
                <div className="divider" />
              </div>

              <div className="bg-bg border border-line p-6 shadow-card">
                <p className="font-sans font-500 text-ink text-[13px] mb-0.5">
                  Mock Interview #25
                </p>
                <p className="font-mono text-[10px] text-ink-mute tracking-wide mb-5">
                  Frontend Developer · 45 min
                </p>

                {/* Score ring centered */}
                <div className="flex justify-center mb-5">
                  <ScoreRing score={82} />
                </div>

                {/* Skill bars */}
                <div className="space-y-3 mb-5">
                  {SKILL_BARS.map((f, i) => (
                    <div key={f.skill}>
                      <div className="flex justify-between mb-1">
                        <span className="font-sans text-[11px] text-ink-soft">
                          {f.skill}
                        </span>
                        <span className="font-mono text-[10px] text-ink-mute">
                          {f.score}%
                        </span>
                      </div>
                      <Bar pct={f.score} delay={i * 100} />
                    </div>
                  ))}
                </div>

                {/* Predicted level + CTA */}
                <div className="pt-4 border-t border-line-soft flex items-center justify-between">
                  <div>
                    <p className="font-mono text-[9px] text-ink-mute tracking-widest uppercase mb-0.5">
                      Predicted level
                    </p>
                    <p className="font-serif font-300 text-accent text-[1.4rem] leading-none">
                      L1 / SDE-I
                    </p>
                  </div>
                  <button
                    onClick={() => handlePractice("Frontend Developer")}
                    className="font-mono text-[11px] bg-accent text-bg px-4 py-2
                               hover:bg-accent-2 transition-colors"
                  >
                    Retry →
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Session insights */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <p className="label">Session Insights</p>
              <div className="divider" />
            </div>
            <div className="bg-bg border border-line p-6 shadow-card">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {INSIGHTS.map((ins, i) => (
                  <InsightItem key={i} ins={ins} />
                ))}
              </div>
            </div>
          </div>

          {/* Quick practice */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <p className="label">Quick Practice</p>
              <div className="divider" />
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-3">
              {ROLE_CARDS.map((r) => (
                <button
                  key={r.id}
                  onClick={() => handlePractice(r.label)}
                  className="bg-bg border border-line p-4 text-left shadow-soft
                             hover:border-accent-s hover:bg-bg-alt hover:-translate-y-0.5
                             transition-all duration-150 group"
                >
                  <p
                    className="font-sans text-[12px] font-500 text-ink
                                 group-hover:text-accent transition-colors mb-1"
                  >
                    {r.label.split(" ")[0]}
                  </p>
                  <p className="font-mono text-[9px] text-ink-mute tracking-wide">
                    5 questions →
                  </p>
                </button>
              ))}
            </div>
          </div>

          <div className="h-4" />
        </div>
      </main>
    </div>
  );
}
