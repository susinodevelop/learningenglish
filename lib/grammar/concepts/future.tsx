import { defineGrammarConcept } from "./factory";

export const future = defineGrammarConcept({
  slug: "future",
  title: "Future",
  category: "tenses",
  sourceSlugs: ["future-1", "future-2"],
  summary: "Todas las formas de futuro juntas para comparar horarios, planes, decisiones, predicciones, acciones en progreso y acciones completadas antes de un punto futuro.",
  memoryHook: "HORARIO · PLAN · DECISIÓN · EVIDENCIA · EN PROGRESO · YA TERMINADO.",
  studyQuestion: "¿El futuro está programado, decidido, predicho por evidencia o lo miras desde un punto futuro concreto?",
});
