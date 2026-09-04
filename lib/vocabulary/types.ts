export type VocabularySectionKind = "core" | "chunks" | "phrasal" | "word-family" | "contrast";

export type VocabularyEntry = readonly [
  term: string,
  meaning: string,
  note?: string,
];

export type VocabularySection = {
  title: string;
  kind: VocabularySectionKind;
  entries: VocabularyEntry[];
};

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
