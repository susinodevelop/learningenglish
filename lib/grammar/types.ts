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

export type GrammarTopic = {
  unit: number;
  slug: string;
  title: string;
  level: "B2";
  examPractice: string;
  summary: string;
  sections: GrammarSection[];
};
