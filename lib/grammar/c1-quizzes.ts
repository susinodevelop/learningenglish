import type { GrammarQuizQuestion } from "./quizzes";

export const c1GrammarQuizzes: Record<string, GrammarQuizQuestion[]> = {
  "c1-present-aspect": [
    { prompt: "By next June, I ___ here for ten years.", options: ["will work", "will have been working", "am working"], answer: 1, explanation: "Future perfect continuous destaca la duración de una actividad hasta un punto futuro." },
    { prompt: "She was exhausted because she ___ all morning.", options: ["had been driving", "had driven once", "was drove"], answer: 0, explanation: "Past perfect continuous destaca duración/proceso anterior a otro punto pasado." },
  ],
  "c1-stative-verbs": [
    { prompt: "Choose the natural option: I ___ your point.", options: ["am seeing", "see", "have been seeing"], answer: 1, explanation: "See con el significado de understand es stative." },
    { prompt: "The chef ___ the sauce to check the seasoning.", options: ["is tasting", "tastes always", "has taste"], answer: 0, explanation: "Taste es dynamic cuando significa probar activamente." },
  ],
  "c1-conjunctions": [
    { prompt: "He didn't complain, ___ did he ask for help.", options: ["whereas", "nor", "as yet"], answer: 1, explanation: "Nor añade una idea negativa y exige inversión auxiliar + sujeto." },
    { prompt: "___ next Monday, the new timetable will apply.", options: ["As from", "As yet", "As for"], answer: 0, explanation: "As from significa starting from." },
  ],
  "c1-narrative-tenses": [
    { prompt: "By the time we arrived, they ___ for hours.", options: ["waited", "had been waiting", "were waited"], answer: 1, explanation: "Past perfect continuous destaca la duración anterior a nuestra llegada." },
    { prompt: "Every summer, my grandfather ___ take us fishing.", options: ["would", "was being", "had"], answer: 0, explanation: "Would puede describir acciones repetidas del pasado, pero no estados." },
  ],
  "c1-relative-clauses": [
    { prompt: "Everything ___ we discussed is confidential.", options: ["which", "that", "what"], answer: 1, explanation: "Tras quantifiers como everything/something/all, el libro señala la preferencia por that en defining relatives." },
    { prompt: "Choose the formal version.", options: ["The person to whom I spoke", "The person that I spoke to whom", "The person to that I spoke"], answer: 0, explanation: "En registro formal la preposición puede ir delante de whom/which; no delante de that." },
  ],
  "c1-future-forms": [
    { prompt: "It's only a matter of time before she ___ out.", options: ["will find", "finds", "will have finding"], answer: 1, explanation: "Después de before en esta expresión usamos present simple aunque la referencia sea futura." },
    { prompt: "By Friday, we ___ the first phase.", options: ["will have completed", "will completing", "have complete"], answer: 0, explanation: "Future perfect marca algo completado antes de un punto futuro." },
  ],
  "c1-introductory-it": [
    { prompt: "Choose the correct pattern.", options: ["I find difficult it to focus.", "I find it difficult to focus.", "I find it to focus difficult."], answer: 1, explanation: "Subject + verb + it + adjective + infinitive/clause." },
    { prompt: "___ was Maya who found the error.", options: ["There", "It", "That"], answer: 1, explanation: "It-cleft pone el foco sobre Maya." },
  ],
  "c1-verb-patterns": [
    { prompt: "They persuaded us ___ early.", options: ["leave", "leaving", "to leave"], answer: 2, explanation: "Persuade + object + to-infinitive." },
    { prompt: "We were made ___ outside.", options: ["wait", "to wait", "waiting"], answer: 1, explanation: "Make usa bare infinitive en activa, pero to-infinitive en pasiva." },
  ],
  "c1-modals": [
    { prompt: "You ___ bought food; we'd already cooked.", options: ["needn't have", "mustn't have", "didn't need have"], answer: 0, explanation: "Needn't have + past participle: se hizo, pero era innecesario." },
    { prompt: "That ___ be Liam; he's abroad.", options: ["mustn't", "can't", "should"], answer: 1, explanation: "Can't expresa deducción negativa fuerte; mustn't expresa prohibición." },
  ],
  "c1-substitution-ellipsis": [
    { prompt: "I need a charger. Do you have ___?", options: ["one", "so", "do"], answer: 0, explanation: "One sustituye a un noun countable ya mencionado." },
    { prompt: "I didn't want to leave, but I had ___.", options: ["so", "to", "one"], answer: 1, explanation: "Con ellipsis conservamos to cuando el infinitive ya se recupera del contexto." },
  ],
  "c1-hypothetical-meaning": [
    { prompt: "It's high time we ___ a decision.", options: ["make", "made", "will make"], answer: 1, explanation: "It's high/about time + past simple, aunque la referencia sea presente." },
    { prompt: "I'd rather you ___ me earlier.", options: ["tell", "had told", "would tell yesterday"], answer: 1, explanation: "Would rather + subject + past perfect expresa preferencia retrospectiva." },
  ],
  "c1-comparing": [
    { prompt: "This version is ___ clearer than the first.", options: ["considerably", "very", "absolutely"], answer: 0, explanation: "Considerably puede intensificar un comparative." },
    { prompt: "The new course is nowhere near ___ demanding as the old one.", options: ["so", "as", "more"], answer: 1, explanation: "Nowhere near as...as expresa una diferencia grande." },
  ],
  "c1-modifying-adverbs": [
    { prompt: "Choose the natural collocation.", options: ["bitterly disappointed", "strongly freezing", "very impossible"], answer: 0, explanation: "El tema C1 exige aprender modifier + adjective como collocation." },
    { prompt: "The instructions were ___ clear.", options: ["entirely", "bitterly", "deeply"], answer: 0, explanation: "Entirely clear es una collocation recogida en el bloque de modifying adverbs." },
  ],
  "c1-conditionals-advanced": [
    { prompt: "Make it more hypothetical: If the company ___ cancel the project, we'd need a new plan.", options: ["were to", "will", "happens"], answer: 0, explanation: "If + were to + infinitive aumenta la distancia hipotética." },
    { prompt: "Choose the formal inversion: ___ you require assistance, contact reception.", options: ["Had", "Should", "Were to"], answer: 1, explanation: "Should + subject + infinitive puede sustituir una condición formal con if." },
  ],
  "c1-reported-speech": [
    { prompt: "'Why did you leave?' → He asked why I ___.", options: ["did leave", "had left", "had I left"], answer: 1, explanation: "Reported questions usan statement word order y el backshift que corresponda." },
    { prompt: "Which modal normally remains unchanged in reported speech?", options: ["will", "can", "might"], answer: 2, explanation: "Might, would, could, ought to y should normalmente no cambian." },
  ],
  "c1-reporting-verb-patterns": [
    { prompt: "She apologised ___ arriving late.", options: ["to", "for", "on"], answer: 1, explanation: "Apologise for + -ing." },
    { prompt: "It ___ that demand will increase.", options: ["is believed", "believes", "is believing"], answer: 0, explanation: "It + be + past participle + that-clause es una estructura impersonal de reporting." },
  ],
  "c1-future-in-the-past": [
    { prompt: "I ___ leave when the phone rang.", options: ["was about to", "will", "have to"], answer: 0, explanation: "Was about to expresa una acción futura inminente vista desde el pasado." },
    { prompt: "The branch ___ have opened in June, but the project was cancelled.", options: ["was to", "would to", "had to"], answer: 0, explanation: "Was/were to have + past participle puede marcar un acontecimiento previsto que no ocurrió." },
  ],
  "c1-ever-words": [
    { prompt: "___ happens, call me.", options: ["Whatever", "What", "However much"], answer: 0, explanation: "Whatever puede expresar concesión: no importa qué ocurra." },
    { prompt: "Choose the more polite response.", options: ["Whatever.", "Whatever you prefer.", "What ever."], answer: 1, explanation: "El libro advierte que Whatever. aislado puede sonar brusco; whatever you like/prefer es más cortés." },
  ],
  "c1-participle-clauses": [
    { prompt: "___ the report, she went home.", options: ["Having finished", "Had finishing", "Finished having"], answer: 0, explanation: "Having + past participle marca una acción anterior a la main clause." },
    { prompt: "The people ___ outside have appointments.", options: ["waiting", "waited", "who waiting"], answer: 0, explanation: "-ing participle puede reducir una active relative clause." },
  ],
  "c1-passive": [
    { prompt: "The project ___ by Friday.", options: ["will have been completed", "will have completed passive", "has been complete"], answer: 0, explanation: "Future perfect passive = will have been + past participle." },
    { prompt: "The minister ___ to be considering new measures.", options: ["is thought", "thinks", "is thinking"], answer: 0, explanation: "Subject + be + reporting participle + to-infinitive es reporting passive formal." },
  ],
  "c1-linking-adverbials": [
    { prompt: "Demand fell sharply. ___, production was reduced.", options: ["Consequently", "As for", "Whatever"], answer: 0, explanation: "Consequently introduce el resultado en una oración independiente." },
    { prompt: "Which expression corrects/contradicts a previous idea rather than just showing another side?", options: ["On the contrary", "On the other hand", "Additionally"], answer: 0, explanation: "On the contrary corrige o contradice; on the other hand introduce otra perspectiva." },
  ],
  "c1-cohesion": [
    { prompt: "Which is part of grammatical cohesion in the Gold C1?", options: ["Reference", "Pronunciation", "Stress timing"], answer: 0, explanation: "El libro incluye reference, substitution, ellipsis y conjunction dentro de grammatical cohesion." },
    { prompt: "Synonyms, antonyms and controlled repetition contribute mainly to ___.", options: ["lexical cohesion", "passive voice", "inversion"], answer: 0, explanation: "Lexical cohesion crea vínculos mediante relaciones de vocabulario." },
  ],
  "c1-inversion": [
    { prompt: "Under no circumstances ___ the password.", options: ["you should reveal", "should you reveal", "you reveal should"], answer: 1, explanation: "Negative/restrictive adverbial al inicio → auxiliary + subject." },
    { prompt: "No sooner had we arrived ___ the storm began.", options: ["when", "than", "that"], answer: 1, explanation: "No sooner...than; hardly...when." },
  ],
};
