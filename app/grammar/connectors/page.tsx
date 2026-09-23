import type { Metadata } from "next";
import Link from "next/link";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Preposiciones, conjunciones y conectores · B2 + C1",
  description: "Guía práctica para enlazar ideas en inglés: estructura, función, ejemplos traducidos y errores frecuentes de Cambridge B2 y C1.",
};

const sections = [
  { id: "elige", title: "La decisión rápida" },
  { id: "preposiciones", title: "Preposiciones" },
  { id: "conjunciones", title: "Conjunciones" },
  { id: "conectores", title: "Conectores entre frases" },
  { id: "cohesion", title: "Cohesión en un texto" },
  { id: "trampas", title: "Cambridge traps" },
];

const choices = [
  { question: "¿Después viene un nombre o -ing?", answer: "Preposición o locución prepositiva", pattern: "despite + noun / -ing", example: "Despite the rain, we went out.", translation: "A pesar de la lluvia, salimos." },
  { question: "¿Después viene sujeto + verbo?", answer: "Conjunción", pattern: "although + clause", example: "Although it rained, we went out.", translation: "Aunque llovió, salimos." },
  { question: "¿Empieza otra frase que retoma la idea?", answer: "Conector entre oraciones", pattern: "sentence. However, sentence.", example: "It rained. However, we went out.", translation: "Llovió. Sin embargo, salimos." },
];

const relations = [
  { function: "Causa", conjunction: "because / as / since + oración", preposition: "because of / due to + nombre", adverbial: "for this reason", example: "We stayed in because it rained. / We stayed in because of the rain." },
  { function: "Resultado", conjunction: "so + oración", preposition: "—", adverbial: "therefore / consequently / as a result", example: "It rained, so we stayed in. / It rained. Therefore, we stayed in." },
  { function: "Contraste", conjunction: "although / even though / whereas + oración", preposition: "despite / in spite of + nombre o -ing", adverbial: "however / nevertheless / even so", example: "Although it rained, we left. / Despite the rain, we left." },
  { function: "Propósito", conjunction: "so that + sujeto + verbo", preposition: "to / in order to + infinitivo", adverbial: "—", example: "I left early so that I could catch the train. / I left early to catch it." },
  { function: "Condición", conjunction: "if / unless / provided (that) + oración", preposition: "in case of + nombre", adverbial: "otherwise", example: "Unless it rains, we'll walk. / Leave now; otherwise, you'll be late." },
  { function: "Adición", conjunction: "and + elementos paralelos", preposition: "besides / in addition to + nombre o -ing", adverbial: "moreover / furthermore / in addition", example: "Besides studying, she works. / She works. Moreover, she studies." },
];

const traps = [
  { wrong: "Despite it was raining, we went out.", right: "Although it was raining, we went out. / Despite the rain, we went out.", why: "Despite va con un nombre, -ing o the fact that + oración; although introduce una oración directamente." },
  { wrong: "Although I was tired, but I continued.", right: "Although I was tired, I continued. / I was tired, but I continued.", why: "Although y but no se duplican para expresar el mismo contraste." },
  { wrong: "I left early for to catch the train.", right: "I left early to catch the train. / I left early so that I could catch it.", why: "El propósito se expresa con to + infinitivo o so that + oración." },
  { wrong: "I will call you when I will arrive.", right: "I will call you when I arrive.", why: "Después de when o as soon as con sentido futuro, se usa normalmente presente en la subordinada." },
  { wrong: "He wasn't interested. On the contrary, he was too busy.", right: "He wasn't interested. Besides, he was too busy.", why: "On the contrary corrige una afirmación previa: He wasn't bored. On the contrary, he was fascinated." },
  { wrong: "She didn't agree, nor she explained why.", right: "She didn't agree, nor did she explain why.", why: "Tras nor que enlaza una segunda oración, se invierten auxiliar y sujeto." },
];

export default function ConnectorsPage() {
  return (
    <div className="shell page-shell">
      <nav className={styles.breadcrumb} aria-label="Ruta de navegación"><Link href="/grammar">Gramática</Link><span aria-hidden="true">/</span><span>Conectores y enlaces</span></nav>
      <header className={`page-header ${styles.header}`}>
        <span className="eyebrow">Guía práctica · Cambridge B2 + C1</span>
        <h1>Conecta tus ideas.</h1>
        <p>Preposiciones, conjunciones y conectores se parecen en significado, pero piden estructuras diferentes. Esta guía te ayuda a elegirlos al hablar, escribir y resolver ejercicios.</p>
        <div className="hero-actions"><a className="button button-primary" href="#elige">Empezar por la decisión</a><Link className="button button-secondary" href="/games#grammar">Practicar gramática</Link></div>
      </header>

      <nav className={styles.index} aria-label="Apartados de la guía">{sections.map((section) => <a key={section.id} href={`#${section.id}`}>{section.title}</a>)}</nav>

      <section className={styles.section} id="elige" aria-labelledby="elige-title">
        <div className={styles.heading}><span className="eyebrow">01 · Forma antes que traducción</span><h2 id="elige-title">¿Qué viene después del enlace?</h2><p>Para decir «a pesar de», puedes elegir formas distintas. Mira la estructura que sigue al conector antes de decidir.</p></div>
        <div className={styles.choiceGrid}>{choices.map((choice) => <article className={styles.choice} key={choice.question}><h3>{choice.question}</h3><strong>{choice.answer}</strong><code>{choice.pattern}</code><p lang="en">{choice.example}</p><small>{choice.translation}</small></article>)}</div>
        <div className={styles.tip}><strong>Regla de bolsillo</strong><p>Nombre o -ing → preposición. Sujeto + verbo → conjunción. Otra oración completa → linking adverbial con su puntuación.</p></div>
      </section>

      <section className={styles.section} id="preposiciones" aria-labelledby="preposiciones-title">
        <div className={styles.heading}><span className="eyebrow">02 · Relación y combinación fija</span><h2 id="preposiciones-title">Preposiciones</h2><p>Expresan lugar, tiempo, movimiento o una relación exigida por otra palabra. En <em>depend on</em> se aprende el bloque completo: no se traduce palabra a palabra.</p></div>
        <div className={styles.cards}>
          <article className={styles.card}><span className={styles.level}>B2</span><h3>Lugar y tiempo: in / on / at</h3><p><b>in</b> para espacios o periodos amplios; <b>on</b> para superficies y días; <b>at</b> para puntos y horas. El contexto puede cambiar la elección.</p><p lang="en"><code>in Spain · in July · on the table · on Monday · at the station · at 8</code></p><small>en España · en julio · sobre la mesa · el lunes · en la estación · a las ocho</small></article>
          <article className={styles.card}><span className={styles.level}>B2</span><h3>Movimiento y límite</h3><p><b>to</b> indica destino; <b>into</b>, entrada al interior; <b>until</b>, límite temporal; <b>by</b>, fecha límite como muy tarde.</p><p lang="en"><code>She went into the room. · Finish it by Friday. · Stay until Friday.</code></p><small>Entró en la habitación. · Termínalo como muy tarde el viernes. · Quédate hasta el viernes.</small></article>
          <article className={styles.card}><span className={styles.level}>B2 + C1</span><h3>Verb / adjective + preposition</h3><p>Aprende la palabra con su preposición: <b>depend on, apologise for, insist on, interested in, good at</b>. Después de una preposición, un verbo adopta <b>-ing</b>.</p><p lang="en"><code>She&apos;s interested in learning English.</code></p><small>Le interesa aprender inglés.</small></article>
        </div>
      </section>

      <section className={styles.section} id="conjunciones" aria-labelledby="conjunciones-title">
        <div className={styles.heading}><span className="eyebrow">03 · Une oraciones</span><h2 id="conjunciones-title">Conjunciones</h2><p>Las coordinantes unen ideas del mismo nivel; las subordinantes introducen una oración que depende de otra. No todas las palabras que significan «aunque» admiten el mismo patrón.</p></div>
        <div className={styles.cards}>
          <article className={styles.card}><span className={styles.level}>B2</span><h3>Coordinar: and, but, or, so</h3><p><b>and</b> suma, <b>but</b> contrasta, <b>or</b> ofrece alternativa y <b>so</b> introduce un resultado. Entre dos oraciones independientes, suele ir coma antes del enlace.</p><p lang="en"><code>It was late, so we went home.</code></p><small>Era tarde, así que nos fuimos a casa.</small></article>
          <article className={styles.card}><span className={styles.level}>B2 + C1</span><h3>Subordinar: although, because, if, when</h3><p>Introducen <b>sujeto + verbo</b>. Una oración subordinada inicial suele separarse con coma de la principal. <b>Even though</b> habla de un hecho; <b>even if</b>, de una posibilidad.</p><p lang="en"><code>Even though it rained, we went out. · We&apos;ll go even if it rains.</code></p><small>Aunque llovió, salimos. · Iremos incluso si llueve.</small></article>
          <article className={styles.card}><span className={styles.level}>C1</span><h3>Matices: whereas, provided (that), nor</h3><p><b>whereas</b> compara dos realidades; <b>provided (that)</b> fija una condición; <b>nor</b> añade otra idea negativa con inversión auxiliar + sujeto.</p><p lang="en"><code>She accepted, whereas he refused. · He didn&apos;t reply, nor did he apologise.</code></p><small>Ella aceptó, mientras que él se negó. · No respondió ni se disculpó.</small></article>
        </div>
      </section>

      <section className={styles.section} id="conectores" aria-labelledby="conectores-title">
        <div className={styles.heading}><span className="eyebrow">04 · Elige la relación</span><h2 id="conectores-title">Un significado, varias estructuras</h2><p>Esta tabla sirve para decidir entre una conjunción, una preposición u otra estructura y un conector entre oraciones. En propósito, <em>to</em> introduce un infinitivo, no un nombre. El guion indica que esa columna no ofrece una sustitución directa.</p></div>
        <div className={styles.tableScroll}><table className={styles.table}><thead><tr><th scope="col">Función</th><th scope="col">+ oración</th><th scope="col">Otra estructura</th><th scope="col">Entre frases</th><th scope="col">Comparación en contexto</th></tr></thead><tbody>{relations.map((row) => <tr key={row.function}><th scope="row">{row.function}</th><td>{row.conjunction}</td><td>{row.preposition}</td><td>{row.adverbial}</td><td lang="en">{row.example}</td></tr>)}</tbody></table></div>
        <div className={styles.tip}><strong>Puntuación C1</strong><p><em>However, moreover, therefore</em> y otros linking adverbials suelen ir seguidos de coma al inicio de una oración: <span lang="en">The plan is costly. However, it could work.</span> Una coma sola entre dos oraciones completas no basta: usa punto o punto y coma.</p></div>
      </section>

      <section className={styles.section} id="cohesion" aria-labelledby="cohesion-title">
        <div className={styles.heading}><span className="eyebrow">05 · Writing C1</span><h2 id="cohesion-title">Cohesión más allá de moreover</h2><p>Un buen texto también conecta ideas sin repetirlas: referencias claras, sustitución, elipsis y vocabulario relacionado.</p></div>
        <div className={styles.cards}>
          <article className={styles.card}><h3>Referencia</h3><p><b>this, these, it, they</b> remiten a algo anterior. Comprueba que el lector sabe a qué se refieren.</p><p lang="en"><code>The policy changed. This reduced complaints.</code></p><small>Cambió la política. Esto redujo las quejas.</small></article>
          <article className={styles.card}><h3>Sustitución y elipsis</h3><p><b>one / so</b> sustituyen información conocida; la elipsis omite lo que se puede recuperar.</p><p lang="en"><code>Do you need a pen? I have one. · I wanted to go, but I couldn&apos;t.</code></p><small>¿Necesitas un bolígrafo? Tengo uno. · Quería ir, pero no pude.</small></article>
          <article className={styles.card}><h3>Conexión natural</h3><p>Escoge el enlace por su función, no por parecer avanzado. <b>On the other hand</b> presenta otra perspectiva; <b>on the contrary</b> rebate la anterior.</p><p lang="en"><code>It wasn&apos;t a failure. On the contrary, it was a success.</code></p><small>No fue un fracaso. Al contrario, fue un éxito.</small></article>
        </div>
      </section>

      <section className={styles.section} id="trampas" aria-labelledby="trampas-title">
        <div className={styles.heading}><span className="eyebrow">06 · Comprueba la forma</span><h2 id="trampas-title">Cambridge traps frecuentes</h2><p>La mayoría de estos errores aparecen al traducir un conector sin mirar qué estructura exige.</p></div>
        <div className={styles.traps}>{traps.map((trap) => <article className={styles.trap} key={trap.wrong}><p><span>Evita</span><del lang="en">{trap.wrong}</del></p><p><span>Usa</span><strong lang="en">{trap.right}</strong></p><small>{trap.why}</small></article>)}</div>
      </section>

      <aside className={styles.next}><div><span className="eyebrow">Siguiente paso</span><h2>De entenderlo a usarlo</h2><p>En Gramática encontrarás las lecciones completas de <b>Prepositions</b>, <b>Linking words</b> y <b>Cohesion</b> con más ejemplos, y en Ejercicios puedes practicar estas estructuras.</p></div><div className={styles.actions}><Link className="button button-secondary" href="/grammar">Ver teoría completa</Link><Link className="button button-primary" href="/games#grammar">Ir a ejercicios</Link></div></aside>
    </div>
  );
}
