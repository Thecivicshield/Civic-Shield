import React from "react";
import { Scale, FolderLock, Shield, Compass, MessageSquare, BookOpen, Layers } from "lucide-react";
import { playSynthSound } from "./JusticeShieldSection";

interface MobileQuickDeckProps {
  onOpenBook: (volume: "rights" | "goals" | "mission") => void;
  onNavigateToSection: (tab: "study" | "vault" | "dispatch", section: string) => void;
  onOpenChat: () => void;
}

export default function MobileQuickDeck({
  onOpenBook,
  onNavigateToSection,
  onOpenChat
}: MobileQuickDeckProps) {
  const triggerSound = () => {
    try {
      playSynthSound("click");
    } catch (e) {}
  };

  const scrollToElement = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const top = el.getBoundingClientRect().top + window.pageYOffset - 72;
      window.scrollTo({ top: Math.max(0, top), behavior: "smooth" });
    }
  };

  return (
    <div className="md:hidden w-full px-3 py-2.5 border-y border-[#d4af37]/25 bg-gradient-to-r from-[#000d26] via-[#001740] to-[#000d26] select-none">
      <div className="flex items-center justify-between mb-2">
        <span className="font-mono text-[9px] uppercase tracking-widest text-[#ffd754] font-bold flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          Mobile Quick Command Deck
        </span>
        <span className="text-[9px] font-mono text-gray-400">Swipe horizontal →</span>
      </div>

      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        {/* Jump to Introduction & Books */}
        <button
          type="button"
          onClick={() => {
            triggerSound();
            scrollToElement("introduction");
          }}
          className="shrink-0 flex items-center gap-1.5 px-3.5 py-2.5 rounded-lg bg-[#001f54] border border-[#d4af37] text-[#ffd754] text-xs font-bold tracking-wide active:scale-95 transition-transform min-h-[44px] cursor-pointer shadow-sm"
        >
          <BookOpen className="w-4 h-4 text-[#ffd754]" />
          <span>Introduction & Books</span>
        </button>

        {/* Study Curriculum */}
        <button
          type="button"
          onClick={() => {
            triggerSound();
            onNavigateToSection("study", "study-curriculum");
          }}
          className="shrink-0 flex items-center gap-1.5 px-3.5 py-2.5 rounded-lg bg-[#001f54] border border-[#d4af37] text-[#ffd754] text-xs font-bold tracking-wide active:scale-95 transition-transform min-h-[44px] cursor-pointer shadow-sm"
        >
          <Scale className="w-4 h-4 text-[#ffd754]" />
          <span>Study Rights & Rules</span>
        </button>

        {/* Evidence Vault */}
        <button
          type="button"
          onClick={() => {
            triggerSound();
            onNavigateToSection("vault", "evidence");
          }}
          className="shrink-0 flex items-center gap-1.5 px-3.5 py-2.5 rounded-lg bg-[#001f54]/80 border border-[#d4af37]/35 text-white text-xs font-semibold tracking-wide active:scale-95 transition-transform min-h-[44px] cursor-pointer"
        >
          <FolderLock className="w-4 h-4 text-[#d4af37]" />
          <span>Evidence Vault</span>
        </button>

        {/* Scenario Shield */}
        <button
          type="button"
          onClick={() => {
            triggerSound();
            onNavigateToSection("vault", "justice-shield");
          }}
          className="shrink-0 flex items-center gap-1.5 px-3.5 py-2.5 rounded-lg bg-[#001f54]/80 border border-[#d4af37]/35 text-white text-xs font-semibold tracking-wide active:scale-95 transition-transform min-h-[44px] cursor-pointer"
        >
          <Shield className="w-4 h-4 text-[#d4af37]" />
          <span>Scenario Simulator</span>
        </button>

        {/* Action Roadmap */}
        <button
          type="button"
          onClick={() => {
            triggerSound();
            onNavigateToSection("dispatch", "timeline");
          }}
          className="shrink-0 flex items-center gap-1.5 px-3.5 py-2.5 rounded-lg bg-[#001f54]/80 border border-[#d4af37]/35 text-white text-xs font-semibold tracking-wide active:scale-95 transition-transform min-h-[44px] cursor-pointer"
        >
          <Compass className="w-4 h-4 text-[#d4af37]" />
          <span>Roadmap</span>
        </button>

        {/* Ask AI */}
        <button
          type="button"
          onClick={() => {
            triggerSound();
            onOpenChat();
          }}
          className="shrink-0 flex items-center gap-1.5 px-3.5 py-2.5 rounded-lg bg-emerald-500/15 border border-emerald-500/50 text-emerald-300 text-xs font-bold tracking-wide active:scale-95 transition-transform min-h-[44px] cursor-pointer"
        >
          <MessageSquare className="w-4 h-4 text-emerald-400" />
          <span>Ask Legal AI</span>
        </button>
      </div>
    </div>
  );
}
