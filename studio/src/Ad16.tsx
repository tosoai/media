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

// contributions sheet drawn in code (illustrative, not a real Toso screen)
const ROWS = [['Achieng', '2,000', '0', '24,000'], ['Mutua', '2,000', '5,000', '19,000'], ['Njeri', '2,000', '0', '24,000'], ['Otieno', '1,500', '0', '17,500'], ['Wairimu', '2,000', '3,000', '21,000']];
const Sheet: React.FC = () => (
  <div style={{background: '#fff', height: 620, borderRadius: '0 0 24px 24px', padding: 40, color: NIGHT, fontFamily: 'Manrope'}}>
    <div style={{display: 'flex', alignItems: 'center', gap: 14}}><div style={{fontSize: 44, fontWeight: 800, letterSpacing: '-0.03em'}}>November contributions</div><div style={{height: 24, width: 24, background: VIOLET, borderRadius: 4}} /></div>
    <div style={{marginTop: 24, border: '1px solid #e6e4de', borderRadius: 10, overflow: 'hidden'}}>
      {[['Member', 'Paid', 'Loan', 'Balance'], ...ROWS].map((r, i) => <div key={i} style={{display: 'flex', borderBottom: '1px solid #e6e4de', background: i === 0 ? '#f1efe9' : undefined}}>
        {r.map((c, j) => <div key={j} style={{flex: j === 0 ? 1.4 : 1, padding: '13px 14px', borderRight: '1px solid #e6e4de', fontSize: i === 0 ? 22 : 26, fontWeight: i === 0 || j === 0 ? 800 : 400, fontFamily: i > 0 && j > 0 ? 'Silkscreen' : 'Manrope', textAlign: j > 0 ? 'right' : 'left'}}>{c}</div>)}
      </div>)}
    </div>
  </div>
);

// Episode 16: chama meets at 6, contributions sheet not ready (spreadsheet KES 5). Chama treasurer, high-top fade, clean-shaven, light grey crewneck, bright sitting room with plants. Saturday.
export const Ad16: React.FC = () => (
  <AbsoluteFill style={{background: '#000'}}>
    <style>{fontCss}</style>
    <Sequence from={0} durationInFrames={45}><Still src="a16s1.png" dur={45} from={[1.08, 0, 0]} to={[1.16, -1, 1]} pos="50% 40%" /><Flash /><Punch size={150} top={260} delay={-4}>Chama at 6.<br />No sheet.</Punch><Notification app="MESSAGES" from="Chama Chair" text="Bring the contributions and loans sheet at 6. Everyone wants their balance." /></Sequence>
    <Sequence from={45} durationInFrames={45}><Still src="a16s2.png" dur={45} from={[1.04, 0, 0]} to={[1.12, 0, 2]} pos="50% 30%" /><Punch size={140} top={300}>Receipts<br />everywhere.</Punch></Sequence>
    <Sequence from={90} durationInFrames={45}><Still src="a16s3.png" dur={45} from={[1.06, 0, 0]} to={[1.16, 0, 2]} pos="50% 40%" /><Punch font="pix" size={260} top={240}>4:20</Punch><Punch size={110} top={530} delay={4}>100 minutes.</Punch></Sequence>
    <Sequence from={135} durationInFrames={120}><Typing line="Chama sheet for November: each member's contribution, loan and balance, from these M-Pesa messages" chip="mpesa-msgs.txt" /><Punch size={150} top={250}>One line.</Punch></Sequence>
    <Sequence from={255} durationInFrames={60}><FileOpen header="Chama-November.xlsx · 3 sheets"><Sheet /></FileOpen><Punch size={170} top={250} color={NIGHT} shadow={false} delay={4}>Done.</Punch></Sequence>
    <Sequence from={315} durationInFrames={60}><Still src="a16s4.png" dur={60} from={[1.05, 0, 0]} to={[1.1, 0, 1]} pos="50% 35%" /><Flash /><Punch size={170} top={250}>Balanced.</Punch><Punch font="pix" size={250} top={1150} delay={6}>4:31</Punch></Sequence>
    <Sequence from={375} durationInFrames={45}><Pay amount="KES 5" /><Punch font="pix" size={240} top={300}>KES 5</Punch><Punch size={96} top={1240} delay={18}>That's it.</Punch></Sequence>
    <Sequence from={420} durationInFrames={60}><Still src="a16s5.png" dur={60} from={[1.04, 0, 0]} to={[1.1, -1, 0]} pos="50% 40%" /><Punch size={130} top={200}>Every shilling,<br />on one page.</Punch></Sequence>
    <Sequence from={480} durationInFrames={75}><EndCard tag="SPREADSHEETS FROM KES 5 · M-PESA" /></Sequence>
    <Sfx />
  </AbsoluteFill>
);
