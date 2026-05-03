import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Section } from "@/components/section";
import { SubscribeCTA } from "@/components/subscribe-cta";
import { JsonLd } from "@/components/json-ld";
import { getSubstackPostBySlug, getSubstackPosts } from "@/lib/substack";
import { getArticleJsonLd } from "@/lib/jsonld";
import { siteConfig } from "@/lib/constants";
import { ArrowLeft } from "lucide-react";
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
      })
    : "";

  return (
    <>
      <JsonLd
        data={getArticleJsonLd({
          title: post.title,
          description: post.contentSnippet,
          url: `${siteConfig.url}/writing/${slug}`,
          datePublished: post.pubDate,
        })}
      />

      <article className="max-w-[720px] mx-auto px-6 md:px-12 py-24">
        <Link
          href="/writing"
          className="inline-flex items-center gap-1.5 font-[family-name:var(--font-dm-mono)] text-[10px] tracking-[0.16em] uppercase text-[var(--color-paper-low)] transition-colors hover:text-[var(--color-paper-mid)] mb-12"
        >
          <ArrowLeft className="h-3 w-3" />
          Back to Writing
        </Link>

        <header className="mb-12 border-b border-[var(--color-rule)] pb-8">
          <div className="font-[family-name:var(--font-dm-mono)] text-[10px] tracking-[0.16em] uppercase text-[var(--color-paper-low)] mb-3">
            {dateLabel} · Field Note
          </div>
          <h1 className="font-[family-name:var(--font-bricolage)] font-extrabold text-[clamp(36px,5vw,56px)] tracking-[-0.04em] leading-[1.05]">
            {post.title}
          </h1>
        </header>

        <div
          className="prose prose-invert prose-lg max-w-none
                     prose-p:text-[17px] prose-p:leading-[1.75] prose-p:text-[rgba(216,212,204,0.85)]
                     prose-headings:font-[family-name:var(--font-syne)]
                     prose-blockquote:border-l-2 prose-blockquote:border-[var(--color-indigo)]
                     prose-blockquote:font-[family-name:var(--font-instrument)] prose-blockquote:italic
                     prose-a:text-[var(--color-arctic)] prose-a:no-underline hover:prose-a:underline"
          dangerouslySetInnerHTML={{ __html: cleanHtml }}
        />

        <div className="flex flex-wrap items-center gap-4 border-t border-[var(--color-rule)] pt-8 mt-12">
          <a
            href={post.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-[var(--color-paper)] px-5 py-2 text-sm font-medium text-[var(--color-ink)] transition-opacity hover:opacity-90"
          >
            Read on Substack ↗
          </a>
          <Link
            href="/writing"
            className="font-[family-name:var(--font-dm-mono)] text-[10px] tracking-[0.16em] uppercase text-[var(--color-paper-low)] transition-colors hover:text-[var(--color-paper-mid)]"
          >
            All articles
          </Link>
        </div>
      </article>

      <SubscribeCTA />
    </>
  );
}
