import { readFile } from "fs/promises";
import { join } from "path";

const VALID_VARIANTS = ["base", "ai-product", "data-platform", "internal"] as const;
export type ResumeVariant = (typeof VALID_VARIANTS)[number];

export function isValidVariant(v: string): v is ResumeVariant {
  return (VALID_VARIANTS as readonly string[]).includes(v);
}

export async function getResumeMarkdown(
  variant?: string
): Promise<string> {
  const filename =
    variant && isValidVariant(variant)
      ? `resume-${variant}.md`
      : "resume.md";

  try {
    return await readFile(
      join(process.cwd(), "public", filename),
      "utf-8"
    );
  } catch {
    // Fallback to default resume
    return await readFile(
      join(process.cwd(), "public", "resume.md"),
      "utf-8"
    );
  }
}

export interface ParsedResume {
  name: string;
  contact: string;
  sections: ParsedSection[];
}

export interface ParsedSection {
  title: string;
  content: ParsedSectionContent[];
}

export type ParsedSectionContent =
  | { type: "company"; name: string; roles: ParsedRole[] }
  | { type: "text"; value: string }
  | { type: "competency"; category: string; skills: string }
  | { type: "item"; label: string; description: string };

export interface ParsedRole {
  title: string;
  period: string;
  bullets: string[];
}

function isAllCaps(s: string): boolean {
  return s === s.toUpperCase() && /[A-Z]/.test(s);
}

export function parseResumeMarkdown(md: string): ParsedResume {
  const lines = md.split("\n");
  const name = lines[0]?.trim() || "";
  const contact = lines[1]?.trim() || "";

  const sections: ParsedSection[] = [];
  let currentSection: ParsedSection | null = null;
  let currentCompany: Extract<ParsedSectionContent, { type: "company" }> | null =
    null;
  let currentRole: ParsedRole | null = null;

  function flushRole() {
    if (currentRole && currentCompany) {
      currentCompany.roles.push(currentRole);
      currentRole = null;
    }
  }

  function flushCompany() {
    flushRole();
    if (currentCompany && currentSection) {
      currentSection.content.push(currentCompany);
      currentCompany = null;
    }
  }

  for (let i = 2; i < lines.length; i++) {
    const line = lines[i];
    if (!line.trim()) continue;

    // Section header
    if (isAllCaps(line.trim()) && line.trim().length > 2) {
      flushCompany();
      currentSection = { title: line.trim(), content: [] };
      sections.push(currentSection);
      continue;
    }

    if (!currentSection) continue;

    // Company line (next line has tab = role)
    if (i + 1 < lines.length && lines[i + 1]?.includes("\t")) {
      flushCompany();
      currentCompany = { type: "company", name: line.trim(), roles: [] };
      continue;
    }

    // Role line (tab-separated)
    if (line.includes("\t")) {
      flushRole();
      const parts = line.split("\t").filter(Boolean);
      currentRole = {
        title: parts[0]?.trim() || "",
        period: parts[parts.length - 1]?.trim() || "",
        bullets: [],
      };
      continue;
    }

    // Competency line
    if (line.includes(": ") && line.includes(" | ")) {
      const colonIdx = line.indexOf(": ");
      currentSection.content.push({
        type: "competency",
        category: line.slice(0, colonIdx).trim(),
        skills: line.slice(colonIdx + 2).trim(),
      });
      continue;
    }

    // Item with em-dash
    if (line.includes(" — ") && !isAllCaps(line.trim()) && !line.includes("\t")) {
      const dashIdx = line.indexOf(" — ");
      currentSection.content.push({
        type: "item",
        label: line.slice(0, dashIdx).trim(),
        description: line.slice(dashIdx + 3).trim(),
      });
      continue;
    }

    // Bullet under a role
    if (currentRole) {
      currentRole.bullets.push(line.trim());
      continue;
    }

    // Default text
    currentSection.content.push({ type: "text", value: line.trim() });
  }

  flushCompany();

  return { name, contact, sections };
}
