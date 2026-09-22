import React from "react";
import { Columns, Eye, Layers } from "lucide-react";
import { playSynthSound } from "./JusticeShieldSection";

interface SectionOption {
  id: string;
  label: string;
  icon?: string;
}

interface MobileSectionSwitcherProps {
  activeTab: "study" | "vault" | "dispatch";
  activeSection: string;
  onSelectSection: (sectionId: string) => void;
  viewMode: "focused" | "all";
  onToggleViewMode: (mode: "focused" | "all") => void;
}

export default function MobileSectionSwitcher({
  activeTab,
  activeSection,
  onSelectSection,
  viewMode,
  onToggleViewMode
}: MobileSectionSwitcherProps) {
  const getSectionOptions = (): SectionOption[] => {
    switch (activeTab) {
      case "study":
        return [
          { id: "pillars", label: "Foundations & Pillars", icon: "🏛️" },
          { id: "constitutional-network", label: "Global Network", icon: "🌐" }
        ];
      case "vault":
        return [
          { id: "evidence", label: "Evidence Files", icon: "📂" },
          { id: "justice-shield", label: "Scenario Shield", icon: "🛡️" },
          { id: "impact-metrics", label: "Impact Ledger", icon: "📊" }
        ];
      case "dispatch":
        return [
          { id: "blog", label: "Dispatches", icon: "📰" },
          { id: "timeline", label: "Roadmap", icon: "🗺️" },
          { id: "social-feed", label: "Live Feed", icon: "📡" },
          { id: "newsletter", label: "Newsletter", icon: "✉️" }
        ];
    }
  };

  const options = getSectionOptions();

  const handleSelect = (id: string) => {
    try {
      playSynthSound("click");
    } catch (e) {}
    onToggleViewMode("focused");
    onSelectSection(id);
    const el = document.getElementById("cabinet-content-anchor") || document.getElementById("cabinet-stage");
    if (el) {
      const top = el.getBoundingClientRect().top + window.pageYOffset - 80;
      window.scrollTo({ top: Math.max(0, top), behavior: "smooth" });
    }
  };

  const handleAll = () => {
    try {
      playSynthSound("click");
    } catch (e) {}
    onToggleViewMode("all");
    onSelectSection("all");
  };

  return (
    <div className="md:hidden w-full my-4 px-2 select-none">
      {/* Header bar with Mode Toggle */}
      <div className="flex items-center justify-between gap-2 px-1 mb-2.5">
        <div className="flex items-center gap-1.5 text-[9px] font-mono text-[#d4af37] uppercase tracking-wider font-semibold">
          <Columns className="w-3 h-3 text-[#d4af37]" />
          <span>Mobile Drawer View:</span>
          <span className="text-[#ffd754] font-bold">
            {viewMode === "focused" ? "Single Section (No Long Scroll)" : "Continuous (All Sections)"}
          </span>
        </div>

        <button
          type="button"
          onClick={() => {
            if (viewMode === "focused") {
              handleAll();
            } else {
              handleSelect(options[0]?.id || "pillars");
            }
          }}
          className="text-[9px] font-mono px-2 py-0.5 rounded border border-[#d4af37]/40 bg-[#001a4d] text-gray-300 hover:text-white cursor-pointer transition-colors"
        >
          {viewMode === "focused" ? "Show All ↓" : "Focus Mode ↑"}
        </button>
      </div>

      {/* Horizontal Scrollable Sub-Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
        {options.map((opt) => {
          const isSelected = viewMode === "focused" && activeSection === opt.id;
          return (
            <button
              key={opt.id}
              type="button"
              onClick={() => handleSelect(opt.id)}
              className={`shrink-0 flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold tracking-wide transition-all border cursor-pointer min-h-[40px] ${
                isSelected
                  ? "bg-gradient-to-r from-[#d4af37] via-[#ffd754] to-[#d4af37] text-[#001233] border-[#fff3b0] font-bold shadow-[0_0_12px_rgba(255,215,84,0.4)]"
                  : "bg-[#030914]/90 text-gray-300 border-[#d4af37]/25 hover:border-[#d4af37]/60 hover:text-white"
              }`}
            >
              <span>{opt.icon}</span>
              <span>{opt.label}</span>
              {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-[#001233] animate-pulse" />}
            </button>
          );
        })}

        {/* View All Option */}
        <button
          type="button"
          onClick={handleAll}
          className={`shrink-0 flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold tracking-wide transition-all border cursor-pointer min-h-[40px] ${
            viewMode === "all"
              ? "bg-[#d4af37]/25 text-[#ffd754] border-[#ffd754] font-bold shadow-[0_0_10px_rgba(212,175,55,0.3)]"
              : "bg-[#030914]/80 text-gray-400 border-slate-800 hover:border-slate-700 hover:text-gray-200"
          }`}
        >
          <Layers className="w-3.5 h-3.5" />
          <span>All Sections</span>
        </button>
      </div>
    </div>
  );
}
