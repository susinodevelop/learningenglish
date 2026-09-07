import type { Metadata } from "next";
import { ExercisesHub } from "@/components/exercises/exercises-hub";
import {
  grammarExerciseConcepts,
  grammarExerciseQuestions,
} from "@/lib/grammar/exercises";
import { vocabularyLexicon, vocabularyTopics } from "@/lib/vocabulary";

export const metadata: Metadata = {
  title: "Ejercicios B2 + C1",
  description: "Practica gramática y vocabulario Cambridge B2 y C1 con ejercicios interactivos y recuperación activa.",
};

export default function GamesPage() {
  const topics = vocabularyTopics.map((topic) => ({
    slug: topic.slug,
    title: `${topic.title} · ${topic.level}`,
  }));

  return (
    <div className="shell page-shell">
      <header className="page-header compact-header">
        <span className="eyebrow">Ejercicios · Cambridge B2 + C1</span>
        <h1>Practica gramática y vocabulario por separado.</h1>
        <p>
          Gramática cubre cada subapartado de la teoría B2 + C1 con práctica por nivel, concepto, regla
          y formato. Vocabulario conserva tus grupos de estudio, filtros, progreso y modos de recuperación.
        </p>
      </header>

      <ExercisesHub
        grammarQuestions={grammarExerciseQuestions}
        grammarConcepts={grammarExerciseConcepts}
        vocabularyLexicon={vocabularyLexicon}
        vocabularyTopics={topics}
      />
    </div>
  );
}
