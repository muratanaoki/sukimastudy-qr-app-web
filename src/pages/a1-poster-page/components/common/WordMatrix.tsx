import React from 'react';
import styles from '@/shared/styles/styles.module.css';
import type { WordPairArray } from '../../../../shared/types';

interface WordMatrixProps {
  /** 表示するワードペアのデータ */
  data: WordPairArray;
  /** テーブルの列数 */
  columns: number;
}

/**
 * 英語と日本語のワードペアをマトリクス形式で表示する再利用可能なコンポーネント
 */
export const WordMatrix: React.FC<WordMatrixProps> = ({ data, columns }) => {
  const rows = Math.ceil(data.length / columns);

  return (
    <div>
      <table className={styles.matrixTable}>
        <tbody>
          {Array.from({ length: rows }, (_, rowIndex) => (
            <tr key={`row-${rowIndex}`}>
              {Array.from({ length: columns }, (_, colIndex) => {
                const dataIndex = rowIndex * columns + colIndex;
                const item = data[dataIndex];

                return (
                  <td key={`cell-${rowIndex}-${colIndex}`} className={styles.cell}>
                    {item?.linkNo && item.linkNo.length > 0 && (
                      // <div className={styles.linkNo}>
                      //   {item.linkNo.map((n: number) => n.toString().padStart(2, '0')).join(',')}
                      // </div>
                      <></>
                    )}
                    {item && (
                      <div className={styles.pronounPair}>
                        <span className={styles.englishText}>{item.english}</span>
                        <span className={styles.japaneseText}>{item.japanese}</span>
                      </div>
                    )}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
