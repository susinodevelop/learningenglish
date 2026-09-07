import type { Metadata } from "next";
import Link from "next/link";
import { VocabularyBrowser } from "@/components/vocabulary/vocabulary-browser";
import {
  vocabularyCategories,
  vocabularyEntryCount,
  vocabularyEntryCountByLevel,
  vocabularyTopics,
} from "@/lib/vocabulary";

export const metadata: Metadata = {
  title: "Vocabulario B2 + C1",
  description: "Vocabulario Cambridge B2 First y C1 Advanced clasificado por conceptos, chunks, phrasal verbs y word families.",
};

export default function VocabularyPage() {
  return (
    <div className="shell page-shell">
      <header className="page-header compact-header">
        <span className="eyebrow">Vocabulario · Cambridge B2 + C1</span>
        <h1>No memorices listas. Construye asociaciones.</h1>
        <p>
          El vocabulario de Grammar and Vocabulary for First y Gold C1 Advanced está reorganizado
          sobre un único léxico canónico. Si B2 y C1 trabajan el mismo sentido, la web reutiliza la
          misma ficha; C1 añade únicamente los sentidos y relaciones nuevos.
        </p>
        <p>
          {vocabularyEntryCountByLevel.B2} fichas fuente B2 · {vocabularyEntryCountByLevel.C1} fichas fuente C1
        </p>
      </header>

      <VocabularyBrowser
        categories={vocabularyCategories}
        topics={vocabularyTopics}
        entryCount={vocabularyEntryCount}
      />

      <section className="cta-panel">
        <div>
          <span className="eyebrow">Grupos de estudio</span>
          <h2>Crea una lista para un examen o deja que un grupo dinámico reúna automáticamente lo que necesitas repasar.</h2>
        </div>
        <Link className="button button-primary" href="/games">
          Crear grupo y estudiar
        </Link>
      </section>
    </div>
  );
}
