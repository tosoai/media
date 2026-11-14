import React from 'react';
import {AbsoluteFill, Audio, Sequence, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig, Easing} from 'remotion';
import {fontCss, NIGHT, PAPER, VIOLET, mark} from './Kit';

// Loop 17: "Slides by 9am?" (deck: weekly review, KES 20) 8 s (240 frames = 4 bars at 120 BPM), code only, no generated images.
// Frame 0 carries the whole hook. The last frames clear back to the same night ground, so the loop join is invisible.
// All type sits between y 240 and 1400 and x 60-920 (TikTok safe zone).

const Hook: React.FC = () => {
  const f = useCurrentFrame(); const {fps} = useVideoConfig();
  // fully visible on frame 0; a small settle so it still feels like a slam
  const p = spring({frame: f, fps, config: {damping: 12, mass: 0.5, stiffness: 190}});
  const s = 1.12 - 0.12 * p;
  const sub = spring({frame: f - 12, fps, config: {damping: 14}});
  return (
    <AbsoluteFill style={{background: NIGHT, fontFamily: 'Manrope'}}>
      <div style={{position: 'absolute', left: 60, right: 40, top: 520, transform: `scale(${s})`, transformOrigin: 'left center', fontWeight: 800, fontSize: 170, lineHeight: 0.92, letterSpacing: '-0.05em', color: PAPER}}>Slides<br />by 9am?</div>
      <div style={{position: 'absolute', left: 64, top: 1000, fontFamily: 'Silkscreen', fontSize: 120, letterSpacing: '-0.04em', color: PAPER, opacity: sub, transform: `translateY(${(1 - sub) * 30}px)`}}>SUN 7:30PM</div>
      <div style={{position: 'absolute', left: 64, top: 1170, fontSize: 52, fontWeight: 600, color: '#c9c8d0', opacity: sub}}>Monday review. Nothing yet.</div>
    </AbsoluteFill>
  );
};

const Phone: React.FC<{children: React.ReactNode}> = ({children}) => (
  <div style={{position: 'absolute', left: 150, top: 250, width: 640, height: 1140, borderRadius: 72, background: '#16161f', border: '10px solid #2a2a36', overflow: 'hidden', boxShadow: '0 40px 90px rgba(0,0,0,.5)'}}>
    <div style={{position: 'absolute', left: 250, top: 18, width: 120, height: 30, borderRadius: 15, background: '#000'}} />
    {children}
  </div>
);

const Type: React.FC = () => {
  const f = useCurrentFrame(); const {fps} = useVideoConfig();
  const line = "6 slides for Monday's sales review: last week's numbers, what worked, the plan for this week";
  const n = Math.floor(interpolate(f, [4, 34], [0, line.length], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}));
  const tap = f >= 42; const pin = spring({frame: f, fps, config: {damping: 16}});
  return (
    <AbsoluteFill style={{background: '#0e0e16', fontFamily: 'Manrope'}}>
      <div style={{transform: `translateY(${(1 - pin) * 120}px)`, opacity: pin}}>
        <Phone>
          <div style={{position: 'absolute', left: 48, top: 110}} dangerouslySetInnerHTML={{__html: mark('logo', PAPER, 150)}} />
          <div style={{position: 'absolute', left: 48, right: 48, top: 300, fontSize: 40, fontWeight: 800, color: PAPER, letterSpacing: '-0.02em'}}>What do you need?</div>
          <div style={{position: 'absolute', left: 36, right: 36, top: 400, background: '#22222e', borderRadius: 30, padding: '30px 30px 26px', border: '1px solid rgba(255,255,255,.1)'}}>
            <div style={{fontSize: 40, lineHeight: 1.32, color: PAPER, minHeight: 160}}>{line.slice(0, n)}<span style={{opacity: f % 14 < 7 ? 1 : 0}}>|</span></div>
            <div style={{marginTop: 18, display: 'flex', justifyContent: 'flex-end'}}>
              <span style={{fontSize: 32, fontWeight: 800, background: tap ? '#3a3a46' : PAPER, color: tap ? PAPER : NIGHT, borderRadius: 18, padding: '16px 28px', transform: `scale(${f >= 40 && f < 44 ? 0.94 : 1})`}}>{tap ? 'Making it…' : 'Make it'}</span>
            </div>
          </div>
        </Phone>
      </div>
      <div style={{position: 'absolute', left: 60, right: 60, top: 1430, textAlign: 'center', fontSize: 64, fontWeight: 800, color: PAPER, letterSpacing: '-0.03em'}}>One line.</div>
    </AbsoluteFill>
  );
};

// deck slides drawn in code (illustrative, not a real Toso screen)
const Page: React.FC<{k: string; t: string; children?: React.ReactNode}> = ({k, t, children}) => (
  <div style={{background: '#fff', color: NIGHT, height: '100%', padding: '44px 48px', position: 'relative'}}>
    <div style={{fontFamily: 'Silkscreen', fontSize: 24, color: '#9d9ca6'}}>{k}</div>
    <div style={{fontSize: 56, fontWeight: 800, lineHeight: 1, letterSpacing: '-0.04em', marginTop: 14}}>{t}</div>
    {children}
  </div>
);
const _Grid0: React.FC<{rows: string[][]; head: string[]}> = ({rows, head}) => (
  <div style={{marginTop: 28, border: '1px solid #e6e4de', borderRadius: 10, overflow: 'hidden'}}>
    {[head, ...rows].map((r, i) => <div key={i} style={{display: 'flex', borderBottom: '1px solid #e6e4de', background: i === 0 ? '#f1efe9' : undefined}}>
      {r.map((c, j) => <div key={j} style={{flex: j === 0 ? 2 : 1, padding: '12px 14px', borderRight: '1px solid #e6e4de', fontSize: i === 0 ? 24 : (j === 0 ? 28 : 26), fontWeight: i === 0 ? 800 : 400, fontFamily: i > 0 && j > 0 ? 'Silkscreen' : 'Manrope', textAlign: j > 0 ? 'right' : 'left'}}>{c}</div>)}
    </div>)}
  </div>
);
const Bar: React.FC<{w: number; dark?: boolean}> = ({w, dark}) => <div style={{height: 20, width: w, background: dark ? NIGHT : '#dcdad3', borderRadius: 5, marginTop: 14}} />;
const L: React.FC<{w: number; dark?: boolean; mt?: number}> = ({w, dark, mt = 12}) => <div style={{height: 14, width: w, background: dark ? NIGHT : '#dcdad3', borderRadius: 7, marginTop: mt}} />;
const H2: React.FC<{t: string}> = ({t}) => <div style={{fontSize: 24, fontWeight: 800, marginTop: 26, letterSpacing: '0.02em'}}>{t}</div>;
const Chart: React.FC<{v: number[]; hi?: number}> = ({v, hi}) => (
  <div style={{display: 'flex', alignItems: 'flex-end', gap: 22, marginTop: 30, height: 230}}>
    {v.map((h, i) => <div key={i} style={{width: 76, height: h, background: i === hi ? NIGHT : '#dcdad3', borderRadius: 6}} />)}
  </div>
);
const SLIDES: React.ReactNode[] = [
  <Page k="SLIDE 1" t="Last week in numbers"><_Grid0 head={['', 'Target', 'Actual']} rows={[['Sales (KES k)', '450', '512'], ['New clients', '12', '15'], ['Visits', '40', '37']]} /><div style={{position: 'absolute', right: 44, bottom: 44, width: 30, height: 30, background: VIOLET, borderRadius: 4}} /></Page>,
  <Page k="SLIDE 2" t="What worked"><Chart v={[90, 120, 105, 170, 210]} hi={4} /><L w={420} dark mt={30} /><L w={360} /></Page>,
  <Page k="SLIDE 6" t="This week"><H2 t="1. FOLLOW UP 15 NEW CLIENTS" /><L w={480} /><H2 t="2. VISITS BACK TO 40" /><L w={420} /><H2 t="3. REVIEW AGAIN MON 9AM" /><L w={360} /></Page>,
];

const Flip: React.FC = () => {
  const f = useCurrentFrame(); const {fps} = useVideoConfig();
  const per = 20;                               // 3 pages in 60 frames, the last one holds
  const idx = Math.min(SLIDES.length - 1, Math.floor(f / per));
  const local = f - idx * per;
  const p = spring({frame: local, fps, config: {damping: 15, mass: 0.5, stiffness: 220}});
  const done = spring({frame: f - 58, fps, config: {damping: 10, mass: 0.5, stiffness: 190}});
  return (
    <AbsoluteFill style={{background: '#e9e7e1', fontFamily: 'Manrope'}}>
      <div style={{position: 'absolute', left: 60, right: 60, top: 520}}>
        <div style={{background: '#fff', borderRadius: '24px 24px 0 0', padding: '20px 28px', fontSize: 30, fontWeight: 600, color: '#55545c', borderBottom: '1px solid #ddd', display: 'flex', justifyContent: 'space-between'}}><span>Weekly-review.pptx</span><span style={{fontFamily: 'Silkscreen', fontSize: 24}}>{['1/6','2/6','6/6'][idx]}</span></div>
        <div style={{height: 540, borderRadius: '0 0 24px 24px', overflow: 'hidden', perspective: 1600}}>
          <div style={{height: '100%', transform: `translateX(${(1 - p) * 70}%) rotateY(${(1 - p) * -28}deg)`, opacity: Math.min(1, p * 1.5)}}>{SLIDES[idx]}</div>
        </div>
      </div>
      <div style={{position: 'absolute', left: 0, right: 0, top: 1180, textAlign: 'center', fontSize: 150, fontWeight: 800, letterSpacing: '-0.05em', color: NIGHT, opacity: f >= 58 ? 1 : 0, transform: `scale(${1.5 - 0.5 * done})`}}>Done.</div>
    </AbsoluteFill>
  );
};

const Price: React.FC = () => {
  const f = useCurrentFrame(); const {fps} = useVideoConfig();
  const a = spring({frame: f, fps, config: {damping: 10, mass: 0.5, stiffness: 200}});
  const b = spring({frame: f - 8, fps, config: {damping: 12, mass: 0.5, stiffness: 200}});
  const out = interpolate(f, [24, 30], [1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.in(Easing.quad)});
  return (
    <AbsoluteFill style={{background: NIGHT, fontFamily: 'Manrope'}}>
      <div style={{opacity: out, transform: `translateY(${(1 - out) * -40}px)`}}>
        <div style={{position: 'absolute', left: 0, right: 0, top: 560, textAlign: 'center', fontFamily: 'Silkscreen', fontSize: 230, letterSpacing: '-0.06em', color: PAPER, transform: `scale(${1.5 - 0.5 * a})`}}>KES 20.</div>
        <div style={{position: 'absolute', left: 0, right: 0, top: 860, textAlign: 'center', fontSize: 120, fontWeight: 800, letterSpacing: '-0.04em', color: PAPER, opacity: f >= 8 ? 1 : 0, transform: `scale(${1.4 - 0.4 * b})`}}>M-Pesa.</div>
        <div style={{position: 'absolute', left: 0, right: 0, top: 1100, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 22, opacity: b}}>
          <div style={{fontFamily: 'Silkscreen', fontSize: 46, color: PAPER}}>TOSOAI.ORG</div><div style={{width: 30, height: 30, background: VIOLET}} />
        </div>
      </div>
    </AbsoluteFill>
  );
};

export const Loop17: React.FC = () => (
  <AbsoluteFill style={{background: NIGHT}}>
    <style>{fontCss}</style>
    <Sequence from={0} durationInFrames={60}><Hook /></Sequence>
    <Sequence from={60} durationInFrames={60}><Type /></Sequence>
    <Sequence from={120} durationInFrames={90}><Flip /></Sequence>
    <Sequence from={210} durationInFrames={30}><Price /></Sequence>
    {/* 4 bars of the gospel-house bed before the drop, so the music loops on the bar line */}
    <Audio src={staticFile('sfx/bed.wav')} startFrom={120} volume={(f) => interpolate(f, [0, 2, 236, 240], [0.7, 0.9, 0.9, 0.75], {extrapolateRight: 'clamp'})} />
  </AbsoluteFill>
);
