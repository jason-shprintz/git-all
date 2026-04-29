import type { ContributionData } from "@/lib/types";

interface StatsBarProps {
  github: ContributionData | null;
  gitlab: ContributionData | null;
}

export function StatsBar({ github, gitlab }: StatsBarProps) {
  const ghTotal = github?.totalContributions ?? 0;
  const glTotal = gitlab?.totalContributions ?? 0;
  const combined = ghTotal + glTotal;

  return (
    <div className="flex gap-4 text-sm">
      {github && (
        <span style={{ color: "var(--level-4)" }}>
          GitHub: <strong>{ghTotal.toLocaleString()}</strong>
        </span>
      )}
      {gitlab && (
        <span style={{ color: "var(--gl-level-4)" }}>
          GitLab: <strong>{glTotal.toLocaleString()}</strong>
        </span>
      )}
      {github && gitlab && (
        <span style={{ color: "var(--text-secondary)" }}>
          Total: <strong>{combined.toLocaleString()}</strong>
        </span>
      )}
    </div>
  );
}
