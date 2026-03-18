import { NextResponse } from "next/server";
import { jsPDF } from "jspdf";
import { getResumeMarkdown, parseResumeMarkdown } from "@/lib/resume";

export async function GET() {
  const md = await getResumeMarkdown();
  const resume = parseResumeMarkdown(md);

  const doc = new jsPDF({ unit: "pt", format: "letter" });
  const pageWidth = doc.internal.pageSize.getWidth();
  const marginLeft = 50;
  const marginRight = 50;
  const contentWidth = pageWidth - marginLeft - marginRight;
  let y = 50;

  function checkPage(needed: number) {
    if (y + needed > doc.internal.pageSize.getHeight() - 50) {
      doc.addPage();
      y = 50;
    }
  }

  // --- Name ---
  doc.setFont("helvetica", "bold");
  doc.setFontSize(20);
  doc.text(resume.name, pageWidth / 2, y, { align: "center" });
  y += 22;

  // --- Contact line ---
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  doc.setTextColor(100);
  doc.text(resume.contact, pageWidth / 2, y, { align: "center" });
  doc.setTextColor(0);
  y += 16;

  // --- Sections ---
  for (const section of resume.sections) {
    // Section header
    checkPage(30);
    y += 8;
    doc.setDrawColor(200);
    doc.setLineWidth(0.5);
    doc.line(marginLeft, y, pageWidth - marginRight, y);
    y += 10;
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    doc.setTextColor(30);
    doc.text(section.title, marginLeft, y);
    doc.setTextColor(0);
    y += 14;

    for (const content of section.content) {
      switch (content.type) {
        case "company": {
          // Company name
          checkPage(20);
          doc.setFont("helvetica", "bold");
          doc.setFontSize(10);
          doc.text(content.name, marginLeft, y);
          y += 14;

          // Roles
          for (const role of content.roles) {
            // Role title + period
            checkPage(18);
            doc.setFont("helvetica", "bold");
            doc.setFontSize(9);
            doc.setTextColor(50);
            doc.text(role.title, marginLeft, y);
            doc.setFont("helvetica", "normal");
            doc.setFontSize(8);
            doc.setTextColor(100);
            doc.text(role.period, pageWidth - marginRight, y, {
              align: "right",
            });
            doc.setTextColor(0);
            y += 13;

            // Bullets
            for (const bullet of role.bullets) {
              if (bullet.startsWith("Previously")) {
                checkPage(16);
                doc.setFont("helvetica", "italic");
                doc.setFontSize(8.5);
                doc.setTextColor(100);
                doc.text(bullet, marginLeft, y);
                doc.setTextColor(0);
                y += 14;
              } else {
                checkPage(14);
                doc.setFont("helvetica", "normal");
                doc.setFontSize(8.5);
                doc.setTextColor(50);
                const wrapped = doc.splitTextToSize(
                  bullet,
                  contentWidth - 12
                );
                for (const wl of wrapped) {
                  checkPage(12);
                  doc.text(wl, marginLeft + 8, y);
                  y += 11;
                }
                doc.setTextColor(0);
                y += 2;
              }
            }
          }
          break;
        }

        case "competency": {
          checkPage(24);
          doc.setFont("helvetica", "bold");
          doc.setFontSize(8);
          const catWidth = doc.getTextWidth(content.category + ": ");
          doc.text(content.category + ": ", marginLeft, y);

          doc.setFont("helvetica", "normal");
          doc.setTextColor(70);
          const skillLines = doc.splitTextToSize(
            content.skills,
            contentWidth - catWidth
          );
          if (skillLines.length === 1) {
            doc.text(content.skills, marginLeft + catWidth, y);
            y += 11;
          } else {
            const allLines = doc.splitTextToSize(
              content.skills,
              contentWidth - 8
            );
            doc.text(allLines[0], marginLeft + catWidth, y);
            y += 11;
            for (let j = 1; j < allLines.length; j++) {
              doc.text(allLines[j], marginLeft + 8, y);
              y += 10;
            }
          }
          doc.setTextColor(0);
          break;
        }

        case "item": {
          checkPage(18);
          doc.setFont("helvetica", "bold");
          doc.setFontSize(8.5);
          const labelW = doc.getTextWidth(content.label + " — ");
          doc.text(content.label + " — ", marginLeft, y);
          doc.setFont("helvetica", "normal");
          doc.setTextColor(70);
          const descLines = doc.splitTextToSize(
            content.description,
            contentWidth - labelW
          );
          doc.text(descLines[0], marginLeft + labelW, y);
          y += 12;
          for (let j = 1; j < descLines.length; j++) {
            doc.text(descLines[j], marginLeft + 8, y);
            y += 11;
          }
          doc.setTextColor(0);
          break;
        }

        case "text": {
          if (content.value.startsWith("Previously")) {
            checkPage(16);
            doc.setFont("helvetica", "italic");
            doc.setFontSize(8.5);
            doc.setTextColor(100);
            doc.text(content.value, marginLeft, y);
            doc.setTextColor(0);
            y += 14;
          } else {
            checkPage(14);
            doc.setFont("helvetica", "normal");
            doc.setFontSize(8.5);
            doc.setTextColor(50);
            const wrapped = doc.splitTextToSize(
              content.value,
              contentWidth - 12
            );
            for (const wl of wrapped) {
              checkPage(12);
              doc.text(wl, marginLeft + 8, y);
              y += 11;
            }
            doc.setTextColor(0);
            y += 2;
          }
          break;
        }
      }
    }
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
