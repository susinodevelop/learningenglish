import type { Metadata } from "next";
import Link from "next/link";
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

      <section className="grammar-feature" aria-labelledby="grammar-connectors-title">
        <div>
          <span className="eyebrow">Guía de estudio · B2 + C1</span>
          <h2 id="grammar-connectors-title">Preposiciones, conjunciones y conectores</h2>
          <p>Elige primero la relación entre ideas y después la estructura: nombre, oración completa o frase independiente. Incluye ejemplos traducidos y errores frecuentes de Cambridge.</p>
        </div>
        <Link className="button button-primary" href="/grammar/connectors">Abrir guía →</Link>
      </section>

      <GrammarConceptBrowser topics={grammarConcepts} />
    </div>
  );
}
