import React from "react";
import { 
  Shield, 
  BookOpen, 
  Scale, 
  FolderLock, 
  ShieldAlert, 
  HelpCircle, 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  Compass, 
  ScrollText, 
  FileCheck2,
  Users
} from "lucide-react";
import { motion } from "motion/react";
import CivicBookshelf from "./CivicBookshelf";

interface IntroductionSectionProps {
  onOpenBookModal: (bookId: "rights" | "goals" | "mission", chapterIndex?: number) => void;
  onNavigateToStudy: () => void;
  onNavigateToVault: () => void;
}

export default function IntroductionSection({
  onOpenBookModal,
  onNavigateToStudy,
  onNavigateToVault
}: IntroductionSectionProps) {
  return (
    <section 
      id="introduction" 
      className="relative pt-24 pb-16 md:pt-32 md:pb-24 bg-[#001026] text-white overflow-hidden border-b border-[#d4af37]/25"
    >
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_#001a4d_0%,_#000c1e_60%,_#00050d_100%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#d4af3708_1px,transparent_1px),linear-gradient(to_bottom,#d4af3708_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none opacity-50" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-16">
        
        {/* TOP HERO & IDENTITY BLOCK */}
        <div className="text-center max-w-4xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#d4af37]/15 border border-[#d4af37]/40 text-[#ffd754] text-xs font-mono tracking-widest uppercase shadow-[0_0_20px_rgba(212,175,55,0.15)]">
            <Shield className="w-3.5 h-3.5 text-[#d4af37]" />
            CIVIC SHIELD // CITIZEN LEGAL EMPOWERMENT
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold text-white tracking-tight leading-tight">
            Know Your Law. <br className="hidden sm:inline" />
            <span className="text-[#d4af37] italic">Stand In Your Rights.</span>
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-gray-200 font-light leading-relaxed max-w-3xl mx-auto">
            Demystifying state authority, eliminating fear during police stops, and equipping every citizen 
            with verified procedural armor, constitutional protections, and practical statutory clarity.
          </p>

          {/* Quick Action Navigation CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 pt-2 w-full max-w-md sm:max-w-none mx-auto">
            <button
              onClick={onNavigateToStudy}
              className="w-full sm:w-auto px-6 py-3.5 rounded-lg bg-gradient-to-r from-[#d4af37] to-[#b89423] text-[#001233] font-mono font-bold text-xs uppercase tracking-widest hover:brightness-110 transition-all duration-200 shadow-lg shadow-[#d4af37]/20 flex items-center justify-center gap-2 cursor-pointer min-h-[48px]"
            >
              <Scale className="w-4 h-4 text-[#001233]" />
              <span>Enter Study Curriculum</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={onNavigateToVault}
              className="w-full sm:w-auto px-6 py-3.5 rounded-lg bg-[#001a4d]/80 border border-[#d4af37]/40 text-[#ffd754] hover:bg-[#002366] font-mono font-bold text-xs uppercase tracking-widest transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer min-h-[48px]"
            >
              <FolderLock className="w-4 h-4 text-[#d4af37]" />
              <span>Open Evidence Vault</span>
            </button>
          </div>
        </div>

        {/* 2-COLUMN STRUCTURE: What the Project Is & Its Purpose */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          
          {/* Card 1: What the Project Is */}
          <div className="p-6 sm:p-8 rounded-xl bg-[#001433]/80 border border-[#d4af37]/20 shadow-xl backdrop-blur-md space-y-4">
            <div className="w-10 h-10 rounded-lg bg-[#d4af37]/15 border border-[#d4af37]/30 flex items-center justify-center text-[#d4af37]">
              <Compass className="w-5 h-5" />
            </div>
            <h3 className="text-xl font-serif font-bold text-white tracking-wide">
              What Is Civic Shield?
            </h3>
            <p className="text-sm text-gray-300 font-light leading-relaxed">
              Civic Shield is an open, non-partisan citizen legal education and procedural empowerment initiative. 
              We translate dense criminal statutes, constitutional articles, and landmark Supreme Court rulings 
              into plain, actionable protocols that any citizen can cite with calm composure during real encounters.
            </p>
            <div className="pt-2 flex items-center gap-2 text-xs font-mono text-[#ffd754]">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>Strictly Non-Partisan & Constitutionally Anchored</span>
            </div>
          </div>

          {/* Card 2: Its Purpose */}
          <div className="p-6 sm:p-8 rounded-xl bg-[#001433]/80 border border-[#d4af37]/20 shadow-xl backdrop-blur-md space-y-4">
            <div className="w-10 h-10 rounded-lg bg-[#d4af37]/15 border border-[#d4af37]/30 flex items-center justify-center text-[#d4af37]">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <h3 className="text-xl font-serif font-bold text-white tracking-wide">
              Our Core Purpose
            </h3>
            <p className="text-sm text-gray-300 font-light leading-relaxed">
              When citizens encounter law enforcement, anxiety and panic stem from procedural blindness—not knowing 
              what officers may lawfully do and where statutory limits begin. Our purpose is to eliminate fear, 
              prevent arbitrary coercion, and replace confrontation with procedural mastery.
            </p>
            <div className="pt-2 flex items-center gap-2 text-xs font-mono text-[#ffd754]">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>Democratizing Due Process for Every Citizen</span>
            </div>
          </div>

        </div>

        {/* SECTION: WHAT USERS CAN DO ON THIS WEBSITE */}
        <div className="max-w-5xl mx-auto space-y-6">
          <div className="text-center space-y-2">
            <span className="text-xs font-mono uppercase tracking-widest text-[#d4af37]">
              Interactive System Overview
            </span>
            <h3 className="text-2xl sm:text-3xl font-serif font-bold text-white">
              What You Can Do on Civic Shield
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            
            {/* Action 1 */}
            <div 
              onClick={onNavigateToStudy}
              className="p-5 rounded-lg bg-[#000e26] border border-[#d4af37]/20 hover:border-[#d4af37]/60 transition-all duration-200 cursor-pointer group space-y-2.5 shadow-md"
            >
              <div className="w-8 h-8 rounded bg-[#d4af37]/10 flex items-center justify-center text-[#d4af37] group-hover:bg-[#d4af37] group-hover:text-[#001233] transition-colors">
                <Scale className="w-4 h-4" />
              </div>
              <h4 className="text-base font-serif font-bold text-white group-hover:text-[#ffd754] transition-colors">
                1. Study Rules & Rights
              </h4>
              <p className="text-xs text-gray-400 leading-relaxed font-light">
                Master 20 verified modules: fundamental rights, police arrest rules, traffic regulations, and citizen responsibilities.
              </p>
              <span className="inline-flex items-center gap-1 text-[11px] font-mono text-[#d4af37] group-hover:translate-x-1 transition-transform">
                Open Study <ArrowRight className="w-3 h-3" />
              </span>
            </div>

            {/* Action 2 */}
            <div 
              onClick={() => onOpenBookModal("rights")}
              className="p-5 rounded-lg bg-[#000e26] border border-[#d4af37]/20 hover:border-[#d4af37]/60 transition-all duration-200 cursor-pointer group space-y-2.5 shadow-md"
            >
              <div className="w-8 h-8 rounded bg-[#d4af37]/10 flex items-center justify-center text-[#d4af37] group-hover:bg-[#d4af37] group-hover:text-[#001233] transition-colors">
                <BookOpen className="w-4 h-4" />
              </div>
              <h4 className="text-base font-serif font-bold text-white group-hover:text-[#ffd754] transition-colors">
                2. Read the 3 Books
              </h4>
              <p className="text-xs text-gray-400 leading-relaxed font-light">
                Access the complete 3-volume library: Handbook of Rights, Strategic Goals, and Mission & Genesis right here below.
              </p>
              <span className="inline-flex items-center gap-1 text-[11px] font-mono text-[#d4af37] group-hover:translate-x-1 transition-transform">
                Browse Books <ArrowRight className="w-3 h-3" />
              </span>
            </div>

            {/* Action 3 */}
            <div 
              onClick={onNavigateToVault}
              className="p-5 rounded-lg bg-[#000e26] border border-[#d4af37]/20 hover:border-[#d4af37]/60 transition-all duration-200 cursor-pointer group space-y-2.5 shadow-md"
            >
              <div className="w-8 h-8 rounded bg-[#d4af37]/10 flex items-center justify-center text-[#d4af37] group-hover:bg-[#d4af37] group-hover:text-[#001233] transition-colors">
                <FolderLock className="w-4 h-4" />
              </div>
              <h4 className="text-base font-serif font-bold text-white group-hover:text-[#ffd754] transition-colors">
                3. Inspect the Vault
              </h4>
              <p className="text-xs text-gray-400 leading-relaxed font-light">
                Review unsealed civil encounter records, formal FIR documentation, and public accountability dossiers.
              </p>
              <span className="inline-flex items-center gap-1 text-[11px] font-mono text-[#d4af37] group-hover:translate-x-1 transition-transform">
                Open Vault <ArrowRight className="w-3 h-3" />
              </span>
            </div>

            {/* Action 4 */}
            <div 
              onClick={() => {
                const el = document.getElementById("justice-shield");
                if (el) el.scrollIntoView({ behavior: "smooth" });
              }}
              className="p-5 rounded-lg bg-[#000e26] border border-[#d4af37]/20 hover:border-[#d4af37]/60 transition-all duration-200 cursor-pointer group space-y-2.5 shadow-md"
            >
              <div className="w-8 h-8 rounded bg-[#d4af37]/10 flex items-center justify-center text-[#d4af37] group-hover:bg-[#d4af37] group-hover:text-[#001233] transition-colors">
                <HelpCircle className="w-4 h-4" />
              </div>
              <h4 className="text-base font-serif font-bold text-white group-hover:text-[#ffd754] transition-colors">
                4. Scenario Shield
              </h4>
              <p className="text-xs text-gray-400 leading-relaxed font-light">
                Test real-world encounters against statutory myths, verify police powers, and test your procedural reflexes.
              </p>
              <span className="inline-flex items-center gap-1 text-[11px] font-mono text-[#d4af37] group-hover:translate-x-1 transition-transform">
                Test Scenarios <ArrowRight className="w-3 h-3" />
              </span>
            </div>

          </div>
        </div>

        {/* BRIEF INTRODUCTION TO THE PROJECT (Not a separate About Us page) */}
        <div className="max-w-4xl mx-auto p-6 sm:p-8 rounded-xl bg-[#000a1a]/70 border border-white/10 space-y-3 text-center sm:text-left">
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-[#d4af37]/10 border border-[#d4af37]/30 flex items-center justify-center text-[#d4af37] shrink-0">
              <ScrollText className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-lg font-serif font-bold text-white">
                Brief Introduction to the Civic Shield Project
              </h4>
              <p className="text-xs sm:text-sm text-gray-300 font-light leading-relaxed mt-1">
                Civic Shield was established to resolve a fundamental contradiction in democratic life: while citizens possess 
                robust constitutional protections under Article 21, these rights often fail during high-stress street interactions 
                because individuals lack concrete procedural knowledge. By converting statutes into concise, unambiguous scripts 
                and standardized rules, Civic Shield ensures that every person can assert their lawful dignity without fear.
              </p>
            </div>
          </div>
        </div>

        {/* THE BOOKS CONNECTED TO THE PROJECT: KEPT IN THIS ONE SECTION ONLY */}
        <div className="pt-8 border-t border-[#d4af37]/20">
          <div className="text-center max-w-2xl mx-auto mb-6 space-y-2">
            <span className="text-xs font-mono uppercase tracking-widest text-[#d4af37]">
              Civic Shield Publications & Resources
            </span>
            <h3 className="text-2xl sm:text-3xl font-serif font-bold text-white">
              The 3 Official Civic Volumes
            </h3>
            <p className="text-xs sm:text-sm text-gray-300 font-light">
              Access the complete archive in our interactive reader. All publications are housed in this library stand only.
            </p>
          </div>

          {/* Mount the Bookshelf right here */}
          <CivicBookshelf onOpenBook={onOpenBookModal} />
        </div>

      </div>
    </section>
  );
}
