import React from 'react';
import { WordMatrix } from '../../common/WordMatrix';
import type { WordPairArray } from '../../../../../shared/types';

export const ScienceAndPhenomenaMatrix: React.FC = () => {
  const data: WordPairArray = [
    // 科学・研究
    { english: 'research', japanese: '研究、調査' },
    { english: 'experiment', japanese: '実験' },
    { english: 'discovery', japanese: '発見' },
    { english: 'invention', japanese: '発明' },

    // 力・エネルギー・重さ
    { english: 'power', japanese: '電力、力', linkNo: [26] },
    { english: 'force', japanese: '力' },
    { english: 'energy', japanese: 'エネルギー', linkNo: [26] },
    { english: 'weight', japanese: '重さ' },
    { english: 'gravity', japanese: '重力' },
    { english: 'magnet', japanese: '磁石' },
    { english: 'electricity', japanese: '電気' },
    { english: 'pressure', japanese: '圧迫、圧力' },

    // 光・暗闇
    { english: 'light', japanese: '光' },
    { english: 'dark', japanese: '暗闇' },

    // 音・波・騒音
    { english: 'sound', japanese: '音' },
    { english: 'wave', japanese: '波', linkNo: [28] },
    { english: 'noise', japanese: '騒音' },

    // 化学物質
    { english: 'chemical', japanese: '化学物質' },
  ];

  return <WordMatrix data={data} columns={6} />;
};
