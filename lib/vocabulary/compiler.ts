import { getEnglishDefinition, getVocabularyGlossKeys } from "./pedagogy";
import { glossKey } from "./pedagogy/glosses";
import type {
  VocabularyEntryType,
  VocabularyLexeme,
  VocabularyLexicalMember,
  VocabularyRelations,
  VocabularySectionKind,
  VocabularyStudyTopic,
  VocabularyTopic,
} from "./types";

const SOURCE_UNITS: Record<string, number> = {
  "geography-climate-weather": 25,
  "health-fitness": 26,
  "music-sounds": 27,
  feelings: 28,
  "history-time": 29,
  personality: 30,
  sport: 31,
  "friends-family-relationships": 32,
  "travel-transport": 33,
  "leisure-hobbies-games": 34,
  "cities-towns": 35,
  "food-art": 36,
  "tv-cinema-theatre": 37,
  "houses-homes": 38,
  "science-environment": 39,
  "books-writing": 40,
  "clothes-rooms": 41,
  "school-education": 42,
  "jobs-work": 43,
  "university-opinions": 44,
};

function normalise(value: string) {
  return value
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[’‘]/g, "'")
    .replace(/\s+/g, " ")
    .trim()
    .toLocaleLowerCase();
}

function slugPart(value: string) {
  return normalise(value)
    .replace(/\[[^\]]+\]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 62) || "entry";
}

function shortHash(value: string) {
  let hash = 2166136261;
  for (const char of value) {
    hash ^= char.charCodeAt(0);
    hash = Math.imul(hash, 16777619);
  }
  return (hash >>> 0).toString(36);
}

function inferType(kind: VocabularySectionKind, term: string): VocabularyEntryType {
  if (kind === "phrasal") return "phrasal-verb";
  if (kind === "word-family") return "word-family";
  if (kind === "chunks") return "collocation";
  if (/\s|→|↔|\//.test(term.trim())) return "expression";
  return "word";
}

function splitInParallel(
  term: string,
  meaningEs: string,
  definitionEn: string,
  delimiter: string,
): VocabularyLexicalMember[] | null {
  const terms = term.split(delimiter).map((value) => value.trim()).filter(Boolean);
  const meanings = meaningEs.split(delimiter).map((value) => value.trim()).filter(Boolean);
  const definitions = definitionEn.split(delimiter).map((value) => value.trim()).filter(Boolean);

  if (terms.length < 2 || terms.length !== meanings.length || terms.length !== definitions.length) {
    return null;
  }

  return terms.map((memberTerm, index) => ({
    term: memberTerm,
    meaning: {
      es: meanings[index],
      en: definitions[index],
    },
  }));
}

function makeMembers(
  term: string,
  meaningEs: string,
  definitionEn: string,
  kind: VocabularySectionKind,
): VocabularyLexicalMember[] {
  const arrowMembers = term.includes(" ↔ ")
    ? splitInParallel(term, meaningEs, definitionEn, " ↔ ")
    : term.includes(" → ")
      ? splitInParallel(term, meaningEs, definitionEn, " → ")
      : null;

  if (arrowMembers) return arrowMembers;

  if ((kind === "contrast" || kind === "word-family") && term.includes(" / ")) {
    const slashMembers = splitInParallel(term, meaningEs, definitionEn, " / ");
    if (slashMembers) return slashMembers;
  }

  return [{ term, meaning: { es: meaningEs, en: definitionEn } }];
}

function unique(values: string[]) {
  return Array.from(new Set(values.filter(Boolean)));
}

function emptyRelations(): VocabularyRelations {
  return {
    collocations: [],
    patterns: [],
    synonyms: [],
    antonyms: [],
    confusedWith: [],
    wordFamily: [],
  };
}

function mergeRelations(target: VocabularyRelations, incoming: VocabularyRelations) {
  target.collocations = unique([...target.collocations, ...incoming.collocations]);
  target.patterns = unique([...target.patterns, ...incoming.patterns]);
  target.synonyms = unique([...target.synonyms, ...incoming.synonyms]);
  target.antonyms = unique([...target.antonyms, ...incoming.antonyms]);
  target.confusedWith = unique([...target.confusedWith, ...incoming.confusedWith]);
  target.wordFamily = unique([...target.wordFamily, ...incoming.wordFamily]);
}

function makeRelations(
  kind: VocabularySectionKind,
  sectionTitle: string,
  term: string,
  members: VocabularyLexicalMember[],
  sectionPeerTerms: string[],
): VocabularyRelations {
  const relations = emptyRelations();
  const memberTerms = members.map((member) => member.term);
  const sectionName = sectionTitle.toLocaleLowerCase();

  if (kind === "chunks") relations.collocations.push(term);
  if (kind === "phrasal") relations.patterns.push(term);
  if (kind === "word-family") relations.wordFamily.push(...memberTerms);

  if (kind === "contrast") {
    if (members.length > 1) {
      relations.confusedWith.push(...memberTerms);
    } else if (sectionPeerTerms.length <= 6) {
      relations.confusedWith.push(...sectionPeerTerms.filter((peer) => peer !== term));
    }
  }

  if (term.includes(" ↔ ") || sectionName.includes("opposite")) {
    relations.antonyms.push(...memberTerms);
  }

  if (sectionName.includes("synonym")) {
    relations.synonyms.push(...memberTerms);
  }

  return {
    collocations: unique(relations.collocations),
    patterns: unique(relations.patterns),
    synonyms: unique(relations.synonyms),
    antonyms: unique(relations.antonyms),
    confusedWith: unique(relations.confusedWith),
    wordFamily: unique(relations.wordFamily),
  };
}

function makeSenseKey(term: string, meaningEs: string) {
  return `${normalise(term)}::${normalise(meaningEs)}`;
}

function makeLexemeId(term: string, meaningEs: string) {
  return `${slugPart(term)}-${shortHash(normalise(meaningEs))}`;
}

export function compileVocabulary(sourceTopics: VocabularyTopic[]) {
  const lexiconBySense = new Map<string, VocabularyLexeme>();
  const usedGlossKeys = new Set<string>();
  const missingDefinitions: string[] = [];

  const topics: VocabularyStudyTopic[] = sourceTopics.map((topic) => {
    const sourceUnit = SOURCE_UNITS[topic.slug];
    if (!sourceUnit) {
      throw new Error(`Missing source-unit mapping for vocabulary topic: ${topic.slug}`);
    }

    return {
      slug: topic.slug,
      title: topic.title,
      category: topic.category,
      level: topic.level,
      summary: topic.summary,
      sections: topic.sections.map((section) => {
        const sectionPeerTerms = section.entries.map(([term]) => term);

        return {
          title: section.title,
          kind: section.kind,
          entries: section.entries.map(([term, meaningEs, note]) => {
            const definitionEn = getEnglishDefinition(term, meaningEs);
            usedGlossKeys.add(glossKey(term, meaningEs));

            if (!definitionEn) {
              missingDefinitions.push(`${topic.slug} → ${section.title} → ${term} = ${meaningEs}`);
            }

            const safeDefinition = definitionEn ?? "MISSING ENGLISH DEFINITION";
            const members = makeMembers(term, meaningEs, safeDefinition, section.kind);
            const relations = makeRelations(
              section.kind,
              section.title,
              term,
              members,
              sectionPeerTerms,
            );
            const senseKey = makeSenseKey(term, meaningEs);
            const existing = lexiconBySense.get(senseKey);

            if (existing) {
              existing.topics = unique([...existing.topics, topic.slug]);
              existing.sourceUnits = Array.from(new Set([...existing.sourceUnits, sourceUnit])).sort((a, b) => a - b);
              existing.sectionKinds = Array.from(new Set([...existing.sectionKinds, section.kind]));
              existing.sectionTitles = unique([...existing.sectionTitles, section.title]);
              existing.notes = unique([...existing.notes, ...(note ? [note] : [])]);
              mergeRelations(existing.relations, relations);
              return existing;
            }

            const lexeme: VocabularyLexeme = {
              id: makeLexemeId(term, meaningEs),
              term,
              normalizedTerm: normalise(term),
              type: inferType(section.kind, term),
              cefr: "B2",
              meaning: {
                es: meaningEs,
                en: safeDefinition,
              },
              members,
              examples: [
                {
                  en: `“${term}” means ${safeDefinition}.`,
                  es: `«${term}» significa ${meaningEs}.`,
                  kind: "definition",
                },
              ],
              topics: [topic.slug],
              sourceUnits: [sourceUnit],
              sectionKinds: [section.kind],
              sectionTitles: [section.title],
              relations,
              notes: note ? [note] : [],
              provenance: {
                source: "Grammar and Vocabulary for First and First for Schools",
                lexicalSelection: "book",
                englishDefinition: "pedagogical-original",
                examples: "pedagogical-original",
              },
            };

            lexiconBySense.set(senseKey, lexeme);
            return lexeme;
          }),
        };
      }),
    };
  });

  if (missingDefinitions.length > 0) {
    throw new Error(
      `Vocabulary entries without an English definition (${missingDefinitions.length}):\n${missingDefinitions.join("\n")}`,
    );
  }

  const unusedGlosses = Array.from(getVocabularyGlossKeys()).filter((key) => !usedGlossKeys.has(key));
  if (unusedGlosses.length > 0) {
    throw new Error(
      `Pedagogical vocabulary glosses without a source entry (${unusedGlosses.length}):\n${unusedGlosses.join("\n")}`,
    );
  }

  return {
    topics,
    lexicon: Array.from(lexiconBySense.values()).sort((a, b) => a.term.localeCompare(b.term, "en")),
  };
}
