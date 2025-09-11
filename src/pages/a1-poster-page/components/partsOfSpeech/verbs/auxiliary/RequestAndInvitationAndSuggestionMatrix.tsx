import React from 'react';
import { WordMatrix } from '../../../common/WordMatrix';
import type { WordPairArray } from '../../../../../../shared/types';

export const RequestAndInvitationAndSuggestionMatrix: React.FC = () => {
  const data: WordPairArray = [
    { english: 'Can I … ?', japanese: '〜してもいい？（口語的な許可の依頼）' },
    { english: 'May I … ?', japanese: '〜してもよいですか？（丁寧な許可の依頼）' },
    { english: 'Could I … ?', japanese: '〜してもよろしいですか？（最も丁寧な許可の依頼）' },
    { english: 'Will you … ?', japanese: '〜してくれますか？（口語的な依頼）' },
    { english: 'Would you … ?', japanese: '〜していただけますか？（丁寧な依頼）' },
    { english: 'Could you … ?', japanese: '〜していただけますか？（丁寧な依頼）' },
    {
      english: 'Would you mind 〜ing?',
      japanese: '〜していただけますか？（遠回しで丁寧な依頼）',
    },
    { english: 'Shall I … ?', japanese: '私が〜しましょうか？' },
    { english: 'Shall we … ?', japanese: '一緒に〜しませんか？' },
    { english: 'Would you like to … ?', japanese: '〜するのはいかがですか？（丁寧な勧誘）' },
    { english: 'Why don’t we … ?', japanese: '一緒に〜したらどう？（提案）' },
    { english: 'Why don’t you … ?', japanese: '〜してはどう？（助言）' },
  ];

  return <WordMatrix data={data} columns={3} />;
};
