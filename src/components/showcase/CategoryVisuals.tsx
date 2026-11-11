import {
  ProjectCategory,
  getCategoryMeta,
} from "@/lib/showcase/schema";
import {
  Globe,
  Monitor,
  Smartphone,
  Wrench,
  Gamepad2,
  Workflow,
  BarChart3,
  Layers,
} from "lucide-react";

export function CategoryIcon({
  category,
  className = "w-5 h-5",
}: {
  category: ProjectCategory;
  className?: string;
}) {
  switch (category) {
    case "web-app":
      return <Globe className={className} />;
    case "desktop-app":
      return <Monitor className={className} />;
    case "mobile-app":
      return <Smartphone className={className} />;
    case "tool":
      return <Wrench className={className} />;
    case "game":
      return <Gamepad2 className={className} />;
    case "automation":
      return <Workflow className={className} />;
    case "data":
      return <BarChart3 className={className} />;
    default:
      return <Layers className={className} />;
  }
}

export function CategoryCoverFallback({
  category,
  name,
  compact = false,
}: {
  category: ProjectCategory;
  name: string;
  compact?: boolean;
}) {
  const meta = getCategoryMeta(category);
  return (
    <div
      className={`w-full ${
        compact ? "h-36" : "h-44 sm:h-52"
      } bg-gradient-to-br ${meta.gradient} flex flex-col items-center justify-center gap-2.5 border-b border-stone-200/80 dark:border-stone-800/80 px-4 text-center select-none`}
    >
      <div className="w-11 h-11 rounded-xl bg-white/80 dark:bg-stone-900/80 border border-stone-200/80 dark:border-stone-700/70 flex items-center justify-center text-academic dark:text-academic-dark shadow-sm">
        <CategoryIcon category={category} className="w-5 h-5" />
      </div>
      <div className="space-y-0.5 max-w-[90%]">
        <span className="block text-[11px] font-mono uppercase tracking-wider text-stone-500 dark:text-stone-400">
          {meta.shortLabel}
        </span>
        <span className="block font-serif text-sm font-medium text-stone-700 dark:text-stone-300 truncate">
          {name}
        </span>
      </div>
    </div>
  );
}

