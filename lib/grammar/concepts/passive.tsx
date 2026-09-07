import type { GrammarTopic } from "../types";
import { defineGrammarConcept } from "./factory";

const c1Topics: GrammarTopic[] = [
  {
    unit: 11,
    slug: "c1-passive",
    title: "Passive forms: C1 register",
    level: "C1",
    examPractice: "Gold C1 · Unit 11 · Grammar reference pp. 163–164",
    summary: "Pasiva en tiempos y modals complejos, con especial foco en reporting passives formales.",
    sections: [
      {
        title: "Passive across complex verb forms",
        forms: ["appropriate form of be + past participle"],
        rules: [
          "La passive puede formarse en prácticamente cualquier tense o modal structure usando la forma adecuada de be + past participle.",
          "En academic writing y business reports es frecuente porque permite centrar el mensaje en el proceso, resultado o entidad afectada, no en el agente.",
          "Con modal perfect forms aparecen estructuras como must have been + past participle; con future perfect, will have been + past participle.",
        ],
        examples: [
          { english: "The project will have been completed by Friday." },
          { english: "The documents must have been sent to the wrong address." },
        ],
      },
      {
        title: "Impersonal passive reporting structures",
        forms: ["It + be + past participle + that-clause", "subject + be + past participle + to-infinitive"],
        rules: [
          "Reporting verbs como believe, claim, report, say y think son frecuentes en passive structures formales cuando la fuente no importa o no se especifica.",
          "It is/was + past participle + that-clause mantiene la información en una construcción impersonal.",
          "Subject + be + past participle + to-infinitive desplaza el foco hacia la persona/cosa reportada.",
        ],
        examples: [
          { english: "It is believed that the market will recover." },
          { english: "The minister is thought to be considering new measures." },
        ],
      },
    ],
  },
];

export const passive = defineGrammarConcept({
  slug: "passive",
  title: "The passive",
  category: "verbs-and-meaning",
  sourceSlugs: ["the-passive"],
  additionalTopics: c1Topics,
  summary: "La pasiva como cambio de foco desde B2 hasta C1: formación, causative have/get, tiempos y modals complejos y reporting passives formales.",
  memoryHook: "ACTIVA mira al que hace · PASIVA mira al proceso/resultado o a quien recibe.",
  studyQuestion: "¿Importa más el agente o quieres poner en primer plano el proceso, resultado o entidad afectada?",
});
