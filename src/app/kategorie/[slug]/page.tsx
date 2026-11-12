import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Crumbs } from "@/components/Crumbs";
import { DraftNote } from "@/components/DraftNote";
import { Listing } from "@/components/Listing";
import { Title } from "@/components/Title";
import { categories, categoryBySlug, productsInCategory } from "@/data/catalog";

type Params = Promise<{ slug: string }>;

/* „Handy aufladen“ hat eine eigene Seite und ist hier bewusst nicht dabei */
const listed = categories.filter((c) => c.slug !== "handy-aufladen");

export const dynamicParams = false;
export const generateStaticParams = () => listed.map((c) => ({ slug: c.slug }));

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const category = categoryBySlug((await params).slug);
  if (!category) return {};
  return {
    title: `${category.name} kaufen – Code per E-Mail`,
    description: `${category.blurb}. Sicher bezahlen über Stripe, Code per E-Mail, Lieferzeit bis zu 24 Stunden.`,
  };
}

export default async function CategoryPage({ params }: { params: Params }) {
  const category = categoryBySlug((await params).slug);
  if (!category || category.slug === "handy-aufladen") notFound();
  const products = productsInCategory(category.slug);

  return (
    <div className="wrap page-top">
      <Crumbs items={[{ label: "Start", href: "/" }, { label: category.name }]} />
      <header className="pagehead">
        <Title as="h1" className="h-page">
          {category.name}
        </Title>
        <p className="lead">{category.intro}</p>
      </header>
      <Listing products={products} count={category.count} withPlatforms={category.slug === "spiele-keys"} />
      <DraftNote className="section">
        <strong>Entwurf:</strong> Hier stehen nur Beispiele. Die vollständige Liste mit Beträgen, Preisen und Bildern folgt mit den Produktdaten.
      </DraftNote>
    </div>
  );
}
