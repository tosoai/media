import React from 'react';
import {AbsoluteFill, Audio, Sequence, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';
import {fontCss, NIGHT, PAPER, VIOLET, mark, Still, Punch, Flash, Pay, EndCard} from './Kit';

/*
 * Episode 9: "Pick your model" (the models + M-Pesa angle). Student in a Nairobi café,
 * twists + round glasses + mustard sweater. Matches the landing hero
 * ("GPT, Claude and Gemini. One app."). Model names in type only, never their logos.
 * Two hooks share one body: Ad9a (choice) and Ad9b (payment).
 */

const Sfx: React.FC = () => (<>
  <Audio src={staticFile('sfx/bed.wav')} volume={0.9} />
  {[30, 102, 154, 192, 214].map((t) => <Sequence key={t} from={90 + t}><Audio src={staticFile('sfx/tick.wav')} /></Sequence>)}
  <Sequence from={90 + 168}><Audio src={staticFile('sfx/ping.wav')} volume={0.6} /></Sequence>
  <Sequence from={90 + 226}><Audio src={staticFile('sfx/ping.wav')} volume={0.6} /></Sequence>
  <Sequence from={409}><Audio src={staticFile('sfx/chime.wav')} /></Sequence>
</>);

const MENU = [['DeepSeek', 'DeepSeek'], ['Claude', 'Anthropic'], ['GPT', 'OpenAI'], ['Gemini', 'Google']];
const Bar: React.FC<{w: string}> = ({w}) => <div style={{height: 20, width: w, background: 'rgba(245,243,238,.24)', borderRadius: 10, marginTop: 16}} />;
const Tick: React.FC = () => <div style={{width: 18, height: 34, borderRight: `7px solid ${VIOLET}`, borderBottom: `7px solid ${VIOLET}`, transform: 'rotate(45deg)', marginTop: -10}} />;

// A tap: a white dot that lands and a ring that ripples out.
const Tap: React.FC<{at: number; x: number; y: number}> = ({at, x, y}) => {
  const f = useCurrentFrame();
  const t = f - at;
  if (t < -6 || t > 18) return null;
  const dot = interpolate(t, [-6, 0, 8, 14], [0, 1, 1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const r = interpolate(t, [0, 16], [20, 110], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const ro = interpolate(t, [0, 16], [0.9, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  return (<>
    <div style={{position: 'absolute', left: x - r, top: y - r, width: r * 2, height: r * 2, borderRadius: '50%', border: '6px solid #fff', opacity: ro}} />
    <div style={{position: 'absolute', left: x - 34, top: y - 34, width: 68, height: 68, borderRadius: '50%', background: 'rgba(255,255,255,.85)', opacity: dot, boxShadow: '0 4px 20px rgba(0,0,0,.4)'}} />
  </>);
};

// Step caption: number badge + words, swaps on each step.
const Step: React.FC<{n: number; text: string; from: number; to: number}> = ({n, text, from, to}) => {
  const f = useCurrentFrame(); const {fps} = useVideoConfig();
  if (f < from || f >= to) return null;
  const p = spring({frame: f - from, fps, config: {damping: 13, mass: 0.6, stiffness: 160}});
  return (
    <div style={{position: 'absolute', left: 60, right: 60, top: 230, display: 'flex', alignItems: 'center', gap: 30, opacity: Math.min(1, p * 1.5), transform: `translateY(${(1 - p) * 40}px)`}}>
      <div style={{flexShrink: 0, width: 120, height: 120, borderRadius: 26, background: VIOLET, color: '#fff', fontFamily: 'Silkscreen', fontSize: 70, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>{n}</div>
      <div style={{fontFamily: 'Manrope', fontWeight: 800, fontSize: 104, lineHeight: 0.98, letterSpacing: '-0.04em', color: '#fff'}}>{text}</div>
    </div>
  );
};

/*
 * The real Toso composer, slowed down into four obvious steps (8 s):
 * 1 tap the model pill, 2 pick Claude from the menu, 3 ask and Claude answers, 4 switch to Gemini, Gemini answers.
 * One model per message, exactly as the product works.
 */
const PICK = {tap1: 30, open1: 36, toClaude: 92, tapClaude: 102, close1: 110, type: [128, 152], send: 158, ans1: 168,
  tap2: 192, open2: 196, toGemini: 206, tapGemini: 214, close2: 220, ans2: 226};
const PILL = {x: 230, y: 1236}, ROW = (i: number) => 540 + 14 + 62 + 124 * i;
const PickModel: React.FC = () => {
  const f = useCurrentFrame(); const {fps} = useVideoConfig();
  const P = PICK;
  const model = f < P.tapClaude ? 'DeepSeek' : f < P.tapGemini ? 'Claude' : 'Gemini';
  const menu1 = f >= P.open1 && f < P.close1, menu2 = f >= P.open2 && f < P.close2;
  const menuP = spring({frame: f - (menu2 ? P.open2 : P.open1), fps, config: {damping: 16, mass: 0.5}});
  const hover = menu2 ? (f >= P.toGemini ? 'Gemini' : 'Claude') : f >= P.toClaude ? 'Claude' : f >= 60 ? 'GPT' : f >= 48 ? 'Claude' : 'DeepSeek';
  const q = 'Explain inflation in 3 points';
  const typed = f >= P.type[0] && f < P.send ? q.slice(0, Math.floor(interpolate(f, P.type, [0, q.length], {extrapolateRight: 'clamp'}))) : '';
  const pop = (from: number) => spring({frame: f - from, fps, config: {damping: 15, mass: 0.6}});
  const first = interpolate(f, [P.tap2 - 4, P.tap2 + 4], [1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const Card: React.FC<{p: number; name: string; o?: number}> = ({p, name, o = 1}) => (
    <div style={{position: 'absolute', left: 60, right: 150, top: 660, opacity: p * o, transform: `translateY(${(1 - p) * 40}px)`,
      background: '#16161f', border: '2px solid rgba(255,255,255,.14)', borderRadius: '8px 30px 30px 30px', padding: '28px 34px 34px'}}>
      <div style={{display: 'inline-block', fontFamily: 'Silkscreen', fontSize: 34, color: NIGHT, background: PAPER, padding: '6px 16px', borderRadius: 8}}>{name.toUpperCase()}</div>
      <Bar w="94%" /><Bar w="88%" /><Bar w="70%" />
    </div>
  );
  const Bubble: React.FC<{p: number; text: string; o?: number}> = ({p, text, o = 1}) => (
    <div style={{position: 'absolute', right: 150, top: 540, opacity: p * o, transform: `translateY(${(1 - p) * 30}px)`,
      background: '#2a2a36', color: PAPER, fontSize: 40, padding: '22px 30px', borderRadius: '28px 28px 8px 28px'}}>{text}</div>
  );
  return (
    <AbsoluteFill style={{background: NIGHT, fontFamily: 'Manrope'}}>
      <Step n={1} text="Tap the model." from={0} to={76} />
      <Step n={2} text="Pick one." from={76} to={120} />
      <Step n={3} text="Ask." from={120} to={186} />
      <Step n={4} text="Switch any time." from={186} to={240} />
      {/* first exchange: Claude */}
      <Bubble p={pop(P.send)} text={q} o={first} />
      <Card p={pop(P.ans1)} name="Claude" o={first} />
      {/* second exchange: Gemini, same spot */}
      <Bubble p={pop(P.close2)} text="Simpler, please" />
      <Card p={pop(P.ans2)} name="Gemini" />
      {/* composer */}
      <div style={{position: 'absolute', left: 60, right: 150, top: 1070, height: 250, background: '#16161f', border: '2px solid rgba(255,255,255,.14)', borderRadius: 36}} />
      <div style={{position: 'absolute', left: 100, top: 1100, fontSize: 44, color: typed ? PAPER : '#77768a'}}>{typed || 'Ask anything'}</div>
      <div style={{position: 'absolute', left: 96, top: 1194, height: 84, padding: '0 34px', display: 'flex', alignItems: 'center', gap: 12, fontSize: 40, fontWeight: 800,
        color: PAPER, borderRadius: 999, border: `3px solid ${menu1 || menu2 ? PAPER : 'rgba(255,255,255,.35)'}`, background: menu1 || menu2 ? '#2a2a36' : 'transparent'}}>{model} <span style={{fontSize: 28}}>▾</span></div>
      <div style={{position: 'absolute', left: 430, top: 1194, height: 84, padding: '0 30px', display: 'flex', alignItems: 'center', fontSize: 36, color: '#c9c8d0', borderRadius: 999, border: '3px solid rgba(255,255,255,.18)'}}>Quick</div>
      {/* the menu opens upward from the pill */}
      {(menu1 || menu2) && (
        <div style={{position: 'absolute', left: 60, width: 820, top: 540, padding: 14, background: PAPER, borderRadius: 32, boxShadow: '0 40px 80px rgba(0,0,0,.55)',
          opacity: menuP, transform: `translateY(${(1 - menuP) * 50}px) scale(${0.94 + 0.06 * menuP})`, transformOrigin: '20% 100%'}}>
          {MENU.map(([name, maker]) => (
            <div key={name} style={{height: 124, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 34px', borderRadius: 22, background: name === hover ? '#e2dfd5' : 'transparent'}}>
              <div><div style={{fontSize: 50, fontWeight: 800, color: NIGHT, lineHeight: 1.05}}>{name}</div><div style={{fontSize: 30, color: '#6b6b72'}}>{maker}</div></div>
              {name === model && <Tick />}
            </div>
          ))}
        </div>
      )}
      {/* pulse around the pill before each tap, so the eye goes there first */}
      {[[6, P.tap1], [P.tap2 - 14, P.tap2]].map(([a, b]) => f >= a && f < b && (
        <div key={a} style={{position: 'absolute', left: 80, top: 1178, width: 312, height: 116, borderRadius: 999, border: `8px solid ${VIOLET}`, boxShadow: `0 0 40px ${VIOLET}`,
          opacity: 0.75 + 0.25 * Math.sin((f - a) / 3), transform: `scale(${1.06 + 0.05 * Math.sin((f - a) / 3)})`}} />
      ))}
      <Tap at={P.tap1} x={PILL.x} y={PILL.y} />
      <Tap at={P.tapClaude} x={330} y={ROW(1)} />
      <Tap at={P.send - 4} x={800} y={1150} />
      <Tap at={P.tap2} x={PILL.x} y={PILL.y} />
      <Tap at={P.tapGemini} x={330} y={ROW(3)} />
    </AbsoluteFill>
  );
};

const HOOKS = {
  a: {one: <>GPT, Claude<br />or Gemini?</>, two: <>Use any<br />of them.</>},
  b: {one: <>No card?<br />No problem.</>, two: <>Smart answers.<br />From KES 5.</>},
};

const Episode: React.FC<{hook: 'a' | 'b'}> = ({hook}) => (
  <AbsoluteFill style={{background: '#000'}}>
    <style>{fontCss}</style>
    <Sequence from={0} durationInFrames={45}><Still src="a9s1.png" dur={45} from={[1.08, 0, 0]} to={[1.16, -1, 1]} /><Flash /><Punch size={140} top={320}>{HOOKS[hook].one}</Punch></Sequence>
    <Sequence from={45} durationInFrames={45}><Still src="a9s2.png" dur={45} from={[1.04, 0, 0]} to={[1.12, 0, 2]} pos="50% 30%" /><Punch size={140} top={320}>{HOOKS[hook].two}</Punch></Sequence>
    <Sequence from={90} durationInFrames={240}><PickModel /></Sequence>
    <Sequence from={330} durationInFrames={45}><Still src="a9s4.png" dur={45} from={[1.05, 0, 0]} to={[1.1, 0, 1]} pos="50% 35%" /><Flash /><Punch size={170} top={300}>Got it.</Punch></Sequence>
    <Sequence from={375} durationInFrames={60}><Pay amount="KES 5" /><Punch size={90} top={260}>From</Punch><Punch font="pix" size={260} top={360}>KES 5</Punch><Punch size={96} top={1240} delay={20}>Per answer.</Punch></Sequence>
    <Sequence from={435} durationInFrames={45}><Still src="a9s5.png" dur={45} from={[1.04, 0, 0]} to={[1.1, -1, 0]} pos="50% 40%" /><Punch size={140} top={300}>No card.<br />No monthly bill.</Punch></Sequence>
    <Sequence from={480} durationInFrames={75}><EndCard tag="GPT · CLAUDE · GEMINI · FROM KES 5" /></Sequence>
    <Sfx />
  </AbsoluteFill>
);

export const Ad9a: React.FC = () => <Episode hook="a" />;
export const Ad9b: React.FC = () => <Episode hook="b" />;
