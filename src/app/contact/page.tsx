import type { Metadata } from "next";
import { siteConfig } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Open to Director and VP roles in AI product leadership. Also reachable for builder collaboration and advisory.",
};

const CHANNELS = [
  {
    label: "Email",
    href: `mailto:${siteConfig.links.email}`,
    value: siteConfig.links.email,
  },
  {
    label: "LinkedIn",
    href: siteConfig.links.linkedin,
    value: "/in/ethan-stuart",
  },
  {
    label: "Substack",
    href: siteConfig.links.substack,
    value: "thedataproductagent",
  },
  { label: "GitHub", href: siteConfig.links.github, value: "ethancstuart" },
];

export default function ContactPage() {
  return (
    <div className="wrap">
      <div className="pb-[clamp(28px,4vw,44px)] pt-[clamp(44px,6vw,78px)]">
        <span className="eyebrow mb-5 block">Contact</span>
        <h1 className="mb-5 max-w-[22ch] font-display text-[clamp(28px,4vw,46px)] leading-[1.14] tracking-[-0.017em]">
          Open to Director and VP roles in AI product leadership.
        </h1>
        <p className="max-w-[58ch] text-[17px] leading-[1.6] text-ink-soft">
          Teams building where data and AI actually become products — and where
          the person leading it is expected to understand what&apos;s underneath.
          Also reachable for builder collaboration, advisory, and introductions.
        </p>
      </div>

      <ul className="ledger max-w-[720px]">
        {CHANNELS.map((c) => (
          <li key={c.label}>
            <a
              href={c.href}
              target={c.href.startsWith("http") ? "_blank" : undefined}
              rel="noopener noreferrer"
              className="grid grid-cols-[110px_minmax(0,1fr)_24px] items-baseline gap-6 py-5 no-underline transition-colors hover:bg-ground-sunk"
            >
              <span className="font-mono text-[10.5px] uppercase tracking-[0.13em] text-ink-faint">
                {c.label}
              </span>
              <span className="text-[16px]">{c.value}</span>
              <span aria-hidden="true" className="text-right text-ink-faint">
                ↗
              </span>
            </a>
          </li>
        ))}
      </ul>

      <div className="h-[clamp(44px,6vw,72px)]" />
    </div>
  );
}
