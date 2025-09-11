import { useEffect, useMemo, useRef, useState } from 'react';

export type UseSpeechOptions = {
  defaultLang?: string; // e.g. 'en-US'
  preferredVoiceNames?: string[]; // 優先したいボイス名（部分一致OK）
  wordRate?: number; // 単語読みのレート
  sentenceRate?: number; // 例文読みのレート
  pitch?: number; // 共通ピッチ
};

const DEFAULTS: Required<UseSpeechOptions> = {
  defaultLang: 'en-US',
  preferredVoiceNames: [
    'Google US English',
    'Google UK English Female',
    'Google UK English Male',
    'Samantha',
    'Alex',
  ],
  wordRate: 0.9,
  sentenceRate: 1.0,
  pitch: 1.0,
};

export function useSpeech(options?: UseSpeechOptions) {
  const opts = useMemo(() => ({ ...DEFAULTS, ...(options || {}) }), [options]);
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

  const pickVoice = (targetLang = 'en') => {
    const vs = voicesRef.current || [];
    const lower = (s?: string) => s?.toLowerCase() ?? '';
    // 0) 明示選択があれば最優先
    if (selectedVoiceName) {
      const v = vs.find((x) => lower(x.name) === lower(selectedVoiceName));
      if (v) return v;
    }
    // 1) 名前の優先順位
    for (const pref of opts.preferredVoiceNames.map((n) => n.toLowerCase())) {
      const m = vs.find((v) => lower(v.name).includes(pref));
      if (m) return m;
    }
    // 2) 言語優先（en-US → en-GB → en-*）
    return (
      vs.find((v) => lower(v.lang).startsWith(`${targetLang}-us`)) ||
      vs.find((v) => lower(v.lang).startsWith(`${targetLang}-gb`)) ||
      vs.find((v) => lower(v.lang).startsWith(targetLang)) ||
      undefined
    );
  };

  const speak = (text: string, local?: { rate?: number; pitch?: number; lang?: string }) => {
    if (!supported || !text) return;
    const synth = window.speechSynthesis;
    try {
      synth.cancel();
    } catch (e) {
      // ignore cancel failures
    }
    const u = new SpeechSynthesisUtterance(text);
    const lang = local?.lang ?? opts.defaultLang;
    u.lang = lang;
    u.rate = local?.rate ?? opts.sentenceRate;
    u.pitch = local?.pitch ?? opts.pitch;
    const voice = pickVoice(lang.slice(0, 2));
    if (voice) u.voice = voice;
    u.onstart = () => setSpeaking(true);
    u.onend = () => setSpeaking(false);
    u.onerror = () => setSpeaking(false);
    synth.speak(u);
  };

  // 単語/例文で読み上げパラメータを分けるヘルパー
  const speakWord = (text: string) => speak(text, { rate: opts.wordRate });
  const speakSentence = (text: string) => speak(text, { rate: opts.sentenceRate });

  const cancel = () => {
    if (!supported) return;
    try {
      window.speechSynthesis.cancel();
    } finally {
      setSpeaking(false);
    }
  };

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
