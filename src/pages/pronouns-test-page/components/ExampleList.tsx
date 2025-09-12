import { memo } from 'react';
import styles from '../index.module.css';
import { Volume2 } from 'lucide-react';
import type { ExampleEntry } from '../utils/type';

export type ExampleListProps = {
  items: ExampleEntry[];
  onSpeak: (text: string) => void;
};

function ExampleListBase({ items, onSpeak }: ExampleListProps) {
  if (!items.length) return null;
  return (
    <ul className={styles.examples}>
      {items.map((ex, idx) => (
        <li key={idx} className={styles.exampleItem}>
          <div className={styles.exampleEnRow}>
            {ex.en && (
              <button
                type="button"
                className={styles.iconButton}
                onClick={() => onSpeak(ex.en!)}
                title="例文を再生"
                aria-label={`Speak example ${idx + 1}`}
              >
                <Volume2 size={18} />
              </button>
            )}
            <div className={styles.exampleBody}>
              {ex.en && (
                <span className={styles.exampleEn} lang="en">
                  {ex.en}
                </span>
              )}
              {ex.jp && <div className={styles.exampleJp}>{ex.jp}</div>}
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}

export const ExampleList = memo(ExampleListBase);
export default ExampleList;
