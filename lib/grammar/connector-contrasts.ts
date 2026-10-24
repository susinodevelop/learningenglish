/** Pedagogical source for the B2/C1 connector-guide contrasts, shared with regression tests. */
export const connectorContrasts = [
  {
    id: "like-such-as",
    title: "Like vs such as",
    level: "B2",
    explanation: "Like expresa semejanza (similar a) y también puede introducir ejemplos, sobre todo en conversación. Such as introduce ejemplos concretos dentro de una categoría y resulta muy claro en un writing formal.",
    pattern: "like + noun/pronoun (similarity) · category + such as + examples",
    examples: [
      { en: "I want a laptop like yours.", es: "Quiero un portátil como el tuyo (uno similar)." },
      { en: "I enjoy sports such as tennis and swimming.", es: "Me gustan deportes como, por ejemplo, el tenis y la natación." },
      { en: "I enjoy sports like tennis and swimming.", es: "Me gustan deportes como el tenis y la natación (ejemplos, uso habitual)." },
    ],
    tip: "Cambridge trap: no afirmes que like nunca introduce ejemplos. Lo que cambia es la función en contexto: semejanza frente a ejemplificación.",
  },
  {
    id: "thereby-therefore",
    title: "Thereby vs therefore",
    level: "C1",
    explanation: "Thereby indica por qué medio una acción produce un resultado: 'al hacerlo, con ello'. Therefore expresa una consecuencia o conclusión lógica: 'por lo tanto'. No siempre son intercambiables.",
    pattern: "clause, thereby + -ing · Sentence. Therefore, + clause",
    examples: [
      { en: "The firm improved its software, thereby reducing errors.", es: "La empresa mejoró su software y, con ello, redujo los errores." },
      { en: "The software had serious faults. Therefore, the launch was postponed.", es: "El software tenía fallos graves. Por lo tanto, se pospuso el lanzamiento." },
    ],
    tip: "Cambridge trap: tras thereby, cuando el sujeto de ambas acciones coincide, es frecuente usar -ing. No sustituyas sin más 'therefore + oración' por 'thereby + oración'.",
  },
] as const;
