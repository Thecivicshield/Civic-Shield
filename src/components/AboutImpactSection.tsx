import React, { useState } from "react";
import { 
  Shield, 
  Users, 
  Award, 
  FileCheck2, 
  Landmark, 
  Building, 
  Mail, 
  ExternalLink, 
  MessageSquare, 
  CheckCircle2, 
  Sparkles, 
  Send, 
  Heart,
  Share2,
  AlertCircle
} from "lucide-react";
import { BlogPost, VisitorMetrics, SocialPost } from "../types";

interface AboutImpactSectionProps {
  stats?: VisitorMetrics;
  posts?: BlogPost[];
  socialPosts?: SocialPost[];
  isAdmin?: boolean;
  onUpdateStats?: (nextStats: Partial<VisitorMetrics>) => Promise<void>;
  onSubscribe?: (email: string) => Promise<{ success: boolean; message: string }>;
  onAddComment?: (postId: string, comment: { author: string; text: string }) => Promise<void>;
  onOpenBookModal?: (volume: "rights" | "goals" | "mission", chapterIndex?: number) => void;
  accentColor?: string;
}

export default function AboutImpactSection({
  stats,
  posts = [],
  socialPosts = [],
  isAdmin = false,
  onUpdateStats,
  onSubscribe,
  onAddComment,
  onOpenBookModal,
  accentColor = "#d4af37"
}: AboutImpactSectionProps) {
  const [emailInput, setEmailInput] = useState("");
  const [subscribing, setSubscribing] = useState(false);
  const [subscribedMsg, setSubscribedMsg] = useState(false);
  const [subError, setSubError] = useState<string | null>(null);

  // Active blog modal / expanded state
  const [readingPost, setReadingPost] = useState<BlogPost | null>(null);
  const [commentAuthor, setCommentAuthor] = useState("");
  const [commentText, setCommentText] = useState("");
  const [submittingComment, setSubmittingComment] = useState(false);

  const handleSubscribeSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailInput || !emailInput.includes("@")) {
      setSubError("Please enter a valid email address.");
      return;
    }
    setSubscribing(true);
    setSubError(null);
    try {
      if (onSubscribe) {
        await onSubscribe(emailInput.trim());
      }
      setSubscribedMsg(true);
      setEmailInput("");
    } catch (err: any) {
      setSubError(err.message || "Failed to subscribe. Please try again.");
    } finally {
      setSubscribing(false);
    }
  };

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!readingPost || !commentText.trim()) return;
    setSubmittingComment(true);
    try {
      if (onAddComment) {
        await onAddComment(readingPost.id, {
          author: commentAuthor.trim() || "Anonymous Citizen",
          text: commentText.trim()
        });
        setCommentText("");
        setCommentAuthor("");
      }
    } catch (err: any) {
      alert("Failed to post comment: " + err.message);
    } finally {
      setSubmittingComment(false);
    }
  };

  const metricCards = [
    { label: "Citizens Empowered", value: stats?.totalVisitors || 14894, suffix: "+" },
    { label: "Handbooks Distributed", value: stats?.handbookDownloads || 3840, suffix: "" },
    { label: "Templates Deployed", value: stats?.templatesDeployed || 1250, suffix: "" },
    { label: "Districts Empowered", value: stats?.districtsEmpowered || 48, suffix: "" },
    { label: "Consultations & Inquiries", value: stats?.consultationsGiven || 992, suffix: "" }
  ];

  return (
    <section id="about-impact" className="scroll-mt-20 py-12 sm:py-16 bg-[#000c1e] text-white border-b border-[#d4af37]/20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Section Header */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-[#ffd754] text-xs font-mono uppercase tracking-widest">
            <Users className="w-4 h-4 text-[#d4af37]" />
            <span>Section 4 · Mission & Transparency</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white tracking-tight">
            About Civic Shield & Measurable Impact
          </h2>
          <p className="text-sm text-gray-300 font-light max-w-3xl leading-relaxed">
            Our mission is to eliminate fear, democratize procedural awareness, and build a nation where ordinary citizens know their legal armor and exercise their rights with composure.
          </p>
        </div>

        {/* 1. ABOUT CIVIC SHIELD: 2-Column Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          <div className="p-6 rounded-xl bg-[#001433] border border-[#d4af37]/25 space-y-3.5">
            <div className="w-10 h-10 rounded-lg bg-[#d4af37]/15 border border-[#d4af37]/30 flex items-center justify-center text-[#ffd754]">
              <Shield className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-serif font-bold text-white">
              Why Civic Shield Exists
            </h3>
            <p className="text-xs sm:text-sm text-gray-300 font-light leading-relaxed">
              When ordinary citizens interact with administrative or police authorities, anxiety and panic stem from procedural blindness—not knowing what officers are lawfully authorized to do and where constitutional limits lie. 
              Civic Shield demystifies criminal procedure and statutory safeguards so citizens can stand on their rights without confrontation.
            </p>
            <div className="pt-2 flex items-center gap-2 text-xs font-mono text-[#ffd754]">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>Strictly Non-Partisan & Open Legal Education</span>
            </div>
          </div>

          <div className="p-6 rounded-xl bg-[#001433] border border-[#d4af37]/25 space-y-3.5">
            <div className="w-10 h-10 rounded-lg bg-[#d4af37]/15 border border-[#d4af37]/30 flex items-center justify-center text-[#ffd754]">
              <Landmark className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-serif font-bold text-white">
              Constitutional Foundation
            </h3>
            <p className="text-xs sm:text-sm text-gray-300 font-light leading-relaxed">
              Every guide, script, and template published on Civic Shield is rooted in the Constitution of India, landmark Supreme Court of India precedents, and statutory enactments including the Motor Vehicles Act, RTI Act, and Advocates Act. We do not provide informal hacks; we provide certified law.
            </p>
            <div className="pt-2 flex items-center gap-2 text-xs font-mono text-[#ffd754]">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>Verified Supreme Court Precedents</span>
            </div>
          </div>

        </div>

        {/* 2. MEASURABLE IMPACT METRICS STRIP */}
        <div className="space-y-4">
          <div className="border-b border-[#d4af37]/20 pb-2">
            <span className="text-[11px] font-mono uppercase tracking-widest text-[#d4af37]">
              Audited Civic Progress
            </span>
            <h3 className="text-xl font-serif font-bold text-white">
              Measurable Outcomes & Community Reach
            </h3>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5">
            {metricCards.map((m, i) => (
              <div 
                key={i}
                className="p-4 rounded-xl bg-[#001433]/80 border border-[#d4af37]/20 text-center space-y-1 hover:border-[#d4af37]/50 transition-colors"
              >
                <div className="text-2xl sm:text-3xl font-serif font-bold text-[#ffd754] font-mono tabular-nums">
                  {m.value.toLocaleString()}{m.suffix}
                </div>
                <div className="text-[11px] font-mono text-gray-300 uppercase tracking-wider">
                  {m.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 3. CAMPAIGN DISPATCHES / ARTICLES */}
        <div className="space-y-4">
          <div className="border-b border-[#d4af37]/20 pb-2 flex items-center justify-between">
            <div>
              <span className="text-[11px] font-mono uppercase tracking-widest text-[#d4af37]">
                Public Briefs & Updates
              </span>
              <h3 className="text-xl font-serif font-bold text-white">
                Campaign Dispatches & Articles
              </h3>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {posts.map((post) => (
              <div
                key={post.id}
                className="p-5 rounded-xl bg-[#001433] border border-[#d4af37]/25 flex flex-col justify-between space-y-3"
              >
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-xs text-gray-400 font-mono">
                    <span>{post.date}</span>
                    <span aria-hidden="true">·</span>
                    <span className="text-[#ffd754]">{post.author}</span>
                  </div>
                  <h4 className="text-base font-serif font-bold text-white">
                    {post.title}
                  </h4>
                  <p className="text-xs text-gray-300 font-light leading-relaxed line-clamp-3">
                    {post.content}
                  </p>
                </div>

                <div className="pt-2 flex items-center justify-between">
                  <button
                    onClick={() => setReadingPost(post)}
                    className="text-xs font-mono text-[#ffd754] hover:text-white flex items-center gap-1 font-semibold"
                  >
                    <span>Read full article</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </button>
                  <span className="text-xs font-mono text-gray-400">
                    {post.comments?.length || 0} comments
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 4. SOCIAL STREAM BROADCAST */}
        {socialPosts.length > 0 && (
          <div className="space-y-4">
            <div className="border-b border-[#d4af37]/20 pb-2">
              <span className="text-[11px] font-mono uppercase tracking-widest text-[#d4af37]">
                Live Community Awareness
              </span>
              <h3 className="text-xl font-serif font-bold text-white">
                Social Stream & Civic Advisories
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {socialPosts.slice(0, 3).map((sp) => (
                <div
                  key={sp.id}
                  className="p-4 rounded-xl bg-[#001433] border border-[#d4af37]/20 space-y-2.5 flex flex-col justify-between text-xs"
                >
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between text-gray-400 font-mono text-[11px]">
                      <span className="text-[#ffd754] uppercase font-bold">{sp.platform}</span>
                      <span>{sp.timestamp}</span>
                    </div>
                    <div className="font-semibold text-white">{sp.username}</div>
                    <p className="text-gray-300 font-light leading-relaxed line-clamp-4">
                      {sp.content}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-[#d4af37]/10 flex items-center justify-between text-[11px] text-gray-400 font-mono">
                    <span>❤️ {sp.likes}</span>
                    <span>🔄 {sp.shares}</span>
                    <span>💬 {sp.comments}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 5. NEWSLETTER PLEDGE SUBSCRIPTION */}
        <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-[#001433] via-[#001d4a] to-[#001433] border border-[#d4af37]/35 space-y-4 text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#d4af37]/15 border border-[#d4af37]/30 text-[#ffd754] text-xs font-mono uppercase tracking-wider">
            <Mail className="w-3.5 h-3.5" />
            <span>Civic Shield Weekly Legal Brief</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-serif font-bold text-white">
            Stay Prepared With Verified Citizen Updates
          </h3>
          <p className="text-xs sm:text-sm text-gray-300 font-light max-w-xl mx-auto leading-relaxed">
            Join over 1,480 citizens receiving our monthly procedural digests, high court precedents, and printable legal defense templates. No spam, ever.
          </p>

          {subscribedMsg ? (
            <div className="p-3.5 rounded-lg bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-mono flex items-center justify-center gap-2 max-w-md mx-auto">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>You're subscribed! Thank you for standing with the Civic Shield alliance.</span>
            </div>
          ) : (
            <form onSubmit={handleSubscribeSubmit} className="flex flex-col sm:flex-row items-center justify-center gap-2 max-w-md mx-auto pt-1">
              <input
                type="email"
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                placeholder="Enter your email address..."
                className="w-full sm:flex-1 px-3.5 py-2.5 bg-[#000a1c] border border-[#d4af37]/30 rounded-lg text-xs text-white placeholder-gray-400 outline-none focus:border-[#d4af37]"
              />
              <button
                type="submit"
                disabled={subscribing}
                className="w-full sm:w-auto px-5 py-2.5 rounded-lg bg-gradient-to-r from-[#d4af37] to-[#b89423] text-[#001233] font-mono font-bold text-xs uppercase hover:brightness-110 disabled:opacity-50 transition-all shrink-0 cursor-pointer shadow-md"
              >
                {subscribing ? "Subscribing..." : "Subscribe"}
              </button>
            </form>
          )}

          {subError && (
            <p className="text-xs text-red-400 font-mono">{subError}</p>
          )}
        </div>

      </div>

      {/* FULL POST READING MODAL */}
      {readingPost && (
        <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="w-full max-w-2xl bg-[#001233] border border-[#d4af37]/40 rounded-xl p-6 shadow-2xl space-y-4 max-h-[85vh] overflow-y-auto">
            <div className="flex items-start justify-between border-b border-[#d4af37]/20 pb-3">
              <div className="space-y-1">
                <div className="text-xs font-mono text-[#ffd754]">
                  {readingPost.date} · {readingPost.author}
                </div>
                <h3 className="text-xl font-serif font-bold text-white">
                  {readingPost.title}
                </h3>
              </div>
              <button
                onClick={() => setReadingPost(null)}
                className="p-1 rounded text-gray-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <div className="text-sm text-gray-200 font-light leading-relaxed whitespace-pre-line">
              {readingPost.content}
            </div>

            {/* Comments List */}
            <div className="border-t border-[#d4af37]/20 pt-4 space-y-3">
              <h4 className="text-xs font-mono uppercase tracking-wider text-[#ffd754] font-semibold">
                Citizen Dialogue ({readingPost.comments?.length || 0})
              </h4>

              {readingPost.comments && readingPost.comments.length > 0 ? (
                <div className="space-y-2">
                  {readingPost.comments.map((c) => (
                    <div key={c.id} className="p-3 rounded-lg bg-[#000a1c] border border-gray-800 text-xs space-y-1">
                      <div className="flex items-center justify-between text-gray-400 font-mono">
                        <span className="text-[#ffd754] font-medium">{c.author}</span>
                        <span>{c.date}</span>
                      </div>
                      <p className="text-gray-300 font-light">{c.text}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-gray-400 italic">No comments yet. Share your thoughts below.</p>
              )}

              {/* Add Comment Form */}
              <form onSubmit={handleCommentSubmit} className="space-y-2 pt-2">
                <input
                  type="text"
                  value={commentAuthor}
                  onChange={(e) => setCommentAuthor(e.target.value)}
                  placeholder="Your Name (optional)..."
                  className="w-full px-3 py-1.5 bg-[#000a1c] border border-[#d4af37]/30 rounded-lg text-xs text-white placeholder-gray-500 outline-none"
                />
                <textarea
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  placeholder="Leave a comment or question..."
                  rows={2}
                  className="w-full px-3 py-1.5 bg-[#000a1c] border border-[#d4af37]/30 rounded-lg text-xs text-white placeholder-gray-500 outline-none"
                />
                <div className="flex justify-end">
                  <button
                    type="submit"
                    disabled={submittingComment || !commentText.trim()}
                    className="px-3.5 py-1.5 rounded-lg bg-[#d4af37] text-[#001233] font-mono font-bold text-xs uppercase hover:brightness-110 disabled:opacity-50"
                  >
                    {submittingComment ? "Posting..." : "Post Comment"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
