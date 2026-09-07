import type { GrammarTopic } from "../types";
import { defineGrammarConcept } from "./factory";

const c1Topics: GrammarTopic[] = [
  {
    unit: 3,
    slug: "c1-introductory-it",
    title: "Introductory it",
    level: "C1",
    examPractice: "Gold C1 · Unit 3 · Grammar reference p. 153",
    summary: "It como sujeto u objeto introductorio y en cleft sentences para controlar el foco y evitar estructuras pesadas.",
    sections: [
      {
        title: "It as introductory subject",
        forms: ["It + be + adjective/noun + to-infinitive/-ing/clause", "It + be + adjective + that-clause"],
        rules: [
          "Se usa it como sujeto introductorio para evitar comenzar con un infinitive o una -ing clause pesada.",
          "También introduce una clause que funciona semánticamente como sujeto.",
          "Es especialmente frecuente con evaluaciones impersonales como it's likely, shocking, useful, important, a relief, etc.",
        ],
        examples: [
          { english: "It's useful to review your notes before the test." },
          { english: "It's surprising how quickly the situation changed." },
        ],
      },
      {
        title: "Cleft sentences with it",
        forms: ["It + be + focused element + who/that + clause"],
        rules: [
          "Las cleft sentences desplazan el foco hacia una persona, cosa o complemento concreto.",
          "El elemento inmediatamente después de be recibe el énfasis contrastivo.",
        ],
        examples: [
          { english: "It was Maya who found the error.", note: "énfasis en Maya" },
          { english: "It was the final paragraph that caused the confusion.", note: "énfasis en el objeto" },
        ],
      },
      {
        title: "It as introductory object",
        forms: ["subject + verb + it + adjective + infinitive/clause"],
        rules: [
          "Con verbos como find o make, it puede anticipar un objeto oracional cuando después aparece un adjective complement.",
          "Sin ese adjective, normalmente no usamos este it introductorio.",
        ],
        examples: [
          { english: "I find it difficult to concentrate in noisy places." },
          { english: "They made it clear that the deadline would not change." },
        ],
      },
      {
        title: "Introductory it with like, love, hate and similar verbs",
        forms: ["like/love/hate/can't stand + it + when + clause"],
        rules: [
          "Con verbos como like, love y hate, it puede anticipar una when-clause.",
          "El mismo patrón aparece con expresiones como can't stand cuando reaccionamos ante una situación.",
        ],
        examples: [
          { english: "I hate it when meetings start late." },
          { english: "I can't stand it when people interrupt." },
        ],
      },
    ],
  },
];

export const introductoryIt = defineGrammarConcept({
  slug: "introductory-it",
  title: "Introductory it & cleft sentences",
  category: "sentence-building",
  sourceSlugs: [],
  additionalTopics: c1Topics,
  summary: "Estructuras C1 con introductory it como sujeto u objeto y cleft sentences para controlar el foco de la frase.",
  memoryHook: "IT abre la estructura · CLEFT mueve el FOCO.",
  studyQuestion: "¿Necesitas evitar un sujeto pesado, anticipar una clause o enfatizar un elemento concreto?",
});
