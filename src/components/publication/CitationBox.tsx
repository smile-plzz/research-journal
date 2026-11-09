"use client";

import { useState } from "react";
import { Work } from "@/lib/catalog/schema";
import { Copy, Check, Quote } from "lucide-react";

interface CitationBoxProps {
  work: Work;
}

export function CitationBox({ work }: CitationBoxProps) {
  const [copied, setCopied] = useState(false);
  const [format, setFormat] = useState<"bibtex" | "apa">("bibtex");

  const authorNames = work.authors.map((a) => a.name).join(", ");
  const year = work.publishedAt
    ? new Date(work.publishedAt).getFullYear()
    : "2026";
  const apaCitation = `${authorNames} (${year}). ${work.title}. GitHub Academic Research Journal. https://github.com/smile-plzz/${work.editions[0]?.repoName || work.slug}`;

  const currentText = format === "bibtex" ? work.bibtexCitation || "" : apaCitation;

  const handleCopy = () => {
    navigator.clipboard.writeText(currentText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="my-8 p-5 rounded-lg bg-stone-100/70 dark:bg-stone-900/60 border border-stone-200 dark:border-stone-800">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Quote className="w-4 h-4 text-academic" />
          <h4 className="font-serif text-sm font-semibold text-stone-900 dark:text-stone-100">
            Cite This Work
          </h4>
        </div>

        <div className="flex items-center gap-2">
          {/* Format selector */}
          <div className="flex items-center rounded border border-stone-300 dark:border-stone-700 p-0.5 text-xs bg-white dark:bg-stone-800">
            <button
              onClick={() => setFormat("bibtex")}
              className={`px-2 py-0.5 rounded transition-colors ${
                format === "bibtex"
                  ? "bg-academic text-white font-medium"
                  : "text-stone-600 dark:text-stone-400"
              }`}
            >
              BibTeX
            </button>
            <button
              onClick={() => setFormat("apa")}
              className={`px-2 py-0.5 rounded transition-colors ${
                format === "apa"
                  ? "bg-academic text-white font-medium"
                  : "text-stone-600 dark:text-stone-400"
              }`}
            >
              APA
            </button>
          </div>

          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-medium bg-stone-200 dark:bg-stone-800 hover:bg-stone-300 dark:hover:bg-stone-700 text-stone-800 dark:text-stone-200 transition-colors"
            title="Copy citation to clipboard"
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
        </div>
      </div>

      <pre className="p-3 rounded bg-white dark:bg-stone-950 border border-stone-200 dark:border-stone-800 text-xs font-mono text-stone-800 dark:text-stone-200 overflow-x-auto whitespace-pre-wrap leading-relaxed">
        {currentText}
      </pre>
    </div>
  );
}

