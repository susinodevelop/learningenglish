import type { GrammarSection, GrammarTopic } from "./types";

export type GrammarStudySection = GrammarSection & {
  id: string;
  sourceUnit: number;
  sourceTitle: string;
};

export type GrammarStudyTopic = {
  slug: string;
  title: string;
  level: "B2";
  units: number[];
  sourceSlugs: string[];
  examPractice: string[];
  summary: string;
  sections: GrammarStudySection[];
};

type StudyGroupDefinition = {
  slug: string;
  title: string;
  units: number[];
  summary?: string;
};

const groupDefinitions: StudyGroupDefinition[] = [
  { slug: "present-tenses", title: "Present tenses", units: [1] },
  { slug: "past-tenses", title: "Past tenses", units: [2] },
  { slug: "present-perfect-and-past-simple", title: "Present perfect and past simple", units: [3] },
  { slug: "past-perfect", title: "Past perfect", units: [4] },
  {
    slug: "future",
    title: "Future",
    units: [5, 6],
    summary: "Todas las formas de futuro del libro reunidas en un único tema: horarios y planes, will, future continuous, going to, future in the past, time clauses, future perfect y be about to.",
  },
  { slug: "adjectives", title: "Adjectives", units: [7] },
  { slug: "adverbs", title: "Adverbs", units: [8] },
  { slug: "questions", title: "Questions", units: [9] },
  { slug: "countable-uncountable-nouns-articles", title: "Countable and uncountable nouns; articles", units: [10] },
  {
    slug: "modals",
    title: "Modals",
    units: [11, 13, 14],
    summary: "Los tres bloques de modal verbs del libro reunidos: forma, obligación, permiso, peticiones, sugerencias, consejo, capacidad, deducción, posibilidad y expectativas.",
  },
  { slug: "pronouns-and-determiners", title: "Pronouns and determiners", units: [12] },
  { slug: "reported-speech", title: "Reported speech", units: [15] },
  { slug: "the-passive", title: "The passive", units: [16] },
  {
    slug: "conditionals",
    title: "Conditionals",
    units: [17, 19],
    summary: "Los dos bloques de condicionales juntos: zero/first/second/third, mixed conditionals, unless, in case, provided/as long as, wish/if only, it's time y would rather.",
  },
  { slug: "to-infinitive-and-ing", title: "The to infinitive and -ing", units: [18] },
  {
    slug: "prepositions",
    title: "Prepositions",
    units: [20, 21],
    summary: "Las dos unidades de preposiciones reunidas: lugar, tiempo, movimiento, verb/adjective + preposition, by/with/for y expresiones fijas.",
  },
  { slug: "relative-clauses", title: "Relative clauses", units: [22] },
  {
    slug: "linking-words",
    title: "Linking words",
    units: [23, 24],
    summary: "Los dos bloques de conectores reunidos para comparar contraste, razón, resultado, propósito, condición, tiempo y estructuras con participio o -ing.",
  },
];

function slugify(value: string) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function buildSections(groupSlug: string, topics: GrammarTopic[]): GrammarStudySection[] {
  return topics.flatMap((topic) =>
    topic.sections.map((section) => ({
      ...section,
      id: `${groupSlug}-u${String(topic.unit).padStart(2, "0")}-${slugify(section.title)}`,
      sourceUnit: topic.unit,
      sourceTitle: topic.title,
    })),
  );
}

export function buildGrammarStudyTopics(grammarTopics: GrammarTopic[]): GrammarStudyTopic[] {
  const byUnit = new Map(grammarTopics.map((topic) => [topic.unit, topic]));

  return groupDefinitions.map((definition) => {
    const sourceTopics = definition.units
      .map((unit) => byUnit.get(unit))
      .filter((topic): topic is GrammarTopic => Boolean(topic));

    if (sourceTopics.length === 0) {
      throw new Error(`No grammar units found for study topic: ${definition.slug}`);
    }

    return {
      slug: definition.slug,
      title: definition.title,
      level: "B2",
      units: sourceTopics.map((topic) => topic.unit),
      sourceSlugs: sourceTopics.map((topic) => topic.slug),
      examPractice: Array.from(new Set(sourceTopics.map((topic) => topic.examPractice))),
      summary: definition.summary ?? sourceTopics.map((topic) => topic.summary).join(" "),
      sections: buildSections(definition.slug, sourceTopics),
    };
  });
}
