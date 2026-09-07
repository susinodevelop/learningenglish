import { defineGrammarConcept } from "./factory";

export const perfectContinuousAspect = defineGrammarConcept({
  slug: "perfect-continuous-aspect",
  title: "Perfect & continuous aspect",
  category: "tenses",
  sourceSlugs: ["c1-present-aspect"],
  summary: "Concepto C1 transversal para comparar perfect simple y perfect continuous en presente, pasado y futuro según el foco: hecho/resultado frente a duración/proceso.",
  memoryHook: "PERFECT conecta tiempos · SIMPLE mira resultado · CONTINUOUS mira proceso/duración.",
  studyQuestion: "¿Qué punto temporal usas como referencia y quieres destacar el resultado o la duración/proceso que conduce hasta él?",
});
