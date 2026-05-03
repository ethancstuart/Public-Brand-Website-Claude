import Link from "next/link";

export interface PostCardProps {
  slug: string;
  title: string;
  date: string;
  excerpt?: string;
}

export function PostCard({ slug, title, date, excerpt }: PostCardProps) {
  return (
    <li className="border-b border-[var(--color-rule)] group">
      <Link
        href={`/writing/${slug}`}
        className="block py-6 transition-[padding] duration-200 group-hover:pl-4"
      >
        <div className="flex items-baseline justify-between gap-6">
          <h3 className="font-[family-name:var(--font-syne)] font-bold text-[18px] md:text-[22px] tracking-[-0.01em] text-[var(--color-paper-mid)] group-hover:text-[var(--color-paper)] transition-colors leading-snug">
            {title}
          </h3>
          <time className="font-[family-name:var(--font-dm-mono)] text-[10px] tracking-[0.16em] uppercase text-[var(--color-paper-low)] flex-shrink-0">
            {date}
          </time>
        </div>
        {excerpt && (
          <p className="text-[14px] text-[var(--color-paper-mid)] leading-relaxed mt-3 max-w-[760px]">
            {excerpt}
          </p>
        )}
      </Link>
    </li>
  );
}
