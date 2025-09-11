import React from 'react';
import styles from '@/shared/styles/styles.module.css';

/**
 * 英語の動詞（be動詞とdo動詞）のマトリクスコンポーネント
 */
export const VerbMatrix: React.FC = () => {
  return (
    <div>
      <table className={styles.matrixTable}>
        <thead>
          <tr>
            <th className={`${styles.matrixTableTh}`} rowSpan={2}>
              動詞
            </th>
            <th className={`${styles.matrixTableTh}`} rowSpan={2}>
              数
            </th>
            <th className={`${styles.matrixTableTh}`} colSpan={2}>
              現在形
            </th>
            <th className={`${styles.matrixTableTh}`} colSpan={2}>
              過去形
            </th>
            <th className={`${styles.matrixTableTh}`} rowSpan={2}>
              過去分詞
            </th>
          </tr>
          <tr>
            <th className={`${styles.matrixTableTh}`}>肯定形</th>
            <th className={`${styles.matrixTableTh}`}>否定形</th>
            <th className={`${styles.matrixTableTh}`}>肯定形</th>
            <th className={`${styles.matrixTableTh}`}>否定形</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td rowSpan={3} className={styles.sideCell}>
              be動詞
            </td>
            <td className={styles.sideCell}>一人称単数</td>
            <td className={styles.verbFormCell}>
              <div className={styles.englishText}>am</div>
              <div className={styles.japaneseText}>〜です</div>
            </td>
            <td className={styles.verbFormCell}>
              <div className={styles.englishText}>
                am not <br /> I&apos;m not
              </div>
              <div className={styles.japaneseText}>〜ではない</div>
            </td>
            <td className={styles.verbFormCell}>
              <div className={styles.englishText}>was</div>
              <div className={styles.japaneseText}>〜でした</div>
            </td>
            <td className={styles.verbFormCell}>
              <div className={styles.englishText}>
                was not
                <br />
                wasn&apos;t
              </div>
              <div className={styles.japaneseText}>〜ではなかった</div>
            </td>
            <td rowSpan={3} className={styles.verbFormCell}>
              <div className={styles.englishText}>been</div>
              <div className={styles.japaneseText}>〜であった</div>
            </td>
          </tr>
          <tr>
            <td className={styles.sideCell}>二人称複数</td>
            <td className={styles.verbFormCell}>
              <div className={styles.englishText}>are</div>
              <div className={styles.japaneseText}>〜です</div>
            </td>
            <td className={styles.verbFormCell}>
              <div className={styles.englishText}>
                are not
                <br />
                aren&apos;t
              </div>
              <div className={styles.japaneseText}>〜ではない</div>
            </td>
            <td className={styles.verbFormCell}>
              <div className={styles.englishText}>were</div>
              <div className={styles.japaneseText}>〜でした</div>
            </td>
            <td className={styles.verbFormCell}>
              <div className={styles.englishText}>
                were not
                <br />
                weren&apos;t
              </div>
              <div className={styles.japaneseText}>〜ではなかった</div>
            </td>
          </tr>
          <tr>
            <td className={styles.sideCell}>三人称単数</td>
            <td className={styles.verbFormCell}>
              <div className={styles.englishText}>is</div>
              <div className={styles.japaneseText}>〜です</div>
            </td>
            <td className={styles.verbFormCell}>
              <div className={styles.englishText}>
                is not
                <br />
                isn&apos;t
              </div>
              <div className={styles.japaneseText}>〜ではない</div>
            </td>
            <td className={styles.verbFormCell}>
              <div className={styles.englishText}>was</div>
              <div className={styles.japaneseText}>〜でした</div>
            </td>
            <td className={styles.verbFormCell}>
              <div className={styles.englishText}>
                was not
                <br />
                wasn&apos;t
              </div>
              <div className={styles.japaneseText}>〜ではなかった</div>
            </td>
          </tr>
          <tr>
            <td rowSpan={2} className={styles.sideCell}>
              一般動詞
            </td>
            <td className={styles.sideCell}>一般</td>
            <td className={styles.verbFormCell}>
              <div className={styles.englishText}>do</div>
              <div className={styles.japaneseText}>〜する</div>
            </td>
            <td className={styles.verbFormCell}>
              <div className={styles.englishText}>
                do not
                <br />
                don&apos;t
              </div>
              <div className={styles.japaneseText}>〜しない</div>
            </td>
            <td rowSpan={2} className={styles.verbFormCell}>
              <div className={styles.englishText}>did</div>
              <div className={styles.japaneseText}>〜した</div>
            </td>
            <td rowSpan={2} className={styles.verbFormCell}>
              <div className={styles.englishText}>
                did not
                <br />
                didn&apos;t
              </div>
              <div className={styles.japaneseText}>〜しなかった</div>
            </td>
            <td rowSpan={2} className={styles.verbFormCell}>
              <div className={styles.englishText}>done</div>
              <div className={styles.japaneseText}>〜した</div>
            </td>
          </tr>
          <tr>
            <td className={styles.sideCell}>三人称単数</td>
            <td className={styles.verbFormCell}>
              <div className={styles.englishText}>does</div>
              <div className={styles.japaneseText}>〜する</div>
            </td>
            <td className={styles.verbFormCell}>
              <div className={styles.englishText}>
                does not
                <br />
                doesn&apos;t
              </div>
              <div className={styles.japaneseText}>〜しない</div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default VerbMatrix;
