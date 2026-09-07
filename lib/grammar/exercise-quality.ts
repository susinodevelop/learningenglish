import type { GrammarApplicationSeed } from "./exercise-bank";

type ExercisePatch = Partial<GrammarApplicationSeed>;

const qualityPatches: Record<string, ExercisePatch> = {
  "By the time the guests arrived, we ___ dinner.": {
    prompt: "By the time the guests arrived, we ___ preparing dinner, so everything was ready.",
    options: ["finished", "had finished", "were finishing", "have finished"],
    answerIndex: 1,
    explanation: "Past perfect marks the preparation as completed before the guests arrived.",
  },
  "She said the lecture ___ in fifteen minutes, so we hurried.": {
    options: ["was starting", "had started", "would have started", "has been starting"],
    answerIndex: 0,
    explanation: "Past continuous can describe an arranged future event viewed from a past reference point.",
  },
  "I was really ___ by the ending.": {
    options: ["surprising", "surprised", "surprise", "surprisingly"],
    answerIndex: 1,
    explanation: "-ed adjectives describe the person's reaction; -ing adjectives describe what causes that reaction.",
  },
  "The room was ___ freezing.": {
    options: ["absolutely", "very", "slightly", "fairly"],
    answerIndex: 0,
    explanation: "Freezing is an extreme adjective, so absolutely is the natural intensifier here; very normally modifies gradable adjectives.",
  },
  "She isn't answering. She ___ have left her phone at home.": {
    prompt: "We're not sure why she isn't answering; she ___ have left her phone at home.",
    options: ["might", "can't", "must", "should"],
    answerIndex: 0,
    explanation: "Might have expresses an uncertain past possibility. Must have is a much stronger deduction, can't have rejects the possibility and should have expresses expectation/criticism.",
  },
  "We brought three umbrellas, but it stayed sunny. We ___.": {
    options: ["shouldn't have brought them", "needn't have brought them", "couldn't have brought them", "mustn't bring them"],
    answerIndex: 1,
    explanation: "Needn't have + past participle means the action happened but later proved unnecessary. Shouldn't have adds criticism, couldn't have says it was impossible, and mustn't refers to prohibition.",
  },
  "The door jammed, but after several attempts I ___ open it.": {
    options: ["could", "was able to", "used to", "would"],
    answerIndex: 1,
    explanation: "Was able to is preferred for one specific successful achievement in the past; could normally describes general past ability.",
  },
  "If the app freezes, try ___ it.": {
    prompt: "Choose the form that means ‘experiment with restarting as a possible solution’: If the app freezes, try ___ it.",
    options: ["restarting", "to restart", "restart", "having restarted"],
    answerIndex: 0,
    explanation: "Try + -ing means test a possible solution. Try + to-infinitive focuses on making an effort to achieve an action.",
  },
  "I ordered the vegetarian option, and Maya did ___ too.": {
    options: ["so", "one", "it", "that"],
    answerIndex: 0,
    explanation: "Do so substitutes for the previously mentioned verb phrase ‘ordered the vegetarian option’ without repeating it.",
  },
  "Which linker adds another supporting point?": {
    options: ["Moreover", "Nevertheless", "Consequently", "On the contrary"],
    answerIndex: 0,
    explanation: "Moreover adds a further supporting point; nevertheless marks concession, consequently marks result and on the contrary rejects or reverses a previous claim.",
  },
  "Look at that shelf! It ___.": {
    prompt: "Choose the form that explicitly presents a prediction based on the evidence you can see: Look at that shelf! It ___.",
    options: ["will collapse", "is going to collapse", "is collapsing every day", "has collapsed"],
    answerIndex: 1,
    explanation: "Be going to explicitly links the prediction to present evidence. Will can make a neutral prediction, but the visible evidence is the key contrast tested here.",
  },
};

const suspiciousFragments = [
  "would can",
  "can't to",
  "should to",
  "has started tomorrow",
  "starts yesterday",
  "were finishing always",
  "surprisingly person",
  "fairly little",
  "to restart only with intention",
  "restart to",
  "having restart",
  "it one",
  "that one did",
  "moreover only",
];

export function applyGrammarApplicationQuality(seed: GrammarApplicationSeed): GrammarApplicationSeed {
  const patch = qualityPatches[seed.prompt];
  return patch ? { ...seed, ...patch } : seed;
}

export function grammarApplicationQualityErrors(seed: GrammarApplicationSeed, index: number) {
  const errors: string[] = [];
  const label = `application seed ${index + 1} (${seed.conceptSlug})`;

  if (seed.kind === "multiple-choice") {
    const options = seed.options ?? [];
    const normalised = options.map((option) => option.trim().toLocaleLowerCase());
    if (new Set(normalised).size !== normalised.length) {
      errors.push(`Duplicate options in ${label}`);
    }
    for (const option of normalised) {
      const suspicious = suspiciousFragments.find((fragment) => option.includes(fragment));
      if (suspicious) errors.push(`Weak/artificial distractor '${suspicious}' in ${label}`);
    }
  }

  return errors;
}
