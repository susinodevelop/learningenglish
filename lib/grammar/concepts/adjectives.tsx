import type { GrammarTopic } from "../types";
import { defineGrammarConcept } from "./factory";

const c1Topics: GrammarTopic[] = [
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
          "Not any + comparative refuerza que no hay mejora/diferencia.",
          "Very much puede intensificar comparatives como very much bigger o very much better.",
        ],
        examples: [
          { english: "The second version is considerably clearer." },
          { english: "This route is only slightly longer." },
        ],
      },
      {
        title: "As...as and distance from equality",
        rules: [
          "Just/quite/easily pueden modificar as...as cuando queremos reforzar equivalencia.",
          "Almost/not quite expresan cercanía a la igualdad.",
          "Not nearly/nowhere near as...as expresan una diferencia grande.",
          "By far refuerza un superlative.",
        ],
        examples: [
          { english: "The online course is nowhere near as demanding as the intensive one." },
          { english: "It was by far the best option." },
        ],
      },
      {
        title: "Like and nothing like as",
        rules: [
          "Like + noun o gerund expresa similitud.",
          "Nothing like as + adjective/adverb + as enfatiza que dos cosas son muy diferentes.",
          "As en comparaciones aparece en estructuras como as...as y not so/as...as; no sustituye libremente a like + noun.",
        ],
        examples: [
          { english: "She sounds just like her sister." },
          { english: "Working remotely is nothing like as easy as it looks." },
          { english: "Learning a language is like training a muscle.", note: "like + gerund" },
        ],
      },
    ],
  },
];

export const adjectives = defineGrammarConcept({
  slug: "adjectives",
  title: "Adjectives & comparison",
  category: "sentence-building",
  sourceSlugs: ["adjectives"],
  additionalTopics: c1Topics,
  summary: "Adjetivos B2 y comparación C1: forma, posición, -ed/-ing, comparativos, superlativos e intensificación avanzada de diferencias y equivalencias.",
  memoryHook: "DESCRIBE · COMPARA · MIDE LA DISTANCIA.",
  studyQuestion: "¿Solo describes algo o necesitas decir exactamente cuánto se parece, supera o se aleja de otra cosa?",
});
