import { createSoundHandle } from '@/shared/utils/audio/soundHandle';
import type { SoundHandle } from '@/shared/utils/audio/soundHandle';
import startTestAudio from '@/shared/sounds/startTest.mp3';

let startupSoundHandle: SoundHandle | null = null;

export const getStartupSoundHandle = (): SoundHandle => {
  if (!startupSoundHandle) {
    startupSoundHandle = createSoundHandle(startTestAudio);
  }
  return startupSoundHandle;
};
