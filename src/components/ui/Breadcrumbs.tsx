import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-1.5 text-xs text-stone-500 dark:text-stone-400">
      <Link
        href="/"
        className="inline-flex items-center gap-1 hover:text-stone-900 dark:hover:text-stone-100 transition-colors rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-academic"
      >
        <Home className="w-3.5 h-3.5" />
        <span>Home</span>
      </Link>

      {items.map((item, idx) => (
        <span key={`${item.label}-${idx}`} className="inline-flex items-center gap-1.5 min-w-0">
          <ChevronRight className="w-3.5 h-3.5 text-stone-400 flex-shrink-0" />
          {item.href ? (
            <Link
              href={item.href}
              className="hover:text-stone-900 dark:hover:text-stone-100 transition-colors truncate max-w-[180px] sm:max-w-[260px]"
            >
              {item.label}
            </Link>
          ) : (
            <span
              className="font-medium text-stone-800 dark:text-stone-200 truncate max-w-[200px] sm:max-w-[320px]"
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

