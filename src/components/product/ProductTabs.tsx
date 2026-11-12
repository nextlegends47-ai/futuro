"use client";

import { useId, useState, type KeyboardEvent, type ReactNode } from "react";

export interface TabItem {
  label: string;
  content: ReactNode;
}

/** Reiter mit drei Texten: „Beschreibung“, „Einlösen“ und „Hinweise“. Mit den Pfeiltasten bedienbar. */
export function ProductTabs({ tabs }: { tabs: TabItem[] }) {
  const [active, setActive] = useState(0);
  const id = useId();

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const delta = event.key === "ArrowRight" ? 1 : event.key === "ArrowLeft" ? -1 : 0;
    if (!delta) return;
    event.preventDefault();
    const next = (active + delta + tabs.length) % tabs.length;
    setActive(next);
    document.getElementById(`${id}-tab-${next}`)?.focus();
  };

  return (
    <div className="tabs">
      <div className="tabs__list" role="tablist" aria-label="Mehr zum Produkt" onKeyDown={onKeyDown}>
        {tabs.map((tab, i) => (
          <button
            key={tab.label}
            type="button"
            role="tab"
            id={`${id}-tab-${i}`}
            className="chip"
            aria-selected={active === i}
            aria-controls={`${id}-panel-${i}`}
            tabIndex={active === i ? 0 : -1}
            onClick={() => setActive(i)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      {tabs.map((tab, i) => (
        <div key={tab.label} role="tabpanel" id={`${id}-panel-${i}`} aria-labelledby={`${id}-tab-${i}`} className="tabs__panel" hidden={active !== i} tabIndex={0}>
          {tab.content}
        </div>
      ))}
    </div>
  );
}
