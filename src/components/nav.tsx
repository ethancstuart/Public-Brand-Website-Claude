import Link from "next/link";

const LINKS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/writing", label: "Writing" },
];

export function Nav() {
  return (
    <header className="sticky top-0 z-10 border-b border-rule bg-ground">
      <div className="wrap flex items-baseline justify-between gap-6 py-[15px]">
        <Link
          href="/"
          className="font-mono text-[12.5px] font-medium uppercase tracking-[0.09em] no-underline"
        >
          Ethan&nbsp;Stuart
        </Link>
        <nav className="flex gap-[22px]">
          {LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="border-b border-transparent pb-0.5 font-mono text-[11.5px] uppercase tracking-[0.07em] text-ink-soft no-underline hover:border-accent hover:text-ink"
            >
              {l.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
