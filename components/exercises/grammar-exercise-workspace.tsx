"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { GrammarLevel } from "@/lib/grammar";
import type {
  GrammarExerciseConcept,
  GrammarExerciseQuestion,
} from "@/lib/grammar/exercises";
import styles from "./exercises.module.css";

type GrammarExerciseWorkspaceProps = {
  questions: GrammarExerciseQuestion[];
  concepts: GrammarExerciseConcept[];
};

type LevelFilter = "all" | GrammarLevel;

function shuffle<T>(values: T[]) {
  const result = [...values];
  for (let index = result.length - 1; index > 0; index -= 1) {
    const target = Math.floor(Math.random() * (index + 1));
    [result[index], result[target]] = [result[target], result[index]];
  }
  return result;
}

export function GrammarExerciseWorkspace({ questions, concepts }: GrammarExerciseWorkspaceProps) {
  const [level, setLevel] = useState<LevelFilter>("all");
  const [conceptSlug, setConceptSlug] = useState("all");
  const [session, setSession] = useState<GrammarExerciseQuestion[]>([]);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const availableConcepts = useMemo(
    () => concepts.filter((concept) =>
      level === "all" || concept.questionCountByLevel[level] > 0,
    ),
    [concepts, level],
  );

  const filteredQuestions = useMemo(
    () => questions.filter((question) =>
      (level === "all" || question.level === level) &&
      (conceptSlug === "all" || question.conceptSlug === conceptSlug),
    ),
    [conceptSlug, level, questions],
  );

  const current = session[questionIndex];

  function resetSession() {
    setSession([]);
    setQuestionIndex(0);
    setSelected(null);
    setScore(0);
    setFinished(false);
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
    resetSession();
  }

  function changeConcept(nextSlug: string) {
    setConceptSlug(nextSlug);
    resetSession();
  }

  function startSession() {
    const size = Math.min(filteredQuestions.length, 20);
    if (size === 0) return;
    setSession(shuffle(filteredQuestions).slice(0, size));
    setQuestionIndex(0);
    setSelected(null);
    setScore(0);
    setFinished(false);
  }

  function chooseAnswer(optionIndex: number) {
    if (!current || selected !== null) return;
    setSelected(optionIndex);
    if (optionIndex === current.answer) setScore((value) => value + 1);
  }

  function nextQuestion() {
    if (selected === null) return;
    if (questionIndex >= session.length - 1) {
      setFinished(true);
      return;
    }
    setQuestionIndex((value) => value + 1);
    setSelected(null);
  }

  const selectedConcept = concepts.find((concept) => concept.slug === conceptSlug);

  return (
    <section className={styles.grammarWorkspace} aria-label="Ejercicios de gramática">
      <div className={styles.exerciseIntro}>
        <div>
          <span className="eyebrow">Gramática · B2 + C1</span>
          <h2>Practica la decisión, no solo la regla.</h2>
          <p>
            Las preguntas salen del mismo banco canónico que acompaña a la teoría. Puedes mezclar todo,
            centrarte en B2 o C1, o practicar un concepto concreto.
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
                {concept.title} · {concept.level}
              </option>
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
            <strong>{selectedConcept.title}</strong>
            <span>{selectedConcept.categoryLabel} · {selectedConcept.level}</span>
          </div>
          <Link href={`/grammar#${selectedConcept.slug}`}>Repasar teoría →</Link>
        </div>
      ) : (
        <div className={styles.selectionNote}>
          <div>
            <strong>Práctica mixta</strong>
            <span>Los conceptos se mezclan para obligarte a identificar primero qué estructura necesitas.</span>
          </div>
        </div>
      )}

      {session.length === 0 ? (
        <div className={styles.emptyPractice}>
          <strong>Configura tu ronda.</strong>
          <p>Elige nivel y concepto, o deja ambos en modo mixto. Cada sesión selecciona hasta 20 preguntas al azar.</p>
        </div>
      ) : finished ? (
        <div className={styles.grammarResult} aria-live="polite">
          <span className="eyebrow">Ronda completada</span>
          <strong>{score}/{session.length}</strong>
          <h3>{score === session.length ? "Perfecto." : score / session.length >= 0.8 ? "Muy buen dominio." : "Hay reglas que conviene repasar."}</h3>
          <p>
            {score === session.length
              ? "Has resuelto correctamente todas las decisiones de esta ronda."
              : "Puedes repetir con una selección nueva o volver a la teoría del concepto que te haya generado dudas."}
          </p>
          <button className="button button-primary" type="button" onClick={startSession}>Otra ronda</button>
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
          <div className={styles.progressTrack} aria-hidden="true">
            <span style={{ width: `${((questionIndex + 1) / session.length) * 100}%` }} />
          </div>
          <h3>{current.prompt}</h3>
          <div className={styles.answerGrid}>
            {current.options.map((option, optionIndex) => {
              const answered = selected !== null;
              const isCorrect = answered && optionIndex === current.answer;
              const isWrong = selected === optionIndex && optionIndex !== current.answer;
              return (
                <button
                  type="button"
                  onClick={() => chooseAnswer(optionIndex)}
                  disabled={answered}
                  className={`${isCorrect ? styles.correct : ""} ${isWrong ? styles.wrong : ""}`}
                  key={`${current.id}-${optionIndex}`}
                >
                  <span>{String.fromCharCode(65 + optionIndex)}</span>
                  {option}
                </button>
              );
            })}
          </div>

          {selected !== null ? (
            <div className={styles.feedback}>
              <div>
                <strong>{selected === current.answer ? "✓ Correcto" : "✕ No exactamente"}</strong>
                <p>{current.explanation}</p>
                {selected !== current.answer ? <small>Respuesta correcta: {current.options[current.answer]}</small> : null}
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
