import React from 'react';
import styles from '@/shared/styles/styles.module.css';

export interface WordPair {
  english: string;
  japanese: string;
}

interface AuxiliaryVerb {
  auxiliaryVerb: string;
  meaning: string[];
  examples: WordPair[];
}

export const AbilityPermissionMatrix: React.FC = () => {
  const data: AuxiliaryVerb[] = [
    {
      auxiliaryVerb: 'can',
      meaning: ['〜できる (能力)', '〜してもよい (許可)'],
      examples: [
        {
          english: 'You can play the piano.',
          japanese: 'あなたはピアノを弾くことができます。',
        },
        {
          english: 'You can use my pen.',
          japanese: '私のペンを使ってもいいですよ。',
        },
      ],
    },
    {
      auxiliaryVerb: 'could',
      meaning: ['〜できた (過去の能力)'],
      examples: [
        {
          english: 'I could swim well when I was a child.',
          japanese: '私は子供のころ、上手に泳ぐことができました。',
        },
      ],
    },
    {
      auxiliaryVerb: 'be able to',
      meaning: ['〜できる (能力)'],
      examples: [
        {
          english: 'I will be able to swim next year.',
          japanese: '私は来年、泳げるようになるでしょう。',
        },
      ],
    },

    {
      auxiliaryVerb: 'will',
      meaning: ['〜でしょう (未来の予測)', '〜するつもりだ (その場の意志)'],
      examples: [
        {
          english: 'It will be sunny tomorrow.',
          japanese: '明日は晴れるでしょう。',
        },
        {
          english: 'It looks heavy. I will help you.',
          japanese: '重そうだね。私が手伝うよ。',
        },
      ],
    },
    {
      auxiliaryVerb: 'be going to',
      meaning: ['〜する予定だ、〜するつもりだ(前から決定)'],
      examples: [
        {
          english: `I'm going to visit my grandmother this weekend.`,
          japanese: '私は今週末、祖母を訪ねる予定です。',
        },
      ],
    },

    {
      auxiliaryVerb: 'must',
      meaning: ['〜しなければならない (主観的な義務・ルール)'],
      examples: [
        {
          english: 'I must clean my room.',
          japanese: '私は部屋を掃除しなければなりません。',
        },
      ],
    },
    {
      auxiliaryVerb: 'have to',
      meaning: ['〜しなければならない (客観的な状況による必要性)'],
      examples: [
        {
          english: 'The train is coming. I have to go now.',
          japanese: '電車が来てしまう。もう行かなければ。',
        },
      ],
    },

    {
      auxiliaryVerb: 'should',
      meaning: ['〜すべきだ (道徳的な助言・義務)'],
      examples: [
        {
          english: 'You should be kind to elderly people.',
          japanese: 'お年寄りには親切にすべきです。',
        },
      ],
    },
    {
      auxiliaryVerb: 'had better',
      meaning: ['〜した方がよい (強い助言)'],
      examples: [
        {
          english: `You had better take an umbrella.`,
          japanese: '傘を持っていった方がいいよ',
        },
      ],
    },

    {
      auxiliaryVerb: 'must not',
      meaning: ['〜してはいけない (強い禁止)'],
      examples: [
        {
          english: 'You must not run in the hallway.',
          japanese: '廊下を走ってはいけません。',
        },
      ],
    },
    {
      auxiliaryVerb: `don't have to`,
      meaning: ['〜する必要はない (不必要)'],
      examples: [
        {
          english: `you don't have to get up early.`,
          japanese: '早く起きる必要はありません。',
        },
      ],
    },

    {
      auxiliaryVerb: 'Shall I ~?',
      meaning: ['【私が】〜しましょうか？ (申し出)'],
      examples: [
        {
          english: 'You look busy. Shall I help you?',
          japanese: '忙しそうですね。（私が）手伝いましょうか？',
        },
      ],
    },
    {
      auxiliaryVerb: 'Shall we ~?',
      meaning: ['【一緒に】〜しませんか？ (提案・誘い)'],
      examples: [
        {
          english: 'It’s a nice day. Shall we go for a walk?',
          japanese: 'いい天気だね。（一緒に）散歩に行きませんか？',
        },
      ],
    },
    {
      auxiliaryVerb: 'Will you ~?',
      meaning: ['〜してくれませんか？ (依頼)'],
      examples: [
        {
          english: 'Will you pass me the pen?',
          japanese: 'そのペンを取ってくれない？',
        },
      ],
    },
    {
      auxiliaryVerb: 'Could you ~?',
      meaning: ['〜していただけますか？ (丁寧な依頼)'],
      examples: [
        {
          english: 'Could you tell me the way to the station?',
          japanese: '駅への道を教えていただけますか？',
        },
      ],
    },
    {
      auxiliaryVerb: 'Would you ~?',
      meaning: ['〜していただけますか？ (丁寧な依頼)'],
      examples: [
        {
          english: 'Would you open the door for me?',
          japanese: 'ドアを開けていただけますか？',
        },
      ],
    },
    {
      auxiliaryVerb: 'Would you like to ~?',
      meaning: ['〜するのはいかがですか？ (丁寧な勧誘)'],
      examples: [
        {
          english: 'Would you like to have another cup of coffee?',
          japanese: 'コーヒーをもう一杯いかがですか？',
        },
      ],
    },

    {
      auxiliaryVerb: 'may',
      meaning: ['〜かもしれない (推量)', '〜してもよい (丁寧な許可)'],
      examples: [
        {
          english: 'He may be busy now.',
          japanese: '彼は今、忙しいかもしれません。',
        },
        {
          english: 'May I ask you a question?',
          japanese: '質問をしてもよろしいですか？',
        },
      ],
    },
    {
      auxiliaryVerb: 'must',
      meaning: ['〜にちがいない (強い推量)'],
      examples: [
        {
          english: 'The lights are on. He must be at home.',
          japanese: '電気がついている。彼は家にいるにちがいない。',
        },
      ],
    },
    {
      auxiliaryVerb: `can't`,
      meaning: ['〜のはずがない (強い否定の推量)'],
      examples: [
        {
          english: `He can't be at school. It's Sunday today.`,
          japanese: '彼が学校にいるはずがない。今日は日曜日だから。',
        },
      ],
    },

    {
      auxiliaryVerb: 'used to',
      meaning: ['以前は〜したものだ(過去の習慣)', '〜だった (状態)'],
      examples: [
        {
          english: 'I used to play baseball with my friends.',
          japanese: '私は以前、友達とよく野球をしたものです。',
        },
        {
          english: 'There used to be a library here.',
          japanese: '以前ここに図書館がありました。',
        },
      ],
    },
    {
      auxiliaryVerb: 'would',
      meaning: ['よく〜したものだ (過去の習慣)'],
      examples: [
        {
          english: 'When I was a child, I would often go to the park.',
          japanese: '子供のころ、私はよくその公園に行ったものです。',
        },
      ],
    },
  ];

  return (
    <div className={`${styles.auxiliaryMargin}`}>
      <table className={`${styles.matrixTable}`}>
        <thead>
          <tr>
            <th
              className={`${styles.auxiliaryVerbMatrixTableTh} ${styles.auxiliaryVerbMatrixTableThWidth1}`}
            >
              助動詞
            </th>
            <th className={`${styles.auxiliaryVerbMatrixTableTh}`}>意味</th>
            <th
              className={`${styles.auxiliaryVerbMatrixTableTh} ${styles.auxiliaryVerbMatrixTableThWidth2}`}
            >
              例文
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((verb, index) => (
            <tr key={`${verb.auxiliaryVerb}-${index}`}>
              <td className={`${styles.auxiliaryVerbMatrixTableThCell}`}>
                <span className={styles.auxiliaryVerbEnglishText}>{verb.auxiliaryVerb}</span>
              </td>
              <td className={`${styles.auxiliaryVerbMatrixTableThCell}`}>
                {verb.meaning.map((line, i) => (
                  <div key={i}>
                    <span className={styles.auxiliaryVerbJapaneseText}>{line}</span>
                  </div>
                ))}
              </td>
              <td className={`${styles.auxiliaryVerbMatrixTableThCell}`}>
                {verb.examples && verb.examples.length > 0 ? (
                  <ul className={styles.auxiliaryVerbExampleList}>
                    {verb.examples.map((ex, i) => (
                      <li key={i} className={styles.auxiliaryVerbExampleItem}>
                        <p className={styles.auxiliaryVerbExampleEnglishText}>{ex.english}</p>
                        <p className={styles.auxiliaryVerbExampleJapaneseText}>{ex.japanese}</p>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <span className={styles.auxiliaryVerbExampleText}>-</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
