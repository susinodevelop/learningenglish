"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type {
  VocabularyCategory,
  VocabularyLevel,
  VocabularyLexeme,
  VocabularySense,
  VocabularyStudyTopic,
} from "@/lib/vocabulary";
import styles from "./vocabulary-explorer.module.css";

type ExplorerView =
  | "home"
  | "topics"
  | "phrasal"
  | "chunks"
  | "synonyms"
  | "antonyms"
  | "confusables"
  | "word-family"
  | "all";

type LevelFilter = "all" | VocabularyLevel;

type Props = {
  categories: VocabularyCategory[];
  topics: VocabularyStudyTopic[];
  lexemes: VocabularyLexeme[];
  senses: VocabularySense[];
};

const viewCards: Array<{ view: ExplorerView; title: string; description: string }> = [
  { view: "topics", title: "Temas", description: "Explora el vocabulario por áreas y contextos." },
  { view: "phrasal", title: "Phrasal verbs", description: "Verbos con partícula y sus significados." },
  { view: "chunks", title: "Chunks & collocations", description: "Combinaciones que conviene recordar como una unidad." },
  { view: "synonyms", title: "Sinónimos", description: "Palabras relacionadas por significado." },
  { view: "antonyms", title: "Antónimos", description: "Contrastes de significado." },
  { view: "confusables", title: "Confusables", description: "Palabras que Cambridge suele obligarte a distinguir." },
  { view: "word-family", title: "Word families", description: "Derivación y familias léxicas." },
  { view: "all", title: "Todo el léxico", description: "Consulta todas las entradas B2 + C1." },
];

function normalise(value: string) {
  return value
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[’‘]/g, "'")
    .replace(/\s+/g, " ")
    .trim()
    .toLocaleLowerCase();
}

function searchableSenseText(sense: VocabularySense) {
  return [
    sense.term,
    sense.meaning.en,
    sense.meaning.es,
    ...sense.levels,
    ...sense.topics,
    ...sense.sectionTitles,
    ...sense.relations.collocations,
    ...sense.relations.patterns,
    ...sense.relations.synonyms,
    ...sense.relations.antonyms,
    ...sense.relations.confusedWith,
    ...sense.relations.wordFamily,
  ].join(" ");
}

export function VocabularyExplorer({ categories, topics, lexemes, senses }: Props) {
  const [query, setQuery] = useState("");
  const [level, setLevel] = useState<LevelFilter>("all");
  const [view, setView] = useState<ExplorerView>("home");
  const [topicSlug, setTopicSlug] = useState<string>("");

  const sensesByLexeme = useMemo(() => {
    const map = new Map<string, VocabularySense[]>();
    for (const sense of senses) {
      const values = map.get(sense.lexemeId) ?? [];
      values.push(sense);
      map.set(sense.lexemeId, values);
    }
    return map;
  }, [senses]);

  const topicTitle = useMemo(
    () => new Map(topics.map((topic) => [topic.slug, `${topic.title} · ${topic.level}`])),
    [topics],
  );

  const filteredLexemes = useMemo(() => {
    const normalizedQuery = normalise(query);
    const isSearching = normalizedQuery.length >= 2;

    return lexemes.filter((lexeme) => {
      const lexemeSenses = sensesByLexeme.get(lexeme.id) ?? [];
      const levelSenses = level === "all"
        ? lexemeSenses
        : lexemeSenses.filter((sense) => sense.levels.includes(level));
      if (levelSenses.length === 0) return false;

      if (isSearching) {
        return levelSenses.some((sense) => normalise(searchableSenseText(sense)).includes(normalizedQuery));
      }

      if (topicSlug && !levelSenses.some((sense) => sense.topics.includes(topicSlug))) return false;

      switch (view) {
        case "phrasal":
          return levelSenses.some((sense) => sense.type === "phrasal-verb");
        case "chunks":
          return levelSenses.some((sense) => sense.type === "collocation" || sense.sectionKinds.includes("chunks"));
        case "synonyms":
          return levelSenses.some((sense) => sense.relations.synonyms.length > 0);
        case "antonyms":
          return levelSenses.some((sense) => sense.relations.antonyms.length > 0);
        case "confusables":
          return levelSenses.some((sense) => sense.relations.confusedWith.length > 0);
        case "word-family":
          return levelSenses.some((sense) => sense.relations.wordFamily.length > 0 || sense.type === "word-family");
        case "topics":
        case "all":
        case "home":
        default:
          return true;
      }
    });
  }, [level, lexemes, query, sensesByLexeme, topicSlug, view]);

  const isSearching = query.trim().length >= 2;
  const showResults = isSearching || view !== "home" || Boolean(topicSlug);
  const activeTopic = topics.find((topic) => topic.slug === topicSlug);

  function chooseView(next: ExplorerView) {
    setView(next);
    setTopicSlug("");
    setQuery("");
  }

  return (
    <section className={styles.explorer}>
      <div className={styles.searchPanel}>
        <label>
          <span>Buscar en todo el vocabulario</span>
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="gripping, quedarse sin, compelling, travel…"
            aria-label="Buscar vocabulario B2 y C1"
          />
        </label>
        <div className={styles.levelSwitch} aria-label="Filtrar por nivel">
          {(["all", "B2", "C1"] as LevelFilter[]).map((value) => (
            <button
              type="button"
              key={value}
              onClick={() => setLevel(value)}
              className={level === value ? styles.activeLevel : ""}
            >
              {value === "all" ? "B2 + C1" : value}
            </button>
          ))}
        </div>
      </div>

      {!showResults ? (
        <div className={styles.discoveryGrid}>
          {viewCards.map((card) => (
            <button type="button" key={card.view} onClick={() => chooseView(card.view)}>
              <strong>{card.title}</strong>
              <span>{card.description}</span>
            </button>
          ))}
        </div>
      ) : null}

      {view === "topics" && !isSearching ? (
        <div className={styles.topicArea}>
          <div className={styles.breadcrumbs}>
            <button type="button" onClick={() => chooseView("home")}>Vocabulario</button>
            <span>›</span><strong>Temas</strong>
            {activeTopic ? <><span>›</span><strong>{activeTopic.title}</strong></> : null}
          </div>

          {!topicSlug ? categories.map((category) => {
            const categoryTopics = topics.filter((topic) => category.id === topic.category && (level === "all" || topic.level === level));
            if (categoryTopics.length === 0) return null;
            return (
              <section className={styles.topicCategory} key={category.id}>
                <header><h2>{category.label}</h2><p>{category.description}</p></header>
                <div className={styles.topicGrid}>
                  {categoryTopics.map((topic) => (
                    <button type="button" onClick={() => setTopicSlug(topic.slug)} key={topic.slug}>
                      <strong>{topic.title}</strong><span>{topic.level} · {topic.sections.reduce((total, section) => total + section.entries.length, 0)} fichas fuente</span>
                    </button>
                  ))}
                </div>
              </section>
            );
          }) : null}
        </div>
      ) : null}

      {showResults && (view !== "topics" || Boolean(topicSlug) || isSearching) ? (
        <div className={styles.results}>
          <header className={styles.resultsHeader}>
            <div>
              <span className="eyebrow">{isSearching ? "Resultados de búsqueda" : activeTopic?.title ?? viewCards.find((card) => card.view === view)?.title ?? "Vocabulario"}</span>
              <h2>{filteredLexemes.length} términos</h2>
              <p>Las palabras con varios significados aparecen una sola vez y agrupan todas sus acepciones.</p>
            </div>
            <button type="button" className="button button-secondary" onClick={() => chooseView("home")}>Volver al inicio</button>
          </header>

          <div className={styles.lexemeGrid}>
            {filteredLexemes.slice(0, 240).map((lexeme) => {
              const lexemeSenses = (sensesByLexeme.get(lexeme.id) ?? []).filter((sense) => level === "all" || sense.levels.includes(level));
              const first = lexemeSenses[0];
              if (!first) return null;
              return (
                <Link href={`/vocabulary/${lexeme.id}`} className={styles.lexemeCard} key={lexeme.id}>
                  <div className={styles.lexemeHeading}>
                    <strong>{lexeme.term}</strong>
                    <span>{lexeme.levels.join(" · ")}</span>
                  </div>
                  <p>{first.meaning.en}</p>
                  <small>{first.meaning.es}</small>
                  <footer>
                    <span>{lexemeSenses.length} {lexemeSenses.length === 1 ? "acepción" : "acepciones"}</span>
                    <span>{first.topics.slice(0, 2).map((topic) => topicTitle.get(topic) ?? topic).join(" · ")}</span>
                  </footer>
                </Link>
              );
            })}
          </div>
          {filteredLexemes.length > 240 ? <p className={styles.limitNote}>Mostrando 240 términos. Usa búsqueda o filtros para afinar.</p> : null}
        </div>
      ) : null}
    </section>
  );
}
