# Abschlussbericht

Stand: 12. November 2026 · Entwurf, noch nicht veröffentlicht

## Gebaut

- **Gerüst:** Farben, Schrift Inter (lokal eingebunden), Formen, Kapsel-Kopfzeile aus Milchglas, Service-Zeile, Kategorie-Leiste, Fußzeile mit allen Rechtslinks
- **Startseite** in der festen Reihenfolge: Einstieg mit Markenwand, Sortiment in Zahlen, Kategorien, Beliebte Marken, Spiele-Keys, Handy aufladen und Abo, Geschenk-Sets, So funktioniert der Kauf, Zuletzt angesehen, Ratgeber, Häufige Fragen
- **Sortiment:** Seite „Kategorien“, neun Kategorieseiten mit Sortierung, Filter und „Mehr anzeigen“, Seite „Alle Marken“, Suche über der Seite mit Treffern beim Tippen und eigener Ergebnisseite
- **Produktseite:** Betragswahl, Menge, Geschenk, Kaufbereich mit leerem Häkchen, Eckdaten, Reiter, verwandte Produkte, Kaufleiste am Handy
- **Kaufweg:** Warenkorb (Blatt am Computer, eigene Seite am Handy), Kasse mit den Schritten Warenkorb, E-Mail, Bezahlen, Beispiel einer Bestellseite
- **Übrige Seiten:** Merkliste, Handy aufladen, instantcodes Abo, Hilfe, Seite nicht gefunden, Cookie-Hinweis
- **Bewegung:** alle Punkte der Tabelle, nur über Position, Größe und Deckkraft. Dauerbewegungen pausieren außerhalb des Bildes. Mit „Bewegung reduzieren“ steht alles still.

## Geprüft

23 Adressen, jede Seitenart mindestens einmal, bei 320, 390, 768 und 1440 px:

- keine Seite scrollt seitlich
- keine Fehler in der Konsole
- jede Tippfläche am Handy misst mindestens 44 mal 44 px
- Text hat mindestens 4,5 zu 1 Kontrast (gemessen auf einfarbigen Flächen, auf den schwarzen Flächen mit Licht nachgerechnet)
- jede Seite hat genau eine Hauptüberschrift
- der Kaufweg läuft durch: Betrag wählen, Hinweis bei fehlendem Häkchen, Warenkorb, Kasse
- Suche, Menü und Warenkorb sind mit der Tastatur bedienbar, Escape schließt sie
- ohne Skript sind alle Inhalte sichtbar

Nicht geprüft: echte iPhones. Geprüft wurde im Chromium-Browser mit Handy-Maßen. Das Milchglas, die Aussparung oben und der Balken unten sollten einmal am Gerät angesehen werden.

## Ersetzt

| Wunsch | Ersatz | Grund |
| --- | --- | --- |
| Offizielle Markenlogos | Markenname als Text in neutraler Kapsel | Logos liegen nicht vor, nachzeichnen ist tabu |
| Offizielle Zahlungszeichen | Name der Zahlart als Text, alle gleich hoch | Zeichen liegen nicht vor |
| Spiele-Cover | dunkle Fläche im Hochformat mit Titel und Plattform | Cover kommen vom Lieferanten |
| Farben der Gutscheinkarten | Annäherung an die Markenfarbe | echte Werte kommen mit den Produktdaten |
| Produktbild gleitet beim Seitenwechsel | weiche Überblendung | nur in Browsern, die das Gleiten nicht können |
| Dritte Textebene `#70727D` auf Grau | `#666873` | sonst liegt der Kontrast auf `#F4F4F6` unter 4,5 zu 1 |
| „Zuletzt angesehen“ | gilt nur für den laufenden Besuch | so wird dafür nichts auf dem Gerät gespeichert |

## Fehlt

| Funktion | Stand im Entwurf |
| --- | --- |
| Bezahlen über Stripe, Codes ausliefern | „Jetzt kaufen“ an der Kasse ist gesperrt und als „noch nicht verfügbar“ gekennzeichnet. Es gibt keine Schein-Bestellung. |
| E-Mail-Adresse per Code bestätigen | Schritt ist gestaltet, es werden keine E-Mails verschickt |
| Bestellbestätigung und Code-E-Mail | nicht gebaut, braucht den E-Mail-Versand |
| Bestellseite mit echtem Status | nur als gekennzeichnetes Beispiel unter `/bestellung/beispiel` |
| Aktionscodes | Feld ist da und sagt offen, dass es noch nicht geht |
| Schnelle Zahlarten (Apple Pay, Google Pay) | Platz ist vorgesehen, die Knöpfe kommen von Stripe |
| Kundenkonto | weggelassen, Kauf als Gast. Merkliste bleibt auf dem Gerät |
| Chat mit Mia | weggelassen, Verweis auf Hilfe und E-Mail |
| Newsletter | Anmeldung weggelassen |
| Bewertungen, Angebote | Abschnitte fehlen, bis es echte gibt |
| Klarna | erscheint nirgends |

## Abweichungen vom Briefing

1. **Handy aufladen und Abo sind als Seiten sichtbar**, obwohl die Ersatz-Tabelle „weglassen“ vorsieht. Grund: So lässt sich die Gestaltung beurteilen. Alle Kauf-Knöpfe dort sind gesperrt und gekennzeichnet. Mit `topup: false` und `subscription: false` in `src/config/site.ts` verschwinden beide vollständig.
2. **Marken ohne Preis:** Neben den fünf echten Beispielen stehen Marken, die das Briefing selbst nennt, etwa Netflix oder Spotify. Sie tragen „Preis folgt“ und lassen sich nicht kaufen. Preise sind keine erfunden.
3. **Geschenk-Sets:** Kein Set ist kaufbar, weil je ein Einzelpreis fehlt. „Hinzufügen“ ist gesperrt, der Preis lautet „Preis folgt“.
4. **Antwort auf „Kann ich Gutscheine auf Rechnung kaufen?“** fehlt, bis sie geliefert ist. Auf der Startseite stehen deshalb die sechs ersten vorhandenen Fragen.
5. **Texte der Reiter** „Beschreibung“, „Einlösen“ und „Hinweise“ sind aus den Angaben des Briefings gebaut und als vorläufig gekennzeichnet.
6. **Häkchen und Schalter** tragen eine feine Linie, damit sie als Feld erkennbar sind.

## Zwei Stellen zur Entscheidung

- Der Fußzeilen-Satz „Bezahlt in Sekunden, Code per E-Mail.“ ist wörtlich übernommen. Er bezieht sich auf die Zahlung, enthält aber „in Sekunden“. Soll er bleiben?
- Die Häkchen-Texte enthalten „sofortigen Lieferung“. Sie sind wörtlich übernommen, weil der Satz rechtlich so gemeint ist.

## Bitte liefern

1. **Produktdaten:** Marken, Beträge, Endpreise, Region, Bestand, Texte für Beschreibung und Einlösen
2. **Bilder:** offizielle Logos als Vektor-Dateien, Kartenbilder, Spiele-Cover, offizielle Zahlungszeichen
3. **Handy aufladen:** die 19 Anbieter, Länder, Beträge und Preise
4. **Abo:** Inhalt je Plan, Fragen und Antworten zum Abo
5. **Rechtstexte:** AGB, Widerrufsbelehrung, Datenschutzerklärung, Text und Ablauf für „Verträge hier kündigen“
6. **Antwort** auf die Frage zum Kauf auf Rechnung und die Freigabe, in welchen Kategorien Klarna erscheint
7. **Zugänge**, jeweils im sicheren Feld des Hosters und nie im Chat: Stripe, E-Mail-Versand, Schnittstelle des Code-Lieferanten, bestehender Chat mit Mia
8. **Entscheidung:** Hoster und Testadresse für die Veröffentlichung

## Veröffentlichung

Die Seite ist noch nirgends veröffentlicht, auch nicht unter einer Testadresse. `www.instantcodes.de` bleibt unberührt.
