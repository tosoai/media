import React from 'react';
import {AbsoluteFill, Audio, Sequence, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';
import {fontCss, NIGHT, PAPER, VIOLET, mark, Still, Punch, Flash, Pay, EndCard} from './Kit';

/*
 * Episode 9: "Ask all three" (the models + M-Pesa angle). Student in a Nairobi café,
 * twists + round glasses + mustard sweater. Matches the landing hero
 * ("GPT, Claude and Gemini. One app."). Model names in type only, never their logos.
 * Two hooks share one body: Ad9a (choice) and Ad9b (payment).
 */

const Sfx: React.FC = () => (<>
  <Audio src={staticFile('sfx/bed.wav')} volume={0.9} />
  <Sequence from={92}><Audio src={staticFile('sfx/tick.wav')} /></Sequence>
  <Sequence from={107}><Audio src={staticFile('sfx/tick.wav')} /></Sequence>
  <Sequence from={122}><Audio src={staticFile('sfx/tick.wav')} /></Sequence>
  <Sequence from={160}><Audio src={staticFile('sfx/ping.wav')} volume={0.6} /></Sequence>
  <Sequence from={190}><Audio src={staticFile('sfx/ping.wav')} volume={0.6} /></Sequence>
  <Sequence from={220}><Audio src={staticFile('sfx/ping.wav')} volume={0.6} /></Sequence>
  <Sequence from={349}><Audio src={staticFile('sfx/chime.wav')} /></Sequence>
</>);

const MODELS = ['GPT', 'Claude', 'Gemini'];
const Bar: React.FC<{w: string}> = ({w}) => <div style={{height: 16, width: w, background: 'rgba(245,243,238,.22)', borderRadius: 8, marginTop: 14}} />;

// The Toso chat: one question, then the model chip moves GPT -> Claude -> Gemini and an answer lands for each.
const AskAllThree: React.FC = () => {
  const f = useCurrentFrame(); const {fps} = useVideoConfig();
  const q = 'Explain inflation in 3 points for my presentation';
  const n = Math.floor(interpolate(f, [4, 22], [0, q.length], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}));
  const starts = [25, 55, 85];
  const active = f < 55 ? 0 : f < 85 ? 1 : 2;
  return (
    <AbsoluteFill style={{background: NIGHT, fontFamily: 'Manrope'}}>
      <div style={{position: 'absolute', left: 60, top: 470}} dangerouslySetInnerHTML={{__html: mark('logo', PAPER, 130, PAPER)}} />
      <div style={{position: 'absolute', left: 60, right: 60, top: 600, display: 'flex', gap: 18}}>
        {MODELS.map((m, i) => (
          <div key={m} style={{fontSize: 36, fontWeight: 800, padding: '14px 30px', borderRadius: 999,
            background: i === active ? PAPER : 'transparent', color: i === active ? NIGHT : '#c9c8d0',
            border: `2px solid ${i === active ? PAPER : 'rgba(255,255,255,.22)'}`}}>{m}</div>
        ))}
      </div>
      <div style={{position: 'absolute', right: 60, top: 720, maxWidth: 760, background: '#2a2a36', color: PAPER, fontSize: 38, lineHeight: 1.3, padding: '24px 30px', borderRadius: '28px 28px 6px 28px'}}>
        {q.slice(0, n)}
      </div>
      {MODELS.map((m, i) => {
        const p = spring({frame: f - starts[i], fps, config: {damping: 16, mass: 0.6}});
        return (
          <div key={m} style={{position: 'absolute', left: 60, right: 140, top: 900 + i * 250, opacity: p, transform: `translateY(${(1 - p) * 40}px)`,
            background: '#16161f', border: '1px solid rgba(255,255,255,.1)', borderRadius: '6px 28px 28px 28px', padding: '22px 30px 26px'}}>
            <div style={{display: 'flex', alignItems: 'center', gap: 12, fontFamily: 'Silkscreen', fontSize: 26, color: '#c9c8d0'}}>
              {m.toUpperCase()}
            </div>
            <Bar w="94%" /><Bar w="88%" /><Bar w={['70%', '82%', '64%'][i]} />
          </div>
        );
      })}
    </AbsoluteFill>
  );
};

const HOOKS = {
  a: {one: <>GPT, Claude<br />or Gemini?</>, two: 'Why choose?'},
  b: {one: <>No card?<br />No problem.</>, two: <>Smart answers.<br />From KES 5.</>},
};

const Episode: React.FC<{hook: 'a' | 'b'}> = ({hook}) => (
  <AbsoluteFill style={{background: '#000'}}>
    <style>{fontCss}</style>
    <Sequence from={0} durationInFrames={45}><Still src="a9s1.png" dur={45} from={[1.08, 0, 0]} to={[1.16, -1, 1]} /><Flash /><Punch size={140} top={320}>{HOOKS[hook].one}</Punch></Sequence>
    <Sequence from={45} durationInFrames={45}><Still src="a9s2.png" dur={45} from={[1.04, 0, 0]} to={[1.12, 0, 2]} pos="50% 30%" /><Punch size={140} top={320}>{HOOKS[hook].two}</Punch></Sequence>
    <Sequence from={90} durationInFrames={45}><Still src="a9s3.png" dur={45} from={[1.06, 0, 0]} to={[1.16, 0, 2]} pos="50% 40%" /><Punch size={150} top={320}>Ask all three.</Punch></Sequence>
    <Sequence from={135} durationInFrames={120}><AskAllThree /><Punch size={150} top={250}>One app.</Punch></Sequence>
    <Sequence from={255} durationInFrames={60}><Still src="a9s4.png" dur={60} from={[1.05, 0, 0]} to={[1.1, 0, 1]} pos="50% 35%" /><Flash /><Punch size={170} top={300}>Got it.</Punch></Sequence>
    <Sequence from={315} durationInFrames={60}><Pay amount="KES 5" /><Punch size={90} top={260}>From</Punch><Punch font="pix" size={260} top={360}>KES 5</Punch><Punch size={96} top={1240} delay={20}>Per answer.</Punch></Sequence>
    <Sequence from={375} durationInFrames={105}><Still src="a9s5.png" dur={105} from={[1.04, 0, 0]} to={[1.12, -1, 0]} pos="50% 40%" /><Punch size={150} top={300}>No card.</Punch><Punch size={110} top={470} delay={45}>No monthly bill.</Punch></Sequence>
    <Sequence from={480} durationInFrames={75}><EndCard tag="GPT · CLAUDE · GEMINI · FROM KES 5" /></Sequence>
    <Sfx />
  </AbsoluteFill>
);

export const Ad9a: React.FC = () => <Episode hook="a" />;
export const Ad9b: React.FC = () => <Episode hook="b" />;
