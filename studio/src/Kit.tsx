import React from 'react';
import {AbsoluteFill, Audio, Img, Sequence, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig, Easing} from 'remotion';
import marks from './marks.json';
import cells from './logocells.json';

export const PAPER = '#f5f3ee', NIGHT = '#0a0a11', VIOLET = '#6e5bff';
export const fontCss = `
@font-face{font-family:Manrope;font-weight:400;src:url(${staticFile('manrope-latin-400-normal.woff2')})}
@font-face{font-family:Manrope;font-weight:600;src:url(${staticFile('manrope-latin-600-normal.woff2')})}
@font-face{font-family:Manrope;font-weight:800;src:url(${staticFile('manrope-latin-800-normal.woff2')})}
@font-face{font-family:Silkscreen;src:url(${staticFile('silkscreen-latin-400-normal.woff2')})}`;
export const mark = (k: 'logo' | 'o' | 't', ink: string, w: number, stop?: string) =>
  (marks as any)[k].replace(/INK/g, ink).replace(/STOP/g, stop || VIOLET).replace('<svg ', `<svg width="${w}" `);

// A still with a slow push-in (Ken Burns). from/to = [scale, x%, y%]
export const Still: React.FC<{src: string; dur: number; from: [number, number, number]; to: [number, number, number]; pos?: string}> = ({src, dur, from, to, pos = 'center'}) => {
  const f = useCurrentFrame();
  const t = interpolate(f, [0, dur], [0, 1], {extrapolateRight: 'clamp', easing: Easing.inOut(Easing.quad)});
  const s = from[0] + (to[0] - from[0]) * t, x = from[1] + (to[1] - from[1]) * t, y = from[2] + (to[2] - from[2]) * t;
  return (
    <AbsoluteFill style={{overflow: 'hidden', background: '#000'}}>
      <Img src={staticFile(src)} style={{width: '100%', height: '100%', objectFit: 'cover', objectPosition: pos, transform: `translate(${x}%, ${y}%) scale(${s})`}} />
      <AbsoluteFill style={{background: 'linear-gradient(180deg, rgba(0,0,0,.42) 0%, rgba(0,0,0,0) 34%, rgba(0,0,0,0) 70%, rgba(0,0,0,.25) 100%)'}} />
    </AbsoluteFill>
  );
};

// Caption: lands with a quick rise, stays put. Kept in the upper third, clear of TikTok's UI.
const Caption: React.FC<{text: string; delay?: number; size?: number; dark?: boolean}> = ({text, delay = 3, size = 92, dark}) => {
  const f = useCurrentFrame();
  const {fps} = useVideoConfig();
  const p = spring({frame: f - delay, fps, config: {damping: 200, mass: 0.6}});
  return (
    <div style={{position: 'absolute', left: 72, right: 180, top: 250, opacity: p, transform: `translateY(${(1 - p) * 24}px)`,
      fontFamily: 'Manrope', fontWeight: 800, fontSize: size, lineHeight: 1.02, letterSpacing: '-0.035em', color: dark ? NIGHT : '#fff',
      textShadow: dark ? 'none' : '0 2px 24px rgba(0,0,0,.35)'}}>{text}</div>
  );
};
const Stamp: React.FC<{text: string}> = ({text}) => (
  <div style={{position: 'absolute', left: 72, top: 250, fontFamily: 'Silkscreen', fontSize: 64, letterSpacing: '.04em', color: '#fff', textShadow: '0 2px 12px rgba(0,0,0,.4)'}}>{text}</div>
);
const Placeholder: React.FC<{label: string}> = ({label}) => null && (
  <div style={{position: 'absolute', left: 0, right: 0, bottom: 520, textAlign: 'center', fontFamily: 'Silkscreen', fontSize: 22, color: '#ff8f7a', letterSpacing: '.04em'}}>{label}</div>
);


// Big punchy type: slams in (scale overshoot), centred, stays.
export const Punch: React.FC<{children: React.ReactNode; delay?: number; top?: number; size?: number; font?: 'sans' | 'pix'; color?: string; shadow?: boolean}> =
  ({children, delay = 0, top = 640, size = 200, font = 'sans', color = '#fff', shadow = true}) => {
  const f = useCurrentFrame(); const {fps} = useVideoConfig();
  const p = spring({frame: f - delay, fps, config: {damping: 11, mass: 0.55, stiffness: 170}});
  const o = interpolate(f - delay, [0, 3], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  return (
    <div style={{position: 'absolute', left: 40, right: 40, top, textAlign: 'center', opacity: o, transform: `scale(${1.6 - 0.6 * p})`,
      fontFamily: font === 'pix' ? 'Silkscreen' : 'Manrope', fontWeight: font === 'pix' ? 400 : 800, fontSize: size, lineHeight: 0.95,
      letterSpacing: font === 'pix' ? '-0.06em' : '-0.045em', color, textShadow: shadow ? '0 6px 40px rgba(0,0,0,.45)' : 'none'}}>{children}</div>
  );
};
// A quick white flash on a hit.
export const Flash: React.FC<{at?: number}> = ({at = 0}) => {
  const f = useCurrentFrame();
  const o = interpolate(f - at, [0, 2, 7], [0, 0.55, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  return <AbsoluteFill style={{background: '#fff', opacity: o}} />;
};

// 1 · the boss's message drops in
export const Notification: React.FC<{app?: string; from?: string; text?: string}> = ({app = 'MESSAGES', from = 'Boss', text = 'Need the deck by 5.'}) => {
  const f = useCurrentFrame(); const {fps} = useVideoConfig();
  const p = spring({frame: f - 14, fps, config: {damping: 15, mass: 0.7}});
  return (
    <div style={{position: 'absolute', left: 56, right: 56, top: 900, transform: `translateY(${(1 - p) * -260}px)`, opacity: Math.min(1, p * 1.4),
      background: 'rgba(250,250,250,.94)', borderRadius: 40, padding: '34px 40px', boxShadow: '0 30px 60px rgba(0,0,0,.28)', fontFamily: 'Manrope'}}>
      <div style={{display: 'flex', justifyContent: 'space-between', fontSize: 30, color: '#6b6b72', fontWeight: 600}}><span>{app}</span><span>now</span></div>
      <div style={{marginTop: 12, fontSize: 50, fontWeight: 800, color: NIGHT}}>{from}</div>
      <div style={{marginTop: 6, fontSize: 70, fontWeight: 800, letterSpacing: '-0.02em', color: NIGHT}}>{text}</div>
    </div>
  );
};

// 4 · the request typed into Toso (placeholder for the real screen recording)
export const Typing: React.FC<{line?: string; chip?: string}> = ({line = 'Turn my Q3 report into a 10-slide deck for the 5pm meeting', chip = 'Q3-report.xlsx'}) => {
  const f = useCurrentFrame();
  const n = Math.floor(interpolate(f, [8, 80], [0, line.length], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}));
  const sent = f > 96;
  return (
    <AbsoluteFill style={{background: NIGHT, fontFamily: 'Manrope'}}>
      <div style={{position: 'absolute', left: 60, top: 520, right: 60}} dangerouslySetInnerHTML={{__html: mark('logo', PAPER, 150, PAPER)}} />
      <div style={{position: 'absolute', left: 60, right: 60, top: 760, background: '#16161f', borderRadius: 32, padding: '36px 36px 30px', border: '1px solid rgba(255,255,255,.1)'}}>
        <div style={{fontSize: 44, lineHeight: 1.35, color: '#f5f3ee', minHeight: 180}}>{line.slice(0, n)}<span style={{opacity: f % 30 < 15 ? 1 : 0}}>|</span></div>
        <div style={{marginTop: 22, display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
          <span style={{fontSize: 30, color: '#c9c8d0', border: '1px solid rgba(255,255,255,.18)', borderRadius: 999, padding: '10px 22px'}}>{chip}</span>
          <span style={{fontSize: 34, fontWeight: 800, background: sent ? '#3a3a46' : PAPER, color: sent ? PAPER : NIGHT, borderRadius: 18, padding: '18px 30px'}}>{sent ? 'Making it…' : 'Make it'}</span>
        </div>
      </div>
      <Placeholder label="PLACEHOLDER · YOUR REAL SCREEN RECORDING GOES HERE" />
    </AbsoluteFill>
  );
};

// 5 · the file opens (placeholder)
export const FileOpen: React.FC<{header?: string; children?: React.ReactNode}> = ({header = 'Q3-Sales-Update.pptx · 10 slides', children}) => {
  const f = useCurrentFrame(); const {fps} = useVideoConfig();
  const p = spring({frame: f - 2, fps, config: {damping: 18}});
  return (
    <AbsoluteFill style={{background: '#e9e7e1', fontFamily: 'Manrope'}}>
      <div style={{position: 'absolute', left: 60, right: 60, top: 600, transform: `scale(${0.92 + 0.08 * p})`, opacity: p}}>
        <div style={{background: '#fff', borderRadius: '24px 24px 0 0', padding: '20px 28px', fontSize: 28, fontWeight: 600, color: '#55545c', borderBottom: '1px solid #ddd'}}>{header}</div>
        {children ?? <div style={{background: NIGHT, height: 540, borderRadius: '0 0 24px 24px', padding: 56, color: PAPER}}>
          <div style={{fontFamily: 'Silkscreen', fontSize: 24, color: '#9d9ca6'}}>Q3 · SALES UPDATE</div>
          <div style={{marginTop: 30, fontSize: 72, fontWeight: 800, lineHeight: 1, letterSpacing: '-0.03em'}}>Q3 closed 12% ahead of target</div>
        </div>}
      </div>
      <Placeholder label="PLACEHOLDER · REAL TOSO FILE OPENING GOES HERE" />
    </AbsoluteFill>
  );
};

// 7 · the M-Pesa prompt (placeholder; generic, not Safaricom's look)
export const Pay: React.FC<{amount?: string}> = ({amount = 'KES 20'}) => {
  const f = useCurrentFrame(); const {fps} = useVideoConfig();
  const p = spring({frame: f - 2, fps, config: {damping: 18}});
  const dots = Math.min(4, Math.floor(interpolate(f, [12, 34], [0, 4], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})));
  return (
    <AbsoluteFill style={{background: '#111', fontFamily: 'Manrope'}}>
      <div style={{position: 'absolute', left: 90, right: 90, top: 720, background: PAPER, borderRadius: 34, padding: 50, transform: `translateY(${(1 - p) * 80}px)`, opacity: p}}>
        <div style={{fontFamily: 'Silkscreen', fontSize: 26, color: '#86858e'}}>M-PESA</div>
        <div style={{marginTop: 18, fontSize: 48, lineHeight: 1.3, color: NIGHT}}>Pay <b>{amount}</b> to <b>TOSO</b>?</div>
        <div style={{marginTop: 26, display: 'flex', gap: 20}}>{[0, 1, 2, 3].map((i) => <div key={i} style={{width: 26, height: 26, borderRadius: 13, background: i < dots ? NIGHT : 'rgba(10,10,17,.18)'}} />)}</div>
      </div>
      <Placeholder label="PLACEHOLDER · REAL M-PESA PROMPT GOES HERE" />
    </AbsoluteFill>
  );
};

// 9 · end card: pixels resolve into TOSO, the violet stop drops in on the beat
export const EndCard: React.FC<{tag?: string}> = ({tag = 'DECK KES 20 · FIRST DECK FREE'}) => {
  const f = useCurrentFrame(); const {fps} = useVideoConfig();
  const S = 2;                                    // logo drawn at 940 px wide
  const W = cells.w * S, H = cells.h * S, X0 = (1080 - W) / 2, Y0 = 640;
  const rnd = (i: number, k: number) => { const x = Math.sin(i * 12.9898 + k * 78.233) * 43758.5453; return x - Math.floor(x); };
  const crisp = interpolate(f, [20, 26], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const stop = spring({frame: f - 15, fps, config: {damping: 9, mass: 0.6, stiffness: 180}});
  const b = spring({frame: f - 30, fps, config: {damping: 200}}), c = spring({frame: f - 42, fps, config: {damping: 200}});
  const shake = f >= 15 && f < 21 ? Math.sin(f * 7) * (21 - f) * 1.5 : 0;
  return (
    <AbsoluteFill style={{background: PAPER, fontFamily: 'Manrope', transform: `translateY(${shake}px)`}}>
      {cells.cells.map(([cx, cy]: number[], i: number) => {
        const d = (cx / cells.w) * 8 + rnd(i, 1) * 4;           // left-to-right sweep
        const t = interpolate(f, [d, d + 10], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic)});
        const sx = rnd(i, 2) * 1080, sy = 300 + rnd(i, 3) * 1300;
        const x = sx + (X0 + cx * S - sx) * t, y = sy + (Y0 + cy * S - sy) * t;
        return <div key={i} style={{position: 'absolute', left: x, top: y, width: cells.c * S, height: cells.c * S, background: NIGHT, opacity: (t > 0 ? 1 : 0) * (1 - crisp)}} />;
      })}
      <div style={{position: 'absolute', left: X0, top: Y0, opacity: crisp}} dangerouslySetInnerHTML={{__html: mark('logo', NIGHT, W, PAPER)}} />
      <div style={{position: 'absolute', left: X0 + 450 * S, top: Y0 + 102 * S + (1 - stop) * -700, width: 20 * S, height: 20 * S, background: VIOLET, opacity: f >= 15 ? 1 : 0}} />
      <div style={{position: 'absolute', top: 960, left: 0, right: 0, textAlign: 'center', opacity: b, transform: `translateY(${(1 - b) * 30}px)`}}>
        <div style={{fontSize: 100, fontWeight: 800, letterSpacing: '-0.04em', color: NIGHT}}>Lipa kazi, si mwezi.</div>
        <div style={{marginTop: 14, fontSize: 44, color: '#4a4a53'}}>Pay for the work, not the month.</div>
      </div>
      <div style={{position: 'absolute', top: 1190, left: 0, right: 0, textAlign: 'center', opacity: c, transform: `translateY(${(1 - c) * 20}px)`}}>
        <div style={{display: 'inline-block', background: NIGHT, color: PAPER, fontFamily: 'Silkscreen', fontSize: 40, padding: '18px 30px', borderRadius: 14}}>{tag}</div>
        <div style={{marginTop: 30, fontFamily: 'Silkscreen', fontSize: 52, color: NIGHT}}>TOSOAI.ORG</div>
      </div>
    </AbsoluteFill>
  );
};

