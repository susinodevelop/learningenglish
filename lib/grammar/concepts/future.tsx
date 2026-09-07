import type { GrammarTopic } from "../types";
import { defineGrammarConcept } from "./factory";

const c1Topics: GrammarTopic[] = [
  {
    unit: 3,
    slug: "c1-future-forms",
    title: "Future forms: C1 choices",
    level: "C1",
    examPractice: "Gold C1 · Unit 3 · Grammar reference pp. 152–153",
    summary: "Elección avanzada entre will, going to, present continuous, future continuous y future perfect.",
    sections: [
      {
        title: "Future meaning and speaker intention",
        rules: [
          "Will se usa para predicciones basadas en creencias/conocimiento, promesas, amenazas, ofrecimientos, peticiones y decisiones tomadas al hablar.",
          "Going to y present continuous expresan planes o arreglos ya decididos.",
          "Going to también presenta una predicción basada en evidencia presente.",
          "Future continuous presenta una acción en progreso en un momento futuro concreto.",
          "Future perfect presenta algo que estará completado antes de un punto futuro.",
        ],
        examples: [
          { english: "This time tomorrow, I'll be presenting the proposal." },
          { english: "By Friday, we'll have finished the first phase." },
        ],
      },
      {
        title: "Future time expressions and tense choice",
        rules: [
          "It won't be long until... y It's only a matter of time before... van seguidos de present simple aunque la referencia sea futura.",
          "Within the next... suele combinarse con will.",
          "Ten years from now... encaja naturalmente con future continuous cuando visualizamos una actividad en progreso.",
          "By the time... suele combinarse con future perfect para marcar el límite temporal.",
          "It's about/high time... usa past simple aunque se refiera al presente o futuro.",
        ],
        examples: [
          { english: "It's only a matter of time before she finds out." },
          { english: "It's high time we left." },
        ],
        traps: ["No uses will automáticamente después de before/until en estas expresiones de futuro."],
      },
    ],
  },
  {
    unit: 9,
    slug: "c1-future-in-the-past",
    title: "Future in the past",
    level: "C1",
    examPractice: "Gold C1 · Unit 9 · Grammar reference pp. 161–162",
    summary: "Formas para hablar desde un punto pasado sobre acontecimientos que entonces todavía pertenecían al futuro.",
    sections: [
      {
        title: "Future viewed from a past perspective",
        rules: [
          "Past continuous puede presentar un plan o acontecimiento futuro visto desde un momento pasado.",
          "Was/were going to + infinitive expresa una intención pasada, con frecuencia no cumplida.",
          "Would puede describir un acontecimiento futuro desde el pasado, tanto si realmente ocurrió como si era una predicción en aquel momento.",
          "Was/were to + infinitive se usa para acontecimientos previstos, especialmente en narración formal; was/were to have + past participle puede marcar que el acontecimiento previsto finalmente no ocurrió.",
          "El libro señala que was/were to es especialmente frecuente en formal written English como alternativa a would para acontecimientos previstos desde el pasado.",
        ],
        examples: [
          { english: "The lecture was starting in ten minutes, so we hurried." },
          { english: "I was going to call you, but my phone died." },
          { english: "Nobody knew the small company would become a global brand." },
          { english: "The new branch was to have opened in June, but the project was cancelled." },
        ],
      },
      {
        title: "Interrupted and unfulfilled future plans",
        rules: [
          "Was/were about to + infinitive describe una acción futura inminente que suele ser interrumpida.",
          "Was/were thinking of + -ing puede presentar una intención que estaba formándose y fue interrumpida o no se llevó a cabo.",
          "Was/were due to, meant to y supposed to expresan planes, expectativas u obligaciones previstas que pueden no haberse cumplido.",
        ],
        examples: [
          { english: "I was about to leave when you rang." },
          { english: "We were meant to meet at six, but she never arrived." },
          { english: "The flight was due to depart at nine, but it was delayed." },
        ],
      },
    ],
  },
];

export const future = defineGrammarConcept({
  slug: "future",
  title: "Future",
  category: "tenses",
  sourceSlugs: ["future-1", "future-2"],
  additionalTopics: c1Topics,
  summary: "Formas de futuro B2 y C1: horarios, planes, decisiones, predicciones, future continuous/perfect y cómo mirar el futuro desde un punto pasado.",
  memoryHook: "¿DESDE CUÁNDO MIRAS? presente → futuro · pasado → futuro en el pasado.",
  studyQuestion: "¿Hablas de un futuro desde ahora o de algo que todavía era futuro desde un momento pasado?",
});
