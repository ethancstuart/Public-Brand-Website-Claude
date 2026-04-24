import { readFile } from "fs/promises";
import { join } from "path";
import { isAllCaps } from "@/lib/utils";

export async function getResumeMarkdown(): Promise<string> {
  return await readFile(
    join(process.cwd(), "public", "resume.md"),
    "utf-8"
  );
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

export function parseResumeMarkdown(md: string): ParsedResume {
  const lines = md.split("\n");
  const name = lines[0]?.trim() || "";
  const contact = lines[1]?.trim() || "";

  const sections: ParsedSection[] = [];
  let currentSection: ParsedSection | null = null;
  let currentCompany: Extract<ParsedSectionContent, { type: "company" }> | null =
    null;
  let currentRole: ParsedRole | null = null;
  let justSawBlank = false;

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
    if (!line.trim()) {
      justSawBlank = true;
      continue;
    }

    // Section header (all caps)
    if (isAllCaps(line.trim()) && line.trim().length > 2) {
      flushCompany();
      currentSection = { title: line.trim(), content: [] };
      sections.push(currentSection);
      justSawBlank = false;
      continue;
    }

    if (!currentSection) continue;

    // Role line (tab-separated) — new role under the current company
    if (line.includes("\t")) {
      flushRole();
      const parts = line.split("\t").filter(Boolean);
      currentRole = {
        title: parts[0]?.trim() || "",
        period: parts[parts.length - 1]?.trim() || "",
        bullets: [],
      };
      justSawBlank = false;
      continue;
    }

    // Company line — only when preceded by a blank line AND followed by a role (tab) line.
    // The blank-line requirement prevents mid-role bullets from being mistaken for companies.
    if (
      justSawBlank &&
      i + 1 < lines.length &&
      lines[i + 1]?.includes("\t")
    ) {
      flushCompany();
      currentCompany = { type: "company", name: line.trim(), roles: [] };
      justSawBlank = false;
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
      justSawBlank = false;
      continue;
    }

    // Bullet under a role — takes precedence so em-dashes in role bullets stay with the role
    if (currentRole) {
      currentRole.bullets.push(line.trim());
      justSawBlank = false;
      continue;
    }

    // Item with em-dash (only when not inside a role)
    if (line.includes(" — ") && !isAllCaps(line.trim())) {
      const dashIdx = line.indexOf(" — ");
      currentSection.content.push({
        type: "item",
        label: line.slice(0, dashIdx).trim(),
        description: line.slice(dashIdx + 3).trim(),
      });
      justSawBlank = false;
      continue;
    }

    // Default text
    currentSection.content.push({ type: "text", value: line.trim() });
    justSawBlank = false;
  }

  flushCompany();

  return { name, contact, sections };
}
