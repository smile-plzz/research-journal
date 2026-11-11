"use client";

import { useState } from "react";
import { Artifact } from "@/lib/catalog/schema";
import { ArtifactViewerModal } from "../artifacts/ArtifactViewerModal";
import { InfoHint, Tooltip } from "@/components/ui/Tooltip";
import {
  FileText,
  FileCode,
  Download,
  ExternalLink,
  Presentation,
  MapPin,
  Database,
  Archive,
  Eye,
} from "lucide-react";

interface ArtifactListProps {
  artifacts: Artifact[];
}

export function ArtifactList({ artifacts }: ArtifactListProps) {
  const [selectedArtifact, setSelectedArtifact] = useState<Artifact | null>(null);

  if (!artifacts || artifacts.length === 0) return null;

  const getArtifactIcon = (type: string) => {
    switch (type) {
      case "pdf":
        return <FileText className="w-4 h-4 text-rose-600 dark:text-rose-400" />;
      case "docx":
        return <FileText className="w-4 h-4 text-blue-600 dark:text-blue-400" />;
      case "presentation":
        return <Presentation className="w-4 h-4 text-amber-600 dark:text-amber-400" />;
      case "dataset":
        return <Database className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />;
      case "dashboard":
        return <MapPin className="w-4 h-4 text-purple-600 dark:text-purple-400" />;
      case "bibtex":
        return <FileCode className="w-4 h-4 text-stone-600 dark:text-stone-400" />;
      default:
        return <Archive className="w-4 h-4 text-stone-500" />;
    }
  };

  const isPreviewable = (type: string) => type === "pdf" || type === "dashboard";

  return (
    <>
      <div className="my-8">
        <h3 className="font-serif text-lg font-semibold text-stone-900 dark:text-stone-100 mb-4 pb-2 border-b border-stone-200 dark:border-stone-800 flex items-center gap-2">
          <span>Research Artifacts & Supplementary Materials ({artifacts.length})</span>
          <InfoHint text="PDFs, datasets, interactive dashboards, or slides extracted from the publication repository. Click Preview when available to inspect without leaving this site." />
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {artifacts.map((art) => (
            <div
              key={art.id}
              className="group p-3.5 rounded-lg border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900/40 hover:border-academic dark:hover:border-academic-dark transition-all flex items-start gap-3"
            >
              <div className="p-2 rounded bg-stone-100 dark:bg-stone-800 flex-shrink-0 group-hover:scale-105 transition-transform">
                {getArtifactIcon(art.type)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-1">
                  <span className="font-sans font-medium text-xs text-stone-900 dark:text-stone-100 truncate">
                    {art.label}
                  </span>
                </div>
                {art.description && (
                  <p className="text-[11px] text-stone-500 dark:text-stone-400 line-clamp-2 mt-0.5">
                    {art.description}
                  </p>
                )}
                <div className="flex items-center justify-between mt-2 pt-1 border-t border-stone-100 dark:border-stone-800 text-[11px] font-mono">
                  <span className="text-stone-400 uppercase text-[10px]">{art.type}</span>
                  <div className="flex items-center gap-2">
                    {isPreviewable(art.type) && (
                      <Tooltip content="Open inline viewer modal">
                        <button
                          type="button"
                          onClick={() => setSelectedArtifact(art)}
                          className="inline-flex items-center gap-1 text-academic hover:underline text-[11px] font-sans font-medium cursor-pointer"
                        >
                          <Eye className="w-3 h-3" />
                          <span>Preview</span>
                        </button>
                      </Tooltip>
                    )}
                    <Tooltip content="Open direct source file in a new tab">
                      <a
                        href={art.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-stone-500 hover:text-stone-900 dark:hover:text-stone-100 text-[11px] font-sans"
                      >
                        <span>Source</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </Tooltip>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Artifact Viewer Modal */}
      <ArtifactViewerModal
        artifact={selectedArtifact}
        onClose={() => setSelectedArtifact(null)}
      />
    </>
  );
}
