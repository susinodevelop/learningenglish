import { defineGrammarConcept } from "./factory";

export const pastTenses = defineGrammarConcept({
  slug: "past-tenses",
  title: "Past tenses",
  category: "tenses",
  sourceSlugs: ["past-tenses", "past-perfect", "c1-narrative-tenses"],
  summary: "Pasado simple, acciones en progreso, hábitos antiguos y past perfect, ampliados en C1 con control narrativo y elección de perspectiva.",
  memoryHook: "FOTO = past simple · VÍDEO = past continuous · PASO ATRÁS = past perfect.",
  studyQuestion: "¿Haces avanzar la historia, describes el fondo o necesitas retroceder a un pasado anterior?",
});
