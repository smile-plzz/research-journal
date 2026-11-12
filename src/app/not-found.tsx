import Link from "next/link";
import { buttonClasses } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div className="max-w-lg py-16 space-y-6">
      <div className="space-y-2">
        <p className="text-xs font-mono text-ink-secondary">404</p>
        <h1 className="font-serif text-3xl font-semibold text-ink tracking-tight">
          Page not found
        </h1>
        <p className="text-base text-ink-secondary leading-relaxed">
          That publication or project page does not exist or may have moved.
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <Link href="/" className={buttonClasses({ variant: "primary" })}>
          Go to Research
        </Link>
        <Link href="/showcase" className={buttonClasses({ variant: "quiet" })}>
          Open Showcase
        </Link>
        <Link
          href="/methodology"
          className="min-h-[44px] inline-flex items-center px-2 text-sm text-accent hover:underline"
        >
          How this site works
        </Link>
      </div>
    </div>
  );
}
