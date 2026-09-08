"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import type {
  VocabularyEntryType,
  VocabularyLevel,
  VocabularySectionKind,
  VocabularySense,
} from "@/lib/vocabulary";
import {
  generateVocabularyMultipleChoiceQuestion,
  normaliseVocabularyAnswer,
  type VocabularyDifficulty,
  type VocabularyMultipleChoiceDirection,
} from "@/lib/vocabulary/game-engine";
import {
  createStudyGroupId,
  emptyDynamicStudyGroupFilter,
  migrateStaticGroupIds,
  migrateVocabularyProgress,
  progressForSense,
  resolveStudyGroup,
  STUDY_GROUPS_STORAGE_KEY,
  systemStudyGroups,
  VOCABULARY_PROGRESS_STORAGE_KEY,
  type DynamicStudyGroupFilter,
  type StudyGroup,
  type VocabularyPerformanceFilter,
  type VocabularyProgress,
} from "@/lib/study-groups";
import {
  initialiseRemoteStudyState,
  queuePendingAttempt,
  queuePendingGroups,
  saveRemoteStudyGroups,
  saveRemoteVocabularyAttempt,
} from "@/lib/study-sync-client";
import type { StudyAttemptInput } from "@/lib/study-db";
import styles from "./study-workspace.module.css";

type TopicOption = {
  slug: string;
  title: string;
};

type StudyWorkspaceProps = {
  lexicon: VocabularySense[];
  topics: TopicOption[];
};

type StudyMode = "flashcards" | VocabularyMultipleChoiceDirection | "write-word";
type CloudState = "checking" | "local" | "syncing" | "synced" | "error";

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
    description: "Elige el significado español de la acepción correcta.",
  },
  "word-to-definition": {
    title: "Word → definition",
    description: "Elige la definición inglesa correcta para la acepción indicada.",
  },
  "write-word": {
    title: "Write it",
    description: "Escribe el término exacto desde una definición inglesa.",
  },
};

const multipleChoiceModes = new Set<StudyMode>([
  "definition-to-word",
  "spanish-to-word",
  "word-to-spanish",
  "word-to-definition",
]);

function shuffle<T>(values: T[]) {
  const result = [...values];
  for (let index = result.length - 1; index > 0; index -= 1) {
    const target = Math.floor(Math.random() * (index + 1));
    [result[index], result[target]] = [result[target], result[index]];
  }
  return result;
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

function writeLocalStudyState(groups: StudyGroup[], progress: VocabularyProgress) {
  window.localStorage.setItem(STUDY_GROUPS_STORAGE_KEY, JSON.stringify(groups));
  window.localStorage.setItem(VOCABULARY_PROGRESS_STORAGE_KEY, JSON.stringify(progress));
  window.dispatchEvent(new Event("learningenglish:study-groups"));
  window.dispatchEvent(new Event("learningenglish:progress"));
}

export function StudyWorkspace({ lexicon, topics }: StudyWorkspaceProps) {
  const [hydrated, setHydrated] = useState(false);
  const [userGroups, setUserGroups] = useState<StudyGroup[]>([]);
  const [progress, setProgress] = useState<VocabularyProgress>({});
  const [activeGroupId, setActiveGroupId] = useState(systemStudyGroups[0].id);
  const [cloudState, setCloudState] = useState<CloudState>("checking");
  const [cloudEmail, setCloudEmail] = useState<string | null>(null);
  const [remoteEnabled, setRemoteEnabled] = useState(false);

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
  const [difficulty, setDifficulty] = useState<VocabularyDifficulty>("medium");
  const [questionCount, setQuestionCount] = useState(20);
  const [sessionEntries, setSessionEntries] = useState<VocabularySense[]>([]);
  const [sessionIndex, setSessionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [typedAnswer, setTypedAnswer] = useState("");
  const [answerCorrect, setAnswerCorrect] = useState<boolean | null>(null);
  const [flashcardRevealed, setFlashcardRevealed] = useState(false);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function boot() {
      const storedGroups = safeReadGroups(window.localStorage.getItem(STUDY_GROUPS_STORAGE_KEY));
      const migratedGroups = storedGroups.map((group) => migrateStaticGroupIds(group, lexicon));
      const storedProgress = safeReadProgress(window.localStorage.getItem(VOCABULARY_PROGRESS_STORAGE_KEY));
      const migratedProgress = migrateVocabularyProgress(storedProgress, lexicon);

      if (cancelled) return;
      setUserGroups(migratedGroups);
      setProgress(migratedProgress);
      writeLocalStudyState(migratedGroups, migratedProgress);

      try {
        const remote = await initialiseRemoteStudyState(migratedGroups, migratedProgress);
        if (cancelled) return;

        if (!remote.authenticated) {
          setRemoteEnabled(false);
          setCloudState("local");
        } else {
          setRemoteEnabled(true);
          setCloudEmail(remote.userEmail ?? null);
          setUserGroups(remote.groups);
          setProgress(remote.progress);
          writeLocalStudyState(remote.groups, remote.progress);
          setCloudState("synced");
        }
      } catch (error) {
        console.error("Could not initialize cloud study state", error);
        if (!cancelled) setCloudState("error");
      } finally {
        if (!cancelled) setHydrated(true);
      }
    }

    void boot();
    return () => { cancelled = true; };
  }, [lexicon]);

  const groups = useMemo(() => [...systemStudyGroups, ...userGroups], [userGroups]);
  const resolvedGroups = useMemo(
    () => new Map(groups.map((group) => [group.id, resolveStudyGroup(group, lexicon, progress)])),
    [groups, lexicon, progress],
  );
  const activeGroup = groups.find((group) => group.id === activeGroupId) ?? groups[0];
  const activeEntries = useMemo(
    () => resolvedGroups.get(activeGroup.id) ?? [],
    [activeGroup.id, resolvedGroups],
  );

  const staticCandidates = useMemo(() => {
    const query = normaliseVocabularyAnswer(staticQuery);
    if (query.length < 2) return [];
    return lexicon
      .filter((entry) =>
        normaliseVocabularyAnswer([
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
    return lexicon.filter((entry) => ids.has(entry.senseId));
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
    if (!current || !multipleChoiceModes.has(mode)) return null;
    return generateVocabularyMultipleChoiceQuestion({
      current,
      lexicon,
      direction: mode as VocabularyMultipleChoiceDirection,
      difficulty,
      seed: `${current.senseId}|${sessionIndex}|${difficulty}`,
    });
  }, [current, difficulty, lexicon, mode, sessionIndex]);

  function persistGroups(next: StudyGroup[]) {
    setUserGroups(next);
    window.localStorage.setItem(STUDY_GROUPS_STORAGE_KEY, JSON.stringify(next));
    window.dispatchEvent(new Event("learningenglish:study-groups"));

    if (!remoteEnabled) return;
    setCloudState("syncing");
    void saveRemoteStudyGroups(next)
      .then((saved) => {
        if (!saved) {
          queuePendingGroups(next);
          setRemoteEnabled(false);
          setCloudState("local");
          return;
        }
        setCloudState("synced");
      })
      .catch((error) => {
        console.error("Could not save study groups remotely", error);
        queuePendingGroups(next);
        setCloudState("error");
      });
  }

  function persistProgress(next: VocabularyProgress) {
    setProgress(next);
    window.localStorage.setItem(VOCABULARY_PROGRESS_STORAGE_KEY, JSON.stringify(next));
    window.dispatchEvent(new Event("learningenglish:progress"));
  }

  function sendAttempt(attempt: StudyAttemptInput) {
    if (!remoteEnabled) return;
    setCloudState("syncing");
    void saveRemoteVocabularyAttempt(attempt)
      .then((saved) => {
        if (!saved) {
          queuePendingAttempt(attempt);
          setRemoteEnabled(false);
          setCloudState("local");
          return;
        }
        setCloudState("synced");
      })
      .catch((error) => {
        console.error("Could not save vocabulary attempt remotely", error);
        queuePendingAttempt(attempt);
        setCloudState("error");
      });
  }

  function recordResult(entry: VocabularySense, correct: boolean, selectedAnswer?: string | null) {
    const previous = progressForSense(progress, entry) ?? {
      attempts: 0,
      correct: 0,
      incorrect: 0,
      streak: 0,
      lastPractisedAt: "",
    };

    const next: VocabularyProgress = {
      ...progress,
      [entry.senseId]: {
        attempts: previous.attempts + 1,
        correct: previous.correct + (correct ? 1 : 0),
        incorrect: previous.incorrect + (correct ? 0 : 1),
        streak: correct ? previous.streak + 1 : 0,
        lastPractisedAt: new Date().toISOString(),
      },
    };

    persistProgress(next);
    sendAttempt({
      senseId: entry.senseId,
      gameType: mode === "flashcards" ? "flashcards" : mode === "write-word" ? "write-word" : "multiple-choice",
      direction: mode,
      difficulty: multipleChoiceModes.has(mode) ? difficulty : null,
      correct,
      selectedAnswer: selectedAnswer ?? null,
    });
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
    setDraftFilter(group.kind === "dynamic" ? { ...group.filter } : { ...emptyDynamicStudyGroupFilter });
    setStaticQuery("");
    setEditorOpen(true);
  }

  function toggleStaticEntry(senseId: string) {
    setDraftStaticIds((currentIds) =>
      currentIds.includes(senseId)
        ? currentIds.filter((id) => id !== senseId)
        : [...currentIds, senseId],
    );
  }

  function saveGroup() {
    const name = draftName.trim();
    if (!name) return;
    if (draftKind === "static" && draftStaticIds.length === 0) return;

    const group: StudyGroup = draftKind === "static"
      ? { id: editingId ?? createStudyGroupId(), name, kind: "static", lexemeIds: draftStaticIds }
      : { id: editingId ?? createStudyGroupId(), name, kind: "dynamic", filter: draftFilter };

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
    const size = Math.min(candidates.length, questionCount);
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
    recordResult(current, correct, option);
  }

  function checkTypedAnswer() {
    if (!current || answerCorrect !== null || typedAnswer.trim().length === 0) return;
    const correct = normaliseVocabularyAnswer(typedAnswer) === normaliseVocabularyAnswer(current.term);
    setAnswerCorrect(correct);
    if (correct) setScore((value) => value + 1);
    recordResult(current, correct, typedAnswer);
  }

  function rateFlashcard(correct: boolean) {
    if (!current || answerCorrect !== null) return;
    setAnswerCorrect(correct);
    if (correct) setScore((value) => value + 1);
    recordResult(current, correct, correct ? "Lo sabía" : "Repasar");
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
          Los grupos no duplican vocabulario: guardan IDs estables de sentidos o filtros sobre el léxico canónico.
        </p>

        <div className={`${styles.syncStatus} ${cloudState === "error" ? styles.syncError : ""}`}>
          {cloudState === "synced" ? <><strong>☁ Sincronizado</strong><span>{cloudEmail ?? "Supabase"}</span></> : null}
          {cloudState === "syncing" ? <><strong>☁ Sincronizando…</strong><span>{cloudEmail ?? "Supabase"}</span></> : null}
          {cloudState === "error" ? <><strong>Sincronización pendiente</strong><span>Seguimos guardando localmente y reintentaremos.</span></> : null}
          {cloudState === "local" ? <><strong>Solo este dispositivo</strong><Link href="/login?next=/games%23vocabulary">Inicia sesión para sincronizar →</Link></> : null}
          {cloudState === "checking" ? <><strong>Comprobando cuenta…</strong><span>Preparando sincronización.</span></> : null}
        </div>

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
          <button className="button button-primary" type="button" onClick={() => openNewGroup("static")}>+ Grupo estático</button>
          <button className="button button-secondary" type="button" onClick={() => openNewGroup("dynamic")}>+ Grupo dinámico</button>
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
                <p className={styles.editorHelp}>Elige acepciones concretas. Los nuevos grupos guardan senseIds estables.</p>
                <label className={styles.field}>
                  <span>Buscar en el léxico</span>
                  <input value={staticQuery} onChange={(event) => setStaticQuery(event.target.value)} placeholder="Escribe al menos 2 letras…" />
                </label>

                {selectedStaticEntries.length > 0 ? (
                  <div className={styles.selectedTerms}>
                    {selectedStaticEntries.slice(0, 24).map((entry) => (
                      <button type="button" key={entry.senseId} onClick={() => toggleStaticEntry(entry.senseId)} title="Quitar del grupo">
                        {entry.term} <span>×</span>
                      </button>
                    ))}
                    {selectedStaticEntries.length > 24 ? <small>+{selectedStaticEntries.length - 24} más</small> : null}
                  </div>
                ) : null}

                <div className={styles.candidateList}>
                  {staticCandidates.map((entry) => {
                    const checked = draftStaticIds.includes(entry.senseId);
                    return (
                      <label key={entry.senseId} className={checked ? styles.checkedCandidate : ""}>
                        <input type="checkbox" checked={checked} onChange={() => toggleStaticEntry(entry.senseId)} />
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
                  <input value={draftFilter.query} onChange={(event) => setDraftFilter((value) => ({ ...value, query: event.target.value }))} placeholder="Opcional: travel, work, reliable…" />
                </label>
                <div className={styles.filterGrid}>
                  <label className={styles.field}>
                    <span>Nivel</span>
                    <select
                      value={draftFilter.levels?.[0] ?? ""}
                      onChange={(event) => setDraftFilter((value) => ({
                        ...value,
                        levels: event.target.value ? [event.target.value as VocabularyLevel] : [],
                      }))}
                    >
                      <option value="">B2 + C1</option>
                      <option value="B2">Solo B2</option>
                      <option value="C1">Solo C1</option>
                    </select>
                  </label>
                  <label className={styles.field}>
                    <span>Tema</span>
                    <select value={draftFilter.topicSlugs[0] ?? ""} onChange={(event) => setDraftFilter((value) => ({ ...value, topicSlugs: event.target.value ? [event.target.value] : [] }))}>
                      <option value="">Todos</option>
                      {topics.map((topic) => <option value={topic.slug} key={topic.slug}>{topic.title}</option>)}
                    </select>
                  </label>
                  <label className={styles.field}>
                    <span>Tipo</span>
                    <select value={draftFilter.entryTypes[0] ?? ""} onChange={(event) => setDraftFilter((value) => ({ ...value, entryTypes: event.target.value ? [event.target.value as VocabularyEntryType] : [] }))}>
                      <option value="">Todos</option>
                      {(Object.entries(typeLabels) as [VocabularyEntryType, string][]).map(([value, label]) => <option value={value} key={value}>{label}</option>)}
                    </select>
                  </label>
                  <label className={styles.field}>
                    <span>Bloque</span>
                    <select value={draftFilter.sectionKinds[0] ?? ""} onChange={(event) => setDraftFilter((value) => ({ ...value, sectionKinds: event.target.value ? [event.target.value as VocabularySectionKind] : [] }))}>
                      <option value="">Todos</option>
                      {(Object.entries(sectionLabels) as [VocabularySectionKind, string][]).map(([value, label]) => <option value={value} key={value}>{label}</option>)}
                    </select>
                  </label>
                  <label className={styles.field}>
                    <span>Progreso</span>
                    <select value={draftFilter.performance} onChange={(event) => setDraftFilter((value) => ({ ...value, performance: event.target.value as VocabularyPerformanceFilter }))}>
                      {(Object.entries(performanceLabels) as [VocabularyPerformanceFilter, string][]).map(([value, label]) => <option value={value} key={value}>{label}</option>)}
                    </select>
                  </label>
                </div>
              </>
            )}

            <div className={styles.editorFooter}>
              <span>{draftDynamicCount} {draftDynamicCount === 1 ? "elemento" : "elementos"}</span>
              <button className="button button-primary" type="button" disabled={!draftName.trim() || draftDynamicCount === 0} onClick={saveGroup}>
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
            <p>{activeGroup.kind === "static" ? "Grupo estático: contiene exactamente las acepciones seleccionadas." : "Grupo dinámico: se resuelve en tiempo real a partir de sus filtros."}</p>
          </div>
          <div className={styles.activeCount}><strong>{activeEntries.length}</strong><span>acepciones</span></div>
        </header>

        {activeEntries.length > 0 ? (
          <div className={styles.preview}>
            {activeEntries.slice(0, 12).map((entry) => <span key={entry.senseId}>{entry.term}</span>)}
            {activeEntries.length > 12 ? <span>+{activeEntries.length - 12}</span> : null}
          </div>
        ) : (
          <div className={styles.emptyState}><strong>Este grupo está vacío ahora mismo.</strong><p>En un grupo dinámico puede ser normal: “Errores pendientes” se vacía al consolidar esas palabras.</p></div>
        )}

        <div className={styles.modeGrid}>
          {(Object.entries(modeMeta) as [StudyMode, { title: string; description: string }][]).map(([value, meta]) => (
            <button type="button" className={mode === value ? styles.activeMode : ""} onClick={() => { setMode(value); resetSessionState(); }} key={value}>
              <strong>{meta.title}</strong><span>{meta.description}</span>
            </button>
          ))}
        </div>

        <div className={styles.filterGrid}>
          <label className={styles.field}>
            <span>Dificultad</span>
            <select value={difficulty} disabled={!multipleChoiceModes.has(mode)} onChange={(event) => { setDifficulty(event.target.value as VocabularyDifficulty); resetSessionState(); }}>
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </label>
          <label className={styles.field}>
            <span>Preguntas</span>
            <select value={questionCount} onChange={(event) => { setQuestionCount(Number(event.target.value)); resetSessionState(); }}>
              {[5, 10, 15, 20].map((value) => <option value={value} key={value}>{value}</option>)}
            </select>
          </label>
        </div>

        <div className={styles.sessionBar}>
          <div>
            <span>Sesiones de hasta {questionCount} elementos</span>
            {mode === "write-word" && writeEligibleEntries.length !== activeEntries.length ? <small>Write it usa {writeEligibleEntries.length} entradas simples compatibles.</small> : null}
          </div>
          <button className="button button-primary" type="button" onClick={startSession} disabled={(mode === "write-word" ? writeEligibleEntries.length : activeEntries.length) === 0}>
            {sessionEntries.length > 0 ? "Nueva ronda" : "Empezar sesión"}
          </button>
        </div>

        {sessionEntries.length > 0 && !finished && current ? (
          <section className={styles.gameCard} aria-live="polite">
            <div className={styles.gameTopline}><span>{modeMeta[mode].title} · {sessionIndex + 1}/{sessionEntries.length}</span><strong>{score} aciertos</strong></div>
            <div className={styles.progressTrack}><span style={{ width: `${((sessionIndex + 1) / sessionEntries.length) * 100}%` }} /></div>

            {mode === "flashcards" ? (
              <div className={styles.flashcard}>
                <span>EN definition</span><p>{current.meaning.en}</p>
                {!flashcardRevealed ? <button className="button button-secondary" type="button" onClick={() => setFlashcardRevealed(true)}>Revelar respuesta</button> : (
                  <div className={styles.revealedAnswer}>
                    <strong>{current.term}</strong><span>{current.meaning.es}</span>
                    {answerCorrect === null ? <div className={styles.ratingButtons}><button type="button" onClick={() => rateFlashcard(false)}>Repasar</button><button type="button" onClick={() => rateFlashcard(true)}>Lo sabía</button></div> : null}
                  </div>
                )}
              </div>
            ) : mode === "write-word" ? (
              <div className={styles.writeQuestion}>
                <span>Escribe el término</span><p>{current.meaning.en}</p>
                <div className={styles.writeControls}>
                  <input value={typedAnswer} onChange={(event) => setTypedAnswer(event.target.value)} onKeyDown={(event) => { if (event.key === "Enter") checkTypedAnswer(); }} disabled={answerCorrect !== null} autoComplete="off" spellCheck={false} placeholder="Your answer…" />
                  <button className="button button-primary" type="button" onClick={checkTypedAnswer} disabled={answerCorrect !== null || !typedAnswer.trim()}>Comprobar</button>
                </div>
              </div>
            ) : question ? (
              <div className={styles.multipleChoice}>
                <span>{question.label} · {difficulty}</span>
                <p>{question.prompt}</p>
                {question.context ? <small>Contexto: {question.context}</small> : null}
                <div className={styles.answerGrid}>
                  {question.options.map((option) => {
                    const isSelected = selectedAnswer === option;
                    const isCorrectOption = selectedAnswer !== null && option === question.answer;
                    const isWrong = isSelected && option !== question.answer;
                    return <button type="button" className={`${isCorrectOption ? styles.correct : ""} ${isWrong ? styles.wrong : ""}`} onClick={() => answerChoice(option)} disabled={selectedAnswer !== null} key={option}>{option}</button>;
                  })}
                </div>
              </div>
            ) : <div className={styles.emptyState}><strong>No se pudo generar una pregunta inequívoca.</strong><p>Prueba con otro grupo o una dificultad inferior.</p></div>}

            {answerCorrect !== null ? (
              <div className={styles.feedback}>
                <div>
                  <strong>{answerCorrect ? "✓ Correcto" : "✕ A repasar"}</strong>
                  {!answerCorrect && question ? <span>Respuesta: {question.answer}</span> : null}
                  <span>EN: {current.meaning.en}</span>
                  <span>ES: {current.meaning.es}</span>
                  {current.examples[0] ? <span>Ejemplo: {current.examples[0].en} · {current.examples[0].es}</span> : null}
                  {current.relations.confusedWith.length > 0 ? <span>Confusables: {current.relations.confusedWith.join(" · ")}</span> : null}
                </div>
                <button className="button button-primary" type="button" onClick={nextQuestion}>{sessionIndex === sessionEntries.length - 1 ? "Ver resultado" : "Siguiente"}</button>
              </div>
            ) : null}
          </section>
        ) : null}

        {finished ? (
          <section className={styles.resultCard} aria-live="polite">
            <span className="eyebrow">Sesión completada</span><h2>{score}/{sessionEntries.length}</h2>
            <p>{score === sessionEntries.length ? "Ronda perfecta. Tus respuestas alimentan el progreso del grupo." : "Los fallos quedan registrados y aparecen en “Errores pendientes”."}</p>
            <button className="button button-primary" type="button" onClick={startSession}>Otra ronda</button>
          </section>
        ) : null}
      </main>
    </div>
  );
}
