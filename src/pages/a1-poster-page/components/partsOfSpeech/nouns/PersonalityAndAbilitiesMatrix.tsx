import React from 'react';
import { WordMatrix } from '../../common/WordMatrix';
import type { WordPairArray } from '../../../../../shared/types';

export const PersonalityAndAbilitiesMatrix: React.FC = () => {
  const personalityAndAbilitiesData: WordPairArray = [
    // 能力・才能
    { english: 'ability', japanese: '能力、才能' },
    { english: 'talent', japanese: '才能、タレント' },
    { english: 'gift', japanese: '才能', linkNo: [32] },
    { english: 'skill', japanese: 'スキル、技術' },

    // 性格・個性
    { english: 'character', japanese: '性格、人格' },
    { english: 'personality', japanese: '個性、性格' },

    { english: 'strength', japanese: '強さ、力' },
    { english: 'power', japanese: '力、パワー', linkNo: [47] },
    { english: 'speed', japanese: '速さ、スピード' },
    { english: 'energy', japanese: 'エネルギー、活力', linkNo: [47] },
  ];

  return <WordMatrix data={personalityAndAbilitiesData} columns={6} />;
};
