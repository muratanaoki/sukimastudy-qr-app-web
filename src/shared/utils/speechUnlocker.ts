let hasAttemptedUnlock = false;

export const unlockSpeechSynthesis = () => {
  if (hasAttemptedUnlock) return;
  hasAttemptedUnlock = true;

  if (typeof window === 'undefined') return;

  const synth = window.speechSynthesis;
  if (!synth) return;

  try {
    if (typeof synth.resume === 'function') {
      synth.resume();
    }
  } catch (error) {
    console.warn('Failed to resume speech synthesis', error);
  }

  try {
    const utterance = new SpeechSynthesisUtterance('\u200B');
    utterance.volume = 0;
    utterance.rate = 1;
    utterance.pitch = 1;
    synth.speak(utterance);
  } catch (error) {
    console.warn('Failed to unlock speech synthesis', error);
  }
};
