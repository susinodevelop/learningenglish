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

export const personalImportRows = rows as ImportedRow[];
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
