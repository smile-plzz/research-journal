"use client";

import { useState } from "react";
import { Work } from "@/lib/catalog/schema";
import { Copy, Check, Quote, Download } from "lucide-react";

interface CitationBoxProps {
  work: Work;
}

type CitationFormat = "bibtex" | "apa" | "ieee" | "chicago";

export function CitationBox({ work }: CitationBoxProps) {
  const [copied, setCopied] = useState(false);
  const [format, setFormat] = useState<CitationFormat>("bibtex");

  const authorNames = work.authors.map((a) => a.name).join(", ");
  const year = work.publishedAt
    ? new Date(work.publishedAt).getFullYear()
    : "2026";
  const repoUrl = `https://github.com/smile-plzz/${work.editions[0]?.repoName || work.slug}`;

  // APA 7th Format
  const apaCitation = `${authorNames} (${year}). ${work.title}${
    work.subtitle ? `: ${work.subtitle}` : ""
  }. GitHub Academic Research Journal. ${repoUrl}`;

  // IEEE Format
  const ieeeCitation = `${work.authors
    .map((a) => {
      const parts = a.name.split(" ");
      return parts.length > 1
        ? `${parts[0][0]}. ${parts.slice(1).join(" ")}`
        : a.name;
    })
    .join(", ")}, "${work.title}," GitHub Academic Research Journal, ${year}. [Online]. Available: ${repoUrl}`;

  // Chicago Author-Date Format
  const chicagoCitation = `${authorNames}. ${year}. "${work.title}." GitHub Academic Research Journal. ${repoUrl}.`;

  const getCitationText = () => {
    switch (format) {
      case "bibtex":
        return work.bibtexCitation || "";
      case "apa":
        return apaCitation;
      case "ieee":
        return ieeeCitation;
      case "chicago":
        return chicagoCitation;
    }
  };

  const currentText = getCitationText();

  const handleCopy = () => {
    navigator.clipboard.writeText(currentText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadBibtex = () => {
    const blob = new Blob([work.bibtexCitation || currentText], {
      type: "application/x-bibtex;charset=utf-8;",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `${work.slug}.bib`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="my-8 p-5 rounded-lg bg-stone-100/70 dark:bg-stone-900/60 border border-stone-200 dark:border-stone-800">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
        <div className="flex items-center gap-2">
          <Quote className="w-4 h-4 text-academic" />
          <h4 className="font-serif text-sm font-semibold text-stone-900 dark:text-stone-100">
            Cite This Research
          </h4>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Format selector tabs */}
          <div className="flex items-center rounded border border-stone-300 dark:border-stone-700 p-0.5 text-xs bg-white dark:bg-stone-800">
            {(["bibtex", "apa", "ieee", "chicago"] as CitationFormat[]).map(
              (fmt) => (
                <button
                  key={fmt}
                  onClick={() => setFormat(fmt)}
                  className={`px-2 py-0.5 rounded uppercase text-[11px] font-mono transition-colors ${
                    format === fmt
                      ? "bg-academic text-white font-medium shadow-xs"
                      : "text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100"
                  }`}
                >
                  {fmt}
                </button>
              )
            )}
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-medium bg-stone-200 dark:bg-stone-800 hover:bg-stone-300 dark:hover:bg-stone-700 text-stone-800 dark:text-stone-200 transition-colors"
              title="Copy formatted citation"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                  <span>Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy</span>
                </>
              )}
            </button>

            <button
              onClick={handleDownloadBibtex}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-medium bg-stone-200 dark:bg-stone-800 hover:bg-stone-300 dark:hover:bg-stone-700 text-stone-800 dark:text-stone-200 transition-colors"
              title="Download citation as .bib file"
            >
              <Download className="w-3.5 h-3.5" />
              <span>.bib</span>
            </button>
          </div>
        </div>
      </div>

      <pre className="p-3.5 rounded bg-white dark:bg-stone-950 border border-stone-200 dark:border-stone-800 text-xs font-mono text-stone-800 dark:text-stone-200 overflow-x-auto whitespace-pre-wrap leading-relaxed select-all">
        {currentText}
      </pre>
    </div>
  );
}
