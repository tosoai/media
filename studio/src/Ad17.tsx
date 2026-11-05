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

// AGM results slide drawn in code (illustrative, not a real Toso screen)
const BARS = [['JAN', 62], ['FEB', 58], ['MAR', 71], ['APR', 76], ['MAY', 84], ['JUN', 90]] as const;
const Slide: React.FC = () => (
  <div style={{background: '#fff', height: 620, borderRadius: '0 0 24px 24px', padding: 40, color: NIGHT, fontFamily: 'Manrope', position: 'relative'}}>
    <div style={{fontFamily: 'Silkscreen', fontSize: 22, color: '#9d9ca6'}}>03 · HALF-YEAR RESULTS</div>
    <div style={{fontSize: 50, fontWeight: 800, letterSpacing: '-0.04em', marginTop: 10}}>Milk collected, Jan–Jun</div>
    <div style={{display: 'flex', alignItems: 'flex-end', gap: 26, height: 330, marginTop: 40, borderBottom: '3px solid ' + NIGHT, padding: '0 10px'}}>
      {BARS.map(([m, v], i) => <div key={m} style={{flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-end', height: '100%'}}>
        <div style={{width: '100%', height: `${v}%`, background: i === BARS.length - 1 ? VIOLET : '#d9d6ce', borderRadius: '8px 8px 0 0'}} /></div>)}
    </div>
    <div style={{display: 'flex', gap: 26, padding: '12px 10px 0'}}>{BARS.map(([m]) => <div key={m} style={{flex: 1, textAlign: 'center', fontFamily: 'Silkscreen', fontSize: 22}}>{m}</div>)}</div>
  </div>
);

// Episode 17: co-op AGM at 10, figures in a sheet but no slides (deck KES 20). Dairy co-op manager, short waves, salt-and-pepper beard, maroon knit polo, bright co-op office with hills outside. Friday.
export const Ad17: React.FC = () => (
  <AbsoluteFill style={{background: '#000'}}>
    <style>{fontCss}</style>
    <Sequence from={0} durationInFrames={45}><Still src="a17s1.png" dur={45} from={[1.08, 0, 0]} to={[1.16, -1, 1]} pos="50% 40%" /><Flash /><Punch size={150} top={260} delay={-4}>AGM at 10.<br />No slides.</Punch><Notification app="MESSAGES" from="Co-op Chairman" text="Members want the half-year results on the screen at 10. Bring the slides." /></Sequence>
    <Sequence from={45} durationInFrames={45}><Still src="a17s2.png" dur={45} from={[1.04, 0, 0]} to={[1.12, 0, 2]} pos="50% 30%" /><Punch size={140} top={300}>Figures in<br />a sheet.</Punch></Sequence>
    <Sequence from={90} durationInFrames={45}><Still src="a17s3.png" dur={45} from={[1.06, 0, 0]} to={[1.16, 0, 2]} pos="50% 40%" /><Punch font="pix" size={260} top={800}>8:00</Punch><Punch size={110} top={1090} delay={4}>2 hours.</Punch></Sequence>
    <Sequence from={135} durationInFrames={120}><Typing line="AGM slides for our dairy co-op: milk collected, payments to farmers, costs, plans for the new cooler, from this sheet" chip="half-year.xlsx" /><Punch size={150} top={250}>One line.</Punch></Sequence>
    <Sequence from={255} durationInFrames={60}><FileOpen header="Coop-AGM.pptx · 8 slides"><Slide /></FileOpen><Punch size={170} top={250} color={NIGHT} shadow={false} delay={4}>Done.</Punch></Sequence>
    <Sequence from={315} durationInFrames={60}><Still src="a17s4.png" dur={60} from={[1.05, 0, 0]} to={[1.1, 0, 1]} pos="50% 35%" /><Flash /><Punch size={170} top={250}>Ready.</Punch><Punch font="pix" size={250} top={1150} delay={6}>8:12</Punch></Sequence>
    <Sequence from={375} durationInFrames={45}><Pay amount="KES 20" /><Punch font="pix" size={240} top={300}>KES 20</Punch><Punch size={96} top={1240} delay={18}>That's it.</Punch></Sequence>
    <Sequence from={420} durationInFrames={60}><Still src="a17s5.png" dur={60} from={[1.04, 0, 0]} to={[1.1, -1, 0]} pos="50% 40%" /><Punch size={130} top={200}>The whole hall<br />followed.</Punch></Sequence>
    <Sequence from={480} durationInFrames={75}><EndCard tag="DECKS FROM KES 20 · M-PESA" /></Sequence>
    <Sfx />
  </AbsoluteFill>
);
