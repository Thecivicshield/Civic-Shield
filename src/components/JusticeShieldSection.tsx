import React, { useState } from "react";
import { Scale, HeartHandshake, FileText, Gavel, BookOpen, AlertCircle, CheckCircle, HelpCircle, Clock, Smartphone } from "lucide-react";

interface LawCard {
  title: string;
  subtitle: string;
  description: string;
  keyPoints: string[];
  citation: string;
}

interface CivicMisconception {
  question: string;
  answerOnTrue: string;
  myth: string;
}

export default function JusticeShieldSection() {
  const [activeLawIndex, setActiveLawIndex] = useState<number>(0);
  const [quizAnswers, setQuizAnswers] = useState<{ [key: number]: boolean }>({});
  const [revealedQuiz, setRevealedQuiz] = useState<{ [key: number]: boolean }>({});

  const basicLaws: LawCard[] = [
    {
      title: "Right to Free Legal Aid",
      subtitle: "The Covenant of Equal Protection",
      description: "Under Article 39A of the Indian Constitution, the State is mandated to provide free legal aid to ensure that opportunities for securing justice are not denied to any citizen by reason of economic or other disabilities. This is supported internationally by Article 14 of the ICCPR, guaranteeing free legal assistance where the interests of justice so require.",
      keyPoints: [
        "Mandated under Article 39A of the Constitution of India (introduced via the 42nd Amendment).",
        "The Legal Services Authorities Act, 1987, establishes SLSA, DLSA, and Lok Adalats to offer real pro-bono aid.",
        "Guarantees that low-income or marginalized citizens receive free certified legal representation in any proceeding."
      ],
      citation: "Art. 39A, Constitution of India / Art. 14, ICCPR"
    },
    {
      title: "Party-in-Person Representation",
      subtitle: "The Inherent Right to Self-Advocacy",
      description: "You have an absolute statutory and constitutional right to represent your own case as a 'Party-in-Person' before any Indian court, tribunal, or administrative authority without being forced to hire or pay private counsel advocates.",
      keyPoints: [
        "Governed by Section 32 of the Advocates Act, 1961, which permits any court to allow non-advocates to appear.",
        "Provides equal standing to draft, verify, file, and argue Writ Petitions under Article 226 or Article 32.",
        "Requires adhering to standard High Court or District court registry procedures and simple procedural formatting."
      ],
      citation: "Sec. 32, Advocates Act, 1961"
    },
    {
      title: "Principles of Natural Justice",
      subtitle: "Shield Against Arbitrary Municipal Execution",
      description: "No local municipal corporation, building inspector, or state official can deprive you of life, liberty, or property without proper legal proceedings and fair hearing. The golden rule 'Audi Alteram Partem' guarantees that no administrative order can be passed to your detriment without a fair chance to state your defense.",
      keyPoints: [
        "Inextricably linked with Article 21 (Protection of Life and Liberty) and Article 14 (Equality before Law).",
        "Strictly requires a clear written 'Show-Cause' notice explaining any alleged statutory infraction.",
        "Guarantees a right to an impartial hearing and a speaking order detailing the rationale of any municipal decision."
      ],
      citation: "Art. 21, Constitution of India"
    },
    {
      title: "Right to Information (RTI)",
      subtitle: "Sovereign Inquest of Public Records & Budgets",
      description: "Citizens have the statutory authority to audit public spending, verify records, read municipal officer emails, and inspect local development files. This ensures absolute transparency and curbs administrative corruption.",
      keyPoints: [
        "Enacted under the revolutionary Right to Information (RTI) Act, 2005, celebrating citizen auditing power.",
        "Public Information Officers (PIOs) must respond to your statutory applications within 30 days.",
        "Aligned with Article 19 of the Universal Declaration of Human Rights (UDHR) protecting freedom of information."
      ],
      citation: "RTI Act, 2005 / Article 19, UDHR"
    },
    {
      title: "Arrest Guard & 24-Hour Presentation",
      subtitle: "The Vital Guard on Personal Liberty",
      description: "No authority or police unit can keep an arrested person in executive custody for more than 24 hours without bringing them directly before a judicial magistrate. This prevents arbitrary enforcement, illegal detention, and guarantees judicial review.",
      keyPoints: [
        "Guaranteed as a Fundamental Right under Article 22(2) of the Indian Constitution.",
        "Statutorily mandated under Sec 57 of the Criminal Procedure Code (and corresponding Sec 56 of the new BNSS, 2024).",
        "Mandates that the 24-hour limit excludes the time travel journey, ensuring immediate and neutral judicial overview."
      ],
      citation: "Art. 22(2), Constitution of India / CrPC Sec 57"
    },
    {
      title: "Digital Privacy & Device Protection",
      subtitle: "Constitutional Shield for Your Personal Devices",
      description: "Under Article 21's Right to Privacy (established in Puttaswamy), your smartphones, laptops, and digital accounts are protected against arbitrary inspection. Officers cannot force you to unlock or browse through your devices without specific judicial search orders.",
      keyPoints: [
        "Protected from forced self-incrimination under Article 20(3) of the Indian Constitution, as forced passcode disclosure is restricted.",
        "Requires official written panchnama / seizure memo specifying digital metadata and hash values to prevent tampering.",
        "Provides civil recourse and protection under IT Act provisions when private data is accessed or leaked without consent."
      ],
      citation: "Art. 21 & Art. 20(3), Constitution of India"
    }
  ];

  const legalMyths: CivicMisconception[] = [
    {
      question: "Are citizens legally permitted to record video of public officials or police officers on duty in public spaces?",
      myth: "MYTH: Public officers can instantly forbid video recordation of their duties using verbal bans or privacy claims.",
      answerOnTrue: "Yes. Under Article 19(1)(a) of the Constitution of India (Freedom of Speech and Expression), recording public officials performing statutory tasks in a public space is fully permitted. As long as you do not obstruct their physical duties or cross into notified high-security zones, documenting is fully legal."
    },
    {
      question: "Can an administrative or municipal officer impose an immediate property lien or seal your house without a notice?",
      myth: "MYTH: Building or civil citations bypass municipal tribunals and instantly attach directly as final properties seizures.",
      answerOnTrue: "No. Under the Principles of Natural Justice and Article 300A (Right to Property), no property can be deprived or sealed without proper fair warning (Show-Cause notice), an opportunity to challenge the order, and a formal neutral board determination."
    },
    {
      question: "Does an advocate assigned through the District Legal Services Authority (DLSA) have the right to demand separate filing fees or research markups?",
      myth: "MYTH: State-provided legal aid permits retroactive back-billing or supplementary fee demands from citizens.",
      answerOnTrue: "No. Services provided through the SLSA, DLSA, or Supreme Court Legal Services Committee are 100% free of charge to eligible persons. Any request by an assigned advocate for private payments constitutes a severe professional misconduct under BCI rules."
    },
    {
      question: "Can the police detain you indefinitely at a local station without showing you to a judge as long as they call it questioning?",
      myth: "MYTH: Informal or formal station house detentions do not trigger the 24-hour presentation deadline.",
      answerOnTrue: "No. The 24-hour presenting deadline (Article 22(2) & CrPC Sec 57) is strict. The moment physical restraint or custody is imposed, the 24-hour clock starts. Prolonging detention beyond 24 hours without a Magistrate's order is illegal and constitutes unlawful confinement."
    },
    {
      question: "Can a patrolling officer legally seize your phone or force you to unlock it during a routine check?",
      myth: "MYTH: Police possess automatic statutory powers to inspect devices or read chats without warning or judicial case logs.",
      answerOnTrue: "No. Patrolling officers cannot force you to unlock your phone, browse chats, or copy your digital files without a specific written warrant or a formal summons linked to an active, documented FIR connection. Forced device unlocked violates Article 21 and Article 20(3)."
    }
  ];

  return (
    <section id="justice-shield" className="py-24 bg-[#001a4d] border-t border-[#d4af37]/25 relative overflow-hidden">
      {/* Background visual accents */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#d4af37]/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Block */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-sm bg-[#d4af37]/10 border border-[#d4af37]/20 text-[#d4af37] text-xs font-mono tracking-wider uppercase mb-4">
            <BookOpen className="w-3.5 h-3.5" /> Civic Shield Educational Hub
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif font-normal italic tracking-tight text-white mb-2">
            The Justice <span className="text-[#d4af37] font-serif not-italic">Shield</span>
          </h2>
          <p className="text-[10px] font-mono text-[#d4af37]/75 uppercase tracking-[0.25em]">
            Bridging Civic Advocacy, Eliminating Fear, Securing Procedural Integrity
          </p>
          <p className="mt-5 text-gray-300 text-sm leading-relaxed max-w-xl mx-auto font-light">
            Procedural fear disappears when you speak the language of absolute statutory law. Explore simple, structured legal reviews on self-representation, pro-bono ethics, and due process protocols below.
          </p>
        </div>

        {/* Tab-like basic laws panel */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Law List Sidebar - 4 cols */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="text-[10px] font-mono text-[#d4af37] uppercase tracking-widest mb-4 block">
              Core Legal Concepts
            </h4>
            {basicLaws.map((law, idx) => (
              <button
                key={idx}
                onClick={() => setActiveLawIndex(idx)}
                className={`w-full text-left p-4 rounded-sm border transition-all text-xs flex items-center justify-between group cursor-pointer ${
                  activeLawIndex === idx
                    ? "bg-[#d4af37]/15 border-[#d4af37] text-white"
                    : "bg-[#001233]/70 border-[#d4af37]/10 hover:border-[#d4af37]/30 text-gray-300"
                }`}
              >
                <div>
                  <p className={`font-serif font-semibold text-sm transition-colors ${
                    activeLawIndex === idx ? "text-[#d4af37]" : "group-hover:text-[#d4af37]"
                  }`}>
                    {law.title}
                  </p>
                  <p className="text-[10px] font-mono text-gray-400 mt-1 uppercase tracking-wider">{law.citation}</p>
                </div>
                <Scale className={`w-4 h-4 transition-transform duration-300 ${
                  activeLawIndex === idx ? "rotate-12 text-[#d4af37]" : "text-gray-500 group-hover:text-gray-300"
                }`} />
              </button>
            ))}
          </div>

          {/* Active Law Description Display - 8 cols */}
          <div className="lg:col-span-8 bg-[#001233]/95 border border-[#d4af37]/20 p-6 sm:p-8 rounded-sm shadow-2xl space-y-6 relative">
            <div className="absolute top-4 right-4 text-[9px] font-mono font-bold text-gray-500 tracking-wider">
              SECTION DETAILED OUTLINE
            </div>

            <div className="flex items-center gap-3">
              <div className="p-3 bg-[#d4af37]/10 border border-[#d4af37]/20 text-[#d4af37] rounded-sm">
                {activeLawIndex === 0 && <HeartHandshake className="w-6 h-6" />}
                {activeLawIndex === 1 && <FileText className="w-6 h-6" />}
                {activeLawIndex === 2 && <Gavel className="w-6 h-6" />}
                {activeLawIndex === 3 && <Scale className="w-6 h-6" />}
                {activeLawIndex === 4 && <Clock className="w-6 h-6" />}
                {activeLawIndex === 5 && <Smartphone className="w-6 h-6" />}
              </div>
              <div>
                <h3 className="text-xl font-serif text-white">{basicLaws[activeLawIndex].title}</h3>
                <p className="text-[10px] font-mono text-[#d4af37] uppercase tracking-wider">
                  {basicLaws[activeLawIndex].citation} • {basicLaws[activeLawIndex].subtitle}
                </p>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-gray-300 font-sans font-light leading-relaxed">
              {basicLaws[activeLawIndex].description}
            </p>

            <div className="border-t border-[#d4af37]/15 pt-5 space-y-3">
              <p className="text-[10px] font-mono text-[#d4af37] uppercase tracking-widest font-bold">
                Critical Compliance Checkpoints & Realities:
              </p>
              <ul className="space-y-2.5">
                {basicLaws[activeLawIndex].keyPoints.map((point, pIdx) => (
                  <li key={pIdx} className="flex items-start gap-2.5 text-xs text-gray-300">
                    <CheckCircle className="w-4 h-4 text-[#d4af37] shrink-0 mt-0.5" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

        </div>

        {/* Dynamic Legal Mythbuster Panel */}
        <div className="mt-16 bg-[#001233]/70 border border-[#d4af37]/15 p-6 sm:p-8 rounded-sm space-y-6">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-[#d4af37]" />
            <h4 className="text-sm font-mono uppercase tracking-wider text-white font-bold">
              Campaign Citizen Mythbuster
            </h4>
          </div>
          <p className="text-xs text-gray-300 font-sans font-light">
            Test your legal literacy bounds below by reviewing common legal interactions. Click any myth cards below to reveal verified legal explanations.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pt-2">
            {legalMyths.map((myth, idx) => (
              <div 
                key={idx} 
                className="bg-[#001a4d]/90 border border-[#d4af37]/15 p-5 rounded-sm hover:border-[#d4af37]/40 transition-all flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <span className="text-[9px] font-mono font-bold text-red-400 bg-red-950/20 border border-red-500/10 py-0.5 px-2 rounded-sm inline-block uppercase">
                    Misconception {idx + 1}
                  </span>
                  <p className="text-xs font-serif font-semibold text-white leading-relaxed">
                    {myth.question}
                  </p>
                  <p className="text-[10px] font-mono text-gray-400 italic">
                    {myth.myth}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#d4af37]/10 mt-4">
                  {revealedQuiz[idx] ? (
                    <div className="text-xs text-gray-300 leading-relaxed font-sans space-y-1 bg-[#d4af37]/5 p-2.5 rounded-sm border border-[#d4af37]/15">
                      <p className="font-mono text-[9px] text-[#d4af37] font-bold uppercase">VERIFIED LAW STATUS :</p>
                      <p>{myth.answerOnTrue}</p>
                    </div>
                  ) : (
                    <button
                      onClick={() => setRevealedQuiz(p => ({ ...p, [idx]: true }))}
                      className="w-full text-center py-2 bg-[#d4af37]/10 hover:bg-[#d4af37]/25 text-[#d4af37] text-[10px] uppercase font-mono font-bold rounded-sm border border-[#d4af37]/20 transition-all cursor-pointer"
                    >
                      Expose Legal Reality
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
