import React, { useEffect, useState, useRef } from "react";
import { motion, useReducedMotion } from "motion/react";

export interface CivicShieldBlueprintLogoProps {
  size?: "sm" | "md" | "lg" | "xl";
  mode?: "full" | "compact" | "minimal";
  autoFillDelay?: number;
  isFilledOverride?: boolean;
  showConstructionGuides?: boolean;
  interactive?: boolean;
  clipSide?: "left" | "right" | "none";
  onAnimationComplete?: () => void;
  className?: string;
}

export default function CivicShieldBlueprintLogo({
  size = "lg",
  mode = "full",
  autoFillDelay = 1800,
  isFilledOverride,
  showConstructionGuides = true,
  interactive = true,
  clipSide = "none",
  onAnimationComplete,
  className = "",
}: CivicShieldBlueprintLogoProps) {
  const [stage, setStage] = useState<"init" | "drawing" | "filled">("init");
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0, rx: 0, ry: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (shouldReduceMotion) {
      setStage("filled");
      onAnimationComplete?.();
      return;
    }

    if (isFilledOverride !== undefined) {
      setStage(isFilledOverride ? "filled" : "drawing");
      return;
    }

    const drawTimer = setTimeout(() => {
      setStage("drawing");
    }, 100);

    const fillTimer = setTimeout(() => {
      setStage("filled");
      onAnimationComplete?.();
    }, autoFillDelay);

    return () => {
      clearTimeout(drawTimer);
      clearTimeout(fillTimer);
    };
  }, [autoFillDelay, isFilledOverride, onAnimationComplete, shouldReduceMotion]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!interactive || !containerRef.current || clipSide !== "none") return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    setMouseOffset({
      x: x * 0.025,
      y: y * 0.025,
      rx: -(y / rect.height) * 5,
      ry: (x / rect.width) * 5,
    });
  };

  const handleMouseLeave = () => {
    if (!interactive) return;
    setMouseOffset({ x: 0, y: 0, rx: 0, ry: 0 });
  };

  const dimensions = {
    sm: "w-20 h-24",
    md: "w-36 h-44",
    lg: "w-56 h-68 sm:w-64 sm:h-80",
    xl: "w-72 h-88 sm:w-84 sm:h-[400px]",
  }[size];

  const isFilled = stage === "filled" || isFilledOverride === true;
  const isCompact = mode === "compact" || size === "sm";

  // Precise clipping for split double-doors
  const clipStyle: React.CSSProperties =
    clipSide === "left"
      ? { clipPath: "polygon(0 0, 50% 0, 50% 100%, 0 100%)" }
      : clipSide === "right"
      ? { clipPath: "polygon(50% 0, 100% 0, 100% 100%, 50% 100%)" }
      : {};

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ perspective: 1000, ...clipStyle }}
      className={`relative flex items-center justify-center select-none ${dimensions} ${className}`}
    >
      {/* 1. ARCHITECTURAL DRAFTING VELLUM GRID */}
      {showConstructionGuides && !isCompact && clipSide === "none" && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isFilled ? 0.08 : 0.18 }}
          transition={{ duration: 1.4, ease: "easeOut" }}
          className="absolute inset-0 pointer-events-none transition-opacity duration-1000"
        >
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(212,175,55,0.15)_1px,transparent_1px),linear-gradient(to_bottom,rgba(212,175,55,0.15)_1px,transparent_1px)] bg-[size:1.5rem_1.5rem]" />

          {/* Minimalist Draftsman Corner Registration Ticks */}
          <div className="absolute top-0 left-0 w-2.5 h-2.5 border-t border-l border-[#d4af37]/40" />
          <div className="absolute top-0 right-0 w-2.5 h-2.5 border-t border-r border-[#d4af37]/40" />
          <div className="absolute bottom-0 left-0 w-2.5 h-2.5 border-b border-l border-[#d4af37]/40" />
          <div className="absolute bottom-0 right-0 w-2.5 h-2.5 border-b border-r border-[#d4af37]/40" />
        </motion.div>
      )}

      {/* 2. DRAMATIC DEEP GOLD GLOW (Soft, steady, atmospheric) */}
      {clipSide === "none" && (
        <motion.div
          animate={{
            opacity: isFilled ? 0.4 : 0.18,
            scale: isFilled ? 1.02 : 0.98,
          }}
          transition={{ duration: 2.0, ease: "easeInOut" }}
          className="absolute inset-0 rounded-full bg-[radial-gradient(circle,rgba(212,175,55,0.18)_0%,rgba(6,16,40,0.4)_60%,transparent_75%)] blur-2xl pointer-events-none"
        />
      )}

      {/* 3. MAIN SHIELD SVG — DISTINCTIVE ARCHITECTURAL GOTHIC/NORMAN SHIELD */}
      <motion.div
        animate={{
          x: mouseOffset.x,
          y: mouseOffset.y,
          rotateX: mouseOffset.rx,
          rotateY: mouseOffset.ry,
        }}
        transition={{ type: "spring", damping: 24, stiffness: 100 }}
        className="w-full h-full relative z-10 flex items-center justify-center"
      >
        <svg
          className="w-full h-full drop-shadow-[0_8px_32px_rgba(0,0,0,0.85)] overflow-visible"
          viewBox="0 0 200 240"
          fill="none"
        >
          <defs>
            {/* Antique Metallic Gold Gradient */}
            <linearGradient id="vintageGoldMetal" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fefcf5" />
              <stop offset="25%" stopColor="#e8c967" />
              <stop offset="65%" stopColor="#c59b27" />
              <stop offset="100%" stopColor="#6e500c" />
            </linearGradient>

            {/* Deep Archival Sovereign Navy Body Gradient */}
            <radialGradient id="archivalNavyBody" cx="50%" cy="36%" r="68%">
              <stop offset="0%" stopColor="#0a1d42" />
              <stop offset="65%" stopColor="#040e22" />
              <stop offset="100%" stopColor="#010612" />
            </radialGradient>

            {/* Fine Warm Gold Ink Drafting Line */}
            <linearGradient id="goldInkLine" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#f7f1dc" />
              <stop offset="50%" stopColor="#d4af37" />
              <stop offset="100%" stopColor="#917015" />
            </linearGradient>

            {/* Faint Ivory Drafting Guide Line */}
            <linearGradient id="vellumDraftLine" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="rgba(247,241,220,0.45)" />
              <stop offset="100%" stopColor="rgba(212,175,55,0.12)" />
            </linearGradient>
          </defs>

          {/* ========================================================================= */}
          {/* STAGE 1: DRAFTSMAN PLUMB LINES & COMPASS CIRCLE ARCS                      */}
          {/* ========================================================================= */}
          {showConstructionGuides && !isCompact && (
            <g opacity={isFilled ? 0 : 0.45} className="transition-opacity duration-700 pointer-events-none">
              {/* Central Vertical Spine / Plumb Line */}
              <motion.line
                x1="100"
                y1="6"
                x2="100"
                y2="234"
                stroke="url(#vellumDraftLine)"
                strokeWidth="0.65"
                strokeDasharray="3 4"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.0, ease: "easeInOut" }}
              />

              {/* Horizontal Cross Alignment Lines */}
              <motion.line
                x1="16"
                y1="42"
                x2="184"
                y2="42"
                stroke="url(#vellumDraftLine)"
                strokeWidth="0.6"
                strokeDasharray="2 4"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.8, delay: 0.15 }}
              />
              <motion.line
                x1="24"
                y1="112"
                x2="176"
                y2="112"
                stroke="url(#vellumDraftLine)"
                strokeWidth="0.6"
                strokeDasharray="2 4"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.8, delay: 0.25 }}
              />

              {/* Classical Archival Inscriptions */}
              <g className="text-[5px] font-serif fill-[#d4af37]/60 tracking-widest">
                <text x="24" y="20" textAnchor="start">PL. IV</text>
                <text x="176" y="20" textAnchor="end">SEC. I</text>
                <circle cx="100" cy="232" r="1.2" fill="#d4af37" opacity={0.6} />
              </g>
            </g>
          )}

          {/* ========================================================================= */}
          {/* SHIELD SOLID ARCHIVAL NAVY BODY                                           */}
          {/* ========================================================================= */}
          <motion.path
            d="M 100 18 L 162 26 L 174 44 L 174 112 C 174 172, 138 208, 100 230 C 62 208, 26 172, 26 112 L 26 44 L 38 26 Z"
            fill={isFilled ? "url(#archivalNavyBody)" : "transparent"}
            initial={{ opacity: 0 }}
            animate={{ opacity: isFilled ? 1 : 0 }}
            transition={{ duration: 1.1, ease: "easeInOut" }}
          />

          {/* ========================================================================= */}
          {/* ARCHITECTURAL GOTHIC/NORMAN SHIELD VECTORS (CLEAN, NO STAR, NO TEXT)      */}
          {/* ========================================================================= */}

          {/* 1. Outer Perimeter Contour with Chamfered Upper Shoulders */}
          <motion.path
            d="M 100 18 L 162 26 L 174 44 L 174 112 C 174 172, 138 208, 100 230 C 62 208, 26 172, 26 112 L 26 44 L 38 26 Z"
            stroke={isFilled ? "url(#vintageGoldMetal)" : "url(#goldInkLine)"}
            strokeWidth={isFilled ? 2.4 : 1.4}
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{
              duration: isCompact ? 0.7 : 1.5,
              ease: [0.16, 1, 0.3, 1],
            }}
          />

          {/* 2. Inner Concentric Engraved Border */}
          <motion.path
            d="M 100 32 L 150 38 L 160 52 L 160 112 C 160 160, 130 194, 100 214 C 70 194, 40 160, 40 112 L 40 52 L 50 38 Z"
            stroke={isFilled ? "#c59b27" : "#d4af37"}
            strokeWidth={isFilled ? 1.2 : 0.8}
            strokeDasharray={isFilled ? "none" : "3 3"}
            strokeOpacity={isFilled ? 0.85 : 0.5}
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{
              duration: isCompact ? 0.6 : 1.3,
              ease: "easeInOut",
              delay: isCompact ? 0.1 : 0.25,
            }}
          />
        </svg>
      </motion.div>
    </div>
  );
}
