import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Crumbs } from "@/components/Crumbs";
import { Title } from "@/components/Title";
import { WishlistView } from "@/components/WishlistView";
import { features } from "@/config/site";

export const metadata: Metadata = { title: "Merkliste", robots: { index: false, follow: false } };

export default function WishlistPage() {
  if (!features.wishlist) notFound();
  return (
    <div className="wrap page-top">
      <Crumbs items={[{ label: "Start", href: "/" }, { label: "Merkliste" }]} />
      <header className="pagehead">
        <Title as="h1" className="h-page">
          Merkliste
        </Title>
        <p className="lead">Die Liste ist auf diesem Gerät gespeichert.</p>
      </header>
      <WishlistView />
    </div>
  );
}
