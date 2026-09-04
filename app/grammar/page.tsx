import type { Metadata } from "next";
import { grammarTopics } from "@/lib/content";

export const metadata: Metadata = { title: "Gramática", description: "Gramática inglesa explicada de forma lógica y organizada por niveles." };

export default function GrammarPage() {
  return (
    <div className="shell page-shell">
      <header className="page-header">
        <span className="eyebrow">Gramática · A2 → C1</span>
        <h1>Entiende la estructura antes de memorizarla.</h1>
        <p>Cada tema parte de la lógica que hay detrás de la elección gramatical y termina con ejemplos que puedes reutilizar.</p>
      </header>

      <nav className="topic-index" aria-label="Índice de gramática">
        {grammarTopics.map((topic) => <a href={`#${topic.slug}`} key={topic.slug}>{topic.title}</a>)}
      </nav>

      <div className="lesson-list">
        {grammarTopics.map((topic, index) => (
          <article className="lesson-card" id={topic.slug} key={topic.slug}>
            <div className="lesson-number">{String(index + 1).padStart(2, "0")}</div>
            <div className="lesson-body">
              <div className="lesson-title-row"><h2>{topic.title}</h2><span className="level-pill">{topic.level}</span></div>
              <p className="lesson-summary">{topic.summary}</p>
              <div className="logic-box"><strong>La lógica</strong><p>{topic.rule}</p></div>
              <div className="examples"><strong>Ejemplos</strong>{topic.examples.map((example) => <code key={example}>{example}</code>)}</div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
