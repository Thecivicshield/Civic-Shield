import React, { useState, useEffect, useMemo, useRef } from "react";
import { Search, X, Scale, FileText, HelpCircle, Shield, ArrowRight, BookOpen, AlertCircle } from "lucide-react";

export interface SearchResultItem {
  id: string;
  title: string;
  category: "Right" | "Situation" | "Statute" | "Myth" | "Template" | "Article";
  citation?: string;
  snippet: string;
  targetId: string;
}

interface GlobalSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (targetId: string) => void;
}

const SEARCH_DATABASE: SearchResultItem[] = [
  {
    id: "s-art21",
    title: "Fundamental Right: Protection of Life, Liberty & Due Process",
    category: "Right",
    citation: "Universal Constitutional Due Process & Personal Liberty",
    snippet: "No person shall be deprived of liberty except according to fair procedure established by law. Master shield against arbitrary detention and custodial excess.",
    targetId: "study"
  },
  {
    id: "s-art19",
    title: "Freedom of Speech, Expression & Public Filming",
    category: "Right",
    citation: "Freedom of Speech, Observation & Public Oversight",
    snippet: "All citizens have the right to peaceful expression and recording public officials performing public duties in public spaces without obstruction.",
    targetId: "study"
  },
  {
    id: "s-art14",
    title: "Equality Before Law & Non-Arbitrariness",
    category: "Right",
    citation: "Constitutional Equal Protection Doctrine",
    snippet: "The State cannot deny equality before the law. Protects against selective enforcement, biased demolition, and unfair municipal actions.",
    targetId: "study"
  },
  {
    id: "s-art22",
    title: "Universal 24-Hour Judicial Presentation Mandate",
    category: "Right",
    citation: "Habeas Corpus & Custodial Safeguards",
    snippet: "Every person arrested must be produced before the nearest magistrate or judge within 24 hours of arrest. Prevents secret detention.",
    targetId: "study"
  },
  {
    id: "s-art20-3",
    title: "Protection Against Compelled Self-Incrimination",
    category: "Right",
    citation: "Constitutional Privilege Against Self-Incrimination",
    snippet: "No accused person can be compelled to be a witness against themselves. You cannot be forced to reveal passwords or sign blank confessions.",
    targetId: "study"
  },
  {
    id: "s-legal-aid",
    title: "Right to Appointed Public Defense & Legal Aid",
    category: "Right",
    citation: "Universal Due Process & Statutory Public Defense",
    snippet: "Guarantees that low-income citizens facing charges or detention receive qualified court-appointed legal representation without private fees.",
    targetId: "study"
  },
  {
    id: "s-traffic",
    title: "Roadside Vehicle Stops & Administrative Safeguards",
    category: "Situation",
    citation: "Vehicle Stop Standards & Key Protection",
    snippet: "Officers cannot arbitrarily seize your ignition key. Certified digital documents and valid credentials must be respected.",
    targetId: "justice-shield"
  },
  {
    id: "s-phone",
    title: "Digital Device Privacy & Smartphone Searches",
    category: "Situation",
    citation: "Digital Sanctity & Search Warrant Doctrine",
    snippet: "Officers cannot force you to unlock your smartphone or scroll chats during routine stops without a judicial warrant or documented memo.",
    targetId: "justice-shield"
  },
  {
    id: "s-fir",
    title: "Mandatory Crime Incident Registration & Non-Refusal",
    category: "Situation",
    citation: "Duty of Official Recordation & Reporting Standards",
    snippet: "Formal registration is mandatory for serious offenses. If refused, escalate in writing to supervisory officials or judicial magistrates.",
    targetId: "justice-shield"
  },
  {
    id: "s-prose",
    title: "Representing Yourself as Party-in-Person (Pro-Se)",
    category: "Situation",
    citation: "Inherent Right to Self-Advocacy",
    snippet: "You have an inherent right to appear and represent yourself in consumer, civil, and municipal tribunals without hiring private advocates.",
    targetId: "evidence"
  },
  {
    id: "s-demolition",
    title: "Municipal Notices & Unauthorized Demolitions",
    category: "Situation",
    citation: "Principles of Natural Justice & Audi Alteram Partem",
    snippet: "Authorities must issue a clear Show-Cause notice with reasonable time to respond before taking coercive action against property.",
    targetId: "evidence"
  },
  {
    id: "s-myth-filming",
    title: "Myth: Is recording police officers on duty illegal?",
    category: "Myth",
    citation: "Public Oversight & Freedom of Information",
    snippet: "Recording public servants in public view is fully legal provided you do not physically obstruct them or breach designated security cordons.",
    targetId: "justice-shield"
  },
  {
    id: "s-myth-aid-fees",
    title: "Myth: Can legal aid lawyers charge private consultation fees?",
    category: "Myth",
    citation: "Universal Public Defense Regulations",
    snippet: "No. Statutory legal aid is entirely free to eligible persons. Demanding private payments constitutes professional misconduct.",
    targetId: "justice-shield"
  },
  {
    id: "s-template-roadside",
    title: "Citizen Roadside Rights Pocket Guide (PDF)",
    category: "Template",
    citation: "Evidence Locker Resource",
    snippet: "Downloadable pocket card with exact legal citations and polite verbal scripts for vehicle checkpoints.",
    targetId: "evidence"
  },
  {
    id: "s-template-rti",
    title: "Public Records Audit Master Filing Kit",
    category: "Template",
    citation: "Freedom of Information Filing Kit",
    snippet: "Standardized templates, fee calculation guidelines, and appeals formats for auditing municipal records.",
    targetId: "evidence"
  },
  {
    id: "s-article-traffic",
    title: "How to Safely Handle Roadside Traffic Inspections",
    category: "Article",
    citation: "Campaign Dispatches",
    snippet: "Step-by-step practical advice on staying calm, knowing the officer's limits, and asking if you are being detained.",
    targetId: "blog"
  }
];

export default function GlobalSearchModal({ isOpen, onClose, onNavigate }: GlobalSearchModalProps) {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery("");
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        if (isOpen) onClose();
        else {
          // Trigger open via custom event or parent
          window.dispatchEvent(new CustomEvent("open-global-search"));
        }
      }
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  const filteredResults = useMemo(() => {
    if (!query.trim()) {
      return SEARCH_DATABASE.slice(0, 6);
    }
    const q = query.toLowerCase().trim();
    return SEARCH_DATABASE.filter(item => 
      item.title.toLowerCase().includes(q) ||
      item.snippet.toLowerCase().includes(q) ||
      (item.citation && item.citation.toLowerCase().includes(q)) ||
      item.category.toLowerCase().includes(q)
    );
  }, [query]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-start justify-center pt-16 sm:pt-24 px-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-150">
      <div 
        className="w-full max-w-2xl bg-[#001026] border border-[#d4af37]/35 rounded-xl shadow-2xl overflow-hidden flex flex-col max-h-[80vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="flex items-center gap-3 px-4 py-3.5 border-b border-[#d4af37]/20 bg-[#001433]">
          <Search className="w-5 h-5 text-[#d4af37] shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search rights, everyday situations, statutes, templates, or myths..."
            className="flex-1 bg-transparent text-sm sm:text-base text-white placeholder-gray-400 outline-none font-sans"
          />
          {query && (
            <button 
              onClick={() => setQuery("")}
              className="text-gray-400 hover:text-white p-1 rounded transition-colors"
              aria-label="Clear search"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="text-xs font-mono text-[#d4af37] px-2 py-1 rounded border border-[#d4af37]/30 hover:bg-[#d4af37]/10 transition-colors"
          >
            ESC
          </button>
        </div>

        {/* Results List */}
        <div className="overflow-y-auto p-3 sm:p-4 divide-y divide-[#d4af37]/10">
          <div className="px-2 pb-2 text-[11px] font-mono uppercase tracking-wider text-gray-400 flex justify-between items-center">
            <span>{query ? `Found ${filteredResults.length} matching topics` : "Popular Topics & Common Searches"}</span>
            <span className="hidden sm:inline">Press ESC to exit</span>
          </div>

          {filteredResults.length === 0 ? (
            <div className="py-12 text-center text-gray-400 space-y-2">
              <AlertCircle className="w-8 h-8 text-amber-400/80 mx-auto" />
              <p className="text-sm font-medium text-gray-200">No matching legal topics found</p>
              <p className="text-xs text-gray-400 max-w-sm mx-auto">
                Try searching for simple everyday terms like "police stop", "phone", "FIR", "recording", "Article 21", or "legal aid".
              </p>
            </div>
          ) : (
            filteredResults.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  onNavigate(item.targetId);
                  onClose();
                }}
                className="w-full text-left py-3 px-3 rounded-lg hover:bg-[#001d4a] transition-colors group flex items-start justify-between gap-3"
              >
                <div className="space-y-1 min-w-0 flex-1">
                  <div className="flex items-center gap-2 text-xs">
                    <span className="font-mono text-[#ffd754] font-semibold">
                      {item.category}
                    </span>
                    {item.citation && (
                      <>
                        <span className="text-gray-500" aria-hidden="true">·</span>
                        <span className="text-gray-400 truncate">{item.citation}</span>
                      </>
                    )}
                  </div>
                  <h4 className="text-sm font-semibold text-white group-hover:text-[#ffd754] transition-colors">
                    {item.title}
                  </h4>
                  <p className="text-xs text-gray-300 line-clamp-2 leading-relaxed">
                    {item.snippet}
                  </p>
                </div>
                <div className="shrink-0 pt-1 text-gray-400 group-hover:text-[#ffd754] group-hover:translate-x-0.5 transition-all">
                  <ArrowRight className="w-4 h-4" />
                </div>
              </button>
            ))
          )}
        </div>

        {/* Footer Hint */}
        <div className="px-4 py-2.5 bg-[#000c1e] border-t border-[#d4af37]/20 flex items-center justify-between text-[11px] text-gray-400 font-mono">
          <span>Civic Shield Legal Knowledge Base</span>
          <span className="text-[#ffd754]">Verified Indian Statutes & Case Precedents</span>
        </div>
      </div>
    </div>
  );
}
