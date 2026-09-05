import { cultureGlosses } from "./culture-glosses";
import { makeGlossMap, glossKey } from "./glosses";
import { peopleGlosses } from "./people-glosses";
import { placesGlosses } from "./places-glosses";
import { studyWorkGlosses } from "./study-work-glosses";
import { timeGlosses } from "./time-glosses";
import { worldExtraGlosses } from "./world-extra-glosses";
import { worldGlosses } from "./world-glosses";

const glossMap = makeGlossMap([
  worldGlosses,
  worldExtraGlosses,
  peopleGlosses,
  cultureGlosses,
  placesGlosses,
  timeGlosses,
  studyWorkGlosses,
]);

export function getEnglishDefinition(term: string, meaningEs: string) {
  return glossMap.get(glossKey(term, meaningEs));
}

export function getVocabularyGlossKeys() {
  return new Set(glossMap.keys());
}
