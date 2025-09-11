import styles from '../index.module.css';
import { Play } from 'lucide-react';
import type { ExampleEntry } from '../utils/type';

export function ExampleList({
  items,
  onSpeak,
}: {
  items: ExampleEntry[];
  onSpeak: (text: string) => void;
}) {
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
            {ex.en && (
              <button
                type="button"
                className={styles.iconButton}
                onClick={() => onSpeak(ex.en!)}
                title="例文を再生"
                aria-label={`Speak example ${ex.level}`}
              >
                <Play size={18} />
              </button>
            )}
          </div>
          {ex.jp && <div className={styles.exampleJp}>{ex.jp}</div>}
        </li>
      ))}
    </ul>
  );
}

export default ExampleList;
