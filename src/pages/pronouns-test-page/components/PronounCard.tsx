import { memo, useMemo, useState, useId } from 'react';
import styles from '../index.module.css';
import { Volume2 } from 'lucide-react';
import type { PronounItem, ExampleEntry } from '../utils/type';
import { JLevel } from '../utils/enum';
import { ExampleList } from './ExampleList';
import type { UseSpeech } from '../hooks/useSpeech';

function buildExamples(it: PronounItem): ExampleEntry[] {
  return [
    { level: JLevel.J1, en: it.exJ1, jp: it.exJ1Jp },
    { level: JLevel.J2, en: it.exJ2, jp: it.exJ2Jp },
    { level: JLevel.J3, en: it.exJ3, jp: it.exJ3Jp },
  ].filter((e) => e.en || e.jp);
}

function PronounCardBase({ item, speech }: { item: PronounItem; speech: UseSpeech }) {
  const examples = useMemo(() => buildExamples(item), [item]);
  const [open, setOpen] = useState(false);
  const listId = useId();

  return (
    <li className={styles.card}>
      <div className={styles.cardHeader}>
        <div className={styles.termRow}>
          <div className={styles.termBody}>
            <p className={styles.term} lang="en">
              {item.term}
            </p>
            <p className={styles.ipa} lang="en">
              {item.ipa}
            </p>
          </div>
          <button
            type="button"
            className={styles.iconButton}
            onClick={() => speech.speakWord(item.term)}
            title="単語を再生"
            aria-label={`Speak term ${item.term}`}
          >
            <Volume2 size={18} />
          </button>
        </div>
        <span className={styles.index}>#{item.index}</span>
      </div>
      <div className={styles.jpRow}>
        <div className={styles.jp}>{item.jp}</div>
        {examples.length > 0 && (
          <button
            type="button"
            className={styles.examplesToggle}
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls={listId}
          >
            例文{open ? 'を閉じる' : 'を表示'}
          </button>
        )}
      </div>
      {open && (
        <ExampleList items={examples} onSpeak={(t) => speech.speakSentence(t)} listId={listId} />
      )}
    </li>
  );
}

export const PronounCard = memo(PronounCardBase);
export default PronounCard;
