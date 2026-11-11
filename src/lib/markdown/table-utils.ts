import React from "react";

/**
 * Extracts plain text recursively from a React node tree for table sorting and export.
 */
export function extractTextFromReactNode(node: React.ReactNode): string {
  if (node === null || node === undefined || typeof node === "boolean") {
    return "";
  }
  if (typeof node === "string" || typeof node === "number") {
    return String(node);
  }
  if (Array.isArray(node)) {
    return node.map(extractTextFromReactNode).join("").trim();
  }
  if (React.isValidElement(node)) {
    const props = node.props as { children?: React.ReactNode };
    return extractTextFromReactNode(props.children);
  }
  return "";
}

function parseSortableNumber(value: string): number | null {
  const cleaned = value.trim().replace(/,/g, "");
  // Match leading numeric value with optional unit (e.g. "84.6 MB", "98.77%", "0.428", "-3.5")
  const m = cleaned.match(/^([+-]?\d+(?:\.\d+)?)\s*(%|kb|mb|gb|tb|ms|s|m|min|x)?$/i);
  if (!m) return null;
  const num = Number.parseFloat(m[1]);
  if (Number.isNaN(num)) return null;
  const unit = m[2]?.toLowerCase();
  if (unit === "kb") return num * 1024;
  if (unit === "mb") return num * 1024 * 1024;
  if (unit === "gb") return num * 1024 * 1024 * 1024;
  if (unit === "tb") return num * 1024 * 1024 * 1024 * 1024;
  return num;
}

/**
 * Compares two table cell strings using numeric-aware ordering first, falling back
 * to case-insensitive natural locale collation.
 */
export function compareCellValues(
  a: string,
  b: string,
  direction: "asc" | "desc"
): number {
  const numA = parseSortableNumber(a);
  const numB = parseSortableNumber(b);

  let result = 0;
  if (numA !== null && numB !== null) {
    result = numA - numB;
  } else {
    result = a.localeCompare(b, undefined, { numeric: true, sensitivity: "base" });
  }

  return direction === "asc" ? result : -result;
}

function escapeCsvCell(value: string): string {
  const normalized = value.replace(/\r?\n/g, " ").trim();
  if (/[",]/.test(normalized)) {
    return `"${normalized.replace(/"/g, '""')}"`;
  }
  return normalized;
}

export function tableToCsv(headers: string[], rows: string[][]): string {
  const lines = [
    headers.map(escapeCsvCell).join(","),
    ...rows.map((r) => r.map(escapeCsvCell).join(",")),
  ];
  return lines.join("\n");
}

export function tableToMarkdown(headers: string[], rows: string[][]): string {
  const sanitize = (s: string) => s.replace(/\|/g, "\\|").replace(/\r?\n/g, " ").trim();
  const lines = [
    `| ${headers.map(sanitize).join(" | ")} |`,
    `| ${headers.map(() => "---").join(" | ")} |`,
    ...rows.map((r) => `| ${r.map(sanitize).join(" | ")} |`),
  ];
  return lines.join("\n");
}

