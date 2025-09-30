import { useState, useRef, useCallback, useEffect } from 'react';
import { FLASH_DURATION_MS } from '../../utils/constants/const';

/**
 * 一瞬表示機能を管理するフック
 * リスニングモードで知ってる/知らないボタン押下後に英単語と訳を表示する
 */
export const useFlashDisplay = () => {
  const [isFlashing, setIsFlashing] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const startFlash = useCallback((onComplete: () => void) => {
    setIsFlashing(true);

    // 既存のタイマーをクリア
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // 指定時間後に表示を消して完了コールバックを実行
    timeoutRef.current = setTimeout(() => {
      setIsFlashing(false);
      onComplete();
    }, FLASH_DURATION_MS);
  }, []);

  const cancelFlash = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setIsFlashing(false);
  }, []);

  // クリーンアップ
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return {
    isFlashing,
    startFlash,
    cancelFlash,
  };
};
