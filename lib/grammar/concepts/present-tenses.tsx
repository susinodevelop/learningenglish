import type { GrammarTopic } from "../types";
import { defineGrammarConcept } from "./factory";

const c1Topics: GrammarTopic[] = [
  {
    unit: 1,
    slug: "c1-stative-verbs",
    title: "Stative and dynamic verbs",
    level: "C1",
    examPractice: "Gold C1 · Unit 1 · Grammar reference p. 150",
    summary: "Diferencia entre significado estático y dinámico en verbos que cambian de comportamiento según el sentido.",
    sections: [
      {
        title: "Stative vs dynamic meaning",
        intro: "Un mismo verbo puede ser stative o dynamic según el significado concreto que tenga en la frase.",
        rules: [
          "Los stative verbs suelen describir emociones, conocimiento, posesión, comunicación o percepción y normalmente no van en continuous.",
          "Los dynamic verbs describen actividades o procesos y sí admiten formas continuas.",
          "Feel, think, have, see, taste y smell pueden cambiar de categoría cuando cambia su significado.",
          "La pregunta útil no es '¿está ocurriendo ahora?', sino '¿describe un estado o una actividad?'.",
        ],
        examples: [
          { english: "I feel the plan is too risky.", note: "opinión: stative" },
          { english: "I'm feeling much better today.", note: "experiencia temporal: dynamic" },
          { english: "She has two flats.", note: "posesión" },
          { english: "She's having lunch with a client.", note: "actividad" },
        ],
      },
    ],
  },
];

export const presentTenses = defineGrammarConcept({
  slug: "present-tenses",
  title: "Present tenses",
  category: "tenses",
  sourceSlugs: ["present-tenses", "present-perfect-and-past-simple"],
  additionalTopics: c1Topics,
  summary: "Presente desde B2 hasta C1: rutinas, situaciones temporales, estados, conexión con el pasado y control avanzado de stative/dynamic verbs.",
  memoryHook: "HECHO ↔ PROCESO: decide si el verbo describe un estado o una actividad.",
  studyQuestion: "¿Es algo habitual, algo que está pasando/cambiando o un verbo cuyo significado cambia entre stative y dynamic?",
});
