"use client";

import { useState } from "react";
import { SearchForm } from "@/components/SearchForm";
import { ContributionGrid } from "@/components/ContributionGrid";
import { StatsBar } from "@/components/StatsBar";
import { GitAllLogo } from "@/components/GitAllLogo";
import type { ContributionData, ViewMode } from "@/lib/types";

export default function Home() {
  const [githubData, setGithubData] = useState<ContributionData | null>(null);
  const [gitlabData, setGitlabData] = useState<ContributionData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<ViewMode>("side-by-side");

  const handleSearch = async (githubUsername: string, gitlabUsername: string) => {
    setLoading(true);
    setError(null);
    setGithubData(null);
    setGitlabData(null);

    try {
      const promises: Promise<void>[] = [];

      if (githubUsername.trim()) {
        promises.push(
          fetch(`/api/github?username=${encodeURIComponent(githubUsername.trim())}`)
            .then((res) => res.json())
            .then((data) => {
              if (data.error) throw new Error(`GitHub: ${data.error}`);
              setGithubData(data);
            })
        );
      }

      if (gitlabUsername.trim()) {
        promises.push(
          fetch(`/api/gitlab?username=${encodeURIComponent(gitlabUsername.trim())}`)
            .then((res) => res.json())
            .then((data) => {
              if (data.error) throw new Error(`GitLab: ${data.error}`);
              setGitlabData(data);
            })
        );
      }

      if (promises.length === 0) {
        setError("Enter at least one username.");
        setLoading(false);
        return;
      }

      await Promise.all(promises);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const hasData = githubData || gitlabData;

  return (
    <main className="max-w-6xl mx-auto px-4 py-12">
      <div className="text-center mb-10">
        <div className="flex justify-center mb-3">
          <GitAllLogo />
        </div>
        <p style={{ color: "var(--text-secondary)" }}>
          See GitHub &amp; GitLab contributions in one place.
        </p>
      </div>

      <SearchForm onSearch={handleSearch} loading={loading} />

      {error && (
        <div className="mt-6 p-4 rounded-lg border text-sm" style={{ borderColor: "#f85149", color: "#f85149", backgroundColor: "rgba(248,81,73,0.1)" }}>
          {error}
        </div>
      )}

      {hasData && (
        <div className="mt-10">
          <div className="flex items-center justify-between mb-6">
            <StatsBar github={githubData} gitlab={gitlabData} />
            <div className="flex gap-1 p-1 rounded-lg" style={{ backgroundColor: "var(--bg-surface)" }}>
              {(["side-by-side", "integrated"] as ViewMode[]).map((mode) => (
                <button
                  key={mode}
                  onClick={() => setViewMode(mode)}
                  className="px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer"
                  style={{
                    backgroundColor: viewMode === mode ? "var(--bg-elevated)" : "transparent",
                    color: viewMode === mode ? "var(--text-primary)" : "var(--text-secondary)",
                  }}
                >
                  {mode === "side-by-side" ? "Side by Side" : "Integrated"}
                </button>
              ))}
            </div>
          </div>

          {viewMode === "side-by-side" ? (
            <div className="space-y-8">
              {githubData && (
                <div>
                  <h2 className="text-sm font-medium mb-3" style={{ color: "var(--text-secondary)" }}>
                    GitHub — @{githubData.username}
                  </h2>
                  <ContributionGrid data={githubData} platform="github" />
                </div>
              )}
              {gitlabData && (
                <div>
                  <h2 className="text-sm font-medium mb-3" style={{ color: "var(--text-secondary)" }}>
                    GitLab — @{gitlabData.username}
                  </h2>
                  <ContributionGrid data={gitlabData} platform="gitlab" />
                </div>
              )}
            </div>
          ) : (
            <div>
              <h2 className="text-sm font-medium mb-3" style={{ color: "var(--text-secondary)" }}>
                Combined Activity
                {githubData && gitlabData
                  ? ` — @${githubData.username} + @${gitlabData.username}`
                  : githubData
                    ? ` — @${githubData.username}`
                    : ` — @${gitlabData!.username}`}
              </h2>
              <ContributionGrid
                data={mergeContributions(githubData, gitlabData)}
                platform="integrated"
              />
            </div>
          )}
        </div>
      )}

      <footer className="mt-16 pb-4 text-center">
        <p className="text-xs" style={{ color: "var(--text-muted)" }}>
          Built by{" "}
          <a
            href="https://toastbyte.studio"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "var(--text-secondary)" }}
            className="hover:underline"
          >
            Toastbyte Studios
          </a>
        </p>
      </footer>
    </main>
  );
}

function mergeContributions(
  github: ContributionData | null,
  gitlab: ContributionData | null
): ContributionData {
  const map = new Map<string, number>();

  for (const entry of github?.calendar ?? []) {
    map.set(entry.date, (map.get(entry.date) ?? 0) + entry.count);
  }
  for (const entry of gitlab?.calendar ?? []) {
    map.set(entry.date, (map.get(entry.date) ?? 0) + entry.count);
  }

  const calendar = Array.from(map.entries())
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([date, count]) => ({ date, count, level: countToLevel(count) }));

  const totalContributions = calendar.reduce((sum, d) => sum + d.count, 0);

  return {
    platform: "integrated",
    username: [github?.username, gitlab?.username].filter(Boolean).join(" + "),
    totalContributions,
    dateRange: {
      from: calendar[0]?.date ?? null,
      to: calendar[calendar.length - 1]?.date ?? null,
    },
    calendar,
  };
}

function countToLevel(count: number): number {
  if (count === 0) return 0;
  if (count <= 3) return 1;
  if (count <= 7) return 2;
  if (count <= 15) return 3;
  return 4;
}
