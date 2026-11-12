"use client";

import Link from "next/link";
import { features } from "@/config/site";
import { categories, categoryHref } from "@/data/catalog";
import { closePanel, openPanel, panelStore, useStore } from "@/lib/store";
import { Brand } from "./Brand";
import { Icon } from "./Icon";
import { Sheet } from "./Sheet";

/** Menü am Handy: ein Blatt über der Seite. */
export function MobileMenu({ wished }: { wished: number }) {
  const open = useStore(panelStore) === "menu";

  return (
    <Sheet open={open} onClose={closePanel} className="sheet--menu" label="Menü">
      <div className="sheet__head">
        <Brand onNavigate={closePanel} />
        <button type="button" className="iconbtn iconbtn--solid" aria-label="Menü schließen" onClick={closePanel}>
          <Icon name="x" />
        </button>
      </div>

      <div className="sheet__content">
        <button type="button" className="menu__search" onClick={() => openPanel("search")}>
          <Icon name="search" size={20} />
          <span>Marke oder Gutschein suchen</span>
        </button>

        <nav aria-label="Hauptbereiche">
          <ul className="menu__main">
            <li>
              <Link href="/kategorien" onClick={closePanel}>
                Sortiment
                <Icon name="arrow" />
              </Link>
            </li>
            <li>
              <Link href="/kategorie/spiele-keys" onClick={closePanel}>
                Spiele-Keys
                <Icon name="arrow" />
              </Link>
            </li>
            {features.topup ? (
              <li>
                <Link href="/handy-aufladen" onClick={closePanel}>
                  Handy aufladen
                  <Icon name="arrow" />
                </Link>
              </li>
            ) : null}
          </ul>
        </nav>

        <nav aria-label="Kategorien">
          <ul className="menu__cats">
            {categories
              .filter((c) => c.slug !== "handy-aufladen" || features.topup)
              .map((c) => (
                <li key={c.slug}>
                  <Link className="menu__cat" href={categoryHref(c.slug)} onClick={closePanel}>
                    <strong>{c.name}</strong>
                    <span>{c.count}</span>
                  </Link>
                </li>
              ))}
          </ul>
        </nav>

        <nav aria-label="Service">
          <ul className="menu__main" style={{ marginTop: 18 }}>
            {features.wishlist ? (
              <li>
                <Link href="/merkliste" onClick={closePanel}>
                  Merkliste
                  <span className="menu__count" aria-label={`${wished} gemerkt`}>
                    {wished}
                  </span>
                  <Icon name="arrow" />
                </Link>
              </li>
            ) : null}
            {features.subscription ? (
              <li>
                <Link href="/abo" onClick={closePanel}>
                  Abo
                  <Icon name="arrow" />
                </Link>
              </li>
            ) : null}
            <li>
              <Link href="/hilfe" onClick={closePanel}>
                Hilfe
                <Icon name="arrow" />
              </Link>
            </li>
            {features.account ? (
              <li>
                <Link href="/konto" onClick={closePanel}>
                  Konto
                  <Icon name="arrow" />
                </Link>
              </li>
            ) : null}
          </ul>
        </nav>
      </div>
    </Sheet>
  );
}
