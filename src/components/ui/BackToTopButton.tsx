"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

export function BackToTopButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > 560);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) return null;

  return (
    <div
      data-no-print="true"
      className="fixed bottom-5 right-4 sm:right-6 z-30 pb-[env(safe-area-inset-bottom)]"
    >
      <button
        type="button"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        aria-label="Back to top"
        className="min-w-[44px] min-h-[44px] inline-flex items-center justify-center rounded-full border border-hairline-strong bg-surface/95 text-ink shadow-sheet hover:bg-surface-muted transition-colors duration-150"
      >
        <ArrowUp className="w-4 h-4" strokeWidth={1.5} />
      </button>
    </div>
  );
}
