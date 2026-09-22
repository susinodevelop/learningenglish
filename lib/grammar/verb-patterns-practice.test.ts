import { describe, expect, it } from "vitest";
import {
  verbPatternEffectiveBareInfinitiveVerbs,
  verbPatternEffectiveToInfinitiveVerbs,
  verbPatternEffectiveVerbIngVerbs,
  verbPatternLittleDifferenceGrammarReferenceVerbs,
  verbPatternLittleDifferenceStructuralVerbs,
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
  it("preserves every structural Grammar Reference list exactly", () => {
    expect(verbPatternSourceLists).toEqual(expectedSourceLists);
    expect(verbPatternSourceEntryCount).toBe(117);
  });

  it("keeps the bare-infinitive family aligned with the Grammar Reference", () => {
    expect(verbPatternEffectiveBareInfinitiveVerbs).toEqual(["let", "make", "hear", "help"]);
    expect(verbPatternEffectiveBareInfinitiveVerbs).not.toContain("recommend");
    expect(verbPatternEffectiveBareInfinitiveVerbs).not.toContain("suggest");
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

  it("expands structural answers only where Unit 4 supports the inference", () => {
    for (const verb of verbPatternMeaningChangeVerbs) {
      expect(verbPatternEffectiveVerbIngVerbs).toContain(verb);
      expect(verbPatternEffectiveToInfinitiveVerbs).toContain(verb);
    }

    expect(verbPatternLittleDifferenceStructuralVerbs).toEqual([
      "attempt", "begin", "continue", "love", "prefer", "start", "hate",
    ]);

    for (const verb of verbPatternLittleDifferenceStructuralVerbs) {
      expect(verbPatternEffectiveVerbIngVerbs).toContain(verb);
      expect(verbPatternEffectiveToInfinitiveVerbs).toContain(verb);
    }

    expect(verbPatternEffectiveVerbIngVerbs).not.toContain("see");
    expect(verbPatternEffectiveToInfinitiveVerbs).not.toContain("see");
    expect(verbPatternEffectiveVerbIngVerbs).toHaveLength(41);
    expect(verbPatternEffectiveToInfinitiveVerbs).toHaveLength(44);
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

  it("assigns every verb to all and only the Unit 4 families that contain it", () => {
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

  it("does not promote Activity 6 recommend/suggest wording to the bare-infinitive family", () => {
    expect(questionFor("recommend")?.correctFamilyIds).toEqual([
      "verb-ing",
      "object-to-infinitive",
    ]);
    expect(questionFor("suggest")?.correctFamilyIds).toEqual(["verb-ing"]);
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

  it("marks structural answers for supported little-difference verbs, including hate", () => {
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

  it("keeps see only in Gold's little-difference group without inferring structural families", () => {
    expect(questionFor("see")?.correctFamilyIds).toEqual(["both-forms"]);
  });

  it("keeps single-pattern verbs with one correct classification", () => {
    expect(questionFor("instruct")?.correctFamilyIds).toEqual(["object-to-infinitive"]);
  });
});
