"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { navLinks } from "@/lib/constants";

export function Nav() {
  const pathname = usePathname();

  return (
    <header
      className="fixed top-0 z-50 w-full"
      style={{
        height: "64px",
        background: "rgba(242,237,227,0.92)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        borderBottom: "1px solid var(--border-lo)",
      }}
    >
      <nav
        className="mx-auto flex h-full items-center justify-between"
        style={{ maxWidth: "1280px", padding: "0 56px" }}
      >
        <Link
          href="/"
          className="font-serif italic transition-opacity hover:opacity-70"
          style={{ fontSize: "19px", color: "var(--foreground)" }}
        >
          Ethan Stuart
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="font-mono transition-colors"
              style={{
                fontSize: "10px",
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: pathname === link.href ? "var(--foreground)" : "var(--muted-foreground)",
              }}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <Link
          href="/contact"
          className="hidden items-center gap-2 md:flex transition-opacity hover:opacity-70"
        >
          <span className="relative flex h-2 w-2">
            <span
              className="absolute inline-flex h-full w-full rounded-full"
              style={{
                background: "var(--accent)",
                opacity: 0.6,
                animation: "pulse-dot 3s ease-in-out infinite",
              }}
            />
            <span
              className="relative inline-flex h-2 w-2 rounded-full"
              style={{ background: "var(--accent)" }}
            />
          </span>
          <span
            className="font-mono"
            style={{
              fontSize: "10px",
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "var(--muted-foreground)",
            }}
          >
            Open to conversation
          </span>
        </Link>

        {/* Mobile: just contact dot */}
        <Link
          href="/contact"
          className="flex items-center gap-2 md:hidden"
          aria-label="Contact"
        >
          <span className="relative flex h-2 w-2">
            <span
              className="absolute inline-flex h-full w-full rounded-full"
              style={{
                background: "var(--accent)",
                opacity: 0.6,
                animation: "pulse-dot 3s ease-in-out infinite",
              }}
            />
            <span
              className="relative inline-flex h-2 w-2 rounded-full"
              style={{ background: "var(--accent)" }}
            />
          </span>
        </Link>
      </nav>
    </header>
  );
}
