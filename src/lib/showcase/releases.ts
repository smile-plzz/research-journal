import { GitHubReleaseAssetMeta, GitHubReleaseMeta } from "@/lib/github/client";
import { DownloadAsset, ProjectReleaseInfo } from "./schema";

const CHECKSUM_OR_META_PATTERNS = [
  /^sha256sums/i,
  /\.sha256$/i,
  /\.sig$/i,
  /\.asc$/i,
  /^signing/i,
  /^build-info\.json$/i,
  /\.txt$/i,
  /\.json$/i,
];

const INSTALLABLE_EXT_PATTERN =
  /\.(exe|msi|msix|apk|aab|dmg|pkg|zip|tar\.gz|tgz|appimage|deb|rpm|xpi|crx)$/i;

export function formatFileSize(bytes?: number): string | undefined {
  if (typeof bytes !== "number" || Number.isNaN(bytes) || bytes <= 0) {
    return undefined;
  }
  if (bytes < 1024) return `${bytes} B`;
  const kb = bytes / 1024;
  if (kb < 1024) return `${kb.toFixed(1)} KB`;
  const mb = kb / 1024;
  if (mb < 1024) return `${mb.toFixed(1)} MB`;
  const gb = mb / 1024;
  return `${gb.toFixed(2)} GB`;
}

export function isInstallableAsset(fileName: string): boolean {
  const lower = fileName.toLowerCase();
  if (CHECKSUM_OR_META_PATTERNS.some((re) => re.test(lower))) {
    return false;
  }
  return INSTALLABLE_EXT_PATTERN.test(lower);
}

export function inferAssetPlatformAndLabel(
  fileName: string,
  version?: string
): { platform: string; label: string } {
  const lower = fileName.toLowerCase();
  const extMatch = lower.match(/\.(exe|msi|msix|apk|dmg|pkg|tar\.gz|appimage|deb|zip)$/);
  const extLabel = extMatch ? `.${extMatch[1]}` : "";
  const versionSuffix = version ? "" : "";

  if (lower.includes("chrome") && lower.endsWith(".zip")) {
    return {
      platform: "browser-extension",
      label: `Download for Chrome & Edge (${extLabel})${versionSuffix}`,
    };
  }
  if (lower.includes("firefox") && (lower.endsWith(".zip") || lower.endsWith(".xpi"))) {
    return {
      platform: "browser-extension",
      label: `Download for Firefox (${extLabel})${versionSuffix}`,
    };
  }
  if (lower.endsWith(".apk")) {
    const isDebug = lower.includes("debug");
    return {
      platform: "android",
      label: isDebug
        ? "Android Debug Build (.apk)"
        : "Download for Android (.apk)",
    };
  }
  if (
    lower.endsWith(".exe") ||
    lower.endsWith(".msi") ||
    lower.endsWith(".msix") ||
    lower.includes("win-x64") ||
    lower.includes("windows") ||
    lower.includes("win32")
  ) {
    return {
      platform: "windows",
      label: `Download for Windows (${extLabel || ".zip"})`,
    };
  }
  if (lower.endsWith(".dmg") || lower.endsWith(".pkg") || lower.includes("osx") || lower.includes("macos") || lower.includes("darwin")) {
    const arch = lower.includes("arm64")
      ? "Apple Silicon"
      : lower.includes("x64") || lower.includes("intel")
      ? "Intel"
      : "";
    return {
      platform: "macos",
      label: arch
        ? `Download for macOS ${arch} (${extLabel})`
        : `Download for macOS (${extLabel || ".dmg"})`,
    };
  }
  if (lower.endsWith(".appimage") || lower.endsWith(".deb") || lower.endsWith(".rpm") || lower.includes("linux")) {
    return {
      platform: "linux",
      label: `Download for Linux (${extLabel || ".tar.gz"})`,
    };
  }

  return {
    platform: "other",
    label: `Download ${fileName}`,
  };
}

function findChecksumUrl(
  assets: GitHubReleaseAssetMeta[],
  assetName: string
): string | undefined {
  const exact = assets.find(
    (a) => a.name.toLowerCase() === `${assetName.toLowerCase()}.sha256`
  );
  if (exact) return exact.browser_download_url;

  const general = assets.find((a) =>
    /^sha256sums/i.test(a.name)
  );
  return general?.browser_download_url;
}

function filterPreferredAssets(assets: GitHubReleaseAssetMeta[]): GitHubReleaseAssetMeta[] {
  const installable = assets.filter((a) => isInstallableAsset(a.name));
  const hasReleaseApk = installable.some(
    (a) => a.name.toLowerCase().endsWith(".apk") && !a.name.toLowerCase().includes("debug")
  );
  if (hasReleaseApk) {
    return installable.filter(
      (a) => !(a.name.toLowerCase().endsWith(".apk") && a.name.toLowerCase().includes("debug"))
    );
  }
  return installable;
}

export interface ParsedReleaseSelection {
  downloads: DownloadAsset[];
  releaseInfo?: ProjectReleaseInfo;
}

/**
 * Selects the best non-draft release containing installable binary assets.
 * Handles cases where the latest tag has 0 assets (e.g. tag-only release)
 * by falling back to the newest release that carries actual binaries.
 */
export function parseReleaseAssets(
  releases: GitHubReleaseMeta[],
  options: { includePrereleases?: boolean } = {}
): ParsedReleaseSelection {
  if (!releases || releases.length === 0) {
    return { downloads: [] };
  }

  const nonDraft = releases.filter((r) => !r.draft);
  const withInstallable = nonDraft
    .map((r) => ({
      release: r,
      assets: filterPreferredAssets(r.assets || []),
    }))
    .filter((entry) => entry.assets.length > 0);

  if (withInstallable.length === 0) {
    return { downloads: [] };
  }

  // Prefer stable release with assets unless includePrereleases is enabled
  // or no stable release has any assets.
  const latestStable = withInstallable.find((entry) => !entry.release.prerelease);
  const chosen = options.includePrereleases
    ? withInstallable[0]
    : latestStable || withInstallable[0];

  const downloads: DownloadAsset[] = chosen.assets.map((asset) => {
    const inferred = inferAssetPlatformAndLabel(
      asset.name,
      chosen.release.tag_name
    );
    return {
      label: inferred.label,
      platform: inferred.platform,
      url: asset.browser_download_url,
      fileName: asset.name,
      size: formatFileSize(asset.size),
      sizeBytes: asset.size,
      version: chosen.release.tag_name,
      isPrerelease: chosen.release.prerelease,
      sha256Url: findChecksumUrl(chosen.release.assets || [], asset.name),
    };
  });

  const releaseInfo: ProjectReleaseInfo = {
    tag: chosen.release.tag_name,
    name: chosen.release.name || undefined,
    publishedAt: chosen.release.published_at || chosen.release.created_at,
    isPrerelease: chosen.release.prerelease,
    releaseUrl: chosen.release.html_url,
  };

  return { downloads, releaseInfo };
}

