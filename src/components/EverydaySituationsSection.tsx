import React, { useState } from "react";
import { 
  Car, 
  Smartphone, 
  ShieldAlert, 
  FileText, 
  Home, 
  Scale, 
  ChevronDown, 
  ChevronUp, 
  CheckCircle2, 
  XCircle, 
  MessageSquareQuote, 
  ArrowRight,
  AlertTriangle,
  FileCheck2,
  HelpCircle
} from "lucide-react";

interface SituationGuide {
  id: string;
  icon: React.ReactNode;
  title: string;
  category: string;
  summary: string;
  lawCitation: string;
  script: string;
  canDo: string[];
  cannotDo: string[];
  nextSteps: string[];
}

const EVERYDAY_SITUATIONS: SituationGuide[] = [
  {
    id: "traffic-stop",
    icon: <Car className="w-5 h-5 text-amber-400" />,
    title: "Roadside Traffic Checks & Key Seizure",
    category: "Road & Vehicle",
    summary: "Police cannot snatch your car or bike ignition key. Electronic documents in DigiLocker or mParivahan are legally valid, and only an officer of Sub-Inspector rank or above can issue fines.",
    lawCitation: "Motor Vehicles Act, 1988 & Central Motor Vehicles Rules (CMVR) Rule 139",
    script: "“Sir, here are my verified driving license and registration on DigiLocker under CMVR Rule 139. Please provide an official government e-challan or receipt for any fine.”",
    canDo: [
      "Ask you to halt safely and present your driving license, registration, insurance, and PUC certificate.",
      "Check driver sobriety using a certified breathalyzer device.",
      "Issue an official computer-generated e-challan or printed challan with a government receipt."
    ],
    cannotDo: [
      "Cannot snatch the ignition key from your car or motorcycle.",
      "Cannot demand physical paper documents if you show verified DigiLocker or mParivahan digital records.",
      "Constables or Home Guards cannot independently levy compoundable fines without an officer of ASI/SI rank present.",
      "Cannot seize your mobile phone or physically manhandle you."
    ],
    nextSteps: [
      "If an officer demands cash without a receipt, note down their name, badge number, and vehicle number.",
      "Always pay fines through the official State Traffic Police online portal or virtual court system.",
      "File a complaint with the Traffic Police Complaints Cell if an officer uses unauthorized physical force."
    ]
  },
  {
    id: "phone-search",
    icon: <Smartphone className="w-5 h-5 text-emerald-400" />,
    title: "Smartphone & Digital Device Searches",
    category: "Digital Privacy",
    summary: "Under Article 21 and Article 20(3), police have no legal power to randomly inspect personal chats, scroll through galleries, or demand device passcodes during routine stops.",
    lawCitation: "K.S. Puttaswamy (2017) 10 SCC 1 & Article 20(3) Constitution of India",
    script: "“Officer, my phone contains private communications protected under Article 21 and Article 20(3). Without a formal judicial search warrant or official FIR seizure memo, I decline to unlock it.”",
    canDo: [
      "Inspect your device ONLY if they present a specific search warrant signed by a judicial magistrate.",
      "Seize a device linked directly to an active FIR offense, provided they create a formal Seizure Memo (Panchnama) with independent witnesses.",
      "Take hash values and seal the device in tamper-proof packaging."
    ],
    cannotDo: [
      "Cannot randomly stop you on the street and order you to unlock your phone or show WhatsApp messages.",
      "Cannot threaten you with detention simply because you refuse to provide your password or biometric unlock.",
      "Cannot clone or copy your personal data without official forensic custody logs."
    ],
    nextSteps: [
      "Politely reiterate your constitutional right against arbitrary search and self-incrimination.",
      "If the phone is seized by force, demand an immediate written copy of the Seizure Memo (Panchnama) containing the IMEI number.",
      "Immediately consult a legal advocate to file an application for custody and data preservation before the magistrate."
    ]
  },
  {
    id: "police-detention",
    icon: <ShieldAlert className="w-5 h-5 text-sky-400" />,
    title: "Police Questioning & Custodial Detention",
    category: "Personal Liberty",
    summary: "Distinguish between informal questioning and arrest. If detained, you must be produced before a judicial magistrate within 24 hours, and police must follow the mandatory D.K. Basu arrest guidelines.",
    lawCitation: "D.K. Basu v. State of West Bengal & Article 22(2) / CrPC Sec 57",
    script: "“Officer, am I free to leave or am I being detained? If detained, under what statutory section, and please permit me to call my family and lawyer.”",
    canDo: [
      "Ask general questions during the course of an ongoing crime investigation.",
      "Issue a written notice of appearance under Section 41A CrPC / Section 35 BNSS for offenses punishable with up to 7 years imprisonment.",
      "Arrest without warrant ONLY for cognizable offenses where arrest is strictly necessary to prevent evidence tampering."
    ],
    cannotDo: [
      "Cannot detain anyone at a police station for more than 24 hours without a judicial remand order from a magistrate.",
      "Cannot interrogate women or minors under 15 years old at the police station; questioning must take place at their residence.",
      "Cannot use third-degree physical torture, verbal abuse, or unrecorded lockup."
    ],
    nextSteps: [
      "Ask for the officer's name, designation, and police station.",
      "Insist that a family member or friend is notified immediately in writing (mandated by D.K. Basu).",
      "Request a medical examination upon arrest to document physical condition and prevent custodial violence."
    ]
  },
  {
    id: "fir-refusal",
    icon: <FileText className="w-5 h-5 text-amber-300" />,
    title: "Refusal by Police to Register an FIR",
    category: "Criminal Procedure",
    summary: "Registration of an FIR is compulsory for all cognizable offenses. If the Station House Officer (SHO) refuses to register your complaint, you have clear statutory escalation remedies.",
    lawCitation: "Lalita Kumari v. Govt of U.P. (2014) 2 SCC 1 & Section 154(3) CrPC",
    script: "“Under the Supreme Court's Lalita Kumari mandate, registering an FIR for a cognizable offense is mandatory. If you refuse, please give a written acknowledgment so I can submit to the SP.”",
    canDo: [
      "Conduct a preliminary inquiry strictly within 14 days ONLY for specified categories (e.g. matrimonial disputes, commercial fraud, medical negligence).",
      "Register a 'Zero FIR' regardless of territorial jurisdiction and transfer it to the concerned police station."
    ],
    cannotDo: [
      "Cannot turn away a victim of theft, assault, robbery, or violence with verbal dismissals or excuses.",
      "Cannot demand bribes, personal favors, or informal compromises before registering an FIR.",
      "Officers facing charges for refusing to register FIRs in crimes against women face imprisonment under Section 166A IPC / BNSS."
    ],
    nextSteps: [
      "Step 1: Send a written copy of your complaint to the Superintendent of Police (SP) or Deputy Commissioner of Police (DCP) by registered post under Sec 154(3) CrPC.",
      "Step 2: If no action is taken, file a private complaint before the Judicial Magistrate under Section 156(3) CrPC for an order directing an investigation.",
      "Step 3: Keep postal tracking receipts and stamped acknowledgment copies."
    ]
  },
  {
    id: "municipal-demolition",
    icon: <Home className="w-5 h-5 text-purple-400" />,
    title: "Municipal Notices & Property Demolitions",
    category: "Property & Housing",
    summary: "Administrative bodies cannot summarily demolish homes or seal premises without issuing a formal Show-Cause notice and granting adequate time for an administrative hearing.",
    lawCitation: "Principles of Natural Justice & Supreme Court Demolition Guidelines (2024)",
    script: "“Under the Principles of Natural Justice and Article 300A, no demolition or sealing can take place without a prior written show-cause notice and time for judicial appeal.”",
    canDo: [
      "Issue a formal Show-Cause notice specifying exact building code violations and statutory provisions.",
      "Grant a minimum period (typically 15 days) for the property owner to file an objection and appear for a hearing.",
      "Pass a reasoned, speaking order addressing the objections before executing any enforcement."
    ],
    cannotDo: [
      "Cannot arrive with bulldozers without prior written notice and an opportunity to be heard.",
      "Cannot carry out punitive demolitions targeting families or accused persons without due process.",
      "Cannot demolish premises while an active stay order or statutory appeal is pending before an appellate tribunal."
    ],
    nextSteps: [
      "Verify whether the notice is issued by a competent authorized officer with a valid dispatch number.",
      "Submit a written response (Objection Reply) within the time stipulated and retain a stamped acknowledgment copy.",
      "If threats of summary action persist, immediately move the High Court under Article 226 or Civil Court for an interim injunction."
    ]
  },
  {
    id: "consumer-representation",
    icon: <Scale className="w-5 h-5 text-gold-400" />,
    title: "Consumer Grievance & Self-Representation",
    category: "Consumer Rights",
    summary: "You do not need to hire an expensive advocate to resolve consumer complaints, defective goods, or unfair trade practices. Section 32 of the Advocates Act empowers you to represent yourself directly.",
    lawCitation: "Consumer Protection Act 2019 & Section 32 Advocates Act 1961",
    script: "“I am appearing as a Party-in-Person under Section 32 of the Advocates Act 1961 to present my consumer grievance before this Hon'ble Commission.”",
    canDo: [
      "File your complaint online from home via the national portal 'e-Daakhil' with nominal court fees.",
      "Claim compensation for financial loss, mental harassment, and legal expenses.",
      "Present facts, submit invoices, and argue your case in plain language before the District Commission."
    ],
    cannotDo: [
      "Commissions cannot dismiss your complaint solely because you are not represented by a licensed advocate.",
      "Companies cannot enforce one-sided arbitration clauses that deprive you of statutory consumer remedies."
    ],
    nextSteps: [
      "Send a formal written Legal Notice by registered post giving the vendor 15 days to resolve the defect or refund payment.",
      "Gather evidence: invoices, warranty cards, chat transcripts, and photos of defective items.",
      "Log in to edaakhil.nic.in, draft your facts chronologically, and upload your self-representation petition."
    ]
  }
];

export default function EverydaySituationsSection() {
  const [expandedId, setExpandedId] = useState<string | null>("traffic-stop");

  const toggleExpand = (id: string) => {
    setExpandedId(prev => (prev === id ? null : id));
  };

  return (
    <section id="everyday-situations" className="scroll-mt-20 py-12 sm:py-16 bg-[#000c1e] text-white border-b border-[#d4af37]/20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Section Header */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-[#ffd754] text-xs font-mono uppercase tracking-widest">
            <Car className="w-4 h-4 text-[#d4af37]" />
            <span>Section 2 · Practical Guidance</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white tracking-tight">
            Everyday Legal Situations in India
          </h2>
          <p className="text-sm text-gray-300 font-light max-w-3xl leading-relaxed">
            Step-by-step guidance for real encounters. Understand what officials can and cannot lawfully do, read exact polite verbal scripts, and know your immediate next steps.
          </p>
        </div>

        {/* Situations Grid / Accordion List */}
        <div className="space-y-4">
          {EVERYDAY_SITUATIONS.map((sit) => {
            const isExpanded = expandedId === sit.id;

            return (
              <div
                key={sit.id}
                className={`rounded-xl border transition-all duration-200 overflow-hidden ${
                  isExpanded
                    ? "bg-[#001433] border-[#d4af37] shadow-xl"
                    : "bg-[#001026]/90 border-[#d4af37]/20 hover:border-[#d4af37]/50"
                }`}
              >
                {/* Header row */}
                <div
                  onClick={() => toggleExpand(sit.id)}
                  className="p-4 sm:p-5 flex items-start justify-between gap-4 cursor-pointer select-none"
                >
                  <div className="flex items-start gap-3.5 flex-1 min-w-0">
                    <div className="w-10 h-10 rounded-lg bg-[#001c40] border border-[#d4af37]/30 flex items-center justify-center shrink-0 mt-0.5">
                      {sit.icon}
                    </div>
                    <div className="space-y-1 flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-x-2 text-xs">
                        <span className="font-mono text-[#ffd754] font-semibold">
                          {sit.category}
                        </span>
                        <span className="text-gray-500" aria-hidden="true">·</span>
                        <span className="text-gray-400 text-xs truncate">
                          {sit.lawCitation}
                        </span>
                      </div>
                      <h3 className="text-base sm:text-lg font-serif font-bold text-white leading-snug">
                        {sit.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-gray-300 font-light leading-relaxed line-clamp-2">
                        {sit.summary}
                      </p>
                    </div>
                  </div>

                  <button
                    aria-label={isExpanded ? "Collapse situation guide" : "Expand situation guide"}
                    className="shrink-0 p-2 rounded-lg bg-[#001c40] text-[#ffd754] hover:bg-[#002859] transition-colors mt-1"
                  >
                    {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </button>
                </div>

                {/* Expanded Details */}
                {isExpanded && (
                  <div className="px-4 pb-5 sm:px-6 sm:pb-6 border-t border-[#d4af37]/15 pt-5 space-y-5 text-xs sm:text-sm">
                    
                    {/* Exact Script Box */}
                    <div className="p-4 rounded-xl bg-gradient-to-r from-[#001d4a] to-[#001433] border border-[#d4af37]/40 shadow-sm space-y-1.5">
                      <span className="text-[11px] font-mono uppercase tracking-wider text-[#ffd754] font-bold flex items-center gap-1.5">
                        <MessageSquareQuote className="w-4 h-4 text-[#d4af37]" />
                        Exact Words to Say Politely:
                      </span>
                      <p className="text-sm font-serif italic text-[#ffd754] leading-relaxed">
                        {sit.script}
                      </p>
                    </div>

                    {/* What Official CAN vs CANNOT Do */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      
                      {/* Can Do */}
                      <div className="p-4 rounded-xl bg-[#000a1c] border border-emerald-500/30 space-y-2">
                        <h4 className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-semibold flex items-center gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          What Officials Can Lawfully Do:
                        </h4>
                        <ul className="space-y-1.5 text-xs text-gray-300 font-light">
                          {sit.canDo.map((item, i) => (
                            <li key={i} className="flex items-start gap-2">
                              <span className="text-emerald-400 mt-0.5">✓</span>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Cannot Do */}
                      <div className="p-4 rounded-xl bg-[#000a1c] border border-red-500/30 space-y-2">
                        <h4 className="text-xs font-mono uppercase tracking-wider text-red-400 font-semibold flex items-center gap-1.5">
                          <XCircle className="w-3.5 h-3.5" />
                          What Officials Cannot Lawfully Do:
                        </h4>
                        <ul className="space-y-1.5 text-xs text-gray-300 font-light">
                          {sit.cannotDo.map((item, i) => (
                            <li key={i} className="flex items-start gap-2">
                              <span className="text-red-400 mt-0.5">✕</span>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                    </div>

                    {/* Immediate Next Steps */}
                    <div className="p-4 rounded-xl bg-[#000d24] border border-[#d4af37]/20 space-y-2">
                      <h4 className="text-xs font-mono uppercase tracking-wider text-[#ffd754] font-semibold flex items-center gap-1.5">
                        <FileCheck2 className="w-3.5 h-3.5" />
                        Immediate Next Steps:
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-1">
                        {sit.nextSteps.map((step, idx) => (
                          <div key={idx} className="p-2.5 rounded-lg bg-[#001433] border border-[#d4af37]/15 text-xs text-gray-300 font-light leading-relaxed">
                            <span className="font-mono text-[#ffd754] font-bold block mb-1">
                              Step {idx + 1}
                            </span>
                            {step}
                          </div>
                        ))}
                      </div>
                    </div>

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
