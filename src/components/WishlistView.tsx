"use client";

import Link from "next/link";
import { productBySlug, type Product } from "@/data/catalog";
import { useStore, wishlistStore } from "@/lib/store";
import { ProductTile } from "./ProductTile";

/** Merkliste: funktioniert ohne Anmeldung und liegt auf dem Gerät. */
export function WishlistView() {
  const products = useStore(wishlistStore)
    .map(productBySlug)
    .filter((p): p is Product => Boolean(p));

  if (!products.length) {
    return (
      <div className="empty" style={{ marginTop: 28 }}>
        <h2>Noch nichts gemerkt</h2>
        <p>Tippe bei einem Produkt auf das Herz, dann findest du es hier wieder.</p>
        <div className="empty__actions">
          <Link className="btn" href="/kategorien">
            Sortiment ansehen
          </Link>
        </div>
      </div>
    );
  }

  return (
    <ul className="grid" style={{ marginTop: 28 }}>
      {products.map((product) => (
        <li key={product.slug}>
          <ProductTile product={product} as="h2" />
        </li>
      ))}
    </ul>
  );
}
