import { defineGrammarConcept } from "./factory";

export const nounsAndArticles = defineGrammarConcept({
  slug: "nouns-and-articles",
  title: "Nouns & articles",
  category: "sentence-building",
  sourceSlugs: ["countable-uncountable-nouns-articles"],
  summary: "Countable/uncountable nouns y la lógica de a/an, the y artículo cero, reunidos para decidir qué determinante necesita un sustantivo.",
  memoryHook: "¿SE PUEDE CONTAR? → ¿ES UNO CUALQUIERA? → ¿ES IDENTIFICABLE? → ¿HABLO EN GENERAL?",
  studyQuestion: "Antes del artículo: ¿el sustantivo es contable y la persona que escucha sabe exactamente cuál es?",
});
