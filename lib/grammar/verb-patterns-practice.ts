import {
  verbPatternEffectiveBareInfinitiveVerbs,
  verbPatternEffectiveToInfinitiveVerbs,
  verbPatternEffectiveVerbIngVerbs,
  verbPatternLittleDifferenceVerbs,
  verbPatternMeaningChangeVerbs,
  verbPatternSourceEntryCount,
  verbPatternSourceLists,
} from "./verb-patterns-data";

export type VerbPatternFamilyId =
  | "verb-ing"
  | "object-ing"
  | "to-infinitive"
  | "object-to-infinitive"
  | "bare-infinitive"
  | "meaning-change"
  | "both-forms";

export type VerbPatternPracticeFamily = {
  id: VerbPatternFamilyId;
  title: string;
  pattern: string;
  description: string;
  verbs: string[];
};

export type VerbPatternPracticeQuestion = {
  id: string;
  verb: string;
  correctFamilyIds: VerbPatternFamilyId[];
};

export const verbPatternPracticeFamilies: VerbPatternPracticeFamily[] = [
  {
    id: "verb-ing",
    title: "Verb + -ing",
    pattern: "verb + -ing",
    description: "El verbo admite una forma en -ing.",
    verbs: verbPatternEffectiveVerbIngVerbs,
  },
  {
    id: "object-ing",
    title: "Verb + object + -ing",
    pattern: "verb + object + -ing",
    description: "El verbo introduce un objeto y después una forma en -ing.",
    verbs: [...verbPatternSourceLists.objectIng],
  },
  {
    id: "to-infinitive",
    title: "Verb + to-infinitive",
    pattern: "verb + to-infinitive",
    description: "El verbo admite to + infinitive.",
    verbs: verbPatternEffectiveToInfinitiveVerbs,
  },
  {
    id: "object-to-infinitive",
    title: "Verb + object + to-infinitive",
    pattern: "verb + object + to-infinitive",
    description: "El verbo lleva un objeto antes de to + infinitive.",
    verbs: [...verbPatternSourceLists.objectToInfinitive],
  },
  {
    id: "bare-infinitive",
    title: "Verb + object + infinitive without to",
    pattern: "verb + object + infinitive without to",
    description: "Usa la lista exacta del Grammar Reference: let, make, hear y help.",
    verbs: verbPatternEffectiveBareInfinitiveVerbs,
  },
  {
    id: "meaning-change",
    title: "-ing / to-infinitive · different meaning",
    pattern: "verb + -ing ≠ verb + to-infinitive",
    description: "El verbo admite -ing y to-infinitive, pero el significado cambia.",
    verbs: [...verbPatternMeaningChangeVerbs],
  },
  {
    id: "both-forms",
    title: "-ing / to-infinitive · little difference",
    pattern: "verb + -ing / to-infinitive",
    description: "El verbo admite las dos formas con poca diferencia en muchos contextos.",
    verbs: verbPatternLittleDifferenceVerbs,
  },
];

const familiesByVerb = new Map<string, VerbPatternFamilyId[]>();

for (const family of verbPatternPracticeFamilies) {
  for (const verb of family.verbs) {
    const current = familiesByVerb.get(verb) ?? [];
    current.push(family.id);
    familiesByVerb.set(verb, current);
  }
}

export const verbPatternPracticeQuestions: VerbPatternPracticeQuestion[] = Array.from(
  familiesByVerb.entries(),
  ([verb, correctFamilyIds]) => ({
    id: `verb-pattern-${verb.replace(/\s+/g, "-")}`,
    verb,
    correctFamilyIds,
  }),
);

function shuffleWithRandom<T>(values: readonly T[], random: () => number) {
  const result = [...values];
  for (let index = result.length - 1; index > 0; index -= 1) {
    const target = Math.floor(random() * (index + 1));
    [result[index], result[target]] = [result[target], result[index]];
  }
  return result;
}

export function buildVerbPatternRound(
  questions: readonly VerbPatternPracticeQuestion[],
  limit?: number,
  random: () => number = Math.random,
) {
  if (questions.length === 0) return [];
  if (typeof limit !== "number" || limit >= questions.length) {
    return shuffleWithRandom(questions, random);
  }

  const safeLimit = Math.max(0, limit);
  if (safeLimit === 0) return [];

  const selected: VerbPatternPracticeQuestion[] = [];
  const selectedIds = new Set<string>();

  for (const family of shuffleWithRandom(verbPatternPracticeFamilies, random)) {
    if (selected.length >= safeLimit) break;
    if (selected.some((question) => question.correctFamilyIds.includes(family.id))) continue;

    const candidates = shuffleWithRandom(
      questions.filter(
        (question) => question.correctFamilyIds.includes(family.id) && !selectedIds.has(question.id),
      ),
      random,
    );
    const candidate = candidates[0];
    if (!candidate) continue;

    selected.push(candidate);
    selectedIds.add(candidate.id);
  }

  const remaining = shuffleWithRandom(
    questions.filter((question) => !selectedIds.has(question.id)),
    random,
  );

  for (const question of remaining) {
    if (selected.length >= safeLimit) break;
    selected.push(question);
  }

  return shuffleWithRandom(selected, random);
}

export { verbPatternSourceEntryCount };
