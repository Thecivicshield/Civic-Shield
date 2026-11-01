import React, { useState, useMemo } from "react";
import { 
  AlertCircle, 
  CheckCircle, 
  HelpCircle, 
  Sparkles, 
  Search, 
  Plus, 
  Trash2, 
  Edit3, 
  Check, 
  Copy, 
  ChevronDown, 
  ChevronUp, 
  Scale, 
  ShieldAlert, 
  BookOpen, 
  Lock, 
  Eye,
  X
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { playSynthSound } from "./JusticeShieldSection";

export interface CivicMisconception {
  question: string;
  myth: string;
  answerOnTrue: string;
  category?: "police" | "arrest" | "privacy" | "property" | "courts" | "general";
  statuteRef?: string;
  landmarkCase?: string;
  citizenScript?: string;
}

interface MythbustersSectionProps {
  myths?: CivicMisconception[];
  isAdmin: boolean;
  onUpdateMyths?: (nextMyths: CivicMisconception[]) => void;
}

export const COMPREHENSIVE_DEFAULT_MYTHS: CivicMisconception[] = [
  {
    question: "Are citizens legally permitted to record video of police officers or public officials performing duty in public spaces?",
    myth: "MYTH: Police officers can prohibit public recording using verbal orders, national security claims, or privacy objections.",
    answerOnTrue: "Recording public servants discharging official duty in a public place is a protected constitutional freedom under Article 19(1)(a) (freedom of speech, observation, and information). As long as you maintain a safe physical distance and do not obstruct official duties, no officer possesses lawful authority to snatch your phone, demand deletion of footage, or detain you for recording.",
    category: "police",
    statuteRef: "Article 19(1)(a), Constitution of India / Police Acts Regulations",
    landmarkCase: "D.K. Basu Directives & Ministry of Home Affairs Circulars",
    citizenScript: "“Officer, I am standing peacefully in a public space 10 feet away exercising my Article 19 rights. I am not obstructing your duty and intend to cooperate fully.”"
  },
  {
    question: "Can an officer force you to unlock your smartphone or disclose passcodes during a routine stop or checkpoint?",
    myth: "MYTH: Refusing to unlock your smartphone or WhatsApp chats during a stop constitutes obstruction of justice.",
    answerOnTrue: "Under Article 20(3) (Protection Against Self-Incrimination) and Article 21 (Right to Privacy), you cannot be compelled to surrender passwords, PINs, or biometrics to routine police patrols without a specific judicial search warrant or formal written panchnama. Routine stops hold zero legal authority to conduct digital search excursions.",
    category: "privacy",
    statuteRef: "Article 20(3) & Article 21, Constitution of India",
    landmarkCase: "Justice K.S. Puttaswamy (Retd.) v. Union of India (2017) 10 SCC 1",
    citizenScript: "“Officer, under Article 20(3) and the Puttaswamy privacy judgment, I decline to disclose my device passcode without a judicial warrant or written seizure memo.”"
  },
  {
    question: "Can a police station refuse to register a First Information Report (FIR) because the crime occurred outside their jurisdiction?",
    myth: "MYTH: A police station can turn you away and instruct you to travel to another police station across town.",
    answerOnTrue: "Under Section 154 CrPC (and Section 173 of the BNSS, 2024), any police station in the country MUST immediately register a 'Zero FIR' for any cognizable offense, regardless of territorial jurisdiction. The station must accept the complaint, assign a Zero FIR number, initiate immediate investigation/medical aid if necessary, and transfer the case to the appropriate jurisdiction.",
    category: "police",
    statuteRef: "Section 173 BNSS, 2024 / Section 154 CrPC",
    landmarkCase: "Lalita Kumari v. Govt of UP (2014) 2 SCC 1 (Constitution Bench)",
    citizenScript: "“Officer, under the Lalita Kumari Supreme Court ruling and statutory rules, registration of a Zero FIR for a cognizable offense is mandatory. Refusal attracts Section 199 IPC / Sec 198 BNS.”"
  },
  {
    question: "Can women be arrested or interrogated at a police station after sunset and before sunrise?",
    myth: "MYTH: Police can arrest female suspects at any hour of the night as long as male officers are accompanied by a female constable.",
    answerOnTrue: "Under Section 46(4) of the CrPC (and Sec 43(5) BNSS, 2024), no woman shall be arrested after sunset and before sunrise except in exceptional circumstances with prior written permission obtained from the Judicial Magistrate of the First Class. Furthermore, arrests of women must be conducted exclusively by female police officers.",
    category: "arrest",
    statuteRef: "Section 46(4) CrPC / Section 43(5) BNSS, 2024",
    landmarkCase: "Christian Community Welfare Council of India v. State of Maharashtra",
    citizenScript: "“Officer, under Section 46(4) CrPC, a woman cannot be arrested after sunset without prior written permission from a Judicial Magistrate. We request compliance with statutory safeguards.”"
  },
  {
    question: "Are police legally allowed to handcuff an arrested person automatically as a matter of routine procedure?",
    myth: "MYTH: Handcuffing is mandatory and routine for all suspects upon arrest.",
    answerOnTrue: "The Supreme Court has repeatedly held that routine handcuffing is inhumane, violates Article 21 personal dignity, and is strictly prohibited. Handcuffs can only be used when there is clear, documented evidence of violent propensity or an active escape risk, and the reasons must be recorded in the police station diary and presented to the magistrate.",
    category: "arrest",
    statuteRef: "Article 21, Constitution of India / D.K. Basu Precedents",
    landmarkCase: "Prem Shankar Shukla v. Delhi Administration (1980) 3 SCC 526",
    citizenScript: "“Officer, under Prem Shankar Shukla v. Delhi Administration, routine handcuffing violates Article 21 unless specific judicial reasons of violent escape are recorded.”"
  },
  {
    question: "Can court-appointed public defense advocates or legal aid lawyers demand private fees or cash from you?",
    myth: "MYTH: State legal aid is merely a referral service and citizens must pay private honorariums under the table.",
    answerOnTrue: "Legal aid provided by the State Legal Services Authority (SLSA) or District Legal Services Authority (DLSA) is 100% free of charge. Court-appointed lawyers are compensated exclusively by the government. Demanding or accepting private fees, cash, or gifts from a legal aid client is illegal and constitutes professional misconduct warranting immediate disbarment.",
    category: "courts",
    statuteRef: "Section 12, Legal Services Authorities Act, 1987 / Article 39A",
    landmarkCase: "Hussainara Khatoon v. Home Secretary, State of Bihar (1979)",
    citizenScript: "“I am represented under the Legal Services Authorities Act. Demanding private honorarium is prohibited by statutory bar; all fees are settled directly with the DLSA.”"
  },
  {
    question: "Can municipal or administrative authorities demolish or seal property immediately without a prior written notice?",
    myth: "MYTH: Municipal corporations possess summary power to bulldoze or seal structures overnight without hearings.",
    answerOnTrue: "Under the Principles of Natural Justice (Audi Alteram Partem) and Article 300A/21, no administrative agency can demolish or seal property without issuing a formal written Show-Cause notice specifying alleged infractions and providing a reasonable statutory window (minimum 15 days) to submit documents and be heard.",
    category: "property",
    statuteRef: "Municipal Corporation Acts / Article 300A & Article 21",
    landmarkCase: "Olga Tellis v. Bombay Municipal Corporation (1985) 3 SCC 545",
    citizenScript: "“Where is the certified copy of the written Show-Cause notice and the speaking order? Natural justice mandates notice and hearing before any enforcement action.”"
  },
  {
    question: "Can a traffic police officer remove your vehicle ignition keys or deflate your tyres during an inspection?",
    myth: "MYTH: Traffic police have the legal right to snatch your bike or car keys to prevent you from driving off.",
    answerOnTrue: "Under the Motor Vehicles Act and Central Motor Vehicle Rules, traffic police officers have zero statutory power to snatch ignition keys, turn off your engine forcefully, or deflate your tyres. Officers below Sub-Inspector rank cannot even seize original licenses or impound vehicles for routine infractions.",
    category: "police",
    statuteRef: "Section 130 & 206, Motor Vehicles Act, 1988",
    landmarkCase: "Police Standing Orders & State High Court Directives",
    citizenScript: "“Officer, under Motor Vehicles Act rules, removing ignition keys or deflating tyres is unauthorized. I am fully stopped and cooperating with your inspection.”"
  },
  {
    question: "Is bail a privilege that police or judges can arbitrarily deny for minor non-violent offenses?",
    myth: "MYTH: Police can keep you locked up indefinitely for any complaint filed against you.",
    answerOnTrue: "The bedrock principle of criminal jurisprudence is 'Bail is the rule, jail is the exception.' For bailable offenses, bail is an absolute statutory right that the police must grant on furnishing bond. For offenses punishable by less than 7 years, arrest itself is prohibited unless specific necessity conditions are met.",
    category: "arrest",
    statuteRef: "Section 436 CrPC / Section 41A CrPC (Sec 35 BNSS, 2024)",
    landmarkCase: "Arnesh Kumar v. State of Bihar (2014) 8 SCC 273",
    citizenScript: "“Officer, for offenses punishable with under 7 years imprisonment, the Arnesh Kumar Supreme Court guidelines mandate notice under Sec 41A instead of mechanical arrest.”"
  },
  {
    question: "Can police compel you to give a confession statement during custody or sign blank sheets of paper?",
    myth: "MYTH: Statements made to police in custody are binding confessions in a court of law.",
    answerOnTrue: "Under Section 25 of the Indian Evidence Act (and Section 23 of the Bharatiya Sakshya Adhiniyam, 2024), any confession made to a police officer in custody is legally void and inadmissible as evidence against the accused. Coercing a signature on blank papers or forced verbal confessions carry zero evidentiary weight in court.",
    category: "courts",
    statuteRef: "Section 23, BSA 2024 / Section 25 Indian Evidence Act / Article 20(3)",
    landmarkCase: "Nandini Satpathy v. P.L. Dani (1978) 2 SCC 424",
    citizenScript: "“On advice of legal counsel, I exercise my constitutional right to silence under Article 20(3) and decline to sign any unverified or blank document in custody.”"
  },
  {
    question: "Can a Public Information Officer (PIO) verbally reject a Right to Information (RTI) application?",
    myth: "MYTH: If an officer verbally says information is confidential, you cannot inspect public documents.",
    answerOnTrue: "A PIO cannot verbally reject an RTI request. Any rejection must be in writing within 30 days, quoting the exact statutory exemption clause under Section 8 of the RTI Act. If the PIO fails to respond within 30 days, information must be provided free of cost, and the officer faces personal fines of ₹250 per day up to ₹25,000 under Section 20.",
    category: "general",
    statuteRef: "Section 7(1), Section 8, and Section 20, RTI Act, 2005",
    landmarkCase: "Central Board of Secondary Education v. Aditya Bandopadhyay (2011)",
    citizenScript: "“Under Section 7 of the RTI Act, rejection cannot be verbal. Please issue a written decision specifying the statutory exemption under Section 8 within 30 days.”"
  },
  {
    question: "Can an officer arrest you without stating the specific grounds of arrest or showing an arrest memo?",
    myth: "MYTH: Police can arrest you first and explain the charges in court several days later.",
    answerOnTrue: "Under Article 22(1) and Section 50 CrPC (Sec 47 BNSS, 2024), police MUST communicate full particulars of the offense or grounds of arrest immediately at the time of arrest. They are required to prepare a formal Arrest Memo signed by at least one family member or respectable local witness, and inform a friend or relative immediately.",
    category: "arrest",
    statuteRef: "Article 22(1), Constitution of India / Sec 47 BNSS, 2024",
    landmarkCase: "D.K. Basu v. State of West Bengal (1997) 1 SCC 416",
    citizenScript: "“Officer, under Article 22(1) and D.K. Basu rules, I have the constitutional right to know the specific grounds of arrest and request preparation of an Arrest Memo.”"
  }
];

export default function MythbustersSection({
  myths: propMyths,
  isAdmin,
  onUpdateMyths
}: MythbustersSectionProps) {
  const myths = propMyths && propMyths.length > 0 ? propMyths : COMPREHENSIVE_DEFAULT_MYTHS;

  // Search and Category Filters
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  // EXPANDABLE STATE: CLOSED BY DEFAULT!
  // Empty object/record means all myth cards start closed!
  const [expandedIndices, setExpandedIndices] = useState<Record<number, boolean>>({});
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);

  // Admin Editing State
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [newMythForm, setNewMythForm] = useState<CivicMisconception>({
    question: "",
    myth: "",
    answerOnTrue: "",
    category: "police",
    statuteRef: "",
    landmarkCase: "",
    citizenScript: ""
  });

  const categories = [
    { id: "all", label: "All Misconceptions" },
    { id: "police", label: "Police & Stops" },
    { id: "arrest", label: "Arrest & Bail" },
    { id: "privacy", label: "Digital Privacy" },
    { id: "property", label: "Property & Municipal" },
    { id: "courts", label: "Courts & Legal Aid" },
    { id: "general", label: "General Rights" }
  ];

  // Filtered myths
  const filteredMyths = useMemo(() => {
    return myths.map((item, originalIndex) => ({ item, originalIndex })).filter(({ item }) => {
      const matchesCategory = selectedCategory === "all" || item.category === selectedCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch = !q || 
        item.question.toLowerCase().includes(q) ||
        item.myth.toLowerCase().includes(q) ||
        item.answerOnTrue.toLowerCase().includes(q) ||
        (item.statuteRef && item.statuteRef.toLowerCase().includes(q)) ||
        (item.landmarkCase && item.landmarkCase.toLowerCase().includes(q)) ||
        (item.citizenScript && item.citizenScript.toLowerCase().includes(q));

      return matchesCategory && matchesSearch;
    });
  }, [myths, selectedCategory, searchQuery]);

  const handleToggleExpand = (originalIdx: number) => {
    try {
      playSynthSound("click");
    } catch (e) {}
    setExpandedIndices(prev => ({
      ...prev,
      [originalIdx]: !prev[originalIdx]
    }));
  };

  const handleExpandAll = () => {
    const next: Record<number, boolean> = {};
    filteredMyths.forEach(({ originalIndex }) => {
      next[originalIndex] = true;
    });
    setExpandedIndices(next);
  };

  const handleCollapseAll = () => {
    setExpandedIndices({});
  };

  const handleCopyScript = (script: string, idx: number) => {
    try {
      navigator.clipboard.writeText(script);
      setCopiedIdx(idx);
      setTimeout(() => setCopiedIdx(null), 2000);
    } catch (e) {}
  };

  const handleSaveEdit = (idx: number, updated: CivicMisconception) => {
    if (!onUpdateMyths) return;
    const next = [...myths];
    next[idx] = updated;
    onUpdateMyths(next);
    setEditingIndex(null);
  };

  const handleDeleteMyth = (idx: number) => {
    if (!onUpdateMyths) return;
    if (confirm(`Permanently remove Misconception #${idx + 1}?`)) {
      const next = myths.filter((_, i) => i !== idx);
      onUpdateMyths(next);
      if (editingIndex === idx) setEditingIndex(null);
    }
  };

  const handleCreateNew = () => {
    if (!onUpdateMyths || !newMythForm.question.trim()) return;
    const next = [newMythForm, ...myths];
    onUpdateMyths(next);
    setIsAddingNew(false);
    setNewMythForm({
      question: "",
      myth: "",
      answerOnTrue: "",
      category: "police",
      statuteRef: "",
      landmarkCase: "",
      citizenScript: ""
    });
  };

  return (
    <div id="mythbusters-section" className="space-y-8 text-left font-sans">
      
      {/* 1. SECTION BANNER & PURPOSE */}
      <div className="bg-[#001433]/90 border border-[#d4af37]/30 rounded-xl p-6 sm:p-8 backdrop-blur-md shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-red-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#d4af37]/5 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-mono uppercase tracking-widest font-bold">
              <AlertCircle className="w-4 h-4 text-red-400" />
              <span>COMMON CITIZEN MISCONCEPTIONS // STATUTORY FACT-CHECK</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white tracking-tight">
              Legal <span className="text-[#ffd754] italic">Mythbusters</span>
            </h2>
            <p className="text-sm sm:text-base text-gray-300 font-light leading-relaxed">
              Everyday law enforcement and administrative encounters are fraught with widespread myths. 
              Review the facts below, unseal verified statutory truth, and arm yourself with exact citizen verbal scripts.
            </p>
          </div>

          {/* Quick Stats Pill */}
          <div className="shrink-0 flex flex-col sm:flex-row items-start sm:items-center gap-3">
            <div className="bg-[#000a1a] border border-[#d4af37]/30 rounded-lg p-3 text-center min-w-[130px]">
              <span className="text-2xl font-serif font-bold text-[#ffd754] block">{myths.length}</span>
              <span className="text-[10px] font-mono uppercase tracking-wider text-gray-400">Debunked Myths</span>
            </div>

            {isAdmin && onUpdateMyths && (
              <button
                type="button"
                onClick={() => setIsAddingNew(true)}
                className="px-4 py-3 bg-[#d4af37] hover:bg-[#b08f25] text-[#001233] font-mono text-xs font-bold uppercase tracking-wider rounded-lg transition-colors flex items-center gap-2 cursor-pointer shadow-lg"
              >
                <Plus className="w-4 h-4" /> Add New Myth
              </button>
            )}
          </div>
        </div>
      </div>

      {/* 2. CONTROLS BAR: SEARCH, CATEGORY FILTERS & BULK TOGGLES */}
      <div className="bg-[#001433]/80 border border-[#d4af37]/25 rounded-xl p-4 sm:p-5 backdrop-blur-md shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          
          {/* Search Box */}
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search myths, police stops, bail, phone..."
              className="w-full bg-[#000a1a] border border-[#d4af37]/25 focus:border-[#d4af37] text-xs font-sans text-white pl-9 pr-8 py-2.5 rounded-lg outline-none placeholder:text-gray-500"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white text-xs cursor-pointer"
              >
                ✕
              </button>
            )}
          </div>

          {/* Expand / Collapse All Toggles */}
          <div className="flex items-center gap-2 self-start sm:self-auto">
            <button
              type="button"
              onClick={handleExpandAll}
              className="px-3 py-1.5 rounded-lg bg-[#000a1a] hover:bg-white/5 border border-white/10 text-gray-300 hover:text-white text-xs font-mono transition-colors cursor-pointer"
            >
              Expand All ({filteredMyths.length})
            </button>
            <button
              type="button"
              onClick={handleCollapseAll}
              className="px-3 py-1.5 rounded-lg bg-[#000a1a] hover:bg-white/5 border border-white/10 text-gray-300 hover:text-white text-xs font-mono transition-colors cursor-pointer"
            >
              Collapse All (Default)
            </button>
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-2 pt-2 border-t border-white/5 overflow-x-auto pb-1 scrollbar-none sm:flex-wrap">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat.id;
            const count = cat.id === "all" 
              ? myths.length 
              : myths.filter(m => m.category === cat.id).length;

            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.id)}
                className={`shrink-0 px-3 py-1.5 rounded-lg text-xs font-mono tracking-wider transition-all flex items-center gap-1.5 cursor-pointer min-h-[38px] whitespace-nowrap ${
                  isActive
                    ? "bg-[#d4af37] text-[#001233] font-bold shadow-md shadow-[#d4af37]/20"
                    : "bg-[#000d21] text-gray-400 hover:text-gray-200 border border-white/10 hover:border-[#d4af37]/30"
                }`}
              >
                <span>{cat.label}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${isActive ? "bg-black/20 text-[#001233]" : "bg-white/10 text-gray-400"}`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. NEW MYTH CREATION MODAL/FORM (Admin only) */}
      <AnimatePresence>
        {isAddingNew && isAdmin && onUpdateMyths && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-[#001233] border-2 border-[#d4af37] rounded-xl p-6 shadow-2xl space-y-4"
          >
            <div className="flex items-center justify-between border-b border-[#d4af37]/25 pb-3">
              <h3 className="font-serif text-lg font-bold text-white flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-[#d4af37]" /> Create New Legal Mythbuster Entry
              </h3>
              <button onClick={() => setIsAddingNew(false)} className="text-gray-400 hover:text-white cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-[10px] font-mono text-[#d4af37] uppercase block mb-1">Mythbuster Question</label>
                <input
                  type="text"
                  value={newMythForm.question}
                  onChange={(e) => setNewMythForm({ ...newMythForm, question: e.target.value })}
                  placeholder="e.g. Can police confiscate your phone without a warrant?"
                  className="w-full bg-[#000a1a] border border-[#d4af37]/30 rounded px-3 py-2 text-xs text-white outline-none focus:border-[#d4af37]"
                />
              </div>

              <div>
                <label className="text-[10px] font-mono text-[#d4af37] uppercase block mb-1">Category</label>
                <select
                  value={newMythForm.category || "police"}
                  onChange={(e) => setNewMythForm({ ...newMythForm, category: e.target.value as any })}
                  className="w-full bg-[#000a1a] border border-[#d4af37]/30 rounded px-3 py-2 text-xs text-[#d4af37] outline-none"
                >
                  <option value="police">Police & Stops</option>
                  <option value="arrest">Arrest & Bail</option>
                  <option value="privacy">Digital Privacy</option>
                  <option value="property">Property & Municipal</option>
                  <option value="courts">Courts & Legal Aid</option>
                  <option value="general">General Rights</option>
                </select>
              </div>
            </div>

            <div>
              <label className="text-[10px] font-mono text-red-400 uppercase block mb-1">Common Misconception / The Myth</label>
              <textarea
                value={newMythForm.myth}
                onChange={(e) => setNewMythForm({ ...newMythForm, myth: e.target.value })}
                rows={2}
                placeholder="MYTH: Officers claim standard procedures permit warrantless phone checks..."
                className="w-full bg-[#000a1a] border border-red-500/30 rounded px-3 py-2 text-xs text-white outline-none focus:border-red-500"
              />
            </div>

            <div>
              <label className="text-[10px] font-mono text-emerald-400 uppercase block mb-1">Verified Statutory Reality</label>
              <textarea
                value={newMythForm.answerOnTrue}
                onChange={(e) => setNewMythForm({ ...newMythForm, answerOnTrue: e.target.value })}
                rows={3}
                placeholder="Under Article 20(3) and Puttaswamy, private devices are protected..."
                className="w-full bg-[#000a1a] border border-emerald-500/30 rounded px-3 py-2 text-xs text-white outline-none focus:border-emerald-500"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-[10px] font-mono text-gray-400 uppercase block mb-1">Statute Reference</label>
                <input
                  type="text"
                  value={newMythForm.statuteRef || ""}
                  onChange={(e) => setNewMythForm({ ...newMythForm, statuteRef: e.target.value })}
                  placeholder="e.g. Article 21 / Sec 154 CrPC"
                  className="w-full bg-[#000a1a] border border-white/10 rounded px-3 py-2 text-xs text-white outline-none"
                />
              </div>

              <div>
                <label className="text-[10px] font-mono text-gray-400 uppercase block mb-1">Landmark Case Precedent</label>
                <input
                  type="text"
                  value={newMythForm.landmarkCase || ""}
                  onChange={(e) => setNewMythForm({ ...newMythForm, landmarkCase: e.target.value })}
                  placeholder="e.g. D.K. Basu v. State of West Bengal"
                  className="w-full bg-[#000a1a] border border-white/10 rounded px-3 py-2 text-xs text-white outline-none"
                />
              </div>
            </div>

            <div>
              <label className="text-[10px] font-mono text-[#ffd754] uppercase block mb-1">Citizen Dialogue Script</label>
              <input
                type="text"
                value={newMythForm.citizenScript || ""}
                onChange={(e) => setNewMythForm({ ...newMythForm, citizenScript: e.target.value })}
                placeholder="“Officer, under Article 20(3), I decline to disclose my passcode...”"
                className="w-full bg-[#000a1a] border border-[#d4af37]/30 rounded px-3 py-2 text-xs text-white outline-none"
              />
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setIsAddingNew(false)}
                className="px-4 py-2 rounded text-xs font-mono text-gray-400 hover:text-white cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleCreateNew}
                className="px-5 py-2 bg-[#d4af37] text-[#001233] rounded font-mono text-xs font-bold uppercase tracking-wider hover:bg-[#b08f25] cursor-pointer"
              >
                Publish Mythbuster Entry
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 4. EXPANDABLE MYTH CARDS (CLOSED BY DEFAULT!) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredMyths.length === 0 ? (
          <div className="md:col-span-2 p-12 text-center bg-[#001233]/40 border border-dashed border-[#d4af37]/20 rounded-xl">
            <AlertCircle className="w-8 h-8 text-[#d4af37] mx-auto mb-2 opacity-60" />
            <p className="text-sm font-mono text-gray-400 uppercase tracking-wider">No misconceptions match your query.</p>
            <button
              onClick={() => { setSelectedCategory("all"); setSearchQuery(""); }}
              className="mt-3 text-xs text-[#ffd754] underline hover:text-white cursor-pointer"
            >
              Reset search and filters
            </button>
          </div>
        ) : (
          filteredMyths.map(({ item, originalIndex }) => {
            const isExpanded = !!expandedIndices[originalIndex];
            const isEditing = editingIndex === originalIndex;
            const isCopied = copiedIdx === originalIndex;

            return (
              <motion.div
                key={`myth-${originalIndex}`}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3 }}
                className={`bg-[#001433]/90 rounded-xl border transition-all duration-200 flex flex-col justify-between overflow-hidden backdrop-blur-md ${
                  isExpanded
                    ? "border-[#ffd754] shadow-[0_10px_30px_rgba(0,0,0,0.8),0_0_20px_rgba(212,175,55,0.15)] ring-1 ring-[#ffd754]/40"
                    : "border-[#d4af37]/20 hover:border-[#d4af37]/50 shadow-lg"
                }`}
              >
                {/* CARD BODY */}
                <div className="p-5 sm:p-6 space-y-4">
                  
                  {/* Top Header Row */}
                  <div className="flex items-center justify-between gap-2 border-b border-white/10 pb-3">
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-0.5 rounded bg-red-500/15 border border-red-500/30 text-red-400 font-mono text-xs font-bold tracking-wider">
                        MYTH #{originalIndex + 1}
                      </span>
                      {item.category && (
                        <span className="text-[10px] font-mono uppercase tracking-widest text-gray-400">
                          {item.category}
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-2">
                      {item.statuteRef && (
                        <span className="text-[10px] font-mono text-[#d4af37] bg-black/40 px-2 py-0.5 rounded border border-[#d4af37]/20">
                          {item.statuteRef}
                        </span>
                      )}

                      {isAdmin && onUpdateMyths && (
                        <div className="flex items-center gap-1">
                          <button
                            type="button"
                            onClick={() => setEditingIndex(isEditing ? null : originalIndex)}
                            className="p-1 text-gray-400 hover:text-[#ffd754] cursor-pointer"
                            title="Edit Myth"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDeleteMyth(originalIndex)}
                            className="p-1 text-gray-400 hover:text-red-400 cursor-pointer"
                            title="Delete Myth"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Question */}
                  <h3 className="font-serif font-bold text-base sm:text-lg text-white leading-snug">
                    {item.question}
                  </h3>

                  {/* Common Misconception Callout Box (Always visible as teaser) */}
                  <div className="p-3.5 bg-red-950/30 border-l-3 border-red-500 rounded-r-lg space-y-1">
                    <span className="text-[9px] font-mono text-red-400 font-bold uppercase tracking-widest block">
                      Common Misconception:
                    </span>
                    <p className="text-xs sm:text-sm text-gray-200 font-sans leading-relaxed">
                      {item.myth}
                    </p>
                  </div>

                  {/* EXPANDABLE STATUTORY REALITY (CLOSED BY DEFAULT!) */}
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.25 }}
                        className="space-y-4 pt-3 border-t border-white/10 overflow-hidden"
                      >
                        {/* Verified Truth */}
                        <div className="p-4 bg-[#000a1a] border-l-3 border-[#ffd754] rounded-r-lg space-y-1.5">
                          <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider">
                            <CheckCircle className="w-4 h-4 text-emerald-400" />
                            <span>Verified Statutory Reality:</span>
                          </div>
                          <p className="text-xs sm:text-sm text-gray-200 font-light leading-relaxed">
                            {item.answerOnTrue}
                          </p>
                        </div>

                        {/* Landmark Precedent Case */}
                        {item.landmarkCase && (
                          <div className="flex items-start gap-2 text-xs font-mono text-[#ffd754] bg-[#001c45]/60 p-2.5 rounded border border-[#d4af37]/20">
                            <Scale className="w-4 h-4 shrink-0 mt-0.5 text-[#d4af37]" />
                            <div>
                              <span className="text-[9px] text-gray-400 uppercase tracking-wider block">Authoritative Precedent:</span>
                              <span className="font-medium">{item.landmarkCase}</span>
                            </div>
                          </div>
                        )}

                        {/* Citizen Verbal Script */}
                        {item.citizenScript && (
                          <div className="bg-[#000a1a] rounded-lg p-3.5 border border-[#d4af37]/30 space-y-2">
                            <div className="flex items-center justify-between">
                              <span className="text-[10px] font-mono font-bold text-[#ffd754] uppercase tracking-wider flex items-center gap-1">
                                <Sparkles className="w-3.5 h-3.5 text-[#d4af37]" /> Exact Citizen Protocol Script:
                              </span>
                              <button
                                type="button"
                                onClick={() => handleCopyScript(item.citizenScript!, originalIndex)}
                                className="text-[10px] font-mono text-gray-300 hover:text-white bg-black/60 hover:bg-[#d4af37]/30 px-2 py-0.5 rounded border border-[#d4af37]/25 flex items-center gap-1 transition-colors cursor-pointer"
                              >
                                {isCopied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                                <span>{isCopied ? "Copied" : "Copy Script"}</span>
                              </button>
                            </div>
                            <p className="text-xs text-[#ffd754] font-serif italic leading-relaxed">
                              {item.citizenScript}
                            </p>
                          </div>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* BOTTOM EXPAND / COLLAPSE BUTTON BAR */}
                <div className="px-5 py-3 bg-[#000c1e] border-t border-white/5 flex items-center justify-between">
                  <span className="text-[10px] font-mono text-gray-400">
                    {isExpanded ? "Statutory explanation unsealed" : "Tap to unseal statutory truth"}
                  </span>
                  
                  <button
                    type="button"
                    onClick={() => handleToggleExpand(originalIndex)}
                    className={`px-3 py-1.5 rounded text-xs font-mono font-bold uppercase tracking-wider transition-all flex items-center gap-1.5 cursor-pointer min-h-[36px] ${
                      isExpanded
                        ? "bg-[#d4af37]/25 border border-[#d4af37] text-white"
                        : "bg-[#d4af37]/10 hover:bg-[#d4af37]/25 border border-[#d4af37]/30 text-[#ffd754] hover:text-white"
                    }`}
                  >
                    <span>{isExpanded ? "Collapse Fact-Check" : "Unseal Statutory Truth"}</span>
                    {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </motion.div>
            );
          })
        )}
      </div>

    </div>
  );
}
