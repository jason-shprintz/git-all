/**
 * GitAllLogo — SVG mark + wordmark for the GitAll brand.
 *
 * The mark is a 3×3 grid of contribution squares using the CSS platform tokens
 * defined in globals.css (--gh-accent, --gl-accent, --brand, --ga-accent).
 * Inline SVG inherits these variables from the document, so the mark stays
 * consistent with any future token updates.
 */
export function GitAllLogo({ className }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className ?? ""}`}>
      {/* Mark */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 32 32"
        width="28"
        height="28"
        aria-hidden="true"
      >
        {/* Row 1 */}
        <rect x="2"  y="2"  width="8" height="8" rx="1.5" style={{ fill: "var(--gh-accent)" }} />
        <rect x="12" y="2"  width="8" height="8" rx="1.5" style={{ fill: "var(--gl-accent)" }} />
        <rect x="22" y="2"  width="8" height="8" rx="1.5" style={{ fill: "var(--brand)" }} />
        {/* Row 2 */}
        <rect x="2"  y="12" width="8" height="8" rx="1.5" style={{ fill: "var(--gl-accent)" }} />
        <rect x="12" y="12" width="8" height="8" rx="1.5" style={{ fill: "var(--ga-accent)" }} />
        <rect x="22" y="12" width="8" height="8" rx="1.5" style={{ fill: "var(--gh-accent)" }} />
        {/* Row 3 */}
        <rect x="2"  y="22" width="8" height="8" rx="1.5" style={{ fill: "var(--brand)" }} />
        <rect x="12" y="22" width="8" height="8" rx="1.5" style={{ fill: "var(--gh-accent)" }} />
        <rect x="22" y="22" width="8" height="8" rx="1.5" style={{ fill: "var(--gl-accent)" }} />
      </svg>

      {/* Wordmark */}
      <span
        style={{
          fontWeight: 700,
          fontSize: "1.35rem",
          letterSpacing: "-0.025em",
          lineHeight: 1,
          color: "var(--text-primary)",
        }}
      >
        Git
        <span style={{ color: "var(--accent)" }}>All</span>
      </span>
    </span>
  );
}
