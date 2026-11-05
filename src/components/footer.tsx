import Link from "next/link";
import { siteConfig } from "@/lib/constants";
export function Footer() {
  return <footer className="brand-footer shell-wrap">
    <span>Ethan Stuart</span>
    <nav aria-label="Professional profiles">
      <Link href="/resume">Résumé</Link>
      <a href={siteConfig.links.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
      <a href={siteConfig.links.github} target="_blank" rel="noopener noreferrer">GitHub</a>
    </nav>
    <a href="#main">Back to top ↑</a>
  </footer>;
}
