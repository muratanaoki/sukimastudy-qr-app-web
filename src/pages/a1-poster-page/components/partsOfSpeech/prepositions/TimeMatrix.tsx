import React from 'react';
import { WordMatrix } from '../../common/WordMatrix';
import type { WordPairArray } from '../../../../../shared/types';

/**
 * 時間（Time）前置詞マトリクス
 */
export const TimeMatrix: React.FC = () => {
  const data: WordPairArray = [
    // specific time points
    { english: 'at', japanese: '〜に（時刻）', linkNo: [1] },
    { english: 'on', japanese: '〜に（曜日、日付）', linkNo: [1, 4] },
    { english: 'in', japanese: '〜に（年、月などの一定時間内）', linkNo: [1] },
    { english: 'around', japanese: '〜頃（おおよそ）', linkNo: [2] },

    // start / origin
    { english: 'from', japanese: '〜から（開始時点）', linkNo: [2, 4] },
    { english: 'since', japanese: '〜から（以来ずっと継続）' },

    // duration / extent
    { english: 'for', japanese: '〜の間（期間の長さ）', linkNo: [2, 4] },
    { english: 'during', japanese: '〜の間に（期間中に）' },
    { english: 'over', japanese: '〜の間に、〜にわたって', linkNo: [2, 5] },
    { english: 'until / till', japanese: '〜まで（継続の終点）' },

    // before/after / immediate sequence
    { english: 'before', japanese: '〜の前に（時点）' },
    { english: 'after', japanese: '〜の後に（時点）' },
    { english: 'following', japanese: '〜の直後に', linkNo: [5] },
    { english: 'past', japanese: '（時刻）〜過ぎ', linkNo: [2] },

    // limits / deadlines / within-range
    { english: 'up to', japanese: '〜まで（上限）', linkNo: [5] },
    { english: 'within', japanese: '〜以内に（一定期間内）', linkNo: [1] },
    { english: 'by', japanese: '〜までに（締切、最終時点）', linkNo: [1, 4] },
  ];
  return <WordMatrix data={data} columns={5} />;
};
