import type { PronounItem, ExampleEntry } from './type';

/**
 * PronounItem から表示用の ExampleEntry 配列を生成する。
 * 英語 or 日本語訳のどちらかが存在するものだけを残す。
 */
export function buildExamples(item: PronounItem): ExampleEntry[] {
  return [
    { en: item.exJ1, jp: item.exJ1Jp },
    {
      en: item.exJ2,
      jp: item.exJ2Jp,
    },
    { en: item.exJ3, jp: item.exJ3Jp },
  ].filter((e) => !!(e.en || e.jp));
}

/** true if item has at least one example sentence */
export function hasAnyExample(item: PronounItem): boolean {
  return !!(item.exJ1 || item.exJ2 || item.exJ3 || item.exJ1Jp || item.exJ2Jp || item.exJ3Jp);
}
