"use client";

import { useState } from "react";
import type { GrammarTopic } from "@/lib/grammar";
import { grammarQuizzes, type GrammarQuizQuestion } from "@/lib/grammar/quizzes";
import styles from "./grammar-browser.module.css";

type GrammarBrowserProps = {
  topics: GrammarTopic[];
};

function MiniQuiz({ questions }: { questions: GrammarQuizQuestion[] }) {
  const [questionIndex, setQuestionIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  if (questions.length === 0) return null;

  const question = questions[questionIndex];

  const chooseAnswer = (optionIndex: number) => {
    if (selected !== null) return;
    setSelected(optionIndex);
    if (optionIndex === question.answer) setScore((current) => current + 1);
  };

  const nextQuestion = () => {
    if (questionIndex === questions.length - 1) {
      setFinished(true);
      return;
    }

    setQuestionIndex((current) => current + 1);
    setSelected(null);
  };

  const restart = () => {
    setQuestionIndex(0);
    setSelected(null);
    setScore(0);
    setFinished(false);
  };

  if (finished) {
    return (
      <div className={styles.quizResult}>
        <span className="eyebrow">Mini test completado</span>
        <strong>{score}/{questions.length}</strong>
        <p>{score === questions.length ? "Perfecto. Este bloque está bien asentado." : "Revisa las explicaciones de las preguntas que fallaste y repítelo."}</p>
        <button type="button" className="button button-secondary" onClick={restart}>Repetir mini test</button>
      </div>
    );
  }

  return (
    <div className={styles.quizCard}>
      <div className={styles.quizTopline}>
        <span>Pregunta {questionIndex + 1} de {questions.length}</span>
        <strong>{score} aciertos</strong>
      </div>
      <div className={styles.quizProgress} aria-hidden="true">
        <span style={{ width: `${((questionIndex + 1) / questions.length) * 100}%` }} />
      </div>
      <h4>{question.prompt}</h4>
      <div className={styles.quizAnswers}>
        {question.options.map((option, optionIndex) => {
          const isCorrect = selected !== null && optionIndex === question.answer;
          const isWrong = selected === optionIndex && optionIndex !== question.answer;
          return (
            <button
              type="button"
              key={option}
              className={`${styles.quizAnswer}${isCorrect ? ` ${styles.correct}` : ""}${isWrong ? ` ${styles.wrong}` : ""}`}
              onClick={() => chooseAnswer(optionIndex)}
              disabled={selected !== null}
            >
              <span>{String.fromCharCode(65 + optionIndex)}</span>
              {option}
            </button>
          );
        })}
      </div>
      {selected !== null && (
        <div className={styles.quizFeedback}>
          <div>
            <strong>{selected === question.answer ? "Correcto" : "No exactamente"}</strong>
            <p>{question.explanation}</p>
          </div>
          <button type="button" className="button button-primary" onClick={nextQuestion}>
            {questionIndex === questions.length - 1 ? "Ver resultado" : "Siguiente"}
          </button>
        </div>
      )}
    </div>
  );
}

export function GrammarBrowser({ topics }: GrammarBrowserProps) {
  const [activeSlug, setActiveSlug] = useState(topics[0]?.slug ?? "");
  const activeTopic = topics.find((topic) => topic.slug === activeSlug) ?? topics[0];

  if (!activeTopic) return null;

  const activeIndex = topics.findIndex((topic) => topic.slug === activeTopic.slug);
  const unitTraps = Array.from(new Set(activeTopic.sections.flatMap((section) => section.traps ?? [])));
  const quizKey = activeTopic.slug === "countable-uncountable-nouns-articles"
    ? "countable-and-uncountable-nouns-articles"
    : activeTopic.slug === "the-passive"
      ? "passive"
      : activeTopic.slug;
  const quizQuestions = grammarQuizzes[quizKey] ?? [];

  return (
    <div className={styles.layout}>
      <aside className={styles.sidebar} aria-label="Unidades de gramática B2">
        <div className={styles.sidebarHeading}>
          <div>
            <span className="eyebrow">Grammar syllabus</span>
            <strong>Cambridge B2</strong>
          </div>
          <span>{topics.length} unidades</span>
        </div>

        <nav className={styles.nav} aria-label="Las 24 unidades del libro">
          {topics.map((topic) => {
            const isActive = topic.slug === activeTopic.slug;

            return (
              <button
                type="button"
                className={`${styles.topicButton}${isActive ? ` ${styles.active}` : ""}`}
                key={topic.slug}
                onClick={() => setActiveSlug(topic.slug)}
                aria-current={isActive ? "page" : undefined}
              >
                <span className={styles.number}>{String(topic.unit).padStart(2, "0")}</span>
                <span className={styles.copy}>
                  <strong>{topic.title}</strong>
                  <small>{topic.sections.length} apartados · {topic.level}</small>
                </span>
              </button>
            );
          })}
        </nav>

        <div className={styles.sidebarFooter}>
          <span>01</span>
          <div aria-hidden="true"><span style={{ width: `${((activeIndex + 1) / topics.length) * 100}%` }} /></div>
          <span>24</span>
        </div>
      </aside>

      <main className={styles.content} aria-live="polite">
        <article className={styles.lessonCard} key={activeTopic.slug}>
          <header className={styles.lessonHeader}>
            <div className={styles.lessonMeta}>
              <span className={styles.unitLabel}>Unit {String(activeTopic.unit).padStart(2, "0")} · {activeIndex + 1}/{topics.length}</span>
              <span className="level-pill">{activeTopic.level}</span>
            </div>
            <h2>{activeTopic.title}</h2>
            <p className={styles.summary}>{activeTopic.summary}</p>
            <div className={styles.examBadge}>
              <span>Exam practice del libro</span>
              <strong>{activeTopic.examPractice}</strong>
            </div>
          </header>

          <section className={styles.studyOverview} aria-labelledby={`${activeTopic.slug}-overview`}>
            <div className={styles.overviewHeading}>
              <div>
                <span className="eyebrow">Vista de estudio</span>
                <h3 id={`${activeTopic.slug}-overview`}>Primero entiende el mapa del tema.</h3>
              </div>
              <p>Usa esta parte para comparar estructuras antes de entrar en la explicación detallada.</p>
            </div>

            <div className={styles.comparisonTableWrap}>
              <table className={styles.comparisonTable}>
                <thead>
                  <tr>
                    <th>Bloque</th>
                    <th>Forma clave</th>
                    <th>Idea que debes reconocer</th>
                  </tr>
                </thead>
                <tbody>
                  {activeTopic.sections.map((section) => (
                    <tr key={`compare-${section.title}`}>
                      <td><strong>{section.title}</strong></td>
                      <td><code>{section.forms?.[0] ?? "—"}</code></td>
                      <td>{section.intro ?? section.rules[0]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className={styles.decisionPanel}>
              <div className={styles.decisionIntro}>
                <span>Cómo decidir</span>
                <strong>¿Qué quieres expresar?</strong>
                <p>Identifica primero la intención. Después busca la estructura que corresponde, no traduzcas palabra por palabra desde español.</p>
              </div>
              <div className={styles.decisionBranches}>
                {activeTopic.sections.map((section, index) => (
                  <div className={styles.decisionBranch} key={`decision-${section.title}`}>
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    <div>
                      <strong>{section.title}</strong>
                      <p>{section.rules[0]}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {unitTraps.length > 0 && (
              <div className={styles.unitTraps}>
                <span className="eyebrow">Cambridge traps de la unidad</span>
                <div>
                  {unitTraps.map((trap) => <p key={trap}>{trap}</p>)}
                </div>
              </div>
            )}
          </section>

          <div className={styles.sectionList}>
            {activeTopic.sections.map((section, sectionIndex) => (
              <section className={styles.grammarSection} key={`${activeTopic.slug}-${section.title}`}>
                <div className={styles.sectionTitleRow}>
                  <span>{String(sectionIndex + 1).padStart(2, "0")}</span>
                  <h3>{section.title}</h3>
                </div>

                {section.intro && <p className={styles.sectionIntro}>{section.intro}</p>}

                {section.forms && section.forms.length > 0 && (
                  <div className={styles.forms} aria-label="Estructuras">
                    {section.forms.map((form) => <code key={form}>{form}</code>)}
                  </div>
                )}

                <div className={styles.rulesBox}>
                  <strong>Explicación · cómo funciona</strong>
                  <ul>
                    {section.rules.map((rule) => <li key={rule}>{rule}</li>)}
                  </ul>
                </div>

                {section.examples && section.examples.length > 0 && (
                  <div className={styles.examplesBlock}>
                    <strong>Ejemplos</strong>
                    <div className={styles.examplesGrid}>
                      {section.examples.map((example) => (
                        <div className={styles.example} key={`${example.english}-${example.note ?? ""}`}>
                          <code>{example.english}</code>
                          {example.note && <span>{example.note}</span>}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {section.traps && section.traps.length > 0 && (
                  <div className={styles.trapBox}>
                    <strong>Cambridge trap</strong>
                    <ul>
                      {section.traps.map((trap) => <li key={trap}>{trap}</li>)}
                    </ul>
                  </div>
                )}
              </section>
            ))}
          </div>

          <section className={styles.miniTestSection}>
            <div className={styles.miniTestHeading}>
              <span className="eyebrow">Recuperación activa</span>
              <h3>Mini test · {activeTopic.title}</h3>
              <p>Tres preguntas rápidas. Responde antes de volver a mirar la teoría.</p>
            </div>
            <MiniQuiz key={activeTopic.slug} questions={quizQuestions} />
          </section>
        </article>
      </main>
    </div>
  );
}
