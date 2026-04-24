"use client";

import { Download } from "lucide-react";

export function DownloadMenu() {
  return (
    <a
      href="/resume.md"
      download
      className="inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-2.5 text-sm font-medium text-background transition-all hover:opacity-90 print-hide"
    >
      <Download className="h-4 w-4" />
      Download Resume
    </a>
  );
}
