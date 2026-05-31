// Generates the static GitHub Pages site (index.html + success.html) for
// "The Claude Opus 4.8 Playbook" from the same canonical content used by the
// Next.js app and the PDF.  Run with:  npm run build:pages  (or node generate.mjs)
//
//   PAYMENT_LINK env var → the Stripe Payment Link the Buy button points to.
//
// NOTE: GitHub Pages is static, so this site has no payment verification.
// The Buy button opens a Stripe-hosted Payment Link; after paying, Stripe
// redirects the buyer to success.html, which links to the (public) PDF.

import { writeFileSync, copyFileSync, mkdirSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import { guideMeta, sections, closing } from "../playbook/lib/guide-data.mjs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const PAYMENT_LINK = process.env.PAYMENT_LINK || "#";

const esc = (s) =>
  String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

const STYLE = `
  :root{
    --cream:#F0EEE6;--card:#FAF9F5;--coral:#D97757;--coraldark:#B85C39;
    --ink:#1F1E1D;--muted:#857F76;--line:#E3DFD4;--dark:#262321;
  }
  *{box-sizing:border-box;margin:0;padding:0}
  html{-webkit-text-size-adjust:100%}
  body{background:var(--cream);color:var(--ink);
    font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Helvetica,Arial,sans-serif;
    line-height:1.6;-webkit-font-smoothing:antialiased}
  .wrap{max-width:760px;margin:0 auto;padding:64px 24px}
  .badge{display:inline-block;background:var(--coral);color:#fff;font-size:12px;
    font-weight:700;letter-spacing:.08em;text-transform:uppercase;padding:6px 14px;border-radius:999px}
  h1{font-size:clamp(34px,6vw,52px);font-weight:800;letter-spacing:-.02em;line-height:1.05;margin:18px 0}
  .sub{font-size:clamp(18px,3vw,22px);color:var(--coraldark);font-weight:500}
  .tagline{font-size:18px;color:rgba(31,30,29,.8);margin-top:20px;max-width:620px}
  .promise{font-style:italic;color:var(--muted);font-size:14px;margin-top:24px;max-width:560px}
  .btn{display:inline-flex;align-items:center;justify-content:center;background:var(--coral);
    color:#fff;font-size:18px;font-weight:700;text-decoration:none;padding:16px 32px;border-radius:10px;
    box-shadow:0 10px 24px rgba(217,119,87,.28);transition:background .15s}
  .btn:hover{background:var(--coraldark)}
  .note{font-size:12px;color:var(--muted);margin-top:12px}
  .center{text-align:center}
  .cta{margin-top:40px}
  section.block{margin-top:72px}
  h2.kicker{text-align:center;font-size:26px;font-weight:700}
  .grid{display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-top:32px}
  @media(max-width:600px){.grid{grid-template-columns:1fr}}
  .item{display:flex;gap:12px;background:var(--card);border:1px solid var(--line);
    border-radius:10px;padding:16px}
  .num{flex:none;width:26px;height:26px;border-radius:8px;background:var(--coral);color:#fff;
    font-weight:700;font-size:13px;display:flex;align-items:center;justify-content:center}
  .item span.t{font-size:14px}
  .valuecard{margin-top:64px;background:var(--card);border:1px solid var(--line);
    border-radius:18px;padding:40px;text-align:center}
  footer{margin-top:80px;border-top:1px solid var(--line);padding-top:32px;text-align:center;
    color:var(--muted);font-size:14px}
  /* guide */
  .gh{border-bottom:1px solid var(--line);padding-bottom:28px;margin-bottom:40px}
  .gsec{margin-top:48px}
  .ghead{display:flex;gap:12px;align-items:flex-start}
  .ghead h3{font-size:clamp(20px,3vw,26px);font-weight:700;line-height:1.25}
  .rule{height:3px;width:44px;background:var(--coral);border-radius:2px;margin-top:6px}
  .gsec p{margin-top:14px;color:rgba(31,30,29,.9)}
  ul.bul{list-style:none;margin-top:16px;display:flex;flex-direction:column;gap:10px}
  ul.bul li{display:flex;gap:12px}
  ul.bul li::before{content:"";flex:none;width:7px;height:7px;border-radius:2px;background:var(--coral);margin-top:9px}
  .callout{margin:22px 0;background:var(--card);border:1px solid var(--line);
    border-left:5px solid var(--coral);border-radius:12px;padding:18px 20px}
  .callout .lab{font-size:12px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:var(--coraldark)}
  .callout p{margin-top:6px;color:var(--ink)}
  .tpl{margin:22px 0;background:var(--dark);border-radius:12px;padding:18px 20px}
  .tpl .lab{font-size:12px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:var(--coral)}
  .tpl pre{margin-top:10px;color:var(--cream);font-family:ui-monospace,SFMono-Regular,Menlo,Consolas,monospace;
    font-size:13px;line-height:1.6;white-space:pre-wrap}
  .banner{display:flex;flex-wrap:wrap;gap:16px;align-items:center;justify-content:space-between;
    background:var(--card);border:1px solid rgba(217,119,87,.4);border-radius:12px;padding:20px;margin-bottom:40px}
  .banner .ok{font-weight:700;color:var(--coraldark)}
  .banner .small{font-size:14px;color:var(--muted)}
`;

function page(title, bodyHtml) {
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>${esc(title)}</title>
<meta name="description" content="${esc(guideMeta.tagline)}">
<meta property="og:title" content="${esc(guideMeta.title)} — ${esc(guideMeta.subtitle)}">
<meta property="og:description" content="${esc(guideMeta.tagline)}">
<meta name="twitter:card" content="summary_large_image">
<style>${STYLE}</style>
</head>
<body>
${bodyHtml}
</body>
</html>`;
}

function buyButton() {
  return `<div class="cta center">
    <a class="btn" href="${PAYMENT_LINK}">Get the Playbook — ${esc(guideMeta.priceLabel)}</a>
    <p class="note">Secure one-time payment via Stripe. Instant access + PDF download.</p>
  </div>`;
}

// ---- index.html ----------------------------------------------------------
const insideGrid = sections
  .map(
    (s, i) =>
      `<div class="item"><div class="num">${i + 1}</div><span class="t">${esc(
        s.heading
      )}</span></div>`
  )
  .join("\n");

const landing = page(
  `${guideMeta.title} — ${guideMeta.subtitle}`,
  `<main class="wrap">
  <div class="center">
    <span class="badge">${esc(guideMeta.edition || "Digital guide")} · Instant access</span>
    <h1>${esc(guideMeta.title)}</h1>
    <p class="sub">${esc(guideMeta.subtitle)}</p>
    <p class="tagline" style="margin-left:auto;margin-right:auto">${esc(guideMeta.tagline)}</p>
    ${buyButton()}
    <p class="promise" style="margin-left:auto;margin-right:auto">${esc(guideMeta.promise || "")}</p>
  </div>

  <section class="block">
    <h2 class="kicker">What's inside</h2>
    <div class="grid">${insideGrid}</div>
  </section>

  <div class="valuecard">
    <h2 style="font-size:24px;font-weight:700">Stop planning. Start shipping.</h2>
    <p style="margin-top:12px;color:rgba(31,30,29,.8);max-width:520px;margin-left:auto;margin-right:auto">
      Everything you need to get senior-engineer output from Claude Opus 4.8 — read it on the web and download the PDF to keep.</p>
    ${buyButton()}
  </div>

  <footer>© ${new Date().getFullYear()} ${esc(guideMeta.author)}. One-time purchase · Powered by Stripe.</footer>
</main>`
);

// ---- success.html --------------------------------------------------------
function sectionHtml(s, i) {
  const body = (s.body || []).map((p) => `<p>${esc(p)}</p>`).join("\n");
  const bullets = s.bullets
    ? `<ul class="bul">${s.bullets.map((b) => `<li>${esc(b)}</li>`).join("")}</ul>`
    : "";
  const callout = s.callout
    ? `<div class="callout"><div class="lab">${esc(
        s.callout.label
      )}</div><p>${esc(s.callout.body)}</p></div>`
    : "";
  const template = s.template
    ? `<div class="tpl"><div class="lab">${esc(
        s.template.label
      )}</div><pre>${esc(s.template.text)}</pre></div>`
    : "";
  return `<section class="gsec">
    <div class="ghead"><div class="num">${i + 1}</div><h3>${esc(s.heading)}</h3></div>
    <div class="rule"></div>
    ${body}
    ${bullets}
    ${callout}
    ${template}
  </section>`;
}

const guideBody = sections.map(sectionHtml).join("\n");

const success = page(
  `${guideMeta.title} — your copy`,
  `<main class="wrap">
  <div class="banner">
    <div>
      <div class="ok">✓ Payment confirmed — you're in.</div>
      <div class="small">Read it below, and download the PDF to keep.</div>
    </div>
    <a class="btn" href="guide.pdf" download>Download PDF</a>
  </div>

  <div class="gh">
    <h1 style="font-size:clamp(28px,5vw,40px)">${esc(guideMeta.title)}</h1>
    <p class="sub">${esc(guideMeta.subtitle)}</p>
  </div>

  ${guideBody}

  <div class="callout" style="margin-top:48px"><div class="lab">Final word</div><p><em>${esc(
    closing
  )}</em></p></div>

  <div class="cta center" style="margin-top:32px">
    <a class="btn" href="guide.pdf" download>Download the PDF</a>
    <p class="note">Bookmark this page to come back to it anytime.</p>
  </div>
</main>`
);

writeFileSync(join(__dirname, "index.html"), landing);
writeFileSync(join(__dirname, "success.html"), success);

// copy the generated PDF alongside the site
mkdirSync(__dirname, { recursive: true });
copyFileSync(
  join(__dirname, "..", "playbook", "content", "guide.pdf"),
  join(__dirname, "guide.pdf")
);

console.log(
  `✓ Wrote index.html + success.html + guide.pdf (payment link: ${PAYMENT_LINK})`
);
