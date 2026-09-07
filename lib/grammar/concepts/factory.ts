import { bookGrammarTopics } from "../source";
import type { GrammarConcept, GrammarConceptCategory, GrammarConceptSection, GrammarTopic } from "../types";

const categoryLabels: Record<GrammarConceptCategory, string> = {
  tenses: "Tiempos verbales",
  "sentence-building": "Construye la frase",
  "verbs-and-meaning": "Verbos e intención",
  "complex-structures": "Conecta ideas",
};

type ConceptDefinition = {
  slug: string;
  title: string;
  category: GrammarConceptCategory;
  summary: string;
  memoryHook: string;
  studyQuestion: string;
  sourceSlugs: string[];
  additionalTopics?: GrammarTopic[];
};

function slugify(value: string) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function findSourceTopic(slug: string): GrammarTopic {
  const topic = bookGrammarTopics.find((candidate) => candidate.slug === slug);
  if (!topic) throw new Error(`Grammar source not found: ${slug}`);
  return topic;
}

export function defineGrammarConcept(definition: ConceptDefinition): GrammarConcept {
  const { additionalTopics = [], ...conceptDefinition } = definition;
  const sourceTopics = [
    ...conceptDefinition.sourceSlugs.map(findSourceTopic),
    ...additionalTopics,
  ];
  let sequence = 0;

  const sections: GrammarConceptSection[] = sourceTopics.flatMap((topic) =>
    topic.sections.map((section) => {
      sequence += 1;
      return {
        ...section,
        id: `${definition.slug}-${String(sequence).padStart(2, "0")}-${slugify(section.title)}`,
        level: topic.level,
        sourceUnit: topic.unit,
        sourceTopic: topic.title,
      };
    }),
  );

  const levels = Array.from(new Set(sourceTopics.map((topic) => topic.level)));
  const level = levels.length > 1 ? "B2 + C1" : levels[0];

  return {
    ...conceptDefinition,
    sourceSlugs: sourceTopics.map((topic) => topic.slug),
    level,
    levels,
    categoryLabel: categoryLabels[definition.category],
    examPractice: Array.from(new Set(sourceTopics.map((topic) => topic.examPractice))),
    sections,
  };
}
