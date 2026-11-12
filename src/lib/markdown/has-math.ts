/**
 * Detects whether markdown contains TeX/LaTeX math blocks outside fenced code blocks.
 */
export function hasMathExpression(markdown: string): boolean {
  if (!markdown) return false;
  const withoutFences = markdown.replace(/```[\s\S]*?```/g, "");
  // Display math $$...$$ or \[...\] or inline $...$ (non-currency)
  if (/\$\$[\s\S]+?\$\$/.test(withoutFences)) return true;
  if (/\\\[[\s\S]+?\\\]/.test(withoutFences)) return true;
  if (/\\\([\s\S]+?\\\)/.test(withoutFences)) return true;
  // Inline $x$ where opening $ is not followed by space/digit-currency and closing $ is not preceded by space
  if (/(?:^|[\s(])\$(?!\s)(?:[^$\n]+?)(?<!\s)\$(?=[\s.,;:!?)]|$)/.test(withoutFences)) {
    return true;
  }
  return false;
}
