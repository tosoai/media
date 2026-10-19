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

const SalesSheet: React.FC = () => {
  const rows = [['July', '84,200', '31,500', '52,700'], ['August', '91,600', '33,900', '57,700'], ['September', '97,300', '35,100', '62,200']];
  const cell = (v: string, i: number, bold = false) => (
    <span key={i} style={{flex: i === 0 ? 1.3 : 1, textAlign: i === 0 ? 'left' : 'right', fontFamily: i === 0 ? 'Manrope' : 'Silkscreen', fontSize: i === 0 ? 32 : 26, fontWeight: bold ? 800 : 400}}>{v}</span>
  );
  return (
    <div style={{background: '#fff', height: 620, borderRadius: '0 0 24px 24px', padding: '40px 44px', color: NIGHT, fontFamily: 'Manrope'}}>
      <div style={{fontSize: 44, fontWeight: 800, letterSpacing: '-0.02em'}}>Shop sales · Jul–Sep</div>
      <div style={{fontSize: 26, color: '#55545c', marginTop: 4}}>Monthly totals, KES</div>
      <div style={{marginTop: 26, display: 'flex', fontSize: 22, color: '#86858e', fontWeight: 600, padding: '0 4px 10px'}}>
        {['Month', 'Sales', 'Costs', 'Profit'].map((h, i) => <span key={h} style={{flex: i === 0 ? 1.3 : 1, textAlign: i === 0 ? 'left' : 'right'}}>{h}</span>)}
      </div>
      <div style={{borderTop: '2px solid #0a0a11'}}>
        {rows.map((r) => <div key={r[0]} style={{display: 'flex', padding: '20px 4px', borderBottom: '1px solid #e2e0d9'}}>{r.map((v, i) => cell(v, i))}</div>)}
        <div style={{display: 'flex', padding: '22px 4px', background: '#f5f3ee'}}>{['Total', '273,100', '100,500', '172,600'].map((v, i) => cell(v, i, true))}</div>
      </div>
      <div style={{marginTop: 20, height: 10, width: 120, background: VIOLET, borderRadius: 5}} />
    </div>
  );
};

// Episode 6: SACCO loan meeting at 9am, three months of sales still in a notebook (spreadsheet)
export const Ad6: React.FC = () => (
  <AbsoluteFill style={{background: '#000'}}>
    <style>{fontCss}</style>
    <Sequence from={0} durationInFrames={45}><Still src="a6s1.png" dur={45} from={[1.08, 0, 0]} to={[1.16, -1, 1]} /><Flash /><Punch font="pix" size={260} top={420}>8:10</Punch><Notification app="MESSAGES" from="SACCO · Loans desk" text="Bring 3 months of sales. 9am." /></Sequence>
    <Sequence from={45} durationInFrames={45}><Still src="a6s2.png" dur={45} from={[1.04, 0, 0]} to={[1.12, 0, 2]} pos="50% 35%" /><Punch size={160} top={300}>All in a<br />notebook.</Punch></Sequence>
    <Sequence from={90} durationInFrames={45}><Still src="a6s3.png" dur={45} from={[1.06, 0, 0]} to={[1.16, 0, 2]} /><Punch font="pix" size={300} top={1180}>9AM</Punch><Punch size={110} top={1500} delay={4}>tomorrow.</Punch></Sequence>
    <Sequence from={135} durationInFrames={120}><Typing line="Make an Excel sheet of my shop sales, July to September, with monthly totals and profit" chip="sales-jul-sep.txt" /><Punch size={150} top={250}>One line.</Punch></Sequence>
    <Sequence from={255} durationInFrames={60}><FileOpen header="Shop-Sales-Jul-Sep.xlsx"><SalesSheet /></FileOpen><Punch size={170} top={250} color={NIGHT} shadow={false} delay={4}>Done.</Punch></Sequence>
    <Sequence from={315} durationInFrames={60}><Still src="a6s4.png" dur={60} from={[1.05, 0, 0]} to={[1.1, 0, 1]} pos="50% 40%" /><Flash /><Punch size={170} top={250}>Ready.</Punch><Punch font="pix" size={250} top={1150} delay={6}>8:26</Punch></Sequence>
    <Sequence from={375} durationInFrames={45}><Pay amount="KES 5" /><Punch font="pix" size={260} top={300}>KES 5</Punch><Punch size={96} top={1240} delay={18}>That's it.</Punch></Sequence>
    <Sequence from={420} durationInFrames={60}><Still src="a6s5.png" dur={60} from={[1.04, 0, 0]} to={[1.1, -1, 0]} pos="50% 40%" /><Punch size={140} top={300}>Walked in<br />ready.</Punch></Sequence>
    <Sequence from={480} durationInFrames={75}><EndCard tag="SHEET KES 5 · FIRST DECK FREE" /></Sequence>
    <Sfx />
  </AbsoluteFill>
);

// Re-cut of episode 4 (report): text-first question hook, new order, new ending line. Same EndCard.
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
const Card: React.FC<{children: React.ReactNode}> = ({children}) => <AbsoluteFill style={{background: NIGHT}}>{children}</AbsoluteFill>;

export const Ad4b: React.FC = () => (
  <AbsoluteFill style={{background: '#000'}}>
    <style>{fontCss}</style>
    <Sequence from={0} durationInFrames={45}><Card><Flash /><Punch size={150} top={560}>Report due<br />at 8am.</Punch><Punch size={110} top={900} delay={10} color={PAPER}>Where do<br />you start?</Punch></Card></Sequence>
    <Sequence from={45} durationInFrames={45}><Still src="a4s3.png" dur={45} from={[1.08, 0, 0]} to={[1.16, 0, 2]} /><Notification app="EMAIL" from="Manager" text="On my desk by 8am, please." /></Sequence>
    <Sequence from={90} durationInFrames={45}><Still src="a4s2.png" dur={45} from={[1.06, 0, 0]} to={[1.14, 0, 2]} pos="50% 35%" /><Punch font="pix" size={260} top={1040}>11:30</Punch><Punch size={110} top={1330} delay={4}>blank page.</Punch></Sequence>
    <Sequence from={135} durationInFrames={120}><Typing line="Write our Q3 field report from my notes: 3 counties, results, next steps" chip="field-notes.docx" /><Punch size={150} top={250}>One line.</Punch></Sequence>
    <Sequence from={255} durationInFrames={60}><FileOpen header="Q3-Field-Report.docx · 8 pages"><ReportDoc /></FileOpen><Punch size={170} top={250} color={NIGHT} shadow={false} delay={4}>Written.</Punch></Sequence>
    <Sequence from={315} durationInFrames={60}><Still src="a4s4.png" dur={60} from={[1.05, 0, 0]} to={[1.1, 0, 1]} pos="50% 40%" /><Flash /><Punch size={170} top={250}>Sent.</Punch><Punch font="pix" size={250} top={1150} delay={6}>11:48</Punch></Sequence>
    <Sequence from={375} durationInFrames={45}><Pay amount="KES 5" /><Punch font="pix" size={260} top={300}>KES 5</Punch><Punch size={96} top={1240} delay={18}>That's it.</Punch></Sequence>
    <Sequence from={420} durationInFrames={60}><Still src="a4s5.png" dur={60} from={[1.04, 0, 0]} to={[1.1, -1, 0]} pos="50% 40%" /><Punch size={130} top={300}>Tea before<br />midnight.</Punch></Sequence>
    <Sequence from={480} durationInFrames={75}><EndCard tag="REPORT KES 5 · FIRST DECK FREE" /></Sequence>
    <Sfx ping={59} />
  </AbsoluteFill>
);
