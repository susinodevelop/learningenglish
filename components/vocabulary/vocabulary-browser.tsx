"use client";

import type { VocabularyCategory, VocabularyStudyTopic } from "@/lib/vocabulary";

type VocabularyBrowserProps = {
  categories: VocabularyCategory[];
  topics: VocabularyStudyTopic[];
  entryCount: number;
};

/**
 * Legacy compatibility component kept while routes migrate to VocabularyExplorer.
 * New learner-facing vocabulary navigation lives in vocabulary-explorer.tsx.
 */
export function VocabularyBrowser({ categories, topics, entryCount }: VocabularyBrowserProps) {
  return (
    <section aria-label="Índice de vocabulario">
      <p>{categories.length} áreas · {topics.length} temas · {entryCount} fichas</p>
    </section>
  );
}
