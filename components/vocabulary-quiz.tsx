"use client";

import { useState } from "react";

const questions = [
  { word: "reliable", prompt: "Someone you can trust to do what they promised.", options: ["fiable", "tímido", "ruidoso", "apresurado"], answer: "fiable" },
  { word: "deadline", prompt: "The latest time by which something must be finished.", options: ["descanso", "plazo límite", "turno", "sueldo"], answer: "plazo límite" },
  { word: "compelling", prompt: "Very interesting or persuasive; able to hold your attention.", options: ["convincente", "predecible", "innecesario", "frágil"], answer: "convincente" },
  { word: "chores", prompt: "Regular small jobs, especially around the home.", options: ["recados", "tareas domésticas", "aficiones", "deudas"], answer: "tareas domésticas" },
  { word: "subtle", prompt: "Not obvious; delicate and difficult to notice.", options: ["sutil", "enorme", "rápido", "exacto"], answer: "sutil" },
  { word: "workload", prompt: "The amount of work a person has to do.", options: ["carga de trabajo", "horario", "ascenso", "contrato"], answer: "carga de trabajo" },
  { word: "plausible", prompt: "Seeming reasonable or likely to be true.", options: ["plausible", "obligatorio", "agotador", "casual"], answer: "plausible" },
  { word: "stubborn", prompt: "Unwilling to change your opinion or decision.", options: ["terco", "generoso", "prudente", "sociable"], answer: "terco" },
];

const STORAGE_KEY = "learningenglish:vocab-best";

export function VocabularyQuiz() {
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [finished, setFinished] = useState(false);
  const question = questions[index];

  function choose(option: string) {
    if (selected) return;
    setSelected(option);
    if (option === question.answer) setScore((current) => current + 1);
  }

  function next() {
    if (!selected) return;
    if (index === questions.length - 1) {
      setFinished(true);
      const best = Number(window.localStorage.getItem(STORAGE_KEY) ?? 0);
      window.localStorage.setItem(STORAGE_KEY, String(Math.max(best, score)));
      window.dispatchEvent(new Event("learningenglish:progress"));
      return;
    }
    setIndex((current) => current + 1);
    setSelected(null);
  }

  function restart() {
    setIndex(0);
    setScore(0);
    setSelected(null);
    setFinished(false);
  }

  if (finished) {
    return (
      <section className="quiz-card quiz-result" aria-live="polite">
        <span className="eyebrow">Resultado</span>
        <h2>{score}/{questions.length}</h2>
        <p>{score >= 7 ? "Muy buen nivel. Prueba otra ronda para consolidarlo." : "Buen punto de partida. Repite las palabras que más te hayan costado."}</p>
        <button className="button button-primary" onClick={restart}>Jugar otra vez</button>
      </section>
    );
  }

  return (
    <section className="quiz-card" aria-labelledby="quiz-title">
      <div className="quiz-topline">
        <span className="eyebrow">Pregunta {index + 1} de {questions.length}</span>
        <strong>{score} puntos</strong>
      </div>
      <div className="progress-track" aria-hidden="true"><span style={{ width: `${((index + 1) / questions.length) * 100}%` }} /></div>
      <p className="quiz-word" id="quiz-title">{question.word}</p>
      <p className="quiz-prompt">{question.prompt}</p>
      <div className="answers">
        {question.options.map((option) => {
          const isSelected = selected === option;
          const isCorrect = selected !== null && option === question.answer;
          const className = ["answer-button", isSelected ? "selected" : "", isCorrect ? "correct" : "", isSelected && !isCorrect ? "wrong" : ""].filter(Boolean).join(" ");
          return <button className={className} key={option} onClick={() => choose(option)} disabled={selected !== null}>{option}</button>;
        })}
      </div>
      {selected && (
        <div className="quiz-feedback" aria-live="polite">
          <span>{selected === question.answer ? "✓ Correcto" : `✕ La respuesta era “${question.answer}”.`}</span>
          <button className="button button-primary" onClick={next}>{index === questions.length - 1 ? "Ver resultado" : "Siguiente"}</button>
        </div>
      )}
    </section>
  );
}
