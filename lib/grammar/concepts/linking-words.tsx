import type { GrammarTopic } from "../types";
import { defineGrammarConcept } from "./factory";

const c1Topics: GrammarTopic[] = [
  {
    unit: 1,
    slug: "c1-conjunctions",
    title: "Conjunctions",
    level: "C1",
    examPractice: "Gold C1 · Unit 1 · Grammar reference pp. 150–151",
    summary: "Conjunctions de contraste, adición, condición y causa/resultado, con atención al orden invertido tras nor y a usos avanzados de as.",
    sections: [
      {
        title: "Contrast, addition, condition and reason/result",
        rules: [
          "Para contraste aparecen although, while, whereas y yet.",
          "Para añadir información se usan and y nor; tras nor hay inversión auxiliar + sujeto.",
          "Para condición son frecuentes as long as, provided (that), if, unless e if only.",
          "El Gold reúne as, because, since y so en este bloque; funcionalmente as/because/since introducen la razón, mientras que so enlaza esa razón con su resultado.",
          "Estas conjunctions pueden aparecer al principio o en medio de la oración y contribuyen a la cohesión.",
          "As también puede añadir información con orden verb/auxiliary + subject: Buying a car is expensive, as is insurance.",
        ],
        examples: [
          { english: "The task was simple, yet nobody finished on time." },
          { english: "He didn't complain, nor did he ask for help.", note: "inversión tras nor" },
          { english: "Provided that the data are accurate, we can publish the report." },
          { english: "As he hadn't had time to study, he didn't do as well as he'd hoped.", note: "razón" },
        ],
        traps: ["Después de nor no uses orden de afirmación: nor did he..., no nor he did...."],
      },
      {
        title: "Uses and fixed expressions with as",
        rules: [
          "As + clause puede significar while cuando dos situaciones se desarrollan al mismo tiempo.",
          "As también puede significar since/because cuando introduce una razón.",
          "As for + noun/pronoun introduce el tema sobre el que se va a comentar algo: 'regarding'.",
          "As yet significa 'until now'.",
          "As it is describe la situación actual o las cosas tal como están.",
          "As from + time/date significa 'starting from'.",
        ],
        examples: [
          { english: "As the deadline approaches, the pressure increases.", note: "while" },
          { english: "As for the budget, we still need approval.", note: "regarding" },
          { english: "No decision has been made as yet.", note: "until now" },
          { english: "As from Monday, the office will open earlier.", note: "starting from" },
        ],
      },
    ],
  },
];

export const linkingWords = defineGrammarConcept({
  slug: "linking-words",
  title: "Linking words",
  category: "complex-structures",
  sourceSlugs: ["linking-words-1", "linking-words-2"],
  additionalTopics: c1Topics,
  summary: "Razón, resultado, propósito y contraste desde B2 hasta C1, ampliados con conjunctions y usos avanzados de as.",
  memoryHook: "PRIMERO decide la relación: CAUSA → RESULTADO → PROPÓSITO → CONTRASTE.",
  studyQuestion: "¿Qué relación lógica quieres crear entre las dos ideas y qué conector expresa exactamente ese vínculo?",
});
