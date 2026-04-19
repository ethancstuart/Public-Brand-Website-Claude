import Link from "next/link";
import { siteConfig, navLinks } from "@/lib/constants";

export function Footer() {
  return (
    <footer
      style={{
        borderTop: "1px solid var(--border)",
        background: "var(--surface)",
      }}
    >
      <div
        className="mx-auto"
        style={{ maxWidth: "1280px", padding: "40px 56px" }}
      >
        {/* Row 1: logo + nav + social */}
        <div className="flex items-center justify-between" style={{ marginBottom: "20px" }}>
          <Link
            href="/"
            className="font-serif italic transition-opacity hover:opacity-70"
            style={{ fontSize: "18px", color: "var(--foreground)" }}
          >
            Ethan Stuart
          </Link>

          <div className="flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="font-mono uppercase transition-opacity hover:opacity-70"
                style={{ fontSize: "9px", letterSpacing: "0.16em", color: "var(--muted-foreground)" }}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-6">
            {[
              { href: siteConfig.links.github, label: "GitHub" },
              { href: siteConfig.links.twitter, label: "X" },
              { href: siteConfig.links.linkedin, label: "LinkedIn" },
            ].map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono uppercase transition-opacity hover:opacity-70"
                style={{ fontSize: "9px", letterSpacing: "0.16em", color: "var(--muted-foreground)" }}
              >
                {social.label}
              </a>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div style={{ height: "1px", background: "var(--border)", marginBottom: "20px" }} />

        {/* Row 2: copyright */}
        <div className="flex items-center justify-between">
          <p
            className="font-mono"
            style={{ fontSize: "9px", letterSpacing: "0.1em", color: "var(--muted-foreground)" }}
          >
            &copy; {new Date().getFullYear()} Ethan Stuart
          </p>
          <div className="flex items-center gap-6">
            <a
              href={siteConfig.links.substack}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono uppercase transition-opacity hover:opacity-70"
              style={{ fontSize: "9px", letterSpacing: "0.1em", color: "var(--accent)" }}
            >
              The Data Product Agent →
            </a>
            <p
              className="font-mono"
              style={{ fontSize: "9px", letterSpacing: "0.1em", color: "var(--muted-foreground)" }}
            >
              Built with Next.js
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
