import React, { useState } from "react";
import { Twitter, Facebook, Linkedin, Mail, Link, Check } from "lucide-react";

interface SocialShareProps {
  title: string;
  text?: string;
  shareUrl?: string;
  inline?: boolean;
}

export default function SocialShare({ title, text = "", shareUrl, inline = false }: SocialShareProps) {
  const [copied, setCopied] = useState(false);

  // Fallback shared URL
  const actualUrl = shareUrl || window.location.href;
  const encodedUrl = encodeURIComponent(actualUrl);
  const encodedTitle = encodeURIComponent(title);
  const encodedText = encodeURIComponent(text);

  const shareLinks = [
    {
      name: "Twitter",
      icon: <Twitter className="w-3.5 h-3.5" />,
      url: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
      color: "hover:bg-sky-500/10 hover:text-sky-400 border-sky-500/20",
    },
    {
      name: "Facebook",
      icon: <Facebook className="w-3.5 h-3.5" />,
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      color: "hover:bg-blue-600/10 hover:text-blue-500 border-blue-500/20",
    },
    {
      name: "LinkedIn",
      icon: <Linkedin className="w-3.5 h-3.5" />,
      url: `https://www.linkedin.com/shareArticle?mini=true&url=${encodedUrl}&title=${encodedTitle}`,
      color: "hover:bg-blue-700/10 hover:text-blue-400 border-blue-500/20",
    },
    {
      name: "Email",
      icon: <Mail className="w-3.5 h-3.5" />,
      url: `mailto:?subject=${encodedTitle}&body=${encodedText}%0A%0ARead%20more%20here%3A%20${encodedUrl}`,
      color: "hover:bg-emerald-500/10 hover:text-emerald-400 border-emerald-500/20",
    },
  ];

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(actualUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy url: ", err);
    }
  };

  if (inline) {
    return (
      <div id="social-share-inline" className="flex items-center gap-1.5 flex-wrap">
        <span className="text-[10px] font-mono uppercase text-gray-400 mr-1.5 select-none">Share:</span>
        {shareLinks.map((link) => (
          <a
            key={link.name}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            referrerPolicy="no-referrer"
            className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full border border-gray-100/10 bg-[#001233]/40 flex items-center justify-center text-gray-300 transition-all ${link.color}`}
            title={`Share on ${link.name}`}
          >
            {link.icon}
          </a>
        ))}
        <button
          onClick={handleCopyLink}
          className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full border flex items-center justify-center transition-all cursor-pointer ${
            copied
              ? "bg-emerald-500/20 border-emerald-500 text-emerald-400"
              : "border-gray-100/10 bg-[#001233]/40 text-gray-300 hover:bg-gray-100/10 hover:text-white"
          }`}
          title="Copy post link"
        >
          {copied ? <Check className="w-3.5 h-3.5" /> : <Link className="w-3.5 h-3.5" />}
        </button>
      </div>
    );
  }

  return (
    <div id="social-share-box" className="p-3 bg-[#001233]/80 border border-[#d4af37]/15 rounded-sm flex items-center justify-between gap-4">
      <span className="text-[10px] font-mono uppercase text-[#d4af37] select-none tracking-widest font-semibold">Share Update:</span>
      <div className="flex items-center gap-1.5">
        {shareLinks.map((link) => (
          <a
            key={link.name}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            referrerPolicy="no-referrer"
            className={`w-7 h-7 rounded-sm border bg-[#001a4d] flex items-center justify-center text-gray-300 transition-all ${link.color}`}
            title={`Share on ${link.name}`}
          >
            {link.icon}
          </a>
        ))}
        <button
          onClick={handleCopyLink}
          className={`w-7 h-7 rounded-sm border flex items-center justify-center transition-all cursor-pointer ${
            copied
              ? "bg-emerald-500/25 border-emerald-500 text-emerald-400"
              : "border-gray-100/10 bg-[#001a4d] text-gray-300 hover:border-[#d4af37]/35 hover:text-[#d4af37]"
          }`}
          title="Copy post link"
        >
          {copied ? <Check className="w-3.5 h-3.5" /> : <Link className="w-3.5 h-3.5" />}
        </button>
      </div>
    </div>
  );
}
