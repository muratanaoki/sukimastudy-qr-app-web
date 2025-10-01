import { useEffect } from 'react';
import { Key } from '@/shared/utils/enum';

/**
 * Escape キー押下を監視して任意のコールバックを発火させるカスタムフック。
 * - React Portal で描画されるダイアログでも動作するよう window に直接リスナーを張る。
 * - `active` が false の間はリスナーを登録せず、不要なイベントバインドを避ける。
 * - `callback` には閉じ処理などを渡し、副作用のクリーンアップで確実に解除する。
 */
export function useEscapeKey(callback: () => void, active: boolean = true) {
  useEffect(() => {
    if (!active) return;

    const handler = (event: KeyboardEvent) => {
      if (event.key !== Key.Escape) return;
      event.preventDefault();
      callback();
    };

    window.addEventListener('keydown', handler);
    return () => {
      window.removeEventListener('keydown', handler);
    };
  }, [callback, active]);
}
