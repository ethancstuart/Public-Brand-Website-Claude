const TICKER_ITEMS = [
  "Data Platforms",
  "AI Systems",
  "Product Leadership",
  "NexusWatch",
  "Meridian Intelligence",
  "Zero to Ship",
  "Quant Engine",
  "RidgeCap",
  "Disney Studios Technology",
  "The Data Product Agent",
];

export function Ticker() {
  return (
    <div
      className="w-full overflow-hidden"
      style={{
        height: "36px",
        borderTop: "1px solid var(--border)",
        borderBottom: "1px solid var(--border)",
        background: "var(--surface)",
      }}
    >
      <div
        className="flex h-full items-center"
        style={{
          width: "max-content",
          animation: "marquee 28s linear infinite",
        }}
      >
        {[0, 1].map((copy) => (
          <span key={copy} className="flex items-center">
            {TICKER_ITEMS.map((item, i) => (
              <span key={`${copy}-${i}`} className="flex items-center">
                <span
                  className="font-mono uppercase"
                  style={{
                    fontSize: "9px",
                    letterSpacing: "0.15em",
                    color: "var(--muted-foreground)",
                    padding: "0 32px",
                  }}
                >
                  {item}
                </span>
                {i < TICKER_ITEMS.length - 1 && (
                  <span
                    className="font-mono"
                    style={{
                      fontSize: "9px",
                      color: "var(--accent)",
                      opacity: 0.4,
                    }}
                  >
                    ·
                  </span>
                )}
              </span>
            ))}
          </span>
        ))}
      </div>
    </div>
  );
}
