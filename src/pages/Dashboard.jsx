import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";

const CODE_QUOTES = [
  "Clean code is not written; it is written on top of structural revisions.",
  "System architectures stabilize only under methodical edge-case verification.",
  "Great engineers build systems that decouple heavy runtime dependencies safely.",
  "Optimize for readability first; execution cycles follow modular simplicity.",
  "Deep technical depth is forged through continuous operational debugging.",
  "Every broken compilation trace is a detailed architectural blueprint in disguise.",
  "You + me + this mock = a winning vibe – let’s flow, not force.",
  "One question at a time, one smile at a time – we’ve got this, friend.",
  "Mistakes are just high-fives from our future smarter selves.",
  "Breathe in calm, breathe out doubt – now pass me that positive energy.",
  "Even a wrong answer is a step closer to ‘ahh, I get it now!’",
  "Let’s treat this mock like a fun game – score doesn’t matter, joy does.",
  "Your focus is cute – keep going, you’re shining right now.",
  "Pause, sip water, share a giggle – reset, then crush the next bit.",
  "We don’t need to be perfect; we just need to be present – and we already are.",
  "That little progress you just made? Yeah, that’s pure gold.",
  "Let’s whisper to our brains: ‘You’re safe, you’re learning, you’re loved.’",
  "Every click, every scribble – it’s all building our beautiful comeback.",
  "Stuck? Smile at the screen – confusion is the secret doorway to clarity.",
  "You showing up today is already a win – everything else is bonus.",
  "Let’s compete only with who we were yesterday – and hug that version.",
  "Imagine we’re coaching our best friends – now talk to yourself like that.",
  "Fist bump for every tiny effort – they add up like magic.",
  "After this mock, we celebrate with something sweet – but the real treat is us trying.",
  "Your brain is not an enemy – it’s a playful puppy. Guide it with kindness.",
  "Close your eyes for 3 seconds, feel your heartbeat – that’s your motivation, always there.",
];

export default function Dashboard({ userProfile, setUserProfile }) {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const [quoteIndex, setQuoteIndex] = useState(() =>
    Math.floor(Math.random() * CODE_QUOTES.length),
  );

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editName, setEditName] = useState(userProfile?.name || "");
  const [editTrack, setEditTrack] = useState(userProfile?.track || "");

  const getLatestStorageStats = () => {
    const defaultStats = {
      streak: 1,
      hoursLog: 4.5,
      solvedCount: 0,
      solvedToday: 0,
    };
    try {
      const history = localStorage.getItem("mockmate_practice_history");
      if (history) {
        const parsedHistory = JSON.parse(history);
        const todayStr = new Date().toDateString();
        const itemsToday = parsedHistory.filter(
          (item) =>
            item.timestamp &&
            new Date(item.timestamp).toDateString() === todayStr,
        ).length;

        return {
          ...defaultStats,
          solvedCount: parsedHistory.length,
          solvedToday: itemsToday,
        };
      }
    } catch (err) {
      console.error("Failed to parse storage array:", err);
    }
    return defaultStats;
  };

  const [liveStats, setLiveStats] = useState(() => getLatestStorageStats());

  useEffect(() => {
    const syncDashboardMetrics = () => {
      setLiveStats(getLatestStorageStats());
    };

    window.addEventListener("storage", syncDashboardMetrics);
    window.addEventListener("focus", syncDashboardMetrics);
    window.addEventListener("mockmate_practice_logged", syncDashboardMetrics);

    return () => {
      window.removeEventListener("storage", syncDashboardMetrics);
      window.removeEventListener("focus", syncDashboardMetrics);
      window.removeEventListener(
        "mockmate_practice_logged",
        syncDashboardMetrics,
      );
    };
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
          {/* Welcome Card Component - Removed Button completely */}
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
                {liveStats.streak}{" "}
                <span className="font-sans text-xs text-[#706B63]">
                  day active
                </span>
              </p>
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
                {liveStats.solvedCount}{" "}
                <span className="font-sans text-xs text-[#706B63]">
                  / 240 items
                </span>
              </p>
            </div>
            <div className="bg-[#2E6B3D]/5 border border-[#2E6B3D]/10 p-4 rounded-xl shadow-2xs">
              <span className="block font-mono text-[9px] tracking-wider text-[#2E6B3D] uppercase font-600">
                Practiced Today
              </span>
              <p className="font-serif text-xl lg:text-2xl font-600 text-[#2E6B3D] mt-1">
                +{liveStats.solvedToday}{" "}
                <span className="font-sans text-xs text-[#2E6B3D]/70">
                  completed
                </span>
              </p>
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
                      0%
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
                      0%
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
                      0%
                    </span>
                  </div>
                  <p className="font-mono text-[9px] text-[#A69F93] tracking-wider uppercase mt-1">
                    SYSTEM PIPELINES • CORS • RELATIONAL SCALING
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
                      Data / ML Engineer
                    </h4>
                    <span className="font-serif text-2xl text-[#7A4DB8] italic font-500">
                      0%
                    </span>
                  </div>
                  <p className="font-mono text-[9px] text-[#A69F93] tracking-wider uppercase mt-1">
                    PYTHON • FEATURE ANALYTICS • SCALE OPERATIONS
                  </p>
                </div>
                <button
                  onClick={() => navigate("/question-bank")}
                  className="w-full text-left bg-transparent border-t border-[#EFECE6]/60 pt-3 flex items-center text-[11px] font-mono text-[#706B63] hover:text-[#2E6B3D] transition-colors cursor-pointer"
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
  );import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";

const CODE_QUOTES = [
  "Clean code is not written; it is written on top of structural revisions.",
  "System architectures stabilize only under methodical edge-case verification.",
  "Great engineers build systems that decouple heavy runtime dependencies safely.",
  "Optimize for readability first; execution cycles follow modular simplicity.",
  "Deep technical depth is forged through continuous operational debugging.",
  "Every broken compilation trace is a detailed architectural blueprint in disguise.",
  "You + me + this mock = a winning vibe – let’s flow, not force.",
  "One question at a time, one smile at a time – we’ve got this, friend.",
  "Mistakes are just high-fives from our future smarter selves.",
  "Breathe in calm, breathe out doubt – now pass me that positive energy.",
  "Even a wrong answer is a step closer to ‘ahh, I get it now!’",
  "Let’s treat this mock like a fun game – score doesn’t matter, joy does.",
  "Your focus is cute – keep going, you’re shining right now.",
  "Pause, sip water, share a giggle – reset, then crush the next bit.",
  "We don’t need to be perfect; we just need to be present – and we already are.",
  "That little progress you just made? Yeah, that’s pure gold.",
  "Let’s whisper to our brains: ‘You’re safe, you’re learning, you’re loved.’",
  "Every click, every scribble – it’s all building our beautiful comeback.",
  "Stuck? Smile at the screen – confusion is the secret doorway to clarity.",
  "You showing up today is already a win – everything else is bonus.",
  "Let’s compete only with who we were yesterday – and hug that version.",
  "Imagine we’re coaching our best friends – now talk to yourself like that.",
  "Fist bump for every tiny effort – they add up like magic.",
  "After this mock, we celebrate with something sweet – but the real treat is us trying.",
  "Your brain is not an enemy – it’s a playful puppy. Guide it with kindness.",
  "Close your eyes for 3 seconds, feel your heartbeat – that’s your motivation, always there.",
];

export default function Dashboard({ userProfile, setUserProfile }) {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const [quoteIndex, setQuoteIndex] = useState(() =>
    Math.floor(Math.random() * CODE_QUOTES.length),
  );

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editName, setEditName] = useState(userProfile?.name || "");
  const [editTrack, setEditTrack] = useState(userProfile?.track || "");

  // --- REAL SYNC LOGIC ---
  const getLatestStorageStats = () => {
    // 1. Calculate Progress Scope (out of 240)
    const progressData = localStorage.getItem("mockmate_question_progress");
    const parsedProgress = progressData ? JSON.parse(progressData) : {};
    const solvedCount = Object.values(parsedProgress).filter(Boolean).length;

    // 2. Calculate Practiced Today (Midnight Reset Logic)
    const dailyLog = localStorage.getItem("mockmate_daily_log");
    const parsedDaily = dailyLog ? JSON.parse(dailyLog) : { date: "", count: 0 };
    const todayStr = new Date().toDateString();
    const solvedToday = parsedDaily.date === todayStr ? parsedDaily.count : 0;

    // 3. Engine Hours (Read from storage)
    const timeLog = localStorage.getItem("mockmate_time_log") || "0.0";

    return {
      streak: solvedCount > 0 ? 1 : 0,
      hoursLog: parseFloat(timeLog).toFixed(1),
      solvedCount: solvedCount,
      solvedToday: solvedToday,
    };
  };

  const [liveStats, setLiveStats] = useState(() => getLatestStorageStats());

  useEffect(() => {
    const syncDashboardMetrics = () => {
      setLiveStats(getLatestStorageStats());
    };

    window.addEventListener("storage", syncDashboardMetrics);
    window.addEventListener("focus", syncDashboardMetrics);
    window.addEventListener("mockmate_practice_logged", syncDashboardMetrics);

    return () => {
      window.removeEventListener("storage", syncDashboardMetrics);
      window.removeEventListener("focus", syncDashboardMetrics);
      window.removeEventListener("mockmate_practice_logged", syncDashboardMetrics);
    };
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
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
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
                {liveStats.streak}{" "}
                <span className="font-sans text-xs text-[#706B63]">
                  day active
                </span>
              </p>
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
                {liveStats.solvedCount}{" "}
                <span className="font-sans text-xs text-[#706B63]">
                  / 240 items
                </span>
              </p>
            </div>
            <div className="bg-[#2E6B3D]/5 border border-[#2E6B3D]/10 p-4 rounded-xl shadow-2xs">
              <span className="block font-mono text-[9px] tracking-wider text-[#2E6B3D] uppercase font-600">
                Practiced Today
              </span>
              <p className="font-serif text-xl lg:text-2xl font-600 text-[#2E6B3D] mt-1">
                +{liveStats.solvedToday}{" "}
                <span className="font-sans text-xs text-[#2E6B3D]/70">
                  completed
                </span>
              </p>
            </div>
          </div>

          {/* ... [Rest of your Modules and Diagnostic UI stays exactly the same as you provided] ... */}
          
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
}
