import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import rehypeSanitize, { defaultSchema } from "rehype-sanitize";

interface MarkdownRendererProps {
  content: string;
}

export function MarkdownRenderer({ content }: MarkdownRendererProps) {
  // Custom schema allowing id attributes on headings for anchor links
  const customSchema = {
    ...defaultSchema,
    attributes: {
      ...defaultSchema.attributes,
      h1: [...(defaultSchema.attributes?.h1 || []), "id"],
      h2: [...(defaultSchema.attributes?.h2 || []), "id"],
      h3: [...(defaultSchema.attributes?.h3 || []), "id"],
      h4: [...(defaultSchema.attributes?.h4 || []), "id"],
      code: [...(defaultSchema.attributes?.code || []), "className"],
    },
  };

  return (
    <div className="prose-academic">
      <ReactMarkdown
        remarkPlugins={[remarkGfm, remarkMath]}
        rehypePlugins={[rehypeKatex, [rehypeSanitize, customSchema]]}
        components={{
          h1: ({ children, ...props }) => {
            const text = String(children);
            const id = text
              .toLowerCase()
              .replace(/[^\w\s-]/g, "")
              .replace(/\s+/g, "-");
            return (
              <h1 id={id} className="scroll-mt-24 group relative" {...props}>
                <a
                  href={`#${id}`}
                  className="absolute -left-6 top-0 opacity-0 group-hover:opacity-100 text-stone-400 hover:text-academic transition-opacity text-base pr-2"
                  aria-label="Direct link to section"
                >
                  #
                </a>
                {children}
              </h1>
            );
          },
          h2: ({ children, ...props }) => {
            const text = String(children);
            const id = text
              .toLowerCase()
              .replace(/[^\w\s-]/g, "")
              .replace(/\s+/g, "-");
            return (
              <h2 id={id} className="scroll-mt-24 group relative" {...props}>
                <a
                  href={`#${id}`}
                  className="absolute -left-5 top-0 opacity-0 group-hover:opacity-100 text-stone-400 hover:text-academic transition-opacity text-sm pr-2"
                  aria-label="Direct link to section"
                >
                  #
                </a>
                {children}
              </h2>
            );
          },
          h3: ({ children, ...props }) => {
            const text = String(children);
            const id = text
              .toLowerCase()
              .replace(/[^\w\s-]/g, "")
              .replace(/\s+/g, "-");
            return (
              <h3 id={id} className="scroll-mt-24 group relative" {...props}>
                <a
                  href={`#${id}`}
                  className="absolute -left-4 top-0 opacity-0 group-hover:opacity-100 text-stone-400 hover:text-academic transition-opacity text-xs pr-1"
                  aria-label="Direct link to section"
                >
                  #
                </a>
                {children}
              </h3>
            );
          },
          table: ({ children, ...props }) => (
            <div className="overflow-x-auto my-6">
              <table className="w-full text-left border-collapse" {...props}>
                {children}
              </table>
            </div>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}

