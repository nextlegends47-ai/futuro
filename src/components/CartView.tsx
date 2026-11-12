"use client";

import Link from "next/link";
import { useState } from "react";
import { features, MAX_QTY, site } from "@/config/site";
import { euro, productHref } from "@/data/catalog";
import { cartStore, cartTotal, closePanel, removeLine, resolveCart, setLineQty, useStore, type ResolvedLine } from "@/lib/store";
import { ProductArt } from "./Art";
import { Icon } from "./Icon";

export const lineMeta = (line: ResolvedLine) => (line.product.kind === "game" ? `${line.product.platform?.label ?? ""} · Spiele-Key`.replace(/^ · /, "") : `Betrag ${line.amount.label}`);

export function CartLines({ lines, editable = true }: { lines: ResolvedLine[]; editable?: boolean }) {
  return (
    <ul className="cartlines">
      {lines.map((line) => (
        <li key={line.id} className="cartline">
          <div className="cartline__art">
            <ProductArt product={line.product} />
          </div>
          <div>
            <div className="cartline__top">
              <Link className="cartline__name" href={productHref(line.product)} onClick={closePanel}>
                {line.product.name}
              </Link>
              <span className="price">{euro(line.total)}</span>
            </div>
            <p className="cartline__meta">
              {lineMeta(line)}
              {!editable && line.qty > 1 ? ` · Menge ${line.qty}` : ""}
            </p>
            {line.gift ? <p className="cartline__meta">Geschenk an {line.gift.email}</p> : null}
          </div>
          {editable ? (
            <div className="cartline__row">
              <div className="qty" role="group" aria-label={`Menge für ${line.product.name}`}>
                <button type="button" className="iconbtn" aria-label="Menge verringern" disabled={line.qty <= 1} onClick={() => setLineQty(line.id, line.qty - 1)}>
                  <Icon name="minus" size={18} />
                </button>
                <output aria-live="polite">{line.qty}</output>
                <button type="button" className="iconbtn" aria-label="Menge erhöhen" disabled={line.qty >= MAX_QTY} onClick={() => setLineQty(line.id, line.qty + 1)}>
                  <Icon name="plus" size={18} />
                </button>
              </div>
              <button type="button" className="cartline__remove" onClick={() => removeLine(line.id)}>
                <Icon name="trash" size={18} />
                Entfernen
                <span className="sr-only">: {line.product.name}</span>
              </button>
            </div>
          ) : null}
        </li>
      ))}
    </ul>
  );
}

export function CartTotals({ lines }: { lines: ResolvedLine[] }) {
  const total = cartTotal(lines);
  return (
    <>
      <dl className="totals">
        <div className="totals__row">
          <dt>Zwischensumme</dt>
          <dd>{euro(total)}</dd>
        </div>
        <div className="totals__row totals__row--sum">
          <dt>Gesamt</dt>
          <dd>{euro(total)}</dd>
        </div>
      </dl>
      <p className="fine fine--surface totals__note">Endpreis</p>
    </>
  );
}

/** Aktionscode. Solange die Funktion fehlt, sagt das Feld das offen. */
function PromoField() {
  const [message, setMessage] = useState("");
  return (
    <form
      className="promo"
      onSubmit={(event) => {
        event.preventDefault();
        setMessage("Aktionscodes lassen sich in diesem Entwurf noch nicht einlösen.");
      }}
    >
      <label className="field__label" htmlFor="promo">
        Aktionscode
      </label>
      <input id="promo" className="input" name="code" autoComplete="off" autoCapitalize="characters" aria-describedby={message ? "promo-msg" : undefined} />
      <button type="submit" className="btn btn--soft">
        Einlösen
      </button>
      {message ? (
        <p id="promo-msg" className="field__hint" role="status">
          {message}
        </p>
      ) : null}
    </form>
  );
}

export function EmptyCart() {
  return (
    <div className="empty">
      <h2>Dein Warenkorb ist leer.</h2>
      <p>Entdecke Gutscheine, Spielguthaben und Handy-Guthaben. Nach der Zahlung kommt dein Code per E-Mail, Lieferzeit bis zu 24 Stunden.</p>
      <div className="empty__actions">
        <Link className="btn" href="/kategorien" onClick={closePanel}>
          Jetzt stöbern
        </Link>
        {features.topup ? (
          <Link className="btn btn--outline" href="/handy-aufladen" onClick={closePanel}>
            Handy aufladen
          </Link>
        ) : null}
      </div>
    </div>
  );
}

/** Inhalt des Warenkorbs: als Blatt am Computer und als eigene Seite am Handy. */
export function CartView() {
  const lines = resolveCart(useStore(cartStore));
  if (!lines.length) return <EmptyCart />;

  return (
    <div>
      <CartLines lines={lines} />
      {features.promoCodes || site.draft ? <PromoField /> : null}
      <CartTotals lines={lines} />
      <div className="cart__actions">
        <Link className="btn btn--lg btn--block" href="/kasse" onClick={closePanel}>
          Zur Kasse
        </Link>
      </div>
    </div>
  );
}
