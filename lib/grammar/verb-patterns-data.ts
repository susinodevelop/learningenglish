function unique(values: readonly string[]) {
  return Array.from(new Set(values));
}

export const verbPatternSourceLists = {
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
} as const;

export const verbPatternMeaningChangeVerbs = ["remember", "forget", "regret", "stop", "try"] as const;

// Grammar Reference p.154.
export const verbPatternLittleDifferenceGrammarReferenceVerbs = [
  "attempt", "begin", "continue", "love", "prefer", "see", "start",
] as const;

// Unit 4 Language Tip also explicitly includes hate alongside start, love and prefer.
export const verbPatternLittleDifferenceUnitTipVerbs = ["start", "love", "hate", "prefer"] as const;

export const verbPatternLittleDifferenceVerbs = unique([
  ...verbPatternLittleDifferenceGrammarReferenceVerbs,
  ...verbPatternLittleDifferenceUnitTipVerbs,
]);

// Gold explicitly classifies every verb in the little-difference group as
// accepting both -ing and to-infinitive, so those two structural answers are
// also valid in classification practice.
export const verbPatternLittleDifferenceStructuralVerbs = [...verbPatternLittleDifferenceVerbs];

export const verbPatternEffectiveVerbIngVerbs = unique([
  ...verbPatternSourceLists.verbIng,
  ...verbPatternMeaningChangeVerbs,
  ...verbPatternLittleDifferenceStructuralVerbs,
]);

export const verbPatternEffectiveToInfinitiveVerbs = unique([
  ...verbPatternSourceLists.toInfinitive,
  ...verbPatternMeaningChangeVerbs,
  ...verbPatternLittleDifferenceStructuralVerbs,
]);

// Keep the Grammar Reference's bare-infinitive classification exact. Activity 6
// also uses recommend/suggest with “he work hard”, but elsewhere Gold treats
// those as clause patterns, so the exercise wording is not promoted to a
// general bare-infinitive classification here.
export const verbPatternEffectiveBareInfinitiveVerbs = [...verbPatternSourceLists.bareInfinitive];

export const verbPatternSourceEntryCount = Object.values(verbPatternSourceLists)
  .reduce((total, verbs) => total + verbs.length, 0);
