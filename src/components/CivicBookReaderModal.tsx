import React, { useState, useEffect } from "react";
import { 
  X, 
  ChevronLeft, 
  ChevronRight, 
  BookOpen, 
  Scale, 
  Target, 
  Flame, 
  Copy, 
  Check, 
  Bookmark, 
  Sparkles, 
  Volume2, 
  VolumeX, 
  Type, 
  ShieldCheck, 
  FileText,
  CornerDownRight
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { CIVIC_BOOKS, CivicBook, BookChapter } from "../data/civicBooksData";
import { playSynthSound } from "./JusticeShieldSection";

interface CivicBookReaderModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialVolume?: "rights" | "goals" | "mission";
  initialChapterIndex?: number;
}

export default function CivicBookReaderModal({
  isOpen,
  onClose,
  initialVolume = "rights",
  initialChapterIndex = 0
}: CivicBookReaderModalProps) {
  const [activeVolumeKey, setActiveVolumeKey] = useState<"rights" | "goals" | "mission">(initialVolume);
  const [chapterIndex, setChapterIndex] = useState(initialChapterIndex);
  const [isCopied, setIsCopied] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [fontSize, setFontSize] = useState<"sm" | "md" | "lg">("md");
  const [mobileTab, setMobileTab] = useState<"read" | "toc">("read");

  // Keep volume and chapter in sync when opened with specific initial props
  useEffect(() => {
    if (isOpen) {
      setActiveVolumeKey(initialVolume);
      setChapterIndex(Math.max(0, initialChapterIndex || 0));
      setMobileTab("read");
    }
  }, [isOpen, initialVolume, initialChapterIndex]);

  const activeBook: CivicBook = CIVIC_BOOKS[activeVolumeKey];
  const chapters = activeBook.chapters;
  const currentChapter: BookChapter = chapters[chapterIndex] || chapters[0];

  // Soft page rustle sound
  const playPageTurnSound = () => {
    if (!soundEnabled) return;
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(200, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(70, ctx.currentTime + 0.12);
      gain.gain.setValueAtTime(0.06, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.12);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.12);
    } catch (e) {}
  };

  const handleNextChapter = () => {
    if (chapterIndex < chapters.length - 1) {
      playPageTurnSound();
      setChapterIndex(prev => prev + 1);
    }
  };

  const handlePrevChapter = () => {
    if (chapterIndex > 0) {
      playPageTurnSound();
      setChapterIndex(prev => prev - 1);
    }
  };

  const handleSwitchVolume = (vol: "rights" | "goals" | "mission") => {
    playPageTurnSound();
    setActiveVolumeKey(vol);
    setChapterIndex(0);
  };

  // Keyboard navigation shortcuts
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "ArrowRight") {
        handleNextChapter();
      } else if (e.key === "ArrowLeft") {
        handlePrevChapter();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, chapterIndex, chapters.length]);

  const handleCopyChapter = () => {
    try {
      const textToCopy = `[${activeBook.displayTitle.toUpperCase()}]\nChapter ${currentChapter.number}: ${currentChapter.title}\nStatute Anchor: ${currentChapter.statuteRef}\n\nSummary:\n${currentChapter.summary}\n\nCore Points:\n` +
        currentChapter.corePoints.map(p => `• ${p.heading}: ${p.text}${p.script ? `\n  Exact Words: "${p.script}"` : ""}`).join("\n\n") +
        `\n\nTakeaway: ${currentChapter.takeaway}\n\n— Civic Shield Public Legal Literacy Archive`;
      
      navigator.clipboard.writeText(textToCopy);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (e) {
      console.warn("Could not copy:", e);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[1200] flex items-center justify-center p-2 sm:p-4 md:p-6 bg-black/85 backdrop-blur-md overflow-y-auto">
        
        {/* Background Backdrop click */}
        <div 
          className="fixed inset-0"
          onClick={onClose}
        />

        {/* Modal Window Frame */}
        <motion.div
          initial={{ scale: 0.92, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.92, opacity: 0, y: 20 }}
          transition={{ type: "spring", stiffness: 300, damping: 28 }}
          className="relative z-10 w-full max-w-5xl bg-[#001233] border-2 border-[#d4af37] rounded-xl shadow-[0_25px_80px_rgba(0,0,0,0.9),0_0_50px_rgba(212,175,55,0.3)] overflow-hidden flex flex-col max-h-[92vh] my-auto"
        >
          {/* TOP BAR: Explicit Book Title, Volume Tabs, and Controls */}
          <div className="bg-[#000d26] border-b border-[#d4af37]/30 px-4 sm:px-6 py-3.5 flex flex-col gap-3">
            
            {/* Row 1: Explicit Title Header & Close Button */}
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-10 h-10 rounded-lg bg-[#d4af37]/20 border border-[#d4af37]/50 flex items-center justify-center shrink-0 text-[#ffd754]">
                  {activeVolumeKey === "rights" && <Scale className="w-5 h-5" />}
                  {activeVolumeKey === "goals" && <Target className="w-5 h-5 text-amber-400" />}
                  {activeVolumeKey === "mission" && <Flame className="w-5 h-5 text-emerald-400" />}
                </div>

                <div className="min-w-0">
                  <span className="text-[9.5px] font-mono uppercase tracking-[0.25em] text-[#ffd754] font-bold block">
                    {activeBook.volumeNumber} // THE CIVIC SHIELD ARCHIVE
                  </span>
                  {/* Explicit Non-Ambiguous Book Title */}
                  <h2 className="text-lg sm:text-xl font-serif font-bold text-white truncate leading-tight">
                    {activeBook.displayTitle}
                  </h2>
                </div>
              </div>

              {/* Utility Tools & Close */}
              <div className="flex items-center gap-2 shrink-0">
                {/* Audio Rustle Toggle */}
                <button
                  type="button"
                  onClick={() => setSoundEnabled(!soundEnabled)}
                  className="p-2 rounded-lg bg-black/40 border border-[#d4af37]/30 text-gray-300 hover:text-[#ffd754] transition-colors cursor-pointer"
                  title={soundEnabled ? "Mute Page Sounds" : "Enable Page Sounds"}
                >
                  {soundEnabled ? <Volume2 className="w-4 h-4 text-[#ffd754]" /> : <VolumeX className="w-4 h-4 text-gray-500" />}
                </button>

                {/* Copy Chapter */}
                <button
                  type="button"
                  onClick={handleCopyChapter}
                  className="px-3 py-1.5 rounded-lg bg-black/40 border border-[#d4af37]/40 text-[#ebdcc2] hover:text-white hover:border-[#ffd754] text-xs font-mono flex items-center gap-1.5 cursor-pointer transition-all shadow-sm"
                  title="Copy Chapter Notes"
                >
                  {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-[#ffd754]" />}
                  <span className="hidden sm:inline">{isCopied ? "Copied" : "Copy"}</span>
                </button>

                {/* Close Button */}
                <button
                  type="button"
                  onClick={onClose}
                  className="px-3 py-1.5 rounded-lg bg-[#d4af37]/20 border border-[#d4af37]/60 text-[#ffd754] hover:bg-[#d4af37] hover:text-[#001a4d] text-xs font-mono uppercase tracking-wider font-bold transition-all cursor-pointer flex items-center gap-1"
                >
                  <X className="w-4 h-4" />
                  <span className="hidden sm:inline">Close Tome</span>
                </button>
              </div>
            </div>

            {/* Row 2: 3-Volume Quick Switcher Tabs */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none border-t border-[#d4af37]/15 pt-2">
              <span className="text-[9px] font-mono uppercase text-gray-400 tracking-wider shrink-0 mr-1 hidden sm:inline">
                SWITCH VOLUME:
              </span>

              <button
                type="button"
                onClick={() => handleSwitchVolume("rights")}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-semibold flex items-center gap-1.5 transition-all shrink-0 cursor-pointer border ${
                  activeVolumeKey === "rights"
                    ? "bg-[#d4af37] text-[#001a4d] border-[#ffd754] shadow-[0_0_12px_rgba(212,175,55,0.4)]"
                    : "bg-black/40 text-gray-300 border-white/10 hover:border-[#d4af37]/40 hover:text-white"
                }`}
              >
                <Scale className="w-3.5 h-3.5" />
                <span>1. Handbook of Rights</span>
              </button>

              <button
                type="button"
                onClick={() => handleSwitchVolume("goals")}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-semibold flex items-center gap-1.5 transition-all shrink-0 cursor-pointer border ${
                  activeVolumeKey === "goals"
                    ? "bg-[#d4af37] text-[#001a4d] border-[#ffd754] shadow-[0_0_12px_rgba(212,175,55,0.4)]"
                    : "bg-black/40 text-gray-300 border-white/10 hover:border-[#d4af37]/40 hover:text-white"
                }`}
              >
                <Target className="w-3.5 h-3.5" />
                <span>2. Our Strategic Goals</span>
              </button>

              <button
                type="button"
                onClick={() => handleSwitchVolume("mission")}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-semibold flex items-center gap-1.5 transition-all shrink-0 cursor-pointer border ${
                  activeVolumeKey === "mission"
                    ? "bg-[#d4af37] text-[#001a4d] border-[#ffd754] shadow-[0_0_12px_rgba(212,175,55,0.4)]"
                    : "bg-black/40 text-gray-300 border-white/10 hover:border-[#d4af37]/40 hover:text-white"
                }`}
              >
                <Flame className="w-3.5 h-3.5" />
                <span>3. Mission & Genesis</span>
              </button>
            </div>

            {/* Mobile Sub-Navigation Bar: Segmented Switch between Reading Pane and Table of Contents */}
            <div className="md:hidden flex items-center justify-between pt-1 border-t border-[#d4af37]/15 text-xs">
              <div className="flex items-center gap-2 w-full">
                <button
                  type="button"
                  onClick={() => setMobileTab("read")}
                  className={`flex-1 py-2 rounded-md font-mono text-[11px] font-bold uppercase tracking-wider text-center transition-colors min-h-[44px] flex items-center justify-center gap-1.5 cursor-pointer ${
                    mobileTab === "read"
                      ? "bg-[#d4af37] text-[#001233] shadow-sm"
                      : "bg-white/5 text-gray-400 hover:text-white border border-white/10"
                  }`}
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>Read Chapter {currentChapter.number}</span>
                </button>
                <button
                  type="button"
                  onClick={() => setMobileTab("toc")}
                  className={`flex-1 py-2 rounded-md font-mono text-[11px] font-bold uppercase tracking-wider text-center transition-colors min-h-[44px] flex items-center justify-center gap-1.5 cursor-pointer ${
                    mobileTab === "toc"
                      ? "bg-[#d4af37] text-[#001233] shadow-sm"
                      : "bg-white/5 text-gray-400 hover:text-white border border-white/10"
                  }`}
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>Contents ({chapters.length})</span>
                </button>
              </div>
            </div>

          </div>

          {/* MAIN READER BODY (Responsive 2-Column Grid on desktop, Tab-switched on mobile) */}
          <div className="flex-1 overflow-hidden grid grid-cols-1 md:grid-cols-12 divide-y md:divide-y-0 md:divide-x divide-[#d4af37]/25 min-h-0">
            
            {/* Left Sidebar: Table of Contents & Chapter Selector (4 cols on desktop) */}
            <div className={`md:col-span-4 bg-[#000d26]/80 p-4 sm:p-5 overflow-y-auto space-y-2 ${mobileTab === "toc" ? "block h-full" : "hidden md:block h-full"}`}>
              <div className="flex items-center justify-between pb-2 border-b border-white/10 mb-3">
                <span className="text-[9.5px] font-mono text-[#ffd754] uppercase tracking-[0.2em] font-bold">
                  TABLE OF CONTENTS:
                </span>
                <span className="text-[9.5px] font-mono text-gray-400">
                  {chapters.length} CHAPTERS
                </span>
              </div>

              {chapters.map((ch, idx) => {
                const isSelected = idx === chapterIndex;
                return (
                  <button
                    key={ch.id}
                    onClick={() => {
                      playPageTurnSound();
                      setChapterIndex(idx);
                      setMobileTab("read");
                    }}
                    className={`w-full text-left p-3 rounded-lg transition-all flex items-center justify-between group cursor-pointer border min-h-[48px] ${
                      isSelected
                        ? "bg-gradient-to-r from-[#d4af37]/20 to-[#001a4d] border-[#ffd754] text-white shadow-md ring-1 ring-[#ffd754]/30"
                        : "bg-black/30 border-white/5 text-gray-300 hover:border-[#d4af37]/35 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <span className={`w-6 h-6 rounded flex items-center justify-center font-mono text-[11px] font-bold shrink-0 ${
                        isSelected ? "bg-[#ffd754] text-[#001a4d]" : "bg-black/60 text-[#ffd754] border border-[#d4af37]/30"
                      }`}>
                        {ch.number}
                      </span>
                      <div className="min-w-0">
                        <p className={`text-xs font-serif font-bold truncate ${isSelected ? "text-[#ffd754]" : "text-gray-200"}`}>
                          {ch.title}
                        </p>
                        <p className="text-[9px] font-mono text-gray-400 truncate">
                          {ch.badge}
                        </p>
                      </div>
                    </div>

                    <ChevronRight className={`w-4 h-4 shrink-0 transition-transform ${isSelected ? "text-[#ffd754] translate-x-0.5" : "text-gray-600"}`} />
                  </button>
                );
              })}
            </div>

            {/* Right Reading Surface: High-Contrast Parchment Pane (8 cols on desktop) */}
            <div className={`md:col-span-8 p-5 sm:p-8 overflow-y-auto bg-[#faf6ed] text-[#1f1610] space-y-6 select-text ${mobileTab === "read" ? "block h-full" : "hidden md:block h-full"}`}>
              
              {/* Chapter Header */}
              <div className="border-b border-[#e2d5bd] pb-4 space-y-2">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <span className="font-mono text-[10px] font-bold text-[#8c6721] bg-[#ecdcb9] px-2.5 py-0.5 rounded uppercase tracking-wider">
                    CHAPTER {currentChapter.number} • {currentChapter.badge}
                  </span>
                  <span className="font-mono text-[10px] text-[#786650]">
                    PAGE {chapterIndex + 1} OF {chapters.length}
                  </span>
                </div>

                <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#2a1708] leading-tight">
                  {currentChapter.title}
                </h3>
                
                <p className="text-xs sm:text-sm text-[#70531e] font-serif italic">
                  &ldquo;{currentChapter.subtitle}&rdquo;
                </p>

                {/* Legal Reference Stamp */}
                <div className="flex items-center gap-1.5 pt-1 text-[10px] font-mono text-[#544130]">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#8c6721] shrink-0" />
                  <span>ANCHOR: <strong>{currentChapter.statuteRef}</strong></span>
                </div>
              </div>

              {/* Concise Chapter Summary */}
              <div className="p-3.5 sm:p-4 rounded-lg bg-[#f0e7d5] border border-[#d9cbb2] text-xs sm:text-sm text-[#3b2b1b] leading-relaxed font-sans">
                {currentChapter.summary}
              </div>

              {/* Core Points & Verbatim Citizen Dialogue Scripts */}
              <div className="space-y-4">
                <span className="text-[10px] font-mono font-bold text-[#70531e] uppercase tracking-wider block">
                  ACTION PROTOCOLS & VERBATIM LEGAL SCRIPTS:
                </span>

                {currentChapter.corePoints.map((point, pIdx) => (
                  <div key={pIdx} className="p-4 rounded-lg bg-white border border-[#e6dac5] shadow-xs space-y-2.5">
                    <h4 className="font-serif font-bold text-sm sm:text-base text-[#241304] flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-[#ecdcb9] text-[#70531e] text-[10px] font-mono font-bold flex items-center justify-center shrink-0">
                        {pIdx + 1}
                      </span>
                      <span>{point.heading}</span>
                    </h4>

                    <p className="text-xs sm:text-sm text-[#423427] leading-relaxed pl-7">
                      {point.text}
                    </p>

                    {/* Exact Words Callout Box if script is present */}
                    {point.script && (
                      <div className="ml-7 p-3 rounded-md bg-[#fdf5e6] border-l-4 border-[#8c6721] text-xs font-mono text-[#2c1908] space-y-1">
                        <span className="text-[9px] font-bold text-[#8c6721] uppercase tracking-widest block flex items-center gap-1">
                          <CornerDownRight className="w-3 h-3 text-[#8c6721]" />
                          EXACT WORDS TO SAY CALMLY:
                        </span>
                        <p className="italic font-sans font-semibold text-xs sm:text-sm text-[#1f140a]">
                          {point.script}
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Key Practical Takeaway */}
              <div className="p-4 rounded-lg bg-[#ecdcb9]/60 border border-[#d4af37]/60 space-y-1 text-xs text-[#2a1708]">
                <span className="font-mono text-[9.5px] font-bold text-[#70531e] uppercase tracking-wider block">
                  PRACTICAL CITIZEN TAKEAWAY:
                </span>
                <p className="font-medium">
                  {currentChapter.takeaway}
                </p>
              </div>

              {/* Bottom Reading Pane Pagination Controls */}
              <div className="pt-4 border-t border-[#e2d5bd] flex items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={handlePrevChapter}
                  disabled={chapterIndex === 0}
                  className={`px-3.5 py-2.5 rounded-lg text-xs font-mono flex items-center gap-1.5 transition-all cursor-pointer min-h-[44px] ${
                    chapterIndex === 0
                      ? "opacity-40 cursor-not-allowed bg-black/10 text-gray-500"
                      : "bg-[#2a1708] text-[#f7efe1] hover:bg-[#8c6721]"
                  }`}
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Previous</span>
                </button>

                <span className="text-[10px] font-mono text-[#786650] hidden sm:inline">
                  Use ← and → keys to turn pages
                </span>
                <span className="text-[10px] font-mono text-[#786650] sm:hidden">
                  {chapterIndex + 1}/{chapters.length}
                </span>

                <button
                  type="button"
                  onClick={handleNextChapter}
                  disabled={chapterIndex === chapters.length - 1}
                  className={`px-3.5 py-2.5 rounded-lg text-xs font-mono flex items-center gap-1.5 transition-all cursor-pointer min-h-[44px] ${
                    chapterIndex === chapters.length - 1
                      ? "opacity-40 cursor-not-allowed bg-black/10 text-gray-500"
                      : "bg-[#2a1708] text-[#f7efe1] hover:bg-[#8c6721]"
                  }`}
                >
                  <span>Next Chapter</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

            </div>

          </div>

          {/* FOOTER BAR: Chapter reading progress strip */}
          <div className="bg-[#000a1a] border-t border-[#d4af37]/25 px-4 py-2 flex items-center justify-between text-[10px] font-mono text-gray-400">
            <span className="truncate">
              CURRENT TOME: <strong className="text-[#ffd754]">{activeBook.displayTitle}</strong>
            </span>
            <div className="flex items-center gap-2">
              <span>{Math.round(((chapterIndex + 1) / chapters.length) * 100)}% READ</span>
              <div className="w-20 sm:w-28 h-1.5 bg-black rounded-full overflow-hidden border border-white/10">
                <div 
                  className="h-full bg-gradient-to-r from-[#d4af37] to-[#ffd754] transition-all duration-300"
                  style={{ width: `${((chapterIndex + 1) / chapters.length) * 100}%` }}
                />
              </div>
            </div>
          </div>

        </motion.div>

      </div>
    </AnimatePresence>
  );
}
