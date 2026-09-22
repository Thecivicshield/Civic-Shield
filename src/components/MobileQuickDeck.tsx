import React from "react";
import { ShieldCheck, Target, FolderLock, Shield, Compass, MessageSquare } from "lucide-react";
import { playSynthSound } from "./JusticeShieldSection";

interface MobileQuickDeckProps {
  onOpenHandbook: () => void;
  onOpenGoals: () => void;
  onNavigateToSection: (tab: "study" | "vault" | "dispatch", section: string) => void;
  onOpenChat: () => void;
}

export default function MobileQuickDeck({
  onOpenHandbook,
  onOpenGoals,
  onNavigateToSection,
  onOpenChat
}: MobileQuickDeckProps) {
  const triggerSound = () => {
    try {
      playSynthSound("click");
    } catch (e) {}
  };

  return (
    <div className="md:hidden w-full px-3 py-3 border-y border-[#d4af37]/25 bg-gradient-to-r from-[#000d26] via-[#001740] to-[#000d26] select-none">
      <div className="flex items-center justify-between mb-2">
        <span className="font-mono text-[9px] uppercase tracking-widest text-[#ffd754] font-bold flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          Mobile Quick Access Hub
        </span>
        <span className="text-[9px] font-mono text-gray-400">Swipe →</span>
      </div>

      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        {/* Handbook of Rights */}
        <button
          type="button"
          onClick={() => {
            triggerSound();
            onOpenHandbook();
          }}
          className="shrink-0 flex items-center gap-1.5 px-3 py-2 rounded-lg bg-[#d4af37]/15 border border-[#d4af37]/50 text-[#ffd754] text-xs font-bold tracking-wide active:scale-95 transition-transform min-h-[40px] cursor-pointer"
        >
          <ShieldCheck className="w-3.5 h-3.5 text-[#ffd754]" />
          <span>Rights Handbook</span>
        </button>

        {/* Our Goals */}
        <button
          type="button"
          onClick={() => {
            triggerSound();
            onOpenGoals();
          }}
          className="shrink-0 flex items-center gap-1.5 px-3 py-2 rounded-lg bg-[#d4af37]/15 border border-[#d4af37]/50 text-[#ffd754] text-xs font-bold tracking-wide active:scale-95 transition-transform min-h-[40px] cursor-pointer"
        >
          <Target className="w-3.5 h-3.5 text-[#ffd754]" />
          <span>Our Goals</span>
        </button>

        {/* Evidence Vault */}
        <button
          type="button"
          onClick={() => {
            triggerSound();
            onNavigateToSection("vault", "evidence");
          }}
          className="shrink-0 flex items-center gap-1.5 px-3 py-2 rounded-lg bg-[#001f54]/80 border border-[#d4af37]/35 text-white text-xs font-semibold tracking-wide active:scale-95 transition-transform min-h-[40px] cursor-pointer"
        >
          <FolderLock className="w-3.5 h-3.5 text-[#d4af37]" />
          <span>Evidence Vault</span>
        </button>

        {/* Scenario Shield */}
        <button
          type="button"
          onClick={() => {
            triggerSound();
            onNavigateToSection("vault", "justice-shield");
          }}
          className="shrink-0 flex items-center gap-1.5 px-3 py-2 rounded-lg bg-[#001f54]/80 border border-[#d4af37]/35 text-white text-xs font-semibold tracking-wide active:scale-95 transition-transform min-h-[40px] cursor-pointer"
        >
          <Shield className="w-3.5 h-3.5 text-[#d4af37]" />
          <span>Scenario Simulator</span>
        </button>

        {/* Action Roadmap */}
        <button
          type="button"
          onClick={() => {
            triggerSound();
            onNavigateToSection("dispatch", "timeline");
          }}
          className="shrink-0 flex items-center gap-1.5 px-3 py-2 rounded-lg bg-[#001f54]/80 border border-[#d4af37]/35 text-white text-xs font-semibold tracking-wide active:scale-95 transition-transform min-h-[40px] cursor-pointer"
        >
          <Compass className="w-3.5 h-3.5 text-[#d4af37]" />
          <span>Roadmap</span>
        </button>

        {/* Ask AI */}
        <button
          type="button"
          onClick={() => {
            triggerSound();
            onOpenChat();
          }}
          className="shrink-0 flex items-center gap-1.5 px-3 py-2 rounded-lg bg-emerald-500/15 border border-emerald-500/50 text-emerald-300 text-xs font-bold tracking-wide active:scale-95 transition-transform min-h-[40px] cursor-pointer"
        >
          <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
          <span>Ask Legal AI</span>
        </button>
      </div>
    </div>
  );
}
