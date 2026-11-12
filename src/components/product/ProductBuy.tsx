"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { MAX_QTY, site } from "@/config/site";
import { euro, isBuyable, type Product } from "@/data/catalog";
import { flyToCart } from "@/lib/fly";
import { addToCart, type Gift } from "@/lib/store";
import { Icon } from "../Icon";
import { confirmAdded } from "../tile-actions";

const isEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value.trim());

/**
 * Alles zum Kauf: Betragswahl, Menge, Geschenk, Kaufbereich und die Kaufleiste am Handy.
 * Das Häkchen zur sofortigen Lieferung ist nie vorausgewählt.
 */
export function ProductBuy({ product }: { product: Product }) {
  const router = useRouter();
  const amounts = product.amounts ?? [];
  const firstAvailable = amounts.find((a) => !a.soldOut);
  const [amountId, setAmountId] = useState(firstAvailable?.id ?? "");
  const [qty, setQty] = useState(1);
  const [gift, setGift] = useState(false);
  const [giftEmail, setGiftEmail] = useState("");
  const [giftMessage, setGiftMessage] = useState("");
  const [consent, setConsent] = useState(false);
  const [errors, setErrors] = useState<{ consent?: boolean; giftEmail?: boolean }>({});
  const [busy, setBusy] = useState(false);
  const consentRef = useRef<HTMLInputElement>(null);
  const giftRef = useRef<HTMLInputElement>(null);

  if (!isBuyable(product) || !firstAvailable) {
    return (
      <div className="pdp__group">
        {product.priceFrom != null && !product.soldOut ? <p className="price buybox__price">ab {euro(product.priceFrom)}</p> : null}
        <p className="note" style={{ marginTop: 12 }}>
          <Icon name="info" size={20} />
          <span>
            {product.soldOut ? (
              <>
                <strong>Ausverkauft.</strong> {product.name} ist gerade nicht lieferbar.
              </>
            ) : (
              <>
                <strong>Noch nicht verfügbar.</strong> Beträge und Preise für {product.name} folgen mit der Produktliste. Bis dahin lässt sich das Produkt nicht kaufen.
              </>
            )}
          </span>
        </p>
      </div>
    );
  }

  const amount = amounts.find((a) => a.id === amountId) ?? firstAvailable;
  const total = amount.price * qty;
  const isGame = product.kind === "game";

  const giftData = (): Gift | undefined => (gift ? { email: giftEmail.trim(), message: giftMessage.trim() } : undefined);

  const giftValid = () => {
    if (!gift || isEmail(giftEmail)) return true;
    setErrors((e) => ({ ...e, giftEmail: true }));
    giftRef.current?.focus();
    return false;
  };

  const addToBasket = () => {
    if (!giftValid()) return;
    setBusy(true);
    flyToCart(document.querySelector(".pdp__art"), product.color).then(() => {
      addToCart(product.slug, amount.id, qty, giftData());
      confirmAdded(`${product.name} ${isGame ? "" : amount.label} liegt im Warenkorb`.replace(/\s+/g, " "));
      setBusy(false);
    });
  };

  const buyNow = () => {
    if (!giftValid()) return;
    if (!consent) {
      setErrors((e) => ({ ...e, consent: true }));
      consentRef.current?.focus();
      consentRef.current?.closest(".buybox")?.scrollIntoView({ block: "center", behavior: "smooth" });
      return;
    }
    addToCart(product.slug, amount.id, qty, giftData());
    router.push("/kasse");
  };

  return (
    <>
      {amounts.length > 1 ? (
        <fieldset className="amounts pdp__group">
          <legend className="pdp__label">Betrag wählen</legend>
          {amounts.map((a) => (
            <label key={a.id} className="amount">
              <input type="radio" name="amount" value={a.id} checked={a.id === amount.id} disabled={a.soldOut} onChange={() => setAmountId(a.id)} />
              <span className="amount__value">{a.label}</span>
              <span className="amount__price">{a.soldOut ? "Ausverkauft" : `für ${euro(a.price)}`}</span>
            </label>
          ))}
        </fieldset>
      ) : null}

      <div className="pdp__group pdp__rowline">
        <strong id="qty-label">Menge</strong>
        <div className="qty" role="group" aria-labelledby="qty-label">
          <button type="button" className="iconbtn" aria-label="Menge verringern" disabled={qty <= 1} onClick={() => setQty((n) => Math.max(1, n - 1))}>
            <Icon name="minus" size={18} />
          </button>
          <output aria-live="polite">{qty}</output>
          <button type="button" className="iconbtn" aria-label="Menge erhöhen" disabled={qty >= MAX_QTY} onClick={() => setQty((n) => Math.min(MAX_QTY, n + 1))}>
            <Icon name="plus" size={18} />
          </button>
        </div>
      </div>

      <div className="pdp__group">
        <label className="pdp__rowline" htmlFor="gift-switch">
          <span>
            <strong>Als Geschenk senden</strong>
            <span>Per E-Mail mit persönlicher Karte</span>
          </span>
          <span className="switch">
            <input id="gift-switch" type="checkbox" role="switch" checked={gift} onChange={(event) => setGift(event.target.checked)} />
            <span className="switch__track" />
          </span>
        </label>
        {gift ? (
          <div className="giftfields">
            <div className="field">
              <label className="field__label" htmlFor="gift-email">
                E-Mail-Adresse der beschenkten Person
              </label>
              <input
                ref={giftRef}
                id="gift-email"
                className="input"
                type="email"
                inputMode="email"
                autoComplete="off"
                placeholder="name@email.de"
                value={giftEmail}
                aria-invalid={errors.giftEmail || undefined}
                aria-describedby={errors.giftEmail ? "gift-email-error" : undefined}
                onChange={(event) => {
                  setGiftEmail(event.target.value);
                  setErrors((e) => ({ ...e, giftEmail: false }));
                }}
              />
              {errors.giftEmail ? (
                <p id="gift-email-error" className="field__error" role="alert">
                  Bitte gib die E-Mail-Adresse der beschenkten Person ein.
                </p>
              ) : null}
            </div>
            <div className="field">
              <label className="field__label" htmlFor="gift-message">
                Persönliche Nachricht
              </label>
              <textarea id="gift-message" className="input" maxLength={300} value={giftMessage} onChange={(event) => setGiftMessage(event.target.value)} />
            </div>
          </div>
        ) : null}
      </div>

      <div className="buybox on-surface">
        <div className="buybox__total">
          <span>Gesamtpreis</span>
          <strong className="price buybox__price" aria-live="polite">
            <span key={total} className="swap">
              {euro(total)}
            </span>
          </strong>
        </div>
        <p className="fine">Endpreis. Lieferung per E-Mail in bis zu 24 Std.</p>

        <label className="check" data-invalid={errors.consent || undefined}>
          <input
            ref={consentRef}
            type="checkbox"
            checked={consent}
            aria-describedby={errors.consent ? "consent-error" : undefined}
            onChange={(event) => {
              setConsent(event.target.checked);
              setErrors((e) => ({ ...e, consent: false }));
            }}
          />
          <span className="check__box" aria-hidden="true">
            <Icon name="check" size={18} />
          </span>
          <span>
            Ich stimme der sofortigen Lieferung zu und weiß, dass mein Widerrufsrecht damit erlischt. Es gelten die{" "}
            <Link className="textlink" href="/agb">
              AGB
            </Link>
            .
          </span>
        </label>
        {errors.consent ? (
          <p id="consent-error" className="field__error" role="alert">
            Bitte bestätige die AGB und die sofortige Lieferung.
          </p>
        ) : null}

        {site.draft ? (
          <div className="quickpay">
            <strong>Schnell bezahlen</strong>
            <span>Apple Pay und Google Pay erscheinen hier, sobald die Zahlung über Stripe angeschlossen ist.</span>
          </div>
        ) : null}
        <p className="buybox__or">oder mit Karte bezahlen</p>

        <button type="button" className="btn btn--lg btn--block" onClick={buyNow}>
          Jetzt kaufen
        </button>
        <button type="button" className="btn btn--lg btn--outline btn--block" onClick={addToBasket} disabled={busy}>
          In den Warenkorb
        </button>
      </div>

      {/* Kaufleiste am Handy */}
      <div className="buybar">
        <div className="buybar__sum">
          <span>Gesamtpreis</span>
          <strong className="price">
            <span key={total} className="swap">
              {euro(total)}
            </span>
          </strong>
        </div>
        <button type="button" className="btn" onClick={buyNow}>
          Jetzt kaufen
        </button>
      </div>
    </>
  );
}
