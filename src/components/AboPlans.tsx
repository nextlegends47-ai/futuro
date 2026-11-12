"use client";

import Link from "next/link";
import { useState } from "react";
import { subscriptionPlans, subscriptionServices } from "@/data/catalog";
import { Icon } from "./Icon";
import { Title } from "./Title";

/** Planwahl, Inhalt des gewählten Plans und Abschluss. Der Abschluss ist erst möglich, wenn Zahlung und Kündigung funktionieren. */
export function AboPlans() {
  const [planId, setPlanId] = useState<string>(subscriptionPlans[0].id);
  const plan = subscriptionPlans.find((p) => p.id === planId) ?? subscriptionPlans[0];

  return (
    <>
      <section className="section wrap" id="plaene" aria-labelledby="plans-title">
        <div className="section__head">
          <Title id="plans-title">Wähle deinen Plan</Title>
        </div>
        <fieldset className="planpick" style={{ border: 0, margin: 0, padding: 0, minWidth: 0 }}>
          <legend className="sr-only">Plan</legend>
          {subscriptionPlans.map((p) => (
            <label key={p.id} className="plan">
              <input type="radio" name="plan" value={p.id} checked={p.id === plan.id} onChange={() => setPlanId(p.id)} />
              <span className="plan__name">{p.name}</span>
              <span className="plan__price">{p.price} €</span>
              <span className="plan__period">{p.period}</span>
            </label>
          ))}
        </fieldset>
      </section>

      <section className="section wrap" id="inhalt-abo" aria-labelledby="content-title">
        <div className="section__head">
          <Title id="content-title">Das steckt drin</Title>
        </div>
        <ul className="services">
          {subscriptionServices.map((service) => (
            <li key={service} className="tag">
              {service}
            </li>
          ))}
        </ul>
        <p className="note narrow" style={{ marginTop: 16 }}>
          <Icon name="info" size={20} />
          <span>
            <strong>Entwurf:</strong> Welche Dienste und Beträge im Plan {plan.name} stecken, folgt mit den Abo-Daten.
          </span>
        </p>
      </section>

      <section className="section wrap" aria-labelledby="flow-title">
        <div className="section__head">
          <Title id="flow-title">So läuft dein Abo</Title>
        </div>
        <ol className="abosteps">
          {["Plan wählen und bezahlen", "Jeden Monat Codes", "Online kündigen"].map((title, n) => (
            <li key={title}>
              <span className="numdot" aria-hidden="true">
                {n + 1}
              </span>
              <h3>{title}</h3>
            </li>
          ))}
        </ol>
      </section>

      <div className="section wrap">
        <section className="panel panel--surface aboclose on-surface" aria-labelledby="close-title">
          <h2 id="close-title" className="h-card">
            Dein Plan: {plan.name}
          </h2>
          <p className="aboclose__sum">
            <strong className="price">{plan.price} €</strong>
            <span className="muted">{plan.period}</span>
          </p>
          <p className="note" id="abo-unavailable">
            <Icon name="info" size={20} />
            <span>
              <strong>Noch nicht verfügbar.</strong> Der Abschluss ist in diesem Entwurf nicht angeschlossen. Es wird nichts bestellt und nichts abgebucht.
            </span>
          </p>
          <button type="button" className="btn btn--lg" disabled aria-describedby="abo-unavailable">
            Jetzt kaufen
          </button>
          <p className="small muted">
            Die Kündigung geht online und ohne Anmeldung über{" "}
            <Link className="textlink" href="/vertraege-kuendigen">
              Verträge hier kündigen
            </Link>
            .
          </p>
        </section>
      </div>
    </>
  );
}
