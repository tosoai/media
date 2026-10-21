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
  <Sequence from={92}><Audio src={staticFile('sfx/tick.wav')} /></Sequence>
  <Sequence from={107}><Audio src={staticFile('sfx/tick.wav')} /></Sequence>
  <Sequence from={122}><Audio src={staticFile('sfx/tick.wav')} /></Sequence>
  <Sequence from={160}><Audio src={staticFile('sfx/ping.wav')} volume={0.6} /></Sequence>
  <Sequence from={190}><Audio src={staticFile('sfx/ping.wav')} volume={0.6} /></Sequence>
  <Sequence from={220}><Audio src={staticFile('sfx/ping.wav')} volume={0.6} /></Sequence>
  <Sequence from={349}><Audio src={staticFile('sfx/chime.wav')} /></Sequence>
</>);

const MENU = [['DeepSeek', 'DeepSeek'], ['Claude', 'Anthropic'], ['GPT', 'OpenAI'], ['Gemini', 'Google']];
const Bar: React.FC<{w: string}> = ({w}) => <div style={{height: 16, width: w, background: 'rgba(245,243,238,.22)', borderRadius: 8, marginTop: 14}} />;
const Tick: React.FC = () => <div style={{width: 14, height: 26, borderRight: `5px solid ${VIOLET}`, borderBottom: `5px solid ${VIOLET}`, transform: 'rotate(45deg)', marginTop: -8}} />;

// The real Toso composer: a model pill opens a menu (DeepSeek, Claude, GPT, Gemini); pick one, ask, it answers.
// Then switch to another model for the follow-up. One model per message, exactly as the product works.
const PickModel: React.FC = () => {
  const f = useCurrentFrame(); const {fps} = useVideoConfig();
  const model = f < 24 ? 'DeepSeek' : f < 90 ? 'Claude' : 'Gemini';
  const menuOpen = (f >= 8 && f < 30) || (f >= 76 && f < 96);
  const hover = f >= 76 ? (f >= 86 ? 'Gemini' : 'Claude') : f >= 18 ? 'Claude' : 'DeepSeek';
  const q1 = 'Explain inflation in 3 points';
  const typed = f >= 32 && f < 58 ? q1.slice(0, Math.floor(interpolate(f, [32, 52], [0, q1.length], {extrapolateRight: 'clamp'}))) : '';
  const card = (from: number) => spring({frame: f - from, fps, config: {damping: 16, mass: 0.6}});
  const a1 = card(64), u2 = card(98), a2 = card(104);
  const Msg: React.FC<{p: number; top: number; children: React.ReactNode; user?: boolean}> = ({p, top, children, user}) => (
    <div style={{position: 'absolute', top, left: user ? 'auto' : 60, right: user ? 150 : 150, maxWidth: user ? 640 : undefined, opacity: p, transform: `translateY(${(1 - p) * 30}px)`,
      background: user ? '#2a2a36' : '#16161f', border: user ? 'none' : '1px solid rgba(255,255,255,.1)', color: PAPER, fontSize: 36,
      borderRadius: user ? '26px 26px 6px 26px' : '6px 26px 26px 26px', padding: user ? '20px 28px' : '20px 28px 24px'}}>{children}</div>
  );
  const Answer: React.FC<{name: string}> = ({name}) => (<>
    <div style={{fontFamily: 'Silkscreen', fontSize: 24, color: '#c9c8d0'}}>{name.toUpperCase()}</div><Bar w="94%" /><Bar w="86%" /><Bar w="62%" />
  </>);
  return (
    <AbsoluteFill style={{background: NIGHT, fontFamily: 'Manrope'}}>
      <Msg p={card(56)} top={500} user>{q1}</Msg>
      <Msg p={a1} top={610}><Answer name="Claude" /></Msg>
      <Msg p={u2} top={800} user>Simpler, please</Msg>
      <Msg p={a2} top={910}><Answer name="Gemini" /></Msg>
      {/* composer */}
      <div style={{position: 'absolute', left: 60, right: 150, top: 1180, background: '#16161f', border: '1px solid rgba(255,255,255,.12)', borderRadius: 32, padding: '28px 30px'}}>
        <div style={{fontSize: 38, color: typed ? PAPER : '#77768a', minHeight: 52}}>{typed || 'Ask anything'}</div>
        <div style={{marginTop: 22, display: 'flex', gap: 16, alignItems: 'center'}}>
          <div style={{fontSize: 32, fontWeight: 600, color: PAPER, padding: '12px 26px', borderRadius: 999, border: `2px solid ${menuOpen ? PAPER : 'rgba(255,255,255,.25)'}`, background: menuOpen ? '#2a2a36' : 'transparent'}}>{model} ▾</div>
          <div style={{fontSize: 30, color: '#c9c8d0', padding: '12px 24px', borderRadius: 999, border: '2px solid rgba(255,255,255,.15)'}}>Quick</div>
        </div>
      </div>
      {/* the menu opens upward from the pill */}
      {menuOpen && (
        <div style={{position: 'absolute', left: 60, width: 640, bottom: 1920 - 1170, background: PAPER, borderRadius: 28, padding: 12, boxShadow: '0 30px 60px rgba(0,0,0,.4)'}}>
          {MENU.map(([name, maker]) => {
            const on = name === hover;
            return (
              <div key={name} style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px 26px', borderRadius: 20, background: on ? '#e6e3da' : 'transparent'}}>
                <div><div style={{fontSize: 38, fontWeight: 800, color: NIGHT}}>{name}</div><div style={{fontSize: 26, color: '#6b6b72'}}>{maker}</div></div>
                {name === model && <Tick />}
              </div>
            );
          })}
        </div>
      )}
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
    <Sequence from={90} durationInFrames={45}><Still src="a9s3.png" dur={45} from={[1.06, 0, 0]} to={[1.16, 0, 2]} pos="50% 40%" /><Punch size={150} top={320}>Pick your model.</Punch></Sequence>
    <Sequence from={135} durationInFrames={120}><PickModel /><Punch size={150} top={250}>One app.</Punch></Sequence>
    <Sequence from={255} durationInFrames={60}><Still src="a9s4.png" dur={60} from={[1.05, 0, 0]} to={[1.1, 0, 1]} pos="50% 35%" /><Flash /><Punch size={170} top={300}>Got it.</Punch></Sequence>
    <Sequence from={315} durationInFrames={60}><Pay amount="KES 5" /><Punch size={90} top={260}>From</Punch><Punch font="pix" size={260} top={360}>KES 5</Punch><Punch size={96} top={1240} delay={20}>Per answer.</Punch></Sequence>
    <Sequence from={375} durationInFrames={105}><Still src="a9s5.png" dur={105} from={[1.04, 0, 0]} to={[1.12, -1, 0]} pos="50% 40%" /><Punch size={150} top={300}>No card.</Punch><Punch size={110} top={470} delay={45}>No monthly bill.</Punch></Sequence>
    <Sequence from={480} durationInFrames={75}><EndCard tag="GPT · CLAUDE · GEMINI · FROM KES 5" /></Sequence>
    <Sfx />
  </AbsoluteFill>
);

export const Ad9a: React.FC = () => <Episode hook="a" />;
export const Ad9b: React.FC = () => <Episode hook="b" />;
