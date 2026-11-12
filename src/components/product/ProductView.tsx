import type { CSSProperties } from "react";
import { features } from "@/config/site";
import { categoryBySlug, categoryHref, productsInCategory, type Product } from "@/data/catalog";
import { ProductArt } from "../Art";
import { Crumbs } from "../Crumbs";
import { Icon, type IconName } from "../Icon";
import { PaymentMarks } from "../PaymentMarks";
import { ProductTile } from "../ProductTile";
import { Row } from "../Row";
import { Title } from "../Title";
import { WishButton } from "../tile-actions";
import { MarkViewed } from "./MarkViewed";
import { ProductBuy } from "./ProductBuy";
import { ProductTabs } from "./ProductTabs";

/**
 * Produktseite. Sie beantwortet drei Fragen ohne Scrollen:
 * Was ist es, was kostet es, wann kommt es.
 */
export function ProductView({ product }: { product: Product }) {
  const category = categoryBySlug(product.category)!;
  const isGame = product.kind === "game";
  const related = productsInCategory(product.category).filter((p) => p.slug !== product.slug);

  const facts: { icon: IconName; term: string; value: string }[] = [
    { icon: "globe", term: "Gültig in", value: product.region },
    { icon: "mail", term: "Lieferung", value: "Per E-Mail in bis zu 24 Std." },
    { icon: "code", term: isGame ? "Typ" : "Format", value: isGame ? "Digitaler Key" : "Digitaler Code" },
  ];
  if (isGame && product.platform) facts.push({ icon: "gamepad", term: "Aktivierung", value: product.platform.store });

  const sub = isGame ? `Digitaler Key${product.platform ? ` für ${product.platform.label}` : ""}, gültig in ${product.region}` : `Digitaler Code, gültig in ${product.region}`;

  const tabs = [
    {
      label: "Beschreibung",
      content: (
        <>
          <p>
            {isGame ? `Digitaler Key für ${product.name}${product.platform ? ` (${product.platform.label})` : ""}` : `Digitaler Code für ${product.name}`}, gültig in {product.region}. Nach der Zahlung bekommst du
            deinen Code per E-Mail und auf der Bestellseite. Die Lieferzeit beträgt bis zu 24 Stunden.
          </p>
          <p>Die ausführliche Beschreibung folgt mit den Produktdaten.</p>
        </>
      ),
    },
    {
      label: "Einlösen",
      content: (
        <>
          <ol>
            <li>{isGame && product.platform ? `Öffne den ${product.platform.store}.` : "Öffne den Dienst der Marke."}</li>
            <li>Wähle „Code einlösen“.</li>
            <li>Gib den Code ein.</li>
          </ol>
          <p>Der genaue Weg für {product.name} folgt mit den Produktdaten.</p>
        </>
      ),
    },
    {
      label: "Hinweise",
      content: (
        <>
          <p>Der Code gilt in: {product.region}.</p>
          <p>Digitale Codes sind nach der Auslieferung vom Umtausch ausgeschlossen. Bei Problemen hilft der Support mit deiner Bestellnummer.</p>
        </>
      ),
    },
  ];

  return (
    <div className="wrap page-top">
      <MarkViewed slug={product.slug} />
      <div className="pdp">
        <div className="pdp__media" data-loop>
          <div className={`pdp__art${isGame ? " pdp__art--game" : ""}`}>
            <ProductArt product={product} describe />
          </div>
          {features.wishlist ? <WishButton slug={product.slug} name={product.name} large /> : null}
        </div>

        <div>
          <Crumbs items={[{ label: "Start", href: "/" }, { label: category.name, href: categoryHref(category.slug) }, { label: product.name }]} />
          <Title as="h1" className="pdp__title">
            {product.name}
          </Title>
          <p className="pdp__sub">{sub}</p>
          <p className="pdp__ship">
            <Icon name="mail" size={18} />
            Lieferung per E-Mail in bis zu 24 Std.
          </p>

          <ProductBuy product={product} />

          <div className="pdp__pay">
            <PaymentMarks />
          </div>

          <dl className="facts">
            {facts.map((fact) => (
              <div key={fact.term} className="fact">
                <dt>
                  <Icon name={fact.icon} size={20} />
                  {fact.term}
                </dt>
                <dd>{fact.value}</dd>
              </div>
            ))}
          </dl>

          <ProductTabs tabs={tabs} />
        </div>
      </div>

      {related.length ? (
        <section className="section" aria-labelledby="related-title">
          <div className="section__head">
            <Title id="related-title">Mehr aus {category.name}</Title>
          </div>
          <Row label={`Mehr aus ${category.name}`}>
            {related.map((item, n) => (
              <li key={item.slug} data-reveal style={{ "--i": Math.min(n, 4) } as CSSProperties}>
                <ProductTile product={item} />
              </li>
            ))}
          </Row>
        </section>
      ) : null}
    </div>
  );
}
