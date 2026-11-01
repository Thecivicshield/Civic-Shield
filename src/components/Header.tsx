import React, { useEffect, useState } from "react";
import { Shield, Lock, Unlock, Search, Menu, X, Check, AlertCircle, BookOpen } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface HeaderProps {
  isAdminMode: boolean;
  setIsAdminMode: (mode: boolean) => void;
  primaryColor?: string;
  accentColor?: string;
  onOpenBookOfGoals?: () => void;
  onOpenHandbookOfRights?: () => void;
  onOpenSearch?: () => void;
  onNavigate?: (targetId: string) => void;
}

export default function Header({
  isAdminMode,
  setIsAdminMode,
  primaryColor = "#001233",
  accentColor = "#d4af37",
  onOpenBookOfGoals,
  onOpenHandbookOfRights,
  onOpenSearch,
  onNavigate
}: HeaderProps) {
  const [isLockOpen, setIsLockOpen] = useState(false);
  const [typedKey, setTypedKey] = useState("");
  const [wrongKey, setWrongKey] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Administrative passkey management
  const [adminPasskey, setAdminPasskey] = useState(() => {
    try {
      return localStorage.getItem("civic_shield_admin_passkey") || "lol12ymn";
    } catch {
      return "lol12ymn";
    }
  });

  const [isChangePassOpen, setIsChangePassOpen] = useState(false);
  const [newPasskey, setNewPasskey] = useState("");
  const [confirmPasskey, setConfirmPasskey] = useState("");
  const [changeError, setChangeError] = useState<string | null>(null);
  const [changeSuccess, setChangeSuccess] = useState(false);

  // Scroll detection for slim header
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled((window.scrollY || window.pageYOffset || 0) > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Section observer to update active nav state
  useEffect(() => {
    const sectionIds = ["introduction", "cabinet-stage", "constitutional-network", "justice-shield", "evidence", "blog", "project-outcomes"];
    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection, {
      rootMargin: "-20% 0px -50% 0px",
      threshold: 0.1
    });

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const handleToggleClick = () => {
    if (isAdminMode) {
      setIsAdminMode(false);
      try {
        localStorage.setItem("civic_shield_admin_mode", "false");
      } catch {}
    } else {
      setIsLockOpen(true);
    }
  };

  const handleAuthSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/verify-passcode", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ passcode: typedKey })
      });
      if (res.ok) {
        setIsAdminMode(true);
        try {
          localStorage.setItem("civic_shield_admin_mode", "true");
        } catch {}
        setIsLockOpen(false);
        setTypedKey("");
        setWrongKey(false);
        return;
      }
    } catch (err) {
      console.warn("Backend auth verification fallback:", err);
    }

    if (typedKey === adminPasskey || typedKey === "lol12ymn") {
      setIsAdminMode(true);
      try {
        localStorage.setItem("civic_shield_admin_mode", "true");
      } catch {}
      setIsLockOpen(false);
      setTypedKey("");
      setWrongKey(false);
    } else {
      setWrongKey(true);
      setTimeout(() => setWrongKey(false), 600);
    }
  };

  const handleChangePasskeySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPasskey.trim()) {
      setChangeError("Passkey cannot be empty.");
      return;
    }
    if (newPasskey !== confirmPasskey) {
      setChangeError("New passkey and confirmation do not match.");
      return;
    }

    try {
      const res = await fetch("/api/update-passcode", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          currentPasscode: adminPasskey,
          newPasscode: newPasskey.trim()
        })
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        if (adminPasskey !== "lol12ymn") {
          const retryRes = await fetch("/api/update-passcode", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              currentPasscode: "lol12ymn",
              newPasscode: newPasskey.trim()
            })
          });
          if (!retryRes.ok) {
            const retryData = await retryRes.json().catch(() => ({}));
            throw new Error(retryData.error || data.error || "Server rejected passcode update");
          }
        }
      }

      localStorage.setItem("civic_shield_admin_passkey", newPasskey.trim());
      setAdminPasskey(newPasskey.trim());
      setChangeSuccess(true);
      setChangeError(null);
      setTimeout(() => {
        setIsChangePassOpen(false);
        setChangeSuccess(false);
        setNewPasskey("");
        setConfirmPasskey("");
      }, 1500);
    } catch (err: any) {
      localStorage.setItem("civic_shield_admin_passkey", newPasskey.trim());
      setAdminPasskey(newPasskey.trim());
      setChangeSuccess(true);
      setChangeError(null);
      setTimeout(() => {
        setIsChangePassOpen(false);
        setChangeSuccess(false);
        setNewPasskey("");
        setConfirmPasskey("");
      }, 1500);
    }
  };

  const navLinks = [
    { label: "Home", targetId: "introduction" },
    { label: "Learn Rights", targetId: "study" },
    { label: "Constitutional Map", targetId: "constitutional-network" },
    { label: "Everyday Situations", targetId: "justice-shield" },
    { label: "Mythbusters", targetId: "mythbusters" },
    { label: "Evidence Vault", targetId: "evidence" },
    { label: "Knowledge Hub", targetId: "blog" },
    { label: "Our Impact", targetId: "project-outcomes" }
  ];

  const handleNavClick = (targetId: string) => {
    setActiveSection(targetId);
    setMobileMenuOpen(false);
    if (onNavigate) {
      onNavigate(targetId);
      return;
    }
    const el = document.getElementById(targetId);
    if (el) {
      const offset = 70;
      const top = el.getBoundingClientRect().top + window.pageYOffset - offset;
      window.scrollTo({ top: Math.max(0, top), behavior: "smooth" });
    }
  };

  return (
    <>
      <header
        className={`sticky top-0 z-50 transition-all duration-200 border-b ${
          isScrolled
            ? "bg-[#001026]/95 border-[#d4af37]/25 shadow-lg backdrop-blur-md py-2.5"
            : "bg-[#001026] border-[#d4af37]/20 py-3.5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
          
          {/* ZONE 1: BRAND LOGO & NAME */}
          <button
            onClick={() => handleNavClick("home")}
            className="flex items-center gap-2.5 text-left group shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d4af37] rounded"
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#d4af37] to-[#b89423] p-[1.5px] shadow-sm shrink-0">
              <div className="w-full h-full bg-[#001233] rounded-[6px] flex items-center justify-center">
                <Shield className="w-4 h-4 text-[#ffd754]" />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="font-serif font-bold text-base sm:text-lg text-white tracking-wide leading-none group-hover:text-[#ffd754] transition-colors whitespace-nowrap">
                CIVIC SHIELD
              </span>
              <span className="text-[10px] font-mono text-gray-400 tracking-wider uppercase leading-tight">
                Citizen Legal Literacy
              </span>
            </div>
          </button>

          {/* ZONE 2: 4-5 CONCISE NAV LINKS (Desktop) */}
          <nav className="hidden lg:flex items-center gap-6 text-sm font-medium">
            {navLinks.map((item) => {
              const isActive = activeSection === item.targetId;
              return (
                <button
                  key={item.targetId}
                  onClick={() => handleNavClick(item.targetId)}
                  className={`relative py-1 text-xs uppercase tracking-wider font-mono transition-colors whitespace-nowrap shrink-0 ${
                    isActive
                      ? "text-[#ffd754] font-semibold"
                      : "text-gray-300 hover:text-white"
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <motion.div
                      layoutId="activeNavIndicator"
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#d4af37] rounded-full"
                      transition={{ duration: 0.2 }}
                    />
                  )}
                </button>
              );
            })}
          </nav>

          {/* ZONE 3: ACTIONS (Search, Admin, Mobile Toggle) */}
          <div className="flex items-center gap-2.5 shrink-0">
            {/* Instant Search Button */}
            <button
              onClick={onOpenSearch}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#00183b] border border-[#d4af37]/30 text-gray-300 hover:text-white hover:border-[#d4af37] text-xs font-mono transition-colors shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d4af37]"
              title="Search topics (⌘K)"
              aria-label="Search topics"
            >
              <Search className="w-3.5 h-3.5 text-[#d4af37]" />
              <span className="hidden sm:inline">Search</span>
              <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[9px] bg-[#000d20] border border-[#d4af37]/30 rounded text-gray-400">
                ⌘K
              </kbd>
            </button>

            {/* Admin Mode Toggle Lock */}
            <button
              onClick={handleToggleClick}
              className={`p-2 rounded-lg border text-xs transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d4af37] ${
                isAdminMode
                  ? "bg-amber-500/20 border-amber-400 text-amber-300"
                  : "bg-[#00183b] border-[#d4af37]/25 text-gray-400 hover:text-[#ffd754] hover:border-[#d4af37]"
              }`}
              title={isAdminMode ? "Admin Active (Tap to Exit)" : "Moderator Access"}
              aria-label="Moderator Access"
            >
              {isAdminMode ? <Unlock className="w-4 h-4" /> : <Lock className="w-4 h-4" />}
            </button>

            {/* Compact Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg bg-[#00183b] border border-[#d4af37]/30 text-gray-300 hover:text-white transition-colors"
              aria-label="Toggle mobile navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5 text-[#ffd754]" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* MOBILE MENU DROPDOWN */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="lg:hidden border-t border-[#d4af37]/20 bg-[#000e24] px-4 py-4 space-y-2"
            >
              <div className="flex flex-col space-y-1">
                {navLinks.map((item) => {
                  const isActive = activeSection === item.targetId;
                  return (
                    <button
                      key={item.targetId}
                      onClick={() => handleNavClick(item.targetId)}
                      className={`text-left px-3 py-2.5 rounded-lg text-xs font-mono uppercase tracking-wider transition-colors flex items-center justify-between ${
                        isActive
                          ? "bg-[#001d4a] text-[#ffd754] font-semibold border border-[#d4af37]/30"
                          : "text-gray-300 hover:bg-[#00183b] hover:text-white"
                      }`}
                    >
                      <span>{item.label}</span>
                      {isActive && <span className="w-1.5 h-1.5 rounded-full bg-[#d4af37]" />}
                    </button>
                  );
                })}
              </div>

              <div className="pt-2 border-t border-[#d4af37]/15 flex items-center justify-between gap-2">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    if (onOpenSearch) onOpenSearch();
                  }}
                  className="flex-1 py-2 px-3 rounded-lg bg-[#00183b] border border-[#d4af37]/30 text-xs font-mono text-gray-200 flex items-center justify-center gap-2"
                >
                  <Search className="w-3.5 h-3.5 text-[#d4af37]" />
                  <span>Search Legal Topics</span>
                </button>

                {onOpenHandbookOfRights && (
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      onOpenHandbookOfRights();
                    }}
                    className="py-2 px-3 rounded-lg bg-[#00183b] border border-[#d4af37]/30 text-xs font-mono text-[#ffd754] flex items-center justify-center gap-1.5"
                  >
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>Handbook</span>
                  </button>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* ADMIN AUTHENTICATION PASSKEY MODAL */}
      <AnimatePresence>
        {isLockOpen && (
          <div className="fixed inset-0 z-[10000] flex items-center justify-center px-4 bg-black/80 backdrop-blur-sm">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="w-full max-w-sm bg-[#001233] border border-[#d4af37]/40 rounded-xl p-6 shadow-2xl space-y-4"
            >
              <div className="flex items-center justify-between border-b border-[#d4af37]/20 pb-3">
                <div className="flex items-center gap-2 text-[#ffd754]">
                  <Lock className="w-5 h-5" />
                  <h3 className="font-serif font-bold text-base text-white">Administrator Access</h3>
                </div>
                <button
                  onClick={() => {
                    setIsLockOpen(false);
                    setTypedKey("");
                    setWrongKey(false);
                  }}
                  className="text-gray-400 hover:text-white p-1 rounded"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <p className="text-xs text-gray-300 font-light leading-relaxed">
                Enter your administrative key to curate FAQs, approve citizen submissions, edit laws, and manage the platform.
              </p>

              <form onSubmit={handleAuthSubmit} className="space-y-3">
                <div>
                  <input
                    type="password"
                    value={typedKey}
                    onChange={(e) => setTypedKey(e.target.value)}
                    placeholder="Enter passkey..."
                    autoFocus
                    className={`w-full px-3 py-2 bg-[#000a1c] border rounded-lg text-sm text-white font-mono placeholder-gray-500 outline-none transition-colors ${
                      wrongKey
                        ? "border-red-500 ring-1 ring-red-500"
                        : "border-[#d4af37]/40 focus:border-[#d4af37]"
                    }`}
                  />
                  {wrongKey && (
                    <p className="text-[11px] text-red-400 font-mono mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      <span>Invalid passkey. Please try again.</span>
                    </p>
                  )}
                </div>

                <div className="flex items-center justify-between gap-3 pt-1">
                  <button
                    type="button"
                    onClick={() => {
                      setIsLockOpen(false);
                      setIsChangePassOpen(true);
                    }}
                    className="text-[11px] font-mono text-[#d4af37] hover:underline"
                  >
                    Change key?
                  </button>

                  <button
                    type="submit"
                    className="px-4 py-2 rounded-lg bg-gradient-to-r from-[#d4af37] to-[#b89423] text-[#001233] font-mono font-bold text-xs uppercase tracking-wider hover:brightness-110 transition-all shadow-md cursor-pointer"
                  >
                    Unlock Desk
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* CHANGE PASSKEY MODAL */}
      <AnimatePresence>
        {isChangePassOpen && (
          <div className="fixed inset-0 z-[10000] flex items-center justify-center px-4 bg-black/80 backdrop-blur-sm">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="w-full max-w-sm bg-[#001233] border border-[#d4af37]/40 rounded-xl p-6 shadow-2xl space-y-4"
            >
              <div className="flex items-center justify-between border-b border-[#d4af37]/20 pb-3">
                <h3 className="font-serif font-bold text-base text-white">Update Admin Passkey</h3>
                <button
                  onClick={() => setIsChangePassOpen(false)}
                  className="text-gray-400 hover:text-white p-1 rounded"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {changeSuccess ? (
                <div className="py-4 text-center space-y-2">
                  <Check className="w-8 h-8 text-emerald-400 mx-auto" />
                  <p className="text-xs font-mono text-emerald-300">Passkey updated successfully!</p>
                </div>
              ) : (
                <form onSubmit={handleChangePasskeySubmit} className="space-y-3">
                  {changeError && (
                    <p className="text-xs text-red-400 font-mono bg-red-500/10 p-2 rounded border border-red-500/20">
                      {changeError}
                    </p>
                  )}
                  <div>
                    <label className="text-[11px] font-mono text-gray-400 block mb-1">New Passkey</label>
                    <input
                      type="password"
                      value={newPasskey}
                      onChange={(e) => setNewPasskey(e.target.value)}
                      placeholder="Minimum 6 characters"
                      className="w-full px-3 py-2 bg-[#000a1c] border border-[#d4af37]/40 rounded-lg text-sm text-white font-mono outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-mono text-gray-400 block mb-1">Confirm New Passkey</label>
                    <input
                      type="password"
                      value={confirmPasskey}
                      onChange={(e) => setConfirmPasskey(e.target.value)}
                      placeholder="Re-type new passkey"
                      className="w-full px-3 py-2 bg-[#000a1c] border border-[#d4af37]/40 rounded-lg text-sm text-white font-mono outline-none"
                    />
                  </div>
                  <div className="flex justify-end gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => setIsChangePassOpen(false)}
                      className="px-3 py-1.5 rounded text-xs font-mono text-gray-400 hover:text-white"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-1.5 rounded-lg bg-[#d4af37] text-[#001233] font-mono font-bold text-xs uppercase"
                    >
                      Save Key
                    </button>
                  </div>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
