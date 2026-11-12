# instantcodes – Website (Entwurf)

Neue Website für den Online-Shop instantcodes, gebaut nach dem Briefing „instantcodes Website-Briefing“.
Der Stand ist ein **Entwurf**: Er zeigt Gestaltung, Seiten und Kaufweg mit den echten Beispielprodukten.
Bezahlen und Ausliefern sind noch nicht angeschlossen. Was offen ist, steht in [ABSCHLUSSBERICHT.md](ABSCHLUSSBERICHT.md).

## Starten

```bash
npm install
```

```bash
npm run dev
```

Die Seite läuft dann unter http://localhost:3000.

Für einen Testlauf wie im Betrieb:

```bash
npm run build
```

```bash
npm run start
```

Typprüfung:

```bash
npm run typecheck
```

## Technik

- Next.js 16 (App Router), React 19, TypeScript
- Eigene Stile in `src/styles`, ohne Baukasten und ohne fremde Server
- Schrift Inter liegt in `src/fonts` (SIL Open Font License, Lizenz liegt bei)
- Warenkorb und Merkliste liegen im Speicher des Geräts, sonst wird nichts gespeichert
- Kein Tracking, keine Werbe-Skripte, keine fremden Schriften, Skripte oder Bilder

## Aufbau

| Ort | Inhalt |
| --- | --- |
| `src/config/site.ts` | Entwurfs-Schalter, Support-Adresse, Impressum-Link, Schalter für Funktionen |
| `src/data/catalog.ts` | Kategorien, Produkte, Beträge und Preise, Geschenk-Sets, Abo-Pläne, Fragen und Antworten |
| `src/styles` | Farben, Schrift, Formen (`base.css`), Kopf- und Fußzeile (`chrome.css`), Kacheln und Produktseite (`shop.css`), Startseite (`home.css`), Kasse und übrige Seiten (`flow.css`) |
| `src/components` | Bausteine: Kopfzeile, Suche, Menü, Warenkorb, Produktkachel, Kasse und mehr |
| `src/app` | Seiten mit lesbaren Adressen, zum Beispiel `/kategorie/gaming` oder `/marke/steam` |
| `src/lib` | Speicher für Warenkorb und Merkliste, Suche, fliegende Karte, Seitenwechsel |

## Seiten

`/` · `/kategorien` · `/kategorie/[slug]` · `/marken` · `/marke/[slug]` · `/spiel/[slug]` · `/suche` ·
`/warenkorb` · `/kasse` · `/bestellung/beispiel` · `/merkliste` · `/handy-aufladen` · `/abo` · `/hilfe` ·
`/agb` · `/widerrufsbelehrung` · `/datenschutz` · `/vertraege-kuendigen`

## Schalter

In `src/config/site.ts`:

- `site.draft` – solange `true`, trägt die Seite den Hinweis „Entwurf mit Beispieldaten“ und ist für Suchmaschinen gesperrt.
- `features.*` – Funktionen, die ein Backend brauchen. Steht ein Schalter auf `false`, verschwinden Seite, Menüpunkt und alle Verweise.
  So wird nie eine Funktion vorgetäuscht. Beispiel: `topup: false` entfernt „Handy aufladen“ aus Kategorie-Leiste, Menü, Startseite und Fußzeile.

## Produktdaten einpflegen

Alle Produkte stehen in `src/data/catalog.ts`. Ein Produkt ist erst kaufbar, wenn es Beträge mit Endpreis hat (`amounts`).
Ohne Beträge zeigt die Kachel „Preis folgt“ und es gibt keinen Schnellkauf. Preise werden nie geschätzt.

- Zahlen wie „153 Marken“ stehen als Text im Code (`stats` und in den Texten), nie in Bildern.
- Offizielle Logos, Kartenbilder und Spiele-Cover fehlen noch. Bis dahin steht der Markenname als Text in einer neutralen Kapsel.
  Die Stelle dafür ist `src/components/Art.tsx`.
- Die offiziellen Zahlungszeichen ersetzen die Text-Kapseln in `src/components/PaymentMarks.tsx`.

## Veröffentlichen

Zuerst nur unter einer Testadresse. Unter `www.instantcodes.de` läuft der bestehende Shop mit echten Bestellungen.
Diese Adresse wird erst nach ausdrücklicher Freigabe verbunden.

Für die Testadresse `NEXT_PUBLIC_SITE_URL` auf die Adresse der Testseite setzen.
Geheime Schlüssel, etwa für Stripe, gehören nur in die geschützten Einstellungen des Hosters, nie in den Code und nie in einen Chat.
