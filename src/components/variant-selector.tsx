"use client";

import { useRouter, useSearchParams } from "next/navigation";

const variants = [
  { value: "", label: "General" },
  { value: "ai-product", label: "AI Product" },
  { value: "data-platform", label: "Data Platform" },
  { value: "internal", label: "Internal" },
] as const;

export function VariantSelector() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const current = searchParams.get("variant") || "";

  function handleSelect(variant: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (variant) {
      params.set("variant", variant);
    } else {
      params.delete("variant");
    }
    router.push(`/resume?${params.toString()}`);
  }

  return (
    <div className="flex flex-wrap gap-2">
      {variants.map((v) => (
        <button
          key={v.value}
          onClick={() => handleSelect(v.value)}
          className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
            current === v.value
              ? "bg-foreground text-background"
              : "border border-border text-muted-foreground hover:bg-muted hover:text-foreground"
          }`}
        >
          {v.label}
        </button>
      ))}
    </div>
  );
}
