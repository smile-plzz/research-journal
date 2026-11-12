"use client";

import { useState } from "react";
import { Check, Copy, Download } from "lucide-react";
import { Work } from "@/lib/catalog/schema";
import {
  CitationFormat,
  formatWorkCitation,
} from "@/lib/catalog/citations";
import { buttonClasses } from "@/components/ui/Button";

interface CitationBoxProps {
  work: Work;
}

export function CitationBox({ work }: CitationBoxProps) {
  const [copied, setCopied] = useState(false);
  const [format, setFormat] = useState<CitationFormat>("bibtex");

  const currentText = formatWorkCitation(work, format);

  const handleCopy = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(currentText);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    }
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
    <div className="space-y-3">
      <div
        role="tablist"
        aria-label="Citation format"
        className="inline-flex flex-wrap items-center gap-1 rounded-control border border-hairline bg-bg p-1"
      >
        {(["bibtex", "apa", "ieee", "chicago"] as CitationFormat[]).map((fmt) => (
          <button
            key={fmt}
            type="button"
            role="tab"
            aria-selected={format === fmt}
            onClick={() => setFormat(fmt)}
            className={`min-h-[36px] px-3 rounded-lg uppercase text-xs font-mono transition-colors ${
              format === fmt
                ? "bg-accent text-accent-ink font-medium"
                : "text-ink-secondary hover:text-ink"
            }`}
          >
            {fmt}
          </button>
        ))}
      </div>

      <pre className="p-3.5 rounded-control bg-surface-muted border border-hairline text-xs font-mono text-ink overflow-x-auto whitespace-pre-wrap break-words leading-relaxed select-all">
        {currentText}
      </pre>

      <div className="flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={handleCopy}
          className={buttonClasses({ variant: "primary" })}
        >
          {copied ? (
            <>
              <Check className="w-4 h-4" strokeWidth={1.5} />
              <span>Copied</span>
            </>
          ) : (
            <>
              <Copy className="w-4 h-4" strokeWidth={1.5} />
              <span>Copy {format.toUpperCase()}</span>
            </>
          )}
        </button>

        <button
          type="button"
          onClick={handleDownloadBibtex}
          className={buttonClasses({ variant: "quiet" })}
        >
          <Download className="w-4 h-4" strokeWidth={1.5} />
          <span>Download .bib</span>
        </button>
      </div>
    </div>
  );
}
