"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { features, site } from "@/config/site";
import { euro } from "@/data/catalog";
import { cartStore, cartTotal, resolveCart, useStore } from "@/lib/store";
import { CartLines, CartTotals, EmptyCart } from "./CartView";
import { Icon } from "./Icon";

const isEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value.trim());

type Step = "email" | "pay";

/**
 * Kasse in drei Schritten: Warenkorb, E-Mail, Bezahlen. Ein Konto ist nicht nötig.
 * Die Kasse lenkt nicht ab: keine Werbung, keine Zusatzangebote.
 * Solange die Zahlung nicht angeschlossen ist, ist „Jetzt kaufen“ gesperrt und
 * klar gekennzeichnet. Eine Schein-Bestellung gibt es nie.
 */
export function Checkout() {
  const lines = resolveCart(useStore(cartStore));
  const [step, setStep] = useState<Step>("email");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [consent, setConsent] = useState(false);
  const heading = useRef<HTMLHeadingElement>(null);
  const moved = useRef(false);

  // Nach dem Wechsel des Schritts den Fokus auf die neue Überschrift setzen
  useEffect(() => {
    if (moved.current) heading.current?.focus();
  }, [step]);

  if (!lines.length) return <EmptyCart />;

  const total = cartTotal(lines);
  const go = (next: Step) => {
    moved.current = true;
    setStep(next);
  };

  return (
    <>
      <ol className="progress" aria-label="Schritte der Bestellung">
        <li data-state="done">
          <Link href="/warenkorb">
            <span>
              <Icon name="check" size={16} />
              Warenkorb
            </span>
          </Link>
        </li>
        <li data-state={step === "email" ? "current" : "done"} aria-current={step === "email" ? "step" : undefined}>
          <span>
            {step === "pay" ? <Icon name="check" size={16} /> : null}
            E-Mail
          </span>
        </li>
        <li data-state={step === "pay" ? "current" : "todo"} aria-current={step === "pay" ? "step" : undefined}>
          <span>Bezahlen</span>
        </li>
      </ol>

      <div className="checkout">
        {step === "email" ? (
          <form
            className="checkout__step"
            noValidate
            onSubmit={(event) => {
              event.preventDefault();
              if (!isEmail(email)) {
                setEmailError(true);
                return;
              }
              go("pay");
            }}
          >
            <h2 ref={heading} tabIndex={-1}>
              E-Mail für deine Codes
            </h2>
            <div className="field">
              <label className="field__label" htmlFor="checkout-email">
                E-Mail-Adresse
              </label>
              <input
                id="checkout-email"
                className="input"
                type="email"
                inputMode="email"
                autoComplete="email"
                placeholder="deine@email.de"
                value={email}
                aria-invalid={emailError || undefined}
                aria-describedby={emailError ? "checkout-email-error" : "checkout-email-hint"}
                onChange={(event) => {
                  setEmail(event.target.value);
                  setEmailError(false);
                }}
              />
              {emailError ? (
                <p id="checkout-email-error" className="field__error" role="alert">
                  Bitte gib eine gültige E-Mail-Adresse ein.
                </p>
              ) : (
                <p id="checkout-email-hint" className="field__hint">
                  An diese Adresse schicken wir deine Codes. Ein Konto brauchst du nicht.
                </p>
              )}
            </div>
            {!features.emailVerification ? (
              <p className="note">
                <Icon name="info" size={20} />
                <span>
                  <strong>Entwurf:</strong> Im Shop bestätigst du die Adresse mit einem kurzen Code, den wir per E-Mail schicken. So landet kein Code bei einer falschen Adresse. Hier werden noch keine E-Mails
                  verschickt.
                </span>
              </p>
            ) : null}
            <div className="checkout__row">
              <button type="submit" className="btn btn--lg">
                Weiter zum Bezahlen
              </button>
            </div>
          </form>
        ) : (
          <div className="checkout__step">
            <h2 ref={heading} tabIndex={-1}>
              Bezahlen
            </h2>
            <p className="muted">
              Codes gehen an <strong style={{ color: "var(--ink)" }}>{email.trim()}</strong>.{" "}
              <button type="button" className="textlink" style={{ border: 0, background: "none", padding: 0, cursor: "pointer", fontWeight: 600 }} onClick={() => go("email")}>
                Ändern
              </button>
            </p>

            <div className="payslot">
              <strong>Schnell bezahlen</strong>
              <span>Hier stehen die schnellen Zahlarten deines Geräts, zum Beispiel Apple Pay oder Google Pay.</span>
            </div>
            <div className="payslot">
              <strong>Karte und weitere Zahlarten</strong>
              <span>Hier stehen die Zahlungsfelder von Stripe. Kartendaten gibst du nur dort ein, wir speichern sie nicht. Jede Zahlart kostet gleich viel.</span>
            </div>

            <div className="paybox on-surface">
              <label className="check">
                <input type="checkbox" checked={consent} onChange={(event) => setConsent(event.target.checked)} />
                <span className="check__box" aria-hidden="true">
                  <Icon name="check" size={18} />
                </span>
                <span>
                  Ich akzeptiere die{" "}
                  <Link className="textlink" href="/agb">
                    AGB
                  </Link>{" "}
                  und habe die{" "}
                  <Link className="textlink" href="/datenschutz">
                    Datenschutzerklärung
                  </Link>{" "}
                  gelesen. Ich stimme der sofortigen Lieferung zu und weiß, dass mein Widerrufsrecht damit erlischt.
                </span>
              </label>

              <div className="paybox__total">
                <span>Gesamt</span>
                <strong className="price">{euro(total)}</strong>
              </div>

              {!features.checkout ? (
                <p className="note" id="checkout-unavailable">
                  <Icon name="info" size={20} />
                  <span>
                    <strong>Noch nicht verfügbar.</strong> In diesem Entwurf ist die Zahlung nicht angeschlossen. Es wird nichts bestellt und nichts abgebucht.
                  </span>
                </p>
              ) : null}

              <button type="button" className="btn btn--lg btn--block" disabled={!features.checkout} aria-describedby={!features.checkout ? "checkout-unavailable" : undefined}>
                Jetzt kaufen
              </button>
              <p className="fine" style={{ textAlign: "center" }}>
                Endpreis. Lieferung per E-Mail, Lieferzeit bis zu 24 Stunden.
              </p>
            </div>
          </div>
        )}

        <aside className="checkout__summary on-surface" aria-labelledby="summary-title">
          <h2 id="summary-title">Deine Bestellung</h2>
          <CartLines lines={lines} editable={false} />
          <CartTotals lines={lines} />
        </aside>
      </div>

      {site.draft ? (
        <p className="fine" style={{ marginTop: 24 }}>
          So sieht die Seite nach dem Kauf aus:{" "}
          <Link className="textlink" href="/bestellung/beispiel">
            Beispiel einer Bestellseite
          </Link>
        </p>
      ) : null}
    </>
  );
}
