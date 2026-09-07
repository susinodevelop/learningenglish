export type GrammarLevel = "B2" | "C1";
export type GrammarConceptLevel = GrammarLevel | "B2 + C1";

export type GrammarExample = {
  english: string;
  note?: string;
};

export type GrammarSection = {
  title: string;
  intro?: string;
  forms?: string[];
  rules: string[];
  examples?: GrammarExample[];
  traps?: string[];
};

/** Raw source shape used only to preserve all grammar extracted from the study books. */
export type GrammarTopic = {
  unit: number;
  slug: string;
  title: string;
  level: GrammarLevel;
  examPractice: string;
  summary: string;
  sections: GrammarSection[];
};

export type GrammarConceptCategory =
  | "tenses"
  | "sentence-building"
  | "verbs-and-meaning"
  | "complex-structures";

export type GrammarConceptSection = GrammarSection & {
  id: string;
  level: GrammarLevel;
  sourceUnit: number;
  sourceTopic: string;
};

export type GrammarConcept = {
  slug: string;
  title: string;
  level: GrammarConceptLevel;
  levels: GrammarLevel[];
  category: GrammarConceptCategory;
  categoryLabel: string;
  summary: string;
  memoryHook: string;
  studyQuestion: string;
  sourceSlugs: string[];
  examPractice: string[];
  sections: GrammarConceptSection[];
};
