"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { GrammarLevel } from "@/lib/grammar";
import type {
  GrammarExerciseConcept,
  GrammarExerciseKind,
  GrammarExerciseQuestion,
} from "@/lib/grammar/exercises";
import advancedStyles from "./grammar-exercise-workspace.module.css";
import styles from "./exercises.module.css";

type GrammarExerciseWorkspaceProps = {
  questions: GrammarExerciseQuestion[];
  concepts: GrammarExerciseConcept[];
};

type LevelFilter = "all" | GrammarLevel;
type KindFilter = "all" | GrammarExerciseKind;

const kindLabels: Record<GrammarExerciseKind, string> = {
  "multiple-choice": "Elección múltiple",
  gap: "Completar hueco",
  "error-correction": "Corregir error",
  transformation: "Transformación",
};

function shuffle<T>(values: T[]) {
  const result = [...values];
  for (let index = result.length - 1; index > 0; index -= 1) {
    const target = Math.floor(Math.random() * (index + 1));
    [result[index], result[target]] = [result[target], result[index]];
  }
  return result;
}

function normaliseAnswer(value: string) {
  return value
    .toLocaleLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[’‘]/g, "'")
    .replace(/[.,!?;:]+$/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function typedAnswerIsCorrect(question: GrammarExerciseQuestion, answer: string) {
  const submitted = normaliseAnswer(answer);
  return (question.acceptedAnswers ?? []).some((candidate) => normaliseAnswer(candidate) === submitted);
}

export function GrammarExerciseWorkspace({ questions, concepts }: GrammarExerciseWorkspaceProps) {
  const [level, setLevel] = useState<LevelFilter>("all");
  const [conceptSlug, setConceptSlug] = useState("all");
  const [sectionId, setSectionId] = useState("all");
  const [kind, setKind] = useState<KindFilter>("all");
  const [session, setSession] = useState<GrammarExerciseQuestion[]>([]);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [typedAnswer, setTypedAnswer] = useState("");
  const [typedChecked, setTypedChecked] = useState(false);
  const [typedCorrect, setTypedCorrect] = useState<boolean | null>(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [missedQuestions, setMissedQuestions] = useState<GrammarExerciseQuestion[]>([]);

  const availableConcepts = useMemo(
    () => concepts.filter((concept) =>
      level === "all" || concept.questionCountByLevel[level] > 0,
    ),
    [concepts, level],
  );

  const availableSections = useMemo(() => {
    const sectionMap = new Map<string, { id: string; title: string; level: GrammarLevel; applicationCount: number }>();
    questions
      .filter((question) =>
        question.sectionId &&
        question.sectionTitle &&
        (level === "all" || question.level === level) &&
        (conceptSlug === "all" || question.conceptSlug === conceptSlug) &&
        (kind === "all" || question.kind === kind),
      )
      .forEach((question) => {
        if (!question.sectionId || !question.sectionTitle) return;
        const current = sectionMap.get(question.sectionId);
        sectionMap.set(question.sectionId, {
          id: question.sectionId,
          title: question.sectionTitle,
          level: question.level,
          applicationCount: (current?.applicationCount ?? 0) + (question.skill.includes("application") ? 1 : 0),
        });
      });
    return Array.from(sectionMap.values()).sort((a, b) => a.title.localeCompare(b.title, "es"));
  }, [conceptSlug, kind, level, questions]);

  const filteredQuestions = useMemo(
    () => questions.filter((question) =>
      (level === "all" || question.level === level) &&
      (conceptSlug === "all" || question.conceptSlug === conceptSlug) &&
      (sectionId === "all" || question.sectionId === sectionId) &&
      (kind === "all" || question.kind === kind),
    ),
    [conceptSlug, kind, level, questions, sectionId],
  );

  const current = session[questionIndex];
  const selectedConcept = concepts.find((concept) => concept.slug === conceptSlug);
  const selectedSection = availableSections.find((section) => section.id === sectionId);
  const answered = current?.kind === "multiple-choice" ? selected !== null : typedChecked;
  const currentCorrect = current?.kind === "multiple-choice"
    ? selected !== null && selected === current.answerIndex
    : typedCorrect === true;

  function resetAnswerState() {
    setSelected(null);
    setTypedAnswer("");
    setTypedChecked(false);
    setTypedCorrect(null);
  }

  function resetSession() {
    setSession([]);
    setQuestionIndex(0);
    resetAnswerState();
    setScore(0);
    setFinished(false);
    setMissedQuestions([]);
  }

  function changeLevel(nextLevel: LevelFilter) {
    setLevel(nextLevel);
    if (
      conceptSlug !== "all" &&
      !concepts.some((concept) =>
        concept.slug === conceptSlug &&
        (nextLevel === "all" || concept.questionCountByLevel[nextLevel] > 0),
      )
    ) {
      setConceptSlug("all");
    }
    setSectionId("all");
    resetSession();
  }

  function changeConcept(nextSlug: string) {
    setConceptSlug(nextSlug);
    setSectionId("all");
    resetSession();
  }

  function changeSection(nextSection: string) {
    setSectionId(nextSection);
    resetSession();
  }

  function changeKind(nextKind: KindFilter) {
    setKind(nextKind);
    setSectionId("all");
    resetSession();
  }

  function beginRound(nextQuestions: GrammarExerciseQuestion[]) {
    const size = Math.min(nextQuestions.length, 20);
    if (size === 0) return;
    setSession(shuffle(nextQuestions).slice(0, size));
    setQuestionIndex(0);
    resetAnswerState();
    setScore(0);
    setFinished(false);
    setMissedQuestions([]);
  }

  function startSession() {
    beginRound(filteredQuestions);
  }

  function practiseMistakes() {
    const uniqueMissed = Array.from(new Map(missedQuestions.map((question) => [question.id, question])).values());
    beginRound(uniqueMissed);
  }

  function chooseAnswer(optionIndex: number) {
    if (!current || current.kind !== "multiple-choice" || selected !== null) return;
    setSelected(optionIndex);
    if (optionIndex === current.answerIndex) {
      setScore((value) => value + 1);
    } else {
      setMissedQuestions((value) => [...value, current]);
    }
  }

  function checkTypedAnswer() {
    if (!current || current.kind === "multiple-choice" || typedChecked || !typedAnswer.trim()) return;
    const correct = typedAnswerIsCorrect(current, typedAnswer);
    setTypedChecked(true);
    setTypedCorrect(correct);
    if (correct) {
      setScore((value) => value + 1);
    } else {
      setMissedQuestions((value) => [...value, current]);
    }
  }

  function nextQuestion() {
    if (!answered) return;
    if (questionIndex >= session.length - 1) {
      setFinished(true);
      return;
    }
    setQuestionIndex((value) => value + 1);
    resetAnswerState();
  }

  const correctAnswer = current?.kind === "multiple-choice"
    ? current.options?.[current.answerIndex ?? -1]
    : current?.modelAnswer;

  return (
    <section className={styles.grammarWorkspace} aria-label="Ejercicios de gramática">
      <div className={styles.exerciseIntro}>
        <div>
          <span className="eyebrow">Gramática · B2 + C1</span>
          <h2>Practica cada regla, no solo cada tema.</h2>
          <p>
            El banco combina mini-tests canónicos, ejercicios originales de aplicación y una actividad
            guiada para cada subapartado de la teoría. Puedes aislar una regla concreta o mezclarlo todo.
          </p>
        </div>
        <div className={styles.exerciseCount}>
          <strong>{filteredQuestions.length}</strong>
          <span>preguntas disponibles</span>
        </div>
      </div>

      <div className={styles.filters}>
        <label>
          <span>Nivel</span>
          <select value={level} onChange={(event) => changeLevel(event.target.value as LevelFilter)}>
            <option value="all">B2 + C1</option>
            <option value="B2">Solo B2</option>
            <option value="C1">Solo C1</option>
          </select>
        </label>
        <label>
          <span>Concepto</span>
          <select value={conceptSlug} onChange={(event) => changeConcept(event.target.value)}>
            <option value="all">Todos los conceptos</option>
            {availableConcepts.map((concept) => (
              <option value={concept.slug} key={concept.slug}>
                {concept.title} · {concept.level} · {concept.questionCount} ejercicios
              </option>
            ))}
          </select>
        </label>
        <label>
          <span>Subapartado</span>
          <select value={sectionId} onChange={(event) => changeSection(event.target.value)}>
            <option value="all">Todos los subapartados</option>
            {availableSections.map((section) => (
              <option value={section.id} key={section.id}>
                {section.title} · {section.level}
              </option>
            ))}
          </select>
        </label>
        <label>
          <span>Formato</span>
          <select value={kind} onChange={(event) => changeKind(event.target.value as KindFilter)}>
            <option value="all">Todos los formatos</option>
            {(Object.entries(kindLabels) as [GrammarExerciseKind, string][]).map(([value, label]) => (
              <option value={value} key={value}>{label}</option>
            ))}
          </select>
        </label>
        <div className={styles.filterAction}>
          <span>Sesión</span>
          <button className="button button-primary" type="button" onClick={startSession} disabled={filteredQuestions.length === 0}>
            {session.length > 0 ? "Nueva ronda" : "Empezar · hasta 20"}
          </button>
        </div>
      </div>

      {selectedConcept ? (
        <div className={styles.selectionNote}>
          <div>
            <strong>{selectedConcept.title}{selectedSection ? ` · ${selectedSection.title}` : ""}</strong>
            <span>
              {selectedConcept.categoryLabel} · {selectedConcept.level} · {selectedConcept.sectionCount} subapartados · {selectedConcept.applicationCount} ejercicios de aplicación
            </span>
          </div>
          <Link href={`/grammar#${selectedConcept.slug}`}>Repasar teoría →</Link>
        </div>
      ) : (
        <div className={styles.selectionNote}>
          <div>
            <strong>Práctica mixta</strong>
            <span>Los conceptos y formatos se mezclan para obligarte a identificar primero qué estructura necesitas.</span>
          </div>
        </div>
      )}

      {session.length === 0 ? (
        <div className={styles.emptyPractice}>
          <strong>Configura tu ronda.</strong>
          <p>Elige nivel, concepto, subapartado y formato, o déjalos en modo mixto. Cada sesión saca hasta 20 preguntas al azar.</p>
        </div>
      ) : finished ? (
        <div className={styles.grammarResult} aria-live="polite">
          <span className="eyebrow">Ronda completada</span>
          <strong>{score}/{session.length}</strong>
          <h3>{score === session.length ? "Perfecto." : score / session.length >= 0.8 ? "Muy buen dominio." : "Hay reglas que conviene repasar."}</h3>
          <p>
            {score === session.length
              ? "Has resuelto correctamente todas las decisiones de esta ronda."
              : `Has fallado ${missedQuestions.length} pregunta${missedQuestions.length === 1 ? "" : "s"}. Puedes repetir solo esos errores o generar una ronda nueva.`}
          </p>
          <div className={advancedStyles.resultActions}>
            {missedQuestions.length > 0 ? (
              <button className="button button-secondary" type="button" onClick={practiseMistakes}>Practicar solo mis fallos</button>
            ) : null}
            <button className="button button-primary" type="button" onClick={startSession}>Otra ronda</button>
          </div>
        </div>
      ) : current ? (
        <article className={styles.grammarCard} aria-live="polite">
          <div className={styles.questionTopline}>
            <div>
              <span>{current.level}</span>
              <strong>{current.conceptTitle}</strong>
            </div>
            <span>Pregunta {questionIndex + 1}/{session.length} · {score} aciertos</span>
          </div>

          <div className={advancedStyles.questionBadges}>
            <span>{kindLabels[current.kind]}</span>
            {current.sectionTitle ? <span>{current.sectionTitle}</span> : null}
            {current.keyword ? <span>Keyword: {current.keyword}</span> : null}
          </div>

          <div className={styles.progressTrack} aria-hidden="true">
            <span style={{ width: `${((questionIndex + 1) / session.length) * 100}%` }} />
          </div>
          <h3>{current.prompt}</h3>

          {current.kind === "multiple-choice" ? (
            <div className={styles.answerGrid}>
              {(current.options ?? []).map((option, optionIndex) => {
                const isAnswered = selected !== null;
                const isCorrect = isAnswered && optionIndex === current.answerIndex;
                const isWrong = selected === optionIndex && optionIndex !== current.answerIndex;
                return (
                  <button
                    type="button"
                    onClick={() => chooseAnswer(optionIndex)}
                    disabled={isAnswered}
                    className={`${isCorrect ? styles.correct : ""} ${isWrong ? styles.wrong : ""}`}
                    key={`${current.id}-${optionIndex}`}
                  >
                    <span>{String.fromCharCode(65 + optionIndex)}</span>
                    {option}
                  </button>
                );
              })}
            </div>
          ) : (
            <div className={advancedStyles.typedAnswerArea}>
              <label htmlFor="grammar-answer">Tu respuesta</label>
              <textarea
                id="grammar-answer"
                rows={current.kind === "transformation" || current.kind === "error-correction" ? 3 : 2}
                value={typedAnswer}
                onChange={(event) => setTypedAnswer(event.target.value)}
                disabled={typedChecked}
                placeholder={current.kind === "gap" ? "Escribe solo lo que falta" : "Escribe la frase completa"}
              />
              {!typedChecked ? (
                <button className="button button-primary" type="button" onClick={checkTypedAnswer} disabled={!typedAnswer.trim()}>
                  Comprobar
                </button>
              ) : null}
            </div>
          )}

          {answered ? (
            <div className={styles.feedback}>
              <div>
                <strong>{currentCorrect ? "✓ Correcto" : "✕ No exactamente"}</strong>
                <p>{current.explanation}</p>
                {!currentCorrect && correctAnswer ? <small>Respuesta modelo: {correctAnswer}</small> : null}
              </div>
              <div className={styles.feedbackActions}>
                <Link href={`/grammar#${current.conceptSlug}`}>Ver teoría</Link>
                <button className="button button-primary" type="button" onClick={nextQuestion}>
                  {questionIndex === session.length - 1 ? "Ver resultado" : "Siguiente"}
                </button>
              </div>
            </div>
          ) : null}
        </article>
      ) : null}
    </section>
  );
}
