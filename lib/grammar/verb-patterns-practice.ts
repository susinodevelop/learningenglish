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
  family: VerbPatternFamilyId;
  familyTitle: string;
  verb: string;
  prompt: string;
  options: string[];
  answerIndex: number;
  explanation: string;
  example?: string;
};

const patternLabels = {
  "verb-ing": "verb + -ing",
  "object-ing": "verb + object + -ing",
  "to-infinitive": "verb + to-infinitive",
  "object-to-infinitive": "verb + object + to-infinitive",
  "bare-infinitive": "verb + object + infinitive without to",
} as const;

const patternFamilies: VerbPatternPracticeFamily[] = [
  {
    id: "verb-ing",
    title: "Verb + -ing",
    pattern: patternLabels["verb-ing"],
    description: "El primer verbo exige una forma en -ing.",
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
    pattern: patternLabels["object-ing"],
    description: "El verbo introduce a la persona/cosa y después la acción en -ing.",
    verbs: ["catch", "discover", "find", "forbid", "notice", "observe", "overhear", "prevent"],
  },
  {
    id: "to-infinitive",
    title: "Verb + to-infinitive",
    pattern: patternLabels["to-infinitive"],
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
    pattern: patternLabels["object-to-infinitive"],
    description: "Otra persona/cosa funciona como objeto antes de to + infinitive.",
    verbs: [
      "advise", "allow", "ask", "cause", "command", "encourage", "expect", "forbid", "force",
      "get", "hate", "help", "instruct", "intend", "invite", "leave", "like", "mean", "need",
      "oblige", "order", "permit", "persuade", "prefer", "press", "recommend", "remind",
      "request", "teach", "tell", "tempt", "trouble", "want", "warn", "wish",
    ],
  },
  {
    id: "bare-infinitive",
    title: "Object + infinitive without to",
    pattern: patternLabels["bare-infinitive"],
    description: "Let, make, hear y help aparecen con objeto + infinitive without to en este patrón.",
    verbs: ["let", "make", "hear", "help"],
  },
];

const bothFormsFamily: VerbPatternPracticeFamily = {
  id: "both-forms",
  title: "-ing or infinitive: little difference",
  pattern: "verb + -ing / to-infinitive",
  description: "Estos verbos pueden admitir las dos formas con poca diferencia en muchos contextos.",
  verbs: ["attempt", "begin", "continue", "love", "prefer", "see", "start"],
};

const meaningChangeFamily: VerbPatternPracticeFamily = {
  id: "meaning-change",
  title: "-ing or infinitive: different meaning",
  pattern: "verb + -ing ≠ verb + to-infinitive",
  description: "Aquí elegir -ing o to-infinitive cambia el significado.",
  verbs: ["remember", "forget", "regret", "stop", "try"],
};

export const verbPatternPracticeFamilies: VerbPatternPracticeFamily[] = [
  ...patternFamilies,
  meaningChangeFamily,
  bothFormsFamily,
];

function stableHash(value: string) {
  let hash = 2166136261;
  for (const char of value) {
    hash ^= char.charCodeAt(0);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
}

function rotateCorrectOption(correct: string, distractors: string[], seed: string) {
  const answerIndex = stableHash(seed) % 4;
  const alternatives = Array.from(new Set(distractors.filter((candidate) => candidate !== correct))).slice(0, 3);
  if (alternatives.length !== 3) {
    throw new Error(`Verb-pattern question needs three unique distractors: ${seed}`);
  }
  const options = [...alternatives];
  options.splice(answerIndex, 0, correct);
  return { options, answerIndex };
}

function patternExample(family: VerbPatternFamilyId, verb: string) {
  switch (family) {
    case "verb-ing":
      return `${verb} doing it`;
    case "object-ing":
      return `${verb} someone doing it`;
    case "to-infinitive":
      return `${verb} to do it`;
    case "object-to-infinitive":
      return `${verb} someone to do it`;
    case "bare-infinitive":
      return `${verb} someone do it`;
    default:
      return undefined;
  }
}

function familyMembershipCount(verb: string) {
  return verbPatternPracticeFamilies.filter((family) => family.verbs.includes(verb)).length;
}

const structuralPatternQuestions: VerbPatternPracticeQuestion[] = patternFamilies.flatMap((family) =>
  family.verbs.map((verb) => {
    const example = patternExample(family.id, verb);
    const hasMoreThanOnePattern = familyMembershipCount(verb) > 1;
    const { options, answerIndex } = rotateCorrectOption(
      family.title,
      patternFamilies.map((candidate) => candidate.title),
      `${family.id}-${verb}`,
    );

    return {
      id: `pattern-${family.id}-${verb.replace(/\s+/g, "-")}`,
      family: family.id,
      familyTitle: family.title,
      verb,
      prompt: hasMoreThanOnePattern && example
        ? `In “${example}”, which verb pattern is being used with “${verb}”?`
        : `Which verb pattern does “${verb}” take?`,
      options,
      answerIndex,
      explanation: `In this use, “${verb}” follows ${family.pattern}.`,
      example,
    };
  }),
);

const flexibleQuestions: VerbPatternPracticeQuestion[] = bothFormsFamily.verbs.map((verb) => {
  const correct = "It can take -ing or to-infinitive with little difference in many contexts.";
  const { options, answerIndex } = rotateCorrectOption(
    correct,
    [
      "It only takes -ing.",
      "It only takes object + to-infinitive.",
      "It must always take an infinitive without to.",
    ],
    `both-${verb}`,
  );

  return {
    id: `both-${verb}`,
    family: "both-forms",
    familyTitle: bothFormsFamily.title,
    verb,
    prompt: `What should you remember about “${verb}” in this contrast?`,
    options,
    answerIndex,
    explanation: `“${verb}” can admit -ing or an infinitive with little difference in many contexts.`,
  };
});

const meaningQuestions: VerbPatternPracticeQuestion[] = [
  {
    id: "meaning-remember-ing",
    family: "meaning-change",
    familyTitle: meaningChangeFamily.title,
    verb: "remember",
    prompt: "Choose the form for a memory of a past event: I remember ___ her at university.",
    options: ["meeting", "to meet", "meet", "met"],
    answerIndex: 0,
    explanation: "Remember + -ing looks back: the meeting happened before the remembering.",
    example: "I remember meeting her at university.",
  },
  {
    id: "meaning-remember-to",
    family: "meaning-change",
    familyTitle: meaningChangeFamily.title,
    verb: "remember",
    prompt: "Choose the form for a task you must not forget: Remember ___ the email before lunch.",
    options: ["sending", "to send", "send", "sent"],
    answerIndex: 1,
    explanation: "Remember + to-infinitive means remember first, then perform the action.",
    example: "Remember to send the email before lunch.",
  },
  {
    id: "meaning-forget-ing",
    family: "meaning-change",
    familyTitle: meaningChangeFamily.title,
    verb: "forget",
    prompt: "Choose the form for a past experience that remains memorable: I'll never forget ___ that view for the first time.",
    options: ["seeing", "to see", "see", "saw"],
    answerIndex: 0,
    explanation: "Forget + -ing refers to forgetting or not forgetting a past event or experience.",
    example: "I'll never forget seeing that view for the first time.",
  },
  {
    id: "meaning-forget-to",
    family: "meaning-change",
    familyTitle: meaningChangeFamily.title,
    verb: "forget",
    prompt: "Choose the form when someone failed to do a task: I forgot ___ her yesterday.",
    options: ["calling", "to call", "call", "called"],
    answerIndex: 1,
    explanation: "Forget + to-infinitive means the required action was not remembered and therefore was not done.",
    example: "I forgot to call her yesterday.",
  },
  {
    id: "meaning-regret-ing",
    family: "meaning-change",
    familyTitle: meaningChangeFamily.title,
    verb: "regret",
    prompt: "Choose the form for being sorry about a past action: I regret ___ him the truth.",
    options: ["telling", "to tell", "tell", "told"],
    answerIndex: 0,
    explanation: "Regret + -ing expresses regret about something already done.",
    example: "I regret telling him the truth.",
  },
  {
    id: "meaning-regret-to",
    family: "meaning-change",
    familyTitle: meaningChangeFamily.title,
    verb: "regret",
    prompt: "Choose the formal announcement pattern: We regret ___ you that your application was unsuccessful.",
    options: ["informing", "to inform", "inform", "informed"],
    answerIndex: 1,
    explanation: "Regret + to-infinitive is used formally when giving unpleasant news now.",
    example: "We regret to inform you that your application was unsuccessful.",
  },
  {
    id: "meaning-stop-ing",
    family: "meaning-change",
    familyTitle: meaningChangeFamily.title,
    verb: "stop",
    prompt: "Choose the form when the activity itself ends: She stopped ___ last year.",
    options: ["smoking", "to smoke", "smoke", "smoked"],
    answerIndex: 0,
    explanation: "Stop + -ing means cease the activity.",
    example: "She stopped smoking last year.",
  },
  {
    id: "meaning-stop-to",
    family: "meaning-change",
    familyTitle: meaningChangeFamily.title,
    verb: "stop",
    prompt: "Choose the form when one activity pauses in order to do another: We stopped ___ a coffee on the way home.",
    options: ["having", "to have", "have", "had"],
    answerIndex: 1,
    explanation: "Stop + to-infinitive means stop another activity in order to do this new action.",
    example: "We stopped to have a coffee on the way home.",
  },
  {
    id: "meaning-try-ing",
    family: "meaning-change",
    familyTitle: meaningChangeFamily.title,
    verb: "try",
    prompt: "Choose the form for experimenting with a possible solution: Try ___ the router.",
    options: ["restarting", "to restart", "restart", "restarted"],
    answerIndex: 0,
    explanation: "Try + -ing means experiment with a method to see whether it works.",
    example: "Try restarting the router.",
  },
  {
    id: "meaning-try-to",
    family: "meaning-change",
    familyTitle: meaningChangeFamily.title,
    verb: "try",
    prompt: "Choose the form for making an effort: Try ___ calm during the interview.",
    options: ["staying", "to stay", "stay", "stayed"],
    answerIndex: 1,
    explanation: "Try + to-infinitive means make an effort to achieve something.",
    example: "Try to stay calm during the interview.",
  },
];

const passiveBareInfinitiveQuestions: VerbPatternPracticeQuestion[] = [
  {
    id: "bare-passive-make",
    family: "bare-infinitive",
    familyTitle: "Object + infinitive without to",
    verb: "make",
    prompt: "Choose the correct passive form: They made us wait outside. → We ___ outside.",
    options: ["were made wait", "were made to wait", "made to wait", "were made waiting"],
    answerIndex: 1,
    explanation: "Make takes a bare infinitive in the active pattern, but the passive uses to-infinitive.",
    example: "We were made to wait outside.",
  },
  {
    id: "bare-passive-hear",
    family: "bare-infinitive",
    familyTitle: "Object + infinitive without to",
    verb: "hear",
    prompt: "Choose the correct passive pattern: People heard him leave. → He was heard ___ .",
    options: ["leave", "to leave", "leaving to", "left"],
    answerIndex: 1,
    explanation: "In the passive, hear is followed by a to-infinitive in this pattern.",
    example: "He was heard to leave.",
  },
  {
    id: "bare-passive-help",
    family: "bare-infinitive",
    familyTitle: "Object + infinitive without to",
    verb: "help",
    prompt: "Choose the passive form taught in this grammar reference: She was helped ___ the form.",
    options: ["complete", "to complete", "completing", "completed"],
    answerIndex: 1,
    explanation: "The grammar reference highlights the to-infinitive after help in passive forms.",
    example: "She was helped to complete the form.",
  },
];

export const verbPatternPracticeQuestions: VerbPatternPracticeQuestion[] = [
  ...structuralPatternQuestions,
  ...meaningQuestions,
  ...flexibleQuestions,
  ...passiveBareInfinitiveQuestions,
];

export const verbPatternSourceEntryCount = patternFamilies.reduce(
  (total, family) => total + family.verbs.length,
  0,
);