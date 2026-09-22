import React, { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function MobileScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 450);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          type="button"
          onClick={scrollToTop}
          initial={{ opacity: 0, scale: 0.8, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 10 }}
          whileTap={{ scale: 0.9 }}
          aria-label="Scroll to top"
          className="md:hidden fixed bottom-20 left-4 z-[390] flex items-center gap-1.5 px-3 py-2 rounded-full bg-[#001233]/90 border border-[#d4af37]/60 text-[#ffd754] text-xs font-mono font-bold shadow-[0_4px_16px_rgba(0,0,0,0.6)] backdrop-blur-md cursor-pointer active:bg-[#d4af37] active:text-[#001233] transition-colors"
        >
          <ArrowUp className="w-3.5 h-3.5" />
          <span>TOP</span>
        </motion.button>
      )}
    </AnimatePresence>
  );
}
