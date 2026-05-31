// Generates content/guide.pdf from the canonical content in lib/guide-data.mjs.
// Run with:  npm run pdf
// The output PDF is committed to the repo and served (gated) by /api/download.

import PDFDocument from "pdfkit";
import { createWriteStream, mkdirSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import { guideMeta, sections, closing } from "../lib/guide-data.mjs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const outDir = join(__dirname, "..", "content");
const outPath = join(outDir, "guide.pdf");

mkdirSync(outDir, { recursive: true });

const doc = new PDFDocument({ margin: 64, size: "A4" });
doc.pipe(createWriteStream(outPath));

const INK = "#0f172a";
const MUTED = "#475569";
const ACCENT = "#4f46e5";

// Title page
doc.moveDown(4);
doc.fillColor(INK).fontSize(30).font("Helvetica-Bold").text(guideMeta.title, {
  align: "center",
});
doc.moveDown(0.5);
doc
  .fillColor(ACCENT)
  .fontSize(15)
  .font("Helvetica")
  .text(guideMeta.subtitle, { align: "center" });
doc.moveDown(1.5);
doc
  .fillColor(MUTED)
  .fontSize(11)
  .text(guideMeta.tagline, { align: "center" });
doc.moveDown(2);
doc
  .fillColor(MUTED)
  .fontSize(10)
  .text(`by ${guideMeta.author}`, { align: "center" });

// Sections
for (const section of sections) {
  doc.addPage();
  doc
    .fillColor(ACCENT)
    .fontSize(16)
    .font("Helvetica-Bold")
    .text(section.heading);
  doc.moveDown(0.6);

  for (const paragraph of section.body) {
    doc
      .fillColor(INK)
      .fontSize(11)
      .font("Helvetica")
      .text(paragraph, { align: "left", lineGap: 3 });
    doc.moveDown(0.6);
  }

  if (section.bullets) {
    doc.moveDown(0.2);
    for (const bullet of section.bullets) {
      doc
        .fillColor(ACCENT)
        .fontSize(11)
        .font("Helvetica-Bold")
        .text("•  ", { continued: true })
        .fillColor(INK)
        .font("Helvetica")
        .text(bullet, { lineGap: 2 });
      doc.moveDown(0.35);
    }
  }
}

// Closing
doc.addPage();
doc.moveDown(2);
doc
  .fillColor(INK)
  .fontSize(13)
  .font("Helvetica-Oblique")
  .text(closing, { align: "left", lineGap: 4 });

doc.end();

console.log(`✓ Wrote ${outPath}`);
