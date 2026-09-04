import type { Metadata } from "next";
import { GrammarBrowser } from "@/components/grammar-browser";
import { grammarStudyTopics } from "@/lib/grammar";

export const metadata: Metadata = {
  title: "Gramática B2",
  description: "Temario completo de gramática B2 basado en Grammar and Vocabulary for First, explicado de forma clara y práctica.",
};

export default function GrammarPage() {
  return (
    <div className="shell page-shell">
      <header className="page-header grammar-page-header">
        <span className="eyebrow">Gramática · Cambridge B2</span>
        <h1>Todo el temario gramatical del B2, agrupado por temas.</h1>
        <p>
          Las 24 unidades gramaticales del libro están reunidas en temas de estudio para evitar separar contenido que pertenece al mismo bloque.
          Abre un tema en el menú lateral para saltar directamente a cualquiera de sus subapartados.
        </p>
      </header>

      <GrammarBrowser topics={grammarStudyTopics} />
    </div>
  );
}
