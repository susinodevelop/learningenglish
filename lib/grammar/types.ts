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

/** Raw source shape used only to preserve all grammar extracted from the study book. */
export type GrammarTopic = {
  unit: number;
  slug: string;
  title: string;
  level: "B2";
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
};

export type GrammarConcept = {
  slug: string;
  title: string;
  level: "B2";
  category: GrammarConceptCategory;
  categoryLabel: string;
  summary: string;
  memoryHook: string;
  studyQuestion: string;
  sourceSlugs: string[];
  examPractice: string[];
  sections: GrammarConceptSection[];
};
