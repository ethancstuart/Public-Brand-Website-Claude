import Link from "next/link";

const SOCIALS = [
  { href: "https://www.linkedin.com/in/ethancstuart", label: "LinkedIn" },
  { href: "https://thedataproductagent.substack.com",  label: "Substack" },
  { href: "https://github.com/ethancstuart",           label: "GitHub"   },
];

export function Footer() {
  return (
    <footer className="border-t border-[var(--color-rule)] mt-32">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-10 flex items-center justify-between gap-6 flex-wrap">
        <Link
          href="/"
          className="font-[family-name:var(--font-syne)] font-extrabold text-[11px] tracking-[0.22em] text-[var(--color-paper-low)] hover:text-[var(--color-paper)] transition-colors"
        >
          ES
        </Link>

        <ul className="flex gap-6">
          {SOCIALS.map((s) => (
            <li key={s.href}>
              <a
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="font-[family-name:var(--font-dm-mono)] text-[9px] tracking-[0.18em] uppercase text-[var(--color-paper-low)] hover:text-[var(--color-paper)] transition-colors"
              >
                {s.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="font-[family-name:var(--font-dm-mono)] text-[9px] tracking-[0.12em] uppercase text-[rgba(216,212,204,0.08)]">
          © 2026 Ethan Stuart · Built with Next.js
        </div>
      </div>
    </footer>
  );
}
