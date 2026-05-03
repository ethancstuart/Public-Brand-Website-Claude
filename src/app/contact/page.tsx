import { Section } from "@/components/section";

const CHANNELS = [
  { label: "Email",     href: "mailto:ethan.c.stuart@gmail.com", value: "ethan.c.stuart@gmail.com" },
  { label: "LinkedIn",  href: "https://www.linkedin.com/in/ethancstuart", value: "/in/ethancstuart" },
  { label: "Substack",  href: "https://thedataproductagent.substack.com", value: "thedataproductagent" },
  { label: "GitHub",    href: "https://github.com/ethancstuart", value: "ethancstuart" },
];

export const metadata = {
  title: "Contact — Ethan Stuart",
};

export default function ContactPage() {
  return (
    <Section
      label="CONTACT"
      title="Open to conversation."
      description="Currently open to VP+ data & AI product leadership conversations. Also reachable for builder collaboration, advisory, and friend-of-friend introductions."
    >
      <ul className="border-t border-[var(--color-rule)] max-w-[720px]">
        {CHANNELS.map((c) => (
          <li key={c.label} className="border-b border-[var(--color-rule)] group">
            <a
              href={c.href}
              target={c.href.startsWith("http") ? "_blank" : undefined}
              rel="noopener noreferrer"
              className="grid grid-cols-[120px_1fr_24px] items-center gap-6 py-6 transition-[padding] duration-200 group-hover:pl-4"
            >
              <div className="font-[family-name:var(--font-dm-mono)] text-[10px] tracking-[0.22em] uppercase text-[var(--color-paper-low)]">
                {c.label}
              </div>
              <div className="font-[family-name:var(--font-syne)] text-[18px] text-[var(--color-paper-mid)] group-hover:text-[var(--color-arctic)] transition-colors">
                {c.value}
              </div>
              <div className="text-[var(--color-paper-low)] group-hover:text-[var(--color-arctic)] text-right">
                ↗
              </div>
            </a>
          </li>
        ))}
      </ul>
    </Section>
  );
}
