import type { Metadata } from "next";
import { GrammarConceptBrowser } from "@/components/grammar/grammar-concept-browser";
import { grammarConcepts } from "@/lib/grammar";

export const metadata: Metadata = {
  title: "Verb patterns · Cambridge B2 + C1",
  description: "Teoría de Verb patterns: base B2 y ampliación de Gold C1 Unit 4 con -ing, infinitive, object patterns y cambios de significado.",
};

const verbPatternsConcepts = grammarConcepts.filter((concept) => concept.slug === "verb-patterns");

export default function VerbPatternsTheoryPage() {
  return (
    <div className="shell page-shell">
      <header className="page-header grammar-page-header">
        <span className="eyebrow">Gramática · Cambridge B2 + C1</span>
        <h1>Verb patterns.</h1>
        <p>
          Repasa la base B2 y la ampliación de Gold C1 Unit 4 antes de volver al banco exclusivo de ejercicios.
        </p>
      </header>

      <GrammarConceptBrowser topics={verbPatternsConcepts} />
    </div>
  );
}
