import React, { useState, useMemo } from "react";
import { 
  BookOpen, 
  FileText, 
  FolderLock, 
  HelpCircle, 
  Award, 
  Download, 
  Search, 
  Bookmark, 
  CheckCircle2, 
  XCircle, 
  AlertCircle, 
  Sparkles, 
  Scale, 
  Upload, 
  Share2, 
  Check, 
  X,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  FileDown
} from "lucide-react";
import { Statute, EvidenceItem } from "../types";
import ConstitutionalNetwork from "./ConstitutionalNetwork";

interface CivicMisconception {
  question: string;
  answerOnTrue: string;
  myth: string;
}

interface KnowledgeHubSectionProps {
  statutes?: Statute[];
  evidence?: EvidenceItem[];
  myths?: CivicMisconception[];
  isAdmin?: boolean;
  onUpdateStatutes?: (statutes: Statute[]) => void;
  onUpdateMyths?: (myths: CivicMisconception[]) => void;
  onUploadFile?: (payload: any) => Promise<void>;
  onApproveEvidence?: (id: string) => Promise<void>;
  onRejectEvidence?: (id: string) => Promise<void>;
  onDeleteEvidence?: (id: string) => Promise<void>;
  onOpenBookModal?: (volume: "rights" | "goals" | "mission", chapterIndex?: number) => void;
  accentColor?: string;
}

const DEFAULT_STATUTES: Statute[] = [
  {
    id: "statute-art21",
    title: "Article 21: Protection of Life and Personal Liberty",
    citation: "Constitution of India, Art. 21",
    category: "Fundamental Rights",
    description: "No person shall be deprived of his life or personal liberty except according to procedure established by law. Fountainhead of civil liberties protecting citizens from arbitrary state action.",
    keyPoints: [
      "Includes the fundamental Right to Privacy as established in K.S. Puttaswamy (2017).",
      "Protects against arbitrary police search, unauthorized surveillance, and custodial violence.",
      "Ensures the right to live with human dignity and immediate medical aid."
    ],
    relevance: "Shield against illegal lockup, police high-handedness, and forced searches."
  },
  {
    id: "statute-art19",
    title: "Article 19(1)(a): Freedom of Speech & Public Recording",
    citation: "Constitution of India, Art. 19(1)(a)",
    category: "Fundamental Rights",
    description: "All citizens have the right to freedom of speech and expression. Includes the right to observe, document, and record public events and public officials on duty in public spaces.",
    keyPoints: [
      "Protects citizen recording of police and civic officers performing public duty in public spaces.",
      "Officers cannot summarily ban filming or snatch devices unless in notified security cordons.",
      "Peaceful observation without physical obstruction is fully constitutionally protected."
    ],
    relevance: "Empowers citizens to document bodycam-equivalent video during traffic stops and civic inspections."
  },
  {
    id: "statute-art14",
    title: "Article 14: Equality Before Law & Non-Arbitrariness",
    citation: "Constitution of India, Art. 14",
    category: "Fundamental Rights",
    description: "The State shall not deny to any person equality before the law or the equal protection of the laws within the territory of India.",
    keyPoints: [
      "Absolute bar against discriminatory, selective administrative enforcement.",
      "Demands uniform application of guidelines without prejudice or favoritism.",
      "Forms the bedrock of the rule against arbitrary state action (E.P. Royappa doctrine)."
    ],
    relevance: "Crucial when challenging selective demolitions, arbitrary fines, or biased municipal enforcement."
  },
  {
    id: "statute-art22",
    title: "Article 22(2): Right to 24-Hour Magistrate Presentation",
    citation: "Constitution of India, Art. 22(2)",
    category: "Criminal Procedure",
    description: "Every person arrested and detained in custody must be produced before the nearest magistrate within twenty-four hours of arrest.",
    keyPoints: [
      "The 24-hour limit is absolute and excludes only the time necessary for the journey to the magistrate.",
      "No detainee can be held in custody beyond 24 hours without an explicit judicial remand order.",
      "Guarantees the right to consult and be defended by a legal practitioner of choice upon arrest."
    ],
    relevance: "The ultimate protection against secret detention, unrecorded lockups, and prolonged third-degree questioning."
  },
  {
    id: "statute-adv32",
    title: "Section 32, Advocates Act 1961: Party-in-Person Representation",
    citation: "Advocates Act 1961, Sec. 32",
    category: "Citizen Advocacy",
    description: "Permits any court, authority, or tribunal to allow any non-advocate to appear and argue before it on their own behalf in any particular case.",
    keyPoints: [
      "Statutory recognition of self-advocacy without paying private lawyer fees.",
      "Allows self-represented citizens to file petitions, submit evidence, and present arguments.",
      "Presiding judicial officers hold a duty to accommodate procedural formalities for pro-se citizens."
    ],
    relevance: "Removes expensive fee barriers, enabling self-advocacy in consumer commissions and tribunals."
  },
  {
    id: "statute-rti6",
    title: "Section 6, Right to Information (RTI) Act 2005: Public Inquest",
    citation: "RTI Act 2005, Sec. 6",
    category: "Administrative Accountability",
    description: "Entitles any citizen to submit a written or electronic request for public records, budget expenditures, audit reports, and government decisions.",
    keyPoints: [
      "Public Information Officers (PIOs) must provide requested information within 30 days (or 48 hours for life/liberty issues).",
      "No citizen is required to state any reason for requesting public information.",
      "Provides penalties of ₹250/day up to ₹25,000 on officials who willfully obstruct or withhold records."
    ],
    relevance: "Auditing local road contracts, municipal spending, tender allocations, and government schemes."
  },
  {
    id: "statute-sec41a",
    title: "Section 41A CrPC / Sec 35 BNSS: Notice of Appearance",
    citation: "CrPC Sec. 41A / BNSS Sec. 35",
    category: "Criminal Procedure",
    description: "For offenses punishable with imprisonment up to 7 years, arrest is not automatic. Police must issue a written Notice of Appearance directing the accused to join inquiry.",
    keyPoints: [
      "Codified in the landmark Supreme Court ruling in Arnesh Kumar v. State of Bihar (2014).",
      "As long as the citizen complies with the notice and cooperates, police cannot arrest without recorded reasons.",
      "Protects against routine, automated arrests in matrimonial disputes and minor financial matters."
    ],
    relevance: "Defends against premature arrest and harassment in allegations punishable with under 7 years."
  },
  {
    id: "statute-dkbasu",
    title: "D.K. Basu Guidelines: Mandatory Arrest Protocols",
    citation: "D.K. Basu v. State of W.B. (1997) 1 SCC 416",
    category: "Police Guidelines",
    description: "Mandatory Supreme Court directives governing all arrests and interrogations to eliminate custodial violence.",
    keyPoints: [
      "Arresting officers must wear accurate, visible identification name-tags.",
      "Must prepare an Arrest Memo signed by the arrestee and at least one respectable witness.",
      "A relative or friend must be notified within 8 to 12 hours of arrest.",
      "The arrestee has the right to be medically examined every 48 hours during detention."
    ],
    relevance: "Enforceable benchmarks against secret or unregistered detentions."
  }
];

const DEFAULT_MYTHS: CivicMisconception[] = [
  {
    question: "Are citizens legally permitted to record video of public officials or police officers on duty in public spaces?",
    myth: "Public officers can forbid video recording of their duties using verbal bans or privacy claims.",
    answerOnTrue: "YES. Under Article 19(1)(a) of the Constitution (Freedom of Speech and Expression), recording public servants performing official duties in a public space is fully permitted. As long as you do not physically obstruct their duties or enter designated high-security cordons, documenting is lawful."
  },
  {
    question: "Can an administrative or municipal officer seal your house or demolish property without prior notice?",
    myth: "Municipal citations allow officials to immediately seal or demolish properties without a hearing.",
    answerOnTrue: "NO. Under the Principles of Natural Justice and Article 300A (Right to Property), no property can be sealed or demolished without a formal Show-Cause notice, reasonable time to respond, and an opportunity for a hearing."
  },
  {
    question: "Does an advocate assigned through the District Legal Services Authority (DLSA) have the right to demand consultation or filing fees?",
    myth: "State-assigned legal aid lawyers can ask citizens for private fees, paper charges, or filing expenses.",
    answerOnTrue: "NO. Legal aid through DLSA, SLSA, or the Supreme Court Legal Services Committee is strictly free for eligible citizens. Requesting private money constitutes severe professional misconduct under Bar Council rules."
  },
  {
    question: "Can police detain you indefinitely at a station without producing you before a judge as long as they call it 'questioning'?",
    myth: "Informal station house questioning does not trigger the 24-hour presentation deadline.",
    answerOnTrue: "NO. The 24-hour presentation deadline under Article 22(2) and CrPC Section 57 is absolute. The moment physical restraint or detention begins, the 24-hour clock starts. Exceeding 24 hours without a magistrate's order is illegal confinement."
  },
  {
    question: "Can a patrolling officer legally force you to unlock your smartphone during a routine roadside check?",
    myth: "Police have an automatic statutory right to inspect digital devices and read chats during routine checks.",
    answerOnTrue: "NO. Patrolling officers cannot force you to unlock your device, scroll chats, or copy private files without a judicial search warrant or a formal seizure memo with documented FIR grounds. Forced device unlocking violates Article 21 and Article 20(3)."
  }
];

const QUIZ_QUESTIONS = [
  {
    question: "What is the maximum time an arrested citizen can be kept in police custody before being produced before a magistrate?",
    options: ["12 Hours", "24 Hours (excluding journey time)", "48 Hours", "Until investigation completes"],
    correct: 1,
    explanation: "Under Article 22(2) of the Indian Constitution and Section 57 CrPC, every arrested person must be produced before the nearest judicial magistrate within 24 hours."
  },
  {
    question: "Can an officer snatch your car or motorcycle ignition key during a routine traffic stop?",
    options: [
      "Yes, if you do not carry physical paper documents.",
      "Yes, if they suspect a traffic violation.",
      "No, removing ignition keys is unauthorized under Motor Vehicle regulations.",
      "Yes, any traffic constable has this power."
    ],
    correct: 2,
    explanation: "Under Motor Vehicles Act regulations and police department circulars, traffic personnel cannot forcibly remove ignition keys from running vehicles."
  },
  {
    question: "Under which statute can an Indian citizen represent their own case in court as a 'Party-in-Person'?",
    options: [
      "Section 32 of the Advocates Act, 1961",
      "Section 144 of the IPC",
      "Section 41A of the CrPC",
      "The Bar Council Prohibition Act"
    ],
    correct: 0,
    explanation: "Section 32 of the Advocates Act, 1961 empowers any court to permit a non-advocate to appear and argue on their own behalf."
  },
  {
    question: "Under the Supreme Court's Lalita Kumari ruling, when is registering an FIR mandatory for police?",
    options: [
      "Only after consulting the local political representative.",
      "Whenever the information discloses the commission of a cognizable offense.",
      "Only if the complainant has hired a lawyer.",
      "At the sole arbitrary discretion of the police constable."
    ],
    correct: 1,
    explanation: "The Constitution Bench in Lalita Kumari v. Govt of UP held that registration of an FIR is mandatory under Section 154 if the complaint discloses a cognizable offense."
  }
];

export default function KnowledgeHubSection({
  statutes = DEFAULT_STATUTES,
  evidence = [],
  myths = DEFAULT_MYTHS,
  isAdmin = false,
  onUpdateStatutes,
  onUpdateMyths,
  onUploadFile,
  onApproveEvidence,
  onRejectEvidence,
  onDeleteEvidence,
  onOpenBookModal,
  accentColor = "#d4af37"
}: KnowledgeHubSectionProps) {
  const [activeTab, setActiveTab] = useState<"statutes" | "vault" | "myths" | "quiz" | "books" | "network">("statutes");
  
  // Statutes search & category state
  const [statuteSearch, setStatuteSearch] = useState("");
  const [selectedStatuteCategory, setSelectedStatuteCategory] = useState("all");
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>([]);
  const [expandedStatuteId, setExpandedStatuteId] = useState<string | null>(null);

  // Mythbuster state
  const [mythAnswers, setMythAnswers] = useState<Record<number, boolean>>({});
  const [expandedMythIdx, setExpandedMythIdx] = useState<number | null>(0);

  // Quiz state
  const [quizIndex, setQuizIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [quizScore, setQuizScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);

  // Vault upload state
  const [uploadTitle, setUploadTitle] = useState("");
  const [uploadDesc, setUploadDesc] = useState("");
  const [uploadAuthor, setUploadAuthor] = useState("");
  const [uploadFile, setUploadFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);

  const toggleBookmark = (id: string) => {
    setBookmarkedIds(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const statuteCategories = useMemo(() => {
    const cats = Array.from(new Set(statutes.map(s => s.category)));
    return ["all", ...cats];
  }, [statutes]);

  const filteredStatutes = useMemo(() => {
    return statutes.filter(item => {
      const matchesCat = selectedStatuteCategory === "all" || item.category === selectedStatuteCategory;
      const q = statuteSearch.toLowerCase();
      const matchesSearch = !q || 
        item.title.toLowerCase().includes(q) || 
        item.citation.toLowerCase().includes(q) || 
        item.description.toLowerCase().includes(q);
      return matchesCat && matchesSearch;
    });
  }, [statutes, selectedStatuteCategory, statuteSearch]);

  const handleQuizAnswer = (optionIdx: number) => {
    if (selectedOption !== null) return;
    setSelectedOption(optionIdx);
    if (optionIdx === QUIZ_QUESTIONS[quizIndex].correct) {
      setQuizScore(prev => prev + 1);
    }
  };

  const handleNextQuiz = () => {
    if (quizIndex < QUIZ_QUESTIONS.length - 1) {
      setQuizIndex(prev => prev + 1);
      setSelectedOption(null);
    } else {
      setQuizFinished(true);
    }
  };

  const handleResetQuiz = () => {
    setQuizIndex(0);
    setSelectedOption(null);
    setQuizScore(0);
    setQuizFinished(false);
  };

  const handleFormUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!uploadTitle.trim() || !uploadFile) {
      alert("Please provide a title and select a file.");
      return;
    }
    setIsUploading(true);
    try {
      const reader = new FileReader();
      reader.onload = async () => {
        const base64Data = reader.result as string;
        if (onUploadFile) {
          await onUploadFile({
            title: uploadTitle.trim(),
            description: uploadDesc.trim() || "Uploaded citizen dossier",
            fileName: uploadFile.name,
            fileType: uploadFile.type || "application/pdf",
            fileData: base64Data,
            verifiedBy: "Pending Citizen Verification",
            submittedBy: uploadAuthor.trim() || "Anonymous Citizen",
            status: "pending"
          });
          setUploadSuccess(true);
          setUploadTitle("");
          setUploadDesc("");
          setUploadAuthor("");
          setUploadFile(null);
          setTimeout(() => setUploadSuccess(false), 4000);
        }
      };
      reader.readAsDataURL(uploadFile);
    } catch (err: any) {
      alert("Upload failed: " + err.message);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <section id="knowledge-hub" className="scroll-mt-20 py-12 sm:py-16 bg-[#001026] text-white border-b border-[#d4af37]/20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Section Header */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-[#ffd754] text-xs font-mono uppercase tracking-widest">
            <BookOpen className="w-4 h-4 text-[#d4af37]" />
            <span>Section 3 · Knowledge Hub</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white tracking-tight">
            Reference Library, Handbooks & Interactive Tools
          </h2>
          <p className="text-sm text-gray-300 font-light max-w-3xl leading-relaxed">
            Search our curated library of Indian statutes, download verified procedural filing templates, challenge common legal myths, and test your knowledge.
          </p>
        </div>

        {/* Tab Navigation (Segmented Bar) */}
        <div className="flex flex-wrap items-center gap-2 p-1.5 bg-[#000a1c] border border-[#d4af37]/25 rounded-xl">
          <button
            onClick={() => setActiveTab("statutes")}
            className={`px-3.5 py-2 text-xs font-mono rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer ${
              activeTab === "statutes"
                ? "bg-[#d4af37] text-[#001233] font-bold shadow-sm"
                : "text-gray-300 hover:text-white hover:bg-[#001a40]"
            }`}
          >
            <Scale className="w-3.5 h-3.5" />
            <span>Statutes Library</span>
          </button>

          <button
            onClick={() => setActiveTab("vault")}
            className={`px-3.5 py-2 text-xs font-mono rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer ${
              activeTab === "vault"
                ? "bg-[#d4af37] text-[#001233] font-bold shadow-sm"
                : "text-gray-300 hover:text-white hover:bg-[#001a40]"
            }`}
          >
            <FolderLock className="w-3.5 h-3.5" />
            <span>Templates & Vault</span>
          </button>

          <button
            onClick={() => setActiveTab("myths")}
            className={`px-3.5 py-2 text-xs font-mono rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer ${
              activeTab === "myths"
                ? "bg-[#d4af37] text-[#001233] font-bold shadow-sm"
                : "text-gray-300 hover:text-white hover:bg-[#001a40]"
            }`}
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Legal Mythbusters</span>
          </button>

          <button
            onClick={() => setActiveTab("quiz")}
            className={`px-3.5 py-2 text-xs font-mono rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer ${
              activeTab === "quiz"
                ? "bg-[#d4af37] text-[#001233] font-bold shadow-sm"
                : "text-gray-300 hover:text-white hover:bg-[#001a40]"
            }`}
          >
            <Award className="w-3.5 h-3.5" />
            <span>Scenario Quiz</span>
          </button>

          <button
            onClick={() => setActiveTab("books")}
            className={`px-3.5 py-2 text-xs font-mono rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer ${
              activeTab === "books"
                ? "bg-[#d4af37] text-[#001233] font-bold shadow-sm"
                : "text-gray-300 hover:text-white hover:bg-[#001a40]"
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Handbooks Reader</span>
          </button>

          <button
            onClick={() => setActiveTab("network")}
            className={`px-3.5 py-2 text-xs font-mono rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer ${
              activeTab === "network"
                ? "bg-[#d4af37] text-[#001233] font-bold shadow-sm"
                : "text-gray-300 hover:text-white hover:bg-[#001a40]"
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Jurisprudence Map</span>
          </button>
        </div>

        {/* TAB 1: STATUTES REFERENCE LIBRARY */}
        {activeTab === "statutes" && (
          <div className="space-y-5">
            {/* Search and Category Filter Strip */}
            <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
              <div className="relative w-full sm:w-80">
                <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={statuteSearch}
                  onChange={(e) => setStatuteSearch(e.target.value)}
                  placeholder="Filter statutes by name or section..."
                  className="w-full pl-9 pr-3 py-2 bg-[#000a1c] border border-[#d4af37]/30 rounded-lg text-xs text-white placeholder-gray-400 outline-none focus:border-[#d4af37]"
                />
              </div>

              <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto">
                {statuteCategories.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setSelectedStatuteCategory(cat)}
                    className={`px-2.5 py-1 text-[11px] font-mono rounded capitalize transition-colors whitespace-nowrap ${
                      selectedStatuteCategory === cat
                        ? "bg-[#d4af37]/20 border border-[#d4af37] text-[#ffd754]"
                        : "bg-[#00183b] text-gray-400 hover:text-white border border-transparent"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Statutes List */}
            <div className="space-y-3">
              {filteredStatutes.length === 0 ? (
                <div className="p-8 text-center text-gray-400 bg-[#000c1e] rounded-xl border border-[#d4af37]/15">
                  No statutes match your search query.
                </div>
              ) : (
                filteredStatutes.map((item) => {
                  const isExpanded = expandedStatuteId === item.id;
                  const isBookmarked = bookmarkedIds.includes(item.id);

                  return (
                    <div
                      key={item.id}
                      className="rounded-xl bg-[#001433] border border-[#d4af37]/20 hover:border-[#d4af37]/50 transition-colors overflow-hidden"
                    >
                      <div className="p-4 sm:p-5 flex items-start justify-between gap-4">
                        <div 
                          onClick={() => setExpandedStatuteId(isExpanded ? null : item.id)}
                          className="flex-1 cursor-pointer select-none space-y-1.5"
                        >
                          <div className="flex items-center gap-2 text-xs">
                            <span className="font-mono text-[#ffd754] font-semibold">
                              {item.citation}
                            </span>
                            <span className="text-gray-500" aria-hidden="true">·</span>
                            <span className="text-gray-400">{item.category}</span>
                          </div>
                          <h3 className="text-base font-serif font-bold text-white">
                            {item.title}
                          </h3>
                          <p className="text-xs text-gray-300 font-light leading-relaxed line-clamp-2">
                            {item.description}
                          </p>
                        </div>

                        <div className="flex items-center gap-2 shrink-0 pt-1">
                          <button
                            onClick={() => toggleBookmark(item.id)}
                            className={`p-1.5 rounded transition-colors ${
                              isBookmarked
                                ? "text-[#ffd754] bg-[#d4af37]/20"
                                : "text-gray-400 hover:text-[#ffd754]"
                            }`}
                            title={isBookmarked ? "Remove Bookmark" : "Bookmark Statute"}
                          >
                            <Bookmark className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => setExpandedStatuteId(isExpanded ? null : item.id)}
                            className="p-1.5 rounded text-[#ffd754] hover:bg-[#002459] transition-colors"
                          >
                            {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                          </button>
                        </div>
                      </div>

                      {isExpanded && (
                        <div className="px-4 pb-5 sm:px-5 sm:pb-5 border-t border-[#d4af37]/15 pt-3.5 space-y-3 text-xs bg-[#000e24]">
                          <div className="space-y-1">
                            <span className="text-[11px] font-mono text-[#ffd754] uppercase tracking-wider font-semibold">
                              Key Statutory Points:
                            </span>
                            <ul className="space-y-1 text-gray-300 font-light">
                              {item.keyPoints.map((pt, idx) => (
                                <li key={idx} className="flex items-start gap-2">
                                  <span className="text-[#ffd754]">•</span>
                                  <span>{pt}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          <div className="p-3 rounded-lg bg-[#001433] border border-[#d4af37]/20 space-y-1">
                            <span className="text-[11px] font-mono text-emerald-400 uppercase tracking-wider font-semibold">
                              Citizen Practical Relevance:
                            </span>
                            <p className="text-gray-300 font-light leading-relaxed">
                              {item.relevance}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })
              )}
            </div>
          </div>
        )}

        {/* TAB 2: TEMPLATES & EVIDENCE VAULT */}
        {activeTab === "vault" && (
          <div className="space-y-6">
            
            {/* Standard Downloadable Resource Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              
              <div className="p-5 rounded-xl bg-[#001433] border border-[#d4af37]/25 flex flex-col justify-between space-y-3">
                <div className="space-y-1.5">
                  <div className="w-8 h-8 rounded-lg bg-[#d4af37]/15 text-[#ffd754] flex items-center justify-center">
                    <FileDown className="w-4 h-4" />
                  </div>
                  <h4 className="text-sm font-serif font-bold text-white">
                    Roadside Rights Pocket Card
                  </h4>
                  <p className="text-xs text-gray-300 font-light leading-relaxed">
                    Compact printable reference with key citations, ignition key rules, and polite verbal scripts.
                  </p>
                </div>
                <a
                  href="/civic_data.json"
                  download="Civic_Roadside_Rights_Card.json"
                  className="px-3 py-2 rounded-lg bg-[#001d4a] hover:bg-[#002566] text-[#ffd754] text-xs font-mono font-medium flex items-center justify-center gap-1.5 transition-colors"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download Card (PDF/Kit)</span>
                </a>
              </div>

              <div className="p-5 rounded-xl bg-[#001433] border border-[#d4af37]/25 flex flex-col justify-between space-y-3">
                <div className="space-y-1.5">
                  <div className="w-8 h-8 rounded-lg bg-[#d4af37]/15 text-[#ffd754] flex items-center justify-center">
                    <FileDown className="w-4 h-4" />
                  </div>
                  <h4 className="text-sm font-serif font-bold text-white">
                    RTI Master Filing Kit
                  </h4>
                  <p className="text-xs text-gray-300 font-light leading-relaxed">
                    Form A templates, fee calculation matrices, and First Appellate Authority appeal templates.
                  </p>
                </div>
                <a
                  href="/civic_data.json"
                  download="RTI_Master_Kit_2026.json"
                  className="px-3 py-2 rounded-lg bg-[#001d4a] hover:bg-[#002566] text-[#ffd754] text-xs font-mono font-medium flex items-center justify-center gap-1.5 transition-colors"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download Kit (ZIP)</span>
                </a>
              </div>

              <div className="p-5 rounded-xl bg-[#001433] border border-[#d4af37]/25 flex flex-col justify-between space-y-3">
                <div className="space-y-1.5">
                  <div className="w-8 h-8 rounded-lg bg-[#d4af37]/15 text-[#ffd754] flex items-center justify-center">
                    <FileDown className="w-4 h-4" />
                  </div>
                  <h4 className="text-sm font-serif font-bold text-white">
                    Pro-Se Section 32 Affidavits
                  </h4>
                  <p className="text-xs text-gray-300 font-light leading-relaxed">
                    Standardized notice of appearance format for representing yourself in consumer & municipal forums.
                  </p>
                </div>
                <a
                  href="/civic_data.json"
                  download="ProSe_Filing_Templates.json"
                  className="px-3 py-2 rounded-lg bg-[#001d4a] hover:bg-[#002566] text-[#ffd754] text-xs font-mono font-medium flex items-center justify-center gap-1.5 transition-colors"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download Formats</span>
                </a>
              </div>

            </div>

            {/* Active Evidences List */}
            <div className="space-y-3 pt-2">
              <h3 className="text-base font-serif font-bold text-white flex items-center gap-2">
                <FolderLock className="w-4 h-4 text-[#d4af37]" />
                <span>Verified Case Evidence & Community Uploads</span>
              </h3>

              <div className="space-y-2.5">
                {evidence.map((item) => (
                  <div
                    key={item.id}
                    className="p-4 rounded-xl bg-[#001433] border border-[#d4af37]/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3"
                  >
                    <div className="space-y-1 min-w-0 flex-1">
                      <div className="flex items-center gap-2 text-xs">
                        <span className="font-mono text-[#ffd754] uppercase">{item.type}</span>
                        <span className="text-gray-500" aria-hidden="true">·</span>
                        <span className="text-gray-400">{item.fileSize}</span>
                        <span className="text-gray-500" aria-hidden="true">·</span>
                        <span className="text-emerald-400 flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3" />
                          {item.verifiedBy}
                        </span>
                      </div>
                      <h4 className="text-sm font-semibold text-white">{item.title}</h4>
                      <p className="text-xs text-gray-300 font-light">{item.description}</p>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <a
                        href={item.fileUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-1.5 rounded-lg bg-[#001e4d] hover:bg-[#002866] text-xs font-mono text-gray-200 flex items-center gap-1 transition-colors"
                      >
                        <FileText className="w-3.5 h-3.5 text-[#ffd754]" />
                        <span>Inspect</span>
                      </a>

                      {isAdmin && onApproveEvidence && item.status === "pending" && (
                        <button
                          onClick={() => onApproveEvidence(item.id)}
                          className="px-2.5 py-1.5 rounded bg-emerald-600/30 border border-emerald-500/50 text-emerald-300 text-xs font-mono hover:bg-emerald-600/50"
                        >
                          Approve
                        </button>
                      )}

                      {isAdmin && onDeleteEvidence && (
                        <button
                          onClick={() => onDeleteEvidence(item.id)}
                          className="p-1.5 rounded text-gray-400 hover:text-red-400 hover:bg-red-500/10"
                          title="Delete Evidence"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Citizen Submission Box */}
            <div className="p-5 rounded-xl bg-[#000e26] border border-[#d4af37]/30 space-y-3">
              <div className="space-y-1">
                <h4 className="text-sm font-serif font-bold text-white flex items-center gap-2">
                  <Upload className="w-4 h-4 text-[#d4af37]" />
                  <span>Submit Legal Evidence or Administrative Dossier</span>
                </h4>
                <p className="text-xs text-gray-400 font-light">
                  Upload RTI replies, court orders, or challan copies to help fellow citizens. Submissions are quarantined and reviewed before public display.
                </p>
              </div>

              {uploadSuccess ? (
                <div className="p-3 rounded-lg bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-mono flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Thank you! Your document has been submitted for legal desk verification.</span>
                </div>
              ) : (
                <form onSubmit={handleFormUpload} className="space-y-3 pt-1">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <input
                      type="text"
                      value={uploadTitle}
                      onChange={(e) => setUploadTitle(e.target.value)}
                      placeholder="Document Title (e.g. RTI Order on Road Tender)..."
                      className="px-3 py-2 bg-[#001433] border border-[#d4af37]/25 rounded-lg text-xs text-white placeholder-gray-500 outline-none"
                    />
                    <input
                      type="text"
                      value={uploadAuthor}
                      onChange={(e) => setUploadAuthor(e.target.value)}
                      placeholder="Your Name or 'Anonymous Citizen'..."
                      className="px-3 py-2 bg-[#001433] border border-[#d4af37]/25 rounded-lg text-xs text-white placeholder-gray-500 outline-none"
                    />
                  </div>
                  <textarea
                    value={uploadDesc}
                    onChange={(e) => setUploadDesc(e.target.value)}
                    rows={2}
                    placeholder="Brief description of the legal outcome or significance..."
                    className="w-full px-3 py-2 bg-[#001433] border border-[#d4af37]/25 rounded-lg text-xs text-white placeholder-gray-500 outline-none"
                  />
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
                    <input
                      type="file"
                      onChange={(e) => setUploadFile(e.target.files?.[0] || null)}
                      className="text-xs text-gray-400 file:mr-3 file:py-1.5 file:px-3 file:rounded file:border-0 file:text-xs file:font-mono file:bg-[#001d4a] file:text-[#ffd754]"
                    />
                    <button
                      type="submit"
                      disabled={isUploading}
                      className="px-4 py-2 rounded-lg bg-gradient-to-r from-[#d4af37] to-[#b89423] text-[#001233] font-mono font-bold text-xs uppercase hover:brightness-110 disabled:opacity-50 transition-all shrink-0 cursor-pointer"
                    >
                      {isUploading ? "Uploading..." : "Submit for Verification"}
                    </button>
                  </div>
                </form>
              )}
            </div>

          </div>
        )}

        {/* TAB 3: LEGAL MYTHBUSTERS */}
        {activeTab === "myths" && (
          <div className="space-y-4">
            <p className="text-xs text-gray-300 font-light">
              Common misconceptions often cause panic during police or civic interactions. Click each myth to test your knowledge and reveal the constitutional truth.
            </p>

            <div className="space-y-3">
              {myths.map((item, idx) => {
                const isExpanded = expandedMythIdx === idx;
                const userChoice = mythAnswers[idx];

                return (
                  <div
                    key={idx}
                    className="rounded-xl bg-[#001433] border border-[#d4af37]/20 p-4 sm:p-5 space-y-3"
                  >
                    <div 
                      onClick={() => setExpandedMythIdx(isExpanded ? null : idx)}
                      className="flex items-start justify-between gap-4 cursor-pointer select-none"
                    >
                      <div className="space-y-1 flex-1">
                        <span className="text-[11px] font-mono uppercase tracking-wider text-amber-400 font-semibold">
                          Myth vs Reality #{idx + 1}
                        </span>
                        <h4 className="text-base font-serif font-bold text-white">
                          {item.question}
                        </h4>
                        <p className="text-xs text-red-300/90 font-mono">
                          Common Belief: {item.myth}
                        </p>
                      </div>

                      <button className="p-1 rounded text-[#ffd754] hover:bg-[#002459]">
                        {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                      </button>
                    </div>

                    {isExpanded && (
                      <div className="border-t border-[#d4af37]/15 pt-3.5 space-y-3">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-mono text-gray-400">What is the legal reality?</span>
                          <button
                            onClick={() => setMythAnswers(prev => ({ ...prev, [idx]: true }))}
                            className={`px-3 py-1 rounded text-xs font-mono font-bold transition-colors ${
                              userChoice === true
                                ? "bg-emerald-500 text-white"
                                : "bg-[#001e4d] text-emerald-400 hover:bg-[#002866]"
                            }`}
                          >
                            Show Verdict
                          </button>
                        </div>

                        <div className="p-4 rounded-lg bg-[#000a1c] border border-emerald-500/30 space-y-1.5">
                          <span className="text-xs font-mono text-emerald-400 font-bold uppercase tracking-wider flex items-center gap-1.5">
                            <CheckCircle2 className="w-4 h-4" />
                            Constitutional Position & Ground Rule:
                          </span>
                          <p className="text-xs sm:text-sm text-gray-200 font-light leading-relaxed">
                            {item.answerOnTrue}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 4: SCENARIO QUIZ */}
        {activeTab === "quiz" && (
          <div className="max-w-2xl mx-auto p-6 rounded-xl bg-[#001433] border border-[#d4af37]/30 space-y-5">
            {!quizFinished ? (
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-[#d4af37]/20 pb-2 text-xs font-mono text-gray-400">
                  <span>Question {quizIndex + 1} of {QUIZ_QUESTIONS.length}</span>
                  <span className="text-[#ffd754]">Score: {quizScore} / {QUIZ_QUESTIONS.length}</span>
                </div>

                <h3 className="text-base sm:text-lg font-serif font-bold text-white leading-relaxed">
                  {QUIZ_QUESTIONS[quizIndex].question}
                </h3>

                <div className="space-y-2 pt-1">
                  {QUIZ_QUESTIONS[quizIndex].options.map((opt, i) => {
                    const isSelected = selectedOption === i;
                    const isCorrect = i === QUIZ_QUESTIONS[quizIndex].correct;
                    let btnStyle = "bg-[#000a1c] border-[#d4af37]/20 text-gray-200 hover:border-[#d4af37]";

                    if (selectedOption !== null) {
                      if (isCorrect) {
                        btnStyle = "bg-emerald-500/20 border-emerald-500 text-emerald-300 font-semibold";
                      } else if (isSelected) {
                        btnStyle = "bg-red-500/20 border-red-500 text-red-300";
                      } else {
                        btnStyle = "bg-[#000a1c] opacity-50 border-transparent text-gray-400";
                      }
                    }

                    return (
                      <button
                        key={i}
                        onClick={() => handleQuizAnswer(i)}
                        disabled={selectedOption !== null}
                        className={`w-full text-left p-3.5 rounded-lg border text-xs sm:text-sm transition-all flex items-start gap-3 cursor-pointer ${btnStyle}`}
                      >
                        <span className="font-mono font-bold shrink-0 text-[#ffd754]">
                          {String.fromCharCode(65 + i)}.
                        </span>
                        <span>{opt}</span>
                      </button>
                    );
                  })}
                </div>

                {selectedOption !== null && (
                  <div className="p-3.5 rounded-lg bg-[#000d24] border border-[#d4af37]/25 space-y-1.5 animate-in fade-in">
                    <span className="text-[11px] font-mono text-[#ffd754] font-semibold uppercase">
                      Explanation:
                    </span>
                    <p className="text-xs text-gray-300 font-light leading-relaxed">
                      {QUIZ_QUESTIONS[quizIndex].explanation}
                    </p>
                    <div className="pt-2 flex justify-end">
                      <button
                        onClick={handleNextQuiz}
                        className="px-4 py-1.5 rounded-lg bg-[#d4af37] text-[#001233] font-mono font-bold text-xs uppercase hover:brightness-110"
                      >
                        {quizIndex < QUIZ_QUESTIONS.length - 1 ? "Next Question" : "View Final Results"}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="py-6 text-center space-y-4">
                <Award className="w-12 h-12 text-[#ffd754] mx-auto" />
                <h3 className="text-xl font-serif font-bold text-white">Quiz Completed!</h3>
                <p className="text-sm text-gray-300">
                  You scored <span className="text-[#ffd754] font-bold">{quizScore} out of {QUIZ_QUESTIONS.length}</span> on everyday Indian legal safeguards.
                </p>
                <div className="pt-2">
                  <button
                    onClick={handleResetQuiz}
                    className="px-5 py-2 rounded-lg bg-[#d4af37] text-[#001233] font-mono font-bold text-xs uppercase hover:brightness-110"
                  >
                    Retake Quiz
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 5: HANDBOOKS & BOOK READER */}
        {activeTab === "books" && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            
            <div className="p-6 rounded-xl bg-[#001433] border border-[#d4af37]/30 flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <span className="text-[11px] font-mono uppercase tracking-widest text-[#ffd754]">
                  Volume I
                </span>
                <h4 className="text-lg font-serif font-bold text-white">
                  Handbook of Citizen Rights
                </h4>
                <p className="text-xs text-gray-300 font-light leading-relaxed">
                  5 concise chapters covering police stop rules, digital privacy under Puttaswamy, Section 41A, FIR filing, and pro-se advocacy.
                </p>
              </div>
              <button
                onClick={() => onOpenBookModal && onOpenBookModal("rights", 0)}
                className="w-full py-2.5 rounded-lg bg-[#001d4a] hover:bg-[#002566] text-[#ffd754] text-xs font-mono font-bold uppercase transition-colors flex items-center justify-center gap-2"
              >
                <BookOpen className="w-4 h-4" />
                <span>Open Volume I</span>
              </button>
            </div>

            <div className="p-6 rounded-xl bg-[#001433] border border-[#d4af37]/30 flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <span className="text-[11px] font-mono uppercase tracking-widest text-[#ffd754]">
                  Volume II
                </span>
                <h4 className="text-lg font-serif font-bold text-white">
                  Sovereign Defense Goals
                </h4>
                <p className="text-xs text-gray-300 font-light leading-relaxed">
                  Strategic roadmap for building civic resilience, legal clinic networks, and pro-se representation across districts.
                </p>
              </div>
              <button
                onClick={() => onOpenBookModal && onOpenBookModal("goals", 0)}
                className="w-full py-2.5 rounded-lg bg-[#001d4a] hover:bg-[#002566] text-[#ffd754] text-xs font-mono font-bold uppercase transition-colors flex items-center justify-center gap-2"
              >
                <BookOpen className="w-4 h-4" />
                <span>Open Volume II</span>
              </button>
            </div>

            <div className="p-6 rounded-xl bg-[#001433] border border-[#d4af37]/30 flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <span className="text-[11px] font-mono uppercase tracking-widest text-[#ffd754]">
                  Volume III
                </span>
                <h4 className="text-lg font-serif font-bold text-white">
                  Project Mission & Background
                </h4>
                <p className="text-xs text-gray-300 font-light leading-relaxed">
                  The foundational philosophy of Civic Shield: eliminating procedural blindness and establishing reciprocal constitutional respect.
                </p>
              </div>
              <button
                onClick={() => onOpenBookModal && onOpenBookModal("mission", 0)}
                className="w-full py-2.5 rounded-lg bg-[#001d4a] hover:bg-[#002566] text-[#ffd754] text-xs font-mono font-bold uppercase transition-colors flex items-center justify-center gap-2"
              >
                <BookOpen className="w-4 h-4" />
                <span>Open Volume III</span>
              </button>
            </div>

          </div>
        )}

        {/* TAB 6: JURISPRUDENCE NETWORK */}
        {activeTab === "network" && (
          <div className="rounded-xl overflow-hidden border border-[#d4af37]/25 bg-[#000a1c]">
            <ConstitutionalNetwork />
          </div>
        )}

      </div>
    </section>
  );
}
