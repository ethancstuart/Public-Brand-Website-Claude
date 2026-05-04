// Fetches the most recent public commit timestamp from a GitHub user.
// Uses the public events API — no auth needed for low rate. ISR'd at the consumer.

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
      { next: { revalidate: 600 }, headers: { Accept: "application/vnd.github+json" } }
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
