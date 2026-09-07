import { defineGrammarConcept } from "./factory";

export const presentTenses = defineGrammarConcept({
  slug: "present-tenses",
  title: "Present tenses",
  category: "tenses",
  sourceSlugs: ["present-tenses", "present-perfect-and-past-simple", "c1-stative-verbs"],
  summary: "Presente desde B2 hasta C1: rutinas, situaciones temporales, conexión con el pasado y elección entre significado stative y dynamic.",
  memoryHook: "AHORA: rutina ↔ temporal ↔ conexión con el pasado · ESTADO ↔ ACCIÓN.",
  studyQuestion: "¿Es algo habitual, temporal, conectado con el pasado o un verbo cuyo significado cambia entre state y dynamic?",
});
