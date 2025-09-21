import styles from './learningEnglishPage.module.css';
import { useSpeech } from './hooks/useSpeech';
import { EnglishWord } from './components/EnglishWord';
import type { PronounGroup } from './utils/type';
import { useFabHideOnBottom } from './hooks/useFabHideOnBottom';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useBodyScrollLock } from './hooks/useBodyScrollLock';
import { TestIntroDialog } from './components/TestIntroDialog';
import { GroupTabs } from './components/GroupTabs';
import { TestFabButton } from './components/TestFabButton';

export type LearningEnglishPageProps = {
  data: PronounGroup[]; // 配列
};

export default function LearningEnglishPage({ data }: LearningEnglishPageProps) {
  const speech = useSpeech();

  const hideFab = useFabHideOnBottom();
  const [showTest, setShowTest] = useState(false);
  // タブのアクティブ状態: 初期は最初のグループ
  const initialGroupNo = useMemo(() => (data && data.length > 0 ? data[0].groupNo : 0), [data]);
  const [activeGroupNo, setActiveGroupNo] = useState<number>(initialGroupNo);
  // dataが変わってアクティブが存在しなくなった場合のフォールバック
  useEffect(() => {
    if (!data || data.length === 0) return;
    const exists = data.some((g) => g.groupNo === activeGroupNo);
    if (!exists) {
      setActiveGroupNo(data[0].groupNo);
    }
  }, [data, activeGroupNo]);
  const [selectedRange, setSelectedRange] = useState<{
    groupNo: number;
    start: number;
    end: number;
  } | null>(null);

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
      {/* タブバー */}
      {data.length > 0 && (
        <GroupTabs
          items={data}
          activeGroupNo={activeGroupNo}
          onChange={setActiveGroupNo}
          ariaLabel="品詞グループ"
        />
      )}
      <main>
        {data.map(({ groupNo, title, items, icon: IconComp }) => {
          const isActive = groupNo === activeGroupNo;
          return (
            <section
              key={groupNo}
              id={`panel-${groupNo}`}
              role="tabpanel"
              aria-labelledby={`tab-${groupNo}`}
              hidden={!isActive}
              className={styles.section}
            >
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
          );
        })}
      </main>

      <TestFabButton hidden={hideFab} onClick={openTest} />
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
