import React from "react";
import { 
  Shield, 
  Scale, 
  Car, 
  Smartphone, 
  FileCheck2, 
  BookOpen, 
  ArrowRight, 
  CheckCircle2, 
  HelpCircle, 
  FileText, 
  Award,
  ChevronRight
} from "lucide-react";

interface HomeHeroSectionProps {
  onExploreRights: () => void;
  onExploreSituations: () => void;
  onExploreLearning: () => void;
  onOpenBookModal: (volume: "rights" | "goals" | "mission", chapterIndex?: number) => void;
  onNavigateToAbout: () => void;
}

export default function HomeHeroSection({
  onExploreRights,
  onExploreSituations,
  onExploreLearning,
  onOpenBookModal,
  onNavigateToAbout
}: HomeHeroSectionProps) {
  return (
    <section id="home" className="relative pt-6 pb-12 sm:pt-10 sm:pb-16 bg-[#000e26] text-white overflow-hidden border-b border-[#d4af37]/20">
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_#001a4d_0%,_#000c1e_60%,_#00050d_100%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#d4af3708_1px,transparent_1px),linear-gradient(to_bottom,#d4af3708_1px,transparent_1px)] bg-[size:3.5rem_3.5rem] pointer-events-none opacity-40" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12 sm:space-y-16">
        
        {/* A. HERO SECTION */}
        <div className="text-center max-w-3xl mx-auto space-y-5 pt-2 sm:pt-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#d4af37]/15 border border-[#d4af37]/40 text-[#ffd754] text-xs font-mono uppercase tracking-widest shadow-sm">
            <Shield className="w-3.5 h-3.5 text-[#d4af37]" />
            <span>Civic Shield · Citizen Legal Empowerment</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-white tracking-tight leading-tight">
            Know Your Rights. <br className="hidden sm:inline" />
            <span className="text-[#d4af37]">Understand the Law.</span>
          </h1>

          <p className="text-base sm:text-lg text-gray-200 font-light leading-relaxed max-w-2xl mx-auto">
            Clear, practical explanations of the laws that affect everyday life in India.
          </p>

          {/* Primary Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <button
              onClick={onExploreRights}
              className="w-full sm:w-auto px-6 py-3 rounded-lg bg-gradient-to-r from-[#d4af37] to-[#b89423] text-[#001233] font-mono font-bold text-xs uppercase tracking-widest hover:brightness-110 transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer min-h-[44px]"
            >
              <Scale className="w-4 h-4 text-[#001233]" />
              <span>Explore Your Rights</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={onExploreSituations}
              className="w-full sm:w-auto px-6 py-3 rounded-lg bg-[#001a4d] border border-[#d4af37]/40 text-[#ffd754] hover:bg-[#002566] hover:text-white font-mono font-bold text-xs uppercase tracking-widest transition-all flex items-center justify-center gap-2 cursor-pointer min-h-[44px]"
            >
              <Car className="w-4 h-4 text-[#d4af37]" />
              <span>Find Help for a Situation</span>
            </button>
          </div>

          {/* Quick Trust Marker */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-xs text-gray-400 font-mono">
            <span className="flex items-center gap-1.5 text-gray-300">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              Non-Partisan & Free
            </span>
            <span aria-hidden="true" className="text-gray-600 hidden sm:inline">·</span>
            <span className="flex items-center gap-1.5 text-gray-300">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              Supreme Court & Statutory Precedents
            </span>
            <span aria-hidden="true" className="text-gray-600 hidden sm:inline">·</span>
            <span className="flex items-center gap-1.5 text-gray-300">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              Plain-Language Scripts
            </span>
          </div>
        </div>

        {/* B. THREE MAIN ENTRY POINTS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6 max-w-6xl mx-auto">
          
          {/* Entry Point 1 */}
          <div 
            onClick={onExploreRights}
            className="p-6 rounded-xl bg-[#001433] border border-[#d4af37]/25 hover:border-[#d4af37] transition-all group cursor-pointer flex flex-col justify-between space-y-4 shadow-lg hover:shadow-xl hover:bg-[#001940]"
          >
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-lg bg-[#d4af37]/15 border border-[#d4af37]/30 flex items-center justify-center text-[#ffd754] group-hover:scale-105 transition-transform">
                <Scale className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-serif font-bold text-white group-hover:text-[#ffd754] transition-colors">
                1. Know Your Rights
              </h3>
              <p className="text-xs sm:text-sm text-gray-300 font-light leading-relaxed">
                Understand basic legal rights and responsibilities. Learn constitutional safeguards under Articles 14, 19, 21, and 22 in plain everyday terms.
              </p>
            </div>
            <div className="pt-2 flex items-center text-xs font-mono text-[#ffd754] group-hover:translate-x-1 transition-transform">
              <span>Explore Fundamental Rights</span>
              <ChevronRight className="w-4 h-4 ml-1" />
            </div>
          </div>

          {/* Entry Point 2 */}
          <div 
            onClick={onExploreSituations}
            className="p-6 rounded-xl bg-[#001433] border border-[#d4af37]/25 hover:border-[#d4af37] transition-all group cursor-pointer flex flex-col justify-between space-y-4 shadow-lg hover:shadow-xl hover:bg-[#001940]"
          >
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-lg bg-[#d4af37]/15 border border-[#d4af37]/30 flex items-center justify-center text-[#ffd754] group-hover:scale-105 transition-transform">
                <Car className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-serif font-bold text-white group-hover:text-[#ffd754] transition-colors">
                2. Everyday Situations
              </h3>
              <p className="text-xs sm:text-sm text-gray-300 font-light leading-relaxed">
                Explore relevant information for common real-life situations. Get verified scripts for traffic stops, police questioning, phone privacy, and FIRs.
              </p>
            </div>
            <div className="pt-2 flex items-center text-xs font-mono text-[#ffd754] group-hover:translate-x-1 transition-transform">
              <span>View Practical Situations</span>
              <ChevronRight className="w-4 h-4 ml-1" />
            </div>
          </div>

          {/* Entry Point 3 */}
          <div 
            onClick={onExploreLearning}
            className="p-6 rounded-xl bg-[#001433] border border-[#d4af37]/25 hover:border-[#d4af37] transition-all group cursor-pointer flex flex-col justify-between space-y-4 shadow-lg hover:shadow-xl hover:bg-[#001940]"
          >
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-lg bg-[#d4af37]/15 border border-[#d4af37]/30 flex items-center justify-center text-[#ffd754] group-hover:scale-105 transition-transform">
                <BookOpen className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-serif font-bold text-white group-hover:text-[#ffd754] transition-colors">
                3. Learn and Test Yourself
              </h3>
              <p className="text-xs sm:text-sm text-gray-300 font-light leading-relaxed">
                Access learning resources, quizzes and educational activities. Test your legal awareness with interactive scenarios and read the 3-volume Handbook.
              </p>
            </div>
            <div className="pt-2 flex items-center text-xs font-mono text-[#ffd754] group-hover:translate-x-1 transition-transform">
              <span>Take Quiz & Read Handbooks</span>
              <ChevronRight className="w-4 h-4 ml-1" />
            </div>
          </div>

        </div>

        {/* C. FEATURED LEARNING (Compact Cards) */}
        <div className="max-w-6xl mx-auto space-y-4">
          <div className="flex items-center justify-between border-b border-[#d4af37]/20 pb-3">
            <div>
              <span className="text-[11px] font-mono uppercase tracking-widest text-[#d4af37] block">
                Essential Indian Law Topics
              </span>
              <h2 className="text-xl sm:text-2xl font-serif font-bold text-white">
                Featured Everyday Guides
              </h2>
            </div>
            <button
              onClick={onExploreSituations}
              className="text-xs font-mono text-[#ffd754] hover:text-white flex items-center gap-1 transition-colors"
            >
              <span>View all situations</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            
            {/* Feature 1 */}
            <div className="p-4 rounded-lg bg-[#001433]/70 border border-[#d4af37]/20 flex flex-col justify-between space-y-3 hover:border-[#d4af37]/50 transition-colors">
              <div className="space-y-1.5">
                <div className="text-[11px] font-mono text-[#ffd754] uppercase tracking-wider">
                  Traffic Checks
                </div>
                <h4 className="text-sm font-semibold text-white">
                  Roadside Vehicle Inspection
                </h4>
                <p className="text-xs text-gray-300 line-clamp-3 leading-relaxed">
                  Officers cannot snatch your ignition key. DigiLocker records are legally accepted under Rule 139 CMVR.
                </p>
              </div>
              <button
                onClick={onExploreSituations}
                className="text-xs font-mono text-[#d4af37] hover:text-white inline-flex items-center gap-1 pt-1 font-medium"
              >
                Learn more <ArrowRight className="w-3 h-3" />
              </button>
            </div>

            {/* Feature 2 */}
            <div className="p-4 rounded-lg bg-[#001433]/70 border border-[#d4af37]/20 flex flex-col justify-between space-y-3 hover:border-[#d4af37]/50 transition-colors">
              <div className="space-y-1.5">
                <div className="text-[11px] font-mono text-[#ffd754] uppercase tracking-wider">
                  Digital Privacy
                </div>
                <h4 className="text-sm font-semibold text-white">
                  Smartphone Search Limits
                </h4>
                <p className="text-xs text-gray-300 line-clamp-3 leading-relaxed">
                  Article 20(3) and the Puttaswamy privacy judgment prohibit police from forcing you to unlock phones without a warrant.
                </p>
              </div>
              <button
                onClick={onExploreSituations}
                className="text-xs font-mono text-[#d4af37] hover:text-white inline-flex items-center gap-1 pt-1 font-medium"
              >
                Learn more <ArrowRight className="w-3 h-3" />
              </button>
            </div>

            {/* Feature 3 */}
            <div className="p-4 rounded-lg bg-[#001433]/70 border border-[#d4af37]/20 flex flex-col justify-between space-y-3 hover:border-[#d4af37]/50 transition-colors">
              <div className="space-y-1.5">
                <div className="text-[11px] font-mono text-[#ffd754] uppercase tracking-wider">
                  Police Accountability
                </div>
                <h4 className="text-sm font-semibold text-white">
                  Mandatory FIR Registration
                </h4>
                <p className="text-xs text-gray-300 line-clamp-3 leading-relaxed">
                  Supreme Court ruling in Lalita Kumari mandates immediate FIR for cognizable crimes, with clear escalation to SP.
                </p>
              </div>
              <button
                onClick={onExploreSituations}
                className="text-xs font-mono text-[#d4af37] hover:text-white inline-flex items-center gap-1 pt-1 font-medium"
              >
                Learn more <ArrowRight className="w-3 h-3" />
              </button>
            </div>

            {/* Feature 4 */}
            <div className="p-4 rounded-lg bg-[#001433]/70 border border-[#d4af37]/20 flex flex-col justify-between space-y-3 hover:border-[#d4af37]/50 transition-colors">
              <div className="space-y-1.5">
                <div className="text-[11px] font-mono text-[#ffd754] uppercase tracking-wider">
                  Citizen Advocacy
                </div>
                <h4 className="text-sm font-semibold text-white">
                  Self-Representation (Sec 32)
                </h4>
                <p className="text-xs text-gray-300 line-clamp-3 leading-relaxed">
                  Section 32 of Advocates Act grants citizens the right to represent themselves as Party-in-Person in tribunals.
                </p>
              </div>
              <button
                onClick={onExploreRights}
                className="text-xs font-mono text-[#d4af37] hover:text-white inline-flex items-center gap-1 pt-1 font-medium"
              >
                Learn more <ArrowRight className="w-3 h-3" />
              </button>
            </div>

          </div>
        </div>

        {/* D. ABOUT CIVIC SHIELD (Short Introduction) */}
        <div className="max-w-4xl mx-auto p-5 sm:p-6 rounded-xl bg-[#00122e] border border-[#d4af37]/25 flex flex-col sm:flex-row items-center justify-between gap-5">
          <div className="space-y-1.5 text-center sm:text-left">
            <span className="text-[11px] font-mono uppercase tracking-widest text-[#ffd754]">
              About This Initiative
            </span>
            <h3 className="text-base sm:text-lg font-serif font-bold text-white">
              Demystifying the Law for Everyday Citizens
            </h3>
            <p className="text-xs text-gray-300 font-light leading-relaxed max-w-xl">
              Civic Shield is an open legal-literacy initiative. We eliminate fear, bridge the knowledge gap between citizens and authorities, and provide verified procedural safeguards.
            </p>
          </div>
          <button
            onClick={onNavigateToAbout}
            className="shrink-0 px-4 py-2.5 rounded-lg bg-[#001a4d] border border-[#d4af37]/40 hover:bg-[#002566] text-[#ffd754] hover:text-white text-xs font-mono font-semibold transition-all whitespace-nowrap"
          >
            Read Our Mission & Impact
          </button>
        </div>

      </div>
    </section>
  );
}
