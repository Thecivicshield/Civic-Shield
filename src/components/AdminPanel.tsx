import React, { useState, useEffect } from "react";
import { 
  ArrowUp, ArrowDown, Eye, EyeOff, Layout, FileUp, ShieldAlert,
  Users, HelpCircle, Check, FileCheck, Trash2, Mail, Sparkles, Download, Copy,
  Github, RefreshCw, LogOut, CheckCircle2, AlertTriangle, Key, BookOpen, Scale,
  FileText, Shield, Plus, Edit2, CheckCircle, Search, Star, ExternalLink, Lock,
  ClipboardCopy, ClipboardCheck, Code2, FileCode, CheckSquare, FileJson, Globe
} from "lucide-react";
import { 
  LayoutBlock, BlogPost, AnonymousQuestion, NewsletterSub, SocialPost, 
  SentNewsletter, NotificationLog, EvidenceItem, VisitorMetrics, Statute, CaseFile, BookReview,
  CivicShieldData
} from "../types";
import { getAutonomousLegalResponse } from "../utils/legalAdvisor";

interface AdminPanelProps {
  blocks: LayoutBlock[];
  subscribers: NewsletterSub[];
  questions: AnonymousQuestion[];
  socialPosts: SocialPost[];
  newsletters: SentNewsletter[];
  notificationLogs?: NotificationLog[];
  evidence: EvidenceItem[];
  visitorStats?: VisitorMetrics;
  statutes?: Statute[];
  myths?: Array<{ question: string; myth: string; answerOnTrue: string }>;
  caseFiles?: CaseFile[];
  bookReviews?: BookReview[];
  masterPasscode?: string;
  fullData?: CivicShieldData | null;
  onRestoreFullData?: (restoredData: CivicShieldData) => void;
  onUpdateVisitorStats?: (updated: VisitorMetrics) => void;
  onSaveBlocks: (newBlocks: LayoutBlock[]) => Promise<void>;
  onAddBlogPost: (title: string, content: string, author: string, imageUrl: string) => Promise<void>;
  onUploadFile: (payload: {
    fileName: string;
    fileType: string;
    fileData: string;
    title: string;
    description: string;
    verifiedBy: string;
  }) => Promise<void>;
  onAnswerQuestion: (id: string, answer: string, repliedBy: string, isPublic: boolean) => Promise<void>;
  onDeleteQuestion: (id: string) => Promise<void>;
  onAddSocialPost: (platform: "twitter" | "facebook" | "linkedin" | "instagram" | "youtube", content: string, imageUrl?: string) => Promise<void>;
  onDeleteSocialPost: (id: string) => Promise<void>;
  onSendNewsletter: (subject: string, badge: string, body: string) => Promise<string>;
  onAddSubscriber: (email: string) => Promise<{ success: boolean; message: string }>;
  onDeleteSubscriber: (id: string) => Promise<void>;
  onDeleteEvidence: (id: string) => Promise<void>;
  onUpdateEvidence: (id: string, updatedFields: Partial<EvidenceItem>) => Promise<void>;
  onUpdateStatutes?: (statutes: Statute[]) => void;
  onUpdateMyths?: (myths: Array<{ question: string; myth: string; answerOnTrue: string }>) => void;
  onUpdateCaseFiles?: (caseFiles: CaseFile[]) => void;
  onUpdateBookReviews?: (reviews: BookReview[]) => void;
  onUpdatePasscode?: (code: string) => Promise<void>;
  accentColor: string;
}

type TabType = 'layout' | 'statutes' | 'myths' | 'cases' | 'book' | 'impact' | 'ai_chat' | 'upload' | 'blog' | 'social' | 'newsletters' | 'subs' | 'mails' | 'passcode' | 'backup';

export default function AdminPanel({
  blocks,
  subscribers,
  questions,
  socialPosts,
  newsletters,
  notificationLogs = [],
  evidence = [],
  visitorStats,
  statutes = [],
  myths = [],
  caseFiles = [],
  bookReviews = [],
  masterPasscode = "lol12ymn",
  fullData = null,
  onRestoreFullData,
  onUpdateVisitorStats,
  onSaveBlocks,
  onAddBlogPost,
  onUploadFile,
  onAnswerQuestion,
  onDeleteQuestion,
  onAddSocialPost,
  onDeleteSocialPost,
  onSendNewsletter,
  onAddSubscriber,
  onDeleteSubscriber,
  onDeleteEvidence,
  onUpdateEvidence,
  onUpdateStatutes,
  onUpdateMyths,
  onUpdateCaseFiles,
  onUpdateBookReviews,
  onUpdatePasscode,
  accentColor
}: AdminPanelProps) {
  const [activeTab, setActiveTab] = useState<TabType>('layout');

  // Stats edit form
  const [adminStatsForm, setAdminStatsForm] = useState<VisitorMetrics>(() => ({
    totalVisitors: visitorStats?.totalVisitors || 14892,
    handbookDownloads: visitorStats?.handbookDownloads || 3840,
    templatesDeployed: visitorStats?.templatesDeployed || 1250,
    districtsEmpowered: visitorStats?.districtsEmpowered || 48,
    consultationsGiven: visitorStats?.consultationsGiven || 980
  }));
  const [statsSaveStatus, setStatsSaveStatus] = useState<string | null>(null);

  React.useEffect(() => {
    if (visitorStats) {
      setAdminStatsForm({
        totalVisitors: visitorStats.totalVisitors,
        handbookDownloads: visitorStats.handbookDownloads,
        templatesDeployed: visitorStats.templatesDeployed,
        districtsEmpowered: visitorStats.districtsEmpowered,
        consultationsGiven: visitorStats.consultationsGiven
      });
    }
  }, [visitorStats]);

  const handleSaveAdminStats = (e: React.FormEvent) => {
    e.preventDefault();
    if (onUpdateVisitorStats) {
      onUpdateVisitorStats(adminStatsForm);
      setStatsSaveStatus("✓ Public impact & visitor metrics updated successfully!");
      setTimeout(() => setStatsSaveStatus(null), 4000);
    }
  };

  // Statute Management states
  const [statuteSearch, setStatuteSearch] = useState("");
  const [editingStatuteId, setEditingStatuteId] = useState<string | null>(null);
  const [newStatute, setNewStatute] = useState<Partial<Statute>>({
    title: "",
    citation: "",
    category: "Fundamental Rights",
    description: "",
    keyPoints: [""],
    relevance: ""
  });
  const [statuteStatus, setStatuteStatus] = useState<string | null>(null);

  // Myth Management states
  const [editingMythIndex, setEditingMythIndex] = useState<number | null>(null);
  const [newMyth, setNewMyth] = useState({
    question: "",
    myth: "",
    answerOnTrue: ""
  });
  const [mythStatus, setMythStatus] = useState<string | null>(null);

  // Case Files Management states
  const [editingCaseId, setEditingCaseId] = useState<string | null>(null);
  const [newCase, setNewCase] = useState<Partial<CaseFile>>({
    caseNumber: "",
    title: "",
    category: "Constitutional Precedents",
    status: "precedent",
    description: "",
    type: "pdf",
    fileName: "Judgement_Record.pdf",
    fileUrl: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80&w=800",
    fileSize: "1.2 MB",
    verifiedBy: "Civic Legal Research Desk"
  });
  const [caseStatus, setCaseStatus] = useState<string | null>(null);

  // Book Reviews Management states
  const [newReview, setNewReview] = useState({
    reviewerName: "",
    rating: 5,
    reviewText: "",
    chapterTitle: "Chapter I: The Sovereign Citizen"
  });
  const [reviewStatus, setReviewStatus] = useState<string | null>(null);

  // Passcode Security state
  const [newPasscode, setNewPasscode] = useState(masterPasscode);
  const [passcodeStatus, setPasscodeStatus] = useState<string | null>(null);

  // AI Prompt Testing State
  const [testAiPrompt, setTestAiPrompt] = useState("");
  const [testAiResponse, setTestAiResponse] = useState<string | null>(null);
  const [testAiSources, setTestAiSources] = useState<Array<{ title: string; url: string }>>([]);
  const [testAiModel, setTestAiModel] = useState<string | null>(null);
  const [isTestingAi, setIsTestingAi] = useState(false);

  // Social feed states
  const [socialPlatform, setSocialPlatform] = useState<"twitter" | "instagram" | "facebook" | "linkedin" | "youtube">("twitter");
  const [socialContent, setSocialContent] = useState("");
  const [socialImageUrl, setSocialImageUrl] = useState("");
  const [socialStatus, setSocialStatus] = useState<string | null>(null);

  // Newsletter broadcast states
  const [newsSubject, setNewsSubject] = useState("");
  const [newsBadge, setNewsBadge] = useState("Campaign Bulletin");
  const [newsBody, setNewsBody] = useState("");
  const [newsStatus, setNewsStatus] = useState<string | null>(null);
  const [isSendingNews, setIsSendingNews] = useState(false);

  // Subscriber management states
  const [newSubEmail, setNewSubEmail] = useState("");
  const [subAddStatus, setSubAddStatus] = useState<string | null>(null);
  const [isAddingSub, setIsAddingSub] = useState(false);
  
  // Blog form states
  const [blogTitle, setBlogTitle] = useState("");
  const [blogAuthor, setBlogAuthor] = useState("");
  const [blogImage, setBlogImage] = useState("");
  const [blogContent, setBlogContent] = useState("");
  const [blogStatus, setBlogStatus] = useState<string | null>(null);

  // Upload states
  const [uploadTitle, setUploadTitle] = useState("");
  const [uploadDesc, setUploadDesc] = useState("");
  const [uploadVerified, setUploadVerified] = useState("Campaign Coordinator");
  const [uploadType, setUploadType] = useState<'pdf' | 'video' | 'spreadsheet' | 'image'>('pdf');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadMethod, setUploadMethod] = useState<'file' | 'link'>('file');
  const [uploadLinkUrl, setUploadLinkUrl] = useState("");
  const [uploadStatus, setUploadStatus] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [editingEvidenceId, setEditingEvidenceId] = useState<string | null>(null);

  // Q&A reply states
  const [replies, setReplies] = useState<{ [qId: string]: string }>({});
  const [replyStatus, setReplyStatus] = useState<{ [qId: string]: string }>({});

  // Layout order drag states
  const [draggedIdx, setDraggedIdx] = useState<number | null>(null);
  const [copySuccess, setCopySuccess] = useState(false);

  // GitHub integration states
  const [gitToken, setGitToken] = useState<string>(() => localStorage.getItem("civic_shield_github_token") || "");
  const [gitUser, setGitUser] = useState<{ username: string; avatarUrl: string } | null>(() => {
    const saved = localStorage.getItem("civic_shield_github_user");
    try {
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });
  const [patInput, setPatInput] = useState("");
  const [gitRepos, setGitRepos] = useState<any[]>([]);
  const [selectedRepo, setSelectedRepo] = useState("");
  const [gitBranch, setGitBranch] = useState("main");
  const [gitPath, setGitPath] = useState("civic_data.json");
  const [gitSyncStatus, setGitSyncStatus] = useState<string | null>(null);
  const [isGitSyncing, setIsGitSyncing] = useState(false);
  const [isFetchingRepos, setIsFetchingRepos] = useState(false);
  const [gitSyncSuccessUrl, setGitSyncSuccessUrl] = useState<string | null>(null);

  // Direct Copy & Paste JSON Importer & Workspace Backups State
  const [pasteJsonText, setPasteJsonText] = useState("");
  const [jsonValidation, setJsonValidation] = useState<{
    valid: boolean;
    message: string;
    details?: string;
  } | null>(null);
  const [isApplyingJson, setIsApplyingJson] = useState(false);
  const [pasteJsonResult, setPasteJsonResult] = useState<{ success: boolean; message: string } | null>(null);
  const [copyJsonSuccess, setCopyJsonSuccess] = useState(false);
  const [serverBackups, setServerBackups] = useState<Array<{
    filename: string;
    sizeKb: string;
    modifiedAt: string;
    summary: string;
    isLatest?: boolean;
  }>>([]);
  const [isLoadingBackups, setIsLoadingBackups] = useState(false);

  // Validate JSON as user types or pastes
  const handlePasteTextChange = (text: string) => {
    setPasteJsonText(text);
    setPasteJsonResult(null);
    if (!text.trim()) {
      setJsonValidation(null);
      return;
    }
    try {
      const parsed = JSON.parse(text);
      if (typeof parsed !== "object" || parsed === null) {
        setJsonValidation({ valid: false, message: "JSON must be a valid JSON object." });
        return;
      }
      const blocksCount = Array.isArray(parsed.blocks) ? parsed.blocks.length : 0;
      const casesCount = Array.isArray(parsed.caseFiles) ? parsed.caseFiles.length : 0;
      const reviewsCount = Array.isArray(parsed.bookReviews) ? parsed.bookReviews.length : 0;
      const subsCount = Array.isArray(parsed.subscribers) ? parsed.subscribers.length : 0;
      const postsCount = Array.isArray(parsed.socialFeed) ? parsed.socialFeed.length : 0;
      const newsCount = Array.isArray(parsed.newsletters) ? parsed.newsletters.length : 0;

      const summaryParts: string[] = [];
      if (blocksCount) summaryParts.push(`${blocksCount} Layout Sections`);
      if (casesCount) summaryParts.push(`${casesCount} Case Files`);
      if (reviewsCount) summaryParts.push(`${reviewsCount} Book Reviews`);
      if (subsCount) summaryParts.push(`${subsCount} Subscribers`);
      if (postsCount) summaryParts.push(`${postsCount} Social Posts`);
      if (newsCount) summaryParts.push(`${newsCount} Newsletters`);

      setJsonValidation({
        valid: true,
        message: "✓ Valid JSON syntax confirmed!",
        details: summaryParts.length > 0 ? summaryParts.join(" • ") : "Custom dataset object ready to apply"
      });
    } catch (err: any) {
      setJsonValidation({
        valid: false,
        message: "Syntax Error: " + err.message
      });
    }
  };

  // Fetch available workspace backups
  const fetchServerBackups = async () => {
    setIsLoadingBackups(true);
    try {
      const res = await fetch("/api/backup-files");
      if (res.ok) {
        const data = await res.json();
        setServerBackups(data.files || []);
      }
    } catch (e) {
      console.warn("Could not fetch server backups:", e);
    } finally {
      setIsLoadingBackups(false);
    }
  };

  useEffect(() => {
    if (activeTab === 'backup') {
      fetchServerBackups();
    }
  }, [activeTab]);

  // Copy full live JSON to clipboard
  const handleCopyLiveJson = () => {
    try {
      const currentSnapshot = fullData || {
        blocks,
        subscribers,
        questions,
        socialPosts,
        newsletters,
        evidence,
        caseFiles,
        bookReviews,
        masterPasscode,
        visitorStats
      };
      const jsonString = JSON.stringify(currentSnapshot, null, 2);
      navigator.clipboard.writeText(jsonString);
      setCopyJsonSuccess(true);
      setTimeout(() => setCopyJsonSuccess(false), 3500);
      if (!pasteJsonText) {
        handlePasteTextChange(jsonString);
      }
    } catch (e) {
      console.error(e);
    }
  };

  // Load a server backup file into the copy-paste box for editing
  const handleLoadBackupToEditor = async (filename: string) => {
    try {
      const res = await fetch(`/api/backup-file-content?filename=${encodeURIComponent(filename)}`);
      if (!res.ok) throw new Error("Could not read backup file");
      const data = await res.json();
      handlePasteTextChange(data.content);
      setPasteJsonResult({ 
        success: true, 
        message: `Loaded '${filename}' into the text box below. You can review, edit, or click 'Apply & Update Website Now'.` 
      });
    } catch (err: any) {
      setPasteJsonResult({ success: false, message: "Error loading backup: " + err.message });
    }
  };

  // 1-Click Restore directly from a backup file
  const handleApplyBackupFileDirectly = async (filename: string) => {
    if (!confirm(`Restore and update website directly from '${filename}'? All changes will take effect live.`)) {
      return;
    }
    setIsApplyingJson(true);
    setPasteJsonResult(null);
    try {
      const res = await fetch("/api/restore-backup-file", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ filename })
      });
      const data = await res.json();
      if (res.ok && data.success) {
        if (onRestoreFullData && data.data) {
          onRestoreFullData(data.data);
        }
        setPasteJsonResult({ 
          success: true, 
          message: `✓ Successfully restored website from '${filename}'! All statutes, cases, reviews, and settings are live.` 
        });
        fetchServerBackups();
      } else {
        throw new Error(data.error || "Server restore failed.");
      }
    } catch (err: any) {
      setPasteJsonResult({ success: false, message: "Restore failed: " + err.message });
    } finally {
      setIsApplyingJson(false);
    }
  };

  // Submit and update website from pasted JSON text
  const handleApplyPastedJson = async () => {
    if (!pasteJsonText.trim()) {
      alert("Please paste valid JSON text into the box first.");
      return;
    }
    try {
      const parsed = JSON.parse(pasteJsonText);
      setIsApplyingJson(true);
      setPasteJsonResult(null);
      const res = await fetch("/api/save-campaign-data", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data: parsed })
      });
      const result = await res.json();
      if (res.ok && result.success) {
        if (onRestoreFullData && result.data) {
          onRestoreFullData(result.data);
        }
        setPasteJsonResult({
          success: true,
          message: "✓ Website successfully updated! All statutes, legal cases, reviews, posts, and layout blocks have been saved and applied."
        });
        fetchServerBackups();
      } else {
        throw new Error(result.error || "Failed to update website.");
      }
    } catch (err: any) {
      setPasteJsonResult({
        success: false,
        message: "Failed to apply JSON: " + err.message
      });
    } finally {
      setIsApplyingJson(false);
    }
  };

  React.useEffect(() => {
    const handleOAuthMessage = (event: MessageEvent) => {
      const origin = event.origin;
      if (!origin.endsWith('.run.app') && !origin.includes('localhost') && !origin.includes('127.0.0.1')) {
        return;
      }
      
      if (event.data?.type === 'OAUTH_AUTH_SUCCESS' && event.data?.provider === 'github') {
        const { token, user } = event.data;
        if (token && user) {
          setGitToken(token);
          setGitUser(user);
          localStorage.setItem("civic_shield_github_token", token);
          localStorage.setItem("civic_shield_github_user", JSON.stringify(user));
          setGitSyncStatus(`Connected to GitHub as ${user.username}!`);
          setTimeout(() => setGitSyncStatus(null), 4000);
          fetchGitHubRepos(token);
        }
      }
    };
    
    window.addEventListener('message', handleOAuthMessage);
    return () => window.removeEventListener('message', handleOAuthMessage);
  }, []);

  React.useEffect(() => {
    if (gitToken) {
      fetchGitHubRepos(gitToken);
    }
  }, [gitToken]);

  const fetchGitHubRepos = async (token: string) => {
    setIsFetchingRepos(true);
    try {
      const res = await fetch(`/api/github/repos?token=${encodeURIComponent(token)}`);
      if (res.ok) {
        const repos = await res.json();
        setGitRepos(repos);
        if (repos.length > 0) {
          setSelectedRepo(repos[0].fullName);
          setGitBranch(repos[0].defaultBranch || "main");
        }
      } else {
        const errData = await res.json();
        console.error("Failed to fetch repos:", errData.error);
      }
    } catch (e) {
      console.error("Fetch repos request failed:", e);
    } finally {
      setIsFetchingRepos(false);
    }
  };

  const handleConnectOAuth = async () => {
    setGitSyncStatus("Requesting GitHub OAuth flow URL...");
    setGitSyncSuccessUrl(null);
    try {
      const res = await fetch("/api/auth/github-url");
      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || "OAuth is not configured on the server yet.");
      }
      const { url } = await res.json();
      setGitSyncStatus(null);
      
      const popup = window.open(url, "github_oauth_popup", "width=600,height=700");
      if (!popup) {
        alert("Popup blocker active. Please allow popups to connect to GitHub.");
      }
    } catch (err: any) {
      setGitSyncStatus("OAuth Connection Failed: " + err.message + ". Please set GITHUB_CLIENT_ID or try connecting with a Personal Access Token below.");
    }
  };

  const handleConnectPAT = async () => {
    if (!patInput.trim()) {
      alert("Please enter a valid Personal Access Token.");
      return;
    }
    setGitSyncStatus("Verifying Personal Access Token...");
    setGitSyncSuccessUrl(null);
    try {
      const res = await fetch("/api/github/validate-pat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: patInput })
      });
      if (!res.ok) {
        throw new Error("Invalid token or connection error.");
      }
      const user = await res.json();
      setGitToken(patInput);
      setGitUser({ username: user.username, avatarUrl: user.avatarUrl });
      localStorage.setItem("civic_shield_github_token", patInput);
      localStorage.setItem("civic_shield_github_user", JSON.stringify({ username: user.username, avatarUrl: user.avatarUrl }));
      setPatInput("");
      setGitSyncStatus(`✓ Successfully connected to GitHub as ${user.username}!`);
      setTimeout(() => setGitSyncStatus(null), 4000);
      fetchGitHubRepos(patInput);
    } catch (err: any) {
      setGitSyncStatus("Validation failed: " + err.message);
    }
  };

  const handleDisconnectGit = () => {
    setGitToken("");
    setGitUser(null);
    setGitRepos([]);
    localStorage.removeItem("civic_shield_github_token");
    localStorage.removeItem("civic_shield_github_user");
    setGitSyncStatus("Disconnected from GitHub.");
    setGitSyncSuccessUrl(null);
    setTimeout(() => setGitSyncStatus(null), 3000);
  };

  const handleSyncToGitHub = async () => {
    if (!gitToken || !selectedRepo) return;
    setIsGitSyncing(true);
    setGitSyncStatus("Pushing civic_data.json to GitHub...");
    setGitSyncSuccessUrl(null);
    
    const [owner, repoName] = selectedRepo.split("/");
    try {
      const res = await fetch("/api/github/sync", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          token: gitToken,
          owner,
          repo: repoName,
          branch: gitBranch,
          path: gitPath
        })
      });
      
      const data = await res.json();
      if (res.ok && data.success) {
        setGitSyncStatus(`✓ Synchronized! Committed civic_data.json to branch '${gitBranch}' successfully.`);
        if (data.commitUrl) {
          setGitSyncSuccessUrl(data.commitUrl);
        }
      } else {
        throw new Error(data.error || "Failed to commit and push file.");
      }
    } catch (err: any) {
      setGitSyncStatus("Sync failed: " + err.message);
    } finally {
      setIsGitSyncing(false);
    }
  };

  const handleExportJSON = async () => {
    try {
      const res = await fetch("/api/campaign-data");
      const currentData = await res.json();
      const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(currentData, null, 2));
      const downloadAnchor = document.createElement('a');
      downloadAnchor.setAttribute("href", dataStr);
      downloadAnchor.setAttribute("download", `civic_shield_data_backup_${new Date().toISOString().split('T')[0]}.json`);
      document.body.appendChild(downloadAnchor);
      downloadAnchor.click();
      downloadAnchor.remove();
    } catch (e) {
      alert("Failed to export JSON: " + e);
    }
  };

  const handleImportJSON = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (event) => {
      try {
        const jsonContent = JSON.parse(event.target?.result as string);
        if (jsonContent && Array.isArray(jsonContent.blocks)) {
          if (confirm("Restore full campaign dataset from this backup file?")) {
            const res = await fetch("/api/save-campaign-data", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ data: jsonContent })
            });
            if (res.ok) {
              alert("✓ Database restored successfully! Page will refresh.");
              window.location.reload();
            } else {
              alert("Failed to save restored data to server.");
            }
          }
        } else {
          alert("Invalid backup file: 'blocks' array is missing.");
        }
      } catch (err) {
        alert("Failed to parse JSON file: " + err);
      }
    };
    reader.readAsText(file);
  };

  // Reorder layout
  const handleMoveBlock = async (index: number, direction: 'up' | 'down') => {
    const newBlocks = [...blocks];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= newBlocks.length) return;

    const temp = newBlocks[index];
    newBlocks[index] = newBlocks[targetIndex];
    newBlocks[targetIndex] = temp;

    const updated = newBlocks.map((b, i) => ({ ...b, order: i + 1 }));
    await onSaveBlocks(updated);
  };

  const handleToggleBlockVisibility = async (index: number) => {
    const newBlocks = [...blocks];
    newBlocks[index].visible = !newBlocks[index].visible;
    await onSaveBlocks(newBlocks);
  };

  const handleDragStart = (e: React.DragEvent, index: number) => {
    setDraggedIdx(index);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = async (e: React.DragEvent, index: number) => {
    e.preventDefault();
    if (draggedIdx === null || draggedIdx === index) return;

    const newBlocks = [...blocks];
    const itemToMove = newBlocks[draggedIdx];
    newBlocks.splice(draggedIdx, 1);
    newBlocks.splice(index, 0, itemToMove);

    const updated = newBlocks.map((b, i) => ({ ...b, order: i + 1 }));
    setDraggedIdx(null);
    await onSaveBlocks(updated);
  };

  // Publishing Handlers
  const handlePublishBlog = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!blogTitle || !blogContent) return;

    try {
      await onAddBlogPost(
        blogTitle,
        blogContent,
        blogAuthor || "Campaign Coordinator",
        blogImage || "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=1200"
      );
      setBlogStatus("Blog post successfully published to home space!");
      setBlogTitle("");
      setBlogAuthor("");
      setBlogImage("");
      setBlogContent("");
      setTimeout(() => setBlogStatus(null), 4000);
    } catch (err: any) {
      setBlogStatus("Error publishing: " + err.message);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      const ext = file.name.split('.').pop()?.toLowerCase();
      if (ext === 'mp4' || ext === 'mkv' || ext === 'avi' || ext === 'mov') {
        setUploadType('video');
      } else if (ext === 'xlsx' || ext === 'xls' || ext === 'csv') {
        setUploadType('spreadsheet');
      } else if (ext === 'png' || ext === 'jpg' || ext === 'jpeg' || ext === 'webp' || ext === 'svg') {
        setUploadType('image');
      } else {
        setUploadType('pdf');
      }
    }
  };

  const handleUploadItem = async (e: React.FormEvent) => {
    e.preventDefault();
    if (uploadMethod === 'link') {
      if (!uploadLinkUrl || !uploadLinkUrl.startsWith("http")) {
        setUploadStatus("Please enter a valid HTTP/HTTPS web address URL first.");
        return;
      }
      setIsUploading(true);
      setUploadStatus("Indexing external resource link...");
      try {
        await onUploadFile({
          fileName: uploadLinkUrl,
          fileType: uploadType,
          fileData: uploadLinkUrl,
          title: uploadTitle || "External Resource Link",
          description: uploadDesc,
          verifiedBy: uploadVerified || "Campaign Lead"
        });
        setUploadStatus(`Resource successfully indexed! Link is now live inside critical records.`);
        setUploadLinkUrl("");
        setUploadTitle("");
        setUploadDesc("");
        setTimeout(() => setUploadStatus(null), 4500);
      } catch (err: any) {
        setUploadStatus("Link indexing failed: " + err.message);
      } finally {
        setIsUploading(false);
      }
      return;
    }

    if (!selectedFile) {
      setUploadStatus("Please choose a file from your device first.");
      return;
    }

    setIsUploading(true);
    setUploadStatus("Converting file byte array to server streams...");
    const reader = new FileReader();
    reader.onload = async () => {
      try {
        const base64Data = reader.result as string;
        await onUploadFile({
          fileName: selectedFile.name,
          fileType: uploadType,
          fileData: base64Data,
          title: uploadTitle || selectedFile.name,
          description: uploadDesc,
          verifiedBy: uploadVerified || "Campaign Lead"
        });
        setUploadStatus(`Upload completed successfully! '${selectedFile.name}' is now permanently stored.`);
        setSelectedFile(null);
        setUploadTitle("");
        setUploadDesc("");
        setTimeout(() => setUploadStatus(null), 4500);
      } catch (err: any) {
        setUploadStatus("Upload failed: " + err.message);
      } finally {
        setIsUploading(false);
      }
    };
    reader.readAsDataURL(selectedFile);
  };

  // Test AI Prompt
  const handleTestAi = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!testAiPrompt.trim()) return;
    setIsTestingAi(true);
    setTestAiResponse(null);
    setTestAiSources([]);
    setTestAiModel(null);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: testAiPrompt.trim(), history: [] })
      });
      if (res.ok) {
        const data = await res.json();
        setTestAiResponse(data.answer || "No response received.");
        setTestAiSources(data.sources || []);
        setTestAiModel(data.repliedBy || "Gemini 3.8 Flash (Search Grounded)");
      } else {
        const auto = getAutonomousLegalResponse(testAiPrompt.trim());
        setTestAiResponse(auto.answer || "Local legal engine fallback executed.");
        setTestAiModel("Autonomous Local Engine");
      }
    } catch (err: any) {
      setTestAiResponse("Error testing prompt: " + err.message);
    } finally {
      setIsTestingAi(false);
    }
  };

  // Add Statute
  const handleAddStatute = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newStatute.title || !newStatute.citation) return;
    const item: Statute = {
      id: "statute_" + Date.now(),
      title: newStatute.title.trim(),
      citation: newStatute.citation.trim(),
      category: newStatute.category || "Fundamental Rights",
      description: newStatute.description || "",
      keyPoints: Array.isArray(newStatute.keyPoints) && newStatute.keyPoints.length > 0 ? newStatute.keyPoints.filter(p => p.trim()) : ["Due process protection", "Enforceable in High Court & Supreme Court"],
      relevance: newStatute.relevance || "Universal Constitutional Protection"
    };
    const updated = [item, ...statutes];
    if (onUpdateStatutes) {
      onUpdateStatutes(updated);
      setStatuteStatus("✓ New statute added to library successfully!");
      setNewStatute({ title: "", citation: "", category: "Fundamental Rights", description: "", keyPoints: [""], relevance: "" });
      setTimeout(() => setStatuteStatus(null), 3500);
    }
  };

  // Add Myth
  const handleAddMyth = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMyth.question || !newMyth.myth || !newMyth.answerOnTrue) return;
    const updated = [newMyth, ...myths];
    if (onUpdateMyths) {
      onUpdateMyths(updated);
      setMythStatus("✓ New citizen mythbuster added successfully!");
      setNewMyth({ question: "", myth: "", answerOnTrue: "" });
      setTimeout(() => setMythStatus(null), 3500);
    }
  };

  // Add Case File
  const handleAddCaseFile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCase.title || !newCase.caseNumber) return;
    try {
      const res = await fetch("/api/case-files", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newCase)
      });
      if (res.ok) {
        const data = await res.json();
        if (onUpdateCaseFiles && data.caseFile) {
          onUpdateCaseFiles([data.caseFile, ...caseFiles]);
        }
        setCaseStatus("✓ Case precedent registered successfully!");
        setNewCase({
          caseNumber: "",
          title: "",
          category: "Constitutional Precedents",
          status: "precedent",
          description: "",
          type: "pdf",
          fileName: "Judgement_Record.pdf",
          fileUrl: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80&w=800",
          fileSize: "1.2 MB",
          verifiedBy: "Civic Legal Research Desk"
        });
        setTimeout(() => setCaseStatus(null), 3500);
      }
    } catch (err: any) {
      setCaseStatus("Failed to add case: " + err.message);
    }
  };

  // Add Book Review
  const handleAddReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReview.reviewerName || !newReview.reviewText) return;
    try {
      const res = await fetch("/api/book-reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newReview)
      });
      if (res.ok) {
        const data = await res.json();
        if (onUpdateBookReviews && data.review) {
          onUpdateBookReviews([data.review, ...bookReviews]);
        }
        setReviewStatus("✓ Verified reader review published!");
        setNewReview({ reviewerName: "", rating: 5, reviewText: "", chapterTitle: "Chapter I: The Sovereign Citizen" });
        setTimeout(() => setReviewStatus(null), 3500);
      }
    } catch (err: any) {
      setReviewStatus("Failed to save review: " + err.message);
    }
  };

  // Save Passcode
  const handleSavePasscode = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPasscode.trim() || newPasscode.trim().length < 4) {
      alert("Passcode must be at least 4 characters.");
      return;
    }
    try {
      if (onUpdatePasscode) {
        await onUpdatePasscode(newPasscode.trim());
      } else {
        await fetch("/api/update-passcode", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ passcode: newPasscode.trim() })
        });
      }
      localStorage.setItem("civic_shield_master_passcode", newPasscode.trim());
      setPasscodeStatus("✓ Master Passcode updated successfully! Stored on server and local cache.");
      setTimeout(() => setPasscodeStatus(null), 4000);
    } catch (err: any) {
      setPasscodeStatus("Failed to update passcode: " + err.message);
    }
  };

  const handleDownloadSubs = () => {
    const csvContent = "data:text/csv;charset=utf-8," 
      + ["Email", "Subscribed At"].join(",") + "\n"
      + subscribers.map(s => `"${s.email}","${s.subscribedAt}"`).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "civic_shield_newsletter_subs.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleCreateSocialPost = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!socialContent.trim()) return;
    setSocialStatus("Publishing stream dispatch...");
    try {
      await onAddSocialPost(socialPlatform, socialContent.trim(), socialImageUrl.trim() || undefined);
      setSocialContent("");
      setSocialImageUrl("");
      setSocialStatus("Success: Shared broadcast onto feed!");
      setTimeout(() => setSocialStatus(null), 3500);
    } catch (err: any) {
      setSocialStatus("Error: " + err.message);
    }
  };

  const handleCreateNewsletter = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsSubject.trim() || !newsBody.trim()) return;
    setIsSendingNews(true);
    setNewsStatus("Broadcasting update to supporter pool...");
    try {
      const confirmMsg = await onSendNewsletter(newsSubject.trim(), newsBadge.trim(), newsBody.trim());
      setNewsSubject("");
      setNewsBody("");
      setNewsStatus(confirmMsg || "Broadcast successfully transmitted!");
      setTimeout(() => setNewsStatus(null), 5000);
    } catch (err: any) {
      setNewsStatus("Transmission failed: " + err.message);
    } finally {
      setIsSendingNews(false);
    }
  };

  const handleManualAddSubscriber = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSubEmail.trim() || !newSubEmail.includes("@")) return;
    setIsAddingSub(true);
    setSubAddStatus("Registering supporter...");
    try {
      const res = await onAddSubscriber(newSubEmail.trim());
      setNewSubEmail("");
      setSubAddStatus(res.message || "Supporter email registered successfully!");
      setTimeout(() => setSubAddStatus(null), 4000);
    } catch (err: any) {
      setSubAddStatus("Registration failed: " + err.message);
    } finally {
      setIsAddingSub(false);
    }
  };

  const tabsConfig: Array<{ id: TabType; label: string; icon: any }> = [
    { id: 'layout', label: 'Layout & Hero', icon: Layout },
    { id: 'statutes', label: 'Statutes & Law', icon: Scale },
    { id: 'myths', label: 'Mythbusters', icon: Shield },
    { id: 'cases', label: 'Case Files', icon: FileText },
    { id: 'book', label: 'Codex & Reviews', icon: BookOpen },
    { id: 'impact', label: 'Impact Metrics', icon: Users },
    { id: 'ai_chat', label: 'AI Advocate & Q&A', icon: Sparkles },
    { id: 'upload', label: 'Evidence Locker', icon: FileUp },
    { id: 'blog', label: 'Gazette Blog', icon: FileCheck },
    { id: 'social', label: 'Social Feed', icon: Sparkles },
    { id: 'newsletters', label: 'Broadcasts', icon: Mail },
    { id: 'subs', label: 'Supporters (CSV)', icon: Download },
    { id: 'mails', label: 'Mail Logs', icon: Mail },
    { id: 'passcode', label: 'Security & Lock', icon: Lock },
    { id: 'backup', label: 'Backup & GitHub', icon: RefreshCw },
  ];

  return (
    <div className="bg-[#001233] rounded-sm border border-[#d4af37]/25 shadow-2xl p-4 sm:p-8 space-y-6 animate-in fade-in duration-300">
      
      {/* Title Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-[#d4af37]/20 pb-4 sm:pb-6 gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-sm bg-[#d4af37]/10 border border-[#d4af37]/20 text-[#d4af37]">
            <ShieldAlert className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-lg sm:text-xl font-serif font-bold tracking-tight text-white uppercase flex items-center gap-2">
              Civic Shield <span className="text-[#d4af37] font-serif not-italic">Operations Center</span>
            </h2>
            <p className="text-[9px] font-mono uppercase tracking-[0.22em] text-gray-400">
              MANAGER'S LOCK & FULL CONTROL CONSOLE
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono text-[#d4af37] bg-[#001a4d] px-3 py-1.5 rounded-sm border border-[#d4af37]/30">
          <Lock className="w-3.5 h-3.5" />
          <span>PASSCODE SECURED</span>
        </div>
      </div>

      {/* Responsive Horizontal Scroll Tabs Toolbar */}
      <div className="overflow-x-auto no-scrollbar pb-1 border-b border-[#d4af37]/15">
        <div className="flex items-center gap-1.5 min-w-max">
          {tabsConfig.map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-1.5 px-3 rounded-sm text-xs font-bold whitespace-nowrap tracking-wide uppercase transition-all duration-200 cursor-pointer flex items-center gap-1.5 ${
                  isActive 
                    ? "bg-[#d4af37] text-[#001233] shadow-md" 
                    : "bg-[#001a4d] hover:bg-[#002366]/60 text-[#d4af37] border border-[#d4af37]/25"
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* TAB CONTENT AREAS */}

      {/* 1. LAYOUT & HERO */}
      {activeTab === 'layout' && (
        <div className="space-y-6 animate-in fade-in duration-200 text-left">
          <div className="p-4 bg-[#001a4d] border border-[#d4af37]/20 rounded-sm space-y-1">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#d4af37] flex items-center gap-1.5">
              <Layout className="w-4 h-4" /> Layout Blocks Sorter & Hero Header Calibrator
            </h4>
            <p className="text-[11px] text-gray-300 font-light">
              Toggle block visibility or drag-and-drop to reorder homepage sections.
            </p>
          </div>

          <div className="space-y-3">
            {blocks.map((block, idx) => (
              <div 
                key={block.id}
                draggable
                onDragStart={(e) => handleDragStart(e, idx)}
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, idx)}
                className={`p-3.5 rounded-sm border flex items-center justify-between transition-colors ${
                  block.visible 
                    ? "bg-[#001a4d] border-[#d4af37]/30 text-white" 
                    : "bg-black/40 border-gray-800 text-gray-500"
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="w-6 text-center font-mono text-xs text-[#d4af37] font-bold">#{block.order}</span>
                  <div>
                    <h5 className="text-xs sm:text-sm font-serif font-bold uppercase tracking-wider">{block.title}</h5>
                    <span className="text-[9px] font-mono text-gray-400">ID: {block.id}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleMoveBlock(idx, 'up')}
                    disabled={idx === 0}
                    className="p-1.5 bg-[#001233] hover:bg-[#d4af37]/20 disabled:opacity-30 rounded-sm text-[#d4af37] cursor-pointer"
                    title="Move Up"
                  >
                    <ArrowUp className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => handleMoveBlock(idx, 'down')}
                    disabled={idx === blocks.length - 1}
                    className="p-1.5 bg-[#001233] hover:bg-[#d4af37]/20 disabled:opacity-30 rounded-sm text-[#d4af37] cursor-pointer"
                    title="Move Down"
                  >
                    <ArrowDown className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => handleToggleBlockVisibility(idx)}
                    className={`p-1.5 rounded-sm cursor-pointer transition-colors ${
                      block.visible ? "bg-emerald-950/40 text-emerald-400" : "bg-red-950/40 text-red-400"
                    }`}
                    title={block.visible ? "Hide section" : "Show section"}
                  >
                    {block.visible ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 2. STATUTES & LAW LIBRARY */}
      {activeTab === 'statutes' && (
        <div className="space-y-6 animate-in fade-in duration-200 text-left">
          <div className="p-4 bg-[#001a4d] border border-[#d4af37]/20 rounded-sm space-y-1">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#d4af37] flex items-center gap-1.5">
              <Scale className="w-4 h-4" /> Sovereign Statutory & Constitutional Law Repository
            </h4>
            <p className="text-[11px] text-gray-300 font-light">
              Add, calibrate, or remove core statutory articles, procedural safeguards, and police inquiry rules.
            </p>
          </div>

          {statuteStatus && (
            <div className="p-3 bg-emerald-950/40 border border-emerald-500/30 text-emerald-400 text-xs rounded-sm">
              {statuteStatus}
            </div>
          )}

          {/* Add New Statute Form */}
          <form onSubmit={handleAddStatute} className="p-5 bg-[#001a4d] border border-[#d4af37]/25 rounded-sm space-y-3">
            <h5 className="text-xs font-mono font-bold uppercase text-[#d4af37] flex items-center gap-1.5">
              <Plus className="w-3.5 h-3.5" /> Register New Statutory Right / Safeguard
            </h5>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-[9px] font-mono uppercase text-gray-300 block mb-1">Statute Title</label>
                <input
                  type="text"
                  placeholder="e.g. Right to Legal Representation During Interrogation"
                  value={newStatute.title || ""}
                  onChange={(e) => setNewStatute({ ...newStatute, title: e.target.value })}
                  className="w-full bg-[#001233] text-xs text-white border border-[#d4af37]/25 rounded-sm p-2"
                  required
                />
              </div>
              <div>
                <label className="text-[9px] font-mono uppercase text-gray-300 block mb-1">Statutory Citation / Article</label>
                <input
                  type="text"
                  placeholder="e.g. Section 41D CrPC / Article 22(1)"
                  value={newStatute.citation || ""}
                  onChange={(e) => setNewStatute({ ...newStatute, citation: e.target.value })}
                  className="w-full bg-[#001233] text-xs text-white border border-[#d4af37]/25 rounded-sm p-2"
                  required
                />
              </div>
            </div>
            <div>
              <label className="text-[9px] font-mono uppercase text-gray-300 block mb-1">Description & Procedural Safeguards</label>
              <textarea
                placeholder="Explain the clear legal protection, official limitations, and citizen action steps..."
                value={newStatute.description || ""}
                onChange={(e) => setNewStatute({ ...newStatute, description: e.target.value })}
                rows={2}
                className="w-full bg-[#001233] text-xs text-white border border-[#d4af37]/25 rounded-sm p-2"
              />
            </div>
            <button
              type="submit"
              className="py-2 px-4 bg-[#d4af37] hover:bg-[#b08f25] text-[#001233] font-bold text-xs uppercase rounded-sm cursor-pointer transition-colors"
            >
              Add Statute to Repository
            </button>
          </form>

          {/* Current Statutes List */}
          <div className="space-y-3">
            <h5 className="text-xs font-mono font-bold uppercase text-gray-400">
              Active Repository Statutes ({statutes.length})
            </h5>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {statutes.map((st, sIdx) => (
                <div key={st.id || sIdx} className="p-4 bg-[#001a4d] border border-[#d4af37]/20 rounded-sm space-y-2 relative">
                  <div className="flex items-center justify-between">
                    <span className="text-[9px] font-mono bg-[#d4af37]/15 text-[#d4af37] px-2 py-0.5 rounded-sm font-bold">
                      {st.citation}
                    </span>
                    {onUpdateStatutes && (
                      <button
                        onClick={() => {
                          if (confirm(`Remove '${st.title}' from repository?`)) {
                            onUpdateStatutes(statutes.filter((_, idx) => idx !== sIdx));
                          }
                        }}
                        className="text-red-400 hover:text-red-300 p-1 cursor-pointer"
                        title="Delete statute"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                  <h6 className="text-xs font-serif font-bold text-white">{st.title}</h6>
                  <p className="text-[11px] text-gray-300 font-light line-clamp-3">{st.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 3. CITIZEN MYTHBUSTERS */}
      {activeTab === 'myths' && (
        <div className="space-y-6 animate-in fade-in duration-200 text-left">
          <div className="p-4 bg-[#001a4d] border border-[#d4af37]/20 rounded-sm space-y-1">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#d4af37] flex items-center gap-1.5">
              <Shield className="w-4 h-4" /> Citizen Misconception & Legal Reality Cards
            </h4>
            <p className="text-[11px] text-gray-300 font-light">
              Add and refine interactive myth cards that dispel common procedural misunderstandings.
            </p>
          </div>

          {mythStatus && (
            <div className="p-3 bg-emerald-950/40 border border-emerald-500/30 text-emerald-400 text-xs rounded-sm">
              {mythStatus}
            </div>
          )}

          {/* Add New Myth Form */}
          <form onSubmit={handleAddMyth} className="p-5 bg-[#001a4d] border border-[#d4af37]/25 rounded-sm space-y-3">
            <h5 className="text-xs font-mono font-bold uppercase text-[#d4af37] flex items-center gap-1.5">
              <Plus className="w-3.5 h-3.5" /> Create New Mythbuster Card
            </h5>
            <div>
              <label className="text-[9px] font-mono uppercase text-gray-300 block mb-1">Question / Scenario Title</label>
              <input
                type="text"
                placeholder="e.g. Can an officer demand to inspect your phone without a warrant?"
                value={newMyth.question}
                onChange={(e) => setNewMyth({ ...newMyth, question: e.target.value })}
                className="w-full bg-[#001233] text-xs text-white border border-[#d4af37]/25 rounded-sm p-2"
                required
              />
            </div>
            <div>
              <label className="text-[9px] font-mono uppercase text-red-400 block mb-1">Common Misconception (The Myth)</label>
              <textarea
                placeholder="e.g. 'Police can search any electronic device in your bag during routine stops.'"
                value={newMyth.myth}
                onChange={(e) => setNewMyth({ ...newMyth, myth: e.target.value })}
                rows={2}
                className="w-full bg-[#001233] text-xs text-white border border-[#d4af37]/25 rounded-sm p-2 font-mono text-gray-300"
                required
              />
            </div>
            <div>
              <label className="text-[9px] font-mono uppercase text-emerald-400 block mb-1">Verified Legal Reality (The Truth)</label>
              <textarea
                placeholder="e.g. Under Article 20(3) and 21, forced unlocking is unconstitutional without a judicial search warrant."
                value={newMyth.answerOnTrue}
                onChange={(e) => setNewMyth({ ...newMyth, answerOnTrue: e.target.value })}
                rows={2}
                className="w-full bg-[#001233] text-xs text-white border border-[#d4af37]/25 rounded-sm p-2"
                required
              />
            </div>
            <button
              type="submit"
              className="py-2 px-4 bg-[#d4af37] hover:bg-[#b08f25] text-[#001233] font-bold text-xs uppercase rounded-sm cursor-pointer transition-colors"
            >
              Add Mythbuster Card
            </button>
          </form>

          {/* Active Myths List */}
          <div className="space-y-3">
            <h5 className="text-xs font-mono font-bold uppercase text-gray-400">
              Active Misconceptions ({myths.length})
            </h5>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {myths.map((m, mIdx) => (
                <div key={mIdx} className="p-4 bg-[#001a4d] border border-[#d4af37]/20 rounded-sm space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[9px] font-mono text-red-400 uppercase font-bold">
                      Misconception #{mIdx + 1}
                    </span>
                    {onUpdateMyths && (
                      <button
                        onClick={() => {
                          if (confirm(`Remove Misconception #${mIdx + 1}?`)) {
                            onUpdateMyths(myths.filter((_, idx) => idx !== mIdx));
                          }
                        }}
                        className="text-red-400 hover:text-red-300 p-1 cursor-pointer"
                        title="Delete myth"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                  <h6 className="text-xs font-serif font-bold text-white">{m.question}</h6>
                  <p className="text-[11px] font-mono text-gray-300 italic border-l-2 border-red-500/40 pl-2">
                    {m.myth}
                  </p>
                  <p className="text-[11px] text-gray-200 bg-black/30 p-2 border-l-2 border-[#d4af37] rounded-sm">
                    {m.answerOnTrue}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 4. CASE FILES & PRECEDENTS */}
      {activeTab === 'cases' && (
        <div className="space-y-6 animate-in fade-in duration-200 text-left">
          <div className="p-4 bg-[#001a4d] border border-[#d4af37]/20 rounded-sm space-y-1">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#d4af37] flex items-center gap-1.5">
              <FileText className="w-4 h-4" /> Landmark Precedents & Unsealed Court Records
            </h4>
            <p className="text-[11px] text-gray-300 font-light">
              Manage documented constitutional judgements and court victories displayed in the filing cabinet drawer.
            </p>
          </div>

          {caseStatus && (
            <div className="p-3 bg-emerald-950/40 border border-emerald-500/30 text-emerald-400 text-xs rounded-sm">
              {caseStatus}
            </div>
          )}

          {/* Add New Case Form */}
          <form onSubmit={handleAddCaseFile} className="p-5 bg-[#001a4d] border border-[#d4af37]/25 rounded-sm space-y-3">
            <h5 className="text-xs font-mono font-bold uppercase text-[#d4af37] flex items-center gap-1.5">
              <Plus className="w-3.5 h-3.5" /> Register Landmark Case Precedent
            </h5>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="text-[9px] font-mono uppercase text-gray-300 block mb-1">Case Number / Citation</label>
                <input
                  type="text"
                  placeholder="e.g. (1997) 1 SCC 416"
                  value={newCase.caseNumber || ""}
                  onChange={(e) => setNewCase({ ...newCase, caseNumber: e.target.value })}
                  className="w-full bg-[#001233] text-xs text-white border border-[#d4af37]/25 rounded-sm p-2"
                  required
                />
              </div>
              <div>
                <label className="text-[9px] font-mono uppercase text-gray-300 block mb-1">Case Title</label>
                <input
                  type="text"
                  placeholder="e.g. D.K. Basu v. State of West Bengal"
                  value={newCase.title || ""}
                  onChange={(e) => setNewCase({ ...newCase, title: e.target.value })}
                  className="w-full bg-[#001233] text-xs text-white border border-[#d4af37]/25 rounded-sm p-2"
                  required
                />
              </div>
              <div>
                <label className="text-[9px] font-mono uppercase text-gray-300 block mb-1">Status</label>
                <select
                  value={newCase.status}
                  onChange={(e) => setNewCase({ ...newCase, status: e.target.value as any })}
                  className="w-full bg-[#001233] text-xs text-white border border-[#d4af37]/25 rounded-sm p-2"
                >
                  <option value="precedent">Precedent</option>
                  <option value="settled">Settled / Won</option>
                  <option value="archived">Archived</option>
                  <option value="open">Open</option>
                </select>
              </div>
            </div>
            <div>
              <label className="text-[9px] font-mono uppercase text-gray-300 block mb-1">Holding & Constitutional Significance</label>
              <textarea
                placeholder="Key directives issued, guidelines established, and statutory relevance..."
                value={newCase.description || ""}
                onChange={(e) => setNewCase({ ...newCase, description: e.target.value })}
                rows={2}
                className="w-full bg-[#001233] text-xs text-white border border-[#d4af37]/25 rounded-sm p-2"
              />
            </div>
            <button
              type="submit"
              className="py-2 px-4 bg-[#d4af37] hover:bg-[#b08f25] text-[#001233] font-bold text-xs uppercase rounded-sm cursor-pointer transition-colors"
            >
              Save Case Record
            </button>
          </form>

          {/* Active Case Files List */}
          <div className="space-y-3">
            <h5 className="text-xs font-mono font-bold uppercase text-gray-400">
              Active Case Files ({caseFiles.length})
            </h5>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {caseFiles.map((cf) => (
                <div key={cf.id} className="p-4 bg-[#001a4d] border border-[#d4af37]/20 rounded-sm space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[9px] font-mono bg-[#d4af37]/15 text-[#d4af37] px-2 py-0.5 rounded-sm font-bold">
                      {cf.caseNumber}
                    </span>
                    <button
                      onClick={async () => {
                        if (confirm(`Delete case file '${cf.title}'?`)) {
                          await fetch(`/api/case-files/${cf.id}`, { method: "DELETE" });
                          if (onUpdateCaseFiles) {
                            onUpdateCaseFiles(caseFiles.filter(c => c.id !== cf.id));
                          }
                        }
                      }}
                      className="text-red-400 hover:text-red-300 p-1 cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <h6 className="text-xs font-serif font-bold text-white">{cf.title}</h6>
                  <p className="text-[11px] text-gray-300 font-light line-clamp-3">{cf.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 5. VINTAGE CODEX & REVIEWS */}
      {activeTab === 'book' && (
        <div className="space-y-6 animate-in fade-in duration-200 text-left">
          <div className="p-4 bg-[#001a4d] border border-[#d4af37]/20 rounded-sm space-y-1">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#d4af37] flex items-center gap-1.5">
              <BookOpen className="w-4 h-4" /> Vintage Codex & Verified Reader Reviews
            </h4>
            <p className="text-[11px] text-gray-300 font-light">
              Moderate public reader submissions and publish verified testimonials for the Sovereign Defense Doctrine.
            </p>
          </div>

          {reviewStatus && (
            <div className="p-3 bg-emerald-950/40 border border-emerald-500/30 text-emerald-400 text-xs rounded-sm">
              {reviewStatus}
            </div>
          )}

          {/* Add Review Form */}
          <form onSubmit={handleAddReview} className="p-5 bg-[#001a4d] border border-[#d4af37]/25 rounded-sm space-y-3">
            <h5 className="text-xs font-mono font-bold uppercase text-[#d4af37] flex items-center gap-1.5">
              <Plus className="w-3.5 h-3.5" /> Publish Verified Reader Review
            </h5>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-[9px] font-mono uppercase text-gray-300 block mb-1">Reviewer Name & Credential</label>
                <input
                  type="text"
                  placeholder="e.g. Adv. Priya Sen, High Court of Delhi"
                  value={newReview.reviewerName}
                  onChange={(e) => setNewReview({ ...newReview, reviewerName: e.target.value })}
                  className="w-full bg-[#001233] text-xs text-white border border-[#d4af37]/25 rounded-sm p-2"
                  required
                />
              </div>
              <div>
                <label className="text-[9px] font-mono uppercase text-gray-300 block mb-1">Chapter / Section Referenced</label>
                <input
                  type="text"
                  placeholder="e.g. Chapter II: Police Interrogation Protocols"
                  value={newReview.chapterTitle}
                  onChange={(e) => setNewReview({ ...newReview, chapterTitle: e.target.value })}
                  className="w-full bg-[#001233] text-xs text-white border border-[#d4af37]/25 rounded-sm p-2"
                />
              </div>
            </div>
            <div>
              <label className="text-[9px] font-mono uppercase text-gray-300 block mb-1">Testimonial Body</label>
              <textarea
                placeholder="Write the reader review and procedural feedback..."
                value={newReview.reviewText}
                onChange={(e) => setNewReview({ ...newReview, reviewText: e.target.value })}
                rows={2}
                className="w-full bg-[#001233] text-xs text-white border border-[#d4af37]/25 rounded-sm p-2"
                required
              />
            </div>
            <button
              type="submit"
              className="py-2 px-4 bg-[#d4af37] hover:bg-[#b08f25] text-[#001233] font-bold text-xs uppercase rounded-sm cursor-pointer transition-colors"
            >
              Publish Verified Review
            </button>
          </form>

          {/* Active Reviews */}
          <div className="space-y-3">
            <h5 className="text-xs font-mono font-bold uppercase text-gray-400">
              Active Reader Reviews ({bookReviews.length})
            </h5>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {bookReviews.map((rev) => (
                <div key={rev.id} className="p-4 bg-[#001a4d] border border-[#d4af37]/20 rounded-sm space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1 text-[#ffd754]">
                      {Array.from({ length: rev.rating || 5 }).map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-current" />
                      ))}
                    </div>
                    <button
                      onClick={async () => {
                        if (confirm(`Delete review by ${rev.reviewerName}?`)) {
                          await fetch(`/api/book-reviews/${rev.id}`, { method: "DELETE" });
                          if (onUpdateBookReviews) {
                            onUpdateBookReviews(bookReviews.filter(r => r.id !== rev.id));
                          }
                        }
                      }}
                      className="text-red-400 hover:text-red-300 p-1 cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <h6 className="text-xs font-serif font-bold text-white">{rev.reviewerName}</h6>
                  <p className="text-[11px] text-gray-300 italic font-light">"{rev.reviewText}"</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 6. MEASURABLE SUCCESS */}
      {activeTab === 'impact' && (
        <div className="space-y-6 animate-in fade-in duration-200 text-left">
          <div className="p-4 bg-[#001a4d] border border-[#d4af37]/20 rounded-sm space-y-1">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#d4af37] flex items-center gap-1.5">
              <Users className="w-4 h-4" /> Live Website Traffic & Measurable Impact Ledger
            </h4>
            <p className="text-[11px] text-gray-300">
              Calibrate and track verified visitor counts, downloaded handbooks, and citizen consultations.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            <div className="p-3 bg-[#001a4d] border border-[#d4af37]/20 rounded-sm text-center">
              <span className="text-[9px] font-mono text-gray-400 uppercase block">Total Website Visitors</span>
              <span className="text-2xl font-bold font-serif text-white">{adminStatsForm.totalVisitors.toLocaleString()}</span>
            </div>
            <div className="p-3 bg-[#001a4d] border border-[#d4af37]/20 rounded-sm text-center">
              <span className="text-[9px] font-mono text-gray-400 uppercase block">Supporters Registered</span>
              <span className="text-2xl font-bold font-serif text-[#ffd754]">{(subscribers.length + 1480).toLocaleString()}</span>
            </div>
            <div className="p-3 bg-[#001a4d] border border-[#d4af37]/20 rounded-sm text-center">
              <span className="text-[9px] font-mono text-gray-400 uppercase block">Handbooks Downloaded</span>
              <span className="text-2xl font-bold font-serif text-white">{adminStatsForm.handbookDownloads.toLocaleString()}</span>
            </div>
            <div className="p-3 bg-[#001a4d] border border-[#d4af37]/20 rounded-sm text-center">
              <span className="text-[9px] font-mono text-gray-400 uppercase block">Templates Deployed</span>
              <span className="text-2xl font-bold font-serif text-white">{adminStatsForm.templatesDeployed.toLocaleString()}</span>
            </div>
            <div className="p-3 bg-[#001a4d] border border-[#d4af37]/20 rounded-sm text-center">
              <span className="text-[9px] font-mono text-gray-400 uppercase block">Districts Reached</span>
              <span className="text-2xl font-bold font-serif text-[#ffd754]">{adminStatsForm.districtsEmpowered.toLocaleString()}</span>
            </div>
          </div>

          <form onSubmit={handleSaveAdminStats} className="bg-[#001a4d] border border-[#d4af37]/25 p-5 rounded-sm space-y-4">
            <h4 className="text-xs font-mono font-bold uppercase text-[#d4af37] tracking-wider">
              Calibrate Measurable Success Baselines
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <label className="block text-[10px] font-mono text-gray-300 uppercase mb-1">1. Total Website Visitors</label>
                <input
                  type="number"
                  value={adminStatsForm.totalVisitors}
                  onChange={(e) => setAdminStatsForm({ ...adminStatsForm, totalVisitors: parseInt(e.target.value) || 0 })}
                  className="w-full bg-[#001233] border border-[#d4af37]/25 p-2 text-xs rounded-sm text-white font-mono"
                />
              </div>
              <div>
                <label className="block text-[10px] font-mono text-gray-300 uppercase mb-1">2. Handbooks Downloaded</label>
                <input
                  type="number"
                  value={adminStatsForm.handbookDownloads}
                  onChange={(e) => setAdminStatsForm({ ...adminStatsForm, handbookDownloads: parseInt(e.target.value) || 0 })}
                  className="w-full bg-[#001233] border border-[#d4af37]/25 p-2 text-xs rounded-sm text-white font-mono"
                />
              </div>
              <div>
                <label className="block text-[10px] font-mono text-gray-300 uppercase mb-1">3. Legal Templates Deployed</label>
                <input
                  type="number"
                  value={adminStatsForm.templatesDeployed}
                  onChange={(e) => setAdminStatsForm({ ...adminStatsForm, templatesDeployed: parseInt(e.target.value) || 0 })}
                  className="w-full bg-[#001233] border border-[#d4af37]/25 p-2 text-xs rounded-sm text-white font-mono"
                />
              </div>
              <div>
                <label className="block text-[10px] font-mono text-gray-300 uppercase mb-1">4. Administrative Districts Reached</label>
                <input
                  type="number"
                  value={adminStatsForm.districtsEmpowered}
                  onChange={(e) => setAdminStatsForm({ ...adminStatsForm, districtsEmpowered: parseInt(e.target.value) || 0 })}
                  className="w-full bg-[#001233] border border-[#d4af37]/25 p-2 text-xs rounded-sm text-white font-mono"
                />
              </div>
              <div>
                <label className="block text-[10px] font-mono text-gray-300 uppercase mb-1">5. Consultations Given</label>
                <input
                  type="number"
                  value={adminStatsForm.consultationsGiven}
                  onChange={(e) => setAdminStatsForm({ ...adminStatsForm, consultationsGiven: parseInt(e.target.value) || 0 })}
                  className="w-full bg-[#001233] border border-[#d4af37]/25 p-2 text-xs rounded-sm text-white font-mono"
                />
              </div>
            </div>

            <button
              type="submit"
              className="py-2.5 px-6 bg-[#d4af37] hover:bg-[#b08f25] text-[#001233] font-bold text-xs uppercase rounded-sm cursor-pointer transition-colors shadow-md"
            >
              Save Metrics
            </button>
            {statsSaveStatus && <span className="ml-3 text-xs text-emerald-400 font-mono">{statsSaveStatus}</span>}
          </form>
        </div>
      )}

      {/* 7. LIVE AI ADVOCATE & Q&A */}
      {activeTab === 'ai_chat' && (
        <div className="space-y-6 animate-in fade-in duration-200 text-left">
          <div className="p-4 bg-[#001a4d] border border-[#d4af37]/20 rounded-sm space-y-1">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#d4af37] flex items-center gap-1.5">
              <Sparkles className="w-4 h-4" /> Live AI Advocate Pipeline & Citizen Query Moderator
            </h4>
            <p className="text-[11px] text-gray-300">
              Test your AI Legal Engine in real time, view citizen queries, and approve responses.
            </p>
          </div>

          {/* Google Search Grounding Pipeline Status Card */}
          <div className="p-4 bg-[#001433] border border-[#d4af37]/35 rounded-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-sm bg-[#d4af37]/15 border border-[#d4af37]/30 text-[#d4af37]">
                <Globe className="w-5 h-5 text-[#ffd754]" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h5 className="text-xs font-mono font-bold text-white uppercase tracking-wider">
                    Google Search Grounding Engine
                  </h5>
                  <span className="text-[8px] font-mono font-bold bg-emerald-950 text-emerald-400 border border-emerald-500/30 px-1.5 py-0.5 rounded-sm flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> ACTIVE
                  </span>
                </div>
                <p className="text-[10px] text-gray-300 font-mono mt-0.5">
                  Primary: <span className="text-[#ffd754]">gemini-3.8-flash</span> • Fallback: <span className="text-[#ffd754]">gemini-3.6-flash</span> • Search Tool: <span className="text-[#ffd754]">googleSearch</span>
                </p>
              </div>
            </div>
            <div className="text-[9px] font-mono text-gray-400 bg-[#001a4d] px-2.5 py-1 rounded-sm border border-gray-700">
              Citations Auto-Linked
            </div>
          </div>

          {/* Real-time AI Query Sandbox */}
          <form onSubmit={handleTestAi} className="p-5 bg-[#001a4d] border border-[#d4af37]/25 rounded-sm space-y-3">
            <h5 className="text-xs font-mono font-bold uppercase text-[#d4af37] flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" /> AI Response Live Test Sandbox
            </h5>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Ask any legal or procedural question to test AI responsiveness..."
                value={testAiPrompt}
                onChange={(e) => setTestAiPrompt(e.target.value)}
                className="flex-1 bg-[#001233] text-xs text-white border border-[#d4af37]/25 rounded-sm p-2.5 font-sans"
              />
              <button
                type="submit"
                disabled={isTestingAi}
                className="py-2.5 px-5 bg-[#d4af37] hover:bg-[#b08f25] disabled:opacity-50 text-[#001233] font-bold text-xs uppercase rounded-sm cursor-pointer transition-colors"
              >
                {isTestingAi ? "Generating..." : "Test AI"}
              </button>
            </div>
            {testAiResponse && (
              <div className="p-4 bg-black/50 border-l-2 border-[#d4af37] rounded-sm space-y-2.5">
                {testAiModel && (
                  <div className="flex items-center justify-between text-[9px] font-mono text-[#ffd754] uppercase tracking-wider pb-1.5 border-b border-[#d4af37]/15">
                    <span>Generated By: {testAiModel}</span>
                    <span className="text-emerald-400">Response Verified</span>
                  </div>
                )}
                <div className="text-xs text-gray-200 whitespace-pre-line leading-relaxed">
                  {testAiResponse}
                </div>
                {testAiSources.length > 0 && (
                  <div className="pt-2 border-t border-[#d4af37]/20 text-[10px] space-y-1.5">
                    <span className="text-[#ffd754] font-mono text-[9px] uppercase font-bold flex items-center gap-1">
                      <Globe className="w-3 h-3" /> Grounded Search Sources ({testAiSources.length}):
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {testAiSources.map((src, sIdx) => (
                        <a
                          key={sIdx}
                          href={src.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 px-2 py-0.5 rounded-sm bg-[#001433] hover:bg-[#d4af37]/20 border border-[#d4af37]/30 text-gray-200 hover:text-white text-[9px] font-sans"
                        >
                          <ExternalLink className="w-2.5 h-2.5 text-[#ffd754]" />
                          <span className="truncate max-w-[200px]">{src.title || src.url}</span>
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </form>

          {/* Citizen Q&A Moderation List */}
          <div className="space-y-3">
            <h5 className="text-xs font-mono font-bold uppercase text-gray-400">
              Citizen Queries & Consultations ({questions.length})
            </h5>
            {questions.map((q) => (
              <div key={q.id} className="p-4 bg-[#001a4d] border border-[#d4af37]/20 rounded-sm space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[9px] font-mono text-gray-400">{q.timestamp}</span>
                  <button
                    onClick={() => onDeleteQuestion(q.id)}
                    className="text-red-400 hover:text-red-300 p-1 cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
                <p className="text-xs font-serif font-semibold text-white">"{q.text}"</p>
                {q.answer && (
                  <div className="p-3 bg-black/30 border-l-2 border-[#d4af37] rounded-sm text-xs text-gray-300 space-y-1.5">
                    <span className="text-[9px] font-mono text-[#d4af37] block font-bold">Answer ({q.repliedBy || "AI Advocate"}):</span>
                    <div className="leading-relaxed">{q.answer}</div>
                    {q.sources && q.sources.length > 0 && (
                      <div className="pt-2 border-t border-[#d4af37]/15 text-[9px] space-y-1">
                        <span className="text-[#ffd754] font-mono font-bold flex items-center gap-1">
                          <Globe className="w-2.5 h-2.5" /> Citations ({q.sources.length}):
                        </span>
                        <div className="flex flex-wrap gap-1">
                          {q.sources.map((s, si) => (
                            <a
                              key={si}
                              href={s.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="px-1.5 py-0.5 bg-[#001433] hover:bg-[#d4af37]/20 border border-[#d4af37]/30 text-gray-200 rounded-sm text-[8.5px] truncate max-w-[180px]"
                            >
                              {s.title || s.url}
                            </a>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 8. EVIDENCE LOCKER */}
      {activeTab === 'upload' && (
        <div className="space-y-6 animate-in fade-in duration-200 text-left">
          <div className="p-4 bg-[#001a4d] border border-[#d4af37]/20 rounded-sm space-y-1">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#d4af37] flex items-center gap-1.5">
              <FileUp className="w-4 h-4" /> Evidence & Document Depository
            </h4>
            <p className="text-[11px] text-gray-300 font-light">
              Upload and index PDFs, spreadsheets, videos, or external documentation links.
            </p>
          </div>

          {uploadStatus && (
            <div className="p-3 bg-emerald-950/40 border border-emerald-500/30 text-emerald-400 text-xs rounded-sm">
              {uploadStatus}
            </div>
          )}

          <form onSubmit={handleUploadItem} className="p-5 bg-[#001a4d] border border-[#d4af37]/25 rounded-sm space-y-4">
            <div className="flex items-center gap-4">
              <label className="flex items-center gap-1.5 text-xs text-white cursor-pointer font-mono">
                <input
                  type="radio"
                  name="uploadMethod"
                  checked={uploadMethod === 'file'}
                  onChange={() => setUploadMethod('file')}
                />
                Direct File Upload
              </label>
              <label className="flex items-center gap-1.5 text-xs text-white cursor-pointer font-mono">
                <input
                  type="radio"
                  name="uploadMethod"
                  checked={uploadMethod === 'link'}
                  onChange={() => setUploadMethod('link')}
                />
                External URL / Drive Link
              </label>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-[9px] font-mono uppercase text-gray-300 block mb-1">Document Title</label>
                <input
                  type="text"
                  placeholder="e.g. Standard Citizen FIR Checklist"
                  value={uploadTitle}
                  onChange={(e) => setUploadTitle(e.target.value)}
                  className="w-full bg-[#001233] text-xs text-white border border-[#d4af37]/25 rounded-sm p-2"
                  required
                />
              </div>
              {uploadMethod === 'file' ? (
                <div>
                  <label className="text-[9px] font-mono uppercase text-gray-300 block mb-1">Choose File</label>
                  <input
                    type="file"
                    onChange={handleFileChange}
                    className="w-full bg-[#001233] text-xs text-gray-300 border border-[#d4af37]/25 rounded-sm p-1.5"
                  />
                </div>
              ) : (
                <div>
                  <label className="text-[9px] font-mono uppercase text-gray-300 block mb-1">Web Address / URL</label>
                  <input
                    type="url"
                    placeholder="https://..."
                    value={uploadLinkUrl}
                    onChange={(e) => setUploadLinkUrl(e.target.value)}
                    className="w-full bg-[#001233] text-xs text-white border border-[#d4af37]/25 rounded-sm p-2"
                  />
                </div>
              )}
            </div>

            <div>
              <label className="text-[9px] font-mono uppercase text-gray-300 block mb-1">Description</label>
              <textarea
                placeholder="Document brief and statutory summary..."
                value={uploadDesc}
                onChange={(e) => setUploadDesc(e.target.value)}
                rows={2}
                className="w-full bg-[#001233] text-xs text-white border border-[#d4af37]/25 rounded-sm p-2"
              />
            </div>

            <button
              type="submit"
              disabled={isUploading}
              className="py-2 px-5 bg-[#d4af37] hover:bg-[#b08f25] disabled:opacity-50 text-[#001233] font-bold text-xs uppercase rounded-sm cursor-pointer transition-colors"
            >
              {isUploading ? "Uploading..." : "Index Evidence Document"}
            </button>
          </form>

          {/* Evidence List */}
          <div className="space-y-3">
            <h5 className="text-xs font-mono font-bold uppercase text-gray-400">
              Active Documents ({evidence.length})
            </h5>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {evidence.map((ev) => (
                <div key={ev.id} className="p-4 bg-[#001a4d] border border-[#d4af37]/20 rounded-sm space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[9px] font-mono bg-[#d4af37]/15 text-[#d4af37] px-2 py-0.5 rounded-sm uppercase font-bold">
                      {ev.type}
                    </span>
                    <button
                      onClick={() => onDeleteEvidence(ev.id)}
                      className="text-red-400 hover:text-red-300 p-1 cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <h6 className="text-xs font-serif font-bold text-white">{ev.title}</h6>
                  <p className="text-[11px] text-gray-300 font-light line-clamp-2">{ev.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 9. BLOG GAZETTE */}
      {activeTab === 'blog' && (
        <div className="space-y-6 animate-in fade-in duration-200 text-left">
          <div className="p-4 bg-[#001a4d] border border-[#d4af37]/20 rounded-sm space-y-1">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#d4af37] flex items-center gap-1.5">
              <FileCheck className="w-4 h-4" /> Gazette & Campaign Publishing
            </h4>
            <p className="text-[11px] text-gray-300">
              Publish editorial dispatches, legal guides, and constitutional analysis.
            </p>
          </div>

          {blogStatus && (
            <div className="p-3 bg-emerald-950/40 border border-emerald-500/30 text-emerald-400 text-xs rounded-sm">
              {blogStatus}
            </div>
          )}

          <form onSubmit={handlePublishBlog} className="p-5 bg-[#001a4d] border border-[#d4af37]/25 rounded-sm space-y-3">
            <h5 className="text-xs font-mono font-bold uppercase text-[#d4af37]">Draft New Article</h5>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-[9px] font-mono uppercase text-gray-300 block mb-1">Article Headline</label>
                <input
                  type="text"
                  placeholder="e.g. Demystifying Bail Provisions"
                  value={blogTitle}
                  onChange={(e) => setBlogTitle(e.target.value)}
                  className="w-full bg-[#001233] text-xs text-white border border-[#d4af37]/25 rounded-sm p-2"
                  required
                />
              </div>
              <div>
                <label className="text-[9px] font-mono uppercase text-gray-300 block mb-1">Author Byline</label>
                <input
                  type="text"
                  placeholder="e.g. Legal Research Team"
                  value={blogAuthor}
                  onChange={(e) => setBlogAuthor(e.target.value)}
                  className="w-full bg-[#001233] text-xs text-white border border-[#d4af37]/25 rounded-sm p-2"
                />
              </div>
            </div>
            <div>
              <label className="text-[9px] font-mono uppercase text-gray-300 block mb-1">Article Content (Markdown supported)</label>
              <textarea
                placeholder="Write complete article text..."
                value={blogContent}
                onChange={(e) => setBlogContent(e.target.value)}
                rows={5}
                className="w-full bg-[#001233] text-xs text-white border border-[#d4af37]/25 rounded-sm p-2"
                required
              />
            </div>
            <button
              type="submit"
              className="py-2.5 px-6 bg-[#d4af37] hover:bg-[#b08f25] text-[#001233] font-bold text-xs uppercase rounded-sm cursor-pointer transition-colors"
            >
              Publish Gazette Article
            </button>
          </form>
        </div>
      )}

      {/* 10. SOCIAL STREAM */}
      {activeTab === 'social' && (
        <div className="space-y-6 animate-in fade-in duration-200 text-left">
          <div className="p-4 bg-[#001a4d] border border-[#d4af37]/20 rounded-sm space-y-1">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#d4af37] flex items-center gap-1.5">
              <Sparkles className="w-4 h-4" /> Campaign Social Broadcasts
            </h4>
            <p className="text-[11px] text-gray-300">
              Publish rapid social dispatches across Twitter, LinkedIn, Instagram, and YouTube channels.
            </p>
          </div>

          {socialStatus && (
            <div className="p-3 bg-emerald-950/40 border border-emerald-500/30 text-emerald-400 text-xs rounded-sm">
              {socialStatus}
            </div>
          )}

          <form onSubmit={handleCreateSocialPost} className="p-5 bg-[#001a4d] border border-[#d4af37]/25 rounded-sm space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-[9px] font-mono uppercase text-gray-300 block mb-1">Platform</label>
                <select
                  value={socialPlatform}
                  onChange={(e) => setSocialPlatform(e.target.value as any)}
                  className="w-full bg-[#001233] text-xs text-white border border-[#d4af37]/25 rounded-sm p-2"
                >
                  <option value="twitter">X / Twitter</option>
                  <option value="linkedin">LinkedIn</option>
                  <option value="instagram">Instagram</option>
                  <option value="youtube">YouTube</option>
                  <option value="facebook">Facebook</option>
                </select>
              </div>
              <div>
                <label className="text-[9px] font-mono uppercase text-gray-300 block mb-1">Image URL (Optional)</label>
                <input
                  type="url"
                  placeholder="https://..."
                  value={socialImageUrl}
                  onChange={(e) => setSocialImageUrl(e.target.value)}
                  className="w-full bg-[#001233] text-xs text-white border border-[#d4af37]/25 rounded-sm p-2"
                />
              </div>
            </div>
            <div>
              <label className="text-[9px] font-mono uppercase text-gray-300 block mb-1">Post Content</label>
              <textarea
                placeholder="Type update message..."
                value={socialContent}
                onChange={(e) => setSocialContent(e.target.value)}
                rows={3}
                className="w-full bg-[#001233] text-xs text-white border border-[#d4af37]/25 rounded-sm p-2"
                required
              />
            </div>
            <button
              type="submit"
              className="py-2.5 px-6 bg-[#d4af37] hover:bg-[#b08f25] text-[#001233] font-bold text-xs uppercase rounded-sm cursor-pointer transition-colors"
            >
              Post to Social Stream
            </button>
          </form>

          <div className="space-y-3">
            <h5 className="text-xs font-mono font-bold uppercase text-gray-400">
              Live Feed Stream ({socialPosts.length})
            </h5>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {socialPosts.map((sp) => (
                <div key={sp.id} className="p-4 bg-[#001a4d] border border-[#d4af37]/20 rounded-sm space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[9px] font-mono text-[#d4af37] uppercase font-bold">
                      {sp.platform}
                    </span>
                    <button
                      onClick={() => onDeleteSocialPost(sp.id)}
                      className="text-red-400 hover:text-red-300 p-1 cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <p className="text-xs text-gray-200">{sp.content}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 11. BROADCAST NEWSLETTERS */}
      {activeTab === 'newsletters' && (
        <div className="space-y-6 animate-in fade-in duration-200 text-left">
          <div className="p-4 bg-[#001a4d] border border-[#d4af37]/20 rounded-sm space-y-1">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#d4af37] flex items-center gap-1.5">
              <Mail className="w-4 h-4" /> Supporter Broadcast & Dispatch System
            </h4>
            <p className="text-[11px] text-gray-300">
              Transmit official bulletins to all {subscribers.length} registered campaign supporters.
            </p>
          </div>

          {newsStatus && (
            <div className="p-3 bg-emerald-950/40 border border-emerald-500/30 text-emerald-400 text-xs rounded-sm">
              {newsStatus}
            </div>
          )}

          <form onSubmit={handleCreateNewsletter} className="p-5 bg-[#001a4d] border border-[#d4af37]/25 rounded-sm space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-[9px] font-mono uppercase text-gray-300 block mb-1">Subject</label>
                <input
                  type="text"
                  placeholder="e.g. Constitutional Defense Update #4"
                  value={newsSubject}
                  onChange={(e) => setNewsSubject(e.target.value)}
                  className="w-full bg-[#001233] text-xs text-white border border-[#d4af37]/25 rounded-sm p-2"
                  required
                />
              </div>
              <div>
                <label className="text-[9px] font-mono uppercase text-gray-300 block mb-1">Dispatch Badge</label>
                <input
                  type="text"
                  placeholder="e.g. Urgent Bulletin"
                  value={newsBadge}
                  onChange={(e) => setNewsBadge(e.target.value)}
                  className="w-full bg-[#001233] text-xs text-white border border-[#d4af37]/25 rounded-sm p-2"
                />
              </div>
            </div>
            <div>
              <label className="text-[9px] font-mono uppercase text-gray-300 block mb-1">Dispatch Content</label>
              <textarea
                placeholder="Write email newsletter text..."
                value={newsBody}
                onChange={(e) => setNewsBody(e.target.value)}
                rows={4}
                className="w-full bg-[#001233] text-xs text-white border border-[#d4af37]/25 rounded-sm p-2"
                required
              />
            </div>
            <button
              type="submit"
              disabled={isSendingNews}
              className="py-2.5 px-6 bg-[#d4af37] hover:bg-[#b08f25] disabled:opacity-50 text-[#001233] font-bold text-xs uppercase rounded-sm cursor-pointer transition-colors"
            >
              {isSendingNews ? "Transmitting..." : "Broadcast Newsletter"}
            </button>
          </form>
        </div>
      )}

      {/* 12. SUPPORTERS (CSV) */}
      {activeTab === 'subs' && (
        <div className="space-y-6 animate-in fade-in duration-200 text-left">
          <div className="p-4 bg-[#001a4d] border border-[#d4af37]/20 rounded-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#d4af37] flex items-center gap-1.5">
                <Users className="w-4 h-4" /> Registered Supporter Email Pool ({subscribers.length})
              </h4>
              <p className="text-[11px] text-gray-300">
                Manage registered citizen emails and export CSV lists for external dispatch tools.
              </p>
            </div>
            <button
              onClick={handleDownloadSubs}
              className="py-2 px-4 bg-[#d4af37] hover:bg-[#b08f25] text-[#001233] font-bold text-xs uppercase rounded-sm cursor-pointer flex items-center gap-1.5"
            >
              <Download className="w-3.5 h-3.5" /> Export CSV
            </button>
          </div>

          <form onSubmit={handleManualAddSubscriber} className="flex gap-2">
            <input
              type="email"
              placeholder="Add supporter email manually..."
              value={newSubEmail}
              onChange={(e) => setNewSubEmail(e.target.value)}
              className="flex-1 bg-[#001233] text-xs text-white border border-[#d4af37]/25 rounded-sm p-2"
            />
            <button
              type="submit"
              disabled={isAddingSub}
              className="py-2 px-4 bg-[#001a4d] hover:bg-[#d4af37]/20 text-[#d4af37] border border-[#d4af37]/30 font-bold text-xs uppercase rounded-sm cursor-pointer"
            >
              Add Supporter
            </button>
          </form>
          {subAddStatus && <p className="text-xs text-emerald-400 font-mono">{subAddStatus}</p>}

          <div className="max-h-80 overflow-y-auto space-y-1.5 border border-[#d4af37]/15 p-2 rounded-sm bg-[#001233]">
            {subscribers.map((s) => (
              <div key={s.id} className="p-2 bg-[#001a4d] rounded-sm flex items-center justify-between text-xs">
                <span className="font-mono text-gray-200">{s.email}</span>
                <div className="flex items-center gap-3 text-[10px] text-gray-400">
                  <span>{s.subscribedAt}</span>
                  <button
                    onClick={() => onDeleteSubscriber(s.id)}
                    className="text-red-400 hover:text-red-300 cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 13. MAIL LOGS */}
      {activeTab === 'mails' && (
        <div className="space-y-6 animate-in fade-in duration-200 text-left">
          <div className="p-4 bg-[#001a4d] border border-[#d4af37]/20 rounded-sm space-y-1">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#d4af37] flex items-center gap-1.5">
              <Mail className="w-4 h-4" /> Outbound Email Notification Log & Sandbox
            </h4>
            <p className="text-[11px] text-gray-300">
              Audit all alert dispatches sent to campaign coordinators when citizens ask questions.
            </p>
          </div>

          <div className="space-y-2">
            {notificationLogs.length === 0 ? (
              <p className="text-xs text-gray-400 font-mono p-4 bg-[#001a4d] rounded-sm text-center">
                No outbound mail logs recorded yet.
              </p>
            ) : (
              notificationLogs.map((log) => (
                <div key={log.id} className="p-4 bg-[#001a4d] border border-[#d4af37]/20 rounded-sm space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[9px] font-mono text-[#d4af37]">{log.timestamp}</span>
                    <span className="text-[9px] font-mono text-emerald-400 font-bold uppercase">{log.status}</span>
                  </div>
                  <h6 className="text-xs font-serif font-bold text-white">{log.subject}</h6>
                  <p className="text-[11px] font-mono text-gray-300 whitespace-pre-line bg-black/30 p-2 rounded-sm">{log.body}</p>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* 14. PASSCODE SECURITY & MASTER LOCK */}
      {activeTab === 'passcode' && (
        <div className="space-y-6 animate-in fade-in duration-200 text-left">
          <div className="p-4 bg-[#001a4d] border border-[#d4af37]/20 rounded-sm space-y-1">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#d4af37] flex items-center gap-1.5">
              <Lock className="w-4 h-4" /> Manager's Lock Security & Master Key
            </h4>
            <p className="text-[11px] text-gray-300">
              Change the administrative master passcode to control access to this Operations Center.
            </p>
          </div>

          {passcodeStatus && (
            <div className="p-3 bg-emerald-950/40 border border-emerald-500/30 text-emerald-400 text-xs rounded-sm">
              {passcodeStatus}
            </div>
          )}

          <form onSubmit={handleSavePasscode} className="p-5 bg-[#001a4d] border border-[#d4af37]/25 rounded-sm space-y-4 max-w-md">
            <div>
              <label className="text-[10px] font-mono uppercase text-[#d4af37] block mb-1">
                New Master Passcode
              </label>
              <input
                type="text"
                value={newPasscode}
                onChange={(e) => setNewPasscode(e.target.value)}
                className="w-full bg-[#001233] text-sm text-white font-mono border border-[#d4af37]/25 focus:border-[#d4af37] rounded-sm p-2.5"
                placeholder="Enter new secret passcode..."
                required
              />
              <span className="text-[9px] text-gray-400 mt-1 block">
                Current default is 'lol12ymn'. Changing it immediately updates server records.
              </span>
            </div>

            <button
              type="submit"
              className="py-2.5 px-6 bg-[#d4af37] hover:bg-[#b08f25] text-[#001233] font-bold text-xs uppercase rounded-sm cursor-pointer transition-colors shadow-md"
            >
              Update Passcode Key
            </button>
          </form>
        </div>
      )}

      {/* 15. BACKUP, DIRECT JSON PASTE & GITHUB SYNC */}
      {activeTab === 'backup' && (
        <div className="space-y-6 animate-in fade-in duration-200 text-left">
          <div className="p-4 bg-[#001a4d] border border-[#d4af37]/20 rounded-sm space-y-1">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#d4af37] flex items-center gap-1.5">
              <RefreshCw className="w-4 h-4" /> Live JSON Backup, Direct Paste Updater & Version Control
            </h4>
            <p className="text-[11px] text-gray-300">
              Copy and paste JSON directly on this website to update everything in real-time, inspect backup snapshots, or commit to GitHub.
            </p>
          </div>

          {/* EXPLANATORY NOTE ON THE TWO BACKUP FILES */}
          <div className="p-4 bg-[#001233] border border-[#d4af37]/35 rounded-sm space-y-2">
            <div className="flex items-center gap-2">
              <span className="p-1 rounded-full bg-[#d4af37]/20 text-[#d4af37]">
                <FileCode className="w-4 h-4" />
              </span>
              <h5 className="text-xs font-bold uppercase tracking-wider text-[#d4af37]">
                About Your Two Backup Files: civic_data (1).json vs civic_data (2).json
              </h5>
            </div>
            <p className="text-[11px] text-gray-300 leading-relaxed">
              When you download data snapshots sequentially, browsers append <code className="bg-black/40 px-1 py-0.5 text-[#d4af37] font-mono rounded">(1)</code> and <code className="bg-black/40 px-1 py-0.5 text-[#d4af37] font-mono rounded">(2)</code>. 
              <br />
              • <strong className="text-white">civic_data (2).json</strong> is your <strong className="text-emerald-400">newest & most complete snapshot</strong> (428 lines, containing your registered subscribers, case precedents, book reviews, and all recent social posts).
              <br />
              • <strong className="text-white">civic_data (1).json</strong> is an earlier snapshot (374 lines).
              <br />
              You can simply click <strong className="text-[#d4af37]">"1-Click Apply"</strong> below or copy-paste the text directly into the box!
            </p>
          </div>

          {/* 1. DIRECT COPY & PASTE JSON UPDATER (USER FEATURE) */}
          <div className="p-5 bg-[#001a4d] border-2 border-[#d4af37]/40 rounded-sm space-y-4 shadow-lg">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#d4af37]/20 pb-3">
              <div>
                <h5 className="text-xs font-mono font-bold uppercase text-white flex items-center gap-2">
                  <Code2 className="w-4 h-4 text-[#d4af37]" /> Direct JSON Copy & Paste Updater
                  <span className="text-[10px] bg-[#d4af37]/20 text-[#d4af37] px-2 py-0.5 rounded-full font-sans uppercase">
                    Live Real-Time
                  </span>
                </h5>
                <p className="text-[11px] text-gray-300 font-light">
                  Copy and paste any civic data JSON below. It validates automatically and updates the entire website live with one click.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleCopyLiveJson}
                  className="py-1.5 px-3 bg-[#001233] hover:bg-[#d4af37]/20 text-[#d4af37] border border-[#d4af37]/35 text-[11px] font-mono uppercase rounded-sm flex items-center gap-1.5 cursor-pointer transition-colors"
                  title="Copy current live website JSON to your clipboard"
                >
                  {copyJsonSuccess ? (
                    <>
                      <ClipboardCheck className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400 font-bold">Copied Live JSON!</span>
                    </>
                  ) : (
                    <>
                      <ClipboardCopy className="w-3.5 h-3.5" />
                      <span>Copy Live JSON</span>
                    </>
                  )}
                </button>

                {pasteJsonText && (
                  <button
                    type="button"
                    onClick={() => {
                      try {
                        const formatted = JSON.stringify(JSON.parse(pasteJsonText), null, 2);
                        handlePasteTextChange(formatted);
                      } catch (e) {
                        alert("Cannot format: Invalid JSON syntax.");
                      }
                    }}
                    className="py-1.5 px-2.5 bg-[#001233] hover:bg-[#d4af37]/20 text-gray-300 border border-[#d4af37]/20 text-[11px] font-mono rounded-sm cursor-pointer"
                  >
                    Prettify
                  </button>
                )}

                {pasteJsonText && (
                  <button
                    type="button"
                    onClick={() => {
                      setPasteJsonText("");
                      setJsonValidation(null);
                      setPasteJsonResult(null);
                    }}
                    className="py-1.5 px-2.5 bg-red-950/40 hover:bg-red-900/60 text-red-300 border border-red-500/30 text-[11px] font-mono rounded-sm cursor-pointer"
                  >
                    Clear
                  </button>
                )}
              </div>
            </div>

            {/* Live Result Feedback Alert */}
            {pasteJsonResult && (
              <div className={`p-3 rounded-sm text-xs border ${
                pasteJsonResult.success 
                  ? "bg-emerald-950/40 border-emerald-500/40 text-emerald-300" 
                  : "bg-red-950/40 border-red-500/40 text-red-300"
              }`}>
                {pasteJsonResult.message}
              </div>
            )}

            {/* The Monospace JSON Paste Textarea */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-mono text-[#d4af37] uppercase flex items-center justify-between">
                <span>Paste JSON Code Stream Here:</span>
                <span className="text-gray-400 text-[9px] font-sans">
                  {pasteJsonText.length > 0 ? `${pasteJsonText.length.toLocaleString()} characters` : "Empty (Paste text or click Inspect on any backup below)"}
                </span>
              </label>
              <textarea
                value={pasteJsonText}
                onChange={(e) => handlePasteTextChange(e.target.value)}
                placeholder="Paste your JSON here (e.g. from civic_data (2).json or civic_data (1).json)..."
                rows={10}
                className="w-full bg-[#000d24] text-gray-100 font-mono text-xs border border-[#d4af37]/30 focus:border-[#d4af37] rounded-sm p-3 focus:outline-none leading-relaxed selection:bg-[#d4af37]/30"
                spellCheck={false}
              />
            </div>

            {/* Validation Pill & Status Indicator */}
            {jsonValidation && (
              <div className={`p-2.5 rounded-sm text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-2 border ${
                jsonValidation.valid 
                  ? "bg-emerald-950/30 border-emerald-500/30 text-emerald-400" 
                  : "bg-amber-950/30 border-amber-500/30 text-amber-400"
              }`}>
                <div className="flex items-center gap-2">
                  {jsonValidation.valid ? <CheckCircle className="w-4 h-4 text-emerald-400" /> : <AlertTriangle className="w-4 h-4 text-amber-400" />}
                  <span className="font-bold font-mono text-[11px]">{jsonValidation.message}</span>
                </div>
                {jsonValidation.details && (
                  <span className="text-[10px] text-gray-300 font-mono bg-black/40 px-2 py-1 rounded-sm">
                    {jsonValidation.details}
                  </span>
                )}
              </div>
            )}

            {/* Action Button */}
            <div className="pt-1">
              <button
                type="button"
                onClick={handleApplyPastedJson}
                disabled={isApplyingJson || !pasteJsonText.trim() || (jsonValidation !== null && !jsonValidation.valid)}
                className="w-full py-3 px-6 bg-[#d4af37] hover:bg-[#b08f25] disabled:opacity-40 disabled:cursor-not-allowed text-[#001233] font-bold text-xs uppercase tracking-wider rounded-sm flex items-center justify-center gap-2 cursor-pointer transition-all shadow-md"
              >
                {isApplyingJson ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Validating & Updating Website...</span>
                  </>
                ) : (
                  <>
                    <CheckSquare className="w-4 h-4" />
                    <span>Apply Pasted JSON & Update Website Now 🛡️</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* 2. DETECTED WORKSPACE BACKUP FILES EXPLORER */}
          <div className="p-5 bg-[#001a4d] border border-[#d4af37]/25 rounded-sm space-y-4">
            <div className="flex items-center justify-between border-b border-[#d4af37]/15 pb-2">
              <div>
                <h5 className="text-xs font-mono font-bold uppercase text-[#d4af37] flex items-center gap-1.5">
                  <FileJson className="w-4 h-4" /> Available Workspace Backup Files
                </h5>
                <p className="text-[11px] text-gray-300 font-light">
                  Inspect or restore backup files discovered in the app environment.
                </p>
              </div>
              <button
                type="button"
                onClick={fetchServerBackups}
                disabled={isLoadingBackups}
                className="text-[10px] font-mono text-[#d4af37] hover:underline flex items-center gap-1 cursor-pointer"
              >
                <RefreshCw className={`w-3 h-3 ${isLoadingBackups ? "animate-spin" : ""}`} /> Refresh List
              </button>
            </div>

            {serverBackups.length === 0 ? (
              <p className="text-xs text-gray-400 font-mono p-3 bg-[#001233] rounded-sm text-center">
                {isLoadingBackups ? "Scanning workspace backup files..." : "No civic_data*.json files detected yet."}
              </p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {serverBackups.map((f) => (
                  <div 
                    key={f.filename} 
                    className={`p-3 bg-[#001233] border rounded-sm space-y-2 flex flex-col justify-between ${
                      f.isLatest ? "border-emerald-500/50 ring-1 ring-emerald-500/30" : "border-[#d4af37]/25"
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between gap-1 mb-1">
                        <span className="font-mono text-xs font-bold text-white truncate" title={f.filename}>
                          {f.filename}
                        </span>
                        {f.isLatest && (
                          <span className="text-[9px] bg-emerald-500/20 text-emerald-400 font-mono px-1.5 py-0.5 rounded font-bold uppercase">
                            Latest
                          </span>
                        )}
                      </div>
                      <div className="text-[10px] text-gray-400 space-y-0.5 font-mono">
                        <div>Size: <span className="text-gray-200">{f.sizeKb}</span></div>
                        <div>Modified: <span className="text-gray-200">{f.modifiedAt}</span></div>
                        <div className="text-[9px] text-[#d4af37] mt-1 line-clamp-2">{f.summary}</div>
                      </div>
                    </div>

                    <div className="pt-2 flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => handleLoadBackupToEditor(f.filename)}
                        className="flex-1 py-1.5 px-2 bg-[#001a4d] hover:bg-[#d4af37]/20 text-[#d4af37] border border-[#d4af37]/30 text-[10px] font-mono uppercase rounded-sm cursor-pointer transition-colors text-center"
                        title="Load into the copy-paste box above"
                      >
                        Inspect
                      </button>
                      <button
                        type="button"
                        onClick={() => handleApplyBackupFileDirectly(f.filename)}
                        className="flex-1 py-1.5 px-2 bg-emerald-700 hover:bg-emerald-600 text-white font-bold text-[10px] font-mono uppercase rounded-sm cursor-pointer transition-colors text-center shadow"
                        title="Directly restore and apply to website"
                      >
                        1-Click Apply
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* 3. CONVENTIONAL DOWNLOAD & FILE UPLOAD BUTTONS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-5 bg-[#001a4d] border border-[#d4af37]/25 rounded-sm space-y-3">
              <h5 className="text-xs font-mono font-bold uppercase text-[#d4af37] flex items-center gap-1.5">
                <Download className="w-3.5 h-3.5" /> Download JSON Backup File
              </h5>
              <p className="text-[11px] text-gray-300 font-light">
                Save an offline `.json` snapshot of your current live database to your computer.
              </p>
              <button
                onClick={handleExportJSON}
                className="py-2 px-4 bg-[#d4af37] hover:bg-[#b08f25] text-[#001233] font-bold text-xs uppercase rounded-sm cursor-pointer transition-colors"
              >
                Download JSON Backup
              </button>
            </div>

            <div className="p-5 bg-[#001a4d] border border-[#d4af37]/25 rounded-sm space-y-3">
              <h5 className="text-xs font-mono font-bold uppercase text-[#d4af37] flex items-center gap-1.5">
                <FileUp className="w-3.5 h-3.5" /> Upload File from Computer
              </h5>
              <p className="text-[11px] text-gray-300 font-light">
                Select a local `.json` file from your device to restore the website.
              </p>
              <label className="inline-block py-2 px-4 bg-[#001233] hover:bg-[#d4af37]/20 text-[#d4af37] border border-[#d4af37]/30 font-bold text-xs uppercase rounded-sm cursor-pointer transition-colors">
                Choose Backup File
                <input type="file" accept=".json" onChange={handleImportJSON} className="hidden" />
              </label>
            </div>
          </div>

          {/* 4. GITHUB REPOSITORY SYNC */}
          <div className="p-5 bg-[#001a4d] border border-[#d4af37]/25 rounded-sm space-y-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-[#d4af37]/15 pb-4">
              <div>
                <h5 className="text-xs font-mono font-bold uppercase text-white flex items-center gap-1.5">
                  <Github className="w-4 h-4 text-[#d4af37]" /> GitHub Version Control Synchronization
                </h5>
                <p className="text-[11px] text-gray-300 font-light">
                  Push your live campaign database directly to your GitHub repository.
                </p>
              </div>
              {gitUser ? (
                <div className="flex items-center gap-2 bg-[#001233] p-1.5 px-3 border border-[#d4af37]/20 rounded-sm">
                  <img src={gitUser.avatarUrl} alt="GitHub avatar" className="w-6 h-6 rounded-full border border-[#d4af37]/30" referrerPolicy="no-referrer" />
                  <span className="text-xs font-bold text-white">@{gitUser.username}</span>
                  <button onClick={handleDisconnectGit} className="text-gray-400 hover:text-red-400 ml-2" title="Disconnect">
                    <LogOut className="w-3.5 h-3.5" />
                  </button>
                </div>
              ) : (
                <button
                  onClick={handleConnectOAuth}
                  className="py-2 px-4 bg-white hover:bg-gray-100 text-[#001233] font-bold text-xs uppercase rounded-sm cursor-pointer transition-colors flex items-center gap-1.5"
                >
                  <Github className="w-3.5 h-3.5" /> OAuth Connect
                </button>
              )}
            </div>

            {gitSyncStatus && (
              <div className="p-3 bg-[#001233] border border-[#d4af37]/30 rounded-sm text-xs text-gray-200">
                {gitSyncStatus}
              </div>
            )}

            {gitToken && (
              <div className="space-y-3 pt-2">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="text-[9px] font-mono text-[#d4af37] uppercase block mb-1">Target Repository</label>
                    <input
                      type="text"
                      placeholder="owner/repo"
                      value={selectedRepo}
                      onChange={(e) => setSelectedRepo(e.target.value)}
                      className="w-full bg-[#001233] text-xs text-white border border-[#d4af37]/25 rounded-sm p-2 font-mono"
                    />
                  </div>
                  <div>
                    <label className="text-[9px] font-mono text-[#d4af37] uppercase block mb-1">Branch</label>
                    <input
                      type="text"
                      placeholder="main"
                      value={gitBranch}
                      onChange={(e) => setGitBranch(e.target.value)}
                      className="w-full bg-[#001233] text-xs text-white border border-[#d4af37]/25 rounded-sm p-2 font-mono"
                    />
                  </div>
                  <div>
                    <label className="text-[9px] font-mono text-[#d4af37] uppercase block mb-1">File Target</label>
                    <input
                      type="text"
                      placeholder="civic_data.json"
                      value={gitPath}
                      onChange={(e) => setGitPath(e.target.value)}
                      className="w-full bg-[#001233] text-xs text-white border border-[#d4af37]/25 rounded-sm p-2 font-mono"
                    />
                  </div>
                </div>

                <button
                  onClick={handleSyncToGitHub}
                  disabled={isGitSyncing || !selectedRepo}
                  className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white font-bold text-xs uppercase tracking-wider rounded-sm flex items-center justify-center gap-2 cursor-pointer transition-colors shadow-md"
                >
                  <Github className="w-4 h-4" /> Push civic_data.json to GitHub Repository 🛡️
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
