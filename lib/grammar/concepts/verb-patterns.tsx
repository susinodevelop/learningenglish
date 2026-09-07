import type { GrammarTopic } from "../types";
import { defineGrammarConcept } from "./factory";

const c1Topics: GrammarTopic[] = [
  {
    unit: 4,
    slug: "c1-verb-patterns",
    title: "Verb patterns: -ing and infinitive",
    level: "C1",
    examPractice: "Gold C1 · Unit 4 · Grammar reference pp. 153–154",
    summary: "Taxonomía C1 de verb + -ing, infinitive, object patterns y cambios de significado.",
    sections: [
      {
        title: "Verb + -ing",
        forms: ["verb + verb-ing"],
        rules: [
          "Entre los verbos frecuentes seguidos de -ing están admit, appreciate, avoid, consider, delay, deny, detest, dislike, enjoy, escape, face, feel like, finish, forgive, give up, imagine, involve, keep, mention, mind, miss, postpone, practise, prefer, put off, recommend, regret, resent, risk, suggest y understand.",
          "El patrón pertenece al primer verbo: no se decide por traducción literal desde el español.",
          "Algunas combinaciones incluyen phrasal/prepositional verbs como give up o put off y mantienen -ing después.",
        ],
        examples: [
          { english: "She admitted copying the file." },
          { english: "We postponed making a final decision." },
        ],
      },
      {
        title: "Verb + object + -ing",
        forms: ["verb + object + verb-ing"],
        rules: [
          "Verbos como catch, discover, find, forbid, notice, observe, overhear y prevent pueden introducir un objeto seguido de -ing.",
          "La -ing clause presenta la acción que se observa, descubre, impide, etc.",
        ],
        examples: [
          { english: "I noticed him checking his phone during the meeting." },
          { english: "They prevented us entering the building." },
        ],
      },
      {
        title: "Verb + to-infinitive",
        forms: ["verb + to + infinitive"],
        rules: [
          "El libro incluye entre los verbos frecuentes seguidos de to-infinitive: afford, agree, appear, arrange, ask, attempt, bear, begin, care, choose, consent, decide, determine, expect, fail, forget, happen, hate, help, hesitate, hope, intend, learn, like, love, manage, mean, offer, prefer, prepare, pretend, promise, propose, refuse, remember, seem, start, swear, try, want y wish.",
          "Algunos de ellos también admiten otros patrones; el significado y el contexto determinan la opción correcta.",
        ],
        examples: [
          { english: "They managed to reach an agreement." },
          { english: "I refuse to accept those conditions." },
        ],
      },
      {
        title: "Verb + object + to-infinitive / bare infinitive",
        forms: ["verb + object + to-infinitive", "let/make/hear/help + object + bare infinitive"],
        rules: [
          "El libro incluye con object + to-infinitive: advise, allow, ask, cause, command, encourage, expect, forbid, force, get, hate, help, instruct, intend, invite, leave, like, mean, need, oblige, order, permit, persuade, prefer, press, recommend, remind, request, teach, tell, tempt, trouble, want, warn y wish.",
          "Let, make, hear y help aparecen con object + infinitive without to.",
          "En pasiva, make, hear y help pasan a to-infinitive: was made to..., was heard to....",
          "Las formas pasivas con advise/order/etc. también van seguidas de to-infinitive.",
        ],
        examples: [
          { english: "They persuaded me to apply." },
          { english: "The joke made everyone laugh." },
          { english: "We were made to wait outside." },
        ],
        traps: ["Make + object usa bare infinitive en activa, pero to-infinitive en pasiva."],
      },
      {
        title: "-ing or infinitive: change of meaning",
        rules: [
          "Remember/forget + -ing mira hacia atrás: la acción ya ocurrió; + to-infinitive mira hacia delante: primero recuerdas y después haces la acción.",
          "Regret + -ing expresa arrepentimiento por una acción pasada; regret + to-infinitive introduce formalmente una noticia presente desagradable.",
          "Stop + -ing = dejar de hacer la actividad; stop + to-infinitive = detener una actividad para hacer otra.",
          "Try + -ing = probar un método como experimento; try + to-infinitive = esforzarse por conseguir algo difícil.",
          "Attempt, begin, continue, love, prefer, see y start pueden admitir -ing o infinitive con poca diferencia en muchos contextos.",
        ],
        examples: [
          { english: "I remember meeting her at a conference." },
          { english: "Remember to send her the contract." },
          { english: "Try restarting the router.", note: "experimento" },
          { english: "Try to stay calm.", note: "esfuerzo" },
        ],
      },
    ],
  },
];

export const verbPatterns = defineGrammarConcept({
  slug: "verb-patterns",
  title: "Verb patterns",
  category: "verbs-and-meaning",
  sourceSlugs: ["to-infinitive-and-ing"],
  additionalTopics: c1Topics,
  summary: "To-infinitive, -ing, object patterns y bare infinitive desde B2 hasta C1, incluyendo listas de verbos y cambios de significado.",
  memoryHook: "PRIMER VERBO manda el patrón; TO ↔ -ING puede cambiar el significado.",
  studyQuestion: "¿Qué patrón exige el primer verbo y qué cambia si eliges -ing, to-infinitive u object + infinitive?",
});
