import { Artifact } from "@/lib/catalog/schema";
import {
  FileText,
  FileCode,
  Download,
  ExternalLink,
  Presentation,
  MapPin,
  Database,
  Archive,
} from "lucide-react";

interface ArtifactListProps {
  artifacts: Artifact[];
}

export function ArtifactList({ artifacts }: ArtifactListProps) {
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

  return (
    <div className="my-8">
      <h3 className="font-serif text-lg font-semibold text-stone-900 dark:text-stone-100 mb-4 pb-2 border-b border-stone-200 dark:border-stone-800">
        Research Artifacts & Supplementary Materials ({artifacts.length})
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {artifacts.map((art) => (
          <a
            key={art.id}
            href={art.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group p-3.5 rounded-lg border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900/40 hover:border-academic dark:hover:border-academic-dark transition-all flex items-start gap-3"
          >
            <div className="p-2 rounded bg-stone-100 dark:bg-stone-800 flex-shrink-0 group-hover:scale-105 transition-transform">
              {getArtifactIcon(art.type)}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-1">
                <span className="font-sans font-medium text-xs text-stone-900 dark:text-stone-100 truncate group-hover:text-academic transition-colors">
                  {art.label}
                </span>
                <ExternalLink className="w-3.5 h-3.5 text-stone-400 group-hover:text-academic flex-shrink-0 transition-colors" />
              </div>
              {art.description && (
                <p className="text-[11px] text-stone-500 dark:text-stone-400 line-clamp-2 mt-0.5">
                  {art.description}
                </p>
              )}
              <div className="flex items-center gap-2 mt-1.5 text-[10px] font-mono text-stone-400">
                <span className="uppercase">{art.type}</span>
                {art.fileSize && <span>· {art.fileSize}</span>}
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}

