import React from 'react';
import { WordMatrix } from '../../common/WordMatrix';
import type { WordPairArray } from '../../../../../shared/types';

/**
 * 英語場所、方向の副詞マトリクスのテーブルを表示するコンポーネント
 */
export const AdverbsOfPlaceDirectionMatrix: React.FC = () => {
  // 場所、方向の副詞のデータ（意味別にグループ化して整理）
  const adverbData: WordPairArray = [
    // 基本的な位置指示
    { english: 'here', japanese: 'ここに' },
    { english: 'there', japanese: 'そこに、あそこに' },

    // 上下
    { english: 'up', japanese: '上に、上へ' },
    { english: 'upstairs', japanese: '階上へ、2階で' },
    { english: 'down', japanese: '下に、下へ' },
    { english: 'downstairs', japanese: '階下へ、1階で' },

    // 前後
    { english: 'forward', japanese: '前へ、先に' },
    { english: 'back', japanese: '戻って、後方へ' },
    { english: 'backward', japanese: '後ろ向きに、逆向きに' },

    // 左右
    { english: 'right', japanese: '右に' },
    { english: 'left', japanese: '左に' },

    // 内外
    { english: 'in', japanese: '中へ' },
    { english: 'inside', japanese: '内側に' },
    { english: 'indoors', japanese: '屋内で' },
    { english: 'out', japanese: '外へ' },
    { english: 'outside', japanese: '外で' },
    { english: 'outdoors', japanese: '屋外で' },

    // 近さ・遠さ（近い順に並べる）
    { english: 'near', japanese: '近くに' },
    { english: 'nearby', japanese: '近くに（すぐそば、周辺）' },
    { english: 'close', japanese: 'すぐ近くに' },

    { english: 'around', japanese: 'あちこちに、周りに ', linkNo: [1] },
    { english: 'far', japanese: '遠くに（距離そのもの）', linkNo: [1] },
    { english: 'away', japanese: '離れて、遠くに（動作、状態）' },

    // 方向性・移動
    { english: 'over', japanese: '向こうに' },

    // 方角
    { english: 'north', japanese: '北へ' },
    { english: 'south', japanese: '南へ' },
    { english: 'east', japanese: '東へ' },
    { english: 'west', japanese: '西へ' },

    // 特定の場所
    { english: 'home', japanese: '家へ' },
    { english: 'abroad', japanese: '海外へ、外国で' },

    // 不定の場所
    { english: 'anywhere', japanese: 'どこでも（否疑で「どこにも」）' },
    { english: 'everywhere', japanese: 'どこでも、至る所に' },
    { english: 'somewhere', japanese: 'どこか、ある場所' },
    { english: 'nowhere', japanese: 'どこにもない' },
  ];

  return <WordMatrix data={adverbData} columns={5} />;
};
