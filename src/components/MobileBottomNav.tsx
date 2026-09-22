import React from "react";
import { BookOpen, FolderLock, Shield, Newspaper, MessageSquare } from "lucide-react";
import { playSynthSound } from "./JusticeShieldSection";

interface MobileBottomNavProps {
  activeTab: "study" | "vault" | "dispatch";
  activeSection: string;
  onNavigate: (tab: "study" | "vault" | "dispatch", section?: string) => void;
  onOpenChat: () => void;
}

export default function MobileBottomNav({
  activeTab,
  activeSection,
  onNavigate,
  onOpenChat
}: MobileBottomNavProps) {
  const handleNav = (tab: "study" | "vault" | "dispatch", section?: string) => {
    try {
      playSynthSound("click");
    } catch (e) {}
    onNavigate(tab, section);
  };

  const isStudyActive = activeTab === "study";
  const isVaultActive = activeTab === "vault" && (activeSection === "evidence" || activeSection === "all");
  const isShieldActive = activeTab === "vault" && activeSection === "justice-shield";
  const isDispatchActive = activeTab === "dispatch";

  return (
    <nav
      id="mobile-bottom-dock"
      aria-label="Mobile Navigation"
      className="md:hidden fixed bottom-0 left-0 right-0 z-[400] bg-[#000d26]/95 backdrop-blur-xl border-t border-[#d4af37]/35 shadow-[0_-10px_30px_rgba(0,0,0,0.85)] px-2 pt-1 pb-[max(0.5rem,env(safe-area-inset-bottom))] flex items-center justify-around select-none"
    >
      {/* 1. Study Tab */}
      <button
        type="button"
        onClick={() => handleNav("study", "pillars")}
        className={`flex flex-col items-center justify-center py-1 px-2 rounded-lg transition-all min-h-[44px] min-w-[56px] relative cursor-pointer ${
          isStudyActive
            ? "text-[#ffd754]"
            : "text-gray-400 hover:text-gray-200"
        }`}
      >
        {isStudyActive && (
          <span className="absolute -top-1 w-8 h-1 rounded-full bg-[#d4af37] shadow-[0_0_8px_#ffd754]" />
        )}
        <BookOpen className={`w-4 h-4 mb-0.5 ${isStudyActive ? "text-[#ffd754]" : "text-gray-400"}`} />
        <span className="text-[10px] font-mono font-bold tracking-tight uppercase">Study</span>
      </button>

      {/* 2. Vault Tab */}
      <button
        type="button"
        onClick={() => handleNav("vault", "evidence")}
        className={`flex flex-col items-center justify-center py-1 px-2 rounded-lg transition-all min-h-[44px] min-w-[56px] relative cursor-pointer ${
          isVaultActive
            ? "text-[#ffd754]"
            : "text-gray-400 hover:text-gray-200"
        }`}
      >
        {isVaultActive && (
          <span className="absolute -top-1 w-8 h-1 rounded-full bg-[#d4af37] shadow-[0_0_8px_#ffd754]" />
        )}
        <FolderLock className={`w-4 h-4 mb-0.5 ${isVaultActive ? "text-[#ffd754]" : "text-gray-400"}`} />
        <span className="text-[10px] font-mono font-bold tracking-tight uppercase">Vault</span>
      </button>

      {/* 3. Scenario Shield Tab */}
      <button
        type="button"
        onClick={() => handleNav("vault", "justice-shield")}
        className={`flex flex-col items-center justify-center py-1 px-2 rounded-lg transition-all min-h-[44px] min-w-[56px] relative cursor-pointer ${
          isShieldActive
            ? "text-[#ffd754]"
            : "text-gray-400 hover:text-gray-200"
        }`}
      >
        {isShieldActive && (
          <span className="absolute -top-1 w-8 h-1 rounded-full bg-[#d4af37] shadow-[0_0_8px_#ffd754]" />
        )}
        <Shield className={`w-4 h-4 mb-0.5 ${isShieldActive ? "text-[#ffd754]" : "text-gray-400"}`} />
        <span className="text-[10px] font-mono font-bold tracking-tight uppercase">Shield</span>
      </button>

      {/* 4. Dispatches Tab */}
      <button
        type="button"
        onClick={() => handleNav("dispatch", "blog")}
        className={`flex flex-col items-center justify-center py-1 px-2 rounded-lg transition-all min-h-[44px] min-w-[56px] relative cursor-pointer ${
          isDispatchActive
            ? "text-[#ffd754]"
            : "text-gray-400 hover:text-gray-200"
        }`}
      >
        {isDispatchActive && (
          <span className="absolute -top-1 w-8 h-1 rounded-full bg-[#d4af37] shadow-[0_0_8px_#ffd754]" />
        )}
        <Newspaper className={`w-4 h-4 mb-0.5 ${isDispatchActive ? "text-[#ffd754]" : "text-gray-400"}`} />
        <span className="text-[10px] font-mono font-bold tracking-tight uppercase">Intel</span>
      </button>

      {/* 5. AI Chat Trigger Tab */}
      <button
        type="button"
        onClick={() => {
          try {
            playSynthSound("click");
          } catch (e) {}
          onOpenChat();
        }}
        className="flex flex-col items-center justify-center py-1 px-2 rounded-lg text-emerald-400 hover:text-emerald-300 transition-all min-h-[44px] min-w-[56px] relative cursor-pointer"
      >
        <div className="relative">
          <MessageSquare className="w-4 h-4 mb-0.5 text-emerald-400" />
          <span className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
        </div>
        <span className="text-[10px] font-mono font-bold tracking-tight uppercase text-emerald-400">Ask AI</span>
      </button>
    </nav>
  );
}
