"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { siteConfig } from "@/config/site";
import { ThemeToggle } from "./ThemeToggle";
import { BookOpen, Github } from "lucide-react";

export function Navbar() {
  const pathname = usePathname();

  return (
    <header className="border-b border-stone-200/80 dark:border-stone-800/80 bg-cream-50/90 dark:bg-stone-950/90 backdrop-blur-sm sticky top-0 z-40 transition-colors">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Brand / Scholarly Identity */}
        <Link
          href="/"
          className="flex items-center gap-2.5 group focus:outline-none"
        >
          <div className="w-7 h-7 rounded bg-academic/10 dark:bg-academic/20 flex items-center justify-center text-academic dark:text-academic-dark">
            <BookOpen className="w-4 h-4" />
          </div>
          <div>
            <span className="font-serif text-lg font-semibold tracking-tight text-stone-900 dark:text-stone-100 group-hover:text-academic transition-colors">
              Md. Ismail Hossain
            </span>
            <span className="hidden sm:inline-block text-xs font-sans text-stone-500 dark:text-stone-400 ml-2 pl-2 border-l border-stone-300 dark:border-stone-700">
              Research Journal & Archive
            </span>
          </div>
        </Link>

        {/* Navigation Links */}
        <nav className="flex items-center gap-1 sm:gap-6 text-sm font-sans">
          {siteConfig.nav.map((item) => {
            const isActive =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`px-2.5 py-1.5 rounded-md transition-colors ${
                  isActive
                    ? "font-medium text-stone-900 dark:text-stone-100 bg-stone-200/50 dark:bg-stone-800/50"
                    : "text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100"
                }`}
              >
                {item.label}
              </Link>
            );
          })}

          <div className="flex items-center gap-2 pl-2 sm:pl-3 border-l border-stone-200 dark:border-stone-800 ml-1">
            <a
              href={siteConfig.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 text-stone-500 hover:text-stone-900 dark:text-stone-400 dark:hover:text-stone-100 rounded-md transition-colors"
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

