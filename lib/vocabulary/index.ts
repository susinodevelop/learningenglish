import { compileVocabulary } from "./compiler";
import type { VocabularyCategory, VocabularyEntryType, VocabularyTopic } from "./types";
import { worldVocabularyTopics } from "./data/world";
import { peopleVocabularyTopics } from "./data/people";
import { cultureVocabularyTopics } from "./data/culture";
import { placesVocabularyTopics } from "./data/places";
import { timeVocabularyTopics } from "./data/time";
import { studyWorkVocabularyTopics } from "./data/study-work";
import { goldC1VocabularyTopics } from "./data/c1";
import { irregularVerbsVocabularyTopic } from "./data/irregular-verbs";
import { phrasalVerbsVocabularyTopic } from "./data/phrasal-verbs";

export type {
  VocabularyCategory,
  VocabularyEntryType,
  VocabularyExample,
  VocabularyLegacyLexeme,
  VocabularyLevel,
  VocabularyLexeme,
  VocabularyLexicalMember,
  VocabularyMeaning,
  VocabularyRelationLink,
  VocabularyRelations,
  VocabularyResolvedRelations,
  VocabularySeedEntry,
  VocabularySense,
  VocabularySection,
  VocabularySectionKind,
  VocabularySource,
  VocabularyStudySection,
  VocabularyStudyTopic,
  VocabularyTopic,
} from "./types";

export const vocabularyCategories: VocabularyCategory[] = [
  { id: "world", label: "Mundo y entorno", description: "Naturaleza, clima, ciencia y medio ambiente." },
  { id: "people", label: "Personas y relaciones", description: "Salud, emociones, personalidad y relaciones." },
  { id: "culture", label: "Cultura y ocio", description: "Música, deporte, hobbies, comida, arte y entretenimiento." },
  { id: "places", label: "Lugares y movimiento", description: "Viajes, ciudades, vivienda, ropa y espacios personales." },
  { id: "time", label: "Historia y tiempo", description: "Pasado, historia y expresiones temporales." },
  { id: "study-work", label: "Estudio y trabajo", description: "Escuela, empleo, universidad, opinión, negocios e investigación." },
  { id: "language", label: "Lengua y estructura", description: "Formas verbales, patrones y vocabulario funcional." },
];

const sourceVocabularyTopics: VocabularyTopic[] = [
  ...worldVocabularyTopics,
  ...peopleVocabularyTopics,
  ...cultureVocabularyTopics,
  ...placesVocabularyTopics,
  ...timeVocabularyTopics,
  ...studyWorkVocabularyTopics,
  ...goldC1VocabularyTopics,
  irregularVerbsVocabularyTopic,
  phrasalVerbsVocabularyTopic,
];

const compiledVocabulary = compileVocabulary(sourceVocabularyTopics);

const personalVocabularySources = new Set([
  "Personal C1 vocabulary",
  "User-provided irregular verbs",
  "User-provided phrasal verbs",
]);

const personalVocabularyTypeOverrides: Record<string, VocabularyEntryType> = {
  "a self-made person": "expression",
  "an eleventh-hour decision": "collocation",
  "brain drain": "expression",
  "do something on a daily basis": "expression",
  "graveyard shift": "collocation",
  "Jersey justice": "expression",
  "Joe Public": "expression",
  "John Q. Public": "expression",
  "John Doe": "expression",
  "Jane Doe": "expression",
  "Johnny-on-the-spot": "expression",
  "make all the difference": "collocation",
  "monkey around": "phrasal-verb",
  "parrot-fashion": "word",
  "rock-hard, capital-T Truth": "expression",
  "spoil someone's plans": "collocation",
  "be calm and collected": "collocation",
  "be unfazed": "expression",
  "the yellow press": "collocation",
  "that really gets me going": "expression",
};

for (const sense of compiledVocabulary.senses) {
  const hasPersonalSource = sense.provenance.sources.some((source) => personalVocabularySources.has(source));
  const hasBookSource = sense.provenance.sources.some((source) => !personalVocabularySources.has(source));

  sense.provenance.lexicalSelection = hasPersonalSource
    ? hasBookSource
      ? "mixed"
      : "personal"
    : "book";

  if (sense.topics.includes("phrasal-verbs")) {
    sense.type = "phrasal-verb";
  } else if (hasPersonalSource && !hasBookSource) {
    sense.type = personalVocabularyTypeOverrides[sense.term] ?? sense.type;
  }
}

/** Learner-facing, rich topics from the source books and personal study material. */
export const vocabularyTopics = compiledVocabulary.topics;

/** Canonical semantic senses. New games and persistence should use senseId. */
export const vocabularySenses = compiledVocabulary.senses;

/** Parent terms used by grouped search and detail pages. */
export const vocabularyLexemes = compiledVocabulary.lexemes;

/** Maps historic localStorage IDs to the new stable sense IDs. */
export const vocabularyLegacyIdMap = compiledVocabulary.legacyIdMap;

/**
 * Backwards-compatible sense list used by the existing StudyWorkspace while its
 * localStorage data is migrated. Prefer `vocabularySenses` in new code.
 */
export const vocabularyLexicon = vocabularySenses;

/** Number of source study cards shown across all topic sections. */
export const vocabularyEntryCount = vocabularyTopics.reduce(
  (total, topic) =>
    total + topic.sections.reduce((sectionTotal, section) => sectionTotal + section.entries.length, 0),
  0,
);

export const vocabularyEntryCountByLevel = {
  B2: vocabularyTopics
    .filter((topic) => topic.level === "B2")
    .reduce(
      (total, topic) => total + topic.sections.reduce((sectionTotal, section) => sectionTotal + section.entries.length, 0),
      0,
    ),
  C1: vocabularyTopics
    .filter((topic) => topic.level === "C1")
    .reduce(
      (total, topic) => total + topic.sections.reduce((sectionTotal, section) => sectionTotal + section.entries.length, 0),
      0,
    ),
};

/** Number of unique semantic senses after cross-topic and cross-level deduplication. */
export const vocabularySenseCount = vocabularySenses.length;

/** Number of unique learner-facing terms after grouping polysemous senses. */
export const vocabularyLexemeCount = vocabularyLexemes.length;
