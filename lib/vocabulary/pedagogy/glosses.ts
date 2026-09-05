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
      const definition = definitionEn.trim();
      const existing = map.get(key);

      // The same lexical sense can legitimately appear in several topics.
      // Keep one canonical pedagogical definition for the compiled lexicon.
      if (!existing || definition.length > existing.length) {
        map.set(key, definition);
      }
    }
  }

  return map;
}
