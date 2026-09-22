"use client";

import { useEffect, useState } from "react";
import { StudyWorkspace } from "@/components/study/study-workspace";
import type { GrammarExerciseConcept, GrammarExerciseQuestion } from "@/lib/grammar/exercises";
import type { VocabularySense } from "@/lib/vocabulary";
import { GrammarExerciseWorkspace } from "./grammar-exercise-workspace";
import { VerbPatternsWorkspace } from "./verb-patterns-workspace";
import styles from "./exercises.module.css";

type TopicOption = {
  slug: string;
  title: string;
};

type ExercisesHubProps = {
  grammarQuestions: GrammarExerciseQuestion[];
  grammarConcepts: GrammarExerciseConcept[];
  vocabularyLexicon: VocabularySense[];
  vocabularyTopics: TopicOption[];
};

type ExerciseArea = "grammar" | "vocabulary";
type GrammarArea = "general" | "verb-patterns";

function areaFromHash(): ExerciseArea {
  if (typeof window !== "undefined" && window.location.hash === "#vocabulary") return "vocabulary";
  return "grammar";
}

function grammarAreaFromHash(): GrammarArea {
  if (typeof window !== "undefined" && window.location.hash === "#verb-patterns") return "verb-patterns";
  return "general";
}

export function ExercisesHub({
  grammarQuestions,
  grammarConcepts,
  vocabularyLexicon,
  vocabularyTopics,
}: ExercisesHubProps) {
  const [area, setArea] = useState<ExerciseArea>("grammar");
  const [grammarArea, setGrammarArea] = useState<GrammarArea>("general");

  useEffect(() => {
    const syncArea = () => {
      setArea(areaFromHash());
      setGrammarArea(grammarAreaFromHash());
    };
    syncArea();
    window.addEventListener("hashchange", syncArea);
    return () => window.removeEventListener("hashchange", syncArea);
  }, []);

  function chooseArea(nextArea: ExerciseArea) {
    setArea(nextArea);
    if (nextArea === "grammar") {
      setGrammarArea("general");
      window.history.replaceState(null, "", "#grammar");
    } else {
      window.history.replaceState(null, "", "#vocabulary");
    }
  }

  function chooseGrammarArea(nextArea: GrammarArea) {
    setGrammarArea(nextArea);
    window.history.replaceState(null, "", nextArea === "verb-patterns" ? "#verb-patterns" : "#grammar");
  }

  return (
    <>
      <div className={styles.areaTabs} role="tablist" aria-label="Tipo de ejercicios">
        <button
          id="exercise-grammar-tab"
          type="button"
          role="tab"
          aria-selected={area === "grammar"}
          aria-controls="exercise-area-panel"
          className={area === "grammar" ? styles.activeTab : ""}
          onClick={() => chooseArea("grammar")}
        >
          <span className={styles.tabIcon}>Aa</span>
          <span>
            <strong>Gramática</strong>
            <small>B2 + C1 · reglas, formas y estructuras</small>
          </span>
        </button>
        <button
          id="exercise-vocabulary-tab"
          type="button"
          role="tab"
          aria-selected={area === "vocabulary"}
          aria-controls="exercise-area-panel"
          className={area === "vocabulary" ? styles.activeTab : ""}
          onClick={() => chooseArea("vocabulary")}
        >
          <span className={styles.tabIcon}>W</span>
          <span>
            <strong>Vocabulario</strong>
            <small>B2 + C1 · grupos, recuperación y juegos</small>
          </span>
        </button>
      </div>

      <div
        id="exercise-area-panel"
        role="tabpanel"
        aria-labelledby={area === "grammar" ? "exercise-grammar-tab" : "exercise-vocabulary-tab"}
      >
        {area === "grammar" ? (
          <section className={styles.grammarArea}>
            <div className={styles.grammarModeTabs} role="tablist" aria-label="Tipo de práctica gramatical">
              <button
                id="grammar-general-tab"
                type="button"
                role="tab"
                aria-selected={grammarArea === "general"}
                aria-controls="grammar-mode-panel"
                className={grammarArea === "general" ? styles.activeGrammarMode : ""}
                onClick={() => chooseGrammarArea("general")}
              >
                <strong>Práctica general</strong>
                <small>Todo B2 + C1 con filtros por regla y formato</small>
              </button>
              <button
                id="grammar-verb-patterns-tab"
                type="button"
                role="tab"
                aria-selected={grammarArea === "verb-patterns"}
                aria-controls="grammar-mode-panel"
                className={grammarArea === "verb-patterns" ? styles.activeGrammarMode : ""}
                onClick={() => chooseGrammarArea("verb-patterns")}
              >
                <strong>Verb patterns</strong>
                <small>Unit 4 · banco exclusivo de -ing, infinitive y object patterns</small>
              </button>
            </div>

            <div
              id="grammar-mode-panel"
              role="tabpanel"
              aria-labelledby={grammarArea === "general" ? "grammar-general-tab" : "grammar-verb-patterns-tab"}
            >
              {grammarArea === "general" ? (
                <GrammarExerciseWorkspace questions={grammarQuestions} concepts={grammarConcepts} />
              ) : (
                <VerbPatternsWorkspace />
              )}
            </div>
          </section>
        ) : (
          <section className={styles.vocabularyArea}>
            <div className={styles.vocabularyIntro}>
              <span className="eyebrow">Vocabulario · B2 + C1</span>
              <h2>Elige qué vocabulario estudiar y cómo recuperarlo.</h2>
              <p>
                Los grupos trabajan sobre sentidos léxicos estables. Conservamos tus listas y progreso
                local mientras preparamos la sincronización multi-dispositivo.
              </p>
            </div>
            <StudyWorkspace lexicon={vocabularyLexicon} topics={vocabularyTopics} />
          </section>
        )}
      </div>
    </>
  );
}
