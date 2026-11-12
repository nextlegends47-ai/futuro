"use client";

import { useState } from "react";
import { toast } from "@/lib/store";
import { Icon } from "./Icon";

/* Beispielwerte für die Vorschau. Keine echte Bestellung, kein echter Code. */
const SAMPLE_CODE = "DEIN-CODE-HIER";
const sample = {
  number: "BEISPIEL-0001",
  product: "Steam 20,00 €",
  email: "deine@email.de",
  ordered: "10.11.2026, 14:02 Uhr",
  paid: "10.11.2026, 14:03 Uhr",
  delivered: "10.11.2026, 15:40 Uhr",
};

/**
 * Bestellseite nach dem Kauf, hier als Vorschau mit Beispielwerten:
 * Zeitleiste mit vier Stationen, Code auf dunkler Karte, Daten der Bestellung.
 */
export function OrderPreview() {
  const [delivered, setDelivered] = useState(false);
  const [shown, setShown] = useState(false);

  const stations = [
    { title: "Bestellung aufgegeben", time: sample.ordered, done: true },
    { title: "Zahlung bestätigt", time: sample.paid, done: true },
    { title: "Codes werden vorbereitet", time: delivered ? sample.paid : "Lieferzeit: bis zu 24 Stunden nach Zahlungseingang", done: delivered, current: !delivered },
    { title: "Geliefert", time: delivered ? sample.delivered : "Der Code kommt per E-Mail und steht dann hier.", done: delivered },
  ];

  return (
    <>
      <div className="previewbar" role="group" aria-label="Vorschau umschalten">
        <span className="fine">Vorschau:</span>
        <button type="button" className="chip" aria-pressed={!delivered} onClick={() => setDelivered(false)}>
          Lieferung läuft
        </button>
        <button
          type="button"
          className="chip"
          aria-pressed={delivered}
          onClick={() => {
            setDelivered(true);
            setShown(false);
          }}
        >
          Geliefert
        </button>
      </div>

      <div className="order">
        <div className="stack">
          <section className="order__card" aria-labelledby="order-status">
            <h2 id="order-status">Stand deiner Bestellung</h2>
            <ol className="timeline">
              {stations.map((station) => (
                <li key={station.title} data-done={station.done} data-current={station.current || undefined}>
                  <span className="timeline__dot" aria-hidden="true">
                    {station.done ? <Icon name="check" size={16} /> : station.current ? <Icon name="clock" size={16} /> : null}
                  </span>
                  <div>
                    <strong>{station.title}</strong>
                    <span>{station.time}</span>
                  </div>
                </li>
              ))}
            </ol>
          </section>

          {delivered ? (
            <section className="codecard on-dark" aria-labelledby="order-code">
              <div className="codecard__head">
                <h2 id="order-code" style={{ font: "inherit", letterSpacing: 0 }}>
                  {sample.product}
                </h2>
                <span className="tag">Beispiel</span>
              </div>
              <p className="codecard__code" aria-live="polite">
                {shown ? SAMPLE_CODE : "•••• •••• ••••"}
                {!shown ? <span className="sr-only">Code verdeckt</span> : null}
              </p>
              <div className="codecard__actions">
                <button type="button" className="btn btn--sm btn--glass" aria-pressed={shown} onClick={() => setShown((v) => !v)}>
                  <Icon name="eye" size={18} />
                  {shown ? "Verdecken" : "Zeigen"}
                </button>
                <button
                  type="button"
                  className="btn btn--sm btn--glass"
                  onClick={async () => {
                    try {
                      await navigator.clipboard.writeText(SAMPLE_CODE);
                      toast("Code kopiert");
                    } catch {
                      toast("Kopieren ist hier nicht möglich. Tippe auf „Zeigen“ und markiere den Code.");
                    }
                  }}
                >
                  <Icon name="copy" size={18} />
                  Code kopieren
                </button>
                <button type="button" className="btn btn--sm btn--invert" disabled title="Führt im Shop zur Einlöse-Seite der Marke">
                  Jetzt einlösen
                </button>
              </div>
            </section>
          ) : null}
        </div>

        <section className="order__card" aria-labelledby="order-data">
          <h2 id="order-data">Deine Bestellung</h2>
          <dl className="deflist">
            <div>
              <dt>Bestellnummer</dt>
              <dd>{sample.number}</dd>
            </div>
            <div>
              <dt>Bestelldatum</dt>
              <dd>{sample.ordered}</dd>
            </div>
            <div>
              <dt>Zahlungsdatum</dt>
              <dd>{sample.paid}</dd>
            </div>
            <div>
              <dt>Lieferdatum</dt>
              <dd>{delivered ? sample.delivered : "noch offen"}</dd>
            </div>
            <div>
              <dt>E-Mail-Adresse</dt>
              <dd>{sample.email}</dd>
            </div>
          </dl>
        </section>
      </div>
    </>
  );
}
