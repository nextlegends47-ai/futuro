"use client";

import { openPanel } from "@/lib/store";

/** Öffnet die Suche über der Seite. Ohne Skript führt der Knopf zur Suchseite. */
export function SearchButton() {
  return (
    <a
      className="btn btn--lg btn--outline"
      href="/suche"
      onClick={(event) => {
        event.preventDefault();
        openPanel("search");
      }}
    >
      Suchen
    </a>
  );
}
