import type { GrammarTopic } from "./types";

export const grammarUnits07to12: GrammarTopic[] = [
  {
    unit: 7,
    slug: "adjectives",
    title: "Adjectives",
    level: "B2",
    examPractice: "Reading and Use of English Part 1",
    summary: "Comparativos y superlativos, estructuras comparativas, -ing/-ed, posición y orden de adjetivos.",
    sections: [
      {
        title: "Comparative and superlative adjectives",
        rules: [
          "Los adjetivos de una sílaba suelen formar comparativo con -er y superlativo con -est.",
          "Los de dos sílabas terminados en -y cambian -y por -ier/-iest.",
          "Los adjetivos largos suelen usar more y the most.",
          "Algunos adjetivos de dos sílabas como quiet, pleasant, common o polite pueden admitir -er/-est.",
          "Los terminados en -ow y -er suelen admitir -er/-est; los terminados en -le suelen añadir -r/-st.",
          "En muchos monosílabos acabados en una vocal + b/d/g/n/p/t se duplica la consonante final.",
          "Formas irregulares importantes: good-better-best, bad-worse-worst, far-farther/further-farthest/furthest."
        ],
        examples: [
          { english: "This room is smaller than mine." },
          { english: "She’s the funniest person here." },
          { english: "That was the most interesting lecture today." }
        ],
        traps: ["No combines more con un comparativo en -er: more easier es incorrecto."]
      },
      {
        title: "Comparative structures",
        rules: [
          "Para superioridad: comparative + than.",
          "Para inferioridad: less + adjective + than o not as/so + adjective + as.",
          "Para igualdad: as + adjective + as."
        ],
        examples: [
          { english: "This route is quicker than the other one." },
          { english: "The second option is less expensive than the first." },
          { english: "My phone isn’t as new as yours." },
          { english: "This test is as difficult as the last one." }
        ]
      },
      {
        title: "Adjectives ending in -ing and -ed",
        rules: [
          "La forma -ed describe cómo se siente una persona o ser afectado.",
          "La forma -ing describe la cosa, situación o persona que provoca ese sentimiento."
        ],
        examples: [
          { english: "I’m bored.", note: "cómo me siento" },
          { english: "The film is boring.", note: "lo que provoca el sentimiento" },
          { english: "We felt relaxed after a relaxing weekend." }
        ]
      },
      {
        title: "Adjective position",
        rules: [
          "Normalmente el adjetivo va antes del sustantivo.",
          "También puede ir detrás de be, get, become, look, seem, appear, sound, taste, smell y feel.",
          "Muchos sustantivos pueden funcionar como modificadores delante de otro sustantivo: library book, diamond ring, seaside hotel."
        ],
        examples: [
          { english: "They bought an old house." },
          { english: "The soup smells wonderful." },
          { english: "She works in a city library." }
        ],
        traps: ["Después de verbos como look, seem, feel, sound, taste y smell normalmente necesitas un adjetivo, no un adverbio."]
      },
      {
        title: "Adjective order",
        rules: [
          "Los adjetivos de opinión o impresión general suelen ir primero.",
          "Después, la información factual suele seguir este orden: size → age → shape → colour → origin → material → purpose.",
          "Dos colores suelen unirse con and.",
          "Cuando varios adjetivos aparecen después de un verbo, se usa and antes del último."
        ],
        examples: [
          { english: "a beautiful small old Italian table" },
          { english: "a black and white photograph" },
          { english: "The room was warm, bright and comfortable." }
        ]
      }
    ]
  },
  {
    unit: 8,
    slug: "adverbs",
    title: "Adverbs",
    level: "B2",
    examPractice: "Reading and Use of English Part 3",
    summary: "Formación, confusiones con adjetivos, comparativos, intensificadores y posición de adverbios.",
    sections: [
      {
        title: "Adverb forms",
        rules: [
          "Los adverbios pueden modificar un verbo, un adjetivo u otro adverbio y expresar tiempo, lugar, manera o frecuencia.",
          "Muchos se forman añadiendo -ly al adjetivo.",
          "Hay cambios ortográficos frecuentes: angry → angrily; miserable → miserably.",
          "Los adjetivos terminados en -ly como friendly, likely, lively, lonely, lovely, silly y ugly no forman un adverbio añadiendo otra -ly; se usa una frase como in a friendly way/manner."
        ],
        examples: [
          { english: "She answered politely." },
          { english: "The weather is surprisingly warm." },
          { english: "He spoke in a friendly manner." }
        ]
      },
      {
        title: "Adverbs and adjectives easily confused",
        rules: [
          "Algunas palabras tienen la misma forma como adjetivo y adverbio: fast, early, hard, late, daily.",
          "Hard = con esfuerzo/intensamente; hardly = casi no.",
          "Late = tarde; lately = recientemente.",
          "El adverbio de good es well; well también puede ser adjetivo con el significado de estar sano."
        ],
        examples: [
          { english: "She works hard." },
          { english: "She hardly works at weekends.", note: "casi no trabaja" },
          { english: "I got home late." },
          { english: "I haven’t seen him lately." },
          { english: "The band played well." }
        ]
      },
      {
        title: "Comparative and superlative adverbs",
        rules: [
          "La mayoría usa more/less para comparativo y the most/the least para superlativo.",
          "Los adverbios sin -ly pueden comportarse como adjetivos cortos: hard-harder-hardest; high-higher-highest; late-later-latest.",
          "Early forma earlier/earliest.",
          "Irregulares: well-better-best; badly-worse-worst; far-farther/further-farthest/furthest.",
          "Las estructuras de comparación son las mismas que con adjetivos: than y as...as."
        ],
        examples: [
          { english: "She speaks more clearly than I do." },
          { english: "He arrived earlier than expected." },
          { english: "I can’t type as quickly as you." }
        ]
      },
      {
        title: "Modifying adverbs and adjectives",
        rules: [
          "Para graduar adjetivos o adverbios se usan palabras como incredibly, extremely, really, very, rather, fairly, quite y slightly.",
          "Los adjetivos no graduables o absolutos como perfect, impossible o excellent suelen combinarse con completely, absolutely, totally o entirely, no con very."
        ],
        examples: [
          { english: "The task was extremely difficult." },
          { english: "The answer is completely impossible." }
        ]
      },
      {
        title: "Adverb position",
        rules: [
          "La posición más habitual de muchos adverbios de manera es después del verbo o, si hay objeto, después del objeto.",
          "Un adverbio puede ir en posición media o inicial para dar énfasis.",
          "No suele colocarse un adverbio entre un verbo y su objeto.",
          "Si hay varios complementos adverbiales al final, el orden habitual es manner → place → time.",
          "Los adverbios de frecuencia suelen ir antes de un verbo simple, después de be y después del primer auxiliar en una forma verbal compuesta.",
          "Los adverbios de opinión o actitud como luckily, actually e in fact suelen aparecer al principio, a menudo seguidos de coma."
        ],
        examples: [
          { english: "She packed the bag carefully." },
          { english: "I usually walk to work." },
          { english: "I have never visited Dublin." },
          { english: "Luckily, nobody was hurt." }
        ]
      }
    ]
  },
  {
    unit: 9,
    slug: "questions",
    title: "Questions",
    level: "B2",
    examPractice: "Listening Part 1",
    summary: "Yes/no questions, short answers, question words, question tags y estructuras para estar de acuerdo.",
    sections: [
      {
        title: "Making yes/no questions",
        rules: [
          "Con auxiliares, invierte auxiliar y sujeto.",
          "En present simple y past simple se usa do/does/did y el verbo vuelve al infinitivo.",
          "Con be, se invierte be y sujeto.",
          "Con modales, el modal pasa delante del sujeto.",
          "Las preguntas negativas suelen expresar sorpresa o una expectativa previa."
        ],
        examples: [
          { english: "Have you finished?" },
          { english: "Does she live here?" },
          { english: "Were they late?" },
          { english: "Can you stay?" },
          { english: "Don’t you like it?", note: "sorpresa" }
        ]
      },
      {
        title: "Short answers",
        rules: ["La respuesta corta repite el mismo auxiliar, modal o forma de be que aparece en la pregunta."],
        examples: [
          { english: "Have you seen it? — Yes, I have." },
          { english: "Can she drive? — No, she can’t." },
          { english: "Are you ready? — Yes, I am." }
        ]
      },
      {
        title: "Questions with question words",
        rules: [
          "Si who/what/which pregunta por el sujeto, no se usa inversión ni do/does/did.",
          "En una subject question con who, el verbo suele ir en singular salvo que la propia pregunta mencione explícitamente varias personas.",
          "Si who/what/which pregunta por el objeto, se usa el orden normal de pregunta.",
          "When, why, how, etc. también siguen el orden de una yes/no question.",
          "Distingue What does X like? (gustos), What does X look like? (apariencia) y What is X like? (carácter/apariencia general)."
        ],
        examples: [
          { english: "Who called you?", note: "who = sujeto" },
          { english: "Who did you call?", note: "who = objeto" },
          { english: "What is your new teacher like?" }
        ],
        traps: ["No uses do/did en una subject question: Who made this? no Who did make this?"]
      },
      {
        title: "Question tags",
        rules: [
          "Una frase afirmativa suele llevar tag negativa; una negativa, tag afirmativa.",
          "Con present/past simple usa do/does/did; con otros tiempos repite el auxiliar o modal.",
          "I am → aren’t I?; I’m not → am I?; let’s → shall we?.",
          "Entonación descendente = se pide confirmación; entonación ascendente = se solicita información real."
        ],
        examples: [
          { english: "You know Sam, don’t you?" },
          { english: "She hasn’t left, has she?" },
          { english: "I’m late, aren’t I?" },
          { english: "Let’s go, shall we?" }
        ]
      },
      {
        title: "Agreeing with statements",
        rules: [
          "Para una afirmación positiva: so + auxiliar/modal/be + sujeto.",
          "Para una afirmación negativa: neither/nor + auxiliar/modal/be + sujeto.",
          "El auxiliar debe concordar con el tiempo o modal de la frase original."
        ],
        examples: [
          { english: "I loved the film. — So did I." },
          { english: "I can’t swim. — Neither can I." },
          { english: "She was tired. — So was he." }
        ]
      }
    ]
  },
  {
    unit: 10,
    slug: "countable-uncountable-nouns-articles",
    title: "Countable and uncountable nouns; articles",
    level: "B2",
    examPractice: "Reading and Use of English Part 4",
    summary: "Sustantivos contables/no contables, a/an, the, ausencia de artículo y usos especiales.",
    sections: [
      {
        title: "Countable and uncountable nouns",
        rules: [
          "Los contables pueden ser singulares o plurales.",
          "Los incontables no forman plural y normalmente llevan verbo singular.",
          "Para cuantificar incontables se usan unidades como a piece of, a sum of, a litre of, etc.",
          "News es incontable y lleva verbo singular, aunque termine en -s.",
          "Muchos sustantivos pueden ser contables o incontables con significado distinto: exercise/exercises, work/works, cheese/cheeses, etc."
        ],
        examples: [
          { english: "I need some advice." },
          { english: "She gave me a piece of advice." },
          { english: "The news is surprising." },
          { english: "Exercise is good for you, but these exercises are difficult." }
        ],
        traps: ["No digas an advice, a furniture, a luggage o a news."]
      },
      {
        title: "a/an, the and no article",
        rules: [
          "a/an introduce un singular contable no identificado, no específico o representativo de un tipo.",
          "the identifica una persona/cosa concreta, única, ya mencionada o compartida por hablante y oyente; puede ir con singular, plural o incontable.",
          "Sin artículo se habla de personas/cosas en general con plural contable o de sustancias/cualidades en general con incontables."
        ],
        examples: [
          { english: "I saw a dog outside. The dog was waiting by the gate." },
          { english: "Music helps me concentrate." },
          { english: "I don’t like the music they’re playing." },
          { english: "Trees need water." }
        ]
      },
      {
        title: "Articles with geographical names and places",
        rules: [
          "Usa the con océanos, mares, ríos, regiones, grupos de islas, desiertos, cordilleras y países cuyo nombre incluye Republic, Kingdom, States o Emirates.",
          "Normalmente no uses the con lagos, continentes, la mayoría de países, estados, ciudades, pueblos o edificios que llevan simplemente el nombre del lugar.",
          "Excepciones importantes incluyen the Netherlands y The Hague.",
          "Si un edificio o institución tiene una estructura con of, suele llevar the: the University of..., the Museum of....",
          "Expresiones generales: the sea, the coast, the seaside, the country(side), the mountains, the hills."
        ],
        examples: [
          { english: "the Atlantic, the Thames, the Alps" },
          { english: "Lake Como, Europe, Spain, Madrid" },
          { english: "the United Kingdom" },
          { english: "the Museum of Modern Art" }
        ]
      },
      {
        title: "Fixed expressions and institutional meaning",
        rules: [
          "Transportes: by train/bus/plane, sin the.",
          "Comidas: have lunch/dinner; si se califica una comida singular puede aparecer a: a big breakfast.",
          "Medios/ocio: listen to the radio, watch television, play the guitar, play tennis, go to the cinema/theatre.",
          "At work no lleva artículo; at the office se refiere a una oficina concreta.",
          "School, hospital, church, prison, college y university pueden ir sin artículo cuando pensamos en su función principal; con the hablamos del edificio/lugar concreto.",
          "Mosque y temple normalmente llevan the."
        ],
        examples: [
          { english: "The children are at school.", note: "son alumnos allí" },
          { english: "Their father is at the school.", note: "está visitando el edificio" },
          { english: "She spent a week in hospital.", note: "como paciente" }
        ]
      },
      {
        title: "Jobs, publications, organisations, online, definitions and exclamations",
        rules: [
          "Profesiones: usa a/an: She’s a designer.",
          "La mayoría de periódicos llevan the; la mayoría de revistas y empresas no.",
          "Muchas organizaciones llevan the, también con siglas: the UN, the BBC, the WHO.",
          "Se dice the internet y the web, pero nombres de servicios concretos como Wikipedia o Facebook van sin artículo.",
          "Para definiciones generales con singular contable se usa a/an.",
          "En exclamaciones con singular contable: What a/an...!; con plural o incontable no se usa artículo."
        ],
        examples: [
          { english: "A dentist is a person who looks after your teeth." },
          { english: "What an amazing view!" },
          { english: "What lovely weather!" }
        ]
      }
    ]
  },
  {
    unit: 11,
    slug: "modals-1",
    title: "Modals (1)",
    level: "B2",
    examPractice: "Reading and Use of English Part 6",
    summary: "Forma de los modales, obligación, prohibición, ausencia de obligación y necesidad.",
    sections: [
      {
        title: "How modal verbs work",
        rules: [
          "Can, could, may, might, must, ought to, shall, should, will y would van antes de otro verbo.",
          "No añaden -s, -ed ni -ing.",
          "Van seguidos de infinitivo sin to, excepto ought to.",
          "La negación se coloca directamente después del modal.",
          "En preguntas, el modal va delante del sujeto."
        ],
        examples: [
          { english: "She can swim." },
          { english: "You shouldn’t worry." },
          { english: "Could you help me?" }
        ]
      },
      {
        title: "must vs have to",
        rules: [
          "Ambos pueden expresar obligación.",
          "Must es frecuente para órdenes, avisos, consejo fuerte o una obligación que el propio hablante siente/impone.",
          "Cuando la obligación viene de una regla externa, have to suele ser más natural.",
          "Have to es habitual para obligaciones rutinarias.",
          "Must solo tiene una forma y se refiere al presente/futuro; para pasado, futuro, condicional o formas no finitas se usa have to."
        ],
        examples: [
          { english: "I must call my mother tonight.", note: "decisión/obligación del hablante" },
          { english: "You have to show your ID at reception.", note: "regla externa" },
          { english: "I had to leave early yesterday." }
        ]
      },
      {
        title: "mustn’t vs don’t have to",
        rules: [
          "mustn’t = está prohibido / no debes hacerlo.",
          "don’t have to = no es necesario, aunque puedes hacerlo si quieres."
        ],
        examples: [
          { english: "You mustn’t park here." },
          { english: "You don’t have to come tomorrow." }
        ],
        traps: ["Esta diferencia cambia completamente el significado y es una trampa típica de examen."]
      },
      {
        title: "have/has got to",
        rules: [
          "En habla y escritura informal puede sustituir a have/has to.",
          "Suele referirse a una obligación concreta más que a una situación general.",
          "Para el pasado se usa had to, no had got to."
        ],
        examples: [
          { english: "I’ve got to finish this today." },
          { english: "Teachers have to prepare lessons.", note: "situación general" }
        ]
      },
      {
        title: "should / ought to and past advice",
        rules: [
          "Should expresa lo que consideramos correcto o aconsejable.",
          "Should have + past participle habla de lo correcto en el pasado que no se hizo.",
          "Shouldn’t have + participle habla de algo que se hizo pero no era buena idea.",
          "Ought to / ought to have puede usarse de forma parecida, aunque es menos frecuente."
        ],
        examples: [
          { english: "You should get more sleep." },
          { english: "I should have apologised." }
        ]
      },
      {
        title: "need, needn’t and needn’t have",
        rules: [
          "Need puede funcionar como verbo normal: need to, needed to, doesn’t need to, etc.",
          "En negativo también existe la forma modal needn’t + infinitive.",
          "didn’t need to = no era necesario; no afirma necesariamente que la acción se realizara.",
          "needn’t have + participle = la acción sí se realizó, pero después resultó innecesaria."
        ],
        examples: [
          { english: "You don’t need to / needn’t bring anything." },
          { english: "I didn’t need to buy a ticket." },
          { english: "I needn’t have bought a ticket — Sam had already bought one for me." }
        ]
      }
    ]
  },
  {
    unit: 12,
    slug: "pronouns-and-determiners",
    title: "Pronouns and determiners",
    level: "B2",
    examPractice: "Reading and Use of English Part 2",
    summary: "Posesivos, reflexivos, each other, there/it y determinantes cuantificadores.",
    sections: [
      {
        title: "Possessive ’s and of",
        rules: [
          "’s se usa normalmente con personas, países, animales y expresiones de tiempo.",
          "Con cosas suele preferirse of.",
          "La posición del apóstrofo distingue singular y plural: my brother’s friends vs my brothers’ friends.",
          "Al hablar puede omitirse el segundo sustantivo cuando se entiende que hablamos de la casa o negocio de alguien: at Simon’s, at the newsagent’s."
        ],
        examples: [
          { english: "the dog’s tail" },
          { english: "a week’s holiday" },
          { english: "the price of the ticket" }
        ]
      },
      {
        title: "Possessive adjectives and pronouns",
        rules: [
          "Adjetivos posesivos: my, your, his, her, its, our, their; van delante de sustantivo.",
          "Pronombres posesivos: mine, yours, his, hers, ours, theirs; sustituyen a possessive adjective + noun.",
          "Con partes del cuerpo y ropa se usa normalmente el posesivo, no the.",
          "of + possessive pronoun o possessive noun puede expresar 'uno de mis/tus/sus...': a friend of mine."
        ],
        examples: [
          { english: "Is this your coat or mine?" },
          { english: "She hurt her arm." },
          { english: "He’s a friend of ours." }
        ]
      },
      {
        title: "Reflexive pronouns and own",
        rules: [
          "Reflexivos: myself, yourself, himself, herself, itself, ourselves, themselves.",
          "Se usan cuando el objeto es la misma persona/cosa que el sujeto, para énfasis y en expresiones fijas como by yourself, enjoy yourself, behave yourself, help yourself, make yourself at home.",
          "Con wash, shave y dress solo suelen aparecer para énfasis o cuando interesa destacar que la persona lo hace sin ayuda.",
          "Possessive adjective + own enfatiza que algo pertenece específicamente a alguien.",
          "on your own = alone y puede equivaler a by yourself."
        ],
        examples: [
          { english: "She blamed herself." },
          { english: "I fixed it myself." },
          { english: "I’d like my own room." },
          { english: "He travelled on his own." }
        ]
      },
      {
        title: "each other and one another",
        rules: [
          "Expresan una acción recíproca entre dos o más participantes, a diferencia de los reflexivos.",
          "Tienen forma posesiva: each other’s / one another’s."
        ],
        examples: [
          { english: "They looked at each other." },
          { english: "The twins borrow each other’s clothes." }
        ]
      },
      {
        title: "there vs it + be",
        rules: [
          "there + be introduce la existencia de alguien/algo, sobre todo cuando se menciona por primera vez.",
          "El verbo después de there concuerda con el sustantivo que sigue.",
          "it + be retoma algo ya mencionado.",
          "It también introduce información sobre hora, tiempo atmosférico y distancia.",
          "It puede funcionar como sujeto anticipado para evitar empezar una frase con infinitivo o -ing."
        ],
        examples: [
          { english: "There’s a café next door. It’s open until midnight." },
          { english: "It’s ten o’clock." },
          { english: "It’s difficult to understand this rule." }
        ]
      },
      {
        title: "someone, anywhere, everybody, etc.",
        rules: [
          "Los compuestos de some y any siguen las reglas generales de some/any.",
          "Some suele aparecer en afirmativas y en preguntas que son ofertas/peticiones donde se espera un sí.",
          "Any suele aparecer en preguntas y negativas; en afirmativas puede significar que da igual cuál/quién/dónde.",
          "Someone, everyone, nobody, etc. llevan verbo singular."
        ],
        examples: [
          { english: "Would you like something to drink?" },
          { english: "I can’t find anything." },
          { english: "Anywhere is fine." },
          { english: "Everybody is ready." }
        ]
      },
      {
        title: "all, most, some, no and none",
        rules: [
          "Con plural o incontable en sentido general: all/most/some/no + noun.",
          "Para un grupo concreto: all (of) the/my/these..., most/some/none of the/my/these....",
          "Of puede omitirse después de all, pero no después de some, most o none.",
          "Con pronombre se necesita of: some of them.",
          "Most, some y none pueden aparecer solos si el referente ya está claro.",
          "Con none of + plural, el verbo puede ser singular o plural.",
          "Whole suele sustituir a all delante de un singular: the whole trip."
        ],
        examples: [
          { english: "Most students use laptops." },
          { english: "Most of the students in my class use laptops." },
          { english: "None of them knows / know the answer." }
        ]
      },
      {
        title: "each vs every",
        rules: [
          "Ambos pueden referirse a todos los miembros de un grupo.",
          "Each enfoca los individuos uno por uno; every enfatiza que no se excluye ningún miembro.",
          "Solo each puede ir seguido de of + plural/pronoun.",
          "Every morning = cada mañana de forma repetida; all morning = durante toda una mañana."
        ],
        examples: [
          { english: "Each student received a different task." },
          { english: "Every student must register." },
          { english: "Each of them has a key." }
        ]
      },
      {
        title: "both, neither and either",
        rules: [
          "Se usan para dos elementos.",
          "Both lleva verbo plural; either y neither suelen llevar singular.",
          "Estructuras: both...and, neither...nor, either...or."
        ],
        examples: [
          { english: "Both answers are correct." },
          { english: "Neither option suits me." },
          { english: "You can choose either tea or coffee." }
        ]
      }
    ]
  }
];
