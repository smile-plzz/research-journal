"use client";

import React, { useEffect, useRef } from "react";
import { X } from "lucide-react";

interface BottomSheetProps {
  open: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  /** Center on desktop while staying a bottom sheet on mobile */
  desktopCentered?: boolean;
}

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

export function BottomSheet({
  open,
  onClose,
  title,
  subtitle,
  children,
  desktopCentered = true,
}: BottomSheetProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!open) return;

    previousFocusRef.current = document.activeElement as HTMLElement | null;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const focusTimer = window.setTimeout(() => {
      const firstFocusable = panelRef.current?.querySelector<HTMLElement>(FOCUSABLE_SELECTOR);
      firstFocusable?.focus();
    }, 20);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
        return;
      }

      if (e.key === "Tab" && panelRef.current) {
        const focusables = Array.from(
          panelRef.current.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)
        );
        if (focusables.length === 0) return;

        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.clearTimeout(focusTimer);
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = prevOverflow;
      previousFocusRef.current?.focus();
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex ${
        desktopCentered
          ? "items-end sm:items-center sm:justify-center sm:p-4"
          : "items-end justify-center"
      } bg-black/45 backdrop-blur-[2px] transition-opacity duration-200 ease-out`}
      onClick={onClose}
    >
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label={title}
        onClick={(e) => e.stopPropagation()}
        className={`w-full ${
          desktopCentered
            ? "sm:max-w-xl sm:rounded-card"
            : "max-w-2xl"
        } rounded-t-2xl border border-hairline bg-surface text-ink shadow-sheet flex flex-col max-h-[86dvh] pb-[max(0.75rem,env(safe-area-inset-bottom))] transition-transform duration-200 ease-out`}
      >
        {/* Drag handle hint on mobile */}
        <div className="flex justify-center pt-2.5 pb-1 sm:hidden" aria-hidden="true">
          <span className="w-9 h-1 rounded-full bg-hairline-strong" />
        </div>

        <div className="flex items-center justify-between gap-3 px-4 sm:px-5 py-3 border-b border-hairline">
          <div className="min-w-0">
            <h2 className="font-serif text-base sm:text-lg font-semibold text-ink truncate">
              {title}
            </h2>
            {subtitle && (
              <p className="text-xs text-ink-secondary truncate mt-0.5">{subtitle}</p>
            )}
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label={`Close ${title}`}
            className="min-w-[44px] min-h-[44px] inline-flex items-center justify-center rounded-control text-ink-secondary hover:text-ink hover:bg-surface-muted transition-colors duration-150"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="overflow-y-auto px-4 sm:px-5 py-4">{children}</div>
      </div>
    </div>
  );
}
