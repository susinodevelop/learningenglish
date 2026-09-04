"use client";

import { useMemo, useState } from "react";
import type { VocabularyCategory, VocabularySectionKind, VocabularyTopic } from "@/lib/vocabulary";
import styles from "./vocabulary-browser.module.css";

type VocabularyBrowserProps = {
  categories: VocabularyCategory[];
  topics: VocabularyTopic[];
  entryCount: number;
};

const kindLabels: Record<VocabularySectionKind, string> = {
  core: "Palabras clave",
  chunks: "Chunks & collocations",
  phrasal: "Phrasal verbs",
  "word-family": "Word building",
  contrast: "Diferencias / traps",
};

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
          .filter(([term, meaning, note]) =>
            [term, meaning, note ?? "", topic.title, section.title]
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
              placeholder="word, significado, phrasal…"
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
            <span>Concept-first</span>
            <span>Libro completo · vocabulario clave</span>
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
              <p>Busca tanto por la palabra inglesa como por su significado, tema o tipo de vocabulario.</p>
            </header>

            <div className={styles.resultGrid}>
              {visibleSearchResults.map(({ topic, section, entry }, index) => {
                const [term, meaning, note] = entry;
                return (
                  <button
                    type="button"
                    className={styles.resultCard}
                    onClick={() => openTopic(topic.slug)}
                    key={`${topic.slug}-${section.title}-${term}-${index}`}
                  >
                    <span>{topic.title} · {kindLabels[section.kind]}</span>
                    <strong>{term}</strong>
                    <p className={!showMeanings ? styles.hiddenMeaning : ""}>
                      {showMeanings ? meaning : "Significado oculto"}
                    </p>
                    {note && showMeanings ? <small>{note}</small> : null}
                  </button>
                );
              })}
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
                Aprende primero los chunks y contrastes como una sola pieza. Usa “Ocultar español” para hacer
                recuperación activa en vez de releer.
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
                    {section.entries.map(([term, meaning, note], index) => (
                      <article className={styles.entry} key={`${term}-${index}`}>
                        <strong>{term}</strong>
                        <p className={!showMeanings ? styles.hiddenMeaning : ""}>
                          {showMeanings ? meaning : "••••••••"}
                        </p>
                        {note && showMeanings ? <small>{note}</small> : null}
                      </article>
                    ))}
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
