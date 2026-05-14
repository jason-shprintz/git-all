/**
 * Convert a YYYY-MM-DD date to the start of that day in UTC.
 */
export function toStartOfDayIso(date: string) {
  return `${date}T00:00:00.000Z`;
}

/**
 * Convert a YYYY-MM-DD `to` date into an exclusive upper-bound DateTime for
 * the GitHub GraphQL `contributionsCollection` query.
 *
 * We use start-of-next-day (exclusive) rather than end-of-same-day (inclusive)
 * to avoid expanding the DateTime span past GitHub's one-year limit when the
 * date range is already at the boundary.
 *
 * Example: a range of 2025-05-15 → 2026-05-14 (364 calendar days) stays
 * exactly 365 days in DateTime terms (2025-05-15T00:00:00Z → 2026-05-15T00:00:00Z)
 * instead of ~365.99 days (→ 2026-05-14T23:59:59.999Z + fraction).
 */
export function toExclusiveUpperBoundIso(date: string) {
  const d = new Date(`${date}T00:00:00.000Z`);
  d.setUTCDate(d.getUTCDate() + 1);
  return d.toISOString();
}
