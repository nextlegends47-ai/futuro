"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { topupDraftStore } from "@/lib/store";

export const countries = [{ code: "DE", label: "Deutschland (+49)" }];

/** Abschnitt „Handy aufladen“ der Startseite: Länderwahl, Nummernfeld, weiter zur Seite. */
export function TopupTeaser() {
  const router = useRouter();
  const [country, setCountry] = useState("DE");
  const [number, setNumber] = useState("");
  const [error, setError] = useState(false);

  return (
    <form
      className="duo__form"
      noValidate
      onSubmit={(event) => {
        event.preventDefault();
        if (number.replace(/\D/g, "").length < 6) {
          setError(true);
          return;
        }
        // Die Nummer bleibt im Arbeitsspeicher und steht nie in der Adresse
        topupDraftStore.set({ country, number: number.trim() });
        router.push("/handy-aufladen");
      }}
    >
      <div className="field">
        <label className="field__label" htmlFor="teaser-country">
          Land
        </label>
        <select id="teaser-country" className="input" value={country} onChange={(event) => setCountry(event.target.value)}>
          {countries.map((c) => (
            <option key={c.code} value={c.code}>
              {c.label}
            </option>
          ))}
        </select>
      </div>
      <div className="field">
        <label className="field__label" htmlFor="teaser-number">
          Handynummer
        </label>
        <input
          id="teaser-number"
          className="input"
          type="tel"
          inputMode="tel"
          autoComplete="tel-national"
          placeholder="0151 2345678"
          value={number}
          aria-invalid={error || undefined}
          aria-describedby={error ? "teaser-number-error" : undefined}
          onChange={(event) => {
            setNumber(event.target.value);
            setError(false);
          }}
        />
      </div>
      {error ? (
        <p id="teaser-number-error" className="field__error" role="alert">
          Bitte gib deine Handynummer ein.
        </p>
      ) : null}
      <button type="submit" className="btn">
        Weiter zum Aufladen
      </button>
    </form>
  );
}
