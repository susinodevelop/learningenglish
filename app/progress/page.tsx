import type { Metadata } from "next";
import Link from "next/link";
import { ProgressDashboard } from "@/components/progress-dashboard";

export const metadata: Metadata = { title: "Progreso", description: "Consulta tu progreso de aprendizaje y resultados de práctica." };

export default function ProgressPage() {
  return (
    <div className="shell page-shell">
      <header className="page-header compact-header">
        <span className="eyebrow">Tu progreso</span>
        <h1>Haz visible lo que ya estás consolidando.</h1>
        <p>En esta primera versión guardamos tu mejor resultado del juego de vocabulario en el navegador. La arquitectura queda preparada para incorporar perfiles y progreso completo.</p>
      </header>
      <ProgressDashboard />
      <section className="cta-panel">
        <div><span className="eyebrow">Siguiente paso</span><h2>Mejora tu mejor puntuación.</h2></div>
        <Link className="button button-primary" href="/games">Jugar ahora</Link>
      </section>
    </div>
  );
}
