import { Hero } from "@/components/hero";
import { PostCard } from "@/components/post-card";
import { SubscribeCTA } from "@/components/subscribe-cta";
import { JsonLd } from "@/components/json-ld";
import { getSubstackPosts } from "@/lib/substack";
import { getWebSiteJsonLd } from "@/lib/jsonld";
import Link from "next/link";

export const revalidate = 3600;

export default async function HomePage() {
  const posts = await getSubstackPosts(3);

  return (
    <>
      <JsonLd data={getWebSiteJsonLd()} />
      <Hero />

      {/* About preview */}
      <section
        className="mx-auto w-full"
        style={{
          maxWidth: "1280px",
          padding: "100px 56px 120px",
          borderTop: "1px solid var(--border)",
        }}
      >
        <div className="flex items-center gap-3 mb-10">
          <span style={{ width: "24px", height: "1px", background: "var(--accent)", opacity: 0.5 }} />
          <span
            className="font-mono uppercase"
            style={{ fontSize: "10px", letterSpacing: "0.2em", color: "var(--muted-foreground)" }}
          >
            About
          </span>
        </div>
        <p
          className="font-serif italic"
          style={{
            fontSize: "clamp(22px, 3vw, 36px)",
            lineHeight: 1.3,
            maxWidth: "680px",
            color: "var(--foreground)",
            marginBottom: "28px",
          }}
        >
          The gap between managing data and actually building with it is closing
          fast. I&apos;ve spent my career working on both sides of that wall.
        </p>
        <Link
          href="/about"
          className="font-mono uppercase transition-opacity hover:opacity-70"
          style={{ fontSize: "10px", letterSpacing: "0.14em", color: "var(--accent)" }}
        >
          Read more →
        </Link>
      </section>

      {/* Writing preview */}
      {posts.length > 0 && (
        <section
          className="mx-auto w-full"
          style={{
            maxWidth: "1280px",
            padding: "100px 56px 120px",
            borderTop: "1px solid var(--border)",
          }}
        >
          <div className="flex items-center justify-between mb-10">
            <div className="flex items-center gap-3">
              <span style={{ width: "24px", height: "1px", background: "var(--accent)", opacity: 0.5 }} />
              <span
                className="font-mono uppercase"
                style={{ fontSize: "10px", letterSpacing: "0.2em", color: "var(--muted-foreground)" }}
              >
                Latest Writing
              </span>
            </div>
            <Link
              href="/writing"
              className="font-mono uppercase transition-opacity hover:opacity-70"
              style={{ fontSize: "10px", letterSpacing: "0.14em", color: "var(--accent)" }}
            >
              View all →
            </Link>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post, i) => (
              <PostCard key={post.link} post={post} index={i} />
            ))}
          </div>
        </section>
      )}

      <SubscribeCTA />
    </>
  );
}
