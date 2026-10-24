import rows from "./personal-import.json";
import type { VocabularyEntryType, VocabularyLevel, VocabularySense, VocabularyTopic } from "../types";

type ImportedRow = {
  id: string;
  term: string;
  type: string;
  cefr: string;
  "meaning.es": string;
  "meaning.en": string;
  "example.en": string;
  "example.es": string;
  topics?: string;
  source_term?: string;
  notes?: string;
  "relations.collocations"?: string;
  "relations.patterns"?: string;
  "relations.synonyms"?: string;
  "relations.antonyms"?: string;
  "relations.confusedWith"?: string;
  "relations.wordFamily"?: string;
};

const importedRows = rows as ImportedRow[];

const extraPersonalImportRows: ImportedRow[] = [
  {
    id: "coriander",
    source_term: "coriander",
    term: "coriander",
    type: "noun",
    cefr: "B2",
    "meaning.es": "cilantro; coriandro",
    "meaning.en": "A herb whose fresh leaves and seeds are used in cooking.",
    "example.en": "Add some fresh coriander just before serving the curry.",
    "example.es": "Añade un poco de cilantro fresco justo antes de servir el curry.",
    topics: "food & cooking",
    notes: "British English normally uses coriander for the fresh leaves as well as the plant/seeds. In American English, cilantro is the usual word for the fresh leaves.",
    "relations.confusedWith": "cilantro",
  },
  {
    id: "cilantro",
    source_term: "cilantro",
    term: "cilantro",
    type: "noun",
    cefr: "B2",
    "meaning.es": "cilantro",
    "meaning.en": "The fresh leaves of the coriander plant, especially in American English.",
    "example.en": "Sprinkle chopped cilantro over the tacos before serving.",
    "example.es": "Espolvorea cilantro picado sobre los tacos antes de servirlos.",
    topics: "food & cooking",
    notes: "American English commonly uses cilantro for the fresh leaves; British English usually uses coriander.",
    "relations.confusedWith": "coriander",
  },
  {
    id: "washing_up_liquid",
    source_term: "washing up liquid",
    term: "washing-up liquid",
    type: "compound noun",
    cefr: "B1",
    "meaning.es": "jabón / detergente líquido para lavar la vajilla a mano",
    "meaning.en": "Liquid detergent used for washing plates, cups, cutlery and other dishes by hand.",
    "example.en": "We're almost out of washing-up liquid, so I'll buy another bottle.",
    "example.es": "Casi no queda detergente para lavar la vajilla, así que compraré otra botella.",
    topics: "home & places",
    notes: "British English. American English usually says dish soap or dishwashing liquid.",
    "relations.synonyms": "dish soap; dishwashing liquid",
  },
  {
    id: "thus",
    source_term: "thus",
    term: "thus",
    type: "adverb",
    cefr: "C1",
    "meaning.es": "por tanto; por consiguiente; así",
    "meaning.en": "As a result or consequence; therefore.",
    "example.en": "The roads were flooded; thus, the match had to be cancelled.",
    "example.es": "Las carreteras estaban inundadas; por tanto, hubo que cancelar el partido.",
    topics: "linking & discourse",
    "relations.synonyms": "therefore; consequently; hence",
    notes: "Formal connector. In many contexts, thus is close in meaning to therefore.",
  },
  {
    id: "drawback",
    source_term: "drawbacks",
    term: "drawback",
    type: "noun",
    cefr: "B2",
    "meaning.es": "inconveniente; desventaja",
    "meaning.en": "A disadvantage or negative feature of a situation, plan or product.",
    "example.en": "One of the main drawbacks of working from home is the lack of social contact.",
    "example.es": "Una de las principales desventajas de trabajar desde casa es la falta de contacto social.",
    topics: "general vocabulary",
    "relations.synonyms": "disadvantage; downside",
    "relations.antonyms": "advantage; benefit",
    notes: "Headword stored in the singular; drawbacks is the plural form.",
  },
  {
    id: "into_the_bargain",
    source_term: "into the bargain",
    term: "into the bargain",
    type: "idiom",
    cefr: "C1",
    "meaning.es": "además; por añadidura; incluido también como extra",
    "meaning.en": "In addition to everything else; as an extra feature, advantage or disadvantage.",
    "example.en": "The flat was spacious, well located and cheap into the bargain.",
    "example.es": "El piso era amplio, estaba bien situado y, además, era barato.",
    topics: "general vocabulary",
    notes: "Means that something is added to what has already been mentioned.",
    "relations.confusedWith": "bargain",
  },
  {
    id: "bargain_good_buy",
    source_term: "bargain",
    term: "bargain",
    type: "noun",
    cefr: "B2",
    "meaning.es": "ganga; buena compra",
    "meaning.en": "Something bought for less than the usual price or for a very good price.",
    "example.en": "I got this coat in the sale for €25 — it was a real bargain.",
    "example.es": "Compré este abrigo en rebajas por 25 €: fue una auténtica ganga.",
    topics: "shopping & money",
    "relations.collocations": "a real bargain; pick up a bargain",
    notes: "This entry covers the 'ganga' sense.",
    "relations.confusedWith": "into the bargain",
  },
  {
    id: "like_similar",
    source_term: "like",
    term: "like",
    type: "preposition",
    cefr: "B1",
    "meaning.es": "como; parecido a; similar a",
    "meaning.en": "Similar to someone or something, or in the same way as them.",
    "example.en": "I'd love to have a laptop like yours.",
    "example.es": "Me encantaría tener un portátil como el tuyo.",
    topics: "grammar & linking",
    "relations.patterns": "like + noun/pronoun",
    "relations.synonyms": "similar to",
    "relations.confusedWith": "such as",
    notes: "COMPARACIÓN: like yours = similar al tuyo. No enumera necesariamente ejemplos. Contraste: such as introduce ejemplos concretos (por ejemplo); like también puede introducir ejemplos, sobre todo en lenguaje informal. No confundir con like (gustar, verbo).",
  },
  {
    id: "like_examples",
    source_term: "like",
    term: "like",
    type: "preposition",
    cefr: "B2",
    "meaning.es": "como; por ejemplo (para introducir ejemplos)",
    "meaning.en": "Used to mention one or more examples of the kind of thing you mean, especially informally.",
    "example.en": "I enjoy outdoor activities like hiking and cycling.",
    "example.es": "Disfruto de actividades al aire libre como el senderismo y el ciclismo.",
    topics: "grammar & linking",
    "relations.patterns": "like + noun/-ing (examples)",
    "relations.synonyms": "such as",
    "relations.confusedWith": "such as",
    notes: "EJEMPLOS: like puede equivaler a such as cuando enumeramos ejemplos. Es habitual en la conversación. Si queremos expresar inequívocamente 'por ejemplo' en un texto formal de Cambridge, such as es una opción más clara. En 'a laptop like yours', like expresa similitud, no una lista de ejemplos.",
  },
  {
    id: "such_as_examples",
    source_term: "such as",
    term: "such as",
    type: "phrase",
    cefr: "B2",
    "meaning.es": "como por ejemplo; tales como",
    "meaning.en": "Used to introduce specific examples of a general category or statement.",
    "example.en": "Renewable energy sources, such as wind and solar power, are becoming more common.",
    "example.es": "Las fuentes de energía renovable, como la eólica y la solar, son cada vez más habituales.",
    topics: "grammar & linking",
    "relations.patterns": "general category + such as + example(s)",
    "relations.synonyms": "for example; like (examples)",
    "relations.confusedWith": "like",
    notes: "CONTRASTE: such as presenta ejemplos concretos de una categoría, no una simple comparación. 'Devices such as laptops and tablets' = dispositivos, por ejemplo portátiles y tabletas. 'A device like mine' = un dispositivo similar al mío. Like también puede dar ejemplos, pero such as es especialmente claro en registro formal.",
  },
  {
    id: "preach_religious",
    source_term: "preach",
    term: "preach",
    type: "verb",
    cefr: "C1",
    "meaning.es": "predicar; dar un sermón",
    "meaning.en": "To give a religious speech or sermon, especially in a church.",
    "example.en": "The priest preached about forgiveness during the service.",
    "example.es": "El sacerdote predicó sobre el perdón durante la misa.",
    topics: "general vocabulary",
    "relations.patterns": "preach about/on + topic; preach to + audience",
    "relations.wordFamily": "preacher; preaching",
    notes: "Acepción religiosa. El uso figurado de preach consiste en promover o aconsejar insistentemente una idea.",
  },
  {
    id: "preach_advocate",
    source_term: "preach",
    term: "preach",
    type: "verb",
    cefr: "C1",
    "meaning.es": "predicar; defender o recomendar con insistencia",
    "meaning.en": "To strongly and repeatedly recommend a belief, behaviour or way of life to other people.",
    "example.en": "She preaches the importance of honesty but sometimes lies herself.",
    "example.es": "Predica la importancia de la honestidad, pero a veces ella misma miente.",
    topics: "general vocabulary",
    "relations.patterns": "preach + noun; preach about + topic; preach to + person",
    "relations.collocations": "preach the importance of; preach tolerance",
    "relations.wordFamily": "preacher; preaching",
    notes: "Uso figurado, a veces crítico: decir a otros cómo deben actuar. Relacionado con el idiom practise what you preach.",
  },
  {
    id: "practise_what_you_preach",
    source_term: "practise what you preach",
    term: "practise what you preach",
    type: "idiom",
    cefr: "C1",
    "meaning.es": "predicar con el ejemplo; hacer lo que aconsejas a los demás",
    "meaning.en": "To behave in the way that you tell other people they should behave.",
    "example.en": "If you tell your team to take breaks, you should practise what you preach.",
    "example.es": "Si dices a tu equipo que haga descansos, deberías predicar con el ejemplo.",
    topics: "idioms & expressions",
    "relations.patterns": "practise what you preach",
    "relations.wordFamily": "preach",
    notes: "Idiom: coherencia entre lo que recomiendas y lo que haces. Inglés británico: practise (verbo); inglés americano: practice what you preach.",
  },
  {
    id: "rave_party",
    source_term: "rave",
    term: "rave",
    type: "noun",
    cefr: "B2",
    "meaning.es": "rave; fiesta de música electrónica",
    "meaning.en": "A large dance party where electronic music is played, often lasting late into the night.",
    "example.en": "They went to an outdoor rave featuring several techno DJs.",
    "example.es": "Fueron a una rave al aire libre en la que actuaban varios DJ de techno.",
    topics: "music & nightlife",
    "relations.collocations": "go to a rave; outdoor rave; rave party",
    "relations.confusedWith": "rave (verb: praise enthusiastically)",
    notes: "Sustantivo: fiesta, especialmente de música electrónica. No confundir con el verbo rave about ni con el uso de rave en rave reviews.",
  },
  {
    id: "rave_praise",
    source_term: "rave",
    term: "rave",
    type: "verb",
    cefr: "C1",
    "meaning.es": "hablar maravillas de; elogiar con entusiasmo",
    "meaning.en": "To speak or write with great enthusiasm and admiration about someone or something.",
    "example.en": "Critics have been raving about her latest novel.",
    "example.es": "Los críticos llevan tiempo hablando maravillas de su última novela.",
    topics: "media & culture",
    "relations.patterns": "rave about + noun/person; rave over + noun",
    "relations.synonyms": "praise enthusiastically; enthuse about",
    "relations.wordFamily": "rave reviews",
    notes: "Verbo con connotación positiva en el patrón rave about something; otros contextos de rave pueden significar hablar descontroladamente. Relacionado con rave reviews.",
  },
  {
    id: "rave_reviews",
    source_term: "rave reviews",
    term: "rave reviews",
    type: "phrase",
    cefr: "C1",
    "meaning.es": "críticas excelentes; reseñas muy elogiosas",
    "meaning.en": "Extremely positive and enthusiastic reviews of a book, film, show, product or performance.",
    "example.en": "The new play received rave reviews from theatre critics.",
    "example.es": "La nueva obra de teatro recibió críticas excelentes de los críticos teatrales.",
    topics: "media & culture",
    "relations.collocations": "receive rave reviews; get rave reviews; rave review",
    "relations.synonyms": "glowing reviews; enthusiastic reviews",
    "relations.wordFamily": "rave (verb); review",
    notes: "Collocation: rave funciona como modificador y significa 'muy elogioso', no una fiesta. Singular: a rave review; plural: rave reviews.",
  },
  {
    id: "never_fail_to_please_critics",
    source_term: "Never fails to please critics",
    term: "never fail to please critics",
    type: "phrase",
    cefr: "C1",
    "meaning.es": "no dejar nunca de agradar a la crítica; satisfacer siempre a los críticos",
    "meaning.en": "To consistently receive a positive response from professional reviewers.",
    "example.en": "Her films never fail to please critics, although audiences sometimes disagree.",
    "example.es": "Sus películas siempre consiguen agradar a la crítica, aunque a veces el público discrepa.",
    topics: "film & reviews",
    "relations.patterns": "never fail(s) to + infinitive; fail to please + person/group",
    "relations.synonyms": "consistently impress critics; receive critical acclaim",
    notes: "La forma original 'never fails to please critics' usa tercera persona singular. Never fail to + infinitive expresa que algo siempre consigue un resultado; no significa que haya fallado alguna vez.",
  },
  {
    id: "star_in_film",
    source_term: "it stars",
    term: "star",
    type: "verb",
    cefr: "B2",
    "meaning.es": "estar protagonizada por; protagonizar",
    "meaning.en": "To have a particular actor playing a leading role in a film or show, or to play that role.",
    "example.en": "The film stars two young actors as rival detectives.",
    "example.es": "La película está protagonizada por dos actores jóvenes que interpretan a detectives rivales.",
    topics: "film & reviews",
    "relations.patterns": "a film stars + actor; an actor stars in + film/show; be starring in + film",
    "relations.synonyms": "feature; have a leading role",
    "relations.wordFamily": "star; starring",
    notes: "'It stars...' = 'está protagonizada por...'; no equivale a it starts ('empieza'). 'The film stars X' frente a 'X stars in the film'.",
  },
  {
    id: "just_only",
    source_term: "is just",
    term: "just",
    type: "adverb",
    cefr: "B1",
    "meaning.es": "solo; simplemente; nada más que",
    "meaning.en": "Only or simply, used to limit or downplay what is being described.",
    "example.en": "It's just a comedy, not a serious documentary.",
    "example.es": "Es solo una comedia, no un documental serio.",
    topics: "grammar & linking",
    "relations.patterns": "be + just + noun/adjective; just + verb",
    "relations.synonyms": "only; merely; simply",
    "relations.confusedWith": "just (fair); just (exactly)",
    notes: "'Is just' no es un verbo compuesto: is = be (tercera persona) + just (adverbio). En 'It is just a comedy', just significa 'simplemente/solo'.",
  },
  {
    id: "just_fair",
    source_term: "is just",
    term: "just",
    type: "adjective",
    cefr: "C1",
    "meaning.es": "justo; equitativo; moralmente correcto",
    "meaning.en": "Fair and morally right, especially when describing a decision, law or treatment.",
    "example.en": "The judge's decision is just and proportionate.",
    "example.es": "La decisión del juez es justa y proporcionada.",
    topics: "grammar & linking",
    "relations.patterns": "be + just (adjective); a just decision; a just society",
    "relations.synonyms": "fair; equitable",
    "relations.antonyms": "unjust; unfair",
    "relations.confusedWith": "just (only)",
    notes: "'Is just' también puede ser be + just (adjetivo = justo); depende del contexto. No confundir con just = 'solo' como adverbio.",
  },
  {
    id: "whether_alternatives",
    source_term: "whether",
    term: "whether",
    type: "conjunction",
    cefr: "B2",
    "meaning.es": "si; si... o no; tanto si... como si...",
    "meaning.en": "Used to introduce uncertainty, a choice or alternatives, often in an indirect question.",
    "example.en": "I can't decide whether to watch the film at home or go to the cinema.",
    "example.es": "No consigo decidir si ver la película en casa o ir al cine.",
    topics: "grammar & linking",
    "relations.patterns": "whether + clause; whether to + infinitive; whether ... or ...; whether or not",
    "relations.confusedWith": "if; weather",
    notes: "Cambridge: whether to + infinitive (NO 'if to'); 'whether ... or not' expresa alternativas. En preguntas indirectas, if y whether a veces alternan, pero no siempre son intercambiables.",
  },
  {
    id: "portray_character",
    source_term: "portraying",
    term: "portray",
    type: "verb",
    cefr: "C1",
    "meaning.es": "interpretar; encarnar (un personaje)",
    "meaning.en": "To play the part of a character in a film, play or television programme.",
    "example.en": "She won an award for portraying a courageous journalist in the film.",
    "example.es": "Ganó un premio por interpretar a una periodista valiente en la película.",
    topics: "film & reviews",
    "relations.patterns": "portray + character/person; portray someone as + adjective/noun",
    "relations.synonyms": "play; depict; represent",
    "relations.wordFamily": "portrayal",
    notes: "'Portraying' es la forma -ing del verbo portray. En reseñas puede significar interpretar un personaje; en otros contextos, representar o describir a alguien de cierta manera.",
  },
  {
    id: "on_the_edge_of_ones_seat",
    source_term: "on the edge of my seat",
    term: "be on the edge of one's seat",
    type: "idiom",
    cefr: "C1",
    "meaning.es": "estar en vilo; estar pegado al asiento por la emoción o el suspense",
    "meaning.en": "To be extremely excited or tense about what is going to happen next, especially during a film or performance.",
    "example.en": "The suspenseful final scene had me on the edge of my seat.",
    "example.es": "La escena final, llena de suspense, me mantuvo en vilo.",
    topics: "film & reviews; idioms & expressions",
    "relations.patterns": "be on the edge of one's seat; keep/have someone on the edge of their seat",
    "relations.synonyms": "be gripped; be in suspense",
    notes: "'On the edge of my seat' es la variante de primera persona del idiom 'on the edge of one's seat'. Se usa figuradamente para una historia o espectáculo apasionante.",
  },
  {
    id: "throughout_time",
    source_term: "throughout",
    term: "throughout",
    type: "preposition",
    cefr: "B2",
    "meaning.es": "durante todo; a lo largo de todo",
    "meaning.en": "During the whole of a particular period of time.",
    "example.en": "The tension builds steadily throughout the film.",
    "example.es": "La tensión aumenta de manera constante a lo largo de toda la película.",
    topics: "grammar & linking",
    "relations.patterns": "throughout + period/event; throughout the year/film",
    "relations.synonyms": "all through; during the whole of",
    "relations.confusedWith": "through; during",
    notes: "Tiempo: 'throughout the film' subraya que algo ocurre a lo largo de toda la película; 'during the film' solo sitúa algo en ese periodo.",
  },
  {
    id: "throughout_place",
    source_term: "throughout",
    term: "throughout",
    type: "preposition",
    cefr: "B2",
    "meaning.es": "por todo; en todas las partes de",
    "meaning.en": "In every part of a place, area or thing.",
    "example.en": "The film was shown in cinemas throughout the country.",
    "example.es": "La película se proyectó en cines de todo el país.",
    topics: "grammar & linking",
    "relations.patterns": "throughout + place/area",
    "relations.synonyms": "all over; across",
    "relations.confusedWith": "through",
    notes: "Lugar: 'throughout the country' = por todo el país. 'Through the country' suele centrarse en atravesarlo, no en su distribución.",
  },
  {
    id: "throughout_adverb",
    source_term: "throughout",
    term: "throughout",
    type: "adverb",
    cefr: "B2",
    "meaning.es": "de principio a fin; durante todo ese tiempo",
    "meaning.en": "From the beginning to the end of an event or period, with no following noun phrase.",
    "example.en": "Although the film was long, the audience remained attentive throughout.",
    "example.es": "Aunque la película era larga, el público permaneció atento de principio a fin.",
    topics: "grammar & linking",
    "relations.patterns": "verb/adjective + throughout (without following noun)",
    "relations.synonyms": "all the way through; the whole time",
    notes: "Adverbio: no lleva complemento después ('remained attentive throughout'). Contraste con la preposición: 'throughout the film'.",
  },
  {
    id: "thereby",
    source_term: "thereby",
    term: "thereby",
    type: "adverb",
    cefr: "C1",
    "meaning.es": "con ello; de ese modo; y así (mediante esa acción)",
    "meaning.en": "By doing that or by that means, often expressing a direct consequence of the preceding action.",
    "example.en": "The company automated the process, thereby reducing costs.",
    "example.es": "La empresa automatizó el proceso y, con ello, redujo los costes.",
    topics: "linking & discourse",
    "relations.patterns": "clause, thereby + -ing; and thereby + verb",
    "relations.synonyms": "by doing so; in this way; thus (in some contexts)",
    "relations.confusedWith": "therefore; thus",
    notes: "C1 / registro formal. thereby señala el MEDIO por el que se produce un resultado: automated the process, thereby reducing costs. therefore = por lo tanto (conclusión lógica); no siempre son intercambiables. Estructura frecuente: coma + thereby + verbo en -ing. Útil para essays y reports Cambridge.",
  },
];

export const personalImportRows: ImportedRow[] = [
  ...importedRows.map((row) => row.id === "bear"
    ? {
        ...row,
        notes: [
          row.notes,
          "Irregular verb forms: bear – bore – borne. For the meaning ‘tolerate/endure’, the past participle is borne; born is mainly used in the sense of birth.",
        ].filter(Boolean).join(" "),
      }
    : row),
  ...extraPersonalImportRows,
];

/** Same personal senses appear under Language & structure without duplicating canonical senses. */
export const personalLinkingSlugs = ["personal-linking-b1", "personal-linking-b2", "personal-linking-c1"];

const linkingRows = personalImportRows.filter((row) =>
  row.topics?.split(";").some((topic) =>
    ["grammar & linking", "linking & discourse"].includes(topic.trim().toLowerCase()),
  ),
);

export const personalLinkingTopics: VocabularyTopic[] = (["B1", "B2", "C1"] as VocabularyLevel[]).map((level, index) => ({
  slug: personalLinkingSlugs[index],
  title: "Conectores y enlaces",
  category: "language",
  level,
  summary: "Conectores, preposiciones y palabras funcionales de tu vocabulario personal; con traducción, patrones y ejemplos.",
  sourceUnit: 2051 + index,
  source: "Personal vocabulary",
  sections: [{
    title: "Conectores y vocabulario funcional",
    kind: "core",
    entries: linkingRows.filter((row) => row.cefr === level).map((row) => [
      row.term,
      row["meaning.es"],
      row.notes,
      row["meaning.en"],
      `personal-import:${row.id}`,
    ]),
  }],
}));

/** Reuse personal film, review and nightlife entries under Culture & leisure without cloning senses. */
export const personalCultureSlugs = ["personal-culture-b1", "personal-culture-b2", "personal-culture-c1"];
const personalCultureRows = personalImportRows.filter((row) =>
  row.topics?.split(";").some((topic) =>
    ["film & reviews", "media & culture", "music & nightlife"].includes(topic.trim().toLowerCase()),
  ),
);

export const personalCultureTopics: VocabularyTopic[] = (["B1", "B2", "C1"] as VocabularyLevel[]).map((level, index) => ({
  slug: personalCultureSlugs[index],
  title: "Cine, crítica y ocio",
  category: "culture",
  level,
  summary: "Frases para describir películas, críticas, interpretaciones y actividades de ocio.",
  sourceUnit: 2054 + index,
  source: "Personal vocabulary",
  sections: [{
    title: "Cine, críticas y entretenimiento",
    kind: "core",
    entries: personalCultureRows.filter((row) => row.cefr === level).map((row) => [
      row.term,
      row["meaning.es"],
      row.notes,
      row["meaning.en"],
      `personal-import:${row.id}`,
    ]),
  }],
})).filter((topic) => topic.sections.some((section) => section.entries.length > 0));

export const personalImportSlugs = ["personal-added-b1", "personal-added-b2", "personal-added-c1"];

export const personalImportTopics: VocabularyTopic[] = (["B1", "B2", "C1"] as VocabularyLevel[]).map((level, index) => ({
  slug: personalImportSlugs[index],
  title: "Añadido por mí",
  category: "personal",
  level,
  summary: "Vocabulario personal con acepciones, ejemplos y relaciones.",
  sourceUnit: 45 + index,
  source: "Personal vocabulary",
  sections: [{
    title: "Vocabulario personal",
    kind: "core",
    entries: personalImportRows.filter((row) => row.cefr === level).map((row) => [
      row.term,
      row["meaning.es"],
      row.notes,
      row["meaning.en"],
      `personal-import:${row.id}`,
    ]),
  }],
}));

function list(value?: string) {
  return value?.split(";").map((item) => item.trim()).filter(Boolean) ?? [];
}

function entryType(type: string): VocabularyEntryType {
  if (type === "phrasal verb") return "phrasal-verb";
  if (type === "idiom") return "idiom";
  if (type.includes("compound") || type.includes("phrase")) return "collocation";
  return "word";
}

/** Preserve the personal vocabulary's real examples and relationships after canonical compilation. */
export function enrichPersonalImport(topics: { slug: string; sections: { entries: VocabularySense[] }[] }[]) {
  for (const [index, level] of (["B1", "B2", "C1"] as VocabularyLevel[]).entries()) {
    const topic = topics.find((item) => item.slug === personalImportSlugs[index]);
    const entries = topic?.sections[0]?.entries ?? [];
    const sourceRows = personalImportRows.filter((row) => row.cefr === level);
    if (entries.length !== sourceRows.length) throw new Error(`Personal vocabulary import mismatch: ${level}`);

    for (const [position, row] of sourceRows.entries()) {
      const sense = entries[position];
      sense.meaning.en = row["meaning.en"];
      sense.members[0].meaning.en = row["meaning.en"];
      sense.examples = [{ en: row["example.en"], es: row["example.es"], kind: "usage" }];
      sense.type = entryType(row.type);
      sense.relations = {
        collocations: list(row["relations.collocations"]),
        patterns: list(row["relations.patterns"]),
        synonyms: list(row["relations.synonyms"]),
        antonyms: list(row["relations.antonyms"]),
        confusedWith: list(row["relations.confusedWith"]),
        wordFamily: list(row["relations.wordFamily"]),
      };
    }
  }
}
