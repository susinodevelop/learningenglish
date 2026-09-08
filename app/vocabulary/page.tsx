import type { Metadata } from "next";
import Link from "next/link";
import { VocabularyExplorer } from "@/components/vocabulary/vocabulary-explorer";
import {
  vocabularyCategories,
  vocabularyEntryCountByLevel,
  vocabularyLexemeCount,
  vocabularyLexemes,
  vocabularySenseCount,
  vocabularySenses,
  vocabularyTopics,
} from "@/lib/vocabulary";

export const metadata: Metadata = {
  title: "Vocabulario B2 + C1",
  description: "Léxico Cambridge B2 First y C1 Advanced agrupado por términos, acepciones, temas y relaciones.",
};

export default function VocabularyPage() {
  return (
    <div className="shell page-shell">
      <header className="page-header compact-header">
        <span className="eyebrow">Vocabulario · Cambridge B2 + C1</span>
        <h1>Busca una palabra. Entiende cada acepción. Practícala después.</h1>
        <p>
          El vocabulario de Grammar and Vocabulary for First y Gold C1 Advanced comparte ahora una
          estructura Lexeme → Sense: una palabra aparece una sola vez y agrupa todos sus significados.
        </p>
        <p>
          {vocabularyEntryCountByLevel.B2} fichas fuente B2 · {vocabularyEntryCountByLevel.C1} fichas fuente C1 · {vocabularyLexemeCount} términos · {vocabularySenseCount} acepciones
        </p>
      </header>

      <VocabularyExplorer
        categories={vocabularyCategories}
        topics={vocabularyTopics}
        lexemes={vocabularyLexemes}
        senses={vocabularySenses}
      />

      <section className="cta-panel">
        <div>
          <span className="eyebrow">Grupos y juegos</span>
          <h2>Crea listas estáticas o dinámicas y practica con Flashcards, Write it y cuatro direcciones de multiple choice.</h2>
        </div>
        <Link className="button button-primary" href="/games#vocabulary">
          Ir a ejercicios de vocabulario
        </Link>
      </section>
    </div>
  );
}
