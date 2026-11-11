"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { siteConfig } from "@/config/site";
import { ThemeToggle } from "./ThemeToggle";
import { BookOpen, Github } from "lucide-react";

export function Navbar() {
  const pathname = usePathname();

  const isNavItemActive = (href: string) => {
    if (href === "/") {
      return (
        pathname === "/" ||
        pathname.startsWith("/works") ||
        pathname.startsWith("/research-areas") ||
        pathname.startsWith("/methodology")
      );
    }
    return pathname.startsWith(href);
  };

  return (
    <header className="border-b border-stone-200/80 dark:border-stone-800/80 bg-cream-50/90 dark:bg-stone-950/90 backdrop-blur-sm sticky top-0 z-40 transition-colors">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        {/* Brand Identity */}
        <Link
          href="/"
          className="flex items-center gap-2.5 group focus:outline-none focus-visible:ring-2 focus-visible:ring-academic rounded-md min-w-0"
        >
          <div className="w-7 h-7 rounded bg-academic/10 dark:bg-academic/20 flex items-center justify-center text-academic dark:text-academic-dark flex-shrink-0">
            <BookOpen className="w-4 h-4" />
          </div>
          <div className="truncate">
            <span className="font-serif text-base sm:text-lg font-semibold tracking-tight text-stone-900 dark:text-stone-100 group-hover:text-academic transition-colors">
              Research Journal
            </span>
            <span className="hidden md:inline-block text-xs font-sans text-stone-500 dark:text-stone-400 ml-2 pl-2 border-l border-stone-300 dark:border-stone-700">
              {siteConfig.subtitle}
            </span>
          </div>
        </Link>

        {/* Wing Switch & Primary Navigation */}
        <nav aria-label="Main navigation" className="flex items-center gap-1.5 sm:gap-4 text-sm font-sans">
          <div className="flex items-center rounded-lg border border-stone-200/80 dark:border-stone-800 bg-stone-100/60 dark:bg-stone-900/60 p-0.5">
            {siteConfig.nav.slice(0, 2).map((item) => {
              const active = isNavItemActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-3 py-1 rounded-md text-xs sm:text-sm transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-academic ${
                    active
                      ? "font-medium text-stone-900 dark:text-stone-100 bg-white dark:bg-stone-800 shadow-sm"
                      : "text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>

          {siteConfig.nav.slice(2).map((item) => {
            const active = isNavItemActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`px-2.5 py-1.5 rounded-md text-xs sm:text-sm transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-academic ${
                  active
                    ? "font-medium text-stone-900 dark:text-stone-100 bg-stone-200/50 dark:bg-stone-800/50"
                    : "text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100"
                }`}
              >
                {item.label}
              </Link>
            );
          })}

          <div className="flex items-center gap-1.5 pl-2 border-l border-stone-200 dark:border-stone-800">
            <a
              href={siteConfig.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 text-stone-500 hover:text-stone-900 dark:text-stone-400 dark:hover:text-stone-100 rounded-md transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-academic"
              aria-label="GitHub Profile"
              title="GitHub Profile"
            >
              <Github className="w-4 h-4" />
            </a>
            <ThemeToggle />
          </div>
        </nav>
      </div>
    </header>
  );
}
