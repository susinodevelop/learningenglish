import type {
  DynamicStudyGroupFilter,
  StudyGroup,
  VocabularyPerformanceFilter,
  VocabularyProgress,
} from "./study-groups";
import type { StudyAttemptInput } from "./study-db";
import type { VocabularyEntryType, VocabularyLevel, VocabularySectionKind } from "./vocabulary";

const performanceValues = new Set<VocabularyPerformanceFilter>([
  "all",
  "unseen",
  "mistakes",
  "learning",
  "mastered",
]);
const levelValues = new Set<VocabularyLevel>(["B2", "C1"]);
const entryTypeValues = new Set<VocabularyEntryType>([
  "word",
  "expression",
  "collocation",
  "phrasal-verb",
  "word-family",
]);
const sectionKindValues = new Set<VocabularySectionKind>([
  "core",
  "chunks",
  "phrasal",
  "word-family",
  "contrast",
]);

function objectValue(value: unknown): Record<string, unknown> | null {
  return value && typeof value === "object" && !Array.isArray(value)
    ? value as Record<string, unknown>
    : null;
}

function stringArray(value: unknown, max = 100): string[] {
  if (!Array.isArray(value)) return [];
  return value
    .filter((item): item is string => typeof item === "string")
    .map((item) => item.trim())
    .filter(Boolean)
    .slice(0, max);
}

function parseFilter(value: unknown): DynamicStudyGroupFilter | null {
  const candidate = objectValue(value);
  if (!candidate) return null;

  const performance = typeof candidate.performance === "string" &&
    performanceValues.has(candidate.performance as VocabularyPerformanceFilter)
    ? candidate.performance as VocabularyPerformanceFilter
    : "all";

  return {
    query: typeof candidate.query === "string" ? candidate.query.slice(0, 300) : "",
    topicSlugs: stringArray(candidate.topicSlugs, 50),
    levels: stringArray(candidate.levels, 2).filter((level): level is VocabularyLevel =>
      levelValues.has(level as VocabularyLevel),
    ),
    entryTypes: stringArray(candidate.entryTypes, 10).filter((type): type is VocabularyEntryType =>
      entryTypeValues.has(type as VocabularyEntryType),
    ),
    sectionKinds: stringArray(candidate.sectionKinds, 10).filter((kind): kind is VocabularySectionKind =>
      sectionKindValues.has(kind as VocabularySectionKind),
    ),
    performance,
  };
}

export function parseStudyGroups(value: unknown): StudyGroup[] | null {
  if (!Array.isArray(value) || value.length > 200) return null;
  const groups: StudyGroup[] = [];

  for (const item of value) {
    const candidate = objectValue(item);
    if (!candidate) return null;
    const id = typeof candidate.id === "string" ? candidate.id.trim() : "";
    const name = typeof candidate.name === "string" ? candidate.name.trim() : "";
    const kind = candidate.kind;
    if (!id || id.length > 160 || !name || name.length > 120) return null;

    if (kind === "static") {
      groups.push({
        id,
        name,
        kind,
        lexemeIds: Array.from(new Set(stringArray(candidate.lexemeIds, 5000))),
      });
      continue;
    }

    if (kind === "dynamic") {
      const filter = parseFilter(candidate.filter);
      if (!filter) return null;
      groups.push({ id, name, kind, filter });
      continue;
    }

    return null;
  }

  return groups;
}

export function parseVocabularyProgress(value: unknown): VocabularyProgress | null {
  const candidate = objectValue(value);
  if (!candidate || Object.keys(candidate).length > 10000) return null;
  const progress: VocabularyProgress = {};

  for (const [senseId, raw] of Object.entries(candidate)) {
    if (!senseId || senseId.length > 180) return null;
    const record = objectValue(raw);
    if (!record) return null;
    const attempts = Math.max(0, Math.trunc(Number(record.attempts) || 0));
    const correct = Math.max(0, Math.trunc(Number(record.correct) || 0));
    const incorrect = Math.max(0, Math.trunc(Number(record.incorrect) || 0));
    const streak = Math.max(0, Math.trunc(Number(record.streak) || 0));

    progress[senseId] = {
      attempts,
      correct: Math.min(correct, attempts),
      incorrect: Math.min(incorrect, attempts),
      streak,
      lastPractisedAt: typeof record.lastPractisedAt === "string"
        ? record.lastPractisedAt.slice(0, 80)
        : "",
    };
  }

  return progress;
}

export function parseStudyAttempt(value: unknown): StudyAttemptInput | null {
  const candidate = objectValue(value);
  if (!candidate) return null;
  const senseId = typeof candidate.senseId === "string" ? candidate.senseId.trim() : "";
  const gameType = candidate.gameType;
  const direction = typeof candidate.direction === "string" ? candidate.direction.trim() : "";
  if (!senseId || senseId.length > 180 || !direction || direction.length > 80) return null;
  if (gameType !== "multiple-choice" && gameType !== "flashcards" && gameType !== "write-word") {
    return null;
  }
  if (typeof candidate.correct !== "boolean") return null;

  return {
    senseId,
    gameType,
    direction,
    difficulty: typeof candidate.difficulty === "string" ? candidate.difficulty.slice(0, 40) : null,
    correct: candidate.correct,
    selectedAnswer: typeof candidate.selectedAnswer === "string"
      ? candidate.selectedAnswer.slice(0, 500)
      : null,
  };
}
