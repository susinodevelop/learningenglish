import type { GrammarTopic } from "../types";
import { defineGrammarConcept } from "./factory";

const c1Topics: GrammarTopic[] = [
  {
    unit: 2,
    slug: "c1-narrative-tenses",
    title: "Narrative tenses: C1 control",
    level: "C1",
    examPractice: "Gold C1 · Unit 2 · Grammar reference pp. 151–152",
    summary: "Control fino de past simple, past continuous, past perfect y would al construir una narración.",
    sections: [
      {
        title: "Choosing the narrative viewpoint",
        rules: [
          "Past simple hace avanzar una secuencia de acontecimientos terminados y también presenta acciones o estados pasados como hechos.",
          "Past continuous crea fondo, muestra simultaneidad o presenta una acción en progreso interrumpida por otra.",
          "Past continuous también puede describir situaciones temporales del pasado.",
          "En una narración, past continuous puede presentar una acción repetida o un hábito visto como actividad en desarrollo.",
          "Past continuous también puede expresar planes o acontecimientos previstos que finalmente no ocurrieron.",
          "Past perfect retrocede a un punto anterior solo cuando hace falta aclarar el orden temporal.",
          "Past perfect continuous enfatiza duración o repetición de una actividad anterior a otro acontecimiento pasado.",
          "Would puede describir una acción o hábito repetido del pasado; la diferencia con used to ya está desarrollada en la base B2 del mismo concepto.",
          "No sobrecargues una narración con past perfect: con before/after o una vez fijada la secuencia, el past simple suele bastar.",
        ],
        examples: [
          { english: "I was leaving the office when the alarm went off.", note: "acción en progreso interrumpida" },
          { english: "Susan was studying architecture in the early 1970s.", note: "situación temporal" },
          { english: "By the time the police arrived, the driver had already left." },
          { english: "I'd been checking my phone repeatedly before I finally switched it off.", note: "actividad repetida anterior" },
          { english: "We would spend every August by the coast.", note: "hábito repetido" },
        ],
        traps: [
          "Before y after ya pueden dejar claro el orden de los hechos; no añadas past perfect de forma mecánica.",
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
