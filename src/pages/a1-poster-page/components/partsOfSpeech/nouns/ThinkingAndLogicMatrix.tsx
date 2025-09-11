import React from 'react';
import { WordMatrix } from '../../common/WordMatrix';
import type { WordPairArray } from '../../../../../shared/types';

export const ThinkingAndLogicMatrix: React.FC = () => {
  const data: WordPairArray = [
    // 考え・思考・アイデア
    { english: 'idea', japanese: 'アイデア、考え' },
    { english: 'thought', japanese: '思考、考え' },
    { english: 'thinking', japanese: '思考' },
    { english: 'guess', japanese: '推測' },

    // 知識・意味
    { english: 'knowledge', japanese: '知識' },
    { english: 'meaning', japanese: '意味' },

    // 意見・見解・論点
    { english: 'opinion', japanese: '意見' },
    { english: 'view', japanese: '見解' },
    { english: 'point', japanese: '論点', linkNo: [8, 50] },

    // 助言
    { english: 'advice', japanese: '助言、アドバイス' },

    // 論理・理由・原因・結果
    { english: 'logic', japanese: '論理' },
    { english: 'reason', japanese: '理由、理性' },
    { english: 'cause', japanese: '原因' },
    { english: 'effect', japanese: '結果、効果' },
    { english: 'result', japanese: '結果' },
  ];

  return <WordMatrix data={data} columns={6} />;
};
