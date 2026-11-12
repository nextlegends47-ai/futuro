import type { Metadata } from "next";
import type { CSSProperties } from "react";
import { Crumbs } from "@/components/Crumbs";
import { DraftNote } from "@/components/DraftNote";
import { ProductTile } from "@/components/ProductTile";
import { Title } from "@/components/Title";
import { vouchers } from "@/data/catalog";

export const metadata: Metadata = {
  title: "Alle Marken",
  description: "Gutscheine, Guthaben und Abos von 153 Marken. Code per E-Mail, Lieferzeit bis zu 24 Stunden.",
};

export default function BrandsPage() {
  const sorted = [...vouchers].sort((a, b) => a.name.localeCompare(b.name, "de"));
  return (
    <div className="wrap page-top">
      <Crumbs items={[{ label: "Start", href: "/" }, { label: "Alle Marken" }]} />
      <header className="pagehead">
        <Title as="h1" className="h-page">
          Alle Marken
        </Title>
        <p className="lead">Gutscheine, Guthaben und Abos von 153 Marken. Nach der Zahlung kommt dein Code per E-Mail.</p>
      </header>
      <ul className="grid" style={{ marginTop: 28 }}>
        {sorted.map((product, n) => (
          <li key={product.slug} data-reveal style={{ "--i": n % 5 } as CSSProperties}>
            <ProductTile product={product} as="h2" />
          </li>
        ))}
      </ul>
      <DraftNote className="section">
        <strong>Entwurf:</strong> Hier stehen nur Marken, die im Briefing genannt sind. Die vollständige Liste folgt mit den Produktdaten.
      </DraftNote>
    </div>
  );
}
