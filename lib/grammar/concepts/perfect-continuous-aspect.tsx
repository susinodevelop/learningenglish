import type { GrammarTopic } from "../types";
import { defineGrammarConcept } from "./factory";

const c1Topics: GrammarTopic[] = [
  {
    unit: 1,
    slug: "c1-present-aspect",
    title: "Perfect and continuous aspect",
    level: "C1",
    examPractice: "Gold C1 · Unit 1 · Grammar reference pp. 149–150",
    summary: "Contraste avanzado entre tense y aspect y entre perfect simple y perfect continuous, con foco en hecho, proceso, conexión temporal, resultado y duración.",
    sections: [
      {
        title: "Tense vs aspect: time and viewpoint",
        intro: "El Gold distingue dos decisiones: tense indica en qué período temporal ocurre la acción; aspect indica cómo la visualizamos con respecto al tiempo.",
        rules: [
          "Tense sitúa la acción en pasado, presente o futuro.",
          "El simple aspect presenta la acción como un hecho.",
          "El continuous/progressive aspect presenta la acción como continua o extendida en el tiempo.",
          "El perfect aspect conecta o combina puntos/períodos temporales y relaciona una acción anterior con un punto de referencia posterior.",
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
          "Se usa para estados o acciones, únicas o repetidas, durante un período largo que llega hasta el presente; son frecuentes ever, never, often y always.",
          "También aparece en expresiones como this is the first/second time... y después de superlatives para hablar de experiencia acumulada hasta ahora.",
          "Con just, already y yet presenta con frecuencia una acción reciente con resultado presente.",
          "Con for, since y períodos aún abiertos como this week/month/year puede expresar una situación que continúa hasta ahora.",
          "El Gold señala que en American English es aceptable usar past simple en algunos contextos recientes en los que British English suele preferir present perfect, por ejemplo con yet/already.",
        ],
        examples: [
          { english: "This is the third time I've taken this exam." },
          { english: "It's the most demanding course I've ever done." },
          { english: "Did you eat yet?", note: "American English: past simple puede aparecer donde BrE suele usar present perfect" },
        ],
        traps: ["No conviertas yet/already en una regla absoluta de present perfect: el Gold advierte de la diferencia de uso en American English."],
      },
      {
        title: "Present perfect continuous: advanced uses",
        forms: ["have/has been + verb-ing"],
        rules: [
          "Se usa para una actividad reciente cuyos efectos todavía pueden verse.",
          "Es especialmente natural para situaciones temporales que se prolongan hasta el presente.",
          "Puede sugerir que una acción todavía no está completa.",
          "El Gold tiende a preferir present perfect simple para situaciones más permanentes y present perfect continuous para situaciones más temporales.",
          "Con algunas actividades de larga duración, ambas formas pueden ser posibles y la diferencia puede ser simplemente de énfasis.",
          "Los stative verbs normalmente no se usan en present perfect continuous.",
        ],
        examples: [
          { english: "She's lived in Rome since she was a child.", note: "situación más permanente" },
          { english: "She's been living out of a suitcase for months.", note: "situación temporal" },
          { english: "Isabel has played / has been playing the piano since she was five.", note: "ambas posibles; cambia el énfasis" },
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
  summary: "Concepto transversal del Gold C1: distingue tense de aspect y ayuda a elegir entre simple, continuous y perfect según el punto temporal y la perspectiva que quieras dar a la acción.",
  memoryHook: "TENSE = CUÁNDO · ASPECT = CÓMO LA MIRAS.",
  studyQuestion: "¿En qué momento ocurre y quieres presentar la acción como hecho, proceso o conectada con otro punto temporal?",
});
