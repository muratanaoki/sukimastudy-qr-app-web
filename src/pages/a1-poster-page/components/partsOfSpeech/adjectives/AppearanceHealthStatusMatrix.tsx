import React from 'react';
import { WordMatrix } from '../../common/WordMatrix';
import type { WordPairArray } from '../../../../../shared/types';

/**
 * 英語人の外見、健康、状態の形容詞マトリクスのテーブルを表示するコンポーネント
 */
export const AppearanceHealthStatusMatrix: React.FC = () => {
  // 人の外見、健康、状態の形容詞のデータ
  const adjectiveData: WordPairArray = [
    // 外見（美しさ・かわいさ）
    { english: 'beautiful', japanese: '美しい' },
    { english: 'pretty', japanese: 'かわいい（きれい系）' },
    { english: 'cute', japanese: 'かわいい（愛らしい系）' },
    { english: 'handsome', japanese: 'ハンサムな' },

    // 体型
    { english: 'thin', japanese: '痩せている', linkNo: [6] },
    { english: 'fat', japanese: '太った', linkNo: [6] },

    // 年齢
    { english: 'young', japanese: '若い' },
    { english: 'old', japanese: '年をとった', linkNo: [13] },

    // 健康・元気
    { english: 'healthy', japanese: '健康な（病気でない）' },
    { english: 'fit', japanese: '健康な、引き締まった', linkNo: [15] },
    { english: 'well', japanese: '体調が良い、元気な' },

    // 病気・けが・青白い
    { english: 'ill', japanese: '病気の（重め）' },
    { english: 'sick', japanese: '病気の、具合が悪い', linkNo: [2] },
    { english: 'injured', japanese: 'けがをした' },
    { english: 'pale', japanese: '青白い' },

    // 生死
    { english: 'alive', japanese: '生きている' },
    { english: 'dead', japanese: '死んだ', linkNo: [7] },

    // 眠り・覚醒
    { english: 'asleep', japanese: '眠っている' },
    { english: 'awake', japanese: '目が覚めている' },

    // 活動・状況
    { english: 'busy', japanese: '忙しい' },
    { english: 'free', japanese: '自由な、時間がある', linkNo: [16] },
    { english: 'ready', japanese: '準備ができた' },

    // 出席・欠席
    { english: 'present', japanese: '出席の', linkNo: [13] },
    { english: 'absent', japanese: '欠席の' },

    // 感覚・障害
    { english: 'blind', japanese: '目の見えない' },

    // その他
    { english: 'poor', japanese: 'かわいそうな', linkNo: [15, 22] },
    { english: 'famous', japanese: '有名な' },
  ];

  return <WordMatrix data={adjectiveData} columns={6} />;
};
