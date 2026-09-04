import type { Metadata } from "next";
import Link from "next/link";
import { VocabularyBrowser } from "@/components/vocabulary/vocabulary-browser";
import {
  vocabularyCategories,
  vocabularyEntryCount,
  vocabularyTopics,
} from "@/lib/vocabulary";

export const metadata: Metadata = {
  title: "Vocabulario B2",
  description: "Vocabulario Cambridge B2 clasificado por conceptos, chunks, phrasal verbs y word families.",
};

export default function VocabularyPage() {
  return (
    <div className="shell page-shell">
      <header className="page-header compact-header">
        <span className="eyebrow">Vocabulario · Cambridge B2</span>
        <h1>No memorices listas. Construye asociaciones.</h1>
        <p>
          Todo el vocabulario clave del bloque Vocabulary del libro está reorganizado por conceptos.
          Dentro de cada tema separas palabras, chunks, collocations, phrasal verbs, word building y
          diferencias que suelen provocar errores.
        </p>
      </header>

      <VocabularyBrowser
        categories={vocabularyCategories}
        topics={vocabularyTopics}
        entryCount={vocabularyEntryCount}
      />

      <section className="cta-panel">
        <div>
          <span className="eyebrow">Recuperación activa</span>
          <h2>Cuando ya reconozcas las fichas, comprueba si puedes recuperarlas sin pistas.</h2>
        </div>
        <Link className="button button-primary" href="/games">
          Abrir quiz de vocabulario
        </Link>
      </section>
    </div>
  );
}
