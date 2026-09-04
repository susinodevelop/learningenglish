import type { Metadata } from "next";
import { GrammarConceptBrowser } from "@/components/grammar/grammar-concept-browser";
import { grammarConcepts } from "@/lib/grammar";

export const metadata: Metadata = {
  title: "Gramática B2 por conceptos",
  description: "Gramática Cambridge B2 reorganizada por conceptos relacionados, con mapas visuales, ejemplos, lógica, traps y práctica activa.",
};

export default function GrammarPage() {
  return (
    <div className="shell page-shell">
      <header className="page-header grammar-page-header">
        <span className="eyebrow">Gramática · Cambridge B2</span>
        <h1>Estudia conceptos, no unidades.</h1>
        <p>
          La gramática está reordenada por relaciones reales: tiempos verbales, construcción de frases,
          intención del verbo y conexión de ideas. Cada tema empieza con una pregunta guía, un atajo mental
          y ejemplos visuales para reducir la carga de memoria.
        </p>
      </header>

      <GrammarConceptBrowser topics={grammarConcepts} />
    </div>
  );
}
