import type { GrammarTopic } from "../types";
import { defineGrammarConcept } from "./factory";

const c1Topics: GrammarTopic[] = [
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
          "Los gradable adjectives/adverbs admiten modificadores como bitterly, barely, deeply, somewhat, seriously, really, extremely, practically, entirely, pretty, completely, quite, scarcely, totally y very.",
          "El libro presenta collocations concretas: bitterly cold/ashamed/disappointed/divided; barely alive/legible/comprehensible; completely serious/open/honest; deeply serious/painful/sorry.",
          "También aparecen entirely convinced/clear/satisfactory; pretty doubtful/hopeless; perfectly capable/aware/reasonable/normal/safe/straightforward/sure; seriously alarmed/worried/hurt.",
          "La elección correcta depende de collocation: conviene aprender modifier + adjective como unidad.",
        ],
        examples: [
          { english: "She was bitterly disappointed by the result." },
          { english: "I'm perfectly aware of the risk." },
        ],
      },
      {
        title: "Extreme / non-gradable adjectives",
        rules: [
          "Adjectives extremos o absolutos como amazing, devastating, disastrous, fantastic, freezing, furious, immense, impossible y staggering no se comportan como gradable adjectives normales.",
          "Con ellos son naturales absolutely, totally, really, utterly, pretty y quite.",
          "Con non-gradable adjectives, quite puede significar 'absolutely', no simplemente 'fairly'.",
        ],
        examples: [
          { english: "The damage was absolutely devastating." },
          { english: "The hall was utterly immense." },
        ],
        traps: ["Very impossible/very freezing suelen ser malas elecciones: usa intensifiers compatibles con non-gradable adjectives."],
      },
    ],
  },
];

export const adverbs = defineGrammarConcept({
  slug: "adverbs",
  title: "Adverbs & modifiers",
  category: "sentence-building",
  sourceSlugs: ["adverbs"],
  additionalTopics: c1Topics,
  summary: "Adverbs B2 ampliados con modifiers C1: posición, significado, gradability e intensifiers que dependen de collocation.",
  memoryHook: "MODIFICA, pero comprueba GRADO + COLLOCATION.",
  studyQuestion: "¿Qué estás modificando y qué intensidad admite de forma natural esa palabra?",
});
