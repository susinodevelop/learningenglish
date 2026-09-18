import type { Metadata } from "next";
import Link from "next/link";
import { writingEntries, writingExamOverview, writingGeneralChecklist } from "@/lib/writing";
import styles from "./writing.module.css";

export const metadata: Metadata = {
  title: "Writing Cambridge C1",
  description: "Guía práctica de Writing C1 Advanced: essay, proposal, report, review y letter, con estructura, useful language, tips, traps, checklist y modelos.",
};

export default function WritingPage() {
  return (
    <div className="shell page-shell">
      <header className="page-header">
        <span className="eyebrow">Writing · Cambridge C1 Advanced</span>
        <h1>Aprende el formato antes de escribir.</h1>
        <p>
          Cada tipo de writing tiene una intención, un lector y una estructura distinta. Aquí tienes una guía de referencia para decidir qué incluir,
          cómo organizarlo y qué lenguaje usar antes de practicar una tarea completa.
        </p>
      </header>

      <section className={styles.overviewGrid} aria-label="Resumen del examen de Writing">
        <article className={styles.examCard}>
          <span className="eyebrow">El examen</span>
          <h2>Dos textos, el mismo peso.</h2>
          <p>{writingExamOverview.note}</p>
          <div className={styles.statGrid}>
            <div className={styles.stat}><strong>{writingExamOverview.duration}</strong><span>Tiempo total</span></div>
            <div className={styles.stat}><strong>{writingExamOverview.tasks}</strong><span>Una tarea de cada parte</span></div>
            <div className={styles.stat}><strong>{writingExamOverview.wordCount}</strong><span>Extensión objetivo</span></div>
          </div>
        </article>

        <article className={styles.criteriaCard}>
          <span className="eyebrow">Cómo te corrigen</span>
          <h2>4 criterios</h2>
          <ul className={styles.criteriaList}>
            {writingExamOverview.criteria.map((criterion) => <li key={criterion}>{criterion}</li>)}
          </ul>
        </article>
      </section>

      <section>
        <div className={styles.sectionHeading}>
          <div>
            <span className="eyebrow">Tipos de writing</span>
            <h2>Qué quieres practicar</h2>
          </div>
          <p>Essay es obligatorio en Part 1. En Part 2 debes elegir una de las opciones disponibles, así que conviene dominar al menos dos o tres formatos.</p>
        </div>

        <div className={styles.entryGrid}>
          {writingEntries.map((entry) => (
            <Link className={styles.entryCard} href={`/writing/${entry.slug}`} key={entry.slug}>
              <div className={styles.entryTopline}>
                <span className={styles.badge}>{entry.examPart}</span>
                <span className={entry.required ? styles.requiredBadge : styles.optionalBadge}>{entry.required ? "Obligatorio" : "Elección"}</span>
                <span className={styles.badge}>{entry.wordCount}</span>
              </div>
              <h3>{entry.title}</h3>
              <p>{entry.summary}</p>
              <div className={styles.entryFooter}>
                <span>{entry.register}</span>
                <span>Estudiar →</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className={`${styles.panel} ${styles.generalChecklist}`}>
        <span className="eyebrow">Checklist general</span>
        <h2>Antes de entregar cualquier writing</h2>
        <ul className={styles.checkList}>
          {writingGeneralChecklist.map((item) => <li key={item}>{item}</li>)}
        </ul>
      </section>
    </div>
  );
}
