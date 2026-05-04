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

export async function LiveIndicators() {
  const [commit, posts] = await Promise.all([
    getLatestCommit(),
    getSubstackPosts(1).catch(() => []),
  ]);
  const post = posts?.[0];

  return (
    <ul className="flex flex-wrap items-center gap-x-8 gap-y-3 font-[family-name:var(--font-dm-mono)] text-[10px] tracking-[0.18em] uppercase">
      {commit && (
        <li className="flex items-center gap-2">
          <span
            className="inline-block w-1.5 h-1.5 rounded-full bg-[var(--color-arctic)]"
            style={{ boxShadow: "0 0 6px var(--color-arctic)" }}
          />
          <span className="text-[var(--color-paper-mid)]">Currently shipping:</span>
          <a
            href={commit.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--color-paper)] hover:text-[var(--color-arctic)] transition-colors lowercase tracking-[0.04em]"
          >
            {commit.repo.split("/").slice(-1)[0]} · {timeAgo(commit.date)}
          </a>
        </li>
      )}
      {post && (
        <li className="flex items-center gap-2">
          <span
            className="inline-block w-1.5 h-1.5 rounded-full bg-[var(--color-indigo)]"
            style={{ boxShadow: "0 0 6px var(--color-indigo)" }}
          />
          <span className="text-[var(--color-paper-mid)]">Now writing:</span>
          <a
            href={`/writing/${post.slug}`}
            className="text-[var(--color-paper)] hover:text-[var(--color-indigo)] transition-colors lowercase tracking-[0.04em]"
          >
            {post.title.slice(0, 48)}{post.title.length > 48 ? "…" : ""}
          </a>
        </li>
      )}
    </ul>
  );
}
