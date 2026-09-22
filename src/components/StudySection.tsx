import React, { useState, useEffect, useRef } from "react";
import { 
  Scale, 
  ShieldCheck, 
  AlertCircle, 
  BookOpen, 
  CheckCircle2, 
  FileText, 
  Smartphone, 
  Car, 
  HelpCircle, 
  Search, 
  ChevronRight, 
  Bookmark, 
  Sparkles, 
  Eye, 
  ArrowRight,
  Gavel,
  Lock,
  Compass
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export type StudyCategory = "all" | "rights" | "rules" | "regulations" | "responsibilities" | "definitions";

export interface StudyItem {
  id: string;
  category: "rights" | "rules" | "regulations" | "responsibilities" | "definitions";
  categoryLabel: string;
  number: string;
  title: string;
  statuteRef: string;
  explanation: string;
  example: string;
  practicalAction: string;
  tags: string[];
}

export const STUDY_CURRICULUM: StudyItem[] = [
  // --- 1. RIGHTS ---
  {
    id: "right-art21",
    category: "rights",
    categoryLabel: "Citizen Right",
    number: "R-01",
    title: "Right to Life, Dignity & Personal Liberty",
    statuteRef: "Article 21, Constitution of India",
    explanation: "No person can be deprived of their life or personal liberty except according to fair, just, and reasonable procedure established by law. This is the master shield prohibiting arbitrary detention, custodial violence, and unrecorded state restraint.",
    example: "If a police officer stops you and attempts to lock you in a police station room without recording your name in the General Diary (GD) or stating any legal charge, Article 21 is violated immediately.",
    practicalAction: "Always ask calmly: “Officer, under what statutory provision or judicial order is my liberty being restricted?”",
    tags: ["liberty", "dignity", "detention", "custody", "article 21"]
  },
  {
    id: "right-art22",
    category: "rights",
    categoryLabel: "Citizen Right",
    number: "R-02",
    title: "Rights Upon Arrest & Immediate Legal Counsel",
    statuteRef: "Article 22(1) & 22(2), Constitution of India",
    explanation: "Whenever you are arrested, police MUST inform you of the exact grounds of arrest as soon as possible. You have the constitutional right to consult and be defended by a legal practitioner of your choice, and must be produced before the nearest magistrate within 24 hours.",
    example: "Police arrest a citizen but refuse to allow them to call their family or lawyer for 30 hours. Both the denial of counsel and exceeding 24 hours without a magistrate's remand are illegal.",
    practicalAction: "Demand: “I request to contact my family and consult my advocate immediately as protected by Article 22.”",
    tags: ["arrest", "counsel", "lawyer", "magistrate", "24 hours", "article 22"]
  },
  {
    id: "right-art20-3",
    category: "rights",
    categoryLabel: "Citizen Right",
    number: "R-03",
    title: "Protection Against Self-Incrimination",
    statuteRef: "Article 20(3), Constitution of India",
    explanation: "No person accused of an offense can be compelled to be a witness against themselves. You cannot be forced to sign blank sheets, give coerced verbal confessions, or reveal phone passwords that incriminate you.",
    example: "An investigating officer demands you sign a handwritten confession or unlock your encrypted WhatsApp chats under threat of physical beating. Article 20(3) protects your absolute right to remain silent.",
    practicalAction: "State clearly: “On legal advice, I exercise my constitutional right to remain silent and decline to answer incriminating questions without counsel present.”",
    tags: ["silence", "confession", "password", "phone", "article 20(3)"]
  },
  {
    id: "right-art19",
    category: "rights",
    categoryLabel: "Citizen Right",
    number: "R-04",
    title: "Freedom of Peaceful Movement & Public Filming",
    statuteRef: "Article 19(1)(a) & 19(1)(d), Constitution of India",
    explanation: "You have the freedom to move freely on public streets and to observe public officials performing public duties. Filming or recording law enforcement officers in a public space is lawful as long as you do not physically obstruct their duty.",
    example: "You stand on a public footpath 10 feet away peacefully filming a traffic police checkpoint on your phone. The officer has no legal right to snatch your phone or demand you delete the footage.",
    practicalAction: "State respectfully: “I am standing peacefully in a public space exercising my Article 19 rights without obstructing your duty.”",
    tags: ["recording", "filming", "public space", "freedom", "article 19"]
  },
  {
    id: "right-art39a",
    category: "rights",
    categoryLabel: "Citizen Right",
    number: "R-05",
    title: "Right to Statutory Free Legal Aid",
    statuteRef: "Article 39A & Legal Services Authorities Act 1987",
    explanation: "The State is mandated to ensure that justice is not denied to any citizen by reason of economic or social disability. Every arrested person unable to afford an advocate is entitled to a state-appointed defense lawyer through the District Legal Services Authority (DLSA).",
    example: "A daily wage earner is presented before a magistrate without an advocate. The magistrate is legally obligated to inform them of their right to a free legal aid advocate before conducting the hearing.",
    practicalAction: "Inform the magistrate: “Your Honor, I cannot afford private counsel and request an assigned advocate from the Legal Services Authority.”",
    tags: ["legal aid", "dlsa", "nalsa", "poverty", "advocate", "article 39a"]
  },

  // --- 2. RULES ---
  {
    id: "rule-dk-basu",
    category: "rules",
    categoryLabel: "State Rule",
    number: "RU-01",
    title: "D.K. Basu Mandatory Arrest Safeguards",
    statuteRef: "Supreme Court Landmark Ruling (1997) 1 SCC 416",
    explanation: "The Supreme Court mandated 11 non-negotiable rules for every arrest: police must wear legible nametags with designations; prepare an Arrest Memo witnessed by a family member or respectable local citizen; and formally record the time and place.",
    example: "Officers in plain clothes without name badges arrive in an unmarked car and take someone away without issuing any receipt or notifying their spouse. This violates mandatory D.K. Basu guidelines.",
    practicalAction: "Ask for identification: “Officer, please show your departmental ID and prepare a signed Arrest Memo witnessed by someone present.”",
    tags: ["dk basu", "nametag", "arrest memo", "witness", "police rules"]
  },
  {
    id: "rule-sec41a",
    category: "rules",
    categoryLabel: "State Rule",
    number: "RU-02",
    title: "Notice of Appearance Instead of Arrest",
    statuteRef: "Section 41A CrPC / Section 35 BNSS",
    explanation: "For offenses punishable with imprisonment up to 7 years, police CANNOT arrest directly as a routine measure. They must first issue a written Notice of Appearance specifying a date and time for you to join questioning.",
    example: "Police summon you over a neighbor dispute or financial allegation punishable by 3 years. They cannot throw you into a cell on the spot; they must serve a formal 41A Notice.",
    practicalAction: "Remind the officer: “Under Section 41A and the Supreme Court Arnesh Kumar guidelines, please issue a written Notice of Appearance for this inquiry.”",
    tags: ["41a", "notice", "arrest", "7 years", "arnesh kumar"]
  },
  {
    id: "rule-panchnama",
    category: "rules",
    categoryLabel: "State Rule",
    number: "RU-03",
    title: "Mandatory Seizure Memo & Independent Witnesses",
    statuteRef: "Section 100 & 102 CrPC / Section 107 BNSS",
    explanation: "When police search a person, vehicle, or residence and seize any object (phone, laptop, cash, documents), they MUST prepare a written Seizure Memo on the spot, witnessed and signed by two independent local witnesses (Panchas).",
    example: "An officer takes your mobile phone at a checkpoint and puts it in their pocket without writing down the model, IMEI number, or physical condition. This seizure is procedurally defective.",
    practicalAction: "Request paperwork: “If my device or property is being seized, please provide an immediate signed Seizure Memo with witness signatures.”",
    tags: ["seizure memo", "panchnama", "search", "phone", "witness"]
  },
  {
    id: "rule-magistrate-24hr",
    category: "rules",
    categoryLabel: "State Rule",
    number: "RU-04",
    title: "Strict 24-Hour Production Before Judicial Magistrate",
    statuteRef: "Section 57 CrPC & Article 22(2)",
    explanation: "Police custody cannot exceed 24 hours under any circumstances without an explicit order from a Judicial Magistrate. If transit time is required, the journey must be verified and logged in the station diary.",
    example: "Detaining someone from Friday evening through Monday morning without taking them to the duty magistrate's home or court constitutes unlawful confinement and police contempt of court.",
    practicalAction: "If held overnight: “It has been over 24 hours since my restraint. I must be produced before the jurisdictional magistrate immediately.”",
    tags: ["24 hours", "magistrate", "remand", "custody", "section 57"]
  },

  // --- 3. REGULATIONS ---
  {
    id: "reg-traffic-rank",
    category: "regulations",
    categoryLabel: "Administrative Regulation",
    number: "RG-01",
    title: "Traffic Police Authority & Spot Fine Ranks",
    statuteRef: "Motor Vehicles Act 1988 & State Police Manuals",
    explanation: "Only an officer of the rank of Assistant Sub-Inspector (ASI) or Sub-Inspector (SI) or above wearing a standard uniform with a brass nametag has statutory authority to issue compoundable traffic spot challans. Traffic constables cannot demand spot fines or seize ignition keys.",
    example: "A traffic constable snatches your motorcycle keys out of the ignition and demands cash on the spot without a printed or digital e-challan. This is unlawful under motor vehicle regulations.",
    practicalAction: "Politely clarify: “Officer, please call the Sub-Inspector with the official e-challan device. Under MV rules, key snatching is not permitted.”",
    tags: ["traffic", "challan", "fine", "constable", "keys", "motor vehicles"]
  },
  {
    id: "reg-digilocker",
    category: "regulations",
    categoryLabel: "Administrative Regulation",
    number: "RG-02",
    title: "Digital Vehicle Documents Validity",
    statuteRef: "Rule 139, Central Motor Vehicles Rules (CMVR) & IT Act",
    explanation: "Driver licenses, Registration Certificates (RC), insurance policies, and PUCs presented electronically via DigiLocker or mParivahan carry statutory equivalence to original physical documents. Police cannot insist on physical cards.",
    example: "A traffic officer claims: 'We don't accept DigiLocker on phones, give me physical original card or pay fine.' This claim is completely invalid under Ministry of Road Transport directives.",
    practicalAction: "Display the app: “Here is my verified DigiLocker document, which is valid and recognized under Rule 139 CMVR.”",
    tags: ["digilocker", "mparivahan", "license", "rc", "insurance", "cmvr"]
  },
  {
    id: "reg-women-arrest",
    category: "regulations",
    categoryLabel: "Administrative Regulation",
    number: "RG-03",
    title: "Protections for Women Citizens During Arrest",
    statuteRef: "Section 46(4) CrPC / Section 43 BNSS",
    explanation: "Women cannot be arrested between sunset and sunrise (night time) except under extraordinary circumstances and solely with prior written permission from a Judicial Magistrate. Furthermore, searches of female citizens can only be conducted by a female officer with strict decency.",
    example: "Male police officers enter a woman's home at 9:00 PM and try to force her to the police station without a female constable or magistrate order. This is a severe statutory violation.",
    practicalAction: "State clearly: “Under Section 46(4) CrPC, female citizens cannot be arrested after sunset without a female officer and a Judicial Magistrate's written permission.”",
    tags: ["women", "sunset", "sunrise", "female officer", "section 46(4)"]
  },
  {
    id: "reg-zero-fir",
    category: "regulations",
    categoryLabel: "Administrative Regulation",
    number: "RG-04",
    title: "Mandatory Zero FIR Acceptance",
    statuteRef: "Supreme Court Lalita Kumari Mandate & MHA Advisory",
    explanation: "A police station CANNOT refuse to register an FIR on the grounds that the crime occurred in a different locality or outside their jurisdiction. They must register a 'Zero FIR' with a serial number '0' and promptly transfer the case file to the concerned station.",
    example: "You are assaulted on a highway and walk into the nearest city precinct to report it. The station officer says: 'Go to the highway station 20 km away.' They are legally required to file a Zero FIR immediately.",
    practicalAction: "Insist firmly: “Under Supreme Court guidelines, please register a Zero FIR right now and transfer the docket to the concerned station.”",
    tags: ["zero fir", "fir", "jurisdiction", "police station", "complaint"]
  },

  // --- 4. RESPONSIBILITIES ---
  {
    id: "resp-calm",
    category: "responsibilities",
    categoryLabel: "Citizen Responsibility",
    number: "RS-01",
    title: "Maintain Calm Demeanor & Non-Violent Conduct",
    statuteRef: "Peaceful De-Escalation & Citizen Conduct",
    explanation: "Never flee, physically touch an officer, or use profane language. Hostility or aggressive gestures escalate encounters immediately and can give police an excuse to lodge charges of obstructing public servants.",
    example: "An officer is rude or raises their voice. Shouting back or pushing their arm away triggers Section 186/353 IPC charges. Keeping your hands visible and speaking with measured calm maintains your moral and legal high ground.",
    practicalAction: "Keep hands visible at waist level, maintain an even tone, and avoid sudden movements.",
    tags: ["calm", "de-escalation", "conduct", "non-violence"]
  },
  {
    id: "resp-clarify",
    category: "responsibilities",
    categoryLabel: "Citizen Responsibility",
    number: "RS-02",
    title: "Prompt Verbal Clarification of Encounter Status",
    statuteRef: "Procedural Clarification Protocol",
    explanation: "Do not remain passively guessing what an encounter is about. Clarify whether you are being asked voluntary informational questions or if you are legally detained.",
    example: "An officer walks up to you on a sidewalk and starts questioning your destination. Asking if you are detained establishes legal boundaries instantly.",
    practicalAction: "Ask politely: “Officer, am I legally detained, or am I free to continue on my way?”",
    tags: ["status", "questions", "clarification", "detained"]
  },
  {
    id: "resp-nonconsent",
    category: "responsibilities",
    categoryLabel: "Citizen Responsibility",
    number: "RS-03",
    title: "Explicit Verbal Non-Consent to Unlawful Searches",
    statuteRef: "Preserving Legal Objections for Court",
    explanation: "If police ask to search your backpack, pockets, or vehicle trunk without a warrant, verbally state your lack of consent. You must never resist physically, but verbal objection preserves your ability to exclude illegally obtained evidence in court.",
    example: "Police ask: 'Open your bag.' If you say nothing or open it voluntarily, the court treats it as consensual search. If you state non-consent, the search can be contested.",
    practicalAction: "Say firmly: “I do not consent to any voluntary search of my person or property, but I will not resist you physically.”",
    tags: ["consent", "search", "objection", "court evidence"]
  },
  {
    id: "resp-identify",
    category: "responsibilities",
    categoryLabel: "Citizen Responsibility",
    number: "RS-04",
    title: "Provide Truthful Identification When Lawfully Mandated",
    statuteRef: "Motor Vehicles Act Sec 130 & Criminal Procedure",
    explanation: "While you are not required to answer interrogating questions about your personal life, you ARE legally required to state your true name and address if reasonably suspected of an offense, and show your driver license during a motor vehicle stop.",
    example: "Giving a fake name or fabricated residential address during a legitimate stop constitutes an independent criminal offense. Always provide accurate basic identification.",
    practicalAction: "Provide your true name, residential address, and required driving credentials truthfully.",
    tags: ["identity", "truth", "name", "address", "license"]
  },

  // --- 5. DEFINITIONS & KEY LEGAL CONCEPTS ---
  {
    id: "def-cognizable",
    category: "definitions",
    categoryLabel: "Legal Concept",
    number: "DF-01",
    title: "Cognizable vs. Non-Cognizable Offense",
    statuteRef: "Section 2(c) & 2(l), CrPC / BNSS",
    explanation: "A Cognizable offense is a serious crime (e.g., theft, assault, robbery) where police can investigate and arrest without a court warrant. A Non-Cognizable offense is a minor dispute (e.g., simple verbal insults, minor trespass) where police CANNOT arrest without a magistrate's warrant.",
    example: "If two neighbors argue verbally without physical violence, it is Non-Cognizable. Police cannot arrest either person on the spot; they can only record a Non-Cognizable Report (NCR) and refer the parties to a magistrate.",
    practicalAction: "Ask the officer: “Is the alleged complaint cognizable or non-cognizable under the schedule?”",
    tags: ["cognizable", "non-cognizable", "warrant", "definition"]
  },
  {
    id: "def-fir-ncr",
    category: "definitions",
    categoryLabel: "Legal Concept",
    number: "DF-02",
    title: "FIR (First Information Report) vs. NCR",
    statuteRef: "Section 154 & 155, CrPC / BNSS",
    explanation: "An FIR is the mandatory registered entry when information reveals a cognizable offense, triggering immediate formal police investigation. An NCR (Non-Cognizable Report) is registered for minor infractions and cannot be investigated by police without a magistrate's specific order.",
    example: "If someone steals your motorcycle, it requires an FIR under Section 379 IPC. If someone simply loses an item or has a minor verbal spat, an NCR is filed instead.",
    practicalAction: "When filing an FIR, remember you are legally entitled to receive an immediate, signed copy completely free of cost.",
    tags: ["fir", "ncr", "first information report", "police report"]
  },
  {
    id: "def-bailable",
    category: "definitions",
    categoryLabel: "Legal Concept",
    number: "DF-03",
    title: "Bailable vs. Non-Bailable Offense",
    statuteRef: "Section 436 & 437, CrPC / BNSS",
    explanation: "In a Bailable offense, bail is an absolute legal right. The police station or magistrate MUST release you upon furnishing a surety or bond; police have no discretion to refuse. In a Non-Bailable offense, bail is at the judicial discretion of the court after reviewing case facts.",
    example: "If arrested for a bailable traffic infraction, you cannot be remanded to jail if you offer to furnish a bail bond at the police station.",
    practicalAction: "Inquire immediately: “Is this section bailable as a matter of right under the CrPC First Schedule?”",
    tags: ["bail", "bailable", "non-bailable", "bond", "surety"]
  },
  {
    id: "def-custody-types",
    category: "definitions",
    categoryLabel: "Legal Concept",
    number: "DF-04",
    title: "Police Custody vs. Judicial Custody",
    statuteRef: "Section 167, CrPC / BNSS",
    explanation: "Police Custody means being held in a police station lockup under the physical control of investigating officers for interrogation (limited to 15 days maximum). Judicial Custody means being held in an official central or district prison under the direct supervision of the court magistrate, where police cannot interrogate you without prior court permission.",
    example: "When an arrested citizen is brought before the magistrate after 24 hours, the magistrate decides whether to remand them to police custody or send them to judicial custody in jail.",
    practicalAction: "A magistrate hearing is your opportunity to state any police mistreatment and request judicial custody or bail.",
    tags: ["police custody", "judicial custody", "lockup", "prison", "remand"]
  },
  {
    id: "def-panchnama",
    category: "definitions",
    categoryLabel: "Legal Concept",
    number: "DF-05",
    title: "Panchnama (Contemporaneous Witness Record)",
    statuteRef: "Section 100, CrPC & Indian Evidence Act",
    explanation: "A Panchnama is a contemporaneous handwritten document prepared by investigating officers in the physical presence of at least two independent, respectable local witnesses (Panchas) documenting a crime scene, a search, or seized property.",
    example: "If contraband or a mobile device is claimed to be found in a car, the police must have two local citizens watch the inspection and sign the Panchnama on the spot.",
    practicalAction: "Never sign as a Panch witness without thoroughly reading and verifying every single item listed on the document.",
    tags: ["panchnama", "panch", "seizure", "evidence", "witness"]
  },
  {
    id: "def-habeas-corpus",
    category: "definitions",
    categoryLabel: "Legal Concept",
    number: "DF-06",
    title: "Writ of Habeas Corpus (Produce the Body)",
    statuteRef: "Article 32 & Article 226, Constitution of India",
    explanation: "A constitutional writ petition filed in the Supreme Court or High Court to challenge illegal, secret, or unrecorded police detentions. The court orders the police authority to physically produce the detained person before the bench and justify the legal grounds for detention.",
    example: "If a person is picked up by police and disappears without any station diary entry or court production for 48 hours, their family or advocate can file an emergency Habeas Corpus petition.",
    practicalAction: "If a family member is secretly detained, contact a High Court advocate to initiate an emergency Habeas Corpus writ immediately.",
    tags: ["habeas corpus", "writ", "high court", "supreme court", "illegal detention"]
  }
];

export default function StudySection() {
  const [activeCategory, setActiveCategory] = useState<StudyCategory>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [studiedIds, setStudiedIds] = useState<Set<string>>(() => new Set());
  const [activeScrollItem, setActiveScrollItem] = useState<string>("right-art21");
  const itemRefs = useRef<Record<string, HTMLDivElement | null>>({});

  // Filter items
  const filteredItems = STUDY_CURRICULUM.filter((item) => {
    const matchesCategory = activeCategory === "all" || item.category === activeCategory;
    const matchesSearch = 
      searchQuery.trim() === "" ||
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.statuteRef.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.explanation.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  // Track scroll position to update the learning progress
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY + 250;
      for (const item of STUDY_CURRICULUM) {
        const el = itemRefs.current[item.id];
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollY >= top && scrollY < top + height) {
            setActiveScrollItem(item.id);
            setStudiedIds(prev => {
              if (prev.has(item.id)) return prev;
              const next = new Set(prev);
              next.add(item.id);
              return next;
            });
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const progressPercentage = Math.round((studiedIds.size / STUDY_CURRICULUM.length) * 100);

  const categoryCounts = {
    all: STUDY_CURRICULUM.length,
    rights: STUDY_CURRICULUM.filter(i => i.category === "rights").length,
    rules: STUDY_CURRICULUM.filter(i => i.category === "rules").length,
    regulations: STUDY_CURRICULUM.filter(i => i.category === "regulations").length,
    responsibilities: STUDY_CURRICULUM.filter(i => i.category === "responsibilities").length,
    definitions: STUDY_CURRICULUM.filter(i => i.category === "definitions").length,
  };

  return (
    <section 
      id="study" 
      className="py-16 md:py-24 bg-[#000d21] border-t border-b border-[#d4af37]/20 relative overflow-hidden text-gray-100"
    >
      {/* Background radial glow & clean grid lines */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_#001a4d_0%,_#000d21_60%,_#000612_100%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#d4af3708_1px,transparent_1px),linear-gradient(to_bottom,#d4af3708_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none opacity-40" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-10">
        
        {/* SECTION HEADER: Dedicated purely to studying laws & rights */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#d4af37]/10 border border-[#d4af37]/30 text-[#ffd754] text-xs font-mono tracking-widest uppercase">
            <Scale className="w-3.5 h-3.5 text-[#d4af37]" />
            CIVIC LEGAL STUDY CURRICULUM
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-white tracking-tight">
            Learn Your <span className="text-[#d4af37] italic">Rights & Rules</span>
          </h2>
          <p className="text-sm sm:text-base text-gray-300 font-light leading-relaxed">
            A comprehensive, verified study archive. Review fundamental citizen rights, police conduct rules, 
            statutory regulations, citizen responsibilities, and core definitions with clear real-world examples.
          </p>
        </div>

        {/* PROGRESS HUD & CONTROLS BAR */}
        <div className="bg-[#001433]/80 border border-[#d4af37]/25 rounded-xl p-4 sm:p-5 backdrop-blur-md shadow-xl space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            
            {/* Scroll Learning Progress */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-[#d4af37]/15 border border-[#d4af37]/30 flex items-center justify-center text-[#d4af37] font-mono font-bold text-sm">
                {studiedIds.size}/{STUDY_CURRICULUM.length}
              </div>
              <div>
                <p className="text-xs font-mono uppercase tracking-wider text-gray-400">Study Mastery Progress</p>
                <div className="flex items-center gap-2">
                  <div className="w-32 sm:w-44 h-2 bg-gray-800 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-amber-500 to-[#d4af37] transition-all duration-300"
                      style={{ width: `${progressPercentage}%` }}
                    />
                  </div>
                  <span className="text-xs font-mono font-bold text-[#ffd754]">{progressPercentage}%</span>
                </div>
              </div>
            </div>

            {/* Instant Search Bar */}
            <div className="relative w-full sm:w-72">
              <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search rights, rules, bail..."
                className="w-full bg-[#000a1a] border border-[#d4af37]/25 focus:border-[#d4af37] text-xs font-sans text-white pl-9 pr-3 py-2 rounded-lg outline-none placeholder:text-gray-500"
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery("")}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white text-xs"
                >
                  ✕
                </button>
              )}
            </div>
          </div>

          {/* Category Tabs: One-Click Category Filter */}
          <div className="flex items-center gap-2 pt-2 border-t border-white/5 overflow-x-auto pb-1 scrollbar-none sm:flex-wrap">
            {(
              [
                { id: "all", label: "All Curriculum" },
                { id: "rights", label: "Rights" },
                { id: "rules", label: "Rules" },
                { id: "regulations", label: "Regulations" },
                { id: "responsibilities", label: "Responsibilities" },
                { id: "definitions", label: "Definitions & Concepts" }
              ] as { id: StudyCategory; label: string }[]
            ).map((cat) => {
              const isActive = activeCategory === cat.id;
              const count = categoryCounts[cat.id];
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`shrink-0 px-3.5 py-2 rounded-lg text-xs font-mono tracking-wider transition-all duration-150 flex items-center gap-1.5 cursor-pointer min-h-[40px] whitespace-nowrap ${
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

        {/* STUDY CURRICULUM ITEMS (Interactive Scroll & Learning Grid) */}
        <div className="space-y-6">
          {filteredItems.length === 0 ? (
            <div className="p-12 text-center bg-[#001233]/40 border border-dashed border-[#d4af37]/20 rounded-xl">
              <AlertCircle className="w-8 h-8 text-[#d4af37] mx-auto mb-2 opacity-60" />
              <p className="text-sm font-mono text-gray-400 uppercase tracking-wider">No study items match your query.</p>
              <button 
                onClick={() => { setActiveCategory("all"); setSearchQuery(""); }}
                className="mt-3 text-xs text-[#ffd754] underline hover:text-white cursor-pointer"
              >
                Reset search & category filter
              </button>
            </div>
          ) : (
            filteredItems.map((item, idx) => {
              const isStudied = studiedIds.has(item.id);
              const isCurrent = activeScrollItem === item.id;

              return (
                <motion.div
                  key={item.id}
                  id={item.id}
                  ref={(el) => { itemRefs.current[item.id] = el; }}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.35, delay: Math.min(idx * 0.05, 0.25) }}
                  onClick={() => {
                    setStudiedIds(prev => {
                      const next = new Set(prev);
                      next.add(item.id);
                      return next;
                    });
                  }}
                  className={`relative p-5 sm:p-7 rounded-xl border transition-all duration-300 bg-[#001433]/90 backdrop-blur-md ${
                    isCurrent
                      ? "border-[#d4af37] ring-1 ring-[#d4af37]/40 shadow-[0_0_30px_rgba(212,175,55,0.15)]"
                      : "border-[#d4af37]/20 hover:border-[#d4af37]/50 shadow-lg"
                  }`}
                >
                  {/* Card Header Bar */}
                  <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-white/10">
                    <div className="flex items-center gap-3">
                      <span className="px-2.5 py-1 rounded bg-[#d4af37]/15 border border-[#d4af37]/40 text-[#ffd754] font-mono text-xs font-bold tracking-wider">
                        {item.number}
                      </span>
                      <span className="text-xs font-mono uppercase tracking-widest text-gray-400 flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#d4af37]" />
                        {item.categoryLabel}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-mono text-[#d4af37] bg-black/40 px-2.5 py-0.5 rounded border border-[#d4af37]/20">
                        {item.statuteRef}
                      </span>
                      {isStudied && (
                        <span className="text-emerald-400 text-xs font-mono flex items-center gap-1" title="Marked as Studied">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span className="hidden sm:inline">Studied</span>
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Title & Core Explanation */}
                  <div className="pt-4 space-y-4">
                    <div>
                      <h3 className="text-xl sm:text-2xl font-serif font-bold text-white tracking-wide">
                        {item.title}
                      </h3>
                      <p className="mt-2 text-sm sm:text-base text-gray-200 leading-relaxed font-light">
                        {item.explanation}
                      </p>
                    </div>

                    {/* Simple Real-World Example */}
                    <div className="p-4 rounded-lg bg-[#000a1a]/80 border-l-2 border-[#d4af37] space-y-1">
                      <div className="flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-[#ffd754] font-bold">
                        <Compass className="w-3.5 h-3.5 text-[#d4af37]" />
                        Real-World Scenario / Example:
                      </div>
                      <p className="text-xs sm:text-sm text-gray-300 font-sans leading-relaxed">
                        {item.example}
                      </p>
                    </div>

                    {/* Actionable Script or Practical Citizen Action */}
                    <div className="p-3.5 rounded-lg bg-black/40 border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div className="space-y-0.5">
                        <span className="text-[10px] font-mono text-gray-400 uppercase tracking-widest block">
                          Actionable Citizen Protocol:
                        </span>
                        <p className="text-xs sm:text-sm text-emerald-300 font-mono font-medium">
                          {item.practicalAction}
                        </p>
                      </div>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setStudiedIds(prev => {
                            const next = new Set(prev);
                            if (next.has(item.id)) {
                              next.delete(item.id);
                            } else {
                              next.add(item.id);
                            }
                            return next;
                          });
                        }}
                        className="w-full sm:w-auto self-stretch sm:self-center shrink-0 px-3.5 py-2.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/15 text-xs font-mono text-gray-300 hover:text-white transition-colors cursor-pointer min-h-[44px] flex items-center justify-center"
                      >
                        {isStudied ? "Mark Unstudied" : "✓ Mark as Studied"}
                      </button>
                    </div>
                  </div>
                </motion.div>
              );
            })
          )}
        </div>

        {/* BOTTOM LEARNING SUMMARY */}
        <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-gray-400">
          <p>
            Curriculum grounded in the Constitution of India, CrPC, BNSS, and binding Supreme Court precedents.
          </p>
          <div className="flex items-center gap-3">
            <span className="text-[#d4af37] font-bold">Study Modules Mastered: {studiedIds.size} / {STUDY_CURRICULUM.length}</span>
          </div>
        </div>

      </div>
    </section>
  );
}
