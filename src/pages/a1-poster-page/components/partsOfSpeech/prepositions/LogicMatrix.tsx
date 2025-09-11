import React from 'react';
import { WordMatrix } from '../../common/WordMatrix';
import type { WordPairArray } from '../../../../../shared/types';

export const LogicMatrix: React.FC = () => {
  const data: WordPairArray = [
    // 比較・量の範囲
    { english: 'than', japanese: '〜よりも（比較）' },
    { english: 'over', japanese: '〜以上（数値超過）', linkNo: [2, 3] },
    { english: 'beyond', japanese: '〜を超えて（範囲外、想定外）' },
    { english: 'up to', japanese: '〜に至るまで（数値・程度）', linkNo: [3] },

    // 価値・単位
    { english: 'per', japanese: '〜につき、〜あたり（単価、率）' },
    { english: 'worth', japanese: '〜の価値がある' },

    // 含む・例示
    { english: 'including', japanese: '〜を含めて（包含）' },
    { english: 'such as', japanese: '〜のような（例示）' },

    // 除外・付加
    { english: 'except', japanese: '〜を除いて（除外）' },
    { english: 'besides', japanese: '〜に加えて、（否定文）〜を除いて' },

    // 代替
    { english: 'instead of', japanese: '〜の代わりに（代替）' },

    // 順序・移動
    { english: 'following', japanese: '〜に続いて', linkNo: [3] },
    { english: 'into', japanese: '〜の状態に（状態変化）', linkNo: [2] },

    // 理由・起因
    { english: 'out of', japanese: '〜から（理由、心情を起点）', linkNo: [2, 4] },
    { english: 'because of', japanese: '〜が原因で、〜のために（起因）' },
    { english: 'thanks to', japanese: '〜のおかげで（好結果の原因）' },

    // 参照・譲歩
    { english: 'according to', japanese: '〜によれば、〜に従って' },
    { english: 'in spite of', japanese: '〜にもかかわらず（譲歩）' },
  ];
  return <WordMatrix data={data} columns={5} />;
};
