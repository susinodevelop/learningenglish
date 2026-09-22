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
    description: "El verbo va seguido de una forma en -ing.",
    verbs: [
      "admit", "appreciate", "avoid", "consider", "delay", "deny", "detest", "dislike",
      "enjoy", "escape", "face", "feel like", "finish", "forgive", "give up", "imagine",
      "involve", "keep", "mention", "mind", "miss", "postpone", "practise", "prefer",
      "put off", "recommend", "regret", "resent", "risk", "suggest", "understand",
    ],
  },
  {
    id: "object-ing",
    title: "Verb + object + -ing",
    pattern: "verb + object + -ing",
    description: "El verbo introduce un objeto y después una forma en -ing.",
    verbs: ["catch", "discover", "find", "forbid", "notice", "observe", "overhear", "prevent"],
  },
  {
    id: "to-infinitive",
    title: "Verb + to-infinitive",
    pattern: "verb + to-infinitive",
    description: "El verbo va seguido de to + infinitive.",
    verbs: [
      "afford", "agree", "appear", "arrange", "ask", "attempt", "bear", "begin", "care",
      "choose", "consent", "decide", "determine", "expect", "fail", "forget", "happen",
      "hate", "help", "hesitate", "hope", "intend", "learn", "like", "love", "manage",
      "mean", "offer", "prefer", "prepare", "pretend", "promise", "propose", "refuse",
      "remember", "seem", "start", "swear", "try", "want", "wish",
    ],
  },
  {
    id: "object-to-infinitive",
    title: "Verb + object + to-infinitive",
    pattern: "verb + object + to-infinitive",
    description: "El verbo lleva un objeto antes de to + infinitive.",
    verbs: [
      "advise", "allow", "ask", "cause", "command", "encourage", "expect", "forbid", "force",
      "get", "hate", "help", "instruct", "intend", "invite", "leave", "like", "mean", "need",
      "oblige", "order", "permit", "persuade", "prefer", "press", "recommend", "remind",
      "request", "teach", "tell", "tempt", "trouble", "want", "warn", "wish",
    ],
  },
  {
    id: "bare-infinitive",
    title: "Verb + object + infinitive without to",
    pattern: "verb + object + infinitive without to",
    description: "El verbo lleva objeto + infinitive without to en este patrón.",
    verbs: ["let", "make", "hear", "help"],
  },
  {
    id: "meaning-change",
    title: "-ing / to-infinitive · different meaning",
    pattern: "verb + -ing ≠ verb + to-infinitive",
    description: "El verbo admite -ing y to-infinitive, pero el significado cambia.",
    verbs: ["remember", "forget", "regret", "stop", "try"],
  },
  {
    id: "both-forms",
    title: "-ing / to-infinitive · little difference",
    pattern: "verb + -ing / to-infinitive",
    description: "El verbo puede admitir las dos formas con poca diferencia en muchos contextos.",
    verbs: ["attempt", "begin", "continue", "love", "prefer", "see", "start"],
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

export const verbPatternSourceEntryCount = verbPatternPracticeFamilies
  .filter((family) => !["meaning-change", "both-forms"].includes(family.id))
  .reduce((total, family) => total + family.verbs.length, 0);
