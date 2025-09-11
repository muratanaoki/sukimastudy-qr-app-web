import React from 'react';
import { A4Cell } from '../a1-poster-page/components/common/A4Cell';
import styles from '@/shared/styles/styles.module.css';
import { pronounANdPrepositionAndNounsCellData } from '../a1-poster-page/components/a1-posters/PronounANdPrepositionAndNounsPoster';
import { nounsCellData } from '../a1-poster-page/components/a1-posters/NounsPoster';

/**
 * A4ポスター印刷専用ページコンポーネント
 * 各A4ポスターを縦に一列に並べて表示し、印刷時に1ページ1枚になるように設計
 */
const A4PrintPage: React.FC = () => {
  return (
    <div className={`${styles.printPage} ${styles.themeGreen}`}>
      <div className={styles.a4Container}>
        {pronounANdPrepositionAndNounsCellData.map((cell, index) => (
          <div key={index} className={styles.a4PrintWrapper}>
            <A4Cell cell={cell} index={index} />
          </div>
        ))}
        {nounsCellData.map((cell, index) => (
          <div key={index} className={styles.a4PrintWrapper}>
            <A4Cell cell={cell} index={index} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default A4PrintPage;
