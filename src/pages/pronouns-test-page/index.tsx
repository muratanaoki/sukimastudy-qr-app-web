import { useMemo } from 'react';
import styles from './index.module.css';
import { PronounItem } from './utils/type';
import { DATA_RAW } from './utils/const';
import { PronounGroup } from './utils/enum';

const DATA: PronounItem[] = DATA_RAW.map((d, i) => ({ index: i + 1, ...d }));

export default function PronounsTestPage() {
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
      <header className={styles.header}>
        <h1 className={styles.title}>Pronouns Catalog</h1>
        <p className={styles.subtitle}>ジャンル / 単語 / IPA（米音） / 日本語訳</p>
        {/* 検索 UI は削除済み */}
      </header>

      <main className={styles.main}>
        {[...grouped.entries()].map(([group, items]) => (
          <section key={group} className={styles.section}>
            <div className={styles.groupHeader}>
              <h2 className={styles.groupTitle}>{labelGroup(group as PronounItem['group'])}</h2>
              <span className={styles.groupBadge}>{items.length} items</span>
            </div>

            <ul className={styles.cardGrid}>
              {items.map((it) => (
                <PronounCard key={it.index} item={it} />
              ))}
            </ul>
          </section>
        ))}
      </main>
    </div>
  );
}

type ExampleEntry = { level: 'J1' | 'J2' | 'J3'; en?: string; jp?: string };

function buildExamples(it: PronounItem): ExampleEntry[] {
  return (
    [
      { level: 'J1' as const, en: it.exJ1, jp: it.exJ1Jp },
      { level: 'J2' as const, en: it.exJ2, jp: it.exJ2Jp },
      { level: 'J3' as const, en: it.exJ3, jp: it.exJ3Jp },
    ]
      // どちらかがあれば表示
      .filter((e) => e.en || e.jp)
  );
}

function PronounCard({ item }: { item: PronounItem }) {
  const exs = buildExamples(item);
  return (
    <li className={styles.card}>
      <div className={styles.cardHeader}>
        <div className={styles.termRow}>
          <span className={styles.term} lang="en">
            {item.term}
          </span>
          <span className={styles.ipa} lang="en">
            {item.ipa}
          </span>
        </div>
        <span className={styles.index}>#{item.index}</span>
      </div>
      <div className={styles.jp}>{item.jp}</div>
      <ExampleList items={exs} />
    </li>
  );
}

function ExampleList({ items }: { items: ExampleEntry[] }) {
  if (!items.length) return null;
  return (
    <ul className={styles.examples}>
      {items.map((ex) => (
        <li key={ex.level} className={styles.exampleItem}>
          <div className={styles.exampleEnRow}>
            <span className={styles.level}>{ex.level}</span>
            {ex.en && (
              <span className={styles.exampleEn} lang="en">
                {ex.en}
              </span>
            )}
          </div>
          {ex.jp && <div className={styles.exampleJp}>{ex.jp}</div>}
        </li>
      ))}
    </ul>
  );
}

function labelGroup(g: PronounItem['group']) {
  switch (g) {
    case PronounGroup.Personal:
      return '01. 人称・所有・再帰代名詞 (Personal / Possessive / Reflexive)';
    case PronounGroup.IndefPersonThing:
      return '02. 不定代名詞（人・物・事） (Indefinite: person/thing)';
    case PronounGroup.IndefQuantityPartitive:
      return '03. 不定代名詞（数量・全体・部分など） (Indefinite: quantity/partitive)';
    case PronounGroup.Demonstrative:
      return '04. 指示代名詞・その他 (Demonstrative & Other)';
  }
}
