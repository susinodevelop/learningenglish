"use client";

import { useState } from "react";
import type { GrammarTopic } from "@/lib/content";

type GrammarBrowserProps = {
  topics: GrammarTopic[];
};

export function GrammarBrowser({ topics }: GrammarBrowserProps) {
  const [activeSlug, setActiveSlug] = useState(topics[0]?.slug ?? "");
  const activeTopic = topics.find((topic) => topic.slug === activeSlug) ?? topics[0];
  const activeIndex = Math.max(0, topics.findIndex((topic) => topic.slug === activeTopic?.slug));

  if (!activeTopic) return null;

  return (
    <div className="grammar-layout">
      <aside className="grammar-sidebar" aria-label="Temas de gramática">
        <div className="grammar-sidebar-heading">
          <span className="eyebrow">Temario</span>
          <strong>{topics.length} temas</strong>
        </div>

        <nav className="grammar-sidebar-nav">
          {topics.map((topic, index) => {
            const isActive = topic.slug === activeTopic.slug;

            return (
              <button
                type="button"
                className={`grammar-topic-button${isActive ? " active" : ""}`}
                key={topic.slug}
                onClick={() => setActiveSlug(topic.slug)}
                aria-current={isActive ? "page" : undefined}
              >
                <span className="grammar-topic-number">{String(index + 1).padStart(2, "0")}</span>
                <span className="grammar-topic-copy">
                  <strong>{topic.title}</strong>
                  <small>{topic.level}</small>
                </span>
              </button>
            );
          })}
        </nav>
      </aside>

      <main className="grammar-content" aria-live="polite">
        <article className="grammar-lesson-card" key={activeTopic.slug}>
          <div className="grammar-lesson-meta">
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
