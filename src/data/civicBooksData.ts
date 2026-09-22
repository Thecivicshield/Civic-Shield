export interface BookChapter {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  statuteRef: string;
  badge: string;
  summary: string;
  corePoints: {
    heading: string;
    text: string;
    script?: string; // Exact words a citizen can say
  }[];
  takeaway: string;
}

export interface CivicBook {
  id: "rights" | "goals" | "mission";
  volumeNumber: string;
  title: string;
  displayTitle: string;
  subtitle: string;
  edition: string;
  coverColor: string; // Tailwind gradient / classes
  accentColor: string;
  insignia: "scale" | "target" | "torch";
  readTime: string;
  chapterCountLabel: string;
  summary: string;
  chapters: BookChapter[];
}

export const CIVIC_BOOKS: Record<"rights" | "goals" | "mission", CivicBook> = {
  rights: {
    id: "rights",
    volumeNumber: "VOLUME I",
    title: "Handbook of Citizen Rights",
    displayTitle: "Handbook of Citizen Rights",
    subtitle: "Practical Procedural Shields & Statutory Safeguards Under Indian Law",
    edition: "2026 Sovereign Edition",
    coverColor: "from-[#0a192f] via-[#0f274a] to-[#051124]",
    accentColor: "#d4af37",
    insignia: "scale",
    readTime: "4 min read",
    chapterCountLabel: "5 Concise Chapters",
    summary: "Clear, non-repetitive procedural scripts for police stops, device privacy, Section 41A, FIR filing, and roadside encounters.",
    chapters: [
      {
        id: "stop-rules",
        number: "01",
        title: "The 3 Inviolable Stop Rules",
        subtitle: "How to Establish Immediate Legal Grounding During Any Stop",
        statuteRef: "Article 21 & D.K. Basu Guidelines (Supreme Court of India)",
        badge: "ROADSIDE & ENCOUNTER",
        summary: "When approached by law enforcement, avoid argumentation. Instead, use these 3 exact procedural questions to clarify your legal status instantly.",
        corePoints: [
          {
            heading: "1. Clarify Detainment Status",
            text: "Police can only hold you if they possess verifiable reasonable suspicion of a cognizable offense. Ask calmly to confirm if you are under detention.",
            script: "“Officer, am I legally detained, or am I free to go about my business?”"
          },
          {
            heading: "2. Demand Grounds for Detainment",
            text: "If the officer states you are detained, they are legally required under Article 22(1) to communicate the exact reason immediately.",
            script: "“Please state the specific reasonable suspicion or offense for which I am being detained.”"
          },
          {
            heading: "3. Peaceful Non-Consent to Arbitrary Searches",
            text: "Never physically resist an officer. However, explicitly declare your lack of consent to preserve your right to challenge illegal evidence in court.",
            script: "“I do not consent to any search of my person, belongings, or vehicle, but I will not resist physically.”"
          }
        ],
        takeaway: "Calm procedural clarity disarms hostility faster than aggressive debate. Always stay polite, keep hands visible, and speak clearly."
      },
      {
        id: "digital-privacy",
        number: "02",
        title: "Mobile Phones & Digital Privacy",
        subtitle: "Protection Against Forced Passwords & Unlawful Inspections",
        statuteRef: "Article 20(3) & K.S. Puttaswamy Judgment (Right to Privacy)",
        badge: "DIGITAL SANCTUM",
        summary: "Your smartphone contains personal, banking, and confidential chats. The Constitution strictly protects your personal devices from warrantless searches.",
        corePoints: [
          {
            heading: "No Forced Passwords or Biometrics",
            text: "Article 20(3) guarantees protection against self-incrimination. Police cannot force you to unlock your phone, reveal passwords, or open private messaging apps without a specific judicial warrant.",
            script: "“With respect, my device contains private and confidential communications. I do not consent to unlocking it without a judicial warrant.”"
          },
          {
            heading: "Mandatory Seizure Memo (Panchnama)",
            text: "If an officer seizes your device under Section 102 CrPC (or Section 107 BNSS), they MUST provide a written, signed Seizure Memo on the spot in the presence of independent witnesses.",
            script: "“If my device is being seized, please issue an immediate signed Seizure Memo detailing the make, IMEI, serial number, and physical condition.”"
          }
        ],
        takeaway: "Never leave your phone unlocked on a counter. Lock your screen immediately during any encounter and request formal paperwork."
      },
      {
        id: "arrest-safeguards",
        number: "03",
        title: "Arrest Safeguards & Section 41A",
        subtitle: "Strict Statutory Limits on Direct Police Custody",
        statuteRef: "Section 41A CrPC / Sec 35 BNSS & Arnesh Kumar v. State of Bihar",
        badge: "CUSTODIAL PROTECTION",
        summary: "Direct arrest is not automatic in modern criminal procedure. In offenses carrying penalties under 7 years, direct arrest is unlawful without special recorded reasons.",
        corePoints: [
          {
            heading: "Notice of Appearance First",
            text: "Under Section 41A CrPC, police must first issue a formal Notice of Appearance requiring you to join investigation, rather than arresting you directly.",
            script: "“Under Section 41A and the Supreme Court's Arnesh Kumar ruling, please provide a written Notice of Appearance specifying the investigation date.”"
          },
          {
            heading: "Right to Inform Family & Legal Counsel",
            text: "Within 8 to 12 hours of arrest, police must inform a friend or family member designated by you, and you have the right to meet with your advocate during interrogation.",
            script: "“I request to contact my family member and speak with my legal advocate immediately under D.K. Basu guidelines.”"
          },
          {
            heading: "Mandatory Medical Examination",
            text: "You are legally entitled to a certified medical examination upon arrest to document physical health and ensure protection against custodial abuse.",
            script: "“I request a recorded medical examination before the magistrate or medical officer under Section 54 CrPC.”"
          }
        ],
        takeaway: "Arrest must be an exception, not the default tool for harassment. A Notice of Appearance is the lawful statutory standard."
      },
      {
        id: "fir-rights",
        number: "04",
        title: "FIR Registration & Station Protocols",
        subtitle: "Your Rights When Registering Complaints or Visiting Police Stations",
        statuteRef: "Section 154 CrPC & Lalita Kumari v. Govt of UP",
        badge: "STATION PROTOCOLS",
        summary: "Police stations can be intimidating environments. Knowing your statutory entitlements prevents unlawful refusals and delays.",
        corePoints: [
          {
            heading: "Mandatory 'Zero FIR'",
            text: "A police station CANNOT refuse to register an FIR simply because the crime occurred outside their jurisdiction. They must register a 'Zero FIR' and transfer it to the concerned precinct.",
            script: "“Under Supreme Court guidelines, this station is mandated to lodge a Zero FIR and transfer the file to the jurisdictional station.”"
          },
          {
            heading: "Free Certified Copy of FIR",
            text: "You are legally entitled to receive an immediate, free of cost, signed copy of the FIR as soon as it is registered (Section 154(2) CrPC).",
            script: "“Please provide my free certified copy of the registered First Information Report now.”"
          },
          {
            heading: "Protections for Women Citizens",
            text: "Except under extraordinary circumstances and with written permission from a Judicial Magistrate, women cannot be arrested before sunrise or after sunset (Sec 46(4) CrPC).",
            script: "“Under Section 46(4), women cannot be arrested after sunset without a Judicial Magistrate’s written order and a female officer present.”"
          }
        ],
        takeaway: "Never leave a police station without an official stamp, dairy entry number (GD entry), or copy of your filed grievance."
      },
      {
        id: "traffic-stops",
        number: "05",
        title: "Traffic Encounters & Spot Challans",
        subtitle: "Clear Boundaries on Vehicle Inspections and Fines",
        statuteRef: "Motor Vehicles Act 1988 & Central Motor Vehicle Rules",
        badge: "TRAFFIC & ROADWAY",
        summary: "Routine traffic stops are the most common citizen encounter. Understand officer ranks, challan books, and key seizure rules.",
        corePoints: [
          {
            heading: "Officer Rank Requirements",
            text: "Only an officer of the rank of Sub-Inspector (SI) or above with a visible name badge and uniform is authorized to issue spot fines or compound violations.",
            script: "“Officer, are you of Sub-Inspector rank authorized to issue spot challans? Please provide your official name badge.”"
          },
          {
            heading: "No Removal of Vehicle Keys",
            text: "Traffic police officers have NO legal right to arbitrarily snatch your ignition keys or deflate vehicle tyres during a routine traffic stop.",
            script: "“Please do not touch my ignition keys. I am cooperating fully and presenting all required digital documents.”"
          },
          {
            heading: "Digital DigiLocker / mParivahan Acceptance",
            text: "Under Rule 139 of CMVR, digital driver licenses and RC copies presented via DigiLocker or mParivahan are legally equivalent to original physical documents.",
            script: "“Here is my verified DigiLocker license, which is legally valid under Rule 139 CMVR.”"
          }
        ],
        takeaway: "You have the constitutional right to peacefully record police officers performing duties in public view, provided you do not obstruct their work."
      }
    ]
  },

  goals: {
    id: "goals",
    volumeNumber: "VOLUME II",
    title: "Our Strategic Goals",
    displayTitle: "Our Strategic Goals",
    subtitle: "6 Ratified Action Mandates & Measurable Civic Targets",
    edition: "Strategic Roadmap 2026-2028",
    coverColor: "from-[#290913] via-[#3d111e] to-[#17050a]",
    accentColor: "#f59e0b",
    insignia: "target",
    readTime: "3 min read",
    chapterCountLabel: "6 Strategic Mandates",
    summary: "The 6 core action mandates, verified milestones, and transparent progress metrics of the Civic Shield Alliance.",
    chapters: [
      {
        id: "goal-deescalation",
        number: "01",
        title: "Eliminate Fear in Authority Encounters",
        subtitle: "Conquering Procedural Anxiety Through Verified Knowledge",
        statuteRef: "Article 21 & Article 22(1) / D.K. Basu Precedents",
        badge: "CITIZEN CONFIDENCE",
        summary: "Every citizen deserves to walk freely without irrational fear of roadside stops. We provide verified procedural playbooks so citizens interact with authority with composure and dignity.",
        corePoints: [
          {
            heading: "The Challenge",
            text: "Over 80% of citizens experience acute panic during administrative stops not from wrongdoing, but from procedural blindness."
          },
          {
            heading: "Our Strategic Solution",
            text: "Distribute standardized verbal scripts and non-confrontational dialogue frameworks across all 22 scheduled languages."
          },
          {
            heading: "Target Benchmark",
            text: "50,000+ Citizens certified in basic procedural self-defense and roadside de-escalation protocols."
          }
        ],
        takeaway: "A prepared citizen cannot be intimidated. Knowledge transforms fear into calm composure."
      },
      {
        id: "goal-plain-language",
        number: "02",
        title: "Bridge Legal Language Barriers",
        subtitle: "Translating Dense Archaic Statutes into Actionable Scripts",
        statuteRef: "Article 19(1)(a) & Article 39A (Free Legal Aid)",
        badge: "PLAIN LANGUAGE",
        summary: "Legal jargon creates an artificial barrier between citizens and their inherent rights. We convert statutes into accessible, bite-sized guides anyone can read.",
        corePoints: [
          {
            heading: "The Challenge",
            text: "Criminal codes and procedural manuals are structured in complex language that even educated citizens struggle to decipher."
          },
          {
            heading: "Our Strategic Solution",
            text: "Build open-source cheat sheets, flowcharts, and 1-minute audio briefs for high-frequency legal encounters."
          },
          {
            heading: "Target Benchmark",
            text: "150+ Plain-language statutory modules cataloged with real-world case simulations."
          }
        ],
        takeaway: "Law should be as readable as the morning news. Demystifying statutes democratizes justice."
      },
      {
        id: "goal-neutrality",
        number: "03",
        title: "Maintain Strict Constitutional Neutrality",
        subtitle: "Anchoring Civic Education Purely in Law, Free from Ideology",
        statuteRef: "Article 14 (Equality Before Law) & Article 15",
        badge: "NON-PARTISAN",
        summary: "Constitutional liberties belong equally to all citizens regardless of creed, income, or political viewpoint. Civic Shield maintains strict non-partisan objectivity.",
        corePoints: [
          {
            heading: "The Challenge",
            text: "Civic education often gets polarized along partisan lines, eroding public trust in universal constitutional protections."
          },
          {
            heading: "Our Strategic Solution",
            text: "Every published guide is peer-reviewed by retired jurists and academic scholars strictly against binding Supreme Court precedents."
          },
          {
            heading: "Target Benchmark",
            text: "Verified compliance score with neutral constitutional jurisprudence."
          }
        ],
        takeaway: "The Constitution is not partisan. It is the sovereign covenant safeguarding every human being."
      },
      {
        id: "goal-first-aid",
        number: "04",
        title: "Decentralize Citizen Legal First-Aid",
        subtitle: "Equipping Every Pocket with Pocket-Sized Legal Safeguards",
        statuteRef: "Legal Services Authorities Act & Article 39A",
        badge: "POCKET ARMOR",
        summary: "Legal information is useless if you cannot access it when your phone has no signal. We develop offline-first, printable pocket guides.",
        corePoints: [
          {
            heading: "The Challenge",
            text: "During roadside stops or rural checks, mobile connectivity is frequently spotty or unavailable."
          },
          {
            heading: "Our Strategic Solution",
            text: "Compact, foldable wallet cards outlining Section 41A, bail rights, and traffic rules, downloadable for free print."
          },
          {
            heading: "Target Benchmark",
            text: "100,000+ Physical pocket cards printed and distributed through community hubs."
          }
        ],
        takeaway: "Procedural armor must be accessible everywhere—from bustling metros to remote highway checkpoints."
      },
      {
        id: "goal-digital-sanctuary",
        number: "05",
        title: "Sanctuary of the Digital Device",
        subtitle: "Defending Against Warrantless Device Inspections & Illegal Data Copies",
        statuteRef: "Article 20(3) & Information Technology Act",
        badge: "PRIVACY FIRST",
        summary: "Routine stops should never turn into fishing expeditions through private photos, financial apps, or messaging logs.",
        corePoints: [
          {
            heading: "The Challenge",
            text: "Widespread reports of unauthorized phone unlocks and data inspection during arbitrary street checkpoints."
          },
          {
            heading: "Our Strategic Solution",
            text: "Educate citizens and police personnel on Puttaswamy guidelines, digital search warrant requirements, and seizure memos."
          },
          {
            heading: "Target Benchmark",
            text: "Document and legally assist in 500+ reported cases of unlawful device confiscation."
          }
        ],
        takeaway: "Your phone is an extension of your mind and private sanctuary. It cannot be invaded without due process of law."
      },
      {
        id: "goal-real-time-support",
        number: "06",
        title: "Real-Time Verified Civic Triage",
        subtitle: "24/7 Anonymous AI & Volunteer Procedural Guidance",
        statuteRef: "Right to Fair Procedure & Access to Justice",
        badge: "ACTIVE TRIAGE",
        summary: "When facing an active encounter, citizens need instant answers to urgent procedural questions without exposing their private identities.",
        corePoints: [
          {
            heading: "The Challenge",
            text: "Finding a lawyer in the middle of the night during an unexpected police summons is costly and difficult."
          },
          {
            heading: "Our Strategic Solution",
            text: "An anonymous, encrypted AI triage assistant and volunteer lawyer directory available round the clock."
          },
          {
            heading: "Target Benchmark",
            text: "Average response time under 15 seconds for procedural clarification with zero personal data logged."
          }
        ],
        takeaway: "No citizen should stand alone at 2 AM without knowing their exact statutory entitlements."
      }
    ]
  },

  mission: {
    id: "mission",
    volumeNumber: "VOLUME III",
    title: "Mission & Genesis: What Inspired Us",
    displayTitle: "Mission & Genesis (What Inspired Us)",
    subtitle: "The Origin of Civic Shield & Our Solemn Oath to Everyday Citizens",
    edition: "First Archival Printing",
    coverColor: "from-[#081c15] via-[#0f2d22] to-[#04120d]",
    accentColor: "#10b981",
    insignia: "torch",
    readTime: "3 min read",
    chapterCountLabel: "4 Inspiring Chapters",
    summary: "The founding story of Civic Shield, why we started, our philosophical roots, and our permanent oath to eliminate citizen fear.",
    chapters: [
      {
        id: "the-spark",
        number: "01",
        title: "The Spark: Fear of the Lawful",
        subtitle: "Why Do Innocent Citizens Tremble in Front of Authority?",
        statuteRef: "Preamble to the Constitution of India",
        badge: "THE GENESIS",
        summary: "Civic Shield was born from a hauntingly common observation: law-abiding citizens experiencing sheer terror during mundane official stops.",
        corePoints: [
          {
            heading: "The Paradox of Civic Fear",
            text: "In a functioning constitutional democracy, public servants exist to protect citizens. Yet, when an ordinary college student, commuter, or delivery worker is stopped, their heart races and voice shakes."
          },
          {
            heading: "The Real Cause: Information Asymmetry",
            text: "This fear does not stem from guilt. It stems from absolute helplessness—not knowing where an officer's lawful authority ends and where unlawful coercion begins."
          }
        ],
        takeaway: "Fear flourishes in darkness. When you shine the light of verified statutory law, fear dissolves into calm, mutual respect."
      },
      {
        id: "the-mission",
        number: "02",
        title: "Our Core Mission: Erasing Fear",
        subtitle: "Transforming Confrontation into Dignified, Lawful Dialogue",
        statuteRef: "Article 21 (Right to Life & Personal Liberty with Dignity)",
        badge: "CORE PURPOSE",
        summary: "Our mission is simple and resolute: To ensure no citizen in India ever feels defenseless, intimidated, or ignorant of their fundamental rights.",
        corePoints: [
          {
            heading: "Dignity Over Dominance",
            text: "We believe true law enforcement thrives on public trust, not intimidation. By educating citizens, we also elevate the professional standards of authority."
          },
          {
            heading: "Not Anti-Police, But Pro-Law",
            text: "Civic Shield does not foster anti-establishment hostility. We empower citizens to follow the law rigorously while insisting that authority does the same."
          }
        ],
        takeaway: "When both citizen and officer operate within lawful parameters, public safety and human liberty flourish together."
      },
      {
        id: "philosophical-roots",
        number: "03",
        title: "What Inspired Us: Philosophical Roots",
        subtitle: "Anchored in Dr. B.R. Ambedkar & Mahatma Gandhi's Vision",
        statuteRef: "Constituent Assembly Debates (1949)",
        badge: "PHILOSOPHICAL ANCHORS",
        summary: "Our foundational ethos draws from the greatest constitutional architects and human rights advocates in modern history.",
        corePoints: [
          {
            heading: "Constitutional Morality (Dr. Ambedkar)",
            text: "As Dr. B.R. Ambedkar warned, democracy is not merely a political ritual; it is a top-dressing on an unequal soil unless citizens cultivate constitutional morality and vigilance."
          },
          {
            heading: "Courteous Defiance (Satyagraha)",
            text: "Mahatma Gandhi showed that non-violent, courteous truth is more powerful than any state machinery. We teach calm, respectful boundary-setting without vulgarity or physical defiance."
          }
        ],
        takeaway: "Eternal vigilance is the price of liberty. An informed citizenry is the ultimate defender of the Constitution."
      },
      {
        id: "the-four-pledges",
        number: "04",
        title: "The 4 Non-Negotiable Pledges",
        subtitle: "Our Permanent Commitment to Every Citizen Who Reads This",
        statuteRef: "The Civic Shield Public Covenant",
        badge: "OUR PUBLIC OATH",
        summary: "To ensure Civic Shield remains an uncorrupted sanctuary of civic literacy, we operate under 4 inviolable rules.",
        corePoints: [
          {
            heading: "1. Permanently Free & Open-Access",
            text: "We will NEVER charge money, lock legal guides behind paywalls, or sell citizen protection as a luxury service. Legal literacy is a fundamental right."
          },
          {
            heading: "2. Zero Party Politics",
            text: "We reject all political party affiliations and donor conditions. Our allegiance is exclusively to the Constitution of India."
          },
          {
            heading: "3. Absolute Privacy & No Tracking",
            text: "We do not track your IP, sell your cookies, or store identifiable dossier logs. Your search for legal knowledge is sacred and private."
          },
          {
            heading: "4. Rigorously Verified Citations",
            text: "We never publish urban myths or social media rumors. Every single claim is backed by specific statutory sections and binding judicial case law."
          }
        ],
        takeaway: "This is our promise: reliable, tested truth in your hands whenever you need it most."
      }
    ]
  }
};
