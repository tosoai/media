import React from 'react';
import {AbsoluteFill, Audio, Sequence, staticFile} from 'remotion';
import {fontCss, NIGHT, VIOLET, Still, Punch, Flash, Notification, Typing, FileOpen, Pay, EndCard} from './Kit';

const Sfx: React.FC<{ping?: number}> = ({ping = 14}) => (<>
  <Audio src={staticFile('sfx/bed.wav')} volume={0.9} />
  <Sequence from={ping}><Audio src={staticFile('sfx/ping.wav')} volume={0.8} /></Sequence>
  <Sequence from={92}><Audio src={staticFile('sfx/tick.wav')} /></Sequence>
  <Sequence from={107}><Audio src={staticFile('sfx/tick.wav')} /></Sequence>
  <Sequence from={122}><Audio src={staticFile('sfx/tick.wav')} /></Sequence>
  <Sequence from={409}><Audio src={staticFile('sfx/chime.wav')} /></Sequence>
</>);

// Defence deck drawn in code (illustrative, not a real Toso screen)
const Ln: React.FC<{w: number; mt?: number}> = ({w, mt = 14}) => <div style={{height: 14, width: w, background: '#dcdad3', borderRadius: 7, marginTop: mt}} />;
const Deck: React.FC = () => (
  <div style={{background: '#fff', height: 620, borderRadius: '0 0 24px 24px', padding: '44px 48px', color: NIGHT, fontFamily: 'Manrope', position: 'relative'}}>
    <div style={{fontFamily: 'Silkscreen', fontSize: 22, color: '#9d9ca6'}}>FINAL-YEAR PROJECT · 1/10</div>
    <div style={{fontSize: 58, fontWeight: 800, letterSpacing: '-0.04em', marginTop: 18, lineHeight: 1.02}}>Clinic queue<br />booking system</div>
    <div style={{fontSize: 26, fontWeight: 600, marginTop: 18, color: '#55545c'}}>Problem · Objectives · Method · Results</div>
    <div style={{display: 'flex', alignItems: 'flex-end', gap: 22, marginTop: 44, height: 200}}>
      {[90, 130, 170, 120, 190].map((h, i) => <div key={i} style={{width: 70, height: h, background: i === 4 ? NIGHT : '#dcdad3', borderRadius: 6}} />)}
      <div style={{marginLeft: 20}}><Ln w={180} mt={0} /><Ln w={140} /><Ln w={160} /></div>
    </div>
    <div style={{position: 'absolute', right: 44, bottom: 44, width: 30, height: 30, background: VIOLET, borderRadius: 4}} />
  </div>
);

// Episode 19: final-year project defence at 9am tomorrow, no slides (deck KES 20). IT student, passion twists in a low ponytail, lilac shirt, bright bedsitter. Sunday.
export const Ad19: React.FC = () => (
  <AbsoluteFill style={{background: '#000'}}>
    <style>{fontCss}</style>
    <Sequence from={0} durationInFrames={45}><Still src="a19s1.png" dur={45} from={[1.08, 0, 0]} to={[1.16, -1, 1]} pos="50% 40%" /><Flash /><Punch size={150} top={260} delay={-4}>Defence<br />at 9am.</Punch><Notification app="MESSAGES" from="Class Rep" text="Project defence moved to TOMORROW 9am. 10 minutes each. Slides compulsory." /></Sequence>
    <Sequence from={45} durationInFrames={45}><Still src="a19s2.png" dur={45} from={[1.04, 0, 0]} to={[1.12, 0, 2]} pos="50% 30%" /><Punch size={150} top={1150}>No slides.</Punch></Sequence>
    <Sequence from={90} durationInFrames={45}><Still src="a19s3.png" dur={45} from={[1.06, 0, 0]} to={[1.16, 0, 2]} pos="50% 40%" /><Punch font="pix" size={260} top={1150}>5:40</Punch><Punch size={110} top={1440} delay={4}>40 pages. 0 slides.</Punch></Sequence>
    <Sequence from={135} durationInFrames={120}><Typing line="10-slide defence deck from my project report: problem, objectives, method, results, limitations" chip="project-report.pdf" /><Punch size={150} top={250}>One line.</Punch></Sequence>
    <Sequence from={255} durationInFrames={60}><FileOpen header="Defence.pptx · 10 slides"><Deck /></FileOpen><Punch size={170} top={250} color={NIGHT} shadow={false} delay={4}>Done.</Punch></Sequence>
    <Sequence from={315} durationInFrames={60}><Still src="a19s4.png" dur={60} from={[1.05, 0, 0]} to={[1.1, 0, 1]} pos="50% 35%" /><Flash /><Punch size={170} top={250}>Ready.</Punch><Punch size={120} top={1150} delay={6}>Before dinner.</Punch></Sequence>
    <Sequence from={375} durationInFrames={45}><Pay amount="KES 20" /><Punch font="pix" size={240} top={300}>KES 20</Punch><Punch size={96} top={1240} delay={18}>That's it.</Punch></Sequence>
    <Sequence from={420} durationInFrames={60}><Still src="a19s5.png" dur={60} from={[1.04, 0, 0]} to={[1.1, -1, 0]} pos="50% 40%" /><Punch size={130} top={200}>Defended.</Punch></Sequence>
    <Sequence from={480} durationInFrames={75}><EndCard tag="DECKS FROM KES 20 · M-PESA" /></Sequence>
    <Sfx />
  </AbsoluteFill>
);
