"use client";

import { useState } from "react";
import { ArrowRight, Loader2, CheckCircle } from "lucide-react";

export function WaitlistForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;

    setStatus("loading");
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Something went wrong");
      }

      setStatus("success");
      setEmail("");
    } catch (err) {
      setStatus("error");
      setErrorMessage(
        err instanceof Error ? err.message : "Something went wrong"
      );
    }
  }

  if (status === "success") {
    return (
      <div className="inline-flex items-center gap-2 rounded-full bg-accent/10 px-5 py-3 text-sm font-medium text-accent">
        <CheckCircle className="h-4 w-4" />
        You&apos;re on the list!
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3 sm:flex-row">
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="you@example.com"
        required
        className="rounded-full border border-border bg-card px-5 py-3 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-accent"
      />
      <button
        type="submit"
        disabled={status === "loading"}
        className="inline-flex items-center justify-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-medium text-accent-foreground transition-all hover:opacity-90 disabled:opacity-70"
      >
        {status === "loading" ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <>
            Join Waitlist
            <ArrowRight className="h-3.5 w-3.5" />
          </>
        )}
      </button>
      {status === "error" && (
        <p className="text-sm text-red-500 sm:self-center">{errorMessage}</p>
      )}
    </form>
  );
}
