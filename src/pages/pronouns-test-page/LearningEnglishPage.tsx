import styles from './index.module.css';
import { useSpeech } from './hooks/useSpeech';
import { EnglishWord } from './components/EnglishWord';
import { User, FileCheck } from 'lucide-react';
import type { PronounData } from './utils/type';
import { useState, useCallback } from 'react';
import { useFabHideOnBottom } from './hooks/useFabHideOnBottom';
import { useBodyScrollLock } from './hooks/useBodyScrollLock';
import { TestIntroDialog } from './components/TestIntroDialog';

export type LearningEnglishPageProps = {
  data: PronounData;
};

export default function LearningEnglishPage({ data }: LearningEnglishPageProps) {
  const speech = useSpeech();
  const { groupNo, title, items } = data;
  const hideFab = useFabHideOnBottom();
  const [showTest, setShowTest] = useState(false);
  const [selectedRange, setSelectedRange] = useState<{ start: number; end: number } | null>(null);

  const fabWrapperClass = hideFab
    ? `${styles.testFabWrapper} ${styles.hide}`
    : styles.testFabWrapper;

  const openTest = useCallback(() => {
    setShowTest(true);
    setSelectedRange(null); // 開くたびリセット
  }, []);

  const closeTest = useCallback(() => {
    setShowTest(false);
  }, []);

  // 背景スクロールロック
  useBodyScrollLock(showTest);

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
        <button
          type="button"
          className={styles.testFabButton}
          aria-label="テスト開始"
          onClick={openTest}
        >
          <FileCheck className={styles.testFabIcon} />
          <span className={styles.testFabText}>テスト</span>
        </button>
      </div>
      {showTest && (
        <TestIntroDialog
          items={items}
          onClose={closeTest}
          selectedRange={selectedRange}
          onSelectRange={(seg) => {
            setSelectedRange({ start: seg.start, end: seg.end });
            console.log('Select range', seg.start, seg.end, seg.items.length);
          }}
          onStart={(seg) => {
            console.log(
              'Start test range',
              seg.start,
              seg.end,
              seg.items.length,
              'order=',
              seg.questionOrder,
              'mode=',
              seg.answerMode
            );
            closeTest();
          }}
        />
      )}
    </div>
  );
}
