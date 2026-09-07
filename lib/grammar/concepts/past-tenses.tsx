import type { GrammarTopic } from "../types";
import { defineGrammarConcept } from "./factory";

const c1Topics: GrammarTopic[] = [
  {
    unit: 2,
    slug: "c1-narrative-tenses",
    title: "Narrative tenses: C1 control",
    level: "C1",
    examPractice: "Gold C1 · Unit 2 · Grammar reference pp. 151–152",
    summary: "Control fino de past simple, continuous, perfect y would/used to al narrar.",
    sections: [
      {
        title: "Choosing the narrative viewpoint",
        rules: [
          "Past simple hace avanzar la secuencia de acontecimientos terminados.",
          "Past continuous crea fondo, muestra simultaneidad o presenta una acción en progreso interrumpida por otra.",
          "Past continuous también puede expresar planes o acontecimientos previstos que finalmente no ocurrieron.",
          "Past perfect retrocede a un punto anterior solo cuando hace falta aclarar el orden temporal.",
          "Past perfect continuous enfatiza la duración de una actividad anterior a otro momento pasado.",
          "Used to sirve para hábitos y estados pasados; would sirve para hábitos/acciones repetidas, pero no para estados, pensamientos o emociones.",
          "No sobrecargues una narración con past perfect: con before/after o una vez fijada la secuencia, el past simple suele bastar.",
        ],
        examples: [
          { english: "I was leaving the office when the alarm went off." },
          { english: "By the time the police arrived, the driver had already left." },
          { english: "We would spend every August by the coast.", note: "hábito repetido" },
        ],
      },
    ],
  },
];

export const pastTenses = defineGrammarConcept({
  slug: "past-tenses",
  title: "Past tenses",
  category: "tenses",
  sourceSlugs: ["past-tenses", "past-perfect"],
  additionalTopics: c1Topics,
  summary: "Pasado simple, acciones en progreso, hábitos antiguos y past perfect, ampliados en C1 con control narrativo y elección de perspectiva.",
  memoryHook: "FOTO = past simple · VÍDEO = past continuous · PASO ATRÁS = past perfect.",
  studyQuestion: "¿Haces avanzar la historia, describes el fondo o necesitas retroceder a un pasado anterior?",
});
