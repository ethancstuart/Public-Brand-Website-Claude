import Link from "next/link";

export interface PostCardProps {
  slug: string;
  title: string;
  date: string;
  excerpt?: string;
}

export function PostCard({ slug, title, date, excerpt }: PostCardProps) {
  return (
    <li>
      <Link
        href={`/writing/${slug}`}
        className="grid grid-cols-[minmax(0,1fr)_110px] items-baseline gap-x-7 gap-y-2 py-5 no-underline transition-colors hover:bg-ground-sunk max-[640px]:grid-cols-1"
      >
        <div>
          <h3 className="text-[17px] font-medium leading-snug tracking-[-0.008em]">
            {title}
          </h3>
          {excerpt && (
            <p className="mt-1.5 max-w-[var(--measure)] text-[14.5px] leading-[1.58] text-ink-soft">
              {excerpt}
            </p>
          )}
        </div>
        <time className="tnum justify-self-start font-mono text-[11px] uppercase tracking-[0.08em] text-ink-faint max-[640px]:order-first">
          {date}
        </time>
      </Link>
    </li>
  );
}
