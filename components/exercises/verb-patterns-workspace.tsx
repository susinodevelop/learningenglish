"use client";

import Link from "next/link";
import { useState } from "react";
import {
  buildVerbPatternRound,
  verbPatternPracticeFamilies,
  verbPatternPracticeQuestions,
  verbPatternSourceEntryCount,
  type VerbPatternFamilyId,
  type VerbPatternPracticeQuestion,
} from "@/lib/grammar/verb-patterns-practice";
import styles from "./verb-patterns-workspace.module.css";

function sameAnswers(selected: VerbPatternFamilyId[], expected: VerbPatternFamilyId[]) {
  return selected.length === expected.length && expected.every((familyId) => selected.includes(familyId));
}

export function VerbPatternsWorkspace() {
  const [session, setSession] = useState<VerbPatternPracticeQuestion[]>([]);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [selectedFamilies, setSelectedFamilies] = useState<VerbPatternFamilyId[]>([]);
  const [checked, setChecked] = useState(false);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [missedQuestions, setMissedQuestions] = useState<VerbPatternPracticeQuestion[]>([]);

  const current = session[questionIndex];
  const currentCorrect = current ? sameAnswers(selectedFamilies, current.correctFamilyIds) : false;

  function beginRound(questions: VerbPatternPracticeQuestion[], limit?: number) {
    const next = buildVerbPatternRound(questions, limit);
    if (next.length === 0) return;
    setSession(next);
    setQuestionIndex(0);
    setSelectedFamilies([]);
    setChecked(false);
    setScore(0);
    setFinished(false);
    setMissedQuestions([]);
  }

  function toggleFamily(familyId: VerbPatternFamilyId) {
    if (checked) return;
    setSelectedFamilies((currentSelection) =>
      currentSelection.includes(familyId)
        ? currentSelection.filter((candidate) => candidate !== familyId)
        : [...currentSelection, familyId],
    );
  }

  function checkAnswer() {
    if (!current || checked || selectedFamilies.length === 0) return;
    const correct = sameAnswers(selectedFamilies, current.correctFamilyIds);
    setChecked(true);
    if (correct) {
      setScore((value) => value + 1);
    } else {
      setMissedQuestions((value) => [...value, current]);
    }
  }

  function nextQuestion() {
    if (!checked) return;
    if (questionIndex >= session.length - 1) {
      setFinished(true);
      return;
    }
    setQuestionIndex((value) => value + 1);
    setSelectedFamilies([]);
    setChecked(false);
  }

  function practiseMistakes() {
    const unique = Array.from(new Map(missedQuestions.map((question) => [question.id, question])).values());
    beginRound(unique);
  }

  const correctLabels = current?.correctFamilyIds
    .map((familyId) => verbPatternPracticeFamilies.find((family) => family.id === familyId)?.title)
    .filter(Boolean)
    .join(" · ");

  return (
    <section className={styles.workspace} aria-label="Práctica exclusiva de verb patterns">
      <div className={styles.hero}>
        <div>
          <span className="eyebrow">Gramática · C1 · Verb patterns</span>
          <h2>Verbo o expresión → pattern.</h2>
          <p>
            Aparece un verbo o expresión verbal y marcas todos los grupos que le corresponden. El banco parte del
            Grammar Reference y el Language Tip de Gold C1 Unit 4 y resuelve contradicciones internas con el
            tratamiento posterior más explícito del propio Gold.
          </p>
        </div>
        <div className={styles.heroStats}>
          <strong>{verbPatternPracticeQuestions.length}</strong>
          <span>verbos o expresiones únicas</span>
          <small>{verbPatternSourceEntryCount} entradas en las cinco listas del Grammar Reference</small>
        </div>
      </div>

      <div className={styles.roundControls}>
        <div>
          <strong>Todos los Verb patterns mezclados</strong>
          <span>La ronda de 20 garantiza presencia de los siete grupos antes de completar el resto al azar.</span>
        </div>
        <div className={styles.roundButtons}>
          <button className="button button-secondary" type="button" onClick={() => beginRound(verbPatternPracticeQuestions, 20)}>
            Ronda de 20
          </button>
          <button className="button button-primary" type="button" onClick={() => beginRound(verbPatternPracticeQuestions)}>
            Practicar todos · {verbPatternPracticeQuestions.length}
          </button>
        </div>
      </div>

      {session.length === 0 ? (
        <div className={styles.emptyState}>
          <strong>Elige una ronda y empieza.</strong>
          <p>
            Marca uno o varios patterns para cada verbo o expresión verbal. La respuesta solo se revela después de pulsar Comprobar.
          </p>
          <Link href="/grammar/verb-patterns">Repasar primero la teoría →</Link>
        </div>
      ) : finished ? (
        <div className={styles.result} aria-live="polite">
          <span className="eyebrow">Ronda completada</span>
          <strong>{score}/{session.length}</strong>
          <h3>{score === session.length ? "Perfecto." : score / session.length >= 0.8 ? "Muy buen dominio." : "Conviene repetir los fallos."}</h3>
          <p>
            {score === session.length
              ? "Has clasificado correctamente todas las entradas de esta ronda."
              : `Has fallado ${missedQuestions.length} pregunta${missedQuestions.length === 1 ? "" : "s"}.`}
          </p>
          <div className={styles.resultActions}>
            {missedQuestions.length > 0 ? (
              <button className="button button-secondary" type="button" onClick={practiseMistakes}>Solo mis fallos</button>
            ) : null}
            <button className="button button-primary" type="button" onClick={() => beginRound(verbPatternPracticeQuestions, 20)}>Otra ronda</button>
          </div>
        </div>
      ) : current ? (
        <article className={styles.questionCard} aria-live="polite">
          <div className={styles.questionHeader}>
            <div>
              <span>C1</span>
              <strong>Verb patterns</strong>
            </div>
            <span>Pregunta {questionIndex + 1}/{session.length} · {score} aciertos</span>
          </div>

          <div className={styles.progressTrack} aria-hidden="true">
            <span style={{ width: `${((questionIndex + 1) / session.length) * 100}%` }} />
          </div>

          <h3>¿En qué Verb pattern se clasifica este verbo o expresión verbal?</h3>
          <div className={styles.focusVerb}>{current.verb}</div>
          <p className={styles.multiHint}>Marca todos los grupos que le corresponden según el criterio de estudio del Gold.</p>

          <div className={styles.answerGrid}>
            {verbPatternPracticeFamilies.map((family) => {
              const isSelected = selectedFamilies.includes(family.id);
              const isExpected = current.correctFamilyIds.includes(family.id);
              const isCorrect = checked && isExpected;
              const isWrong = checked && isSelected && !isExpected;

              return (
                <button
                  type="button"
                  onClick={() => toggleFamily(family.id)}
                  disabled={checked}
                  aria-pressed={isSelected}
                  className={`${isSelected ? styles.selected : ""} ${isCorrect ? styles.correct : ""} ${isWrong ? styles.wrong : ""}`}
                  key={family.id}
                >
                  <span className={styles.checkBox}>{isSelected ? "✓" : ""}</span>
                  <span>
                    <strong>{family.title}</strong>
                    <small>{family.pattern}</small>
                  </span>
                </button>
              );
            })}
          </div>

          {!checked ? (
            <div className={styles.checkAction}>
              <button
                className="button button-primary"
                type="button"
                onClick={checkAnswer}
                disabled={selectedFamilies.length === 0}
              >
                Comprobar
              </button>
            </div>
          ) : (
            <div className={styles.feedback}>
              <div>
                <strong>{currentCorrect ? "Correcto" : "Revisa la clasificación"}</strong>
                <p>Clasificación de estudio: {correctLabels}</p>
              </div>
              <button className="button button-primary" type="button" onClick={nextQuestion}>
                {questionIndex === session.length - 1 ? "Ver resultado" : "Siguiente"}
              </button>
            </div>
          )}
        </article>
      ) : null}
    </section>
  );
}
