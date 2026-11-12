import Link from "next/link";
import { features, site } from "@/config/site";
import { categories, categoryHref } from "@/data/catalog";
import { Brand } from "./Brand";
import { CookieSettingsButton } from "./CookieNotice";
import { PaymentMarks } from "./PaymentMarks";

/** Fußzeile auf hellgrauem Grund. Sie enthält auf jeder Seite alle Rechtslinks. */
export function Footer() {
  return (
    <footer className="footer on-surface">
      <div className="wrap">
        <div className="footer__top">
          <Brand />
          <p>Gutscheine, Spiele-Keys, Abos und Handy-Guthaben von 153 Marken. Bezahlt in Sekunden, Code per E-Mail.</p>
        </div>

        <div className="footer__pay">
          <PaymentMarks />
        </div>

        <nav className="footer__cols" aria-label="Fußzeile">
          <div>
            <h2>Sortiment</h2>
            <ul>
              {categories
                .filter((c) => c.slug !== "handy-aufladen" || features.topup)
                .map((c) => (
                  <li key={c.slug}>
                    <Link href={categoryHref(c.slug)}>{c.name}</Link>
                  </li>
                ))}
            </ul>
          </div>
          <div>
            <h2>Service</h2>
            <ul>
              {features.subscription ? (
                <li>
                  <Link href="/abo">instantcodes Abo</Link>
                </li>
              ) : null}
              <li>
                <Link href="/hilfe">Hilfe und FAQ</Link>
              </li>
              {features.account ? (
                <li>
                  <Link href="/konto">Mein Konto</Link>
                </li>
              ) : null}
              {features.mia ? (
                <li>
                  <Link href="/hilfe#mia">KI-Beraterin Mia</Link>
                </li>
              ) : null}
            </ul>
          </div>
          <div>
            <h2>Rechtliches</h2>
            <ul>
              <li>
                {/* Der Link bleibt unverändert, so vom Betreiber vorgegeben */}
                <a href={site.impressumUrl} rel="noopener">
                  Impressum
                </a>
              </li>
              <li>
                <Link href="/agb">AGB</Link>
              </li>
              <li>
                <Link href="/widerrufsbelehrung">Widerrufsbelehrung</Link>
              </li>
              <li>
                <Link href="/datenschutz">Datenschutz</Link>
              </li>
              <li>
                <CookieSettingsButton />
              </li>
              <li>
                <Link href="/vertraege-kuendigen">Verträge hier kündigen</Link>
              </li>
            </ul>
          </div>
          <div>
            <h2>Kontakt</h2>
            <ul>
              <li>
                <a href={`mailto:${site.supportEmail}`}>{site.supportEmail}</a>
              </li>
              <li>
                <Link href="/hilfe">Hilfe und Kontakt</Link>
              </li>
            </ul>
          </div>
        </nav>

        <p className="footer__word" aria-hidden="true">
          <b>instant</b>codes
        </p>

        <div className="footer__base">
          <span>© 2026 instantcodes</span>
          <span>Zahlungsabwicklung durch Stripe</span>
        </div>
      </div>
    </footer>
  );
}
