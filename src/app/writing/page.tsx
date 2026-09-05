import type { Metadata } from "next";
import { PostCard } from "@/components/post-card";
import { SubscribeCTA } from "@/components/subscribe-cta";
import { getSubstackPosts, type SubstackPost } from "@/lib/substack";
import { siteConfig } from "@/lib/constants";

export const revalidate = 3600; // ISR: refresh every hour

export const metadata: Metadata = {
  title: "Writing",
  description:
    "Long-form work on data products, AI-native team operating models, multi-agent systems, and building enterprise software through AI coding tools.",
};

/**
 * Substack snippets arrive pre-truncated mid-sentence and occasionally carry
 * emoji. The register's excerpt is plain: word-boundary cut, one ellipsis.
 */
function cleanExcerpt(snippet?: string): string | undefined {
  if (!snippet) return undefined;
  let t = snippet
    .replace(/[\u{1F000}-\u{1FAFF}\u{2600}-\u{27BF}\u{FE0F}]/gu, "")
    .replace(/\s+/g, " ")
    .trim();
  if (t.length > 200) {
    const cut = t.slice(0, 200);
    t = cut.slice(0, cut.lastIndexOf(" ")) || cut;
  }
  t = t.replace(/[.\u2026]+$/, "");
  return t ? t + "\u2026" : undefined;
}

export default async function WritingPage() {
  const posts = await getSubstackPosts();

  return (
    <div className="wrap">
      <div className="pb-[clamp(28px,4vw,44px)] pt-[clamp(44px,6vw,78px)]">
        <span className="eyebrow mb-5 block">Writing</span>
        <h1 className="mb-5 max-w-[20ch] font-display text-[clamp(28px,4vw,46px)] leading-[1.14] tracking-[-0.017em]">
          The Data Product Agent
        </h1>
        <p className="max-w-[58ch] text-[17px] leading-[1.6] text-ink-soft">
          Long-form work on data products, AI-native team operating models,
          multi-agent systems, and building enterprise software through AI coding
          tools.
        </p>
      </div>

      <ul className="ledger">
        {posts.length > 0 ? (
          posts.map((post: SubstackPost) => (
            <PostCard
              key={post.link}
              slug={post.slug}
              title={post.title}
              date={
                post.pubDate
                  ? new Date(post.pubDate).toLocaleDateString("en-US", {
                      month: "short",
                      year: "numeric",
                    })
                  : ""
              }
              excerpt={cleanExcerpt(post.contentSnippet)}
            />
          ))
        ) : (
          <li className="py-8 text-[15px] text-ink-soft">
            The feed is unavailable right now. Read it directly at{" "}
            <a
              href={siteConfig.links.substack}
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent no-underline hover:underline"
            >
              The Data Product Agent
            </a>
            .
          </li>
        )}
      </ul>

      <div className="py-[clamp(44px,6vw,72px)]">
        <SubscribeCTA />
      </div>
    </div>
  );
}
