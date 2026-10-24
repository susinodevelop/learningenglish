import type { VocabularySense } from "./types";

/** Recognise idioms from book sections and individually imported personal entries. */
export function isIdiomSense(sense: Pick<VocabularySense, "type" | "sectionKinds">): boolean {
  return sense.type === "idiom" || sense.sectionKinds.includes("idiom");
}
