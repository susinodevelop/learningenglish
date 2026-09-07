import type { GrammarTopic } from "./types";

export const c1GoldGrammarUnits10to12: GrammarTopic[] = [
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
            "La clause con -ever puede expresar concesión: el resultado se mantiene independientemente de quién, qué, dónde, cuándo o cómo."
          ],
          examples: [
            { english: "However hard you try, you can't please everyone." },
            { english: "Whatever happens, call me." },
            { english: "Whoever wins, the final will be close." }
          ]
        },
        {
          title: "Free relatives and additional meanings",
          rules: [
            "Whatever puede funcionar como pronoun/determiner con el significado 'anything that/any thing which'.",
            "Whatsoever es una variante muy formal y enfática de whatever en ciertos contextos.",
            "Whenever puede significar 'at any time/every time' o indicar que el momento exacto no importa/no se recuerda.",
            "Wherever y whoever también pueden funcionar como free relatives con significado abierto: any place/person that...."
          ],
          examples: [
            { english: "Take whatever you need." },
            { english: "Call whenever you have a problem." },
            { english: "I'll work wherever I can find a suitable position." }
          ]
        },
        {
          title: "Emphatic -ever questions",
          rules: [
            "Whatever, however, whenever, wherever y whoever pueden reforzar preguntas y expresar sorpresa, crítica o incredulidad.",
            "En conversación, Whatever. también puede ser una respuesta despectiva o impaciente y puede sonar brusca."
          ],
          examples: [
            { english: "Whatever were you thinking?" },
            { english: "Whoever told you that?" }
          ],
          traps: ["Whatever. como respuesta aislada puede sonar grosero; el tono pragmático importa en C1."]
        }
      ]
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
            "La reducción hace el estilo más compacto, especialmente en escritura formal."
          ],
          examples: [
            { english: "The people waiting outside have appointments." },
            { english: "The report published yesterday contains several errors." }
          ]
        },
        {
          title: "Participle clauses for reason, time, condition and result",
          rules: [
            "Después de conjunctions como before/after podemos usar -ing cuando el sujeto se mantiene claro.",
            "Una participle clause puede sustituir una adverbial clause de razón, tiempo, condición o resultado.",
            "Having + past participle marca que la acción de la participle clause ocurrió antes que la de la main clause.",
            "Seen/heard/considered... pueden expresar una lectura pasiva equivalente a if/when/because + passive clause."
          ],
          examples: [
            { english: "Realising I was late, I took a taxi.", note: "reason" },
            { english: "Having finished the report, she went home.", note: "acción anterior" },
            { english: "Seen from above, the building looks much smaller.", note: "passive condition/viewpoint" }
          ],
          traps: ["El sujeto implícito de la participle clause debe coincidir lógicamente con el sujeto de la main clause; evita dangling participles."]
        }
      ]
    },
  {
      unit: 11,
      slug: "c1-passive",
      title: "Passive forms: C1 register",
      level: "C1",
      examPractice: "Gold C1 · Unit 11 · Grammar reference pp. 163–164",
      summary: "Pasiva en tiempos y modals complejos, con especial foco en reporting passives formales.",
      sections: [
        {
          title: "Passive across complex verb forms",
          forms: ["appropriate form of be + past participle"],
          rules: [
            "La passive puede formarse en prácticamente cualquier tense o modal structure usando la forma adecuada de be + past participle.",
            "En academic writing y business reports es frecuente porque permite centrar el mensaje en el proceso, resultado o entidad afectada, no en el agente.",
            "Con modal perfect forms aparecen estructuras como must have been + past participle; con future perfect, will have been + past participle."
          ],
          examples: [
            { english: "The project will have been completed by Friday." },
            { english: "The documents must have been sent to the wrong address." }
          ]
        },
        {
          title: "Impersonal passive reporting structures",
          forms: ["It + be + past participle + that-clause", "subject + be + past participle + to-infinitive"],
          rules: [
            "Reporting verbs como believe, claim, report, say y think son frecuentes en passive structures formales cuando la fuente no importa o no se especifica.",
            "It is/was + past participle + that-clause mantiene la información en una construcción impersonal.",
            "Subject + be + past participle + to-infinitive desplaza el foco hacia la persona/cosa reportada."
          ],
          examples: [
            { english: "It is believed that the market will recover." },
            { english: "The minister is thought to be considering new measures." }
          ]
        }
      ]
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
            "Los linking adverbials suelen aparecer al principio de una sentence y van seguidos de comma cuando funcionan como sentence adverbials."
          ],
          examples: [
            { english: "The plan is expensive. Moreover, it would take years to implement." }
          ]
        },
        {
          title: "Reason and result",
          rules: [
            "For this reason, consequently, as a result, in view of y given pueden conectar una causa con su consecuencia.",
            "La elección depende de la estructura: given/in view of suelen introducir un noun phrase o una circunstancia; consequently/as a result conectan el resultado como oración independiente."
          ],
          examples: [
            { english: "Demand fell sharply. Consequently, production was reduced." }
          ]
        },
        {
          title: "Contrast and alternative",
          rules: [
            "On the contrary, on the other hand, in contrast, alternatively, despite this y even so expresan distintos tipos de contraste.",
            "On the contrary corrige o niega una idea anterior; on the other hand introduce otro lado de la comparación, por lo que no son sinónimos perfectos."
          ],
          examples: [
            { english: "The journey was exhausting. Even so, I'd do it again." },
            { english: "We could postpone the launch. Alternatively, we could reduce the scope." }
          ]
        }
      ]
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
            "Lexical cohesion crea vínculos mediante collocations, repetición controlada, synonyms, antonyms y relaciones de vocabulario."
          ],
          examples: [
            { english: "The policy was revised. This reduced the number of complaints.", note: "reference" }
          ]
        },
        {
          title: "Reference",
          rules: [
            "Pronouns y determiners pueden señalar hacia información anterior o posterior en el texto.",
            "La referencia debe ser inequívoca: el lector debe poder identificar a qué elemento remite it, this, that, these, those, him, her, etc."
          ],
          examples: [
            { english: "Marta reviewed the proposal. She found two major problems in it." }
          ]
        },
        {
          title: "Substitution, ellipsis and conjunction as cohesive devices",
          rules: [
            "Substitution reemplaza un elemento repetido con one, do, so, etc.",
            "Ellipsis omite información recuperable del contexto.",
            "Coordinating conjunctions incluyen and, or, but, so, nor y yet.",
            "Subordinating conjunctions como although, because, if, unless, whereas, while, as long as, so that, etc. conectan una subordinate clause con la main clause."
          ],
          examples: [
            { english: "I ordered the vegetarian option, and Eva did too.", note: "substitution" },
            { english: "I wanted to stay, but I couldn't.", note: "ellipsis" }
          ]
        }
      ]
    },
  {
      unit: 12,
      slug: "c1-inversion",
      title: "Emphasis with inversion",
      level: "C1",
      examPractice: "Gold C1 · Unit 12 · Grammar reference p. 165",
      summary: "Inversión tras negative/restrictive adverbials para énfasis formal y literario.",
      sections: [
        {
          title: "Negative adverbs and adverbial expressions",
          forms: ["negative/restrictive adverbial + auxiliary + subject + main verb"],
          rules: [
            "Cuando una expresión negativa se adelanta al principio de la clause para énfasis, invertimos auxiliary y subject.",
            "Son frecuentes under no circumstances, at no time, not until, nowhere, on no account y expresiones similares.",
            "Si la oración original no tiene auxiliary, añadimos do/does/did según corresponda."
          ],
          examples: [
            { english: "Under no circumstances should you reveal the password." },
            { english: "At no time did he admit responsibility." },
            { english: "Not until midnight did they announce the result." }
          ]
        },
        {
          title: "Restrictive expressions",
          rules: [
            "Hardly, no sooner, seldom, little, never, only when y not only pueden provocar inversión cuando se colocan al inicio.",
            "Hardly...when y no sooner...than son pares frecuentes.",
            "Only + time/condition expression provoca inversión en la main clause que sigue, no necesariamente dentro de la clause introducida por only.",
            "Estas estructuras son especialmente frecuentes en registro formal o literario."
          ],
          examples: [
            { english: "Hardly had I sat down when the phone rang." },
            { english: "No sooner had we arrived than the storm began." },
            { english: "Little did she know what was about to happen." },
            { english: "Not only did he miss the deadline, he also lost the data." }
          ],
          traps: ["Hardly combina típicamente con when; no sooner con than."]
        }
      ]
    }
];
