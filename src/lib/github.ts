// Fetches the most recent public commit timestamp from a GitHub user.
// Uses the public events API — no auth needed for low rate.
//
// Resolved at BUILD time, deliberately. This runs inside LiveIndicators on the
// home page, and a `next: { revalidate }` here promotes the whole of `/` from a
// static deployment artifact into a time-based ISR entry — which can then be
// served stale-while-revalidate across a deploy, showing visitors the previous
// release. The commit shown refreshes on every deploy, which is the moment it
// actually changes meaning.

export interface LatestCommit {
  repo: string;
  message: string;
  date: string;
  url: string;
}

const USER = "ethancstuart";

export async function getLatestCommit(): Promise<LatestCommit | null> {
  try {
    const res = await fetch(
      `https://api.github.com/users/${USER}/events/public?per_page=30`,
      {
        cache: "force-cache",
        headers: { Accept: "application/vnd.github+json" },
      }
    );
    if (!res.ok) return null;
    const events = (await res.json()) as Array<{
      type: string;
      created_at: string;
      repo: { name: string };
      payload?: { commits?: Array<{ message: string; sha: string; url: string }> };
    }>;
    const push = events.find((e) => e.type === "PushEvent" && e.payload?.commits?.length);
    const commit = push?.payload?.commits?.[push.payload.commits.length - 1];
    if (!push || !commit) return null;
    return {
      repo: push.repo.name,
      message: commit.message.split("\n")[0].slice(0, 80),
      date: push.created_at,
      url: `https://github.com/${push.repo.name}/commit/${commit.sha}`,
    };
  } catch {
    return null;
  }
}

/**
 * The last push to one product repo, resolved at BUILD time for the same
 * reason as above: it is a deployment artifact, refreshed by the deploy.
 *
 * Private repos need a read-only `GITHUB_TOKEN` in the build environment.
 * Without one, or on any failure, the row simply carries no stamp — a missing
 * stamp is honest; a wrong one is not. The commit is linked only when the
 * repo is public, so the register never points a visitor at a 404.
 */
export interface RepoStamp {
  /** ISO timestamp of the last push to any branch. */
  pushedAt: string;
  /** The repo's page, when a visitor can actually open it. */
  url: string | null;
}

export async function getRepoStamp(repo: string): Promise<RepoStamp | null> {
  try {
    const headers: Record<string, string> = {
      Accept: "application/vnd.github+json",
    };
    const token = process.env.GITHUB_TOKEN;
    if (token) headers.Authorization = `Bearer ${token}`;
    const res = await fetch(`https://api.github.com/repos/${USER}/${repo}`, {
      cache: "force-cache",
      headers,
    });
    if (!res.ok) return null;
    const data = (await res.json()) as {
      pushed_at?: string;
      private?: boolean;
      html_url?: string;
    };
    if (!data.pushed_at) return null;
    return {
      pushedAt: data.pushed_at,
      url: data.private ? null : (data.html_url ?? null),
    };
  } catch {
    return null;
  }
}

/**
 * "6 Oct 2026" — a date, not "3d ago". A relative figure rots between deploys.
 * Formatted by hand so the month is always three letters, whatever ICU the
 * build machine carries.
 */
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export function formatStampDate(iso: string): string {
  const d = new Date(iso);
  return `${d.getUTCDate()} ${MONTHS[d.getUTCMonth()]} ${d.getUTCFullYear()}`;
}
