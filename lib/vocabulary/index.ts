import { compileVocabulary } from "./compiler";
import type { VocabularyCategory, VocabularyTopic } from "./types";
import { worldVocabularyTopics } from "./data/world";
import { peopleVocabularyTopics } from "./data/people";
import { cultureVocabularyTopics } from "./data/culture";
import { placesVocabularyTopics } from "./data/places";
import { timeVocabularyTopics } from "./data/time";
import { studyWorkVocabularyTopics } from "./data/study-work";
import { goldC1VocabularyTopics } from "./data/c1";

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
];

const sourceVocabularyTopics: VocabularyTopic[] = [
  ...worldVocabularyTopics,
  ...peopleVocabularyTopics,
  ...cultureVocabularyTopics,
  ...placesVocabularyTopics,
  ...timeVocabularyTopics,
  ...studyWorkVocabularyTopics,
  ...goldC1VocabularyTopics,
];

const compiledVocabulary = compileVocabulary(sourceVocabularyTopics);

/** Learner-facing, rich topics from the B2 First and C1 Advanced source books. */
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
