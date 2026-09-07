import type { GrammarTopic } from "../types";
import { defineGrammarConcept } from "./factory";

const c1Topics: GrammarTopic[] = [
  {
    unit: 8,
    slug: "c1-reported-speech",
    title: "Reported speech: C1 control",
    level: "C1",
    examPractice: "Gold C1 · Unit 8 · Grammar reference pp. 160–161",
    summary: "Backshift flexible, cambios de referencia y reported questions con criterio de significado, no como transformación mecánica.",
    sections: [
      {
        title: "When backshift is and isn't needed",
        rules: [
          "Con reporting verb en pasado, el tense suele retroceder: present → past, past → past perfect, present perfect → past perfect, will → would, can → could y must de obligación → had to.",
          "No es obligatorio cambiar el tense si la información sigue siendo verdadera o vigente.",
          "Tampoco hace falta si lo reportado ocurrió hace muy poco y la referencia temporal sigue siendo la misma.",
          "Would, could, might, ought to, should y must de deducción normalmente no cambian.",
          "El past perfect ya no puede retroceder más y se mantiene.",
        ],
        examples: [
          { english: "'The earth is getting warmer.' → She said the earth is getting warmer.", note: "hecho aún vigente" },
          { english: "'I had already sent it.' → He said he had already sent it." },
        ],
      },
      {
        title: "Time and place reference changes",
        rules: [
          "Tomorrow puede pasar a the next/following day; yesterday a the day before/previous day.",
          "Now puede pasar a then/at that time; here a there; today a that day.",
          "Ago suele pasar a before/earlier.",
          "Estos cambios no son automáticos: dependen de si el punto de referencia realmente ha cambiado.",
        ],
        examples: [{ english: "'I'll finish tomorrow.' → She said she'd finish the following day." }],
      },
      {
        title: "Reported questions",
        rules: [
          "Yes/No questions usan if o whether.",
          "Wh- questions conservan la wh-word, pero pasan a statement word order: subject + verb.",
          "Los mismos cambios de tense, persona, tiempo y lugar que en reported statements se aplican cuando son necesarios.",
          "No se mantiene do/does/did como auxiliary de pregunta.",
        ],
        examples: [
          { english: "'Can you help?' → She asked whether I could help." },
          { english: "'Why did you leave?' → He asked why I had left." },
        ],
        traps: ["Reported question: why I had left, no why had I left."],
      },
    ],
  },
  {
    unit: 8,
    slug: "c1-reporting-verb-patterns",
    title: "Reporting verb patterns",
    level: "C1",
    examPractice: "Gold C1 · Unit 8 · Grammar reference p. 161",
    summary: "Patrones de reporting verbs para resumir intención: infinitive, clause, -ing y prepositional patterns.",
    sections: [
      {
        title: "Reporting verb + infinitive patterns",
        rules: [
          "Verb + to-infinitive: agree, claim, decide, offer, promise, refuse, threaten.",
          "Verb + object + to-infinitive: advise, beg, encourage, invite, order, permit, persuade, remind, tell, warn.",
          "Verb + wh-word + to-infinitive: describe, explain, know, wonder.",
          "Verb + object + wh-word + to-infinitive: ask, remind, tell.",
        ],
        examples: [
          { english: "She refused to comment." },
          { english: "They warned us not to touch the equipment." },
          { english: "He explained where to leave the documents." },
        ],
      },
      {
        title: "Reporting verb + clause",
        rules: [
          "Verb + (that) + clause: accept, admit, claim, doubt, explain, promise, recommend, say, suggest.",
          "Verb + object + (that) + clause: promise, remind, tell, warn.",
          "Con recommend/suggest, la clause puede llevar should o una forma base en registros formales.",
        ],
        examples: [
          { english: "She suggested that we should leave early." },
          { english: "He warned us that the road might be closed." },
        ],
      },
      {
        title: "Reporting verb + -ing / preposition + -ing",
        rules: [
          "Verb + -ing: admit, deny, recommend, regret, suggest.",
          "Verb + preposition + -ing: apologise for, insist on, object to.",
          "Verb + object + preposition + -ing: accuse somebody of, blame somebody for, congratulate somebody on, discourage somebody from, forgive somebody for.",
          "En C1 conviene aprender el reporting verb junto con su patrón completo.",
        ],
        examples: [
          { english: "He denied taking the money." },
          { english: "She apologised for arriving late." },
          { english: "They accused him of hiding information." },
        ],
      },
      {
        title: "Impersonal reporting verbs",
        rules: [
          "En formal written English, verbs como believe, consider, expect y suggest pueden reportar opiniones generales sin identificar una fuente concreta.",
          "La estructura impersonal típica es It + be + past participle + that-clause.",
          "Otra opción frecuente, especialmente con pasiva, es subject + be + past participle + to-infinitive.",
        ],
        examples: [
          { english: "It is believed that demand will increase." },
          { english: "The company is expected to announce the results tomorrow." },
        ],
      },
    ],
  },
];

export const reportedSpeech = defineGrammarConcept({
  slug: "reported-speech",
  title: "Reported speech & reporting verbs",
  category: "verbs-and-meaning",
  sourceSlugs: ["reported-speech"],
  additionalTopics: c1Topics,
  summary: "Reported speech B2 ampliado con C1: backshift flexible, cambios de referencia, reported questions, reporting verb patterns e impersonal reporting.",
  memoryHook: "CAMBIA LA CÁMARA, no mecánicamente: persona · tiempo · lugar · intención del reporting verb.",
  studyQuestion: "¿Qué parte cambia realmente al reportar y qué patrón exige el reporting verb que resume la intención?",
});
