"use client";

import { useEffect, useState } from "react";
import { List } from "lucide-react";

export interface TocItem {
  id: string;
  text: string;
  level: number;
}

interface TableOfContentsProps {
  content: string;
}

export function TableOfContents({ content }: TableOfContentsProps) {
  const [headings, setHeadings] = useState<TocItem[]>([]);
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    // Extract headings from markdown content (#, ##, ###)
    const lines = content.split("\n");
    const extracted: TocItem[] = [];

    lines.forEach((line) => {
      const match = line.match(/^(#{1,3})\s+(.+)$/);
      if (match) {
        const level = match[1].length;
        const rawText = match[2].trim();
        // create a slug for the id
        const id = rawText
          .toLowerCase()
          .replace(/[^\w\s-]/g, "")
          .replace(/\s+/g, "-");

        extracted.push({
          id,
          text: rawText.replace(/[*_`]/g, ""),
          level,
        });
      }
    });

    setHeadings(extracted);

    // Setup intersection observer to track active section
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "-80px 0% -70% 0%" }
    );

    const headingElements = document.querySelectorAll("h1, h2, h3");
    headingElements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [content]);

  if (headings.length < 2) return null;

  return (
    <nav className="sticky top-24 max-h-[calc(100vh-8rem)] overflow-y-auto p-4 rounded-lg bg-stone-50/70 dark:bg-stone-900/40 border border-stone-200/80 dark:border-stone-800/80 text-xs">
      <div className="flex items-center gap-1.5 font-serif font-semibold text-stone-900 dark:text-stone-100 mb-3 pb-2 border-b border-stone-200 dark:border-stone-800">
        <List className="w-3.5 h-3.5 text-academic" />
        <span>Contents Navigation</span>
      </div>

      <ul className="space-y-1.5 font-sans">
        {headings.map((item, idx) => {
          const isActive = activeId === item.id;
          return (
            <li
              key={`${item.id}-${idx}`}
              style={{ paddingLeft: `${(item.level - 1) * 0.75}rem` }}
            >
              <a
                href={`#${item.id}`}
                className={`block py-1 leading-snug transition-colors truncate ${
                  isActive
                    ? "font-medium text-academic dark:text-academic-dark"
                    : "text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100"
                }`}
                title={item.text}
              >
                {item.text}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

