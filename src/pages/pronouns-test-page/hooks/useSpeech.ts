import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

// =====================================================================================
// Speech (Web Speech Synthesis) Hook
// 目的:
//  - ブラウザ差異 (Safari / Chrome) を意識しつつ最小限 API で単語/文読み上げを提供
//  - 可読性向上のためロジックを小さな純関数へ分解
// =====================================================================================

// --- Browser / Voice detection helpers -------------------------------------------------
// ---- Browser / Voice detection helpers ----------------------------------------------
const detectSafari = (): boolean => {
  if (typeof navigator === 'undefined') return false;
  const ua = navigator.userAgent;
  const vendor = navigator.vendor || '';
  if (!/Safari/i.test(ua)) return false;
  if (!/Apple/i.test(vendor)) return false;
  // 除外ブラウザ (iOS Chrome/Edge/Firefox/Opera, 各種 Chromium 派生など)
  if (/(Chrome|CriOS|Chromium|Edg|EdgiOS|OPR|OPiOS|FxiOS|Brave|SamsungBrowser)/i.test(ua))
    return false;
  return true;
};

const SAFARI_VOICE_CANDIDATES = [
  'Samantha',
  'Alex',
  'Victoria',
  'Daniel',
  'Kate',
  'Karen',
] as const;
const CHROME_VOICE_CANDIDATES = [
  'Google US English',
  'Google UK English Female',
  'Google UK English Male',
  'Samantha',
  'Alex',
  'Victoria',
] as const;

const resolvePreferredVoiceNames = (): string[] => {
  // navigator 不在 (SSR) は Chrome 前提で返す（後段 useMemo で上書き可能）
  if (typeof navigator === 'undefined') return [...CHROME_VOICE_CANDIDATES];
  return detectSafari() ? [...SAFARI_VOICE_CANDIDATES] : [...CHROME_VOICE_CANDIDATES];
};

export type UseSpeechOptions = {
  defaultLang?: string; // e.g. 'en-US'
  preferredVoiceNames?: string[]; // 優先したいボイス名（部分一致OK）
  wordRate?: number; // 単語読みのレート
  sentenceRate?: number; // 例文読みのレート
  pitch?: number; // 共通ピッチ
};

const buildDefaultOptions = (): Required<UseSpeechOptions> => ({
  defaultLang: 'en-US',
  preferredVoiceNames: resolvePreferredVoiceNames(),
  wordRate: 0.9,
  sentenceRate: 1.0,
  pitch: 1.0,
});

export function useSpeech(options?: UseSpeechOptions) {
  // options 変更時に default を再度生成（ブラウザ条件は通常固定なので build 一度でも良いが、テスト容易性を優先）
  const opts = useMemo(() => ({ ...buildDefaultOptions(), ...(options || {}) }), [options]);
  const [supported, setSupported] = useState<boolean>(false);
  const [speaking, setSpeaking] = useState<boolean>(false);
  const voicesRef = useRef<SpeechSynthesisVoice[] | null>(null);
  const [selectedVoiceName, setSelectedVoiceName] = useState<string | null>(null);

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

    // speaking状態の簡易ポーリング
    const id = window.setInterval(() => {
      setSpeaking(synth.speaking);
    }, 500);

    return () => {
      synth.removeEventListener?.('voiceschanged', loadVoices);
      window.clearInterval(id);
    };
  }, []);

  const pickVoice = useCallback(
    (targetLang = 'en') => {
      const list = voicesRef.current || [];
      if (!list.length) return undefined;
      const norm = (s?: string) => s?.toLowerCase() ?? '';
      // 0) 明示選択
      if (selectedVoiceName) {
        const chosen = list.find((v) => norm(v.name) === norm(selectedVoiceName));
        if (chosen) return chosen;
      }
      // 1) 名前優先 (部分一致)
      const loweredPrefs = opts.preferredVoiceNames.map((n) => n.toLowerCase());
      for (const pref of loweredPrefs) {
        const hit = list.find((v) => norm(v.name).includes(pref));
        if (hit) return hit;
      }
      // 2) 言語優先
      const lang = targetLang.toLowerCase();
      return (
        list.find((v) => norm(v.lang).startsWith(`${lang}-us`)) ||
        list.find((v) => norm(v.lang).startsWith(`${lang}-gb`)) ||
        list.find((v) => norm(v.lang).startsWith(lang)) ||
        undefined
      );
    },
    [selectedVoiceName, opts.preferredVoiceNames]
  );

  const createUtterance = useCallback(
    (
      text: string,
      local?: { rate?: number; pitch?: number; lang?: string }
    ): SpeechSynthesisUtterance => {
      const u = new SpeechSynthesisUtterance(text);
      u.lang = local?.lang ?? opts.defaultLang;
      u.rate = local?.rate ?? opts.sentenceRate;
      u.pitch = local?.pitch ?? opts.pitch;
      const voice = pickVoice(u.lang.slice(0, 2));
      if (voice) u.voice = voice;
      return u;
    },
    [opts.defaultLang, opts.sentenceRate, opts.pitch, pickVoice]
  );

  const speak = useCallback(
    (text: string, local?: { rate?: number; pitch?: number; lang?: string }) => {
      if (!text) return;
      // supportedフラグに関係なく、speechSynthesisが利用可能なら実行
      if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
      const synth = window.speechSynthesis;
      // 直前のキューを明示 flush（短い単語連続読みで遅延を避ける）
      try {
        synth.cancel();
      } catch {
        /* ignore */
      }
      const u = createUtterance(text, local);
      u.onstart = () => setSpeaking(true);
      const finish = () => setSpeaking(false);
      u.onend = finish;
      u.onerror = finish;
      synth.speak(u);
    },
    [createUtterance]
  );

  // 単語/例文で読み上げパラメータを分けるヘルパー
  const speakWord = useCallback(
    (text: string) => speak(text, { rate: opts.wordRate }),
    [speak, opts.wordRate]
  );
  const speakSentence = useCallback(
    (text: string) => speak(text, { rate: opts.sentenceRate }),
    [speak, opts.sentenceRate]
  );

  const cancel = useCallback(() => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    try {
      window.speechSynthesis.cancel();
    } finally {
      setSpeaking(false);
    }
  }, []);

  return {
    supported,
    speaking,
    speak,
    speakWord,
    speakSentence,
    cancel,
    setSelectedVoiceName,
  } as const;
}

export type UseSpeech = ReturnType<typeof useSpeech>;
