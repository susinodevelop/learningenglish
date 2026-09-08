"use client";

import { useEffect, useState } from "react";
import {
  isVocabularyMastered,
  migrateVocabularyProgress,
  STUDY_GROUPS_STORAGE_KEY,
  VOCABULARY_PROGRESS_STORAGE_KEY,
  type StudyGroup,
  type VocabularyProgress,
} from "@/lib/study-groups";
import { initialiseRemoteStudyState } from "@/lib/study-sync-client";
import { vocabularySenses } from "@/lib/vocabulary";

type ProgressDashboardProps = {
  vocabularyTotal: number;
};

type Snapshot = {
  practised: number;
  mastered: number;
  attempts: number;
  correct: number;
  groups: number;
  cloud: boolean;
};

function readJson<T>(raw: string | null, fallback: T): T {
  if (!raw) return fallback;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

function makeSnapshot(progress: VocabularyProgress, groups: StudyGroup[], cloud: boolean): Snapshot {
  const records = Object.values(progress);
  return {
    practised: records.filter((record) => record.attempts > 0).length,
    mastered: records.filter((record) => isVocabularyMastered(record)).length,
    attempts: records.reduce((total, record) => total + record.attempts, 0),
    correct: records.reduce((total, record) => total + record.correct, 0),
    groups: groups.length,
    cloud,
  };
}

export function ProgressDashboard({ vocabularyTotal }: ProgressDashboardProps) {
  const [snapshot, setSnapshot] = useState<Snapshot | null>(null);

  useEffect(() => {
    let cancelled = false;

    const readLocal = () => {
      const rawProgress = readJson<VocabularyProgress>(
        window.localStorage.getItem(VOCABULARY_PROGRESS_STORAGE_KEY),
        {},
      );
      const progress = migrateVocabularyProgress(rawProgress, vocabularySenses);
      const groups = readJson<StudyGroup[]>(
        window.localStorage.getItem(STUDY_GROUPS_STORAGE_KEY),
        [],
      );
      if (!cancelled) setSnapshot(makeSnapshot(progress, groups, false));
      return { progress, groups };
    };

    const sync = async () => {
      const local = readLocal();
      try {
        const remote = await initialiseRemoteStudyState(local.groups, local.progress);
        if (cancelled || !remote.authenticated) return;
        window.localStorage.setItem(STUDY_GROUPS_STORAGE_KEY, JSON.stringify(remote.groups));
        window.localStorage.setItem(VOCABULARY_PROGRESS_STORAGE_KEY, JSON.stringify(remote.progress));
        setSnapshot(makeSnapshot(remote.progress, remote.groups, true));
      } catch (error) {
        console.error("Could not refresh cloud progress", error);
      }
    };

    void sync();
    window.addEventListener("learningenglish:progress", readLocal);
    window.addEventListener("learningenglish:study-groups", readLocal);
    return () => {
      cancelled = true;
      window.removeEventListener("learningenglish:progress", readLocal);
      window.removeEventListener("learningenglish:study-groups", readLocal);
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
        <small>
          {snapshot === null
            ? "Cargando progreso"
            : `${snapshot.attempts} intentos · ${snapshot.groups} grupos · ${snapshot.cloud ? "Supabase" : "este dispositivo"}`}
        </small>
      </article>
    </div>
  );
}
