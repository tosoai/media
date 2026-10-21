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

const Line: React.FC<{w: string; mt?: number}> = ({w, mt = 12}) => <div style={{height: 13, width: w, background: '#dcdad3', borderRadius: 7, marginTop: mt}} />;
const Row: React.FC<{a: string; b: string}> = ({a, b}) => (
  <div style={{display: 'flex', justifyContent: 'space-between', fontSize: 26, padding: '10px 0', borderBottom: '1px solid #e6e4de'}}><span>{a}</span><span style={{fontFamily: 'Silkscreen', fontSize: 24}}>{b}</span></div>
);
const ProposalDoc: React.FC = () => (
  <div style={{background: '#fff', height: 620, borderRadius: '0 0 24px 24px', padding: 52, color: NIGHT, fontFamily: 'Manrope'}}>
    <div style={{fontFamily: 'Silkscreen', fontSize: 22, color: '#9d9ca6'}}>WEDDING · 150 GUESTS</div>
    <div style={{fontSize: 52, fontWeight: 800, letterSpacing: '-0.03em', marginTop: 10, lineHeight: 1.05}}>Catering proposal</div>
    <div style={{marginTop: 24, fontSize: 26, fontWeight: 800}}>Menu</div><Line w="92%" /><Line w="78%" />
    <div style={{marginTop: 22}}><Row a="Buffet, per guest" b="KES ···" /><Row a="Service staff" b="KES ···" /><Row a="Total" b="KES ···" /></div>
    <div style={{marginTop: 22, display: 'flex', alignItems: 'center', gap: 14}}>
      <div style={{fontSize: 26, fontWeight: 800}}>Terms and deposit</div>
      <div style={{height: 26, width: 26, background: VIOLET, borderRadius: 4}} />
    </div>
  </div>
);

// Episode 8: proposal due at 12 (document: catering proposal). Caterer, cornrows, white shirt + navy apron.
export const Ad8: React.FC = () => (
  <AbsoluteFill style={{background: '#000'}}>
    <style>{fontCss}</style>
    <Sequence from={0} durationInFrames={45}><Still src="a8s1.png" dur={45} from={[1.08, 0, 0]} to={[1.16, -1, 1]} /><Flash /><Punch size={150} top={300}>Proposal<br />due at 12.</Punch><Notification app="MESSAGES" from="Client · Wedding" text="By 12, or we book someone else." /></Sequence>
    <Sequence from={45} durationInFrames={45}><Still src="a8s2.png" dur={45} from={[1.04, 0, 0]} to={[1.12, 0, 2]} pos="50% 30%" /><Punch size={150} top={300}>150 guests.<br />No proposal.</Punch></Sequence>
    <Sequence from={90} durationInFrames={45}><Still src="a8s3.png" dur={45} from={[1.06, 0, 0]} to={[1.16, 0, 2]} pos="50% 20%" /><Punch font="pix" size={260} top={760} color={NIGHT} shadow={false}>11:20</Punch><Punch size={110} top={1040} delay={4} color={NIGHT} shadow={false}>40 minutes.</Punch></Sequence>
    <Sequence from={135} durationInFrames={120}><Typing line="Write a catering proposal for a 150-guest wedding: menu, price per guest, terms" chip="menu-and-prices.docx" /><Punch size={150} top={250}>One line.</Punch></Sequence>
    <Sequence from={255} durationInFrames={60}><FileOpen header="Catering-Proposal.docx · 4 pages"><ProposalDoc /></FileOpen><Punch size={170} top={250} color={NIGHT} shadow={false} delay={4}>Done.</Punch></Sequence>
    <Sequence from={315} durationInFrames={60}><Still src="a8s4.png" dur={60} from={[1.05, 0, 0]} to={[1.1, 0, 1]} pos="50% 35%" /><Flash /><Punch size={170} top={250}>Sent.</Punch><Punch font="pix" size={250} top={1150} delay={6}>11:34</Punch></Sequence>
    <Sequence from={375} durationInFrames={45}><Pay amount="KES 5" /><Punch font="pix" size={260} top={300}>KES 5</Punch><Punch size={96} top={1240} delay={18}>That's it.</Punch></Sequence>
    <Sequence from={420} durationInFrames={60}><Still src="a8s5.png" dur={60} from={[1.04, 0, 0]} to={[1.1, -1, 0]} pos="50% 40%" /><Punch size={170} top={280}>Booked.</Punch></Sequence>
    <Sequence from={480} durationInFrames={75}><EndCard tag="DOCS FROM KES 5 · FIRST DECK FREE" /></Sequence>
    <Sfx />
  </AbsoluteFill>
);
