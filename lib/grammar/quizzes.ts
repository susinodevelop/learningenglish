export type GrammarQuizQuestion = {
  prompt: string;
  options: string[];
  answer: number;
  explanation: string;
};

export const grammarQuizzes: Record<string, GrammarQuizQuestion[]> = {
  "present-tenses": [
    { prompt: "Choose the best option: I usually ___ from home on Fridays.", options: ["work", "am working", "have worked"], answer: 0, explanation: "Present simple: hábito o rutina regular." },
    { prompt: "Choose the best option: Why ___ so quiet today?", options: ["are you being", "do you be", "have you been"], answer: 0, explanation: "Be puede usarse en continuous para comportamiento temporal." },
    { prompt: "Choose the best option: This soup ___ strange.", options: ["is tasting", "tastes", "has been tasting"], answer: 1, explanation: "Taste es normalmente stative cuando describe una cualidad." },
  ],
  "past-tenses": [
    { prompt: "I ___ home when I saw the accident.", options: ["walked", "was walking", "had walked"], answer: 1, explanation: "Past continuous da el contexto en progreso; el past simple introduce el evento." },
    { prompt: "When I was a child, we ___ spend every summer by the sea.", options: ["would", "were used to", "got used to"], answer: 0, explanation: "Would puede describir hábitos repetidos del pasado, pero no estados." },
    { prompt: "She is now ___ working at night.", options: ["used to", "use to", "used to working"], answer: 2, explanation: "Be used to + -ing/noun = estar acostumbrado a." },
  ],
  "present-perfect-and-past-simple": [
    { prompt: "I ___ that film three times this year.", options: ["saw", "have seen", "have been seeing"], answer: 1, explanation: "This year sigue abierto; usamos present perfect." },
    { prompt: "I ___ him yesterday afternoon.", options: ["have met", "met", "have been meeting"], answer: 1, explanation: "Yesterday fija un tiempo terminado: past simple." },
    { prompt: "I ___ all morning, so I need a break.", options: ["studied", "have studied", "have been studying"], answer: 2, explanation: "Present perfect continuous enfatiza duración/proceso reciente." },
  ],
  "past-perfect": [
    { prompt: "By the time we arrived, the film ___ .", options: ["started", "had started", "had been starting"], answer: 1, explanation: "Past perfect simple marca una acción anterior a otro punto pasado." },
    { prompt: "She was tired because she ___ for hours.", options: ["had driven", "had been driving", "drove"], answer: 1, explanation: "Past perfect continuous enfatiza duración y causa." },
    { prompt: "When I opened the door, everyone ___ at me.", options: ["had looked", "looked", "had been looking"], answer: 1, explanation: "Acción inmediata al abrir la puerta: past simple, no past perfect." },
  ],
  "future-1": [
    { prompt: "The train ___ at 7:10 tomorrow.", options: ["will leave", "leaves", "is going to leave"], answer: 1, explanation: "Present simple para horarios y programas fijados." },
    { prompt: "I think I ___ early tonight.", options: ["am going", "will go", "go"], answer: 1, explanation: "Will encaja con predicción/opinión no planificada." },
    { prompt: "At 8 tomorrow, I ___ my exam.", options: ["will take", "will be taking", "take"], answer: 1, explanation: "Future continuous: acción en progreso en un momento futuro." },
  ],
  "future-2": [
    { prompt: "Look at those clouds! It ___ rain.", options: ["will", "is going to", "is about"], answer: 1, explanation: "Going to para predicción basada en evidencia presente." },
    { prompt: "I’ll call you as soon as I ___ home.", options: ["will get", "get", "will have got"], answer: 1, explanation: "Tras time conjunctions usamos presente para referencia futura." },
    { prompt: "By June, I ___ here for five years.", options: ["will work", "will have worked", "will be working"], answer: 1, explanation: "Future perfect expresa algo completado o acumulado antes de un punto futuro." },
  ],
  "adjectives": [
    { prompt: "This exercise is ___ than the last one.", options: ["more easy", "easier", "easiest"], answer: 1, explanation: "Easy → easier: cambia -y por -ier." },
    { prompt: "I’m really ___ by the result.", options: ["surprising", "surprised", "surprise"], answer: 1, explanation: "-ed describe cómo se siente la persona; -ing describe la causa." },
    { prompt: "Choose the natural order.", options: ["a wooden old lovely table", "a lovely old wooden table", "an old wooden lovely table"], answer: 1, explanation: "Opinión suele ir antes de edad y material." },
  ],
  "adverbs": [
    { prompt: "She speaks English very ___ .", options: ["good", "well", "goodly"], answer: 1, explanation: "El adverbio de good es well." },
    { prompt: "He works ___, but he ___ ever complains.", options: ["hard / hard", "hardly / hard", "hard / hardly"], answer: 2, explanation: "Hard = con esfuerzo; hardly = casi no." },
    { prompt: "Choose the best order.", options: ["She answered politely the question.", "She politely answered the question.", "She answered the question politely."], answer: 2, explanation: "El adverbio no suele ir entre verbo y objeto." },
  ],
  "questions": [
    { prompt: "Who ___ the window?", options: ["did break", "broke", "did broke"], answer: 1, explanation: "En subject questions no añadimos do/did." },
    { prompt: "You’ve finished, ___?", options: ["haven’t you", "didn’t you", "aren’t you"], answer: 0, explanation: "La tag repite el auxiliar del enunciado con polaridad opuesta." },
    { prompt: "I don’t like crowded places. ___ do I.", options: ["So", "Neither", "Either"], answer: 1, explanation: "Neither/Nor + auxiliar + sujeto para acordar con una negativa." },
  ],
  "countable-and-uncountable-nouns-articles": [
    { prompt: "Can you give me ___ advice?", options: ["an", "some", "a"], answer: 1, explanation: "Advice es incontable; no usamos a/an." },
    { prompt: "___ moon goes round the Earth.", options: ["A", "The", "—"], answer: 1, explanation: "The para entidades únicas en el contexto." },
    { prompt: "I love ___ music.", options: ["the", "a", "—"], answer: 2, explanation: "Sin artículo para conceptos incontables en general." },
  ],
  "modals-1": [
    { prompt: "You ___ wear a seat belt. It’s the law.", options: ["must", "might", "could"], answer: 0, explanation: "Must expresa obligación fuerte/regla; have to también puede expresar obligación externa." },
    { prompt: "You ___ come tomorrow if you don’t want to.", options: ["mustn’t", "don’t have to", "can’t"], answer: 1, explanation: "Don’t have to = no es necesario; mustn’t = está prohibido." },
    { prompt: "I ___ finish this today; the deadline is tomorrow.", options: ["needn’t", "mustn’t", "couldn’t"], answer: 0, explanation: "Needn’t expresa ausencia de necesidad." },
  ],
  "pronouns-and-determiners": [
    { prompt: "They blamed ___ for the mistake.", options: ["them", "themselves", "each"], answer: 1, explanation: "Reflexivo cuando sujeto y objeto son la misma persona/grupo." },
    { prompt: "___ of the two answers is correct.", options: ["Neither", "None", "No"], answer: 0, explanation: "Neither se usa para dos." },
    { prompt: "We enjoyed ___ at the party.", options: ["us", "ourselves", "our own"], answer: 1, explanation: "Enjoy oneself es la estructura correcta." },
  ],
  "modals-2": [
    { prompt: "___ I borrow your pen?", options: ["May", "Must", "Need"], answer: 0, explanation: "May/Can/Could se usan para pedir permiso; may es más formal." },
    { prompt: "You ___ see a doctor if it gets worse.", options: ["should", "would", "may"], answer: 0, explanation: "Should para consejo." },
    { prompt: "___ we go for a walk?", options: ["Shall", "Must", "Need"], answer: 0, explanation: "Shall we...? es una forma típica de hacer sugerencias." },
  ],
  "modals-3": [
    { prompt: "She ___ be at home; I can see the lights on.", options: ["must", "can’t", "shouldn’t"], answer: 0, explanation: "Must para deducción con alta certeza." },
    { prompt: "That ___ be John; he’s abroad this week.", options: ["must", "might", "can’t"], answer: 2, explanation: "Can’t para deducción negativa fuerte." },
    { prompt: "He ___ swim when he was five.", options: ["could", "must", "should"], answer: 0, explanation: "Could expresa capacidad general en el pasado." },
  ],
  "reported-speech": [
    { prompt: "‘I’m tired.’ → She said she ___ tired.", options: ["is", "was", "has been"], answer: 1, explanation: "Con reporting verb en pasado suele haber backshift: present → past." },
    { prompt: "‘Don’t touch it.’ → He told me ___ it.", options: ["not touch", "not to touch", "don’t touch"], answer: 1, explanation: "Orden negativa reportada: tell + object + not to-infinitive." },
    { prompt: "‘Where do you live?’ → She asked me where I ___ .", options: ["did live", "lived", "do live"], answer: 1, explanation: "Reported questions usan orden de afirmación, sin do/did auxiliar." },
  ],
  "passive": [
    { prompt: "The bridge ___ in 1998.", options: ["built", "was built", "has built"], answer: 1, explanation: "Passive = be + past participle; aquí past simple passive." },
    { prompt: "I’m having my laptop ___ tomorrow.", options: ["repair", "repaired", "repairing"], answer: 1, explanation: "Have/get something done + past participle." },
    { prompt: "People say he is brilliant. → He ___ brilliant.", options: ["is said to be", "says to be", "is saying being"], answer: 0, explanation: "Reporting passive: subject + be said + to-infinitive." },
  ],
  "conditionals-1": [
    { prompt: "If you heat ice, it ___ .", options: ["melts", "will melt", "would melt"], answer: 0, explanation: "Zero conditional para verdades generales." },
    { prompt: "If I had more time, I ___ more.", options: ["travel", "will travel", "would travel"], answer: 2, explanation: "Second conditional: hipótesis presente/futura." },
    { prompt: "If I had studied harder, I ___ the exam.", options: ["would pass", "would have passed", "passed"], answer: 1, explanation: "Third conditional: condición pasada irreal + resultado pasado irreal." },
  ],
  "to-infinitive-and-ing": [
    { prompt: "I avoid ___ late at night.", options: ["to drive", "driving", "drive"], answer: 1, explanation: "Avoid va seguido de -ing." },
    { prompt: "They made me ___ again.", options: ["to explain", "explaining", "explain"], answer: 2, explanation: "Make + object + bare infinitive." },
    { prompt: "I remembered ___ the door before I left.", options: ["locking", "to lock", "lock"], answer: 0, explanation: "Remember + -ing = recordar una acción ya realizada; + to = acordarse de hacerla." },
  ],
  "conditionals-2": [
    { prompt: "I’ll go ___ it rains heavily.", options: ["unless", "provided", "in case"], answer: 0, explanation: "Unless = if not." },
    { prompt: "Take an umbrella ___ it rains.", options: ["unless", "in case", "as long as"], answer: 1, explanation: "In case = como precaución ante una posibilidad." },
    { prompt: "I wish I ___ more free time.", options: ["have", "had", "would have had"], answer: 1, explanation: "Wish + past para una situación presente que querríamos distinta." },
  ],
  "prepositions-1": [
    { prompt: "The meeting is ___ Monday morning.", options: ["at", "on", "in"], answer: 1, explanation: "On para días y fechas concretas, también day + part of day." },
    { prompt: "We arrived ___ the airport at six.", options: ["to", "at", "in"], answer: 1, explanation: "Arrive at para lugares concretos; arrive in para ciudades/países." },
    { prompt: "She lives ___ the second floor.", options: ["at", "on", "in"], answer: 1, explanation: "On para plantas/superficies." },
  ],
  "prepositions-2": [
    { prompt: "It depends ___ the weather.", options: ["of", "on", "from"], answer: 1, explanation: "Depend on es una combinación fija verbo + preposición." },
    { prompt: "She’s very good ___ languages.", options: ["at", "in", "on"], answer: 0, explanation: "Good at + actividad/área." },
    { prompt: "He apologised ___ being late.", options: ["for", "of", "with"], answer: 0, explanation: "Apologise for + noun/-ing para el motivo." },
  ],
  "relative-clauses": [
    { prompt: "The woman ___ lives next door is a doctor.", options: ["which", "who", "whose"], answer: 1, explanation: "Who para personas cuando el relativo es sujeto." },
    { prompt: "This is the book ___ I told you about.", options: ["who", "—", "whose"], answer: 1, explanation: "En defining relative clauses podemos omitir el relativo cuando es objeto." },
    { prompt: "My brother, ___ lives in Dublin, is visiting us.", options: ["that", "who", "—"], answer: 1, explanation: "Non-defining: usamos who/which, no that, y no se omite el relativo." },
  ],
  "linking-words-1": [
    { prompt: "We left early ___ we wouldn’t miss the train.", options: ["so that", "because", "such"], answer: 0, explanation: "So that introduce propósito con una cláusula." },
    { prompt: "It was ___ a difficult test that many students failed.", options: ["so", "such", "too"], answer: 1, explanation: "Such + (adjective) + noun + that." },
    { prompt: "The box is ___ heavy for me to lift.", options: ["enough", "too", "so that"], answer: 1, explanation: "Too + adjective + to-infinitive = más de lo adecuado para poder hacerlo." },
  ],
  "linking-words-2": [
    { prompt: "___ being tired, she finished the report.", options: ["Although", "Despite", "Even if"], answer: 1, explanation: "Despite/In spite of + noun/-ing; although + clause." },
    { prompt: "___ it was raining, we went out.", options: ["Despite", "Although", "In spite of"], answer: 1, explanation: "Although introduce una cláusula con sujeto + verbo." },
    { prompt: "___ the station, I called a taxi.", options: ["After leaving", "After I leaving", "Despite leave"], answer: 0, explanation: "After/before + -ing cuando el sujeto implícito coincide con el de la principal." },
  ],
};
