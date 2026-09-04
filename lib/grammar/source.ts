import { grammarUnits01to06 } from "./source/book-part-a";
import { grammarUnits07to12 } from "./source/book-part-b";
import { grammarUnits13to18 } from "./source/book-part-c";
import { grammarUnits19to24 } from "./source/book-part-d";
import { applyBookFidelityPatches } from "./source/book-fidelity";

const rawBookGrammarTopics = [
  ...grammarUnits01to06,
  ...grammarUnits07to12,
  ...grammarUnits13to18,
  ...grammarUnits19to24,
];

export const bookGrammarTopics = applyBookFidelityPatches(rawBookGrammarTopics);
