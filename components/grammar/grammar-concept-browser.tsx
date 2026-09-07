"use client";

import { useEffect, useMemo, useState } from "react";
import type { GrammarConcept } from "@/lib/grammar";
import { grammarQuizzes, type GrammarQuizQuestion } from "@/lib/grammar/quizzes";
import styles from "./grammar-concept-browser.module.css";

type GrammarConceptBrowserProps = {
  topics: GrammarConcept[];
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
        <p>{score === questions.length ? "Perfecto. Este concepto está bien asentado." : "Revisa solo lo que fallaste y vuelve a intentarlo."}</p>
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

function normaliseQuizKey(slug: string) {
  if (slug === "countable-uncountable-nouns-articles") return "countable-and-uncountable-nouns-articles";
  if (slug === "the-passive") return "passive";
  return slug;
}

export function GrammarConceptBrowser({ topics }: GrammarConceptBrowserProps) {
  const [activeSlug, setActiveSlug] = useState(topics[0]?.slug ?? "");
  const [expandedTopics, setExpandedTopics] = useState<Set<string>>(() => new Set(topics[0] ? [topics[0].slug] : []));
  const [pendingAnchor, setPendingAnchor] = useState<string | null>(null);
  const activeTopic = topics.find((topic) => topic.slug === activeSlug) ?? topics[0];

  useEffect(() => {
    if (!pendingAnchor) return;
    const frame = requestAnimationFrame(() => {
      document.getElementById(pendingAnchor)?.scrollIntoView({ behavior: "smooth", block: "start" });
      setPendingAnchor(null);
    });
    return () => cancelAnimationFrame(frame);
  }, [activeSlug, pendingAnchor]);

  const quizQuestions = useMemo(() => {
    if (!activeTopic) return [];
    return activeTopic.sourceSlugs.flatMap((slug) => grammarQuizzes[normaliseQuizKey(slug)] ?? []);
  }, [activeTopic]);

  if (!activeTopic) return null;

  const activeIndex = topics.findIndex((topic) => topic.slug === activeTopic.slug);
  const conceptTraps = Array.from(new Set(activeTopic.sections.flatMap((section) => section.traps ?? [])));
  const categories = Array.from(new Set(topics.map((topic) => topic.category)));

  const expandTopic = (slug: string) => {
    setExpandedTopics((current) => {
      const next = new Set(current);
      if (next.has(slug)) next.delete(slug);
      else next.add(slug);
      return next;
    });
  };

  const openTopic = (slug: string) => {
    setExpandedTopics((current) => new Set(current).add(slug));
    setActiveSlug(slug);
    setPendingAnchor(`topic-${slug}`);
  };

  const openSection = (topicSlug: string, sectionId: string) => {
    setExpandedTopics((current) => new Set(current).add(topicSlug));
    setActiveSlug(topicSlug);
    setPendingAnchor(sectionId);
  };

  return (
    <div className={styles.layout}>
      <aside className={styles.sidebar} aria-label="Conceptos de gramática B2">
        <div className={styles.sidebarHeading}>
          <div>
            <span className="eyebrow">Grammar map</span>
            <strong>Cambridge B2</strong>
          </div>
          <span>{topics.length} conceptos</span>
        </div>

        <nav className={styles.nav} aria-label="Conceptos y subapartados de gramática">
          {categories.map((category) => {
            const categoryTopics = topics.filter((topic) => topic.category === category);
            return (
              <div className={styles.categoryGroup} key={category}>
                <div className={styles.categoryHeading}>{categoryTopics[0]?.categoryLabel}</div>
                {categoryTopics.map((topic) => {
                  const topicIndex = topics.findIndex((candidate) => candidate.slug === topic.slug);
                  const isActive = topic.slug === activeTopic.slug;
                  const isExpanded = expandedTopics.has(topic.slug);
                  const subnavId = `nav-${topic.slug}`;
                  return (
                    <div className={styles.topicGroup} key={topic.slug}>
                      <div className={`${styles.topicRow}${isActive ? ` ${styles.active}` : ""}`}>
                        <button
                          type="button"
                          className={styles.topicButton}
                          onClick={() => openTopic(topic.slug)}
                          aria-current={isActive ? "page" : undefined}
                        >
                          <span className={styles.number}>{String(topicIndex + 1).padStart(2, "0")}</span>
                          <span className={styles.copy}>
                            <strong>{topic.title}</strong>
                            <small>{topic.sections.length} ideas relacionadas</small>
                          </span>
                        </button>
                        <button
                          type="button"
                          className={`${styles.expandButton}${isExpanded ? ` ${styles.expanded}` : ""}`}
                          onClick={() => expandTopic(topic.slug)}
                          aria-expanded={isExpanded}
                          aria-controls={subnavId}
                          aria-label={`${isExpanded ? "Contraer" : "Desplegar"} ${topic.title}`}
                        >
                          <span aria-hidden="true">⌄</span>
                        </button>
                      </div>

                      {isExpanded && (
                        <div className={styles.subnav} id={subnavId}>
                          {topic.sections.map((section, sectionIndex) => (
                            <button
                              type="button"
                              key={section.id}
                              className={styles.subtopicButton}
                              onClick={() => openSection(topic.slug, section.id)}
                            >
                              <span>{String(sectionIndex + 1).padStart(2, "0")}</span>
                              <strong>{section.title}</strong>
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            );
          })}
        </nav>

        <div className={styles.sidebarFooter}>
          <span>1</span>
          <div aria-hidden="true"><span style={{ width: `${((activeIndex + 1) / topics.length) * 100}%` }} /></div>
          <span>{topics.length}</span>
        </div>
      </aside>

      <main className={styles.content} aria-live="polite">
        <article className={styles.lessonCard} key={activeTopic.slug}>
          <header className={styles.lessonHeader} id={`topic-${activeTopic.slug}`}>
            <div className={styles.lessonMeta}>
              <span className={styles.conceptLabel}>{activeTopic.categoryLabel} · concepto {activeIndex + 1}/{topics.length}</span>
              <span className="level-pill">{activeTopic.level}</span>
            </div>
            <h2>{activeTopic.title}</h2>
            <p className={styles.summary}>{activeTopic.summary}</p>
          </header>

          <section className={styles.studyOverview} aria-labelledby={`${activeTopic.slug}-overview`}>
            <div className={styles.overviewHeading}>
              <div>
                <span className="eyebrow">Modo foco</span>
                <h3 id={`${activeTopic.slug}-overview`}>Primero la explicación. Después la memoria.</h3>
              </div>
              <p>Lee qué significa cada estructura y cuándo se usa. Después mira la forma, fija la idea con ejemplos y termina con las trampas de Cambridge.</p>
            </div>

            <div className={styles.attentionStrip}>
              <div className={styles.attentionCard}>
                <span>1 · Pregunta guía</span>
                <strong>{activeTopic.studyQuestion}</strong>
              </div>
              <div className={styles.attentionCard}>
                <span>2 · Regla para recordar</span>
                <strong>{activeTopic.memoryHook}</strong>
              </div>
              <div className={styles.attentionCard}>
                <span>3 · Orden de estudio</span>
                <strong>Explicación → forma → ejemplos → trap.</strong>
              </div>
            </div>

            <div className={styles.quickMapHeading}>
              <span className="eyebrow">Mapa de explicaciones</span>
              <h3>¿Qué significa cada apartado y cuándo se usa?</h3>
            </div>

            <div className={styles.quickMap}>
              {activeTopic.sections.map((section, index) => (
                <button
                  type="button"
                  className={styles.quickCard}
                  key={section.id}
                  onClick={() => openSection(activeTopic.slug, section.id)}
                >
                  <div className={styles.quickCardTop}>
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    <strong>{section.title}</strong>
                  </div>
                  <p>{section.intro ?? section.rules[0]}</p>
                  {section.rules.length > 1 && (
                    <div className={styles.quickExample}>
                      <span>También debes saber</span>
                      <b>{section.rules[1]}</b>
                    </div>
                  )}
                  {section.forms?.[0] && <code>{section.forms[0]}</code>}
                </button>
              ))}
            </div>

            {conceptTraps.length > 0 && (
              <div className={styles.conceptTraps}>
                <span className="eyebrow">Traps que sí merece la pena memorizar</span>
                <div>{conceptTraps.map((trap) => <p key={trap}>⚠ {trap}</p>)}</div>
              </div>
            )}
          </section>

          <div className={styles.sectionList}>
            {activeTopic.sections.map((section, sectionIndex) => (
              <section className={styles.grammarSection} id={section.id} key={section.id}>
                <div className={styles.sectionTitleRow}>
                  <span>{String(sectionIndex + 1).padStart(2, "0")}</span>
                  <h3>{section.title}</h3>
                </div>

                <div className={styles.rulesBox}>
                  <strong>Explicación</strong>
                  {section.intro && <p>{section.intro}</p>}
                  <ul>{section.rules.map((rule) => <li key={rule}>{rule}</li>)}</ul>
                </div>

                {section.forms && section.forms.length > 0 && (
                  <div className={styles.forms} aria-label="Estructuras">
                    {section.forms.map((form) => <code key={form}>{form}</code>)}
                  </div>
                )}

                {section.examples && section.examples.length > 0 && (
                  <div className={styles.examplesBlock}>
                    <strong>Ejemplos</strong>
                    <div className={styles.examplesGrid}>
                      {section.examples.map((example) => (
                        <div className={styles.example} key={`${example.english}-${example.note ?? ""}`}>
                          <code>{example.english}</code>
                          {example.note && <span>→ {example.note}</span>}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {section.traps && section.traps.length > 0 && (
                  <div className={styles.trapBox}>
                    <strong>Cambridge trap</strong>
                    <ul>{section.traps.map((trap) => <li key={trap}>{trap}</li>)}</ul>
                  </div>
                )}
              </section>
            ))}
          </div>

          <section className={styles.miniTestSection}>
            <div className={styles.miniTestHeading}>
              <span className="eyebrow">Recuperación activa</span>
              <h3>Mini test · {activeTopic.title}</h3>
              <p>{quizQuestions.length} preguntas mezcladas del concepto. Responde sin volver arriba.</p>
            </div>
            <MiniQuiz key={activeTopic.slug} questions={quizQuestions} />
          </section>
        </article>
      </main>
    </div>
  );
}
