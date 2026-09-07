import type { GrammarTopic } from "./types";

export const c1GoldGrammarUnits07to09: GrammarTopic[] = [
  {
      unit: 7,
      slug: "c1-conditionals-advanced",
      title: "Conditionals: advanced features",
      level: "C1",
      examPractice: "Gold C1 · Unit 7 · Grammar reference pp. 158–160",
      summary: "Alternativas a if, mixed conditionals, inversión formal, happen to, suppose/what if e if + will/would.",
      sections: [
        {
          title: "Mixed conditionals and modal flexibility",
          rules: [
            "Los mixed conditionals combinan tiempos cuando la condición y el resultado pertenecen a momentos distintos.",
            "Un if-clause pasado puede producir un resultado presente/futuro: if + past perfect → would/could + infinitive.",
            "Un if-clause presente/futuro puede relacionarse con una consecuencia pasada cuando el significado lo exige.",
            "Can, could, might y otros modals pueden aparecer en distintos tipos de conditional para ajustar posibilidad, capacidad o consecuencia."
          ],
          examples: [
            { english: "If I'd accepted that job, I'd be living in Berlin now." },
            { english: "If you hate hot weather, you shouldn't have booked August." }
          ]
        },
        {
          title: "Conditional linkers and alternatives to if",
          rules: [
            "Además de if, son frecuentes as/so long as, unless, even if, whether, providing, provided (that) y on condition that.",
            "In the event of + noun presenta formalmente una posible situación futura.",
            "Otherwise introduce la consecuencia si no se cumple la condición implícita.",
            "In case introduce una precaución ante algo que podría ocurrir; no equivale a if."
          ],
          examples: [
            { english: "You can stay as long as you keep the noise down." },
            { english: "In the event of cancellation, we'll refund the full amount." },
            { english: "Take a charger in case the battery runs out." }
          ],
          traps: ["In case = precaución; if = condición. No son intercambiables."]
        },
        {
          title: "Formal conditional inversion",
          forms: ["Had + subject + past participle, ...", "Were + subject + ..., ...", "Should + subject + infinitive, ..."],
          rules: [
            "En estilo formal podemos omitir if e invertir auxiliary + subject.",
            "Had + subject... sustituye a if + past perfect.",
            "Were + subject... puede sustituir a if + were en hipótesis formales.",
            "Should + subject + infinitive es una forma formal de if + subject + should, frecuente en cartas y comunicaciones formales."
          ],
          examples: [
            { english: "Had I known about the delay, I would have left later." },
            { english: "Were she available, we could ask her directly." },
            { english: "Should you require further information, please contact us." }
          ]
        },
        {
          title: "Happen to and chance possibility",
          forms: ["if + subject + (should) happen to + infinitive"],
          rules: [
            "If + (should) happen to presenta una posibilidad como casual o menos probable.",
            "Should y happen pueden aparecer juntos para aumentar la distancia o formalidad."
          ],
          examples: [
            { english: "If you happen to see Liam, ask him to call me." },
            { english: "If you should happen to be in Madrid, let me know." }
          ]
        },
        {
          title: "Suppose / what if",
          rules: [
            "Suppose/what if + present simple plantea una posibilidad real o algo que puede haber ocurrido.",
            "Suppose/what if + past simple plantea una situación imaginaria o poco probable presente/futura.",
            "Suppose/what if + past perfect imagina un pasado alternativo que no ocurrió."
          ],
          examples: [
            { english: "Suppose nobody answers. What will we do?" },
            { english: "Suppose you got the job abroad. Would you move?" },
            { english: "What if we'd taken the other road?" }
          ]
        },
        {
          title: "If + will / would for willingness",
          rules: [
            "Aunque normalmente evitamos will en un if-clause de condición, sí puede aparecer cuando will/would significa 'be willing to'.",
            "If + will/would se usa especialmente en peticiones educadas y fórmulas formales."
          ],
          examples: [
            { english: "If you'll wait here for a moment, I'll see whether she's free." },
            { english: "If you would sign here, we can complete the application." }
          ]
        }
      ]
    },
  {
      unit: 8,
      slug: "c1-reported-speech",
      title: "Reported speech: C1 control",
      level: "C1",
      examPractice: "Gold C1 · Unit 8 · Grammar reference pp. 160–161",
      summary: "Backshift flexible, cambios de referencia y reported questions con criterio de significado, no como transformación mecánica.",
      sections: [
        {
          title: "When backshift is and isn't needed",
          rules: [
            "Con reporting verb en pasado, el tense suele retroceder: present → past, past → past perfect, present perfect → past perfect, will → would, can → could y must de obligación → had to.",
            "No es obligatorio cambiar el tense si la información sigue siendo verdadera o vigente.",
            "Tampoco hace falta si lo reportado ocurrió hace muy poco y la referencia temporal sigue siendo la misma.",
            "Would, could, might, ought to, should y must de deducción normalmente no cambian.",
            "El past perfect ya no puede retroceder más y se mantiene."
          ],
          examples: [
            { english: "'The earth is getting warmer.' → She said the earth is getting warmer.", note: "hecho aún vigente" },
            { english: "'I had already sent it.' → He said he had already sent it." }
          ]
        },
        {
          title: "Time and place reference changes",
          rules: [
            "Tomorrow puede pasar a the next/following day; yesterday a the day before/previous day.",
            "Now puede pasar a then/at that time; here a there; today a that day.",
            "Ago suele pasar a before/earlier.",
            "Estos cambios no son automáticos: dependen de si el punto de referencia realmente ha cambiado."
          ],
          examples: [
            { english: "'I'll finish tomorrow.' → She said she'd finish the following day." }
          ]
        },
        {
          title: "Reported questions",
          rules: [
            "Yes/No questions usan if o whether.",
            "Wh- questions conservan la wh-word, pero pasan a statement word order: subject + verb.",
            "Los mismos cambios de tense, persona, tiempo y lugar que en reported statements se aplican cuando son necesarios.",
            "No se mantiene do/does/did como auxiliary de pregunta."
          ],
          examples: [
            { english: "'Can you help?' → She asked whether I could help." },
            { english: "'Why did you leave?' → He asked why I had left." }
          ],
          traps: ["Reported question: why I had left, no why had I left."]
        }
      ]
    },
  {
      unit: 8,
      slug: "c1-reporting-verb-patterns",
      title: "Reporting verb patterns",
      level: "C1",
      examPractice: "Gold C1 · Unit 8 · Grammar reference p. 161",
      summary: "Patrones de reporting verbs para resumir intención: infinitive, clause, -ing y prepositional patterns.",
      sections: [
        {
          title: "Reporting verb + infinitive patterns",
          rules: [
            "Verb + to-infinitive: agree, claim, decide, offer, promise, refuse, threaten.",
            "Verb + object + to-infinitive: advise, beg, encourage, invite, order, permit, persuade, remind, tell, warn.",
            "Verb + wh-word + to-infinitive: describe, explain, know, wonder.",
            "Verb + object + wh-word + to-infinitive: ask, remind, tell."
          ],
          examples: [
            { english: "She refused to comment." },
            { english: "They warned us not to touch the equipment." },
            { english: "He explained where to leave the documents." }
          ]
        },
        {
          title: "Reporting verb + clause",
          rules: [
            "Verb + (that) + clause: accept, admit, claim, doubt, explain, promise, recommend, say, suggest.",
            "Verb + object + (that) + clause: promise, remind, tell, warn.",
            "Con recommend/suggest, la clause puede llevar should o una forma base en registros formales."
          ],
          examples: [
            { english: "She suggested that we should leave early." },
            { english: "He warned us that the road might be closed." }
          ]
        },
        {
          title: "Reporting verb + -ing / preposition + -ing",
          rules: [
            "Verb + -ing: admit, deny, recommend, regret, suggest.",
            "Verb + preposition + -ing: apologise for, insist on, object to.",
            "Verb + object + preposition + -ing: accuse somebody of, blame somebody for, congratulate somebody on, discourage somebody from, forgive somebody for.",
            "En C1 conviene aprender el reporting verb junto con su patrón completo."
          ],
          examples: [
            { english: "He denied taking the money." },
            { english: "She apologised for arriving late." },
            { english: "They accused him of hiding information." }
          ]
        },
        {
          title: "Impersonal reporting verbs",
          rules: [
            "En formal written English, verbs como believe, consider, expect y suggest pueden reportar opiniones generales sin identificar una fuente concreta.",
            "La estructura impersonal típica es It + be + past participle + that-clause.",
            "Otra opción frecuente, especialmente con pasiva, es subject + be + past participle + to-infinitive."
          ],
          examples: [
            { english: "It is believed that demand will increase." },
            { english: "The company is expected to announce the results tomorrow." }
          ]
        }
      ]
    },
  {
      unit: 9,
      slug: "c1-future-in-the-past",
      title: "Future in the past",
      level: "C1",
      examPractice: "Gold C1 · Unit 9 · Grammar reference pp. 161–162",
      summary: "Formas para hablar desde un punto pasado sobre acontecimientos que entonces todavía pertenecían al futuro.",
      sections: [
        {
          title: "Future viewed from a past perspective",
          rules: [
            "Past continuous puede presentar un plan o acontecimiento futuro visto desde un momento pasado.",
            "Was/were going to + infinitive expresa una intención pasada, con frecuencia no cumplida.",
            "Would puede describir un acontecimiento futuro desde el pasado, tanto si realmente ocurrió como si era una predicción en aquel momento.",
            "Was/were to + infinitive se usa para acontecimientos previstos, especialmente en narración formal; was/were to have + past participle puede marcar que el acontecimiento previsto finalmente no ocurrió."
          ],
          examples: [
            { english: "The lecture was starting in ten minutes, so we hurried." },
            { english: "I was going to call you, but my phone died." },
            { english: "Nobody knew the small company would become a global brand." },
            { english: "The new branch was to have opened in June, but the project was cancelled." }
          ]
        },
        {
          title: "Interrupted and unfulfilled future plans",
          rules: [
            "Was/were about to + infinitive describe una acción futura inminente que suele ser interrumpida.",
            "Was/were thinking of + -ing puede presentar una intención que estaba formándose y fue interrumpida o no se llevó a cabo.",
            "Was/were due to, meant to y supposed to expresan planes, expectativas u obligaciones previstas que pueden no haberse cumplido."
          ],
          examples: [
            { english: "I was about to leave when you rang." },
            { english: "We were meant to meet at six, but she never arrived." },
            { english: "The flight was due to depart at nine, but it was delayed." }
          ]
        }
      ]
    }
];
