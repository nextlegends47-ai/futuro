"use client";

import { useMemo, useState, type CSSProperties } from "react";
import { minPrice, platformGroups, type PlatformGroup, type Product } from "@/data/catalog";
import { ProductTile } from "./ProductTile";

const PAGE = 20;

const sorts = [
  { id: "beliebt", label: "Beliebt" },
  { id: "az", label: "A bis Z" },
  { id: "preis", label: "Günstigster Preis" },
] as const;

type Sort = (typeof sorts)[number]["id"];

/**
 * Raster einer Kategorie: sortieren, bei Spielen nach Plattform filtern.
 * Lange Listen laden nicht endlos nach, am Ende steht „Mehr anzeigen“.
 */
export function Listing({ products, count, withPlatforms = false }: { products: Product[]; count: string; withPlatforms?: boolean }) {
  const [sort, setSort] = useState<Sort>("beliebt");
  const [platform, setPlatform] = useState<PlatformGroup | "Alle">("Alle");
  const [limit, setLimit] = useState(PAGE);

  const list = useMemo(() => {
    const filtered = platform === "Alle" ? products : products.filter((p) => p.platform?.group === platform);
    if (sort === "az") return [...filtered].sort((a, b) => a.name.localeCompare(b.name, "de"));
    if (sort === "preis") return [...filtered].sort((a, b) => (minPrice(a) ?? Infinity) - (minPrice(b) ?? Infinity));
    return filtered;
  }, [products, sort, platform]);

  const shown = list.slice(0, limit);

  return (
    <>
      <div className="listing__bar">
        <p className="listing__count">{count}</p>
        <div className="listing__sort" role="group" aria-label="Sortieren">
          {sorts.map((option) => (
            <button key={option.id} type="button" className="chip" aria-pressed={sort === option.id} onClick={() => setSort(option.id)}>
              {option.label}
            </button>
          ))}
        </div>
      </div>

      {withPlatforms ? (
        <div className="chips listing__filters" role="group" aria-label="Plattform">
          {(["Alle", ...platformGroups] as const).map((option) => (
            <button
              key={option}
              type="button"
              className="chip"
              aria-pressed={platform === option}
              onClick={() => {
                setPlatform(option);
                setLimit(PAGE);
              }}
            >
              {option}
            </button>
          ))}
        </div>
      ) : null}

      {shown.length ? (
        <ul className="grid">
          {shown.map((product, i) => (
            <li key={product.slug} data-reveal style={{ "--i": i % 5 } as CSSProperties}>
              <ProductTile product={product} as="h2" />
            </li>
          ))}
        </ul>
      ) : (
        <div className="empty" role="status">
          <h2>Hier folgen Produkte</h2>
          <p>{platform === "Alle" ? "Die Produkte dieser Kategorie kommen mit der vollständigen Produktliste." : `Spiele für ${platform} kommen mit der vollständigen Produktliste.`}</p>
        </div>
      )}

      {list.length > limit ? (
        <div className="listing__more">
          <p className="fine">
            {shown.length} von {list.length}
          </p>
          <button type="button" className="btn btn--soft" onClick={() => setLimit((n) => n + PAGE)}>
            Mehr anzeigen
          </button>
        </div>
      ) : null}
    </>
  );
}
