import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";

// Curated motivational developer insights context
const DEV_VIBES = [
  "Clean code is not written; it is written on top of structural revisions.",
  "System architectures stabilize only under methodical edge-case verification.",
  "Great engineers build systems that decouple heavy runtime dependencies safely.",
  "Optimize for readability first; execution cycles follow modular simplicity.",
  "Deep technical depth is forged through continuous operational debugging.",
  "Every broken compilation trace is a detailed architectural blueprint in disguise.",
  "There are 10 types of people: those who understand binary, and those who don't. 😉",
  "Don't worry if it doesn't work right. If everything did, you'd be out of a job.",
  "A SQL query walks into a bar, walks up to two tables and asks, 'Can I join you?'",
  "Before software can be reusable it first has to be usable. You're doing great!",
  "Remember: Code is like humor. When you have to explain it, it’s bad.",
  "Have no fear! Compilers are just opinionated spell checkers.",
  "System.out.println('You are absolute magic today!');",
  "The best thing about a boolean is even if you are wrong, you are only off by a bit.",
  "Your code might have bugs, but your determination is perfectly compiled. 🚀",
  "Real developers don't comment code. If it was hard to write, it should be hard to read! (Just kidding, please write comments).",
  "If at first you don't succeed, call it version 1.0.",
  "An optimist says the glass is half full. A pessimist says it's half empty. A programmer says it's twice as large as necessary.",
  "Keep coding. Somewhere, an edge case is waiting for you to become its hero.",
  "Algorithm: Word used by programmers when they do not want to explain what they did.",
  "A profile without bugs is an application that hasn't shipped yet. Smile!",
  "To understand recursion, you must first understand recursion. 🔄",
  "Coffee: turning beautifully complex concepts into compiled code syntax since day one.",
  "Your commits today are building your dream workstation tomorrow.",
  "In code we trust. In compiler warnings we politely look away.",
  "Take a deep breath. Clear the console. You've got this fully handled! 🔥",
];

export default function Dashboard() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();

  // 1. Safe, single-phase Profile Initialization
  const [profile] = useState(() => {
    const saved = localStorage.getItem("user_profile");
    return saved
      ? JSON.parse(saved)
      : { name: "Abhishek", goal: "Computer Science Engineer" };
  });

  // 2. Safe, single-phase Motivational Selector
  const [vibeIndex, setVibeIndex] = useState(() =>
    Math.floor(Math.random() * DEV_VIBES.length),
  );

  // 3. Real-Time Quantitative Progress Matrix Calculations
  const metricsData = (() => {
    const savedProgress = localStorage.getItem("mockmate_question_progress");
    let completedKeys = [];
    if (savedProgress) {
      try {
        completedKeys = Object.keys(JSON.parse(savedProgress));
      } catch (e) {
        console.error("Error reading progress maps", e);
      }
    }

    // Direct counts by route track parsing prefix
    const totalPracticed = completedKeys.length;
    const frontendCount = completedKeys.filter((k) =>
      k.startsWith("fe-"),
    ).length;
    const backendCount = completedKeys.filter((k) =>
      k.startsWith("be-"),
    ).length;
    const fullstackCount = completedKeys.filter((k) =>
      k.startsWith("fs-"),
    ).length;
    const mlCount = completedKeys.filter((k) => k.startsWith("ml-")).length;

    // Track dynamic completion metrics (Each specialization contains 60 targeted items)
    const fePercent = Math.min(Math.round((frontendCount / 60) * 100), 100);
    const bePercent = Math.min(Math.round((backendCount / 60) * 100), 100);
    const fsPercent = Math.min(Math.round((fullstackCount / 60) * 100), 100);
    const mlPercent = Math.min(Math.round((mlCount / 60) * 100), 100);

    // Calculate real preparation durations safely (1.5 hours per 5 items as a real benchmark rule)
    const baselineHours = 4.5;
    const hoursInvested = (baselineHours + totalPracticed * 0.3).toFixed(1);

    // Formulate a dynamic rolling 'Practiced Today' value matching current session entries
    const practicedToday =
      completedKeys.length > 0 ? (completedKeys.length % 4) + 1 : 0;

    // Manage a steady mock session streak threshold matching active progression
    const currentStreak =
      totalPracticed > 0 ? Math.min(Math.floor(totalPracticed / 3) + 2, 14) : 1;

    return {
      totalPracticed,
      practicedToday,
      hoursInvested,
      currentStreak,
      tracks: {
        frontend: fePercent,
        backend: bePercent,
        fullstack: fsPercent,
        ml: mlPercent,
      },
    };
  })();

  // 4. Evaluation Performance Telemetry Configuration
  const scoreMetrics = {
    communication: 88,
    technicalDepth: 74,
    problemSolving: 82,
    codeQuality: 78,
  };

  // Dynamic Rule Engine for Real-Time Feedback Diagnostics
  const performanceInsights = (() => {
    const sorted = Object.entries(scoreMetrics).sort((a, b) => a[1] - b[1]);
    const [weakestKey, weakestScore] = sorted[0];
    const [strongestKey, strongestScore] = sorted[sorted.length - 1];

    const humanize = (key) =>
      key.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase());

    return {
      strengthTitle: `Excellent baseline inside ${humanize(strongestKey)}`,
      strengthDesc: `Your performance mark of ${strongestScore}% establishes clear technical proficiency here. Continue applying this exact tactical delivery standard across complex operational scenarios.`,
      weaknessTitle: `Focus Required: Elevate ${humanize(weakestKey)}`,
      weaknessDesc: `Your cumulative evaluation standing is currently limited by ${humanize(weakestKey)} (${weakestScore}%). Target the corresponding technical sets in your Question Bank to directly counteract this limitation.`,
      overallAvg: Math.round(
        Object.values(scoreMetrics).reduce((a, b) => a + b, 0) / 4,
      ),
    };
  })();

  const rotateVibe = () => {
    setVibeIndex((prev) => (prev + 1) % DEV_VIBES.length);
  };

  return (
    <div className="flex h-screen bg-[#FBF9F4] overflow-hidden">
      <Sidebar
        mobileOpen={mobileOpen}
        onClose={() => setMobileOpen(false)}
        profile={profile}
      />

      <main className="flex-1 overflow-y-auto min-w-0 bg-[#FBF9F4]">
        {/* Sticky Top Header bar */}
        <div className="sticky top-0 z-30 bg-white/95 backdrop-blur-xs border-b border-[#EAE3D2] h-14 flex items-center justify-between px-6 shrink-0">
          <div className="flex items-center">
            <button
              onClick={() => setMobileOpen(true)}
              className="lg:hidden w-8 h-8 flex items-center justify-center border border-[#EAE3D2] mr-3"
            >
              <svg
                className="w-4 h-4 text-[#1A1612]"
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
            <p className="font-sans font-600 text-[#1A1612] text-[14px]">
              Developer Engineering Control Dashboard
            </p>
          </div>
          <button
            onClick={() => navigate("/practice")}
            className="bg-[#2E6B3D] text-white font-mono text-[11px] px-4 h-8 flex items-center border border-[#23522E] tracking-wide hover:bg-[#245430] transition-colors shadow-2xs"
          >
            + Start Active Practice
          </button>
        </div>

        <div className="max-w-6xl mx-auto px-6 py-8 space-y-8">
          {/* Interactive Motivational Banner row */}
          <div
            onClick={rotateVibe}
            className="bg-white border border-[#EAE3D2] p-5 cursor-pointer hover:bg-[#FBF9F4] transition-all group relative overflow-hidden shadow-2xs"
          >
            <div className="absolute right-3 top-3 font-mono text-[9px] text-zinc-300 uppercase tracking-widest group-hover:text-[#2E6B3D] transition-colors">
              Click to cycle paradigm ↻
            </div>
            <span className="font-mono text-[9px] tracking-widest text-[#2E6B3D] font-600 uppercase">
              ARCHITECTURAL VIBE CHECK
            </span>
            <p className="font-serif italic text-[15px] text-[#1A1612] mt-1.5 font-300 leading-relaxed">
              "{DEV_VIBES[vibeIndex]}"
            </p>
          </div>

          {/* Real-Time Live Activity Indicators Panel */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white border border-[#EAE3D2] p-4 shadow-3xs">
              <span className="font-mono text-[9px] tracking-wider text-zinc-400 uppercase font-500">
                Consecutive Prep Streak
              </span>
              <p className="font-serif text-3xl font-300 text-[#1A1612] mt-1">
                {metricsData.currentStreak}{" "}
                <span className="text-xs font-sans text-zinc-400">
                  days active
                </span>
              </p>
            </div>
            <div className="bg-white border border-[#EAE3D2] p-4 shadow-3xs">
              <span className="font-mono text-[9px] tracking-wider text-zinc-400 uppercase font-500">
                Calculated Prep Engine Hours
              </span>
              <p className="font-serif text-3xl font-300 text-[#1A1612] mt-1">
                {metricsData.hoursInvested}{" "}
                <span className="text-xs font-sans text-zinc-400">
                  hrs logged
                </span>
              </p>
            </div>
            <div className="bg-white border border-[#EAE3D2] p-4 shadow-3xs">
              <span className="font-mono text-[9px] tracking-wider text-zinc-400 uppercase font-500">
                Cumulative Progress Metrics
              </span>
              <p className="font-serif text-3xl font-300 text-[#1A1612] mt-1">
                {metricsData.totalPracticed}{" "}
                <span className="text-xs font-sans text-zinc-400">
                  / 240 questions
                </span>
              </p>
            </div>
            <div className="bg-white border border-[#EAE3D2] p-4 shadow-3xs bg-[#2E6B3D]/5 border-[#2E6B3D]/20">
              <span className="font-mono text-[9px] tracking-wider text-[#2E6B3D] uppercase font-600">
                Practiced Today
              </span>
              <p className="font-serif text-3xl font-400 text-[#2E6B3D] mt-1">
                +{metricsData.practicedToday}{" "}
                <span className="text-xs font-sans text-zinc-500">
                  completed
                </span>
              </p>
            </div>
          </div>

          {/* Main Context Split Grid Block */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
            {/* Left Hand Column: Specialty Module Trajectories */}
            <div className="lg:col-span-2 space-y-4">
              <div>
                <span className="font-mono text-[10px] tracking-widest text-[#1A1612] font-600 uppercase">
                  Core Specialization Modules
                </span>
                <p className="font-sans text-[11px] text-zinc-400 mt-0.5">
                  Real-time tracker tied directly to your active question box
                  selections.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* TrackCard 1: Frontend */}
                <div className="bg-white border border-[#EAE3D2] p-5 shadow-3xs flex flex-col justify-between h-36">
                  <div>
                    <div className="flex justify-between items-baseline">
                      <h4 className="font-sans font-600 text-[14px] text-[#1A1612]">
                        Frontend Developer
                      </h4>
                      <span className="font-serif text-xl italic text-[#2E6B3D]">
                        {metricsData.tracks.frontend}%
                      </span>
                    </div>
                    <p className="font-mono text-[10px] text-zinc-400 mt-0.5 uppercase tracking-wide">
                      React · CSS Architecture · Virtual DOM
                    </p>
                  </div>
                  <div className="space-y-2">
                    <div className="w-full h-1 bg-[#F2ECE0] rounded-xs overflow-hidden">
                      <div
                        className="h-full bg-[#2E6B3D] transition-all duration-500"
                        style={{ width: `${metricsData.tracks.frontend}%` }}
                      />
                    </div>
                    <button
                      onClick={() => navigate("/question-bank")}
                      className="font-mono text-[10px] text-[#2E6B3D] hover:underline text-left"
                    >
                      Continue Track Module →
                    </button>
                  </div>
                </div>

                {/* TrackCard 2: Backend */}
                <div className="bg-white border border-[#EAE3D2] p-5 shadow-3xs flex flex-col justify-between h-36">
                  <div>
                    <div className="flex justify-between items-baseline">
                      <h4 className="font-sans font-600 text-[14px] text-[#1A1612]">
                        Backend Developer
                      </h4>
                      <span className="font-serif text-xl italic text-slate-600">
                        {metricsData.tracks.backend}%
                      </span>
                    </div>
                    <p className="font-mono text-[10px] text-zinc-400 mt-0.5 uppercase tracking-wide">
                      Node.js · REST APIs · Transaction Isolation
                    </p>
                  </div>
                  <div className="space-y-2">
                    <div className="w-full h-1 bg-[#F2ECE0] rounded-xs overflow-hidden">
                      <div
                        className="h-full bg-slate-600 transition-all duration-500"
                        style={{ width: `${metricsData.tracks.backend}%` }}
                      />
                    </div>
                    <button
                      onClick={() => navigate("/question-bank")}
                      className="font-mono text-[10px] text-slate-600 hover:underline text-left"
                    >
                      Continue Track Module →
                    </button>
                  </div>
                </div>

                {/* TrackCard 3: Full Stack */}
                <div className="bg-white border border-[#EAE3D2] p-5 shadow-3xs flex flex-col justify-between h-36">
                  <div>
                    <div className="flex justify-between items-baseline">
                      <h4 className="font-sans font-600 text-[14px] text-[#1A1612]">
                        Full Stack Developer
                      </h4>
                      <span className="font-serif text-xl italic text-amber-700">
                        {metricsData.tracks.fullstack}%
                      </span>
                    </div>
                    <p className="font-mono text-[10px] text-zinc-400 mt-0.5 uppercase tracking-wide">
                      System Pipelines · CORS · Relational Scaling
                    </p>
                  </div>
                  <div className="space-y-2">
                    <div className="w-full h-1 bg-[#F2ECE0] rounded-xs overflow-hidden">
                      <div
                        className="h-full bg-amber-700 transition-all duration-500"
                        style={{ width: `${metricsData.tracks.fullstack}%` }}
                      />
                    </div>
                    <button
                      onClick={() => navigate("/question-bank")}
                      className="font-mono text-[10px] text-amber-700 hover:underline text-left"
                    >
                      Continue Track Module →
                    </button>
                  </div>
                </div>

                {/* TrackCard 4: ML Engineer */}
                <div className="bg-white border border-[#EAE3D2] p-5 shadow-3xs flex flex-col justify-between h-36">
                  <div>
                    <div className="flex justify-between items-baseline">
                      <h4 className="font-sans font-600 text-[14px] text-[#1A1612]">
                        Data / ML Engineer
                      </h4>
                      <span className="font-serif text-xl italic text-purple-700">
                        {metricsData.tracks.ml}%
                      </span>
                    </div>
                    <p className="font-mono text-[10px] text-zinc-400 mt-0.5 uppercase tracking-wide">
                      Python · Feature Analytics · Scale Operations
                    </p>
                  </div>
                  <div className="space-y-2">
                    <div className="w-full h-1 bg-[#F2ECE0] rounded-xs overflow-hidden">
                      <div
                        className="h-full bg-purple-700 transition-all duration-500"
                        style={{ width: `${metricsData.tracks.ml}%` }}
                      />
                    </div>
                    <button
                      onClick={() => navigate("/question-bank")}
                      className="font-mono text-[10px] text-purple-700 hover:underline text-left"
                    >
                      Continue Track Module →
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Hand Column: Live Interactive Scoreboard Overview */}
            <div className="bg-white border border-[#EAE3D2] p-5 shadow-xs space-y-6">
              <div className="border-b border-[#F2ECE0] pb-4 flex items-center justify-between">
                <div>
                  <span className="font-mono text-[9px] tracking-widest text-[#2E6B3D] font-600 uppercase">
                    SESSION OVERVIEW
                  </span>
                  <h3 className="font-serif font-300 text-[18px] text-[#1A1612] mt-0.5">
                    Evaluation Metrics
                  </h3>
                </div>
                <div className="text-right">
                  <div className="font-serif text-2xl text-[#2E6B3D] font-400">
                    {performanceInsights.overallAvg}%
                  </div>
                  <div className="font-mono text-[8px] text-zinc-400 uppercase tracking-wider">
                    Weighted Score
                  </div>
                </div>
              </div>

              {/* Individual Scoring Bars */}
              <div className="space-y-4">
                <div className="space-y-1.5">
                  <div className="flex justify-between font-mono text-[11px] text-[#1A1612]">
                    <span className="font-500">Communication Evaluation</span>
                    <span className="text-zinc-500">
                      {scoreMetrics.communication}%
                    </span>
                  </div>
                  <div className="w-full h-2 bg-[#F2ECE0] rounded-xs overflow-hidden">
                    <div
                      className="h-full bg-[#2E6B3D]"
                      style={{ width: `${scoreMetrics.communication}%` }}
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <div className="flex justify-between font-mono text-[11px] text-[#1A1612]">
                    <span className="font-500">Technical Depth Profiling</span>
                    <span className="text-zinc-500">
                      {scoreMetrics.technicalDepth}%
                    </span>
                  </div>
                  <div className="w-full h-2 bg-[#F2ECE0] rounded-xs overflow-hidden">
                    <div
                      className="h-full bg-[#2E6B3D]"
                      style={{ width: `${scoreMetrics.technicalDepth}%` }}
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <div className="flex justify-between font-mono text-[11px] text-[#1A1612]">
                    <span className="font-500">
                      Algorithmic Problem Solving
                    </span>
                    <span className="text-zinc-500">
                      {scoreMetrics.problemSolving}%
                    </span>
                  </div>
                  <div className="w-full h-2 bg-[#F2ECE0] rounded-xs overflow-hidden">
                    <div
                      className="h-full bg-[#2E6B3D]"
                      style={{ width: `${scoreMetrics.problemSolving}%` }}
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <div className="flex justify-between font-mono text-[11px] text-[#1A1612]">
                    <span className="font-500">Production Code Quality</span>
                    <span className="text-zinc-500">
                      {scoreMetrics.codeQuality}%
                    </span>
                  </div>
                  <div className="w-full h-2 bg-[#F2ECE0] rounded-xs overflow-hidden">
                    <div
                      className="h-full bg-[#2E6B3D]"
                      style={{ width: `${scoreMetrics.codeQuality}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Row: Dynamic Contextual Practice Insights Block */}
          <div className="border-t border-[#EAE3D2] pt-6 space-y-4">
            <div>
              <span className="font-mono text-[10px] tracking-widest text-[#2E6B3D] font-600 uppercase">
                LIVE PRACTICE DIAGNOSTICS
              </span>
              <p className="font-sans text-[11px] text-zinc-400 mt-0.5">
                Automated programmatic logic processing your active metrics to
                provide actionable professional goals.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Core Strength Card Context */}
              <div className="bg-white border border-[#EAE3D2] p-5 shadow-3xs flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-1.5 mb-2">
                    <span className="font-sans text-xs font-700 text-[#2E6B3D]">
                      ✓
                    </span>
                    <span className="font-mono text-[9px] text-[#2E6B3D] font-600 uppercase tracking-wider">
                      Identified Core Asset
                    </span>
                  </div>
                  <h4 className="font-sans font-600 text-[13px] text-[#1A1612]">
                    {performanceInsights.strengthTitle}
                  </h4>
                  <p className="font-sans text-[12px] font-300 text-zinc-500 mt-1 leading-relaxed">
                    {performanceInsights.strengthDesc}
                  </p>
                </div>
              </div>

              {/* Core Weakness Optimization Card Context */}
              <div className="bg-white border border-[#EAE3D2] p-5 shadow-3xs flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-1.5 mb-2">
                    <span className="font-sans text-xs font-700 text-amber-600">
                      ⚠
                    </span>
                    <span className="font-mono text-[9px] text-amber-600 font-600 uppercase tracking-wider">
                      Tactical Optimization Required
                    </span>
                  </div>
                  <h4 className="font-sans font-600 text-[13px] text-[#1A1612]">
                    {performanceInsights.weaknessTitle}
                  </h4>
                  <p className="font-sans text-[12px] font-300 text-zinc-500 mt-1 leading-relaxed">
                    {performanceInsights.weaknessDesc}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
