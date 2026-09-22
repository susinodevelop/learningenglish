import type { Metadata } from "next";
import Link from "next/link";
import { grammarConcepts } from "@/lib/grammar";

export const metadata: Metadata = {
  title: "Verb patterns · Gold C1 Unit 4",
  description: "Teoría de Verb patterns de Gold C1 Unit 4: -ing, infinitive, object patterns y cambios de significado.",
};

const verbPatternsConcept = grammarConcepts.find((concept) => concept.slug === "verb-patterns");
const c1VerbPatternSections = verbPatternsConcept?.sections.filter((section) => section.level === "C1") ?? [];

export default function VerbPatternsTheoryPage() {
  return (
    <div className="shell page-shell">
      <header className="page-header grammar-page-header">
        <span className="eyebrow">Gramática · Gold C1 · Unit 4</span>
        <h1>Verb patterns.</h1>
        <p>
          Esta ruta recoge únicamente la teoría C1 que utiliza el banco exclusivo de ejercicios: Grammar Focus,
          Language Tip y Grammar Reference de Unit 4. La teoría B2 relacionada sigue disponible en la gramática
          completa, pero no determina las respuestas de este banco.
        </p>
        <div className="hero-actions">
          <Link className="button button-primary" href="/games#verb-patterns">
            Volver a los ejercicios
          </Link>
          <Link className="button button-secondary" href="/grammar">
            Ver gramática completa B2 + C1
          </Link>
        </div>
      </header>

      <section className="lesson-list" aria-label="Teoría de Verb patterns de Gold C1 Unit 4">
        {c1VerbPatternSections.map((section, index) => (
          <article className="lesson-card" id={section.id} key={section.id}>
            <div className="lesson-number">{String(index + 1).padStart(2, "0")}</div>
            <div>
              <div className="lesson-title-row">
                <h2>{section.title}</h2>
                <span className="level-pill">C1</span>
              </div>

              {section.intro ? <p className="lesson-summary">{section.intro}</p> : null}

              {section.forms?.length ? (
                <div className="logic-box">
                  <strong>Forma</strong>
                  {section.forms.map((form) => (
                    <p key={form}><code>{form}</code></p>
                  ))}
                </div>
              ) : null}

              <ul>
                {section.rules.map((rule) => (
                  <li key={rule}>{rule}</li>
                ))}
              </ul>

              {section.examples?.length ? (
                <div className="examples">
                  {section.examples.map((example) => (
                    <code key={`${example.english}-${example.note ?? ""}`}>
                      {example.english}{example.note ? ` — ${example.note}` : ""}
                    </code>
                  ))}
                </div>
              ) : null}

              {section.traps?.length ? (
                <div className="logic-box">
                  <strong>Cambridge trap</strong>
                  {section.traps.map((trap) => (
                    <p key={trap}>{trap}</p>
                  ))}
                </div>
              ) : null}
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}
