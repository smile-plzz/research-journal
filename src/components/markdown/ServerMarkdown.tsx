import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import rehypeSanitize, { defaultSchema } from "rehype-sanitize";
import { Link2 } from "lucide-react";
import {
  preprocessGithubMarkdown,
  RepoSourceContext,
} from "@/lib/markdown/refine";
import { slugifyHeading } from "@/lib/markdown/reader-prefs";
import { extractTextFromReactNode } from "@/lib/markdown/table-utils";
import { hasMathExpression } from "@/lib/markdown/has-math";
import { SortableMarkdownTable } from "./SortableMarkdownTable";
import { CodeBlock } from "./CodeBlock";
import { KatexCssLoader } from "./KatexCssLoader";

interface ServerMarkdownProps {
  content: string;
  repoContext?: RepoSourceContext;
  stripLeadingHeading?: boolean;
  stripAiStudioBanner?: boolean;
  /** Minimum heading level so page hierarchy stays sequential (e.g., 2 inside an article with h1). */
  baseHeadingLevel?: 1 | 2;
}

const SANITIZE_SCHEMA = {
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
};

export function ServerMarkdown({
  content,
  repoContext,
  stripLeadingHeading = false,
  stripAiStudioBanner = true,
  baseHeadingLevel = 2,
}: ServerMarkdownProps) {
  const refinedContent = preprocessGithubMarkdown(content, {
    repo: repoContext,
    stripLeadingHeading,
    stripAiStudioBanner,
  });

  const containsMath = hasMathExpression(refinedContent);

  const mapLevel = (raw: 1 | 2 | 3 | 4): 1 | 2 | 3 | 4 => {
    const shifted = baseHeadingLevel === 2 ? raw + 1 : raw;
    return Math.min(4, shifted) as 1 | 2 | 3 | 4;
  };

  const renderHeading = (raw: 1 | 2 | 3 | 4, children: React.ReactNode) => {
    const text = extractTextFromReactNode(children);
    const id = slugifyHeading(text);
    const Tag = (`h${mapLevel(raw)}` as "h1" | "h2" | "h3" | "h4");

    return (
      <Tag id={id} className="scroll-mt-20 group flex items-baseline gap-2">
        <span>{children}</span>
        {id && (
          <a
            href={`#${id}`}
            data-copy-anchor={id}
            aria-label={`Copy link to ${text}`}
            title="Copy link to section"
            className="opacity-60 sm:opacity-0 sm:group-hover:opacity-100 focus:opacity-100 inline-flex items-center justify-center min-w-[28px] min-h-[28px] rounded text-ink-secondary hover:text-accent transition-opacity flex-shrink-0"
          >
            <Link2 className="w-3.5 h-3.5" strokeWidth={1.5} />
          </a>
        )}
      </Tag>
    );
  };

  return (
    <>
      {containsMath && <KatexCssLoader />}
      <ReactMarkdown
        remarkPlugins={containsMath ? [remarkGfm, remarkMath] : [remarkGfm]}
        rehypePlugins={
          containsMath
            ? [rehypeKatex, [rehypeSanitize, SANITIZE_SCHEMA]]
            : [[rehypeSanitize, SANITIZE_SCHEMA]]
        }
        components={{
          h1: ({ children }) => renderHeading(1, children),
          h2: ({ children }) => renderHeading(2, children),
          h3: ({ children }) => renderHeading(3, children),
          h4: ({ children }) => renderHeading(4, children),
          table: ({ children }) => (
            <SortableMarkdownTable>{children}</SortableMarkdownTable>
          ),
          pre: ({ children }) => <CodeBlock>{children}</CodeBlock>,
          a: ({ href, children, ...props }) => {
            const isExternal = Boolean(href && /^https?:\/\//i.test(href));
            return (
              <a
                href={href}
                target={isExternal ? "_blank" : undefined}
                rel={isExternal ? "noopener noreferrer" : undefined}
                className="text-accent underline decoration-accent/40 hover:decoration-accent break-words"
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
                alt={alt || "Repository figure"}
                loading="lazy"
                className="my-5 max-w-full h-auto rounded-card border border-hairline bg-surface"
                {...props}
              />
            );
          },
        }}
      >
        {refinedContent}
      </ReactMarkdown>
    </>
  );
}
