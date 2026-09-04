import type { Metadata } from "next";
import { VocabularyQuiz } from "@/components/vocabulary-quiz";

export const metadata: Metadata = { title: "Juegos", description: "Juegos y quizzes para practicar inglés de forma activa." };

export default function GamesPage() {
  return (
    <div className="shell page-shell">
      <header className="page-header compact-header">
        <span className="eyebrow">Juegos · práctica activa</span>
        <h1>Recordar mejora cuando tienes que recuperar la respuesta.</h1>
        <p>Empieza con este quiz de vocabulario. Después añadiremos verb patterns, cloze, collocations, phrasal verbs y formatos tipo Cambridge.</p>
      </header>
      <div className="game-layout">
        <VocabularyQuiz />
        <aside className="game-sidebar">
          <span className="eyebrow">Cómo usarlo</span>
          <h2>No busques acertar por descarte.</h2>
          <p>Antes de pulsar, intenta explicar la palabra en voz alta o crear una frase. Esa recuperación activa hace que la práctica valga mucho más.</p>
          <div className="coming-list"><span>Próximo</span><strong>Verb patterns challenge</strong><strong>Use of English · Open Cloze</strong><strong>Collocations sprint</strong></div>
        </aside>
      </div>
    </div>
  );
}
