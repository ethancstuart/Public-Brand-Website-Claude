import Link from "next/link";

export default function NotFound() {
  return (
    <div className="wrap flex min-h-[60vh] flex-col justify-center py-20">
      <span className="eyebrow mb-4">404</span>
      <h1 className="mb-4 max-w-[20ch] font-display text-[clamp(28px,4vw,44px)] leading-[1.15] tracking-[-0.017em]">
        That page isn&apos;t in the register.
      </h1>
      <p className="mb-7 max-w-[52ch] text-[16px] text-ink-soft">
        It may have been renamed or removed. The current work is all listed on
        the portfolio page.
      </p>
      <div className="flex flex-wrap gap-7">
        <Link href="/" className="cta">Home</Link>
        <Link href="/portfolio" className="cta">Selected work</Link>
      </div>
    </div>
  );
}
