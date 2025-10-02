import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import type { MedalStoreState } from '../../utils/type';
import {
  createDefaultMedalStore,
  loadMedalStore,
  saveMedalStore,
  upsertMedalInStore,
} from '../../utils/functions/storage/medalStore';
import { MedalRank } from '../../utils/enum';

export type MedalStoreContextValue = {
  medals: Record<string, MedalRank>;
  getMedal: (segmentId: string) => MedalRank | undefined;
  upsertMedal: (segmentId: string, medal: MedalRank) => void;
  refresh: () => void;
};

const MedalStoreContext = createContext<MedalStoreContextValue | null>(null);

export const MedalStoreProvider = ({ children }: { children: React.ReactNode }) => {
  const [store, setStore] = useState<MedalStoreState>(() => createDefaultMedalStore());

  useEffect(() => {
    setStore(loadMedalStore());
  }, []);

  const getMedal = useCallback((segmentId: string) => store.medals[segmentId], [store.medals]);

  const upsertMedal = useCallback((segmentId: string, medal: MedalRank) => {
    setStore((prev) => {
      const next = upsertMedalInStore(prev, segmentId, medal);
      saveMedalStore(next);
      return next;
    });
  }, []);

  const refresh = useCallback(() => {
    setStore(loadMedalStore());
  }, []);

  const value = useMemo<MedalStoreContextValue>(
    () => ({
      medals: store.medals,
      getMedal,
      upsertMedal,
      refresh,
    }),
    [store.medals, getMedal, upsertMedal, refresh]
  );

  return <MedalStoreContext.Provider value={value}>{children}</MedalStoreContext.Provider>;
};

export const useMedalStore = () => {
  const context = useContext(MedalStoreContext);
  if (!context) {
    throw new Error('useMedalStore must be used within a MedalStoreProvider');
  }
  return context;
};
