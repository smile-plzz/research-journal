"use client";

import { useEffect } from "react";
import { Download, ExternalLink, X } from "lucide-react";
import { Artifact } from "@/lib/catalog/schema";
import { buttonClasses } from "@/components/ui/Button";

interface ArtifactViewerModalProps {
  artifact: Artifact | null;
  onClose: () => void;
}

export function ArtifactViewerModal({
  artifact,
  onClose,
}: ArtifactViewerModalProps) {
  useEffect(() => {
    if (!artifact) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [artifact, onClose]);

  if (!artifact) return null;

  const rawEmbedUrl = artifact.url
    .replace("github.com", "raw.githubusercontent.com")
    .replace("/blob/", "/");

  const isPdf = artifact.type === "pdf";
  const isDashboardOrMap = artifact.type === "dashboard";

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/50 backdrop-blur-[2px]"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-5xl h-[86dvh] flex flex-col rounded-card bg-surface border border-hairline shadow-sheet overflow-hidden"
        role="dialog"
        aria-modal="true"
        aria-label={artifact.label}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between gap-3 px-4 sm:px-5 py-3 border-b border-hairline bg-surface">
          <div className="min-w-0">
            <h2 className="font-serif text-base font-semibold text-ink truncate">
              {artifact.label}
            </h2>
            {artifact.description && (
              <p className="text-xs text-ink-secondary truncate">
                {artifact.description}
              </p>
            )}
          </div>

          <div className="flex items-center gap-1 flex-shrink-0">
            <a
              href={artifact.url}
              target="_blank"
              rel="noopener noreferrer"
              className="min-w-[44px] min-h-[44px] inline-flex items-center justify-center rounded-control text-ink-secondary hover:text-ink hover:bg-surface-muted transition-colors"
              aria-label="Open source file in new tab"
            >
              <ExternalLink className="w-4 h-4" strokeWidth={1.5} />
            </a>

            <button
              type="button"
              onClick={onClose}
              className="min-w-[44px] min-h-[44px] inline-flex items-center justify-center rounded-control text-ink-secondary hover:text-ink hover:bg-surface-muted transition-colors"
              aria-label="Close preview"
            >
              <X className="w-5 h-5" strokeWidth={1.5} />
            </button>
          </div>
        </div>

        <div className="flex-1 bg-surface-muted relative overflow-hidden">
          {isPdf ? (
            <iframe
              src={rawEmbedUrl}
              className="w-full h-full border-0"
              title={artifact.label}
            />
          ) : isDashboardOrMap ? (
            <iframe
              src={rawEmbedUrl}
              className="w-full h-full border-0 bg-white"
              sandbox="allow-scripts allow-same-origin"
              title={artifact.label}
            />
          ) : (
            <div className="flex flex-col items-center justify-center h-full p-6 text-center space-y-4">
              <p className="text-sm text-ink-secondary max-w-md">
                This file ({artifact.type.toUpperCase()}) is best viewed directly from the
                repository.
              </p>
              <a
                href={artifact.url}
                target="_blank"
                rel="noopener noreferrer"
                className={buttonClasses({ variant: "primary" })}
              >
                <Download className="w-4 h-4" strokeWidth={1.5} />
                <span>Open on GitHub</span>
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
