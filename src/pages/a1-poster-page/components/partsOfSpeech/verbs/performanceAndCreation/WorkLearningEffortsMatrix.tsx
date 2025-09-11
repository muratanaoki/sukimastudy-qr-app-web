import React from 'react';
import { WordMatrix } from '../../../common/WordMatrix';
import type { WordPairArray } from '../../../../../../shared/types';

/**
 * 仕事・学習・試みの動詞マトリクスを表示するコンポーネント
 */
export const WorkLearningEffortsMatrix: React.FC = () => {
  const data: WordPairArray = [
    // 仕事・稼ぐ・使う・提出・ボランティア（意味が近い順）
    { english: 'work', japanese: '働く、作業する' }, // 自動詞
    { english: 'earn', japanese: '〜を稼ぐ' }, // 他動詞
    { english: 'serve', japanese: '仕える、〜を出す（食事）' }, // 自動詞＋他動詞
    { english: 'spend', japanese: '〜を費やす（時間、お金）' }, // 他動詞

    // 学習・教える・復習・調べる・練習・準備・運動（意味が近い順）
    { english: 'study', japanese: '勉強する、〜を勉強する' }, // 自動詞＋他動詞
    { english: 'learn', japanese: '学ぶ、〜を学ぶ、〜を習得する' }, // 自動詞＋他動詞
    { english: 'teach', japanese: '〜を教える' }, // 他動詞
    { english: 'review', japanese: '復習する、〜を復習する' }, // 自動詞＋他動詞
    { english: 'check', japanese: '確認する、〜を確認する' }, // 自動詞＋他動詞
    { english: 'attend', japanese: '〜に出席する、〜に通う' }, // 他動詞
    { english: 'practice', japanese: '練習する、〜を練習する' }, // 自動詞＋他動詞
    { english: 'prepare', japanese: '準備する、〜を準備する' }, // 自動詞＋他動詞
    { english: 'search', japanese: '〜を検索する、〜を捜索する' }, // 他動詞
    { english: 'solve', japanese: '〜を解決する（問題、課題）' }, // 他動詞
    { english: 'count', japanese: '〜を数える' }, // 他動詞

    // 試み・諦め
    { english: 'try', japanese: '試す、〜を試す、〜をやってみる' }, // 自動詞＋他動詞

    // 成果・合格・卒業・勝敗（意味が近い順）
    { english: 'succeed', japanese: '成功する' }, // 自動詞
    { english: 'pass', japanese: '合格する、〜に合格する', linkNo: [5] }, // 自動詞＋他動詞
    { english: 'graduate', japanese: '卒業する' }, // 自動詞
    { english: 'fail', japanese: '失敗する' }, // 自動詞
  ];

  return <WordMatrix data={data} columns={4} />;
};
