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

  it("explains like and such as, preach, its idiom, and the result linker thereby", () => {
    const addedIds = [
      "like_similar",
      "like_examples",
      "such_as_examples",
      "preach_religious",
      "preach_advocate",
      "practise_what_you_preach",
      "thereby",
    ];
    const added = addedIds.map((id) => personalImportRows.find((row) => row.id === id));
    expect(added.every(Boolean)).toBe(true);
    expect(new Set(addedIds).size).toBe(addedIds.length);

    const [likeSimilar, likeExamples, suchAs, preachReligious, preachAdvocate, idiom, thereby] = added;
    expect(likeSimilar).toMatchObject({ term: "like", type: "preposition", cefr: "B1" });
    expect(likeSimilar?.notes).toContain("COMPARACIÓN");
    expect(likeExamples?.notes).toContain("EJEMPLOS");
    expect(suchAs).toMatchObject({ term: "such as", cefr: "B2" });
    expect(suchAs?.notes).toContain("CONTRASTE");
    expect(likeExamples?.["relations.confusedWith"]).toBe("such as");
    expect(suchAs?.["relations.confusedWith"]).toBe("like");

    expect(preachReligious).toMatchObject({ term: "preach", type: "verb" });
    expect(preachAdvocate?.["relations.patterns"]).toContain("preach about");
    expect(idiom).toMatchObject({ term: "practise what you preach", type: "idiom", cefr: "C1" });
    expect(idiom?.notes).toContain("practice what you preach");

    expect(thereby).toMatchObject({ term: "thereby", type: "adverb", cefr: "C1" });
    expect(thereby?.["relations.patterns"]).toContain("thereby + -ing");
    expect(thereby?.notes).toContain("therefore");

    for (const row of added) {
      expect(row).toBeDefined();
      if (!row) continue;
      const sense = vocabularySenses.find((candidate) =>
        candidate.term === row.term
        && candidate.meaning.es === row["meaning.es"]
        && candidate.topics.some((slug) => slug.startsWith("personal-added-")),
      );
      expect(sense, row.id).toBeDefined();
      expect(sense?.examples).toContainEqual({
        en: row["example.en"],
        es: row["example.es"],
        kind: "usage",
      });
      expect(sense?.notes).toContain(row.notes);
      expect(sense?.levels).toContain(row.cefr);
    }
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
