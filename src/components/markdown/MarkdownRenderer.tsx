"use client";

import React, { useMemo, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import rehypeSanitize, { defaultSchema } from "rehype-sanitize";
import {
  preprocessGithubMarkdown,
  RepoSourceContext,
} from "@/lib/markdown/refine";
import {
  DEFAULT_READER_PREFERENCES,
  ReaderPreferences,
  slugifyHeading,
} from "@/lib/markdown/reader-prefs";
import { extractTextFromReactNode } from "@/lib/markdown/table-utils";
import { SortableMarkdownTable } from "./SortableMarkdownTable";
import { CodeBlock } from "./CodeBlock";
import { Tooltip } from "@/components/ui/Tooltip";
import { Check, ExternalLink, Hash } from "lucide-react";

interface MarkdownRendererProps {
  content: string;
  repoContext?: RepoSourceContext;
  stripLeadingHeading?: boolean;
  stripAiStudioBanner?: boolean;
  readerPrefs?: ReaderPreferences;
  highlightQuery?: string;
}

function HeadingWithAnchor({
  Tag,
  children,
  props,
}: {
  Tag: "h1" | "h2" | "h3";
  children: React.ReactNode;
  props: React.HTMLAttributes<HTMLHeadingElement>;
}) {
  const [copiedId, setCopiedId] = useState(false);
  const text = extractTextFromReactNode(children);
  const id = slugifyHeading(text);

  const handleCopyAnchor = (e: React.MouseEvent) => {
    e.preventDefault();
    if (typeof window !== "undefined") {
      const url = `${window.location.origin}${window.location.pathname}#${id}`;
      navigator.clipboard?.writeText(url);
      window.history.replaceState(null, "", `#${id}`);
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
      setCopiedId(true);
      setTimeout(() => setCopiedId(false), 1600);
    }
  };

  return (
    <Tag id={id} className="scroll-mt-24 group relative flex items-baseline gap-2" {...props}>
      <span>{children}</span>
      {id && (
        <Tooltip content={copiedId ? "Section link copied" : "Copy direct link to section"}>
          <a
            href={`#${id}`}
            onClick={handleCopyAnchor}
            aria-label={`Copy link to ${text}`}
            className="opacity-0 group-hover:opacity-100 focus:opacity-100 text-stone-400 hover:text-academic dark:hover:text-academic-dark transition-opacity inline-flex items-center p-0.5 rounded"
          >
            {copiedId ? (
              <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            ) : (
              <Hash className="w-3.5 h-3.5" />
            )}
          </a>
        </Tooltip>
      )}
    </Tag>
  );
}

export function MarkdownRenderer({
  content,
  repoContext,
  stripLeadingHeading = false,
  stripAiStudioBanner = true,
  readerPrefs = DEFAULT_READER_PREFERENCES,
  highlightQuery = "",
}: MarkdownRendererProps) {
  const refinedContent = useMemo(
    () =>
      preprocessGithubMarkdown(content, {
        repo: repoContext,
        stripLeadingHeading,
        stripAiStudioBanner,
      }),
    [content, repoContext, stripLeadingHeading, stripAiStudioBanner]
  );

  // Custom schema allowing id and className attributes for anchors and KaTeX
  const customSchema = useMemo(
    () => ({
      ...defaultSchema,
      attributes: {
        ...defaultSchema.attributes,
        h1: [...(defaultSchema.attributes?.h1 || []), "id"],
        h2: [...(defaultSchema.attributes?.h2 || []), "id"],
        h3: [...(defaultSchema.attributes?.h3 || []), "id"],
        h4: [...(defaultSchema.attributes?.h4 || []), "id"],
        code: [...(defaultSchema.attributes?.code || []), "className"],
        span: [...(defaultSchema.attributes?.span || []), "className", "style"],
        div: [...(defaultSchema.attributes?.div || []), "className", "style"],
      },
    }),
    []
  );

  const fontFamilyClass =
    readerPrefs.fontFamily === "sans"
      ? "reader-font-sans"
      : readerPrefs.fontFamily === "mono"
      ? "reader-font-mono"
      : "reader-font-serif";

  const fontSizeClass =
    readerPrefs.fontSize === "sm"
      ? "reader-size-sm"
      : readerPrefs.fontSize === "lg"
      ? "reader-size-lg"
      : readerPrefs.fontSize === "xl"
      ? "reader-size-xl"
      : "reader-size-base";

  const spacingClass =
    readerPrefs.lineSpacing === "compact"
      ? "reader-leading-compact"
      : readerPrefs.lineSpacing === "spacious"
      ? "reader-leading-spacious"
      : "reader-leading-relaxed";

  const widthClass =
    readerPrefs.width === "narrow"
      ? "max-w-prose"
      : readerPrefs.width === "wide"
      ? "max-w-full"
      : "max-w-3xl";

  const alignClass =
    readerPrefs.alignment === "justify" ? "reader-align-justify" : "reader-align-left";

  const q = highlightQuery.trim().toLowerCase();

  const highlightMatchClass = (node: React.ReactNode) => {
    if (!q) return "";
    const text = extractTextFromReactNode(node).toLowerCase();
    return text.includes(q)
      ? "bg-amber-100/70 dark:bg-amber-900/25 rounded px-2 py-1 -mx-2 ring-1 ring-amber-300/70 dark:ring-amber-700/60"
      : "";
  };

  return (
    <div
      className={`prose-academic ${fontFamilyClass} ${fontSizeClass} ${spacingClass} ${widthClass} ${alignClass} transition-all`}
    >
      <ReactMarkdown
        remarkPlugins={[remarkGfm, remarkMath]}
        rehypePlugins={[rehypeKatex, [rehypeSanitize, customSchema]]}
        components={{
          h1: ({ children, ...props }) => (
            <HeadingWithAnchor Tag="h1" props={props}>
              {children}
            </HeadingWithAnchor>
          ),
          h2: ({ children, ...props }) => (
            <HeadingWithAnchor Tag="h2" props={props}>
              {children}
            </HeadingWithAnchor>
          ),
          h3: ({ children, ...props }) => (
            <HeadingWithAnchor Tag="h3" props={props}>
              {children}
            </HeadingWithAnchor>
          ),
          p: ({ children, ...props }) => {
            const hl = highlightMatchClass(children);
            return (
              <p className={hl || undefined} {...props}>
                {children}
              </p>
            );
          },
          li: ({ children, ...props }) => {
            const hl = highlightMatchClass(children);
            return (
              <li className={hl || undefined} {...props}>
                {children}
              </li>
            );
          },
          table: ({ children }) => <SortableMarkdownTable>{children}</SortableMarkdownTable>,
          pre: ({ children }) => <CodeBlock>{children}</CodeBlock>,
          a: ({ href, children, ...props }) => {
            const isExternal = href && /^https?:\/\//i.test(href);
            if (isExternal) {
              return (
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-academic dark:text-academic-dark underline decoration-academic/40 hover:decoration-academic inline-flex items-baseline gap-0.5 break-words"
                  {...props}
                >
                  <span>{children}</span>
                  <ExternalLink className="w-3 h-3 inline self-center flex-shrink-0 opacity-70" />
                </a>
              );
            }
            return (
              <a
                href={href}
                className="text-academic dark:text-academic-dark underline decoration-academic/40 hover:decoration-academic"
                {...props}
              >
                {children}
              </a>
            );
          },
          img: ({ src, alt, ...props }) => {
            if (!src) return null;
            return (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={src}
                alt={alt || "Repository documentation figure"}
                loading="lazy"
                className="my-4 max-w-full h-auto rounded-lg border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900"
                {...props}
              />
            );
          },
        }}
      >
        {refinedContent}
      </ReactMarkdown>
    </div>
  );
}
