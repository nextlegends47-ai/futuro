import { Crumbs } from "./Crumbs";
import { Icon } from "./Icon";
import { Title } from "./Title";
import { site } from "@/config/site";

/**
 * Rechtsseite ohne eigenen Text. AGB, Widerrufsbelehrung, Datenschutzerklärung
 * und die Kündigungsseite liefert der Betreiber. Hier wird kein Rechtstext geschrieben.
 */
export function LegalPlaceholder({ title }: { title: string }) {
  return (
    <div className="wrap page-top">
      <Crumbs items={[{ label: "Start", href: "/" }, { label: title }]} />
      <Title as="h1" className="h-page">
        {title}
      </Title>
      <div className="legal">
        <p className="note">
          <Icon name="info" size={20} />
          <span>
            <strong>Dieser Text fehlt noch.</strong> Der Betreiber liefert ihn. Bis dahin steht hier kein Rechtstext.
          </span>
        </p>
        <p>
          Fragen beantwortet der Support per E-Mail:{" "}
          <a className="textlink" href={`mailto:${site.supportEmail}`}>
            {site.supportEmail}
          </a>
          . Das Impressum findest du{" "}
          <a className="textlink" href={site.impressumUrl} rel="noopener">
            hier
          </a>
          .
        </p>
      </div>
    </div>
  );
}
