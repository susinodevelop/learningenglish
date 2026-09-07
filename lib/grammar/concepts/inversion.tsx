import type { GrammarTopic } from "../types";
import { defineGrammarConcept } from "./factory";

const c1Topics: GrammarTopic[] = [
  {
    unit: 12,
    slug: "c1-inversion",
    title: "Emphasis with inversion",
    level: "C1",
    examPractice: "Gold C1 · Unit 12 · Grammar reference p. 165",
    summary: "Inversión tras negative/restrictive adverbials para énfasis formal y literario.",
    sections: [
      {
        title: "Negative adverbs and adverbial expressions",
        forms: ["negative/restrictive adverbial + auxiliary + subject + main verb"],
        rules: [
          "Cuando una expresión negativa se adelanta al principio de la clause para énfasis, invertimos auxiliary y subject.",
          "El Gold ejemplifica este patrón con under no circumstances, at no time y not until.",
          "Si la oración original no tiene auxiliary, usamos do/does/did para construir la inversión cuando corresponde.",
        ],
        examples: [
          { english: "Under no circumstances should you reveal the password." },
          { english: "At no time did he admit responsibility." },
          { english: "Not until midnight did they announce the result." },
        ],
      },
      {
        title: "Restrictive expressions",
        rules: [
          "El Gold trabaja hardly, scarcely, no sooner, seldom, rarely, little, never, only when y not only como expresiones que pueden provocar inversión cuando se adelantan.",
          "Hardly/scarcely...when y no sooner...than son combinaciones frecuentes en estas estructuras.",
          "Only + time/condition expression provoca inversión en la main clause que sigue, no dentro de la clause introducida por only.",
          "Estas estructuras son más probables en contextos escritos formales o literarios que en conversación.",
        ],
        examples: [
          { english: "Hardly had I arrived when the phone rang." },
          { english: "Scarcely had I put down my suitcase when I was asked to help." },
          { english: "No sooner had we arrived than the storm began." },
          { english: "Seldom have I felt so moved." },
          { english: "Little did she know what was about to happen." },
          { english: "Only when I saw him again did I realise how good a friend he had been." },
          { english: "Not only did he miss the deadline, he also lost the data." },
        ],
        traps: ["Hardly/scarcely combinan típicamente con when; no sooner con than."],
      },
    ],
  },
];

export const inversion = defineGrammarConcept({
  slug: "inversion",
  title: "Emphasis with inversion",
  category: "complex-structures",
  sourceSlugs: [],
  additionalTopics: c1Topics,
  summary: "Estructura C1 de énfasis formal: negative y restrictive adverbials seguidos de inversión auxiliary + subject.",
  memoryHook: "NEGATIVO/RESTRICTIVO DELANTE → AUXILIAR DELANTE DEL SUJETO.",
  studyQuestion: "¿Has adelantado una expresión negativa o restrictiva para enfatizarla? Entonces, ¿qué auxiliar debe invertirse con el sujeto?",
});
