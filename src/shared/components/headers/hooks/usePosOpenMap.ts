import { useCallback, useEffect, useState } from 'react';
import type { PosGroup } from '@/pages/pronouns-test-page/utils/domain/type';

// 開閉マップの初期値を作る（全て閉）
const createClosedMap = (posGroups: PosGroup[]): Record<string, boolean> => {
  const init: Record<string, boolean> = {};
  for (const pg of posGroups) init[pg.pos] = false;
  return init;
};

// 品詞ごとの開閉状態を管理する小さなフック
export const usePosOpenMap = (posGroups: PosGroup[]) => {
  const [openMap, setOpenMap] = useState<Record<string, boolean>>(() => createClosedMap(posGroups));

  // posGroups が変わったとき、未知キーのみ初期化して既存状態は保持
  useEffect(() => {
    setOpenMap((m) => {
      const next = { ...m };
      let changed = false;
      for (const pg of posGroups) {
        if (!(pg.pos in next)) {
          next[pg.pos] = false;
          changed = true;
        }
      }
      return changed ? next : m;
    });
  }, [posGroups]);

  const toggle = useCallback((posKey: string) => {
    setOpenMap((m) => ({ ...m, [posKey]: !m[posKey] }));
  }, []);

  const isOpen = useCallback((posKey: string) => !!openMap[posKey], [openMap]);

  return { openMap, isOpen, toggle } as const;
};
