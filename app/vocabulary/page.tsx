import type { Metadata } from "next";
import Link from "next/link";
import { vocabularyPacks } from "@/lib/content";

export const metadata: Metadata = { title: "Vocabulario", description: "Vocabulario inglés agrupado por temas y nivel." };

export default function VocabularyPage() {
  return (
    <div className="shell page-shell">
      <header className="page-header compact-header">
        <span className="eyebrow">Vocabulario</span>
        <h1>Aprende palabras dentro de un contexto.</h1>
        <p>Los packs agrupan vocabulario que suele aparecer junto. Así recuerdas significado, uso y asociaciones, no traducciones sueltas.</p>
      </header>
      <div className="vocab-grid">
        {vocabularyPacks.map((pack) => (
          <article className="vocab-card" key={pack.title}>
            <div className="lesson-title-row"><h2>{pack.title}</h2><span className="level-pill">{pack.level}</span></div>
            <div className="word-cloud">{pack.words.map((word) => <span key={word}>{word}</span>)}</div>
            <p>Pack inicial · próximamente incluirá definición, pronunciación, collocations y ejemplos.</p>
          </article>
        ))}
      </div>
      <section className="cta-panel">
        <div><span className="eyebrow">Practica ahora</span><h2>¿Cuántas de estas palabras reconoces de verdad?</h2></div>
        <Link className="button button-primary" href="/games">Abrir quiz de vocabulario</Link>
      </section>
    </div>
  );
}
