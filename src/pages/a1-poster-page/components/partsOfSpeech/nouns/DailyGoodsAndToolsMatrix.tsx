import React from 'react';
import { WordMatrix } from '../../common/WordMatrix';
import type { WordPairArray } from '../../../../../shared/types';

/**
 * 日用品、道具マトリクスのテーブルを表示するコンポーネント
 */
export const DailyGoodsAndToolsMatrix: React.FC = () => {
  // 日用品、道具データ
  const dailyGoodsAndToolsData: WordPairArray = [
    // 物・入れ物・包むもの
    { english: 'thing', japanese: '物、事' },
    { english: 'goods', japanese: '商品、品物' },
    { english: 'bag', japanese: 'かばん、袋' },
    { english: 'case', japanese: '箱、容器', linkNo: [58] },
    { english: 'box', japanese: '箱、容器' },
    { english: 'package', japanese: '小包、荷物' },

    // 家具・机・椅子・テーブル
    { english: 'furniture', japanese: '家具' },
    { english: 'desk', japanese: '机' },
    { english: 'chair', japanese: '椅子' },
    { english: 'table', japanese: 'テーブル、食卓', linkNo: [54] },

    // 文房具
    { english: 'notebook', japanese: 'ノート' },
    { english: 'pen', japanese: 'ペン' },
    { english: 'pencil', japanese: '鉛筆' },
    { english: 'eraser', japanese: '消しゴム' },
    { english: 'ruler', japanese: '定規' },
    { english: 'glue', japanese: 'のり（接着剤）' },
    { english: 'stamp', japanese: '（郵便）切手、スタンプ' },
    { english: 'ticket', japanese: '切符' },

    // 台所用品・食器
    { english: 'pot', japanese: 'なべ' },
    { english: 'can', japanese: '缶' },
    { english: 'cup', japanese: 'カップ' },
    { english: 'glass', japanese: 'コップ、グラス', linkNo: [49] },
    { english: 'bowl', japanese: 'ボウル' },
    { english: 'plate', japanese: '皿' },
    { english: 'spoon', japanese: 'スプーン' },
    { english: 'fork', japanese: 'フォーク' },

    // 道具・工具
    { english: 'tool', japanese: '道具、工具' },
    { english: 'knife', japanese: '刃物、ナイフ' },
    { english: 'scissors', japanese: 'はさみ' },
    { english: 'hammer', japanese: 'ハンマー、かなづち' },
    { english: 'bar', japanese: '棒' },
    { english: 'block', japanese: 'ブロック' },
    { english: 'board', japanese: '板' },
    { english: 'stick', japanese: '棒' },
    { english: 'tube', japanese: '管、筒' },
    { english: 'rope', japanese: 'ロープ、綱' },
    { english: 'brush', japanese: 'ブラシ' },
    { english: 'comb', japanese: 'くし' },

    // その他日用品
    { english: 'umbrella', japanese: '傘' },
    { english: 'hanger', japanese: 'ハンガー' },
    { english: 'coin', japanese: 'コイン、硬貨' },
    { english: 'candle', japanese: 'ろうそく' },
    { english: 'towel', japanese: 'タオル' },
    { english: 'shower', japanese: 'シャワー' },
    { english: 'mirror', japanese: '鏡' },
    { english: 'soap', japanese: '石鹸' },
    { english: 'key', japanese: '鍵' },
    { english: 'pill', japanese: '錠剤' },
  ];

  return <WordMatrix data={dailyGoodsAndToolsData} columns={6} />;
};
