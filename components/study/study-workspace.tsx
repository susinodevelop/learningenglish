"use client";

import { useEffect, useMemo, useState } from "react";
import type {
  VocabularyEntryType,
  VocabularyLexeme,
  VocabularySectionKind,
} from "@/lib/vocabulary";
import {
  createStudyGroupId,
  emptyDynamicStudyGroupFilter,
  resolveStudyGroup,
  STUDY_GROUPS_STORAGE_KEY,
  systemStudyGroups,
  VOCABULARY_PROGRESS_STORAGE_KEY,
  type DynamicStudyGroupFilter,
  type StudyGroup,
  type VocabularyPerformanceFilter,
  type VocabularyProgress,
} from "@/lib/study-groups";
import styles from "./study-workspace.module.css";

type TopicOption = {
  slug: string;
  title: string;
};

type StudyWorkspaceProps = {
  lexicon: VocabularyLexeme[];
  topics: TopicOption[];
};

type StudyMode =
  | "flashcards"
  | "definition-to-word"
  | "spanish-to-word"
  | "word-to-spanish"
  | "write-word";

const typeLabels: Record<VocabularyEntryType, string> = {
  word: "Word",
  expression: "Expression",
  collocation: "Collocation",
  "phrasal-verb": "Phrasal verb",
  "word-family": "Word family",
};

const sectionLabels: Record<VocabularySectionKind, string> = {
  core: "Palabras clave",
  chunks: "Chunks & collocations",
  phrasal: "Phrasal verbs",
  "word-family": "Word building",
  contrast: "Diferencias / traps",
};

const performanceLabels: Record<VocabularyPerformanceFilter, string> = {
  all: "Cualquier estado",
  unseen: "Sin practicar",
  mistakes: "Con errores pendientes",
  learning: "En aprendizaje",
  mastered: "Consolidado",
};

const modeMeta: Record<StudyMode, { title: string; description: string }> = {
  flashcards: {
    title: "Flashcards",
    description: "Definición inglesa → revela palabra y significado.",
  },
  "definition-to-word": {
    title: "Definition → word",
    description: "Elige la palabra correcta a partir de su definición en inglés.",
  },
  "spanish-to-word": {
    title: "ES → EN",
    description: "Recupera el término inglés desde el significado en español.",
  },
  "word-to-spanish": {
    title: "EN → ES",
    description: "Comprueba si reconoces el significado español sin pistas.",
  },
  "write-word": {
    title: "Write it",
    description: "Escribe el término exacto desde una definición inglesa.",
  },
};

function normaliseAnswer(value: string) {
  return value
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[’‘]/g, "'")
    .replace(/\s+/g, " ")
    .trim()
    .toLocaleLowerCase();
}

function shuffle<T>(values: T[]) {
  const result = [...values];
  for (let index = result.length - 1; index > 0; index -= 1) {
    const target = Math.floor(Math.random() * (index + 1));
    [result[index], result[target]] = [result[target], result[index]];
  }
  return result;
}

function uniqueOptions(values: string[]) {
  return Array.from(new Set(values.filter(Boolean)));
}

function makeOptions(
  answer: string,
  extractor: (entry: VocabularyLexeme) => string,
  primaryPool: VocabularyLexeme[],
  fallbackPool: VocabularyLexeme[],
) {
  const primary = shuffle(primaryPool.map(extractor)).filter((value) => value !== answer);
  const fallback = shuffle(fallbackPool.map(extractor)).filter((value) => value !== answer);
  const distractors = uniqueOptions([...primary, ...fallback]).slice(0, 3);
  return shuffle(uniqueOptions([answer, ...distractors]));
}

function safeReadGroups(raw: string | null): StudyGroup[] {
  if (!raw) return [];
  try {
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter((candidate): candidate is StudyGroup => {
      if (!candidate || typeof candidate !== "object") return false;
      const group = candidate as Partial<StudyGroup>;
      return typeof group.id === "string" && typeof group.name === "string" &&
        (group.kind === "static" || group.kind === "dynamic");
    });
  } catch {
    return [];
  }
}

function safeReadProgress(raw: string | null): VocabularyProgress {
  if (!raw) return {};
  try {
    const parsed: unknown = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) return {};
    return parsed as VocabularyProgress;
  } catch {
    return {};
  }
}

export function StudyWorkspace({ lexicon, topics }: StudyWorkspaceProps) {
  const [hydrated, setHydrated] = useState(false);
  const [userGroups, setUserGroups] = useState<StudyGroup[]>([]);
  const [progress, setProgress] = useState<VocabularyProgress>({});
  const [activeGroupId, setActiveGroupId] = useState(systemStudyGroups[0].id);

  const [editorOpen, setEditorOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [draftName, setDraftName] = useState("");
  const [draftKind, setDraftKind] = useState<StudyGroup["kind"]>("static");
  const [draftStaticIds, setDraftStaticIds] = useState<string[]>([]);
  const [staticQuery, setStaticQuery] = useState("");
  const [draftFilter, setDraftFilter] = useState<DynamicStudyGroupFilter>({
    ...emptyDynamicStudyGroupFilter,
  });

  const [mode, setMode] = useState<StudyMode>("flashcards");
  const [sessionEntries, setSessionEntries] = useState<VocabularyLexeme[]>([]);
  const [sessionIndex, setSessionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [typedAnswer, setTypedAnswer] = useState("");
  const [answerCorrect, setAnswerCorrect] = useState<boolean | null>(null);
  const [flashcardRevealed, setFlashcardRevealed] = useState(false);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      setUserGroups(safeReadGroups(window.localStorage.getItem(STUDY_GROUPS_STORAGE_KEY)));
      setProgress(safeReadProgress(window.localStorage.getItem(VOCABULARY_PROGRESS_STORAGE_KEY)));
      setHydrated(true);
    });

    return () => window.cancelAnimationFrame(frame);
  }, []);

  const groups = useMemo(() => [...systemStudyGroups, ...userGroups], [userGroups]);

  const resolvedGroups = useMemo(
    () => new Map(
      groups.map((group) => [group.id, resolveStudyGroup(group, lexicon, progress)]),
    ),
    [groups, lexicon, progress],
  );

  const activeGroup = groups.find((group) => group.id === activeGroupId) ?? groups[0];
  const activeEntries = useMemo(
    () => resolvedGroups.get(activeGroup.id) ?? [],
    [activeGroup.id, resolvedGroups],
  );

  const staticCandidates = useMemo(() => {
    const query = normaliseAnswer(staticQuery);
    if (query.length < 2) return [];
    return lexicon
      .filter((entry) =>
        normaliseAnswer([
          entry.term,
          entry.meaning.en,
          entry.meaning.es,
          ...entry.topics,
        ].join(" ")).includes(query),
      )
      .slice(0, 60);
  }, [lexicon, staticQuery]);

  const selectedStaticEntries = useMemo(() => {
    const ids = new Set(draftStaticIds);
    return lexicon.filter((entry) => ids.has(entry.id));
  }, [draftStaticIds, lexicon]);

  const draftDynamicCount = useMemo(() => {
    if (draftKind !== "dynamic") return draftStaticIds.length;
    return resolveStudyGroup(
      { id: "draft", name: draftName || "Borrador", kind: "dynamic", filter: draftFilter },
      lexicon,
      progress,
    ).length;
  }, [draftFilter, draftKind, draftName, draftStaticIds.length, lexicon, progress]);

  const writeEligibleEntries = useMemo(
    () => activeEntries.filter((entry) => entry.members.length === 1 && !/[→↔/]/.test(entry.term)),
    [activeEntries],
  );

  const current = sessionEntries[sessionIndex];

  const question = useMemo(() => {
    if (!current) return null;

    if (mode === "definition-to-word") {
      return {
        label: "Definition → word",
        prompt: current.meaning.en,
        answer: current.term,
        options: makeOptions(current.term, (entry) => entry.term, sessionEntries, lexicon),
      };
    }

    if (mode === "spanish-to-word") {
      return {
        label: "ES → EN",
        prompt: current.meaning.es,
        answer: current.term,
        options: makeOptions(current.term, (entry) => entry.term, sessionEntries, lexicon),
      };
    }

    if (mode === "word-to-spanish") {
      return {
        label: "EN → ES",
        prompt: current.term,
        answer: current.meaning.es,
        options: makeOptions(current.meaning.es, (entry) => entry.meaning.es, sessionEntries, lexicon),
      };
    }

    return null;
  }, [current, lexicon, mode, sessionEntries]);

  function persistGroups(next: StudyGroup[]) {
    setUserGroups(next);
    window.localStorage.setItem(STUDY_GROUPS_STORAGE_KEY, JSON.stringify(next));
    window.dispatchEvent(new Event("learningenglish:study-groups"));
  }

  function persistProgress(next: VocabularyProgress) {
    setProgress(next);
    window.localStorage.setItem(VOCABULARY_PROGRESS_STORAGE_KEY, JSON.stringify(next));
    window.dispatchEvent(new Event("learningenglish:progress"));
  }

  function recordResult(entryId: string, correct: boolean) {
    const previous = progress[entryId] ?? {
      attempts: 0,
      correct: 0,
      incorrect: 0,
      streak: 0,
      lastPractisedAt: "",
    };

    const next: VocabularyProgress = {
      ...progress,
      [entryId]: {
        attempts: previous.attempts + 1,
        correct: previous.correct + (correct ? 1 : 0),
        incorrect: previous.incorrect + (correct ? 0 : 1),
        streak: correct ? previous.streak + 1 : 0,
        lastPractisedAt: new Date().toISOString(),
      },
    };

    persistProgress(next);
  }

  function resetEditor() {
    setEditingId(null);
    setDraftName("");
    setDraftKind("static");
    setDraftStaticIds([]);
    setStaticQuery("");
    setDraftFilter({ ...emptyDynamicStudyGroupFilter });
  }

  function openNewGroup(kind: StudyGroup["kind"]) {
    resetEditor();
    setDraftKind(kind);
    setEditorOpen(true);
  }

  function openEditGroup(group: StudyGroup) {
    if (group.system) return;
    setEditingId(group.id);
    setDraftName(group.name);
    setDraftKind(group.kind);
    setDraftStaticIds(group.kind === "static" ? [...group.lexemeIds] : []);
    setDraftFilter(
      group.kind === "dynamic" ? { ...group.filter } : { ...emptyDynamicStudyGroupFilter },
    );
    setStaticQuery("");
    setEditorOpen(true);
  }

  function toggleStaticEntry(entryId: string) {
    setDraftStaticIds((currentIds) =>
      currentIds.includes(entryId)
        ? currentIds.filter((id) => id !== entryId)
        : [...currentIds, entryId],
    );
  }

  function saveGroup() {
    const name = draftName.trim();
    if (!name) return;
    if (draftKind === "static" && draftStaticIds.length === 0) return;

    const group: StudyGroup = draftKind === "static"
      ? {
          id: editingId ?? createStudyGroupId(),
          name,
          kind: "static",
          lexemeIds: draftStaticIds,
        }
      : {
          id: editingId ?? createStudyGroupId(),
          name,
          kind: "dynamic",
          filter: draftFilter,
        };

    const next = editingId
      ? userGroups.map((candidate) => candidate.id === editingId ? group : candidate)
      : [...userGroups, group];

    persistGroups(next);
    setActiveGroupId(group.id);
    setEditorOpen(false);
    resetEditor();
  }

  function removeGroup(group: StudyGroup) {
    if (group.system) return;
    if (!window.confirm(`¿Eliminar el grupo “${group.name}”?`)) return;
    persistGroups(userGroups.filter((candidate) => candidate.id !== group.id));
    if (activeGroupId === group.id) setActiveGroupId(systemStudyGroups[0].id);
    if (editingId === group.id) {
      setEditorOpen(false);
      resetEditor();
    }
  }

  function resetSessionState() {
    setSessionEntries([]);
    setSessionIndex(0);
    setSelectedAnswer(null);
    setTypedAnswer("");
    setAnswerCorrect(null);
    setFlashcardRevealed(false);
    setScore(0);
    setFinished(false);
  }

  function chooseGroup(groupId: string) {
    setActiveGroupId(groupId);
    resetSessionState();
  }

  function startSession() {
    const candidates = mode === "write-word" ? writeEligibleEntries : activeEntries;
    const size = Math.min(candidates.length, 20);
    if (size === 0) return;

    setSessionEntries(shuffle(candidates).slice(0, size));
    setSessionIndex(0);
    setSelectedAnswer(null);
    setTypedAnswer("");
    setAnswerCorrect(null);
    setFlashcardRevealed(false);
    setScore(0);
    setFinished(false);
  }

  function answerChoice(option: string) {
    if (!current || !question || selectedAnswer !== null) return;
    const correct = option === question.answer;
    setSelectedAnswer(option);
    setAnswerCorrect(correct);
    if (correct) setScore((value) => value + 1);
    recordResult(current.id, correct);
  }

  function checkTypedAnswer() {
    if (!current || answerCorrect !== null || typedAnswer.trim().length === 0) return;
    const correct = normaliseAnswer(typedAnswer) === normaliseAnswer(current.term);
    setAnswerCorrect(correct);
    if (correct) setScore((value) => value + 1);
    recordResult(current.id, correct);
  }

  function rateFlashcard(correct: boolean) {
    if (!current || answerCorrect !== null) return;
    setAnswerCorrect(correct);
    if (correct) setScore((value) => value + 1);
    recordResult(current.id, correct);
  }

  function nextQuestion() {
    if (answerCorrect === null) return;
    if (sessionIndex >= sessionEntries.length - 1) {
      setFinished(true);
      return;
    }

    setSessionIndex((value) => value + 1);
    setSelectedAnswer(null);
    setTypedAnswer("");
    setAnswerCorrect(null);
    setFlashcardRevealed(false);
  }

  if (!hydrated) {
    return (
      <section className={styles.loading} aria-live="polite">
        <span className="eyebrow">Preparando estudio</span>
        <h2>Cargando tus grupos y progreso…</h2>
      </section>
    );
  }

  return (
    <div className={styles.workspace}>
      <aside className={styles.groupsPanel}>
        <div className={styles.panelHeading}>
          <div>
            <span className="eyebrow">1 · Elige qué estudiar</span>
            <h2>Grupos de estudio</h2>
          </div>
          <span className={styles.totalBadge}>{groups.length}</span>
        </div>

        <p className={styles.intro}>
          Los grupos no duplican vocabulario: solo guardan IDs o filtros sobre el léxico canónico.
        </p>

        <div className={styles.groupList}>
          {groups.map((group) => {
            const count = resolvedGroups.get(group.id)?.length ?? 0;
            const active = group.id === activeGroup.id;
            return (
              <div className={`${styles.groupRow} ${active ? styles.activeGroup : ""}`} key={group.id}>
                <button type="button" onClick={() => chooseGroup(group.id)}>
                  <span className={styles.groupType}>{group.kind === "static" ? "Estático" : "Dinámico"}</span>
                  <strong>{group.name}</strong>
                  <small>{count} {count === 1 ? "elemento" : "elementos"}</small>
                </button>
                {!group.system ? (
                  <div className={styles.rowActions}>
                    <button type="button" onClick={() => openEditGroup(group)} aria-label={`Editar ${group.name}`}>Editar</button>
                    <button type="button" onClick={() => removeGroup(group)} aria-label={`Eliminar ${group.name}`}>×</button>
                  </div>
                ) : null}
              </div>
            );
          })}
        </div>

        <div className={styles.newGroupActions}>
          <button className="button button-primary" type="button" onClick={() => openNewGroup("static")}>
            + Grupo estático
          </button>
          <button className="button button-secondary" type="button" onClick={() => openNewGroup("dynamic")}>
            + Grupo dinámico
          </button>
        </div>

        {editorOpen ? (
          <section className={styles.editor} aria-label="Editor de grupo de estudio">
            <div className={styles.editorHeading}>
              <div>
                <span className="eyebrow">{editingId ? "Editar grupo" : "Nuevo grupo"}</span>
                <h3>{draftKind === "static" ? "Lista fija" : "Lista por reglas"}</h3>
              </div>
              <button type="button" onClick={() => { setEditorOpen(false); resetEditor(); }} aria-label="Cerrar editor">×</button>
            </div>

            <label className={styles.field}>
              <span>Nombre</span>
              <input value={draftName} onChange={(event) => setDraftName(event.target.value)} placeholder="Ej. Examen del sábado" />
            </label>

            {!editingId ? (
              <div className={styles.kindSwitch}>
                <button type="button" className={draftKind === "static" ? styles.activeSwitch : ""} onClick={() => setDraftKind("static")}>Estático</button>
                <button type="button" className={draftKind === "dynamic" ? styles.activeSwitch : ""} onClick={() => setDraftKind("dynamic")}>Dinámico</button>
              </div>
            ) : null}

            {draftKind === "static" ? (
              <>
                <p className={styles.editorHelp}>Elige términos concretos. El grupo conservará esos IDs aunque el léxico se reorganice visualmente.</p>
                <label className={styles.field}>
                  <span>Buscar en el léxico</span>
                  <input value={staticQuery} onChange={(event) => setStaticQuery(event.target.value)} placeholder="Escribe al menos 2 letras…" />
                </label>

                {selectedStaticEntries.length > 0 ? (
                  <div className={styles.selectedTerms}>
                    {selectedStaticEntries.slice(0, 24).map((entry) => (
                      <button type="button" key={entry.id} onClick={() => toggleStaticEntry(entry.id)} title="Quitar del grupo">
                        {entry.term} <span>×</span>
                      </button>
                    ))}
                    {selectedStaticEntries.length > 24 ? <small>+{selectedStaticEntries.length - 24} más</small> : null}
                  </div>
                ) : null}

                <div className={styles.candidateList}>
                  {staticCandidates.map((entry) => {
                    const checked = draftStaticIds.includes(entry.id);
                    return (
                      <label key={entry.id} className={checked ? styles.checkedCandidate : ""}>
                        <input type="checkbox" checked={checked} onChange={() => toggleStaticEntry(entry.id)} />
                        <span><strong>{entry.term}</strong><small>{entry.meaning.es} · {typeLabels[entry.type]}</small></span>
                      </label>
                    );
                  })}
                </div>
              </>
            ) : (
              <>
                <p className={styles.editorHelp}>El grupo se recalcula automáticamente cuando cambian el léxico o tu progreso.</p>
                <label className={styles.field}>
                  <span>Texto / concepto</span>
                  <input
                    value={draftFilter.query}
                    onChange={(event) => setDraftFilter((currentFilter) => ({ ...currentFilter, query: event.target.value }))}
                    placeholder="Opcional: travel, work, reliable…"
                  />
                </label>

                <div className={styles.filterGrid}>
                  <label className={styles.field}>
                    <span>Tema</span>
                    <select
                      value={draftFilter.topicSlugs[0] ?? ""}
                      onChange={(event) => setDraftFilter((currentFilter) => ({ ...currentFilter, topicSlugs: event.target.value ? [event.target.value] : [] }))}
                    >
                      <option value="">Todos</option>
                      {topics.map((topic) => <option value={topic.slug} key={topic.slug}>{topic.title}</option>)}
                    </select>
                  </label>

                  <label className={styles.field}>
                    <span>Tipo</span>
                    <select
                      value={draftFilter.entryTypes[0] ?? ""}
                      onChange={(event) => setDraftFilter((currentFilter) => ({ ...currentFilter, entryTypes: event.target.value ? [event.target.value as VocabularyEntryType] : [] }))}
                    >
                      <option value="">Todos</option>
                      {(Object.entries(typeLabels) as [VocabularyEntryType, string][]).map(([value, label]) => <option value={value} key={value}>{label}</option>)}
                    </select>
                  </label>

                  <label className={styles.field}>
                    <span>Bloque</span>
                    <select
                      value={draftFilter.sectionKinds[0] ?? ""}
                      onChange={(event) => setDraftFilter((currentFilter) => ({ ...currentFilter, sectionKinds: event.target.value ? [event.target.value as VocabularySectionKind] : [] }))}
                    >
                      <option value="">Todos</option>
                      {(Object.entries(sectionLabels) as [VocabularySectionKind, string][]).map(([value, label]) => <option value={value} key={value}>{label}</option>)}
                    </select>
                  </label>

                  <label className={styles.field}>
                    <span>Progreso</span>
                    <select
                      value={draftFilter.performance}
                      onChange={(event) => setDraftFilter((currentFilter) => ({ ...currentFilter, performance: event.target.value as VocabularyPerformanceFilter }))}
                    >
                      {(Object.entries(performanceLabels) as [VocabularyPerformanceFilter, string][]).map(([value, label]) => <option value={value} key={value}>{label}</option>)}
                    </select>
                  </label>
                </div>
              </>
            )}

            <div className={styles.editorFooter}>
              <span>{draftDynamicCount} {draftDynamicCount === 1 ? "elemento" : "elementos"}</span>
              <button
                className="button button-primary"
                type="button"
                disabled={!draftName.trim() || draftDynamicCount === 0}
                onClick={saveGroup}
              >
                {editingId ? "Guardar cambios" : "Crear grupo"}
              </button>
            </div>
          </section>
        ) : null}
      </aside>

      <main className={styles.studyPanel}>
        <header className={styles.activeHeader}>
          <div>
            <span className="eyebrow">2 · Elige cómo estudiarlo</span>
            <h2>{activeGroup.name}</h2>
            <p>
              {activeGroup.kind === "static"
                ? "Grupo estático: contiene exactamente los términos que seleccionaste."
                : "Grupo dinámico: se resuelve en tiempo real a partir de sus filtros."}
            </p>
          </div>
          <div className={styles.activeCount}>
            <strong>{activeEntries.length}</strong>
            <span>elementos</span>
          </div>
        </header>

        {activeEntries.length > 0 ? (
          <div className={styles.preview}>
            {activeEntries.slice(0, 12).map((entry) => <span key={entry.id}>{entry.term}</span>)}
            {activeEntries.length > 12 ? <span>+{activeEntries.length - 12}</span> : null}
          </div>
        ) : (
          <div className={styles.emptyState}>
            <strong>Este grupo está vacío ahora mismo.</strong>
            <p>En un grupo dinámico puede ser normal: por ejemplo, “Errores pendientes” se vacía cuando consolidas esas palabras.</p>
          </div>
        )}

        <div className={styles.modeGrid}>
          {(Object.entries(modeMeta) as [StudyMode, { title: string; description: string }][]).map(([value, meta]) => (
            <button
              type="button"
              className={mode === value ? styles.activeMode : ""}
              onClick={() => { setMode(value); resetSessionState(); }}
              key={value}
            >
              <strong>{meta.title}</strong>
              <span>{meta.description}</span>
            </button>
          ))}
        </div>

        <div className={styles.sessionBar}>
          <div>
            <span>Sesiones de hasta 20 elementos</span>
            {mode === "write-word" && writeEligibleEntries.length !== activeEntries.length ? (
              <small>Write it usa {writeEligibleEntries.length} entradas simples compatibles.</small>
            ) : null}
          </div>
          <button
            className="button button-primary"
            type="button"
            onClick={startSession}
            disabled={(mode === "write-word" ? writeEligibleEntries.length : activeEntries.length) === 0}
          >
            {sessionEntries.length > 0 ? "Nueva ronda" : "Empezar sesión"}
          </button>
        </div>

        {sessionEntries.length > 0 && !finished && current ? (
          <section className={styles.gameCard} aria-live="polite">
            <div className={styles.gameTopline}>
              <span>{modeMeta[mode].title} · {sessionIndex + 1}/{sessionEntries.length}</span>
              <strong>{score} aciertos</strong>
            </div>
            <div className={styles.progressTrack}><span style={{ width: `${((sessionIndex + 1) / sessionEntries.length) * 100}%` }} /></div>

            {mode === "flashcards" ? (
              <div className={styles.flashcard}>
                <span>EN definition</span>
                <p>{current.meaning.en}</p>
                {!flashcardRevealed ? (
                  <button className="button button-secondary" type="button" onClick={() => setFlashcardRevealed(true)}>Revelar respuesta</button>
                ) : (
                  <div className={styles.revealedAnswer}>
                    <strong>{current.term}</strong>
                    <span>{current.meaning.es}</span>
                    {answerCorrect === null ? (
                      <div className={styles.ratingButtons}>
                        <button type="button" onClick={() => rateFlashcard(false)}>Repasar</button>
                        <button type="button" onClick={() => rateFlashcard(true)}>Lo sabía</button>
                      </div>
                    ) : null}
                  </div>
                )}
              </div>
            ) : mode === "write-word" ? (
              <div className={styles.writeQuestion}>
                <span>Escribe el término</span>
                <p>{current.meaning.en}</p>
                <div className={styles.writeControls}>
                  <input
                    value={typedAnswer}
                    onChange={(event) => setTypedAnswer(event.target.value)}
                    onKeyDown={(event) => { if (event.key === "Enter") checkTypedAnswer(); }}
                    disabled={answerCorrect !== null}
                    autoComplete="off"
                    spellCheck={false}
                    placeholder="Your answer…"
                  />
                  <button className="button button-primary" type="button" onClick={checkTypedAnswer} disabled={answerCorrect !== null || !typedAnswer.trim()}>Comprobar</button>
                </div>
              </div>
            ) : question ? (
              <div className={styles.multipleChoice}>
                <span>{question.label}</span>
                <p>{question.prompt}</p>
                <div className={styles.answerGrid}>
                  {question.options.map((option) => {
                    const isSelected = selectedAnswer === option;
                    const isCorrectOption = selectedAnswer !== null && option === question.answer;
                    const isWrong = isSelected && option !== question.answer;
                    return (
                      <button
                        type="button"
                        className={`${isCorrectOption ? styles.correct : ""} ${isWrong ? styles.wrong : ""}`}
                        onClick={() => answerChoice(option)}
                        disabled={selectedAnswer !== null}
                        key={option}
                      >
                        {option}
                      </button>
                    );
                  })}
                </div>
              </div>
            ) : null}

            {answerCorrect !== null ? (
              <div className={styles.feedback}>
                <div>
                  <strong>{answerCorrect ? "✓ Correcto" : "✕ A repasar"}</strong>
                  {!answerCorrect ? <span>Respuesta: {mode === "word-to-spanish" ? current.meaning.es : current.term}</span> : null}
                </div>
                <button className="button button-primary" type="button" onClick={nextQuestion}>
                  {sessionIndex === sessionEntries.length - 1 ? "Ver resultado" : "Siguiente"}
                </button>
              </div>
            ) : null}
          </section>
        ) : null}

        {finished ? (
          <section className={styles.resultCard} aria-live="polite">
            <span className="eyebrow">Sesión completada</span>
            <h2>{score}/{sessionEntries.length}</h2>
            <p>
              {score === sessionEntries.length
                ? "Ronda perfecta. Las respuestas correctas alimentan automáticamente tus grupos dinámicos."
                : "Los fallos ya están registrados. Puedes abrir “Errores pendientes” para repasarlos sin crear otra lista."}
            </p>
            <button className="button button-primary" type="button" onClick={startSession}>Otra ronda</button>
          </section>
        ) : null}
      </main>
    </div>
  );
}
