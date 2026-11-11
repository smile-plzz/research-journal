"use client";

import React, { useState } from "react";
import { extractTextFromReactNode } from "@/lib/markdown/table-utils";
import { Tooltip } from "@/components/ui/Tooltip";
import { Check, Copy, WrapText } from "lucide-react";

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
      setTimeout(() => setCopied(false), 1800);
    }
  };

  return (
    <div className="my-5 rounded-xl border border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-900/80 overflow-hidden not-prose">
      <div className="flex items-center justify-between px-3.5 py-1.5 border-b border-stone-200/80 dark:border-stone-800 bg-stone-100/80 dark:bg-stone-900 text-[11px] font-mono text-stone-500 dark:text-stone-400">
        <span className="uppercase tracking-wider">
          {language || "code / text"}
        </span>
        <div className="flex items-center gap-1.5">
          <Tooltip content={wrap ? "Switch to horizontal scroll" : "Wrap long lines"}>
            <button
              type="button"
              onClick={() => setWrap((w) => !w)}
              className={`inline-flex items-center gap-1 px-2 py-0.5 rounded transition-colors ${
                wrap
                  ? "bg-stone-200 dark:bg-stone-800 text-stone-900 dark:text-stone-100"
                  : "hover:text-stone-900 dark:hover:text-stone-100"
              }`}
              aria-label="Toggle code line wrapping"
            >
              <WrapText className="w-3 h-3" />
              <span>Wrap</span>
            </button>
          </Tooltip>
          <Tooltip content="Copy code block to clipboard">
            <button
              type="button"
              onClick={handleCopy}
              className="inline-flex items-center gap-1 px-2 py-0.5 rounded hover:bg-stone-200/70 dark:hover:bg-stone-800 text-stone-600 dark:text-stone-300 transition-colors"
              aria-label="Copy code block"
            >
              {copied ? (
                <>
                  <Check className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                  <span className="text-emerald-700 dark:text-emerald-300">Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-3 h-3" />
                  <span>Copy</span>
                </>
              )}
            </button>
          </Tooltip>
        </div>
      </div>

      <pre
        className={`p-4 text-xs sm:text-sm font-mono leading-relaxed text-stone-800 dark:text-stone-200 overflow-x-auto m-0 ${
          wrap ? "whitespace-pre-wrap break-words" : "whitespace-pre"
        }`}
      >
        {children}
      </pre>
    </div>
  );
}

