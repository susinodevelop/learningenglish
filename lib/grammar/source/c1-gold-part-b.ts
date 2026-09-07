import type { GrammarTopic } from "./types";

export const c1GoldGrammarUnits04to06: GrammarTopic[] = [
  {
      unit: 4,
      slug: "c1-verb-patterns",
      title: "Verb patterns: -ing and infinitive",
      level: "C1",
      examPractice: "Gold C1 · Unit 4 · Grammar reference pp. 153–154",
      summary: "Taxonomía C1 de verb + -ing, infinitive, object patterns y cambios de significado.",
      sections: [
        {
          title: "Verb + -ing",
          forms: ["verb + verb-ing"],
          rules: [
            "Entre los verbos frecuentes seguidos de -ing están admit, appreciate, avoid, consider, delay, deny, detest, dislike, enjoy, escape, face, feel like, finish, forgive, give up, imagine, involve, keep, mention, mind, miss, postpone, practise, prefer, put off, recommend, regret, resent, risk, suggest y understand.",
            "El patrón pertenece al primer verbo: no se decide por traducción literal desde el español.",
            "Algunas combinaciones incluyen phrasal/prepositional verbs como give up o put off y mantienen -ing después."
          ],
          examples: [
            { english: "She admitted copying the file." },
            { english: "We postponed making a final decision." }
          ]
        },
        {
          title: "Verb + object + -ing",
          forms: ["verb + object + verb-ing"],
          rules: [
            "Verbos como catch, discover, find, forbid, notice, observe, overhear y prevent pueden introducir un objeto seguido de -ing.",
            "La -ing clause presenta la acción que se observa, descubre, impide, etc."
          ],
          examples: [
            { english: "I noticed him checking his phone during the meeting." },
            { english: "They prevented us entering the building." }
          ]
        },
        {
          title: "Verb + to-infinitive",
          forms: ["verb + to + infinitive"],
          rules: [
            "Entre los verbos frecuentes están afford, agree, appear, arrange, ask, attempt, choose, consent, decide, determine, expect, fail, forget, happen, hesitate, hope, intend, learn, manage, mean, offer, prepare, pretend, promise, propose, refuse, remember, seem, swear, try, want y wish.",
            "Otros como begin, hate, help, like, love, prefer y start pueden aceptar más de un patrón según el contexto."
          ],
          examples: [
            { english: "They managed to reach an agreement." },
            { english: "I refuse to accept those conditions." }
          ]
        },
        {
          title: "Verb + object + to-infinitive / bare infinitive",
          forms: ["verb + object + to-infinitive", "let/make/hear/help + object + bare infinitive"],
          rules: [
            "Advise, allow, ask, cause, command, encourage, expect, forbid, force, get, instruct, invite, oblige, order, permit, persuade, remind, request, teach, tell, tempt, want y warn suelen usar object + to-infinitive.",
            "Let y make usan normalmente object + infinitive without to; hear y help también pueden aparecer con bare infinitive.",
            "En pasiva, make, hear y help pasan normalmente a to-infinitive: was made to..., was heard to....",
            "Las formas pasivas con advise/order/etc. también van seguidas de to-infinitive."
          ],
          examples: [
            { english: "They persuaded me to apply." },
            { english: "The joke made everyone laugh." },
            { english: "We were made to wait outside." }
          ],
          traps: ["Make + object usa bare infinitive en activa, pero to-infinitive en pasiva."]
        },
        {
          title: "-ing or infinitive: change of meaning",
          rules: [
            "Remember/forget + -ing mira hacia atrás: la acción ya ocurrió; + to-infinitive mira hacia delante: primero recuerdas y después haces la acción.",
            "Regret + -ing expresa arrepentimiento por una acción pasada; regret + to-infinitive introduce formalmente una noticia presente desagradable.",
            "Stop + -ing = dejar de hacer la actividad; stop + to-infinitive = detener una actividad para hacer otra.",
            "Try + -ing = probar un método como experimento; try + to-infinitive = esforzarse por conseguir algo difícil.",
            "Attempt, begin, continue, love, prefer, see y start pueden admitir -ing o infinitive con poca diferencia en muchos contextos."
          ],
          examples: [
            { english: "I remember meeting her at a conference." },
            { english: "Remember to send her the contract." },
            { english: "Try restarting the router.", note: "experimento" },
            { english: "Try to stay calm.", note: "esfuerzo" }
          ]
        }
      ]
    },
  {
      unit: 4,
      slug: "c1-modals",
      title: "Modal verbs: C1 distinctions",
      level: "C1",
      examPractice: "Gold C1 · Unit 4 · Grammar reference pp. 154–155",
      summary: "Matices C1 de posibilidad, deducción, obligación, necesidad, capacidad y crítica con modal perfect forms.",
      sections: [
        {
          title: "Possibility and deduction",
          rules: [
            "Can/could pueden expresar posibilidad teórica.",
            "May/might/could + infinitive expresan posibilidad presente o futura; may suele sugerir una posibilidad algo más fuerte que might/could según el contexto.",
            "May/might/could + have + past participle expresan posibilidad sobre un evento pasado.",
            "Must expresa deducción positiva fuerte; must have + past participle la traslada al pasado.",
            "Can't/couldn't expresan deducción negativa fuerte en presente o pasado; no usamos mustn't con este significado."
          ],
          examples: [
            { english: "She might have missed the train." },
            { english: "He must have misunderstood the question." },
            { english: "That can't be the final version." }
          ],
          traps: ["Mustn't = prohibición; can't/couldn't = deducción negativa."]
        },
        {
          title: "Obligation, prohibition and necessity",
          rules: [
            "Must/mustn't suelen presentar obligación o prohibición desde la perspectiva del hablante.",
            "Have to/have got to suelen presentar una obligación impuesta externamente; have got to es especialmente común en British English.",
            "Had to expresa obligación pasada y también la forma reportada de must cuando significa obligación.",
            "Need to expresa necesidad u obligación de manera más neutral."
          ],
          examples: [
            { english: "I must finish this before I leave." },
            { english: "We have to submit the form by Friday." }
          ]
        },
        {
          title: "Needn't have vs didn't need to",
          rules: [
            "Needn't / don't need to / don't have to expresan ausencia de obligación presente o futura.",
            "Needn't have + past participle significa que la acción sí se realizó, pero era innecesaria.",
            "Didn't need to + infinitive dice que no era necesario, sin aclarar por sí solo si la persona finalmente lo hizo o no."
          ],
          examples: [
            { english: "You needn't have bought any food; we'd already cooked." },
            { english: "We didn't need to book in advance." }
          ],
          traps: ["Needn't have done implica que lo hiciste; didn't need to do no confirma si lo hiciste."]
        },
        {
          title: "Ability and unfulfilled ability",
          rules: [
            "Can/be able to expresan capacidad presente y futura; can también aparece cuando existe oportunidad futura.",
            "Could/couldn't y was/were able to pueden expresar capacidad general pasada.",
            "Could have + past participle puede expresar una capacidad u oportunidad pasada que no se aprovechó."
          ],
          examples: [
            { english: "I could have studied abroad, but I chose to stay." }
          ]
        },
        {
          title: "Should and past criticism",
          forms: ["should/ought to + infinitive", "should have + past participle"],
          rules: [
            "Should expresa consejo, deber u obligación menos categórica; ought to es más formal.",
            "Should have + past participle sirve para criticar una acción pasada o expresar que otra conducta habría sido mejor."
          ],
          examples: [
            { english: "You should have checked the figures before publishing them." }
          ]
        }
      ]
    },
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
            "Neither/nor + auxiliary + subject permite evitar repetir una oración negativa completa."
          ],
          examples: [
            { english: "I need a charger. Do you have one?" },
            { english: "Will they approve it? I hope so." },
            { english: "I don't enjoy long flights, and neither does Marta." }
          ]
        },
        {
          title: "Ellipsis",
          intro: "Con ellipsis no sustituimos el elemento repetido: simplemente lo omitimos porque el oyente o lector puede reconstruirlo.",
          rules: [
            "Puede aparecer después de and, but y or cuando las dos coordinadas comparten material.",
            "Es frecuente al final de verb phrases cuando el auxiliary conserva la información gramatical necesaria.",
            "Con infinitives podemos conservar solo to cuando el verbo principal ya está claro.",
            "La ellipsis es especialmente frecuente en conversación informal y respuestas breves."
          ],
          examples: [
            { english: "She wanted to come, but she couldn't." },
            { english: "I didn't want to leave, but I had to." },
            { english: "Going out tonight? Not sure yet.", note: "ellipsis conversacional" }
          ]
        }
      ]
    },
  {
      unit: 5,
      slug: "c1-hypothetical-meaning",
      title: "Hypothetical meaning",
      level: "C1",
      examPractice: "Gold C1 · Unit 5 · Grammar reference pp. 156–157",
      summary: "Wish, if only, it's time y would rather con tiempos pasados usados para distancia hipotética, no necesariamente para tiempo pasado.",
      sections: [
        {
          title: "Wish: present, behaviour and regret",
          rules: [
            "Wish + past simple expresa deseo de que una situación presente sea diferente; con be, were es frecuente en estilos más formales.",
            "Wish + would se usa sobre todo para hábitos o comportamientos irritantes de otras personas.",
            "Para deseos sobre nuestra propia capacidad usamos normalmente wish + could, no wish + would.",
            "Wish + past perfect expresa arrepentimiento o deseo de cambiar un hecho pasado."
          ],
          examples: [
            { english: "I wish I knew the answer." },
            { english: "I wish he'd stop interrupting." },
            { english: "I wish I could speak Japanese." },
            { english: "I wish I hadn't sent that message." }
          ]
        },
        {
          title: "If only",
          rules: [
            "If only usa las mismas formas verbales que wish, pero expresa el deseo, arrepentimiento o crítica con más intensidad.",
            "Puede aparecer con would/wouldn't para criticar la conducta de otra persona."
          ],
          examples: [
            { english: "If only I'd listened to your advice!" },
            { english: "If only the neighbours would be quieter." }
          ]
        },
        {
          title: "It's time / about time / high time",
          forms: ["It's (about/high) time + subject + past simple"],
          rules: [
            "Aunque la referencia sea presente o futura, usamos past simple para indicar que la acción ya debería haberse realizado.",
            "About time y high time añaden énfasis."
          ],
          examples: [
            { english: "It's high time we made a decision." }
          ]
        },
        {
          title: "Would rather + past",
          rules: [
            "Would rather + subject + past simple expresa una preferencia sobre la conducta de otra persona en presente/futuro.",
            "Would rather + subject + past perfect expresa una preferencia retrospectiva: queríamos que algo hubiera ocurrido de otra forma.",
            "Para preferencias del propio sujeto usamos would rather + bare infinitive, no past simple/past perfect."
          ],
          examples: [
            { english: "I'd rather you didn't mention the price." },
            { english: "I'd rather you had told me earlier." },
            { english: "I'd rather stay at home tonight." }
          ]
        }
      ]
    },
  {
      unit: 6,
      slug: "c1-comparing",
      title: "Comparing: advanced modification",
      level: "C1",
      examPractice: "Gold C1 · Unit 6 · Grammar reference p. 157",
      summary: "Comparatives y superlatives C1 con intensificadores, aproximación, equivalencia y estructuras de contraste fuerte.",
      sections: [
        {
          title: "Intensifying and weakening comparisons",
          rules: [
            "Comparatives pueden intensificarse con considerably, far, much, a lot y a great deal.",
            "A bit, slightly y a little suavizan la diferencia.",
            "More and more expresa cambio progresivo.",
            "No + comparative puede negar que exista una diferencia relevante: no worse, no better, etc.",
            "Not any + comparative refuerza que no hay mejora/diferencia."
          ],
          examples: [
            { english: "The second version is considerably clearer." },
            { english: "This route is only slightly longer." }
          ]
        },
        {
          title: "As...as and distance from equality",
          rules: [
            "Just/quite/easily pueden modificar as...as cuando queremos reforzar equivalencia.",
            "Almost/not quite expresan cercanía a la igualdad.",
            "Not nearly/nowhere near as...as expresan una diferencia grande.",
            "By far refuerza un superlative."
          ],
          examples: [
            { english: "The online course is nowhere near as demanding as the intensive one." },
            { english: "It was by far the best option." }
          ]
        },
        {
          title: "Like and nothing like as",
          rules: [
            "Like + noun expresa similitud.",
            "Nothing like as + adjective/adverb + as enfatiza que dos cosas son muy diferentes.",
            "As en comparaciones aparece en estructuras como as...as y not so/as...as; no sustituye libremente a like + noun."
          ],
          examples: [
            { english: "She sounds just like her sister." },
            { english: "Working remotely is nothing like as easy as it looks." }
          ]
        }
      ]
    },
  {
      unit: 6,
      slug: "c1-modifying-adverbs",
      title: "Modifying adverbs",
      level: "C1",
      examPractice: "Gold C1 · Unit 6 · Grammar reference pp. 157–158",
      summary: "Intensifiers y modifiers según gradability y collocation: no todos los adverbs combinan con todos los adjectives.",
      sections: [
        {
          title: "Gradable adjectives and adverbs",
          rules: [
            "Los gradable adjectives/adverbs admiten intensificadores o atenuadores como very, really, extremely, somewhat, pretty, quite, deeply, seriously, barely, practically, completely y entirely.",
            "La elección correcta depende también de collocation: bitterly disappointed, deeply sorry, seriously worried, perfectly capable, etc.",
            "Aprender el modificador como parte de la collocation es más fiable que traducirlo palabra por palabra."
          ],
          examples: [
            { english: "She was bitterly disappointed by the result." },
            { english: "I'm perfectly aware of the risk." }
          ]
        },
        {
          title: "Extreme / non-gradable adjectives",
          rules: [
            "Adjectives extremos o absolutos como amazing, devastating, disastrous, fantastic, freezing, furious, immense, impossible y staggering no se comportan como gradable adjectives normales.",
            "Con ellos son naturales absolutely, totally, really, utterly, pretty y quite.",
            "Con non-gradable adjectives, quite puede significar 'absolutely', no simplemente 'fairly'."
          ],
          examples: [
            { english: "The damage was absolutely devastating." },
            { english: "The hall was utterly immense." }
          ],
          traps: ["Very impossible/very freezing suelen ser malas elecciones: usa intensifiers compatibles con non-gradable adjectives."]
        }
      ]
    }
];
