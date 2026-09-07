import type { Metadata } from "next";
import { GrammarConceptBrowser } from "@/components/grammar/grammar-concept-browser";
import { grammarConcepts } from "@/lib/grammar";

export const metadata: Metadata = {
  title: "Gramática Cambridge B2 + C1 por conceptos",
  description: "Gramática Cambridge B2 y C1 integrada por conceptos relacionados, con explicaciones, estructuras, ejemplos, traps y práctica activa.",
};

export default function GrammarPage() {
  return (
    <div className="shell page-shell">
      <header className="page-header grammar-page-header">
        <span className="eyebrow">Gramática · Cambridge B2 + C1</span>
        <h1>Estudia conceptos, no unidades.</h1>
        <p>
          La base B2 y las ampliaciones C1 están integradas en un mismo mapa: tiempos verbales,
          construcción de frases, intención del verbo y conexión de ideas. Cada subapartado indica
          su nivel para que puedas consolidar B2 y avanzar a C1 sin estudiar la misma gramática dos veces.
        </p>
      </header>

      <GrammarConceptBrowser topics={grammarConcepts} />
    </div>
  );
}
