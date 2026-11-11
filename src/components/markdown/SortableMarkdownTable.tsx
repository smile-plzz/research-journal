"use client";

import React, { useMemo, useState } from "react";
import {
  compareCellValues,
  extractTextFromReactNode,
  tableToCsv,
  tableToMarkdown,
} from "@/lib/markdown/table-utils";
import { Tooltip } from "@/components/ui/Tooltip";
import {
  ArrowDown,
  ArrowUp,
  ArrowUpDown,
  Check,
  Copy,
  FileSpreadsheet,
  Search,
  WrapText,
  Rows3,
  X,
} from "lucide-react";

interface SortableMarkdownTableProps {
  children?: React.ReactNode;
}

interface ParsedCell {
  node: React.ReactNode;
  text: string;
}

function toArray(children: React.ReactNode): React.ReactElement[] {
  return React.Children.toArray(children).filter((child): child is React.ReactElement =>
    React.isValidElement(child)
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
    const headerRows = toArray((thead.props as { children?: React.ReactNode }).children);
    const firstRow = headerRows[0];
    if (firstRow) {
      const cells = toArray((firstRow.props as { children?: React.ReactNode }).children);
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
    const bodyRows = toArray((tbody.props as { children?: React.ReactNode }).children);
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
  const { headers, rows } = useMemo(() => parseTableChildren(children), [children]);

  const [sortCol, setSortCol] = useState<number | null>(null);
  const [sortDir, setSortDir] = useState<"asc" | "desc">("asc");
  const [filterText, setFilterText] = useState("");
  const [showFilter, setShowFilter] = useState(false);
  const [compact, setCompact] = useState(false);
  const [wrapCells, setWrapCells] = useState(true);
  const [copiedFormat, setCopiedFormat] = useState<"csv" | "md" | null>(null);

  const visibleRows = useMemo(() => {
    const q = filterText.toLowerCase().trim();
    const filtered = q
      ? rows.filter((row) => row.some((c) => c.text.toLowerCase().includes(q)))
      : rows;

    if (sortCol === null) {
      return filtered;
    }

    return [...filtered].sort((a, b) => {
      const valA = a[sortCol]?.text || "";
      const valB = b[sortCol]?.text || "";
      return compareCellValues(valA, valB, sortDir);
    });
  }, [rows, filterText, sortCol, sortDir]);

  // Fallback for non-standard tables without thead/rows
  if (headers.length === 0 || rows.length === 0) {
    return (
      <div className="overflow-x-auto my-6">
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
      setTimeout(() => setCopiedFormat(null), 1800);
    }
  };

  const isLongTable = rows.length >= 4;

  return (
    <div className="my-6 rounded-xl border border-stone-200 dark:border-stone-800 bg-white/80 dark:bg-stone-900/40 overflow-hidden font-sans not-prose">
      {/* Interactive Table Control Bar */}
      <div className="flex flex-wrap items-center justify-between gap-2 px-3 py-2 border-b border-stone-200/80 dark:border-stone-800/80 bg-stone-50/90 dark:bg-stone-900/70 text-[11px]">
        <div className="flex items-center gap-2 text-stone-500 dark:text-stone-400">
          <span className="font-mono">
            {visibleRows.length === rows.length
              ? `${rows.length} ${rows.length === 1 ? "row" : "rows"}`
              : `${visibleRows.length} of ${rows.length} rows`}
          </span>
          {sortCol !== null && (
            <Tooltip content="Reset column sorting back to original order">
              <button
                type="button"
                onClick={() => setSortCol(null)}
                className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-academic/10 text-academic dark:text-academic-dark hover:bg-academic/20 transition-colors"
              >
                <span>Sorted by {headers[sortCol]?.text || "column"}</span>
                <X className="w-3 h-3" />
              </button>
            </Tooltip>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-1.5">
          {(isLongTable || showFilter) && (
            <div className="relative flex items-center">
              <Search className="w-3 h-3 text-stone-400 absolute left-2 pointer-events-none" />
              <input
                type="text"
                value={filterText}
                onChange={(e) => setFilterText(e.target.value)}
                placeholder="Filter rows..."
                aria-label="Filter table rows"
                className="pl-6 pr-6 py-1 rounded border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-950 text-stone-800 dark:text-stone-200 text-[11px] w-36 focus:outline-none focus:ring-1 focus:ring-academic"
              />
              {filterText && (
                <button
                  type="button"
                  onClick={() => setFilterText("")}
                  aria-label="Clear table filter"
                  className="absolute right-1.5 text-stone-400 hover:text-stone-700 dark:hover:text-stone-200"
                >
                  <X className="w-3 h-3" />
                </button>
              )}
            </div>
          )}

          {!isLongTable && !showFilter && (
            <Tooltip content="Filter rows in this table">
              <button
                type="button"
                onClick={() => setShowFilter(true)}
                className="p-1.5 rounded text-stone-500 hover:text-stone-900 dark:text-stone-400 dark:hover:text-stone-100 hover:bg-stone-200/60 dark:hover:bg-stone-800 transition-colors"
                aria-label="Filter table rows"
              >
                <Search className="w-3.5 h-3.5" />
              </button>
            </Tooltip>
          )}

          <Tooltip content={compact ? "Switch to comfortable row height" : "Switch to compact row height"}>
            <button
              type="button"
              onClick={() => setCompact((v) => !v)}
              className={`p-1.5 rounded transition-colors ${
                compact
                  ? "bg-stone-200 dark:bg-stone-800 text-stone-900 dark:text-stone-100"
                  : "text-stone-500 hover:text-stone-900 dark:text-stone-400 dark:hover:text-stone-100 hover:bg-stone-200/60 dark:hover:bg-stone-800"
              }`}
              aria-label="Toggle table density"
            >
              <Rows3 className="w-3.5 h-3.5" />
            </button>
          </Tooltip>

          <Tooltip content={wrapCells ? "Disable text wrap (horizontal scroll)" : "Wrap long cell text"}>
            <button
              type="button"
              onClick={() => setWrapCells((v) => !v)}
              className={`p-1.5 rounded transition-colors ${
                wrapCells
                  ? "bg-stone-200 dark:bg-stone-800 text-stone-900 dark:text-stone-100"
                  : "text-stone-500 hover:text-stone-900 dark:text-stone-400 dark:hover:text-stone-100 hover:bg-stone-200/60 dark:hover:bg-stone-800"
              }`}
              aria-label="Toggle cell text wrapping"
            >
              <WrapText className="w-3.5 h-3.5" />
            </button>
          </Tooltip>

          <Tooltip content="Copy visible table rows as CSV">
            <button
              type="button"
              onClick={() => handleCopy("csv")}
              className="inline-flex items-center gap-1 px-2 py-1 rounded border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-600 dark:text-stone-300 hover:border-academic transition-colors"
            >
              {copiedFormat === "csv" ? (
                <Check className="w-3 h-3 text-emerald-600" />
              ) : (
                <FileSpreadsheet className="w-3 h-3" />
              )}
              <span>CSV</span>
            </button>
          </Tooltip>

          <Tooltip content="Copy visible table rows as Markdown">
            <button
              type="button"
              onClick={() => handleCopy("md")}
              className="inline-flex items-center gap-1 px-2 py-1 rounded border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-600 dark:text-stone-300 hover:border-academic transition-colors"
            >
              {copiedFormat === "md" ? (
                <Check className="w-3 h-3 text-emerald-600" />
              ) : (
                <Copy className="w-3 h-3" />
              )}
              <span>MD</span>
            </button>
          </Tooltip>
        </div>
      </div>

      {/* Table Body */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse text-xs sm:text-sm">
          <thead>
            <tr className="bg-stone-100/80 dark:bg-stone-800/70 border-b border-stone-200 dark:border-stone-800">
              {headers.map((header, idx) => {
                const isSorted = sortCol === idx;
                return (
                  <th
                    key={idx}
                    scope="col"
                    className={`${
                      compact ? "px-3 py-1.5" : "px-3.5 py-2.5"
                    } font-semibold text-stone-800 dark:text-stone-200 select-none ${
                      wrapCells ? "" : "whitespace-nowrap"
                    }`}
                  >
                    <Tooltip content={`Sort by ${header.text || "column"}`}>
                      <button
                        type="button"
                        onClick={() => handleSort(idx)}
                        className="inline-flex items-center gap-1.5 text-left hover:text-academic dark:hover:text-academic-dark transition-colors focus:outline-none focus-visible:underline"
                      >
                        <span>{header.node}</span>
                        {isSorted ? (
                          sortDir === "asc" ? (
                            <ArrowUp className="w-3.5 h-3.5 text-academic flex-shrink-0" />
                          ) : (
                            <ArrowDown className="w-3.5 h-3.5 text-academic flex-shrink-0" />
                          )
                        ) : (
                          <ArrowUpDown className="w-3 h-3 text-stone-400 flex-shrink-0" />
                        )}
                      </button>
                    </Tooltip>
                  </th>
                );
              })}
            </tr>
          </thead>

          <tbody className="divide-y divide-stone-200/70 dark:divide-stone-800/70">
            {visibleRows.length === 0 ? (
              <tr>
                <td
                  colSpan={headers.length}
                  className="px-4 py-6 text-center text-xs text-stone-500 dark:text-stone-400"
                >
                  No table rows match &ldquo;{filterText}&rdquo;.
                </td>
              </tr>
            ) : (
              visibleRows.map((row, rIdx) => (
                <tr
                  key={rIdx}
                  className="hover:bg-stone-50 dark:hover:bg-stone-800/40 even:bg-stone-50/40 dark:even:bg-stone-900/30 transition-colors"
                >
                  {headers.map((_, cIdx) => (
                    <td
                      key={cIdx}
                      className={`${
                        compact ? "px-3 py-1.5" : "px-3.5 py-2.5"
                      } text-stone-700 dark:text-stone-300 align-top leading-relaxed ${
                        wrapCells ? "" : "whitespace-nowrap"
                      }`}
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
    </div>
  );
}

