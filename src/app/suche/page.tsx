import type { Metadata } from "next";
import Link from "next/link";
import type { CSSProperties } from "react";
import { Crumbs } from "@/components/Crumbs";
import { Icon } from "@/components/Icon";
import { ProductTile } from "@/components/ProductTile";
import { Title } from "@/components/Title";
import { categoryHref, popularProducts } from "@/data/catalog";
import { searchCatalog } from "@/lib/search";

export const metadata: Metadata = { title: "Suche", robots: { index: false, follow: true } };

export default async function SearchPage({ searchParams }: { searchParams: Promise<{ q?: string | string[] }> }) {
  const raw = (await searchParams).q;
  const query = (Array.isArray(raw) ? raw[0] : raw ?? "").trim().slice(0, 80);
  const result = searchCatalog(query);
  const found = result.products.length > 0;

  return (
    <div className="wrap page-top">
      <Crumbs items={[{ label: "Start", href: "/" }, { label: "Suche" }]} />
      <header className="pagehead">
        <Title as="h1" className="h-page">
          {query ? `Suche nach „${query}“` : "Suche"}
        </Title>
        <form className="help__search" role="search" action="/suche" style={{ marginTop: 8 }}>
          <Icon name="search" />
          <input className="input" type="search" name="q" defaultValue={query} placeholder="Marke, Spiel oder Gutschein suchen" aria-label="Marke, Spiel oder Gutschein suchen" autoComplete="off" enterKeyHint="search" />
        </form>
      </header>

      {query && found ? (
        <>
          <p className="listing__count" style={{ margin: "24px 0 16px" }} role="status">
            {result.products.length} Treffer
          </p>
          <ul className="grid">
            {result.products.map((product, n) => (
              <li key={product.slug} data-reveal style={{ "--i": n % 5 } as CSSProperties}>
                <ProductTile product={product} as="h2" />
              </li>
            ))}
          </ul>
        </>
      ) : null}

      {query && result.categories.length ? (
        <div className="chips" style={{ marginTop: 20 }}>
          {result.categories.map((c) => (
            <Link key={c.slug} className="chip" href={categoryHref(c.slug)}>
              {c.name}
            </Link>
          ))}
        </div>
      ) : null}

      {!found ? (
        <section className="section" aria-labelledby="search-popular">
          {query ? (
            <p className="lead" role="status" style={{ marginBottom: 24, color: "var(--ink)", fontWeight: 650 }}>
              Kein Treffer für „{query}“. Probier einen anderen Namen oder eine dieser Marken.
            </p>
          ) : null}
          <h2 id="search-popular" className="h-section" style={{ marginBottom: 20 }}>
            Beliebte Marken
          </h2>
          <ul className="grid">
            {popularProducts.slice(0, 10).map((product, n) => (
              <li key={product.slug} data-reveal style={{ "--i": n % 5 } as CSSProperties}>
                <ProductTile product={product} />
              </li>
            ))}
          </ul>
        </section>
      ) : null}
    </div>
  );
}
