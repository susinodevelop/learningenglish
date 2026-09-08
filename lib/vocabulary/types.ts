export type VocabularyLevel = "B2" | "C1";

export type VocabularySource =
  | "Grammar and Vocabulary for First and First for Schools"
  | "Gold C1 Advanced New Edition";

export type VocabularySectionKind = "core" | "chunks" | "phrasal" | "word-family" | "contrast";

/** Raw, book-derived vocabulary. Keep this layer compact and source-faithful. */
export type VocabularySeedEntry = readonly [
  term: string,
  meaningEs: string,
  note?: string,
  definitionEn?: string,
  /** Optional explicit identity for the rare case where two senses share the same source anchor. */
  stableKey?: string,
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
  level: VocabularyLevel;
  summary: string;
  sections: VocabularySection[];
  /** Optional because the existing B2 corpus keeps its historic source-unit map in the compiler. */
  sourceUnit?: number;
  source?: VocabularySource;
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

/** Source-faithful textual relationships retained for display and fallback matching. */
export type VocabularyRelations = {
  collocations: string[];
  patterns: string[];
  synonyms: string[];
  antonyms: string[];
  confusedWith: string[];
  wordFamily: string[];
};

export type VocabularyRelationLink = {
  /** Text as it appears in the pedagogical/source relationship. */
  label: string;
  /** Canonical term entry when this relationship can be resolved. */
  lexemeId?: string;
  /** All matching senses, useful when the related term is polysemous. */
  senseIds: string[];
};

export type VocabularyResolvedRelations = {
  synonyms: VocabularyRelationLink[];
  antonyms: VocabularyRelationLink[];
  confusedWith: VocabularyRelationLink[];
  wordFamily: VocabularyRelationLink[];
};

/**
 * Canonical lexical SENSE used by study groups and games.
 *
 * `id` intentionally remains the historic ID for localStorage backwards compatibility.
 * New persistent systems must use `senseId`, which is independent from the Spanish translation.
 */
export type VocabularySense = {
  /** Historic term + Spanish-meaning ID. Do not use for new persistent data. */
  id: string;
  /** Stable identity for this semantic sense. */
  senseId: string;
  /** Stable parent term identity. */
  lexemeId: string;
  /** Historic IDs that can be migrated to senseId. */
  legacyIds: string[];
  term: string;
  normalizedTerm: string;
  type: VocabularyEntryType;
  cefr: VocabularyLevel;
  levels: VocabularyLevel[];
  meaning: VocabularyMeaning;
  members: VocabularyLexicalMember[];
  examples: VocabularyExample[];
  topics: string[];
  sourceUnits: number[];
  sectionKinds: VocabularySectionKind[];
  sectionTitles: string[];
  relations: VocabularyRelations;
  resolvedRelations: VocabularyResolvedRelations;
  notes: string[];
  provenance: {
    sources: VocabularySource[];
    lexicalSelection: "book";
    englishDefinition: "pedagogical-original";
    examples: "pedagogical-original";
  };
};

/** Parent lexeme shown by search/detail UI. One lexeme can own many senses. */
export type VocabularyLexeme = {
  id: string;
  term: string;
  normalizedTerm: string;
  senseIds: string[];
  levels: VocabularyLevel[];
};

/** Temporary compatibility alias for code that still consumes one entry per sense. */
export type VocabularyLegacyLexeme = VocabularySense;

export type VocabularyStudySection = {
  title: string;
  kind: VocabularySectionKind;
  entries: VocabularySense[];
};

export type VocabularyStudyTopic = {
  slug: string;
  title: string;
  category: string;
  level: VocabularyLevel;
  summary: string;
  sections: VocabularyStudySection[];
};
