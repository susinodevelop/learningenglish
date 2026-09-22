"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { irregularVerbFormsByTerm } from "@/lib/vocabulary/data/irregular-verbs";
import { phrasalVerbDataByTerm } from "@/lib/vocabulary/data/phrasal-verbs";
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
  | "idioms"
  | "irregular-verbs"
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
  { view: "phrasal", title: "Phrasal verbs", description: "Todos los phrasal verbs de los libros y de tu lista personal." },
  { view: "chunks", title: "Chunks & collocations", description: "Combinaciones que conviene recordar como una unidad." },
  { view: "idioms", title: "Idioms", description: "Expresiones figuradas y frases hechas para sonar más natural." },
  { view: "irregular-verbs", title: "Irregular verbs", description: "Base form, past simple, past participle, significado y patrón." },
  { view: "synonyms", title: "Sinónimos", description: "Palabras relacionadas por significado." },
  { view: "antonyms", title: "Antónimos", description: "Contrastes de significado." },
  { view: "confusables", title: "Confusables", description: "Palabras que Cambridge suele obligarte a distinguir." },
  { view: "word-family", title: "Word families", description: "Derivación y familias léxicas." },
  { view: "all", title: "Todo el léxico", description: "Consulta todas las entradas B1, B2 y C1." },
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
  const verbForms = sense.topics.includes("irregular-verbs")
    ? irregularVerbFormsByTerm[sense.term]
    : undefined;
  const phrasalData = sense.topics.includes("phrasal-verbs")
    ? phrasalVerbDataByTerm[sense.term]
    : undefined;
  return [
    sense.term,
    sense.meaning.en,
    sense.meaning.es,
    ...sense.levels,
    ...sense.topics,
    ...sense.sectionTitles,
    ...sense.notes,
    verbForms?.pastSimple ?? "",
    verbForms?.pastParticiple ?? "",
    verbForms?.rule ?? "",
    phrasalData?.example ?? "",
    phrasalData?.type ?? "",
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

  const normalizedQuery = normalise(query);
  const isSearching = normalizedQuery.length >= 2;

  const filteredLexemes = useMemo(() => {
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
        case "idioms":
          return levelSenses.some((sense) => sense.topics.includes("c1-idioms"));
        case "irregular-verbs":
          return levelSenses.some((sense) => sense.topics.includes("irregular-verbs"));
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
  }, [isSearching, level, lexemes, normalizedQuery, sensesByLexeme, topicSlug, view]);

  const showResults = isSearching || view !== "home" || Boolean(topicSlug);
  const activeTopic = topics.find((topic) => topic.slug === topicSlug);
  const showingIrregularVerbs = view === "irregular-verbs" || topicSlug === "irregular-verbs";
  const showingPhrasalVerbs = view === "phrasal";
  const showingPersonalPhrasalTopic = topicSlug === "phrasal-verbs";

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
            placeholder="gripping, began, break down, compelling, travel…"
            aria-label="Buscar vocabulario B1, B2 y C1"
          />
        </label>
        <div className={styles.levelSwitch} aria-label="Filtrar por nivel">
          {(["all", "B1", "B2", "C1"] as LevelFilter[]).map((value) => (
            <button
              type="button"
              key={value}
              onClick={() => setLevel(value)}
              className={level === value ? styles.activeLevel : ""}
            >
              {value === "all" ? "Todos" : value}
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
              <p>{showingIrregularVerbs && !isSearching
                ? "Base form = forma de diccionario · Past simple = pasado terminado · Past participle = forma usada con have y en la voz pasiva."
                : showingPhrasalVerbs && !isSearching
                  ? "Todos los phrasal verbs de los libros y de tu lista personal. Las entradas personales añaden Type y el ejemplo original del documento."
                  : showingPersonalPhrasalTopic && !isSearching
                    ? "Lista personal: significado EN/ES, ejemplo original y etiqueta Type conservada del documento fuente."
                    : "Las palabras con varios significados aparecen una sola vez y agrupan todas sus acepciones."}</p>
            </div>
            <button type="button" className="button button-secondary" onClick={() => chooseView("home")}>Volver al inicio</button>
          </header>

          <div className={styles.lexemeGrid}>
            {filteredLexemes.slice(0, 240).map((lexeme) => {
              const lexemeSenses = (sensesByLexeme.get(lexeme.id) ?? []).filter((sense) => level === "all" || sense.levels.includes(level));
              const matchingSense = isSearching
                ? lexemeSenses.find((sense) => normalise(searchableSenseText(sense)).includes(normalizedQuery))
                : undefined;
              const irregularSense = lexemeSenses.find((sense) => sense.topics.includes("irregular-verbs"));
              const phrasalSense = showingPersonalPhrasalTopic
                ? lexemeSenses.find((sense) => sense.topics.includes("phrasal-verbs"))
                : lexemeSenses.find((sense) => sense.type === "phrasal-verb");
              const first = matchingSense
                ?? (showingIrregularVerbs ? irregularSense ?? lexemeSenses[0]
                  : showingPhrasalVerbs || showingPersonalPhrasalTopic ? phrasalSense ?? lexemeSenses[0]
                    : lexemeSenses[0]);
              if (!first) return null;
              const verbForms = irregularVerbFormsByTerm[first.term];
              const phrasalData = first.topics.includes("phrasal-verbs")
                ? phrasalVerbDataByTerm[first.term]
                : undefined;
              return (
                <Link href={`/vocabulary/${lexeme.id}`} className={styles.lexemeCard} key={lexeme.id}>
                  <div className={styles.lexemeHeading}>
                    <strong>{lexeme.term}</strong>
                    <span>{lexeme.levels.join(" · ")}</span>
                  </div>
                  {verbForms && first.topics.includes("irregular-verbs") ? (
                    <div className={styles.verbForms}>
                      <span><b>Base</b>{verbForms.base}</span>
                      <span><b>Past</b>{verbForms.pastSimple}</span>
                      <span><b>Participle</b>{verbForms.pastParticiple}</span>
                    </div>
                  ) : null}
                  <p>{first.meaning.en}</p>
                  <small>{first.meaning.es}</small>
                  {phrasalData ? <small><strong>Type:</strong> {phrasalData.type}</small> : null}
                  {phrasalData ? <small><strong>Example:</strong> {phrasalData.example}</small> : null}
                  {verbForms && first.topics.includes("irregular-verbs") ? <small><strong>Patrón:</strong> {verbForms.rule}</small> : null}
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
