import { defineGrammarConcept } from "./factory";

export const adjectives = defineGrammarConcept({
  slug: "adjectives",
  title: "Adjectives",
  category: "sentence-building",
  sourceSlugs: ["adjectives"],
  summary: "Comparativos, superlativos, -ed/-ing, posición y orden de adjetivos en un único mapa visual.",
  memoryHook: "DESCRIBE AL NOMBRE · -ING causa · -ED siente.",
  studyQuestion: "¿Estás describiendo una cosa/persona, comparándola o explicando qué causa una emoción y quién la siente?",
});
