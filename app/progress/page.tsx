import type { Metadata } from "next";
import Link from "next/link";
import { ProgressDashboard } from "@/components/progress-dashboard";
import { vocabularySenseCount } from "@/lib/vocabulary";

export const metadata: Metadata = {
  title: "Progreso",
  description: "Consulta tu progreso de vocabulario, precisión y términos consolidados.",
};

export default function ProgressPage() {
  return (
    <div className="shell page-shell">
      <header className="page-header compact-header">
        <span className="eyebrow">Tu progreso</span>
        <h1>Haz visible lo que ya estás consolidando.</h1>
        <p>
          Cada respuesta de los modos de estudio actualiza el progreso del término en este dispositivo.
          Ese mismo progreso alimenta grupos dinámicos como “Errores pendientes” y “Sin practicar”.
        </p>
      </header>
      <ProgressDashboard vocabularyTotal={vocabularySenseCount} />
      <section className="cta-panel">
        <div>
          <span className="eyebrow">Repaso inteligente</span>
          <h2>Abre un grupo dinámico y céntrate justo en lo que todavía no está consolidado.</h2>
        </div>
        <Link className="button button-primary" href="/games">Estudiar ahora</Link>
      </section>
    </div>
  );
}
