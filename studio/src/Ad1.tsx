import React from 'react';
import {AbsoluteFill, Audio, Sequence, staticFile} from 'remotion';
import {fontCss, NIGHT, Still, Punch, Flash, Notification, Typing, FileOpen, Pay, EndCard} from './Kit';

export const Ad1: React.FC = () => (
  <AbsoluteFill style={{background: '#000'}}>
    <style>{fontCss}</style>
    <Sequence from={0} durationInFrames={45}><Still src="s1.png" dur={45} from={[1.08, 0, 0]} to={[1.16, -1, 1]} /><Flash /><Punch font="pix" size={260} top={420}>4:47</Punch><Notification /></Sequence>
    <Sequence from={45} durationInFrames={45}><Still src="s2.png" dur={45} from={[1.04, 0, 0]} to={[1.12, 0, 2]} pos="50% 35%" /><Punch size={190} top={300}>Deck.<br />By 5.</Punch></Sequence>
    <Sequence from={90} durationInFrames={45}><Still src="s3.png" dur={45} from={[1.15, 8, 10]} to={[1.45, 12, 16]} /><Punch font="pix" size={330} top={1020}>13</Punch><Punch size={110} top={1340} delay={4}>minutes.</Punch></Sequence>
    <Sequence from={135} durationInFrames={120}><Typing /><Punch size={150} top={250}>One line.</Punch></Sequence>
    <Sequence from={255} durationInFrames={60}><FileOpen /><Punch size={170} top={250} color={NIGHT} shadow={false} delay={4}>Done.</Punch></Sequence>
    <Sequence from={315} durationInFrames={60}><Still src="s6.png" dur={60} from={[1.05, 0, 0]} to={[1.1, 0, 1]} pos="50% 40%" /><Flash /><Punch size={170} top={250}>Sent.</Punch><Punch font="pix" size={250} top={1150} delay={6}>4:58</Punch></Sequence>
    <Sequence from={375} durationInFrames={45}><Pay /><Punch font="pix" size={230} top={300}>KES 20</Punch><Punch size={96} top={1240} delay={18}>That's it.</Punch></Sequence>
    <Sequence from={420} durationInFrames={60}><Still src="s8.png" dur={60} from={[1.04, 0, 0]} to={[1.1, -1, 0]} pos="50% 40%" /><Punch size={130} top={300}>Home before<br />the traffic.</Punch></Sequence>
    <Sequence from={480} durationInFrames={75}><EndCard /></Sequence>
    <Audio src={staticFile('sfx/bed.wav')} volume={0.9} />
    <Sequence from={14}><Audio src={staticFile('sfx/ping.wav')} volume={0.8} /></Sequence>
    <Sequence from={92}><Audio src={staticFile('sfx/tick.wav')} /></Sequence>
    <Sequence from={107}><Audio src={staticFile('sfx/tick.wav')} /></Sequence>
    <Sequence from={122}><Audio src={staticFile('sfx/tick.wav')} /></Sequence>
    <Sequence from={409}><Audio src={staticFile('sfx/chime.wav')} /></Sequence>
  </AbsoluteFill>
);
