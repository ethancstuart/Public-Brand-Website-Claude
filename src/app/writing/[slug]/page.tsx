import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Section } from "@/components/section";
import { SubscribeCTA } from "@/components/subscribe-cta";
import { JsonLd } from "@/components/json-ld";
import { getSubstackPostBySlug } from "@/lib/substack";
import { getArticleJsonLd } from "@/lib/jsonld";
import { siteConfig } from "@/lib/constants";
import { ArrowLeft, ExternalLink } from "lucide-react";
import sanitizeHtml from "sanitize-html";

export const revalidate = 3600;

interface Props {
  params: Promise<{ slug: string }>;
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

  const date = post.pubDate
    ? new Date(post.pubDate).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
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

      {/* Back link */}
      <Section className="pt-24 pb-4">
        <Link
          href="/writing"
          className="inline-flex items-center gap-1.5 font-mono text-xs text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-3 w-3" />
          Back to Writing
        </Link>
      </Section>

      {/* Header */}
      <Section className="pb-8">
        {date && (
          <time className="mb-3 block font-mono text-xs text-muted-foreground">
            {date}
          </time>
        )}
        <h1 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">
          {post.title}
        </h1>
      </Section>

      {/* Article content */}
      <Section className="pb-12">
        <article
          className="prose prose-lg max-w-none"
          dangerouslySetInnerHTML={{ __html: cleanHtml }}
        />
      </Section>

      {/* Footer links */}
      <Section className="pb-12">
        <div className="flex flex-wrap items-center gap-4 border-t border-border pt-8">
          <a
            href={post.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-2 text-sm font-medium text-background transition-opacity hover:opacity-90"
          >
            Read on Substack
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
          <Link
            href="/writing"
            className="font-mono text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            All articles
          </Link>
        </div>
      </Section>

      <SubscribeCTA />
    </>
  );
}
