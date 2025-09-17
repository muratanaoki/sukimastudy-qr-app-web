import { memo } from 'react';
import styles from '../index.module.css';
import { Volume2 } from 'lucide-react';
import type { ExampleEntry } from '../utils/type';

export type ExampleListProps = {
  items: ExampleEntry[];
  onSpeak: (text: string) => void;
  listId?: string;
};

const ExampleItem = memo(function ExampleItem({
  ex,
  index,
  onSpeak,
}: {
  ex: ExampleEntry;
  index: number;
  onSpeak: (t: string) => void;
}) {
  const canSpeak = !!ex.en;
  return (
    <li className={styles.exampleItem}>
      <div className={styles.exampleEnRow}>
        {canSpeak && (
          <button
            type="button"
            className={styles.iconButton}
            onClick={() => ex.en && onSpeak(ex.en)}
            title="例文を再生"
            aria-label={`例文${index + 1}を再生`}
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
  );
});

function ExampleListBase({ items, onSpeak, listId }: ExampleListProps) {
  if (!items.length) return null;
  return (
    <ul className={styles.examples} id={listId} aria-live="polite">
      {items.map((ex, idx) => (
        <ExampleItem key={idx} ex={ex} index={idx} onSpeak={onSpeak} />
      ))}
    </ul>
  );
}

export const ExampleList = memo(ExampleListBase);
export default ExampleList;
