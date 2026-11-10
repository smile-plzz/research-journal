"use client";

import { useEffect, useState } from "react";
import { Type, ZoomIn, ZoomOut, BookOpen, Share2, Check } from "lucide-react";

interface ReadingToolbarProps {
  readingTimeMinutes?: number;
  wordCount?: number;
}

export function ReadingToolbar({
  readingTimeMinutes,
  wordCount,
}: ReadingToolbarProps) {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [fontSize, setFontSize] = useState<"base" | "lg">("base");
  const [fontFamily, setFontFamily] = useState<"serif" | "sans">("serif");
  const [copiedLink, setCopiedLink] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        const currentProgress = (window.scrollY / totalScroll) * 100;
        setScrollProgress(Math.min(100, Math.max(0, currentProgress)));
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleFontSize = () => {
    const newSize = fontSize === "base" ? "lg" : "base";
    setFontSize(newSize);
    const prose = document.querySelector(".prose-academic");
    if (prose) {
      if (newSize === "lg") {
        prose.classList.add("text-xl");
      } else {
        prose.classList.remove("text-xl");
      }
    }
  };

  const toggleFontFamily = () => {
    const newFont = fontFamily === "serif" ? "sans" : "serif";
    setFontFamily(newFont);
    const prose = document.querySelector(".prose-academic");
    if (prose) {
      if (newFont === "sans") {
        prose.classList.add("font-sans");
        prose.classList.remove("font-serif");
      } else {
        prose.classList.add("font-serif");
        prose.classList.remove("font-sans");
      }
    }
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  return (
    <>
      {/* Scroll Progress Bar at very top of screen */}
      <div
        className="fixed top-0 left-0 h-1 bg-academic z-50 transition-all duration-75"
        style={{ width: `${scrollProgress}%` }}
        role="progressbar"
        aria-valuenow={Math.round(scrollProgress)}
        aria-valuemin={0}
        aria-valuemax={100}
      />

      {/* Floating / Sticky Reading Controls Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 py-2 px-3 my-4 rounded-lg bg-stone-100/80 dark:bg-stone-900/60 border border-stone-200 dark:border-stone-800 text-xs">
        <div className="flex items-center gap-3 font-mono text-stone-500 dark:text-stone-400 text-[11px]">
          {readingTimeMinutes && (
            <span className="flex items-center gap-1">
              <BookOpen className="w-3.5 h-3.5 text-academic" />
              <span>~{readingTimeMinutes} min read</span>
            </span>
          )}
          {wordCount && (
            <span>· {wordCount.toLocaleString()} words</span>
          )}
          <span>· {Math.round(scrollProgress)}% read</span>
        </div>

        {/* Adjusters */}
        <div className="flex items-center gap-1 text-xs">
          <button
            onClick={toggleFontFamily}
            className={`px-2 py-1 rounded transition-colors text-xs font-medium ${
              fontFamily === "serif"
                ? "bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 shadow-2xs font-serif"
                : "text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 font-sans"
            }`}
            title="Toggle Serif / Sans-serif typeface"
          >
            {fontFamily === "serif" ? "Serif" : "Sans"}
          </button>

          <button
            onClick={toggleFontSize}
            className={`px-2 py-1 rounded transition-colors text-xs font-medium ${
              fontSize === "lg"
                ? "bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 shadow-2xs"
                : "text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100"
            }`}
            title="Toggle larger typography"
          >
            <span className="font-bold">A</span>
            <span className="text-[10px] ml-0.5">{fontSize === "base" ? "+" : "−"}</span>
          </button>

          <button
            onClick={handleShare}
            className="p-1.5 text-stone-500 hover:text-stone-900 dark:text-stone-400 dark:hover:text-stone-100 rounded transition-colors"
            title="Copy link to publication"
          >
            {copiedLink ? (
              <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            ) : (
              <Share2 className="w-3.5 h-3.5" />
            )}
          </button>
        </div>
      </div>
    </>
  );
}

