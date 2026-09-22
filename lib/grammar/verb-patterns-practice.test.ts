import { describe, expect, it } from "vitest";
import {
  verbPatternEffectiveToInfinitiveVerbs,
  verbPatternEffectiveVerbIngVerbs,
  verbPatternLittleDifferenceGrammarReferenceVerbs,
  verbPatternLittleDifferenceUnitTipVerbs,
  verbPatternLittleDifferenceVerbs,
  verbPatternMeaningChangeVerbs,
  verbPatternSourceEntryCount,
  verbPatternSourceLists,
} from "./verb-patterns-data";
import {
  verbPatternPracticeFamilies,
  verbPatternPracticeQuestions,
} from "./verb-patterns-practice";

const expectedSourceLists = {
  verbIng: [
    "admit", "appreciate", "avoid", "consider", "delay", "deny", "detest", "dislike",
    "enjoy", "escape", "face", "feel like", "finish", "forgive", "give up", "imagine",
    "involve", "keep", "mention", "mind", "miss", "postpone", "practise", "prefer",
    "put off", "recommend", "regret", "resent", "risk", "suggest", "understand",
  ],
  objectIng: ["discover", "forbid", "notice", "observe", "overhear", "prevent"],
  toInfinitive: [
    "afford", "agree", "appear", "arrange", "ask", "attempt", "bear", "begin", "care",
    "choose", "consent", "decide", "determine", "expect", "fail", "forget", "happen",
    "hate", "help", "hesitate", "hope", "intend", "learn", "like", "love", "manage",
    "mean", "offer", "prefer", "prepare", "pretend", "promise", "propose", "refuse",
    "remember", "seem", "start", "swear", "try", "want", "wish",
  ],
  objectToInfinitive: [
    "advise", "allow", "ask", "cause", "command", "encourage", "expect", "forbid", "force",
    "get", "hate", "help", "instruct", "intend", "invite", "leave", "like", "mean", "need",
    "oblige", "order", "permit", "persuade", "prefer", "press", "recommend", "remind",
    "request", "teach", "tell", "tempt", "trouble", "want", "warn", "wish",
  ],
  bareInfinitive: ["let", "make", "hear", "help"],
};

function questionFor(verb: string) {
  return verbPatternPracticeQuestions.find((question) => question.verb === verb);
}

describe("verb patterns practice bank", () => {
  it("preserves every structural source list exactly", () => {
    expect(verbPatternSourceLists).toEqual(expectedSourceLists);
    expect(verbPatternSourceEntryCount).toBe(117);
  });

  it("preserves both special -ing/to classifications from the Gold source", () => {
    expect(verbPatternMeaningChangeVerbs).toEqual(["remember", "forget", "regret", "stop", "try"]);
    expect(verbPatternLittleDifferenceGrammarReferenceVerbs).toEqual([
      "attempt", "begin", "continue", "love", "prefer", "see", "start",
    ]);
    expect(verbPatternLittleDifferenceUnitTipVerbs).toEqual(["start", "love", "hate", "prefer"]);
    expect(verbPatternLittleDifferenceVerbs).toEqual([
      "attempt", "begin", "continue", "love", "prefer", "see", "start", "hate",
    ]);
  });

  it("expands the two structural answers implied by the special groups", () => {
    const allSpecialVerbs = [...verbPatternMeaningChangeVerbs, ...verbPatternLittleDifferenceVerbs];

    for (const verb of allSpecialVerbs) {
      expect(verbPatternEffectiveVerbIngVerbs).toContain(verb);
      expect(verbPatternEffectiveToInfinitiveVerbs).toContain(verb);
    }

    expect(verbPatternEffectiveVerbIngVerbs).toHaveLength(42);
    expect(verbPatternEffectiveToInfinitiveVerbs).toHaveLength(45);
  });

  it("keeps every practice family free of duplicate verb labels", () => {
    for (const family of verbPatternPracticeFamilies) {
      expect(new Set(family.verbs).size).toBe(family.verbs.length);
    }
  });

  it("creates one question per unique verb", () => {
    const allVerbs = verbPatternPracticeFamilies.flatMap((family) => family.verbs);
    const uniqueVerbs = new Set(allVerbs);

    expect(uniqueVerbs.size).toBe(106);
    expect(verbPatternPracticeQuestions).toHaveLength(106);
    expect(new Set(verbPatternPracticeQuestions.map((question) => question.id)).size).toBe(106);
    expect(new Set(verbPatternPracticeQuestions.map((question) => question.verb)).size).toBe(106);
  });

  it("assigns every verb to all and only the practice families that contain it", () => {
    for (const question of verbPatternPracticeQuestions) {
      const expectedFamilies = verbPatternPracticeFamilies
        .filter((family) => family.verbs.includes(question.verb))
        .map((family) => family.id);

      expect(question.correctFamilyIds).toEqual(expectedFamilies);
      expect(question.correctFamilyIds.length).toBeGreaterThan(0);
    }
  });

  it("keeps ordinary multiple-pattern verbs complete", () => {
    expect(questionFor("ask")?.correctFamilyIds).toEqual(["to-infinitive", "object-to-infinitive"]);
    expect(questionFor("help")?.correctFamilyIds).toEqual([
      "to-infinitive",
      "object-to-infinitive",
      "bare-infinitive",
    ]);
    expect(questionFor("prefer")?.correctFamilyIds).toEqual([
      "verb-ing",
      "to-infinitive",
      "object-to-infinitive",
      "both-forms",
    ]);
  });

  it("marks all structural answers for different-meaning verbs", () => {
    expect(questionFor("stop")?.correctFamilyIds).toEqual([
      "verb-ing",
      "to-infinitive",
      "meaning-change",
    ]);
    expect(questionFor("remember")?.correctFamilyIds).toEqual([
      "verb-ing",
      "to-infinitive",
      "meaning-change",
    ]);
    expect(questionFor("regret")?.correctFamilyIds).toEqual([
      "verb-ing",
      "to-infinitive",
      "meaning-change",
    ]);
  });

  it("marks all structural answers for little-difference verbs, including hate", () => {
    expect(questionFor("continue")?.correctFamilyIds).toEqual([
      "verb-ing",
      "to-infinitive",
      "both-forms",
    ]);
    expect(questionFor("hate")?.correctFamilyIds).toEqual([
      "verb-ing",
      "to-infinitive",
      "object-to-infinitive",
      "both-forms",
    ]);
  });

  it("keeps single-pattern verbs with one correct classification", () => {
    expect(questionFor("instruct")?.correctFamilyIds).toEqual(["object-to-infinitive"]);
  });
});
