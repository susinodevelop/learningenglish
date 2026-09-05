import type {
  VocabularyEntryType,
  VocabularyLexeme,
  VocabularySectionKind,
} from "./vocabulary";

export type VocabularyPerformanceFilter =
  | "all"
  | "unseen"
  | "mistakes"
  | "learning"
  | "mastered";

export type VocabularyProgressRecord = {
  attempts: number;
  correct: number;
  incorrect: number;
  streak: number;
  lastPractisedAt: string;
};

export type VocabularyProgress = Record<string, VocabularyProgressRecord>;

export type DynamicStudyGroupFilter = {
  query: string;
  topicSlugs: string[];
  entryTypes: VocabularyEntryType[];
  sectionKinds: VocabularySectionKind[];
  performance: VocabularyPerformanceFilter;
};

type StudyGroupBase = {
  id: string;
  name: string;
  system?: boolean;
};

export type StaticStudyGroup = StudyGroupBase & {
  kind: "static";
  lexemeIds: string[];
};

export type DynamicStudyGroup = StudyGroupBase & {
  kind: "dynamic";
  filter: DynamicStudyGroupFilter;
};

export type StudyGroup = StaticStudyGroup | DynamicStudyGroup;

export const STUDY_GROUPS_STORAGE_KEY = "learningenglish:study-groups:v1";
export const VOCABULARY_PROGRESS_STORAGE_KEY = "learningenglish:vocabulary-progress:v1";

export const emptyDynamicStudyGroupFilter: DynamicStudyGroupFilter = {
  query: "",
  topicSlugs: [],
  entryTypes: [],
  sectionKinds: [],
  performance: "all",
};

export const systemStudyGroups: StudyGroup[] = [
  {
    id: "system-all-b2",
    name: "Todo el vocabulario B2",
    kind: "dynamic",
    system: true,
    filter: { ...emptyDynamicStudyGroupFilter },
  },
  {
    id: "system-mistakes",
    name: "Errores pendientes",
    kind: "dynamic",
    system: true,
    filter: { ...emptyDynamicStudyGroupFilter, performance: "mistakes" },
  },
  {
    id: "system-unseen",
    name: "Sin practicar",
    kind: "dynamic",
    system: true,
    filter: { ...emptyDynamicStudyGroupFilter, performance: "unseen" },
  },
];

function normalise(value: string) {
  return value
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[’‘]/g, "'")
    .replace(/\s+/g, " ")
    .trim()
    .toLocaleLowerCase();
}

export function isVocabularyMastered(record?: VocabularyProgressRecord) {
  if (!record || record.attempts < 3) return false;
  return record.streak >= 3 && record.correct / record.attempts >= 0.8;
}

function matchesPerformance(
  performance: VocabularyPerformanceFilter,
  record?: VocabularyProgressRecord,
) {
  const attempts = record?.attempts ?? 0;

  switch (performance) {
    case "unseen":
      return attempts === 0;
    case "mistakes":
      return (record?.incorrect ?? 0) > 0 && !isVocabularyMastered(record);
    case "learning":
      return attempts > 0 && !isVocabularyMastered(record);
    case "mastered":
      return isVocabularyMastered(record);
    case "all":
    default:
      return true;
  }
}

function searchableLexemeText(entry: VocabularyLexeme) {
  return [
    entry.term,
    entry.meaning.en,
    entry.meaning.es,
    ...entry.topics,
    ...entry.sectionTitles,
    ...entry.notes,
    ...entry.members.flatMap((member) => [
      member.term,
      member.meaning.en,
      member.meaning.es,
    ]),
    ...entry.relations.collocations,
    ...entry.relations.patterns,
    ...entry.relations.synonyms,
    ...entry.relations.antonyms,
    ...entry.relations.confusedWith,
    ...entry.relations.wordFamily,
  ].join(" ");
}

export function resolveStudyGroup(
  group: StudyGroup,
  lexicon: VocabularyLexeme[],
  progress: VocabularyProgress,
) {
  if (group.kind === "static") {
    const ids = new Set(group.lexemeIds);
    return lexicon.filter((entry) => ids.has(entry.id));
  }

  const query = normalise(group.filter.query);

  return lexicon.filter((entry) => {
    if (
      group.filter.topicSlugs.length > 0 &&
      !entry.topics.some((topic) => group.filter.topicSlugs.includes(topic))
    ) {
      return false;
    }

    if (
      group.filter.entryTypes.length > 0 &&
      !group.filter.entryTypes.includes(entry.type)
    ) {
      return false;
    }

    if (
      group.filter.sectionKinds.length > 0 &&
      !entry.sectionKinds.some((kind) => group.filter.sectionKinds.includes(kind))
    ) {
      return false;
    }

    if (!matchesPerformance(group.filter.performance, progress[entry.id])) {
      return false;
    }

    return query.length === 0 || normalise(searchableLexemeText(entry)).includes(query);
  });
}

export function createStudyGroupId() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return `study-${crypto.randomUUID()}`;
  }

  return `study-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}
