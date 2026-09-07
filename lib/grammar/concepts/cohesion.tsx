import type { GrammarTopic } from "../types";
import { defineGrammarConcept } from "./factory";

const c1Topics: GrammarTopic[] = [
  {
    unit: 5,
    slug: "c1-substitution-ellipsis",
    title: "Substitution and ellipsis",
    level: "C1",
    examPractice: "Gold C1 · Unit 5 · Grammar reference pp. 155–156",
    summary: "Cómo evitar repeticiones sustituyendo u omitiendo información recuperable del contexto.",
    sections: [
      {
        title: "Substitution",
        rules: [
          "Substitution evita repetir una palabra, verbo o idea usando elementos como it, one, do, there, that, so, neither y not.",
          "El sustituto debe recuperar de forma inequívoca un referente ya disponible en el contexto.",
          "So/not pueden sustituir una clause completa después de verbos de opinión, expectativa o posibilidad en determinados patrones.",
          "Neither/nor + auxiliary + subject permite evitar repetir una oración negativa completa.",
        ],
        examples: [
          { english: "I need a charger. Do you have one?" },
          { english: "Will they approve it? I hope so." },
          { english: "I don't enjoy long flights, and neither does Marta." },
        ],
      },
      {
        title: "Ellipsis",
        intro: "Con ellipsis no sustituimos el elemento repetido: simplemente lo omitimos porque el oyente o lector puede reconstruirlo.",
        rules: [
          "Puede aparecer después de and, but y or cuando las dos coordinadas comparten material.",
          "Es frecuente al final de verb phrases cuando el auxiliary conserva la información gramatical necesaria.",
          "Con infinitives podemos conservar solo to cuando el verbo principal ya está claro.",
          "La ellipsis es especialmente frecuente en conversación informal y respuestas breves.",
        ],
        examples: [
          { english: "She wanted to come, but she couldn't." },
          { english: "I didn't want to leave, but I had to." },
          { english: "Going out tonight? Not sure yet.", note: "ellipsis conversacional" },
        ],
      },
    ],
  },
  {
    unit: 11,
    slug: "c1-linking-adverbials",
    title: "Linking adverbials",
    level: "C1",
    examPractice: "Gold C1 · Unit 11 · Grammar reference p. 164",
    summary: "Sentence-level connectors para añadir, justificar, concluir y contrastar con cohesión formal.",
    sections: [
      {
        title: "Adding information",
        rules: [
          "Additionally, as well as, besides (this), furthermore, moreover y what's more añaden información.",
          "Los linking adverbials suelen aparecer al principio de una sentence y van seguidos de comma cuando funcionan como sentence adverbials.",
        ],
        examples: [{ english: "The plan is expensive. Moreover, it would take years to implement." }],
      },
      {
        title: "Reason and result",
        rules: [
          "For this reason, consequently, as a result, in view of y given pueden conectar una causa con su consecuencia.",
          "La elección depende de la estructura: given/in view of suelen introducir un noun phrase o una circunstancia; consequently/as a result conectan el resultado como oración independiente.",
        ],
        examples: [{ english: "Demand fell sharply. Consequently, production was reduced." }],
      },
      {
        title: "Contrast and alternative",
        rules: [
          "On the contrary, on the other hand, in contrast, alternatively, despite this y even so expresan distintos tipos de contraste.",
          "On the contrary corrige o niega una idea anterior; on the other hand introduce otro lado de la comparación, por lo que no son sinónimos perfectos.",
        ],
        examples: [
          { english: "The journey was exhausting. Even so, I'd do it again." },
          { english: "We could postpone the launch. Alternatively, we could reduce the scope." },
        ],
      },
    ],
  },
  {
    unit: 12,
    slug: "c1-cohesion",
    title: "Cohesion",
    level: "C1",
    examPractice: "Gold C1 · Unit 12 · Grammar reference pp. 164–165",
    summary: "Coherence, grammatical cohesion y lexical cohesion como sistema para conectar información a lo largo de un texto.",
    sections: [
      {
        title: "Coherence vs cohesion",
        rules: [
          "Un texto es coherent cuando las ideas mantienen conexiones lógicas comprensibles.",
          "Los cohesive devices hacen visibles esas conexiones lingüísticamente.",
          "Grammatical cohesion incluye reference, substitution, ellipsis y conjunction.",
          "Lexical cohesion crea vínculos mediante collocations, repetición controlada, synonyms, antonyms y relaciones de vocabulario.",
        ],
        examples: [{ english: "The policy was revised. This reduced the number of complaints.", note: "reference" }],
      },
      {
        title: "Reference",
        rules: [
          "Pronouns y determiners pueden señalar hacia información anterior o posterior en el texto.",
          "La referencia debe ser inequívoca: el lector debe poder identificar a qué elemento remite it, this, that, these, those, him, her, etc.",
        ],
        examples: [{ english: "Marta reviewed the proposal. She found two major problems in it." }],
      },
      {
        title: "Substitution, ellipsis and conjunction as cohesive devices",
        rules: [
          "Substitution reemplaza un noun, verb o incluso una phrase para evitar repetirla.",
          "Ellipsis omite información recuperable del contexto.",
          "Coordinating conjunctions: and, or, but, so, nor y yet.",
          "El Gold enumera como subordinating conjunctions: after, although, as, as far as, as if, as long as, as soon as, as though, because, before, if, in order that, since, so, so that, than, though, unless, until, when, whenever, where, whereas, wherever y while.",
          "Las subordinating conjunctions enlazan una subordinate clause con la main clause.",
        ],
        examples: [
          { english: "I ordered the vegetarian option, and Eva did too.", note: "substitution" },
          { english: "I wanted to stay, but I couldn't.", note: "ellipsis" },
          { english: "As far as I'm concerned, he can take over responsibility next week.", note: "subordination" },
        ],
      },
    ],
  },
];

export const cohesion = defineGrammarConcept({
  slug: "cohesion",
  title: "Cohesion",
  category: "complex-structures",
  sourceSlugs: [],
  additionalTopics: c1Topics,
  summary: "Concepto C1 para conectar un texto completo: substitution, ellipsis, reference, linking adverbials y lexical/grammatical cohesion.",
  memoryHook: "NO REPITAS: REFERENCIA · SUSTITUYE · OMITE · CONECTA.",
  studyQuestion: "¿Cómo conectas esta idea con lo anterior sin repetir información ni perder claridad?",
});
