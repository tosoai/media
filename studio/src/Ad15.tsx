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

// company profile drawn in code (illustrative, not a real Toso screen)
const Line: React.FC<{w: string; mt?: number}> = ({w, mt = 12}) => <div style={{height: 13, width: w, background: '#dcdad3', borderRadius: 7, marginTop: mt}} />;
const Stat: React.FC<{n: string; l: string}> = ({n, l}) => (
  <div style={{flex: 1, border: '1px solid #e6e4de', borderRadius: 10, padding: '14px 16px'}}>
    <div style={{fontFamily: 'Silkscreen', fontSize: 34}}>{n}</div><div style={{fontSize: 20, color: '#77767e', marginTop: 4}}>{l}</div>
  </div>
);
const ProfileDoc: React.FC = () => (
  <div style={{background: '#fff', height: 620, borderRadius: '0 0 24px 24px', padding: 52, color: NIGHT, fontFamily: 'Manrope'}}>
    <div style={{fontFamily: 'Silkscreen', fontSize: 22, color: '#9d9ca6'}}>TENDER · COUNTY OFFICES</div>
    <div style={{fontSize: 52, fontWeight: 800, letterSpacing: '-0.03em', marginTop: 10, lineHeight: 1.05}}>Company profile</div>
    <div style={{marginTop: 22, fontSize: 26, fontWeight: 800}}>Who we are</div><Line w="94%" /><Line w="80%" />
    <div style={{marginTop: 22, display: 'flex', gap: 14}}><Stat n="9" l="years trading" /><Stat n="40+" l="fit-outs done" /><Stat n="12" l="staff" /></div>
    <div style={{marginTop: 24, display: 'flex', alignItems: 'center', gap: 14}}>
      <div style={{fontSize: 26, fontWeight: 800}}>Past projects</div>
      <div style={{height: 26, width: 26, background: VIOLET, borderRadius: 4}} />
    </div>
    <Line w="88%" /><Line w="70%" />
  </div>
);

// Episode 15: tender closes at 12, company profile missing (document KES 5). Interior fit-out business owner, short cropped natural hair, gold studs, cobalt-blue shirt, bright design studio with fabric swatches. Wednesday.
export const Ad15: React.FC = () => (
  <AbsoluteFill style={{background: '#000'}}>
    <style>{fontCss}</style>
    <Sequence from={0} durationInFrames={45}><Still src="a15s1.png" dur={45} from={[1.08, 0, 0]} to={[1.16, -1, 1]} pos="50% 40%" /><Flash /><Punch size={150} top={260} delay={-4}>Tender closes<br />at 12.</Punch><Notification app="MESSAGES" from="Site Partner" text="Bids close at noon. We still don't have the company profile." /></Sequence>
    <Sequence from={45} durationInFrames={45}><Still src="a15s2.png" dur={45} from={[1.04, 0, 0]} to={[1.12, 0, 2]} pos="50% 30%" /><Punch size={140} top={300}>No company<br />profile.</Punch></Sequence>
    <Sequence from={90} durationInFrames={45}><Still src="a15s3.png" dur={45} from={[1.06, 0, 0]} to={[1.16, 0, 2]} pos="50% 40%" /><Punch font="pix" size={260} top={1020} color={NIGHT} shadow={false}>10:20</Punch><Punch size={110} top={1290} delay={4} color={NIGHT} shadow={false}>100 minutes.</Punch></Sequence>
    <Sequence from={135} durationInFrames={120}><Typing line="Company profile for a fit-out tender: who we are, services, past projects, team, contacts" chip="old-projects.jpg" /><Punch size={150} top={250}>One line.</Punch></Sequence>
    <Sequence from={255} durationInFrames={60}><FileOpen header="Company-Profile.docx · 8 pages"><ProfileDoc /></FileOpen><Punch size={170} top={250} color={NIGHT} shadow={false} delay={4}>Done.</Punch></Sequence>
    <Sequence from={315} durationInFrames={60}><Still src="a15s4.png" dur={60} from={[1.05, 0, 0]} to={[1.1, 0, 1]} pos="50% 35%" /><Flash /><Punch size={170} top={250}>Printed.</Punch><Punch font="pix" size={250} top={1150} delay={6}>10:34</Punch></Sequence>
    <Sequence from={375} durationInFrames={45}><Pay amount="KES 5" /><Punch font="pix" size={240} top={300}>KES 5</Punch><Punch size={96} top={1240} delay={18}>That's it.</Punch></Sequence>
    <Sequence from={420} durationInFrames={60}><Still src="a15s5.png" dur={60} from={[1.04, 0, 0]} to={[1.1, -1, 0]} pos="50% 40%" /><Punch size={130} top={200}>In before noon.</Punch></Sequence>
    <Sequence from={480} durationInFrames={75}><EndCard tag="DOCUMENTS FROM KES 5 · M-PESA" /></Sequence>
    <Sfx />
  </AbsoluteFill>
);
