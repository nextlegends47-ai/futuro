import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductView } from "@/components/product/ProductView";
import { productBySlug, products } from "@/data/catalog";

type Params = Promise<{ slug: string }>;

const find = (slug: string) => {
  const product = productBySlug(slug);
  return product?.kind === "game" ? product : undefined;
};

export const dynamicParams = false;
export const generateStaticParams = () => products.filter((p) => p.kind === "game").map((p) => ({ slug: p.slug }));

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const product = find((await params).slug);
  if (!product) return {};
  const what = product.kind === "game" ? `Spiele-Key${product.platform ? ` für ${product.platform.label}` : ""}` : "Code";
  return {
    title: `${product.name} – ${what} per E-Mail`,
    description: `${product.name}: digitaler ${product.kind === "game" ? "Key" : "Code"}, gültig in ${product.region}. Sicher bezahlen über Stripe, Lieferung per E-Mail, Lieferzeit bis zu 24 Stunden.`,
  };
}

export default async function Page({ params }: { params: Params }) {
  const product = find((await params).slug);
  if (!product) notFound();
  return <ProductView product={product} />;
}
