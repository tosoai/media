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

// Bursary letter drawn in code (illustrative, not a real Toso screen)
const Ln: React.FC<{w: number; mt?: number}> = ({w, mt = 14}) => <div style={{height: 14, width: w, background: '#dcdad3', borderRadius: 7, marginTop: mt}} />;
const Letter: React.FC = () => (
  <div style={{background: '#fff', height: 620, borderRadius: '0 0 24px 24px', padding: '40px 48px', color: NIGHT, fontFamily: 'Manrope', position: 'relative'}}>
    <div style={{display: 'flex', justifyContent: 'space-between'}}><div><Ln w={220} mt={0} /><Ln w={180} mt={10} /></div><div style={{fontFamily: 'Silkscreen', fontSize: 22, color: '#9d9ca6'}}>7 NOV</div></div>
    <div style={{fontSize: 24, fontWeight: 600, marginTop: 30, color: '#55545c'}}>The Chairperson, Bursary Committee</div>
    <div style={{fontSize: 44, fontWeight: 800, letterSpacing: '-0.035em', marginTop: 16, lineHeight: 1.05}}>Application for<br />bursary support</div>
    <Ln w={600} mt={30} /><Ln w={560} /><Ln w={590} /><Ln w={420} />
    <Ln w={580} mt={30} /><Ln w={540} /><Ln w={360} />
    <div style={{fontSize: 24, fontWeight: 600, marginTop: 30}}>Yours faithfully,</div>
    <div style={{position: 'absolute', right: 44, bottom: 44, width: 30, height: 30, background: VIOLET, borderRadius: 4}} />
  </div>
);

// Episode 18: county bursary closes at 5, no application letter (document KES 5). Second-year student, short sponge-twist coils with taper fade, round wire glasses, forest-green hoodie, bright hostel room. Saturday.
export const Ad18: React.FC = () => (
  <AbsoluteFill style={{background: '#000'}}>
    <style>{fontCss}</style>
    <Sequence from={0} durationInFrames={45}><Still src="a18s1.png" dur={45} from={[1.08, 0, 0]} to={[1.16, -1, 1]} pos="50% 40%" /><Flash /><Punch size={150} top={260} delay={-4}>Bursary<br />closes at 5.</Punch><Notification app="MESSAGES" from="Class Rep" text="Bursary forms close TODAY 5pm. Attach your application letter or it won't be considered." /></Sequence>
    <Sequence from={45} durationInFrames={45}><Still src="a18s2.png" dur={45} from={[1.04, 0, 0]} to={[1.12, 0, 2]} pos="50% 30%" /><Punch size={150} top={1150}>No letter.</Punch></Sequence>
    <Sequence from={90} durationInFrames={45}><Still src="a18s3.png" dur={45} from={[1.06, 0, 0]} to={[1.16, 0, 2]} pos="50% 40%" /><Punch font="pix" size={260} top={1150}>4:30</Punch><Punch size={110} top={1440} delay={4}>30 minutes.</Punch></Sequence>
    <Sequence from={135} durationInFrames={120}><Typing line="Bursary application letter for my county: second-year BCom, fees balance, why I need support, my results" chip="results-slip.pdf" /><Punch size={150} top={250}>One line.</Punch></Sequence>
    <Sequence from={255} durationInFrames={60}><FileOpen header="Bursary-Letter.docx · 1 page"><Letter /></FileOpen><Punch size={170} top={250} color={NIGHT} shadow={false} delay={4}>Done.</Punch></Sequence>
    <Sequence from={315} durationInFrames={60}><Still src="a18s4.png" dur={60} from={[1.05, 0, 0]} to={[1.1, 0, 1]} pos="50% 35%" /><Flash /><Punch size={170} top={250}>Ready.</Punch><Punch font="pix" size={250} top={1150} delay={6}>4:38</Punch></Sequence>
    <Sequence from={375} durationInFrames={45}><Pay amount="KES 5" /><Punch font="pix" size={240} top={300}>KES 5</Punch><Punch size={96} top={1240} delay={18}>That's it.</Punch></Sequence>
    <Sequence from={420} durationInFrames={60}><Still src="a18s5.png" dur={60} from={[1.04, 0, 0]} to={[1.1, -1, 0]} pos="50% 40%" /><Punch size={130} top={200}>Saturday,<br />saved.</Punch></Sequence>
    <Sequence from={480} durationInFrames={75}><EndCard tag="LETTERS FROM KES 5 · M-PESA" /></Sequence>
    <Sfx />
  </AbsoluteFill>
);
