import { describe, expect, it } from "vitest";
import {
  phrasalVerbDataByTerm,
  phrasalVerbsVocabularyTopic,
} from "./data/phrasal-verbs";

describe("personal phrasal verbs source", () => {
  const entries = Object.values(phrasalVerbDataByTerm);
  const topicEntries = phrasalVerbsVocabularyTopic.sections.flatMap((section) => section.entries);

  it("keeps exactly the 96 source entries with unique terms", () => {
    expect(entries).toHaveLength(96);
    expect(new Set(entries.map((entry) => entry.term)).size).toBe(96);
    expect(topicEntries).toHaveLength(96);
    expect(new Set(topicEntries.map(([term]) => term)).size).toBe(96);
  });

  it("keeps every source field populated", () => {
    for (const entry of entries) {
      expect(entry.term.trim()).not.toBe("");
      expect(entry.meaningEn.trim()).not.toBe("");
      expect(entry.meaningEs.trim()).not.toBe("");
      expect(entry.example.trim()).not.toBe("");
      expect(entry.type.trim()).not.toBe("");
    }
  });

  it("keeps the study topic aligned with the source map", () => {
    const sourceTerms = [...entries.map((entry) => entry.term)].sort();
    const topicTerms = [...topicEntries.map(([term]) => term)].sort();
    expect(topicTerms).toEqual(sourceTerms);
  });
});
