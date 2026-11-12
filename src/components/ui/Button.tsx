import React from "react";

export type ButtonVariant = "primary" | "quiet";

interface ButtonStyleOptions {
  variant?: ButtonVariant;
  className?: string;
}

/**
 * Two-style button system: primary (filled accent) and quiet (hairline/text).
 * Enforces >= 44px touch target height and 10px control radius.
 */
export function buttonClasses({
  variant = "primary",
  className = "",
}: ButtonStyleOptions = {}): string {
  const base =
    "inline-flex items-center justify-center gap-2 min-h-[44px] px-4 py-2.5 rounded-control text-sm font-medium transition-colors duration-150 ease-out focus-visible:outline-none disabled:opacity-50 disabled:pointer-events-none select-none";

  const styles =
    variant === "primary"
      ? "bg-accent text-accent-ink hover:bg-accent-hover"
      : "border border-hairline-strong bg-surface text-ink hover:bg-surface-muted";

  return `${base} ${styles} ${className}`.trim();
}

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
}

export function Button({
  variant = "primary",
  className = "",
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={buttonClasses({ variant, className })}
      {...props}
    />
  );
}
