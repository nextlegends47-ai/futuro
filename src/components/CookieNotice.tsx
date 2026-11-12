"use client";

import Link from "next/link";
import { noticeStore, useStore } from "@/lib/store";

/** Kleine Karte am unteren Rand. Sie verdeckt die Seite nicht. */
export function CookieNotice() {
  const confirmed = useStore(noticeStore);
  if (confirmed) return null;
  return (
    <section className="cookie" aria-labelledby="cookie-title">
      <h2 id="cookie-title">Cookies bei instantcodes</h2>
      <p>Wir verwenden nur technisch notwendige Cookies und Speicher: für Anmeldung, Warenkorb und die sichere Zahlung über Stripe. Kein Tracking, keine Werbung.</p>
      <div className="cookie__row">
        <Link href="/datenschutz">Mehr erfahren</Link>
        <button type="button" className="btn btn--sm" onClick={() => noticeStore.set(true)}>
          Verstanden
        </button>
      </div>
    </section>
  );
}

/** „Cookie-Einstellungen“ in der Fußzeile zeigt den Hinweis erneut. */
export function CookieSettingsButton() {
  return (
    <button type="button" onClick={() => noticeStore.set(false)}>
      Cookie-Einstellungen
    </button>
  );
}
