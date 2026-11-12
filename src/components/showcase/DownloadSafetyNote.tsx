"use client";

import { useState } from "react";
import { ChevronDown, ShieldCheck } from "lucide-react";

interface DownloadSafetyNoteProps {
  platforms?: string[];
}

/**
 * Short, friendly, collapsed-by-default guidance for unsigned open-source builds.
 */
export function DownloadSafetyNote({ platforms = [] }: DownloadSafetyNoteProps) {
  const [expanded, setExpanded] = useState(false);

  const hasWindows = platforms.includes("windows");
  const hasAndroid = platforms.includes("android");
  const hasMac = platforms.includes("macos");

  return (
    <div className="rounded-control border border-hairline bg-surface-muted/60 px-4 py-2 text-sm text-ink-secondary">
      <button
        type="button"
        onClick={() => setExpanded((prev) => !prev)}
        aria-expanded={expanded}
        className="w-full min-h-[44px] flex items-center justify-between gap-3 text-left text-ink font-medium"
      >
        <span className="inline-flex items-center gap-2 text-sm">
          <ShieldCheck className="w-4 h-4 text-accent flex-shrink-0" strokeWidth={1.5} />
          <span>Is this safe?</span>
        </span>
        <ChevronDown
          className={`w-4 h-4 text-ink-secondary transition-transform duration-150 ${
            expanded ? "rotate-180" : ""
          }`}
          strokeWidth={1.5}
        />
      </button>

      {expanded && (
        <div className="pb-3 pt-1 space-y-2.5 text-xs sm:text-sm text-ink-secondary leading-relaxed border-t border-hairline mt-1">
          <p className="pt-2">
            Independent open-source builds do not carry paid publisher certificates, so your device
            may show a warning the first time you open the installer. You can verify the SHA-256
            checksum when provided.
          </p>
          <ul className="space-y-1.5 list-disc pl-5">
            {(hasWindows || (!hasAndroid && !hasMac)) && (
              <li>
                <strong className="text-ink">Windows:</strong> Extract the ZIP folder first. If
                SmartScreen appears, select <em>More info</em> and then <em>Run anyway</em>.
              </li>
            )}
            {hasAndroid && (
              <li>
                <strong className="text-ink">Android / TV:</strong> When opening the APK, allow{" "}
                <em>Install unknown apps</em> for your browser or file manager in Settings.
              </li>
            )}
            {hasMac && (
              <li>
                <strong className="text-ink">macOS:</strong> Control-click the app and choose{" "}
                <em>Open</em> to confirm running it outside the App Store.
              </li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}
