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

const Bar: React.FC<{w: string; c?: string; h?: number; mt?: number}> = ({w, c = '#dcdad3', h = 8, mt = 8}) => <div style={{height: h, width: w, background: c, borderRadius: h / 2, marginTop: mt}} />;
const Thumb: React.FC<{dark?: boolean; children: React.ReactNode}> = ({dark, children}) => (
  <div style={{background: dark ? NIGHT : PAPER, borderRadius: 10, padding: 18, height: 150, border: '1px solid #e2e0d9'}}>{children}</div>
);
const DeckGrid: React.FC = () => (
  <div style={{background: '#fff', height: 620, borderRadius: '0 0 24px 24px', padding: 32, fontFamily: 'Manrope'}}>
    <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 18}}>
      <Thumb dark><div style={{fontFamily: 'Silkscreen', fontSize: 14, color: '#9d9ca6'}}>GROUP 4</div><div style={{color: PAPER, fontWeight: 800, fontSize: 30, lineHeight: 1.05, marginTop: 8, letterSpacing: '-0.02em'}}>Mobile money in rural Kenya</div></Thumb>
      <Thumb><div style={{fontWeight: 800, fontSize: 22, color: NIGHT}}>The question</div><Bar w="90%" /><Bar w="75%" /><Bar w="60%" /></Thumb>
      <Thumb><div style={{fontWeight: 800, fontSize: 22, color: NIGHT}}>What we found</div>
        <div style={{display: 'flex', alignItems: 'flex-end', gap: 10, height: 80, marginTop: 10}}>{[40, 62, 50, 78].map((h, i) => <div key={i} style={{width: 34, height: h, background: i === 3 ? VIOLET : '#c9c8d0', borderRadius: 4}} />)}</div></Thumb>
      <Thumb><div style={{fontWeight: 800, fontSize: 22, color: NIGHT}}>Three takeaways</div><Bar w="85%" /><Bar w="80%" /><Bar w="55%" /></Thumb>
      <Thumb><div style={{fontWeight: 800, fontSize: 22, color: NIGHT}}>Who said what</div><Bar w="70%" /><Bar w="88%" /></Thumb>
      <Thumb dark><div style={{color: PAPER, fontWeight: 800, fontSize: 30, marginTop: 30}}>Questions?</div></Thumb>
    </div>
  </div>
);

// Episode 5: group presentation at 8am, nobody made the slides (deck)
export const Ad5: React.FC = () => (
  <AbsoluteFill style={{background: '#000'}}>
    <style>{fontCss}</style>
    <Sequence from={0} durationInFrames={45}><Still src="a5s1.png" dur={45} from={[1.08, 0, 0]} to={[1.16, -1, 1]} /><Flash /><Punch font="pix" size={260} top={420}>11:50</Punch><Notification app="GROUP CHAT" from="Group 4 · Marketing" text="Who's doing the slides for 8am? 👀" /></Sequence>
    <Sequence from={45} durationInFrames={45}><Still src="a5s2.png" dur={45} from={[1.04, 0, 0]} to={[1.12, 0, 2]} pos="50% 35%" /><Punch size={160} top={300}>Nobody made<br />the slides.</Punch></Sequence>
    <Sequence from={90} durationInFrames={45}><Still src="a5s3.png" dur={45} from={[1.06, 0, 0]} to={[1.2, 0, 3]} /><Punch font="pix" size={300} top={1000}>8AM</Punch><Punch size={110} top={1320} delay={4}>presentation.</Punch></Sequence>
    <Sequence from={135} durationInFrames={120}><Typing line="Make a 10-slide deck from our group notes: mobile money in rural Kenya" chip="group-notes.docx" /><Punch size={150} top={250}>One line.</Punch></Sequence>
    <Sequence from={255} durationInFrames={60}><FileOpen header="Mobile-Money-Group4.pptx · 10 slides"><DeckGrid /></FileOpen><Punch size={170} top={250} color={NIGHT} shadow={false} delay={4}>Done.</Punch></Sequence>
    <Sequence from={315} durationInFrames={60}><Still src="a5s4.png" dur={60} from={[1.05, 0, 0]} to={[1.1, 0, 1]} pos="50% 40%" /><Flash /><Punch size={170} top={250}>Sorted.</Punch><Punch font="pix" size={250} top={1150} delay={6}>12:04</Punch></Sequence>
    <Sequence from={375} durationInFrames={45}><Pay amount="KES 20" /><Punch font="pix" size={240} top={300}>KES 20</Punch><Punch size={96} top={1240} delay={18}>That's it.</Punch></Sequence>
    <Sequence from={420} durationInFrames={60}><Still src="a5s5.png" dur={60} from={[1.04, 0, 0]} to={[1.1, -1, 0]} pos="50% 40%" /><Punch size={140} top={300}>Group 4,<br />carried.</Punch></Sequence>
    <Sequence from={480} durationInFrames={75}><EndCard tag="DECK KES 20 · FIRST DECK FREE" /></Sequence>
    <Sfx />
  </AbsoluteFill>
);

// Re-cut of episode 2 (CV): new hook, new order, new ending line. Same EndCard.
const Line: React.FC<{w: string; mt?: number}> = ({w, mt = 14}) => <div style={{height: 14, width: w, background: '#dcdad3', borderRadius: 7, marginTop: mt}} />;
const CvDoc: React.FC = () => (
  <div style={{background: '#fff', height: 620, borderRadius: '0 0 24px 24px', padding: 56, color: NIGHT, fontFamily: 'Manrope'}}>
    <div style={{fontSize: 56, fontWeight: 800, letterSpacing: '-0.03em'}}>Brian Otieno</div>
    <div style={{fontSize: 30, color: '#55545c', marginTop: 6}}>Graduate Trainee, Finance</div>
    <div style={{marginTop: 40, fontSize: 26, fontWeight: 800}}>Profile</div><Line w="95%" /><Line w="88%" /><Line w="70%" />
    <div style={{marginTop: 34, fontSize: 26, fontWeight: 800}}>Experience</div><Line w="92%" /><Line w="84%" /><Line w="60%" />
    <div style={{marginTop: 34, fontSize: 26, fontWeight: 800}}>Skills</div><Line w="78%" />
  </div>
);

export const Ad2b: React.FC = () => (
  <AbsoluteFill style={{background: '#000'}}>
    <style>{fontCss}</style>
    <Sequence from={0} durationInFrames={45}><Still src="a2s2.png" dur={45} from={[1.1, 0, 0]} to={[1.18, 0, 2]} pos="50% 35%" /><Flash /><Punch size={150} top={260}>The job closes<br />in 20 minutes.</Punch></Sequence>
    <Sequence from={45} durationInFrames={45}><Still src="a2s1.png" dur={45} from={[1.08, 0, 0]} to={[1.16, -1, 1]} /><Notification app="JOBS" from="Graduate Trainee, Finance" text="Applications close at midnight." /></Sequence>
    <Sequence from={90} durationInFrames={45}><Still src="a2s3.png" dur={45} from={[1.06, 0, 0]} to={[1.2, 0, 3]} /><Punch size={150} top={1060}>CV from<br />2023.</Punch></Sequence>
    <Sequence from={135} durationInFrames={120}><Typing line="Tailor my CV to this advert: Graduate Trainee, Finance" chip="my-CV.docx" /><Punch size={150} top={250}>One line.</Punch></Sequence>
    <Sequence from={255} durationInFrames={60}><FileOpen header="Brian-Otieno-CV.docx · 2 pages"><CvDoc /></FileOpen><Punch size={170} top={250} color={NIGHT} shadow={false} delay={4}>Tailored.</Punch></Sequence>
    <Sequence from={315} durationInFrames={60}><Still src="a2s4.png" dur={60} from={[1.05, 0, 0]} to={[1.1, 0, 1]} pos="50% 40%" /><Flash /><Punch size={170} top={250}>Applied.</Punch><Punch font="pix" size={250} top={1150} delay={6}>11:52</Punch></Sequence>
    <Sequence from={375} durationInFrames={45}><Pay amount="KES 5" /><Punch font="pix" size={260} top={300}>KES 5</Punch><Punch size={96} top={1240} delay={18}>That's it.</Punch></Sequence>
    <Sequence from={420} durationInFrames={60}><Still src="a2s5.png" dur={60} from={[1.04, 0, 0]} to={[1.1, -1, 0]} pos="50% 40%" /><Punch size={120} top={300}>8 minutes<br />to spare.</Punch></Sequence>
    <Sequence from={480} durationInFrames={75}><EndCard tag="CV KES 5 · FIRST DECK FREE" /></Sequence>
    <Sfx ping={59} />
  </AbsoluteFill>
);
