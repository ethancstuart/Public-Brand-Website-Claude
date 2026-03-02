import type { Metadata } from "next";
import { Section } from "@/components/section";
import { PostCard } from "@/components/post-card";
import { SubscribeCTA } from "@/components/subscribe-cta";
import { getSubstackPosts } from "@/lib/substack";

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
      <Section className="pt-24 pb-16">
        <p className="mb-2 font-mono text-xs tracking-widest text-accent uppercase">
          Writing
        </p>
        <h1 className="mb-4 text-4xl font-bold tracking-tight sm:text-5xl">
          The Data Product Agent
        </h1>
        <p className="max-w-xl text-lg text-muted-foreground">
          Insights on AI product strategy, data platform leadership, and
          building high-velocity product organizations at enterprise scale.
          Published on Substack.
        </p>
      </Section>

      <Section className="pb-24">
        {posts.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post, i) => (
              <PostCard key={post.link} post={post} index={i} />
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-border bg-card p-12 text-center">
            <p className="text-muted-foreground">
              Posts are loading. Check back soon or visit{" "}
              <a
                href="https://thedataproductagent.substack.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent hover:underline"
              >
                The Data Product Agent
              </a>{" "}
              directly.
            </p>
          </div>
        )}
      </Section>

      <SubscribeCTA />
    </>
  );
}
