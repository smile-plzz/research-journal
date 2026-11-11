"use client";

import React, { useId, useState } from "react";
import { HelpCircle } from "lucide-react";

interface TooltipProps {
  content: string;
  children: React.ReactElement;
  position?: "top" | "bottom";
  shortcut?: string;
  className?: string;
}

/**
 * Accessible hover + keyboard-focus tooltip bubble.
 */
export function Tooltip({
  content,
  children,
  position = "top",
  shortcut,
  className = "",
}: TooltipProps) {
  const [open, setOpen] = useState(false);
  const tooltipId = useId();

  if (!content) return children;

  const positionClasses =
    position === "bottom"
      ? "top-full left-1/2 -translate-x-1/2 mt-2"
      : "bottom-full left-1/2 -translate-x-1/2 mb-2";

  return (
    <span
      className={`relative inline-flex items-center ${className}`}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onFocus={() => setOpen(true)}
      onBlur={() => setOpen(false)}
    >
      <span aria-describedby={open ? tooltipId : undefined} className="inline-flex">
        {children}
      </span>
      {open && (
        <span
          id={tooltipId}
          role="tooltip"
          className={`pointer-events-none absolute z-50 w-max max-w-[240px] rounded-md border border-stone-700/80 dark:border-stone-600 bg-stone-900 dark:bg-stone-100 px-2.5 py-1.5 text-[11px] font-sans font-normal leading-snug text-stone-50 dark:text-stone-900 shadow-lg whitespace-normal text-center ${positionClasses}`}
        >
          <span>{content}</span>
          {shortcut && (
            <kbd className="ml-1.5 inline-block rounded bg-stone-800 dark:bg-stone-300 px-1 py-0.5 text-[10px] font-mono text-stone-200 dark:text-stone-800">
              {shortcut}
            </kbd>
          )}
        </span>
      )}
    </span>
  );
}

interface InfoHintProps {
  text: string;
  label?: string;
  position?: "top" | "bottom";
}

/**
 * Interactive "?" hint icon supporting hover, focus, and tap-to-toggle on touchscreens.
 */
export function InfoHint({
  text,
  label = "More information",
  position = "top",
}: InfoHintProps) {
  const [open, setOpen] = useState(false);
  const hintId = useId();

  const positionClasses =
    position === "bottom"
      ? "top-full left-1/2 -translate-x-1/2 mt-2"
      : "bottom-full left-1/2 -translate-x-1/2 mb-2";

  return (
    <span
      className="relative inline-flex items-center align-middle"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        type="button"
        aria-label={label}
        aria-expanded={open}
        aria-describedby={open ? hintId : undefined}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setOpen((prev) => !prev);
        }}
        onBlur={() => setOpen(false)}
        className="inline-flex items-center justify-center p-0.5 rounded-full text-stone-400 hover:text-academic dark:hover:text-academic-dark focus:outline-none focus-visible:ring-2 focus-visible:ring-academic transition-colors"
      >
        <HelpCircle className="w-3.5 h-3.5" />
      </button>
      {open && (
        <span
          id={hintId}
          role="tooltip"
          className={`pointer-events-none absolute z-50 w-56 rounded-md border border-stone-700/80 dark:border-stone-600 bg-stone-900 dark:bg-stone-100 px-2.5 py-1.5 text-[11px] font-sans font-normal leading-snug text-stone-50 dark:text-stone-900 shadow-lg text-left ${positionClasses}`}
        >
          {text}
        </span>
      )}
    </span>
  );
}

