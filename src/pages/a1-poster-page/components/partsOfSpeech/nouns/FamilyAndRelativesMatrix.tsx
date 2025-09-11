import React from 'react';
import { WordMatrix } from '../../common/WordMatrix';
import type { WordPairArray } from '../../../../../shared/types';

/**
 * 家族のマトリクスのテーブルを表示するコンポーネント
 */
export const FamilyAndRelativesMatrix: React.FC = () => {
  // 家族データ
  const data: WordPairArray = [
    // 家族・親・両親
    { english: 'family', japanese: '家族' },
    { english: 'parent', japanese: '親' },

    // 父母・呼称
    { english: 'father', japanese: '父親' },
    { english: 'dad', japanese: 'お父さん、パパ' },
    { english: 'mother', japanese: '母親' },
    { english: 'mom', japanese: 'お母さん、ママ' },

    // 配偶者
    { english: 'husband', japanese: '夫' },
    { english: 'wife', japanese: '妻' },

    // 兄弟姉妹・双子
    { english: 'brother', japanese: '兄弟' },
    { english: 'sister', japanese: '姉妹' },
    { english: 'twin', japanese: '双子' },

    // 子・孫
    { english: 'son', japanese: '息子' },
    { english: 'daughter', japanese: '娘' },
    { english: 'grandchildren', japanese: '孫たち' },
    { english: 'grandson', japanese: '孫、男' },
    { english: 'granddaughter', japanese: '孫、女' },

    // 祖父母・呼称
    { english: 'grandparents', japanese: '祖父母' },
    { english: 'grandfather', japanese: '祖父' },
    { english: 'grandpa', japanese: 'おじいちゃん' },
    { english: 'grandmother', japanese: '祖母' },
    { english: 'grandma', japanese: 'おばあちゃん' },

    // 親戚・親族
    { english: 'relative', japanese: '親戚' },
    { english: 'uncle', japanese: 'おじ' },
    { english: 'aunt', japanese: 'おば' },
    { english: 'cousin', japanese: 'いとこ' },
  ];

  return <WordMatrix data={data} columns={6} />;
};
