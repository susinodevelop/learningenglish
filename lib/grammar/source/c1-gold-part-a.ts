import type { GrammarTopic } from "./types";

export const c1GoldGrammarUnits01to03: GrammarTopic[] = [
  {
      unit: 1,
      slug: "c1-present-aspect",
      title: "Perfect and continuous aspect",
      level: "C1",
      examPractice: "Gold C1 · Unit 1 · Grammar reference pp. 149–150",
      summary: "Contraste avanzado entre aspecto simple, continuo y perfecto, con especial atención al present perfect simple/continuous.",
      sections: [
        {
          title: "Aspect: fact, process and connection",
          intro: "En C1 no basta con reconocer un tiempo verbal: hay que decidir cómo quieres presentar la acción. El aspecto simple la trata como hecho, el continuo como proceso y el perfecto la conecta con otro punto temporal.",
          rules: [
            "El simple presenta la acción como hecho, hábito o situación estable.",
            "El continuous presenta una actividad en progreso, temporal, cambiante o vista desde dentro.",
            "El perfect conecta un período anterior con un punto de referencia posterior: normalmente el presente, pero también puede ser un punto pasado o futuro.",
            "La elección entre perfect simple y perfect continuous cambia el foco: resultado/cantidad frente a duración/proceso."
          ],
          examples: [
            { english: "I have written three reports this week.", note: "resultado/cantidad" },
            { english: "I have been writing reports all morning.", note: "duración/proceso" }
          ]
        },
        {
          title: "Present perfect simple: advanced uses",
          forms: ["have/has + past participle"],
          rules: [
            "Se usa para estados o acciones, únicas o repetidas, que abarcan un período hasta el presente.",
            "Es frecuente con ever, never, always, often y expresiones del tipo this is the first/second time...",
            "Con just, already y yet suele presentar una acción reciente con resultado actual.",
            "Con for, since y períodos aún abiertos como this week/month/year puede expresar una situación que continúa hasta ahora.",
            "Tras superlativos es frecuente para hablar de experiencia acumulada hasta el presente."
          ],
          examples: [
            { english: "This is the third time I've taken this exam." },
            { english: "It's the most demanding course I've ever done." }
          ]
        },
        {
          title: "Present perfect continuous: advanced uses",
          forms: ["have/has been + verb-ing"],
          rules: [
            "Destaca una actividad reciente cuyos efectos todavía son visibles.",
            "Es especialmente natural para situaciones temporales que se prolongan hasta el presente.",
            "Puede sugerir que la actividad está incompleta.",
            "Con actividades de larga duración puede alternar con el present perfect simple; la diferencia suele ser de énfasis, no de verdad factual.",
            "Los state verbs normalmente no se usan en esta forma."
          ],
          examples: [
            { english: "I've been working from a hotel for the last two weeks.", note: "situación temporal" },
            { english: "I've been trying to fix the printer, but it still doesn't work.", note: "actividad no completada" }
          ]
        }
      ]
    },
  {
      unit: 1,
      slug: "c1-stative-verbs",
      title: "Stative and dynamic verbs",
      level: "C1",
      examPractice: "Gold C1 · Unit 1 · Grammar reference p. 150",
      summary: "Diferencia entre significado estático y dinámico en verbos que cambian de comportamiento según el sentido.",
      sections: [
        {
          title: "Stative vs dynamic meaning",
          intro: "Un mismo verbo puede ser stative o dynamic según el significado concreto que tenga en la frase.",
          rules: [
            "Los stative verbs suelen describir emociones, conocimiento, posesión, comunicación o percepción y normalmente no van en continuous.",
            "Los dynamic verbs describen actividades o procesos y sí admiten formas continuas.",
            "Feel, think, have, see, taste y smell pueden cambiar de categoría cuando cambia su significado.",
            "La pregunta útil no es '¿está ocurriendo ahora?', sino '¿describe un estado o una actividad?'."
          ],
          examples: [
            { english: "I feel the plan is too risky.", note: "opinión: stative" },
            { english: "I'm feeling much better today.", note: "experiencia temporal: dynamic" },
            { english: "She has two flats.", note: "posesión" },
            { english: "She's having lunch with a client.", note: "actividad" }
          ]
        }
      ]
    },
  {
      unit: 1,
      slug: "c1-conjunctions",
      title: "Conjunctions",
      level: "C1",
      examPractice: "Gold C1 · Unit 1 · Grammar reference pp. 150–151",
      summary: "Conjunctions de contraste, adición, condición y causa, con atención al orden invertido tras nor.",
      sections: [
        {
          title: "Contrast, addition, condition and reason",
          rules: [
            "Para contraste aparecen although, while, whereas y yet.",
            "Para añadir información se usan and y nor; tras nor hay inversión auxiliar + sujeto.",
            "Para condición son frecuentes as long as, provided (that), if, unless e if only.",
            "Para causa se usan as, because y since; so introduce normalmente el resultado, no la causa.",
            "Estas conjunctions pueden aparecer al principio o en medio de la oración y contribuyen a la cohesión."
          ],
          examples: [
            { english: "The task was simple, yet nobody finished on time." },
            { english: "He didn't complain, nor did he ask for help.", note: "inversión tras nor" },
            { english: "Provided that the data are accurate, we can publish the report." }
          ],
          traps: ["Después de nor no uses orden de afirmación: nor did he..., no nor he did...."]
        }
      ]
    },
  {
      unit: 2,
      slug: "c1-narrative-tenses",
      title: "Narrative tenses: C1 control",
      level: "C1",
      examPractice: "Gold C1 · Unit 2 · Grammar reference pp. 151–152",
      summary: "Control fino de past simple, continuous, perfect y would/used to al narrar.",
      sections: [
        {
          title: "Choosing the narrative viewpoint",
          rules: [
            "Past simple hace avanzar la secuencia de acontecimientos terminados.",
            "Past continuous crea fondo, muestra simultaneidad o presenta una acción en progreso interrumpida por otra.",
            "Past continuous también puede expresar planes o acontecimientos previstos que finalmente no ocurrieron.",
            "Past perfect retrocede a un punto anterior solo cuando hace falta aclarar el orden temporal.",
            "Past perfect continuous enfatiza la duración de una actividad anterior a otro momento pasado.",
            "Used to sirve para hábitos y estados pasados; would sirve para hábitos/acciones repetidas, pero no para estados, pensamientos o emociones.",
            "No sobrecargues una narración con past perfect: con before/after o una vez fijada la secuencia, el past simple suele bastar."
          ],
          examples: [
            { english: "I was leaving the office when the alarm went off." },
            { english: "By the time the police arrived, the driver had already left." },
            { english: "We would spend every August by the coast.", note: "hábito repetido" }
          ]
        }
      ]
    },
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
            "Quitar las comas a una non-defining clause puede cambiar el significado y restringir el referente."
          ],
          examples: [
            { english: "The consultant who called yesterday is waiting outside." },
            { english: "The consultant, who called yesterday, is waiting outside.", note: "solo hay un consultor relevante" }
          ]
        },
        {
          title: "Prepositions in relative clauses",
          rules: [
            "En registro formal, la preposición puede colocarse antes de whom/which.",
            "En registro neutral o informal, la preposición suele quedarse al final de la relative clause.",
            "No uses that inmediatamente después de una preposición adelantada."
          ],
          examples: [
            { english: "The person to whom I spoke was very helpful.", note: "formal" },
            { english: "The person who I spoke to was very helpful.", note: "neutral" }
          ]
        }
      ]
    },
  {
      unit: 3,
      slug: "c1-future-forms",
      title: "Future forms: C1 choices",
      level: "C1",
      examPractice: "Gold C1 · Unit 3 · Grammar reference pp. 152–153",
      summary: "Elección avanzada entre will, going to, present continuous, future continuous y future perfect.",
      sections: [
        {
          title: "Future meaning and speaker intention",
          rules: [
            "Will se usa para predicciones basadas en creencias/conocimiento, promesas, amenazas, ofrecimientos, peticiones y decisiones tomadas al hablar.",
            "Going to y present continuous expresan planes o arreglos ya decididos.",
            "Going to también presenta una predicción basada en evidencia presente.",
            "Future continuous presenta una acción en progreso en un momento futuro concreto.",
            "Future perfect presenta algo que estará completado antes de un punto futuro."
          ],
          examples: [
            { english: "This time tomorrow, I'll be presenting the proposal." },
            { english: "By Friday, we'll have finished the first phase." }
          ]
        },
        {
          title: "Future time expressions and tense choice",
          rules: [
            "It won't be long until... y It's only a matter of time before... van seguidos de present simple aunque la referencia sea futura.",
            "Within the next... suele combinarse con will.",
            "Ten years from now... encaja naturalmente con future continuous cuando visualizamos una actividad en progreso.",
            "By the time... suele combinarse con future perfect para marcar el límite temporal.",
            "It's about/high time... usa past simple aunque se refiera al presente o futuro."
          ],
          examples: [
            { english: "It's only a matter of time before she finds out." },
            { english: "It's high time we left." }
          ],
          traps: ["No uses will automáticamente después de before/until en estas expresiones de futuro."]
        }
      ]
    },
  {
      unit: 3,
      slug: "c1-introductory-it",
      title: "Introductory it",
      level: "C1",
      examPractice: "Gold C1 · Unit 3 · Grammar reference p. 153",
      summary: "It como sujeto u objeto introductorio y en cleft sentences para controlar el foco y evitar estructuras pesadas.",
      sections: [
        {
          title: "It as introductory subject",
          forms: ["It + be + adjective/noun + to-infinitive/-ing/clause", "It + be + adjective + that-clause"],
          rules: [
            "Se usa it como sujeto introductorio para evitar comenzar con un infinitive o una -ing clause pesada.",
            "También introduce una clause que funciona semánticamente como sujeto.",
            "Es especialmente frecuente con evaluaciones impersonales como it's likely, shocking, useful, important, a relief, etc."
          ],
          examples: [
            { english: "It's useful to review your notes before the test." },
            { english: "It's surprising how quickly the situation changed." }
          ]
        },
        {
          title: "Cleft sentences with it",
          forms: ["It + be + focused element + who/that + clause"],
          rules: [
            "Las cleft sentences desplazan el foco hacia una persona, cosa o complemento concreto.",
            "El elemento inmediatamente después de be recibe el énfasis contrastivo."
          ],
          examples: [
            { english: "It was Maya who found the error.", note: "énfasis en Maya" },
            { english: "It was the final paragraph that caused the confusion.", note: "énfasis en el objeto" }
          ]
        },
        {
          title: "It as introductory object",
          forms: ["subject + verb + it + adjective + infinitive/clause"],
          rules: [
            "Con verbos como find o make, it puede anticipar un objeto oracional cuando después aparece un adjective complement.",
            "Sin ese adjective, normalmente no usamos este it introductorio."
          ],
          examples: [
            { english: "I find it difficult to concentrate in noisy places." },
            { english: "They made it clear that the deadline would not change." }
          ]
        }
      ]
    }
];
