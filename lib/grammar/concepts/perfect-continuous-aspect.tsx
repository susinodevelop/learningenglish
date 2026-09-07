import type { GrammarTopic } from "../types";
import { defineGrammarConcept } from "./factory";

const c1Topics: GrammarTopic[] = [
  {
    unit: 1,
    slug: "c1-present-aspect",
    title: "Perfect and continuous aspect",
    level: "C1",
    examPractice: "Gold C1 · Unit 1 · Grammar reference pp. 149–150",
    summary: "Contraste avanzado entre perfect simple y perfect continuous en presente, pasado y futuro, además del foco resultado/cantidad frente a duración/proceso.",
    sections: [
      {
        title: "Aspect: fact, process and connection",
        intro: "En C1 no basta con reconocer un tiempo verbal: hay que decidir cómo quieres presentar la acción. El aspecto simple la trata como hecho, el continuo como proceso y el perfecto la conecta con otro punto temporal.",
        rules: [
          "El simple presenta la acción como hecho, hábito o situación estable.",
          "El continuous presenta una actividad en progreso, temporal, cambiante o vista desde dentro.",
          "El perfect conecta un período anterior con un punto de referencia posterior: normalmente el presente, pero también puede ser un punto pasado o futuro.",
          "La elección entre perfect simple y perfect continuous cambia el foco: resultado/cantidad frente a duración/proceso.",
        ],
        examples: [
          { english: "I have written three reports this week.", note: "resultado/cantidad" },
          { english: "I have been writing reports all morning.", note: "duración/proceso" },
        ],
      },
      {
        title: "Present perfect simple: advanced uses",
        forms: ["have/has + past participle"],
        rules: [
          "Se usa para estados o acciones, únicas o repetidas, que abarcan un período hasta el presente.",
          "Es frecuente con ever, never, always, often y expresiones del tipo this is the first/second time...",
          "Con just, already y yet suele presentar una acción reciente con resultado actual.",
          "Con for, since y períodos aún abiertos como this week/month/year puede expresar una situación que continúa hasta ahora.",
          "Tras superlativos es frecuente para hablar de experiencia acumulada hasta el presente.",
        ],
        examples: [
          { english: "This is the third time I've taken this exam." },
          { english: "It's the most demanding course I've ever done." },
        ],
      },
      {
        title: "Present perfect continuous: advanced uses",
        forms: ["have/has been + verb-ing"],
        rules: [
          "Destaca una actividad reciente cuyos efectos todavía son visibles.",
          "Es especialmente natural para situaciones temporales que se prolongan hasta el presente.",
          "Puede sugerir que la actividad está incompleta.",
          "Con actividades de larga duración puede alternar con el present perfect simple; la diferencia suele ser de énfasis, no de verdad factual.",
          "Los state verbs normalmente no se usan en esta forma.",
        ],
        examples: [
          { english: "I've been working from a hotel for the last two weeks.", note: "situación temporal" },
          { english: "I've been trying to fix the printer, but it still doesn't work.", note: "actividad no completada" },
        ],
      },
      {
        title: "Past perfect simple vs past perfect continuous",
        forms: ["had + past participle", "had been + verb-ing"],
        rules: [
          "Ambas formas sitúan una acción antes de otro punto del pasado.",
          "Past perfect simple destaca el hecho, resultado o acción completada anterior.",
          "Past perfect continuous destaca la duración, repetición o actividad en progreso anterior.",
          "La elección depende del foco que queremos dar, no solo del orden cronológico.",
        ],
        examples: [
          { english: "She had completed the training before she applied.", note: "resultado completado" },
          { english: "She had been training for months before she applied.", note: "duración/proceso" },
        ],
      },
      {
        title: "Future perfect simple vs future perfect continuous",
        forms: ["will have + past participle", "will have been + verb-ing"],
        rules: [
          "Future perfect simple presenta una acción o cantidad como completada antes de un punto futuro.",
          "Future perfect continuous presenta la duración o continuidad de una actividad hasta un punto futuro.",
          "Con for + período, ambas formas pueden ser posibles con algunos verbos de larga duración; cambia el énfasis entre estado/resultado y proceso/duración.",
        ],
        examples: [
          { english: "By December, I will have completed the course.", note: "acción completada" },
          { english: "By December, I will have been studying for a year.", note: "duración hasta un punto futuro" },
        ],
        traps: ["No olvides been en future perfect continuous: will have been + verb-ing."],
      },
    ],
  },
];

export const perfectContinuousAspect = defineGrammarConcept({
  slug: "perfect-continuous-aspect",
  title: "Perfect & continuous aspect",
  category: "tenses",
  sourceSlugs: [],
  additionalTopics: c1Topics,
  summary: "Concepto C1 transversal para elegir entre perfect simple y perfect continuous en presente, pasado y futuro según quieras destacar resultado o proceso.",
  memoryHook: "PERFECT conecta · SIMPLE cuenta el resultado · CONTINUOUS muestra el proceso.",
  studyQuestion: "¿Quieres destacar qué se ha completado o cuánto tiempo/proceso lleva ocurriendo hasta otro punto temporal?",
});
