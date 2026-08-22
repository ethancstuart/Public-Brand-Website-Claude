import { getLatestCommit } from "@/lib/github";
import { getSubstackPosts } from "@/lib/substack";

function timeAgo(iso: string): string {
  const ms = Date.now() - new Date(iso).getTime();
  const m = Math.floor(ms / 60_000);
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  const d = Math.floor(h / 24);
  return `${d}d ago`;
}

/**
 * A quiet line of real evidence for the shipping claim — last commit, last
 * post. No pulse, no glow: the point is that it is current, not that it moves.
 */
export async function LiveIndicators() {
  const [commit, posts] = await Promise.all([
    getLatestCommit(),
    getSubstackPosts(1).catch(() => []),
  ]);
  const post = posts?.[0];

  if (!commit && !post) return null;

  return (
    <ul className="flex flex-wrap gap-x-7 gap-y-1.5 border-b border-rule py-3 font-mono text-[10.5px] tracking-[0.06em] text-ink-faint">
      {commit && (
        <li>
          Last shipped{" "}
          <a
            href={commit.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-ink-soft no-underline hover:text-accent"
          >
            {commit.repo.split("/").slice(-1)[0]} · {timeAgo(commit.date)}
          </a>
        </li>
      )}
      {post && (
        <li>
          Last published{" "}
          <a
            href={`/writing/${post.slug}`}
            className="text-ink-soft no-underline hover:text-accent"
          >
            {post.title.slice(0, 52)}
            {post.title.length > 52 ? "…" : ""}
          </a>
        </li>
      )}
    </ul>
  );
}
