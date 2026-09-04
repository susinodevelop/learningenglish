"use client";

import { useState } from "react";
import type { GrammarTopic } from "@/lib/content";
import styles from "./grammar-browser.module.css";

type GrammarBrowserProps = {
  topics: GrammarTopic[];
};

export function GrammarBrowser({ topics }: GrammarBrowserProps) {
  const [activeSlug, setActiveSlug] = useState(topics[0]?.slug ?? "");
  const activeTopic = topics.find((topic) => topic.slug === activeSlug) ?? topics[0];
  const activeIndex = Math.max(0, topics.findIndex((topic) => topic.slug === activeTopic?.slug));

  if (!activeTopic) return null;

  return (
    <div className={styles.layout}>
      <aside className={styles.sidebar} aria-label="Temas de gramática">
        <div className={styles.sidebarHeading}>
          <span className="eyebrow">Temario</span>
          <strong>{topics.length} temas</strong>
        </div>

        <nav className={styles.nav}>
          {topics.map((topic, index) => {
            const isActive = topic.slug === activeTopic.slug;

            return (
              <button
                type="button"
                className={`${styles.topicButton}${isActive ? ` ${styles.active}` : ""}`}
                key={topic.slug}
                onClick={() => setActiveSlug(topic.slug)}
                aria-current={isActive ? "page" : undefined}
              >
                <span className={styles.number}>{String(index + 1).padStart(2, "0")}</span>
                <span className={styles.copy}>
                  <strong>{topic.title}</strong>
                  <small>{topic.level}</small>
                </span>
              </button>
            );
          })}
        </nav>
      </aside>

      <main className={styles.content} aria-live="polite">
        <article className={styles.lessonCard} key={activeTopic.slug}>
          <div className={styles.lessonMeta}>
            <span className="lesson-number">{String(activeIndex + 1).padStart(2, "0")}</span>
            <span className="level-pill">{activeTopic.level}</span>
          </div>

          <h2>{activeTopic.title}</h2>
          <p className="lesson-summary">{activeTopic.summary}</p>

          <div className="logic-box">
            <strong>La lógica</strong>
            <p>{activeTopic.rule}</p>
          </div>

          <div className="examples">
            <strong>Ejemplos</strong>
            {activeTopic.examples.map((example) => <code key={example}>{example}</code>)}
          </div>
        </article>
      </main>
    </div>
  );
}
