import React from 'react';
import {Composition} from 'remotion';
import {Ad1} from './Ad1';
import {Ad2, Ad3} from './Ads23';
import {Ad4, Ad3b} from './Ad4';
import {Ad5, Ad2b} from './Ad5';
import {Ad6, Ad4b} from './Ad6';
import {Ad7, Ad5b} from './Ad7';
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
</>);
