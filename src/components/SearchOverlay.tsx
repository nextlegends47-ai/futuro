"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { categories, categoryHref, metaLine, popularProducts, priceLabel, productHref, type Product } from "@/data/catalog";
import { features } from "@/config/site";
import { searchCatalog } from "@/lib/search";
import { closePanel, panelStore, useStore } from "@/lib/store";
import { ProductArt } from "./Art";
import { Icon } from "./Icon";
import { Sheet } from "./Sheet";

function Hits({ products, two = false }: { products: Product[]; two?: boolean }) {
  return (
    <ul className={`search__list${two ? " search__list--two" : ""}`}>
      {products.map((p) => {
        const price = priceLabel(p);
        return (
          <li key={p.slug}>
            <Link className="hit" href={productHref(p)} onClick={closePanel}>
              <span className="hit__art">
                <ProductArt product={p} />
              </span>
              <span>
                <span className="hit__name">{p.name}</span>
                <span className="hit__meta">{metaLine(p)}</span>
              </span>
              {price ? <span className="price">{price}</span> : null}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

function CategoryChips() {
  return (
    <div className="search__cats">
      {categories
        .filter((c) => c.slug !== "handy-aufladen" || features.topup)
        .map((c) => (
          <Link key={c.slug} className="chip" href={categoryHref(c.slug)} onClick={closePanel}>
            {c.name}
          </Link>
        ))}
    </div>
  );
}

/** Großes Suchfeld über der Seite. Treffer erscheinen schon beim Tippen. */
export function SearchOverlay() {
  const open = useStore(panelStore) === "search";
  const router = useRouter();
  const [query, setQuery] = useState("");
  const trimmed = query.trim();
  const result = useMemo(() => searchCatalog(trimmed), [trimmed]);

  useEffect(() => {
    if (!open) setQuery("");
  }, [open]);

  return (
    <Sheet open={open} onClose={closePanel} className="sheet--top" label="Suche">
      <form
        className="search__bar"
        role="search"
        action="/suche"
        onSubmit={(event) => {
          event.preventDefault();
          if (!trimmed) return;
          closePanel();
          router.push(`/suche?q=${encodeURIComponent(trimmed)}`);
        }}
      >
        <div className="search__field">
          <Icon name="search" />
          <input
            className="input"
            type="search"
            name="q"
            data-autofocus
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Marke, Spiel oder Gutschein suchen"
            aria-label="Marke, Spiel oder Gutschein suchen"
            autoComplete="off"
            autoCorrect="off"
            spellCheck={false}
            enterKeyHint="search"
          />
        </div>
        <button type="button" className="iconbtn" aria-label="Suche schließen" onClick={closePanel}>
          <Icon name="x" />
        </button>
      </form>

      <div className="search__content">
        <p className="sr-only" role="status">
          {trimmed ? `${result.products.length} Treffer` : ""}
        </p>
        {!trimmed ? (
          <>
            <h2 className="search__label">Beliebte Marken</h2>
            <Hits products={popularProducts.slice(0, 6)} two />
            <h2 className="search__label">Kategorien</h2>
            <CategoryChips />
          </>
        ) : result.products.length ? (
          <>
            <Hits products={result.products.slice(0, 8)} two />
            {result.categories.length ? (
              <>
                <h2 className="search__label">Kategorien</h2>
                <div className="search__cats">
                  {result.categories.map((c) => (
                    <Link key={c.slug} className="chip" href={categoryHref(c.slug)} onClick={closePanel}>
                      {c.name}
                    </Link>
                  ))}
                </div>
              </>
            ) : null}
          </>
        ) : (
          <>
            <p className="search__empty">Kein Treffer für „{trimmed}“. Probier einen anderen Namen oder eine dieser Marken.</p>
            {result.categories.length ? (
              <div className="search__cats" style={{ marginTop: 12 }}>
                {result.categories.map((c) => (
                  <Link key={c.slug} className="chip" href={categoryHref(c.slug)} onClick={closePanel}>
                    {c.name}
                  </Link>
                ))}
              </div>
            ) : null}
            <h2 className="search__label">Beliebte Marken</h2>
            <Hits products={popularProducts.slice(0, 6)} two />
          </>
        )}
      </div>
    </Sheet>
  );
}
