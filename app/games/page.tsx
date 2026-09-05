import type { Metadata } from "next";
import { StudyWorkspace } from "@/components/study/study-workspace";
import { vocabularyLexicon, vocabularyTopics } from "@/lib/vocabulary";

export const metadata: Metadata = {
  title: "Estudiar vocabulario",
  description: "Crea grupos de estudio y practica el vocabulario B2 con distintos modos de recuperación activa.",
};

export default function GamesPage() {
  const topics = vocabularyTopics.map((topic) => ({
    slug: topic.slug,
    title: topic.title,
  }));

  return (
    <div className="shell page-shell">
      <header className="page-header compact-header">
        <span className="eyebrow">Estudio · vocabulario · juegos</span>
        <h1>Decide qué quieres estudiar. Después decide cómo recuperarlo.</h1>
        <p>
          Los grupos de estudio son una capa sobre el léxico B2: los estáticos guardan una selección
          concreta y los dinámicos se recalculan mediante filtros. Todos los modos de práctica usan las
          mismas fichas canónicas, así que no hay vocabulario duplicado ni quizzes escritos a mano.
        </p>
      </header>

      <StudyWorkspace lexicon={vocabularyLexicon} topics={topics} />
    </div>
  );
}
