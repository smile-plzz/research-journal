import React from "react";

interface ChipProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * Low-contrast pill chip for tags and quiet metadata labels.
 */
export function Chip({ children, className = "" }: ChipProps) {
  return (
    <span
      className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-surface-muted text-ink-secondary ${className}`.trim()}
    >
      {children}
    </span>
  );
}

interface ChipListProps {
  items: string[];
  maxVisible?: number;
  className?: string;
}

/**
 * Renders at most `maxVisible` (default 2) low-contrast pill chips with "+N" overflow.
 */
export function ChipList({
  items,
  maxVisible = 2,
  className = "",
}: ChipListProps) {
  if (!items || items.length === 0) return null;
  const visible = items.slice(0, maxVisible);
  const overflow = items.length - visible.length;

  return (
    <div className={`flex flex-wrap items-center gap-1.5 ${className}`.trim()}>
      {visible.map((item) => (
        <Chip key={item}>{item}</Chip>
      ))}
      {overflow > 0 && <Chip>+{overflow}</Chip>}
    </div>
  );
}
