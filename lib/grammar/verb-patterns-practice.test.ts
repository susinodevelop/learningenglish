import { describe, expect, it } from "vitest";
import {
  verbPatternPracticeFamilies,
  verbPatternPracticeQuestions,
  verbPatternSourceEntryCount,
} from "./verb-patterns-practice";

describe("verb patterns practice bank", () => {
  it("covers every Unit 4 pattern list entry", () => {
    const counts = Object.fromEntries(
      verbPatternPracticeFamilies.map((family) => [family.id, family.verbs.length]),
    );

    expect(counts["verb-ing"]).toBe(31);
    expect(counts["object-ing"]).toBe(8);
    expect(counts["to-infinitive"]).toBe(41);
    expect(counts["object-to-infinitive"]).toBe(35);
    expect(counts["bare-infinitive"]).toBe(4);
    expect(counts["meaning-change"]).toBe(5);
    expect(counts["both-forms"]).toBe(7);
    expect(verbPatternSourceEntryCount).toBe(119);
  });

  it("keeps every family free of duplicate verb labels", () => {
    for (const family of verbPatternPracticeFamilies) {
      expect(new Set(family.verbs).size).toBe(family.verbs.length);
    }
  });

  it("creates a unique and complete exercise bank", () => {
    expect(verbPatternPracticeQuestions).toHaveLength(139);
    expect(new Set(verbPatternPracticeQuestions.map((question) => question.id)).size).toBe(139);

    for (const question of verbPatternPracticeQuestions) {
      expect(question.prompt.trim()).not.toBe("");
      expect(question.explanation.trim()).not.toBe("");
      expect(question.options).toHaveLength(4);
      expect(question.answerIndex).toBeGreaterThanOrEqual(0);
      expect(question.answerIndex).toBeLessThan(4);
    }
  });

  it("includes both meaning-changing forms for the five Cambridge trap verbs", () => {
    for (const verb of ["remember", "forget", "regret", "stop", "try"]) {
      const questions = verbPatternPracticeQuestions.filter(
        (question) => question.family === "meaning-change" && question.verb === verb,
      );
      expect(questions).toHaveLength(2);
    }
  });
});
