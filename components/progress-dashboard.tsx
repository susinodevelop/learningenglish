"use client";

import { useEffect, useState } from "react";
import {
  isVocabularyMastered,
  STUDY_GROUPS_STORAGE_KEY,
  VOCABULARY_PROGRESS_STORAGE_KEY,
  type StudyGroup,
  type VocabularyProgress,
} from "@/lib/study-groups";

type ProgressDashboardProps = {
  vocabularyTotal: number;
};

type Snapshot = {
  practised: number;
  mastered: number;
  attempts: number;
  correct: number;
  groups: number;
};

function readJson<T>(raw: string | null, fallback: T): T {
  if (!raw) return fallback;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

export function ProgressDashboard({ vocabularyTotal }: ProgressDashboardProps) {
  const [snapshot, setSnapshot] = useState<Snapshot | null>(null);

  useEffect(() => {
    const read = () => {
      const progress = readJson<VocabularyProgress>(
        window.localStorage.getItem(VOCABULARY_PROGRESS_STORAGE_KEY),
        {},
      );
      const groups = readJson<StudyGroup[]>(
        window.localStorage.getItem(STUDY_GROUPS_STORAGE_KEY),
        [],
      );
      const records = Object.values(progress);

      setSnapshot({
        practised: records.filter((record) => record.attempts > 0).length,
        mastered: records.filter((record) => isVocabularyMastered(record)).length,
        attempts: records.reduce((total, record) => total + record.attempts, 0),
        correct: records.reduce((total, record) => total + record.correct, 0),
        groups: Array.isArray(groups) ? groups.length : 0,
      });
    };

    read();
    window.addEventListener("learningenglish:progress", read);
    window.addEventListener("learningenglish:study-groups", read);
    return () => {
      window.removeEventListener("learningenglish:progress", read);
      window.removeEventListener("learningenglish:study-groups", read);
    };
  }, []);

  const accuracy = snapshot && snapshot.attempts > 0
    ? Math.round((snapshot.correct / snapshot.attempts) * 100)
    : 0;

  return (
    <div className="stats-grid">
      <article className="stat-card">
        <span>Vocabulario practicado</span>
        <strong>{snapshot === null ? "—" : `${snapshot.practised}/${vocabularyTotal}`}</strong>
        <small>Sentidos léxicos con al menos un intento</small>
      </article>
      <article className="stat-card">
        <span>Consolidado</span>
        <strong>{snapshot === null ? "—" : snapshot.mastered}</strong>
        <small>≥ 3 aciertos seguidos y ≥ 80% de precisión</small>
      </article>
      <article className="stat-card">
        <span>Precisión global</span>
        <strong>{snapshot === null ? "—" : `${accuracy}%`}</strong>
        <small>{snapshot === null ? "Guardado en este dispositivo" : `${snapshot.attempts} intentos · ${snapshot.groups} grupos propios`}</small>
      </article>
    </div>
  );
}
