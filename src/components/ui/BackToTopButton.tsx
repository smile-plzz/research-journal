"use client";

import { useEffect, useState } from "react";
import { Tooltip } from "./Tooltip";
import { ArrowUp } from "lucide-react";

export function BackToTopButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > 420);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed bottom-5 right-5 z-40">
      <Tooltip content="Scroll back to top of page">
        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="Back to top"
          className="p-2.5 rounded-full border border-stone-300 dark:border-stone-700 bg-white/95 dark:bg-stone-900/95 text-stone-700 dark:text-stone-200 shadow-md hover:border-academic hover:text-academic dark:hover:text-academic-dark transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-academic"
        >
          <ArrowUp className="w-4 h-4" />
        </button>
      </Tooltip>
    </div>
  );
}

