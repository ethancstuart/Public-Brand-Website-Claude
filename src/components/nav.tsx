"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const LINKS = [
  { href: "/portfolio", label: "Work" },
  { href: "/writing",   label: "Writing" },
  { href: "/about",     label: "About" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 inset-x-0 z-50 flex items-center justify-between px-6 md:px-12 h-16 transition-colors ${
        scrolled
          ? "bg-[rgba(6,6,8,0.92)] backdrop-blur-md border-b border-[var(--color-rule)]"
          : "bg-transparent"
      }`}
    >
      <Link
        href="/"
        className="font-[family-name:var(--font-syne)] font-extrabold text-[11px] tracking-[0.22em] text-[var(--color-paper-mid)] hover:text-[var(--color-paper)] transition-colors"
      >
        ETHAN STUART
      </Link>

      <ul className="hidden md:flex items-center gap-8">
        {LINKS.map((l) => (
          <li key={l.href}>
            <Link
              href={l.href}
              className="font-[family-name:var(--font-dm-mono)] text-[9px] tracking-[0.2em] uppercase text-[var(--color-paper-low)] hover:text-[var(--color-paper)] transition-colors"
            >
              {l.label}
            </Link>
          </li>
        ))}
      </ul>

      <div className="flex items-center gap-2.5">
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full rounded-full bg-[var(--color-arctic)] opacity-50 animate-ping" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--color-arctic)]" />
        </span>
        <span className="font-[family-name:var(--font-dm-mono)] text-[9px] tracking-[0.18em] uppercase text-[var(--color-paper-mid)]">
          Open to conversation
        </span>
      </div>
    </nav>
  );
}
