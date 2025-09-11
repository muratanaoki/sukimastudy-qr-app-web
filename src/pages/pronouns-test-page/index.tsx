import { useEffect, useMemo, useRef, useState } from 'react';
import styles from './index.module.css';
import { ExampleEntry, PronounItem } from './utils/type';
import { DATA_RAW } from './utils/const';
import { PronounGroup, JLevel } from './utils/enum';
import { Volume2, Play, Square } from 'lucide-react';

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

function PronounCard({
  item,
  speech,
}: {
  item: PronounItem;
  speech: ReturnType<typeof useSpeech>;
}) {
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

function ExampleList({
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

// --- Web Speech API helper ---
function useSpeech() {
  const [supported, setSupported] = useState<boolean>(false);
  const [speaking, setSpeaking] = useState<boolean>(false);
  const voicesRef = useRef<SpeechSynthesisVoice[] | null>(null);

  useEffect(() => {
    const ok = typeof window !== 'undefined' && 'speechSynthesis' in window;
    setSupported(ok);
    if (!ok) return;

    const synth = window.speechSynthesis;

    const loadVoices = () => {
      const v = synth.getVoices();
      if (v && v.length) {
        voicesRef.current = v;
      }
    };
    loadVoices();
    synth.addEventListener?.('voiceschanged', loadVoices);

    // Fallback polling for speaking state (not perfect but lightweight)
    const id = window.setInterval(() => {
      setSpeaking(synth.speaking);
    }, 500);

    return () => {
      synth.removeEventListener?.('voiceschanged', loadVoices);
      window.clearInterval(id);
    };
  }, []);

  const pickVoice = (targetLang = 'en') => {
    const vs = voicesRef.current || [];
    // Prefer en-US/GB, then any English, otherwise default
    return (
      vs.find((v) => v.lang?.toLowerCase().startsWith(`${targetLang}-us`)) ||
      vs.find((v) => v.lang?.toLowerCase().startsWith(`${targetLang}-gb`)) ||
      vs.find((v) => v.lang?.toLowerCase().startsWith(targetLang)) ||
      undefined
    );
  };

  const speak = (text: string, opts?: { rate?: number; pitch?: number; lang?: string }) => {
    if (!supported || !text) return;
    const synth = window.speechSynthesis;
    // キューをクリアして単発再生
    try {
      synth.cancel();
    } catch (e) {
      // ignore cancel failures
      // console.debug('speech cancel failed', e);
    }
    const u = new SpeechSynthesisUtterance(text);
    const lang = opts?.lang ?? 'en-US';
    u.lang = lang;
    u.rate = opts?.rate ?? 1.0;
    u.pitch = opts?.pitch ?? 1.0;
    const voice = pickVoice(lang.slice(0, 2));
    if (voice) u.voice = voice;
    u.onstart = () => setSpeaking(true);
    u.onend = () => setSpeaking(false);
    u.onerror = () => setSpeaking(false);
    synth.speak(u);
  };

  const cancel = () => {
    if (!supported) return;
    try {
      window.speechSynthesis.cancel();
    } finally {
      setSpeaking(false);
    }
  };

  return { supported, speaking, speak, cancel } as const;
}
