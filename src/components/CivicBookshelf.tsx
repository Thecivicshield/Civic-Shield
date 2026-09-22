import React from "react";
import { 
  BookOpen, 
  Scale, 
  Target, 
  Flame, 
  ArrowRight, 
  Bookmark, 
  Sparkles, 
  ShieldCheck,
  CheckCircle2,
  Clock
} from "lucide-react";
import { motion } from "motion/react";
import { CIVIC_BOOKS, CivicBook } from "../data/civicBooksData";
import { playSynthSound } from "./JusticeShieldSection";

interface CivicBookshelfProps {
  onOpenBook: (volume: "rights" | "goals" | "mission", chapterIndex?: number) => void;
}

export default function CivicBookshelf({ onOpenBook }: CivicBookshelfProps) {
  const books = [
    CIVIC_BOOKS.rights,
    CIVIC_BOOKS.goals,
    CIVIC_BOOKS.mission,
  ];

  const handleSelectBook = (volume: "rights" | "goals" | "mission") => {
    try {
      playSynthSound("click");
    } catch (e) {}
    onOpenBook(volume, 0);
  };

  return (
    <section 
      id="reading-library" 
      className="relative py-14 sm:py-20 px-4 sm:px-6 lg:px-8 border-y border-[#d4af37]/25 bg-gradient-to-b from-[#000d26] via-[#001438] to-[#000d26] overflow-hidden select-none"
    >
      {/* Background ambient lighting */}
      <div className="absolute inset-0 pointer-events-none opacity-20 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#d4af37]/20 via-transparent to-transparent" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#d4af37]/15 border border-[#d4af37]/35 text-[#ffd754] text-[10px] font-mono uppercase tracking-[0.25em]">
            <Sparkles className="w-3 h-3 text-[#d4af37]" />
            <span>The Sovereign Archive • Reading Library</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-serif font-bold text-white tracking-tight leading-tight">
            Three Authoritative Books of <span className="text-[#ffd754]">Civic Defense</span>
          </h2>

          <p className="text-xs sm:text-sm text-gray-300 font-light max-w-2xl mx-auto leading-relaxed">
            Concise, battle-tested legal playbooks written in plain English. No repetitive academic theory—only practical, actionable knowledge to protect your dignity, privacy, and constitutional freedoms.
          </p>
        </div>

        {/* 3 Physical Books Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto">
          {books.map((book, idx) => {
            const isRights = book.id === "rights";
            const isGoals = book.id === "goals";
            const isMission = book.id === "mission";

            const bookCoverGrad = isRights
              ? "from-[#071731] via-[#0d2752] to-[#040e20]"
              : isGoals
              ? "from-[#2e0915] via-[#481223] to-[#1a050c]"
              : "from-[#081e17] via-[#10382b] to-[#05130f]";

            const borderAccent = isRights
              ? "border-[#d4af37]/60 group-hover:border-[#ffd754]"
              : isGoals
              ? "border-[#e07a5f]/60 group-hover:border-[#f4a261]"
              : "border-[#2a9d8f]/60 group-hover:border-[#52b788]";

            const badgeBg = isRights
              ? "bg-[#d4af37]/20 text-[#ffd754] border-[#d4af37]/40"
              : isGoals
              ? "bg-[#e07a5f]/20 text-[#f4a261] border-[#e07a5f]/40"
              : "bg-[#2a9d8f]/20 text-[#52b788] border-[#2a9d8f]/40";

            return (
              <motion.div
                key={book.id}
                whileHover={{ y: -8, scale: 1.015 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                onClick={() => handleSelectBook(book.id)}
                className={`group relative rounded-xl bg-gradient-to-b ${bookCoverGrad} border-2 ${borderAccent} p-6 sm:p-7 shadow-[0_15px_35px_rgba(0,0,0,0.7)] flex flex-col justify-between cursor-pointer transition-all duration-300 min-h-[420px] overflow-hidden`}
              >
                {/* Book Spine Simulation on the Left */}
                <div className="absolute top-0 bottom-0 left-0 w-3 bg-gradient-to-r from-black/60 via-white/10 to-transparent border-r border-white/10" />

                {/* Subtle Leather Texture Watermark */}
                <div className="absolute -right-8 -bottom-8 opacity-5 pointer-events-none">
                  {isRights && <Scale className="w-56 h-56 text-white" />}
                  {isGoals && <Target className="w-56 h-56 text-white" />}
                  {isMission && <Flame className="w-56 h-56 text-white" />}
                </div>

                {/* Top Foil Band & Volume Identifier */}
                <div className="space-y-4 pl-2">
                  <div className="flex items-center justify-between">
                    <span className={`px-2.5 py-1 rounded-md text-[9px] font-mono uppercase tracking-[0.2em] font-bold border ${badgeBg}`}>
                      {book.volumeNumber}
                    </span>
                    <span className="text-[10px] font-mono text-gray-400 flex items-center gap-1">
                      <Clock className="w-3 h-3 text-[#d4af37]" />
                      {book.readTime}
                    </span>
                  </div>

                  {/* Embossed Insignia Crest */}
                  <div className="w-12 h-12 rounded-xl bg-black/40 border border-white/10 flex items-center justify-center shadow-inner group-hover:scale-105 transition-transform">
                    {isRights && <Scale className="w-6 h-6 text-[#ffd754]" />}
                    {isGoals && <Target className="w-6 h-6 text-[#f4a261]" />}
                    {isMission && <Flame className="w-6 h-6 text-[#52b788]" />}
                  </div>

                  {/* Explicit Book Title */}
                  <div className="space-y-1.5 pt-1">
                    <h3 className="font-serif font-bold text-xl sm:text-2xl text-white group-hover:text-[#ffd754] transition-colors leading-tight">
                      {book.displayTitle}
                    </h3>
                    <p className="text-[11px] text-[#ffd754]/80 font-mono">
                      {book.edition}
                    </p>
                  </div>

                  {/* Concise Summary */}
                  <p className="text-xs text-gray-300 font-light leading-relaxed line-clamp-3">
                    {book.summary}
                  </p>
                </div>

                {/* Bottom Shelf Metadata & Read Action */}
                <div className="pt-6 border-t border-white/10 pl-2 space-y-3">
                  <div className="flex items-center justify-between text-[11px] text-gray-400 font-mono">
                    <span className="flex items-center gap-1.5 text-gray-300">
                      <Bookmark className="w-3 h-3 text-[#d4af37]" />
                      {book.chapterCountLabel}
                    </span>
                    <span className="text-gray-300 font-mono text-[11px] flex items-center gap-1">
                      {book.readTime}
                    </span>
                  </div>

                  {/* Physical Style Open Button */}
                  <button
                    type="button"
                    className="w-full py-2.5 px-4 rounded-lg bg-black/60 border border-[#d4af37]/40 text-[#ffd754] group-hover:bg-[#d4af37] group-hover:text-[#001a4d] text-xs font-mono font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all duration-200 cursor-pointer shadow-md group-hover:shadow-[0_0_20px_rgba(212,175,55,0.4)]"
                  >
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>Read Volume</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom Shelf Rail Footing */}
        <div className="mt-8 max-w-6xl mx-auto h-3 bg-gradient-to-r from-[#2a1708] via-[#5c3716] to-[#2a1708] rounded-full border-t border-[#d4af37]/50 shadow-[0_10px_20px_rgba(0,0,0,0.8)]" />
        <div className="text-center mt-3">
          <p className="text-[10px] font-mono text-gray-400 uppercase tracking-widest">
            Click any tome to open the interactive reader • Certified non-partisan legal literacy
          </p>
        </div>

      </div>
    </section>
  );
}
