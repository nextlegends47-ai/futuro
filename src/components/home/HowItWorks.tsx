"use client";

import { useEffect, useState, type CSSProperties } from "react";

const steps = [
  { title: "Produkt und Betrag wählen", text: "Gutschein, Spiele-Key, Abo oder Handy-Guthaben – 153 Marken und 235 Spiele." },
  { title: "Sicher bezahlen", text: "Mit Apple Pay, Google Pay, Revolut Pay oder Karte. Die Zahlung läuft über Stripe." },
  { title: "Code erhalten", text: "Per E-Mail und auf der Bestellseite. Lieferzeit: bis zu 24 Stunden." },
];

/** Nie ein echter Code, immer dieser Platzhalter */
const SAMPLE = "DEIN-CODE-HIER";
const GLYPHS = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";

/** Beispiel-Code: Die Zeichen wechseln schnell, dann rastet der Text ein. */
function SnapCode({ run }: { run: boolean }) {
  const [text, setText] = useState(SAMPLE);

  useEffect(() => {
    if (!run) return;
    let settled = 0;
    const id = window.setInterval(() => {
      settled += 1;
      if (settled >= SAMPLE.length) {
        window.clearInterval(id);
        setText(SAMPLE);
        return;
      }
      setText(
        SAMPLE.split("")
          .map((char, i) => (i < settled || char === "-" ? char : GLYPHS[Math.floor(Math.random() * GLYPHS.length)]))
          .join(""),
      );
    }, 55);
    return () => {
      window.clearInterval(id);
      setText(SAMPLE);
    };
  }, [run]);

  return (
    <div className="codebox">
      <span className="codebox__label">Beispiel</span>
      <span className="codebox__code" aria-hidden="true">
        {text}
      </span>
      <span className="sr-only">{SAMPLE}</span>
    </div>
  );
}

/**
 * So funktioniert der Kauf: drei Schritte. Ein Fortschrittsstrich läuft je
 * drei Sekunden durch jeden Schritt, solange der Abschnitt im Bild ist.
 */
export function HowItWorks() {
  // -1: ruhender Zustand ohne Skript oder mit „Bewegung reduzieren“
  const [active, setActive] = useState(-1);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    setActive(0);
  }, []);

  return (
    <ol className="steps" data-loop>
      {steps.map((step, i) => {
        const state = active < 0 ? "static" : i < active ? "done" : i === active ? "active" : "idle";
        return (
          <li key={step.title} data-reveal style={{ "--i": i } as CSSProperties}>
            <div className="step" data-state={state}>
              <div className="step__bar" aria-hidden="true">
                <i onAnimationEnd={() => setActive((current) => (current + 1) % steps.length)} />
              </div>
              <span className="step__num">Schritt {i + 1}</span>
              <h3 className="step__title">{step.title}</h3>
              <p className="step__text">{step.text}</p>
              {i === 2 ? <SnapCode run={active === 2} /> : null}
            </div>
          </li>
        );
      })}
    </ol>
  );
}
