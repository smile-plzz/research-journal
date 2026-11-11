export type ReaderFontFamily = "serif" | "sans" | "mono";
export type ReaderFontSize = "sm" | "base" | "lg" | "xl";
export type ReaderLineSpacing = "compact" | "relaxed" | "spacious";
export type ReaderWidth = "narrow" | "standard" | "wide";
export type ReaderAlignment = "left" | "justify";
export type ReaderViewMode = "reader" | "outline" | "raw";

export interface ReaderPreferences {
  fontFamily: ReaderFontFamily;
  fontSize: ReaderFontSize;
  lineSpacing: ReaderLineSpacing;
  width: ReaderWidth;
  alignment: ReaderAlignment;
}

export const DEFAULT_READER_PREFERENCES: ReaderPreferences = {
  fontFamily: "serif",
  fontSize: "base",
  lineSpacing: "relaxed",
  width: "standard",
  alignment: "left",
};

export interface ExtractedHeading {
  id: string;
  text: string;
  level: number;
  preview?: string;
}

export function slugifyHeading(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function extractMarkdownHeadings(markdown: string): ExtractedHeading[] {
  const lines = markdown.split(/\r?\n/);
  const items: ExtractedHeading[] = [];
  let inCodeBlock = false;

  for (let i = 0; i < lines.length; i++) {
    const trimmed = lines[i].trim();
    if (trimmed.startsWith("```")) {
      inCodeBlock = !inCodeBlock;
      continue;
    }
    if (inCodeBlock) continue;

    const match = trimmed.match(/^(#{1,3})\s+(.+)$/);
    if (!match) continue;

    const level = match[1].length;
    const rawText = match[2]
      .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
      .replace(/[*_`]/g, "")
      .trim();
    const id = slugifyHeading(rawText);

    // Capture first non-empty preview line under this heading
    let preview = "";
    for (let j = i + 1; j < Math.min(i + 8, lines.length); j++) {
      const nextLine = lines[j].trim();
      if (!nextLine || nextLine.startsWith("#") || nextLine.startsWith("```") || nextLine.startsWith("|")) {
        if (preview) break;
        continue;
      }
      preview = nextLine
        .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
        .replace(/[*_`>]/g, "")
        .trim();
      if (preview.length > 140) {
        preview = preview.slice(0, 137) + "...";
      }
      break;
    }

    if (id && rawText) {
      items.push({ id, text: rawText, level, preview });
    }
  }

  return items;
}

