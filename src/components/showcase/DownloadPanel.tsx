import { DownloadAsset, ProjectReleaseInfo } from "@/lib/showcase/schema";
import { DownloadSafetyNote } from "./DownloadSafetyNote";
import { Download, CheckCircle2, FileCheck2, ExternalLink } from "lucide-react";

interface DownloadPanelProps {
  downloads: DownloadAsset[];
  releaseInfo?: ProjectReleaseInfo;
  safetyNote: boolean;
  platforms: string[];
}

export function DownloadPanel({
  downloads,
  releaseInfo,
  safetyNote,
  platforms,
}: DownloadPanelProps) {
  if (!downloads || downloads.length === 0) {
    return null;
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex flex-wrap items-center gap-2 text-xs">
          {releaseInfo?.tag && (
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 font-mono">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              <span>Version {releaseInfo.tag}</span>
            </span>
          )}
          {releaseInfo?.isPrerelease && (
            <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 dark:bg-amber-950/50 dark:text-amber-300 text-[11px] font-medium">
              Preview build
            </span>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {downloads.map((asset) => (
          <div
            key={asset.url}
            className="rounded-lg border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900/50 p-4 flex flex-col justify-between gap-3"
          >
            <div className="space-y-1">
              <div className="font-medium text-sm text-stone-900 dark:text-stone-100">
                {asset.label}
              </div>
              <div className="flex flex-wrap items-center gap-2 text-xs text-stone-500 dark:text-stone-400">
                {asset.size && <span>{asset.size}</span>}
                {asset.version && (
                  <>
                    <span>·</span>
                    <span className="font-mono">{asset.version}</span>
                  </>
                )}
                {asset.fileName && (
                  <>
                    <span>·</span>
                    <span className="truncate max-w-[180px]" title={asset.fileName}>
                      {asset.fileName}
                    </span>
                  </>
                )}
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
              <a
                href={asset.url}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-md bg-academic hover:bg-academic-hover text-white text-xs font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-academic"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download directly</span>
              </a>

              {asset.sha256Url && (
                <a
                  href={asset.sha256Url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-[11px] text-stone-500 hover:text-stone-900 dark:hover:text-stone-100 underline"
                >
                  <FileCheck2 className="w-3 h-3" />
                  <span>SHA-256</span>
                  <ExternalLink className="w-2.5 h-2.5" />
                </a>
              )}
            </div>
          </div>
        ))}
      </div>

      {safetyNote && <DownloadSafetyNote platforms={platforms} />}
    </div>
  );
}

