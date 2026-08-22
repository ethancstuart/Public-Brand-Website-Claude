import { siteConfig } from "@/lib/constants";

export function SubscribeCTA() {
  return (
    <aside className="grid grid-cols-[minmax(0,1fr)_auto] items-end gap-x-10 gap-y-5 border-t border-rule-strong pt-8 max-[640px]:grid-cols-1">
      <div>
        <span className="eyebrow">Subscribe</span>
        <p className="my-3 font-display text-[21px] leading-[1.35] tracking-[-0.01em]">
          The Data Product Agent
        </p>
        <p className="max-w-[52ch] text-[15px] leading-[1.6] text-ink-soft">
          Long-form work on data products, AI-native team operating models,
          multi-agent systems, and building enterprise software through AI coding
          tools.
        </p>
      </div>
      <a
        href={siteConfig.links.substack}
        target="_blank"
        rel="noopener noreferrer"
        className="cta whitespace-nowrap"
      >
        Subscribe ↗
      </a>
    </aside>
  );
}
