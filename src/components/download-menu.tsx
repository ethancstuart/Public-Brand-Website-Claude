"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronDown, Download, FileText } from "lucide-react";

interface DownloadMenuProps {
  variant?: string;
}

export function DownloadMenu({ variant }: DownloadMenuProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const pdfUrl = variant
    ? `/api/resume?variant=${encodeURIComponent(variant)}`
    : "/api/resume";

  const mdUrl = variant
    ? `/resume-${variant}.md`
    : "/resume.md";

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-2.5 text-sm font-medium text-background transition-all hover:opacity-90"
      >
        <Download className="h-4 w-4" />
        Download
        <ChevronDown
          className={`h-3.5 w-3.5 transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <div className="absolute right-0 top-full z-10 mt-2 w-44 overflow-hidden rounded-xl border border-border bg-card shadow-lg">
          <a
            href={pdfUrl}
            onClick={() => setOpen(false)}
            className="flex items-center gap-3 px-4 py-3 text-sm transition-colors hover:bg-muted"
          >
            <Download className="h-4 w-4 text-muted-foreground" />
            PDF
          </a>
          <a
            href={mdUrl}
            download
            onClick={() => setOpen(false)}
            className="flex items-center gap-3 px-4 py-3 text-sm transition-colors hover:bg-muted"
          >
            <FileText className="h-4 w-4 text-muted-foreground" />
            Markdown
          </a>
        </div>
      )}
    </div>
  );
}
