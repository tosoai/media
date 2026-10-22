import React from 'react';
import {AbsoluteFill, Audio, Sequence, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig, Easing} from 'remotion';
import {fontCss, NIGHT, PAPER, VIOLET, mark} from './Kit';

// Loop 2: "CV due at midnight?" (document: tailored CV) 8 s (240 frames = 4 bars at 120 BPM), code only, no generated images.
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
      <div style={{position: 'absolute', left: 60, right: 40, top: 520, transform: `scale(${s})`, transformOrigin: 'left center', fontWeight: 800, fontSize: 180, lineHeight: 0.92, letterSpacing: '-0.05em', color: PAPER}}>CV due at<br />midnight?</div>
      <div style={{position: 'absolute', left: 64, top: 1000, fontFamily: 'Silkscreen', fontSize: 120, letterSpacing: '-0.04em', color: PAPER, opacity: sub, transform: `translateY(${(1 - sub) * 30}px)`}}>11:12</div>
      <div style={{position: 'absolute', left: 64, top: 1140, fontSize: 52, fontWeight: 600, color: '#c9c8d0', opacity: sub}}>The advert closes.</div>
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
  const line = 'Tailor my CV to the Assistant Accountant advert';
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

// slides drawn in code (no real decks in the repo yet)
const Bar: React.FC<{w: string; c?: string; h?: number; mt?: number}> = ({w, c = '#dcdad3', h = 14, mt = 14}) => <div style={{height: h, width: w, background: c, borderRadius: h / 2, marginTop: mt}} />;
const Head: React.FC<{t: string; mt?: number}> = ({t, mt = 34}) => <div style={{fontFamily: 'Silkscreen', fontSize: 22, color: '#86858e', marginTop: mt}}>{t}</div>;
const SLIDES: React.ReactNode[] = [
  <div style={{background: '#fff', height: '100%', padding: 56, color: NIGHT}}><div style={{fontSize: 64, fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1}}>Your Name</div><div style={{fontSize: 28, fontWeight: 600, color: '#55545c', marginTop: 12}}>Assistant Accountant</div><Head t="PROFILE" /><Bar w="92%" /><Bar w="84%" /><Bar w="60%" /><Head t="KEY SKILLS" /><div style={{display: 'flex', gap: 14, marginTop: 16}}>{['Reconciliations', 'Excel', 'Payroll'].map((t) => <span key={t} style={{fontSize: 24, fontWeight: 600, border: '2px solid ' + NIGHT, borderRadius: 30, padding: '6px 18px'}}>{t}</span>)}</div></div>,
  <div style={{background: '#fff', height: '100%', padding: 56, color: NIGHT}}><Head t="EXPERIENCE" mt={0} /><div style={{fontSize: 34, fontWeight: 800, marginTop: 16}}>Accounts Clerk</div><Bar w="88%" /><Bar w="76%" /><Bar w="82%" /><div style={{fontSize: 34, fontWeight: 800, marginTop: 30}}>Finance Intern</div><Bar w="80%" /><Bar w="66%" /></div>,
  <div style={{background: '#fff', height: '100%', padding: 56, color: NIGHT}}><Head t="EDUCATION" mt={0} /><Bar w="70%" h={20} c={NIGHT} mt={20} /><Bar w="50%" /><Head t="REFEREES" /><Bar w="64%" /><Bar w="58%" /><div style={{position: 'absolute', right: 56, bottom: 56, width: 26, height: 26, background: VIOLET, borderRadius: 4}} /></div>,
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
        <div style={{background: '#fff', borderRadius: '24px 24px 0 0', padding: '20px 28px', fontSize: 30, fontWeight: 600, color: '#55545c', borderBottom: '1px solid #ddd', display: 'flex', justifyContent: 'space-between'}}><span>CV-Assistant-Accountant.docx</span><span style={{fontFamily: 'Silkscreen', fontSize: 24}}>{Math.min(idx + 1, 2)}/2</span></div>
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
        <div style={{position: 'absolute', left: 0, right: 0, top: 560, textAlign: 'center', fontFamily: 'Silkscreen', fontSize: 230, letterSpacing: '-0.06em', color: PAPER, transform: `scale(${1.5 - 0.5 * a})`}}>KES 5.</div>
        <div style={{position: 'absolute', left: 0, right: 0, top: 860, textAlign: 'center', fontSize: 120, fontWeight: 800, letterSpacing: '-0.04em', color: PAPER, opacity: f >= 8 ? 1 : 0, transform: `scale(${1.4 - 0.4 * b})`}}>M-Pesa.</div>
        <div style={{position: 'absolute', left: 0, right: 0, top: 1100, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 22, opacity: b}}>
          <div style={{fontFamily: 'Silkscreen', fontSize: 46, color: PAPER}}>TOSOAI.ORG</div><div style={{width: 30, height: 30, background: VIOLET}} />
        </div>
      </div>
    </AbsoluteFill>
  );
};

export const Loop2: React.FC = () => (
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
