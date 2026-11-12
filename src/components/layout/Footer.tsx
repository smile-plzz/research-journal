import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-hairline mt-16 py-8 text-sm text-ink-secondary">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <nav aria-label="Footer links" className="flex flex-wrap items-center gap-x-5 gap-y-2">
          <Link
            href="/collections"
            className="inline-flex items-center min-h-[44px] hover:text-ink transition-colors"
          >
            Collections
          </Link>
          <Link
            href="/research-areas"
            className="inline-flex items-center min-h-[44px] hover:text-ink transition-colors"
          >
            Research Areas
          </Link>
          <Link
            href="/methodology"
            className="inline-flex items-center min-h-[44px] hover:text-ink transition-colors"
          >
            Methodology
          </Link>
          <a
            href="/feed-all.xml"
            className="inline-flex items-center min-h-[44px] hover:text-ink transition-colors"
          >
            RSS
          </a>
        </nav>

        <p className="text-xs text-ink-secondary">
          © {new Date().getFullYear()} Md. Ismail Hossain
        </p>
      </div>
    </footer>
  );
}
