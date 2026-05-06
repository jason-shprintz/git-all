/**
 * GitAllLogo — SVG mark + wordmark for the GitAll brand.
 *
 * The mark is a 3×3 grid of contribution squares in three platform colors:
 *   GitHub green (#39d353), GitLab orange (#fd9a28), GitAll cyan (#2dd4bf / #5eead4)
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
        <rect x="2"  y="2"  width="8" height="8" rx="1.5" fill="#39d353" />
        <rect x="12" y="2"  width="8" height="8" rx="1.5" fill="#fd9a28" />
        <rect x="22" y="2"  width="8" height="8" rx="1.5" fill="#2dd4bf" />
        {/* Row 2 */}
        <rect x="2"  y="12" width="8" height="8" rx="1.5" fill="#fd9a28" />
        <rect x="12" y="12" width="8" height="8" rx="1.5" fill="#5eead4" />
        <rect x="22" y="12" width="8" height="8" rx="1.5" fill="#39d353" />
        {/* Row 3 */}
        <rect x="2"  y="22" width="8" height="8" rx="1.5" fill="#2dd4bf" />
        <rect x="12" y="22" width="8" height="8" rx="1.5" fill="#39d353" />
        <rect x="22" y="22" width="8" height="8" rx="1.5" fill="#fd9a28" />
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
