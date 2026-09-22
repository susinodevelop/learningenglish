import { describe, expect, it } from "vitest";
import {
  verbPatternPracticeFamilies,
  verbPatternPracticeQuestions,
  verbPatternSourceEntryCount,
} from "./verb-patterns-practice";

describe("verb patterns practice bank", () => {
  it("preserves every source family and its expected size", () => {
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

  it("creates one question per unique verb", () => {
    const allVerbs = verbPatternPracticeFamilies.flatMap((family) => family.verbs);
    const uniqueVerbs = new Set(allVerbs);

    expect(uniqueVerbs.size).toBe(108);
    expect(verbPatternPracticeQuestions).toHaveLength(108);
    expect(new Set(verbPatternPracticeQuestions.map((question) => question.id)).size).toBe(108);
    expect(new Set(verbPatternPracticeQuestions.map((question) => question.verb)).size).toBe(108);
  });

  it("assigns every verb to all and only the source families that contain it", () => {
    for (const question of verbPatternPracticeQuestions) {
      const expectedFamilies = verbPatternPracticeFamilies
        .filter((family) => family.verbs.includes(question.verb))
        .map((family) => family.id);

      expect(question.correctFamilyIds).toEqual(expectedFamilies);
      expect(question.correctFamilyIds.length).toBeGreaterThan(0);
    }
  });

  it("supports verbs with more than one correct pattern", () => {
    const ask = verbPatternPracticeQuestions.find((question) => question.verb === "ask");
    const help = verbPatternPracticeQuestions.find((question) => question.verb === "help");
    const prefer = verbPatternPracticeQuestions.find((question) => question.verb === "prefer");

    expect(ask?.correctFamilyIds).toEqual(["to-infinitive", "object-to-infinitive"]);
    expect(help?.correctFamilyIds).toEqual([
      "to-infinitive",
      "object-to-infinitive",
      "bare-infinitive",
    ]);
    expect(prefer?.correctFamilyIds).toEqual([
      "verb-ing",
      "to-infinitive",
      "object-to-infinitive",
      "both-forms",
    ]);
  });

  it("keeps single-pattern verbs with one correct classification", () => {
    const instruct = verbPatternPracticeQuestions.find((question) => question.verb === "instruct");
    expect(instruct?.correctFamilyIds).toEqual(["object-to-infinitive"]);
  });
});
