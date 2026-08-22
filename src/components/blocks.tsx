import { METHOD, RECORD, STRIP, TRACK } from "@/lib/constants";

/** The four-cell standing facts under the hero. */
export function Strip() {
  return (
    <dl className="grid grid-cols-4 border-y border-rule max-[760px]:grid-cols-2">
      {STRIP.map((s, i) => (
        <div
          key={s.term}
          className={[
            "border-r border-rule py-5 pr-[22px]",
            i > 0 && "pl-[22px]",
            "last:border-r-0",
            "max-[760px]:border-b max-[760px]:[&:nth-child(2n)]:border-r-0",
            "max-[760px]:[&:nth-child(n+3)]:border-b-0 max-[760px]:[&:nth-child(3)]:pl-0",
          ]
            .filter(Boolean)
            .join(" ")}
        >
          <dt className="mb-[7px] font-mono text-[10.5px] uppercase tracking-[0.13em] text-ink-faint">
            {s.term}
          </dt>
          <dd
            className={`m-0 text-[14px] leading-[1.45] ${
              s.open ? "font-medium text-accent" : ""
            }`}
          >
            {s.value}
          </dd>
        </div>
      ))}
    </dl>
  );
}

/** How the work gets made — three columns, no decorative numbering. */
export function Method() {
  return (
    <div className="cols cols-3">
      {METHOD.map((m) => (
        <div key={m.n}>
          <p className="mb-3 font-mono text-[10.5px] uppercase tracking-[0.13em] text-accent">
            {m.n}
          </p>
          <h3 className="mb-2.5 font-display text-[20px] leading-[1.25] tracking-[-0.012em]">
            {m.title}
          </h3>
          <p className="text-[14px] leading-[1.6] text-ink-soft">{m.body}</p>
        </div>
      ))}
    </div>
  );
}

/** Operating record. Each figure carries the method that produced it. */
export function OperatingRecord() {
  return (
    <div className="cols cols-4">
      {RECORD.map((r) => (
        <div key={r.label}>
          <p className="tnum mb-3 font-display text-[clamp(34px,4vw,46px)] leading-none tracking-[-0.03em]">
            {r.fig}
          </p>
          <p className="mb-[7px] text-[14px] font-medium leading-[1.4]">
            {r.label}
          </p>
          <p className="font-mono text-[10.5px] leading-[1.55] text-ink-faint">
            {r.src}
          </p>
        </div>
      ))}
    </div>
  );
}

/** Career track as a tabular ledger — years, org, role. */
export function Track() {
  return (
    <div className="ledger tnum">
      {TRACK.map((t) => (
        <div
          key={t.org}
          className="grid grid-cols-[122px_minmax(150px,1fr)_minmax(0,1.5fr)] items-baseline gap-x-7 gap-y-2 py-4 max-[680px]:grid-cols-1 max-[680px]:gap-y-0.5"
        >
          <span
            className={`font-mono text-[12px] ${
              t.now ? "text-accent" : "text-ink-faint"
            }`}
          >
            {t.years}
          </span>
          <span
            className={`text-[15.5px] font-medium ${t.now ? "text-accent" : ""}`}
          >
            {t.org}
          </span>
          <span className="text-[14.5px] text-ink-soft">{t.role}</span>
        </div>
      ))}
    </div>
  );
}
