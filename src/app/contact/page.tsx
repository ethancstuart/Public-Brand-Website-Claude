import type { Metadata } from "next";
import { Section } from "@/components/section";
import { siteConfig } from "@/lib/constants";
import { Linkedin, Github, Mail, Newspaper, Twitter } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with Ethan Stuart.",
};

const links = [
  {
    label: "Email",
    href: `mailto:${siteConfig.links.email}`,
    description: "ethan.c.stuart@gmail.com",
    icon: Mail,
    external: false,
  },
  {
    label: "LinkedIn",
    href: siteConfig.links.linkedin,
    description: "linkedin.com/in/ethan-stuart",
    icon: Linkedin,
    external: true,
  },
  {
    label: "Substack",
    href: siteConfig.links.substack,
    description: "The Data Product Agent",
    icon: Newspaper,
    external: true,
  },
  {
    label: "GitHub",
    href: siteConfig.links.github,
    description: "github.com/ethancstuart",
    icon: Github,
    external: true,
  },
  {
    label: "X / Twitter",
    href: siteConfig.links.twitter,
    description: "x.com/ethancstuart",
    icon: Twitter,
    external: true,
  },
];

export default function ContactPage() {
  return (
    <>
      <Section className="pt-24 pb-16">
        <p className="mb-2 font-mono text-xs tracking-widest text-accent uppercase">
          Contact
        </p>
        <h1 className="mb-4 text-4xl font-bold tracking-tight sm:text-5xl">
          Let&apos;s connect.
        </h1>
        <p className="max-w-xl text-lg text-muted-foreground">
          Whether it&apos;s a role, a collaboration, or a conversation about
          what&apos;s next in data and AI — I&apos;d like to hear from you.
        </p>
      </Section>

      <Section className="pb-24">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {links.map((link) => {
            const Icon = link.icon;
            return (
              <a
                key={link.label}
                href={link.href}
                target={link.external ? "_blank" : undefined}
                rel={link.external ? "noopener noreferrer" : undefined}
                className="group rounded-2xl border border-border bg-card p-6 transition-all duration-300 hover:border-accent/30 hover:shadow-lg hover:shadow-accent/5"
              >
                <Icon className="mb-4 h-5 w-5 text-muted-foreground transition-colors group-hover:text-accent" />
                <h3 className="mb-1 text-sm font-semibold">{link.label}</h3>
                <p className="font-mono text-xs text-muted-foreground">
                  {link.description}
                </p>
              </a>
            );
          })}
        </div>
      </Section>
    </>
  );
}
