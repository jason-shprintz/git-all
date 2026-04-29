# git-all

Unified contribution heatmap viewer for GitHub and GitLab. Enter usernames from either platform and see their contribution squares side-by-side or merged into a single integrated view.

## Getting Started

```bash
git clone https://github.com/jason-shprintz/git-all.git
cd git-all
npm install
```

Copy the env file and add your GitHub token:

```bash
cp .env.example .env.local
# Edit .env.local and add your GITHUB_TOKEN
```

A GitHub personal access token is needed to call the GraphQL API (even for public data). No special scopes required — a classic token with zero permissions works.

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Features

- **GitHub contributions** via GraphQL API (server-side, token stays private)
- **GitLab contributions** via public REST API (no auth needed)
- **Side-by-side view** with platform-specific colors (green for GitHub, orange for GitLab)
- **Integrated view** that merges both calendars into a single heatmap
- **Stats bar** showing per-platform and combined totals
- **Tooltips** on hover showing exact counts per day

## Tech Stack

- Next.js 15 (App Router)
- React 19
- TypeScript
- Tailwind CSS 4

## Related

- [git-contributions MCP service](https://github.com/jason-shprintz/mcp-services) — the MCP server counterpart for AI agents
