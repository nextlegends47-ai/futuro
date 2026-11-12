"use client";

import type { CSSProperties } from "react";
import { euro, giftSets, productBySlug, type Amount, type Product } from "@/data/catalog";
import { addToCart, toast } from "@/lib/store";
import { GiftCard } from "../Art";

interface SetItem {
  product: Product | undefined;
  amount: Amount | undefined;
  text: string;
}

/**
 * Geschenk-Sets: zwei Codes mit einem Klick. Der Preis ist die Summe der
 * Einzelpreise, ohne Rabatt. Fehlt ein Einzelpreis, lässt sich das Set noch
 * nicht hinzufügen – ein Preis wird nie geschätzt.
 */
export function GiftSets() {
  return (
    <ul className="sets">
      {giftSets.map((set, i) => {
        const items: SetItem[] = set.items.map((item) => {
          const product = productBySlug(item.slug);
          const amount = product?.amounts?.find((a) => a.label === item.amountLabel && !a.soldOut);
          return { product, amount, text: `${product?.name ?? item.slug} ${item.amountLabel}` };
        });
        const ready = items.every((item) => item.product && item.amount);
        const total = ready ? items.reduce((sum, item) => sum + (item.amount?.price ?? 0), 0) : null;

        return (
          <li key={set.slug} data-reveal style={{ "--i": Math.min(i, 4) } as CSSProperties}>
            <article className="set">
              <div className="set__art" aria-hidden="true">
                {items.map((item, n) => (
                  <GiftCard key={n} name={item.product?.name ?? ""} color={item.product?.color ?? "#0b0b0f"} />
                ))}
              </div>
              <h3 className="set__name">{set.name}</h3>
              <p className="set__items">{items.map((item) => item.text).join(" und ")}</p>
              <div className="set__foot">
                {total != null ? <p className="price">{euro(total)}</p> : <p className="set__price--none">Preis folgt</p>}
                <button
                  type="button"
                  className="btn btn--sm"
                  disabled={!ready}
                  aria-label={ready ? `${set.name} hinzufügen` : `${set.name} hinzufügen, noch nicht verfügbar`}
                  onClick={() => {
                    for (const item of items) if (item.product && item.amount) addToCart(item.product.slug, item.amount.id);
                    toast(`${set.name}: 2 Codes im Warenkorb`, { link: { href: "/warenkorb", label: "Zum Warenkorb" } });
                  }}
                >
                  Hinzufügen
                </button>
              </div>
            </article>
          </li>
        );
      })}
    </ul>
  );
}
