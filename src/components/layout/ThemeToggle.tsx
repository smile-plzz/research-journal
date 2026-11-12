"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";

export function ThemeToggle() {
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <span
        className="inline-flex min-w-[44px] min-h-[44px] items-center justify-center"
        aria-hidden="true"
      />
    );
  }

  const isDark = resolvedTheme === "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="inline-flex min-w-[44px] min-h-[44px] items-center justify-center rounded-control text-ink-secondary hover:text-ink hover:bg-surface-muted transition-colors duration-150"
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
      title={isDark ? "Switch to light theme" : "Switch to dark theme"}
    >
      {isDark ? (
        <Sun className="w-[18px] h-[18px]" strokeWidth={1.5} />
      ) : (
        <Moon className="w-[18px] h-[18px]" strokeWidth={1.5} />
      )}
    </button>
  );
}
