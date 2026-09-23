import { describe, expect, it } from "vitest";
import { personalImportRows } from "./data/personal-import";
import { vocabularySenses } from "./index";
import { PERSONAL_STUDY_GROUP_ID, resolveStudyGroup, systemStudyGroups } from "../study-groups";

describe("personal spreadsheet vocabulary", () => {
  it("imports every spreadsheet row with a real example and preserves its level", () => {
    const personalSenses = vocabularySenses.filter((sense) =>
      sense.topics.some((slug) => slug.startsWith("personal-added-")),
    );

    expect(personalImportRows).toHaveLength(294);
    expect(personalSenses).toHaveLength(294);
    expect(personalSenses.every((sense) => sense.examples.some((example) =>
      example.kind === "usage" && example.en.trim() && example.es.trim(),
    ))).toBe(true);
    expect(personalSenses.filter((sense) => sense.levels.includes("B1"))).toHaveLength(53);
  });

  it("keeps the initial group dynamic and accepts later manual additions", () => {
    const group = systemStudyGroups.find((candidate) => candidate.id === PERSONAL_STUDY_GROUP_ID);
    expect(group?.kind).toBe("dynamic");
    if (!group || group.kind !== "dynamic") throw new Error("Missing personal study group");

    const original = resolveStudyGroup(group, vocabularySenses, {});
    expect(original).toHaveLength(294);
    const outside = vocabularySenses.find((sense) => !original.includes(sense));
    expect(outside).toBeDefined();

    const extended = resolveStudyGroup({
      ...group,
      filter: { ...group.filter, includeSenseIds: [outside!.senseId] },
    }, vocabularySenses, {});
    expect(extended).toHaveLength(295);

    const withNewWord = resolveStudyGroup({
      ...group,
      filter: { ...group.filter, customWords: [{
        id: "future-word", term: "future entry", meaningEs: "entrada futura",
        definitionEn: "A word added later by the learner.",
        exampleEn: "This is a future entry.", exampleEs: "Esta es una entrada futura.", level: "C1",
      }] },
    }, vocabularySenses, {});
    expect(withNewWord).toHaveLength(295);
    expect(withNewWord.at(-1)?.examples[0].kind).toBe("usage");
  });
});
