import { siteConfig } from "@/lib/constants";

const SOCIALS = [
  { href: siteConfig.links.linkedin, label: "LinkedIn" },
  { href: siteConfig.links.github, label: "GitHub" },
  { href: siteConfig.links.substack, label: "Substack" },
];

export function Footer() {
  return (
    <footer className="border-t border-rule">
      <div className="wrap flex flex-wrap justify-between gap-[18px] pb-10 pt-[22px] font-mono text-[11px] text-ink-faint">
        <span>© {new Date().getFullYear()} Ethan Stuart</span>
        <span className="flex gap-2">
          {SOCIALS.map((s, i) => (
            <span key={s.href}>
              <a
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="no-underline hover:text-accent"
              >
                {s.label}
              </a>
              {i < SOCIALS.length - 1 && <span aria-hidden="true"> ·</span>}
            </span>
          ))}
        </span>
      </div>
    </footer>
  );
}
