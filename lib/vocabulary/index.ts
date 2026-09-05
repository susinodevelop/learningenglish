import { compileVocabulary } from "./compiler";
import type { VocabularyCategory, VocabularyTopic } from "./types";
import { worldVocabularyTopics } from "./data/world";
import { peopleVocabularyTopics } from "./data/people";
import { cultureVocabularyTopics } from "./data/culture";
import { placesVocabularyTopics } from "./data/places";
import { timeVocabularyTopics } from "./data/time";
import { studyWorkVocabularyTopics } from "./data/study-work";

export type {
  VocabularyCategory,
  VocabularyEntryType,
  VocabularyExample,
  VocabularyLexeme,
  VocabularyLexicalMember,
  VocabularyMeaning,
  VocabularyRelations,
  VocabularySeedEntry,
  VocabularySection,
  VocabularySectionKind,
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
  { id: "study-work", label: "Estudio y trabajo", description: "Escuela, empleo, universidad y opinión." },
];

const sourceVocabularyTopics: VocabularyTopic[] = [
  ...worldVocabularyTopics,
  ...peopleVocabularyTopics,
  ...cultureVocabularyTopics,
  ...placesVocabularyTopics,
  ...timeVocabularyTopics,
  ...studyWorkVocabularyTopics,
];

const compiledVocabulary = compileVocabulary(sourceVocabularyTopics);

/** Learner-facing, rich topics. */
export const vocabularyTopics = compiledVocabulary.topics;

/** Canonical lexical senses reusable by quizzes and future games. */
export const vocabularyLexicon = compiledVocabulary.lexicon;

/** Number of source study cards shown across all topic sections. */
export const vocabularyEntryCount = vocabularyTopics.reduce(
  (total, topic) =>
    total + topic.sections.reduce((sectionTotal, section) => sectionTotal + section.entries.length, 0),
  0,
);

/** Number of unique lexical senses after cross-topic deduplication. */
export const vocabularySenseCount = vocabularyLexicon.length;
