"use client";

import { useState } from "react";
import { topupDraftStore, useStore } from "@/lib/store";
import { Icon } from "./Icon";
import { countries } from "./home/TopupTeaser";

/**
 * Handy aufladen in drei Schritten: Land und Nummer, Anbieter, Betrag.
 * Anbieter und Beträge kommen mit den Produktdaten. Bis dahin sind die
 * Schritte zwei und drei offen gekennzeichnet, und es lässt sich nichts bestellen.
 */
export function TopupFlow() {
  const draft = useStore(topupDraftStore);
  const [country, setCountry] = useState(draft.country);
  const [number, setNumber] = useState(draft.number);
  const countryLabel = countries.find((c) => c.code === country)?.label ?? "";

  return (
    <div className="topup">
      <ol className="topup__steps">
        <li className="topup__step on-surface">
          <h2>
            <span className="numdot" aria-hidden="true">
              1
            </span>
            Land und Nummer
          </h2>
          <div className="topup__fields">
            <div className="field">
              <label className="field__label" htmlFor="topup-country">
                Land
              </label>
              <select id="topup-country" className="input" value={country} onChange={(event) => setCountry(event.target.value)}>
                {countries.map((c) => (
                  <option key={c.code} value={c.code}>
                    {c.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="field">
              <label className="field__label" htmlFor="topup-number">
                Handynummer
              </label>
              <input id="topup-number" className="input" type="tel" inputMode="tel" autoComplete="tel-national" placeholder="0151 2345678" value={number} onChange={(event) => setNumber(event.target.value)} />
            </div>
          </div>
          <p className="field__hint">Weitere Länder für Nummern im Ausland folgen mit den Anbieterdaten.</p>
        </li>

        <li className="topup__step on-surface">
          <h2>
            <span className="numdot" aria-hidden="true">
              2
            </span>
            Anbieter
          </h2>
          <p className="note">
            <Icon name="info" size={20} />
            <span>
              <strong>Noch nicht verfügbar.</strong> Die 19 Anbieter folgen mit den Produktdaten.
            </span>
          </p>
        </li>

        <li className="topup__step on-surface">
          <h2>
            <span className="numdot" aria-hidden="true">
              3
            </span>
            Betrag
          </h2>
          <p className="note">
            <Icon name="info" size={20} />
            <span>
              <strong>Noch nicht verfügbar.</strong> Beträge und Preise folgen mit den Produktdaten.
            </span>
          </p>
        </li>
      </ol>

      <aside className="topup__summary on-surface" aria-labelledby="topup-summary">
        <h2 id="topup-summary">Zusammenfassung</h2>
        <dl className="deflist">
          <div>
            <dt>Nummer</dt>
            <dd>{number.trim() ? `${countryLabel.match(/\+\d+/)?.[0] ?? ""} ${number.trim()}` : "noch offen"}</dd>
          </div>
          <div>
            <dt>Anbieter</dt>
            <dd>noch offen</dd>
          </div>
          <div>
            <dt>Betrag</dt>
            <dd>noch offen</dd>
          </div>
          <div>
            <dt>Gesamtpreis</dt>
            <dd>noch offen</dd>
          </div>
        </dl>
        <div className="topup__actions">
          <button type="button" className="btn btn--lg btn--block" disabled>
            Zur Kasse
          </button>
          <button type="button" className="btn btn--lg btn--outline btn--block" disabled>
            In den Warenkorb
          </button>
        </div>
        <p className="fine" style={{ marginTop: 12 }}>
          Aufladen ist in diesem Entwurf noch nicht möglich.
        </p>
      </aside>
    </div>
  );
}
