"use client";

import { useState } from "react";

interface SearchFormProps {
  onSearch: (githubUsername: string, gitlabUsername: string) => void;
  loading: boolean;
}

export function SearchForm({ onSearch, loading }: SearchFormProps) {
  const [github, setGithub] = useState("");
  const [gitlab, setGitlab] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(github, gitlab);
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex-1">
          <label
            htmlFor="github"
            className="block text-xs font-medium mb-1.5"
            style={{ color: "var(--text-secondary)" }}
          >
            GitHub username
          </label>
          <input
            id="github"
            type="text"
            value={github}
            onChange={(e) => setGithub(e.target.value)}
            placeholder="octocat"
            className="w-full px-3 py-2 rounded-lg text-sm outline-none transition-colors"
            style={{
              backgroundColor: "var(--bg-surface)",
              border: "1px solid var(--border)",
              color: "var(--text-primary)",
            }}
          />
        </div>
        <div className="flex-1">
          <label
            htmlFor="gitlab"
            className="block text-xs font-medium mb-1.5"
            style={{ color: "var(--text-secondary)" }}
          >
            GitLab username
          </label>
          <input
            id="gitlab"
            type="text"
            value={gitlab}
            onChange={(e) => setGitlab(e.target.value)}
            placeholder="johndoe"
            className="w-full px-3 py-2 rounded-lg text-sm outline-none transition-colors"
            style={{
              backgroundColor: "var(--bg-surface)",
              border: "1px solid var(--border)",
              color: "var(--text-primary)",
            }}
          />
        </div>
        <div className="flex items-end">
          <button
            type="submit"
            disabled={loading || (!github.trim() && !gitlab.trim())}
            className="w-full sm:w-auto px-6 py-2 rounded-lg text-sm font-medium transition-colors disabled:opacity-40 cursor-pointer disabled:cursor-not-allowed"
            style={{
              backgroundColor: "var(--accent)",
              color: "var(--bg)",
            }}
          >
            {loading ? "Loading\u2026" : "Look up"}
          </button>
        </div>
      </div>
    </form>
  );
}
