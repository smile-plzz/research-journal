"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, ArrowUpRight } from "lucide-react";
import { siteConfig } from "@/config/site";
import { ThemeToggle } from "./ThemeToggle";
import { SearchTrigger } from "@/components/search/SearchOverlay";
import { BottomSheet } from "@/components/ui/BottomSheet";

export function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  const isReadingPage = pathname.startsWith("/works/");

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
    <>
      <header
        className={`${
          isReadingPage ? "relative" : "sticky top-0"
        } z-40 border-b border-hairline bg-bg/92 backdrop-blur-sm transition-colors duration-150`}
      >
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-14 sm:h-16 flex items-center justify-between gap-2">
          {/* Wordmark */}
          <Link
            href="/"
            className="min-h-[44px] inline-flex items-center font-serif text-base sm:text-lg font-semibold tracking-tight text-ink hover:text-accent transition-colors truncate"
          >
            {siteConfig.name}
          </Link>

          {/* Desktop Navigation */}
          <nav
            aria-label="Main navigation"
            className="hidden md:flex items-center gap-1 text-sm"
          >
            {siteConfig.nav.map((item) => {
              const active = isNavItemActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`min-h-[44px] px-3 inline-flex items-center rounded-control transition-colors duration-150 ${
                    active
                      ? "font-medium text-ink bg-surface-muted"
                      : "text-ink-secondary hover:text-ink hover:bg-surface-muted/60"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Right Utilities */}
          <div className="flex items-center gap-1 flex-shrink-0">
            <SearchTrigger />
            <ThemeToggle />
            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-label="Open navigation menu"
              aria-expanded={menuOpen}
              className="md:hidden inline-flex min-w-[44px] min-h-[44px] items-center justify-center rounded-control text-ink-secondary hover:text-ink hover:bg-surface-muted transition-colors duration-150"
            >
              <Menu className="w-5 h-5" strokeWidth={1.5} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Bottom Sheet Navigation */}
      <BottomSheet
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        title={siteConfig.name}
        subtitle={siteConfig.subtitle}
      >
        <nav aria-label="Mobile navigation" className="space-y-1">
          {[
            { label: "Research", href: "/" },
            { label: "Showcase", href: "/showcase" },
            { label: "Research Areas", href: "/research-areas" },
            { label: "Methodology", href: "/methodology" },
            { label: "About", href: "/about" },
          ].map((item) => {
            const active =
              item.href === "/"
                ? pathname === "/" || pathname.startsWith("/works")
                : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className={`min-h-[48px] px-3 rounded-control flex items-center justify-between text-base transition-colors ${
                  active
                    ? "bg-surface-muted font-medium text-ink"
                    : "text-ink-secondary hover:bg-surface-muted/70 hover:text-ink"
                }`}
              >
                <span>{item.label}</span>
              </Link>
            );
          })}

          <div className="pt-3 mt-3 border-t border-hairline">
            <a
              href={siteConfig.links.github}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMenuOpen(false)}
              className="min-h-[48px] px-3 rounded-control flex items-center justify-between text-base text-ink-secondary hover:bg-surface-muted/70 hover:text-ink transition-colors"
            >
              <span>GitHub</span>
              <ArrowUpRight className="w-4 h-4" strokeWidth={1.5} />
            </a>
          </div>
        </nav>
      </BottomSheet>
    </>
  );
}
