"use client";

import { useState } from "react";
import { Check, Share2 } from "lucide-react";
import { buttonClasses } from "@/components/ui/Button";

interface ShareButtonProps {
  title: string;
  text?: string;
  url?: string;
  label?: string;
  className?: string;
}

export function ShareButton({
  title,
  text,
  url,
  label = "Share",
  className = "",
}: ShareButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    const shareUrl =
      url || (typeof window !== "undefined" ? window.location.href : "");

    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({ title, text, url: shareUrl });
        return;
      } catch {
        // User cancelled or share failed; fall back to clipboard copy
      }
    }

    if (typeof navigator !== "undefined" && navigator.clipboard && shareUrl) {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    }
  };

  return (
    <button
      type="button"
      onClick={handleShare}
      className={buttonClasses({ variant: "quiet", className })}
    >
      {copied ? (
        <>
          <Check className="w-4 h-4 text-accent" strokeWidth={1.5} />
          <span>Link copied</span>
        </>
      ) : (
        <>
          <Share2 className="w-4 h-4" strokeWidth={1.5} />
          <span>{label}</span>
        </>
      )}
    </button>
  );
}
