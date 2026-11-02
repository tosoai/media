import React from 'react';
import {AbsoluteFill, Audio, Sequence, staticFile} from 'remotion';
import {fontCss, NIGHT, PAPER, VIOLET, Still, Punch, Flash, Notification, Typing, FileOpen, Pay, EndCard} from './Kit';

const Sfx: React.FC<{ping?: number}> = ({ping = 14}) => (<>
  <Audio src={staticFile('sfx/bed.wav')} volume={0.9} />
  <Sequence from={ping}><Audio src={staticFile('sfx/ping.wav')} volume={0.8} /></Sequence>
  <Sequence from={92}><Audio src={staticFile('sfx/tick.wav')} /></Sequence>
  <Sequence from={107}><Audio src={staticFile('sfx/tick.wav')} /></Sequence>
  <Sequence from={122}><Audio src={staticFile('sfx/tick.wav')} /></Sequence>
  <Sequence from={409}><Audio src={staticFile('sfx/chime.wav')} /></Sequence>
</>);

// four slide thumbnails drawn in code (illustrative, not a real Toso screen)
const Thumb: React.FC<{dark?: boolean; k: string; t: string; children?: React.ReactNode}> = ({dark, k, t, children}) => (
  <div style={{background: dark ? NIGHT : '#fff', color: dark ? PAPER : NIGHT, borderRadius: 10, border: '1px solid #e6e4de', padding: '18px 20px', height: 230, position: 'relative', overflow: 'hidden'}}>
    <div style={{fontFamily: 'Silkscreen', fontSize: 16, color: '#9d9ca6'}}>{k}</div>
    <div style={{fontSize: 30, fontWeight: 800, lineHeight: 1.02, letterSpacing: '-0.03em', marginTop: 10}}>{t}</div>
    {children}
  </div>
);
const Bar: React.FC<{w: number; c?: string}> = ({w, c = '#dcdad3'}) => <div style={{height: 16, width: w, background: c, borderRadius: 4, marginTop: 8}} />;
const PitchDeck: React.FC = () => (
  <div style={{background: '#f1efe9', height: 540, borderRadius: '0 0 24px 24px', padding: 28, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20}}>
    <Thumb dark k="CLIENT PITCH · 10AM" t="Rooftop solar for your shop"><div style={{position: 'absolute', right: 18, bottom: 18, width: 22, height: 22, background: VIOLET, borderRadius: 4}} /></Thumb>
    <Thumb k="02 · YOUR BILL" t="Power costs, today"><div style={{display: 'flex', alignItems: 'flex-end', gap: 10, marginTop: 20}}>{[70, 44, 30, 22, 14].map((h, i) => <div key={i} style={{width: 34, height: h, background: i === 0 ? NIGHT : '#cfccc4', borderRadius: 3}} />)}</div></Thumb>
    <Thumb k="03 · THE SYSTEM" t="Panels, battery, install"><Bar w={200} /><Bar w={160} /><Bar w={120} /></Thumb>
    <Thumb k="04 · NEXT STEPS" t="Site visit this week"><div style={{display: 'flex', gap: 8, marginTop: 22}}>{[1, 2, 3, 4, 5, 6].map((i) => <div key={i} style={{width: 28, height: 28, borderRadius: 14, background: i < 3 ? NIGHT : '#dcdad3'}} />)}</div></Thumb>
  </div>
);

// Episode 14: client pitch at 10, no deck (deck KES 20). Solar-equipment sales executive, bantu knots, terracotta blazer over cream knit, bright office with solar panels in the window. Tuesday.
export const Ad14: React.FC = () => (
  <AbsoluteFill style={{background: '#000'}}>
    <style>{fontCss}</style>
    <Sequence from={0} durationInFrames={45}><Still src="a14s1.png" dur={45} from={[1.08, 0, 0]} to={[1.16, -1, 1]} pos="50% 40%" /><Flash /><Punch size={150} top={260} delay={-4}>Pitch at 10.<br />No deck.</Punch><Notification app="MESSAGES" from="Sales Manager" text="Client moved the pitch to 10am today. Bring slides." /></Sequence>
    <Sequence from={45} durationInFrames={45}><Still src="a14s2.png" dur={45} from={[1.04, 0, 0]} to={[1.12, 0, 2]} pos="50% 30%" /><Punch size={140} top={300}>Prices. System.<br />Next steps.</Punch></Sequence>
    <Sequence from={90} durationInFrames={45}><Still src="a14s3.png" dur={45} from={[1.06, 0, 0]} to={[1.16, 0, 2]} pos="50% 40%" /><Punch font="pix" size={260} top={1020} color={NIGHT} shadow={false}>8:40</Punch><Punch size={110} top={1290} delay={4} color={NIGHT} shadow={false}>80 minutes.</Punch></Sequence>
    <Sequence from={135} durationInFrames={120}><Typing line="Client pitch deck for rooftop solar from my notes: their power bill, the system, price, next steps" chip="pitch-notes.jpg" /><Punch size={150} top={250}>One line.</Punch></Sequence>
    <Sequence from={255} durationInFrames={60}><FileOpen header="Client-Pitch.pptx · 9 slides"><PitchDeck /></FileOpen><Punch size={170} top={250} color={NIGHT} shadow={false} delay={4}>Done.</Punch></Sequence>
    <Sequence from={315} durationInFrames={60}><Still src="a14s4.png" dur={60} from={[1.05, 0, 0]} to={[1.1, 0, 1]} pos="50% 35%" /><Flash /><Punch size={170} top={250}>Ready.</Punch><Punch font="pix" size={250} top={1150} delay={6}>8:52</Punch></Sequence>
    <Sequence from={375} durationInFrames={45}><Pay amount="KES 20" /><Punch font="pix" size={240} top={300}>KES 20</Punch><Punch size={96} top={1240} delay={18}>That's it.</Punch></Sequence>
    <Sequence from={420} durationInFrames={60}><Still src="a14s5.png" dur={60} from={[1.04, 0, 0]} to={[1.1, -1, 0]} pos="50% 40%" /><Punch size={130} top={200}>Deal on the table.</Punch></Sequence>
    <Sequence from={480} durationInFrames={75}><EndCard tag="DECKS FROM KES 20 · FIRST DECK FREE" /></Sequence>
    <Sfx />
  </AbsoluteFill>
);
