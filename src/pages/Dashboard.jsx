import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { QUESTIONS } from "../data/questions"; // IMPORT ADDED

const CODE_QUOTES = [
  "Clean code is not written; it is written on top of structural revisions.",
  "System architectures stabilize only under methodical edge-case verification.",
  "Great engineers build systems that decouple heavy runtime dependencies safely.",
  "Optimize for readability first; execution cycles follow modular simplicity.",
  "Deep technical depth is forged through continuous operational debugging.",
  "Every broken compilation trace is a detailed architectural blueprint in disguise.",
  "You + me + this mock = a winning vibe – let's flow, not force.",
  "One question at a time, one smile at a time – we've got this, friend.",
  "Mistakes are just high-fives from our future smarter selves.",
  "Breathe in calm, breathe out doubt – now pass me that positive energy.",
  "Even a wrong answer is a step closer to 'ahh, I get it now!'",
  "Let's treat this mock like a fun game – score doesn't matter, joy does.",
  "Your focus is cute – keep going, you're shining right now.",
  "Pause, sip water, share a giggle – reset, then crush the next bit.",
  "We don't need to be perfect; we just need to be present – and we already are.",
  "That little progress you just made? Yeah, that's pure gold.",
  "Let's whisper to our brains: 'You're safe, you're learning, you're loved.'",
  "Every click, every scribble – it's all building our beautiful comeback.",
  "Stuck? Smile at the screen – confusion is the secret doorway to clarity.",
  "You showing up today is already a win – everything else is bonus.",
  "Let's compete only with who we were yesterday – and hug that version.",
  "Imagine we're coaching our best friends – now talk to yourself like that.",
  "Fist bump for every tiny effort – they add up like magic.",
  "After this mock, we celebrate with something sweet – but the real treat is us trying.",
  "Your brain is not an enemy – it's a playful puppy. Guide it with kindness.",
  "Close your eyes for 3 seconds, feel your heartbeat – that's your motivation, always there.",
];

const getTodayStr = () => new Date().toDateString();

// Helper to calculate dynamic module completion percentage
const getModulePercentage = (roleLabel) => {
  try {
    const raw = localStorage.getItem("mockmate_question_progress");
    const progress = raw ? JSON.parse(raw) : {};
    const roleQuestions = QUESTIONS[roleLabel] || [];
    if (roleQuestions.length === 0) return 0;

    const solvedCount = roleQuestions.filter((q) => progress[q.id]).length;
    return Math.round((solvedCount / roleQuestions.length) * 100);
  } catch {
    return 0;
  }
};

const computeStreak = () => {
  try {
    const raw = localStorage.getItem("mockmate_streak_data");
    const today = getTodayStr();
    if (!raw) {
      const initial = { count: 1, lastActiveDate: today };
      localStorage.setItem("mockmate_streak_data", JSON.stringify(initial));
      return 1;
    }
    const data = JSON.parse(raw);
    const last = new Date(data.lastActiveDate);
    const now = new Date(today);
    const diffDays = Math.round((now - last) / (1000 * 60 * 60 * 24));
    if (diffDays === 0) {
      return data.count;
    } else if (diffDays === 1) {
      const updated = { count: data.count + 1, lastActiveDate: today };
      localStorage.setItem("mockmate_streak_data", JSON.stringify(updated));
      return updated.count;
    } else {
      const reset = { count: 1, lastActiveDate: today };
      localStorage.setItem("mockmate_streak_data", JSON.stringify(reset));
      return 1;
    }
  } catch {
    return 1;
  }
};

const computeTodayStats = () => {
  const today = getTodayStr();
  let practicePassToday = 0;
  let bankCheckedToday = 0;
  let totalSolved = 0;

  try {
    const raw = localStorage.getItem("mockmate_practice_history");
    if (raw) {
      const history = JSON.parse(raw);
      totalSolved = history.length;
      practicePassToday = history.filter((item) => {
        const isToday =
          item.timestamp && new Date(item.timestamp).toDateString() === today;
        const isPassed =
          item.passed === true ||
          (typeof item.score === "number" && item.score >= 6);
        return isToday && isPassed;
      }).length;
    }
  } catch {
    /* ignore */
  }

  try {
    const raw = localStorage.getItem("mockmate_question_progress_log");
    if (raw) {
      const log = JSON.parse(raw);
      bankCheckedToday = log.filter(
        (entry) =>
          entry.checkedAt && new Date(entry.checkedAt).toDateString() === today,
      ).length;
    } else {
      const progressRaw = localStorage.getItem("mockmate_question_progress");
      if (progressRaw) {
        const progress = JSON.parse(progressRaw);
        bankCheckedToday = Object.values(progress).filter(Boolean).length;
      }
    }
  } catch {
    /* ignore */
  }

  const rawHours = (totalSolved * 5 + bankCheckedToday * 3) / 60;
  const hoursLog =
    totalSolved === 0 && bankCheckedToday === 0
      ? 0
      : parseFloat(rawHours.toFixed(1));

  return {
    practicePassToday,
    bankCheckedToday,
    solvedTodayTotal: practicePassToday + bankCheckedToday,
    totalSolved,
    hoursLog,
  };
};

export default function Dashboard({ userProfile, setUserProfile }) {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const [quoteIndex, setQuoteIndex] = useState(() =>
    Math.floor(Math.random() * CODE_QUOTES.length),
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editName, setEditName] = useState(userProfile?.name || "");
  const [editTrack, setEditTrack] = useState(userProfile?.track || "");

  const [streak, setStreak] = useState(() => computeStreak());
  const [liveStats, setLiveStats] = useState(() => computeTodayStats());

  // Dynamically calculate the total track questions directly from the source
  const TOTAL_QUESTIONS_COUNT = Object.values(QUESTIONS).flat().length;

  useEffect(() => {
    const onVisible = () => {
      if (document.visibilityState === "visible") {
        setStreak(computeStreak());
        setLiveStats(computeTodayStats());
      }
    };
    document.addEventListener("visibilitychange", onVisible);
    return () => document.removeEventListener("visibilitychange", onVisible);
  }, []);

  const syncStats = useCallback(() => {
    setLiveStats(computeTodayStats());
  }, []);

  useEffect(() => {
    window.addEventListener("storage", syncStats);
    window.addEventListener("focus", syncStats);
    window.addEventListener("mockmate_practice_logged", syncStats);
    window.addEventListener("mockmate_question_checked", syncStats);
    return () => {
      window.removeEventListener("storage", syncStats);
      window.removeEventListener("focus", syncStats);
      window.removeEventListener("mockmate_practice_logged", syncStats);
      window.removeEventListener("mockmate_question_checked", syncStats);
    };
  }, [syncStats]);

  useEffect(() => {
    const interval = setInterval(() => {
      setStreak(computeStreak());
    }, 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  const saveProfileData = (e) => {
    e.preventDefault();
    const updated = {
      name: editName.trim() || "Developer",
      track: editTrack.trim() || "Software Engineer",
    };
    localStorage.setItem("mockmate_profile_db", JSON.stringify(updated));
    setUserProfile(updated);
    setIsModalOpen(false);
  };

  const streakLabel =
    streak === 1
      ? "1 day active"
      : streak >= 7
        ? `${streak} days 🔥`
        : `${streak} days active`;

  return (
    <div className="flex h-screen w-screen bg-[#FDFDFB] overflow-hidden text-[#1C1A17] font-sans antialiased">
      <Sidebar
        isOpen={mobileSidebarOpen}
        onClose={() => setMobileSidebarOpen(false)}
        userProfile={userProfile}
        onTriggerEdit={() => {
          setEditName(userProfile?.name || "");
          setEditTrack(userProfile?.track || "");
          setIsModalOpen(true);
        }}
      />

      <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
        <header className="h-16 border-b border-[#EFECE6] bg-white/80 backdrop-blur-md px-4 lg:px-8 flex items-center justify-between sticky top-0 z-20 shrink-0">
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setMobileSidebarOpen(true)}
              className="lg:hidden w-10 h-10 flex items-center justify-center rounded-lg border border-[#E8E4DC] bg-[#FAF9F5] text-[#1C1A17]"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
            <div className="hidden lg:block font-mono text-[10px] tracking-widest text-[#2E6B3D] uppercase font-600">
              Control Terminal Core
            </div>
            <h1 className="lg:hidden font-serif text-lg font-600 tracking-tight">
              Dashboard
            </h1>
          </div>

          <button
            onClick={() => navigate("/practice")}
            className="bg-[#2E6B3D] text-white font-sans font-500 text-[12px] lg:text-[13px] px-4 lg:px-5 h-9 lg:h-10 rounded-lg hover:bg-[#23522E] active:scale-[0.98] transition-all flex items-center space-x-1"
          >
            <span>Practice Active Track 🚀</span>
          </button>
        </header>

        <main className="flex-1 overflow-y-auto bg-[#FDFDFB] p-4 lg:p-8 space-y-8">
          <div className="bg-white border border-[#EFECE6] rounded-xl p-6 lg:p-8 shadow-2xs flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="space-y-1">
              <h2 className="font-serif text-2xl lg:text-3xl font-500 tracking-tight">
                Hello,{" "}
                <span className="text-[#2E6B3D] font-600">
                  {userProfile?.name}
                </span>{" "}
                ✨
              </h2>
              <p className="text-[#706B63] text-[13px] lg:text-[14px]">
                Target Track &rarr;{" "}
                <span className="font-mono bg-[#FAF9F5] border border-[#E8E4DC] px-2 py-0.5 rounded text-[12px] text-[#1C1A17] font-500">
                  {userProfile?.track}
                </span>
              </p>
            </div>
          </div>

          <div
            onClick={() =>
              setQuoteIndex((prev) => (prev + 1) % CODE_QUOTES.length)
            }
            className="bg-white border border-[#EFECE6] p-6 rounded-xl shadow-2xs hover:border-[#2E6B3D]/30 transition-all cursor-pointer group relative"
          >
            <div className="absolute right-4 top-4 font-mono text-[8px] text-[#A69F93] uppercase tracking-widest">
              Refresh Paradigm ↻
            </div>
            <span className="font-mono text-[9px] tracking-widest text-[#2E6B3D] font-600 uppercase block mb-2">
              Architectural Vibe Check
            </span>
            <p className="font-serif italic text-[15px] lg:text-[17px] text-[#2A2722] leading-relaxed max-w-4xl">
              "{CODE_QUOTES[quoteIndex]}"
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white border border-[#EFECE6] p-4 rounded-xl shadow-2xs">
              <span className="block font-mono text-[9px] tracking-wider text-[#9C9487] uppercase">
                Consecutive Prep Streak
              </span>
              <p className="font-serif text-xl lg:text-2xl font-500 mt-1">
                {streak}{" "}
                <span className="font-sans text-xs text-[#706B63]">
                  {streakLabel}
                </span>
              </p>
              {streak >= 3 && (
                <p className="font-mono text-[8px] text-[#2E6B3D] mt-1 uppercase tracking-wider">
                  🔥 Keep the streak alive!
                </p>
              )}
            </div>

            <div className="bg-white border border-[#EFECE6] p-4 rounded-xl shadow-2xs">
              <span className="block font-mono text-[9px] tracking-wider text-[#9C9487] uppercase">
                Calculated Prep Engine Hours
              </span>
              <p className="font-serif text-xl lg:text-2xl font-500 mt-1">
                {liveStats.hoursLog}{" "}
                <span className="font-sans text-xs text-[#706B63]">
                  hrs logged
                </span>
              </p>
            </div>

            <div className="bg-white border border-[#EFECE6] p-4 rounded-xl shadow-2xs">
              <span className="block font-mono text-[9px] tracking-wider text-[#9C9487] uppercase">
                Progress Scope
              </span>
              <p className="font-serif text-xl lg:text-2xl font-500 mt-1">
                {liveStats.totalSolved}{" "}
                <span className="font-sans text-xs text-[#706B63]">
                  / {TOTAL_QUESTIONS_COUNT} items
                </span>
              </p>
            </div>

            <div className="bg-[#2E6B3D]/5 border border-[#2E6B3D]/10 p-4 rounded-xl shadow-2xs">
              <span className="block font-mono text-[9px] tracking-wider text-[#2E6B3D] uppercase font-600">
                Solved Today
              </span>
              <p className="font-serif text-xl lg:text-2xl font-600 text-[#2E6B3D] mt-1">
                +{liveStats.solvedTodayTotal}{" "}
                <span className="font-sans text-xs text-[#2E6B3D]/70">
                  completed
                </span>
              </p>
              <div className="flex gap-2 mt-1.5 flex-wrap">
                <span className="font-mono text-[8px] text-[#2E6B3D]/60 bg-[#2E6B3D]/5 px-1.5 py-0.5 rounded">
                  ✓ {liveStats.practicePassToday} practice
                </span>
                <span className="font-mono text-[8px] text-[#2E6B3D]/60 bg-[#2E6B3D]/5 px-1.5 py-0.5 rounded">
                  ✓ {liveStats.bankCheckedToday} bank
                </span>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <h3 className="font-mono text-[11px] tracking-wider text-[#1C1A17] uppercase font-600">
                Core Specialization Modules
              </h3>
              <p className="text-[#9C9487] text-[11px] mt-0.5">
                Real-time tracker tied directly to your active question box
                selections.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white border border-[#EFECE6] p-6 rounded-xl shadow-2xs relative flex flex-col justify-between h-36">
                <div>
                  <div className="flex justify-between items-start">
                    <h4 className="font-serif text-[16px] font-500 text-[#1C1A17]">
                      Frontend Developer
                    </h4>
                    <span className="font-serif text-2xl text-[#2E6B3D] italic font-500">
                      {getModulePercentage("Frontend Developer")}%
                    </span>
                  </div>
                  <p className="font-mono text-[9px] text-[#A69F93] tracking-wider uppercase mt-1">
                    REACT • CSS ARCHITECTURE • VIRTUAL DOM
                  </p>
                </div>
                <button
                  onClick={() => navigate("/question-bank")}
                  className="w-full text-left bg-transparent border-t border-[#EFECE6]/60 pt-3 flex items-center text-[11px] font-mono text-[#706B63] hover:text-[#2E6B3D] transition-colors cursor-pointer"
                >
                  Continue Track Module &rarr;
                </button>
              </div>

              <div className="bg-white border border-[#EFECE6] p-6 rounded-xl shadow-2xs relative flex flex-col justify-between h-36">
                <div>
                  <div className="flex justify-between items-start">
                    <h4 className="font-serif text-[16px] font-500 text-[#1C1A17]">
                      Backend Developer
                    </h4>
                    <span className="font-serif text-2xl text-[#2E6B3D] italic font-500">
                      {getModulePercentage("Backend Developer")}%
                    </span>
                  </div>
                  <p className="font-mono text-[9px] text-[#A69F93] tracking-wider uppercase mt-1">
                    NODE.JS • REST APIS • TRANSACTION ISOLATION
                  </p>
                </div>
                <button
                  onClick={() => navigate("/question-bank")}
                  className="w-full text-left bg-transparent border-t border-[#EFECE6]/60 pt-3 flex items-center text-[11px] font-mono text-[#706B63] hover:text-[#2E6B3D] transition-colors cursor-pointer"
                >
                  Continue Track Module &rarr;
                </button>
              </div>

              <div className="bg-white border border-[#EFECE6] p-6 rounded-xl shadow-2xs relative flex flex-col justify-between h-36">
                <div>
                  <div className="flex justify-between items-start">
                    <h4 className="font-serif text-[16px] font-500 text-[#1C1A17]">
                      Full Stack Developer
                    </h4>
                    <span className="font-serif text-2xl text-[#B36B2E] italic font-500">
                      {getModulePercentage("Full Stack Developer")}%
                    </span>
                  </div>
                  <p className="font-mono text-[9px] text-[#A69F93] tracking-wider uppercase mt-1">
                    SYSTEM PIPELINES • CORS • RELATIONAL SCALING
                  </p>
                </div>
                <button
                  onClick={() => navigate("/question-bank")}
                  className="w-full text-left bg-transparent border-t border-[#EFECE6]/60 pt-3 flex items-center text-[11px] font-mono text-[#706B63] hover:text-[#B36B2E] transition-colors cursor-pointer"
                >
                  Continue Track Module &rarr;
                </button>
              </div>

              <div className="bg-white border border-[#EFECE6] p-6 rounded-xl shadow-2xs relative flex flex-col justify-between h-36">
                <div>
                  <div className="flex justify-between items-start">
                    <h4 className="font-serif text-[16px] font-500 text-[#1C1A17]">
                      Data / ML Engineer
                    </h4>
                    <span className="font-serif text-2xl text-[#7A4DB8] italic font-500">
                      {getModulePercentage("Data / ML Engineer")}%
                    </span>
                  </div>
                  <p className="font-mono text-[9px] text-[#A69F93] tracking-wider uppercase mt-1">
                    PYTHON • FEATURE ANALYTICS • SCALE OPERATIONS
                  </p>
                </div>
                <button
                  onClick={() => navigate("/question-bank")}
                  className="w-full text-left bg-transparent border-t border-[#EFECE6]/60 pt-3 flex items-center text-[11px] font-mono text-[#706B63] hover:text-[#7A4DB8] transition-colors cursor-pointer"
                >
                  Continue Track Module &rarr;
                </button>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-mono text-[11px] tracking-wider text-[#9C9487] uppercase font-600">
              Live Practice Diagnostics
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white border border-[#EFECE6] p-6 rounded-xl shadow-2xs space-y-2">
                <span className="font-serif italic text-lg text-[#2E6B3D] font-300">
                  Identified Asset ✓
                </span>
                <p className="font-serif font-600 text-lg leading-snug">
                  Communication
                </p>
                <p className="font-sans text-xs text-[#706B63] leading-relaxed font-300">
                  Clear and articulate responses demonstrated technical
                  confidence. Continue to integrate professional phrasing during
                  solution delivery.
                </p>
              </div>

              <div className="bg-white border border-[#EFECE6] p-6 rounded-xl shadow-2xs space-y-2">
                <span className="font-serif italic text-lg text-[#B36B2E] font-300">
                  Tactical Focus Required ⚠️
                </span>
                <p className="font-serif font-600 text-lg leading-snug">
                  Elevated Technical Depth
                </p>
                <p className="font-sans text-xs text-[#706B63] leading-relaxed font-300">
                  Practice technical depth profiling. Question bank validation
                  can strengthen technical architecture definitions.
                </p>
              </div>
            </div>
          </div>
        </main>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1C1A17]/40 backdrop-blur-sm">
          <div className="bg-white border border-[#EFECE6] rounded-xl w-full max-w-md p-6 shadow-xl">
            <h3 className="font-serif text-xl font-600 text-[#1C1A17] mb-1">
              Update Engineering Parameters
            </h3>
            <form onSubmit={saveProfileData} className="space-y-4 mt-4">
              <div>
                <label className="block font-mono text-[10px] uppercase text-[#706B63] mb-1">
                  Your Identity Name
                </label>
                <input
                  type="text"
                  required
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="w-full h-10 border border-[#E8E4DC] px-3 rounded-lg text-[14px] bg-[#FAF9F5] focus:outline-none focus:border-[#2E6B3D] transition-all"
                />
              </div>
              <div>
                <label className="block font-mono text-[10px] uppercase text-[#706B63] mb-1">
                  Focus Core Track
                </label>
                <input
                  type="text"
                  required
                  value={editTrack}
                  onChange={(e) => setEditTrack(e.target.value)}
                  className="w-full h-10 border border-[#E8E4DC] px-3 rounded-lg text-[14px] bg-[#FAF9F5] focus:outline-none focus:border-[#2E6B3D] transition-all"
                />
              </div>
              <div className="flex justify-end space-x-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 h-9 font-sans text-[12px] font-500 border border-[#E8E4DC] rounded-lg text-[#706B63]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 h-9 font-sans text-[12px] font-500 bg-[#2E6B3D] text-white rounded-lg hover:bg-[#23522E] transition-colors"
                >
                  Save Modifications
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
