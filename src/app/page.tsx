import { Hero } from "@/components/hero";
import { Section } from "@/components/section";
import { ProjectCard } from "@/components/project-card";
import { PostCard } from "@/components/post-card";
import { SubscribeCTA } from "@/components/subscribe-cta";
import { projects } from "@/lib/constants";
import { getSubstackPosts } from "@/lib/substack";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const revalidate = 3600;

export default async function HomePage() {
  const posts = await getSubstackPosts(3);
  const featured = projects.filter((p) => p.featured);

  return (
    <>
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
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post, i) => (
              <PostCard key={post.link} post={post} index={i} />
            ))}
          </div>
        </Section>
      )}

      <SubscribeCTA />
    </>
  );
}
