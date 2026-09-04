"use client";

import { useState } from "react";
import type { GrammarTopic } from "@/lib/grammar";
import styles from "./grammar-browser.module.css";

type GrammarBrowserProps = {
  topics: GrammarTopic[];
};

export function GrammarBrowser({ topics }: GrammarBrowserProps) {
  const [activeSlug, setActiveSlug] = useState(topics[0]?.slug ?? "");
  const activeTopic = topics.find((topic) => topic.slug === activeSlug) ?? topics[0];

  if (!activeTopic) return null;

  return (
    <div className={styles.layout}>
      <aside className={styles.sidebar} aria-label="Unidades de gramática B2">
        <div className={styles.sidebarHeading}>
          <div>
            <span className="eyebrow">Grammar syllabus</span>
            <strong>Cambridge B2</strong>
          </div>
          <span>{topics.length} unidades</span>
        </div>

        <nav className={styles.nav}>
          {topics.map((topic) => {
            const isActive = topic.slug === activeTopic.slug;

            return (
              <button
                type="button"
                className={`${styles.topicButton}${isActive ? ` ${styles.active}` : ""}`}
                key={topic.slug}
                onClick={() => setActiveSlug(topic.slug)}
                aria-current={isActive ? "page" : undefined}
              >
                <span className={styles.number}>{String(topic.unit).padStart(2, "0")}</span>
                <span className={styles.copy}>
                  <strong>{topic.title}</strong>
                  <small>{topic.sections.length} apartados · {topic.level}</small>
                </span>
              </button>
            );
          })}
        </nav>
      </aside>

      <main className={styles.content} aria-live="polite">
        <article className={styles.lessonCard} key={activeTopic.slug}>
          <header className={styles.lessonHeader}>
            <div className={styles.lessonMeta}>
              <span className={styles.unitLabel}>Unit {String(activeTopic.unit).padStart(2, "0")}</span>
              <span className="level-pill">{activeTopic.level}</span>
            </div>
            <h2>{activeTopic.title}</h2>
            <p className={styles.summary}>{activeTopic.summary}</p>
            <div className={styles.examBadge}>
              <span>Exam practice del libro</span>
              <strong>{activeTopic.examPractice}</strong>
            </div>
          </header>

          <div className={styles.sectionList}>
            {activeTopic.sections.map((section, sectionIndex) => (
              <section className={styles.grammarSection} key={`${activeTopic.slug}-${section.title}`}>
                <div className={styles.sectionTitleRow}>
                  <span>{String(sectionIndex + 1).padStart(2, "0")}</span>
                  <h3>{section.title}</h3>
                </div>

                {section.intro && <p className={styles.sectionIntro}>{section.intro}</p>}

                {section.forms && section.forms.length > 0 && (
                  <div className={styles.forms} aria-label="Estructuras">
                    {section.forms.map((form) => <code key={form}>{form}</code>)}
                  </div>
                )}

                <div className={styles.rulesBox}>
                  <strong>Cómo funciona</strong>
                  <ul>
                    {section.rules.map((rule) => <li key={rule}>{rule}</li>)}
                  </ul>
                </div>

                {section.examples && section.examples.length > 0 && (
                  <div className={styles.examplesBlock}>
                    <strong>Ejemplos</strong>
                    <div className={styles.examplesGrid}>
                      {section.examples.map((example) => (
                        <div className={styles.example} key={`${example.english}-${example.note ?? ""}`}>
                          <code>{example.english}</code>
                          {example.note && <span>{example.note}</span>}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {section.traps && section.traps.length > 0 && (
                  <div className={styles.trapBox}>
                    <strong>Cambridge trap</strong>
                    <ul>
                      {section.traps.map((trap) => <li key={trap}>{trap}</li>)}
                    </ul>
                  </div>
                )}
              </section>
            ))}
          </div>
        </article>
      </main>
    </div>
  );
}
