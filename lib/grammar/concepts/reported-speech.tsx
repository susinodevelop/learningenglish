import { defineGrammarConcept } from "./factory";

export const reportedSpeech = defineGrammarConcept({
  slug: "reported-speech",
  title: "Reported speech",
  category: "verbs-and-meaning",
  sourceSlugs: ["reported-speech"],
  summary: "Backshift, say/tell, reporting verbs, preguntas indirectas y referencias temporales tratados como una transformación de perspectiva.",
  memoryHook: "CAMBIA LA CÁMARA: persona · tiempo · lugar · orden de la frase.",
  studyQuestion: "¿Estás repitiendo palabras exactas o contando después lo que alguien dijo/preguntó?",
});
