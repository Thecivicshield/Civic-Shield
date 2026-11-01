import React, { useState } from "react";
import { 
  BookOpen, 
  Scale, 
  Target, 
  Flame, 
  ArrowRight, 
  Bookmark, 
  Sparkles, 
  Clock,
  CheckCircle2,
  Layers,
  ChevronRight
} from "lucide-react";
import { motion } from "motion/react";
import { CIVIC_BOOKS } from "../data/civicBooksData";
import { playSynthSound } from "./JusticeShieldSection";

interface CivicBookshelfProps {
  onOpenBook: (volume: "rights" | "goals" | "mission", chapterIndex?: number) => void;
}

export default function CivicBookshelf({ onOpenBook }: CivicBookshelfProps) {
  const [hoveredVolume, setHoveredVolume] = useState<string | null>(null);

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
      className="relative py-16 sm:py-24 px-4 sm:px-6 lg:px-8 border-y border-[#d4af37]/30 bg-gradient-to-b from-[#000d26] via-[#020b1c] to-[#000d26] overflow-hidden select-none"
    >
      {/* Ambient Library Lighting & Warm Oak Reflections */}
      <div className="absolute inset-0 pointer-events-none opacity-25 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#d4af37]/25 via-transparent to-transparent" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[350px] bg-[#d4af37]/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#d4af37]/15 border border-[#d4af37]/40 text-[#ffd754] text-[10px] font-mono uppercase tracking-[0.25em] shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-[#d4af37]" />
            <span>The Sovereign Archive • Library Bookshelf</span>
          </div>

          <h2 className="text-2xl sm:text-4xl md:text-5xl font-serif font-bold text-white tracking-tight leading-tight">
            Three Authoritative Volumes of <span className="text-[#ffd754] italic">Civic Defense</span>
          </h2>

          <p className="text-xs sm:text-sm text-gray-300 font-light max-w-2xl mx-auto leading-relaxed">
            Crafted like timeless leather-bound legal codices. Pull any volume from the mahogany bookshelf to study citizen rights, verified targets, and grassroots action mandates.
          </p>
        </div>

        {/* ========================================================= */}
        {/* PHYSICAL LEATHER BOOK SPINES ON MAHOGANY BOOKSHELF LEDGE  */}
        {/* ========================================================= */}
        <div className="max-w-5xl mx-auto">
          {/* Bookshelf Alcove Backing (Dark Walnut Library Backing) */}
          <div className="relative rounded-t-2xl bg-gradient-to-b from-[#020914] via-[#040e22] to-[#0a162e] border-t border-x border-[#d4af37]/25 p-4 sm:p-8 pt-8 sm:pt-12 shadow-[inset_0_20px_40px_rgba(0,0,0,0.9)]">
            
            {/* Shelf Wall Grain Shadows */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(212,175,55,0.08)_0%,_transparent_70%)] pointer-events-none" />

            {/* Grid of 3 Physical Book Spines with Strictly Equal Dimensions */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 items-stretch justify-center">
              {books.map((book) => {
                const isRights = book.id === "rights";
                const isGoals = book.id === "goals";
                const isMission = book.id === "mission";
                const isHovered = hoveredVolume === book.id;

                // Authentic Leather Morocco Colors for Spines
                const spineBg = isRights
                  ? "bg-gradient-to-r from-[#030d1d] via-[#0b2247] via-50% to-[#020a16]"
                  : isGoals
                  ? "bg-gradient-to-r from-[#1f050d] via-[#4a0e20] via-50% to-[#150308]"
                  : "bg-gradient-to-r from-[#04140f] via-[#0c3125] via-50% to-[#030f0a]";

                // Gold foil accent borders & accents
                const foilBorder = isRights
                  ? "border-[#d4af37]/60 group-hover:border-[#ffd754]"
                  : isGoals
                  ? "border-[#e07a5f]/60 group-hover:border-[#f4a261]"
                  : "border-[#2a9d8f]/60 group-hover:border-[#52b788]";

                const foilText = isRights
                  ? "text-[#ffd754]"
                  : isGoals
                  ? "text-[#f4a261]"
                  : "text-[#52b788]";

                const foilGlow = isRights
                  ? "shadow-[0_0_30px_rgba(212,175,55,0.45)]"
                  : isGoals
                  ? "shadow-[0_0_30px_rgba(224,122,95,0.45)]"
                  : "shadow-[0_0_30px_rgba(42,157,143,0.45)]";

                return (
                  <motion.div
                    key={book.id}
                    onMouseEnter={() => setHoveredVolume(book.id)}
                    onMouseLeave={() => setHoveredVolume(null)}
                    onClick={() => handleSelectBook(book.id)}
                    animate={{
                      y: isHovered ? -14 : 0,
                      scale: isHovered ? 1.015 : 1,
                    }}
                    transition={{ type: "spring", stiffness: 280, damping: 22 }}
                    className={`group relative flex flex-col justify-between cursor-pointer transition-all duration-300 rounded-sm ${spineBg} border-2 ${foilBorder} ${isHovered ? foilGlow : "shadow-[0_15px_30px_rgba(0,0,0,0.85)]"} h-[530px] min-h-[530px] max-h-[530px] w-full overflow-hidden`}
                  >
                    {/* Dynamic metallic sheen highlight sweep on hover */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-30" />

                    {/* 1. TOP HEADBAND (Traditional woven cloth book spine cap) */}
                    <div className="w-full h-3 bg-gradient-to-r from-[#5a3818] via-[#e5c158] via-50% to-[#5a3818] border-b border-black/70 flex items-center justify-between px-1 shrink-0">
                      <div className="w-full h-[2px] bg-black/40" />
                    </div>

                    {/* Curvature Specular Highlight (creates optical 3D cylinder effect of a spine) */}
                    <div className="absolute inset-y-0 left-0 w-3.5 bg-gradient-to-r from-black/70 to-transparent pointer-events-none z-20" />
                    <div className="absolute inset-y-0 right-0 w-3.5 bg-gradient-to-l from-black/70 to-transparent pointer-events-none z-20" />
                    <div className="absolute inset-y-0 left-1/3 w-1/3 bg-gradient-to-r from-white/0 via-white/8 to-white/0 pointer-events-none z-10" />

                    {/* RAISED RIB 1 (Top Nerve Ridge) */}
                    <div className="w-full h-3.5 my-0.5 bg-gradient-to-b from-white/20 via-black/40 to-white/10 border-y border-[#d4af37]/40 shadow-[0_2px_4px_rgba(0,0,0,0.7)] flex items-center justify-center shrink-0">
                      <div className="w-4/5 h-[1px] bg-[#d4af37]/30" />
                    </div>

                    {/* COMPARTMENT 1: VOLUME NUMBER & EDITION LABEL (No Reading Time) */}
                    <div className="px-4 text-center py-2 shrink-0">
                      <div className="inline-block px-3 py-1 rounded-sm bg-black/40 border border-[#d4af37]/50 shadow-inner">
                        <span className={`text-[11px] font-mono font-black tracking-[0.25em] uppercase ${foilText}`}>
                          {book.volumeNumber}
                        </span>
                      </div>
                      <div className="text-[9px] font-mono text-[#d4af37]/90 mt-1 uppercase tracking-widest flex items-center justify-center gap-1 font-bold">
                        <Bookmark className="w-2.5 h-2.5 text-[#d4af37]" />
                        <span>AUTHORITATIVE CODEX</span>
                      </div>
                    </div>

                    {/* RAISED RIB 2 */}
                    <div className="w-full h-3.5 my-0.5 bg-gradient-to-b from-white/20 via-black/40 to-white/10 border-y border-[#d4af37]/40 shadow-[0_2px_4px_rgba(0,0,0,0.7)] flex items-center justify-center shrink-0">
                      <div className="w-4/5 h-[1px] bg-[#d4af37]/30" />
                    </div>

                    {/* COMPARTMENT 2: EMBOSSED BOOK TITLE (Standardized Centered Proportions) */}
                    <div className="px-4 py-3 sm:py-4 flex flex-col items-center justify-center text-center space-y-2.5 relative z-10 flex-1">
                      {/* Gold Foil Filigree Accent */}
                      <div className="flex items-center gap-1.5 opacity-70">
                        <span className="h-[1px] w-6 bg-[#d4af37]" />
                        <span className="text-[9px] text-[#ffd754]">◆</span>
                        <span className="h-[1px] w-6 bg-[#d4af37]" />
                      </div>

                      <h3 className="font-serif font-black text-xl sm:text-2xl text-white group-hover:text-[#ffd754] transition-colors leading-snug tracking-wider drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)] h-14 flex items-center justify-center">
                        {book.displayTitle}
                      </h3>

                      <p className="text-[10px] font-mono text-[#ffd754]/90 tracking-widest uppercase">
                        {book.edition}
                      </p>

                      <div className="w-10 h-10 rounded-full bg-black/50 border border-[#d4af37]/40 flex items-center justify-center shadow-[inset_0_2px_6px_rgba(0,0,0,0.8)] group-hover:scale-110 transition-transform">
                        {isRights && <Scale className="w-5 h-5 text-[#ffd754]" />}
                        {isGoals && <Target className="w-5 h-5 text-[#f4a261]" />}
                        {isMission && <Flame className="w-5 h-5 text-[#52b788]" />}
                      </div>

                      <p className="text-[11px] text-gray-300 font-light italic leading-relaxed px-2 line-clamp-2 drop-shadow-sm h-8 flex items-center justify-center">
                        {book.subtitle}
                      </p>

                      {/* Gold Foil Filigree Accent Bottom */}
                      <div className="flex items-center gap-1.5 opacity-70">
                        <span className="h-[1px] w-6 bg-[#d4af37]" />
                        <span className="text-[9px] text-[#ffd754]">◆</span>
                        <span className="h-[1px] w-6 bg-[#d4af37]" />
                      </div>
                    </div>

                    {/* RAISED RIB 3 */}
                    <div className="w-full h-3.5 my-0.5 bg-gradient-to-b from-white/20 via-black/40 to-white/10 border-y border-[#d4af37]/40 shadow-[0_2px_4px_rgba(0,0,0,0.7)] flex items-center justify-center shrink-0">
                      <div className="w-4/5 h-[1px] bg-[#d4af37]/30" />
                    </div>

                    {/* COMPARTMENT 3: HEEL / PUBLISHER IMPRINT & INTERACTIVE ACTION */}
                    <div className="px-4 py-3 text-center space-y-2 bg-black/35 shrink-0">
                      <div className="text-[8.5px] font-mono tracking-[0.2em] text-[#d4af37] uppercase font-bold">
                        CIVIC SHIELD • ARCHIVE
                      </div>

                      <div className="flex items-center justify-center gap-1 text-[9.5px] text-gray-300 font-mono">
                        <BookOpen className="w-3 h-3 text-[#d4af37]" />
                        <span>{book.chapterCountLabel}</span>
                      </div>

                      {/* Pull Volume Button on Spine Base */}
                      <button
                        type="button"
                        className="w-full py-2 px-3 rounded-sm bg-gradient-to-r from-[#001026] via-[#001d4a] to-[#001026] border border-[#d4af37]/50 text-[#ffd754] group-hover:bg-[#d4af37] group-hover:text-[#001233] text-[10px] font-mono font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all duration-200 cursor-pointer shadow-md min-h-[42px]"
                      >
                        <BookOpen className="w-3.5 h-3.5" />
                        <span>Pull & Read Tome</span>
                        <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                      </button>
                    </div>

                    {/* RAISED RIB 4 (Bottom Nerve Ridge) */}
                    <div className="w-full h-3.5 my-0.5 bg-gradient-to-b from-white/20 via-black/40 to-white/10 border-y border-[#d4af37]/40 shadow-[0_2px_4px_rgba(0,0,0,0.7)] flex items-center justify-center shrink-0">
                      <div className="w-4/5 h-[1px] bg-[#d4af37]/30" />
                    </div>

                    {/* 2. BOTTOM TAILBAND */}
                    <div className="w-full h-2.5 bg-gradient-to-r from-[#5a3818] via-[#e5c158] via-50% to-[#5a3818] border-t border-black/70 shrink-0" />
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* ========================================================= */}
          {/* POLISHED MAHOGANY WOODEN BOOKSHELF WITH BRASS NAMEPLATE   */}
          {/* ========================================================= */}
          <div className="relative z-20">
            {/* Top Bevelled Ledge with Golden Ambient Rim Reflection */}
            <div className="h-3 w-full bg-gradient-to-r from-[#180a04] via-[#5c2e14] via-50% to-[#180a04] border-t-2 border-[#d4af37]/70 shadow-[0_-4px_12px_rgba(212,175,55,0.25)]" />
            
            {/* Front Mahogany Plinth Fascia */}
            <div className="py-4 px-6 bg-gradient-to-b from-[#2a1307] via-[#3a1a0b] to-[#1a0c05] border-b-2 border-black/80 shadow-[0_20px_35px_rgba(0,0,0,0.9)] flex items-center justify-center">
              {/* Embossed Brass Plaque in Center */}
              <div className="px-5 py-1.5 rounded-sm bg-gradient-to-b from-[#e5c158] via-[#d4af37] to-[#997718] border border-[#ffd754] shadow-[0_2px_8px_rgba(0,0,0,0.8),inset_0_1px_2px_rgba(255,255,255,0.6)] flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#3d2407] border border-white/20" />
                <span className="text-[10px] sm:text-[11px] font-serif font-black tracking-[0.2em] text-[#1c1003] uppercase select-none">
                  THE RATIFIED CIVIC DEFENSE TRILOGY • 3 AUTHORITATIVE VOLUMES
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#3d2407] border border-white/20" />
              </div>
            </div>

            {/* Deep Under-Shelf Shadow */}
            <div className="h-4 bg-gradient-to-b from-black/80 to-transparent" />
          </div>

          {/* Prompt under bookshelf */}
          <div className="text-center mt-3">
            <p className="text-[10px] sm:text-[11px] font-mono text-gray-400 uppercase tracking-widest flex items-center justify-center gap-2">
              <span className="text-[#ffd754]">◆</span>
              <span>Tap or click any book spine to open the reader with full chapter navigation</span>
              <span className="text-[#ffd754]">◆</span>
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
