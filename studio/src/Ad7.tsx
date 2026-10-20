import React from 'react';
import {AbsoluteFill, Audio, Sequence, staticFile} from 'remotion';
import {fontCss, NIGHT, PAPER, VIOLET, Still, Punch, Flash, Notification, Typing, FileOpen, Pay, EndCard} from './Kit';
import {DeckGrid} from './Ad5';

const Sfx: React.FC<{ping?: number}> = ({ping = 14}) => (<>
  <Audio src={staticFile('sfx/bed.wav')} volume={0.9} />
  <Sequence from={ping}><Audio src={staticFile('sfx/ping.wav')} volume={0.8} /></Sequence>
  <Sequence from={92}><Audio src={staticFile('sfx/tick.wav')} /></Sequence>
  <Sequence from={107}><Audio src={staticFile('sfx/tick.wav')} /></Sequence>
  <Sequence from={122}><Audio src={staticFile('sfx/tick.wav')} /></Sequence>
  <Sequence from={409}><Audio src={staticFile('sfx/chime.wav')} /></Sequence>
</>);

const Line: React.FC<{w: string; mt?: number}> = ({w, mt = 12}) => <div style={{height: 13, width: w, background: '#dcdad3', borderRadius: 7, marginTop: mt}} />;
const NotesDoc: React.FC = () => (
  <div style={{background: '#fff', height: 620, borderRadius: '0 0 24px 24px', padding: 52, color: NIGHT, fontFamily: 'Manrope'}}>
    <div style={{fontFamily: 'Silkscreen', fontSize: 22, color: '#9d9ca6'}}>CAT 2 · UNITS 3-5</div>
    <div style={{fontSize: 52, fontWeight: 800, letterSpacing: '-0.03em', marginTop: 10, lineHeight: 1.05}}>Revision notes:<br />the heart and lungs</div>
    <div style={{marginTop: 30, fontSize: 26, fontWeight: 800}}>Unit 3 · Key points</div><Line w="94%" /><Line w="82%" /><Line w="66%" />
    <div style={{marginTop: 26, fontSize: 26, fontWeight: 800}}>Unit 4 · Key points</div><Line w="90%" /><Line w="74%" />
    <div style={{marginTop: 26, display: 'flex', alignItems: 'center', gap: 14}}>
      <div style={{fontSize: 26, fontWeight: 800}}>10 practice questions</div>
      <div style={{height: 26, width: 26, background: VIOLET, borderRadius: 4}} />
    </div>
  </div>
);
const Card: React.FC<{children: React.ReactNode}> = ({children}) => <AbsoluteFill style={{background: NIGHT}}>{children}</AbsoluteFill>;

// Episode 7: CAT at 8am, three units to revise tonight (document: revision notes)
export const Ad7: React.FC = () => (
  <AbsoluteFill style={{background: '#000'}}>
    <style>{fontCss}</style>
    <Sequence from={0} durationInFrames={45}><Still src="a7s1.png" dur={45} from={[1.08, 0, 0]} to={[1.16, -1, 1]} /><Flash /><Punch font="pix" size={260} top={420}>10:40</Punch><Notification app="CLASS GROUP" from="Nursing · Year 2" text="Reminder: CAT tomorrow, 8am. Units 3-5." /></Sequence>
    <Sequence from={45} durationInFrames={45}><Still src="a7s2.png" dur={45} from={[1.04, 0, 0]} to={[1.12, 0, 2]} pos="50% 35%" /><Punch size={160} top={300}>Three units.<br />One night.</Punch></Sequence>
    <Sequence from={90} durationInFrames={45}><Still src="a7s3.png" dur={45} from={[1.06, 0, 0]} to={[1.16, 0, 2]} /><Punch font="pix" size={300} top={1180}>8AM</Punch><Punch size={110} top={1500} delay={4}>CAT.</Punch></Sequence>
    <Sequence from={135} durationInFrames={120}><Typing line="Make revision notes for my CAT on units 3 to 5, with 10 practice questions" chip="lecture-notes.pdf" /><Punch size={150} top={250}>One line.</Punch></Sequence>
    <Sequence from={255} durationInFrames={60}><FileOpen header="CAT-Revision-Notes.docx · 6 pages"><NotesDoc /></FileOpen><Punch size={170} top={250} color={NIGHT} shadow={false} delay={4}>Done.</Punch></Sequence>
    <Sequence from={315} durationInFrames={60}><Still src="a7s4.png" dur={60} from={[1.05, 0, 0]} to={[1.1, 0, 1]} pos="50% 40%" /><Flash /><Punch size={170} top={250}>Revised.</Punch><Punch font="pix" size={250} top={1150} delay={6}>11:15</Punch></Sequence>
    <Sequence from={375} durationInFrames={45}><Pay amount="KES 5" /><Punch font="pix" size={260} top={300}>KES 5</Punch><Punch size={96} top={1240} delay={18}>That's it.</Punch></Sequence>
    <Sequence from={420} durationInFrames={60}><Still src="a7s5.png" dur={60} from={[1.04, 0, 0]} to={[1.1, -1, 0]} pos="50% 40%" /><Punch size={140} top={300}>Calm at<br />8am.</Punch></Sequence>
    <Sequence from={480} durationInFrames={75}><EndCard tag="NOTES KES 5 · FIRST DECK FREE" /></Sequence>
    <Sfx />
  </AbsoluteFill>
);

// Re-cut of episode 5 (group deck): text-first hook, new order (skips a5s3), new ending line. Same EndCard.
export const Ad5b: React.FC = () => (
  <AbsoluteFill style={{background: '#000'}}>
    <style>{fontCss}</style>
    <Sequence from={0} durationInFrames={45}><Card><Flash /><Punch size={150} top={560}>Presenting<br />at 8am.</Punch><Punch size={110} top={900} delay={10} color={PAPER}>Who made<br />the slides?</Punch></Card></Sequence>
    <Sequence from={45} durationInFrames={45}><Still src="a5s1.png" dur={45} from={[1.08, 0, 0]} to={[1.16, -1, 1]} /><Notification app="GROUP CHAT" from="Group 4 · Marketing" text="Who's doing the slides for 8am? 👀" /></Sequence>
    <Sequence from={90} durationInFrames={45}><Still src="a5s2.png" dur={45} from={[1.06, 0, 0]} to={[1.14, 0, 2]} pos="50% 35%" /><Punch font="pix" size={260} top={1040}>11:50</Punch><Punch size={110} top={1330} delay={4}>nobody.</Punch></Sequence>
    <Sequence from={135} durationInFrames={120}><Typing line="Make a 10-slide deck from our group notes: mobile money in rural Kenya" chip="group-notes.docx" /><Punch size={150} top={250}>One line.</Punch></Sequence>
    <Sequence from={255} durationInFrames={60}><FileOpen header="Mobile-Money-Group4.pptx · 10 slides"><DeckGrid /></FileOpen><Punch size={170} top={250} color={NIGHT} shadow={false} delay={4}>10 slides.</Punch></Sequence>
    <Sequence from={315} durationInFrames={60}><Still src="a5s4.png" dur={60} from={[1.05, 0, 0]} to={[1.1, 0, 1]} pos="50% 40%" /><Flash /><Punch size={170} top={250}>Posted.</Punch><Punch font="pix" size={250} top={1150} delay={6}>12:04</Punch></Sequence>
    <Sequence from={375} durationInFrames={45}><Pay amount="KES 20" /><Punch font="pix" size={240} top={300}>KES 20</Punch><Punch size={96} top={1240} delay={18}>That's it.</Punch></Sequence>
    <Sequence from={420} durationInFrames={60}><Still src="a5s5.png" dur={60} from={[1.04, 0, 0]} to={[1.1, -1, 0]} pos="50% 40%" /><Punch size={130} top={300}>The group chat<br />went quiet.</Punch></Sequence>
    <Sequence from={480} durationInFrames={75}><EndCard tag="DECK KES 20 · FIRST DECK FREE" /></Sequence>
    <Sfx ping={59} />
  </AbsoluteFill>
);
