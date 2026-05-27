import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

export default function Sidebar({ mobileOpen, onClose, profile }) {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    {
      id: "dashboard",
      label: "Dashboard",
      path: "/dashboard",
      icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6",
    },
    {
      id: "practice",
      label: "Practice",
      path: "/practice",
      icon: "M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z",
    },
    {
      id: "question-bank",
      label: "Question Bank",
      path: "/question-bank",
      icon: "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253",
    },
    {
      id: "progress",
      label: "Progress",
      path: "/progress",
      icon: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2",
    },
  ];

  return (
    <>
      {/* Mobile Sidebar Overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-ink/40 backdrop-blur-xs lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar Structural Frame */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-bg border-r border-line transform transition-transform duration-200 ease-in-out lg:translate-x-0 lg:static lg:flex lg:flex-col ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Brand Banner */}
        <div className="h-14 border-b border-line flex items-center px-6 gap-2.5">
          <div className="w-6 h-6 bg-accent flex items-center justify-center text-bg font-serif italic font-700 text-sm">
            M
          </div>
          <span className="font-mono text-[11px] tracking-widest text-ink font-700 uppercase">
            MOCKMATE
          </span>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
          <p className="font-mono text-[9px] text-ink-mute tracking-widest uppercase px-3 mb-2">
            Main Menu
          </p>
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <button
                key={item.id}
                onClick={() => {
                  navigate(item.path);
                  onClose();
                }}
                className={`w-full flex items-center gap-3 px-3 py-2.5 transition-colors font-sans text-[13px] ${
                  isActive
                    ? "bg-accent-bg text-accent font-500 border-l-2 border-accent"
                    : "text-ink-soft hover:bg-bg-alt hover:text-ink font-300"
                }`}
              >
                <svg
                  className="w-4 h-4 shrink-0"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d={item.icon}
                  />
                </svg>
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* User Card */}
        <div className="p-4 border-t border-line bg-bg-alt">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-accent text-bg flex items-center justify-center font-serif text-sm uppercase">
              {profile?.name?.charAt(0) || "D"}
            </div>
            <div className="min-w-0">
              <p className="font-sans font-500 text-ink text-[12px] truncate">
                {profile?.name || "Developer"}
              </p>
              <p className="font-mono text-[9px] text-ink-mute truncate tracking-wide">
                {profile?.goal || "Software Engineer"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
