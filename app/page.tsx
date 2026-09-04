import Link from "next/link";

const areas = [
  { href: "/grammar", icon: "Aa", title: "Gramática", text: "Explicaciones lógicas, ejemplos y patrones desde las bases hasta C1.", meta: "6 temas iniciales" },
  { href: "/vocabulary", icon: "W", title: "Vocabulario", text: "Palabras por contexto, nivel y uso real para que no estudies listas aisladas.", meta: "4 packs iniciales" },
  { href: "/games", icon: "▶", title: "Juegos", text: "Practica de forma activa con quizzes y actividades que iremos ampliando.", meta: "Quiz disponible" },
  { href: "/progress", icon: "↗", title: "Progreso", text: "Consulta tus mejores resultados y, más adelante, tu evolución completa.", meta: "Progreso local" },
];

export default function Home() {
  return (
    <>
      <section className="hero">
        <div className="shell hero-grid">
          <div className="hero-copy">
            <span className="eyebrow">Tu repositorio de inglés</span>
            <h1>Entiende el inglés.<br /><em>Después, úsalo.</em></h1>
            <p>Gramática explicada con lógica, vocabulario útil y práctica interactiva en un mismo sitio. Diseñado para avanzar desde las bases hasta un nivel avanzado.</p>
            <div className="hero-actions">
              <Link className="button button-primary" href="/grammar">Empezar por gramática</Link>
              <Link className="button button-secondary" href="/games">Practicar jugando</Link>
            </div>
            <div className="hero-points" aria-label="Características">
              <span>✓ Por niveles</span><span>✓ Explicaciones claras</span><span>✓ Práctica activa</span>
            </div>
          </div>
          <aside className="hero-panel" aria-label="Ruta recomendada">
            <span className="eyebrow">Ruta recomendada</span>
            <h2>Hoy: Verb patterns</h2>
            <p>Uno de los puntos que más errores genera cuando pasas de B2 a C1.</p>
            <ol className="route-list">
              <li><span>01</span><div><strong>Comprende el patrón</strong><small>Por qué aparece -ing, to o infinitivo sin to.</small></div></li>
              <li><span>02</span><div><strong>Mira ejemplos reales</strong><small>Contrasta estructuras que parecen iguales.</small></div></li>
              <li><span>03</span><div><strong>Practica</strong><small>Convierte la regla en una decisión automática.</small></div></li>
            </ol>
            <Link className="text-link" href="/grammar#verb-patterns">Ir a Verb patterns →</Link>
          </aside>
        </div>
      </section>

      <section className="section shell">
        <div className="section-heading">
          <div><span className="eyebrow">Explora</span><h2>Todo el material, bien ordenado</h2></div>
          <p>La web crecerá por módulos para que encontrar y repasar contenido siga siendo rápido aunque haya cientos de recursos.</p>
        </div>
        <div className="area-grid">
          {areas.map((area) => (
            <Link className="area-card" href={area.href} key={area.href}>
              <div className="area-icon">{area.icon}</div>
              <span className="card-meta">{area.meta}</span>
              <h3>{area.title}</h3>
              <p>{area.text}</p>
              <span className="card-arrow">Abrir sección →</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="section section-soft">
        <div className="shell focus-grid">
          <div><span className="eyebrow">Método</span><h2>No memorices una regla si puedes entender la decisión.</h2></div>
          <div className="focus-copy"><p>Cuando una estructura tiene una razón, recordarla deja de depender de una lista. Por eso cada tema parte de una idea mental sencilla y después baja a forma, uso, ejemplos y errores frecuentes.</p><Link className="text-link" href="/grammar">Ver cómo explicamos la gramática →</Link></div>
        </div>
      </section>
    </>
  );
}
