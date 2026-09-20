import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import CivicShieldBlueprintLogo from "./CivicShieldBlueprintLogo";

interface LoadingScreenProps {
  onLoaded?: () => void;
  minDuration?: number;
}

export default function LoadingScreen({ onLoaded, minDuration = 2200 }: LoadingScreenProps) {
  const [currentStage, setCurrentStage] = useState<1 | 2 | 3 | 4>(1);
  const [isDismissing, setIsDismissing] = useState(false);
  const hasTriggeredRef = useRef(false);

  useEffect(() => {
    // Stage 1 -> Stage 2 (Drafting line drawing)
    const stage2Timer = setTimeout(() => {
      setCurrentStage(2);
    }, 350);

    // Stage 2 -> Stage 3 (Soft gold activation flash)
    const stage3Timer = setTimeout(() => {
      setCurrentStage(3);
    }, 1600);

    // Stage 3 -> Stage 4 (Final filled seal)
    const stage4Timer = setTimeout(() => {
      setCurrentStage(4);
    }, 1950);

    // Auto-advance
    const dismissTimer = setTimeout(() => {
      triggerDismiss();
    }, minDuration + 500);

    return () => {
      clearTimeout(stage2Timer);
      clearTimeout(stage3Timer);
      clearTimeout(stage4Timer);
      clearTimeout(dismissTimer);
    };
  }, [minDuration]);

  const triggerDismiss = () => {
    if (hasTriggeredRef.current || isDismissing) return;
    hasTriggeredRef.current = true;
    setIsDismissing(true);

    setTimeout(() => {
      onLoaded?.();
    }, 550);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Enter" || e.key === " " || e.key === "Escape" || e.key === "ArrowRight") {
        triggerDismiss();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <motion.div
      id="loading-screen-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: isDismissing ? 0 : 1, scale: isDismissing ? 1.02 : 1 }}
      transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-0 z-[999999] bg-[#020a1a] flex flex-col items-center justify-between py-12 px-6 select-none overflow-hidden font-sans cursor-pointer"
      onClick={triggerDismiss}
    >
      {/* VINTAGE DRAFTING VELLUM AMBIENT BACKDROP */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.06)_0%,rgba(4,14,35,0.4)_50%,transparent_75%)] pointer-events-none" />
      <div className="absolute inset-0 bg-grid-lines opacity-[0.04] pointer-events-none" />

      {/* ARCHIVAL CORNER DRAFTSMAN TICKS */}
      <div className="absolute top-8 left-8 flex items-center gap-2 font-serif text-[9px] text-[#d4af37]/60 tracking-[0.25em] uppercase pointer-events-none">
        <div className="w-2.5 h-2.5 border-t border-l border-[#d4af37]/40" />
        <span>ARCHIVE REF. MCMXLIX</span>
      </div>
      <div className="absolute top-8 right-8 flex items-center gap-2 font-serif text-[9px] text-[#d4af37]/60 tracking-[0.25em] uppercase pointer-events-none">
        <span>CONSTITUTIONAL EMBLEM</span>
        <div className="w-2.5 h-2.5 border-t border-r border-[#d4af37]/40" />
      </div>
      <div className="absolute bottom-8 left-8 flex items-center gap-2 font-serif text-[9px] text-[#d4af37]/40 tracking-[0.25em] uppercase pointer-events-none">
        <div className="w-2.5 h-2.5 border-b border-l border-[#d4af37]/30" />
        <span>ARTICLE 21</span>
      </div>
      <div className="absolute bottom-8 right-8 flex items-center gap-2 font-serif text-[9px] text-[#d4af37]/40 tracking-[0.25em] uppercase pointer-events-none">
        <span>LEGAL LITERACY</span>
        <div className="w-2.5 h-2.5 border-b border-r border-[#d4af37]/30" />
      </div>

      {/* TOP HEADER: MINIMALIST EPIGRAPH */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="relative z-20 text-center"
      >
        <span className="text-[10px] font-serif text-[#d4af37]/80 uppercase tracking-[0.35em]">
          Foundational Seal • Indian Jurisprudence
        </span>
      </motion.div>

      {/* CENTER: OLD-STYLE MINIMALIST BLUEPRINT SHIELD */}
      <div className="relative z-20 flex flex-col items-center justify-center my-auto">
        <CivicShieldBlueprintLogo
          size="lg"
          autoFillDelay={1850}
          isFilledOverride={currentStage >= 4}
          showConstructionGuides={true}
          interactive={true}
          className="my-3"
        />

        {/* Minimalist Classic Roman Brand */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center space-y-2 mt-4 max-w-sm"
        >
          <h2 className="text-2xl sm:text-3xl font-serif text-white uppercase tracking-[0.28em] drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
            CIVIC <span className="text-[#e5c158] font-medium italic">SHIELD</span>
          </h2>
          <p className="text-xs text-[#d4af37]/75 font-serif tracking-widest uppercase">
            Lex • Veritas • Justitia
          </p>
        </motion.div>
      </div>

      {/* BOTTOM SUBTLE GOLD PROGRESS & PROMPT */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="relative z-20 flex flex-col items-center gap-3 w-full max-w-xs text-center"
      >
        {/* Minimalist Hairline Progress Bar */}
        <div className="w-40 h-[1px] bg-white/[0.08] relative overflow-hidden">
          <motion.div
            className="absolute top-0 bottom-0 left-0 bg-gradient-to-r from-transparent via-[#ffd754] to-transparent"
            initial={{ width: "0%" }}
            animate={{ width: currentStage === 1 ? "20%" : currentStage === 2 ? "65%" : "100%" }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          />
        </div>

        <span className="text-[9px] font-serif text-gray-400 tracking-wider">
          Click anywhere or press <kbd className="text-[#ffd754] px-1 font-mono">Space</kbd> to enter
        </span>
      </motion.div>
    </motion.div>
  );
}
