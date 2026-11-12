"use client";

import { useState, type CSSProperties } from "react";
import { platformGroups, type PlatformGroup, type Product } from "@/data/catalog";
import { ProductTile } from "../ProductTile";
import { Row } from "../Row";

/** Spiele-Keys auf schwarzer Fläche mit Filtern als Kapseln. */
export function GamesShowcase({ games }: { games: Product[] }) {
  const [filter, setFilter] = useState<PlatformGroup | "Alle">("Alle");
  const shown = (filter === "Alle" ? games : games.filter((g) => g.platform?.group === filter)).slice(0, 24);

  return (
    <>
      <div className="chips" role="group" aria-label="Plattform">
        {(["Alle", ...platformGroups] as const).map((option) => (
          <button key={option} type="button" className="chip" aria-pressed={filter === option} onClick={() => setFilter(option)}>
            {option}
          </button>
        ))}
      </div>

      {shown.length ? (
        <Row label="Spiele">
          {shown.map((game, i) => (
            <li key={game.slug} data-reveal style={{ "--i": Math.min(i, 4) } as CSSProperties}>
              <ProductTile product={game} />
            </li>
          ))}
        </Row>
      ) : (
        <p className="note gamespanel__empty" role="status">
          <span />
          <span>Spiele für {filter} folgen mit der vollständigen Produktliste.</span>
        </p>
      )}
    </>
  );
}
