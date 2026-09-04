import type { Metadata } from "next";
import { GrammarBrowser } from "@/components/grammar-browser";
import { grammarTopics } from "@/lib/grammar";

export const metadata: Metadata = {
  title: "Gramática B2",
  description: "Temario completo de gramática B2 basado en Grammar and Vocabulary for First, explicado de forma clara y práctica.",
};

export default function GrammarPage() {
  return (
    <div className="shell page-shell">
      <header className="page-header grammar-page-header">
        <span className="eyebrow">Gramática · Cambridge B2</span>
        <h1>Todo el temario gramatical del B2, tema a tema.</h1>
        <p>
          Las 24 unidades gramaticales del libro de estudio están organizadas en el menú lateral.
          Selecciona una unidad para ver sus estructuras, usos, diferencias, excepciones, ejemplos y trampas de examen.
        </p>
      </header>

      <GrammarBrowser topics={grammarTopics} />
    </div>
  );
}
