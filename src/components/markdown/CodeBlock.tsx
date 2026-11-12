"use client";

import React, { useState } from "react";
import { Check, Copy, WrapText } from "lucide-react";
import { extractTextFromReactNode } from "@/lib/markdown/table-utils";

interface CodeBlockProps {
  children?: React.ReactNode;
}

export function CodeBlock({ children }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);
  const [wrap, setWrap] = useState(false);

  let language = "";
  if (React.isValidElement(children)) {
    const className = (children.props as { className?: string })?.className || "";
    const m = className.match(/language-([\w-]+)/);
    if (m) language = m[1];
  }

  const rawText = extractTextFromReactNode(children);

  const handleCopy = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(rawText);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    }
  };

  return (
    <div className="my-5 rounded-card border border-hairline bg-surface-muted/60 overflow-hidden not-prose max-w-full">
      <div className="flex items-center justify-between px-3.5 py-1 border-b border-hairline bg-surface-muted text-xs font-mono text-ink-secondary">
        <span className="uppercase tracking-wider truncate">
          {language || "code"}
        </span>
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => setWrap((w) => !w)}
            aria-pressed={wrap}
            aria-label={wrap ? "Disable line wrapping" : "Wrap long lines"}
            className={`min-h-[36px] inline-flex items-center gap-1 px-2.5 rounded-control transition-colors ${
              wrap ? "bg-surface text-ink" : "hover:text-ink"
            }`}
          >
            <WrapText className="w-3.5 h-3.5" strokeWidth={1.5} />
            <span>Wrap</span>
          </button>
          <button
            type="button"
            onClick={handleCopy}
            aria-label="Copy code block"
            className="min-h-[36px] inline-flex items-center gap-1 px-2.5 rounded-control hover:bg-surface text-ink-secondary hover:text-ink transition-colors"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-accent" strokeWidth={1.5} />
                <span className="text-ink">Copied</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" strokeWidth={1.5} />
                <span>Copy</span>
              </>
            )}
          </button>
        </div>
      </div>

      <pre
        className={`p-4 text-xs sm:text-sm font-mono leading-relaxed text-ink overflow-x-auto m-0 ${
          wrap ? "whitespace-pre-wrap break-words" : "whitespace-pre"
        }`}
      >
        {children}
      </pre>
    </div>
  );
}
