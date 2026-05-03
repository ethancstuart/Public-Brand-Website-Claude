const ITEMS = [
  { text: "NexusWatch — Geopolitical Intelligence", color: "var(--color-arctic)" },
  { text: "·" },
  { text: "The Composer — Multi-Agent Editorial", color: "var(--color-indigo)" },
  { text: "·" },
  { text: "Product OS — Spec-as-code" },
  { text: "·" },
  { text: "Zero to Ship — AI Course Platform" },
  { text: "·" },
  { text: "Senior Manager · Disney — Stuart Ventures" },
  { text: "·" },
];

// Doubled for seamless loop
const TRACK = [...ITEMS, ...ITEMS];

export function BottomMarquee() {
  return (
    <div
      className="fixed bottom-0 inset-x-0 z-40 border-t border-[var(--color-rule)] py-2.5 overflow-hidden bg-[rgba(6,6,8,0.9)] backdrop-blur-md"
      aria-hidden="true"
    >
      <div className="flex whitespace-nowrap animate-[marquee_35s_linear_infinite]">
        {TRACK.map((item, i) => (
          <span
            key={i}
            className="font-[family-name:var(--font-dm-mono)] text-[9px] tracking-[0.2em] uppercase px-10"
            style={{ color: item.color ?? "rgba(216,212,204,0.14)" }}
          >
            {item.text}
          </span>
        ))}
      </div>

      <style jsx>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        @media (prefers-reduced-motion: reduce) {
          div > div { animation: none !important; }
        }
      `}</style>
    </div>
  );
}
