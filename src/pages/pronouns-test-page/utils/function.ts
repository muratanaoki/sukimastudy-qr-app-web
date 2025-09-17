import type { PronounItem, ExampleEntry } from './type';

// PronounItem から例文配列を生成（空のものは除外）
export function buildExamples(item: PronounItem): ExampleEntry[] {
  const keys: Array<[en?: string, jp?: string]> = [
    [item.exJ1, item.exJ1Jp],
    [item.exJ2, item.exJ2Jp],
    [item.exJ3, item.exJ3Jp],
  ];
  const out: ExampleEntry[] = [];
  for (const [en, jp] of keys) if (en || jp) out.push({ en, jp });
  return out;
}
