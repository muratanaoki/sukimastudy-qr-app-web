import React from 'react';
import { WordMatrix } from '../../common/WordMatrix';
import type { WordPairArray } from '../../../../../shared/types';

/**
 * 心の基本状態のマトリクスのテーブルを表示するコンポーネント
 */
export const CoreStatesOfMindMatrix: React.FC = () => {
  // 心の基本状態データ
  const coreStatesOfMindData: WordPairArray = [
    // 感覚・気持ち
    { english: 'sense', japanese: '判断力、常識、道理', linkNo: [22] },
    { english: 'feel', japanese: '手触り、質感、雰囲気' },
    { english: 'heart', japanese: '心、核心（愛情、勇気等）' },

    // 心・精神
    { english: 'mind', japanese: '精神、思考、理性' },
    { english: 'spirit', japanese: '精神、気力、気概', linkNo: [52] },

    // 記憶・想像・夢
    { english: 'memory', japanese: '記憶、思い出' },
    { english: 'imagination', japanese: '想像力、空想' },
    { english: 'dream', japanese: '夢、理想' },

    // 理解・注意・経験
    { english: 'understanding', japanese: '理解、了解' },
    { english: 'attention', japanese: '注意、関心' },
    { english: 'concentration', japanese: '集中力' },
    { english: 'experience', japanese: '経験' },
  ];

  return <WordMatrix data={coreStatesOfMindData} columns={6} />;
};
