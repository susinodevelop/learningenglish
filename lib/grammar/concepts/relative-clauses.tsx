import type { GrammarTopic } from "../types";
import { defineGrammarConcept } from "./factory";

const c1Topics: GrammarTopic[] = [
  {
    unit: 2,
    slug: "c1-relative-clauses",
    title: "Relative clauses: register and precision",
    level: "C1",
    examPractice: "Gold C1 · Unit 2 · Grammar reference p. 152",
    summary: "Defining y non-defining relatives con foco C1 en comas, omisión, preposiciones, referencia a ideas completas y registro formal.",
    sections: [
      {
        title: "Defining vs non-defining at C1",
        rules: [
          "Una defining relative identifica el referente y no lleva comas; una non-defining añade información extra y sí lleva comas.",
          "Una defining relative puede identificar una persona, cosa, tiempo, lugar o razón.",
          "That puede sustituir a who/which en defining clauses, pero no en non-defining clauses.",
          "El pronombre relativo puede omitirse en defining clauses si funciona como objeto; no si funciona como sujeto.",
          "La información de una non-defining relative es adicional y puede eliminarse sin perder la identificación del referente.",
          "Quitar las comas a una non-defining clause puede cambiar el significado y restringir el referente.",
          "Después de quantifiers como everything, something y all, el libro señala que normalmente preferimos that frente a which en defining relative clauses.",
        ],
        examples: [
          { english: "The consultant who called yesterday is waiting outside." },
          { english: "The consultant, who called yesterday, is waiting outside.", note: "información adicional" },
          { english: "Everything that we discussed remains confidential.", note: "that tras quantifier" },
        ],
      },
      {
        title: "Which referring to a whole clause",
        rules: [
          "En una non-defining relative clause, which puede referirse no solo a un sustantivo, sino a toda la situación o idea expresada en la clause anterior.",
          "En este uso, la clause con which comenta o expresa una consecuencia de toda la información anterior y va separada por coma.",
          "That no sustituye a which en este patrón porque se trata de una non-defining relative clause.",
        ],
        examples: [
          { english: "The flight was cancelled, which meant we had to stay another night.", note: "which = toda la situación anterior" },
          { english: "He received an unexpected bonus, which allowed him to pay off the debt.", note: "consecuencia de la clause anterior" },
        ],
        traps: ["No interpretes siempre which como referencia al último noun: aquí puede recuperar toda la idea anterior."],
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
          "Whatsoever es una alternativa muy formal a whatever en este uso.",
          "Whenever puede significar 'at any time/every time' o indicar que no sabemos exactamente cuándo ocurrió algo.",
          "Los demás -ever words también pueden adquirir funciones abiertas similares según el referente.",
        ],
        examples: [
          { english: "Take whatever you need." },
          { english: "Call whenever you have a problem." },
          { english: "I'll work wherever I can find a suitable position." },
        ],
      },
      {
        title: "Emphatic -ever questions and replies",
        rules: [
          "Whatever puede funcionar como forma enfática de what y expresar crítica o sorpresa.",
          "However, whenever, wherever y whoever también pueden ser formas enfáticas de how, when, where y who.",
          "Como respuesta aislada, Whatever. puede ser despectivo o impaciente y sonar brusco.",
          "El Gold indica que podemos hacerlo menos descortés añadiendo una clause o dando una respuesta completa.",
        ],
        examples: [
          { english: "Whatever were you thinking?" },
          { english: "Whoever do you think you are?" },
          { english: "Whatever is easiest for you.", note: "respuesta completa y menos brusca" },
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
          "La reducción hace el estilo más compacto.",
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
          "Una participle clause puede sustituir una relación de razón, condición, resultado u otra relación adverbial indicada por el contexto.",
          "Having + past participle marca que la acción de la participle clause ocurrió antes que la de la main clause.",
          "Seen/heard/considered... pueden expresar una lectura pasiva equivalente a if/when/because + passive clause.",
        ],
        examples: [
          { english: "Realising I was late, I took a taxi.", note: "reason" },
          { english: "Having finished the report, she went home.", note: "acción anterior" },
          { english: "Seen from above, the building looks much smaller.", note: "passive condition/viewpoint" },
        ],
        traps: ["Comprueba que el sujeto de la participle clause y el de la main clause sean el mismo; si no, la frase puede interpretarse como incorrecta."],
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
  summary: "Defining y non-defining clauses desde B2 hasta C1, ampliadas con registro formal, referencia a ideas completas, -ever free relatives y participle clauses reducidas.",
  memoryHook: "IDENTIFICA · AÑADE · REDUCE: decide qué información cumple la clause.",
  studyQuestion: "¿La clause identifica, añade información, comenta una idea completa, expresa una referencia abierta o puede reducirse con un participle?",
});
