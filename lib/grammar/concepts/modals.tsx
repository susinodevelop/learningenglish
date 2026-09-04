import { defineGrammarConcept } from "./factory";

export const modals = defineGrammarConcept({
  slug: "modals",
  title: "Modals",
  category: "verbs-and-meaning",
  sourceSlugs: ["modals-1", "modals-2", "modals-3"],
  summary: "Obligación, permiso, petición, consejo, capacidad, posibilidad y deducción reunidos según la intención, no según dónde aparezcan en el libro.",
  memoryHook: "MODAL = actitud del hablante: obligación · permiso · consejo · posibilidad · certeza.",
  studyQuestion: "¿Quieres obligar, permitir, aconsejar, expresar capacidad o decir cuánta certeza tienes?",
});
