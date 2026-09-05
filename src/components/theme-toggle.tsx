"use client";

import { useSyncExternalStore } from "react";

type Mode = "system" | "light" | "dark";
const ORDER: Mode[] = ["system", "light", "dark"];

// localStorage is an external system, so the mode is read through
// useSyncExternalStore: no setState-in-effect, and hydration renders the
// server snapshot ("system") before settling on the stored value.
const EVENT = "themechange";

function subscribe(cb: () => void) {
  window.addEventListener("storage", cb);
  window.addEventListener(EVENT, cb);
  return () => {
    window.removeEventListener("storage", cb);
    window.removeEventListener(EVENT, cb);
  };
}

function getSnapshot(): Mode {
  try {
    const t = localStorage.getItem("theme");
    if (t === "light" || t === "dark") return t;
  } catch {}
  return "system";
}

export function ThemeToggle() {
  const mode = useSyncExternalStore(subscribe, getSnapshot, () => "system" as Mode);

  const cycle = () => {
    const next = ORDER[(ORDER.indexOf(mode) + 1) % ORDER.length];
    try {
      if (next === "system") {
        localStorage.removeItem("theme");
        delete document.documentElement.dataset.theme;
      } else {
        localStorage.setItem("theme", next);
        document.documentElement.dataset.theme = next;
      }
      window.dispatchEvent(new Event(EVENT));
    } catch {}
  };

  return (
    <button
      onClick={cycle}
      aria-label={`Theme: ${mode}. Activate to change.`}
      className="cursor-pointer border-0 bg-transparent p-0 font-mono text-[10.5px] uppercase tracking-[0.1em] text-ink-faint hover:text-ink"
    >
      {mode === "system" ? "auto" : mode}
    </button>
  );
}
