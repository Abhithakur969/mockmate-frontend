import { Link, useLocation } from "react-router-dom";

export default function Sidebar({
  isOpen,
  onClose,
  userProfile,
  onTriggerEdit,
}) {
  const location = useLocation();

  const menuLinks = [
    { name: "Dashboard", target: "/dashboard", emblem: "📊" },
    { name: "Practice", target: "/practice", emblem: "💡" },
    { name: "Question Bank", target: "/question-bank", emblem: "📖" },
    { name: "Progress Analytics", target: "/progress", emblem: "📈" },
  ];

  const coreSidebarPanel = (
    <div className="flex flex-col h-full bg-[#FAF9F5] border-r border-[#EFECE6] p-4 relative">
      {/* Brand Section Header */}
      <div className="h-16 flex items-center px-2 border-b border-[#EFECE6] shrink-0">
        <div className="flex items-center space-x-2.5">
          <div className="w-8 h-8 bg-[#2E6B3D] text-white flex items-center justify-center font-mono font-700 rounded-lg text-[14px]">
            M
          </div>
          <span className="font-mono text-[12px] font-700 tracking-widest text-[#1C1A17] uppercase">
            MOCKMATE
          </span>
        </div>
      </div>

      {/* Main Navigation Row Selection Engine */}
      <nav className="flex-1 py-6 space-y-1 overflow-y-auto">
        <span className="block font-mono text-[9px] tracking-widest text-[#9C9487] uppercase font-600 px-3 mb-2">
          Main Menu
        </span>
        {menuLinks.map((route) => {
          const isSelected = location.pathname === route.target;
          return (
            <Link
              key={route.name}
              to={route.target}
              onClick={() => onClose && onClose()}
              className={`flex items-center space-x-3 px-3 h-11 rounded-lg text-[13px] font-sans font-500 transition-all ${
                isSelected
                  ? "bg-[#2E6B3D]/10 text-[#2E6B3D] font-600 shadow-3xs"
                  : "text-[#5C574F] hover:bg-[#EFECE6]/60 hover:text-[#1C1A17]"
              }`}
            >
              <span className="text-[15px] shrink-0">{route.emblem}</span>
              <span className="truncate">{route.name}</span>
            </Link>
          );
        })}
      </nav>

      {/* Bottom Profile Anchor Area: Fixed securely to the bottom corner */}
      <div className="border-t border-[#EFECE6] pt-4 pb-2 mt-auto shrink-0">
        <div
          onClick={() => {
            if (onTriggerEdit) onTriggerEdit();
            if (onClose) onClose();
          }}
          className="flex items-center space-x-3 p-2 rounded-xl border border-transparent hover:border-[#E8E4DC] hover:bg-white cursor-pointer transition-all min-w-0 text-left"
          title="Click to edit profile parameter configurations"
        >
          <div className="w-10 h-10 shrink-0 bg-[#2E6B3D] text-white flex items-center justify-center rounded-xl font-serif font-600 text-[15px] shadow-sm shadow-[#2E6B3D]/20">
            {userProfile?.name ? userProfile.name.charAt(0).toUpperCase() : "D"}
          </div>
          <div className="min-w-0 flex-1">
            <h4 className="font-sans font-600 text-[13px] text-[#1C1A17] truncate leading-tight">
              {userProfile?.name || "Developer Profile"}
            </h4>
            <p className="font-sans text-[11px] text-[#706B63] truncate mt-0.5 font-400">
              {userProfile?.track || "Tap to configure tracking Focus"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Perspective Fixed Static Side Menu Navigation */}
      <aside className="hidden lg:block w-64 h-screen shrink-0 sticky top-0 z-30">
        {coreSidebarPanel}
      </aside>

      {/* Mobile Backdrop Overlay Wrapper */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden animate-in fade-in duration-150">
          {/* Grayed-out backing surface blur masks */}
          <div
            className="fixed inset-0 bg-[#1C1A17]/30 backdrop-blur-xs"
            onClick={onClose}
          />

          <aside className="relative w-64 max-w-[260px] h-full bg-[#FAF9F5] animate-in slide-in-from-left duration-200 ease-out shadow-2xl flex flex-col">
            {coreSidebarPanel}
          </aside>
        </div>
      )}
    </>
  );
}
