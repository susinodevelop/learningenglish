import type { GrammarTopic } from "../types";
import { defineGrammarConcept } from "./factory";

const c1Topics: GrammarTopic[] = [
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
          "Para deseos sobre nuestra propia capacidad o sobre un hábito propio que querríamos cambiar, usamos normalmente wish + could, no wish + would.",
          "Wish + past perfect expresa arrepentimiento o deseo de cambiar un hecho pasado.",
        ],
        examples: [
          { english: "I wish I knew the answer." },
          { english: "I wish he'd stop interrupting." },
          { english: "I wish I could speak Japanese." },
          { english: "I wish I hadn't sent that message." },
        ],
      },
      {
        title: "If only",
        rules: [
          "If only usa las mismas formas verbales que wish, pero expresa el deseo, arrepentimiento o crítica con más intensidad.",
          "Puede aparecer con would/wouldn't para criticar la conducta de otra persona.",
        ],
        examples: [
          { english: "If only I'd listened to your advice!" },
          { english: "If only the neighbours would be quieter." },
        ],
      },
      {
        title: "It's time / about time / high time",
        forms: ["It's (about/high) time + subject + past simple"],
        rules: [
          "Aunque la referencia sea presente o futura, usamos past simple para indicar que la acción ya debería haberse realizado.",
          "About time y high time añaden énfasis.",
        ],
        examples: [{ english: "It's high time we made a decision." }],
      },
      {
        title: "Would rather + past",
        rules: [
          "Would rather + subject + past simple expresa una preferencia sobre la conducta de otra persona en presente/futuro.",
          "Would rather + subject + past perfect expresa una preferencia retrospectiva: queríamos que algo hubiera ocurrido de otra forma.",
          "Para preferencias del propio sujeto usamos would rather + bare infinitive, no past simple/past perfect.",
        ],
        examples: [
          { english: "I'd rather you didn't mention the price." },
          { english: "I'd rather you had told me earlier." },
          { english: "I'd rather stay at home tonight." },
        ],
      },
    ],
  },
  {
    unit: 7,
    slug: "c1-conditionals-advanced",
    title: "Conditionals: advanced features",
    level: "C1",
    examPractice: "Gold C1 · Unit 7 · Grammar reference pp. 158–160",
    summary: "Alternativas a if, mixed conditionals, inversión formal, happen to, suppose/what if e if + will/would.",
    sections: [
      {
        title: "Review: flexible tense choices in conditionals",
        rules: [
          "En first conditional, el if-clause puede usar present simple, present continuous o present perfect según el significado; la main clause puede llevar future form o imperative.",
          "En second conditional, el if-clause puede usar past simple o past continuous para una situación presente/futura imaginaria.",
          "Zero conditional también puede aparecer con when o unless cuando el significado lo permite.",
          "Los modals permiten ajustar posibilidad, capacidad, consejo o consecuencia dentro de distintos tipos de conditional.",
        ],
        examples: [
          { english: "If you've finished, send me the final version." },
          { english: "If I were working from home, I'd save two hours a day." },
        ],
      },
      {
        title: "Mixed conditionals and modal flexibility",
        rules: [
          "Los mixed conditionals combinan tiempos cuando la condición y el resultado pertenecen a momentos distintos.",
          "Un if-clause pasado puede producir un resultado presente/futuro: if + past perfect → would/could + infinitive.",
          "Un if-clause presente/futuro puede relacionarse con una consecuencia pasada cuando el significado lo exige.",
          "Can, could, might y otros modals pueden aparecer en distintos tipos de conditional para ajustar posibilidad, capacidad o consecuencia.",
        ],
        examples: [
          { english: "If I'd accepted that job, I'd be living in Berlin now." },
          { english: "If you hate hot weather, you shouldn't have booked August." },
        ],
      },
      {
        title: "Conditional linkers and alternatives to if",
        rules: [
          "Además de if, son frecuentes as/so long as, unless, even if, whether, providing, provided (that) y on condition that.",
          "In the event of + noun presenta formalmente una posible situación futura.",
          "Otherwise introduce la consecuencia si no se cumple la condición implícita.",
          "In case introduce una precaución ante algo que podría ocurrir; no equivale a if.",
        ],
        examples: [
          { english: "You can stay as long as you keep the noise down." },
          { english: "In the event of cancellation, we'll refund the full amount." },
          { english: "Take a charger in case the battery runs out." },
        ],
        traps: ["In case = precaución; if = condición. No son intercambiables."],
      },
      {
        title: "Formal conditional inversion",
        forms: ["Had + subject + past participle, ...", "Were + subject + ..., ...", "Should + subject + infinitive, ..."],
        rules: [
          "En estilo formal podemos omitir if e invertir auxiliary + subject.",
          "Had + subject... sustituye a if + past perfect.",
          "Were + subject... puede sustituir a if + were en hipótesis formales.",
          "Should + subject + infinitive es una forma formal de if + subject + should, frecuente en cartas y comunicaciones formales.",
        ],
        examples: [
          { english: "Had I known about the delay, I would have left later." },
          { english: "Were she available, we could ask her directly." },
          { english: "Should you require further information, please contact us." },
        ],
      },
      {
        title: "Happen to and chance possibility",
        forms: ["if + subject + (should) happen to + infinitive"],
        rules: [
          "If + (should) happen to presenta una posibilidad como casual o menos probable.",
          "Should y happen pueden aparecer juntos para aumentar la distancia o formalidad.",
        ],
        examples: [
          { english: "If you happen to see Liam, ask him to call me." },
          { english: "If you should happen to be in Madrid, let me know." },
        ],
      },
      {
        title: "Suppose / what if",
        rules: [
          "Suppose/what if + present simple plantea una posibilidad real o algo que puede haber ocurrido.",
          "Suppose/what if + past simple plantea una situación imaginaria o poco probable presente/futura.",
          "Suppose/what if + past perfect imagina un pasado alternativo que no ocurrió.",
        ],
        examples: [
          { english: "Suppose nobody answers. What will we do?" },
          { english: "Suppose you got the job abroad. Would you move?" },
          { english: "What if we'd taken the other road?" },
        ],
      },
      {
        title: "If + will / would for willingness",
        rules: [
          "Aunque normalmente evitamos will en un if-clause de condición, sí puede aparecer cuando will/would significa 'be willing to'.",
          "If + will/would se usa especialmente en peticiones educadas y fórmulas formales.",
        ],
        examples: [
          { english: "If you'll wait here for a moment, I'll see whether she's free." },
          { english: "If you would sign here, we can complete the application." },
        ],
      },
      {
        title: "If + were to for greater hypothetical distance",
        forms: ["if + subject + were to + infinitive, ..."],
        rules: [
          "If + were to + infinitive hace que una posibilidad presente o futura suene más hipotética o remota.",
          "No es lo mismo que la inversión formal Were + subject...: aquí if se mantiene.",
        ],
        examples: [{ english: "If the company were to cancel the project, we would need a new plan." }],
      },
    ],
  },
];

export const conditionals = defineGrammarConcept({
  slug: "conditionals",
  title: "Conditionals & hypothetical meaning",
  category: "complex-structures",
  sourceSlugs: ["conditionals-1", "conditionals-2"],
  additionalTopics: c1Topics,
  summary: "Conditionals B2 ampliados con C1: mixed conditionals, alternatives to if, formal inversion, suppose/what if, wish, if only, it's time y would rather.",
  memoryHook: "REALIDAD + TIEMPO + DISTANCIA: cuanto más remoto, más retrocede la forma verbal.",
  studyQuestion: "¿Hablas de una condición real/imaginaria, un pasado alternativo o una situación que deseas que fuera diferente?",
});
