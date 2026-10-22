import React from 'react';
import {AbsoluteFill, Audio, Sequence, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig, Easing} from 'remotion';
import {fontCss, NIGHT, PAPER, VIOLET, mark} from './Kit';

/*
 * Poster 1: the animated price-slash poster. 10 s (300 frames, 5 bars at 120 BPM), code only.
 * Honest comparison: a monthly AI plan you pay whether you use it or not, vs Toso from 5 bob when you need it.
 * Model names in our own type only, never their logos. Offer: "Weka 50, pata 100" (top up 50, we double it).
 * Safe zone: type between y 240 and 1400, x 60-920.
 */

const pop = (f: number, at: number, fps: number, stiff = 180) => spring({frame: f - at, fps, config: {damping: 12, mass: 0.55, stiffness: stiff}});
const Big: React.FC<{children: React.ReactNode; top: number; size: number; p: number; pix?: boolean; color?: string; left?: number}> = ({children, top, size, p, pix, color = NIGHT, left = 60}) => (
  <div style={{position: 'absolute', left, right: 60, top, opacity: Math.min(1, p * 1.6), transform: `scale(${1.25 - 0.25 * p})`, transformOrigin: 'left center',
    fontFamily: pix ? 'Silkscreen' : 'Manrope', fontWeight: pix ? 400 : 800, fontSize: size, lineHeight: 0.95, whiteSpace: 'nowrap', letterSpacing: pix ? '-0.05em' : '-0.045em', color}}>{children}</div>
);
const Small: React.FC<{children: React.ReactNode; top: number; p: number; color?: string; size?: number}> = ({children, top, p, color = '#55545c', size = 52}) => (
  <div style={{position: 'absolute', left: 64, right: 60, top, opacity: p, transform: `translateY(${(1 - p) * 24}px)`, fontFamily: 'Manrope', fontWeight: 600, fontSize: size, color}}>{children}</div>
);

// 1 · the monthly plan, then struck through
const Monthly: React.FC = () => {
  const f = useCurrentFrame(); const {fps} = useVideoConfig();
  const strike = interpolate(f, [30, 40], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic)});
  return (
    <AbsoluteFill style={{background: PAPER}}>
      <Small top={560} p={pop(f, 0, fps)} size={48}>A monthly AI plan</Small>
      <Big top={640} size={160} p={pop(f, 2, fps)}>KES 2,700</Big>
      <div style={{position: 'absolute', left: 40, top: 712, width: 880 * strike, height: 22, background: NIGHT, transform: 'rotate(-5deg)', transformOrigin: 'left center', borderRadius: 4}} />
      <Small top={830} p={pop(f, 8, fps)}>every month.</Small>
      <Small top={920} p={pop(f, 46, fps)} color={NIGHT} size={60}>Even if you use it twice.</Small>
    </AbsoluteFill>
  );
};

// 2 · from 5 bob
const FiveBob: React.FC = () => {
  const f = useCurrentFrame(); const {fps} = useVideoConfig();
  return (
    <AbsoluteFill style={{background: NIGHT}}>
      <Small top={560} p={pop(f, 0, fps)} color="#c9c8d0" size={60}>Toso: from</Small>
      <Big top={660} size={200} p={pop(f, 2, fps, 200)} pix color={PAPER}>5 BOB</Big>
      <Small top={900} p={pop(f, 14, fps)} color={PAPER} size={64}>only when you need it.</Small>
    </AbsoluteFill>
  );
};

// 3 · the models, in our own type
const Models: React.FC = () => {
  const f = useCurrentFrame(); const {fps} = useVideoConfig();
  return (
    <AbsoluteFill style={{background: PAPER}}>
      {['GPT', 'Claude', 'Gemini'].map((m, i) => <Big key={m} top={520 + i * 190} size={190} p={pop(f, 3 + i * 10, fps)}>{m}</Big>)}
      <Small top={1110} p={pop(f, 36, fps)} color={NIGHT} size={60}>All in one app.</Small>
    </AbsoluteFill>
  );
};

// 4 · Weka 50, pata 100: the counter rolls 50 -> 100
const Double: React.FC = () => {
  const f = useCurrentFrame(); const {fps} = useVideoConfig();
  const n = Math.round(interpolate(f, [16, 32], [50, 100], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.inOut(Easing.cubic)}) / 5) * 5;
  const hit = pop(f, 32, fps, 220);
  return (
    <AbsoluteFill style={{background: NIGHT}}>
      <Small top={540} p={pop(f, 0, fps)} color="#fff" size={84}>Weka 50,</Small>
      <div style={{position: 'absolute', left: 60, top: 650, fontFamily: 'Silkscreen', fontSize: 340, lineHeight: 1, letterSpacing: '-0.05em', color: f >= 32 ? VIOLET : PAPER,
        transform: `scale(${f >= 32 ? 1.18 - 0.18 * hit : 1})`, transformOrigin: 'left center'}}>{n}</div>
      <Small top={1020} p={hit} color="#fff" size={84}>pata 100.</Small>
      <Small top={1130} p={pop(f, 40, fps)} color="#c9c8d0" size={46}>Top up 50, we double it.</Small>
    </AbsoluteFill>
  );
};

// 5 · end: logo, start free, link
const End: React.FC = () => {
  const f = useCurrentFrame(); const {fps} = useVideoConfig();
  const p = pop(f, 0, fps), b = pop(f, 10, fps);
  return (
    <AbsoluteFill style={{background: PAPER, fontFamily: 'Manrope'}}>
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
    <Sequence from={0} durationInFrames={75}><Monthly /></Sequence>
    <Sequence from={75} durationInFrames={60}><FiveBob /></Sequence>
    <Sequence from={135} durationInFrames={60}><Models /></Sequence>
    <Sequence from={195} durationInFrames={60}><Double /></Sequence>
    <Sequence from={255} durationInFrames={45}><End /></Sequence>
    <Audio src={staticFile('sfx/bed.wav')} startFrom={120} volume={(fr) => interpolate(fr, [0, 2, 296, 300], [0.7, 0.9, 0.9, 0.75], {extrapolateRight: 'clamp'})} />
    <Sequence from={30}><Audio src={staticFile('sfx/tick.wav')} /></Sequence>
    <Sequence from={77}><Audio src={staticFile('sfx/sting.wav')} volume={0.7} /></Sequence>
    {[138, 148, 158].map((t) => <Sequence key={t} from={t}><Audio src={staticFile('sfx/tick.wav')} volume={0.8} /></Sequence>)}
    <Sequence from={227}><Audio src={staticFile('sfx/chime.wav')} /></Sequence>
    <Sequence from={255}><Audio src={staticFile('sfx/ping.wav')} volume={0.7} /></Sequence>
  </AbsoluteFill>
);
