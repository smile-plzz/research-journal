"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { Tooltip } from "@/components/ui/Tooltip";

export function ThemeToggle() {
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="w-8 h-8" aria-hidden="true" />;
  }

  const isDark = resolvedTheme === "dark";

  return (
    <Tooltip
      position="bottom"
      content={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
    >
      <button
        type="button"
        onClick={() => setTheme(isDark ? "light" : "dark")}
        className="p-1.5 text-stone-500 hover:text-stone-900 dark:text-stone-400 dark:hover:text-stone-100 rounded-md transition-colors border border-transparent hover:border-stone-200 dark:hover:border-stone-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-academic"
        aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
      >
        {isDark ? (
          <Sun className="w-4 h-4" />
        ) : (
          <Moon className="w-4 h-4" />
        )}
      </button>
    </Tooltip>
  );
}

