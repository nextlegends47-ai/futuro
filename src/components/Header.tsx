"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { features, site } from "@/config/site";
import { categories, categoryHref, productBySlug, type CategorySlug } from "@/data/catalog";
import { cartCount, cartStore, openPanel, useStore, wishlistStore } from "@/lib/store";
import { Brand } from "./Brand";
import { CartSheet } from "./CartSheet";
import { Icon } from "./Icon";
import { MobileMenu } from "./MobileMenu";
import { SearchOverlay } from "./SearchOverlay";

/** Welche Kategorie ist gerade aktiv? Auf einer Produktseite die Kategorie des Produkts. */
function activeCategory(pathname: string): CategorySlug | "abo" | null {
  const [, section, slug] = pathname.split("/");
  if (section === "kategorie") return (slug as CategorySlug) ?? null;
  if (section === "marke" || section === "spiel") return productBySlug(slug ?? "")?.category ?? null;
  if (section === "handy-aufladen") return "handy-aufladen";
  if (section === "abo") return "abo";
  return null;
}

/** Schmale schwarze Zeile über der Kapsel, nur am Computer. */
function ServiceLine() {
  return (
    <div className="topline">
      <div className="topline__inner">
        <ul className="topline__list">
          {site.draft ? (
            <li>
              <span className="topline__draft">Entwurf mit Beispieldaten</span>
            </li>
          ) : null}
          <li>
            <Icon name="shield" size={15} />
            Offizielle Codes
          </li>
          <li>
            <Icon name="mail" size={15} />
            Lieferung per E-Mail in bis zu 24 Stunden
          </li>
          <li>
            <Icon name="lock" size={15} />
            Sichere Zahlung über Stripe
          </li>
        </ul>
        <Link href="/hilfe">Hilfe und Kontakt</Link>
      </div>
    </div>
  );
}

/** Zeile mit allen Kategorien unter der Kapsel. Am Handy lässt sie sich seitlich wischen. */
function CategoryBar({ active }: { active: ReturnType<typeof activeCategory> }) {
  const scroller = useRef<HTMLDivElement>(null);

  // Die aktive Kategorie in die Mitte der Leiste holen, ohne die Seite zu bewegen
  useEffect(() => {
    const el = scroller.current;
    const current = el?.querySelector<HTMLElement>("[aria-current='page']");
    if (!el || !current) return;
    el.scrollLeft = current.offsetLeft - (el.clientWidth - current.offsetWidth) / 2;
  }, [active]);

  const visible = categories.filter((c) => c.slug !== "handy-aufladen" || features.topup);

  return (
    <nav className="catbar" aria-label="Kategorien">
      <div className="catbar__scroll" ref={scroller}>
        {visible.map((c) => (
          <Link key={c.slug} className="catbar__item" href={categoryHref(c.slug)} aria-current={active === c.slug ? "page" : undefined}>
            {c.shortName}
          </Link>
        ))}
        {features.subscription ? (
          <Link className="catbar__item catbar__item--abo" href="/abo" aria-current={active === "abo" ? "page" : undefined}>
            instantcodes Abo
          </Link>
        ) : null}
      </div>
    </nav>
  );
}

export function Header() {
  const pathname = usePathname();
  const count = cartCount(useStore(cartStore));
  const wished = useStore(wishlistStore).length;

  return (
    <>
      {site.draft ? <p className="draftstrip">Entwurf mit Beispieldaten</p> : null}
      <ServiceLine />

      <header className="header">
        <div className="capsule">
          <Brand />

          <button type="button" className="capsule__search" aria-haspopup="dialog" onClick={() => openPanel("search")}>
            <Icon name="search" size={20} />
            Marke oder Gutschein suchen
          </button>

          <div className="capsule__actions">
            <button type="button" className="iconbtn only-mobile" aria-label="Suche öffnen" aria-haspopup="dialog" onClick={() => openPanel("search")}>
              <Icon name="search" />
            </button>

            {features.mia ? (
              <button type="button" className="iconbtn hide-narrow" aria-label="Chat mit Mia öffnen">
                <Icon name="chat" />
              </button>
            ) : null}

            {features.wishlist ? (
              <Link className="iconbtn only-desktop" href="/merkliste" aria-label={wished ? `Merkliste, ${wished} ${wished === 1 ? "Produkt" : "Produkte"}` : "Merkliste"}>
                <Icon name="heart" />
                {wished > 0 ? (
                  <span key={wished} className="counter" aria-hidden="true">
                    {wished}
                  </span>
                ) : null}
              </Link>
            ) : null}

            <Link
              className="iconbtn"
              href="/warenkorb"
              data-cart-target
              aria-label={count ? `Warenkorb, ${count} ${count === 1 ? "Code" : "Codes"}` : "Warenkorb"}
              onClick={(event) => {
                // Am Computer öffnet sich der Warenkorb als Blatt von rechts, am Handy ist er eine eigene Seite
                if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
                if (pathname === "/warenkorb" || pathname === "/kasse") return;
                if (!window.matchMedia("(min-width: 900px)").matches) return;
                event.preventDefault();
                openPanel("cart");
              }}
            >
              <Icon name="cart" />
              {count > 0 ? (
                <span key={count} className="counter" aria-hidden="true">
                  {count}
                </span>
              ) : null}
            </Link>

            {features.account ? (
              <Link className="btn btn--sm btn--soft only-desktop" href="/konto">
                Anmelden
              </Link>
            ) : null}

            <button type="button" className="iconbtn only-mobile" aria-label="Menü öffnen" aria-haspopup="dialog" onClick={() => openPanel("menu")}>
              <Icon name="menu" />
            </button>
          </div>
        </div>
      </header>

      {/* Die Kasse lenkt nicht ab: dort entfällt die Kategorie-Leiste */}
      {pathname === "/kasse" ? null : <CategoryBar active={activeCategory(pathname)} />}

      <SearchOverlay />
      <MobileMenu wished={wished} />
      <CartSheet />
    </>
  );
}
