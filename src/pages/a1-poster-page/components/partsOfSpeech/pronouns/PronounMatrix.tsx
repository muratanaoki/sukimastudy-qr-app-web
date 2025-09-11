import React from 'react';
import styles from '@/shared/styles/styles.module.css';

/**
 * 英語代名詞マトリクスのテーブルを表示するコンポーネント
 */
export const PronounMatrix: React.FC = () => {
  return (
    <div>
      <table className={`${styles.matrixTable} ${styles.pronounMatrixOptimized}`}>
        <thead>
          <tr>
            <th className={`${styles.matrixTableTh}`} rowSpan={2}>
              人称
            </th>
            <th className={`${styles.matrixTableTh}`} rowSpan={2}>
              数
            </th>
            <th className={`${styles.matrixTableTh}`}>主格</th>
            <th className={`${styles.matrixTableTh}`}>所有格</th>
            <th className={`${styles.matrixTableTh}`}>目的格</th>
            <th className={`${styles.matrixTableTh}`}>所有代名詞</th>
            <th className={`${styles.matrixTableTh}`}>再帰代名詞</th>
          </tr>
        </thead>
        <tbody>
          {/* 一人称 */}
          <tr>
            <td rowSpan={2} className={styles.sideCellNarrow}>
              一人称
            </td>
            <td className={styles.sideCellNarrow}>単数</td>
            <td className={styles.cell}>
              <div className={styles.englishText}>I</div>
              <div className={styles.japaneseText}>私は</div>
            </td>
            <td className={styles.cell}>
              <div className={styles.englishText}>my</div>
              <div className={styles.japaneseText}>私の</div>
            </td>
            <td className={styles.cell}>
              <div className={styles.englishText}>me</div>
              <div className={styles.japaneseText}>私を、私に</div>
            </td>
            <td className={styles.cell}>
              <div className={styles.englishText}>mine</div>
              <div className={styles.japaneseText}>私のもの</div>
            </td>
            <td className={styles.cell}>
              <div className={styles.englishText}>myself</div>
              <div className={styles.japaneseText}>私自身</div>
            </td>
          </tr>
          <tr>
            <td className={styles.sideCellNarrow}>複数</td>
            <td className={styles.cell}>
              <div className={styles.englishText}>we</div>
              <div className={styles.japaneseText}>私たちは</div>
            </td>
            <td className={styles.cell}>
              <div className={styles.englishText}>our</div>
              <div className={styles.japaneseText}>私たちの</div>
            </td>
            <td className={styles.cell}>
              <div className={styles.englishText}>us</div>
              <div className={styles.japaneseText}>私たちを、私たちに</div>
            </td>
            <td className={styles.cell}>
              <div className={styles.englishText}>ours</div>
              <div className={styles.japaneseText}>私たちのもの</div>
            </td>
            <td className={styles.cell}>
              <div className={styles.englishText}>ourselves</div>
              <div className={styles.japaneseText}>私たち自身</div>
            </td>
          </tr>

          {/* 二人称 */}
          <tr>
            <td rowSpan={2} className={styles.sideCellNarrow}>
              二人称
            </td>
            <td className={styles.sideCellNarrow}>単数</td>
            <td className={styles.cell}>
              <div className={styles.englishText}>you</div>
              <div className={styles.japaneseText}>あなたは</div>
            </td>
            <td className={styles.cell}>
              <div className={styles.englishText}>your</div>
              <div className={styles.japaneseText}>あなたの</div>
            </td>
            <td className={styles.cell}>
              <div className={styles.englishText}>you</div>
              <div className={styles.japaneseText}>あなたを、あなたに</div>
            </td>
            <td className={styles.cell}>
              <div className={styles.englishText}>yours</div>
              <div className={styles.japaneseText}>あなたのもの</div>
            </td>
            <td className={styles.cell}>
              <div className={styles.englishText}>yourself</div>
              <div className={styles.japaneseText}>あなた自身</div>
            </td>
          </tr>
          <tr>
            <td className={styles.sideCellNarrow}>複数</td>
            <td className={styles.cell}>
              <div className={styles.englishText}>you</div>
              <div className={styles.japaneseText}>あなたたちは</div>
            </td>
            <td className={styles.cell}>
              <div className={styles.englishText}>your</div>
              <div className={styles.japaneseText}>あなたたちの</div>
            </td>
            <td className={styles.cell}>
              <div className={styles.englishText}>you</div>
              <div className={styles.japaneseText}>あなたたちを、あなたたちに</div>
            </td>
            <td className={styles.cell}>
              <div className={styles.englishText}>yours</div>
              <div className={styles.japaneseText}>あなたたちのもの</div>
            </td>
            <td className={styles.cell}>
              <div className={styles.englishText}>yourselves</div>
              <div className={styles.japaneseText}>あなたたち自身</div>
            </td>
          </tr>

          {/* 三人称 - 男性 */}
          <tr>
            <td rowSpan={4} className={styles.sideCellNarrow}>
              三人称
            </td>
            <td rowSpan={3} className={styles.sideCellNarrow}>
              単数
            </td>
            <td className={styles.cell}>
              <div className={styles.englishText}>he</div>
              <div className={styles.japaneseText}>彼は</div>
            </td>
            <td className={styles.cell}>
              <div className={styles.englishText}>his</div>
              <div className={styles.japaneseText}>彼の</div>
            </td>
            <td className={styles.cell}>
              <div className={styles.englishText}>him</div>
              <div className={styles.japaneseText}>彼を、彼に</div>
            </td>
            <td className={styles.cell}>
              <div className={styles.englishText}>his</div>
              <div className={styles.japaneseText}>彼のもの</div>
            </td>
            <td className={styles.cell}>
              <div className={styles.englishText}>himself</div>
              <div className={styles.japaneseText}>彼自身</div>
            </td>
          </tr>

          {/* 三人称 - 女性 */}
          <tr>
            <td className={styles.cell}>
              <div className={styles.englishText}>she</div>
              <div className={styles.japaneseText}>彼女は</div>
            </td>
            <td className={styles.cell}>
              <div className={styles.englishText}>her</div>
              <div className={styles.japaneseText}>彼女の</div>
            </td>
            <td className={styles.cell}>
              <div className={styles.englishText}>her</div>
              <div className={styles.japaneseText}>彼女を、彼女に</div>
            </td>
            <td className={styles.cell}>
              <div className={styles.englishText}>hers</div>
              <div className={styles.japaneseText}>彼女のもの</div>
            </td>
            <td className={styles.cell}>
              <div className={styles.englishText}>herself</div>
              <div className={styles.japaneseText}>彼女自身</div>
            </td>
          </tr>

          {/* 三人称 - 物 */}
          <tr>
            <td className={styles.cell}>
              <div className={styles.englishText}>it</div>
              <div className={styles.japaneseText}>それは</div>
            </td>
            <td className={styles.cell}>
              <div className={styles.englishText}>its</div>
              <div className={styles.japaneseText}>それの</div>
            </td>
            <td className={styles.cell}>
              <div className={styles.englishText}>it</div>
              <div className={styles.japaneseText}>それを、それに</div>
            </td>
            <td className={styles.cell}>
              <div className={styles.englishText}>-</div>
            </td>
            <td className={styles.cell}>
              <div className={styles.englishText}>itself</div>
              <div className={styles.japaneseText}>それ自身</div>
            </td>
          </tr>

          {/* 三人称 - 複数 */}
          <tr>
            <td className={styles.sideCellNarrow}>複数</td>
            <td className={styles.cell}>
              <div className={styles.englishText}>they</div>
              <div className={styles.japaneseText}>彼らは</div>
            </td>
            <td className={styles.cell}>
              <div className={styles.englishText}>their</div>
              <div className={styles.japaneseText}>彼らの</div>
            </td>
            <td className={styles.cell}>
              <div className={styles.englishText}>them</div>
              <div className={styles.japaneseText}>彼らを、彼らに</div>
            </td>
            <td className={styles.cell}>
              <div className={styles.englishText}>theirs</div>
              <div className={styles.japaneseText}>彼らのもの</div>
            </td>
            <td className={styles.cell}>
              <div className={styles.englishText}>themselves</div>
              <div className={styles.japaneseText}>彼ら自身</div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default PronounMatrix;
