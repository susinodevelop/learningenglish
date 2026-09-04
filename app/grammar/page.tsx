import type { Metadata } from "next";
import { GrammarBrowser } from "@/components/grammar-browser";
import { grammarTopics } from "@/lib/content";

export const metadata: Metadata = {
  title: "Gramática",
  description: "Gramática inglesa explicada de forma lógica y organizada por niveles.",
};

export default function GrammarPage() {
  return (
    <div className="shell page-shell">
      <header className="page-header grammar-page-header">
        <span className="eyebrow">Gramática · A2 → C1</span>
        <h1>Entiende la estructura antes de memorizarla.</h1>
        <p>
          Elige un tema en el menú lateral. Verás únicamente esa explicación,
          su lógica y ejemplos reutilizables para estudiar sin distracciones.
        </p>
      </header>

      <GrammarBrowser topics={grammarTopics} />
    </div>
  );
}
