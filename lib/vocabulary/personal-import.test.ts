import { describe, expect, it } from "vitest";
import { irregularVerbFormsByTerm } from "./data/irregular-verbs";
import { connectorContrasts } from "../grammar/connector-contrasts";
import { personalImportRows, personalLinkingTopics, personalCultureTopics } from "./data/personal-import";
import { vocabularySenses, vocabularyTopics } from "./index";
import { isIdiomSense } from "./idiom-classification";
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

  it("imports rave as a party, an enthusiastic verb and the rave reviews collocation", () => {
    const selected = ["rave_party", "rave_praise", "rave_reviews"];
    expect(selected.map((id) => personalImportRows.find((row) => row.id === id)?.term))
      .toEqual(["rave", "rave", "rave reviews"]);
    expect(personalImportRows.find((row) => row.id === "rave_party")).toMatchObject({
      type: "noun", cefr: "B2", "meaning.es": expect.stringContaining("fiesta"),
    });
    expect(personalImportRows.find((row) => row.id === "rave_praise")).toMatchObject({
      type: "verb", cefr: "C1", "relations.patterns": expect.stringContaining("rave about"),
    });
    expect(personalImportRows.find((row) => row.id === "rave_reviews")).toMatchObject({
      cefr: "C1", "relations.collocations": expect.stringContaining("rave reviews"),
    });
    for (const id of selected) {
      const row = personalImportRows.find((candidate) => candidate.id === id);
      expect(row?.["example.en"].trim()).toBeTruthy();
      expect(row?.["example.es"].trim()).toBeTruthy();
      expect(vocabularySenses.some((sense) =>
        sense.term === row?.term && sense.meaning.es === row?.["meaning.es"]
        && sense.topics.some((slug) => slug.startsWith("personal-added-")),
      )).toBe(true);
    }
  });

  it("shows personal idioms in the idioms explorer and C1 study group", () => {
    const idioms = ["practise what you preach", "into the bargain"];
    const group = systemStudyGroups.find((candidate) => candidate.id === "system-c1-idioms");
    expect(group?.kind).toBe("dynamic");
    if (!group || group.kind !== "dynamic") throw new Error("Missing C1 idioms group");
    const resolved = resolveStudyGroup(group, vocabularySenses, {});
    for (const term of idioms) {
      const sense = vocabularySenses.find((candidate) =>
        candidate.term === term && candidate.topics.some((slug) => slug.startsWith("personal-added-")),
      );
      expect(sense, term).toBeDefined();
      if (!sense) continue;
      expect(isIdiomSense(sense)).toBe(true); // same predicate used by vocabulary explorer
      expect(resolved.some((entry) => entry.senseId === sense.senseId)).toBe(true);
    }
    expect(resolved.some((sense) => sense.term === "thereby")).toBe(false);
  });

  it("lists personal linking words under Language & structure without losing the personal group", () => {
    expect(personalLinkingTopics).toHaveLength(3);
    for (const topic of personalLinkingTopics) {
      expect(topic.category).toBe("language");
      expect(vocabularyTopics.some((item) => item.slug === topic.slug)).toBe(true);
    }
    for (const term of ["thereby", "thus", "such as", "like", "therefore"]) {
      const senses = vocabularySenses.filter((sense) =>
        sense.term === term && sense.topics.some((slug) => slug.startsWith("personal-added-")),
      );
      expect(senses.length, term).toBeGreaterThan(0);
      expect(senses.every((sense) => sense.topics.some((slug) => slug.startsWith("personal-linking-"))))
        .toBe(true);
    }
    const personal = systemStudyGroups.find((candidate) => candidate.id === PERSONAL_STUDY_GROUP_ID);
    if (!personal || personal.kind !== "dynamic") throw new Error("Missing personal group");
    expect(resolveStudyGroup(personal, vocabularySenses, {})).toHaveLength(personalImportRows.length);
  });

  it("provides visible connector-guide contrasts and Cambridge patterns", () => {
    expect(connectorContrasts.map((contrast) => contrast.id))
      .toEqual(["like-such-as", "thereby-therefore"]);
    const like = connectorContrasts[0];
    const thereby = connectorContrasts[1];
    expect(like.pattern).toContain("such as");
    expect(like.examples.some((example) => example.en.includes("like yours"))).toBe(true);
    expect(like.examples.some((example) => example.en.includes("such as"))).toBe(true);
    expect(thereby.pattern).toContain("thereby + -ing");
    expect(thereby.pattern).toContain("Therefore, + clause");
    expect(thereby.examples.every((example) => example.en && example.es)).toBe(true);
  });

  it("categorises the new film-review phrases and grammar senses without duplicates", () => {
    const newIds = [
      "never_fail_to_please_critics",
      "star_in_film",
      "just_only",
      "just_fair",
      "whether_alternatives",
      "portray_character",
      "on_the_edge_of_ones_seat",
      "throughout_time",
      "throughout_place",
      "throughout_adverb",
    ];
    const rows = newIds.map((id) => personalImportRows.find((row) => row.id === id));
    expect(rows.every(Boolean)).toBe(true);
    expect(new Set(personalImportRows.map((row) => row.id)).size).toBe(personalImportRows.length);
    expect(rows.map((row) => row?.source_term)).toEqual([
      "Never fails to please critics", "it stars", "is just", "is just",
      "whether", "portraying", "on the edge of my seat",
      "throughout", "throughout", "throughout",
    ]);
    expect(personalImportRows.find((row) => row.id === "star_in_film")).toMatchObject({
      term: "star", type: "verb", "relations.patterns": expect.stringContaining("a film stars"),
    });
    expect(personalImportRows.find((row) => row.id === "portray_character")).toMatchObject({
      term: "portray", type: "verb", "relations.patterns": expect.stringContaining("portray + character"),
    });
    expect(personalImportRows.find((row) => row.id === "whether_alternatives")).toMatchObject({
      term: "whether", type: "conjunction", "relations.patterns": expect.stringContaining("whether to + infinitive"),
    });
    expect(personalImportRows.find((row) => row.id === "just_only")).toMatchObject({
      type: "adverb", "meaning.es": expect.stringContaining("simplemente"),
    });
    expect(personalImportRows.find((row) => row.id === "just_fair")).toMatchObject({
      type: "adjective", "meaning.es": expect.stringContaining("justo"),
    });
    expect(personalImportRows.find((row) => row.id === "throughout_time")).toMatchObject({
      type: "preposition", "relations.patterns": expect.stringContaining("throughout + period"),
    });
    expect(personalImportRows.find((row) => row.id === "throughout_place")).toMatchObject({
      type: "preposition", "relations.patterns": expect.stringContaining("throughout + place"),
    });
    expect(personalImportRows.find((row) => row.id === "throughout_adverb")).toMatchObject({
      type: "adverb",
    });

    const cultureTopics = new Set(personalCultureTopics.map((topic) => topic.slug));
    const linkingTopics = new Set(personalLinkingTopics.map((topic) => topic.slug));
    expect(personalCultureTopics.every((topic) => topic.category === "culture")).toBe(true);
    for (const row of rows) {
      expect(row).toBeDefined();
      if (!row) continue;
      expect(row["example.en"].trim()).toBeTruthy();
      expect(row["example.es"].trim()).toBeTruthy();
      const sense = vocabularySenses.find((candidate) =>
        candidate.term === row.term
        && candidate.meaning.es === row["meaning.es"]
        && candidate.topics.some((slug) => slug.startsWith("personal-added-")),
      );
      expect(sense, row.id).toBeDefined();
      if (!sense) continue;
      if (row.topics?.includes("film & reviews")) {
        expect(sense.topics.some((slug) => cultureTopics.has(slug)), row.id).toBe(true);
      } else if (row.topics?.includes("grammar & linking")) {
        expect(sense.topics.some((slug) => linkingTopics.has(slug)), row.id).toBe(true);
      } else {
        // "just" = fair is general vocabulary, not a linking word.
        expect(row.id).toBe("just_fair");
        expect(sense.topics.some((slug) => linkingTopics.has(slug)), row.id).toBe(false);
      }
      expect(sense.examples).toContainEqual({
        en: row["example.en"], es: row["example.es"], kind: "usage",
      });
      expect(sense.notes).toContain(row.notes);
    }

    const edge = vocabularySenses.find((sense) => sense.term === "be on the edge of one's seat");
    expect(edge).toBeDefined();
    if (edge) {
      expect(isIdiomSense(edge)).toBe(true);
      const idioms = systemStudyGroups.find((group) => group.id === "system-c1-idioms");
      if (!idioms) throw new Error("Missing C1 idioms group");
      expect(resolveStudyGroup(idioms, vocabularySenses, {})
        .some((sense) => sense.senseId === edge.senseId)).toBe(true);
    }
  });

  it("validates corrected CEFR levels and distinct senses of of and with", () => {
    expect(personalImportRows).toHaveLength(328); // 294 spreadsheet + 7 split senses + 27 October additions
    const expectedLevels: Record<string, string> = {
      get_in_enter: "B1",
      get_in_arrive: "B1",
      privacy: "B2",
      reckon_think: "B2",
    };
    for (const [id, level] of Object.entries(expectedLevels)) {
      const row = personalImportRows.find((candidate) => candidate.id === id);
      expect(row?.cefr, id).toBe(level);
      const sense = vocabularySenses.find((candidate) =>
        candidate.term === row?.term
        && candidate.meaning.es === row?.["meaning.es"]
        && candidate.topics.some((topic) => topic.startsWith("personal-added-")),
      );
      expect(sense?.levels, id).toContain(level);
    }

    const ofIds = ["of", "of_origin", "of_part", "of_contents", "of_material"];
    const withIds = ["with", "with_instrument", "with_characteristic", "with_relation"];
    expect(personalImportRows.filter((row) => row.term === "of").map((row) => row.id))
      .toEqual(ofIds);
    expect(personalImportRows.filter((row) => row.term === "with").map((row) => row.id))
      .toEqual(withIds);

    for (const id of [...ofIds, ...withIds]) {
      const row = personalImportRows.find((candidate) => candidate.id === id);
      expect(row, id).toBeDefined();
      expect(row?.topics).toBe("grammar & linking");
      expect(row?.["relations.patterns"]?.trim()).toBeTruthy();
      expect(row?.["example.en"].trim()).toBeTruthy();
      expect(row?.["example.es"].trim()).toBeTruthy();
      const sense = vocabularySenses.find((candidate) =>
        candidate.term === row?.term
        && candidate.meaning.es === row?.["meaning.es"]
        && candidate.topics.some((topic) => topic.startsWith("personal-added-")),
      );
      expect(sense, id).toBeDefined();
      expect(sense?.topics.some((topic) => topic.startsWith("personal-linking-")), id).toBe(true);
    }

    const unmade = personalImportRows.find((row) => row.id === "unmade");
    expect(unmade?.["meaning.en"]).toContain("bed");
    expect(unmade?.["meaning.es"]).toContain("cama");
    expect(personalImportRows.find((row) => row.id === "almost")?.["relations.antonyms"])
      .toBeUndefined();
    const background = personalImportRows.find((row) => row.id === "against_the_background_of");
    expect(background?.["meaning.en"]).toContain("context");
    expect(background?.["meaning.en"]).not.toContain("visual");
  });

  it("keeps related senses out of confusedWith and puts the fair just in general vocabulary", () => {
    const wrongSelfRelations = [
      "saloon_2",
      "ballerina_dancer",
      "ballerina_shoe",
      "marble_stone",
      "marble_toy",
      "room_chamber",
      "chest",
      "swing_seat",
      "swing_movement",
      "nut_fastener",
      "nut_food",
      "rave_party",
      "just_only",
      "just_fair",
      "bargain_good_buy",
      "into_the_bargain",
    ];
    for (const id of wrongSelfRelations) {
      expect(personalImportRows.find((row) => row.id === id)?.["relations.confusedWith"], id)
        .toBeUndefined();
    }
    expect(personalImportRows.find((row) => row.id === "saloon_1")?.["relations.confusedWith"])
      .toBe("salon");
    expect(personalImportRows.find((row) => row.id === "room_space")?.["relations.confusedWith"])
      .toBe("space");

    const justFair = personalImportRows.find((row) => row.id === "just_fair");
    const justOnly = personalImportRows.find((row) => row.id === "just_only");
    expect(justFair?.topics).toBe("general vocabulary");
    expect(justOnly?.topics).toBe("grammar & linking");
    const fairSense = vocabularySenses.find((sense) =>
      sense.term === "just" && sense.meaning.es === justFair?.["meaning.es"],
    );
    const onlySense = vocabularySenses.find((sense) =>
      sense.term === "just" && sense.meaning.es === justOnly?.["meaning.es"],
    );
    expect(fairSense?.topics.some((topic) => topic.startsWith("personal-linking-"))).toBe(false);
    expect(onlySense?.topics.some((topic) => topic.startsWith("personal-linking-"))).toBe(true);
    expect(fairSense?.topics.some((topic) => topic.startsWith("personal-added-"))).toBe(true);
    expect(onlySense?.topics.some((topic) => topic.startsWith("personal-added-"))).toBe(true);
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
