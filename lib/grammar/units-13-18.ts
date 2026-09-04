import type { GrammarTopic } from "./types";

export const grammarUnits13to18: GrammarTopic[] = [
  {
    unit: 13,
    slug: "modals-2",
    title: "Modals (2)",
    level: "B2",
    examPractice: "Listening Part 3",
    summary: "Permiso, peticiones, ofrecimientos, sugerencias, órdenes y consejos.",
    sections: [
      {
        title: "Asking for and giving permission",
        rules: [
          "Can I...? es una petición normal e informal que normalmente espera un sí.",
          "Could I...? es más cortés o menos segura de recibir una respuesta afirmativa.",
          "May I...? es más formal, especialmente con desconocidos.",
          "May / may not también aparece en avisos escritos para indicar qué está permitido o prohibido.",
          "Respuestas habituales: Of course, OK, Certainly, I’m afraid not."
        ],
        examples: [
          { english: "Can I leave my bag here?" },
          { english: "Could I borrow your charger?" },
          { english: "May I come in?" }
        ]
      },
      {
        title: "Making requests",
        rules: [
          "Can you...? y Will you...? son frecuentes en conversación informal.",
          "Could you...? y Would you...? son más corteses.",
          "Do you think you could...? es una fórmula especialmente amable.",
          "Would you mind (not) + -ing...? es muy cortés.",
          "No se usa May you...? para pedir que otra persona haga algo.",
          "Con Would you mind...? una respuesta negativa como Not at all significa que aceptas la petición."
        ],
        examples: [
          { english: "Could you tell me the time?" },
          { english: "Do you think you could move your bag?" },
          { english: "Would you mind speaking more quietly?" }
        ],
        traps: ["No respondas No, I won’t a una petición normal si quieres sonar cortés; usa I’m sorry, I’m afraid I can’t."]
      },
      {
        title: "Making offers",
        rules: [
          "Para ofrecer ayuda pueden usarse Can I/we...?, Shall I/we...?, I can/could/I’ll..., Why don’t I...?, Would you like me to...?"
        ],
        examples: [
          { english: "Shall I carry that for you?" },
          { english: "I’ll help you with the boxes." },
          { english: "Would you like me to call a taxi?" }
        ]
      },
      {
        title: "Making suggestions",
        rules: [
          "Let’s + infinitive.",
          "Shall I/we...? y Why don’t I/we/you...? + infinitive.",
          "How about / What about + -ing.",
          "Could puede presentar una sugerencia más tentativa."
        ],
        examples: [
          { english: "Let’s take the train." },
          { english: "Why don’t we leave earlier?" },
          { english: "How about meeting at seven?" },
          { english: "We could try the new café." }
        ]
      },
      {
        title: "Orders and advice: strength scale",
        rules: [
          "must = orden o consejo muy fuerte.",
          "had better = consejo con sensación de posible consecuencia negativa si no se sigue.",
          "should / ought to = consejo normal.",
          "could = sugerencia, menos fuerte.",
          "Negativos habituales: had better not, shouldn’t, ought not to.",
          "Para consejo retrospectivo: should have / ought to have + participle; en negativo, shouldn’t have.",
          "Mustn’t y couldn’t no se usan como equivalentes normales de consejo negativo."
        ],
        examples: [
          { english: "You must see a doctor." },
          { english: "You’d better take an umbrella." },
          { english: "You should apply for that job." },
          { english: "You could ask Maya for help." },
          { english: "You shouldn’t have ignored the warning." }
        ]
      }
    ]
  },
  {
    unit: 14,
    slug: "modals-3",
    title: "Modals (3)",
    level: "B2",
    examPractice: "Reading and Use of English Part 3",
    summary: "Capacidad, deducción sobre presente/pasado/futuro y expectativas.",
    sections: [
      {
        title: "Ability: can and be able to",
        rules: [
          "En presente, can es más frecuente que be able to para hablar de capacidad general.",
          "Can también expresa que las circunstancias actuales o futuras permiten hacer algo.",
          "En pasado, could y was/were able to sirven para capacidad general.",
          "Para una situación concreta lograda con éxito en el pasado, se usa normalmente was/were able to, no could; en negativo sí pueden usarse couldn’t o wasn’t/weren’t able to.",
          "Para otros tiempos y formas verbales se necesita be able to: will be able to, have been able to, would be able to, to be able to."
        ],
        examples: [
          { english: "She can speak Japanese." },
          { english: "I can meet you tomorrow because I’m free." },
          { english: "He could read when he was four." },
          { english: "We were able to get tickets at the last minute.", note: "logro concreto" },
          { english: "I haven’t been able to contact her." }
        ],
        traps: ["Para un logro concreto pasado afirmativo, evita could: usa was/were able to."]
      },
      {
        title: "Deduction about the present",
        rules: [
          "must + infinitive = deducción positiva de gran certeza.",
          "can’t/couldn’t + infinitive = deducción negativa de gran certeza.",
          "may/might/could + infinitive = posibilidad; might suele sonar algo menos seguro.",
          "may not/might not = posibilidad negativa; could not no tiene este mismo significado.",
          "Estas formas pueden ir seguidas de be + -ing para una situación que creemos que está ocurriendo ahora."
        ],
        examples: [
          { english: "She must be at work — her car is gone." },
          { english: "That can’t be Alex; he’s abroad." },
          { english: "They might be waiting outside." },
          { english: "He may not know the answer." }
        ]
      },
      {
        title: "Deduction about the past",
        rules: [
          "must have + past participle = estoy casi seguro de que ocurrió.",
          "can’t/couldn’t have + past participle = estoy casi seguro de que no ocurrió.",
          "may/might/could have + past participle = es posible que ocurriera.",
          "may not/might not have + past participle = es posible que no ocurriera.",
          "Could have expresa posibilidad positiva; couldn’t have expresa imposibilidad, no una simple posibilidad negativa."
        ],
        examples: [
          { english: "They must have missed the train." },
          { english: "She can’t have seen the message." },
          { english: "He might have taken a different route." }
        ]
      },
      {
        title: "Possibility about the future",
        rules: [
          "May, might y could sirven para posibilidades futuras.",
          "En negativo se usan may not o might not; could not normalmente no se usa con el significado de 'quizá no'."
        ],
        examples: [
          { english: "We may go away this weekend." },
          { english: "There could be a storm tonight." },
          { english: "The bag might not be big enough." }
        ]
      },
      {
        title: "Expectations with should",
        rules: [
          "should + infinitive expresa que esperamos que algo ocurra.",
          "shouldn’t + infinitive expresa que esperamos que algo no ocurra.",
          "También puede señalar sorpresa cuando la realidad no coincide con lo esperado.",
          "Para expectativas sobre el pasado: should (not) have + past participle."
        ],
        examples: [
          { english: "The parcel should arrive tomorrow." },
          { english: "This shouldn’t take long." },
          { english: "He should be at work, but his office is empty." },
          { english: "They should have arrived by now." }
        ]
      }
    ]
  },
  {
    unit: 15,
    slug: "reported-speech",
    title: "Reported speech",
    level: "B2",
    examPractice: "Reading and Use of English Part 4",
    summary: "Backshift, reporting verbs, preguntas indirectas y cambios de referencias temporales/espaciales.",
    sections: [
      {
        title: "Tense changes in reported speech",
        rules: [
          "Si contamos más tarde lo que alguien dijo, normalmente hacemos backshift.",
          "present simple → past simple; present continuous → past continuous.",
          "past simple → past perfect; present perfect → past perfect.",
          "past perfect permanece past perfect.",
          "am/is/are going to → was/were going to.",
          "will → would; can → could; may → might; might permanece might.",
          "must suele convertirse en had to.",
          "Could, would, should, might, ought to, used to y las formas de past perfect normalmente no cambian.",
          "Must puede mantenerse; en negativas y deducciones debe mantenerse must en lugar de had to."
        ],
        examples: [
          { english: "‘I’m tired.’ → She said she was tired." },
          { english: "‘I’ve finished.’ → He said he had finished." },
          { english: "‘I’ll call.’ → She said she would call." },
          { english: "‘You mustn’t tell anyone.’ → He said we mustn’t tell anyone." }
        ]
      },
      {
        title: "When the tense can stay the same",
        rules: [
          "Si el reporting verb está en presente, normalmente conservamos los tiempos originales.",
          "Con reporting verb en pasado, el tiempo puede mantenerse si la información sigue siendo verdadera en el momento de informar.",
          "Si la situación ya ha dejado de ser verdadera, se necesita el cambio de tiempo correspondiente."
        ],
        examples: [
          { english: "Amy says she’s missed the bus." },
          { english: "Robert said he has / had three sisters.", note: "si sigue siendo cierto, ambas pueden ser posibles" }
        ]
      },
      {
        title: "say, tell and other reporting verbs",
        rules: [
          "say + to + person si mencionamos al receptor: say to me.",
          "tell + person sin to y necesita ese objeto: tell me.",
          "That suele omitirse con say/tell, sobre todo al hablar.",
          "Verbos tipo tell + person + that: remind, persuade, inform, warn.",
          "Verbos que suelen llevar that y opcionalmente to + person: mention, point out, complain, explain.",
          "agree usa with para la persona: agree with someone that....",
          "answer y reply pueden ir con that sin mencionar receptor."
        ],
        examples: [
          { english: "She said to me that she was leaving." },
          { english: "She told me she was leaving." },
          { english: "He warned us that the road was dangerous." },
          { english: "She explained to us that the office was closed." }
        ],
        traps: ["No: said me; no: told to me; no: told that... sin objeto."]
      },
      {
        title: "Reporting with to infinitive",
        rules: [
          "Órdenes: tell + object + to infinitive; negativas con not to.",
          "Peticiones: ask + object + to infinitive.",
          "Otros patrones frecuentes: advise + object + to; offer + to; promise + to; agree + to."
        ],
        examples: [
          { english: "‘Be quiet.’ → The teacher told us to be quiet." },
          { english: "‘Please help me.’ → She asked me to help her." },
          { english: "‘We can help.’ → They offered to help." }
        ]
      },
      {
        title: "Reporting questions",
        rules: [
          "En reported questions se usa orden de afirmación, no orden de pregunta.",
          "Las preguntas con question word conservan who/what/where/how/etc.",
          "Las yes/no questions se introducen con if o whether.",
          "La misma estructura se usa en preguntas indirectas corteses."
        ],
        examples: [
          { english: "‘Where do you live?’ → She asked me where I lived." },
          { english: "‘Are you ready?’ → He asked if/whether I was ready." },
          { english: "Can you tell me what time the train leaves?" }
        ],
        traps: ["No hagas inversión dentro de la reported question: where I lived, no where did I live."]
      },
      {
        title: "Changes in time and place references",
        rules: [
          "Según la distancia temporal o espacial, pueden cambiarse referencias: yesterday → the day before/previous day; today → that/the same day; tomorrow → the next/following day; next week → the next/following week; now → then/right away, según el contexto.",
          "También puede cambiar here → there y this → that/the.",
          "Estos cambios dependen del contexto real: no son mecánicos si la referencia sigue siendo la misma."
        ],
        examples: [
          { english: "‘I saw him here yesterday.’ → She said she had seen him there the day before." }
        ]
      }
    ]
  },
  {
    unit: 16,
    slug: "the-passive",
    title: "The passive",
    level: "B2",
    examPractice: "Reading and Use of English Part 4",
    summary: "Formación y usos de la pasiva, causative have/get y estructuras impersonales.",
    sections: [
      {
        title: "How the passive is formed",
        forms: ["be in the required tense + past participle"],
        rules: [
          "La forma de be lleva el tiempo/aspecto; el verbo principal aparece como past participle.",
          "Patrones principales: to be caught, to have been caught, being caught, having been caught.",
          "Present simple: am/is/are caught; present continuous: am/is/are being caught; present perfect: have/has been caught.",
          "Past simple: was/were caught; past continuous: was/were being caught; past perfect: had been caught.",
          "Future: will be caught; going to: am/is/are going to be caught.",
          "Conditional: would be caught; perfect conditional: would have been caught."
        ],
        examples: [
          { english: "The suspect was arrested yesterday." },
          { english: "The road is being repaired." },
          { english: "The results will be announced tomorrow." }
        ]
      },
      {
        title: "When the passive is used",
        rules: [
          "Cuando no sabemos quién realizó la acción.",
          "Cuando la acción o su resultado es más importante que el agente.",
          "Cuando resulta obvio quién hizo la acción.",
          "Si el agente importa, puede añadirse by + person/thing."
        ],
        examples: [
          { english: "My bike has been stolen.", note: "agente desconocido" },
          { english: "Income tax was introduced in the eighteenth century.", note: "interesa el hecho" },
          { english: "The robber was seen by a police officer.", note: "agente relevante" }
        ]
      },
      {
        title: "Verbs with two objects",
        rules: [
          "Con verbos como give, send, buy o bring puede haber dos objetos en activa.",
          "Cualquiera de esos objetos puede convertirse en sujeto de la pasiva, adaptando to cuando sea necesario."
        ],
        examples: [
          { english: "They gave me a prize. → I was given a prize." },
          { english: "They gave a prize to me. → A prize was given to me." }
        ]
      },
      {
        title: "have/get something done",
        forms: ["have/get + object + past participle"],
        rules: [
          "Se usa cuando otra persona realiza un servicio o acción para nosotros.",
          "Normalmente no hace falta decir quién realiza el trabajo.",
          "Get es más informal que have."
        ],
        examples: [
          { english: "I had my hair cut yesterday." },
          { english: "We’re having the kitchen painted." },
          { english: "When are you getting the window repaired?" }
        ]
      },
      {
        title: "It is said that...",
        rules: [
          "it + passive + that permite informar de lo que la gente en general dice, cree, acuerda, anuncia, decide, informa o piensa.",
          "Verbos frecuentes en este patrón: agree, announce, believe, decide, report, say, think."
        ],
        examples: [
          { english: "It is believed that the building is unsafe." },
          { english: "It has been announced that a new bridge will be built." },
          { english: "It was thought that the Earth was the centre of the universe." }
        ]
      }
    ]
  },
  {
    unit: 17,
    slug: "conditionals-1",
    title: "Conditionals (1)",
    level: "B2",
    examPractice: "Reading and Use of English Part 6",
    summary: "Zero, first, second, third y mixed conditionals.",
    sections: [
      {
        title: "How conditional sentences work",
        rules: [
          "Una conditional sentence relaciona una condición con su consecuencia.",
          "La elección de tiempos depende de si la situación es general, posible, improbable o imaginaria y de si hablamos de presente/futuro o pasado.",
          "Si la if-clause va primero, normalmente se separa con coma; si va después, normalmente no."
        ],
        examples: [
          { english: "If you call me, I’ll answer." },
          { english: "I’ll answer if you call me." }
        ]
      },
      {
        title: "Zero conditional",
        forms: ["if + present, present"],
        rules: [
          "Se usa para verdades generales o relaciones que consideramos siempre válidas.",
          "En este tipo, if puede equivaler a when."
        ],
        examples: [{ english: "If you heat ice, it melts." }]
      },
      {
        title: "First conditional",
        forms: ["if + present, will + infinitive"],
        rules: [
          "Se usa para una condición presente/futura que consideramos realmente posible.",
          "Después de if se usa presente aunque el significado sea futuro.",
          "Aquí if no equivale siempre a when: when presenta el hecho como seguro; if lo presenta como posible.",
          "En lenguaje hablado, imperative + and puede expresar una condición parecida, especialmente en promesas y amenazas."
        ],
        examples: [
          { english: "If it rains, we’ll stay inside." },
          { english: "When I see Marta, I’ll tell her.", note: "se da por seguro que la veré" },
          { english: "Finish your homework and I’ll help you with the game." }
        ],
        traps: ["No: If it will rain...."]
      },
      {
        title: "Second conditional",
        forms: ["if + past, would + infinitive"],
        rules: [
          "Se usa para condiciones imaginarias, imposibles o muy improbables en presente/futuro.",
          "El past tense después de if expresa distancia/irrealidad, no tiempo pasado real.",
          "Were puede sustituir a was después de I/he/she/it, sobre todo en registro formal.",
          "En If I were you... se usa were para dar consejo."
        ],
        examples: [
          { english: "If I had more time, I would learn Italian." },
          { english: "If I were you, I wouldn’t wait." }
        ]
      },
      {
        title: "Third conditional",
        forms: ["if + past perfect, would have + past participle"],
        rules: [
          "Habla de un pasado que ya no puede cambiarse: la condición es imposible y la consecuencia es imaginaria.",
          "Might o could pueden sustituir a would para expresar posibilidad o capacidad en la consecuencia."
        ],
        examples: [
          { english: "If I’d known, I would have called you." },
          { english: "If it had snowed, we could have gone skiing." }
        ]
      },
      {
        title: "Mixed conditionals",
        rules: [
          "Mezclan patrones de second y third conditional cuando la condición y la consecuencia pertenecen a tiempos diferentes.",
          "Pasado → presente: una condición pasada explica un resultado actual.",
          "Presente → pasado: una característica o estado actual explica una consecuencia pasada."
        ],
        examples: [
          { english: "If I had gone to bed earlier, I wouldn’t be so tired now." },
          { english: "If she were more organised, she wouldn’t have missed the train." }
        ]
      }
    ]
  },
  {
    unit: 18,
    slug: "to-infinitive-and-ing",
    title: "The to infinitive and -ing",
    level: "B2",
    examPractice: "Reading and Use of English Part 1",
    summary: "Verb patterns completos: to-infinitive, bare infinitive, -ing, cambios de significado y adjective + infinitive.",
    sections: [
      {
        title: "Verb + to infinitive",
        rules: [
          "Van normalmente con to-infinitive: afford, agree, aim, appear, arrange, attempt, choose, decide, demand, deserve, fail, hope, learn, manage, neglect, offer, omit, plan, prepare, pretend, refuse, seem, tend, threaten, can’t wait, wish.",
          "La negación se coloca delante del to-infinitive: decide not to go.",
          "Siempre necesitan objeto antes del infinitivo: advise, allow, encourage, forbid, force, invite, order, permit, persuade, remind, teach, tell, warn.",
          "Advise, allow, encourage, forbid y permit también pueden llevar -ing si no hay objeto.",
          "Ask, beg, expect, help, intend, promise y want pueden llevar objeto o no según el significado."
        ],
        examples: [
          { english: "I decided to leave early." },
          { english: "They reminded me to bring my passport." },
          { english: "I advise taking a taxi." },
          { english: "We expected Tom to be late." }
        ]
      },
      {
        title: "Verb + infinitive without to",
        rules: [
          "Los modales, had better y would rather van seguidos de infinitivo sin to.",
          "Help admite infinitivo con o sin to.",
          "Make y let llevan objeto + infinitivo sin to."
        ],
        examples: [
          { english: "You should call her." },
          { english: "We helped them (to) move." },
          { english: "She made me apologise." },
          { english: "Let him speak." }
        ]
      },
      {
        title: "Verb + -ing",
        rules: [
          "Van normalmente con -ing: admit, avoid, can’t face, can’t help, can’t stand, carry on, consider, delay, deny, detest, dislike, enjoy, fancy, feel like, finish, give up, imagine, involve, keep (on), mention, (not) mind, miss, postpone, practise, put off, recommend, risk, resist, suggest.",
          "La negación se forma con not + -ing."
        ],
        examples: [
          { english: "I avoid driving at night." },
          { english: "She suggested taking the earlier train." },
          { english: "You risk not getting a seat." }
        ]
      },
      {
        title: "Verb + to infinitive or -ing with little/no difference",
        rules: [
          "Begin, can’t bear, continue, hate, dislike, like, love, prefer, propose y start pueden admitir ambas formas con significado muy parecido.",
          "Se evita normalmente encadenar dos formas -ing: I was starting to cook, no starting cooking.",
          "Would like/love/prefer/hate llevan siempre to-infinitive.",
          "Like + to-infinitive puede enfatizar hábito o lo que consideramos conveniente; like + -ing enfatiza disfrute."
        ],
        examples: [
          { english: "I love cooking / I love to cook." },
          { english: "I’d love to come." },
          { english: "I like to arrive early for meetings.", note: "lo considero buena práctica" },
          { english: "I like dancing.", note: "lo disfruto" }
        ]
      },
      {
        title: "Verb + to infinitive or -ing: meaning changes",
        rules: [
          "remember to do = recordar una tarea pendiente; remember doing = recordar una acción pasada.",
          "forget to do = olvidar hacer algo; forget doing = perder/no conservar el recuerdo de algo hecho.",
          "regret to do = lamentar comunicar/hacer algo ahora; regret doing = arrepentirse de algo pasado.",
          "stop to do = detener una actividad para hacer otra; stop doing = dejar de hacer esa actividad.",
          "mean to do = tener intención; mean doing = implicar/suponer.",
          "go on to do = pasar a la siguiente acción; go on doing = continuar con la misma.",
          "try to do = intentar conseguir algo; try doing = probar como experimento/solución."
        ],
        examples: [
          { english: "Remember to lock the door." },
          { english: "I remember locking the door." },
          { english: "She stopped to answer the phone." },
          { english: "She stopped answering his calls." },
          { english: "Try restarting the computer." }
        ],
        traps: ["En estos verbos el pattern no es intercambiable: cambia el significado."]
      },
      {
        title: "Sense verbs + object + -ing / bare infinitive",
        rules: [
          "Feel, hear, notice, see y watch pueden ir con objeto + -ing o objeto + infinitivo sin to.",
          "-ing presenta una actividad en progreso o vista durante un período.",
          "Bare infinitive presenta una acción completa o breve percibida como un todo."
        ],
        examples: [
          { english: "I watched them playing football.", note: "actividad en progreso" },
          { english: "I watched him score the goal.", note: "acción completa" },
          { english: "I heard the baby crying." },
          { english: "I heard the doorbell ring." }
        ]
      },
      {
        title: "Verb + that clause",
        rules: [
          "Muchos verbos de las listas anteriores también permiten una that-clause con significado equivalente.",
          "Entre ellos aparecen admit, imagine, suggest, recommend y agree, además de otros marcados en los patrones anteriores."
        ],
        examples: [
          { english: "She admitted taking the money. = She admitted that she had taken the money." },
          { english: "I suggest leaving now. = I suggest that we leave now." }
        ]
      },
      {
        title: "Adjective + to infinitive",
        rules: [
          "Muchos adjetivos admiten to-infinitive: afraid, cheap, dangerous, delighted, difficult, easy, expensive, happy, hard, impossible, interesting, nice, pleased, possible, safe, sorry, surprised.",
          "Con algunos, especialmente dangerous, difficult, easy, hard y nice, también puede aparecer -ing con un significado muy parecido."
        ],
        examples: [
          { english: "I’m surprised to see you here." },
          { english: "The instructions were difficult to follow." },
          { english: "It’s nice to meet / meeting old friends." }
        ]
      }
    ]
  }
];
