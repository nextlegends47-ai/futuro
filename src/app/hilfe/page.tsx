import type { Metadata } from "next";
import Link from "next/link";
import { Crumbs } from "@/components/Crumbs";
import { DraftNote } from "@/components/DraftNote";
import { HelpCenter } from "@/components/HelpCenter";
import { Icon } from "@/components/Icon";
import { Title } from "@/components/Title";
import { features, site } from "@/config/site";

export const metadata: Metadata = {
  title: "Hilfe und häufige Fragen",
  description: "Antworten zu Lieferung, Bezahlung, Einlösen, Geschenken und Rückgabe. Support per E-Mail an info@instantcodes.de.",
};

export default function HelpPage() {
  return (
    <div className="wrap page-top">
      <Crumbs items={[{ label: "Start", href: "/" }, { label: "Hilfe" }]} />
      <header className="pagehead">
        <Title as="h1" className="h-page">
          Wie können wir helfen?
        </Title>
        <p className="lead">{features.mia ? "Antworten auf häufige Fragen, die KI-Beraterin Mia und unser Support per E-Mail." : "Antworten auf häufige Fragen und unser Support per E-Mail."}</p>
      </header>

      <HelpCenter />

      <DraftNote className="narrow section">
        <strong>Entwurf:</strong> Die Antwort auf „Kann ich Gutscheine auf Rechnung kaufen?“ liefert der Betreiber und fehlt deshalb noch.
      </DraftNote>

      <section className="section" aria-labelledby="more-title">
        <Title id="more-title">Noch etwas offen?</Title>
        <div className="ways">
          {features.mia ? (
            <a className="way" href="#mia" id="mia">
              <Icon name="chat" size={26} />
              <strong>Mia fragen</strong>
              <span>Die KI-Beraterin hilft bei der Auswahl und bei Fragen zu Lieferung und Einlösen.</span>
            </a>
          ) : null}
          <a className="way" href={`mailto:${site.supportEmail}`}>
            <Icon name="mail" size={26} />
            <strong>E-Mail schreiben</strong>
            <span>{site.supportEmail}</span>
          </a>
          {features.account ? (
            <Link className="way" href="/konto">
              <Icon name="receipt" size={26} />
              <strong>Meine Bestellungen</strong>
              <span>Bestellungen und Codes an einem Ort.</span>
            </Link>
          ) : null}
        </div>
      </section>
    </div>
  );
}
