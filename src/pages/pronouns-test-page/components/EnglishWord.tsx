import { memo, useMemo, useState, useId } from 'react';
import styles from '../learningEnglishPage.module.css';
import { Volume2 } from 'lucide-react';
import type { PronounItem } from '../utils/type';
import { ExampleList } from './ExampleList';
import type { UseSpeech } from '../hooks/useSpeech';
import { buildExamples } from '../utils/function';

function EnglishWordCardInner({ item, speech }: { item: PronounItem; speech: UseSpeech }) {
  const examples = useMemo(() => buildExamples(item), [item]);
  const hasExamples = examples.length > 0;
  const [open, setOpen] = useState(false);
  const listId = useId();

  return (
    <li className={styles.card}>
      <div className={styles.cardRow}>
        <button
          type="button"
          className={styles.iconButton}
          onClick={() => speech.speakWord(item.term)}
          title="単語を再生"
          aria-label={`Speak term ${item.term}`}
        >
          <Volume2 className={styles.iconSize} />
        </button>
        <div className={styles.cardContent}>
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
            </div>
            <span className={styles.termIndex}>#{item.index}</span>
          </div>
          <div className={styles.jpRow}>
            <div className={styles.jp}>{item.jp}</div>
            {hasExamples && (
              <button
                type="button"
                className={styles.examplesButton}
                onClick={() => setOpen((v) => !v)}
                aria-expanded={open}
                aria-controls={listId}
                title={open ? '例文を閉じる' : '例文を表示'}
              >
                {open ? '閉じる' : '例文'}
              </button>
            )}
          </div>
        </div>
      </div>
      {open && (
        <ExampleList items={examples} onSpeak={(t) => speech.speakSentence(t)} listId={listId} />
      )}
    </li>
  );
}

export const EnglishWord = memo(EnglishWordCardInner);
export default EnglishWord;
