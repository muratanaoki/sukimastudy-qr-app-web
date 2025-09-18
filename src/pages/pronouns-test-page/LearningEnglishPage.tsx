import styles from './index.module.css';
import { useSpeech } from './hooks/useSpeech';
import { EnglishWord } from './components/EnglishWord';
import { User, FileCheck } from 'lucide-react';
import type { PronounData } from './utils/type';
import { useEffect, useState } from 'react';

export type LearningEnglishPageProps = {
  data: PronounData;
};

export default function LearningEnglishPage({ data }: LearningEnglishPageProps) {
  const speech = useSpeech();
  const { groupNo, title, items } = data;
  const [hideFab, setHideFab] = useState(false);

  useEffect(() => {
    const handler = () => {
      const { scrollY, innerHeight } = window;
      const docHeight = document.documentElement.scrollHeight;
      const atBottom = scrollY + innerHeight >= docHeight - 16;
      setHideFab(atBottom);
    };
    handler();
    window.addEventListener('scroll', handler, { passive: true });
    window.addEventListener('resize', handler);
    return () => {
      window.removeEventListener('scroll', handler);
      window.removeEventListener('resize', handler);
    };
  }, []);

  // NOTE: CSS Modules では `.testFabWrapper.hide` という複合セレクタ内の `hide` も個別にハッシュ化され export される。
  // そのため文字列 'hide' を直接付与しても一致せず、 styles.hide を併用する必要がある。
  const fabWrapperClass = hideFab
    ? `${styles.testFabWrapper} ${styles.hide}`
    : styles.testFabWrapper;

  return (
    <div className={styles.container}>
      <main>
        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <h1 className={styles.titleNumber}>{String(groupNo).padStart(2, '0')}.</h1>
            <h1 className={styles.title}>{title}</h1>
            <User className={styles.headerIcon} />
          </div>
          <ul className={styles.cardGrid}>
            {items.map((it) => (
              <EnglishWord key={it.index} item={it} speech={speech} />
            ))}
          </ul>
        </section>
      </main>
      <div className={fabWrapperClass}>
        <button type="button" className={styles.testFabButton} aria-label="テスト開始">
          <FileCheck className={styles.testFabIcon} />
          <span className={styles.testFabText}>テスト</span>
        </button>
      </div>
    </div>
  );
}
