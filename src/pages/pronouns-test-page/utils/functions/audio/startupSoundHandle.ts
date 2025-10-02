import { createSoundHandle } from '@/shared/utils/audio/soundHandle';
import type { SoundHandle } from '@/shared/utils/audio/soundHandle';
import { STARTUP_AUDIO_SRC } from '../../constants/audio';

let startupSoundHandle: SoundHandle | null = null;

export const getStartupSoundHandle = (): SoundHandle => {
  if (!startupSoundHandle) {
    startupSoundHandle = createSoundHandle(STARTUP_AUDIO_SRC);
  }
  return startupSoundHandle;
};
