import React from 'react';
import {AbsoluteFill, Audio, Sequence, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig, Easing} from 'remotion';
import {fontCss, NIGHT, PAPER, VIOLET, mark} from './Kit';

/*
 * Poster 1: animated price-slash poster. 10 s (300 frames, 5 bars at 120 BPM), code only.
 * Order: the models first (the desire), then the value comparison (one AI monthly vs all three per use),
 * then Weka 50, pata 100, then Start free. Model names in our own type only, never their logos.
 * A slow drifting pixel-dot field plus film grain runs under everything for texture.
 * Safe zone: type between y 240 and 1400, x 60-920.
 */

const pop = (f: number, at: number, fps: number, stiff = 180) => spring({frame: f - at, fps, config: {damping: 12, mass: 0.55, stiffness: stiff}});

// Background texture: a drifting dot grid (the pixel motif) + per-frame grain. Very low contrast.
const Texture: React.FC<{dark?: boolean}> = ({dark}) => {
  const f = useCurrentFrame();
  const dot = dark ? 'rgba(245,243,238,.07)' : 'rgba(10,10,17,.07)';
  const x = (f * 0.6) % 48, y = (f * 0.35) % 48;
  return (<>
    <AbsoluteFill style={{backgroundImage: `radial-gradient(${dot} 3px, transparent 3.5px)`, backgroundSize: '48px 48px', backgroundPosition: `${x}px ${y}px`}} />
    <AbsoluteFill style={{background: dark ? 'radial-gradient(ellipse at 30% 35%, rgba(110,91,255,.10), transparent 60%)' : 'radial-gradient(ellipse at 70% 30%, rgba(255,255,255,.7), transparent 60%)'}} />
    <svg width="1080" height="1920" style={{position: 'absolute', inset: 0, opacity: dark ? 0.10 : 0.07, mixBlendMode: 'overlay'}}>
      <filter id={`g${f}`}><feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed={f % 12} /><feColorMatrix type="saturate" values="0" /></filter>
      <rect width="1080" height="1920" filter={`url(#g${f})`} />
    </svg>
  </>);
};

const Big: React.FC<{children: React.ReactNode; top: number; size: number; p: number; pix?: boolean; color?: string; left?: number}> = ({children, top, size, p, pix, color = NIGHT, left = 60}) => (
  <div style={{position: 'absolute', left, right: 60, top, opacity: Math.min(1, p * 1.6), transform: `scale(${1.25 - 0.25 * p})`, transformOrigin: 'left center', whiteSpace: 'nowrap',
    fontFamily: pix ? 'Silkscreen' : 'Manrope', fontWeight: pix ? 400 : 800, fontSize: size, lineHeight: 0.95, letterSpacing: pix ? '-0.05em' : '-0.045em', color}}>{children}</div>
);
const Small: React.FC<{children: React.ReactNode; top: number; p: number; color?: string; size?: number}> = ({children, top, p, color = '#55545c', size = 52}) => (
  <div style={{position: 'absolute', left: 64, right: 60, top, opacity: p, transform: `translateY(${(1 - p) * 24}px)`, fontFamily: 'Manrope', fontWeight: 600, fontSize: size, color}}>{children}</div>
);

// 1 · the models: the desire first
const Models: React.FC = () => {
  const f = useCurrentFrame(); const {fps} = useVideoConfig();
  return (
    <AbsoluteFill style={{background: PAPER}}>
      <Texture />
      {['GPT', 'Claude', 'Gemini'].map((m, i) => <Big key={m} top={470 + i * 200} size={200} p={pop(f, 2 + i * 9, fps)}>{m}</Big>)}
      <Small top={1090} p={pop(f, 32, fps)} color={NIGHT} size={64}>All in one app.</Small>
    </AbsoluteFill>
  );
};

// 2 · the value, side by side: one AI monthly (struck) vs all three, per use
const Value: React.FC = () => {
  const f = useCurrentFrame(); const {fps} = useVideoConfig();
  const a = pop(f, 0, fps), b = pop(f, 36, fps, 200);
  const strike = interpolate(f, [22, 32], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic)});
  const dim = interpolate(f, [32, 42], [1, 0.45], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const card = {position: 'absolute' as const, left: 60, right: 60, borderRadius: 40, padding: '40px 46px', fontFamily: 'Manrope'};
  return (
    <AbsoluteFill style={{background: PAPER}}>
      <Texture />
      {/* one AI, monthly */}
      <div style={{...card, top: 310, height: 410, background: '#e7e4dc', opacity: a * dim, transform: `translateX(${(1 - a) * -80}px)`}}>
        <div style={{fontSize: 46, fontWeight: 600, color: '#55545c'}}>One AI. Monthly.</div>
        <div style={{position: 'relative', marginTop: 18, display: 'inline-block'}}>
          <div style={{fontSize: 150, fontWeight: 800, letterSpacing: '-0.045em', color: NIGHT, whiteSpace: 'nowrap'}}>KES 2,700</div>
          <div style={{position: 'absolute', left: -10, top: 78, width: `${(100 + 4) * strike}%`, height: 20, background: NIGHT, transform: 'rotate(-5deg)', transformOrigin: 'left center', borderRadius: 4}} />
        </div>
        <div style={{fontSize: 42, color: '#55545c', marginTop: 6}}>every month, used or not.</div>
      </div>
      {/* all three, per use */}
      <div style={{...card, top: 780, height: 520, background: NIGHT, opacity: Math.min(1, b * 1.5), transform: `scale(${1.08 - 0.08 * b}) translateY(${(1 - b) * 60}px)`, boxShadow: '0 40px 80px rgba(10,10,17,.25)'}}>
        <div style={{fontSize: 46, fontWeight: 600, color: '#c9c8d0'}}>All three. Only when you need it.</div>
        <div style={{display: 'flex', alignItems: 'baseline', gap: 26, marginTop: 30}}>
          <span style={{fontSize: 60, fontWeight: 600, color: '#c9c8d0'}}>from</span>
          <span style={{fontFamily: 'Silkscreen', fontSize: 210, letterSpacing: '-0.05em', color: PAPER, whiteSpace: 'nowrap'}}>5 BOB</span>
        </div>
        <div style={{fontSize: 42, color: '#c9c8d0', marginTop: 14}}>GPT · Claude · Gemini</div>
      </div>
    </AbsoluteFill>
  );
};

// 3 · Weka 50, pata 100: the counter rolls 50 -> 100
const Double: React.FC = () => {
  const f = useCurrentFrame(); const {fps} = useVideoConfig();
  const n = Math.round(interpolate(f, [14, 30], [50, 100], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.inOut(Easing.cubic)}) / 5) * 5;
  const hit = pop(f, 30, fps, 220);
  return (
    <AbsoluteFill style={{background: NIGHT}}>
      <Texture dark />
      <Small top={540} p={pop(f, 0, fps)} color="#fff" size={84}>Weka 50,</Small>
      <div style={{position: 'absolute', left: 60, top: 650, fontFamily: 'Silkscreen', fontSize: 340, lineHeight: 1, letterSpacing: '-0.05em', color: f >= 30 ? VIOLET : PAPER,
        transform: `scale(${f >= 30 ? 1.18 - 0.18 * hit : 1})`, transformOrigin: 'left center'}}>{n}</div>
      <Small top={1020} p={hit} color="#fff" size={84}>pata 100.</Small>
      <Small top={1130} p={pop(f, 38, fps)} color="#c9c8d0" size={46}>Top up 50, we double it.</Small>
    </AbsoluteFill>
  );
};

// 4 · end: logo, start free, link
const End: React.FC = () => {
  const f = useCurrentFrame(); const {fps} = useVideoConfig();
  const p = pop(f, 0, fps), b = pop(f, 10, fps);
  return (
    <AbsoluteFill style={{background: PAPER, fontFamily: 'Manrope'}}>
      <Texture />
      <div style={{position: 'absolute', left: 0, right: 0, top: 560, display: 'flex', justifyContent: 'center', opacity: p, transform: `scale(${1.15 - 0.15 * p})`}} dangerouslySetInnerHTML={{__html: mark('logo', NIGHT, 640)}} />
      <div style={{position: 'absolute', left: 0, right: 0, top: 860, textAlign: 'center', opacity: b, transform: `translateY(${(1 - b) * 30}px)`}}>
        <div style={{display: 'inline-block', background: NIGHT, color: PAPER, fontSize: 64, fontWeight: 800, padding: '26px 56px', borderRadius: 999}}>Start free</div>
        <div style={{marginTop: 34, fontFamily: 'Silkscreen', fontSize: 52, color: NIGHT}}>TOSOAI.ORG</div>
      </div>
    </AbsoluteFill>
  );
};

export const Poster1: React.FC = () => (
  <AbsoluteFill style={{background: PAPER}}>
    <style>{fontCss}</style>
    <Sequence from={0} durationInFrames={75}><Models /></Sequence>
    <Sequence from={75} durationInFrames={105}><Value /></Sequence>
    <Sequence from={180} durationInFrames={75}><Double /></Sequence>
    <Sequence from={255} durationInFrames={45}><End /></Sequence>
    <Audio src={staticFile('sfx/bed.wav')} startFrom={120} volume={(fr) => interpolate(fr, [0, 2, 296, 300], [0.7, 0.9, 0.9, 0.75], {extrapolateRight: 'clamp'})} />
    {[2, 11, 20].map((t) => <Sequence key={t} from={t}><Audio src={staticFile('sfx/tick.wav')} volume={0.8} /></Sequence>)}
    <Sequence from={97}><Audio src={staticFile('sfx/tick.wav')} /></Sequence>
    <Sequence from={111}><Audio src={staticFile('sfx/sting.wav')} volume={0.7} /></Sequence>
    <Sequence from={210}><Audio src={staticFile('sfx/chime.wav')} /></Sequence>
    <Sequence from={255}><Audio src={staticFile('sfx/ping.wav')} volume={0.7} /></Sequence>
  </AbsoluteFill>
);
