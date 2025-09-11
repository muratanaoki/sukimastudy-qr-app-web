import styles from '../index.module.css';
import { Volume2 } from 'lucide-react';
import type { PronounItem, ExampleEntry } from '../utils/type';
import { JLevel } from '../utils/enum';
import { ExampleList } from './ExampleList';
import type { UseSpeech } from '../hooks/useSpeech';

function buildExamples(it: PronounItem): ExampleEntry[] {
  return (
    [
      { level: JLevel.J1, en: it.exJ1, jp: it.exJ1Jp },
      { level: JLevel.J2, en: it.exJ2, jp: it.exJ2Jp },
      { level: JLevel.J3, en: it.exJ3, jp: it.exJ3Jp },
    ]
      // どちらかがあれば表示
      .filter((e) => e.en || e.jp)
  );
}

export function PronounCard({ item, speech }: { item: PronounItem; speech: UseSpeech }) {
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
          <button
            type="button"
            className={styles.iconButton}
            onClick={() => speech.speak(item.term)}
            title="単語を再生"
            aria-label={`Speak term ${item.term}`}
          >
            <Volume2 size={18} />
          </button>
        </div>
        <span className={styles.index}>#{item.index}</span>
      </div>
      <div className={styles.jp}>{item.jp}</div>
      <ExampleList items={exs} onSpeak={(t) => speech.speak(t)} />
    </li>
  );
}

export default PronounCard;
