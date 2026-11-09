"use client";

import { useEffect } from "react";
import { Artifact } from "@/lib/catalog/schema";
import { X, ExternalLink, Download, Maximize2, ShieldAlert } from "lucide-react";

interface ArtifactViewerModalProps {
  artifact: Artifact | null;
  onClose: () => void;
}

export function ArtifactViewerModal({
  artifact,
  onClose,
}: ArtifactViewerModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  if (!artifact) return null;

  // Convert github blob URL to raw URL for direct embedding if needed
  const rawEmbedUrl = artifact.url
    .replace("github.com", "raw.githubusercontent.com")
    .replace("/blob/", "/");

  const isPdf = artifact.type === "pdf";
  const isDashboardOrMap = artifact.type === "dashboard";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div
        className="relative w-full max-w-5xl h-[88vh] flex flex-col rounded-xl bg-white dark:bg-stone-900 border border-stone-300 dark:border-stone-800 shadow-2xl overflow-hidden"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-950/60">
          <div className="min-w-0 pr-4">
            <h3
              id="modal-title"
              className="font-serif text-base font-semibold text-stone-900 dark:text-stone-100 truncate"
            >
              {artifact.label}
            </h3>
            <p className="text-xs text-stone-500 font-mono truncate">
              {artifact.description || artifact.url}
            </p>
          </div>

          <div className="flex items-center gap-2 flex-shrink-0">
            <a
              href={artifact.url}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 text-stone-500 hover:text-stone-900 dark:text-stone-400 dark:hover:text-stone-100 rounded-md hover:bg-stone-200 dark:hover:bg-stone-800 transition-colors"
              title="Open raw source in new tab"
            >
              <ExternalLink className="w-4 h-4" />
            </a>

            <button
              onClick={onClose}
              className="p-1.5 text-stone-500 hover:text-stone-900 dark:text-stone-400 dark:hover:text-stone-100 rounded-md hover:bg-stone-200 dark:hover:bg-stone-800 transition-colors"
              aria-label="Close modal"
              title="Close (Esc)"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="flex-1 bg-stone-100 dark:bg-stone-950 relative overflow-hidden">
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
            <div className="flex flex-col items-center justify-center h-full p-8 text-center space-y-4">
              <ShieldAlert className="w-10 h-10 text-stone-400" />
              <div className="max-w-md">
                <h4 className="font-serif text-lg font-semibold text-stone-900 dark:text-stone-100 mb-1">
                  Preview Not Available Inside Frame
                </h4>
                <p className="text-xs text-stone-500 dark:text-stone-400 leading-relaxed mb-4">
                  This artifact ({artifact.type.toUpperCase()}) is stored directly in the repository and is best inspected in its native format or downloaded directly.
                </p>
                <a
                  href={artifact.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-academic text-white text-xs font-medium hover:bg-academic-hover transition-colors shadow-xs"
                >
                  <Download className="w-4 h-4" />
                  <span>Download / View on GitHub</span>
                </a>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-5 py-2.5 border-t border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-950/60 flex items-center justify-between text-xs text-stone-500 font-mono">
          <span>Type: {artifact.type.toUpperCase()}</span>
          <a
            href={artifact.url}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline flex items-center gap-1 text-academic"
          >
            <span>Direct Repository Link</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>
    </div>
  );
}
