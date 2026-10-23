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

// ---- Branded hero visuals (variant B covers). Ink only: the violet stays on the logo.
const HERO = {
  // CV page with red-pen circles and margin notes
  cv: (s, W, H, ink) => { const top = H > 800 ? H * 0.42 : H * 0.34, ph = Math.max(340, H - top - 200), red = '#d2402f';
    const ln = (w, y, c = '#c9c6bd') => `<div style="position:absolute;left:34px;top:${y}px;width:${w}%;height:9px;border-radius:5px;background:${c}"></div>`;
    return `<div style="position:absolute;left:70px;top:${top}px;width:330px;height:${ph}px;background:#fff;border-radius:6px;box-shadow:0 18px 40px rgba(0,0,0,.12);transform:rotate(-3deg)">
      <div style="position:absolute;left:34px;top:34px;font:800 26px Manrope;color:${C.night}">CURRICULUM VITAE</div>
      ${ln(60, 80)}${ln(45, 100)}<div style="position:absolute;left:34px;top:136px;font:800 15px Manrope;color:${C.night}">EXPERIENCE</div>${ln(80, 162)}${ln(72, 182)}${ln(76, 202)}${ln(50, 222)}
      <div style="position:absolute;left:34px;top:256px;font:800 15px Manrope;color:${C.night}">SKILLS</div>${ln(66, 282)}${ln(40, 302)}
      <div style="position:absolute;left:20px;top:150px;width:250px;height:90px;border:4px solid ${red};border-radius:50%;transform:rotate(-4deg)"></div>
      <div style="position:absolute;left:24px;top:270px;width:200px;height:50px;border:4px solid ${red};border-radius:50%"></div></div>
      <div style="position:absolute;left:390px;top:${top + 60}px;width:130px;font:italic 600 20px/1.2 Manrope;color:${red};transform:rotate(4deg)">${esc(s.note1 || 'numbers?')}</div>
      <div style="position:absolute;left:380px;top:${top + Math.min(250, ph - 90)}px;width:140px;font:italic 600 20px/1.2 Manrope;color:${red};transform:rotate(-3deg)">${esc(s.note2 || 'match the advert')}</div>`; },
  // huge clock time on night
  clock: (s, W, H, ink) => `<div style="position:absolute;left:0;right:0;top:${H * 0.45}px;text-align:center;font:400 ${s.ksize || 190}px/1 Silkscreen;letter-spacing:-0.06em;color:${ink}">${esc(s.k || '8:00')}</div>
      <div style="position:absolute;left:0;right:0;top:${H * 0.45 + (s.ksize || 190) + 20}px;text-align:center;font:400 18px Silkscreen;letter-spacing:.08em;color:${C.g1}">${esc(s.kl || 'DUE')}</div>`,
  // ledger grid with KES figures in mono
  ledger: (s, W, H, ink, dark) => { const rows = s.rows || [['Rent', '12,000'], ['Food', '6,500'], ['Fare', '3,200'], ['Chama', '2,000'], ['Savings', '3,000'], ['Left', '1,300']];
    const top = H > 800 ? H * 0.44 : H * 0.38, rh = H > 800 ? 52 : 40, line = dark ? 'rgba(255,255,255,.16)' : 'rgba(10,10,17,.14)';
    return `<div style="position:absolute;left:40px;right:40px;top:${top}px;border-top:2px solid ${ink}">${rows.map((r, i) => `<div style="display:flex;justify-content:space-between;align-items:center;height:${rh}px;border-bottom:1px solid ${line};${i === rows.length - 1 ? `border-top:2px solid ${ink};` : ''}"><span style="font:600 22px Manrope;color:${ink}">${esc(r[0])}</span><span style="font:400 24px Silkscreen;color:${ink}">KES ${esc(r[1])}</span></div>`).join('')}</div>`; },
  // stack of chat bubbles
  bubbles: (s, W, H, ink, dark) => { const b = s.bubbles || ['Summarise this in 5 points', 'Here are the 5 key points…', 'Now make it shorter'];
    const top = H * 0.44; return b.map((t, i) => { const me = i % 2 === 0; return `<div style="position:absolute;${me ? 'right:40px' : 'left:40px'};top:${top + i * 100}px;max-width:360px;padding:18px 24px;border-radius:26px;${me ? `border-bottom-right-radius:6px;background:${ink};color:${dark ? C.night : C.paper}` : `border-bottom-left-radius:6px;background:${dark ? '#1c1c26' : '#e4e1d9'};color:${ink}`};font:600 21px/1.35 Manrope">${esc(t)}</div>`; }).join(''); },
  // index card / exam slip
  slip: (s, W, H, ink) => { const top = H * 0.45; return `<div style="position:absolute;left:60px;right:60px;top:${top}px;height:280px;background:#fffdf6;border-radius:4px;box-shadow:0 14px 34px rgba(0,0,0,.12);transform:rotate(2deg);background-image:repeating-linear-gradient(180deg,transparent 0 43px,#b9d3e8 43px 45px);">
      <div style="position:absolute;left:0;right:0;top:0;height:56px;border-bottom:2px solid #e39b9b;padding:14px 22px;font:400 20px Silkscreen;color:${C.night}">${esc(s.k || 'CAT 2 · 8:00AM')}</div>
      <div style="position:absolute;left:22px;top:70px;font:600 22px/2.04 Manrope;color:#2b2b33">${esc(s.slip || 'Room 4B\nUnits 3 to 5\nBring: pen, ID')}</div></div>`; },
};
// ---- Native covers (variant A): look like a phone screenshot, no brand.
function nchat(s, W, H) {
  const msgs = s.msgs || [{ me: false, t: 'Hi' }];
  return `<div style="position:absolute;inset:0;background:${s.wall || '#f1f0f4'};font-family:-apple-system,Manrope,sans-serif">
    <div style="position:absolute;left:0;right:0;top:0;height:118px;background:#f7f7f7;border-bottom:1px solid #ddd;display:flex;align-items:flex-end;padding:0 24px 16px;gap:14px">
      <div style="font:600 28px Manrope;color:#3478f6">‹</div><div style="width:46px;height:46px;border-radius:23px;background:${s.avatar || '#9aa7b8'};display:flex;align-items:center;justify-content:center;font:800 20px Manrope;color:#fff">${esc((s.who || 'B')[0])}</div>
      <div><div style="font:700 20px Manrope;color:#111">${esc(s.who || 'Boss')}</div><div style="font:400 14px Manrope;color:#888">${esc(s.status || 'online')}</div></div></div>
    <div style="position:absolute;left:0;right:0;top:${s.top || 300}px;display:flex;flex-direction:column;gap:12px;padding:0 20px">
      <div style="align-self:center;font:600 13px Manrope;color:#777;background:#fff;border-radius:8px;padding:5px 12px">${esc(s.day || 'Today')}</div>
      ${msgs.map(m => `<div style="align-self:${m.me ? 'flex-end' : 'flex-start'};max-width:390px;background:${m.me ? (s.mine || '#e2defc') : '#fff'};border-radius:16px;${m.me ? 'border-top-right-radius:4px' : 'border-top-left-radius:4px'};padding:12px 16px 8px;box-shadow:0 1px 1px rgba(0,0,0,.08)"><div style="font:400 ${m.size || 23}px/1.35 Manrope;color:#111">${esc(m.t)}</div><div style="text-align:right;font:400 12px Manrope;color:#888;margin-top:4px">${esc(m.time || '')}</div></div>`).join('')}
    </div>
    <div style="position:absolute;left:0;right:0;bottom:0;height:96px;background:#f7f7f7;border-top:1px solid #ddd;padding:16px 20px"><div style="height:44px;border-radius:22px;background:#fff;border:1px solid #ddd"></div></div></div>`;
}
function nnotes(s, W, H) {
  return `<div style="position:absolute;inset:0;background:#fffef9;font-family:-apple-system,Manrope,sans-serif;padding:120px 36px 0">
    <div style="font:600 18px Manrope;color:#d4a017">‹ Notes</div>
    <div style="margin-top:28px;font:400 14px Manrope;color:#999;text-align:center">${esc(s.day || 'Today at 21:14')}</div>
    <div style="margin-top:22px;font:800 40px/1.12 Manrope;color:#111">${esc(s.h)}</div>
    <div style="margin-top:22px;font:400 25px/1.6 Manrope;color:#222">${(s.items || []).map(t => `<div>${esc(t)}</div>`).join('')}</div></div>`;
}

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
  else if (s.t === 'hero') inner = `${label}${H1(s.h, s.n ? 80 : 40)}${s.b ? `<div style="position:absolute;left:40px;right:120px;top:${(s.n ? 80 : 40) + hsize(s.h, W) * 1.04 * String(s.h).split('\n').length + 20}px;font:400 18px/1.45 Manrope;color:${sub}">${esc(s.b)}</div>` : ''}${HERO[s.hero](s, W, H, ink, dark)}${logoV}`;
  else if (s.t === 'nchat') inner = nchat(s, W, H);
  else if (s.t === 'nnotes') inner = nnotes(s, W, H);
  else if (s.t === 'ntext') inner = `<div style="position:absolute;inset:0;background:${s.color || '#1f6f5c'};display:flex;align-items:center;justify-content:center;padding:56px;text-align:center;font:800 ${s.size || 44}px/1.18 -apple-system,Manrope,sans-serif;color:${s.ink || '#fff'}">${esc(s.h)}</div>`;
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
