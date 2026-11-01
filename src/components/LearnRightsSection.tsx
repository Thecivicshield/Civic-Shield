import React, { useState } from "react";
import { 
  Scale, 
  ShieldCheck, 
  AlertCircle, 
  ChevronDown, 
  ChevronUp, 
  BookOpen, 
  CheckCircle2, 
  HelpCircle, 
  Lock, 
  Eye, 
  FileText, 
  MessageSquareQuote,
  Sparkles,
  ExternalLink
} from "lucide-react";

export interface LawItem {
  id?: string;
  title: string;
  subtitle: string;
  description: string;
  keyPoints: string[];
  citation: string;
  category?: "fundamental" | "safeguards" | "representation" | "obligations";
  practicalScript?: string;
  exampleScenario?: string;
}

interface LearnRightsSectionProps {
  laws?: LawItem[];
  isAdmin?: boolean;
  onUpdateLaws?: (nextLaws: LawItem[]) => void;
  onOpenBookModal?: (volume: "rights" | "goals" | "mission", chapterIndex?: number) => void;
}

const DEFAULT_RIGHTS_DATA: LawItem[] = [
  {
    id: "law-art21",
    title: "Right to Life, Dignity & Personal Liberty",
    subtitle: "Constitutional Shield Against Arbitrary Detention",
    citation: "Article 21, Constitution of India",
    category: "fundamental",
    description: "Under Article 21, no person can be deprived of life or personal liberty except according to fair, just, and reasonable procedure established by law. This prohibits unlawful confinement, physical violence in custody, and arbitrary police harassment.",
    keyPoints: [
      "Includes the fundamental Right to Privacy established in K.S. Puttaswamy (2017).",
      "Prohibits unauthorized surveillance, forced biometric/phone extraction, and lockup without charges.",
      "Ensures the right to human dignity, immediate medical attention, and prompt judicial oversight."
    ],
    exampleScenario: "An officer stops you in public and orders you to sit in a police station room for hours without explaining any suspected crime or entering your details in the station diary.",
    practicalScript: "“Officer, under what legal section or formal order is my liberty being restricted? Am I being formally detained or am I free to go?”"
  },
  {
    id: "law-art22",
    title: "Arrest Safeguards & 24-Hour Magistrate Rule",
    subtitle: "Protection Against Unrecorded or Secret Custody",
    citation: "Article 22(1) & 22(2), Constitution of India / CrPC Sec 57",
    category: "safeguards",
    description: "Whenever an arrest occurs, the police must immediately inform the arrestee of the exact grounds for arrest, allow them to consult an advocate of their choice, and produce them before a neutral judicial magistrate within 24 hours.",
    keyPoints: [
      "The 24-hour presentation clock starts the moment physical custody begins, excluding travel time.",
      "Holding anyone beyond 24 hours without a formal magistrate remand order is illegal confinement.",
      "Arresting officers must prepare a signed Arrest Memo with date, time, and witness signature under D.K. Basu guidelines."
    ],
    exampleScenario: "Police detain a citizen on a Friday evening and claim they cannot be produced in court until Monday because courts are closed. Magistrates are available 24/7 on remand duty.",
    practicalScript: "“Under Article 22(2) and Section 57, I must be produced before the duty magistrate within 24 hours and allowed to contact my family and lawyer.”"
  },
  {
    id: "law-art20-3",
    title: "Protection Against Self-Incrimination",
    subtitle: "Right to Remain Silent & Device Boundary",
    citation: "Article 20(3), Constitution of India",
    category: "safeguards",
    description: "No person accused of an offense can be compelled to be a witness against themselves. You cannot be forced under threat or coercion to sign confessions, reveal confidential passwords, or answer questions that incriminate you.",
    keyPoints: [
      "Any statement coerced by police is inadmissible as substantive evidence in court under Section 25 of the Evidence Act.",
      "Protects personal devices: you cannot be forced to unlock biometric scans or type private passwords without a judicial warrant.",
      "You have the right to remain calm and decline answering until legal counsel is present."
    ],
    exampleScenario: "Investigating personnel demand that you hand over your unlocked phone and sign a written statement admitting guilt under verbal threats.",
    practicalScript: "“Under Article 20(3), I decline to give a self-incriminating statement or unlock personal communications without consulting my legal counsel.”"
  },
  {
    id: "law-art19",
    title: "Freedom of Speech & Public Observation",
    subtitle: "The Right to Peacefully Record Public Officials",
    citation: "Article 19(1)(a), Constitution of India",
    category: "fundamental",
    description: "Citizens have the right to observe, document, and record police officers and public servants performing public duties in public areas, provided they do not physically obstruct the officer's legitimate duties.",
    keyPoints: [
      "Public servants performing statutory functions have no reasonable expectation of privacy in public spaces.",
      "Officers cannot snatch mobile phones, force deletion of videos, or threaten charges for peaceful recording.",
      "Exceptions only apply in legally notified defense, military, or classified security installations."
    ],
    exampleScenario: "You film a roadside traffic checkpoint from a sidewalk 10 feet away. An officer aggressively approaches and demands you delete the video.",
    practicalScript: "“I am standing peacefully in a public space documenting public duty under Article 19(1)(a) without obstructing your work.”"
  },
  {
    id: "law-art39a",
    title: "Right to Free Legal Aid",
    subtitle: "State-Funded Legal Assistance for All",
    citation: "Article 39A, Constitution of India / LSA Act 1987",
    category: "representation",
    description: "The State is mandated to ensure that justice is not denied to any citizen due to economic or social hardship. The Legal Services Authorities Act guarantees certified pro-bono defense advocates to eligible citizens.",
    keyPoints: [
      "Administered via District Legal Services Authorities (DLSA), State LSAs (SLSA), and Supreme Court committees.",
      "Available to low-income persons, women, children, custody detainees, and marginalized communities.",
      "State-assigned legal aid advocates are strictly forbidden from charging private consultation or filing fees."
    ],
    exampleScenario: "A citizen is unable to afford private court lawyers for an ongoing dispute or bail petition.",
    practicalScript: "“Your Honor, I am unable to afford private counsel and request an assigned advocate from the District Legal Services Authority (DLSA).”"
  },
  {
    id: "law-adv32",
    title: "Party-in-Person Self-Advocacy",
    subtitle: "Inherent Right to Defend Yourself in Court",
    citation: "Section 32, Advocates Act 1961",
    category: "representation",
    description: "You have an absolute statutory right to represent yourself in consumer commissions, civil courts, and municipal tribunals as a 'Party-in-Person' without being forced to hire private counsel.",
    keyPoints: [
      "Permits citizens to draft, verify, file, and argue petitions directly before presiding judges and magistrates.",
      "Judges hold an institutional duty to guide and accommodate self-represented litigants on procedural formalities.",
      "Eliminates the cost barrier for straightforward consumer disputes, RTI appeals, and civic objections."
    ],
    exampleScenario: "A consumer forum or municipal tribunal insists you must be represented by an advocate to file a complaint.",
    practicalScript: "“Under Section 32 of the Advocates Act, 1961, I respectfully apply to appear and argue as a Party-in-Person on my own behalf.”"
  },
  {
    id: "law-obligations",
    title: "Citizen Responsibilities & Lawful Cooperation",
    subtitle: "Civic Duties and Lawful Procedural Compliance",
    citation: "Article 51A, Constitution of India",
    category: "obligations",
    description: "Rights coexist with civic responsibilities. While citizens possess inviolable procedural protections, they are also obligated to cooperate with lawful, authorized orders, preserve public peace, and respect the rule of law.",
    keyPoints: [
      "Always remain polite and non-confrontational; assert rights through calm legal questions rather than hostility.",
      "Carry and present required statutory documents (e.g. driving license via DigiLocker) upon lawful request.",
      "Do not physically obstruct emergency personnel or officers executing valid judicial search or arrest warrants."
    ],
    exampleScenario: "During an authorized checkpoint, an officer properly requests your driver's license and vehicle registration.",
    practicalScript: "“Certainly, Officer. Here are my verified digital credentials on DigiLocker as authorized by Rule 139 CMVR.”"
  }
];

export default function LearnRightsSection({
  laws = DEFAULT_RIGHTS_DATA,
  isAdmin = false,
  onUpdateLaws,
  onOpenBookModal
}: LearnRightsSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [expandedCardId, setExpandedCardId] = useState<string | null>("law-art21");

  const categories = [
    { id: "all", label: "All Rights & Duties" },
    { id: "fundamental", label: "Fundamental Liberties" },
    { id: "safeguards", label: "Police & Arrest Safeguards" },
    { id: "representation", label: "Legal Aid & Courts" },
    { id: "obligations", label: "Citizen Duties" }
  ];

  const displayedLaws = laws.filter(item => {
    if (selectedCategory === "all") return true;
    return item.category === selectedCategory;
  });

  const toggleExpand = (id: string) => {
    setExpandedCardId(prev => (prev === id ? null : id));
  };

  return (
    <section id="learn-rights" className="scroll-mt-20 py-12 sm:py-16 bg-[#001026] text-white border-b border-[#d4af37]/20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Section Header */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-[#ffd754] text-xs font-mono uppercase tracking-widest">
            <Scale className="w-4 h-4 text-[#d4af37]" />
            <span>Section 1 · Know Your Rights</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white tracking-tight">
            Fundamental Rights & Constitutional Protections
          </h2>
          <p className="text-sm text-gray-300 font-light max-w-3xl leading-relaxed">
            Essential Indian laws translated into everyday language. Tap any topic to read its plain-English rule, authoritative statutory citation, real-life scenario, and the exact words you can say.
          </p>
        </div>

        {/* Category Filters (Segmented Control) */}
        <div className="flex flex-wrap items-center gap-1.5 p-1.5 bg-[#000a1c] border border-[#d4af37]/25 rounded-xl max-w-full overflow-x-auto">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1.5 text-xs font-mono rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                selectedCategory === cat.id
                  ? "bg-[#d4af37] text-[#001233] font-bold shadow-sm"
                  : "text-gray-300 hover:text-white hover:bg-[#001a40]"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Cards Grid with Progressive Disclosure */}
        <div className="space-y-4">
          {displayedLaws.map((item, idx) => {
            const cardId = item.id || `law-${idx}`;
            const isExpanded = expandedCardId === cardId;

            return (
              <div
                key={cardId}
                className={`rounded-xl border transition-all duration-200 overflow-hidden ${
                  isExpanded
                    ? "bg-[#001433] border-[#d4af37] shadow-lg"
                    : "bg-[#00122e]/80 border-[#d4af37]/20 hover:border-[#d4af37]/50"
                }`}
              >
                {/* Compact Header Summary (Always Visible) */}
                <div 
                  onClick={() => toggleExpand(cardId)}
                  className="p-4 sm:p-5 flex items-start justify-between gap-4 cursor-pointer select-none"
                >
                  <div className="space-y-1.5 flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs">
                      <span className="font-mono text-[#ffd754] font-semibold">
                        {item.citation}
                      </span>
                      <span className="text-gray-500" aria-hidden="true">·</span>
                      <span className="text-gray-400 text-xs">
                        {item.subtitle}
                      </span>
                    </div>
                    <h3 className="text-base sm:text-lg font-serif font-bold text-white leading-snug">
                      {item.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-300 font-light leading-relaxed line-clamp-2">
                      {item.description}
                    </p>
                  </div>

                  <button
                    aria-label={isExpanded ? "Collapse explanation" : "Read full explanation"}
                    className="shrink-0 p-2 rounded-lg bg-[#001a40] text-[#ffd754] hover:bg-[#002459] transition-colors mt-1"
                  >
                    {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </button>
                </div>

                {/* Progressive Disclosure: Expanded Content */}
                {isExpanded && (
                  <div className="px-4 pb-5 sm:px-5 sm:pb-6 border-t border-[#d4af37]/15 pt-4 space-y-4 text-xs sm:text-sm">
                    
                    {/* Full Explanation */}
                    <div className="space-y-1">
                      <h4 className="text-xs font-mono uppercase tracking-wider text-[#ffd754] font-semibold">
                        Plain-Language Legal Explanation
                      </h4>
                      <p className="text-gray-200 font-light leading-relaxed">
                        {item.description}
                      </p>
                    </div>

                    {/* Key Statutory Points */}
                    {item.keyPoints && item.keyPoints.length > 0 && (
                      <div className="space-y-1.5 bg-[#000d24] p-3.5 rounded-lg border border-[#d4af37]/15">
                        <h4 className="text-xs font-mono uppercase tracking-wider text-gray-300 font-semibold">
                          Core Statutory Rules & Safeguards:
                        </h4>
                        <ul className="space-y-1 text-gray-300 text-xs font-light">
                          {item.keyPoints.map((point, pIdx) => (
                            <li key={pIdx} className="flex items-start gap-2">
                              <span className="text-[#ffd754] shrink-0 mt-0.5">•</span>
                              <span>{point}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Real-Life Scenario & Practical Script */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 pt-1">
                      {item.exampleScenario && (
                        <div className="p-3.5 rounded-lg bg-[#000a1c] border border-gray-800 space-y-1">
                          <span className="text-[11px] font-mono uppercase tracking-wider text-amber-300 font-semibold flex items-center gap-1.5">
                            <AlertCircle className="w-3.5 h-3.5" />
                            Real-Life Scenario
                          </span>
                          <p className="text-xs text-gray-300 font-light leading-relaxed">
                            {item.exampleScenario}
                          </p>
                        </div>
                      )}

                      {item.practicalScript && (
                        <div className="p-3.5 rounded-lg bg-[#001d4a]/60 border border-[#d4af37]/30 space-y-1">
                          <span className="text-[11px] font-mono uppercase tracking-wider text-[#ffd754] font-semibold flex items-center gap-1.5">
                            <MessageSquareQuote className="w-3.5 h-3.5" />
                            What You Can Say Politely
                          </span>
                          <p className="text-xs text-[#ffd754] italic font-serif leading-relaxed">
                            {item.practicalScript}
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Quick Handbook Trigger */}
                    {onOpenBookModal && (
                      <div className="pt-2 flex items-center justify-between text-xs font-mono text-gray-400">
                        <span>Covered in depth in the Handbook of Rights</span>
                        <button
                          onClick={() => onOpenBookModal("rights", 0)}
                          className="text-[#d4af37] hover:underline flex items-center gap-1 font-semibold"
                        >
                          <BookOpen className="w-3.5 h-3.5" />
                          <span>Open Chapter in Handbook</span>
                        </button>
                      </div>
                    )}

                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
