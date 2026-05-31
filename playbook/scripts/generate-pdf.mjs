// Generates content/guide.pdf from lib/guide-data.mjs.
// Run with:  npm run pdf
// Sleek, modern layout using Anthropic's Claude colour theme
// (warm coral on cream). The output PDF is committed and served (gated)
// by /api/download.

import PDFDocument from "pdfkit";
import { createWriteStream, mkdirSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import { guideMeta, sections, closing } from "../lib/guide-data.mjs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const outDir = join(__dirname, "..", "content");
const outPath = join(outDir, "guide.pdf");
mkdirSync(outDir, { recursive: true });

// ---- Claude colour theme -------------------------------------------------
const CREAM = "#F0EEE6"; // page background (Anthropic ivory)
const CARD = "#FAF9F5"; // callout card background
const CORAL = "#D97757"; // Claude signature coral
const CORAL_DK = "#B85C39"; // deeper coral for text
const INK = "#1F1E1D"; // near-black text
const MUTED = "#857F76"; // secondary text
const LINE = "#E3DFD4"; // hairlines
const DARK = "#262321"; // prompt-template box bg

// ---- Page geometry (A4 portrait) -----------------------------------------
const W = 595.28;
const H = 841.89;
const M = 56; // margin
const CW = W - M * 2; // content width
const BOTTOM = H - 64; // content floor

const doc = new PDFDocument({
  size: "A4",
  margin: M,
  bufferPages: true,
  autoFirstPage: false,
});
doc.pipe(createWriteStream(outPath));

// Paint the cream background on every page as it's created.
doc.on("pageAdded", () => {
  doc.save();
  doc.rect(0, 0, W, H).fill(CREAM);
  doc.restore();
});

let y = M; // running vertical cursor

// ---- low-level helpers ---------------------------------------------------
function measure(text, opts = {}) {
  return doc.heightOfString(text, { width: CW, ...opts });
}

function contentHeader() {
  doc.save();
  doc.roundedRect(M, M, 7, 7, 1.5).fill(CORAL);
  doc
    .font("Helvetica-Bold")
    .fontSize(8)
    .fillColor(MUTED)
    .text(guideMeta.title.toUpperCase(), M + 14, M, {
      characterSpacing: 1.2,
      lineBreak: false,
    });
  doc
    .lineWidth(0.5)
    .strokeColor(LINE)
    .moveTo(M, M + 16)
    .lineTo(W - M, M + 16)
    .stroke();
  doc.restore();
  return M + 30;
}

function newContentPage() {
  doc.addPage();
  y = contentHeader();
}

function ensureSpace(h) {
  if (y + h > BOTTOM) newContentPage();
}

// ---- block renderers -----------------------------------------------------
function sectionHeading(num, text) {
  ensureSpace(64);
  // number pill
  doc.save();
  doc.roundedRect(M, y, 26, 26, 7).fill(CORAL);
  doc
    .font("Helvetica-Bold")
    .fontSize(12)
    .fillColor("#FFFFFF")
    .text(String(num), M, y + 7, { width: 26, align: "center", lineBreak: false });
  doc.restore();

  doc.font("Helvetica-Bold").fontSize(16).fillColor(INK);
  const hh = doc.heightOfString(text, { width: CW - 38 });
  doc.text(text, M + 38, y + (26 - Math.min(hh, 20)) / 2 - 1, { width: CW - 38 });
  y += Math.max(26, hh) + 10;

  doc.save();
  doc.roundedRect(M, y, 46, 3, 1.5).fill(CORAL);
  doc.restore();
  y += 16;
}

function paragraph(text) {
  doc.font("Helvetica").fontSize(10.5).fillColor(INK);
  const h = measure(text, { lineGap: 3.5 });
  ensureSpace(h);
  doc.text(text, M, y, { width: CW, lineGap: 3.5 });
  y += h + 9;
}

function bullet(text) {
  doc.font("Helvetica").fontSize(10.5).fillColor(INK);
  const h = doc.heightOfString(text, { width: CW - 18, lineGap: 3 });
  ensureSpace(h + 2);
  doc.save();
  doc.rect(M + 1, y + 4.5, 4.5, 4.5).fill(CORAL);
  doc.restore();
  doc.fillColor(INK).text(text, M + 16, y, { width: CW - 18, lineGap: 3 });
  y += h + 7;
}

function calloutBox(label, body, italic = false) {
  const pad = 13;
  doc.font("Helvetica-Bold").fontSize(8.5);
  const labelH = doc.heightOfString(label.toUpperCase(), {
    width: CW - 2 * pad,
    characterSpacing: 1.2,
  });
  doc.font(italic ? "Helvetica-Oblique" : "Helvetica").fontSize(10);
  const bodyH = doc.heightOfString(body, { width: CW - 2 * pad - 6, lineGap: 3 });
  const boxH = pad * 2 + labelH + 5 + bodyH;
  ensureSpace(boxH + 6);

  doc.save();
  doc.roundedRect(M, y, CW, boxH, 9).fill(CARD);
  doc.roundedRect(M, y, 6, boxH, 3).fill(CORAL);
  doc.restore();

  doc
    .font("Helvetica-Bold")
    .fontSize(8.5)
    .fillColor(CORAL_DK)
    .text(label.toUpperCase(), M + pad + 6, y + pad, {
      width: CW - 2 * pad - 6,
      characterSpacing: 1.2,
    });
  doc
    .font(italic ? "Helvetica-Oblique" : "Helvetica")
    .fontSize(10)
    .fillColor(INK)
    .text(body, M + pad + 6, y + pad + labelH + 5, {
      width: CW - 2 * pad - 6,
      lineGap: 3,
    });
  y += boxH + 11;
}

function templateBox(label, text) {
  const pad = 14;
  doc.font("Helvetica-Bold").fontSize(8);
  const labelH = doc.heightOfString(label.toUpperCase(), { width: CW - 2 * pad });
  doc.font("Courier").fontSize(9);
  const textH = doc.heightOfString(text, { width: CW - 2 * pad, lineGap: 3 });
  const boxH = pad * 2 + labelH + 8 + textH;
  ensureSpace(boxH + 6);

  doc.save();
  doc.roundedRect(M, y, CW, boxH, 9).fill(DARK);
  doc.restore();

  doc
    .font("Helvetica-Bold")
    .fontSize(8)
    .fillColor(CORAL)
    .text(label.toUpperCase(), M + pad, y + pad, {
      width: CW - 2 * pad,
      characterSpacing: 1.4,
    });
  doc
    .font("Courier")
    .fontSize(9)
    .fillColor(CREAM)
    .text(text, M + pad, y + pad + labelH + 8, {
      width: CW - 2 * pad,
      lineGap: 3,
    });
  y += boxH + 11;
}

// ---- cover page ----------------------------------------------------------
function coverPage() {
  doc.addPage();

  let cy = 132;

  // edition badge
  doc.font("Helvetica-Bold").fontSize(8.5);
  const edition = (guideMeta.edition || "GUIDE").toUpperCase();
  const badgeW = doc.widthOfString(edition, { characterSpacing: 1.5 }) + 26;
  doc.save();
  doc.roundedRect(M, cy, badgeW, 23, 11.5).fill(CORAL);
  doc
    .fillColor("#FFFFFF")
    .text(edition, M, cy + 7, {
      width: badgeW,
      align: "center",
      characterSpacing: 1.5,
      lineBreak: false,
    });
  doc.restore();
  cy += 50;

  // title
  doc.font("Helvetica-Bold").fontSize(36).fillColor(INK);
  const titleH = doc.heightOfString(guideMeta.title, { width: CW, lineGap: 1 });
  doc.text(guideMeta.title, M, cy, { width: CW, lineGap: 1 });
  cy += titleH + 12;

  // coral rule
  doc.save();
  doc.roundedRect(M, cy, 72, 5, 2.5).fill(CORAL);
  doc.restore();
  cy += 24;

  // subtitle
  doc.font("Helvetica").fontSize(15).fillColor(CORAL_DK);
  const subH = doc.heightOfString(guideMeta.subtitle, { width: CW });
  doc.text(guideMeta.subtitle, M, cy, { width: CW });
  cy += subH + 18;

  // tagline
  doc.font("Helvetica").fontSize(10.5).fillColor(MUTED);
  const tagH = doc.heightOfString(guideMeta.tagline, { width: CW, lineGap: 3.5 });
  doc.text(guideMeta.tagline, M, cy, { width: CW, lineGap: 3.5 });
  cy += tagH + 24;

  // what's inside
  doc
    .font("Helvetica-Bold")
    .fontSize(9)
    .fillColor(CORAL_DK)
    .text("WHAT'S INSIDE", M, cy, { characterSpacing: 1.5 });
  cy += 18;

  doc.font("Helvetica").fontSize(10).fillColor(INK);
  const colW = CW / 2 - 10;
  const half = Math.ceil(sections.length / 2);
  // Trim each entry to a single line that fits its column.
  const fit = (str, max) => {
    if (doc.widthOfString(str) <= max) return str;
    let s = str;
    while (s.length > 1 && doc.widthOfString(s + "…") > max) s = s.slice(0, -1);
    return s.trimEnd() + "…";
  };
  sections.forEach((s, i) => {
    const col = i < half ? 0 : 1;
    const row = i < half ? i : i - half;
    const x = M + col * (colW + 20);
    const ly = cy + row * 21;
    doc.save();
    doc.rect(x, ly + 4, 4.5, 4.5).fill(CORAL);
    doc.restore();
    doc
      .fillColor(INK)
      .text(fit(`${i + 1}. ${s.heading}`, colW - 13), x + 13, ly, {
        lineBreak: false,
      });
  });

  // footer block
  const fy = H - 96;
  doc
    .lineWidth(0.5)
    .strokeColor(LINE)
    .moveTo(M, fy)
    .lineTo(W - M, fy)
    .stroke();
  doc
    .font("Helvetica-Bold")
    .fontSize(11)
    .fillColor(INK)
    .text(`by ${guideMeta.author}`, M, fy + 14, { lineBreak: false });
  doc
    .font("Helvetica")
    .fontSize(10)
    .fillColor(MUTED)
    .text("One-time " + guideMeta.priceLabel + "  ·  Web + PDF  ·  Instant access", M, fy + 30, {
      lineBreak: false,
    });
}

// ---- build ---------------------------------------------------------------
coverPage();
newContentPage();

sections.forEach((section, i) => {
  sectionHeading(i + 1, section.heading);
  (section.body || []).forEach(paragraph);
  if (section.bullets) {
    y += 2;
    section.bullets.forEach(bullet);
  }
  if (section.callout) calloutBox(section.callout.label, section.callout.body);
  if (section.template) templateBox(section.template.label, section.template.text);
  y += 12;
});

// closing
calloutBox("Final word", closing, true);

// ---- footers (page numbers) ----------------------------------------------
const range = doc.bufferedPageRange();
for (let i = range.start; i < range.start + range.count; i++) {
  if (i === 0) continue; // skip cover
  doc.switchToPage(i);
  const fy = H - 44;
  doc
    .lineWidth(0.5)
    .strokeColor(LINE)
    .moveTo(M, fy)
    .lineTo(W - M, fy)
    .stroke();
  doc
    .font("Helvetica")
    .fontSize(8)
    .fillColor(MUTED)
    .text(guideMeta.title, M, fy + 8, { lineBreak: false });
  doc.text(`${i + 1}`, W - M - 30, fy + 8, {
    width: 30,
    align: "right",
    lineBreak: false,
  });
}

doc.end();
console.log(`✓ Wrote ${outPath}`);
