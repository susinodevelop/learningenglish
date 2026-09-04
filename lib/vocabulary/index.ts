import type { VocabularyCategory, VocabularyTopic } from "./types";
import { worldVocabularyTopics } from "./data/world";
import { peopleVocabularyTopics } from "./data/people";
import { cultureVocabularyTopics } from "./data/culture";
import { placesVocabularyTopics } from "./data/places";
import { timeVocabularyTopics } from "./data/time";
import { studyWorkVocabularyTopics } from "./data/study-work";

export type {
  VocabularyCategory,
  VocabularyEntry,
  VocabularySection,
  VocabularySectionKind,
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

export const vocabularyTopics: VocabularyTopic[] = [
  ...worldVocabularyTopics,
  ...peopleVocabularyTopics,
  ...cultureVocabularyTopics,
  ...placesVocabularyTopics,
  ...timeVocabularyTopics,
  ...studyWorkVocabularyTopics,
];

export const vocabularyEntryCount = vocabularyTopics.reduce(
  (total, topic) =>
    total + topic.sections.reduce((sectionTotal, section) => sectionTotal + section.entries.length, 0),
  0,
);
