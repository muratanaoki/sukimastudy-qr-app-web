import type { PronounItem, ExampleEntry, Segment } from './type';

// PronounItem から例文配列を生成（空のものは除外）
export function buildExamples(item: PronounItem): ExampleEntry[] {
  return Array.isArray(item.examples) ? item.examples : [];
}

/**
 * items を index 昇順に  segmentSize 個ずつに分割。端数はそのまま最後のセグメント。
 * items が既に昇順なら sort コストを避けたいケースのために `assumeSorted` フラグあり。
 */
export function segmentItems(
  items: PronounItem[],
  segmentSize: number,
  { assumeSorted = false }: { assumeSorted?: boolean } = {}
): Segment[] {
  if (!items.length || segmentSize <= 0) return [];
  const src = assumeSorted ? items : [...items].sort((a, b) => a.index - b.index);
  const segments: Segment[] = [];
  for (let i = 0; i < src.length; i += segmentSize) {
    const slice = src.slice(i, i + segmentSize);
    if (!slice.length) continue;
    segments.push({ start: slice[0].index, end: slice[slice.length - 1].index, items: slice });
  }
  return segments;
}
