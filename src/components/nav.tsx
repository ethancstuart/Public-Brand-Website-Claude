"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
const links = [
  { href: "/#work", label: "Projects", active: "/portfolio" },
  { href: "/leadership", label: "Leadership", active: "/leadership" },
  { href: "/writing", label: "Writing", active: "/writing" },
  { href: "/about", label: "About", active: "/about" },
  { href: "/contact", label: "Get in touch", active: "/contact" },
];
export function Nav() {
  const pathname = usePathname();
  return <header className="brand-header shell-wrap">
    <Link className="brand-wordmark" href="/">Ethan Stuart</Link>
    <nav aria-label="Main navigation">{links.map(link => <Link key={link.label} href={link.href} aria-current={pathname.startsWith(link.active) ? "page" : undefined}>{link.label}</Link>)}</nav>
  </header>;
}
