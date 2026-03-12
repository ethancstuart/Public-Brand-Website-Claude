import { Hero } from "@/components/hero";
import { Section } from "@/components/section";
import { ProjectCard } from "@/components/project-card";
import { PostCard } from "@/components/post-card";
import { SubscribeCTA } from "@/components/subscribe-cta";
import { JsonLd } from "@/components/json-ld";
import { projects, portfolioProjects, courseConfig } from "@/lib/constants";
import { getSubstackPosts } from "@/lib/substack";
import { getWebSiteJsonLd } from "@/lib/jsonld";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const revalidate = 3600;

export default async function HomePage() {
  const posts = await getSubstackPosts(3);
  const featured = projects.filter((p) => p.featured);

  return (
    <>
      <JsonLd data={getWebSiteJsonLd()} />
      <Hero />

      {/* About Preview */}
      <Section className="py-24">
        <div className="max-w-2xl">
          <p className="mb-2 font-mono text-xs tracking-widest text-accent uppercase">
            About
          </p>
          <p className="text-lg leading-relaxed text-muted-foreground">
            I stand up teams, operating models, and platforms — then deliver value
            through them. Currently leading Disney Studios&apos; data &amp; AI
            platform strategy across 13 direct reports and 8 product pods. Track
            record of walking into complexity and creating order at Disney, Taco
            Bell, and Capital Group.
          </p>
          <Link
            href="/about"
            className="mt-6 inline-flex items-center gap-1 font-mono text-sm text-accent hover:underline"
          >
            Read more <ArrowRight className="h-3 w-3" />
          </Link>
        </div>
      </Section>

      {/* Featured Work */}
      <Section className="py-24">
        <div className="mb-10 flex items-end justify-between">
          <div>
            <p className="mb-2 font-mono text-xs tracking-widest text-accent uppercase">
              Featured Work
            </p>
            <h2 className="text-3xl font-bold tracking-tight">
              Selected projects
            </h2>
          </div>
          <Link
            href="/work"
            className="hidden items-center gap-1 font-mono text-sm text-accent hover:underline sm:inline-flex"
          >
            View all <ArrowRight className="h-3 w-3" />
          </Link>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {featured.map((project, i) => (
            <ProjectCard key={project.title} project={project} index={i} />
          ))}
        </div>
        <div className="mt-6 text-center sm:hidden">
          <Link
            href="/work"
            className="inline-flex items-center gap-1 font-mono text-sm text-accent hover:underline"
          >
            View all work <ArrowRight className="h-3 w-3" />
          </Link>
        </div>
      </Section>

      {/* What I Build */}
      <Section className="py-24">
        <div className="mb-10 flex items-end justify-between">
          <div>
            <p className="mb-2 font-mono text-xs tracking-widest text-accent uppercase">
              What I Build
            </p>
            <h2 className="text-3xl font-bold tracking-tight">
              Side projects, shipped
            </h2>
          </div>
          <Link
            href="/portfolio"
            className="hidden items-center gap-1 font-mono text-sm text-accent hover:underline sm:inline-flex"
          >
            View all <ArrowRight className="h-3 w-3" />
          </Link>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          {portfolioProjects.map((project) => (
            <Link
              key={project.slug}
              href={`/portfolio/${project.slug}`}
              className="group rounded-2xl border border-border bg-card p-6 transition-all duration-300 hover:border-accent/30 hover:shadow-lg hover:shadow-accent/5 sm:p-8"
            >
              <h3 className="mb-2 text-lg font-semibold leading-snug tracking-tight group-hover:text-accent transition-colors">
                {project.title}
              </h3>
              <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-muted px-3 py-1 font-mono text-xs text-muted-foreground"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </Link>
          ))}
        </div>
        <div className="mt-6 text-center sm:hidden">
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-1 font-mono text-sm text-accent hover:underline"
          >
            View portfolio <ArrowRight className="h-3 w-3" />
          </Link>
        </div>
      </Section>

      {/* Latest Writing */}
      {posts.length > 0 && (
        <Section className="py-24">
          <div className="mb-10 flex items-end justify-between">
            <div>
              <p className="mb-2 font-mono text-xs tracking-widest text-accent uppercase">
                Latest Writing
              </p>
              <h2 className="text-3xl font-bold tracking-tight">
                From The Data Product Agent
              </h2>
            </div>
            <Link
              href="/writing"
              className="hidden items-center gap-1 font-mono text-sm text-accent hover:underline sm:inline-flex"
            >
              View all <ArrowRight className="h-3 w-3" />
            </Link>
          </div>

          {/* Featured first post */}
          <Link
            href={`/writing/${posts[0].slug}`}
            className="group mb-6 block rounded-2xl border border-border bg-card p-8 transition-all duration-300 hover:border-accent/30 hover:shadow-lg hover:shadow-accent/5 sm:p-10"
          >
            <time className="mb-3 block font-mono text-xs text-muted-foreground">
              {posts[0].pubDate
                ? new Date(posts[0].pubDate).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })
                : ""}
            </time>
            <h3 className="mb-3 text-2xl font-bold tracking-tight group-hover:text-accent transition-colors sm:text-3xl">
              {posts[0].title}
            </h3>
            <p className="mb-4 max-w-2xl text-base leading-relaxed text-muted-foreground">
              {posts[0].contentSnippet}
            </p>
            <span className="font-mono text-sm text-accent">
              Read article →
            </span>
          </Link>

          {/* Remaining posts */}
          {posts.length > 1 && (
            <div className="grid gap-6 md:grid-cols-2">
              {posts.slice(1).map((post, i) => (
                <PostCard key={post.link} post={post} index={i} />
              ))}
            </div>
          )}
        </Section>
      )}

      {/* Course Promo */}
      {courseConfig.enabled && (
        <Section className="py-24">
          <div className="relative overflow-hidden rounded-3xl border border-border bg-card p-10 sm:p-16">
            <div className="absolute -right-20 -top-20 h-60 w-60 rounded-full bg-accent/5 blur-3xl" />
            <div className="absolute -bottom-20 -left-20 h-60 w-60 rounded-full bg-accent/5 blur-3xl" />
            <div className="relative">
              <p className="mb-2 font-mono text-xs tracking-widest text-accent uppercase">
                New Course
              </p>
              <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">
                {courseConfig.title}
              </h2>
              <p className="mb-8 max-w-lg text-muted-foreground">
                {courseConfig.subtitle}
              </p>
              <Link
                href="/course"
                className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-medium text-accent-foreground transition-all hover:opacity-90"
              >
                Learn more
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </Section>
      )}

      <SubscribeCTA />
    </>
  );
}
