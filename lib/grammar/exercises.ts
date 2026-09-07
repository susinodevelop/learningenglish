import { grammarConcepts } from "./concepts";
import { grammarQuizzes, type GrammarQuizQuestion } from "./quizzes";
import type { GrammarLevel } from "./types";

export type GrammarExerciseQuestion = GrammarQuizQuestion & {
  id: string;
  level: GrammarLevel;
  conceptSlug: string;
  conceptTitle: string;
  category: string;
  categoryLabel: string;
  sourceSlug: string;
};

export type GrammarExerciseConcept = {
  slug: string;
  title: string;
  level: string;
  category: string;
  categoryLabel: string;
  questionCount: number;
  questionCountByLevel: Record<GrammarLevel, number>;
};

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

const missingQuizSources: string[] = [];

export const grammarExerciseQuestions: GrammarExerciseQuestion[] = grammarConcepts.flatMap((concept) =>
  concept.sourceSlugs.flatMap((sourceSlug) => {
    const quizKey = quizKeyForSourceSlug(sourceSlug);
    const questions = grammarQuizzes[quizKey];

    if (!questions || questions.length === 0) {
      missingQuizSources.push(`${concept.slug} → ${sourceSlug}`);
      return [];
    }

    const level = levelForSourceSlug(sourceSlug);
    return questions.map((question, index) => ({
      ...question,
      id: `${quizKey}-${index + 1}`,
      level,
      conceptSlug: concept.slug,
      conceptTitle: concept.title,
      category: concept.category,
      categoryLabel: concept.categoryLabel,
      sourceSlug,
    }));
  }),
);

if (missingQuizSources.length > 0) {
  throw new Error(
    `Grammar concepts without canonical quiz questions (${missingQuizSources.length}):\n${missingQuizSources.join("\n")}`,
  );
}

export const grammarExerciseConcepts: GrammarExerciseConcept[] = grammarConcepts.map((concept) => {
  const questions = grammarExerciseQuestions.filter((question) => question.conceptSlug === concept.slug);
  return {
    slug: concept.slug,
    title: concept.title,
    level: concept.level,
    category: concept.category,
    categoryLabel: concept.categoryLabel,
    questionCount: questions.length,
    questionCountByLevel: {
      B2: questions.filter((question) => question.level === "B2").length,
      C1: questions.filter((question) => question.level === "C1").length,
    },
  };
});

export const grammarExerciseCount = grammarExerciseQuestions.length;
