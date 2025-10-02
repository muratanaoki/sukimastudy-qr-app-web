import { useCallback, useState } from 'react';
import type { PronounGroup } from '../../utils/type';
import type { SoundHandle } from '@/shared/utils/audio/soundHandle';

export const useDialogManager = () => {
  const [showTest, setShowTest] = useState(false);
  const [showFullTest, setShowFullTest] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [testItems, setTestItems] = useState([] as PronounGroup['items']);
  const [selectedRange, setSelectedRange] = useState<{
    groupNo: number;
    start: number;
    end: number;
  } | null>(null);
  const [isPreparingTest, setIsPreparingTest] = useState(false);
  const [startupSoundHandle, setStartupSoundHandle] = useState<SoundHandle | null>(null);
  const [startupAudioPreplayed, setStartupAudioPreplayed] = useState(false);

  const openTest = useCallback(() => {
    setShowTest(true);
    setSelectedRange(null);
  }, []);

  const closeTest = useCallback(() => {
    setShowTest(false);
  }, []);

  const openFullTest = useCallback(() => {
    setShowFullTest(true);
  }, []);

  const closeFullTest = useCallback(() => {
    setShowFullTest(false);
    setTestItems([]);
    setIsPreparingTest(false);
    setStartupSoundHandle(null);
    setStartupAudioPreplayed(false);
  }, []);

  const openSettings = useCallback(() => {
    setShowSettings(true);
    setShowTest(false);
  }, []);

  const closeSettings = useCallback(() => {
    setShowSettings(false);
    setShowTest(true);
  }, []);

  const startTest = useCallback(
    ({
      items,
      soundHandle,
      preplayed,
    }: {
      items: PronounGroup['items'];
      soundHandle?: SoundHandle | null;
      preplayed?: boolean;
    }) => {
      setTestItems(items);
      setStartupSoundHandle(soundHandle ?? null);
      setStartupAudioPreplayed(!!preplayed);
      setIsPreparingTest(true);
      closeTest();
      openFullTest();
    },
    [closeTest, openFullTest]
  );

  const completeTestPreparation = useCallback(() => {
    setIsPreparingTest(false);
  }, []);

  return {
    // States
    showTest,
    showFullTest,
    showSettings,
    testItems,
    selectedRange,
    isPreparingTest,
    startupSoundHandle,
    startupAudioPreplayed,

    // Actions
    openTest,
    closeTest,
    openFullTest,
    closeFullTest,
    openSettings,
    closeSettings,
    startTest,
    setSelectedRange,
    completeTestPreparation,
  };
};
