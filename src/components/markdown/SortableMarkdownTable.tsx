"use client";

import React, { useMemo, useState } from "react";
import {
  ArrowDown,
  ArrowUp,
  ArrowUpDown,
  Check,
  Copy,
  FileSpreadsheet,
  Search,
  X,
} from "lucide-react";
import {
  compareCellValues,
  extractTextFromReactNode,
  tableToCsv,
  tableToMarkdown,
} from "@/lib/markdown/table-utils";

interface SortableMarkdownTableProps {
  children?: React.ReactNode;
}

interface ParsedCell {
  node: React.ReactNode;
  text: string;
}

function toArray(children: React.ReactNode): React.ReactElement[] {
  return React.Children.toArray(children).filter(
    (child): child is React.ReactElement => React.isValidElement(child)
  );
}

function parseTableChildren(children: React.ReactNode): {
  headers: ParsedCell[];
  rows: ParsedCell[][];
} {
  const sections = toArray(children);
  const thead = sections.find((el) => el.type === "thead");
  const tbody = sections.find((el) => el.type === "tbody");

  const headers: ParsedCell[] = [];
  if (thead) {
    const headerRows = toArray(
      (thead.props as { children?: React.ReactNode }).children
    );
    const firstRow = headerRows[0];
    if (firstRow) {
      const cells = toArray(
        (firstRow.props as { children?: React.ReactNode }).children
      );
      for (const cell of cells) {
        const cellNode = (cell.props as { children?: React.ReactNode }).children;
        headers.push({
          node: cellNode,
          text: extractTextFromReactNode(cellNode),
        });
      }
    }
  }

  const rows: ParsedCell[][] = [];
  if (tbody) {
    const bodyRows = toArray(
      (tbody.props as { children?: React.ReactNode }).children
    );
    for (const tr of bodyRows) {
      const cells = toArray((tr.props as { children?: React.ReactNode }).children);
      const parsedRow: ParsedCell[] = cells.map((cell) => {
        const cellNode = (cell.props as { children?: React.ReactNode }).children;
        return {
          node: cellNode,
          text: extractTextFromReactNode(cellNode),
        };
      });
      if (parsedRow.length > 0) {
        rows.push(parsedRow);
      }
    }
  }

  return { headers, rows };
}

export function SortableMarkdownTable({ children }: SortableMarkdownTableProps) {
  const { headers, rows } = useMemo(
    () => parseTableChildren(children),
    [children]
  );

  const [sortCol, setSortCol] = useState<number | null>(null);
  const [sortDir, setSortDir] = useState<"asc" | "desc">("asc");
  const [filterText, setFilterText] = useState("");
  const [copiedFormat, setCopiedFormat] = useState<"csv" | "md" | null>(null);

  const visibleRows = useMemo(() => {
    const q = filterText.toLowerCase().trim();
    const filtered = q
      ? rows.filter((row) => row.some((c) => c.text.toLowerCase().includes(q)))
      : rows;

    if (sortCol === null) return filtered;

    return [...filtered].sort((a, b) => {
      const valA = a[sortCol]?.text || "";
      const valB = b[sortCol]?.text || "";
      return compareCellValues(valA, valB, sortDir);
    });
  }, [rows, filterText, sortCol, sortDir]);

  if (headers.length === 0 || rows.length === 0) {
    return (
      <div className="relative overflow-x-auto my-6 rounded-card border border-hairline">
        <table className="w-full text-left border-collapse">{children}</table>
      </div>
    );
  }

  const handleSort = (colIdx: number) => {
    if (sortCol !== colIdx) {
      setSortCol(colIdx);
      setSortDir("asc");
    } else if (sortDir === "asc") {
      setSortDir("desc");
    } else {
      setSortCol(null);
      setSortDir("asc");
    }
  };

  const handleCopy = (format: "csv" | "md") => {
    const headerTexts = headers.map((h) => h.text);
    const rowTexts = visibleRows.map((r) => r.map((c) => c.text));
    const output =
      format === "csv"
        ? tableToCsv(headerTexts, rowTexts)
        : tableToMarkdown(headerTexts, rowTexts);

    if (navigator.clipboard) {
      navigator.clipboard.writeText(output);
      setCopiedFormat(format);
      window.setTimeout(() => setCopiedFormat(null), 1800);
    }
  };

  return (
    <div className="my-6 rounded-card border border-hairline bg-surface overflow-hidden font-sans not-prose max-w-full">
      {/* Compact Table Bar */}
      <div className="flex flex-wrap items-center justify-between gap-2 px-3 py-1.5 border-b border-hairline bg-surface-muted/70 text-xs">
        <span className="text-ink-secondary">
          {visibleRows.length === rows.length
            ? `${rows.length} ${rows.length === 1 ? "row" : "rows"}`
            : `${visibleRows.length} of ${rows.length}`}
        </span>

        <div className="flex flex-wrap items-center gap-1.5">
          {rows.length >= 4 && (
            <div className="relative flex items-center">
              <Search
                className="w-3.5 h-3.5 text-ink-secondary absolute left-2.5 pointer-events-none"
                strokeWidth={1.5}
              />
              <input
                type="search"
                inputMode="search"
                value={filterText}
                onChange={(e) => setFilterText(e.target.value)}
                placeholder="Filter rows..."
                aria-label="Filter table rows"
                className="min-h-[36px] pl-7 pr-7 py-1 rounded-control border border-hairline-strong bg-surface text-base sm:text-xs text-ink w-36 sm:w-44 focus:outline-none"
              />
              {filterText && (
                <button
                  type="button"
                  onClick={() => setFilterText("")}
                  aria-label="Clear table filter"
                  className="absolute right-1.5 p-1 text-ink-secondary hover:text-ink"
                >
                  <X className="w-3.5 h-3.5" strokeWidth={1.5} />
                </button>
              )}
            </div>
          )}

          <button
            type="button"
            onClick={() => handleCopy("csv")}
            aria-label="Copy table as CSV"
            className="min-h-[36px] inline-flex items-center gap-1 px-2.5 rounded-control border border-hairline bg-surface text-ink-secondary hover:text-ink transition-colors"
          >
            {copiedFormat === "csv" ? (
              <Check className="w-3.5 h-3.5 text-accent" strokeWidth={1.5} />
            ) : (
              <FileSpreadsheet className="w-3.5 h-3.5" strokeWidth={1.5} />
            )}
            <span>CSV</span>
          </button>

          <button
            type="button"
            onClick={() => handleCopy("md")}
            title="Copy table as Markdown"
            aria-label="Copy Markdown"
            className="min-h-[36px] inline-flex items-center gap-1 px-2.5 rounded-control border border-hairline bg-surface text-ink-secondary hover:text-ink transition-colors"
          >
            {copiedFormat === "md" ? (
              <Check className="w-3.5 h-3.5 text-accent" strokeWidth={1.5} />
            ) : (
              <Copy className="w-3.5 h-3.5" strokeWidth={1.5} />
            )}
            <span>Markdown</span>
          </button>
        </div>
      </div>

      {/* Scrollable Table Container with Subtle Right Edge Fade */}
      <div className="relative">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs sm:text-sm">
            <thead>
              <tr className="bg-surface-muted/50 border-b border-hairline">
                {headers.map((header, idx) => {
                  const isSorted = sortCol === idx;
                  return (
                    <th
                      key={idx}
                      scope="col"
                      className="px-3.5 py-2.5 font-medium text-ink select-none"
                    >
                      <button
                        type="button"
                        onClick={() => handleSort(idx)}
                        className="min-h-[36px] inline-flex items-center gap-1.5 text-left hover:text-accent transition-colors"
                      >
                        <span>{header.node}</span>
                        {isSorted ? (
                          sortDir === "asc" ? (
                            <ArrowUp className="w-3.5 h-3.5 text-accent flex-shrink-0" strokeWidth={1.5} />
                          ) : (
                            <ArrowDown className="w-3.5 h-3.5 text-accent flex-shrink-0" strokeWidth={1.5} />
                          )
                        ) : (
                          <ArrowUpDown className="w-3 h-3 text-ink-secondary flex-shrink-0" strokeWidth={1.5} />
                        )}
                      </button>
                    </th>
                  );
                })}
              </tr>
            </thead>

            <tbody className="divide-y divide-hairline">
              {visibleRows.length === 0 ? (
                <tr>
                  <td
                    colSpan={headers.length}
                    className="px-4 py-6 text-center text-xs text-ink-secondary"
                  >
                    No matching rows.
                  </td>
                </tr>
              ) : (
                visibleRows.map((row, rIdx) => (
                  <tr key={rIdx} className="hover:bg-surface-muted/40 transition-colors">
                    {headers.map((_, cIdx) => (
                      <td
                        key={cIdx}
                        className="px-3.5 py-2.5 text-ink align-top leading-relaxed"
                      >
                        {row[cIdx]?.node ?? ""}
                      </td>
                    ))}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 right-0 w-4 bg-gradient-to-l from-surface to-transparent sm:hidden"
        />
      </div>
    </div>
  );
}
