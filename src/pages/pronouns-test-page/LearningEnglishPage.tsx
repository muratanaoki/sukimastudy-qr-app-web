import styles from './learningEnglishPage.module.css';
import { useSpeech } from './hooks/useSpeech';
import { EnglishWord } from './components/EnglishWord';
import type { PronounGroup } from './utils/type';
import { useFabHideOnBottom } from './hooks/useFabHideOnBottom';
import { useCallback, useState } from 'react';
import { useBodyScrollLock } from './hooks/useBodyScrollLock';
import { FileCheck } from 'lucide-react';
import { TestIntroDialog } from './components/TestIntroDialog';

export type LearningEnglishPageProps = {
  data: PronounGroup[]; // 配列
};

export default function LearningEnglishPage({ data }: LearningEnglishPageProps) {
  const speech = useSpeech();

  const hideFab = useFabHideOnBottom();
  const [showTest, setShowTest] = useState(false);
  const [selectedRange, setSelectedRange] = useState<{
    groupNo: number;
    start: number;
    end: number;
  } | null>(null);

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
        {data.map(({ groupNo, title, items, icon: IconComp }) => (
          <section key={groupNo} className={styles.section}>
            <div className={styles.sectionHeader}>
              <h1 className={styles.titleNumber}>{String(groupNo).padStart(2, '0')}.</h1>
              <h1 className={styles.title}>{title}</h1>
              <IconComp className={styles.headerIcon} />
            </div>
            <ul className={styles.cardGrid}>
              {items.map((it) => (
                <EnglishWord key={it.index} item={it} speech={speech} />
              ))}
            </ul>
          </section>
        ))}
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
          items={data}
          onClose={closeTest}
          selectedRange={selectedRange}
          onSelectRange={(seg) => {
            setSelectedRange({ groupNo: seg.groupNo, start: seg.start, end: seg.end });
            console.log('Select range', seg.groupNo, seg.start, seg.end, seg.items.length);
          }}
          onStart={(seg) => {
            console.log('Start test range', seg.groupNo, seg.start, seg.end, seg.items.length);
            closeTest();
          }}
        />
      )}
    </div>
  );
}
