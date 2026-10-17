import React from 'react';
import {AbsoluteFill, Audio, Sequence, staticFile} from 'remotion';
import {fontCss, NIGHT, Still, Punch, Flash, Notification, Typing, FileOpen, Pay, EndCard} from './Kit';

const Sfx: React.FC = () => (<>
  <Audio src={staticFile('sfx/bed.wav')} volume={0.9} />
  <Sequence from={14}><Audio src={staticFile('sfx/ping.wav')} volume={0.8} /></Sequence>
  <Sequence from={92}><Audio src={staticFile('sfx/tick.wav')} /></Sequence>
  <Sequence from={107}><Audio src={staticFile('sfx/tick.wav')} /></Sequence>
  <Sequence from={122}><Audio src={staticFile('sfx/tick.wav')} /></Sequence>
  <Sequence from={409}><Audio src={staticFile('sfx/chime.wav')} /></Sequence>
</>);

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

export const Ad2: React.FC = () => (
  <AbsoluteFill style={{background: '#000'}}>
    <style>{fontCss}</style>
    <Sequence from={0} durationInFrames={45}><Still src="a2s1.png" dur={45} from={[1.08, 0, 0]} to={[1.16, -1, 1]} /><Flash /><Punch font="pix" size={260} top={420}>11:40</Punch><Notification app="JOBS" from="Graduate Trainee, Finance" text="Applications close tonight." /></Sequence>
    <Sequence from={45} durationInFrames={45}><Still src="a2s2.png" dur={45} from={[1.04, 0, 0]} to={[1.12, 0, 2]} pos="50% 35%" /><Punch size={170} top={300}>Closes at<br />midnight.</Punch></Sequence>
    <Sequence from={90} durationInFrames={45}><Still src="a2s3.png" dur={45} from={[1.06, 0, 0]} to={[1.2, 0, 3]} /><Punch font="pix" size={330} top={1020}>20</Punch><Punch size={110} top={1340} delay={4}>minutes.</Punch></Sequence>
    <Sequence from={135} durationInFrames={120}><Typing line="Tailor my CV to this advert: Graduate Trainee, Finance" chip="my-CV.docx" /><Punch size={150} top={250}>One line.</Punch></Sequence>
    <Sequence from={255} durationInFrames={60}><FileOpen header="Brian-Otieno-CV.docx · 2 pages"><CvDoc /></FileOpen><Punch size={170} top={250} color={NIGHT} shadow={false} delay={4}>Done.</Punch></Sequence>
    <Sequence from={315} durationInFrames={60}><Still src="a2s4.png" dur={60} from={[1.05, 0, 0]} to={[1.1, 0, 1]} pos="50% 40%" /><Flash /><Punch size={170} top={250}>Applied.</Punch><Punch font="pix" size={250} top={1150} delay={6}>11:52</Punch></Sequence>
    <Sequence from={375} durationInFrames={45}><Pay amount="KES 5" /><Punch font="pix" size={260} top={300}>KES 5</Punch><Punch size={96} top={1240} delay={18}>That's it.</Punch></Sequence>
    <Sequence from={420} durationInFrames={60}><Still src="a2s5.png" dur={60} from={[1.04, 0, 0]} to={[1.1, -1, 0]} pos="50% 40%" /><Punch size={130} top={300}>Bed before<br />midnight.</Punch></Sequence>
    <Sequence from={480} durationInFrames={75}><EndCard tag="CV KES 5 · FIRST DECK FREE" /></Sequence>
    <Sfx />
  </AbsoluteFill>
);

export const Ad3: React.FC = () => (
  <AbsoluteFill style={{background: '#000'}}>
    <style>{fontCss}</style>
    <Sequence from={0} durationInFrames={45}><Still src="a3s1.png" dur={45} from={[1.08, 0, 0]} to={[1.16, -1, 1]} /><Flash /><Punch font="pix" size={260} top={420}>8:30</Punch><Notification app="GROUP CHAT" from="Umoja Chama" text="Treasurer, the sheet tomorrow 👀" /></Sequence>
    <Sequence from={45} durationInFrames={45}><Still src="a3s2.png" dur={45} from={[1.04, 0, 0]} to={[1.12, 0, 2]} pos="50% 35%" /><Punch size={160} top={300}>12 members.<br />No sheet.</Punch></Sequence>
    <Sequence from={90} durationInFrames={45}><Still src="a3s3.png" dur={45} from={[1.06, 0, 0]} to={[1.2, 0, 3]} /><Punch size={160} top={1080}>Meeting<br />tomorrow.</Punch></Sequence>
    <Sequence from={135} durationInFrames={120}><Typing line="Make our chama sheet: 12 members, KES 3,000 each, 2 loans, show the balance" chip="notes.jpg" /><Punch size={150} top={250}>One line.</Punch></Sequence>
    <Sequence from={255} durationInFrames={60}><FileOpen header="Umoja-Chama-October.xlsx"><ChamaSheet /></FileOpen><Punch size={170} top={250} color={NIGHT} shadow={false} delay={4}>Done.</Punch></Sequence>
    <Sequence from={315} durationInFrames={60}><Still src="a3s4.png" dur={60} from={[1.05, 0, 0]} to={[1.1, 0, 1]} pos="50% 40%" /><Flash /><Punch size={180} top={260}>Sorted.</Punch></Sequence>
    <Sequence from={375} durationInFrames={45}><Pay amount="KES 5" /><Punch font="pix" size={260} top={300}>KES 5</Punch><Punch size={96} top={1240} delay={18}>That's it.</Punch></Sequence>
    <Sequence from={420} durationInFrames={60}><Still src="a3s5.png" dur={60} from={[1.04, 0, 0]} to={[1.1, -1, 0]} pos="50% 40%" /><Punch size={130} top={300}>Treasurer<br />of the year.</Punch></Sequence>
    <Sequence from={480} durationInFrames={75}><EndCard tag="SHEET KES 5 · FIRST DECK FREE" /></Sequence>
    <Sfx />
  </AbsoluteFill>
);
