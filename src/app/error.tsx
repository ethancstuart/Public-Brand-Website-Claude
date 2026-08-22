"use client";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="wrap flex min-h-[60vh] flex-col justify-center py-20">
      <span className="eyebrow mb-4">Error</span>
      <h1 className="mb-4 max-w-[20ch] font-display text-[clamp(28px,4vw,44px)] leading-[1.15] tracking-[-0.017em]">
        Something went wrong.
      </h1>
      <p className="mb-7 max-w-[52ch] text-[16px] text-ink-soft">
        An unexpected error occurred while rendering this page.
      </p>
      <button onClick={reset} className="cta self-start cursor-pointer">
        Try again
      </button>
    </div>
  );
}
