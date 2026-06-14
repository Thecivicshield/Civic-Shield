import React from "react";
import { Shield, ShieldAlert, Lock, Unlock, Eye, Sparkles } from "lucide-react";

interface HeaderProps {
  isAdminMode: boolean;
  setIsAdminMode: (mode: boolean) => void;
  primaryColor: string;
  accentColor: string;
}

export default function Header({ isAdminMode, setIsAdminMode, primaryColor, accentColor }: HeaderProps) {
  const [isLockOpen, setIsLockOpen] = React.useState(false);
  const [typedKey, setTypedKey] = React.useState("");
  const [wrongKey, setWrongKey] = React.useState(false);

  const handleToggleClick = () => {
    if (isAdminMode) {
      // Log out instantly
      setIsAdminMode(false);
    } else {
      setIsLockOpen(true);
    }
  };

  const handleAuthSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (typedKey === "gpcivicshield") {
      setIsAdminMode(true);
      setIsLockOpen(false);
      setTypedKey("");
      setWrongKey(false);
    } else {
      setWrongKey(true);
      setTimeout(() => setWrongKey(false), 600);
    }
  };

  return (
    <header 
      className="sticky top-0 z-50 border-b border-[#d4af37]/30 shadow-xl backdrop-blur-md transition-all duration-300 bg-[#001233]/95"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Logo Shield */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-[#d4af37] rounded-sm flex items-center justify-center rotate-45 shadow-[0_0_15px_rgba(212,175,55,0.25)]">
            <div className="-rotate-45 font-serif font-bold text-[#001a4d] text-lg select-none">CS</div>
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-serif font-bold tracking-tight text-[#d4af37] flex items-center gap-1">
              CIVIC <span className="text-white">SHIELD</span>
            </h1>
            <p className="text-[9px] font-mono uppercase tracking-[0.22em] text-gray-400">Citizen Legal Literacy</p>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-6">
          <a href="#pillars" className="text-xs font-bold tracking-wider uppercase text-gray-300 hover:text-[#d4af37] transition-colors">Core Pillars</a>
          <a href="#impact-metrics" className="text-xs font-bold tracking-wider uppercase text-gray-300 hover:text-[#d4af37] transition-colors">Milestones</a>
          <a href="#justice-shield" className="text-xs font-bold tracking-wider uppercase text-gray-300 hover:text-[#d4af37] transition-colors">Justice Shield</a>
          <a href="#evidence" className="text-xs font-bold tracking-wider uppercase text-gray-300 hover:text-[#d4af37] transition-colors">Evidence Board</a>
          <a href="#blog" className="text-xs font-bold tracking-wider uppercase text-gray-300 hover:text-[#d4af37] transition-colors">Blog</a>
          <a href="#timeline" className="text-xs font-bold tracking-wider uppercase text-gray-300 hover:text-[#d4af37] transition-colors">Roadmap</a>
        </nav>

        {/* Campaign Admin Switch */}
        <button
          id="admin-mode-toggle"
          onClick={handleToggleClick}
          className={`flex items-center gap-2 px-4 py-2 rounded-sm text-xs font-bold tracking-wider uppercase transition-all duration-300 cursor-pointer border ${
            isAdminMode 
              ? "bg-[#d4af37] text-[#001a4d] border-[#d4af37] shadow-[0_0_10px_rgba(212,175,55,0.3)]" 
              : "bg-transparent text-[#d4af37] hover:bg-[#d4af37] hover:text-[#001a4d] border-[#d4af37]/45"
          }`}
        >
          {isAdminMode ? (
            <>
              <Unlock className="w-3.5 h-3.5" />
              <span>Manager Active</span>
            </>
          ) : (
            <>
              <Lock className="w-3.5 h-3.5" />
              <span>Manager Login</span>
            </>
          )}
        </button>
      </div>

      {/* GORGEOUS PASSPHRASE AUTHENTICATION modal overlay */}
      {isLockOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-md animate-in fade-in duration-200">
          <div 
            className={`w-full max-w-sm bg-[#001233] border-2 border-[#d4af37]/80 rounded-sm p-6 sm:p-8 shadow-[0_0_50px_rgba(212,175,55,0.15)] space-y-6 ${
              wrongKey ? "animate-bounce" : ""
            }`}
            style={{ 
              transform: wrongKey ? 'translateX(10px)' : 'none', 
              transition: 'transform 0.1s ease-in-out'
            }}
          >
            <div className="text-center space-y-2">
              <div className="w-12 h-12 bg-[#d4af37]/10 border border-[#d4af37] rounded-sm flex items-center justify-center mx-auto text-[#d4af37]">
                <ShieldAlert className="w-6 h-6 animate-pulse" />
              </div>
              <h3 className="text-base font-serif text-white tracking-wider uppercase">Manager Console Restricted</h3>
              <p className="text-[10px] text-gray-400 font-mono leading-relaxed">
                Enter authorized credential passkey below to manage evidence locker records and customize campaign metrics.
              </p>
            </div>

            <form onSubmit={handleAuthSubmit} className="space-y-4">
              <div className="space-y-1">
                <input
                  type="password"
                  required
                  placeholder="Insert authorization key..."
                  value={typedKey}
                  onChange={(e) => setTypedKey(e.target.value)}
                  className={`w-full bg-[#001a4d] text-center border text-xs tracking-widest text-[#d4af37] placeholder-gray-600 rounded-sm py-2.5 px-3 focus:outline-none focus:ring-1 focus:ring-[#d4af37] ${
                    wrongKey ? "border-red-500 text-red-400" : "border-[#d4af37]/35"
                  }`}
                  autoFocus
                />
              </div>

              {wrongKey && (
                <p id="auth-error-msg" className="text-center text-[10px] text-red-400 font-mono animate-pulse">
                  ✖ ACCESS DENIED: Invalid administrative passkey.
                </p>
              )}

              <div className="grid grid-cols-2 gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setIsLockOpen(false);
                    setTypedKey("");
                    setWrongKey(false);
                  }}
                  className="py-2 border border-gray-600 hover:border-gray-400 text-gray-400 hover:text-white rounded-sm text-[10px] font-mono uppercase tracking-widest transition-all cursor-pointer"
                >
                  Abstain
                </button>
                <button
                  type="submit"
                  className="py-2 bg-[#d4af37] hover:bg-[#c39e2e] text-[#001a4d] font-bold rounded-sm text-[10px] font-mono uppercase tracking-widest transition-all cursor-pointer shadow-md"
                >
                  Authenticate
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </header>
  );
}
