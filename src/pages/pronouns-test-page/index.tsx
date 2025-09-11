import { useMemo } from 'react';
import styles from './index.module.css';
import { PronounItem } from './utils/type';
import { DATA_RAW } from './utils/const';
import { PronounGroup } from './utils/enum';
import { Square } from 'lucide-react';
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
      <header className={styles.header}>
        <h1 className={styles.title}>Pronouns Catalog</h1>
        <p className={styles.subtitle}>ジャンル / 単語 / IPA（米音） / 日本語訳</p>
        {/* 簡易TTSコントロール */}
        <div className={styles.controls}>
          <span className={styles.count}>TTS: {speech.supported ? '対応' : '未対応'}</span>
          <button
            type="button"
            className={styles.iconButton}
            onClick={speech.cancel}
            title="読み上げ停止"
            aria-label="Stop speech"
            disabled={!speech.speaking}
          >
            <Square size={18} />
          </button>
        </div>
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
                <PronounCard key={it.index} item={it} speech={speech} />
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
      return '01. 人称・所有・再帰代名詞 (Personal / Possessive / Reflexive)';
    case PronounGroup.IndefPersonThing:
      return '02. 不定代名詞（人・物・事） (Indefinite: person/thing)';
    case PronounGroup.IndefQuantityPartitive:
      return '03. 不定代名詞（数量・全体・部分など） (Indefinite: quantity/partitive)';
    case PronounGroup.Demonstrative:
      return '04. 指示代名詞・その他 (Demonstrative & Other)';
  }
}
