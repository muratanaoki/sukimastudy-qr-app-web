import { useCallback, useState } from 'react';
import type { PronounGroup } from '../utils/type';

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
  }, []);

  const openSettings = useCallback(() => {
    setShowSettings(true);
    setShowTest(false);
  }, []);

  const closeSettings = useCallback(() => {
    setShowSettings(false);
    setShowTest(true);
  }, []);

  const startTest = useCallback((items: PronounGroup['items']) => {
    closeTest();
    setTestItems(items);
    openFullTest();
  }, [closeTest, openFullTest]);

  return {
    // States
    showTest,
    showFullTest,
    showSettings,
    testItems,
    selectedRange,

    // Actions
    openTest,
    closeTest,
    openFullTest,
    closeFullTest,
    openSettings,
    closeSettings,
    startTest,
    setSelectedRange,
  };
};