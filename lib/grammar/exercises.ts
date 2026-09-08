import { grammarConcepts } from "./concepts";
import { grammarApplicationSeeds, type GrammarExerciseKind } from "./exercise-bank";
import {
  applyGrammarApplicationQuality,
  grammarApplicationQualityErrors,
} from "./exercise-quality";
import { grammarQuizzes } from "./quizzes";
import type { GrammarConcept, GrammarConceptSection, GrammarLevel } from "./types";

export type { GrammarExerciseKind } from "./exercise-bank";

export type GrammarExerciseQuestion = {
  id: string;
  kind: GrammarExerciseKind;
  skill: string;
  level: GrammarLevel;
  conceptSlug: string;
  conceptTitle: string;
  category: string;
  categoryLabel: string;
  sectionId: string | null;
  sectionTitle: string | null;
  sourceTopic: string | null;
  prompt: string;
  explanation: string;
  options?: string[];
  answerIndex?: number;
  acceptedAnswers?: string[];
  modelAnswer?: string;
  keyword?: string;
};

export type GrammarExerciseSection = {
  id: string;
  title: string;
  level: GrammarLevel;
  conceptSlug: string;
  conceptTitle: string;
  sourceTopic: string;
  questionCount: number;
  applicationCount: number;
};

export type GrammarExerciseConcept = {
  slug: string;
  title: string;
  level: string;
  category: string;
  categoryLabel: string;
  sectionCount: number;
  questionCount: number;
  applicationCount: number;
  questionCountByLevel: Record<GrammarLevel, number>;
};

function normalise(value: string) {
  return value
    .toLocaleLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[’‘]/g, "'")
    .replace(/[^a-z0-9']+/g, " ")
    .trim();
}

function quizKeyForSourceSlug(slug: string) {
  if (slug === "countable-uncountable-nouns-articles") {
    return "countable-and-uncountable-nouns-articles";
  }
  if (slug === "the-passive") return "passive";
  return slug;
}

function levelForSourceSlug(slug: string): GrammarLevel {
  return slug.startsWith("c1-") ? "C1" : "B2";
}

function stableHash(value: string) {
  let hash = 2166136261;
  for (const char of value) {
    hash ^= char.charCodeAt(0);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
}

function unique(values: string[]) {
  return Array.from(new Set(values.filter(Boolean)));
}

const genericFallbackOptions = [
  "Esta regla pertenece a otro contraste gramatical.",
  "Esta forma no corresponde a este subapartado.",
  "La estructura no se usa con esta función.",
];

function rotatedOptions(correct: string, distractors: string[], seed: string) {
  const alternatives = unique(
    distractors.filter((candidate) => normalise(candidate) !== normalise(correct)),
  ).slice(0, 3);

  while (alternatives.length < 3) {
    const fallback = genericFallbackOptions[alternatives.length];
    if (!alternatives.includes(fallback)) alternatives.push(fallback);
  }

  const answerIndex = stableHash(seed) % 4;
  const options = [...alternatives];
  options.splice(answerIndex, 0, correct);
  return { options, answerIndex };
}

function relatedConcepts(concept: GrammarConcept) {
  const sameCategory = grammarConcepts.filter((candidate) => candidate.category === concept.category);
  return sameCategory.length > 1 ? sameCategory : grammarConcepts;
}

function theoryRulePool(concept: GrammarConcept) {
  return unique(
    relatedConcepts(concept).flatMap((candidate) =>
      candidate.sections.flatMap((section) => section.rules),
    ),
  );
}

function theoryFormPool(concept: GrammarConcept) {
  return unique(
    relatedConcepts(concept).flatMap((candidate) =>
      candidate.sections.flatMap((section) => section.forms ?? []),
    ),
  );
}

function theoryExamplePool(concept: GrammarConcept) {
  return unique(
    relatedConcepts(concept).flatMap((candidate) =>
      candidate.sections.flatMap((section) =>
        (section.examples ?? []).map((example) => example.english),
      ),
    ),
  );
}

function theoryTrapPool(concept: GrammarConcept) {
  return unique(
    relatedConcepts(concept).flatMap((candidate) =>
      candidate.sections.flatMap((section) => section.traps ?? []),
    ),
  );
}

function makeTheoryQuestion(
  concept: GrammarConcept,
  section: GrammarConceptSection,
  idSuffix: string,
  prompt: string,
  correct: string,
  distractors: string[],
  explanation: string,
): GrammarExerciseQuestion {
  const { options, answerIndex } = rotatedOptions(correct, distractors, `${section.id}-${idSuffix}`);
  return {
    id: `theory-${section.id}-${idSuffix}`,
    kind: "multiple-choice",
    skill: "theory-check",
    level: section.level,
    conceptSlug: concept.slug,
    conceptTitle: concept.title,
    category: concept.category,
    categoryLabel: concept.categoryLabel,
    sectionId: section.id,
    sectionTitle: section.title,
    sourceTopic: section.sourceTopic,
    prompt,
    explanation,
    options,
    answerIndex,
  };
}

function makeGuidedApplicationQuestion(
  concept: GrammarConcept,
  section: GrammarConceptSection,
): GrammarExerciseQuestion {
  const example = section.examples?.[0]?.english;
  const form = section.forms?.[0];
  const rule = section.rules[0];

  let correct: string;
  let distractors: string[];
  let prompt: string;
  let explanation: string;

  if (example) {
    correct = example;
    distractors = theoryExamplePool(concept);
    prompt = `¿Qué frase aplica correctamente «${section.title}» en contexto?`;
    explanation = section.examples?.[0]?.note
      ? `La frase correcta aplica «${section.title}»: ${section.examples[0].note}.`
      : `La frase correcta es un ejemplo real del patrón explicado en «${section.title}».`;
  } else if (form) {
    correct = form;
    distractors = theoryFormPool(concept);
    prompt = `Si tuvieras que construir una frase con «${section.title}», ¿qué estructura elegirías?`;
    explanation = `Esta es una de las formas estructurales que necesitas para aplicar «${section.title}».`;
  } else {
    correct = rule;
    distractors = theoryRulePool(concept);
    prompt = `Antes de resolver una frase nueva sobre «${section.title}», ¿qué principio debes aplicar?`;
    explanation = `Este principio guía la aplicación de «${section.title}» en contexto.`;
  }

  const { options, answerIndex } = rotatedOptions(
    correct,
    distractors,
    `guided-${section.id}`,
  );

  return {
    id: `guided-${section.id}`,
    kind: "multiple-choice",
    skill: "guided-application",
    level: section.level,
    conceptSlug: concept.slug,
    conceptTitle: concept.title,
    category: concept.category,
    categoryLabel: concept.categoryLabel,
    sectionId: section.id,
    sectionTitle: section.title,
    sourceTopic: section.sourceTopic,
    prompt,
    explanation,
    options,
    answerIndex,
  };
}

function generatedQuestionsForSection(
  concept: GrammarConcept,
  section: GrammarConceptSection,
): GrammarExerciseQuestion[] {
  const questions: GrammarExerciseQuestion[] = [];
  const rulePool = theoryRulePool(concept);
  const formPool = theoryFormPool(concept);
  const examplePool = theoryExamplePool(concept);
  const trapPool = theoryTrapPool(concept);

  section.rules.forEach((rule, index) => {
    questions.push(
      makeTheoryQuestion(
        concept,
        section,
        `rule-${index + 1}`,
        index === 0
          ? `¿Qué regla describe correctamente «${section.title}»?`
          : `¿Qué afirmación también debes recordar en «${section.title}»?`,
        rule,
        rulePool,
        `La opción correcta forma parte de las reglas de «${section.title}».`,
      ),
    );
  });

  (section.examples ?? []).forEach((example, index) => {
    questions.push(
      makeTheoryQuestion(
        concept,
        section,
        `example-${index + 1}`,
        index === 0
          ? `¿Qué ejemplo pertenece a «${section.title}»?`
          : `¿Qué frase vuelve a aplicar correctamente «${section.title}»?`,
        example.english,
        examplePool,
        example.note
          ? `Este ejemplo aplica «${section.title}»: ${example.note}.`
          : `Este ejemplo aplica el patrón explicado en «${section.title}».`,
      ),
    );
  });

  (section.forms ?? []).forEach((form, index) => {
    questions.push(
      makeTheoryQuestion(
        concept,
        section,
        `form-${index + 1}`,
        index === 0
          ? `¿Qué forma corresponde a «${section.title}»?`
          : `¿Qué otra estructura pertenece a «${section.title}»?`,
        form,
        formPool,
        `Esta forma estructural está asociada a «${section.title}».`,
      ),
    );
  });

  (section.traps ?? []).forEach((trap, index) => {
    questions.push(
      makeTheoryQuestion(
        concept,
        section,
        `trap-${index + 1}`,
        `¿Qué trampa o advertencia es correcta en «${section.title}»?`,
        trap,
        trapPool.length > 3 ? trapPool : rulePool,
        `Esta advertencia evita uno de los errores típicos del subapartado «${section.title}».`,
      ),
    );
  });

  const reinforcementSources = [
    ...section.rules.map((value) => ({ type: "regla", value, pool: rulePool })),
    ...(section.examples ?? []).map((entry) => ({ type: "ejemplo", value: entry.english, pool: examplePool })),
    ...(section.forms ?? []).map((value) => ({ type: "forma", value, pool: formPool })),
    ...(section.traps ?? []).map((value) => ({
      type: "trampa",
      value,
      pool: trapPool.length > 3 ? trapPool : rulePool,
    })),
  ];

  if (reinforcementSources.length === 0) {
    throw new Error(`Grammar subsection without usable theory: ${concept.slug} → ${section.title}`);
  }

  const reinforcementPrompts = [
    "Selecciona la opción que sí pertenece a este subapartado.",
    "Si estuvieras repasando esta regla, ¿qué opción deberías conservar?",
    "¿Qué opción es coherente con la teoría de este subapartado?",
    "Identifica la opción correcta antes de aplicar la estructura en una frase.",
    "¿Qué elemento forma parte de la decisión gramatical de este subapartado?",
    "Elige la opción que encaja con lo explicado en esta sección.",
    "¿Qué opción usarías como recordatorio correcto de esta regla?",
    "Selecciona el dato gramatical que corresponde a esta sección.",
  ];

  let reinforcementIndex = 0;
  while (questions.length < 8) {
    const source = reinforcementSources[reinforcementIndex % reinforcementSources.length];
    const prompt = reinforcementPrompts[reinforcementIndex % reinforcementPrompts.length];
    questions.push(
      makeTheoryQuestion(
        concept,
        section,
        `reinforce-${reinforcementIndex + 1}`,
        `${prompt} «${section.title}»`,
        source.value,
        source.pool,
        `La respuesta correcta recupera una ${source.type} real de «${section.title}».`,
      ),
    );
    reinforcementIndex += 1;
  }

  return questions;
}

const sectionSearchStopWords = new Set([
  "the", "and", "with", "that", "this", "from", "into", "have", "has", "had", "been",
  "what", "which", "when", "where", "your", "you", "they", "their", "there", "than", "then",
  "complete", "choose", "correct", "sentence", "rewrite", "using", "form", "best", "option",
  "una", "para", "que", "con", "del", "las", "los", "por", "como",
]);

function meaningfulTokens(value: string) {
  return normalise(value)
    .split(" ")
    .filter((token) => token.length >= 3 && !sectionSearchStopWords.has(token));
}

function sectionSearchCorpus(section: GrammarConceptSection) {
  return normalise([
    section.title,
    ...section.rules,
    ...(section.forms ?? []),
    ...(section.examples ?? []).map((entry) => `${entry.english} ${entry.note ?? ""}`),
    ...(section.traps ?? []),
  ].join(" "));
}

function closestSection(
  concept: GrammarConcept,
  hint: string | undefined,
  level: GrammarLevel,
  context: string,
) {
  if (!hint) return null;
  const wanted = normalise(hint);
  const sameLevel = concept.sections.filter((section) => section.level === level);
  const candidates = sameLevel.length > 0 ? sameLevel : concept.sections;

  const direct = candidates.find((section) => {
    const title = normalise(section.title);
    return title === wanted || title.includes(wanted) || wanted.includes(title);
  });
  if (direct) return direct;

  const tokens = unique(meaningfulTokens(`${hint} ${context}`));
  const scored = candidates
    .map((section) => {
      const title = normalise(section.title);
      const corpus = sectionSearchCorpus(section);
      const score = tokens.reduce((total, token) => {
        if (title.includes(token)) return total + 5;
        if (corpus.includes(token)) return total + 1;
        return total;
      }, 0);
      return { section, score };
    })
    .sort((a, b) => b.score - a.score);

  return scored[0]?.score > 0 ? scored[0].section : null;
}

const missingQuizSources: string[] = [];

const canonicalQuizQuestions: GrammarExerciseQuestion[] = grammarConcepts.flatMap((concept) =>
  concept.sourceSlugs.flatMap((sourceSlug) => {
    const quizKey = quizKeyForSourceSlug(sourceSlug);
    const questions = grammarQuizzes[quizKey];

    if (!questions || questions.length === 0) {
      missingQuizSources.push(`${concept.slug} → ${sourceSlug}`);
      return [];
    }

    const level = levelForSourceSlug(sourceSlug);
    return questions.map((question, index) => ({
      id: `canonical-${quizKey}-${index + 1}`,
      kind: "multiple-choice" as const,
      skill: "canonical-quiz",
      level,
      conceptSlug: concept.slug,
      conceptTitle: concept.title,
      category: concept.category,
      categoryLabel: concept.categoryLabel,
      sectionId: null,
      sectionTitle: null,
      sourceTopic: sourceSlug,
      prompt: question.prompt,
      explanation: question.explanation,
      options: question.options,
      answerIndex: question.answer,
    }));
  }),
);

if (missingQuizSources.length > 0) {
  throw new Error(
    `Grammar concepts without canonical quiz questions (${missingQuizSources.length}):\n${missingQuizSources.join("\n")}`,
  );
}

const generatedSectionQuestions = grammarConcepts.flatMap((concept) =>
  concept.sections.flatMap((section) => generatedQuestionsForSection(concept, section)),
);

const guidedApplicationQuestions = grammarConcepts.flatMap((concept) =>
  concept.sections.map((section) => makeGuidedApplicationQuestion(concept, section)),
);

const unresolvedApplicationSections: string[] = [];
const qualityApplicationSeeds = grammarApplicationSeeds.map(applyGrammarApplicationQuality);

const manualApplicationQuestions: GrammarExerciseQuestion[] = qualityApplicationSeeds.map((seed, index) => {
  const concept = grammarConcepts.find((candidate) => candidate.slug === seed.conceptSlug);
  if (!concept) throw new Error(`Grammar application seed references unknown concept: ${seed.conceptSlug}`);

  const section = closestSection(
    concept,
    seed.sectionHint,
    seed.level,
    `${seed.prompt} ${seed.explanation} ${seed.keyword ?? ""}`,
  );
  if (seed.sectionHint && !section) {
    unresolvedApplicationSections.push(
      `${seed.conceptSlug} · ${seed.level} · ${seed.sectionHint} · ${seed.prompt}`,
    );
  }

  return {
    id: `application-${seed.conceptSlug}-${String(index + 1).padStart(3, "0")}`,
    kind: seed.kind,
    skill: seed.skill,
    level: seed.level,
    conceptSlug: concept.slug,
    conceptTitle: concept.title,
    category: concept.category,
    categoryLabel: concept.categoryLabel,
    sectionId: section?.id ?? null,
    sectionTitle: section?.title ?? seed.sectionHint ?? null,
    sourceTopic: section?.sourceTopic ?? null,
    prompt: seed.prompt,
    explanation: seed.explanation,
    options: seed.options,
    answerIndex: seed.answerIndex,
    acceptedAnswers: seed.acceptedAnswers,
    modelAnswer: seed.modelAnswer,
    keyword: seed.keyword,
  };
});

const applicationQuestions: GrammarExerciseQuestion[] = [
  ...manualApplicationQuestions,
  ...guidedApplicationQuestions,
];

export const grammarExerciseQuestions: GrammarExerciseQuestion[] = [
  ...applicationQuestions,
  ...canonicalQuizQuestions,
  ...generatedSectionQuestions,
];

const validationErrors: string[] = [];
const ids = new Set<string>();
const applicationPromptKeys = new Set<string>();

qualityApplicationSeeds.forEach((seed, index) => {
  validationErrors.push(...grammarApplicationQualityErrors(seed, index));
  const promptKey = `${seed.conceptSlug}::${normalise(seed.prompt)}`;
  if (applicationPromptKeys.has(promptKey)) {
    validationErrors.push(`Duplicate application prompt: ${seed.conceptSlug} → ${seed.prompt}`);
  }
  applicationPromptKeys.add(promptKey);
});

if (unresolvedApplicationSections.length > 0) {
  validationErrors.push(
    `Application exercises without a resolved theory subsection (${unresolvedApplicationSections.length}):\n${unresolvedApplicationSections.join("\n")}`,
  );
}

for (const question of grammarExerciseQuestions) {
  if (ids.has(question.id)) validationErrors.push(`Duplicate exercise id: ${question.id}`);
  ids.add(question.id);

  if (!question.prompt.trim() || !question.explanation.trim()) {
    validationErrors.push(`Incomplete exercise: ${question.id}`);
  }

  if (question.kind === "multiple-choice") {
    if (!question.options || question.options.length < 2 || question.answerIndex === undefined) {
      validationErrors.push(`Malformed multiple-choice exercise: ${question.id}`);
    } else if (question.answerIndex < 0 || question.answerIndex >= question.options.length) {
      validationErrors.push(`Invalid answer index: ${question.id}`);
    }

    if (question.options?.some((option) => genericFallbackOptions.includes(option))) {
      validationErrors.push(`Generic theory distractor leaked into ${question.id}`);
    }
  } else if (!question.acceptedAnswers?.length || !question.modelAnswer) {
    validationErrors.push(`Typed exercise without accepted/model answer: ${question.id}`);
  }
}

for (const concept of grammarConcepts) {
  const conceptQuestions = grammarExerciseQuestions.filter((question) => question.conceptSlug === concept.slug);
  const conceptManualApplications = manualApplicationQuestions.filter((question) => question.conceptSlug === concept.slug);

  if (conceptQuestions.length < 10) {
    validationErrors.push(`Concept has fewer than 10 exercises: ${concept.slug} (${conceptQuestions.length})`);
  }
  if (conceptManualApplications.length < 4) {
    validationErrors.push(
      `Concept has fewer than 4 hand-authored application exercises: ${concept.slug} (${conceptManualApplications.length})`,
    );
  }

  for (const section of concept.sections) {
    const sectionQuestions = grammarExerciseQuestions.filter((question) => question.sectionId === section.id);
    const sectionApplications = applicationQuestions.filter((question) => question.sectionId === section.id);

    if (sectionQuestions.length < 9) {
      validationErrors.push(
        `Theory subsection has fewer than 9 exercises: ${concept.slug} → ${section.title} (${sectionQuestions.length})`,
      );
    }
    if (sectionApplications.length < 1) {
      validationErrors.push(
        `Theory subsection has no application exercise: ${concept.slug} → ${section.title}`,
      );
    }
  }
}

if (manualApplicationQuestions.length < 130) {
  validationErrors.push(`Hand-authored application bank is unexpectedly small: ${manualApplicationQuestions.length} exercises`);
}

if (grammarExerciseQuestions.length < 700) {
  validationErrors.push(`Grammar bank is unexpectedly small: ${grammarExerciseQuestions.length} exercises`);
}

if (validationErrors.length > 0) {
  throw new Error(`Grammar exercise bank validation failed:\n${validationErrors.join("\n")}`);
}

export const grammarExerciseSections: GrammarExerciseSection[] = grammarConcepts.flatMap((concept) =>
  concept.sections.map((section) => ({
    id: section.id,
    title: section.title,
    level: section.level,
    conceptSlug: concept.slug,
    conceptTitle: concept.title,
    sourceTopic: section.sourceTopic,
    questionCount: grammarExerciseQuestions.filter((question) => question.sectionId === section.id).length,
    applicationCount: applicationQuestions.filter((question) => question.sectionId === section.id).length,
  })),
);

export const grammarExerciseConcepts: GrammarExerciseConcept[] = grammarConcepts.map((concept) => {
  const questions = grammarExerciseQuestions.filter((question) => question.conceptSlug === concept.slug);
  const applications = applicationQuestions.filter((question) => question.conceptSlug === concept.slug);
  return {
    slug: concept.slug,
    title: concept.title,
    level: concept.level,
    category: concept.category,
    categoryLabel: concept.categoryLabel,
    sectionCount: concept.sections.length,
    questionCount: questions.length,
    applicationCount: applications.length,
    questionCountByLevel: {
      B2: questions.filter((question) => question.level === "B2").length,
      C1: questions.filter((question) => question.level === "C1").length,
    },
  };
});

export const grammarExerciseCount = grammarExerciseQuestions.length;
export const grammarExerciseApplicationCount = applicationQuestions.length;
export const grammarExerciseManualApplicationCount = manualApplicationQuestions.length;
export const grammarExerciseGuidedApplicationCount = guidedApplicationQuestions.length;
export const grammarExerciseTheoryCheckCount = generatedSectionQuestions.length;
