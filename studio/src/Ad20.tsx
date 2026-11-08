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

// Fuel claims sheet drawn in code (illustrative, not a real Toso screen)
const ROWS = [['Truck 1', '142', '26,980'], ['Truck 2', '96', '18,240'], ['Truck 3', '118', '22,420'], ['Truck 4', '87', '16,530'], ['Truck 5', '131', '24,890']];
const Sheet: React.FC = () => (
  <div style={{background: '#fff', height: 620, borderRadius: '0 0 24px 24px', padding: '40px 44px', color: NIGHT, fontFamily: 'Manrope', position: 'relative'}}>
    <div style={{fontFamily: 'Silkscreen', fontSize: 22, color: '#9d9ca6'}}>OCTOBER FUEL CLAIMS</div>
    <div style={{marginTop: 22, border: '1px solid #e6e4de', borderRadius: 10, overflow: 'hidden'}}>
      {[['Truck', 'Litres', 'KES'], ...ROWS].map((r, i) => <div key={i} style={{display: 'flex', borderBottom: '1px solid #e6e4de', background: i === 0 ? '#f1efe9' : undefined}}>
        {r.map((c, j) => <div key={j} style={{flex: j === 0 ? 2 : 1, padding: '13px 16px', borderRight: '1px solid #e6e4de', fontSize: i === 0 ? 26 : 30, fontWeight: i === 0 ? 800 : 400, fontFamily: i > 0 && j > 0 ? 'Silkscreen' : 'Manrope', textAlign: j > 0 ? 'right' : 'left'}}>{c}</div>)}
      </div>)}
      <div style={{display: 'flex', background: NIGHT, color: '#fff'}}>
        <div style={{flex: 2, padding: '13px 16px', fontSize: 30, fontWeight: 800}}>Total</div>
        <div style={{flex: 1, padding: '13px 16px', fontSize: 30, fontFamily: 'Silkscreen', textAlign: 'right'}}>574</div>
        <div style={{flex: 1, padding: '13px 16px', fontSize: 30, fontFamily: 'Silkscreen', textAlign: 'right'}}>109,060</div>
      </div>
    </div>
    <div style={{position: 'absolute', right: 44, bottom: 36, width: 30, height: 30, background: VIOLET, borderRadius: 4}} />
  </div>
);

// Episode 20: finance wants the October fuel claims in one sheet by 3pm (spreadsheet KES 5). Transport-company admin, medium rounded afro, gold hoops, teal blouse, bright yard office. Monday.
export const Ad20: React.FC = () => (
  <AbsoluteFill style={{background: '#000'}}>
    <style>{fontCss}</style>
    <Sequence from={0} durationInFrames={45}><Still src="a20s1.png" dur={45} from={[1.08, 0, 0]} to={[1.16, -1, 1]} pos="50% 40%" /><Flash /><Punch size={150} top={260} delay={-4}>Fuel claims<br />by 3.</Punch><Notification app="MESSAGES" from="Finance" text="All October fuel claims in one sheet by 3pm. Auditors are here." /></Sequence>
    <Sequence from={45} durationInFrames={45}><Still src="a20s2.png" dur={45} from={[1.04, 0, 0]} to={[1.12, 0, 2]} pos="50% 30%" /><Punch size={140} top={1150}>Receipts<br />everywhere.</Punch></Sequence>
    <Sequence from={90} durationInFrames={45}><Still src="a20s3.png" dur={45} from={[1.06, 0, 0]} to={[1.16, 0, 2]} pos="50% 40%" /><Punch font="pix" size={260} top={1150}>1:20</Punch><Punch size={110} top={1440} delay={4}>No sheet yet.</Punch></Sequence>
    <Sequence from={135} durationInFrames={120}><Typing line="October fuel claims sheet from these receipts: truck, date, litres, amount, total per truck" chip="fuel-receipts.pdf" /><Punch size={150} top={250}>One line.</Punch></Sequence>
    <Sequence from={255} durationInFrames={60}><FileOpen header="Fuel-Claims-October.xlsx"><Sheet /></FileOpen><Punch size={170} top={250} color={NIGHT} shadow={false} delay={4}>Done.</Punch></Sequence>
    <Sequence from={315} durationInFrames={60}><Still src="a20s4.png" dur={60} from={[1.05, 0, 0]} to={[1.1, 0, 1]} pos="50% 35%" /><Flash /><Punch size={170} top={250}>Sent.</Punch><Punch size={120} top={1150} delay={6}>Before 2.</Punch></Sequence>
    <Sequence from={375} durationInFrames={45}><Pay amount="KES 5" /><Punch font="pix" size={240} top={300}>KES 5</Punch><Punch size={96} top={1240} delay={18}>That's it.</Punch></Sequence>
    <Sequence from={420} durationInFrames={60}><Still src="a20s5.png" dur={60} from={[1.04, 0, 0]} to={[1.1, -1, 0]} pos="50% 40%" /><Punch size={130} top={200}>Drivers paid.</Punch></Sequence>
    <Sequence from={480} durationInFrames={75}><EndCard tag="SHEETS FROM KES 5 · M-PESA" /></Sequence>
    <Sfx />
  </AbsoluteFill>
);
