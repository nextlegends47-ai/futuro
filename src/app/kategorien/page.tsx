import type { Metadata } from "next";
import Link from "next/link";
import type { CSSProperties } from "react";
import { ProductArt } from "@/components/Art";
import { Crumbs } from "@/components/Crumbs";
import { Icon, type IconName } from "@/components/Icon";
import { Title } from "@/components/Title";
import { features } from "@/config/site";
import { categories, categoryHref, productsInCategory, type CategorySlug } from "@/data/catalog";

export const metadata: Metadata = {
  title: "Kategorien",
  description: "Alle Kategorien: Gaming-Guthaben, Spiele-Keys, Streaming, Shopping, App Stores, Prepaid-Karten, Spielwährungen, Abos, Software und Handy aufladen.",
};

const categoryIcon: Partial<Record<CategorySlug, IconName>> = { prepaid: "card", software: "code", "handy-aufladen": "phone" };

export default function CategoriesPage() {
  const shown = categories.filter((c) => c.slug !== "handy-aufladen" || features.topup);
  return (
    <div className="wrap page-top">
      <Crumbs items={[{ label: "Start", href: "/" }, { label: "Kategorien" }]} />
      <header className="pagehead">
        <Title as="h1" className="h-page">
          Kategorien
        </Title>
        <p className="lead">Vom Spiele-Key bis zum Handy-Guthaben. Codes kommen nach der Zahlung per E-Mail, Handy-Guthaben geht direkt auf die Nummer.</p>
      </header>
      <ul className="cats cats--detail" style={{ marginTop: 28 }}>
        {shown.map((category, n) => {
          const art = productsInCategory(category.slug).slice(0, 3);
          return (
            <li key={category.slug} data-reveal style={{ "--i": n % 5 } as CSSProperties}>
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
                <h2 className="cat__name">{category.name}</h2>
                <span className="cat__count">{category.count}</span>
                <span className="cat__blurb">{category.blurb}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
