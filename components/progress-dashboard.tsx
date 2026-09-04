"use client";

import { useEffect, useState } from "react";

const STORAGE_KEY = "learningenglish:vocab-best";

export function ProgressDashboard() {
  const [best, setBest] = useState<number | null>(null);

  useEffect(() => {
    const read = () => setBest(Number(window.localStorage.getItem(STORAGE_KEY) ?? 0));
    read();
    window.addEventListener("learningenglish:progress", read);
    return () => window.removeEventListener("learningenglish:progress", read);
  }, []);

  return (
    <div className="stats-grid">
      <article className="stat-card">
        <span>Mejor vocabulario</span>
        <strong>{best === null ? "—" : `${best}/8`}</strong>
        <small>Guardado en este dispositivo</small>
      </article>
      <article className="stat-card muted-stat">
        <span>Lecciones completadas</span>
        <strong>Próximamente</strong>
        <small>Se activará al añadir cuentas de usuario</small>
      </article>
      <article className="stat-card muted-stat">
        <span>Racha</span>
        <strong>Próximamente</strong>
        <small>Preparado para una fase posterior</small>
      </article>
    </div>
  );
}
