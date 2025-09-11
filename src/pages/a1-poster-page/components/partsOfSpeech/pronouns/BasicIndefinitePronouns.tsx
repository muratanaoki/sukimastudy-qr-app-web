import React from 'react';
import styles from '@/shared/styles/styles.module.css';

/**
 * 基本的な不定代名詞マトリクス（some, any, every, no系）を表示するコンポーネント
 */
export const BasicIndefinitePronouns: React.FC = () => {
  return (
    <div>
      <table className={`${styles.matrixTable} ${styles.indefinitePronounMatrix}`}>
        <thead>
          <tr>
            <th className={`${styles.matrixTableTh}`}>接頭辞</th>
            <th className={`${styles.matrixTableTh}`}>人</th>
            <th className={`${styles.matrixTableTh}`}>物</th>
          </tr>
        </thead>
        <tbody>
          {/* some系 */}
          <tr>
            <td className={`${styles.sideCell}`} rowSpan={1}>
              some
            </td>
            <td className={styles.cell}>
              <div className={styles.pronounPair}>
                <span className={styles.englishText}>someone / somebody</span>
                <span className={styles.japaneseText}>誰か</span>
              </div>
            </td>
            <td className={styles.cell}>
              <div className={styles.pronounPair}>
                <span className={styles.englishText}>something</span>
                <span className={styles.japaneseText}>何か</span>
              </div>
            </td>
          </tr>

          {/* any系 */}
          <tr>
            <td className={`${styles.sideCell}`} rowSpan={1}>
              any
            </td>
            <td className={styles.cell}>
              <div className={styles.pronounPair}>
                <span className={styles.englishText}>anyone / anybody</span>
                <span className={styles.japaneseText}>誰でも、誰か</span>
              </div>
            </td>
            <td className={styles.cell}>
              <div className={styles.pronounPair}>
                <span className={styles.englishText}>anything</span>
                <span className={styles.japaneseText}>何でも、何か</span>
              </div>
            </td>
          </tr>

          {/* every系 */}
          <tr>
            <td className={`${styles.sideCell}`} rowSpan={1}>
              every
            </td>
            <td className={styles.cell}>
              <div className={styles.pronounPair}>
                <span className={styles.englishText}>everyone / everybody</span>
                <span className={styles.japaneseText}>みんな</span>
              </div>
            </td>
            <td className={styles.cell}>
              <div className={styles.pronounPair}>
                <span className={styles.englishText}>everything</span>
                <span className={styles.japaneseText}>すべて</span>
              </div>
            </td>
          </tr>

          {/* no系 */}
          <tr>
            <td className={`${styles.sideCell}`} rowSpan={1}>
              no
            </td>
            <td className={styles.cell}>
              <div className={styles.pronounPair}>
                <span className={styles.englishText}>no one / nobody</span>
                <span className={styles.japaneseText}>誰も〜ない</span>
              </div>
            </td>
            <td className={styles.cell}>
              <div className={styles.pronounPair}>
                <span className={styles.englishText}>nothing</span>
                <span className={styles.japaneseText}>何も〜ない</span>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
