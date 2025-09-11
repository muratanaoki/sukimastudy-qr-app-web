import React from 'react';
import styles from '@/shared/styles/styles.module.css';

export interface ComparativeData {
  english: string;
  comparative: string;
  superlative: string;
  japanese: string;
}

interface ComparativeAndSuperlativeMatrixProps {
  /** 表示する不規則動詞のデータ */
  data: ComparativeData[];
}

export const ComparativeAndSuperlativeMatrix: React.FC<ComparativeAndSuperlativeMatrixProps> = ({
  data,
}) => {
  return (
    <div>
      <table className={`${styles.matrixTable}`}>
        <thead>
          <tr>
            <th
              className={`${styles.comparativeAndSuperlativeMatrixTableTh} ${styles.comparativeAndSuperlativeLineHeight}`}
            >
              原形
            </th>
            <th
              className={`${styles.comparativeAndSuperlativeMatrixTableTh} ${styles.comparativeAndSuperlativeLineHeight}`}
            >
              比較級
            </th>
            <th
              className={`${styles.comparativeAndSuperlativeMatrixTableTh} ${styles.comparativeAndSuperlativeLineHeight}`}
            >
              最上級
            </th>
            <th
              className={`${styles.comparativeAndSuperlativeMatrixTableTh} ${styles.comparativeAndSuperlativeLineHeight}`}
            >
              意味
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={`${item.english}-${index}`}>
              <td
                className={`${styles.comparativeAndSuperlativeMatrixTableThCell} ${styles.comparativeAndSuperlativeLineHeight}`}
              >
                <span className={styles.comparativeAndSuperlativeEnglishText}>{item.english}</span>
              </td>
              <td
                className={`${styles.comparativeAndSuperlativeMatrixTableThCell} ${styles.comparativeAndSuperlativeLineHeight}`}
              >
                <span className={styles.comparativeAndSuperlativeEnglishText}>
                  {item.comparative}
                </span>
              </td>
              <td
                className={`${styles.comparativeAndSuperlativeMatrixTableThCell} ${styles.comparativeAndSuperlativeLineHeight}`}
              >
                <span className={styles.comparativeAndSuperlativeEnglishText}>
                  {item.superlative}
                </span>
              </td>
              <td
                className={`${styles.comparativeAndSuperlativeMatrixTableThCell} ${styles.comparativeAndSuperlativeLineHeight}`}
              >
                <span className={styles.comparativeAndSuperlativeJapaneseText}>
                  {item.japanese}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
