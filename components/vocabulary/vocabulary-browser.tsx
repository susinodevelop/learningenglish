"use client";

import { useMemo, useState } from "react";
import type {
  VocabularyCategory,
  VocabularyEntryType,
  VocabularyLexeme,
  VocabularySectionKind,
  VocabularyStudyTopic,
} from "@/lib/vocabulary";
import styles from "./vocabulary-browser.module.css";

type VocabularyBrowserProps = {
  categories: VocabularyCategory[];
  topics: VocabularyStudyTopic[];
  entryCount: number;
};

const kindLabels: Record<VocabularySectionKind, string> = {
  core: "Palabras clave",
  chunks: "Chunks & collocations",
  phrasal: "Phrasal verbs",
  "word-family": "Word building",
  contrast: "Diferencias / traps",
};

const typeLabels: Record<VocabularyEntryType, string> = {
  word: "Word",
  expression: "Expression",
  collocation: "Collocation",
  "phrasal-verb": "Phrasal verb",
  "word-family": "Word family",
};

function searchableText(entry: VocabularyLexeme) {
  return [
    entry.term,
    entry.meaning.es,
    entry.meaning.en,
    ...entry.notes,
    ...entry.members.flatMap((member) => [member.term, member.meaning.es, member.meaning.en]),
    ...entry.relations.collocations,
    ...entry.relations.patterns,
    ...entry.relations.synonyms,
    ...entry.relations.antonyms,
    ...entry.relations.confusedWith,
    ...entry.relations.wordFamily,
  ].join(" ");
}

function relationGroups(entry: VocabularyLexeme) {
  return [
    ["Collocations", entry.relations.collocations],
    ["Patterns", entry.relations.patterns],
    ["Synonyms", entry.relations.synonyms],
    ["Antonyms", entry.relations.antonyms],
    ["Confusables", entry.relations.confusedWith],
    ["Word family", entry.relations.wordFamily],
  ] as const;
}

export function VocabularyBrowser({ categories, topics, entryCount }: VocabularyBrowserProps) {
  const [activeSlug, setActiveSlug] = useState(topics[0]?.slug ?? "");
  const [query, setQuery] = useState("");
  const [showMeanings, setShowMeanings] = useState(true);

  const activeTopic = topics.find((topic) => topic.slug === activeSlug) ?? topics[0];

  const searchResults = useMemo(() => {
    const normalised = query.trim().toLocaleLowerCase();
    if (normalised.length < 2) return [];

    return topics.flatMap((topic) =>
      topic.sections.flatMap((section) =>
        section.entries
          .filter((entry) =>
            [searchableText(entry), topic.title, section.title, kindLabels[section.kind]]
              .join(" ")
              .toLocaleLowerCase()
              .includes(normalised),
          )
          .map((entry) => ({ topic, section, entry })),
      ),
    );
  }, [query, topics]);

  const visibleSearchResults = searchResults.slice(0, 120);
  const isSearching = query.trim().length >= 2;

  function openTopic(slug: string) {
    setActiveSlug(slug);
    setQuery("");
    requestAnimationFrame(() => {
      document.getElementById("vocabulary-study")?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }

  if (!activeTopic) return null;

  return (
    <div className={styles.browser} id="vocabulary-study">
      <aside className={styles.sidebar}>
        <div className={styles.sidebarTop}>
          <div>
            <span className="eyebrow">Índice conceptual</span>
            <strong>{topics.length} temas · {entryCount} fichas</strong>
          </div>
          <label className={styles.search}>
            <span>Buscar</span>
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="word, definición, significado…"
              aria-label="Buscar vocabulario"
            />
          </label>
        </div>

        <nav className={styles.nav} aria-label="Temas de vocabulario">
          {categories.map((category) => {
            const categoryTopics = topics.filter((topic) => topic.category === category.id);
            return (
              <details className={styles.category} key={category.id} open>
                <summary>
                  <span>{category.label}</span>
                  <small>{categoryTopics.length}</small>
                </summary>
                <p>{category.description}</p>
                <div className={styles.topicList}>
                  {categoryTopics.map((topic) => (
                    <button
                      className={topic.slug === activeTopic.slug && !isSearching ? styles.activeTopic : ""}
                      type="button"
                      onClick={() => openTopic(topic.slug)}
                      key={topic.slug}
                    >
                      {topic.title}
                    </button>
                  ))}
                </div>
              </details>
            );
          })}
        </nav>
      </aside>

      <main className={styles.content}>
        <div className={styles.toolbar}>
          <div className={styles.statLine}>
            <span>B2 Cambridge</span>
            <span>EN definition + ES meaning</span>
            <span>Preparado para juegos</span>
          </div>
          <button
            className={styles.meaningToggle}
            type="button"
            onClick={() => setShowMeanings((value) => !value)}
          >
            {showMeanings ? "Ocultar español" : "Mostrar español"}
          </button>
        </div>

        {isSearching ? (
          <section className={styles.searchResults} aria-live="polite">
            <header className={styles.topicHeader}>
              <span className="eyebrow">Resultados</span>
              <h2>{searchResults.length} coincidencias para “{query.trim()}”</h2>
              <p>
                Busca por término, traducción, definición inglesa, familia léxica, collocation,
                phrasal verb o tema.
              </p>
            </header>

            <div className={styles.resultGrid}>
              {visibleSearchResults.map(({ topic, section, entry }, index) => (
                <button
                  type="button"
                  className={styles.resultCard}
                  onClick={() => openTopic(topic.slug)}
                  key={`${topic.slug}-${section.title}-${entry.id}-${index}`}
                >
                  <span>{topic.title} · {kindLabels[section.kind]}</span>
                  <div className={styles.entryHeading}>
                    <strong>{entry.term}</strong>
                    <em>{typeLabels[entry.type]}</em>
                  </div>
                  <p className={styles.englishDefinition}>{entry.meaning.en}</p>
                  <p className={!showMeanings ? styles.hiddenMeaning : styles.spanishMeaning}>
                    {showMeanings ? entry.meaning.es : "Significado en español oculto"}
                  </p>
                </button>
              ))}
            </div>

            {searchResults.length > visibleSearchResults.length ? (
              <p className={styles.limitNote}>
                Mostrando las primeras {visibleSearchResults.length} coincidencias. Afina la búsqueda para reducir resultados.
              </p>
            ) : null}
          </section>
        ) : (
          <>
            <header className={styles.topicHeader}>
              <span className="eyebrow">
                {categories.find((category) => category.id === activeTopic.category)?.label}
              </span>
              <h2>{activeTopic.title}</h2>
              <p>{activeTopic.summary}</p>
              <div className={styles.topicMeta}>
                <span>{activeTopic.level}</span>
                <span>{activeTopic.sections.length} bloques</span>
                <span>
                  {activeTopic.sections.reduce((total, section) => total + section.entries.length, 0)} fichas
                </span>
              </div>
            </header>

            <div className={styles.studyHint}>
              <strong>Cómo estudiarlo</strong>
              <p>
                Lee primero la definición en inglés e intenta recuperar la palabra o el significado.
                Después comprueba el español. Las familias, collocations y confusables se guardan como
                relaciones reutilizables para los futuros juegos.
              </p>
            </div>

            <div className={styles.sections}>
              {activeTopic.sections.map((section, sectionIndex) => (
                <details
                  className={`${styles.section} ${section.kind === "contrast" ? styles.contrastSection : ""}`}
                  key={`${activeTopic.slug}-${section.title}`}
                  open={sectionIndex < 2}
                >
                  <summary>
                    <div>
                      <span className={styles.kind}>{kindLabels[section.kind]}</span>
                      <h3>{section.title}</h3>
                    </div>
                    <span className={styles.sectionCount}>{section.entries.length}</span>
                  </summary>

                  <div className={styles.entryGrid}>
                    {section.entries.map((entry, index) => {
                      const visibleRelations = relationGroups(entry).filter(([, values]) => values.length > 0);

                      return (
                        <article className={styles.entry} key={`${entry.id}-${index}`}>
                          <div className={styles.entryHeading}>
                            <strong>{entry.term}</strong>
                            <em>{typeLabels[entry.type]}</em>
                          </div>

                          <div className={styles.definitionBlock}>
                            <span>EN</span>
                            <p>{entry.meaning.en}</p>
                          </div>

                          <div className={styles.definitionBlock}>
                            <span>ES</span>
                            <p className={!showMeanings ? styles.hiddenMeaning : ""}>
                              {showMeanings ? entry.meaning.es : "••••••••"}
                            </p>
                          </div>

                          {entry.members.length > 1 ? (
                            <div className={styles.memberList}>
                              {entry.members.map((member) => (
                                <span key={`${entry.id}-${member.term}`}>
                                  <b>{member.term}</b>
                                  {showMeanings ? ` · ${member.meaning.es}` : ""}
                                </span>
                              ))}
                            </div>
                          ) : null}

                          {visibleRelations.length > 0 ? (
                            <div className={styles.relations}>
                              {visibleRelations.map(([label, values]) => (
                                <div key={`${entry.id}-${label}`}>
                                  <span>{label}</span>
                                  <p>{values.join(" · ")}</p>
                                </div>
                              ))}
                            </div>
                          ) : null}

                          {entry.notes.length > 0 && showMeanings ? (
                            <small>{entry.notes.join(" · ")}</small>
                          ) : null}
                        </article>
                      );
                    })}
                  </div>
                </details>
              ))}
            </div>
          </>
        )}
      </main>
    </div>
  );
}
