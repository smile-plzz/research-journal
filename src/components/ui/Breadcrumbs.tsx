import Link from "next/link";
import { ChevronRight } from "lucide-react";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav
      aria-label="Breadcrumb"
      className="flex flex-wrap items-center gap-1.5 text-xs text-ink-secondary"
    >
      <Link
        href="/"
        className="inline-flex items-center min-h-[36px] hover:text-ink transition-colors rounded"
      >
        Home
      </Link>

      {items.map((item, idx) => (
        <span
          key={`${item.label}-${idx}`}
          className="inline-flex items-center gap-1.5 min-w-0"
        >
          <ChevronRight className="w-3.5 h-3.5 opacity-60 flex-shrink-0" aria-hidden="true" />
          {item.href ? (
            <Link
              href={item.href}
              className="inline-flex items-center min-h-[36px] hover:text-ink transition-colors truncate max-w-[160px] sm:max-w-[260px]"
            >
              {item.label}
            </Link>
          ) : (
            <span
              className="font-medium text-ink truncate max-w-[190px] sm:max-w-[320px]"
              aria-current="page"
            >
              {item.label}
            </span>
          )}
        </span>
      ))}
    </nav>
  );
}
