import Link from "next/link";
import type { CSSProperties } from "react";
import { ProductArt } from "@/components/Art";
import { FaqList } from "@/components/Faq";
import { Icon, type IconName } from "@/components/Icon";
import { PaymentMarks } from "@/components/PaymentMarks";
import { ProductTile } from "@/components/ProductTile";
import { Row } from "@/components/Row";
import { Title } from "@/components/Title";
import { BrandWall } from "@/components/home/BrandWall";
import { CountUp } from "@/components/home/CountUp";
import { GamesShowcase } from "@/components/home/GamesShowcase";
import { GiftSets } from "@/components/home/GiftSets";
import { Guide } from "@/components/home/Guide";
import { HowItWorks } from "@/components/home/HowItWorks";
import { RecentlyViewed } from "@/components/home/RecentlyViewed";
import { TopupTeaser } from "@/components/home/TopupTeaser";
import { features } from "@/config/site";
import { categories, categoryHref, faqs, games, popularProducts, productsInCategory, stats, subscriptionPlans, type CategorySlug } from "@/data/catalog";

const i = (n: number) => ({ "--i": n }) as CSSProperties;

const heroWords = ["Gutscheine,", "Keys", "und", "Guthaben."];

const statTiles = [
  { value: stats.brands, name: "Marken", line: "Gutscheine, Guthaben und Abos" },
  { value: stats.games, name: "Spiele", line: "für PC, PlayStation, Xbox und Nintendo" },
  { value: stats.carriers, name: "Mobilfunk\u00ADanbieter", line: "Prepaid-Guthaben direkt aufladen" },
  { value: stats.payments, name: "Zahlungsarten", line: "abgewickelt über Stripe" },
];

/** Symbol für Kategorien, die im Entwurf noch keine Produktbilder haben */
const categoryIcon: Partial<Record<CategorySlug, IconName>> = {
  prepaid: "card",
  software: "code",
  "handy-aufladen": "phone",
};

export default function HomePage() {
  const shownCategories = categories.filter((c) => c.slug !== "handy-aufladen" || features.topup);

  return (
    <>
      {/* 1. Einstieg */}
      <div className="wrap">
        <section className="hero on-dark" data-loop aria-labelledby="hero-title">
          <div className="hero__grid" aria-hidden="true" />
          <div className="glow glow--violet" aria-hidden="true" />
          <div className="glow glow--mint" aria-hidden="true" />

          <div className="hero__copy">
            <h1 id="hero-title" className="hero__title">
              {heroWords.map((word, n) => (
                <span key={word}>
                  <span className="w">
                    <span style={i(n)}>{word}</span>
                  </span>{" "}
                </span>
              ))}
            </h1>
            <p className="hero__text">
              153 Marken und 235 Spiele für PC und Konsole. Du bezahlst sicher über Stripe und bekommst deinen Code per E-Mail – Lieferzeit bis zu 24 Stunden.
            </p>
            <div className="hero__actions">
              <Link className="btn btn--lg btn--invert" href="/kategorien">
                Sortiment ansehen
              </Link>
              <Link className="btn btn--lg btn--glass" href="/kategorie/spiele-keys">
                Spiele-Keys
              </Link>
            </div>
            <ul className="hero__badges">
              <li className="badge">
                <Icon name="shield" size={16} />
                Offizielle Codes
              </li>
              <li className="badge">
                <Icon name="mail" size={16} />
                Per E-Mail in bis zu 24 Std.
              </li>
              <li className="badge">
                <Icon name="lock" size={16} />
                Sicher bezahlt über Stripe
              </li>
            </ul>
          </div>

          <BrandWall />
        </section>
      </div>

      {/* 2. Sortiment in Zahlen */}
      <section className="section wrap" aria-labelledby="stats-title">
        <h2 id="stats-title" className="sr-only">
          Sortiment in Zahlen
        </h2>
        <ul className="stats">
          {statTiles.map((stat, n) => (
            <li key={stat.name} data-reveal style={i(n)}>
              <div className="stat">
                <CountUp value={stat.value} />
                <p className="stat__name">{stat.name}</p>
                <p className="stat__line">{stat.line}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      {/* 3. Kategorien */}
      <section className="section wrap" aria-labelledby="cats-title">
        <div className="section__head">
          <Title id="cats-title">Kategorien</Title>
          <Link className="link" href="/kategorien">
            Alle Kategorien
            <Icon name="arrow" size={18} />
          </Link>
        </div>
        <ul className="cats">
          {shownCategories.map((category, n) => {
            const art = productsInCategory(category.slug).slice(0, 3);
            return (
              <li key={category.slug} data-reveal style={i(n % 5)}>
                <Link className="cat" href={categoryHref(category.slug)}>
                  <span className="cat__art" aria-hidden="true">
                    {art.length ? (
                      art.map((product) => <ProductArt key={product.slug} product={product} />)
                    ) : (
                      <span className="iconchip">
                        <Icon name={categoryIcon[category.slug] ?? "grid"} />
                      </span>
                    )}
                  </span>
                  <span className="cat__name">{category.name}</span>
                  <span className="cat__count">{category.count}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </section>

      {/* 4. Angebote: erscheint nur mit echten Angeboten. Derzeit gibt es keine. */}

      {/* 5. Beliebte Marken */}
      <section className="section wrap" aria-labelledby="popular-title">
        <div className="section__head">
          <Title id="popular-title">Beliebte Marken</Title>
          <Link className="link" href="/marken">
            Alle Marken
            <Icon name="arrow" size={18} />
          </Link>
        </div>
        <Row label="Beliebte Marken">
          {popularProducts.map((product, n) => (
            <li key={product.slug} data-reveal style={i(Math.min(n, 4))}>
              <ProductTile product={product} />
            </li>
          ))}
        </Row>
      </section>

      {/* 6. Spiele-Keys: schwarze Fläche, damit die Cover leuchten */}
      <div className="section wrap">
        <section className="panel panel--dark gamespanel on-dark" data-loop aria-labelledby="games-title">
          <div className="glow glow--violet" aria-hidden="true" />
          <div className="gamespanel__head">
            <div className="gamespanel__top">
              <Title id="games-title">235 Spiele für PC, PlayStation, Xbox und Nintendo.</Title>
              <Link className="link" href="/kategorie/spiele-keys">
                Alle Spiele
                <Icon name="arrow" size={18} />
              </Link>
            </div>
          </div>
          <GamesShowcase games={games} />
        </section>
      </div>

      {/* 7. Handy aufladen und Abo */}
      {features.topup || features.subscription ? (
        <div className="section wrap">
          <div className={`duo${features.topup && features.subscription ? "" : " duo--single"}`}>
            {features.topup ? (
              <section className="panel panel--surface duo__card on-surface" data-reveal aria-labelledby="topup-title">
                <Title id="topup-title" className="h-card">
                  Handy aufladen
                </Title>
                <p className="lead">Prepaid-Guthaben für 19 Anbieter. Nummer eingeben, Betrag wählen, bezahlen.</p>
                <TopupTeaser />
              </section>
            ) : null}
            {features.subscription ? (
              <section className="panel panel--dark duo__card on-dark" data-loop data-reveal style={i(1)} aria-labelledby="abo-title">
                <div className="glow glow--violet" aria-hidden="true" />
                <div className="glow glow--mint" aria-hidden="true" />
                <Title id="abo-title" className="h-card">
                  instantcodes Abo
                </Title>
                <p className="lead">Netflix, Disney+, Spotify, Game Pass, PlayStation Plus und mehr – jeden Monat als Code-Paket per E-Mail. Ein fester Preis, online kündbar.</p>
                <ul className="plans">
                  {subscriptionPlans.map((plan) => (
                    <li key={plan.id}>
                      <strong>{plan.name}</strong>
                      <span>
                        <b>{plan.price} €</b> {plan.period}
                      </span>
                    </li>
                  ))}
                </ul>
                <Link className="btn btn--invert" href="/abo">
                  Abo ansehen
                </Link>
              </section>
            ) : null}
          </div>
        </div>
      ) : null}

      {/* 8. Geschenk-Sets */}
      <section className="section wrap" aria-labelledby="sets-title">
        <div className="section__head">
          <div className="stack" style={{ "--gap": "10px" } as CSSProperties}>
            <Title id="sets-title">Geschenk-Sets</Title>
            <p className="lead">Zwei Codes mit einem Klick. Der Preis ist die Summe der Einzelpreise.</p>
          </div>
        </div>
        <GiftSets />
      </section>

      {/* 9. So funktioniert der Kauf */}
      <section className="section wrap" aria-labelledby="steps-title">
        <div className="section__head">
          <Title id="steps-title">So funktioniert der Kauf</Title>
        </div>
        <HowItWorks />
        <div className="steps__pay" data-reveal>
          <PaymentMarks />
        </div>
      </section>

      {/* 10. Zuletzt angesehen: erscheint nur, wenn schon Produkte angesehen wurden */}
      <RecentlyViewed />

      {/* 11. Bewertungen: erscheinen nur mit echten Bewertungen aus überprüfbarer Quelle. Derzeit gibt es keine. */}

      {/* 12. Ratgeber */}
      <section className="section wrap" aria-labelledby="guide-title">
        <Guide />
      </section>

      {/* 13. Häufige Fragen */}
      <section className="section wrap" aria-labelledby="faq-title">
        <div className="section__head">
          <Title id="faq-title">Häufige Fragen</Title>
        </div>
        <div data-reveal>
          <FaqList items={faqs.slice(0, 6)} />
        </div>
        <Link className="btn btn--soft faq__more" href="/hilfe">
          Alle Fragen
        </Link>
      </section>
    </>
  );
}

