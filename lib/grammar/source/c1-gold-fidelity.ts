import type { GrammarSection, GrammarTopic } from "../types";

function appendSection(topic: GrammarTopic, section: GrammarSection): GrammarTopic {
  return { ...topic, sections: [...topic.sections, section] };
}

function updateSection(
  topic: GrammarTopic,
  title: string,
  updater: (section: GrammarSection) => GrammarSection,
): GrammarTopic {
  return {
    ...topic,
    sections: topic.sections.map((section) => (section.title === title ? updater(section) : section)),
  };
}

export function applyC1GoldFidelityPatches(topics: GrammarTopic[]): GrammarTopic[] {
  return topics.map((originalTopic) => {
    let topic = originalTopic;

    if (topic.slug === "c1-present-aspect") {
      topic = {
        ...topic,
        summary:
          "Contraste avanzado entre perfect simple y perfect continuous en presente, pasado y futuro, además del foco resultado/cantidad frente a duración/proceso.",
      };
      topic = appendSection(topic, {
        title: "Past perfect simple vs past perfect continuous",
        forms: ["had + past participle", "had been + verb-ing"],
        rules: [
          "Ambas formas sitúan una acción antes de otro punto del pasado.",
          "Past perfect simple destaca el hecho, resultado o acción completada anterior.",
          "Past perfect continuous destaca la duración, repetición o actividad en progreso anterior.",
          "La elección depende del foco que queremos dar, no solo del orden cronológico.",
        ],
        examples: [
          { english: "She had completed the training before she applied.", note: "resultado completado" },
          { english: "She had been training for months before she applied.", note: "duración/proceso" },
        ],
      });
      topic = appendSection(topic, {
        title: "Future perfect simple vs future perfect continuous",
        forms: ["will have + past participle", "will have been + verb-ing"],
        rules: [
          "Future perfect simple presenta una acción o cantidad como completada antes de un punto futuro.",
          "Future perfect continuous presenta la duración o continuidad de una actividad hasta un punto futuro.",
          "Con for + período, ambas formas pueden ser posibles con algunos verbos de larga duración; cambia el énfasis entre estado/resultado y proceso/duración.",
        ],
        examples: [
          { english: "By December, I will have completed the course.", note: "acción completada" },
          { english: "By December, I will have been studying for a year.", note: "duración hasta un punto futuro" },
        ],
        traps: ["No olvides been en future perfect continuous: will have been + verb-ing."],
      });
    }

    if (topic.slug === "c1-conjunctions") {
      topic = updateSection(topic, "Contrast, addition, condition and reason", (section) => ({
        ...section,
        rules: [
          ...section.rules,
          "As también puede añadir información con orden verb/auxiliary + subject: Buying a car is expensive, as is insurance.",
        ],
      }));
      topic = appendSection(topic, {
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
      });
    }

    if (topic.slug === "c1-relative-clauses") {
      topic = updateSection(topic, "Defining vs non-defining at C1", (section) => ({
        ...section,
        rules: [
          ...section.rules,
          "Después de quantifiers como everything, something y all, el libro señala que normalmente preferimos that frente a which en defining relative clauses.",
        ],
        examples: [
          ...(section.examples ?? []),
          { english: "Everything that we discussed remains confidential.", note: "that tras quantifier" },
        ],
      }));
    }

    if (topic.slug === "c1-introductory-it") {
      topic = appendSection(topic, {
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
      });
    }

    if (topic.slug === "c1-verb-patterns") {
      topic = updateSection(topic, "Verb + to-infinitive", (section) => ({
        ...section,
        rules: [
          "El libro incluye entre los verbos frecuentes seguidos de to-infinitive: afford, agree, appear, arrange, ask, attempt, bear, begin, care, choose, consent, decide, determine, expect, fail, forget, happen, hate, help, hesitate, hope, intend, learn, like, love, manage, mean, offer, prefer, prepare, pretend, promise, propose, refuse, remember, seem, start, swear, try, want y wish.",
          "Algunos de ellos también admiten otros patrones; el significado y el contexto determinan la opción correcta.",
        ],
      }));
      topic = updateSection(topic, "Verb + object + to-infinitive / bare infinitive", (section) => ({
        ...section,
        rules: [
          "El libro incluye con object + to-infinitive: advise, allow, ask, cause, command, encourage, expect, forbid, force, get, hate, help, instruct, intend, invite, leave, like, mean, need, oblige, order, permit, persuade, prefer, press, recommend, remind, request, teach, tell, tempt, trouble, want, warn y wish.",
          "Let, make, hear y help aparecen con object + infinitive without to.",
          "En pasiva, make, hear y help pasan a to-infinitive: was made to..., was heard to....",
          "Las formas pasivas con advise/order/etc. también van seguidas de to-infinitive.",
        ],
        traps: ["Make + object usa bare infinitive en activa, pero to-infinitive en pasiva."],
      }));
    }

    if (topic.slug === "c1-hypothetical-meaning") {
      topic = updateSection(topic, "Wish: present, behaviour and regret", (section) => ({
        ...section,
        rules: section.rules.map((rule) =>
          rule.startsWith("Para deseos sobre nuestra propia capacidad")
            ? "Para deseos sobre nuestra propia capacidad o sobre un hábito propio que querríamos cambiar, usamos normalmente wish + could, no wish + would."
            : rule,
        ),
      }));
    }

    if (topic.slug === "c1-comparing") {
      topic = updateSection(topic, "Intensifying and weakening comparisons", (section) => ({
        ...section,
        rules: [
          ...section.rules,
          "Very much puede intensificar comparatives como very much bigger o very much better.",
        ],
      }));
      topic = updateSection(topic, "Like and nothing like as", (section) => ({
        ...section,
        rules: section.rules.map((rule) =>
          rule === "Like + noun expresa similitud."
            ? "Like + noun o gerund expresa similitud."
            : rule,
        ),
        examples: [
          ...(section.examples ?? []),
          { english: "Learning a language is like training a muscle.", note: "like + gerund" },
        ],
      }));
    }

    if (topic.slug === "c1-modifying-adverbs") {
      topic = updateSection(topic, "Gradable adjectives and adverbs", (section) => ({
        ...section,
        rules: [
          "Los gradable adjectives/adverbs admiten modificadores como bitterly, barely, deeply, somewhat, seriously, really, extremely, practically, entirely, pretty, completely, quite, scarcely, totally y very.",
          "El libro presenta collocations concretas: bitterly cold/ashamed/disappointed/divided; barely alive/legible/comprehensible; completely serious/open/honest; deeply serious/painful/sorry.",
          "También aparecen entirely convinced/clear/satisfactory; pretty doubtful/hopeless; perfectly capable/aware/reasonable/normal/safe/straightforward/sure; seriously alarmed/worried/hurt.",
          "La elección correcta depende de collocation: conviene aprender modifier + adjective como unidad.",
        ],
      }));
    }

    if (topic.slug === "c1-conditionals-advanced") {
      topic = {
        ...topic,
        sections: [
          {
            title: "Review: flexible tense choices in conditionals",
            rules: [
              "En first conditional, el if-clause puede usar present simple, present continuous o present perfect según el significado; la main clause puede llevar future form o imperative.",
              "En second conditional, el if-clause puede usar past simple o past continuous para una situación presente/futura imaginaria.",
              "Zero conditional también puede aparecer con when o unless cuando el significado lo permite.",
              "Los modals permiten ajustar posibilidad, capacidad, consejo o consecuencia dentro de distintos tipos de conditional.",
            ],
            examples: [
              { english: "If you've finished, send me the final version." },
              { english: "If I were working from home, I'd save two hours a day." },
            ],
          },
          ...topic.sections,
        ],
      };
      topic = appendSection(topic, {
        title: "If + were to for greater hypothetical distance",
        forms: ["if + subject + were to + infinitive, ..."],
        rules: [
          "If + were to + infinitive hace que una posibilidad presente o futura suene más hipotética o remota.",
          "No es lo mismo que la inversión formal Were + subject...: aquí if se mantiene.",
        ],
        examples: [
          { english: "If the company were to cancel the project, we would need a new plan." },
        ],
      });
    }

    if (topic.slug === "c1-future-in-the-past") {
      topic = updateSection(topic, "Future viewed from a past perspective", (section) => ({
        ...section,
        rules: [
          ...section.rules,
          "El libro señala que was/were to es especialmente frecuente en formal written English como alternativa a would para acontecimientos previstos desde el pasado.",
        ],
      }));
    }

    if (topic.slug === "c1-ever-words") {
      topic = updateSection(topic, "Emphatic -ever questions", (section) => ({
        ...section,
        rules: [
          ...section.rules,
          "Como respuesta corta, Whatever. también puede significar 'I don't mind', aunque puede sonar impaciente o brusco; whatever you like/prefer resulta más cortés.",
        ],
        examples: [
          ...(section.examples ?? []),
          { english: "Whatever you prefer is fine with me.", note: "respuesta más cortés" },
        ],
      }));
    }

    return topic;
  });
}
