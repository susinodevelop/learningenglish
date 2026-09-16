import type { VocabularySection, VocabularyTopic } from "../types";

export type IrregularVerbForms = {
  base: string;
  pastSimple: string;
  pastParticiple: string;
  rule: string;
  note?: string;
};

type IrregularVerbRow = readonly [
  base: string,
  pastSimple: string,
  pastParticiple: string,
  meaningEs: string,
  definitionEn: string,
  note?: string,
];

type IrregularVerbGroup = {
  title: string;
  explanation: string;
  verbs: IrregularVerbRow[];
};

const irregularVerbGroups: IrregularVerbGroup[] = [
  {
    title: "Patrón i → a → u",
    explanation: "La vocal suele pasar de i en la forma base a a en past simple y u en past participle.",
    verbs: [
      ["begin", "began", "begun", "empezar / comenzar", "to start doing something or to start happening"],
      ["ring", "rang", "rung", "sonar / llamar por teléfono", "to make a bell-like sound or to call someone by phone"],
      ["sing", "sang", "sung", "cantar", "to make musical sounds with your voice"],
      ["swim", "swam", "swum", "nadar", "to move through water using your arms and legs"],
      ["drink", "drank", "drunk", "beber", "to take liquid into your mouth and swallow it"],
    ],
  },
  {
    title: "Patrón -ew → -own/-awn",
    explanation: "El past simple suele terminar en -ew y el past participle en -own o -awn.",
    verbs: [
      ["blow", "blew", "blown", "soplar", "to move air, or to make air move, usually with force"],
      ["fly", "flew", "flown", "volar", "to move through the air"],
      ["grow", "grew", "grown", "crecer / cultivar", "to become larger or develop, or to make plants grow"],
      ["know", "knew", "known", "saber / conocer", "to have information, understanding or familiarity with someone or something"],
      ["throw", "threw", "thrown", "lanzar / tirar", "to send something through the air with a movement of the arm"],
      ["draw", "drew", "drawn", "dibujar", "to make a picture or diagram with a pen, pencil or similar tool", "En el Excel original figura ‘drown’; aquí se corrige a ‘drawn’, que es el participio estándar de draw."],
    ],
  },
  {
    title: "Tres formas iguales",
    explanation: "La forma base, el past simple y el past participle son iguales.",
    verbs: [
      ["cut", "cut", "cut", "cortar", "to divide or open something with a sharp tool"],
      ["cost", "cost", "cost", "costar", "to have a particular price"],
      ["hit", "hit", "hit", "golpear", "to touch or strike something with force"],
      ["put", "put", "put", "poner / colocar", "to move something into a particular place or position"],
      ["let", "let", "let", "dejar / permitir", "to allow someone to do something"],
      ["hurt", "hurt", "hurt", "hacer daño / doler", "to cause pain or to feel pain"],
      ["set", "set", "set", "colocar / fijar", "to put something in a particular position or state"],
      ["shut", "shut", "shut", "cerrar", "to close something"],
    ],
  },
  {
    title: "d → t en pasado y participio",
    explanation: "La consonante final cambia normalmente de d a t en past simple y past participle.",
    verbs: [
      ["spend", "spent", "spent", "gastar / pasar tiempo", "to use money, time or energy for a particular purpose"],
      ["send", "sent", "sent", "enviar", "to cause something to go or be delivered to a person or place"],
      ["lend", "lent", "lent", "prestar", "to give something to someone temporarily with the expectation that it will be returned"],
      ["bend", "bent", "bent", "doblar / doblarse", "to curve something or become curved"],
    ],
  },
  {
    title: "Cambio a o en pasado + participio en -en",
    explanation: "El past simple cambia normalmente hacia una forma con o y el past participle añade -en o una terminación equivalente.",
    verbs: [
      ["speak", "spoke", "spoken", "hablar", "to say words or talk to someone"],
      ["wake", "woke", "woken", "despertar / despertarse", "to stop sleeping or cause someone to stop sleeping"],
      ["break", "broke", "broken", "romper", "to damage something so that it separates into pieces or no longer works"],
      ["choose", "chose", "chosen", "elegir", "to decide which person or thing you want from a group of possibilities"],
      ["steal", "stole", "stolen", "robar", "to take something that belongs to someone else without permission"],
      ["freeze", "froze", "frozen", "congelar / congelarse", "to become or make something very cold and solid"],
    ],
  },
  {
    title: "Past simple = past participle",
    explanation: "La forma base cambia, pero past simple y past participle son iguales.",
    verbs: [
      ["meet", "met", "met", "conocer / reunirse con", "to come together with someone, either for the first time or by arrangement"],
      ["sleep", "slept", "slept", "dormir", "to rest with your eyes closed and your mind and body inactive"],
      ["keep", "kept", "kept", "mantener / guardar", "to continue to have, hold or maintain something"],
      ["leave", "left", "left", "dejar / marcharse", "to go away from a place or to leave something behind"],
      ["feel", "felt", "felt", "sentir / sentirse", "to experience an emotion, physical sensation or particular state"],
      ["mean", "meant", "meant", "significar / querer decir", "to have a particular meaning or intention"],
      ["lose", "lost", "lost", "perder", "to stop having something or to be unable to find it"],
      ["sit", "sat", "sat", "sentarse / estar sentado", "to rest with your body supported by your bottom rather than standing"],
      ["build", "built", "built", "construir", "to make something by putting parts or materials together"],
    ],
  },
  {
    title: "-ought / -aught",
    explanation: "Past simple y past participle coinciden y suelen terminar en -ought o -aught.",
    verbs: [
      ["buy", "bought", "bought", "comprar", "to get something by paying money for it"],
      ["bring", "brought", "brought", "traer", "to take or carry someone or something to the place where the speaker is"],
      ["fight", "fought", "fought", "luchar / pelear", "to use force against someone or to struggle against something"],
      ["think", "thought", "thought", "pensar", "to use your mind to consider, form ideas or make decisions"],
      ["teach", "taught", "taught", "enseñar", "to help someone learn by giving instruction or information"],
      ["catch", "caught", "caught", "coger / atrapar", "to stop and hold something that is moving through the air or to capture someone or something"],
    ],
  },
  {
    title: "Base = participio; pasado distinto",
    explanation: "La forma base y el past participle coinciden; el past simple cambia.",
    verbs: [
      ["come", "came", "come", "venir", "to move towards the speaker or towards a particular place"],
      ["become", "became", "become", "convertirse en / llegar a ser", "to begin to be something or develop into a particular state"],
    ],
  },
  {
    title: "-stood en pasado y participio",
    explanation: "Past simple y past participle terminan en -stood.",
    verbs: [
      ["stand", "stood", "stood", "estar de pie", "to be in an upright position on your feet"],
      ["understand", "understood", "understood", "entender / comprender", "to know the meaning of something or how something works"],
    ],
  },
  {
    title: "Pasado con o; participio en -en",
    explanation: "El past simple suele contener o y el past participle termina en -en o en una forma relacionada.",
    verbs: [
      ["get", "got", "got / gotten", "conseguir / obtener", "to receive, obtain or become something; the verb has many other common meanings", "El Excel incluye ‘gotten’. Para Cambridge/BrE, ‘got’ es el participio habitual; ‘gotten’ es principalmente AmE."],
      ["forget", "forgot", "forgotten", "olvidar", "to fail to remember something"],
      ["write", "wrote", "written", "escribir", "to produce words, letters or symbols on a surface or in digital form"],
      ["drive", "drove", "driven", "conducir", "to control and operate a car or other vehicle"],
      ["ride", "rode", "ridden", "montar / ir en", "to travel on a bicycle, motorcycle, horse or similar means of transport"],
      ["rise", "rose", "risen", "subir / elevarse", "to move upwards or become higher"],
    ],
  },
  {
    title: "Participio en -en",
    explanation: "El past participle termina en -en o una variante fonética y ortográfica próxima.",
    verbs: [
      ["fall", "fell", "fallen", "caer", "to move downwards suddenly or unintentionally"],
      ["eat", "ate", "eaten", "comer", "to put food in your mouth, chew it and swallow it"],
      ["hide", "hid", "hidden", "esconder / esconderse", "to put something where it cannot be seen or to go somewhere so that you cannot be seen"],
      ["bite", "bit", "bitten", "morder", "to cut or hold something with your teeth"],
    ],
  },
  {
    title: "-ook → -aken",
    explanation: "El past simple termina en -ook y el past participle en -aken.",
    verbs: [
      ["take", "took", "taken", "tomar / coger / llevar", "to move, carry or use something; the verb has many common meanings"],
      ["shake", "shook", "shaken", "sacudir / agitar", "to move something quickly backwards and forwards or up and down"],
    ],
  },
  {
    title: "Past simple = participio",
    explanation: "Past simple y past participle coinciden en este grupo, aunque la transformación concreta cambia según el verbo.",
    verbs: [
      ["find", "found", "found", "encontrar", "to discover or locate someone or something"],
      ["hear", "heard", "heard", "oír", "to receive sound through your ears"],
      ["make", "made", "made", "hacer / fabricar", "to create, produce or cause something"],
      ["hold", "held", "held", "sostener / sujetar", "to keep something in your hand, arms or a particular position"],
    ],
  },
  {
    title: "sell/tell → sold/told",
    explanation: "En sell y tell, past simple y past participle cambian a sold y told.",
    verbs: [
      ["sell", "sold", "sold", "vender", "to give something to someone in exchange for money"],
      ["tell", "told", "told", "decir / contar", "to give someone information by speaking or writing"],
    ],
  },
  {
    title: "Familia give / forgive",
    explanation: "Give y forgive siguen el mismo patrón: gave/given y forgave/forgiven.",
    verbs: [
      ["give", "gave", "given", "dar", "to provide someone with something or transfer something to them"],
      ["forgive", "forgave", "forgiven", "perdonar", "to stop feeling angry or resentful towards someone for something they did"],
    ],
  },
  {
    title: "Variantes regulares e irregulares",
    explanation: "Estos verbos admiten dos variantes correctas de pasado y participio, una con -t y otra con -ed.",
    verbs: [
      ["learn", "learnt / learned", "learnt / learned", "aprender", "to gain knowledge or a skill through study, experience or teaching"],
      ["dream", "dreamt / dreamed", "dreamt / dreamed", "soñar", "to experience images or ideas while sleeping, or to imagine something you would like to happen"],
    ],
  },
];

export const irregularVerbFormsByTerm = Object.fromEntries(
  irregularVerbGroups.flatMap((group) =>
    group.verbs.map(([base, pastSimple, pastParticiple, , , note]) => [
      base,
      { base, pastSimple, pastParticiple, rule: group.explanation, note },
    ]),
  ),
) as Record<string, IrregularVerbForms>;

const sections: VocabularySection[] = irregularVerbGroups.map((group) => ({
  title: group.title,
  kind: "core",
  entries: group.verbs.map(([base, , , meaningEs, definitionEn, note]) => [
    base,
    meaningEs,
    [group.explanation, note].filter(Boolean).join(" "),
    definitionEn,
  ] as const),
}));

export const irregularVerbsVocabularyTopic: VocabularyTopic = {
  slug: "irregular-verbs",
  title: "Irregular verbs",
  category: "language",
  level: "B2",
  summary: "70 verbos irregulares organizados por patrones. Base form = forma de diccionario; past simple = pasado terminado; past participle = forma usada con have y en la voz pasiva.",
  sourceUnit: 2001,
  source: "User-provided irregular verbs",
  sections,
};
