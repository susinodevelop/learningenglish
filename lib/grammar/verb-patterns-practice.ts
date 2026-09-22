import {
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
    description: "El verbo lleva objeto + infinitive without to en este patrón.",
    verbs: [...verbPatternSourceLists.bareInfinitive],
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

export { verbPatternSourceEntryCount };
