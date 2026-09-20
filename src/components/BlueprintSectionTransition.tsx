import React from "react";
import { motion } from "motion/react";
import CivicShieldBlueprintLogo from "./CivicShieldBlueprintLogo";

interface BlueprintSectionTransitionProps {
  label?: string;
  articleReference?: string;
  className?: string;
}

export default function BlueprintSectionTransition({
  label = "CONSTITUTIONAL JURISPRUDENCE",
  articleReference = "ARTICLE 21 • SOVEREIGN SAFEGUARD",
  className = "",
}: BlueprintSectionTransitionProps) {
  return (
    <div
      className={`relative py-8 sm:py-10 flex flex-col items-center justify-center overflow-hidden select-none ${className}`}
    >
      {/* Horizontal Classical Gold Hairline Guideline */}
      <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex items-center justify-center pointer-events-none">
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          whileInView={{ scaleX: 1, opacity: 1 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-4xl h-[1px] bg-gradient-to-r from-transparent via-[#d4af37]/35 to-transparent"
        />
      </div>

      {/* Central Archival Seal Badge */}
      <motion.div
        initial={{ opacity: 0, scale: 0.92, y: 10 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 flex flex-col items-center gap-1.5 bg-[#020a1a]/95 border border-[#d4af37]/30 px-5 py-2.5 rounded-sm shadow-[0_4px_20px_rgba(0,0,0,0.8)] backdrop-blur-md"
      >
        {/* Miniature Drafted Shield */}
        <CivicShieldBlueprintLogo
          size="sm"
          mode="compact"
          autoFillDelay={600}
          showConstructionGuides={false}
          interactive={false}
          className="my-0.5"
        />

        <div className="text-center space-y-0.5">
          <div className="text-[9.5px] font-serif uppercase tracking-[0.25em] text-[#e5c158] font-semibold">
            {label}
          </div>
          <div className="text-[8px] font-serif uppercase tracking-[0.18em] text-[#d4af37]/65">
            {articleReference}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
