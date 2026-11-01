import { CivicShieldData } from "../types";

export const initialData: CivicShieldData = {
  "masterPasscode": "lol12ymn",
  "bookReviews": [
    {
      "bookTitle": "The Sovereign Defense Doctrine",
      "chapterTitle": "Chapter I: The 3 Inviolable Rules",
      "verified": true,
      "date": "2026-06-18",
      "reviewerName": "Adv. Rajesh M. (High Court)",
      "reviewText": "The procedural clarity on D.K. Basu arrest memorandums and non-consensual search objections is impeccable. Essential reading for every citizen.",
      "id": "rev_1",
      "rating": 5
    },
    {
      "chapterTitle": "Chapter II: Sanctity of the Digital Device",
      "bookTitle": "The Sovereign Defense Doctrine",
      "rating": 5,
      "verified": true,
      "reviewerName": "Priya S. (Civic Researcher)",
      "date": "2026-06-22",
      "reviewText": "Citing Puttaswamy and Article 20(3) saved our student group when municipal officials attempted an illegal phone sweep. Clear, fearless, and legally ironclad.",
      "id": "rev_2"
    },
    {
      "date": "2026-06-25",
      "bookTitle": "The Sovereign Defense Doctrine",
      "rating": 5,
      "reviewText": "Filed my first Section 32 application without spending thousands on private retainers. The indexed boilerplate drafting format is golden.",
      "chapterTitle": "Chapter III: Pro-Se Self Representation",
      "verified": true,
      "id": "rev_3",
      "reviewerName": "Vikram K. (Community Organizer)"
    }
  ],
  "caseFiles": [
    {
      "caseNumber": "WP(C)-2026-089",
      "fileSize": "1.8 MB",
      "uploadedAt": "2026-05-14",
      "title": "Illegal Roadside Vehicle Seizure Quashed",
      "status": "precedent",
      "verifiedBy": "Civic Legal Research Desk",
      "id": "cf_1",
      "type": "pdf",
      "category": "Motor Vehicle Rights",
      "fileUrl": "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80&w=800",
      "fileName": "MVA_Rule139_Compliance_Order.pdf",
      "description": "Landmark ruling clarifying that electronic DigiLocker records under Rule 139 CMVR cannot be arbitrarily rejected by inspecting officers."
    },
    {
      "fileSize": "640 KB",
      "description": "Section 20(1) penalty of ₹25,000 imposed on Public Information Officer for withholding ward road expenditure balance sheets.",
      "type": "spreadsheet",
      "verifiedBy": "State Transparency Wing",
      "status": "settled",
      "fileUrl": "https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&q=80&w=800",
      "title": "Municipal Road Tender Audit Penalty Enforced",
      "uploadedAt": "2026-06-02",
      "category": "Right to Information",
      "caseNumber": "CIC-RTI-2026-441",
      "fileName": "Ward_14_Tender_Audit_Ledger.xlsx",
      "id": "cf_2"
    }
  ],
  "visitorStats": {
    "consultationsGiven": 992,
    "reviewsCount": 3,
    "districtsEmpowered": 48,
    "totalVisitors": 14894,
    "lastUpdated": 1789895985216,
    "handbookDownloads": 3840,
    "pagesRead": 8740,
    "templatesDeployed": 1250,
    "chatInteractions": 992,
    "gateEntries": 6420
  },
  "blocks": [
    {
      "id": "hero",
      "order": 1,
      "customData": {
        "heroTitle": "CIVIC SHIELD",
        "heroSubtitle": "Bridging the gap between citizens and legal authority. We eliminate fear, advocate for legal literacy, and empower you with knowledge of basic laws so you can protect yourself and your family with confidence.",
        "primaryColor": "#0F264A",
        "heroAlertText": "ALERT: Our upcoming virtual 'Know-Your-Rights Procedural Clinic' is scheduled for June 28th. Reserve your free handbook below.",
        "accentColor": "#D4AF37"
      },
      "title": "Hero Searchlight",
      "visible": true
    },
    {
      "customData": {
        "pillars": [
          {
            "description": "Conquering the anxiety of administrative or roadside stops by learning my exact, verified rights so I can speak with composure and confidence.",
            "iconName": "ShieldAlert",
            "title": "Overcome My Fear of Encounters"
          },
          {
            "description": "Equipping my household with standardized, robust administrative templates to defend our private property against unauthorized municipal overreaches.",
            "iconName": "Landmark",
            "title": "Protect My Family, Land, & Home"
          },
          {
            "iconName": "Scale",
            "description": "Developing my self-representation skills so I can confidently voice my challenges and protect my interests directly in local public hearings.",
            "title": "Speak Personally, Advocate Competently"
          },
          {
            "description": "Independently auditing government spending and public asset indexes to ensure that municipal authorities operate with full transparency for the community.",
            "title": "Hold Our Local Servants Accountable",
            "iconName": "Eye"
          }
        ]
      },
      "id": "pillars",
      "order": 2,
      "visible": true,
      "title": "Campaign Core Pillars"
    },
    {
      "customData": {
        "accentColor": "#D4AF37"
      },
      "title": "Legal Library & Handouts",
      "visible": true,
      "id": "evidence",
      "order": 3
    },
    {
      "customData": {
        "timeline": [
          {
            "description": "Released our 6-segment citizen syllabus covering fundamental civil liberties and constitutional interaction protocols.",
            "date": "May 10, 2026",
            "title": "Digital Curriculum Drafted",
            "completed": true
          },
          {
            "date": "June 1, 2026",
            "title": "Locker Vault Release",
            "completed": true,
            "description": "Uploaded the Pro-Se Administrative Response template pack to help people represent themselves in local hearings."
          },
          {
            "date": "June 28, 2026",
            "completed": false,
            "title": "National Know-Your-Rights Webinar",
            "description": "Host a nationwide mock interaction call covering safe legal triggers, consent boundaries, and detainment thresholds."
          },
          {
            "title": "Municipal Authority Exchange",
            "date": "July 20, 2026",
            "description": "First collaborative workshop linking civic council, defense lawyers, and municipal officials to set transparent procedural benchmarks.",
            "completed": false
          }
        ]
      },
      "visible": true,
      "order": 4,
      "id": "timeline",
      "title": "Campaign Roadmap"
    },
    {
      "title": "Impact Metrics Chart",
      "visible": true,
      "customData": {
        "metrics": [
          {
            "value": 148,
            "label": "Cases Won & Settled"
          },
          {
            "value": 4850,
            "label": "Citizens Empowered"
          },
          {
            "value": 3120,
            "label": "Handbooks Distributed"
          },
          {
            "value": 35,
            "label": "Procedural Clinics Hosted"
          }
        ]
      },
      "id": "impact-metrics",
      "order": 5
    },
    {
      "order": 6,
      "id": "justice-shield",
      "customData": {},
      "title": "The Justice Shield",
      "visible": true
    },
    {
      "order": 7,
      "id": "constitutional-network",
      "visible": true,
      "customData": {},
      "title": "Constitutional Defense Network"
    },
    {
      "order": 8,
      "id": "blog",
      "visible": true,
      "title": "Campaign Dispatches",
      "customData": {}
    },
    {
      "id": "social-feed",
      "title": "Social Stream",
      "customData": {},
      "visible": true,
      "order": 9
    },
    {
      "order": 10,
      "customData": {},
      "id": "newsletter",
      "title": "Pledge Subscription",
      "visible": true
    }
  ],
  "posts": [
    {
      "imageUrl": "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80&w=1200",
      "id": "post_1",
      "comments": [
        {
          "text": "This simple question changed how I approach traffic checkpoints. Calm clarity works miracles.",
          "author": "Aarav Patel",
          "date": "2026-05-20",
          "id": "c_1"
        }
      ],
      "content": "Roadside stops often trigger panic. The key is understanding that protocol protects both parties. Under constitutional due process and traffic safety regulations, an officer cannot remove your ignition key or physically seize your phone without judicial warrant. Always ask politely: 'Am I being detained, Officer, or am I free to proceed?' Keep your verified credentials and documentation ready.",
      "title": "How to Safely Handle Roadside Traffic Inspections",
      "author": "Legal Defense Coordinator",
      "date": "2026-05-18"
    },
    {
      "imageUrl": "https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&q=80&w=1200",
      "author": "Procedural Clinic Lead",
      "date": "2026-06-05",
      "id": "post_2",
      "title": "Representing Yourself in Consumer & Municipal Disputes",
      "content": "The belief that you must always hire expensive legal counsel for basic disputes is a common misconception. Procedural common-law and statutory doctrines give any citizen the inherent right to appear as a self-represented litigant (Party-in-Person / Pro-Se). Our standardized boilerplate filing templates format your facts and legal citations in a way court registries accept seamlessly.",
      "comments": []
    }
  ],
  "evidence": [
    {
      "fileSize": "1.2 MB",
      "uploadedAt": "2026-05-10",
      "title": "Citizen Roadside Rights Pocket Guide",
      "type": "pdf",
      "fileUrl": "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80&w=800",
      "id": "ev_1",
      "description": "Quick-reference pocket card containing exact legal citations, constitutional directives, and polite scripts for traffic stops.",
      "verifiedBy": "Constitutional Law Counsel",
      "fileName": "Roadside_Rights_Pocket_Card.pdf"
    },
    {
      "description": "Standardized Section 32 notice and affidavit templates for self-representation in municipal and consumer disputes.",
      "uploadedAt": "2026-05-25",
      "fileSize": "3.4 MB",
      "fileName": "ProSe_Filing_Template_Pack.zip",
      "id": "ev_2",
      "verifiedBy": "Civic Legal Council",
      "type": "spreadsheet",
      "title": "Pro-Se Courtroom Appearance Template Pack",
      "fileUrl": "https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&q=80&w=800"
    },
    {
      "fileUrl": "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=800",
      "title": "Right to Information (RTI) Master Filing Kit",
      "type": "pdf",
      "uploadedAt": "2026-06-02",
      "fileName": "RTI_Master_Kit_2026.pdf",
      "description": "Form A templates, fee calculation matrices, and First Appellate Authority appeal formats for auditing municipal records.",
      "verifiedBy": "State Transparency Committee",
      "fileSize": "2.1 MB",
      "id": "ev_3"
    }
  ],
  "questions": [
    {
      "answer": "No. Under Article 20(3) of the Constitution and the landmark Puttaswamy privacy judgment, your digital device is protected against arbitrary searches. An officer cannot force you to unlock your phone, reveal passwords, or browse through chats without a specific judicial search warrant or formal FIR seizure memo under Section 102 CrPC / Section 107 BNSS.",
      "timestamp": "10:30 AM 2026-06-12",
      "answered": true,
      "text": "Can an officer seize my smartphone during a regular vehicle inspection?",
      "isPublic": true,
      "repliedBy": "AI Legal Advocate (Civic Shield)",
      "id": "q_1"
    },
    {
      "repliedBy": "AI Legal Advocate (Civic Shield)",
      "isPublic": true,
      "answered": true,
      "text": "What should I do if a police officer refuses to register a formal crime complaint?",
      "timestamp": "02:15 PM 2026-06-15",
      "answer": "Under mandatory incident reporting directives, registration of a formal crime complaint is mandatory for serious offenses. If an officer refuses, you can: (1) Submit a formal written complaint to the supervisory Police Chief or Department Inspector by certified mail, or (2) File a formal petition directly before the local judicial Magistrate or court clerk.",
      "id": "q_2"
    }
  ],
  "subscribers": [
    {
      "id": "sub_1",
      "subscribedAt": "2026-05-01 09:00:00",
      "email": "thecivicshield@gmail.com"
    }
  ],
  "socialFeed": [
    {
      "comments": 12,
      "timestamp": "1 hour ago",
      "shares": 56,
      "platform": "twitter",
      "handle": "@TheCivicShield",
      "likes": 142,
      "id": "soc_3",
      "username": "Civic Shield Campaign",
      "content": "⚠️ Know your basic words! If an administrative officer starts questioning you in public, calmly ask: 'Am I being detained, or am I free to go?'\n\nIf free, you can walk away. If detained, you are protected from random interrogations. Knowledge bridges the gap! ⚖️ #LegalLiteracy #CivicShield"
    },
    {
      "imageUrl": "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80&w=800",
      "content": "Our central mission is bridging the critical gap between citizens and legal authority. Reciprocal respect can only emerge when citizens know their basic rights and authorities respect procedural boundaries. \n\nWe eliminate fear by teaching you basic laws. Click our link in bio to download our Free compliance and de-escalation toolkit PDFs! 📚🛡️",
      "platform": "instagram",
      "id": "soc_2",
      "likes": 289,
      "handle": "@thecivicshield",
      "comments": 24,
      "timestamp": "4 hours ago",
      "username": "Civic Shield",
      "shares": 89
    },
    {
      "likes": 195,
      "shares": 72,
      "timestamp": "1 day ago",
      "username": "Civic Shield Foundation",
      "comments": 15,
      "handle": "linkedin.com/company/civicshield",
      "content": "Did you know? Representing yourself in local courts ('Pro-Se') is a constitutional absolute. However, filing municipal objection paperwork can feel incredibly scary.\n\nTo make this easy, we've uploaded clean, standardized boilerplate templates for objection responses directly to our online Evidence Room. Learn how to speak the institutional language and stand tall with confidence. 📚🛡️",
      "id": "soc_1",
      "platform": "linkedin"
    },
    {
      "content": "📺 NEW VIDEO RELEASE: Walking through an active police detainment step-by-step. Discover how to politely resist unconstitutional searches while remaining fully compliant with officers' safe verbal requests. Watch the full simulation on our channel and learn how to guard your legal rights easily!",
      "id": "soc_youtube_1",
      "username": "Civic Shield Channel",
      "handle": "youtube.com/@civicshield",
      "likes": 412,
      "timestamp": "2 days ago",
      "comments": 48,
      "shares": 155,
      "platform": "youtube"
    }
  ],
  "newsletters": [
    {
      "badge": "Campaign Launch",
      "body": "Dear Supporters,\n\nWe are absolutely thrilled to broadcast our very first Civic Shield digital archive dispatch! Our absolute aim is to bridge the hostile communication gap between our citizens and municipal authorial forces.\n\nInside our public evidence drawer, you will find our newly compiled civilian guide to police encounters, along with court boilerplate filing indexes. Please share these with family, neighbors, and colleagues. We eliminate fear with pure knowledge.\n\nIn solidarity,\nThe Civic Shield Coordinator Team",
      "recipientCount": 1,
      "subject": "Launching the Civic Shield Legal Literacy Vault!",
      "sentAt": "2026-06-13 11:20",
      "id": "news_1"
    }
  ],
  "notificationLogs": [],
  "lastUpdated": 1793516908551
};
