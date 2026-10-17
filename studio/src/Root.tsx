import React from 'react';
import {Composition} from 'remotion';
import {Ad1} from './Ad1';
import {Ad2, Ad3} from './Ads23';
export const Root: React.FC = () => (<>
  <Composition id="Ad1" component={Ad1} durationInFrames={555} fps={30} width={1080} height={1920} />
  <Composition id="Ad2" component={Ad2} durationInFrames={555} fps={30} width={1080} height={1920} />
  <Composition id="Ad3" component={Ad3} durationInFrames={555} fps={30} width={1080} height={1920} />
</>);
