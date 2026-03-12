import { NextResponse } from "next/server";
import { jsPDF } from "jspdf";
import { getResumeMarkdown } from "@/lib/resume";

export async function GET() {
  const md = await getResumeMarkdown();

  const doc = new jsPDF({ unit: "pt", format: "letter" });
  const pageWidth = doc.internal.pageSize.getWidth();
  const marginLeft = 50;
  const marginRight = 50;
  const contentWidth = pageWidth - marginLeft - marginRight;
  let y = 50;

  const lines = md.split("\n");
  let i = 0;

  function checkPage(needed: number) {
    if (y + needed > doc.internal.pageSize.getHeight() - 50) {
      doc.addPage();
      y = 50;
    }
  }

  // --- Name ---
  const name = lines[i++] || "";
  doc.setFont("helvetica", "bold");
  doc.setFontSize(20);
  doc.text(name, pageWidth / 2, y, { align: "center" });
  y += 22;

  // --- Contact line ---
  const contact = lines[i++] || "";
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  doc.setTextColor(100);
  doc.text(contact.trim(), pageWidth / 2, y, { align: "center" });
  doc.setTextColor(0);
  y += 16;
  i++; // blank line

  // --- Parse remaining sections ---
  while (i < lines.length) {
    const line = lines[i];

    // Skip blank lines
    if (!line.trim()) {
      i++;
      continue;
    }

    // Section header (ALL CAPS)
    if (isAllCaps(line.trim()) && line.trim().length > 2) {
      checkPage(30);
      y += 8;
      // Draw rule
      doc.setDrawColor(200);
      doc.setLineWidth(0.5);
      doc.line(marginLeft, y, pageWidth - marginRight, y);
      y += 10;
      doc.setFont("helvetica", "bold");
      doc.setFontSize(10);
      doc.setTextColor(30);
      doc.text(line.trim(), marginLeft, y);
      doc.setTextColor(0);
      y += 14;
      i++;
      continue;
    }

    // Company + unit line (next line has a tab = role title)
    if (i + 1 < lines.length && lines[i + 1]?.includes("\t")) {
      checkPage(20);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(10);
      doc.text(line.trim(), marginLeft, y);
      y += 14;
      i++;
      continue;
    }

    // Role title + date (tab-separated)
    if (line.includes("\t")) {
      checkPage(18);
      const parts = line.split("\t").filter(Boolean);
      const title = parts[0]?.trim() || "";
      const period = parts[parts.length - 1]?.trim() || "";

      doc.setFont("helvetica", "bold");
      doc.setFontSize(9);
      doc.setTextColor(50);
      doc.text(title, marginLeft, y);
      doc.setFont("helvetica", "normal");
      doc.setFontSize(8);
      doc.setTextColor(100);
      doc.text(period, pageWidth - marginRight, y, { align: "right" });
      doc.setTextColor(0);
      y += 13;
      i++;
      continue;
    }

    // Competency lines (category: skills | skills | ...)
    if (line.includes(": ") && line.includes(" | ")) {
      checkPage(24);
      const colonIdx = line.indexOf(": ");
      const category = line.slice(0, colonIdx).trim();
      const skills = line.slice(colonIdx + 2).trim();

      doc.setFont("helvetica", "bold");
      doc.setFontSize(8);
      const catWidth = doc.getTextWidth(category + ": ");
      doc.text(category + ": ", marginLeft, y);

      doc.setFont("helvetica", "normal");
      doc.setTextColor(70);
      const skillLines = doc.splitTextToSize(
        skills,
        contentWidth - catWidth
      );
      if (skillLines.length === 1) {
        doc.text(skills, marginLeft + catWidth, y);
        y += 11;
      } else {
        // Wrap: first part on same line, rest below
        const allLines = doc.splitTextToSize(skills, contentWidth - 8);
        doc.text(allLines[0], marginLeft + catWidth, y);
        y += 11;
        for (let j = 1; j < allLines.length; j++) {
          doc.text(allLines[j], marginLeft + 8, y);
          y += 10;
        }
      }
      doc.setTextColor(0);
      i++;
      continue;
    }

    // Lines with em-dash (portfolio items, education details)
    if (
      line.includes(" — ") &&
      !isAllCaps(line.trim()) &&
      !line.includes("\t")
    ) {
      checkPage(18);
      const dashIdx = line.indexOf(" — ");
      const label = line.slice(0, dashIdx).trim();
      const desc = line.slice(dashIdx + 3).trim();

      doc.setFont("helvetica", "bold");
      doc.setFontSize(8.5);
      const labelW = doc.getTextWidth(label + " — ");
      doc.text(label + " — ", marginLeft, y);
      doc.setFont("helvetica", "normal");
      doc.setTextColor(70);
      const descLines = doc.splitTextToSize(desc, contentWidth - labelW);
      doc.text(descLines[0], marginLeft + labelW, y);
      y += 12;
      for (let j = 1; j < descLines.length; j++) {
        doc.text(descLines[j], marginLeft + 8, y);
        y += 11;
      }
      doc.setTextColor(0);
      i++;
      continue;
    }

    // Italic note (e.g. "Previously held...")
    if (line.startsWith("Previously")) {
      checkPage(16);
      doc.setFont("helvetica", "italic");
      doc.setFontSize(8.5);
      doc.setTextColor(100);
      doc.text(line.trim(), marginLeft, y);
      doc.setTextColor(0);
      y += 14;
      i++;
      continue;
    }

    // Default: bullet / body text
    checkPage(14);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8.5);
    doc.setTextColor(50);
    const wrapped = doc.splitTextToSize(line.trim(), contentWidth - 12);
    for (const wl of wrapped) {
      checkPage(12);
      doc.text(wl, marginLeft + 8, y);
      y += 11;
    }
    doc.setTextColor(0);
    y += 2;
    i++;
  }

  const pdfBuffer = Buffer.from(doc.output("arraybuffer"));

  return new NextResponse(pdfBuffer, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="Ethan_Stuart_Resume.pdf"`,
      "Cache-Control": "public, max-age=3600",
    },
  });
}

function isAllCaps(s: string): boolean {
  return s === s.toUpperCase() && /[A-Z]/.test(s);
}
