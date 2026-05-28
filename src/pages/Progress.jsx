import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";

export default function Progress() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [questionProgress, setQuestionProgress] = useState(0);

  // Read directly from localStorage on the very first frame to prevent hardcoded flashes
  const [profile, setProfile] = useState(() => {
    const savedProfile = localStorage.getItem("user_profile");
    if (savedProfile) {
      try {
        const parsed = JSON.parse(savedProfile);
        return {
          name: parsed.name || "",
          goal: parsed.goal || parsed.track || "",
        };
      } catch (e) {
        console.error("Error parsing user profile data", e);
      }
    }
    return { name: "", goal: "" }; // Clean fallback if entirely empty
  });

  // Sync profile parameters and question metrics dynamically
  useEffect(() => {
    const loadSyncedData = () => {
      // 1. Fetch live global profile state
      const savedProfile = localStorage.getItem("user_profile");
      if (savedProfile) {
        try {
          const parsedProfile = JSON.parse(savedProfile);
          setProfile({
            name: parsedProfile.name || "Abhishek",
            goal:
              parsedProfile.goal ||
              parsedProfile.track ||
              "Computer Science Engineer",
          });
        } catch (e) {
          console.error("Error parsing user profile data", e);
        }
      }

      // 2. Fetch live checkmark metrics from question bank
      const savedProgress = localStorage.getItem("mockmate_question_progress");
      if (savedProgress) {
        try {
          const parsed = JSON.parse(savedProgress);
          // Filter and count only actively checked question items
          const totalChecked = Object.values(parsed).filter(Boolean).length;
          setQuestionProgress(totalChecked);
        } catch (e) {
          console.error("Error parsing progress metrics", e);
        }
      } else {
        setQuestionProgress(0);
      }
    };

    // Load data instantly on mount
    loadSyncedData();

    // Listen to live updates coming from the Question Bank actions
    window.addEventListener("storage", loadSyncedData);
    return () => window.removeEventListener("storage", loadSyncedData);
  }, []);

  // Updated dataset metric scope out of 240 items
  const totalTrackQuestions = 240;
  const globalPercentage =
    Math.round((questionProgress / totalTrackQuestions) * 100) || 0;

  // Me vs Me performance logs line matrix
  const progressionData = [
    { week: "W1", mock: "M1", score: 3.2 },
    { week: "W2", mock: "M2", score: 3.2 },
    { week: "W3", mock: "M3", score: 3.8 },
    { week: "W4", mock: "M4", score: 5.0 },
    { week: "W5", mock: "M5", score: 6.5 },
    { week: "W6", mock: "M6", score: 6.5 },
    { week: "W7", mock: "M7", score: 7.4 },
    { week: "W8", mock: "M8", score: 7.4 },
    { week: "W9", mock: "M9", score: 7.4 },
  ];

  return (
    <div className="flex h-screen bg-[#FBF9F4] overflow-hidden">
      <Sidebar
        mobileOpen={mobileOpen}
        onClose={() => setMobileOpen(false)}
        profile={profile}
      />

      <main className="flex-1 overflow-y-auto min-w-0 bg-[#FBF9F4]">
        {/* Top Navbar */}
        <div className="sticky top-0 z-30 bg-white border-b border-[#EAE3D2] h-14 flex items-center justify-between px-6 shrink-0">
          <div className="flex items-center">
            <button
              onClick={() => setMobileOpen(true)}
              className="lg:hidden w-8 h-8 flex items-center justify-center border border-[#EAE3D2] mr-3 rounded-md"
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
              Performance Matrix
            </p>
          </div>
        </div>

        {/* Analytics Body Layout Wrapper */}
        <div className="w-full mx-auto px-6 py-8 space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            {/* Left Block: Real-Time Core Logs */}
            <div className="lg:col-span-5 bg-white border border-[#EAE3D2] p-6 shadow-3xs flex flex-col justify-between">
              <div>
                <span className="font-mono text-[10px] tracking-widest text-[#2E6B3D] font-600 uppercase">
                  PREPARATION TELEMETRY
                </span>
                <h2 className="font-serif font-300 text-2xl text-[#1A1612] mt-1 mb-6">
                  Real-Time Core Logs
                </h2>
              </div>

              <div className="space-y-4">
                <div className="p-4 border border-[#F2ECE0] bg-[#FBF9F4]">
                  <p className="font-mono text-[10px] text-zinc-400 uppercase tracking-wider">
                    Question Bank Progress
                  </p>
                  <p className="font-serif text-2xl text-[#1A1612] mt-1 font-300">
                    {questionProgress}{" "}
                    <span className="text-xs font-sans text-zinc-400">
                      / {totalTrackQuestions} items marked ({globalPercentage}%)
                    </span>
                  </p>
                  <div className="w-full bg-[#EFECE6] h-1.5 rounded-full mt-3 overflow-hidden">
                    <div
                      className="bg-[#2E6B3D] h-full transition-all duration-300"
                      style={{ width: `${globalPercentage}%` }}
                    />
                  </div>
                </div>

                <div className="p-4 border border-[#F2ECE0] bg-[#FBF9F4]">
                  <p className="font-mono text-[10px] text-zinc-400 uppercase tracking-wider">
                    Active Evaluation Standing
                  </p>
                  <p className="font-serif text-2xl text-[#2E6B3D] mt-1 font-300">
                    82%{" "}
                    <span className="text-xs font-sans text-zinc-400">
                      Avg Weight
                    </span>
                  </p>
                  <div className="w-full bg-[#EFECE6] h-1.5 rounded-full mt-3 overflow-hidden">
                    <div className="bg-[#2E6B3D] h-full w-[82%]" />
                  </div>
                </div>
              </div>
            </div>

            {/* Right Block: My Progression Core Track */}
            <div className="lg:col-span-7 bg-white border border-[#EAE3D2] p-6 shadow-3xs flex flex-col justify-between">
              <div>
                <span className="font-mono text-[10px] tracking-widest text-[#2E6B3D] font-600 uppercase">
                  ME VS ME ANALYSIS
                </span>
                <h2 className="font-serif font-300 text-2xl text-[#1A1612] mt-1 mb-4">
                  My Progression Core Track
                </h2>
              </div>

              <div className="flex flex-col space-y-4">
                <div className="border border-[#F2ECE0] bg-[#FBF9F4] p-4 rounded-xs">
                  <div className="flex justify-between font-mono text-[10px] text-zinc-400 pb-2 border-b border-[#EFECE6]">
                    <span>Timeline Block</span>
                    <span>Test Score Metrics (0-8 range)</span>
                  </div>

                  <div className="pt-4 space-y-3">
                    {progressionData.map((item, index) => {
                      const barWidth = Math.min((item.score / 8) * 100, 100);
                      return (
                        <div
                          key={index}
                          className="flex items-center space-x-3 text-left"
                        >
                          <div className="w-16 shrink-0 font-sans text-[11px] text-[#5C574F] font-500">
                            {item.week}{" "}
                            <span className="text-zinc-400">({item.mock})</span>
                          </div>
                          <div className="flex-1 bg-[#EFECE6] h-4 rounded-xs relative overflow-hidden">
                            <div
                              className="bg-[#2E6B3D]/80 h-full rounded-xs transition-all duration-300 flex items-center justify-end pr-1.5"
                              style={{ width: `${barWidth}%` }}
                            >
                              <span className="text-[9px] text-white font-mono font-600">
                                {item.score}
                              </span>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Growth Delta Indicators */}
                <div className="grid grid-cols-3 gap-2 pt-2 text-center">
                  <div className="p-2 border border-[#EFECE6] bg-white rounded-lg">
                    <p className="font-mono text-[9px] text-zinc-400 uppercase">
                      Weekly Delta
                    </p>
                    <p className="font-sans font-600 text-[13px] text-[#2E6B3D] mt-0.5">
                      +4% 🌿
                    </p>
                  </div>
                  <div className="p-2 border border-[#EFECE6] bg-white rounded-lg">
                    <p className="font-mono text-[9px] text-zinc-400 uppercase">
                      Mock Delta
                    </p>
                    <p className="font-sans font-600 text-[13px] text-[#2E6B3D] mt-0.5">
                      +0.5 pts ✨
                    </p>
                  </div>
                  <div className="p-2 border border-[#EFECE6] bg-white rounded-lg">
                    <p className="font-mono text-[9px] text-zinc-400 uppercase">
                      Streak
                    </p>
                    <p className="font-sans font-600 text-[13px] text-amber-700 mt-0.5">
                      4 Mocks 💪
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
