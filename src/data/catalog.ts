/**
 * Katalog – Stand 10. November 2026.
 *
 * Preise tragen nur die fünf echten Beispiele aus dem Briefing (Steam,
 * PlayStation, Apple Gift Card, EA SPORTS FC 26, Call of Duty: Black Ops 7).
 * Alle anderen Einträge sind Marken, die das Briefing selbst nennt. Sie haben
 * keinen Preis („Preis folgt“) und lassen sich nicht kaufen, bis die
 * vollständige Produktliste geliefert ist. Hier wird nichts erfunden.
 *
 * Die Farben der Karten sind Annäherungen an die Markenfarben und werden mit
 * den Produktdaten ersetzt.
 */

export type CategorySlug =
  | "gaming"
  | "spiele-keys"
  | "streaming"
  | "shopping"
  | "app-stores"
  | "prepaid"
  | "spielwaehrung"
  | "abos"
  | "software"
  | "handy-aufladen";

export interface Category {
  slug: CategorySlug;
  /** Voller Name, z. B. als Überschrift */
  name: string;
  /** Kurzname für die Kategorie-Leiste */
  shortName: string;
  /** Umfang des echten Sortiments */
  count: string;
  blurb: string;
  intro: string;
}

const afterPayment = "Nach der Zahlung kommt dein Code per E-Mail.";

export const categories: Category[] = [
  { slug: "gaming", name: "Gaming-Guthaben", shortName: "Gaming", count: "9 Produkte", blurb: "Steam, PlayStation, Xbox, Nintendo und mehr", intro: `Steam, PlayStation, Xbox, Nintendo und mehr. ${afterPayment}` },
  { slug: "spiele-keys", name: "Spiele-Keys", shortName: "Spiele-Keys", count: "235 Spiele", blurb: "Aktuelle Spiele für PC, PlayStation, Xbox und Nintendo", intro: `Aktuelle Spiele für PC, PlayStation, Xbox und Nintendo. ${afterPayment}` },
  { slug: "streaming", name: "Streaming & Musik", shortName: "Streaming", count: "21 Produkte", blurb: "Netflix, Disney+, Spotify, DAZN und mehr", intro: `Netflix, Disney+, Spotify, DAZN und mehr. ${afterPayment}` },
  { slug: "shopping", name: "Shopping & Essen", shortName: "Shopping", count: "47 Produkte", blurb: "Mode, Elektronik, Essen und mehr", intro: `Mode, Elektronik, Essen und mehr. ${afterPayment}` },
  { slug: "app-stores", name: "App Stores", shortName: "App Stores", count: "3 Produkte", blurb: "Guthaben für Apps, Filme und Musik", intro: `Guthaben für Apps, Filme und Musik. ${afterPayment}` },
  { slug: "prepaid", name: "Prepaid-Karten", shortName: "Prepaid", count: "15 Produkte", blurb: "Bezahlkarten für Online-Zahlungen", intro: `Bezahlkarten für Online-Zahlungen. ${afterPayment}` },
  { slug: "spielwaehrung", name: "Spielwährungen", shortName: "Spielwährung", count: "20 Produkte", blurb: "V-Bucks, Robux, Valorant Points und mehr", intro: `V-Bucks, Robux, Valorant Points und mehr. ${afterPayment}` },
  { slug: "abos", name: "Abos", shortName: "Abos", count: "12 Produkte", blurb: "Game Pass, PlayStation Plus, Switch Online", intro: `Game Pass, PlayStation Plus, Switch Online. ${afterPayment}` },
  { slug: "software", name: "Software", shortName: "Software", count: "14 Produkte", blurb: "Office, Antivirus und VPN", intro: `Office, Antivirus und VPN. ${afterPayment}` },
  { slug: "handy-aufladen", name: "Handy aufladen", shortName: "Handy aufladen", count: "19 Anbieter", blurb: "Guthaben für Prepaid-Tarife", intro: "Guthaben für Prepaid-Tarife. Das Guthaben wird nach der Zahlung auf die Nummer gebucht." },
];

export const categoryBySlug = (slug: string) => categories.find((c) => c.slug === slug);

/** Adresse einer Kategorie. „Handy aufladen“ hat eine eigene Seite. */
export const categoryHref = (slug: CategorySlug) => (slug === "handy-aufladen" ? "/handy-aufladen" : `/kategorie/${slug}`);

export const platformGroups = ["PC", "PlayStation", "Xbox", "Nintendo"] as const;
export type PlatformGroup = (typeof platformGroups)[number];

export interface Amount {
  id: string;
  /** Nennwert, z. B. „20,00 €“ oder „1.000 V-Bucks“ */
  label: string;
  /** Endpreis in Euro */
  price: number;
  /** Betrag gerade nicht lieferbar */
  soldOut?: boolean;
}

export interface Product {
  slug: string;
  name: string;
  category: CategorySlug;
  kind: "voucher" | "game";
  /** Farbe der Karte (Annäherung an die Markenfarbe) */
  color: string;
  platform?: { group: PlatformGroup; label: string; store: string };
  /** Kaufbare Beträge mit Endpreis. Fehlt die Liste, ist das Produkt noch nicht kaufbar. */
  amounts?: Amount[];
  /** Bekannter kleinster Preis, wenn die Beträge noch fehlen */
  priceFrom?: number;
  /** „Gültig in“ */
  region: string;
  /** Produkt gerade nicht lieferbar */
  soldOut?: boolean;
}

const eur = (n: number) => n.toLocaleString("de-DE", { style: "currency", currency: "EUR" });
const nominal = (value: number, price: number): Amount => ({ id: String(value), label: eur(value), price });

export const products: Product[] = [
  // Gaming-Guthaben
  {
    slug: "steam", name: "Steam", category: "gaming", kind: "voucher", color: "#1B2838", region: "Deutschland",
    amounts: [nominal(5, 8.69), nominal(10, 13.79), nominal(20, 24.09), nominal(50, 55.09), nominal(100, 106.59)],
  },
  { slug: "playstation", name: "PlayStation", category: "gaming", kind: "voucher", color: "#00439C", region: "Deutschland", priceFrom: 13.79 },
  { slug: "xbox", name: "Xbox", category: "gaming", kind: "voucher", color: "#107C10", region: "Deutschland" },
  { slug: "nintendo", name: "Nintendo", category: "gaming", kind: "voucher", color: "#E60012", region: "Deutschland" },

  // Spiele-Keys
  {
    slug: "ea-sports-fc-26-ps5", name: "EA SPORTS FC 26", category: "spiele-keys", kind: "game", color: "#16181D", region: "Europa",
    platform: { group: "PlayStation", label: "PS5", store: "PlayStation Store" },
    amounts: [{ id: "key", label: "Spiele-Key", price: 75.69 }],
  },
  {
    slug: "call-of-duty-black-ops-7-ps5", name: "Call of Duty: Black Ops 7", category: "spiele-keys", kind: "game", color: "#16181D", region: "Europa",
    platform: { group: "PlayStation", label: "PS5", store: "PlayStation Store" },
    amounts: [{ id: "key", label: "Spiele-Key", price: 85.99 }],
  },

  // Streaming & Musik
  { slug: "netflix", name: "Netflix", category: "streaming", kind: "voucher", color: "#E50914", region: "Deutschland" },
  { slug: "disney-plus", name: "Disney+", category: "streaming", kind: "voucher", color: "#0B1E8A", region: "Deutschland" },
  { slug: "spotify", name: "Spotify", category: "streaming", kind: "voucher", color: "#1ED760", region: "Deutschland" },
  { slug: "dazn", name: "DAZN", category: "streaming", kind: "voucher", color: "#1C1F26", region: "Deutschland" },
  { slug: "crunchyroll", name: "Crunchyroll", category: "streaming", kind: "voucher", color: "#F47521", region: "Deutschland" },

  // Shopping & Essen
  { slug: "amazon", name: "Amazon", category: "shopping", kind: "voucher", color: "#FF9900", region: "Deutschland" },
  { slug: "zalando", name: "Zalando", category: "shopping", kind: "voucher", color: "#FF6900", region: "Deutschland" },

  // App Stores
  { slug: "apple-gift-card", name: "Apple Gift Card", category: "app-stores", kind: "voucher", color: "#1D1D1F", region: "Deutschland", priceFrom: 18.99 },

  // Spielwährungen
  { slug: "roblox", name: "Roblox", category: "spielwaehrung", kind: "voucher", color: "#2B2D33", region: "Deutschland" },
  { slug: "fortnite", name: "Fortnite", category: "spielwaehrung", kind: "voucher", color: "#2B6BF2", region: "Deutschland" },
  { slug: "valorant-points", name: "Valorant Points", category: "spielwaehrung", kind: "voucher", color: "#FF4655", region: "Deutschland" },

  // Abos
  { slug: "xbox-game-pass", name: "Xbox Game Pass", category: "abos", kind: "voucher", color: "#107C10", region: "Deutschland" },
  { slug: "playstation-plus", name: "PlayStation Plus", category: "abos", kind: "voucher", color: "#FFC400", region: "Deutschland" },
  { slug: "switch-online", name: "Nintendo Switch Online", category: "abos", kind: "voucher", color: "#E60012", region: "Deutschland" },
];

export const productBySlug = (slug: string) => products.find((p) => p.slug === slug);
export const productsInCategory = (slug: CategorySlug) => products.filter((p) => p.category === slug);
export const vouchers = products.filter((p) => p.kind === "voucher");
export const games = products.filter((p) => p.kind === "game");

export const productHref = (p: Pick<Product, "slug" | "kind">) => (p.kind === "game" ? `/spiel/${p.slug}` : `/marke/${p.slug}`);

export const euro = eur;

/** Kann das Produkt in den Warenkorb? Nur mit bekannten Beträgen und Preisen. */
export const isBuyable = (p: Product) => !p.soldOut && (p.amounts?.some((a) => !a.soldOut) ?? false);

/** Kleinster bekannter Preis oder null, wenn der Preis noch fehlt. */
export function minPrice(p: Product): number | null {
  if (p.amounts?.length) return Math.min(...p.amounts.map((a) => a.price));
  return p.priceFrom ?? null;
}

/** Preis auf der Kachel: „ab 8,69 €“ bei mehreren Beträgen, sonst der Endpreis. */
export function priceLabel(p: Product): string | null {
  const min = minPrice(p);
  if (min == null) return null;
  const several = p.amounts ? p.amounts.length > 1 : true;
  return several ? `ab ${eur(min)}` : eur(min);
}

/** Graue Zeile der Kachel */
export const metaLine = (p: Product) => (p.kind === "game" ? p.platform?.label ?? "Spiele-Key" : "Code per E-Mail");

/** Helle oder dunkle Schrift auf der Kartenfarbe (nach Helligkeit der Farbe) */
export function inkOn(hex: string): "light" | "dark" {
  const n = parseInt(hex.slice(1), 16);
  const [r, g, b] = [(n >> 16) & 255, (n >> 8) & 255, n & 255].map((v) => {
    const c = v / 255;
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b > 0.32 ? "dark" : "light";
}

/** Beliebte Marken auf der Startseite. Reihenfolge von Hand, keine Verkaufszahlen. */
export const popularSlugs = [
  "steam", "playstation", "apple-gift-card", "netflix", "spotify", "amazon", "xbox",
  "nintendo", "disney-plus", "roblox", "fortnite", "zalando", "dazn", "xbox-game-pass",
];
export const popularProducts = popularSlugs.map(productBySlug).filter((p): p is Product => Boolean(p));

export interface GiftSet {
  slug: string;
  name: string;
  /** Zwei Codes: Produkt und gewünschter Nennwert */
  items: { slug: string; amountLabel: string }[];
}

/** Geschenk-Sets. Der Preis ist die Summe der Einzelpreise, ohne Rabatt. */
export const giftSets: GiftSet[] = [
  { slug: "film-und-musikabend", name: "Film- und Musikabend", items: [{ slug: "netflix", amountLabel: eur(25) }, { slug: "spotify", amountLabel: eur(10) }] },
  { slug: "fuer-gamer", name: "Für Gamer", items: [{ slug: "steam", amountLabel: eur(20) }, { slug: "playstation", amountLabel: eur(20) }] },
  { slug: "shopping-duo", name: "Shopping-Duo", items: [{ slug: "amazon", amountLabel: eur(25) }, { slug: "zalando", amountLabel: eur(25) }] },
  { slug: "robux-und-v-bucks", name: "Robux und V-Bucks", items: [{ slug: "roblox", amountLabel: eur(10) }, { slug: "fortnite", amountLabel: "1.000 V-Bucks" }] },
];

export const subscriptionPlans = [
  { id: "pro", name: "Pro", price: 30, period: "pro Monat" },
  { id: "premium", name: "Premium", price: 50, period: "für 3 Monate" },
  { id: "max", name: "Max", price: 80, period: "für 6 Monate" },
] as const;

/** Dienste im Abo, wie im Briefing genannt. Beträge je Plan fehlen noch. */
export const subscriptionServices = ["Netflix", "Disney+", "Spotify", "DAZN", "Xbox Game Pass", "PlayStation Plus", "Switch Online", "Crunchyroll", "Amazon-Guthaben"];

/**
 * Zahlungsarten, die die Kasse über Stripe anbietet. Karte zählt als eine
 * Zahlungsart mit drei Kartenmarken. Die offiziellen Zeichen fehlen noch,
 * bis dahin steht der Name als Text.
 */
export const paymentMethods = ["Apple Pay", "Google Pay", "Revolut Pay", "Amazon Pay", "Link", "Visa", "Mastercard", "American Express", "EPS", "Bancontact"];

export const stats = { brands: 153, games: 235, carriers: 19, payments: 8 } as const;

/** Marken für die Markenwand: nur Name und Farbe, bis die offiziellen Logos vorliegen. */
export const wallBrands = vouchers.map((p) => ({ name: p.name, color: p.color }));

export interface Faq {
  q: string;
  a: string;
  topic: string;
}

export const faqTopics = ["Lieferung und Codes", "Bezahlung und Belege", "Einlösen und Regionen", "Geschenke und Ausland", "Konto und Rückgabe"] as const;

/**
 * Fragen und Antworten aus dem Briefing. Die Antwort auf „Kann ich Gutscheine
 * auf Rechnung kaufen?“ liefert der Betreiber, sie fehlt hier bewusst.
 */
export const faqs: Faq[] = [
  { topic: "Lieferung und Codes", q: "Wie schnell kommt mein Code an?", a: "Nach der Zahlung bekommst du deinen Code per E-Mail und auf der Bestellseite. Die Lieferzeit beträgt bis zu 24 Stunden nach Zahlungseingang. Den Stand siehst du jederzeit auf der Bestellseite." },
  { topic: "Einlösen und Regionen", q: "Wie löse ich einen Code ein?", a: "Öffne den Dienst der Marke, wähle „Code einlösen“ und gib den Code ein. Handy-Guthaben wird direkt auf die Nummer gebucht." },
  { topic: "Bezahlung und Belege", q: "Welche Zahlungsarten gibt es?", a: "Apple Pay, Google Pay, Revolut Pay oder Karte – je nach Gerät direkt mit einem Klick. Die Zahlung läuft sicher über Stripe, deine Kartendaten sehen wir nie." },
  { topic: "Einlösen und Regionen", q: "Für welche Region gelten die Codes?", a: "Das steht auf jeder Produktseite unter „Gültig in“. Gutscheine gelten meist für Deutschland, Spiele-Keys für Europa." },
  { topic: "Bezahlung und Belege", q: "Bekomme ich eine Rechnung oder einen Beleg?", a: "Ja. Nach dem Kauf bekommst du eine Bestellbestätigung per E-Mail, und alle Bestellungen stehen mit Betrag und Datum in deinem Kundenkonto. Brauchst du eine Rechnung mit Firmenangaben, schreib uns einfach." },
  { topic: "Einlösen und Regionen", q: "Wie aktiviere ich einen Spiele-Key?", a: "Auf der Produktseite unter „Einlösen“ steht der genaue Weg für die jeweilige Plattform, zum Beispiel Steam, PlayStation Store, Microsoft Store oder Nintendo eShop." },
  { topic: "Geschenke und Ausland", q: "Kann ich Guthaben für Freunde im Ausland kaufen?", a: "Ja. Wähle das Land deiner Freundin oder deines Freundes als Empfängerland und gib die Handynummer ein." },
  { topic: "Geschenke und Ausland", q: "Kann ich einen Gutschein verschenken?", a: "Ja. Aktiviere auf der Produktseite „Als Geschenk senden“, gib die E-Mail-Adresse ein und schreib eine persönliche Nachricht." },
  { topic: "Lieferung und Codes", q: "Wo finde ich meine gekauften Codes?", a: "Sobald wir geliefert haben: per E-Mail, auf der Bestellseite und, wenn du angemeldet bist, im Konto unter Bestellungen." },
  { topic: "Konto und Rückgabe", q: "Kann ich ohne Konto bestellen?", a: "Ja, als Gast reicht deine E-Mail-Adresse. Mit Konto speicherst du Codes, Nummern und Favoriten." },
  { topic: "Konto und Rückgabe", q: "Kann ich Codes zurückgeben?", a: "Digitale Codes sind nach der Auslieferung in der Regel vom Umtausch ausgeschlossen. Bei Problemen hilft der Support mit deiner Bestellnummer." },
];

/** Ratgeber auf der Startseite: nur Angaben aus dem Briefing. */
export const guide = {
  title: "Gutscheine und Guthaben online kaufen – per E-Mail",
  paragraphs: [
    "Bei instantcodes findest du Gutscheinkarten, Spiele-Keys, Gaming-Guthaben, Spielwährungen, Streaming-Guthaben, Software, Prepaid-Karten und Handy-Aufladungen an einem Ort: 153 Marken und 235 Spiele.",
    "Gaming-Guthaben gibt es für Steam, PlayStation, Xbox und Nintendo. Dazu kommen Spielwährungen wie V-Bucks, Robux und Valorant Points und Abos wie Game Pass, PlayStation Plus und Switch Online.",
    "Für Filme, Serien und Musik gibt es Guthaben für Netflix, Disney+, Spotify und DAZN. Gutscheine für Mode, Elektronik und Essen stehen unter Shopping & Essen.",
    "Du wählst Produkt und Betrag und bezahlst sicher über Stripe. Jeder Preis ist der Endpreis. Nach der Zahlung bekommst du deinen Code per E-Mail und auf der Bestellseite. Die Lieferzeit beträgt bis zu 24 Stunden.",
    "Jeden Gutschein kannst du mit persönlicher Nachricht an eine andere E-Mail-Adresse senden. Handy-Guthaben für 19 Anbieter wird direkt auf die Nummer gebucht, auch für Nummern im Ausland.",
    "Ein Konto brauchst du nicht. Als Gast reicht deine E-Mail-Adresse.",
  ],
};
