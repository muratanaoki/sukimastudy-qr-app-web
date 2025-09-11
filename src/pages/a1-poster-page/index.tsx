import React from 'react';

import { MixPoster } from './components/a1-posters/PronounANdPrepositionAndNounsPoster';
import { NounsPoster } from './components/a1-posters/NounsPoster';
import { VerbsPoster } from './components/a1-posters/VerbsPoster';
import { AdjectiveAndAdverbPoster } from './components/a1-posters/AdjectiveAndAdverbPoster';
import { Theme } from '@/shared/types';

export interface SectionConfig {
  component: React.ComponentType<{ theme?: Theme }>;
  theme?: Theme;
}

export const A1Posters: SectionConfig[] = [
  { component: MixPoster, theme: 'green' },
  { component: NounsPoster, theme: 'green' },
  { component: VerbsPoster, theme: 'pink' },
  { component: AdjectiveAndAdverbPoster, theme: 'purple' },
];

const A1PosterPage: React.FC = () => {
  const SectionSpacer: React.FC = () => <div />;
  const renderA1Poster = ({ component: Component, theme }: SectionConfig, index: number) => (
    <React.Fragment key={index}>
      <Component theme={theme} />
      {index < A1Posters.length - 1 && <SectionSpacer />}
    </React.Fragment>
  );

  return (
    <>
      <>{A1Posters.map(renderA1Poster)}</>
    </>
  );
};

export default A1PosterPage;
