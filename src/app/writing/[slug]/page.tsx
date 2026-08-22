import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SubscribeCTA } from "@/components/subscribe-cta";
import { JsonLd } from "@/components/json-ld";
import { getSubstackPostBySlug, getSubstackPosts } from "@/lib/substack";
import { getArticleJsonLd } from "@/lib/jsonld";
import { siteConfig } from "@/lib/constants";
import sanitizeHtml from "sanitize-html";

export const revalidate = 3600;

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = await getSubstackPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getSubstackPostBySlug(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.contentSnippet,
  };
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const post = await getSubstackPostBySlug(slug);
  if (!post) notFound();

  const cleanHtml = sanitizeHtml(post.content, {
    allowedTags: sanitizeHtml.defaults.allowedTags.concat([
      "img",
      "figure",
      "figcaption",
      "iframe",
    ]),
    allowedAttributes: {
      ...sanitizeHtml.defaults.allowedAttributes,
      img: ["src", "alt", "width", "height", "loading"],
      a: ["href", "target", "rel"],
    },
  });

  const dateLabel = post.pubDate
    ? new Date(post.pubDate).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "";

  return (
    <div className="wrap">
      <JsonLd
        data={getArticleJsonLd({
          title: post.title,
          description: post.contentSnippet,
          url: `${siteConfig.url}/writing/${slug}`,
          datePublished: post.pubDate,
        })}
      />

      <div className="border-b border-rule py-3">
        <Link
          href="/writing"
          className="font-mono text-[10.5px] uppercase tracking-[0.11em] text-ink-faint no-underline hover:text-accent"
        >
          ← Writing
        </Link>
      </div>

      <article className="mx-auto max-w-[720px]">
        <header className="border-b border-rule pb-8 pt-[clamp(44px,6vw,72px)]">
          <p className="eyebrow mb-4">{dateLabel} · The Data Product Agent</p>
          <h1 className="font-display text-[clamp(30px,4.4vw,48px)] leading-[1.12] tracking-[-0.018em]">
            {post.title}
          </h1>
        </header>

        <div
          className="prose-register py-10"
          dangerouslySetInnerHTML={{ __html: cleanHtml }}
        />

        <div className="flex flex-wrap items-baseline gap-6 border-t border-rule pt-8">
          <a
            href={post.link}
            target="_blank"
            rel="noopener noreferrer"
            className="cta"
          >
            Read on Substack ↗
          </a>
          <Link
            href="/writing"
            className="font-mono text-[11px] uppercase tracking-[0.1em] text-ink-faint no-underline hover:text-accent"
          >
            All articles
          </Link>
        </div>

        <div className="py-[clamp(44px,6vw,72px)]">
          <SubscribeCTA />
        </div>
      </article>
    </div>
  );
}
