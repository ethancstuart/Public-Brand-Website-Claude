import { siteConfig } from "@/lib/constants";
import Link from "next/link";

export function SubscribeCTA() {
  return (
    <aside className="border-t border-[var(--color-rule)] mt-16 pt-12">
      <div className="grid md:grid-cols-[1fr_auto] gap-6 items-center">
        <div>
          <div className="font-[family-name:var(--font-dm-mono)] text-[10px] tracking-[0.22em] uppercase text-[var(--color-paper-low)] mb-2">
            Subscribe
          </div>
          <h3 className="font-[family-name:var(--font-syne)] font-extrabold text-[24px] tracking-[-0.02em] leading-tight">
            The Data Product Agent.
          </h3>
          <p className="text-[14px] text-[var(--color-paper-mid)] leading-relaxed mt-2 max-w-[480px]">
            Insights on AI product strategy, data platform leadership, and building
            high-velocity product organizations at enterprise scale.
          </p>
        </div>
        <Link
          href={siteConfig.links.substack}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-5 py-3 border border-[var(--color-arctic)] text-[var(--color-arctic)] hover:bg-[var(--color-arctic)] hover:text-[var(--color-bg)] font-[family-name:var(--font-syne)] font-bold text-[12px] tracking-[0.16em] uppercase transition-colors rounded-sm whitespace-nowrap"
        >
          Subscribe ↗
        </Link>
      </div>
    </aside>
  );
}
