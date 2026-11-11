"use client";

import { useState } from "react";
import { ShieldAlert, ChevronDown, ChevronUp } from "lucide-react";
import { Tooltip } from "@/components/ui/Tooltip";

interface DownloadSafetyNoteProps {
  platforms?: string[];
}

/**
 * Reusable plain-language notice for unsigned desktop or Android sideload builds.
 * EDITORIAL JUDGMENT CALL: Copy and OS guidance should be reviewed by Ismail before final shipping.
 */
export function DownloadSafetyNote({ platforms = [] }: DownloadSafetyNoteProps) {
  const [expanded, setExpanded] = useState(false);

  const hasWindows = platforms.includes("windows");
  const hasAndroid = platforms.includes("android");
  const hasMac = platforms.includes("macos");

  return (
    <div className="rounded-lg border border-amber-200 dark:border-amber-900/60 bg-amber-50/70 dark:bg-amber-950/25 p-4 text-xs text-stone-700 dark:text-stone-300">
      <div className="flex items-start gap-3">
        <ShieldAlert className="w-4 h-4 text-amber-700 dark:text-amber-400 flex-shrink-0 mt-0.5" />
        <div className="flex-1 space-y-2">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <p className="font-medium text-stone-900 dark:text-stone-100">
              Unsigned app: your device may show a security warning before opening.
            </p>
            <Tooltip content={expanded ? "Collapse operating system instructions" : "Show step-by-step instructions for Windows, Android, or macOS"}>
              <button
                type="button"
                onClick={() => setExpanded((prev) => !prev)}
                aria-expanded={expanded}
                className="inline-flex items-center gap-1 font-medium text-amber-800 dark:text-amber-300 hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-academic rounded"
              >
                <span>{expanded ? "Hide steps" : "How to proceed"}</span>
                {expanded ? (
                  <ChevronUp className="w-3.5 h-3.5" />
                ) : (
                  <ChevronDown className="w-3.5 h-3.5" />
                )}
              </button>
            </Tooltip>
          </div>

          <p className="text-stone-600 dark:text-stone-400 leading-relaxed">
            Independent open-source software is often distributed without paid publisher certificates.
            You can verify any provided SHA-256 checksum before running.
          </p>

          {expanded && (
            <ul className="space-y-1.5 pt-2 border-t border-amber-200/70 dark:border-amber-800/40 text-stone-600 dark:text-stone-400 list-disc pl-4">
              {(hasWindows || (!hasAndroid && !hasMac)) && (
                <li>
                  <strong className="text-stone-800 dark:text-stone-200">Windows:</strong>{" "}
                  Extract the downloaded ZIP folder first. If Windows SmartScreen appears, choose{" "}
                  <em>More info</em> and then <em>Run anyway</em>.
                </li>
              )}
              {hasAndroid && (
                <li>
                  <strong className="text-stone-800 dark:text-stone-200">Android / Android TV:</strong>{" "}
                  When opening the APK file, allow <em>Install unknown apps</em> for your file manager
                  or browser in system settings.
                </li>
              )}
              {hasMac && (
                <li>
                  <strong className="text-stone-800 dark:text-stone-200">macOS:</strong>{" "}
                  Right-click (or Control-click) the app and choose <em>Open</em> to confirm running
                  an app downloaded outside the App Store.
                </li>
              )}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

