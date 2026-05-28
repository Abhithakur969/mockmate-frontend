import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import { QUESTIONS } from "../data/questions"; // IMPORT ADDED

export default function Progress() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [questionProgress, setQuestionProgress] = useState(0);
  const [progressionData, setProgressionData] = useState([]);

  // Fixed wrong profile key: now uses "mockmate_profile_db" like the Dashboard
  const [profile, setProfile] = useState(() => {
    const savedProfile = localStorage.getItem("mockmate_profile_db");
    if (savedProfile) {
      try {
        const parsed = JSON.parse(savedProfile);
        return {
          name: parsed.name || "",
          goal: parsed.track || "",
        };
      } catch (e) {
        console.error("Error parsing user profile data", e);
      }
    }
    return { name: "", goal: "" };
  });

  useEffect(() => {
    const loadSyncedData = () => {
      // 1. Fetch live global profile state
      const savedProfile = localStorage.getItem("mockmate_profile_db");
      if (savedProfile) {
        try {
          const parsedProfile = JSON.parse(savedProfile);
          setProfile({
            name: parsedProfile.name || "Developer",
            goal: parsedProfile.track || "Software Engineer",
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
          const totalChecked = Object.values(parsed).filter(Boolean).length;
          setQuestionProgress(totalChecked);
        } catch (e) {
          console.error("Error parsing progress metrics", e);
        }
      } else {
        setQuestionProgress(0);
      }

      // 3. Load Real Practice History for Chart (Replacing Hardcoded Data)
      const savedHistory = localStorage.getItem("mockmate_practice_history");
      if (savedHistory) {
        try {
          const history = JSON.parse(savedHistory);
          // Grab the last 9 attempts so the graph fits nicely
          const mappedData = history.slice(-9).map((entry, idx) => ({
            week: `Day ${idx + 1}`,
            mock: `Test ${idx + 1}`,
            score:
              typeof entry.score === "number"
                ? entry.score
                : entry.passed
                  ? 8
                  : 4,
          }));
          setProgressionData(
            mappedData && mappedData.length > 0
              ? mappedData
              : [{ week: "Start", mock: "-", score: 0 }],
          );
        } catch (e) {
          // 1. Log the full error to your browser console (F12) to see line numbers
          console.error("Full Error Object:", e);

          // 2. Log just the human-readable error message (e.g., "Cannot read property 'map' of undefined")
          console.error("Error Message:", e.message);

          // Fallback so the UI stays stable
          setProgressionData([{ week: "Start", mock: "-", score: 0 }]);
        }
      } else {
        setProgressionData([{ week: "Start", mock: "-", score: 0 }]);
      }
    };

    loadSyncedData();

    window.addEventListener("storage", loadSyncedData);
    return () => window.removeEventListener("storage", loadSyncedData);
  }, []);

  // Dynamically calculate the total track questions directly from the source
  const totalTrackQuestions = Object.values(QUESTIONS).flat().length;
  const globalPercentage =
    Math.round((questionProgress / totalTrackQuestions) * 100) || 0;

  // Calculate average evaluation standing for the UI card
  const avgStanding =
    progressionData.length > 0
      ? Math.round(
          (progressionData.reduce((acc, curr) => acc + curr.score, 0) /
            (progressionData.length * 8)) *
            100,
        )
      : 0;

  return (
    <div className="flex h-screen bg-[#FBF9F4] overflow-hidden">
      <Sidebar
        mobileOpen={mobileOpen}
        onClose={() => setMobileOpen(false)}
        profile={profile}
      />

      <main className="flex-1 overflow-y-auto min-w-0 bg-[#FBF9F4]">
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
                    {avgStanding}%{" "}
                    <span className="text-xs font-sans text-zinc-400">
                      Avg Weight
                    </span>
                  </p>
                  <div className="w-full bg-[#EFECE6] h-1.5 rounded-full mt-3 overflow-hidden">
                    <div
                      className="bg-[#2E6B3D] h-full transition-all duration-300"
                      style={{ width: `${avgStanding}%` }}
                    />
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
                          <div className="w-20 shrink-0 font-sans text-[11px] text-[#5C574F] font-500">
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

                {/* Growth Delta Indicator */}
                <div className="flex items-center space-x-2 text-[11px] font-mono text-[#706B63] bg-[#F2ECE0] p-3 rounded-xs border border-[#EAE3D2]">
                  <span className="text-[#2E6B3D]">↑ Trending Upward</span>
                  <span>
                    - Continuous adaptation tracked across local storage
                    records.
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
