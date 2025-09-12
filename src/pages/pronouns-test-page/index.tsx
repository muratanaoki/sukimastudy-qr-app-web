//
import styles from './index.module.css';
import { PronounItem } from './utils/type';
import { DATA_RAW } from './utils/const';
import { useSpeech } from './hooks/useSpeech';
import { PronounCard } from './components/PronounCard';

const DATA: PronounItem[] = DATA_RAW.map((d, i) => ({ index: i + 1, ...d }));

export default function PronounsTestPage() {
  const speech = useSpeech();
  const filtered = DATA;

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <section className={styles.section}>
          <ul className={styles.cardGrid}>
            {filtered.map((it, idx) => (
              <PronounCard key={idx} item={{ ...it, index: idx + 1 }} speech={speech} />
            ))}
          </ul>
        </section>
      </main>
    </div>
  );
}
