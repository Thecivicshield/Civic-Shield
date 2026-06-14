import express from "express";
import path from "path";
import fs from "fs";
import { GoogleGenAI } from "@google/genai";
import { createServer as createViteServer } from "vite";
import { CivicShieldData, BlogPost, EvidenceItem, AnonymousQuestion, NewsletterSub, LayoutBlock } from "./src/types";

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

// Increase limit to allow larger base64 file uploads (PDFs, videos, sheets)
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

const DATA_FILE_PATH = path.join(process.cwd(), "civic_data.json");
const UPLOADS_DIR = path.join(process.cwd(), "uploads");

// Ensure uploads folder exists
if (!fs.existsSync(UPLOADS_DIR)) {
  fs.mkdirSync(UPLOADS_DIR, { recursive: true });
}

// Pre-seeded Initial Campaign Data (Royal Navy Blue / Gold Style)
const initialData: CivicShieldData = {
  blocks: [
    {
      id: "hero",
      title: "Hero Searchlight",
      visible: true,
      order: 1,
      customData: {
        heroTitle: "CIVIC SHIELD",
        heroSubtitle: "Bridging the gap between citizens and legal authority. We eliminate fear, advocate for legal literacy, and empower you with knowledge of basic laws so you can protect yourself and your family with confidence.",
        heroAlertText: "ALERT: Our upcoming virtual 'Know-Your-Rights Procedural Clinic' is scheduled for June 28th. Reserve your free handbook below.",
        primaryColor: "#0F264A",
        accentColor: "#D4AF37"
      }
    },
    {
      id: "pillars",
      title: "Campaign Core Pillars",
      visible: true,
      order: 2,
      customData: {
        pillars: [
          {
            title: "Bridge the Gap",
            description: "Fostering mutual dialogue and professional compliance training to bridge the hostile divide between citizens and authority figures.",
            iconName: "Scale"
          },
          {
            title: "Eliminate Fear",
            description: "Taking the fear out of legal actions of police, code officers, and landlords by equipping you with simple, verified legal definitions.",
            iconName: "ShieldAlert"
          },
          {
            title: "Citizen Defense",
            description: "Providing easy-to-use self-defense template vaults so you can represent your interests with institutional competence.",
            iconName: "Landmark"
          }
        ]
      }
    },
    {
      id: "evidence",
      title: "Legal Library & Handouts",
      visible: true,
      order: 3,
      customData: {
        accentColor: "#D4AF37"
      }
    },
    {
      id: "timeline",
      title: "Campaign Roadmap",
      visible: true,
      order: 4,
      customData: {
        timeline: [
          {
            date: "May 10, 2026",
            title: "Digital Curriculum Drafted",
            description: "Released our 6-segment citizen syllabus covering fundamental civil liberties and constitutional interaction protocols.",
            completed: true
          },
          {
            date: "June 1, 2026",
            title: "Locker Vault Release",
            description: "Uploaded the Pro-Se Administrative Response template pack to help people represent themselves in local hearings.",
            completed: true
          },
          {
            date: "June 28, 2026",
            title: "National Know-Your-Rights Webinar",
            description: "Host a nationwide mock interaction call covering safe legal triggers, consent boundaries, and detainment thresholds.",
            completed: false
          },
          {
            date: "July 20, 2026",
            title: "Municipal Authority Exchange",
            description: "First collaborative workshop linking civic council, defense lawyers, and municipal officials to set transparent procedural benchmarks.",
            completed: false
          }
        ]
      }
    },
    {
      id: "impact-metrics",
      title: "Impact Metrics Chart",
      visible: true,
      order: 5,
      customData: {
        metrics: [
          { label: "Supporters Recruited", value: 340 },
          { label: "Students Engaged", value: 1250 },
          { label: "Guides Distributed", value: 850 },
          { label: "Campus Workshops", value: 18 }
        ]
      }
    },
    {
      id: "justice-shield",
      title: "The Justice Shield",
      visible: true,
      order: 6,
      customData: {}
    },
    {
      id: "social-feed",
      title: "Campaign Social Stream",
      visible: true,
      order: 7,
      customData: {}
    },
    {
      id: "blog",
      title: "Latest Insights & Guides",
      visible: true,
      order: 8,
      customData: {}
    },
    {
      id: "newsletter",
      title: "Civic Messenger Registration",
      visible: true,
      order: 9,
      customData: {}
    }
  ],
  posts: [
    {
      id: "post_1",
      title: "How to Dissolve Detainment Fear Using Three Essential Questions",
      content: "When interacting with any legal authority, fear usually stems from not knowing what comes next. By asking three simple, calm, and progressive questions, you completely clear up the scenario:\n\n1. 'Am I being detained, officer, or am I free to go?' If they answer that you are not detained, you are legally free to calmly walk away. If you are detained, they must possess a reasonable articulable suspicion.\n\n2. 'What is the specific reasonable suspicion for my detainment?' This forces a professional, verbal record of their grounds.\n\n3. 'Am I required by law to provide identity under this specific detainment?' This clarifies if your local code makes refusal to identify a secondary infraction during active stop-and-frisks.\n\nBy keeping dialogue objective, you eliminate panic, document facts, and secure critical protections immediately.",
      date: "2026-06-12",
      author: "Marcus Thorne, Senior Counsel",
      imageUrl: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80&w=1200",
      comments: [
        {
          id: "c1",
          author: "Elena Rostova",
          text: "This basic checklist saved me so much stress yesterday during a municipal inspection inquiry. Thank you Marcus!",
          date: "2026-06-12"
        }
      ]
    },
    {
      "id": "post_2",
      "title": "Pro-Se Rights: You Do Not Need to Afford an Attorney to Stand Tall",
      "content": "Many citizens give up their statutory rights simply because they cannot afford steep attorney trial retainers. However, representing oneself ('Pro-Se') is a constitutionally absolute right.\n\nInside our Evidence locker, we have assembled standardized response packets to small claims files, zoning objections, and municipal citation assessments. In this dispatch, we walk you through standard courthouse filing etiquette - covering how to stamp, index, and properly serve your responses to municipal offices. Stand tall and represent with confidence.",
      "date": "2026-06-10",
      "author": "David Vance, Litigation Lead",
      "imageUrl": "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=1200",
      "comments": []
    }
  ],
  evidence: [
    {
      id: "ev_1",
      title: "Traffic interaction & Police Consent Handbook",
      description: "A pocket-sized breakdown of your exact constitutional rights and compliance requirements during routine highway or roadside vehicular administrative actions.",
      type: "pdf",
      fileName: "Traffic_Interactions_Civilian_Guide.pdf",
      fileUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
      uploadedAt: "2026-06-11",
      fileSize: "1.15 MB",
      verifiedBy: "Civic Shield Advocacy Inst."
    },
    {
      id: "ev_2",
      title: "Pro-Se Self-Representation & Filing Templates",
      description: "Standard boilerplate layouts for composing clear, professional civil replies to minor administrative citations or landlord claims.",
      type: "spreadsheet",
      fileName: "ProSe_Response_Courter_Templates.xlsx",
      fileUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
      uploadedAt: "2026-06-09",
      fileSize: "2.40 MB",
      verifiedBy: "Legal Literacy Board"
    },
    {
      id: "ev_3",
      title: "Procedural De-escalation Compliance Brief",
      description: "Video instruction detailing how to record interactions clearly, remain respectful, and secure your rights without escalating tension.",
      type: "video",
      fileName: "Interaction_Protocol_Deescalate.mp4",
      fileUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
      uploadedAt: "2026-06-05",
      fileSize: "11.2 MB",
      verifiedBy: "National De-escalation League"
    }
  ],
  questions: [
    {
      id: "q_1",
      text: "What is the difference between a police inquiry and a formal detainment?",
      timestamp: "2026-06-12 14:15",
      answered: true,
      answer: "An inquiry is completely voluntary. You are under no obligation to stand or answer questions, and you may walk away. Detainment, however, is a temporary seizure where you must comply but do not have to confess or supply unrequired info beyond identification. Always ask: 'Am I free to go?' to establish this boundary.",
      isPublic: true,
      repliedBy: "Campaign Manager"
    },
    {
      id: "q_2",
      text: "How can I assert my right to record public officers in public spaces?",
      timestamp: "2026-06-13 09:20",
      answered: true,
      answer: "You have a clearly protected right under constitutional case law to visually record officers working in public view. Ensure you remain at a non-interference distance, do not physically obstruct their workspace, and state calmly: 'I am standing back and documenting this for legal transparency.'",
      isPublic: true,
      repliedBy: "AI Campaign Advocate"
    }
  ],
  subscribers: [
    {
      id: "sub_1",
      email: "thecivicshield@gmail.com",
      subscribedAt: "2026-06-13 04:28"
    }
  ],
  socialFeed: [
    {
      id: "soc_3",
      platform: "twitter",
      username: "Civic Shield Campaign",
      handle: "@TheCivicShield",
      content: "⚠️ Know your basic words! If an administrative officer starts questioning you in public, calmly ask: 'Am I being detained, or am I free to go?'\n\nIf free, you can walk away. If detained, you are protected from random interrogations. Knowledge bridges the gap! ⚖️ #LegalLiteracy #CivicShield",
      timestamp: "1 hour ago",
      likes: 142,
      shares: 56,
      comments: 12
    },
    {
      id: "soc_2",
      platform: "instagram",
      username: "Civic Shield",
      handle: "@thecivicshield",
      content: "Our central mission is bridging the critical gap between citizens and legal authority. Reciprocal respect can only emerge when citizens know their basic rights and authorities respect procedural boundaries. \n\nWe eliminate fear by teaching you basic laws. Click our link in bio to download our Free compliance and de-escalation toolkit PDFs! 📚🛡️",
      imageUrl: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80&w=800",
      timestamp: "4 hours ago",
      likes: 289,
      shares: 89,
      comments: 24
    },
    {
      id: "soc_1",
      platform: "linkedin",
      username: "Civic Shield Foundation",
      handle: "linkedin.com/company/civicshield",
      content: "Did you know? Representing yourself in local courts ('Pro-Se') is a constitutional absolute. However, filing municipal objection paperwork can feel incredibly scary.\n\nTo make this easy, we've uploaded clean, standardized boilerplate templates for obection responses directly to our online Evidence Room. Learn how to speak the institutional language and stand tall with confidence. 📚🛡️",
      timestamp: "1 day ago",
      likes: 195,
      shares: 72,
      comments: 15
    },
    {
      id: "soc_youtube_1",
      platform: "youtube",
      username: "Civic Shield Channel",
      handle: "youtube.com/@civicshield",
      content: "📺 NEW VIDEO RELEASE: Walking through an active police detainment step-by-step. Discover how to politely resist unconstitutional searches while remaining fully compliant with officers' safe verbal requests. Watch the full simulation on our channel and learn how to guard your legal rights easily!",
      timestamp: "2 days ago",
      likes: 412,
      shares: 155,
      comments: 48
    }
  ],
  newsletters: [
    {
      id: "news_1",
      subject: "Launching the Civic Shield Legal Literacy Vault!",
      badge: "Campaign Launch",
      body: "Dear Supporters,\n\nWe are absolutely thrilled to broadcast our very first Civic Shield digital archive dispatch! Our absolute aim is to bridge the hostile communication gap between our citizens and municipal authorial forces.\n\nInside our public evidence drawer, you will find our newly compiled civilian guide to police encounters, along with court boilerplate filing indexes. Please share these with family, neighbors, and colleagues. We eliminate fear with pure knowledge.\n\nIn solidarity,\nThe Civic Shield Coordinator Team",
      sentAt: "2026-06-13 11:20",
      recipientCount: 1
    }
  ]
};

// Help helper for reading data file
function loadData(): CivicShieldData {
  try {
    if (fs.existsSync(DATA_FILE_PATH)) {
      const content = fs.readFileSync(DATA_FILE_PATH, "utf-8");
      return JSON.parse(content);
    }
  } catch (error) {
    console.error("Failed to read civic_data.json, returning pre-seeded details.", error);
  }
  return initialData;
}

// Help helper for writing data file
function saveData(newData: CivicShieldData) {
  try {
    fs.writeFileSync(DATA_FILE_PATH, JSON.stringify(newData, null, 2), "utf-8");
  } catch (error) {
    console.error("Failed to write to civic_data.json:", error);
  }
}

// Load global database
let campaignData = loadData();

// Seed initial files of DB
saveData(campaignData);

// Initialize Gemini Client
let aiClient: GoogleGenAI | null = null;
const apiKey = process.env.GEMINI_API_KEY;
if (apiKey) {
  aiClient = new GoogleGenAI({
    apiKey: apiKey,
    httpOptions: {
      headers: {
        "User-Agent": "aistudio-build",
      },
    },
  });
} else {
  console.warn("GEMINI_API_KEY is missing. AI chat assistance will operate in offline mock response mode.");
}

// Server static files under /uploads
app.use("/uploads", express.static(UPLOADS_DIR));

// ---------------- API ENDPOINTS ----------------

// Get all campaigning data
app.get("/api/campaign-data", (req, res) => {
  res.json(campaignData);
});

// Update blocks layout (for complete customization & drag-n-drop sorting)
app.post("/api/save-blocks", (req, res) => {
  try {
    const { blocks } = req.body;
    if (Array.isArray(blocks)) {
      campaignData.blocks = blocks;
      saveData(campaignData);
      return res.json({ success: true, message: "Campaign layout updated." });
    }
    res.status(400).json({ error: "Invalid blocks payload structure." });
  } catch (e: any) {
    res.status(500).json({ error: e.message });
  }
});

// Update particular block variables directly (Admin inline typing updates)
app.post("/api/update-block-data", (req, res) => {
  try {
    const { id, customData } = req.body;
    const blockIndex = campaignData.blocks.findIndex((b) => b.id === id);
    if (blockIndex !== -1) {
      campaignData.blocks[blockIndex].customData = {
        ...campaignData.blocks[blockIndex].customData,
        ...customData
      };
      saveData(campaignData);
      return res.json({ success: true, block: campaignData.blocks[blockIndex] });
    }
    res.status(404).json({ error: "Block not found." });
  } catch (e: any) {
    res.status(500).json({ error: e.message });
  }
});

// Create blog post
app.post("/api/blog", (req, res) => {
  try {
    const { title, content, author, imageUrl } = req.body;
    if (!title || !content) {
      return res.status(400).json({ error: "Title and content are required." });
    }
    const newPost: BlogPost = {
      id: "post_" + Date.now(),
      title,
      content,
      author: author || "Campaign Team",
      date: new Date().toISOString().split("T")[0],
      imageUrl: imageUrl || "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=1200",
      comments: []
    };
    campaignData.posts.unshift(newPost);
    saveData(campaignData);
    res.json(newPost);
  } catch (e: any) {
    res.status(500).json({ error: e.message });
  }
});

// Delete blog post
app.delete("/api/blog/:id", (req, res) => {
  try {
    const { id } = req.params;
    campaignData.posts = campaignData.posts.filter((p) => p.id !== id);
    saveData(campaignData);
    res.json({ success: true, message: "Blog post removed." });
  } catch (e: any) {
    res.status(500).json({ error: e.message });
  }
});

// Add comment to blog post
app.post("/api/blog/:id/comment", (req, res) => {
  try {
    const { id } = req.params;
    const { author, text } = req.body;
    if (!text) return res.status(400).json({ error: "Comment text is required." });
    
    const postIndex = campaignData.posts.findIndex((p) => p.id === id);
    if (postIndex !== -1) {
      const newComment = {
        id: "c_" + Date.now(),
        author: author || "Anonymous Supporter",
        text,
        date: new Date().toLocaleDateString()
      };
      campaignData.posts[postIndex].comments.push(newComment);
      saveData(campaignData);
      return res.json(newComment);
    }
    res.status(404).json({ error: "Post not found." });
  } catch (e: any) {
    res.status(500).json({ error: e.message });
  }
});

// Create evidence file list entry
app.post("/api/evidence", (req, res) => {
  try {
    const { title, description, type, fileName, fileUrl, verifiedBy, fileSize } = req.body;
    if (!title || !fileUrl) {
      return res.status(400).json({ error: "Title and file link are required." });
    }
    const newItem: EvidenceItem = {
      id: "ev_" + Date.now(),
      title,
      description: description || "Unofficial campaign evidence file",
      type: type || "pdf",
      fileName: fileName || "unnamed_document",
      fileUrl,
      uploadedAt: new Date().toISOString().split("T")[0],
      fileSize: fileSize || "Unknown size",
      verifiedBy: verifiedBy || "Campaign Lead"
    };
    campaignData.evidence.unshift(newItem);
    saveData(campaignData);
    res.json(newItem);
  } catch (e: any) {
    res.status(500).json({ error: e.message });
  }
});

// Delete evidence entry
app.delete("/api/evidence/:id", (req, res) => {
  try {
    const { id } = req.params;
    campaignData.evidence = campaignData.evidence.filter((ev) => ev.id !== id);
    saveData(campaignData);
    res.json({ success: true, message: "Evidence dossier removed." });
  } catch (e: any) {
    res.status(500).json({ error: e.message });
  }
});

// Newsletter subscription
app.post("/api/subscribe", (req, res) => {
  try {
    const { email } = req.body;
    if (!email || !email.includes("@")) {
      return res.status(400).json({ error: "A valid email address is required." });
    }
    // Avoid double subscribers
    const exists = campaignData.subscribers.some((s) => s.email.toLowerCase() === email.toLowerCase());
    if (exists) {
      return res.json({ success: true, alreadySubscribed: true, message: "Email is already registered!" });
    }
    const newSub: NewsletterSub = {
      id: "sub_" + Date.now(),
      email,
      subscribedAt: new Date().toLocaleString()
    };
    campaignData.subscribers.push(newSub);
    saveData(campaignData);
    res.json({ success: true, subscription: newSub, message: "Thank you for subscribing to Civic Shield!" });
  } catch (e: any) {
    res.status(500).json({ error: e.message });
  }
});

// File upload (base64 upload for PDFs, videos, images, sheets)
app.post("/api/upload", (req, res) => {
  try {
    const { fileName, fileType, fileData, title, description, verifiedBy } = req.body;
    if (!fileName || !fileData) {
      return res.status(400).json({ error: "Missing uploaded file components." });
    }
    
    // Extract base64
    const matches = fileData.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
    if (!matches || matches.length !== 3) {
      return res.status(400).json({ error: "Incorrect base64 document stream." });
    }
    
    const buffer = Buffer.from(matches[2], "base64");
    const sanitizedSafeName = Date.now() + "_" + fileName.replace(/[^a-zA-Z0-9.\-_]/g, "_");
    const finalFilePath = path.join(UPLOADS_DIR, sanitizedSafeName);
    
    fs.writeFileSync(finalFilePath, buffer);
    
    const fileUrl = `/uploads/${sanitizedSafeName}`;
    const calculatedSize = (buffer.length / (1024 * 1024)).toFixed(2) + " MB";
    
    const newEvidence: EvidenceItem = {
      id: "ev_" + Date.now(),
      title: title || fileName,
      description: description || "Uploaded PDF/Video material",
      type: fileType || "pdf",
      fileName: fileName,
      fileUrl: fileUrl,
      uploadedAt: new Date().toISOString().split("T")[0],
      fileSize: calculatedSize,
      verifiedBy: verifiedBy || "Campaign Coordinator"
    };
    
    campaignData.evidence.unshift(newEvidence);
    saveData(campaignData);
    
    res.json(newEvidence);
  } catch (error: any) {
    console.error("Upload process crash:", error);
    res.status(500).json({ error: "Failed to upload file to the server: " + error.message });
  }
});

// Submit an anonymous question (with OPTIONAL real-time smart answer from Gemini!)
app.post("/api/questions", async (req, res) => {
  try {
    const { text, timestamp } = req.body;
    if (!text || text.trim().length === 0) {
      return res.status(400).json({ error: "Question cannot be empty." });
    }
    
    const newQuestion: AnonymousQuestion = {
      id: "q_" + Date.now(),
      text,
      timestamp: timestamp || new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + " " + new Date().toLocaleDateString(),
      answered: false,
      isPublic: true
    };
    
    // If Gemini client is activated, generate a smart assistant response in real-time!
    if (aiClient) {
      try {
        const campaignKnowledge = `
          You are the Official AI Campaign Advocate of "Civic Shield", advocating for legal literacy, citizen defense, and mutual procedural dialogue.
          Campaign Goal: Bridge the path between citizens and legal authority, eliminate fear of procedures, and equip everyone with knowledge of basic laws so they can protect themselves.
          Tone: Objective, supportive, professional, authoritative, reassuring, and non-escalating.
          Key pillars: Bridge the Gap, Eliminate Fear, Citizen Defense.
          Resources in the locker: Traffic Stop civilian handbook, Pro-Se litigation reply templates, de-escalation video guide.
          Frequently Asked: We aim to demystify trial procedures and statutory terms. Subscriptions and donations finance public printing, training clinics, and de-escalation research materials.
        `;
        
        const response = await aiClient.models.generateContent({
          model: "gemini-3.5-flash",
          contents: `Question: ${text}`,
          config: {
            systemInstruction: `${campaignKnowledge}\nAnswer this user's question concisely, transparently, and professionally. End your answer reassuringly. Limit response to 120 words.`,
            temperature: 0.7
          }
        });
        
        if (response.text) {
          newQuestion.answered = true;
          newQuestion.answer = response.text.trim();
          newQuestion.repliedBy = "AI Campaign Advocate";
        }
      } catch (gemError) {
        console.error("Gemini AI generation failure, saving question for manual admin response:", gemError);
      }
    }
    
    campaignData.questions.push(newQuestion);
    saveData(campaignData);
    res.json(newQuestion);
  } catch (e: any) {
    res.status(500).json({ error: e.message });
  }
});

// Answer or Update a question (Admin custom response / edit)
app.post("/api/questions/:id/answer", (req, res) => {
  try {
    const { id } = req.params;
    const { answer, repliedBy, isPublic } = req.body;
    
    const qIndex = campaignData.questions.findIndex((q) => q.id === id);
    if (qIndex !== -1) {
      campaignData.questions[qIndex].answer = answer || "";
      campaignData.questions[qIndex].answered = !!answer;
      campaignData.questions[qIndex].repliedBy = repliedBy || "Campaign Manager";
      if (typeof isPublic === "boolean") {
        campaignData.questions[qIndex].isPublic = isPublic;
      }
      saveData(campaignData);
      return res.json(campaignData.questions[qIndex]);
    }
    res.status(404).json({ error: "Question not found." });
  } catch (e: any) {
    res.status(500).json({ error: e.message });
  }
});

// Delete anonymous question
app.delete("/api/questions/:id", (req, res) => {
  try {
    const { id } = req.params;
    campaignData.questions = campaignData.questions.filter((q) => q.id !== id);
    saveData(campaignData);
    res.json({ success: true, message: "Question removed." });
  } catch (e: any) {
    res.status(500).json({ error: e.message });
  }
});

// ---------------- Campaign social-feed endpoints ----------------

// Create a new social post
app.post("/api/social-feed", (req, res) => {
  try {
    const { platform, content, imageUrl } = req.body;
    if (!platform || !content) {
      return res.status(400).json({ error: "Platform and content are required." });
    }
    
    // Ensure socialFeed array exists
    if (!campaignData.socialFeed) {
      campaignData.socialFeed = [];
    }

    const newSocialPost = {
      id: "soc_" + Date.now(),
      platform,
      username: platform === "twitter" ? "Civic Shield Campaign" : platform === "linkedin" ? "Civic Shield Foundation" : platform === "youtube" ? "Civic Shield Channel" : platform === "instagram" ? "Civic Shield" : "Civic Shield - Citizens Legal Alliance",
      handle: platform === "twitter" ? "@TheCivicShield" : platform === "linkedin" ? "linkedin.com/company/civicshield" : platform === "youtube" ? "youtube.com/@civicshield" : platform === "instagram" ? "@thecivicshield" : "/civicshield",
      content,
      imageUrl: imageUrl || undefined,
      timestamp: "Just now",
      likes: 0,
      shares: 0,
      comments: 0
    };

    campaignData.socialFeed.unshift(newSocialPost);
    saveData(campaignData);
    res.json(newSocialPost);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Delete a social post
app.delete("/api/social-feed/:id", (req, res) => {
  try {
    const { id } = req.params;
    if (campaignData.socialFeed) {
      campaignData.socialFeed = campaignData.socialFeed.filter((post) => post.id !== id);
      saveData(campaignData);
    }
    res.json({ success: true, message: "Social network post erased." });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// ---------------- Newsletter Broadcaster Endpoint ----------------

// Broadcast newsletter update simulated delivery
app.post("/api/send-newsletter", (req, res) => {
  try {
    const { subject, badge, body } = req.body;
    if (!subject || !body) {
      return res.status(400).json({ error: "Newsletter Subject and Body are required parameters." });
    }

    // Ensure newsletters array exists in database
    if (!campaignData.newsletters) {
      campaignData.newsletters = [];
    }

    const recipientCount = campaignData.subscribers ? campaignData.subscribers.length : 0;

    const newNewsletter = {
      id: "news_" + Date.now(),
      subject,
      badge: badge || "Community Dispatch",
      body,
      sentAt: new Date().toISOString().replace("T", " ").slice(0, 16),
      recipientCount
    };

    campaignData.newsletters.unshift(newNewsletter);
    saveData(campaignData);

    res.json({
      success: true,
      newsletter: newNewsletter,
      message: `Successfully queued and broadcasted dispatch to ${recipientCount} subscribers!`
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// ---------------- VITE INTERPOLATION ----------------

async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    // Development server with HMR disabled or enabled by control
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    // Production serving
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }
  
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server launched and listening on http://0.0.0.0:${PORT}`);
  });
}

startServer();
