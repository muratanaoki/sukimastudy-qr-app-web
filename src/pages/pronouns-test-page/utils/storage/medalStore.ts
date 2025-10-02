import type { MedalRank, MedalStoreState } from '../domain/type';

const STORAGE_KEY = 'pronoun_test_medals_v1';
const STORAGE_VERSION = 1;
const FALLBACK_UPDATED_AT = new Date(0).toISOString();

type StorageLike = Pick<Storage, 'getItem' | 'setItem'>;

const resolveStorage = (storage?: StorageLike | null): StorageLike | null => {
  if (storage) return storage;
  if (typeof window === 'undefined') return null;
  return window.localStorage;
};

const isMedalRank = (value: unknown): value is MedalRank =>
  value === 'gold' || value === 'silver' || value === 'bronze';

const reviveStore = (raw: unknown): MedalStoreState | null => {
  if (!raw || typeof raw !== 'object') return null;

  const candidate = raw as Partial<MedalStoreState> & { medals?: Record<string, unknown> };
  if (candidate.version !== STORAGE_VERSION || !candidate.medals) return null;

  const medals: Record<string, MedalRank> = {};
  for (const [segmentId, value] of Object.entries(candidate.medals)) {
    if (isMedalRank(value)) {
      medals[segmentId] = value;
    }
  }

  return {
    version: STORAGE_VERSION,
    updatedAt: typeof candidate.updatedAt === 'string' ? candidate.updatedAt : FALLBACK_UPDATED_AT,
    medals,
  };
};

/** デフォルトストアを作成するヘルパー（テスト用に日時を差し替え可能）。 */
const createDefaultStore = (updatedAt: string = FALLBACK_UPDATED_AT): MedalStoreState => ({
  version: STORAGE_VERSION,
  updatedAt,
  medals: {},
});

/**
 * ローカルストレージからストアを復元する。storage を渡せば任意実装でテスト可能。
 */
export const loadMedalStore = (storage?: StorageLike | null): MedalStoreState => {
  const target = resolveStorage(storage);
  if (!target) return createDefaultStore();

  try {
    const raw = target.getItem(STORAGE_KEY);
    if (!raw) return createDefaultStore();

    const revived = reviveStore(JSON.parse(raw));
    return revived ?? createDefaultStore();
  } catch (error) {
    console.warn('Failed to load medal store from localStorage:', error);
    return createDefaultStore();
  }
};

/**
 * ストアを永続化する。storage を差し替えることで副作用の制御が容易になる。
 */
export const saveMedalStore = (store: MedalStoreState, storage?: StorageLike | null): void => {
  const target = resolveStorage(storage);
  if (!target) return;

  try {
    target.setItem(STORAGE_KEY, JSON.stringify(store));
  } catch (error) {
    console.warn('Failed to save medal store to localStorage:', error);
  }
};

/**
 * メダル情報を更新した新ストアを返す純粋関数。
 */
export const upsertMedalInStore = (
  store: MedalStoreState,
  segmentId: string,
  medal: MedalRank,
  timestamp: () => string = () => new Date().toISOString()
): MedalStoreState => ({
  version: STORAGE_VERSION,
  updatedAt: timestamp(),
  medals: {
    ...store.medals,
    [segmentId]: medal,
  },
});

export {
  STORAGE_KEY as MEDAL_STORE_STORAGE_KEY,
  STORAGE_VERSION as MEDAL_STORE_VERSION,
  createDefaultStore as createDefaultMedalStore,
  FALLBACK_UPDATED_AT as MEDAL_STORE_FALLBACK_TIMESTAMP,
};
