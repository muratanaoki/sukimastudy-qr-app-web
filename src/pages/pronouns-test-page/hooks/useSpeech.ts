import { useEffect, useRef, useState } from 'react';

export function useSpeech() {
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
    try {
      synth.cancel();
    } catch (e) {
      // ignore cancel failures
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

export type UseSpeech = ReturnType<typeof useSpeech>;
