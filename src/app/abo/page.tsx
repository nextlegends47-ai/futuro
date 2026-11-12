import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AboPlans } from "@/components/AboPlans";
import { features } from "@/config/site";

export const metadata: Metadata = {
  title: "instantcodes Abo – jeden Monat neue Codes",
  description: "Netflix, Disney+, Spotify, DAZN, Xbox Game Pass, PlayStation Plus und mehr als Code-Paket per E-Mail. Ein fester Preis, online kündbar.",
};

export default function AboPage() {
  if (!features.subscription) notFound();
  return (
    <>
      <div className="wrap">
        <section className="panel panel--dark abohero on-dark" data-loop aria-labelledby="abo-hero">
          <div className="glow glow--violet" aria-hidden="true" />
          <div className="glow glow--mint" aria-hidden="true" />
          <h1 id="abo-hero" className="h-page mask" data-mask>
            <span>Jeden Monat neue Codes</span>
          </h1>
          <p className="lead">
            Netflix, Disney+, Spotify, DAZN, Xbox Game Pass, PlayStation Plus, Switch Online, Crunchyroll und Amazon-Guthaben – als Code-Paket per E-Mail. Ein fester Preis, online kündbar.
          </p>
          <div className="abohero__actions">
            <a className="btn btn--lg btn--invert" href="#plaene">
              Pläne vergleichen
            </a>
            <a className="btn btn--lg btn--glass" href="#inhalt-abo">
              Das steckt drin
            </a>
          </div>
        </section>
      </div>
      <AboPlans />
    </>
  );
}
