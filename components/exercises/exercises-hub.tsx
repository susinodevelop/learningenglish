"use client";

import { useState } from "react";
import { StudyWorkspace } from "@/components/study/study-workspace";
import type { GrammarExerciseConcept, GrammarExerciseQuestion } from "@/lib/grammar/exercises";
import type { VocabularyLexeme } from "@/lib/vocabulary";
import { GrammarExerciseWorkspace } from "./grammar-exercise-workspace";
import styles from "./exercises.module.css";

type TopicOption = {
  slug: string;
  title: string;
};

type ExercisesHubProps = {
  grammarQuestions: GrammarExerciseQuestion[];
  grammarConcepts: GrammarExerciseConcept[];
  vocabularyLexicon: VocabularyLexeme[];
  vocabularyTopics: TopicOption[];
};

type ExerciseArea = "grammar" | "vocabulary";

export function ExercisesHub({
  grammarQuestions,
  grammarConcepts,
  vocabularyLexicon,
  vocabularyTopics,
}: ExercisesHubProps) {
  const [area, setArea] = useState<ExerciseArea>("grammar");

  return (
    <>
      <div className={styles.areaTabs} role="tablist" aria-label="Tipo de ejercicios">
        <button
          type="button"
          role="tab"
          aria-selected={area === "grammar"}
          className={area === "grammar" ? styles.activeTab : ""}
          onClick={() => setArea("grammar")}
        >
          <span className={styles.tabIcon}>Aa</span>
          <span>
            <strong>Gramática</strong>
            <small>B2 + C1 · reglas, formas y estructuras</small>
          </span>
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={area === "vocabulary"}
          className={area === "vocabulary" ? styles.activeTab : ""}
          onClick={() => setArea("vocabulary")}
        >
          <span className={styles.tabIcon}>W</span>
          <span>
            <strong>Vocabulario</strong>
            <small>B2 + C1 · grupos, recuperación y juegos</small>
          </span>
        </button>
      </div>

      <div role="tabpanel">
        {area === "grammar" ? (
          <GrammarExerciseWorkspace questions={grammarQuestions} concepts={grammarConcepts} />
        ) : (
          <section className={styles.vocabularyArea}>
            <div className={styles.vocabularyIntro}>
              <span className="eyebrow">Vocabulario · B2 + C1</span>
              <h2>Elige qué vocabulario estudiar y cómo recuperarlo.</h2>
              <p>
                Conservamos los grupos estáticos y dinámicos, el progreso y todos los modos de práctica
                que ya tenías. Solo cambia su lugar dentro de la nueva sección de Ejercicios.
              </p>
            </div>
            <StudyWorkspace lexicon={vocabularyLexicon} topics={vocabularyTopics} />
          </section>
        )}
      </div>
    </>
  );
}
