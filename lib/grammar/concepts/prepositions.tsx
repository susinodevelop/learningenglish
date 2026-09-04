import { defineGrammarConcept } from "./factory";

export const prepositions = defineGrammarConcept({
  slug: "prepositions",
  title: "Prepositions",
  category: "complex-structures",
  sourceSlugs: ["prepositions-1", "prepositions-2"],
  summary: "Lugar, tiempo, movimiento y combinaciones fijas con verbos/adjetivos agrupadas para estudiar relaciones y chunks, no listas aisladas.",
  memoryHook: "PREPOSICIÓN = relación: dónde · cuándo · hacia dónde · combinación fija.",
  studyQuestion: "¿Expresas una relación espacial/temporal o estás ante un chunk fijo que debe aprenderse como una sola pieza?",
});
