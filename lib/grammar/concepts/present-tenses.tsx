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
          "El Gold trabaja explícitamente estos stative verbs: agree, believe, belong, care, deny, hear, know, like, love, own, possess, promise, smell, taste y understand.",
          "Los dynamic verbs describen actividades o procesos y sí admiten formas continuas.",
          "Feel, think, have, see, taste y smell pueden cambiar de categoría cuando cambia su significado.",
          "La pregunta útil no es '¿está ocurriendo ahora?', sino '¿describe un estado o una actividad?'.",
        ],
        examples: [
          { english: "I feel the plan is too risky.", note: "opinión: stative" },
          { english: "I'm feeling much better today.", note: "experiencia temporal: dynamic" },
          { english: "I think city life is exhausting.", note: "opinión: stative" },
          { english: "I'm thinking of moving abroad.", note: "actividad mental: dynamic" },
          { english: "I see your point.", note: "entender: stative" },
          { english: "I'm seeing a friend for dinner tonight.", note: "reunirse: dynamic" },
          { english: "This sauce tastes strange.", note: "propiedad percibida: stative" },
          { english: "The judges are tasting the cakes.", note: "acción voluntaria: dynamic" },
        ],
        traps: [
          "No decidas simple/continuous solo por el momento temporal: con estos verbos manda el significado concreto.",
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
