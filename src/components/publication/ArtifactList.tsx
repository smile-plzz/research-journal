"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import {
  Archive,
  Database,
  ExternalLink,
  Eye,
  FileCode,
  FileText,
  MapPin,
  Presentation,
} from "lucide-react";
import { Artifact } from "@/lib/catalog/schema";

const ArtifactViewerModal = dynamic(
  () =>
    import("../artifacts/ArtifactViewerModal").then(
      (mod) => mod.ArtifactViewerModal
    ),
  { ssr: false }
);

interface ArtifactListProps {
  artifacts: Artifact[];
}

export function ArtifactList({ artifacts }: ArtifactListProps) {
  const [selectedArtifact, setSelectedArtifact] = useState<Artifact | null>(
    null
  );

  if (!artifacts || artifacts.length === 0) return null;

  const getArtifactIcon = (type: string) => {
    switch (type) {
      case "pdf":
      case "docx":
        return <FileText className="w-4 h-4 text-ink-secondary" strokeWidth={1.5} />;
      case "presentation":
        return <Presentation className="w-4 h-4 text-ink-secondary" strokeWidth={1.5} />;
      case "dataset":
        return <Database className="w-4 h-4 text-ink-secondary" strokeWidth={1.5} />;
      case "dashboard":
        return <MapPin className="w-4 h-4 text-ink-secondary" strokeWidth={1.5} />;
      case "bibtex":
        return <FileCode className="w-4 h-4 text-ink-secondary" strokeWidth={1.5} />;
      default:
        return <Archive className="w-4 h-4 text-ink-secondary" strokeWidth={1.5} />;
    }
  };

  const isPreviewable = (type: string) =>
    type === "pdf" || type === "dashboard";

  return (
    <>
      <section className="space-y-4 pt-6 border-t border-hairline">
        <h2 className="font-serif text-xl font-semibold text-ink">
          Files and datasets ({artifacts.length})
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {artifacts.map((art) => {
            const rawUrl = art.url
              .replace("github.com", "raw.githubusercontent.com")
              .replace("/blob/", "/");

            return (
              <div
                key={art.id}
                className="p-4 rounded-card border border-hairline bg-surface flex flex-col justify-between gap-3"
              >
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-control bg-surface-muted flex-shrink-0">
                    {getArtifactIcon(art.type)}
                  </div>
                  <div className="min-w-0">
                    <div className="text-sm font-medium text-ink truncate">
                      {art.label}
                    </div>
                    {art.description && (
                      <p className="text-xs text-ink-secondary line-clamp-2 mt-0.5">
                        {art.description}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex items-center justify-between gap-2 pt-2 border-t border-hairline text-xs">
                  <span className="uppercase font-mono text-ink-secondary">
                    {art.type}
                  </span>

                  <div className="flex items-center gap-3">
                    {isPreviewable(art.type) && (
                      <>
                        {/* On mobile, prefer direct "Open PDF" / "Open" link instead of cramped iframe */}
                        <a
                          href={art.type === "pdf" ? rawUrl : art.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="md:hidden min-h-[44px] inline-flex items-center gap-1 text-accent font-medium"
                        >
                          <span>{art.type === "pdf" ? "Open PDF" : "Open"}</span>
                          <ExternalLink className="w-3.5 h-3.5" strokeWidth={1.5} />
                        </a>

                        {/* On tablet/desktop, offer lazy-loaded inline modal */}
                        <button
                          type="button"
                          onClick={() => setSelectedArtifact(art)}
                          className="hidden md:inline-flex min-h-[44px] items-center gap-1 text-accent hover:underline font-medium"
                        >
                          <Eye className="w-3.5 h-3.5" strokeWidth={1.5} />
                          <span>Preview</span>
                        </button>
                      </>
                    )}

                    <a
                      href={art.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="min-h-[44px] inline-flex items-center gap-1 text-ink-secondary hover:text-ink"
                    >
                      <span>Source</span>
                      <ExternalLink className="w-3.5 h-3.5" strokeWidth={1.5} />
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {selectedArtifact && (
        <ArtifactViewerModal
          artifact={selectedArtifact}
          onClose={() => setSelectedArtifact(null)}
        />
      )}
    </>
  );
}
