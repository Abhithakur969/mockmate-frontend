import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const NAV = [
  {
    id: "dashboard",
    label: "Dashboard",
    href: "/dashboard",
    icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6",
  },
  {
    id: "coach",
    label: "AI Coach",
    href: "/dashboard",
    icon: "M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z",
  },
  {
    id: "practice",
    label: "Practice",
    href: "/practice",
    icon: "M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z",
  },
  {
    id: "mock",
    label: "Mock Interviews",
    href: "/dashboard",
    icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z",
  },
  {
    id: "questions",
    label: "Question Bank",
    href: "/dashboard",
    icon: "M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2",
  },
  {
    id: "analysis",
    label: "Analysis",
    href: "/dashboard",
    icon: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z",
  },
  {
    id: "progress",
    label: "Progress",
    href: "/dashboard",
    icon: "M13 7h8m0 0v8m0-8l-8 8-4-4-6 6",
  },
  {
    id: "settings",
    label: "Settings",
    href: "/dashboard",
    icon: "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z",
  },
];

function NavItem({ item, active, onClick }) {
  return (
    <button
      onClick={() => onClick(item)}
      className={`w-full flex items-center gap-3 px-3 py-2.5 text-left
                  transition-all duration-150 group
                  ${
                    active
                      ? "bg-accent-bg text-accent"
                      : "text-ink-soft hover:bg-bg-alt hover:text-ink"
                  }`}
    >
      <svg
        className={`shrink-0 transition-colors ${active ? "text-accent" : "text-ink-mute group-hover:text-ink"}`}
        style={{ width: 16, height: 16 }}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d={item.icon} />
      </svg>
      <span className="font-sans text-[13px] font-400">{item.label}</span>
      {active && <span className="ml-auto w-1 h-4 bg-accent rounded-full" />}
    </button>
  );
}

function SidebarInner({ onClose }) {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const activeId = pathname === "/practice" ? "practice" : "dashboard";

  const handleNav = (item) => {
    navigate(item.href);
    if (onClose) onClose();
  };

  const mainNav = NAV.slice(0, 7);
  const bottomNav = NAV.slice(7);

  return (
    <div className="flex flex-col h-full bg-bg border-r border-line">
      {/* Logo */}
      <div className="h-14 flex items-center px-5 border-b border-line shrink-0">
        <Link
          to="/"
          className="flex items-center gap-2.5 group"
          onClick={onClose}
        >
          <div
            className="w-7 h-7 border border-accent flex items-center justify-center
                          group-hover:bg-accent transition-all duration-200 shrink-0"
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
      </div>

      {/* Main nav */}
      <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-0.5">
        <p className="font-mono text-[9px] text-ink-mute tracking-[0.25em] px-3 mb-3 uppercase">
          Main Menu
        </p>
        {mainNav.map((item) => (
          <NavItem
            key={item.id}
            item={item}
            active={item.id === activeId}
            onClick={handleNav}
          />
        ))}
      </nav>

      {/* Bottom nav + user */}
      <div className="px-3 pb-4 border-t border-line pt-3 space-y-0.5">
        {bottomNav.map((item) => (
          <NavItem
            key={item.id}
            item={item}
            active={false}
            onClick={handleNav}
          />
        ))}

        {/* User pill */}
        <div className="mt-3 flex items-center gap-3 px-3 py-2.5 bg-bg-alt border border-line">
          <div className="w-7 h-7 bg-accent flex items-center justify-center shrink-0">
            <span className="font-serif italic text-bg text-sm leading-none font-300">
              A
            </span>
          </div>
          <div className="min-w-0">
            <p className="font-sans text-[12px] font-500 text-ink truncate">
              Arjun
            </p>
            <p className="font-mono text-[9px] text-ink-mute tracking-wide">
              Fresher · Free plan
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Sidebar({ mobileOpen, onClose }) {
  return (
    <>
      {/* Desktop */}
      <aside className="hidden lg:flex flex-col w-56 shrink-0 h-screen sticky top-0">
        <SidebarInner />
      </aside>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-ink/30 backdrop-blur-sm"
            onClick={onClose}
          />
          <aside className="absolute left-0 top-0 bottom-0 w-64 flex flex-col shadow-card-hover">
            <SidebarInner onClose={onClose} />
          </aside>
        </div>
      )}
    </>
  );
}
