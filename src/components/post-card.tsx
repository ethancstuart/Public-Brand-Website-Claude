"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import type { SubstackPost } from "@/lib/substack";

interface PostCardProps {
  post: SubstackPost;
  index: number;
}

export function PostCard({ post, index }: PostCardProps) {
  const date = post.pubDate
    ? new Date(post.pubDate).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : "";

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Link
        href={`/writing/${post.slug}`}
        className="group block rounded-2xl border border-border bg-card p-6 transition-all duration-300 hover:border-accent/30 hover:shadow-lg hover:shadow-accent/5 sm:p-8"
      >
        <div className="mb-3 flex items-center justify-between">
          <time className="font-mono text-xs text-muted-foreground">
            {date}
          </time>
          <ArrowUpRight className="h-4 w-4 text-muted-foreground opacity-0 transition-all group-hover:opacity-100" />
        </div>

        <h3 className="mb-3 text-lg font-semibold leading-snug tracking-tight group-hover:text-accent transition-colors">
          {post.title}
        </h3>

        <p className="text-sm leading-relaxed text-muted-foreground">
          {post.contentSnippet}
        </p>

        <span className="mt-4 inline-block font-mono text-xs text-accent">
          Read article →
        </span>
      </Link>
      <a
        href={post.link}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-2 inline-block font-mono text-xs text-muted-foreground transition-colors hover:text-accent"
      >
        Also on Substack ↗
      </a>
    </motion.div>
  );
}
