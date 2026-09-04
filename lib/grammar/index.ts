import { grammarUnits01to06 } from "./units-01-06";
import { grammarUnits07to12 } from "./units-07-12";
import { grammarUnits13to18 } from "./units-13-18";
import { grammarUnits19to24 } from "./units-19-24";

export type { GrammarExample, GrammarSection, GrammarTopic } from "./types";

export const grammarTopics = [
  ...grammarUnits01to06,
  ...grammarUnits07to12,
  ...grammarUnits13to18,
  ...grammarUnits19to24,
];
