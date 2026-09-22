"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  verbPatternPracticeFamilies,
  verbPatternPracticeQuestions,
  verbPatternSourceEntryCount,
  type VerbPatternFamilyId,
  type VerbPatternPracticeQuestion,
} from "@/lib/grammar/verb-patterns-practice";
import styles from "./verb-patterns-workspace.module.css";

type FamilyFilter = "all" | VerbPatternFamilyId;

function shuffle<T>(values: T[]) {
  const result = [...values];
  for (let index = result.length - 1; index > 0; index -= 1) {
    const target = Math.floor(Math.random() * (index + 1));
    [result[index], result[target]] = [result[target], result[index]];
  }
  return result;
}

export function VerbPatternsWorkspace() {
  const [family, setFamily] = useState<FamilyFilter>("all");
  const [session, setSession] = useState<VerbPatternPracticeQuestion[]>([]);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [missedQuestions, setMissedQuestions] = useState<VerbPatternPracticeQuestion[]>([]);

  const filteredQuestions = useMemo(
    () => verbPatternPracticeQuestions.filter((question) => family === "all" || question.family === family),
    [family],
  );

  const current = session[questionIndex];
  const currentCorrect = current && selected !== null ? selected === current.answerIndex : false;

  function resetSession() {
    setSession([]);
    setQuestionIndex(0);
    setSelected(null);
    setScore(0);
    setFinished(false);
    setMissedQuestions([]);
  }

  function chooseFamily(nextFamily: FamilyFilter) {
    setFamily(nextFamily);
    resetSession();
  }

  function beginRound(questions: VerbPatternPracticeQuestion[], limit?: number) {
    const next = shuffle(questions);
    const selectedQuestions = typeof limit === "number" ? next.slice(0, Math.min(limit, next.length)) : next;
    if (selectedQuestions.length === 0) return;
    setSession(selectedQuestions);
    setQuestionIndex(0);
    setSelected(null);
    setScore(0);
    setFinished(false);
    setMissedQuestions([]);
  }

  function chooseAnswer(optionIndex: number) {
    if (!current || selected !== null) return;
    setSelected(optionIndex);
    if (optionIndex === current.answerIndex) {
      setScore((value) => value + 1);
    } else {
      setMissedQuestions((value) => [...value, current]);
    }
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

  function practiseMistakes() {
    const unique = Array.from(new Map(missedQuestions.map((question) => [question.id, question])).values());
    beginRound(unique);
  }

  const selectedFamily = family === "all"
    ? null
    : verbPatternPracticeFamilies.find((candidate) => candidate.id === family);

  return (
    <section className={styles.workspace} aria-label="Práctica exclusiva de verb patterns">
      <div className={styles.hero}>
        <div>
          <span className="eyebrow">Gramática · C1 · Verb patterns</span>
          <h2>Practica qué estructura exige cada verbo.</h2>
          <p>
            Banco exclusivo para Unit 4: -ing, object + -ing, to-infinitive, object + to-infinitive,
            infinitive without to y los verbos donde cambiar entre -ing y to cambia el significado.
          </p>
        </div>
        <div className={styles.heroStats}>
          <strong>{verbPatternSourceEntryCount}</strong>
          <span>entradas de patrón</span>
          <small>{verbPatternPracticeQuestions.length} preguntas en el banco</small>
        </div>
      </div>

      <div className={styles.familyGrid}>
        <button
          type="button"
          className={family === "all" ? styles.activeFamily : ""}
          onClick={() => chooseFamily("all")}
        >
          <span>Mix</span>
          <strong>Todos los verb patterns</strong>
          <small>{verbPatternPracticeQuestions.length} preguntas</small>
        </button>
        {verbPatternPracticeFamilies.map((candidate) => {
          const count = verbPatternPracticeQuestions.filter((question) => question.family === candidate.id).length;
          return (
            <button
              type="button"
              className={family === candidate.id ? styles.activeFamily : ""}
              onClick={() => chooseFamily(candidate.id)}
              key={candidate.id}
            >
              <span>{candidate.verbs.length}</span>
              <strong>{candidate.title}</strong>
              <small>{count} preguntas</small>
            </button>
          );
        })}
      </div>

      <div className={styles.roundControls}>
        <div>
          <strong>{selectedFamily?.title ?? "Todos los verb patterns"}</strong>
          <span>{selectedFamily?.description ?? "Mezcla todas las familias para obligarte a identificar primero el patrón."}</span>
        </div>
        <div className={styles.roundButtons}>
          <button className="button button-secondary" type="button" onClick={() => beginRound(filteredQuestions, 20)}>
            Ronda de 20
          </button>
          <button className="button button-primary" type="button" onClick={() => beginRound(filteredQuestions)}>
            Practicar todas · {filteredQuestions.length}
          </button>
        </div>
      </div>

      {session.length === 0 ? (
        <div className={styles.emptyState}>
          <strong>Elige una familia o mézclalas todas.</strong>
          <p>
            Cada verbo de las listas del tema aparece en el banco. Las preguntas de significado trabajan
            por separado remember, forget, regret, stop y try.
          </p>
          <Link href="/grammar#verb-patterns">Repasar primero la teoría →</Link>
        </div>
      ) : finished ? (
        <div className={styles.result} aria-live="polite">
          <span className="eyebrow">Ronda completada</span>
          <strong>{score}/{session.length}</strong>
          <h3>{score === session.length ? "Perfecto." : score / session.length >= 0.8 ? "Muy buen dominio." : "Conviene repetir los fallos."}</h3>
          <p>
            {score === session.length
              ? "Has identificado correctamente todos los patrones de esta ronda."
              : `Has fallado ${missedQuestions.length} pregunta${missedQuestions.length === 1 ? "" : "s"}.`}
          </p>
          <div className={styles.resultActions}>
            {missedQuestions.length > 0 ? (
              <button className="button button-secondary" type="button" onClick={practiseMistakes}>Solo mis fallos</button>
            ) : null}
            <button className="button button-primary" type="button" onClick={() => beginRound(filteredQuestions, 20)}>Otra ronda</button>
          </div>
        </div>
      ) : current ? (
        <article className={styles.questionCard} aria-live="polite">
          <div className={styles.questionHeader}>
            <div>
              <span>C1</span>
              <strong>{current.familyTitle}</strong>
            </div>
            <span>Pregunta {questionIndex + 1}/{session.length} · {score} aciertos</span>
          </div>

          <div className={styles.progressTrack} aria-hidden="true">
            <span style={{ width: `${((questionIndex + 1) / session.length) * 100}%` }} />
          </div>

          <div className={styles.verbBadge}>Verb: <strong>{current.verb}</strong></div>
          <h3>{current.prompt}</h3>

          <div className={styles.answerGrid}>
            {current.options.map((option, optionIndex) => {
              const answered = selected !== null;
              const isCorrect = answered && optionIndex === current.answerIndex;
              const isWrong = selected === optionIndex && optionIndex !== current.answerIndex;
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
                <strong>{currentCorrect ? "Correcto" : "Revisa este patrón"}</strong>
                <p>{current.explanation}</p>
                {current.example ? <small>Ejemplo: {current.example}</small> : null}
              </div>
              <button className="button button-primary" type="button" onClick={nextQuestion}>
                {questionIndex === session.length - 1 ? "Ver resultado" : "Siguiente"}
              </button>
            </div>
          ) : null}
        </article>
      ) : null}
    </section>
  );
}
