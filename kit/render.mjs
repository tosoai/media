// Toso post renderer. Usage: node kit/render.mjs spec.json
// spec: { "out": "queue/2026-10-19-slug", "size": "portrait"|"story", "slides": [ {t, bg, h, b, n, k}, ... ] }
// t: cover | tip | big | cta | sky      bg: paper | night      h: headline (use \n)  b: body  n: small label  k: big pixel text
// Brand rules baked in: one violet square per image; O only cropped; whole mark is T.; Manrope + Silkscreen only.
import { createRequire } from 'node:module'; import { execSync } from 'node:child_process';
const req = createRequire(import.meta.url);
let pw; try { pw = req('playwright'); } catch { pw = req(execSync('npm root -g').toString().trim() + '/playwright'); }
const { chromium } = pw;
import fs from 'node:fs'; import path from 'node:path'; import { fileURLToPath } from 'node:url';
const KIT = path.dirname(fileURLToPath(import.meta.url));
const M = JSON.parse(fs.readFileSync(path.join(KIT, 'marks.json'), 'utf8'));
const C = { paper: '#f5f3ee', night: '#0a0a11', violet: '#6e5bff', g1: '#8b8a93', g2: '#55545c' };
const font = (f, w) => `@font-face{font-family:${f};font-weight:${w};src:url(data:font/woff2;base64,${fs.readFileSync(`${KIT}/fonts/${f === 'Silkscreen' ? 'silkscreen-latin-400' : 'manrope-latin-' + w}-normal.woff2`).toString('base64')})}`;
const SKY = 'data:image/png;base64,' + fs.readFileSync(path.join(KIT, 'sky.png')).toString('base64');
const css = font('Manrope', 400) + font('Manrope', 600) + font('Manrope', 800) + font('Silkscreen', 400) + 'body{margin:0}*{box-sizing:border-box}';
const esc = s => String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/\n/g, '<br>');
const mark = (k, ink, w, stop) => M[k].replace(/INK/g, ink).replace(/STOP/g, stop || C.violet).replace('<svg ', `<svg width="${w}" `);
const hsize = (h, W) => { const L = Math.max(...String(h).split('\n').map(l => l.length)); return Math.min(64, Math.round((W - 80) / (L * 0.56))); };

function slide(s, W, H, i, total) {
  const dark = s.bg === 'night', ink = dark ? C.paper : C.night, sub = dark ? '#c9c8d0' : '#3a3a42', bg = dark ? C.night : C.paper;
  const page = total > 1 ? `<div style="position:absolute;right:40px;top:44px;font:400 13px Silkscreen;color:${C.g1}">${i + 1}/${total}</div>` : '';
  const logoV = `<div style="position:absolute;left:40px;bottom:${H > 800 ? 150 : 40}px">${mark('logo', ink, 110)}</div>`;   // violet stop
  const logoI = `<div style="position:absolute;left:40px;bottom:${H > 800 ? 150 : 40}px">${mark('logo', ink, 110, ink)}</div>`; // ink stop (O carries the violet)
  const H1 = (h, top = 40) => `<div style="position:absolute;left:40px;right:40px;top:${top}px;font:800 ${hsize(h, W)}px/1.04 Manrope;letter-spacing:-0.035em;color:${ink}">${esc(h)}</div>`;
  const label = s.n ? `<div style="position:absolute;left:40px;top:44px;font:400 13px Silkscreen;letter-spacing:0.04em;color:${C.g1}">${esc(s.n)}</div>` : '';
  let inner = '';
  if (s.t === 'cover') inner = `<div style="position:absolute;right:-190px;bottom:${H > 800 ? -120 : -200}px">${mark('o', ink, 560)}</div>${label}${H1(s.h, s.n ? 80 : 40)}${s.b ? `<div style="position:absolute;left:40px;right:200px;top:${s.n ? 80 : 40}px;margin-top:${hsize(s.h, W) * String(s.h).split('\n').length + 22}px;font:400 18px/1.45 Manrope;color:${sub}">${esc(s.b)}</div>` : ''}${logoI}`;
  else if (s.t === 'tip') inner = `${label}${page}<div style="position:absolute;left:40px;right:40px;top:${H * 0.24}px"><div style="font:400 44px Silkscreen;color:${C.g1}">${esc(s.k || String(i).padStart(2, '0'))}</div><div style="margin-top:18px;font:800 42px/1.04 Manrope;letter-spacing:-0.03em;color:${ink}">${esc(s.h)}</div><div style="margin-top:22px;font:400 23px/1.45 Manrope;color:${sub}">${esc(s.b)}</div></div>${logoV}`;
  else if (s.t === 'big') inner = `${label}${page}<div style="position:absolute;left:36px;right:36px;top:${H * 0.22}px;font:400 ${Math.min(150, Math.floor(468 / (Math.max(...String(s.k).split('\n').map(l => l.length)) * 0.66)))}px/1 Silkscreen;color:${ink}">${esc(s.k)}</div><div style="position:absolute;left:40px;right:40px;top:${H * 0.58}px;font:600 24px/1.35 Manrope;color:${sub}">${esc(s.h)}</div>${logoV}`;
  else if (s.t === 'cta') inner = `${page}<div style="position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:40px">${mark('t', ink, 120)}<div style="margin-top:44px;font:800 42px/1.04 Manrope;letter-spacing:-0.03em;color:${ink}">${esc(s.h)}</div><div style="margin-top:18px;font:400 19px/1.5 Manrope;color:${sub}">${esc(s.b)}</div><div style="margin-top:28px;font:400 20px Silkscreen;color:${ink}">tosoai.org</div></div>`;
  else if (s.t === 'sky') inner = `<div style="position:absolute;inset:0;background:url(${SKY}) center 85%/auto 100% no-repeat;image-rendering:pixelated"></div>${page}<div style="position:absolute;left:40px;right:40px;top:${H * 0.4}px;text-align:center;font:800 ${hsize(s.h, W)}px/0.98 Manrope;letter-spacing:-0.035em;color:${C.paper}">${esc(s.h)}</div><div style="position:absolute;left:0;right:0;bottom:44px;display:flex;justify-content:center">${mark('logo', C.paper, 110)}</div>`;
  else throw new Error('unknown slide type ' + s.t);
  return `<html><head><meta charset="utf-8"><style>${css}</style></head><body><div style="position:relative;width:${W}px;height:${H}px;overflow:hidden;background:${s.t === 'sky' ? '#000' : bg}">${inner}</div></body></html>`;
}

const spec = JSON.parse(fs.readFileSync(process.argv[2], 'utf8'));
const [W, H] = spec.size === 'story' ? [540, 960] : [540, 675];
const root = path.resolve(KIT, '..'); fs.mkdirSync(path.dirname(path.join(root, spec.out)), { recursive: true });
const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: W, height: H }, deviceScaleFactor: 2 });
const files = [];
for (const [i, s] of spec.slides.entries()) {
  await p.setContent(slide(s, W, H, i, spec.slides.length)); await p.evaluate(() => document.fonts.ready); await p.waitForTimeout(150);
  const f = `${spec.out}${spec.slides.length > 1 ? '-' + (i + 1) : ''}.png`; await p.screenshot({ path: path.join(root, f) }); files.push(f);
}
await b.close(); console.log(files.join('\n'));
