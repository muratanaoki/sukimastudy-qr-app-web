import React from 'react';
import styles from '@/shared/styles/styles.module.css';
import { IrregularVerb } from '../../../../shared/types';

export enum LightHeightClass {
  AAAandABA = 'lightHeightAAAandABA',
  ABB = 'lightHeightABB',
  ABC = 'lightHeightABC',
}

interface IrregularVerbMatrixProps {
  /** 表示する不規則動詞のデータ */
  data: IrregularVerb[];
  /** th/tdのline-heightクラス名 */
  lightHeightClass: LightHeightClass;
}

/**
 * 不規則動詞の一覧をテーブル形式で表示するコンポーネント
 */
export const IrregularVerbMatrix: React.FC<IrregularVerbMatrixProps> = ({
  data,
  lightHeightClass,
}) => {
  return (
    <div>
      <table className={`${styles.matrixTable}`}>
        <thead>
          <tr>
            <th className={`${styles.irregularVerbMatrixTableTh} ${styles[lightHeightClass]}`}>
              原形
            </th>
            <th className={`${styles.irregularVerbMatrixTableTh} ${styles[lightHeightClass]}`}>
              過去形
            </th>
            <th className={`${styles.irregularVerbMatrixTableTh} ${styles[lightHeightClass]}`}>
              過去分詞形
            </th>
            <th className={`${styles.irregularVerbMatrixTableTh} ${styles[lightHeightClass]}`}>
              ...ing形
            </th>
            <th
              className={`${styles.irregularVerbMatrixTableTh} ${styles.irregularVerbMatrixTableThMeaning} ${styles[lightHeightClass]}`}
            >
              意味
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((verb, index) => (
            <tr key={`${verb.infinitive}-${index}`}>
              <td
                className={`${styles.irregularVerbMatrixTableThCell} ${styles[lightHeightClass]}`}
              >
                <span className={styles.irregularVerbEnglishText}>{verb.infinitive}</span>
              </td>
              <td
                className={`${styles.irregularVerbMatrixTableThCell} ${styles[lightHeightClass]}`}
              >
                <span className={styles.irregularVerbEnglishText}>{verb.past}</span>
              </td>
              <td
                className={`${styles.irregularVerbMatrixTableThCell} ${styles[lightHeightClass]}`}
              >
                <span className={styles.irregularVerbEnglishText}>{verb.pastParticiple}</span>
              </td>
              <td
                className={`${styles.irregularVerbMatrixTableThCell} ${styles[lightHeightClass]}`}
              >
                <span className={styles.irregularVerbEnglishText}>{verb.ing}</span>
              </td>
              <td
                className={`${styles.irregularVerbMatrixTableThCell} ${styles[lightHeightClass]}`}
              >
                <span className={styles.irregularVerbJapaneseText}>{verb.meaning}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
