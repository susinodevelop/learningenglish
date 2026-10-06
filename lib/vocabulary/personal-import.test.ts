import { describe, expect, it } from "vitest";
import { irregularVerbFormsByTerm } from "./data/irregular-verbs";
import { personalImportRows } from "./data/personal-import";
import { vocabularySenses } from "./index";
import { PERSONAL_STUDY_GROUP_ID, resolveStudyGroup, systemStudyGroups } from "../study-groups";

describe("personal vocabulary", () => {
  it("imports every personal row with a real example and preserves its level", () => {
    const personalSenses = vocabularySenses.filter((sense) =>
      sense.topics.some((slug) => slug.startsWith("personal-added-")),
    );
    const expectedB1Rows = personalImportRows.filter((row) => row.cefr === "B1").length;

    expect(personalSenses).toHaveLength(personalImportRows.length);
    expect(personalSenses.every((sense) => sense.examples.some((example) =>
      example.kind === "usage" && example.en.trim() && example.es.trim(),
    ))).toBe(true);
    expect(personalSenses.filter((sense) => sense.levels.includes("B1"))).toHaveLength(expectedB1Rows);
    expect(personalSenses.every((sense) => sense.provenance.sources.includes("Personal vocabulary"))).toBe(true);
    expect(personalSenses.every((sense) => sense.provenance.lexicalSelection !== "book")).toBe(true);
  });

  it("includes the latest manually added vocabulary without duplicating existing imports", () => {
    expect(personalImportRows.filter((row) => row.term === "turmeric")).toHaveLength(1);
    expect(personalImportRows.filter((row) => row.term === "colander")).toHaveLength(1);
    expect(personalImportRows.filter((row) => row.term === "sieve")).toHaveLength(1);

    expect(personalImportRows).toEqual(expect.arrayContaining([
      expect.objectContaining({ term: "coriander" }),
      expect.objectContaining({ term: "cilantro" }),
      expect.objectContaining({ term: "washing-up liquid" }),
      expect.objectContaining({ term: "thus", "relations.synonyms": expect.stringContaining("therefore") }),
      expect.objectContaining({ term: "drawback", "relations.synonyms": expect.stringContaining("disadvantage") }),
      expect.objectContaining({ term: "into the bargain", type: "idiom" }),
      expect.objectContaining({ term: "bargain", "meaning.es": expect.stringContaining("ganga") }),
      expect.objectContaining({ term: "bear", notes: expect.stringContaining("bear – bore – borne") }),
    ]));
    expect(irregularVerbFormsByTerm.bear).toMatchObject({
      base: "bear",
      pastSimple: "bore",
      pastParticiple: "borne",
    });
  });

  it("keeps the initial group dynamic and accepts later manual additions", () => {
    const group = systemStudyGroups.find((candidate) => candidate.id === PERSONAL_STUDY_GROUP_ID);
    expect(group?.kind).toBe("dynamic");
    if (!group || group.kind !== "dynamic") throw new Error("Missing personal study group");

    const original = resolveStudyGroup(group, vocabularySenses, {});
    expect(original).toHaveLength(personalImportRows.length);
    const outside = vocabularySenses.find((sense) => !original.includes(sense));
    expect(outside).toBeDefined();

    const extended = resolveStudyGroup({
      ...group,
      filter: { ...group.filter, includeSenseIds: [outside!.senseId] },
    }, vocabularySenses, {});
    expect(extended).toHaveLength(original.length + 1);

    const withNewWord = resolveStudyGroup({
      ...group,
      filter: { ...group.filter, customWords: [{
        id: "future-word", term: "future entry", meaningEs: "entrada futura",
        definitionEn: "A word added later by the learner.",
        exampleEn: "This is a future entry.", exampleEs: "Esta es una entrada futura.", level: "C1",
      }] },
    }, vocabularySenses, {});
    expect(withNewWord).toHaveLength(original.length + 1);
    expect(withNewWord.at(-1)?.examples[0].kind).toBe("usage");
  });
});
