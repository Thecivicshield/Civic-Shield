import React from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Folder, 
  FolderOpen, 
  ChevronDown, 
  ChevronUp, 
  Minus, 
  Plus, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight, 
  Eye, 
  Layers,
  FileText
} from "lucide-react";
import { playSynthSound } from "./JusticeShieldSection";

export interface SectionItem {
  id: string;
  code: string;
  title: string;
  subtitle: string;
  badge: string;
  icon: React.ReactNode;
  content: React.ReactNode;
}

interface CabinetSectionAccordionProps {
  drawerTab: "study" | "vault" | "dispatch";
  activeSectionId: string | null;
  onSelectSection: (sectionId: string | null) => void;
  sections: SectionItem[];
}

export default function CabinetSectionAccordion({
  drawerTab,
  activeSectionId,
  onSelectSection,
  sections
}: CabinetSectionAccordionProps) {
  
  const handleToggle = (id: string) => {
    try {
      playSynthSound("click");
    } catch (e) {}

    if (activeSectionId === id) {
      // Toggle collapse if already open
      onSelectSection(null);
    } else {
      // Open only this section
      onSelectSection(id);
      // Smoothly adjust scroll position to the top of this dossier
      setTimeout(() => {
        const el = document.getElementById(`dossier-card-${id}`);
        if (el) {
          const top = el.getBoundingClientRect().top + window.pageYOffset - 90;
          window.scrollTo({ top: Math.max(0, top), behavior: "smooth" });
        }
      }, 50);
    }
  };

  const handleNextSection = (currentIndex: number) => {
    const nextIndex = (currentIndex + 1) % sections.length;
    const nextSection = sections[nextIndex];
    if (nextSection) {
      handleToggle(nextSection.id);
    }
  };

  return (
    <div className="w-full space-y-6">
      
      {/* 1. TOP QUICK SWITCHER TAB BAR (Single-Click Switcher) */}
      <div className="bg-[#000d20]/90 border border-[#d4af37]/30 rounded-xl p-2.5 sm:p-3 shadow-lg backdrop-blur-md">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 mb-2 border-b border-[#d4af37]/15">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#ffd754] animate-pulse" />
            <span className="font-mono text-[9px] sm:text-[10px] text-[#ffd754] uppercase tracking-wider font-bold">
              DRAWER COMPARTMENT DOSSIERS // ISOLATED FOCUS MODE
            </span>
          </div>
          <span className="text-[9px] font-mono text-gray-400">
            {activeSectionId 
              ? "Only 1 section expanded at a time to prevent long scrolling" 
              : "All dossiers collapsed — tap any file to unseal"}
          </span>
        </div>

        {/* Quick Tabs Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {sections.map((sec, idx) => {
            const isCurrent = activeSectionId === sec.id;
            return (
              <button
                key={`tab-${sec.id}`}
                type="button"
                onClick={() => handleToggle(sec.id)}
                className={`relative px-3 py-2 rounded-lg text-left transition-all border cursor-pointer select-none flex items-center justify-between gap-1.5 ${
                  isCurrent
                    ? "bg-gradient-to-r from-[#1b2b48] to-[#0f1d33] border-[#ffd754] shadow-[0_0_15px_rgba(255,215,84,0.3)] ring-1 ring-[#ffd754]/50"
                    : "bg-[#001433]/70 border-slate-800 text-gray-300 hover:border-[#d4af37]/40 hover:text-white hover:bg-[#001c47]"
                }`}
              >
                <div className="flex items-center gap-2 min-w-0">
                  <span className={`shrink-0 text-sm ${isCurrent ? "text-[#ffd754]" : "text-gray-400"}`}>
                    {sec.icon}
                  </span>
                  <div className="min-w-0">
                    <p className={`text-xs font-serif font-bold truncate leading-tight ${
                      isCurrent ? "text-[#ffd754]" : "text-gray-200"
                    }`}>
                      {sec.title.split(":")[0]}
                    </p>
                    <span className="text-[8px] font-mono text-gray-400 tracking-wider uppercase block">
                      {sec.code}
                    </span>
                  </div>
                </div>

                <span className={`w-2 h-2 rounded-full shrink-0 ${
                  isCurrent ? "bg-[#ffd754] shadow-[0_0_6px_#ffd754]" : "bg-slate-700"
                }`} />
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. COLLAPSIBLE ACCORDION DOSSIER LIST */}
      <div className="space-y-5">
        {sections.map((sec, index) => {
          const isExpanded = activeSectionId === sec.id;

          return (
            <div
              key={`accordion-item-${sec.id}`}
              id={`dossier-card-${sec.id}`}
              className={`rounded-2xl transition-all duration-300 border overflow-hidden scroll-mt-24 ${
                isExpanded
                  ? "bg-gradient-to-b from-[#001330] via-[#000f24] to-[#000917] border-[#d4af37] shadow-[0_15px_50px_rgba(0,0,0,0.8),0_0_25px_rgba(212,175,55,0.25)]"
                  : "bg-[#001026]/80 border-slate-800 hover:border-[#d4af37]/50 hover:bg-[#001433] shadow-md"
              }`}
            >
              {/* ACCORDION DOSSIER HEADER BAR */}
              <button
                type="button"
                onClick={() => handleToggle(sec.id)}
                className={`w-full p-4 sm:p-5 flex items-center justify-between gap-3 text-left transition-all cursor-pointer select-none relative overflow-hidden group ${
                  isExpanded 
                    ? "bg-gradient-to-r from-[#00183b] via-[#002459] to-[#00183b] border-b border-[#d4af37]/35 shadow-[inset_0_1px_0_rgba(255,215,84,0.2)]" 
                    : "hover:bg-[#00163a]"
                }`}
              >
                {/* Metallic light sweep animation on hover */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.04] to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 pointer-events-none" />

                <div className="flex items-start sm:items-center gap-3 sm:gap-4 min-w-0 relative z-10">
                  {/* Animated Icon & File Number Pill */}
                  <motion.div 
                    animate={isExpanded ? { scale: [1, 1.05, 1], rotate: [0, 2, -2, 0] } : {}}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center shrink-0 border transition-all ${
                      isExpanded
                        ? "bg-gradient-to-br from-[#ffd754] via-[#d4af37] to-[#b89423] text-[#001233] border-[#fff3b0] shadow-[0_0_20px_rgba(255,215,84,0.35)]"
                        : "bg-[#000d20] text-[#d4af37] border-[#d4af37]/30 group-hover:border-[#ffd754] group-hover:text-[#ffd754]"
                    }`}
                  >
                    {sec.icon}
                  </motion.div>

                  {/* Animated Title & Text Column */}
                  <div className="min-w-0 space-y-0.5 sm:space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className={`font-mono text-[9px] sm:text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded transition-all ${
                        isExpanded 
                          ? "bg-[#ffd754] text-[#001233] shadow-[0_0_8px_rgba(255,215,84,0.5)]" 
                          : "bg-[#ffd754]/10 text-[#ffd754] border border-[#ffd754]/30"
                      }`}>
                        {sec.code}
                      </span>
                      <span className="text-[10px] font-mono text-gray-400 hidden sm:inline">
                        {sec.badge}
                      </span>
                    </div>

                    {/* Animated Title with Creative Metallic Gradient Glow */}
                    <h3 className={`font-serif font-bold text-base sm:text-xl leading-snug tracking-tight transition-all duration-300 ${
                      isExpanded 
                        ? "bg-gradient-to-r from-white via-[#ffd754] to-amber-200 bg-clip-text text-transparent drop-shadow-[0_2px_10px_rgba(255,215,84,0.3)]" 
                        : "text-gray-200 group-hover:text-[#ffd754]"
                    }`}>
                      {sec.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-gray-400 font-light truncate max-w-2xl hidden sm:block">
                      {sec.subtitle}
                    </p>
                  </div>
                </div>

                {/* Right Action / Toggle Indicator */}
                <div className="flex items-center gap-2 sm:gap-3 shrink-0 relative z-10">
                  <div className={`hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-mono uppercase tracking-wider font-bold border transition-all ${
                    isExpanded
                      ? "bg-[#d4af37]/25 border-[#ffd754] text-[#ffd754] shadow-[0_0_12px_rgba(255,215,84,0.25)]"
                      : "bg-black/40 border-slate-800 text-gray-400 group-hover:border-[#d4af37]/40 group-hover:text-gray-300"
                  }`}>
                    {isExpanded ? (
                      <>
                        <span className="relative flex h-2 w-2">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#ffd754] opacity-75" />
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-[#ffd754]" />
                        </span>
                        <span>UNSEALED & ACTIVE</span>
                      </>
                    ) : (
                      <>
                        <span>CLICK TO OPEN</span>
                      </>
                    )}
                  </div>

                  <div className={`p-2 rounded-lg border transition-all duration-300 ${
                    isExpanded
                      ? "bg-[#ffd754] text-[#001233] border-[#fff3b0] shadow-md rotate-0 scale-105"
                      : "bg-[#000d20] text-gray-300 border-slate-700 group-hover:border-[#d4af37]"
                  }`}>
                    {isExpanded ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                  </div>
                </div>
              </button>

              {/* COLLAPSIBLE CONTENT BODY */}
              <AnimatePresence initial={false}>
                {isExpanded && (
                  <motion.div
                    key={`content-${sec.id}`}
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    className="overflow-hidden"
                  >
                    {/* Section Body */}
                    <div className="p-3 sm:p-6 lg:p-8 border-t border-[#d4af37]/15">
                      {sec.content}
                    </div>

                    {/* Compact Section Footer Bar: Collapse or Jump to Next */}
                    <div className="px-4 py-3 bg-[#000b1a] border-t border-[#d4af37]/20 flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
                      <button
                        type="button"
                        onClick={() => handleToggle(sec.id)}
                        className="flex items-center gap-1.5 text-gray-400 hover:text-[#ffd754] transition-colors cursor-pointer py-1 px-2.5 rounded hover:bg-white/5"
                      >
                        <ChevronUp className="w-4 h-4" />
                        <span>Collapse Section (Minimize Scrolling)</span>
                      </button>

                      {sections.length > 1 && (
                        <button
                          type="button"
                          onClick={() => handleNextSection(index)}
                          className="flex items-center gap-1.5 text-[#ffd754] hover:text-white transition-colors cursor-pointer py-1 px-3 rounded bg-[#00183b] border border-[#d4af37]/30 hover:border-[#d4af37]"
                        >
                          <span>Next Section: {sections[(index + 1) % sections.length]?.title.split(":")[0]}</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
}
