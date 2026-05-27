import { useState } from "react";
import Sidebar from "../components/Sidebar";

export default function Progress() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const [profile] = useState(() => {
    const saved = localStorage.getItem("user_profile");
    return saved
      ? JSON.parse(saved)
      : { name: "Abhishek", goal: "Computer Science Engineer" };
  });

  // Pulling total question progress stats directly from your operational local storage
  const questionProgress = (() => {
    const saved = localStorage.getItem("mockmate_question_progress");
    if (!saved) return 0;
    try {
      return Object.keys(JSON.parse(saved)).length;
    } catch {
      return 0;
    }
  })();

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
              Performance Matrix
            </p>
          </div>
        </div>

        {/* Analytics Body */}
        <div className="max-w-4xl mx-auto px-6 py-8 space-y-6">
          <div className="bg-white border border-[#EAE3D2] p-6 shadow-xs">
            <div className="mb-6">
              <span className="font-mono text-[10px] tracking-widest text-[#2E6B3D] font-600 uppercase">
                PREPARATION TELEMETRY
              </span>
              <h2 className="font-serif font-300 text-2xl text-[#1A1612] mt-1">
                Real-Time Core Logs
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 border border-[#F2ECE0] bg-[#FBF9F4]">
                <p className="font-mono text-[10px] text-zinc-400 uppercase tracking-wider">
                  Question Bank Progress
                </p>
                <p className="font-serif text-2xl text-[#1A1612] mt-1 font-300">
                  {questionProgress}{" "}
                  <span className="text-xs font-sans text-zinc-400">
                    / 60 items marked
                  </span>
                </p>
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
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
