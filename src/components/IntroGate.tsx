import React, { useEffect, useState, useRef } from "react";
import { motion } from "motion/react";
import { ChevronRight, Shield } from "lucide-react";
import CivicShieldBlueprintLogo from "./CivicShieldBlueprintLogo";

interface IntroGateProps {
  onEnter: (sectionId?: string) => void;
  visitorCount?: number;
  subscriberCount?: number;
}

export default function IntroGate({ onEnter }: IntroGateProps) {
  const [isFilled, setIsFilled] = useState(false);
  const [isReadyToEnter, setIsReadyToEnter] = useState(false);
  const [isSplitting, setIsSplitting] = useState(false);
  const hasTriggeredRef = useRef(false);

  useEffect(() => {
    // 1. Precise architectural drafting line phase
    const fillTimer = setTimeout(() => {
      setIsFilled(true);
    }, 1800);

    // 2. Ready indicator
    const readyTimer = setTimeout(() => {
      setIsReadyToEnter(true);
    }, 2200);

    // 3. Auto-open after a thoughtful pause
    const autoEnterTimer = setTimeout(() => {
      triggerSplitOpen();
    }, 5000);

    return () => {
      clearTimeout(fillTimer);
      clearTimeout(readyTimer);
      clearTimeout(autoEnterTimer);
    };
  }, []);

  const triggerSplitOpen = (sectionId?: string) => {
    if (hasTriggeredRef.current || isSplitting) return;
    hasTriggeredRef.current = true;
    setIsSplitting(true);

    // After the heavy archival doors part completely, reveal the main application
    setTimeout(() => {
      onEnter(sectionId);
    }, 1100);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Enter" || e.key === " " || e.key === "ArrowRight" || e.key === "Escape") {
        triggerSplitOpen();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div
      id="intro-gate-container"
      className="fixed inset-0 w-full h-full z-[100000] select-none font-sans overflow-hidden cursor-pointer bg-[#010612]"
      onClick={() => triggerSplitOpen()}
      style={{ perspective: 1200 }}
    >
      {/* ========================================================================= */}
      {/* 1. INITIAL STATIC VIEW (Draws the exact loading screen blueprint shield)   */}
      {/* ========================================================================= */}
      {!isSplitting && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="absolute inset-0 w-full h-full flex flex-col items-center justify-between py-10 sm:py-14 px-6 z-10"
        >
          {/* Subtle Archival Drafting Vellum & Deep Radial Atmosphere */}
          <div className="absolute inset-0 bg-grid-lines opacity-[0.035] pointer-events-none" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.05)_0%,rgba(3,10,26,0.5)_55%,#010612_85%)] pointer-events-none" />

          {/* Archival Corner Registration Marks */}
          <div className="absolute top-6 left-6 flex items-center gap-2 font-serif text-[9px] text-[#d4af37]/60 tracking-[0.25em] uppercase pointer-events-none">
            <div className="w-2.5 h-2.5 border-t border-l border-[#d4af37]/40" />
            <span>ARCHIVE REF. MCMXLIX</span>
          </div>
          <div className="absolute top-6 right-6 flex items-center gap-2 font-serif text-[9px] text-[#d4af37]/60 tracking-[0.25em] uppercase pointer-events-none">
            <span>CONSTITUTIONAL SEAL</span>
            <div className="w-2.5 h-2.5 border-t border-r border-[#d4af37]/40" />
          </div>
          <div className="absolute bottom-6 left-6 flex items-center gap-2 font-serif text-[9px] text-[#d4af37]/40 tracking-[0.25em] uppercase pointer-events-none">
            <div className="w-2.5 h-2.5 border-b border-l border-[#d4af37]/30" />
            <span>ARTICLE 21</span>
          </div>
          <div className="absolute bottom-6 right-6 flex items-center gap-2 font-serif text-[9px] text-[#d4af37]/40 tracking-[0.25em] uppercase pointer-events-none">
            <span>SOVEREIGN SAFEGUARD</span>
            <div className="w-2.5 h-2.5 border-b border-r border-[#d4af37]/30" />
          </div>

          {/* Top Epigraph */}
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.2 }}
            className="relative z-20 flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#030c1d]/90 border border-[#d4af37]/25 text-[10px] font-serif text-[#e5c158] uppercase tracking-[0.28em] shadow-[0_2px_12px_rgba(0,0,0,0.6)]"
          >
            <Shield className="w-3.5 h-3.5 text-[#d4af37]" />
            <span>Foundational Legal Draft</span>
          </motion.div>

          {/* Center: Blueprint Shield Logo */}
          <div className="relative z-20 flex flex-col items-center justify-center my-auto">
            <CivicShieldBlueprintLogo
              size="lg"
              autoFillDelay={1800}
              isFilledOverride={isFilled}
              showConstructionGuides={true}
              interactive={true}
              className="my-2"
            />

            {/* Classical Roman Typography */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-center space-y-2.5 mt-4 max-w-md"
            >
              <h1 className="text-3xl sm:text-4xl font-serif text-white uppercase tracking-[0.3em] drop-shadow-[0_4px_16px_rgba(0,0,0,0.9)]">
                CIVIC <span className="text-[#e5c158] font-medium italic">SHIELD</span>
              </h1>

              <div className="flex items-center justify-center gap-3 max-w-xs mx-auto py-0.5">
                <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-[#d4af37]/40 to-transparent" />
                <span className="text-[9px] font-serif text-[#d4af37]/85 tracking-[0.28em] uppercase">
                  Lex • Veritas • Justitia
                </span>
                <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-[#d4af37]/40 to-transparent" />
              </div>

              <p className="text-xs sm:text-sm text-gray-300 font-serif font-light tracking-wider leading-relaxed">
                Sovereign Legal Literacy & Constitutional Safeguards
              </p>
            </motion.div>
          </div>

          {/* Bottom Button Prompt */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: isReadyToEnter ? 1 : 0.65, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="relative z-20 flex flex-col items-center gap-3"
          >
            <button
              id="intro-enter-shield-btn"
              onClick={(e) => {
                e.stopPropagation();
                triggerSplitOpen();
              }}
              className="px-7 py-2.5 rounded-full bg-[#030d22]/95 hover:bg-[#071738] border border-[#d4af37]/45 text-xs font-serif text-[#e5c158] uppercase tracking-widest transition-all duration-400 flex items-center gap-2 backdrop-blur-md cursor-pointer hover:scale-105 active:scale-95 shadow-[0_6px_24px_rgba(0,0,0,0.85)]"
            >
              <span>{isFilled ? "Enter Sovereign Archive" : "Drafting Shield..."}</span>
              <ChevronRight className="w-3.5 h-3.5 text-[#e5c158]" />
            </button>

            <span className="text-[9px] font-serif text-gray-400 tracking-wider">
              Click anywhere or press <kbd className="text-[#ffd754] px-1 font-mono">Space</kbd>
            </span>
          </motion.div>
        </motion.div>
      )}

      {/* ========================================================================= */}
      {/* 2. DRAMATIC DOUBLE DOORS PARTING (Smooth, heavy, cinematic split)          */}
      {/* ========================================================================= */}
      {isSplitting && (
        <div className="absolute inset-0 w-full h-full pointer-events-none z-30 overflow-hidden">
          {/* Subtle Vertical Seam Light Line */}
          <motion.div
            initial={{ opacity: 0, scaleY: 0.4 }}
            animate={{ opacity: [0, 0.9, 0], scaleY: 1 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-[2px] bg-gradient-to-b from-transparent via-[#e5c158] to-transparent shadow-[0_0_30px_rgba(229,193,88,0.8)] z-50 pointer-events-none"
          />

          {/* LEFT VAULT DOOR */}
          <motion.div
            initial={{ x: "0%", rotateY: 0 }}
            animate={{ x: "-100%", rotateY: -3 }}
            transition={{ duration: 1.05, ease: [0.22, 1, 0.36, 1] }}
            style={{ transformOrigin: "left center" }}
            className="absolute top-0 left-0 bottom-0 w-1/2 bg-[#010612] border-r border-[#d4af37]/35 shadow-[16px_0_50px_rgba(0,0,0,0.95)] overflow-hidden flex items-center justify-end"
          >
            {/* Left Door Drafting Texture & Shading */}
            <div className="absolute inset-0 bg-grid-lines opacity-[0.035] pointer-events-none" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_right,rgba(212,175,55,0.06)_0%,rgba(2,8,22,0.8)_60%,#010612_100%)] pointer-events-none" />

            {/* Left Half of Shield (perfectly anchored at the 50% parting seam) */}
            <div className="relative translate-x-1/2 flex items-center justify-center pointer-events-none">
              <CivicShieldBlueprintLogo
                size="lg"
                isFilledOverride={true}
                showConstructionGuides={false}
                interactive={false}
                clipSide="left"
              />
            </div>
          </motion.div>

          {/* RIGHT VAULT DOOR */}
          <motion.div
            initial={{ x: "0%", rotateY: 0 }}
            animate={{ x: "100%", rotateY: 3 }}
            transition={{ duration: 1.05, ease: [0.22, 1, 0.36, 1] }}
            style={{ transformOrigin: "right center" }}
            className="absolute top-0 right-0 bottom-0 w-1/2 bg-[#010612] border-l border-[#d4af37]/35 shadow-[-16px_0_50px_rgba(0,0,0,0.95)] overflow-hidden flex items-center justify-start"
          >
            {/* Right Door Drafting Texture & Shading */}
            <div className="absolute inset-0 bg-grid-lines opacity-[0.035] pointer-events-none" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_left,rgba(212,175,55,0.06)_0%,rgba(2,8,22,0.8)_60%,#010612_100%)] pointer-events-none" />

            {/* Right Half of Shield (perfectly anchored at the 50% parting seam) */}
            <div className="relative -translate-x-1/2 flex items-center justify-center pointer-events-none">
              <CivicShieldBlueprintLogo
                size="lg"
                isFilledOverride={true}
                showConstructionGuides={false}
                interactive={false}
                clipSide="right"
              />
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
