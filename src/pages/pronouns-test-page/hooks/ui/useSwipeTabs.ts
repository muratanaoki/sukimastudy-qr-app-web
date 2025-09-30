import { useCallback, useRef } from 'react';

type Options = {
  threshold?: number; // 最低移動距離(px) これ以上でスワイプ判定
  axisLockRatio?: number; // 水平優先の軸ロック比 (abs(dx) >= abs(dy) * ratio)
};

/**
 * アクティブなセクション要素にアタッチして、水平スワイプでタブを前後に移動させる。
 * - Pointer Events ベース（タッチ/マウス/ペン統一）
 * - 基本的にスクロールは妨げない（水平優先のときのみスワイプ確定）
 * - 返り値は callback ref（アクティブ要素の切替に追従してリスナーを付け替える）
 */
export function useSwipeTabs<T extends HTMLElement = HTMLElement>(
  activeGroupNo: number,
  groupNos: number[],
  onChange: (nextGroupNo: number) => void,
  { threshold = 40, axisLockRatio = 1.2 }: Options = {}
) {
  const cleanupRef = useRef<() => void>(() => {});

  const ref = useCallback(
    (el: T | null) => {
      // 既存リスナーの掃除
      cleanupRef.current?.();

      if (!el) return;
      if (!groupNos || groupNos.length <= 1) return; // 単一タブなら何もしない

      let startX = 0;
      let startY = 0;
      let tracking = false;
      let isHorizontal: boolean | null = null;

      const onPointerDown = (e: PointerEvent) => {
        // 左クリック/タッチ以外は無視（必要なら拡張）
        if (e.pointerType === 'mouse' && e.button !== 0) return;
        tracking = true;
        isHorizontal = null;
        startX = e.clientX;
        startY = e.clientY;
        try {
          (e.target as Element)?.setPointerCapture?.(e.pointerId);
        } catch {
          // no-op: pointer capture may fail on some elements
        }
      };

      const onPointerMove = (e: PointerEvent) => {
        if (!tracking) return;
        const dx = e.clientX - startX;
        const dy = e.clientY - startY;

        // 初期判定: 軸ロック（水平/垂直）
        if (isHorizontal == null) {
          const adx = Math.abs(dx);
          const ady = Math.abs(dy);
          if (adx >= ady * axisLockRatio && adx >= 8) {
            isHorizontal = true;
          } else if (ady > adx * axisLockRatio && ady >= 8) {
            isHorizontal = false;
          }
        }
      };

      const onPointerUp = (e: PointerEvent) => {
        if (!tracking) return;
        tracking = false;
        const dx = e.clientX - startX;
        const dy = e.clientY - startY;
        const adx = Math.abs(dx);
        const ady = Math.abs(dy);

        // 水平ジェスチャかつしきい値超えのみ採用
        if ((isHorizontal ?? adx >= ady * axisLockRatio) && adx >= threshold) {
          const currentIndex = groupNos.findIndex((g) => g === activeGroupNo);
          if (currentIndex !== -1) {
            if (dx < 0 && currentIndex < groupNos.length - 1) {
              // 左へスワイプ: 次のタブ
              onChange(groupNos[currentIndex + 1]);
            } else if (dx > 0 && currentIndex > 0) {
              // 右へスワイプ: 前のタブ
              onChange(groupNos[currentIndex - 1]);
            }
          }
        }
        isHorizontal = null;
      };

      const onPointerCancel = () => {
        tracking = false;
        isHorizontal = null;
      };

      el.addEventListener('pointerdown', onPointerDown);
      el.addEventListener('pointermove', onPointerMove);
      el.addEventListener('pointerup', onPointerUp);
      el.addEventListener('pointercancel', onPointerCancel);

      cleanupRef.current = () => {
        el.removeEventListener('pointerdown', onPointerDown);
        el.removeEventListener('pointermove', onPointerMove);
        el.removeEventListener('pointerup', onPointerUp);
        el.removeEventListener('pointercancel', onPointerCancel);
      };
    },
    [activeGroupNo, groupNos, onChange, threshold, axisLockRatio]
  );

  return ref as React.RefCallback<T>;
}
