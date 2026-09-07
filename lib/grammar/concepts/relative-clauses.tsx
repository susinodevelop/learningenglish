import type { GrammarTopic } from "../types";
import { defineGrammarConcept } from "./factory";

const c1Topics: GrammarTopic[] = [
  {
    unit: 2,
    slug: "c1-relative-clauses",
    title: "Relative clauses: register and precision",
    level: "C1",
    examPractice: "Gold C1 · Unit 2 · Grammar reference p. 152",
    summary: "Defining y non-defining relatives con foco C1 en comas, omisión, preposiciones y registro formal.",
    sections: [
      {
        title: "Defining vs non-defining at C1",
        rules: [
          "Una defining relative identifica el referente y no lleva comas; una non-defining añade información extra y sí lleva comas.",
          "That puede sustituir a who/which en defining clauses, pero no en non-defining clauses.",
          "El pronombre relativo puede omitirse en defining clauses si funciona como objeto; no si funciona como sujeto.",
          "Quitar las comas a una non-defining clause puede cambiar el significado y restringir el referente.",
          "Después de quantifiers como everything, something y all, el libro señala que normalmente preferimos that frente a which en defining relative clauses.",
        ],
        examples: [
          { english: "The consultant who called yesterday is waiting outside." },
          { english: "The consultant, who called yesterday, is waiting outside.", note: "solo hay un consultor relevante" },
          { english: "Everything that we discussed remains confidential.", note: "that tras quantifier" },
        ],
      },
      {
        title: "Prepositions in relative clauses",
        rules: [
          "En registro formal, la preposición puede colocarse antes de whom/which.",
          "En registro neutral o informal, la preposición suele quedarse al final de la relative clause.",
          "No uses that inmediatamente después de una preposición adelantada.",
        ],
        examples: [
          { english: "The person to whom I spoke was very helpful.", note: "formal" },
          { english: "The person who I spoke to was very helpful.", note: "neutral" },
        ],
      },
    ],
  },
  {
    unit: 10,
    slug: "c1-ever-words",
    title: "Whoever, whatever, whenever, wherever, however",
    level: "C1",
    examPractice: "Gold C1 · Unit 10 · Grammar reference pp. 162–163",
    summary: "-ever words como free relatives, concesión, indeterminación y formas enfáticas.",
    sections: [
      {
        title: "No matter / it doesn't matter meaning",
        rules: [
          "However, whatever, whenever, wherever, whichever y whoever pueden significar 'no matter...' o 'it doesn't matter...'.",
          "La clause con -ever puede expresar concesión: el resultado se mantiene independientemente de quién, qué, dónde, cuándo o cómo.",
        ],
        examples: [
          { english: "However hard you try, you can't please everyone." },
          { english: "Whatever happens, call me." },
          { english: "Whoever wins, the final will be close." },
        ],
      },
      {
        title: "Free relatives and additional meanings",
        rules: [
          "Whatever puede funcionar como pronoun/determiner con el significado 'anything that/any thing which'.",
          "Whatsoever es una variante muy formal y enfática de whatever en ciertos contextos.",
          "Whenever puede significar 'at any time/every time' o indicar que el momento exacto no importa/no se recuerda.",
          "Wherever y whoever también pueden funcionar como free relatives con significado abierto: any place/person that....",
        ],
        examples: [
          { english: "Take whatever you need." },
          { english: "Call whenever you have a problem." },
          { english: "I'll work wherever I can find a suitable position." },
        ],
      },
      {
        title: "Emphatic -ever questions",
        rules: [
          "Whatever, however, whenever, wherever y whoever pueden reforzar preguntas y expresar sorpresa, crítica o incredulidad.",
          "En conversación, Whatever. también puede ser una respuesta despectiva o impaciente y puede sonar brusca.",
          "Como respuesta corta, Whatever. también puede significar 'I don't mind', aunque puede sonar impaciente o brusco; whatever you like/prefer resulta más cortés.",
        ],
        examples: [
          { english: "Whatever were you thinking?" },
          { english: "Whoever told you that?" },
          { english: "Whatever you prefer is fine with me.", note: "respuesta más cortés" },
        ],
        traps: ["Whatever. como respuesta aislada puede sonar grosero; el tono pragmático importa en C1."],
      },
    ],
  },
  {
    unit: 10,
    slug: "c1-participle-clauses",
    title: "Participle clauses",
    level: "C1",
    examPractice: "Gold C1 · Unit 10 · Grammar reference p. 163",
    summary: "-ing, -ed y perfect participle clauses para reducir relativas y expresar relaciones lógicas con concisión.",
    sections: [
      {
        title: "Reduced relative clauses",
        rules: [
          "An -ing participle tiene significado activo y puede sustituir una relative clause con verbo activo.",
          "An -ed participle tiene significado pasivo y puede sustituir una relative clause con verbo pasivo.",
          "La reducción hace el estilo más compacto, especialmente en escritura formal.",
        ],
        examples: [
          { english: "The people waiting outside have appointments." },
          { english: "The report published yesterday contains several errors." },
        ],
      },
      {
        title: "Participle clauses for reason, time, condition and result",
        rules: [
          "Después de conjunctions como before/after podemos usar -ing cuando el sujeto se mantiene claro.",
          "Una participle clause puede sustituir una adverbial clause de razón, tiempo, condición o resultado.",
          "Having + past participle marca que la acción de la participle clause ocurrió antes que la de la main clause.",
          "Seen/heard/considered... pueden expresar una lectura pasiva equivalente a if/when/because + passive clause.",
        ],
        examples: [
          { english: "Realising I was late, I took a taxi.", note: "reason" },
          { english: "Having finished the report, she went home.", note: "acción anterior" },
          { english: "Seen from above, the building looks much smaller.", note: "passive condition/viewpoint" },
        ],
        traps: ["El sujeto implícito de la participle clause debe coincidir lógicamente con el sujeto de la main clause; evita dangling participles."],
      },
    ],
  },
];

export const relativeClauses = defineGrammarConcept({
  slug: "relative-clauses",
  title: "Relative clauses & reduced relatives",
  category: "complex-structures",
  sourceSlugs: ["relative-clauses"],
  additionalTopics: c1Topics,
  summary: "Defining y non-defining clauses desde B2 hasta C1, ampliadas con registro formal, -ever free relatives y participle clauses reducidas.",
  memoryHook: "IDENTIFICA · AÑADE · REDUCE: decide qué información cumple la clause.",
  studyQuestion: "¿La clause identifica, añade información, expresa una referencia abierta o puede reducirse con un participle?",
});
