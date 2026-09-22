import type {
  VocabularyEntryType,
  VocabularyLevel,
  VocabularySectionKind,
  VocabularySense,
} from "./vocabulary";
import { personalImportSlugs } from "./vocabulary/data/personal-import";

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

/** During localStorage migration keys may be historic IDs or stable senseIds. */
export type VocabularyProgress = Record<string, VocabularyProgressRecord>;

export type CustomStudyWord = {
  id: string;
  term: string;
  meaningEs: string;
  definitionEn: string;
  exampleEn: string;
  exampleEs: string;
  level: VocabularyLevel;
};

export type DynamicStudyGroupFilter = {
  query: string;
  topicSlugs: string[];
  /** Optional for backwards compatibility with study groups saved before C1 was added. */
  levels?: VocabularyLevel[];
  entryTypes: VocabularyEntryType[];
  sectionKinds: VocabularySectionKind[];
  performance: VocabularyPerformanceFilter;
  /** Explicit additions alongside the automatically matching words. */
  includeSenseIds?: string[];
  customWords?: CustomStudyWord[];
};

export const PERSONAL_STUDY_GROUP_ID = "system-personal-added";

type StudyGroupBase = {
  id: string;
  name: string;
  system?: boolean;
};

export type StaticStudyGroup = StudyGroupBase & {
  kind: "static";
  /** Historic field name. Values can be v1 IDs or stable senseIds during migration. */
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
  levels: [],
  entryTypes: [],
  sectionKinds: [],
  performance: "all",
};

export const systemStudyGroups: StudyGroup[] = [
  {
    // Keep the historic id so existing client state cannot be invalidated by the B2+C1 expansion.
    id: "system-all-b2",
    name: "Todo el vocabulario B1 + B2 + C1",
    kind: "dynamic",
    system: true,
    filter: { ...emptyDynamicStudyGroupFilter },
  },
  {
    id: PERSONAL_STUDY_GROUP_ID,
    name: "Añadido por mí",
    kind: "dynamic",
    system: true,
    filter: { ...emptyDynamicStudyGroupFilter, topicSlugs: personalImportSlugs },
  },
  {
    id: "system-level-b2",
    name: "Solo vocabulario B2",
    kind: "dynamic",
    system: true,
    filter: { ...emptyDynamicStudyGroupFilter, levels: ["B2"] },
  },
  {
    id: "system-level-c1",
    name: "Solo vocabulario C1",
    kind: "dynamic",
    system: true,
    filter: { ...emptyDynamicStudyGroupFilter, levels: ["C1"] },
  },
  {
    id: "system-c1-idioms",
    name: "Idioms C1",
    kind: "dynamic",
    system: true,
    filter: { ...emptyDynamicStudyGroupFilter, levels: ["C1"], topicSlugs: ["c1-idioms"] },
  },
  {
    id: "system-irregular-verbs",
    name: "Irregular verbs",
    kind: "dynamic",
    system: true,
    filter: { ...emptyDynamicStudyGroupFilter, levels: ["B2"], topicSlugs: ["irregular-verbs"] },
  },
  {
    id: "system-phrasal-verbs",
    name: "Phrasal verbs",
    kind: "dynamic",
    system: true,
    filter: { ...emptyDynamicStudyGroupFilter, entryTypes: ["phrasal-verb"] },
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

function searchableSenseText(entry: VocabularySense) {
  return [
    entry.term,
    entry.meaning.en,
    entry.meaning.es,
    ...entry.levels,
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

export function progressForSense(progress: VocabularyProgress, entry: VocabularySense) {
  if (progress[entry.senseId]) return progress[entry.senseId];
  if (progress[entry.id]) return progress[entry.id];
  for (const legacyId of entry.legacyIds) {
    if (progress[legacyId]) return progress[legacyId];
  }
  return undefined;
}

export function storedIdMatchesSense(storedId: string, entry: VocabularySense) {
  return storedId === entry.senseId || storedId === entry.id || entry.legacyIds.includes(storedId);
}

export function resolveStudyGroup(
  group: StudyGroup,
  lexicon: VocabularySense[],
  progress: VocabularyProgress,
) {
  if (group.kind === "static") {
    const ids = new Set(group.lexemeIds);
    return lexicon.filter((entry) =>
      ids.has(entry.senseId) || ids.has(entry.id) || entry.legacyIds.some((legacyId) => ids.has(legacyId)),
    );
  }

  const query = normalise(group.filter.query);
  const levels = group.filter.levels ?? [];
  const includedIds = new Set(group.filter.includeSenseIds ?? []);

  const matched = lexicon.filter((entry) => {
    if (includedIds.has(entry.senseId)) return true;
    if (
      levels.length > 0 &&
      !entry.levels.some((level) => levels.includes(level))
    ) {
      return false;
    }

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

    if (!matchesPerformance(group.filter.performance, progressForSense(progress, entry))) {
      return false;
    }

    return query.length === 0 || normalise(searchableSenseText(entry)).includes(query);
  });

  return [...matched, ...(group.filter.customWords ?? []).map(customWordToSense)];
}

export function customWordToSense(word: CustomStudyWord): VocabularySense {
  const senseId = `personal-custom-${word.id}`;
  return {
    id: senseId,
    senseId,
    lexemeId: `personal-lexeme-${word.id}`,
    legacyIds: [],
    term: word.term,
    normalizedTerm: normalise(word.term),
    type: "word",
    cefr: word.level,
    levels: [word.level],
    meaning: { en: word.definitionEn, es: word.meaningEs },
    members: [{ term: word.term, meaning: { en: word.definitionEn, es: word.meaningEs } }],
    examples: [{ en: word.exampleEn, es: word.exampleEs, kind: "usage" }],
    topics: ["personal-added-custom"],
    sourceUnits: [],
    sectionKinds: ["core"],
    sectionTitles: ["Añadido por mí"],
    relations: { collocations: [], patterns: [], synonyms: [], antonyms: [], confusedWith: [], wordFamily: [] },
    resolvedRelations: { synonyms: [], antonyms: [], confusedWith: [], wordFamily: [] },
    notes: [],
    provenance: { sources: ["Personal entry"], lexicalSelection: "personal", englishDefinition: "pedagogical-original", examples: "pedagogical-original" },
  };
}

/** Convert a v1 static group to stable senseIds without changing its user-facing identity. */
export function migrateStaticGroupIds(group: StudyGroup, lexicon: VocabularySense[]): StudyGroup {
  if (group.kind !== "static") return group;

  const migrated = group.lexemeIds.flatMap((storedId) => {
    const match = lexicon.find((entry) => storedIdMatchesSense(storedId, entry));
    return match ? [match.senseId] : [];
  });

  return {
    ...group,
    lexemeIds: Array.from(new Set(migrated)),
  };
}

/** Re-key v1 local progress to stable senseIds, merging records defensively. */
export function migrateVocabularyProgress(
  progress: VocabularyProgress,
  lexicon: VocabularySense[],
): VocabularyProgress {
  const next: VocabularyProgress = {};

  for (const entry of lexicon) {
    const record = progressForSense(progress, entry);
    if (!record) continue;
    const previous = next[entry.senseId];
    if (!previous) {
      next[entry.senseId] = record;
      continue;
    }

    next[entry.senseId] = {
      attempts: previous.attempts + record.attempts,
      correct: previous.correct + record.correct,
      incorrect: previous.incorrect + record.incorrect,
      streak: Math.max(previous.streak, record.streak),
      lastPractisedAt: [previous.lastPractisedAt, record.lastPractisedAt].sort().at(-1) ?? "",
    };
  }

  return next;
}

export function createStudyGroupId() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return `study-${crypto.randomUUID()}`;
  }

  return `study-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}
