"use client";

import { useEffect, useMemo, useState } from "react";
import { ChevronDown, Download, ExternalLink } from "lucide-react";
import { DownloadAsset, ProjectReleaseInfo } from "@/lib/showcase/schema";
import { formatShortDate } from "@/lib/format-date";
import { buttonClasses } from "@/components/ui/Button";
import { DownloadSafetyNote } from "./DownloadSafetyNote";

interface DownloadPanelProps {
  downloads: DownloadAsset[];
  releaseInfo?: ProjectReleaseInfo;
  safetyNote: boolean;
  platforms: string[];
  projectName?: string;
  repoUrl?: string;
}

type DetectedOS = "windows" | "android" | "macos" | "linux" | "unknown";

function detectClientOS(): DetectedOS {
  if (typeof navigator === "undefined") return "unknown";
  const ua = navigator.userAgent.toLowerCase();
  if (ua.includes("android")) return "android";
  if (ua.includes("win")) return "windows";
  if (ua.includes("mac")) return "macos";
  if (ua.includes("linux")) return "linux";
  return "unknown";
}

export function DownloadPanel({
  downloads,
  releaseInfo,
  safetyNote,
  platforms,
  projectName,
  repoUrl,
}: DownloadPanelProps) {
  const [detectedOS, setDetectedOS] = useState<DetectedOS>("unknown");
  const [showOther, setShowOther] = useState(false);

  useEffect(() => {
    setDetectedOS(detectClientOS());
  }, []);

  const { primary, others } = useMemo(() => {
    if (!downloads || downloads.length === 0) {
      return { primary: null, others: [] as DownloadAsset[] };
    }

    const matchIndex =
      detectedOS === "unknown"
        ? 0
        : Math.max(
            0,
            downloads.findIndex((d) =>
              d.platform.toLowerCase().includes(detectedOS)
            )
          );

    const chosen = downloads[matchIndex];
    const rest = downloads.filter((_, idx) => idx !== matchIndex);
    return { primary: chosen, others: rest };
  }, [downloads, detectedOS]);

  if (!primary) return null;

  const releaseDateLabel = releaseInfo?.publishedAt
    ? formatShortDate(releaseInfo.publishedAt)
    : "";

  const requestIssueUrl = repoUrl
    ? `${repoUrl}/issues/new?title=${encodeURIComponent(
        `Request build for ${detectedOS !== "unknown" ? detectedOS : "another OS"}`
      )}&body=${encodeURIComponent(
        `Hi Ismail,\n\nCould you share or build a release of ${
          projectName || "this project"
        } for my platform?\n\nPlatform: `
      )}`
    : null;

  return (
    <div className="space-y-3">
      {/* Primary OS-matched download card */}
      <div className="rounded-card border border-hairline bg-surface p-4 sm:p-5 space-y-3">
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <div className="space-y-0.5">
            <div className="font-medium text-base text-ink">{primary.label}</div>
            <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 text-xs text-ink-secondary">
              {primary.size && <span>{primary.size}</span>}
              {releaseInfo?.tag && (
                <>
                  {primary.size && <span aria-hidden="true">·</span>}
                  <span>{releaseInfo.tag}</span>
                </>
              )}
              {releaseDateLabel && (
                <>
                  <span aria-hidden="true">·</span>
                  <span>Released {releaseDateLabel}</span>
                </>
              )}
            </div>
          </div>

          {primary.sha256Url && (
            <a
              href={primary.sha256Url}
              target="_blank"
              rel="noopener noreferrer"
              className="min-h-[36px] inline-flex items-center gap-1 text-xs text-ink-secondary hover:text-ink underline underline-offset-2"
            >
              <span>SHA-256</span>
              <ExternalLink className="w-3 h-3" strokeWidth={1.5} />
            </a>
          )}
        </div>

        <a
          href={primary.url}
          className={buttonClasses({ variant: "primary", className: "w-full sm:w-auto" })}
        >
          <Download className="w-4 h-4" strokeWidth={1.5} />
          <span>
            {primary.label.toLowerCase().startsWith("download")
              ? primary.label
              : `Download ${primary.label}`}
            {primary.size ? ` (${primary.size})` : ""}
          </span>
        </a>
      </div>

      {/* Other downloads disclosure */}
      {(others.length > 0 || requestIssueUrl) && (
        <div className="rounded-control border border-hairline bg-surface px-4 py-1">
          <button
            type="button"
            onClick={() => setShowOther((prev) => !prev)}
            aria-expanded={showOther}
            className="w-full min-h-[44px] flex items-center justify-between gap-2 text-sm text-ink-secondary hover:text-ink transition-colors"
          >
            <span>
              {others.length > 0
                ? `Other downloads (${others.length})`
                : "Need another platform?"}
            </span>
            <ChevronDown
              className={`w-4 h-4 transition-transform duration-150 ${
                showOther ? "rotate-180" : ""
              }`}
              strokeWidth={1.5}
            />
          </button>

          {showOther && (
            <div className="pb-3 pt-2 border-t border-hairline space-y-2.5">
              {others.map((asset) => (
                <div
                  key={asset.url}
                  className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 py-2 border-b border-hairline last:border-b-0"
                >
                  <div className="min-w-0">
                    <div className="text-sm font-medium text-ink">{asset.label}</div>
                    <div className="text-xs text-ink-secondary">
                      {[
                        asset.size,
                        asset.version || releaseInfo?.tag,
                        releaseDateLabel ? `Released ${releaseDateLabel}` : "",
                      ]
                        .filter(Boolean)
                        .join(" · ")}
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    {asset.sha256Url && (
                      <a
                        href={asset.sha256Url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="min-h-[44px] inline-flex items-center text-xs text-ink-secondary hover:text-ink underline underline-offset-2"
                      >
                        SHA-256
                      </a>
                    )}
                    <a
                      href={asset.url}
                      className={buttonClasses({ variant: "quiet" })}
                    >
                      <Download className="w-3.5 h-3.5" strokeWidth={1.5} />
                      <span>Download</span>
                    </a>
                  </div>
                </div>
              ))}

              {requestIssueUrl && (
                <div className="pt-1 text-xs text-ink-secondary">
                  <a
                    href={requestIssueUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 min-h-[36px] text-accent hover:underline"
                  >
                    <span>Request a build for my OS</span>
                    <ExternalLink className="w-3 h-3" strokeWidth={1.5} />
                  </a>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {safetyNote && <DownloadSafetyNote platforms={platforms} />}
    </div>
  );
}
