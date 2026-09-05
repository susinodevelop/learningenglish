export type VocabularySectionKind = "core" | "chunks" | "phrasal" | "word-family" | "contrast";

/** Raw, book-derived vocabulary. Keep this layer compact and source-faithful. */
export type VocabularySeedEntry = readonly [
  term: string,
  meaningEs: string,
  note?: string,
];

export type VocabularySection = {
  title: string;
  kind: VocabularySectionKind;
  entries: VocabularySeedEntry[];
};

/** Source topic. Unit numbers are deliberately not learner-facing. */
export type VocabularyTopic = {
  slug: string;
  title: string;
  category: string;
  level: "B2";
  summary: string;
  sections: VocabularySection[];
};

export type VocabularyCategory = {
  id: string;
  label: string;
  description: string;
};

export type VocabularyEntryType =
  | "word"
  | "expression"
  | "collocation"
  | "phrasal-verb"
  | "word-family";

export type VocabularyExample = {
  en: string;
  es: string;
  kind: "definition" | "usage";
};

export type VocabularyMeaning = {
  es: string;
  en: string;
};

export type VocabularyLexicalMember = {
  term: string;
  meaning: VocabularyMeaning;
};

export type VocabularyRelations = {
  collocations: string[];
  patterns: string[];
  synonyms: string[];
  antonyms: string[];
  confusedWith: string[];
  wordFamily: string[];
};

/**
 * Canonical lexical sense used by study UI and, later, by games.
 * A term can legitimately have more than one sense (e.g. track).
 */
export type VocabularyLexeme = {
  id: string;
  term: string;
  normalizedTerm: string;
  type: VocabularyEntryType;
  cefr: "B2";
  meaning: VocabularyMeaning;
  members: VocabularyLexicalMember[];
  examples: VocabularyExample[];
  topics: string[];
  sourceUnits: number[];
  sectionKinds: VocabularySectionKind[];
  sectionTitles: string[];
  relations: VocabularyRelations;
  notes: string[];
  provenance: {
    source: "Grammar and Vocabulary for First and First for Schools";
    lexicalSelection: "book";
    englishDefinition: "pedagogical-original";
    examples: "pedagogical-original";
  };
};

export type VocabularyStudySection = {
  title: string;
  kind: VocabularySectionKind;
  entries: VocabularyLexeme[];
};

export type VocabularyStudyTopic = {
  slug: string;
  title: string;
  category: string;
  level: "B2";
  summary: string;
  sections: VocabularyStudySection[];
};
