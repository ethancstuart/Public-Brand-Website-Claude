"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { PROJECTS, siteConfig } from "@/lib/constants";

interface Entry {
  group: string;
  label: string;
  hint: string;
  keywords: string;
  action: { type: "route"; href: string } | { type: "external"; href: string };
}

const ENTRIES: Entry[] = [
  { group: "Pages", label: "Home", hint: "/", keywords: "index register", action: { type: "route", href: "/" } },
  { group: "Pages", label: "About", hint: "/about", keywords: "bio narrative", action: { type: "route", href: "/about" } },
  { group: "Pages", label: "Portfolio", hint: "/portfolio", keywords: "work products register", action: { type: "route", href: "/portfolio" } },
  { group: "Pages", label: "Writing", hint: "/writing", keywords: "newsletter substack posts", action: { type: "route", href: "/writing" } },
  { group: "Pages", label: "Resume", hint: "/resume", keywords: "cv career experience", action: { type: "route", href: "/resume" } },
  { group: "Pages", label: "Contact", hint: "/contact", keywords: "email reach", action: { type: "route", href: "/contact" } },
  ...PROJECTS.map((p) => ({
    group: "Products",
    label: p.name,
    hint: p.kind,
    keywords: `${p.slug} ${p.formerly ?? ""} ${p.kind}`,
    action: { type: "route" as const, href: `/portfolio/${p.slug}` },
  })),
  { group: "Actions", label: "Download resume PDF", hint: "PDF", keywords: "cv download", action: { type: "external", href: "/resume.pdf" } },
  { group: "Actions", label: "Email Ethan", hint: "mailto", keywords: "contact reach out", action: { type: "external", href: `mailto:${siteConfig.links.email}` } },
  { group: "Actions", label: "LinkedIn", hint: "↗", keywords: "social profile", action: { type: "external", href: siteConfig.links.linkedin } },
  { group: "Actions", label: "GitHub", hint: "↗", keywords: "code repos", action: { type: "external", href: siteConfig.links.github } },
  { group: "Actions", label: "The Data Product Agent", hint: "↗", keywords: "substack newsletter subscribe", action: { type: "external", href: siteConfig.links.substack } },
];

export function CommandPalette() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return ENTRIES;
    return ENTRIES.filter((e) =>
      `${e.label} ${e.keywords} ${e.group}`.toLowerCase().includes(q)
    );
  }, [query]);

  const close = useCallback(() => {
    setOpen(false);
    setQuery("");
    setActive(0);
  }, []);

  const run = useCallback(
    (e: Entry) => {
      close();
      if (e.action.type === "route") router.push(e.action.href);
      else window.open(e.action.href, e.action.href.startsWith("mailto") ? "_self" : "_blank", "noopener");
    },
    [close, router]
  );

  useEffect(() => {
    const onKey = (ev: KeyboardEvent) => {
      if ((ev.metaKey || ev.ctrlKey) && ev.key.toLowerCase() === "k") {
        ev.preventDefault();
        setOpen((o) => !o);
      } else if (ev.key === "Escape" && open) {
        close();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, close]);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  useEffect(() => {
    listRef.current
      ?.querySelector(`[data-index="${active}"]`)
      ?.scrollIntoView({ block: "nearest" });
  }, [active]);

  if (!open) return null;

  return (
    <div
      className="palette-backdrop"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) close();
      }}
    >
      <div className="palette" role="dialog" aria-modal="true" aria-label="Command palette">
        <input
          ref={inputRef}
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setActive(0);
          }}
          placeholder="Where to?"
          aria-label="Search pages, products and actions"
          onKeyDown={(e) => {
            if (e.key === "ArrowDown") {
              e.preventDefault();
              setActive((a) => Math.min(a + 1, results.length - 1));
            } else if (e.key === "ArrowUp") {
              e.preventDefault();
              setActive((a) => Math.max(a - 1, 0));
            } else if (e.key === "Enter" && results[active]) {
              e.preventDefault();
              run(results[active]);
            }
          }}
        />
        <div className="palette-list" ref={listRef} role="listbox">
          {results.length === 0 && (
            <div className="palette-empty">Nothing in the register matches.</div>
          )}
          {results.map((e, i) => {
            const showGroup = i === 0 || results[i - 1].group !== e.group;
            return (
              <div key={`${e.group}-${e.label}`}>
                {showGroup && <div className="palette-group">{e.group}</div>}
                <button
                  className="palette-item"
                  data-active={i === active}
                  data-index={i}
                  role="option"
                  aria-selected={i === active}
                  onMouseEnter={() => setActive(i)}
                  onClick={() => run(e)}
                >
                  <span>{e.label}</span>
                  <span className="hint">{e.hint}</span>
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
