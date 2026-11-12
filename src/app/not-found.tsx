import type { Metadata } from "next";
import Link from "next/link";
import { SearchButton } from "@/components/SearchButton";
import { features } from "@/config/site";
import { categories, categoryHref } from "@/data/catalog";

export const metadata: Metadata = { title: "Seite nicht gefunden" };

export default function NotFound() {
  return (
    <div className="wrap notfound">
      <h1 className="h-page">Seite nicht gefunden.</h1>
      <p className="lead">Diese Seite gibt es nicht oder nicht mehr. Über die Suche oder die Kategorien findest du schnell, was du brauchst.</p>
      <div className="notfound__actions">
        <Link className="btn btn--lg" href="/">
          Zur Startseite
        </Link>
        <SearchButton />
      </div>
      <nav className="chips" aria-label="Kategorien">
        {categories
          .filter((c) => c.slug !== "handy-aufladen" || features.topup)
          .map((c) => (
            <Link key={c.slug} className="chip" href={categoryHref(c.slug)}>
              {c.name}
            </Link>
          ))}
      </nav>
    </div>
  );
}
