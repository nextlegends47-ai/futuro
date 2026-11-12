export const site = {
  name: "instantcodes",
  supportEmail: "info@instantcodes.de",
  /** Bleibt unverändert – so vom Betreiber vorgegeben. */
  impressumUrl: "https://mein.online-impressum.de/instacode/",
  /**
   * Entwurf: Die Seite zeigt nur die echten Beispielprodukte, ist als Entwurf
   * gekennzeichnet und für Suchmaschinen gesperrt. Erst auf `false` stellen,
   * wenn Produktdaten, Rechtstexte und Zahlung vollständig sind.
   */
  draft: true,
  /** Stand der Sortimentszahlen */
  dataDate: "10. November 2026",
} as const;

/**
 * Funktionen, die ein Backend brauchen. Steht ein Schalter auf `false`,
 * verschwinden Seite, Menüpunkt und alle Verweise – es wird nichts vorgetäuscht.
 */
export const features = {
  /** Zahlung über Stripe und Auslieferung der Codes. Solange `false`, ist „Jetzt kaufen“ an der Kasse gesperrt. */
  checkout: false,
  /** Bestätigung der E-Mail-Adresse per Code (braucht E-Mail-Versand). */
  emailVerification: false,
  /** Aktionscodes im Warenkorb. */
  promoCodes: false,
  /** Handy aufladen: Seite, Menüpunkt und Abschnitt auf der Startseite. */
  topup: true,
  /** instantcodes Abo: Seite, Menüpunkt und Abschnitt auf der Startseite. */
  subscription: true,
  /** Merkliste, gespeichert auf dem Gerät. */
  wishlist: true,
  /** Chat mit der KI-Beraterin Mia. */
  mia: false,
  /** Kundenkonto mit Anmeldung. */
  account: false,
  /** Newsletter mit Bestätigungs-E-Mail. */
  newsletter: false,
  /** Bewertungen aus überprüfbarer Quelle. */
  reviews: false,
} as const;

/** Obergrenze für die Menge je Position (Bedienwert, keine Zusage). */
export const MAX_QTY = 10;
