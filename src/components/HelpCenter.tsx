"use client";

import { useMemo, useState } from "react";
import { faqTopics, faqs } from "@/data/catalog";
import { FaqList } from "./Faq";
import { Icon } from "./Icon";

const ALL = "Alle Fragen";

const norm = (s: string) =>
  s
    .toLowerCase()
    .replace(/ß/g, "ss")
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "");

/** Suche und Themen filtern die Fragen schon beim Tippen. */
export function HelpCenter() {
  const [query, setQuery] = useState("");
  const [topic, setTopic] = useState<string>(ALL);

  const items = useMemo(() => {
    const tokens = norm(query).split(/\s+/).filter(Boolean);
    return faqs.filter((item) => (topic === ALL || item.topic === topic) && tokens.every((t) => norm(`${item.q} ${item.a}`).includes(t)));
  }, [query, topic]);

  return (
    <>
      <div className="help__search" role="search">
        <Icon name="search" />
        <input
          className="input"
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Frage suchen, z. B. einlösen"
          aria-label="Frage suchen"
          autoComplete="off"
          enterKeyHint="search"
        />
      </div>

      <div className="topics" role="group" aria-label="Themen">
        {[ALL, ...faqTopics].map((name) => (
          <button key={name} type="button" className="topic" aria-pressed={topic === name} onClick={() => setTopic(name)}>
            {name}
          </button>
        ))}
      </div>

      <div style={{ marginTop: 20 }}>
        <p className="sr-only" role="status">
          {items.length} {items.length === 1 ? "Frage" : "Fragen"}
        </p>
        {items.length ? (
          <FaqList items={items} />
        ) : (
          <div className="empty" style={{ maxWidth: 880 }}>
            <h2>Keine passende Frage gefunden</h2>
            <p>Probier ein anderes Wort oder schreib uns eine E-Mail. Wir helfen dir weiter.</p>
          </div>
        )}
      </div>
    </>
  );
}
