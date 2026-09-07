import type { GrammarTopic } from "../types";
import { defineGrammarConcept } from "./factory";

const c1Topics: GrammarTopic[] = [
  {
    unit: 4,
    slug: "c1-modals",
    title: "Modal verbs: C1 distinctions",
    level: "C1",
    examPractice: "Gold C1 · Unit 4 · Grammar reference pp. 154–155",
    summary: "Matices C1 de posibilidad, deducción, obligación, necesidad, capacidad y crítica con modal perfect forms.",
    sections: [
      {
        title: "Possibility and deduction",
        rules: [
          "Can/could pueden expresar posibilidad teórica.",
          "May/might/could + infinitive expresan posibilidad presente o futura; el Gold ejemplifica may como strong possibility y might/could como less possible.",
          "May/might/could + have + past participle expresan posibilidad sobre un evento pasado.",
          "Must expresa deducción positiva fuerte; must have + past participle la traslada al pasado.",
          "Can't/couldn't expresan deducción negativa fuerte en presente o pasado; no usamos mustn't con este significado.",
        ],
        examples: [
          { english: "He may be on holiday.", note: "strong possibility en el ejemplo del Gold" },
          { english: "She might have missed the train." },
          { english: "He must have misunderstood the question." },
          { english: "That can't be the final version." },
        ],
        traps: ["Mustn't = prohibición; can't/couldn't = deducción negativa."],
      },
      {
        title: "Obligation, prohibition and necessity",
        rules: [
          "Must/mustn't suelen presentar obligación o prohibición desde la perspectiva del hablante.",
          "Have to/have got to suelen presentar una obligación impuesta externamente; have got to es más común en British English que en American English.",
          "Had to expresa obligación pasada y también la forma reportada de must cuando significa obligación.",
          "Need to expresa necesidad u obligación.",
        ],
        examples: [
          { english: "I must finish this before I leave." },
          { english: "We have to submit the form by Friday." },
        ],
      },
      {
        title: "Needn't have vs didn't need to",
        rules: [
          "Needn't / don't need to / don't have to expresan ausencia de obligación presente o futura.",
          "Needn't have + past participle significa que la acción sí se realizó, pero era innecesaria.",
          "Didn't need to + infinitive dice que no era necesario, sin aclarar por sí solo si la persona finalmente lo hizo o no.",
        ],
        examples: [
          { english: "You needn't have bought any food; we'd already cooked." },
          { english: "We didn't need to book in advance." },
        ],
        traps: ["Needn't have done implica que lo hiciste; didn't need to do no confirma si lo hiciste."],
      },
      {
        title: "Ability and unfulfilled ability",
        rules: [
          "Can/be able to expresan capacidad presente y futura; can también aparece para el futuro cuando existe un sentido de oportunidad.",
          "Could/couldn't y was/were able to pueden expresar capacidad general pasada.",
          "El Gold presenta could/couldn't + perfect infinitive para hablar de capacidad pasada no realizada o no disponible.",
        ],
        examples: [
          { english: "I could have learnt to ski, but I preferred skating.", note: "capacidad no aprovechada" },
          { english: "I couldn't have completed it without your help.", note: "forma perfecta negativa" },
        ],
      },
      {
        title: "Should and past criticism",
        forms: ["should/ought to + infinitive", "should have + past participle"],
        rules: [
          "Should expresa obligaciones y deberes en presente, futuro o pasado, y también se usa para dar consejo; ought to puede sustituirlo y es más formal.",
          "Should have + past participle sirve para criticar acciones propias o ajenas en el pasado.",
        ],
        examples: [{ english: "You should have checked the figures before publishing them." }],
      },
    ],
  },
];

export const modals = defineGrammarConcept({
  slug: "modals",
  title: "Modals",
  category: "verbs-and-meaning",
  sourceSlugs: ["modals-1", "modals-2", "modals-3"],
  additionalTopics: c1Topics,
  summary: "Obligación, permiso, consejo, capacidad, posibilidad y deducción desde B2 hasta C1, incluyendo modal perfect forms y matices como needn't have vs didn't need to.",
  memoryHook: "MODAL = actitud + GRADO DE CERTEZA + TIEMPO.",
  studyQuestion: "¿Qué actitud expresas y estás hablando del presente/futuro o juzgando una posibilidad/acción pasada?",
});
