import type { GrammarTopic } from "../types";

type GrammarPatch = {
  topicSlug: string;
  sectionTitle: string;
  forms?: string[];
  rules?: string[];
};

const patches: GrammarPatch[] = [
  {
    topicSlug: "past-tenses",
    sectionTitle: "be used to / get used to",
    forms: ["? be + subject + used to + noun/pronoun/verb-ing?"],
    rules: [
      "La pregunta con be used to se forma invirtiendo be: Are you used to + noun/pronoun/verb-ing?",
    ],
  },
  {
    topicSlug: "present-perfect-and-past-simple",
    sectionTitle: "Present perfect simple vs past simple",
    rules: [
      "El past simple también se usa cuando un lugar o contexto concreto sitúa claramente el hecho en una ocasión pasada ya terminada; no hace falta que aparezca una fecha u hora explícita.",
    ],
  },
  {
    topicSlug: "adverbs",
    sectionTitle: "Adverbs and adjectives easily confused",
    rules: [
      "Hardly suele combinarse con ever y any. Puede aparecer en distintas posiciones: hardly ever = casi nunca; hardly anyone/anything/any = casi nadie, casi nada o casi ningún/ninguna.",
    ],
  },
  {
    topicSlug: "adverbs",
    sectionTitle: "Modifying adverbs and adjectives",
    rules: [
      "La escala de intensidad del libro va, aproximadamente, de más fuerte a más débil: incredibly → extremely → really → very → rather → fairly → quite → slightly.",
    ],
  },
  {
    topicSlug: "modals-2",
    sectionTitle: "Orders and advice: strength scale",
    rules: [
      "Ought not to también es posible para consejo negativo, pero es menos frecuente que had better not o shouldn’t.",
    ],
  },
  {
    topicSlug: "conditionals-1",
    sectionTitle: "Second conditional",
    forms: ["if + past, might/could + infinitive"],
    rules: [
      "Might y could pueden usarse a veces en lugar de would en second conditionals. El libro señala la misma posibilidad en third conditionals.",
    ],
  },
  {
    topicSlug: "to-infinitive-and-ing",
    sectionTitle: "Verb + that clause",
    rules: [
      "Todos los verbos que el libro marca con * en esta unidad pueden ir también con una that-clause con significado equivalente.",
      "Marcados * en Verb + to infinitive: agree, arrange, decide, demand, hope, pretend.",
      "Marcados * en object + to infinitive: advise, persuade, remind, teach, tell, warn.",
      "Marcados * entre los verbos que pueden llevar objeto o no antes del to-infinitive: expect, intend, promise.",
      "Marcados * en Verb + -ing: admit, consider, deny, imagine, mention, recommend, suggest.",
      "También aparecen marcados * propose; y, entre los verbos cuyo significado cambia con to-infinitive / -ing, remember, forget y regret.",
    ],
  },
  {
    topicSlug: "to-infinitive-and-ing",
    sectionTitle: "Adjective + to infinitive",
    rules: [
      "En la lista del libro, dangerous, difficult, easy, hard y nice son exactamente los adjetivos marcados que también pueden ir con -ing con un significado similar.",
    ],
  },
  {
    topicSlug: "conditionals-2",
    sectionTitle: "I wish / if only: present situations",
    rules: [
      "I wish e if only expresan el mismo tipo de deseo; if only es menos frecuente y normalmente más enfático o fuerte.",
    ],
  },
];

function appendUnique(base: string[] | undefined, additions: string[] | undefined) {
  if (!additions?.length) return base;
  return Array.from(new Set([...(base ?? []), ...additions]));
}

export function applyBookFidelityPatches(topics: GrammarTopic[]): GrammarTopic[] {
  const pending = new Set(patches.map((patch) => `${patch.topicSlug}::${patch.sectionTitle}`));

  const completed = topics.map((topic) => {
    const topicPatches = patches.filter((patch) => patch.topicSlug === topic.slug);
    if (topicPatches.length === 0) return topic;

    return {
      ...topic,
      sections: topic.sections.map((section) => {
        const patch = topicPatches.find((candidate) => candidate.sectionTitle === section.title);
        if (!patch) return section;

        pending.delete(`${patch.topicSlug}::${patch.sectionTitle}`);

        return {
          ...section,
          forms: appendUnique(section.forms, patch.forms),
          rules: appendUnique(section.rules, patch.rules) ?? section.rules,
        };
      }),
    };
  });

  if (pending.size > 0) {
    throw new Error(`Grammar fidelity patch target not found: ${Array.from(pending).join(", ")}`);
  }

  return completed;
}
