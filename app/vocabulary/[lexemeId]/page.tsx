import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { vocabularyLexemes, vocabularySenses, vocabularyTopics } from "@/lib/vocabulary";
import styles from "./page.module.css";

type PageProps = {
  params: Promise<{ lexemeId: string }>;
};

export function generateStaticParams() {
  return vocabularyLexemes.map((lexeme) => ({ lexemeId: lexeme.id }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lexemeId } = await params;
  const lexeme = vocabularyLexemes.find((candidate) => candidate.id === lexemeId);
  return {
    title: lexeme ? `${lexeme.term} · Vocabulary` : "Vocabulary",
  };
}

export default async function VocabularyLexemePage({ params }: PageProps) {
  const { lexemeId } = await params;
  const lexeme = vocabularyLexemes.find((candidate) => candidate.id === lexemeId);
  if (!lexeme) notFound();

  const senses = vocabularySenses.filter((sense) => sense.lexemeId === lexeme.id);
  const topicNames = new Map(vocabularyTopics.map((topic) => [topic.slug, `${topic.title} · ${topic.level}`]));

  return (
    <div className="shell page-shell">
      <nav className={styles.breadcrumbs} aria-label="Breadcrumb">
        <Link href="/vocabulary">Vocabulario</Link><span>›</span><strong>{lexeme.term}</strong>
      </nav>

      <header className={styles.hero}>
        <div>
          <span className="eyebrow">Lexeme · {lexeme.levels.join(" + ")}</span>
          <h1>{lexeme.term}</h1>
          <p>{senses.length} {senses.length === 1 ? "acepción" : "acepciones"} en el léxico canónico.</p>
        </div>
        <Link className="button button-primary" href="/games#vocabulary">Practicar</Link>
      </header>

      <div className={styles.senseList}>
        {senses.map((sense, index) => {
          const relationGroups = [
            ["Synonyms", sense.resolvedRelations.synonyms],
            ["Antonyms", sense.resolvedRelations.antonyms],
            ["Confusables", sense.resolvedRelations.confusedWith],
            ["Word family", sense.resolvedRelations.wordFamily],
          ] as const;
          const example = sense.examples.find((candidate) => candidate.kind === "usage") ?? sense.examples[0];

          return (
            <article className={styles.senseCard} key={sense.senseId}>
              <header>
                <div>
                  <span className={styles.senseIndex}>Acepción {index + 1}</span>
                  <h2>{sense.meaning.en}</h2>
                </div>
                <div className={styles.badges}>
                  {sense.levels.map((level) => <span key={level}>{level}</span>)}
                  <span>{sense.type}</span>
                </div>
              </header>

              <section className={styles.meaningGrid}>
                <div><span>EN</span><p>{sense.meaning.en}</p></div>
                <div><span>ES</span><p>{sense.meaning.es}</p></div>
              </section>

              {example ? (
                <section className={styles.example}>
                  <span>{example.kind === "usage" ? "Example" : "Definition example"}</span>
                  <p>{example.en}</p><small>{example.es}</small>
                </section>
              ) : null}

              <div className={styles.meta}>
                <div><span>Topics</span><p>{sense.topics.map((topic) => topicNames.get(topic) ?? topic).join(" · ")}</p></div>
                {sense.relations.collocations.length > 0 ? <div><span>Collocations</span><p>{sense.relations.collocations.join(" · ")}</p></div> : null}
                {sense.relations.patterns.length > 0 ? <div><span>Patterns</span><p>{sense.relations.patterns.join(" · ")}</p></div> : null}
              </div>

              {relationGroups.some(([, values]) => values.length > 0) ? (
                <section className={styles.relations}>
                  {relationGroups.map(([label, values]) => values.length > 0 ? (
                    <div key={label}>
                      <span>{label}</span>
                      <div className={styles.relationLinks}>
                        {values.map((relation) => relation.lexemeId ? (
                          <Link href={`/vocabulary/${relation.lexemeId}`} key={`${label}-${relation.label}`}>{relation.label}</Link>
                        ) : <em key={`${label}-${relation.label}`}>{relation.label}</em>)}
                      </div>
                    </div>
                  ) : null)}
                </section>
              ) : null}

              {sense.notes.length > 0 ? <aside className={styles.notes}>{sense.notes.join(" · ")}</aside> : null}
            </article>
          );
        })}
      </div>
    </div>
  );
}
