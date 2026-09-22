import React, { useState, useEffect, useRef } from "react";
import { 
  MessageSquare, X, Send, ShieldQuestion, BadgeHelp, Info, 
  Sparkles, UserCheck, Trash2, FileText, Download, Cpu, HelpCircle,
  Plus, Link2, UploadCloud, CheckCircle2, ChevronDown, ChevronUp, RefreshCw,
  Scale, BookOpen, ShieldCheck, CornerDownLeft, Copy, Check, RotateCcw,
  Globe, ExternalLink, Search, Zap
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { AnonymousQuestion, EvidenceItem } from "../types";
import { getAutonomousLegalResponse } from "../utils/legalAdvisor";

interface AnonymousChatProps {
  questions: AnonymousQuestion[];
  onNewQuestion: (qText: string) => Promise<AnonymousQuestion | null>;
  evidence: EvidenceItem[];
  onAddEvidence: (payload: {
    fileName: string;
    fileType: string;
    fileData: string;
    title: string;
    description: string;
    verifiedBy: string;
  }) => Promise<void>;
}

const SOVEREIGN_RESOURCES = [
  { 
    title: "Administrative Objection Affidavit", 
    type: "Word Template", 
    size: "48 KB", 
    desc: "A formal declarations kit to challenge overreaching notifications or municipal requests." 
  },
  { 
    title: "FOIA Certified Copy Application", 
    type: "PDF Handbook", 
    size: "124 KB", 
    desc: "Guidelines for forcing local public officers to deliver budget logs and official letters." 
  },
  { 
    title: "Self-Legal Representation Manual", 
    type: "Procedural Protocol", 
    size: "85 KB", 
    desc: "A systematic blueprint to confidently voice and protect your rights in local public hearings." 
  },
  { 
    title: "Inviolable Dignity Covenant Form", 
    type: "Draft Form", 
    size: "62 KB", 
    desc: "A custom drafted notification of spatial and personal boundary immunity for active defense." 
  }
];

function renderBoldText(text: string, keyPrefix: string) {
  const boldRegex = /\*\*(.*?)\*\*/g;
  const parts: React.ReactNode[] = [];
  let lastIndex = 0;
  let match;

  while ((match = boldRegex.exec(text)) !== null) {
    const [fullMatch, boldContent] = match;
    const pre = text.substring(lastIndex, match.index);
    if (pre) parts.push(pre);
    parts.push(<strong key={`${keyPrefix}-b-${match.index}`} className="text-[#ffd754] font-semibold">{boldContent}</strong>);
    lastIndex = match.index + fullMatch.length;
  }
  const post = text.substring(lastIndex);
  if (post) parts.push(post);
  return parts.length > 0 ? <React.Fragment key={keyPrefix}>{parts}</React.Fragment> : text;
}

function renderFormattedMessage(text: string) {
  const lines = text.split('\n');
  return (
    <div className="space-y-1.5">
      {lines.map((line, lIdx) => {
        if (!line.trim()) {
          return <div key={lIdx} className="h-1" />;
        }
        const linkRegex = /\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g;
        let lastIndex = 0;
        const lineParts: React.ReactNode[] = [];
        let match;

        while ((match = linkRegex.exec(line)) !== null) {
          const [fullMatch, linkText, linkUrl] = match;
          const preText = line.substring(lastIndex, match.index);
          if (preText) {
            lineParts.push(renderBoldText(preText, `pre-${lIdx}-${lastIndex}`));
          }
          lineParts.push(
            <a 
              key={`link-${lIdx}-${match.index}`}
              href={linkUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#ffd754] underline hover:text-white inline-flex items-center gap-1 font-medium transition-colors"
            >
              {linkText}
            </a>
          );
          lastIndex = match.index + fullMatch.length;
        }

        const remainingText = line.substring(lastIndex);
        if (remainingText) {
          lineParts.push(renderBoldText(remainingText, `post-${lIdx}-${lastIndex}`));
        }

        const isBullet = line.trim().startsWith('•') || line.trim().startsWith('-') || /^\d+\./.test(line.trim());
        return (
          <div key={lIdx} className={isBullet ? 'pl-2 text-gray-200' : 'text-gray-100'}>
            {lineParts.length > 0 ? lineParts : renderBoldText(line, `line-${lIdx}`)}
          </div>
        );
      })}
    </div>
  );
}

export default function AnonymousChat({ questions, onNewQuestion, evidence, onAddEvidence }: AnonymousChatProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'chat' | 'directory' | 'resources'>('chat');
  const [messageText, setMessageText] = useState("");
  const [loading, setLoading] = useState(false);
  const [quickRead, setQuickRead] = useState<boolean>(() => {
    try {
      const stored = localStorage.getItem("civic_shield_quick_read");
      return stored !== null ? stored === "true" : false;
    } catch {
      return false;
    }
  });

  const toggleQuickRead = () => {
    setQuickRead(prev => {
      const nextVal = !prev;
      try {
        localStorage.setItem("civic_shield_quick_read", String(nextVal));
      } catch {}
      return nextVal;
    });
  };

  // Resource Form States
  const [showAddForm, setShowAddForm] = useState(false);
  const [resTitle, setResTitle] = useState("");
  const [resDesc, setResDesc] = useState("");
  const [resUrl, setResUrl] = useState("");
  const [resType, setResType] = useState<'pdf' | 'video' | 'spreadsheet' | 'text'>('pdf');
  const [resMethod, setResMethod] = useState<'file' | 'link'>('link');
  const [resFile, setResFile] = useState<File | null>(null);
  const [resStatus, setResStatus] = useState<string | null>(null);
  const [isSubmittingRes, setIsSubmittingRes] = useState(false);

  const handleAddResource = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!resTitle.trim()) {
      setResStatus("Resource Title is required.");
      return;
    }

    setIsSubmittingRes(true);
    setResStatus("Compiling new resource...");

    try {
      if (resMethod === 'file') {
        if (!resFile) {
          setResStatus("Please choose a file first.");
          setIsSubmittingRes(false);
          return;
        }

        const reader = new FileReader();
        reader.onload = async () => {
          try {
            const fileData = reader.result as string; // base64
            await onAddEvidence({
              fileName: resFile.name,
              fileType: resType,
              fileData,
              title: resTitle,
              description: resDesc || "User-added digital citizen resource",
              verifiedBy: "Citizen Defender"
            });
            setResStatus("Resource uploaded and indexed successfully!");
            // Reset form
            setResTitle("");
            setResDesc("");
            setResUrl("");
            setResFile(null);
            setTimeout(() => {
              setShowAddForm(false);
              setResStatus(null);
            }, 2000);
          } catch (err: any) {
            setResStatus("Upload failed: " + err.message);
          } finally {
            setIsSubmittingRes(false);
          }
        };
        reader.readAsDataURL(resFile);
      } else {
        if (!resUrl.trim() || !resUrl.startsWith("http")) {
          setResStatus("Please enter a valid HTTP/HTTPS URL.");
          setIsSubmittingRes(false);
          return;
        }

        await onAddEvidence({
          fileName: resUrl,
          fileType: resType,
          fileData: resUrl,
          title: resTitle,
          description: resDesc || "User-added digital citizen resource link",
          verifiedBy: "Citizen Defender"
        });

        setResStatus("Resource link indexed successfully!");
        setResTitle("");
        setResDesc("");
        setResUrl("");
        setTimeout(() => {
          setShowAddForm(false);
          setResStatus(null);
        }, 2000);
        setIsSubmittingRes(false);
      }
    } catch (err: any) {
      setResStatus("Failed to add resource: " + err.message);
      setIsSubmittingRes(false);
    }
  };
  const [conversation, setConversation] = useState<Array<{ 
    sender: 'user' | 'bot' | 'admin'; 
    text: string; 
    time: string;
    sources?: Array<{ title: string; url: string }>;
    isGrounded?: boolean;
    isQuickRead?: boolean;
  }>>(() => {
    try {
      const saved = localStorage.getItem("civic_shield_chat_history_v4");
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return [
      {
        sender: 'bot',
        text: "Welcome to Civic Shield AI Legal Advocate. Powered by Gemini 3.8 Flash with live Google Search Grounding, I provide immediate, constitutionally verified guidance for police interactions, RTI petitions, tenant disputes, traffic stops, and pro-se court appearances. Ask any question to receive real-time answers with authoritative citations.",
        time: "Just now",
        isGrounded: true
      }
    ];
  });
  const [searchQuery, setSearchQuery] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom when conversations update
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [conversation, isOpen, activeTab]);

  // Sync conversation state to localStorage
  useEffect(() => {
    try {
      localStorage.setItem("civic_shield_chat_history_v4", JSON.stringify(conversation));
    } catch (e) {
      console.error(e);
    }
  }, [conversation]);

  // Global trigger listener
  useEffect(() => {
    const handleOpen = () => setIsOpen(true);
    window.addEventListener("open-anonymous-chat", handleOpen);
    return () => window.removeEventListener("open-anonymous-chat", handleOpen);
  }, []);

  const QUICK_PROMPTS = [
    { label: "🚦 Traffic Stop Rights", text: "What are my exact rights during a traffic stop check, and are digital documents on DigiLocker valid?" },
    { label: "🎥 Filming Police", text: "Do I have the constitutional right to record police officers in public spaces?" },
    { label: "⚖️ Pro-Se Representation", text: "How do I represent myself in court as a party-in-person without an expensive lawyer?" },
    { label: "📑 Filing an RTI", text: "How do I draft and file an RTI application to get government spending records?" },
    { label: "🏠 Tenant Eviction Shield", text: "Can my landlord evict me without notice or cut off electricity and water?" },
    { label: "🛡️ Free Legal Aid NALSA", text: "Who qualifies for 100% free legal aid and how can I apply at DLSA/NALSA?" },
    { label: "👮 FIR Registration", text: "What should I do if the police station refuses to register my FIR?" }
  ];

  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);

  const handleCopyMessage = (text: string, idx: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIdx(idx);
    setTimeout(() => setCopiedIdx(null), 2000);
  };

  const handleResetChat = () => {
    if (confirm("Reset chat conversation history?")) {
      setConversation([
        {
          sender: 'bot',
          text: "Welcome to Civic Shield AI Legal Advocate. Powered by Gemini 3.8 Flash with live Google Search Grounding, I provide immediate, constitutionally verified legal guidance. Ask me anything about police stops, RTI filings, tenant protections, court self-representation, or constitutional rights!",
          time: "Just now",
          isGrounded: true
        }
      ]);
    }
  };

  const handleSubmit = async (e?: React.FormEvent, customMsg?: string) => {
    if (e) e.preventDefault();
    const textToSend = (customMsg !== undefined ? customMsg : messageText).trim();
    if (!textToSend || loading) return;

    setMessageText("");
    
    // Add user message to local stream immediately
    const userTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const currentConv = [...conversation, { sender: 'user' as const, text: textToSend, time: userTime }];
    setConversation(currentConv);
    setLoading(true);

    try {
      // Trigger live chat interaction tracking in background
      fetch("/api/track-chat", { method: "POST" }).catch(() => {});

      // Call conversational multi-turn AI endpoint with clean previous conversation history
      const historyPayload = conversation.slice(-8).map(msg => ({
        role: msg.sender === 'user' ? 'user' : 'model',
        content: msg.text
      }));

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: textToSend,
          history: historyPayload,
          quickRead: quickRead
        })
      });

      if (res.ok) {
        const data = await res.json();
        if (data && data.answer) {
          setConversation(prev => [...prev, { 
            sender: 'bot', 
            text: data.answer, 
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            sources: Array.isArray(data.sources) ? data.sources : [],
            isGrounded: Boolean(data.sources && data.sources.length > 0),
            isQuickRead: Boolean(data.quickRead ?? quickRead)
          }]);
        } else {
          throw new Error("No answer in response");
        }
      } else {
        // Fallback to onNewQuestion or autonomous engine
        const result = await onNewQuestion(textToSend);
        if (result && result.answer) {
          setConversation(prev => [...prev, { 
            sender: 'bot', 
            text: result.answer, 
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            sources: result.sources || [],
            isGrounded: Boolean(result.sources && result.sources.length > 0),
            isQuickRead: quickRead
          }]);
        } else {
          const autoAnswer = getAutonomousLegalResponse(textToSend);
          setConversation(prev => [...prev, { 
            sender: 'bot', 
            text: autoAnswer.answer, 
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            isGrounded: false,
            isQuickRead: quickRead
          }]);
        }
      }
    } catch (err) {
      console.warn("Backend chat call fallback:", err);
      // Autonomous Instant Response even if offline
      const autoAnswer = getAutonomousLegalResponse(textToSend);
      setConversation(prev => [...prev, { 
        sender: 'bot', 
        text: autoAnswer.answer, 
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isGrounded: false,
        isQuickRead: quickRead
      }]);
    } finally {
      setLoading(false);
    }
  };

  const filteredDirectory = questions.filter(q => 
    q.answered && q.isPublic &&
    (q.text.toLowerCase().includes(searchQuery.toLowerCase()) || 
     (q.answer && q.answer.toLowerCase().includes(searchQuery.toLowerCase())))
  );

  return (
    <>
      {/* Floating Action Button (HIGH TECH GLOWING ORB) */}
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            id="chatbox-fab"
            onClick={() => setIsOpen(true)}
            initial={{ scale: 0.7, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.7, opacity: 0 }}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.94 }}
            transition={{ type: "spring", stiffness: 350, damping: 25 }}
            className="fixed bottom-20 sm:bottom-6 right-4 sm:right-6 z-[450] cursor-pointer select-none group"
          >
            {/* Pulsing aura loops */}
            <div className="absolute inset-0 rounded-full bg-[#d4af37]/25 blur-md animate-ping" />
            <div className="absolute inset-0 rounded-full bg-blue-500/10 blur-xl" />

            <div className="w-14 h-14 rounded-full bg-black/95 border-2 border-[#d4af37]/50 flex items-center justify-center shadow-[0_0_20px_rgba(212,175,55,0.4)] relative overflow-hidden">
              {/* Spinning technical rings */}
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                className="absolute inset-1 border border-dashed border-[#d4af37]/25 rounded-full pointer-events-none"
              />
              <motion.div 
                animate={{ rotate: -360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute inset-2 border border-dotted border-[#ffd754]/20 rounded-full pointer-events-none"
              />

              {/* Glowing Heartbeat Orb Core */}
              <div className="relative w-6 h-6 rounded-full bg-gradient-to-r from-[#d4af37] to-[#ffd754] shadow-[0_0_12px_#d4af37] flex items-center justify-center animate-pulse">
                <MessageSquare className="w-3.5 h-3.5 text-[#001233]" />
              </div>

              {/* Vector HUD details */}
              <svg className="absolute inset-0 w-full h-full animate-spin-slow opacity-60 pointer-events-none" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="42" stroke="#d4af37" strokeWidth="1" strokeDasharray="15 8 5 8" fill="none" />
              </svg>
            </div>

            {/* Micro Tech Tag hover label */}
            <span className="absolute right-16 top-1/2 -translate-y-1/2 bg-[#001233]/95 border border-[#d4af37]/35 text-white text-[8px] font-mono tracking-widest uppercase px-2 py-1 rounded-sm shadow-md pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
              * ACCESS_AI_ORB *
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Cyber Window (Expanded & Morphed HUD) */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 25, transition: { duration: 0.18, ease: "easeOut" } }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed bottom-20 sm:bottom-6 right-2 sm:right-6 z-[450] w-[calc(100vw-1rem)] sm:w-[440px] max-w-[440px] max-h-[80vh] sm:max-h-[85vh] h-[500px] sm:h-[580px] rounded-lg flex flex-col shadow-[0_20px_60px_rgba(0,0,0,0.85),0_0_30px_rgba(212,175,55,0.25)] overflow-hidden border-2 border-[#d4af37]/60 bg-[#001a4d] font-sans"
          >
            {/* Tech Corner Brackets */}
            <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-[#d4af37]" />
            <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-[#d4af37]" />
            <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-[#d4af37]" />
            <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-[#d4af37]" />

            {/* Header */}
            <div className="bg-[#001233] px-4 py-3 border-b border-[#d4af37]/25 flex items-center justify-between relative z-10">
              <div className="flex items-center gap-2.5">
                <div className="p-1.5 rounded-sm bg-[#d4af37]/10 border border-[#d4af37]/25 text-[#d4af37] relative">
                  <ShieldQuestion className="w-5 h-5" />
                  <span className="absolute top-0 right-0 w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                </div>
                <div className="text-left">
                  <h3 className="text-xs font-serif font-bold text-white tracking-wide flex items-center gap-1.5 uppercase">
                    Civic Shield AI Advocate <Sparkles className="w-3.5 h-3.5 text-[#d4af37]" />
                  </h3>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <p className="text-[8.5px] text-emerald-400 flex items-center gap-1 font-mono tracking-wider uppercase">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block animate-pulse" /> SEARCH GROUNDED
                    </p>
                    <span className="text-[8px] font-mono px-1 py-0.2 bg-[#d4af37]/15 text-[#d4af37] border border-[#d4af37]/30 rounded-sm">
                      GEMINI 3.8 FLASH
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-1.5">
                <button
                  onClick={handleResetChat}
                  title="Reset conversation (New Chat)"
                  className="p-1.5 rounded-sm text-gray-400 hover:text-[#ffd754] hover:bg-[#d4af37]/10 transition-all cursor-pointer flex items-center gap-1 text-[9px] font-mono"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">New Chat</span>
                </button>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="px-2 py-1 rounded text-[10px] font-mono font-bold text-[#ffd754] hover:text-white bg-[#001a4d]/80 hover:bg-[#d4af37]/20 border border-[#d4af37]/30 transition-all cursor-pointer uppercase tracking-wider"
                  title="Minimize Chat"
                >
                  Minimize
                </button>
              </div>
            </div>

            {/* Morphing Navigation Tabs */}
            <div className="flex bg-[#001233] border-b border-[#d4af37]/15 text-[9.5px] font-mono relative z-10 select-none">
              <button
                onClick={() => setActiveTab('chat')}
                className={`flex-1 py-2.5 text-center font-bold tracking-widest uppercase border-b-2 transition-all cursor-pointer ${
                  activeTab === 'chat' 
                    ? "border-[#d4af37] text-[#d4af37] bg-[#001a4d]/75 font-bold" 
                    : "border-transparent text-gray-400 hover:text-white"
                }`}
              >
                AI Chat
              </button>
              <button
                onClick={() => setActiveTab('directory')}
                className={`flex-1 py-2.5 text-center font-bold tracking-widest uppercase border-b-2 transition-all cursor-pointer ${
                  activeTab === 'directory' 
                    ? "border-[#d4af37] text-[#d4af37] bg-[#001a4d]/75 font-bold" 
                    : "border-transparent text-gray-400 hover:text-white"
                }`}
              >
                Community Q&A
              </button>
              <button
                onClick={() => setActiveTab('resources')}
                className={`flex-1 py-2.5 text-center font-bold tracking-widest uppercase border-b-2 transition-all cursor-pointer ${
                  activeTab === 'resources' 
                    ? "border-[#d4af37] text-[#d4af37] bg-[#001a4d]/75 font-bold" 
                    : "border-transparent text-gray-400 hover:text-white"
                }`}
              >
                Resources
              </button>
            </div>

            {/* Tab Panels */}
            <div className="flex-1 overflow-hidden relative min-h-0 bg-[#001a4d] flex flex-col">
              <AnimatePresence mode="wait">
                {activeTab === 'chat' && (
                  <motion.div 
                    key="chat-tab"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="flex-1 flex flex-col min-h-0"
                  >
                    {/* Chat log body */}
                    <div 
                      ref={scrollRef}
                      className="flex-1 p-3.5 overflow-y-auto space-y-3.5 text-left"
                    >
                      <div className="p-2.5 rounded-sm bg-[#d4af37]/5 border border-[#d4af37]/20 text-[10px] text-gray-200 leading-relaxed flex items-start gap-2">
                        <Info className="w-4 h-4 text-[#d4af37] shrink-0 mt-0.5" />
                        <div>
                          <strong className="text-[#d4af37] block font-mono mb-0.5">CONSTITUTIONAL & CIVIC ADVOCATE</strong>
                          Ask anything freely. The AI processes your inquiry with verified statutory references, precedents, and step-by-step procedures.
                        </div>
                      </div>

                      {conversation.map((msg, idx) => (
                        <motion.div 
                          key={idx} 
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.25 }}
                          className={`flex flex-col group ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
                        >
                          <div 
                            className={`max-w-[92%] rounded px-3.5 py-2.5 text-xs shadow-md leading-relaxed whitespace-pre-wrap font-sans relative ${
                              msg.sender === 'user'
                                ? 'bg-[#d4af37] text-[#001233] font-medium shadow-[0_0_10px_rgba(212,175,55,0.2)]'
                                : 'bg-[#001233] border border-[#d4af37]/25 text-gray-100'
                            }`}
                          >
                            {msg.sender === 'bot' && (
                              <div className="flex items-center justify-between gap-1.5 font-mono text-[9px] uppercase tracking-wider text-[#d4af37] pb-1.5 mb-1.5 border-b border-[#d4af37]/15">
                                <div className="flex items-center gap-1.5 flex-wrap">
                                  <ShieldCheck className="w-3.5 h-3.5 text-[#d4af37]" />
                                  <span className="font-bold">Civic Shield AI Advocate</span>
                                  {(msg.isQuickRead || msg.text.startsWith("⚡") || msg.text.includes("Quick Read")) && (
                                    <span className="flex items-center gap-0.5 text-[7.5px] text-[#001233] bg-[#ffd754] px-1.5 py-0.2 rounded font-mono font-bold tracking-tight">
                                      <Zap className="w-2.5 h-2.5 fill-current" /> QUICK READ
                                    </span>
                                  )}
                                  {msg.sources && msg.sources.length > 0 && (
                                    <span className="flex items-center gap-1 text-[7.5px] text-emerald-400 bg-emerald-950/60 px-1 py-0.2 rounded border border-emerald-500/30">
                                      <Globe className="w-2.5 h-2.5" /> GROUNDED
                                    </span>
                                  )}
                                </div>
                                <button
                                  onClick={() => handleCopyMessage(msg.text, idx)}
                                  title="Copy message"
                                  className="text-gray-400 hover:text-[#ffd754] p-0.5 rounded transition-colors flex items-center gap-1 text-[8px] font-mono lowercase"
                                >
                                  {copiedIdx === idx ? (
                                    <>
                                      <Check className="w-3 h-3 text-emerald-400" />
                                      <span className="text-emerald-400">copied</span>
                                    </>
                                  ) : (
                                    <>
                                      <Copy className="w-3 h-3" />
                                      <span>copy</span>
                                    </>
                                  )}
                                </button>
                              </div>
                            )}
                            {msg.sender === 'bot' ? renderFormattedMessage(msg.text) : msg.text}

                            {/* Option to toggle between Quick Read summary and Full Legal Breakdown */}
                            {msg.sender === 'bot' && (
                              <div className="mt-2 pt-1.5 border-t border-[#d4af37]/15 flex items-center justify-between text-[9px]">
                                {(msg.isQuickRead || msg.text.startsWith("⚡") || msg.text.includes("Quick Read")) ? (
                                  <button
                                    type="button"
                                    onClick={() => {
                                      const prevQ = conversation.slice(0, idx).reverse().find(m => m.sender === 'user')?.text || "";
                                      handleSubmit(undefined, prevQ ? `Please provide the comprehensive in-depth legal analysis with full statutory provisions and Supreme Court case precedents for: ${prevQ}` : "Please provide the comprehensive in-depth legal analysis with full statutory provisions.");
                                    }}
                                    disabled={loading}
                                    className="text-[#ffd754] hover:text-white flex items-center gap-1 font-mono transition-colors cursor-pointer"
                                    title="Request full legal breakdown"
                                  >
                                    <BookOpen className="w-3 h-3 text-[#ffd754]" />
                                    <span>Expand to Full Legal Breakdown</span>
                                  </button>
                                ) : (
                                  <button
                                    type="button"
                                    onClick={() => {
                                      const prevQ = conversation.slice(0, idx).reverse().find(m => m.sender === 'user')?.text || "";
                                      handleSubmit(undefined, prevQ ? `Please summarize this into a concise Quick Read field brief: ${prevQ}` : "Please summarize this into a concise Quick Read field brief.");
                                    }}
                                    disabled={loading}
                                    className="text-gray-400 hover:text-[#ffd754] flex items-center gap-1 font-mono transition-colors cursor-pointer"
                                    title="Request condensed summary"
                                  >
                                    <Zap className="w-3 h-3 text-[#ffd754]" />
                                    <span>Get Quick Read Summary</span>
                                  </button>
                                )}
                              </div>
                            )}

                            {/* Google Search Grounding Citations */}
                            {msg.sources && msg.sources.length > 0 && (
                              <div className="mt-2.5 pt-2 border-t border-[#d4af37]/20 text-[10px] space-y-1.5">
                                <div className="flex items-center justify-between text-[#ffd754] font-mono text-[9px] uppercase font-bold tracking-wider">
                                  <span className="flex items-center gap-1.5">
                                    <Globe className="w-3 h-3 text-[#ffd754]" /> Verified Web Citations ({msg.sources.length})
                                  </span>
                                  <span className="text-[7.5px] text-emerald-400 bg-emerald-950/70 border border-emerald-500/30 px-1.5 py-0.5 rounded-sm">
                                    LIVE GOOGLE SEARCH
                                  </span>
                                </div>
                                <div className="flex flex-wrap gap-1.5 pt-0.5">
                                  {msg.sources.map((src, sIdx) => (
                                    <a
                                      key={sIdx}
                                      href={src.url}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="inline-flex items-center gap-1 px-2 py-0.5 rounded-sm bg-[#001433] hover:bg-[#d4af37]/20 border border-[#d4af37]/35 hover:border-[#d4af37] text-gray-200 hover:text-white transition-all text-[9px] font-sans group/src max-w-[240px]"
                                      title={src.title || src.url}
                                    >
                                      <ExternalLink className="w-2.5 h-2.5 text-[#ffd754] group-hover/src:text-white shrink-0" />
                                      <span className="truncate">{src.title || src.url}</span>
                                    </a>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                          <span className="text-[8px] text-gray-500 mt-1 px-1 font-mono tracking-wider">{msg.time}</span>
                        </motion.div>
                      ))}

                      {loading && (
                        <motion.div 
                          initial={{ opacity: 0, y: 5 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="p-3 rounded-sm bg-[#001233] border border-[#d4af37]/30 text-xs text-gray-200 space-y-1.5"
                        >
                          <div className="flex items-center justify-between text-[9px] font-mono text-[#ffd754] uppercase tracking-wider font-bold">
                            <span className="flex items-center gap-1.5">
                              {quickRead ? (
                                <Zap className="w-3.5 h-3.5 text-[#ffd754] animate-bounce" />
                              ) : (
                                <Globe className="w-3.5 h-3.5 text-[#ffd754] animate-spin" />
                              )}
                              {quickRead 
                                ? "Gemini Synthesizing Quick Read Summary..." 
                                : "Gemini Analyzing Statutes & Precedents..."}
                            </span>
                            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                          </div>
                          <p className="text-[10px] text-gray-300 font-sans">
                            {quickRead 
                              ? "Compiling instant high-level verdict, essential constitutional rights, and immediate verbal script..." 
                              : "Cross-referencing constitutional Articles, BNSS/CrPC procedural sections, and Supreme Court guidelines..."}
                          </p>
                        </motion.div>
                      )}
                    </div>

                    {/* Mode Switcher & Quick Inquiry Prompts Carousel */}
                    <div className="px-3 py-1.5 bg-[#001233]/85 border-t border-[#d4af37]/15 flex items-center justify-between gap-2 text-[10px]">
                      <div className="flex items-center gap-2 shrink-0">
                        <button
                          id="quick-read-inline-toggle"
                          type="button"
                          onClick={toggleQuickRead}
                          className={`flex items-center gap-1.5 px-2.5 py-1 rounded text-[9px] font-mono font-bold transition-all cursor-pointer border ${
                            quickRead
                              ? "bg-[#ffd754] text-[#001233] border-[#ffd754] shadow-[0_0_8px_rgba(255,215,84,0.3)]"
                              : "bg-[#001a4d] text-gray-400 border-[#d4af37]/20 hover:text-white hover:border-[#d4af37]/50"
                          }`}
                          title="Toggle Quick Read: Condensed summaries vs detailed legal responses"
                        >
                          <Zap className={`w-3 h-3 ${quickRead ? "text-[#001233] fill-current" : "text-[#ffd754]"}`} />
                          <span>Quick Read</span>
                          <span className={`text-[7.5px] px-1 py-0.2 rounded font-sans uppercase font-bold ${
                            quickRead ? "bg-[#001233] text-[#ffd754]" : "bg-[#001233] text-gray-400"
                          }`}>
                            {quickRead ? "ON" : "OFF"}
                          </span>
                        </button>
                        <span className="text-[8.5px] font-mono text-gray-400 hidden sm:inline">
                          {quickRead ? "⚡ Brief Mode Active" : "📚 Detailed Mode Active"}
                        </span>
                      </div>

                      <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar select-none py-0.5">
                        <span className="text-[8px] font-mono text-[#d4af37] shrink-0 uppercase tracking-wider font-bold">Quick:</span>
                        {QUICK_PROMPTS.map((qp, qpIdx) => (
                          <button
                            key={qpIdx}
                            onClick={() => handleSubmit(undefined, qp.text)}
                            disabled={loading}
                            className="shrink-0 text-[9px] font-mono px-2 py-0.5 bg-[#001a4d] hover:bg-[#d4af37] text-gray-300 hover:text-[#001233] border border-[#d4af37]/20 rounded-full transition-all cursor-pointer whitespace-nowrap active:scale-95 disabled:opacity-50"
                          >
                            {qp.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Form input */}
                    <form 
                      onSubmit={(e) => handleSubmit(e)}
                      className="p-2.5 border-t border-[#d4af37]/15 bg-[#001233]/95 flex gap-2 items-center"
                    >
                      <input
                        type="text"
                        value={messageText}
                        onChange={(e) => setMessageText(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" && !e.shiftKey) {
                            e.preventDefault();
                            handleSubmit();
                          }
                        }}
                        placeholder="Ask any legal question (e.g., traffic stops, police rights, RTI, tenant law)..."
                        disabled={loading}
                        className="flex-1 px-3.5 py-2 text-xs rounded-sm border border-gray-800 focus:border-[#d4af37] focus:outline-none text-white bg-[#001a4d] placeholder-gray-500 font-sans disabled:opacity-50"
                      />
                      <motion.button
                        type="submit"
                        disabled={!messageText.trim() || loading}
                        whileHover={{ scale: 1.04 }}
                        whileTap={{ scale: 0.96 }}
                        className="p-2 px-3.5 bg-[#d4af37] hover:bg-[#bca032] disabled:bg-[#002366]/40 text-[#001233] font-bold rounded-sm transition-all cursor-pointer flex items-center gap-1.5 shrink-0 text-xs shadow-sm disabled:cursor-not-allowed"
                      >
                        <span>Send</span>
                        <Send className="w-3.5 h-3.5" />
                      </motion.button>
                    </form>
                  </motion.div>
                )}

                {activeTab === 'directory' && (
                  <motion.div 
                    key="directory-tab"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="flex-1 p-4 overflow-y-auto space-y-4 flex flex-col min-h-0 text-left"
                  >
                    {/* Search Field */}
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Filter compiled community precedents..."
                      className="w-full px-3.5 py-2 text-xs rounded-sm border border-gray-800 focus:border-[#d4af37] focus:outline-none text-white bg-[#001233]/90 placeholder-gray-500 shrink-0 font-mono text-[10px] tracking-wider uppercase"
                    />

                    <div className="flex-1 overflow-y-auto space-y-3.5 min-h-0 pr-1">
                      <AnimatePresence mode="popLayout">
                        {filteredDirectory.length === 0 ? (
                          <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-center py-12"
                          >
                            <BadgeHelp className="w-8 h-8 text-[#d4af37]/20 mx-auto mb-2" />
                            <p className="text-xs text-gray-500 font-mono font-light">NO VERIFIED PUBLIC PRECEDENTS</p>
                          </motion.div>
                        ) : (
                          filteredDirectory.map((q, qidx) => (
                            <motion.div 
                              key={q.id} 
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, scale: 0.96 }}
                              transition={{ duration: 0.25, delay: Math.min(qidx * 0.04, 0.2) }}
                              className="p-3.5 rounded-sm border border-[#d4af37]/15 bg-[#001233]/80 space-y-2.5 hover:border-[#d4af37]/40 transition-all"
                            >
                              <div className="flex items-start gap-2.5">
                                <span className="text-[8px] font-mono uppercase font-bold bg-[#d4af37]/15 text-[#d4af37] px-1.5 py-0.5 rounded-sm shrink-0 leading-none">QUERY</span>
                                <p className="text-xs text-white font-medium leading-relaxed font-sans">{q.text}</p>
                              </div>
                              <div className="border-t border-[#d4af37]/10 pt-2 flex items-start gap-2.5">
                                <span className="text-[8px] font-mono uppercase font-bold bg-[#002366] text-blue-200 px-1.5 py-0.5 rounded-sm shrink-0 mt-0.5 leading-none">REPLY</span>
                                <div className="space-y-1">
                                  <p className="text-xs text-gray-300 leading-relaxed font-sans font-light">{q.answer}</p>
                                  <p className="text-[8px] font-mono text-gray-500 uppercase tracking-widest">TRANSMITTED BY: {q.repliedBy || 'Sovereign Staff'}</p>
                                </div>
                              </div>
                            </motion.div>
                          ))
                        )}
                      </AnimatePresence>
                    </div>
                  </motion.div>
                )}

                {activeTab === 'resources' && (
                  <motion.div 
                    key="resources-tab"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="flex-1 p-4 overflow-y-auto space-y-3.5 flex flex-col min-h-0 text-left"
                  >
                    <div className="p-3 rounded-sm bg-[#d4af37]/5 border border-[#d4af37]/15 text-[10px] text-gray-200 leading-relaxed flex items-start gap-2.5">
                      <HelpCircle className="w-4 h-4 text-[#d4af37] shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-[#d4af37] block font-mono mb-0.5">SOVEREIGN_TOOLKIT</strong>
                        These formal templates and PDF handbooks can be used to object to administrative actions and demand public accountability copies.
                      </div>
                    </div>

                    {/* Expandable Form to Add Resource */}
                    <div className="border border-[#d4af37]/15 rounded-sm overflow-hidden bg-[#001233]/40">
                      <button
                        onClick={() => setShowAddForm(!showAddForm)}
                        className="w-full flex items-center justify-between p-3 text-xs font-mono uppercase tracking-wider text-[#d4af37] bg-[#d4af37]/5 hover:bg-[#d4af37]/10 transition-all font-bold"
                      >
                        <div className="flex items-center gap-1.5">
                          <Plus className="w-3.5 h-3.5" />
                          <span>Add Legal Resource</span>
                        </div>
                        {showAddForm ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                      </button>

                      {showAddForm && (
                        <form onSubmit={handleAddResource} className="p-3.5 space-y-3 border-t border-[#d4af37]/15 text-left bg-black/60">
                          <div className="space-y-1">
                            <label className="block text-[8px] font-mono text-gray-400 uppercase tracking-wider font-semibold">Resource Title</label>
                            <input
                              type="text"
                              value={resTitle}
                              onChange={(e) => setResTitle(e.target.value)}
                              placeholder="e.g., California Court Fee Waiver Form"
                              className="w-full px-2.5 py-1.5 text-xs bg-[#000a1a] border border-gray-800 focus:border-[#d4af37] text-white focus:outline-none rounded-sm font-sans"
                              required
                            />
                          </div>

                          <div className="space-y-1">
                            <label className="block text-[8px] font-mono text-gray-400 uppercase tracking-wider font-semibold">Description</label>
                            <textarea
                              value={resDesc}
                              onChange={(e) => setResDesc(e.target.value)}
                              placeholder="Describe how this resource helps in litigation..."
                              rows={2}
                              className="w-full px-2.5 py-1.5 text-xs bg-[#000a1a] border border-gray-800 focus:border-[#d4af37] text-white focus:outline-none rounded-sm font-sans resize-none"
                            />
                          </div>

                          <div className="grid grid-cols-2 gap-2.5">
                            <div className="space-y-1">
                              <label className="block text-[8px] font-mono text-gray-400 uppercase tracking-wider font-semibold">Resource Type</label>
                              <select
                                value={resType}
                                onChange={(e) => setResType(e.target.value as any)}
                                className="w-full px-2.5 py-1.5 text-xs bg-[#000a1a] border border-gray-800 focus:border-[#d4af37] text-white focus:outline-none rounded-sm font-sans"
                              >
                                <option value="pdf">PDF Document</option>
                                <option value="video">Video Tutorial</option>
                                <option value="spreadsheet">Spreadsheet Sheet</option>
                                <option value="text">Text Material</option>
                              </select>
                            </div>

                            <div className="space-y-1">
                              <label className="block text-[8px] font-mono text-gray-400 uppercase tracking-wider font-semibold">Input Method</label>
                              <select
                                value={resMethod}
                                onChange={(e) => setResMethod(e.target.value as any)}
                                className="w-full px-2.5 py-1.5 text-xs bg-[#000a1a] border border-gray-800 focus:border-[#d4af37] text-white focus:outline-none rounded-sm font-sans"
                              >
                                <option value="link">Web Link / URL</option>
                                <option value="file">Local Device File</option>
                              </select>
                            </div>
                          </div>

                          {resMethod === 'link' ? (
                            <div className="space-y-1">
                              <label className="block text-[8px] font-mono text-gray-400 uppercase tracking-wider font-semibold">Resource URL Link</label>
                              <div className="relative">
                                <Link2 className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-500" />
                                <input
                                  type="url"
                                  value={resUrl}
                                  onChange={(e) => setResUrl(e.target.value)}
                                  placeholder="https://example.com/document.pdf"
                                  className="w-full pl-8 pr-2.5 py-1.5 text-xs bg-[#000a1a] border border-gray-800 focus:border-[#d4af37] text-white focus:outline-none rounded-sm font-sans"
                                  required={resMethod === 'link'}
                                />
                              </div>
                            </div>
                          ) : (
                            <div className="space-y-1">
                              <label className="block text-[8px] font-mono text-gray-400 uppercase tracking-wider font-semibold">Upload File</label>
                              <div className="flex items-center gap-2">
                                <label className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 border border-dashed border-gray-800 hover:border-[#d4af37] bg-[#000a1a] text-gray-400 hover:text-white rounded-sm text-xs cursor-pointer transition-all">
                                  <UploadCloud className="w-4 h-4 text-[#d4af37]" />
                                  <span className="truncate">{resFile ? resFile.name : "Choose File..."}</span>
                                  <input
                                    type="file"
                                    onChange={(e) => setResFile(e.target.files?.[0] || null)}
                                    className="hidden"
                                    required={resMethod === 'file'}
                                  />
                                </label>
                              </div>
                            </div>
                          )}

                          {resStatus && (
                            <p className="text-[9px] font-mono text-center text-[#ffd754] animate-pulse py-0.5">{resStatus}</p>
                          )}

                          <button
                            type="submit"
                            disabled={isSubmittingRes}
                            className="w-full py-2 bg-[#d4af37] hover:bg-[#ffd754] disabled:bg-gray-700 text-black font-mono font-bold uppercase text-[10px] tracking-widest rounded-sm transition-all cursor-pointer flex items-center justify-center gap-1.5"
                          >
                            {isSubmittingRes ? (
                              <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                            ) : (
                              <CheckCircle2 className="w-3.5 h-3.5" />
                            )}
                            <span>{isSubmittingRes ? "Compiling..." : "Register Resource"}</span>
                          </button>
                        </form>
                      )}
                    </div>

                    <div className="space-y-2.5 flex-1 overflow-y-auto pr-1">
                      {/* Merged Resources Loop */}
                      {[
                        ...evidence.map(ev => ({
                          id: ev.id,
                          title: ev.title,
                          desc: ev.description,
                          type: ev.type === "pdf" ? "PDF Handbook" : ev.type === "video" ? "Video Tutorial" : ev.type === "spreadsheet" ? "Spreadsheet Sheet" : "Text Material",
                          size: ev.fileSize || "Dynamic",
                          fileUrl: ev.fileUrl,
                          isStatic: false
                        })),
                        ...SOVEREIGN_RESOURCES.map((r, i) => ({
                          id: `static_${i}`,
                          title: r.title,
                          desc: r.desc,
                          type: r.type,
                          size: r.size,
                          fileUrl: "",
                          isStatic: true
                        }))
                      ].map((resource, index) => (
                        <div 
                          key={resource.id}
                          className="p-3.5 bg-black/40 border border-gray-800/80 rounded-sm hover:border-[#d4af37]/35 hover:bg-black/60 transition-all flex flex-col justify-between"
                        >
                          <div className="flex items-start justify-between gap-3 mb-1.5">
                            <div>
                              <span className="font-mono text-[7.5px] uppercase tracking-wider text-[#d4af37] font-bold block mb-0.5">
                                RESOURCE_DOC_0{index + 1} {!resource.isStatic && "• CITIZEN CONTRIBUTION"}
                              </span>
                              <h4 className="text-xs font-semibold text-white leading-tight font-serif tracking-wide">
                                {resource.title}
                              </h4>
                            </div>
                            <span className="text-[7.5px] font-mono bg-gray-800 text-gray-400 px-1.5 py-0.5 rounded-sm uppercase font-bold tracking-wider shrink-0">
                              {resource.size}
                            </span>
                          </div>

                          <p className="text-[10px] text-gray-400 font-light leading-relaxed mb-3 font-sans">
                            {resource.desc}
                          </p>

                          <div className="flex items-center justify-between border-t border-gray-800/60 pt-2.5">
                            <span className="text-[9px] font-mono text-gray-500 uppercase font-medium">
                              {resource.type}
                            </span>
                            {resource.isStatic ? (
                              <button
                                onClick={() => {
                                  // Elegant self-contained alert using standard state warning or styled visual feedback
                                  alert(`Initiating download protocol for pre-loaded template: "${resource.title}". Sourced successfully.`);
                                }}
                                className="px-3 py-1 rounded-sm bg-[#d4af37]/10 hover:bg-[#d4af37] border border-[#d4af37]/25 hover:border-transparent text-[#d4af37] hover:text-[#001233] text-[9px] font-mono uppercase font-bold tracking-wider transition-all flex items-center gap-1 cursor-pointer"
                              >
                                <Download className="w-3 h-3" /> Download Template
                              </button>
                            ) : (
                              <a
                                href={resource.fileUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                referrerPolicy="no-referrer"
                                className="px-3 py-1 rounded-sm bg-[#d4af37]/20 hover:bg-[#d4af37] border border-[#d4af37]/35 hover:border-transparent text-[#d4af37] hover:text-[#001233] text-[9px] font-mono uppercase font-bold tracking-wider transition-all flex items-center gap-1 cursor-pointer"
                              >
                                <Download className="w-3 h-3" /> Download Material
                              </a>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
