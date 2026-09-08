import type { VocabularySense } from "./types";
import { normaliseVocabularyText } from "./compiler";

export type VocabularyMultipleChoiceDirection =
  | "definition-to-word"
  | "spanish-to-word"
  | "word-to-spanish"
  | "word-to-definition";

export type VocabularyDifficulty = "easy" | "medium" | "hard";

export type VocabularyMultipleChoiceQuestion = {
  senseId: string;
  direction: VocabularyMultipleChoiceDirection;
  difficulty: VocabularyDifficulty;
  label: string;
  prompt: string;
  context?: string;
  answer: string;
  options: string[];
};

function hash(value: string) {
  let result = 2166136261;
  for (const char of value) {
    result ^= char.charCodeAt(0);
    result = Math.imul(result, 16777619);
  }
  return result >>> 0;
}

function deterministicTieBreak(seed: string, senseId: string) {
  return hash(`${seed}|${senseId}`) / 0xffffffff;
}

function unique(values: string[]) {
  return Array.from(new Set(values.filter(Boolean)));
}

function optionValue(sense: VocabularySense, direction: VocabularyMultipleChoiceDirection) {
  switch (direction) {
    case "definition-to-word":
    case "spanish-to-word":
      return sense.term;
    case "word-to-spanish":
      return sense.meaning.es;
    case "word-to-definition":
      return sense.meaning.en;
  }
}

function promptValue(sense: VocabularySense, direction: VocabularyMultipleChoiceDirection) {
  switch (direction) {
    case "definition-to-word":
      return sense.meaning.en;
    case "spanish-to-word":
      return sense.meaning.es;
    case "word-to-spanish":
    case "word-to-definition":
      return sense.term;
  }
}

function questionLabel(direction: VocabularyMultipleChoiceDirection) {
  switch (direction) {
    case "definition-to-word": return "Definition → word";
    case "spanish-to-word": return "ES → EN";
    case "word-to-spanish": return "EN → ES";
    case "word-to-definition": return "Word → definition";
  }
}

function sharesAny(a: string[], b: string[]) {
  const bSet = new Set(b);
  return a.some((value) => bSet.has(value));
}

function relatedTermSet(sense: VocabularySense, key: "confusedWith" | "synonyms") {
  return new Set(sense.relations[key].map(normaliseVocabularyText));
}

function candidateScore(
  current: VocabularySense,
  candidate: VocabularySense,
  difficulty: VocabularyDifficulty,
  seed: string,
) {
  const sharedTopic = sharesAny(current.topics, candidate.topics);
  const sharedLevel = sharesAny(current.levels, candidate.levels);
  const sameType = current.type === candidate.type;
  const confused = relatedTermSet(current, "confusedWith").has(candidate.normalizedTerm);

  let score = deterministicTieBreak(seed, candidate.senseId);

  if (difficulty === "hard") {
    if (confused) score += 100;
    if (sharedTopic) score += 35;
    if (sameType) score += 20;
    if (sharedLevel) score += 10;
  } else if (difficulty === "medium") {
    if (sharedTopic) score += 40;
    if (sameType) score += 25;
    if (sharedLevel) score += 15;
  } else {
    if (sharedLevel) score += 5;
    if (!sharedTopic) score += 8;
    if (!sameType) score += 4;
  }

  return score;
}

function polysemyContext(current: VocabularySense, lexicon: VocabularySense[]) {
  const sameTerm = lexicon.filter((entry) => entry.normalizedTerm === current.normalizedTerm);
  if (sameTerm.length < 2) return undefined;

  const section = current.sectionTitles[0];
  const topic = current.topics[0];
  const levels = current.levels.join(" · ");
  return [levels, topic, section].filter(Boolean).join(" · ");
}

export function selectVocabularyDistractors({
  current,
  lexicon,
  direction,
  difficulty,
  count = 3,
  seed = current.senseId,
}: {
  current: VocabularySense;
  lexicon: VocabularySense[];
  direction: VocabularyMultipleChoiceDirection;
  difficulty: VocabularyDifficulty;
  count?: number;
  seed?: string;
}) {
  const answer = optionValue(current, direction);
  const answerNormalised = normaliseVocabularyText(answer);
  const explicitSynonyms = relatedTermSet(current, "synonyms");

  const ranked = lexicon
    .filter((candidate) => candidate.senseId !== current.senseId)
    .filter((candidate) => {
      const option = optionValue(candidate, direction);
      if (!option) return false;
      if (normaliseVocabularyText(option) === answerNormalised) return false;
      // Explicit synonyms are intentionally excluded: they can create two semantically valid answers.
      if (
        (direction === "definition-to-word" || direction === "spanish-to-word") &&
        explicitSynonyms.has(candidate.normalizedTerm)
      ) return false;
      return true;
    })
    .map((candidate) => ({
      candidate,
      option: optionValue(candidate, direction),
      score: candidateScore(current, candidate, difficulty, seed),
    }))
    .sort((a, b) => b.score - a.score);

  const options: string[] = [];
  for (const item of ranked) {
    if (options.some((value) => normaliseVocabularyText(value) === normaliseVocabularyText(item.option))) continue;
    options.push(item.option);
    if (options.length === count) break;
  }

  return options;
}

export function generateVocabularyMultipleChoiceQuestion({
  current,
  lexicon,
  direction,
  difficulty,
  seed,
}: {
  current: VocabularySense;
  lexicon: VocabularySense[];
  direction: VocabularyMultipleChoiceDirection;
  difficulty: VocabularyDifficulty;
  seed?: string;
}): VocabularyMultipleChoiceQuestion | null {
  const answer = optionValue(current, direction);
  const distractors = selectVocabularyDistractors({
    current,
    lexicon,
    direction,
    difficulty,
    seed,
  });

  if (distractors.length < 3) return null;

  const options = unique([answer, ...distractors]);
    if (options.length !== 4) return null;

  options.sort((a, b) => hash(`${seed ?? current.senseId}|${a}`) - hash(`${seed ?? current.senseId}|${b}`));

  return {
    senseId: current.senseId,
    direction,
    difficulty,
    label: questionLabel(direction),
    prompt: promptValue(current, direction),
    context: (direction === "word-to-spanish" || direction === "word-to-definition")
      ? polysemyContext(current, lexicon)
      : undefined,
    answer,
    options,
  };
}

export function normaliseVocabularyAnswer(value: string) {
  return normaliseVocabularyText(value);
}
