import { grammarUnits01to06 } from "./source/book-part-a";
import { grammarUnits07to12 } from "./source/book-part-b";
import { grammarUnits13to18 } from "./source/book-part-c";
import { grammarUnits19to24 } from "./source/book-part-d";
import { applyBookFidelityPatches } from "./source/book-fidelity";
import { c1GoldGrammarUnits01to03 } from "./source/c1-gold-part-a";
import { c1GoldGrammarUnits04to06 } from "./source/c1-gold-part-b";
import { c1GoldGrammarUnits07to09 } from "./source/c1-gold-part-c";
import { c1GoldGrammarUnits10to12 } from "./source/c1-gold-part-d";

const rawB2BookGrammarTopics = [
  ...grammarUnits01to06,
  ...grammarUnits07to12,
  ...grammarUnits13to18,
  ...grammarUnits19to24,
];

const c1GoldGrammarTopics = [
  ...c1GoldGrammarUnits01to03,
  ...c1GoldGrammarUnits04to06,
  ...c1GoldGrammarUnits07to09,
  ...c1GoldGrammarUnits10to12,
];

export const bookGrammarTopics = [
  ...applyBookFidelityPatches(rawB2BookGrammarTopics),
  ...c1GoldGrammarTopics,
];
