import styles from './learningEnglishPage.module.css';
import { useSpeech } from './hooks/useSpeech';
import { EnglishWord } from './components/EnglishWord';
import type { PronounGroup } from './utils/type';
import { useFabHideOnBottom } from './hooks/useFabHideOnBottom';
import { useMemo } from 'react';
import { useBodyScrollLock } from './hooks/useBodyScrollLock';
import { TestIntroDialog } from './components/TestIntroDialog';
import { SettingDialog } from './components/SettingDialog';
import { GroupTabs } from './components/GroupTabs';
import { TestFabButton } from './components/TestFabButton';
import { useSwipeTabs } from './hooks/useSwipeTabs';
import { TestDialog } from './components/TestDialog';
import { TestSettingsProvider } from './hooks/TestSettingsContext';
import { useTabManager } from './hooks/useTabManager';
import { useDialogManager } from './hooks/useDialogManager';

export type LearningEnglishPageProps = {
  data: PronounGroup[]; // グループ一覧（ページ内表示は複数タブのまま）
};

export default function LearningEnglishPage({ data }: LearningEnglishPageProps) {
  const speech = useSpeech();

  // カスタムフックでタブ管理
  const { activeGroupNo, changeTab } = useTabManager(data);

  // カスタムフックでダイアログ管理
  const {
    showTest,
    showFullTest,
    showSettings,
    testItems,
    selectedRange,
    openTest,
    closeTest,
    closeFullTest,
    openSettings,
    closeSettings,
    startTest,
    setSelectedRange,
  } = useDialogManager();

  // タブ切替/内容変化で再評価されるよう依存に activeGroupNo を渡す
  const hideFab = useFabHideOnBottom(16, [activeGroupNo]);

  // 背景スクロールロック
  useBodyScrollLock(showTest || showSettings || showFullTest);

  // 水平スワイプでタブ切替
  const groupNos = useMemo(() => data.map((g) => g.groupNo), [data]);
  const swipeRef = useSwipeTabs<HTMLDivElement>(activeGroupNo, groupNos, changeTab);

  return (
    <TestSettingsProvider>
      <div className={styles.container}>
        {/* タブバー */}
        {data.length > 0 && (
          <GroupTabs
            items={data}
            activeGroupNo={activeGroupNo}
            onChange={changeTab}
            ariaLabel="品詞グループ"
          />
        )}
        <main ref={swipeRef}>
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
            item={data.find((g) => g.groupNo === activeGroupNo) ?? data[0]}
            onClose={closeTest}
            selectedRange={selectedRange}
            onSelectRange={(seg) => {
              setSelectedRange({ groupNo: seg.groupNo, start: seg.start, end: seg.end });
              console.log('Select range', seg.groupNo, seg.start, seg.end, seg.items.length);
            }}
            onStart={(seg) => {
              console.log('Start test range', seg.groupNo, seg.start, seg.end, seg.items.length);
              startTest(seg.items);
            }}
            onOpenSettings={openSettings}
          />
        )}
        {/* Full Test ダイアログ: pos は pronouns 固定、group はアクティブのグループ情報に testItems を差し替え */}
        {showFullTest &&
          (() => {
            const activeGroup = data.find((g) => g.groupNo === activeGroupNo) ?? data[0];
            const pos: { pos: 'pronouns'; url: string; title: string; groups: PronounGroup[] } = {
              pos: 'pronouns',
              url: '/pronouns',
              title: '代名詞',
              groups: [],
            };
            const group = {
              ...activeGroup,
              items: testItems,
            };
            return (
              <TestDialog open={showFullTest} onClose={closeFullTest} pos={pos} group={group} />
            );
          })()}
        {showSettings && <SettingDialog onClose={closeSettings} />}
      </div>
    </TestSettingsProvider>
  );
}
