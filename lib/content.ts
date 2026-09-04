export type GrammarTopic = {
  slug: string;
  title: string;
  level: string;
  summary: string;
  rule: string;
  examples: string[];
};

export const grammarTopics: GrammarTopic[] = [
  {
    slug: "present-tenses",
    title: "Present tenses",
    level: "A2–C1",
    summary: "Present simple, continuous, perfect y perfect continuous sin memorizarlos como cuatro cajas aisladas.",
    rule: "Piensa en dos ejes: ¿hablas de un hecho/estado o de una actividad? ¿conectas el presente con un periodo anterior?",
    examples: ["I work from home on Fridays.", "I’m working from home today.", "I’ve worked here since 2024.", "I’ve been working all morning."],
  },
  {
    slug: "past-tenses",
    title: "Past tenses",
    level: "A2–C1",
    summary: "Past simple, continuous y perfect para ordenar acciones y contexto en una historia.",
    rule: "El past simple mueve la historia; el continuous dibuja lo que estaba en progreso; el perfect mira hacia un pasado todavía anterior.",
    examples: ["I called her yesterday.", "I was driving when she called.", "She had already left when I arrived."],
  },
  {
    slug: "future-forms",
    title: "Future forms",
    level: "B1–C1",
    summary: "Will, be going to, present continuous y present simple según la razón por la que hablamos del futuro.",
    rule: "No elijas por la traducción de ‘futuro’: elige por intención, evidencia, plan cerrado u horario.",
    examples: ["I’ll help you.", "It’s going to rain.", "I’m meeting Sam at six.", "The train leaves at 7:10."],
  },
  {
    slug: "verb-patterns",
    title: "Verb patterns",
    level: "B2–C1",
    summary: "Verb + -ing, verb + to-infinitive, object + to-infinitive y bare infinitive.",
    rule: "El verbo principal decide qué estructura puede venir después. Algunos cambian de significado según uses -ing o to-infinitive.",
    examples: ["I avoid driving at night.", "I decided to leave early.", "They allowed us to enter.", "She made me laugh."],
  },
  {
    slug: "modal-verbs",
    title: "Modal verbs",
    level: "B1–C1",
    summary: "Capacidad, obligación, deducción, posibilidad y crítica con matices de certeza.",
    rule: "Los modales no describen la acción: expresan la actitud del hablante hacia esa acción.",
    examples: ["You must be tired.", "You might be right.", "You should have told me.", "We don’t have to leave yet."],
  },
  {
    slug: "conditionals",
    title: "Conditionals",
    level: "B1–C1",
    summary: "Condiciones reales, hipotéticas y pasadas, incluidos mixed conditionals.",
    rule: "Primero decide si la situación es real o imaginaria y en qué momento ocurre la condición y su consecuencia.",
    examples: ["If I have time, I’ll call you.", "If I had more time, I’d travel more.", "If I’d known, I would have gone.", "If I had slept more, I wouldn’t be so tired now."],
  },
];

export const vocabularyPacks = [
  { title: "Daily life", level: "A2–B1", words: ["commute", "chores", "appointment", "neighbourhood", "routine"] },
  { title: "Work & study", level: "B1–B2", words: ["deadline", "feedback", "assignment", "workload", "achievement"] },
  { title: "Personality", level: "B2–C1", words: ["reliable", "outgoing", "thoughtful", "stubborn", "easy-going"] },
  { title: "Cambridge C1", level: "C1", words: ["compelling", "detrimental", "plausible", "subtle", "overwhelming"] },
];
