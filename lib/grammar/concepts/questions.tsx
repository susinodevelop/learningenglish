import { defineGrammarConcept } from "./factory";

export const questions = defineGrammarConcept({
  slug: "questions",
  title: "Questions",
  category: "sentence-building",
  sourceSlugs: ["questions"],
  summary: "Cómo construir preguntas, short answers, question tags y respuestas de acuerdo sin perderte con el orden de auxiliares y sujetos.",
  memoryHook: "AUXILIAR → SUJETO → VERBO, salvo cuando la question word ya es el sujeto.",
  studyQuestion: "¿Preguntas por el sujeto, por otra información o solo quieres confirmar algo que ya crees cierto?",
});
