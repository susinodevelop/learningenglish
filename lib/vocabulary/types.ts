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

export type VocabularyRelations = {
  collocations: string[];
  patterns: string[];
  synonyms: string[];
  antonyms: string[];
  confusedWith: string[];
  wordFamily: string[];
};

/**
 * Canonical lexical sense used by study UI and games.
 * A term can legitimately have more than one sense (e.g. track).
 * `cefr` is the earliest level at which this sense is introduced; `levels`
 * records every source level in which the same canonical sense is taught.
 */
export type VocabularyLexeme = {
  id: string;
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
  notes: string[];
  provenance: {
    sources: VocabularySource[];
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
  level: VocabularyLevel;
  summary: string;
  sections: VocabularyStudySection[];
};
