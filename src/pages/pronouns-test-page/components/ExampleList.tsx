import styles from './exampleList.module.css';
import { Volume2 } from 'lucide-react';
import type { ExampleEntry } from '../utils/type';

export type ExampleListProps = {
  items: ExampleEntry[];
  onSpeak: (text: string) => void;
  listId?: string;
};

export const ExampleList = ({ items, onSpeak, listId }: ExampleListProps) => {
  if (!items.length) return null;
  return (
    <ul className={styles.examples} id={listId} aria-live="polite">
      {items.map((ex, idx) => (
        <li className={styles.exampleItem} key={idx}>
          <div className={styles.exampleEnRow}>
            {ex.en && (
              <button
                type="button"
                className={styles.iconButton}
                onClick={() => onSpeak(ex.en!)}
                title="例文を再生"
                aria-label={`例文${idx + 1}を再生`}
              >
                <Volume2 className={styles.iconSize} />
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
};
