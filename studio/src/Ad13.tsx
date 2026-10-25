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

const Cell: React.FC<{c: string; w: number; bold?: boolean; pix?: boolean; bg?: string}> = ({c, w, bold, pix, bg}) => (
  <div style={{width: w, padding: '12px 14px', borderRight: '1px solid #e6e4de', fontSize: pix ? 22 : 24, fontFamily: pix ? 'Silkscreen' : 'Manrope', fontWeight: bold ? 800 : 400, background: bg}}>{c}</div>
);
const SRow: React.FC<{cells: string[]; head?: boolean; total?: boolean}> = ({cells, head, total}) => (
  <div style={{display: 'flex', borderBottom: '1px solid #e6e4de', borderTop: total ? '2px solid ' + NIGHT : undefined}}>
    <Cell c={cells[0]} w={330} bold={head || total} bg={head ? '#f1efe9' : undefined} />
    <Cell c={cells[1]} w={180} bold={head} pix={!head} bg={head ? '#f1efe9' : undefined} />
    <Cell c={cells[2]} w={210} bold={head || total} pix={!head} bg={head ? '#f1efe9' : undefined} />
  </div>
);
const FeeSheet: React.FC = () => (
  <div style={{background: '#fff', height: 620, borderRadius: '0 0 24px 24px', padding: '40px 40px', color: NIGHT, fontFamily: 'Manrope'}}>
    <div style={{fontFamily: 'Silkscreen', fontSize: 22, color: '#9d9ca6'}}>TERM 3 · 300 PUPILS · BY CLASS</div>
    <div style={{fontSize: 46, fontWeight: 800, letterSpacing: '-0.03em', marginTop: 8, marginBottom: 22}}>Fee balances</div>
    <div style={{border: '1px solid #e6e4de', borderRadius: 10, overflow: 'hidden'}}>
      <SRow head cells={['Class', 'Pupils', 'Balance KES']} />
      <SRow cells={['Grade 4', '52', '···']} />
      <SRow cells={['Grade 5', '49', '···']} />
      <SRow cells={['Grade 6', '55', '···']} />
      <SRow cells={['Grade 7', '47', '···']} />
      <SRow total cells={['Total', '', '=SUM']} />
    </div>
    <div style={{marginTop: 18, display: 'flex', alignItems: 'center', gap: 12}}><div style={{fontSize: 22, color: '#55545c'}}>By pupil · Paid · Balance</div><div style={{height: 22, width: 22, background: VIOLET, borderRadius: 4}} /></div>
  </div>
);

// Episode 13: fee balances due for the 2pm parents' meeting (spreadsheet). School bursar, shoulder-length locs tied back, short beard, mustard sweater over white collar, bright school office with green cabinets and a jacaranda window. Monday.
export const Ad13: React.FC = () => (
  <AbsoluteFill style={{background: '#000'}}>
    <style>{fontCss}</style>
    <Sequence from={0} durationInFrames={45}><Still src="a13s1.png" dur={45} from={[1.08, 0, 0]} to={[1.16, -1, 1]} /><Flash /><Punch size={150} top={300} delay={-4}>Fees list<br />by 2pm.</Punch><Notification app="MESSAGES" from="Head Teacher" text="Fee balances for every class before the 2pm parents' meeting." /></Sequence>
    <Sequence from={45} durationInFrames={45}><Still src="a13s2.png" dur={45} from={[1.04, 0, 0]} to={[1.12, 0, 2]} pos="50% 30%" /><Punch size={140} top={300}>300 pupils.<br />All on receipts.</Punch></Sequence>
    <Sequence from={90} durationInFrames={45}><Still src="a13s3.png" dur={45} from={[1.06, 0, 0]} to={[1.16, 0, 2]} pos="50% 40%" /><Punch font="pix" size={260} top={1020}>11:40</Punch><Punch size={110} top={1290} delay={4}>Two hours.</Punch></Sequence>
    <Sequence from={135} durationInFrames={120}><Typing line="Fee balance sheet by class from these receipts: paid, balance, totals" chip="fee-receipts.pdf" /><Punch size={150} top={250}>One line.</Punch></Sequence>
    <Sequence from={255} durationInFrames={60}><FileOpen header="Fee-Balances.xlsx · 8 sheets"><FeeSheet /></FileOpen><Punch size={170} top={250} color={NIGHT} shadow={false} delay={4}>Done.</Punch></Sequence>
    <Sequence from={315} durationInFrames={60}><Still src="a13s4.png" dur={60} from={[1.05, 0, 0]} to={[1.1, 0, 1]} pos="50% 35%" /><Flash /><Punch size={170} top={250}>Sorted.</Punch><Punch font="pix" size={250} top={1150} delay={6}>12:05</Punch></Sequence>
    <Sequence from={375} durationInFrames={45}><Pay amount="KES 5" /><Punch font="pix" size={260} top={300}>KES 5</Punch><Punch size={96} top={1240} delay={18}>That's it.</Punch></Sequence>
    <Sequence from={420} durationInFrames={60}><Still src="a13s5.png" dur={60} from={[1.04, 0, 0]} to={[1.1, -1, 0]} pos="50% 40%" /><Punch size={150} top={280}>Ready by 2.</Punch></Sequence>
    <Sequence from={480} durationInFrames={75}><EndCard tag="SHEETS FROM KES 5 · M-PESA" /></Sequence>
    <Sfx />
  </AbsoluteFill>
);
