import type { Metadata } from "next";
import { Section } from "@/components/section";
import { PostCard } from "@/components/post-card";
import { SubscribeCTA } from "@/components/subscribe-cta";
import { getSubstackPosts, type SubstackPost } from "@/lib/substack";

export const revalidate = 3600; // ISR: refresh every hour

export const metadata: Metadata = {
  title: "Writing",
  description:
    "Insights on AI product strategy, data platform leadership, and building product organizations. From The Data Product Agent on Substack.",
};

export default async function WritingPage() {
  const posts = await getSubstackPosts();

  return (
    <>
      <Section label="WRITING" title="Field notes.">
        <ul className="border-t border-[var(--color-rule)]">
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
                excerpt={post.contentSnippet?.slice(0, 220) ?? undefined}
              />
            ))
          ) : (
            <li className="py-12 text-center">
              <p className="text-[var(--color-paper-mid)]">
                Posts are loading. Check back soon or visit{" "}
                <a
                  href="https://thedataproductagent.substack.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[var(--color-arctic)] hover:underline"
                >
                  The Data Product Agent
                </a>{" "}
                directly.
              </p>
            </li>
          )}
        </ul>
      </Section>

      <SubscribeCTA />
    </>
  );
}
