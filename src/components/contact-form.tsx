"use client";

import { useState } from "react";
import { Send, Loader2, CheckCircle } from "lucide-react";

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Something went wrong");
      }

      setStatus("success");
      setFormData({ name: "", email: "", message: "" });
    } catch (err) {
      setStatus("error");
      setErrorMessage(
        err instanceof Error ? err.message : "Something went wrong"
      );
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-2xl border border-border bg-card p-8 text-center">
        <CheckCircle className="mx-auto mb-3 h-8 w-8 text-accent" />
        <p className="font-semibold">Message sent!</p>
        <p className="mt-1 text-sm text-muted-foreground">
          I&apos;ll get back to you soon.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 rounded-2xl border border-border bg-card p-6 sm:p-8"
    >
      <div>
        <label
          htmlFor="name"
          className="mb-1.5 block text-sm font-medium"
        >
          Name
        </label>
        <input
          id="name"
          type="text"
          required
          value={formData.name}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, name: e.target.value }))
          }
          className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-accent"
        />
      </div>
      <div>
        <label
          htmlFor="email"
          className="mb-1.5 block text-sm font-medium"
        >
          Email
        </label>
        <input
          id="email"
          type="email"
          required
          value={formData.email}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, email: e.target.value }))
          }
          className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-accent"
        />
      </div>
      <div>
        <label
          htmlFor="message"
          className="mb-1.5 block text-sm font-medium"
        >
          Message
        </label>
        <textarea
          id="message"
          required
          rows={4}
          value={formData.message}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, message: e.target.value }))
          }
          className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-accent resize-none"
        />
      </div>
      <button
        type="submit"
        disabled={status === "loading"}
        className="inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-2.5 text-sm font-medium text-background transition-all hover:opacity-90 disabled:opacity-70"
      >
        {status === "loading" ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <>
            Send Message
            <Send className="h-3.5 w-3.5" />
          </>
        )}
      </button>
      {status === "error" && (
        <p className="text-sm text-red-500">{errorMessage}</p>
      )}
    </form>
  );
}
