export type VocabularyGloss = readonly [
  term: string,
  meaningEs: string,
  definitionEn: string,
];

export function glossKey(term: string, meaningEs: string) {
  return `${term.trim()}::${meaningEs.trim()}`;
}

export function makeGlossMap(groups: VocabularyGloss[][]) {
  const map = new Map<string, string>();

  for (const group of groups) {
    for (const [term, meaningEs, definitionEn] of group) {
      const key = glossKey(term, meaningEs);
      if (map.has(key)) {
        throw new Error(`Duplicate vocabulary gloss: ${key}`);
      }
      map.set(key, definitionEn.trim());
    }
  }

  return map;
}
