"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

interface FaqItem {
  readonly question: string;
  readonly answer: string;
}

interface FaqAccordionProps {
  items: readonly FaqItem[];
}

export function FaqAccordion({ items }: FaqAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="space-y-3">
      {items.map((item, i) => (
        <div
          key={i}
          className="rounded-xl border border-border bg-card overflow-hidden"
        >
          <button
            onClick={() => setOpenIndex(openIndex === i ? null : i)}
            className="flex w-full items-center justify-between p-5 text-left text-sm font-semibold transition-colors hover:bg-muted"
          >
            {item.question}
            <ChevronDown
              className={`h-4 w-4 shrink-0 text-muted-foreground transition-transform ${
                openIndex === i ? "rotate-180" : ""
              }`}
            />
          </button>
          {openIndex === i && (
            <div className="px-5 pb-5 text-sm leading-relaxed text-muted-foreground">
              {item.answer}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
