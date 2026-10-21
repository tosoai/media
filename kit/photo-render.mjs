// One-off: editorial photo slides + kit slides for shoot 1 carousel.
import { createRequire } from 'node:module'; import { execSync } from 'node:child_process';
import fs from 'node:fs'; import path from 'node:path';
const req = createRequire(import.meta.url);
let pw; try { pw = req('playwright'); } catch { pw = req(execSync('npm root -g').toString().trim() + '/playwright'); }
const KIT = process.argv[2], OUT = process.argv[3], SRC = process.argv[4];
const M = JSON.parse(fs.readFileSync(path.join(KIT, 'marks.json'), 'utf8'));
const C = { paper: '#f5f3ee', night: '#0a0a11', violet: '#6e5bff' };
const font = (f, w) => `@font-face{font-family:${f};font-weight:${w};src:url(data:font/woff2;base64,${fs.readFileSync(`${KIT}/fonts/${f === 'Silkscreen' ? 'silkscreen-latin-400' : 'manrope-latin-' + w}-normal.woff2`).toString('base64')})}`;
const css = font('Manrope', 400) + font('Manrope', 600) + font('Manrope', 800) + font('Silkscreen', 400) + 'body{margin:0}*{box-sizing:border-box}';
const mark = (k, ink, w, stop) => M[k].replace(/INK/g, ink).replace(/STOP/g, stop || C.violet).replace('<svg ', `<svg width="${w}" `);
const W = 540, H = 675, total = 5;
const img = f => 'data:image/jpeg;base64,' + fs.readFileSync(path.join(SRC, f)).toString('base64');
const page = (i, ink) => `<div style="position:absolute;right:32px;top:34px;font:400 12px Silkscreen;color:${ink};opacity:.85">${i}/${total}</div>`;

// photo slide: time stamp + one line, bottom-left, on a soft gradient. Logo only where asked (violet square budget = 1).
const photo = (f, i, time, line, sub, pos = 'center') => `
<div style="position:absolute;inset:0;background:url(${img(f)}) ${pos}/cover"></div>
<div style="position:absolute;left:0;right:0;bottom:0;height:46%;background:linear-gradient(to top,rgba(10,10,17,.72),rgba(10,10,17,0))"></div>
${page(i, C.paper)}
<div style="position:absolute;left:32px;right:32px;bottom:40px;color:${C.paper}">
  <div style="font:400 15px Silkscreen;letter-spacing:.04em;opacity:.9">${time}</div>
  <div style="margin-top:10px;font:800 40px/1.02 Manrope;letter-spacing:-0.035em">${line}</div>
  ${sub ? `<div style="margin-top:10px;font:600 17px/1.4 Manrope;opacity:.9">${sub}</div>` : ''}
</div>`;

const big = (i) => `<div style="position:absolute;inset:0;background:${C.paper}"></div>${page(i, '#8b8a93')}
<div style="position:absolute;left:32px;top:44px;font:400 13px Silkscreen;color:#8b8a93">7:20AM</div>
<div style="position:absolute;left:30px;right:30px;top:${H * 0.24}px;font:400 150px/1 Silkscreen;color:${C.night}">Done.</div>
<div style="position:absolute;left:32px;right:60px;top:${H * 0.55}px;font:600 24px/1.35 Manrope;color:#3a3a42">A finished deck, ready to download.<br>PowerPoint or PDF.</div>
<div style="position:absolute;left:32px;bottom:40px">${mark('logo', C.night, 110)}</div>`;

const cta = (i) => `<div style="position:absolute;inset:0;background:${C.night}"></div>${page(i, '#8b8a93')}
<div style="position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:40px">
${mark('t', C.paper, 120)}
<div style="margin-top:44px;font:800 42px/1.04 Manrope;letter-spacing:-0.03em;color:${C.paper}">First deck free.</div>
<div style="margin-top:18px;font:400 19px/1.5 Manrope;color:#c9c8d0">No card. No subscription.<br>Pay only for what you make, with M-Pesa.</div>
<div style="margin-top:28px;font:400 20px Silkscreen;color:${C.paper}">tosoai.org</div></div>`;

const slides = [
  photo('toso-shoot1-01-hero.jpg', 1, '7:02AM', 'Deck due at 9.', 'Twelve slides. Nothing started.', 'center 30%'),
  photo('toso-shoot1-02-desk.jpg', 2, '7:05AM', 'One line to Toso.', '“Q3 sales review for the regional heads.”'),
  big(3),
  photo('toso-shoot1-03-jacaranda.jpg', 4, '8:45AM', 'KES 20. M-Pesa.', 'Lipa kazi, si mwezi.', 'center 40%'),
  cta(5),
];
const b = await pw.chromium.launch(); const p = await b.newPage({ viewport: { width: W, height: H }, deviceScaleFactor: 2 });
for (const [i, s] of slides.entries()) {
  await p.setContent(`<html><head><meta charset="utf-8"><style>${css}</style></head><body><div style="position:relative;width:${W}px;height:${H}px;overflow:hidden">${s}</div></body></html>`);
  await p.evaluate(() => document.fonts.ready); await p.waitForTimeout(200);
  await p.screenshot({ path: `${OUT}-${i + 1}.png` }); console.log(`${OUT}-${i + 1}.png`);
}
await b.close();
