import rows from "./personal-import.json";
import type { VocabularyEntryType, VocabularyLevel, VocabularySense, VocabularyTopic } from "../types";

type ImportedRow = {
  id: string;
  term: string;
  type: string;
  cefr: string;
  "meaning.es": string;
  "meaning.en": string;
  "example.en": string;
  "example.es": string;
  topics?: string;
  source_term?: string;
  notes?: string;
  "relations.collocations"?: string;
  "relations.patterns"?: string;
  "relations.synonyms"?: string;
  "relations.antonyms"?: string;
  "relations.confusedWith"?: string;
  "relations.wordFamily"?: string;
};

const importedRows = rows as ImportedRow[];

const extraPersonalImportRows: ImportedRow[] = [
  {
    id: "coriander",
    source_term: "coriander",
    term: "coriander",
    type: "noun",
    cefr: "B2",
    "meaning.es": "cilantro; coriandro",
    "meaning.en": "A herb whose fresh leaves and seeds are used in cooking.",
    "example.en": "Add some fresh coriander just before serving the curry.",
    "example.es": "Añade un poco de cilantro fresco justo antes de servir el curry.",
    topics: "food & cooking",
    notes: "British English normally uses coriander for the fresh leaves as well as the plant/seeds. In American English, cilantro is the usual word for the fresh leaves.",
    "relations.confusedWith": "cilantro",
  },
  {
    id: "cilantro",
    source_term: "cilantro",
    term: "cilantro",
    type: "noun",
    cefr: "B2",
    "meaning.es": "cilantro",
    "meaning.en": "The fresh leaves of the coriander plant, especially in American English.",
    "example.en": "Sprinkle chopped cilantro over the tacos before serving.",
    "example.es": "Espolvorea cilantro picado sobre los tacos antes de servirlos.",
    topics: "food & cooking",
    notes: "American English commonly uses cilantro for the fresh leaves; British English usually uses coriander.",
    "relations.confusedWith": "coriander",
  },
  {
    id: "washing_up_liquid",
    source_term: "washing up liquid",
    term: "washing-up liquid",
    type: "compound noun",
    cefr: "B1",
    "meaning.es": "jabón / detergente líquido para lavar la vajilla a mano",
    "meaning.en": "Liquid detergent used for washing plates, cups, cutlery and other dishes by hand.",
    "example.en": "We're almost out of washing-up liquid, so I'll buy another bottle.",
    "example.es": "Casi no queda detergente para lavar la vajilla, así que compraré otra botella.",
    topics: "home & places",
    notes: "British English. American English usually says dish soap or dishwashing liquid.",
    "relations.synonyms": "dish soap; dishwashing liquid",
  },
  {
    id: "thus",
    source_term: "thus",
    term: "thus",
    type: "adverb",
    cefr: "C1",
    "meaning.es": "por tanto; por consiguiente; así",
    "meaning.en": "As a result or consequence; therefore.",
    "example.en": "The roads were flooded; thus, the match had to be cancelled.",
    "example.es": "Las carreteras estaban inundadas; por tanto, hubo que cancelar el partido.",
    topics: "linking & discourse",
    "relations.synonyms": "therefore; consequently; hence",
    notes: "Formal connector. In many contexts, thus is close in meaning to therefore.",
  },
  {
    id: "drawback",
    source_term: "drawbacks",
    term: "drawback",
    type: "noun",
    cefr: "B2",
    "meaning.es": "inconveniente; desventaja",
    "meaning.en": "A disadvantage or negative feature of a situation, plan or product.",
    "example.en": "One of the main drawbacks of working from home is the lack of social contact.",
    "example.es": "Una de las principales desventajas de trabajar desde casa es la falta de contacto social.",
    topics: "general vocabulary",
    "relations.synonyms": "disadvantage; downside",
    "relations.antonyms": "advantage; benefit",
    notes: "Headword stored in the singular; drawbacks is the plural form.",
  },
  {
    id: "into_the_bargain",
    source_term: "into the bargain",
    term: "into the bargain",
    type: "idiom",
    cefr: "C1",
    "meaning.es": "además; por añadidura; incluido también como extra",
    "meaning.en": "In addition to everything else; as an extra feature, advantage or disadvantage.",
    "example.en": "The flat was spacious, well located and cheap into the bargain.",
    "example.es": "El piso era amplio, estaba bien situado y, además, era barato.",
    topics: "general vocabulary",
    notes: "Means that something is added to what has already been mentioned.",
    "relations.confusedWith": "bargain",
  },
  {
    id: "bargain_good_buy",
    source_term: "bargain",
    term: "bargain",
    type: "noun",
    cefr: "B2",
    "meaning.es": "ganga; buena compra",
    "meaning.en": "Something bought for less than the usual price or for a very good price.",
    "example.en": "I got this coat in the sale for €25 — it was a real bargain.",
    "example.es": "Compré este abrigo en rebajas por 25 €: fue una auténtica ganga.",
    topics: "shopping & money",
    "relations.collocations": "a real bargain; pick up a bargain",
    notes: "This entry covers the 'ganga' sense.",
    "relations.confusedWith": "into the bargain",
  },
];

export const personalImportRows: ImportedRow[] = [
  ...importedRows.map((row) => row.id === "bear"
    ? {
        ...row,
        notes: [
          row.notes,
          "Irregular verb forms: bear – bore – borne. For the meaning ‘tolerate/endure’, the past participle is borne; born is mainly used in the sense of birth.",
        ].filter(Boolean).join(" "),
      }
    : row),
  ...extraPersonalImportRows,
];

export const personalImportSlugs = ["personal-added-b1", "personal-added-b2", "personal-added-c1"];

export const personalImportTopics: VocabularyTopic[] = (["B1", "B2", "C1"] as VocabularyLevel[]).map((level, index) => ({
  slug: personalImportSlugs[index],
  title: "Añadido por mí",
  category: "personal",
  level,
  summary: "Vocabulario personal con acepciones, ejemplos y relaciones.",
  sourceUnit: 45 + index,
  source: "Personal spreadsheet",
  sections: [{
    title: "Vocabulario personal",
    kind: "core",
    entries: personalImportRows.filter((row) => row.cefr === level).map((row) => [
      row.term,
      row["meaning.es"],
      row.notes,
      row["meaning.en"],
      `personal-import:${row.id}`,
    ]),
  }],
}));

function list(value?: string) {
  return value?.split(";").map((item) => item.trim()).filter(Boolean) ?? [];
}

function entryType(type: string): VocabularyEntryType {
  if (type === "phrasal verb") return "phrasal-verb";
  if (type === "idiom") return "idiom";
  if (type.includes("compound") || type.includes("phrase")) return "collocation";
  return "word";
}

/** Preserve the spreadsheet's real examples and relationships after canonical compilation. */
export function enrichPersonalImport(topics: { slug: string; sections: { entries: VocabularySense[] }[] }[]) {
  for (const [index, level] of (["B1", "B2", "C1"] as VocabularyLevel[]).entries()) {
    const topic = topics.find((item) => item.slug === personalImportSlugs[index]);
    const entries = topic?.sections[0]?.entries ?? [];
    const sourceRows = personalImportRows.filter((row) => row.cefr === level);
    if (entries.length !== sourceRows.length) throw new Error(`Personal vocabulary import mismatch: ${level}`);

    for (const [position, row] of sourceRows.entries()) {
      const sense = entries[position];
      sense.meaning.en = row["meaning.en"];
      sense.members[0].meaning.en = row["meaning.en"];
      sense.examples = [{ en: row["example.en"], es: row["example.es"], kind: "usage" }];
      sense.type = entryType(row.type);
      sense.relations = {
        collocations: list(row["relations.collocations"]),
        patterns: list(row["relations.patterns"]),
        synonyms: list(row["relations.synonyms"]),
        antonyms: list(row["relations.antonyms"]),
        confusedWith: list(row["relations.confusedWith"]),
        wordFamily: list(row["relations.wordFamily"]),
      };
    }
  }
}
