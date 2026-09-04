import type { GrammarTopic } from "./types";

export const grammarUnits01to06: GrammarTopic[] = [
  {
    unit: 1,
    slug: "present-tenses",
    title: "Present tenses",
    level: "B2",
    examPractice: "Listening Part 4",
    summary: "Present simple, present continuous, state verbs y el uso especial de be en continuo.",
    sections: [
      {
        title: "Present simple",
        forms: ["+ subject + verb / verb-s", "- subject + do/does not + verb", "? do/does + subject + verb?"],
        rules: [
          "Se usa para hechos o acciones que ocurren regularmente.",
          "Describe situaciones permanentes o de larga duración.",
          "Expresa verdades generales y hechos que consideramos estables.",
          "Sirve para hábitos y frecuencia.",
          "También se usa para resumir la trama de libros y películas."
        ],
        examples: [
          { english: "I take the train to work every day.", note: "rutina" },
          { english: "She lives in Bristol.", note: "situación estable" },
          { english: "Water boils at 100°C.", note: "verdad general" },
          { english: "The story begins in a small village.", note: "trama" }
        ]
      },
      {
        title: "Present continuous",
        forms: ["+ subject + am/is/are + verb-ing", "- subject + am/is/are not + verb-ing", "? am/is/are + subject + verb-ing?"],
        rules: [
          "Se usa para algo que está ocurriendo en el momento de hablar.",
          "Marca situaciones temporales; suelen aparecer expresiones como now, at the moment, at present o just.",
          "Puede describir una actividad que está en progreso alrededor del momento actual aunque justo ahora esté interrumpida.",
          "Expresa cambios o situaciones que se están desarrollando.",
          "Con always o continually puede expresar crítica o queja.",
          "Con always también puede señalar algo inesperado que sucede repetidamente."
        ],
        examples: [
          { english: "I’m working from home this week.", note: "temporal" },
          { english: "Prices are rising quickly.", note: "cambio" },
          { english: "You’re always leaving the lights on!", note: "queja" },
          { english: "I’m always running into Maya at the station.", note: "repetición inesperada" }
        ]
      },
      {
        title: "State verbs",
        intro: "Los state verbs suelen describir estados mentales, sentimientos, posesión, sentidos u otras condiciones, por eso normalmente van en tiempos simples.",
        rules: [
          "Pensamiento/creencia: believe, know, mean, realise, recognise, remember, suppose, understand, feel (= believe), think (= believe).",
          "Sentimientos: adore, dislike, despise, hate, like, love, want, wish, prefer.",
          "Posesión: belong, have (= possess), own, possess.",
          "Sentidos: smell, taste, hear, see. Con estos verbos puede usarse can para enfatizar percepción en este momento.",
          "Otros frecuentes: need, contain, deserve, fit, seem, look (= seem), look like, matter, weigh.",
          "Algunos cambian a uso dinámico cuando cambia el significado: think = reflexionar, have = experimentar/comer, taste/smell = probar/oler activamente, see = reunirse con alguien, weigh = pesar algo.",
          "Listen to, watch y look at son acciones, no state verbs, por lo que sí admiten continuo."
        ],
        examples: [
          { english: "I think you’re right.", note: "opinión: estado" },
          { english: "I’m thinking about changing jobs.", note: "proceso mental: acción" },
          { english: "She has two brothers.", note: "posesión" },
          { english: "We’re having lunch.", note: "actividad" },
          { english: "I can hear music downstairs.", note: "percepción actual" },
          { english: "The chef is tasting the soup.", note: "acción voluntaria" }
        ],
        traps: [
          "No uses automáticamente un Continuous solo porque la acción sea 'ahora': primero comprueba si el verbo describe un estado.",
          "El mismo verbo puede ser state o dynamic según el significado."
        ]
      },
      {
        title: "The verb to be: simple vs continuous",
        rules: [
          "Be normalmente se usa en forma simple para describir una característica o estado.",
          "Be + being enfatiza que un comportamiento o situación es temporal, no una característica permanente de la persona."
        ],
        examples: [
          { english: "Leo is quiet.", note: "característica" },
          { english: "Leo is being very quiet today.", note: "comportamiento temporal" }
        ]
      }
    ]
  },
  {
    unit: 2,
    slug: "past-tenses",
    title: "Past tenses",
    level: "B2",
    examPractice: "Reading and Use of English Part 1",
    summary: "Past simple, past continuous, used to / would y be/get used to.",
    sections: [
      {
        title: "Past simple",
        forms: ["+ subject + past form", "- subject + did not + infinitive", "? did + subject + infinitive?"],
        rules: [
          "Los verbos regulares forman el pasado con -ed/-d; muchos verbos frecuentes son irregulares.",
          "Be es irregular: was/were.",
          "Se usa para acciones y acontecimientos completados en el pasado.",
          "Sirve para contar una secuencia de acontecimientos.",
          "Describe situaciones permanentes o largas que pertenecen al pasado.",
          "También expresa acontecimientos repetidos en un período pasado."
        ],
        examples: [
          { english: "We met last Thursday.", note: "acción terminada" },
          { english: "I opened the door, walked in and sat down.", note: "secuencia" },
          { english: "She lived in Rome as a child.", note: "situación pasada" }
        ]
      },
      {
        title: "Past continuous",
        forms: ["+ subject + was/were + verb-ing", "- subject + was/were not + verb-ing", "? was/were + subject + verb-ing?"],
        rules: [
          "Describe una actividad que ya estaba en progreso cuando ocurrió otra acción pasada; la acción puntual suele ir en past simple.",
          "Puede describir dos actividades que estaban ocurriendo a la vez.",
          "Con always/continually puede presentar una repetición pasada como molesta o criticable.",
          "Con verbos como hope o plan puede expresar un plan que finalmente no se cumplió.",
          "Los state verbs normalmente permanecen en past simple, no en past continuous."
        ],
        examples: [
          { english: "I was walking home when it started to rain." },
          { english: "While I was cooking, Sam was setting the table." },
          { english: "I was hoping to see Nina, but she wasn’t there.", note: "plan no cumplido" }
        ]
      },
      {
        title: "used to + verb vs would + verb",
        forms: ["used to + infinitive", "didn’t use to + infinitive", "did ... use to + infinitive?", "would + infinitive"],
        rules: [
          "Ambos pueden hablar de hábitos del pasado que ya no son verdaderos.",
          "Used to sirve para acciones y estados; would solo sirve para acciones repetidas, no para estados.",
          "Used to es mucho más frecuente que would para este significado.",
          "Los adverbios de frecuencia suelen colocarse antes de used to: I often used to..."
        ],
        examples: [
          { english: "I used to live near the sea.", note: "estado: no usar would" },
          { english: "Every summer we used to / would camp by the lake.", note: "acción repetida" }
        ],
        traps: ["La forma negativa estándar es didn’t use to, no didn’t used to."]
      },
      {
        title: "be used to / get used to",
        intro: "Aquí used no es un pasado: forma parte de una expresión que significa estar o llegar a estar acostumbrado.",
        forms: ["be used to + noun/pronoun/verb-ing", "get used to + noun/pronoun/verb-ing"],
        rules: [
          "Be used to = algo ya resulta normal o familiar.",
          "Get used to = proceso de acostumbrarse poco a poco.",
          "Ambas expresiones pueden aparecer en presente, pasado o futuro.",
          "To es preposición, así que si después va un verbo, debe ir en -ing."
        ],
        examples: [
          { english: "I’m used to working late." },
          { english: "You’ll soon get used to the new timetable." }
        ]
      }
    ]
  },
  {
    unit: 3,
    slug: "present-perfect-and-past-simple",
    title: "Present perfect and past simple",
    level: "B2",
    examPractice: "Reading and Use of English Part 7",
    summary: "Contraste present perfect / past simple y present perfect simple / continuous.",
    sections: [
      {
        title: "Present perfect simple vs past simple",
        forms: ["Present perfect: have/has + past participle", "Past simple: past form / did + infinitive"],
        rules: [
          "Con since o for, usa present perfect si el período sigue abierto; usa past simple si ya terminó.",
          "How long...? suele ir con present perfect cuando la situación continúa. When...? pregunta por un momento pasado concreto y usa past simple.",
          "En negativas de acciones aún pendientes, el present perfect aparece a menudo con still o yet: still antes del verbo principal y yet al final.",
          "Para repeticiones que llegan hasta ahora y pueden continuar, usa present perfect; si pertenecen a un período pasado cerrado, usa past simple.",
          "Usa present perfect cuando el momento exacto del pasado es desconocido o irrelevante.",
          "Para hechos muy recientes puede aparecer just con present perfect.",
          "Si la expresión temporal sigue abierta (this morning, this week, etc.), puede usarse present perfect; si ya está cerrada, past simple.",
          "Present perfect conecta experiencias o resultados con el presente; past simple presenta acontecimientos pasados desconectados de ahora.",
          "Para contar cuántas veces ha ocurrido algo hasta ahora, usa present perfect; si la cantidad pertenece a un período pasado terminado, past simple.",
          "Already, ever y never suelen ir entre have/has y el participio; before normalmente va después del verbo.",
          "Después de un superlativo es frecuente usar present perfect para hablar de la experiencia hasta ahora."
        ],
        examples: [
          { english: "I’ve lived here for six years.", note: "y sigo aquí" },
          { english: "I lived there for six years.", note: "ya no vivo allí" },
          { english: "I haven’t finished yet." },
          { english: "I sent the file an hour ago.", note: "momento pasado concreto" },
          { english: "That’s the best concert I’ve ever seen." }
        ],
        traps: [
          "No combines present perfect con un tiempo pasado cerrado como yesterday, last year o in 2022.",
          "El significado de expresiones como this morning depende de si ese período sigue abierto en el momento de hablar."
        ]
      },
      {
        title: "Present perfect simple vs present perfect continuous",
        forms: ["Simple: have/has + past participle", "Continuous: have/has been + verb-ing"],
        rules: [
          "Ambos pueden describir actividades iniciadas en el pasado que continúan hasta ahora o que han terminado hace poco.",
          "Con verbos de actividad prolongada como live, study, wait o work, a veces ambos son posibles con poca diferencia.",
          "El continuous destaca duración, proceso o actividad en sí misma, aunque no esté terminada.",
          "El simple destaca cantidad, frecuencia o el resultado actual de una acción terminada.",
          "No uses present simple/continuous para expresar cuánto tiempo llevas haciendo algo desde el pasado: se necesita una forma de present perfect.",
          "Los state verbs no suelen usarse en present perfect continuous."
        ],
        examples: [
          { english: "I’ve been studying all morning.", note: "duración/proceso" },
          { english: "I’ve studied three chapters this morning.", note: "cantidad" },
          { english: "She’s been painting the kitchen.", note: "actividad, quizá no acabada" },
          { english: "She’s painted the kitchen.", note: "resultado terminado" }
        ]
      }
    ]
  },
  {
    unit: 4,
    slug: "past-perfect",
    title: "Past perfect",
    level: "B2",
    examPractice: "Reading and Use of English Part 5",
    summary: "Past perfect simple y continuous para organizar acontecimientos anteriores a otro punto del pasado.",
    sections: [
      {
        title: "Past perfect simple",
        forms: ["+ subject + had + past participle", "- subject + had not + past participle", "? had + subject + past participle?"],
        rules: [
          "Se usa cuando ya estamos hablando del pasado y necesitamos retroceder a un momento todavía anterior.",
          "Es frecuente con when, after, by the time y as soon as cuando queremos dejar claro qué acción ocurrió primero.",
          "Puede combinarse con just, already, ever y never; estos adverbios suelen ir entre had y el participio.",
          "No es necesario si las dos acciones ocurrieron al mismo tiempo.",
          "Tampoco suele usarse cuando una acción ocurrió inmediatamente después de otra y la relación temporal ya es evidente."
        ],
        examples: [
          { english: "By the time we arrived, the film had started." },
          { english: "She had just left when I called." },
          { english: "When I heard the alarm, I ran outside.", note: "secuencia inmediata: no hace falta past perfect" }
        ],
        traps: ["Compara: When she came in, he stopped working = dejó de trabajar al verla; When she came in, he had stopped working = ya había parado antes."]
      },
      {
        title: "Past perfect continuous",
        forms: ["+ subject + had been + verb-ing", "- subject + had not been + verb-ing", "? had + subject + been + verb-ing?"],
        rules: [
          "Destaca una actividad continua anterior a un punto del pasado o cuánto tiempo llevaba ocurriendo.",
          "El past perfect simple es preferible cuando interesa el resultado, la cantidad o el número de veces.",
          "Los state verbs normalmente no se usan en past perfect continuous."
        ],
        examples: [
          { english: "I’d been waiting for two hours when the bus arrived.", note: "duración" },
          { english: "I’d visited Canada six times by the age of eighteen.", note: "número de veces: simple" }
        ]
      }
    ]
  },
  {
    unit: 5,
    slug: "future-1",
    title: "Future (1)",
    level: "B2",
    examPractice: "Listening Part 2",
    summary: "Present simple y continuous con valor futuro, will y future continuous.",
    sections: [
      {
        title: "Present simple for future",
        rules: [
          "Se usa para acontecimientos fijados por un horario o calendario.",
          "Incluye horarios de transporte, programas, partidos, cursos, exámenes y planes personales determinados por un timetable."
        ],
        examples: [
          { english: "The train leaves at 7:10." },
          { english: "The course starts next Monday." }
        ]
      },
      {
        title: "Present continuous for future",
        rules: ["Se usa para planes futuros ya organizados o acordados, especialmente cuando existe una cita, reserva o acuerdo concreto."],
        examples: [
          { english: "I’m meeting Sara at six." },
          { english: "We’re flying to Amsterdam tomorrow morning." }
        ]
      },
      {
        title: "will future",
        forms: ["+ will + infinitive", "- will not / won’t + infinitive", "? will + subject + infinitive?"],
        rules: [
          "Decisiones tomadas en el momento de hablar.",
          "Predicciones o ideas inciertas, a menudo con probably, maybe, I think, I expect o I hope.",
          "Situaciones futuras que no están organizadas ni decididas de antemano.",
          "Hechos futuros que simplemente ocurrirán y no dependen de una decisión personal.",
          "En inglés formal, shall puede sustituir ocasionalmente a will con I/we."
        ],
        examples: [
          { english: "The phone’s ringing — I’ll answer it.", note: "decisión instantánea" },
          { english: "I think they’ll win.", note: "predicción" },
          { english: "I’ll be thirty next year.", note: "hecho futuro" }
        ]
      },
      {
        title: "Future continuous",
        forms: ["+ will be + verb-ing", "- won’t be + verb-ing", "? will + subject + be + verb-ing?"],
        rules: [
          "Describe una actividad que estará en progreso en un momento concreto o durante un período futuro.",
          "No es lo mismo que present continuous: future continuous mira una acción ya en progreso en ese momento; present continuous puede indicar que la acción está concertada para comenzar a esa hora."
        ],
        examples: [
          { english: "At eight tomorrow, I’ll be travelling to Madrid." },
          { english: "I’ll be interviewing him at 6:30.", note: "la entrevista estará en progreso" },
          { english: "I’m interviewing him at 6:30.", note: "la cita empieza a esa hora" }
        ]
      }
    ]
  },
  {
    unit: 6,
    slug: "future-2",
    title: "Future (2)",
    level: "B2",
    examPractice: "Reading and Use of English Part 7",
    summary: "going to, future in the past, time clauses, future perfect y be about to.",
    sections: [
      {
        title: "be going to",
        forms: ["+ am/is/are going to + infinitive", "- am/is/are not going to + infinitive", "? am/is/are + subject + going to + infinitive?"],
        rules: [
          "Expresa decisiones o intenciones futuras ya tomadas antes de hablar.",
          "Se usa para predicciones basadas en evidencia visible o disponible ahora.",
          "En muchas predicciones going to y will son posibles con poca diferencia.",
          "Es muy frecuente en conversación; en registros formales y escritos son más frecuentes will y los tiempos de presente.",
          "En habla informal going to suele pronunciarse gonna."
        ],
        examples: [
          { english: "I’m going to replace my old laptop.", note: "decisión previa" },
          { english: "Look at those clouds. It’s going to rain.", note: "evidencia" }
        ]
      },
      {
        title: "Future in the past: was/were going to",
        rules: [
          "Presenta un plan que existía en el pasado pero que no ocurrió o ya no ocurrirá.",
          "También puede introducir un plan pasado que el hablante está dispuesto a cambiar."
        ],
        examples: [
          { english: "We were going to stay for a week, but we came home early." },
          { english: "I was going to watch a film, but what do you suggest?" }
        ]
      },
      {
        title: "Present tenses after time conjunctions",
        rules: [
          "En cláusulas de futuro introducidas por when, until, before, after y as soon as no se usa will para el hecho futuro subordinado.",
          "Usa present simple para una acción simultánea o posterior.",
          "Usa present perfect cuando quieres enfatizar que esa acción debe completarse antes de la otra.",
          "A veces present simple y present perfect son ambos posibles sin una diferencia importante."
        ],
        examples: [
          { english: "Call me when you arrive." },
          { english: "I’ll go out after I’ve finished this report." }
        ],
        traps: ["No: I’ll call you when I’ll arrive."]
      },
      {
        title: "Future perfect simple",
        forms: ["will have + past participle"],
        rules: ["Indica que una acción estará terminada antes de un punto futuro; normalmente ese punto temporal se menciona."],
        examples: [
          { english: "By Friday, I’ll have finished the project." },
          { english: "This time next year, she’ll have graduated." }
        ]
      },
      {
        title: "Future perfect continuous",
        forms: ["will have been + verb-ing"],
        rules: [
          "Enfatiza cuánto tiempo habrá durado una actividad hasta un punto futuro.",
          "Normalmente se menciona tanto el punto futuro como la duración.",
          "Los state verbs no suelen aparecer en esta forma."
        ],
        examples: [{ english: "By noon, I’ll have been working for five hours." }]
      },
      {
        title: "be about to",
        forms: ["am/is/are about to + infinitive"],
        rules: [
          "Se usa para algo que va a ocurrir casi inmediatamente y para lo que ya estamos preparados.",
          "En negativo informal puede significar que alguien no tiene ninguna intención de hacer algo."
        ],
        examples: [
          { english: "We’re about to leave." },
          { english: "I’m not about to apologise for something I didn’t do.", note: "no pienso hacerlo" }
        ]
      }
    ]
  }
];
