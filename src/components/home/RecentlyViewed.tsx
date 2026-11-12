"use client";

import { productBySlug, type Product } from "@/data/catalog";
import { recentStore, useStore } from "@/lib/store";
import { ProductTile } from "../ProductTile";
import { Row } from "../Row";

/** Zuletzt angesehen. Erscheint nur, wenn die Person in diesem Besuch schon Produkte angesehen hat. */
export function RecentlyViewed() {
  const products = useStore(recentStore)
    .map(productBySlug)
    .filter((p): p is Product => Boolean(p));
  if (!products.length) return null;

  return (
    <section className="section wrap" aria-labelledby="recent-title">
      <div className="section__head">
        <h2 id="recent-title" className="h-section">
          Zuletzt angesehen
        </h2>
      </div>
      <Row label="Zuletzt angesehen">
        {products.map((product) => (
          <li key={product.slug}>
            <ProductTile product={product} />
          </li>
        ))}
      </Row>
    </section>
  );
}
