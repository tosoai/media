import React from 'react';
import {Composition} from 'remotion';
import {Ad1} from './Ad1';
import {Ad2, Ad3} from './Ads23';
import {Ad4, Ad3b} from './Ad4';
import {Ad5, Ad2b} from './Ad5';
import {Ad6, Ad4b} from './Ad6';
import {Ad7, Ad5b} from './Ad7';
import {Loop1} from './Loop1';
import {Ad8} from './Ad8';
import {Ad9a, Ad9b} from './Ad9';
import {Poster1} from './Poster1';
import {Loop2} from './Loop2';
import {Ad10} from './Ad10';
import {Ad11} from './Ad11';
import {Loop3} from './Loop3';
import {Loop4} from './Loop4';
import {Ad12} from './Ad12';
import {Loop5} from './Loop5';
import {Ad13} from './Ad13';
export const Root: React.FC = () => (<>
  <Composition id="Ad1" component={Ad1} durationInFrames={555} fps={30} width={1080} height={1920} />
  <Composition id="Ad2" component={Ad2} durationInFrames={555} fps={30} width={1080} height={1920} />
  <Composition id="Ad3" component={Ad3} durationInFrames={555} fps={30} width={1080} height={1920} />
  <Composition id="Ad4" component={Ad4} durationInFrames={555} fps={30} width={1080} height={1920} />
  <Composition id="Ad3b" component={Ad3b} durationInFrames={555} fps={30} width={1080} height={1920} />
  <Composition id="Ad5" component={Ad5} durationInFrames={555} fps={30} width={1080} height={1920} />
  <Composition id="Ad2b" component={Ad2b} durationInFrames={555} fps={30} width={1080} height={1920} />
  <Composition id="Ad6" component={Ad6} durationInFrames={555} fps={30} width={1080} height={1920} />
  <Composition id="Ad4b" component={Ad4b} durationInFrames={555} fps={30} width={1080} height={1920} />
  <Composition id="Ad7" component={Ad7} durationInFrames={555} fps={30} width={1080} height={1920} />
  <Composition id="Ad5b" component={Ad5b} durationInFrames={555} fps={30} width={1080} height={1920} />
  <Composition id="Loop1" component={Loop1} durationInFrames={240} fps={30} width={1080} height={1920} />
  <Composition id="Ad8" component={Ad8} durationInFrames={555} fps={30} width={1080} height={1920} />
  <Composition id="Ad9a" component={Ad9a} durationInFrames={555} fps={30} width={1080} height={1920} />
  <Composition id="Ad9b" component={Ad9b} durationInFrames={555} fps={30} width={1080} height={1920} />
  <Composition id="Poster1" component={Poster1} durationInFrames={300} fps={30} width={1080} height={1920} />
  <Composition id="Loop2" component={Loop2} durationInFrames={240} fps={30} width={1080} height={1920} />
  <Composition id="Ad10" component={Ad10} durationInFrames={555} fps={30} width={1080} height={1920} />
  <Composition id="Ad11" component={Ad11} durationInFrames={555} fps={30} width={1080} height={1920} />
  <Composition id="Ad12" component={Ad12} durationInFrames={555} fps={30} width={1080} height={1920} />
  <Composition id="Loop4" component={Loop4} durationInFrames={240} fps={30} width={1080} height={1920} />
  <Composition id="Loop3" component={Loop3} durationInFrames={240} fps={30} width={1080} height={1920} />
  <Composition id="Loop5" component={Loop5} durationInFrames={240} fps={30} width={1080} height={1920} />
  <Composition id="Ad13" component={Ad13} durationInFrames={555} fps={30} width={1080} height={1920} />
</>);
