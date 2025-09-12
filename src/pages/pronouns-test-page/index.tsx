import { useMemo } from 'react';
import styles from './index.module.css';
import { PronounItem } from './utils/type';
import { DATA_RAW } from './utils/const';
import { PronounGroup } from './utils/enum';
import { useSpeech } from './hooks/useSpeech';
import { PronounCard } from './components/PronounCard';

const DATA: PronounItem[] = DATA_RAW.map((d, i) => ({ index: i + 1, ...d }));

export default function PronounsTestPage() {
  const speech = useSpeech();
  const filtered = DATA;

  // グルーピング（group のみ）
  const grouped = useMemo(() => {
    const map = new Map<PronounGroup, PronounItem[]>();
    for (const item of filtered) {
      if (!map.has(item.group)) map.set(item.group, []);
      map.get(item.group)!.push(item);
    }
    return map;
  }, [filtered]);

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        {[...grouped.entries()].map(([group, items]) => (
          <section key={group} className={styles.section}>
            <div className={styles.groupHeader}>
              <h2 className={styles.groupTitle}>{labelGroup(group as PronounItem['group'])}</h2>
              <span className={styles.groupBadge}>{items.length} items</span>
            </div>

            <ul className={styles.cardGrid}>
              {items.map((it, idx) => (
                <PronounCard
                  key={`${group}-${idx + 1}`}
                  item={{ ...it, index: idx + 1 }}
                  speech={speech}
                />
              ))}
            </ul>
          </section>
        ))}
      </main>
    </div>
  );
}

function labelGroup(g: PronounItem['group']) {
  switch (g) {
    case PronounGroup.Personal:
      return '01. 人称・所有・再帰代名詞';
    case PronounGroup.IndefPersonThing:
      return '02. 不定代名詞（人・物・事）';
    case PronounGroup.IndefQuantityPartitive:
      return '03. 不定代名詞（数量・全体・部分など）';
    case PronounGroup.Demonstrative:
      return '04. 指示代名詞・その他';
  }
}
