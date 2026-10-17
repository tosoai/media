import React from 'react';
import {AbsoluteFill, Audio, Sequence, staticFile} from 'remotion';
import {fontCss, NIGHT, Still, Punch, Flash, Notification, Typing, FileOpen, Pay, EndCard} from './Kit';

const Sfx: React.FC<{ping?: number}> = ({ping = 14}) => (<>
  <Audio src={staticFile('sfx/bed.wav')} volume={0.9} />
  <Sequence from={ping}><Audio src={staticFile('sfx/ping.wav')} volume={0.8} /></Sequence>
  <Sequence from={92}><Audio src={staticFile('sfx/tick.wav')} /></Sequence>
  <Sequence from={107}><Audio src={staticFile('sfx/tick.wav')} /></Sequence>
  <Sequence from={122}><Audio src={staticFile('sfx/tick.wav')} /></Sequence>
  <Sequence from={409}><Audio src={staticFile('sfx/chime.wav')} /></Sequence>
</>);

const Line: React.FC<{w: string; mt?: number}> = ({w, mt = 14}) => <div style={{height: 14, width: w, background: '#dcdad3', borderRadius: 7, marginTop: mt}} />;
const ReportDoc: React.FC = () => (
  <div style={{background: '#fff', height: 620, borderRadius: '0 0 24px 24px', padding: 56, color: NIGHT, fontFamily: 'Manrope'}}>
    <div style={{fontFamily: 'Silkscreen', fontSize: 22, color: '#9d9ca6'}}>Q3 · FIELD REPORT</div>
    <div style={{fontSize: 54, fontWeight: 800, letterSpacing: '-0.03em', marginTop: 10, lineHeight: 1.05}}>Farmer training:<br />what we learned</div>
    <div style={{marginTop: 34, fontSize: 26, fontWeight: 800}}>1. Summary</div><Line w="95%" /><Line w="86%" /><Line w="64%" />
    <div style={{marginTop: 30, fontSize: 26, fontWeight: 800}}>2. Results by county</div><Line w="90%" /><Line w="78%" />
    <div style={{marginTop: 30, fontSize: 26, fontWeight: 800}}>3. Next steps</div><Line w="72%" />
  </div>
);

// Episode 4: the report due Monday 8am (document)
export const Ad4: React.FC = () => (
  <AbsoluteFill style={{background: '#000'}}>
    <style>{fontCss}</style>
    <Sequence from={0} durationInFrames={45}><Still src="a4s1.png" dur={45} from={[1.08, 0, 0]} to={[1.16, -1, 1]} /><Flash /><Punch font="pix" size={260} top={420}>9:40</Punch><Notification app="EMAIL" from="Manager" text="Report on my desk by 8am Monday." /></Sequence>
    <Sequence from={45} durationInFrames={45}><Still src="a4s2.png" dur={45} from={[1.04, 0, 0]} to={[1.12, 0, 2]} pos="50% 35%" /><Punch size={170} top={300}>Sunday<br />night.</Punch></Sequence>
    <Sequence from={90} durationInFrames={45}><Still src="a4s3.png" dur={45} from={[1.06, 0, 0]} to={[1.2, 0, 3]} /><Punch font="pix" size={300} top={1000}>8AM</Punch><Punch size={110} top={1320} delay={4}>tomorrow.</Punch></Sequence>
    <Sequence from={135} durationInFrames={120}><Typing line="Write our Q3 field report from my notes: 3 counties, results, next steps" chip="field-notes.docx" /><Punch size={150} top={250}>One line.</Punch></Sequence>
    <Sequence from={255} durationInFrames={60}><FileOpen header="Q3-Field-Report.docx · 8 pages"><ReportDoc /></FileOpen><Punch size={170} top={250} color={NIGHT} shadow={false} delay={4}>Done.</Punch></Sequence>
    <Sequence from={315} durationInFrames={60}><Still src="a4s4.png" dur={60} from={[1.05, 0, 0]} to={[1.1, 0, 1]} pos="50% 40%" /><Flash /><Punch size={170} top={250}>Sent.</Punch><Punch font="pix" size={250} top={1150} delay={6}>10:05</Punch></Sequence>
    <Sequence from={375} durationInFrames={45}><Pay amount="KES 5" /><Punch font="pix" size={260} top={300}>KES 5</Punch><Punch size={96} top={1240} delay={18}>That's it.</Punch></Sequence>
    <Sequence from={420} durationInFrames={60}><Still src="a4s5.png" dur={60} from={[1.04, 0, 0]} to={[1.1, -1, 0]} pos="50% 40%" /><Punch size={140} top={300}>Sunday,<br />saved.</Punch></Sequence>
    <Sequence from={480} durationInFrames={75}><EndCard tag="REPORT KES 5 · FIRST DECK FREE" /></Sequence>
    <Sfx />
  </AbsoluteFill>
);

// Re-cut of episode 3 (chama): new hook, new order, new ending line. Same EndCard.
const ChamaSheet: React.FC = () => {
  const rows = [['Contributions', '36,000'], ['Loan repayments', '14,500'], ['Welfare', '-3,000'], ['New loans', '-20,000']];
  return (
    <div style={{background: '#fff', height: 620, borderRadius: '0 0 24px 24px', padding: '40px 48px', color: NIGHT, fontFamily: 'Manrope'}}>
      <div style={{fontSize: 44, fontWeight: 800, letterSpacing: '-0.02em'}}>Umoja Chama · October</div>
      <div style={{fontSize: 26, color: '#55545c', marginTop: 4}}>12 members · KES 3,000 each</div>
      <div style={{marginTop: 30, borderTop: '2px solid #0a0a11'}}>
        {rows.map(([a, b]) => <div key={a} style={{display: 'flex', justifyContent: 'space-between', padding: '20px 4px', borderBottom: '1px solid #e2e0d9', fontSize: 34}}><span>{a}</span><span style={{fontFamily: 'Silkscreen', fontSize: 30}}>{b}</span></div>)}
        <div style={{display: 'flex', justifyContent: 'space-between', padding: '22px 4px', fontSize: 38, fontWeight: 800}}><span>Balance</span><span style={{fontFamily: 'Silkscreen', fontSize: 34}}>27,500</span></div>
      </div>
    </div>
  );
};

export const Ad3b: React.FC = () => (
  <AbsoluteFill style={{background: '#000'}}>
    <style>{fontCss}</style>
    <Sequence from={0} durationInFrames={45}><Still src="a3s2.png" dur={45} from={[1.1, 0, 0]} to={[1.18, 0, 2]} pos="50% 35%" /><Flash /><Punch size={150} top={260}>POV: you're<br />the chama<br />treasurer.</Punch></Sequence>
    <Sequence from={45} durationInFrames={45}><Still src="a3s1.png" dur={45} from={[1.08, 0, 0]} to={[1.16, -1, 1]} /><Notification app="GROUP CHAT" from="Umoja Chama" text="Sheet ready for tomorrow? 👀" /></Sequence>
    <Sequence from={90} durationInFrames={45}><Still src="a3s3.png" dur={45} from={[1.06, 0, 0]} to={[1.2, 0, 3]} /><Punch size={160} top={1080}>12 members.<br />1 notebook.</Punch></Sequence>
    <Sequence from={135} durationInFrames={120}><Typing line="Make our chama sheet: 12 members, KES 3,000 each, 2 loans, show the balance" chip="notes.jpg" /><Punch size={150} top={250}>One line.</Punch></Sequence>
    <Sequence from={255} durationInFrames={60}><FileOpen header="Umoja-Chama-October.xlsx"><ChamaSheet /></FileOpen><Punch size={170} top={250} color={NIGHT} shadow={false} delay={4}>Balanced.</Punch></Sequence>
    <Sequence from={315} durationInFrames={60}><Still src="a3s4.png" dur={60} from={[1.05, 0, 0]} to={[1.1, 0, 1]} pos="50% 40%" /><Flash /><Punch size={170} top={260}>Easy.</Punch></Sequence>
    <Sequence from={375} durationInFrames={45}><Pay amount="KES 5" /><Punch font="pix" size={260} top={300}>KES 5</Punch><Punch size={96} top={1240} delay={18}>That's it.</Punch></Sequence>
    <Sequence from={420} durationInFrames={60}><Still src="a3s5.png" dur={60} from={[1.04, 0, 0]} to={[1.1, -1, 0]} pos="50% 40%" /><Punch size={120} top={300}>Every shilling,<br />accounted for.</Punch></Sequence>
    <Sequence from={480} durationInFrames={75}><EndCard tag="SHEET KES 5 · FIRST DECK FREE" /></Sequence>
    <Sfx ping={59} />
  </AbsoluteFill>
);
