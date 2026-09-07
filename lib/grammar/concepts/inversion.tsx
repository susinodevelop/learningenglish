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
          "Son frecuentes under no circumstances, at no time, not until, nowhere, on no account y expresiones similares.",
          "Si la oración original no tiene auxiliary, añadimos do/does/did según corresponda.",
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
          "Hardly, no sooner, seldom, little, never, only when y not only pueden provocar inversión cuando se colocan al inicio.",
          "Hardly...when y no sooner...than son pares frecuentes.",
          "Only + time/condition expression provoca inversión en la main clause que sigue, no necesariamente dentro de la clause introducida por only.",
          "Estas estructuras son especialmente frecuentes en registro formal o literario.",
        ],
        examples: [
          { english: "Hardly had I sat down when the phone rang." },
          { english: "No sooner had we arrived than the storm began." },
          { english: "Little did she know what was about to happen." },
          { english: "Not only did he miss the deadline, he also lost the data." },
        ],
        traps: ["Hardly combina típicamente con when; no sooner con than."],
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
