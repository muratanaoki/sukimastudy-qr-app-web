import React from 'react';
import { WordMatrix } from '../../common/WordMatrix';
import type { WordPairArray } from '../../../../../shared/types';

/**
 * 対人行動、関係性のマトリクスのテーブルを表示するコンポーネント
 */
export const InterpersonalActionsMatrix: React.FC = () => {
  const data: WordPairArray = [
    // 関係・友情
    { english: 'relationship', japanese: '関係、縁' },
    { english: 'connection', japanese: 'つながり、関係' },
    { english: 'friendship', japanese: '友情、交友' },

    // 信頼・尊敬
    { english: 'trust', japanese: '信頼、信用' },
    { english: 'respect', japanese: '尊敬、敬意' },

    // 歓迎・応援・共有
    { english: 'welcome', japanese: '歓迎' },
    { english: 'cheer', japanese: '応援' },
    { english: 'sharing', japanese: '共有、分け合い' },

    // 契約・約束
    { english: 'agreement', japanese: '同意、合意、契約' },
    { english: 'promise', japanese: '約束' },

    // 命令・言い訳・マナー
    { english: 'order', japanese: '注文、命令' },
    { english: 'excuse', japanese: '言い訳' },
    { english: 'manner', japanese: 'マナー、作法' },

    // 攻撃・けんか・トリック
    { english: 'attack', japanese: '攻撃' },
    { english: 'fight', japanese: 'けんか' },
    { english: 'trick', japanese: 'トリック' },

    // 保護・救助・バランス
    { english: 'protection', japanese: '保護、防御' },
    { english: 'rescue', japanese: '救助' },
    { english: 'help', japanese: '助け' },
    { english: 'care', japanese: '世話' },
    { english: 'support', japanese: '支持' },
    { english: 'balance', japanese: 'バランス、均衡' },
  ];

  return <WordMatrix data={data} columns={6} />;
};
