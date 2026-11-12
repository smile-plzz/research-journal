export interface FuzzySearchable {
  title: string;
  summary: string;
  meta?: string;
  tags: string[];
}

/**
 * Lightweight subsequence + token fuzzy scorer across title, summary, meta, and tags.
 * Returns 0 when an item does not match the query.
 */
export function scoreSearchMatch(item: FuzzySearchable, rawQuery: string): number {
  const query = rawQuery.trim().toLowerCase();
  if (!query) return 1;

  const title = item.title.toLowerCase();
  const summary = item.summary.toLowerCase();
  const meta = (item.meta || "").toLowerCase();
  const tags = item.tags.map((t) => t.toLowerCase());

  const tokens = query.split(/\s+/).filter(Boolean);
  let totalScore = 0;

  for (const token of tokens) {
    let tokenScore = 0;

    if (title === token) {
      tokenScore = 100;
    } else if (title.startsWith(token)) {
      tokenScore = 70;
    } else if (title.includes(token)) {
      tokenScore = 50;
    } else if (tags.some((t) => t === token)) {
      tokenScore = 45;
    } else if (tags.some((t) => t.includes(token))) {
      tokenScore = 32;
    } else if (meta.includes(token)) {
      tokenScore = 24;
    } else if (summary.includes(token)) {
      tokenScore = 18;
    } else if (isSubsequence(token, title)) {
      tokenScore = 12;
    } else {
      return 0;
    }

    totalScore += tokenScore;
  }

  return totalScore;
}

function isSubsequence(needle: string, haystack: string): boolean {
  if (needle.length < 3 || needle.length > haystack.length) return false;
  let i = 0;
  for (let j = 0; j < haystack.length && i < needle.length; j++) {
    if (haystack[j] === needle[i]) i++;
  }
  return i === needle.length;
}

export function filterAndRankSearch<T extends FuzzySearchable>(
  items: T[],
  query: string,
  limit = 16
): T[] {
  if (!query.trim()) return items.slice(0, limit);

  return items
    .map((item) => ({ item, score: scoreSearchMatch(item, query) }))
    .filter((entry) => entry.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((entry) => entry.item);
}
