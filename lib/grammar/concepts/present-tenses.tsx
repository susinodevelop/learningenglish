import { defineGrammarConcept } from "./factory";

export const presentTenses = defineGrammarConcept({
  slug: "present-tenses",
  title: "Present tenses",
  category: "tenses",
  sourceSlugs: ["present-tenses", "present-perfect-and-past-simple"],
  summary: "Todo lo que necesitas para hablar del presente: rutinas, situaciones temporales, estados y acciones que empezaron antes pero siguen conectadas con ahora.",
  memoryHook: "AHORA: rutina ↔ temporal ↔ conexión con el pasado.",
  studyQuestion: "¿Es algo habitual, algo que está pasando/cambiando o algo que empezó antes y llega hasta ahora?",
});
