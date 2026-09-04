import { defineGrammarConcept } from "./factory";

export const pastTenses = defineGrammarConcept({
  slug: "past-tenses",
  title: "Past tenses",
  category: "tenses",
  sourceSlugs: ["past-tenses", "past-perfect"],
  summary: "Pasado simple, acciones en progreso, hábitos antiguos y el pasado anterior a otro pasado, todo comparado en un único tema.",
  memoryHook: "FOTO = past simple · VÍDEO = past continuous · PASO ATRÁS = past perfect.",
  studyQuestion: "¿Cuentas un hecho, describes lo que estaba ocurriendo o necesitas retroceder a un pasado todavía anterior?",
});
