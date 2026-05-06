import { NextRequest, NextResponse } from 'next/server';

const GITHUB_GRAPHQL_URL = 'https://api.github.com/graphql';

const CONTRIBUTIONS_QUERY = `
  query($username: String!, $from: DateTime, $to: DateTime) {
    user(login: $username) {
      contributionsCollection(from: $from, to: $to) {
        contributionCalendar {
          totalContributions
          weeks {
            contributionDays {
              date
              contributionCount
              color
            }
          }
        }
      }
    }
  }
`;

const COLOR_TO_LEVEL: Record<string, number> = {
  '#ebedf0': 0,
  '#9be9a8': 1,
  '#40c463': 2,
  '#30a14e': 3,
  '#216e39': 4,
};

export async function GET(request: NextRequest) {
  const username = request.nextUrl.searchParams.get('username');
  if (!username) {
    return NextResponse.json(
      { error: 'Missing username parameter' },
      { status: 400 },
    );
  }

  const token = process.env.GITHUB_TOKEN;
  if (!token) {
    return NextResponse.json(
      { error: 'Server misconfiguration: GITHUB_TOKEN is not set.' },
      { status: 500 },
    );
  }

  try {
    const now = new Date();
    const oneYearAgo = new Date(now);
    oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);

    const response = await fetch(GITHUB_GRAPHQL_URL, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
        'User-Agent': 'git-all/0.1.0',
      },
      body: JSON.stringify({
        query: CONTRIBUTIONS_QUERY,
        variables: {
          username,
          from: oneYearAgo.toISOString(),
          to: now.toISOString(),
        },
      }),
    });

    if (!response.ok) {
      throw new Error(`GitHub API returned ${response.status}`);
    }

    const json = await response.json();

    if (json.errors) {
      throw new Error(
        json.errors.map((e: { message: string }) => e.message).join('; '),
      );
    }

    const user = json.data?.user;
    if (!user) {
      return NextResponse.json(
        { error: `GitHub user '${username}' not found.` },
        { status: 404 },
      );
    }

    const calendar = user.contributionsCollection.contributionCalendar;
    const days = calendar.weeks.flatMap(
      (w: {
        contributionDays: Array<{
          date: string;
          contributionCount: number;
          color: string;
        }>;
      }) => w.contributionDays,
    );

    return NextResponse.json({
      platform: 'github',
      username,
      totalContributions: calendar.totalContributions,
      dateRange: {
        from: days[0]?.date ?? null,
        to: days[days.length - 1]?.date ?? null,
      },
      calendar: days.map(
        (d: { date: string; contributionCount: number; color: string }) => ({
          date: d.date,
          count: d.contributionCount,
          level: COLOR_TO_LEVEL[d.color.toLowerCase()] ?? 0,
        }),
      ),
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
