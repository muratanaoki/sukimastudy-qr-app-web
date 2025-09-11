import { useMemo } from 'react';
import styles from './index.module.css';
import { PronounItem } from './utils/type';
import { DATA_RAW } from './utils/const';

const DATA: PronounItem[] = DATA_RAW.map((d, i) => ({ index: i + 1, ...d }));

export default function PronounsTestPage() {
  const filtered = DATA;

  // グルーピング（group→subGroup）
  const grouped = useMemo(() => {
    const map = new Map<string, Map<string, PronounItem[]>>();
    for (const item of filtered) {
      if (!map.has(item.group)) map.set(item.group, new Map());
      const sub = item.subGroup ?? '—';
      const inner = map.get(item.group)!;
      if (!inner.has(sub)) inner.set(sub, []);
      inner.get(sub)!.push(item);
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
        {[...grouped.entries()].map(([group, subMap]) => (
          <section key={group} className={styles.section}>
            <div className={styles.groupHeader}>
              <h2 className={styles.groupTitle}>{labelGroup(group as PronounItem['group'])}</h2>
              <span className={styles.groupBadge}>
                {[...subMap.values()].reduce((acc, arr) => acc + arr.length, 0)} items
              </span>
            </div>

            {[...subMap.entries()].map(([sub, items]) => (
              <div key={group + sub} className={styles.subSection}>
                <h3 className={styles.subTitle}>{sub}</h3>
                <ul className={styles.cardGrid}>
                  {items.map((it) => (
                    <li key={it.index} className={styles.card}>
                      <div className={styles.cardRow}>
                        <span className={styles.index}>#{it.index}</span>
                        <span className={styles.term} lang="en">
                          {it.term}
                        </span>
                      </div>
                      <div className={styles.cardRow}>
                        <span className={styles.ipa} lang="en">
                          {it.ipa}
                        </span>
                      </div>
                      <div className={styles.cardRow}>
                        <span className={styles.jp}>{it.jp}</span>
                      </div>
                      <div className={styles.meta}>
                        <span className={styles.metaPill}>{shortGroup(it.group)}</span>
                        {it.subGroup && <span className={styles.metaPill}>{it.subGroup}</span>}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </section>
        ))}
      </main>
    </div>
  );
}

function labelGroup(g: PronounItem['group']) {
  switch (g) {
    case 'Personal/Possessive/Reflexive':
      return '01. 人称・所有・再帰代名詞 (Personal / Possessive / Reflexive)';
    case 'Indefinite (person/thing)':
      return '02. 不定代名詞（人・物・事） (Indefinite: person/thing)';
    case 'Indefinite (quantity/partitive)':
      return '03. 不定代名詞（数量・全体・部分など） (Indefinite: quantity/partitive)';
    case 'Demonstrative/Other':
      return '04. 指示代名詞・その他 (Demonstrative & Other)';
  }
}

function shortGroup(g: PronounItem['group']) {
  switch (g) {
    case 'Personal/Possessive/Reflexive':
      return 'Personal';
    case 'Indefinite (person/thing)':
      return 'Indefinite-P/T';
    case 'Indefinite (quantity/partitive)':
      return 'Indefinite-Q';
    case 'Demonstrative/Other':
      return 'Demonstrative';
  }
}
