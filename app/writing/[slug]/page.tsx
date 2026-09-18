import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getWritingEntry, writingEntries } from "@/lib/writing";
import styles from "../writing.module.css";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return writingEntries.map((entry) => ({ slug: entry.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const entry = getWritingEntry(slug);
  if (!entry) return {};

  return {
    title: `${entry.title} · Writing C1`,
    description: `${entry.title} para Cambridge C1 Advanced: estructura, registro, useful language, tips, errores frecuentes, checklist y modelo original.`,
  };
}

export default async function WritingDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const entry = getWritingEntry(slug);
  if (!entry) notFound();

  return (
    <div className={`shell page-shell ${styles.detailShell}`}>
      <nav className={styles.breadcrumbs} aria-label="Breadcrumb">
        <Link href="/writing">Writing</Link>
        <span>→</span>
        <span>{entry.title}</span>
      </nav>

      <header className={styles.detailHero}>
        <div className={styles.detailMeta}>
          <span className={styles.badge}>{entry.examPart}</span>
          <span className={entry.required ? styles.requiredBadge : styles.optionalBadge}>{entry.required ? "Obligatorio" : "Elección"}</span>
          <span className={styles.badge}>{entry.wordCount}</span>
        </div>
        <h1>{entry.title}</h1>
        <p>{entry.summary}</p>
        <div className={styles.mentalTemplate}>
          <span>Plantilla mental</span>
          <strong>{entry.mentalTemplate}</strong>
        </div>
      </header>

      <div className={styles.detailGrid}>
        <div className={styles.stack}>
          <section className={styles.panel}>
            <span className="eyebrow">Estructura</span>
            <h2>Cómo organizarlo</h2>
            <p><strong>Objetivo:</strong> {entry.purpose}</p>
            <p><strong>Registro:</strong> {entry.register}</p>
            <div className={styles.structureList}>
              {entry.structure.map((section) => (
                <article className={styles.structureItem} key={section.title}>
                  <h3>{section.title}</h3>
                  <ul>
                    {section.items.map((item) => <li key={item}>{item}</li>)}
                  </ul>
                </article>
              ))}
            </div>
          </section>

          <section className={styles.panel}>
            <span className="eyebrow">Useful language</span>
            <h2>Frases que te interesa tener disponibles</h2>
            <div className={styles.languageGrid}>
              {entry.usefulLanguage.map((group) => (
                <article className={styles.languageGroup} key={group.title}>
                  <h3>{group.title}</h3>
                  <ul>{group.phrases.map((phrase) => <li key={phrase}>{phrase}</li>)}</ul>
                </article>
              ))}
            </div>
          </section>
        </div>

        <aside className={styles.stack}>
          <section className={styles.panel}>
            <span className="eyebrow">Tips Cambridge</span>
            <h2>Haz esto</h2>
            <ul className={styles.tipList}>{entry.tips.map((tip) => <li key={tip}>{tip}</li>)}</ul>
          </section>

          <section className={styles.panel}>
            <span className="eyebrow">Traps</span>
            <h2>Evita esto</h2>
            <ul className={styles.trapList}>{entry.traps.map((trap) => <li key={trap}>{trap}</li>)}</ul>
          </section>

          <section className={styles.panel}>
            <span className="eyebrow">Checklist</span>
            <h2>Antes de entregar</h2>
            <ul className={styles.checkList}>{entry.checklist.map((item) => <li key={item}>{item}</li>)}</ul>
          </section>
        </aside>
      </div>

      <section className={styles.taskCard}>
        <span className={styles.miniLabel}>Example task</span>
        <p>{entry.exampleTask}</p>
      </section>

      <section className={styles.exampleCard}>
        <span className="eyebrow">Modelo original</span>
        <h2>Example answer</h2>
        <div className={styles.exampleText}>{entry.exampleAnswer}</div>
        <p className={styles.sourceNote}>Modelo creado para esta web siguiendo la estructura y recomendaciones del Gold C1 Advanced; no reproduce el model answer del libro.</p>
      </section>
    </div>
  );
}
