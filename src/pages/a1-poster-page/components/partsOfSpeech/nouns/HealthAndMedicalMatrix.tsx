import React from 'react';
import { WordMatrix } from '../../common/WordMatrix';
import type { WordPairArray } from '../../../../../shared/types';

/**
 * 健康、医療のマトリクスのテーブルを表示するコンポーネント
 */
export const HealthAndMedicalMatrix: React.FC = () => {
  // 健康、医療データ
  const data: WordPairArray = [
    // 病気・症状
    { english: 'virus', japanese: 'ウイルス' },
    { english: 'cold', japanese: '風邪' },
    { english: 'flu', japanese: 'インフルエンザ' },
    { english: 'fever', japanese: '熱' },
    { english: 'cough', japanese: '咳' },
    { english: 'headache', japanese: '頭痛' },
    { english: 'stomachache', japanese: '腹痛' },
    { english: 'toothache', japanese: '歯痛' },

    // 痛み
    { english: 'sore', japanese: '痛むところ、ただれ' },
    { english: 'hurt', japanese: '痛み、傷（物理、精神）' },

    // 損傷・火傷
    { english: 'burn', japanese: '火傷' },
    { english: 'injury', japanese: 'けが、負傷' },
    { english: 'damage', japanese: '損傷' },

    // 健康・医学
    { english: 'medicine', japanese: '薬、医学' },
    { english: 'eyesight', japanese: '視力' },
    { english: 'health', japanese: '健康' },
    { english: 'condition', japanese: '状態（健康）', linkNo: [58] },
    { english: 'cure', japanese: '治療法' },
  ];

  return <WordMatrix data={data} columns={6} />;
};
